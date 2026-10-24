在最近浏览的两三个页面之间来回切换时，使用切换器最快：无需输入，按两下即可到达。

## 打开切换器 {#open}

按下 `⌥ Q`，最近使用过的标签页会按顺序排列，并显示页面预览。

![最近标签页切换器，按使用顺序列出四个标签页，每个都有页面预览](switcher "最近标签页切换器")

## 切换标签页 {#switch}

1. 按住 `⌥`，连按 `Q` 移动到目标页面，也可以使用 `Tab` 或方向键。
2. 松开 `⌥` 或按 `↩`，即可切换到该页面。

不再需要的标签页，可以直接在切换器中关闭：将鼠标移到页面预览上，点击角落出现的关闭按钮即可。

用法与系统的 `⌘ Tab | Alt + Tab`、[Arc](https://arc.net/) 的 `⌃ Tab` 类似。

## 切换器与「搜索已打开标签页」 {#vs-search}

- 目标页面在最近使用的几个之中：使用切换器，按两下即可到达。
- 标签页较多，目标页面已不在最近几个之中：按 `⌘ ⇧ K`，在搜索框为空时按一次 `Tab`，只搜索已打开的标签页。详见[搜索标签页、书签和历史记录](../search-tabs-bookmarks-history/#open-tabs)。

## 用 Ctrl+Tab 打开切换器 {#ctrl-tab}

如果习惯了在 [Arc](https://arc.net/) 中用 `⌃ Tab` 切换标签页，也可以把它设为切换器的快捷键。浏览器的快捷键页面不接受这个组合键，需要在该页面的控制台中设置：

1. 在地址栏中输入 `chrome://extensions/shortcuts` 并打开。
2. 按 `⌘ ⌥ J | Ctrl + Shift + J` 打开控制台。
3. 粘贴下面的代码，按 `↩` 运行。

   ```js
   const extensions = await chrome.developerPrivate.getExtensionsInfo();
   const lumno = extensions.find((item) =>
     item.commands.some((command) => command.name === "show-tab-switcher"));
   await chrome.developerPrivate.updateExtensionCommand({
     extensionId: lumno.id,
     commandName: "show-tab-switcher",
     keybinding: "Ctrl+Tab",
   });
   ```

4. 刷新页面，「打开最近标签页切换器」会显示为 `⌃ Tab`。

![浏览器的扩展快捷键页面，Lumno 的“打开最近标签页切换器”为 ⌃⇥](shortcuts-ctrl-tab "设置后的扩展快捷键页面")

之后按住 `⌃`，连按 `Tab` 选择标签页，松开 `⌃` 即可切换。

- 第一次在控制台中粘贴时，浏览器会要求先输入一段确认文字，按提示输入后再粘贴即可。
- 这段代码只修改 Lumno 的这一个快捷键。设置后，浏览器自带的 `⌃ Tab`（切换到右侧的标签页）不再生效。
- 想改回来，在同一页面点击该项右侧的铅笔图标，重新设置快捷键即可。
- 这个方法用到了浏览器快捷键页面自带的接口，浏览器更新后可能失效。

## 修改快捷键 {#shortcut}

切换器的快捷键可以在 `chrome://extensions/shortcuts` 中修改，详见[快捷键](../keyboard-shortcuts/#change)。

页面预览由 Lumno 在你切换标签页时于本机截取，每张最多保留 2 小时，不会离开你的电脑。
