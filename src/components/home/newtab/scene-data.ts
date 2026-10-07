/*
 * What the new tab illustrations show. Wallpapers are the extension's own
 * built-ins (lumno-extension/assets/wallpapers), resized for the cards.
 */

const WALLPAPER_ROOT = "/assets/feature-newtab/wallpapers";

export const wallpaper = (name: string) => `${WALLPAPER_ROOT}/${name}.webp`;
export const wallpaperThumb = (name: string) => `${WALLPAPER_ROOT}/${name}-thumb.webp`;

/** Built-in light wallpapers the appearance panel clicks through. */
export const PANEL_WALLPAPERS = ["impressionist-orchard-white", "white-3d-observatory", "white-risograph-collage"];

/** Built-ins that ship as a day and night pair. */
export const DAY_NIGHT_PAIRS: Array<[string, string]> = [
  ["white-shanshui", "dark-shanshui-moonlit"],
  ["monet-lily-pond-white", "dark-monet-lily-nocturne"],
  ["white-linocut-topographic", "dark-linocut-topographic"],
];

export type Shortcut = {
  name: string;
  src: string;
  /** Tile surface the extension samples from the favicon (same values as NewTabMock). */
  tint: string;
  /** Monochrome built-in icons the extension inverts in dark mode. */
  mono?: boolean;
  /** Bare glyph on the tile, without the favicon's own white rounded backing. */
  bare?: boolean;
  /** Drawn size in px when the artwork has extra padding around the glyph. */
  size?: number;
};

const SHORTCUT_ROOT = "/assets/feature-newtab/shortcuts";

// Seven sites spread around the colour wheel, so each tile's tint reads differently.
// ChatGPT stays fifth: it's the tile the pointer rests on (DockScene).
export const SHORTCUTS: Shortcut[] = [
  { name: "YouTube", src: `${SHORTCUT_ROOT}/youtube.svg`, tint: "255, 216, 216", bare: true },
  { name: "Dribbble", src: `${SHORTCUT_ROOT}/dribbble.svg`, tint: "251, 225, 235", bare: true, size: 28 },
  { name: "Hugeicons", src: `${SHORTCUT_ROOT}/hugeicons.svg`, tint: "233, 246, 218", bare: true, size: 28 },
  { name: "Twitch", src: `${SHORTCUT_ROOT}/twitch.svg`, tint: "236, 225, 255", bare: true, size: 24 },
  { name: "ChatGPT", src: `${SHORTCUT_ROOT}/chatgpt.svg`, tint: "212, 238, 232", mono: true, bare: true },
  { name: "Claude", src: `${SHORTCUT_ROOT}/claude.png`, tint: "249, 234, 229" },
  { name: "Google", src: `${SHORTCUT_ROOT}/google.png`, tint: "221, 233, 253" },
];

/** A bookmark with its site's favicon: a file name in src/assets/home-favicons (see SOURCES.md). */
export type BookmarkLink = { name: string; icon: string };

/** Inside the first folder: opened, hovered and dropped down in the three bookmark cards. */
export const REFERENCE_LINKS: BookmarkLink[] = [
  { name: "Apple HIG", icon: "apple" },
  { name: "Material 3", icon: "material-3" },
  { name: "Figma", icon: "figma" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Vercel", icon: "vercel" },
  { name: "Supabase", icon: "supabase" },
  { name: "GitHub Docs", icon: "github" },
  { name: "Stack Overflow", icon: "stackoverflow" },
  { name: "npm", icon: "npm" },
  { name: "Medium", icon: "medium" },
  { name: "YouTube", icon: "youtube" },
  { name: "Dribbble", icon: "dribbble" },
];

/** The folder nested inside it, one level further down. */
export const ICON_LINKS: BookmarkLink[] = [
  { name: "SF Symbols", icon: "apple" },
  { name: "Material Symbols", icon: "google-fonts" },
  { name: "Remix Icon", icon: "remixicon" },
];

/** Links that sit beside the folders at the top level. */
export const ROOT_LINKS: BookmarkLink[] = [
  { name: "ChatGPT", icon: "openai" },
  { name: "GitHub", icon: "github" },
];
