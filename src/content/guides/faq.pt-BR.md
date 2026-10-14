Aqui você encontra as respostas às perguntas mais frequentes que recebemos no nosso site e na comunidade. Cada resposta tem um link para uma página com mais informações.

## Uso {#using}

### Qual é o atalho padrão? É possível alterá-lo?

O atalho padrão é `⌘ ⇧ K | ⌘ ⇧ K` no Mac e `Ctrl + Shift + K` no Windows e no Linux. Você pode alterá-lo em `chrome://extensions/shortcuts`. Para saber mais, consulte [Atalhos de teclado](../keyboard-shortcuts/#change). A versão para Firefox usa outro atalho padrão; consulte [Compatibilidade com navegadores](../browser-compatibility/#firefox).

### O que fazer se o atalho não funcionar?

Primeiro, verifique se você não está em uma página restrita, como as configurações `chrome://` ou uma loja de extensões. Depois, verifique em `chrome://extensions/shortcuts` se nenhuma outra extensão usa o mesmo atalho. No Dia, também é preciso alterar para "Global" o escopo exibido ao lado do atalho.

### Por que a barra de comandos não abre em algumas páginas?

Os navegadores não permitem que extensões sejam executadas em páginas restritas, como as configurações `chrome://` ou as lojas de extensões. Se você pressionar o atalho em uma dessas páginas, o Lumno aplica a opção "Restricted page behavior" das configurações e, por padrão, abre a pesquisa em uma nova guia. Para usar o Lumno em arquivos PDF ou HTML locais, permita o acesso a URLs de arquivo na página de detalhes da extensão. Para saber mais, consulte [O que o Lumno não faz](../limitations/#restricted-pages).

### Por que o modo claro ou escuro da barra de comandos não corresponde ao do meu sistema?

No modo "Follow system", a barra de comandos também considera as cores da página atual. Se quiser que ela siga apenas o sistema, desative "Adapt theme colors to each webpage" na seção Appearance das configurações do Lumno.

### Se eu vier do Arc, posso usar uma barra de comandos familiar?

Sim. O funcionamento do Lumno se inspira no [Arc](https://arc.net/) (sem vínculo com o Arc), e você pode abrir a barra de comandos a qualquer momento no Dia, no Chrome ou no Edge. Atribua `⌘ T` ao atalho para manter seus hábitos do Arc. Para saber mais, consulte [Vindo do Arc](../arc-command-bar/).

## Nova guia {#new-tab}

### Posso usar apenas a barra de comandos e manter outra extensão de nova guia?

Sim. Mantenha o Lumno ativado e reinstale a outra extensão de nova guia, ou desative-a e ative-a novamente, para que ela volte a controlar a nova guia. A barra de comandos não é afetada. Para ver as etapas, consulte [Usar outra extensão de nova guia](../newtab-other-extensions/).

### Por que a barra de endereço mostra uma URL da extensão na nova guia?

Isso acontece por causa da opção "Automatically focus input": para colocar o cursor diretamente na caixa de pesquisa do Lumno, a barra de endereço mostra a URL da extensão. Se você desativar essa opção nas configurações de Appearance da nova guia, a barra de endereço ficará vazia.

## Compatibilidade {#compatibility}

### Quais navegadores são compatíveis?

O Lumno é compatível com navegadores Chromium, como Chrome, Edge, Dia, Brave e Vivaldi, além do Firefox 140 ou mais recente e de navegadores baseados no Firefox, como o Zen. O Safari ainda não é compatível. No Dia, a barra de comandos funciona, mas a nova guia do Lumno ainda não está disponível. No Firefox, o recorte da web e o picture-in-picture automático não estão disponíveis. Para saber mais, consulte [Compatibilidade com navegadores](../browser-compatibility/).

## Dados e sincronização {#data}

### Posso sincronizar minhas configurações entre dispositivos?

Sim. Por padrão, as configurações são sincronizadas pela sua conta do navegador. Ative a sincronização WebDAV (com Nextcloud, Nutstore ou seu próprio servidor) para sincronizar também ícones e papéis de parede, inclusive entre navegadores diferentes. Para saber mais, consulte [Sincronização](../sync/).

### O Lumno envia meus dados de navegação?

Não. As guias, os favoritos e o histórico são pesquisados no seu dispositivo. O que você digita só é enviado quando você pesquisa na web ou faz uma pergunta à IA, e apenas ao mecanismo de pesquisa ou ao site de IA que você escolheu. Para saber mais, consulte a [Política de Privacidade](/pt-br/privacy/).

### O Lumno é gratuito? É preciso criar uma conta?

O Lumno é totalmente gratuito e de código aberto, sob a licença GPL-3.0, no [GitHub](https://github.com/kubai087/lumno-extension). Não há sistema de contas, então você pode usá-lo assim que instalar, sem cadastro.
