import type { GuideLocaleContent } from "../../lib/guides";

/** Spanish help center. The extension itself shows English here, so its labels stay in English. */
const content: GuideLocaleContent = {
  ui: {
    navLabel: "Centro de ayuda",
    navTitle: "Centro de ayuda de Lumno",
    groups: {
      about: "Conoce Lumno",
      quickstart: "Primeros pasos",
      trust: "Compatibilidad y confianza",
    },
    sections: {
      setup: "Instalar y configurar",
      "command-bar": "Barra de comandos",
      "new-tab": "Nueva pestaña",
      more: "Más funciones",
      scenarios: "Casos de uso",
    },
    navToggle: "Índice",
    updatedLabel: "Actualizado el {date}",
    tocLabel: "En esta página",
    faqTitle: "Preguntas frecuentes",
    previousLabel: "Anterior",
    nextLabel: "Siguiente",
    homeCardLabel: "Sitio web",
    homeCardTitle: "Volver a la página de Lumno",
    zoomLabel: "Ver a tamaño completo",
    closeLabel: "Cerrar",
    copyLabel: "Copiar",
    copiedLabel: "Copiado",
    privacyLabel: "Política de privacidad",
    searchPlaceholder: "Buscar en la ayuda",
    searchLabel: "Buscar en el centro de ayuda",
    searchEmpty: "No hay resultados. Puedes escribir al desarrollador.",
    searchRecommended: "Artículos sugeridos",
    searchFeedbackGroup: "Unirse al grupo de WeChat",
    searchFeedbackIssue: "Crear un issue",
    searchFeedbackAuthor: "Contactar al autor",
    stuckText: "¿Todavía tienes dudas? Pregunta en GitHub o contáctanos en X.",
    stuckPrimary: "Preguntar en GitHub",
    stuckSecondary: "Contactar en X",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "¿Qué es Lumno? Barra de comandos y nueva pestaña de código abierto | Ayuda de Lumno",
      pageDescription:
        "Lumno es una extensión de navegador gratuita y de código abierto. Pulsa ⌘⇧K en cualquier página para buscar en tus pestañas, marcadores e historial, buscar dentro de sitios o preguntar a la IA, y disfruta de una nueva pestaña tranquila y personalizable. Funciona en Chrome, Edge, Dia y otros navegadores Chromium, y en Firefox.",
      keywords: ["Lumno", "barra de comandos del navegador", "extensión paleta de comandos Chrome", "buscar pestañas", "extensión nueva pestaña", "barra de comandos de Arc"],
      title: "¿Qué es Lumno?",
      navTitle: "¿Qué es Lumno?",
      faq: [
        { question: "¿Lumno es gratis?", answer: "Sí. Lumno es de código abierto con licencia GPL-3.0, todas sus funciones son gratuitas y no hace falta crear ninguna cuenta." },
        {
          question: "¿En qué navegadores funciona?",
          answer: "En Chrome, Edge, Dia, Brave, Arc, Vivaldi y otros navegadores Chromium, y en Firefox y navegadores basados en Firefox como Zen. Safari no es compatible. Consulta Compatibilidad con navegadores.",
        },
      ],
    },
    limitations: {
      pageTitle: "Lo que Lumno no hace: límites y carencias conocidas | Ayuda de Lumno",
      pageDescription:
        "Lumno es una extensión, no un navegador: la barra de comandos no se abre en páginas chrome://, no funciona en Safari y no hay nueva pestaña en Dia. Aquí tienes lo que todavía no hace y qué usar en su lugar.",
      keywords: ["límites de Lumno", "extensión Chrome páginas restringidas", "alternativa barra lateral Arc", "nueva pestaña Dia"],
      title: "Lo que Lumno no hace",
      navTitle: "Lo que Lumno no hace",
    },
    "use-cases": {
      pageTitle: "Casos de uso de Lumno: muchas pestañas, cambio desde Arc, desarrollo y escritura | Ayuda de Lumno",
      pageDescription:
        "Usos habituales de Lumno, paso a paso: decenas de pestañas abiertas, el cambio de Arc a Chrome o Dia, la consulta de documentación y GitHub, la investigación y la escritura, las preguntas a la IA y una nueva pestaña tranquila.",
      keywords: ["casos de uso de Lumno", "demasiadas pestañas", "alternativa a Arc", "extensión de navegador para desarrolladores", "atajo para preguntar a la IA"],
      title: "Casos de uso",
      navTitle: "Casos de uso",
    },
    faq: {
      pageTitle: "Preguntas frecuentes sobre Lumno: atajos, páginas restringidas, nueva pestaña y sincronización | Ayuda de Lumno",
      pageDescription:
        "Respuestas a las preguntas frecuentes sobre Lumno: el atajo predeterminado y cómo cambiarlo, qué hacer si no funciona, cómo usarlo con otra extensión de nueva pestaña, navegadores compatibles, sincronización de ajustes y tratamiento de los datos de navegación.",
      keywords: ["preguntas frecuentes Lumno", "Lumno FAQ", "atajo de extensión de Chrome no funciona", "conflicto extensión nueva pestaña", "Lumno gratis"],
      title: "Preguntas frecuentes",
      navTitle: "Preguntas frecuentes",
    },
    install: {
      pageTitle: "Instalar Lumno desde Chrome Web Store o los complementos de Edge y Firefox | Ayuda de Lumno",
      pageDescription:
        "Instala Lumno desde Chrome Web Store en Chrome, Dia, Brave o Arc, desde los complementos de Microsoft Edge en Edge, o desde Complementos de Firefox en Firefox y Zen. Se abre una página de bienvenida y ⌘⇧K queda listo para usar.",
      keywords: ["instalar Lumno", "Lumno Chrome Web Store", "Lumno complementos de Edge", "Lumno complementos de Firefox", "instalar extensión de Chrome"],
      title: "Instalar Lumno",
      navTitle: "Instalar Lumno",
      faq: [
        { question: "¿Necesito una cuenta?", answer: "No. Lumno no tiene sistema de cuentas y se puede usar en cuanto lo instalas." },
        {
          question: "¿Cómo lo desinstalo?",
          answer: "Abre chrome://extensions (edge://extensions en Edge), busca Lumno y haz clic en Quitar. En Firefox, quítalo desde about:addons. Así se borran también los ajustes e imágenes que Lumno guardó en tu dispositivo.",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Atajos de teclado de Lumno: predeterminados, cómo cambiarlos y todas las teclas | Ayuda de Lumno",
      pageDescription:
        "Lumno se abre con ⌘⇧K (Ctrl+Mayús+K en Windows) y su selector de pestañas recientes con ⌥Q (Alt+Q). Cámbialos en chrome://extensions/shortcuts, incluso a ⌘T. Además, todas las teclas de la barra de comandos, la nueva pestaña, el selector y el recorte web, y los clics equivalentes, como abrir en segundo plano.",
      keywords: ["atajos de Lumno", "cambiar atajo de extensión Chrome", "chrome://extensions/shortcuts", "Cmd T barra de comandos", "abrir en segundo plano"],
      title: "Atajos de teclado",
      navTitle: "Atajos de teclado",
      faq: [
        {
          question: "¿Qué hago si el atajo no funciona?",
          answer:
            "Primero, comprueba que no estás en una página restringida, como la configuración chrome:// o Chrome Web Store. Después, comprueba en chrome://extensions/shortcuts que ninguna otra extensión usa el mismo atajo. En Dia, cambia el ámbito a \"Global\".",
        },
      ],
    },
    sync: {
      pageTitle: "Sincroniza Lumno entre ordenadores con la sincronización del navegador y WebDAV | Ayuda de Lumno",
      pageDescription:
        "Los ajustes de Lumno viajan con la sincronización de tu navegador. Activa la sincronización WebDAV para llevarte también los iconos de accesos directos, los fondos y las citas, con Nextcloud, un NAS o cualquier servidor WebDAV que controles.",
      keywords: ["sincronización Lumno", "sincronización WebDAV", "Nextcloud WebDAV", "sincronizar ajustes de extensión Chrome", "sincronizar nueva pestaña"],
      title: "Sincronización",
      navTitle: "Sincronización",
      faq: [
        {
          question: "¿Necesito una cuenta de Lumno para sincronizar?",
          answer: "No. Lumno no tiene cuentas ni servidores. Los ajustes van por la sincronización de tu navegador; los iconos y fondos pueden ir por tu propio WebDAV.",
        },
        {
          question: "¿Chrome y Firefox pueden sincronizarse entre sí?",
          answer: "Sí, con WebDAV. Indica el mismo servidor y la misma carpeta en los dos navegadores, incluso en el mismo ordenador.",
        },
      ],
    },
    "search-tabs-bookmarks-history": {
      pageTitle: "Busca en pestañas abiertas, marcadores e historial desde un solo cuadro | Ayuda de Lumno",
      pageDescription:
        "Pulsa ⌘⇧K (Ctrl+Mayús+K en Windows) en cualquier página para buscar en tus pestañas abiertas, marcadores, historial y sitios más visitados en un solo cuadro, o solo en las pestañas abiertas.",
      keywords: ["buscar pestañas Chrome", "extensión buscar marcadores", "buscar en el historial", "buscar pestañas abiertas", "paleta de comandos Chrome"],
      title: "Buscar en pestañas, marcadores e historial",
      navTitle: "Pestañas, marcadores e historial",
      faq: [
        {
          question: "¿Lumno sube mi historial o mis marcadores?",
          answer:
            "No. Las pestañas, los marcadores y el historial se buscan en tu dispositivo, y Lumno no los recopila. Lo que escribes se envía al servicio de sugerencias de tu buscador para mostrarte sugerencias, igual que en la barra de direcciones.",
        },
        {
          question: "¿Los resultados pueden abrirse en una pestaña nueva?",
          answer: "Sí. En los ajustes de Lumno puedes elegir abrirlos en la pestaña actual, a su izquierda o derecha, o al final de la barra de pestañas.",
        },
      ],
    },
    "site-search": {
      pageTitle: "Búsqueda en sitios: escribe un atajo, pulsa Tab y busca en GitHub, YouTube o ChatGPT | Ayuda de Lumno",
      pageDescription:
        "Lumno trae 47 atajos de búsqueda. Escribe gh, yt o sf y pulsa Tab para buscar directamente en GitHub, YouTube o Stack Overflow, o manda una pregunta directamente a ChatGPT, Gemini o Perplexity.",
      keywords: ["búsqueda en sitios Chrome", "Tab para buscar", "atajos de búsqueda navegador", "buscar en GitHub rápido", "atajo para ChatGPT", "buscador personalizado"],
      title: "Búsqueda en sitios y preguntas a la IA",
      navTitle: "Búsqueda en sitios e IA",
      faq: [
        {
          question: "¿Qué sitios vienen incluidos?",
          answer:
            "47 en total: 11 buscadores, 11 chats y buscadores con IA (como ChatGPT, Gemini, Perplexity y DeepSeek) y 24 sitios, entre ellos GitHub, YouTube, Stack Overflow y Reddit, además del centro de ayuda de Lumno. Puedes añadir los tuyos.",
        },
        { question: "¿La búsqueda en sitios pasa por servidores de Lumno?", answer: "No. Lumno no tiene servidores; al pulsar Intro se abre directamente la página de búsqueda del sitio." },
      ],
    },
    "tab-switcher": {
      pageTitle: "Selector de pestañas recientes: pulsa ⌥Q para saltar entre pestañas recientes | Ayuda de Lumno",
      pageDescription:
        "Pulsa ⌥Q (Alt+Q en Windows) para abrir el selector de pestañas recientes de Lumno, con tus pestañas en el orden en que las usaste y una vista previa de cada una. Mantén pulsada ⌥, pulsa Q varias veces y suelta ⌥ para cambiar de pestaña. También puedes cerrar pestañas desde el propio selector.",
      keywords: ["selector de pestañas Chrome", "pestañas recientes", "Alt Tab para el navegador", "Arc Ctrl Tab"],
      title: "Saltar entre pestañas recientes",
      navTitle: "Pestañas recientes",
    },
    "newtab-wallpaper": {
      pageTitle: "Fondos de la nueva pestaña: cuadros clásicos, foto del día de Bing, tus fotos y filtros | Ayuda de Lumno",
      pageDescription:
        "Cambia el fondo de la nueva pestaña de Lumno en los ajustes de Appearance: cuadros incluidos, la foto del día de Bing, fotos seleccionadas, tus propias imágenes o un enlace de imagen, con velo, filtros, fondos distintos para los modos claro y oscuro y un acabado de cristal (Acrylic o Liquid glass).",
      keywords: ["fondo de nueva pestaña", "fondo nueva pestaña Chrome", "fondo diario de Bing", "extensión nueva pestaña"],
      title: "Cambiar el fondo",
      navTitle: "Cambiar el fondo",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "Accesos directos y marcadores en la nueva pestaña: añadir y agrupar sitios, tres diseños | Ayuda de Lumno",
      pageDescription:
        "Añade tus sitios de siempre como accesos directos en la nueva pestaña de Lumno, elige sus iconos, repártelos en grupos o carpetas y explora tus marcadores como carpetas, lista anidada o barra superior, con las filas que quieras o sin mostrarlos.",
      keywords: ["accesos directos nueva pestaña", "grupos de accesos directos", "marcadores nueva pestaña", "barra de marcadores Chrome", "carpetas de marcadores", "ocultar marcadores nueva pestaña"],
      title: "Accesos directos y marcadores",
      navTitle: "Accesos directos y marcadores",
    },
    "newtab-frequent-sites": {
      pageTitle: "Sitios frecuentes y tarjetas de progreso: fija sitios y no pierdas el hilo de una serie | Ayuda de Lumno",
      pageDescription:
        "La nueva pestaña de Lumno muestra tus sitios más visitados o recientes. Fija hasta tres; fija una serie o una novela por entregas y la tarjeta te sigue al siguiente episodio o capítulo. Muestra una o dos filas de tarjetas, o desactívalas.",
      keywords: ["sitios más visitados nueva pestaña", "seguir progreso de series", "progreso de web novel", "fijar sitios", "ocultar tarjetas nueva pestaña"],
      title: "Sitios frecuentes y tarjetas de progreso",
      navTitle: "Sitios frecuentes y progreso",
    },
    "newtab-clock-zen": {
      pageTitle: "Reloj, cita diaria y modo Zen: una nueva pestaña con solo el cuadro de búsqueda | Ayuda de Lumno",
      pageDescription: "Muestra un reloj y una cita diaria de tu propio archivo TXT o Markdown en la nueva pestaña de Lumno, o escribe /zen para ocultar todo excepto el cuadro de búsqueda.",
      keywords: ["reloj nueva pestaña", "cita diaria nueva pestaña", "nueva pestaña minimalista", "modo Zen", "nueva pestaña para concentrarse"],
      title: "Reloj, citas y modo Zen",
      navTitle: "Reloj, citas y modo Zen",
    },
    "newtab-other-extensions": {
      pageTitle: "Usar otra extensión de nueva pestaña con la barra de comandos de Lumno | Ayuda de Lumno",
      pageDescription:
        "Conserva Momentum, Tabliss u otra extensión de nueva pestaña y usa solo la barra de comandos de Lumno: activa la otra extensión después de Lumno para que se encargue de la nueva pestaña. Cuando el navegador pregunte, conserva el cambio; deshacerlo desactiva la extensión por completo.",
      keywords: ["conflicto extensión nueva pestaña", "nueva pestaña de Chrome cambiada por una extensión", "solo barra de comandos de Lumno", "Momentum", "Tabliss"],
      title: "Usar otra extensión de nueva pestaña",
      navTitle: "Otra extensión de nueva pestaña",
    },
    "selection-actions": {
      pageTitle: "Acciones rápidas sobre la selección: pide a la IA que explique, traduzca o resuma un texto | Ayuda de Lumno",
      pageDescription:
        "Selecciona texto en una página y Lumno sugiere acciones de IA como Answer, Translate, Explain, Summarize, Research o Calculate. Lumno comprueba primero en tu dispositivo si el texto necesita ayuda, así que no aparece en cada selección.",
      keywords: ["seleccionar texto IA", "traducir selección", "explicar texto seleccionado", "extensión Chrome selección IA", "resumir selección"],
      title: "Acciones rápidas sobre la selección",
      navTitle: "Acciones rápidas sobre la selección",
    },
    "auto-pip": {
      pageTitle: "Imagen en imagen automática: los vídeos siguen en una ventana pequeña al cambiar de pestaña | Ayuda de Lumno",
      pageDescription:
        "Si cambias de pestaña mientras se reproduce un vídeo, pasa automáticamente a imagen en imagen y vuelve a la página cuando regresas. Cuándo se activa, dónde no y cómo desactivarla.",
      keywords: ["imagen en imagen automática", "extensión Chrome imagen en imagen", "vídeo ventana flotante", "Arc imagen en imagen", "cambiar de pestaña vídeo"],
      title: "Imagen en imagen automática",
      navTitle: "Imagen en imagen automática",
    },
    "link-preview": {
      pageTitle: "Vista previa de enlaces: abre un enlace en una ventana pequeña con Mayús+clic | Ayuda de Lumno",
      pageDescription:
        "Haz clic en un enlace mientras mantienes pulsada la tecla Mayús para abrirlo en una ventana pequeña sobre la página. Ciérrala para volver a donde estabas o pásala a una pestaña nueva. Aprende a usarla, qué hacen sus botones, qué páginas no se pueden mostrar y cómo desactivarla.",
      keywords: ["vista previa de enlaces", "ver un enlace sin abrir pestaña", "Mayús clic enlace", "extensión Chrome vista previa de enlaces", "alternativa a Arc Peek"],
      title: "Vista previa de enlaces",
      navTitle: "Vista previa de enlaces",
    },
    "web-clip": {
      pageTitle: "Recorte web: mantén parte de una página en una ventana flotante | Ayuda de Lumno",
      pageDescription:
        "El recorte web coloca una tabla, un bloque de código o un gráfico en una ventana flotante que sigue visible al cambiar de pestaña. Aprende a activarlo, elegir el contenido y usar la ventana, y conoce sus limitaciones.",
      keywords: ["recorte web", "Document Picture-in-Picture", "ventana flotante extensión Chrome", "fijar parte de una página", "imagen en imagen elemento"],
      title: "Recorte web",
      navTitle: "Recorte web",
    },
    "arc-command-bar": {
      pageTitle: "De Arc a Chrome, Dia o Edge: la barra de comandos y los atajos | Ayuda de Lumno",
      pageDescription:
        "¿Has dejado Arc por Chrome, Dia o Edge? Lumno recupera una barra de comandos al estilo de Arc: ⌘⇧K busca en pestañas, marcadores e historial (o cámbialo a ⌘T) y ⌥Q salta entre pestañas recientes. Incluye una tabla de equivalencias de atajos de Arc.",
      keywords: ["alternativa barra de comandos Arc", "alternativa al navegador Arc", "pasar de Arc a Chrome", "barra de comandos Dia", "atajos de Arc"],
      title: "Si vienes de Arc",
      navTitle: "Si vienes de Arc",
      faq: [
        {
          question: "¿Lumno tiene relación con Arc?",
          answer: "No. Lumno es un proyecto de código abierto independiente, inspirado en la barra de comandos de Arc, sin relación con Arc ni con The Browser Company.",
        },
      ],
    },
    "browser-compatibility": {
      pageTitle: "Compatibilidad con navegadores: Chrome, Edge, Dia, Brave, Firefox y Safari | Ayuda de Lumno",
      pageDescription:
        "Lumno funciona por completo en Chrome, Edge, Brave, Arc, Vivaldi y otros navegadores Chromium. Dia no tiene la nueva pestaña de Lumno, la versión de Firefox ya está en Complementos de Firefox, aunque le faltan algunas funciones, y Safari y los navegadores móviles no son compatibles.",
      keywords: ["compatibilidad Lumno", "extensión Dia", "extensión Edge", "versión de Firefox", "extensión Chromium"],
      title: "Compatibilidad con navegadores",
      navTitle: "Compatibilidad con navegadores",
    },
    "security-open-source": {
      pageTitle: "Seguridad y código abierto: código GPL-3.0, permisos, Manifest V3 | Ayuda de Lumno",
      pageDescription:
        "Lumno es de código abierto con licencia GPL-3.0 en GitHub, construido con Manifest V3 y sin código remoto. Solo solicita los permisos del navegador que necesita.",
      keywords: ["Lumno código abierto", "seguridad Lumno", "permisos extensión Chrome", "Manifest V3"],
      title: "Seguridad y código abierto",
      navTitle: "Seguridad y código abierto",
    },
    "ratings-reviews": {
      pageTitle: "Valoraciones y prensa: reseñas de Chrome Web Store y artículos | Ayuda de Lumno",
      pageDescription: "La valoración y las reseñas de Lumno en Chrome Web Store, su página de reseñas en Complementos de Firefox y los artículos que se han escrito sobre él.",
      keywords: ["reseñas Lumno", "valoración Lumno", "análisis extensión barra de comandos Chrome"],
      title: "Valoraciones y prensa",
      navTitle: "Valoraciones y prensa",
    },
  },
};

export default content;
