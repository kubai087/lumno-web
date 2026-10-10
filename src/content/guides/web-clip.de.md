Mit Web-Clip legst du einen Teil einer Webseite in ein eigenes schwebendes Fenster, etwa eine Tabelle, einen Codeblock oder ein Diagramm. Das Fenster bleibt über allen anderen Fenstern, auch wenn du den Tab oder die App wechselst. So hast du es beim Lesen oder Arbeiten immer im Blick.

## Web-Clip aktivieren {#enable}

Web-Clip ist standardmäßig deaktiviert. Aktiviere in den Einstellungen von Lumno „Web Clip“, um die Funktion zu verwenden.

## Einen Seitenbereich ausschneiden {#how}

1. Drücke auf der gewünschten Seite `⌘ ⇧ K` (unter Windows `Ctrl + Shift + K`), um die Befehlsleiste zu öffnen. Gib `/clip` ein und drücke die Eingabetaste.

![Befehlsleiste mit der Eingabe /clip und dem Ergebnis „Start Web Clip“](clip-command "/clip in die Befehlsleiste eingeben")

2. Bewege den Zeiger über die Seite. Lumno markiert den Bereich, den du ausschneiden kannst, mit einem gestrichelten Rahmen.
3. Ist der Rahmen zu groß oder zu klein, scrolle, um den Bereich zu ändern. Du kannst auch `[` oder `↑` drücken, um das umgebende Element auszuwählen, oder `]` oder `↓` für ein Element darin.
4. Klicke auf den markierten Inhalt, um ihn in einem schwebenden Fenster zu öffnen. Zum Abbrechen drückst du `Esc`.

![Hinweis oben auf einer Artikelseite, darunter ist die Tabelle mit CSS-Eigenschaften gestrichelt umrahmt](clip-picker "Inhalt mit dem gestrichelten Rahmen auswählen")

## Das schwebende Fenster {#window}

- Das Fenster zeigt eine Kopie des ausgewählten Inhalts. Ändert sich dieser Teil der Originalseite, wird auch das Fenster aktualisiert.
- Klickst du im Fenster auf einen Link, öffnet er sich in einem neuen Browser-Tab. Halte beim Klicken `⌘` (unter Windows `Ctrl`) gedrückt, um ihn im Hintergrund zu öffnen.
- Bewege den Zeiger an den unteren Rand des Fensters, um die Tasten „Reselect“ und „Close“ einzublenden.
- Du kannst das Fenster wie jedes andere verschieben und in der Größe ändern.

## Einschränkungen {#limits}

Web-Clip basiert auf dem Document Picture-in-Picture des Browsers und hat deshalb folgende Einschränkungen:

- Die Funktion ist nur auf der obersten Seite einer HTTPS-Website verfügbar, nicht in eingebetteten Frames (iframes).
- Auf Websites, die Bild-im-Bild über ihre Richtlinien deaktivieren, ist sie nicht verfügbar.
- Läuft bereits ein Video im Bild-im-Bild-Modus, schließe es zuerst.
- Zu kleine Bereiche können nicht schweben. Wähle stattdessen einen größeren Bereich.
- Es kann immer nur ein schwebendes Fenster geöffnet sein.

Firefox unterstützt Document Picture-in-Picture nicht, deshalb ist die Funktion in der Firefox-Version nicht verfügbar.
