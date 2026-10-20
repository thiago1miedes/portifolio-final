// Mapa de origem das imagens de cada case.
// - Caminhos começando com "shots/" vêm de sources/shots (prints dos sites no ar).
// - Os demais são relativos à pasta Freelancer (SRC).
// - PDFs: `pages` define quais páginas renderizar (1 = primeira). Sem `pages`, só a 1ª.
// kinds: page (página inteira de site, 1440px) · mobile (print de celular) ·
//        slide (16:9, 1600px) · image (até 1600px) · post (até 1080px)
export const SRC = "F:/Freelancer";

const W = "Websites";
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

export const cases = {
  /* ---------------------------------------------------------------- sites no ar */
  deliziare: {
    thumb: { from: "live" },
    items: [
      { id: "live", src: "shots/deliziare-desktop.webp", kind: "page", label: "Site no ar" },
      { id: "layout", src: `${W}/Deliziare/Deliziare - WebSite.pdf`, kind: "page", label: "Layout · Home" },
    ],
  },
  "massas-ivai": {
    thumb: { from: "live" },
    items: [
      { id: "live", src: "shots/massasivai-desktop.webp", kind: "page", label: "Home" },
      { id: "mobile", src: "shots/massasivai-mobile.webp", kind: "mobile" },
    ],
  },
  palmont: {
    thumb: { from: "live" },
    items: [
      { id: "live", src: "shots/palmont-desktop.webp", kind: "page", label: "Home" },
      { id: "mobile", src: "shots/palmont-mobile.webp", kind: "mobile" },
    ],
  },
  "cidade-alegre": {
    thumb: { from: "live" },
    items: [
      { id: "live", src: "shots/cidadealegre-desktop.webp", kind: "page", label: "Landing page" },
      { id: "mobile", src: "shots/cidadealegre-mobile.webp", kind: "mobile" },
    ],
  },

  /* ---------------------------------------------------------------- design + código */
  "arie-capital": {
    thumb: { from: "home" },
    items: [
      { id: "home", src: "shots/arie-desktop.webp", kind: "page", label: "Home" },
      { id: "fundos", src: "shots/arie-fundos-desktop.webp", kind: "page", label: "Fundos" },
      { id: "mobile", src: "shots/arie-mobile.webp", kind: "mobile" },
      { id: "mobile-fundos", src: "shots/arie-fundos-mobile.webp", kind: "mobile" },
    ],
  },
  smartbox: {
    thumb: { from: "live" },
    items: [
      { id: "live", src: "shots/smartbox-desktop.webp", kind: "page", label: "Home" },
      { id: "mobile", src: "shots/smartbox-mobile.webp", kind: "mobile" },
      ...[
        "AgostoInfinito/smartbox_AgostoInfinito_insta.png",
        "Bold Whey/SmartBox_BOLDWHEY_insta_v1.png",
        "Coca Gelada/SmartBox_CocaGelada_insta_v1.png",
        "Beneficio/SmartBox_beneficio_insta.png",
        "Copa do mundo/SmartBox_CopaDoMundo_insta.png",
        "Empresas/SmartBox_Empresas_insta_v1.png",
        "Foco/SmartBox_Foco_insta_v1.png",
        "Pascoa/SmartBox_Pascoa_insta_v1.png",
        "YoPro Bold/SmartBox_YoproBold_insta_v1.png",
        "Coca Gelada/SmartBox_docinho_insta_v1.png",
        "Salgadinhos/SmartBox_salgadinhos_insta.png",
        "Onde Estamos/SmartBox_OndeEstamos_insta_v1.png",
      ].map((p, i) => ({ id: `post-${i + 1}`, src: `SmartBox/Social Media/${p}`, kind: "post", group: "social" })),
      ...[
        "AgostoInfinito/smartbox_AgostoInfinito_story_01.png",
        "Bold Whey/SmartBox_BOLDWHEY_story.png",
        "Coca Gelada/SmartBox_CocaGelada_story.png",
        "Energéticos/SmartBox_Energeticos_story.png",
        "Pascoa/SmartBox_Pascoa_story_op1.png",
        "Cartão VR/SmartBox_VR_story.png",
      ].map((p, i) => ({ id: `story-${i + 1}`, src: `SmartBox/Social Media/${p}`, kind: "post", group: "stories" })),
      { id: "folder-1", src: "SmartBox/Impressos/Smartbox_folder_v1-01.png", kind: "image", group: "print" },
      { id: "folder-2", src: "SmartBox/Impressos/Smartbox_folder_v1-02.png", kind: "image", group: "print" },
    ],
  },

  /* ---------------------------------------------------------------- web design (Figma) */
  firework: {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/FireWork/Firework - Home.pdf`, kind: "page", label: "Home" },
      { id: "sobre", src: `${W}/FireWork/Firework - Sobre a Fire v02.pdf`, kind: "page", label: "Sobre a Fire" },
      { id: "produto", src: `${W}/FireWork/Firework - Construção de produto digital.pdf`, kind: "page", label: "Produto digital" },
      { id: "firesourcing", src: `${W}/FireWork/Firework - Firesourcing.pdf`, kind: "page", label: "Firesourcing" },
      { id: "insights", src: `${W}/FireWork/Firework - Insights.pdf`, kind: "page", label: "Insights" },
      { id: "vagas", src: `${W}/FireWork/Firework - Vagas.pdf`, kind: "page", label: "Vagas" },
      { id: "contato", src: `${W}/FireWork/Firework - Contato.pdf`, kind: "page", label: "Contato" },
    ],
  },
  "ead-plataforma": {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/Site ead plataforma/v2/EAD Plataforma - New site.pdf`, kind: "page", label: "Home" },
      { id: "infoprodutores", src: `${W}/Site ead plataforma/v2/EAD Plataforma - Página Infoprodutores.pdf`, kind: "page", label: "Infoprodutores" },
      { id: "empresas", src: `${W}/Site ead plataforma/v2/EAD Plataforma - Página para Empresas.pdf`, kind: "page", label: "Empresas" },
      { id: "planos", src: `${W}/Site ead plataforma/v2/EAD Plataforma - Página planos.pdf`, kind: "page", label: "Planos" },
      { id: "sobre", src: `${W}/Site ead plataforma/v2/EAD Plataforma - Página sobre.pdf`, kind: "page", label: "Sobre" },
      { id: "v1", src: `${W}/Site ead plataforma/v1/Página principal - v1.pdf`, kind: "page", label: "Home · versão 1" },
    ],
  },
  "conexao-auditiva": {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/Conexão auditiva/Página inicial.pdf`, kind: "page", label: "Home" },
      { id: "sobre", src: `${W}/Conexão auditiva/Sobre nós.pdf`, kind: "page", label: "Sobre nós" },
      { id: "aparelhos", src: `${W}/Conexão auditiva/Aparelhos auditivos.pdf`, kind: "page", label: "Aparelhos auditivos" },
      { id: "perda", src: `${W}/Conexão auditiva/Perda auditiva.pdf`, kind: "page", label: "Perda auditiva" },
      { id: "zumbido", src: `${W}/Conexão auditiva/Zumbido.pdf`, kind: "page", label: "Zumbido" },
      { id: "blog", src: `${W}/Conexão auditiva/Blog.pdf`, kind: "page", label: "Blog" },
    ],
  },
  ecovita: {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/Ecovita/Ecovita - Página principal - op1.pdf`, kind: "page", label: "Home" },
      { id: "sobre", src: `${W}/Ecovita/Ecovita - UI Design - sobre nós - op1.pdf`, kind: "page", label: "Sobre nós" },
      { id: "cliente-1", src: `${W}/Ecovita/Ecovita - UI Design - Área do Cliente - opção 1.pdf`, kind: "page", label: "Área do cliente · A" },
      { id: "cliente-2", src: `${W}/Ecovita/Ecovita - UI Design - Área do Cliente - opção 2.pdf`, kind: "page", label: "Área do cliente · B" },
    ],
  },
  wissence: {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/Wissence/HighFidelity - Página principal.pdf`, kind: "page", label: "Home" },
      { id: "landing", src: `${W}/Wissence/HighFidelity - Landing page.pdf`, kind: "page", label: "Landing page" },
      { id: "especialidades", src: `${W}/Wissence/HighFidelity - Página de Especialidades.pdf`, kind: "page", label: "Especialidades" },
      { id: "unidades", src: `${W}/Wissence/HighFidelity - Página das Unidades.pdf`, kind: "page", label: "Unidades" },
      { id: "contato", src: `${W}/Wissence/HighFidelity - Página de Contato.pdf`, kind: "page", label: "Contato" },
    ],
  },
  surgitec: {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/Surgitec/Surgitec - Home.pdf`, kind: "page", label: "Home" },
      { id: "sobre", src: `${W}/Surgitec/Surgitec - Sobre.pdf`, kind: "page", label: "Sobre" },
      { id: "especialidades", src: `${W}/Surgitec/Surgitec - Especialidades.pdf`, kind: "page", label: "Especialidades" },
      { id: "produtos", src: `${W}/Surgitec/Surgitec - Categoria Produtos.pdf`, kind: "page", label: "Produtos" },
      { id: "contato", src: `${W}/Surgitec/Surgitec - Contato.pdf`, kind: "page", label: "Contato" },
    ],
  },
  "valor-med": {
    thumb: { from: "landing" },
    items: [
      { id: "landing", src: `${W}/Valor Med/LandingPage Valor Med.pdf`, kind: "page", label: "Landing page" },
      ...range(1, 6).map((n) => ({ id: `logo-${n}`, src: `Wissense/ValorMed/INSTITUTO VALOR MED/logo-instituto-valormed-0${n}.jpg`, kind: "image", group: "brand" })),
    ],
  },
  piemonte: {
    thumb: { from: "landing" },
    items: [{ id: "landing", src: `${W}/Piemonte/Piemonte - op2 - Landing page.pdf`, kind: "page", label: "Landing page" }],
  },
  amazonia: {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/Web site amazonia/Página principal.pdf`, kind: "page", label: "Home" },
      { id: "sobre", src: `${W}/Web site amazonia/Sobre o projeto.pdf`, kind: "page", label: "Sobre o projeto" },
      { id: "plante", src: `${W}/Web site amazonia/PÁGINA PLANTE ESSA IDEIA.pdf`, kind: "page", label: "Plante essa ideia" },
    ],
  },
  chocolori: {
    thumb: { from: "home" },
    items: [{ id: "home", src: `${W}/Chocolori/Chocolori - Website.pdf`, kind: "page", label: "Home" }],
  },
  "vo-cida": {
    thumb: { from: "home" },
    items: [{ id: "home", src: `${W}/Vó Cida/Vó Cida - High Fidelity.pdf`, kind: "page", label: "Home" }],
  },
  "zkr-copos": {
    thumb: { from: "home" },
    items: [{ id: "home", src: `${W}/ZKR Copos/ZKR Copos.pdf`, kind: "page", label: "Home" }],
  },
  "laura-coube": {
    thumb: { from: "landing" },
    items: [{ id: "landing", src: `${W}/Laura Coube/Laura Coube - Landing Page.pdf`, kind: "page", label: "Landing page" }],
  },
  mpl: {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/MPL/MPL - One Page.pdf`, kind: "page", label: "One page" },
      { id: "corretores", src: `${W}/MPL/MPL - Corretores.pdf`, kind: "page", label: "Corretores" },
    ],
  },
  sindboss: {
    thumb: { from: "home" },
    items: [{ id: "home", src: `${W}/SindBoss/SindBoss - WebSite.pdf`, kind: "page", label: "Home" }],
  },
  "guia-da-cozinha": {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/Guia da Cozinha/HighFidelity - Principal - v2.pdf`, kind: "page", label: "Home" },
      { id: "categoria", src: `${W}/Guia da Cozinha/HighFidelity - Categoria - v2.pdf`, kind: "page", label: "Categoria" },
      { id: "receita", src: `${W}/Guia da Cozinha/Página Receita v03.pdf`, kind: "page", label: "Receita" },
      { id: "envio", src: `${W}/Guia da Cozinha/Página - formulario - Receitas.pdf`, kind: "page", label: "Envie sua receita" },
    ],
  },
  taze: {
    thumb: { from: "home" },
    items: [{ id: "home", src: `${W}/Taze/Taze - One page.pdf`, kind: "page", label: "One page" }],
  },
  "cidade-agil": {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/Cidade Agil/Página principal-hf-v01.pdf`, kind: "page", label: "Home" },
      { id: "consultoria", src: `${W}/Cidade Agil/Consultoria Empresarial Estratégica e Jurídica-hf-v01.pdf`, kind: "page", label: "Consultoria" },
      { id: "tecnologia", src: `${W}/Cidade Agil/Tecnologia e Aplicações-hf-v01.pdf`, kind: "page", label: "Tecnologia" },
      { id: "governanca", src: `${W}/Cidade Agil/Governança e GMO-hf-v01.pdf`, kind: "page", label: "Governança" },
      { id: "setor-publico", src: `${W}/Cidade Agil/Setor Público e HUB Soluções-hf-v01.pdf`, kind: "page", label: "Setor público" },
      { id: "inteligencia", src: `${W}/Cidade Agil/inteligencia-mercado-operacoes-hf-v01.pdf`, kind: "page", label: "Inteligência de mercado" },
      { id: "contratos", src: `${W}/Cidade Agil/Gestão de Contratos-hf-v01.pdf`, kind: "page", label: "Gestão de contratos" },
      { id: "aliancas", src: `${W}/Cidade Agil/Alianças Estratégicas-hf-v01.pdf`, kind: "page", label: "Alianças" },
      { id: "carreiras", src: `${W}/Cidade Agil/Carreiras-hf-v01.pdf`, kind: "page", label: "Carreiras" },
      { id: "contato", src: `${W}/Cidade Agil/Contato-hf-v01.pdf`, kind: "page", label: "Contato" },
    ],
  },
  "aparecida-macena": {
    thumb: { from: "home" },
    items: [
      { id: "home", src: `${W}/Aparecida Macena/Inicio.pdf`, kind: "page", label: "Home" },
      { id: "produtos", src: `${W}/Aparecida Macena/Listagem de produtos.pdf`, kind: "page", label: "Produtos" },
      { id: "produto", src: `${W}/Aparecida Macena/Página do produto.pdf`, kind: "page", label: "Produto" },
      { id: "sobre", src: `${W}/Aparecida Macena/Sobre.pdf`, kind: "page", label: "Sobre" },
      { id: "contato", src: `${W}/Aparecida Macena/Contato.pdf`, kind: "page", label: "Contato" },
    ],
  },

  /* ---------------------------------------------------------------- identidade visual */
  "dor-e-saude": {
    thumb: { from: "mock-cartao", crop: "center" },
    items: [
      { id: "logo", src: "Dor&Saúde/Apresentação_dor_e_saude.pdf", kind: "slide", pages: [2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 18, 19, 20] },
      { id: "papelaria", src: "Dor&Saúde/Papelaria/Dor-e-Saude_Papelaria_Apresentacao.pdf", kind: "slide", pages: range(1, 7) },
      { id: "mock-cartao", src: "Dor&Saúde/Papelaria/Mockup/Mockup_cartão_visita.png", kind: "image" },
      { id: "mock-envelope", src: "Dor&Saúde/Papelaria/Mockup/Mockup_Envelope.png", kind: "image" },
      { id: "mock-bloco", src: "Dor&Saúde/Papelaria/Mockup/Mockup_bloco_de_notas.png", kind: "image" },
      { id: "mock-receituario", src: "Dor&Saúde/Papelaria/Mockup/Mockup_receituario_medico.png", kind: "image" },
    ],
  },
  "oticas-talarico": {
    thumb: { from: "manual-01" },
    items: [
      { id: "manual", src: `${W}/Otica Talarico/1-exported-by-super-pdf.pdf`, kind: "slide", pages: range(1, 14) },
      { id: "foto-1", src: "Oticas Talarico/Fotos/DSC06208.JPG", kind: "image", group: "packaging" },
      { id: "foto-2", src: "Oticas Talarico/Fotos/DSC06465.JPG", kind: "image", group: "packaging" },
      { id: "foto-3", src: "Oticas Talarico/Fotos/DSC06530.JPG", kind: "image", group: "packaging" },
      { id: "foto-4", src: "Oticas Talarico/Imagens/imagem-lente-copiar_0000_Agrupar-23.png", kind: "image", group: "packaging" },
    ],
  },
  easywork: {
    thumb: { from: "mock-01", crop: "center" },
    items: [
      ...range(1, 12).map((n) => ({ id: `mock-${String(n).padStart(2, "0")}`, src: `Easy/img-final-${String(n).padStart(2, "0")}.jpg`, kind: "image" })),
      { id: "logo", src: "Easy/apresentação-logo-Easy-v1(jun23).pdf", kind: "slide", pages: [2, 3, 5, 6, 9, 12, 13, 16, 19, 20] },
      { id: "site-home", src: "Easy/Prints Site/screencapture-easyworkoutsourcing-2023-08-02-16_22_51.png", kind: "page", label: "EasyWork · Home" },
      { id: "site-servicos", src: "Easy/Prints Site/screencapture-easyworkoutsourcing-services-2023-08-02-16_23_27.png", kind: "page", label: "EasyWork · Serviços" },
      { id: "site-sobre", src: "Easy/Prints Site/screencapture-easyworkoutsourcing-aboutus-2023-08-02-16_23_16.png", kind: "page", label: "EasyWork · Sobre" },
      { id: "site-contato", src: "Easy/Prints Site/screencapture-easyworkoutsourcing-contact-2023-08-02-16_23_42.png", kind: "page", label: "EasyWork · Contato" },
      { id: "site-directories", src: "Easy/Prints Site/screencapture-easydirectories-2023-08-02-16_23_56.png", kind: "page", label: "Easy Directories" },
    ],
  },
  grasie: {
    thumb: { from: "logo-07" },
    items: [
      { id: "logo", src: "Grasie Kids Store/Apresentação_logo_grasie(set23).pdf", kind: "slide", pages: range(2, 19) },
      { id: "app", src: "Grasie Kids Store/app-papelaria-v3.pdf", kind: "slide", pages: [1, 2, 3] },
      { id: "sacola", src: "Grasie Kids Store/136.jpg", kind: "image" },
    ],
  },
  lifestyle: {
    thumb: { from: "idv-09" },
    items: [
      { id: "idv", src: "LifeStyle/Apresentação_IDV_lifestyle_v1(jul23).pdf", kind: "slide", pages: range(2, 9) },
      { id: "papelaria-1", src: "LifeStyle/img-papelaria-v1.jpg", kind: "image" },
      { id: "papelaria-2", src: "LifeStyle/img-papelaria-v2-p1.jpg", kind: "image" },
      { id: "papelaria-3", src: "LifeStyle/img-papelaria-v3-p1.jpg", kind: "image" },
    ],
  },
  "hu-ufnt": {
    thumb: { from: "mock-01", crop: "center" },
    items: [
      { id: "apresentacao", src: "Apex Comunicação/Apresentação logo HU/Apresentação_HuUFNT_apex.pdf", kind: "slide", pages: range(1, 16) },
      ...range(1, 8).map((n) => ({ id: `mock-0${n}`, src: `Apex Comunicação/Apresentação logo HU/mockups_0${n}.png`, kind: "image" })),
    ],
  },
  "royal-lash": {
    thumb: { from: "logo-05" },
    items: [{ id: "logo", src: "RainhaDoLash_StudioXavier/Congresso-royal-lash/RainhaDoLash_logo-congresso-apresentação-v2.pdf", kind: "slide", pages: range(2, 10) }],
  },
  "rock-ensina": {
    thumb: { from: "id-09" },
    items: [{ id: "id", src: "Rockensina/Proposta Id Visual/202412_Slides_Proposta_IdVisual_Rock_Ensina.pdf", kind: "slide", pages: range(1, 15) }],
  },
  "reputation-architecture": {
    thumb: { from: "id-03" },
    items: [{ id: "id", src: "Reputation Architeture/_Apresentação identidade - MANU BORGES.pdf", kind: "slide", pages: range(1, 8) }],
  },
  // A capa (thumb.webp) vem de `npm run brand -- confraria thumb` (logo final); rodar `npm run assets -- confraria` a sobrescreve.
  confraria: {
    thumb: { from: "logo-04" },
    items: [{ id: "logo", src: "ConfrariaDosAromas/Confraria_Logo_apresentação.pdf", kind: "slide", pages: range(2, 10) }],
  },
  // A capa (thumb.webp) deste case foi trocada à mão pelo logo final; rodar `npm run assets -- efpi` a sobrescreve.
  efpi: {
    thumb: { from: "logo-02" },
    items: [{ id: "logo", src: "EFPI/EFPI_logo_apresentação(out21).pdf", kind: "slide", pages: range(1, 9) }],
  },
  "debora-sandrin": {
    thumb: { from: "logo-06" },
    items: [{ id: "logo", src: "DeboraSandrin/Logo_DeboraSandrin.pdf", kind: "slide", pages: range(2, 10) }],
  },
  faggian: {
    thumb: { from: "sacola", crop: "center" },
    items: [
      { id: "logo-1", src: "Faggian/ArquivosTecnicos/Logo/JPG/Faggian_logo_op1.jpg", kind: "image" },
      { id: "sacola", src: "Faggian/ArquivosTecnicos/Sacola/JPG/faggian_sacola.jpg", kind: "image" },
      { id: "cartao-frente", src: "Faggian/ArquivosTecnicos/CartãoDeVisitas/JPG/faggian_cartaodevisitas_Frente.jpg", kind: "image" },
      { id: "cartao-verso", src: "Faggian/ArquivosTecnicos/CartãoDeVisitas/JPG/faggian_cartaodevisitas_Verso.jpg", kind: "image" },
      { id: "adesivo-1", src: "Faggian/ArquivosTecnicos/Adesivos/JPG/faggian_adesivo_op01.jpg", kind: "image" },
      { id: "etiqueta-1", src: "Faggian/ArquivosTecnicos/Etiqueta/JPG/faggian_cartaodevisitas_op01-05.jpg", kind: "image" },
      { id: "digital-1", src: "Faggian/ArquivosTecnicos/CartãoDigital/JPG/faggian_cartãodigital_op01.jpg", kind: "image" },
      { id: "destaque-1", src: "Faggian/Destaques/Imagens/faggian_destaque_GI.png", kind: "post" },
      { id: "destaque-2", src: "Faggian/Destaques/Imagens/faggian_destaque_coração.png", kind: "post" },
      { id: "destaque-3", src: "Faggian/Destaques/Imagens/faggian_destaque_guardaroupa.png", kind: "post" },
    ],
  },
  vocs: {
    thumb: { from: "cartao-frente", crop: "center" },
    items: [
      { id: "cartao-frente", src: "VOC&S/Cartão de Visistas/JPG/Voc&s_CartãoDeVisitas_Frente.jpg", kind: "image" },
      { id: "cartao-verso", src: "VOC&S/Cartão de Visistas/JPG/Voc&s_CartãoDeVisitas_Verso Claudia.jpg", kind: "image" },
      { id: "certificado", src: "VOC&S/Certificado/JPG/Voc&s_Certificado_Frente.jpg", kind: "image" },
      { id: "cartao-digital", src: "VOC&S/Cartão virtual/JPG/Voc&s_CartãoDigital.jpg", kind: "image" },
      { id: "assinatura", src: "VOC&S/Assinatura de Email/JPG/Voc&s_AssinaturaDeEmail_Claudia.jpg", kind: "image" },
      { id: "apresentacao", src: "VOC&S/PowerPoint/PDF/Voc&s_Apresentação.pdf", kind: "slide", pages: [1, 2, 3] },
    ],
  },

  /* ---------------------------------------------------------------- social media */
  "sg-importados": {
    thumb: { from: "feed", crop: "center" },
    items: [
      { id: "feed", src: "SGImportados/Artes finalizadas/SGImportados_feed.png", kind: "post" },
      { id: "story", src: "SGImportados/Artes finalizadas/SGImportados_story.png", kind: "post" },
      { id: "consumidor-1", src: "SGImportados/Semana do Consumidor/SGImportados_story_semana_consumidor_op1.png", kind: "post" },
      { id: "consumidor-2", src: "SGImportados/Semana do Consumidor/SGImportados_story_semana_consumidor_op2.png", kind: "post" },
      { id: "aniversario", src: "SGImportados/Aniversario/SGImportados_story_aniversario.png", kind: "post" },
      { id: "desconto", src: "SGImportados/Artes 12-01/SGImportados_storys_desconto.png", kind: "post" },
      { id: "progressivo", src: "SGImportados/Artes 12-01/SGImportados_storys_desconto_progressivo.png", kind: "post" },
      { id: "banner-black", src: "SGImportados/Artes finalizadas/SGImportados_banner_BlackDecants.png", kind: "image", group: "banners" },
      { id: "banner-decants", src: "SGImportados/Artes finalizadas/SGImportados_banner_Decants.png", kind: "image", group: "banners" },
      { id: "banner-vendidos", src: "SGImportados/Artes finalizadas/SGImportados_banner_MaisVendidos.png", kind: "image", group: "banners" },
      { id: "banner-consumidor", src: "SGImportados/Semana do Consumidor/SGImportados_banner_site_semana_consumidor.jpg", kind: "image", group: "banners" },
      { id: "banner-aniversario", src: "SGImportados/Aniversario/SGImportados_banner_site.jpg", kind: "image", group: "banners" },
    ],
  },
  "cau-pe": {
    thumb: { from: "save-1", crop: "center" },
    items: [
      { id: "save-1", src: "Apex Comunicação/CAU - PE/Redes Sociais/Carrossel - Save the date/CAU-PE_Save_the_date_01.png", kind: "post" },
      { id: "save-2", src: "Apex Comunicação/CAU - PE/Redes Sociais/Carrossel - Save the date/CAU-PE_Save_the_date_02.png", kind: "post" },
      ...range(1, 5).map((n) => ({ id: `coloquio-${n}`, src: `Apex Comunicação/CAU - PE/Redes Sociais/Carrossel - Colóquio Caruaru inscrições/CAU_PE_Colóquio_Caruaru_inscrições_0${n}.png`, kind: "post" })),
      ...range(1, 7).map((n) => ({ id: `patrimonio-${n}`, src: `Apex Comunicação/CAU - PE/Redes Sociais/Carrossel - Dia do Patrimonio/images/CAU_PE_Patrimônio_0${n}.png`, kind: "post" })),
      { id: "turismo-1", src: "Apex Comunicação/CAU - PE/Redes Sociais/Carrossel - Dia do Turismo/CAUPE_Dia_Do_Turismo_01.png", kind: "post" },
      { id: "turismo-7", src: "Apex Comunicação/CAU - PE/Redes Sociais/Carrossel - Dia do Turismo/CAUPE_Dia_Do_Turismo_07.png", kind: "post" },
      { id: "projeto-1", src: "Apex Comunicação/CAU - PE/Redes Sociais/Carrossel - Qual é o projeto - Agosto/Opção 01/CAU_PE_Qual_é_o_projeto_Agosto_01.png", kind: "post" },
      { id: "projeto-2", src: "Apex Comunicação/CAU - PE/Redes Sociais/Carrossel - Qual é o projeto - Agosto/Opção 01/CAU_PE_Qual_é_o_projeto_Agosto_02.png", kind: "post" },
    ],
  },

  /* ---------------------------------------------------------------- embalagem */
  dedicad: {
    thumb: { from: "mockup-v4", crop: "center" },
    items: [
      { id: "mockup-v4", src: "Projeto Gringo/Embalagem Creatina/img-mockup-v4.png", kind: "image" },
      { id: "mockup", src: "Projeto Gringo/Embalagem Creatina/img-mockup.png", kind: "image" },
      { id: "mockup-v3", src: "Projeto Gringo/Embalagem Creatina/img-mockup-v3.png", kind: "image" },
      { id: "opcao-1", src: "Projeto Gringo/Embalagem Creatina/Embalagem 01/Dedicad-option01.png", kind: "image" },
      { id: "opcao-2", src: "Projeto Gringo/Embalagem Creatina/Embalagem 02/Dedicad-option02_Prancheta 1.png", kind: "image" },
      ...range(1, 4).map((n) => ({ id: `welbuda-${n}`, src: `Projeto Gringo/Projeto  01/Images/art-0${n}.png`, kind: "post", group: "social" })),
    ],
  },

  /* ---------------------------------------------------------------- apresentações / editorial */
  todateen: {
    thumb: { from: "nightrun-01" },
    items: [
      { id: "nightrun", src: `${W}/TodaTeen/Slide 12_9 - 39-exported-by-super-pdf.pdf`, kind: "slide", pages: [1, 3, 4, 5, 7, 9, 11, 13] },
      { id: "bidu", src: `${W}/TodaTeen/Frame 1-exported-by-super-pdf.pdf`, kind: "slide", pages: [1, 2, 3, 5, 7, 9] },
      { id: "porto", src: `${W}/TodaTeen/Slide 16_9 - 1-exported-by-super-pdf.pdf`, kind: "slide", pages: [2, 4, 6, 8] },
      { id: "papo", src: `${W}/TodaTeen/Slide 16_9 - 18-exported-by-super-pdf.pdf`, kind: "slide", pages: [1, 3, 7, 11] },
      { id: "conteudo", src: `${W}/TodaTeen/Slide 16_9 - 28-exported-by-super-pdf.pdf`, kind: "slide", pages: [2, 8, 10] },
      { id: "responde", src: `${W}/TodaTeen/Slide 16_9 - 39-exported-by-super-pdf.pdf`, kind: "slide", pages: [6, 8, 10] },
    ],
  },
  mgk: {
    thumb: { from: "ebook-01" },
    items: [{ id: "ebook", src: "MGK/Ebook_MGK_CodigoDeEtica_v4(jan23).pdf", kind: "slide", pages: [1, 2, 3, 5, 7, 9, 13, 17, 21, 25] }],
  },
};
