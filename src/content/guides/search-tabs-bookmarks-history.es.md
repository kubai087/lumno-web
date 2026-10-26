Con decenas de pestañas abiertas y cientos de marcadores, encontrar una página puede llevar más tiempo que abrirla. Lumno lo reúne todo en un solo cuadro de búsqueda: pulsa un atajo, escribe unas letras y verás juntas tus pestañas abiertas, tus marcadores y tu historial.

## Abrir el cuadro de búsqueda {#open}

Pulsa `⌘ ⇧ K` en cualquier página. El cuadro de búsqueda aparece en el centro de la pantalla. Para cerrarlo, pulsa `Esc` o haz clic fuera del cuadro.

En páginas restringidas, como la configuración `chrome://` o las tiendas de extensiones, los navegadores no permiten que las extensiones muestren contenido. En estas páginas, Lumno aplica la opción "Restricted page behavior" de sus ajustes.

## Resultados de búsqueda {#results}

La etiqueta que aparece junto a cada resultado indica su procedencia:

- Opened: una pestaña abierta en este momento. Pulsa Intro para cambiar a ella en lugar de abrir la página otra vez.
- Bookmark: una página de tu barra de marcadores o de tus carpetas; también se indica la carpeta.
- Frequent e History: los sitios que más visitas y tu historial de navegación.

También se muestran las sugerencias de tu buscador; pulsa Intro para buscar. Como en la barra de direcciones, al moverte a una sugerencia con las flechas, esta pasa al cuadro de búsqueda, y `Esc` recupera lo que habías escrito. Los resultados que eliges con más frecuencia aparecen más arriba.

De forma predeterminada, el primer resultado es la página que Lumno completa por ti. Si sobre todo buscas, cambia First Search Result Priority a Search First en Search Result Settings, en los ajustes de Lumno: la búsqueda pasa a ser lo primero, seguida del marcador, la entrada del historial o el sitio frecuente cuyo título coincide exactamente con lo que escribiste.

![Lumno abierto en una página en blanco: al escribir chrome aparecen una pestaña de GitHub abierta, sugerencias de búsqueda, un marcador y sitios frecuentes](search "Al escribir chrome aparecen juntos las pestañas abiertas, los marcadores y los sitios frecuentes")

Otras teclas útiles: `⌥ ↩` abre un resultado en la pestaña actual y `⇧ ↩` abre de nuevo una pestaña ya abierta. Para ver todas las teclas, consulta [Atajos de teclado](../keyboard-shortcuts/#command-bar-keys).

## Abrir en la pestaña actual {#current-tab}

Cuando abres la barra de comandos en una página web, los resultados se abren en una pestaña nueva y la página en la que estabas se queda como está. Para abrirlos en la pestaña actual, como hace la barra de direcciones, desactiva Open in a new tab when clicked en General → Command Bar, en los ajustes de Lumno. A partir de entonces:

- Las páginas, las búsquedas, las direcciones escritas y las búsquedas en sitios se abren en la pestaña actual, y la indicación junto a cada resultado cambia de New Tab a Go.
- En una pestaña fijada, los resultados se siguen abriendo en una pestaña nueva, para no sustituir la página fijada.
- A las pestañas ya abiertas se sigue cambiando directamente.

Sea cual sea el ajuste, mantén pulsada `⌥` al pulsar Intro o hacer clic para abrir un resultado de la otra forma, o mantén pulsada `⌘` para abrirlo en segundo plano. El cuadro de búsqueda de la nueva pestaña tiene su propio ajuste; consulta [Teclas de la nueva pestaña](../keyboard-shortcuts/#newtab-keys).

## Escrito con la distribución de teclado equivocada {#keyboard-layout}

Si lo que escribes no coincide con nada en tus pestañas, marcadores o historial, Lumno lo vuelve a leer como si lo hubieras escrito con un teclado ruso, ucraniano, hebreo, árabe o coreano (2 juegos). Así, `vjcrdf` encuentra Москва. También funciona al revés: `пшерги`, escrito con la distribución rusa todavía activa, encuentra GitHub. Estos resultados aparecen debajo de las coincidencias directas.

La búsqueda también ignora diferencias como los acentos y los caracteres de ancho completo, y el coreano se puede buscar por consonantes iniciales (`ㅅㅇ` encuentra 서울). El panel de ámbito de búsqueda funciona igual.

Los títulos en chino se encuentran por pinyin, por iniciales o mezclando ambos: `wxds`, `wxdushu` y `weixinds` encuentran 微信读书. Para tratar z y zh, c y ch, s y sh, n y l, an y ang, en y eng, e in e ing como iguales, activa Fuzzy pinyin en Search Result Settings, en los ajustes de Lumno.

## Buscar solo en las pestañas abiertas {#open-tabs}

Si tienes muchas pestañas abiertas, puedes acotar la búsqueda: pulsa `Tab` una vez con el cuadro vacío. Aparece "Search open tabs" a la izquierda y en la lista solo quedan tus pestañas abiertas. Escribe para filtrar, pulsa Intro para cambiar de pestaña y `Esc` para salir.

![El cuadro de búsqueda muestra "Search open tabs" a la izquierda, con solo las pestañas abiertas en la lista](opentabs "Buscar solo en las pestañas abiertas")

Para buscar solo en marcadores, historial o sitios frecuentes, pulsa `Tab` dos veces con el cuadro vacío y elige una opción en el panel de ámbitos de búsqueda.

## Cerrar las demás pestañas {#close-other-tabs}

Cuando se acumulen las pestañas, haz clic en el icono del pincel a la derecha del cuadro de búsqueda y, en el aviso que aparece, haz clic en "Close" para cerrar las demás pestañas de la ventana actual. La pestaña actual, las pestañas fijadas y las que están en un grupo de pestañas se quedan abiertas. El botón está tanto en la barra de comandos como en el cuadro de búsqueda de la nueva pestaña.

Si cambias de idea, vuelve a hacer clic en el icono del pincel, pulsa `Esc` o haz clic fuera del aviso.
