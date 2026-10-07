import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui/terminal";

import "./open-source-art.css";

/**
 * Illustrations for the open source cards. Like the other homepage demos they
 * play once when first seen, and hovering the card replays them: the replay
 * remounts the animated part, so each one starts from scratch.
 */
function useReplay(anchor: RefObject<HTMLElement | null>) {
  const [run, setRun] = useState(0);
  const inView = useInView(anchor, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const card = anchor.current?.closest("[data-os-card]");
    if (!card || reduceMotion) return;
    // Only replay once the first run has had time to finish.
    let lastStart = performance.now();
    const replay = () => {
      if (performance.now() - lastStart < 1600) return;
      lastStart = performance.now();
      setRun((value) => value + 1);
    };
    card.addEventListener("pointerenter", replay);
    return () => card.removeEventListener("pointerenter", replay);
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

// Long enough to read each destination before the next tab takes over.
const CHANNEL_STEP_MS = 1300;

interface SyncFileArtProps {
  channels: Record<ChannelId, { label: string; destination: string }>;
}

/**
 * One settings file, three places it can go. The tabs below the file step
 * through browser sync, WebDAV and an exported file once, then stop.
 */
export function SyncFileArt({ channels }: SyncFileArtProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const { run, inView, reduceMotion } = useReplay(anchorRef);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    if (!inView || reduceMotion) return;
    const timers = CHANNELS.slice(1).map((_, index) =>
      window.setTimeout(() => setActive(index + 1), CHANNEL_STEP_MS * (index + 1)),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, reduceMotion, run]);

  const current = CHANNELS[active];

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
      <div className="osa-sync" style={{ "--active": active } as CSSProperties}>
        <div className="osa-sync__tabs">
          <span className="osa-sync__pill" />
          {CHANNELS.map(({ id }, index) => (
            <span key={id} className="osa-sync__tab" data-active={index === active ? "true" : undefined}>
              {channels[id].label}
            </span>
          ))}
        </div>
        <p key={current.id} className="osa-sync__dest">
          <i className={current.icon} aria-hidden="true" />
          {channels[current.id].destination}
        </p>
      </div>
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
