import type { GuideLocaleContent } from "../../lib/guides";

/** Brazilian Portuguese help center. The extension itself shows English here, so its labels stay in English. */
const content: GuideLocaleContent = {
  ui: {
    navLabel: "Central de ajuda",
    navTitle: "Central de ajuda do Lumno",
    groups: {
      about: "Conheça o Lumno",
      quickstart: "Primeiros passos",
      trust: "Compatibilidade e confiança",
    },
    sections: {
      setup: "Instalar e configurar",
      "command-bar": "Barra de comandos",
      "new-tab": "Nova guia",
      scenarios: "Casos de uso",
    },
    navToggle: "Sumário",
    updatedLabel: "Atualizado em {date}",
    tocLabel: "Nesta página",
    faqTitle: "Perguntas frequentes",
    previousLabel: "Anterior",
    nextLabel: "Próximo",
    zoomLabel: "Ver em tamanho real",
    closeLabel: "Fechar",
    privacyLabel: "Política de Privacidade",
    searchPlaceholder: "Pesquisar na ajuda",
    searchLabel: "Pesquisar na central de ajuda",
    searchEmpty: "Nenhum resultado",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "O que é o Lumno? Barra de comandos e nova guia de código aberto | Ajuda do Lumno",
      pageDescription:
        "O Lumno é uma extensão de navegador gratuita e de código aberto. Pressione ⌘⇧K em qualquer página para pesquisar suas guias, favoritos e histórico, pesquisar dentro de sites ou perguntar à IA, e tenha uma nova guia tranquila e personalizável. Funciona no Chrome, Edge, Dia e outros navegadores Chromium.",
      keywords: ["Lumno", "barra de comandos do navegador", "extensão paleta de comandos Chrome", "pesquisar guias", "extensão nova guia", "barra de comandos do Arc"],
      title: "O que é o Lumno?",
      navTitle: "O que é o Lumno?",
      faq: [
        { question: "O Lumno é gratuito?", answer: "Sim. O Lumno é de código aberto sob a licença GPL-3.0, todos os recursos são gratuitos e você não precisa criar conta." },
        {
          question: "Em quais navegadores ele funciona?",
          answer: "Chrome, Edge, Dia, Brave, Arc, Vivaldi e outros navegadores Chromium. O Safari não é compatível. Veja Compatibilidade com navegadores.",
        },
      ],
    },
    limitations: {
      pageTitle: "O que o Lumno não faz: limites e lacunas conhecidas | Ajuda do Lumno",
      pageDescription:
        "O Lumno é uma extensão, não um navegador: não tem barra lateral, Spaces nem tela dividida, a barra de comandos não abre em páginas chrome://, não funciona no Safari e não há nova guia no Dia. Veja o que ele não faz e o que usar no lugar.",
      keywords: ["limites do Lumno", "extensão Chrome páginas restritas", "alternativa à barra lateral do Arc", "nova guia no Dia"],
      title: "O que o Lumno não faz",
      navTitle: "O que o Lumno não faz",
    },
    "use-cases": {
      pageTitle: "Para quem é o Lumno: guias demais, saindo do Arc, desenvolvimento e escrita | Ajuda do Lumno",
      pageDescription:
        "Onde o Lumno mais ajuda: dezenas de guias abertas, a mudança do Arc para o Chrome ou o Dia, desenvolvedores entre documentação e GitHub, pesquisa e escrita, perguntas rápidas à IA e uma nova guia tranquila.",
      keywords: ["casos de uso do Lumno", "guias demais", "alternativa ao Arc", "extensão de navegador para desenvolvedores", "atalho para perguntar à IA"],
      title: "Casos de uso",
      navTitle: "Casos de uso",
    },
    install: {
      pageTitle: "Instale o Lumno pela Chrome Web Store ou pelos Complementos do Edge | Ajuda do Lumno",
      pageDescription:
        "Instale o Lumno pela Chrome Web Store no Chrome, Dia, Brave ou Arc, ou pelos Complementos do Microsoft Edge no Edge. Uma página de boas-vindas abre e o ⌘⇧K já está pronto para usar.",
      keywords: ["instalar Lumno", "Lumno Chrome Web Store", "Lumno Complementos do Edge", "instalar extensão do Chrome"],
      title: "Instalar o Lumno",
      navTitle: "Instalar o Lumno",
      faq: [
        { question: "Preciso de uma conta?", answer: "Não. O Lumno não tem sistema de contas. É só instalar e usar." },
        {
          question: "Como desinstalo?",
          answer: "Abra chrome://extensions (edge://extensions no Edge), encontre o Lumno e clique em Remover. Isso também apaga as configurações e imagens que o Lumno guardou no seu dispositivo.",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Atalhos de teclado do Lumno: padrões, como mudar e teclas da barra | Ajuda do Lumno",
      pageDescription:
        "O Lumno abre com ⌘⇧K (Ctrl+Shift+K no Windows) e o alternador de guias recentes com ⌥Q. Mude os atalhos em chrome://extensions/shortcuts, até para ⌘T. Mais todas as teclas da barra de comandos e do alternador.",
      keywords: ["atalhos do Lumno", "mudar atalho de extensão do Chrome", "chrome://extensions/shortcuts", "Cmd T barra de comandos"],
      title: "Atalhos de teclado",
      navTitle: "Atalhos de teclado",
      faq: [
        {
          question: "O atalho não faz nada. E agora?",
          answer:
            "Confira se você não está numa página restrita, como as configurações chrome:// ou a Web Store, e veja em chrome://extensions/shortcuts se outra extensão usa o mesmo atalho. No Dia, mude o escopo para Global.",
        },
      ],
    },
    sync: {
      pageTitle: "Sincronize o Lumno entre computadores com a sincronização do navegador e WebDAV | Ajuda do Lumno",
      pageDescription:
        "As configurações do Lumno acompanham a sincronização do seu navegador. Ative a sincronização WebDAV para levar também os ícones de atalhos e os papéis de parede, usando Nextcloud, um NAS ou qualquer servidor WebDAV que você controle.",
      keywords: ["sincronização do Lumno", "sincronização WebDAV", "Nextcloud WebDAV", "sincronizar configurações de extensão do Chrome", "sincronizar nova guia"],
      title: "Sincronização",
      navTitle: "Sincronização",
      faq: [
        {
          question: "Preciso de uma conta do Lumno para sincronizar?",
          answer: "Não. O Lumno não tem contas nem servidores. As configurações vão pela sincronização do navegador; ícones e papéis de parede podem ir pelo seu próprio WebDAV.",
        },
        {
          question: "O Chrome e o Firefox conseguem sincronizar entre si?",
          answer: "Sim, pelo WebDAV. Aponte os dois navegadores para o mesmo servidor e a mesma pasta, até no mesmo computador.",
        },
      ],
    },
    "search-tabs-bookmarks-history": {
      pageTitle: "Pesquise guias abertas, favoritos e histórico numa só caixa | Ajuda do Lumno",
      pageDescription:
        "Pressione ⌘⇧K (Ctrl+Shift+K no Windows) em qualquer página para pesquisar suas guias abertas, favoritos, histórico e sites mais visitados numa só caixa, ou só nas guias abertas.",
      keywords: ["pesquisar guias no Chrome", "extensão para pesquisar favoritos", "pesquisar histórico", "pesquisar guias abertas", "paleta de comandos do Chrome"],
      title: "Pesquisar guias, favoritos e histórico",
      navTitle: "Guias, favoritos e histórico",
      faq: [
        {
          question: "O Lumno envia meu histórico ou meus favoritos?",
          answer:
            "Não. Guias, favoritos e histórico são pesquisados no seu dispositivo, e o Lumno não os coleta. O que você digita vai para o serviço de sugestões do seu mecanismo de pesquisa, igual à barra de endereços.",
        },
        {
          question: "Os resultados podem abrir numa nova guia?",
          answer: "Sim. Nas configurações do Lumno, escolha abrir na guia atual, à esquerda ou à direita dela, ou no fim da barra de guias.",
        },
      ],
    },
    "site-search": {
      pageTitle: "Pesquisa em sites: digite um atalho, aperte Tab e pesquise no GitHub, YouTube ou ChatGPT | Ajuda do Lumno",
      pageDescription:
        "O Lumno vem com 46 atalhos de pesquisa. Digite gh, yt ou sf e aperte Tab para pesquisar direto no GitHub, YouTube ou Stack Overflow, ou mande uma pergunta direto para o ChatGPT, Gemini ou Perplexity.",
      keywords: ["pesquisa em sites no Chrome", "Tab para pesquisar", "atalhos de pesquisa no navegador", "pesquisar no GitHub rápido", "atalho para o ChatGPT", "mecanismo de pesquisa personalizado"],
      title: "Pesquisa em sites e perguntas à IA",
      navTitle: "Pesquisa em sites e IA",
      faq: [
        {
          question: "Quais sites vêm incluídos?",
          answer:
            "46 ao todo: 11 mecanismos de pesquisa, 11 chats e buscadores com IA (como ChatGPT, Gemini, Perplexity e DeepSeek) e 24 sites, entre eles GitHub, YouTube, Stack Overflow e Reddit. Você pode adicionar os seus.",
        },
        { question: "A pesquisa em sites passa pelos servidores do Lumno?", answer: "Não. O Lumno não tem servidores; ao apertar Enter, a página de pesquisa do próprio site abre direto." },
      ],
    },
    "tab-switcher": {
      pageTitle: "Alternador de guias recentes: aperte ⌥Q para pular entre guias recentes | Ajuda do Lumno",
      pageDescription:
        "Aperte ⌥Q (Alt+Q no Windows) para abrir o alternador de guias recentes do Lumno, com suas guias na ordem em que você as usou e uma prévia de cada uma. Segure ⌥, toque Q e solte.",
      keywords: ["alternador de guias do Chrome", "guias recentes", "Alt Tab para o navegador", "Arc Ctrl Tab"],
      title: "Alternar entre guias recentes",
      navTitle: "Guias recentes",
    },
    "newtab-wallpaper": {
      pageTitle: "Papéis de parede da nova guia: pinturas clássicas, foto do dia do Bing, suas fotos e filtros | Ajuda do Lumno",
      pageDescription:
        "Mude o papel de parede da nova guia do Lumno nas configurações de Appearance: pinturas incluídas, a foto do dia do Bing, fotos selecionadas, suas próprias imagens ou um link de imagem, com véu, filtros e escolhas separadas para os modos claro e escuro.",
      keywords: ["papel de parede da nova guia", "fundo da nova guia do Chrome", "papel de parede diário do Bing", "extensão nova guia"],
      title: "Mudar o papel de parede",
      navTitle: "Mudar o papel de parede",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "Atalhos e favoritos na nova guia: adicione sites, três layouts | Ajuda do Lumno",
      pageDescription:
        "Adicione seus sites de sempre como atalhos na nova guia do Lumno, escolha os ícones e veja seus favoritos como pastas, lista aninhada ou barra no topo.",
      keywords: ["atalhos da nova guia", "favoritos na nova guia", "barra de favoritos do Chrome", "pastas de favoritos"],
      title: "Atalhos e favoritos",
      navTitle: "Atalhos e favoritos",
    },
    "newtab-frequent-sites": {
      pageTitle: "Sites frequentes e cartões de progresso: fixe sites e não perca o episódio | Ajuda do Lumno",
      pageDescription:
        "A nova guia do Lumno mostra seus sites mais visitados ou recentes. Fixe até três; fixe uma série ou um romance em capítulos e o cartão acompanha você até o próximo episódio ou capítulo.",
      keywords: ["sites mais visitados na nova guia", "acompanhar séries", "progresso de web novel", "fixar sites"],
      title: "Sites frequentes e cartões de progresso",
      navTitle: "Sites frequentes e progresso",
    },
    "newtab-clock-zen": {
      pageTitle: "Relógio e modo Zen: uma nova guia só com a caixa de pesquisa | Ajuda do Lumno",
      pageDescription: "Mostre um relógio na nova guia do Lumno, ou digite /zen para esconder tudo menos a caixa de pesquisa.",
      keywords: ["relógio na nova guia", "nova guia minimalista", "modo Zen", "nova guia para foco"],
      title: "Relógio e modo Zen",
      navTitle: "Relógio e modo Zen",
    },
    "arc-command-bar": {
      pageTitle: "Do Arc para o Chrome, Dia ou Edge: a barra de comandos e os atalhos | Ajuda do Lumno",
      pageDescription:
        "Trocou o Arc pelo Chrome, Dia ou Edge? O Lumno traz de volta uma barra de comandos no estilo do Arc: ⌘⇧K pesquisa guias, favoritos e histórico (ou mude para ⌘T), e ⌥Q alterna entre guias recentes. Com uma tabela dos atalhos do Arc.",
      keywords: ["alternativa à barra de comandos do Arc", "alternativa ao navegador Arc", "mudar do Arc para o Chrome", "barra de comandos do Dia", "atalhos do Arc"],
      title: "Vindo do Arc",
      navTitle: "Vindo do Arc",
      faq: [
        {
          question: "O Lumno tem relação com o Arc?",
          answer: "Não. O Lumno é um projeto independente de código aberto, inspirado na barra de comandos do Arc, sem vínculo com o Arc nem com a The Browser Company.",
        },
      ],
    },
    "browser-compatibility": {
      pageTitle: "Compatibilidade com navegadores: Chrome, Edge, Dia, Brave, Firefox e Safari | Ajuda do Lumno",
      pageDescription:
        "O Lumno funciona por completo no Chrome, Edge, Brave, Arc, Vivaldi e outros navegadores Chromium. O Dia não tem a nova guia do Lumno, a versão para Firefox tem algumas lacunas, e o Safari e os navegadores de celular não são compatíveis.",
      keywords: ["compatibilidade do Lumno", "extensão para o Dia", "extensão para o Edge", "versão para Firefox", "extensão Chromium"],
      title: "Compatibilidade com navegadores",
      navTitle: "Compatibilidade com navegadores",
    },
    "privacy-data": {
      pageTitle: "Privacidade e dados: o Lumno funciona no seu dispositivo e não coleta nada | Ajuda do Lumno",
      pageDescription:
        "O Lumno não tem contas nem servidores. Suas guias, favoritos e histórico ficam no seu dispositivo, e nenhum dado de uso é coletado. Veja o que sai do seu dispositivo e como funcionam a sincronização do navegador e o WebDAV.",
      keywords: ["privacidade do Lumno", "privacidade de extensão de navegador", "dados de extensão do Chrome", "sincronização WebDAV"],
      title: "Privacidade e dados",
      navTitle: "Privacidade e dados",
    },
    "security-open-source": {
      pageTitle: "Segurança e código aberto: código GPL-3.0, permissões, Manifest V3 | Ajuda do Lumno",
      pageDescription:
        "O Lumno é de código aberto sob GPL-3.0 no GitHub, feito com Manifest V3 e sem código remoto. Veja para que serve cada permissão do navegador.",
      keywords: ["Lumno código aberto", "segurança do Lumno", "permissões de extensão do Chrome", "Manifest V3"],
      title: "Segurança e código aberto",
      navTitle: "Segurança e código aberto",
    },
    "ratings-reviews": {
      pageTitle: "Avaliações e imprensa: avaliações na Chrome Web Store e artigos | Ajuda do Lumno",
      pageDescription: "A nota e as avaliações do Lumno na Chrome Web Store, e os artigos escritos sobre ele.",
      keywords: ["avaliações do Lumno", "nota do Lumno", "análise de extensão de barra de comandos do Chrome"],
      title: "Avaliações e imprensa",
      navTitle: "Avaliações e imprensa",
    },
  },
};

export default content;
