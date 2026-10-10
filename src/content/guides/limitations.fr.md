Lumno est une extension de navigateur et non un navigateur à part entière : certaines fonctions sont donc limitées par le navigateur lui-même. Voici les limites connues. Si vous avez besoin de l'une de ces fonctions, un des outils mentionnés sur cette page vous conviendra peut-être mieux.

## Pages sur lesquelles la barre de commande ne s'ouvre pas {#restricted-pages}

Pour des raisons de sécurité, les navigateurs n'autorisent pas les extensions à afficher du contenu sur les pages suivantes :

- Les pages du navigateur qui commencent par `chrome://` ou `edge://`
- Le Chrome Web Store et le site des modules complémentaires Edge

Si vous appuyez sur le raccourci sur l'une de ces pages, Lumno applique l'option « Restricted page behavior » de ses réglages.

Dans les fichiers locaux (PDF ou HTML dont l'adresse commence par `file://`), vous pouvez utiliser la barre de commande après avoir activé « Autoriser l'accès aux URL de fichier » sur la page de détails de l'extension.

## Contenu en dehors du navigateur {#outside-browser}

Lumno recherche uniquement dans le contenu de votre navigateur. Pour rechercher des apps, des fichiers et des réglages système avec un seul raccourci, essayez [Raycast](https://www.raycast.com/) ou [Alfred](https://www.alfredapp.com/) sur macOS.

## Navigateurs pris en charge {#browsers}

- Safari n'est pas pris en charge, pas plus que les navigateurs sur appareils mobiles.
- Dans Dia, la barre de commande fonctionne, mais le nouvel onglet de Lumno n'est pas disponible.
- Certaines fonctions ne sont pas disponibles dans la version Firefox. Pour en savoir plus, consultez [Compatibilité des navigateurs](../browser-compatibility/).

## Widgets du nouvel onglet {#widgets}

Le nouvel onglet de Lumno privilégie la simplicité et ne propose pas de widgets comme la météo, les tâches ou les notes. Si vous souhaitez un nouvel onglet riche en widgets, essayez [Momentum](https://momentumdash.com/) ou [Tabliss](https://tabliss.io/).

Les navigateurs ne permettent qu'à une seule extension à la fois de gérer le nouvel onglet. Vous pouvez continuer à utiliser le nouvel onglet d'une autre extension tout en utilisant la barre de commande de Lumno. Pour en savoir plus, consultez [Utiliser une autre extension de nouvel onglet](../newtab-other-extensions/).

## Synchronisation dans le cloud {#data}

Lumno n'a pas de serveur et ne propose donc pas de compte dans le cloud. Vos réglages sont synchronisés par la synchronisation intégrée de votre navigateur. Pour synchroniser également les icônes et les fonds d'écran, vous avez besoin de votre propre serveur WebDAV, par exemple Nextcloud ou un NAS. Pour en savoir plus, consultez [Synchronisation](../sync/).

L'historique, les favoris et les onglets ouverts ne font pas partie de la synchronisation de Lumno. Votre navigateur continue de les synchroniser comme d'habitude.
