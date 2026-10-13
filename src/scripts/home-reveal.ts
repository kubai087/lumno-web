/*
 * Scroll entrance for the homepage below the hero (styles in styles/home.css).
 * Every [data-reveal] element waits for the hero intro to finish, then plays
 * once, the first time it scrolls into view. Elements that come into view in
 * the same frame are staggered in document order, so a heading leads its lead
 * and a row of cards fills in left to right.
 */
const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;

const root = document.documentElement;
const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
const pending = new Set(targets);

const settle = (element: HTMLElement) => {
  element.dataset.revealed = "done";
  element.style.removeProperty("--reveal-delay");
};

const play = (element: HTMLElement, step: number) => {
  pending.delete(element);
  element.style.setProperty("--reveal-delay", `${Math.min(step, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
  element.dataset.revealed = "in";
  const onEnd = (event: AnimationEvent) => {
    if (event.target !== element) return;
    element.removeEventListener("animationend", onEnd);
    settle(element);
  };
  element.addEventListener("animationend", onEnd);
};

const start = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      const arrived = entries
        .filter((entry) => entry.isIntersecting && pending.has(entry.target as HTMLElement))
        .map((entry) => entry.target as HTMLElement)
        .sort((a, b) => targets.indexOf(a) - targets.indexOf(b));
      arrived.forEach((element, step) => {
        observer.unobserve(element);
        play(element, step);
      });

      // A jump (anchor link, restored scroll) skips whatever lies above the viewport;
      // show those as they are instead of saving an entrance for the way back up.
      pending.forEach((element) => {
        if (element.getBoundingClientRect().bottom > 0) return;
        observer.unobserve(element);
        pending.delete(element);
        settle(element);
      });
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  pending.forEach((element) => observer.observe(element));
};

const introFinished = () =>
  document.body.dataset.homeIntro === "complete" || !root.hasAttribute("data-home-intro-js");

// Crawlers never scroll, so anything waiting for its entrance would stay transparent for them
// (html[data-crawler] is set by the homepage head script).
if (
  targets.length
  && !root.hasAttribute("data-crawler")
  && typeof IntersectionObserver === "function"
  && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  root.setAttribute("data-home-reveal", "");

  if (introFinished()) {
    start();
  } else {
    // The sections below the hero stay hidden through the intro; start once it hands over
    // (or once the head script lifts a stalled intro).
    const introWatcher = new MutationObserver(() => {
      if (!introFinished()) return;
      introWatcher.disconnect();
      start();
    });
    introWatcher.observe(document.body, { attributes: true, attributeFilter: ["data-home-intro"] });
    introWatcher.observe(root, { attributes: true, attributeFilter: ["data-home-intro-js"] });
  }
}
