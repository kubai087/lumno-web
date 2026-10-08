import { SettingsSelect } from "../extension-settings/SettingsKit";
import { LOCALE_CONFIG, type SupportedLocale } from "../../lib/locales";

interface Props {
  currentLabel?: string;
  toggleAriaLabel?: string;
  locales?: SupportedLocale[];
  iconOnly?: boolean;
  placement?: "above" | "below";
  // Localized URLs per locale; rendering options as links keeps every language version crawlable.
  hrefs?: Record<string, string>;
}

// Each language is listed under its own name; `i18n` doubles as the hook the runtime uses to find options.
const LANGUAGE_OPTIONS = LOCALE_CONFIG.map((item) => ({
  value: item.code,
  label: item.label,
  i18n: `language_${item.code.toLowerCase().replace("-", "_")}`,
}));

export default function LanguageMenu({
  currentLabel = "简体中文",
  toggleAriaLabel = "语言",
  locales,
  iconOnly = false,
  placement = "below",
  hrefs = {},
}: Props) {
  const enabledLocales = locales?.length ? new Set(locales) : null;
  const options = enabledLocales
    ? LANGUAGE_OPTIONS.filter((option) => enabledLocales.has(option.value))
    : LANGUAGE_OPTIONS;
  const items = options.map((option) => ({ ...option, href: hrefs[option.value] }));
  const currentValue = options.find((option) => option.label === currentLabel)?.value || options[0]?.value;

  return (
    <div className="lang-control">
      <SettingsSelect
        className="lang-select"
        id="language-toggle"
        menuId="language-menu"
        menuRole="menu"
        optionRole="menuitemradio"
        triggerMode={iconOnly ? "icon" : "default"}
        triggerIconClass="ri-global-line"
        triggerClassName="lang-toggle lang-select-toggle"
        triggerPrefixClassName="lang-select-prefix"
        triggerValueClassName="lang-current-label"
        triggerValueId="language-current-label"
        triggerChevronClassName="lang-select-arrow"
        triggerDataI18nAriaLabel="language_select_aria"
        menuPlacement={placement}
        openStateEvent="lumno:language-menu-state"
        label={toggleAriaLabel}
        defaultValue={currentValue}
        items={items}
      />
    </div>
  );
}
