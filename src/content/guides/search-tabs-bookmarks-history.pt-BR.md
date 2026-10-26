Com dezenas de guias abertas e centenas de favoritos, encontrar uma página pode levar mais tempo do que abri-la. O Lumno reúne tudo em uma única caixa de pesquisa: pressione um atalho, digite algumas letras e veja juntos suas guias abertas, seus favoritos e seu histórico.

## Abrir a caixa de pesquisa {#open}

Pressione `⌘ ⇧ K` em qualquer página. A caixa de pesquisa aparece no centro da tela. Para fechá-la, pressione `Esc` ou clique fora da caixa.

Em páginas restritas, como as configurações `chrome://` ou as lojas de extensões, os navegadores não permitem que extensões exibam conteúdo. Nessas páginas, o Lumno aplica a opção "Restricted page behavior" das configurações.

## Resultados da pesquisa {#results}

O rótulo ao lado de cada resultado indica sua origem:

- Opened: uma guia aberta no momento. Pressione Enter para alternar para ela em vez de abrir a página novamente.
- Bookmark: uma página da barra de favoritos ou das suas pastas; a pasta também é exibida.
- Frequent e History: os sites que você mais visita e seu histórico de navegação.

As sugestões do seu mecanismo de pesquisa também são exibidas; pressione Enter para pesquisar. Como na barra de endereço, ao passar para uma sugestão com as setas, ela vai para a caixa de pesquisa, e `Esc` traz de volta o que você digitou. Os resultados que você escolhe com mais frequência aparecem mais acima.

Por padrão, o primeiro resultado é a página que o Lumno completa para você. Se você pesquisa mais, mude First Search Result Priority para Search First em Search Result Settings, nas configurações do Lumno: a pesquisa vem primeiro, seguida do favorito, item do histórico ou site frequente cujo título é exatamente o que você digitou.

![O Lumno aberto em uma página em branco: ao digitar chrome aparecem uma guia aberta do GitHub, sugestões de pesquisa, um favorito e sites mais visitados](search "Ao digitar chrome, guias abertas, favoritos e sites frequentes aparecem juntos")

Outras teclas úteis: `⌥ ↩` abre um resultado na guia atual, e `⇧ ↩` abre novamente uma guia que já está aberta. Para ver todas as teclas, consulte [Atalhos de teclado](../keyboard-shortcuts/#command-bar-keys).

## Abrir na guia atual {#current-tab}

Quando você abre a barra de comandos em uma página da web, os resultados abrem em uma nova guia e a página em que você estava continua lá. Para abri-los na guia atual, como faz a barra de endereço, desative Open in a new tab when clicked em General → Command Bar, nas configurações do Lumno. A partir daí:

- Páginas, pesquisas, endereços digitados e pesquisas em sites abrem na guia atual, e a indicação ao lado de cada resultado muda de New Tab para Go.
- Em uma guia fixada, os resultados continuam abrindo em uma nova guia, para não substituir a página fixada.
- Guias já abertas continuam sendo exibidas diretamente.

Seja qual for a configuração, segure `⌥` ao pressionar Enter ou clicar para abrir um resultado do outro jeito, ou segure `⌘` para abri-lo em segundo plano. A caixa de pesquisa da nova guia tem uma configuração própria; veja [Teclas da nova guia](../keyboard-shortcuts/#newtab-keys).

## Digitado no layout de teclado errado {#keyboard-layout}

Se o que você digitou não corresponde a nada nas guias, favoritos ou histórico, o Lumno lê a entrada de novo como se ela tivesse sido digitada em um teclado russo, ucraniano, hebraico, árabe ou coreano (2 conjuntos). Assim, `vjcrdf` encontra Москва. Funciona também ao contrário: `пшерги`, digitado com o layout russo ainda ativo, encontra o GitHub. Esses resultados aparecem abaixo das correspondências diretas.

A pesquisa também ignora diferenças como acentos e caracteres de largura total, e o coreano pode ser pesquisado pelas consoantes iniciais (`ㅅㅇ` encontra 서울). O painel de escopo da pesquisa funciona do mesmo jeito.

Títulos em chinês podem ser encontrados por pinyin, por iniciais ou misturando os dois: `wxds`, `wxdushu` e `weixinds` encontram 微信读书. Para tratar z e zh, c e ch, s e sh, n e l, an e ang, en e eng, e in e ing como iguais, ative Fuzzy pinyin em Search Result Settings, nas configurações do Lumno.

## Pesquisar apenas nas guias abertas {#open-tabs}

Se houver muitas guias abertas, você pode restringir a pesquisa: pressione `Tab` uma vez com a caixa vazia. "Search open tabs" aparece à esquerda, e apenas as guias abertas permanecem na lista. Digite para filtrar, pressione Enter para alternar e `Esc` para sair.

![A caixa de pesquisa mostra "Search open tabs" à esquerda, com apenas as guias abertas na lista](opentabs "Pesquisar apenas nas guias abertas")

Para pesquisar apenas em favoritos, no histórico ou nos sites frequentes, pressione `Tab` duas vezes com a caixa vazia e escolha uma opção no painel de escopo de pesquisa.

## Fechar as outras guias {#close-other-tabs}

Quando as guias se acumularem, clique no ícone de pincel à direita da caixa de pesquisa e, no aviso que aparece, clique em "Close" para fechar as outras guias da janela atual. A guia atual, as guias fixadas e as que estão em um grupo de guias continuam abertas. O botão fica tanto na barra de comandos quanto na caixa de pesquisa da nova guia.

Se mudar de ideia, clique de novo no ícone de pincel, pressione `Esc` ou clique fora do aviso.
