// Textos e dados do site. Tudo o que aparece na home pode ser editado aqui.

export const site = {
  name: "Thiago Miedes",
  firstName: "Thiago",
  role: "Designer gráfico & web designer",
  city: "Bauru, SP",
  url: "https://thiagomiedes.com.br",
  description:
    "Portfólio de Thiago Miedes, designer gráfico e web designer em Bauru (SP). Identidade visual, sites, UI design e social media para marcas de todo o Brasil.",
  email: "thiagodesign21@outlook.com",
  phone: "(14) 99114-0646",
  whatsapp: "5514991140646",
  whatsappText: "Olá, Thiago! Vim pelo seu portfólio e quero conversar sobre um projeto.",
  social: [
    { label: "Instagram", icon: "instagram", href: "https://instagram.com/miedesthiago" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/thiago-miedes/" },
    { label: "Behance", icon: "behance", href: "https://www.behance.net/thiagomiedes" },
  ],
};

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappText)}`;

/** Links do menu (âncoras da home). */
export const nav = [
  { href: "/#projetos", label: "Trabalhos", section: "projetos" },
  { href: "/#servicos", label: "Serviços", section: "servicos" },
  { href: "/#sobre", label: "Sobre", section: "sobre" },
  { href: "/#faq", label: "FAQ", section: "faq" },
];

/** Fatos do hero (sem estrelas, sem "clientes"). */
export const facts = [
  { value: "6+ anos", label: "entre agência, produto digital e freela" },
  { value: "Bauru, SP", label: "com clientes em todo o Brasil" },
  { value: "WorldSkills", label: "competidor pelo SENAI em Design Gráfico" },
];

/** Faixa em movimento do hero. */
export const skills = [
  "Identidade Visual", "Web Design", "UI Design", "Social Media", "Photoshop", "Illustrator", "InDesign", "Figma",
];

/** Slugs dos cases que aparecem na home: 2 sites + 2 identidades, em xadrez (site, marca / marca, site). */
export const homeProjects = ["smartbox", "faggian", "dor-e-saude", "arie-capital"];

/** Ferramentas (ícones do bloco "Ferramentas que eu uso"). */
export const tools = [
  { name: "Photoshop", icon: "photoshop" },
  { name: "Illustrator", icon: "illustrator" },
  { name: "Figma", icon: "figma" },
  { name: "InDesign", icon: "indesign" },
  { name: "After Effects", icon: "aftereffects" },
  { name: "VS Code", icon: "vscode" },
];

/** Serviços (acordeão: só um aberto por vez). */
export const services = [
  {
    icon: "brand",
    title: "Identidade Visual",
    text: "Marcas com personalidade, do conceito ao manual, já aplicadas em peças reais para você ver como elas vivem no dia a dia.",
    tags: ["Logotipo", "Manual de marca", "Paleta e tipografia", "Rebranding"],
  },
  {
    icon: "web",
    title: "Web Design",
    text: "Sites institucionais e landing pages rápidos, bonitos e fáceis de usar no celular, pensados para transformar visita em contato.",
    tags: ["Sites institucionais", "Landing pages", "Responsivo", "SEO básico"],
  },
  {
    icon: "ui",
    title: "UI e UX",
    text: "Interfaces de produtos digitais desenhadas no Figma, com fluxos claros, componentes reaproveitáveis e protótipos para testar antes de programar.",
    tags: ["Wireframes", "Protótipos", "Design system", "Figma"],
  },
  {
    icon: "social",
    title: "Social Media",
    text: "Posts, carrosséis e stories com linguagem própria, para o feed da sua marca ser reconhecido antes mesmo de alguém ler o nome.",
    tags: ["Feed", "Carrosséis", "Stories", "Campanhas"],
  },
  {
    icon: "package",
    title: "Embalagem",
    text: "Rótulos e embalagens que se destacam na prateleira e no marketplace, com arquivos fechados e prontos para a gráfica.",
    tags: ["Rótulos", "Caixas", "Mockups", "Fechamento de arquivo"],
  },
  {
    icon: "print",
    title: "Impressos",
    text: "Papelaria, folders, cartões e materiais de ponto de venda, com arquivo técnico certo para não ter surpresa na impressão.",
    tags: ["Papelaria", "Folders", "Cartões", "PDV"],
  },
];

/** Sobre: parágrafos curtos. */
export const about = [
  "Sou Thiago Miedes, designer gráfico e web designer em Bauru (SP). Há mais de 6 anos crio marcas, sites e peças para redes sociais.",
  "Comecei no SENAI, como competidor do WorldSkills na modalidade Design Gráfico. De 2021 a 2024 trabalhei na Olive Comunicação, onde desenhei sites, identidades e campanhas para clientes de vários segmentos. Hoje sou web designer na EAD Plataforma.",
  "Sou formado pelo UNISAGRADO. Gosto de processo, de detalhe e de design que tem motivo para existir.",
];

/** Trajetória: os 3 primeiros aparecem; o resto abre no "Ver tudo". */
export const timeline = [
  { company: "EAD Plataforma", role: "Web Designer", period: "2024 até hoje" },
  { company: "Olive Comunicação", role: "Designer gráfico e web designer", period: "2021 a 2024" },
  { company: "WorldSkills no SENAI", role: "Competidor em Design Gráfico", period: "2019 a 2020" },
  { company: "UNISAGRADO", role: "Bacharelado", period: "" },
];

/** Perguntas frequentes. */
export const faq = [
  {
    q: "Como começamos um projeto?",
    a: "Tudo começa com uma conversa rápida por WhatsApp, e-mail ou vídeo, para entender seu objetivo, prazo e investimento. Depois envio uma proposta com escopo, etapas e valores. Com a proposta aprovada, fazemos o briefing e o projeto começa.",
  },
  {
    q: "Qual o prazo de um projeto?",
    a: "Depende do escopo. Uma identidade visual leva em média de 3 a 5 semanas; um site institucional, de 4 a 8 semanas; peças de social media e impressos, alguns dias. O cronograma fica definido na proposta, com data para cada entrega.",
  },
  {
    q: "Quantas revisões estão incluídas?",
    a: "Cada etapa inclui até 2 rodadas de ajustes. Como o projeto é validado passo a passo (conceito, layout e finalização), raramente é preciso mais do que isso. Revisões extras podem ser combinadas à parte.",
  },
  {
    q: "Em quais formatos recebo os arquivos?",
    a: "Você recebe tudo organizado: arquivos editáveis (AI, PSD ou Figma), versões para web (PNG, SVG, WebP) e para impressão (PDF com sangria). Em sites, entrego o projeto publicado ou o código-fonte, conforme o combinado.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Normalmente 50% na aprovação da proposta e 50% na entrega final, via Pix ou transferência. Em projetos maiores, dá para dividir o pagamento por etapas.",
  },
  {
    q: "Você atende clientes de outras cidades?",
    a: "Sim! Moro em Bauru (SP), mas atendo clientes de qualquer cidade do Brasil. Reuniões por vídeo, aprovações online e arquivos na nuvem deixam tudo simples à distância.",
  },
];
