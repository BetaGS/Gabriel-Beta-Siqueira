// Lista central de projetos do portfólio.
//
// Para adicionar um novo projeto, basta copiar um dos objetos abaixo,
// colar no final do array e preencher os campos.
//
// category aceita: 'web', 'mobile' ou 'backend'
//   - 'web'     -> sites, landing pages, e-commerces, SPAs em React/HTML/CSS
//   - 'mobile'  -> apps React Native / Expo
//   - 'backend' -> APIs, servidores, integrações
//
// image: coloque o arquivo em /public/images e referencie como '/images/nome-do-arquivo.png' (ou null para usar um card sem imagem)
// link: URL pública do projeto (deploy, repositório, página do Expo, etc.)
//
// Campos extras SÓ para projetos category: 'mobile' (todos opcionais):
//   appStoreLink -> link da App Store (iOS). Se não tiver o app lá ainda, apague ou deixe null.
//   playStoreLink -> link da Google Play (Android). Se não tiver o app lá ainda, apague ou deixe null.
// Se nenhum dos dois for informado, o card mostra o botão "Ver Projeto →" normal (ex: link do Expo/GitHub).

export const projects = [
  {
    id: 1,
    title: 'E-commerce de Confeitaria',
    description: 'Plataforma de e-commerce para venda de produtos de confeitaria',
    technologies: ['Bootstrap', 'HTML', 'CSS', 'JavaScript'],
    image: '/images/docemila.png',
    link: 'https://betags.github.io/E-commerce-DoceMila/',
    category: 'web',
  },
  {
    id: 2,
    title: 'Calculadora Online',
    description:
      'Calculadora básica: realiza as quatro operações fundamentais (adição, subtração, multiplicação e divisão), além de funções como porcentagem e raiz quadrada.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/calculadora.png',
    link: 'https://betags.github.io/calculadora/',
    category: 'web',
  },
  {
    id: 3,
    title: 'E-commerce de Tecnologia',
    description: 'Plataforma de e-commerce para venda de produtos tecnológicos',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
    image: '/images/TechStore.png',
    link: 'https://e-commerce-techstore-m6sj.onrender.com',
    category: 'web',
  },
  {
    id: 4,
    title: 'E-commerce de Periféricos Gamer',
    description: 'Plataforma de e-commerce para vendas de periféricos gamer.',
    technologies: ['HTML', 'CSS'],
    image: '/images/gamernoob.png',
    link: 'https://betags.github.io/E-commerce-GamerNoob/',
    category: 'web',
  },
  {
    id: 5,
    title: 'Doce Mila',
    description: 'E-commerce de confeitaria artesanal',
    technologies: ['React', 'JavaScript'],
    image: '/images/docemila-react.png',
    link: 'https://e-commerce-doce-mila-react-o66x.onrender.com',
    category: 'web',
  },
  {
    id: 6,
    title: 'Projeto Filiar 2026',
    description:
      'Landing page da Creche Municipal Tia Maria, desenvolvida para dar visibilidade aos projetos pedagógicos expostos na FLIAR 2026.',
    technologies: ['React'],
    image: '/images/crechetiamaria.png',
    link: 'https://creche-tia-maria.onrender.com/',
    category: 'web',
  },

    {
    id: 7,
    title: 'BySportHub',
    description: 'O BySport é a plataforma completa de gestão esportiva criada para conectar toda a comunidade do seu time ou escolinha em um só lugar. Desenvolvido para aproximar alunos, pais, professores e coordenadores, o aplicativo centraliza o dia a dia esportivo, facilitando a comunicação e simplificando a organização das atividades',
    technologies: ['React Native', 'Expo'],
    image: '/images/bysporthub.png',
    link: 'https://expo.dev',
    appStoreLink: 'https://apps.apple.com/br/app/bysporthub/id6799594045',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.base69cac2c2a6e8efa56db5fe33.app&pcampaignid=web_share',
    category: 'mobile',
    // features: cada item destaca uma área da tela no showcase interativo.
    // box = [esquerda %, topo %, largura %, altura %] relativo à imagem do app.
    features: [
      { icon: '📊', title: 'Dashboard', text: 'Painel administrativo para gerir o time ou a escolinha.', box: [3.9, 43, 44.6, 13.9] },
      { icon: '📣', title: 'Comunicados', text: 'Avisos e novidades chegando para toda a comunidade.', box: [51.5, 43, 44.5, 13.9] },
      { icon: '🏆', title: 'Eventos', text: 'Campeonatos e clínicas organizados em um só lugar.', box: [3.9, 58.4, 44.6, 13.9] },
      { icon: '📅', title: 'Calendário', text: 'Aulas e atividades sempre à mão.', box: [51.5, 58.4, 44.5, 13.9] },
      { icon: '🛍️', title: 'Loja', text: 'Produtos e uniformes direto no app.', box: [3.9, 73.9, 44.6, 13.9] },
      { icon: '🧑‍🏫', title: 'Portal', text: 'Modo colaborador para quem faz o dia a dia acontecer.', box: [51.5, 73.9, 44.5, 13.9] },
    ],
  },

  {
    id: 8,
    title: 'API do Portfólio',
    description:
      'API em Python (FastAPI + SQLite) que dá vida a este portfólio: contador de visitas, lista de projetos e recebimento de mensagens do formulário de contato, com validação, rate limit e CORS.',
    technologies: ['Python', 'FastAPI', 'SQLite'],
    image: null,
    icon: '🐍',
    link: 'https://github.com/BetaGS',
    category: 'backend',
  },
  {
    id: 9,
    title: 'Bot de Assinaturas para Discord',
    description:
      'Bot que automatiza o acesso a comunidades pagas: confirma o pagamento da assinatura anual pela InfinitePay, libera o cargo VIP no servidor e remove o cargo quando a assinatura vence. Integração de pagamentos, webhooks e API do Discord, hospedado na Railway.',
    technologies: ['JavaScript', 'Node.js', 'Discord API', 'InfinitePay', 'Railway'],
    image: null,
    icon: '🤖',
    link: 'https://github.com/BetaGS',
    category: 'backend',
  },
];

export const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'backend', label: 'Back-end' },
];
