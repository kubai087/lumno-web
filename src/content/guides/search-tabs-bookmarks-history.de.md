Bei Dutzenden offenen Tabs und Hunderten Lesezeichen dauert es oft länger, eine Seite zu finden, als sie zu öffnen. Lumno führt alles in einem Suchfeld zusammen: Drücke das Tastenkürzel, gib ein paar Buchstaben ein, und offene Tabs, Lesezeichen und Verlauf werden gemeinsam angezeigt.

## Das Suchfeld öffnen {#open}

Drücke auf einer beliebigen Seite `⌘ ⇧ K`. Das Suchfeld erscheint in der Mitte des Bildschirms. Um es zu schließen, drücke `Esc` oder klicke außerhalb des Suchfelds.

Auf eingeschränkten Seiten wie den `chrome://`-Einstellungen oder Erweiterungs-Stores erlauben Browser Erweiterungen nicht, Inhalte anzuzeigen. Auf diesen Seiten richtet sich Lumno nach der Option „Restricted page behavior“ in den Einstellungen.

## Suchergebnisse {#results}

Die Kennzeichnung neben jedem Ergebnis gibt an, woher es stammt:

- Opened: ein aktuell geöffneter Tab. Wenn du die Eingabetaste drückst, wechselst du zu diesem Tab, statt die Seite ein zweites Mal zu öffnen.
- Bookmark: eine Seite aus deiner Lesezeichenleiste oder deinen Ordnern; der Ordner wird ebenfalls angezeigt.
- Frequent und History: deine meistbesuchten Seiten und dein Browserverlauf.

Zusätzlich werden Vorschläge deiner Suchmaschine angezeigt; mit der Eingabetaste startest du die Suche. Wie in der Adressleiste übernimmt das Suchfeld einen Vorschlag, sobald du ihn mit den Pfeiltasten auswählst, und `Esc` holt deine Eingabe zurück. Ergebnisse, die du häufiger auswählst, erscheinen weiter oben.

Standardmäßig steht oben die Seite, die Lumno für dich vervollständigt. Suchst du meistens, stelle in den Einstellungen von Lumno unter „Search Result Settings“ die Option „First Search Result Priority“ auf „Search First“: Dann steht die Suche oben, direkt gefolgt von einem Lesezeichen, Verlaufseintrag oder häufig besuchten Website, deren Titel genau deiner Eingabe entspricht.

![Lumno auf einer leeren Seite: Die Eingabe chrome zeigt einen offenen GitHub-Tab, Suchvorschläge, ein Lesezeichen und meistbesuchte Seiten](search "Die Eingabe chrome zeigt offene Tabs, Lesezeichen und meistbesuchte Seiten zusammen")

Weitere nützliche Tasten: `⌥ ↩` öffnet ein Ergebnis im aktuellen Tab, `⇧ ↩` öffnet einen bereits geöffneten Tab ein weiteres Mal in einem neuen Tab. Alle Tasten findest du unter [Tastenkürzel](../keyboard-shortcuts/#command-bar-keys).

## Im aktuellen Tab öffnen {#current-tab}

Öffnest du die Befehlsleiste auf einer Webseite, öffnen sich Ergebnisse in einem neuen Tab, und die Seite, auf der du warst, bleibt erhalten. Sollen sie sich wie in der Adressleiste im aktuellen Tab öffnen, schalte in den Einstellungen von Lumno unter „General → Command Bar“ die Option „Open in a new tab when clicked“ aus. Danach gilt:

- Seiten, Suchen, eingegebene Adressen und Website-Suchen öffnen sich im aktuellen Tab, und der Hinweis neben jedem Ergebnis wechselt von „New Tab“ zu „Go“.
- Auf einem angehefteten Tab öffnen sich Ergebnisse weiterhin in einem neuen Tab, damit die angeheftete Seite erhalten bleibt.
- Zu geöffneten Tabs wird weiterhin direkt gewechselt.

Unabhängig von der Einstellung öffnest du ein Ergebnis mit gedrückter `⌥`-Taste und Eingabetaste oder Klick auf die andere Art; mit gedrückter `⌘`-Taste öffnet es sich im Hintergrund. Für das Suchfeld im neuen Tab gibt es eine eigene Einstellung, siehe [Tasten im neuen Tab](../keyboard-shortcuts/#newtab-keys).

## Mit dem falschen Tastaturlayout getippt {#keyboard-layout}

Findet deine Eingabe nichts in Tabs, Lesezeichen oder Verlauf, liest Lumno sie noch einmal so, als wäre sie auf einer russischen, ukrainischen, hebräischen, arabischen oder koreanischen (2-Set-)Tastatur getippt worden. So findet `vjcrdf` Москва. Das geht auch umgekehrt: `пшерги`, mit noch aktivem russischem Layout getippt, findet GitHub. Solche Treffer erscheinen unter den direkten Treffern.

Die Suche ignoriert außerdem Unterschiede wie Akzente und Zeichen voller Breite, und Koreanisch lässt sich über Anfangskonsonanten suchen (`ㅅㅇ` findet 서울). Das Suchbereich-Panel sucht auf dieselbe Weise.

Chinesische Titel findest du per Pinyin, Anfangsbuchstaben oder einer Mischung aus beidem: `wxds`, `wxdushu` und `weixinds` finden alle 微信读书. Damit z und zh, c und ch, s und sh, n und l, an und ang, en und eng sowie in und ing als gleich gelten, schalte in den Einstellungen von Lumno unter „Search Result Settings“ die Option „Fuzzy pinyin“ ein.

## Nur offene Tabs durchsuchen {#open-tabs}

Bei vielen offenen Tabs kannst du die Suche eingrenzen: Drücke einmal `Tab`, während das Suchfeld leer ist. Links erscheint „Search open tabs“, und nur noch deine offenen Tabs werden aufgelistet. Gib einen Suchbegriff ein, um die Liste zu filtern, wechsle mit der Eingabetaste und beende die Suche mit `Esc`.

![Das Suchfeld zeigt links „Search open tabs“, darunter nur die gerade offenen Tabs](opentabs "Nur offene Tabs durchsuchen")

Um nur Lesezeichen, den Verlauf oder die meistbesuchten Seiten zu durchsuchen, drücke bei leerem Suchfeld zweimal `Tab` und wähle im Suchbereich-Panel die gewünschte Option aus.

## Andere Tabs schließen {#close-other-tabs}

Wenn sich die Tabs stapeln, klicke auf das Pinselsymbol rechts im Suchfeld und dann in der Rückfrage auf „Close“, um die anderen Tabs im aktuellen Fenster zu schließen. Der aktuelle Tab, angeheftete Tabs und Tabs in Tabgruppen bleiben offen. Die Schaltfläche gibt es in der Befehlsleiste und im Suchfeld des neuen Tabs.

Wenn du es dir anders überlegst, klicke erneut auf das Pinselsymbol, drücke `Esc` oder klicke außerhalb der Rückfrage.
