To move between the two or three pages you used most recently, the switcher is the fastest option: no typing, just two key presses.

## Open the switcher {#open}

Press `⌥ Q`. Your recent tabs appear in the order you used them, each with a page preview.

![The recent tab switcher, listing four tabs in the order they were used, each with a page preview](switcher "The recent tab switcher")

## Switch tabs {#switch}

1. Hold `⌥` and press `Q` repeatedly until you reach the page you want. You can also use `Tab` or the arrow keys.
2. Release `⌥`, or press `↩`, to switch to that page.

You can also close tabs you no longer need right from the switcher: hover over a page preview and click the close button that appears in its corner.

It works much like `⌘ Tab | Alt + Tab` on your computer, or `⌃ Tab` in [Arc](https://arc.net/).

## The switcher or open-tab search {#vs-search}

- If the page is one of the last few you used, use the switcher to get there in two key presses.
- If you have many tabs and the page isn't among the recent ones, press `⌘ ⇧ K`, then press `Tab` in the empty search box to search only open tabs. See [Search tabs, bookmarks and history](../search-tabs-bookmarks-history/#open-tabs).

## Open the switcher with Ctrl+Tab {#ctrl-tab}

If you're used to switching tabs with `⌃ Tab` in [Arc](https://arc.net/), you can make it the switcher's shortcut. The browser's shortcuts page won't accept this key combination, so set it from that page's console instead:

1. Type `chrome://extensions/shortcuts` in the address bar and open it.
2. Press `⌘ ⌥ J | Ctrl + Shift + J` to open the console.
3. Paste the code below and press `↩` to run it.

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

4. Reload the page. "Open recent tab switcher" now shows `⌃ Tab`.

![The browser's extension shortcuts page, with Lumno's "Open recent tab switcher" set to ⌃⇥](shortcuts-ctrl-tab "The extensions shortcuts page after the change")

Then hold `⌃` and press `Tab` repeatedly to pick a tab, and release `⌃` to switch to it.

- The first time you paste into the console, the browser asks you to type a short confirmation first. Type it as shown, then paste again.
- The code changes only this one Lumno shortcut. Afterwards the browser's own `⌃ Tab` (next tab to the right) no longer works.
- To change it back, click the pencil icon next to the item on the same page and set a new shortcut.
- This uses an interface built into the browser's shortcuts page, so it may stop working after a browser update.

## Change the shortcut {#shortcut}

You can change the switcher's shortcut at `chrome://extensions/shortcuts`. See [Keyboard shortcuts](../keyboard-shortcuts/#change).

Page previews are captured on your computer when you switch tabs. Each is kept for up to two hours and never leaves your device.
