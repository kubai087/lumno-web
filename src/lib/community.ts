import { SITE_URL } from "./seo";

export const COMMUNITY_LINKS = {
  xUrl: "https://x.com/kubai087",
  xiaohongshuUrl: "https://www.xiaohongshu.com/user/profile/5f30130300000000010006eb",
  feedbackEmail: "i@kubai.design",
  discordUrl: "https://discord.gg/2u9sg7ZNkJ",
  wechatQrImagePath: "/qrcode-20261008.webp",
  wechatQrImageUrl: new URL("/qrcode-20261008.webp", SITE_URL).toString(),
} as const;

export const COMMUNITY_LINKS_PAYLOAD_VERSION = 1;
