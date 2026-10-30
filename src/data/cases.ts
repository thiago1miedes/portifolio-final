// Conteúdo dos cases. As imagens de cada slug vêm de src/data/assets.json
// (gerado por `npm run assets`). Para remover um case, apague o objeto daqui.
import assets from "./assets.json";

export type Category = "web" | "dev" | "brand" | "social" | "print" | "packaging" | "deck";

export const categories: Record<Category, string> = {
  web: "Web design",
  dev: "Front-end",
  brand: "Identidade visual",
  social: "Social media",
  print: "Papelaria & impressos",
  packaging: "Embalagem",
  deck: "Apresentações",
};

export interface CaseData {
  slug: string;
  title: string;
  client: string;
  sector: string;
  year?: string;
  cats: Category[];
  /** posição na vitrine da home (menor = primeiro) */
  featured?: number;
  accent: string;
  summary: string;
  about: string[];
  deliverables: string[];
  tools: string[];
  live?: string;
  credit?: string;
  /** case de carrosséis de Instagram (as telas vêm dos itens com group = key) */
  social?: SocialShowcase;
  /** case de produto: embalagens, ensaio de fotos e galerias de marketplace (as imagens vêm dos itens pelo id) */
  product?: ProductShowcase;
  /** e-book lido como livro: as páginas são os itens de kind "book", na ordem do PDF */
  book?: BookShowcase;
}

export interface BookShowcase {
  /** formato das páginas, ex.: "A4 retrato" */
  format: string;
  stats: { n: string; label: string }[];
  /** capítulos na ordem do livro; page = página do PDF onde o capítulo começa (1 = capa) */
  chapters: { title: string; page: number }[];
  /** linguagem do e-book: paleta e recortes de detalhes (x, y e w em fração da página; o recorte é 4:3) */
  system: {
    title: string;
    note: string;
    palette: { name: string; hex: string }[];
    details: { page: number; x: number; y: number; w: number; title: string; note: string }[];
  };
}

export interface ProductShowcase {
  stats: { n: string; label: string }[];
  packaging: {
    title: string;
    note: string;
    /** medida do rótulo planificado */
    labelSize: string;
    /** cada versão usa os itens `${key}-front`, `${key}-left`, `${key}-right` (vistas do pote) e `${key}-label` (planificação) */
    versions: { key: string; name: string; glow: string; note: string; views: string[]; palette: { name: string; hex: string }[] }[];
  };
  photos: {
    title: string;
    note: string;
    /** ids das fotos por linha: cada linha ocupa a largura toda, com todas as fotos na mesma altura */
    shoots: { key: string; label: string; note: string; rows: string[][] }[];
  };
  campaigns: {
    title: string;
    note: string;
    /** as imagens são os itens com group = key; uma legenda por imagem, na ordem da galeria */
    list: { key: string; brand: string; product: string; note: string; captions: { t: string; d: string }[] }[];
  };
}

export interface SocialShowcase {
  /** perfil, sem @ */
  profile: string;
  /** linha abaixo do perfil no cabeçalho do post */
  place: string;
  /** id do item usado como avatar (padrão: "logo") */
  avatar?: string;
  /** abertura da parte de redes, quando o case começa pelo site */
  intro?: { title: string; note: string };
  stats?: { n: string; label: string }[];
  /** perfil simulado: feed = groups na ordem da grade (o 1º item de cada um é a capa); destaques = group "destaques" */
  page?: { title: string; note: string; name: string; category: string; bio: string[]; link: string; feed: string[]; visible: number };
  /** frentes de conteúdo, na ordem da página */
  fronts: { key: string; label: string; note: string }[];
  /** as telas vêm do group = key; os stories da mesma campanha, quando existem, do group `${key}-st` */
  carousels: { key: string; front: string; title: string; note: string; when: string }[];
  /**
   * paleta + elementos gráficos em SVG (itens do group "elementos", na ordem) ou recortes 4:3 de posts
   * (details: id do item; x, y e w em fração da arte)
   */
  system?: {
    title: string;
    note: string;
    palette: { name: string; hex: string }[];
    elements?: string[];
    details?: { id: string; x: number; y: number; w: number; title: string; note: string }[];
  };
  /** bloco "A marca": logotipo (item "logo-cor") sobre light, versão em negativo (item "logo") sobre dark, símbolo (item "simbolo") e as cores */
  brand?: { title: string; note: string; light: string; dark: string; palette?: { name: string; hex: string }[] };
  /** esconde o índice de carrosséis (quando as sequências são posts únicos) */
  hideIndex?: boolean;
  /** cor da capa quando o case não tem o painel de ladrilhos (item "padrao"): o logotipo (item "logo") vai sobre ela */
  coverBg?: string;
  /** estilo da capa lisa: ondas no rodapé (padrão) ou o símbolo (item "simbolo") grande, montado peça por peça */
  coverStyle?: "wave" | "symbol";
  /** posts únicos fora dos carrosséis: cada um é um group próprio, com o título no label do item */
  singles?: { title: string; note: string; list: { key: string; title: string; when: string; big?: boolean }[] };
  /** faixa de stories avulsos (group "stories") */
  stories?: { title: string; note: string };
  /** vídeos fora do Instagram (group "tela") */
  screen?: { title: string; note: string; spec: string };
}

export interface AssetItem {
  id: string;
  src: string;
  w: number;
  h: number;
  kind: "page" | "mobile" | "slide" | "image" | "photo" | "label" | "book" | "post" | "story" | "feed" | "banner" | "svg" | "video";
  label?: string;
  group?: string;
  /** mp4 dos itens de vídeo (src é o pôster) */
  video?: string;
}

const list: CaseData[] = [
  /* ============================================================ destaque */
  {
    slug: "smartbox",
    title: "Smart Box",
    client: "Smart Box",
    sector: "Varejo autônomo · mini mercados inteligentes",
    year: "2026",
    cats: ["dev", "web", "social"],
    featured: 1,
    accent: "#BCCF0F",
    summary: "Site institucional em código e o Instagram de uma rede de mini mercados autônomos: carrosséis, stories, destaques e as campanhas do ano.",
    about: [
      "A Smart Box instala mini mercados inteligentes e vending machines em empresas, condomínios e academias da região metropolitana de São Paulo. O desafio era traduzir uma operação 100% autoatendimento em uma marca próxima e fácil de entender, do primeiro contato no Instagram ao pedido de orçamento no site.",
      "Desenhei e desenvolvi o site do zero em HTML, CSS e JavaScript, com páginas de soluções, quem somos, onde estamos e formulário para empresas.",
      "No Instagram, criei a linha visual do perfil: carrosséis que explicam o modelo para RH e síndicos, stories de produto, capas de destaque, datas comemorativas e campanhas de indicação, sempre em Poppins, com o verde-limão da marca e fotos reais das máquinas.",
    ],
    deliverables: ["UI design do site", "Desenvolvimento front-end", "Formulário de orçamento", "41 posts de feed", "81 stories", "Capas de destaque", "Campanha de indicação", "Vídeos para a tela da máquina"],
    tools: ["Figma", "HTML", "CSS", "JavaScript", "Photoshop", "Illustrator", "After Effects"],
    live: "https://smartboxbr.com.br",
    social: {
      profile: "brsmartbox",
      place: "São Paulo",
      intro: {
        title: "Um feed que se reconhece <em>de longe</em>",
        note: "Além do site, a Smart Box ganhou uma linha visual para o Instagram: verde-limão, grafite e fotos reais das máquinas, repetidos em posts, stories e destaques. Primeiro, o perfil montado com as peças do ano; depois, as sequências contadas uma a uma.",
      },
      stats: [
        { n: "41", label: "posts de feed" },
        { n: "81", label: "stories" },
        { n: "10", label: "carrosséis" },
        { n: "5", label: "capas de destaque" },
      ],
      page: {
        title: "O perfil inteiro, <em>de uma vez</em>",
        note: "Os 41 posts do case na grade da @brsmartbox, com as capas de destaque no topo. Toque num post para ver as telas.",
        name: "Smart Box",
        category: "Mini mercado inteligente",
        bio: ["Conveniência que alimenta sua rotina.", "Empresas, condomínios e academias em SP."],
        link: "smartboxbr.com.br",
        visible: 9,
        feed: [
          "indicou", "aniversario", "cliente",
          "esquenta-precos", "meme", "semana",
          "agosto", "pais", "esquenta",
          "opcoes", "copa", "onde",
          "namorados", "trabalhador", "crush",
          "maes", "pegou", "indique",
          "vem-ai", "pascoa-semana", "pascoa",
          "novo-site", "site-obra", "faria-lima",
          "academia", "onde-lista", "onde-querem",
          "onde-mapa", "beneficio", "onde-atua",
          "notas", "empresas", "enquete",
          "bold", "foco", "yopro",
          "salgadinhos", "chicletes", "lua",
          "coca", "docinho",
        ],
      },
      fronts: [
        { key: "como", label: "Como funciona", note: "Para quem decide e para quem compra: como pagar, qual formato cabe em cada espaço e onde já tem Smart Box." },
        { key: "campanhas", label: "Campanhas", note: "Prêmio, preço e prazo na tela: campanhas para trazer novos pontos e girar o estoque." },
        { key: "datas", label: "Calendário", note: "Datas comemorativas puxadas para a rotina do escritório, sempre com um produto da máquina no meio." },
        { key: "humor", label: "Bom humor", note: "Memes com as situações de todo escritório, resolvidas a poucos passos da mesa." },
      ],
      carousels: [
        {
          key: "pegou", front: "como", title: "Escolheu, pagou, pegou", when: "Passo a passo",
          note: "A compra explicada sem texto corrido: escolher na máquina, aproximar o cartão ou o celular, pegar o produto. Cada verbo ganha uma pílula sobre uma foto real, e o fechamento resume a promessa: sem filas, sem estresse, compra concluída.",
        },
        {
          key: "opcoes", front: "como", title: "Mini mercado ou vending machine?", when: "Comparativo",
          note: "Oito telas para o RH decidir. A capa faz a pergunta, as do meio comparam os dois formatos lado a lado (espaço disponível, experiência de compra, produtos e para quem é cada um) e o fechamento oferece a análise gratuita do espaço.",
        },
        {
          key: "onde", front: "como", title: "Onde nós estamos", when: "Mapa de pontos",
          note: "Um ponto por tela, numa etiqueta sobre o mapa que segue de uma tela para a outra: Continental Tower, Iguatemi Offices, Riverview, a academia VO2 e a chegada a São Bernardo do Campo. A última pergunta onde o seguidor quer ver a próxima Smart Box.",
        },
        {
          key: "indique", front: "campanhas", title: "Indique a Smart Box", when: "Indicação",
          note: "Três telas que formam uma foto só: a máquina em uso, os motivos para levar a Smart Box para a empresa em cartões e o convite final com o endereço do site. Nos stories, a mesma sequência recomposta em 9:16.",
        },
        {
          key: "indicou", front: "campanhas", title: "Indicou, fechou, ganhou", when: "Campanha com prêmio",
          note: "Quem apresenta uma empresa que fecha com a Smart Box ganha cupom, cesta de produtos ou até R$ 500 no Pix. Os stories criam expectativa em três passos (curiosidade, revelação dos prêmios e o teaser do Pix) antes da cesta. A campanha teve ainda roteiros de Reels com um gancho para cada público dos anúncios: síndicos, RH e funcionários.",
        },
        {
          key: "agosto", front: "campanhas", title: "Promoção Agosto Infinito", when: "Agosto de 2026",
          note: "“Se agosto vai ser longo mesmo, que seja com desconto.” O post reúne sete produtos com o preço antigo e o novo em etiquetas verdes; nos stories, a lista se divide em duas telas para o preço continuar grande.",
        },
        {
          key: "maes", front: "datas", title: "Dia das Mães", when: "Maio de 2026",
          note: "“Ela não para, a gente também não.” A sequência acompanha a mãe no escritório e na academia, dois lugares onde a Smart Box está, e fecha com uma colagem de polaroids das mães da Smart Box.",
        },
        {
          key: "namorados", front: "datas", title: "Dia dos Namorados", when: "12 de junho",
          note: "Para quem esqueceu a data: o 12 preso no mural avisa que ainda dá tempo de salvar o dia com um chocolate da máquina. Nos stories, a piada se estende por três telas (“a gente não te julga, mas ela vai”) até o aviso final.",
        },
        {
          key: "copa", front: "datas", title: "Copa do Mundo", when: "Junho de 2026",
          note: "“Escalamos nossa própria seleção de snacks para a Copa do Mundo.” A bandeira cobre a máquina na primeira tela e o campo continua na segunda, com salgadinhos, refrigerantes e energéticos no lugar dos jogadores.",
        },
        {
          key: "trabalhador", front: "humor", title: "Qual seu tipo de trabalhador?", when: "1º de maio",
          note: "Nove telas de memes para o Dia do Trabalho: o que resolve, o azarado, o do 5º dia útil, o bem-sucedido, o amigão, o animado e o prometedor, cada um com sua descrição. A última lembra que, seja qual for o tipo, a empresa pode ter uma Smart Box para salvar o dia.",
        },
        {
          key: "meme", front: "humor", title: "Não importa a situação", when: "Humor",
          note: "A reunião de 5 minutos que virou 2 horas, a reunião marcada na hora do almoço, o salário que ainda não caiu. Cada situação tem a saída na máquina: energético, lanche rápido, pagamento com VR. As fotos foram feitas na frente das próprias máquinas.",
        },
      ],
      system: {
        title: "Limão, grafite e <em>foto de verdade</em>",
        note: "Os posts dividem poucos recursos, repetidos com disciplina: Poppins pesada e em itálico nos títulos, a palavra-chave em verde-limão, pílulas arredondadas para os textos curtos e o selo da marca numa aba no topo. A foto é sempre a máquina real, no escritório, no prédio ou na academia.",
        palette: [
          { name: "Limão", hex: "#BCCF0F" },
          { name: "Oliva", hex: "#212504" },
          { name: "Grafite", hex: "#1C1C1A" },
          { name: "Papel", hex: "#FBF9F5" },
          { name: "Branco", hex: "#FFFFFF" },
        ],
        details: [
          { id: "pegou-1", x: 0.05, y: 0.45, w: 0.9, title: "Pílulas", note: "Verbos curtos em cápsulas, lidos de relance até no story." },
          { id: "opcoes-1", x: 0.04, y: 0.44, w: 0.92, title: "Título com palavra-chave", note: "Poppins pesada; a palavra que importa ganha o verde ou uma tarja." },
          { id: "notas-1", x: 0.12, y: 0, w: 0.76, title: "Selo na aba", note: "O logo numa aba escura presa à borda de cima, como etiqueta de caixa." },
          { id: "maes-2", x: 0.3, y: 0.08, w: 0.62, title: "Moldura com canto", note: "O canto chanfrado da caixa do logo vira moldura de foto." },
          { id: "onde-2", x: 0, y: 0.25, w: 1, title: "Etiquetas e pins", note: "Endereços em etiquetas e pins 3D sobre um mapa que atravessa as telas." },
          { id: "esquenta-precos-1", x: 0.33, y: 0.06, w: 0.65, title: "Preço em destaque", note: "Preço antigo e novo em etiquetas tracejadas: o desconto se lê antes do produto." },
        ],
      },
      stories: {
        title: "Stories do <em>dia a dia</em>",
        note: "Produto, aviso e lembrete: os stories avulsos que mantêm a máquina na cabeça de quem está no escritório, da coquinha gelada no almoço ao VR que acabou de cair.",
      },
      screen: {
        title: "Na tela da <em>máquina</em>",
        note: "A vending tem uma tela vertical, e a mesma linguagem chega até ela: a campanha de indicação com o QR code para indicar ali mesmo e uma vinheta de Halloween: “Deu fome? Vai de Smart Box”.",
        spec: "Vídeo 1080 × 1920",
      },
    },
  },
  {
    slug: "deliziare",
    title: "Deliziare",
    client: "Deliziare Massas Artesanais",
    sector: "Alimentação · massas frescas",
    cats: ["web"],
    featured: 2,
    accent: "#2E8B3E",
    summary: "Site de uma casa de massas artesanais de Bauru, com cardápio completo, destaques do mês e pedidos pelo WhatsApp.",
    about: [
      "Desde 2001 a Deliziare prepara massas frescas, molhos, pratos prontos e sobremesas em duas unidades em Bauru. O site precisava abrir o apetite logo na primeira dobra e levar o visitante rapidamente até o pedido.",
      "O layout aposta em fotografia grande de produto, tipografia com toque italiano e um cardápio organizado por categorias. Os botões de pedido levam direto ao WhatsApp e cada unidade tem endereço, horário e rota no mapa.",
    ],
    deliverables: ["UI design", "Cardápio digital", "Integração com WhatsApp", "Versão mobile"],
    tools: ["Figma", "Photoshop", "WordPress"],
    live: "https://deliziare.com.br",
    credit: "Projeto desenvolvido na Olive Comunicação",
  },
  {
    slug: "arie-capital",
    title: "Arie Capital",
    client: "Arie Capital",
    sector: "Mercado financeiro · gestão de investimentos",
    year: "2026",
    cats: ["dev", "web"],
    featured: 3,
    accent: "#F5A524",
    summary: "Implementação pixel-perfect em código do site de uma gestora de investimentos, com animações ao rolar a página.",
    about: [
      "A partir do protótipo aprovado, desenvolvi o site da Arie Capital em código, reproduzindo cada detalhe da interface e construindo as interações entre home, fundos e políticas.",
      "O resultado é um site 100% responsivo, com animações suaves em GSAP que respeitam quem prefere menos movimento, SEO configurado, área de artigos, newsletter, formulário de contato e botão de WhatsApp.",
    ],
    deliverables: ["Implementação pixel-perfect", "Responsividade e versão mobile", "Animações com GSAP", "SEO", "Blog e newsletter", "Formulário de contato"],
    tools: ["HTML", "CSS", "JavaScript", "GSAP", "Vercel"],
  },
  {
    slug: "firework",
    title: "Firework",
    client: "Firework",
    sector: "Tecnologia · produtos digitais",
    cats: ["web"],
    featured: 4,
    accent: "#FF7A1A",
    summary: "Site de uma empresa de produtos digitais com narrativa espacial: do MVP ao escalonamento, como uma missão rumo ao espaço.",
    about: [
      "A Firework se apresenta como o “motor de ignição” para criação de produtos digitais. Transformei essa metáfora em um universo visual: fundo estrelado, astronauta, foguete e uma linha do tempo com as etapas do processo: MVP, validação, produto, go to market e escala.",
      "O projeto contempla sete páginas: home, sobre, construção de produto digital, firesourcing, insights, vagas e contato, todas com o mesmo sistema de componentes e ícones lineares em laranja.",
    ],
    deliverables: ["UI design de 7 páginas", "Sistema de componentes", "Iconografia", "Direção de arte"],
    tools: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    slug: "dor-e-saude",
    title: "Instituto Dor & Saúde",
    client: "Instituto Dor & Saúde",
    sector: "Saúde · dor, ortopedia e regeneração",
    year: "2026",
    cats: ["brand", "print"],
    featured: 5,
    accent: "#1C2D4F",
    summary: "Identidade visual e papelaria institucional para uma clínica especializada em dor, ortopedia e regeneração.",
    about: [
      "Foram desenvolvidas três propostas de marca, cada uma com um conceito (movimento, equilíbrio da coluna e regeneração), sempre com a combinação de azul profundo e dourado para transmitir confiança e cuidado de alto padrão.",
      "Com a marca aprovada, criei a papelaria completa da clínica: cartão de visita, pasta com bolso, bloco de notas, receituário médico, receituário de controle especial e papel timbrado.",
    ],
    deliverables: ["3 propostas de logo", "Paleta e tipografia", "Mockups de aplicação", "Cartão de visita", "Pasta e bloco", "Receituários e timbrado"],
    tools: ["Illustrator", "Photoshop", "InDesign"],
  },
  {
    slug: "ead-plataforma",
    title: "EAD Plataforma",
    client: "EAD Plataforma",
    sector: "Educação · plataforma de cursos online",
    cats: ["web"],
    featured: 6,
    accent: "#8B1FD1",
    summary: "Redesign do site de uma plataforma para hospedar, gerenciar e vender cursos online, feita para infoprodutores e empresas.",
    about: [
      "A EAD Plataforma atende dois públicos bem diferentes: quem vende cursos (infoprodutores) e quem treina equipes (empresas). O novo site separa essas jornadas em páginas dedicadas, com argumentos, recursos e planos para cada perfil.",
      "Partindo de uma primeira versão escura e densa, a v2 ganhou uma linguagem mais clara, com roxo vibrante, prints reais da plataforma, números de resultado e uma página de planos comparativa.",
    ],
    deliverables: ["Home (2 versões)", "Página para infoprodutores", "Página para empresas", "Planos", "Sobre"],
    tools: ["Figma", "Photoshop"],
    live: "https://eadplataforma.com/",
  },
  {
    slug: "oticas-talarico",
    title: "Óticas Talarico",
    client: "Óticas Talarico",
    sector: "Varejo · ótica",
    year: "2024",
    cats: ["brand", "packaging", "print"],
    featured: 7,
    accent: "#1565D8",
    summary: "Manual de marca, papelaria e embalagens de lentes para uma rede de óticas.",
    about: [
      "O manual organiza tudo o que a marca precisa para ser aplicada com consistência: construção do logotipo, área de proteção, paleta em tons de azul, tipografia, versões monocromáticas e os usos corretos e incorretos.",
      "A identidade se estende para sacolas, embrulhos, cartão de visita e para as embalagens das lentes da linha própria, fotografadas em estúdio.",
    ],
    deliverables: ["Manual de marca", "Paleta e tipografia", "Sacolas e embrulhos", "Cartão de visita", "Embalagens de lentes"],
    tools: ["Illustrator", "Photoshop", "InDesign"],
  },
  {
    slug: "conexao-auditiva",
    title: "Conexão Auditiva",
    client: "Conexão Auditiva",
    sector: "Saúde · aparelhos auditivos",
    cats: ["web"],
    featured: 8,
    accent: "#6D2C9E",
    summary: "Site para uma rede de centros auditivos, com conteúdo educativo sobre perda auditiva e zumbido e agendamento de consulta.",
    about: [
      "Muita gente adia o cuidado com a audição por falta de informação. Por isso o site junta páginas comerciais e páginas educativas sobre perda auditiva, zumbido e aparelhos, escritas para uma leitura leve.",
      "A home recebe o visitante com uma saudação direta (“Olá, somos a Conexão Auditiva”), apresenta as unidades e termina em um formulário de agendamento.",
    ],
    deliverables: ["UI design de 6 páginas", "Páginas educativas", "Blog", "Formulário de agendamento"],
    tools: ["Figma", "Photoshop"],
    live: "https://conexaoauditiva.com.br/",
  },

  /* ============================================================ sites no ar */
  {
    slug: "massas-ivai",
    title: "Massas Ivaí",
    client: "Massas Ivaí",
    sector: "Indústria alimentícia · massas para pastel",
    cats: ["web"],
    accent: "#1D3FA8",
    summary: "Site institucional de uma fabricante de massas para pastel, com catálogo de produtos e captação de distribuidores.",
    about: [
      "Fundada em 1995 no Paraná, a Massas Ivaí precisava de um site que mostrasse a linha de produtos e abrisse caminho para novos distribuidores.",
      "O layout usa o azul forte da marca, fotos de pastéis bem servidas, cards de produto por gramatura, um bloco de vantagens e uma chamada clara para “Seja um distribuidor”.",
    ],
    deliverables: ["UI design", "Catálogo de produtos", "Página de distribuidor", "Versão mobile"],
    tools: ["Figma", "Photoshop", "WordPress"],
    live: "https://massasivai.com.br",
    credit: "Projeto desenvolvido na Olive Comunicação",
  },
  {
    slug: "palmont",
    title: "Palmont",
    client: "Palmont Montagem Industrial",
    sector: "Indústria · montagem eletromecânica",
    cats: ["web"],
    accent: "#2B3F6B",
    summary: "Site corporativo de uma empresa de montagem eletromecânica industrial com mais de 20 anos de mercado.",
    about: [
      "O site apresenta serviços, clientes e projetos executados em grandes plantas industriais, com fotografia de obra em destaque e uma navegação pensada para o público B2B.",
      "Além das páginas institucionais, o projeto inclui áreas de trabalhe conosco, responsabilidade e um canal de ouvidoria e denúncias.",
    ],
    deliverables: ["UI design", "Portfólio de projetos", "Vitrine de clientes", "Versão mobile"],
    tools: ["Figma", "Photoshop", "WordPress"],
    live: "https://palmont.com.br",
    credit: "Projeto desenvolvido na Olive Comunicação",
  },
  {
    slug: "cidade-alegre",
    title: "Residencial Cidade Alegre",
    client: "Residencial Cidade Alegre",
    sector: "Mercado imobiliário · loteamento",
    cats: ["web"],
    accent: "#2F9E5B",
    summary: "Landing page de vendas para um residencial em Bauru, com captação de leads, galeria, planta e infraestrutura de lazer.",
    about: [
      "Feita para a última fase de vendas do empreendimento, a página coloca o formulário de interesse já na primeira dobra e conduz o visitante por qualidade, lazer, planta do imóvel e andamento da obra.",
      "O verde da marca guia toda a página, com ícones de infraestrutura e uma faixa de construtoras parceiras que reforça a credibilidade.",
    ],
    deliverables: ["Landing page", "Formulário de leads", "Galeria e planta", "Versão mobile"],
    tools: ["Figma", "Photoshop", "WordPress"],
    live: "https://cidadealegre.com.br",
  },

  /* ============================================================ web design */
  {
    slug: "ecovita",
    title: "Ecovita",
    client: "Ecovita",
    sector: "Mercado imobiliário · empreendimentos",
    cats: ["web"],
    accent: "#22A447",
    summary: "Site e área do cliente para uma empresa de empreendimentos residenciais, com acompanhamento de obra online.",
    about: [
      "Além da vitrine de empreendimentos com busca por cidade, o projeto incluiu a interface da área do cliente, onde o comprador acompanha o andamento da obra, documentos e notícias.",
      "Foram desenhadas duas opções para a área do cliente, para validar com a equipe qual fluxo era mais simples para o morador.",
    ],
    deliverables: ["Home", "Sobre nós", "Área do cliente (2 opções)"],
    tools: ["Figma", "Photoshop"],
    live: "https://ecovitaconstrutora.com.br/",
  },
  {
    slug: "wissence",
    title: "Wissence",
    client: "Clínica Wissence",
    sector: "Saúde · medicina integrativa",
    cats: ["web"],
    accent: "#8C7B6B",
    summary: "Site para uma clínica de cuidado integrativo, com tons neutros, fotografia leve e páginas por especialidade e unidade.",
    about: [
      "A proposta da Wissence é transformar saúde em hábito. A interface acompanha esse tom: paleta areia e marrom, muito respiro, fotografia de movimento e bem-estar.",
      "Foram cinco telas em alta fidelidade: home, landing page, especialidades, unidades e contato.",
    ],
    deliverables: ["UI design de 5 páginas", "Landing page", "Newsletter"],
    tools: ["Figma", "Photoshop"],
  },
  {
    slug: "surgitec",
    title: "Surgitec",
    client: "Surgitec",
    sector: "Saúde · produtos cirúrgicos",
    cats: ["web"],
    accent: "#1A6FD1",
    summary: "Site de uma distribuidora de produtos cirúrgicos, organizado por especialidades médicas.",
    about: [
      "Ortopedia, bucomaxilo, coluna e neuro ganharam cores e entradas próprias logo na home, para quem já sabe o que procura chegar mais rápido.",
      "O projeto tem cinco páginas: home, sobre, especialidades, categoria de produtos e contato com mapa.",
    ],
    deliverables: ["UI design de 5 páginas", "Catálogo por especialidade"],
    tools: ["Figma", "Photoshop"],
    live: "https://www.surgitec.com.br/",
  },
  {
    slug: "valor-med",
    title: "Valor Med",
    client: "Instituto Valor Med",
    sector: "Educação médica · pós-graduação",
    cats: ["web", "brand"],
    accent: "#C9A54B",
    summary: "Landing page de vendas para pós-graduações médicas e marca do Instituto Valor Med.",
    about: [
      "A página de vendas é longa e persuasiva: vídeo de abertura, dores do público, apresentação do professor, grade das pós em Ciência do Metabolismo e Gestão de Clínicas, depoimentos, garantia e chamada de vagas limitadas.",
      "O verde escuro com dourado foi levado também para a marca do instituto, desenvolvida em diferentes versões.",
    ],
    deliverables: ["Landing page de vendas", "Logo do instituto", "Variações de marca"],
    tools: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    slug: "piemonte",
    title: "Residencial Piemonte",
    client: "Residencial Piemonte",
    sector: "Mercado imobiliário · residencial",
    cats: ["web"],
    accent: "#7A1F2B",
    summary: "Landing page de um residencial com plantas, diferenciais do bairro e localização.",
    about: [
      "A página combina o vinho da marca com verdes e texturas florais, apresentando os diferenciais do condomínio, as três opções de planta e tudo o que existe nos arredores.",
    ],
    deliverables: ["Landing page", "Apresentação de plantas", "Formulário de interesse"],
    tools: ["Figma", "Photoshop"],
  },
  {
    slug: "amazonia",
    title: "Plante essa ideia",
    client: "Projeto Amazônia",
    sector: "Meio ambiente · conservação",
    cats: ["web"],
    accent: "#1F7A3A",
    summary: "Site de um projeto de conservação da Amazônia, com adoção de metro quadrado de floresta e crédito de carbono.",
    about: [
      "O site explica visão, missão e ações em andamento, e convida o visitante a participar: adotar um metro quadrado da floresta, plantar uma árvore ou contribuir por diferentes meios.",
      "Recortes orgânicos, fauna da região e muito verde dão o tom de um projeto vivo.",
    ],
    deliverables: ["Home", "Sobre o projeto", "Página de contribuição"],
    tools: ["Figma", "Photoshop"],
  },
  {
    slug: "chocolori",
    title: "Chocolori",
    client: "Chocolori",
    sector: "Alimentação · chocolateria",
    cats: ["web"],
    accent: "#C2185B",
    summary: "Site de uma chocolateria artesanal, com cada linha de produto apresentada como uma vitrine.",
    about: [
      "Trufas, palhas italianas, brownies, pães de mel e alfajores ganharam blocos próprios, com fotografia recortada, títulos expressivos e padrões que remetem a embalagens de doce.",
    ],
    deliverables: ["UI design", "Vitrine de produtos", "Página de eventos e contato"],
    tools: ["Figma", "Photoshop"],
  },
  {
    slug: "vo-cida",
    title: "Vó Cida",
    client: "Vó Cida Residencial",
    sector: "Saúde · cuidado sênior",
    cats: ["web"],
    accent: "#1E9C8B",
    summary: "Site acolhedor para um residencial de cuidado sênior.",
    about: [
      "Verde-água e coral criam uma atmosfera de carinho. A página apresenta o espaço, os serviços (enfermagem, fisioterapia, nutrição, psicologia), as atividades e a localização.",
    ],
    deliverables: ["UI design", "Página de serviços", "Galeria"],
    tools: ["Figma", "Photoshop"],
  },
  {
    slug: "zkr-copos",
    title: "ZKR Copos",
    client: "ZKR Copos",
    sector: "Indústria · copos personalizados",
    cats: ["web"],
    accent: "#0D4FA0",
    summary: "Site para uma fábrica de copos personalizados, com catálogo e orçamento via WhatsApp.",
    about: [
      "Categorias de acrílico, plástico e canecas, destaques de produto e uma chamada forte para orçamento conduzem o visitante do catálogo ao pedido.",
    ],
    deliverables: ["UI design", "Catálogo", "Orçamento via WhatsApp"],
    tools: ["Figma", "Photoshop"],
    live: "https://zkrcopos.com.br/",
  },
  {
    slug: "laura-coube",
    title: "Laura Coube",
    client: "Laura Coube · Psicóloga",
    sector: "Saúde mental · psicoterapia",
    cats: ["web"],
    accent: "#C8A97E",
    summary: "Landing page para uma psicóloga, com linguagem empática e caminho direto para o primeiro contato.",
    about: [
      "A página fala diretamente com quem está passando por um momento difícil (“Você não precisa estar sozinho(a) na dor”) e explica como funcionam as sessões antes de convidar para uma conversa.",
    ],
    deliverables: ["Landing page", "Formulário de contato"],
    tools: ["Figma", "Photoshop"],
  },
  {
    slug: "mpl",
    title: "MPL Seguros",
    client: "MPL Corretora de Seguros",
    sector: "Seguros",
    cats: ["web"],
    accent: "#D7262E",
    summary: "One page de uma corretora de seguros e página dedicada aos corretores parceiros.",
    about: [
      "Busca de seguros logo no topo, cards por tipo de proteção, seguradoras parceiras e um formulário completo de cotação.",
    ],
    deliverables: ["One page", "Página de corretores", "Formulário de cotação"],
    tools: ["Figma", "Photoshop"],
  },
  {
    slug: "sindboss",
    title: "SindBoss",
    client: "SindBoss",
    sector: "Serviços · síndico profissional",
    cats: ["web"],
    accent: "#1257C4",
    summary: "Site de uma empresa de síndico profissional, com números, depoimentos e pedido de orçamento.",
    about: [
      "A página responde de cara à pergunta principal, “por que contratar um síndico profissional?”, e sustenta a resposta com números, depoimentos de moradores e conteúdo em blog.",
    ],
    deliverables: ["UI design", "Blog", "Formulário de orçamento"],
    tools: ["Figma", "Photoshop"],
  },
  {
    slug: "guia-da-cozinha",
    title: "Guia da Cozinha",
    client: "Guia da Cozinha",
    sector: "Mídia · portal de receitas",
    cats: ["web"],
    accent: "#D7262E",
    summary: "Portal de receitas com home editorial, categorias, página de receita e envio de receitas pelos leitores.",
    about: [
      "Um portal de conteúdo precisa ser fácil de navegar e gostoso de ver. O layout organiza receitas por tendências, categorias e destaques, com página de receita pensada para leitura no celular durante o preparo.",
    ],
    deliverables: ["Home", "Categoria", "Página de receita", "Formulário de envio"],
    tools: ["Figma", "Photoshop"],
    live: "https://guiadacozinha.com.br/",
  },
  {
    slug: "taze",
    title: "Taze",
    client: "Taze",
    sector: "Mercado imobiliário · loteamento",
    cats: ["web"],
    accent: "#E3A82B",
    summary: "One page para um loteamento, com vídeo, características do empreendimento e mapa de lotes.",
    about: [
      "Fotografia aérea, recortes arredondados e muito branco apresentam o empreendimento, suas características e o mapa de implantação.",
    ],
    deliverables: ["One page", "Mapa de lotes", "Formulário"],
    tools: ["Figma", "Photoshop"],
  },
  {
    slug: "cidade-agil",
    title: "Cidade Ágil",
    client: "Cidade Ágil Consultoria",
    sector: "Consultoria · tecnologia e gestão",
    cats: ["web"],
    accent: "#1A9A72",
    summary: "Site de dez páginas para uma consultoria de tecnologia, gestão e soluções para o setor público.",
    about: [
      "Consultoria, tecnologia, governança, setor público, inteligência de mercado, contratos e alianças: cada unidade de negócio ganhou uma página própria dentro do mesmo sistema visual, além de carreiras e contato.",
    ],
    deliverables: ["UI design de 10 páginas", "Sistema de componentes"],
    tools: ["Figma", "Photoshop"],
    live: "https://cidadeagil.com.br/",
  },
  {
    slug: "aparecida-macena",
    title: "Aparecida Macena",
    client: "Aparecida Macena Joias",
    sector: "Moda · joias",
    cats: ["web"],
    accent: "#B8955A",
    summary: "E-commerce de joias com pedras brasileiras: home, listagem, página de produto, sobre e contato.",
    about: [
      "Tons dourados, fotografia de produto em fundo claro e uma navegação de loja completa, da coleção ao produto, com newsletter e joias personalizadas.",
    ],
    deliverables: ["Home", "Listagem de produtos", "Página de produto", "Sobre e contato"],
    tools: ["Figma", "Photoshop"],
  },

  /* ============================================================ identidade visual */
  {
    slug: "easywork",
    title: "EasyWork",
    client: "EasyWork Outsourcing",
    sector: "Tecnologia · outsourcing",
    year: "2023",
    cats: ["brand", "web"],
    accent: "#48C972",
    summary: "Marca e site institucional para uma empresa de soluções em aplicativos, sistemas e serviços digitais.",
    about: [
      "Para a EasyWork foram criadas três propostas de logotipo em verde e azul-marinho, com ícones geométricos que funcionam bem em telas pequenas e em aplicações como camisetas, bandeiras e notebooks.",
      "Na sequência, desenhei o site da EasyWork Outsourcing, aplicando a nova identidade.",
    ],
    deliverables: ["3 propostas de logo", "Paleta e ícones", "Mockups", "Site institucional"],
    tools: ["Illustrator", "Photoshop", "Figma", "WordPress"],
  },
  {
    slug: "grasie",
    title: "Grasiê Kids & Teen",
    client: "Grasiê Kids Store",
    sector: "Varejo · moda infantil",
    year: "2023",
    cats: ["brand"],
    accent: "#8971A0",
    summary: "Marca de uma loja de moda infantil e teen cujo nome mistura as duas sócias, Grazi e Simone, em letras infladas e cores pastel.",
    about: [
      "O G do símbolo ganha uma segunda camada em sálvia, e o logotipo usa letras infladas e arredondadas. Lavanda e sálvia em tom pastel deixam a marca leve, sem nada saturado.",
    ],
    deliverables: ["Logotipo", "Símbolo", "Paleta", "Versões de cor"],
    tools: ["Illustrator", "Photoshop"],
  },
  {
    slug: "lifestyle",
    title: "LifeStyle",
    client: "LifeStyle Psicologia",
    sector: "Psicologia e gestão de pessoas",
    year: "2023",
    cats: ["brand", "print"],
    accent: "#E8701A",
    summary: "Identidade visual e papelaria para uma consultoria de psicologia e soluções em gestão de pessoas.",
    about: [
      "Marrom profundo e laranja dão calor à marca, que ganhou um símbolo modular aplicado em pasta, papel timbrado, certificado, assinatura de e-mail e cartão de visita digital.",
    ],
    deliverables: ["Logo", "Paleta", "Pasta e timbrado", "Certificado", "Assinatura de e-mail"],
    tools: ["Illustrator", "Photoshop", "InDesign"],
  },
  {
    slug: "rock-ensina",
    title: "Rock Ensina",
    client: "Rock Ensina",
    sector: "Educação · escola de negócios",
    year: "2024",
    cats: ["brand", "social"],
    accent: "#F5C400",
    summary: "Proposta de identidade visual para redes sociais: princípios, cores, tipografia, grafismos e posts.",
    about: [
      "Os princípios “encontro de gerações, mantendo a essência e referência discreta” guiaram uma paleta vibrante, tipografias Massima e Barlow e um sistema de grafismos e ícones inspirado em capas de disco.",
      "O sistema foi aplicado em posts e carrosséis para mostrar como a marca se comporta no feed.",
    ],
    deliverables: ["Princípios de marca", "Paleta e tipografia", "Grafismos e ícones", "Posts e carrosséis"],
    tools: ["Illustrator", "Photoshop"],
  },
  {
    slug: "confraria",
    title: "Confraria dos Aromas",
    client: "Confraria dos Aromas",
    sector: "Bem-estar · aromas",
    year: "2022",
    cats: ["brand"],
    accent: "#1E6B45",
    summary: "Três caminhos de marca para uma confraria de aromas, do lettering clássico ao símbolo botânico.",
    about: [
      "Lettering com ligaduras, monograma em folha e um selo botânico. Cada proposta foi testada em paletas diferentes e no cartão de visita.",
    ],
    deliverables: ["3 propostas de logo", "Paletas", "Cartão de visita"],
    tools: ["Illustrator"],
  },
  {
    slug: "efpi",
    title: "EFPI",
    client: "EFPI",
    sector: "Educação",
    year: "2021",
    cats: ["brand"],
    accent: "#1C3A6B",
    summary: "Marca para uma instituição de ensino com o conceito “conhecimento que muda o mundo”.",
    about: [
      "Três propostas geométricas (losango, bloco e monograma), apresentadas com variações de cor e aplicação em cartão.",
    ],
    deliverables: ["3 propostas de logo", "Variações de cor"],
    tools: ["Illustrator"],
  },
  {
    slug: "debora-sandrin",
    title: "Débora Sandrin",
    client: "Débora Sandrin · Arquitetura e Urbanismo",
    sector: "Arquitetura e urbanismo",
    year: "2022",
    cats: ["brand"],
    accent: "#79193E",
    summary: "Marca de uma arquiteta e urbanista gaúcha: um D maciço em que o S é o vazio escavado por dentro.",
    about: [
      "Três caminhos apresentados e uma síntese: o monograma do S escavado no D, o vinho e o bordô, um logotipo em romana de inscrição com o A sem travessão e versões vertical e horizontal.",
    ],
    deliverables: ["Monograma", "Logotipo", "Versão horizontal", "Paleta", "Versões de cor"],
    tools: ["Illustrator", "Photoshop"],
  },
  {
    slug: "faggian",
    title: "Faggian Brand",
    client: "Faggian",
    sector: "Moda",
    year: "2022",
    cats: ["brand", "print"],
    accent: "#C8553D",
    summary: "Marca de roupas feitas à mão criada por Giovanna: nome e sobrenome se misturam em Faggian, e o Gi vira o monograma.",
    about: [
      "Uma tipografia de contraste alto com ligaduras próprias e o monograma “Gi” formam a base de uma linha completa de materiais para a marca.",
    ],
    deliverables: ["Logo", "Cartão de visita", "Sacola", "Adesivos e etiquetas", "Cartão digital", "Destaques"],
    tools: ["Illustrator", "Photoshop"],
  },
  {
    slug: "vocs",
    title: "VOC&S",
    client: "VOC&S Psicologia e Desenvolvimento",
    sector: "Psicologia · desenvolvimento humano e organizacional",
    year: "2021",
    cats: ["brand"],
    accent: "#004E88",
    summary: "Marca de duas psicólogas em que o nome se lê vocês: um & em gradiente quente ocupa o lugar do ê.",
    about: [
      "Logotipo em geométrica pesada, com o c espelhado de frente para o o e o & do laranja ao carmim no centro do nome, descritor em grafite e versões de cor.",
    ],
    deliverables: ["Logotipo", "Descritor", "Paleta", "Versões de cor"],
    tools: ["Illustrator", "Photoshop", "PowerPoint"],
  },

  /* ============================================================ social media */
  {
    slug: "sg-importados",
    title: "SG Importados",
    client: "SG Importados",
    sector: "E-commerce · perfumes e decants",
    year: "2026",
    cats: ["social"],
    accent: "#C1121F",
    summary: "Stories, feed e banners de site para as campanhas de uma loja online de perfumes importados e decants.",
    about: [
      "A SG Importados vende perfumes importados e decants pela internet, e cada data do calendário vira campanha: Black Decants, Semana do Consumidor, desconto progressivo de verão e o aniversário da loja.",
      "Cada campanha foi desdobrada nos formatos que a loja usa: stories e feed para o Instagram, banners de home em desktop e mobile e banners de categoria. O frasco é o herói da peça, e o preto e o dourado do logo seguem de uma tela para a outra.",
    ],
    deliverables: ["Stories", "Série de stories", "Post de feed", "Banners de site", "Banners mobile", "Banners de categoria"],
    tools: ["Photoshop", "Illustrator"],
  },
  {
    slug: "cau-pe",
    title: "CAU/PE",
    client: "Conselho de Arquitetura e Urbanismo de Pernambuco",
    sector: "Conselho profissional · arquitetura e urbanismo",
    year: "2026",
    cats: ["social"],
    accent: "#B95000",
    summary: "Nove carrosséis para o Instagram do Conselho de Arquitetura e Urbanismo de Pernambuco: colóquios pelo interior, datas da arquitetura e os prazos que todo profissional precisa saber.",
    about: [
      "O CAU/PE é a autarquia federal que orienta, disciplina e fiscaliza o exercício da arquitetura e do urbanismo em Pernambuco. Criado pela Lei 12.378/2010, tem sede no Recife e escritórios em Caruaru, no Agreste, e em Petrolina, no Sertão. A missão cabe numa frase: promover Arquitetura e Urbanismo para todos.",
      "No Instagram, o conselho fala com dois públicos ao mesmo tempo: os arquitetos e urbanistas registrados, que precisam de prazos e regras claros, e a sociedade, que encontra ali o valor da arquitetura do estado. Desenhei os carrosséis de 2026 para as duas conversas, dos colóquios em Carpina, Caruaru e Petrolina ao registro de chapas das Eleições CAU.",
      "Cada carrossel foi pensado para ser deslizado: uma capa que segura o polegar, uma ideia por tela e um fechamento com a próxima ação. As formas cortadas na borda continuam na tela seguinte, então a sequência se lê como um painel só.",
    ],
    deliverables: ["9 carrosséis de feed", "46 telas em 4:5", "5 vídeos curtos", "Posts de evento e palestrantes", "Campanhas de prazo", "Datas comemorativas"],
    tools: ["Photoshop", "Illustrator", "Firefly"],
    credit: "Projeto realizado com a Apex Comunicação",
    social: {
      profile: "oficialcaupe",
      place: "Pernambuco",
      stats: [
        { n: "9", label: "carrosséis" },
        { n: "46", label: "telas em 4:5" },
        { n: "5", label: "vídeos curtos" },
        { n: "6", label: "cidades no feed" },
      ],
      fronts: [
        { key: "agenda", label: "Agenda", note: "Os eventos do conselho pelo estado: datas, palestrantes e inscrições." },
        { key: "cultura", label: "Cultura", note: "Datas comemorativas e interação, com a arquitetura pernambucana como assunto." },
        { key: "servico", label: "Serviço", note: "Prazos e regras que todo profissional registrado precisa saber." },
      ],
      carousels: [
        {
          key: "travessia", front: "agenda", title: "Colóquio Caruaru e Petrolina", when: "28 ago e 24 set 2026",
          note: "“Arquiteturas em Travessia”: o Sertão visita o Agreste e o Agreste visita o Sertão. A capa traz as duas datas, cada cidade ganha uma abertura com dia, hora e local, e cada palestrante, uma tela com foto, tema e minicurrículo. O fechamento avisa das vagas limitadas e aponta o link da inscrição.",
        },
        {
          key: "caruaru", front: "agenda", title: "Inscrições para o Colóquio Caruaru", when: "Agosto de 2026",
          note: "A primeira chamada do colóquio de Caruaru: três palestras para quem projeta o espaço e a própria carreira. Petróleo e terracota se alternam a cada tela para separar os palestrantes, e a moldura circular do emblema recorta as fotos.",
        },
        {
          key: "save", front: "agenda", title: "Save the date dos colóquios", when: "21 e 28 ago 2026",
          note: "Duas telas para reservar a data antes da programação: Carpina em 21 de agosto e Caruaru em 28. Na capa, a estrela do emblema do CAU/PE vira moldura para o título.",
        },
        {
          key: "patrimonio", front: "cultura", title: "Dia Nacional do Patrimônio Histórico", when: "17 ago 2026",
          note: "Sete telas de fotografia (igrejas, casarões, o farol e o Recife visto do alto) com caixas de texto em terracota e petróleo. O texto avança uma ideia por tela: patrimônio não é só o que é antigo, e preservar não impede a cidade de se transformar.",
        },
        {
          key: "turismo", front: "cultura", title: "Dia Mundial do Turismo", when: "27 set 2026",
          note: "“Que tal conhecer Pernambuco pela arquitetura?” Entre a capa ilustrada e a tela de fechamento, cinco vídeos curtos levam a Olinda, ao Recife, a Porto de Galinhas, ao Alto do Moura, em Caruaru, e a Petrolina.",
        },
        {
          key: "projeto", front: "cultura", title: "Qual é o projeto?", when: "Agosto de 2026",
          note: "Um quiz para movimentar os comentários: a planta colorida de uma obra histórica do Recife, emoldurada por ladrilhos, e o pedido de palpite. Os círculos começam na primeira tela e terminam na segunda.",
        },
        {
          key: "chapas", front: "servico", title: "Eleições CAU 2026: registro de chapas", when: "17 ago a 4 set 2026",
          note: "O regulamento eleitoral em oito telas: período de registro, vagas em disputa, regras de representatividade, quem pode se candidatar e o que é preciso para registrar. Faixas de título em petróleo e grandes círculos conduzem a leitura.",
        },
        {
          key: "prazo", front: "servico", title: "Último dia de registro de chapas", when: "4 set 2026",
          note: "O lembrete da sexta-feira em que o prazo acabava: a chamada sobre uma faixa de ladrilhos, os requisitos para se candidatar e o perfil do CAU/PE apontando o link da bio.",
        },
        {
          key: "anuidade", front: "servico", title: "Anuidade 2026 para Pessoa Jurídica", when: "Agosto de 2026",
          note: "Últimos dias de desconto para empresas: 30% à vista até 31 de agosto e o calendário de parcelamento até dezembro. O arco que nasce na segunda tela termina na terceira.",
        },
      ],
      system: {
        title: "Ladrilhos que viram <em>carrossel</em>",
        note: "Os posts dividem um repertório de módulos quadrados, como azulejos: sol, rosácea, catavento, cubos e a estrela de oito pontas do emblema. Juntos, formam painéis de capa; sozinhos, viram detalhe de canto; cortados na borda, passam de uma tela para a outra.",
        palette: [
          { name: "Petróleo", hex: "#183C46" },
          { name: "Maré", hex: "#006D72" },
          { name: "Céu", hex: "#98C2C8" },
          { name: "Cal", hex: "#FFFBD4" },
          { name: "Areia", hex: "#F2BE79" },
          { name: "Terracota", hex: "#B95000" },
          { name: "Barro", hex: "#731900" },
        ],
        elements: ["Arcos", "Estrela do emblema", "Sol", "Catavento", "Catavento invertido", "Cubos"],
      },
    },
  },
  {
    slug: "mentevitale",
    title: "MenteVitale",
    client: "MenteVitale",
    sector: "Clínica de saúde mental on-line · psicologia e psiquiatria",
    year: "2021 e 2022",
    cats: ["social"],
    accent: "#6B79C4",
    live: "https://mentevitale.com.br/",
    summary: "Nove carrosséis e nove posts para o Instagram da MenteVitale, clínica de psicologia e psiquiatria on-line, do pré-lançamento ao conteúdo de saúde mental.",
    about: [
      "A MenteVitale reúne psicólogos e psiquiatras que atendem on-line. Quando a plataforma estava para nascer, o Instagram tinha duas tarefas: anunciar a chegada e ganhar a confiança de quem nunca fez terapia.",
      "Os posts usam o índigo do logotipo, a onda que sobe do rodapé e ilustrações leves, que deixam temas pesados mais fáceis de ler. Quando o assunto é acolher, entram fotos de gente de verdade.",
      "Primeiro veio a expectativa, com contagem regressiva e a apresentação da plataforma. Depois, o conteúdo: estresse, crise de pânico, ansiedade e cuidados do dia a dia.",
    ],
    deliverables: ["9 carrosséis de feed", "37 telas em 1:1", "9 posts avulsos", "Campanha de lançamento", "Datas comemorativas", "Conteúdo de saúde mental"],
    tools: ["Photoshop", "Illustrator"],
    credit: "Projeto realizado na Olive Marketing e Comunicação",
    social: {
      profile: "mentevitaleoficial",
      place: "Saúde mental on-line",
      avatar: "avatar",
      coverBg: "#525FA3",
      stats: [
        { n: "9", label: "carrosséis" },
        { n: "37", label: "telas em carrossel" },
        { n: "9", label: "posts avulsos" },
      ],
      page: {
        title: "O feed da <em>MenteVitale</em>",
        note: "Todos os posts na grade do perfil. Toque em um para ver as telas.",
        name: "MenteVitale",
        category: "Clínica de saúde mental",
        bio: ["Psicologia e psiquiatria on-line", "Terapia cognitivo-comportamental", "Agende sua consulta pelo site"],
        link: "mentevitale.com.br",
        feed: ["vem-ai", "tres-dias", "reuniao", "funciona", "ajudar", "rotina", "cuidar", "estresse", "panico", "ansiedade", "passos", "enquete", "natal", "ano-novo", "fim-de-ano", "familia", "gratidao", "janeiro-branco"],
        visible: 9,
      },
      fronts: [
        { key: "plataforma", label: "Lançamento", note: "Do aviso de que a plataforma estava chegando ao passo a passo para agendar a primeira consulta." },
        { key: "saude", label: "Saúde mental", note: "Estresse, pânico e ansiedade explicados para quem ainda está decidindo se procura ajuda." },
        { key: "datas", label: "Fim de ano", note: "A virada de 2021 para 2022, quando a saúde mental entra na pauta das festas." },
      ],
      carousels: [
        {
          key: "rotina", front: "plataforma", title: "A rotina está estressante", when: "Pré-lançamento",
          note: "Uma foto panorâmica dividida em duas telas: a pergunta sobre a rotina de um lado, o site da MenteVitale no celular do outro. Deslizar completa a imagem.",
        },
        {
          key: "ajudar", front: "plataforma", title: "Como nossa plataforma pode te ajudar?", when: "Pré-lançamento",
          note: "A moça recortada atravessa a emenda entre as telas e leva a pergunta até a resposta: em breve, consulta e terapia on-line em poucos cliques.",
        },
        {
          key: "funciona", front: "plataforma", title: "Como funciona a plataforma", when: "Lançamento",
          note: "O caminho do paciente em quatro telas, do pré-cadastro à escolha da data, com o site e o e-mail de contato no fechamento.",
        },
        {
          key: "estresse", front: "saude", title: "Estresse: tipos e sintomas", when: "Saúde mental",
          note: "A capa só pergunta “Estresse?”. As telas seguintes explicam os três tipos, cada um com uma ilustração, e a última devolve a pergunta para quem lê.",
        },
        {
          key: "panico", front: "saude", title: "3 dicas para controlar uma crise de pânico", when: "Saúde mental",
          note: "Uma orientação por tela, com frases curtas o bastante para ler no meio de uma crise: cortar a cafeína, respirar no ritmo natural e contar até quatro.",
        },
        {
          key: "ansiedade", front: "saude", title: "3 motivos pelos quais você não consegue lidar com a ansiedade", when: "Saúde mental",
          note: "Três motivos, três retratos em círculo com balões de pensamento e um fechamento que aponta para a consulta on-line.",
        },
        {
          key: "passos", front: "saude", title: "4 passos essenciais para cuidar da saúde mental", when: "Saúde mental",
          note: "Alimentação, sono, menos cobrança e consultas regulares. O cérebro zen da capa continua na tela seguinte e puxa o dedo para o lado.",
        },
        {
          key: "ano-novo", front: "datas", title: "Saúde mental para 2022", when: "Virada do ano",
          note: "Três ideias para começar o ano mais leve, com pingentes de brilho no topo e um brinde no fechamento.",
        },
        {
          key: "fim-de-ano", front: "datas", title: "Síndrome do fim do ano", when: "Dezembro de 2021",
          note: "A ansiedade que cresce no fim do ano em duas telas, do rosto escondido nas mãos ao abraço em si mesma.",
        },
      ],
      singles: {
        title: "Um post, <em>um recado</em>",
        note: "A promessa da marca, a contagem para o lançamento, uma enquete e as datas do ano.",
        list: [
          { key: "cuidar", title: "Cuidar da mente é tão importante quanto cuidar do corpo", when: "Convite para agendar" },
          { key: "vem-ai", title: "Vem aí!", when: "Pré-lançamento" },
          { key: "tres-dias", title: "3 dias para o lançamento da plataforma", when: "Contagem regressiva" },
          { key: "reuniao", title: "Primeira reunião de apresentação da plataforma", when: "Com os profissionais" },
          { key: "enquete", title: "Em qual porcentagem sua saúde mental está atualmente?", when: "Enquete" },
          { key: "familia", title: "Dia Nacional da Família", when: "8 de dezembro" },
          { key: "natal", title: "Feliz Natal", when: "Dezembro" },
          { key: "gratidao", title: "Dia da Gratidão", when: "6 de janeiro" },
          { key: "janeiro-branco", title: "Janeiro Branco", when: "Janeiro" },
        ],
      },
    },
  },
  {
    slug: "lf-servicos-eletricos",
    title: "LF Serviços Elétricos",
    client: "LF Serviços Elétricos",
    sector: "Serviços elétricos e energia solar · Bauru",
    year: "2021 e 2022",
    cats: ["brand", "social"],
    accent: "#FF9D01",
    summary: "Logotipo e 24 posts de Instagram para a LF, empresa de serviços elétricos e energia solar em Bauru.",
    about: [
      "A LF faz instalação e manutenção elétrica para casas, empresas e obras, e instala placas solares em Bauru e região. A marca precisava passar segurança sem cair no clichê do raio amarelo sobre fundo azul.",
      "O símbolo resolve isso com quatro peças e um corte em diagonal: o raio aparece no espaço vazio entre elas. Ao lado, o nome em letras de cantos arredondados e a etiqueta Serviços Elétricos.",
      "Nos posts, o azul-petróleo e o laranja seguram tudo: fotos de obra, a equipe em campo, ofertas de energia solar e as datas do ano, com o logotipo sempre assinando no canto.",
    ],
    deliverables: ["Logotipo e símbolo", "Versão em negativo", "24 posts em 1:1", "Posts de serviços", "Energia solar", "Datas comemorativas"],
    tools: ["Illustrator", "Photoshop"],
    credit: "Projeto realizado na Olive Marketing e Comunicação",
    social: {
      profile: "lfservicoseletricosbauru",
      place: "Bauru e região",
      avatar: "avatar",
      coverBg: "#103E5A",
      coverStyle: "symbol",
      hideIndex: true,
      brand: {
        title: "Um raio feito de <em>vazio</em>",
        note: "O raio não está desenhado: ele surge no corte entre as quatro peças do símbolo. Funciona pequeno, como avatar, e grande, num uniforme ou na lateral de um carro.",
        light: "#F4F5F7",
        dark: "#103E5A",
        palette: [
          { name: "Azul-petróleo", hex: "#103E5A" },
          { name: "Laranja LF", hex: "#FF9D01" },
          { name: "Gelo", hex: "#F4F5F7" },
        ],
      },
      page: {
        title: "O feed da <em>LF</em>",
        note: "Os 24 posts na grade do perfil. Toque em um para ampliar.",
        name: "LF Serviços Elétricos",
        category: "Serviços elétricos",
        bio: ["Instalação e manutenção elétrica", "Energia solar", "Bauru e região"],
        link: "",
        feed: ["quadro","produza","pais","alarme","seguro","bauru126","spda","chame","consumidor","oitenta","instalacao","natal","placas","referencia","cabeamento","meio-ambiente","profissionalismo","infra","ajuda","processo","problemas","encontra","qualidade","profissionais"],
        visible: 9,
      },
      fronts: [],
      carousels: [],
      singles: {
        title: "Obra, equipe e <em>energia solar</em>",
        note: "Quadros montados, para-raios instalados, a equipe em campo, ofertas de placas solares e as datas do ano. Clique em um post para ampliar.",
        list: [
          { key: "quadro", title: "Montagem de quadro de distribuição", when: "Serviços", big: true },
          { key: "alarme", title: "Alarme e comandos de combate a incêndio", when: "Serviços" },
          { key: "seguro", title: "Um trabalho seguro e de qualidade", when: "Equipe" },
          { key: "instalacao", title: "Instalação elétrica especializada", when: "Serviços" },
          { key: "profissionais", title: "Serviços elétricos com profissionalismo e segurança", when: "Equipe" },
          { key: "cabeamento", title: "Troca de cabeamento elétrico", when: "Serviços" },
          { key: "placas", title: "Instalação e manutenção de placas fotovoltaicas", when: "Energia solar" },
          { key: "produza", title: "Produza a sua própria energia", when: "Energia solar", big: true },
          { key: "consumidor", title: "Mês do Consumidor", when: "Energia solar" },
          { key: "infra", title: "Execução de infraestrutura elétrica", when: "Serviços" },
          { key: "oitenta", title: "Mais de 80 serviços em Bauru e região", when: "Equipe", big: true },
          { key: "spda", title: "Sistema de proteção contra descargas atmosféricas", when: "Obra concluída" },
          { key: "problemas", title: "Problemas elétricos não têm hora para acontecer", when: "Serviços" },
          { key: "chame", title: "Sua empresa precisa de instalação ou manutenção?", when: "Equipe" },
          { key: "processo", title: "Processo de instalação: quadro de distribuição geral", when: "Serviços" },
          { key: "qualidade", title: "A qualidade e a segurança que você precisa", when: "Equipe" },
          { key: "ajuda", title: "Precisando de serviços elétricos?", when: "Equipe" },
          { key: "bauru126", title: "126 anos de Bauru", when: "Aniversário da cidade", big: true },
          { key: "referencia", title: "Por que a LF é referência no setor elétrico", when: "Equipe" },
          { key: "encontra", title: "Na LF você encontra tudo isso", when: "Equipe" },
          { key: "profissionalismo", title: "Profissionalismo na LF", when: "Equipe" },
          { key: "meio-ambiente", title: "Dia Mundial do Meio Ambiente", when: "5 de junho" },
          { key: "pais", title: "Dia dos Pais", when: "14 de agosto" },
          { key: "natal", title: "Feliz Natal", when: "Dezembro" },
        ],
      },
    },
  },
  {
    slug: "dedicad",
    title: "Dedicad",
    client: "Welbuda · Dedicad",
    sector: "Suplementos · Amazon EUA",
    year: "2023",
    cats: ["packaging", "social"],
    accent: "#E11D2E",
    summary: "Duas embalagens para a creatina Dedicad, o ensaio de fotos feito para elas e duas galerias de imagens para vender suplementos na Amazon americana.",
    about: [
      "A Welbuda vende suplementos na Amazon dos Estados Unidos com duas marcas, a própria Welbuda e a Dedicad. O pedido começou pela embalagem da creatina Dedicad e foi até o que faz um suplemento vender online: a foto de produto e a galeria de imagens da página.",
      "Para a creatina monohidratada, desenhei duas embalagens, uma vermelha, de impacto, e outra dourada, mais premium, sobre o mesmo pote e a mesma hierarquia, com rótulo, modo de uso e tabela em inglês para o mercado americano.",
      "Com os rótulos prontos, os potes ganharam 19 fotos: as duas versões juntas e cada uma no seu cenário. Para outros dois produtos da casa, o Lions Mane da Welbuda e o Mushroom Coffee da Dedicad, montei duas sequências de sete imagens para a galeria da Amazon e para as redes.",
    ],
    deliverables: ["2 embalagens de creatina", "Rótulos de 206 × 66 mm", "Vistas 3D dos potes", "19 fotos de produto", "2 galerias para a Amazon", "14 imagens 1:1 para listing e redes"],
    tools: ["Illustrator", "Photoshop", "Gemini"],
    product: {
      stats: [
        { n: "2", label: "embalagens" },
        { n: "19", label: "fotos de produto" },
        { n: "2", label: "galerias para a Amazon" },
        { n: "14", label: "imagens de galeria" },
      ],
      packaging: {
        title: "Uma creatina, <em>duas</em> embalagens",
        note: "As duas partem do mesmo pote preto e da mesma hierarquia: o D da Dedicad no topo, CREATINE em caixa alta condensada, Monohydrate em itálico logo abaixo e a dose de 10000 mg em destaque. O que muda é a temperatura da cor e o grafismo de linhas que corta o rótulo.",
        labelSize: "206 × 66 mm",
        versions: [
          {
            key: "red", name: "Vermelha", glow: "#B41919",
            note: "A versão de impacto. O vermelho ocupa a frente inteira, CREATINE vem em branco por cima e um feixe de linhas atravessa o rótulo de ponta a ponta. Os selos de qualidade ficam na lateral, junto da tabela, para a frente falar só de produto e dose.",
            views: ["Frente", "Modo de uso e advertências", "Supplement Facts"],
            palette: [
              { name: "Vermelho", hex: "#B41919" },
              { name: "Grafite", hex: "#2B2B2A" },
              { name: "Prata", hex: "#C4C5C8" },
              { name: "Branco", hex: "#FFFFFF" },
            ],
          },
          {
            key: "gold", name: "Dourada", glow: "#DABB4E",
            note: "A versão premium. Fundo preto, dourado em degradê metálico e as mesmas linhas, agora finas como filetes. Aqui os selos Lab Tested, FDA, GMP e Vegan sobem para a frente do pote, ao lado do Premium Powder.",
            views: ["Frente", "Modo de uso e advertências", "Supplement Facts"],
            palette: [
              { name: "Ouro claro", hex: "#F4E478" },
              { name: "Ouro", hex: "#DABB4E" },
              { name: "Ouro velho", hex: "#BE9937" },
              { name: "Preto", hex: "#1D1D1B" },
            ],
          },
        ],
      },
      photos: {
        title: "Os potes <em>em cena</em>",
        note: "Com os rótulos fechados, os potes ganharam um ensaio criado com IA a partir das embalagens finais: academia, vestiário, quadra, estúdio e explosões de pó. Primeiro as duas versões juntas, depois cada uma no seu cenário.",
        shoots: [
          {
            key: "duo", label: "Juntas",
            note: "Lado a lado, as duas versões se apresentam como uma linha: no banco da academia, no vestiário, na quadra e no meio de uma explosão de pó.",
            rows: [["duo-burst"], ["duo-bench", "duo-lockers"], ["duo-court", "duo-stone"], ["duo-lineup"]],
          },
          {
            key: "red", label: "Só a vermelha",
            note: "Luz dura e cenas de treino pesado: o atleta, a caixa de envio, o pedestal, a mochila e o banco da academia.",
            rows: [["red-athlete", "red-box", "red-flatlay"], ["red-gym", "red-podium", "red-bag"]],
          },
          {
            key: "gold", label: "Só a dourada",
            note: "Luz quente e materiais nobres, como pedra, couro e toalha, para cenas mais editoriais, do vestiário à quadra de tênis.",
            rows: [["gold-stone", "gold-burst", "gold-tote"], ["gold-locker", "gold-court", "gold-pattern"]],
          },
        ],
      },
      campaigns: {
        title: "Galerias para a <em>Amazon</em>",
        note: "Na Amazon, a galeria da página faz o papel do vendedor. Para outros dois produtos da casa, montei duas sequências de sete imagens quadradas que também rodam nas redes: cada imagem tem uma função (chamar, explicar, provar, convencer) e a ordem conta a história.",
        list: [
          {
            key: "lions", brand: "Welbuda", product: "Lions Mane",
            note: "Verde-limão sobre verde-floresta, folhas soltas no ar e o frasco sempre em primeiro plano. A sequência começa pelo produto, abre a fórmula com a dose de cada erva, lista os benefícios, compara a Welbuda com uma marca genérica e fecha com estilo de vida, modo de uso e selos.",
            captions: [
              { t: "Capa", d: "o frasco e a promessa da marca" },
              { t: "Fórmula", d: "as quatro ervas e a dose de cada uma" },
              { t: "Benefícios", d: "força, humor e imunidade em destaque" },
              { t: "Comparativo", d: "Welbuda contra uma marca genérica" },
              { t: "Estilo de vida", d: "o produto na rotina de quem usa" },
              { t: "Modo de uso", d: "cápsulas por frasco, dose e frequência" },
              { t: "Selos", d: "certificações e o que a fórmula não tem" },
            ],
          },
          {
            key: "coffee", brand: "Dedicad", product: "Mushroom Coffee",
            note: "Café torrado, cobre e creme, com grãos e cogumelos voando em volta do pote. Aqui a galeria abre pela confiança, com o laudo de laboratório, e segue para os ingredientes, o preparo, os momentos de consumo, a tabela nutricional e os selos.",
            captions: [
              { t: "Laudo", d: "metais pesados e microbiológico aprovados" },
              { t: "Ingredientes", d: "café arábica e sete cogumelos funcionais" },
              { t: "Preparo", d: "da colher ao copo, em uma cena" },
              { t: "Momento", d: "o café que começa o dia" },
              { t: "Receitas", d: "também gelado, em versão frappé" },
              { t: "Tabela", d: "porções, calorias e rendimento do pote" },
              { t: "Benefícios e selos", d: "foco, energia, imunidade e certificações" },
            ],
          },
        ],
      },
    },
  },

  /* ============================================================ apresentações */
  {
    slug: "todateen",
    title: "TodaTeen & João Bidu",
    client: "TodaTeen · João Bidu",
    sector: "Mídia digital · projetos comerciais",
    year: "2026",
    cats: ["deck"],
    accent: "#E5007E",
    summary: "Apresentações comerciais para projetos de patrocínio de dois grandes portais: Night Run, Papo de Pele, Porsche Cup e mais.",
    about: [
      "Cada deck vende um projeto: corrida TodaTeen Night Run, quadro Papo de Pele, jornada de pilotos na Porsche Cup, ações de Black Friday com João Bidu. Os slides organizam audiência, entregas, cotas de patrocínio e resultados de forma clara e com muita personalidade.",
    ],
    deliverables: ["Apresentações comerciais", "Media kits", "Cotas de patrocínio"],
    tools: ["Figma", "Photoshop"],
  },
];

const A = assets as Record<string, { thumb: { src: string; w: number; h: number } | null; cover?: string | null; items: AssetItem[] }>;

export const cases = list
  .filter((c) => A[c.slug]?.thumb)
  .map((c) => ({ ...c, thumb: A[c.slug].thumb!, cover: A[c.slug].cover ?? null, items: A[c.slug].items }));

export type Case = (typeof cases)[number];

export const featured = cases
  .filter((c) => c.featured)
  .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));

export const countBy = (cat: Category) => cases.filter((c) => c.cats.includes(cat)).length;
