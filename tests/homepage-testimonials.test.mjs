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
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.capturedAt, "2026-08-09");
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.averageRating, 5);
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.ratingCount, 12);
  assert.equal(CHROME_STORE_REVIEW_SNAPSHOT.reviews.length, 8);
  assert.ok(CHROME_STORE_REVIEW_SNAPSHOT.reviews.every((review) => review.rating === 5));
  assert.ok(CHROME_STORE_REVIEW_SNAPSHOT.reviews.every((review) => review.avatarUrl));
  assert.match(CHROME_STORE_REVIEW_SNAPSHOT.reviews[0].review, /微动效很丝滑/);
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

test("testimonial marquee uses two continuous lanes with hover-intent pause and reduced-motion behavior", () => {
  const source = readSource("src/components/home/ChromeReviewMarquee.astro");

  assert.match(source, /const rows = \[reviews\.slice\(0, midpoint\), reviews\.slice\(midpoint\)\]/);
  assert.match(source, /\[false, true\]\.map\(\(duplicate\)/);
  assert.match(source, /data-review-track=\{rowIndex \+ 1\}/);
  assert.match(source, /chrome-review-scroll-left 38s linear infinite/);
  assert.match(source, /animation-name: chrome-review-scroll-right/);
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
  assert.match(source, /chrome-review-marquee__proof[\s\S]*?<p>[\s\S]*?<SettingsButton/);
  assert.match(source, /variant="ghost"/);
  assert.match(source, /font-size: 14\.5px;[\s\S]*?font-weight: 400/);
  assert.match(source, /chrome-review-card__identity time[\s\S]*?font-size: 12px/);
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

test("homepage keeps reviews in Section 2 after the viewport-aware product demo", () => {
  const source = readSource("src/pages/index.astro");

  assert.match(
    source,
    /<section class="hero-section"[\s\S]*?<div class="hero-demo-slot">\s*<HeroSafariDemo[\s\S]*?client:load[\s\S]*?\/>\s*<\/div>\s*<\/section>\s*<ChromeReviewMarquee[\s\S]*?reviews=\{chromeStoreReviews\.reviews\}/,
  );
  assert.match(source, /padding: 120px 0 80px/);
  assert.match(source, /height: clamp\(300px, calc\(100svh - 470px\), 620px\)/);
  assert.match(source, /margin-top: clamp\(52px, 4\.5vw, 72px\)/);
  assert.match(source, /@media \(max-width: 760px\)[\s\S]*?padding: 120px 0 52px/);
  assert.match(source, /@media \(max-width: 760px\)[\s\S]*?height: clamp\(220px, calc\(100svh - 530px\), 440px\)/);
  assert.match(source, /@media \(max-width: 760px\)[\s\S]*?margin-top: 36px/);
  assert.match(source, /@media \(min-width: 761px\) and \(max-height: 740px\)/);
});

test("review marquee copy is localized for every homepage locale", () => {
  const source = readSource("src/lib/home-content.ts");

  assert.match(source, /reviewsTitle: "专注用户体验，与用户共创"/);
  assert.match(source, /reviewsTitle: "深受使用者信賴，與使用者共創。"/);
  assert.match(source, /reviewsTitle: "Trusted by users, built with users\."/);
  assert.equal((source.match(/reviewsAriaLabel:/g) || []).length, 4);
  assert.equal((source.match(/reviewsSourceLabel:/g) || []).length, 4);
});
