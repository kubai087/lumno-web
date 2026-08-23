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

  assert.match(pageSource, /const FEATURE_PARALLAX_THUMBNAILS = \[[\s\S]*?\] as const/);
  assert.equal((pageSource.match(/\/assets\/feature-newtab\/newtab-\d+\.webp/g) || []).length, 15);
  assert.match(pageSource, /<section id="features" class="section feature-intro"[\s\S]*?<HeroParallax/);
  assert.match(pageSource, /products=\{featureParallaxProducts\}/);
  assert.match(pageSource, /client:visible/);
  assert.match(componentSource, /products\.slice\(0, 5\)/);
  assert.match(componentSource, /products\.slice\(5, 10\)/);
  assert.match(componentSource, /products\.slice\(10, 15\)/);
  assert.match(componentSource, /const LOOP_COPY_COUNT = 3/);
  assert.match(componentSource, /Array\.from\(\{ length: LOOP_COPY_COUNT \}/);
  assert.match(componentSource, /hero-parallax__row--reverse/);
  assert.match(componentSource, /aria-hidden=\{isLoopCopy \|\| undefined\}/);
  assert.match(componentSource, /tabIndex=\{isLoopCopy \? -1 : undefined\}/);
  assert.match(componentSource, /useScroll\(\{[\s\S]*?target: containerRef/);
  assert.match(componentSource, /offset: \["start 55%", "end 18%"\]/);
  assert.match(componentSource, /useTransform\(scrollYProgress, \[0, 0\.72\], \[0, 820\]\)/);
  assert.match(componentSource, /useTransform\(scrollYProgress, \[0, 0\.72\], \[0, -820\]\)/);
  assert.match(componentSource, /useTransform\(scrollYProgress, \[0, 0\.18\], \[-700, -300\]\)/);
  assert.match(componentSource, /const HEADER_REVEAL_PROGRESS = 0\.12/);
  assert.match(componentSource, /const revealHeader = useCallback\(\(\)/);
  assert.match(componentSource, /shouldReduceMotion \|\| scrollYProgress\.get\(\) >= HEADER_REVEAL_PROGRESS/);
  assert.match(componentSource, /useMotionValueEvent\(scrollYProgress, "change", revealHeader\)/);
  assert.match(componentSource, /const isHeaderVisible = isHeaderRevealed \|\| Boolean\(shouldReduceMotion\)/);
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
  assert.equal(fullBleedFeatureRules.length, 2);
  assert.match(componentSource, /aspect-\[1\.585\]/);
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
    /@media \(max-width: 760px\)[\s\S]*?--hero-parallax-row-loop-offset: -102\.5rem/,
  );
  assert.match(copySource, /featureSectionTitle: "你的满分新标签页"/);
  assert.match(copySource, /featureSectionDescription:\s*"不论是追求“极简”还是“功能性”，均可自由定制"/);
});
