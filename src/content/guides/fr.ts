import type { GuideLocaleContent } from "../../lib/guides";

/** French help center. The extension itself shows English here, so its labels stay in English. */
const content: GuideLocaleContent = {
  ui: {
    navLabel: "Centre d'aide",
    navTitle: "Centre d'aide Lumno",
    groups: {
      about: "Découvrir Lumno",
      quickstart: "Prise en main",
      trust: "Compatibilité et confiance",
    },
    sections: {
      setup: "Installer et configurer",
      "command-bar": "Barre de commande",
      "new-tab": "Nouvel onglet",
      scenarios: "Cas d'usage",
    },
    navToggle: "Sommaire",
    updatedLabel: "Mis à jour le {date}",
    tocLabel: "Sur cette page",
    faqTitle: "Questions fréquentes",
    previousLabel: "Précédent",
    nextLabel: "Suivant",
    homeCardLabel: "Site officiel",
    homeCardTitle: "Retour à l'accueil de Lumno",
    zoomLabel: "Voir en grand",
    closeLabel: "Fermer",
    privacyLabel: "Politique de confidentialité",
    searchPlaceholder: "Rechercher dans l'aide",
    searchLabel: "Rechercher dans le centre d'aide",
    searchEmpty: "Aucun résultat",
    stuckText: "Vous avez encore une question ? Posez-la sur GitHub ou contactez-nous sur X.",
    stuckPrimary: "Poser la question sur GitHub",
    stuckSecondary: "Nous contacter sur X",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "Qu'est-ce que Lumno ? Barre de commande et nouvel onglet open source | Aide Lumno",
      pageDescription:
        "Lumno est une extension de navigateur gratuite et open source. Appuyez sur ⌘⇧K sur n'importe quelle page pour chercher dans vos onglets, favoris et historique, chercher directement sur un site ou interroger une IA, et profitez d'un nouvel onglet calme et personnalisable. Fonctionne dans Chrome, Edge, Dia et les autres navigateurs Chromium.",
      keywords: ["Lumno", "barre de commande navigateur", "extension palette de commandes Chrome", "recherche d'onglets", "extension nouvel onglet", "barre de commande Arc"],
      title: "Qu'est-ce que Lumno ?",
      navTitle: "Qu'est-ce que Lumno ?",
      faq: [
        { question: "Lumno est-il gratuit ?", answer: "Oui. Lumno est open source sous licence GPL-3.0, toutes ses fonctions sont gratuites et aucun compte n'est nécessaire." },
        {
          question: "Dans quels navigateurs fonctionne-t-il ?",
          answer: "Chrome, Edge, Dia, Brave, Arc, Vivaldi et les autres navigateurs Chromium. Safari n'est pas pris en charge. Voir Compatibilité des navigateurs.",
        },
      ],
    },
    limitations: {
      pageTitle: "Ce que Lumno ne fait pas : limites et manques connus | Aide Lumno",
      pageDescription:
        "Lumno est une extension, pas un navigateur : pas de barre de commande sur les pages chrome://, pas de Safari et pas de nouvel onglet dans Dia. Voici ce qu'il ne fait pas encore, et quoi utiliser à la place.",
      keywords: ["limites de Lumno", "extension Chrome pages restreintes", "alternative barre latérale Arc", "nouvel onglet Dia"],
      title: "Ce que Lumno ne fait pas",
      navTitle: "Ce que Lumno ne fait pas",
    },
    "use-cases": {
      pageTitle: "Pour qui est Lumno : trop d'onglets, départ d'Arc, développement et écriture | Aide Lumno",
      pageDescription:
        "Les usages courants de Lumno, étape par étape : des dizaines d'onglets ouverts, le passage d'Arc à Chrome ou Dia, la documentation et GitHub, la recherche et la rédaction, les questions à l'IA et un nouvel onglet épuré.",
      keywords: ["cas d'usage Lumno", "trop d'onglets", "alternative à Arc", "extension navigateur développeur", "raccourci pour interroger l'IA"],
      title: "Cas d'usage",
      navTitle: "Cas d'usage",
    },
    faq: {
      pageTitle: "Questions fréquentes sur Lumno : raccourcis, pages restreintes, nouvel onglet et synchronisation | Aide Lumno",
      pageDescription:
        "Réponses aux questions fréquentes sur Lumno : le raccourci par défaut et sa modification, que faire s'il ne fonctionne pas, l'utilisation avec une autre extension de nouvel onglet, les navigateurs pris en charge, la synchronisation des réglages et le traitement des données de navigation.",
      keywords: ["Lumno FAQ", "questions fréquentes Lumno", "raccourci extension Chrome ne fonctionne pas", "conflit extension nouvel onglet", "Lumno gratuit"],
      title: "Questions fréquentes",
      navTitle: "Questions fréquentes",
    },
    install: {
      pageTitle: "Installer Lumno depuis le Chrome Web Store ou les modules Edge | Aide Lumno",
      pageDescription:
        "Installez Lumno depuis le Chrome Web Store dans Chrome, Dia, Brave ou Arc, ou depuis les modules complémentaires Microsoft Edge dans Edge. Une page d'accueil s'ouvre et ⌘⇧K est prêt à l'emploi.",
      keywords: ["installer Lumno", "Lumno Chrome Web Store", "Lumno modules Edge", "installer une extension Chrome"],
      title: "Installer Lumno",
      navTitle: "Installer Lumno",
      faq: [
        { question: "Faut-il un compte ?", answer: "Non. Lumno n'a pas de système de compte et peut être utilisé dès l'installation." },
        {
          question: "Comment le désinstaller ?",
          answer: "Ouvrez chrome://extensions (edge://extensions dans Edge), trouvez Lumno et cliquez sur Supprimer. Les réglages et images que Lumno avait enregistrés sur votre appareil sont aussi effacés.",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Raccourcis clavier de Lumno : par défaut, les modifier, touches de la barre | Aide Lumno",
      pageDescription:
        "Lumno s'ouvre avec ⌘⇧K (Ctrl+Maj+K sous Windows) et son sélecteur d'onglets récents avec ⌥Q. Modifiez-les dans chrome://extensions/shortcuts, même en ⌘T. Avec toutes les touches de la barre de commande et du sélecteur.",
      keywords: ["raccourcis Lumno", "modifier raccourci extension Chrome", "chrome://extensions/shortcuts", "Cmd T barre de commande"],
      title: "Raccourcis clavier",
      navTitle: "Raccourcis clavier",
      faq: [
        {
          question: "Que faire si le raccourci ne fonctionne pas ?",
          answer:
            "Vérifiez d'abord que vous ne vous trouvez pas sur une page restreinte, comme les paramètres chrome:// ou le Chrome Web Store, puis vérifiez dans chrome://extensions/shortcuts qu'aucune autre extension n'utilise le même raccourci. Dans Dia, réglez la portée sur « Global ».",
        },
      ],
    },
    sync: {
      pageTitle: "Synchroniser Lumno entre ordinateurs : synchro du navigateur et WebDAV | Aide Lumno",
      pageDescription:
        "Les réglages de Lumno suivent la synchronisation de votre navigateur. Activez la synchro WebDAV pour emporter aussi vos icônes de raccourcis et fonds d'écran, via Nextcloud, un NAS ou tout serveur WebDAV que vous gérez.",
      keywords: ["synchronisation Lumno", "synchro WebDAV", "Nextcloud WebDAV", "synchroniser les réglages d'une extension Chrome", "synchroniser le nouvel onglet"],
      title: "Synchronisation",
      navTitle: "Synchronisation",
      faq: [
        {
          question: "Faut-il un compte Lumno pour synchroniser ?",
          answer: "Non. Lumno n'a ni comptes ni serveurs. Les réglages passent par la synchro de votre navigateur ; les icônes et fonds d'écran peuvent passer par votre propre WebDAV.",
        },
        {
          question: "Chrome et Firefox peuvent-ils se synchroniser entre eux ?",
          answer: "Oui, grâce à WebDAV. Indiquez le même serveur et le même dossier dans les deux navigateurs ; cela fonctionne aussi sur un même ordinateur.",
        },
      ],
    },
    "search-tabs-bookmarks-history": {
      pageTitle: "Chercher dans les onglets ouverts, les favoris et l'historique depuis un seul champ | Aide Lumno",
      pageDescription:
        "Appuyez sur ⌘⇧K (Ctrl+Maj+K sous Windows) sur n'importe quelle page pour chercher dans vos onglets ouverts, favoris, historique et sites les plus visités, ou seulement dans vos onglets ouverts.",
      keywords: ["recherche d'onglets Chrome", "extension recherche favoris", "recherche dans l'historique", "chercher un onglet ouvert", "palette de commandes Chrome"],
      title: "Chercher dans les onglets, les favoris et l'historique",
      navTitle: "Onglets, favoris et historique",
      faq: [
        {
          question: "Lumno envoie-t-il mon historique ou mes favoris ?",
          answer:
            "Non. Les onglets, favoris et l'historique sont cherchés sur votre appareil, et Lumno ne les collecte pas. Ce que vous tapez est envoyé au service de suggestions de votre moteur de recherche, comme dans la barre d'adresse.",
        },
        {
          question: "Les résultats peuvent-ils s'ouvrir dans un nouvel onglet ?",
          answer: "Oui. Dans les réglages de Lumno, choisissez de les ouvrir dans l'onglet actuel, à sa gauche ou à sa droite, ou en fin de barre d'onglets.",
        },
      ],
    },
    "site-search": {
      pageTitle: "Recherche sur site : tapez un raccourci, appuyez sur Tab, cherchez sur GitHub, YouTube ou ChatGPT | Aide Lumno",
      pageDescription:
        "Lumno intègre 46 raccourcis de recherche. Saisissez gh, yt ou sf, puis appuyez sur Tab pour rechercher directement sur GitHub, YouTube ou Stack Overflow, ou envoyez une question directement à ChatGPT, Gemini ou Perplexity.",
      keywords: ["recherche sur site Chrome", "Tab pour rechercher", "raccourcis de recherche navigateur", "chercher vite sur GitHub", "raccourci ChatGPT", "moteur de recherche personnalisé"],
      title: "Recherche sur site et questions à l'IA",
      navTitle: "Recherche sur site et IA",
      faq: [
        {
          question: "Quels sites sont intégrés ?",
          answer:
            "46 au total : 11 moteurs de recherche, 11 chats et moteurs de recherche IA (comme ChatGPT, Gemini, Perplexity et DeepSeek) et 24 sites dont GitHub, YouTube, Stack Overflow et Reddit. Vous pouvez ajouter les vôtres.",
        },
        { question: "La recherche sur site passe-t-elle par les serveurs de Lumno ?", answer: "Non. Lumno n'a pas de serveur ; lorsque vous appuyez sur Entrée, la page de recherche du site s'ouvre directement." },
      ],
    },
    "tab-switcher": {
      pageTitle: "Sélecteur d'onglets récents : ⌥Q pour passer d'un onglet récent à l'autre | Aide Lumno",
      pageDescription:
        "Appuyez sur ⌥Q (Alt+Q sous Windows) pour ouvrir le sélecteur d'onglets récents de Lumno : vos onglets s'affichent dans l'ordre de leur utilisation, chacun avec un aperçu. Maintenez ⌥ enfoncée, appuyez plusieurs fois sur Q, puis relâchez ⌥ pour basculer.",
      keywords: ["sélecteur d'onglets Chrome", "onglets récents", "Alt Tab pour navigateur", "Arc Ctrl Tab"],
      title: "Passer d'un onglet récent à l'autre",
      navTitle: "Onglets récents",
    },
    "newtab-wallpaper": {
      pageTitle: "Fonds d'écran du nouvel onglet : tableaux, photo du jour Bing, vos photos et filtres | Aide Lumno",
      pageDescription:
        "Changez le fond d'écran du nouvel onglet Lumno dans les réglages Appearance : tableaux intégrés, photo du jour de Bing, photos sélectionnées, vos propres images ou un lien d'image, avec voile, filtres et choix séparés pour les modes clair et sombre.",
      keywords: ["fond d'écran nouvel onglet", "arrière-plan nouvel onglet Chrome", "fond d'écran Bing du jour", "extension nouvel onglet"],
      title: "Changer le fond d'écran",
      navTitle: "Changer le fond d'écran",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "Raccourcis et favoris du nouvel onglet : ajouter des sites, trois dispositions | Aide Lumno",
      pageDescription:
        "Ajoutez vos sites favoris en raccourcis sur le nouvel onglet Lumno, choisissez leurs icônes et parcourez vos favoris en dossiers, en liste imbriquée ou en barre en haut.",
      keywords: ["raccourcis nouvel onglet", "favoris nouvel onglet", "barre de favoris Chrome", "dossiers de favoris"],
      title: "Raccourcis et favoris",
      navTitle: "Raccourcis et favoris",
    },
    "newtab-frequent-sites": {
      pageTitle: "Sites fréquents et cartes de progression : épingler des sites, reprendre une série | Aide Lumno",
      pageDescription:
        "Le nouvel onglet Lumno affiche vos sites les plus visités ou récents. Épinglez-en jusqu'à trois ; épinglez une série ou un roman-feuilleton et la carte vous suit jusqu'à l'épisode ou au chapitre suivant.",
      keywords: ["sites les plus visités nouvel onglet", "suivre une série", "progression web novel", "épingler des sites"],
      title: "Sites fréquents et cartes de progression",
      navTitle: "Sites fréquents et progression",
    },
    "newtab-clock-zen": {
      pageTitle: "Horloge et mode Zen : un nouvel onglet réduit au champ de recherche | Aide Lumno",
      pageDescription: "Affichez une horloge dans le nouvel onglet de Lumno, ou saisissez /zen pour ne garder que le champ de recherche.",
      keywords: ["horloge nouvel onglet", "nouvel onglet minimaliste", "mode Zen", "nouvel onglet concentration"],
      title: "Horloge et mode Zen",
      navTitle: "Horloge et mode Zen",
    },
    "newtab-other-extensions": {
      pageTitle: "Utiliser une autre extension de nouvel onglet avec la barre de commande de Lumno | Aide Lumno",
      pageDescription:
        "Conservez Momentum, Tabliss ou une autre extension de nouvel onglet et utilisez uniquement la barre de commande de Lumno : activez l'autre extension après Lumno pour qu'elle prenne en charge le nouvel onglet. Lorsque le navigateur le demande, conservez la modification ; l'annuler désactive l'extension entière.",
      keywords: ["conflit extension nouvel onglet", "nouvel onglet Chrome modifié par une extension", "barre de commande Lumno seule", "Momentum", "Tabliss"],
      title: "Utiliser une autre extension de nouvel onglet",
      navTitle: "Autre extension de nouvel onglet",
    },
    "arc-command-bar": {
      pageTitle: "Passer d'Arc à Chrome, Dia ou Edge : barre de commande et raccourcis | Aide Lumno",
      pageDescription:
        "Vous avez quitté Arc pour Chrome, Dia ou Edge ? Lumno ramène une barre de commande à la Arc : ⌘⇧K cherche dans les onglets, favoris et historique (ou réglez-la sur ⌘T), et ⌥Q passe d'un onglet récent à l'autre. Avec un tableau des raccourcis d'Arc.",
      keywords: ["alternative barre de commande Arc", "alternative au navigateur Arc", "passer d'Arc à Chrome", "barre de commande Dia", "raccourcis Arc"],
      title: "Venir d'Arc",
      navTitle: "Venir d'Arc",
      faq: [
        {
          question: "Lumno est-il lié à Arc ?",
          answer: "Non. Lumno est un projet open source indépendant, inspiré de la barre de commande d'Arc, sans lien avec Arc ni The Browser Company.",
        },
      ],
    },
    "browser-compatibility": {
      pageTitle: "Compatibilité des navigateurs : Chrome, Edge, Dia, Brave, Firefox et Safari | Aide Lumno",
      pageDescription:
        "Lumno fonctionne entièrement dans Chrome, Edge, Brave, Arc, Vivaldi et les autres navigateurs Chromium. Dia n'a pas le nouvel onglet Lumno, la version Firefox a quelques manques, et Safari comme les navigateurs mobiles ne sont pas pris en charge.",
      keywords: ["compatibilité Lumno", "extension Dia", "extension Edge", "version Firefox", "extension Chromium"],
      title: "Compatibilité des navigateurs",
      navTitle: "Compatibilité des navigateurs",
    },
    "privacy-data": {
      pageTitle: "Confidentialité et données : Lumno fonctionne sur votre appareil et ne collecte rien | Aide Lumno",
      pageDescription:
        "Lumno n'a ni comptes ni serveurs. Vos onglets, favoris et historique restent sur votre appareil, et aucune donnée d'usage n'est collectée. Voici ce qui quitte malgré tout votre appareil, et comment fonctionnent les synchros navigateur et WebDAV.",
      keywords: ["confidentialité Lumno", "confidentialité extension navigateur", "données extension Chrome", "synchro WebDAV"],
      title: "Confidentialité et données",
      navTitle: "Confidentialité et données",
    },
    "security-open-source": {
      pageTitle: "Sécurité et open source : code GPL-3.0, autorisations, Manifest V3 | Aide Lumno",
      pageDescription:
        "Lumno est open source sous GPL-3.0 sur GitHub, construit sur Manifest V3 sans code distant. Voici à quoi sert chaque autorisation du navigateur.",
      keywords: ["Lumno open source", "sécurité Lumno", "autorisations extension Chrome", "Manifest V3"],
      title: "Sécurité et open source",
      navTitle: "Sécurité et open source",
    },
    "ratings-reviews": {
      pageTitle: "Avis et presse : avis du Chrome Web Store et articles | Aide Lumno",
      pageDescription: "La note et les avis de Lumno sur le Chrome Web Store, ainsi que les articles qui lui sont consacrés.",
      keywords: ["avis Lumno", "note Lumno", "test extension barre de commande Chrome"],
      title: "Avis et presse",
      navTitle: "Avis et presse",
    },
  },
};

export default content;
