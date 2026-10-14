Aquí encontrarás las respuestas a las preguntas más frecuentes que recibimos en nuestro sitio web y en la comunidad. Cada respuesta enlaza a una página con más información.

## Uso {#using}

### ¿Cuál es el atajo predeterminado? ¿Se puede cambiar?

El atajo predeterminado es `⌘ ⇧ K | ⌘ ⇧ K` en el Mac y `Ctrl + Mayús + K` en Windows y Linux. Puedes cambiarlo en `chrome://extensions/shortcuts`. Para obtener más información, consulta [Atajos de teclado](../keyboard-shortcuts/#change). La versión para Firefox usa otro atajo predeterminado; consulta [Compatibilidad con navegadores](../browser-compatibility/#firefox).

### ¿Qué hago si el atajo no funciona?

Primero, comprueba que no estás en una página restringida, como la configuración `chrome://` o una tienda de extensiones. Después, comprueba en `chrome://extensions/shortcuts` que ninguna otra extensión usa el mismo atajo. En Dia, también debes cambiar a "Global" el ámbito que aparece junto al atajo.

### ¿Por qué la barra de comandos no se abre en algunas páginas?

Los navegadores no permiten que las extensiones se ejecuten en páginas restringidas, como la configuración `chrome://` o las tiendas de extensiones. Si pulsas el atajo en una de estas páginas, Lumno aplica la opción "Restricted page behavior" de sus ajustes y, de forma predeterminada, abre la búsqueda en una pestaña nueva. Para usar Lumno en archivos PDF o HTML locales, permite el acceso a las URL de archivo en la página de detalles de la extensión. Para obtener más información, consulta [Lo que Lumno no hace](../limitations/#restricted-pages).

### ¿Por qué el modo claro u oscuro de la barra de comandos no coincide con el de mi sistema?

En el modo "Follow system", la barra de comandos también tiene en cuenta los colores de la página actual. Si quieres que siga solo la configuración del sistema, desactiva "Adapt theme colors to each webpage" en la sección Appearance de los ajustes de Lumno.

### Si vengo de Arc, ¿puedo usar una barra de comandos familiar?

Sí. El funcionamiento de Lumno se inspira en [Arc](https://arc.net/) (sin tener relación con Arc), y puedes abrir la barra de comandos en cualquier momento en Dia, Chrome o Edge. Asigna `⌘ T` al atajo para mantener tus costumbres de Arc. Para obtener más información, consulta [Si vienes de Arc](../arc-command-bar/).

## Nueva pestaña {#new-tab}

### ¿Puedo usar solo la barra de comandos y conservar otra extensión de nueva pestaña?

Sí. Mantén Lumno activado y vuelve a instalar tu otra extensión de nueva pestaña, o desactívala y vuelve a activarla, para que se encargue de nuevo de la nueva pestaña. La barra de comandos no se ve afectada. Para ver los pasos, consulta [Usar otra extensión de nueva pestaña](../newtab-other-extensions/).

### ¿Por qué la barra de direcciones muestra una URL de la extensión en la nueva pestaña?

Se debe a la opción "Automatically focus input": para colocar el cursor directamente en el cuadro de búsqueda de Lumno, la barra de direcciones muestra la URL de la extensión. Si desactivas esta opción en los ajustes de Appearance de la nueva pestaña, la barra de direcciones se quedará vacía.

## Compatibilidad {#compatibility}

### ¿Qué navegadores son compatibles?

Lumno es compatible con navegadores Chromium como Chrome, Edge, Dia, Brave y Vivaldi, además de Firefox 140 o posterior y navegadores basados en Firefox como Zen. Safari todavía no es compatible. En Dia, la barra de comandos funciona, pero la nueva pestaña de Lumno aún no está disponible. Para obtener más información, consulta [Compatibilidad con navegadores](../browser-compatibility/).

### ¿En qué se diferencia la versión para Firefox de la versión para Chrome?

Las funciones principales son las mismas, con algunas limitaciones de Firefox: el recorte web y la imagen en imagen automática no están disponibles, la barra de comandos no se abre en páginas `about:`, en el sitio de complementos ni en archivos locales, y el atajo predeterminado es `⌃ ⇧ K | Alt + K`. Para obtener más información, consulta [Compatibilidad con navegadores](../browser-compatibility/#firefox).

### ¿Funciona en Zen, LibreWolf y otros navegadores basados en Firefox?

Sí. Estos navegadores usan la versión para Firefox: instálala desde [Complementos de Firefox](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/). El navegador necesita un motor de Firefox 140 o posterior.

### ¿Funciona en Safari o en el móvil?

Todavía no. El sistema de extensiones de Safari es muy distinto del de Chromium, así que no hay una versión de Lumno para Safari, y los navegadores de móviles y tabletas no son compatibles. Si estás viendo este sitio en un móvil con tu cuenta de Google, puedes tocar instalar ya: Lumno se instalará solo la próxima vez que abras Chrome en un ordenador con la misma cuenta y la sincronización activada. Para obtener más información, consulta [Compatibilidad con navegadores](../browser-compatibility/#safari).

## Datos y sincronización {#data}

### ¿Puedo sincronizar mis ajustes entre dispositivos?

Sí. De forma predeterminada, los ajustes se sincronizan a través de tu cuenta del navegador. Activa la sincronización WebDAV (con Nextcloud, Nutstore o tu propio servidor) para sincronizar también los iconos y los fondos, incluso entre navegadores distintos. Para obtener más información, consulta [Sincronización](../sync/).

### ¿Lumno sube mis datos de navegación?

No. Las pestañas, los marcadores y el historial se buscan en tu dispositivo. Lo que escribes solo se envía cuando buscas en la web o haces una pregunta a la IA, y únicamente al buscador o al sitio de IA que hayas elegido. Para obtener más información, consulta la [Política de privacidad](/es/privacy/).

### ¿Lumno es gratuito? ¿Hace falta una cuenta?

Lumno es totalmente gratuito y de código abierto, con licencia GPL-3.0, en [GitHub](https://github.com/kubai087/lumno-extension). No tiene sistema de cuentas, así que puedes usarlo en cuanto lo instalas, sin registrarte.
