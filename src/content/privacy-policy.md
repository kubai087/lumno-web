## 1. Product Scope / 产品范围

Lumno 是一款浏览器效率扩展，提供网页搜索浮层、自定义新标签页、标签页搜索、历史记录搜索、书签搜索、常用网站展示、站内搜索快捷词，以及部分可选的视频画中画辅助能力。

Lumno is a browser productivity extension that provides an in-page command bar, a custom new tab page, tab search, history search, bookmark search, top-site surfaces, site-search shortcuts, and optional Picture-in-Picture helpers on supported websites.

## 2. What Lumno Can Access / Lumno 可能访问的数据

- **已打开标签页 / Open tabs:** 用于展示、排序、切换与恢复标签页。
- **浏览历史 / Browsing history:** 用于本地搜索历史记录与排序。
- **书签 / Bookmarks:** 用于搜索书签及在新标签页中展示书签入口。
- **常用网站 / Top sites:** 用于展示常访问网站。
- **网站内容 / Website content:** 用于网页内浮层、快捷键响应与可选画中画功能。
- **用户输入搜索词 / User-entered search queries:** 用于搜索、站内搜索与联网建议。
- **扩展设置 / Extension settings:** 用于保存主题、语言、布局与搜索偏好。
- **账号信息 / Account information:** 登录后处理用户 ID、邮箱，以及由 Google、GitHub 或邮箱登录提供的昵称、头像和登录方式。
- **同步内容 / Synced content:** 你选择同步的配置、快捷方式和自定义壁纸等媒体文件。
- **使用统计 / Usage metrics:** 功能开关、配置属性、插件版本、平台以及唤起次数等纯数字事件；不包含具体浏览网址、网页标题、书签内容或搜索词。

## 3. Local Processing First / 默认本地处理

Lumno 默认在浏览器本地完成大部分功能，包括标签页搜索、历史记录搜索、书签搜索、Top Sites 展示、新标签页渲染，以及扩展设置和轻量缓存的保存。

Lumno does not upload your browsing history URLs, page titles, bookmark tree, or open-tab list to the developer's own servers.

账号、同步与使用统计是独立于上述浏览器数据的云端能力。即使登录，Lumno 也不会把浏览历史网址、网页标题、书签树、打开的标签页列表或搜索词作为同步或统计数据上传。

## 4. Third-Party Requests / 第三方请求

### Search suggestions / 搜索建议

当你使用搜索建议功能时，输入的搜索词可能会被浏览器发送到所选搜索引擎或其建议接口，例如 Google、Bing、Baidu、Yahoo、DuckDuckGo、Yandex、360、Quark、Shenma 或相关接口。

### Default web search / 默认网页搜索

当你提交普通网页搜索时，查询词可能会发送给浏览器默认搜索引擎或你选择的搜索引擎。

### Favicon loading / 网站图标加载

为了显示网站图标，Lumno 可能会根据域名向目标网站或第三方 favicon 服务请求图标资源。第三方服务可能因此看到请求域名、IP 地址和常规请求元数据。

## 5. Storage / 本地存储

Lumno 使用 Chrome 扩展存储能力保存设置和部分轻量缓存，包括 `chrome.storage.local`、`chrome.storage.sync` 以及在可用时的会话级扩展存储。

- 主题与语言设置 / Theme and language preferences
- 搜索引擎偏好 / Search engine preference
- 站内搜索快捷词配置 / Site-search shortcut configuration
- 布局和展示偏好 / Layout and presentation preferences
- 本地 UI 状态与轻量缓存 / Local UI state and lightweight caches

## 6. Account, Sync and Service Providers / 账号、同步与服务商

Lumno 使用 Supabase 提供账号认证、数据库和私有对象存储，使用 Resend 发送邮箱验证码；当你选择社交登录时，Google 或 GitHub 会按照其各自的隐私政策处理登录请求。自定义壁纸存放在受访问控制的私有存储中，不作为公开链接发布。

账号、同步和媒体数据主要存放在 Supabase 日本东京区域。Supabase、Resend、Google 和 GitHub 可能在用户所在国家或地区以外处理身份、邮件或有限服务日志。Lumno 面向全球用户，并在适用时依赖履行服务所必需的处理、用户同意及服务商提供的数据保护条款和合法传输机制。

网页登录页不加载 Lumno 的网站访问统计脚本。Lumno 官网的其他公开页面可能使用聚合访问统计；扩展内的产品使用统计与浏览内容分离，并只用于可靠性、功能采用情况和产品改进。

登录会话保存在你的设备中。插件令牌存放在扩展源私有的 IndexedDB，不进入 Chrome 同步，也不向网页内容脚本开放。云端访问受账号身份与行级访问控制约束，使每位用户只能读取自己的同步记录和媒体对象。

## 7. Retention and Your Choices / 保存期限与用户选择

账号、同步设置和媒体文件保留至你删除相关数据或永久删除账号。与账号关联的每日产品使用统计及配置属性保留 **24 个月**；到期后，仅把次数按“月份和功能指标”汇总为不含用户 ID、设备 ID、邮箱和配置属性的长期总数，并删除账号关联明细。统计上传的去重批次标识保留 30 天，同步写入的去重操作记录保留 90 天。

Account-linked daily usage and configuration attributes are retained for **24 months**. After that, only non-identifying monthly totals per feature metric may be retained long term; these totals contain no user, device, email, or configuration identifiers. Accounts, synced settings, and media remain until deleted by the user.

当前 Supabase Free 计划的 API 与数据库日志保留 1 天；Resend 默认保留验证码邮件和投递记录 30 天。你可以退出登录、关闭可选统计，或联系我们请求访问、导出、更正或删除账号及关联数据。关闭统计会立即停止新统计并清除本机待上传计数；永久删除账号会删除云端账号、同步配置、媒体和仍可关联到账号的统计。

## 8. Permissions / 权限说明

- `tabs`: 查询、切换、创建、更新和管理标签页。
- `history`: 提供本地历史记录搜索。
- `bookmarks`: 搜索与展示书签。
- `topSites`: 展示常访问网站。
- `storage`: 保存扩展设置。
- `identity`: 打开受控网页登录窗口，并通过带 PKCE 与 state 校验的专用回调完成插件登录。
- `search`: 调用浏览器搜索能力。
- `scripting` 与页面访问权限（如 `<all_urls>`）: 在网页中注入扩展 UI 和快捷键逻辑，并支持可选网页内功能。

## 9. Data Sale and Transfer / 数据出售与转移

开发者声明：Lumno 不出售用户数据；不会将用户数据用于与扩展核心功能无关的目的；不会将用户数据用于信用评估、放贷或类似用途。

The developer states that Lumno does not sell user data and does not transfer user data for purposes unrelated to the extension's core functionality.

Lumno 对从浏览器 API 和 Google API 获得的信息的使用遵守 Chrome Web Store User Data Policy（包括 **Limited Use** 要求）。Lumno 不将这些数据用于个性化广告；除具体支持请求获得用户同意、安全调查、法律义务，或聚合匿名化后的内部运营外，不允许人工读取用户内容。

## 10. Children / 儿童

Lumno 面向一般用户，不专门面向 13 周岁以下儿童。未达到所在地区可独立同意个人信息处理年龄的用户，应在监护人同意和指导下使用账号、同步和可选统计功能。

Lumno is not directed to children under 13. Anyone below the age at which they may independently consent to personal-data processing in their region should use account, sync, and optional analytics features only with a guardian's consent and guidance.

## 11. Contact / 联系方式

> **Developer / 开发者**
>
> 中文：枯白啃设计
>
> Other language contexts: Kubai087
>
> Website / 网站：<https://lumno.kubai.design>
>
> Privacy & Security / 隐私与安全：[i@kubai.design](mailto:i@kubai.design)
