import { SettingsButton } from "../extension-settings/SettingsKit";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

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
}

interface CommunityQrDialogPanelProps {
  title: string;
  qrImageSrc: string;
  qrImageAlt: string;
  closeLabel: string;
}

export function CommunityQrDialogPanel({
  title,
  qrImageSrc,
  qrImageAlt,
  closeLabel,
}: CommunityQrDialogPanelProps) {
  return (
    <DialogContent
      aria-describedby={undefined}
      closeLabel={closeLabel}
      className="max-h-[calc(100dvh-3rem)] max-w-[390px] gap-0 overflow-y-auto p-6"
    >
      <DialogHeader className="pr-10">
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <img
        className="mt-4 block h-auto w-full rounded-lg bg-muted"
        src={qrImageSrc}
        alt={qrImageAlt}
        width="866"
        height="1280"
        loading="lazy"
      />
    </DialogContent>
  );
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
}: Props) {
  if (externalHref) {
    return (
      <a className="community-footer-trigger" href={externalHref} target="_blank" rel="noreferrer noopener">
        {triggerLabel}
      </a>
    );
  }

  const trigger = triggerVariant === "hero" ? (
    <SettingsButton
      type="button"
      variant="secondary"
      className="hero-actions-button hero-community-button"
      aria-label={triggerAriaLabel}
      data-analytics-event="open_community_qrcode"
      data-analytics-category="cta"
      data-analytics-label={analyticsLabel}
    >
      {triggerLabel}
    </SettingsButton>
  ) : (
    <button className="community-footer-trigger" type="button" aria-label={triggerAriaLabel}>
      {triggerLabel}
    </button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <CommunityQrDialogPanel
        title={title}
        qrImageSrc={qrImageSrc}
        qrImageAlt={qrImageAlt}
        closeLabel={closeLabel}
      />
    </Dialog>
  );
}
