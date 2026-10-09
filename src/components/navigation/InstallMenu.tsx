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
  firefoxUrl: string;
  chromeLabel: string;
  edgeLabel: string;
  firefoxLabel: string;
  chromeVersion?: string;
  edgeVersion?: string;
  /** Firefox is offered only once AMO serves a listed version. */
  firefoxVersion?: string;
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
  firefoxUrl,
  chromeLabel,
  edgeLabel,
  firefoxLabel,
  chromeVersion,
  edgeVersion,
  firefoxVersion,
  chromeRecommendation,
  chromeRecommendationNote,
}: Props) {
  const chromeVersionTag = formatVersionTag(chromeVersion);
  const edgeVersionTag = formatVersionTag(edgeVersion);
  const firefoxVersionTag = formatVersionTag(firefoxVersion);
  const options: ReadonlyArray<SettingsSelectItem<"chrome" | "edge" | "firefox">> = [
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
    ...(firefoxVersionTag
      ? [
          {
            value: "firefox" as const,
            label: firefoxLabel,
            labelSuffix: renderOptionDetail(firefoxVersionTag),
            iconClass: "ri-firefox-fill install-menu-store-icon install-menu-store-icon-firefox",
            href: firefoxUrl,
            target: "_blank",
            rel: "noreferrer noopener",
            analyticsEvent: "open_firefox_addons",
            analyticsCategory: "conversion",
            analyticsLabel: "home_header_firefox_install",
          },
        ]
      : []),
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
