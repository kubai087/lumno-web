Lumno ist nur eine Browsererweiterung, kein neuer Browser, und manches kann es noch nicht. Hier sind die Lücken, die wir kennen. Wenn du eine dieser Funktionen brauchst, passt eines der hier genannten Tools vielleicht besser zu dir.

## Seiten, auf denen sich die Befehlsleiste nicht öffnet {#restricted-pages}

Aus Sicherheitsgründen lassen Browser Erweiterungen auf diesen Seiten nichts anzeigen:

- Browserseiten, die mit `chrome://` oder `edge://` beginnen
- Der Chrome Web Store und Edge-Add-ons

Drückst du dort das Tastenkürzel, greift die Option „Restricted page behavior“ in Lumnos Einstellungen.

Lokale Dateien (PDF oder HTML mit `file://`) funktionieren, sobald du auf Lumnos Detailseite den „Zugriff auf Datei-URLs zulassen“ einschaltest.

## Alles außerhalb des Browsers {#outside-browser}

Lumno durchsucht nur, was in deinem Browser ist. Um Apps, Dateien und Systemeinstellungen mit einem Kürzel zu durchsuchen, probier auf dem Mac [Raycast](https://www.raycast.com/) oder [Alfred](https://www.alfredapp.com/).

## Nicht unterstützte Browser {#browsers}

- Safari wird nicht unterstützt, mobile Browser ebenfalls nicht.
- In Dia funktioniert die Befehlsleiste, Lumnos neuer Tab aber nicht.
- Der Firefox-Version fehlen ein paar Funktionen. Siehe [Browserkompatibilität](../browser-compatibility/).

## Widgets im neuen Tab {#widgets}

Lumnos neuer Tab bleibt schlicht: kein Wetter, keine To-dos, keine Notizen. Wenn du einen neuen Tab voller Widgets möchtest, probier [Momentum](https://momentumdash.com/) oder [Tabliss](https://tabliss.io/).

Der Browser lässt immer nur eine Erweiterung den neuen Tab übernehmen. Du kannst deren Tab behalten und trotzdem Lumnos Befehlsleiste nutzen.

## Cloud-Synchronisierung {#data}

Lumno hat keine Server, also auch kein Cloud-Konto. Einstellungen wandern mit der Synchronisierung deines Browsers. Sollen auch Icons und Hintergründe mit, brauchst du einen eigenen WebDAV-Server, etwa Nextcloud oder ein NAS. Siehe [Synchronisierung](../sync/).

Verlauf, Lesezeichen und offene Tabs gehören nicht zu Lumnos Synchronisierung. Die synchronisiert dein Browser wie gewohnt.
