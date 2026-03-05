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
        className="pill-btn pill-btn-selected lang-toggle"
        type="button"
        data-i18n-aria-label="language_select_aria"
        aria-label="语言"
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <i className="ri-global-line" aria-hidden="true"></i>
      </button>
      <div id="language-menu" className="lang-menu" role="menu" hidden>
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
