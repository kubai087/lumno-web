import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode
} from 'react';

type Rgb = number[];

export interface SiteSearchTheme {
  accentRgb?: Rgb;
  buttonBg?: Rgb;
  buttonBorder?: Rgb;
  buttonText?: Rgb;
  highlightBg?: Rgb;
  highlightBorder?: Rgb;
  keyBg?: Rgb;
  keyBorder?: Rgb;
  keyText?: string;
  markBg?: Rgb;
  markText?: string;
}

export interface SiteSearchCaseModel {
  actionLabel?: string;
  brandAccentRgb?: Rgb;
  favicon?: string;
  iconClass?: string;
  kind?: string;
  label?: string;
  modeLabel?: string;
  prefixLabel?: string;
  promptQuery?: string;
  promptWidth?: string;
  resultDetail?: string;
  resultTag?: string;
  resultTitle?: string;
  theme?: SiteSearchTheme;
  triggerQuery?: string;
}

export interface SiteSearchScopeMenuItem {
  accentRgb?: Rgb;
  active?: boolean;
  favicon?: string;
  iconClass?: string;
  id: string;
  label: string;
}

export interface SiteSearchScopeMenuGroup {
  items: SiteSearchScopeMenuItem[];
  label: string;
}

export interface SiteSearchScopeMenuModel {
  ariaLabel: string;
  filterLabel: string;
  groups: SiteSearchScopeMenuGroup[];
  navigationLabel: string;
  selectLabel: string;
}

export interface SiteSearchDemoModel {
  cases: SiteSearchCaseModel[];
  openLabel: string;
  scopeMenu?: SiteSearchScopeMenuModel;
  settingsLabel: string;
  tabHintTemplate: string;
}

function Icon({ className }: { className: string }) {
  return (
    <i
      aria-hidden="true"
      className={`ri-icon ${className || 'ri-search-line'}`}
    />
  );
}

function rgbToCss(rgb: Rgb | undefined): string {
  const values = Array.isArray(rgb) ? rgb.slice(0, 3) : [59, 130, 246];
  return `rgb(${values.join(', ')})`;
}

function rgbToParts(rgb: Rgb | undefined): string {
  const values = Array.isArray(rgb) ? rgb.slice(0, 3) : [59, 130, 246];
  return values.join(', ');
}

function rgbToAlpha(rgb: Rgb | undefined, alpha: number): string {
  return `rgba(${rgbToParts(rgb)}, ${alpha})`;
}

function getCaseStyle(
  item: SiteSearchCaseModel,
  index: number
): CSSProperties {
  const theme = item.theme || {};
  const accentRgb = theme.accentRgb;
  return {
    '--case-delay': `${index * 760}ms`,
    '--site-search-demo-accent': rgbToCss(accentRgb),
    '--site-search-demo-accent-border': rgbToAlpha(accentRgb, 0.18),
    '--site-search-demo-accent-rgb': rgbToParts(accentRgb),
    '--site-search-demo-accent-soft': rgbToAlpha(accentRgb, 0.1),
    '--site-search-demo-brand-accent-rgb': rgbToParts(
      item.brandAccentRgb || accentRgb
    ),
    '--x-ext-key-bg': rgbToCss(theme.keyBg),
    '--x-ext-key-border': rgbToCss(theme.keyBorder),
    '--x-ext-key-text': String(theme.keyText || '#1E3A8A'),
    '--x-ext-mark-bg': rgbToCss(theme.markBg),
    '--x-ext-mark-text': String(theme.markText || '#1E3A8A'),
    '--x-ext-tag-bg': rgbToCss(theme.buttonBg),
    '--x-ext-tag-border': rgbToCss(theme.buttonBorder),
    '--x-ext-tag-text': rgbToCss(theme.buttonText),
    '--x-ov-suggestion-action-button-bg': rgbToCss(theme.buttonBg),
    '--x-ov-suggestion-action-button-border': rgbToCss(theme.buttonBorder),
    '--x-ov-suggestion-action-button-text': rgbToCss(theme.buttonText),
    '--x-ov-suggestion-row-bg': rgbToCss(theme.highlightBg)
  } as CSSProperties;
}

function ProviderIcon({
  className,
  item
}: {
  className: string;
  item: SiteSearchCaseModel;
}) {
  const [failed, setFailed] = useState(false);
  const favicon = String(item.favicon || '').trim();
  if (favicon && !failed) {
    return (
      <img
        alt=""
        className={className}
        decoding="async"
        draggable={false}
        loading="eager"
        onError={() => setFailed(true)}
        referrerPolicy="no-referrer"
        src={favicon}
      />
    );
  }
  return (
    <span className={className}>
      <Icon
        className={String(
          item.iconClass || (failed ? 'ri-link' : 'ri-search-line')
        )}
      />
    </span>
  );
}

function TypedText({
  className,
  durationMs,
  text,
  width
}: {
  className: string;
  durationMs: number;
  text: string;
  width?: string;
}) {
  const characters = Array.from(String(text || ''));
  const hasWideCharacters = characters.some(
    (character) => /[^\x00-\xff]/.test(character)
  );
  const widthUnit = hasWideCharacters ? 'em' : 'ch';
  const typedWidth = String(width || '').trim() ||
    `${Math.max(1, characters.length)}${widthUnit}`;
  const tokenStyle = {
    '--typed-width': `calc(${typedWidth} + var(--typed-width-buffer, 0.65em))`,
    '--typing-steps': String(Math.max(1, characters.length))
  } as CSSProperties;
  const stepMs = durationMs / Math.max(1, characters.length);

  return (
    <span
      className={`site-search-demo-query-token ${className}`}
      style={tokenStyle}
    >
      {characters.map((character, index) => {
        const style = {
          '--typing-char-delay': `${Math.round((index + 1) * stepMs)}ms`
        } as CSSProperties;
        return (
          <span
            className="onboarding-typing-char"
            key={`${character}-${index}`}
            style={style}
          >
            {character}
          </span>
        );
      })}
    </span>
  );
}

function ModePrefix({ item }: { item: SiteSearchCaseModel }) {
  return (
    <span
      aria-hidden="true"
      className="x-lumno-search-input-mode__prefix site-search-demo-mode-prefix"
      data-demo-cursor-target="site-search-tag"
    >
      {item.favicon ? (
        <span className="x-lumno-search-input-mode__prefix-icon-frame">
          <ProviderIcon
            className="site-search-demo-mode-prefix__icon"
            item={item}
          />
        </span>
      ) : (
        <ProviderIcon
          className="site-search-demo-mode-prefix__icon"
          item={item}
        />
      )}
      <span
        className="site-search-demo-mode-prefix__label"
        data-search-input-mode-prefix-text=""
      >
        {String(item.prefixLabel || item.modeLabel || '')}
      </span>
      <i
        aria-hidden="true"
        className="ri-icon ri-arrow-down-s-line ri-size-16 site-search-demo-mode-prefix__chevron"
        data-search-input-mode-prefix-chevron=""
      />
    </span>
  );
}

function ScopeMenuIcon({ item }: { item: SiteSearchScopeMenuItem }) {
  const [failed, setFailed] = useState(false);
  const style = getScopeMenuItemStyle(item);
  const favicon = String(item.favicon || '').trim();

  return (
    <span
      aria-hidden="true"
      className="x-lumno-search-input-mode__menu-icon"
      data-icon-state={favicon && !failed ? 'resolved' : 'fallback'}
      style={style}
    >
      <span className="x-lumno-search-input-mode__menu-favicon-mask">
        {favicon && !failed ? (
          <img
            alt=""
            decoding="async"
            draggable={false}
            loading="lazy"
            onError={() => setFailed(true)}
            referrerPolicy="no-referrer"
            src={favicon}
          />
        ) : (
          <Icon className={String(item.iconClass || 'ri-search-line')} />
        )}
      </span>
    </span>
  );
}

function getScopeMenuItemStyle(item: SiteSearchScopeMenuItem): CSSProperties {
  const accentRgb = item.accentRgb || [71, 85, 105];
  return {
    '--x-lumno-search-mode-accent': rgbToCss(accentRgb),
    '--x-lumno-search-mode-icon-color': rgbToCss(accentRgb),
    '--x-lumno-search-mode-item-focus-ring': rgbToCss(accentRgb),
    '--x-lumno-search-mode-selected-bg': rgbToAlpha(accentRgb, 0.075)
  } as CSSProperties;
}

function ScopeMenu({ model }: { model: SiteSearchScopeMenuModel }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animationFrame = 0;
    let cycleStartedAt = 0;
    const smoothstep = (progress: number) =>
      progress * progress * (3 - 2 * progress);
    const animateScroll = (now: number) => {
      if (!cycleStartedAt) {
        cycleStartedAt = now;
      }
      const maxScroll = Math.max(0, content.scrollHeight - content.clientHeight);
      const cycleProgress = ((now - cycleStartedAt) % 12_000) / 12_000;
      let scrollProgress = 0;
      if (cycleProgress < 0.12) {
        scrollProgress = 0;
      } else if (cycleProgress < 0.64) {
        scrollProgress = smoothstep((cycleProgress - 0.12) / 0.52);
      } else if (cycleProgress < 0.77) {
        scrollProgress = 1;
      } else {
        scrollProgress = 1 - smoothstep((cycleProgress - 0.77) / 0.23);
      }
      content.scrollTop = maxScroll * scrollProgress;
      animationFrame = window.requestAnimationFrame(animateScroll);
    };
    const startTimer = window.setTimeout(() => {
      animationFrame = window.requestAnimationFrame(animateScroll);
    }, 6_700);

    return () => {
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(animationFrame);
      content.scrollTop = 0;
    };
  }, [model]);

  return (
    <div
      aria-label={model.ariaLabel}
      className="x-lumno-search-input-mode__menu _x_extension_menu_surface_2024_unique_ site-search-demo-scope-menu"
      data-surface="overlay"
      role="menu"
    >
      <div
        className="x-lumno-search-input-mode__menu-content"
        data-demo-cursor-target="site-search-menu"
        ref={contentRef}
        role="presentation"
      >
        {model.groups.flatMap((group) => [
          <div
            aria-hidden="true"
            className="x-lumno-search-input-mode__menu-group"
            key={`group-${group.label}`}
            role="presentation"
          >
            {group.label}
          </div>,
          ...group.items.map((item) => (
            <button
              aria-checked={item.active ? 'true' : 'false'}
              aria-label={item.label}
              className="x-lumno-search-input-mode__menu-item"
              data-mode-id={item.id}
              key={item.id}
              role="menuitemradio"
              style={getScopeMenuItemStyle(item)}
              tabIndex={-1}
              type="button"
            >
              <ScopeMenuIcon item={item} />
              <span className="x-lumno-search-input-mode__menu-label">
                {item.label}
              </span>
              <Icon className="x-lumno-search-input-mode__menu-check ri-check-line ri-size-16" />
            </button>
          ))
        ])}
      </div>
      <div
        aria-hidden="true"
        className="x-lumno-search-input-mode__menu-footer"
        role="presentation"
      >
        <span className="x-lumno-search-input-mode__menu-footer-filter-text">
          {model.filterLabel}
        </span>
        <span className="x-lumno-search-input-mode__menu-footer-actions">
          <span className="x-lumno-search-input-mode__menu-footer-hint">
            <span className="x-lumno-search-input-mode__menu-footer-key x-lumno-search-input-mode__menu-footer-key--arrows">
              ↑ ↓
            </span>
            <span className="x-lumno-search-input-mode__menu-footer-text">
              {model.navigationLabel}
            </span>
          </span>
          <span className="x-lumno-search-input-mode__menu-footer-hint">
            <span className="x-lumno-search-input-mode__menu-footer-key">
              Enter
            </span>
            <span className="x-lumno-search-input-mode__menu-footer-text">
              {model.selectLabel}
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}

function TabHint({
  item,
  template
}: {
  item: SiteSearchCaseModel;
  template: string;
}) {
  const provider = String(item.modeLabel || item.label || '');
  const label = String(template || 'Search with {provider}').replace(
    /\{provider\}/g,
    provider
  );
  return (
    <span
      aria-hidden="true"
      className="x-lumno-search-input-mode__tab-hint site-search-demo-tab-hint"
    >
      <span className="site-search-demo-tab-hint__key">Tab</span>
      <span className="site-search-demo-tab-hint__label">{label}</span>
    </span>
  );
}

function SearchInput({
  item,
  model
}: {
  item: SiteSearchCaseModel;
  model: SiteSearchDemoModel;
}) {
  return (
    <div
      className="x-lumno-search-input x-lumno-search-input__container"
      data-mode-menu-open="true"
    >
      <span className="x-lumno-search-input__icon">
        <Icon className="ri-search-line ri-size-16" />
      </span>
      <div
        aria-label={`${String(item.label || '')} demo query`}
        className="x-lumno-search-input__field site-search-demo-query"
        role="searchbox"
      >
        <TypedText
          className="site-search-demo-query-token--trigger"
          durationMs={760}
          text={String(item.triggerQuery || '')}
        />
        <TypedText
          className="site-search-demo-query-token--prompt"
          durationMs={900}
          text={String(item.promptQuery || '')}
          width={item.promptWidth}
        />
        <span aria-hidden="true" className="site-search-demo-query-caret" />
      </div>
      <button
        aria-label={model.settingsLabel}
        className="x-lumno-search-input__right-icon"
        tabIndex={-1}
        type="button"
      >
        <Icon className="ri-settings-line ri-size-16" />
      </button>
      <span className="x-lumno-search-input__divider" />
      <ModePrefix item={item} />
      <TabHint item={item} template={model.tabHintTemplate} />
      {model.scopeMenu ? <ScopeMenu model={model.scopeMenu} /> : null}
    </div>
  );
}

export function HighlightedText({
  query,
  text
}: {
  query: string;
  text: string;
}) {
  const value = String(text || '');
  const needle = String(query || '').trim();
  if (!needle) {
    return <>{value}</>;
  }

  const nodes: ReactNode[] = [];
  const lowerValue = value.toLowerCase();
  const lowerNeedle = needle.toLowerCase();
  let cursor = 0;
  let matchIndex = lowerValue.indexOf(lowerNeedle);
  while (matchIndex >= 0) {
    if (matchIndex > cursor) {
      nodes.push(value.slice(cursor, matchIndex));
    }
    const match = value.slice(matchIndex, matchIndex + needle.length);
    nodes.push(
      <mark
        key={`${matchIndex}-${match}`}
        style={{
          background: 'var(--x-ext-mark-bg, #CFE8FF)',
          borderRadius: '2px',
          color: 'var(--x-ext-mark-text, #1E3A8A)',
          lineHeight: 'inherit',
          padding: '0 1px'
        }}
      >
        {match}
      </mark>
    );
    cursor = matchIndex + needle.length;
    matchIndex = lowerValue.indexOf(lowerNeedle, cursor);
  }
  if (cursor < value.length) {
    nodes.push(value.slice(cursor));
  }
  return <>{nodes}</>;
}

function SearchResult({
  item,
  model
}: {
  item: SiteSearchCaseModel;
  model: SiteSearchDemoModel;
}) {
  const style = { '--result-index': '0' } as CSSProperties;
  return (
    <div
      className="x-ov-suggestion-item site-search-demo-result"
      data-active="true"
      data-last="true"
      data-type={String(item.kind || '')}
      style={style}
    >
      <div className="x-ov-suggestion-left">
        <span className="x-ov-suggestion-icon-slot">
          <ProviderIcon className="x-ov-suggestion-favicon" item={item} />
        </span>
        <div className="x-ov-suggestion-text">
          <span className="x-ov-suggestion-title">
            <HighlightedText
              query={String(item.promptQuery || '')}
              text={String(item.resultTitle || '')}
            />
          </span>
          {item.resultDetail ? (
            <span className="x-ov-suggestion-url-line">
              {String(item.resultDetail)}
            </span>
          ) : null}
          {item.resultTag ? (
            <span
              className="x-ov-suggestion-source-tag"
              data-visible="true"
            >
              {String(item.resultTag)}
            </span>
          ) : null}
        </div>
      </div>
      <div className="x-ov-suggestion-right" data-action-column="true">
        <button
          className="x-ov-suggestion-action-button x-ov-suggestion-visit-button"
          data-visible="true"
          tabIndex={-1}
          type="button"
        >
          <span className="x-ov-inline-label">
            {String(item.actionLabel || model.openLabel)}
          </span>
          <span className="x-ov-inline-icon">
            <Icon className="ri-arrow-right-line ri-size-12" />
          </span>
        </button>
      </div>
    </div>
  );
}

function SearchCase({
  index,
  item,
  model
}: {
  index: number;
  item: SiteSearchCaseModel;
  model: SiteSearchDemoModel;
}) {
  return (
    <section
      aria-label={String(item.label || item.modeLabel || 'Site search demo')}
      className="site-search-demo-card"
      data-kind={String(item.kind || '')}
      style={getCaseStyle(item, index)}
    >
      <SearchInput item={item} model={model} />
      <div className="site-search-demo-results">
        <SearchResult item={item} model={model} />
      </div>
    </section>
  );
}

export function SiteSearchDemoSurface({
  model
}: {
  model: SiteSearchDemoModel;
}) {
  return (
    <div className="site-search-demo-stack">
      {model.cases.map((item, index) => (
        <SearchCase
          index={index}
          item={item}
          key={`${String(item.kind || '')}-${index}`}
          model={model}
        />
      ))}
    </div>
  );
}
