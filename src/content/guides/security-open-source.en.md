Every line of Lumno's code is public, so anyone can see what the extension does and doesn't do.

## Open source {#open-source}

- Code: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- License: GPL-3.0
- Found a problem? Open an issue on GitHub

Each store release is built from that same code, and what changed is listed in the [release notes](/en/release/) and on GitHub Releases.

## Built to be safe {#design}

- Manifest V3: browsers don't let Manifest V3 extensions download and run remote code, so all of Lumno's code is in the reviewed package.
- No servers: no account system, and nowhere that stores your data.
- Only the permissions it needs, and no optional ones.
- Your WebDAV app password stays on your device and never goes through browser sync.

## What each permission is for {#permissions}

| Permission | Used for |
| --- | --- |
| `tabs`, `tabGroups` | Searching, switching and restoring tabs; capturing switcher previews |
| `history` | Searching your history on your device |
| `bookmarks` | Searching, showing and managing bookmarks |
| `topSites` | Showing your top sites on the new tab |
| `storage`, `unlimitedStorage` | Saving settings, icons and wallpapers |
| `alarms` | Checking WebDAV sync status on a schedule |
| `search` | Handing searches to your default search engine |
| `favicon` | Showing site icons |
| `scripting` and access to all sites | Showing the command bar on pages, responding to shortcuts, text actions and picture-in-picture |

Access to all sites is only used to show the command bar and similar features on pages. Lumno doesn't read or upload page content in bulk.
