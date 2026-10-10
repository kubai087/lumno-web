Se você usa vários computadores ou navegadores, seus atalhos, papéis de parede e configurações podem ser sincronizados. O Lumno não tem servidores próprios, por isso a sincronização usa dois recursos que você já tem: a sincronização do navegador e o seu próprio servidor WebDAV.

## Sincronização do navegador: nenhuma configuração necessária {#browser-sync}

Se você estiver conectado ao navegador com a sincronização ativada, as configurações do Lumno serão sincronizadas automaticamente. Isso inclui o tema, os mecanismos de pesquisa, os atalhos, os cartões de sites fixados, a lista de bloqueio, a escolha de papel de parede e os links de imagem.

Os ícones enviados e os papéis de parede locais são grandes demais para a sincronização do navegador. Para sincronizá-los também, use o WebDAV.

## Sincronização WebDAV: ícones e papéis de parede incluídos {#webdav}

A sincronização WebDAV está em versão beta e vem desativada por padrão. Quando ativada, suas configurações completas, os ícones de atalhos enviados e os papéis de parede personalizados são armazenados no servidor que você escolher.

1. Abra as configurações do Lumno e acesse Account & sync → WebDAV.
2. Clique em "Add WebDAV" e informe o endereço do servidor, a pasta de sincronização, o nome de usuário e a senha de app.
3. Se quiser, clique em "Test connectivity" e, em seguida, em "Save and turn on sync".

Adicione a conexão separadamente em cada dispositivo. O nome de usuário e a senha ficam armazenados apenas naquele computador e nunca são sincronizados pelo navegador.

## Escolher um servidor {#hosts}

O Lumno foi testado com o Nextcloud auto-hospedado, com servidores WebDAV do Apache, nginx, rclone e WsgiDAV e com o Nutstore (坚果云). Serviços hospedados e dispositivos NAS, como o Synology, devem funcionar se forem compatíveis com o WebDAV padrão, mas ainda não foram testados.

Se o seu serviço oferecer senhas de app, crie uma para o Lumno em vez de usar a senha principal da sua conta.

## Configurar outro computador {#second-device}

Adicione uma conexão com o mesmo servidor, a mesma pasta e a mesma conta. Se o servidor já tiver dados, o Lumno perguntará qual versão usar; na maioria dos casos, escolha "Use server version". Antes de substituir qualquer dado, o Lumno faz um backup completo das configurações desse computador.

A partir daí, as alterações feitas nos dois computadores são combinadas automaticamente. Se os dois computadores alterarem a mesma configuração, como os atalhos, o cartão mostrará um conflito. Clique em "Show differences" para comparar as alterações de cada lado e escolha a versão que deseja manter.

## Itens que não são sincronizados {#not-synced}

- Histórico, favoritos e guias abertas: o navegador continua a sincronizá-los normalmente.
- Nome de usuário e senha do WebDAV: cada dispositivo armazena os seus.

Se você desativar o WebDAV ou remover a conexão, os arquivos permanecerão no seu servidor; você pode excluí-los lá, se quiser. A sincronização WebDAV não tem criptografia de ponta a ponta, por isso o administrador do servidor pode ler os arquivos.

## Exportar e importar {#export}

Se preferir não usar a sincronização, você pode exportar sua configuração para um arquivo nas configurações do Lumno e importá-lo em outro computador. O arquivo contém suas configurações, mas não suas imagens.
