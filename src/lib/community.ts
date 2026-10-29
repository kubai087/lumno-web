import { SITE_URL } from "./seo";

export const COMMUNITY_LINKS = {
  xUrl: "https://x.com/kubai087",
  xiaohongshuUrl: "https://www.xiaohongshu.com/user/profile/5f30130300000000010006eb",
  feedbackEmail: "i@kubai.design",
  discordUrl: "https://discord.gg/2u9sg7ZNkJ",
  wechatQrImagePath: "/qrcode-20261105.webp",
  wechatQrImageUrl: new URL("/qrcode-20261105.webp", SITE_URL).toString(),
} as const;

export const COMMUNITY_LINKS_PAYLOAD_VERSION = 1;

export type CommunityChannel = "wechat" | "discord";

/**
 * The extension's own feedback entry (community-links.json): Chinese readers
 * join the WeChat group, everyone else Discord. The site itself now leads with
 * the community panel (lib/community-panel.ts); this stays until the extension
 * moves to the same model.
 */
export function getCommunityChannel(locale: string): CommunityChannel {
  return locale.startsWith("zh") ? "wechat" : "discord";
}
