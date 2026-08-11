import { useEffect, useId, useRef, useState, type RefObject } from "react";
import {
  SettingsButton,
  SettingsSelect,
  type SettingsSelectItem,
} from "../extension-settings/SettingsKit";
import "./home-nav-ghost-links.css";

type NavGhostLinkValue = "release" | "feedback" | "repository" | "feature-request";
type CommunityAction = Extract<NavGhostLinkValue, "feedback" | "feature-request">;

type NavGhostLink = {
  value: NavGhostLinkValue;
  label: string;
  href?: string;
  analyticsEvent: string;
  analyticsCategory: "navigation" | "cta";
  analyticsLabel: string;
  external?: boolean;
  communityAction?: CommunityAction;
};

interface Props {
  releaseHref: string;
  repositoryHref: string;
  releaseLabel: string;
  feedbackLabel: string;
  repositoryLabel: string;
  featureRequestLabel: string;
  menuLabel: string;
  panelTitle: string;
  qrImageSrc: string;
  qrImageAlt: string;
  qrCloseLabel: string;
  qrRefreshLabel: string;
}

function CommunityQrPopover({
  id,
  titleId,
  panelTitle,
  qrImageSrc,
  qrImageAlt,
  qrCloseLabel,
  qrRefreshLabel,
  qrVersion,
  refreshing,
  mobile = false,
  closeButtonRef,
  onClose,
  onRefresh,
}: {
  id: string;
  titleId: string;
  panelTitle: string;
  qrImageSrc: string;
  qrImageAlt: string;
  qrCloseLabel: string;
  qrRefreshLabel: string;
  qrVersion: number;
  refreshing: boolean;
  mobile?: boolean;
  closeButtonRef?: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onRefresh: () => void;
}) {
  const versionedQrSrc = qrVersion > 0
    ? `${qrImageSrc}${qrImageSrc.includes("?") ? "&" : "?"}refresh=${qrVersion}`
    : qrImageSrc;

  return (
    <div
      className={`top-nav-community-popover${mobile ? " top-nav-community-popover-mobile" : ""}`}
      id={id}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
    >
      <div className="top-nav-community-popover-header">
        <h2 id={titleId}>{panelTitle}</h2>
        <div className="top-nav-community-popover-actions">
          <button
            className="top-nav-community-popover-action top-nav-community-popover-refresh"
            type="button"
            aria-label={qrRefreshLabel}
            aria-busy={refreshing}
            data-loading={refreshing ? "true" : undefined}
            disabled={refreshing}
            onClick={onRefresh}
          >
            <i className="ri-refresh-line" aria-hidden="true" />
          </button>
          <button
            className="top-nav-community-popover-action"
            type="button"
            aria-label={qrCloseLabel}
            onClick={onClose}
            ref={closeButtonRef}
          >
            <i className="ri-close-line" aria-hidden="true" />
          </button>
        </div>
      </div>
      <img
        className="top-nav-community-qr-image"
        src={versionedQrSrc}
        alt={qrImageAlt}
        width="866"
        height="1280"
        loading="lazy"
      />
    </div>
  );
}

export default function HomeNavGhostLinks({
  releaseHref,
  repositoryHref,
  releaseLabel,
  feedbackLabel,
  repositoryLabel,
  featureRequestLabel,
  menuLabel,
  panelTitle,
  qrImageSrc,
  qrImageAlt,
  qrCloseLabel,
  qrRefreshLabel,
}: Props) {
  const [activeCommunityAction, setActiveCommunityAction] = useState<CommunityAction | null>(null);
  const [qrVersion, setQrVersion] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const activeTriggerRef = useRef<HTMLElement | null>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const idPrefix = useId().replaceAll(":", "");

  const links: NavGhostLink[] = [
    {
      value: "release",
      label: releaseLabel,
      href: releaseHref,
      analyticsEvent: "open_release_page",
      analyticsCategory: "navigation",
      analyticsLabel: "home_header_release",
    },
    {
      value: "feedback",
      label: feedbackLabel,
      analyticsEvent: "open_feedback_qrcode",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_feedback",
      communityAction: "feedback",
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
      value: "feature-request",
      label: featureRequestLabel,
      analyticsEvent: "open_feature_request_qrcode",
      analyticsCategory: "cta",
      analyticsLabel: "home_header_feature_request",
      communityAction: "feature-request",
    },
  ];

  const closePopover = (restoreFocus = false) => {
    setActiveCommunityAction(null);
    setRefreshing(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => activeTriggerRef.current?.focus());
    }
  };

  const toggleCommunityPopover = (action: CommunityAction, trigger: HTMLElement | null) => {
    activeTriggerRef.current = trigger;
    setActiveCommunityAction((current) => current === action ? null : action);
  };

  const refreshQrCode = () => {
    setRefreshing(true);
    setQrVersion(Date.now());
    window.setTimeout(() => setRefreshing(false), 520);
  };

  useEffect(() => {
    if (!activeCommunityAction) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!desktopRef.current?.contains(target) && !mobileRef.current?.contains(target)) {
        closePopover();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopover(true);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCommunityAction]);

  useEffect(() => {
    if (!activeCommunityAction || !window.matchMedia("(max-width: 760px)").matches) return;
    const frame = window.requestAnimationFrame(() => mobileCloseButtonRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [activeCommunityAction]);

  const menuItems: ReadonlyArray<SettingsSelectItem<NavGhostLinkValue>> = links.map((link) => ({
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
          toggleCommunityPopover(link.communityAction!, menuTrigger);
        }
      : () => closePopover(),
  }));

  const mobilePopoverId = `${idPrefix}-mobile-community-popover`;
  const mobilePopoverTitleId = `${mobilePopoverId}-title`;

  return (
    <>
      <div className="top-nav-ghost-links" ref={desktopRef}>
        {links.map((link) => {
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

          const open = activeCommunityAction === link.communityAction;
          const popoverId = `${idPrefix}-${link.communityAction}-popover`;
          const popoverTitleId = `${popoverId}-title`;
          return (
            <div
              className="top-nav-community-item"
              data-open={open ? "true" : "false"}
              key={link.analyticsLabel}
            >
              <SettingsButton
                variant="ghost"
                className="top-nav-ghost-button"
                aria-label={link.label}
                title={link.label}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={popoverId}
                data-analytics-event={link.analyticsEvent}
                data-analytics-category={link.analyticsCategory}
                data-analytics-label={link.analyticsLabel}
                onClick={(event) => toggleCommunityPopover(link.communityAction!, event.currentTarget)}
              >
                {link.label}
              </SettingsButton>
              {open ? (
                <CommunityQrPopover
                  id={popoverId}
                  titleId={popoverTitleId}
                  panelTitle={panelTitle}
                  qrImageSrc={qrImageSrc}
                  qrImageAlt={qrImageAlt}
                  qrCloseLabel={qrCloseLabel}
                  qrRefreshLabel={qrRefreshLabel}
                  qrVersion={qrVersion}
                  refreshing={refreshing}
                  onClose={() => closePopover(true)}
                  onRefresh={refreshQrCode}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="top-nav-more-shell" ref={mobileRef}>
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
        {activeCommunityAction ? (
          <CommunityQrPopover
            id={mobilePopoverId}
            titleId={mobilePopoverTitleId}
            panelTitle={panelTitle}
            qrImageSrc={qrImageSrc}
            qrImageAlt={qrImageAlt}
            qrCloseLabel={qrCloseLabel}
            qrRefreshLabel={qrRefreshLabel}
            qrVersion={qrVersion}
            refreshing={refreshing}
            mobile
            closeButtonRef={mobileCloseButtonRef}
            onClose={() => closePopover(true)}
            onRefresh={refreshQrCode}
          />
        ) : null}
      </div>
    </>
  );
}
