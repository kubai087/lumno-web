import { COMMUNITY_LINKS } from "./community";
import { getHomeContent } from "./home-content";
import type { SupportedLocale } from "./locales";
import { GITHUB_ISSUE_URL } from "./site-links";

export type CommunityPanelIcon = "github" | "x" | "xiaohongshu";

export type CommunityPanelLink = {
  label: string;
  description?: string;
  href: string;
  icon: CommunityPanelIcon;
  analyticsEvent: string;
};

/** What the community panel shows; serialized onto every trigger (CommunityPanel.tsx). */
export type CommunityPanel = {
  title: string;
  closeLabel: string;
  /** Chinese readers: the WeChat group, front and centre. */
  /** WeChat can't join a group from a link, so phones get a hint for reading the QR on the same device. */
  qr?: { src: string; alt: string; wechatHint: string; phoneHint: string };
  /** Set when the links are follow-ups under the QR rather than the panel's main rows. */
  followLabel?: string;
  links: CommunityPanelLink[];
  note?: { label: string; href: string; analyticsEvent: string };
};

/**
 * One panel per language, opened by every community entry on the site. Chinese
 * readers get the group QR, the author's Xiaohongshu and X, and a quiet GitHub
 * link; everyone else gets GitHub and X.
 */
export function getCommunityPanel(locale: SupportedLocale): CommunityPanel {
  const { community } = getHomeContent(locale);
  const base = { title: community.title, closeLabel: community.closeLabel };
  if (community.kind === "group") {
    return {
      ...base,
      qr: {
        src: COMMUNITY_LINKS.wechatQrImagePath,
        alt: community.qrAlt,
        wechatHint: community.qrWechatHint,
        phoneHint: community.qrPhoneHint,
      },
      followLabel: community.followLabel,
      links: [
        { label: community.xiaohongshuLabel, href: COMMUNITY_LINKS.xiaohongshuUrl, icon: "xiaohongshu", analyticsEvent: "open_author_xiaohongshu" },
        { label: community.xLabel, href: COMMUNITY_LINKS.xUrl, icon: "x", analyticsEvent: "open_author_x" },
      ],
      note: { label: community.issueNote, href: GITHUB_ISSUE_URL, analyticsEvent: "open_github_issue" },
    };
  }
  return {
    ...base,
    links: [
      { ...community.github, href: GITHUB_ISSUE_URL, icon: "github", analyticsEvent: "open_github_issue" },
      { ...community.x, href: COMMUNITY_LINKS.xUrl, icon: "x", analyticsEvent: "open_author_x" },
    ],
  };
}
