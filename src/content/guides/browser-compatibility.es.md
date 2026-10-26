Lumno está diseñado para navegadores Chromium y también tiene una versión para Firefox. En la tabla siguiente se indica qué funciones están disponibles en cada navegador.

## Navegadores compatibles {#support}

| Navegador | Barra de comandos | Nueva pestaña | Instalar desde |
| --- | --- | --- | --- |
| Google Chrome | Sí | Sí | Chrome Web Store |
| Microsoft Edge | Sí | Sí | Complementos de Edge |
| Brave, [Arc](https://arc.net/), Vivaldi, Opera | Sí | Sí | Chrome Web Store |
| Dia | Sí | Todavía no | Chrome Web Store |
| Firefox, [Zen](https://zen-browser.app/) y otros | En parte | Sí | Complementos de Firefox |
| Safari | No | No | — |

Los navegadores de teléfonos y tabletas todavía no son compatibles. Si estás viendo este sitio en un móvil con tu cuenta de Google, puedes tocar instalar ya: Lumno se instalará solo la próxima vez que abras Chrome en un ordenador con la misma cuenta y la sincronización activada.

## Dia {#dia}

Dia no permite que las extensiones sustituyan la nueva pestaña, por lo que la nueva pestaña de Lumno no está disponible en este navegador. La barra de comandos funciona con normalidad.

Para abrir la barra de comandos con `⌘ T`, primero libera ese atajo en Dia, porque los atajos propios de Dia tienen prioridad:

1. En Dia, abre Settings → Shortcuts y cambia el atajo de "New Tab" de `⌘ T` a otra tecla.
2. Abre `dia://extensions/shortcuts` y asigna `⌘ T` a "Open command bar" de Lumno.

![Página Shortcuts de los ajustes de Dia, con "New Tab" fuera de ⌘T](dia-newtab "Paso 1: asigna otra tecla a "New Tab" en Settings → Shortcuts de Dia")

![Página de atajos de extensiones de Dia, con "Open command bar" de Lumno en ⌘T](dia-shortcuts "Paso 2: asigna ⌘T a "Open command bar" en dia://extensions/shortcuts")

Si el atajo no funciona, abre la página de atajos de extensiones y cambia el ámbito que aparece junto a Lumno de "In Dia" a "Global".

## Firefox {#firefox}

La versión para Firefox está disponible en [Complementos de Firefox](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/). Funciona en Firefox 140 y versiones posteriores, y también se puede instalar en navegadores basados en Firefox como Zen, LibreWolf y Floorp.

Como las API de extensiones de Firefox son distintas de las de Chromium, algunas funciones no están disponibles:

| Función | En Firefox |
| --- | --- |
| Imagen en imagen automática | No disponible; Firefox no permite que las extensiones pongan vídeos web en imagen en imagen |
| Recorte web | No disponible; Firefox no admite imagen en imagen para documentos |
| Barra de comandos en páginas `about:` y en el sitio de complementos | No disponible |
| Abrir páginas `about:` desde los accesos directos o la barra de comandos | No disponible |
| Barra de comandos en páginas locales `file://` | No disponible |
| Iconos de sitios | Los sitios que no has visitado pueden mostrar al principio un icono genérico |
| Liquid glass en la nueva pestaña | Solo el acabado de cristal, sin curvatura en los bordes |

Como Firefox ya usa `⌘ ⇧ K`, la versión para Firefox usa de forma predeterminada `⌃ ⇧ K | Alt + K`. `⌥ Q` no cambia. Para cambiar los atajos, abre `about:addons`, haz clic en el botón del engranaje de la esquina superior derecha y elige "Administrar atajos de extensiones".

## Safari {#safari}

El sistema de extensiones de Safari es muy distinto del de Chromium, y todavía no existe una versión de Lumno para Safari. Si quieres una búsqueda similar en todo el sistema en el Mac, prueba [Raycast](https://www.raycast.com/) o [Alfred](https://www.alfredapp.com/).

## Aceleración de gráficos {#graphics-acceleration}

Con la aceleración de gráficos desactivada, el navegador dibuja las páginas con el procesador, así que el desplazamiento y las animaciones pueden ir a saltos, y los efectos de fondo y los materiales de cristal de Lumno se ralentizan. Cuando Lumno detecta que el navegador no dibuja con la tarjeta gráfica, muestra «Graphics acceleration is off» debajo del cuadro de búsqueda de la nueva pestaña y encima de la barra de comandos.

![Un aviso debajo del cuadro de búsqueda de la nueva pestaña: Graphics acceleration is off, Turn it on for smoother pages; it takes a browser restart, con un botón Turn on a la derecha](graphics-notice "El aviso de aceleración de gráficos")

1. Haz clic en Turn on en el aviso. Lumno abre la configuración de Sistema del navegador (`chrome://settings/system`, o la misma página en Edge y Brave).
2. Activa «Usar la aceleración de gráficos cuando esté disponible».
3. Haz clic en «Reiniciar». El cambio se aplica cuando el navegador se reinicia.

Si prefieres dejarla desactivada, haz clic en el botón de cerrar a la derecha del aviso y no volverá a mostrarse en este ordenador. Si el aviso vuelve después de activarla y reiniciar, puede que un controlador gráfico, una máquina virtual o un escritorio remoto impidan al navegador usar la tarjeta gráfica; abre `chrome://gpu` para ver los detalles. La versión para Firefox no muestra este aviso.

## Idiomas de la interfaz {#languages}

Desde la versión 1.2.0, la extensión está disponible en 10 idiomas: español, inglés, chino simplificado y tradicional, japonés, coreano, alemán, francés, portugués (Brasil) y ruso. De forma predeterminada usa el idioma de tu navegador, y puedes cambiarlo en los ajustes.
