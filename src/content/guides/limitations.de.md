Lumno ist eine Erweiterung, kein neuer Browser – manches lässt der Browser schlicht nicht zu. Hier steht es vorab, damit du es nicht erst nach der Installation merkst, zusammen mit Tools, die diese Lücken füllen.

## Seitenleisten, Spaces und geteilte Ansicht {#not-a-browser}

Vertikale Tabs, eine Seitenleiste, Arcs Spaces und die geteilte Ansicht muss der Browser selbst mitbringen. Erweiterungen können weder Adressleiste noch Tableiste verändern.

- Für vertikale Tabs probier [Microsoft Edge](https://www.microsoft.com/edge), das sie eingebaut hat.
- Für eine Seitenleiste wie in Arc, Arbeitsbereiche und geteilte Ansicht probier [Zen Browser](https://zen-browser.app/) oder [Vivaldi](https://vivaldi.com/).

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
