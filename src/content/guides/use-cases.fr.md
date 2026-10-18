Voici quelques usages courants de Lumno, chacun accompagné des étapes à suivre. Retenez ceux qui correspondent à votre façon de travailler.

## Lorsque des dizaines d'onglets sont ouverts {#many-tabs}

Lorsque de nombreux onglets sont ouverts, leurs titres se réduisent et il devient difficile de trouver le bon. Dans ce cas, recherchez uniquement dans les onglets ouverts :

1. Appuyez sur `⌘ ⇧ K` pour ouvrir la barre de commande.
2. Lorsque le champ est vide, appuyez une fois sur `Tab`. « Search open tabs » s'affiche à gauche.
3. Saisissez une partie du titre de la page, par exemple « layout », sélectionnez la page souhaitée et appuyez sur Entrée pour y basculer.

![La barre de commande en mode « Search open tabs » : la saisie de layout affiche quatre onglets MDN ouverts dont le titre contient layout, chacun avec Switch à droite](uc-tabs "Rechercher uniquement dans les onglets ouverts")

Les onglets ouverts apparaissent également dans une recherche normale, avec la mention « Opened ». Appuyez sur Entrée pour basculer vers l'onglet au lieu d'ouvrir la page une seconde fois. Pour passer d'une des deux ou trois dernières pages à l'autre, `⌥ Q` est encore plus rapide.

Si vos onglets ralentissent votre ordinateur, vous pouvez également utiliser l'économiseur de mémoire intégré à Chrome, ou regrouper vos onglets dans une liste avec [OneTab](https://www.one-tab.com/).

Pour en savoir plus, consultez [Chercher dans les onglets, les favoris et l'historique](../search-tabs-bookmarks-history/) et [Passer d'un onglet récent à l'autre](../tab-switcher/).

## Lorsque vous venez d'Arc {#from-arc}

Depuis qu'[Arc](https://arc.net/) ne reçoit plus de nouvelles fonctions, de nombreux utilisateurs sont passés à Dia, Chrome ou Edge. Lumno s'inspire de la barre de commande d'Arc, du passage d'un onglet récent à l'autre, de la restauration des onglets épinglés et de l'image dans l'image automatique. Après avoir installé Lumno, suivez ces étapes pour configurer la barre de commande :

1. Ouvrez `chrome://extensions/shortcuts` dans la barre d'adresse.
2. Repérez Lumno et attribuez `⌘ T` à « Open command bar ».
3. Ouvrez désormais la barre de commande avec `⌘ T`, et passez d'un onglet récent à l'autre avec `⌥ Q`, comme avec `⌃ Tab` dans Arc.

![La page des raccourcis d'extensions du navigateur : « Open command bar » de Lumno réglé sur ⇧⌘K et « Open recent tab switcher » sur ⌥Q](shortcuts "Modifier les raccourcis de Lumno sur la page des extensions")

Pour en savoir plus, consultez [Venir d'Arc](../arc-command-bar/).

## Lorsque vous consultez souvent la documentation et GitHub {#developers}

Saisissez le raccourci d'un site et appuyez sur `Tab` pour effectuer une recherche directement sur ce site, sans passer par sa page d'accueil. Par exemple, saisissez `gh`, appuyez sur `Tab`, saisissez `command palette`, puis appuyez sur Entrée pour ouvrir les résultats de recherche de GitHub. Parmi les autres raccourcis courants figurent `mdn`, `npm` et `sf` (Stack Overflow).

![Le champ affiche GitHub à gauche ; en tapant command palette, Lumno propose de chercher command palette sur GitHub](sitesearch "Saisir gh puis appuyer sur Tab pour rechercher directement sur GitHub")

- Saisissez une adresse comme `chrome://extensions` pour l'ouvrir directement.
- Ajoutez la documentation interne ou l'outil de suivi des tickets de votre entreprise comme recherche personnalisée dans les réglages de Lumno, avec le raccourci de votre choix. Pour en savoir plus, consultez [Ajouter une recherche personnalisée](../site-search/#custom).

## Lorsque vous faites des recherches et rédigez {#research}

Il arrive de se souvenir d'un article sans savoir s'il a été ajouté aux favoris ou simplement consulté. Saisissez un mot-clé dans la barre de commande pour rechercher à la fois dans vos favoris et dans votre historique. L'étiquette affichée à côté de chaque résultat indique sa provenance, et les favoris indiquent également leur dossier.

![La saisie de css grid trouve une page de l'historique et une page MDN dans le dossier de favoris CSS reading](uc-research "Rechercher à la fois dans les favoris et l'historique")

Si un passage est difficile à comprendre, utilisez les actions rapides sur la sélection (Selection quick actions) : sélectionnez le texte, et un bouton Lumno apparaît à côté. Cliquez dessus pour choisir une action comme « Answer », « Explain » ou « Research » ; Lumno ouvre la réponse de l'IA dans un nouvel onglet. Lumno vérifie d'abord si le texte a probablement besoin d'aide : le bouton n'apparaît donc pas à chaque sélection. Cette fonction est désactivée par défaut ; vous pouvez l'activer dans la section Labs des réglages de Lumno. Pour en savoir plus, consultez [Actions rapides sur la sélection](../selection-actions/).

![Dans un article, une phrase sur l'unité fr est sélectionnée, avec les actions Answer, Explain et Research à côté](uc-selection "Sélectionner du texte pour demander à l'IA de l'expliquer ou de faire une recherche")

## Lorsque vous interrogez d'abord une IA {#ai}

Saisissez le raccourci d'une IA, par exemple `gpt` (ChatGPT), `gm` (Gemini) ou `pplx` (Perplexity), puis appuyez sur `Tab`. Rédigez ensuite votre question et appuyez sur Entrée. Lumno ouvre l'application web de l'IA et envoie la question pour vous : inutile d'ouvrir le site et d'y coller votre question.

![Le champ affiche ChatGPT à gauche avec une question sur les alternatives à la barre de commande d'Arc, prêt à ouvrir ChatGPT](ai "Saisir gpt puis appuyer sur Tab pour envoyer la question à ChatGPT")

Pour en savoir plus, consultez [Recherche sur site et questions à l'IA](../site-search/#ai).

## Lorsque vous souhaitez un nouvel onglet épuré {#quiet-new-tab}

Le nouvel onglet de Lumno peut n'afficher que ce dont vous avez besoin :

- Fond d'écran : choisissez un tableau qui vous plaît, ou affichez chaque jour une nouvelle photo Bing.
- Horloge : affichez l'heure au-dessus du champ de recherche.
- Mode Zen : lorsque vous avez besoin de vous concentrer, saisissez `/zen` dans le champ de recherche du nouvel onglet pour ne garder que le champ de recherche et le fond d'écran.

![Le nouvel onglet complet : l'horloge 09:41 et le champ de recherche en haut, puis une rangée de raccourcis, huit favoris et les sites les plus visités, sur un verger impressionniste](nt-clock "Une horloge au-dessus du champ de recherche")

Pour en savoir plus, consultez [Changer le fond d'écran](../newtab-wallpaper/) et [Horloge et mode Zen](../newtab-clock-zen/).

## Lorsque vous suivez une série ou un roman-feuilleton {#series}

Lorsque vous regardez une série ou lisez un roman-feuilleton, Lumno peut mémoriser, dans le nouvel onglet, l'épisode ou le chapitre où vous en êtes :

1. Ouvrez l'épisode ou le chapitre en cours. Il apparaît ensuite parmi les cartes de sites en bas du nouvel onglet. S'il n'apparaît pas, placez le pointeur sur « Most Visited » en haut à gauche des cartes et passez à « Recent ».
2. Survolez la carte et cliquez sur l'icône en forme d'épingle. Lorsque Lumno reconnaît une page d'épisode ou de chapitre, il commence automatiquement à suivre votre progression, et la carte affiche une icône radar. Si le suivi ne démarre pas, faites un clic droit sur la carte et choisissez « Track progress ».
3. Lorsque vous passez à l'épisode ou au chapitre suivant du même titre, la carte est mise à jour automatiquement. La prochaine fois, cliquez sur la carte pour reprendre là où vous vous étiez arrêté.

![Les cartes de sites en bas du nouvel onglet : des cartes Crunchyroll et Wandering Inn épinglées avec une icône radar, suivies de GitHub et Material](uc-series "Les cartes avec une icône radar suivent votre progression")

Pour en savoir plus, consultez [Sites fréquents et cartes de progression](../newtab-frequent-sites/).
