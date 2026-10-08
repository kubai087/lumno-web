## 1. Scope and Who We Are

This Privacy Policy ("this Policy") explains how the Lumno browser extension ("the extension") and the public pages of the Lumno website (`lumno.kubai.design`, "the website") handle information about you. It is written against the actual implementation of extension version **0.9.58** and applies to that version and later versions until this Policy is updated.

- **Developer and controller:** Lumno is developed and maintained by an independent developer, Kubai087 (枯白啃设计), who is the controller of the processing described in this Policy.
- **Contact:** [i@kubai.design](mailto:i@kubai.design). See Section 15.
- **Effective date:** October 8, 2026.

Lumno offers no accounts or cloud storage and runs no servers that store user data. Account sign-in, cloud sync, and product usage analytics were removed from the extension in version 0.9.40.

In this Policy, "personal information" means any information recorded electronically that relates to an identified or identifiable natural person. Nothing in this Policy limits rights you have under applicable law.

## 2. How We Process Information

Lumno's core features run inside your browser. To provide the features you see and use in its interface, the extension reads or stores the following information on your device. **Except as described in Section 4, this information never leaves your device and is never sent to Lumno or its developer.**

### 2.1 Browser data

- **Tabs:** URLs, titles, groups, and icons, to search, switch, sort, restore, and manage tabs. When you use the tab switcher, the extension captures the current tab as a thumbnail; it keeps at most 12, each for no longer than 2 hours, on your device only.
- **History:** URLs, titles, and visit times, to search and rank history locally and to delete entries when you ask.
- **Bookmarks:** folder structure, names, and URLs, to search, display, and manage bookmarks at your request.
- **Top sites:** URLs and titles, to show on the new tab page. Site cards you pin or hide are saved as settings.

### 2.2 Page content

- **Shortcuts and the command bar:** listens for Lumno's keyboard shortcuts on web pages and shows the command bar overlay.
- **Selection actions:** off by default. When turned on, the extension reads the text you select (up to 2,400 characters) and uses it only when you choose an action.
- **Auto picture-in-picture:** finds the video element on supported video sites to open picture-in-picture.
- **Progress tracking (Labs):** works only for site cards you mark for tracking. It reads the page's previous/next links, structured data, and media information to update that card's URL and title.

### 2.3 Search and settings

- **Search history:** what you type and the URLs and titles of results you pick, to improve ranking on your device.
- **Settings and media:** theme, language, layout, shortcuts, search providers, blocklists, feature toggles, plus shortcut icons you upload, custom wallpapers, and the caches these features need.

### 2.4 What we do not collect

Lumno requires no sign-up or sign-in. It does not collect your name, email address, phone number, or postal address; does not report usage counts, clicks, device identifiers, or crash data; and never sends your history, bookmarks, tab list, or page content to the developer.

## 3. Why the Extension Needs Each Permission

The extension requests only the permissions these features need, and no optional permissions:

| Permission | Purpose |
| --- | --- |
| `tabs`, `tabGroups` | Query, switch, create, update, group, and restore tabs, and capture tab switcher thumbnails. |
| `history` | Search and rank history locally, and delete entries at your request. |
| `bookmarks` | Search, display, and manage bookmarks. |
| `topSites` | Show your most visited sites on the new tab page. |
| `storage`, `unlimitedStorage` | Store settings, caches, custom images, and the local configuration WebDAV sync needs, beyond the browser's default storage quota. |
| `alarms` | Check WebDAV sync status periodically in the background. |
| `search` | Hand the queries you submit to your browser's default search engine. |
| `favicon` | Show website icons through the browser. |
| `scripting` and `<all_urls>` site access | Provide the command bar, shortcuts, selection actions, picture-in-picture, and progress tracking on web pages; fill your query into the AI or search service you choose; fetch website icons and wallpaper images; and reach the WebDAV address you configure. |

Broad site access is used only for the features above. It does not mean Lumno reads, collects, or uploads page content in bulk.

## 4. Data That Leaves Your Device

The requests below are sent by the extension directly to the third-party service involved and **never pass through a Lumno server**. The recipient also sees the IP address and browser information that any network request carries, and handles it under its own privacy policy.

### 4.1 Online search suggestions

As you type in Lumno's search box (on the new tab page or in the command bar), your input is sent in real time to the suggestion endpoint of your current search engine to show suggestions. Supported services are Google, Bing, Baidu, Sogou (served by Tencent at `sor.html5.qq.com`), DuckDuckGo, Yandex, Quark and Shenma (`sugs.m.sm.cn`), and Yahoo. You can change who receives these requests by switching search engines in settings.

### 4.2 Web search, site search, and AI

- **Web and site search:** queries you submit go to your browser's default search engine, or open the search service or website you choose in a new tab.
- **AI search and selection actions:** only after you choose an action does the extension open the AI service you picked (such as ChatGPT, Gemini, DeepSeek, Doubao, or Kimi) and fill in your query or selected text, along with the prompt Lumno writes for that action.

These are the same as visiting those sites yourself: the site receives what you submit and may associate it with your signed-in session there.

### 4.3 Website icons

To fetch a site's icon, Google's favicon service (`www.google.com` / `gstatic`) receives the page URL; if you choose Favicon.is, only the domain is sent. These requests carry no cookies or referrer, and icons are cached on your device. Custom icon addresses you set for shortcuts are loaded by the browser directly from that address.

### 4.4 Online wallpapers and daily quotes

- **Daily quotes:** off by default. When on, the extension fetches quotes in your chosen category from Hitokoto (`v1.hitokoto.cn`) and caches them for the day.
- **Bing wallpapers:** fetched from `www.bing.com`; the request includes only the market and image identifier.
- **Curated and art wallpapers:** photos come from Lorem Picsum (`picsum.photos`, sourced from Unsplash) and artworks from the Cleveland Museum of Art Open Access collection (`openaccess-cdn.clevelandart.org`); requests include only the image ID and size.
- **Image link wallpapers:** links you paste sync with your settings; each device requests the image once from that address, then compresses and caches it locally.

Wallpaper and quote downloads carry no cookies or referrer. Preview thumbnails in the wallpaper picker load like ordinary web images.

### 4.5 Release notes and website resources

- **Update notices:** after an update, the extension requests that version's release title from GitHub (`api.github.com`, or `github.com` as a fallback) to show an update notice. You can turn off "Update notice" in settings.
- **Changelog page:** after an update, the extension may open the website's changelog. Its URL includes the entry source, the update reason, and the extension version, and Section 6 applies to that page.
- **Feedback links:** when you open a feedback or community link, the extension fetches the community link configuration (`community-links.json`) and the community QR code image from the website.

The website is hosted on GitHub Pages, and GitHub, as the host, may log requests including IP addresses.

## 5. Settings Sync

Lumno does not provide cloud sync. Your settings move between devices only in the ways you choose:

- **Built-in browser sync:** theme, search providers, shortcuts (titles and URLs), pinned or hidden site cards (URLs and titles), blocklist rules, wallpaper choices and image links, daily quote preferences, and your WebDAV server address, folder, and username are stored in `chrome.storage.sync` and synced across devices by your browser vendor under your browser account and sync settings. Uploaded icons, custom wallpapers, and WebDAV app passwords are never part of browser sync.
- **WebDAV sync (optional):** off by default, and on only after you add a server yourself. Once on, your full configuration, uploaded shortcut icons, custom wallpapers, and configuration snapshots taken before overwrites are stored over HTTPS on the server and folder you specify. History, bookmarks, open tabs, and icon caches are never uploaded. WebDAV offers no end-to-end encryption, so that server's administrators can read these files.
- **Export and import:** you can export your settings as a JSON file to keep or import on another device. Exports do not include images.

## 6. Website Analytics and Cookies

The website's public pages load the VibeLoft analytics script and may enable Google Analytics (with IP anonymization) at deploy time. These services may process page URLs (including query parameters) and titles, visit times, referring pages, click events, browser language, device and browser type, approximate location, IP addresses, and cookies or similar pseudonymous identifiers.

We use this data only to understand traffic, sources, and performance of the website, and never link it with any data in the extension. The extension itself does not load these scripts. You can block website analytics with your browser's cookie, script-blocking, or tracking-protection features without affecting any extension feature.

## 7. Sharing, Transfer, and Disclosure

Lumno does not sell, rent, or trade your personal information, does not use it for personalized or cross-context behavioral advertising, and does not provide it to data brokers or ad platforms. Beyond completing actions you start, we do not share, transfer, or publicly disclose your personal information.

Third parties that may receive data:

| Recipient | Data it may receive | Purpose |
| --- | --- | --- |
| Browser vendors (such as Google and Microsoft) | Settings in `chrome.storage.sync` and browser account metadata | Built-in sync of extension settings. |
| Your WebDAV service (such as Jianguoyun, a NAS, or a self-hosted server) | Full configuration, icons, wallpapers, snapshots, and the username and app password used to sign in | Syncing settings and images as you configure. |
| Search suggestion services (Section 4.1) | What you type and request metadata | Showing search suggestions. |
| Search, AI, and website services you choose | Queries, selected text, and prompts you submit | Completing searches and AI actions you start. |
| Google favicon service, Favicon.is | Page URL or domain | Showing website icons. |
| Hitokoto, Bing, Lorem Picsum, Cleveland Museum of Art | Category, market, image ID, and size | Daily quotes and online wallpapers you turn on. |
| GitHub | Extension version, and access logs for website and release requests | Update notices and website hosting. |
| [VibeLoft](https://vibeloft.ai/privacy), Google Analytics (if enabled) | Website visit and technical information | Website traffic, source, and performance analysis. |

If Lumno is merged, transferred, or handed over to a new maintainer, we will require the recipient to remain bound by this Policy, or ask for your consent again before the way your information is handled changes. We may disclose information where required by law or by a lawful request from a competent authority; because we hold no personal information about you, this would generally involve only website analytics data.

## 8. Storage and Retention

The extension stores data in the browser's `chrome.storage.local`, `chrome.storage.sync`, and session storage, and in IndexedDB scoped to the extension: uploaded shortcut icons live in `chrome.storage.local`; custom wallpapers, WebDAV configuration, app passwords, and recovery backups live in IndexedDB.

| Data | Retention |
| --- | --- |
| Local settings, images, caches, and search ranking data | Until you delete them in the extension, clear the extension's data in your browser, or uninstall Lumno. |
| Tab switcher thumbnails | Up to 2 hours each. |
| Settings in browser sync | Kept and deleted by your browser vendor under your browser account and sync settings. |
| Files on your WebDAV server | Kept on your server until you delete them. Pausing sync, removing a connection, or uninstalling Lumno does not delete them. |
| Exported settings files | Kept and deleted by you. |
| Third-party and website analytics data | Kept by each service under its own policy. |

Lumno keeps no personal information about you in any system it controls.

## 9. Your Rights and Choices

You can:

- Use every Lumno feature without signing up or signing in.
- Change search engines, AI services, and icon sources in settings, or turn off selection actions, daily quotes, online wallpapers, update notices, and similar features.
- Choose whether to turn on WebDAV sync, and pause or remove a connection at any time.
- Turn off extension sync in your browser to keep settings on one device.
- Delete data in the extension, clear the extension's data in your browser, or uninstall the extension to remove all local data.

Because Lumno holds no personal information about you, there is usually no Lumno-side data to access, copy, or delete. To exercise rights you may have under applicable law, such as access, portability, correction, deletion, withdrawal of consent, restriction, or objection, or if you have questions about website analytics, contact us as described in Section 15. We will respond within 15 business days of verifying your request, or within any period required by applicable law. You may also lodge a complaint with your local data protection authority. Exercising these rights will never lead to discriminatory treatment.

Lumno does not profile you or make automated decisions that produce legal or similarly significant effects on you.

## 10. Security

We protect your data with the following measures:

- Browsing data is processed only in your browser and is never sent to the developer.
- WebDAV accepts HTTPS addresses only, keeps certificate validation, and refuses authentication redirects.
- WebDAV app passwords stay in the extension's own storage on the current device. They never enter browser sync and are never exposed to web pages or content scripts.
- Website icon and wallpaper downloads carry no cookies or referrer.

We recommend generating a separate WebDAV app password for Lumno and keeping your device, browser account, and WebDAV account secure. No method of transmission or storage is completely secure. If you find a security issue, please tell us at [i@kubai.design](mailto:i@kubai.design).

## 11. Children

Lumno is intended for a general audience, is not designed for children, and does not knowingly collect personal information from children. Children under 14 should use Lumno only with the consent and guidance of a parent or guardian. If you believe we have processed a child's information by mistake, please contact us so we can look into it.

## 12. International Processing

Lumno runs no servers that store user data, so your data is never transferred to systems Lumno controls. Browser vendors, the search, AI, WebDAV, and image services you choose, and GitHub, VibeLoft, and Google Analytics may process data outside your country or region under their own privacy policies and transfer mechanisms.

## 13. Chrome Web Store User Data Policy

Lumno's use of information received from browser APIs adheres to the [Chrome Web Store User Data Policy](https://developer.chrome.com/docs/webstore/program-policies/policies), including the **Limited Use** requirements:

- The data is used only to provide or improve the extension's single, user-facing purpose.
- Data is sent to the services listed in Section 4 only as needed to complete actions you start.
- The data is never sold or transferred to third parties, used for personalized advertising, or used to determine creditworthiness or for lending.
- The developer cannot access your browsing data or settings.

## 14. Changes to This Policy

If Lumno adds new categories of data, purposes, or recipients, such as bringing back accounts or cloud features, we will update this Policy and the store's data disclosures before the change takes effect and give prominent notice in the extension; where the law requires consent, we will ask for it again. For wording changes, link updates, or clarifications that do not reduce your rights, we may only update the date on this page. We will not reduce your rights under this Policy without your consent.

## 15. Contact Us

If you have any questions, comments, or requests about this Policy or your personal information, email [i@kubai.design](mailto:i@kubai.design). You can also open a public issue on [GitHub](https://github.com/kubai087/lumno-extension/issues), but please don't share personal information in public channels.
