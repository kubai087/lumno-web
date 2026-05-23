import { COMMUNITY_LINKS, COMMUNITY_LINKS_PAYLOAD_VERSION } from "../lib/community";

export function GET() {
  return new Response(
    JSON.stringify({
      version: COMMUNITY_LINKS_PAYLOAD_VERSION,
      links: {
        x: COMMUNITY_LINKS.xUrl,
        email: COMMUNITY_LINKS.feedbackEmail,
        discord: COMMUNITY_LINKS.discordUrl,
        wechatQr: COMMUNITY_LINKS.wechatQrImageUrl,
      },
      communityByLocale: {
        "zh-CN": "wechat",
        "zh-TW": "discord",
        en: "discord",
      },
    }),
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300",
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
}
