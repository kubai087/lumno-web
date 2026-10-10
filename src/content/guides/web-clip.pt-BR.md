O recorte da web coloca uma parte de uma página em uma janela flutuante própria, como uma tabela, um bloco de código ou um gráfico. A janela fica acima das outras, mesmo quando você troca de guia ou de app, para que você possa consultá-la enquanto lê ou trabalha.

## Ativar o recorte da web {#enable}

O recorte da web vem desativado por padrão. Para usá-lo, ative "Web Clip" nas configurações do Lumno.

## Recortar parte de uma página {#how}

1. Na página que você quer recortar, pressione `⌘ ⇧ K` (`Ctrl + Shift + K` no Windows) para abrir a barra de comandos, digite `/clip` e pressione Enter.

![Barra de comandos com /clip digitado e o resultado "Start Web Clip"](clip-command "Digite /clip na barra de comandos")

2. Mova o ponteiro pela página. O Lumno marca com uma moldura tracejada a área que pode ser recortada.
3. Se a moldura estiver grande ou pequena demais, role a roda do mouse para trocar a área. Você também pode pressionar `[` ou `↑` para selecionar o elemento externo, ou `]` ou `↓` para selecionar um elemento interno.
4. Clique no conteúdo marcado para abri-lo em uma janela flutuante. Para cancelar, pressione `Esc`.

![Uma dica no topo de uma página de artigo e, abaixo, a tabela de propriedades CSS cercada por uma moldura tracejada](clip-picker "Escolha o conteúdo com a moldura tracejada")

## A janela flutuante {#window}

- A janela mostra uma cópia do conteúdo escolhido. Quando essa parte da página original muda, a janela também é atualizada.
- Clicar em um link na janela abre o link em uma nova guia do navegador. Para abrir em segundo plano, mantenha `⌘` (`Ctrl` no Windows) pressionado ao clicar.
- Leve o ponteiro até a parte inferior da janela para mostrar os botões "Reselect" e "Close".
- Você pode mover e redimensionar a janela como qualquer outra.

## Limitações {#limits}

O recorte da web usa o Document Picture-in-Picture do navegador e, por isso, tem estas limitações:

- Funciona apenas na página principal de um site HTTPS, não dentro de frames incorporados (iframes).
- Não está disponível em sites que desativam o picture-in-picture pela própria política.
- Se um vídeo já estiver em picture-in-picture, feche-o primeiro.
- Áreas pequenas demais não podem flutuar. Escolha uma área maior.
- Só é possível ter uma janela flutuante aberta por vez.

O Firefox não oferece suporte ao Document Picture-in-Picture, então esse recurso não está disponível na versão para Firefox.
