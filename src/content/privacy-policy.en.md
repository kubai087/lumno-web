## 1. Scope and Controller

This policy applies to the Lumno browser extension, the Lumno website, and the account, settings sync, custom media sync, and optional product usage metrics provided by Lumno. It describes the current implementation of Lumno **version 0.9.30 and later**; older versions may not include every cloud feature described here.

- **Data controller:** Lumno; the developer is identified as “Kubai087” outside Chinese-language contexts and as “枯白啃设计” in Chinese.
- **Privacy and security contact:** [i@kubai.design](mailto:i@kubai.design).
- **Effective and last updated:** August 2, 2026.

This policy explains Lumno's actual data practices and does not limit rights granted by applicable law. Just-in-time notices and controls inside the product supplement this policy; they do not silently expand the processing described here.

## 2. The Short Version

- **Most browser data stays on your device.** Tabs, browsing history, bookmarks, top sites, and website content are primarily read and processed in your browser.
- **Cloud features require your choice.** After signing in, you may enable Lumno account sync. In-extension product usage metrics are off by default and are reported only after you sign in and explicitly enable them.
- **Actions you direct may contact other services.** Search suggestions, web search, AI or site search, selected-text actions, and some favicon requests send the data needed for that action directly to the third party you selected or requested.
- **Lumno does not sell user data.** Lumno does not use browsing activity for personalized or cross-context behavioral advertising, credit assessment, or lending.

## 3. On-Device Data, Storage, and Browser Permissions

### Data processed on your device

To provide features that are visibly available in the interface, Lumno may read or store locally:

- open-tab URLs, titles, groups, and icons to search, sort, switch, restore, and manage tabs;
- browsing-history URLs, titles, and visit times to search and sort locally and to delete entries you select;
- bookmark folder structure, names, and URLs to search, display, and manage bookmarks at your direction;
- top-site URLs and titles to display frequently visited sites on the new tab page;
- content from the current webpage that is relevant to keyboard shortcuts, the command bar, text you select, and optional Picture-in-Picture features;
- search input and the URLs and titles of local results you selected, to improve ranking on your device;
- theme, language, layout, shortcuts, search providers, blocklists, feature toggles, icons, thumbnails, and lightweight caches.

Except for the network actions, account sync, and optional metrics expressly described in Section 4, Lumno does not send this browsing history, bookmark tree, tab list, website content, or local ranking history to Lumno's servers.

### Where local data is stored

Lumno uses `chrome.storage.local`, `chrome.storage.sync`, session-scoped extension storage when available, and IndexedDB scoped to the extension origin. `chrome.storage.sync` is provided by your browser vendor. If browser sync is enabled, some settings may be synchronized under your browser account's privacy terms. Browser sync and Lumno account sync are separate systems.

### Why each permission is needed

| Permission | Purpose |
| --- | --- |
| `tabs`, `tabGroups` | Query, switch, create, update, group, and restore tabs. |
| `history` | Search and sort history locally and delete entries at your direction. |
| `bookmarks`, `topSites` | Search and manage bookmarks and display frequently visited sites. |
| `storage`, `alarms` | Save settings, caches, and local state and schedule sync or maintenance work. |
| `identity` | Open a controlled sign-in window and complete sign-in through a callback protected by PKCE and state validation. |
| `search` | Send a query you submit to the browser's default search feature. |
| `favicon` | Display website icons through browser-provided capabilities. |
| `scripting`, `<all_urls>` | Provide the in-page command bar, keyboard shortcuts, selected-text actions, and optional Picture-in-Picture features. Broad site access does not mean Lumno bulk-collects or uploads webpage content. |

## 4. Data That Leaves Your Device

### Search, AI, and icon requests you initiate

- **Online search suggestions:** Your query is sent directly to the active search engine's suggestion endpoint, which may be operated by Google, Bing, Baidu, Sogou, 360, DuckDuckGo, Yandex, Quark, Shenma, or Yahoo.
- **Web and site search:** A submitted query is sent to your browser's default search engine, the search engine you select, or the selected site-search service.
- **AI search and selected-text actions:** Only after you choose the relevant action, your query, selected text, and any instruction Lumno adds for that action are filled into or sent to the AI or search service you selected, such as ChatGPT, Gemini, or another configured provider. That provider processes the content under its own privacy policy.
- **Favicons and site theme information:** To display an icon or derive a site theme, Lumno may request a resource based on a URL or domain from the destination site, a browser favicon endpoint, Google / gstatic, or a favicon service. The recipient may receive the requested domain or URL, IP address, User-Agent, and ordinary network metadata.

These requests are generally made directly from the extension to the relevant third party; the query or selected text does not first pass through Lumno's servers. You can reduce these requests by not using the feature, changing providers, or using request blocklists available in the extension.

### Accounts and sync

If you choose to sign in and use cloud features, Lumno processes:

- a system-generated user ID, email address, your selected Google or GitHub sign-in method, and basic profile fields such as display name and avatar returned by that provider; if Google and GitHub return the same verified email, Supabase may automatically link both identities to one Lumno account;
- a random device ID, device display name, browser family, coarse platform type, extension version, and last activity time;
- consent records, sync versions, conflict state, and operation identifiers used to prevent duplicate writes;
- Lumno settings you choose to sync. Custom shortcuts, search providers, and blocklist rules may contain URLs, names, or rule text that you entered;
- custom wallpaper originals, thumbnails, filenames, file types, dimensions, byte sizes, and file hashes that you choose to sync.

Lumno uses this data to authenticate your account, restore settings and media across devices, resolve sync conflicts, protect the service, and troubleshoot failures. Custom media is kept in access-controlled private storage and is not published as a public link.

### Optional in-extension product usage metrics

In-extension product usage metrics are **off by default** and require both sign-in and an explicit opt-in. If enabled, Lumno uploads daily:

- counts of command-bar opens, tab switches, web searches, site searches, AI searches, new-tab opens, document or video Picture-in-Picture starts, sync successes or failures, and wallpaper upload successes or failures;
- extension version, interface locale, browser family, and coarse platform type;
- enumerated or Boolean settings such as theme and layout, and counts or ranges for shortcuts, recent sites, search providers, and blocklist rules.

This channel does not upload specific URLs, domains, paths, search terms, page titles, browsing history, bookmark content, email addresses, cookies, authentication tokens, wallpaper content, or custom rule text. Allowed fields are validated before upload and again on the server, although daily metrics remain linked to your account during their retention period.

### Website analytics

Public pages on the Lumno website load VibeLoft visitor analytics and may enable Google Analytics at deployment. These services may process page URLs and titles, visit times, referrers, click events, browser language, device and browser type, coarse location, IP address and request logs, and cookies or other pseudonymous identifiers. Lumno uses this information to understand public-page traffic, performance, and acquisition sources. It is not combined with browsing history, bookmarks, tabs, or search terms from the extension.

Sensitive sign-in, authorization, and callback pages do not load these website analytics scripts. You can block public-page analytics through browser cookie, script, or tracking-protection controls without affecting local extension features or account sign-in.

## 5. Purposes, Legal Bases, and Recipients

Lumno processes data only as needed to provide browser features, accounts, and sync you request; complete third-party search or AI actions you initiate; produce product usage metrics after consent; maintain security and reliability; prevent abuse; and comply with law. Depending on where you live, the legal basis may include necessity to provide the service you requested, consent that you may withdraw, legitimate interests in keeping the service secure and reliable, and legal obligations.

| Recipient | Data it may process | Purpose |
| --- | --- | --- |
| [Supabase](https://supabase.com/privacy) | Account, device, consent, synced settings, custom media, optional product metrics, and limited service logs | Authentication, database, private object storage, and Edge Functions; the primary project region is Tokyo, Japan. |
| [Google](https://policies.google.com/privacy), [GitHub](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement) | Identity and OAuth request information needed when you choose to sign in | Complete your chosen sign-in; identities with the same verified email may be linked to one Lumno account. |
| [VibeLoft](https://vibeloft.ai/privacy), Google Analytics if enabled | Website visit and technical information | Measure public-page traffic, sources, and performance. |
| Browser vendors | Settings stored in `chrome.storage.sync` and browser-account metadata | Provide browser-native extension settings sync. |
| Search, AI, website, or favicon services you select | Query, selected text, prompt, requested URL or domain, and network metadata | Complete a search, AI action, navigation, or icon request you initiated. |

Providers may process data outside your country or region. Lumno does not sell data or provide it to data brokers or advertising platforms, and does not collect or transfer browsing activity for purposes unrelated to the extension's disclosed single purpose.

## 6. Retention and the Effect of Deletion

| Data | Retention period or criterion |
| --- | --- |
| Local settings, caches, and ranking history | Until you clear extension data in the browser or uninstall Lumno; browser-synced copies follow the browser vendor's rules. |
| Account, device, synced settings, and custom media | Until you delete the relevant content or permanently delete your account. Deleted media is removed from active storage and metadata; backup remnants expire under the provider's backup cycle. |
| Account-linked daily product metrics and configuration | **24 months** from the relevant day, after which linked detail is deleted. Before deletion, totals may be aggregated by month and feature metric without user ID, device ID, email address, or configuration. Totals that can no longer be linked to an individual may be retained long term. |
| Metric-upload deduplication batch identifiers | 30 days. |
| Sync-write deduplication operation records | 90 days. |
| Infrastructure, security, and request logs | Retained by providers under the current service plan and only as needed for security and troubleshooting. Lumno uses the shortest period necessary for those purposes and does not create a separate long-term export. |

Permanent account deletion removes the account, devices, synced settings, custom media, consent records, and any product metrics still linkable to the account from active cloud systems. Data required by law, needed for a security investigation, present temporarily in provider backups, or already irreversibly aggregated may not be deleted at the same time. Account deletion does not automatically erase local data on your devices or browser-vendor sync copies.

## 7. Your Choices and Rights

You can:

- use most local features without signing in;
- decide whether to enable Lumno account sync and in-extension product usage metrics;
- turn metrics off at any time. This stops new recording and clears pending local counts, without affecting the lawfulness of earlier consent-based processing;
- sign out, disable cloud sync, delete custom media, or permanently delete your account through the account interface;
- clear local or browser-sync data through browser settings or uninstall the extension;
- avoid online suggestions, AI, selected-text, or other third-party features, or change the relevant provider.

Where applicable, you may also request access to, a copy or export of, correction of, deletion of, restriction of, or objection to the processing of your personal data, and you may withdraw consent. Email [i@kubai.design](mailto:i@kubai.design). Lumno may need to verify your account identity to prevent unauthorized access or deletion and will respond within the period required by applicable law. You may also complain to a privacy regulator with jurisdiction over you. Exercising a privacy right will not result in discriminatory treatment.

Lumno does not use personal data to make automated decisions that produce legal or similarly significant effects, and it does not perform that kind of profiling.

## 8. Security Measures and Limits

Lumno transmits cloud data over HTTPS, applies row-level access controls to application tables, uses private media storage, and keeps privileged keys on the server. Extension sign-in uses an OAuth authorization-code flow with PKCE and state validation. Authentication tokens are stored in IndexedDB scoped to the extension origin; they are not put into Chrome Sync or exposed to ordinary webpages or content scripts.

These measures reduce the risk of unauthorized access, alteration, or disclosure, but no network transmission, device, or storage system can be guaranteed completely secure. Protect your browser account and device, and report a suspected security issue to [i@kubai.design](mailto:i@kubai.design).

When you direct a query or selected text to a search, AI, or other third party, that party's own privacy policy and security measures govern its direct processing. Third-party availability and policies may change. Nothing in this section removes Lumno's legal responsibility for its own processing or the processors it selects, or waives any non-waivable statutory right.

## 9. International Processing and Children

Account, sync, and media data is primarily stored in Supabase's Tokyo, Japan region. Supabase, Google, GitHub, VibeLoft, Google Analytics, and search or AI services you select may process identity data, content, or service logs in other countries. Where applicable, Lumno uses provider data-protection terms, required transfer mechanisms, or user consent. If local law requires separate consent or additional safeguards, Lumno will present the relevant choice before that processing or limit availability of the cloud feature.

Lumno is intended for a general audience and is not directed to children under 13. A user below the age at which they may independently consent to personal-data processing where they live should use account, sync, and optional metrics only with a guardian's consent and guidance. If you believe Lumno processed a child's personal data without appropriate consent, contact us so we can investigate and delete it.

## 10. Transfer Restrictions, Chrome Limited Use, and Policy Changes

Lumno does not sell or rent user data or use it for personalized advertising, cross-context behavioral advertising, credit assessment, lending, or other purposes unrelated to the extension's core functionality. Lumno transfers data only when necessary to provide or improve its disclosed single purpose, comply with law, investigate security or abuse, or complete a business transaction after obtaining any explicit consent required by law.

Lumno's use of information received from browser APIs and Google APIs complies with the [Chrome Web Store User Data Policy](https://developer.chrome.com/docs/webstore/program-policies/policies), including the **Limited Use** requirements. Lumno does not allow humans to read user content unless the user explicitly consents for a specific support request, access is necessary for a security investigation or legal obligation, or the data has been aggregated and anonymized for internal operations.

If Lumno adds a data category, purpose, or recipient, or materially changes a retention period, Lumno will first update this policy and store disclosures and will prominently disclose the change in the product as required by Chrome Web Store policy. Consent will be requested again where required by law. Editorial changes, updated links, or clarifications that do not reduce user rights may update only the page date. A material change does not retroactively authorize previously undisclosed processing.
