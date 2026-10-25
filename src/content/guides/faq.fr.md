Retrouvez ici les réponses aux questions les plus fréquentes posées sur notre site et dans la communauté. Chaque réponse renvoie vers une page plus détaillée.

## Utilisation {#using}

### Quel est le raccourci par défaut ? Peut-on le modifier ?

Le raccourci par défaut est `⌘ ⇧ K | ⌘ ⇧ K` sur Mac et `Ctrl + Maj + K` sous Windows et Linux. Vous pouvez le modifier dans `chrome://extensions/shortcuts`. Pour en savoir plus, consultez [Raccourcis clavier](../keyboard-shortcuts/#change). La version Firefox utilise un autre raccourci par défaut : consultez [Compatibilité des navigateurs](../browser-compatibility/#firefox).

### Que faire si le raccourci ne fonctionne pas ?

Vérifiez d'abord que vous ne vous trouvez pas sur une page restreinte, comme les paramètres `chrome://` ou une boutique d'extensions. Vérifiez ensuite dans `chrome://extensions/shortcuts` qu'aucune autre extension n'utilise le même raccourci. Dans Dia, vous devez également régler la portée indiquée à côté du raccourci sur « Global ».

### Pourquoi un nouvel onglet s'ouvre-t-il à la place de la barre de commande sur certaines pages ?

Pour des raisons de sécurité, les navigateurs n'autorisent aucune extension à s'exécuter ou à afficher une interface sur les pages restreintes, comme les paramètres `chrome://`, la page des extensions, le Chrome Web Store ou le site des modules complémentaires Edge, et Lumno ne peut pas le contourner. Si vous appuyez sur le raccourci sur l'une de ces pages, Lumno ouvre à la place un nouvel onglet avec le champ de recherche. Ce n'est pas un bug : sur les pages web ordinaires, la barre de commande s'affiche toujours directement sur la page. Ouvrir une page comme `chrome://inspect/#devices` depuis un raccourci n'est pas concerné. Pour utiliser Lumno dans des fichiers PDF ou HTML locaux, activez « Autoriser l'accès aux URL de fichier » sur la page de détails de l'extension. Pour en savoir plus, consultez [Ce que Lumno ne fait pas](../limitations/#restricted-pages).

### Pourquoi le mode clair ou sombre de la barre de commande ne correspond-il pas à celui de mon système ?

En mode « Follow system », la barre de commande tient également compte des couleurs de la page actuelle. Pour qu'elle suive uniquement votre système, désactivez « Adapt theme colors to each webpage » dans la section Appearance des réglages de Lumno.

### Si je viens d'Arc, puis-je retrouver une barre de commande familière ?

Oui. L'interface de Lumno s'inspire d'[Arc](https://arc.net/) (sans aucun lien avec Arc), et vous pouvez ouvrir la barre de commande à tout moment dans Dia, Chrome ou Edge. Attribuez `⌘ T` au raccourci pour conserver vos habitudes d'Arc. Dans Dia, libérez d'abord `⌘ T` : consultez [Compatibilité des navigateurs](../browser-compatibility/#dia). Pour en savoir plus, consultez [Venir d'Arc](../arc-command-bar/).

### Puis-je changer d'onglet avec Ctrl+Tab, comme dans Arc ?

Oui. La page des raccourcis du navigateur n'accepte pas `⌃ Tab`, mais vous pouvez exécuter quelques lignes de code dans la console de cette page pour en faire le raccourci du sélecteur de Lumno. Consultez [Ouvrir le sélecteur avec Ctrl+Tab](../tab-switcher/#ctrl-tab).

## Nouvel onglet {#new-tab}

### Puis-je utiliser uniquement la barre de commande et conserver une autre extension de nouvel onglet ?

Oui. Laissez Lumno activé, puis réinstallez votre autre extension de nouvel onglet ou désactivez-la et réactivez-la afin qu'elle reprenne le nouvel onglet. La barre de commande n'est pas concernée. Pour les étapes détaillées, consultez [Utiliser une autre extension de nouvel onglet](../newtab-other-extensions/).

### Pourquoi la barre d'adresse affiche-t-elle une URL d'extension dans le nouvel onglet ?

Cela est dû à l'option « Automatically focus input » : pour placer le curseur directement dans le champ de recherche de Lumno, la barre d'adresse affiche l'URL de l'extension. Désactivez cette option dans les réglages Appearance du nouvel onglet pour que la barre d'adresse reste vide.

## Compatibilité {#compatibility}

### Quels navigateurs sont pris en charge ?

Lumno prend en charge les navigateurs Chromium comme Chrome, Edge, Dia, Brave et Vivaldi, ainsi que Firefox 140 et versions ultérieures et les navigateurs basés sur Firefox comme Zen. Safari n'est pas encore pris en charge. Dans Dia, la barre de commande fonctionne, mais le nouvel onglet de Lumno n'est pas encore disponible. Pour en savoir plus, consultez [Compatibilité des navigateurs](../browser-compatibility/).

### En quoi la version Firefox diffère-t-elle de la version Chrome ?

Les fonctions principales sont les mêmes, à quelques limites de Firefox près : la capture web et l'image dans l'image automatique ne sont pas disponibles, la barre de commande ne s'ouvre ni sur les pages `about:`, ni sur le site des modules complémentaires, ni dans les fichiers locaux, et le raccourci par défaut est `⌃ ⇧ K | Alt + K`. Pour en savoir plus, consultez [Compatibilité des navigateurs](../browser-compatibility/#firefox).

### Lumno fonctionne-t-il dans Zen, LibreWolf et les autres navigateurs basés sur Firefox ?

Oui. Ces navigateurs utilisent la version Firefox, à installer depuis les [modules complémentaires Firefox](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/). Le navigateur doit reposer sur Firefox 140 ou une version ultérieure.

### Lumno fonctionne-t-il dans Safari ou sur mobile ?

Pas encore. Le système d'extensions de Safari est très différent de celui de Chromium : il n'existe donc pas de version Safari de Lumno, et les navigateurs sur téléphone et tablette ne sont pas pris en charge. Si vous consultez ce site sur un téléphone connecté à votre compte Google, vous pouvez déjà appuyer sur Installer : Lumno s'installera automatiquement la prochaine fois que vous ouvrirez Chrome sur un ordinateur connecté au même compte, avec la synchronisation activée. Pour en savoir plus, consultez [Compatibilité des navigateurs](../browser-compatibility/#safari).

## Données et synchronisation {#data}

### Puis-je synchroniser mes réglages entre plusieurs appareils ?

Oui. Par défaut, les réglages sont synchronisés par votre compte de navigateur. Activez la synchronisation WebDAV (avec Nextcloud, Nutstore ou votre propre serveur) pour synchroniser également les icônes et les fonds d'écran, y compris entre différents navigateurs. Pour en savoir plus, consultez [Synchronisation](../sync/).

### Lumno envoie-t-il mes données de navigation ?

Non. Les onglets, les favoris et l'historique sont recherchés sur votre appareil. Ce que vous saisissez n'est envoyé que lorsque vous effectuez une recherche sur le web ou posez une question à une IA, et uniquement au moteur de recherche ou au site d'IA que vous avez choisi. Pour en savoir plus, consultez la [Politique de confidentialité](/fr/privacy/).

### Lumno est-il gratuit ? Faut-il créer un compte ?

Lumno est entièrement gratuit et open source sous licence GPL-3.0 sur [GitHub](https://github.com/kubai087/lumno-extension). Comme il n'existe aucun système de compte, vous pouvez l'utiliser dès l'installation, sans inscription.
