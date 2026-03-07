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

全站支持 GA4。部署时设置环境变量：

- `PUBLIC_GA_ID`：例如 `G-XXXXXXXXXX`

未设置时会自动跳过埋点脚本注入。

当前会追踪的关键点击包括：

- Chrome Web Store 安装入口
- GitHub 仓库入口
- Discord 社区入口
- `/release/` 页面内的 GitHub Release 外链

## 站长平台验证

如需接入搜索引擎站长平台，可在部署时设置：

- `PUBLIC_GOOGLE_SITE_VERIFICATION`
- `PUBLIC_BING_SITE_VERIFICATION`

未设置时不会输出对应验证 meta 标签。

如果使用 GitHub Pages 工作流部署，请在仓库 `Settings -> Secrets and variables -> Actions` 中添加同名 secrets：

- `PUBLIC_GA_ID`
- `PUBLIC_GOOGLE_SITE_VERIFICATION`
- `PUBLIC_BING_SITE_VERIFICATION`

## Release 数据源配置（可选）

`/release/` 默认读取 `kubai087/lumno-web` 的 Releases。可通过构建环境变量覆盖：

- `GITHUB_RELEASES_OWNER`
- `GITHUB_RELEASES_REPO`
- `GITHUB_RELEASES_TOKEN`（可选，用于提升 API 额度或读取私有仓库）

## 域名

- 自定义域名：`lumno.kubai.design`
- `public/CNAME` 在构建时会原样复制到 `dist/CNAME`
