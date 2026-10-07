/*
 * The clock's wallpaper-adaptive ink, after the extension's
 * wallpaper-adaptive-tone.js (getWordmarkInkColor): sample the wallpaper behind
 * the clock, tint that colour toward the page, then hold a contrast floor.
 * The cards have no wallpaper mask or effects, so those terms drop out.
 */

type Rgb = { red: number; green: number; blue: number };

const MIN_CONTRAST = 3.25;
const TEXTURED_MIN_CONTRAST = 4.5;
const LIGHT_TARGET: Rgb = { red: 248, green: 250, blue: 252 };
const DARK_TARGET: Rgb = { red: 15, green: 23, blue: 42 };
// Points the extension samples across a text block.
const XS = [0.18, 0.34, 0.5, 0.66, 0.82];
const YS = [0.24, 0.5, 0.76];
const SAMPLE_WIDTH = 320;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (start: number, end: number, amount: number) => start + (end - start) * clamp(amount);
const mixColor = (color: Rgb, target: Rgb, amount: number): Rgb => ({
  red: mix(color.red, target.red, amount),
  green: mix(color.green, target.green, amount),
  blue: mix(color.blue, target.blue, amount),
});
const solid = (color: Rgb) => `rgb(${Math.round(color.red)} ${Math.round(color.green)} ${Math.round(color.blue)})`;
const slate = (red: number, green: number, blue: number, alpha: number) =>
  `rgb(${red} ${green} ${blue} / ${Math.round(alpha)}%)`;

const luma = (color: Rgb) => (color.red * 0.299 + color.green * 0.587 + color.blue * 0.114) / 255;

function relativeLuminance(color: Rgb) {
  const linear = (channel: number) => {
    const value = clamp(channel / 255);
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linear(color.red) + 0.7152 * linear(color.green) + 0.0722 * linear(color.blue);
}

function contrast(first: Rgb, second: Rgb) {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function mixToContrast(color: Rgb, target: Rgb, background: Rgb, minimum: number) {
  let low = 0;
  let high = 1;
  let best = target;
  for (let step = 0; step < 10; step += 1) {
    const amount = (low + high) / 2;
    const mixed = mixColor(color, target, amount);
    if (contrast(mixed, background) >= minimum) {
      best = mixed;
      high = amount;
    } else {
      low = amount;
    }
  }
  return best;
}

// Only flips polarity when the preferred extreme can't reach the floor and the other does better.
function ensureReadable(color: Rgb, background: Rgb, ink: "dark" | "light", textured: boolean) {
  const minimum = textured ? TEXTURED_MIN_CONTRAST : MIN_CONTRAST;
  if (contrast(color, background) >= minimum) return color;
  const preferred = ink === "dark" ? DARK_TARGET : LIGHT_TARGET;
  const alternate = ink === "dark" ? LIGHT_TARGET : DARK_TARGET;
  const preferredContrast = contrast(preferred, background);
  const target =
    preferredContrast >= minimum || preferredContrast >= contrast(alternate, background) ? preferred : alternate;
  return mixToContrast(color, target, background, minimum);
}

// Downscaled pixels per wallpaper URL, shared by every clock that sits on it.
const pixels = new Map<string, Promise<ImageData | null>>();

function loadPixels(url: string) {
  let pending = pixels.get(url);
  if (!pending) {
    pending = new Promise<ImageData | null>((resolve) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        try {
          const width = Math.min(SAMPLE_WIDTH, image.naturalWidth);
          const height = Math.max(1, Math.round((image.naturalHeight / image.naturalWidth) * width));
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d", {
            willReadFrequently: true,
          })!;
          context.drawImage(image, 0, 0, width, height);
          resolve(context.getImageData(0, 0, width, height));
        } catch {
          resolve(null);
        }
      };
      image.onerror = () => resolve(null);
      image.src = url;
    });
    pixels.set(url, pending);
  }
  return pending;
}

/** Average colour, luminance and spread of the wallpaper under `clock`, read through object-fit: cover. */
function sample(data: ImageData, wall: HTMLElement, clock: HTMLElement) {
  const box = wall.getBoundingClientRect();
  const rect = clock.getBoundingClientRect();
  if (box.width < 1 || box.height < 1 || rect.width < 1) return null;
  const scale = Math.max(box.width / data.width, box.height / data.height);
  const offsetX = (box.width - data.width * scale) / 2;
  const offsetY = (box.height - data.height * scale) / 2;
  // The extension pads the sampled block a little past the glyphs (32 × 28 viewport px).
  const unit = box.width / wall.offsetWidth || 1;
  const left = rect.left - box.left - 16 * unit;
  const top = rect.top - box.top - 14 * unit;
  const width = rect.width + 32 * unit;
  const height = rect.height + 28 * unit;

  const values: { luminance: number; color: Rgb }[] = [];
  YS.forEach((yRatio) => {
    XS.forEach((xRatio) => {
      const x = Math.round(clamp((left + width * xRatio - offsetX) / scale, 0, data.width - 1));
      const y = Math.round(clamp((top + height * yRatio - offsetY) / scale, 0, data.height - 1));
      const index = (y * data.width + x) * 4;
      const alpha = data.data[index + 3] / 255;
      const color = {
        red: data.data[index] * alpha + 255 * (1 - alpha),
        green: data.data[index + 1] * alpha + 255 * (1 - alpha),
        blue: data.data[index + 2] * alpha + 255 * (1 - alpha),
      };
      values.push({ luminance: luma(color), color });
    });
  });

  values.sort((a, b) => a.luminance - b.luminance);
  const spread = values[values.length - 1].luminance - values[0].luminance;
  const kept = values.slice(2, values.length - 2);
  const total = kept.reduce(
    (sum, value) => ({
      luminance: sum.luminance + value.luminance,
      red: sum.red + value.color.red,
      green: sum.green + value.color.green,
      blue: sum.blue + value.color.blue,
    }),
    { luminance: 0, red: 0, green: 0, blue: 0 },
  );
  return {
    luminance: total.luminance / kept.length,
    color: {
      red: total.red / kept.length,
      green: total.green / kept.length,
      blue: total.blue / kept.length,
    },
    spread,
  };
}

// Hysteresis keeps the ink from flickering on wallpapers near the middle.
function chooseInk(luminance: number, current?: string) {
  if (current === "dark") return luminance < 0.5 ? "light" : "dark";
  if (current === "light") return luminance > 0.62 ? "dark" : "light";
  return luminance >= 0.56 ? "dark" : "light";
}

function paint(clock: HTMLElement, wall: HTMLElement, data: ImageData) {
  const tone = sample(data, wall, clock);
  if (!tone) return;
  const ink = chooseInk(tone.luminance, clock.dataset.ink);
  const textured = tone.spread >= 0.16;
  // Light pages lift the wallpaper's own colour almost to white; dark pages pull it toward slate.
  const darkPage = clock.closest<HTMLElement>("[data-theme]")?.dataset.theme === "dark";
  const pageTarget: Rgb = darkPage ? { red: 118, green: 126, blue: 136 } : { red: 250, green: 251, blue: 253 };
  const lift = darkPage ? (ink === "light" ? 0.24 : 0.2) : ink === "light" ? 0.9 : 0.84;
  const textureLift = textured ? (darkPage ? 0.01 : 0.04) : 0;
  const color = ensureReadable(
    mixColor(tone.color, pageTarget, clamp(lift + textureLift, 0, 0.94)),
    tone.color,
    ink,
    textured,
  );

  // Busy textures and mid tones get a stronger halo, which follows the ink actually drawn.
  const midRisk = 1 - Math.min(1, Math.abs(tone.luminance - 0.52) / 0.48);
  const protection = Math.max(textured ? 1 : clamp(tone.spread / 0.2), midRisk * 0.5);
  const lighterInk = luma(color) > tone.luminance;
  clock.dataset.ink = ink;
  clock.style.setProperty("--nts-clock-ink", solid(color));
  clock.style.setProperty(
    "--nts-clock-shadow",
    lighterInk ? slate(15, 23, 42, mix(18, 40, protection)) : slate(248, 250, 252, mix(0, 36, protection)),
  );
  clock.style.setProperty(
    "--nts-clock-halo",
    lighterInk ? slate(15, 23, 42, mix(10, 28, protection)) : slate(248, 250, 252, mix(0, 46, protection)),
  );
}

/**
 * Keeps every wallpaper clock in `root` inked for the wallpaper behind it,
 * re-sampling whenever a scene swaps the active [data-wall] layer.
 */
export function adaptClockInk(root: HTMLElement) {
  const pairs = Array.from(root.querySelectorAll<HTMLElement>(".nts-wall")).flatMap((wall) => {
    const clock = wall.parentElement?.querySelector<HTMLElement>(".nts-clock");
    return clock ? [{ wall, clock }] : [];
  });
  if (pairs.length === 0) return;

  let frame = 0;
  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() =>
      pairs.forEach(({ wall, clock }) => {
        const active = wall.querySelector<HTMLImageElement>('[data-wall][data-active="true"]');
        const url = active?.currentSrc || active?.src;
        if (!url) return;
        clock.dataset.wallpaper = url;
        loadPixels(url).then((data) => {
          // A later swap may have landed while this one was loading.
          if (data && clock.dataset.wallpaper === url) paint(clock, wall, data);
        });
      }),
    );
  };

  // Sample once the scene is near the viewport, so offscreen wallpapers aren't fetched early.
  new IntersectionObserver(
    (entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      update();
      new MutationObserver(update).observe(root, {
        subtree: true,
        attributeFilter: ["data-active"],
      });
      window.addEventListener("resize", update, { passive: true });
    },
    { rootMargin: "200px" },
  ).observe(root);
}
