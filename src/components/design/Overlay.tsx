import { Fragment, createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type Ref } from "react";
import FT, { type FaviconTheme } from "./extension/favicon-theme.js";
import { OVERLAY_PROVIDERS } from "./extension/overlay-providers";
import { OVERLAY_THEME_TOKENS } from "./extension/overlay-theme-tokens";
import { useExtensionText } from "./ext-strings";
import { useDesignTheme } from "./theme";
import { LUMNO_SITE_SEARCH_ICON_ROOT } from "../../lib/lumno-search-providers";

/*
 * The command bar overlay in the extension's markup: the panel
 * (search-panel.js), its search input and scope prefix (search-input.css,
 * search-input-mode.js), suggestion rows (suggestions-view.css,
 * react-src/search/suggestions.tsx) and the scope menu. Styles the extension
 * sets from script are set here the same way, with the same numbers; row
 * colors come from its favicon-theme.js.
 */

type Rgb = [number, number, number];
export type OverlayMode = "light" | "dark";

const DEFAULT_THEME = FT.createDefaultTheme();
const FONT = '"Lumno Open Sans", "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const tileUrl = (key: string) => `${LUMNO_SITE_SEARCH_ICON_ROOT}/tile-${key}.png`;

function brandTheme(accent: Rgb): FaviconTheme {
  const theme = FT.buildTheme(accent);
  theme._xIsBrand = true;
  return theme;
}

// Themes sampled from an image (search-panel.js getThemeFromUrl), once per image.
const sampled = new Map<string, Promise<FaviconTheme | null>>();
function themeFromImage(src: string) {
  if (!sampled.has(src)) {
    sampled.set(
      src,
      new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          const average = FT.extractAverageColor(image);
          resolve(average ? brandTheme(average) : null);
        };
        image.onerror = () => resolve(null);
        image.src = src;
      }),
    );
  }
  return sampled.get(src)!;
}

/**
 * A suggestion's theme as the overlay resolves it: the brand accent for its
 * host, else the average color of its icon (getThemeForSuggestion,
 * getThemeForProvider). The default theme until the icon is read.
 */
export function useSiteTheme({ url, provider, image }: { url?: string; provider?: string; image?: string }) {
  const host = provider ? OVERLAY_PROVIDERS[provider]?.host : "";
  const brand = provider ? (host ? FT.getBrandAccentForHost(host) : null) : url ? FT.getBrandAccentForUrl(url) : null;
  const source = image || (provider ? tileUrl(provider) : "");
  const [sampledTheme, setSampledTheme] = useState<FaviconTheme | null>(null);
  useEffect(() => {
    if (brand || !source) return;
    let live = true;
    themeFromImage(source).then((theme) => live && setSampledTheme(theme));
    return () => {
      live = false;
    };
  }, [brand, source]);
  return useMemo(() => (brand ? brandTheme(brand) : sampledTheme || DEFAULT_THEME), [brand, sampledTheme]);
}

export function useOverlayMode(): OverlayMode {
  return useDesignTheme().resolved;
}

const forMode = (theme: FaviconTheme, mode: OverlayMode) => FT.getThemeForMode(theme, { defaultTheme: DEFAULT_THEME, isDarkMode: mode === "dark" });

/* ---- search-input-mode.js color helpers, for the scope prefix and menu ---- */

function mixRgb(source: Rgb, target: Rgb, weight: number): Rgb {
  const w = Math.min(1, Math.max(0, weight));
  return [0, 1, 2].map((i) => Math.round(source[i] + (target[i] - source[i]) * w)) as Rgb;
}

function luminance(rgb: Rgb) {
  const [r, g, b] = rgb.map((value) => {
    const channel = Math.min(255, Math.max(0, value)) / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: Rgb, b: Rgb) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function accessibleColor(accent: Rgb, background: Rgb, minimum: number): Rgb {
  if (contrast(accent, background) >= minimum) return accent;
  const dark: Rgb = [15, 23, 42];
  const light: Rgb = [248, 250, 252];
  const target = contrast(dark, background) >= contrast(light, background) ? dark : light;
  let lower = 0;
  let upper = 1;
  let readable = target;
  for (let i = 0; i < 12; i++) {
    const weight = (lower + upper) / 2;
    const candidate = mixRgb(accent, target, weight);
    if (contrast(candidate, background) >= minimum) {
      readable = candidate;
      upper = weight;
    } else lower = weight;
  }
  return readable;
}

const css = (rgb: Rgb) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

/** getInputModePrefixVisual: the scope chip's tint and text, and the caret. */
export function prefixVisual(theme: FaviconTheme, mode: OverlayMode) {
  const resolved = forMode(theme, mode);
  const accent = resolved.accentRgb;
  const dark = mode === "dark";
  const opacity = dark ? 0.14 : 0.075;
  const text = css(accessibleColor(accent, mixRgb(accent, dark ? [17, 24, 39] : [255, 255, 255], 1 - opacity), 4.5));
  return { color: text, background: `rgba(${accent.join(", ")}, ${opacity})`, caret: resolved.placeholderText || css(accent) };
}

/** applyModeMenuIconTheme: a scope tile's selected fill and focus ring. */
function menuItemVisual(theme: FaviconTheme, mode: OverlayMode) {
  const accent = forMode(theme, mode).accentRgb;
  const dark = mode === "dark";
  const opacity = dark ? 0.2 : 0.14;
  const ring = css(accessibleColor(accent, mixRgb(accent, dark ? [20, 20, 20] : [255, 255, 255], 1 - opacity), 3));
  return { selected: `rgba(${accent.join(", ")}, ${opacity})`, ring };
}

/* ---- Stage ---- */

// Narrower than this the overlay's own layout runs out of room (the Tab hint covers the query), a
// width it never has in a browser window; a smaller card shows it drawn at this width, scaled down.
const MIN_OVERLAY_WIDTH = 440;
const OverlayScaleContext = createContext(1);
export const useOverlayScale = () => useContext(OverlayScaleContext);

/** The card area the overlay sits in, centred near the top; it scales the overlay down in narrow cards. */
export function OverlayStage({ children, className, stageRef }: { children: ReactNode; className?: string; stageRef?: Ref<HTMLDivElement> }) {
  const ownRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const stage = ownRef.current;
    if (!stage) return;
    const measure = () => {
      const style = getComputedStyle(stage);
      const width = stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      setScale(Math.min(1, width / MIN_OVERLAY_WIDTH));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  const setRefs = (node: HTMLDivElement | null) => {
    ownRef.current = node;
    if (typeof stageRef === "function") stageRef(node);
    else if (stageRef) (stageRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };
  return (
    <div className={["dg-ovl-stage", className].filter(Boolean).join(" ")} ref={setRefs}>
      <OverlayScaleContext.Provider value={scale}>
        <div className="dg-ovl-fit" style={scale < 1 ? ({ width: MIN_OVERLAY_WIDTH, transform: `scale(${scale})` } as CSSProperties) : undefined}>
          {children}
        </div>
      </OverlayScaleContext.Provider>
    </div>
  );
}

/* ---- Panel ---- */

/** The panel (applyOverlayThemeVariables plus the styles search-panel.js pins on it). */
export function OverlayPanel({ children, className, style, panelRef }: { children: ReactNode; className?: string; style?: CSSProperties; panelRef?: Ref<HTMLDivElement> }) {
  const mode = useOverlayMode();
  const t = OVERLAY_THEME_TOKENS[mode];
  const vars = {
    "--x-ov-panel-radius": "26px",
    "--x-ov-bg": t.bg,
    "--x-ov-mode-menu-bg": t.modeMenuBg,
    "--x-ov-border": t.border,
    "--x-ov-shadow": t.shadow,
    "--x-ov-text": t.text,
    "--x-ov-subtext": t.subtext,
    "--x-ov-link": t.link,
    "--x-ov-placeholder": t.placeholder,
    "--x-ov-hover-bg": t.hoverBg,
    "--x-ov-neutral-mark-bg": t.neutralMarkBg,
    "--x-ov-neutral-mark-text": t.neutralMarkText,
    "--x-ov-tag-bg": t.tagBg,
    "--x-ov-tag-text": t.tagText,
    "--x-ov-bookmark-tag-bg": t.bookmarkTagBg,
    "--x-ov-bookmark-tag-text": t.bookmarkTagText,
    "--x-ov-blur": t.blur,
    "--x-ov-saturate": t.saturate,
    "--x-ext-input-text": t.text,
    "--x-ext-input-caret": t.link,
    "--x-ext-input-icon": t.subtext,
    "--x-ext-input-icon-hover-bg": t.hoverBg,
    "--x-ext-input-icon-hover": t.text,
    "--x-ext-input-underline": t.underline,
    "--x-ext-input-divider-inset": t.dividerInset,
    "--x-ext-input-divider-opacity": t.dividerOpacity,
  } as CSSProperties;
  return (
    <div ref={panelRef} className={["dg-ovl x-lumno-search-entry", className].filter(Boolean).join(" ")} data-theme={mode} style={{ ...vars, ...style }}>
      {children}
    </div>
  );
}

/* ---- Search input ---- */

export type ScopePrefix = { key: string; name: string; theme: FaviconTheme; current?: boolean; menuOpen?: boolean; onClick?: () => void };

const PREFIX_STYLE: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%) translateX(0px) scaleX(1)",
  transformOrigin: "left center",
  left: 50,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 6,
  maxWidth: "min(220px, 48%)",
  minWidth: 0,
  boxSizing: "border-box",
  height: 32,
  padding: "0 6px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: 13,
  fontFamily: FONT,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: 0,
  border: "none",
  borderRadius: 10,
  boxShadow: "none",
  opacity: 1,
  transition: "opacity 140ms cubic-bezier(0.22, 1, 0.36, 1), transform 160ms cubic-bezier(0.22, 1, 0.36, 1), background-color 140ms, border-color 140ms, box-shadow 140ms, color 140ms",
  cursor: "pointer",
  pointerEvents: "auto",
  zIndex: 41,
  userSelect: "none",
};

const TAB_HINT_STYLE: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 7,
  maxWidth: "min(300px, 52%)",
  minWidth: 0,
  height: 28,
  padding: 0,
  border: "none",
  background: "transparent",
  color: "var(--x-ov-tag-text, #6B7280)",
  boxSizing: "border-box",
  fontSize: 13,
  fontFamily: FONT,
  fontWeight: 700,
  lineHeight: "18px",
  letterSpacing: 0,
  whiteSpace: "nowrap",
  pointerEvents: "none",
  userSelect: "none",
  zIndex: 1,
};

const TAB_KEY_STYLE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 32,
  height: 22,
  padding: "0 6px",
  borderRadius: 7,
  border: "1px solid var(--x-ov-border, rgba(0, 0, 0, 0.08))",
  background: "var(--x-ov-tag-bg, #F3F4F6)",
  color: "var(--x-ov-tag-text, #6B7280)",
  boxSizing: "border-box",
  fontSize: 11,
  fontFamily: "inherit",
  fontWeight: 700,
  lineHeight: "14px",
  letterSpacing: 0,
  whiteSpace: "nowrap",
  flex: "0 0 auto",
};

const TAB_TEXT_STYLE: CSSProperties = {
  display: "inline-block",
  minWidth: 0,
  maxWidth: 220,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "var(--x-ov-tag-text, #6B7280)",
  fontSize: 13,
  fontFamily: "inherit",
  fontWeight: 400,
  lineHeight: "18px",
  letterSpacing: 0,
  flex: "1 1 auto",
};

/**
 * The overlay's search input (search-input.css): the scope icon, the field,
 * an optional scope prefix and Tab hint, the clear, close-other-tabs and
 * settings buttons, and the divider over the results. Paddings follow
 * search-input-mode.js updateLayout (base 50px left, 92px right, 8px prefix gap,
 * 36px more while the clear button shows).
 */
export function OverlayInput({
  value,
  onChange,
  onKeyDown,
  placeholder,
  ariaLabel,
  inputRef,
  collapsed,
  prefix,
  tabHint,
  menu,
}: {
  value: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  ariaLabel?: string;
  inputRef?: Ref<HTMLInputElement>;
  collapsed: boolean;
  prefix?: ScopePrefix | null;
  tabHint?: string | null;
  menu?: ReactNode;
}) {
  const t = useExtensionText();
  const mode = useOverlayMode();
  const prefixRef = useRef<HTMLButtonElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const [prefixWidth, setPrefixWidth] = useState(0);
  const [hintWidth, setHintWidth] = useState(0);
  const clear = value.length > 0;
  const anchor = 86 + (clear ? 36 : 0);
  const visual = prefix ? prefixVisual(prefix.theme, mode) : null;

  useLayoutEffect(() => {
    setPrefixWidth(prefix ? Math.ceil(prefixRef.current?.offsetWidth || 0) : 0);
    setHintWidth(tabHint ? Math.ceil(hintRef.current?.getBoundingClientRect().width || 0) : 0);
  }, [prefix?.key, prefix?.name, prefix?.current, tabHint, mode]);

  const paddingRight = Math.max(92 + (clear ? 36 : 0), tabHint ? anchor + hintWidth + 12 : 0);
  const paddingLeft = prefix ? 50 + prefixWidth + 8 : 50;

  return (
    <div
      className="x-lumno-search-input x-lumno-search-input__container"
      data-mode-menu-open={prefix?.menuOpen ? "true" : undefined}
      style={
        {
          height: 56,
          minHeight: 56,
          maxHeight: 56,
          borderRadius: collapsed ? "var(--x-ov-content-radius, 25px)" : "var(--x-ov-content-radius, 25px) var(--x-ov-content-radius, 25px) 0 0",
          overflow: "visible",
          ...(visual ? { "--x-lumno-search-mode-accent": visual.color, "--x-lumno-search-mode-selected-bg": visual.background } : {}),
        } as CSSProperties
      }
    >
      <div
        className="x-lumno-search-input__icon"
        role="button"
        aria-disabled={prefix ? "true" : "false"}
        tabIndex={-1}
        aria-label={t("shortcut_reference_search_open_scope_menu_title")}
        data-hover-active="false"
        style={{ left: 13 }}
      >
        <i aria-hidden="true" className="ri-icon ri-size-16 ri-search-line" />
      </div>
      <input
        ref={inputRef}
        autoComplete="off"
        className="x-lumno-search-input__field"
        placeholder={placeholder}
        aria-label={ariaLabel || placeholder}
        type="text"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        onKeyDown={onKeyDown}
        style={{ height: 56, minHeight: 56, maxHeight: 56, lineHeight: 1.3, padding: `0 ${paddingRight}px 0 ${paddingLeft}px`, caretColor: visual?.caret }}
      />
      {prefix ? (
        <button
          ref={prefixRef}
          className="x-lumno-search-input-mode__prefix"
          data-search-input-mode-prefix=""
          type="button"
          tabIndex={-1}
          aria-haspopup="menu"
          aria-expanded={prefix.menuOpen ? "true" : "false"}
          data-menu-open={prefix.menuOpen ? "true" : "false"}
          data-current-visible={prefix.current ? "true" : "false"}
          data-current-measuring="false"
          data-mode-id={`provider:${prefix.key}`}
          aria-label={t("search_scope_switcher_label", { scope: prefix.name })}
          onClick={prefix.onClick}
          style={{ ...PREFIX_STYLE, color: visual!.color, background: visual!.background, ["--x-lumno-search-mode-accent" as string]: visual!.color } as CSSProperties}
        >
          <span
            className="x-lumno-search-input-mode__prefix-icon-frame"
            data-search-input-mode-prefix-icon-frame=""
            style={{ position: "relative", width: 20, height: 20, borderRadius: 6, clipPath: "inset(0px round 6px)", overflow: "hidden", isolation: "isolate", flex: "0 0 20px", display: "inline-flex" }}
          >
            <img
              alt=""
              data-search-input-mode-prefix-icon=""
              decoding="async"
              src={tileUrl(prefix.key)}
              style={{ width: 20, height: 20, borderRadius: 6, clipPath: "inset(0px round 6px)", overflow: "hidden", objectFit: "contain", flex: "0 0 auto", display: "block" }}
            />
          </span>
          <span data-search-input-mode-prefix-text="" style={{ display: "block", flex: "0 1 auto", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: "18px" }}>
            {prefix.name}
          </span>
          <span
            aria-hidden="true"
            data-search-input-mode-current=""
            style={{ display: prefix.current ? "inline-flex" : "none", alignItems: "center", fontSize: 13, fontWeight: 600, lineHeight: "18px", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", flex: "0 0 auto" }}
          >
            <span data-search-input-mode-current-text="" style={{ display: "inline-block", color: visual!.color }}>
              {t("search_scope_current")}
            </span>
          </span>
          <i aria-hidden="true" className="ri-icon ri-size-16 ri-arrow-down-s-line" data-search-input-mode-prefix-chevron="" style={{ color: visual!.color, display: "inline-flex", flex: "0 0 auto" }} />
        </button>
      ) : null}
      {menu}
      <span
        ref={hintRef}
        aria-hidden="true"
        className="x-lumno-search-input-mode__tab-hint"
        data-search-input-mode-tab-hint=""
        style={{ ...TAB_HINT_STYLE, right: anchor, display: tabHint ? "inline-flex" : "none" }}
      >
        <span data-search-input-mode-tab-key="" style={TAB_KEY_STYLE}>
          Tab
        </span>
        <span data-search-input-mode-tab-text="" style={TAB_TEXT_STYLE}>
          {tabHint}
        </span>
      </span>
      <div className="x-lumno-search-input__divider" data-visible={collapsed ? "false" : "true"} style={{ display: collapsed ? "none" : "block" }} />
      <button aria-label={t("command_settings", { name: "Lumno" })} className="x-lumno-search-input__right-icon" type="button" tabIndex={-1} data-hover-active="false" style={{ ["--x-ext-input-right-icon-inset" as string]: "13px", cursor: "pointer" } as CSSProperties}>
        <i className="ri-icon ri-size-16 ri-settings-line" aria-hidden="true" />
      </button>
      <button
        aria-label={t("search_input_clear")}
        className="x-lumno-search-input__clear"
        type="button"
        tabIndex={-1}
        hidden={!clear}
        onClick={() => onChange?.("")}
        style={{ ["--x-ext-input-clear-right" as string]: "85px", ["--x-ext-input-clear-top" as string]: "13px" } as CSSProperties}
      >
        <i className="ri-icon ri-size-16 ri-close-line" aria-hidden="true" />
      </button>
      <button aria-label={t("overlay_close_other_tabs_tooltip")} aria-haspopup="dialog" aria-expanded="false" className="x-ov-close-other-tabs" type="button" tabIndex={-1}>
        <i className="ri-icon ri-size-16 ri-brush-2-line" aria-hidden="true" />
      </button>
    </div>
  );
}

/* ---- Suggestions ---- */

/** The results area; collapsed it takes no room (setOverlayResultsCollapsed). */
export function OverlaySuggestions({ collapsed, numberKeys, children, containerRef }: { collapsed: boolean; numberKeys?: boolean; children?: ReactNode; containerRef?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={containerRef}
      className="x-ov-suggestions-container"
      data-collapsed={collapsed ? "true" : "false"}
      data-number-shortcuts-active={numberKeys ? "true" : undefined}
      aria-hidden={collapsed ? "true" : undefined}
      style={collapsed ? { maxHeight: 0, minHeight: 0, paddingTop: 0, paddingBottom: 0, opacity: 0, pointerEvents: "none", overflow: "hidden" } : undefined}
    >
      {children}
    </div>
  );
}

export type SourceKind = "tab" | "bookmark" | "history";

export type SuggestionRowProps = {
  index: number;
  last: boolean;
  theme: FaviconTheme;
  active: boolean;
  hovering?: boolean;
  /** A favicon or provider tile; otherwise a Remix icon in the slot. */
  favicon?: string;
  icon?: string;
  title: ReactNode;
  /** The url line under a tab or history title, or a bookmark's folder path. */
  detail?: ReactNode;
  detailKind?: "url" | "path";
  source?: SourceKind;
  /** The visit button's label (新开 / 搜索 / 切换). */
  action: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
};

/**
 * One row (suggestions.tsx, a search suggestion on the overlay surface): the
 * colors updateSelectionForRuntime and applySearchActionStyles set for its
 * state. A row from an open tab offers 切换 as an action tag while active.
 */
export function SuggestionRow({ index, last, theme, active, hovering = false, favicon, icon, title, detail, detailKind, source, action, onEnter, onLeave, onClick }: SuggestionRowProps) {
  const t = useExtensionText();
  const mode = useOverlayMode();
  const modeTheme = forMode(theme, mode);
  const brand = Boolean(theme._xIsBrand);
  const themed = active || (hovering && brand);
  const hover = hovering && brand ? FT.getHoverColors(theme, { defaultTheme: DEFAULT_THEME, isDarkMode: mode === "dark" }) : null;
  const switchAction = source === "tab";
  const sourceTagText = active ? modeTheme.accent : themed ? hover?.text || modeTheme.accent : "";

  const rowBg = active ? (brand ? modeTheme.highlightBg : "var(--x-ov-hover-bg, #F3F4F6)") : hovering ? hover?.bg || "var(--x-ov-hover-bg, #F3F4F6)" : "transparent";
  const itemStyle = {
    "--x-ext-mark-bg": themed ? (active ? modeTheme.activeMarkBg : modeTheme.markBg) : "var(--x-ov-neutral-mark-bg, #E5E7EB)",
    "--x-ext-mark-text": themed ? (active ? modeTheme.activeMarkText : modeTheme.markText) : "var(--x-ov-neutral-mark-text, #111827)",
    "--x-ext-tag-bg": modeTheme.tagBg,
    "--x-ext-tag-text": modeTheme.tagText,
    "--x-ext-tag-border": modeTheme.tagBorder,
    "--x-ext-key-bg": modeTheme.keyBg,
    "--x-ext-key-text": modeTheme.keyText,
    "--x-ext-key-border": modeTheme.keyBorder,
    "--x-ext-icon-color": modeTheme.accent,
    "--x-ov-suggestion-row-bg": rowBg,
  } as CSSProperties;

  const textTag = (kind: "history" | "bookmark", label: string, visible: boolean) => (
    <span
      className="x-ov-suggestion-source-tag"
      data-visible={visible ? "true" : "false"}
      data-tag-type={kind}
      style={
        {
          "--x-ov-suggestion-source-tag-bg": themed ? "transparent" : "var(--x-ov-tag-bg, #F3F4F6)",
          "--x-ov-suggestion-source-tag-text": themed ? sourceTagText : "var(--x-ov-tag-text, #667085)",
          "--x-ov-suggestion-source-tag-border": "transparent",
        } as CSSProperties
      }
    >
      {label}
    </span>
  );

  const visitVisible = !(active && switchAction);
  const utilityVisible = hovering;
  return (
    <div
      className="x-ov-suggestion-item"
      role="option"
      aria-selected={active}
      data-last={last ? "true" : "false"}
      data-row-state={active ? "active" : undefined}
      data-simple-mode="false"
      data-active={active ? "true" : "false"}
      data-has-action-tags={switchAction ? "true" : "false"}
      style={itemStyle}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={onClick}
    >
      <div className="x-ov-suggestion-left" data-motion="true">
        {favicon ? (
          <span className="x-ov-suggestion-icon-slot" data-favicon="true">
            <img className="x-ov-suggestion-favicon" decoding="async" width={128} height={128} alt="" src={favicon} style={{ objectFit: "contain", objectPosition: "center center" }} />
            <span className="x-ov-suggestion-number-shortcut" aria-hidden="true">
              {index}
            </span>
          </span>
        ) : (
          <span className="x-ov-suggestion-icon-slot" data-favicon="false" data-emphasis={active || hovering ? "true" : "false"}>
            <span className="x-ov-suggestion-inline-icon" data-tone="subtext" style={themed && brand ? { color: modeTheme.accent } : undefined}>
              <i className={`ri-icon ri-size-16 ${icon || "ri-search-line"}`} aria-hidden="true" />
            </span>
            <span className="x-ov-suggestion-number-shortcut" aria-hidden="true">
              {index}
            </span>
          </span>
        )}
        <div className="x-ov-suggestion-text">
          <span className="x-ov-suggestion-title" style={{ ["--x-ov-suggestion-title-weight" as string]: active ? "600" : "400" } as CSSProperties}>
            {title}
          </span>
          {detail ? <span className={detailKind === "path" ? "x-ov-suggestion-bookmark-path" : "x-ov-suggestion-url-line"}>{detail}</span> : null}
          {source === "history" || source === "tab" ? textTag("history", t("search_tag_history"), source === "history") : null}
          {source === "bookmark" ? textTag("bookmark", t("search_tag_bookmark"), true) : null}
          {switchAction ? (
            <span
              className="x-ov-suggestion-source-tag"
              data-visible="true"
              data-tag-type="open-tab"
              style={
                {
                  "--x-ov-suggestion-source-tag-bg": themed ? modeTheme.tagBg : "var(--x-ov-tag-bg, #F3F4F6)",
                  "--x-ov-suggestion-source-tag-text": themed ? modeTheme.tagText : "var(--x-ov-tag-text, #667085)",
                  "--x-ov-suggestion-source-tag-border": themed ? modeTheme.tagBorder : "transparent",
                } as CSSProperties
              }
            >
              {t("search_tag_open_tab")}
            </span>
          ) : null}
        </div>
      </div>
      <div className="x-ov-suggestion-right" data-action-column="true">
        <div className="x-ov-suggestion-action-tags" data-visible={active && switchAction ? "true" : "false"}>
          {switchAction ? (
            <span className="x-ov-action-tag" data-action="switch">
              <span className="x-ov-action-tag__label">{action}</span>
            </span>
          ) : null}
        </div>
        <button
          type="button"
          tabIndex={-1}
          className="x-ov-suggestion-action-button x-ov-suggestion-visit-button"
          data-visible={visitVisible ? "true" : "false"}
          aria-label={action}
          style={
            {
              "--x-ov-suggestion-action-button-text": themed ? modeTheme.buttonText : "var(--x-ov-subtext, #9CA3AF)",
              "--x-ov-suggestion-action-button-bg": "transparent",
              "--x-ov-suggestion-action-button-border": "transparent",
            } as CSSProperties
          }
        >
          <span className="x-ov-inline-label">{action}</span>
        </button>
        {source ? (
          <div className="x-ov-suggestion-utility-slot" data-leading="true" data-visible={utilityVisible ? "true" : "false"}>
            <button
              type="button"
              tabIndex={-1}
              className="x-ov-suggestion-utility-button"
              data-visible={utilityVisible ? "true" : "false"}
              aria-label={t("search_copy_url_tooltip")}
              style={
                {
                  "--x-ov-suggestion-utility-color": utilityVisible && themed ? modeTheme.buttonText : "var(--x-ov-subtext, #6B7280)",
                  "--x-ov-suggestion-utility-bg": "transparent",
                  "--x-ov-suggestion-utility-border": "transparent",
                } as CSSProperties
              }
            >
              <i className="ri-icon ri-size-14 ri-file-copy-line" aria-hidden="true" />
            </button>
          </div>
        ) : null}
        {source === "history" ? (
          <div className="x-ov-suggestion-utility-slot" data-visible={utilityVisible ? "true" : "false"}>
            <button
              type="button"
              tabIndex={-1}
              className="x-ov-suggestion-utility-button"
              data-visible={utilityVisible ? "true" : "false"}
              aria-label={t("search_remove_history_tooltip")}
              style={
                {
                  "--x-ov-suggestion-utility-color": utilityVisible && themed ? modeTheme.buttonText : "var(--x-ov-subtext, #6B7280)",
                  "--x-ov-suggestion-utility-bg": "transparent",
                  "--x-ov-suggestion-utility-border": "transparent",
                } as CSSProperties
              }
            >
              <i className="ri-icon ri-size-14 ri-delete-bin-6-line" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** A title with the query's matches marked, as the overlay marks them. */
export function Marked({ text, mark }: { text: string; mark: string }) {
  const needle = mark.trim();
  if (!needle) return <>{text}</>;
  const lower = text.toLowerCase();
  const find = needle.toLowerCase();
  const parts: ReactNode[] = [];
  let from = 0;
  let at = lower.indexOf(find);
  while (at >= 0) {
    if (at > from) parts.push(text.slice(from, at));
    parts.push(
      <mark className="x-ov-suggestion-mark" key={at}>
        {text.slice(at, at + needle.length)}
      </mark>,
    );
    from = at + needle.length;
    at = lower.indexOf(find, from);
  }
  if (from < text.length) parts.push(text.slice(from));
  return <>{parts}</>;
}

/* ---- Scope menu ---- */

export type ScopeGroup = "engine" | "site" | "ai" | "local";

/** A provider's name as the extension shows it (getSiteSearchDisplayName). */
export function useProviderName() {
  const t = useExtensionText();
  return (key: string) => {
    const provider = OVERLAY_PROVIDERS[key];
    if (!provider) return key;
    return provider.nameKey ? t(provider.nameKey) : provider.name;
  };
}

function ScopeMenuItem({ id, label, checked, focused, onEnter, onPick, children, visual }: { id: string; label: string; checked: boolean; focused: boolean; onEnter: () => void; onPick: () => void; children: ReactNode; visual: { selected: string; ring: string; icon: string; builtin?: boolean } }) {
  return (
    <button
      className="x-lumno-search-input-mode__menu-item"
      type="button"
      tabIndex={-1}
      role="menuitemradio"
      aria-checked={checked ? "true" : "false"}
      aria-label={label}
      data-label-truncated="false"
      data-mode-id={id}
      data-dg-focus={focused ? "true" : undefined}
      onPointerEnter={onEnter}
      onClick={onPick}
      style={{ ["--x-lumno-search-mode-selected-bg" as string]: visual.selected, ["--x-lumno-search-mode-item-focus-ring" as string]: visual.ring } as CSSProperties}
    >
      <span
        className="x-lumno-search-input-mode__menu-icon"
        aria-hidden="true"
        data-icon-state={visual.builtin ? "fallback" : "resolved"}
        data-icon-kind={visual.builtin ? "builtin" : undefined}
        style={{ ["--x-lumno-search-mode-icon-color" as string]: visual.icon } as CSSProperties}
      >
        <span className="x-lumno-search-input-mode__menu-favicon-mask">{children}</span>
      </span>
      <span className="x-lumno-search-input-mode__menu-label" aria-hidden="true">
        {label}
      </span>
    </button>
  );
}

function ProviderMenuItem({ providerKey, checked, focused, onEnter, onPick }: { providerKey: string; checked: boolean; focused: boolean; onEnter: () => void; onPick: () => void }) {
  const mode = useOverlayMode();
  const name = useProviderName();
  const theme = useSiteTheme({ provider: providerKey });
  const visual = menuItemVisual(theme, mode);
  return (
    <ScopeMenuItem id={`provider:${providerKey}`} label={name(providerKey)} checked={checked} focused={focused} onEnter={onEnter} onPick={onPick} visual={{ ...visual, icon: visual.ring }}>
      <img alt="" decoding="async" src={tileUrl(providerKey)} />
    </ScopeMenuItem>
  );
}

const GROUP_LABEL = { engine: "search_scope_group_engines", site: "search_scope_group_sites", ai: "search_scope_group_ai", local: "search_scope_group_local" } as const;
/*
 * The menu lists a chosen few of the extension's scopes, AI first (the extension lets each
 * person reorder its groups), so the card reads at a glance.
 */
const SCOPE_PICKS: Partial<Record<ScopeGroup, string[]>> = {
  ai: ["gpt", "gm", "ds", "kimi", "dbai", "qw", "mx", "pplx"],
  site: ["gh", "yt", "bb", "xhs", "zh", "rd"],
};
export const SCOPE_GROUPS: ScopeGroup[] = ["ai", "site"];
export const scopeKeys = (group: ScopeGroup) => (SCOPE_PICKS[group] || []).filter((key) => OVERLAY_PROVIDERS[key]?.group === group);

/**
 * The scope menu (search-input-mode.js renderModeMenu) under the input: every
 * group of tiles as the extension lists them, and the footer of key hints. It
 * opens and closes on the shared menu surface's transition, and scrolls to keep
 * the focused tile in view.
 */
export function ScopeMenu({
  open,
  checked,
  focused,
  onFocus,
  onPick,
  resultOffset = 0,
  viewportMaxHeight,
}: {
  open: boolean;
  checked: string;
  focused: string;
  onFocus: (key: string) => void;
  onPick: (key: string) => void;
  resultOffset?: number;
  /** The room below the input (the extension measures it against the window). */
  viewportMaxHeight?: number;
}) {
  const t = useExtensionText();
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(open);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    setShown(false);
    const timer = window.setTimeout(() => setMounted(false), 360);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Keeps the focused tile, and its group heading, in view inside the menu (never the page).
  useLayoutEffect(() => {
    const content = contentRef.current;
    const item = content?.querySelector<HTMLElement>(`[data-mode-id="provider:${focused}"]`);
    if (!content || !item || !mounted) return;
    const top = item.offsetTop - content.offsetTop;
    const bottom = top + item.offsetHeight;
    const group = content.querySelector<HTMLElement>(`[data-group-key="${OVERLAY_PROVIDERS[focused]?.group}"]`);
    const groupTop = group ? group.offsetTop - content.offsetTop - parseFloat(getComputedStyle(content).paddingTop || "0") : top;
    if (top >= content.scrollTop && bottom <= content.scrollTop + content.clientHeight) return;
    // Lead with the tile's group heading when the tile still fits under it.
    content.scrollTop = bottom - groupTop <= content.clientHeight ? Math.max(0, groupTop) : Math.max(0, top - 8);
  }, [focused, mounted]);


  return (
    <div
      data-search-input-mode-menu=""
      hidden={!mounted}
      className="x-lumno-search-input-mode__menu _x_extension_menu_surface_2024_unique_"
      data-surface="overlay"
      data-filtered="false"
      data-search-active="true"
      data-has-query="false"
      data-open={shown ? "true" : "false"}
      role="menu"
      tabIndex={-1}
      style={
        {
          position: "absolute",
          left: -1,
          right: -1,
          top: "calc(100% + 14px)",
          width: "auto",
          height: "min(360px, 62vh, var(--x-lumno-search-mode-menu-viewport-max-height, 360px))",
          maxHeight: "min(360px, 62vh, var(--x-lumno-search-mode-menu-viewport-max-height, 360px))",
          overflow: "hidden",
          padding: 0,
          border: "1px solid var(--x-ov-border, rgba(0, 0, 0, 0.08))",
          borderRadius: "var(--x-ov-panel-radius, 26px)",
          background: "var(--x-ov-mode-menu-bg, #FFFFFF)",
          boxShadow: "var(--x-ov-shadow, 0 16px 40px rgba(15, 23, 42, 0.13))",
          boxSizing: "border-box",
          fontFamily: FONT,
          fontSize: 13,
          color: "var(--x-ov-text, #111827)",
          zIndex: 40,
          "--x-lumno-search-mode-menu-lift": "0px",
          "--x-lumno-search-mode-menu-result-offset": `${resultOffset}px`,
          "--x-extension-menu-surface-closed-transform":
            "translateY(calc(var(--x-lumno-search-mode-menu-result-offset, 0px) + var(--x-lumno-search-mode-menu-lift, 0px) - 6px)) scale(0.96, 0.86)",
          "--x-extension-menu-surface-open-transform": "translateY(calc(var(--x-lumno-search-mode-menu-result-offset, 0px) + var(--x-lumno-search-mode-menu-lift, 0px))) scale(1, 1)",
          ...(viewportMaxHeight ? { "--x-lumno-search-mode-menu-viewport-max-height": `${viewportMaxHeight}px` } : {}),
          overscrollBehavior: "contain",
        } as CSSProperties
      }
    >
      <div className="x-lumno-search-input-mode__menu-content" data-search-input-mode-menu-content="" role="presentation" ref={contentRef}>
        {SCOPE_GROUPS.map((group, groupIndex) => (
          <Fragment key={group}>
            <div className="x-lumno-search-input-mode__menu-group" aria-hidden="true" role="presentation" data-group-key={group}>
              <span>{t(GROUP_LABEL[group])}</span>
              <span className="x-lumno-search-input-mode__menu-group-move">
                <button type="button" tabIndex={-1} className="x-lumno-search-input-mode__menu-group-move-button" data-group-move="up" aria-label={t("settings_search_source_move_up")} disabled={groupIndex === 0}>
                  <i className="ri-icon ri-size-14 ri-arrow-up-s-line" aria-hidden="true" />
                </button>
                <button type="button" tabIndex={-1} className="x-lumno-search-input-mode__menu-group-move-button" data-group-move="down" aria-label={t("settings_search_source_move_down")} disabled={groupIndex === SCOPE_GROUPS.length - 1}>
                  <i className="ri-icon ri-size-14 ri-arrow-down-s-line" aria-hidden="true" />
                </button>
              </span>
            </div>
            {scopeKeys(group).map((key) => (
              <ProviderMenuItem providerKey={key} checked={key === checked} focused={open && key === focused && key !== checked} onEnter={() => onFocus(key)} onPick={() => onPick(key)} key={key} />
            ))}
          </Fragment>
        ))}
      </div>
      <div className="x-lumno-search-input-mode__menu-footer" data-search-input-mode-menu-footer="" role="presentation" aria-hidden="true">
        <span className="x-lumno-search-input-mode__menu-footer-filter-text">{t("search_scope_menu_filter_hint")}</span>
        <span className="x-lumno-search-input-mode__menu-footer-actions">
          <span className="x-lumno-search-input-mode__menu-footer-hint x-lumno-search-input-mode__menu-footer-hint--navigation">
            <span className="x-lumno-search-input-mode__menu-footer-key x-lumno-search-input-mode__menu-footer-key--arrows">←↑↓→</span>
            <span className="x-lumno-search-input-mode__menu-footer-text">{t("search_scope_menu_navigation_hint")}</span>
          </span>
          <span className="x-lumno-search-input-mode__menu-footer-hint x-lumno-search-input-mode__menu-footer-hint--select">
            <span className="x-lumno-search-input-mode__menu-footer-key">Enter</span>
            <span className="x-lumno-search-input-mode__menu-footer-text">{t("search_scope_menu_select_hint")}</span>
          </span>
          <span className="x-lumno-search-input-mode__menu-footer-hint x-lumno-search-input-mode__menu-footer-hint--input">
            <span className="x-lumno-search-input-mode__menu-footer-key">Tab</span>
            <span className="x-lumno-search-input-mode__menu-footer-text">{t("search_scope_menu_focus_toggle_hint")}</span>
          </span>
          <span className="x-lumno-search-input-mode__menu-footer-hint x-lumno-search-input-mode__menu-footer-hint--shortcut">
            <span className="x-lumno-search-input-mode__menu-footer-key">⇥ ⇥</span>
            <span className="x-lumno-search-input-mode__menu-footer-text">{t("search_scope_menu_shortcut_hint")}</span>
          </span>
        </span>
      </div>
    </div>
  );
}
