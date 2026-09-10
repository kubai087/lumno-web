import { SITE_URL } from "./seo";

export const COMMUNITY_LINKS = {
  xUrl: "https://x.com/kubai087",
  feedbackEmail: "i@kubai.design",
  discordUrl: "https://discord.gg/2u9sg7ZNkJ",
  wechatQrImagePath: "/qrcode-20260917.webp",
  wechatQrImageUrl: new URL("/qrcode-20260917.webp", SITE_URL).toString(),
} as const;

export const COMMUNITY_LINKS_PAYLOAD_VERSION = 1;
