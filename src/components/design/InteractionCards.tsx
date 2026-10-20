import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { DesignDemoCopy } from "../../lib/design-content";
import { useCardDemo } from "./demo";
import { useExtensionText } from "./ext-strings";
import { useToast } from "./FeedbackCards";
import { FolderIcon } from "./icons";
import {
  ContextMenu,
  NtScope,
  ShortcutTile,
  applyDock,
  site,
  type NtSite,
} from "./NewTab";
import { useSiteTheme } from "./Overlay";
import { useDesignTheme } from "./theme";

/*
 * Whole interactions from the new tab and the overlay: a shortcut's
 * right-click menu with undo, dragging one shortcut onto another to make a
 * folder (newtab.css drop target, shortcut-stack undo toasts), and the recent
 * tab switcher (overlay/tab-switcher.js).
 */

type Copy = DesignDemoCopy["newtab"];

/** The undo key as the extension's toasts write it. */
function useUndoKey() {
  const [label, setLabel] = useState("⌘Z");
  useEffect(() => {
    if (document.documentElement.dataset.platform === "other")
      setLabel("Ctrl+Z");
  }, []);
  return label;
}

/** Calls `undo` on ⌘Z / Ctrl+Z while `active`, as the new tab's undo does. */
function useUndoShortcut(active: boolean, undo: () => void) {
  const latest = useRef(undo);
  latest.current = undo;
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey &&
        event.key.toLowerCase() === "z"
      ) {
        event.preventDefault();
        latest.current();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);
}

const CONTEXT_TILES = ["github", "twitch", "chatgpt"].map(site);

/*
 * Right-click a shortcut for its menu (newtab.js: 在新标签页打开, then 编辑 and
 * 移除 after a divider), hung centered under the tile, which stays magnified
 * while the menu is open. Removing one shows the undo toast; ⌘Z / Ctrl+Z
 * brings it back. At rest the menu is open under the middle tile, and it
 * returns there whenever the pointer leaves the card.
 */
export function ContextMenuCard() {
  const t = useExtensionText();
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const undoKey = useUndoKey();
  const [removed, setRemoved] = useState<string | null>(null);
  const [menu, setMenu] = useState<{ id: string; x: number; y: number } | null>(
    null,
  );
  const [active, setActive] = useState<number | undefined>();
  const pressTimer = useRef(0);
  const restTimer = useRef(0);
  const atRest = useRef(true);

  /** Opens the menu under a tile, as the new tab hangs it: centered, a little below the magnified icon. */
  const openUnder = useCallback((id: string) => {
    const stage = stageRef.current;
    const tile = stage?.querySelector<HTMLElement>(
      `.x-nt-shortcut-tile[data-shortcut-id="${id}"]`,
    );
    if (!stage || !tile) return;
    const icon = tile.querySelector<HTMLElement>(".x-nt-shortcut-icon") || tile;
    applyDock(
      gridRef.current,
      icon.getBoundingClientRect().left +
        icon.getBoundingClientRect().width / 2,
    );
    const base = stage.getBoundingClientRect();
    const rect = tile.getBoundingClientRect();
    setMenu({
      id,
      x: rect.left - base.left + rect.width / 2,
      y: rect.bottom - base.top + 8,
    });
  }, []);

  const rest = useCallback(() => openUnder(CONTEXT_TILES[1].id), [openUnder]);

  // Re-anchored whenever the card changes size, while the menu is in its resting place.
  useLayoutEffect(() => {
    rest();
    const stage = stageRef.current;
    const observer = new ResizeObserver(() => {
      if (atRest.current) rest();
    });
    if (stage) observer.observe(stage);
    return () => {
      observer.disconnect();
      window.clearTimeout(restTimer.current);
    };
  }, [rest]);

  const close = useCallback(() => {
    setMenu(null);
    setActive(undefined);
    applyDock(gridRef.current, null);
  }, []);

  // Clicking elsewhere in the card or pressing Escape closes it, as on the new tab.
  useEffect(() => {
    if (!menu) return;
    const stage = stageRef.current;
    const onDown = (event: Event) => {
      if (
        !(event.target instanceof Node) ||
        !stage
          ?.querySelector(".x-nt-shortcut-context-menu-portal")
          ?.contains(event.target)
      )
        close();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    stage?.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", escape);
    return () => {
      stage?.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", escape);
    };
  }, [menu, close]);

  const restore = () => {
    if (!removed) return;
    setRemoved(null);
    toast.clear();
    toast.show(t("newtab_shortcuts_remove_undone", { shortcut: undoKey }));
  };
  useUndoShortcut(Boolean(removed), restore);

  const remove = (id: string) => {
    close();
    setRemoved(id);
    toast.clear();
    toast.show(t("newtab_shortcuts_removed_undo", { shortcut: undoKey }), 3200);
    // Comes back on its own afterwards, so the card always has its three shortcuts.
    toast.later(4200, () => setRemoved(null));
  };

  return (
    <div
      className="dg-feedback dg-context-stage"
      ref={stageRef}
      onPointerEnter={() => window.clearTimeout(restTimer.current)}
      onPointerLeave={() => {
        window.clearTimeout(restTimer.current);
        restTimer.current = window.setTimeout(() => {
          if (removed) return;
          atRest.current = true;
          rest();
        }, 600);
      }}
    >
      {toast.node}
      <NtScope className="dg-nt-stage">
        <div
          className="x-nt-shortcuts-grid dg-nt-context-row"
          data-dock-magnification="true"
          ref={gridRef}
        >
          {CONTEXT_TILES.filter((item) => item.id !== removed).map((item) => (
            <ShortcutTile
              item={item}
              aria-haspopup="menu"
              aria-expanded={menu?.id === item.id}
              onContextMenu={(event) => {
                event.preventDefault();
                atRest.current = false;
                openUnder(item.id);
              }}
              onPointerDown={(event) => {
                if (event.pointerType !== "touch") return;
                pressTimer.current = window.setTimeout(() => {
                  atRest.current = false;
                  openUnder(item.id);
                }, 480);
              }}
              onPointerUp={() => window.clearTimeout(pressTimer.current)}
              onPointerLeave={() => window.clearTimeout(pressTimer.current)}
              onKeyDown={(event) => {
                if (
                  event.key === "ContextMenu" ||
                  (event.shiftKey && event.key === "F10")
                ) {
                  event.preventDefault();
                  atRest.current = false;
                  openUnder(item.id);
                }
              }}
              key={item.id}
            />
          ))}
        </div>
        {menu ? (
          <div
            className="dg-nt-menu-anchor"
            style={{ left: menu.x, top: menu.y }}
          >
            <ContextMenu
              active={active}
              onActive={setActive}
              style={{ position: "relative", left: 0, top: 0 }}
              items={[
                {
                  value: "open-in-new-tab",
                  label: t("newtab_open_in_new_tab"),
                  onSelect: close,
                },
                {
                  value: "edit",
                  label: t("shortcuts_edit"),
                  dividerBefore: true,
                  onSelect: close,
                },
                {
                  value: "remove",
                  label: t("shortcuts_remove"),
                  onSelect: () => remove(menu.id),
                },
              ]}
            />
          </div>
        ) : null}
      </NtScope>
    </div>
  );
}

/*
 * Drag a shortcut onto another and let go: the two become a folder. While a
 * tile is held over another, the target grows its drop plate
 * (data-bookmark-drop-target) and a toast says what letting go does
 * (shortcut-drag.js). Dropping between tiles reorders instead. ⌘Z / Ctrl+Z
 * undoes, as on the new tab.
 */
type DockItem =
  | { kind: "site"; site: NtSite }
  | { kind: "folder"; id: string; items: NtSite[] };

const DRAG_START: DockItem[] = ["youtube", "dribbble", "figma", "twitch"].map(
  (id) => ({ kind: "site", site: site(id) }),
);
const itemKey = (item: DockItem) =>
  item.kind === "site" ? item.site.id : item.id;

type Drag = {
  index: number;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  moved: boolean;
  over: number | null;
  centers: number[];
  centerY: number;
};

export function DragFolderCard() {
  const t = useExtensionText();
  const rowRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const undoKey = useUndoKey();
  const [items, setItems] = useState<DockItem[]>(DRAG_START);
  const [previous, setPrevious] = useState<DockItem[] | null>(null);
  const [drag, setDrag] = useState<Drag | null>(null);
  const { resolved } = useDesignTheme();

  const undo = () => {
    if (!previous) return;
    setItems(previous);
    setPrevious(null);
    toast.clear();
    toast.show(t("newtab_shortcuts_stack_undone", { shortcut: undoKey }));
  };
  useUndoShortcut(Boolean(previous), undo);

  // While the drop plate shows, the toast says what letting go does (duration 0: it stays until then).
  const over = drag?.moved ? drag.over : null;
  useEffect(() => {
    if (over === null) {
      toast.setShown(false);
      return;
    }
    toast.clear();
    toast.setToast({ text: t("newtab_shortcuts_stack_hint"), loading: false });
    toast.setShown(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [over]);

  const commit = (next: DockItem[], message?: string) => {
    setPrevious(items);
    setItems(next);
    if (message) {
      toast.clear();
      toast.show(message, 3200);
    }
  };

  const geometry = () => {
    const row = rowRef.current;
    if (!row) return null;
    const base = row.getBoundingClientRect();
    const tiles = [
      ...row.querySelectorAll<HTMLElement>(".x-nt-shortcut-tile"),
    ].map((tile) => tile.getBoundingClientRect());
    if (!tiles.length) return null;
    return {
      centers: tiles.map((rect) => rect.left - base.left + rect.width / 2),
      centerY: tiles[0].top - base.top + tiles[0].height / 2,
    };
  };

  const onPointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.button !== 0) return;
    const shape = geometry();
    if (!shape) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({
      index,
      startX: event.clientX,
      startY: event.clientY,
      dx: 0,
      dy: 0,
      moved: false,
      over: null,
      ...shape,
    });
  };

  // shortcut-drag.js: the middle of another website tile stacks onto it; its outer quarters still reorder.
  const onPointerMove = (event: ReactPointerEvent) => {
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const moved = drag.moved || Math.hypot(dx, dy) > 4;
    const x = drag.centers[drag.index] + dx;
    const y = drag.centerY + dy;
    let target: number | null = null;
    drag.centers.forEach((center, index) => {
      if (
        index !== drag.index &&
        Math.abs(x - center) < 16 &&
        Math.abs(y - drag.centerY) < 26
      )
        target = index;
    });
    if (target !== null && items[drag.index].kind === "folder") target = null;
    setDrag({ ...drag, dx, dy, moved, over: target });
  };

  const onPointerUp = () => {
    if (!drag) return;
    const { index, over: target, moved, centers, dx } = drag;
    setDrag(null);
    if (!moved) return;
    const dragged = items[index];
    if (target !== null && dragged.kind === "site") {
      const onto = items[target];
      const folder: DockItem =
        onto.kind === "folder"
          ? { ...onto, items: [...onto.items, dragged.site] }
          : {
              kind: "folder",
              id: `folder-${Date.now()}`,
              items: [onto.site, dragged.site],
            };
      const next = items
        .map((item, i) => (i === target ? folder : item))
        .filter((_, i) => i !== index);
      commit(next, t("newtab_shortcuts_stacked_undo", { shortcut: undoKey }));
      return;
    }
    const x = centers[index] + dx;
    const rest = items.filter((_, i) => i !== index);
    const insertAt = Math.max(
      0,
      Math.min(
        rest.length,
        centers.filter((center, i) => i !== index && center < x).length,
      ),
    );
    const next = [...rest.slice(0, insertAt), dragged, ...rest.slice(insertAt)];
    if (next.some((item, i) => item !== items[i])) commit(next);
  };

  // Lifts the first shortcut onto the second, holds while the toast says what letting go does, lets go, then undoes it.
  useCardDemo((timeline) => {
    let shape: ReturnType<typeof geometry> = null;
    timeline.at(0, () => {
      setItems(DRAG_START);
      setPrevious(null);
      setDrag(null);
    });
    timeline.at(350, () => {
      shape = geometry();
      if (shape)
        setDrag({
          index: 0,
          startX: 0,
          startY: 0,
          dx: 0,
          dy: 0,
          moved: true,
          over: null,
          ...shape,
        });
    });
    timeline.tween(450, 750, (p) => {
      if (!shape) return;
      const dx = (shape.centers[1] - shape.centers[0]) * p;
      setDrag({
        index: 0,
        startX: 0,
        startY: 0,
        dx,
        dy: -10 * Math.sin(Math.PI * p),
        moved: true,
        over: p > 0.8 ? 1 : null,
        ...shape,
      });
    });
    timeline.at(2100, () => {
      setDrag(null);
      const [first, second, ...rest] = DRAG_START;
      if (first.kind !== "site" || second.kind !== "site") return;
      setPrevious(DRAG_START);
      setItems([
        { kind: "folder", id: "folder-demo", items: [second.site, first.site] },
        ...rest,
      ]);
      toast.clear();
      toast.show(
        t("newtab_shortcuts_stacked_undo", { shortcut: undoKey }),
        1700,
      );
    });
    timeline.at(4100, () => {
      setItems(DRAG_START);
      setPrevious(null);
      toast.clear();
      toast.show(
        t("newtab_shortcuts_stack_undone", { shortcut: undoKey }),
        1400,
      );
    });
    timeline.onStop(() => setDrag(null));
  });

  return (
    <div className="dg-feedback">
      {toast.node}
      <NtScope className="dg-nt-stage">
        <div
          className="x-nt-shortcuts-grid dg-nt-drag-row"
          data-dock-magnification="false"
          data-shortcut-dragging={drag?.moved ? "true" : undefined}
          ref={rowRef}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => setDrag(null)}
        >
          {items.map((item, index) => {
            const dragging = drag?.index === index && drag.moved;
            const style = dragging
              ? ({
                  transform: `translate3d(${drag.dx}px, ${drag.dy}px, 0)`,
                  zIndex: 8,
                } as CSSProperties)
              : undefined;
            const shared = {
              "data-shortcut-dragging": dragging ? "true" : undefined,
              "data-bookmark-drop-target":
                drag?.moved && drag.over === index ? "true" : undefined,
              onPointerDown: (event: ReactPointerEvent<HTMLButtonElement>) =>
                onPointerDown(event, index),
            };
            if (item.kind === "site")
              return (
                <ShortcutTile
                  item={item.site}
                  style={style}
                  {...shared}
                  key={itemKey(item)}
                />
              );
            return (
              <button
                type="button"
                className="x-nt-shortcut-tile x-nt-shortcut-tile--folder"
                draggable={false}
                data-shortcut-draggable="true"
                aria-label={item.items.map((entry) => entry.title).join(", ")}
                style={
                  {
                    "--x-nt-shortcut-icon-bg":
                      resolved === "dark"
                        ? FOLDER_TILE.dark
                        : FOLDER_TILE.light,
                    "--x-nt-shortcut-icon-color":
                      resolved === "dark" ? "#F8FAFC" : "#111827",
                    ...style,
                  } as CSSProperties
                }
                {...shared}
                key={itemKey(item)}
              >
                <FolderIcon
                  plain
                  className="x-nt-shortcut-icon x-nt-shortcut-icon--folder"
                />
              </button>
            );
          })}
        </div>
      </NtScope>
    </div>
  );
}

// A folder shortcut's plate (its fallback theme), as the new tab draws it.
const FOLDER_TILE = { light: "rgb(220, 233, 253)", dark: "rgb(34, 53, 84)" };

/*
 * The recent-tab switcher (overlay/tab-switcher.js and react-src/overlay/tab-switcher.tsx),
 * in its own markup and stylesheet (extension/tab-switcher.css): a frosted
 * panel of tab cards, the active one tinted with its site's accent. Without a
 * captured page thumbnail the extension shows the favicon on that tint, which
 * is what these cards show. Arrow keys or the pointer move the selection; the
 * × closes a tab.
 */
const RECENT_TABS = [
  { id: 1, site: "github", title: "kubai087/lumno-extension" },
  { id: 2, site: "figma", title: "Lumno – Design system" },
  { id: 3, site: "youtube", title: "YouTube" },
  { id: 4, site: "dribbble", title: "Dribbble – Discover the World's Top Designers" },
  { id: 5, site: "chatgpt", title: "ChatGPT" },
].map((tab) => ({ ...site(tab.site), ...tab }));
type RecentTab = (typeof RECENT_TABS)[number];

function SwitcherCard({ tab, index, active, closeLabel, onSelect, onActivate, onClose }: { tab: RecentTab; index: number; active: boolean; closeLabel: string; onSelect: (index: number) => void; onActivate: () => void; onClose: () => void }) {
  const theme = useSiteTheme({ url: tab.url, image: tab.favicon });
  const accent = theme._xIsBrand ? `rgb(${theme.accentRgb.join(", ")})` : "";
  const host = new URL(tab.url).hostname.replace(/^www\./i, "");
  return (
    <div className="x-tab-switcher-item">
      <button
        type="button"
        role="option"
        className="x-tab-switcher-card"
        data-tab-id={String(tab.id)}
        data-thumbnail-status="ok"
        data-active={active ? "true" : "false"}
        aria-selected={active}
        aria-label={tab.title}
        tabIndex={-1}
        style={accent ? ({ "--x-tab-switcher-card-accent": accent } as CSSProperties) : undefined}
        onPointerEnter={() => onSelect(index)}
        onClick={onActivate}
      >
        {/* A captured page thumbnail, which the extension keeps per tab; drawn here as a sketch of each page. */}
        <div className="x-tab-switcher-thumb" data-tab-id={String(tab.id)} data-thumbnail-status="ok">
          <img src={`/assets/design/tab-thumbs/${tab.site}.svg`} alt="" decoding="async" loading="lazy" data-kind="thumbnail" />
        </div>
        <div className="x-tab-switcher-meta">
          <div className="x-tab-switcher-name-row">
            <img className="x-tab-switcher-title-favicon" src={tab.favicon} alt="" decoding="async" loading="eager" />
            <div className="x-tab-switcher-name" title={tab.title}>
              {tab.title}
            </div>
          </div>
          <div className="x-tab-switcher-host">{host}</div>
        </div>
      </button>
      <button type="button" className="x-tab-switcher-close" aria-label={closeLabel} title={closeLabel} tabIndex={-1} onClick={onClose}>
        <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
          <path d="M3 3l6 6M9 3l-6 6" />
        </svg>
      </button>
    </div>
  );
}

export function TabSwitcherCard() {
  const t = useExtensionText();
  const { resolved } = useDesignTheme();
  const toast = useToast();
  const [closed, setClosed] = useState<number[]>([]);
  const [active, setActive] = useState(1);
  const [placement, setPlacement] = useState<"left" | "right">("left");
  const [switched, setSwitched] = useState(false);
  const timer = useRef(0);
  const tabs = RECENT_TABS.filter((tab) => !closed.includes(tab.id));
  const current = Math.min(active, tabs.length - 1);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  // getCloseButtonPlacement: the × sits left on Apple platforms, right elsewhere.
  useEffect(() => setPlacement(/(mac|iphone|ipad|ipod)/i.test(navigator.platform || navigator.userAgent) ? "left" : "right"), []);

  // Steps through the recent tabs, then switches to one, as holding the shortcut and letting go does.
  useCardDemo((timeline) => {
    timeline.at(0, () => {
      setClosed([]);
      setActive(1);
    });
    [2, 3, 4, 3].forEach((index, step) => timeline.at(500 + step * 450, () => setActive(index)));
    timeline.at(2500, () => activate());
    timeline.at(3200, () => setActive(1));
  });

  // Choosing a tab closes the switcher in the extension; here the panel fades for a beat and comes back.
  const activate = () => {
    setSwitched(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSwitched(false), 520);
  };

  const close = (id: number) => {
    setClosed((list) => [...list, id]);
    toast.clear();
    toast.show(t("tab_switcher_tab_closed"));
    // Closed tabs come back once the toast is gone, so the panel never runs out.
    toast.later(2600, () => setClosed([]));
  };

  return (
    <div className="dg-feedback">
      {toast.node}
      <div className="dg-ts-stage">
        <div
          className="dg-ts-panel"
          role="listbox"
          aria-label={t("tab_switcher_title")}
          tabIndex={0}
          data-visible={switched ? "false" : "true"}
          data-close-placement={placement}
          data-theme={resolved}
          style={{ "--x-tab-count": String(Math.max(1, Math.min(5, tabs.length))) } as CSSProperties}
          onKeyDown={(event) => {
            const step = { ArrowRight: 1, ArrowLeft: -1, Tab: event.shiftKey ? -1 : 1 }[event.key];
            if (step && tabs.length) {
              if (event.key === "Tab" && ((step > 0 && current === tabs.length - 1) || (step < 0 && current === 0))) return;
              event.preventDefault();
              setActive((current + step + tabs.length) % tabs.length);
            }
            if (event.key === "Enter") {
              event.preventDefault();
              activate();
            }
          }}
        >
          <div className="x-tab-switcher-list">
            {tabs.map((tab, index) => (
              <SwitcherCard
                tab={tab}
                index={index}
                active={index === current}
                closeLabel={t("tab_switcher_close_tab")}
                onSelect={setActive}
                onActivate={activate}
                onClose={() => close(tab.id)}
                key={tab.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
