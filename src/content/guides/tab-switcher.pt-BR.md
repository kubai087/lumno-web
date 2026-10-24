Para alternar entre as duas ou três páginas usadas mais recentemente, o alternador de guias é a opção mais rápida: não é preciso digitar nada, e basta pressionar as teclas duas vezes.

## Abrir o alternador {#open}

Pressione `⌥ Q`. Suas guias recentes aparecem na ordem em que foram usadas, cada uma com uma prévia da página.

![O alternador de guias recentes, com quatro guias na ordem em que foram usadas, cada uma com uma prévia da página](switcher "O alternador de guias recentes")

## Alternar entre guias {#switch}

1. Mantenha `⌥` pressionada e pressione `Q` várias vezes até chegar à página desejada. Você também pode usar `Tab` ou as teclas de seta.
2. Solte `⌥` ou pressione `↩` para alternar para essa página.

Você também pode fechar pelo alternador as guias de que não precisa mais: passe o ponteiro sobre a prévia de uma página e clique no botão de fechar que aparece no canto dela.

O funcionamento é semelhante ao do `⌘ Tab | Alt + Tab` no computador ou do `⌃ Tab` no [Arc](https://arc.net/).

## Alternador ou pesquisa nas guias abertas {#vs-search}

- Se a página estiver entre as últimas que você usou, use o alternador: basta pressionar as teclas duas vezes.
- Se houver muitas guias abertas e a página não estiver entre as mais recentes, pressione `⌘ ⇧ K` e, com a caixa vazia, pressione `Tab` para pesquisar apenas nas guias abertas. Para saber mais, consulte [Pesquisar guias, favoritos e histórico](../search-tabs-bookmarks-history/#open-tabs).

## Abrir o alternador com Ctrl+Tab {#ctrl-tab}

Se você está acostumado a trocar de guia com `⌃ Tab` no [Arc](https://arc.net/), pode usar essa combinação como atalho do alternador. A página de atalhos do navegador não aceita essa combinação, então configure-a pelo console dessa página:

1. Digite `chrome://extensions/shortcuts` na barra de endereço e abra a página.
2. Pressione `⌘ ⌥ J | Ctrl + Shift + J` para abrir o console.
3. Cole o código abaixo e pressione `↩` para executá-lo.

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

4. Recarregue a página. "Open recent tab switcher" passa a mostrar `⌃ Tab`.

![A página de atalhos de extensões do navegador, com "Open recent tab switcher" do Lumno em ⌃⇥](shortcuts-ctrl-tab "A página de atalhos depois da alteração")

Depois, mantenha `⌃` pressionada e pressione `Tab` várias vezes para escolher uma guia; solte `⌃` para ir até ela.

- Na primeira vez que você colar algo no console, o navegador pede que você digite um breve texto de confirmação. Digite-o como indicado e cole o código novamente.
- O código altera apenas este atalho do Lumno. Depois disso, o `⌃ Tab` do próprio navegador (próxima guia à direita) deixa de funcionar.
- Para desfazer, clique no ícone de lápis ao lado do item na mesma página e defina um novo atalho.
- Este método usa uma interface integrada à página de atalhos do navegador e pode deixar de funcionar depois de uma atualização do navegador.

## Alterar o atalho {#shortcut}

Você pode alterar o atalho do alternador em `chrome://extensions/shortcuts`. Para saber mais, consulte [Atalhos de teclado](../keyboard-shortcuts/#change).

As prévias das páginas são capturadas no seu computador quando você alterna entre guias. Cada uma é mantida por no máximo duas horas e nunca sai do seu dispositivo.
