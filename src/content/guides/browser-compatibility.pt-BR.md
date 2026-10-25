O Lumno foi criado para navegadores Chromium e também tem uma versão para Firefox. A tabela abaixo mostra quais recursos estão disponíveis em cada navegador.

## Navegadores compatíveis {#support}

| Navegador | Barra de comandos | Nova guia | Instalar pela |
| --- | --- | --- | --- |
| Google Chrome | Sim | Sim | Chrome Web Store |
| Microsoft Edge | Sim | Sim | Complementos do Edge |
| Brave, [Arc](https://arc.net/), Vivaldi, Opera | Sim | Sim | Chrome Web Store |
| Dia | Sim | Ainda não | Chrome Web Store |
| Firefox, [Zen](https://zen-browser.app/) e outros | Em parte | Sim | Complementos do Firefox |
| Safari | Não | Não | — |

Navegadores de celulares e tablets ainda não são compatíveis. Se você está vendo este site em um celular conectado à sua conta do Google, já pode tocar em instalar: o Lumno será instalado automaticamente na próxima vez que você abrir o Chrome em um computador conectado à mesma conta, com a sincronização ativada.

## Dia {#dia}

O Dia não permite que extensões substituam a nova guia, por isso a nova guia do Lumno não está disponível nesse navegador. A barra de comandos funciona normalmente.

Para abrir a barra de comandos com `⌘ T`, libere esse atalho no Dia primeiro, porque os atalhos do próprio Dia têm prioridade:

1. No Dia, abra Settings → Shortcuts e altere o atalho de "New Tab" de `⌘ T` para outra tecla.
2. Abra `dia://extensions/shortcuts` e atribua `⌘ T` a "Open command bar" do Lumno.

![Página Shortcuts das configurações do Dia, com "New Tab" fora do ⌘T](dia-newtab "Passo 1: atribua outra tecla a "New Tab" em Settings → Shortcuts do Dia")

![Página de atalhos de extensões do Dia, com "Open command bar" do Lumno em ⌘T](dia-shortcuts "Passo 2: atribua ⌘T a "Open command bar" em dia://extensions/shortcuts")

Se o atalho não funcionar, abra a página de atalhos de extensões e altere o escopo ao lado do Lumno de "In Dia" para "Global".

## Firefox {#firefox}

A versão para Firefox está disponível nos [Complementos do Firefox](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/). Ela funciona no Firefox 140 ou mais recente e também pode ser instalada em navegadores baseados no Firefox, como Zen, LibreWolf e Floorp.

Como as APIs de extensões do Firefox são diferentes das do Chromium, alguns recursos não estão disponíveis:

| Recurso | No Firefox |
| --- | --- |
| Picture-in-picture automático | Indisponível; o Firefox não permite que extensões coloquem vídeos da web em picture-in-picture |
| Recorte da web | Indisponível; o Firefox não oferece picture-in-picture para documentos |
| Barra de comandos em páginas `about:` e no site de complementos | Indisponível |
| Abrir páginas `about:` pelos atalhos ou pela barra de comandos | Indisponível |
| Barra de comandos em páginas locais `file://` | Indisponível |
| Ícones de sites | Sites que você nunca visitou podem mostrar inicialmente um ícone genérico |
| Liquid glass na nova guia | Só o acabamento de vidro, sem curvatura nas bordas |

Como o Firefox já usa `⌘ ⇧ K`, a versão para Firefox usa por padrão `⌃ ⇧ K | Alt + K`. O `⌥ Q` não muda. Para alterar os atalhos, abra `about:addons`, clique no botão de engrenagem no canto superior direito e escolha "Gerenciar atalhos de extensões".

## Safari {#safari}

O sistema de extensões do Safari é muito diferente do Chromium, e ainda não existe uma versão do Lumno para Safari. Para uma pesquisa semelhante em todo o sistema no Mac, experimente o [Raycast](https://www.raycast.com/) ou o [Alfred](https://www.alfredapp.com/).

## Idiomas da interface {#languages}

Desde a versão 1.2.0, a extensão está disponível em 10 idiomas: português (Brasil), inglês, chinês simplificado e tradicional, japonês, coreano, alemão, espanhol, francês e russo. Por padrão, ela usa o idioma do navegador, e você pode alterá-lo nas configurações.
