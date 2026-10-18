A maioria dos recursos do Lumno pode ser usada pelo teclado. Esta página mostra os atalhos padrão, como alterá-los e as teclas que você pode usar na barra de comandos, na nova guia, no alternador de guias e no recorte da web. Quando um clique faz a mesma coisa, ele aparece ao lado da tecla.

## Atalhos padrão {#defaults}

| Ação | Atalho |
| --- | --- |
| Abrir a barra de comandos | `⌘ ⇧ K` |
| Abrir o alternador de guias recentes | `⌥ Q` |
| Abrir a barra de comandos com a URL da página atual | Sem atalho padrão |
| Copiar a URL da página atual | Sem atalho padrão |

As duas últimas ações podem aparecer como "Não definido" após a instalação. Para atribuir atalhos a elas, siga as etapas abaixo. A versão para Firefox abre a barra de comandos com outro atalho padrão; consulte [Compatibilidade com navegadores](../browser-compatibility/#firefox).

## Alterar um atalho {#change}

Os navegadores gerenciam os atalhos das extensões em uma página própria:

1. Digite `chrome://extensions/shortcuts` na barra de endereço (`edge://extensions/shortcuts` no Edge).
2. Localize o Lumno e clique no ícone de lápis ao lado da ação que deseja alterar.
3. Pressione a nova combinação de teclas.

![A página de atalhos de extensões do navegador, com "Open command bar" do Lumno em ⇧⌘K e "Open recent tab switcher" em ⌥Q](shortcuts "Alterar atalhos na página de extensões")

Se você estiver acostumado com o [Arc](https://arc.net/) ou o [Zen](https://zen-browser.app/), pode atribuir `⌘ T` a "Open command bar".

Se o atalho não funcionar no Dia, altere o escopo ao lado dele de "In Dia" para "Global".

## Teclas da barra de comandos {#command-bar-keys}

### Selecionar um resultado

| Tecla | Ação |
| --- | --- |
| `↑` `↓` | Mover a seleção para cima ou para baixo |
| Manter `⌘` pressionada, soltar e pressionar `0`–`9` | Números aparecem ao lado dos resultados; pressione um deles para abrir o resultado correspondente |

Se você ativar "Single-press Command to show number jump" em "Labs", nas configurações do Lumno, basta pressionar `⌘` uma vez para ver os números, e o resultado abre quando você mantém `⌘` pressionada e pressiona o número. Nesse caso, `⌘` deixa de abrir resultados em segundo plano; o clique do meio continua funcionando.

No macOS, você também pode ativar "Mac keyboard navigation" em "Labs" para selecionar o próximo resultado e o anterior com `⌃ N | ⌃ N` e `⌃ P | ⌃ P`.

### Abrir um resultado

| Tecla ou clique | Ação |
| --- | --- |
| `↩` ou clique em um resultado | Abrir o resultado ou alternar para uma guia aberta |
| `⌥ ↩` ou clique com `⌥` pressionada | Abrir na guia atual em vez de em uma nova guia |
| `⇧ ↩` ou clique com `⇧` pressionada | Se o resultado for uma guia aberta, abri-la novamente em uma nova guia |
| `⌘ ↩`, clique com `⌘` pressionada ou clique do meio | Abrir em uma guia em segundo plano; a barra de comandos continua aberta para você abrir o próximo |

Enquanto você mantém `⌥`, `⇧` ou `⌘` pressionada, a dica à direita de cada resultado muda de acordo.

### Digitação e modos de pesquisa

| Tecla | Ação |
| --- | --- |
| `Tab` | Completar uma sugestão; depois de um atalho de site, iniciar a pesquisa no site; com a caixa vazia, pesquisar apenas nas guias abertas |
| `Tab` `Tab` | Com a caixa vazia, abrir o painel de escopo de pesquisa; se um escopo já estiver selecionado, basta pressionar uma vez |
| `⌥ ↑` `⌥ ↓` | Voltar ao que você digitou antes ou depois |
| `⌘ Z` `⌘ ⇧ Z` | Com o painel de escopo de pesquisa aberto, desfazer ou refazer uma mudança na ordem das fontes de pesquisa |
| `⌫` | Com a caixa vazia, sair da pesquisa no site, do escopo de pesquisa ou da pesquisa nas guias abertas |
| `Esc` | Sair da pesquisa no site, do escopo de pesquisa ou da pesquisa nas guias abertas |
| `Esc` ou clique fora da barra de comandos | Fechar a barra de comandos |

## Teclas da nova guia {#newtab-keys}

A caixa de pesquisa da nova guia usa as mesmas teclas da barra de comandos. Além disso:

| Tecla ou clique | Ação |
| --- | --- |
| Começar a digitar | O texto vai direto para a caixa de pesquisa, sem precisar clicar nela antes |
| Clique em um resultado, atalho, favorito ou cartão de site | Abrir na guia atual por padrão, ou em uma nova guia se você ativar em General → New Tab Settings → Open in a new tab |
| Clique com `⌘` pressionada ou clique do meio | Abrir em uma guia em segundo plano |
| `⌥ ←` `⌥ →` | Mover uma posição para a frente ou para trás um atalho selecionado com `Tab` |
| `⌘ Z` | Desfazer sua última alteração em atalhos ou favoritos, como remover, mover, criar uma pasta ou excluir um grupo |
| `⌘ ⇧ Z` | Refazer o que você acabou de desfazer |
| `Esc` | Cancelar enquanto arrasta um atalho ou favorito |

## Teclas do alternador de guias {#switcher-keys}

| Tecla ou clique | Ação |
| --- | --- |
| Manter `⌥` pressionada e pressionar `Q` várias vezes | Percorrer as guias recentes |
| `Tab`, `→` ou `↓` | Selecionar a próxima guia |
| `⇧ Tab`, `←` ou `↑` | Selecionar a guia anterior |
| Soltar `⌥`, pressionar `↩` ou clicar em uma guia | Alternar para a guia selecionada |
| Clique no botão de fechar no canto de uma prévia | Fechar essa guia; o alternador continua aberto |
| `Esc` ou clique fora do alternador | Fechar o alternador e continuar na guia atual |

Se você alterou o atalho do alternador, mantenha pressionada a tecla modificadora do seu próprio atalho.

## Teclas do recorte da web {#web-clip-keys}

Enquanto você escolhe o que recortar:

| Tecla ou ação | Ação |
| --- | --- |
| `[` ou `↑` | Selecionar o elemento externo |
| `]` ou `↓` | Selecionar o elemento interno |
| Girar a roda do mouse | Alternar entre elementos externos e internos |
| `↩` ou clique no conteúdo marcado | Abrir em uma janela flutuante |
| `Esc` | Cancelar a seleção |

Na janela flutuante, clicar em um link abre o link em uma nova guia; mantenha `⌘` pressionada ao clicar para abrir em segundo plano. Para saber mais, consulte [Recorte da web](../web-clip/).
