Cada línea del código de Lumno es pública, así que cualquiera puede ver qué hace la extensión y qué no.

## Código abierto {#open-source}

- Código: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- Licencia: GPL-3.0
- ¿Has encontrado un problema? Abre una incidencia en GitHub

Cada versión de las tiendas se compila a partir de ese mismo código, y los cambios se recogen en las [novedades](/es/release/) y en GitHub Releases.

## Diseñado para ser seguro {#design}

- Manifest V3: los navegadores no dejan que las extensiones Manifest V3 descarguen y ejecuten código remoto, así que todo el código de Lumno está en el paquete revisado.
- Sin servidores: sin sistema de cuentas y sin ningún sitio donde se guarden tus datos.
- Solo los permisos necesarios, y ninguno opcional.
- Tu contraseña de aplicación de WebDAV se queda en tu dispositivo y nunca pasa por la sincronización del navegador.

## Para qué sirve cada permiso {#permissions}

| Permiso | Para qué se usa |
| --- | --- |
| `tabs`, `tabGroups` | Buscar, cambiar y restaurar pestañas; capturar las vistas previas del selector |
| `history` | Buscar en tu historial en tu dispositivo |
| `bookmarks` | Buscar, mostrar y gestionar marcadores |
| `topSites` | Mostrar tus sitios más visitados en la nueva pestaña |
| `storage`, `unlimitedStorage` | Guardar ajustes, iconos y fondos |
| `alarms` | Comprobar periódicamente el estado de la sincronización WebDAV |
| `search` | Pasar las búsquedas a tu buscador predeterminado |
| `favicon` | Mostrar iconos de sitios |
| `scripting` y acceso a todos los sitios | Mostrar la barra de comandos en las páginas, responder a atajos, acciones de texto e imagen en imagen |

El acceso a todos los sitios solo se usa para mostrar la barra de comandos y funciones parecidas en las páginas. Lumno no lee ni sube el contenido de las páginas de forma masiva.
