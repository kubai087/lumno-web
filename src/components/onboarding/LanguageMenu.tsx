interface Props {
  currentLabel?: string;
  toggleAriaLabel?: string;
}

export default function LanguageMenu({ currentLabel = "简体中文", toggleAriaLabel = "语言" }: Props) {
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
        <button className="lang-option" type="button" role="menuitemradio" data-lang-value="zh-CN" data-i18n="language_zh_cn">
          简体中文
        </button>
        <button className="lang-option" type="button" role="menuitemradio" data-lang-value="zh-TW" data-i18n="language_zh_tw">
          繁體中文
        </button>
        <button className="lang-option" type="button" role="menuitemradio" data-lang-value="en" data-i18n="language_en">
          English
        </button>
        <button className="lang-option" type="button" role="menuitemradio" data-lang-value="ja" data-i18n="language_ja">
          日本語
        </button>
        <button className="lang-option" type="button" role="menuitemradio" data-lang-value="ko" data-i18n="language_ko">
          한국어
        </button>
        <button className="lang-option" type="button" role="menuitemradio" data-lang-value="fr" data-i18n="language_fr">
          Français
        </button>
        <button className="lang-option" type="button" role="menuitemradio" data-lang-value="de" data-i18n="language_de">
          Deutsch
        </button>
        <button className="lang-option" type="button" role="menuitemradio" data-lang-value="es" data-i18n="language_es">
          Español
        </button>
      </div>
    </div>
  );
}
