import type { ComponentProps } from "react";
import xiaohongshuIconSvg from "../../assets/home-icons/xiaohongshu-line.svg?raw";
import type { CommunityPanel as CommunityPanelContent, CommunityPanelIcon } from "../../lib/community-panel";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

/*
 * Kept apart from CommunityTrigger.tsx so the lazily loaded dialog
 * (community-panel-root.tsx) does not pull SettingsKit and its stylesheet
 * into every page's bundle. Colours are literal rather than theme tokens:
 * some pages (the release notes) redefine --muted for their own text.
 */

/**
 * Data attributes that make an element open the community panel. The triggers
 * render as plain HTML; src/scripts/community-panel.ts loads the dialog (and
 * React) only when one is used.
 */
export function communityTriggerAttributes(panel: CommunityPanelContent) {
  return {
    "data-community-trigger": "",
    "data-community-panel": JSON.stringify(panel),
  };
}

function LinkIcon({ icon }: { icon: CommunityPanelIcon }) {
  if (icon === "xiaohongshu") {
    return <span className="community-panel__svg size-[18px] shrink-0" aria-hidden="true" dangerouslySetInnerHTML={{ __html: xiaohongshuIconSvg }} />;
  }
  return <i className={`${icon === "github" ? "ri-github-line" : "ri-twitter-x-line"} shrink-0 text-[18px] leading-none`} aria-hidden="true" />;
}

interface CommunityPanelProps {
  panel: CommunityPanelContent;
  onCloseAutoFocus?: ComponentProps<typeof DialogContent>["onCloseAutoFocus"];
}

export function CommunityPanel({ panel, onCloseAutoFocus }: CommunityPanelProps) {
  const { title, closeLabel, qr, followLabel, links, note } = panel;
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

      {qr && (
        <img
          className="mt-4 block h-auto w-full rounded-lg bg-[#f4f6f8]"
          src={qr.src}
          alt={qr.alt}
          width="866"
          height="1280"
          loading="lazy"
        />
      )}

      {note && (
        <a
          className="mt-4 self-start text-[13px] text-muted-foreground underline-offset-3 hover:text-foreground hover:underline"
          href={note.href}
          target="_blank"
          rel="noreferrer noopener"
          data-analytics-event={note.analyticsEvent}
          data-analytics-category="cta"
          data-analytics-label="community_panel"
        >
          {note.label} →
        </a>
      )}

      {followLabel ? (
        // Under the GitHub note: the author's profiles as a quiet row of follow-ups.
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-muted-foreground">{followLabel}</span>
          {links.map((link) => (
            <a
              key={link.href}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm text-foreground transition-colors hover:bg-black/[0.04]"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              data-analytics-event={link.analyticsEvent}
              data-analytics-category="cta"
              data-analytics-label="community_panel"
            >
              <LinkIcon icon={link.icon} />
              {link.label}
            </a>
          ))}
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                className="flex items-center gap-3 rounded-xl border px-4 py-3 text-foreground transition-colors hover:bg-black/[0.04]"
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                data-analytics-event={link.analyticsEvent}
                data-analytics-category="cta"
                data-analytics-label="community_panel"
              >
                <LinkIcon icon={link.icon} />
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-medium">{link.label}</span>
                  {link.description && <span className="text-[13px] text-muted-foreground">{link.description}</span>}
                </span>
                <i className="ri-arrow-right-up-line ml-auto shrink-0 text-base leading-none text-muted-foreground" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}

    </DialogContent>
  );
}
