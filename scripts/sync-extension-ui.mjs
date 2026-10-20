#!/usr/bin/env node
/*
 * Copies the extension's own UI styles into the /design gallery, so its
 * components are drawn by the extension's CSS rather than a re-creation.
 *
 *   node scripts/sync-extension-ui.mjs [path/to/lumno-extension]
 *
 * Reads ../lumno-extension by default and writes src/components/design/extension/.
 * The output is committed (CI has no extension checkout); rerun after the
 * extension's styles change.
 *
 * Shared files are copied whole. From options.css only the rules for the
 * components the gallery shows are kept. Page-level selectors are rescoped to
 * a gallery card, which carries class "dg-ext" and data-theme:
 *   :root, body                 -> .dg-ext
 *   body[data-theme="…"]        -> .dg-ext[data-theme="…"]
 *   #…settings_panel / #…tabs   -> the same names as classes
 * Rules that only make sense for a whole page (the bare body, html, the
 * system-dark fallback, reduced-motion resets) are dropped.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const extension = path.resolve(process.argv[2] || path.join(root, "..", "lumno-extension"));
const out = path.join(root, "src/components/design/extension");

const SHARED = [
  "tokens",
  "switch",
  "menu-surface",
  "custom-select",
  "checkbox",
  "choice-card",
  "info-button",
  "link-button",
  "range-slider",
  "tooltip",
  "toast",
  "busy",
  "feature-hints",
  "cursor-tooltip",
  "search-input",
];

const PANEL = "_x_extension_settings_panel_2024_unique_";

/** Splits CSS into top-level blocks: { prelude, body } or { comment }. */
function blocks(css) {
  const list = [];
  let i = 0;
  while (i < css.length) {
    if (/\s/.test(css[i])) {
      i++;
      continue;
    }
    if (css.startsWith("/*", i)) {
      const end = css.indexOf("*/", i) + 2;
      list.push({ comment: css.slice(i, end) });
      i = end;
      continue;
    }
    const open = css.indexOf("{", i);
    const semi = css.indexOf(";", i);
    if (semi >= 0 && (open < 0 || semi < open)) {
      list.push({ statement: css.slice(i, semi + 1).trim() });
      i = semi + 1;
      continue;
    }
    if (open < 0) break;
    let depth = 0;
    let j = open;
    for (; j < css.length; j++) {
      if (css.startsWith("/*", j)) {
        j = css.indexOf("*/", j) + 1;
        continue;
      }
      if (css[j] === '"' || css[j] === "'") {
        const quote = css[j];
        j++;
        while (j < css.length && css[j] !== quote) j += css[j] === "\\" ? 2 : 1;
        continue;
      }
      if (css[j] === "{") depth++;
      if (css[j] === "}") {
        depth--;
        if (depth === 0) break;
      }
    }
    list.push({ prelude: css.slice(i, open).trim(), body: css.slice(open + 1, j) });
    i = j + 1;
  }
  return list;
}

/**
 * Hangs every rule of a shadow-root sheet under `scope` (the element that stands for its host or
 * panel), so its bare element rules stay inside; a selector already starting with the scope keeps
 * its place; the rest hang under `prefix` (the scope without the weight it may carry for an id).
 * A `:hover` rule gets a [data-dg-hover="true"] twin for the cards' demos to point with.
 */
function scopeUnder(css, scope, prefix = scope) {
  return blocks(css)
    .filter((block) => block.prelude !== undefined)
    .map(({ prelude, body }) => {
      if (prelude.startsWith("@media") || prelude.startsWith("@supports") || prelude.startsWith("@container")) {
        return `${prelude} {\n${scopeUnder(body, scope, prefix)}\n}`;
      }
      if (prelude.startsWith("@")) return `${prelude} {${body}}`;
      const selectors = prelude
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .split(SPLIT_SELECTORS)
        .map((selector) => selector.trim())
        .map((selector) => (selector.startsWith(scope) ? selector : `${prefix} ${selector}`))
        .flatMap((selector) => (selector.includes(":hover") ? [selector, selector.replaceAll(":hover", '[data-dg-hover="true"]')] : [selector]));
      return `${selectors.join(",\n")} {${body}}`;
    })
    .join("\n\n");
}

/** An extension UMD file as an ES module: its CommonJS branch dropped, its global exported. */
function umdAsModule(source, globalName) {
  const withoutCommonJs = source.replace(/\n\s*if \(typeof module === 'object' && module\.exports\) \{\n\s*module\.exports = api;\n\s*\}/, "");
  if (withoutCommonJs === source) throw new Error(`No CommonJS export to drop for ${globalName}`);
  return `${withoutCommonJs}\nexport default globalThis.${globalName};\n`;
}

/** Splits a selector list at its top-level commas (not those inside :is(), :not() or :has()). */
const SPLIT_SELECTORS = {
  [Symbol.split](list) {
    const parts = [];
    let depth = 0;
    let start = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === "(") depth++;
      else if (list[i] === ")") depth--;
      else if (list[i] === "," && depth === 0) {
        parts.push(list.slice(start, i));
        start = i + 1;
      }
    }
    parts.push(list.slice(start));
    return parts;
  },
};

function rescope(selector) {
  return selector
    .replace(/:root\b/g, ".dg-ext")
    .replace(/body\[data-glass-style\]\s*/g, ".dg-ext ")
    .replace(/body(\[data-theme="(?:dark|light)"\])/g, ".dg-ext$1")
    .replace(new RegExp(`#${PANEL}`, "g"), `.${PANEL}`)
    .replace(/#_x_extension_settings_tabs_2024_unique_/g, "._x_extension_settings_tabs_2024_unique_")
    .replace(/#_x_extension_options_root_2024_unique_/g, ".dg-ext");
}

const pageOnly = (selector) => /(^|[\s,(])(html|body)(?![\w-])/.test(selector) && !/\.dg-ext/.test(rescope(selector));

function filterCss(css, keep, { pageTokens = true } = {}) {
  const outBlocks = [];
  for (const block of blocks(css)) {
    if (block.comment) continue;
    if (block.statement) continue;
    const { prelude, body } = block;
    if (prelude.startsWith("@media") || prelude.startsWith("@supports")) {
      if (/prefers-color-scheme:\s*dark/.test(prelude)) continue;
      // Breakpoints are the extension page's width; a gallery card is narrower at every width.
      if (/(max|min)-width/.test(prelude)) continue;
      const inner = filterCss(body, keep, { pageTokens });
      if (inner.trim()) outBlocks.push(`${prelude} {\n${inner}\n}`);
      continue;
    }
    if (prelude.startsWith("@keyframes") || prelude.startsWith("@property")) {
      if (keep(prelude)) outBlocks.push(`${prelude} {${body}}`);
      continue;
    }
    // The page's own tokens (body { --tab-bg: …; }) apply to the card; the rest of a body rule is page layout.
    const bodyMatch = prelude.match(/^body(\[data-theme="(?:dark|light)"\])?$/);
    if (bodyMatch) {
      if (!pageTokens) continue;
      const tokens = body
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .split(";")
        .map((declaration) => declaration.trim())
        .filter((declaration) => declaration.startsWith("--"));
      if (tokens.length) outBlocks.push(`.dg-ext${bodyMatch[1] || ""} {\n  ${tokens.join(";\n  ")};\n}`);
      continue;
    }
    if (pageOnly(prelude)) continue;
    if (!keep(prelude)) continue;
    outBlocks.push(`${rescope(prelude)} {${body}}`);
  }
  return outBlocks.join("\n\n");
}

/*
 * options.css whole, scoped to the gallery card: every selector is placed under
 * .dg-ext (the page's :root and body become the card itself), and each id keeps
 * its weight as a class plus :not(#…), so rules still win where they won on the
 * options page. The options root's own page layout and html-level rules go.
 */
const OPTIONS_ROOT = "_x_extension_options_root_2024_unique_";
// The options page pads the panel 20px on each side, so a page breakpoint is a panel 40px narrower.
const PAGE_GUTTERS = 40;
function scopeOptionsPart(part, root = OPTIONS_ROOT, scope = ".dg-ext") {
  let selector = part.trim();
  if (/(^|[\s>+~(])html(?![\w-])/.test(selector)) return null;
  selector = selector
    .replace(/:root\b/g, scope)
    .replace(/^body(\[data-theme="(?:dark|light)"\])/, `${scope}$1`)
    .replace(/^body(?![\w-])/, scope);
  if (/(^|[\s>+~(])body(?![\w-])/.test(selector)) return null;
  if (new RegExp(`^#${root}(?![\\w-])\\S*$`).test(selector)) return null;
  selector = selector
    .replace(new RegExp(`#${root}(?![\\w-])`, "g"), `${scope}:not(#dg-root)`)
    .replace(/#(_x_extension_[\w-]+)/g, ".$1:not(#dg$1)");
  // A root id inside :is() already became the scope; anything else hangs under it.
  return selector.includes(scope) ? selector : `${scope} ${selector}`;
}
function scopeOptions(css, root = OPTIONS_ROOT, scope = ".dg-ext") {
  const out = [];
  for (const block of blocks(css)) {
    if (block.comment || block.statement) continue;
    const { prelude, body } = block;
    if (prelude.startsWith("@media") || prelude.startsWith("@supports")) {
      if (/prefers-color-scheme/.test(prelude)) continue;
      // The page's narrow layouts (title over control, tighter panel) follow the panel's own
      // width in a card, which is as narrow as the page's panel is on a phone.
      const narrow = prelude.match(/^@media \(max-width: (\d+)px\)$/);
      if (narrow) {
        const inner = scopeOptions(body, root, scope);
        const panel = Number(narrow[1]) - PAGE_GUTTERS;
        if (inner.trim()) out.push(`@container dg-panel (max-width: ${panel}px) {\n${inner}\n}`);
        continue;
      }
      if (/(max|min)-(width|height)/.test(prelude)) continue;
      const inner = scopeOptions(body, root, scope);
      if (inner.trim()) out.push(`${prelude} {\n${inner}\n}`);
      continue;
    }
    if (prelude.startsWith("@keyframes") || prelude.startsWith("@property")) {
      out.push(`${prelude} {${body}}`);
      continue;
    }
    if (prelude.startsWith("@")) continue;
    // Page artwork lives in the extension's assets; the gallery has none of it.
    if (/url\(\s*["']?\.\.\//.test(body)) continue;
    // The page's own tokens apply to the card; the rest of a body rule is page layout.
    const bodyMatch = prelude.match(/^body(\[data-theme="(?:dark|light)"\])?$/);
    if (bodyMatch) {
      const tokens = body
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .split(";")
        .map((declaration) => declaration.trim())
        .filter((declaration) => declaration.startsWith("--"));
      if (tokens.length) out.push(`${scope}${bodyMatch[1] || ""} {\n  ${tokens.join(";\n  ")};\n}`);
      continue;
    }
    const parts = prelude
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .split(SPLIT_SELECTORS)
      .map((part) => scopeOptionsPart(part, root, scope))
      .filter(Boolean);
    // Rules on the page itself (noise overlay, scrollbars) land on the card element: only their tokens apply.
    const self = (selector) => new RegExp(`^\\${scope}(\\[[^\\]]*\\]|:not\\([^)]*\\))*(::?[\\w-]+)*$`).test(selector);
    const nested = parts.filter((selector) => !self(selector));
    const own = parts.filter(self);
    if (nested.length) out.push(`${nested.join(",\n")} {${body}}`);
    if (own.length) {
      const tokens = body
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .split(";")
        .map((declaration) => declaration.trim())
        .filter((declaration) => declaration.startsWith("--"));
      if (tokens.length && own.every((selector) => !/::/.test(selector))) out.push(`${own.join(",\n")} {\n  ${tokens.join(";\n  ")};\n}`);
    }
  }
  return out.join("\n\n");
}

const header = (source) =>
  `/* Generated from lumno-extension/${source} by scripts/sync-extension-ui.mjs. Do not edit; rerun the script. */\n\n`;

fs.mkdirSync(out, { recursive: true });
for (const name of SHARED) {
  const source = `src/shared/${name}.css`;
  const css = fs.readFileSync(path.join(extension, source), "utf8");
  // Reduced-motion resets in tokens.css target every element on the page; the site has its own.
  const keep = name === "tokens" ? (prelude) => !prelude.startsWith("*") : () => true;
  // Shared rules that name the overlay's panel apply to .dg-ovl, the gallery's stand-in for it.
  const shared = filterCss(css, keep).replaceAll("#_x_extension_overlay_2024_unique_", ".dg-ovl");
  fs.writeFileSync(path.join(out, `${name}.css`), header(source) + shared + "\n");
}

const options = fs.readFileSync(path.join(extension, "src/options/options.css"), "utf8");
fs.writeFileSync(path.join(out, "options.css"), header("src/options/options.css") + scopeOptions(options) + "\n");

// The new tab whole, scoped the same way under .dg-nt (its components' wrapper), so its page
// tokens never reach the options controls; glass and wallpaper variants stay keyed to body
// attributes the wrapper never has, so the plain look applies.
const NEWTAB_ROOT = "_x_extension_newtab_root_2024_unique_";
fs.writeFileSync(path.join(out, "newtab.css"), header("src/newtab/newtab.css") + scopeOptions(fs.readFileSync(path.join(extension, "src/newtab/newtab.css"), "utf8"), NEWTAB_ROOT, ".dg-nt") + "\n");

// The new tab's dialogs (the folder color picker's frame and buttons) and the picker itself.
for (const name of ["shortcut-dialog", "folder-color-picker", "glass-style"]) {
  const css = fs.readFileSync(path.join(extension, `src/newtab/${name}.css`), "utf8");
  fs.writeFileSync(path.join(out, `${name}.css`), header(`src/newtab/${name}.css`) + scopeOptions(css, NEWTAB_ROOT, ".dg-nt") + "\n");
}

// The extension's own React for the folder color form, rendered by the gallery as is, in the
// extension's folder layout. Its option callbacks (folder icon, saving) are supplied by the card.
// One change: its format menu portals into the card (data-dg-portal) rather than <body>, where
// the gallery's scoped tokens would not reach it.
const reactOut = path.join(out, "react");
for (const [source, patch] of [
  [
    "react-src/newtab/folder-color-picker.tsx",
    (code) =>
      code.replace(
        "menuClassName: 'x-nt-folder-color-format-menu',",
        "menuClassName: 'x-nt-folder-color-format-menu',\n                    menuPortalContainer: formatHost.closest('[data-dg-portal]') || undefined,",
      ) + "\nexport { FolderColorForm };\n",
  ],
  ["react-src/newtab/select-menu.tsx"],
  ["react-src/newtab/shortcut-dialog-helpers.ts"],
  ["react-src/newtab/folder-color.ts"],
  ["react-src/shared/select-menu.tsx"],
]) {
  const code = fs.readFileSync(path.join(extension, source), "utf8");
  const target = path.join(reactOut, path.relative("react-src", source));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const patched = patch ? patch(code) : code;
  if (patch && patched === code + "") throw new Error(`Patch did not apply to ${source}`);
  fs.writeFileSync(target, `// @ts-nocheck\n// Generated from lumno-extension/${source} by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.\n${patched}`);
}

// The command bar overlay's suggestion rows, scoped to .dg-ovl, which stands for the overlay's panel.
const OVERLAY_ROOT = "_x_extension_overlay_2024_unique_";
fs.writeFileSync(
  path.join(out, "suggestions-view.css"),
  header("src/overlay/suggestions-view.css") +
    scopeOptions(fs.readFileSync(path.join(extension, "src/overlay/suggestions-view.css"), "utf8"), OVERLAY_ROOT, ".dg-ovl") +
    "\n",
);

// The overlay panel's light and dark tokens (search-panel.js overlayThemeTokens), which the
// extension sets inline on the panel as --x-ov-* and --x-ext-input-* variables.
{
  const panel = fs.readFileSync(path.join(extension, "src/overlay/search-panel.js"), "utf8");
  const start = panel.indexOf("const overlayThemeTokens = ");
  const end = panel.indexOf("};", start);
  if (start < 0 || end < 0) throw new Error("overlayThemeTokens not found in search-panel.js");
  const tokens = new Function(`return (${panel.slice(start + "const overlayThemeTokens = ".length, end + 1)});`)();
  fs.writeFileSync(
    path.join(out, "overlay-theme-tokens.ts"),
    "// Generated from lumno-extension/src/overlay/search-panel.js by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.\n" +
      `export const OVERLAY_THEME_TOKENS = ${JSON.stringify(tokens, null, 2)} as const;\n`,
  );
}

// The extension's site theming (accent → row, tag and mark colors), as an ES module.
fs.writeFileSync(
  path.join(out, "favicon-theme.js"),
  "// Generated from lumno-extension/src/newtab/favicon-theme.js by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.\n" +
    umdAsModule(fs.readFileSync(path.join(extension, "src/newtab/favicon-theme.js"), "utf8"), "LumnoNewtabFaviconTheme"),
);
fs.writeFileSync(
  path.join(out, "favicon-theme.d.ts"),
  "// Generated by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.\n" +
    "type Rgb = [number, number, number];\n" +
    "export type FaviconTheme = { accent: string; accentRgb: Rgb; highlightBg: string; highlightBorder: string; markBg: string; markText: string; activeMarkBg: string; activeMarkText: string; tagBg: string; tagText: string; tagBorder: string; keyBg: string; keyText: string; keyBorder: string; buttonText: string; buttonBg: string; buttonBorder: string; placeholderText: string; _xIsBrand?: boolean; _xIsDefault?: boolean };\n" +
    "type ModeOptions = { defaultTheme?: FaviconTheme; isDarkMode?: boolean | (() => boolean) };\n" +
    "declare const api: {\n" +
    "  defaultAccentColor: Rgb;\n" +
    "  buildTheme(rgb: Rgb): FaviconTheme;\n" +
    "  createDefaultTheme(): FaviconTheme;\n" +
    "  getBrandAccentForUrl(url: string): Rgb | null;\n" +
    "  getBrandAccentForHost(host: string): Rgb | null;\n" +
    "  extractAverageColor(image: HTMLImageElement): Rgb | null;\n" +
    "  getThemeForMode(theme: FaviconTheme | null, options?: ModeOptions): FaviconTheme;\n" +
    "  getHoverColors(theme: FaviconTheme | null, options?: ModeOptions): { bg: string; border: string; text: string };\n" +
    "  getContrastRatio(first: Rgb, second: Rgb): number;\n" +
    "  mixColor(color: Rgb, target: Rgb, amount: number): Rgb;\n" +
    "  rgbToCss(rgb: Rgb): string;\n" +
    "};\n" +
    "export default api;\n",
);

// The selection toolbar (content/selection-quick-actions.js): its shadow stylesheet, kept in the
// script as SELECTION_SURFACE_STYLES, with :host standing for .dg-sqa-host; its action icons; its mark.
{
  const script = fs.readFileSync(path.join(extension, "src/content/selection-quick-actions.js"), "utf8");
  const start = script.indexOf("const SELECTION_SURFACE_STYLES = `");
  const end = script.indexOf("`;", start);
  if (start < 0 || end < 0) throw new Error("SELECTION_SURFACE_STYLES not found");
  const styles = script
    .slice(script.indexOf("`", start) + 1, end)
    .replace(/:host\(([^)]*)\)/g, ".dg-sqa-host$1")
    .replace(/:host\b/g, ".dg-sqa-host")
    .replace(/^ {6}/gm, "");
  fs.writeFileSync(path.join(out, "selection-quick-actions.css"), header("src/content/selection-quick-actions.js (SELECTION_SURFACE_STYLES)") + scopeUnder(styles, ".dg-sqa-host") + "\n");
  fs.writeFileSync(
    path.join(out, "selection-action-icons.js"),
    "// Generated from lumno-extension/src/shared/selection-action-icons.js by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.\n" +
      umdAsModule(fs.readFileSync(path.join(extension, "src/shared/selection-action-icons.js"), "utf8"), "LumnoSelectionActionIcons"),
  );
  fs.writeFileSync(
    path.join(out, "selection-action-icons.d.ts"),
    "// Generated by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.\n" +
      "type Icon = { viewBox: string; body: string };\n" +
      "declare const api: { remix: Record<string, Icon> };\n" +
      "export default api;\n",
  );
  fs.copyFileSync(path.join(extension, "assets/images/lumno-selection-mark.svg"), path.join(root, "public/assets/design/lumno-selection-mark.svg"));
}

// The recent-tab switcher (overlay/tab-switcher.js buildStyles): its panel id stands for .dg-ts-panel,
// and the window it is sized against is the card's .dg-ts-stage (a size container named dg-ts).
{
  const script = fs.readFileSync(path.join(extension, "src/overlay/tab-switcher.js"), "utf8");
  const panelId = /const PANEL_ID = '([^']+)'/.exec(script)[1];
  const start = script.indexOf("function buildStyles()");
  const open = script.indexOf("`", start);
  const close = script.indexOf("`;", open);
  const styles = script
    .slice(open + 1, close)
    .replaceAll("${PANEL_ID}", panelId)
    .replace(/:host\s*\{[^}]*\}/, "")
    // The id keeps its weight (its `#panel *` rule must still beat the cards' `all: unset`).
    .replaceAll(`#${panelId}`, ".dg-ts-panel:not(#dg-ts)")
    .replaceAll("100vw", "100cqw")
    .replace(/@media \(max-width: (\d+)px\)/g, "@container dg-ts (max-width: $1px)")
    .replace(/^ {6}/gm, "");
  fs.writeFileSync(path.join(out, "tab-switcher.css"), header("src/overlay/tab-switcher.js (buildStyles)") + scopeUnder(styles, ".dg-ts-panel:not(#dg-ts)", ".dg-ts-panel") + "\n");
}

// The WebDAV form (account tab): its field grid and password field.
const webdav = fs.readFileSync(path.join(extension, "src/options/webdav-options.css"), "utf8");
fs.writeFileSync(path.join(out, "webdav-options.css"), header("src/options/webdav-options.css") + scopeOptions(webdav) + "\n");

// The extension's own words for the controls the gallery shows, in its four languages.
const STRING_KEYS = [
  "settings_tab_general", "settings_tab_account", "settings_tab_appearance", "settings_tab_labs",
  "settings_global_section_title", "settings_onboarding_tutorial_action", "settings_language_title",
  "language_system", "language_zh_cn", "language_zh_tw", "language_ja", "language_en",
  "settings_shortcuts_section_title", "settings_shortcuts_browser_desc_prefix", "settings_shortcuts_browser_desc_path_extensions",
  "settings_shortcuts_browser_desc_path_shortcuts", "settings_shortcuts_browser_desc_suffix", "settings_shortcuts_action",
  "settings_update_notice_title", "settings_update_notice_desc", "settings_auto_pip_title", "settings_auto_pip_desc",
  "settings_tab_switcher_title", "settings_tab_switcher_desc",
  "settings_search_results_section_title", "settings_search_result_sources_title", "settings_search_result_sources_order_desc",
  "search_tag_top_site", "search_tag_bookmark", "search_tag_history",
  "settings_webpage_focus_overlay_section_title", "settings_overlay_size_title", "overlay_size_compact", "overlay_size_standard",
  "overlay_size_large", "settings_overlay_enter_animation_title", "overlay_enter_animation_elastic", "overlay_enter_animation_fade",
  "settings_appearance_global_section_title", "settings_theme_title", "settings_theme_system", "settings_theme_light", "settings_theme_dark",
  "settings_motion_effects_title", "settings_motion_effects_desc",
  "settings_newtab_section_title", "newtab_time_font_size_title", "newtab_time_opacity_title", "newtab_time_font_size_reset", "newtab_time_opacity_reset",
  "webdav_title", "webdav_endpoint", "webdav_directory", "webdav_username", "webdav_password", "webdav_password_show", "webdav_password_hide",
  "shortcut_reference_group_tab_switcher", "shortcut_reference_tab_switcher_title", "shortcut_reference_tab_switcher_cycle_title",
  "shortcut_reference_tab_switcher_confirm_title",
  "blacklist_group_custom", "blacklist_clear", "blacklist_section_desc", "confirm_clear_blacklist", "confirm_ok", "confirm_cancel", "toast_cleared",
  // New tab
  "bookmarks_heading", "bookmarks_page_prev", "bookmarks_page_next", "bookmarks_copy_url",
  "newtab_open_in_new_tab", "shortcuts_edit", "shortcuts_remove", "newtab_shortcuts_context_menu_label",
  "newtab_shortcuts_removed_undo", "newtab_shortcuts_remove_undone", "newtab_shortcuts_stack_hint",
  "newtab_shortcuts_stacked_undo", "newtab_shortcuts_stack_undone", "newtab_shortcuts_cancel", "newtab_shortcuts_save",
  "newtab_shortcuts_icon_refresh", "newtab_shortcuts_icon_refreshing", "newtab_shortcuts_icon_refresh_success",
  "folder_color_change", "folder_color_title", "folder_color_presets", "folder_color_default", "folder_color_saved",
  "folder_color_save_current", "folder_color_remove_saved", "folder_color_format", "folder_color_invalid",
  "recent_mode_latest", "recent_mode_most", "search_number_jump_release_hint",
  "newtab_appearance_settings_title", "newtab_more_settings", "newtab_style_section_title", "settings_newtab_glass_style_title",
  "settings_newtab_glass_style_none", "settings_newtab_glass_style_frosted", "settings_newtab_glass_style_liquid",
  "newtab_search_section_title", "newtab_search_width_title", "newtab_search_width_aria", "newtab_input_auto_focus_title",
  "settings_newtab_shortcuts_title", "settings_newtab_shortcut_add_title", "settings_newtab_shortcut_dock_magnification_title",
  "action_go_current_tab", "recent_pin_add", "display_mode_title",
  // The shortcut dialog.
  "newtab_shortcuts_icon_current", "newtab_shortcuts_edit_dialog_title", "newtab_shortcuts_name_label", "newtab_shortcuts_url_label", "newtab_shortcuts_edited",
  // The recent-tab switcher.
  "tab_switcher_title", "tab_switcher_close_tab", "tab_switcher_tab_closed", "tab_switcher_favicon_alt",
  // The selection toolbar.
  "selection_quick_action_open_menu", "settings_tab_labs", "selection_quick_action_ask", "selection_quick_action_translate", "selection_quick_action_explain", "selection_quick_action_summarize", "selection_quick_action_search", "selection_quick_action_calculate",
  // The command bar overlay.
  "search_remove_history_tooltip", "search_number_jump_release_hint", "overlay_search_placeholder", "search_scope_active_placeholder", "search_scope_current", "search_scope_switcher_label", "site_search_tab_hint", "search_in_site_query", "ask_ai_provider_query", "search_query", "search_tag_open_tab", "action_open_new_tab", "action_search", "action_switch", "shortcut_reference_search_open_scope_menu_title", "command_settings", "search_input_clear", "overlay_close_other_tabs_tooltip", "search_copy_url_tooltip", "search_scope_group_ai", "search_scope_group_engines", "search_scope_group_sites", "settings_search_source_move_up", "settings_search_source_move_down", "search_scope_menu_filter_hint", "search_scope_menu_navigation_hint", "search_scope_menu_select_hint", "search_scope_menu_focus_toggle_hint", "search_scope_menu_shortcut_hint",
];
const LOCALES = { "zh-CN": "zh_CN", "zh-TW": "zh_TW", en: "en", ja: "ja" };
// The command bar's search scopes (site-search.json), grouped and named as the scope menu shows
// them: names the extension translates come from its locales (search-utils.js), the rest stay as is.
{
  const utils = fs.readFileSync(path.join(extension, "src/shared/search-utils.js"), "utf8");
  const namesStart = utils.indexOf("SITE_SEARCH_PROVIDER_DISPLAY_NAME_MESSAGES = Object.freeze(");
  const namesEnd = utils.indexOf("});", namesStart);
  const nameKeys = new Function(`return ${utils.slice(utils.indexOf("{", namesStart), namesEnd + 1)};`)();
  const modes = fs.readFileSync(path.join(extension, "src/shared/search-input-mode.js"), "utf8");
  const iconsStart = modes.indexOf("MODE_MENU_LINE_ICON_PATHS = Object.freeze(");
  const lineIcons = new Function(`return ${modes.slice(modes.indexOf("{", iconsStart), modes.indexOf("});", iconsStart) + 1)};`)();
  const data = JSON.parse(fs.readFileSync(path.join(extension, "assets/data/site-search.json"), "utf8"));
  const providers = {};
  for (const item of data.items) {
    const group = item.category === "searchEngine" ? "engine" : item.category === "aiSearch" || item.action ? "ai" : "site";
    providers[item.key] = { name: item.name, nameKey: nameKeys[item.key]?.[0], host: new URL(item.template.replace("{query}", "q")).hostname.replace(/^www\./, ""), group };
  }
  for (const [messageKey] of Object.values(nameKeys)) if (!STRING_KEYS.includes(messageKey)) STRING_KEYS.push(messageKey);
  for (const key of ["search_scope_group_local", "search_tag_top_site"]) if (!STRING_KEYS.includes(key)) STRING_KEYS.push(key);
  fs.writeFileSync(
    path.join(out, "overlay-providers.ts"),
    "// Generated from lumno-extension/assets/data/site-search.json, src/shared/search-utils.js and\n" +
      "// src/shared/search-input-mode.js by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.\n" +
      'import type { ExtensionStringKey } from "./strings";\n\n' +
      "export type OverlayProvider = { name: string; nameKey?: ExtensionStringKey; host: string; group: \"engine\" | \"site\" | \"ai\" };\n\n" +
      `export const OVERLAY_PROVIDERS: Record<string, OverlayProvider> = ${JSON.stringify(providers, null, 2)};\n\n` +
      `export const MODE_MENU_LINE_ICON_PATHS: Record<string, string[]> = ${JSON.stringify(lineIcons, null, 2)};\n`,
  );
}

const strings = Object.fromEntries(
  Object.entries(LOCALES).map(([locale, folder]) => {
    const messages = JSON.parse(fs.readFileSync(path.join(extension, `_locales/${folder}/messages.json`), "utf8"));
    return [locale, Object.fromEntries(STRING_KEYS.map((key) => {
      if (!messages[key]) throw new Error(`Missing ${key} in ${folder}`);
      return [key, messages[key].message];
    }))];
  }),
);
fs.writeFileSync(
  path.join(out, "strings.ts"),
  "// Generated from lumno-extension/_locales by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.\n\n" +
    `export type ExtensionStringKey =\n${STRING_KEYS.map((key) => `  | "${key}"`).join("\n")};\n\n` +
    `export const EXTENSION_STRINGS: Record<"zh-CN" | "zh-TW" | "en" | "ja", Record<ExtensionStringKey, string>> = ${JSON.stringify(strings, null, 2)};\n`,
);

const indicator = fs.readFileSync(path.join(extension, "react-src/shared/segmented-indicator.ts"), "utf8");
fs.writeFileSync(
  path.join(out, "segmented-indicator.ts"),
  `// Generated from lumno-extension/react-src/shared/segmented-indicator.ts by scripts/sync-extension-ui.mjs. Do not edit.\n${indicator}`,
);

// The theme picker's preview images (options-theme.js THEME_PREVIEWS).
const previews = path.join(root, "public/assets/design");
fs.mkdirSync(previews, { recursive: true });
for (const mode of ["system", "light", "dark"]) {
  fs.copyFileSync(path.join(extension, `assets/images/${mode}.svg`), path.join(previews, `theme-${mode}.svg`));
}

console.log(`Synced extension UI into ${path.relative(root, out)}`);

// Every sheet written must still parse: a page selector the scoping mangled fails the sync here,
// not as a broken page later.
const { default: postcss } = await import("postcss");
for (const file of fs.readdirSync(out).filter((name) => name.endsWith(".css"))) {
  postcss.parse(fs.readFileSync(path.join(out, file), "utf8"), { from: file });
}
