Um zwischen den zwei oder drei zuletzt verwendeten Seiten zu wechseln, ist der Tab-Umschalter am schnellsten: Du musst nichts eingeben, zwei Tastendrücke genügen.

## Den Tab-Umschalter öffnen {#open}

Drücke `⌥ Q`. Deine zuletzt verwendeten Tabs werden in der Reihenfolge ihrer Nutzung mit einer Seitenvorschau angezeigt.

![Der Tab-Umschalter mit vier Tabs in der Reihenfolge ihrer Nutzung, jeweils mit Seitenvorschau](switcher "Der Tab-Umschalter")

## Tabs wechseln {#switch}

1. Halte `⌥` gedrückt und drücke wiederholt `Q`, bis die gewünschte Seite ausgewählt ist. Du kannst auch `Tab` oder die Pfeiltasten verwenden.
2. Lass `⌥` los oder drücke `↩`, um zu dieser Seite zu wechseln.

Tabs, die du nicht mehr brauchst, kannst du direkt im Umschalter schließen: Bewege den Mauszeiger auf eine Seitenvorschau und klicke auf die Schließen-Schaltfläche, die in ihrer Ecke erscheint.

Die Bedienung entspricht weitgehend `⌘ Tab | Alt + Tab` auf deinem Computer oder `⌃ Tab` in [Arc](https://arc.net/).

## Tab-Umschalter oder Suche in offenen Tabs {#vs-search}

- Wenn die gewünschte Seite zu den zuletzt verwendeten gehört, verwende den Tab-Umschalter. Zwei Tastendrücke genügen.
- Wenn viele Tabs geöffnet sind und die gesuchte Seite nicht zu den zuletzt verwendeten gehört, drücke `⌘ ⇧ K` und dann bei leerem Suchfeld `Tab`, um nur offene Tabs zu durchsuchen. Weitere Informationen findest du unter [Tabs, Lesezeichen und Verlauf durchsuchen](../search-tabs-bookmarks-history/#open-tabs).

## Den Tab-Umschalter mit Ctrl+Tab öffnen {#ctrl-tab}

Wenn du es aus [Arc](https://arc.net/) gewohnt bist, mit `⌃ Tab` zwischen Tabs zu wechseln, kannst du diese Kombination auch als Tastenkürzel des Tab-Umschalters festlegen. Die Tastenkürzel-Seite des Browsers nimmt sie nicht an, deshalb legst du sie über die Konsole dieser Seite fest:

1. Gib `chrome://extensions/shortcuts` in die Adressleiste ein und öffne die Seite.
2. Drücke `⌘ ⌥ J | Strg + Umschalt + J`, um die Konsole zu öffnen.
3. Füge den folgenden Code ein und drücke `↩`, um ihn auszuführen.

   ```js
   const extensions = await chrome.developerPrivate.getExtensionsInfo();
   const lumno = extensions.find((item) =>
     item.commands.some((command) => command.name === "show-tab-switcher"));
   await chrome.developerPrivate.updateExtensionCommand({
     extensionId: lumno.id,
     commandName: "show-tab-switcher",
     keybinding: "Ctrl+Tab",
   });
   ```

4. Lade die Seite neu. Bei „Open recent tab switcher“ steht jetzt `⌃ Tab`.

![Die Seite für Erweiterungs-Tastenkürzel im Browser: Lumnos „Open recent tab switcher“ steht auf ⌃⇥](shortcuts-ctrl-tab "Die Tastenkürzel-Seite nach der Änderung")

Halte danach `⌃` gedrückt und drücke mehrmals `Tab`, um einen Tab auszuwählen. Lass `⌃` los, um zu ihm zu wechseln.

- Beim ersten Einfügen in die Konsole verlangt der Browser, dass du zuerst einen kurzen Bestätigungstext eingibst. Gib ihn wie angezeigt ein und füge den Code dann erneut ein.
- Der Code ändert nur dieses eine Tastenkürzel von Lumno. Danach funktioniert das browsereigene `⌃ Tab` (zum nächsten Tab rechts) nicht mehr.
- Um es rückgängig zu machen, klicke auf derselben Seite auf das Stiftsymbol neben dem Eintrag und lege ein neues Tastenkürzel fest.
- Dafür wird eine Schnittstelle der Tastenkürzel-Seite des Browsers genutzt. Nach einem Browser-Update funktioniert das möglicherweise nicht mehr.

## Das Tastenkürzel ändern {#shortcut}

Das Tastenkürzel des Tab-Umschalters kannst du unter `chrome://extensions/shortcuts` ändern. Weitere Informationen findest du unter [Tastenkürzel](../keyboard-shortcuts/#change).

Die Seitenvorschauen werden beim Wechseln der Tabs auf deinem Computer erstellt. Jede Vorschau wird höchstens zwei Stunden lang gespeichert und verlässt dein Gerät nicht.
