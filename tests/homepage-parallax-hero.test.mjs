import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");
const readSource = (file) => fs.readFileSync(path.join(workspaceRoot, file), "utf8");

test("homepage second section opens with the tilted screenshot wall", () => {
  const pageSource = readSource("src/pages/index.astro");
  const componentSource = readSource("src/components/ui/hero-parallax.tsx");
  const copySource = readSource("src/lib/home-content.ts");
  const fullBleedFeatureRules = pageSource.match(/\.feature-intro\s*\{[^}]*width:\s*100%;[^}]*\}/g) || [];

  // Fifteen real new tab renders per locale, one per card.
  assert.match(pageSource, /const FEATURE_PARALLAX_COUNT = 15;/);
  assert.match(pageSource, /const parallaxLocale = getScreenshotLocale\(uiLocale\)/);
  assert.match(pageSource, /\/assets\/feature-newtab\/\$\{parallaxLocale\}\/parallax-\$\{String\(index \+ 1\)\.padStart\(2, "0"\)\}/);
  for (const locale of ["zh-CN", "zh-TW", "en"]) {
    for (let index = 1; index <= 15; index += 1) {
      for (const suffix of ["", "-480", "-960"]) {
        const file = `public/assets/feature-newtab/${locale}/parallax-${String(index).padStart(2, "0")}${suffix}.webp`;
        assert.ok(fs.existsSync(path.join(workspaceRoot, file)), `${file} is missing (run scripts/build-newtab-image-variants.mjs)`);
      }
    }
  }
  // Cards load the size they show and paint an inline preview until it arrives.
  const previews = JSON.parse(readSource("src/assets/parallax-previews.json"));
  for (const locale of ["zh-CN", "zh-TW", "en"]) {
    assert.equal(previews[locale].length, 15);
    for (const preview of previews[locale]) assert.match(preview, /^data:image\/webp;base64,/);
  }
  assert.match(pageSource, /srcSet: `\$\{base\}-480\.webp 480w, \$\{base\}-960\.webp 960w, \$\{base\}\.webp 1280w`/);
  assert.match(componentSource, /srcSet=\{shot\.srcSet\}/);
  assert.match(componentSource, /backgroundImage: `url\("\$\{shot\.preview\}"\)`/);
  assert.match(pageSource, /<section id="new-tab" class="feature-intro"[\s\S]*?<HeroParallax/);
  assert.match(pageSource, /shots=\{newTabParallaxShots\}/);
  assert.match(pageSource, /title: content\.newTab\.screenshotAlt/);
  assert.match(pageSource, /<HeroParallax[\s\S]*?client:idle[\s\S]*?\/>/);
  assert.match(pageSource, /eyebrow=\{content\.newTab\.eyebrow\}/);
  // Feature cards follow the wall inside the same section.
  assert.match(pageSource, /<HeroParallax[\s\S]*?<NewTabSection content=\{content\.newTab\} locale=\{uiLocale\} \/>[\s\S]*?<\/section>/);
  assert.match(copySource, /title: "每次打开，都是一幅画"/);

  // Rows: three of five on wide screens, a fourth reshuffled row on phones, each repeated
  // so its drift never runs out, with only one pass in the accessibility tree.
  assert.match(componentSource, /shots\.slice\(0, 5\), driftsRight: true/);
  assert.match(componentSource, /shots\.slice\(5, 10\), driftsRight: false/);
  assert.match(componentSource, /shots\.slice\(10, 15\), driftsRight: true/);
  assert.match(componentSource, /index % 3 === 0\), driftsRight: false, className: "mb-0 md:hidden"/);
  assert.match(componentSource, /const ROW_REPEATS = 3;/);
  assert.match(componentSource, /aria-hidden=\{hidden \|\| undefined\}/);
  assert.match(componentSource, /hero-parallax__row--reverse flex-row-reverse/);
  assert.doesNotMatch(componentSource, /<a\b/);

  // Scroll drives four springs without React renders; CSS turns their variables into transforms.
  assert.doesNotMatch(componentSource, /useScroll|useSpring|useTransform|MotionValue/);
  assert.match(componentSource, /const PROGRESS_START = 0\.55;/);
  assert.match(componentSource, /const PROGRESS_END = 0\.18;/);
  assert.match(componentSource, /const TILT_SPAN = 0\.18;/);
  assert.match(componentSource, /const DRIFT_SPAN = 0\.72;/);
  assert.match(componentSource, /const DRIFT_PX = 820;/);
  assert.match(componentSource, /tiltX: \{ from: 15, to: 0 \}/);
  assert.match(componentSource, /tiltZ: \{ from: 20, to: 0 \}/);
  assert.match(componentSource, /lift: \{ from: -700, to: -300 \}/);
  assert.match(componentSource, /const SPRING_OMEGA = Math\.sqrt\(300\);/);
  assert.match(componentSource, /const SPRING_ZETA = 30 \/ \(2 \* SPRING_OMEGA\);/);
  assert.match(componentSource, /\[transform:translateY\(var\(--hp-lift\)\)_rotateX\(var\(--hp-tilt-x\)\)_rotateZ\(var\(--hp-tilt-z\)\)\]/);
  assert.match(componentSource, /\[transform:translateX\(var\(--hp-drift\)\)\]/);
  assert.match(componentSource, /\[transform:translateX\(calc\(var\(--hp-drift\)\*-1\)\)\]/);
  // The server frame is the tilted wall, and reduced motion gets the flat one from CSS alone.
  assert.match(componentSource, /style=\{stageStyle\(RESTING\)\}/);
  assert.match(componentSource, /motion-reduce:\[transform:translateY\(-300px\)\]/);
  assert.match(componentSource, /motion-reduce:\[transform:none\]/);
  assert.match(componentSource, /useStageMotion\(wallRef, stageRef, !reduceMotion\)/);
  // The tilt plays once per page view: after the stage first flattens, it stays flat.
  assert.match(componentSource, /if \(progress >= TILT_SPAN\) hasFlattened = true;/);
  assert.match(componentSource, /const flatness = hasFlattened \? 1 : progress \/ TILT_SPAN;/);
  // Layout offsets, not boxes, so a transformed ancestor can't shift the progress.
  assert.match(componentSource, /node\.offsetTop/);
  // A flat container lets the copy's z-index sit above the rotated card stage.
  assert.doesNotMatch(componentSource, /\[transform-style:preserve-3d\]/);
  assert.match(componentSource, /\[perspective:1000px\]/);
  assert.match(componentSource, /data-hero-parallax-stage/);
  assert.match(componentSource, /data-hero-parallax-card/);

  // The copy reveals once it is in view or already passed, so it can never stay hidden.
  assert.match(componentSource, /\{ threshold: 0\.4 \}/);
  assert.match(componentSource, /element\.getBoundingClientRect\(\)\.top < window\.innerHeight \* 0\.6/);
  assert.match(componentSource, /hasAttribute\("data-crawler"\)/);
  assert.match(componentSource, /const copyRevealed = useRevealOnce\(copyRef\) \|\| reduceMotion;/);
  assert.match(componentSource, /data-hero-parallax-copy/);
  assert.match(componentSource, /hidden: \{ opacity: 0, y: 22, filter: "blur\(10px\)" \}/);
  assert.match(componentSource, /opacity: \{ duration: 0\.72, delay, ease: "easeOut" \}/);
  assert.match(componentSource, /filter: \{ duration: 0\.82, delay, ease: COPY_EASE \}/);
  assert.match(componentSource, /transition=\{copyTransition\(0\.13\)\}/);
  assert.match(componentSource, /hero-parallax__title/);
  assert.match(componentSource, /hero-parallax__description/);
  assert.match(componentSource, /hero-parallax__header relative -top-20/);
  assert.match(componentSource, /hero-title-line/);
  assert.match(componentSource, /hero-title-segment/);

  // Cards: full-bleed 8/5 renders with no hover chrome.
  assert.equal(fullBleedFeatureRules.length, 1);
  assert.match(componentSource, /aspect-\[8\/5\]/);
  assert.match(componentSource, /object-contain object-center/);
  assert.doesNotMatch(componentSource, /object-cover/);
  assert.doesNotMatch(componentSource, /shadow-xl/);
  assert.doesNotMatch(componentSource, /whileHover=/);
  assert.doesNotMatch(componentSource, /<h3/);

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
});

test("new tab filter lab loads renders sized to the screen", () => {
  const sectionSource = readSource("src/components/home/sections/NewTabSection.astro");
  for (const id of ["none", "blur", "grain", "blocks", "halftone", "dither", "ascii", "crt"]) {
    for (const suffix of ["", "-800", "-1200"]) {
      const file = `public/assets/feature-newtab/fx/fx-${id}${suffix}.webp`;
      assert.ok(fs.existsSync(path.join(workspaceRoot, file)), `${file} is missing (run scripts/build-newtab-image-variants.mjs)`);
    }
  }
  assert.match(sectionSource, /fx-\$\{id\}-800\.webp 800w, \/assets\/feature-newtab\/fx\/fx-\$\{id\}-1200\.webp 1200w, \$\{fxShot\(id\)\} 1600w/);
  assert.equal(sectionSource.match(/srcset=\{fxSrcSet\((?:"none"|id)\)\}\s*sizes=\{FX_SIZES\}/g)?.length, 2);
});
