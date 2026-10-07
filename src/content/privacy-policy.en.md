## 1. Scope and Controller

This policy applies to the Lumno browser extension and the Lumno website. It describes the current implementation of Lumno **version 0.9.57 and later**. Since version 0.9.40, Lumno has offered no Lumno account, cloud sync, or product usage metrics, and it runs no servers that store user data.

- **Data controller:** Lumno; the developer is identified as “Kubai087” outside Chinese-language contexts and as “枯白啃设计” in Chinese.
- **Privacy and security contact:** [i@kubai.design](mailto:i@kubai.design).
- **Effective and last updated:** October 8, 2026.

This policy explains Lumno's actual data practices and does not limit rights granted by applicable law. Just-in-time notices and controls inside the product supplement this policy; they do not silently expand the processing described here.

## 2. The Short Version

- **Your browser data stays on your device.** Tabs, browsing history, bookmarks, top sites, and website content are read and processed only in your browser and are never sent to Lumno.
- **No account, no usage metrics.** Lumno has no account system or data servers of its own, and the extension does not report usage counts, behavior, or device information.
- **Sync goes where you choose.** Settings are saved through your browser's built-in sync by default. You can also connect your own WebDAV server to sync full settings, shortcut icons, and custom wallpapers, or export a settings file and keep it yourself.
- **Actions you direct may contact other services.** Search suggestions, web search, AI or site search, selected-text actions, site icons, online wallpapers, and the daily quote send the data needed for that action directly to the third party you selected or requested.
- **Lumno does not sell user data.** Lumno does not use browsing activity for personalized or cross-context behavioral advertising, credit assessment, or lending.

## 3. On-Device Data, Storage, and Browser Permissions

### Data processed on your device

To provide features shown in the interface, Lumno may read or store on your device:

- URLs, titles, groups, and icons of open tabs, to search, rank, switch, restore, and manage tabs;
- URLs, titles, and visit times from browsing history, for local search, ranking, and deleting entries you choose;
- Bookmark folder structure, names, and URLs, for search, display, and bookmark management you start;
- URLs and titles of top sites, for display on the new tab page;
- Content on the current page related to shortcuts, the command overlay, text you select, and the optional picture-in-picture feature;
- Search input and the local results you chose, with their URLs and titles, to improve ranking on your device;
- Settings such as theme, language, layout, shortcuts, search providers, block rules, and feature toggles, plus custom wallpapers, shortcut icons, thumbnails, and lightweight caches.

Lumno does not send the browsing history, bookmark tree, tab list, website content, or local ranking records above to Lumno or its developer. The network actions listed in Section 4 send only the data each action needs to the corresponding service.

### Where local data is stored

Lumno uses `chrome.storage.local`, `chrome.storage.sync`, session extension storage where available, and IndexedDB scoped to the extension's origin. Custom wallpapers, shortcut icons, and the local settings and restore backups used by WebDAV sync live in IndexedDB; WebDAV app passwords are stored there too and never enter browser sync. `chrome.storage.sync` is provided by the browser vendor; Section 4 explains how it syncs.

### Why each permission is needed

| Permission | Purpose |
| --- | --- |
| `tabs`, `tabGroups` | Query, switch, create, update, group, and restore tabs. |
| `history` | Search and rank history locally, and delete entries when you ask. |
| `bookmarks`, `topSites` | Search and manage bookmarks, and show top sites. |
| `storage`, `unlimitedStorage` | Store settings, caches, custom images, and the local settings and restore backups used by WebDAV sync, without the browser sync quota as a ceiling. |
| `alarms` | Check the settings on your WebDAV server periodically and resume sync after the background worker stops. |
| `search` | Hand a submitted query to the browser's default search. |
| `favicon` | Show site icons through the browser. |
| `scripting`, `<all_urls>` | Provide the command overlay, shortcuts, selected-text actions, and optional picture-in-picture on web pages; fetch site icons; import wallpapers from image links you paste; and reach the HTTPS WebDAV address you configure. Broad site access does not mean Lumno collects or uploads website content in bulk. |

## 4. Data That Leaves Your Device

### Search, AI, and icon requests you initiate

- **Online search suggestions:** What you type is sent directly to the current search engine's suggestion endpoint, such as Google, Bing, Baidu, Sogou, 360, DuckDuckGo, Yandex, Quark, Shenma, or Yahoo.
- **Web search and site search:** Queries you submit go to the browser's default search engine, the engine you chose, or the site search service.
- **AI search and selected-text actions:** Only after you choose such an action are your query, the text you selected, and the prompt Lumno adds for that action filled into or sent to the AI or search service you chose, such as ChatGPT, Gemini, DeepSeek, or another service you configured. That service handles the content under its own privacy policy.
- **Site icons:** When fetching a third-party icon, the Google / gstatic icon service receives the target page URL; if you choose Favicon.is, it receives only the target domain. These requests carry no cookies or referring-page Referer, and the images are stored on your device.

### Online wallpapers and the daily quote

- **Daily quote:** Off by default. When on, Lumno fetches public quotes in your chosen category from Hitokoto (`v1.hitokoto.cn`) and caches them on your device for the day.
- **Bing wallpapers:** When you choose the Bing source or a daily wallpaper, Lumno fetches wallpaper details and images from `www.bing.com`; the request contains only the language market and image identifiers.
- **Curated and art wallpapers:** For the curated source, Lumno fetches images from `picsum.photos` (Lorem Picsum, with images from Unsplash); the art category fetches images from the Cleveland Museum of Art open access library (`openaccess-cdn.clevelandart.org`). Requests contain only image numbers and sizes.
- **Image links:** If you paste an image link as a wallpaper, the link syncs with your settings and each device requests the image once, then uses a compressed local copy.

These requests carry no cookies, referring-page Referer, browsing history, bookmarks, or search terms; the receiving service sees the IP address of an ordinary network request.

All of the search, AI, icon, and wallpaper requests above go straight from the extension to the third party, never through Lumno. You can reduce them by not using a feature, switching providers, or using the request block list in the extension.

### Settings sync

Lumno offers no cloud sync. Settings move between devices only in the ways you choose:

- **Browser built-in sync:** Settings such as theme, search providers, shortcuts, block rules, and new tab layout are stored in `chrome.storage.sync` and synced across devices by your browser vendor according to your browser account and sync settings, under the vendor's privacy policy. Custom wallpapers and uploaded icons do not enter browser sync.
- **WebDAV sync (optional):** Off by default; it starts only after you add a server yourself, and you can connect several servers. Once on, your full settings (including shortcut titles and URLs, search templates, and block rules you entered), uploaded shortcut icons, custom wallpapers, and settings snapshots taken before overwrites are saved over HTTPS to the server and folder you specify. The server address, folder, and username sync to your other devices through browser built-in sync so they are easy to reconnect; the app password stays on the current device. Browsing history, the bookmark database, current tabs, and the site icon cache are never uploaded.
- **Export and import:** You can export your settings as a JSON file to keep yourself or import on another device. Exported files do not include images.

WebDAV data goes only to the server you chose, never through Lumno. WebDAV is not end-to-end encrypted, so that server's administrator can read the settings and images; storage, backup, and deletion of the files are governed by that service and its policies.

### Website analytics

Public pages on the Lumno website load the VibeLoft analytics script and may enable Google Analytics when deployed. These services may process page URLs and titles, visit times, referring pages, click events, browser language, device and browser type, approximate location, IP addresses and request logs, and cookies or other pseudonymous identifiers. Lumno uses this data to understand traffic, performance, and entry points for public pages and does not link it with any data in the extension; the extension itself does not load these scripts.

You can block website analytics with your browser's cookie, script, or tracking protection features; this does not affect any feature of the extension.

## 5. Purposes, Legal Bases, and Recipients

Lumno processes data only as needed to: provide the browser features you use on your device; carry out the search, AI, icon, and wallpaper requests you start; sync settings the way you choose; understand website traffic; and meet legal obligations. Depending on where you live, the legal bases may include necessity for the service you requested, consent you can withdraw at any time, legitimate interests in understanding website traffic, and legal obligations.

| Recipient | Data it may process | Purpose |
| --- | --- | --- |
| Browser vendor | Settings in `chrome.storage.sync`, the WebDAV server address, folder, and username, and browser account metadata | Provide the browser's built-in extension settings sync. |
| The WebDAV service you configure (such as Nutstore, a NAS, or your own server) | Full settings, shortcut icons, custom wallpapers, settings snapshots, and the username and app password used to authenticate | Sync settings and images across your devices and browsers as you set up. |
| Search, AI, website, or favicon services you choose | Queries, selected text, prompts, requested URLs or domains, and network metadata | Complete the search, AI, page visit, or icon request you started. |
| Hitokoto, Bing, Lorem Picsum, Cleveland Museum of Art | Chosen category, language market, image numbers and sizes, and IP address | Provide the daily quote and online wallpapers you turned on. |
| [VibeLoft](https://vibeloft.ai/privacy), Google Analytics (if enabled) | Website visit and technical information | Traffic, referral, and performance analysis for public pages. |

These providers may process data outside your country or region. Lumno does not sell or provide user data to data brokers or advertising platforms, and does not collect or transfer browsing activity for purposes unrelated to the extension's single purpose.

## 6. Retention and the Effect of Deletion

| Data | Retention period or criteria |
| --- | --- |
| Local settings, images, caches, and ranking records | Kept until you delete them in the extension, clear extension data in your browser, or uninstall Lumno. |
| Settings in browser sync | Kept and deleted by your browser vendor according to your browser account and sync settings. |
| Settings, images, and pre-overwrite snapshots on your WebDAV server | Stored on your server. Pausing sync, removing a connection, or uninstalling Lumno does not delete server files; old snapshots and unused images must be cleaned up on the server. |
| Exported settings files | Kept and deleted by you. |
| Third-party service and website analytics data | Kept by each service under its own policy. |

Lumno has no accounts or cloud database and keeps none of your personal data on any system it controls. Uninstalling the extension clears local data; copies in browser sync and files on your WebDAV server must be deleted in your browser settings and on the server.

## 7. Your Choices and Rights

You can:

- Use every feature without signing up or signing in;
- Choose whether to turn on WebDAV sync, and pause or remove connections at any time;
- Turn off extension sync in your browser and keep settings on this device only;
- Clear local data or browser sync data in your browser settings, or uninstall the extension;
- Skip online suggestions, AI, selected-text actions, the daily quote, or online wallpapers, or switch the provider.

Because Lumno does not keep your personal information, there is usually no Lumno-side data to access, export, or delete. If you have questions about website analytics or this policy, or want to exercise rights to access, correct, delete, restrict, or object to processing within the scope of applicable law, email [i@kubai.design](mailto:i@kubai.design); Lumno will respond within the time required by applicable law. You may also complain to a competent privacy regulator, and exercising your privacy rights will not lead to discriminatory treatment.

Lumno does not use personal information for automated decisions that produce legal or similarly significant effects, and does not profile you for such decisions.

## 8. Security Measures and Limits

The extension processes data inside your browser and does not hand browsing data to Lumno. WebDAV accepts only HTTPS addresses, keeps certificate validation, and refuses authentication redirects; app passwords are stored in IndexedDB scoped to the extension's origin, never enter browser sync, and are not exposed to ordinary web pages or content scripts. We recommend generating a separate app password for Lumno rather than using the service's sign-in password.

These measures reduce the risk of unauthorized access, tampering, or leaks, but no network transfer, device, or storage system can be guaranteed to be completely secure. Please protect your browser account, devices, and WebDAV account; to report a security issue, contact [i@kubai.design](mailto:i@kubai.design).

When you hand queries, selected text, or settings to a search, AI, WebDAV, or other third-party service, its processing is governed by that party's privacy policy and security measures. Third-party availability and policies may change; this notice does not exclude any statutory rights that cannot be waived.

## 9. International Processing and Children

Lumno runs no servers that store user data, so it does not transfer your data to any system it controls. Browser vendors, the WebDAV, search, AI, and image services you choose, and VibeLoft and Google Analytics may process data in other countries or regions under their own policies and transfer mechanisms.

Lumno is intended for a general audience, is not designed for children, and does not knowingly collect children's personal information. If you have concerns about this, please contact us so we can look into it.

## 10. Transfer Restrictions, Chrome Limited Use, and Policy Changes

Lumno does not sell or rent user data, or use it for personalized or cross-context behavioral advertising, credit assessment, lending, or other purposes unrelated to the extension's core functions. The extension sends only the data needed to complete an action you started, directly to the services listed in Section 4.

Lumno's use of information received from browser APIs and Google APIs adheres to the [Chrome Web Store User Data Policy](https://developer.chrome.com/docs/webstore/program-policies/policies), including the **Limited Use** requirements. This data is never sent to the developer, and the developer cannot access your browsing data or settings.

If Lumno adds data categories, purposes, or recipients, for example by bringing back accounts or cloud features, it will first update this policy and the store disclosures, explain the change prominently in the product as Chrome Web Store rules require, and ask for consent again where applicable law requires. Editorial cleanups, link updates, or clarifications that do not reduce your rights may only update the page date. Please review this page after upgrading; material changes do not retroactively authorize processing that was not previously disclosed.
