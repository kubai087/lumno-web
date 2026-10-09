/*
 * SettingsSelect's interaction, for selects rendered without hydrating React
 * (the site header). It drives the same markup and data attributes the React
 * component writes, so settings-kit.css styles both alike: open/close, the
 * expandable branches, outside-click and Escape dismissal, and arrow-key focus.
 */

type OptionElement = HTMLButtonElement | HTMLAnchorElement;

export function enhanceSettingsSelect(root: HTMLElement) {
  const menu = root.querySelector<HTMLElement>(":scope > .lumno-settings-select-menu");
  const trigger = menu?.id ? root.querySelector<HTMLElement>(`[aria-controls="${menu.id}"]`) : null;
  if (!menu || !trigger) return;

  const focusFirst = root.hasAttribute("data-focus-first");
  const restoreFocus = root.hasAttribute("data-restore-focus");
  const openStateEvent = root.dataset.openStateEvent;
  const options = () => [...menu.querySelectorAll<OptionElement>(".lumno-settings-select-option")];
  const focusableOptions = () => options().filter((option) => option.tabIndex !== -1 && !option.hidden);
  const initiallyOpen = root.dataset.open === "true";
  let open = false;

  const setExpanded = (option: OptionElement, expanded: boolean) => {
    const submenu = option.nextElementSibling instanceof HTMLElement ? option.nextElementSibling : null;
    option.setAttribute("aria-expanded", String(expanded));
    option.dataset.expanded = String(expanded);
    submenu?.setAttribute("aria-hidden", String(!expanded));
    if (submenu) submenu.dataset.expanded = String(expanded);
    submenu?.querySelectorAll<OptionElement>(".lumno-settings-select-option").forEach((child) => {
      child.tabIndex = expanded ? 0 : -1;
    });
  };

  const render = () => {
    root.dataset.open = String(open);
    menu.dataset.open = String(open);
    menu.setAttribute("aria-hidden", String(!open));
    trigger.setAttribute("aria-expanded", String(open));
    if (!open) menu.querySelectorAll<OptionElement>('[data-expandable="true"]').forEach((option) => setExpanded(option, false));
  };

  const setOpen = (next: boolean, { restore = false } = {}) => {
    if (next === open) return;
    open = next;
    render();
    if (open) {
      document.addEventListener("pointerdown", handleOutsidePointer);
      document.addEventListener("keydown", handleDocumentKey);
      if (focusFirst) window.requestAnimationFrame(() => focusableOptions()[0]?.focus());
    } else {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("keydown", handleDocumentKey);
      if (restore) window.setTimeout(() => trigger.focus(), 0);
    }
  };

  function handleOutsidePointer(event: PointerEvent) {
    if (!root.contains(event.target as Node)) setOpen(false);
  }

  function handleDocumentKey(event: KeyboardEvent) {
    if (event.key === "Escape") setOpen(false, { restore: restoreFocus });
  }

  const moveFocus = (event: KeyboardEvent, direction: 1 | -1) => {
    const focusable = focusableOptions();
    const current = focusable.indexOf(document.activeElement as OptionElement);
    const next = current < 0
      ? direction === 1 ? 0 : focusable.length - 1
      : (current + direction + focusable.length) % focusable.length;
    event.preventDefault();
    focusable[next]?.focus();
  };

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(!open);
  });

  if (root.dataset.triggerVariant) {
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false, { restore: true });
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      setOpen(true);
      const index = event.key === "ArrowDown" ? 0 : -1;
      window.setTimeout(() => options().at(index)?.focus(), 0);
    });
  }

  menu.addEventListener("keydown", (event) => {
    const option = (event.target as Element).closest<OptionElement>('[data-expandable="true"]');
    if (option && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      setExpanded(option, option.dataset.expanded !== "true");
      return;
    }
    if (event.key === "ArrowDown") moveFocus(event, 1);
    if (event.key === "ArrowUp") moveFocus(event, -1);
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const focusable = focusableOptions();
      (event.key === "Home" ? focusable[0] : focusable.at(-1))?.focus();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false, { restore: restoreFocus });
    }
    if (event.key === "Tab") setOpen(false);
  });

  menu.addEventListener("click", (event) => {
    const option = (event.target as Element).closest<OptionElement>(".lumno-settings-select-option");
    if (!option) return;
    if (option.dataset.expandable === "true") setExpanded(option, option.dataset.expanded !== "true");
    else setOpen(false);
  });

  if (openStateEvent) {
    // Same handshake as the hydrated component: the language runtime leaves the toggle to us.
    root.dataset.hydrated = "true";
    document.addEventListener(openStateEvent, (event) => {
      const detail = (event as CustomEvent<{ open?: boolean }>).detail;
      if (typeof detail?.open === "boolean") setOpen(detail.open);
    });
  }

  render();
  if (initiallyOpen) setOpen(true);
}
