Si vous utilisez plusieurs ordinateurs ou navigateurs, vos raccourcis, fonds d'écran et réglages peuvent être synchronisés. Lumno n'ayant pas de serveur, la synchronisation repose sur deux outils dont vous disposez déjà : la synchronisation de votre navigateur et votre propre serveur WebDAV.

## Synchronisation du navigateur : aucune configuration requise {#browser-sync}

Si vous êtes connecté à votre navigateur et que la synchronisation est activée, les réglages de Lumno sont synchronisés automatiquement. Cela comprend le thème, les moteurs de recherche, les raccourcis, les cartes de sites épinglées, la liste de blocage, le choix du fond d'écran et les liens d'images.

Les icônes importées, les fonds d'écran locaux et les recueils de citations importés sont trop volumineux pour la synchronisation du navigateur. Pour les synchroniser également, utilisez WebDAV.

Le navigateur n'accorde à chaque extension qu'un espace de synchronisation limité. Vous pouvez ajouter jusqu'à 200 raccourcis ; ceux qui ne tiennent pas dans la synchronisation du navigateur restent uniquement sur cet ordinateur, et se synchronisent par WebDAV une fois celui-ci activé. Dans les réglages de Lumno, sous Account & sync, vous voyez combien de vos raccourcis sont synchronisés par le navigateur.

## Synchronisation WebDAV : icônes et fonds d'écran compris {#webdav}

La synchronisation WebDAV est en version bêta et désactivée par défaut. Lorsqu'elle est activée, l'ensemble de vos réglages, vos icônes de raccourcis importées, vos fonds d'écran personnalisés et vos citations importées sont stockés sur le serveur de votre choix.

1. Ouvrez les réglages de Lumno et accédez à Account & sync → WebDAV.
2. Cliquez sur « Add WebDAV » et indiquez l'adresse du serveur, le dossier de synchronisation, le nom d'utilisateur et le mot de passe d'application.
3. Si vous le souhaitez, cliquez sur « Test connectivity », puis sur « Save and turn on sync ».

Le mot de passe d'application est stocké uniquement sur l'ordinateur concerné et n'est jamais synchronisé par le navigateur. L'adresse du serveur, le dossier de synchronisation et le nom d'utilisateur, eux, sont synchronisés avec vos autres appareils, pour que vous puissiez y terminer la configuration.

## Choisir un serveur {#hosts}

Lumno a été testé avec Nextcloud auto-hébergé, avec des serveurs WebDAV Apache, nginx, rclone et WsgiDAV, ainsi qu'avec Nutstore (坚果云). Les services hébergés et les NAS comme Synology devraient fonctionner s'ils prennent en charge le WebDAV standard, mais ils n'ont pas encore été testés.

Si votre service propose des mots de passe d'application, créez-en un pour Lumno plutôt que d'utiliser le mot de passe principal de votre compte.

## Configurer un autre ordinateur {#second-device}

Si les deux ordinateurs sont connectés au même compte de navigateur, ouvrez Account & sync → WebDAV dans les réglages de Lumno sur l'autre ordinateur. Une connexion marquée « From another device » y apparaît, avec l'adresse du serveur, le dossier et le nom d'utilisateur déjà renseignés : il suffit de saisir à nouveau le mot de passe d'application. Si vous ne voulez pas l'utiliser sur cet ordinateur, cliquez sur « Dismiss ». Si les ordinateurs n'utilisent pas le même compte de navigateur, ajoutez une connexion avec le même serveur, le même dossier et le même compte.

Si le serveur contient déjà des données, Lumno vous demande quelle version utiliser ; dans la plupart des cas, choisissez « Use server version ». Avant de remplacer des données, Lumno effectue une sauvegarde complète des réglages de cet ordinateur.

Ensuite, les modifications effectuées sur les deux ordinateurs sont fusionnées automatiquement. Si les deux ordinateurs modifient la même chose avant de se synchroniser, par exemple les raccourcis ou un réglage précis, la carte signale un conflit au lieu de laisser un côté écraser l'autre. Cliquez sur « Show differences » pour comparer les modifications de chaque côté, puis choisissez la version à conserver.

## Éléments non synchronisés {#not-synced}

- L'historique, les favoris et les onglets ouverts : votre navigateur continue de les synchroniser comme d'habitude.
- Votre mot de passe d'application WebDAV : chaque appareil conserve le sien.

Si vous désactivez WebDAV ou supprimez la connexion, les fichiers restent sur votre serveur ; vous pouvez les y supprimer si vous le souhaitez. La synchronisation WebDAV n'est pas chiffrée de bout en bout : l'administrateur du serveur peut donc lire les fichiers.

## Exporter et importer {#export}

Si vous préférez ne pas utiliser la synchronisation, vous pouvez exporter votre configuration dans un fichier depuis les réglages de Lumno, puis l'importer sur un autre ordinateur. Le fichier contient vos réglages, mais pas vos images.
