Lumno wurde für Chromium-Browser entwickelt und ist zusätzlich als Firefox-Version erhältlich. Die folgende Übersicht zeigt, welche Funktionen in welchem Browser verfügbar sind.

## Unterstützte Browser {#support}

| Browser | Befehlsleiste | Neuer Tab | Installieren über |
| --- | --- | --- | --- |
| Google Chrome | Ja | Ja | Chrome Web Store |
| Microsoft Edge | Ja | Ja | Edge-Add-ons |
| Brave, [Arc](https://arc.net/), Vivaldi, Opera | Ja | Ja | Chrome Web Store |
| Dia | Ja | Noch nicht | Chrome Web Store |
| Firefox, [Zen](https://zen-browser.app/) und andere | Teilweise | Ja | Firefox-Add-ons |
| Safari | Nein | Nein | — |

Browser auf Smartphones und Tablets werden derzeit nicht unterstützt. Wenn du diese Seite auf einem Smartphone liest, das mit deinem Google-Konto angemeldet ist, kannst du Lumno schon jetzt installieren: Sobald du Chrome auf einem Computer öffnest, der mit demselben Konto angemeldet ist und synchronisiert, wird Lumno automatisch installiert.

## Dia {#dia}

Dia erlaubt Erweiterungen nicht, den neuen Tab zu ersetzen. Daher ist Lumnos neuer Tab dort nicht verfügbar. Die Befehlsleiste funktioniert normal.

Wenn du die Befehlsleiste mit `⌘ T` öffnen möchtest, gib `⌘ T` zuerst in Dia frei, denn Dias eigene Tastenkürzel haben Vorrang:

1. Öffne in Dia Settings → Shortcuts und ändere das Tastenkürzel für „New Tab“ von `⌘ T` auf eine andere Taste.
2. Öffne `dia://extensions/shortcuts` und lege „Open command bar“ von Lumno auf `⌘ T`.

![Dias Einstellungsseite Shortcuts, „New Tab“ liegt nicht mehr auf ⌘T](dia-newtab "Schritt 1: „New Tab“ in Dias Settings → Shortcuts auf eine andere Taste legen")

![Dias Seite für Erweiterungs-Tastenkürzel, Lumnos „Open command bar“ liegt auf ⌘T](dia-shortcuts "Schritt 2: „Open command bar“ unter dia://extensions/shortcuts auf ⌘T legen")

Wenn das Tastenkürzel nicht funktioniert, öffne die Seite für Erweiterungs-Tastenkürzel und ändere den Bereich neben Lumno von „In Dia“ zu „Global“.

## Firefox {#firefox}

Die Firefox-Version ist auf [Firefox-Add-ons](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/) verfügbar und läuft ab Firefox 140. Du kannst sie auch in Firefox-basierten Browsern wie Zen, LibreWolf und Floorp installieren.

Da sich die Erweiterungs-APIs von Firefox von denen in Chromium unterscheiden, sind einige Funktionen nicht verfügbar:

| Funktion | In Firefox |
| --- | --- |
| Automatisches Bild-im-Bild | Nicht verfügbar; Firefox erlaubt Erweiterungen nicht, Webvideos im Bild-im-Bild-Modus anzuzeigen |
| Web-Clip | Nicht verfügbar; Firefox unterstützt kein Dokument-Bild-im-Bild |
| Befehlsleiste auf `about:`-Seiten und der Add-ons-Website | Nicht verfügbar |
| `about:`-Seiten über Shortcuts oder die Befehlsleiste öffnen | Nicht verfügbar |
| Befehlsleiste auf lokalen `file://`-Seiten | Nicht verfügbar |
| Website-Symbole | Bei noch nicht besuchten Websites wird anfangs möglicherweise ein Platzhaltersymbol angezeigt |
| Liquid glass im neuen Tab | Nur die Glasoptik, ohne Lichtbrechung an den Rändern |

Da Firefox `⌘ ⇧ K` bereits selbst verwendet, nutzt die Firefox-Version standardmäßig `⌃ ⇧ K | Alt + K`. `⌥ Q` bleibt unverändert. Um die Tastenkürzel zu ändern, öffne `about:addons`, klicke oben rechts auf das Zahnrad und wähle „Tastenkombinationen von Erweiterungen verwalten“.

## Safari {#safari}

Das Erweiterungssystem von Safari unterscheidet sich stark von Chromium, daher gibt es noch keine Safari-Version von Lumno. Für eine ähnliche systemweite Suche auf dem Mac kannst du [Raycast](https://www.raycast.com/) oder [Alfred](https://www.alfredapp.com/) ausprobieren.

## Grafikbeschleunigung {#graphics-acceleration}

Ist die Grafikbeschleunigung aus, zeichnet der Browser Seiten mit dem Prozessor. Scrollen und Animationen ruckeln dann leicht, und Lumnos Hintergrundeffekte und Glasmaterialien werden langsamer. Merkt Lumno, dass der Browser nicht mit der Grafikkarte zeichnet, erscheint unter dem Suchfeld im neuen Tab und über der Befehlsleiste der Hinweis „Graphics acceleration is off“.

![Ein Hinweis unter dem Suchfeld im neuen Tab: Graphics acceleration is off, Turn it on for smoother pages; it takes a browser restart, rechts die Schaltfläche Turn on](graphics-notice "Der Hinweis zur Grafikbeschleunigung")

1. Klicke im Hinweis auf „Turn on“. Lumno öffnet die Systemeinstellungen des Browsers (`chrome://settings/system`, in Edge und Brave die entsprechende Seite).
2. Schalte „Grafikbeschleunigung verwenden, falls verfügbar“ ein.
3. Klicke auf „Neu starten“. Die Änderung gilt, sobald der Browser neu gestartet ist.

Möchtest du sie lieber nicht einschalten, klicke rechts im Hinweis auf die Schaltfläche zum Schließen; auf diesem Computer erscheint er dann nicht mehr. Siehst du den Hinweis nach dem Einschalten und Neustart weiterhin, hindern vielleicht ein Grafiktreiber, eine virtuelle Maschine oder ein Remotedesktop den Browser daran, die Grafikkarte zu nutzen; Details findest du unter `chrome://gpu`. Die Firefox-Version zeigt diesen Hinweis nicht.

## Sprachen der Benutzeroberfläche {#languages}

Seit Version 1.2.0 ist die Erweiterung in 10 Sprachen verfügbar: Deutsch, Englisch, vereinfachtes und traditionelles Chinesisch, Japanisch, Koreanisch, Spanisch, Französisch, Portugiesisch (Brasilien) und Russisch. Standardmäßig richtet sie sich nach der Sprache deines Browsers; du kannst die Sprache in den Einstellungen ändern.
