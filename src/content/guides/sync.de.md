Neuer Computer oder mehrere Browser gleichzeitig? Deine Shortcuts, Hintergründe und Einstellungen können mitkommen. Lumno hat keine eigenen Server, deshalb nutzt die Synchronisierung zwei Dinge, die du schon hast: die Synchronisierung deines Browsers und einen eigenen WebDAV-Server.

## Browser-Synchronisierung: nichts zu tun {#browser-sync}

Bist du in deinem Browser angemeldet und die Synchronisierung ist an, folgen dir Lumnos Einstellungen automatisch: Design, Suchmaschinen, Shortcuts, angeheftete Seitenkarten, die Sperrliste sowie deine Hintergrundwahl und Bildlinks.

Hochgeladene Icons und lokale Hintergründe sind für die Browser-Synchronisierung zu groß. Sollen sie mit, nutze WebDAV.

## WebDAV-Sync: auch Icons und Hintergründe {#webdav}

WebDAV-Sync ist in der Beta und standardmäßig aus. Eingeschaltet landen deine vollständigen Einstellungen, hochgeladenen Shortcut-Icons und eigenen Hintergründe auf dem Server deiner Wahl.

1. Öffne Lumnos Einstellungen, geh zu „Account & sync“ und dann zu WebDAV.
2. Klick auf „Add WebDAV“ und trag Serveradresse, Sync-Ordner, Benutzernamen und App-Passwort ein.
3. Klick bei Bedarf auf „Test connectivity“ und dann auf „Save and turn on sync“.

Füg die Verbindung auf jedem Gerät hinzu. Benutzername und Passwort bleiben auf dem jeweiligen Computer und laufen nie über die Browser-Synchronisierung.

## Wo du die Daten ablegst {#hosts}

Getestet wurde Lumno mit selbst gehostetem Nextcloud, mit WebDAV-Servern auf Basis von Apache, nginx, rclone und WsgiDAV sowie mit Nutstore. Gehostete Dienste und NAS-Geräte wie Synology sollten funktionieren, wenn sie Standard-WebDAV unterstützen, sind aber noch nicht geprüft.

Nimm ein eigenes App-Passwort für Lumno, wenn dein Dienst das anbietet, statt deines Hauptpassworts.

## Auf deinem zweiten Computer {#second-device}

Füg denselben Server, denselben Ordner und dasselbe Konto hinzu. Liegen auf dem Server schon Daten, fragt Lumno, welche Version gelten soll – meist wählst du „Use server version“. Bevor etwas ersetzt wird, legt Lumno eine vollständige Sicherung der Einstellungen dieses Computers an.

Danach werden Änderungen auf beiden Seiten automatisch zusammengeführt. Ändern zwei Computer dasselbe, etwa die Shortcuts, zeigt die Karte einen Konflikt. Klick auf „Show differences“, sieh dir an, was jede Seite geändert hat, und wähl eine aus.

## Was nicht synchronisiert wird {#not-synced}

- Verlauf, Lesezeichen und offene Tabs: Die synchronisiert dein Browser wie gewohnt.
- Dein WebDAV-Benutzername und -Passwort: Jedes Gerät speichert seine eigenen.

Schaltest du WebDAV aus oder entfernst die Verbindung, bleiben die Dateien auf deinem Server; lösch sie dort, wenn du willst. WebDAV ist nicht Ende-zu-Ende-verschlüsselt, der Administrator des Servers kann die Dateien also lesen.

## Exportieren und importieren {#export}

Lieber ohne Synchronisierung? Exportier deine Konfiguration in Lumnos Einstellungen als Datei und importier sie auf dem anderen Computer. Die Datei enthält deine Einstellungen, nicht deine Bilder.
