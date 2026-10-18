这里整理了官网和用户群中最常被问到的问题。每个回答都附有详细说明的链接。

## 使用 {#using}

### 默认快捷键是什么？可以修改吗？

在 Mac 上，默认快捷键为 `⌘ ⇧ K | ⌘ ⇧ K`；在 Windows 和 Linux 上为 `Ctrl + Shift + K`。快捷键可以在 `chrome://extensions/shortcuts` 中修改，详见[快捷键](../keyboard-shortcuts/#change)。Firefox 版的默认快捷键不同，详见[浏览器兼容性](../browser-compatibility/#firefox)。

### 按下快捷键没有反应怎么办？

请先确认当前页面不是 `chrome://` 设置页、扩展商店这类受限页面，再到 `chrome://extensions/shortcuts` 检查快捷键是否被其他扩展占用。在 Dia 中，还需要把该项右侧的范围改为「全局」。

### 为什么在有些页面上打不开命令栏，而是打开了新标签页？

出于安全考虑，浏览器不允许任何扩展在 `chrome://` 设置页、扩展程序页、Chrome 应用商店和 Edge 加载项网站等受限页面上运行或显示界面，Lumno 也无法绕过。在这些页面按下快捷键时，Lumno 会新开一个标签页并打开搜索框，这并不是故障；在普通网页上，命令栏仍会直接出现在当前页面上。从快捷方式打开 `chrome://inspect/#devices` 这类浏览器页面不受影响。如果需要在本地 PDF 或 HTML 文件中使用，请在扩展详情页中开启「允许访问文件网址」。详见 [Lumno 做不到的事](../limitations/#restricted-pages)。

### 命令栏的深浅色为什么和系统不一致？

在「跟随系统」模式下，命令栏还会参考当前网页的颜色。如果只想跟随系统，请在 Lumno 设置的「外观」中关闭「基于网页色彩自动变更主题色」。

### 从 Arc 换过来，还能使用熟悉的命令栏吗？

可以。Lumno 的交互参考了 [Arc](https://arc.net/)（与 Arc 官方没有关联），在 Dia、Chrome 和 Edge 中都可以随时唤出命令栏。把快捷键改为 `⌘ T`，即可沿用 Arc 的操作习惯。详见[从 Arc 迁移](../arc-command-bar/)。

## 新标签页 {#new-tab}

### 能只用命令栏，继续使用其他新标签页扩展吗？

可以。保持 Lumno 开启，再重新安装或重新启用原来的新标签页扩展，让它重新接管新标签页即可，命令栏不受影响。具体步骤见[搭配其他新标签页扩展](../newtab-other-extensions/)。

### 为什么新标签页的地址栏中显示一串扩展网址？

这是因为开启了「输入框自动聚焦」：为了让光标直接落在 Lumno 的搜索框中，地址栏会显示扩展网址。在新标签页的外观设置中关闭这一项，地址栏就会恢复空白。

## 兼容性 {#compatibility}

### 支持哪些浏览器？

支持 Chrome、Edge、Dia、Brave、Vivaldi 等 Chromium 内核浏览器，以及 Firefox 140 及以上版本和 Zen 等基于 Firefox 的浏览器，暂不支持 Safari。在 Dia 中可以使用命令栏，但新标签页暂不可用。详见[浏览器兼容性](../browser-compatibility/)。

### Firefox 版和 Chrome 版有什么不同？

主要功能相同，只有几处受 Firefox 的限制：无法使用网页剪裁和视频自动画中画；不能在 `about:` 页面、附加组件网站和本地文件中唤出命令栏；默认快捷键改为 `⌃ ⇧ K | Alt + K`。详见[浏览器兼容性](../browser-compatibility/#firefox)。

### Zen、LibreWolf 等基于 Firefox 的浏览器能用吗？

可以。这些浏览器使用 Firefox 版，从 [Firefox 附加组件](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/)安装即可，内核需要 Firefox 140 及以上版本。

### Safari 和手机浏览器能用吗？

暂不支持。Safari 的扩展体系与 Chromium 差异较大，Lumno 暂时没有 Safari 版，也不支持手机和平板上的浏览器。如果你在手机上打开了本网站，且手机已登录 Google 账号，可以先点击安装；之后打开电脑上登录同一 Google 账号并开启同步的 Chrome，Lumno 会自动同步安装。详见[浏览器兼容性](../browser-compatibility/#safari)。

## 数据与同步 {#data}

### 设置能在多台设备之间同步吗？

可以。设置默认通过浏览器账号同步；开启 WebDAV 同步（支持坚果云和自建服务器）后，还可以在不同浏览器之间同步图标和壁纸。详见[同步设置](../sync/)。

### Lumno 会上传我的浏览数据吗？

不会。标签页、书签和历史记录都在本机搜索。只有在进行网页搜索或向 AI 提问时，你输入的内容才会发送给你选择的搜索引擎或 AI 网站。详见[隐私政策](/privacy/)。

### Lumno 免费吗？需要注册吗？

Lumno 完全免费，源码以 GPL-3.0 协议在 [GitHub](https://github.com/kubai087/lumno-extension) 上开源。Lumno 没有账号系统，安装后即可使用，无需注册。
