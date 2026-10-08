import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactElement,
  type RefObject,
  type ReactNode,
} from "react";
import "./settings-kit.css";
import { attachTabsIndicator } from "./tabs-indicator";

type SettingsTheme = "light" | "dark";

function joinClassNames(...names: Array<string | false | null | undefined>) {
  return names.filter(Boolean).join(" ");
}

function useControllableValue<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value === undefined ? internalValue : value;

  const setValue = (nextValue: T) => {
    if (value === undefined) setInternalValue(nextValue);
    if (!Object.is(currentValue, nextValue)) onChange?.(nextValue);
  };

  return [currentValue, setValue] as const;
}

/** Slides one white block under the active tab; see tabs-indicator.ts. */
function useTabsIndicator(ref: RefObject<HTMLElement | null>) {
  useEffect(() => (ref.current ? attachTabsIndicator(ref.current) : undefined), [ref]);
}

export function SettingsSurface({
  children,
  theme = "light",
  className,
  ariaLabel,
}: {
  children: ReactNode;
  theme?: SettingsTheme;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      className={joinClassNames("lumno-settings-kit", "lumno-settings-panel", className)}
      data-theme={theme}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}

export type SettingsTabItem<T extends string = string> = {
  value: T;
  label: string;
  iconClass?: string;
};

export function SettingsTabs<T extends string>({
  items,
  value,
  onValueChange,
  ariaLabel,
  className,
  itemClassName,
  ...rest
}: {
  items: Array<SettingsTabItem<T>>;
  value: T;
  onValueChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
  itemClassName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "role" | "aria-label" | "className" | "onChange">) {
  const trackRef = useRef<HTMLDivElement>(null);
  useTabsIndicator(trackRef);

  // Arrow keys, Home and End move between tabs, as in a native tab bar.
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    let next = -1;
    if (step) next = (index + step + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    if (next < 0) return;
    event.preventDefault();
    onValueChange(items[next].value);
    const buttons = trackRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']");
    buttons?.[next]?.focus();
  };

  return (
    <div
      {...rest}
      ref={trackRef}
      className={joinClassNames("lumno-settings-tabs", className)}
      role="tablist"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const active = item.value === value;
        return (
          <button
            className={joinClassNames("lumno-settings-tab", itemClassName)}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            data-active={active}
            onClick={() => onValueChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            key={item.value}
          >
            {item.iconClass ? <i className={item.iconClass} aria-hidden="true" /> : null}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SettingsSection({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={joinClassNames("lumno-settings-section", className)}>
      {title || action ? (
        <div className="lumno-settings-section-header">
          {title ? <h3>{title}</h3> : <span />}
          {action}
        </div>
      ) : null}
      <div className="lumno-settings-section-content">{children}</div>
    </section>
  );
}

export function SettingsRow({
  title,
  description,
  iconClass,
  children,
  compact = false,
  className,
}: {
  title: string;
  description?: string;
  iconClass?: string;
  children?: ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={joinClassNames("lumno-settings-row", compact && "lumno-settings-row-compact", className)}
    >
      <div className="lumno-settings-row-copy">
        {iconClass ? (
          <span className="lumno-settings-row-icon" aria-hidden="true">
            <i className={iconClass} />
          </span>
        ) : null}
        <div>
          <div className="lumno-settings-row-title">{title}</div>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      {children ? <div className="lumno-settings-row-control">{children}</div> : null}
    </div>
  );
}

export function SettingsDivider() {
  return <div className="lumno-settings-divider" role="separator" />;
}

type SettingsButtonVariant = "primary" | "secondary" | "ghost";

type SettingsButtonCommonProps = {
  children?: ReactNode;
  variant?: SettingsButtonVariant;
  iconClass?: string;
  /** Raw SVG markup, inlined so it stays crisp in Safari; wins over iconClass. */
  iconSvg?: string;
  iconPosition?: "start" | "end";
  className?: string;
};

type SettingsButtonProps =
  | (SettingsButtonCommonProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SettingsButtonCommonProps> & {
        as?: "button";
        href?: never;
      })
  | (SettingsButtonCommonProps &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SettingsButtonCommonProps> & {
        as: "a";
        href: string;
      });

export function SettingsButton({
  children,
  variant = "secondary",
  iconClass,
  iconSvg,
  iconPosition = "start",
  as = "button",
  href,
  className,
  ...buttonProps
}: SettingsButtonProps) {
  const icon = iconSvg ? (
    <span className="lumno-settings-button-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: iconSvg }} />
  ) : iconClass ? (
    <i className={iconClass} aria-hidden="true" />
  ) : null;
  const content = (
    <>
      {iconPosition === "start" ? icon : null}
      {children}
      {iconPosition === "end" ? icon : null}
    </>
  );
  const classNames = joinClassNames(
    "lumno-settings-button",
    `lumno-settings-button-${variant}`,
    className,
  );

  if (as === "a") {
    return (
      <a {...(buttonProps as AnchorHTMLAttributes<HTMLAnchorElement>)} href={href} className={classNames}>
        {content}
      </a>
    );
  }

  const buttonAttributes = buttonProps as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonAttributes} type={buttonAttributes.type || "button"} className={classNames}>
      {content}
    </button>
  );
}

export function SettingsIconButton({
  label,
  iconClass,
  variant = "secondary",
  className,
  ...buttonProps
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children"> & {
  label: string;
  iconClass: string;
  variant?: SettingsButtonVariant;
}) {
  return (
    <SettingsButton
      {...buttonProps}
      aria-label={label}
      title={buttonProps.title || label}
      variant={variant}
      className={joinClassNames("lumno-settings-icon-button", className)}
    >
      <i className={iconClass} aria-hidden="true" />
    </SettingsButton>
  );
}

export function SettingsSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  id,
  className,
  disabled,
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
  id?: string;
  className?: string;
  disabled?: boolean;
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [currentChecked, setCurrentChecked] = useControllableValue({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <label className={joinClassNames("lumno-settings-switch", className)} htmlFor={inputId}>
      <span className="lumno-settings-visually-hidden">{label}</span>
      <input
        id={inputId}
        type="checkbox"
        checked={currentChecked}
        disabled={disabled}
        onChange={(event) => setCurrentChecked(event.target.checked)}
      />
      <span className="lumno-settings-switch-track" aria-hidden="true">
        <span className="lumno-settings-switch-knob" />
      </span>
    </label>
  );
}

export type SettingsSegmentItem<T extends string = string> = {
  value: T;
  label: string;
  iconClass?: string;
};

export function SettingsSegmentedControl<T extends string>({
  items,
  value,
  defaultValue,
  onValueChange,
  label,
  className,
}: {
  items: Array<SettingsSegmentItem<T>>;
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  label: string;
  className?: string;
}) {
  const fallbackValue = defaultValue ?? items[0]?.value;
  const [currentValue, setCurrentValue] = useControllableValue({
    value,
    defaultValue: fallbackValue,
    onChange: onValueChange,
  });
  const trackRef = useRef<HTMLDivElement>(null);
  useTabsIndicator(trackRef);

  return (
    <div
      ref={trackRef}
      className={joinClassNames("lumno-settings-segmented", className)}
      role="group"
      aria-label={label}
    >
      {items.map((item) => (
        <button
          type="button"
          className="lumno-settings-segment"
          data-active={item.value === currentValue}
          aria-pressed={item.value === currentValue}
          aria-label={item.label}
          onClick={() => setCurrentValue(item.value)}
          key={item.value}
        >
          {item.iconClass ? <i className={item.iconClass} aria-hidden="true" /> : null}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export type SettingsSelectItem<T extends string = string> = {
  value: T;
  label: string;
  children?: ReadonlyArray<SettingsSelectItem<T>>;
  labelSuffix?: ReactNode;
  iconClass?: string;
  meta?: ReactNode;
  i18n?: string;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
  analyticsEvent?: string;
  analyticsCategory?: string;
  analyticsLabel?: string;
  onSelect?: () => void;
};

function getInitialMenuOpenState(menuId?: string) {
  if (!menuId || typeof window === "undefined") return false;

  const pendingStates = (window as Window & {
    __lumnoMenuOpenStates?: Record<string, boolean>;
  }).__lumnoMenuOpenStates;
  if (typeof pendingStates?.[menuId] === "boolean") return pendingStates[menuId];

  return document.getElementById(menuId)?.getAttribute("data-open") === "true";
}

export function SettingsSelect<T extends string>({
  items,
  value,
  defaultValue,
  onValueChange,
  label,
  className,
  id,
  menuId,
  menuRole = "listbox",
  optionRole = "option",
  triggerMode = "default",
  triggerVariant,
  triggerIconClass,
  triggerLabel,
  triggerClassName,
  triggerPrefixClassName,
  triggerValueClassName,
  triggerValueId,
  triggerChevronClassName,
  triggerDataI18nAriaLabel,
  menuClassName,
  optionClassName,
  menuPlacement = "below",
  showSelected = true,
  focusFirstItemOnOpen = false,
  restoreFocusOnEscape = false,
  openStateEvent,
}: {
  items: ReadonlyArray<SettingsSelectItem<T>>;
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  label: string;
  className?: string;
  id?: string;
  menuId?: string;
  menuRole?: "listbox" | "menu";
  optionRole?: "option" | "menuitemradio" | "menuitem";
  triggerMode?: "default" | "icon";
  triggerVariant?: SettingsButtonVariant;
  triggerIconClass?: string;
  triggerLabel?: ReactNode;
  triggerClassName?: string;
  triggerPrefixClassName?: string;
  triggerValueClassName?: string;
  triggerValueId?: string;
  triggerChevronClassName?: string;
  triggerDataI18nAriaLabel?: string;
  menuClassName?: string;
  optionClassName?: string;
  menuPlacement?: "above" | "below";
  showSelected?: boolean;
  focusFirstItemOnOpen?: boolean;
  restoreFocusOnEscape?: boolean;
  openStateEvent?: string;
}) {
  const fallbackValue = defaultValue ?? items[0]?.value;
  const [currentValue, setCurrentValue] = useControllableValue({
    value,
    defaultValue: fallbackValue,
    onChange: onValueChange,
  });
  const [open, setOpen] = useState(() => getInitialMenuOpenState(menuId));
  const [expandedValues, setExpandedValues] = useState<Set<T>>(() => new Set());
  const selectRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | HTMLAnchorElement | null>>([]);
  const allItems = items.flatMap((item) => [item, ...(item.children || [])]);
  const selectedItem = allItems.find((item) => item.value === currentValue) || items[0];

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    setExpandedValues(new Set());
    if (restoreFocus && id && typeof window !== "undefined") {
      window.setTimeout(() => document.getElementById(id)?.focus(), 0);
    }
  };

  const toggleMenu = () => {
    if (open) closeMenu();
    else setOpen(true);
  };

  const toggleExpandedValue = (itemValue: T) => {
    setExpandedValues((currentValues) => {
      const nextValues = new Set(currentValues);
      if (nextValues.has(itemValue)) nextValues.delete(itemValue);
      else nextValues.add(itemValue);
      return nextValues;
    });
  };

  const getFocusableOptions = () =>
    optionRefs.current.filter((option) => option !== null && option.tabIndex !== -1);

  const moveFocus = (event: ReactKeyboardEvent<HTMLDivElement>, direction: 1 | -1) => {
    const focusableOptions = getFocusableOptions();
    const currentIndex = focusableOptions.findIndex((option) => option === document.activeElement);
    const nextIndex =
      currentIndex < 0
        ? direction === 1
          ? 0
          : focusableOptions.length - 1
        : (currentIndex + direction + focusableOptions.length) % focusableOptions.length;
    event.preventDefault();
    focusableOptions[nextIndex]?.focus();
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") moveFocus(event, 1);
    if (event.key === "ArrowUp") moveFocus(event, -1);
    if (event.key === "Home") {
      event.preventDefault();
      getFocusableOptions()[0]?.focus();
    }
    if (event.key === "End") {
      event.preventDefault();
      getFocusableOptions().at(-1)?.focus();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(restoreFocusOnEscape);
    }
    if (event.key === "Tab") closeMenu();
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) closeMenu();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(restoreFocusOnEscape);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, restoreFocusOnEscape]);

  useEffect(() => {
    if (!open || !focusFirstItemOnOpen) return;
    const frame = window.requestAnimationFrame(() => getFocusableOptions()[0]?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [focusFirstItemOnOpen, open]);

  useEffect(() => {
    if (!openStateEvent) return;

    selectRef.current?.setAttribute("data-hydrated", "true");
    return () => selectRef.current?.removeAttribute("data-hydrated");
  }, [openStateEvent]);

  useEffect(() => {
    if (!openStateEvent) return;

    const handleExternalState = (event: Event) => {
      const detail = (event as CustomEvent<{ open?: boolean }>).detail;
      if (typeof detail?.open === "boolean") setOpen(detail.open);
    };

    document.addEventListener(openStateEvent, handleExternalState);
    return () => document.removeEventListener(openStateEvent, handleExternalState);
  }, [openStateEvent]);

  const triggerText = triggerLabel ?? selectedItem?.label;
  const triggerContent = triggerPrefixClassName || triggerValueClassName || triggerChevronClassName ? (
    <>
      <span className={triggerPrefixClassName}>
        {triggerIconClass ? <i className={triggerIconClass} aria-hidden="true" /> : null}
      </span>
      <span id={triggerValueId} className={triggerValueClassName}>
        {triggerText}
      </span>
      <span className={triggerChevronClassName} aria-hidden="true">
        <i className="ri-arrow-down-s-line" />
      </span>
    </>
  ) : (
    <span className="lumno-settings-select-value">
      {selectedItem?.iconClass ? <i className={selectedItem.iconClass} aria-hidden="true" /> : null}
      {triggerText}
    </span>
  );

  const trigger =
    triggerMode === "icon" ? (
      <SettingsIconButton
        id={id}
        className={triggerClassName}
        label={label}
        iconClass={triggerIconClass || "ri-arrow-down-s-line"}
        aria-haspopup={menuRole}
        aria-expanded={open}
        aria-controls={menuId}
        data-i18n-aria-label={triggerDataI18nAriaLabel}
        onClick={(event) => {
          event.stopPropagation();
          toggleMenu();
        }}
      />
    ) : triggerVariant ? (
      <SettingsButton
        id={id}
        className={triggerClassName}
        variant={triggerVariant}
        iconClass={triggerIconClass ? joinClassNames(triggerIconClass, "lumno-settings-select-chevron") : undefined}
        iconPosition="end"
        aria-label={label}
        aria-haspopup={menuRole}
        aria-expanded={open}
        aria-controls={menuId}
        data-i18n-aria-label={triggerDataI18nAriaLabel}
        onClick={(event) => {
          event.stopPropagation();
          toggleMenu();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeMenu(true);
            return;
          }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
            window.setTimeout(() => {
              const index = event.key === "ArrowDown" ? 0 : optionRefs.current.length - 1;
              optionRefs.current[index]?.focus();
            }, 0);
          }
        }}
      >
        {triggerText}
      </SettingsButton>
    ) : (
      <button
        id={id}
        className={joinClassNames("lumno-settings-select-trigger", triggerClassName)}
        type="button"
        aria-label={label}
        aria-haspopup={menuRole}
        aria-expanded={open}
        aria-controls={menuId}
        data-i18n-aria-label={triggerDataI18nAriaLabel}
        onClick={(event) => {
          event.stopPropagation();
          toggleMenu();
        }}
      >
        {triggerContent}
        {!triggerPrefixClassName && !triggerValueClassName && !triggerChevronClassName ? (
          <i className="ri-arrow-down-s-line lumno-settings-select-chevron" aria-hidden="true" />
        ) : null}
      </button>
    );

  const renderOption = (item: SettingsSelectItem<T>, depth: 0 | 1, hidden = false) => {
    const selected = item.value === currentValue;
    const expandable = Boolean(item.children?.length);
    const expanded = expandable && expandedValues.has(item.value);
    const optionIndex = allItems.indexOf(item);
    const optionClassNames = joinClassNames(
      "lumno-settings-select-option",
      optionClassName,
      selected && item.i18n && "is-active",
    );
    const optionContent = (
      <>
        <span className="lumno-settings-select-option-label">
          {item.iconClass ? <i className={item.iconClass} aria-hidden="true" /> : null}
          {item.label}
          {item.labelSuffix}
        </span>
        {expandable ? (
          <span className="lumno-settings-select-option-expand-icon" aria-hidden="true">
            <i className="ri-arrow-right-s-line" />
          </span>
        ) : item.meta || (showSelected && selected) ? (
          <span className="lumno-settings-select-option-meta">
            {item.meta}
            {showSelected && selected ? <i className="ri-check-line" aria-hidden="true" /> : null}
          </span>
        ) : null}
      </>
    );
    const optionAttributes = {
      role: optionRole,
      "aria-selected": optionRole === "option" ? selected : undefined,
      "aria-checked": optionRole === "menuitemradio" ? selected : undefined,
      "aria-expanded": expandable ? expanded : undefined,
      "data-selected": showSelected ? selected : undefined,
      "data-depth": depth,
      "data-expandable": expandable ? "true" : undefined,
      "data-expanded": expandable ? String(expanded) : undefined,
      "data-lang-value": item.i18n ? item.value : undefined,
      "data-i18n": item.i18n,
      "data-analytics-event": item.analyticsEvent,
      "data-analytics-category": item.analyticsCategory,
      "data-analytics-label": item.analyticsLabel,
      tabIndex: hidden ? -1 : undefined,
      onKeyDown: expandable
        ? (event: ReactKeyboardEvent<HTMLElement>) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            toggleExpandedValue(item.value);
          }
        : undefined,
      onClick: () => {
        if (expandable) {
          toggleExpandedValue(item.value);
          return;
        }
        item.onSelect?.();
        setCurrentValue(item.value);
        closeMenu();
      },
    };

    if (item.href && !expandable) {
      return (
        <a
          {...optionAttributes}
          className={optionClassNames}
          href={item.href}
          target={item.target}
          rel={item.rel}
          ref={(element) => {
            optionRefs.current[optionIndex] = element;
          }}
          key={item.value}
        >
          {optionContent}
        </a>
      );
    }

    return (
      <button
        {...optionAttributes}
        className={optionClassNames}
        type="button"
        ref={(element) => {
          optionRefs.current[optionIndex] = element;
        }}
        key={item.value}
      >
        {optionContent}
      </button>
    );
  };

  return (
    <div
      className={joinClassNames("lumno-settings-select", className)}
      ref={selectRef}
      data-open={open}
      data-trigger-mode={triggerMode}
      data-trigger-variant={triggerVariant}
      data-menu-placement={menuPlacement}
    >
      {trigger}
      <div
        id={menuId}
        className={joinClassNames("lumno-settings-select-menu", menuClassName)}
        role={menuRole}
        aria-label={label}
        aria-hidden={!open}
        data-open={open}
        data-placement={menuPlacement}
        onKeyDown={handleMenuKeyDown}
      >
        {items.map((item) => {
          const expanded = Boolean(item.children?.length && expandedValues.has(item.value));
          if (!item.children?.length) return renderOption(item, 0);

          return (
            <div className="lumno-settings-select-branch" key={item.value}>
              {renderOption(item, 0)}
              <div
                className="lumno-settings-select-submenu"
                role="group"
                aria-label={item.label}
                aria-hidden={!expanded}
                data-expanded={expanded}
              >
                <div className="lumno-settings-select-submenu-inner">
                  {item.children.map((child) => renderOption(child, 1, !expanded))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SettingsInput({ className, ...inputProps }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...inputProps} className={joinClassNames("lumno-settings-input", className)} />;
}

export type SettingsThemeOption<T extends string = string> = {
  value: T;
  label: string;
  previewSrc: string;
};

export function SettingsThemePicker<T extends string>({
  items,
  value,
  defaultValue,
  onValueChange,
  label,
}: {
  items: Array<SettingsThemeOption<T>>;
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  label: string;
}) {
  const fallbackValue = defaultValue ?? items[0]?.value;
  const [currentValue, setCurrentValue] = useControllableValue({
    value,
    defaultValue: fallbackValue,
    onChange: onValueChange,
  });

  return (
    <div className="lumno-settings-theme-picker" role="radiogroup" aria-label={label}>
      {items.map((item) => {
        const selected = item.value === currentValue;
        return (
          <button
            className="lumno-settings-theme-option"
            type="button"
            role="radio"
            aria-checked={selected}
            data-selected={selected}
            onClick={() => setCurrentValue(item.value)}
            key={item.value}
          >
            <span className="lumno-settings-theme-preview">
              <img src={item.previewSrc} alt="" loading="lazy" />
              {selected ? <i className="ri-check-line" aria-hidden="true" /> : null}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function ShortcutKeys({ keys, label }: { keys: string[]; label?: string }) {
  return (
    <div className="lumno-settings-shortcut" aria-label={label || keys.join(" + ")}>
      {keys.map((key, index) => (
        <span className="lumno-settings-keycap" aria-hidden="true" key={`${key}-${index}`}>
          {key}
        </span>
      ))}
    </div>
  );
}

export function SettingsBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" }) {
  return <span className={`lumno-settings-badge lumno-settings-badge-${tone}`}>{children}</span>;
}

export function SettingsControlGroup({ children }: { children: ReactNode }) {
  const controls = Children.toArray(children).filter(isValidElement) as ReactElement[];
  return (
    <div className="lumno-settings-control-group">
      {controls.map((control, index) =>
        cloneElement(control, { key: control.key || `settings-control-${index}` }),
      )}
    </div>
  );
}
