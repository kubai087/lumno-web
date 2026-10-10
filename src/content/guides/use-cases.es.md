Estos son algunos usos habituales de Lumno, cada uno con los pasos para ponerlo en práctica. Elige los que encajen con tu forma de trabajar.

## Si tienes decenas de pestañas abiertas {#many-tabs}

Con muchas pestañas abiertas, los títulos se acortan y cuesta encontrar la que buscas. En ese caso, busca solo en las pestañas abiertas:

1. Pulsa `⌘ ⇧ K` para abrir la barra de comandos.
2. Con el cuadro vacío, pulsa `Tab` una vez. A la izquierda aparece "Search open tabs".
3. Escribe parte del título de la página, por ejemplo "layout", selecciona la página que quieres y pulsa Intro para cambiar a ella.

![La barra de comandos en el modo "Search open tabs": al escribir layout aparecen cuatro pestañas abiertas de MDN con layout en el título, cada una con Switch a la derecha](uc-tabs "Buscar solo en las pestañas abiertas")

Las pestañas abiertas también aparecen en una búsqueda normal, marcadas como "Opened". Al pulsar Intro, cambias a esa pestaña en lugar de abrir la página otra vez. Para cambiar solo entre las dos o tres últimas páginas, `⌥ Q` es aún más rápido.

Si las pestañas ralentizan tu ordenador, también puedes usar el Ahorro de memoria integrado en Chrome o agrupar las pestañas en una lista con [OneTab](https://www.one-tab.com/).

Para obtener más información, consulta [Buscar en pestañas, marcadores e historial](../search-tabs-bookmarks-history/) y [Saltar entre pestañas recientes](../tab-switcher/).

## Si vienes de Arc {#from-arc}

Desde que Arc dejó de recibir funciones nuevas, muchos usuarios se han pasado a Dia, Chrome o Edge, y lo que más suelen echar de menos es la barra de comandos. Después de instalar Lumno, sigue estos pasos para recuperar una forma de trabajar familiar:

1. Abre `chrome://extensions/shortcuts` en la barra de direcciones.
2. Busca Lumno y asigna `⌘ T` a "Open command bar".
3. A partir de ahora, abre la barra de comandos con `⌘ T` y cambia entre pestañas recientes con `⌥ Q`, como con `⌃ Tab` en Arc.

![La página de atajos de extensiones del navegador, con "Open command bar" de Lumno en ⇧⌘K y "Open recent tab switcher" en ⌥Q](shortcuts "Cambiar los atajos de Lumno en la página de extensiones")

Para obtener más información, consulta [Si vienes de Arc](../arc-command-bar/).

## Si consultas a menudo documentación y GitHub {#developers}

Escribe el atajo de un sitio y pulsa `Tab` para buscar directamente en él sin pasar por su página de inicio. Por ejemplo, escribe `gh`, pulsa `Tab`, escribe `command palette` y pulsa Intro para abrir los resultados de búsqueda de GitHub. Otros atajos habituales son `mdn`, `npm` y `sf` (Stack Overflow).

![El cuadro muestra GitHub a la izquierda; al escribir command palette ofrece buscar command palette en GitHub](sitesearch "Escribir gh y pulsar Tab para buscar directamente en GitHub")

- Escribe una dirección como `chrome://extensions` para abrirla directamente.
- Añade la documentación interna o el gestor de incidencias de tu empresa como búsqueda personalizada en los ajustes de Lumno, con el atajo que prefieras. Para obtener más información, consulta [Añadir una búsqueda personalizada](../site-search/#custom).

## Si investigas y escribes {#research}

A veces recuerdas haber leído un artículo, pero no si lo guardaste en marcadores o solo lo visitaste. Escribe una palabra clave en la barra de comandos para buscar a la vez en tus marcadores y en tu historial. La etiqueta de cada resultado indica su procedencia y, en el caso de los marcadores, también la carpeta.

![Al escribir css grid aparecen una página del historial y una página de MDN de la carpeta de marcadores CSS reading](uc-research "Buscar a la vez en marcadores e historial")

Si un fragmento resulta difícil de entender, usa las acciones rápidas sobre la selección (Selection quick actions): selecciona el texto y aparecerá un botón de Lumno junto a él. Haz clic en el botón para elegir una acción como "Answer", "Explain" o "Research"; Lumno abrirá la respuesta de la IA en una pestaña nueva. Esta función está desactivada de forma predeterminada; puedes activarla en la sección Labs de los ajustes de Lumno.

![En un artículo, una frase sobre la unidad fr está seleccionada y junto a ella aparecen las acciones Answer, Explain y Research](uc-selection "Seleccionar texto para pedir a la IA una explicación o una investigación")

## Si sueles preguntar primero a la IA {#ai}

Escribe el atajo de una IA, por ejemplo `gpt` (ChatGPT), `gm` (Gemini) o `pplx` (Perplexity), y pulsa `Tab`. Después, escribe tu pregunta y pulsa Intro. Lumno abre la aplicación web de esa IA y envía la pregunta por ti, sin que tengas que abrir el sitio y pegar la pregunta.

![El cuadro muestra ChatGPT a la izquierda con una pregunta sobre alternativas a la barra de comandos de Arc, listo para abrir ChatGPT](ai "Escribir gpt y pulsar Tab para enviar la pregunta a ChatGPT")

Para obtener más información, consulta [Búsqueda en sitios y preguntas a la IA](../site-search/#ai).

## Si quieres una nueva pestaña tranquila {#quiet-new-tab}

La nueva pestaña de Lumno puede mostrar solo lo que necesitas:

- Fondo: elige un cuadro que te guste o muestra cada día una nueva foto de Bing.
- Reloj: muestra la hora sobre el cuadro de búsqueda.
- Modo Zen: cuando necesites concentrarte, escribe `/zen` en el cuadro de búsqueda de la nueva pestaña para dejar solo el cuadro de búsqueda y el fondo.

![La nueva pestaña con el reloj 09:41 sobre el cuadro de búsqueda y los accesos directos debajo](nt-clock "Un reloj sobre el cuadro de búsqueda")

Para obtener más información, consulta [Cambiar el fondo](../newtab-wallpaper/) y [Reloj y modo Zen](../newtab-clock-zen/).

## Si sigues una serie o una novela por entregas {#series}

Cuando ves una serie o lees una novela por entregas, Lumno puede recordar en la nueva pestaña por qué episodio o capítulo vas:

1. Abre el episodio o capítulo por el que vas. Después aparecerá entre las tarjetas de sitios de la parte inferior de la nueva pestaña. Si no aparece, haz clic en "···", en la esquina superior derecha de las tarjetas, y elige "Show Recent".
2. Pasa el puntero sobre la tarjeta y haz clic en el icono de la chincheta. Cuando Lumno reconoce una página de episodio o capítulo, empieza a seguir tu progreso automáticamente y la tarjeta muestra un icono de radar. Si el seguimiento no se inicia, haz clic con el botón derecho en la tarjeta y elige "Track progress".
3. Cuando pases al siguiente episodio o capítulo del mismo título, la tarjeta se actualizará automáticamente. La próxima vez, haz clic en la tarjeta para continuar donde lo dejaste.

![Tarjetas de sitios en la parte inferior de la nueva pestaña: tarjetas fijadas de Crunchyroll y Wandering Inn con icono de radar, seguidas de GitHub y Material](uc-series "Las tarjetas con icono de radar siguen tu progreso")

Para obtener más información, consulta [Sitios frecuentes y tarjetas de progreso](../newtab-frequent-sites/).
