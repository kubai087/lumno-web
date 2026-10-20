import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { applyFolderColor, folderSvg, playFolderOpen, setFolderOpen } from "../home/newtab/folder-icon";
import { useCardDemo } from "./demo";
import { useExtensionText } from "./ext-strings";
import { FolderColorForm } from "./extension/react/newtab/folder-color-picker";
import { useToast } from "./FeedbackCards";
import { BookmarkCard, CascadeLevel, CascadeRow, FolderCard, NtScope, ShortcutTile, applyDock, site } from "./NewTab";

/*
 * New tab pieces in the extension's markup and CSS: the shortcut row with its
 * dock magnification, the bookmarks bar with a folder's cascade menu, and the
 * folder color picker (the extension's own form).
 */

const DOCK = ["github", "youtube", "figma", "dribbble", "twitch", "chatgpt", "claude", "google"].map(site);

/** The shortcut row (shortcuts.tsx) and shortcut-dock.js's magnification, with the tile tooltip. */
export function DockCard() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ title: string; x: number; y: number } | null>(null);

  const pointAt = useCallback((x: number | null) => {
    const grid = gridRef.current;
    applyDock(grid, x);
    if (!grid || x === null) {
      setTip(null);
      return;
    }
    const tiles = [...grid.querySelectorAll<HTMLElement>(".x-nt-shortcut-tile")];
    const base = grid.getBoundingClientRect();
    let nearest = tiles[0];
    tiles.forEach((tile) => {
      const rect = tile.getBoundingClientRect();
      const best = nearest.getBoundingClientRect();
      if (Math.abs(rect.left + rect.width / 2 - x) < Math.abs(best.left + best.width / 2 - x)) nearest = tile;
    });
    const rect = nearest.getBoundingClientRect();
    setTip({ title: nearest.dataset.shortcutTitle || "", x: rect.left - base.left + rect.width / 2, y: rect.bottom - base.top + 4 });
  }, []);

  // A pointer sweeps along the row and partway back, as a hand would.
  useCardDemo((t) => {
    t.at(0, () => pointAt(null));
    t.tween(300, 2200, (p) => {
      const tiles = gridRef.current?.querySelectorAll<HTMLElement>(".x-nt-shortcut-tile");
      if (!tiles?.length) return;
      const first = tiles[0].getBoundingClientRect();
      const last = tiles[tiles.length - 1].getBoundingClientRect();
      const from = first.left + 10;
      const to = last.right - 10;
      pointAt(p < 0.5 ? from + (to - from) * p * 2 : to - (to - from) * (p - 0.5) * 2 * 0.55);
    });
    t.at(2700, () => pointAt(null));
    t.onStop(() => pointAt(null));
  });

  return (
    <NtScope className="dg-nt-stage">
      <section className="x-nt-shortcuts-section _x_extension_newtab_shortcuts_2026_unique_" data-visible="true" data-content-visible="true">
        <div
          className="x-nt-shortcuts-grid dg-nt-dock"
          data-dock-magnification="true"
          ref={gridRef}
          onPointerMove={(event) => pointAt(event.clientX)}
          onPointerLeave={() => pointAt(null)}
        >
          {DOCK.map((item) => (
            <ShortcutTile
              item={item}
              onFocus={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                pointAt(rect.left + rect.width / 2);
              }}
              onBlur={() => pointAt(null)}
              key={item.id}
            />
          ))}
          <span
            className="_x_extension_tooltip_2026_unique_ dg-nt-tip"
            data-tooltip-position="absolute"
            data-visible={tip ? "true" : "false"}
            aria-hidden="true"
            style={tip ? ({ left: tip.x, top: tip.y } as CSSProperties) : undefined}
          >
            {tip?.title}
          </span>
        </div>
      </section>
    </NtScope>
  );
}

const TOPBAR = ["github", "vercel", "nextjs", "supabase"].map(site);
const REFERENCES = ["apple-hig", "material", "figma", "tailwind", "react"].map(site);
const ICONS = ["sf-symbols", "material-symbols", "remixicon"].map(site);

/**
 * The bookmarks bar (bookmarks-topbar.tsx) with a folder open in its cascade
 * menu (bookmark-cascade-view.tsx), down to the nested folder at rest;
 * pointing moves through it, and leaving returns to that frame.
 */
export function BookmarkMenuCard({ folderTitle, subfolderTitle }: { folderTitle: string; subfolderTitle: string }) {
  const t = useExtensionText();
  const subIndex = REFERENCES.length;
  const [restRow, setRestRow] = useState(subIndex);
  const [active, setActive] = useState(subIndex);
  const menuRef = useRef<HTMLDivElement>(null);
  const [subTop, setSubTop] = useState(0);

  useEffect(() => {
    // Phones have no room beside the menu: the nested folder rests closed there.
    if (!window.matchMedia("(max-width: 680px)").matches) return;
    setRestRow(-1);
    setActive(-1);
  }, []);

  // The submenu opens level with its folder row (bookmark-cascade-position.js).
  useEffect(() => {
    const row = menuRef.current?.querySelector<HTMLElement>(".x-nt-bookmark-cascade-row--folder");
    const level = menuRef.current?.querySelector<HTMLElement>(".x-nt-bookmark-cascade-level[data-level='0']");
    if (row && level) setSubTop(level.offsetTop + row.offsetTop - 6);
  }, []);

  useCardDemo((timeline) => {
    timeline.at(0, () => setActive(-1));
    [0, 1, 2, 3, 4, subIndex].forEach((row, step) => timeline.at(400 + step * 320, () => setActive(row)));
    timeline.at(400 + 6 * 320 + 900, () => setActive(restRow));
  });

  const subOpen = active === subIndex;
  return (
    <NtScope className="dg-nt-stage dg-nt-bookmarks-bar">
      <section className="x-nt-bookmarks-topbar _x_extension_newtab_bookmarks_topbar_2026_unique_" data-surface-mode="adaptive" data-layout="docked" data-visible="true" data-active="true">
        <div className="x-nt-bookmarks-topbar-viewport" data-overflow-start="false">
          <div className="x-nt-bookmarks-topbar-items">
            <div className="_x_extension_newtab_bookmarks_grid_2024_unique_" data-view-mode="top">
              <FolderCard id="references" title={folderTitle} preview={[]} expanded viewMode="top" />
              {TOPBAR.map((item) => (
                <BookmarkCard item={item} copyLabel={t("bookmarks_copy_url")} viewMode="top" key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="x-nt-bookmark-cascade-menu" role="menu" ref={menuRef} onPointerLeave={() => setActive(restRow)}>
        <CascadeLevel title={folderTitle} level={0} style={{ left: 8, top: 40 }}>
          {REFERENCES.map((item, index) => (
            <CascadeRow item={item} active={active === index} copyLabel={t("bookmarks_copy_url")} index={index} onEnter={() => setActive(index)} key={item.id} />
          ))}
          <CascadeRow folder={{ id: "icons", title: subfolderTitle }} active={subOpen} copyLabel="" index={subIndex} onEnter={() => setActive(subIndex)} />
        </CascadeLevel>
        <CascadeLevel title={subfolderTitle} level={1} open={subOpen} style={{ left: 210, top: subTop }}>
          {ICONS.map((item, index) => (
            <CascadeRow item={item} active={false} copyLabel={t("bookmarks_copy_url")} index={index} key={item.id} />
          ))}
        </CascadeLevel>
      </div>
    </NtScope>
  );
}

/*
 * The folder color picker, the extension's own form (folder-color-picker.tsx):
 * the folder previews each color, the picker, presets, a color you can save,
 * HEX or RGB. Saving confirms with a toast and the form starts over.
 */
export function FolderColorCard({ folderTitle }: { folderTitle: string }) {
  const t = useExtensionText();
  const toast = useToast();
  const [run, setRun] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const translate = useCallback((key: string, fallback: string) => {
    const value = t(key as Parameters<typeof t>[0]);
    return value === key ? fallback : value;
  }, [t]);
  const options = useRef({
    t: translate,
    getFolderSvg: (id: string) => folderSvg(`dg-color-${id}`),
    initFolderIcon: (element: HTMLElement) => setFolderOpen(element, false),
    animateFolderIcon: (element: HTMLElement, open: boolean) => playFolderOpen(element, open),
    applyFolderColor: (element: HTMLElement, color: string) => applyFolderColor(element, color),
    saveSavedColors: async () => {},
    onSubmit: async () => {},
  });
  options.current.t = translate;
  const formOptions = useMemo(
    () => ({
      ...options.current,
      onSubmit: async () => {
        toast.clear();
        toast.show(translate("newtab_shortcuts_save", "Saved"));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [translate],
  );

  // The dialog appears as the extension opens it (the backdrop's data-open), in place in the card.
  useEffect(() => {
    hostRef.current?.querySelector(".x-nt-folder-color-backdrop")?.setAttribute("data-open", "true");
  }, [run]);

  // Tries three presets on the folder, then settles back on the default.
  useCardDemo((timeline) => {
    const swatch = (color: string) => hostRef.current?.querySelector<HTMLButtonElement>(`.x-nt-folder-color-swatch[data-color="${color}"]`)?.click();
    timeline.at(0, () => setRun((value) => value + 1));
    ["#8B5CF6", "#EC4899", "#22C55E", "#5393FF"].forEach((color, step) => timeline.at(700 + step * 700, () => swatch(color)));
  });

  return (
    <NtScope className="dg-nt-stage dg-nt-dialog-host">
      <div ref={hostRef} data-dg-portal="">
        {toast.node}
        <FolderColorForm
          key={run}
          initial={{ folderId: "references", title: folderTitle, color: "#5393FF" }}
          options={formOptions}
          initialSavedColors={[]}
          updateSavedColors={() => {}}
          close={() => setRun((value) => value + 1)}
        />
      </div>
    </NtScope>
  );
}
