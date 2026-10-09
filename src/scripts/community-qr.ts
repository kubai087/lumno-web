/*
 * Opens the community QR dialog from any [data-community-qr-trigger]. The
 * dialog module (and React with it) loads on first hover, focus or press, so
 * pages whose only React was this dialog no longer ship it up front.
 */

const TRIGGER = "[data-community-qr-trigger]";
const loadDialog = () => import("../components/home/community-qr-dialog-root");
let dialogModule: ReturnType<typeof loadDialog> | null = null;
const preload = () => (dialogModule ??= loadDialog());

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
  const { qrTitle = "", qrSrc = "", qrAlt = "", qrClose = "", qrReturnFocus } = trigger.dataset;
  // A trigger inside a menu closes with it; focus then goes back to the menu's toggle.
  const returnFocus = qrReturnFocus ? document.querySelector<HTMLElement>(qrReturnFocus) : trigger;
  const content = { title: qrTitle, qrImageSrc: qrSrc, qrImageAlt: qrAlt, closeLabel: qrClose };
  void preload().then(({ openCommunityQrDialog }) => openCommunityQrDialog({ content, trigger, returnFocus }));
});
