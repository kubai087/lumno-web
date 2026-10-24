Para cambiar entre las dos o tres páginas que has usado más recientemente, el selector de pestañas es la opción más rápida: no hace falta escribir nada y basta con dos pulsaciones.

## Abrir el selector {#open}

Pulsa `⌥ Q`. Tus pestañas recientes aparecen en el orden en que las usaste, cada una con una vista previa de la página.

![El selector de pestañas recientes, con cuatro pestañas en el orden en que se usaron y una vista previa de cada página](switcher "El selector de pestañas recientes")

## Cambiar de pestaña {#switch}

1. Mantén pulsada `⌥` y pulsa `Q` varias veces hasta llegar a la página que quieres. También puedes usar `Tab` o las teclas de flecha.
2. Suelta `⌥` o pulsa `↩` para cambiar a esa página.

También puedes cerrar desde el selector las pestañas que ya no necesites: coloca el puntero sobre la vista previa de una página y haz clic en el botón de cerrar que aparece en su esquina.

Funciona de forma parecida a `⌘ Tab | Alt + Tab` en tu ordenador o a `⌃ Tab` en [Arc](https://arc.net/).

## Selector o búsqueda en pestañas abiertas {#vs-search}

- Si la página está entre las últimas que has usado, utiliza el selector: bastan dos pulsaciones.
- Si tienes muchas pestañas y la página no está entre las más recientes, pulsa `⌘ ⇧ K` y, con el cuadro vacío, pulsa `Tab` para buscar solo en las pestañas abiertas. Para obtener más información, consulta [Buscar en pestañas, marcadores e historial](../search-tabs-bookmarks-history/#open-tabs).

## Abrir el selector con Ctrl+Tab {#ctrl-tab}

Si estás acostumbrado a cambiar de pestaña con `⌃ Tab` en [Arc](https://arc.net/), puedes usarlo también como atajo del selector. La página de atajos del navegador no acepta esta combinación, así que configúrala desde la consola de esa página:

1. Escribe `chrome://extensions/shortcuts` en la barra de direcciones y ábrela.
2. Pulsa `⌘ ⌥ J | Ctrl + Mayús + J` para abrir la consola.
3. Pega el código siguiente y pulsa `↩` para ejecutarlo.

   ```js
   const extensions = await chrome.developerPrivate.getExtensionsInfo();
   const lumno = extensions.find((item) =>
     item.commands.some((command) => command.name === "show-tab-switcher"));
   await chrome.developerPrivate.updateExtensionCommand({
     extensionId: lumno.id,
     commandName: "show-tab-switcher",
     keybinding: "Ctrl+Tab",
   });
   ```

4. Recarga la página. "Open recent tab switcher" mostrará `⌃ Tab`.

![La página de atajos de extensiones del navegador, con "Open recent tab switcher" de Lumno en ⌃⇥](shortcuts-ctrl-tab "La página de atajos después del cambio")

Después, mantén pulsada `⌃` y pulsa `Tab` varias veces para elegir una pestaña; suelta `⌃` para cambiar a ella.

- La primera vez que pegas algo en la consola, el navegador te pide que escribas antes un breve texto de confirmación. Escríbelo tal como se indica y vuelve a pegar el código.
- El código solo cambia este atajo de Lumno. Después, el `⌃ Tab` propio del navegador (pestaña siguiente a la derecha) deja de funcionar.
- Para deshacerlo, haz clic en el icono del lápiz junto al elemento en la misma página y configura un atajo nuevo.
- Este método usa una interfaz integrada en la página de atajos del navegador, por lo que podría dejar de funcionar tras una actualización del navegador.

## Cambiar el atajo {#shortcut}

Puedes cambiar el atajo del selector en `chrome://extensions/shortcuts`. Para obtener más información, consulta [Atajos de teclado](../keyboard-shortcuts/#change).

Las vistas previas de las páginas se capturan en tu ordenador al cambiar de pestaña. Cada una se guarda como máximo dos horas y nunca sale de tu dispositivo.
