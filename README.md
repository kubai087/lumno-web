# lumno-web

Lumno 官方网站仓库，采用 **Astro + React**，部署到 GitHub Pages。

## 页面规划

- `/`：主页（功能介绍）
- `/onboarding/`：安装后引导页
- `/release/`：版本更新说明（构建时从 GitHub Releases 拉取）

## 本地开发

```bash
npm install
npm run dev
```

## 构建与预览

```bash
npm run build
npm run preview
```

构建产物位于 `dist/`，由 `.github/workflows/deploy-pages.yml` 自动部署。

## 埋点（GA4）

首页支持 GA4。部署时设置环境变量：

- `PUBLIC_GA_ID`：例如 `G-XXXXXXXXXX`

未设置时会自动跳过埋点脚本注入。

## Release 数据源配置（可选）

`/release/` 默认读取 `kubai087/lumno-web` 的 Releases。可通过构建环境变量覆盖：

- `GITHUB_RELEASES_OWNER`
- `GITHUB_RELEASES_REPO`
- `GITHUB_RELEASES_TOKEN`（可选，用于提升 API 额度或读取私有仓库）

## 域名

- 自定义域名：`lumno.kubai.design`
- `public/CNAME` 在构建时会原样复制到 `dist/CNAME`
