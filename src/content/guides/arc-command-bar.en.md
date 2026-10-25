Since [Arc](https://arc.net/) stopped adding new features, many people have moved to Chrome, Dia or Edge. Lumno brings several of Arc's interactions to these browsers: the command bar, switching between recent tabs, restoring pinned tabs after a restart, and automatic picture-in-picture for videos.

Lumno is an independent open-source project and is not affiliated with Arc or The Browser Company.

## Arc and Lumno compared {#mapping}

| Arc | Lumno |
| --- | --- |
| `⌘ T` opens the command bar | `⌘ ⇧ K` opens the command bar; you can change it to `⌘ T` |
| Switch to an open tab from the command bar | Select a result marked "Opened" and press `↩` |
| `⌃ Tab` switches between recent tabs | `⌥ Q` opens the recent tab switcher |
| `⌘ ⇧ C` copies the URL | Assign a shortcut to "Copy Current Page URL" on the extensions page |
| Pinned tabs come back after a restart | Turn on "Restore Pinned Tabs After Restart" in Lumno's settings |
| Videos move into picture-in-picture when you switch tabs | [Auto picture-in-picture](../auto-pip/), on by default |
| New tab | Lumno's new tab (not yet available in Dia) |

## How to switch {#steps}

1. [Install Lumno](../install/): from the Chrome Web Store for Chrome and Dia, or from Edge Add-ons for Edge.
2. Open `chrome://extensions/shortcuts` and set "Open command bar" to `⌘ T`, the same key as in Arc and [Zen](https://zen-browser.app/). See [Keyboard shortcuts](../keyboard-shortcuts/#change). In Dia, free `⌘ T` first (see below).
3. Press `⌘ T` and try [searching your tabs, bookmarks and history](../search-tabs-bookmarks-history/).
4. To move between your last few pages, press `⌥ Q` to open the [recent tab switcher](../tab-switcher/).

Dia's own shortcuts take priority, so in Dia, first open Settings → Shortcuts and change "New Tab" from `⌘ T` to another key. See [Browser compatibility](../browser-compatibility/#dia). If the shortcut doesn't work in Dia, change its scope from "In Dia" to "Global" on the extensions page.

## Arc features Lumno can't provide {#limits}

A sidebar, Spaces and split view depend on the browser itself, so an extension can't add them. If you rely on them, try [Zen Browser](https://zen-browser.app/), a Firefox-based browser similar to Arc, or [Vivaldi](https://vivaldi.com/), which also has a sidebar, workspaces and split view. For more, see [What Lumno can't do](../limitations/).
