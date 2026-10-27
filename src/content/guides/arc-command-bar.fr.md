[Arc](https://arc.net/) s'arrête le 22 décembre 2026. Ensuite, Arc pour Mac et Windows ne s'ouvrira plus. Avant de quitter Arc, récupérez vos données, puis choisissez un nouveau navigateur. Lumno reprend plusieurs principes d'Arc : la barre de commande, le passage d'un onglet récent à l'autre, la restauration des onglets épinglés après un redémarrage et l'image dans l'image automatique pour les vidéos. Installez Lumno dans Chrome, Dia ou Edge pour continuer à les utiliser.

Lumno est un projet open source indépendant, sans lien avec Arc ni avec The Browser Company.

## Calendrier de l'arrêt d'Arc {#timeline}

- **22 octobre** : Arc a annoncé son arrêt. Il n'est plus possible de créer de compte Arc.
- **23 novembre** : Arc Search pour iOS et Android perd ses fonctions d'IA et ne permet plus de se connecter ni de synchroniser, mais reste utilisable comme simple navigateur.
- **15 décembre** : dernier jour pour demander une copie des données personnelles de votre compte Arc, ou leur suppression.
- **22 décembre** : Arc pour Mac et Windows cesse de fonctionner. Tous les comptes sont désactivés et les données personnelles associées sont supprimées sous 30 jours.

Après l'arrêt, vous ne pourrez plus ouvrir Arc pour accéder aux données enregistrées sur votre ordinateur. Pour tous les détails, consultez l'article d'Arc [Arc Sunset: Key Dates and What to Expect](https://resources.arc.net/hc/en-us/articles/44412972248471).

## Exportez vos données avant le 22 décembre {#export}

- **Vers Dia** : aucun export nécessaire. Installez Dia et choisissez d'importer depuis Arc. Vos espaces, onglets épinglés, dossiers, favoris, historique, mots de passe et extensions sont repris, et les espaces deviennent des profils Dia. Gardez Arc installé jusqu'à la fin de l'import. Voir [Move from Arc to Dia](https://resources.arc.net/hc/en-us/articles/44413129117591).
- **Vers un autre navigateur** : dans les réglages d'Arc, ouvrez « Advanced » et choisissez « Export Data ». Arc enregistre un fichier `Arc Data Export.md` qui liste, espace par espace, les liens de vos favoris, onglets épinglés et dossiers. C'est une liste de liens et non un fichier de favoris : ouvrez ou ajoutez vous-même aux favoris ceux que vous voulez garder dans votre nouveau navigateur. Voir [How Do I Export My Data from Arc?](https://resources.arc.net/hc/en-us/articles/25583851606039).

Les Easels et les Boosts ne peuvent pas être exportés et ne sont pas repris dans Dia.

## Vous utilisiez Lumno dans Arc ? Emportez vos réglages {#lumno-settings}

Lumno enregistre ses réglages dans le navigateur où il est installé : une fois Arc arrêté, impossible de les récupérer. Avant de changer, [exportez vos réglages](../sync/#export) dans Lumno, puis importez-les après avoir installé Lumno dans votre nouveau navigateur. Vous pouvez aussi activer la [synchronisation WebDAV](../sync/), qui emporte aussi vos icônes et fonds d'écran.

Même si Dia reprend l'extension, exportez d'abord une copie, par précaution.

## Choisir votre prochain navigateur {#choose}

| Navigateur | Points communs avec Arc | Avec Lumno |
| --- | --- | --- |
| Dia | Conçu par la même équipe, avec barre latérale, onglets épinglés et sélecteur d'onglets ; importe directement depuis Arc | Barre de commande disponible, nouvel onglet pas encore |
| Chrome, Edge | Ni barre latérale ni espaces, mais le plus grand choix d'extensions | Tout fonctionne |
| [Zen Browser](https://zen-browser.app/) | Basé sur Firefox, avec barre latérale, espaces de travail et écran partagé, très proche d'Arc | À installer depuis les modules complémentaires Firefox, quelques fonctions limitées |
| [Vivaldi](https://vivaldi.com/) | Barre latérale, espaces de travail et écran partagé | Tout fonctionne |

Pour le détail par navigateur, consultez [Compatibilité des navigateurs](../browser-compatibility/).

## Correspondances entre Arc et Lumno {#mapping}

| Arc | Lumno |
| --- | --- |
| `⌘ T` ouvre la barre de commande | `⌘ ⇧ K` ouvre la barre de commande ; vous pouvez le remplacer par `⌘ T` |
| Basculer vers un onglet ouvert depuis la barre de commande | Sélectionner un résultat marqué « Opened » et appuyer sur Entrée |
| `⌃ Tab` passe d'un onglet récent à l'autre | `⌥ Q` ouvre le sélecteur d'onglets récents |
| `⌘ ⇧ C` copie l'URL | Attribuer un raccourci à « Copy Current Page URL » sur la page des extensions |
| Les onglets épinglés sont conservés après un redémarrage | Activer « Restore Pinned Tabs After Restart » dans les réglages de Lumno |
| Les vidéos passent en image dans l'image quand vous changez d'onglet | [Image dans l'image automatique](../auto-pip/), activée par défaut |
| Nouvel onglet | Le nouvel onglet de Lumno (pas encore disponible dans Dia) |

## Étapes de la migration {#steps}

1. [Installez Lumno](../install/) : depuis le Chrome Web Store pour Chrome et Dia, ou depuis les modules complémentaires Edge pour Edge.
2. Ouvrez `chrome://extensions/shortcuts` et attribuez `⌘ T` à « Open command bar », comme dans Arc et [Zen](https://zen-browser.app/). Pour en savoir plus, consultez [Raccourcis clavier](../keyboard-shortcuts/#change). Dans Dia, libérez d'abord `⌘ T` (voir ci-dessous).
3. Appuyez sur `⌘ T` et essayez de [chercher dans vos onglets, favoris et historique](../search-tabs-bookmarks-history/).
4. Pour passer d'une page récente à l'autre, appuyez sur `⌥ Q` afin d'ouvrir le [sélecteur d'onglets récents](../tab-switcher/).

Les raccourcis de Dia sont prioritaires : dans Dia, ouvrez d'abord Settings → Shortcuts et remplacez le raccourci `⌘ T` de « New Tab » par une autre touche. Pour en savoir plus, consultez [Compatibilité des navigateurs](../browser-compatibility/#dia). Si le raccourci ne fonctionne pas dans Dia, remplacez sa portée « In Dia » par « Global » sur la page des extensions.

## Fonctions d'Arc que Lumno ne peut pas proposer {#limits}

La barre latérale, les espaces et l'écran partagé dépendent du navigateur lui-même ; une extension ne peut pas les ajouter. Si ces fonctions vous sont indispensables, choisissez Dia, Zen ou Vivaldi dans le tableau ci-dessus. Pour en savoir plus, consultez [Ce que Lumno ne fait pas](../limitations/).
