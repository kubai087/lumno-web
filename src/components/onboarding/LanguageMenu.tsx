interface Props {
  currentLabel?: string;
  toggleAriaLabel?: string;
  locales?: Array<"zh-CN" | "zh-TW" | "en">;
}

const LANGUAGE_OPTIONS = [
  { value: "zh-CN", label: "简体中文", i18n: "language_zh_cn" },
  { value: "zh-TW", label: "繁體中文", i18n: "language_zh_tw" },
  { value: "en", label: "English", i18n: "language_en" },
] as const;

export default function LanguageMenu({ currentLabel = "简体中文", toggleAriaLabel = "语言", locales }: Props) {
  const enabledLocales = locales?.length ? new Set(locales) : null;
  const options = enabledLocales
    ? LANGUAGE_OPTIONS.filter((option) => enabledLocales.has(option.value))
    : LANGUAGE_OPTIONS;

  return (
    <div className="lang-control">
      <button
        id="language-toggle"
        className="lang-toggle lang-select-toggle"
        type="button"
        data-i18n-aria-label="language_select_aria"
        aria-label={toggleAriaLabel}
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <span className="lang-select-prefix">
          <i className="ri-global-line" aria-hidden="true"></i>
        </span>
        <span id="language-current-label" className="lang-current-label">
          {currentLabel}
        </span>
        <span className="lang-select-arrow" aria-hidden="true">
          <i className="ri-arrow-down-s-line"></i>
        </span>
      </button>
      <div id="language-menu" className="lang-menu" role="menu" data-open="false">
        {options.map((option) => (
          <button
            key={option.value}
            className="lang-option"
            type="button"
            role="menuitemradio"
            data-lang-value={option.value}
            data-i18n={option.i18n}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
