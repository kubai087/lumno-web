Lumno is a browser extension, not a browser of its own, so some things are outside what it can do. These are the limitations we know of. If you need one of these features, one of the other tools mentioned here may be a better fit.

## Pages where the command bar can't open {#restricted-pages}

For security, browsers don't let any extension run scripts or show its own interface on these pages, and Lumno can't work around it:

- Browser pages that start with `chrome://` or `edge://`, such as Settings and Extensions
- The Chrome Web Store and the Edge Add-ons site
- In Firefox, pages that start with `about:` and the Firefox Add-ons site

If you press the shortcut on one of these pages, the command bar can't appear on top of it, so Lumno opens a new tab with the cursor in the search box instead, and you can keep searching there. This isn't a bug: on regular web pages, the command bar still opens right on the page.

To open your browser's own new tab instead, go to General → Shortcut Settings → Restricted page behavior in Lumno's settings and choose "Follow browser setting". If another extension provides your new tab, Lumno chooses this for you.

Only opening the command bar on these pages is blocked. Opening a browser page such as `chrome://inspect/#devices` from a shortcut or the command bar works as usual.

Local files (PDF or HTML files starting with `file://`) are supported once you turn on "Allow access to file URLs" on Lumno's extension details page.

## Content outside the browser {#outside-browser}

Lumno searches only what's in your browser. To search apps, files and system settings with one shortcut, try [Raycast](https://www.raycast.com/) or [Alfred](https://www.alfredapp.com/) on macOS.

## Browser support {#browsers}

- Safari isn't supported, and neither are browsers on mobile devices.
- In Dia, the command bar works, but Lumno's new tab isn't available.
- Some features aren't available in the Firefox version. See [Browser compatibility](../browser-compatibility/).

## New tab widgets {#widgets}

Lumno's new tab is designed to stay simple, so it doesn't include widgets such as weather, to-dos or notes. If you want a new tab with lots of widgets, try [Momentum](https://momentumdash.com/) or [Tabliss](https://tabliss.io/).

Browsers allow only one extension to control the new tab at a time. You can keep using another extension's new tab and still use Lumno's command bar. See [Use another new tab extension](../newtab-other-extensions/).

## Cloud sync {#data}

Lumno has no servers, so there's no cloud account. Your settings sync through your browser's built-in sync. To sync icons and wallpapers too, you need your own WebDAV server, such as Nextcloud or a NAS. See [Sync](../sync/).

History, bookmarks and open tabs aren't part of Lumno's sync. Your browser continues to sync them as usual.
