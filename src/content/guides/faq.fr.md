Retrouvez ici les réponses aux questions les plus fréquentes posées sur notre site et dans la communauté. Chaque réponse renvoie vers une page plus détaillée.

## Utilisation {#using}

### Quel est le raccourci par défaut ? Peut-on le modifier ?

Le raccourci par défaut est `⌘ ⇧ K | ⌘ ⇧ K` sur Mac et `Ctrl + Maj + K` sous Windows et Linux. Vous pouvez le modifier dans `chrome://extensions/shortcuts`. Pour en savoir plus, consultez [Raccourcis clavier](../keyboard-shortcuts/#change).

### Que faire si le raccourci ne fonctionne pas ?

Vérifiez d'abord que vous ne vous trouvez pas sur une page restreinte, comme les paramètres `chrome://` ou une boutique d'extensions. Vérifiez ensuite dans `chrome://extensions/shortcuts` qu'aucune autre extension n'utilise le même raccourci. Dans Dia, vous devez également régler la portée indiquée à côté du raccourci sur « Global ».

### Pourquoi la barre de commande ne s'ouvre-t-elle pas sur certaines pages ?

Les navigateurs n'autorisent pas les extensions à s'exécuter sur les pages restreintes, comme les paramètres `chrome://` ou les boutiques d'extensions. Si vous appuyez sur le raccourci sur l'une de ces pages, Lumno applique l'option « Restricted page behavior » de ses réglages et ouvre par défaut la recherche dans un nouvel onglet. Pour utiliser Lumno dans des fichiers PDF ou HTML locaux, activez « Autoriser l'accès aux URL de fichier » sur la page de détails de l'extension. Pour en savoir plus, consultez [Ce que Lumno ne fait pas](../limitations/#restricted-pages).

### Pourquoi le mode clair ou sombre de la barre de commande ne correspond-il pas à celui de mon système ?

En mode « Follow system », la barre de commande tient également compte des couleurs de la page actuelle. Pour qu'elle suive uniquement votre système, désactivez « Adapt theme colors to each webpage » dans la section Appearance des réglages de Lumno.

### Si je viens d'Arc, puis-je retrouver une barre de commande familière ?

Oui. L'interface de Lumno s'inspire d'[Arc](https://arc.net/) (sans aucun lien avec Arc), et vous pouvez ouvrir la barre de commande à tout moment dans Dia, Chrome ou Edge. Attribuez `⌘ T` au raccourci pour conserver vos habitudes d'Arc. Pour en savoir plus, consultez [Venir d'Arc](../arc-command-bar/).

## Nouvel onglet {#new-tab}

### Puis-je utiliser uniquement la barre de commande et conserver une autre extension de nouvel onglet ?

Oui. Laissez Lumno activé, puis réinstallez votre autre extension de nouvel onglet ou désactivez-la et réactivez-la afin qu'elle reprenne le nouvel onglet. La barre de commande n'est pas concernée. Pour les étapes détaillées, consultez [Utiliser une autre extension de nouvel onglet](../newtab-other-extensions/).

### Pourquoi la barre d'adresse affiche-t-elle une URL d'extension dans le nouvel onglet ?

Cela est dû à l'option « Automatically focus input » : pour placer le curseur directement dans le champ de recherche de Lumno, la barre d'adresse affiche l'URL de l'extension. Désactivez cette option dans les réglages Appearance du nouvel onglet pour que la barre d'adresse reste vide.

## Compatibilité {#compatibility}

### Quels navigateurs sont pris en charge ?

Lumno prend en charge les navigateurs Chromium comme Chrome, Edge, Dia, Brave et Vivaldi. Safari n'est pas encore pris en charge. Dans Dia, la barre de commande fonctionne, mais le nouvel onglet de Lumno n'est pas encore disponible. Pour en savoir plus, consultez [Compatibilité des navigateurs](../browser-compatibility/).

## Données et synchronisation {#data}

### Puis-je synchroniser mes réglages entre plusieurs appareils ?

Oui. Par défaut, les réglages sont synchronisés par votre compte de navigateur. Activez la synchronisation WebDAV (avec Nextcloud, Nutstore ou votre propre serveur) pour synchroniser également les icônes et les fonds d'écran, y compris entre différents navigateurs. Pour en savoir plus, consultez [Synchronisation](../sync/).

### Lumno envoie-t-il mes données de navigation ?

Non. Les onglets, les favoris et l'historique sont recherchés sur votre appareil. Ce que vous saisissez n'est envoyé que lorsque vous effectuez une recherche sur le web ou posez une question à une IA, et uniquement au moteur de recherche ou au site d'IA que vous avez choisi. Pour en savoir plus, consultez la [Politique de confidentialité](/fr/privacy/).

### Lumno est-il gratuit ? Faut-il créer un compte ?

Lumno est entièrement gratuit et open source sous licence GPL-3.0 sur [GitHub](https://github.com/kubai087/lumno-extension). Comme il n'existe aucun système de compte, vous pouvez l'utiliser dès l'installation, sans inscription.
