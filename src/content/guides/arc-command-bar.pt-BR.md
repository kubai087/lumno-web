Desde que o [Arc](https://arc.net/) deixou de receber novos recursos, muitos usuários migraram para o Chrome, o Dia ou o Edge. O Lumno se inspira em vários recursos do Arc, como a barra de comandos, a alternância entre guias recentes, a restauração de guias fixadas após reiniciar e o picture-in-picture automático para vídeos, e permite continuar usando esses recursos nesses navegadores.

O Lumno é um projeto independente de código aberto, sem vínculo com o Arc nem com a The Browser Company.

## Correspondência entre o Arc e o Lumno {#mapping}

| Arc | Lumno |
| --- | --- |
| `⌘ T` abre a barra de comandos | `⌘ ⇧ K` abre a barra de comandos; você pode alterá-lo para `⌘ T` |
| Alternar para uma guia aberta pela barra de comandos | Selecionar um resultado marcado como "Opened" e pressionar Enter |
| `⌃ Tab` alterna entre as guias recentes | `⌥ Q` abre o alternador de guias recentes |
| `⌘ ⇧ C` copia a URL | Atribuir um atalho a "Copy Current Page URL" na página de extensões |
| As guias fixadas são mantidas após reiniciar | Ativar "Restore Pinned Tabs After Restart" nas configurações do Lumno |
| Os vídeos entram em picture-in-picture ao trocar de guia | [Picture-in-picture automático](../auto-pip/), ativado por padrão |
| Nova guia | A nova guia do Lumno (ainda não disponível no Dia) |

## Etapas para migrar {#steps}

1. [Instale o Lumno](../install/): pela Chrome Web Store no Chrome e no Dia, ou pelos complementos do Edge no Edge.
2. Abra `chrome://extensions/shortcuts` e atribua `⌘ T` a "Open command bar", como no Arc e no [Zen](https://zen-browser.app/). Para saber mais, consulte [Atalhos de teclado](../keyboard-shortcuts/#change).
3. Pressione `⌘ T` e experimente [pesquisar suas guias, favoritos e histórico](../search-tabs-bookmarks-history/).
4. Para alternar entre suas últimas páginas, pressione `⌥ Q` e abra o [alternador de guias recentes](../tab-switcher/).

Se o atalho não funcionar no Dia, altere o escopo de "In Dia" para "Global" na página de extensões.

## Recursos do Arc que o Lumno não pode oferecer {#limits}

A barra lateral, os espaços e a tela dividida dependem do próprio navegador, por isso uma extensão não pode adicioná-los. Se você precisar desses recursos, experimente o [Zen Browser](https://zen-browser.app/), um navegador baseado no Firefox muito parecido com o Arc, ou o [Vivaldi](https://vivaldi.com/), que também oferece barra lateral, espaços de trabalho e tela dividida. Para saber mais, consulte [O que o Lumno não faz](../limitations/).
