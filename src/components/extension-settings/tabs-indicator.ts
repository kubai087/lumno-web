/*
 * Sliding indicator for Lumno tab bars (.lumno-settings-tabs / .lumno-settings-segmented).
 *
 * One white block slides under the active tab instead of each tab painting its own
 * background; the slide itself is a CSS transition (settings-kit.css).
 *
 * The bar's markup stays as rendered; selection is read from each tab's
 * data-active="true", so whatever code switches tabs needs no changes. Until this
 * runs, the active tab keeps its own white background, so nothing flashes.
 */

const ITEM_SELECTOR = ".lumno-settings-tab, .lumno-settings-segment";

const attached = new WeakMap<HTMLElement, () => void>();

export function attachTabsIndicator(track: HTMLElement): () => void {
  const existing = attached.get(track);
  if (existing) return existing;

  const indicator = document.createElement("span");
  indicator.className = "lumno-tabs-indicator";
  indicator.setAttribute("aria-hidden", "true");
  track.prepend(indicator);

  const items = () => Array.from(track.querySelectorAll<HTMLElement>(ITEM_SELECTOR));

  const place = () => {
    const active = items().find((item) => item.dataset.active === "true");
    if (!active || !active.offsetWidth || !track.offsetWidth) return;
    // offsetLeft/offsetWidth round to whole pixels, which leaves the block a
    // pixel off a tab sitting on a half pixel; measure the real boxes instead,
    // undoing any scale an ancestor (a reveal, a hover lift) applies.
    const box = track.getBoundingClientRect();
    const tab = active.getBoundingClientRect();
    const scale = box.width / track.offsetWidth || 1;
    const left = (tab.left - box.left) / scale - track.clientLeft;
    const top = (tab.top - box.top) / scale - track.clientTop;
    indicator.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    indicator.style.width = `${tab.width / scale}px`;
    indicator.style.height = `${tab.height / scale}px`;
    // The first placement lands without sliding in from the corner.
    if (!track.dataset.indicator) {
      indicator.getBoundingClientRect();
      track.dataset.indicator = "ready";
    }
  };

  const mutations = new MutationObserver(place);
  mutations.observe(track, { subtree: true, attributes: true, attributeFilter: ["data-active"] });
  const resize = new ResizeObserver(place);
  resize.observe(track);
  items().forEach((item) => resize.observe(item));
  document.fonts?.ready.then(place);
  place();

  const detach = () => {
    mutations.disconnect();
    resize.disconnect();
    indicator.remove();
    delete track.dataset.indicator;
    attached.delete(track);
  };
  attached.set(track, detach);
  return detach;
}
