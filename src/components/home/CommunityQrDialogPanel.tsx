import type { ComponentProps } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

/*
 * Kept apart from CommunityQrDialog.tsx so the lazily loaded dialog
 * (community-qr-dialog-root.tsx) does not pull SettingsKit and its stylesheet
 * into every page's bundle.
 */

export interface CommunityQrDialogContent {
  title: string;
  qrImageSrc: string;
  qrImageAlt: string;
  closeLabel: string;
}

interface CommunityQrDialogPanelProps extends CommunityQrDialogContent {
  onCloseAutoFocus?: ComponentProps<typeof DialogContent>["onCloseAutoFocus"];
}

/**
 * Data attributes that make an element open the community QR dialog. The
 * triggers render as plain HTML; src/scripts/community-qr.ts loads the dialog
 * (and React) only when one is used.
 */
export function communityQrTriggerAttributes({ title, qrImageSrc, qrImageAlt, closeLabel }: CommunityQrDialogContent) {
  return {
    "data-community-qr-trigger": "",
    "data-qr-title": title,
    "data-qr-src": qrImageSrc,
    "data-qr-alt": qrImageAlt,
    "data-qr-close": closeLabel,
  };
}

export function CommunityQrDialogPanel({
  title,
  qrImageSrc,
  qrImageAlt,
  closeLabel,
  onCloseAutoFocus,
}: CommunityQrDialogPanelProps) {
  return (
    <DialogContent
      aria-describedby={undefined}
      closeLabel={closeLabel}
      onCloseAutoFocus={onCloseAutoFocus}
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
