Lumno is an extension, not a new browser, so there are things the browser won't let it do. Here they are up front, so you don't find out after installing, along with tools that do cover them.

## Sidebars, Spaces and split view {#not-a-browser}

Vertical tabs, a sidebar, Arc's Spaces and split view all need the browser itself. Extensions can't change the address bar or the tab strip.

- For vertical tabs, try [Microsoft Edge](https://www.microsoft.com/edge), which has them built in.
- For an Arc-like sidebar, workspaces and split view, try [Zen Browser](https://zen-browser.app/) or [Vivaldi](https://vivaldi.com/).

## Pages where the command bar won't open {#restricted-pages}

For security, browsers don't let extensions show anything on these pages:

- Browser pages starting with `chrome://` or `edge://`
- The Chrome Web Store and Edge Add-ons

Pressing the shortcut there follows the "Restricted page behavior" option in Lumno's settings.

Local files (PDF or HTML starting with `file://`) work once you turn on "Allow access to file URLs" on Lumno's extension details page.

## Things outside the browser {#outside-browser}

Lumno only searches what's in your browser. To search apps, files and system settings with one shortcut, try [Raycast](https://www.raycast.com/) or [Alfred](https://www.alfredapp.com/) on macOS.

## Browsers it doesn't support {#browsers}

- Safari isn't supported, and neither are mobile browsers.
- In Dia the command bar works, but Lumno's new tab doesn't.
- The Firefox version is missing a few features. See [Browser compatibility](../browser-compatibility/).

## New tab widgets {#widgets}

Lumno's new tab stays simple: no weather, to-dos or notes. For a new tab packed with widgets, try [Momentum](https://momentumdash.com/) or [Tabliss](https://tabliss.io/).

The browser lets only one extension own the new tab at a time. You can keep theirs and still use Lumno's command bar.

## Cloud sync {#data}

Lumno has no servers, so there's no cloud account. Settings follow your browser's own sync. To bring icons and wallpapers along too, you need a WebDAV server of your own, such as Nextcloud or a NAS. See [Sync](../sync/).

History, bookmarks and open tabs aren't part of Lumno's sync. Your browser keeps syncing them as usual.
