Here are some common ways people use Lumno, each with the steps to try it yourself.

## When you have dozens of tabs open {#many-tabs}

With many tabs open, the titles get squeezed and it's hard to find the one you want. In this case, search only your open tabs:

1. Press `⌘ ⇧ K` to open the command bar.
2. While the search box is empty, press `Tab` once. "Search open tabs" appears on the left.
3. Type a few letters from the page title, such as "layout", select the page you want and press `↩` to switch to it.

![The command bar in "Search open tabs" mode: typing layout lists four open MDN tabs with layout in their titles, each with Switch on the right](uc-tabs "Search only your open tabs")

Open tabs also appear in a normal search, marked "Opened". Pressing `↩` switches to the tab instead of opening a duplicate. To move between the last two or three pages, `⌥ Q` is even faster.

If your tabs are slowing down your computer, you can also use Chrome's built-in Memory Saver, or collect tabs into a list with [OneTab](https://www.one-tab.com/).

See [Search tabs, bookmarks and history](../search-tabs-bookmarks-history/) and [Switch between recent tabs](../tab-switcher/).

## When you've moved from Arc {#from-arc}

Since [Arc](https://arc.net/) stopped adding new features, many people have moved to Dia, Chrome or Edge. Lumno is inspired by Arc's command bar, recent tab switching, pinned tab restore and automatic picture-in-picture. After you install Lumno, follow these steps to set up the command bar:

1. Open `chrome://extensions/shortcuts` in the address bar.
2. Find Lumno and set "Open command bar" to `⌘ T`.
3. Press `⌘ T` to open the command bar, and `⌥ Q` to switch between recent tabs, like `⌃ Tab` in Arc.

![The browser's extension shortcuts page, with Lumno's "Open command bar" set to ⇧⌘K and "Open recent tab switcher" set to ⌥Q](shortcuts "Changing Lumno's shortcuts on the extensions page")

See [Moving from Arc](../arc-command-bar/).

## When you work with docs and GitHub {#developers}

Type a site's shortcut and press `Tab` to skip the home page and search the site directly. For example, type `gh`, press `Tab`, type `command palette` and press `↩` to open GitHub's search results. Other common shortcuts include `mdn`, `npm` and `sf` (Stack Overflow).

![The search box shows GitHub on the left; typing command palette offers to search GitHub for command palette](sitesearch "Type gh and press Tab to search GitHub directly")

- Type an address such as `chrome://extensions` to open it directly.
- Add your company's internal docs or issue tracker as a custom search in Lumno's settings, with a shortcut of your choice. See [Add a custom search](../site-search/#custom).

## When you research and write {#research}

You may remember reading an article but not whether you bookmarked it or only visited it. Type a keyword in the command bar to search your bookmarks and history together. The label next to each result shows where it comes from, and bookmarks also show their folder.

![Typing css grid finds a page from history and an MDN page in the CSS reading bookmarks folder](uc-research "Search bookmarks and history together")

When a passage is hard to follow, use selection quick actions: select the text, and a Lumno button appears next to it. Click it to choose an action such as Answer, Explain or Research, and Lumno opens the AI's answer in a new tab. Lumno first checks whether the text is likely to need help, so the button doesn't appear every time you select something. This feature is off by default; turn it on under Labs in Lumno's settings. See [Selection quick actions](../selection-actions/).

![In an article, a selected sentence about the fr unit with Answer, Explain and Research actions next to it](uc-selection "Select text, then ask AI to explain or research it")

## When you ask AI first {#ai}

Type an AI's shortcut, such as `gpt` (ChatGPT), `gm` (Gemini) or `pplx` (Perplexity), and press `Tab`. Then write your question and press `↩`. Lumno opens that AI's web app and sends the question for you, so you don't need to open the site and paste it yourself.

![The search box shows ChatGPT on the left with a question about alternatives to Arc's command bar, ready to open ChatGPT](ai "Type gpt and press Tab to send your question to ChatGPT")

See [Site search and asking AI](../site-search/#ai).

## When you want a calm new tab {#quiet-new-tab}

Lumno's new tab can show only what you need:

- Wallpaper: choose a painting you like, or get a new Bing photo every day.
- Clock: show the time above the search box.
- Zen mode: when you need to focus, type `/zen` in the new tab's search box to keep only the search box and wallpaper.

![The full new tab: the clock 09:41 and search box at the top, then a row of shortcuts, eight bookmarks and most visited sites, over an impressionist orchard](nt-clock "A clock above the search box")

See [Change the wallpaper](../newtab-wallpaper/) and [Clock and Zen mode](../newtab-clock-zen/).

## When you follow a show or a serial {#series}

When you watch a show or read a serialized novel, Lumno can remember which episode or chapter you're on, right on your new tab:

1. Open the episode or chapter you're on. It then appears among the site cards at the bottom of the new tab. If you don't see it, hover over "Most Visited" at the top left of the cards and switch to "Recent".
2. Hover over the card and click the pin icon. When Lumno recognizes an episode or chapter page, it starts tracking your progress automatically, and the card shows a radar icon. If tracking doesn't start, right-click the card and choose "Track progress".
3. When you reach the next episode or chapter of the same title, the card updates automatically. Next time, click the card to continue where you left off.

![Site cards at the bottom of the new tab: pinned Crunchyroll and Wandering Inn cards with radar icons, followed by GitHub and Material](uc-series "Cards with a radar icon are tracking progress")

See [Frequent sites and progress cards](../newtab-frequent-sites/).
