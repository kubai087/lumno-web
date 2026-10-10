Der gesamte Code von Lumno ist öffentlich, sodass jede und jeder nachvollziehen kann, was die Erweiterung tut und was nicht.

## Open Source {#open-source}

- Code: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- Lizenz: GPL-3.0
- Probleme melden: Erstelle ein Issue auf GitHub

Jede im Store veröffentlichte Version wird aus genau diesem Code erstellt. Die Änderungen findest du in den [Versionshinweisen](/de/release/) und unter GitHub Releases.

## Sicherheit durch Design {#design}

- Manifest V3: Browser erlauben Manifest-V3-Erweiterungen nicht, Code aus dem Internet herunterzuladen und auszuführen. Der gesamte Code von Lumno ist daher im geprüften Paket enthalten.
- Keine Server: Es gibt kein Kontosystem und keinen Ort, an dem deine Daten gespeichert werden.
- Minimale Berechtigungen: Lumno fordert nur die notwendigen Berechtigungen an und keine optionalen.
- Dein WebDAV-App-Passwort wird nur auf deinem Gerät gespeichert und nie über die Browser-Synchronisierung übertragen.

## Wofür die einzelnen Berechtigungen verwendet werden {#permissions}

| Berechtigung | Verwendung |
| --- | --- |
| `tabs`, `tabGroups` | Tabs durchsuchen, wechseln und wiederherstellen; Vorschauen für den Tab-Umschalter erstellen |
| `history` | Deinen Verlauf auf deinem Gerät durchsuchen |
| `bookmarks` | Lesezeichen durchsuchen, anzeigen und verwalten |
| `topSites` | Meistbesuchte Websites im neuen Tab anzeigen |
| `storage`, `unlimitedStorage` | Einstellungen, Symbole und Hintergründe speichern |
| `alarms` | Den Status der WebDAV-Synchronisierung regelmäßig prüfen |
| `search` | Suchanfragen an deine Standardsuchmaschine übergeben |
| `favicon` | Website-Symbole anzeigen |
| `scripting` und Zugriff auf alle Websites | Die Befehlsleiste auf Seiten anzeigen, auf Tastenkürzel reagieren sowie Textaktionen und Bild-im-Bild bereitstellen |

Der Zugriff auf alle Websites wird nur verwendet, um die Befehlsleiste und ähnliche Funktionen auf Seiten anzuzeigen. Lumno liest oder überträgt keine Seiteninhalte in großem Umfang.
