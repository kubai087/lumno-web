## 1. Escopo e controlador

Esta Política de Privacidade (a “Política”) explica como a extensão de navegador Lumno (a “extensão”) e as páginas públicas do site do Lumno (`lumno.kubai.design`, o “site”) tratam informações sobre você. Ela foi escrita com base na implementação real da versão **0.9.58** da extensão e se aplica a essa versão e às posteriores até que esta Política seja atualizada.

- **Desenvolvedor e controlador:** o Lumno é desenvolvido e mantido por um desenvolvedor independente, Kubai087 (枯白啃设计), controlador do tratamento descrito nesta Política.
- **Contato:** [i@kubai.design](mailto:i@kubai.design). Veja também a Seção 15.
- **Data de vigência:** 10 de outubro de 2026.
- **Idioma de referência:** a versão em chinês simplificado desta Política é a que vale. As demais versões são traduções para facilitar a leitura; em caso de divergência, prevalece a versão em chinês simplificado.

O Lumno não oferece contas nem armazenamento em nuvem e não opera servidores que armazenem dados de usuários. Login com conta, sincronização em nuvem e análise de uso do produto foram removidos da extensão na versão 0.9.40.

Nesta Política, “dados pessoais” significa qualquer informação registrada eletronicamente relacionada a uma pessoa natural identificada ou identificável. Nada nesta Política limita os direitos que você tem pela legislação aplicável.

## 2. Como tratamos as informações

Os principais recursos do Lumno rodam no seu navegador. Para oferecer os recursos que você vê e usa na interface, a extensão lê ou armazena as informações a seguir no seu dispositivo. **Exceto nos casos descritos na Seção 4, essas informações nunca saem do seu dispositivo e nunca são enviadas ao Lumno ou ao desenvolvedor.**

### 2.1 Dados do navegador

- **Abas:** URLs, títulos, grupos e ícones, para pesquisar, alternar, ordenar, restaurar e gerenciar abas. Quando você usa o alternador de abas, a extensão captura a aba atual como miniatura; guarda no máximo 12, cada uma por até 2 horas, apenas no seu dispositivo.
- **Histórico:** URLs, títulos e horários de visita, para pesquisar e ordenar o histórico localmente e excluir itens quando você pedir.
- **Favoritos:** estrutura de pastas, nomes e URLs, para pesquisar, exibir e gerenciar favoritos a seu pedido.
- **Sites mais visitados:** URLs e títulos, para exibir na nova aba. Cartões de sites que você fixa ou oculta são salvos como configurações.

### 2.2 Conteúdo das páginas

- **Atalhos e barra de comandos:** detecta os atalhos de teclado do Lumno nas páginas e exibe a barra de comandos.
- **Ações sobre a seleção:** desativadas por padrão. Quando ativadas, a extensão lê o texto que você seleciona (até 2.400 caracteres) e só o usa quando você escolhe uma ação.
- **Picture-in-picture automático:** localiza o elemento de vídeo em sites de vídeo compatíveis para abrir o picture-in-picture.
- **Acompanhamento de progresso (Labs):** funciona só nos cartões de sites que você marca para acompanhar. Lê os links de anterior/próximo, os dados estruturados e as informações de mídia da página para atualizar a URL e o título desse cartão.

### 2.3 Pesquisa e configurações

- **Histórico de pesquisa:** o que você digita e as URLs e títulos dos resultados que escolhe, para melhorar a ordenação no seu dispositivo.
- **Configurações e mídia:** tema, idioma, layout, atalhos, provedores de pesquisa, listas de bloqueio, chaves de recursos, além dos ícones de atalho que você envia, papéis de parede personalizados, coleções de citações importadas e os caches de que esses recursos precisam.

### 2.4 O que não coletamos

O Lumno não exige cadastro nem login. Não coleta seu nome, e-mail, telefone ou endereço; não informa contagens de uso, cliques, identificadores do dispositivo ou dados de falhas; e nunca envia seu histórico, favoritos, lista de abas ou conteúdo das páginas ao desenvolvedor.

## 3. Por que a extensão precisa de cada permissão

A extensão solicita apenas as permissões de que esses recursos precisam, e nenhuma permissão opcional:

| Permissão | Finalidade |
| --- | --- |
| `tabs`, `tabGroups` | Consultar, alternar, criar, atualizar, agrupar e restaurar abas, e capturar as miniaturas do alternador de abas. |
| `history` | Pesquisar e ordenar o histórico localmente, e excluir itens a seu pedido. |
| `bookmarks` | Pesquisar, exibir e gerenciar favoritos. |
| `topSites` | Exibir seus sites mais visitados na nova aba. |
| `storage`, `unlimitedStorage` | Armazenar configurações, caches, imagens personalizadas e a configuração local de que a sincronização WebDAV precisa, além da cota padrão do navegador. |
| `alarms` | Verificar periodicamente, em segundo plano, o status da sincronização WebDAV. |
| `search` | Enviar as pesquisas que você faz ao mecanismo de pesquisa padrão do navegador. |
| `favicon` (somente Chromium) | Exibir ícones de sites pelo navegador. |
| `sessions` (somente Firefox) | Quando a nova aba se reabre para levar o foco à caixa de pesquisa, remover a aba substituída das abas fechadas recentemente. |
| `scripting` e acesso a sites `<all_urls>` | Oferecer a barra de comandos, os atalhos, as ações sobre a seleção, o picture-in-picture e o acompanhamento de progresso nas páginas; preencher sua pesquisa no serviço de IA ou de busca que você escolher; buscar ícones de sites e imagens de papel de parede; e acessar o endereço WebDAV que você configurar. |

O acesso amplo a sites é usado apenas para os recursos acima. Isso não significa que o Lumno lê, coleta ou envia o conteúdo das páginas em massa.

## 4. Dados que saem do seu dispositivo

As solicitações abaixo são enviadas pela extensão diretamente ao serviço de terceiros envolvido e **nunca passam por um servidor do Lumno**. O destinatário também vê o endereço IP e as informações do navegador que qualquer solicitação de rede carrega, e os trata conforme a própria política de privacidade.

### 4.1 Sugestões de pesquisa online

Enquanto você digita na caixa de pesquisa do Lumno (na nova aba ou na barra de comandos), o que você digita é enviado em tempo real ao serviço de sugestões do seu mecanismo de pesquisa atual para mostrar sugestões. Os serviços compatíveis são Google, Bing, Baidu, Sogou (fornecido pela Tencent em `sor.html5.qq.com`), DuckDuckGo, Yandex, Quark e Shenma (`sugs.m.sm.cn`) e Yahoo. Você muda quem recebe essas solicitações trocando o mecanismo de pesquisa nas configurações. A partir da versão 1.0.1, o que parecer uma URL, um domínio, um endereço IP ou um caminho de arquivo (inclusive o endereço da página atual que o atalho de preenchimento insere) é comparado apenas no seu dispositivo e nunca é enviado a um serviço de sugestões; além disso, as solicitações de sugestões não levam cookies nem referenciador.

### 4.2 Pesquisa na web, pesquisa em sites e IA

- **Pesquisa na web e em sites:** as pesquisas que você envia vão para o mecanismo de pesquisa padrão do navegador ou abrem, numa nova aba, o serviço de busca ou site que você escolher.
- **Pesquisa com IA e ações sobre a seleção:** só depois que você escolhe uma ação, a extensão abre o serviço de IA escolhido (como ChatGPT, Gemini, DeepSeek, Doubao ou Kimi) e preenche sua pesquisa ou o texto selecionado, junto com o prompt que o Lumno escreve para essa ação.

É o mesmo que visitar esses sites por conta própria: o site recebe o que você envia e pode associá-lo à sessão em que você está conectado nele.

### 4.3 Ícones de sites

Para buscar o ícone de um site, o serviço de favicons do Google (`www.google.com` / `gstatic`) recebe apenas o endereço do site (esquema e domínio), sem o caminho nem os parâmetros da página (versões anteriores à 1.0.1 enviavam a URL completa da página); se você escolher o Favicon.is, apenas o domínio é enviado. Essas solicitações não levam cookies nem referenciador, e os ícones ficam em cache no seu dispositivo. Endereços de ícones personalizados que você define para atalhos são carregados pelo navegador diretamente desse endereço.

### 4.4 Papéis de parede online e citações do dia

- **Citações do dia:** desativadas por padrão. Quando ativadas, a extensão busca citações da categoria escolhida no Hitokoto (`v1.hitokoto.cn`) e as mantém em cache durante o dia. Se você escolher uma coleção personalizada, a extensão não faz nenhuma solicitação ao Hitokoto; o arquivo TXT ou Markdown que você importar fica no seu dispositivo.
- **Papéis de parede do Bing:** buscados em `www.bing.com`; a solicitação inclui apenas o mercado e o identificador da imagem.
- **Papéis de parede selecionados e artísticos:** as fotos vêm do Lorem Picsum (`picsum.photos`, com origem no Unsplash) e as obras, da coleção Open Access do Cleveland Museum of Art (`openaccess-cdn.clevelandart.org`); as solicitações incluem apenas o ID e o tamanho da imagem.
- **Papéis de parede por link de imagem:** os links que você cola são sincronizados com suas configurações; cada dispositivo solicita a imagem uma vez a esse endereço e depois a comprime e a guarda em cache localmente.

Os downloads de papéis de parede e citações não levam cookies nem referenciador. As miniaturas de prévia do seletor de papéis de parede carregam como imagens comuns da web.

### 4.5 Notas de versão e recursos do site

- **Avisos de atualização:** após uma atualização, a extensão pede ao GitHub (`api.github.com`, ou `github.com` como alternativa) o título dessa versão para mostrar um aviso. Você pode desativar “Update Prompts” nas configurações.
- **Página de novidades:** após uma atualização, a extensão pode abrir as notas de versão do site. A URL inclui a origem do acesso, o motivo da atualização e a versão da extensão, e a Seção 6 se aplica a essa página.
- **Links de feedback:** quando você abre um link de feedback ou da comunidade, a extensão busca no site a configuração de links da comunidade (`community-links.json`) e a imagem do QR code da comunidade.
- **Busca na central de ajuda:** quando você digita na busca de site “Lumno Help Center”, a extensão baixa do site o índice de busca da central de ajuda no idioma da sua interface (`search-index.json`), encontra os resultados no seu dispositivo e o mantém em cache por até 10 minutos. O que você digita não é enviado ao site.

O site é hospedado no GitHub Pages, e o GitHub, como hospedeiro, pode registrar as solicitações, inclusive endereços IP.

## 5. Sincronização de configurações

O Lumno não oferece sincronização em nuvem. Suas configurações só passam de um dispositivo para outro pelos meios que você escolher:

- **Sincronização integrada do navegador:** tema, provedores de pesquisa, atalhos (títulos e URLs), cartões de sites fixados ou ocultos (URLs e títulos), regras da lista de bloqueio, escolhas de papel de parede e links de imagem, preferências de citações do dia, além do endereço, pasta e nome de usuário do seu servidor WebDAV, ficam em `chrome.storage.sync` e são sincronizados entre dispositivos pelo fabricante do navegador, conforme sua conta e suas configurações de sincronização. Ícones enviados, papéis de parede personalizados, coleções de citações importadas e senhas de app do WebDAV nunca fazem parte da sincronização do navegador.
- **Sincronização WebDAV (opcional):** desativada por padrão e só ativada quando você mesmo adiciona um servidor. Depois de ativada, sua configuração completa, os ícones de atalho enviados, os papéis de parede personalizados, as coleções de citações importadas e os snapshots de configuração feitos antes de sobrescrever são armazenados via HTTPS no servidor e na pasta que você indicar. Histórico, favoritos, abas abertas e caches de ícones nunca são enviados. O WebDAV não oferece criptografia de ponta a ponta, então os administradores desse servidor podem ler esses arquivos.
- **Exportar e importar:** você pode exportar suas configurações como um arquivo JSON para guardar ou importar em outro dispositivo. As exportações não incluem imagens.

## 6. Análise do site e cookies

As páginas públicas do site carregam o script de análise da VibeLoft e podem ativar o Google Analytics (com anonimização de IP) na publicação. Esses serviços podem tratar URLs de páginas (incluindo parâmetros de consulta) e títulos, horários de visita, páginas de origem, eventos de clique, idioma do navegador, tipo de dispositivo e de navegador, localização aproximada, endereços IP e cookies ou identificadores pseudônimos semelhantes.

Usamos esses dados apenas para entender o tráfego, as origens e o desempenho do site, e nunca os vinculamos a dados da extensão. A extensão em si não carrega esses scripts. Você pode bloquear a análise do site com os recursos de cookies, bloqueio de scripts ou proteção contra rastreamento do navegador, sem afetar nenhum recurso da extensão.

## 7. Compartilhamento, transferência e divulgação

O Lumno não vende, aluga nem troca seus dados pessoais, não os usa para publicidade personalizada ou comportamental entre contextos e não os fornece a corretores de dados ou plataformas de anúncios. Além de concluir as ações que você inicia, não compartilhamos, transferimos nem divulgamos publicamente seus dados pessoais.

Terceiros que podem receber dados:

| Destinatário | Dados que pode receber | Finalidade |
| --- | --- | --- |
| Fabricantes de navegadores (como Google, Microsoft e Mozilla) | Configurações em `chrome.storage.sync` e metadados da conta do navegador | Sincronização integrada das configurações da extensão. |
| Seu serviço WebDAV (como Jianguoyun, um NAS ou um servidor próprio) | Configuração completa, ícones, papéis de parede, snapshots e o nome de usuário e senha de app usados no login | Sincronizar configurações e imagens conforme você configurar. |
| Serviços de sugestões de pesquisa (Seção 4.1) | O que você digita e os metadados da solicitação | Mostrar sugestões de pesquisa. |
| Serviços de pesquisa, IA e sites que você escolher | Pesquisas, texto selecionado e prompts que você envia | Concluir as pesquisas e ações de IA que você inicia. |
| Serviço de favicons do Google, Favicon.is | Endereço do site ou domínio | Exibir ícones de sites. |
| Hitokoto, Bing, Lorem Picsum, Cleveland Museum of Art | Categoria, mercado, ID e tamanho da imagem | Citações do dia e papéis de parede online que você ativa. |
| GitHub | Versão da extensão e registros de acesso das solicitações ao site e às versões | Avisos de atualização e hospedagem do site. |
| [VibeLoft](https://vibeloft.ai/privacy), Google Analytics (se ativado) | Informações de visita e técnicas do site | Análise de tráfego, origens e desempenho do site. |

Se o Lumno for incorporado, transferido ou passado a um novo mantenedor, exigiremos que o destinatário continue vinculado a esta Política ou pediremos seu consentimento novamente antes que a forma de tratar suas informações mude. Podemos divulgar informações quando exigido por lei ou por solicitação legítima de autoridade competente; como não temos dados pessoais seus, isso normalmente envolveria apenas dados de análise do site.

## 8. Armazenamento e retenção

A extensão armazena dados no `chrome.storage.local`, no `chrome.storage.sync` e no armazenamento de sessão do navegador, além de um IndexedDB restrito à extensão: os ícones de atalho enviados ficam no `chrome.storage.local`; papéis de parede personalizados, configuração WebDAV, senhas de app e backups de recuperação ficam no IndexedDB.

| Dados | Retenção |
| --- | --- |
| Configurações locais, imagens, caches e dados de ordenação de pesquisa | Até você excluí-los na extensão, limpar os dados da extensão no navegador ou desinstalar o Lumno. |
| Miniaturas do alternador de abas | Até 2 horas cada. |
| Configurações na sincronização do navegador | Mantidas e excluídas pelo fabricante do navegador conforme sua conta e suas configurações de sincronização. |
| Arquivos no seu servidor WebDAV | Ficam no seu servidor até você excluí-los. Pausar a sincronização, remover uma conexão ou desinstalar o Lumno não os exclui. |
| Arquivos de configurações exportados | Mantidos e excluídos por você. |
| Dados de terceiros e de análise do site | Mantidos por cada serviço conforme a própria política. |

O Lumno não mantém dados pessoais seus em nenhum sistema que controla.

## 9. Seus direitos e escolhas

Você pode:

- Usar todos os recursos do Lumno sem cadastro ou login.
- Trocar mecanismos de pesquisa, serviços de IA e fontes de ícones nas configurações, ou desativar as ações sobre a seleção, as citações do dia, os papéis de parede online, os avisos de atualização e recursos semelhantes.
- Escolher se ativa a sincronização WebDAV e pausar ou remover uma conexão a qualquer momento.
- Desativar a sincronização de extensões no navegador para manter as configurações em um só dispositivo.
- Excluir dados na extensão, limpar os dados da extensão no navegador ou desinstalar a extensão para remover todos os dados locais.

Como o Lumno não tem dados pessoais seus, normalmente não há dados do lado do Lumno para acessar, copiar ou excluir. Para exercer direitos que a legislação aplicável lhe garante, como acesso, portabilidade, correção, eliminação, revogação do consentimento, restrição ou oposição, ou se tiver dúvidas sobre a análise do site, fale conosco como descrito na Seção 15. Responderemos em até 15 dias úteis após verificar sua solicitação, ou no prazo exigido pela legislação aplicável. Você também pode apresentar uma reclamação à autoridade de proteção de dados da sua região. O exercício desses direitos nunca levará a tratamento discriminatório.

O Lumno não cria perfis sobre você nem toma decisões automatizadas que produzam efeitos jurídicos ou que afetem você de forma igualmente significativa.

## 10. Segurança

Protegemos seus dados com as seguintes medidas:

- Os dados de navegação são tratados apenas no seu navegador e nunca enviados ao desenvolvedor.
- O WebDAV aceita apenas endereços HTTPS, mantém a validação de certificados e recusa redirecionamentos de autenticação.
- As senhas de app do WebDAV ficam no armazenamento próprio da extensão no dispositivo atual. Nunca entram na sincronização do navegador e nunca são expostas a páginas da web ou scripts de conteúdo.
- Os downloads de ícones de sites e papéis de parede não levam cookies nem referenciador.

Recomendamos gerar uma senha de app do WebDAV exclusiva para o Lumno e manter seguros seu dispositivo, sua conta do navegador e sua conta WebDAV. Nenhum método de transmissão ou armazenamento é totalmente seguro. Se encontrar um problema de segurança, avise-nos em [i@kubai.design](mailto:i@kubai.design).

## 11. Crianças

O Lumno é destinado ao público em geral, não foi feito para crianças e não coleta intencionalmente dados pessoais de crianças. Menores de 14 anos devem usar o Lumno somente com o consentimento e a orientação dos pais ou responsáveis. Se você acredita que tratamos informações de uma criança por engano, fale conosco para que possamos verificar.

## 12. Tratamento internacional

O Lumno não opera servidores que armazenem dados de usuários, então seus dados nunca são transferidos para sistemas controlados pelo Lumno. Fabricantes de navegadores, os serviços de pesquisa, IA, WebDAV e imagens que você escolher, além do GitHub, da VibeLoft e do Google Analytics, podem tratar dados fora do seu país ou região conforme suas próprias políticas de privacidade e mecanismos de transferência.

## 13. Políticas de dados do usuário das lojas

O uso que o Lumno faz das informações recebidas das APIs do navegador segue a [Política de dados do usuário da Chrome Web Store](https://developer.chrome.com/docs/webstore/program-policies/policies), incluindo os requisitos de **uso limitado** (Limited Use):

- Os dados são usados apenas para oferecer ou melhorar a finalidade única da extensão, visível ao usuário.
- Os dados só são enviados aos serviços listados na Seção 4 na medida necessária para concluir as ações que você inicia.
- Os dados nunca são vendidos ou transferidos a terceiros, nem usados para publicidade personalizada, nem para avaliar crédito ou para fins de empréstimo.
- O desenvolvedor não tem acesso aos seus dados de navegação ou configurações.

A versão para Firefox também segue as [Políticas de complementos](https://extensionworkshop.com/documentation/publish/add-on-policies/) da Mozilla: transmite apenas os dados de que seus recursos precisam e os usa somente para a finalidade com que foram transmitidos.

## 14. Alterações nesta Política

Se o Lumno adicionar novas categorias de dados, finalidades ou destinatários — por exemplo, trazendo de volta contas ou recursos em nuvem —, atualizaremos esta Política e as declarações de dados da loja antes que a mudança entre em vigor e avisaremos com destaque na extensão; quando a lei exigir consentimento, pediremos de novo. Para ajustes de redação, atualizações de links ou esclarecimentos que não reduzam seus direitos, podemos apenas atualizar a data desta página. Não reduziremos seus direitos previstos nesta Política sem o seu consentimento.

## 15. Fale conosco

Se tiver dúvidas, comentários ou solicitações sobre esta Política ou seus dados pessoais, envie um e-mail para [i@kubai.design](mailto:i@kubai.design). Você também pode abrir uma issue pública no [GitHub](https://github.com/kubai087/lumno-extension/issues), mas não compartilhe dados pessoais em canais públicos.
