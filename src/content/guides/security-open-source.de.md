Jede Zeile von Lumnos Code ist öffentlich, damit alle sehen können, was die Erweiterung tut und was nicht.

## Open Source {#open-source}

- Code: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- Lizenz: GPL-3.0
- Problem gefunden? Eröffne ein Issue auf GitHub

Jede Store-Version wird aus genau diesem Code gebaut, und was sich geändert hat, steht in den [Versionshinweisen](/de/release/) und unter GitHub Releases.

## Auf Sicherheit ausgelegt {#design}

- Manifest V3: Browser lassen Manifest-V3-Erweiterungen keinen Code nachladen und ausführen, Lumnos gesamter Code steckt also im geprüften Paket.
- Keine Server: kein Kontosystem und kein Ort, an dem deine Daten liegen.
- Nur die nötigen Berechtigungen, keine optionalen.
- Dein WebDAV-App-Passwort bleibt auf deinem Gerät und läuft nie über die Browser-Synchronisierung.

## Wofür jede Berechtigung da ist {#permissions}

| Berechtigung | Wofür |
| --- | --- |
| `tabs`, `tabGroups` | Tabs durchsuchen, wechseln und wiederherstellen; Vorschauen für den Umschalter aufnehmen |
| `history` | Deinen Verlauf auf deinem Gerät durchsuchen |
| `bookmarks` | Lesezeichen durchsuchen, anzeigen und verwalten |
| `topSites` | Meistbesuchte Seiten im neuen Tab anzeigen |
| `storage`, `unlimitedStorage` | Einstellungen, Icons und Hintergründe speichern |
| `alarms` | Den Status der WebDAV-Synchronisierung regelmäßig prüfen |
| `search` | Suchen an deine Standardsuchmaschine übergeben |
| `favicon` | Website-Icons anzeigen |
| `scripting` und Zugriff auf alle Websites | Die Befehlsleiste auf Seiten anzeigen, auf Kürzel reagieren, Textaktionen und Bild-im-Bild |

Der Zugriff auf alle Websites dient nur dazu, die Befehlsleiste und ähnliche Funktionen auf Seiten anzuzeigen. Lumno liest oder überträgt keine Seiteninhalte im großen Stil.
