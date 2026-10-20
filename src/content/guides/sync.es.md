Si usas varios ordenadores o navegadores, tus accesos directos, fondos y ajustes pueden sincronizarse. Lumno no tiene servidores propios, por lo que la sincronización se basa en dos herramientas que ya tienes: la sincronización de tu navegador y tu propio servidor WebDAV.

## Sincronización del navegador: no requiere configuración {#browser-sync}

Si has iniciado sesión en el navegador y la sincronización está activada, los ajustes de Lumno se sincronizan automáticamente. Esto incluye el tema, los buscadores, los accesos directos, las tarjetas de sitios fijadas, la lista de bloqueo, la elección de fondo y los enlaces de imagen.

Los iconos que subes, los fondos locales y las colecciones de citas que importas ocupan demasiado para la sincronización del navegador. Para sincronizarlos también, usa WebDAV.

El navegador da a cada extensión un espacio de sincronización limitado. Puedes añadir hasta 200 accesos directos; los que no caben en la sincronización del navegador se quedan solo en ese ordenador y se sincronizan por WebDAV cuando lo activas. En los ajustes de Lumno, en Account & sync, puedes ver cuántos de tus accesos directos se sincronizan con el navegador.

## Sincronización WebDAV: también iconos y fondos {#webdav}

La sincronización WebDAV está en fase beta y desactivada de forma predeterminada. Cuando la activas, tus ajustes completos, los iconos de accesos directos que has subido, tus fondos personalizados y las citas que has importado se guardan en el servidor que elijas.

1. Abre los ajustes de Lumno y ve a Account & sync → WebDAV.
2. Haz clic en "Add WebDAV" e introduce la dirección del servidor, la carpeta de sincronización, el nombre de usuario y la contraseña de aplicación.
3. Si quieres, haz clic en "Test connectivity" y, después, en "Save and turn on sync".

La contraseña de aplicación se guarda solo en ese ordenador y nunca se sincroniza a través del navegador. La dirección del servidor, la carpeta de sincronización y el nombre de usuario sí se sincronizan con tus otros dispositivos, para que puedas terminar la configuración allí.

## Elegir un servidor {#hosts}

Lumno se ha probado con Nextcloud autoalojado, con servidores WebDAV de Apache, nginx, rclone y WsgiDAV, y con Nutstore (坚果云). Los servicios alojados y los NAS como Synology deberían funcionar si son compatibles con WebDAV estándar, pero todavía no se han probado.

Si tu servicio ofrece contraseñas de aplicación, crea una para Lumno en lugar de usar la contraseña principal de tu cuenta.

Si un servidor recibe demasiadas solicitudes en poco tiempo, servicios como Nutstore (坚果云) las rechazan durante un rato (HTTP 429 o 503). Lumno pausa entonces la sincronización en segundo plano y vuelve a intentarlo por su cuenta tras la espera que indique el servidor, o tras una espera creciente de 5 minutos hasta una hora. Los datos de tu ordenador se conservan. Los ajustes de Lumno explican el motivo y cuándo lo volverá a intentar, y la ventana de la barra de herramientas muestra WebDAV waiting to retry.

## Configurar otro ordenador {#second-device}

Si los dos ordenadores han iniciado sesión en la misma cuenta del navegador, abre Account & sync → WebDAV en los ajustes de Lumno del otro ordenador. Verás una conexión marcada como "From another device" con la dirección del servidor, la carpeta y el nombre de usuario ya rellenados; solo tienes que volver a escribir la contraseña de aplicación. Si no quieres usarla en ese ordenador, haz clic en "Dismiss". Si los ordenadores no comparten cuenta del navegador, añade una conexión con el mismo servidor, la misma carpeta y la misma cuenta.

Si el servidor ya contiene datos, Lumno te pregunta qué versión quieres usar; en la mayoría de los casos, elige "Use server version". Antes de reemplazar ningún dato, Lumno hace una copia de seguridad completa de los ajustes de ese ordenador.

A partir de ese momento, los cambios de ambos ordenadores se combinan automáticamente. Si los dos ordenadores modifican lo mismo antes de sincronizarse, por ejemplo los accesos directos o un ajuste concreto, la tarjeta muestra un conflicto en lugar de dejar que uno sobrescriba al otro. Haz clic en "Show differences" para comparar los cambios de cada lado y elige la versión que quieres conservar.

## Elementos que no se sincronizan {#not-synced}

- El historial, los marcadores y las pestañas abiertas: tu navegador los sigue sincronizando como de costumbre.
- Tu contraseña de aplicación de WebDAV: cada dispositivo guarda la suya.

Si desactivas WebDAV o eliminas la conexión, los archivos se mantienen en tu servidor; puedes eliminarlos allí si quieres. La sincronización WebDAV no tiene cifrado de extremo a extremo, por lo que el administrador del servidor puede leer los archivos.

## Exportar e importar {#export}

Si prefieres no usar la sincronización, puedes exportar tu configuración a un archivo desde los ajustes de Lumno e importarlo en otro ordenador. El archivo contiene tus ajustes, pero no tus imágenes.
