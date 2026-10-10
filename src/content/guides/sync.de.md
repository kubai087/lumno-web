Wenn du mehrere Computer oder Browser verwendest, können deine Shortcuts, Hintergründe und Einstellungen mitkommen. Lumno hat keine eigenen Server und nutzt für die Synchronisierung deshalb zwei Wege, die du bereits hast: die Synchronisierung deines Browsers und deinen eigenen WebDAV-Server.

## Browser-Synchronisierung: keine Einrichtung nötig {#browser-sync}

Wenn du in deinem Browser angemeldet bist und die Synchronisierung aktiviert ist, werden Lumnos Einstellungen automatisch synchronisiert. Dazu gehören Design, Suchmaschinen, Shortcuts, angeheftete Websitekarten, die Sperrliste sowie deine Hintergrundauswahl und Bildlinks.

Hochgeladene Symbole und lokale Hintergründe sind für die Browser-Synchronisierung zu groß. Um auch diese zu synchronisieren, verwende WebDAV.

## WebDAV-Synchronisierung: auch Symbole und Hintergründe {#webdav}

Die WebDAV-Synchronisierung befindet sich in der Betaphase und ist standardmäßig deaktiviert. Wenn sie aktiviert ist, werden deine vollständigen Einstellungen, hochgeladenen Shortcut-Symbole und eigenen Hintergründe auf einem Server deiner Wahl gespeichert.

1. Öffne die Einstellungen von Lumno und gehe zu „Account & sync“ → WebDAV.
2. Klicke auf „Add WebDAV“ und gib Serveradresse, Sync-Ordner, Benutzernamen und App-Passwort ein.
3. Klicke optional auf „Test connectivity“ und anschließend auf „Save and turn on sync“.

Füge die Verbindung auf jedem Gerät separat hinzu. Benutzername und Passwort werden nur auf dem jeweiligen Computer gespeichert und nie über die Browser-Synchronisierung übertragen.

## Einen Server auswählen {#hosts}

Lumno wurde mit selbst gehostetem Nextcloud, mit WebDAV-Servern auf Basis von Apache, nginx, rclone und WsgiDAV sowie mit Nutstore (坚果云) getestet. Gehostete Dienste und NAS-Geräte wie Synology sollten funktionieren, sofern sie Standard-WebDAV unterstützen, wurden aber noch nicht getestet.

Wenn dein Dienst App-Passwörter anbietet, erstelle ein eigenes App-Passwort für Lumno, anstatt dein Hauptpasswort zu verwenden.

## Einen weiteren Computer einrichten {#second-device}

Füge eine Verbindung mit demselben Server, demselben Ordner und demselben Konto hinzu. Wenn sich bereits Daten auf dem Server befinden, fragt Lumno, welche Version verwendet werden soll; in den meisten Fällen wählst du „Use server version“. Bevor Daten ersetzt werden, erstellt Lumno eine vollständige Sicherung der Einstellungen dieses Computers.

Danach werden Änderungen auf beiden Computern automatisch zusammengeführt. Wenn beide Computer dieselbe Einstellung ändern, zum Beispiel die Shortcuts, zeigt die Karte einen Konflikt an. Klicke auf „Show differences“, um die Änderungen beider Seiten zu vergleichen, und wähle dann die Version aus, die du behalten möchtest.

## Was nicht synchronisiert wird {#not-synced}

- Verlauf, Lesezeichen und offene Tabs: Diese synchronisiert dein Browser wie gewohnt.
- Dein WebDAV-Benutzername und -Passwort: Jedes Gerät speichert eigene Zugangsdaten.

Wenn du WebDAV deaktivierst oder die Verbindung entfernst, bleiben die Dateien auf deinem Server erhalten. Bei Bedarf kannst du sie dort löschen. Die WebDAV-Synchronisierung ist nicht Ende-zu-Ende-verschlüsselt, daher kann der Administrator des Servers die Dateien lesen.

## Exportieren und importieren {#export}

Wenn du keine Synchronisierung verwenden möchtest, kannst du deine Konfiguration in den Einstellungen von Lumno als Datei exportieren und auf einem anderen Computer importieren. Die Datei enthält deine Einstellungen, aber keine Bilder.
