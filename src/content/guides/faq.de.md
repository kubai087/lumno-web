Hier findest du Antworten auf die Fragen, die auf unserer Website und in der Community am häufigsten gestellt werden. Jede Antwort verweist auf eine Seite mit weiteren Informationen.

## Verwendung {#using}

### Welches Tastenkürzel ist voreingestellt, und kann ich es ändern?

Voreingestellt ist `⌘ ⇧ K | ⌘ ⇧ K` auf dem Mac und `Strg + Umschalt + K` unter Windows und Linux. Du kannst das Tastenkürzel unter `chrome://extensions/shortcuts` ändern. Weitere Informationen findest du unter [Tastenkürzel](../keyboard-shortcuts/#change). In der Firefox-Version ist ein anderes Tastenkürzel voreingestellt, siehe [Browserkompatibilität](../browser-compatibility/#firefox).

### Was kann ich tun, wenn das Tastenkürzel nicht funktioniert?

Prüfe zuerst, ob du dich auf einer eingeschränkten Seite befindest, etwa in den `chrome://`-Einstellungen oder einem Erweiterungs-Store. Prüfe dann unter `chrome://extensions/shortcuts`, ob eine andere Erweiterung dasselbe Tastenkürzel verwendet. In Dia musst du außerdem den Bereich neben dem Tastenkürzel auf „Global“ stellen.

### Warum öffnet sich auf manchen Seiten ein neuer Tab statt der Befehlsleiste?

Aus Sicherheitsgründen erlauben Browser keiner Erweiterung, auf eingeschränkten Seiten wie den `chrome://`-Einstellungen, der Erweiterungsseite, dem Chrome Web Store oder der Website der Edge-Add-ons zu laufen oder eine Oberfläche anzuzeigen, und auch Lumno kann das nicht umgehen. Drückst du dort das Tastenkürzel, öffnet Lumno stattdessen einen neuen Tab mit dem Suchfeld. Das ist kein Fehler: Auf normalen Webseiten erscheint die Befehlsleiste weiterhin direkt auf der Seite. Eine Seite wie `chrome://inspect/#devices` über einen Shortcut zu öffnen, ist davon nicht betroffen. Um Lumno in lokalen PDF- oder HTML-Dateien zu verwenden, aktiviere auf der Detailseite der Erweiterung „Zugriff auf Datei-URLs zulassen“. Mehr dazu unter [Was Lumno nicht kann](../limitations/#restricted-pages).

### Warum entspricht der helle oder dunkle Modus der Befehlsleiste nicht meinem System?

Im Modus „Follow system“ berücksichtigt die Befehlsleiste zusätzlich die Farben der aktuellen Seite. Wenn sie sich nur nach deinem System richten soll, deaktiviere in den Einstellungen von Lumno unter „Appearance“ die Option „Adapt theme colors to each webpage“.

### Kann ich nach dem Wechsel von Arc eine vertraute Befehlsleiste verwenden?

Ja. Lumnos Bedienung orientiert sich an [Arc](https://arc.net/) (Lumno steht in keiner Verbindung zu Arc), und du kannst die Befehlsleiste in Dia, Chrome und Edge jederzeit öffnen. Wenn du das Tastenkürzel auf `⌘ T` legst, behältst du deine Arc-Gewohnheiten bei. In Dia musst du `⌘ T` zuerst freigeben, siehe [Browserkompatibilität](../browser-compatibility/#dia). Weitere Informationen findest du unter [Umstieg von Arc](../arc-command-bar/).

### Kann ich wie in Arc mit Ctrl+Tab zwischen Tabs wechseln?

Ja. Die Tastenkürzel-Seite des Browsers nimmt `⌃ Tab` nicht an, aber du kannst in der Konsole dieser Seite ein kurzes Stück Code ausführen und die Kombination so als Tastenkürzel für Lumnos Tab-Umschalter festlegen. Siehe [Den Tab-Umschalter mit Ctrl+Tab öffnen](../tab-switcher/#ctrl-tab).

## Neuer Tab {#new-tab}

### Kann ich nur die Befehlsleiste verwenden und eine andere Erweiterung für den neuen Tab behalten?

Ja. Lass Lumno aktiviert und installiere deine andere Erweiterung für den neuen Tab erneut oder deaktiviere und aktiviere sie wieder, damit sie den neuen Tab übernimmt. Die Befehlsleiste ist davon nicht betroffen. Eine Anleitung findest du unter [Mit einer anderen Erweiterung für den neuen Tab verwenden](../newtab-other-extensions/).

### Warum zeigt die Adressleiste im neuen Tab eine Erweiterungs-URL?

Das liegt an der Option „Automatically focus input“: Damit der Cursor direkt in Lumnos Suchfeld steht, zeigt die Adressleiste die URL der Erweiterung an. Wenn du diese Option in den Appearance-Einstellungen des neuen Tabs deaktivierst, bleibt die Adressleiste leer.

## Kompatibilität {#compatibility}

### Welche Browser werden unterstützt?

Lumno unterstützt Chromium-Browser wie Chrome, Edge, Dia, Brave und Vivaldi sowie Firefox ab Version 140 und Firefox-basierte Browser wie Zen. Safari wird derzeit nicht unterstützt. In Dia funktioniert die Befehlsleiste, Lumnos neuer Tab ist dort jedoch noch nicht verfügbar. Weitere Informationen findest du unter [Browserkompatibilität](../browser-compatibility/).

### Was unterscheidet die Firefox-Version von der Chrome-Version?

Die wichtigsten Funktionen sind gleich, nur Firefox setzt ein paar Grenzen: Web-Clip und automatisches Bild-im-Bild sind nicht verfügbar, auf `about:`-Seiten, der Add-ons-Website und lokalen Dateien lässt sich die Befehlsleiste nicht öffnen, und das voreingestellte Tastenkürzel ist `⌃ ⇧ K | Alt + K`. Weitere Informationen findest du unter [Browserkompatibilität](../browser-compatibility/#firefox).

### Funktioniert Lumno in Zen, LibreWolf und anderen Firefox-basierten Browsern?

Ja. Diese Browser nutzen die Firefox-Version, die du über [Firefox-Add-ons](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/) installierst. Der Browser muss auf Firefox 140 oder neuer basieren.

### Funktioniert Lumno in Safari oder auf dem Smartphone?

Noch nicht. Das Erweiterungssystem von Safari unterscheidet sich stark von Chromium, daher gibt es keine Safari-Version von Lumno. Browser auf Smartphones und Tablets werden ebenfalls nicht unterstützt. Wenn du diese Seite auf einem Smartphone liest, das mit deinem Google-Konto angemeldet ist, kannst du Lumno schon jetzt installieren: Sobald du Chrome auf einem Computer öffnest, der mit demselben Konto angemeldet ist und synchronisiert, wird Lumno automatisch installiert. Weitere Informationen findest du unter [Browserkompatibilität](../browser-compatibility/#safari).

## Daten und Synchronisierung {#data}

### Kann ich meine Einstellungen zwischen Geräten synchronisieren?

Ja. Die Einstellungen werden standardmäßig über dein Browserkonto synchronisiert. Wenn du die WebDAV-Synchronisierung aktivierst (mit Nextcloud, Nutstore oder einem eigenen Server), werden auch Symbole und Hintergründe synchronisiert, sogar zwischen verschiedenen Browsern. Weitere Informationen findest du unter [Synchronisierung](../sync/).

### Lädt Lumno meine Browserdaten hoch?

Nein. Tabs, Lesezeichen und Verlauf werden auf deinem Gerät durchsucht. Deine Eingaben werden nur gesendet, wenn du im Web suchst oder eine KI fragst, und nur an die Suchmaschine oder KI-Website, die du ausgewählt hast. Weitere Informationen findest du in der [Datenschutzerklärung](/de/privacy/).

### Ist Lumno kostenlos? Brauche ich ein Konto?

Lumno ist vollständig kostenlos und als Open Source unter der GPL-3.0 auf [GitHub](https://github.com/kubai087/lumno-extension) verfügbar. Es gibt kein Kontosystem, daher kannst du Lumno direkt nach der Installation ohne Registrierung verwenden.
