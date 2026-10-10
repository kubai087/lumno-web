import type { CommunityPanel } from "../../lib/community-panel";
import { SettingsButton } from "../extension-settings/SettingsKit";
import { communityTriggerAttributes } from "./CommunityPanel";

interface Props {
  panel: CommunityPanel;
  label: string;
  ariaLabel?: string;
  /** "hero": a secondary button beside a primary one; "footer": a plain footer link. */
  variant: "hero" | "footer";
  iconSvg?: string;
  analyticsLabel: string;
}

/** A button that opens the community panel (lib/community-panel.ts), rendered as static HTML. */
export function CommunityTrigger({ panel, label, ariaLabel, variant, iconSvg, analyticsLabel }: Props) {
  const attributes = {
    "aria-label": ariaLabel,
    "aria-haspopup": "dialog" as const,
    "data-analytics-event": "open_community_panel",
    "data-analytics-category": "cta",
    "data-analytics-label": analyticsLabel,
    ...communityTriggerAttributes(panel),
  };

  return variant === "hero" ? (
    <SettingsButton type="button" variant="secondary" className="hero-actions-button hero-community-button" iconSvg={iconSvg} {...attributes}>
      {label}
    </SettingsButton>
  ) : (
    <button className="community-footer-trigger" type="button" {...attributes}>
      {label}
    </button>
  );
}
