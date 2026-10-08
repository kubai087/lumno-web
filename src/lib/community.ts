import { SITE_URL } from "./seo";

export const COMMUNITY_LINKS = {
  xUrl: "https://x.com/kubai087",
  xiaohongshuUrl: "https://www.xiaohongshu.com/user/profile/5f30130300000000010006eb",
  feedbackEmail: "i@kubai.design",
  discordUrl: "https://discord.gg/2u9sg7ZNkJ",
  wechatQrImagePath: "/qrcode-20261015.webp",
  wechatQrImageUrl: new URL("/qrcode-20261015.webp", SITE_URL).toString(),
} as const;

export const COMMUNITY_LINKS_PAYLOAD_VERSION = 1;

export type CommunityChannel = "wechat" | "discord";

/**
 * One rule for every feedback entry (hero, top bar, FAQ, footer, the extension's
 * community-links.json): Chinese readers join the WeChat group, everyone else Discord.
 */
export function getCommunityChannel(locale: string): CommunityChannel {
  return locale.startsWith("zh") ? "wechat" : "discord";
}

/** The Discord invite for non-Chinese locales; undefined where the WeChat QR dialog opens instead. */
export function getCommunityExternalHref(locale: string): string | undefined {
  return getCommunityChannel(locale) === "discord" ? COMMUNITY_LINKS.discordUrl : undefined;
}
