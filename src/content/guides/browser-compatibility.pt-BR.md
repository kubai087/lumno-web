O Lumno foi criado para navegadores Chromium e também tem uma versão para Firefox. A tabela abaixo mostra quais recursos estão disponíveis em cada navegador.

## Navegadores compatíveis {#support}

| Navegador | Barra de comandos | Nova guia | Instalar pela |
| --- | --- | --- | --- |
| Google Chrome | Sim | Sim | Chrome Web Store |
| Microsoft Edge | Sim | Sim | Complementos do Edge |
| Brave, [Arc](https://arc.net/), Vivaldi, Opera | Sim | Sim | Chrome Web Store |
| Dia | Sim | Ainda não | Chrome Web Store |
| Firefox, [Zen](https://zen-browser.app/) e outros | Em parte | Sim | Veja abaixo |
| Safari | Não | Não | — |

Navegadores de celulares e tablets ainda não são compatíveis.

## Dia {#dia}

O Dia não permite que extensões substituam a nova guia, por isso a nova guia do Lumno não está disponível nesse navegador. A barra de comandos funciona normalmente.

Se o atalho não funcionar, abra a página de atalhos de extensões e altere o escopo ao lado do Lumno de "In Dia" para "Global".

## Firefox {#firefox}

A versão para Firefox ainda não está disponível no site de complementos do Firefox. Quando for publicada, este site trará o link. Ela é compatível com o Firefox 140 ou mais recente e com navegadores baseados no Firefox, como Zen, LibreWolf e Floorp.

Como as APIs de extensões do Firefox são diferentes das do Chromium, alguns recursos não estão disponíveis:

| Recurso | No Firefox |
| --- | --- |
| Picture-in-picture automático | Indisponível; o Firefox não permite que extensões coloquem vídeos da web em picture-in-picture |
| Recorte da web | Indisponível; o Firefox não oferece picture-in-picture para documentos |
| Barra de comandos em páginas `about:` e no site de complementos | Indisponível |
| Abrir páginas `about:` pelos atalhos ou pela barra de comandos | Indisponível |
| Barra de comandos em páginas locais `file://` | Indisponível |
| Ícones de sites | Sites que você nunca visitou podem mostrar inicialmente um ícone genérico |

Como o Firefox já usa `⌘ ⇧ K`, a versão para Firefox usa por padrão `⌃ ⇧ K` no macOS e `Alt + K` no Windows e no Linux. O `Alt + Q` não muda.

## Safari {#safari}

O sistema de extensões do Safari é muito diferente do Chromium, e ainda não existe uma versão do Lumno para Safari. Para uma pesquisa semelhante em todo o sistema no Mac, experimente o [Raycast](https://www.raycast.com/) ou o [Alfred](https://www.alfredapp.com/).

## Idiomas da interface {#languages}

A extensão está disponível em inglês, japonês e chinês simplificado e tradicional; se o navegador estiver em português, ela será exibida em inglês. Por padrão, ela usa o idioma do navegador, e você pode alterá-lo nas configurações.
