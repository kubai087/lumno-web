/*
 * Paints each command-bar card's own fill as an ordered dither, at the hero
 * painting's 2px grain (lib/ordered-dither.ts treats the paintings the same
 * way). The fill is .bento-cell's two background layers, computed per cell
 * rather than drawn and read back: a grey that deepens toward the bottom, under
 * a white bloom from the top centre. Each cell's brightness is snapped to a
 * multiple of STEP after its Bayer nudge, and all three channels move by the
 * same amount, so the grain stays neutral and neighbouring cells stay close.
 *
 * The CSS gradient underneath shows the same light, so nothing waits on this:
 * a card paints in idle time once it comes within a screen of the viewport,
 * repaints only when its cell grid changes, and waits for a resize to settle.
 */

const CELL = 2;
const STEP = 10;
const RESIZE_SETTLE_MS = 150;

// The 4x4 Bayer index matrix, row by row (the same one as lib/ordered-dither.ts).
const BAYER_4X4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
// Each index as a brightness nudge, centred on zero.
const NUDGE = BAYER_4X4.map((index) => ((index + 0.5) / 16 - 0.5) * STEP);

// linear-gradient(180deg, #f4f5f7, #eceef1)
const TOP = [0xf4, 0xf5, 0xf7];
const BOTTOM = [0xec, 0xee, 0xf1];
// radial-gradient(120% 70% at 50% 0%, rgba(255, 255, 255, 0.85) 0%, transparent 62%)
const BLOOM_ALPHA = 0.85;
const BLOOM_END = 0.62;
const BLOOM_RX = 1.2;
const BLOOM_RY = 0.7;

interface Card {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  columns: number;
  rows: number;
  near: boolean;
  pending: number;
}

function fill(card: Card) {
  const columns = Math.ceil(card.width / CELL);
  const rows = Math.ceil(card.height / CELL);
  if (columns < 1 || rows < 1 || (columns === card.columns && rows === card.rows)) return;
  const context = card.canvas.getContext("2d");
  if (!context) return;

  const frame = context.createImageData(columns, rows);
  const pixels = frame.data;
  // Bloom distance, squared, in units of the ellipse's radii; columns are shared by every row.
  const rx = columns * BLOOM_RX;
  const ry = rows * BLOOM_RY;
  const across = new Float32Array(columns);
  for (let x = 0; x < columns; x += 1) across[x] = ((x + 0.5 - columns / 2) / rx) ** 2;

  for (let y = 0, index = 0; y < rows; y += 1) {
    const t = (y + 0.5) / rows;
    const r = TOP[0] + (BOTTOM[0] - TOP[0]) * t;
    const g = TOP[1] + (BOTTOM[1] - TOP[1]) * t;
    const b = TOP[2] + (BOTTOM[2] - TOP[2]) * t;
    const down = ((y + 0.5) / ry) ** 2;
    const lit = down < BLOOM_END * BLOOM_END;
    const nudgeRow = (y & 3) * 4;
    for (let x = 0; x < columns; x += 1, index += 4) {
      let alpha = 0;
      if (lit) {
        const reach = Math.sqrt(across[x] + down);
        if (reach < BLOOM_END) alpha = BLOOM_ALPHA * (1 - reach / BLOOM_END);
      }
      // White over the base, then one brightness shift for all three channels.
      const red = r + (255 - r) * alpha;
      const green = g + (255 - g) * alpha;
      const blue = b + (255 - b) * alpha;
      const brightness = (red + green + blue) / 3;
      const shift = Math.round((brightness + NUDGE[nudgeRow + (x & 3)]) / STEP) * STEP - brightness;
      // The clamped array rounds and clamps each channel.
      pixels[index] = red + shift;
      pixels[index + 1] = green + shift;
      pixels[index + 2] = blue + shift;
      pixels[index + 3] = 255;
    }
  }

  const { canvas } = card;
  canvas.width = columns;
  canvas.height = rows;
  context.putImageData(frame, 0, 0);
  canvas.style.width = `${columns * CELL}px`;
  canvas.style.height = `${rows * CELL}px`;
  card.columns = columns;
  card.rows = rows;
}

// Safari has no requestIdleCallback; a short timeout still lets the current task finish.
const whenIdle = (run: () => void) =>
  typeof requestIdleCallback === "function" ? requestIdleCallback(run, { timeout: 500 }) : window.setTimeout(run, 50);

export function startCardDither(hosts: HTMLElement[]) {
  const cards = new Map<Element, Card>();

  // The first paint waits for idle time; later ones for the resize to settle.
  const schedule = (card: Card) => {
    if (!card.near) return;
    if (card.columns) {
      window.clearTimeout(card.pending);
      card.pending = window.setTimeout(() => fill(card), RESIZE_SETTLE_MS);
    } else if (!card.pending) {
      // Cleared first: a paint that found no size yet lets the next resize entry try again.
      card.pending = whenIdle(() => {
        card.pending = 0;
        fill(card);
      });
    }
  };

  // Content-box sizes come with the entry, so reading them forces no layout.
  const resizes = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const card = cards.get(entry.target);
      if (!card) continue;
      card.width = entry.contentRect.width;
      card.height = entry.contentRect.height;
      schedule(card);
    }
  });

  const approaches = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const card = cards.get(entry.target);
        if (!card || !entry.isIntersecting) continue;
        card.near = true;
        approaches.unobserve(entry.target);
        schedule(card);
      }
    },
    { rootMargin: "100% 0px" },
  );

  for (const host of hosts) {
    const canvas = host.querySelector("canvas");
    if (!canvas) continue;
    cards.set(host, { canvas, width: 0, height: 0, columns: 0, rows: 0, near: false, pending: 0 });
    resizes.observe(host);
    approaches.observe(host);
  }
}
