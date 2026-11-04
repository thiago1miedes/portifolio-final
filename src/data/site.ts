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

/** Frases do balão ao lado da foto no hero (cada clique troca). As de mouse só fazem sentido onde dá para arrastar. */
export const heroPhrases = {
  all: ["Oi!", "Bora criar?", "Aceito café"],
  mouse: ["Oi!", "Gira a foto na bolinha", "Bora criar?", "Arrasta as figurinhas", "Aceito café"],
};

export interface BoardItem {
  slug: string;
  /** posição e largura em % da mesa (x e w da largura, y da altura) */
  x: number;
  y: number;
  w: number;
  /** proporção do quadro da foto */
  ratio: string;
  /** inclinação em graus */
  r: number;
  deco: "tape" | "tape-accent" | "pin";
  /** imagem provisória: vale até a marca ganhar capa nova em capas/ (ver imagens.md) */
  image?: string;
}

/** Mesa de projetos da home: 4 sites + 4 marcas, soltos. No celular viram uma coluna em zigue-zague, na mesma ordem. */
export const homeBoard: BoardItem[] = [
  { slug: "smartbox", x: 0, y: 4, w: 38, ratio: "3 / 2", r: -5, deco: "tape" },
  { slug: "faggian", x: 39.5, y: 0, w: 20, ratio: "3 / 4", r: 5, deco: "pin", image: "/brand/faggian/img/mockup-sacola.webp" },
  { slug: "arie-capital", x: 62, y: 9, w: 36, ratio: "3 / 2", r: 3, deco: "tape-accent" },
  { slug: "confraria", x: 4, y: 39, w: 21, ratio: "4 / 5", r: 6, deco: "pin", image: "/brand/confraria/img/mockup-vela.webp" },
  { slug: "firework", x: 25, y: 32.5, w: 40, ratio: "3 / 2", r: -3.5, deco: "tape" },
  { slug: "dor-e-saude", x: 70, y: 44, w: 20, ratio: "3 / 4", r: 7, deco: "tape-accent", image: "/brand/dor-e-saude/img/mockup-jaleco.webp" },
  { slug: "deliziare", x: 0, y: 71, w: 34, ratio: "3 / 2", r: 3, deco: "tape" },
  { slug: "kom-saude", x: 37, y: 66.5, w: 31, ratio: "4 / 3", r: -4.5, deco: "pin", image: "/brand/kom-saude/img/mockup-garrafas.webp" },
];

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
