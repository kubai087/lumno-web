You can do most things in Lumno from the keyboard. This page lists the default shortcuts, how to change them, and the keys you can use in the command bar, on the new tab page, in the switcher and while clipping. Where a click does the same thing, it's listed next to the key.

## Default shortcuts {#defaults}

| Action | Shortcut |
| --- | --- |
| Open the command bar | `⌘ ⇧ K` |
| Open the recent tab switcher | `⌥ Q` |
| Open the command bar with the current page URL | Not set by default |
| Copy the current page URL | Not set by default |

The last two may show "Not set" after you install Lumno. To assign shortcuts to them, follow the steps below. The Firefox version uses a different default shortcut for the command bar; see [Browser compatibility](../browser-compatibility/#firefox).

## Change a shortcut {#change}

Browsers manage extension shortcuts on a separate page:

1. Type `chrome://extensions/shortcuts` in the address bar (`edge://extensions/shortcuts` in Edge).
2. Find Lumno, then click the pencil icon next to the action you want to change.
3. Press the new key combination.

![The browser's extension shortcuts page, with Lumno's "Open command bar" set to ⇧⌘K and "Open recent tab switcher" set to ⌥Q](shortcuts "Changing shortcuts on the extensions page")

If you're used to [Arc](https://arc.net/) or [Zen](https://zen-browser.app/), set "Open command bar" to `⌘ T`.

If the shortcut doesn't work in Dia, change the scope next to it from "In Dia" to "Global".

## Keys in the command bar {#command-bar-keys}

### Select a result

| Key | Action |
| --- | --- |
| `↑` `↓` | Move the selection up or down |
| Hold `⌘`, release it, then press `0`–`9` | Numbers appear next to the results; press one to open that result |

If you turn on "Single-press Command to show number jump" in Labs in Settings, one press of `⌘` shows the numbers, and you open a result by holding `⌘` and pressing its number. `⌘` then no longer opens results in the background; middle-click still does.

On macOS, you can also turn on "Mac keyboard navigation" in Labs to select the next and previous result with `⌃ N | ⌃ N` and `⌃ P | ⌃ P`.

### Open a result

| Key or click | Action |
| --- | --- |
| `↩`, or click a result | Open the result, or switch to it if it's an open tab |
| `⌥ ↩`, or hold `⌥` and click | Open in the current tab instead of a new one |
| `⇧ ↩`, or hold `⇧` and click | If the result is an open tab, open another copy in a new tab |
| `⌘ ↩`, hold `⌘` and click, or middle-click | Open in a background tab and keep the command bar open, so you can open the next one |

While you hold `⌥`, `⇧` or `⌘`, the hint on the right of each result changes to match.

### Typing and search modes

| Key | Action |
| --- | --- |
| `Tab` | Complete a suggestion; after a site shortcut, start site search; in an empty search box, search open tabs only |
| `Tab` `Tab` | In an empty search box, open the search scope panel; with a scope already selected, one press is enough |
| `⌥ ↑` `⌥ ↓` | Bring back the previous or next thing you typed |
| `⌘ Z` `⌘ ⇧ Z` | While the search scope panel is open, undo or redo a change to the order of search sources |
| `⌫` | In an empty search box, leave site search, a search scope or open-tab search |
| `Esc` | Leave site search, a search scope or open-tab search |
| `Esc`, or click outside the command bar | Close the command bar |

## Keys on the new tab page {#newtab-keys}

The search box on the new tab page uses the same keys as the command bar. On top of that:

| Key or click | Action |
| --- | --- |
| Start typing | Your text goes straight into the search box; no need to click it first |
| Click a search result, shortcut, bookmark or site card | Open it in the current tab by default, or in a new tab once you turn it on under General → New Tab Settings → Open in a new tab |
| Hold `⌘` and click, or middle-click | Open in a background tab |
| `⌥ ←` `⌥ →` | After selecting a shortcut with `Tab`, move it one place back or forward |
| `⌘ Z` | Undo your last change to shortcuts or bookmarks, such as removing, moving, creating a folder or deleting a group |
| `⌘ ⇧ Z` | Redo what you just undid |
| `Esc` | Cancel while dragging a shortcut or bookmark |

## Keys in the switcher {#switcher-keys}

| Key or click | Action |
| --- | --- |
| Hold `⌥` and press `Q` repeatedly | Move through recent tabs |
| `Tab`, `→` or `↓` | Select the next tab |
| `⇧ Tab`, `←` or `↑` | Select the previous tab |
| Release `⌥`, press `↩`, or click a tab | Switch to the selected tab |
| Click the close button in a page preview's corner | Close that tab; the switcher stays open |
| `Esc`, or click outside the switcher | Close the switcher and stay on the current tab |

If you've changed the switcher's shortcut, hold the modifier key from your own shortcut instead.

## Keys while clipping {#web-clip-keys}

While you choose what to clip:

| Key or action | Action |
| --- | --- |
| `[` or `↑` | Select the outer element |
| `]` or `↓` | Select the inner element |
| Scroll the mouse wheel | Move between outer and inner elements |
| `↩`, or click the outlined content | Open it in a floating window |
| `Esc` | Cancel |

In the floating window, clicking a link opens it in a new tab; hold `⌘` while you click to open it in the background. See [Web clip](../web-clip/).
