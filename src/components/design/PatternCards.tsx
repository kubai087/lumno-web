import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { DesignDemoCopy } from "../../lib/design-content";
import { useCardDemo, type Timeline } from "./demo";
import { useSegmentedIndicator } from "./extension/segmented-indicator";
import { useToast } from "./FeedbackCards";
import { useExtensionText } from "./ext-strings";
import { BookmarkCard, NtScope, RecentCard, site } from "./NewTab";
import { Select } from "./ControlCards";
import { Marked, OverlayInput, OverlayPanel, OverlayStage, OverlaySuggestions, SuggestionRow, useSiteTheme } from "./Overlay";

/*
 * The patterns section: ways of doing things the extension repeats across its
 * surfaces, each with the extension's own timings.
 *   bookmark-drag-controller.js  drag starts after 10px, neighbours make room
 *                                (cross-surface-drag.js data-drag-gap), a drop
 *                                reflows in 180ms and lands in 210ms; resting
 *                                on a pager button for 640ms turns the page
 *   bookmark-pager.js            pages slide 34px in 220ms, staggered by column
 *   newtab.css                   disclosure sections (chevron turns 90deg, the
 *                                body animates its own height)
 *   recent-mode-switch.js        a heading that unfolds into a switch
 *   shortcut-dialog.tsx          the icon refresh: spin, then a check
 *   suggestion-navigation.js     hold the primary modifier, release, press a digit
 */

type Copy = DesignDemoCopy["patterns"];
type Mark = { id: string; title: string; icon: string };

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DRAG_START_PX = 10;
const REORDER_MS = 180;
const DROP_MS = 210;
const PAGE_DWELL_MS = 640;
const PAGE_SIZE = 6;
const PAGE_OFFSET_PX = 34;
const PAGE_SLIDE_MS = 220;
const PAGE_FADE_MS = 150;
const PAGE_HANDOFF_MS = 70;
const GAP_REST_MS = 240;

const PAGE_ONE: Mark[] = [
  { id: "github", title: "GitHub", icon: "github" },
  { id: "figma", title: "Figma", icon: "figma" },
  { id: "vercel", title: "Vercel", icon: "vercel" },
  { id: "nextjs", title: "Next.js", icon: "nextjs" },
  { id: "react", title: "React", icon: "react" },
  { id: "tailwind", title: "Tailwind CSS", icon: "tailwindcss" },
];
const PAGE_TWO: Mark[] = [
  { id: "supabase", title: "Supabase", icon: "supabase" },
  { id: "npm", title: "npm", icon: "npm" },
  { id: "stackoverflow", title: "Stack Overflow", icon: "stackoverflow" },
  { id: "medium", title: "Medium", icon: "medium" },
  { id: "dribbble", title: "Dribbble", icon: "dribbble" },
  { id: "fonts", title: "Google Fonts", icon: "google-fonts" },
];

type Gap = "before" | "after" | "rest";
type Drag = { id: string; startX: number; startY: number; grabX: number; grabY: number; left: number; top: number; width: number; moved: boolean };
type Insert = { anchor: string; side: "before" | "after" } | null;

const center = (rect: DOMRect) => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

/*
 * A bookmark grid you can drag in: the card follows the pointer, the two
 * cards either side of where it would land part by 6px, and letting go
 * reflows the grid. With `paged`, it holds two pages behind a pager, and a
 * card held on a pager button turns the page under it.
 */
function useBookmarkGrid({ marks, paged, copy, title, copyLabel }: { marks: Mark[]; paged: boolean; copy: Copy; title: string; copyLabel: string }) {
  const [order, setOrder] = useState(marks);
  const [page, setPage] = useState(0);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [insert, setInsert] = useState<Insert>(null);
  const [gaps, setGaps] = useState<Record<string, Gap>>({});
  const [pageTarget, setPageTarget] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const cards = useRef(new Map<string, HTMLElement>());
  const pagers = useRef<Record<number, HTMLButtonElement | null>>({});
  const flip = useRef<{ rects: Map<string, DOMRect>; dropped: string } | null>(null);
  const entering = useRef(0);
  const sliding = useRef(false);
  const dwell = useRef(0);
  const restTimers = useRef(new Map<string, number>());
  const live = useRef({ order, page, drag, insert, pageTarget });
  live.current = { order, page, drag, insert, pageTarget };

  const pageCount = Math.ceil(order.length / PAGE_SIZE);
  const shown = order.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  // cross-surface-drag.js setInsertionGap: released neighbours keep a "rest" state while they slide back.
  const applyGaps = (next: Record<string, "before" | "after">) => {
    setGaps((current) => {
      const result: Record<string, Gap> = {};
      Object.entries(current).forEach(([id, side]) => {
        if (next[id]) return;
        if (side === "rest") {
          result[id] = side;
          return;
        }
        result[id] = "rest";
        window.clearTimeout(restTimers.current.get(id));
        restTimers.current.set(
          id,
          window.setTimeout(() => setGaps((latest) => (latest[id] === "rest" ? Object.fromEntries(Object.entries(latest).filter(([key]) => key !== id)) : latest)), GAP_REST_MS),
        );
      });
      Object.entries(next).forEach(([id, side]) => {
        window.clearTimeout(restTimers.current.get(id));
        result[id] = side;
      });
      return result;
    });
  };

  const columns = () => {
    const grid = gridRef.current;
    return grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 3;
  };

  /* bookmark-pager.js: the page slides out, staggered by column and row, then the next one slides in. */
  const turnPage = (direction: number) => {
    const { page: current, order: list } = live.current;
    const next = current + direction;
    if (sliding.current || next < 0 || next >= Math.ceil(list.length / PAGE_SIZE)) return false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPage(next);
      return true;
    }
    sliding.current = true;
    const cols = columns();
    let longest = 0;
    [...cards.current.values()].forEach((card) => {
      const index = Number(card.dataset.index || 0);
      const delay = (index % cols) * 24 + Math.floor(index / cols) * 10;
      longest = Math.max(longest, delay);
      card.style.transition = `transform ${PAGE_SLIDE_MS}ms ${EASE} ${delay}ms, opacity ${PAGE_FADE_MS}ms ${EASE} ${delay}ms`;
      card.style.opacity = "0";
      card.style.transform = `translateX(${-direction * PAGE_OFFSET_PX}px)`;
    });
    window.setTimeout(() => {
      entering.current = direction;
      setPage(next);
    }, Math.max(0, PAGE_SLIDE_MS + longest - PAGE_HANDOFF_MS));
    return true;
  };

  useLayoutEffect(() => {
    const direction = entering.current;
    if (!direction) return;
    entering.current = 0;
    const cols = columns();
    const list = [...cards.current.values()];
    list.forEach((card) => {
      card.style.transition = "none";
      card.style.opacity = "0";
      card.style.transform = `translateX(${direction * PAGE_OFFSET_PX}px)`;
    });
    void gridRef.current?.offsetHeight;
    let longest = 0;
    list.forEach((card) => {
      const index = Number(card.dataset.index || 0);
      const delay = (index % cols) * 24 + Math.floor(index / cols) * 10;
      longest = Math.max(longest, delay);
      card.style.transition = `transform ${PAGE_SLIDE_MS}ms ${EASE} ${delay}ms, opacity ${PAGE_FADE_MS}ms ${EASE} ${delay}ms`;
      card.style.opacity = "";
      card.style.transform = "";
    });
    window.setTimeout(() => {
      list.forEach((card) => {
        card.style.transition = "";
      });
      sliding.current = false;
      // Still held on the same pager button: keep turning, as the extension does.
      const { drag: held, pageTarget: target } = live.current;
      if (held?.moved && target) scheduleTurn(target, true);
    }, PAGE_SLIDE_MS + longest + 20);
  }, [page]);

  const clearDwell = () => {
    window.clearTimeout(dwell.current);
    dwell.current = 0;
  };

  function scheduleTurn(direction: number, force = false) {
    if (!force && dwell.current) return;
    clearDwell();
    dwell.current = window.setTimeout(() => {
      dwell.current = 0;
      const { drag: held, pageTarget: target } = live.current;
      if (!held?.moved || target !== direction) return;
      applyGaps({});
      setInsert(null);
      turnPage(direction);
    }, PAGE_DWELL_MS);
  }

  /** Where a card would land under the pointer, and the two neighbours that part for it. */
  const locate = (x: number, y: number, id: string) => {
    const grid = gridRef.current;
    if (!grid) return null;
    const box = grid.getBoundingClientRect();
    if (x < box.left - 16 || x > box.right + 16 || y < box.top - 16 || y > box.bottom + 16) return null;
    const others = live.current.order
      .slice(live.current.page * PAGE_SIZE, live.current.page * PAGE_SIZE + PAGE_SIZE)
      .filter((mark) => mark.id !== id)
      .map((mark) => ({ id: mark.id, el: cards.current.get(mark.id) }))
      .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el));
    if (!others.length) return null;
    const px = x - box.left;
    const py = y - box.top;
    const rows = [...new Set(others.map((item) => item.el.offsetTop))].sort((a, b) => a - b);
    const height = others[0].el.offsetHeight;
    const row = rows.reduce((best, top) => (Math.abs(py - (top + height / 2)) < Math.abs(py - (best + height / 2)) ? top : best), rows[0]);
    const line = others.filter((item) => item.el.offsetTop === row).sort((a, b) => a.el.offsetLeft - b.el.offsetLeft);
    const hit = line.find((item) => px < item.el.offsetLeft + item.el.offsetWidth / 2);
    const anchor = hit || line[line.length - 1];
    const side: "before" | "after" = hit ? "before" : "after";
    const index = others.indexOf(anchor);
    const before = side === "after" ? anchor : others[index - 1];
    const after = side === "after" ? others[index + 1] : anchor;
    const sameLine = (item?: { id: string; el: HTMLElement }) => (item && item.el.offsetTop === row ? item : undefined);
    const parting: Record<string, "before" | "after"> = {};
    const left = sameLine(before);
    const right = sameLine(after);
    if (left) parting[left.id] = "before";
    if (right && right !== left) parting[right.id] = "after";
    return { insert: { anchor: anchor.id, side }, parting };
  };

  const pagerUnder = (x: number, y: number) => {
    if (!paged) return 0;
    for (const direction of [-1, 1]) {
      const button = pagers.current[direction];
      if (!button || button.getAttribute("aria-disabled") === "true") continue;
      const rect = button.getBoundingClientRect();
      if (x >= rect.left - 6 && x <= rect.right + 6 && y >= rect.top - 6 && y <= rect.bottom + 6) return direction;
    }
    return 0;
  };

  const begin = (id: string, x: number, y: number) => {
    const card = cards.current.get(id);
    const wrap = wrapRef.current;
    if (!card || !wrap || sliding.current) return;
    const rect = card.getBoundingClientRect();
    const base = wrap.getBoundingClientRect();
    setDrag({ id, startX: x, startY: y, grabX: x - rect.left, grabY: y - rect.top, left: rect.left - base.left, top: rect.top - base.top, width: rect.width, moved: false });
  };

  const move = (x: number, y: number) => {
    const held = live.current.drag;
    const wrap = wrapRef.current;
    if (!held || !wrap) return;
    const moved = held.moved || Math.hypot(x - held.startX, y - held.startY) > DRAG_START_PX;
    const base = wrap.getBoundingClientRect();
    setDrag({ ...held, moved, left: x - held.grabX - base.left, top: y - held.grabY - base.top });
    if (!moved) return;
    const target = pagerUnder(x, y);
    if (target !== live.current.pageTarget) {
      clearDwell();
      setPageTarget(target);
    }
    if (target) {
      live.current.pageTarget = target;
      scheduleTurn(target);
      applyGaps({});
      setInsert(null);
      return;
    }
    if (sliding.current) return;
    const spot = locate(x, y, held.id);
    setInsert(spot?.insert ?? null);
    applyGaps(spot?.parting ?? {});
  };

  const end = () => {
    const held = live.current.drag;
    clearDwell();
    setPageTarget(0);
    if (!held) return;
    if (!held.moved) {
      setDrag(null);
      return;
    }
    const { order: list, insert: spot } = live.current;
    const rest = list.filter((mark) => mark.id !== held.id);
    const dragged = list.find((mark) => mark.id === held.id)!;
    let at = list.indexOf(dragged);
    if (spot) {
      const index = rest.findIndex((mark) => mark.id === spot.anchor);
      at = spot.side === "before" ? index : index + 1;
    }
    const next = [...rest.slice(0, at), dragged, ...rest.slice(at)];
    const rects = new Map<string, DOMRect>();
    cards.current.forEach((card, id) => rects.set(id, card.getBoundingClientRect()));
    if (ghostRef.current) rects.set(held.id, ghostRef.current.getBoundingClientRect());
    flip.current = { rects, dropped: held.id };
    // A drop on another page lands there; the grid shows the page it landed on.
    const landedPage = Math.floor(at / PAGE_SIZE);
    if (landedPage !== live.current.page) setPage(landedPage);
    setOrder(next);
    setDrag(null);
    setInsert(null);
    applyGaps({});
  };

  // The drop: everything slides from where it was to its new place.
  useLayoutEffect(() => {
    const pending = flip.current;
    if (!pending) return;
    flip.current = null;
    const moved: HTMLElement[] = [];
    cards.current.forEach((card, id) => {
      const before = pending.rects.get(id);
      if (!before) return;
      const after = card.getBoundingClientRect();
      const dx = before.left - after.left;
      const dy = before.top - after.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
      card.style.transition = "none";
      card.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      moved.push(card);
    });
    if (!moved.length) return;
    void gridRef.current?.offsetHeight;
    requestAnimationFrame(() => {
      moved.forEach((card) => {
        const duration = card.dataset.id === pending.dropped ? DROP_MS : REORDER_MS;
        card.style.transition = `transform ${duration}ms ${EASE}`;
        card.style.transform = "";
        window.setTimeout(() => {
          card.style.transition = "";
        }, duration + 80);
      });
    });
  }, [order]);

  // A real pointer drives the same three calls; it is tracked on the window, since the card may change pages under it.
  useEffect(() => {
    if (!drag) return;
    const onMove = (event: PointerEvent) => move(event.clientX, event.clientY);
    const onUp = () => end();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [Boolean(drag)]);

  useEffect(
    () => () => {
      clearDwell();
      restTimers.current.forEach(window.clearTimeout);
    },
    [],
  );

  const reset = () => {
    clearDwell();
    setDrag(null);
    setInsert(null);
    setGaps({});
    setPageTarget(0);
    setOrder(marks);
    setPage(0);
  };

  const dragged = drag?.moved ? order.find((mark) => mark.id === drag.id) : null;

  // bookmarks.tsx: the section's header (heading and pager) over the grid of cards.
  const view = (
    <NtScope className="dg-pat-bookmarks">
      {/* The cards are links: the browser's own drag (and its no-entry cursor) never starts, the extension's does. */}
      <div ref={wrapRef} className="dg-pat-bookmarks__inner" data-dragging={dragged ? "true" : undefined} onDragStart={(event) => event.preventDefault()}>
        {paged ? (
          <div className="x-nt-bookmarks-header">
            <div className="x-nt-bookmarks-title-wrap">
              <div className="x-nt-bookmarks-heading">{title}</div>
            </div>
            <div className="x-nt-bookmarks-pager">
              {[-1, 1].map((direction) => {
                const disabled = direction < 0 ? page === 0 : page >= pageCount - 1;
                return (
                  <button
                    type="button"
                    className="x-nt-bookmarks-pager-btn"
                    aria-label={direction < 0 ? copy.pagePrev : copy.pageNext}
                    title={direction < 0 ? copy.pagePrev : copy.pageNext}
                    aria-disabled={disabled ? "true" : "false"}
                    tabIndex={disabled ? -1 : 0}
                    data-bookmark-drag-page-target={pageTarget === direction ? "true" : undefined}
                    ref={(node) => {
                      pagers.current[direction] = node;
                    }}
                    onClick={() => {
                      if (!disabled) turnPage(direction);
                    }}
                    key={direction}
                  >
                    <i className={`ri-icon ri-size-16 ${direction < 0 ? "ri-arrow-left-s-line" : "ri-arrow-right-s-line"}`} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className="_x_extension_newtab_bookmarks_grid_2024_unique_ dg-pat-bookmarks__grid" data-view-mode="folder" data-bookmark-dragging={dragged ? "true" : undefined} ref={gridRef}>
          {shown.map((mark, index) => (
            <BookmarkCard
              item={site(mark.id)}
              copyLabel={copyLabel}
              data-id={mark.id}
              data-index={index}
              data-drag-gap={gaps[mark.id]}
              data-bookmark-dragging={dragged?.id === mark.id ? "true" : undefined}
              ref={(node: HTMLDivElement | null) => {
                if (node) cards.current.set(mark.id, node);
                else cards.current.delete(mark.id);
              }}
              onPointerDown={(event) => {
                if (event.button !== 0) return;
                event.preventDefault();
                begin(mark.id, event.clientX, event.clientY);
              }}
              key={mark.id}
            />
          ))}
        </div>
        {dragged && drag ? (
          <BookmarkCard
            item={site(dragged.id)}
            copyLabel={copyLabel}
            className="x-nt-bookmark-card-drag-preview"
            ref={ghostRef}
            aria-hidden="true"
            tabIndex={-1}
            style={{ left: drag.left, top: drag.top, width: drag.width }}
          />
        ) : null}
      </div>
    </NtScope>
  );

  /** For demos: a point over a card, between two cards, or on a pager button. */
  const points = {
    card: (id: string) => {
      const card = cards.current.get(id);
      return card ? center(card.getBoundingClientRect()) : null;
    },
    /** Near a card's right end, so the card hangs left of the pointer and leaves the pager in sight. */
    grip: (id: string) => {
      const card = cards.current.get(id);
      if (!card) return null;
      const rect = card.getBoundingClientRect();
      return { x: rect.right - 14, y: rect.top + rect.height / 2 };
    },
    between: (a: string, b: string) => {
      const one = cards.current.get(a);
      const two = cards.current.get(b);
      if (!one || !two) return null;
      const p = center(one.getBoundingClientRect());
      const q = center(two.getBoundingClientRect());
      return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    },
    leftOf: (id: string) => {
      const card = cards.current.get(id);
      if (!card) return null;
      const rect = card.getBoundingClientRect();
      return { x: rect.left + rect.width * 0.2, y: rect.top + rect.height / 2 };
    },
    pager: (direction: number) => {
      const button = pagers.current[direction];
      return button ? center(button.getBoundingClientRect()) : null;
    },
  };

  return { view, begin, move, end, reset, points };
}

type Point = { x: number; y: number } | null;

/** Moves a held card from wherever it is to `to()` (measured when the leg starts). */
function glide(t: Timeline, grid: ReturnType<typeof useBookmarkGrid>, start: number, duration: number, from: () => Point, to: () => Point) {
  let a: Point = null;
  let b: Point = null;
  t.tween(start, duration, (p) => {
    if (!a || !b) {
      a = from();
      b = to();
    }
    if (!a || !b) return;
    grid.move(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p - 8 * Math.sin(Math.PI * p));
  });
}

export function DragGapCard({ copy }: { copy: Copy }) {
  const t = useExtensionText();
  const grid = useBookmarkGrid({ marks: PAGE_ONE, paged: false, copy, title: "", copyLabel: t("bookmarks_copy_url") });
  /*
   * GitHub is lifted and held between Figma and Vercel (they part), then
   * between React and Tailwind CSS, and let go there; then it is carried
   * back to the front.
   */
  useCardDemo((t) => {
    let at: Point = null;
    const track = (point: () => Point) => () => (at = point());
    t.at(0, grid.reset);
    t.at(300, () => {
      at = grid.points.card("github");
      if (at) grid.begin("github", at.x, at.y);
    });
    glide(t, grid, 360, 700, () => at, track(() => grid.points.between("figma", "vercel")));
    glide(t, grid, 1700, 700, () => at, track(() => grid.points.between("react", "tailwind")));
    t.at(2900, grid.end);
    t.at(3800, () => {
      at = grid.points.card("github");
      if (at) grid.begin("github", at.x, at.y);
    });
    glide(t, grid, 3860, 800, () => at, track(() => grid.points.leftOf("figma")));
    t.at(5100, grid.end);
    t.onStop(grid.end);
  });
  return <div className="dg-feedback dg-pat-stage">{grid.view}</div>;
}

export function DragPageCard({ copy, title }: { copy: Copy; title: string }) {
  const t = useExtensionText();
  const grid = useBookmarkGrid({ marks: [...PAGE_ONE, ...PAGE_TWO], paged: true, copy, title, copyLabel: t("bookmarks_copy_url") });
  /*
   * React is held on the next-page button until the page turns, set down
   * between npm and Stack Overflow, then carried back the same way.
   */
  useCardDemo((t) => {
    let at: Point = null;
    const track = (point: () => Point) => () => (at = point());
    t.at(0, grid.reset);
    t.at(300, () => {
      at = grid.points.grip("react");
      if (at) grid.begin("react", at.x, at.y);
    });
    glide(t, grid, 360, 800, () => at, track(() => grid.points.pager(1)));
    // 640ms on the button turns the page; the slide takes about 300ms more.
    glide(t, grid, 2300, 700, () => at, track(() => grid.points.between("npm", "stackoverflow")));
    t.at(3500, grid.end);
    t.at(4400, () => {
      at = grid.points.grip("react");
      if (at) grid.begin("react", at.x, at.y);
    });
    glide(t, grid, 4460, 800, () => at, track(() => grid.points.pager(-1)));
    glide(t, grid, 6400, 700, () => at, track(() => grid.points.between("nextjs", "tailwind")));
    t.at(7600, grid.end);
    t.onStop(grid.end);
  });
  return <div className="dg-feedback dg-pat-stage">{grid.view}</div>;
}

/** A panel section (wallpaper-view.tsx): the chevron and title as one trigger, then a body that animates its own height. */
function Section({ id, title, open, onToggle, className, trailing, children }: { id: string; title: string; open: boolean; onToggle: () => void; className?: string; trailing?: ReactNode; children: ReactNode }) {
  return (
    <div className={["x-nt-wallpaper-section", className].filter(Boolean).join(" ")}>
      <div className="x-nt-wallpaper-panel-header">
        <button type="button" className="x-nt-section-trigger" aria-expanded={open ? "true" : "false"} aria-controls={id} onClick={onToggle}>
          <span className="x-nt-section-chevron" aria-hidden="true">
            <i className="ri-icon ri-size-14 ri-arrow-right-s-line" aria-hidden="true" />
          </span>
          <span className="x-nt-wallpaper-panel-title">{title}</span>
        </button>
        {trailing}
      </div>
      <div className="x-nt-panel-section-body x-nt-panel-collapsible" id={id} data-visible={open ? "true" : "false"} aria-hidden={!open}>
        {children}
      </div>
    </div>
  );
}

function PanelSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="x-nt-wallpaper-switch">
      <input type="checkbox" role="switch" aria-label={label} aria-checked={checked} checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span aria-hidden="true" className="x-nt-wallpaper-switch-slider" />
    </label>
  );
}

/*
 * The new tab's appearance panel (wallpaper-view.tsx) as it opens: its
 * sections fold on their chevrons, each body growing or shrinking to its
 * height while the rows keep theirs, so they slide rather than squeeze. The
 * shortcuts section is the panel's accordion, with its own switch beside it.
 */
export function AccordionCard() {
  const t = useExtensionText();
  const [open, setOpen] = useState({ style: true, search: false, shortcuts: false });
  const [glass, setGlass] = useState("none");
  const [width, setWidth] = useState(640);
  const [autoFocus, setAutoFocus] = useState(false);
  const [shortcuts, setShortcuts] = useState(true);
  const [plus, setPlus] = useState(true);
  const [dock, setDock] = useState(true);
  const toggle = (key: keyof typeof open) => setOpen((value) => ({ ...value, [key]: !value[key] }));
  useCardDemo((timeline) => {
    timeline.at(0, () => setOpen({ style: true, search: false, shortcuts: false }));
    timeline.at(500, () => setOpen({ style: true, search: true, shortcuts: false }));
    timeline.at(1300, () => setOpen({ style: false, search: true, shortcuts: false }));
    timeline.at(2000, () => setOpen({ style: false, search: true, shortcuts: true }));
    timeline.at(3100, () => setOpen({ style: false, search: false, shortcuts: true }));
    timeline.at(3800, () => setOpen({ style: true, search: false, shortcuts: false }));
  });
  const percent = ((width - 640) / (1040 - 640)) * 100;
  const marks = [0.2, 0.7]
    .map((mark) => `linear-gradient(90deg, transparent calc((var(--x-range-slider-thumb-size) / 2 + (100% - var(--x-range-slider-thumb-size)) * ${mark}) - 1px), var(--x-range-slider-mark-color) 0 calc((var(--x-range-slider-thumb-size) / 2 + (100% - var(--x-range-slider-thumb-size)) * ${mark}) + 1px), transparent 0)`)
    .join(", ");
  return (
    <NtScope className="dg-pat-panel-host">
      <div className="x-nt-wallpaper-panel dg-pat-panel" role="dialog" aria-label={t("newtab_appearance_settings_title")} data-open="true">
        <div className="x-nt-appearance-header">
          <div className="x-nt-wallpaper-panel-title">{t("newtab_appearance_settings_title")}</div>
          <a className="x-lumno-link-button x-nt-appearance-more-settings" href="#controls" aria-label={t("newtab_more_settings")}>
            <span className="x-lumno-link-button__label x-nt-appearance-more-settings-text">{t("newtab_more_settings")}</span>
            <i aria-hidden="true" className="ri-icon x-lumno-link-button__icon ri-external-link-line" />
          </a>
        </div>
        <div className="x-nt-wallpaper-panel-scroll">
          <Section id="dg-pat-style" title={t("newtab_style_section_title")} open={open.style} onToggle={() => toggle("style")}>
            <div className="x-nt-appearance-setting-row">
              <span className="x-nt-appearance-setting-title-group">
                <span className="x-nt-appearance-setting-title">{t("settings_newtab_glass_style_title")}</span>
              </span>
              <Select
                className="x-nt-row-select"
                label={t("settings_newtab_glass_style_title")}
                value={glass}
                onChange={setGlass}
                items={[
                  { value: "none", label: t("settings_newtab_glass_style_none") },
                  { value: "frosted", label: t("settings_newtab_glass_style_frosted") },
                  { value: "liquid", label: t("settings_newtab_glass_style_liquid") },
                ]}
              />
            </div>
          </Section>
          <div className="x-nt-panel-divider" />
          <Section id="dg-pat-search" className="x-nt-search-section" title={t("newtab_search_section_title")} open={open.search} onToggle={() => toggle("search")}>
            <div className="x-nt-overlay-control x-nt-search-width-control" data-visible="true">
              <div className="x-range-slider-field x-nt-range-slider-row">
                <span className="x-range-slider-field-label">
                  <span className="x-nt-appearance-setting-title">{t("newtab_search_width_title")}</span>
                </span>
                <div className="x-range-slider-field-controls">
                  <div className="x-range-slider x-nt-overlay-slider-wrap x-nt-search-width-slider-wrap" data-disabled="false">
                    <input
                      className="x-range-slider-input x-nt-overlay-slider x-nt-search-width-slider"
                      type="range"
                      min={640}
                      max={1040}
                      step={1}
                      value={width}
                      aria-label={t("newtab_search_width_aria")}
                      aria-valuetext={`${width} px`}
                      onChange={(event) => setWidth(Number(event.target.value))}
                      style={{ "--x-range-slider-percent": `${percent}%`, "--x-range-slider-marks": marks } as CSSProperties}
                    />
                  </div>
                  <input
                    className="_x_extension_shortcut_input_2024_unique_ _x_extension_range_slider_value_input_2026_unique_"
                    type="number"
                    inputMode="numeric"
                    min={640}
                    max={1040}
                    value={width}
                    aria-label={t("newtab_search_width_aria")}
                    style={{ boxSizing: "border-box", flex: "0 0 auto", height: "var(--x-range-slider-value-height, 30px)", width: "var(--x-range-slider-value-width, 52px)" }}
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      if (Number.isFinite(next)) setWidth(Math.min(1040, Math.max(640, next)));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="x-nt-appearance-setting-row">
              <span className="x-nt-appearance-setting-title-group">
                <span className="x-nt-appearance-setting-title">{t("newtab_input_auto_focus_title")}</span>
              </span>
              <PanelSwitch label={t("newtab_input_auto_focus_title")} checked={autoFocus} onChange={setAutoFocus} />
            </div>
          </Section>
          <div className="x-nt-panel-divider" />
          <div className="x-nt-wallpaper-section">
            <div className="x-nt-shortcuts-accordion" data-enabled={shortcuts ? "true" : "false"} data-expanded={open.shortcuts ? "true" : "false"}>
              <div className="x-nt-wallpaper-panel-header x-nt-shortcuts-accordion-row">
                <button
                  type="button"
                  className="x-nt-section-trigger"
                  aria-expanded={open.shortcuts ? "true" : "false"}
                  aria-controls="dg-pat-shortcuts"
                  aria-label={t("settings_newtab_shortcuts_title")}
                  onClick={() => toggle("shortcuts")}
                >
                  <span className="x-nt-section-chevron" aria-hidden="true">
                    <i className="ri-icon ri-size-14 ri-arrow-right-s-line" aria-hidden="true" />
                  </span>
                  <span className="x-nt-wallpaper-panel-title">{t("settings_newtab_shortcuts_title")}</span>
                </button>
                <PanelSwitch label={t("settings_newtab_shortcuts_title")} checked={shortcuts} onChange={setShortcuts} />
              </div>
              <div className="x-nt-shortcuts-accordion-details x-nt-panel-collapsible" id="dg-pat-shortcuts" role="region" data-visible={open.shortcuts ? "true" : "false"} aria-hidden={!open.shortcuts}>
                <div className="x-nt-shortcuts-accordion-details-inner">
                  <div className="x-nt-appearance-setting-row">
                    <span className="x-nt-appearance-setting-title">{t("settings_newtab_shortcut_add_title")}</span>
                    <PanelSwitch label={t("settings_newtab_shortcut_add_title")} checked={plus} onChange={setPlus} />
                  </div>
                  <div className="x-nt-appearance-setting-row">
                    <span className="x-nt-appearance-setting-title">{t("settings_newtab_shortcut_dock_magnification_title")}</span>
                    <PanelSwitch label={t("settings_newtab_shortcut_dock_magnification_title")} checked={dock} onChange={setDock} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NtScope>
  );
}

/*
 * The icon refresh in the shortcut dialog (shortcut-dialog.tsx): the glyph
 * spins once the work has taken 240ms (shared/busy.css), then turns into a
 * check while the result's label wipes in and the button eases to its new
 * width; two seconds later it is "Refresh" again.
 */
const ICON_SITE = site("youtube");

export function RefreshCard({ copy }: { copy: Copy }) {
  const t = useExtensionText();
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [width, setWidth] = useState<number>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glyphRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  useLayoutEffect(() => {
    const button = buttonRef.current;
    const glyph = glyphRef.current;
    const label = labelRef.current;
    if (!button || !glyph || !label) return;
    const style = getComputedStyle(button);
    const spacing = [style.paddingLeft, style.paddingRight, style.borderLeftWidth, style.borderRightWidth, style.columnGap].reduce(
      (sum, value) => sum + (parseFloat(value) || 0),
      0,
    );
    setWidth(Math.ceil(glyph.offsetWidth + label.offsetWidth + spacing));
  }, [success, copy.refresh, copy.refreshSuccess]);

  const refresh = () => {
    if (busy) return;
    timers.current.forEach(window.clearTimeout);
    setSuccess(false);
    setBusy(true);
    timers.current = [
      window.setTimeout(() => {
        setBusy(false);
        setSuccess(true);
      }, 1300),
      window.setTimeout(() => setSuccess(false), 3300),
    ];
  };

  useCardDemo((t) => {
    t.at(0, () => {
      setBusy(false);
      setSuccess(false);
    });
    t.at(500, refresh);
    // Rests once the label has turned back, two seconds after the check.
    t.at(3900, () => undefined);
  });

  // The icon panel of the shortcut dialog (shortcut-dialog.tsx): the current icon on its plate, and the refresh button beside it.
  return (
    <NtScope className="dg-feedback">
      <div className="x-nt-shortcut-dialog-backdrop dg-pat-dialog-piece" data-open="true">
        <div className="x-nt-shortcut-dialog">
          <div className="x-nt-shortcut-icon-panel" role="group">
            <div className="x-nt-shortcut-icon-label-row">
              <span>{t("newtab_shortcuts_icon_current")}</span>
            </div>
            <div className="x-nt-shortcut-icon-control x-nt-shortcut-online-icon-control">
              <span className="x-nt-shortcut-online-icon-preview" data-icon-source="online" aria-busy={busy}>
                <span className="x-nt-shortcut-icon-plate-preview">
                  <img className="x-nt-shortcut-icon-preview-image" src={ICON_SITE.favicon} alt="" draggable={false} />
                </span>
              </span>
              <button
                ref={buttonRef}
                type="button"
                className="x-lumno-action-button x-lumno-action-button--secondary x-nt-shortcut-icon-refresh"
                aria-busy={busy}
                aria-label={busy ? copy.refreshing : undefined}
                data-success={success ? "true" : "false"}
                style={{ width }}
                onClick={refresh}
              >
                <span ref={glyphRef} className="x-nt-shortcut-icon-refresh-glyph x-lumno-busy-spin" aria-hidden="true">
                  <i className={`ri-icon ri-size-16 ${success ? "ri-check-line" : "ri-refresh-line"}`} />
                </span>
                <span ref={labelRef} className="x-nt-shortcut-icon-refresh-label" aria-live="polite">
                  {success ? copy.refreshSuccess : copy.refresh}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </NtScope>
  );
}

// Two pages each way: what was visited last, and what is visited most.
const RECENT_PAGES: Record<string, { pageTitle: string; address: string }> = {
  figma: { pageTitle: "Lumno – Components", address: "figma.com/design/lumno" },
  stackoverflow: { pageTitle: "Animating height: auto", address: "stackoverflow.com/questions" },
  github: { pageTitle: "kubai087/lumno-web", address: "github.com/kubai087/lumno-web" },
};
const RECENT: Record<"latest" | "most", Array<{ id: string }>> = {
  latest: [{ id: "figma" }, { id: "stackoverflow" }],
  most: [{ id: "github" }, { id: "figma" }],
};

/*
 * The recent sites' heading (recent-mode-switch.js): at rest it reads as the
 * current mode; pointed at, it unfolds into a switch with the other mode to its
 * right (100ms in, 200ms out), so the current name never moves under the
 * pointer. Switching reorders the sites below.
 */
export function ModeSwitchCard({ copy }: { copy: Copy }) {
  const t = useExtensionText();
  const [mode, setMode] = useState<"latest" | "most">("latest");
  const [expanded, setExpanded] = useState(false);
  const [lead, setLead] = useState<"latest" | "most">("latest");
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const optionRefs = useRef(new Map<string, HTMLButtonElement>());
  const labelRefs = useRef(new Map<string, HTMLSpanElement>());
  const switchRef = useRef<HTMLDivElement>(null);
  const timers = useRef({ expand: 0, collapse: 0, settle: 0 });
  const listRef = useRef<HTMLDivElement>(null);
  const tiles = useRef(new Map<string, HTMLElement>());
  const before = useRef<Map<string, DOMRect> | null>(null);

  const options: Array<{ value: "latest" | "most"; label: string }> = [
    { value: "latest", label: copy.modeLatest },
    { value: "most", label: copy.modeMost },
  ];
  // The current mode leads; the other follows. Reordered only while folded, where the move can't be seen.
  const ordered = [...options.filter((option) => option.value === lead), ...options.filter((option) => option.value !== lead)];

  const measure = () => {
    const control = switchRef.current;
    if (!control) return;
    const padX = parseFloat(getComputedStyle(control).getPropertyValue("--x-nt-recent-mode-pad-x")) || 0;
    optionRefs.current.forEach((button, value) => {
      const label = labelRefs.current.get(value);
      if (label) button.style.setProperty("--x-nt-recent-mode-option-width", `${Math.ceil(label.getBoundingClientRect().width + padX * 2)}px`);
    });
  };

  const place = () => {
    const indicator = indicatorRef.current;
    if (!indicator) return;
    const widths = ordered.map((option) => parseFloat(optionRefs.current.get(option.value)?.style.getPropertyValue("--x-nt-recent-mode-option-width") || "0"));
    const index = ordered.findIndex((option) => option.value === mode);
    indicator.style.width = `${widths[index]}px`;
    indicator.style.transform = `translateX(${widths.slice(0, index).reduce((sum, value) => sum + value, 0)}px)`;
  };

  useLayoutEffect(() => {
    measure();
    if (expanded) place();
  });

  const live = useRef({ mode });
  live.current = { mode };

  const setOpen = (next: boolean) => {
    window.clearTimeout(timers.current.settle);
    setExpanded(next);
    if (!next) timers.current.settle = window.setTimeout(() => setLead(live.current.mode), 240);
  };

  const choose = (value: "latest" | "most") => {
    if (value === mode) return;
    const rects = new Map<string, DOMRect>();
    tiles.current.forEach((tile, id) => rects.set(id, tile.getBoundingClientRect()));
    before.current = rects;
    setMode(value);
  };

  // The sites below reflow to the new order.
  useLayoutEffect(() => {
    const rects = before.current;
    if (!rects) return;
    before.current = null;
    tiles.current.forEach((tile, id) => {
      const from = rects.get(id);
      if (!from) return;
      const to = tile.getBoundingClientRect();
      tile.style.transition = "none";
      tile.style.transform = `translate(${from.left - to.left}px, ${from.top - to.top}px)`;
    });
    void listRef.current?.offsetHeight;
    tiles.current.forEach((tile) => {
      tile.style.transition = `transform 260ms ${EASE}`;
      tile.style.transform = "";
    });
  }, [mode]);

  useEffect(() => () => Object.values(timers.current).forEach(window.clearTimeout), []);

  useCardDemo((t) => {
    t.at(0, () => {
      setMode("latest");
      setLead("latest");
      setExpanded(false);
    });
    t.at(500, () => setOpen(true));
    t.at(1200, () => choose("most"));
    t.at(2100, () => setOpen(false));
    t.at(3000, () => setOpen(true));
    t.at(3600, () => choose("latest"));
    t.at(4400, () => setOpen(false));
  });

  return (
    <NtScope className="dg-pat-recent">
      <div className="x-nt-recent-header-bar">
      <div
        ref={switchRef}
        className="x-nt-recent-mode-switch"
        role="radiogroup"
        data-expanded={expanded ? "true" : "false"}
        onPointerEnter={(event) => {
          if (event.pointerType !== "mouse") return;
          window.clearTimeout(timers.current.collapse);
          timers.current.expand = window.setTimeout(() => setOpen(true), 100);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "mouse") return;
          window.clearTimeout(timers.current.expand);
          timers.current.collapse = window.setTimeout(() => setOpen(false), 200);
        }}
        onFocus={() => setOpen(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
        }}
      >
        <span className="x-nt-recent-mode-switch-indicator" aria-hidden="true" ref={indicatorRef} />
        {ordered.map((option) => (
          <button
            type="button"
            role="radio"
            className="x-nt-recent-mode-switch-option"
            aria-checked={option.value === mode ? "true" : "false"}
            ref={(node) => {
              if (node) optionRefs.current.set(option.value, node);
            }}
            onClick={() => {
              if (!expanded) {
                setOpen(true);
                return;
              }
              choose(option.value);
            }}
            key={option.value}
          >
            <span
              className="x-nt-recent-mode-switch-label"
              ref={(node) => {
                if (node) labelRefs.current.set(option.value, node);
              }}
            >
              {option.label}
            </span>
          </button>
        ))}
      </div>
      </div>
      <div className="_x_extension_newtab_recent_sites_grid_2024_unique_ dg-pat-recent__grid" ref={listRef}>
        {RECENT[mode].map(({ id }) => (
          <RecentCard
            item={site(id)}
            pageTitle={RECENT_PAGES[id].pageTitle}
            address={RECENT_PAGES[id].address}
            goLabel={t("action_go_current_tab")}
            pinLabel={t("recent_pin_add")}
            ref={(node: HTMLDivElement | null) => {
              if (node) tiles.current.set(id, node);
              else tiles.current.delete(id);
            }}
            key={id}
          />
        ))}
      </div>
    </NtScope>
  );
}

const RESULTS = ["figma", "dribbble", "material", "apple-hig"].map(site);

/** A result row in the overlay, themed from its site's favicon. */
function NumberRow({ item, index, active, hovering, query, onEnter, onLeave, onPick }: { item: ReturnType<typeof site>; index: number; active: boolean; hovering: boolean; query: string; onEnter: () => void; onLeave: () => void; onPick: () => void }) {
  const t = useExtensionText();
  const theme = useSiteTheme({ url: item.url, image: item.favicon });
  return (
    <SuggestionRow
      index={index}
      last={index === RESULTS.length - 1}
      theme={theme}
      active={active}
      hovering={hovering}
      favicon={item.favicon}
      title={<Marked text={item.title} mark={query} />}
      detail={<Marked text={item.url.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")} mark={query} />}
      detailKind="url"
      source="history"
      action={t("action_open_new_tab")}
      onEnter={onEnter}
      onLeave={onLeave}
      onClick={onPick}
    />
  );
}

/*
 * Number keys on the search results (shared/suggestion-navigation.js): hold the
 * primary modifier for 400ms (a toast says to let go), release, and each of the
 * first ten rows shows its digit, from 0, for two seconds; pressing one opens
 * that row.
 */
export function NumberKeysCard({ copy, query }: { copy: Copy; query: string }) {
  const toast = useToast();
  const [mac, setMac] = useState(true);
  const [active, setActive] = useState(false);
  const [held, setHeld] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [hover, setHover] = useState(0);
  const [pointer, setPointer] = useState(-1);
  const t = useExtensionText();
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef({ hold: 0, active: 0, pick: 0 });
  const state = useRef({ phase: "idle" as "idle" | "holding" | "armed" | "active" });

  useEffect(() => {
    setMac(document.documentElement.dataset.platform !== "other");
  }, []);

  const clearAll = () => Object.values(timers.current).forEach(window.clearTimeout);

  const holdStart = () => {
    clearAll();
    state.current.phase = "holding";
    setActive(false);
    setHeld(true);
    timers.current.hold = window.setTimeout(() => {
      state.current.phase = "armed";
      toast.setToast({ text: t("search_number_jump_release_hint"), loading: false });
      toast.setShown(true);
    }, 400);
  };

  const holdEnd = () => {
    setHeld(false);
    const armed = state.current.phase === "armed";
    window.clearTimeout(timers.current.hold);
    toast.setShown(false);
    if (!armed) {
      state.current.phase = "idle";
      return;
    }
    state.current.phase = "active";
    setActive(true);
    timers.current.active = window.setTimeout(() => {
      state.current.phase = "idle";
      setActive(false);
    }, 2000);
  };

  const pick = (index: number) => {
    clearAll();
    state.current.phase = "idle";
    setActive(false);
    setHover(index);
    setPicked(index);
    timers.current.pick = window.setTimeout(() => setPicked(null), 700);
  };

  // Keys count while the pointer is over the card or focus is in it, so they never reach the rest of the page.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const engaged = () => root.matches(":hover") || root.contains(document.activeElement);
    const primary = (event: KeyboardEvent) => (mac ? event.key === "Meta" : event.key === "Control");
    const onDown = (event: KeyboardEvent) => {
      if (!engaged()) return;
      if (primary(event) && !event.repeat) {
        holdStart();
        return;
      }
      if (state.current.phase === "active" && /^[0-9]$/.test(event.key)) {
        const index = Number(event.key);
        if (index < RESULTS.length) {
          event.preventDefault();
          pick(index);
        }
        return;
      }
      if (state.current.phase !== "idle") {
        clearAll();
        state.current.phase = "idle";
        setActive(false);
        toast.setShown(false);
      }
    };
    const onUp = (event: KeyboardEvent) => {
      if (primary(event) && state.current.phase !== "idle") holdEnd();
    };
    const onBlur = () => {
      clearAll();
      state.current.phase = "idle";
      setHeld(false);
      setActive(false);
      toast.setShown(false);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [mac]);

  useEffect(() => clearAll, []);

  useCardDemo((t) => {
    t.at(0, () => {
      setHover(0);
      setPicked(null);
    });
    t.at(500, holdStart);
    t.at(1400, holdEnd);
    t.at(2300, () => pick(2));
    t.at(3400, () => setHover(0));
    t.onStop(() => {
      clearAll();
      state.current.phase = "idle";
      setHeld(false);
      setActive(false);
      toast.setShown(false);
    });
  });

  const modifier = mac ? "⌘" : "Ctrl";
  return (
    <div className="dg-feedback dg-pat-numbers" ref={rootRef} tabIndex={-1}>
      {toast.node}
      {/* The command bar (overlay), whose results take the same number keys as the new tab's. */}
      <OverlayStage>
        <OverlayPanel>
          <OverlayInput value={query} placeholder={t("overlay_search_placeholder")} collapsed={false} />
          <OverlaySuggestions collapsed={false} numberKeys={active}>
            {RESULTS.map((item, index) => (
              <NumberRow
                item={item}
                index={index}
                active={hover === index}
                hovering={pointer === index || picked === index}
                query={query}
                onEnter={() => setPointer(index)}
                onLeave={() => setPointer(-1)}
                onPick={() => pick(index)}
                key={item.id}
              />
            ))}
          </OverlaySuggestions>
        </OverlayPanel>
        <kbd className="dg-pat-modifier" data-held={held ? "true" : "false"}>
          {modifier}
        </kbd>
      </OverlayStage>
    </div>
  );
}
