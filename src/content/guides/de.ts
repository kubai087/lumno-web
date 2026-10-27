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
        "Lumno ist eine kostenlose Open-Source-Browsererweiterung. Drücke auf jeder Seite ⌘⇧K, um Tabs, Lesezeichen und Verlauf zu durchsuchen, direkt auf Websites zu suchen oder eine KI zu fragen. Dazu kommt ein übersichtlicher, anpassbarer neuer Tab. Funktioniert in Chrome, Edge, Dia und anderen Chromium-Browsern sowie in Firefox.",
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
        "Lumno ist eine Erweiterung, kein Browser: keine Befehlsleiste auf chrome://-Seiten, kein Safari und kein neuer Tab in Dia. Hier erfährst du, was Lumno nicht kann und welche Alternativen es gibt.",
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
    faq: {
      pageTitle: "Häufige Fragen zu Lumno: Tastenkürzel, eingeschränkte Seiten, neuer Tab und Synchronisierung | Lumno-Hilfe",
      pageDescription:
        "Antworten auf häufige Fragen zu Lumno: das voreingestellte Tastenkürzel und wie du es änderst, was zu tun ist, wenn es nicht funktioniert, die Verwendung mit einer anderen Erweiterung für den neuen Tab, unterstützte Browser, Synchronisierung und der Umgang mit Browserdaten.",
      keywords: ["Lumno FAQ", "Lumno häufige Fragen", "Chrome-Erweiterung Tastenkürzel funktioniert nicht", "Neuer-Tab-Erweiterung Konflikt", "Lumno kostenlos"],
      title: "Häufige Fragen",
      navTitle: "Häufige Fragen",
    },
    install: {
      pageTitle: "Lumno aus dem Chrome Web Store, von Edge-Add-ons oder Firefox-Add-ons installieren | Lumno-Hilfe",
      pageDescription:
        "Installiere Lumno aus dem Chrome Web Store in Chrome, Dia, Brave oder Arc, über Microsoft Edge-Add-ons in Edge oder über Firefox-Add-ons in Firefox und Zen. Danach öffnet sich eine Willkommensseite und ⌘⇧K ist sofort einsatzbereit.",
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
        "Lumno öffnet sich mit ⌘⇧K (unter Windows Strg+Umschalt+K), der Tab-Umschalter mit ⌥Q (Alt+Q). Ändern kannst du beides unter chrome://extensions/shortcuts, sogar auf ⌘T. Dazu alle Tasten in Befehlsleiste, neuem Tab, Umschalter und Web-Clip sowie die passenden Klicks, etwa zum Öffnen im Hintergrund.",
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
        "Lumnos Einstellungen werden über die Synchronisierung deines Browsers abgeglichen. Mit der WebDAV-Synchronisierung werden auch eigene Shortcut-Symbole, Hintergründe und Zitate synchronisiert, über Nextcloud, ein NAS oder einen anderen WebDAV-Server, den du selbst betreibst.",
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
        "Drücke auf jeder Seite ⌘⇧K (unter Windows Strg+Umschalt+K), um offene Tabs, Lesezeichen, Verlauf und meistbesuchte Seiten in einem Suchfeld zu durchsuchen, oder durchsuche nur deine offenen Tabs.",
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
        "Lumno enthält 47 integrierte Suchkürzel. Gib gh, yt oder sf ein und drücke Tab, um GitHub, YouTube oder Stack Overflow direkt zu durchsuchen, oder sende eine Frage direkt an ChatGPT, Gemini oder Perplexity.",
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
        "Drücke ⌥Q (unter Windows Alt+Q), um Lumnos Tab-Umschalter zu öffnen. Er zeigt deine Tabs in der Reihenfolge ihrer Nutzung, jeweils mit Vorschau. Halte ⌥ gedrückt, drücke wiederholt Q und lass ⌥ los, um zu wechseln. Tabs lassen sich auch direkt im Umschalter schließen.",
      keywords: ["Chrome Tab-Umschalter", "zuletzt genutzte Tabs", "Alt Tab für den Browser", "Arc Ctrl Tab"],
      title: "Zwischen den letzten Tabs wechseln",
      navTitle: "Zwischen Tabs wechseln",
    },
    "newtab-wallpaper": {
      pageTitle: "Hintergründe für den neuen Tab: Gemälde, Bing-Bild des Tages, eigene Fotos und Filter | Lumno-Hilfe",
      pageDescription:
        "Ändere den Hintergrund von Lumnos neuem Tab in den Appearance-Einstellungen: eingebaute Gemälde, Bings Bild des Tages, kuratierte Fotos, eigene Bilder oder ein Bildlink, mit Abdunkelung, Filtern, getrennter Auswahl für den hellen und dunklen Modus und einer Glasoptik (Acrylic oder Liquid glass).",
      keywords: ["Neuer-Tab-Hintergrund", "Chrome neuer Tab Hintergrund", "Bing Bild des Tages", "Neuer-Tab-Erweiterung"],
      title: "Hintergrund ändern",
      navTitle: "Hintergrund ändern",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "Shortcuts und Lesezeichen im neuen Tab: Websites hinzufügen und gruppieren, drei Layouts | Lumno-Hilfe",
      pageDescription:
        "Lege deine Lieblingsseiten als Shortcuts auf Lumnos neuen Tab, wähle ihre Symbole aus, teile sie in Gruppen ein, stapel sie in Ordnern und zeige deine Lesezeichen als Ordner, verschachtelte Liste oder Leiste oben an – in beliebig vielen Reihen oder gar nicht.",
      keywords: ["neuer Tab Shortcuts", "Shortcut-Gruppen", "neuer Tab Lesezeichen", "Chrome Lesezeichenleiste", "Lesezeichenordner", "Lesezeichen im neuen Tab ausblenden"],
      title: "Shortcuts und Lesezeichen",
      navTitle: "Shortcuts & Lesezeichen",
    },
    "newtab-frequent-sites": {
      pageTitle: "Häufig besuchte Seiten und Fortschrittskarten: Seiten anheften, bei Serien dranbleiben | Lumno-Hilfe",
      pageDescription:
        "Lumnos neuer Tab zeigt deine meistbesuchten oder zuletzt besuchten Seiten. Du kannst bis zu drei davon anheften. Bei einer Serie oder einem Fortsetzungsroman wird die Karte automatisch auf die nächste Folge oder das nächste Kapitel aktualisiert. Die Karten lassen sich in einer oder zwei Reihen anzeigen oder ganz ausblenden.",
      keywords: ["neuer Tab meistbesucht", "Serienfortschritt merken", "Webnovel Fortschritt", "Seiten anheften", "Karten im neuen Tab ausblenden"],
      title: "Häufig besuchte Seiten und Fortschrittskarten",
      navTitle: "Häufige Seiten & Fortschritt",
    },
    "newtab-clock-zen": {
      pageTitle: "Uhr, tägliches Zitat und Zen-Modus: ein neuer Tab nur mit dem Suchfeld | Lumno-Hilfe",
      pageDescription: "Zeige in Lumnos neuem Tab eine Uhr und ein tägliches Zitat aus deiner eigenen TXT- oder Markdown-Datei an, oder gib /zen ein, damit nur noch das Suchfeld sichtbar ist.",
      keywords: ["neuer Tab Uhr", "neuer Tab Zitat", "minimalistischer neuer Tab", "Zen-Modus", "neuer Tab fokussiert"],
      title: "Uhr, Zitate und Zen-Modus",
      navTitle: "Uhr, Zitate & Zen-Modus",
    },
    "newtab-other-extensions": {
      pageTitle: "Mit einer anderen Erweiterung für den neuen Tab verwenden: nur Lumnos Befehlsleiste nutzen | Lumno-Hilfe",
      pageDescription:
        "Behalte Momentum, Tabliss oder eine andere Erweiterung für den neuen Tab und nutze nur Lumnos Befehlsleiste: Aktiviere die andere Erweiterung nach Lumno, damit sie den neuen Tab übernimmt. Wenn der Browser fragt, behalte die Änderung bei; rückgängig machen deaktiviert die gesamte Erweiterung.",
      keywords: ["Neuer-Tab-Erweiterung Konflikt", "Chrome neuer Tab von Erweiterung geändert", "nur Lumno Befehlsleiste", "Momentum", "Tabliss"],
      title: "Mit einer anderen Erweiterung für den neuen Tab verwenden",
      navTitle: "Mit anderer Neuer-Tab-Erweiterung",
    },
    "selection-actions": {
      pageTitle: "Schnellaktionen für markierten Text: Text von einer KI erklären, übersetzen oder zusammenfassen lassen | Lumno-Hilfe",
      pageDescription:
        "Markiere Text auf einer Webseite, und Lumno schlägt KI-Aktionen wie Answer, Translate, Explain, Summarize, Research oder Calculate vor. Lumno prüft zuerst auf deinem Gerät, ob der Text Hilfe braucht, und erscheint deshalb nicht bei jeder Markierung.",
      keywords: ["Text markieren KI", "markierten Text übersetzen", "markierten Text erklären", "Chrome Erweiterung Markierung KI", "Text zusammenfassen"],
      title: "Schnellaktionen für markierten Text",
      navTitle: "Schnellaktionen für markierten Text",
    },
    "auto-pip": {
      pageTitle: "Automatisches Bild-im-Bild: Videos laufen beim Tabwechsel in einem kleinen Fenster weiter | Lumno-Hilfe",
      pageDescription:
        "Wenn du während eines Videos den Tab wechselst, läuft es automatisch im Bild-im-Bild-Fenster weiter und kehrt bei der Rückkehr auf die Seite zurück. Wann die Funktion startet, wo nicht und wie du sie deaktivierst.",
      keywords: ["automatisches Bild-im-Bild", "Chrome Bild-im-Bild Erweiterung", "Video Tabwechsel kleines Fenster", "Arc Bild-im-Bild", "schwebendes Videofenster"],
      title: "Automatisches Bild-im-Bild",
      navTitle: "Automatisches Bild-im-Bild",
    },
    "link-preview": {
      pageTitle: "Link-Vorschau: Links mit Umschalt-Klick in einem kleinen Fenster öffnen | Lumno-Hilfe",
      pageDescription:
        "Klicke mit gedrückter Umschalttaste auf einen Link, um ihn in einem kleinen Fenster über der Seite zu öffnen. Schließe es, um dort weiterzulesen, wo du warst, oder verschiebe es in einen neuen Tab. So funktioniert es, das bedeuten die Schaltflächen, diese Seiten lassen sich nicht anzeigen – und so schaltest du es aus.",
      keywords: ["Link-Vorschau", "Link ansehen ohne neuen Tab", "Umschalt-Klick Link", "Link-Vorschau Chrome-Erweiterung", "Arc Peek Alternative"],
      title: "Link-Vorschau",
      navTitle: "Link-Vorschau",
    },
    "web-clip": {
      pageTitle: "Web-Clip: Einen Seitenbereich in einem schwebenden Fenster behalten | Lumno-Hilfe",
      pageDescription:
        "Mit Web-Clip legst du eine Tabelle, einen Codeblock oder ein Diagramm in ein schwebendes Fenster, das beim Tabwechsel sichtbar bleibt. So aktivierst du die Funktion, wählst Inhalte aus und nutzt das Fenster – und das sind die Einschränkungen.",
      keywords: ["Web-Clip", "Document Picture-in-Picture", "schwebendes Fenster Chrome-Erweiterung", "Teil einer Webseite anheften", "Bild im Bild Element"],
      title: "Web-Clip",
      navTitle: "Web-Clip",
    },
    "arc-command-bar": {
      pageTitle: "Arc wird eingestellt: so wechselst du zu Dia, Chrome oder Edge | Lumno-Hilfe",
      pageDescription:
        "Arc wird am 22. Dezember 2026 eingestellt. Hier findest du den Zeitplan, wie du deine Daten vor dem Wechsel zu Dia oder einem anderen Browser exportierst und wie Lumno dir in Chrome, Dia und Edge eine Befehlsleiste im Stil von Arc gibt. Mit Übersicht der Arc-Tastenkürzel.",
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
        "Lumno läuft vollständig in Chrome, Edge, Brave, Arc, Vivaldi und anderen Chromium-Browsern. In Dia gibt es keinen Lumno-Tab, die Firefox-Version gibt es mit ein paar Einschränkungen auf Firefox-Add-ons, Safari und mobile Browser werden nicht unterstützt.",
      keywords: ["Lumno Kompatibilität", "Dia Erweiterung", "Edge Erweiterung", "Firefox-Version", "Chromium-Erweiterung"],
      title: "Browserkompatibilität",
      navTitle: "Browserkompatibilität",
    },
    "security-open-source": {
      pageTitle: "Sicherheit und Open Source: GPL-3.0-Code, Berechtigungen, Manifest V3 | Lumno-Hilfe",
      pageDescription:
        "Lumno ist Open Source unter GPL-3.0 auf GitHub, gebaut mit Manifest V3 und ohne nachgeladenen Code. Lumno fordert nur die Browserberechtigungen an, die es braucht.",
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
