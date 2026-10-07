/*
 * Playback shared by the new tab illustrations. Server markup is always the
 * finished, readable frame each pass ends on, so reduced-motion and no-JS
 * visitors still get the whole picture; scripts only add motion on top.
 */

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export class Timeline {
  private timers: number[] = [];

  at(ms: number, run: () => void) {
    this.timers.push(window.setTimeout(run, ms));
  }

  stop() {
    this.timers.forEach((timer) => window.clearTimeout(timer));
    this.timers = [];
  }
}

export type Scene = {
  /** Puts the illustration back on the first frame of a pass. */
  reset(): void;
  /** Schedules one pass and returns its length in milliseconds. */
  play(timeline: Timeline): number;
};

// Scenes that come into view together start a beat apart, in reading order,
// so only one thing is moving when the eye lands on it.
const STAGGER = 900;
let nextStart = 0;

/**
 * Plays `scene` once, the first time `root` is mostly on screen, then rests on
 * the finished frame so the copy can be read without motion pulling the eye
 * away (the command bar cards behave the same). Hovering the card replays it;
 * a pass cut short by scrolling away starts over when the card comes back.
 */
export function playOnView(
  root: HTMLElement,
  scene: Scene,
  { threshold = 0.5, replayOnHover = true }: { threshold?: number; replayOnHover?: boolean } = {},
) {
  // `replay` lets a control (the bookmark layout tabs) start a pass on demand.
  if (prefersReducedMotion()) return { replay() {} };
  let timeline: Timeline | null = null;
  let finished = false;

  const run = (delay: number) => {
    timeline?.stop();
    const current = new Timeline();
    timeline = current;
    finished = false;
    current.at(delay, () => {
      scene.reset();
      // One frame on the reset state, so transitions start from it.
      requestAnimationFrame(() => {
        if (timeline !== current) return;
        current.at(scene.play(current), () => {
          timeline = null;
          finished = true;
        });
      });
    });
  };

  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (timeline || finished) return;
        const now = performance.now();
        const delay = Math.max(0, nextStart - now);
        nextStart = now + delay + STAGGER;
        run(delay);
      } else if (timeline) {
        timeline.stop();
        timeline = null;
      }
    },
    { threshold },
  ).observe(root);

  if (replayOnHover) {
    (root.closest("article") || root).addEventListener("pointerenter", (event) => {
      if ((event as PointerEvent).pointerType === "mouse" && finished) run(0);
    });
  }

  return { replay: () => run(0) };
}

/** Center of `target` in `root`'s own pixels, so scaled scenes (.nts-scene--page) land too. */
export function centerOf(root: HTMLElement, target: Element, dx = 0, dy = 0) {
  const base = root.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  const scale = base.width / root.offsetWidth || 1;
  return {
    x: (rect.left - base.left + rect.width / 2) / scale + dx,
    y: (rect.top - base.top + rect.height / 2) / scale + dy,
  };
}

/** Glides the fake pointer to a point inside its scene. */
export function moveCursor(cursor: HTMLElement, point: { x: number; y: number }, duration = 700) {
  cursor.style.transitionDuration = `${duration}ms, 200ms`;
  cursor.style.transform = `translate(${Math.round(point.x)}px, ${Math.round(point.y)}px)`;
  cursor.dataset.visible = "true";
}

export function hideCursor(cursor: HTMLElement) {
  cursor.dataset.visible = "false";
}

export function clickCursor(timeline: Timeline, cursor: HTMLElement, at: number) {
  timeline.at(at, () => (cursor.dataset.pressed = "true"));
  timeline.at(at + 140, () => (cursor.dataset.pressed = "false"));
}

/** Types `text` into `target` one character at a time; returns the end time. */
export function typeText(timeline: Timeline, target: HTMLElement, text: string, start: number, step = 120) {
  const characters = Array.from(text);
  characters.forEach((_, index) => {
    timeline.at(start + (index + 1) * step, () => {
      target.textContent = characters.slice(0, index + 1).join("");
    });
  });
  return start + characters.length * step;
}

/** Segmented tabs (.nts-tabs): moves the indicator under tab `index`. */
export function selectTab(tabs: HTMLElement, index: number, animate = true) {
  const items = Array.from(tabs.querySelectorAll<HTMLElement>(".nts-tab"));
  const indicator = tabs.querySelector<HTMLElement>(".nts-tabs__indicator");
  const tab = items[index];
  if (!tab || !indicator) return;
  if (!animate) indicator.style.transition = "none";
  indicator.style.width = `${tab.offsetWidth}px`;
  indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
  setActive(items, index);
  tabs.dataset.measured = "";
  if (!animate) requestAnimationFrame(() => indicator.style.removeProperty("transition"));
}

export const setActive = (items: HTMLElement[], index: number, attribute = "active") => {
  items.forEach((item, itemIndex) => {
    item.dataset[attribute] = itemIndex === index ? "true" : "false";
  });
};
