import {
  useEffect,
  useState,
  type CSSProperties
} from 'react';
import { HighlightedText } from './site-search-demo';

export interface BookmarkFocusResult {
  actionTagKey?: string;
  actionTagLabel?: string;
  commandText?: string;
  detail?: string;
  favicon?: string;
  historyDeletable?: boolean;
  iconClass?: string;
  sourceTag?: string;
  sourceTagKind?: string;
  theme?: BookmarkFocusResultTheme;
  title?: string;
  type?: string;
  visitButtonHidden?: boolean;
  visitButtonLabel?: string;
}

export interface BookmarkFocusResultTheme {
  activeMarkBg: string;
  activeMarkText: string;
  buttonBg: string;
  buttonBorder: string;
  buttonText: string;
  highlightBg: string;
  keyBg: string;
  keyBorder: string;
  keyText: string;
  tagBg: string;
  tagBorder: string;
  tagText: string;
}

export interface BookmarkFocusModel {
  hoverLeadMs: number;
  hoverStartMs: number;
  hoverStepMs: number;
  hoverWrapStepMs: number;
  openLabel: string;
  overlayAriaLabel: string;
  panelId: string;
  query: string;
  reducedMotion: boolean;
  removeHistoryLabel: string;
  results: BookmarkFocusResult[];
  searchAriaLabel: string;
  sceneId: string;
  settingsLabel: string;
}

function Icon({ className }: { className: string }) {
  return (
    <i
      aria-hidden="true"
      className={`ri-icon ${className || 'ri-link'}`}
    />
  );
}

function SuggestionInlineIcon({
  className,
  iconClass,
  tone
}: {
  className?: string;
  iconClass: string;
  tone?: string;
}) {
  return (
    <span
      className={className || 'x-ov-suggestion-inline-icon'}
      data-tone={tone}
    >
      <Icon className={iconClass} />
    </span>
  );
}

function ResultFavicon({
  active,
  result
}: {
  active: boolean;
  result: BookmarkFocusResult;
}) {
  const [failed, setFailed] = useState(false);
  const type = String(result.type || '');
  const favicon = String(result.favicon || '').trim();
  const usesInlineIcon = [
    'newtab',
    'googleSuggest',
    'browserPage',
    'commandNewTab',
    'commandSettings'
  ].includes(type);
  const hasImage = Boolean(!usesInlineIcon && favicon && !failed);
  let content = (
    <SuggestionInlineIcon iconClass="ri-link" />
  );
  if (type === 'newtab' || type === 'googleSuggest') {
    content = (
      <SuggestionInlineIcon iconClass="ri-search-line" tone="subtext" />
    );
  } else if (type === 'browserPage') {
    content = <SuggestionInlineIcon iconClass="ri-link" />;
  } else if (type === 'commandNewTab') {
    content = (
      <SuggestionInlineIcon iconClass="ri-add-line" tone="subtext" />
    );
  } else if (type === 'commandSettings') {
    content = (
      <SuggestionInlineIcon iconClass="ri-settings-3-line" tone="subtext" />
    );
  } else if (type === 'commandDocumentPip') {
    content = (
      <SuggestionInlineIcon iconClass="ri-scissors-cut-line" tone="subtext" />
    );
  } else if (result.iconClass) {
    content = (
      <SuggestionInlineIcon iconClass={String(result.iconClass)} tone="subtext" />
    );
  } else if (hasImage) {
    content = (
      <img
        alt=""
        className="x-ov-suggestion-favicon"
        decoding="async"
        loading="eager"
        onError={() => setFailed(true)}
        referrerPolicy="no-referrer"
        src={favicon}
      />
    );
  }

  return (
    <span
      className="x-ov-suggestion-icon-slot"
      data-emphasis={active ? 'true' : 'false'}
      data-favicon={hasImage ? 'true' : 'false'}
    >
      {content}
    </span>
  );
}

function SourceTag({
  active,
  result
}: {
  active: boolean;
  result: BookmarkFocusResult;
}) {
  if (!result.sourceTag) {
    return null;
  }
  const themeStyle = active && result.theme
    ? {
        '--x-ov-suggestion-source-tag-bg': result.theme.tagBg,
        '--x-ov-suggestion-source-tag-text': result.theme.tagText,
        '--x-ov-suggestion-source-tag-border': result.theme.tagBorder
      } as CSSProperties
    : undefined;
  const bookmarkStyle = !themeStyle && result.sourceTagKind === 'bookmark'
    ? {
        '--x-ov-suggestion-source-tag-bg':
          'var(--x-ov-bookmark-tag-bg, #FEF3C7)',
        '--x-ov-suggestion-source-tag-text':
          'var(--x-ov-bookmark-tag-text, #D97706)'
      } as CSSProperties
    : undefined;
  return (
    <span
      className="x-ov-suggestion-source-tag"
      data-tag-type={result.sourceTagKind || undefined}
      data-visible="true"
      style={themeStyle || bookmarkStyle}
    >
      {String(result.sourceTag)}
    </span>
  );
}

function InlineAction({
  iconClass,
  label
}: {
  iconClass: string;
  label: string;
}) {
  return (
    <>
      <span className="x-ov-inline-label">{label}</span>
      <span className="x-ov-inline-icon">
        <Icon className={iconClass} />
      </span>
    </>
  );
}

function OverlayResult({
  active,
  index,
  model,
  result
}: {
  active: boolean;
  index: number;
  model: BookmarkFocusModel;
  result: BookmarkFocusResult;
}) {
  const hasActionTags = Boolean(result.actionTagLabel);
  const showActionTag = active && hasActionTags;
  const command = Boolean(result.commandText);
  const theme = result.theme;
  const style = {
    '--result-index': String(index),
    '--x-ov-suggestion-title-weight': active ? '600' : '400',
    ...(active
      ? {
          '--x-ov-suggestion-row-bg':
            theme?.highlightBg || 'var(--x-ov-hover-bg, #f3f4f6)'
        }
      : {}),
    ...(active && theme
      ? {
          '--x-ext-mark-bg': theme.activeMarkBg,
          '--x-ext-mark-text': theme.activeMarkText,
          '--x-ext-tag-bg': theme.tagBg,
          '--x-ext-tag-text': theme.tagText,
          '--x-ext-tag-border': theme.tagBorder,
          '--x-ext-key-bg': theme.keyBg,
          '--x-ext-key-text': theme.keyText,
          '--x-ext-key-border': theme.keyBorder,
          '--x-ov-suggestion-action-button-bg': theme.buttonBg,
          '--x-ov-suggestion-action-button-text': theme.buttonText,
          '--x-ov-suggestion-action-button-border': theme.buttonBorder
        }
      : {})
  } as CSSProperties;

  return (
    <div
      className="x-ov-suggestion-item lumno-overlay-result"
      data-active={active ? 'true' : 'false'}
      data-demo-index={String(index)}
      data-has-action-tags={hasActionTags ? 'true' : 'false'}
      data-history-deletable={result.historyDeletable ? 'true' : 'false'}
      data-last={index === model.results.length - 1 ? 'true' : 'false'}
      data-row-state={active ? 'active' : undefined}
      data-command-row={command ? 'true' : undefined}
      data-type={String(result.type || '')}
      style={style}
    >
      <div className="x-ov-suggestion-left" data-motion="true">
        <ResultFavicon active={active} result={result} />
        <div className="x-ov-suggestion-text">
          {command ? (
            <span className="x-ov-suggestion-command">
              <HighlightedText
                query={model.query}
                text={String(result.commandText || '')}
              />
            </span>
          ) : null}
          <span
            className={
              command
                ? 'x-ov-suggestion-title x-ov-suggestion-command-description'
                : 'x-ov-suggestion-title'
            }
          >
            {command ? String(result.title || '') : (
              <HighlightedText
                query={model.query}
                text={String(result.title || '')}
              />
            )}
          </span>
          {result.detail ? (
            <span
              className={
                result.type === 'bookmark'
                  ? 'x-ov-suggestion-bookmark-path'
                  : 'x-ov-suggestion-url-line'
              }
            >
              {String(result.detail)}
            </span>
          ) : null}
          <SourceTag active={active} result={result} />
        </div>
      </div>
      <div
        className="x-ov-suggestion-right"
        data-action-column={
          hasActionTags || !result.visitButtonHidden ? 'true' : undefined
        }
      >
        <div
          className="x-ov-suggestion-action-tags"
          data-visible={showActionTag ? 'true' : 'false'}
        >
          {hasActionTags ? (
            <span className="x-ov-action-tag">
              <span className="x-ov-action-tag__label">
                {String(result.actionTagLabel || model.openLabel)}
              </span>
              <span className="x-ov-action-tag__key">
                {String(result.actionTagKey || 'Enter')}
              </span>
            </span>
          ) : null}
        </div>
        <button
          className="x-ov-suggestion-action-button x-ov-suggestion-visit-button"
          data-visible={
            showActionTag || result.visitButtonHidden ? 'false' : 'true'
          }
          type="button"
        >
          <InlineAction
            iconClass="ri-arrow-right-line ri-size-12"
            label={String(result.visitButtonLabel || model.openLabel)}
          />
        </button>
        {result.historyDeletable ? (
          <div className="x-ov-suggestion-utility-slot" data-visible="false">
            <button
              aria-label={model.removeHistoryLabel}
              className="x-ov-suggestion-utility-button"
              data-visible="false"
              type="button"
            >
              <Icon className="ri-delete-bin-6-line" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function QueryText({ query }: { query: string }) {
  const characters = Array.from(String(query || ''));
  const stepMs = 1040 / Math.max(1, characters.length);
  return (
    <span className="lumno-overlay-query-text">
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

function OverlayPanel({
  activeIndex,
  model
}: {
  activeIndex: number;
  model: BookmarkFocusModel;
}) {
  return (
    <div
      aria-label={model.overlayAriaLabel}
      className="lumno-overlay-panel"
      data-demo-scene={model.sceneId}
      id={model.panelId}
    >
      <div className="x-lumno-search-input x-lumno-search-input__container">
        <span className="x-lumno-search-input__icon">
          <Icon className="ri-search-line ri-size-16" />
        </span>
        <div
          aria-label={model.searchAriaLabel}
          className="x-lumno-search-input__field lumno-overlay-query"
          role="searchbox"
        >
          <QueryText key={model.sceneId} query={model.query} />
          <span aria-hidden="true" className="lumno-overlay-query-caret" />
        </div>
        <span className="x-lumno-search-input__divider" />
        <button
          aria-label={model.settingsLabel}
          className="x-lumno-search-input__right-icon"
          type="button"
        >
          <Icon className="ri-settings-line ri-size-16" />
        </button>
        <div
          className="x-lumno-search-input-mode__badge"
          data-surface="overlay"
          data-visible="false"
        />
      </div>
      <div className="x-ov-suggestions-container lumno-overlay-results">
        {model.results.map((result, index) => (
          <OverlayResult
            active={index === activeIndex}
            index={index}
            key={`${model.sceneId}-${String(result.type || '')}-${index}`}
            model={model}
            result={result}
          />
        ))}
      </div>
    </div>
  );
}

export function BookmarkFocusDemo({ model }: { model: BookmarkFocusModel }) {
  const resultCount = model.results.length;
  const [activeIndex, setActiveIndex] = useState(
    model.reducedMotion && resultCount > 0 ? 0 : -1
  );

  useEffect(() => {
    if (model.reducedMotion) {
      setActiveIndex(resultCount > 0 ? 0 : -1);
      return undefined;
    }
    setActiveIndex(-1);
    if (resultCount <= 0) {
      return undefined;
    }

    let startTimeout = 0;
    let stepTimeout = 0;
    const scheduleStep = (
      currentIndex: number,
      firstStepDelay?: number
    ): void => {
      const wrapping = currentIndex >= resultCount - 1;
      const delay = Number(firstStepDelay) > 0
        ? Number(firstStepDelay)
        : (
            wrapping
              ? model.hoverStepMs + model.hoverWrapStepMs
              : model.hoverStepMs
          );
      stepTimeout = window.setTimeout(() => {
        const nextIndex = wrapping ? 0 : currentIndex + 1;
        setActiveIndex(nextIndex);
        scheduleStep(nextIndex);
      }, delay);
    };

    startTimeout = window.setTimeout(() => {
      setActiveIndex(0);
      if (model.hoverStepMs <= 0) {
        return;
      }
      scheduleStep(0, model.hoverStepMs + model.hoverLeadMs);
    }, model.hoverStartMs);

    return () => {
      if (startTimeout) {
        window.clearTimeout(startTimeout);
      }
      if (stepTimeout) {
        window.clearTimeout(stepTimeout);
      }
    };
  }, [
    model.hoverLeadMs,
    model.hoverStartMs,
    model.hoverStepMs,
    model.hoverWrapStepMs,
    model.reducedMotion,
    model.sceneId,
    resultCount
  ]);

  return (
    <>
      <OverlayPanel activeIndex={activeIndex} model={model} />
    </>
  );
}
