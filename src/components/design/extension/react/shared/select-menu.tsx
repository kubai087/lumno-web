// @ts-nocheck
// Generated from lumno-extension/react-src/shared/select-menu.tsx by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.
// Shared custom select: New Tab menus and Options settings render the same
// trigger, listbox/menu semantics, keyboard model and viewport placement.
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';

export interface SelectMenuOption {
  action?: string;
  /** Short tag after the label in the menu (for example "Beta"); not shown on the trigger. */
  badge?: string;
  /** Toggles `checked` through `onCheckedChange` and keeps the menu open, for picking several values. */
  checkbox?: boolean;
  checked?: boolean;
  disabled?: boolean;
  dividerBefore?: boolean;
  groupTitle?: string;
  iconClass?: string;
  /** Image icon (for example a site tile); takes precedence over `iconClass`. */
  iconUrl?: string;
  label: string;
  radio?: boolean;
  /** Icon after a radio choice's label (for example an eyedropper); checked or not. */
  trailingIconClass?: string;
  value: string;
}

function findNextEnabledOptionIndex(
  options: SelectMenuOption[],
  currentIndex: number,
  delta: number
): number {
  if (!options.length) {
    return currentIndex;
  }
  const startIndex = currentIndex < 0
    ? (delta > 0 ? -1 : 0)
    : currentIndex;
  for (let step = 1; step <= options.length; step += 1) {
    const nextIndex = (
      startIndex + (delta * step) + options.length
    ) % options.length;
    if (!options[nextIndex]?.disabled) {
      return nextIndex;
    }
  }
  return currentIndex;
}

export interface SelectMenuConfig {
  ariaLabel?: string;
  /**
   * Id of a visible label. The trigger is then named by that label plus the
   * current value, instead of `ariaLabel`. Requires `id`.
   */
  ariaLabelledBy?: string;
  disabled?: boolean;
  className?: string;
  iconOnly?: boolean;
  id?: string;
  menuAlign?: 'left' | 'middle' | 'right';
  menuClassName?: string;
  menuMaxWidth?: number | string;
  menuMinWidth?: number | string;
  menuPortal?: boolean;
  menuPortalContainer?: HTMLElement;
  menuPortalOffset?: number;
  menuPortalZIndex?: number;
  menuTitle?: string;
  menuWidth?: 'auto' | 'content' | 'trigger';
  onAction?(payload: { action: string; option: SelectMenuOption }): void;
  onCheckedChange?(value: string, checked: boolean): void;
  onValueChange?(value: string): boolean | void;
  options?: SelectMenuOption[];
  selectId?: string;
  tooltip?: string;
  triggerIconClass?: string;
  /** Trigger text in place of the chosen option's label, for menus of checkbox options. */
  triggerLabel?: string;
  value?: string;
}

export interface SelectMenuControls {
  isOpen(): boolean;
  setOpen(open: boolean): void;
  syncValue(value: string): void;
}

export function toCssLength(value: number | string | undefined, fallback: string) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return `${value}px`;
  }
  const text = String(value ?? '').trim();
  return text || fallback;
}

export function SelectMenu({
  config,
  documentObj,
  getViewportTopInset,
  host,
  onBeforeOpen,
  registerControls,
  windowObj
}: {
  config: SelectMenuConfig;
  documentObj: Document;
  getViewportTopInset?(wrapper: HTMLElement): number;
  host: HTMLElement;
  onBeforeOpen?(): void;
  registerControls?(controls: SelectMenuControls): void;
  windowObj: Window;
}) {
  const options = Array.isArray(config.options) ? config.options : [];
  const [open, setOpenState] = useState(false);
  const [selectedValue, setSelectedValue] = useState(String(config.value ?? ''));
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);

  useEffect(() => {
    setSelectedValue(String(config.value ?? ''));
  }, [config.value]);

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen && config.disabled) return;
      if (nextOpen && !openRef.current) {
        onBeforeOpen?.();
      }
      setOpenState(nextOpen);
    },
    [config.disabled, onBeforeOpen]
  );

  const positionMenu = useCallback(() => {
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    if (!openRef.current || !trigger || !menu) {
      return;
    }
    const triggerRect = trigger.getBoundingClientRect();
    // Modal portals use their positioned container, which may be offset or scaled.
    menu.style.position = config.menuPortalContainer || config.menuPortal === false ? 'absolute' : 'fixed';
    const parent = menu.offsetParent instanceof HTMLElement ? menu.offsetParent : null;
    const parentRect = parent?.getBoundingClientRect();
    const scaleX = parent && parentRect && parent.offsetWidth ? parentRect.width / parent.offsetWidth : 1;
    const scaleY = parent && parentRect && parent.offsetHeight ? parentRect.height / parent.offsetHeight : 1;
    const originX = parent && parentRect ? parentRect.left + (parent.clientLeft - parent.scrollLeft) * scaleX : 0;
    const originY = parent && parentRect ? parentRect.top + (parent.clientTop - parent.scrollTop) * scaleY : 0;
    if (config.menuWidth === 'trigger') {
      menu.style.width = `${triggerRect.width / scaleX}px`;
    }
    const viewportWidth = Math.max(
      0,
      windowObj.innerWidth || documentObj.documentElement.clientWidth || 0
    );
    const viewportHeight = Math.max(
      0,
      windowObj.innerHeight || documentObj.documentElement.clientHeight || 0
    );
    const padding = 8;
    const configuredInset = Number(getViewportTopInset?.(host));
    const topInset = Number.isFinite(configuredInset)
      ? Math.max(padding, configuredInset)
      : padding;
    const offset = Number.isFinite(Number(config.menuPortalOffset))
      ? Number(config.menuPortalOffset)
      : 6;
    const menuWidth = Math.max(
      menu.offsetWidth * scaleX,
      triggerRect.width || 0,
      (Number.parseFloat(windowObj.getComputedStyle(menu).minWidth) || 0) * scaleX
    );
    // Layout dimensions stay stable while the shared opening animation scales the surface.
    const naturalMenuHeight = Math.max((menu.scrollHeight + menu.offsetHeight - menu.clientHeight) * scaleY, 0);
    const align = config.menuAlign || 'right';
    let left = triggerRect.left;
    if (align === 'right') {
      left = triggerRect.right - menuWidth;
    } else if (align === 'middle') {
      left = triggerRect.left + triggerRect.width / 2 - menuWidth / 2;
    }
    left = Math.max(
      padding,
      Math.min(left, Math.max(padding, viewportWidth - menuWidth - padding))
    );
    const visualOffset = offset * scaleY;
    const spaceBelow = Math.max(0, viewportHeight - padding - triggerRect.bottom - visualOffset);
    const spaceAbove = Math.max(0, triggerRect.top - visualOffset - topInset);
    const opensAbove = naturalMenuHeight > spaceBelow && spaceAbove > spaceBelow;
    const availableHeight = opensAbove ? spaceAbove : spaceBelow;
    const menuHeight = Math.min(naturalMenuHeight, availableHeight);
    menu.style.maxHeight = `${availableHeight / scaleY}px`;
    menu.style.overflowY = 'auto';
    menu.style.overflowX = 'hidden';
    menu.style.transformOrigin = `${opensAbove ? 'bottom' : 'top'} ${align === 'middle' ? 'center' : align}`;
    let top = opensAbove ? triggerRect.top - visualOffset - menuHeight : triggerRect.bottom + visualOffset;
    top = Math.max(
      topInset,
      Math.min(top, Math.max(topInset, viewportHeight - menuHeight - padding))
    );
    menu.style.left = `${(left - originX) / scaleX}px`;
    menu.style.right = 'auto';
    menu.style.top = `${(top - originY) / scaleY}px`;
    menu.style.zIndex = String(config.menuPortalZIndex || 10000);
  }, [
    config.menuAlign,
    config.menuPortal,
    config.menuPortalContainer,
    config.menuPortalOffset,
    config.menuPortalZIndex,
    config.menuWidth,
    documentObj,
    getViewportTopInset,
    host,
    windowObj
  ]);

  useLayoutEffect(() => {
    openRef.current = open;
    host.dataset.open = open ? 'true' : 'false';
    if (!open) {
      return undefined;
    }
    const selectedIndex = options.findIndex(
      (option) => !option.action && !option.checkbox &&
        option.value === selectedValue &&
        !option.disabled
    );
    setActiveIndex(selectedIndex);
    positionMenu();
    const onViewportChange = () => positionMenu();
    windowObj.addEventListener('resize', onViewportChange);
    windowObj.addEventListener('scroll', onViewportChange, true);
    const ResizeObserverCtor = (windowObj as Window & { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    const resizeObserver = ResizeObserverCtor ? new ResizeObserverCtor(onViewportChange) : null;
    if (triggerRef.current) resizeObserver?.observe(triggerRef.current);
    if (menuRef.current) resizeObserver?.observe(menuRef.current);
    if (config.menuPortalContainer) resizeObserver?.observe(config.menuPortalContainer);
    windowObj.visualViewport?.addEventListener('resize', onViewportChange);
    windowObj.visualViewport?.addEventListener('scroll', onViewportChange);
    return () => {
      windowObj.removeEventListener('resize', onViewportChange);
      windowObj.removeEventListener('scroll', onViewportChange, true);
      resizeObserver?.disconnect();
      windowObj.visualViewport?.removeEventListener('resize', onViewportChange);
      windowObj.visualViewport?.removeEventListener('scroll', onViewportChange);
    };
  }, [config.menuPortalContainer, host, open, options, positionMenu, selectedValue, windowObj]);

  useEffect(() => {
    if (!open || activeIndex < 0) {
      return;
    }
    const activeOption = menuRef.current?.querySelector<HTMLElement>(
      '._x_extension_select_option_2024_unique_[data-active="true"]'
    );
    activeOption?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex, open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        !host.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as Node | null;
      if (target && !host.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    documentObj.addEventListener('pointerdown', onPointerDown, true);
    documentObj.addEventListener('keydown', onKeyDown, true);
    documentObj.addEventListener('focusin', onFocusIn, true);
    return () => {
      documentObj.removeEventListener('pointerdown', onPointerDown, true);
      documentObj.removeEventListener('keydown', onKeyDown, true);
      documentObj.removeEventListener('focusin', onFocusIn, true);
    };
  }, [documentObj, open, setOpen]);

  useLayoutEffect(() => {
    registerControls?.({
      isOpen: () => openRef.current,
      setOpen,
      syncValue(value) {
        setSelectedValue(String(value ?? ''));
      }
    });
  }, [registerControls, setOpen]);

  const chooseOption = (option: SelectMenuOption) => {
    if (option.disabled) {
      return;
    }
    if (option.action) {
      config.onAction?.({ action: option.action, option });
      setOpen(false);
      return;
    }
    if (option.checkbox) {
      config.onCheckedChange?.(option.value, option.checked !== true);
      return;
    }
    if (config.onValueChange?.(option.value) === false) {
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    setSelectedValue(option.value);
    const select = selectRef.current;
    if (select) {
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    setOpen(false);
    triggerRef.current?.focus();
  };
  const isValueOption = (option: SelectMenuOption) => !option.action && !option.checkbox;
  const selectedOption =
    options.find((option) => isValueOption(option) && option.value === selectedValue) ||
    options.find(isValueOption);
  const usesMenuSemantics = options.some(
    (option) => Boolean(option.action || option.radio || option.checkbox)
  );
  const getOptionId = (index: number) =>
    config.id ? `${config.id}_option_${index}` : undefined;
  const activeOptionId = open && activeIndex >= 0 && options[activeIndex]
    ? getOptionId(activeIndex)
    : undefined;
  const valueId = config.ariaLabelledBy && config.id ? `${config.id}_value` : undefined;
  const menuMinWidth = toCssLength(config.menuMinWidth, '0');
  const menuMaxWidth = toCssLength(
    config.menuMaxWidth,
    'calc(100vw - 32px)'
  );
  const menu = (
    <div
      aria-hidden={!open}
      id={config.id ? `${config.id}_menu` : undefined}
      className={`_x_extension_select_menu_2024_unique_ _x_extension_menu_surface_2024_unique_${
        config.menuClassName ? ` ${config.menuClassName}` : ''
      }`}
      data-react-select-owner={config.id || undefined}
      data-menu-portal-active={config.menuPortal ? 'true' : undefined}
      data-menu-surface-width={
        config.menuWidth === 'content' ? 'content' : undefined
      }
      data-open={open ? 'true' : 'false'}
      ref={menuRef}
      role={usesMenuSemantics ? 'menu' : 'listbox'}
      style={
        {
          '--x-extension-menu-surface-max-width': menuMaxWidth,
          '--x-extension-menu-surface-min-width': menuMinWidth,
          transformOrigin: config.menuAlign === 'right' ? 'top right' : config.menuAlign === 'left' ? 'top left' : 'top center',
          left: 0,
          right: 'auto',
          // Body portals are fixed once opened; start fixed so a closed menu never
          // stretches a scrolling page (mobile new tab flows in the document).
          ...(config.menuPortal !== false && !config.menuPortalContainer ? { position: 'fixed' } : null)
        } as CSSProperties
      }
    >
      {config.menuTitle ? (
        <div
          className="_x_extension_select_menu_title_2024_unique_"
          role="presentation"
        >
          {config.menuTitle}
        </div>
      ) : null}
      {options.map((option, index) => {
        const selected = isValueOption(option) && option.value === selectedValue;
        const radioItem = usesMenuSemantics && !option.checkbox && (!option.action || option.radio);
        const checked = option.radio || option.checkbox ? option.checked === true : selected;
        const trailingIconClass = String(option.trailingIconClass || '').trim();
        return (
          <Fragment key={`${option.action || option.value}:${index}`}>
            {option.dividerBefore && index > 0 ? (
              <div
                aria-orientation={usesMenuSemantics ? 'horizontal' : undefined}
                className="_x_extension_select_divider_2026_unique_"
                role={usesMenuSemantics ? 'separator' : 'presentation'}
              />
            ) : null}
            {option.groupTitle ? (
              <div
                className="_x_extension_select_menu_title_2024_unique_"
                role="presentation"
              >
                {option.groupTitle}
              </div>
            ) : null}
            <div
              aria-checked={radioItem || option.checkbox ? checked : undefined}
              aria-disabled={option.disabled ? 'true' : undefined}
              aria-selected={!usesMenuSemantics ? selected : undefined}
              className={`_x_extension_select_option_2024_unique_${
                option.radio ? ' _x_extension_select_option_radio_2026_unique_' : ''
              }`}
              data-active={open && activeIndex === index ? 'true' : undefined}
              id={getOptionId(index)}
              data-radio-checked={
                option.radio ? (checked ? 'true' : 'false') : undefined
              }
              data-selected={selected ? 'true' : 'false'}
              data-value={option.value}
              onClick={() => chooseOption(option)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
              role={
                usesMenuSemantics
                  ? option.checkbox
                    ? 'menuitemcheckbox'
                    : radioItem
                      ? 'menuitemradio'
                      : 'menuitem'
                  : 'option'
              }
            >
              {option.checkbox ? (
                <span
                  aria-hidden="true"
                  className="_x_extension_select_option_checkbox_2026_unique_"
                />
              ) : null}
              {option.iconUrl ? (
                <img
                  alt=""
                  aria-hidden="true"
                  className="_x_extension_select_option_icon_2026_unique_"
                  src={option.iconUrl}
                />
              ) : option.iconClass ? (
                <i
                  aria-hidden="true"
                  className={`_x_extension_select_option_icon_2026_unique_ ri-icon ri-size-16 ${option.iconClass}`}
                />
              ) : null}
              <span className="_x_extension_select_option_label_2026_unique_">
                {option.label}
              </span>
              {option.badge ? (
                <span className="_x_extension_select_option_badge_2026_unique_">
                  {option.badge}
                </span>
              ) : null}
              {option.radio && trailingIconClass ? (
                <span
                  aria-hidden="true"
                  className="_x_extension_select_option_check_2026_unique_"
                >
                  <i className={`ri-icon ri-size-16 ${trailingIconClass}`} />
                </span>
              ) : null}
            </div>
          </Fragment>
        );
      })}
    </div>
  );

  return (
    <Fragment>
      <select
        aria-hidden="true"
        className="_x_extension_select_2024_unique_"
        id={config.selectId}
        disabled={config.disabled}
        ref={selectRef}
        tabIndex={-1}
        value={selectedValue}
        onChange={(event) => setSelectedValue(event.currentTarget.value)}
      >
        {options
          .filter(isValueOption)
          .map((option) => (
            <option
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
      </select>
      <button
        aria-activedescendant={activeOptionId}
        aria-controls={config.id ? `${config.id}_menu` : undefined}
        aria-expanded={open}
        aria-haspopup={usesMenuSemantics ? 'menu' : 'listbox'}
        aria-label={valueId ? undefined : config.ariaLabel}
        aria-labelledby={valueId ? `${config.ariaLabelledBy} ${valueId}` : undefined}
        className="_x_extension_select_trigger_2024_unique_"
        disabled={config.disabled}
        data-tooltip={config.tooltip}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen(!openRef.current);
        }}
        onKeyDown={(event) => {
          if (
            openRef.current &&
            (event.key === 'Home' || event.key === 'End')
          ) {
            event.preventDefault();
            setActiveIndex(
              event.key === 'Home'
                ? findNextEnabledOptionIndex(options, -1, 1)
                : findNextEnabledOptionIndex(options, 0, -1)
            );
            return;
          }
          if (
            event.key === 'ArrowDown' ||
            event.key === 'ArrowUp' ||
            event.key === 'Enter' ||
            event.key === ' '
          ) {
            event.preventDefault();
            if (!openRef.current) {
              setOpen(true);
              return;
            }
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              if (!options.length) {
                return;
              }
              setActiveIndex((current) => {
                const delta = event.key === 'ArrowDown' ? 1 : -1;
                return findNextEnabledOptionIndex(options, current, delta);
              });
              return;
            }
            if (options[activeIndex]) {
              chooseOption(options[activeIndex]);
            }
          }
        }}
        ref={triggerRef}
        type="button"
      >
        {selectedOption?.iconUrl ? (
          <img
            alt=""
            aria-hidden="true"
            className="_x_extension_select_value_icon_2026_unique_"
            src={selectedOption.iconUrl}
          />
        ) : null}
        <span
          aria-hidden={valueId ? undefined : 'true'}
          className="_x_extension_select_label_2024_unique_"
          id={valueId}
        >
          {config.triggerLabel ?? (selectedOption?.label || '')}
        </span>
        <i
          aria-hidden="true"
          className={`_x_extension_select_icon_2024_unique_ ri-icon ri-size-16 ${
            config.triggerIconClass || 'ri-arrow-down-s-line'
          }`}
        />
      </button>
      {config.menuPortal !== false
        ? createPortal(menu, config.menuPortalContainer || documentObj.body)
        : menu}
    </Fragment>
  );
}
