/*
 * The homepage's latest-release popover (ReleasePopover.astro): the pill opens
 * the notes; the close button, the backdrop and Escape close them, and focus
 * returns to the pill. Opening a release once rests the badge's sweep.
 * The pill steps aside while the footer (and, on phones, the hero) is on screen.
 */

const SEEN_KEY = "lumno:release-popover-seen";

function enhanceReleasePopover(root: HTMLElement) {
  const trigger = root.querySelector<HTMLElement>(".release-popover-trigger");
  const panel = root.querySelector<HTMLElement>(".release-popover-panel");
  if (!trigger || !panel) return;

  const version = root.dataset.version || "";
  try {
    if (version && localStorage.getItem(SEEN_KEY) === version) root.dataset.seen = "";
  } catch {}

  const setOpen = (open: boolean, { restoreFocus = true } = {}) => {
    if ((root.dataset.open === "true") === open) return;
    root.dataset.open = String(open);
    trigger.setAttribute("aria-expanded", String(open));
    panel.setAttribute("aria-hidden", String(!open));
    panel.inert = !open;

    if (open) {
      document.addEventListener("keydown", handleKey);
      root.dataset.seen = "";
      try {
        localStorage.setItem(SEEN_KEY, version);
      } catch {}
      window.requestAnimationFrame(() => panel.focus({ preventScroll: true }));
    } else {
      document.removeEventListener("keydown", handleKey);
      if (restoreFocus) trigger.focus({ preventScroll: true });
    }
  };

  function handleKey(event: KeyboardEvent) {
    if (event.key === "Escape") setOpen(false);
  }

  trigger.addEventListener("click", () => setOpen(root.dataset.open !== "true"));
  root.querySelectorAll("[data-release-popover-dismiss]").forEach((node) => {
    node.addEventListener("click", () => setOpen(false));
  });

  // Tabbing out of the notes closes them, like the header's menus.
  panel.addEventListener("focusout", (event) => {
    const next = event.relatedTarget;
    if (next instanceof Node && !root.contains(next)) setOpen(false, { restoreFocus: false });
  });

  // data-footer-visible / data-hero-visible; the stylesheet decides where each one hides the pill.
  if ("IntersectionObserver" in window) {
    const watch = (selector: string, key: "footerVisible" | "heroVisible") => {
      const target = document.querySelector(selector);
      if (!target) return;
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) root.dataset[key] = "";
        else delete root.dataset[key];
      }).observe(target);
    };
    watch(".site-footer", "footerVisible");
    watch(".hero-section", "heroVisible");
  }
}

document.querySelectorAll<HTMLElement>("[data-release-popover]").forEach(enhanceReleasePopover);
