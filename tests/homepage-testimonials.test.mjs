import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  CHROME_STORE_REVIEW_SNAPSHOT,
  parseChromeStoreReviewPage,
} from "../src/lib/chrome-store-reviews.ts";

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const readSource = (file) => fs.readFileSync(path.join(workspaceRoot, file), "utf8");

test("Chrome review snapshot keeps public reviewer identity, avatar, score, and review text", () => {
  assert.match(CHROME_STORE_REVIEW_SNAPSHOT.sourceUrl, /nggfkkbmogmadfoikakkfegkoilfcfao\/reviews/);
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.capturedAt, "2026-08-15");
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.averageRating, 5);
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.ratingCount, 13);
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.reviews.length, 9);
  assert.ok(CHROME_STORE_REVIEW_SNAPSHOT.reviews.every((review) => review.rating === 5));
  assert.ok(CHROME_STORE_REVIEW_SNAPSHOT.reviews.every((review) => review.avatarUrl));
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.reviews[0].reviewId, "b6f9cc9a-3d5c-45bb-87d4-ef897761ba2d");
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.reviews[0].reviewerId, "weiyi Josscii");
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.reviews[0].publishedAt, "2026-08-10");
  assert.match(CHROME_STORE_REVIEW_SNAPSHOT.reviews[0].review, /非常好看好用的启动页/);
  assert.match(CHROME_STORE_REVIEW_SNAPSHOT.reviews[1].review, /微动效很丝滑/);
  assert.match(CHROME_STORE_REVIEW_SNAPSHOT.reviews.at(-1).review, /用了 Lumno 之后就回不去了/);
});

test("Chrome review parser reads live store markup during scheduled static builds", () => {
  const reviewCard = (id, reviewer, day, review) => `
    <section class="T7rvce">
      <img src="https://lh3.googleusercontent.com/${id}=s48" srcset="https://lh3.googleusercontent.com/${id}=s96 2x">
      <span class="LfYwpe">${reviewer}</span>
      <div aria-label="5 星（最高为 5 星）"></div>
      <span class="ydlbEf">2026年8月${day}日</span>
      <div data-ugc-id="${id}"></div>
      <p class="fzDEpf"><span>${review}</span></p>
    </section>`;
  const html = `
    <span class="Vq0ZA">4.9</span>
    <p class="xJEoWe">16 个评分</p>
    ${reviewCard("review-1", "用户 &amp; 一", 8, "评价一")}
    ${reviewCard("review-2", "用户二", 7, "评价二")}
    ${reviewCard("review-3", "用户三", 6, "评价三")}
    ${reviewCard("review-4", "用户四", 5, "评价四")}
  `;
  const snapshot = parseChromeStoreReviewPage(html, "2026-08-09");

  assert.equal(snapshot.source, "live");
  assert.equal(snapshot.averageRating, 4.9);
  assert.equal(snapshot.ratingCount, 16);
  assert.equal(snapshot.reviews.length, 4);
  assert.equal(snapshot.reviews[0].reviewerId, "用户 & 一");
  assert.equal(snapshot.reviews[0].publishedAt, "2026-08-08");
  assert.equal(snapshot.reviews[0].reviewId, "review-1");
});

test("testimonial marquee fills two continuous lanes with hover-intent pause and reduced-motion behavior", () => {
  const source = readSource("src/components/home/ChromeReviewMarquee.astro");

  assert.match(source, /const rows = \[reviews\.slice\(0, midpoint\), reviews\.slice\(midpoint\)\]/);
  assert.match(source, /\[false, true\]\.map\(\(duplicate\)/);
  assert.match(source, /data-review-track=\{rowIndex \+ 1\}/);
  assert.match(source, /const fillTrack = \(track: HTMLElement\) =>/);
  assert.match(source, /1 \+ Math\.ceil\(\(lane\.clientWidth \+ gap\) \/ shiftDistance\)/);
  assert.match(source, /track\.style\.setProperty\("--chrome-review-group-shift"/);
  assert.match(source, /duplicate\.dataset\.reviewGroupCopy = "true"/);
  assert.match(source, /const resizeObserver = new ResizeObserver\(fillTracks\)/);
  assert.match(source, /marquee\.dataset\.marqueeReady = "true"/);
  assert.match(source, /chrome-review-scroll-left 38s linear infinite/);
  assert.match(source, /animation-name: chrome-review-scroll-right/);
  assert.match(source, /translateX\(calc\(-1 \* var\(--chrome-review-group-shift\)\)\)/);
  assert.match(source, /const HOVER_PAUSE_DELAY_MS = 600/);
  assert.match(source, /const scheduleHoverPauseAfterIdle = \(\) => \{[\s\S]*?delete marquee\.dataset\.hoverPaused[\s\S]*?window\.setTimeout\([\s\S]*?HOVER_PAUSE_DELAY_MS/);
  assert.match(source, /addEventListener\("pointerenter", handlePointerEnter\)/);
  assert.match(source, /addEventListener\("pointermove", handlePointerMove\)/);
  assert.match(source, /window\.addEventListener\("scroll", handleScrollActivity, \{ passive: true \}\)/);
  assert.match(source, /addEventListener\("pointerleave"[\s\S]*?delete marquee\.dataset\.hoverPaused/);
  assert.match(source, /\.chrome-review-marquee\[data-hover-paused="true"\] \.chrome-review-marquee__track/);
  assert.doesNotMatch(source, /\.chrome-review-marquee:hover \.chrome-review-marquee__track/);
  assert.match(source, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(source, /animation: none/);
  assert.match(source, /aria-hidden=\{duplicate \? "true" : undefined\}/);
  assert.doesNotMatch(source, /chrome-review-marquee__proof/);
  // A single store link sits in the header; cards themselves stay link-free.
  assert.match(source, /data-analytics-event="open_chrome_web_store_reviews"/);
  assert.match(source, /src="\/assets\/lumno-newtab-monet-coastal-white\.webp"/);
  assert.match(source, /gridSize=\{2\}[\s\S]*?ditherMode="bayer"[\s\S]*?client:visible/);
  assert.match(source, /chrome-review-marquee__header[\s\S]*?chrome-review-marquee__frame[\s\S]*?<DitherShader[\s\S]*?chrome-review-marquee__rows/);
  assert.match(source, /\.chrome-review-marquee__frame \{[\s\S]*?width: min\(calc\(100% - 48px\), var\(--home-section-width, 1180px\)\)/);
  assert.match(source, /overflow: hidden;[\s\S]*?border-radius: var\(--home-radius-xl\);[\s\S]*?background: #f7f8ef;/);
  assert.match(source, /@media \(max-width: 760px\)[\s\S]*?\.chrome-review-marquee__frame \{[\s\S]*?width: calc\(100% - 32px\)/);
  assert.match(source, /font-size: 16px;[\s\S]*?font-weight: 400/);
  assert.match(source, /grid-template-columns: 32px minmax\(0, 1fr\)/);
  assert.match(source, /\.chrome-review-card__avatar \{[\s\S]*?width: 32px;[\s\S]*?height: 32px/);
  // Google-hosted avatars can be blocked; the reviewer's initial stays visible underneath.
  assert.match(source, /data-initial=\{Array\.from\(review\.reviewerId\)\[0\]\?\.toUpperCase\(\)\}/);
  assert.match(source, /onerror="this\.remove\(\)"/);
  assert.match(source, /\.chrome-review-card__identity strong \{[\s\S]*?font-size: 12px/);
  assert.doesNotMatch(source, /<time\b|chrome-review-card__rating|ratingLabel|dateFormatter/);
  assert.doesNotMatch(source, /reviewRatingLabel:/);
  assert.match(source, /\.chrome-review-card \{[\s\S]*?min-height: 172px/);
  assert.match(
    source,
    /@media \(max-width: 760px\)[\s\S]*?\.chrome-review-card \{[\s\S]*?min-height: 150px/,
  );
});

test("homepage visible typography never defines text below twelve pixels", () => {
  const files = [
    "src/components/home/ChromeReviewMarquee.astro",
    "src/components/home/hero-safari-demo.css",
    "src/components/home/onboarding-source/search-input.css",
    "src/components/home/onboarding-source/suggestions-view.css",
    "src/components/navigation/install-menu.css",
    "src/components/extension-settings/settings-kit.css",
  ];

  for (const file of files) {
    assert.doesNotMatch(readSource(file), /font-size:\s*(?:10|11)(?:\.\d+)?px/);
  }
});

test("homepage places the new-tab showcase and AI intent page before the review section", () => {
  const source = readSource("src/pages/index.astro");

  const heroIndex = source.indexOf('<section class="hero-section"');
  const aiIntentIndex = source.indexOf('<section id="ai-intent"');
  const newTabIndex = source.indexOf('<section id="new-tab"');
  const reviewsIndex = source.indexOf("<ChromeReviewMarquee");

  assert.ok(heroIndex >= 0, "homepage hero section should exist");
  assert.ok(aiIntentIndex >= 0, "homepage AI intent page should exist");
  assert.ok(newTabIndex >= 0, "homepage new-tab showcase should exist");
  assert.ok(reviewsIndex >= 0, "homepage review section should exist");
  assert.ok(heroIndex < aiIntentIndex && aiIntentIndex < newTabIndex && newTabIndex < reviewsIndex);

  assert.match(source, /<h2 id="ai-intent-title" class="home-h2"><span>\{content\.aiIntent\.title\}<\/span><\/h2>/);
  assert.match(source, /<AiIntentDemo locale=\{uiLocale\} client:visible \/>/);
  assert.match(source, /\.ai-intent-demo-slot\s*\{[\s\S]*?min-width: 0;/);
  assert.match(source, /@media \(max-width: 1080px\)[\s\S]*?\.ai-intent-section\s*\{[\s\S]*?grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(source, /reviews=\{showcaseReviews\}/);
  assert.match(source, /padding: 120px 0 80px/);
  assert.match(source, /height: max\(300px, calc\(100svh - 500px\)\)/);
  assert.match(source, /@media \(max-width: 760px\)[\s\S]*?height: max\(220px, calc\(100svh - 500px\)\)/);
  assert.match(source, /@media \(min-width: 761px\) and \(max-height: 740px\)/);
});

test("review marquee copy is localized for every homepage locale", () => {
  const source = readSource("src/lib/home-content.ts");

  assert.match(source, /title: "被认真使用，也被认真回应"/);
  assert.match(source, /title: "被認真使用，也被認真回應"/);
  assert.match(source, /title: "Loved by the people who use it"/);
  // Rating and count come from the live Chrome Web Store snapshot, never hard-coded copy.
  assert.equal((source.match(/summary: "[^"]*\{rating\}[^"]*\{count\}[^"]*"/g) || []).length, 3);
  assert.equal((source.match(/storeLinkLabel:/g) || []).length, 4);
});

test("review heading shares the homepage section heading system", () => {
  const source = readSource("src/components/home/ChromeReviewMarquee.astro");

  assert.match(source, /<h2 id="reviews-title" class="home-h2"><span>\{title\}<\/span><\/h2>/);
  assert.match(source, /<header class="home-section__head chrome-review-marquee__header">/);
});

test("showcase reviews leave out feature requests and questions", async () => {
  const { selectShowcaseReviews } = await import("../src/lib/chrome-store-reviews.ts");
  const review = (id, text, rating = 5) => ({
    reviewId: id,
    reviewerId: id,
    avatarUrl: "",
    rating,
    review: text,
    publishedAt: "2026-10-01",
  });

  const picked = selectShowcaseReviews([
    review("praise", "用了 Lumno 之后就回不去了，站内搜索太顺手。"),
    review("request", "希望在 group 中新打开的标签页也在同一组"),
    review("question", "可不可以再像 Arc 一点"),
    review("english-question", "Could you add a dark theme?"),
    review("low", "还行吧，界面不错但有点慢", 3),
  ]).map((item) => item.reviewId);

  assert.deepEqual(picked, ["praise"]);
});
