# Design QA — Homepage navigation wordmark

- Source visual truth: `/var/folders/v8/ldglz0810x30s8d8s4fjsfpc0000gn/T/codex-clipboard-a4d9283e-aedd-4c8c-9c23-485a91a6a992.png`
- Desktop implementation screenshot: `/tmp/lumno-home-nav-logo-smaller-desktop.png`
- Mobile implementation screenshot: `/tmp/lumno-home-nav-logo-smaller-mobile.png`
- Focused implementation crop: `/tmp/lumno-home-nav-brand-final-cropped.png`
- Focused side-by-side comparison: `/tmp/lumno-nav-brand-final-comparison.png` (source left, implementation right)
- State: homepage, default Simplified Chinese locale, navigation menus closed

## Capture normalization

- Source: 340 × 112 px supplied raster; visible 224 × 50 px wordmark trimmed and normalized onto a 92 × 22 px canvas.
- Desktop implementation: 1440 × 900 CSS px viewport at 1× capture density; rendered wordmark is 70 × 17 CSS px.
- Mobile implementation: 390 × 844 CSS px viewport at 1× capture density; rendered wordmark is 64 × 15 CSS px.
- Focused comparison: both 70 × 17 px samples were enlarged 4× for inspection without changing their relative geometry.

## Findings

- No actionable P0, P1, or P2 differences.
- Fonts and typography: the supplied Lumno letterform is preserved by the existing vector brand asset; its weight and silhouette match the reference.
- Spacing and layout rhythm: the desktop wordmark is 70 × 17 px inside a 5/10/5/22 px padded brand link; the mobile wordmark is 64 × 15 px with the same doubled left inset. Both remain vertically centered and the mobile navigation stays within the 390 px viewport.
- Colors and visual tokens: the source's very light gray was intentionally deepened from 10% to 24% fill opacity, matching the requested direction while retaining the soft visual character.
- Image quality and asset fidelity: the navigation uses the existing Lumno SVG brand asset at intrinsic aspect ratio. No stretching, raster blur, transparency halo, or placeholder asset was observed.
- Copy and content: the visible brand and accessible alternative text both remain “Lumno”.

## Full-view evidence

- Desktop: the wordmark is clearly visible on the translucent navigation bar, remains balanced against the language and install controls, and does not alter the 56 px bar height.
- Mobile: the 370 × 58 px bar contains the wordmark and both controls without horizontal page overflow (`documentElement.scrollWidth = 390`).

## Focused comparison evidence

- The side-by-side crop confirms the same Lumno silhouette and proportions as the supplied reference.
- The implementation is visibly darker than the source by design; this is the requested adjustment rather than drift.

## Interaction and console checks

- Brand link resolves to `/`.
- Install menu opens and exposes Chrome and Microsoft Edge options.
- Language menu opens and exposes English and Traditional Chinese options.
- Browser console warnings/errors: none.

## Comparison history

- Pass 1: no P0/P1/P2 visual findings; the initial 92 × 22 px wordmark implementation was functional but visually heavier than the reference context.
- Pass 2: reduced the wordmark to 78 × 19 px on desktop and 72 × 17 px on mobile, then added balanced padding around the brand link. Desktop and mobile screenshots show aligned controls, no clipping, and no P0/P1/P2 findings.
- Pass 3: doubled the left brand inset from 11 px to 22 px at the user's request. The rendered left inset is now 30 px from the nav edge on desktop and 28 px on mobile; controls remain aligned with no overflow.
- Pass 4: reduced the wordmark to 70 × 17 px on desktop and 64 × 15 px on mobile. The doubled left inset remains stable and the smaller mark preserves alignment, readability, and menu spacing.

## Follow-up polish

- None required for this scoped change.

final result: passed
