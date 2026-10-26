With dozens of tabs open and hundreds of bookmarks saved, finding a page can take longer than opening it. Lumno brings them together in one search box: press a shortcut, type a few letters, and your open tabs, bookmarks and history appear in one list.

## Open the search box {#open}

Press `⌘ ⇧ K` on any page. The search box appears in the middle of the screen. To close it, press `Esc` or click outside it.

On restricted pages, such as `chrome://` settings or extension stores, browsers don't allow extensions to show anything. On these pages, Lumno follows the "Restricted page behavior" option in its settings.

## Search results {#results}

The label next to each result shows where it comes from:

- Opened: a tab that's currently open. Press `↩` to switch to it instead of opening a duplicate.
- Bookmark: a page in your bookmarks bar or folders, shown with its folder.
- Frequent and History: the sites you visit most, and your browsing history.

Suggestions from your search engine also appear; press `↩` to search. As in the address bar, moving onto a suggestion with the arrow keys puts it in the search box, and `Esc` brings back what you typed. Results you choose more often move higher in the list.

By default, the first result is the page Lumno completes for you. If you mostly search, set First Search Result Priority to Search First under Search Result Settings in Lumno's settings: searching comes first, followed by any bookmark, history entry or top site titled exactly what you typed.

A domain typed with a Chinese full stop, such as `baidu。com`, opens as a URL; a sentence that ends in 。 is still searched.

![Lumno opened on a blank page: typing chrome lists an open GitHub tab, search suggestions, a bookmark and top sites](search "Typing chrome shows open tabs, bookmarks and top sites together")

Other useful keys: `⌥ ↩` opens a result in the current tab, and `⇧ ↩` opens another copy of an open tab. For all keys, see [Keyboard shortcuts](../keyboard-shortcuts/#command-bar-keys).

## Open in the current tab {#current-tab}

When you open the command bar on a webpage, results open in a new tab and the page you were on stays put. To open them in the current tab, as the address bar does, turn off "Open in a new tab when clicked" under General → Command Bar in Lumno's settings. Then:

- Pages, searches, typed addresses and site searches open in the current tab, and the hint next to each result changes from New Tab to Go.
- On a pinned tab, results still open in a new tab, so the pinned page isn't replaced.
- Open tabs are still switched to directly.

Either way, hold `⌥` while you press `↩` or click to open a result the other way, or hold `⌘` to open it in a background tab. The new tab page's search box has its own setting; see [Keys on the new tab page](../keyboard-shortcuts/#newtab-keys).

## Typed with the wrong keyboard {#keyboard-layout}

If what you typed matches nothing in your tabs, bookmarks or history, Lumno reads it again as if it had been typed on a Russian, Ukrainian, Hebrew, Arabic or Korean (2-set) keyboard. For example, `vjcrdf` finds Москва. It works the other way too: `пшерги`, typed with a Russian layout still on, finds GitHub. These results appear below direct matches.

Search also ignores differences such as full-width characters and accents, and Korean matches initial consonants, so `ㅅㅇ` finds 서울. The search scope panel matches the same way.

Chinese titles can be found by pinyin, initials or a mix of both: `wxds`, `wxdushu` and `weixinds` all find 微信读书. To treat z and zh, c and ch, s and sh, n and l, an and ang, en and eng, and in and ing as the same, turn on Fuzzy pinyin under Search Result Settings in Lumno's settings.

## Search only open tabs {#open-tabs}

When you have many tabs open, you can narrow the search: press `Tab` once while the search box is empty. "Search open tabs" appears on the left, and only your open tabs are listed. Type to filter, press `↩` to switch, and press `Esc` to exit.

![The search box shows "Search open tabs" on the left, with only the currently open tabs listed](opentabs "Search open tabs only")

To search only bookmarks, history or top sites, press `Tab` twice while the search box is empty, then choose one in the search scope panel.

## Close other tabs {#close-other-tabs}

When tabs pile up, click the brush icon on the right of the search box, then click Close in the prompt that appears, to close the other tabs in the current window. The current tab, pinned tabs and tabs in tab groups stay open. The button is in both the command bar and the new tab's search box.

If you change your mind, click the brush icon again, press `Esc` or click outside the prompt.
