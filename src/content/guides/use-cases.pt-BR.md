Estes são alguns usos comuns do Lumno, cada um com as etapas para colocá-lo em prática. Escolha os que combinam com a sua forma de trabalhar.

## Quando há dezenas de guias abertas {#many-tabs}

Com muitas guias abertas, os títulos ficam curtos e fica difícil encontrar a guia certa. Nesse caso, pesquise apenas nas guias abertas:

1. Pressione `⌘ ⇧ K` para abrir a barra de comandos.
2. Com a caixa vazia, pressione `Tab` uma vez. "Search open tabs" aparece à esquerda.
3. Digite parte do título da página, por exemplo "layout", selecione a página desejada e pressione Enter para alternar para ela.

![A barra de comandos no modo "Search open tabs": ao digitar layout aparecem quatro guias abertas do MDN com layout no título, cada uma com Switch à direita](uc-tabs "Pesquisar apenas nas guias abertas")

As guias abertas também aparecem na pesquisa normal, marcadas como "Opened". Ao pressionar Enter, você alterna para a guia em vez de abrir a página novamente. Para alternar apenas entre as duas ou três últimas páginas, `⌥ Q` é ainda mais rápido.

Se as guias estiverem deixando o computador lento, você também pode usar a Economia de memória do Chrome ou reunir as guias em uma lista com o [OneTab](https://www.one-tab.com/).

Para saber mais, consulte [Pesquisar guias, favoritos e histórico](../search-tabs-bookmarks-history/) e [Alternar entre guias recentes](../tab-switcher/).

## Quando você vem do Arc {#from-arc}

Desde que o [Arc](https://arc.net/) deixou de receber novos recursos, muitos usuários migraram para o Dia, o Chrome ou o Edge. O Lumno se inspira na barra de comandos do Arc, na alternância entre guias recentes, na restauração de guias fixadas e no picture-in-picture automático. Depois de instalar o Lumno, siga estas etapas para configurar a barra de comandos:

1. Abra `chrome://extensions/shortcuts` na barra de endereço.
2. Localize o Lumno e atribua `⌘ T` a "Open command bar".
3. A partir de agora, abra a barra de comandos com `⌘ T` e alterne entre as guias recentes com `⌥ Q`, como com o `⌃ Tab` no Arc.

![A página de atalhos de extensões do navegador, com "Open command bar" do Lumno em ⇧⌘K e "Open recent tab switcher" em ⌥Q](shortcuts "Alterar os atalhos do Lumno na página de extensões")

Para saber mais, consulte [Vindo do Arc](../arc-command-bar/).

## Quando você consulta documentação e o GitHub com frequência {#developers}

Digite o atalho de um site e pressione `Tab` para pesquisar diretamente nele, sem passar pela página inicial. Por exemplo, digite `gh`, pressione `Tab`, digite `command palette` e pressione Enter para abrir os resultados de pesquisa do GitHub. Outros atalhos comuns são `mdn`, `npm` e `sf` (Stack Overflow).

![A caixa mostra o GitHub à esquerda; ao digitar command palette, aparece a opção de pesquisar command palette no GitHub](sitesearch "Digitar gh e pressionar Tab para pesquisar diretamente no GitHub")

- Digite um endereço como `chrome://extensions` para abri-lo diretamente.
- Adicione a documentação interna ou o sistema de chamados da sua empresa como pesquisa personalizada nas configurações do Lumno, com o atalho que preferir. Para saber mais, consulte [Adicionar uma pesquisa personalizada](../site-search/#custom).

## Quando você pesquisa e escreve {#research}

Às vezes você se lembra de ter lido um artigo, mas não sabe se o salvou nos favoritos ou apenas o visitou. Digite uma palavra-chave na barra de comandos para pesquisar ao mesmo tempo nos favoritos e no histórico. O rótulo de cada resultado indica a origem e, no caso dos favoritos, também a pasta.

![Ao digitar css grid, aparecem uma página do histórico e uma página do MDN na pasta de favoritos CSS reading](uc-research "Pesquisar ao mesmo tempo nos favoritos e no histórico")

Se um trecho for difícil de entender, use as ações rápidas na seleção (Selection quick actions): selecione o texto, e um botão do Lumno aparecerá ao lado dele. Clique no botão e escolha uma ação como "Answer", "Explain" ou "Research"; o Lumno abrirá a resposta da IA em uma nova guia. O Lumno verifica primeiro se o texto provavelmente precisa de ajuda, por isso o botão não aparece toda vez que você seleciona algo. Esse recurso vem desativado por padrão; você pode ativá-lo na seção Labs das configurações do Lumno. Para saber mais, consulte [Ações rápidas na seleção](../selection-actions/).

![Em um artigo, uma frase sobre a unidade fr está selecionada, com as ações Answer, Explain e Research ao lado](uc-selection "Selecionar um texto para pedir à IA uma explicação ou uma pesquisa")

## Quando você costuma perguntar primeiro à IA {#ai}

Digite o atalho de uma IA, por exemplo `gpt` (ChatGPT), `gm` (Gemini) ou `pplx` (Perplexity), e pressione `Tab`. Depois, escreva sua pergunta e pressione Enter. O Lumno abre o app da web dessa IA e envia a pergunta para você, sem que seja preciso abrir o site e colar a pergunta.

![A caixa mostra o ChatGPT à esquerda com uma pergunta sobre alternativas à barra de comandos do Arc, pronta para abrir o ChatGPT](ai "Digitar gpt e pressionar Tab para enviar a pergunta ao ChatGPT")

Para saber mais, consulte [Pesquisa em sites e perguntas à IA](../site-search/#ai).

## Quando você quer uma nova guia tranquila {#quiet-new-tab}

A nova guia do Lumno pode mostrar apenas o que você precisa:

- Papel de parede: escolha uma pintura de que goste ou exiba uma nova foto do Bing todos os dias.
- Relógio: mostre a hora acima da caixa de pesquisa.
- Modo Zen: quando precisar se concentrar, digite `/zen` na caixa de pesquisa da nova guia para manter apenas a caixa de pesquisa e o papel de parede.

![A nova guia completa: o relógio 09:41 e a caixa de pesquisa no alto, depois uma fileira de atalhos, oito favoritos e os sites mais visitados, sobre um pomar impressionista](nt-clock "Um relógio acima da caixa de pesquisa")

Para saber mais, consulte [Mudar o papel de parede](../newtab-wallpaper/) e [Relógio e modo Zen](../newtab-clock-zen/).

## Quando você acompanha uma série ou um romance em capítulos {#series}

Quando você assiste a uma série ou lê um romance publicado em capítulos, o Lumno pode lembrar, na nova guia, em qual episódio ou capítulo você está:

1. Abra o episódio ou capítulo em que você está. Ele passará a aparecer entre os cartões de sites na parte inferior da nova guia. Se não aparecer, passe o ponteiro sobre "Most Visited", no canto superior esquerdo dos cartões, e mude para "Recent".
2. Passe o cursor sobre o cartão e clique no ícone de alfinete. Quando o Lumno reconhece uma página de episódio ou capítulo, ele começa a acompanhar seu progresso automaticamente, e o cartão mostra um ícone de radar. Se o acompanhamento não começar, clique com o botão direito no cartão e escolha "Track progress".
3. Quando você passar para o próximo episódio ou capítulo do mesmo título, o cartão será atualizado automaticamente. Na próxima vez, clique no cartão para continuar de onde parou.

![Cartões de sites na parte inferior da nova guia: cartões fixados do Crunchyroll e do Wandering Inn com ícone de radar, seguidos de GitHub e Material](uc-series "Os cartões com ícone de radar acompanham o seu progresso")

Para saber mais, consulte [Sites frequentes e cartões de progresso](../newtab-frequent-sites/).
