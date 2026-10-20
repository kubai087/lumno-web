import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { useCardDemo } from "./demo";
import { useExtensionText } from "./ext-strings";
import { useSegmentedIndicator } from "./extension/segmented-indicator";
import { useToast } from "./FeedbackCards";
import { NtScope } from "./NewTab";
import { useDesignTheme, type ThemeMode } from "./theme";

/*
 * Controls from the extension's options page. Each card is a piece of the page
 * as it is: a settings panel opening on a section header, then real rows in
 * the page's own markup and words (extension/strings.ts). The CSS is the
 * page's own (extension/options.css), so sizes and spacing are the page's.
 */

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  const { resolved } = useDesignTheme();
  // The host is the panel's size container, for the page's narrow layout (extension/options.css @container dg-panel).
  return (
    <div className={["dg-ext-panel-host", className].filter(Boolean).join(" ")}>
      <div className="_x_extension_settings_panel_2024_unique_ dg-ext-panel" data-theme={resolved}>
        <div className="_x_extension_settings_content_2024_unique_" data-active="true">
          {children}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="_x_extension_setting_row_2024_unique_ _x_extension_section_header_2026_unique_">
      <p className="_x_extension_section_title_2024_unique_">{title}</p>
      {children}
    </div>
  );
}

/** The ⓘ beside a title; its tooltip (shared/tooltip.css) shows on hover or focus. */
function InfoButton({ text }: { text: string }) {
  const [shown, setShown] = useState(false);
  return (
    <span
      className="_x_extension_info_button_2026_unique_ _x_extension_tooltip_host_2026_unique_ dg-ext-info"
      aria-label={text}
      role="img"
      tabIndex={0}
      onPointerEnter={() => setShown(true)}
      onPointerLeave={() => setShown(false)}
      onFocus={() => setShown(true)}
      onBlur={() => setShown(false)}
    >
      <i className="ri-icon ri-size-14 ri-information-line" aria-hidden="true" />
      <span className="_x_extension_tooltip_2026_unique_ dg-ext-info__tooltip" data-tooltip-position="absolute" data-visible={shown ? "true" : "false"} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

/** A settings row: title (with ⓘ) and description on the left, the control on the right. */
function Row({ title, description, info, compact = true, className, children }: { title: string; description?: string; info?: string; compact?: boolean; className?: string; children?: ReactNode }) {
  return (
    <div className={["_x_extension_setting_row_2024_unique_", compact ? "_x_extension_setting_row_compact_2024_unique_" : "", className].filter(Boolean).join(" ")}>
      <div>
        <p className={["_x_extension_setting_title_2024_unique_", info ? "_x_extension_setting_title_with_icon_2024_unique_" : ""].filter(Boolean).join(" ")}>
          <span>{title}</span>
          {info ? <InfoButton text={info} /> : null}
        </p>
        {description ? <p className="_x_extension_setting_desc_2024_unique_">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

/** shared/switch.css markup: <label><input type="checkbox"><span class="slider"></span></label>. */
function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="_x_extension_switch_2024_unique_">
      <input type="checkbox" aria-label={label} checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="_x_extension_switch_slider_2024_unique_" aria-hidden="true" />
    </label>
  );
}

function useMac() {
  const [mac, setMac] = useState(true);
  useEffect(() => {
    setMac(document.documentElement.dataset.platform !== "other");
  }, []);
  return mac;
}

/* ---------- Buttons ---------- */

/** The page's two button kinds as it uses them: the compact secondary 新手引导 and the primary 前往快捷键设置. */
/*
 * The pill buttons where they live: the new tab's shortcut dialog
 * (shortcut-dialog.tsx), editing a shortcut. 保存 presses, the dialog confirms
 * with the extension's toast, and the form is back as it was.
 */
export function ButtonCard() {
  const t = useExtensionText();
  const toast = useToast();
  const [pressed, setPressed] = useState<"cancel" | "save" | null>(null);
  const [name, setName] = useState("GitHub");
  const [url, setUrl] = useState("https://github.com/");
  const save = () => {
    toast.clear();
    toast.show(t("newtab_shortcuts_edited"));
  };
  useCardDemo((timeline) => {
    timeline.at(0, () => setPressed(null));
    timeline.at(800, () => setPressed("save"));
    timeline.at(960, () => {
      setPressed(null);
      save();
    });
  });
  const field = (label: string, value: string, onChange: (value: string) => void) => (
    <label className="x-nt-shortcut-field">
      <span>{label}</span>
      <div className="_x_extension_shortcut_input_affix_2026_unique_" data-has-prefix="false">
        <input type="text" autoComplete="off" spellCheck={false} className="_x_extension_shortcut_input_2024_unique_" value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </label>
  );
  return (
    <NtScope className="dg-feedback">
      {toast.node}
      <div className="x-nt-shortcut-dialog-backdrop dg-pat-dialog-piece dg-button-dialog" data-open="true">
        <div className="x-nt-shortcut-dialog" role="dialog" aria-label={t("newtab_shortcuts_edit_dialog_title")}>
          <form
            className="x-nt-shortcut-form"
            data-item-type="shortcut"
            onSubmit={(event) => {
              event.preventDefault();
              save();
            }}
          >
            <h2 className="x-nt-shortcut-dialog-title">{t("newtab_shortcuts_edit_dialog_title")}</h2>
            {field(t("newtab_shortcuts_name_label"), name, setName)}
            {field(t("newtab_shortcuts_url_label"), url, setUrl)}
            <div className="x-nt-shortcut-dialog-actions">
              <button
                type="button"
                className="x-lumno-action-button x-lumno-action-button--secondary x-nt-shortcut-dialog-button x-nt-shortcut-dialog-button--secondary"
                data-dg-pressed={pressed === "cancel" ? "true" : undefined}
                onClick={() => {
                  setName("GitHub");
                  setUrl("https://github.com/");
                }}
              >
                {t("newtab_shortcuts_cancel")}
              </button>
              <button type="submit" className="x-lumno-action-button x-lumno-action-button--primary x-nt-shortcut-dialog-button x-nt-shortcut-dialog-button--primary" data-dg-pressed={pressed === "save" ? "true" : undefined}>
                {t("newtab_shortcuts_save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </NtScope>
  );
}

/* ---------- Switches ---------- */

export function SwitchCard() {
  const t = useExtensionText();
  const [notice, setNotice] = useState(true);
  const [pip, setPip] = useState(false);
  useCardDemo((timeline) => {
    timeline.at(0, () => {
      setNotice(true);
      setPip(false);
    });
    timeline.at(600, () => setPip(true));
    timeline.at(1400, () => setNotice(false));
    timeline.at(2200, () => setNotice(true));
    timeline.at(2900, () => setPip(false));
  });
  return (
    <Panel>
      <SectionHeader title={t("settings_global_section_title")} />
      <Row title={t("settings_update_notice_title")} description={t("settings_update_notice_desc")}>
        <Switch label={t("settings_update_notice_title")} checked={notice} onChange={setNotice} />
      </Row>
      <Row title={t("settings_auto_pip_title")} info={t("settings_auto_pip_desc")}>
        <Switch label={t("settings_auto_pip_title")} checked={pip} onChange={setPip} />
      </Row>
    </Panel>
  );
}

/* ---------- Checkboxes ---------- */

export function CheckboxCard() {
  const t = useExtensionText();
  const items = [
    { value: "topSite", label: t("search_tag_top_site") },
    { value: "bookmark", label: t("search_tag_bookmark") },
    { value: "history", label: t("search_tag_history") },
  ];
  const [checked, setChecked] = useState([true, true, true]);
  // At least one source stays on, as options-required-checkbox-group keeps it.
  const toggle = (index: number) =>
    setChecked((values) => {
      const next = values.map((value, i) => (i === index ? !value : value));
      return next.some(Boolean) ? next : values;
    });
  useCardDemo((timeline) => {
    timeline.at(0, () => setChecked([true, true, true]));
    timeline.at(600, () => setChecked([true, false, true]));
    timeline.at(1200, () => setChecked([true, false, false]));
    timeline.at(2000, () => setChecked([true, true, false]));
    timeline.at(2600, () => setChecked([true, true, true]));
  });
  return (
    <Panel>
      <SectionHeader title={t("settings_search_results_section_title")} />
      <Row title={t("settings_search_result_sources_title")} info={t("settings_search_result_sources_order_desc")}>
        <div className="_x_extension_checkbox_group_2026_unique_" role="group" aria-label={t("settings_search_result_sources_title")}>
          {items.map((item, index) => (
            <label className="_x_extension_checkbox_2026_unique_" data-value={item.value} key={item.value}>
              <input type="checkbox" checked={checked[index]} onChange={() => toggle(index)} />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </Row>
    </Panel>
  );
}

/* ---------- Segmented ---------- */

/** options/segmented-control.tsx: a sliding indicator under _x_extension_theme_option buttons. */
function Segmented<T extends string>({ label, value, items, onChange }: { label: string; value: T; items: Array<{ value: T; label: string }>; onChange: (value: T) => void }) {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  useSegmentedIndicator(indicatorRef, `${value}\u0002${items.map((item) => item.label).join("\u0001")}`);
  return (
    <div className="_x_extension_theme_picker_2024_unique_ _x_extension_inline_tabs_2024_unique_" role="radiogroup" aria-label={label}>
      <span aria-hidden="true" className="_x_extension_theme_indicator_2024_unique_" data-ready="false" ref={indicatorRef} />
      {items.map((item) => (
        <button
          type="button"
          role="radio"
          className="_x_extension_theme_option_2024_unique_"
          aria-checked={item.value === value}
          data-active={item.value === value ? "true" : "false"}
          tabIndex={item.value === value ? 0 : -1}
          onClick={() => onChange(item.value)}
          key={item.value}
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

/** The appearance tab's 网页聚焦搜索浮层 section: overlay size and entry animation. */
export function SegmentedCard() {
  const t = useExtensionText();
  const [size, setSize] = useState<"compact" | "standard" | "large">("standard");
  const [entry, setEntry] = useState<"elastic" | "fade">("elastic");
  useCardDemo((timeline) => {
    timeline.at(0, () => {
      setSize("standard");
      setEntry("elastic");
    });
    timeline.at(600, () => setSize("large"));
    timeline.at(1300, () => setSize("compact"));
    timeline.at(2000, () => setEntry("fade"));
    timeline.at(2700, () => setSize("standard"));
    timeline.at(3300, () => setEntry("elastic"));
  });
  return (
    <Panel>
      <SectionHeader title={t("settings_webpage_focus_overlay_section_title")} />
      <Row title={t("settings_overlay_size_title")} compact={false}>
        <div className="_x_extension_recent_select_group_2024_unique_">
          <Segmented
            label={t("settings_overlay_size_title")}
            value={size}
            onChange={setSize}
            items={[
              { value: "compact", label: t("overlay_size_compact") },
              { value: "standard", label: t("overlay_size_standard") },
              { value: "large", label: t("overlay_size_large") },
            ]}
          />
        </div>
      </Row>
      <Row title={t("settings_overlay_enter_animation_title")} compact={false}>
        <Segmented
          label={t("settings_overlay_enter_animation_title")}
          value={entry}
          onChange={setEntry}
          items={[
            { value: "elastic", label: t("overlay_enter_animation_elastic") },
            { value: "fade", label: t("overlay_enter_animation_fade") },
          ]}
        />
      </Row>
    </Panel>
  );
}

/* ---------- Select ---------- */

/** shared/custom-select.css + select-menu.tsx: trigger, then a menu surface sized to its content. */
export function Select({ label, value, items, onChange, className = "_x_extension_select_wrap_auto_2024_unique_ _x_extension_select_align_right_2024_unique_" }: { label: string; value: string; items: Array<{ value: string; label: string }>; onChange: (value: string) => void; className?: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = items.find((item) => item.value === value) || items[0];

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) setOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((index) => (index + step + items.length) % items.length);
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && open && active >= 0) {
      event.preventDefault();
      onChange(items[active].value);
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapRef}
      className={`_x_extension_select_wrap_2024_unique_ _x_extension_custom_select_2024_unique_ ${className}`}
      data-open={open ? "true" : "false"}
      data-disabled="false"
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className="_x_extension_select_trigger_2024_unique_"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => {
          setActive(items.indexOf(selected));
          setOpen((value) => !value);
        }}
      >
        <span className="_x_extension_select_label_2024_unique_">{selected.label}</span>
        <i className="_x_extension_select_icon_2024_unique_ ri-icon ri-size-16 ri-arrow-down-s-line" aria-hidden="true" />
      </button>
      {/* select-menu.tsx places the menu 38px down, at least as wide as the trigger. */}
      <div
        className="_x_extension_select_menu_2024_unique_ _x_extension_menu_surface_2024_unique_"
        data-menu-surface-width="content"
        data-open={open ? "true" : "false"}
        role="listbox"
        aria-hidden={!open}
        style={
          {
            "--x-extension-menu-surface-max-width": "calc(100vw - 32px)",
            "--x-extension-menu-surface-min-width": "100%",
            transformOrigin: "right top",
            position: "absolute",
            top: 38,
            left: 0,
            right: "auto",
            zIndex: 10,
          } as CSSProperties
        }
      >
        {items.map((item, index) => (
          <div
            className="_x_extension_select_option_2024_unique_"
            role="option"
            aria-selected={item.value === value}
            data-selected={item.value === value ? "true" : "false"}
            data-value={item.value}
            data-active={open && active === index ? "true" : undefined}
            onMouseEnter={() => setActive(index)}
            onClick={() => {
              onChange(item.value);
              setOpen(false);
            }}
            key={item.value}
          >
            <span className="_x_extension_select_option_label_2026_unique_">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SelectCard() {
  const t = useExtensionText();
  const [language, setLanguage] = useState("system");
  return (
    <Panel className="dg-ext-panel--top">
      <SectionHeader title={t("settings_global_section_title")} />
      <Row title={t("settings_language_title")} compact={false}>
        <Select
          label={t("settings_language_title")}
          value={language}
          onChange={setLanguage}
          items={[
            { value: "system", label: t("language_system") },
            { value: "zh-CN", label: t("language_zh_cn") },
            { value: "zh-TW", label: t("language_zh_tw") },
            { value: "ja", label: t("language_ja") },
            { value: "en", label: t("language_en") },
          ]}
        />
      </Row>
    </Panel>
  );
}

/* ---------- Text fields ---------- */

/** The account tab's WebDAV form (webdav-list.tsx): labelled fields in a two-column grid, a password you can reveal. */
export function InputCard({ zh }: { zh: boolean }) {
  const t = useExtensionText();
  const [values, setValues] = useState({ endpoint: "", password: "" });
  const [visible, setVisible] = useState(false);
  // Two of the form's four fields: the address, and the password you can reveal.
  const fields = [{ name: "endpoint", type: "url", placeholder: zh ? "https://dav.jianguoyun.com/dav/" : "https://dav.example.com/", label: t("webdav_endpoint") }] as const;
  return (
    <Panel>
      <SectionHeader title={t("webdav_title")} />
      <div className="lumno-webdav-form-grid dg-ext-form">
        {fields.map((field) => (
          <div className="_x_extension_shortcut_field_2024_unique_" key={field.name}>
            <label className="_x_extension_shortcut_label_2024_unique_" htmlFor={`dg-webdav-${field.name}`}>
              <span>{field.label}</span>
              <span className="_x_extension_shortcut_required_2024_unique_">*</span>
            </label>
            <input
              className="_x_extension_shortcut_input_2024_unique_"
              id={`dg-webdav-${field.name}`}
              type={field.type}
              placeholder={field.placeholder}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck={false}
              value={values[field.name]}
              onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
            />
          </div>
        ))}
        <div className="_x_extension_shortcut_field_2024_unique_">
          <label className="_x_extension_shortcut_label_2024_unique_" htmlFor="dg-webdav-password">
            <span>{t("webdav_password")}</span>
            <span className="_x_extension_shortcut_required_2024_unique_">*</span>
          </label>
          <div className="_x_extension_shortcut_input_affix_2026_unique_ lumno-webdav-password" data-has-prefix="false">
            <input
              className="_x_extension_shortcut_input_2024_unique_"
              id="dg-webdav-password"
              type={visible ? "text" : "password"}
              autoComplete="off"
              spellCheck={false}
              value={values.password}
              onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
            />
            <button
              type="button"
              className="lumno-webdav-password-icon"
              aria-label={t(visible ? "webdav_password_hide" : "webdav_password_show")}
              title={t(visible ? "webdav_password_hide" : "webdav_password_show")}
              aria-pressed={visible}
              onClick={() => setVisible((value) => !value)}
            >
              <i className={`ri-icon ri-size-16 ${visible ? "ri-eye-off-line" : "ri-eye-line"}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ---------- Shortcuts ---------- */

/** The shortcuts list (shortcut-reference.tsx): a group, then each command with its keys in a field. */
export function ShortcutRecorderCard() {
  const t = useExtensionText();
  const mac = useMac();
  const items = [
    { title: t("shortcut_reference_tab_switcher_title"), keys: mac ? "⌥Q" : "Alt+Q" },
    { title: t("shortcut_reference_tab_switcher_confirm_title"), keys: mac ? "↩ / ⌥↑" : "Enter / Alt+↑" },
  ];
  return (
    <Panel>
      <div className="_x_extension_setting_row_2024_unique_ _x_extension_setting_row_compact_2024_unique_ _x_extension_setting_group_row_2026_unique_">
        <div>
          <p className="_x_extension_setting_title_2024_unique_">{t("shortcut_reference_group_tab_switcher")}</p>
        </div>
      </div>
      {items.map((item) => (
        <div
          className="_x_extension_setting_row_2024_unique_ _x_extension_setting_row_compact_2024_unique_ _x_extension_setting_subrow_2026_unique_ _x_extension_shortcut_reference_item_2026_unique_"
          key={item.title}
        >
          <div>
            <p className="_x_extension_setting_title_2024_unique_">{item.title}</p>
          </div>
          <div className="_x_extension_shortcut_reference_actions_2026_unique_">
            <div className="_x_extension_shortcut_reference_key_field_2026_unique_">{item.keys}</div>
          </div>
        </div>
      ))}
    </Panel>
  );
}

/* ---------- Tabs ---------- */

type SettingsTab = "general" | "appearance" | "labs";

/*
 * Two tab bars: the options page's (settings-navigation.tsx, a frame with a
 * sliding pill and filled icons), and the new tab's acrylic one that sits on
 * its glass panels (newtab.css .x-nt-wallpaper-tabs on glass-style.css's tokens).
 */
export function TabsCard() {
  const t = useExtensionText();
  const [tab, setTab] = useState<SettingsTab>("appearance");
  const [glassTab, setGlassTab] = useState<"light" | "dark">("light");
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const glassIndicatorRef = useRef<HTMLSpanElement>(null);
  const items: Array<{ value: SettingsTab; label: string; iconClass: string }> = [
    { value: "general", label: t("settings_tab_general"), iconClass: "ri-command-fill" },
    { value: "appearance", label: t("settings_tab_appearance"), iconClass: "ri-moon-clear-fill" },
    { value: "labs", label: t("settings_tab_labs"), iconClass: "ri-test-tube-fill" },
  ];
  useSegmentedIndicator(indicatorRef, `${tab}\u0002${items.map((item) => item.label).join("\u0001")}`);
  useSegmentedIndicator(glassIndicatorRef, `${glassTab}\u0002${t("settings_theme_light")}\u0001${t("settings_theme_dark")}`);
  useCardDemo((timeline) => {
    timeline.at(0, () => {
      setTab("appearance");
      setGlassTab("light");
    });
    timeline.at(600, () => setTab("general"));
    timeline.at(1200, () => setGlassTab("dark"));
    timeline.at(1800, () => setTab("labs"));
    timeline.at(2400, () => setGlassTab("light"));
    timeline.at(3000, () => setTab("appearance"));
  });
  return (
    <div className="dg-ext-tabs">
      <div className="_x_extension_settings_tabs_frame_2026_unique_">
        <div className="_x_extension_settings_tabs_2024_unique_" role="tablist">
          <span aria-hidden="true" className="_x_extension_tabs_indicator_2024_unique_" ref={indicatorRef} />
          {items.map((item) => (
            <button
              type="button"
              role="tab"
              aria-selected={item.value === tab}
              className="_x_extension_settings_tab_button_2024_unique_"
              data-active={item.value === tab ? "true" : "false"}
              onClick={() => setTab(item.value)}
              key={item.value}
            >
              <i aria-hidden="true" className={`_x_extension_tab_icon_2024_unique_ ri-icon ${item.iconClass}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* glass-style.css: the new tab's frosted (亚克力) panel, where the tabs are layers of the glass. */}
      <NtScope className="dg-acrylic-host" glass="frosted">
        <div className="x-nt-wallpaper-panel dg-acrylic-panel" data-open="true">
          <div className="x-nt-wallpaper-tabs x-nt-segmented-tabs" role="tablist">
            <span aria-hidden="true" className="x-nt-wallpaper-tabs-indicator x-nt-segmented-tabs-indicator" ref={glassIndicatorRef} />
            {(["light", "dark"] as const).map((value) => (
              <button
                type="button"
                role="tab"
                aria-selected={value === glassTab}
                className="x-nt-wallpaper-tab x-nt-segmented-tab"
                data-active={value === glassTab ? "true" : "false"}
                onClick={() => setGlassTab(value)}
                key={value}
              >
                {value === "light" ? t("settings_theme_light") : t("settings_theme_dark")}
              </button>
            ))}
          </div>
        </div>
      </NtScope>
    </div>
  );
}

/* ---------- Theme gallery ---------- */

const THEME_PREVIEWS: Array<{ mode: ThemeMode; key: "settings_theme_system" | "settings_theme_light" | "settings_theme_dark" }> = [
  { mode: "system", key: "settings_theme_system" },
  { mode: "light", key: "settings_theme_light" },
  { mode: "dark", key: "settings_theme_dark" },
];

/**
 * The appearance tab's 深浅色模式 (theme-picker.tsx + shared/choice-card.css). It is
 * also this page's own theme switch.
 */
export function ChoiceCardsCard() {
  const t = useExtensionText();
  const { mode, setMode } = useDesignTheme();
  return (
    <Panel>
      <SectionHeader title={t("settings_appearance_global_section_title")} />
      <div className="_x_extension_setting_row_2024_unique_ _x_extension_theme_mode_row_2026_unique_">
        <div>
          <p className="_x_extension_setting_title_2024_unique_">{t("settings_theme_title")}</p>
        </div>
        <div className="_x_extension_theme_picker_2024_unique_ _x_extension_theme_gallery_2026_unique_" role="group" aria-label={t("settings_theme_title")}>
          {THEME_PREVIEWS.map(({ mode: value, key }) => (
            <button
              type="button"
              className="_x_extension_theme_option_2024_unique_"
              aria-pressed={mode === value}
              data-active={mode === value ? "true" : "false"}
              data-mode={value}
              onClick={() => setMode(value)}
              key={value}
            >
              <span className="_x_extension_theme_preview_2026_unique_" data-preview-mode={value}>
                <img alt="" aria-hidden="true" className="_x_extension_theme_preview_img_2026_unique_" height="80" src={`/assets/design/theme-${value}.svg`} width="120" />
                <span aria-hidden="true" className="_x_extension_theme_check_2026_unique_">
                  <i aria-hidden="true" className="ri-icon ri-check-line" />
                </span>
              </span>
              <span className="_x_extension_theme_label_2026_unique_">{t(key)}</span>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ---------- Sliders ---------- */

/** `name` is the row's id on the options page (…_row / …_control), which its narrow layout keys on. */
type SliderSpec = { name: string; title: string; reset: string; min: number; max: number; fallback: number; suffix: string };

/** settings-controls.tsx RangeSliderControl: track (reset hangs in its gutter) and the value box. */
function RangeRow({ spec, value, onChange }: { spec: SliderSpec; value: number; onChange: (value: number) => void }) {
  const percent = ((value - spec.min) / (spec.max - spec.min)) * 100;
  const mark = Math.round(((spec.fallback - spec.min) / (spec.max - spec.min)) * 10000) / 10000;
  const clamp = (next: number) => Math.min(spec.max, Math.max(spec.min, Math.round(next)));
  const marks = `linear-gradient(90deg, transparent calc((var(--x-range-slider-thumb-size) / 2 + (100% - var(--x-range-slider-thumb-size)) * ${mark}) - 1px), var(--x-range-slider-mark-color) 0 calc((var(--x-range-slider-thumb-size) / 2 + (100% - var(--x-range-slider-thumb-size)) * ${mark}) + 1px), transparent 0)`;
  return (
    <Row title={spec.title} className={`_x_extension_${spec.name}_row_2026_unique_`}>
      <div className={`_x_extension_${spec.name}_control_2026_unique_`}>
        <div className="_x_extension_range_slider_control_2026_unique_">
          <div className="x-range-slider x-lumno-range-slider">
            <input
              className="x-range-slider-input x-lumno-range-slider-input"
              type="range"
              min={spec.min}
              max={spec.max}
              step={1}
              value={value}
              aria-label={spec.title}
              aria-valuetext={`${value}${spec.suffix}`}
              onChange={(event) => onChange(clamp(Number(event.target.value)))}
              onDoubleClick={() => onChange(spec.fallback)}
              style={{ "--x-range-slider-percent": `${percent}%`, "--x-range-slider-marks": marks } as CSSProperties}
            />
            <button
              type="button"
              className="_x_extension_shortcut_group_action_2024_unique_ _x_extension_range_slider_reset_button_2026_unique_ x-range-slider-reset"
              aria-label={spec.reset}
              title={spec.reset}
              disabled={value === spec.fallback}
              onClick={(event) => {
                onChange(spec.fallback);
                event.currentTarget.blur();
              }}
            >
              <i className="ri-icon ri-size-14 ri-reset-left-line" aria-hidden="true" />
            </button>
          </div>
          <input
            className="_x_extension_shortcut_input_2024_unique_ _x_extension_range_slider_value_input_2026_unique_"
            type="number"
            inputMode="numeric"
            min={spec.min}
            max={spec.max}
            step={1}
            value={value}
            aria-label={spec.title}
            style={{ boxSizing: "border-box", flex: "0 0 auto", height: "var(--x-range-slider-value-height, 30px)", width: "var(--x-range-slider-value-width, 52px)" }}
            onChange={(event) => {
              const next = Number(event.target.value);
              if (Number.isFinite(next)) onChange(clamp(next));
            }}
          />
        </div>
      </div>
    </Row>
  );
}

function useClockText() {
  const [text, setText] = useState("09:41");
  useEffect(() => {
    const format = () => {
      const now = new Date();
      setText(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
    };
    format();
    const timer = window.setInterval(format, 15_000);
    return () => window.clearInterval(timer);
  }, []);
  return text;
}

/** The new tab clock's size (32–96px around 54), as the appearance tab sets it; the clock above follows. */
export function SliderCard() {
  const t = useExtensionText();
  const size: SliderSpec = { name: "newtab_time_font_size", title: t("newtab_time_font_size_title"), reset: t("newtab_time_font_size_reset"), min: 32, max: 96, fallback: 54, suffix: " px" };
  const [sizeValue, setSizeValue] = useState(size.fallback);
  const clock = useClockText();
  useCardDemo((timeline) => {
    timeline.at(0, () => setSizeValue(size.fallback));
    timeline.tween(400, 900, (p) => setSizeValue(Math.round(size.fallback + (72 - size.fallback) * p)));
    timeline.tween(1700, 700, (p) => setSizeValue(Math.round(72 - (72 - 40) * p)));
    timeline.tween(2800, 700, (p) => setSizeValue(Math.round(40 + (size.fallback - 40) * p)));
  });

  return (
    <div className="dg-slider">
      <div className="dg-slider__clock" aria-hidden="true">
        <time className="nts-clock" style={{ fontSize: `${sizeValue}px` }}>
          {clock}
        </time>
      </div>
      <Panel>
        <RangeRow spec={size} value={sizeValue} onChange={setSizeValue} />
      </Panel>
    </div>
  );
}
