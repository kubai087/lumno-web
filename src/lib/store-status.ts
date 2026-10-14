import type { SupportedLocale } from "./locales";

/*
 * Whether a release has reached each extension store, shared by the release
 * notes page and the homepage's release popover.
 */
export type StoreStatus = "published" | "reviewing";
export type StoreId = "chrome" | "edge" | "firefox";

/** The first release Firefox Add-ons published (0.9.61 was never listed): older releases get no Firefox status. */
export const FIREFOX_FIRST_RELEASE = "1.0.0";

/** The short status each store chip reads, per language. */
export const STORE_STATUS_LABELS: Record<SupportedLocale, Record<StoreStatus, string>> = {
  "zh-CN": { published: "已上架", reviewing: "商店待更新" },
  "zh-TW": { published: "已上架", reviewing: "商店尚未更新" },
  en: { published: "Live in store", reviewing: "Store update pending" },
  ja: { published: "ストア公開中", reviewing: "ストア反映待ち" },
  ko: { published: "스토어 반영됨", reviewing: "스토어 반영 대기" },
  de: { published: "Im Store", reviewing: "Store-Update ausstehend" },
  fr: { published: "Disponible sur le Store", reviewing: "En attente sur le Store" },
  es: { published: "En la tienda", reviewing: "Pendiente en la tienda" },
  "pt-BR": { published: "Na loja", reviewing: "Aguardando a loja" },
  ru: { published: "В магазине", reviewing: "Ждёт обновления в магазине" },
};

function normalizeVersion(raw: string): number[] {
  const parts = String(raw || "")
    .replace(/^[^\d]*/, "")
    .match(/\d+/g);
  return (parts || []).map((part) => Number(part));
}

export function compareVersion(a: string, b: string): number {
  const pa = normalizeVersion(a);
  const pb = normalizeVersion(b);
  const length = Math.max(pa.length, pb.length);
  for (let i = 0; i < length; i += 1) {
    const va = pa[i] || 0;
    const vb = pb[i] || 0;
    if (va > vb) return 1;
    if (va < vb) return -1;
  }
  return 0;
}

/**
 * An unknown store version hides that store's chip rather than guessing, and so
 * does a release older than the store's first listed version.
 */
export function getStoreStatus(storeVersion: string, tag: string, since = ""): StoreStatus | null {
  if (!storeVersion) return null;
  if (since && compareVersion(tag, since) < 0) return null;
  return compareVersion(storeVersion, tag) >= 0 ? "published" : "reviewing";
}
