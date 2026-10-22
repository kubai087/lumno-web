import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type RefObject } from "react";
import { motion, useReducedMotion, type Transition, type Variants } from "motion/react";
import type { ShortcutKey } from "@/lib/shortcut-keys";
import { splitTitlePair } from "@/lib/title-pair";
import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "./dialog";
import { ShortcutKeys } from "./shortcut-keys";
import { XIcon } from "lucide-react";

/*
 * The new tab section's opening: a heading over a wall of new tab screenshots.
 * The wall starts tilted back and lifted, flattens as it scrolls into view, and
 * its rows drift sideways in alternating directions while the page scrolls.
 *
 * Scroll never re-renders React. useStageMotion reads the scroll position,
 * runs four springs and writes their values to CSS custom properties on the
 * stage; the classes below turn those into transforms. The server markup
 * carries the starting values, so the first paint is already the tilted wall,
 * and prefers-reduced-motion swaps in the flat resting frame from CSS alone.
 */

export interface HeroParallaxShot {
  title: string;
  /** Full-size render, also what a tap opens on phones. */
  thumbnail: string;
  /** Smaller copies of `thumbnail` for the cards. */
  srcSet?: string;
  /** Tiny inline image painted under the card until `thumbnail` arrives. */
  preview?: string;
}

interface HeroParallaxProps {
  shots: readonly HeroParallaxShot[];
  eyebrow?: string;
  /** Keys that trigger the feature, shown as keycaps after the eyebrow. */
  eyebrowKeys?: readonly ShortcutKey[];
  title: string;
  description: string;
  headingId: string;
  /** Phones: name of the tap that opens a screenshot full size, and of its close button. */
  openLabel: string;
  closeLabel: string;
}

// Scroll progress runs from the wall's top reaching 55% of the viewport (0) to
// its bottom reaching 18% (1).
const PROGRESS_START = 0.55;
const PROGRESS_END = 0.18;
// The tilt flattens over the first 18% of that range, the rows drift over the first 72%.
const TILT_SPAN = 0.18;
const DRIFT_SPAN = 0.72;
const DRIFT_PX = 820;

/** Stage values at progress 0 (`from`) and once flat (`to`). */
const STAGE = {
  tiltX: { from: 15, to: 0 },
  tiltZ: { from: 20, to: 0 },
  lift: { from: -700, to: -300 },
} as const;

// Every channel follows its target on the same spring: stiffness 300, damping 30, mass 1.
// That is underdamped (ratio ≈ 0.87), so it settles with a faint overshoot.
const SPRING_OMEGA = Math.sqrt(300);
const SPRING_ZETA = 30 / (2 * SPRING_OMEGA);
const SPRING_OMEGA_D = SPRING_OMEGA * Math.sqrt(1 - SPRING_ZETA * SPRING_ZETA);
const SPRING_REST = 0.01;

type Channel = "drift" | "tiltX" | "tiltZ" | "lift";
const CHANNEL_UNITS: Record<Channel, string> = { drift: "px", tiltX: "deg", tiltZ: "deg", lift: "px" };
const CHANNEL_VARS: Record<Channel, string> = {
  drift: "--hp-drift",
  tiltX: "--hp-tilt-x",
  tiltZ: "--hp-tilt-z",
  lift: "--hp-lift",
};
const RESTING: Record<Channel, number> = {
  drift: 0,
  tiltX: STAGE.tiltX.from,
  tiltZ: STAGE.tiltZ.from,
  lift: STAGE.lift.from,
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

interface SpringState {
  value: number;
  velocity: number;
}

/** Advances a spring toward `target` by `dt` seconds, using the closed-form solution so any frame length is exact. */
function advanceSpring(state: SpringState, target: number, dt: number) {
  const offset = state.value - target;
  const decay = Math.exp(-SPRING_ZETA * SPRING_OMEGA * dt);
  const cos = Math.cos(SPRING_OMEGA_D * dt);
  const sin = Math.sin(SPRING_OMEGA_D * dt);
  const b = (state.velocity + SPRING_ZETA * SPRING_OMEGA * offset) / SPRING_OMEGA_D;
  const nextOffset = decay * (offset * cos + b * sin);
  state.velocity = decay * (
    (b * SPRING_OMEGA_D - SPRING_ZETA * SPRING_OMEGA * offset) * cos
    - (offset * SPRING_OMEGA_D + SPRING_ZETA * SPRING_OMEGA * b) * sin
  );
  state.value = target + nextOffset;
  if (Math.abs(nextOffset) < SPRING_REST && Math.abs(state.velocity) < SPRING_REST) {
    state.value = target;
    state.velocity = 0;
    return false;
  }
  return true;
}

/** Top of `element` in page coordinates from layout boxes, so transforms on the way up don't move it. */
function pageTop(element: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  return top;
}

const stageStyle = (values: Record<Channel, number>) =>
  Object.fromEntries(
    (Object.keys(values) as Channel[]).map((channel) => [
      CHANNEL_VARS[channel],
      `${values[channel]}${CHANNEL_UNITS[channel]}`,
    ]),
  ) as CSSProperties;

function useStageMotion(
  wallRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const wall = wallRef.current;
    const stage = stageRef.current;
    if (!enabled || !wall || !stage) return;

    // The springs start from the server frame and spring to wherever the page
    // already is, so a late hydration eases the wall flat instead of jumping.
    const springs = Object.fromEntries(
      (Object.keys(RESTING) as Channel[]).map((channel) => [channel, { value: RESTING[channel], velocity: 0 }]),
    ) as Record<Channel, SpringState>;
    // The tilt plays once, on the first scroll down. After the wall has flattened it stays
    // flat for the rest of the page view, so scrolling back up only drifts the rows.
    let hasFlattened = false;
    let geometry = { top: 0, height: 0, viewport: 0 };
    let frame = 0;
    let lastTime = 0;

    const measure = () => {
      geometry = {
        top: pageTop(wall),
        height: wall.offsetHeight,
        viewport: document.documentElement.clientHeight,
      };
    };

    const targets = (): Record<Channel, number> => {
      const { top, height, viewport } = geometry;
      const span = height + (PROGRESS_START - PROGRESS_END) * viewport;
      const progress = span > 0 ? clamp01((window.scrollY + PROGRESS_START * viewport - top) / span) : 0;
      if (progress >= TILT_SPAN) hasFlattened = true;
      const flatness = hasFlattened ? 1 : progress / TILT_SPAN;
      return {
        drift: DRIFT_PX * clamp01(progress / DRIFT_SPAN),
        tiltX: lerp(STAGE.tiltX.from, STAGE.tiltX.to, flatness),
        tiltZ: lerp(STAGE.tiltZ.from, STAGE.tiltZ.to, flatness),
        lift: lerp(STAGE.lift.from, STAGE.lift.to, flatness),
      };
    };

    const tick = (time: number) => {
      // A frame after a long pause (a background tab) would be a huge step; the
      // closed-form spring handles it, but cap it so the motion stays readable.
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 1 / 60;
      lastTime = time;
      const goal = targets();
      let moving = false;
      for (const channel of Object.keys(springs) as Channel[]) {
        if (advanceSpring(springs[channel], goal[channel], dt)) moving = true;
        stage.style.setProperty(CHANNEL_VARS[channel], `${springs[channel].value}${CHANNEL_UNITS[channel]}`);
      }
      if (moving) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        lastTime = 0;
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const remeasure = () => {
      measure();
      wake();
    };

    measure();
    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", remeasure);
    // Content above the wall (fonts, images, demos) can shift it after load.
    const resizeObserver = new ResizeObserver(remeasure);
    resizeObserver.observe(wall);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", remeasure);
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [wallRef, stageRef, enabled]);
}

/**
 * True once the heading should be shown: when 40% of it is on screen, or right
 * away if the page is already past it (a late hydration after a fast fling) or
 * a search crawler rendered it (html[data-crawler], set by the homepage head script).
 */
function useRevealOnce(ref: RefObject<HTMLElement | null>) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (
      document.documentElement.hasAttribute("data-crawler")
      || element.getBoundingClientRect().top < window.innerHeight * 0.6
    ) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return revealed;
}

// Below Tailwind's md breakpoint the cards are 224px wide, too small to read, so a tap opens one.
const PHONE_QUERY = "(max-width: 767px)";
const watchPhone = (onChange: () => void) => {
  const query = window.matchMedia(PHONE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const readPhone = () => window.matchMedia(PHONE_QUERY).matches;
const readPhoneOnServer = () => false;

/** Each row repeats its shots this many times so its drift never runs out of cards. */
const ROW_REPEATS = 3;

interface RowPlan {
  pick: (shots: readonly HeroParallaxShot[]) => readonly HeroParallaxShot[];
  /** Laid out right to left and drifting right; the others run left to right and drift left. */
  driftsRight: boolean;
  className?: string;
}

const ROWS: readonly RowPlan[] = [
  { pick: (shots) => shots.slice(0, 5), driftsRight: true },
  { pick: (shots) => shots.slice(5, 10), driftsRight: false },
  { pick: (shots) => shots.slice(10, 15), driftsRight: true, className: "md:mb-0" },
  // Phones show smaller cards, so a fourth row (a reshuffle of the same renders) fills the stage.
  { pick: (shots) => shots.filter((_, index) => index % 3 === 0), driftsRight: false, className: "mb-0 md:hidden" },
];

const COPY_EASE = [0.22, 1, 0.36, 1] as const;
const copyTransition = (delay: number): Transition => ({
  opacity: { duration: 0.72, delay, ease: "easeOut" },
  y: { duration: 0.82, delay, ease: COPY_EASE },
  filter: { duration: 0.82, delay, ease: COPY_EASE },
});
const COPY_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function HeroParallax({
  shots,
  eyebrow,
  eyebrowKeys,
  title,
  description,
  headingId,
  openLabel,
  closeLabel,
}: HeroParallaxProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const isPhone = useSyncExternalStore(watchPhone, readPhone, readPhoneOnServer);
  const [opened, setOpened] = useState<HeroParallaxShot | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const copyRevealed = useRevealOnce(copyRef) || reduceMotion;
  useStageMotion(wallRef, stageRef, !reduceMotion);

  const onOpen = isPhone ? setOpened : undefined;
  const copyState = copyRevealed ? "shown" : "hidden";
  const pair = splitTitlePair(title);
  // Chinese titles break after their comma when there is room for two lines.
  const commaAt = title.indexOf("，");
  const titleLines = commaAt >= 0
    ? [title.slice(0, commaAt + 1), title.slice(commaAt + 1).trimStart()].filter(Boolean)
    : [title];

  return (
    <div
      ref={wallRef}
      // A flat container (no preserve-3d) keeps the copy's z-index above the tilted stage.
      className="hero-parallax relative flex flex-col overflow-hidden py-24 antialiased [perspective:1000px] md:py-40"
      data-hero-parallax
    >
      <div
        ref={copyRef}
        className="hero-parallax__header relative -top-20 z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center md:px-8 md:py-40"
        data-hero-parallax-copy
      >
        {eyebrow ? (
          <motion.p
            className="home-eyebrow"
            variants={COPY_VARIANTS}
            initial="hidden"
            animate={copyState}
            transition={copyTransition(0)}
          >
            {eyebrow}
            {eyebrowKeys?.length ? <ShortcutKeys keys={eyebrowKeys} className="home-eyebrow__keys" /> : null}
          </motion.p>
        ) : null}
        <motion.h2
          id={headingId}
          className={cn("hero-parallax__title home-h2", titleLines.length > 1 && "hero-title-has-break")}
          variants={COPY_VARIANTS}
          initial="hidden"
          animate={copyState}
          transition={copyTransition(0)}
        >
          {pair ? (
            <>
              <span className="home-title-lead">{pair.lead}</span>{" "}
              <span className="home-title-accent">{pair.accent}</span>
            </>
          ) : (
            <span className="hero-title-line">
              {titleLines.map((line) => (
                <span key={line} className="hero-title-segment">{line}</span>
              ))}
            </span>
          )}
        </motion.h2>
        <motion.p
          className="hero-parallax__description"
          variants={COPY_VARIANTS}
          initial="hidden"
          animate={copyState}
          transition={copyTransition(0.13)}
        >
          {description.split("\n").map((line, index) => (
            <span key={index} className="home-copy-line">{line}</span>
          ))}
        </motion.p>
      </div>

      <div
        ref={stageRef}
        className="[transform:translateY(var(--hp-lift))_rotateX(var(--hp-tilt-x))_rotateZ(var(--hp-tilt-z))] motion-reduce:[transform:translateY(-300px)]"
        style={stageStyle(RESTING)}
        data-hero-parallax-stage
      >
        {ROWS.map((row, rowIndex) => (
          <ShotRow
            key={rowIndex}
            shots={row.pick(shots)}
            driftsRight={row.driftsRight}
            className={row.className}
            onOpen={onOpen}
            openLabel={openLabel}
          />
        ))}
      </div>

      <Dialog open={opened !== null} onOpenChange={(open) => !open && setOpened(null)}>
        <DialogContent
          aria-describedby={undefined}
          showCloseButton={false}
          className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-[14px] p-1.5 sm:max-w-[calc(100%-2rem)]"
        >
          <DialogTitle className="sr-only">{opened?.title}</DialogTitle>
          {opened ? (
            <img
              src={opened.thumbnail}
              alt={opened.title}
              width="1280"
              height="800"
              className="block aspect-[8/5] h-auto w-full rounded-[8px]"
            />
          ) : null}
          <DialogClose
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#1f2624] shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            aria-label={closeLabel}
          >
            <XIcon aria-hidden="true" className="size-4" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ShotRowProps {
  shots: readonly HeroParallaxShot[];
  driftsRight: boolean;
  className?: string;
  onOpen?: (shot: HeroParallaxShot) => void;
  openLabel: string;
}

function ShotRow({ shots, driftsRight, className, onOpen, openLabel }: ShotRowProps) {
  // Screen readers get one pass of the row: the copy that starts on screen. Rows laid
  // out right to left start from their second copy (see --hero-parallax-row-loop-offset).
  const readCopy = driftsRight ? 1 : 0;
  return (
    <div
      className={cn(
        "hero-parallax__row mb-6 flex w-max gap-6 md:mb-20 md:gap-20 motion-reduce:[transform:none]",
        driftsRight
          ? "hero-parallax__row--reverse flex-row-reverse [transform:translateX(var(--hp-drift))]"
          : "flex-row [transform:translateX(calc(var(--hp-drift)*-1))]",
        className,
      )}
    >
      {Array.from({ length: ROW_REPEATS }, (_, copy) =>
        shots.map((shot, index) => (
          <ShotCard
            key={`${copy}-${index}-${shot.thumbnail}`}
            shot={shot}
            hidden={copy !== readCopy}
            onOpen={onOpen}
            openLabel={openLabel}
          />
        )),
      )}
    </div>
  );
}

interface ShotCardProps {
  shot: HeroParallaxShot;
  /** A repeat that only fills the drift; kept out of the accessibility tree. */
  hidden: boolean;
  onOpen?: (shot: HeroParallaxShot) => void;
  openLabel: string;
}

function ShotCard({ shot, hidden, onOpen, openLabel }: ShotCardProps) {
  // Every copy opens on a tap; only the copy screen readers get is a focusable button.
  const button = Boolean(onOpen) && !hidden;
  return (
    <article
      // The screenshots are 1280x800, so 8/5 fills the card edge to edge. Phones get a
      // tighter radius: 12px on a 224px card cut into the bookmark bar along the top.
      className={cn(
        "relative aspect-[8/5] w-[14rem] shrink-0 overflow-hidden rounded-[8px] bg-card bg-cover bg-center md:w-[30rem] md:rounded-[var(--home-radius-md,12px)]",
        onOpen && "cursor-zoom-in",
      )}
      style={shot.preview ? { backgroundImage: `url("${shot.preview}")` } : undefined}
      aria-hidden={hidden || undefined}
      data-hero-parallax-card
      onClick={onOpen ? () => onOpen(shot) : undefined}
      role={button ? "button" : undefined}
      tabIndex={button ? 0 : undefined}
      aria-label={button ? `${openLabel}: ${shot.title}` : undefined}
      onKeyDown={button ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen?.(shot);
        }
      } : undefined}
    >
      <img
        src={shot.thumbnail}
        srcSet={shot.srcSet}
        // A failed load would print the alt text over the preview; screen readers still get it.
        className="absolute inset-0 size-full object-contain object-center text-transparent"
        alt={shot.title}
        loading="lazy"
        decoding="async"
        sizes="(min-width: 768px) 480px, 224px"
      />
    </article>
  );
}
