New computer, or several browsers at once? Your shortcuts, wallpapers and settings can come along. Lumno has no servers of its own, so sync relies on two things you already have: your browser's sync, and a WebDAV server of your own.

## Browser sync: nothing to do {#browser-sync}

If you're signed in to your browser with sync on, Lumno's settings follow you automatically: theme, search engines, shortcuts, pinned site cards, the blocklist, and your wallpaper choice and image links.

Uploaded icons and local wallpapers are too big for browser sync. To bring them too, use WebDAV.

## WebDAV sync: icons and wallpapers too {#webdav}

WebDAV sync is in beta and off by default. Once on, your full settings, uploaded shortcut icons and custom wallpapers are stored on the server you choose.

1. Open Lumno's settings and go to "Account & sync", then WebDAV.
2. Click "Add WebDAV" and fill in the server address, sync folder, username and app password.
3. Optionally click "Test connectivity", then "Save and turn on sync".

Add the connection on each device. The username and password stay on that computer and never travel through browser sync.

## Where to host it {#hosts}

Lumno has been tested with self-hosted Nextcloud and Apache, nginx, rclone and WsgiDAV WebDAV servers, and with Nutstore (坚果云). Hosted services and NAS units such as Synology should work if they support standard WebDAV, but haven't been verified yet.

Use an app password made for Lumno where your service offers one, rather than your main account password.

## On your second computer {#second-device}

Add the same server, folder and account. If the server already has data, Lumno asks which version to use; usually choose "Use server version". Before replacing anything, Lumno keeps a full backup of that computer's settings.

From then on, changes on both sides merge automatically. If two computers change the same thing, such as the shortcuts, the card shows a conflict. Click "Show differences" to see what each side changed, then pick one.

## What doesn't sync {#not-synced}

- History, bookmarks and open tabs: your browser keeps syncing them as usual.
- Your WebDAV username and password: each device keeps its own.

Turning off WebDAV or removing the connection leaves the files on your server; delete them there if you want. WebDAV isn't end-to-end encrypted, so the server's administrator can read the files.

## Export and import {#export}

Prefer not to sync? Export your configuration to a file in Lumno's settings and import it on the other computer. The file has your settings, not your images.
