import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Each interactive card plays a short demo of its interaction once, the first
 * time it is mostly on screen, then rests (the homepage's convention: play once,
 * replay on request, never loop). Moving the pointer in the card, clicking or
 * typing stops the demo where it is and hands the component over; the replay
 * button starts it again. Reduced motion skips the autoplay.
 *
 * A card's component describes its demo with useCardDemo(run): `run` schedules
 * state changes on the timeline it is given, starting from the component's
 * resting state, and should end back there.
 */

export type Timeline = {
  /** Runs `fn` `ms` after the demo starts. */
  at(ms: number, fn: () => void): void;
  /** Calls `step` every frame from `start` for `duration` ms with progress 0..1 (eased). */
  tween(start: number, duration: number, step: (progress: number) => void): void;
  /** Cleanup when the demo is stopped part way (e.g. drop a half-finished drag). */
  onStop(fn: () => void): void;
};

type DemoRun = (timeline: Timeline) => void;

type DemoRegistry = { register: (run: DemoRun | null) => void };

const CardDemoContext = createContext<DemoRegistry | null>(null);

export function useCardDemo(run: DemoRun) {
  const registry = useContext(CardDemoContext);
  const latest = useRef(run);
  latest.current = run;
  useEffect(() => {
    if (!registry) return;
    registry.register((timeline) => latest.current(timeline));
    return () => registry.register(null);
  }, [registry]);
}

const easeInOut = (value: number) => (value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2);

type Phase = "idle" | "playing" | "rested";

/** Wraps a card: owns the demo's timers, the in-view trigger and the replay button. */
export function DemoCard({
  replayLabel,
  render,
}: {
  replayLabel: string;
  render: (props: { demo: ReactNode; ref: (node: HTMLElement | null) => void; playing: boolean }) => ReactNode;
}) {
  const runRef = useRef<DemoRun | null>(null);
  const [hasDemo, setHasDemo] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);
  const frames = useRef<number[]>([]);
  const cleanups = useRef<Array<() => void>>([]);
  const cardRef = useRef<HTMLElement | null>(null);
  const startedAt = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  const registry = useRef<DemoRegistry>({
    register: (run) => {
      runRef.current = run;
      setHasDemo(Boolean(run));
    },
  }).current;

  const clear = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    frames.current.forEach(window.cancelAnimationFrame);
    timers.current = [];
    frames.current = [];
  }, []);

  const stop = useCallback(() => {
    if (phaseRef.current !== "playing") return;
    clear();
    cleanups.current.forEach((fn) => fn());
    cleanups.current = [];
    setPhase("rested");
  }, [clear]);

  const play = useCallback(() => {
    const run = runRef.current;
    if (!run) return;
    clear();
    cleanups.current = [];
    let end = 0;
    const timeline: Timeline = {
      at(ms, fn) {
        end = Math.max(end, ms);
        timers.current.push(window.setTimeout(fn, ms));
      },
      tween(start, duration, step) {
        end = Math.max(end, start + duration);
        timers.current.push(
          window.setTimeout(() => {
            const begin = performance.now();
            const tick = (now: number) => {
              const progress = Math.min(1, (now - begin) / duration);
              step(easeInOut(progress));
              if (progress < 1) frames.current.push(window.requestAnimationFrame(tick));
            };
            frames.current.push(window.requestAnimationFrame(tick));
          }, start),
        );
      },
      onStop(fn) {
        cleanups.current.push(fn);
      },
    };
    startedAt.current = performance.now();
    setPhase("playing");
    run(timeline);
    timers.current.push(
      window.setTimeout(() => {
        cleanups.current = [];
        setPhase("rested");
      }, end + 80),
    );
  }, [clear]);

  // Play once, the first time the card is mostly on screen.
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !hasDemo || phaseRef.current !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("rested");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && phaseRef.current === "idle") {
          observer.disconnect();
          play();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [hasDemo, play]);

  // A real touch, click or key press inside the card takes over from the demo.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const takeOver = (event: Event) => {
      if (!event.isTrusted) return;
      // Only a pointer that actually moves counts; a card scrolling under a resting one does not.
      if (event instanceof PointerEvent && event.type === "pointermove") {
        if (!event.movementX && !event.movementY) return;
        // The hand that just pressed replay is still in the card; give the demo a moment first.
        if (performance.now() - startedAt.current < 1200) return;
      }
      if (event.target instanceof Element && event.target.closest(".dg-replay")) return;
      if (phaseRef.current === "idle") setPhase("rested");
      stop();
    };
    const events = ["pointerdown", "pointermove", "keydown", "input"] as const;
    events.forEach((name) => card.addEventListener(name, takeOver, true));
    return () => events.forEach((name) => card.removeEventListener(name, takeOver, true));
  }, [stop]);

  useEffect(() => clear, [clear]);

  const demo = hasDemo ? (
    <button
      type="button"
      className="dg-replay"
      data-visible={phase !== "playing"}
      tabIndex={phase === "playing" ? -1 : 0}
      onClick={play}
    >
      <i className="ri-play-line" aria-hidden="true" />
      <span>{replayLabel}</span>
    </button>
  ) : null;

  return (
    <CardDemoContext.Provider value={registry}>
      {render({
        demo,
        ref: (node) => {
          cardRef.current = node;
        },
        playing: phase === "playing",
      })}
    </CardDemoContext.Provider>
  );
}
