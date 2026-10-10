Depuis qu'Arc ne reçoit plus de nouvelles fonctions, de nombreux utilisateurs sont passés à Chrome, Dia ou Edge, et c'est souvent la barre de commande qui leur manque le plus. L'interface de Lumno s'inspire d'Arc : vous retrouvez ainsi une barre de commande familière dans ces navigateurs.

Lumno est un projet open source indépendant, sans lien avec Arc ni avec The Browser Company.

## Correspondances entre Arc et Lumno {#mapping}

| Arc | Lumno |
| --- | --- |
| `⌘ T` ouvre la barre de commande | `⌘ ⇧ K` ouvre la barre de commande ; vous pouvez le remplacer par `⌘ T` |
| Basculer vers un onglet ouvert depuis la barre de commande | Sélectionner un résultat marqué « Opened » et appuyer sur Entrée |
| `⌃ Tab` passe d'un onglet récent à l'autre | `⌥ Q` ouvre le sélecteur d'onglets récents |
| `⌘ ⇧ C` copie l'URL | Attribuer un raccourci à « Copy Current Page URL » sur la page des extensions |
| Nouvel onglet | Le nouvel onglet de Lumno (pas encore disponible dans Dia) |

## Étapes de la migration {#steps}

1. [Installez Lumno](../install/) : depuis le Chrome Web Store pour Chrome et Dia, ou depuis les modules complémentaires Edge pour Edge.
2. Ouvrez `chrome://extensions/shortcuts` et attribuez `⌘ T` à « Open command bar ». Pour en savoir plus, consultez [Raccourcis clavier](../keyboard-shortcuts/#change).
3. Appuyez sur `⌘ T` et essayez de [chercher dans vos onglets, favoris et historique](../search-tabs-bookmarks-history/).
4. Pour passer d'une page récente à l'autre, appuyez sur `⌥ Q` afin d'ouvrir le [sélecteur d'onglets récents](../tab-switcher/).

Si le raccourci ne fonctionne pas dans Dia, remplacez sa portée « In Dia » par « Global » sur la page des extensions.

## Fonctions d'Arc que Lumno ne peut pas proposer {#limits}

La barre latérale, les espaces et l'écran partagé dépendent du navigateur lui-même ; une extension ne peut pas les ajouter. Si ces fonctions vous sont indispensables, essayez [Zen Browser](https://zen-browser.app/), un navigateur basé sur Firefox très proche d'Arc, ou [Vivaldi](https://vivaldi.com/), qui propose également une barre latérale, des espaces de travail et un écran partagé. Pour en savoir plus, consultez [Ce que Lumno ne fait pas](../limitations/).
