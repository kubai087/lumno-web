Arc 停止开发新功能后，不少用户转向了 Chrome、Dia 或 Edge，其中最难割舍的往往是命令栏。Lumno 的交互参考了 Arc，安装后即可在这些浏览器中使用熟悉的命令栏。

Lumno 是独立的开源项目，与 Arc 及 The Browser Company 没有任何关联。

## 操作对照 {#mapping}

| Arc | Lumno |
| --- | --- |
| `⌘ T` 打开命令栏 | `⌘ ⇧ K` 唤出命令栏，也可以改为 `⌘ T` |
| 在命令栏中切换到已打开的标签页 | 选中标有「已打开」的结果，按回车键切换 |
| `⌃ Tab` 切换最近的标签页 | `⌥ Q` 打开最近标签页切换器 |
| `⌘ ⇧ C` 复制当前网址 | 在扩展快捷键页面为「复制当前网页链接」设置快捷键 |
| 新标签页 | Lumno 新标签页（暂不支持 Dia） |

## 迁移步骤 {#steps}

1. [安装 Lumno](../install/)：Chrome、Dia 用户从 Chrome 应用商店安装，Edge 用户从 Edge 加载项安装。
2. 打开 `chrome://extensions/shortcuts`，把「唤起聚焦搜索窗口」改为 `⌘ T`，详见[快捷键](../keyboard-shortcuts/#change)。
3. 按 `⌘ T`，尝试[搜索标签页、书签和历史记录](../search-tabs-bookmarks-history/)。
4. 需要在最近几个页面之间来回切换时，按 `⌥ Q` 打开[最近标签页切换器](../tab-switcher/)。

在 Dia 中按下快捷键没有反应时，请在扩展快捷键页面将范围从「在 Dia 中」改为「全局」。

## Lumno 无法提供的 Arc 功能 {#limits}

侧边栏、Spaces 和分屏需要浏览器本身支持，扩展无法实现。如果离不开这些功能，可以试试 [Zen Browser](https://zen-browser.app/)，它是一款基于 Firefox、与 Arc 十分相似的浏览器；也可以试试 [Vivaldi](https://vivaldi.com/)，它同样提供侧边栏、工作区和分屏。更多说明见 [Lumno 做不到的事](../limitations/)。
