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
}

export interface AssetItem {
  id: string;
  src: string;
  w: number;
  h: number;
  kind: "page" | "mobile" | "slide" | "image" | "post";
  label?: string;
  group?: string;
}

const list: CaseData[] = [
  /* ============================================================ destaque */
  {
    slug: "smartbox",
    title: "Smart Box",
    client: "Smart Box",
    sector: "Varejo autônomo · mini mercados inteligentes",
    year: "2026",
    cats: ["dev", "web", "social", "print"],
    featured: 1,
    accent: "#A6CE39",
    summary: "Site institucional em código, conteúdo para redes sociais e impressos para uma rede de mini mercados autônomos.",
    about: [
      "A Smart Box instala mini mercados inteligentes em empresas, condomínios e academias. O desafio era traduzir uma operação 100% autoatendimento em uma marca próxima, prática e fácil de entender — do primeiro contato no Instagram até o pedido de orçamento no site.",
      "Desenhei e desenvolvi o site do zero em HTML, CSS e JavaScript, com páginas de soluções, quem somos, onde estamos e formulário para empresas. Em paralelo, criei a linha editorial visual das redes — posts, stories, capas de destaque e campanhas sazonais — e o folder comercial impresso.",
    ],
    deliverables: ["UI design do site", "Desenvolvimento front-end", "Formulário de orçamento", "Posts e stories", "Capas de destaque", "Folder impresso"],
    tools: ["Figma", "HTML", "CSS", "JavaScript", "Photoshop", "Illustrator"],
    live: "https://smartboxbr.com.br",
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
      "A partir do protótipo aprovado, desenvolvi o site da Arie Capital em código, reproduzindo cada detalhe da interface e construindo as interações e fluxos entre as páginas — home, fundos e políticas.",
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
      "A Firework se apresenta como o “motor de ignição” para criação de produtos digitais. Transformei essa metáfora em um universo visual: fundo estrelado, astronauta, foguete e uma linha do tempo que acompanha as etapas do processo — MVP, validação, produto, go to market e escala.",
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
      "Foram desenvolvidas três propostas de marca, cada uma com conceito próprio — movimento, equilíbrio da coluna e regeneração — sempre com a combinação de azul profundo e dourado para transmitir confiança e cuidado de alto padrão.",
      "Com a marca aprovada, criei a papelaria completa da clínica: cartão de visita, pasta com bolso, bloco de notas, receituário médico, receituário de controle especial e papel timbrado — “cinco peças, uma só identidade”.",
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
    summary: "Redesign do site de uma plataforma para hospedar, gerenciar e vender cursos online — para infoprodutores e empresas.",
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
      "Muita gente adia o cuidado com a audição por falta de informação. Por isso o site combina páginas comerciais com páginas educativas — perda auditiva, zumbido e aparelhos — escritas e diagramadas para leitura leve.",
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
      "Foram cinco telas em alta fidelidade — home, landing page, especialidades, unidades e contato.",
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
      "As especialidades — ortopedia, bucomaxilo, coluna e neuro — ganharam cores e entradas próprias logo na home, facilitando a navegação de quem já sabe o que procura.",
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
      "A página responde de cara à pergunta principal — “por que contratar um síndico profissional?” — e sustenta a resposta com números, depoimentos de moradores e conteúdo em blog.",
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
      "Cada unidade de negócio — consultoria, tecnologia, governança, setor público, inteligência de mercado, contratos e alianças — ganhou uma página própria dentro de um mesmo sistema visual, além de carreiras e contato.",
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
      "Tons dourados, fotografia de produto em fundo claro e uma navegação de loja virtual completa — da coleção ao produto, com newsletter e joias personalizadas.",
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
    slug: "hu-ufnt",
    title: "HU UFNT",
    client: "Hospital Universitário da UFNT",
    sector: "Saúde · hospital universitário",
    year: "2026",
    cats: ["brand"],
    accent: "#1E8F4E",
    summary: "Desenvolvimento de marca para um hospital universitário, com sete caminhos e aplicações em jaleco, crachá e papelaria.",
    about: [
      "Foram apresentadas sete opções de marca, cada uma com versões vertical e horizontal e um painel de aplicações — jalecos, crachás, uniformes, sinalização, papelaria e telas — para facilitar a decisão.",
    ],
    deliverables: ["7 propostas de marca", "Versões e variações", "Painéis de aplicação"],
    tools: ["Illustrator", "Photoshop"],
    credit: "Projeto realizado com a Apex Comunicação",
  },
  {
    slug: "royal-lash",
    title: "Congresso Royal Lash",
    client: "Rainha do Lash · Studio Xavier",
    sector: "Beleza · eventos",
    cats: ["brand"],
    accent: "#C9A24A",
    summary: "Marca para um congresso de extensão de cílios, em dourado, com três propostas e aplicação em credencial.",
    about: [
      "Coroa, cílios e tipografia elegante em dourado: cada proposta trouxe uma forma diferente de traduzir o lado “royal” do evento, testada na credencial dos participantes.",
    ],
    deliverables: ["3 propostas de logo", "Credencial", "Variações"],
    tools: ["Illustrator", "Photoshop"],
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
    slug: "reputation-architecture",
    title: "Reputation Architecture",
    client: "Manuella Borges",
    sector: "Comunicação e posicionamento",
    cats: ["brand"],
    accent: "#1C2B6B",
    summary: "Identidade visual para uma consultoria de reputação e posicionamento.",
    about: [
      "O símbolo une as iniciais R e A em uma forma de construção — reputação como algo que se ergue. Azul-marinho, rosa e dourado, tipografias Eurostile e Raleway e aplicações em assinatura de e-mail, caneca e ecobag.",
    ],
    deliverables: ["Logo", "Paleta e tipografia", "Mockups de aplicação"],
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
      "Lettering com ligaduras, monograma em folha e um selo botânico — cada proposta foi testada em diferentes paletas e em cartão de visita.",
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
      "Três propostas geométricas — losango, bloco e monograma — apresentadas com variações de cor e aplicação em cartão.",
    ],
    deliverables: ["3 propostas de logo", "Variações de cor"],
    tools: ["Illustrator"],
  },
  {
    slug: "debora-sandrin",
    title: "Débora Sandrin",
    client: "Débora Sandrin · Arquitetura e Urbanismo",
    sector: "Arquitetura",
    year: "2022",
    cats: ["brand"],
    accent: "#8A1E3C",
    summary: "Logotipo para uma arquiteta e urbanista, com monogramas e paletas apresentados em contexto de projeto.",
    about: [
      "Monogramas construídos a partir das iniciais D e S, combinados com uma tipografia elegante e paletas terrosas, testados sobre pranchas e maquetes.",
    ],
    deliverables: ["Propostas de logo", "Paletas", "Mockups"],
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
    summary: "Lettering para uma marca de roupas feitas à mão: a linha sai do i, contorna o G e vira o monograma Gi.",
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
    summary: "Campanhas para redes sociais e banners de e-commerce de uma loja de perfumes importados.",
    about: [
      "Black Decants, Semana do Consumidor, aniversário da loja e desconto progressivo: cada campanha ganhou feed, stories e banners de site (desktop e mobile), sempre com o frasco como herói da peça.",
    ],
    deliverables: ["Posts de feed", "Stories", "Banners de site", "Banners mobile"],
    tools: ["Photoshop", "Illustrator"],
  },
  {
    slug: "cau-pe",
    title: "CAU/PE",
    client: "Conselho de Arquitetura e Urbanismo de Pernambuco",
    sector: "Conselho profissional",
    year: "2026",
    cats: ["social"],
    accent: "#E06A2C",
    summary: "Carrosséis para o Instagram do CAU/PE: colóquios, datas comemorativas e campanhas.",
    about: [
      "Patrimônio histórico, turismo, colóquios e o save the date da conferência regional — os carrosséis misturam fotografia de arquitetura pernambucana, cores quentes e tipografia de impacto.",
    ],
    deliverables: ["Carrosséis", "Posts de evento", "Save the date"],
    tools: ["Photoshop", "Illustrator", "Firefly"],
    credit: "Projeto realizado com a Apex Comunicação",
  },
  {
    slug: "dedicad",
    title: "Dedicad",
    client: "Dedicad · Welbuda",
    sector: "Suplementos",
    year: "2023",
    cats: ["packaging", "social"],
    accent: "#E11D2E",
    summary: "Rótulos de creatina em duas versões e posts para uma linha de suplementos.",
    about: [
      "Duas direções de rótulo para a creatina Dedicad — vermelha e dourada — com mockups em 3D, além de peças de social media para a linha Welbuda.",
    ],
    deliverables: ["Rótulos de embalagem", "Mockups 3D", "Posts"],
    tools: ["Illustrator", "Photoshop"],
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
  {
    slug: "mgk",
    title: "Código de Ética MGK",
    client: "MGK",
    sector: "Corporativo",
    year: "2023",
    cats: ["deck"],
    accent: "#8B1E3F",
    summary: "Diagramação de e-book do código de ética de uma empresa, com ilustrações e hierarquia clara.",
    about: [
      "Um documento extenso virou leitura agradável: capa marcante, ícones, ilustrações e uma hierarquia de títulos que facilita encontrar cada tema.",
    ],
    deliverables: ["Diagramação editorial", "Capa", "Ícones e ilustrações"],
    tools: ["Illustrator", "InDesign"],
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
