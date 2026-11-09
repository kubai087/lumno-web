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
      more: "Weitere Funktionen",
      scenarios: "Anwendungsfälle",
    },
    navToggle: "Inhalt",
    updatedLabel: "Aktualisiert am {date}",
    tocLabel: "Auf dieser Seite",
    faqTitle: "Häufige Fragen",
    previousLabel: "Zurück",
    nextLabel: "Weiter",
    homeCardLabel: "Website",
    homeCardTitle: "Zur Lumno-Startseite",
    zoomLabel: "In voller Größe ansehen",
    closeLabel: "Schließen",
    copyLabel: "Kopieren",
    copiedLabel: "Kopiert",
    privacyLabel: "Datenschutzerklärung",
    searchPlaceholder: "Hilfe durchsuchen",
    searchLabel: "Die Hilfe durchsuchen",
    searchEmpty: "Nichts gefunden. Schreib gern dem Entwickler.",
    searchRecommended: "Empfohlene Artikel",
    searchFeedbackGroup: "WeChat-Gruppe beitreten",
    searchFeedbackIssue: "Issue erstellen",
    searchFeedbackAuthor: "Autor kontaktieren",
    stuckText: "Noch Fragen? Stelle sie auf GitHub oder schreib uns auf X.",
    stuckPrimary: "Auf GitHub fragen",
    stuckSecondary: "Auf X schreiben",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "Was ist Lumno? Open-Source-Befehlsleiste und neuer Tab für den Browser | Lumno-Hilfe",
      pageDescription:
        "Lumno ist eine kostenlose Open-Source-Erweiterung. Mit ⌘⇧K durchsuchst du Tabs, Lesezeichen und Verlauf oder fragst eine KI, dazu ein anpassbarer neuer Tab.",
      keywords: ["Lumno", "Browser-Befehlsleiste", "Chrome Command Palette Erweiterung", "Tab-Suche", "Neuer-Tab-Erweiterung", "Arc Befehlsleiste"],
      title: "Was ist Lumno?",
      navTitle: "Was ist Lumno?",
      faq: [
        { question: "Ist Lumno kostenlos?", answer: "Ja. Lumno ist Open Source unter der GPL-3.0, alle Funktionen sind kostenlos, und du benötigst kein Konto." },
        {
          question: "In welchen Browsern funktioniert Lumno?",
          answer: "In Chrome, Edge, Dia, Brave, Arc, Vivaldi und anderen Chromium-Browsern sowie in Firefox und Firefox-basierten Browsern wie Zen. Safari wird nicht unterstützt. Weitere Informationen findest du unter „Browserkompatibilität“.",
        },
      ],
    },
    limitations: {
      pageTitle: "Was Lumno nicht kann: Grenzen und bekannte Lücken | Lumno-Hilfe",
      pageDescription:
        "Lumno ist eine Erweiterung: keine Befehlsleiste auf chrome://-Seiten, kein Safari, kein neuer Tab in Dia. Was Lumno nicht kann und welche Alternativen es gibt.",
      keywords: ["Lumno Grenzen", "Chrome-Erweiterung eingeschränkte Seiten", "Arc Seitenleiste Alternative", "Dia neuer Tab"],
      title: "Was Lumno nicht kann",
      navTitle: "Was Lumno nicht kann",
    },
    "use-cases": {
      pageTitle: "Für wen Lumno gemacht ist: zu viele Tabs, Umstieg von Arc, Entwicklung und Schreiben | Lumno-Hilfe",
      pageDescription:
        "Wo Lumno am meisten hilft: Dutzende offene Tabs, der Umstieg von Arc, Entwickler zwischen Doku und GitHub, Recherche, KI-Fragen und ein ruhiger neuer Tab.",
      keywords: ["Lumno Anwendungsfälle", "zu viele Tabs", "Arc Alternative", "Browsererweiterung für Entwickler", "KI fragen Tastenkürzel"],
      title: "Anwendungsfälle",
      navTitle: "Anwendungsfälle",
    },
    faq: {
      pageTitle: "Häufige Fragen zu Lumno: Tastenkürzel, eingeschränkte Seiten, neuer Tab und Synchronisierung | Lumno-Hilfe",
      pageDescription:
        "Häufige Fragen zu Lumno: Tastenkürzel ändern, was tun, wenn es nicht funktioniert, andere Neuer-Tab-Erweiterungen, unterstützte Browser, Sync und Daten.",
      keywords: ["Lumno FAQ", "Lumno häufige Fragen", "Chrome-Erweiterung Tastenkürzel funktioniert nicht", "Neuer-Tab-Erweiterung Konflikt", "Lumno kostenlos"],
      title: "Häufige Fragen",
      navTitle: "Häufige Fragen",
    },
    install: {
      pageTitle: "Lumno aus dem Chrome Web Store, von Edge-Add-ons oder Firefox-Add-ons installieren | Lumno-Hilfe",
      pageDescription:
        "Installiere Lumno aus dem Chrome Web Store in Chrome, Dia, Brave oder Arc, über Edge-Add-ons in Edge oder über Firefox-Add-ons in Firefox und Zen.",
      keywords: ["Lumno installieren", "Lumno Chrome Web Store", "Lumno Edge-Add-ons", "Lumno Firefox-Add-ons", "Chrome-Erweiterung installieren"],
      title: "Lumno installieren",
      navTitle: "Lumno installieren",
      faq: [
        { question: "Brauche ich ein Konto?", answer: "Nein. Lumno hat kein Kontosystem und ist direkt nach der Installation einsatzbereit." },
        {
          question: "Wie deinstalliere ich Lumno?",
          answer: "Öffne chrome://extensions (in Edge edge://extensions), such Lumno und klick auf Entfernen. In Firefox entfernst du Lumno unter about:addons. Dabei werden auch die Einstellungen und Bilder gelöscht, die Lumno auf deinem Gerät gespeichert hat.",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Lumno-Tastenkürzel: Standards, ändern und alle Tasten | Lumno-Hilfe",
      pageDescription:
        "Lumno öffnet sich mit ⌘⇧K (Windows: Strg+Umschalt+K), der Tab-Umschalter mit ⌥Q (Alt+Q). So änderst du beides, dazu alle Tasten der Befehlsleiste.",
      keywords: ["Lumno Tastenkürzel", "Chrome-Erweiterung Tastenkürzel ändern", "chrome://extensions/shortcuts", "Cmd T Befehlsleiste", "im Hintergrund öffnen"],
      title: "Tastenkürzel",
      navTitle: "Tastenkürzel",
      faq: [
        {
          question: "Was kann ich tun, wenn das Tastenkürzel nicht funktioniert?",
          answer:
            "Prüfe zuerst, ob du dich auf einer eingeschränkten Seite befindest, etwa in den chrome://-Einstellungen oder im Chrome Web Store. Prüfe dann unter chrome://extensions/shortcuts, ob eine andere Erweiterung dasselbe Tastenkürzel verwendet. In Dia stellst du den Bereich auf „Global“.",
        },
      ],
    },
    sync: {
      pageTitle: "Lumno auf mehreren Computern: mit Browser-Synchronisierung und WebDAV | Lumno-Hilfe",
      pageDescription:
        "Lumnos Einstellungen laufen über die Browser-Synchronisierung. Mit WebDAV kommen eigene Symbole, Hintergründe und Zitate dazu, etwa über Nextcloud oder ein NAS.",
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
          answer: "Ja, über WebDAV. Gib in beiden Browsern denselben Server und Ordner an. Das funktioniert auch auf demselben Computer.",
        },
      ],
    },
    "search-tabs-bookmarks-history": {
      pageTitle: "Offene Tabs, Lesezeichen und Verlauf in einem Suchfeld durchsuchen | Lumno-Hilfe",
      pageDescription:
        "Drücke auf jeder Seite ⌘⇧K (Windows: Strg+Umschalt+K), um offene Tabs, Lesezeichen, Verlauf und meistbesuchte Seiten in einem Suchfeld zu durchsuchen.",
      keywords: ["Chrome Tab-Suche", "Lesezeichen-Suche Erweiterung", "Verlauf durchsuchen", "offene Tabs suchen", "Chrome Command Palette"],
      title: "Tabs, Lesezeichen und Verlauf durchsuchen",
      navTitle: "Tabs, Lesezeichen & Verlauf",
      faq: [
        {
          question: "Lädt Lumno meinen Verlauf oder meine Lesezeichen hoch?",
          answer:
            "Nein. Tabs, Lesezeichen und Verlauf werden auf deinem Gerät durchsucht, und Lumno sammelt sie nicht. Deine Eingabe wird, wie in der Adressleiste, an den Vorschlagsdienst deiner Suchmaschine gesendet.",
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
        "Lumno enthält 47 Suchkürzel. Gib gh, yt oder sf ein und drücke Tab, um GitHub, YouTube oder Stack Overflow zu durchsuchen, oder frage ChatGPT oder Gemini.",
      keywords: ["Chrome Seitensuche", "Tab zum Suchen", "Suchkürzel Browser", "GitHub schnell durchsuchen", "ChatGPT Tastenkürzel", "eigene Suchmaschine"],
      title: "Seitensuche und KI fragen",
      navTitle: "Seitensuche & KI fragen",
      faq: [
        {
          question: "Welche Websites sind dabei?",
          answer:
            "47 insgesamt: 11 Suchmaschinen, 11 KI-Chats und KI-Suchmaschinen (etwa ChatGPT, Gemini, Perplexity und DeepSeek) und 24 Websites wie GitHub, YouTube, Stack Overflow und Reddit, dazu die Lumno-Hilfe. Eigene kannst du hinzufügen.",
        },
        { question: "Läuft die Seitensuche über Lumnos Server?", answer: "Nein. Lumno hat keine Server; mit Enter öffnet sich direkt die Suchseite der Website." },
      ],
    },
    "tab-switcher": {
      pageTitle: "Tab-Umschalter: mit ⌥Q zwischen den letzten Tabs wechseln | Lumno-Hilfe",
      pageDescription:
        "Drücke ⌥Q (Windows: Alt+Q) für Lumnos Tab-Umschalter mit Vorschau in Nutzungsreihenfolge. Halte ⌥, drücke wiederholt Q und lass los, um zu wechseln.",
      keywords: ["Chrome Tab-Umschalter", "zuletzt genutzte Tabs", "Alt Tab für den Browser", "Arc Ctrl Tab"],
      title: "Zwischen den letzten Tabs wechseln",
      navTitle: "Zwischen Tabs wechseln",
    },
    "newtab-wallpaper": {
      pageTitle: "Hintergründe für den neuen Tab: Gemälde, Bing-Bild des Tages, eigene Fotos und Filter | Lumno-Hilfe",
      pageDescription:
        "Ändere den Hintergrund von Lumnos neuem Tab: Gemälde, Bings Bild des Tages, kuratierte Fotos oder eigene Bilder, dazu Abdunkelung, Filter und Glasoptik.",
      keywords: ["Neuer-Tab-Hintergrund", "Chrome neuer Tab Hintergrund", "Bing Bild des Tages", "Neuer-Tab-Erweiterung"],
      title: "Hintergrund ändern",
      navTitle: "Hintergrund ändern",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "Shortcuts und Lesezeichen im neuen Tab: Websites hinzufügen und gruppieren, drei Layouts | Lumno-Hilfe",
      pageDescription:
        "Lege Lieblingsseiten als Shortcuts auf Lumnos neuen Tab, wähle Symbole, ordne sie in Gruppen und Ordnern und zeige Lesezeichen als Ordner, Liste oder Leiste.",
      keywords: ["neuer Tab Shortcuts", "Shortcut-Gruppen", "neuer Tab Lesezeichen", "Chrome Lesezeichenleiste", "Lesezeichenordner", "Lesezeichen im neuen Tab ausblenden"],
      title: "Shortcuts und Lesezeichen",
      navTitle: "Shortcuts & Lesezeichen",
    },
    "newtab-frequent-sites": {
      pageTitle: "Häufig besuchte Seiten und Fortschrittskarten: Seiten anheften, bei Serien dranbleiben | Lumno-Hilfe",
      pageDescription:
        "Lumnos neuer Tab zeigt deine meistbesuchten oder letzten Seiten. Hefte bis zu drei an; bei Serien oder Fortsetzungsromanen folgt die Karte der nächsten Folge.",
      keywords: ["neuer Tab meistbesucht", "Serienfortschritt merken", "Webnovel Fortschritt", "Seiten anheften", "Karten im neuen Tab ausblenden"],
      title: "Häufig besuchte Seiten und Fortschrittskarten",
      navTitle: "Häufige Seiten & Fortschritt",
    },
    "newtab-clock-zen": {
      pageTitle: "Uhr, tägliches Zitat und Zen-Modus: ein neuer Tab nur mit dem Suchfeld | Lumno-Hilfe",
      pageDescription: "Zeige in Lumnos neuem Tab eine Uhr und Zitate aus deiner Datei. Mit /zen bleibt nur das Suchfeld, mit /present sind Lesezeichen beim Teilen verborgen.",
      keywords: ["neuer Tab Uhr", "neuer Tab Zitat", "minimalistischer neuer Tab", "Zen-Modus", "neuer Tab fokussiert", "Präsentationsmodus"],
      title: "Uhr, Zitate und Zen-Modus",
      navTitle: "Uhr, Zitate & Zen-Modus",
    },
    "newtab-other-extensions": {
      pageTitle: "Mit einer anderen Erweiterung für den neuen Tab verwenden: nur Lumnos Befehlsleiste nutzen | Lumno-Hilfe",
      pageDescription:
        "Behalte Momentum, Tabliss oder eine andere Neuer-Tab-Erweiterung und nutze nur Lumnos Befehlsleiste: Aktiviere die andere nach Lumno und behalte die Änderung.",
      keywords: ["Neuer-Tab-Erweiterung Konflikt", "Chrome neuer Tab von Erweiterung geändert", "nur Lumno Befehlsleiste", "Momentum", "Tabliss"],
      title: "Mit einer anderen Erweiterung für den neuen Tab verwenden",
      navTitle: "Mit anderer Neuer-Tab-Erweiterung",
    },
    "selection-actions": {
      pageTitle: "Schnellaktionen für markierten Text: Text von einer KI erklären, übersetzen oder zusammenfassen lassen | Lumno-Hilfe",
      pageDescription:
        "Markiere Text, und Lumno schlägt KI-Aktionen wie Translate, Explain oder Summarize vor. Die Prüfung läuft auf deinem Gerät, daher erscheint es nicht immer.",
      keywords: ["Text markieren KI", "markierten Text übersetzen", "markierten Text erklären", "Chrome Erweiterung Markierung KI", "Text zusammenfassen"],
      title: "Schnellaktionen für markierten Text",
      navTitle: "Schnellaktionen für markierten Text",
    },
    "auto-pip": {
      pageTitle: "Automatisches Bild-im-Bild: Videos laufen beim Tabwechsel in einem kleinen Fenster weiter | Lumno-Hilfe",
      pageDescription:
        "Wechselst du während eines Videos den Tab, läuft es im Bild-im-Bild-Fenster weiter. Wann die Funktion startet, wo nicht und wie du sie deaktivierst.",
      keywords: ["automatisches Bild-im-Bild", "Chrome Bild-im-Bild Erweiterung", "Video Tabwechsel kleines Fenster", "Arc Bild-im-Bild", "schwebendes Videofenster"],
      title: "Automatisches Bild-im-Bild",
      navTitle: "Automatisches Bild-im-Bild",
    },
    "link-preview": {
      pageTitle: "Link-Vorschau: Links mit Umschalt-Klick in einem kleinen Fenster öffnen | Lumno-Hilfe",
      pageDescription:
        "Klicke mit gedrückter Umschalttaste auf einen Link, um ihn in einem kleinen Fenster über der Seite zu öffnen. Schließe es oder verschiebe es in einen Tab.",
      keywords: ["Link-Vorschau", "Link ansehen ohne neuen Tab", "Umschalt-Klick Link", "Link-Vorschau Chrome-Erweiterung", "Arc Peek Alternative"],
      title: "Link-Vorschau",
      navTitle: "Link-Vorschau",
    },
    "web-clip": {
      pageTitle: "Web-Clip: Einen Seitenbereich in einem schwebenden Fenster behalten | Lumno-Hilfe",
      pageDescription:
        "Mit Web-Clip legst du Tabellen, Code oder Diagramme in ein schwebendes Fenster, das beim Tabwechsel sichtbar bleibt. So nutzt du es, und das sind die Grenzen.",
      keywords: ["Web-Clip", "Document Picture-in-Picture", "schwebendes Fenster Chrome-Erweiterung", "Teil einer Webseite anheften", "Bild im Bild Element"],
      title: "Web-Clip",
      navTitle: "Web-Clip",
    },
    "arc-command-bar": {
      pageTitle: "Arc wird eingestellt: so wechselst du zu Dia, Chrome oder Edge | Lumno-Hilfe",
      pageDescription:
        "Arc wird am 22. Dezember 2026 eingestellt. Zeitplan, Datenexport und wie Lumno dir in Chrome, Dia und Edge eine Befehlsleiste im Stil von Arc gibt.",
      keywords: ["Arc wird eingestellt", "Arc Browser Einstellung", "Arc Browser Alternative", "Arc Daten exportieren", "von Arc zu Chrome wechseln", "Arc Befehlsleiste Alternative", "Arc Tastenkürzel"],
      title: "Umstieg von Arc",
      navTitle: "Umstieg von Arc",
      faq: [
        {
          question: "Kann ich Arc nach dem 22. Dezember noch öffnen?",
          answer: "Nein. Arc für Mac und Windows funktioniert ab dem 22. Dezember 2026 nicht mehr, und die Arc-Daten auf deinem Computer lassen sich danach nicht mehr öffnen. Importiere sie vorher in Dia oder exportiere sie.",
        },
        {
          question: "Ich nutze Lumno in Arc. Kann ich meine Einstellungen behalten?",
          answer: "Ja. Exportiere deine Einstellungen in Lumno, bevor Arc eingestellt wird, und importiere sie, nachdem du Lumno im neuen Browser installiert hast. Oder schalte die WebDAV-Synchronisierung ein.",
        },
        {
          question: "Hat Lumno etwas mit Arc zu tun?",
          answer: "Nein. Lumno ist ein unabhängiges Open-Source-Projekt, inspiriert von Arcs Befehlsleiste, und steht in keiner Verbindung zu Arc oder The Browser Company.",
        },
      ],
    },
    "browser-compatibility": {
      pageTitle: "Browserkompatibilität: Chrome, Edge, Dia, Brave, Firefox und Safari | Lumno-Hilfe",
      pageDescription:
        "Lumno läuft vollständig in Chrome, Edge, Brave, Arc, Vivaldi und anderen Chromium-Browsern. Kein neuer Tab in Dia, kleine Lücken in Firefox, kein Safari.",
      keywords: ["Lumno Kompatibilität", "Dia Erweiterung", "Edge Erweiterung", "Firefox-Version", "Chromium-Erweiterung"],
      title: "Browserkompatibilität",
      navTitle: "Browserkompatibilität",
    },
    "security-open-source": {
      pageTitle: "Sicherheit und Open Source: GPL-3.0-Code, Berechtigungen, Manifest V3 | Lumno-Hilfe",
      pageDescription:
        "Lumno ist Open Source unter GPL-3.0 auf GitHub, gebaut mit Manifest V3, ohne nachgeladenen Code, und fordert nur die nötigen Browserberechtigungen an.",
      keywords: ["Lumno Open Source", "Lumno Sicherheit", "Chrome-Erweiterung Berechtigungen", "Manifest V3"],
      title: "Sicherheit und Open Source",
      navTitle: "Sicherheit & Open Source",
    },
    "ratings-reviews": {
      pageTitle: "Bewertungen und Presse: Rezensionen im Chrome Web Store und Artikel | Lumno-Hilfe",
      pageDescription: "Lumnos Bewertung und Rezensionen im Chrome Web Store, die Bewertungsseite bei Firefox-Add-ons sowie Artikel über Lumno.",
      keywords: ["Lumno Bewertungen", "Lumno Rezension", "Chrome Befehlsleiste Erweiterung Test"],
      title: "Bewertungen und Presse",
      navTitle: "Bewertungen & Presse",
    },
  },
};

export default content;
