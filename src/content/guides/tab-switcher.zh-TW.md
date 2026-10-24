在最近瀏覽的兩三個頁面之間來回切換時，使用切換器最快：不必輸入，按兩下即可到達。

## 開啟切換器 {#open}

按下 `⌥ Q`，最近使用過的分頁會依序排列，並顯示頁面預覽。

![最近分頁切換器，依使用順序列出四個分頁，每個都有頁面預覽](switcher "最近分頁切換器")

## 切換分頁 {#switch}

1. 按住 `⌥`，連按 `Q` 移動到目標頁面，也可以使用 `Tab` 或方向鍵。
2. 放開 `⌥` 或按 `↩`，即可切換到該頁面。

不再需要的分頁，可以直接在切換器中關閉：將滑鼠移到頁面預覽上，按一下角落出現的關閉按鈕即可。

用法與系統的 `⌘ Tab | Alt + Tab`、[Arc](https://arc.net/) 的 `⌃ Tab` 類似。

## 切換器與「搜尋已開啟分頁」 {#vs-search}

- 目標頁面在最近使用的幾個之中：使用切換器，按兩下即可到達。
- 分頁較多，目標頁面已不在最近幾個之中：按 `⌘ ⇧ K`，在搜尋框為空時按一下 `Tab`，只搜尋已開啟的分頁。詳見[搜尋分頁、書籤和瀏覽紀錄](../search-tabs-bookmarks-history/#open-tabs)。

## 用 Ctrl+Tab 開啟切換器 {#ctrl-tab}

如果習慣了在 [Arc](https://arc.net/) 中用 `⌃ Tab` 切換分頁，也可以把它設為切換器的快速鍵。瀏覽器的快速鍵頁面不接受這個組合鍵，需要在該頁面的主控台中設定：

1. 在網址列中輸入 `chrome://extensions/shortcuts` 並開啟。
2. 按 `⌘ ⌥ J | Ctrl + Shift + J` 開啟主控台。
3. 貼上下面的程式碼，按 `↩` 執行。

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

4. 重新整理頁面，「開啟最近分頁切換器」會顯示為 `⌃ Tab`。

![瀏覽器的擴充功能快速鍵頁面，Lumno 的「開啟最近分頁切換器」為 ⌃⇥](shortcuts-ctrl-tab "設定後的擴充功能快速鍵頁面")

之後按住 `⌃`，連按 `Tab` 選擇分頁，放開 `⌃` 即可切換。

- 第一次在主控台中貼上時，瀏覽器會要求先輸入一段確認文字，依提示輸入後再貼上即可。
- 這段程式碼只修改 Lumno 的這一個快速鍵。設定後，瀏覽器內建的 `⌃ Tab`（切換到右側的分頁）將不再生效。
- 想改回來，在同一頁面點擊該項右側的鉛筆圖示，重新設定快速鍵即可。
- 這個方法使用了瀏覽器快速鍵頁面內建的介面，瀏覽器更新後可能失效。

## 修改快速鍵 {#shortcut}

切換器的快速鍵可以在 `chrome://extensions/shortcuts` 中修改，詳見[快速鍵](../keyboard-shortcuts/#change)。

頁面預覽由 Lumno 在你切換分頁時於本機擷取，每張最多保留 2 小時，不會離開你的電腦。
