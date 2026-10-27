O [Arc](https://arc.net/) será encerrado em 22 de dezembro de 2026. Depois disso, o Arc para Mac e Windows não vai mais abrir. Antes de sair do Arc, leve seus dados e depois escolha um novo navegador. O Lumno se inspira em vários recursos do Arc, como a barra de comandos, a alternância entre guias recentes, a restauração de guias fixadas após reiniciar e o picture-in-picture automático para vídeos. Instale-o no Chrome, no Dia ou no Edge para continuar usando esses recursos.

O Lumno é um projeto independente de código aberto, sem vínculo com o Arc nem com a The Browser Company.

## Cronograma do encerramento do Arc {#timeline}

- **22 de outubro**: o Arc anunciou o encerramento. Não é mais possível criar contas do Arc.
- **23 de novembro**: o Arc Search para iOS e Android perde os recursos de IA e deixa de permitir login e sincronização, mas continua funcionando como navegador básico.
- **15 de dezembro**: último dia para pedir uma cópia dos dados pessoais da sua conta do Arc ou solicitar a exclusão deles.
- **22 de dezembro**: o Arc para Mac e Windows para de funcionar. Todas as contas são desativadas, e os dados pessoais associados são excluídos em até 30 dias.

Depois do encerramento, você também não conseguirá abrir o Arc para acessar os dados salvos no seu computador. Veja todos os detalhes no artigo do Arc [Arc Sunset: Key Dates and What to Expect](https://resources.arc.net/hc/en-us/articles/44412972248471).

## Exporte seus dados antes de 22 de dezembro {#export}

- **Indo para o Dia**: não é preciso exportar nada. Instale o Dia e escolha importar do Arc. Seus espaços, guias fixadas, pastas, favoritos, histórico, senhas e extensões vão junto, e os espaços viram perfis do Dia. Mantenha o Arc instalado até a importação terminar. Veja [Move from Arc to Dia](https://resources.arc.net/hc/en-us/articles/44413129117591).
- **Indo para outro navegador**: nas configurações do Arc, abra "Advanced" e selecione "Export Data". O Arc salva um arquivo chamado `Arc Data Export.md` que lista, espaço por espaço, os links dos seus favoritos, guias fixadas e pastas. É uma lista de links, não um arquivo de favoritos, então você mesmo abre ou adiciona aos favoritos do novo navegador os que quiser manter. Veja [How Do I Export My Data from Arc?](https://resources.arc.net/hc/en-us/articles/25583851606039).

Easels e Boosts não podem ser exportados e não vão para o Dia.

## Usava o Lumno no Arc? Leve suas configurações {#lumno-settings}

O Lumno guarda as configurações no navegador em que está instalado, então não dá para recuperá-las depois que o Arc parar de funcionar. Antes de trocar, [exporte suas configurações](../sync/#export) no Lumno e importe-as depois de instalar o Lumno no novo navegador. Ou ative a [sincronização WebDAV](../sync/), que também leva seus ícones e papéis de parede.

Mesmo que o Dia leve a extensão junto, exporte uma cópia antes, por garantia.

## Escolha seu próximo navegador {#choose}

| Navegador | O que tem em comum com o Arc | Com o Lumno |
| --- | --- | --- |
| Dia | Feito pela mesma equipe, com barra lateral, guias fixadas e alternador de guias; importa direto do Arc | A barra de comandos funciona; a nova guia ainda não está disponível |
| Chrome, Edge | Sem barra lateral nem espaços, mas com a maior variedade de extensões | Tudo funciona |
| [Zen Browser](https://zen-browser.app/) | Baseado no Firefox, com barra lateral, espaços de trabalho e tela dividida, muito parecido com o Arc | Instale pelos Complementos do Firefox; alguns recursos são limitados |
| [Vivaldi](https://vivaldi.com/) | Barra lateral, espaços de trabalho e tela dividida | Tudo funciona |

Para ver os detalhes de cada navegador, consulte [Compatibilidade com navegadores](../browser-compatibility/).

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
2. Abra `chrome://extensions/shortcuts` e atribua `⌘ T` a "Open command bar", como no Arc e no [Zen](https://zen-browser.app/). Para saber mais, consulte [Atalhos de teclado](../keyboard-shortcuts/#change). No Dia, libere `⌘ T` primeiro (veja abaixo).
3. Pressione `⌘ T` e experimente [pesquisar suas guias, favoritos e histórico](../search-tabs-bookmarks-history/).
4. Para alternar entre suas últimas páginas, pressione `⌥ Q` e abra o [alternador de guias recentes](../tab-switcher/).

Os atalhos do próprio Dia têm prioridade, então no Dia abra primeiro Settings → Shortcuts e altere o `⌘ T` de "New Tab" para outra tecla. Para saber mais, consulte [Compatibilidade com navegadores](../browser-compatibility/#dia). Se o atalho não funcionar no Dia, altere o escopo de "In Dia" para "Global" na página de extensões.

## Recursos do Arc que o Lumno não pode oferecer {#limits}

A barra lateral, os espaços e a tela dividida dependem do próprio navegador, por isso uma extensão não pode adicioná-los. Se você precisar desses recursos, escolha o Dia, o Zen ou o Vivaldi na tabela acima. Para saber mais, consulte [O que o Lumno não faz](../limitations/).
