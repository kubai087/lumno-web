Lumno est conçu pour les navigateurs Chromium, avec aussi une version Firefox. Voici ce qui fonctionne, et où.

## En un coup d'œil {#support}

| Navigateur | Barre de commande | Nouvel onglet | Où l'obtenir |
| --- | --- | --- | --- |
| Google Chrome | Oui | Oui | Chrome Web Store |
| Microsoft Edge | Oui | Oui | Modules Edge |
| Brave, Arc, Vivaldi, Opera | Oui | Oui | Chrome Web Store |
| Dia | Oui | Pas encore | Chrome Web Store |
| Firefox, Zen et autres | En partie | Oui | Voir ci-dessous |
| Safari | Non | Non | — |

Les navigateurs sur téléphone et tablette ne sont pas encore pris en charge.

## Dia {#dia}

Dia ne laisse pas les extensions remplacer le nouvel onglet : le nouvel onglet de Lumno n'y est donc pas disponible. La barre de commande fonctionne normalement.

Si le raccourci ne fait rien, ouvrez la page des raccourcis d'extensions et passez la portée à côté de Lumno de « In Dia » à « Global ».

## Firefox {#firefox}

La version Firefox n'est pas encore sur le site des modules Firefox ; dès qu'elle y sera, ce site en donnera le lien. Elle est destinée à Firefox 140 et versions ultérieures, et aux navigateurs basés sur Firefox comme Zen, LibreWolf et Floorp.

Les API d'extensions de Firefox diffèrent de celles de Chromium, donc certaines choses ne fonctionnent pas :

| Fonction | Dans Firefox |
| --- | --- |
| Image dans l'image automatique | Indisponible ; Firefox ne laisse pas les extensions mettre une vidéo web en image dans l'image |
| Capture web | Indisponible ; Firefox ne prend pas en charge l'image dans l'image de document |
| Barre de commande sur les pages `about:` et le site des modules | Indisponible |
| Ouvrir des pages `about:` depuis les raccourcis ou la barre | Indisponible |
| Barre de commande sur les pages locales `file://` | Indisponible |
| Icônes de sites | Les sites jamais visités peuvent d'abord afficher une icône générique |

Firefox utilise déjà `⌘ ⇧ K`, donc la version Firefox utilise par défaut `⌃ ⇧ K` sur macOS et `Alt + K` sous Windows et Linux. `Alt + Q` ne change pas.

## Safari {#safari}

Le système d'extensions de Safari est très différent de celui de Chromium, et il n'existe pas encore de version Safari de Lumno. Pour une recherche similaire à l'échelle du système sur Mac, essayez [Raycast](https://www.raycast.com/) ou [Alfred](https://www.alfredapp.com/).

## Langues de l'interface {#languages}

L'extension existe en anglais, en japonais et en chinois simplifié et traditionnel ; avec un navigateur en français, elle s'affiche en anglais. Elle suit la langue de votre navigateur par défaut, et vous pouvez la changer dans les réglages.
