import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { FolderIcon } from "./icons";
import sitesData from "./extension/newtab-sites.json";
import { useDesignTheme } from "./theme";

/*
 * The new tab's pieces in its own markup (as its React views render it),
 * drawn by its own CSS (extension/newtab.css, scoped to .dg-nt). Sites carry
 * the favicon and colors the extension computes for them
 * (extension/newtab-sites.json, from scripts/capture-extension-newtab.mjs).
 */

type CardVars = Record<string, string>;
export type NtSite = {
  id: string;
  title: string;
  url: string;
  favicon: string;
  faviconOffset: string;
  tile: Record<"light" | "dark", { bg: string; color: string }>;
  card: Record<"light" | "dark", CardVars>;
};

const SITES = sitesData.sites as Record<string, Omit<NtSite, "id">>;

export function site(id: string): NtSite {
  const entry = SITES[id];
  if (!entry) throw new Error(`Unknown new tab site: ${id}`);
  return { id, ...entry };
}

/** The new tab's scope: its tokens, light or dark with the page, marked ready as its body is once loaded. */
export function NtScope({ children, className, style, glass }: { children: ReactNode; className?: string; style?: CSSProperties; glass?: "frosted" | "liquid" }) {
  const { resolved } = useDesignTheme();
  return (
    <div className={["dg-nt", className].filter(Boolean).join(" ")} data-theme={resolved} data-nt-ready="1" data-glass-style={glass} style={style}>
      {children}
    </div>
  );
}

/** A shortcut tile (shortcuts.tsx): the favicon on a plate tinted from it. */
export function ShortcutTile({
  item,
  className,
  style,
  ...rest
}: { item: NtSite; className?: string; style?: CSSProperties } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style" | "className">) {
  const { resolved } = useDesignTheme();
  const tint = item.tile[resolved];
  return (
    <button
      type="button"
      className={["x-nt-shortcut-tile", className].filter(Boolean).join(" ")}
      draggable={false}
      data-shortcut-id={item.id}
      data-shortcut-title={item.title}
      data-shortcut-draggable="true"
      aria-label={item.title}
      style={{ "--x-nt-shortcut-icon-bg": tint.bg, "--x-nt-shortcut-icon-color": tint.color, ...style } as CSSProperties}
      {...rest}
    >
      <span className="x-nt-shortcut-icon">
        <span className="x-nt-shortcut-favicon-mask">
          <img
            className="x-nt-shortcut-favicon"
            alt=""
            draggable={false}
            width={128}
            height={128}
            src={item.favicon}
            style={{ display: "block", transform: item.faviconOffset || undefined }}
          />
        </span>
      </span>
    </button>
  );
}

/** A folder's icon (bookmark-folder-icon.js), morphing open with its folder. */
export function FolderGlyph({ className, open = false, color }: { id?: string; className?: string; open?: boolean; color?: string }) {
  return <FolderIcon plain open={open} color={color} className={className} />;
}

/** A bookmark card (bookmarks.tsx): favicon, title, and the copy button that shows on hover. */
export function BookmarkCard({
  item,
  copyLabel,
  viewMode = "grid",
  className,
  style,
  ref,
  ...rest
}: { item: NtSite; copyLabel: string; viewMode?: "grid" | "top"; className?: string; style?: CSSProperties; ref?: React.Ref<HTMLDivElement> } & Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "className"> & Record<`data-${string}`, unknown>) {
  const { resolved } = useDesignTheme();
  return (
    <div
      ref={ref}
      className={["x-nt-bookmark-card", className].filter(Boolean).join(" ")}
      tabIndex={0}
      role="button"
      draggable={false}
      aria-label={item.title}
      data-bookmark-type="bookmark"
      data-bookmark-view-mode={viewMode}
      data-bookmark-draggable="true"
      style={{ ...item.card[resolved], ...style } as CSSProperties}
      {...rest}
    >
      <img className="x-nt-bookmark-icon" alt="" width={128} height={128} draggable={false} src={item.favicon} style={{ display: "block" }} />
      <span className="x-nt-bookmark-title">{item.title}</span>
      {viewMode === "grid" && !className?.includes("x-nt-bookmark-card-drag-preview") ? (
        <button type="button" className="x-nt-bookmark-copy-action" aria-label={copyLabel} tabIndex={-1}>
          <i className="ri-icon ri-size-16 ri-file-copy-line" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

// bookmarks.tsx fans the first four children's favicons a little, each turned its own way.
const PREVIEW_TURNS = ["-1.00deg", "-3.00deg", "-1.50deg", "0.00deg"];

/** A folder card: the folder glyph, its title, and its first sites' favicons fanned at the end. */
export function FolderCard({
  id,
  title,
  preview,
  expanded,
  viewMode = "grid",
  className,
  style,
  ...rest
}: { id: string; title: string; preview: NtSite[]; expanded?: boolean; viewMode?: "grid" | "top"; className?: string; style?: CSSProperties } & Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "className">) {
  const { resolved } = useDesignTheme();
  return (
    <div
      className={["x-nt-bookmark-card", "x-nt-bookmark-card--folder", expanded ? "x-nt-bookmark-card--hover x-nt-bookmark-card--folder-expanded" : "", className].filter(Boolean).join(" ")}
      tabIndex={0}
      role="button"
      draggable={false}
      aria-label={title}
      aria-haspopup="menu"
      aria-expanded={expanded}
      data-bookmark-type="folder"
      data-bookmark-view-mode={viewMode}
      data-bookmark-draggable="true"
      style={{ "--x-nt-bookmark-shadow-rgb": resolved === "dark" ? "52, 96, 180" : "86, 138, 220", ...style } as CSSProperties}
      {...rest}
    >
      <FolderGlyph open={expanded} className="x-nt-bookmark-icon x-nt-bookmark-icon--figma" />
      <span className="x-nt-bookmark-title">{title}</span>
      {preview.length && viewMode === "grid" ? (
        <span className="x-nt-folder-preview">
          {preview.slice(0, 4).map((child, index) => (
            <img
              className="x-nt-folder-preview-favicon"
              width={128}
              height={128}
              alt=""
              aria-hidden="true"
              draggable={false}
              src={child.favicon}
              style={{ "--x-nt-folder-favicon-rot": PREVIEW_TURNS[index], zIndex: 10 + index, display: "block" } as CSSProperties}
              key={child.id}
            />
          ))}
        </span>
      ) : null}
    </div>
  );
}

/** A level of the cascade menu (bookmark-cascade-view.tsx): its folder's title, then rows. */
export function CascadeLevel({
  title,
  level,
  open = true,
  style,
  children,
}: {
  title: string;
  level: number;
  open?: boolean;
  style?: CSSProperties;
  children: ReactNode;
}) {
  // The first level hangs below its folder; submenus open to the right of their row.
  const placement = level === 0 ? { "data-horizontal": "left", "data-vertical": "below" } : { "data-side": "right" };
  return (
    <div
      className={["x-nt-bookmark-cascade-level", level > 0 ? "x-nt-bookmark-cascade-submenu" : "", "_x_extension_menu_surface_2024_unique_"].filter(Boolean).join(" ")}
      data-level={level}
      role="menu"
      data-menu-surface-width="content"
      {...placement}
      data-open={open ? "true" : "false"}
      aria-hidden={!open}
      style={{ "--x-extension-menu-surface-min-width": "210px", "--x-extension-menu-surface-max-width": "260px", width: 210, ...style } as CSSProperties}
    >
      <div className="x-nt-bookmark-cascade-content" role="none">
        <div className="x-nt-bookmark-cascade-title" role="presentation" title={title}>
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}

/** A cascade row: a bookmark (with its copy button) or a folder that opens the next level. */
export function CascadeRow({
  item,
  folder,
  active,
  copyLabel,
  index,
  onEnter,
}: {
  item?: NtSite;
  folder?: { id: string; title: string };
  active: boolean;
  copyLabel: string;
  index: number;
  onEnter?: () => void;
}) {
  if (folder) {
    return (
      <div className="x-nt-bookmark-cascade-row x-nt-bookmark-cascade-row--folder" data-cascade-view-index={index} role="none" onPointerEnter={onEnter}>
        <button
          type="button"
          className="x-nt-bookmark-cascade-item x-nt-bookmark-cascade-item--folder"
          role="menuitem"
          tabIndex={-1}
          data-type="folder"
          data-active={active ? "true" : "false"}
          aria-label={folder.title}
          aria-haspopup="menu"
          aria-expanded={active}
          title={folder.title}
        >
          <FolderGlyph open={active} className="x-nt-bookmark-cascade-icon x-nt-bookmark-cascade-icon--folder" />
          <span className="x-nt-bookmark-cascade-label">{folder.title}</span>
          <span aria-hidden="true" className="x-nt-bookmark-cascade-arrow">
            <i className="ri-icon ri-size-16 ri-arrow-right-s-line" aria-hidden="true" />
          </span>
        </button>
      </div>
    );
  }
  return (
    <div className="x-nt-bookmark-cascade-row" data-cascade-view-index={index} role="none" onPointerEnter={onEnter}>
      <button
        type="button"
        className="x-nt-bookmark-cascade-item"
        role="menuitem"
        tabIndex={-1}
        data-type="bookmark"
        data-active={active ? "true" : "false"}
        aria-label={item?.title}
      >
        <img className="x-nt-bookmark-cascade-icon" alt="" draggable={false} width={128} height={128} src={item?.favicon} style={{ display: "block" }} />
        <span className="x-nt-bookmark-cascade-label">{item?.title}</span>
      </button>
      <button type="button" className="x-nt-bookmark-cascade-copy-trigger" aria-label={copyLabel} tabIndex={-1}>
        <i className="ri-icon ri-size-16 ri-file-copy-line" aria-hidden="true" />
      </button>
    </div>
  );
}

export type MenuItem = { value: string; label: string; dividerBefore?: boolean; onSelect?: () => void };

/** The new tab's context menu (a select menu surface): text rows, a divider where the menu groups them. */
export function ContextMenu({ items, style, active, onActive }: { items: MenuItem[]; style?: CSSProperties; active?: number; onActive?: (index: number) => void }) {
  return (
    <div
      className="_x_extension_select_menu_2024_unique_ _x_extension_menu_surface_2024_unique_ x-nt-shortcut-context-menu-portal"
      data-menu-surface-width="content"
      data-open="true"
      role="menu"
      style={{ "--x-extension-menu-surface-max-width": "180px", "--x-extension-menu-surface-min-width": "124px", transformOrigin: "center top", position: "absolute", zIndex: 20, ...style } as CSSProperties}
    >
      {items.map((item, index) => (
        <div key={item.value} style={{ display: "contents" }}>
          {item.dividerBefore ? <div aria-orientation="horizontal" className="_x_extension_select_divider_2026_unique_" role="separator" /> : null}
          <div
            className="_x_extension_select_option_2024_unique_"
            data-selected="false"
            data-value={item.value}
            data-active={active === index ? "true" : undefined}
            role="menuitem"
            onPointerEnter={() => onActive?.(index)}
            onClick={item.onSelect}
          >
            <span className="_x_extension_select_option_label_2026_unique_">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/*
 * shortcut-dock.js: within two tiles of the one pointed at, each icon grows
 * up to 28% and rises up to 6px with the pointer's nearness (smoothstep over
 * max(144px, four icon widths)), and leans away from it by up to 16px.
 */
export function applyDock(grid: HTMLElement | null, pointerX: number | null) {
  if (!grid) return;
  const tiles = [...grid.querySelectorAll<HTMLElement>(".x-nt-shortcut-tile")];
  const reset = (tile: HTMLElement) => {
    tile.removeAttribute("data-dock-distance");
    tile.removeAttribute("data-dock-side");
    const icon = tile.querySelector<HTMLElement>(".x-nt-shortcut-icon");
    icon?.style.removeProperty("--x-nt-shortcut-dock-scale");
    icon?.style.removeProperty("--x-nt-shortcut-dock-shift-x");
    icon?.style.removeProperty("--x-nt-shortcut-dock-rise");
  };
  if (pointerX === null) {
    grid.removeAttribute("data-dock-active");
    tiles.forEach(reset);
    return;
  }
  const centers = tiles.map((tile) => {
    const rect = (tile.querySelector(".x-nt-shortcut-icon") || tile).getBoundingClientRect();
    return { center: rect.left + rect.width / 2, width: rect.width || 48 };
  });
  let activeIndex = 0;
  centers.forEach((entry, index) => {
    if (Math.abs(entry.center - pointerX) < Math.abs(centers[activeIndex].center - pointerX)) activeIndex = index;
  });
  grid.setAttribute("data-dock-active", "true");
  tiles.forEach((tile, index) => {
    const offset = index - activeIndex;
    if (Math.abs(offset) > 2) {
      reset(tile);
      return;
    }
    tile.setAttribute("data-dock-distance", String(Math.abs(offset)));
    tile.setAttribute("data-dock-side", offset < 0 ? "before" : offset > 0 ? "after" : "active");
    const icon = tile.querySelector<HTMLElement>(".x-nt-shortcut-icon");
    if (!icon) return;
    const { center, width } = centers[index];
    const raw = Math.max(0, 1 - Math.abs(pointerX - center) / Math.max(144, width * 4));
    const eased = raw * raw * (3 - 2 * raw);
    if (eased <= 0.015) {
      icon.style.removeProperty("--x-nt-shortcut-dock-scale");
      icon.style.removeProperty("--x-nt-shortcut-dock-shift-x");
      icon.style.removeProperty("--x-nt-shortcut-dock-rise");
      return;
    }
    const side = offset < 0 ? -1 : offset > 0 ? 1 : 0;
    const falloff = side === 0 ? 0 : 1 / Math.max(1, Math.abs(offset));
    const shift = side * 16 * eased * Math.max(0, 1 - eased) * falloff;
    icon.style.setProperty("--x-nt-shortcut-dock-scale", (1 + 0.28 * eased).toFixed(3));
    icon.style.setProperty("--x-nt-shortcut-dock-shift-x", `${Math.round(shift)}px`);
    icon.style.setProperty("--x-nt-shortcut-dock-rise", `${Math.round(-6 * eased)}px`);
  });
}

/** Keeps the dock's magnification on whatever pointer position `pointer` holds. */
export function useDockMagnification(gridRef: React.RefObject<HTMLElement | null>, pointer: number | null) {
  useLayoutEffect(() => {
    applyDock(gridRef.current, pointer);
  });
}

export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

/*
 * card-themes.js getRecentCardColors: a recent card's colors all come from the
 * site's accent. The shortcut plate captured for the site is that accent mixed
 * 82% toward white (favicon-theme.js mixColor), so the accent is recovered
 * from it and the card's colors mixed as the extension mixes them.
 */
const mix = (color: number[], target: number[], amount: number) => color.map((channel, index) => Math.round(channel + (target[index] - channel) * amount));
const parseRgb = (value: string) => (value.match(/\d+(\.\d+)?/g) || []).slice(0, 3).map(Number);
const rgb = (color: number[]) => `rgb(${color.join(", ")})`;

export function recentCardStyle(item: NtSite, dark: boolean): CSSProperties {
  const plate = parseRgb(item.tile.light.bg);
  const accent = plate.map((channel) => Math.max(0, Math.min(255, Math.round((channel - 0.82 * 255) / 0.18))));
  const base = mix(accent, dark ? [22, 22, 22] : [255, 255, 255], dark ? 0.72 : 0.82);
  const border = mix(base, dark ? [255, 255, 255] : [0, 0, 0], dark ? 0.12 : 0.1);
  return {
    "--x-nt-recent-card-color": rgb(base),
    "--x-nt-recent-card-border-color": rgb(border),
    "--x-nt-recent-inner-tint-rgb": mix(accent, [255, 255, 255], 0.82).join(", "),
    "--x-nt-recent-accent-color": rgb(mix(accent, [0, 0, 0], dark ? 0.1 : 0.18)),
    "--x-nt-recent-accent-soft": `rgba(${accent.join(", ")}, ${dark ? 0.14 : 0.12})`,
    "--x-nt-recent-accent-border": `rgba(${accent.join(", ")}, ${dark ? 0.24 : 0.18})`,
  } as CSSProperties;
}

/** A recent site card (recent-sites.tsx): favicon and name, the page's title, and its address with 前往 and the pin. */
export function RecentCard({
  item,
  pageTitle,
  address,
  goLabel,
  pinLabel,
  ref,
}: {
  item: NtSite;
  pageTitle: string;
  address: string;
  goLabel: string;
  pinLabel: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const { resolved } = useDesignTheme();
  return (
    <div className="x-nt-recent-card" tabIndex={0} role="button" aria-label={pageTitle} style={recentCardStyle(item, resolved === "dark")} ref={ref}>
      <div className="x-nt-recent-card-visual">
        <div className="x-nt-recent-inner">
          <div className="x-nt-recent-header">
            <img className="x-nt-recent-favicon" alt="" width={128} height={128} draggable={false} src={item.favicon} style={{ display: "block" }} />
            <div className="x-nt-recent-name" title={item.title}>
              {item.title}
            </div>
          </div>
          <div className="x-nt-recent-title">{pageTitle}</div>
        </div>
        <div className="x-nt-recent-url" title={`https://${address}`}>
          <div className="x-nt-recent-action">
            <span>{goLabel}</span>
            <span>
              <i className="ri-icon ri-size-12 ri-arrow-right-line" aria-hidden="true" />
            </span>
          </div>
          <span className="x-nt-recent-url-text">{address}</span>
          <button type="button" className="x-nt-recent-pin" aria-pressed="false" aria-label={pinLabel} tabIndex={-1}>
            <i aria-hidden="true" className="ri-icon ri-size-16 ri-pushpin-line" />
          </button>
        </div>
      </div>
    </div>
  );
}
