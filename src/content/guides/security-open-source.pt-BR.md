Cada linha do código do Lumno é pública, então qualquer pessoa pode ver o que a extensão faz e o que não faz.

## Código aberto {#open-source}

- Código: [github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- Licença: GPL-3.0
- Encontrou um problema? Abra uma issue no GitHub

Cada versão das lojas é gerada a partir desse mesmo código, e as mudanças ficam listadas nas [novidades](/pt-br/release/) e no GitHub Releases.

## Feito para ser seguro {#design}

- Manifest V3: os navegadores não deixam extensões Manifest V3 baixarem e executarem código remoto, então todo o código do Lumno está no pacote revisado.
- Sem servidores: sem sistema de contas e sem nenhum lugar que guarde seus dados.
- Só as permissões necessárias, e nenhuma opcional.
- Sua senha de app do WebDAV fica no seu dispositivo e nunca passa pela sincronização do navegador.

## Para que serve cada permissão {#permissions}

| Permissão | Usada para |
| --- | --- |
| `tabs`, `tabGroups` | Pesquisar, alternar e restaurar guias; capturar as prévias do alternador |
| `history` | Pesquisar seu histórico no seu dispositivo |
| `bookmarks` | Pesquisar, mostrar e gerenciar favoritos |
| `topSites` | Mostrar seus sites mais visitados na nova guia |
| `storage`, `unlimitedStorage` | Guardar configurações, ícones e papéis de parede |
| `alarms` | Verificar periodicamente o status da sincronização WebDAV |
| `search` | Passar as pesquisas para o seu mecanismo de pesquisa padrão |
| `favicon` | Mostrar ícones de sites |
| `scripting` e acesso a todos os sites | Mostrar a barra de comandos nas páginas, responder a atalhos, ações de texto e picture-in-picture |

O acesso a todos os sites só é usado para mostrar a barra de comandos e recursos parecidos nas páginas. O Lumno não lê nem envia o conteúdo das páginas em massa.
