import { motion } from "motion/react";

export default function LanguageMenu() {
  return (
    <motion.div
      className="lang-control"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
    >
      <button
        id="language-toggle"
        className="lang-toggle lang-select-toggle"
        type="button"
        data-i18n-aria-label="language_select_aria"
        aria-label="语言"
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <span className="lang-select-prefix">
          <i className="ri-global-line" aria-hidden="true"></i>
        </span>
        <span id="language-current-label" className="lang-current-label" data-i18n="language_zh_cn">
          简体中文
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
      </div>
    </motion.div>
  );
}
