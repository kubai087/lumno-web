import { useId } from "react";
import {
  SettingsButton,
  SettingsSelect,
  type SettingsSelectItem,
} from "../extension-settings/SettingsKit";
import type { CommunityPanel } from "../../lib/community-panel";
import { communityTriggerAttributes } from "../home/CommunityPanel";
import "./home-nav-ghost-links.css";

/*
 * Rendered to static HTML (no hydration): the phone menu runs on
 * src/scripts/settings-select-runtime.ts, the community entry opens the
 * community panel through src/scripts/community-panel.ts, and SiteHeader's
 * script shows the entries marked data-nav-primary-only once the bar becomes
 * the glass pill.
 */

type NavGhostLinkValue = "community" | "release" | "help" | "design" | "contact";

/** One of the author's profiles in the contact entry. */
export type NavContactItem = { value: string; label: string; href: string; iconClass: string; analyticsEvent: string };

type NavGhostLink = {
  value: NavGhostLinkValue;
  label: string;
  href?: string;
  analyticsEvent: string;
  analyticsCategory: "navigation" | "cta";
  analyticsLabel: string;
};

interface Props {
  releaseHref: string;
  releaseLabel: string;
  helpHref: string;
  helpLabel: string;
  designHref: string;
  designLabel: string;
  communityLabel: string;
  /** Every community entry opens this panel (lib/community-panel.ts). */
  communityPanel: CommunityPanel;
  /** The author's profiles: a menu when there are several (Chinese: Xiaohongshu, X), a plain link to the only one otherwise. */
  contactLabel: string;
  contactMenuLabel: string;
  contactItems: NavContactItem[];
  menuLabel: string;
}

export default function HomeNavGhostLinks({
  releaseHref,
  releaseLabel,
  helpHref,
  helpLabel,
  designHref,
  designLabel,
  communityLabel,
  communityPanel,
  contactLabel,
  contactMenuLabel,
  contactItems,
  menuLabel,
}: Props) {
  const idPrefix = useId().replaceAll(":", "");
  const contactMenuItems: ReadonlyArray<SettingsSelectItem<string>> = contactItems.map((item) => ({
    value: item.value,
    label: item.label,
    iconClass: item.iconClass,
    href: item.href,
    target: "_blank",
    rel: "noreferrer noopener",
    analyticsEvent: item.analyticsEvent,
    analyticsCategory: "cta",
    analyticsLabel: `home_header_${item.value}`,
  }));
  const communityAttributes = communityTriggerAttributes(communityPanel);

  const links: NavGhostLink[] = [
    {
      value: "community",
      label: communityLabel,
      analyticsEvent: "open_community_panel",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_community",
    },
    {
      value: "release",
      label: releaseLabel,
      href: releaseHref,
      analyticsEvent: "open_release_page",
      analyticsCategory: "navigation",
      analyticsLabel: "home_header_release",
    },
    {
      value: "help",
      label: helpLabel,
      href: helpHref,
      analyticsEvent: "open_help_center",
      analyticsCategory: "navigation",
      analyticsLabel: "home_header_help",
    },
    {
      value: "design",
      label: designLabel,
      href: designHref,
      analyticsEvent: "open_design_page",
      analyticsCategory: "navigation",
      analyticsLabel: "home_header_design",
    },
    {
      value: "contact",
      label: contactLabel,
      href: contactItems.length === 1 ? contactItems[0].href : undefined,
      analyticsEvent: contactItems.length === 1 ? contactItems[0].analyticsEvent : "open_contact_menu",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_contact",
    },
  ];

  const menuItems: ReadonlyArray<SettingsSelectItem<string>> = links.map((link) => ({
    value: link.value,
    label: link.label,
    href: link.href,
    ...(link.href && link.value === "contact" ? { target: "_blank", rel: "noreferrer noopener" } : {}),
    ...(link.value === "contact" && !link.href ? { children: contactMenuItems } : {}),
    analyticsEvent: link.analyticsEvent,
    analyticsCategory: link.analyticsCategory,
    analyticsLabel: link.analyticsLabel,
    ...(link.value === "community"
      ? {
          dataAttributes: {
            "nav-primary-only": "",
            ...stripDataPrefix(communityAttributes),
            "community-return-focus": "#top-nav-more-toggle",
          },
        }
      : {}),
  }));

  return (
    <>
      <div className="top-nav-ghost-links">
        {links.map((link) =>
          link.value === "contact" && !link.href ? (
            <SettingsSelect
              className="top-nav-contact-menu"
              id={`${idPrefix}-contact-toggle`}
              menuId={`${idPrefix}-contact-dropdown`}
              menuRole="menu"
              optionRole="menuitem"
              triggerVariant="ghost"
              triggerIconClass="ri-arrow-down-s-line"
              triggerLabel={contactLabel}
              triggerClassName="top-nav-ghost-button top-nav-contact-toggle"
              menuClassName="top-nav-contact-dropdown"
              optionClassName="top-nav-contact-option"
              label={contactMenuLabel}
              defaultValue={contactItems[0]?.value}
              showSelected={false}
              focusFirstItemOnOpen
              restoreFocusOnEscape
              items={contactMenuItems}
              key={link.analyticsLabel}
            />
          ) : link.value === "community" ? (
            <div
              className="top-nav-community-slot"
              data-nav-primary-only=""
              data-visible="false"
              aria-hidden="true"
              key={link.analyticsLabel}
            >
              <div className="top-nav-community-item">
                <SettingsButton
                  variant="ghost"
                  className="top-nav-ghost-button"
                  aria-label={link.label}
                  title={link.label}
                  aria-haspopup="dialog"
                  disabled
                  data-analytics-event={link.analyticsEvent}
                  data-analytics-category={link.analyticsCategory}
                  data-analytics-label={link.analyticsLabel}
                  {...communityAttributes}
                >
                  {link.label}
                </SettingsButton>
              </div>
            </div>
          ) : (
            <SettingsButton
              as="a"
              variant="ghost"
              className="top-nav-ghost-button"
              href={link.href!}
              aria-label={link.label}
              title={link.label}
              target={link.value === "contact" ? "_blank" : undefined}
              rel={link.value === "contact" ? "noreferrer noopener" : undefined}
              data-analytics-event={link.analyticsEvent}
              data-analytics-category={link.analyticsCategory}
              data-analytics-label={link.analyticsLabel}
              key={link.analyticsLabel}
            >
              {link.label}
            </SettingsButton>
          ),
        )}
      </div>
      <div className="top-nav-more-shell">
        <SettingsSelect
          className="top-nav-more-menu"
          id="top-nav-more-toggle"
          menuId="top-nav-more-dropdown"
          menuRole="menu"
          optionRole="menuitem"
          triggerMode="icon"
          triggerIconClass="ri-menu-line"
          triggerClassName="top-nav-more-toggle"
          menuClassName="top-nav-more-dropdown"
          optionClassName="top-nav-more-option"
          label={menuLabel}
          defaultValue="release"
          showSelected={false}
          focusFirstItemOnOpen
          restoreFocusOnEscape
          items={menuItems}
        />
      </div>
    </>
  );
}

function stripDataPrefix(attributes: Record<string, string>) {
  return Object.fromEntries(Object.entries(attributes).map(([key, value]) => [key.replace(/^data-/, ""), value]));
}
