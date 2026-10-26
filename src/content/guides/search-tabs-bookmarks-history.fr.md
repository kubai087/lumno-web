Avec des dizaines d'onglets ouverts et des centaines de favoris, retrouver une page prend parfois plus de temps que de l'ouvrir. Lumno réunit tout dans un seul champ de recherche : appuyez sur un raccourci, saisissez quelques lettres, et vos onglets ouverts, vos favoris et votre historique s'affichent ensemble.

## Ouvrir le champ de recherche {#open}

Appuyez sur `⌘ ⇧ K` depuis n'importe quelle page. Le champ de recherche s'affiche au centre de l'écran. Pour le fermer, appuyez sur `Esc` ou cliquez en dehors du champ.

Sur les pages restreintes, comme les paramètres `chrome://` ou les boutiques d'extensions, les navigateurs n'autorisent pas les extensions à afficher du contenu. Sur ces pages, Lumno applique l'option « Restricted page behavior » de ses réglages.

## Résultats de recherche {#results}

L'étiquette affichée à côté de chaque résultat indique sa provenance :

- Opened : un onglet actuellement ouvert. Appuyez sur Entrée pour basculer vers cet onglet au lieu d'ouvrir la page une seconde fois.
- Bookmark : une page de votre barre de favoris ou de vos dossiers ; le dossier est également indiqué.
- Frequent et History : les sites que vous visitez le plus souvent et votre historique de navigation.

Les suggestions de votre moteur de recherche s'affichent également ; appuyez sur Entrée pour lancer la recherche. Comme dans la barre d'adresse, une suggestion sélectionnée avec les flèches s'inscrit dans le champ, et `Esc` rétablit ce que vous aviez tapé. Les résultats que vous choisissez le plus souvent apparaissent plus haut.

Par défaut, le premier résultat est la page que Lumno complète pour vous. Si vous faites surtout des recherches, réglez First Search Result Priority sur Search First sous Search Result Settings dans les réglages de Lumno : la recherche passe en premier, suivie du favori, de l'entrée d'historique ou du site fréquent dont le titre correspond exactement à votre saisie.

![Lumno ouvert sur une page vide : en tapant chrome, on voit un onglet GitHub ouvert, des suggestions de recherche, un favori et des sites fréquents](search "La saisie de chrome affiche ensemble les onglets ouverts, les favoris et les sites fréquents")

Autres touches utiles : `⌥ ↩` ouvre un résultat dans l'onglet actuel, et `⇧ ↩` ouvre une seconde fois un onglet déjà ouvert. Pour la liste complète, consultez [Raccourcis clavier](../keyboard-shortcuts/#command-bar-keys).

## Ouvrir dans l'onglet actuel {#current-tab}

Quand vous ouvrez la barre de commande sur une page web, les résultats s'ouvrent dans un nouvel onglet et la page où vous étiez reste en place. Pour les ouvrir dans l'onglet actuel, comme le fait la barre d'adresse, désactivez Open in a new tab when clicked sous General → Command Bar dans les réglages de Lumno. Ensuite :

- Les pages, les recherches, les adresses saisies et les recherches sur un site s'ouvrent dans l'onglet actuel, et l'indication à droite de chaque résultat passe de New Tab à Go.
- Sur un onglet épinglé, les résultats s'ouvrent toujours dans un nouvel onglet, pour ne pas remplacer la page épinglée.
- Les onglets déjà ouverts sont toujours affichés directement.

Quel que soit le réglage, maintenez `⌥` en appuyant sur Entrée ou en cliquant pour ouvrir un résultat de l'autre façon, ou maintenez `⌘` pour l'ouvrir en arrière-plan. Le champ de recherche du nouvel onglet a son propre réglage : voir [Touches du nouvel onglet](../keyboard-shortcuts/#newtab-keys).

## Saisi avec la mauvaise disposition de clavier {#keyboard-layout}

Si votre saisie ne correspond à rien dans vos onglets, favoris ou historique, Lumno la relit comme si elle avait été tapée sur un clavier russe, ukrainien, hébreu, arabe ou coréen (2 jeux). Ainsi, `vjcrdf` trouve Москва. Cela fonctionne aussi dans l'autre sens : `пшерги`, tapé avec la disposition russe encore active, trouve GitHub. Ces résultats s'affichent sous les correspondances directes.

La recherche ignore aussi les différences comme les accents et les caractères pleine chasse, et le coréen se recherche par consonnes initiales (`ㅅㅇ` trouve 서울). Le panneau de portée de recherche fonctionne de la même façon.

Les titres chinois se trouvent en pinyin, par initiales ou en mélangeant les deux : `wxds`, `wxdushu` et `weixinds` trouvent tous 微信读书. Pour considérer z et zh, c et ch, s et sh, n et l, an et ang, en et eng, ainsi que in et ing comme identiques, activez Fuzzy pinyin sous Search Result Settings dans les réglages de Lumno.

## Rechercher uniquement dans les onglets ouverts {#open-tabs}

Si de nombreux onglets sont ouverts, vous pouvez restreindre la recherche : appuyez une fois sur `Tab` lorsque le champ est vide. « Search open tabs » s'affiche à gauche, et seuls vos onglets ouverts restent dans la liste. Saisissez un terme pour filtrer, appuyez sur Entrée pour basculer et sur `Esc` pour quitter.

![Le champ de recherche affiche « Search open tabs » à gauche, avec seulement les onglets actuellement ouverts](opentabs "Rechercher uniquement dans les onglets ouverts")

Pour rechercher uniquement dans les favoris, l'historique ou les sites fréquents, appuyez deux fois sur `Tab` lorsque le champ est vide, puis faites votre choix dans le panneau de portée de recherche.

## Fermer les autres onglets {#close-other-tabs}

Quand les onglets s'accumulent, cliquez sur l'icône de pinceau à droite du champ de recherche, puis sur « Close » dans la demande de confirmation, pour fermer les autres onglets de la fenêtre actuelle. L'onglet actuel, les onglets épinglés et ceux qui appartiennent à un groupe d'onglets restent ouverts. Ce bouton se trouve à la fois dans la barre de commande et dans le champ de recherche du nouvel onglet.

Si vous changez d'avis, cliquez à nouveau sur l'icône de pinceau, appuyez sur `Esc` ou cliquez en dehors de la demande.
