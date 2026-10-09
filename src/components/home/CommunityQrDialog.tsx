import { SettingsButton } from "../extension-settings/SettingsKit";
import { communityQrTriggerAttributes } from "./CommunityQrDialogPanel";

interface Props {
  triggerLabel: string;
  triggerAriaLabel: string;
  title: string;
  qrImageSrc: string;
  qrImageAlt: string;
  closeLabel: string;
  triggerVariant: "hero" | "footer";
  externalHref?: string;
  analyticsLabel?: string;
  triggerIconSvg?: string;
}

export function CommunityQrDialog({
  triggerLabel,
  triggerAriaLabel,
  title,
  qrImageSrc,
  qrImageAlt,
  closeLabel,
  triggerVariant,
  externalHref,
  analyticsLabel = "home_hero_community",
  triggerIconSvg,
}: Props) {
  // Outside Chinese locales the same trigger opens the Discord invite instead of the QR dialog.
  if (externalHref) {
    return triggerVariant === "hero" ? (
      <SettingsButton
        as="a"
        variant="secondary"
        className="hero-actions-button hero-community-button"
        iconSvg={triggerIconSvg}
        href={externalHref}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={triggerAriaLabel}
        data-analytics-event="open_discord"
        data-analytics-category="cta"
        data-analytics-label={analyticsLabel}
      >
        {triggerLabel}
      </SettingsButton>
    ) : (
      <a className="community-footer-trigger" href={externalHref} target="_blank" rel="noreferrer noopener">
        {triggerLabel}
      </a>
    );
  }

  const dialogAttributes = communityQrTriggerAttributes({ title, qrImageSrc, qrImageAlt, closeLabel });

  return triggerVariant === "hero" ? (
    <SettingsButton
      type="button"
      variant="secondary"
      className="hero-actions-button hero-community-button"
      iconSvg={triggerIconSvg}
      aria-label={triggerAriaLabel}
      aria-haspopup="dialog"
      data-analytics-event="open_community_qrcode"
      data-analytics-category="cta"
      data-analytics-label={analyticsLabel}
      {...dialogAttributes}
    >
      {triggerLabel}
    </SettingsButton>
  ) : (
    <button className="community-footer-trigger" type="button" aria-label={triggerAriaLabel} aria-haspopup="dialog" {...dialogAttributes}>
      {triggerLabel}
    </button>
  );
}
