¿Ordenador nuevo, o varios navegadores a la vez? Tus accesos directos, fondos y ajustes pueden venir contigo. Lumno no tiene servidores propios, así que la sincronización se apoya en dos cosas que ya tienes: la sincronización de tu navegador y tu propio servidor WebDAV.

## Sincronización del navegador: no tienes que hacer nada {#browser-sync}

Si has iniciado sesión en el navegador con la sincronización activada, los ajustes de Lumno te siguen solos: tema, buscadores, accesos directos, tarjetas de sitios fijadas, la lista de bloqueo, y tu elección de fondo y enlaces de imagen.

Los iconos que subes y los fondos locales pesan demasiado para la sincronización del navegador. Para llevártelos también, usa WebDAV.

## Sincronización WebDAV: también iconos y fondos {#webdav}

La sincronización WebDAV está en beta y viene desactivada. Al activarla, tus ajustes completos, los iconos de accesos directos que has subido y tus fondos personalizados se guardan en el servidor que elijas.

1. Abre los ajustes de Lumno, ve a "Account & sync" y después a WebDAV.
2. Haz clic en "Add WebDAV" y rellena la dirección del servidor, la carpeta de sincronización, el usuario y la contraseña de aplicación.
3. Si quieres, haz clic en "Test connectivity" y después en "Save and turn on sync".

Añade la conexión en cada dispositivo. El usuario y la contraseña se quedan en ese ordenador y nunca viajan por la sincronización del navegador.

## Dónde alojarlo {#hosts}

Lumno se ha probado con Nextcloud autoalojado, con servidores WebDAV de Apache, nginx, rclone y WsgiDAV, y con Nutstore. Los servicios alojados y los NAS como Synology deberían funcionar si son compatibles con WebDAV estándar, pero aún no se han verificado.

Si tu servicio lo permite, usa una contraseña de aplicación creada para Lumno en lugar de la contraseña principal de tu cuenta.

## En tu segundo ordenador {#second-device}

Añade el mismo servidor, carpeta y cuenta. Si el servidor ya tiene datos, Lumno te pregunta qué versión usar; normalmente elige "Use server version". Antes de reemplazar nada, Lumno guarda una copia de seguridad completa de los ajustes de ese ordenador.

A partir de ahí, los cambios de ambos lados se combinan solos. Si dos ordenadores cambian lo mismo, como los accesos directos, la tarjeta muestra un conflicto. Haz clic en "Show differences" para ver qué cambió cada lado y elige uno.

## Lo que no se sincroniza {#not-synced}

- El historial, los marcadores y las pestañas abiertas: tu navegador los sigue sincronizando como siempre.
- Tu usuario y contraseña de WebDAV: cada dispositivo guarda los suyos.

Si desactivas WebDAV o eliminas la conexión, los archivos se quedan en tu servidor; bórralos allí si quieres. WebDAV no tiene cifrado de extremo a extremo, así que el administrador del servidor puede leer los archivos.

## Exportar e importar {#export}

¿Prefieres no sincronizar? Exporta tu configuración a un archivo desde los ajustes de Lumno e impórtala en el otro ordenador. El archivo incluye tus ajustes, no tus imágenes.
