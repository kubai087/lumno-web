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
};

const SHORTCUT_ROOT = "/assets/feature-newtab/shortcuts";

// Same seven sites, in the same order, as the renders this section replaced.
export const SHORTCUTS: Shortcut[] = [
  { name: "GitHub", src: "/assets/site-search/glyph-gh.svg", tint: "237, 238, 238", mono: true },
  { name: "Notion", src: `${SHORTCUT_ROOT}/notion.png`, tint: "231, 231, 231" },
  { name: "Wikipedia", src: `${SHORTCUT_ROOT}/wikipedia.png`, tint: "240, 240, 240" },
  { name: "Apple", src: `${SHORTCUT_ROOT}/apple.png`, tint: "235, 235, 236" },
  { name: "ChatGPT", src: `${SHORTCUT_ROOT}/chatgpt.png`, tint: "212, 238, 232" },
  { name: "Claude", src: `${SHORTCUT_ROOT}/claude.png`, tint: "249, 234, 229" },
  { name: "Google", src: `${SHORTCUT_ROOT}/google.png`, tint: "221, 233, 253" },
];

/** A bookmark drawn with a Remix Icon brand glyph in its brand color. */
export type BookmarkLink = { name: string; icon: string; color: string };

/** Inside the first folder: opened, hovered and dropped down in the three bookmark cards. */
export const REFERENCE_LINKS: BookmarkLink[] = [
  { name: "Apple HIG", icon: "ri-apple-fill", color: "#111111" },
  { name: "Material 3", icon: "ri-google-fill", color: "#4285f4" },
  { name: "Figma", icon: "ri-figma-fill", color: "#f24e1e" },
  { name: "Tailwind CSS", icon: "ri-tailwind-css-fill", color: "#06b6d4" },
  { name: "React", icon: "ri-reactjs-fill", color: "#149eca" },
  { name: "Next.js", icon: "ri-nextjs-fill", color: "#111111" },
  { name: "Vercel", icon: "ri-vercel-fill", color: "#111111" },
  { name: "Supabase", icon: "ri-supabase-fill", color: "#3ecf8e" },
  { name: "GitHub Docs", icon: "ri-github-fill", color: "#161614" },
  { name: "Stack Overflow", icon: "ri-stack-overflow-fill", color: "#f48024" },
  { name: "npm", icon: "ri-npmjs-fill", color: "#cb3837" },
  { name: "Medium", icon: "ri-medium-fill", color: "#111111" },
  { name: "YouTube", icon: "ri-youtube-fill", color: "#ff0000" },
  { name: "Dribbble", icon: "ri-dribbble-fill", color: "#ea4c89" },
];

/** The folder nested inside it, one level further down. */
export const ICON_LINKS: BookmarkLink[] = [
  { name: "SF Symbols", icon: "ri-apple-fill", color: "#111111" },
  { name: "Material Symbols", icon: "ri-google-fill", color: "#4285f4" },
  { name: "Remix Icon", icon: "ri-remixicon-fill", color: "#e2445c" },
];

/** Links that sit beside the folders at the top level. */
export const ROOT_LINKS: BookmarkLink[] = [
  { name: "ChatGPT", icon: "ri-openai-fill", color: "#111111" },
  { name: "GitHub", icon: "ri-github-fill", color: "#161614" },
];
