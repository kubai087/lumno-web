If you use more than one computer or browser, your shortcuts, wallpapers and settings can come with you. Lumno has no servers of its own, so it syncs through two things you already have: your browser's sync, and your own WebDAV server.

## Browser sync: no setup needed {#browser-sync}

If you're signed in to your browser with sync turned on, Lumno's settings sync automatically. This includes your theme, search engines, shortcuts, pinned site cards, blocklist, wallpaper choice and image links.

Uploaded icons, local wallpapers and imported quote collections are too large for browser sync. To sync them as well, use WebDAV.

Browsers give each extension a limited amount of sync space. You can add up to 200 shortcuts; any that don't fit in browser sync are kept on that computer only, and sync through WebDAV once it's on. The browser sync card under Account & sync in Lumno's settings shows how many of your shortcuts sync with the browser.

## WebDAV sync: icons and wallpapers too {#webdav}

WebDAV sync is in beta and is off by default. When it's on, your full settings, uploaded shortcut icons, custom wallpapers and imported quotes are stored on a server you choose.

1. Open Lumno's settings and go to Account & sync → WebDAV.
2. Click "Add WebDAV" and enter the server address, sync folder, username and app password.
3. Optionally, click "Test connectivity". Then click "Save and turn on sync".

Your app password is stored only on that computer and never syncs through your browser. The server address, sync folder and username do sync to your other devices, so you can finish setting up there.

## Choose a server {#hosts}

Lumno has been tested with self-hosted Nextcloud and with Apache, nginx, rclone and WsgiDAV WebDAV servers, as well as with Nutstore (坚果云). Hosted services and NAS devices such as Synology should work if they support standard WebDAV, but they haven't been tested yet.

If your service offers app passwords, create one for Lumno instead of using your main account password.

If a server gets too many requests in a short time, services such as Nutstore refuse them for a while (HTTP 429 or 503). Lumno then pauses background sync and retries on its own after the wait the server asks for, or after a growing wait from 5 minutes up to an hour. Data on your computer is kept. Lumno's settings explain why and when it will try again, and the toolbar popup shows WebDAV waiting to retry.

## Set up another computer {#second-device}

If both computers are signed in to the same browser account, open Account & sync → WebDAV in Lumno's settings on the other computer. You'll see a connection marked "From another device" with the server address, folder and username already filled in; just enter the app password again. If you don't want to use it on that computer, click Dismiss. If the computers don't share a browser account, add a connection with the same server, folder and account.

If the server already has data, Lumno asks which version to use; in most cases, choose "Use server version". Before replacing anything, Lumno makes a full backup of that computer's settings.

After that, changes from both computers merge automatically. If both computers change the same thing before they sync, such as your shortcuts or a single setting, the card shows a conflict instead of letting one side overwrite the other. Click "Show differences" to see what changed on each side, then choose which version to keep.

## What doesn't sync {#not-synced}

- History, bookmarks and open tabs: your browser continues to sync these as usual.
- Your WebDAV app password: each device stores its own.

If you turn off WebDAV or remove the connection, the files stay on your server; you can delete them there if you want. WebDAV sync isn't end-to-end encrypted, so the server's administrator can read the files.

## Export and import {#export}

If you prefer not to sync, you can export your configuration to a file in Lumno's settings and import it on another computer. The file contains your settings but not your images.
