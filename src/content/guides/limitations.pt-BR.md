O Lumno é uma extensão de navegador, e não um navegador próprio, por isso alguns recursos dependem das limitações do navegador. Estas são as limitações conhecidas. Se você precisar de algum desses recursos, uma das ferramentas mencionadas nesta página pode ser mais adequada.

## Páginas em que a barra de comandos não abre {#restricted-pages}

Por segurança, os navegadores não permitem que nenhuma extensão execute scripts nem mostre a própria interface nestas páginas, e o Lumno não consegue contornar essa restrição:

- Páginas do navegador que começam com `chrome://` ou `edge://`, como as configurações e a página de extensões
- A Chrome Web Store e o site de complementos do Edge
- No Firefox, páginas que começam com `about:` e o site Firefox Add-ons

Se você pressionar o atalho em uma dessas páginas, a barra de comandos não consegue aparecer sobre ela. Por isso, o Lumno abre uma nova guia com o cursor na caixa de pesquisa, para que você continue pesquisando ali. Não é um erro: em páginas da web comuns, a barra de comandos continua abrindo diretamente na página.

Para abrir a nova guia do próprio navegador, acesse General → Shortcut Settings → Restricted page behavior nas configurações do Lumno e escolha "Follow browser setting". Se outra extensão fornecer a sua nova guia, o Lumno escolhe essa opção automaticamente.

Só é bloqueado abrir a barra de comandos nessas páginas. Abrir uma página do navegador como `chrome://inspect/#devices` por um atalho ou pela barra de comandos funciona normalmente.

Em arquivos locais (PDF ou HTML cujo endereço começa com `file://`), você pode usar a barra de comandos depois de permitir o acesso a URLs de arquivo na página de detalhes da extensão.

## Conteúdo fora do navegador {#outside-browser}

O Lumno pesquisa apenas o conteúdo do seu navegador. Para pesquisar apps, arquivos e configurações do sistema com um único atalho, experimente o [Raycast](https://www.raycast.com/) ou o [Alfred](https://www.alfredapp.com/) no macOS.

## Compatibilidade com navegadores {#browsers}

- O Safari não é compatível, nem os navegadores de dispositivos móveis.
- No Dia, a barra de comandos funciona, mas a nova guia do Lumno não está disponível.
- Alguns recursos não estão disponíveis na versão para Firefox. Para saber mais, consulte [Compatibilidade com navegadores](../browser-compatibility/).

## Widgets na nova guia {#widgets}

A nova guia do Lumno prioriza a simplicidade e não inclui widgets como previsão do tempo, tarefas ou notas. Se você quiser uma nova guia com muitos widgets, experimente o [Momentum](https://momentumdash.com/) ou o [Tabliss](https://tabliss.io/).

Os navegadores permitem que apenas uma extensão por vez controle a nova guia. Você pode continuar usando a nova guia de outra extensão e, ao mesmo tempo, a barra de comandos do Lumno. Para saber mais, consulte [Usar outra extensão de nova guia](../newtab-other-extensions/).

## Sincronização na nuvem {#data}

O Lumno não tem servidores e, por isso, não oferece conta na nuvem. Suas configurações são sincronizadas pela sincronização integrada do navegador. Para sincronizar também ícones e papéis de parede, você precisa de um servidor WebDAV próprio, como o Nextcloud ou um NAS. Para saber mais, consulte [Sincronização](../sync/).

O histórico, os favoritos e as guias abertas não fazem parte da sincronização do Lumno. O navegador continua a sincronizá-los normalmente.
