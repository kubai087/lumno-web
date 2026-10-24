Pour passer d'une des deux ou trois dernières pages utilisées à l'autre, le sélecteur d'onglets est la méthode la plus rapide : aucune saisie n'est nécessaire, deux touches suffisent.

## Ouvrir le sélecteur {#open}

Appuyez sur `⌥ Q`. Vos onglets récents s'affichent dans l'ordre de leur utilisation, chacun avec un aperçu de la page.

![Le sélecteur d'onglets récents, avec quatre onglets dans l'ordre d'utilisation, chacun avec un aperçu de la page](switcher "Le sélecteur d'onglets récents")

## Changer d'onglet {#switch}

1. Maintenez `⌥` enfoncée et appuyez plusieurs fois sur `Q` jusqu'à atteindre la page souhaitée. Vous pouvez aussi utiliser `Tab` ou les touches fléchées.
2. Relâchez `⌥` ou appuyez sur `↩` pour basculer vers cette page.

Vous pouvez aussi fermer directement depuis le sélecteur les onglets dont vous n'avez plus besoin : placez le pointeur sur l'aperçu d'une page et cliquez sur le bouton de fermeture qui apparaît dans son coin.

Le fonctionnement est semblable à celui de `⌘ Tab | Alt + Tab` sur votre ordinateur ou de `⌃ Tab` dans [Arc](https://arc.net/).

## Sélecteur ou recherche dans les onglets ouverts {#vs-search}

- Si la page fait partie des dernières que vous avez utilisées, utilisez le sélecteur : deux touches suffisent.
- Si de nombreux onglets sont ouverts et que la page ne figure pas parmi les plus récentes, appuyez sur `⌘ ⇧ K`, puis sur `Tab` lorsque le champ est vide, pour rechercher uniquement dans les onglets ouverts. Pour en savoir plus, consultez [Chercher dans les onglets, les favoris et l'historique](../search-tabs-bookmarks-history/#open-tabs).

## Ouvrir le sélecteur avec Ctrl+Tab {#ctrl-tab}

Si vous avez l'habitude de changer d'onglet avec `⌃ Tab` dans [Arc](https://arc.net/), vous pouvez en faire le raccourci du sélecteur. La page des raccourcis du navigateur n'accepte pas cette combinaison : définissez-la depuis la console de cette page.

1. Saisissez `chrome://extensions/shortcuts` dans la barre d'adresse et ouvrez la page.
2. Appuyez sur `⌘ ⌥ J | Ctrl + Maj + J` pour ouvrir la console.
3. Collez le code ci-dessous, puis appuyez sur `↩` pour l'exécuter.

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

4. Actualisez la page. « Open recent tab switcher » affiche désormais `⌃ Tab`.

![La page des raccourcis d'extensions du navigateur : « Open recent tab switcher » de Lumno réglé sur ⌃⇥](shortcuts-ctrl-tab "La page des raccourcis après la modification")

Maintenez ensuite `⌃` enfoncée et appuyez plusieurs fois sur `Tab` pour choisir un onglet, puis relâchez `⌃` pour y accéder.

- La première fois que vous collez du code dans la console, le navigateur vous demande de saisir un court texte de confirmation. Saisissez-le comme indiqué, puis collez à nouveau.
- Le code ne modifie que ce raccourci de Lumno. Ensuite, le raccourci `⌃ Tab` du navigateur (onglet suivant à droite) ne fonctionne plus.
- Pour revenir en arrière, cliquez sur l'icône en forme de crayon à côté de l'élément sur la même page et définissez un nouveau raccourci.
- Cette méthode utilise une interface intégrée à la page des raccourcis du navigateur ; elle peut cesser de fonctionner après une mise à jour du navigateur.

## Modifier le raccourci {#shortcut}

Vous pouvez modifier le raccourci du sélecteur dans `chrome://extensions/shortcuts`. Pour en savoir plus, consultez [Raccourcis clavier](../keyboard-shortcuts/#change).

Les aperçus des pages sont capturés sur votre ordinateur lorsque vous changez d'onglet. Chacun est conservé deux heures au maximum et ne quitte jamais votre appareil.
