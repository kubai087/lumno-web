## 1. Champ d’application et responsable

La présente politique de confidentialité (la «&nbsp;Politique&nbsp;») explique comment l’extension de navigateur Lumno (l’«&nbsp;extension&nbsp;») et les pages publiques du site Lumno (`lumno.kubai.design`, le «&nbsp;site&nbsp;») traitent les informations vous concernant. Elle est rédigée d’après la mise en œuvre réelle de la version **0.9.58** de l’extension et s’applique à cette version et aux suivantes jusqu’à sa prochaine mise à jour.

- **Développeur et responsable du traitement&nbsp;:** Lumno est développé et maintenu par un développeur indépendant, Kubai087 (枯白啃设计), responsable des traitements décrits dans la présente Politique.
- **Contact&nbsp;:** [i@kubai.design](mailto:i@kubai.design). Voir aussi la section&nbsp;15.
- **Date d’entrée en vigueur&nbsp;:** 10&nbsp;octobre&nbsp;2026.
- **Langue de référence&nbsp;:** la version en chinois simplifié de la présente Politique fait foi. Les autres versions sont des traductions fournies à titre indicatif&nbsp;; en cas de divergence, la version en chinois simplifié prévaut.

Lumno ne propose ni compte ni stockage dans le cloud, et n’exploite aucun serveur qui stocke des données d’utilisateurs. La connexion à un compte, la synchronisation dans le cloud et les statistiques d’utilisation du produit ont été retirées de l’extension dans la version 0.9.40.

Dans la présente Politique, «&nbsp;données personnelles&nbsp;» désigne toute information enregistrée sous forme électronique se rapportant à une personne physique identifiée ou identifiable. Rien dans cette Politique ne limite les droits que vous confère la loi applicable.

## 2. Comment nous traitons les informations

Les fonctionnalités principales de Lumno s’exécutent dans votre navigateur. Pour fournir les fonctionnalités que vous voyez et utilisez dans son interface, l’extension lit ou enregistre les informations suivantes sur votre appareil. **Sauf dans les cas décrits à la section&nbsp;4, ces informations ne quittent jamais votre appareil et ne sont jamais envoyées à Lumno ni à son développeur.**

### 2.1 Données du navigateur

- **Onglets&nbsp;:** URL, titres, groupes et icônes, pour rechercher, basculer, trier, restaurer et gérer les onglets. Lorsque vous utilisez le sélecteur d’onglets, l’extension capture l’onglet courant sous forme de miniature&nbsp;; elle en conserve au plus 12, chacune pendant 2&nbsp;heures maximum, uniquement sur votre appareil.
- **Historique&nbsp;:** URL, titres et heures de visite, pour rechercher et classer l’historique en local, et supprimer des entrées à votre demande.
- **Favoris&nbsp;:** arborescence des dossiers, noms et URL, pour rechercher, afficher et gérer les favoris à votre demande.
- **Sites les plus visités&nbsp;:** URL et titres, à afficher dans le nouvel onglet. Les cartes de sites que vous épinglez ou masquez sont enregistrées comme réglages.

### 2.2 Contenu des pages

- **Raccourcis et barre de commande&nbsp;:** détecte les raccourcis clavier de Lumno sur les pages web et affiche la barre de commande.
- **Actions sur la sélection&nbsp;:** désactivées par défaut. Une fois activées, l’extension lit le texte que vous sélectionnez (jusqu’à 2&nbsp;400&nbsp;caractères) et ne l’utilise que lorsque vous choisissez une action.
- **Picture-in-picture automatique&nbsp;:** repère l’élément vidéo sur les sites vidéo pris en charge pour ouvrir le picture-in-picture.
- **Suivi de progression (Labs)&nbsp;:** ne fonctionne que pour les cartes de sites que vous marquez pour le suivi. Il lit les liens précédent/suivant, les données structurées et les informations média de la page pour mettre à jour l’URL et le titre de cette carte.

### 2.3 Recherche et réglages

- **Historique de recherche&nbsp;:** ce que vous tapez, ainsi que les URL et titres des résultats choisis, pour améliorer le classement sur votre appareil.
- **Réglages et médias&nbsp;:** thème, langue, mise en page, raccourcis, fournisseurs de recherche, listes de blocage, interrupteurs de fonctionnalités, ainsi que les icônes de raccourcis importées, les fonds d’écran personnalisés et les caches nécessaires à ces fonctionnalités.

### 2.4 Ce que nous ne collectons pas

Lumno ne demande ni inscription ni connexion. Il ne collecte pas votre nom, votre adresse e-mail, votre numéro de téléphone ou votre adresse postale&nbsp;; ne transmet aucun compteur d’utilisation, clic, identifiant d’appareil ni rapport de plantage&nbsp;; et n’envoie jamais votre historique, vos favoris, votre liste d’onglets ni le contenu des pages au développeur.

## 3. Pourquoi l’extension a besoin de chaque autorisation

L’extension ne demande que les autorisations nécessaires à ces fonctionnalités, et aucune autorisation facultative&nbsp;:

| Autorisation | Utilité |
| --- | --- |
| `tabs`, `tabGroups` | Interroger, basculer, créer, mettre à jour, grouper et restaurer les onglets, et capturer les miniatures du sélecteur d’onglets. |
| `history` | Rechercher et classer l’historique en local, et supprimer des entrées à votre demande. |
| `bookmarks` | Rechercher, afficher et gérer les favoris. |
| `topSites` | Afficher vos sites les plus visités dans le nouvel onglet. |
| `storage`, `unlimitedStorage` | Enregistrer les réglages, les caches, les images personnalisées et la configuration locale nécessaire à la synchronisation WebDAV, au-delà du quota par défaut du navigateur. |
| `alarms` | Vérifier périodiquement l’état de la synchronisation WebDAV en arrière-plan. |
| `search` | Transmettre vos requêtes au moteur de recherche par défaut du navigateur. |
| `favicon` | Afficher les icônes des sites via le navigateur. |
| `scripting` et accès aux sites `<all_urls>` | Fournir la barre de commande, les raccourcis, les actions sur la sélection, le picture-in-picture et le suivi de progression sur les pages web&nbsp;; saisir votre requête dans le service d’IA ou de recherche choisi&nbsp;; récupérer les icônes de sites et les images de fond&nbsp;; joindre l’adresse WebDAV que vous configurez. |

L’accès étendu aux sites ne sert qu’aux fonctionnalités ci-dessus. Il ne signifie pas que Lumno lit, collecte ou envoie en masse le contenu des pages.

## 4. Données qui quittent votre appareil

Les requêtes ci-dessous sont envoyées par l’extension directement au service tiers concerné et **ne transitent jamais par un serveur de Lumno**. Le destinataire voit également l’adresse IP et les informations de navigateur que porte toute requête réseau, et les traite selon sa propre politique de confidentialité.

### 4.1 Suggestions de recherche en ligne

Pendant que vous tapez dans le champ de recherche de Lumno (dans le nouvel onglet ou la barre de commande), votre saisie est envoyée en temps réel au service de suggestions de votre moteur de recherche actuel afin d’afficher des suggestions. Les services pris en charge sont Google, Bing, Baidu, Sogou (fourni par Tencent sur `sor.html5.qq.com`), DuckDuckGo, Yandex, Quark et Shenma (`sugs.m.sm.cn`), et Yahoo. Vous choisissez le destinataire de ces requêtes en changeant de moteur dans les réglages.

### 4.2 Recherche web, recherche sur les sites et IA

- **Recherche web et sur les sites&nbsp;:** les requêtes que vous envoyez vont au moteur de recherche par défaut de votre navigateur, ou ouvrent le service de recherche ou le site choisi dans un nouvel onglet.
- **Recherche IA et actions sur la sélection&nbsp;:** uniquement après que vous avez choisi une action, l’extension ouvre le service d’IA sélectionné (comme ChatGPT, Gemini, DeepSeek, Doubao ou Kimi) et y saisit votre requête ou le texte sélectionné, accompagné de la consigne rédigée par Lumno pour cette action.

Cela revient à consulter vous-même ces sites&nbsp;: le site reçoit ce que vous envoyez et peut l’associer à la session à laquelle vous y êtes connecté.

### 4.3 Icônes des sites

Pour récupérer l’icône d’un site, le service de favicons de Google (`www.google.com` / `gstatic`) reçoit l’URL de la page&nbsp;; si vous choisissez Favicon.is, seul le domaine est envoyé. Ces requêtes ne transportent ni cookies ni référent, et les icônes sont mises en cache sur votre appareil. Les adresses d’icônes personnalisées que vous définissez pour vos raccourcis sont chargées directement par le navigateur depuis cette adresse.

### 4.4 Fonds d’écran en ligne et citations du jour

- **Citations du jour&nbsp;:** désactivées par défaut. Une fois activées, l’extension récupère des citations de la catégorie choisie sur Hitokoto (`v1.hitokoto.cn`) et les met en cache pour la journée.
- **Fonds d’écran Bing&nbsp;:** récupérés depuis `www.bing.com`&nbsp;; la requête ne contient que le marché et l’identifiant de l’image.
- **Fonds d’écran sélectionnés et artistiques&nbsp;:** les photos proviennent de Lorem Picsum (`picsum.photos`, issues d’Unsplash) et les œuvres de la collection Open Access du Cleveland Museum of Art (`openaccess-cdn.clevelandart.org`)&nbsp;; les requêtes ne contiennent que l’identifiant et la taille de l’image.
- **Fonds d’écran par lien d’image&nbsp;:** les liens que vous collez sont synchronisés avec vos réglages&nbsp;; chaque appareil demande l’image une fois à cette adresse, puis la compresse et la met en cache localement.

Les téléchargements de fonds d’écran et de citations ne transportent ni cookies ni référent. Les miniatures d’aperçu du sélecteur de fonds d’écran se chargent comme des images web ordinaires.

### 4.5 Notes de version et ressources du site

- **Avis de mise à jour&nbsp;:** après une mise à jour, l’extension demande à GitHub (`api.github.com`, ou `github.com` en secours) le titre de cette version pour afficher un avis de mise à jour. Vous pouvez désactiver «&nbsp;Update Prompts&nbsp;» dans les réglages.
- **Page des notes de version&nbsp;:** après une mise à jour, l’extension peut ouvrir les notes de version du site. Son URL contient la source d’accès, le motif de la mise à jour et la version de l’extension, et la section&nbsp;6 s’applique à cette page.
- **Liens de retour&nbsp;:** lorsque vous ouvrez un lien de retour ou de communauté, l’extension récupère sur le site la configuration des liens communautaires (`community-links.json`) et l’image du QR code de la communauté.

Le site est hébergé sur GitHub Pages, et GitHub, en tant qu’hébergeur, peut journaliser les requêtes, adresses IP comprises.

## 5. Synchronisation des réglages

Lumno ne propose pas de synchronisation dans le cloud. Vos réglages ne passent d’un appareil à l’autre que par les moyens que vous choisissez&nbsp;:

- **Synchronisation intégrée du navigateur&nbsp;:** le thème, les fournisseurs de recherche, les raccourcis (titres et URL), les cartes de sites épinglées ou masquées (URL et titres), les règles de blocage, les choix de fonds d’écran et liens d’images, les préférences de citations du jour, ainsi que l’adresse, le dossier et le nom d’utilisateur de votre serveur WebDAV sont enregistrés dans `chrome.storage.sync` et synchronisés entre appareils par l’éditeur de votre navigateur, selon votre compte et vos réglages de synchronisation. Les icônes importées, les fonds d’écran personnalisés et les mots de passe d’application WebDAV ne font jamais partie de la synchronisation du navigateur.
- **Synchronisation WebDAV (facultative)&nbsp;:** désactivée par défaut, elle ne s’active que si vous ajoutez vous-même un serveur. Une fois activée, votre configuration complète, vos icônes de raccourcis importées, vos fonds d’écran personnalisés et les instantanés de configuration pris avant écrasement sont enregistrés via HTTPS sur le serveur et dans le dossier que vous indiquez. L’historique, les favoris, les onglets ouverts et les caches d’icônes ne sont jamais envoyés. WebDAV n’offre pas de chiffrement de bout en bout&nbsp;: les administrateurs de ce serveur peuvent donc lire ces fichiers.
- **Export et import&nbsp;:** vous pouvez exporter vos réglages dans un fichier JSON pour les conserver ou les importer sur un autre appareil. Les exports n’incluent pas les images.

## 6. Mesure d’audience du site et cookies

Les pages publiques du site chargent le script de mesure d’audience de VibeLoft et peuvent activer Google Analytics (avec anonymisation de l’IP) lors du déploiement. Ces services peuvent traiter les URL des pages (paramètres de requête compris) et leurs titres, les heures de visite, les pages de provenance, les clics, la langue du navigateur, le type d’appareil et de navigateur, la localisation approximative, les adresses IP, ainsi que des cookies ou identifiants pseudonymes similaires.

Nous utilisons ces données uniquement pour comprendre la fréquentation, les sources et les performances du site, et ne les associons jamais à des données de l’extension. L’extension elle-même ne charge pas ces scripts. Vous pouvez bloquer la mesure d’audience du site avec les fonctions de gestion des cookies, de blocage de scripts ou de protection contre le pistage de votre navigateur, sans incidence sur les fonctionnalités de l’extension.

## 7. Partage, transfert et divulgation

Lumno ne vend, ne loue ni n’échange vos données personnelles, ne les utilise pas pour de la publicité personnalisée ou comportementale intercontextuelle, et ne les fournit ni à des courtiers en données ni à des plateformes publicitaires. En dehors de l’exécution des actions que vous lancez, nous ne partageons, ne transférons ni ne divulguons publiquement vos données personnelles.

Tiers susceptibles de recevoir des données&nbsp;:

| Destinataire | Données susceptibles d’être reçues | Finalité |
| --- | --- | --- |
| Éditeurs de navigateurs (comme Google et Microsoft) | Réglages dans `chrome.storage.sync` et métadonnées du compte du navigateur | Synchronisation intégrée des réglages de l’extension. |
| Votre service WebDAV (comme Jianguoyun, un NAS ou un serveur auto-hébergé) | Configuration complète, icônes, fonds d’écran, instantanés, ainsi que le nom d’utilisateur et le mot de passe d’application utilisés pour la connexion | Synchronisation des réglages et des images selon votre configuration. |
| Services de suggestions de recherche (section&nbsp;4.1) | Ce que vous tapez et les métadonnées de la requête | Affichage des suggestions de recherche. |
| Services de recherche, d’IA et sites que vous choisissez | Requêtes, texte sélectionné et consignes que vous envoyez | Exécution des recherches et actions d’IA que vous lancez. |
| Service de favicons de Google, Favicon.is | URL de la page ou domaine | Affichage des icônes des sites. |
| Hitokoto, Bing, Lorem Picsum, Cleveland Museum of Art | Catégorie, marché, identifiant et taille de l’image | Citations du jour et fonds d’écran en ligne que vous activez. |
| GitHub | Version de l’extension et journaux d’accès des requêtes vers le site et les versions | Avis de mise à jour et hébergement du site. |
| [VibeLoft](https://vibeloft.ai/privacy), Google Analytics (si activé) | Informations de visite et informations techniques du site | Analyse de la fréquentation, des sources et des performances du site. |

Si Lumno fait l’objet d’une fusion, d’une cession ou d’une reprise par un nouveau mainteneur, nous exigerons du destinataire qu’il reste lié par la présente Politique, ou nous vous redemanderons votre consentement avant toute modification du traitement de vos informations. Nous pouvons divulguer des informations lorsque la loi l’exige ou sur demande légitime d’une autorité compétente&nbsp;; comme nous ne détenons aucune donnée personnelle vous concernant, cela ne concernerait en général que les données de mesure d’audience du site.

## 8. Stockage et conservation

L’extension stocke ses données dans `chrome.storage.local`, `chrome.storage.sync` et le stockage de session du navigateur, ainsi que dans une base IndexedDB propre à l’extension&nbsp;: les icônes de raccourcis importées sont dans `chrome.storage.local`&nbsp;; les fonds d’écran personnalisés, la configuration WebDAV, les mots de passe d’application et les sauvegardes de récupération sont dans IndexedDB.

| Données | Durée de conservation |
| --- | --- |
| Réglages locaux, images, caches et données de classement des recherches | Jusqu’à ce que vous les supprimiez dans l’extension, effaciez les données de l’extension dans votre navigateur ou désinstalliez Lumno. |
| Miniatures du sélecteur d’onglets | 2&nbsp;heures maximum chacune. |
| Réglages dans la synchronisation du navigateur | Conservés et supprimés par l’éditeur de votre navigateur selon votre compte et vos réglages de synchronisation. |
| Fichiers sur votre serveur WebDAV | Conservés sur votre serveur jusqu’à ce que vous les supprimiez. Suspendre la synchronisation, supprimer une connexion ou désinstaller Lumno ne les supprime pas. |
| Fichiers de réglages exportés | Conservés et supprimés par vos soins. |
| Données des tiers et de mesure d’audience du site | Conservées par chaque service selon sa propre politique. |

Lumno ne conserve aucune donnée personnelle vous concernant dans les systèmes qu’il contrôle.

## 9. Vos droits et vos choix

Vous pouvez&nbsp;:

- Utiliser toutes les fonctionnalités de Lumno sans inscription ni connexion.
- Changer de moteur de recherche, de service d’IA et de source d’icônes dans les réglages, ou désactiver les actions sur la sélection, les citations du jour, les fonds d’écran en ligne, les avis de mise à jour et fonctionnalités similaires.
- Choisir d’activer ou non la synchronisation WebDAV, et suspendre ou supprimer une connexion à tout moment.
- Désactiver la synchronisation des extensions dans votre navigateur pour garder vos réglages sur un seul appareil.
- Supprimer des données dans l’extension, effacer les données de l’extension dans votre navigateur ou désinstaller l’extension pour supprimer toutes les données locales.

Comme Lumno ne détient aucune donnée personnelle vous concernant, il n’y a généralement rien à consulter, copier ou supprimer côté Lumno. Pour exercer les droits que vous confère la loi applicable — accès, portabilité, rectification, effacement, retrait du consentement, limitation ou opposition — ou pour toute question sur la mesure d’audience du site, contactez-nous comme indiqué à la section&nbsp;15. Nous répondrons dans un délai de 15&nbsp;jours ouvrés après vérification de votre demande, ou dans le délai imposé par la loi applicable. Vous pouvez également introduire une réclamation auprès de votre autorité de protection des données. L’exercice de ces droits n’entraînera jamais de traitement discriminatoire.

Lumno ne procède à aucun profilage et ne prend aucune décision automatisée produisant des effets juridiques vous concernant ou vous affectant de manière significative de façon similaire.

## 10. Sécurité

Nous protégeons vos données par les mesures suivantes&nbsp;:

- Les données de navigation ne sont traitées que dans votre navigateur et ne sont jamais envoyées au développeur.
- WebDAV n’accepte que des adresses HTTPS, conserve la vérification des certificats et refuse les redirections d’authentification.
- Les mots de passe d’application WebDAV restent dans le stockage propre à l’extension sur l’appareil courant. Ils n’entrent jamais dans la synchronisation du navigateur et ne sont jamais exposés aux pages web ni aux scripts de contenu.
- Les téléchargements d’icônes de sites et de fonds d’écran ne transportent ni cookies ni référent.

Nous vous recommandons de générer un mot de passe d’application WebDAV dédié à Lumno et de bien protéger votre appareil, votre compte de navigateur et votre compte WebDAV. Aucune méthode de transmission ou de stockage n’est totalement sûre. Si vous découvrez un problème de sécurité, signalez-le à [i@kubai.design](mailto:i@kubai.design).

## 11. Enfants

Lumno s’adresse au grand public, n’est pas conçu pour les enfants et ne collecte pas sciemment de données personnelles d’enfants. Les enfants de moins de 14&nbsp;ans ne devraient utiliser Lumno qu’avec le consentement et sous la supervision d’un parent ou tuteur. Si vous pensez que nous avons traité par erreur des informations concernant un enfant, contactez-nous afin que nous puissions vérifier.

## 12. Traitement international

Lumno n’exploite aucun serveur stockant des données d’utilisateurs&nbsp;: vos données ne sont donc jamais transférées vers des systèmes contrôlés par Lumno. Les éditeurs de navigateurs, les services de recherche, d’IA, WebDAV et d’images que vous choisissez, ainsi que GitHub, VibeLoft et Google Analytics, peuvent traiter des données hors de votre pays ou région selon leurs propres politiques de confidentialité et mécanismes de transfert.

## 13. Règles relatives aux données utilisateur du Chrome Web Store

L’utilisation par Lumno des informations reçues des API du navigateur respecte les [règles relatives aux données utilisateur du Chrome Web Store](https://developer.chrome.com/docs/webstore/program-policies/policies), y compris les exigences d’**utilisation limitée** (Limited Use)&nbsp;:

- Les données ne servent qu’à fournir ou améliorer la finalité unique de l’extension, visible par l’utilisateur.
- Les données ne sont envoyées aux services listés à la section&nbsp;4 que dans la mesure nécessaire pour exécuter les actions que vous lancez.
- Les données ne sont jamais vendues ni transférées à des tiers, ni utilisées pour de la publicité personnalisée, ni pour évaluer la solvabilité ou à des fins de prêt.
- Le développeur n’a pas accès à vos données de navigation ni à vos réglages.

## 14. Modifications de la présente Politique

Si Lumno ajoute de nouvelles catégories de données, finalités ou destinataires — par exemple en réintroduisant des comptes ou des fonctions cloud —, nous mettrons à jour la présente Politique et les déclarations de données de la boutique avant l’entrée en vigueur du changement, et le signalerons clairement dans l’extension&nbsp;; lorsque la loi exige un consentement, nous vous le redemanderons. Pour des reformulations, des mises à jour de liens ou des clarifications qui ne réduisent pas vos droits, nous pouvons nous contenter de mettre à jour la date de cette page. Nous ne réduirons pas vos droits au titre de la présente Politique sans votre consentement.

## 15. Nous contacter

Pour toute question, remarque ou demande concernant la présente Politique ou vos données personnelles, écrivez à [i@kubai.design](mailto:i@kubai.design). Vous pouvez aussi ouvrir une issue publique sur [GitHub](https://github.com/kubai087/lumno-extension/issues), mais évitez d’y partager des données personnelles.
