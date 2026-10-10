import privacyPolicyEn from "../content/privacy-policy.en.md?raw";
import privacyPolicyZhCn from "../content/privacy-policy.md?raw";
import privacyPolicyZhTw from "../content/privacy-policy.zh-TW.md?raw";
import privacyPolicyJa from "../content/privacy-policy.ja.md?raw";
import privacyPolicyKo from "../content/privacy-policy.ko.md?raw";
import privacyPolicyDe from "../content/privacy-policy.de.md?raw";
import privacyPolicyFr from "../content/privacy-policy.fr.md?raw";
import privacyPolicyEs from "../content/privacy-policy.es.md?raw";
import privacyPolicyPtBr from "../content/privacy-policy.pt-BR.md?raw";
import privacyPolicyRu from "../content/privacy-policy.ru.md?raw";
import type { SupportedLocale } from "./locales";

export const PRIVACY_LAST_UPDATED = "2026-10-10";
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
  /** Every version but zh-CN is a translation; the note links readers to the Simplified Chinese text, which governs. */
  translationNote?: { text: string; linkLabel: string };
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
    translationNote: {
      text: "本頁為方便閱讀提供的譯文，若內容有出入，以簡體中文版本為準。",
      linkLabel: "閱讀簡體中文版",
    },
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
    translationNote: {
      text: "This translation is provided for convenience. If it differs from the Simplified Chinese version, the Chinese version prevails.",
      linkLabel: "Read the Chinese version",
    },
  },
  ja: {
    pageTitle: "Lumno プライバシーポリシー｜端末内での処理、ブラウザ同期、WebDAV",
    pageDescription:
      "Lumno がブラウザのデータを端末内でどう処理するか、ブラウザや自分の WebDAV サーバーで設定をどう同期するか、どの第三者にリクエストを送るかを説明します。",
    pageKeywords: ["Lumno プライバシーポリシー", "Chrome 拡張機能 プライバシーポリシー", "ブラウザ拡張機能 プライバシー"],
    breadcrumbLabel: "プライバシーポリシー",
    title: "Lumno プライバシーポリシー",
    lastUpdatedLabel: "最終更新",
    appliesToLabel: "Lumno {version} 以降に適用",
    tocLabel: "目次",
    policySource: privacyPolicyJa,
    translationNote: {
      text: "これは参考のための翻訳です。内容に相違がある場合は簡体字中国語版が優先されます。",
      linkLabel: "簡体字中国語版を読む",
    },
  },
  ko: {
    pageTitle: "Lumno 개인정보처리방침 | 기기 내 처리, 브라우저 동기화, WebDAV",
    pageDescription:
      "Lumno가 브라우저 데이터를 기기에서 어떻게 처리하는지, 브라우저나 직접 운영하는 WebDAV 서버로 설정을 어떻게 동기화하는지, 어떤 제3자 요청을 보내는지 설명합니다.",
    pageKeywords: ["Lumno 개인정보처리방침", "크롬 확장 프로그램 개인정보처리방침", "브라우저 확장 프로그램 개인정보"],
    breadcrumbLabel: "개인정보처리방침",
    title: "Lumno 개인정보처리방침",
    lastUpdatedLabel: "최종 업데이트",
    appliesToLabel: "Lumno {version} 이상에 적용",
    tocLabel: "목차",
    policySource: privacyPolicyKo,
    translationNote: {
      text: "이 문서는 편의를 위한 번역본입니다. 내용이 다를 경우 중국어 간체판이 우선합니다.",
      linkLabel: "중국어 간체판 보기",
    },
  },
  de: {
    pageTitle: "Lumno Datenschutzerklärung | Lokale Daten, Browser-Sync & WebDAV",
    pageDescription:
      "Wie Lumno Browserdaten auf deinem Gerät verarbeitet, Einstellungen über deinen Browser oder deinen eigenen WebDAV-Server synchronisiert und welche Anfragen an Dritte gehen.",
    pageKeywords: ["Lumno Datenschutzerklärung", "Datenschutz Chrome-Erweiterung", "Datenschutzhinweise Browsererweiterung"],
    breadcrumbLabel: "Datenschutz",
    title: "Lumno Datenschutzerklärung",
    lastUpdatedLabel: "Zuletzt aktualisiert",
    appliesToLabel: "Gilt ab Lumno {version}",
    tocLabel: "Auf dieser Seite",
    policySource: privacyPolicyDe,
    translationNote: {
      text: "Diese Übersetzung dient nur der Information. Bei Abweichungen gilt die vereinfacht-chinesische Fassung.",
      linkLabel: "Chinesische Fassung lesen",
    },
  },
  fr: {
    pageTitle: "Politique de confidentialité de Lumno | Données locales, synchro du navigateur et WebDAV",
    pageDescription:
      "Comment Lumno traite les données du navigateur sur votre appareil, synchronise les réglages via votre navigateur ou votre propre serveur WebDAV, et quelles requêtes il envoie à des tiers.",
    pageKeywords: ["politique de confidentialité Lumno", "confidentialité extension Chrome", "données personnelles extension navigateur"],
    breadcrumbLabel: "Confidentialité",
    title: "Politique de confidentialité de Lumno",
    lastUpdatedLabel: "Dernière mise à jour",
    appliesToLabel: "S’applique à Lumno {version} et versions ultérieures",
    tocLabel: "Sur cette page",
    policySource: privacyPolicyFr,
    translationNote: {
      text: "Cette traduction est fournie à titre indicatif. En cas de divergence, la version en chinois simplifié prévaut.",
      linkLabel: "Lire la version chinoise",
    },
  },
  es: {
    pageTitle: "Política de privacidad de Lumno | Datos locales, sincronización y WebDAV",
    pageDescription:
      "Cómo trata Lumno los datos del navegador en tu dispositivo, cómo sincroniza los ajustes con tu navegador o tu propio servidor WebDAV y qué solicitudes envía a terceros.",
    pageKeywords: ["política de privacidad Lumno", "privacidad extensión Chrome", "privacidad extensión de navegador"],
    breadcrumbLabel: "Privacidad",
    title: "Política de privacidad de Lumno",
    lastUpdatedLabel: "Última actualización",
    appliesToLabel: "Se aplica a Lumno {version} y posteriores",
    tocLabel: "En esta página",
    policySource: privacyPolicyEs,
    translationNote: {
      text: "Esta traducción es solo informativa. Si hay diferencias, prevalece la versión en chino simplificado.",
      linkLabel: "Leer la versión en chino",
    },
  },
  "pt-BR": {
    pageTitle: "Política de Privacidade do Lumno | Dados locais, sincronização e WebDAV",
    pageDescription:
      "Como o Lumno trata os dados do navegador no seu dispositivo, sincroniza configurações pelo navegador ou pelo seu próprio servidor WebDAV e quais solicitações envia a terceiros.",
    pageKeywords: ["política de privacidade Lumno", "privacidade extensão Chrome", "privacidade extensão de navegador"],
    breadcrumbLabel: "Privacidade",
    title: "Política de Privacidade do Lumno",
    lastUpdatedLabel: "Última atualização",
    appliesToLabel: "Vale para o Lumno {version} e posteriores",
    tocLabel: "Nesta página",
    policySource: privacyPolicyPtBr,
    translationNote: {
      text: "Esta tradução é apenas informativa. Em caso de divergência, prevalece a versão em chinês simplificado.",
      linkLabel: "Ler a versão em chinês",
    },
  },
  ru: {
    pageTitle: "Политика конфиденциальности Lumno — локальные данные, синхронизация и WebDAV",
    pageDescription:
      "Как Lumno обрабатывает данные браузера на вашем устройстве, синхронизирует настройки через браузер или ваш собственный сервер WebDAV и какие запросы отправляет третьим лицам.",
    pageKeywords: ["политика конфиденциальности Lumno", "конфиденциальность расширения Chrome", "персональные данные расширение браузера"],
    breadcrumbLabel: "Конфиденциальность",
    title: "Политика конфиденциальности Lumno",
    lastUpdatedLabel: "Обновлено",
    appliesToLabel: "Для Lumno {version} и новее",
    tocLabel: "Содержание",
    policySource: privacyPolicyRu,
    translationNote: {
      text: "Это перевод для удобства. При расхождениях действует версия на упрощённом китайском.",
      linkLabel: "Читать китайскую версию",
    },
  },
};

export function getPrivacyContent(locale: SupportedLocale): PrivacyPageContent {
  return PRIVACY_CONTENT[locale] || PRIVACY_CONTENT["zh-CN"];
}
