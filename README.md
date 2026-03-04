# lumno-web

Lumno 官方网站仓库（静态站点），统一部署到：

- `/`：主页
- `/onboarding/`：安装后引导页
- `/release/`：版本更新说明

## 目录

- `site/`：部署到线上的网站文件
- `.github/workflows/deploy-pages.yml`：GitHub Actions 自动部署配置

## 域名规划

- 自定义域名：`lumno.kubai.design`
- 页面路径：
  - `https://lumno.kubai.design/`
  - `https://lumno.kubai.design/onboarding/`
  - `https://lumno.kubai.design/release/`

## 术语说明（给新手）

- **GitHub Pages**：GitHub 提供的静态网站托管服务。
- **Custom Domain（自定义域名）**：把你自己的域名（如 `lumno.kubai.design`）绑定到 GitHub Pages。
- **DNS CNAME 记录**：把一个域名指向另一个域名的 DNS 记录类型。
- **Workflow（工作流）**：GitHub Actions 的自动化脚本，这里用于自动部署网站。
