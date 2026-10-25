La mayoría de las funciones de Lumno se pueden usar con el teclado. En esta página encontrarás los atajos predeterminados, cómo cambiarlos y las teclas que puedes usar en la barra de comandos, la nueva pestaña, el selector de pestañas y el recorte web. Cuando un clic hace lo mismo, aparece junto a la tecla.

## Atajos predeterminados {#defaults}

| Acción | Atajo |
| --- | --- |
| Abrir la barra de comandos | `⌘ ⇧ K` |
| Abrir el selector de pestañas recientes | `⌥ Q` |
| Abrir la barra de comandos con la URL de la página actual | Sin atajo predeterminado |
| Copiar la URL de la página actual | Sin atajo predeterminado |

Las dos últimas acciones pueden aparecer como "Sin definir" después de la instalación. Para asignarles un atajo, sigue los pasos que se indican a continuación. La versión para Firefox abre la barra de comandos con otro atajo predeterminado; consulta [Compatibilidad con navegadores](../browser-compatibility/#firefox).

## Cambiar un atajo {#change}

Los navegadores gestionan los atajos de las extensiones en una página específica:

1. Escribe `chrome://extensions/shortcuts` en la barra de direcciones (`edge://extensions/shortcuts` en Edge).
2. Busca Lumno y haz clic en el icono del lápiz junto a la acción que quieras cambiar.
3. Pulsa la nueva combinación de teclas.

![La página de atajos de extensiones del navegador, con "Open command bar" de Lumno en ⇧⌘K y "Open recent tab switcher" en ⌥Q](shortcuts "Cambiar atajos en la página de extensiones")

Si estás acostumbrado a [Arc](https://arc.net/) o [Zen](https://zen-browser.app/), puedes asignar `⌘ T` a "Open command bar".

La página de atajos no acepta `⌃ Tab`. Para abrir el selector con esta combinación, consulta [Abrir el selector con Ctrl+Tab](../tab-switcher/#ctrl-tab).

Los atajos propios de Dia tienen prioridad sobre los de las extensiones. Para usar `⌘ T` en Dia, primero cambia "New Tab" a otra tecla en Settings → Shortcuts de Dia. Para obtener más información, consulta [Compatibilidad con navegadores](../browser-compatibility/#dia).

Si el atajo no funciona en Dia, cambia el ámbito que aparece junto a él de "In Dia" a "Global".

## Teclas de la barra de comandos {#command-bar-keys}

### Seleccionar un resultado

| Tecla | Acción |
| --- | --- |
| `↑` `↓` | Mover la selección hacia arriba o hacia abajo |
| Mantener pulsada `⌘`, soltarla y pulsar `0`–`9` | Aparecen números junto a los resultados; pulsa uno para abrir ese resultado |

Si activas "Single-press Command to show number jump" en "Labs", en los ajustes de Lumno, basta con pulsar `⌘` una vez para ver los números, y el resultado se abre manteniendo pulsada `⌘` mientras pulsas el número. En ese caso, `⌘` deja de abrir resultados en segundo plano; el clic central sigue funcionando.

En macOS, también puedes activar "Mac keyboard navigation" en "Labs" para seleccionar el resultado siguiente y el anterior con `⌃ N | ⌃ N` y `⌃ P | ⌃ P`.

### Abrir un resultado

| Tecla o clic | Acción |
| --- | --- |
| `↩` o clic en un resultado | Abrir el resultado o cambiar a una pestaña abierta |
| `⌥ ↩` o clic manteniendo pulsada `⌥` | Abrir en la pestaña actual en lugar de en una nueva |
| `⇧ ↩` o clic manteniendo pulsada `⇧` | Si el resultado es una pestaña abierta, abrirla de nuevo en una pestaña nueva |
| `⌘ ↩`, clic manteniendo pulsada `⌘` o clic central | Abrir en una pestaña en segundo plano; la barra de comandos sigue abierta para que abras el siguiente |

Mientras mantienes pulsada `⌥`, `⇧` o `⌘`, la indicación a la derecha de cada resultado cambia según corresponda.

### Escritura y modos de búsqueda

| Tecla | Acción |
| --- | --- |
| `Tab` | Completar una sugerencia; después de un atajo de sitio, iniciar la búsqueda en el sitio; con el cuadro vacío, buscar solo en las pestañas abiertas |
| `Tab` `Tab` | Con el cuadro vacío, abrir el panel de ámbitos de búsqueda; si ya hay un ámbito elegido, basta con pulsar una vez |
| `⌥ ↑` `⌥ ↓` | Volver a lo que escribiste antes o después |
| `⌘ Z` `⌘ ⇧ Z` | Con el panel de ámbitos de búsqueda abierto, deshacer o rehacer un cambio en el orden de las fuentes de búsqueda |
| `⌫` | Con el cuadro vacío, salir de la búsqueda en el sitio, del ámbito de búsqueda o de la búsqueda en pestañas abiertas |
| `Esc` | Salir de la búsqueda en el sitio, del ámbito de búsqueda o de la búsqueda en pestañas abiertas |
| `Esc` o clic fuera de la barra de comandos | Cerrar la barra de comandos |

## Teclas de la nueva pestaña {#newtab-keys}

El cuadro de búsqueda de la nueva pestaña usa las mismas teclas que la barra de comandos. Además:

| Tecla o clic | Acción |
| --- | --- |
| Empezar a escribir | El texto va directamente al cuadro de búsqueda, sin necesidad de hacer clic antes |
| Clic en un resultado, un acceso directo, un marcador o una tarjeta de sitio | Abrirlo en la pestaña actual de forma predeterminada, o en una nueva si lo activas en General → New Tab Settings → Open in a new tab |
| Clic manteniendo pulsada `⌘` o clic central | Abrir en una pestaña en segundo plano |
| `⌥ ←` `⌥ →` | Mover una posición hacia delante o hacia atrás un acceso directo seleccionado con `Tab` |
| `⌘ Z` | Deshacer tu último cambio en los accesos directos o marcadores, como quitar, mover, crear una carpeta o eliminar un grupo |
| `⌘ ⇧ Z` | Rehacer lo que acabas de deshacer |
| `Esc` | Cancelar mientras arrastras un acceso directo o un marcador |

## Teclas del selector de pestañas {#switcher-keys}

| Tecla o clic | Acción |
| --- | --- |
| Mantener pulsada `⌥` y pulsar `Q` varias veces | Recorrer las pestañas recientes |
| `Tab`, `→` o `↓` | Seleccionar la pestaña siguiente |
| `⇧ Tab`, `←` o `↑` | Seleccionar la pestaña anterior |
| Soltar `⌥`, pulsar `↩` o hacer clic en una pestaña | Cambiar a la pestaña seleccionada |
| Clic en el botón de cerrar de la esquina de una vista previa | Cerrar esa pestaña; el selector sigue abierto |
| `Esc` o clic fuera del selector | Cerrar el selector y seguir en la pestaña actual |

Si has cambiado el atajo del selector, mantén pulsada la tecla modificadora de tu propio atajo.

## Teclas del recorte web {#web-clip-keys}

Mientras eliges qué recortar:

| Tecla o acción | Acción |
| --- | --- |
| `[` o `↑` | Seleccionar el elemento exterior |
| `]` o `↓` | Seleccionar el elemento interior |
| Girar la rueda del ratón | Pasar de un elemento exterior a uno interior |
| `↩` o clic en el contenido marcado | Abrirlo en una ventana flotante |
| `Esc` | Cancelar la selección |

En la ventana flotante, al hacer clic en un enlace se abre en una pestaña nueva; mantén pulsada `⌘` al hacer clic para abrirlo en segundo plano. Para obtener más información, consulta [Recorte web](../web-clip/).
