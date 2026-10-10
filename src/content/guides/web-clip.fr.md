La capture web place une partie d'une page dans sa propre fenêtre flottante : un tableau, un bloc de code ou un graphique, par exemple. La fenêtre reste au-dessus des autres, même lorsque vous changez d'onglet ou d'app, pour que vous l'ayez toujours sous les yeux pendant votre lecture.

## Activer la capture web {#enable}

La capture web est désactivée par défaut. Pour l'utiliser, activez « Web Clip » dans les réglages de Lumno.

## Capturer une partie de page {#how}

1. Sur la page voulue, appuyez sur `⌘ ⇧ K` (`Ctrl + Shift + K` sous Windows) pour ouvrir la barre de commandes, saisissez `/clip`, puis appuyez sur Entrée.

![Barre de commandes avec /clip saisi et le résultat « Start Web Clip »](clip-command "Saisissez /clip dans la barre de commandes")

2. Déplacez le pointeur sur la page. Lumno entoure d'un cadre en pointillés la zone qu'il peut capturer.
3. Si le cadre est trop grand ou trop petit, faites défiler pour changer de zone. Vous pouvez aussi appuyer sur `[` ou `↑` pour sélectionner l'élément parent, ou sur `]` ou `↓` pour un élément qu'il contient.
4. Cliquez sur le contenu encadré pour l'ouvrir dans une fenêtre flottante. Pour annuler, appuyez sur `Esc`.

![Une indication en haut d'une page d'article ; en dessous, le tableau des propriétés CSS est entouré d'un cadre en pointillés](clip-picker "Choisissez le contenu avec le cadre en pointillés")

## La fenêtre flottante {#window}

- La fenêtre affiche une copie du contenu choisi. Lorsque cette partie de la page d'origine change, la fenêtre est mise à jour.
- Un clic sur un lien dans la fenêtre l'ouvre dans un nouvel onglet du navigateur. Pour l'ouvrir en arrière-plan, maintenez `⌘` (`Ctrl` sous Windows) en cliquant.
- Placez le pointeur en bas de la fenêtre pour afficher les boutons « Reselect » et « Close ».
- Vous pouvez déplacer et redimensionner la fenêtre comme n'importe quelle autre.

## Limites {#limits}

La capture web repose sur le Document Picture-in-Picture du navigateur et présente donc les limites suivantes :

- Elle fonctionne uniquement sur la page principale d'un site HTTPS, pas dans les cadres intégrés (iframes).
- Elle n'est pas disponible sur les sites qui désactivent l'image dans l'image par leur politique.
- Si une vidéo est déjà lue en image dans l'image, fermez-la d'abord.
- Une zone trop petite ne peut pas flotter. Choisissez plutôt une zone plus grande.
- Une seule fenêtre flottante peut être ouverte à la fois.

Firefox ne prend pas en charge le Document Picture-in-Picture : cette fonction n'est donc pas disponible dans la version Firefox.
