Lumno n'est qu'une extension de navigateur, pas un nouveau navigateur, et certaines choses lui échappent encore. Voici les manques que nous connaissons. Si vous avez besoin de l'une de ces fonctions, l'un des outils cités ici vous conviendra peut-être mieux.

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
