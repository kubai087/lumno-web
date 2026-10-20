import { LUMNO_SITE_SEARCH_ICON_ROOT } from "./lumno-search-providers";

/*
 * What the site's drawings of the extension's command bar share: provider
 * glyphs and tiles, the accent each provider tints its rows with, and title
 * highlighting. Every number follows lumno-extension's overlay styles.
 */

// Glyphs the extension ships as PNG; the rest are SVG.
const GLYPH_EXT: Record<string, string> = {
  dbai: "png",
  gs: "png",
  jd: "png",
  mx: "png",
  qw: "png",
  rd: "png",
  tb: "png",
  xhs: "png",
  zh: "png",
};

export const glyph = (key: string) => `${LUMNO_SITE_SEARCH_ICON_ROOT}/glyph-${key}.${GLYPH_EXT[key] || "svg"}`;
export const tile = (key: string) => `${LUMNO_SITE_SEARCH_ICON_ROOT}/tile-${key}.png`;

// Brand accents the extension samples from each favicon; null keeps the neutral theme.
const ACCENT: Record<string, [number, number, number] | null> = {
  bb: [251, 114, 153],
  dbai: [56, 132, 255],
  ds: [77, 107, 254],
  gg: [66, 133, 244],
  gh: null,
  gm: [66, 133, 244],
  gpt: null,
  gs: [66, 133, 244],
  jd: [225, 37, 27],
  kimi: null,
  mx: [234, 70, 93],
  pplx: [32, 128, 141],
  qw: [97, 92, 237],
  rd: [255, 69, 0],
  tb: [255, 80, 0],
  wk: null,
  xhs: [255, 36, 66],
  yt: [255, 0, 0],
  zh: [5, 109, 232],
  zw: null,
};

/**
 * Mirrors the extension's favicon theme builder: each surface is the accent
 * blended into white at a fixed strength. Neutral sites reuse its GitHub theme.
 */
export function themeVars(key: string, fallback: [number, number, number] = [66, 133, 244]): Record<string, string> {
  const accent = key in ACCENT ? ACCENT[key] : fallback;
  if (!accent) {
    return {
      "--accent": "111, 115, 122",
      "--row-bg": "rgb(236, 236, 237)",
      "--tag-bg": "rgb(229, 230, 231)",
      "--tag-border": "rgb(194, 196, 197)",
      "--mark-bg": "rgb(200, 201, 203)",
    };
  }
  const mix = (amount: number) => `rgb(${accent.map((channel) => Math.round(255 + (channel - 255) * amount)).join(", ")})`;
  return {
    "--accent": accent.join(", "),
    "--row-bg": mix(0.145),
    "--tag-bg": mix(0.24),
    "--tag-border": mix(0.49),
    "--mark-bg": mix(0.41),
  };
}

/** themeVars as an inline style string, for Astro markup. */
export const themeStyle = (key: string, fallback?: [number, number, number]) =>
  Object.entries(themeVars(key, fallback))
    .map(([name, value]) => `${name}: ${value}`)
    .join(";");

/** Splits a title around every case-insensitive occurrence of `mark`. */
export function highlight(text: string, mark: string) {
  const parts: Array<{ text: string; hit: boolean }> = [];
  const lower = text.toLowerCase();
  const needle = mark.toLowerCase();
  let cursor = 0;
  let index = needle ? lower.indexOf(needle) : -1;
  while (index >= 0) {
    if (index > cursor) parts.push({ text: text.slice(cursor, index), hit: false });
    parts.push({ text: text.slice(index, index + needle.length), hit: true });
    cursor = index + needle.length;
    index = lower.indexOf(needle, cursor);
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false });
  return parts;
}
