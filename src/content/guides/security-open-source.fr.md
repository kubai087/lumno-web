Chaque ligne du code de Lumno est publique : tout le monde peut voir ce que fait l'extension, et ce qu'elle ne fait pas.

## Open source {#open-source}

- Code : [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- Licence : GPL-3.0
- Un problème ? Ouvrez une issue sur GitHub

Chaque version publiée sur les boutiques est construite à partir de ce même code, et les changements sont listés dans les [notes de version](/fr/release/) et sur GitHub Releases.

## Conçu pour être sûr {#design}

- Manifest V3 : les navigateurs n'autorisent pas les extensions Manifest V3 à télécharger et exécuter du code distant, donc tout le code de Lumno se trouve dans le paquet vérifié.
- Aucun serveur : pas de système de compte, et nulle part où vos données seraient stockées.
- Uniquement les autorisations nécessaires, et aucune facultative.
- Votre mot de passe d'application WebDAV reste sur votre appareil et ne passe jamais par la synchro du navigateur.

## À quoi sert chaque autorisation {#permissions}

| Autorisation | Utilisée pour |
| --- | --- |
| `tabs`, `tabGroups` | Chercher, basculer et restaurer des onglets ; capturer les aperçus du sélecteur |
| `history` | Chercher dans votre historique sur votre appareil |
| `bookmarks` | Chercher, afficher et gérer les favoris |
| `topSites` | Afficher vos sites les plus visités sur le nouvel onglet |
| `storage`, `unlimitedStorage` | Enregistrer les réglages, icônes et fonds d'écran |
| `alarms` | Vérifier régulièrement l'état de la synchro WebDAV |
| `search` | Transmettre les recherches à votre moteur par défaut |
| `favicon` | Afficher les icônes de sites |
| `scripting` et accès à tous les sites | Afficher la barre de commande sur les pages, répondre aux raccourcis, actions sur le texte et image dans l'image |

L'accès à tous les sites sert uniquement à afficher la barre de commande et les fonctions similaires sur les pages. Lumno ne lit ni n'envoie le contenu des pages en masse.
