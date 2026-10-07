import privacyPolicyEn from "../content/privacy-policy.en.md?raw";
import privacyPolicyZhCn from "../content/privacy-policy.md?raw";
import privacyPolicyZhTw from "../content/privacy-policy.zh-TW.md?raw";
import type { SupportedLocale } from "./locales";

export const PRIVACY_LAST_UPDATED = "2026-10-08";

type PrivacyPageContent = {
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string[];
  breadcrumbLabel: string;
  brandHomeAria: string;
  officialSiteLabel: string;
  officialSiteAria: string;
  pageNavigationAria: string;
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
    pageTitle: "Lumno 隐私政策｜本地处理、浏览器同步与 WebDAV",
    pageDescription:
      "Lumno 隐私政策：说明扩展如何在本机处理数据、通过浏览器同步或你自己的 WebDAV 同步配置，以及会发起哪些第三方请求。",
    pageKeywords: ["Lumno 隐私政策", "Chrome 扩展隐私政策", "浏览器扩展隐私声明"],
    breadcrumbLabel: "隐私政策",
    brandHomeAria: "返回 Lumno 首页",
    officialSiteLabel: "访问官网",
    officialSiteAria: "访问 Lumno 官网",
    pageNavigationAria: "页面导航",
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
      "Lumno 没有账号，也不收集使用数据。历史、书签和标签页只在你的浏览器中处理；设置通过浏览器自带的同步保存，也可以同步到你自己的 WebDAV 服务器。",
    footerTitle: "对这份说明有疑问？",
    footerBeforeEmail: "请通过",
    footerAfterEmail: "联系我们，或返回",
    footerHomeLabel: "Lumno 官网",
    languageSelectAria: "语言",
    languageLabel: "简体中文",
    policySource: privacyPolicyZhCn,
  },
  "zh-TW": {
    pageTitle: "Lumno 隱私權政策｜本機處理、瀏覽器同步與 WebDAV",
    pageDescription:
      "Lumno 隱私權政策：說明擴充功能如何在本機處理資料、透過瀏覽器同步或你自己的 WebDAV 同步設定，以及會發起哪些第三方請求。",
    pageKeywords: ["Lumno 隱私權政策", "Chrome 擴充功能隱私權政策", "瀏覽器擴充功能隱私權聲明"],
    breadcrumbLabel: "隱私權政策",
    brandHomeAria: "返回 Lumno 首頁",
    officialSiteLabel: "造訪官網",
    officialSiteAria: "造訪 Lumno 官網",
    pageNavigationAria: "頁面導覽",
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
      "Lumno 沒有帳號，也不蒐集使用資料。瀏覽紀錄、書籤與分頁只在你的瀏覽器中處理；設定透過瀏覽器內建的同步保存，也可以同步到你自己的 WebDAV 伺服器。",
    footerTitle: "對這份說明有疑問？",
    footerBeforeEmail: "請透過",
    footerAfterEmail: "與我們聯絡，或返回",
    footerHomeLabel: "Lumno 官網",
    languageSelectAria: "語言",
    languageLabel: "繁體中文",
    policySource: privacyPolicyZhTw,
  },
  en: {
    pageTitle: "Lumno Privacy Policy | Local Data, Browser Sync & WebDAV",
    pageDescription:
      "Read how Lumno processes browser data on your device, syncs settings through your browser or your own WebDAV server, and which third-party requests it makes.",
    pageKeywords: ["Lumno privacy policy", "Chrome extension privacy policy", "browser extension privacy notice"],
    breadcrumbLabel: "Privacy Policy",
    brandHomeAria: "Back to the Lumno homepage",
    officialSiteLabel: "Visit website",
    officialSiteAria: "Visit the Lumno website",
    pageNavigationAria: "Page navigation",
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
      "Lumno has no accounts and collects no usage data. History, bookmarks, and tabs are processed only in your browser; settings sync through your browser's built-in sync, or to your own WebDAV server.",
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
