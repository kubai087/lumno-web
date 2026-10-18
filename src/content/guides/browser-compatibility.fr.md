Lumno est conçu pour les navigateurs Chromium et existe également en version Firefox. Le tableau ci-dessous indique les fonctions disponibles dans chaque navigateur.

## Navigateurs pris en charge {#support}

| Navigateur | Barre de commande | Nouvel onglet | Installer depuis |
| --- | --- | --- | --- |
| Google Chrome | Oui | Oui | Chrome Web Store |
| Microsoft Edge | Oui | Oui | Modules complémentaires Edge |
| Brave, [Arc](https://arc.net/), Vivaldi, Opera | Oui | Oui | Chrome Web Store |
| Dia | Oui | Pas encore | Chrome Web Store |
| Firefox, [Zen](https://zen-browser.app/) et autres | En partie | Oui | Modules complémentaires Firefox |
| Safari | Non | Non | — |

Les navigateurs sur téléphone et tablette ne sont pas encore pris en charge. Si vous consultez ce site sur un téléphone connecté à votre compte Google, vous pouvez déjà appuyer sur Installer : Lumno s'installera automatiquement la prochaine fois que vous ouvrirez Chrome sur un ordinateur connecté au même compte, avec la synchronisation activée.

## Dia {#dia}

Dia n'autorise pas les extensions à remplacer le nouvel onglet : le nouvel onglet de Lumno n'y est donc pas disponible. La barre de commande fonctionne normalement.

Si le raccourci ne fonctionne pas, ouvrez la page des raccourcis d'extensions et remplacez la portée indiquée à côté de Lumno, « In Dia », par « Global ».

## Firefox {#firefox}

La version Firefox est disponible sur les [modules complémentaires Firefox](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/). Elle fonctionne avec Firefox 140 et versions ultérieures, et peut aussi être installée dans les navigateurs basés sur Firefox comme Zen, LibreWolf et Floorp.

Les API d'extensions de Firefox étant différentes de celles de Chromium, certaines fonctions ne sont pas disponibles :

| Fonction | Dans Firefox |
| --- | --- |
| Image dans l'image automatique | Non disponible ; Firefox n'autorise pas les extensions à placer une vidéo web en image dans l'image |
| Capture web | Non disponible ; Firefox ne prend pas en charge l'image dans l'image pour les documents |
| Barre de commande sur les pages `about:` et le site des modules complémentaires | Non disponible |
| Ouverture de pages `about:` depuis les raccourcis ou la barre de commande | Non disponible |
| Barre de commande sur les pages locales `file://` | Non disponible |
| Icônes de sites | Les sites jamais visités peuvent d'abord afficher une icône générique |
| Liquid glass dans le nouvel onglet | Aspect de verre uniquement, sans déformation sur les bords |

Comme Firefox utilise déjà `⌘ ⇧ K`, la version Firefox utilise par défaut `⌃ ⇧ K | Alt + K`. `⌥ Q` reste inchangé. Pour modifier ces raccourcis, ouvrez `about:addons`, cliquez sur le bouton en forme d'engrenage en haut à droite et choisissez « Gérer les raccourcis d’extensions ».

## Safari {#safari}

Le système d'extensions de Safari est très différent de celui de Chromium, et il n'existe pas encore de version Safari de Lumno. Pour une recherche similaire à l'échelle du système sur Mac, essayez [Raycast](https://www.raycast.com/) ou [Alfred](https://www.alfredapp.com/).

## Langues de l'interface {#languages}

L'extension est disponible en anglais, en japonais et en chinois simplifié et traditionnel ; si votre navigateur est en français, elle s'affiche en anglais. Par défaut, elle utilise la langue de votre navigateur, que vous pouvez modifier dans les réglages.
