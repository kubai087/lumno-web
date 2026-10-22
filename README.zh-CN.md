<p align="center">
  <img src="./public/assets/logo@3x.png" alt="Lumno 标志" width="88" height="88" />
</p>

<h1 align="center">lumno-web</h1>

<p align="center">
  <a href="https://lumno.kubai.design/">lumno.kubai.design</a> 的源码。这是
  <a href="https://github.com/kubai087/lumno-extension">Lumno</a>（Chrome / Edge / Firefox 命令栏与新标签页扩展）的官网。
  <br />
  基于 Astro + React 的静态站点，支持十种语言，首页的动效演示按扩展的真实界面绘制。
</p>

<p align="center">
  <a href="https://lumno.kubai.design/">官网</a> ·
  <a href="https://lumno.kubai.design/help/">帮助中心</a> ·
  <a href="https://github.com/kubai087/lumno-extension">扩展仓库</a>
  <br />
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.md">English</a>
</p>

> 本仓库只有官网。扩展本身的问题和功能建议请提到
> [lumno-extension](https://github.com/kubai087/lumno-extension/issues)。

## 包含哪些页面

| 路由 | 内容 |
| --- | --- |
| `/` | 首页：命令栏、新标签页、划词工具的动效演示 |
| `/help/<slug>/` | 帮助中心（目录在 `src/lib/guides.ts`，正文在 `src/content/guides/`），带站内搜索 |
| `/release/` | 更新日志，构建时从 [lumno-extension 的 GitHub Releases](https://github.com/kubai087/lumno-extension/releases) 拉取 |
| `/privacy/` | 隐私政策（`src/content/privacy-policy*.md`） |
| `/account/`、`/oauth/`、`/auth/` | 基于 Supabase 的账号登录页 |
| `/llms.txt`、`/llms-full.txt` | 给 AI 搜索引擎读的摘要 |

所有页面都会预渲染简体中文（`/`）和另外九种语言（`/en/`、`/zh-tw/`、`/ja/`、`/ko/`、`/de/`、`/fr/`、`/es/`、`/pt-br/`、`/ru/`）。线上是 GitHub Pages 上的纯静态文件，不需要服务器。

## 值得一看：动效是怎么做的

首页大部分内容都是动画，背后有几条共同原则：服务端 HTML 永远是一帧完整、可读的画面；脚本只在上面叠加动效；开启「减弱动态效果」或禁用 JS 的访客也能看到完整内容；首屏用不到的部分不加载 React。可以从这些文件读起：

| 效果 | 文件 | 看点 |
| --- | --- | --- |
| 首屏开场与浏览器演示 | [`HeroSafariDemo.tsx`](src/components/home/HeroSafariDemo.tsx)、[`hero-safari-demo.css`](src/components/home/hero-safari-demo.css) | 光标跟随输入的关键词，再落到搜索结果上；JS 时间线与 CSS 时长通过 `[data-intro-pace]` 保持同步。开场等字体加载完、连续若干帧布局稳定后才开始（不等 `window.load`），然后设置 `data-intro-ready` 解除 CSS 动画的暂停。 |
| 倾斜的截图墙 | [`ui/hero-parallax.tsx`](src/components/ui/hero-parallax.tsx) | 滚动驱动四个弹簧（用解析解，任何帧长都精确），把数值写成舞台上的 CSS 变量，再由 CSS 组合出倾斜和各行的横移。滚动时 React 完全不重新渲染；服务端 HTML 就是倾斜的第一帧；「减弱动态效果」只靠 CSS 就能得到展平的画面。 |
| 抖色油画 | [`DitherShader.tsx`](src/components/home/DitherShader.tsx)、[`ordered-dither.ts`](src/lib/ordered-dither.ts) | 保留原色的有序抖色，只用一块画布，按一张 16 × 256 的查找表原地处理像素。一个画布像素对应一个固定大小的抖色格，窗口缩放时颗粒不会“呼吸”；开场期间画好的画布会一直沿用到开场结束。 |
| 滚动入场 | [`home-reveal.ts`](src/scripts/home-reveal.ts)、[`home.css`](src/styles/home.css) | `[data-reveal]` 元素等首屏开场结束后才播放、只播一次，同一帧进入视口的元素按文档顺序错开。 |
| 新标签页场景 | [`newtab/scene-runtime.ts`](src/components/home/newtab/scene-runtime.ts)、[`newtab/`](src/components/home/newtab/) | 一组 Astro 插画共用的播放逻辑，标记本身就是每一轮的最后一帧。 |
| 随壁纸自适应的时钟颜色 | [`newtab/scene-clock-ink.ts`](src/components/home/newtab/scene-clock-ink.ts) | 采样文字背后的壁纸颜色，向页面色调偏移，再保证最低对比度。 |
| 划词工具栏折叠成状态胶囊 | [`AiIntentDemo.tsx`](src/components/home/AiIntentDemo.tsx)、[`ai-intent-demo.css`](src/components/home/ai-intent-demo.css) | 工具栏收拢成胶囊，再飞进新开的标签页。 |
| 悬停重播 | [`OpenSourceArt.tsx`](src/components/home/OpenSourceArt.tsx)、[`home-phone.ts`](src/scripts/home-phone.ts) | 进入视口播放一次；悬停时重新挂载动画部分来重播。手机上改为重新进入视口或点击时重播。 |
| 评价跑马灯 | [`ChromeReviewMarquee.astro`](src/components/home/ChromeReviewMarquee.astro) | 纯 CSS 的滚动轨道叠在抖色油画上；手机上改成手动滑动的一行卡片。 |
| 吸附轮播 | [`newtab/NewTabCarousel.astro`](src/components/home/newtab/NewTabCarousel.astro) | 吸附点对齐内容栏，栏外的卡片淡出；连续点击箭头时从平滑滚动的目标位置继续计数。 |
| 滑动的选项卡指示块 | [`extension-settings/tabs-indicator.ts`](src/components/extension-settings/tabs-indicator.ts) | 一个色块滑到当前选项卡下面；按真实盒子尺寸测量，父元素有缩放时也不会差一像素。 |
| 连续曲率圆角 | [`public/continuous-corners.css`](public/continuous-corners.css) | 用 CSS `corner-shape` 实现超椭圆圆角，不支持的浏览器回退到普通 `border-radius`。 |

动效依赖的加载性能优化：

- [`island-modulepreload.mjs`](src/integrations/island-modulepreload.mjs) 把每个立即加载的 island 的完整依赖图写成 `modulepreload`，首屏一次请求到位，而不是一层层往返。
- [`quiet-redirects.mjs`](src/integrations/quiet-redirects.mjs) 把 Astro 生成的重定向页改成绘制前就跳走的空白页（GitHub Pages 不支持真正的重定向）。
- 顶栏菜单是渲染成静态 HTML 的 React 组件，由 [`settings-select-runtime.ts`](src/scripts/settings-select-runtime.ts) 驱动，所以 `/release/` 和 `/privacy/` 不加载 React。社区面板在第一次悬停时才加载对话框（[`community-panel.ts`](src/scripts/community-panel.ts)）。
- 视觉上关键的 SVG 一律内联（`?raw` + `set:html`），保证 Safari 下清晰。

这些决定背后的原因记录在 [AGENTS.md](AGENTS.md)。

## 本地开发

需要 Node.js 22.12 或更高版本。

```bash
npm ci
npm run dev        # http://localhost:4321
```

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 先跑测试，再构建到 `dist/`，最后检查帮助中心搜索质量 |
| `npm run preview` | 预览构建好的 `dist/` |
| `npm run check` | Astro 与 TypeScript 类型检查 |
| `npm test` | 运行 Node 测试（`tests/*.test.mjs`） |
| `npm run search-eval` | 逐条输出帮助中心搜索评测结果 |

不做任何配置也能构建。如果要开启统计、站长平台验证、账号登录或更换更新日志的数据源，把 [`.env.example`](.env.example) 复制为 `.env`；里面的变量都是可选的，每项都有说明。

构建 `/release/` 时会调用 GitHub API。没有 token 时共用匿名额度；如果构建因此失败，设置 `GITHUB_RELEASES_TOKEN` 即可。

## 目录结构

```text
src/
  pages/            路由；[locale]/ 为九种带前缀的语言生成同样的页面
  layouts/          SitePage（更新日志、隐私政策）、AuthLayout（账号页）
  components/
    home/           首页各区块与演示
    guides/         帮助中心框架与文章渲染
    site/           共用的顶栏和页脚
    ui/             shadcn/ui 风格的基础组件（见 THIRD_PARTY_NOTICES.md）
  content/          帮助中心文章、隐私政策及其翻译
  lib/              语言、SEO、帮助中心目录、更新日志解析、站点链接
  scripts/          不依赖 React 的小型客户端脚本
  styles/           设计变量与页面样式
  integrations/     Astro 构建插件
public/             原样复制的静态文件（图片、字体、CNAME）
scripts/            构建辅助脚本：商店版本、字体子集化、帮助中心截图、IndexNow
tests/              基于 node:test 的源码测试
```

### 帮助中心内容

文章是 `src/content/guides/` 下的 Markdown，每种语言一个文件。简体中文是原文，其他语言是它的翻译。截图都是扩展的真实画面，由 [`scripts/guide-screenshots/`](scripts/guide-screenshots/) 拍摄。改标题时请同步更新 `src/content/guides/search/` 里的搜索别名；修复一个搜不到的问题时，请在 `search/eval/` 里加一条用例。

### 字体

Open Sans 和 Remix Icon 由 `scripts/subset-fonts.py` 子集化（需要 `fonttools` 和 `brotli`）。用到新的 `ri-*` 图标类之后要重新运行，否则 `tests/font-assets.test.mjs` 会失败。

## 部署

[`deploy-pages.yml`](.github/workflows/deploy-pages.yml) 会在推送到 `main`、定时任务、以及扩展仓库发版后触发时，构建并部署到 GitHub Pages。它会获取各商店的当前版本，用 `.env.example` 中列出的仓库 secrets 构建，并把有变化的页面提交给 IndexNow。Pull Request 由 [`ci.yml`](.github/workflows/ci.yml) 检查。

## 参与贡献

欢迎修复问题、改进翻译和性能。提交前请先读 [CONTRIBUTING.md](CONTRIBUTING.md) 和[行为准则](CODE_OF_CONDUCT.md)；安全问题请按 [SECURITY.md](SECURITY.md) 私下报告。

## 许可证

源代码以 [MIT 许可证](LICENSE) 发布。欢迎学习，也可以把其中的实现方法和组件用到你自己的项目里。

MIT 许可证**不包括**：

- **Lumno 品牌**：名称、标志、应用图标和字标。
- **Lumno 的内容与美术素材**：扩展的截图和录屏、壁纸与插画、帮助中心文章、隐私政策等文案，以及社区群二维码。
- **第三方素材**：字体、图标和其他产品的标志，各自遵循其原有条款。

请不要把本站的副本当作自己的网站发布，也不要把 fork 出来的站点宣传成 Lumno。具体哪些文件不在 MIT 许可范围内、原因是什么，见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

Lumno 扩展是独立的项目，使用 [GPL-3.0](https://github.com/kubai087/lumno-extension/blob/main/LICENSE) 许可证。
