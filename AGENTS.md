# Lumno Web Agent Notes

Last updated: 2026-03-05

## Confirmed Tech Direction

- Framework: Astro + React
- Deployment target: GitHub Pages (static files)
- Analytics: Google Analytics 4 (gtag.js)
- Release page strategy: sync `/release` content with GitHub Releases data

## Infrastructure Notes

- Domain ownership and DNS are available (Alibaba Cloud domain).
- ICP filing is available (Tencent Cloud record).
- China mainland acceleration is **not** in current scope.
- Keep a future TODO for mainland performance/CDN optimization when traffic requires it.

## Practical Implications for Development

- Node.js is required for local development and build tooling.
- No Node.js server is required in production for the current static-site plan.
- Keep route structure stable:
  - `/` for product homepage and feature intro
  - `/onboarding` for post-install onboarding
  - `/release` for changelog/release notes

## Implementation Status

- Astro + React scaffold has been introduced in repository root.
- GitHub Pages workflow now builds with Node and deploys `dist/`.
- Onboarding page is currently preserved as static content under `public/onboarding`.
