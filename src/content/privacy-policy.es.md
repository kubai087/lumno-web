## 1. Ámbito y responsable

Esta Política de privacidad (la «Política») explica cómo la extensión de navegador Lumno (la «extensión») y las páginas públicas del sitio web de Lumno (`lumno.kubai.design`, el «sitio web») tratan la información sobre ti. Está redactada según la implementación real de la versión **0.9.58** de la extensión y se aplica a esa versión y a las posteriores hasta que se actualice.

- **Desarrollador y responsable del tratamiento:** Lumno lo desarrolla y mantiene un desarrollador independiente, Kubai087 (枯白啃设计), responsable del tratamiento descrito en esta Política.
- **Contacto:** [i@kubai.design](mailto:i@kubai.design). Consulta también la sección 15.
- **Fecha de entrada en vigor:** 8 de octubre de 2026.
- **Idioma de referencia:** la versión en chino simplificado de esta Política es la que rige. Las demás versiones son traducciones informativas; si hay diferencias, prevalece la versión en chino simplificado.

Lumno no ofrece cuentas ni almacenamiento en la nube, y no gestiona servidores que guarden datos de usuarios. El inicio de sesión con cuenta, la sincronización en la nube y las analíticas de uso del producto se eliminaron de la extensión en la versión 0.9.40.

En esta Política, «información personal» significa cualquier información registrada electrónicamente que se refiera a una persona física identificada o identificable. Nada de lo dispuesto en esta Política limita los derechos que te reconoce la ley aplicable.

## 2. Cómo tratamos la información

Las funciones principales de Lumno se ejecutan en tu navegador. Para ofrecer las funciones que ves y usas en su interfaz, la extensión lee o guarda la siguiente información en tu dispositivo. **Salvo en los casos descritos en la sección 4, esta información nunca sale de tu dispositivo ni se envía a Lumno o a su desarrollador.**

### 2.1 Datos del navegador

- **Pestañas:** URL, títulos, grupos e iconos, para buscar, cambiar, ordenar, restaurar y gestionar pestañas. Cuando usas el selector de pestañas, la extensión captura la pestaña actual como miniatura; conserva como máximo 12, cada una durante un máximo de 2 horas y solo en tu dispositivo.
- **Historial:** URL, títulos y horas de visita, para buscar y ordenar el historial en local y eliminar entradas cuando lo pidas.
- **Marcadores:** estructura de carpetas, nombres y URL, para buscar, mostrar y gestionar marcadores a petición tuya.
- **Sitios más visitados:** URL y títulos, para mostrarlos en la nueva pestaña. Las tarjetas de sitios que fijas u ocultas se guardan como ajustes.

### 2.2 Contenido de las páginas

- **Atajos y barra de comandos:** detecta los atajos de teclado de Lumno en las páginas web y muestra la barra de comandos.
- **Acciones sobre la selección:** desactivadas por defecto. Si las activas, la extensión lee el texto que seleccionas (hasta 2.400 caracteres) y solo lo usa cuando eliges una acción.
- **Imagen en imagen automática:** localiza el elemento de vídeo en los sitios de vídeo compatibles para abrir la imagen en imagen.
- **Seguimiento de progreso (Labs):** solo funciona con las tarjetas de sitios que marcas para seguimiento. Lee los enlaces anterior/siguiente, los datos estructurados y la información multimedia de la página para actualizar la URL y el título de esa tarjeta.

### 2.3 Búsqueda y ajustes

- **Historial de búsqueda:** lo que escribes y las URL y títulos de los resultados que eliges, para mejorar el orden en tu dispositivo.
- **Ajustes y archivos multimedia:** tema, idioma, diseño, accesos directos, proveedores de búsqueda, listas de bloqueo, interruptores de funciones, además de los iconos de accesos directos que subes, los fondos personalizados y las cachés que necesitan estas funciones.

### 2.4 Lo que no recopilamos

Lumno no requiere registro ni inicio de sesión. No recopila tu nombre, correo electrónico, teléfono ni dirección postal; no informa de recuentos de uso, clics, identificadores del dispositivo ni datos de fallos; y nunca envía tu historial, marcadores, lista de pestañas ni el contenido de las páginas al desarrollador.

## 3. Para qué necesita la extensión cada permiso

La extensión solo solicita los permisos que necesitan estas funciones y ningún permiso opcional:

| Permiso | Finalidad |
| --- | --- |
| `tabs`, `tabGroups` | Consultar, cambiar, crear, actualizar, agrupar y restaurar pestañas, y capturar las miniaturas del selector de pestañas. |
| `history` | Buscar y ordenar el historial en local, y eliminar entradas cuando lo pidas. |
| `bookmarks` | Buscar, mostrar y gestionar marcadores. |
| `topSites` | Mostrar tus sitios más visitados en la nueva pestaña. |
| `storage`, `unlimitedStorage` | Guardar ajustes, cachés, imágenes personalizadas y la configuración local que necesita la sincronización WebDAV, por encima de la cuota predeterminada del navegador. |
| `alarms` | Comprobar periódicamente en segundo plano el estado de la sincronización WebDAV. |
| `search` | Enviar las consultas que realizas al motor de búsqueda predeterminado del navegador. |
| `favicon` | Mostrar los iconos de los sitios a través del navegador. |
| `scripting` y acceso a sitios `<all_urls>` | Ofrecer la barra de comandos, los atajos, las acciones sobre la selección, la imagen en imagen y el seguimiento de progreso en las páginas web; escribir tu consulta en el servicio de IA o de búsqueda que elijas; obtener iconos de sitios e imágenes de fondo; y conectar con la dirección WebDAV que configures. |

El acceso amplio a sitios solo se usa para las funciones anteriores. No significa que Lumno lea, recopile o suba de forma masiva el contenido de las páginas.

## 4. Datos que salen de tu dispositivo

Las solicitudes siguientes las envía la extensión directamente al servicio de terceros correspondiente y **nunca pasan por un servidor de Lumno**. El destinatario también ve la dirección IP y la información del navegador que acompaña a cualquier solicitud de red, y las trata según su propia política de privacidad.

### 4.1 Sugerencias de búsqueda en línea

Mientras escribes en el buscador de Lumno (en la nueva pestaña o en la barra de comandos), lo que escribes se envía en tiempo real al servicio de sugerencias de tu motor de búsqueda actual para mostrar sugerencias. Los servicios compatibles son Google, Bing, Baidu, Sogou (ofrecido por Tencent en `sor.html5.qq.com`), DuckDuckGo, Yandex, Quark y Shenma (`sugs.m.sm.cn`), y Yahoo. Puedes cambiar quién recibe estas solicitudes cambiando de motor de búsqueda en los ajustes.

### 4.2 Búsqueda web, búsqueda en sitios e IA

- **Búsqueda web y en sitios:** las consultas que envías van al motor de búsqueda predeterminado de tu navegador o abren en una nueva pestaña el servicio de búsqueda o sitio web que elijas.
- **Búsqueda con IA y acciones sobre la selección:** solo después de que elijas una acción, la extensión abre el servicio de IA elegido (como ChatGPT, Gemini, DeepSeek, Doubao o Kimi) y escribe tu consulta o el texto seleccionado, junto con la instrucción que Lumno redacta para esa acción.

Equivale a visitar tú mismo esos sitios: el sitio recibe lo que envías y puede asociarlo a la sesión que tengas iniciada en él.

### 4.3 Iconos de sitios

Para obtener el icono de un sitio, el servicio de favicons de Google (`www.google.com` / `gstatic`) recibe la URL de la página; si eliges Favicon.is, solo se envía el dominio. Estas solicitudes no llevan cookies ni referente, y los iconos se guardan en caché en tu dispositivo. Las direcciones de iconos personalizados que defines para accesos directos las carga el navegador directamente desde esa dirección.

### 4.4 Fondos en línea y citas del día

- **Citas del día:** desactivadas por defecto. Si las activas, la extensión obtiene citas de la categoría elegida desde Hitokoto (`v1.hitokoto.cn`) y las guarda en caché durante el día.
- **Fondos de Bing:** se obtienen de `www.bing.com`; la solicitud solo incluye el mercado y el identificador de la imagen.
- **Fondos seleccionados y artísticos:** las fotos proceden de Lorem Picsum (`picsum.photos`, con origen en Unsplash) y las obras de la colección Open Access del Cleveland Museum of Art (`openaccess-cdn.clevelandart.org`); las solicitudes solo incluyen el ID y el tamaño de la imagen.
- **Fondos por enlace de imagen:** los enlaces que pegas se sincronizan con tus ajustes; cada dispositivo solicita la imagen una vez a esa dirección y luego la comprime y la guarda en caché en local.

Las descargas de fondos y citas no llevan cookies ni referente. Las miniaturas de vista previa del selector de fondos se cargan como imágenes web normales.

### 4.5 Notas de la versión y recursos del sitio web

- **Avisos de actualización:** tras una actualización, la extensión solicita a GitHub (`api.github.com`, o `github.com` como alternativa) el título de esa versión para mostrar un aviso. Puedes desactivar «Update Prompts» en los ajustes.
- **Página de novedades:** tras una actualización, la extensión puede abrir las notas de la versión del sitio web. Su URL incluye el origen de la visita, el motivo de la actualización y la versión de la extensión, y a esa página se le aplica la sección 6.
- **Enlaces de comentarios:** cuando abres un enlace de comentarios o de la comunidad, la extensión obtiene del sitio web la configuración de enlaces de la comunidad (`community-links.json`) y la imagen del código QR de la comunidad.

El sitio web está alojado en GitHub Pages, y GitHub, como proveedor de alojamiento, puede registrar las solicitudes, incluidas las direcciones IP.

## 5. Sincronización de ajustes

Lumno no ofrece sincronización en la nube. Tus ajustes solo pasan de un dispositivo a otro por las vías que elijas:

- **Sincronización integrada del navegador:** el tema, los proveedores de búsqueda, los accesos directos (títulos y URL), las tarjetas de sitios fijadas u ocultas (URL y títulos), las reglas de bloqueo, la elección de fondos y los enlaces de imágenes, las preferencias de citas del día y la dirección, carpeta y nombre de usuario de tu servidor WebDAV se guardan en `chrome.storage.sync` y el fabricante de tu navegador los sincroniza entre dispositivos según tu cuenta y tus ajustes de sincronización. Los iconos subidos, los fondos personalizados y las contraseñas de aplicación de WebDAV nunca forman parte de la sincronización del navegador.
- **Sincronización WebDAV (opcional):** desactivada por defecto; solo se activa si añades tú mismo un servidor. Una vez activada, tu configuración completa, los iconos de accesos directos subidos, los fondos personalizados y las instantáneas de configuración tomadas antes de sobrescribir se guardan mediante HTTPS en el servidor y la carpeta que indiques. El historial, los marcadores, las pestañas abiertas y las cachés de iconos nunca se suben. WebDAV no ofrece cifrado de extremo a extremo, por lo que los administradores de ese servidor pueden leer estos archivos.
- **Exportar e importar:** puedes exportar tus ajustes a un archivo JSON para conservarlos o importarlos en otro dispositivo. Las exportaciones no incluyen imágenes.

## 6. Analítica del sitio web y cookies

Las páginas públicas del sitio web cargan el script de analítica de VibeLoft y pueden activar Google Analytics (con anonimización de IP) en el despliegue. Estos servicios pueden tratar las URL de las páginas (incluidos los parámetros de consulta) y sus títulos, las horas de visita, las páginas de referencia, los eventos de clic, el idioma del navegador, el tipo de dispositivo y navegador, la ubicación aproximada, las direcciones IP y cookies o identificadores seudónimos similares.

Usamos estos datos solo para entender el tráfico, las fuentes y el rendimiento del sitio web, y nunca los vinculamos con datos de la extensión. La extensión en sí no carga estos scripts. Puedes bloquear la analítica del sitio web con las funciones de cookies, bloqueo de scripts o protección contra rastreo de tu navegador sin que ninguna función de la extensión se vea afectada.

## 7. Comunicación, transferencia y divulgación

Lumno no vende, alquila ni intercambia tu información personal, no la usa para publicidad personalizada ni conductual entre contextos, y no la facilita a intermediarios de datos ni a plataformas publicitarias. Más allá de completar las acciones que inicias, no compartimos, transferimos ni divulgamos públicamente tu información personal.

Terceros que pueden recibir datos:

| Destinatario | Datos que puede recibir | Finalidad |
| --- | --- | --- |
| Fabricantes de navegadores (como Google y Microsoft) | Ajustes en `chrome.storage.sync` y metadatos de la cuenta del navegador | Sincronización integrada de los ajustes de la extensión. |
| Tu servicio WebDAV (como Jianguoyun, un NAS o un servidor propio) | Configuración completa, iconos, fondos, instantáneas y el nombre de usuario y la contraseña de aplicación usados para iniciar sesión | Sincronizar ajustes e imágenes según tu configuración. |
| Servicios de sugerencias de búsqueda (sección 4.1) | Lo que escribes y los metadatos de la solicitud | Mostrar sugerencias de búsqueda. |
| Servicios de búsqueda, IA y sitios web que eliges | Consultas, texto seleccionado e instrucciones que envías | Completar las búsquedas y acciones de IA que inicias. |
| Servicio de favicons de Google, Favicon.is | URL de la página o dominio | Mostrar los iconos de los sitios. |
| Hitokoto, Bing, Lorem Picsum, Cleveland Museum of Art | Categoría, mercado, ID y tamaño de la imagen | Citas del día y fondos en línea que activas. |
| GitHub | Versión de la extensión y registros de acceso de las solicitudes al sitio web y a las versiones | Avisos de actualización y alojamiento del sitio web. |
| [VibeLoft](https://vibeloft.ai/privacy), Google Analytics (si está activado) | Información de visitas y técnica del sitio web | Analizar el tráfico, las fuentes y el rendimiento del sitio web. |

Si Lumno se fusiona, se transfiere o pasa a un nuevo responsable de mantenimiento, exigiremos al receptor que siga vinculado por esta Política, o te pediremos de nuevo tu consentimiento antes de que cambie la forma de tratar tu información. Podemos divulgar información cuando lo exija la ley o una solicitud legítima de una autoridad competente; como no tenemos información personal sobre ti, normalmente solo afectaría a los datos de analítica del sitio web.

## 8. Almacenamiento y conservación

La extensión guarda datos en `chrome.storage.local`, `chrome.storage.sync` y el almacenamiento de sesión del navegador, así como en una base IndexedDB propia de la extensión: los iconos de accesos directos subidos se guardan en `chrome.storage.local`; los fondos personalizados, la configuración WebDAV, las contraseñas de aplicación y las copias de recuperación, en IndexedDB.

| Datos | Conservación |
| --- | --- |
| Ajustes locales, imágenes, cachés y datos de orden de búsqueda | Hasta que los elimines en la extensión, borres los datos de la extensión en tu navegador o desinstales Lumno. |
| Miniaturas del selector de pestañas | Hasta 2 horas cada una. |
| Ajustes en la sincronización del navegador | Los conserva y elimina el fabricante de tu navegador según tu cuenta y tus ajustes de sincronización. |
| Archivos en tu servidor WebDAV | Se conservan en tu servidor hasta que los elimines. Pausar la sincronización, quitar una conexión o desinstalar Lumno no los elimina. |
| Archivos de ajustes exportados | Los conservas y eliminas tú. |
| Datos de terceros y de analítica del sitio web | Cada servicio los conserva según su propia política. |

Lumno no conserva información personal sobre ti en ningún sistema que controle.

## 9. Tus derechos y opciones

Puedes:

- Usar todas las funciones de Lumno sin registrarte ni iniciar sesión.
- Cambiar los motores de búsqueda, los servicios de IA y las fuentes de iconos en los ajustes, o desactivar las acciones sobre la selección, las citas del día, los fondos en línea, los avisos de actualización y funciones similares.
- Decidir si activas la sincronización WebDAV, y pausar o quitar una conexión en cualquier momento.
- Desactivar la sincronización de extensiones en tu navegador para mantener los ajustes en un solo dispositivo.
- Eliminar datos en la extensión, borrar los datos de la extensión en tu navegador o desinstalar la extensión para eliminar todos los datos locales.

Como Lumno no tiene información personal sobre ti, normalmente no hay datos en Lumno que consultar, copiar o eliminar. Para ejercer los derechos que te reconozca la ley aplicable, como el acceso, la portabilidad, la rectificación, la supresión, la retirada del consentimiento, la limitación o la oposición, o si tienes preguntas sobre la analítica del sitio web, contáctanos como se indica en la sección 15. Responderemos en un plazo de 15 días hábiles tras verificar tu solicitud, o en el plazo que exija la ley aplicable. También puedes presentar una reclamación ante tu autoridad de protección de datos. Ejercer estos derechos nunca dará lugar a un trato discriminatorio.

Lumno no elabora perfiles sobre ti ni toma decisiones automatizadas que produzcan efectos jurídicos sobre ti o te afecten de forma significativa de modo similar.

## 10. Seguridad

Protegemos tus datos con las siguientes medidas:

- Los datos de navegación solo se tratan en tu navegador y nunca se envían al desarrollador.
- WebDAV solo acepta direcciones HTTPS, mantiene la verificación de certificados y rechaza las redirecciones de autenticación.
- Las contraseñas de aplicación de WebDAV permanecen en el almacenamiento propio de la extensión en el dispositivo actual. Nunca entran en la sincronización del navegador ni se exponen a páginas web o scripts de contenido.
- Las descargas de iconos de sitios y fondos no llevan cookies ni referente.

Te recomendamos generar una contraseña de aplicación WebDAV exclusiva para Lumno y mantener seguros tu dispositivo, tu cuenta del navegador y tu cuenta WebDAV. Ningún método de transmisión o almacenamiento es completamente seguro. Si encuentras un problema de seguridad, avísanos en [i@kubai.design](mailto:i@kubai.design).

## 11. Menores

Lumno está pensado para el público general, no está diseñado para menores y no recopila a sabiendas información personal de menores. Los menores de 14 años solo deberían usar Lumno con el consentimiento y la supervisión de su madre, padre o tutor. Si crees que hemos tratado por error información de un menor, contáctanos para que podamos revisarlo.

## 12. Tratamiento internacional

Lumno no gestiona servidores que guarden datos de usuarios, por lo que tus datos nunca se transfieren a sistemas que Lumno controle. Los fabricantes de navegadores, los servicios de búsqueda, IA, WebDAV e imágenes que elijas, así como GitHub, VibeLoft y Google Analytics, pueden tratar datos fuera de tu país o región conforme a sus propias políticas de privacidad y mecanismos de transferencia.

## 13. Política de datos de usuario de Chrome Web Store

El uso que Lumno hace de la información recibida de las API del navegador cumple la [Política de datos de usuario de Chrome Web Store](https://developer.chrome.com/docs/webstore/program-policies/policies), incluidos los requisitos de **uso limitado** (Limited Use):

- Los datos solo se usan para ofrecer o mejorar la finalidad única de la extensión, visible para el usuario.
- Los datos solo se envían a los servicios indicados en la sección 4 en la medida necesaria para completar las acciones que inicias.
- Los datos nunca se venden ni se transfieren a terceros, ni se usan para publicidad personalizada, ni para evaluar la solvencia o con fines crediticios.
- El desarrollador no puede acceder a tus datos de navegación ni a tus ajustes.

## 14. Cambios en esta Política

Si Lumno añade nuevas categorías de datos, finalidades o destinatarios —por ejemplo, si recupera las cuentas o las funciones en la nube—, actualizaremos esta Política y las declaraciones de datos de la tienda antes de que el cambio entre en vigor y lo avisaremos de forma destacada en la extensión; cuando la ley exija consentimiento, te lo volveremos a pedir. Para cambios de redacción, actualizaciones de enlaces o aclaraciones que no reduzcan tus derechos, es posible que solo actualicemos la fecha de esta página. No reduciremos tus derechos en virtud de esta Política sin tu consentimiento.

## 15. Contacto

Si tienes preguntas, comentarios o solicitudes sobre esta Política o tu información personal, escribe a [i@kubai.design](mailto:i@kubai.design). También puedes abrir un issue público en [GitHub](https://github.com/kubai087/lumno-extension/issues), pero no compartas información personal en canales públicos.
