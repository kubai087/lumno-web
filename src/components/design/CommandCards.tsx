import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { HomeContent } from "../../lib/home-content";
import type { DesignDemoCopy } from "../../lib/design-content";
import { glyph } from "../../lib/overlay-theme";
import { useCardDemo, type Timeline } from "./demo";
import { useExtensionText } from "./ext-strings";
import SelectionIcons from "./extension/selection-action-icons.js";
import { useDesignTheme } from "./theme";
import { OVERLAY_PROVIDERS } from "./extension/overlay-providers";
import {
  Marked,
  OverlayInput,
  OverlayPanel,
  OverlayStage,
  OverlaySuggestions,
  ScopeMenu,
  SuggestionRow,
  scopeKeys,
  tileUrl,
  useProviderName,
  useSiteTheme,
  type SourceKind,
} from "./Overlay";

/*
 * The command bar, live, in the extension's own overlay markup and CSS
 * (Overlay.tsx): visitors type, arrow through rows, press Tab into a site's
 * search and open the scope menu, and the panel answers as Lumno's does.
 */

type CommandContent = HomeContent["commandBar"];

/** Types `text` one character at a time from `start`; returns when it finishes. */
function typeInto(t: Timeline, set: (value: string) => void, text: string, start: number, step = 130) {
  const characters = Array.from(text);
  characters.forEach((_, index) => t.at(start + (index + 1) * step, () => set(characters.slice(0, index + 1).join(""))));
  return start + characters.length * step;
}

/** A message with its {query} marked, as the overlay renders 搜索 "…" rows. */
function QueryTitle({ template, query }: { template: string; query: string }) {
  const [before, after = ""] = template.split("{query}");
  return (
    <>
      {before}
      <mark className="x-ov-suggestion-mark">{query}</mark>
      {after}
    </>
  );
}

/** Arrow keys move the active row, wrapping as the overlay does; hover marks the row under the pointer. */
function useRowKeys(count: number) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(-1);
  useEffect(() => {
    if (active >= count) setActive(0);
  }, [active, count]);
  const onKeyDown = (event: KeyboardEvent) => {
    if (!count || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return false;
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : -1;
    setActive((index) => (index + step + count) % count);
    return true;
  };
  return { active: Math.min(active, Math.max(0, count - 1)), setActive, hovering, setHovering, onKeyDown };
}

const siteUrl = (key: string) => `https://${OVERLAY_PROVIDERS[key]?.host || `${key}.com`}/`;

type ResultRow = { key: string; icon: string; title: string; detail: string; kind: SourceKind };

/** A history, bookmark or open-tab row, themed from its site. */
function SiteRow({ row, index, last, active, hovering, mark, keys }: { row: ResultRow; index: number; last: boolean; active: boolean; hovering: boolean; mark: string; keys: ReturnType<typeof useRowKeys> }) {
  const t = useExtensionText();
  const theme = useSiteTheme({ url: siteUrl(row.icon), image: glyph(row.icon) });
  return (
    <SuggestionRow
      index={index}
      last={last}
      theme={theme}
      active={active}
      hovering={hovering}
      favicon={glyph(row.icon)}
      title={<Marked text={row.title} mark={mark} />}
      detail={row.kind === "bookmark" ? row.detail : <Marked text={row.detail} mark={mark} />}
      detailKind={row.kind === "bookmark" ? "path" : "url"}
      source={row.kind}
      action={row.kind === "tab" ? t("action_switch") : t("action_open_new_tab")}
      onEnter={() => keys.setHovering(index)}
      onLeave={() => keys.setHovering(-1)}
      onClick={() => keys.setActive(index)}
    />
  );
}

/** The 搜索 "…" row: the default engine's search, neutral until chosen. */
function SearchRow({ query, index, last, active, hovering, keys }: { query: string; index: number; last: boolean; active: boolean; hovering: boolean; keys: ReturnType<typeof useRowKeys> }) {
  const t = useExtensionText();
  const theme = useSiteTheme({});
  return (
    <SuggestionRow
      index={index}
      last={last}
      theme={theme}
      active={active}
      hovering={hovering}
      icon="ri-search-line"
      title={<QueryTitle template={t("search_query")} query={query} />}
      action={t("action_search")}
      onEnter={() => keys.setHovering(index)}
      onLeave={() => keys.setHovering(-1)}
      onClick={() => keys.setActive(index)}
    />
  );
}

/** A provider's own row inside its scope: 在 GitHub 中搜索 "…" or 向 DeepSeek 提问 "…". */
function ScopeRow({ provider, query, active, onEnter, onLeave, hovering }: { provider: string; query: string; active: boolean; hovering: boolean; onEnter?: () => void; onLeave?: () => void }) {
  const t = useExtensionText();
  const name = useProviderName();
  const theme = useSiteTheme({ provider });
  const ai = OVERLAY_PROVIDERS[provider]?.group === "ai";
  return (
    <SuggestionRow
      index={0}
      last
      theme={theme}
      active={active}
      hovering={hovering}
      favicon={tileUrl(provider)}
      title={<QueryTitle template={t(ai ? "ask_ai_provider_query" : "search_in_site_query", { site: name(provider) })} query={query} />}
      action={t("action_search")}
      onEnter={onEnter}
      onLeave={onLeave}
    />
  );
}

export function CommandBarCard({ content }: { content: CommandContent }) {
  const t = useExtensionText();
  const { search } = content;
  const [query, setQuery] = useState(search.query);
  const trimmed = query.trim();
  const needle = trimmed.toLowerCase();
  const typedAll = trimmed === search.query;
  const results: ResultRow[] = (typedAll ? search.results : search.results.filter((result) => `${result.title} ${result.detail}`.toLowerCase().includes(needle))).map(
    (result) => ({ key: result.title, icon: result.icon, title: result.title, detail: result.detail, kind: result.kind }),
  );
  const mark = typedAll ? search.mark : trimmed;
  // The best match leads, the search row follows, then the rest (as the overlay ranks them).
  const order: Array<ResultRow | "search"> = trimmed ? (results.length ? [results[0], "search", ...results.slice(1)] : ["search"]) : [];
  const keys = useRowKeys(order.length);

  useCardDemo((timeline) => {
    timeline.at(0, () => {
      setQuery("");
      keys.setActive(0);
    });
    const typed = typeInto(timeline, setQuery, search.query, 300, 150);
    [1, 2, 3, 0].forEach((row, step) => timeline.at(typed + 600 + step * 500, () => keys.setActive(row)));
  });

  return (
    <OverlayStage>
      <OverlayPanel>
        <OverlayInput
          value={query}
          placeholder={t("overlay_search_placeholder")}
          collapsed={!order.length}
          onChange={(value) => {
            setQuery(value);
            keys.setActive(0);
          }}
          onKeyDown={keys.onKeyDown}
        />
        <OverlaySuggestions collapsed={!order.length}>
          {order.map((row, index) =>
            row === "search" ? (
              <SearchRow query={trimmed} index={index} last={index === order.length - 1} active={index === keys.active} hovering={index === keys.hovering} keys={keys} key="search" />
            ) : (
              <SiteRow row={row} index={index} last={index === order.length - 1} active={index === keys.active} hovering={index === keys.hovering} mark={mark} keys={keys} key={row.key} />
            ),
          )}
        </OverlaySuggestions>
      </OverlayPanel>
    </OverlayStage>
  );
}

export function SiteSearchCard({ content }: { content: CommandContent }) {
  const t = useExtensionText();
  const name = useProviderName();
  const { siteSearch } = content;
  const [scope, setScope] = useState<string | null>(null);
  const [query, setQuery] = useState(siteSearch.keyword);
  const [hovering, setHovering] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmed = query.trim();
  const candidate = !scope && OVERLAY_PROVIDERS[trimmed.toLowerCase()] ? trimmed.toLowerCase() : null;
  const scopeTheme = useSiteTheme({ provider: scope || siteSearch.keyword });
  const keys = useRowKeys(scope ? (trimmed ? 1 : 0) : trimmed ? 2 : 0);

  // Types the keyword, takes the Tab hint, searches inside the site, then rests on the hint again.
  useCardDemo((timeline) => {
    timeline.at(0, () => {
      setScope(null);
      setQuery("");
    });
    const typed = typeInto(timeline, setQuery, siteSearch.keyword, 300, 180);
    timeline.at(typed + 900, () => {
      setScope(siteSearch.keyword);
      setQuery("");
    });
    const searched = typeInto(timeline, setQuery, siteSearch.query, typed + 1500, 140);
    timeline.at(searched + 1800, () => {
      setScope(null);
      setQuery(siteSearch.keyword);
    });
  });

  const enterScope = () => {
    if (!candidate) return;
    setScope(candidate);
    setQuery("");
    inputRef.current?.focus();
  };

  const collapsed = !trimmed;
  return (
    <OverlayStage className="dg-ovl-stage--middle">
      <OverlayPanel>
        <OverlayInput
          inputRef={inputRef}
          value={query}
          placeholder={scope ? t("search_scope_active_placeholder") : t("overlay_search_placeholder")}
          collapsed={collapsed}
          prefix={scope ? { key: scope, name: name(scope), theme: scopeTheme } : null}
          tabHint={candidate ? t("site_search_tab_hint", { site: name(candidate) }) : null}
          onChange={setQuery}
          onKeyDown={(event) => {
            if (event.key === "Tab" && candidate) {
              event.preventDefault();
              enterScope();
              return;
            }
            if (event.key === "Backspace" && scope && !query) {
              event.preventDefault();
              setQuery(scope);
              setScope(null);
              return;
            }
            keys.onKeyDown(event);
          }}
        />
        <OverlaySuggestions collapsed={collapsed}>
          {scope && trimmed ? (
            <ScopeRow provider={scope} query={trimmed} active hovering={hovering === 0} onEnter={() => setHovering(0)} onLeave={() => setHovering(-1)} />
          ) : null}
          {!scope && trimmed ? (
            <>
              <CandidateRow keyword={trimmed} provider={candidate} active={keys.active === 0} hovering={keys.hovering === 0} keys={keys} />
              <SearchRow query={trimmed} index={1} last active={keys.active === 1} hovering={keys.hovering === 1} keys={keys} />
            </>
          ) : null}
        </OverlaySuggestions>
      </OverlayPanel>
    </OverlayStage>
  );
}

/** While the keyword is typed, the site it names is the first row (its home page, from history). */
function CandidateRow({ keyword, provider, active, hovering, keys }: { keyword: string; provider: string | null; active: boolean; hovering: boolean; keys: ReturnType<typeof useRowKeys> }) {
  if (!provider) return <SearchRow query={keyword} index={0} last={false} active={active} hovering={hovering} keys={keys} />;
  const host = OVERLAY_PROVIDERS[provider].host;
  return (
    <SiteRow
      row={{ key: provider, icon: provider, title: OVERLAY_PROVIDERS[provider].name, detail: host, kind: "history" }}
      index={0}
      last={false}
      active={active}
      hovering={hovering}
      mark={keyword}
      keys={keys}
    />
  );
}

export function ScopeMenuCard({ content }: { content: CommandContent }) {
  const t = useExtensionText();
  const name = useProviderName();
  const { ai } = content;
  const ais = scopeKeys("ai");
  const home = ai.providers[ai.pick]?.key || "ds";
  const [picked, setPicked] = useState(home);
  const [focused, setFocused] = useState(home);
  // Open at rest, so the card shows the menu; choosing a scope closes it onto that scope's row.
  const [menuOpen, setMenuOpen] = useState(true);
  const [prompt, setPrompt] = useState(ai.prompt);
  const inputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState<number>();
  const theme = useSiteTheme({ provider: picked });
  const trimmed = prompt.trim();

  // The menu takes the room left under the input, as the extension sizes it to the window.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const fit = stage.querySelector<HTMLElement>(".dg-ovl-fit");
      const scale = fit ? fit.getBoundingClientRect().width / fit.offsetWidth || 1 : 1;
      setRoom(Math.max(160, stage.clientHeight / scale - 56 - 14 - 4));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Walks two AI tiles along, picks one (the menu closes onto its row), then reopens.
  useCardDemo((timeline) => {
    const start = ais.indexOf(home);
    const step = (offset: number) => ais[Math.min(ais.length - 1, Math.max(0, start + offset))];
    timeline.at(0, () => {
      setMenuOpen(true);
      setPicked(home);
      setFocused(home);
    });
    timeline.at(700, () => setFocused(step(1)));
    timeline.at(1200, () => setFocused(step(2)));
    timeline.at(1800, () => {
      setPicked(step(2));
      setMenuOpen(false);
    });
    timeline.at(3800, () => {
      setFocused(home);
      setPicked(home);
      setMenuOpen(true);
    });
  });

  const choose = useCallback((key: string) => {
    setPicked(key);
    setFocused(key);
    setMenuOpen(false);
    inputRef.current?.focus();
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab" && !event.shiftKey) {
      event.preventDefault();
      setFocused(picked);
      setMenuOpen((open) => !open);
      return;
    }
    if (!menuOpen) return;
    const columns = Math.max(1, Math.round((stageRef.current?.querySelector(".x-lumno-search-input-mode__menu-content")?.clientWidth || 600) / 82));
    const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: columns, ArrowUp: -columns };
    if (event.key in moves) {
      event.preventDefault();
      const index = ais.indexOf(focused);
      setFocused(ais[Math.min(ais.length - 1, Math.max(0, index + moves[event.key]))]);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      choose(focused);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setMenuOpen(false);
    }
  };

  const collapsed = menuOpen || !trimmed;
  // The menu sits below any results (syncSearchModeMenuResultOffset), so a closing menu never covers the row.
  const resultsRef = useRef<HTMLDivElement>(null);
  const [resultOffset, setResultOffset] = useState(0);
  useLayoutEffect(() => setResultOffset(collapsed ? 0 : resultsRef.current?.offsetHeight || 0), [collapsed]);
  return (
    <OverlayStage stageRef={stageRef}>
      <OverlayPanel>
        <OverlayInput
          inputRef={inputRef}
          value={prompt}
          placeholder={t("search_scope_active_placeholder")}
          collapsed={collapsed}
          prefix={{
            key: picked,
            name: name(picked),
            theme,
            current: menuOpen,
            menuOpen,
            onClick: () => {
              setFocused(picked);
              setMenuOpen((open) => !open);
            },
          }}
          onChange={setPrompt}
          onKeyDown={onKeyDown}
          menu={<ScopeMenu open={menuOpen} checked={picked} focused={focused} onFocus={setFocused} onPick={choose} viewportMaxHeight={room} resultOffset={resultOffset} />}
        />
        <OverlaySuggestions collapsed={collapsed} containerRef={resultsRef}>
          {!collapsed ? <ScopeRow provider={picked} query={trimmed} active hovering={false} /> : null}
        </OverlaySuggestions>
      </OverlayPanel>
    </OverlayStage>
  );
}

/*
 * Selection quick actions (content/selection-quick-actions.js), in its own
 * markup and shadow stylesheet (extension/selection-quick-actions.css):
 * selecting text puts the Lumno mark at the end of the selection; clicking it
 * opens the toolbar from the mark, actions first and the mark last. Placement
 * follows positionSurface; the opening follows animateToolbarEntrance. The
 * first phrase starts selected, so the card shows the mark at rest.
 */

// The extension's fallback order for a term: explain, research, translate (getToolbarActions).
const SELECTION_ACTIONS = ["explain", "search", "translate"] as const;
type SelectionAction = (typeof SELECTION_ACTIONS)[number];
const ACTION_LABEL = { explain: "selection_quick_action_explain", search: "selection_quick_action_search", translate: "selection_quick_action_translate" } as const;
const SAFE_MARGIN = 12;

type Anchor = { left: number; right: number; top: number; bottom: number };
type SelectionPhase = "none" | "mark" | "toolbar";

function ActionIcon({ action }: { action: SelectionAction }) {
  const icon = SelectionIcons.remix[action];
  return <svg className="lumno-selection-action-icon" aria-hidden="true" focusable="false" viewBox={icon.viewBox} dangerouslySetInnerHTML={{ __html: icon.body }} />;
}

export function SelectionCard({ copy }: { copy: DesignDemoCopy["selection"] }) {
  const t = useExtensionText();
  const { resolved } = useDesignTheme();
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const seededRef = useRef<HTMLSpanElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLButtonElement>(null);
  const [seeded, setSeeded] = useState(true);
  const [phase, setPhase] = useState<SelectionPhase>("mark");
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [demoHover, setDemoHover] = useState<SelectionAction | null>(null);
  const markOrigin = useRef<{ left: number; top: number; height: number } | null>(null);
  const resetTimer = useRef(0);
  const [before, phrase, after] = copy.paragraph;

  /** The last line box of the selection, relative to the card. */
  const anchorFor = useCallback((rects: DOMRectList | DOMRect[]) => {
    const stage = stageRef.current;
    const last = rects[rects.length - 1];
    if (!stage || !last) return null;
    const base = stage.getBoundingClientRect();
    return { left: last.left - base.left, right: last.right - base.left, top: last.top - base.top, bottom: last.bottom - base.top };
  }, []);

  const placeSeed = useCallback(() => {
    if (seededRef.current) setAnchor(anchorFor(seededRef.current.getClientRects()));
  }, [anchorFor]);

  useLayoutEffect(() => {
    if (!seeded) return;
    placeSeed();
    const observer = new ResizeObserver(placeSeed);
    if (stageRef.current) observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [seeded, placeSeed]);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  // renderCandidate shows the host hidden, then visible on the next frame (its opacity and scale transition).
  useEffect(() => {
    if (phase === "none") {
      setVisible(false);
      return;
    }
    if (phase === "toolbar") return;
    setVisible(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [phase, anchor]);

  /*
   * positionSurface: the mark sits 2px past the end of the selection, raised
   * 4–7px; the toolbar starts at the mark's left edge, centred on it. Both stay
   * 12px inside the card, as the extension keeps them inside the window.
   */
  useLayoutEffect(() => {
    const host = hostRef.current;
    const stage = stageRef.current;
    const surface = surfaceRef.current;
    if (!host || !stage || !surface || !anchor || phase === "none") return;
    const bounds = surface.getBoundingClientRect();
    const maxLeft = stage.clientWidth - SAFE_MARGIN - bounds.width;
    const maxTop = stage.clientHeight - SAFE_MARGIN - bounds.height;
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));
    let left: number;
    let top: number;
    if (phase === "toolbar" && markOrigin.current) {
      const origin = markOrigin.current;
      left = clamp(origin.left, SAFE_MARGIN, maxLeft);
      top = clamp(origin.top + origin.height / 2 - bounds.height / 2, SAFE_MARGIN, maxTop);
    } else {
      left = anchor.right + 2;
      top = anchor.top - Math.max(4, Math.min(7, bounds.height * 0.4));
      if (left + bounds.width > stage.clientWidth - SAFE_MARGIN) {
        const leftCandidate = anchor.left - bounds.width - 2;
        if (leftCandidate >= SAFE_MARGIN) left = leftCandidate;
        else {
          left = anchor.right - bounds.width;
          top = anchor.bottom + 2;
        }
      }
      left = clamp(left, SAFE_MARGIN, maxLeft);
      top = clamp(top, SAFE_MARGIN, maxTop);
    }
    host.style.left = `${left}px`;
    host.style.top = `${top}px`;
  }, [anchor, phase]);

  // animateToolbarEntrance: the material and content widen from the mark, the actions slide in.
  useLayoutEffect(() => {
    if (phase !== "toolbar") return;
    const surface = surfaceRef.current;
    const material = surface?.querySelector<HTMLElement>(".lumno-selection-material");
    const content = surface?.querySelector<HTMLElement>(".lumno-selection-content");
    const menu = surface?.querySelector<HTMLElement>(".lumno-selection-toolbar");
    if (!surface || !material || !content || !menu || typeof surface.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const width = surface.getBoundingClientRect().width;
    const contentWidth = content.getBoundingClientRect().width || width - 8;
    const offset = Math.max(6, Math.min(10, width * 0.04));
    const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
    const animations = [
      material.animate([{ width: "0px" }, { width: `${width}px` }], { duration: 240, easing: ease, fill: "both" }),
      content.animate([{ width: "0px" }, { width: `${contentWidth}px` }], { duration: 260, delay: 20, easing: ease, fill: "both" }),
      menu.animate([{ transform: `translateX(-${offset}px)`, opacity: 0.72 }, { transform: "translateX(0px)", opacity: 1 }], { duration: 280, delay: 30, easing: ease, fill: "both" }),
    ];
    const cleanup = window.setTimeout(() => animations.forEach((animation) => animation.cancel()), 420);
    return () => {
      window.clearTimeout(cleanup);
      animations.forEach((animation) => animation.cancel());
    };
  }, [phase]);

  const openToolbar = () => {
    const host = hostRef.current;
    const mark = markRef.current;
    const stage = stageRef.current;
    if (host && mark && stage) {
      const base = stage.getBoundingClientRect();
      const rect = mark.getBoundingClientRect();
      markOrigin.current = { left: rect.left - base.left, top: rect.top - base.top, height: rect.height };
    }
    setPhase("toolbar");
  };

  const readSelection = () => {
    const selection = window.getSelection();
    const text = textRef.current;
    if (!selection || !text || selection.isCollapsed || !selection.toString().trim()) {
      if (!seeded) setPhase("none");
      return;
    }
    const range = selection.getRangeAt(0);
    if (!text.contains(range.commonAncestorContainer)) return;
    setSeeded(false);
    setAnchor(anchorFor(range.getClientRects()));
    setPhase("mark");
  };

  // The mark opens into the toolbar, an action is pointed at, and the frame comes back.
  useCardDemo((timeline) => {
    timeline.at(0, () => {
      window.clearTimeout(resetTimer.current);
      setSeeded(true);
      setPhase("mark");
      setDemoHover(null);
    });
    timeline.at(800, openToolbar);
    timeline.at(1400, () => setDemoHover("explain"));
    timeline.at(1850, () => setDemoHover("search"));
    timeline.at(2500, () => {
      setDemoHover(null);
      setPhase("none");
    });
    timeline.at(3100, () => setPhase("mark"));
    timeline.onStop(() => setDemoHover(null));
  });

  const finish = () => {
    setPhase("none");
    window.getSelection()?.removeAllRanges();
    window.clearTimeout(resetTimer.current);
    // Back to the opening frame, so the card never stays empty.
    resetTimer.current = window.setTimeout(() => {
      setSeeded(true);
      setPhase("mark");
    }, 1400);
  };

  const iconOnly = phase !== "toolbar";
  return (
    <div className="dg-selection" ref={stageRef}>
      <p
        className="dg-selection__text"
        ref={textRef}
        onPointerDown={() => {
          window.clearTimeout(resetTimer.current);
          if (seeded) setSeeded(false);
          setPhase("none");
        }}
        onPointerUp={() => window.setTimeout(readSelection, 0)}
        onKeyUp={readSelection}
      >
        {before}
        <span ref={seededRef} className="dg-selection__seed" data-seeded={seeded}>
          {phrase}
        </span>
        {after}
      </p>
      {anchor ? (
        <div
          className="dg-sqa-host"
          ref={hostRef}
          hidden={phase === "none"}
          data-visible={visible || phase === "toolbar" ? "true" : "false"}
          data-entry-contrast={resolved}
          data-icon-set="remix"
          data-selection-mark="lumno"
          style={{ colorScheme: resolved }}
        >
          <div className="lumno-selection-surface" role="group" data-icon-only={iconOnly ? "true" : "false"} ref={surfaceRef} onPointerDown={(event) => event.preventDefault()}>
            <span className="lumno-selection-material" aria-hidden="true" />
            <div className="lumno-selection-content">
              <div className="lumno-selection-actions-viewport" hidden={iconOnly}>
                <div className="lumno-selection-toolbar" tabIndex={-1} hidden={iconOnly} role="toolbar" aria-label={t("selection_quick_action_open_menu")}>
                  {iconOnly
                    ? null
                    : SELECTION_ACTIONS.map((action) => (
                        <button type="button" data-intent={action} data-dg-hover={demoHover === action ? "true" : undefined} onClick={finish} key={action}>
                          <ActionIcon action={action} />
                          <span className="lumno-selection-action-label">{t(ACTION_LABEL[action])}</span>
                        </button>
                      ))}
                </div>
              </div>
              <span className="lumno-selection-primary-divider" hidden={iconOnly} aria-hidden="true" />
              <button
                type="button"
                ref={markRef}
                className="lumno-selection-main"
                aria-controls="lumno-selection-toolbar"
                aria-expanded={iconOnly ? "false" : "true"}
                data-icon-only={iconOnly ? "true" : "false"}
                aria-label={iconOnly ? t("selection_quick_action_open_menu") : t("settings_tab_labs")}
                onClick={() => (iconOnly ? openToolbar() : finish())}
              >
                <img className="lumno-selection-logo" alt="" src="/assets/design/lumno-selection-mark.svg" />
                <span className="lumno-selection-label">{t(ACTION_LABEL.explain)}</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
