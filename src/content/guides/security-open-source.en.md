All of Lumno's code is public, so anyone can check what the extension does and doesn't do.

## Open source {#open-source}

- Code: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- License: GPL-3.0
- Report a problem: open an issue on GitHub

Each store release is built from the same code. You can see what changed in the [release notes](/en/release/) and on GitHub Releases.

## Security by design {#design}

- Manifest V3: browsers don't allow Manifest V3 extensions to download and run remote code, so all of Lumno's code is in the reviewed package.
- No servers: there's no account system and nowhere that stores your data.
- Your WebDAV app password is stored only on your device and is never synced through your browser.

## Permissions {#permissions}

Lumno requests only the permissions it needs, and no optional ones. Access to all sites is used only to show the command bar and similar features on pages. Lumno doesn't read or upload page content in bulk.

The [Privacy Policy](/en/privacy/#permissions) explains what each permission is used for.
