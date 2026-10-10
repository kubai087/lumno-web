Lumno 是一个扩展，不是一个新浏览器。有些事受浏览器限制做不到，我们提前说清楚，省得你装完才发现。如果正好需要这些功能，下面也列出了能做到的工具。

## 侧边栏、Spaces 和分屏 {#not-a-browser}

垂直标签页、侧边栏、Arc 的 Spaces 和分屏，都需要浏览器本身支持，扩展改不了地址栏和标签栏。

- 想要垂直标签页：可以试试 [Microsoft Edge](https://www.microsoft.com/edge)，它自带垂直标签页。
- 想要接近 Arc 的侧边栏、工作区和分屏：可以试试 [Zen Browser](https://zen-browser.app/) 或 [Vivaldi](https://vivaldi.com/)。

## 有些页面唤不出命令栏 {#restricted-pages}

出于安全考虑，浏览器不允许扩展在这些页面上显示内容：

- `chrome://`、`edge://` 开头的浏览器页面
- Chrome 应用商店和 Edge 加载项网站

在这些页面按下快捷键，Lumno 会按设置里「在受限页行为」的选项来处理。

本地的 PDF、HTML 文件（`file://` 开头）可以用，但要先在扩展详情页打开「允许访问文件网址」。

## 不在浏览器里的东西 {#outside-browser}

Lumno 只搜浏览器里的东西。想用一个快捷键搜电脑上的应用、文件和系统设置，可以试试 [Raycast](https://www.raycast.com/) 或 [Alfred](https://www.alfredapp.com/)（macOS）。

## 不支持的浏览器 {#browsers}

- 暂不支持 Safari，也不支持手机上的浏览器。
- 在 Dia 里能用命令栏，但新标签页用不了。
- Firefox 版有几项功能用不了，详见[浏览器兼容性](../browser-compatibility/)。

## 新标签页的小组件 {#widgets}

Lumno 的新标签页走简洁路线，没有天气、待办、便签这类小组件。想要功能丰富的起始页，可以试试 [Momentum](https://momentumdash.com/)、[Infinity 新标签页](https://www.infinitynewtab.com/) 或 [WeTab](https://www.wetab.link/)。

受浏览器限制，同一时间只能有一个扩展接管新标签页。你可以继续用它们的新标签页，同时保留 Lumno 的命令栏。

## 云端同步 {#data}

Lumno 没有服务器，所以没有云端账号。设置会跟着浏览器自带的同步走；想连图标和壁纸一起同步，需要自己准备一个 WebDAV（比如坚果云或 NAS），见[同步设置](../sync/)。

浏览历史、书签和打开的标签页不在 Lumno 的同步范围里，照旧由浏览器自己同步。
