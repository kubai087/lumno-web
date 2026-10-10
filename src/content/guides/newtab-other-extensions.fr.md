Si vous utilisez déjà une autre extension de nouvel onglet, comme Momentum ou Tabliss, vous pouvez la conserver et n'utiliser que la barre de commande de Lumno. La barre de commande fonctionne sur les pages web, quelle que soit l'extension qui gère le nouvel onglet.

## Quelle extension gère le nouvel onglet {#which-extension}

Une seule extension à la fois peut gérer le nouvel onglet. Lorsque plusieurs extensions de ce type sont installées, Chrome et Edge utilisent celle qui a été installée ou activée le plus récemment. Pour que le nouvel onglet affiche une autre extension, celle-ci doit donc être activée après Lumno.

## Utiliser le nouvel onglet d'une autre extension {#switch}

1. Installez Lumno et laissez-le activé.
2. Installez l'extension de nouvel onglet que vous souhaitez utiliser. Si elle est déjà installée, désactivez-la dans `chrome://extensions`, puis réactivez-la.
3. Ouvrez un nouvel onglet. Si le navigateur vous demande si vous souhaitez conserver la modification, choisissez de la conserver.

Le nouvel onglet affiche désormais la page de l'autre extension, et vous pouvez toujours ouvrir la barre de commande de Lumno sur n'importe quelle page web avec `⌘ ⇧ K` (`Ctrl + Maj + K` sous Windows).

## Lorsque le navigateur demande s'il faut conserver la modification {#keep-changes}

La première fois qu'une extension prend en charge le nouvel onglet, Chrome vous demande si vous souhaitez conserver la modification. Si vous choisissez de l'annuler, Chrome ne se contente pas de rétablir le nouvel onglet : il désactive l'extension entière. Pour Lumno, cela signifie que la barre de commande cesse également de fonctionner.

Si vous avez désactivé Lumno par erreur, réactivez-le dans `chrome://extensions`. Lumno devient alors l'extension activée le plus récemment et reprend le nouvel onglet. Pour continuer à utiliser le nouvel onglet de l'autre extension, répétez l'étape 2 de la section précédente.

## Appuyer sur le raccourci dans le nouvel onglet d'une autre extension {#shortcut}

Le nouvel onglet d'une autre extension est une page restreinte : Lumno ne peut pas y afficher sa barre de commande. Si vous appuyez sur le raccourci sur une telle page, Lumno applique l'option « Restricted page behavior » de ses réglages. Par défaut, il ouvre le nouvel onglet de Lumno pour vous permettre d'y effectuer votre recherche. Si vous ne le souhaitez pas, réglez cette option sur « Follow browser setting ».

## Revenir au nouvel onglet de Lumno {#back-to-lumno}

Désactivez l'autre extension de nouvel onglet dans `chrome://extensions`, ou désactivez puis réactivez Lumno : le nouvel onglet affiche de nouveau la page d'accueil de Lumno. La désactivation et la réactivation d'une extension n'effacent pas les réglages de Lumno.
