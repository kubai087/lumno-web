Answers to the questions people ask most often on our website and in the community. Each answer links to a page with more detail.

## Using Lumno {#using}

### What is the default shortcut? Can I change it?

The default shortcut is `⌘ ⇧ K | ⌘ ⇧ K` on a Mac and `Ctrl + Shift + K` on Windows and Linux. You can change it at `chrome://extensions/shortcuts`. See [Keyboard shortcuts](../keyboard-shortcuts/#change). The Firefox version uses a different default; see [Browser compatibility](../browser-compatibility/#firefox).

### What if the shortcut doesn't work?

First, make sure you're not on a restricted page, such as `chrome://` settings or an extension store. Then go to `chrome://extensions/shortcuts` and check whether another extension uses the same shortcut. In Dia, also change the scope next to the shortcut to "Global".

### Why doesn't the command bar open on some pages?

Browsers don't allow extensions to run on restricted pages, such as `chrome://` settings and extension stores. If you press the shortcut on one of these pages, Lumno follows the "Restricted page behavior" option in its settings, which by default opens search in a new tab. To use Lumno in local PDF or HTML files, turn on "Allow access to file URLs" on the extension's details page. See [What Lumno can't do](../limitations/#restricted-pages).

### Why doesn't the command bar match my system's light or dark mode?

When set to "Follow system", the command bar also adapts to the colors of the current page. To follow only your system setting, turn off "Adapt theme colors to each webpage" under Appearance in Lumno's settings.

### I'm moving from Arc. Can I keep a familiar command bar?

Yes. Lumno's design is inspired by [Arc](https://arc.net/) (it isn't affiliated with Arc), and you can open the command bar at any time in Dia, Chrome or Edge. Set the shortcut to `⌘ T` to keep your Arc habits. See [Moving from Arc](../arc-command-bar/).

## New tab {#new-tab}

### Can I use only the command bar and keep another new tab extension?

Yes. Keep Lumno turned on, then reinstall or turn your other new tab extension off and on again so that it takes over the new tab. The command bar isn't affected. For the steps, see [Use another new tab extension](../newtab-other-extensions/).

### Why does the address bar show an extension URL on a new tab?

This happens when "Automatically focus input" is on: to place your cursor directly in Lumno's search box, the address bar shows the extension URL. Turn this option off in the new tab's Appearance settings, and the address bar stays empty.

## Compatibility {#compatibility}

### Which browsers are supported?

Lumno supports Chromium browsers such as Chrome, Edge, Dia, Brave and Vivaldi, plus Firefox 140 or later and Firefox-based browsers like Zen. Safari isn't supported yet. In Dia, the command bar works, but Lumno's new tab isn't available yet. See [Browser compatibility](../browser-compatibility/).

### How is the Firefox version different from the Chrome version?

The main features are the same, with a few Firefox limits: Web clip and Auto picture-in-picture aren't available, the command bar can't open on `about:` pages, the add-ons site or local files, and the default shortcut is `⌃ ⇧ K | Alt + K`. See [Browser compatibility](../browser-compatibility/#firefox).

### Does it work in Zen, LibreWolf and other Firefox-based browsers?

Yes. They use the Firefox version: install it from [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/). The browser needs a Firefox 140 or later engine.

### Does it work in Safari or on my phone?

Not yet. Safari's extension system is very different from Chromium's, so there's no Safari version of Lumno, and browsers on phones and tablets aren't supported. If you're reading this on a phone signed in to your Google account, you can tap install now: Lumno installs itself the next time you open Chrome on a computer signed in to the same account with sync on. See [Browser compatibility](../browser-compatibility/#safari).

## Data and sync {#data}

### Can I sync my settings across devices?

Yes. Settings sync through your browser account by default. Turn on WebDAV sync (with Nextcloud, Nutstore or your own server) to also sync icons and wallpapers, even between different browsers. See [Sync](../sync/).

### Does Lumno upload my browsing data?

No. Tabs, bookmarks and history are searched on your device. What you type is sent only when you search the web or ask AI, and only to the search engine or AI site you choose. See the [Privacy Policy](/en/privacy/).

### Is Lumno free? Do I need an account?

Lumno is completely free and open source under GPL-3.0 on [GitHub](https://github.com/kubai087/lumno-extension). There's no account system, so you can start using it as soon as you install it.
