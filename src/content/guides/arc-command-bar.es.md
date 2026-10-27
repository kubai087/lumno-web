[Arc](https://arc.net/) dejará de funcionar el 22 de diciembre de 2026. A partir de entonces, Arc para Mac y Windows no se podrá abrir. Antes de dejar Arc, saca tus datos y luego elige un navegador nuevo. Lumno se inspira en varias funciones de Arc, como la barra de comandos, el cambio entre pestañas recientes, la restauración de pestañas fijadas tras reiniciar y la imagen en imagen automática para vídeos. Instálalo en Chrome, Dia o Edge para seguir usándolas.

Lumno es un proyecto de código abierto independiente y no tiene relación con Arc ni con The Browser Company.

## Calendario del cierre de Arc {#timeline}

- **22 de octubre**: Arc anunció su cierre. Ya no se pueden crear cuentas de Arc.
- **23 de noviembre**: Arc Search para iOS y Android pierde sus funciones de IA y deja de permitir iniciar sesión y sincronizar, aunque sigue funcionando como navegador básico.
- **15 de diciembre**: último día para pedir una copia de los datos personales de tu cuenta de Arc o solicitar que se eliminen.
- **22 de diciembre**: Arc para Mac y Windows deja de funcionar. Todas las cuentas se desactivan y los datos personales asociados se eliminan en un plazo de 30 días.

Después del cierre tampoco podrás abrir Arc para acceder a los datos guardados en tu ordenador. Consulta todos los detalles en el artículo de Arc [Arc Sunset: Key Dates and What to Expect](https://resources.arc.net/hc/en-us/articles/44412972248471).

## Exporta tus datos antes del 22 de diciembre {#export}

- **Si te pasas a Dia**: no hace falta exportar nada. Instala Dia y elige importar desde Arc. Tus espacios, pestañas fijadas, carpetas, marcadores, historial, contraseñas y extensiones se trasladan, y los espacios se convierten en perfiles de Dia. Mantén Arc instalado hasta que termine la importación. Consulta [Move from Arc to Dia](https://resources.arc.net/hc/en-us/articles/44413129117591).
- **Si te pasas a otro navegador**: en los ajustes de Arc, abre «Advanced» y selecciona «Export Data». Arc guarda un archivo llamado `Arc Data Export.md` con los enlaces de tus favoritos, pestañas fijadas y carpetas, espacio por espacio. Es una lista de enlaces, no un archivo de marcadores, así que tendrás que abrir o guardar como marcador en tu nuevo navegador los que quieras conservar. Consulta [How Do I Export My Data from Arc?](https://resources.arc.net/hc/en-us/articles/25583851606039).

Los Easels y los Boosts no se pueden exportar ni pasan a Dia.

## ¿Usabas Lumno en Arc? Llévate tus ajustes {#lumno-settings}

Lumno guarda sus ajustes en el navegador donde está instalado, así que no podrás recuperarlos cuando Arc deje de funcionar. Antes de cambiar, [exporta tus ajustes](../sync/#export) en Lumno e impórtalos después de instalar Lumno en el nuevo navegador. También puedes activar la [sincronización WebDAV](../sync/), que además se lleva tus iconos y fondos.

Aunque Dia traslade la extensión, exporta antes una copia por si acaso.

## Elige tu próximo navegador {#choose}

| Navegador | Qué comparte con Arc | Con Lumno |
| --- | --- | --- |
| Dia | Del mismo equipo, con barra lateral, pestañas fijadas y selector de pestañas; importa directamente desde Arc | La barra de comandos funciona; la nueva pestaña aún no está disponible |
| Chrome, Edge | Sin barra lateral ni espacios, pero con la mayor oferta de extensiones | Funciona todo |
| [Zen Browser](https://zen-browser.app/) | Basado en Firefox, con barra lateral, espacios de trabajo y pantalla dividida, muy parecido a Arc | Se instala desde Complementos de Firefox; algunas funciones son limitadas |
| [Vivaldi](https://vivaldi.com/) | Barra lateral, espacios de trabajo y pantalla dividida | Funciona todo |

Para ver los detalles de cada navegador, consulta [Compatibilidad con navegadores](../browser-compatibility/).

## Equivalencias entre Arc y Lumno {#mapping}

| Arc | Lumno |
| --- | --- |
| `⌘ T` abre la barra de comandos | `⌘ ⇧ K` abre la barra de comandos; puedes cambiarlo a `⌘ T` |
| Cambiar a una pestaña abierta desde la barra de comandos | Seleccionar un resultado marcado como "Opened" y pulsar Intro |
| `⌃ Tab` cambia entre pestañas recientes | `⌥ Q` abre el selector de pestañas recientes |
| `⌘ ⇧ C` copia la URL | Asignar un atajo a "Copy Current Page URL" en la página de extensiones |
| Las pestañas fijadas se conservan al reiniciar | Activar "Restore Pinned Tabs After Restart" en los ajustes de Lumno |
| Los vídeos pasan a imagen en imagen al cambiar de pestaña | [Imagen en imagen automática](../auto-pip/), activada por defecto |
| Nueva pestaña | La nueva pestaña de Lumno (aún no disponible en Dia) |

## Pasos para el cambio {#steps}

1. [Instala Lumno](../install/): desde Chrome Web Store para Chrome y Dia, o desde los complementos de Edge para Edge.
2. Abre `chrome://extensions/shortcuts` y asigna `⌘ T` a "Open command bar", como en Arc y [Zen](https://zen-browser.app/). Para obtener más información, consulta [Atajos de teclado](../keyboard-shortcuts/#change). En Dia, primero libera `⌘ T` (consulta más abajo).
3. Pulsa `⌘ T` y prueba a [buscar en tus pestañas, marcadores e historial](../search-tabs-bookmarks-history/).
4. Para cambiar entre tus últimas páginas, pulsa `⌥ Q` y abre el [selector de pestañas recientes](../tab-switcher/).

Los atajos propios de Dia tienen prioridad, así que en Dia abre primero Settings → Shortcuts y cambia el `⌘ T` de "New Tab" a otra tecla. Para obtener más información, consulta [Compatibilidad con navegadores](../browser-compatibility/#dia). Si el atajo no funciona en Dia, cambia su ámbito de "In Dia" a "Global" en la página de extensiones.

## Funciones de Arc que Lumno no puede ofrecer {#limits}

La barra lateral, los espacios y la pantalla dividida dependen del propio navegador, por lo que una extensión no puede añadirlos. Si los necesitas, elige Dia, Zen o Vivaldi de la tabla anterior. Para obtener más información, consulta [Lo que Lumno no hace](../limitations/).
