El recorte web coloca una parte de una página en su propia ventana flotante, como una tabla, un bloque de código o un gráfico. La ventana se mantiene por encima de las demás aunque cambies de pestaña o de aplicación, así que puedes tenerla a la vista mientras lees o trabajas.

## Activar el recorte web {#enable}

El recorte web está desactivado de forma predeterminada. Para usarlo, activa "Web Clip" en los ajustes de Lumno.

## Recortar parte de una página {#how}

1. En la página que quieras recortar, pulsa `⌘ ⇧ K` (`Ctrl + Shift + K` en Windows) para abrir la barra de comandos, escribe `/clip` y pulsa Intro.

![Barra de comandos con /clip escrito y el resultado "Start Web Clip"](clip-command "Escribe /clip en la barra de comandos")

2. Mueve el puntero por la página. Lumno marca con un marco discontinuo la zona que se puede recortar.
3. Si el marco es demasiado grande o pequeño, desplaza la rueda del ratón para cambiarlo. También puedes pulsar `[` o `↑` para seleccionar el elemento que lo contiene, o `]` o `↓` para seleccionar uno de su interior.
4. Haz clic en el contenido marcado para abrirlo en una ventana flotante. Para cancelar, pulsa `Esc`.

![Una indicación en la parte superior de un artículo y, debajo, la tabla de propiedades CSS rodeada por un marco discontinuo](clip-picker "Elige el contenido con el marco discontinuo")

## La ventana flotante {#window}

- La ventana muestra una copia del contenido elegido. Cuando esa parte de la página original cambia, la ventana también se actualiza.
- Al hacer clic en un enlace dentro de la ventana, se abre en una pestaña nueva del navegador. Para abrirlo en segundo plano, mantén pulsada `⌘` (`Ctrl` en Windows) al hacer clic.
- Lleva el puntero a la parte inferior de la ventana para mostrar los botones "Reselect" y "Close".
- Puedes mover la ventana y cambiar su tamaño como cualquier otra.

## Limitaciones {#limits}

El recorte web se basa en el Document Picture-in-Picture del navegador, por lo que tiene estas limitaciones:

- Solo funciona en la página principal de un sitio HTTPS, no dentro de marcos incrustados (iframes).
- No está disponible en los sitios que desactivan la imagen en imagen mediante su política.
- Si ya hay un vídeo reproduciéndose en imagen en imagen, ciérralo primero.
- Las zonas demasiado pequeñas no pueden flotar. Elige una zona más grande.
- Solo puede haber una ventana flotante abierta a la vez.

Firefox no admite Document Picture-in-Picture, así que esta función no está disponible en la versión para Firefox.
