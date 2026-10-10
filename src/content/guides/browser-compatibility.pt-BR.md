O Lumno foi feito para navegadores Chromium, e também tem uma versão para Firefox. Veja o que funciona em cada um.

## Visão geral {#support}

| Navegador | Barra de comandos | Nova guia | Onde baixar |
| --- | --- | --- | --- |
| Google Chrome | Sim | Sim | Chrome Web Store |
| Microsoft Edge | Sim | Sim | Complementos do Edge |
| Brave, Arc, Vivaldi, Opera | Sim | Sim | Chrome Web Store |
| Dia | Sim | Ainda não | Chrome Web Store |
| Firefox, Zen e outros | Em parte | Sim | Veja abaixo |
| Safari | Não | Não | — |

Navegadores de celular e tablet ainda não são compatíveis.

## Dia {#dia}

O Dia não deixa extensões assumirem a nova guia, então a nova guia do Lumno não está disponível lá. A barra de comandos funciona normalmente.

Se o atalho não fizer nada, abra a página de atalhos de extensões e mude o escopo ao lado do Lumno de "In Dia" para "Global".

## Firefox {#firefox}

A versão para Firefox ainda não está no Firefox Add-ons; quando estiver, este site vai trazer o link. Ela é para o Firefox 140 ou mais recente e para navegadores baseados no Firefox, como Zen, LibreWolf e Floorp.

As APIs de extensões do Firefox são diferentes das do Chromium, então algumas coisas não funcionam:

| Recurso | No Firefox |
| --- | --- |
| Picture-in-picture automático | Indisponível; o Firefox não deixa extensões colocarem vídeos da web em picture-in-picture |
| Recorte da web | Indisponível; o Firefox não suporta picture-in-picture de documentos |
| Barra de comandos em páginas `about:` e no site de complementos | Indisponível |
| Abrir páginas `about:` por atalhos ou pela barra | Indisponível |
| Barra de comandos em páginas locais `file://` | Indisponível |
| Ícones de sites | Sites que você nunca visitou podem mostrar um ícone genérico no início |

O Firefox já usa `⌘ ⇧ K`, então a versão para Firefox usa por padrão `⌃ ⇧ K` no macOS e `Alt + K` no Windows e no Linux. O `Alt + Q` continua igual.

## Safari {#safari}

O sistema de extensões do Safari é muito diferente do Chromium, e ainda não existe versão do Lumno para Safari. Para uma pesquisa parecida em todo o sistema no Mac, experimente o [Raycast](https://www.raycast.com/) ou o [Alfred](https://www.alfredapp.com/).

## Idiomas da interface {#languages}

A extensão está em inglês, japonês e chinês simplificado e tradicional; com o navegador em português, ela aparece em inglês. Por padrão segue o idioma do navegador, e você pode mudar nas configurações.
