Wenn du mehrere Computer oder Browser verwendest, können deine Shortcuts, Hintergründe und Einstellungen mitkommen. Lumno hat keine eigenen Server und nutzt für die Synchronisierung deshalb zwei Wege, die du bereits hast: die Synchronisierung deines Browsers und deinen eigenen WebDAV-Server.

## Browser-Synchronisierung: keine Einrichtung nötig {#browser-sync}

Wenn du in deinem Browser angemeldet bist und die Synchronisierung aktiviert ist, werden Lumnos Einstellungen automatisch synchronisiert. Dazu gehören Design, Suchmaschinen, Shortcuts, angeheftete Websitekarten, die Sperrliste sowie deine Hintergrundauswahl und Bildlinks.

Hochgeladene Symbole, lokale Hintergründe und importierte Zitatsammlungen sind für die Browser-Synchronisierung zu groß. Um auch diese zu synchronisieren, verwende WebDAV.

Browser stellen jeder Erweiterung nur begrenzten Speicher für die Synchronisierung bereit. Du kannst bis zu 200 Shortcuts hinzufügen; was nicht in die Browser-Synchronisierung passt, bleibt nur auf diesem Computer gespeichert und wird über WebDAV synchronisiert, sobald du es aktivierst. Wie viele deiner Shortcuts mit dem Browser synchronisiert werden, siehst du in den Einstellungen von Lumno unter „Account & sync“.

## WebDAV-Synchronisierung: auch Symbole und Hintergründe {#webdav}

Die WebDAV-Synchronisierung befindet sich in der Betaphase und ist standardmäßig deaktiviert. Wenn sie aktiviert ist, werden deine vollständigen Einstellungen, hochgeladenen Shortcut-Symbole, eigenen Hintergründe und importierten Zitate auf einem Server deiner Wahl gespeichert.

1. Öffne die Einstellungen von Lumno und gehe zu „Account & sync“ → WebDAV.
2. Klicke auf „Add WebDAV“ und gib Serveradresse, Sync-Ordner, Benutzernamen und App-Passwort ein.
3. Klicke optional auf „Test connectivity“ und anschließend auf „Save and turn on sync“.

Das App-Passwort wird nur auf dem jeweiligen Computer gespeichert und nie über die Browser-Synchronisierung übertragen. Serveradresse, Sync-Ordner und Benutzername werden dagegen mit deinen anderen Geräten synchronisiert, damit du die Einrichtung dort abschließen kannst.

## Einen Server auswählen {#hosts}

Lumno wurde mit selbst gehostetem Nextcloud, mit WebDAV-Servern auf Basis von Apache, nginx, rclone und WsgiDAV sowie mit Nutstore (坚果云) getestet. Gehostete Dienste und NAS-Geräte wie Synology sollten funktionieren, sofern sie Standard-WebDAV unterstützen, wurden aber noch nicht getestet.

Wenn dein Dienst App-Passwörter anbietet, erstelle ein eigenes App-Passwort für Lumno, anstatt dein Hauptpasswort zu verwenden.

Bekommt ein Server in kurzer Zeit zu viele Anfragen, lehnen Dienste wie Nutstore (坚果云) sie eine Weile ab (HTTP 429 oder 503). Lumno pausiert dann die Hintergrundsynchronisierung und versucht es von selbst erneut – nach der vom Server genannten Wartezeit oder nach einer wachsenden Pause von 5 Minuten bis zu einer Stunde. Die Daten auf deinem Computer bleiben erhalten. Die Einstellungen von Lumno zeigen den Grund und den nächsten Versuch an, das Pop-up in der Symbolleiste zeigt „WebDAV waiting to retry“.

## Einen weiteren Computer einrichten {#second-device}

Wenn beide Computer mit demselben Browserkonto angemeldet sind, öffne auf dem anderen Computer in den Einstellungen von Lumno „Account & sync“ → WebDAV. Dort findest du eine Verbindung mit dem Hinweis „From another device“, in der Serveradresse, Ordner und Benutzername bereits ausgefüllt sind. Gib nur noch einmal das App-Passwort ein. Wenn du sie auf diesem Computer nicht verwenden möchtest, klicke auf „Dismiss“. Nutzen die Computer kein gemeinsames Browserkonto, füge eine Verbindung mit demselben Server, demselben Ordner und demselben Konto hinzu.

Wenn sich bereits Daten auf dem Server befinden, fragt Lumno, welche Version verwendet werden soll; in den meisten Fällen wählst du „Use server version“. Bevor Daten ersetzt werden, erstellt Lumno eine vollständige Sicherung der Einstellungen dieses Computers.

Danach werden Änderungen auf beiden Computern automatisch zusammengeführt. Wenn beide Computer vor der Synchronisierung dasselbe ändern, zum Beispiel die Shortcuts oder eine einzelne Einstellung, zeigt die Karte einen Konflikt an, statt eine Seite die andere überschreiben zu lassen. Klicke auf „Show differences“, um die Änderungen beider Seiten zu vergleichen, und wähle dann die Version aus, die du behalten möchtest.

## Was nicht synchronisiert wird {#not-synced}

- Verlauf, Lesezeichen und offene Tabs: Diese synchronisiert dein Browser wie gewohnt.
- Dein WebDAV-App-Passwort: Jedes Gerät speichert sein eigenes.

Wenn du WebDAV deaktivierst oder die Verbindung entfernst, bleiben die Dateien auf deinem Server erhalten. Bei Bedarf kannst du sie dort löschen. Die WebDAV-Synchronisierung ist nicht Ende-zu-Ende-verschlüsselt, daher kann der Administrator des Servers die Dateien lesen.

## Exportieren und importieren {#export}

Wenn du keine Synchronisierung verwenden möchtest, kannst du deine Konfiguration in den Einstellungen von Lumno als Datei exportieren und auf einem anderen Computer importieren. Die Datei enthält deine Einstellungen, aber keine Bilder.
