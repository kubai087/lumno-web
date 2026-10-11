/*
 * Opens the community panel from any [data-community-trigger]. The dialog
 * module (and React with it) loads on first hover, focus or press, so pages
 * whose only React was this panel don't ship it up front.
 */

const TRIGGER = "[data-community-trigger]";
const loadPanel = () => import("../components/home/community-panel-root");
let panelModule: ReturnType<typeof loadPanel> | null = null;
// A failed load (a chunk gone after a deploy) is forgotten so the next press tries again.
const preload = () => (panelModule ??= loadPanel().catch((error) => {
  panelModule = null;
  throw error;
}));

const closestTrigger = (target: EventTarget | null) =>
  target instanceof Element ? target.closest<HTMLElement>(TRIGGER) : null;

for (const type of ["pointerover", "focusin", "touchstart"] as const) {
  document.addEventListener(type, (event) => {
    if (closestTrigger(event.target)) void preload();
  }, { passive: true });
}

document.addEventListener("click", (event) => {
  const trigger = closestTrigger(event.target);
  if (!trigger || trigger.matches(":disabled")) return;
  const { communityPanel = "{}", communityReturnFocus } = trigger.dataset;
  // A trigger inside a menu closes with it; focus then goes back to the menu's toggle.
  const returnFocus = communityReturnFocus ? document.querySelector<HTMLElement>(communityReturnFocus) : trigger;
  const panel = JSON.parse(communityPanel);
  void preload().then(({ openCommunityPanel }) => openCommunityPanel({ panel, trigger, returnFocus }));
});
