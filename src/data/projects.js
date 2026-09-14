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
// image: coloque o arquivo em /public/images e referencie como '/images/nome-do-arquivo.png'
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
    link: 'https://techstore-m0oq.onrender.com/',
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
    link: 'https://e-commerce-doce-mila.onrender.com',
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

  // Exemplo de projeto MOBILE com links de loja — ATIVO só pra você ver o card funcionando.
  // Edite os campos com seu app real ou apague este objeto quando não precisar mais do exemplo.
  {
    id: 7,
    title: 'BySportHub',
    description: 'Substitua por uma descrição real do seu app mobile assim que publicar.',
    technologies: ['React Native', 'Expo'],
    image: '/images/bysporthub.png',
    link: 'https://expo.dev',
    appStoreLink: 'https://apps.apple.com/br/app/bysporthub/id6799594045',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.seuapp',
    category: 'mobile',
  },

  // Exemplo de projeto BACK-END (apague ou edite quando tiver o primeiro pronto):
  // {
  //   id: 8,
  //   title: 'Nome da API',
  //   description: 'Descrição curta da API ou serviço back-end.',
  //   technologies: ['Node.js', 'Express'],
  //   image: '/images/nome-da-api.png',
  //   link: 'https://github.com/seu-usuario/nome-do-repo',
  //   category: 'backend',
  // },
];

export const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'backend', label: 'Back-end' },
];
