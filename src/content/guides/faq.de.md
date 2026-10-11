Hier findest du Antworten auf die Fragen, die auf unserer Website und in der Community am häufigsten gestellt werden. Jede Antwort verweist auf eine Seite mit weiteren Informationen.

## Verwendung {#using}

### Welches Tastenkürzel ist voreingestellt, und kann ich es ändern?

Voreingestellt ist `⌘ ⇧ K | ⌘ ⇧ K` auf dem Mac und `Strg + Umschalt + K` unter Windows und Linux. Du kannst das Tastenkürzel unter `chrome://extensions/shortcuts` ändern. Weitere Informationen findest du unter [Tastenkürzel](../keyboard-shortcuts/#change).

### Was kann ich tun, wenn das Tastenkürzel nicht funktioniert?

Prüfe zuerst, ob du dich auf einer eingeschränkten Seite befindest, etwa in den `chrome://`-Einstellungen oder einem Erweiterungs-Store. Prüfe dann unter `chrome://extensions/shortcuts`, ob eine andere Erweiterung dasselbe Tastenkürzel verwendet. In Dia musst du außerdem den Bereich neben dem Tastenkürzel auf „Global“ stellen.

### Warum öffnet sich die Befehlsleiste auf manchen Seiten nicht?

Browser erlauben Erweiterungen nicht, auf eingeschränkten Seiten wie den `chrome://`-Einstellungen oder Erweiterungs-Stores zu laufen. Wenn du auf einer solchen Seite das Tastenkürzel drückst, richtet sich Lumno nach der Option „Restricted page behavior“ in den Einstellungen und öffnet die Suche standardmäßig in einem neuen Tab. Um Lumno in lokalen PDF- oder HTML-Dateien zu verwenden, aktiviere auf der Detailseite der Erweiterung „Zugriff auf Datei-URLs zulassen“. Weitere Informationen findest du unter [Was Lumno nicht kann](../limitations/#restricted-pages).

### Warum entspricht der helle oder dunkle Modus der Befehlsleiste nicht meinem System?

Im Modus „Follow system“ berücksichtigt die Befehlsleiste zusätzlich die Farben der aktuellen Seite. Wenn sie sich nur nach deinem System richten soll, deaktiviere in den Einstellungen von Lumno unter „Appearance“ die Option „Adapt theme colors to each webpage“.

### Kann ich nach dem Wechsel von Arc eine vertraute Befehlsleiste verwenden?

Ja. Lumnos Bedienung orientiert sich an [Arc](https://arc.net/) (Lumno steht in keiner Verbindung zu Arc), und du kannst die Befehlsleiste in Dia, Chrome und Edge jederzeit öffnen. Wenn du das Tastenkürzel auf `⌘ T` legst, behältst du deine Arc-Gewohnheiten bei. Weitere Informationen findest du unter [Umstieg von Arc](../arc-command-bar/).

## Neuer Tab {#new-tab}

### Kann ich nur die Befehlsleiste verwenden und eine andere Erweiterung für den neuen Tab behalten?

Ja. Lass Lumno aktiviert und installiere deine andere Erweiterung für den neuen Tab erneut oder deaktiviere und aktiviere sie wieder, damit sie den neuen Tab übernimmt. Die Befehlsleiste ist davon nicht betroffen. Eine Anleitung findest du unter [Mit einer anderen Erweiterung für den neuen Tab verwenden](../newtab-other-extensions/).

### Warum zeigt die Adressleiste im neuen Tab eine Erweiterungs-URL?

Das liegt an der Option „Automatically focus input“: Damit der Cursor direkt in Lumnos Suchfeld steht, zeigt die Adressleiste die URL der Erweiterung an. Wenn du diese Option in den Appearance-Einstellungen des neuen Tabs deaktivierst, bleibt die Adressleiste leer.

## Kompatibilität {#compatibility}

### Welche Browser werden unterstützt?

Lumno unterstützt Chromium-Browser wie Chrome, Edge, Dia, Brave und Vivaldi. Safari wird derzeit nicht unterstützt. In Dia funktioniert die Befehlsleiste, Lumnos neuer Tab ist dort jedoch noch nicht verfügbar. Weitere Informationen findest du unter [Browserkompatibilität](../browser-compatibility/).

## Daten und Synchronisierung {#data}

### Kann ich meine Einstellungen zwischen Geräten synchronisieren?

Ja. Die Einstellungen werden standardmäßig über dein Browserkonto synchronisiert. Wenn du die WebDAV-Synchronisierung aktivierst (mit Nextcloud, Nutstore oder einem eigenen Server), werden auch Symbole und Hintergründe synchronisiert, sogar zwischen verschiedenen Browsern. Weitere Informationen findest du unter [Synchronisierung](../sync/).

### Lädt Lumno meine Browserdaten hoch?

Nein. Tabs, Lesezeichen und Verlauf werden auf deinem Gerät durchsucht. Deine Eingaben werden nur gesendet, wenn du im Web suchst oder eine KI fragst, und nur an die Suchmaschine oder KI-Website, die du ausgewählt hast. Weitere Informationen findest du in der [Datenschutzerklärung](/de/privacy/).

### Ist Lumno kostenlos? Brauche ich ein Konto?

Lumno ist vollständig kostenlos und als Open Source unter der GPL-3.0 auf [GitHub](https://github.com/kubai087/lumno-extension) verfügbar. Es gibt kein Kontosystem, daher kannst du Lumno direkt nach der Installation ohne Registrierung verwenden.
