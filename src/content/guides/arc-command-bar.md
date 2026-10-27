[Arc](https://arc.net/) 将于 2026 年 12 月 22 日停用，届时 Mac 和 Windows 版 Arc 将无法打开。离开 Arc 之前，先把数据搬出来，再挑一款新浏览器。Lumno 参考了 Arc 的多项交互，包括命令栏、最近标签页切换、重启后恢复固定标签页和视频自动画中画，在 Chrome、Dia、Edge 中安装后即可继续使用。

Lumno 是独立的开源项目，与 Arc 及 The Browser Company 没有任何关联。

## Arc 停用时间表 {#timeline}

- **10 月 22 日**：Arc 宣布停用，不能再注册新的 Arc 账号。
- **11 月 23 日**：iOS 和 Android 版 Arc Search 关闭 AI 功能，也不能再登录和同步，但仍可作为普通浏览器使用。
- **12 月 15 日**：申请获取或删除 Arc 账号个人数据的最后一天。
- **12 月 22 日**：Mac 和 Windows 版 Arc 停止运行，所有账号停用，账号相关的个人数据在 30 天内删除。

停用后，存在这台电脑上的 Arc 数据也无法再打开。完整说明见 Arc 官方的 [Arc Sunset: Key Dates and What to Expect](https://resources.arc.net/hc/en-us/articles/44412972248471)。

## 12 月 22 日前先导出数据 {#export}

- **换到 Dia**：不需要导出。安装 Dia 后选择从 Arc 导入，Spaces、固定标签页、文件夹、书签、历史记录、密码和扩展都会带过去，Spaces 会变成 Dia 的 Profiles。导入时 Arc 需要保持安装，详见 [Move from Arc to Dia](https://resources.arc.net/hc/en-us/articles/44413129117591)。
- **换到其他浏览器**：在 Arc 的设置中打开「Advanced」，选择「Export Data」。Arc 会保存一个 `Arc Data Export.md` 文件，按 Space 列出收藏、固定标签页和文件夹里的链接。它是链接列表而不是书签文件，需要在新浏览器中手动打开或加入书签，详见 [How Do I Export My Data from Arc?](https://resources.arc.net/hc/en-us/articles/25583851606039)。

Easel 和 Boost 无法导出，也不会导入 Dia。

## 在 Arc 中用过 Lumno？先带走设置 {#lumno-settings}

Lumno 的设置保存在当前浏览器里，Arc 停用后就无法取回。换浏览器之前，在 Lumno 设置中[导出配置](../sync/#export)，装好新浏览器的 Lumno 后再导入；也可以开启 [WebDAV 同步](../sync/)，图标和壁纸也会一并带过去。

即使换到 Dia 时扩展会被一起导入，也建议先导出一份。

## 选择新浏览器 {#choose}

| 浏览器 | 与 Arc 的相似之处 | 搭配 Lumno |
| --- | --- | --- |
| Dia | 同一团队开发，有侧边栏、固定标签页和标签页切换器，可直接从 Arc 导入 | 可使用命令栏，新标签页暂不可用 |
| Chrome、Edge | 没有侧边栏和 Spaces，扩展生态最完整 | 全部功能可用 |
| [Zen Browser](https://zen-browser.app/) | 基于 Firefox，有侧边栏、工作区和分屏，与 Arc 十分相似 | 从 Firefox 附加组件安装，部分功能受限 |
| [Vivaldi](https://vivaldi.com/) | 有侧边栏、工作区和分屏 | 全部功能可用 |

各浏览器的具体支持情况见[浏览器兼容性](../browser-compatibility/)。

## 操作对照 {#mapping}

| Arc | Lumno |
| --- | --- |
| `⌘ T` 打开命令栏 | `⌘ ⇧ K` 唤出命令栏，也可以改为 `⌘ T` |
| 在命令栏中切换到已打开的标签页 | 选中标有「已打开」的结果，按回车键切换 |
| `⌃ Tab` 切换最近的标签页 | `⌥ Q` 打开最近标签页切换器 |
| `⌘ ⇧ C` 复制当前网址 | 在扩展快捷键页面为「复制当前网页链接」设置快捷键 |
| 重启后保留固定标签页 | 在 Lumno 设置中开启「重启后恢复置顶标签页」 |
| 切换标签页时视频自动进入画中画 | [视频自动画中画](../auto-pip/)，默认开启 |
| 新标签页 | Lumno 新标签页（暂不支持 Dia） |

## 迁移步骤 {#steps}

1. [安装 Lumno](../install/)：Chrome、Dia 用户从 Chrome 应用商店安装，Edge 用户从 Edge 加载项安装。
2. 打开 `chrome://extensions/shortcuts`，把「唤起聚焦搜索窗口」改为 `⌘ T`，和 Arc、[Zen](https://zen-browser.app/) 中的操作一致，详见[快捷键](../keyboard-shortcuts/#change)。Dia 用户需要先让出 `⌘ T`，见下文。
3. 按 `⌘ T`，尝试[搜索标签页、书签和历史记录](../search-tabs-bookmarks-history/)。
4. 需要在最近几个页面之间来回切换时，按 `⌥ Q` 打开[最近标签页切换器](../tab-switcher/)。

Dia 自己的快捷键优先于扩展，因此在 Dia 中需要先打开 Settings → Shortcuts，把「New Tab」的 `⌘ T` 改为其他按键，详见[浏览器兼容性](../browser-compatibility/#dia)。在 Dia 中按下快捷键没有反应时，请在扩展快捷键页面将范围从「In Dia」改为「Global」。

## Lumno 无法提供的 Arc 功能 {#limits}

侧边栏、Spaces 和分屏需要浏览器本身支持，扩展无法实现。如果离不开这些功能，可以选择上文的 Dia、Zen 或 Vivaldi。更多说明见 [Lumno 做不到的事](../limitations/)。
