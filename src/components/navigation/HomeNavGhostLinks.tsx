import { useEffect, useId, useRef, useState } from "react";
import {
  SettingsButton,
  SettingsSelect,
  type SettingsSelectItem,
} from "../extension-settings/SettingsKit";
import { CommunityQrDialogPanel } from "../home/CommunityQrDialog";
import { Dialog, DialogTrigger } from "../ui/dialog";
import "./home-nav-ghost-links.css";

type NavGhostLinkValue = "community" | "release" | "repository" | "contact";
type CommunityAction = Extract<NavGhostLinkValue, "community">;
type RepositoryActionValue = "repository-issue" | "repository-pull-request";
type ContactActionValue = "contact-x" | "contact-xiaohongshu";
type MobileNavItemValue =
  | NavGhostLinkValue
  | "repository-home"
  | RepositoryActionValue
  | ContactActionValue;

type NavGhostLink = {
  value: NavGhostLinkValue;
  label: string;
  href?: string;
  analyticsEvent: string;
  analyticsCategory: "navigation" | "cta";
  analyticsLabel: string;
  external?: boolean;
  communityAction?: CommunityAction;
  requiresPrimary?: boolean;
};

interface Props {
  releaseHref: string;
  repositoryHref: string;
  repositoryIssueHref: string;
  repositoryPullRequestHref: string;
  contactXHref: string;
  contactXiaohongshuHref: string;
  releaseLabel: string;
  repositoryLabel: string;
  repositoryMenuLabel: string;
  repositoryHomeLabel: string;
  repositoryIssueLabel: string;
  repositoryPullRequestLabel: string;
  communityLabel: string;
  contactLabel: string;
  contactMenuLabel: string;
  contactXLabel: string;
  contactXiaohongshuLabel: string;
  menuLabel: string;
  panelTitle: string;
  qrImageSrc: string;
  qrImageAlt: string;
  qrCloseLabel: string;
}

export default function HomeNavGhostLinks({
  releaseHref,
  repositoryHref,
  repositoryIssueHref,
  repositoryPullRequestHref,
  contactXHref,
  contactXiaohongshuHref,
  releaseLabel,
  repositoryLabel,
  repositoryMenuLabel,
  repositoryHomeLabel,
  repositoryIssueLabel,
  repositoryPullRequestLabel,
  communityLabel,
  contactLabel,
  contactMenuLabel,
  contactXLabel,
  contactXiaohongshuLabel,
  menuLabel,
  panelTitle,
  qrImageSrc,
  qrImageAlt,
  qrCloseLabel,
}: Props) {
  const [activeCommunityAction, setActiveCommunityAction] = useState<CommunityAction | null>(null);
  const [showPrimaryNavigation, setShowPrimaryNavigation] = useState(false);
  const activeTriggerRef = useRef<HTMLElement | null>(null);
  const idPrefix = useId().replaceAll(":", "");

  const links: NavGhostLink[] = [
    {
      value: "community",
      label: communityLabel,
      analyticsEvent: "open_feedback_qrcode",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_community",
      communityAction: "community",
      requiresPrimary: true,
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
      value: "repository",
      label: repositoryLabel,
      href: repositoryHref,
      analyticsEvent: "open_github_repo",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_github",
      external: true,
    },
    {
      value: "contact",
      label: contactLabel,
      analyticsEvent: "open_contact_menu",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_contact",
    },
  ];
  const visibleLinks = links.filter((link) => !link.requiresPrimary || showPrimaryNavigation);
  const repositoryActionItems: ReadonlyArray<SettingsSelectItem<RepositoryActionValue>> = [
    {
      value: "repository-issue",
      label: repositoryIssueLabel,
      iconClass: "ri-error-warning-line",
      href: repositoryIssueHref,
      target: "_blank",
      rel: "noreferrer noopener",
      analyticsEvent: "open_github_new_issue",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_github_issue",
    },
    {
      value: "repository-pull-request",
      label: repositoryPullRequestLabel,
      iconClass: "ri-git-pull-request-line",
      href: repositoryPullRequestHref,
      target: "_blank",
      rel: "noreferrer noopener",
      analyticsEvent: "open_github_new_pull_request",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_github_pull_request",
    },
  ];
  const contactActionItems: ReadonlyArray<SettingsSelectItem<ContactActionValue>> = [
    {
      value: "contact-x",
      label: contactXLabel,
      iconClass: "ri-twitter-x-line",
      href: contactXHref,
      target: "_blank",
      rel: "noreferrer noopener",
      analyticsEvent: "open_author_x",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_author_x",
    },
    {
      value: "contact-xiaohongshu",
      label: contactXiaohongshuLabel,
      iconClass: "ri-book-open-line",
      href: contactXiaohongshuHref,
      target: "_blank",
      rel: "noreferrer noopener",
      analyticsEvent: "open_author_xiaohongshu",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_author_xiaohongshu",
    },
  ];
  const mobileRepositoryActionItems: ReadonlyArray<SettingsSelectItem<MobileNavItemValue>> = [
    {
      value: "repository-home",
      label: repositoryHomeLabel,
      iconClass: "ri-github-line",
      href: repositoryHref,
      target: "_blank",
      rel: "noreferrer noopener",
      analyticsEvent: "open_github_repo",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_github",
    },
    ...repositoryActionItems,
  ];

  const closeCommunityDialog = (restoreFocus = false) => {
    setActiveCommunityAction(null);
    if (restoreFocus) {
      window.requestAnimationFrame(() => activeTriggerRef.current?.focus());
    }
  };

  const openCommunityDialog = (action: CommunityAction, trigger: HTMLElement | null) => {
    activeTriggerRef.current = trigger;
    setActiveCommunityAction(action);
  };

  useEffect(() => {
    const updatePrimaryNavigation = () => {
      const hasPrimaryNavigation = document.body.classList.contains("has-nav-install");
      setShowPrimaryNavigation(hasPrimaryNavigation);
      if (!hasPrimaryNavigation) {
        setActiveCommunityAction(null);
      }
    };
    const observer = new MutationObserver(updatePrimaryNavigation);

    updatePrimaryNavigation();
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const menuItems: ReadonlyArray<SettingsSelectItem<MobileNavItemValue>> = visibleLinks.map((link) => {
    const navItem: SettingsSelectItem<MobileNavItemValue> = {
      value: link.value,
      label: link.label,
      href: link.href,
      target: link.external ? "_blank" : undefined,
      rel: link.external ? "noreferrer noopener" : undefined,
      analyticsEvent: link.analyticsEvent,
      analyticsCategory: link.analyticsCategory,
      analyticsLabel: link.analyticsLabel,
      onSelect: link.communityAction
        ? () => {
            const menuTrigger = document.getElementById("top-nav-more-toggle");
            openCommunityDialog(link.communityAction!, menuTrigger);
          }
        : () => closeCommunityDialog(),
    };

    if (link.value === "repository") {
      return {
        ...navItem,
        href: undefined,
        target: undefined,
        rel: undefined,
        analyticsEvent: "toggle_mobile_repository_menu",
        onSelect: undefined,
        children: mobileRepositoryActionItems,
      };
    }
    if (link.value === "contact") {
      return {
        ...navItem,
        onSelect: undefined,
        children: contactActionItems,
      };
    }
    return navItem;
  });

  return (
    <Dialog
      open={activeCommunityAction === "community"}
      onOpenChange={(open) => {
        if (open) {
          setActiveCommunityAction("community");
          return;
        }
        closeCommunityDialog(true);
      }}
    >
      <div className="top-nav-ghost-links">
        {links.map((link) => {
          if (link.value === "repository") {
            return (
              <div
                className="top-nav-repository-group"
                key={link.analyticsLabel}
                onPointerDown={() => closeCommunityDialog()}
              >
                <SettingsButton
                  as="a"
                  variant="ghost"
                  className="top-nav-ghost-button"
                  href={link.href!}
                  aria-label={link.label}
                  title={link.label}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-analytics-event={link.analyticsEvent}
                  data-analytics-category={link.analyticsCategory}
                  data-analytics-label={link.analyticsLabel}
                >
                  {link.label}
                </SettingsButton>
                <SettingsSelect
                  className="top-nav-repository-menu"
                  id={`${idPrefix}-repository-toggle`}
                  menuId={`${idPrefix}-repository-dropdown`}
                  menuRole="menu"
                  optionRole="menuitem"
                  triggerMode="icon"
                  triggerIconClass="ri-arrow-down-s-line"
                  triggerClassName="top-nav-repository-toggle"
                  menuClassName="top-nav-repository-dropdown"
                  optionClassName="top-nav-repository-option"
                  label={repositoryMenuLabel}
                  defaultValue="repository-issue"
                  showSelected={false}
                  focusFirstItemOnOpen
                  restoreFocusOnEscape
                  items={repositoryActionItems}
                />
              </div>
            );
          }

          if (link.value === "contact") {
            return (
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
                defaultValue="contact-x"
                showSelected={false}
                focusFirstItemOnOpen
                restoreFocusOnEscape
                items={contactActionItems}
                key={link.analyticsLabel}
              />
            );
          }

          if (!link.communityAction) {
            return (
              <SettingsButton
                as="a"
                variant="ghost"
                className="top-nav-ghost-button"
                href={link.href!}
                aria-label={link.label}
                title={link.label}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer noopener" : undefined}
                data-analytics-event={link.analyticsEvent}
                data-analytics-category={link.analyticsCategory}
                data-analytics-label={link.analyticsLabel}
                key={link.analyticsLabel}
              >
                {link.label}
              </SettingsButton>
            );
          }

          return (
            <div
              className="top-nav-community-slot"
              data-visible={showPrimaryNavigation ? "true" : "false"}
              aria-hidden={!showPrimaryNavigation}
              key={link.analyticsLabel}
            >
              <div className="top-nav-community-item">
                <DialogTrigger asChild>
                  <SettingsButton
                    variant="ghost"
                    className="top-nav-ghost-button"
                    aria-label={link.label}
                    title={link.label}
                    disabled={!showPrimaryNavigation}
                    data-analytics-event={link.analyticsEvent}
                    data-analytics-category={link.analyticsCategory}
                    data-analytics-label={link.analyticsLabel}
                    onClick={(event) => {
                      activeTriggerRef.current = event.currentTarget;
                    }}
                  >
                    {link.label}
                  </SettingsButton>
                </DialogTrigger>
              </div>
            </div>
          );
        })}
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
      <CommunityQrDialogPanel
        title={panelTitle}
        qrImageSrc={qrImageSrc}
        qrImageAlt={qrImageAlt}
        closeLabel={qrCloseLabel}
      />
    </Dialog>
  );
}
