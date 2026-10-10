Computador novo, ou vários navegadores ao mesmo tempo? Seus atalhos, papéis de parede e configurações podem ir junto. O Lumno não tem servidores próprios, então a sincronização usa duas coisas que você já tem: a sincronização do navegador e o seu próprio servidor WebDAV.

## Sincronização do navegador: nada a fazer {#browser-sync}

Se você está conectado ao navegador com a sincronização ativada, as configurações do Lumno vão junto automaticamente: tema, mecanismos de pesquisa, atalhos, cartões de sites fixados, a lista de bloqueio, e sua escolha de papel de parede e links de imagem.

Ícones enviados e papéis de parede locais são grandes demais para a sincronização do navegador. Para levá-los também, use o WebDAV.

## Sincronização WebDAV: ícones e papéis de parede também {#webdav}

A sincronização WebDAV está em beta e vem desativada. Quando ativada, suas configurações completas, os ícones de atalhos enviados e os papéis de parede personalizados ficam guardados no servidor que você escolher.

1. Abra as configurações do Lumno, vá em "Account & sync" e depois em WebDAV.
2. Clique em "Add WebDAV" e preencha o endereço do servidor, a pasta de sincronização, o usuário e a senha de app.
3. Se quiser, clique em "Test connectivity" e depois em "Save and turn on sync".

Adicione a conexão em cada dispositivo. O usuário e a senha ficam naquele computador e nunca passam pela sincronização do navegador.

## Onde hospedar {#hosts}

O Lumno foi testado com Nextcloud auto-hospedado, servidores WebDAV com Apache, nginx, rclone e WsgiDAV, e com o Nutstore. Serviços hospedados e NAS como o Synology devem funcionar se forem compatíveis com WebDAV padrão, mas ainda não foram verificados.

Se o seu serviço permitir, use uma senha de app criada para o Lumno em vez da senha principal da sua conta.

## No seu segundo computador {#second-device}

Adicione o mesmo servidor, pasta e conta. Se o servidor já tiver dados, o Lumno pergunta qual versão usar; normalmente escolha "Use server version". Antes de substituir qualquer coisa, o Lumno faz um backup completo das configurações daquele computador.

Daí em diante, as mudanças dos dois lados se juntam automaticamente. Se dois computadores mudarem a mesma coisa, como os atalhos, o cartão mostra um conflito. Clique em "Show differences" para ver o que cada lado mudou e escolha um.

## O que não é sincronizado {#not-synced}

- Histórico, favoritos e guias abertas: o seu navegador continua sincronizando normalmente.
- Seu usuário e senha do WebDAV: cada dispositivo guarda os seus.

Desativar o WebDAV ou remover a conexão deixa os arquivos no seu servidor; apague lá se quiser. O WebDAV não tem criptografia de ponta a ponta, então o administrador do servidor consegue ler os arquivos.

## Exportar e importar {#export}

Prefere não sincronizar? Exporte sua configuração para um arquivo nas configurações do Lumno e importe no outro computador. O arquivo tem suas configurações, não suas imagens.
