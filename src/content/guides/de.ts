import type { GuideLocaleContent } from "../../lib/guides";

/** German help center. The extension itself shows English here, so its labels stay in English. */
const content: GuideLocaleContent = {
  ui: {
    navLabel: "Hilfe",
    navTitle: "Lumno-Hilfe",
    groups: {
      about: "Über Lumno",
      quickstart: "Erste Schritte",
      trust: "Kompatibilität & Vertrauen",
    },
    sections: {
      setup: "Installieren & einrichten",
      "command-bar": "Befehlsleiste",
      "new-tab": "Neuer Tab",
      scenarios: "Anwendungsfälle",
    },
    navToggle: "Inhalt",
    updatedLabel: "Aktualisiert am {date}",
    tocLabel: "Auf dieser Seite",
    faqTitle: "Häufige Fragen",
    previousLabel: "Zurück",
    nextLabel: "Weiter",
    zoomLabel: "In voller Größe ansehen",
    closeLabel: "Schließen",
    privacyLabel: "Datenschutzerklärung",
    searchPlaceholder: "Hilfe durchsuchen",
    searchLabel: "Die Hilfe durchsuchen",
    searchEmpty: "Nichts gefunden",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "Was ist Lumno? Open-Source-Befehlsleiste und neuer Tab für den Browser | Lumno-Hilfe",
      pageDescription:
        "Lumno ist eine kostenlose Open-Source-Browsererweiterung. Drück auf jeder Seite ⌘⇧K, um Tabs, Lesezeichen und Verlauf zu durchsuchen, direkt auf Websites zu suchen oder die KI zu fragen – dazu ein ruhiger, anpassbarer neuer Tab. Läuft in Chrome, Edge, Dia und anderen Chromium-Browsern.",
      keywords: ["Lumno", "Browser-Befehlsleiste", "Chrome Command Palette Erweiterung", "Tab-Suche", "Neuer-Tab-Erweiterung", "Arc Befehlsleiste"],
      title: "Was ist Lumno?",
      navTitle: "Was ist Lumno?",
      faq: [
        { question: "Ist Lumno kostenlos?", answer: "Ja. Lumno ist Open Source unter GPL-3.0, alle Funktionen sind kostenlos und du brauchst kein Konto." },
        {
          question: "In welchen Browsern funktioniert Lumno?",
          answer: "In Chrome, Edge, Dia, Brave, Arc, Vivaldi und anderen Chromium-Browsern. Safari wird nicht unterstützt. Mehr dazu unter Browserkompatibilität.",
        },
      ],
    },
    limitations: {
      pageTitle: "Was Lumno nicht kann: Grenzen und bekannte Lücken | Lumno-Hilfe",
      pageDescription:
        "Lumno ist eine Erweiterung, kein Browser: keine Seitenleiste, keine Spaces, keine geteilte Ansicht, keine Befehlsleiste auf chrome://-Seiten, kein Safari und kein neuer Tab in Dia. Hier steht, was nicht geht – und was du stattdessen nutzen kannst.",
      keywords: ["Lumno Grenzen", "Chrome-Erweiterung eingeschränkte Seiten", "Arc Seitenleiste Alternative", "Dia neuer Tab"],
      title: "Was Lumno nicht kann",
      navTitle: "Was Lumno nicht kann",
    },
    "use-cases": {
      pageTitle: "Für wen Lumno gemacht ist: zu viele Tabs, Umstieg von Arc, Entwicklung und Schreiben | Lumno-Hilfe",
      pageDescription:
        "Wo Lumno am meisten hilft: Dutzende offene Tabs, der Umstieg von Arc auf Chrome oder Dia, Entwickler zwischen Doku und GitHub, Recherche und Schreiben, schnelle KI-Fragen und ein ruhiger neuer Tab.",
      keywords: ["Lumno Anwendungsfälle", "zu viele Tabs", "Arc Alternative", "Browsererweiterung für Entwickler", "KI fragen Tastenkürzel"],
      title: "Anwendungsfälle",
      navTitle: "Anwendungsfälle",
    },
    install: {
      pageTitle: "Lumno aus dem Chrome Web Store oder von Edge-Add-ons installieren | Lumno-Hilfe",
      pageDescription:
        "Installiere Lumno aus dem Chrome Web Store in Chrome, Dia, Brave oder Arc oder über Microsoft Edge-Add-ons in Edge. Danach öffnet sich eine Willkommensseite und ⌘⇧K ist sofort einsatzbereit.",
      keywords: ["Lumno installieren", "Lumno Chrome Web Store", "Lumno Edge-Add-ons", "Chrome-Erweiterung installieren"],
      title: "Lumno installieren",
      navTitle: "Lumno installieren",
      faq: [
        { question: "Brauche ich ein Konto?", answer: "Nein. Lumno hat kein Kontosystem. Installieren, fertig." },
        {
          question: "Wie deinstalliere ich Lumno?",
          answer: "Öffne chrome://extensions (in Edge edge://extensions), such Lumno und klick auf Entfernen. Dabei werden auch die Einstellungen und Bilder gelöscht, die Lumno auf deinem Gerät gespeichert hat.",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Lumno-Tastenkürzel: Standards, ändern und Tasten in der Befehlsleiste | Lumno-Hilfe",
      pageDescription:
        "Lumno öffnet sich mit ⌘⇧K (unter Windows Strg+Umschalt+K), der Tab-Umschalter mit ⌥Q. Ändern kannst du beides unter chrome://extensions/shortcuts, sogar auf ⌘T. Dazu alle Tasten in der Befehlsleiste und im Umschalter.",
      keywords: ["Lumno Tastenkürzel", "Chrome-Erweiterung Tastenkürzel ändern", "chrome://extensions/shortcuts", "Cmd T Befehlsleiste"],
      title: "Tastenkürzel",
      navTitle: "Tastenkürzel",
      faq: [
        {
          question: "Das Tastenkürzel tut nichts. Was nun?",
          answer:
            "Prüf zuerst, ob du auf einer eingeschränkten Seite bist, etwa in den chrome://-Einstellungen oder im Web Store. Schau dann unter chrome://extensions/shortcuts, ob eine andere Erweiterung dasselbe Kürzel nutzt. In Dia stellst du den Bereich auf Global.",
        },
      ],
    },
    sync: {
      pageTitle: "Lumno auf mehreren Computern: mit Browser-Synchronisierung und WebDAV | Lumno-Hilfe",
      pageDescription:
        "Lumnos Einstellungen wandern mit der Synchronisierung deines Browsers. Mit WebDAV-Sync kommen auch eigene Shortcut-Icons und Hintergründe mit – über Nextcloud, ein NAS oder jeden WebDAV-Server, den du selbst betreibst.",
      keywords: ["Lumno Synchronisierung", "WebDAV Sync", "Nextcloud WebDAV", "Chrome-Erweiterung Einstellungen synchronisieren", "neuer Tab synchronisieren"],
      title: "Synchronisierung",
      navTitle: "Synchronisierung",
      faq: [
        {
          question: "Brauche ich zum Synchronisieren ein Lumno-Konto?",
          answer: "Nein. Lumno hat weder Konten noch Server. Einstellungen laufen über die Synchronisierung deines Browsers, Icons und Hintergründe über deinen eigenen WebDAV-Server.",
        },
        {
          question: "Können Chrome und Firefox miteinander synchronisieren?",
          answer: "Ja, über WebDAV. Trag in beiden Browsern denselben Server und Ordner ein – das klappt sogar auf demselben Computer.",
        },
      ],
    },
    "search-tabs-bookmarks-history": {
      pageTitle: "Offene Tabs, Lesezeichen und Verlauf in einem Suchfeld durchsuchen | Lumno-Hilfe",
      pageDescription:
        "Drück auf jeder Seite ⌘⇧K (unter Windows Strg+Umschalt+K) und durchsuche offene Tabs, Lesezeichen, Verlauf und meistbesuchte Seiten in einem Feld – oder nur deine offenen Tabs.",
      keywords: ["Chrome Tab-Suche", "Lesezeichen-Suche Erweiterung", "Verlauf durchsuchen", "offene Tabs suchen", "Chrome Command Palette"],
      title: "Tabs, Lesezeichen und Verlauf durchsuchen",
      navTitle: "Tabs, Lesezeichen & Verlauf",
      faq: [
        {
          question: "Lädt Lumno meinen Verlauf oder meine Lesezeichen hoch?",
          answer:
            "Nein. Tabs, Lesezeichen und Verlauf werden auf deinem Gerät durchsucht, und Lumno sammelt sie nicht. Was du eintippst, geht an den Vorschlagsdienst deiner Suchmaschine – genau wie in der Adressleiste.",
        },
        {
          question: "Können Ergebnisse in einem neuen Tab öffnen?",
          answer: "Ja. In Lumnos Einstellungen wählst du, ob Ergebnisse im aktuellen Tab, links oder rechts daneben oder am Ende der Tableiste öffnen.",
        },
      ],
    },
    "site-search": {
      pageTitle: "Seitensuche: Kürzel tippen, Tab drücken, GitHub, YouTube oder ChatGPT durchsuchen | Lumno-Hilfe",
      pageDescription:
        "Lumno bringt 46 Suchkürzel mit. Tipp gh, yt oder sf und drück Tab, um GitHub, YouTube oder Stack Overflow direkt zu durchsuchen – oder schick eine Frage gleich an ChatGPT, Gemini oder Perplexity.",
      keywords: ["Chrome Seitensuche", "Tab zum Suchen", "Suchkürzel Browser", "GitHub schnell durchsuchen", "ChatGPT Tastenkürzel", "eigene Suchmaschine"],
      title: "Seitensuche und KI fragen",
      navTitle: "Seitensuche & KI fragen",
      faq: [
        {
          question: "Welche Websites sind dabei?",
          answer:
            "46 insgesamt: 11 Suchmaschinen, 11 KI-Chats und KI-Suchmaschinen (etwa ChatGPT, Gemini, Perplexity und DeepSeek) und 24 Websites wie GitHub, YouTube, Stack Overflow und Reddit. Eigene kannst du hinzufügen.",
        },
        { question: "Läuft die Seitensuche über Lumnos Server?", answer: "Nein. Lumno hat keine Server; mit Enter öffnet sich direkt die Suchseite der Website." },
      ],
    },
    "tab-switcher": {
      pageTitle: "Tab-Umschalter: mit ⌥Q zwischen den letzten Tabs wechseln | Lumno-Hilfe",
      pageDescription:
        "Drück ⌥Q (unter Windows Alt+Q), um Lumnos Tab-Umschalter zu öffnen – deine Tabs in der Reihenfolge, in der du sie genutzt hast, jeweils mit Vorschau. ⌥ halten, Q tippen, loslassen.",
      keywords: ["Chrome Tab-Umschalter", "zuletzt genutzte Tabs", "Alt Tab für den Browser", "Arc Ctrl Tab"],
      title: "Zwischen den letzten Tabs wechseln",
      navTitle: "Zwischen Tabs wechseln",
    },
    "newtab-wallpaper": {
      pageTitle: "Hintergründe für den neuen Tab: Gemälde, Bing-Bild des Tages, eigene Fotos und Filter | Lumno-Hilfe",
      pageDescription:
        "Ändere den Hintergrund von Lumnos neuem Tab in den Appearance-Einstellungen: eingebaute Gemälde, Bings Bild des Tages, kuratierte Fotos, eigene Bilder oder ein Bildlink – mit Abdunkelung, Filtern und getrennter Wahl für hell und dunkel.",
      keywords: ["Neuer-Tab-Hintergrund", "Chrome neuer Tab Hintergrund", "Bing Bild des Tages", "Neuer-Tab-Erweiterung"],
      title: "Hintergrund ändern",
      navTitle: "Hintergrund ändern",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "Shortcuts und Lesezeichen im neuen Tab: Websites hinzufügen, drei Layouts | Lumno-Hilfe",
      pageDescription:
        "Leg deine Lieblingsseiten als Shortcuts auf Lumnos neuen Tab, wähl ihre Icons und sieh deine Lesezeichen als Ordner, verschachtelte Liste oder Leiste oben.",
      keywords: ["neuer Tab Shortcuts", "neuer Tab Lesezeichen", "Chrome Lesezeichenleiste", "Lesezeichenordner"],
      title: "Shortcuts und Lesezeichen",
      navTitle: "Shortcuts & Lesezeichen",
    },
    "newtab-frequent-sites": {
      pageTitle: "Häufig besuchte Seiten und Fortschrittskarten: Seiten anheften, bei Serien dranbleiben | Lumno-Hilfe",
      pageDescription:
        "Lumnos neuer Tab zeigt deine meistbesuchten oder zuletzt besuchten Seiten. Hefte bis zu drei an – bei einer Serie oder einem Fortsetzungsroman springt die Karte mit dir zur nächsten Folge oder zum nächsten Kapitel.",
      keywords: ["neuer Tab meistbesucht", "Serienfortschritt merken", "Webnovel Fortschritt", "Seiten anheften"],
      title: "Häufig besuchte Seiten und Fortschrittskarten",
      navTitle: "Häufige Seiten & Fortschritt",
    },
    "newtab-clock-zen": {
      pageTitle: "Uhr und Zen-Modus: ein neuer Tab nur mit dem Suchfeld | Lumno-Hilfe",
      pageDescription: "Zeig eine Uhr auf Lumnos neuem Tab an oder tipp /zen, damit nur noch das Suchfeld bleibt.",
      keywords: ["neuer Tab Uhr", "minimalistischer neuer Tab", "Zen-Modus", "neuer Tab fokussiert"],
      title: "Uhr und Zen-Modus",
      navTitle: "Uhr & Zen-Modus",
    },
    "arc-command-bar": {
      pageTitle: "Von Arc zu Chrome, Dia oder Edge: Befehlsleiste und Tastenkürzel | Lumno-Hilfe",
      pageDescription:
        "Von Arc zu Chrome, Dia oder Edge gewechselt? Lumno bringt eine Befehlsleiste im Arc-Stil zurück: ⌘⇧K durchsucht Tabs, Lesezeichen und Verlauf (oder leg es auf ⌘T), ⌥Q wechselt zwischen den letzten Tabs. Mit Übersicht der Arc-Tastenkürzel.",
      keywords: ["Arc Befehlsleiste Alternative", "Arc Browser Alternative", "von Arc zu Chrome wechseln", "Dia Befehlsleiste", "Arc Tastenkürzel"],
      title: "Umstieg von Arc",
      navTitle: "Umstieg von Arc",
      faq: [
        {
          question: "Hat Lumno etwas mit Arc zu tun?",
          answer: "Nein. Lumno ist ein unabhängiges Open-Source-Projekt, inspiriert von Arcs Befehlsleiste, und steht in keiner Verbindung zu Arc oder The Browser Company.",
        },
      ],
    },
    "browser-compatibility": {
      pageTitle: "Browserkompatibilität: Chrome, Edge, Dia, Brave, Firefox und Safari | Lumno-Hilfe",
      pageDescription:
        "Lumno läuft vollständig in Chrome, Edge, Brave, Arc, Vivaldi und anderen Chromium-Browsern. In Dia gibt es keinen Lumno-Tab, der Firefox-Version fehlen ein paar Funktionen, Safari und mobile Browser werden nicht unterstützt.",
      keywords: ["Lumno Kompatibilität", "Dia Erweiterung", "Edge Erweiterung", "Firefox-Version", "Chromium-Erweiterung"],
      title: "Browserkompatibilität",
      navTitle: "Browserkompatibilität",
    },
    "privacy-data": {
      pageTitle: "Datenschutz und Daten: Lumno arbeitet auf deinem Gerät und sammelt nichts | Lumno-Hilfe",
      pageDescription:
        "Lumno hat weder Konten noch Server. Tabs, Lesezeichen und Verlauf bleiben auf deinem Gerät, Nutzungsdaten werden nicht erhoben. Hier steht, was dein Gerät trotzdem verlässt und wie Browser- und WebDAV-Sync funktionieren.",
      keywords: ["Lumno Datenschutz", "Browsererweiterung Datenschutz", "Chrome-Erweiterung Daten", "WebDAV Sync"],
      title: "Datenschutz und Daten",
      navTitle: "Datenschutz und Daten",
    },
    "security-open-source": {
      pageTitle: "Sicherheit und Open Source: GPL-3.0-Code, Berechtigungen, Manifest V3 | Lumno-Hilfe",
      pageDescription:
        "Lumno ist Open Source unter GPL-3.0 auf GitHub, gebaut mit Manifest V3 und ohne nachgeladenen Code. Hier steht, wofür jede Browserberechtigung gebraucht wird.",
      keywords: ["Lumno Open Source", "Lumno Sicherheit", "Chrome-Erweiterung Berechtigungen", "Manifest V3"],
      title: "Sicherheit und Open Source",
      navTitle: "Sicherheit & Open Source",
    },
    "ratings-reviews": {
      pageTitle: "Bewertungen und Presse: Rezensionen im Chrome Web Store und Artikel | Lumno-Hilfe",
      pageDescription: "Lumnos Bewertung und Rezensionen im Chrome Web Store sowie Artikel über Lumno.",
      keywords: ["Lumno Bewertungen", "Lumno Rezension", "Chrome Befehlsleiste Erweiterung Test"],
      title: "Bewertungen und Presse",
      navTitle: "Bewertungen & Presse",
    },
  },
};

export default content;
