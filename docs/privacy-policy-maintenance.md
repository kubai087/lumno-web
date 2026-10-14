# Lumno 隐私政策维护基线

这份文档用于维护公开隐私政策，不是面向用户的法律文本。公开页面的简体中文正文是事实与结构的编辑源，繁体中文和英文必须在同一次变更中保持等义更新。

## 当前覆盖范围

- Lumno 浏览器扩展 0.9.58 及以上版本（0.9.40 起已移除 Lumno 账号、Supabase 云同步和产品使用统计）；
- `lumno.kubai.design` 公开页面；
- 浏览器内置同步（`chrome.storage.sync`）、可选 WebDAV 同步和配置导出 / 导入；
- 输入时自动发送的在线搜索建议（含搜狗实际使用的腾讯 `sor.html5.qq.com`），以及用户主动发起的搜索、AI、选中文字与 favicon 请求；
- 每日一言、Bing、Lorem Picsum 和克利夫兰艺术博物馆的在线壁纸请求；
- 扩展自动发起的请求：更新后向 GitHub 获取版本标题（可在设置中关闭“更新提示”），以及反馈入口读取官网 `community-links.json` 与二维码；
- 页面内容读取：标签切换器缩略图、选中文字、自动画中画、进度追踪；
- VibeLoft 和部署时可能启用的 Google Analytics 官网统计。

Lumno 不运营存放用户数据的服务器。若重新引入账号、云端存储或遥测，属于第 4 类触发项，必须在上线前重写政策和应用商店披露。

## 事实来源

| 政策事实 | 代码或配置来源 |
| --- | --- |
| 扩展权限与页面访问范围 | `lumno-extension/manifest.json`；Firefox 版在 `scripts/build-firefox.js` 中去掉 `favicon`、加上 `sessions` |
| 应用商店数据披露 | `lumno-extension/docs/chrome-web-store-data-disclosure.md`；Firefox 附加组件按 `scripts/build-firefox.js` 中的 `data_collection_permissions` 披露 |
| WebDAV 同步范围、凭据存储与服务器文件 | `lumno-extension/docs/webdav-sync.md`、`src/background/webdav-sync.js`、`src/shared/webdav-contract.js` |
| 搜索建议、AI 与 favicon 网络请求 | `lumno-extension/src/background/background.js`、`ai-provider-submit.js`、`src/shared/favicon-utils.js` |
| 更新提示与社区链接请求 | `lumno-extension/src/shared/update-notice.js`、`src/shared/community-links.js` |
| 浏览器同步键 | `lumno-extension/src/shared/settings.js` 中的 `CHROME_SYNC_STORAGE_KEYS` |
| 壁纸与每日一言请求 | `lumno-extension/src/newtab/remote-content.js`、`docs/chrome-web-store-data-disclosure.md` 中的数据保留与公开链接一节 |
| 官网统计 | `src/components/SeoHead.astro` |

## 必须触发政策复查的变更

以下任一项变化时，不能只改应用商店表单或产品文案，必须同步复查三种语言正文：

1. Manifest 新增或扩大权限、host permission、content script 匹配范围；
2. 新增同步键、WebDAV 快照字段，或引入任何统计指标、账号资料字段；
3. 新增第三方 API、AI / 搜索服务、网站统计、错误监控、客服或邮件服务；
4. 改变默认同意状态、账号要求、同步方式、媒体上传行为或本机 / 云端边界；
5. 改变项目区域、服务商、保存期限、匿名汇总方式、备份或删除流程；
6. 新增广告、变现、数据交易、画像或自动化决策；
7. Chrome Web Store、Firefox 附加组件政策、适用法律或服务商数据条款发生实质变化；
8. 用户请求流程、安全措施或联系人发生变化。

## 发布前检查

1. 从简体中文事实源更新繁体中文和英文，不通过逐句机器直译替代法律含义复核；
2. 对照 Manifest、WebDAV 实现、应用商店数据披露和官网脚本重新核对“收集什么、为何使用、给谁、保存多久、如何删除”；
3. 确认 Chrome Web Store Privacy practices、Firefox 版 Manifest 的 `data_collection_permissions`、商店描述、产品内显著披露和本政策完全一致；
4. 对新采集确认其对扩展单一用途确有必要，并在采集前提供显著披露与适用的明确同意；
5. 更新 `src/lib/privacy-content.ts` 中的 `PRIVACY_LAST_UPDATED` 与 `PRIVACY_POLICY_VERSION`；章节增减时同步 `PRIVACY_SECTION_IDS`（三种语言的 `##` 章节数必须一致）；运行隐私页测试、完整测试和静态构建；
6. 检查三种语言的链接、表格、移动端表格横向滚动、目录高亮和顶部导航的语言切换；
7. 重大变化在扩展内展示更新说明，不能仅修改网页。

## 建议节奏

- 每次涉及上述触发项的版本发布前复查；
- 每季度核对服务商、保存期限、项目区域和应用商店披露；
- 每年至少进行一次完整法律与平台规则复核；
- 发生安全事件、用户投诉或监管要求时立即复查。

## 仍需产品层处理的事项

- 官网仍构建 `/account/`、`/auth/callback/`、`/oauth/authorize/` 页面并使用 Supabase 客户端；本政策按“扩展与官网公开页面”编写，未覆盖这些页面。若它们仍在使用，需要在政策中补充披露；若已废弃，应删除页面与相关配置。
- 壁纸选择面板的预览缩略图以普通 `<img>` 加载，在线搜索建议的 `fetch` 未显式设置 `referrerPolicy`；政策已按现状措辞。若代码补齐 `referrerPolicy="no-referrer"` / `credentials: "omit"`，可相应收紧政策表述。

- 当前官网公开页会加载 VibeLoft，并可能启用 Google Analytics；仅在政策中披露不能替代部分地区要求的网站统计同意机制。上线面向相关地区前，应评估是否按地区延迟加载并提供撤回入口。
- VibeLoft 的公开隐私说明、数据字段和保存期限需要在每次供应商复查时确认；如无法获得足够透明度，应移除或替换该脚本。
- 跨境传输、儿童年龄门槛和地区性权利可能需要针对目标市场的律师复核。政策中的全球通用措辞不能替代特定司法辖区的产品流程。
