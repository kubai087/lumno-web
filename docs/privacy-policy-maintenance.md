# Lumno 隐私政策维护基线

这份文档用于维护公开隐私政策，不是面向用户的法律文本。公开页面的简体中文正文是事实与结构的编辑源，繁体中文和英文必须在同一次变更中保持等义更新。

## 当前覆盖范围

- Lumno 浏览器扩展 0.9.30 及以上版本；
- `lumno.kubai.design` 公开页面和敏感账号页面；
- Supabase 账号、同步、自定义媒体和可选产品使用统计；
- Google / GitHub OAuth 身份关联；
- Google / GitHub 社交登录；
- 用户主动发起的搜索、AI、选中文字与 favicon 请求；
- VibeLoft 和部署时可能启用的 Google Analytics 官网统计。

## 事实来源

| 政策事实 | 代码或配置来源 |
| --- | --- |
| 扩展权限与页面访问范围 | `lumno-extension/manifest.json` |
| 可同步设置和统计允许字段 | `lumno-extension/src/shared/cloud-sync-schema.js` |
| 统计默认关闭、本机暂存与上传 | `lumno-extension/src/background/usage-analytics-runtime.js` |
| 搜索建议、AI 与 favicon 网络请求 | `lumno-extension/src/background/background.js`、`ai-provider-submit.js` |
| 账号会话、同步和媒体传输 | `lumno-extension/src/background/supabase-transport.js` |
| 云端表、RLS 和保存期限 | `lumno-extension/supabase/migrations/` |
| 永久删除账号的实际范围 | `lumno-extension/supabase/functions/delete-account/index.ts` |
| 官网统计与敏感页面例外 | `src/components/SeoHead.astro`、`src/layouts/AuthLayout.astro` |
| 服务商、项目区域和部署配置 | Supabase / Google / GitHub 控制台与部署环境变量 |

## 必须触发政策复查的变更

以下任一项变化时，不能只改应用商店表单或产品文案，必须同步复查三种语言正文：

1. Manifest 新增或扩大权限、host permission、content script 匹配范围；
2. 新增同步键、统计指标、统计维度、配置快照字段或账号资料字段；
3. 新增第三方 API、AI / 搜索服务、网站统计、错误监控、客服或邮件服务；
4. 改变默认同意状态、账号要求、同步方式、媒体上传行为或本机 / 云端边界；
5. 改变项目区域、服务商、保存期限、匿名汇总方式、备份或删除流程；
6. 新增广告、变现、数据交易、画像或自动化决策；
7. Chrome Web Store、适用法律或服务商数据条款发生实质变化；
8. 用户请求流程、安全措施或联系人发生变化。

## 发布前检查

1. 从简体中文事实源更新繁体中文和英文，不通过逐句机器直译替代法律含义复核；
2. 对照 Manifest、云端 schema、Edge Functions 和官网脚本重新核对“收集什么、为何使用、给谁、保存多久、如何删除”；
3. 确认 Chrome Web Store Privacy practices、商店描述、产品内显著披露和本政策完全一致；
4. 对新采集确认其对扩展单一用途确有必要，并在采集前提供显著披露与适用的明确同意；
5. 更新 `PRIVACY_LAST_UPDATED`，运行隐私页测试、完整测试和静态构建；
6. 检查三种语言的链接、表格、移动端滚动和右下角语言切换；
7. 重大变化在扩展内展示更新说明，不能仅修改网页。

## 建议节奏

- 每次涉及上述触发项的版本发布前复查；
- 每季度核对服务商、保存期限、项目区域和应用商店披露；
- 每年至少进行一次完整法律与平台规则复核；
- 发生安全事件、用户投诉或监管要求时立即复查。

## 仍需产品层处理的事项

- 当前官网公开页会加载 VibeLoft，并可能启用 Google Analytics；仅在政策中披露不能替代部分地区要求的网站统计同意机制。上线面向相关地区前，应评估是否按地区延迟加载并提供撤回入口。
- VibeLoft 的公开隐私说明、数据字段和保存期限需要在每次供应商复查时确认；如无法获得足够透明度，应移除或替换该脚本。
- 跨境传输、儿童年龄门槛和地区性权利可能需要针对目标市场的律师复核。政策中的全球通用措辞不能替代特定司法辖区的产品流程。
