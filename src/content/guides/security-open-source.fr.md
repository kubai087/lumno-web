L'intégralité du code de Lumno est publique : chacun peut vérifier ce que fait l'extension et ce qu'elle ne fait pas.

## Open source {#open-source}

- Code : [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- Licence : GPL-3.0
- Signaler un problème : ouvrez une issue sur GitHub

Chaque version publiée sur les boutiques est construite à partir de ce même code. Les modifications sont répertoriées dans les [notes de version](/fr/release/) et sur GitHub Releases.

## Sécurité dès la conception {#design}

- Manifest V3 : les navigateurs n'autorisent pas les extensions Manifest V3 à télécharger et à exécuter du code distant. Tout le code de Lumno est donc contenu dans le paquet vérifié.
- Aucun serveur : il n'existe ni système de compte ni emplacement où vos données seraient stockées.
- Votre mot de passe d'application WebDAV est stocké uniquement sur votre appareil et n'est jamais synchronisé par le navigateur.

## Autorisations {#permissions}

Lumno demande uniquement les autorisations nécessaires, et aucune autorisation facultative. L'accès à tous les sites sert uniquement à afficher la barre de commande et les fonctions similaires sur les pages. Lumno ne lit pas et n'envoie pas le contenu des pages en masse.

L'usage de chaque autorisation est détaillé dans la [Politique de confidentialité](/fr/privacy/#permissions).
