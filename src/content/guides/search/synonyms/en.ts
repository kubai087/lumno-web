import type { GuideSearchSynonyms } from "../../../../lib/guide-search-index";

// Words that mean the same thing to a reader. When a query contains any word of a group, the search also tries it
// with each of the others, so one group covers every page. British and American spellings go here too; plural,
// -ing and one-letter typos are handled by the search itself. The extension also uses this list for every language
// it has no help index of its own for.
export default [
  // Features and UI
  ["command bar", "command palette", "popup", "pop-up", "overlay", "search bar", "search box", "searchbar", "launcher", "quick open", "omnibox"],
  ["new tab", "new tab page", "start page", "homepage", "home page", "ntp"],
  ["bookmark", "favorite", "favourite", "saved page"],
  ["history", "browsing history", "visited pages"],
  ["shortcut key", "keyboard shortcut", "hotkey", "hot key", "key binding", "keybinding", "keybind", "shortcut"],
  ["speed dial", "site icon", "top sites", "quick link"],
  ["wallpaper", "background image", "background", "backdrop"],
  ["dark mode", "dark theme", "night mode", "black theme"],
  ["light mode", "light theme", "white theme"],
  ["picture-in-picture", "picture in picture", "pip", "mini player", "floating video", "pop out video"],
  ["web clip", "clip", "crop", "cut out", "snip", "floating window"],
  ["selection", "select text", "selected text", "highlight text", "highlighted text"],
  ["switcher", "switch tabs", "recent tabs", "last tab", "previous tab"],
  ["site search", "search a site", "search inside"],
  ["search engine", "default search"],
  ["clock", "time"],
  ["zen mode", "focus mode", "minimal mode", "distraction-free"],
  ["pin", "keep on top", "stick"],
  ["icon", "favicon", "logo"],
  ["settings", "preferences", "options", "config"],
  ["language", "locale", "display language"],
  ["color", "colour"],
  ["customize", "customise", "personalize", "personalise"],

  // Actions
  ["change", "edit", "modify", "rebind", "remap", "set"],
  ["open", "launch", "bring up", "invoke", "summon", "trigger", "show"],
  ["turn off", "disable", "switch off", "deactivate", "hide"],
  ["restore", "go back", "revert", "reset", "switch back", "get back"],
  ["default", "original", "built-in", "stock"],
  ["install", "download", "add to chrome"],
  ["uninstall", "remove the extension", "remove lumno", "delete the extension"],
  ["sync", "backup", "back up", "new computer", "new laptop", "migrate"],
  ["export", "import"],

  // Symptoms
  ["not working", "doesn't work", "does nothing", "broken", "no response", "won't open", "nothing happens", "stopped working", "unresponsive"],
  ["missing", "disappeared", "gone", "can't find", "vanished"],
  ["slow", "lag", "laggy", "memory"],
  ["blank", "white screen", "empty page"],
  ["conflict", "already in use", "taken", "clash"],

  // Browsers and platforms
  ["extension", "add-on", "addon", "plugin", "plug-in"],
  ["chrome", "google chrome"],
  ["mac", "macos", "macbook"],
  ["windows", "windows pc"],
  ["mobile", "phone", "iphone", "android", "ipad", "tablet"],
  ["chrome web store", "web store", "extension store"],

  // Key names
  ["⌘", "cmd", "command"],
  ["⌥", "option", "alt", "opt"],
  ["⇧", "shift"],
  ["⌃", "ctrl", "control"],
  ["↩", "enter", "return"],
  ["esc", "escape"],

  // Other products
  ["momentum", "infinity", "itab", "wetab", "tabliss"],
  ["raycast", "spotlight", "alfred"],
  ["free", "price", "cost", "paid", "pricing", "subscription"],
  ["open source", "source code", "github"],
  ["privacy", "personal data", "data collection", "tracking"],
  ["permission", "access"],
  ["ai", "chatgpt", "gemini", "perplexity", "deepseek", "llm"],
] satisfies GuideSearchSynonyms;
