Todo el código de Lumno es público, así que cualquier persona puede comprobar qué hace la extensión y qué no hace.

## Código abierto {#open-source}

- Código: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- Licencia: GPL-3.0
- Informar de un problema: abre una incidencia (issue) en GitHub

Cada versión publicada en las tiendas se compila a partir de este mismo código. Los cambios se detallan en las [notas de la versión](/es/release/) y en GitHub Releases.

## Seguridad desde el diseño {#design}

- Manifest V3: los navegadores no permiten que las extensiones Manifest V3 descarguen y ejecuten código remoto, por lo que todo el código de Lumno está incluido en el paquete revisado.
- Sin servidores: no hay sistema de cuentas ni ningún lugar donde se almacenen tus datos.
- Permisos mínimos: Lumno solo solicita los permisos necesarios y ningún permiso opcional.
- Tu contraseña de aplicación de WebDAV se guarda solo en tu dispositivo y nunca se sincroniza a través del navegador.

## Uso de cada permiso {#permissions}

| Permiso | Uso |
| --- | --- |
| `tabs`, `tabGroups` | Buscar, cambiar y restaurar pestañas; capturar las vistas previas del selector |
| `history` | Buscar en tu historial en tu dispositivo |
| `bookmarks` | Buscar, mostrar y gestionar marcadores |
| `topSites` | Mostrar tus sitios más visitados en la nueva pestaña |
| `storage`, `unlimitedStorage` | Guardar ajustes, iconos y fondos |
| `alarms` | Comprobar periódicamente el estado de la sincronización WebDAV |
| `search` | Enviar búsquedas a tu buscador predeterminado |
| `favicon` | Mostrar iconos de sitios |
| `scripting` y acceso a todos los sitios | Mostrar la barra de comandos en las páginas, responder a los atajos y ofrecer las acciones sobre la selección y la imagen en imagen |

El acceso a todos los sitios se usa solo para mostrar la barra de comandos y funciones similares en las páginas. Lumno no lee ni sube el contenido de las páginas de forma masiva.
