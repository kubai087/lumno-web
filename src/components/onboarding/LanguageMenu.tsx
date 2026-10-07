import { SettingsSelect } from "../extension-settings/SettingsKit";

interface Props {
  currentLabel?: string;
  toggleAriaLabel?: string;
  locales?: Array<"zh-CN" | "zh-TW" | "en">;
  iconOnly?: boolean;
  placement?: "above" | "below";
  // Localized URLs per locale; rendering options as links keeps every language version crawlable.
  hrefs?: Record<string, string>;
}

const LANGUAGE_OPTIONS = [
  { value: "zh-CN", label: "简体中文", i18n: "language_zh_cn" },
  { value: "zh-TW", label: "繁體中文", i18n: "language_zh_tw" },
  { value: "en", label: "English", i18n: "language_en" },
] as const;

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
