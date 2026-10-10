Nouvel ordinateur, ou plusieurs navigateurs à la fois ? Vos raccourcis, fonds d'écran et réglages peuvent vous suivre. Lumno n'a pas de serveur à lui : la synchro s'appuie sur deux choses que vous avez déjà, la synchronisation de votre navigateur et votre propre serveur WebDAV.

## Synchro du navigateur : rien à faire {#browser-sync}

Si vous êtes connecté à votre navigateur avec la synchronisation activée, les réglages de Lumno vous suivent automatiquement : thème, moteurs de recherche, raccourcis, cartes de sites épinglées, liste de blocage, ainsi que votre choix de fond d'écran et vos liens d'images.

Les icônes importées et les fonds d'écran locaux sont trop lourds pour la synchro du navigateur. Pour les emporter aussi, utilisez WebDAV.

## Synchro WebDAV : icônes et fonds d'écran aussi {#webdav}

La synchro WebDAV est en bêta et désactivée par défaut. Une fois activée, vos réglages complets, vos icônes de raccourcis importées et vos fonds d'écran personnalisés sont stockés sur le serveur de votre choix.

1. Ouvrez les réglages de Lumno, allez dans « Account & sync », puis WebDAV.
2. Cliquez sur « Add WebDAV » et renseignez l'adresse du serveur, le dossier de synchro, le nom d'utilisateur et le mot de passe d'application.
3. Si vous le souhaitez, cliquez sur « Test connectivity », puis sur « Save and turn on sync ».

Ajoutez la connexion sur chaque appareil. Le nom d'utilisateur et le mot de passe restent sur l'ordinateur concerné et ne transitent jamais par la synchro du navigateur.

## Où héberger vos données {#hosts}

Lumno a été testé avec Nextcloud auto-hébergé, des serveurs WebDAV Apache, nginx, rclone et WsgiDAV, ainsi qu'avec Nutstore. Les services hébergés et les NAS comme Synology devraient fonctionner s'ils prennent en charge le WebDAV standard, mais ne sont pas encore vérifiés.

Si votre service le propose, utilisez un mot de passe d'application dédié à Lumno plutôt que le mot de passe principal de votre compte.

## Sur votre deuxième ordinateur {#second-device}

Ajoutez le même serveur, le même dossier et le même compte. Si le serveur contient déjà des données, Lumno vous demande quelle version utiliser ; en général, choisissez « Use server version ». Avant de remplacer quoi que ce soit, Lumno fait une sauvegarde complète des réglages de cet ordinateur.

Ensuite, les modifications des deux côtés fusionnent automatiquement. Si deux ordinateurs modifient la même chose, comme les raccourcis, la carte signale un conflit. Cliquez sur « Show differences » pour voir ce que chaque côté a changé, puis choisissez.

## Ce qui ne se synchronise pas {#not-synced}

- L'historique, les favoris et les onglets ouverts : votre navigateur continue de les synchroniser comme d'habitude.
- Votre nom d'utilisateur et votre mot de passe WebDAV : chaque appareil garde les siens.

Désactiver WebDAV ou supprimer la connexion laisse les fichiers sur votre serveur ; supprimez-les là-bas si vous le souhaitez. WebDAV n'est pas chiffré de bout en bout : l'administrateur du serveur peut lire les fichiers.

## Exporter et importer {#export}

Vous préférez ne pas synchroniser ? Exportez votre configuration dans un fichier depuis les réglages de Lumno, puis importez-la sur l'autre ordinateur. Le fichier contient vos réglages, pas vos images.
