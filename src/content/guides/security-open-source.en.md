All of Lumno's code is public, so anyone can check what the extension does and doesn't do.

## Open source {#open-source}

- Code: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- License: GPL-3.0
- Report a problem: open an issue on GitHub

Each store release is built from the same code. You can see what changed in the [release notes](/en/release/) and on GitHub Releases.

## Security by design {#design}

- Manifest V3: browsers don't allow Manifest V3 extensions to download and run remote code, so all of Lumno's code is in the reviewed package.
- No servers: there's no account system and nowhere that stores your data.
- Minimal permissions: Lumno requests only the permissions it needs, and no optional ones.
- Your WebDAV app password is stored only on your device and is never synced through your browser.

## What each permission is used for {#permissions}

| Permission | Used for |
| --- | --- |
| `tabs`, `tabGroups` | Searching, switching and restoring tabs; capturing switcher previews |
| `history` | Searching your history on your device |
| `bookmarks` | Searching, showing and managing bookmarks |
| `topSites` | Showing your top sites on the new tab |
| `storage`, `unlimitedStorage` | Saving settings, icons and wallpapers |
| `alarms` | Checking WebDAV sync status on a schedule |
| `search` | Sending searches to your default search engine |
| `favicon` | Showing site icons |
| `scripting` and access to all sites | Showing the command bar on pages, responding to shortcuts, and providing selection actions and picture-in-picture |

Access to all sites is used only to show the command bar and similar features on pages. Lumno doesn't read or upload page content in bulk.
