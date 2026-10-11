La plupart des fonctions de Lumno s'utilisent au clavier. Cette page présente les raccourcis par défaut, la façon de les modifier et les touches disponibles dans la barre de commande, le nouvel onglet, le sélecteur d'onglets et la capture web. Lorsqu'un clic produit le même effet, il est indiqué à côté de la touche.

## Raccourcis par défaut {#defaults}

| Action | Raccourci |
| --- | --- |
| Ouvrir la barre de commande | `⌘ ⇧ K` |
| Ouvrir le sélecteur d'onglets récents | `⌥ Q` |
| Ouvrir la barre de commande avec l'URL de la page actuelle | Aucun par défaut |
| Copier l'URL de la page actuelle | Aucun par défaut |

Les deux dernières actions peuvent s'afficher comme « Non défini » après l'installation. Pour leur attribuer un raccourci, suivez les étapes ci-dessous. La version Firefox ouvre la barre de commande avec un autre raccourci par défaut : consultez [Compatibilité des navigateurs](../browser-compatibility/#firefox).

## Modifier un raccourci {#change}

Les navigateurs gèrent les raccourcis des extensions sur une page dédiée :

1. Saisissez `chrome://extensions/shortcuts` dans la barre d'adresse (`edge://extensions/shortcuts` dans Edge).
2. Repérez Lumno, puis cliquez sur l'icône en forme de crayon à côté de l'action à modifier.
3. Appuyez sur la nouvelle combinaison de touches.

![La page des raccourcis d'extensions du navigateur : « Open command bar » de Lumno réglé sur ⇧⌘K et « Open recent tab switcher » sur ⌥Q](shortcuts "Modifier les raccourcis sur la page des extensions")

Si vous avez l'habitude d'[Arc](https://arc.net/) ou de [Zen](https://zen-browser.app/), vous pouvez attribuer `⌘ T` à « Open command bar ».

Si le raccourci ne fonctionne pas dans Dia, remplacez la portée indiquée à côté, « In Dia », par « Global ».

## Touches de la barre de commande {#command-bar-keys}

### Sélectionner un résultat

| Touche | Action |
| --- | --- |
| `↑` `↓` | Déplacer la sélection vers le haut ou le bas |
| Maintenir `⌘`, la relâcher, puis appuyer sur `0`–`9` | Des numéros s'affichent à côté des résultats ; appuyez sur l'un d'eux pour ouvrir le résultat correspondant |

Si vous activez « Single-press Command to show number jump » dans « Labs » (réglages de Lumno), une simple pression sur `⌘` affiche les numéros : maintenez `⌘` et appuyez sur un numéro pour ouvrir le résultat. `⌘` ne sert alors plus à ouvrir en arrière-plan ; le clic du milieu, lui, fonctionne toujours.

Sur macOS, vous pouvez aussi activer « Mac keyboard navigation » dans « Labs » pour sélectionner le résultat suivant et précédent avec `⌃ N | ⌃ N` et `⌃ P | ⌃ P`.

### Ouvrir un résultat

| Touche ou clic | Action |
| --- | --- |
| `↩` ou clic sur un résultat | Ouvrir le résultat ou basculer vers un onglet ouvert |
| `⌥ ↩` ou clic en maintenant `⌥` | Ouvrir dans l'onglet actuel plutôt que dans un nouvel onglet |
| `⇧ ↩` ou clic en maintenant `⇧` | Si le résultat est un onglet ouvert, l'ouvrir une seconde fois dans un nouvel onglet |
| `⌘ ↩`, clic en maintenant `⌘` ou clic du milieu | Ouvrir dans un onglet en arrière-plan ; la barre de commande reste ouverte pour enchaîner avec le résultat suivant |

Tant que vous maintenez `⌥`, `⇧` ou `⌘`, l'indication affichée à droite de chaque résultat change en conséquence.

### Saisie et modes de recherche

| Touche | Action |
| --- | --- |
| `Tab` | Compléter une suggestion ; après un raccourci de site, lancer la recherche sur le site ; si le champ est vide, rechercher uniquement dans les onglets ouverts |
| `Tab` `Tab` | Si le champ est vide, ouvrir le panneau de portée de recherche ; si une portée est déjà choisie, une seule pression suffit |
| `⌥ ↑` `⌥ ↓` | Revenir à la saisie précédente ou suivante |
| `⌫` | Si le champ est vide, quitter la recherche sur le site, la portée de recherche ou la recherche dans les onglets ouverts |
| `Esc` | Quitter la recherche sur le site, la portée de recherche ou la recherche dans les onglets ouverts |
| `Esc` ou clic en dehors de la barre de commande | Fermer la barre de commande |

## Touches du nouvel onglet {#newtab-keys}

Le champ de recherche du nouvel onglet utilise les mêmes touches que la barre de commande. En plus :

| Touche ou clic | Action |
| --- | --- |
| Commencer à taper | Le texte va directement dans le champ de recherche, sans avoir à cliquer dessus |
| Clic sur un raccourci, un favori ou une carte de site | Ouvrir dans un nouvel onglet ou dans l'onglet actuel, selon vos réglages |
| Clic en maintenant `⌘` ou clic du milieu | Ouvrir dans un onglet en arrière-plan |
| `⌘ Z` | Annuler votre dernière modification des raccourcis ou des favoris : suppression, déplacement, création de dossier, etc. |
| `⌘ ⇧ Z` | Rétablir ce que vous venez d'annuler |
| `Esc` | Annuler le glisser-déposer d'un raccourci ou d'un favori |

## Touches du sélecteur d'onglets {#switcher-keys}

| Touche ou clic | Action |
| --- | --- |
| Maintenir `⌥` et appuyer plusieurs fois sur `Q` | Parcourir les onglets récents |
| `Tab`, `→` ou `↓` | Sélectionner l'onglet suivant |
| `⇧ Tab`, `←` ou `↑` | Sélectionner l'onglet précédent |
| Relâcher `⌥`, appuyer sur `↩` ou cliquer sur un onglet | Basculer vers l'onglet sélectionné |
| `Esc` ou clic en dehors du sélecteur | Fermer le sélecteur et rester sur l'onglet actuel |

Si vous avez modifié le raccourci du sélecteur, maintenez plutôt la touche de modification de votre propre raccourci.

## Touches de la capture web {#web-clip-keys}

Pendant que vous choisissez le contenu à capturer :

| Touche ou action | Action |
| --- | --- |
| `[` ou `↑` | Sélectionner l'élément extérieur |
| `]` ou `↓` | Sélectionner l'élément intérieur |
| Faire tourner la molette de la souris | Passer d'un élément extérieur à un élément intérieur |
| `↩` ou clic sur le contenu encadré | L'ouvrir dans une fenêtre flottante |
| `Esc` | Annuler la sélection |

Dans la fenêtre flottante, un clic sur un lien l'ouvre dans un nouvel onglet ; maintenez `⌘` en cliquant pour l'ouvrir en arrière-plan. Pour en savoir plus, consultez [Capture web](../web-clip/).
