Todo el código de Lumno es público, así que cualquier persona puede comprobar qué hace la extensión y qué no hace.

## Código abierto {#open-source}

- Código: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- Licencia: GPL-3.0
- Informar de un problema: abre una incidencia (issue) en GitHub

Cada versión publicada en las tiendas se compila a partir de este mismo código. Los cambios se detallan en las [notas de la versión](/es/release/) y en GitHub Releases.

## Seguridad desde el diseño {#design}

- Manifest V3: los navegadores no permiten que las extensiones Manifest V3 descarguen y ejecuten código remoto, por lo que todo el código de Lumno está incluido en el paquete revisado.
- Sin servidores: no hay sistema de cuentas ni ningún lugar donde se almacenen tus datos.
- Tu contraseña de aplicación de WebDAV se guarda solo en tu dispositivo y nunca se sincroniza a través del navegador.

## Permisos {#permissions}

Lumno solo solicita los permisos necesarios y ningún permiso opcional. El acceso a todos los sitios se usa solo para mostrar la barra de comandos y funciones similares en las páginas. Lumno no lee ni sube el contenido de las páginas de forma masiva.

La [Política de privacidad](/es/privacy/#permissions) explica para qué sirve cada permiso.
