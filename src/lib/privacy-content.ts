import privacyPolicyEn from "../content/privacy-policy.en.md?raw";
import privacyPolicyZhCn from "../content/privacy-policy.md?raw";
import privacyPolicyZhTw from "../content/privacy-policy.zh-TW.md?raw";
import type { SupportedLocale } from "./locales";

export const PRIVACY_LAST_UPDATED = "2026-10-08";
/** The extension version the policy text was checked against. */
export const PRIVACY_POLICY_VERSION = "0.9.58";

/** Stable anchors for the policy's numbered sections, in document order. */
export const PRIVACY_SECTION_IDS = [
  "scope",
  "information-we-process",
  "permissions",
  "data-leaving-device",
  "sync",
  "website-analytics",
  "sharing",
  "retention",
  "your-rights",
  "security",
  "children",
  "international-processing",
  "limited-use",
  "changes",
  "contact",
] as const;

type PrivacyPageContent = {
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string[];
  breadcrumbLabel: string;
  title: string;
  lastUpdatedLabel: string;
  /** {version} is PRIVACY_POLICY_VERSION. */
  appliesToLabel: string;
  tocLabel: string;
  policySource: string;
};

export const PRIVACY_CONTENT: Record<SupportedLocale, PrivacyPageContent> = {
  "zh-CN": {
    pageTitle: "Lumno 隐私政策｜本地处理、浏览器同步与 WebDAV",
    pageDescription:
      "Lumno 隐私政策：说明扩展如何在本机处理数据、通过浏览器同步或你自己的 WebDAV 同步配置，以及会发起哪些第三方请求。",
    pageKeywords: ["Lumno 隐私政策", "Chrome 扩展隐私政策", "浏览器扩展隐私声明"],
    breadcrumbLabel: "隐私政策",
    title: "Lumno 隐私政策",
    lastUpdatedLabel: "最后更新",
    appliesToLabel: "适用于 Lumno {version} 及以上版本",
    tocLabel: "目录",
    policySource: privacyPolicyZhCn,
  },
  "zh-TW": {
    pageTitle: "Lumno 隱私權政策｜本機處理、瀏覽器同步與 WebDAV",
    pageDescription:
      "Lumno 隱私權政策：說明擴充功能如何在本機處理資料、透過瀏覽器同步或你自己的 WebDAV 同步設定，以及會發起哪些第三方請求。",
    pageKeywords: ["Lumno 隱私權政策", "Chrome 擴充功能隱私權政策", "瀏覽器擴充功能隱私權聲明"],
    breadcrumbLabel: "隱私權政策",
    title: "Lumno 隱私權政策",
    lastUpdatedLabel: "最後更新",
    appliesToLabel: "適用於 Lumno {version} 及以上版本",
    tocLabel: "目錄",
    policySource: privacyPolicyZhTw,
  },
  en: {
    pageTitle: "Lumno Privacy Policy | Local Data, Browser Sync & WebDAV",
    pageDescription:
      "Read how Lumno processes browser data on your device, syncs settings through your browser or your own WebDAV server, and which third-party requests it makes.",
    pageKeywords: ["Lumno privacy policy", "Chrome extension privacy policy", "browser extension privacy notice"],
    breadcrumbLabel: "Privacy Policy",
    title: "Lumno Privacy Policy",
    lastUpdatedLabel: "Last updated",
    appliesToLabel: "Applies to Lumno {version} and later",
    tocLabel: "On this page",
    policySource: privacyPolicyEn,
  },
};

export function getPrivacyContent(locale: SupportedLocale): PrivacyPageContent {
  return PRIVACY_CONTENT[locale] || PRIVACY_CONTENT["zh-CN"];
}
