import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui/terminal";
import { isPhone } from "@/scripts/home-phone";

import "./open-source-art.css";

/**
 * Illustrations for the open source cards. Like the other homepage demos they
 * play once when first seen, and hovering the card replays them: the replay
 * remounts the animated part, so each one starts from scratch. Phones
 * (home-phone) have no hover, so there coming back into view or a tap
 * replays instead.
 */
function useReplay(anchor: RefObject<HTMLElement | null>) {
  const [run, setRun] = useState(0);
  const inView = useInView(anchor, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const target = anchor.current;
    const card = target?.closest<HTMLElement>("[data-os-card]");
    if (!target || !card || reduceMotion) return;
    // Only replay once the first run has had time to finish.
    let lastStart = performance.now();
    const replay = () => {
      if (performance.now() - lastStart < 1600) return;
      lastStart = performance.now();
      setRun((value) => value + 1);
    };

    // Only a mouse: a finger that starts a scroll on the card enters it too.
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") replay();
    };
    const onTap = () => {
      if (isPhone()) replay();
    };
    // The first entry is the first run (useInView above); later ones replay.
    let seen = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (seen && isPhone()) replay();
        seen = true;
      },
      { threshold: 0.4 },
    );
    observer.observe(target);
    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("click", onTap);
    return () => {
      observer.disconnect();
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("click", onTap);
    };
  }, [anchor, reduceMotion]);

  return { run, inView, reduceMotion: Boolean(reduceMotion) };
}

type DataId = "history" | "bookmarks" | "searches" | "usage" | "location";

const DATA_ITEMS: Array<{ id: DataId; icon: string }> = [
  { id: "history", icon: "ri-history-line" },
  { id: "bookmarks", icon: "ri-bookmark-line" },
  { id: "searches", icon: "ri-search-line" },
  { id: "usage", icon: "ri-bar-chart-2-line" },
  { id: "location", icon: "ri-map-pin-line" },
];

interface PrivacyListArtProps {
  title: string;
  status: string;
  items: Record<DataId, string>;
}

/**
 * The questions a store privacy disclosure asks, answered one by one: each
 * kind of data is struck through and marked as not collected.
 */
export function PrivacyListArt({ title, status, items }: PrivacyListArtProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const { run, inView, reduceMotion } = useReplay(anchorRef);
  const state = reduceMotion ? "done" : inView ? "run" : "idle";

  return (
    <div className="osa-window" ref={anchorRef}>
      <div className="osa-window__bar">
        <span className="osa-window__dots"><span /><span /><span /></span>
        <span className="osa-window__title">
          <i className="ri-shield-check-line" aria-hidden="true" />
          {title}
        </span>
      </div>
      <ul key={run} className="osa-data" data-state={state}>
        {DATA_ITEMS.map(({ id, icon }, index) => (
          <li key={id} style={{ "--i": index } as CSSProperties}>
            <i className={icon} aria-hidden="true" />
            <span className="osa-data__name">{items[id]}</span>
            <span className="osa-data__status">
              <i className="ri-close-circle-line" aria-hidden="true" />
              {status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type ChannelId = "browser" | "webdav" | "file";

const CHANNELS: Array<{ id: ChannelId; icon: string }> = [
  { id: "browser", icon: "ri-refresh-line" },
  { id: "webdav", icon: "ri-hard-drive-3-line" },
  { id: "file", icon: "ri-download-2-line" },
];

interface SyncFileArtProps {
  channels: Record<ChannelId, string>;
}

/**
 * One settings file, three ways to carry it: browser sync, WebDAV and an
 * exported file, listed side by side under the file.
 */
export function SyncFileArt({ channels }: SyncFileArtProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const { run, inView, reduceMotion } = useReplay(anchorRef);
  const state = reduceMotion ? "done" : inView ? "run" : "idle";

  return (
    <div className="osa-window" ref={anchorRef}>
      <div className="osa-window__bar">
        <span className="osa-window__dots"><span /><span /><span /></span>
        <span className="osa-window__title">lumno-settings.json</span>
      </div>
      <pre className="osa-json">
        <code>
          <span>{"{"}</span>
          <span>  <b>"theme"</b>: "system",</span>
          <span>  <b>"shortcuts"</b>: [ … ],</span>
          <span>  <b>"wallpaper"</b>: "bing-daily"</span>
          <span>{"}"}</span>
        </code>
      </pre>
      <ul key={run} className="osa-sync" data-state={state}>
        {CHANNELS.map(({ id, icon }, index) => (
          <li key={id} style={{ "--i": index } as CSSProperties}>
            <i className={icon} aria-hidden="true" />
            {channels[id]}
          </li>
        ))}
      </ul>
    </div>
  );
}

const CLONE_COMMAND = "$ gh repo clone kubai087/lumno-extension";
const LICENSE_COMMAND = "$ head -n 2 LICENSE";
const OUTPUT = {
  clone: "Cloning into 'lumno-extension'...",
  license: "GNU GENERAL PUBLIC LICENSE",
  version: "Version 3, 29 June 2007",
};

/** Clone the repo and read its licence: MagicUI's Terminal, typed once. */
export function SourceTerminalArt() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const { run, reduceMotion } = useReplay(anchorRef);

  if (reduceMotion) {
    return (
      <div className="osa-terminal-anchor" ref={anchorRef}>
        <div className="osa-terminal">
          <div className="osa-terminal__bar"><span /><span /><span /></div>
          <pre>
            <code>
              <span className="osa-terminal__cmd">{CLONE_COMMAND}</span>
              <span className="osa-terminal__out">{OUTPUT.clone}</span>
              <span className="osa-terminal__cmd">{LICENSE_COMMAND}</span>
              <span className="osa-terminal__out osa-terminal__out--strong">{OUTPUT.license}</span>
              <span className="osa-terminal__out">{OUTPUT.version}</span>
            </code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="osa-terminal-anchor" ref={anchorRef}>
      <Terminal key={run} className="osa-terminal">
        <TypingAnimation className="osa-terminal__cmd" duration={28}>
          {CLONE_COMMAND}
        </TypingAnimation>
        <AnimatedSpan className="osa-terminal__out">{OUTPUT.clone}</AnimatedSpan>
        <TypingAnimation className="osa-terminal__cmd" duration={36}>
          {LICENSE_COMMAND}
        </TypingAnimation>
        <AnimatedSpan className="osa-terminal__out osa-terminal__out--strong">{OUTPUT.license}</AnimatedSpan>
        <AnimatedSpan className="osa-terminal__out">{OUTPUT.version}</AnimatedSpan>
      </Terminal>
    </div>
  );
}
