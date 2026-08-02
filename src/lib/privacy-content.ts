import privacyPolicyEn from "../content/privacy-policy.en.md?raw";
import privacyPolicyZhCn from "../content/privacy-policy.md?raw";
import privacyPolicyZhTw from "../content/privacy-policy.zh-TW.md?raw";
import type { SupportedLocale } from "./locales";

export const PRIVACY_LAST_UPDATED = "2026-08-02";

type PrivacyPageContent = {
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string[];
  breadcrumbLabel: string;
  brandHomeAria: string;
  officialSiteLabel: string;
  officialSiteAria: string;
  pageNavigationAria: string;
  bannerAlt: string;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  effectiveLabel: string;
  policySectionAria: string;
  metadataAria: string;
  lastUpdatedLabel: string;
  tocLabel: string;
  communityLabel: string;
  reviewLabel: string;
  issueLabel: string;
  authorLabel: string;
  articleTitle: string;
  intro: string;
  footerTitle: string;
  footerBeforeEmail: string;
  footerAfterEmail: string;
  footerHomeLabel: string;
  languageSelectAria: string;
  languageLabel: string;
  policySource: string;
};

export const PRIVACY_CONTENT: Record<SupportedLocale, PrivacyPageContent> = {
  "zh-CN": {
    pageTitle: "Lumno 隐私政策｜本地处理、账号同步与使用统计",
    pageDescription:
      "Lumno 隐私政策：说明扩展的本地处理、账号登录、配置与媒体同步、可选账号关联使用统计，以及第三方服务请求。",
    pageKeywords: ["Lumno 隐私政策", "Chrome 扩展隐私政策", "浏览器扩展隐私声明"],
    breadcrumbLabel: "隐私政策",
    brandHomeAria: "返回 Lumno 首页",
    officialSiteLabel: "访问官网",
    officialSiteAria: "访问 Lumno 官网",
    pageNavigationAria: "页面导航",
    bannerAlt: "Lumno 水彩风景横幅",
    eyebrow: "隐私政策",
    heroTitle: "清楚说明，才是真正尊重。",
    heroLead: "本地处理什么、同步什么、统计什么，以及你可以如何撤回和删除，都写在这里。",
    effectiveLabel: "生效及最后更新",
    policySectionAria: "隐私政策正文",
    metadataAria: "文档信息",
    lastUpdatedLabel: "最后更新",
    tocLabel: "目录",
    communityLabel: "加入反馈群",
    reviewLabel: "为 Lumno 评分",
    issueLabel: "创建 Issue",
    authorLabel: "联系作者",
    articleTitle: "隐私政策",
    intro:
      "Lumno 默认尽量在浏览器本地处理历史、书签和标签页。登录后，你可以选择跨设备同步配置与自定义媒体；扩展内产品使用统计保持关闭，只有你主动开启后才会上传明确列出的数字和配置属性。",
    footerTitle: "对这份说明有疑问？",
    footerBeforeEmail: "请通过",
    footerAfterEmail: "联系我们，或返回",
    footerHomeLabel: "Lumno 官网",
    languageSelectAria: "语言",
    languageLabel: "简体中文",
    policySource: privacyPolicyZhCn,
  },
  "zh-TW": {
    pageTitle: "Lumno 隱私權政策｜本機處理、帳號同步與使用統計",
    pageDescription:
      "Lumno 隱私權政策：說明擴充功能的本機處理、帳號登入、設定與媒體同步、選用的帳號關聯使用統計，以及第三方服務請求。",
    pageKeywords: ["Lumno 隱私權政策", "Chrome 擴充功能隱私權政策", "瀏覽器擴充功能隱私權聲明"],
    breadcrumbLabel: "隱私權政策",
    brandHomeAria: "返回 Lumno 首頁",
    officialSiteLabel: "造訪官網",
    officialSiteAria: "造訪 Lumno 官網",
    pageNavigationAria: "頁面導覽",
    bannerAlt: "Lumno 水彩風景橫幅",
    eyebrow: "隱私權政策",
    heroTitle: "清楚說明，才是真正的尊重。",
    heroLead: "哪些資料留在本機、哪些內容會同步或統計，以及你可以如何撤回與刪除，都寫在這裡。",
    effectiveLabel: "生效及最後更新",
    policySectionAria: "隱私權政策正文",
    metadataAria: "文件資訊",
    lastUpdatedLabel: "最後更新",
    tocLabel: "目錄",
    communityLabel: "加入回饋群",
    reviewLabel: "為 Lumno 評分",
    issueLabel: "建立 Issue",
    authorLabel: "聯絡作者",
    articleTitle: "隱私權政策",
    intro:
      "Lumno 預設盡量在瀏覽器本機處理瀏覽紀錄、書籤與分頁。登入後，你可以選擇跨裝置同步設定與自訂媒體；擴充功能內的產品使用統計預設關閉，只有在你主動開啟後，才會上傳明確列出的數字與設定屬性。",
    footerTitle: "對這份說明有疑問？",
    footerBeforeEmail: "請透過",
    footerAfterEmail: "與我們聯絡，或返回",
    footerHomeLabel: "Lumno 官網",
    languageSelectAria: "語言",
    languageLabel: "繁體中文",
    policySource: privacyPolicyZhTw,
  },
  en: {
    pageTitle: "Lumno Privacy Policy | Local Processing, Sync, and Usage Metrics",
    pageDescription:
      "Read how Lumno handles browser data locally, account sign-in, settings and media sync, optional account-linked usage metrics, and third-party requests.",
    pageKeywords: ["Lumno privacy policy", "Chrome extension privacy policy", "browser extension privacy notice"],
    breadcrumbLabel: "Privacy Policy",
    brandHomeAria: "Back to the Lumno homepage",
    officialSiteLabel: "Visit website",
    officialSiteAria: "Visit the Lumno website",
    pageNavigationAria: "Page navigation",
    bannerAlt: "Lumno watercolor landscape banner",
    eyebrow: "Privacy Policy",
    heroTitle: "Clarity is a form of respect.",
    heroLead: "What stays local, what can sync, what may be measured, and how you can withdraw or delete it—all in one place.",
    effectiveLabel: "Effective and last updated",
    policySectionAria: "Privacy policy",
    metadataAria: "Document information",
    lastUpdatedLabel: "Last updated",
    tocLabel: "On this page",
    communityLabel: "Join Discord",
    reviewLabel: "Rate Lumno",
    issueLabel: "Create an issue",
    authorLabel: "Contact the author",
    articleTitle: "Privacy Policy",
    intro:
      "Lumno keeps history, bookmarks, and tabs in your browser whenever possible. After signing in, you can choose to sync settings and custom media across devices. In-extension product usage metrics stay off unless you explicitly enable them, and only the listed numeric events and configuration attributes are uploaded.",
    footerTitle: "Questions about this notice?",
    footerBeforeEmail: "Email us at",
    footerAfterEmail: "or return to the",
    footerHomeLabel: "Lumno website",
    languageSelectAria: "Language",
    languageLabel: "English",
    policySource: privacyPolicyEn,
  },
};

export function getPrivacyContent(locale: SupportedLocale): PrivacyPageContent {
  return PRIVACY_CONTENT[locale] || PRIVACY_CONTENT["zh-CN"];
}
