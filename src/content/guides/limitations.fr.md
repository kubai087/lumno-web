Lumno est une extension, pas un nouveau navigateur : certaines choses, le navigateur ne le permet tout simplement pas. Les voici d'emblée, pour ne pas les découvrir après l'installation, avec des outils qui les couvrent.

## Barres latérales, espaces et écran partagé {#not-a-browser}

Les onglets verticaux, une barre latérale, les espaces d'Arc et l'écran partagé dépendent du navigateur lui-même. Une extension ne peut modifier ni la barre d'adresse ni la barre d'onglets.

- Pour des onglets verticaux, essayez [Microsoft Edge](https://www.microsoft.com/edge), qui les intègre.
- Pour une barre latérale à la Arc, des espaces de travail et l'écran partagé, essayez [Zen Browser](https://zen-browser.app/) ou [Vivaldi](https://vivaldi.com/).

## Les pages où la barre ne s'ouvre pas {#restricted-pages}

Par sécurité, les navigateurs n'autorisent pas les extensions à afficher quoi que ce soit sur ces pages :

- Les pages du navigateur commençant par `chrome://` ou `edge://`
- Le Chrome Web Store et les modules complémentaires Edge

Si vous y appuyez sur le raccourci, Lumno suit l'option « Restricted page behavior » de ses réglages.

Les fichiers locaux (PDF ou HTML commençant par `file://`) fonctionnent dès que vous activez « Autoriser l'accès aux URL de fichier » sur la page de détails de Lumno.

## Ce qui sort du navigateur {#outside-browser}

Lumno ne cherche que dans votre navigateur. Pour chercher apps, fichiers et réglages système avec un seul raccourci, essayez [Raycast](https://www.raycast.com/) ou [Alfred](https://www.alfredapp.com/) sur macOS.

## Navigateurs non pris en charge {#browsers}

- Safari n'est pas pris en charge, les navigateurs mobiles non plus.
- Dans Dia, la barre de commande fonctionne, mais pas le nouvel onglet de Lumno.
- Il manque quelques fonctions à la version Firefox. Voir [Compatibilité des navigateurs](../browser-compatibility/).

## Widgets du nouvel onglet {#widgets}

Le nouvel onglet de Lumno reste simple : ni météo, ni tâches, ni notes. Pour un nouvel onglet rempli de widgets, essayez [Momentum](https://momentumdash.com/) ou [Tabliss](https://tabliss.io/).

Le navigateur ne laisse qu'une seule extension gérer le nouvel onglet. Vous pouvez garder le leur et utiliser quand même la barre de commande de Lumno.

## Synchronisation dans le cloud {#data}

Lumno n'a pas de serveur, donc pas de compte cloud. Les réglages suivent la synchronisation de votre navigateur. Pour emporter aussi icônes et fonds d'écran, il vous faut votre propre serveur WebDAV, comme Nextcloud ou un NAS. Voir [Synchronisation](../sync/).

L'historique, les favoris et les onglets ouverts ne font pas partie de la synchro de Lumno. Votre navigateur continue de les synchroniser comme d'habitude.
