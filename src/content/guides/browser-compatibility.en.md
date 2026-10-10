Lumno is built for Chromium browsers, with a Firefox version too. Here's what works where.

## At a glance {#support}

| Browser | Command bar | New tab | Where to get it |
| --- | --- | --- | --- |
| Google Chrome | Yes | Yes | Chrome Web Store |
| Microsoft Edge | Yes | Yes | Edge Add-ons |
| Brave, Arc, Vivaldi, Opera | Yes | Yes | Chrome Web Store |
| Dia | Yes | Not yet | Chrome Web Store |
| Firefox, Zen and others | Partly | Yes | See below |
| Safari | No | No | — |

Browsers on phones and tablets aren't supported yet.

## Dia {#dia}

Dia doesn't let extensions take over the new tab, so Lumno's new tab isn't available there. The command bar works normally.

If the shortcut does nothing, open the extension shortcuts page and change the scope next to Lumno from "In Dia" to "Global".

## Firefox {#firefox}

The Firefox version isn't on Firefox Add-ons yet; once it's listed, this site will link to it. It's for Firefox 140 and later, and Firefox-based browsers like Zen, LibreWolf and Floorp.

Firefox's extension APIs differ from Chromium's, so a few things don't work:

| Feature | In Firefox |
| --- | --- |
| Auto picture-in-picture | Not available; Firefox doesn't let extensions put web video into picture-in-picture |
| Web clip | Not available; Firefox doesn't support document picture-in-picture |
| Command bar on `about:` pages and the add-ons site | Not available |
| Opening `about:` pages from shortcuts or the command bar | Not available |
| Command bar on local `file://` pages | Not available |
| Site icons | Sites you've never visited may show a placeholder icon at first |

Firefox already uses `⌘ ⇧ K`, so the Firefox version defaults to `⌃ ⇧ K` on macOS and `Alt + K` on Windows and Linux. `Alt + Q` is the same.

## Safari {#safari}

Safari's extension system is very different from Chromium's, and there's no Safari version of Lumno yet. For a similar system-wide search on the Mac, try [Raycast](https://www.raycast.com/) or [Alfred](https://www.alfredapp.com/).

## Interface languages {#languages}

The extension comes in English, Japanese, and Simplified and Traditional Chinese. It follows your browser's language by default, and you can change it in settings.
