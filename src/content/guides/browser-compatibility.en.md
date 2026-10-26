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

To open the command bar with `⌘ T`, free it in Dia first, because Dia's own shortcuts take priority:

1. In Dia, open Settings → Shortcuts and change the "New Tab" shortcut from `⌘ T` to another key.
2. Open `dia://extensions/shortcuts` and set Lumno's "Open command bar" to `⌘ T`.

![Dia's Settings, Shortcuts page, with New Tab moved off ⌘T](dia-newtab "Step 1: give New Tab another key in Dia's Settings → Shortcuts")

![Dia's extension shortcuts page with Lumno's Open command bar set to ⌘T](dia-shortcuts "Step 2: set Open command bar to ⌘T at dia://extensions/shortcuts")

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

## Graphics acceleration {#graphics-acceleration}

With graphics acceleration off, the browser draws pages on the processor, so scrolling and animations can stutter, and Lumno's wallpaper effects and glass materials slow down. When Lumno sees that the browser isn't drawing with the graphics card, it says "Graphics acceleration is off" below the search box on the new tab page and above the command bar.

![A notice below the new tab's search box reads Graphics acceleration is off, Turn it on for smoother pages; it takes a browser restart, with a Turn on button on the right](graphics-notice "The graphics acceleration notice")

1. Click Turn on in the notice. Lumno opens the browser's System settings (`chrome://settings/system`, or the same page in Edge and Brave).
2. Turn on "Use graphics acceleration when available".
3. Click Relaunch. The change takes effect once the browser restarts.

If you'd rather leave it off, click the close button on the right of the notice, and it won't show again on this computer. If the notice comes back after you turn it on and restart, a graphics driver, virtual machine or remote desktop may be keeping the browser off the graphics card; open `chrome://gpu` for details. The Firefox version doesn't show this notice.

## Interface languages {#languages}

Since version 1.2.0, the extension is available in 10 languages: English, Simplified Chinese, Traditional Chinese, Japanese, Korean, German, Spanish, French, Portuguese (Brazil), and Russian. It uses your browser's language by default, and you can change it in settings.
