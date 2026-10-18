Lumno is built for Chromium browsers and also has a Firefox version. The table below shows which features are available in each browser.

## Supported browsers {#support}

| Browser | Command bar | New tab | Install from |
| --- | --- | --- | --- |
| Google Chrome | Yes | Yes | Chrome Web Store |
| Microsoft Edge | Yes | Yes | Edge Add-ons |
| Brave, [Arc](https://arc.net/), Vivaldi, Opera | Yes | Yes | Chrome Web Store |
| Dia | Yes | Not yet | Chrome Web Store |
| Firefox, [Zen](https://zen-browser.app/) and others | Partly | Yes | Firefox Add-ons |
| Safari | No | No | — |

Browsers on phones and tablets aren't supported yet. If you're reading this on a phone signed in to your Google account, you can tap install now: Lumno installs itself the next time you open Chrome on a computer signed in to the same account with sync on.

## Dia {#dia}

Dia doesn't allow extensions to replace the new tab, so Lumno's new tab isn't available there. The command bar works normally.

If the shortcut doesn't work, open the extension shortcuts page and change the scope next to Lumno from "In Dia" to "Global".

## Firefox {#firefox}

The Firefox version is on [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/). It supports Firefox 140 and later, and installs the same way in Firefox-based browsers such as Zen, LibreWolf and Floorp.

Because Firefox's extension APIs differ from Chromium's, some features aren't available:

| Feature | In Firefox |
| --- | --- |
| Auto picture-in-picture | Not available; Firefox doesn't let extensions put web video into picture-in-picture |
| Web clip | Not available; Firefox doesn't support document picture-in-picture |
| Command bar on `about:` pages and the add-ons site | Not available |
| Opening `about:` pages from shortcuts or the command bar | Not available |
| Command bar on local `file://` pages | Not available |
| Site icons | Sites you haven't visited may show a placeholder icon at first |
| Liquid glass on the new tab | Glass finish only; the edges don't bend the wallpaper |

Firefox already uses `⌘ ⇧ K`, so the Firefox version uses `⌃ ⇧ K | Alt + K` by default. `⌥ Q` stays the same. To change them, open `about:addons`, click the gear button at the top right and choose "Manage Extension Shortcuts".

## Safari {#safari}

Safari's extension system is very different from Chromium's, and there's no Safari version of Lumno yet. For a similar system-wide search on a Mac, try [Raycast](https://www.raycast.com/) or [Alfred](https://www.alfredapp.com/).

## Interface languages {#languages}

The extension is available in English, Japanese, and Simplified and Traditional Chinese. It uses your browser's language by default, and you can change it in settings.
