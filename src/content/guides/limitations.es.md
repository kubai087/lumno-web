Lumno es una extensión de navegador, no un navegador propio, por lo que algunas funciones dependen de las limitaciones del navegador. Estas son las limitaciones conocidas. Si necesitas alguna de estas funciones, puede que alguna de las herramientas que se mencionan en esta página se ajuste mejor a ti.

## Páginas en las que la barra de comandos no se abre {#restricted-pages}

Por seguridad, los navegadores no permiten que ninguna extensión ejecute scripts ni muestre su propia interfaz en estas páginas, y Lumno no puede saltarse esa restricción:

- Las páginas del navegador que empiezan por `chrome://` o `edge://`, como la configuración y la página de extensiones
- Chrome Web Store y el sitio de complementos de Edge
- En Firefox, las páginas que empiezan por `about:` y el sitio Firefox Add-ons

Si pulsas el atajo en una de estas páginas, la barra de comandos no puede aparecer encima, así que Lumno abre una pestaña nueva con el cursor en el cuadro de búsqueda para que sigas buscando allí. No es un fallo: en las páginas web normales, la barra de comandos sigue abriéndose directamente en la página.

Si prefieres que se abra la nueva pestaña de tu navegador, ve a General → Shortcut Settings → Restricted page behavior en los ajustes de Lumno y elige "Follow browser setting". Si otra extensión proporciona tu nueva pestaña, Lumno elige esta opción automáticamente.

Solo está bloqueado abrir la barra de comandos en estas páginas. Abrir una página del navegador como `chrome://inspect/#devices` desde un acceso directo o la barra de comandos funciona con normalidad.

En los archivos locales (PDF o HTML cuya dirección empieza por `file://`), puedes usar la barra de comandos después de permitir el acceso a las URL de archivo en la página de detalles de la extensión.

## Contenido fuera del navegador {#outside-browser}

Lumno solo busca en el contenido de tu navegador. Si quieres buscar apps, archivos y ajustes del sistema con un solo atajo, prueba [Raycast](https://www.raycast.com/) o [Alfred](https://www.alfredapp.com/) en macOS.

## Compatibilidad con navegadores {#browsers}

- Safari no es compatible, ni tampoco los navegadores de dispositivos móviles.
- En Dia, la barra de comandos funciona, pero la nueva pestaña de Lumno no está disponible. Además, los atajos propios de Dia tienen prioridad: para abrir la barra de comandos con `⌘ T`, primero cambia el atajo de "New Tab" en Dia. Para obtener más información, consulta [Compatibilidad con navegadores](../browser-compatibility/#dia).
- Algunas funciones no están disponibles en la versión de Firefox. Para obtener más información, consulta [Compatibilidad con navegadores](../browser-compatibility/).

## Widgets en la nueva pestaña {#widgets}

La nueva pestaña de Lumno prioriza la sencillez y no incluye widgets como el tiempo, tareas o notas. Si quieres una nueva pestaña con muchos widgets, prueba [Momentum](https://momentumdash.com/) o [Tabliss](https://tabliss.io/).

Los navegadores solo permiten que una extensión gestione la nueva pestaña a la vez. Puedes seguir usando la nueva pestaña de otra extensión y, al mismo tiempo, la barra de comandos de Lumno. Para obtener más información, consulta [Usar otra extensión de nueva pestaña](../newtab-other-extensions/).

## Sincronización en la nube {#data}

Lumno no tiene servidores, por lo que no ofrece cuentas en la nube. Tus ajustes se sincronizan mediante la sincronización integrada de tu navegador. Para sincronizar también los iconos y los fondos, necesitas tu propio servidor WebDAV, como Nextcloud o un NAS. Para obtener más información, consulta [Sincronización](../sync/).

El historial, los marcadores y las pestañas abiertas no forman parte de la sincronización de Lumno. Tu navegador los sigue sincronizando como de costumbre.
