export type ChromeStoreReview = {
  reviewId: string;
  reviewerId: string;
  avatarUrl: string;
  rating: number;
  review: string;
  publishedAt: string;
};

export type ChromeStoreReviewSnapshot = {
  sourceUrl: string;
  capturedAt: string;
  averageRating: number;
  ratingCount: number;
  reviews: readonly ChromeStoreReview[];
  source: "live" | "fallback";
};

const CHROME_STORE_REVIEW_URL =
  "https://chromewebstore.google.com/detail/lumno-%E8%81%9A%E7%84%A6%E6%90%9C%E7%B4%A2%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/nggfkkbmogmadfoikakkfegkoilfcfao/reviews";
const REQUEST_TIMEOUT_MS = 8_000;

export const CHROME_STORE_REVIEW_SNAPSHOT: ChromeStoreReviewSnapshot = {
  sourceUrl: CHROME_STORE_REVIEW_URL,
  capturedAt: "2026-08-09",
  averageRating: 5,
  ratingCount: 12,
  source: "fallback",
  reviews: [
    {
      reviewId: "yashon-2026-08-05",
      reviewerId: "Yashon张一瞬呀（Yashon张一瞬呀）",
      avatarUrl:
        "https://lh3.googleusercontent.com/a-/ALV-UjVM_rLinxB-EsIxLlue5iw10bIsb9MNBqCdIUwfZ1lVezCAEs4=s96-w96-h96",
      rating: 5,
      review: "非常美观，微动效很丝滑，体验感满满",
      publishedAt: "2026-08-05",
    },
    {
      reviewId: "shuo-wang-2026-07-27",
      reviewerId: "shuo wang",
      avatarUrl:
        "https://lh3.googleusercontent.com/a-/ALV-UjX2cg39jDzLw2pLf9Wwu6VG1PUjmF-VDtzdHncTQEkHLwSufbM=s96-w96-h96",
      rating: 5,
      review: "真的很好用，我推荐给很多朋友了。希望作者继续加油，坚持更新！",
      publishedAt: "2026-07-27",
    },
    {
      reviewId: "nahuanxi-2026-07-23",
      reviewerId: "OwO (NaHuanxi)",
      avatarUrl:
        "https://lh3.googleusercontent.com/a-/ALV-UjUABWGNtGEo_qMYWqM3Z917r1P9GeYjXebcc6wRSLhlWVlFos4=s96-w96-h96",
      rating: 5,
      review:
        "作者人很好，修bug很快，插件目前来看是我找到的聚焦搜索中最好用且美观得了：) 新标签页没咋用，不过看着也不差",
      publishedAt: "2026-07-23",
    },
    {
      reviewId: "jouch-2026-07-06",
      reviewerId: "jouch",
      avatarUrl:
        "https://lh3.googleusercontent.com/a-/ALV-UjWSeMx8KvFuRfXTwiDeoToZxlRRa4O_cCjNNm-QyAIa9Vwr5Yg=s96-w96-h96",
      rating: 5,
      review: "希望在group中 新打开的标签页或者搜索同样在gropu中",
      publishedAt: "2026-07-06",
    },
    {
      reviewId: "lingling-ming-2026-06-11",
      reviewerId: "lingling Ming",
      avatarUrl:
        "https://lh3.googleusercontent.com/a-/ALV-UjVReJvreZMrRec6MoJrZ5URxTUSxRDPiOJlXh1tF0eNI5RtcQA=s96-w96-h96",
      rating: 5,
      review:
        "美丽至极！原本用的小舒同学很久没更新了，换壁纸的图库链接都崩了。找了很久按照书签进行展示的新标签页，这样不用维护两个，最后发现了这个新的标签页，非常好用！",
      publishedAt: "2026-06-11",
    },
    {
      reviewId: "jarvis-2026-03-18",
      reviewerId: "许飞（jarvis）",
      avatarUrl:
        "https://lh3.googleusercontent.com/a-/ALV-UjXKsz5cQCVNBB2F7o0s3p2Bl_CIkY01JL_Gyku1bS12SpHNlMk=s96-w96-h96",
      rating: 5,
      review:
        "当聚焦搜索光标在第一项的时候，按上键后光标可不可以跳到最后一个；还有聚焦推荐现在是优先推荐书签吧，我觉得大多时候应该优先推荐历史项",
      publishedAt: "2026-03-18",
    },
    {
      reviewId: "liu-changqing-2026-03-04",
      reviewerId: "刘长青",
      avatarUrl:
        "https://lh3.googleusercontent.com/a-/ALV-UjU0niBMwRZkDsNTjRf2MdRrm8mHhYOA86JCkG6-hoX4tN_LsqA=s96-w96-h96",
      rating: 5,
      review: "可不可以在增加一下其它功能，更像arc一点",
      publishedAt: "2026-03-04",
    },
    {
      reviewId: "karl-lee-2026-02-11",
      reviewerId: "Karl Lee",
      avatarUrl:
        "https://lh3.googleusercontent.com/a-/ALV-UjWsTchmuSD_kdTaeik-H9xycItV75M1WnA-PB_wEC7S2ENJhS2L=s96-w96-h96",
      rating: 5,
      review:
        "用了 Lumno 之后就回不去了。Ctrl+T 一键呼出搜索浮层，历史记录、书签、常用网站全都能搜到，还有 Google 联想建议，基本不用再手动翻找了。最喜欢的是站内搜索快捷键功能，输入 gh + Tab 就能直接搜 GitHub，省了好多步骤。",
      publishedAt: "2026-02-11",
    },
  ],
};

type ReviewFetch = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Pick<Response, "ok" | "status" | "text">>;

type ChromeStoreReviewOptions = {
  fetchImpl?: ReviewFetch;
  timeoutMs?: number;
};

let liveReviewRequest: Promise<ChromeStoreReviewSnapshot> | null = null;

function decodeHtml(value: string) {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, token: string) => {
    if (token.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(token.slice(2), 16));
    }
    if (token.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(token.slice(1), 10));
    }
    return namedEntities[token.toLowerCase()] ?? entity;
  });
}

function textContent(fragment: string) {
  return decodeHtml(fragment.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractClassContent(fragment: string, tagName: string, className: string) {
  const pattern = new RegExp(
    `<${tagName}\\b(?=[^>]*\\bclass="[^"]*\\b${className}\\b[^"]*")[^>]*>([\\s\\S]*?)<\\/${tagName}>`,
    "i",
  );
  return pattern.exec(fragment)?.[1] ?? "";
}

function parsePublishedDate(value: string) {
  const chineseDate = value.match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (chineseDate) {
    const [, year, month, day] = chineseDate;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? "" : new Date(timestamp).toISOString().slice(0, 10);
}

function normalizeAvatarUrl(reviewHtml: string) {
  const srcset = /\bsrcset="([^"]+)"/i.exec(reviewHtml)?.[1];
  const src = /<img\b[^>]*\bsrc="([^"]+)"/i.exec(reviewHtml)?.[1];
  const candidate = srcset?.split(/\s+2x(?:,|$)/)[0]?.trim() || src || "";
  return decodeHtml(candidate);
}

/**
 * Parses the public, server-rendered Chrome Web Store reviews page. Google does
 * not expose reviews through its documented Web Store API, so selectors are
 * intentionally isolated here and the caller always retains a local fallback.
 */
export function parseChromeStoreReviewPage(
  html: string,
  capturedAt = new Date().toISOString().slice(0, 10),
): ChromeStoreReviewSnapshot {
  const averageRating = Number.parseFloat(
    textContent(extractClassContent(html, "span", "Vq0ZA")),
  );
  const ratingCountText = textContent(extractClassContent(html, "p", "xJEoWe"));
  const ratingCount = Number.parseInt(ratingCountText.replace(/\D/g, ""), 10);
  const reviewSections = html.matchAll(
    /<section\b(?=[^>]*\bclass="[^"]*\bT7rvce\b[^"]*")[^>]*>([\s\S]*?)<\/section>/gi,
  );
  const reviews: ChromeStoreReview[] = [];

  for (const sectionMatch of reviewSections) {
    const reviewHtml = sectionMatch[1];
    const reviewerId = textContent(extractClassContent(reviewHtml, "span", "LfYwpe"));
    const review = textContent(extractClassContent(reviewHtml, "p", "fzDEpf"));
    const publishedAt = parsePublishedDate(
      textContent(extractClassContent(reviewHtml, "span", "ydlbEf")),
    );
    const rating = Number.parseFloat(
      /\baria-label="(\d(?:\.\d+)?)\s*星/i.exec(reviewHtml)?.[1] || "",
    );
    const avatarUrl = normalizeAvatarUrl(reviewHtml);
    const publicReviewId = /\bdata-ugc-id="([^"]+)"/i.exec(reviewHtml)?.[1];

    if (!reviewerId || !review || !publishedAt || !avatarUrl || !Number.isFinite(rating)) {
      continue;
    }

    reviews.push({
      reviewId: publicReviewId || `${reviewerId}-${publishedAt}`,
      reviewerId,
      avatarUrl,
      rating,
      review,
      publishedAt,
    });
  }

  if (!Number.isFinite(averageRating) || !Number.isFinite(ratingCount) || reviews.length < 4) {
    throw new Error("Chrome Web Store review markup was incomplete or changed");
  }

  return {
    sourceUrl: CHROME_STORE_REVIEW_URL,
    capturedAt,
    averageRating,
    ratingCount,
    reviews,
    source: "live",
  };
}

async function fetchChromeStoreReviews(fetchImpl: ReviewFetch, timeoutMs: number) {
  const url = new URL(CHROME_STORE_REVIEW_URL);
  url.searchParams.set("hl", "zh-CN");
  const response = await fetchImpl(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.7",
      "User-Agent": "lumno-web-review-sync/1.0",
    },
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`Chrome Web Store returned ${response.status}`);
  }

  return parseChromeStoreReviewPage(await response.text());
}

/**
 * Resolves fresh public reviews during Astro's static build. The scheduled Pages
 * workflow rebuilds the site automatically; if Chrome is unavailable or changes
 * its markup, the last verified snapshot keeps the homepage deployable.
 */
export function getChromeStoreReviews(options: ChromeStoreReviewOptions = {}) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? REQUEST_TIMEOUT_MS;
  const shouldCache = !options.fetchImpl && !options.timeoutMs;

  if (shouldCache && liveReviewRequest) return liveReviewRequest;

  const request = fetchChromeStoreReviews(fetchImpl, timeoutMs).catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[chrome-store-reviews] Live reviews unavailable: ${message}`);
    if (shouldCache) liveReviewRequest = null;
    return CHROME_STORE_REVIEW_SNAPSHOT;
  });

  if (shouldCache) liveReviewRequest = request;
  return request;
}
