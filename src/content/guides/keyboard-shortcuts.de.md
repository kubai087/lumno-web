Die meisten Funktionen von Lumno kannst du mit der Tastatur bedienen. Hier findest du die Standardkürzel, die Anleitung zum Ändern sowie die Tasten für die Befehlsleiste, den neuen Tab, den Tab-Umschalter und Web-Clip. Wo ein Klick dasselbe bewirkt, steht er direkt neben der Taste.

## Standardkürzel {#defaults}

| Aktion | Tastenkürzel |
| --- | --- |
| Befehlsleiste öffnen | `⌘ ⇧ K` |
| Tab-Umschalter öffnen | `⌥ Q` |
| Befehlsleiste mit der URL der aktuellen Seite öffnen | Nicht voreingestellt |
| URL der aktuellen Seite kopieren | Nicht voreingestellt |

Die letzten beiden Aktionen werden nach der Installation möglicherweise als „Nicht festgelegt“ angezeigt. Wie du ihnen ein Tastenkürzel zuweist, ist unten beschrieben. Die Firefox-Version öffnet die Befehlsleiste mit einem anderen Standardkürzel, siehe [Browserkompatibilität](../browser-compatibility/#firefox).

## Ein Tastenkürzel ändern {#change}

Browser verwalten die Tastenkürzel von Erweiterungen auf einer eigenen Seite:

1. Gib `chrome://extensions/shortcuts` in die Adressleiste ein (in Edge `edge://extensions/shortcuts`).
2. Suche Lumno und klicke neben der Aktion, die du ändern möchtest, auf das Stiftsymbol.
3. Drücke die neue Tastenkombination.

![Die Seite für Erweiterungs-Tastenkürzel im Browser: Lumnos „Open command bar“ steht auf ⇧⌘K, „Open recent tab switcher“ auf ⌥Q](shortcuts "Tastenkürzel auf der Erweiterungsseite ändern")

Wenn du an [Arc](https://arc.net/) oder [Zen](https://zen-browser.app/) gewöhnt bist, kannst du „Open command bar“ auf `⌘ T` legen.

Die Tastenkürzel-Seite nimmt `⌃ Tab` nicht an. Wie du den Tab-Umschalter trotzdem damit öffnest, steht unter [Den Tab-Umschalter mit Ctrl+Tab öffnen](../tab-switcher/#ctrl-tab).

Dias eigene Tastenkürzel haben Vorrang vor denen von Erweiterungen. Wenn du `⌘ T` in Dia nutzen möchtest, ändere zuerst in Dia unter Settings → Shortcuts „New Tab“ auf eine andere Taste. Weitere Informationen findest du unter [Browserkompatibilität](../browser-compatibility/#dia).

Wenn das Tastenkürzel in Dia nicht funktioniert, ändere den Bereich daneben von „In Dia“ zu „Global“.

## Tasten in der Befehlsleiste {#command-bar-keys}

### Ergebnis auswählen

| Taste | Funktion |
| --- | --- |
| `↑` `↓` | Auswahl nach oben oder unten verschieben |
| `⌘` gedrückt halten, loslassen und dann `0`–`9` drücken | Neben den Ergebnissen erscheinen Nummern; mit der Zahl öffnest du das passende Ergebnis |

Wenn du in den Einstellungen unter „Labs“ die Option „Single-press Command to show number jump“ aktivierst, erscheinen die Nummern schon nach einem kurzen Druck auf `⌘`. Du öffnest ein Ergebnis dann, indem du `⌘` gedrückt hältst und die Zahl drückst. `⌘` öffnet Ergebnisse dann nicht mehr im Hintergrund; ein Klick mit der mittleren Maustaste funktioniert weiterhin.

Unter macOS kannst du außerdem unter „Labs“ die Option „Mac keyboard navigation“ aktivieren und mit `⌃ N | ⌃ N` und `⌃ P | ⌃ P` das nächste und das vorherige Ergebnis auswählen.

### Ergebnis öffnen

| Taste oder Klick | Funktion |
| --- | --- |
| `↩` oder Klick auf ein Ergebnis | Ergebnis öffnen oder zu einem offenen Tab wechseln |
| `⌥ ↩` oder Klick mit gedrückter `⌥`-Taste | Im aktuellen Tab statt in einem neuen Tab öffnen – oder in einem neuen Tab, wenn Ergebnisse [im aktuellen Tab öffnen](../search-tabs-bookmarks-history/#current-tab) |
| `⇧ ↩` oder Klick mit gedrückter `⇧`-Taste | Wenn das Ergebnis ein offener Tab ist, ihn zusätzlich in einem neuen Tab öffnen |
| `⌘ ↩`, Klick mit gedrückter `⌘`-Taste oder Klick mit der mittleren Maustaste | Im Hintergrund öffnen; die Befehlsleiste bleibt offen, sodass du gleich das nächste Ergebnis öffnen kannst |

Solange du `⌥`, `⇧` oder `⌘` gedrückt hältst, passt sich der Hinweis rechts neben jedem Ergebnis entsprechend an.

### Eingabe und Suchmodi

| Taste | Funktion |
| --- | --- |
| `Tab` | Vorschlag vervollständigen; nach einem Seitenkürzel die Seitensuche starten; bei leerem Suchfeld nur offene Tabs durchsuchen; nach Auswahl einer Seite mit den Pfeiltasten ihre Adresse zum Bearbeiten ins Suchfeld übernehmen |
| `Tab` `Tab` | Bei leerem Suchfeld das Suchbereich-Panel öffnen; ist bereits ein Suchbereich ausgewählt, genügt ein Druck |
| `⌥ ↑` `⌥ ↓` | Zur vorherigen oder nächsten Eingabe wechseln |
| `⌘ Z` `⌘ ⇧ Z` | Bei geöffnetem Suchbereich-Panel eine Änderung an der Reihenfolge der Suchquellen rückgängig machen oder wiederherstellen |
| `⌫` | Bei leerem Suchfeld die Seitensuche, den Suchbereich oder die Suche in offenen Tabs beenden |
| `Esc` | Seitensuche, Suchbereich oder Suche in offenen Tabs beenden |
| `Esc` oder Klick außerhalb der Befehlsleiste | Befehlsleiste schließen |

## Tasten im neuen Tab {#newtab-keys}

Im Suchfeld des neuen Tabs gelten dieselben Tasten wie in der Befehlsleiste. Außerdem:

| Taste oder Klick | Funktion |
| --- | --- |
| Einfach lostippen | Der Text landet direkt im Suchfeld, ohne dass du es vorher anklicken musst |
| Klick auf ein Suchergebnis, einen Shortcut, ein Lesezeichen oder eine Website-Karte | Standardmäßig im aktuellen Tab öffnen, in einem neuen Tab, wenn du es unter General → New Tab Settings → Open in a new tab when clicked ankreuzt |
| Klick mit gedrückter `⌥`-Taste oder `⌥ ↩` | Auf die andere Art öffnen: in einem neuen Tab, was sich sonst im aktuellen öffnet, und im aktuellen Tab, was sich sonst in einem neuen öffnet |
| Klick mit gedrückter `⌘`-Taste oder mit der mittleren Maustaste | Im Hintergrund öffnen |
| `⌥ ←` `⌥ →` | Einen mit `Tab` ausgewählten Shortcut um eine Position nach vorne oder hinten verschieben |
| `⌘ Z` | Die letzte Änderung an Shortcuts oder Lesezeichen rückgängig machen, etwa Entfernen, Verschieben, das Anlegen eines Ordners oder das Löschen einer Gruppe |
| `⌘ ⇧ Z` | Das gerade Rückgängiggemachte wiederherstellen |
| `Esc` | Ziehen eines Shortcuts oder Lesezeichens abbrechen |

## Tasten im Tab-Umschalter {#switcher-keys}

| Taste oder Klick | Funktion |
| --- | --- |
| `⌥` gedrückt halten und wiederholt `Q` drücken | Durch die letzten Tabs blättern |
| `Tab`, `→` oder `↓` | Nächsten Tab auswählen |
| `⇧ Tab`, `←` oder `↑` | Vorherigen Tab auswählen |
| `⌥` loslassen, `↩` drücken oder auf einen Tab klicken | Zum ausgewählten Tab wechseln |
| Klick auf die Schließen-Schaltfläche in der Ecke einer Seitenvorschau | Diesen Tab schließen; der Umschalter bleibt offen |
| `Esc` oder Klick außerhalb des Umschalters | Umschalter schließen und im aktuellen Tab bleiben |

Wenn du das Tastenkürzel des Umschalters geändert hast, hältst du stattdessen die Sondertaste aus deinem eigenen Kürzel gedrückt.

## Tasten bei Web-Clip {#web-clip-keys}

Während du den Inhalt auswählst:

| Taste oder Aktion | Funktion |
| --- | --- |
| `[` oder `↑` | Äußeres Element auswählen |
| `]` oder `↓` | Inneres Element auswählen |
| Mausrad drehen | Zwischen äußeren und inneren Elementen wechseln |
| `↩` oder Klick auf den markierten Inhalt | In einem schwebenden Fenster öffnen |
| `Esc` | Auswahl abbrechen |

Ein Klick auf einen Link im schwebenden Fenster öffnet ihn in einem neuen Tab; mit gedrückter `⌘`-Taste öffnet er sich im Hintergrund. Mehr dazu unter [Web-Clip](../web-clip/).
