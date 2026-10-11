Todo o código do Lumno é público, então qualquer pessoa pode verificar o que a extensão faz e o que ela não faz.

## Código aberto {#open-source}

- Código: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- Licença: GPL-3.0
- Relatar um problema: abra uma issue no GitHub

Cada versão publicada nas lojas é gerada a partir desse mesmo código. As alterações estão listadas nas [novidades](/pt-br/release/) e no GitHub Releases.

## Segurança desde a concepção {#design}

- Manifest V3: os navegadores não permitem que extensões Manifest V3 baixem e executem código remoto, por isso todo o código do Lumno está no pacote revisado.
- Sem servidores: não há sistema de contas nem nenhum lugar onde seus dados sejam armazenados.
- Sua senha de app do WebDAV fica armazenada apenas no seu dispositivo e nunca é sincronizada pelo navegador.

## Permissões {#permissions}

O Lumno solicita apenas as permissões necessárias e nenhuma permissão opcional. O acesso a todos os sites é usado apenas para exibir a barra de comandos e recursos semelhantes nas páginas. O Lumno não lê nem envia o conteúdo das páginas em massa.

A [Política de Privacidade](/pt-br/privacy/#permissions) explica para que serve cada permissão.
