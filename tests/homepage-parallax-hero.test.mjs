import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const readSource = (file) => fs.readFileSync(path.join(workspaceRoot, file), "utf8");

test("homepage second section uses the Aceternity Hero Parallax composition", () => {
  const pageSource = readSource("src/pages/index.astro");
  const componentSource = readSource("src/components/ui/hero-parallax.tsx");
  const copySource = readSource("src/lib/home-content.ts");
  const fullBleedFeatureRules = pageSource.match(/\.feature-intro\s*\{[^}]*width:\s*100%;[^}]*\}/g) || [];

  // Fifteen real new tab renders per locale, one per card.
  assert.match(pageSource, /const FEATURE_PARALLAX_COUNT = 15;/);
  assert.match(pageSource, /\/assets\/feature-newtab\/\$\{getScreenshotLocale\(uiLocale\)\}\/parallax-\$\{String\(index \+ 1\)\.padStart\(2, "0"\)\}\.webp/);
  for (const locale of ["zh-CN", "zh-TW", "en"]) {
    for (let index = 1; index <= 15; index += 1) {
      const file = `public/assets/feature-newtab/${locale}/parallax-${String(index).padStart(2, "0")}.webp`;
      assert.ok(fs.existsSync(path.join(workspaceRoot, file)), `${file} is missing`);
    }
  }
  assert.match(pageSource, /<section id="new-tab" class="feature-intro"[\s\S]*?<HeroParallax/);
  assert.match(pageSource, /products=\{newTabParallaxProducts\}/);
  assert.match(pageSource, /title: content\.newTab\.screenshotAlt/);
  assert.match(pageSource, /client:visible/);
  assert.match(componentSource, /products\.slice\(0, 5\)/);
  assert.match(componentSource, /products\.slice\(5, 10\)/);
  assert.match(componentSource, /products\.slice\(10, 15\)/);
  assert.match(componentSource, /const LOOP_COPY_COUNT = 3/);
  assert.match(componentSource, /Array\.from\(\{ length: LOOP_COPY_COUNT \}/);
  assert.match(componentSource, /hero-parallax__row--reverse/);
  assert.match(componentSource, /aria-hidden=\{isLoopCopy \|\| undefined\}/);
  assert.doesNotMatch(componentSource, /<a\b/);
  assert.match(componentSource, /useScroll\(\{[\s\S]*?target: containerRef/);
  assert.match(componentSource, /offset: \["start 55%", "end 18%"\]/);
  assert.match(componentSource, /useTransform\(scrollYProgress, \[0, 0\.72\], \[0, 820\]\)/);
  assert.match(componentSource, /useTransform\(scrollYProgress, \[0, 0\.72\], \[0, -820\]\)/);
  assert.match(componentSource, /const ENTRANCE_END = 0\.18;/);
  assert.match(componentSource, /useTransform\(entrance, \[0, 1\], \[-700, -300\]\)/);
  // The 3D tilt plays once per page view: after the stage first flattens, it stays flat.
  assert.match(componentSource, /if \(progress >= ENTRANCE_END\) hasEnteredRef\.current = true;/);
  assert.match(componentSource, /return hasEnteredRef\.current \? 1 : progress \/ ENTRANCE_END;/);
  // The copy reveals once it is in view, so it can never stay hidden on short pages.
  assert.match(componentSource, /const isHeaderInView = useInView\(headerRef, \{ once: true, amount: 0\.4 \}\)/);
  assert.match(componentSource, /const isHeaderVisible = isHeaderInView \|\| isHeaderPassed \|\| Boolean\(shouldReduceMotion\)/);
  // A flat container lets the copy's z-index sit above the rotated card stage.
  assert.doesNotMatch(componentSource, /\[transform-style:preserve-3d\]/);
  assert.match(componentSource, /rotateX: shouldReduceMotion \? 0 : rotateX/);
  assert.match(componentSource, /rotateZ: shouldReduceMotion \? 0 : rotateZ/);
  assert.match(componentSource, /translateY: shouldReduceMotion \? -300 : translateY/);
  assert.doesNotMatch(componentSource, /isStageSettled/);
  assert.match(componentSource, /relative flex h-auto flex-col[\s\S]*?md:h-auto/);
  assert.doesNotMatch(componentSource, /h-\[[^\]]+\][\s\S]*?md:h-\[[^\]]+\]/);
  assert.match(componentSource, /useReducedMotion\(\)/);
  assert.match(componentSource, /data-hero-parallax-stage/);
  assert.match(componentSource, /data-hero-parallax-copy/);
  assert.match(componentSource, /initial=\{HERO_COPY_HIDDEN\}/);
  assert.match(componentSource, /const HERO_COPY_TRANSITION: Transition = \{[\s\S]*?opacity: \{ duration: 0\.72, ease: "easeOut" \}[\s\S]*?filter: \{ duration: 0\.82, ease: HERO_COPY_EASE \}/);
  assert.match(componentSource, /const HERO_DESCRIPTION_TRANSITION: Transition = \{[\s\S]*?delay: 0\.13/);
  assert.doesNotMatch(componentSource, /data-hero-parallax-stage[\s\S]*?filter:/);
  assert.doesNotMatch(componentSource, /opacity:\s*shouldReduceMotion|const opacity = useTransform/);
  assert.doesNotMatch(componentSource, /x:\s*isStageSettled/);
  assert.doesNotMatch(componentSource, /<motion\.div\s+data-hero-parallax-stage[^>]*initial=/);
  assert.doesNotMatch(componentSource, /useTransform\([^)]*filter:/);
  assert.match(componentSource, /data-hero-parallax-card/);
  assert.match(componentSource, /hero-parallax__title/);
  assert.match(componentSource, /hero-parallax__description/);
  assert.match(componentSource, /hero-parallax__header relative -top-20/);
  assert.match(componentSource, /hero-title-line/);
  assert.match(componentSource, /hero-title-segment/);
  assert.equal(fullBleedFeatureRules.length, 1);
  assert.match(componentSource, /aspect-\[8\/5\]/);
  assert.match(componentSource, /object-contain object-center/);
  assert.doesNotMatch(componentSource, /object-cover/);
  assert.doesNotMatch(componentSource, /shadow-xl/);
  assert.doesNotMatch(componentSource, /ring-1 ring-border/);
  assert.doesNotMatch(componentSource, /whileHover=/);
  assert.doesNotMatch(componentSource, /group-hover\/product:opacity-100/);
  assert.doesNotMatch(componentSource, /<h3/);
  assert.doesNotMatch(componentSource, /hero-parallax__link/);
  assert.doesNotMatch(pageSource, /linkLabel=\{content\.featurePageLabel\}/);
  assert.doesNotMatch(pageSource, /linkAriaLabel=\{content\.featurePageAria\}/);
  assert.match(pageSource, /\.hero-parallax\s*\{[\s\S]*?--hero-parallax-row-loop-offset: -175rem/);
  assert.match(
    pageSource,
    /\.hero-parallax__header::before\s*\{[\s\S]*?pointer-events:\s*none;[\s\S]*?background:\s*linear-gradient\([\s\S]*?to bottom[\s\S]*?var\(--bg\)[\s\S]*?transparent/,
  );
  assert.match(pageSource, /\.hero-parallax__row--reverse\s*\{[\s\S]*?margin-left: var\(--hero-parallax-row-loop-offset\)/);
  assert.match(
    pageSource,
    /@media \(max-width: 760px\)[\s\S]*?--hero-parallax-row-loop-offset: -77\.5rem/,
  );
  assert.match(copySource, /title: "每次打开，都是一幅画"/);
  assert.match(pageSource, /eyebrow=\{content\.newTab\.eyebrow\}/);
  // Feature cards follow the parallax inside the same section.
  assert.match(pageSource, /<HeroParallax[\s\S]*?<NewTabSection content=\{content\.newTab\} locale=\{uiLocale\} \/>[\s\S]*?<\/section>/);
});
