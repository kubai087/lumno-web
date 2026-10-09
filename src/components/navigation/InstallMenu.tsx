import {
  SettingsBadge,
  SettingsSelect,
  type SettingsSelectItem,
} from "../extension-settings/SettingsKit";
import "./install-menu.css";

interface Props {
  label: string;
  /** Shown instead of `label` on phones (install-menu.css). */
  shortLabel?: string;
  ariaLabel: string;
  chromeUrl: string;
  edgeUrl: string;
  chromeLabel: string;
  edgeLabel: string;
  chromeVersion?: string;
  edgeVersion?: string;
  chromeRecommendation: string;
  chromeRecommendationNote: string;
}

function formatVersionTag(version?: string) {
  const normalizedVersion = String(version || "").trim().replace(/^v/i, "");
  return normalizedVersion ? `v${normalizedVersion}` : null;
}

function renderOptionDetail(...parts: Array<string | null>) {
  const text = parts.filter(Boolean).join(" · ");
  return text ? <span className="install-menu-option-detail">{text}</span> : null;
}

export default function InstallMenu({
  label,
  shortLabel,
  ariaLabel,
  chromeUrl,
  edgeUrl,
  chromeLabel,
  edgeLabel,
  chromeVersion,
  edgeVersion,
  chromeRecommendation,
  chromeRecommendationNote,
}: Props) {
  const chromeVersionTag = formatVersionTag(chromeVersion);
  const edgeVersionTag = formatVersionTag(edgeVersion);
  const options: ReadonlyArray<SettingsSelectItem<"chrome" | "edge">> = [
    {
      value: "chrome",
      label: chromeLabel,
      labelSuffix: renderOptionDetail(chromeVersionTag, chromeRecommendationNote),
      iconClass: "ri-chrome-fill install-menu-store-icon install-menu-store-icon-chrome",
      meta: <SettingsBadge tone="accent">{chromeRecommendation}</SettingsBadge>,
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
      labelSuffix: renderOptionDetail(edgeVersionTag),
      iconClass: "ri-edge-new-fill install-menu-store-icon install-menu-store-icon-edge",
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
      triggerLabel={
        shortLabel ? (
          <>
            <span className="install-menu-label-full">{label}</span>
            <span className="install-menu-label-short">{shortLabel}</span>
          </>
        ) : (
          label
        )
      }
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
