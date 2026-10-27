[Arc](https://arc.net/) wird am 22. Dezember 2026 eingestellt. Danach lässt sich Arc für Mac und Windows nicht mehr öffnen. Bevor du Arc verlässt, bring zuerst deine Daten in Sicherheit und such dir dann einen neuen Browser aus. Lumno orientiert sich an mehreren Bedienkonzepten von Arc, darunter die Befehlsleiste, der Wechsel zwischen den letzten Tabs, das Wiederherstellen angehefteter Tabs nach einem Neustart und automatisches Bild-im-Bild für Videos. In Chrome, Dia und Edge kannst du sie nach der Installation weiter nutzen.

Lumno ist ein unabhängiges Open-Source-Projekt und steht in keiner Verbindung zu Arc oder The Browser Company.

## Zeitplan der Einstellung von Arc {#timeline}

- **22. Oktober**: Arc hat die Einstellung angekündigt. Neue Arc-Konten lassen sich nicht mehr anlegen.
- **23. November**: Arc Search für iOS und Android verliert seine KI-Funktionen; Anmelden und Synchronisieren sind nicht mehr möglich. Als einfacher Browser funktioniert die App weiter.
- **15. Dezember**: Letzter Tag, um eine Kopie der persönlichen Daten deines Arc-Kontos oder deren Löschung anzufordern.
- **22. Dezember**: Arc für Mac und Windows funktioniert nicht mehr. Alle Konten werden deaktiviert, und die zugehörigen persönlichen Daten werden innerhalb von 30 Tagen gelöscht.

Danach kommst du auch an die Arc-Daten auf deinem Computer nicht mehr heran. Alle Details findest du in Arcs Artikel [Arc Sunset: Key Dates and What to Expect](https://resources.arc.net/hc/en-us/articles/44412972248471).

## Daten vor dem 22. Dezember exportieren {#export}

- **Wechsel zu Dia**: Ein Export ist nicht nötig. Installiere Dia und wähle den Import aus Arc. Spaces, angeheftete Tabs, Ordner, Lesezeichen, Verlauf, Passwörter und Erweiterungen werden übernommen, aus Spaces werden Profile in Dia. Lass Arc installiert, bis der Import abgeschlossen ist. Siehe [Move from Arc to Dia](https://resources.arc.net/hc/en-us/articles/44413129117591).
- **Wechsel zu einem anderen Browser**: Öffne in den Einstellungen von Arc den Bereich „Advanced“ und wähle „Export Data“. Arc speichert eine Datei namens `Arc Data Export.md`, die die Links aus deinen Favoriten, angehefteten Tabs und Ordnern nach Space auflistet. Es ist eine Linkliste und keine Lesezeichendatei; die Links, die du behalten willst, öffnest du im neuen Browser selbst oder legst sie als Lesezeichen an. Siehe [How Do I Export My Data from Arc?](https://resources.arc.net/hc/en-us/articles/25583851606039).

Easels und Boosts lassen sich nicht exportieren und werden auch nicht in Dia übernommen.

## Lumno in Arc genutzt? Nimm deine Einstellungen mit {#lumno-settings}

Lumno speichert seine Einstellungen in dem Browser, in dem es installiert ist. Sobald Arc nicht mehr läuft, lassen sie sich nicht wiederherstellen. [Exportiere deine Einstellungen](../sync/#export) in Lumno, bevor du wechselst, und importiere sie, nachdem du Lumno im neuen Browser installiert hast. Oder schalte die [WebDAV-Synchronisierung](../sync/) ein, die auch Symbole und Hintergründe mitnimmt.

Auch wenn Dia die Erweiterung mit übernimmt, exportiere zur Sicherheit vorher eine Kopie.

## Den nächsten Browser wählen {#choose}

| Browser | Was er mit Arc gemeinsam hat | Mit Lumno |
| --- | --- | --- |
| Dia | Vom selben Team, mit Seitenleiste, angehefteten Tabs und Tab-Umschalter; importiert direkt aus Arc | Befehlsleiste funktioniert, neuer Tab noch nicht verfügbar |
| Chrome, Edge | Keine Seitenleiste und keine Spaces, dafür die größte Auswahl an Erweiterungen | Alles funktioniert |
| [Zen Browser](https://zen-browser.app/) | Basiert auf Firefox, mit Seitenleiste, Arbeitsbereichen und geteilter Ansicht, Arc sehr ähnlich | Installation über Firefox-Add-ons, einige Funktionen eingeschränkt |
| [Vivaldi](https://vivaldi.com/) | Seitenleiste, Arbeitsbereiche und geteilte Ansicht | Alles funktioniert |

Details zu jedem Browser findest du unter [Browserkompatibilität](../browser-compatibility/).

## Arc und Lumno im Vergleich {#mapping}

| Arc | Lumno |
| --- | --- |
| `⌘ T` öffnet die Befehlsleiste | `⌘ ⇧ K` öffnet die Befehlsleiste; du kannst das Kürzel auf `⌘ T` ändern |
| Aus der Befehlsleiste zu einem offenen Tab wechseln | Ein Ergebnis mit „Opened“ auswählen und die Eingabetaste drücken |
| `⌃ Tab` wechselt zwischen den letzten Tabs | `⌥ Q` öffnet den Tab-Umschalter |
| `⌘ ⇧ C` kopiert die URL | Auf der Erweiterungsseite ein Tastenkürzel für „Copy Current Page URL“ festlegen |
| Angeheftete Tabs bleiben nach einem Neustart erhalten | In den Einstellungen von Lumno „Restore Pinned Tabs After Restart“ aktivieren |
| Videos wechseln beim Tabwechsel ins Bild-im-Bild | [Automatisches Bild-im-Bild](../auto-pip/), standardmäßig aktiviert |
| Neuer Tab | Lumnos neuer Tab (in Dia noch nicht verfügbar) |

## So wechselst du {#steps}

1. [Installiere Lumno](../install/): für Chrome und Dia über den Chrome Web Store, für Edge über die Edge-Add-ons.
2. Öffne `chrome://extensions/shortcuts` und lege „Open command bar“ auf `⌘ T`, wie in Arc und [Zen](https://zen-browser.app/). Weitere Informationen findest du unter [Tastenkürzel](../keyboard-shortcuts/#change). In Dia musst du `⌘ T` zuerst freigeben (siehe unten).
3. Drücke `⌘ T` und probiere aus, [Tabs, Lesezeichen und Verlauf zu durchsuchen](../search-tabs-bookmarks-history/).
4. Um zwischen den zuletzt verwendeten Seiten zu wechseln, drücke `⌥ Q` und öffne den [Tab-Umschalter](../tab-switcher/).

Dias eigene Tastenkürzel haben Vorrang. Öffne in Dia daher zuerst Settings → Shortcuts und ändere „New Tab“ von `⌘ T` auf eine andere Taste. Weitere Informationen findest du unter [Browserkompatibilität](../browser-compatibility/#dia). Wenn das Tastenkürzel in Dia nicht funktioniert, ändere auf der Erweiterungsseite den Bereich von „In Dia“ zu „Global“.

## Arc-Funktionen, die Lumno nicht bieten kann {#limits}

Seitenleiste, Spaces und geteilte Ansicht hängen vom Browser selbst ab und lassen sich nicht über eine Erweiterung hinzufügen. Wenn du darauf angewiesen bist, wähle Dia, Zen oder Vivaldi aus der Tabelle oben. Weitere Informationen findest du unter [Was Lumno nicht kann](../limitations/).
