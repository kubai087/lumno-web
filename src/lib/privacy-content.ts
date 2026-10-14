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
import privacySummaryZhCn from "../content/privacy-summary.md?raw";
import privacySummaryZhTw from "../content/privacy-summary.zh-TW.md?raw";
import privacySummaryEn from "../content/privacy-summary.en.md?raw";
import privacySummaryJa from "../content/privacy-summary.ja.md?raw";
import privacySummaryKo from "../content/privacy-summary.ko.md?raw";
import privacySummaryDe from "../content/privacy-summary.de.md?raw";
import privacySummaryFr from "../content/privacy-summary.fr.md?raw";
import privacySummaryEs from "../content/privacy-summary.es.md?raw";
import privacySummaryPtBr from "../content/privacy-summary.pt-BR.md?raw";
import privacySummaryRu from "../content/privacy-summary.ru.md?raw";
import type { SupportedLocale } from "./locales";

export const PRIVACY_LAST_UPDATED = "2026-10-14";
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
  /** A plain-language summary above the policy: one "## " heading, shown unnumbered. */
  summarySource: string;
  policySource: string;
  /** Every version but zh-CN is a translation; the note links readers to the Simplified Chinese text, which governs. */
  translationNote?: { text: string; linkLabel: string };
};

export const PRIVACY_CONTENT: Record<SupportedLocale, PrivacyPageContent> = {
  "zh-CN": {
    pageTitle: "Lumno 隐私政策｜本地处理、浏览器同步与 WebDAV",
    pageDescription:
      "Lumno 没有账号和服务器，标签页、书签和历史记录只在本机处理，不收集使用数据。隐私政策说明哪些请求会离开你的设备、浏览器同步与 WebDAV 同步的范围，以及你的权利。",
    pageKeywords: ["Lumno 隐私政策", "Chrome 扩展隐私政策", "浏览器扩展隐私声明", "Lumno 隐私", "浏览器扩展隐私", "Chrome 扩展数据"],
    breadcrumbLabel: "隐私政策",
    title: "Lumno 隐私政策",
    lastUpdatedLabel: "最后更新",
    appliesToLabel: "适用于 Lumno {version} 及以上版本",
    tocLabel: "目录",
    summarySource: privacySummaryZhCn,
    policySource: privacyPolicyZhCn,
  },
  "zh-TW": {
    pageTitle: "Lumno 隱私權政策｜本機處理、瀏覽器同步與 WebDAV",
    pageDescription:
      "Lumno 沒有帳號和伺服器，分頁、書籤和瀏覽紀錄只在本機處理，不收集使用資料。隱私權政策說明哪些請求會離開你的電腦、瀏覽器同步與 WebDAV 同步的範圍，以及你的權利。",
    pageKeywords: ["Lumno 隱私權政策", "Chrome 擴充功能隱私權政策", "瀏覽器擴充功能隱私權聲明", "Lumno 隱私", "瀏覽器擴充功能隱私", "Chrome 擴充功能資料"],
    breadcrumbLabel: "隱私權政策",
    title: "Lumno 隱私權政策",
    lastUpdatedLabel: "最後更新",
    appliesToLabel: "適用於 Lumno {version} 及以上版本",
    tocLabel: "目錄",
    summarySource: privacySummaryZhTw,
    policySource: privacyPolicyZhTw,
    translationNote: {
      text: "本頁為方便閱讀提供的譯文，若內容有出入，以簡體中文版本為準。",
      linkLabel: "閱讀簡體中文版",
    },
  },
  en: {
    pageTitle: "Lumno Privacy Policy | Local Data, Browser Sync & WebDAV",
    pageDescription:
      "Lumno has no accounts or servers. Your tabs, bookmarks and history stay on your device, and no usage data is collected. The policy covers what leaves your device, browser and WebDAV sync, and your rights.",
    pageKeywords: ["Lumno privacy policy", "Chrome extension privacy policy", "browser extension privacy notice", "Lumno privacy", "browser extension privacy", "Chrome extension data"],
    breadcrumbLabel: "Privacy Policy",
    title: "Lumno Privacy Policy",
    lastUpdatedLabel: "Last updated",
    appliesToLabel: "Applies to Lumno {version} and later",
    tocLabel: "On this page",
    summarySource: privacySummaryEn,
    policySource: privacyPolicyEn,
    translationNote: {
      text: "This translation is provided for convenience. If it differs from the Simplified Chinese version, the Chinese version prevails.",
      linkLabel: "Read the Chinese version",
    },
  },
  ja: {
    pageTitle: "Lumno プライバシーポリシー｜端末内での処理、ブラウザ同期、WebDAV",
    pageDescription:
      "Lumno にはアカウントもサーバーもありません。タブ、ブックマーク、履歴は端末内で処理され、利用データは収集しません。端末の外に出る通信、ブラウザ同期・WebDAV 同期の範囲、あなたの権利について説明します。",
    pageKeywords: ["Lumno プライバシーポリシー", "Chrome 拡張機能 プライバシーポリシー", "ブラウザ拡張機能 プライバシー", "Lumno プライバシー", "Chrome 拡張機能 データ"],
    breadcrumbLabel: "プライバシーポリシー",
    title: "Lumno プライバシーポリシー",
    lastUpdatedLabel: "最終更新",
    appliesToLabel: "Lumno {version} 以降に適用",
    tocLabel: "目次",
    summarySource: privacySummaryJa,
    policySource: privacyPolicyJa,
    translationNote: {
      text: "これは参考のための翻訳です。内容に相違がある場合は簡体字中国語版が優先されます。",
      linkLabel: "簡体字中国語版を読む",
    },
  },
  ko: {
    pageTitle: "Lumno 개인정보처리방침 | 기기 내 처리, 브라우저 동기화, WebDAV",
    pageDescription:
      "Lumno에는 계정도 서버도 없습니다. 탭, 북마크, 방문 기록은 기기에만 저장되며 사용 데이터도 수집하지 않습니다. 기기 밖으로 전송되는 요청, 브라우저·WebDAV 동기화, 사용자의 권리를 설명합니다.",
    pageKeywords: ["Lumno 개인정보처리방침", "크롬 확장 프로그램 개인정보처리방침", "브라우저 확장 프로그램 개인정보", "Lumno 개인정보", "브라우저 확장 개인정보", "크롬 확장 데이터"],
    breadcrumbLabel: "개인정보처리방침",
    title: "Lumno 개인정보처리방침",
    lastUpdatedLabel: "최종 업데이트",
    appliesToLabel: "Lumno {version} 이상에 적용",
    tocLabel: "목차",
    summarySource: privacySummaryKo,
    policySource: privacyPolicyKo,
    translationNote: {
      text: "이 문서는 편의를 위한 번역본입니다. 내용이 다를 경우 중국어 간체판이 우선합니다.",
      linkLabel: "중국어 간체판 보기",
    },
  },
  de: {
    pageTitle: "Lumno Datenschutzerklärung | Lokale Daten, Browser-Sync & WebDAV",
    pageDescription:
      "Lumno hat weder Konten noch Server. Tabs, Lesezeichen und Verlauf bleiben auf deinem Gerät, Nutzungsdaten werden nicht erhoben. Die Erklärung beschreibt, was dein Gerät verlässt, wie Browser- und WebDAV-Sync funktionieren und welche Rechte du hast.",
    pageKeywords: ["Lumno Datenschutzerklärung", "Datenschutz Chrome-Erweiterung", "Datenschutzhinweise Browsererweiterung", "Lumno Datenschutz", "Chrome-Erweiterung Daten"],
    breadcrumbLabel: "Datenschutz",
    title: "Lumno Datenschutzerklärung",
    lastUpdatedLabel: "Zuletzt aktualisiert",
    appliesToLabel: "Gilt ab Lumno {version}",
    tocLabel: "Auf dieser Seite",
    summarySource: privacySummaryDe,
    policySource: privacyPolicyDe,
    translationNote: {
      text: "Diese Übersetzung dient nur der Information. Bei Abweichungen gilt die vereinfacht-chinesische Fassung.",
      linkLabel: "Chinesische Fassung lesen",
    },
  },
  fr: {
    pageTitle: "Politique de confidentialité de Lumno | Données locales, synchro du navigateur et WebDAV",
    pageDescription:
      "Lumno n'a ni comptes ni serveurs. Vos onglets, favoris et historique restent sur votre appareil, et aucune donnée d'usage n'est collectée. La politique détaille ce qui quitte votre appareil, les synchros navigateur et WebDAV, et vos droits.",
    pageKeywords: ["politique de confidentialité Lumno", "confidentialité extension Chrome", "données personnelles extension navigateur", "confidentialité Lumno", "données extension Chrome"],
    breadcrumbLabel: "Confidentialité",
    title: "Politique de confidentialité de Lumno",
    lastUpdatedLabel: "Dernière mise à jour",
    appliesToLabel: "S’applique à Lumno {version} et versions ultérieures",
    tocLabel: "Sur cette page",
    summarySource: privacySummaryFr,
    policySource: privacyPolicyFr,
    translationNote: {
      text: "Cette traduction est fournie à titre indicatif. En cas de divergence, la version en chinois simplifié prévaut.",
      linkLabel: "Lire la version chinoise",
    },
  },
  es: {
    pageTitle: "Política de privacidad de Lumno | Datos locales, sincronización y WebDAV",
    pageDescription:
      "Lumno no tiene cuentas ni servidores. Tus pestañas, marcadores e historial se quedan en tu dispositivo, y no se recopilan datos de uso. La política explica qué sale de tu dispositivo, cómo funcionan la sincronización del navegador y WebDAV, y tus derechos.",
    pageKeywords: ["política de privacidad Lumno", "privacidad extensión Chrome", "privacidad extensión de navegador", "privacidad Lumno", "datos extensión Chrome"],
    breadcrumbLabel: "Privacidad",
    title: "Política de privacidad de Lumno",
    lastUpdatedLabel: "Última actualización",
    appliesToLabel: "Se aplica a Lumno {version} y posteriores",
    tocLabel: "En esta página",
    summarySource: privacySummaryEs,
    policySource: privacyPolicyEs,
    translationNote: {
      text: "Esta traducción es solo informativa. Si hay diferencias, prevalece la versión en chino simplificado.",
      linkLabel: "Leer la versión en chino",
    },
  },
  "pt-BR": {
    pageTitle: "Política de Privacidade do Lumno | Dados locais, sincronização e WebDAV",
    pageDescription:
      "O Lumno não tem contas nem servidores. Suas guias, favoritos e histórico ficam no seu dispositivo, e nenhum dado de uso é coletado. A política explica o que sai do seu dispositivo, como funcionam a sincronização do navegador e o WebDAV, e seus direitos.",
    pageKeywords: ["política de privacidade Lumno", "privacidade extensão Chrome", "privacidade extensão de navegador", "privacidade do Lumno", "dados de extensão do Chrome"],
    breadcrumbLabel: "Privacidade",
    title: "Política de Privacidade do Lumno",
    lastUpdatedLabel: "Última atualização",
    appliesToLabel: "Vale para o Lumno {version} e posteriores",
    tocLabel: "Nesta página",
    summarySource: privacySummaryPtBr,
    policySource: privacyPolicyPtBr,
    translationNote: {
      text: "Esta tradução é apenas informativa. Em caso de divergência, prevalece a versão em chinês simplificado.",
      linkLabel: "Ler a versão em chinês",
    },
  },
  ru: {
    pageTitle: "Политика конфиденциальности Lumno — локальные данные, синхронизация и WebDAV",
    pageDescription:
      "У Lumno нет ни аккаунтов, ни серверов. Вкладки, закладки и история остаются на устройстве, данные об использовании не собираются. Политика описывает, что покидает устройство, как работает синхронизация через браузер и WebDAV, и ваши права.",
    pageKeywords: ["политика конфиденциальности Lumno", "конфиденциальность расширения Chrome", "персональные данные расширение браузера", "конфиденциальность Lumno", "данные расширения Chrome"],
    breadcrumbLabel: "Конфиденциальность",
    title: "Политика конфиденциальности Lumno",
    lastUpdatedLabel: "Обновлено",
    appliesToLabel: "Для Lumno {version} и новее",
    tocLabel: "Содержание",
    summarySource: privacySummaryRu,
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
