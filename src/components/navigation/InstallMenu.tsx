import {
  SettingsBadge,
  SettingsSelect,
  type SettingsSelectItem,
} from "../extension-settings/SettingsKit";
import "./install-menu.css";

interface Props {
  label: string;
  ariaLabel: string;
  chromeUrl: string;
  edgeUrl: string;
  chromeLabel: string;
  edgeLabel: string;
  chromeVersion?: string;
  edgeVersion?: string;
  chromeRecommendation: string;
}

function formatVersionTag(version?: string) {
  const normalizedVersion = String(version || "").trim().replace(/^v/i, "");
  return normalizedVersion ? `v${normalizedVersion}` : null;
}

export default function InstallMenu({
  label,
  ariaLabel,
  chromeUrl,
  edgeUrl,
  chromeLabel,
  edgeLabel,
  chromeVersion,
  edgeVersion,
  chromeRecommendation,
}: Props) {
  const chromeVersionTag = formatVersionTag(chromeVersion);
  const edgeVersionTag = formatVersionTag(edgeVersion);
  const options: ReadonlyArray<SettingsSelectItem<"chrome" | "edge">> = [
    {
      value: "chrome",
      label: chromeLabel,
      iconClass: "ri-chrome-fill install-menu-store-icon install-menu-store-icon-chrome",
      meta: chromeVersionTag ? (
        <>
          <SettingsBadge tone="accent">{chromeRecommendation}</SettingsBadge>
          <SettingsBadge>{chromeVersionTag}</SettingsBadge>
        </>
      ) : null,
      href: chromeUrl,
      target: "_blank",
      rel: "noreferrer noopener",
      analyticsEvent: "open_chrome_web_store",
      analyticsCategory: "conversion",
      analyticsLabel: "home_header_chrome_install",
    },
    {
      value: "edge",
      label: edgeLabel,
      iconClass: "ri-edge-new-fill install-menu-store-icon install-menu-store-icon-edge",
      meta: edgeVersionTag ? <SettingsBadge>{edgeVersionTag}</SettingsBadge> : null,
      href: edgeUrl,
      target: "_blank",
      rel: "noreferrer noopener",
      analyticsEvent: "open_edge_addons",
      analyticsCategory: "conversion",
      analyticsLabel: "home_header_edge_install",
    },
  ];

  return (
    <SettingsSelect
      className="install-menu"
      id="toolbar-install-toggle"
      menuId="toolbar-install-menu"
      menuRole="menu"
      optionRole="menuitem"
      triggerVariant="primary"
      triggerIconClass="ri-arrow-down-s-line"
      triggerLabel={label}
      triggerClassName="top-nav-install"
      label={ariaLabel}
      defaultValue="chrome"
      showSelected={false}
      focusFirstItemOnOpen
      restoreFocusOnEscape
      items={options}
    />
  );
}
