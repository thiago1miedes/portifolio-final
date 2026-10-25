// Mapa de origem das imagens de cada case.
// - Caminhos começando com "shots/" vêm de sources/shots (prints dos sites no ar).
// - Os demais são relativos à pasta Freelancer (SRC).
// - PDFs (e .ai com compatibilidade PDF): `pages` define quais páginas renderizar (1 = primeira). Sem `pages`, só a 1ª.
// - `cover` (opcional): id da imagem de capa da página, quando não é a mesma da listagem (thumb.from).
// kinds: page (página inteira de site, 1440px) · mobile (print de celular) ·
//        slide (16:9, 1600px) · image (até 1600px) · photo (foto de produto, até 2000px) ·
//        label (rótulo planificado, 2600px) · book (página de e-book, 1800px de altura) · post (até 1080px) ·
//        story / feed / banner (tamanho original) · svg (copiado) · video (mp4 copiado + pôster)
export const SRC = "F:/Freelancer";

const W = "Websites";
const CAU = "Apex Comunicação/CAU - PE/Projeto Case";
const GRINGO = "Projeto Gringo";
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
  // A página é o case de marca (cases/easywork/case.json); a capa vem de `npm run brand -- easywork thumb`
  // (logo final). Rodar `npm run assets -- easywork` a sobrescreve.
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
  // A página é o case de marca (cases/grasie/case.json, só com o logo final); a capa vem de
  // `npm run brand -- grasie thumb`. Rodar `npm run assets -- grasie` a sobrescreve.
  grasie: {
    thumb: { from: "logo-07" },
    items: [
      { id: "logo", src: "Grasie Kids Store/Apresentação_logo_grasie(set23).pdf", kind: "slide", pages: range(2, 19) },
      { id: "app", src: "Grasie Kids Store/app-papelaria-v3.pdf", kind: "slide", pages: [1, 2, 3] },
      { id: "sacola", src: "Grasie Kids Store/136.jpg", kind: "image" },
    ],
  },
  // A página é o case de marca (cases/lifestyle/case.json, só com o logo e os mockups de LifeStyle/Projeto Case);
  // a capa vem de `npm run brand -- lifestyle thumb`. Rodar `npm run assets -- lifestyle` a sobrescreve.
  lifestyle: {
    thumb: { from: "idv-09" },
    items: [
      { id: "idv", src: "LifeStyle/Apresentação_IDV_lifestyle_v1(jul23).pdf", kind: "slide", pages: range(2, 9) },
      { id: "papelaria-1", src: "LifeStyle/img-papelaria-v1.jpg", kind: "image" },
      { id: "papelaria-2", src: "LifeStyle/img-papelaria-v2-p1.jpg", kind: "image" },
      { id: "papelaria-3", src: "LifeStyle/img-papelaria-v3-p1.jpg", kind: "image" },
    ],
  },
  "rock-ensina": {
    thumb: { from: "id-09" },
    items: [{ id: "id", src: "Rockensina/Proposta Id Visual/202412_Slides_Proposta_IdVisual_Rock_Ensina.pdf", kind: "slide", pages: range(1, 15) }],
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
  // A capa (thumb.webp) deste case vem do logo final (`npm run brand -- debora-sandrin thumb`); rodar `npm run assets -- debora-sandrin` a sobrescreve.
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
  // A página é o case de marca (cases/vocs/case.json); a capa vem de `npm run brand -- vocs thumb`
  // (logo final). Rodar `npm run assets -- vocs` a sobrescreve.
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
    thumb: { from: "capa", crop: "center" },
    items: [
      { id: "capa", src: "SGImportados/Projeto Case/capa_case.png", kind: "image", group: "capa", label: "Logo" },
      { id: "story-black", src: "SGImportados/Projeto Case/SGImportados_story.png", kind: "story", group: "stories", label: "Black Decants" },
      { id: "story-aniversario", src: "SGImportados/Projeto Case/SGImportados_story_aniversario.png", kind: "story", group: "stories", label: "Aniversário" },
      { id: "story-consumidor-1", src: "SGImportados/Projeto Case/SGImportados_story_semana_consumidor_op1.png", kind: "story", group: "stories", label: "Semana do Consumidor · 1" },
      { id: "story-consumidor-2", src: "SGImportados/Projeto Case/SGImportados_story_semana_consumidor_op2.png", kind: "story", group: "stories", label: "Semana do Consumidor · 2" },
      { id: "story-consumidor-3", src: "SGImportados/Projeto Case/SGImportados_story_semana_consumidor_op3.png", kind: "story", group: "stories", label: "Semana do Consumidor · 3" },
      { id: "story-verao", src: "SGImportados/Projeto Case/SGImportados_storys.png", kind: "story", group: "stories", label: "Perfumes de verão" },
      { id: "story-desconto", src: "SGImportados/Projeto Case/SGImportados_storys_desconto.png", kind: "story", group: "stories", label: "Desconto progressivo" },
      { id: "story-progressivo", src: "SGImportados/Projeto Case/SGImportados_storys_desconto_progressivo.png", kind: "story", group: "stories", label: "Seu verão merece mais" },
      { id: "serie-01", src: "SGImportados/Projeto Case/SGImportados_Story_vantagens_01.png", kind: "story", group: "serie", label: "Vantagens do decant · 1" },
      { id: "serie-02", src: "SGImportados/Projeto Case/SGImportados_Story_vantagens_02.png", kind: "story", group: "serie", label: "Vantagens do decant · 2" },
      { id: "serie-03", src: "SGImportados/Projeto Case/SGImportados_Story_vantagens_03.png", kind: "story", group: "serie", label: "Vantagens do decant · 3" },
      { id: "serie-04", src: "SGImportados/Projeto Case/SGImportados_Story_vantagens_04.png", kind: "story", group: "serie", label: "Vantagens do decant · 4" },
      { id: "serie-05", src: "SGImportados/Projeto Case/SGImportados_Story_vantagens_05.png", kind: "story", group: "serie", label: "Vantagens do decant · 5" },
      { id: "serie-06", src: "SGImportados/Projeto Case/SGImportados_Story_vantagens_06.png", kind: "story", group: "serie", label: "Antes e depois · 1" },
      { id: "serie-07", src: "SGImportados/Projeto Case/SGImportados_Story_vantagens_07.png", kind: "story", group: "serie", label: "Antes e depois · 2" },
      { id: "serie-08", src: "SGImportados/Projeto Case/SGImportados_Story_vantagens_08.png", kind: "story", group: "serie", label: "Antes e depois · 3" },
      { id: "serie-09", src: "SGImportados/Projeto Case/SGImportados_Story_vantagens_09.png", kind: "story", group: "serie", label: "Cupom de boas-vindas" },
      { id: "feed", src: "SGImportados/Projeto Case/SGImportados_feed.png", kind: "feed", group: "feed", label: "Black Decants" },
      { id: "banner-verao", src: "SGImportados/Projeto Case/SGImportados_banner.png", kind: "banner", group: "banners", label: "Perfumes de verão" },
      { id: "banner-black", src: "SGImportados/Projeto Case/SGImportados_banner_BlackDecants.png", kind: "banner", group: "banners", label: "Black Decants" },
      { id: "banner-decants", src: "SGImportados/Projeto Case/SGImportados_banner_Decants.png", kind: "banner", group: "banners", label: "Decants" },
      { id: "banner-vendidos", src: "SGImportados/Projeto Case/SGImportados_banner_MaisVendidos.png", kind: "banner", group: "banners", label: "Os mais vendidos" },
      { id: "banner-aniversario", src: "SGImportados/Projeto Case/SGImportados_banner_site.jpg", kind: "banner", group: "banners", label: "Aniversário" },
      { id: "banner-consumidor", src: "SGImportados/Projeto Case/SGImportados_banner_site_semana_consumidor.jpg", kind: "banner", group: "banners", label: "Semana do Consumidor" },
      { id: "mobile-verao", src: "SGImportados/Projeto Case/SGImportados_banner_mobile.png", kind: "banner", group: "banners-mobile", label: "Perfumes de verão" },
      { id: "mobile-black", src: "SGImportados/Projeto Case/SGImportados_banner_BlackDecants_mobile.png", kind: "banner", group: "banners-mobile", label: "Black Decants" },
      { id: "mobile-decants", src: "SGImportados/Projeto Case/SGImportados_banner_Decants_mobile.png", kind: "banner", group: "banners-mobile", label: "Decants" },
      { id: "mobile-vendidos", src: "SGImportados/Projeto Case/SGImportados_banner_MaisVendidos_mobile.png", kind: "banner", group: "banners-mobile", label: "Os mais vendidos" },
      { id: "mobile-aniversario", src: "SGImportados/Projeto Case/SGImportados_banner_site_mobile.jpg", kind: "banner", group: "banners-mobile", label: "Aniversário" },
      { id: "mobile-consumidor", src: "SGImportados/Projeto Case/SGImportados_banner_site_semana_consumidor_mobile.jpg", kind: "banner", group: "banners-mobile", label: "Semana do Consumidor" },
      { id: "categoria-verao", src: "SGImportados/Projeto Case/SGImportados_banner_categoria.png", kind: "banner", group: "banners-categoria", label: "Perfumes de verão" },
      { id: "categoria-aniversario", src: "SGImportados/Projeto Case/SGImportados_banner_categoria.jpg", kind: "banner", group: "banners-categoria", label: "Aniversário" },
      { id: "categoria-black", src: "SGImportados/Projeto Case/SGImportados_banner_categoria_BlackDecants.png", kind: "banner", group: "banners-categoria", label: "Black Decants" },
      { id: "categoria-consumidor", src: "SGImportados/Projeto Case/SGImportados_banner_categoria_semana_consumidor.jpg", kind: "banner", group: "banners-categoria", label: "Semana do Consumidor" },
    ],
  },
  "cau-pe": {
    // capa da listagem: o emblema do CAU/PE sobre o painel de ladrilhos
    thumb: { logo: "logo", pattern: "padrao" },
    items: [
      { id: "logo", src: `${CAU}/Logo_CAU_Pe.svg`, kind: "svg", group: "marca" },
      { id: "padrao", src: `${CAU}/Parttern_CAU.svg`, kind: "svg", group: "marca" },
      { id: "padrao-2", src: `${CAU}/Parttern_CAU_v2.svg`, kind: "svg", group: "marca" },
      { id: "padrao-3", src: `${CAU}/Parttern_CAU_v3.svg`, kind: "svg", group: "marca" },
      ...range(1, 6).map((n) => ({ id: `elemento-${n}`, src: `${CAU}/Elemento_grafico_v${n}.svg`, kind: "svg", group: "elementos" })),
      // carrosséis do feed (4:5) — o group é a chave do carrossel em cases.ts (social.carousels)
      ...range(1, 8).map((n) => ({ id: `travessia-${n}`, src: `${CAU}/CAU_PE_Colóquio_Caruaru_Petrolina_0${n}.png`, kind: "feed", group: "travessia" })),
      ...range(1, 5).map((n) => ({ id: `caruaru-${n}`, src: `${CAU}/CAU_PE_Colóquio_Caruaru_inscrições_0${n}.png`, kind: "feed", group: "caruaru" })),
      ...range(1, 2).map((n) => ({ id: `save-${n}`, src: `${CAU}/CAU-PE_Save_the_date_0${n}.png`, kind: "feed", group: "save" })),
      ...range(1, 7).map((n) => ({ id: `patrimonio-${n}`, src: `${CAU}/CAU_PE_Patrimônio_0${n}.png`, kind: "feed", group: "patrimonio" })),
      { id: "turismo-1", src: `${CAU}/CAUPE_Dia_Do_Turismo_01.png`, kind: "feed", group: "turismo" },
      ...["Olinda", "Recife", "Porto de Galinhas", "Caruaru", "Petrolina"].map((label, i) => ({ id: `turismo-${i + 2}`, src: `${CAU}/CAUPE_Dia_Do_Turismo_0${i + 2}.mp4`, kind: "video", group: "turismo", label })),
      { id: "turismo-7", src: `${CAU}/CAUPE_Dia_Do_Turismo_07.png`, kind: "feed", group: "turismo" },
      ...range(1, 2).map((n) => ({ id: `projeto-${n}`, src: `${CAU}/CAU_PE_Qual_é_o_projeto_Agosto_0${n}.png`, kind: "feed", group: "projeto" })),
      ...[1, 2, 3, 4, 5, 6, 7, 10].map((n, i) => ({ id: `chapas-${i + 1}`, src: `${CAU}/CAUPE_Formação_de_chapas_${String(n).padStart(2, "0")}.png`, kind: "feed", group: "chapas" })),
      ...range(1, 3).map((n) => ({ id: `prazo-${n}`, src: `${CAU}/CAU_PE_Registro_chapas_0${n}.png`, kind: "feed", group: "prazo" })),
      ...range(1, 4).map((n) => ({ id: `anuidade-${n}`, src: `${CAU}/CAU_PE_Anuidade_0${n}.png`, kind: "feed", group: "anuidade" })),
    ],
  },

  /* ---------------------------------------------------------------- embalagem */
  // os ids são lidos por c.product em cases.ts (vistas `${versão}-front|left|right|label`, fotos por linha, campanhas por group)
  dedicad: {
    thumb: { from: "duo-burst", crop: "center" },
    cover: "duo-splash",
    items: [
      // embalagens: planificação do rótulo (o .ai abre como PDF, sem a marca d'água dos PNGs) e as três vistas do pote
      { id: "red-label", src: `${GRINGO}/Embalagem Creatina/Embalagem 01/packaging_creatine_openfile_01.ai`, kind: "label", group: "pack" },
      ...["front", "left", "right"].map((v) => ({ id: `red-${v}`, src: `${GRINGO}/Embalagem Creatina/Embalagem 01/Dedicad-option01-${v}.png`, kind: "image", group: "pack" })),
      { id: "gold-label", src: `${GRINGO}/Embalagem Creatina/Embalagem 02/packaging_creatine_openfile-02.ai`, kind: "label", group: "pack" },
      ...["front", "left", "right"].map((v) => ({ id: `gold-${v}`, src: `${GRINGO}/Embalagem Creatina/Embalagem 02/Dedicad-option02-${v}.png`, kind: "image", group: "pack" })),
      // fotos de produto (o label é o texto alternativo)
      ...[
        ["duo-splash", "cbql8pcbql8pcbql", "Os potes dourado e vermelho lado a lado, entre respingos de água"],
        ["duo-burst", "sehho9sehho9sehh", "Os dois potes abertos no ar, no meio de uma explosão de pó"],
        ["duo-bench", "4brgqn4brgqn4brg", "As duas versões no banco de uma academia"],
        ["duo-lockers", "8pf7xh8pf7xh8pf7", "Cada versão no seu armário de vestiário, sobre toalhas"],
        ["duo-court", "pkanytpkanytpkan", "As duas versões numa bolsa de treino, na quadra de tênis"],
        ["duo-stone", "kht867kht867kht8", "O pote dourado sobre uma pedra e o vermelho sobre uma anilha, ao lado de halteres"],
        ["duo-lineup", "1z5r341z5r341z5r", "A linha completa, do dourado ao vermelho, sobre um pedestal branco"],
        ["red-athlete", "hcgvcxhcgvcxhcgv", "Atleta estende o pote vermelho para a câmera numa academia ao ar livre"],
        ["red-box", "c6yii4c6yii4c6yi", "Potes vermelhos caindo dentro de uma caixa de papelão"],
        ["red-flatlay", "bn9wewbn9wewbn9w", "Potes vermelhos espalhados sobre concreto, vistos de cima"],
        ["red-gym", "ydewwlydewwlydew", "O pote vermelho no banco de uma academia"],
        ["red-podium", "hf8agghf8agghf8a", "Cinco potes vermelhos sobre um pedestal branco"],
        ["red-bag", "bfexaubfexaubfex", "O pote vermelho dentro de uma bolsa de treino, no vestiário"],
        ["gold-stone", "az5jwxaz5jwxaz5j", "O pote dourado inclinado sobre pedras, com medidor de pó e kettlebell"],
        ["gold-burst", "c6nopyc6nopyc6no", "O pote dourado aberto no ar, numa nuvem de pó"],
        ["gold-tote", "k1fzlvk1fzlvk1fz", "Mulher guarda o pote dourado numa bolsa de tecido"],
        ["gold-locker", "c2t3ehc2t3ehc2t3", "O pote dourado num armário de vestiário, sobre toalhas"],
        ["gold-court", "o2wydqo2wydqo2wy", "Mão coloca o pote dourado numa bolsa de treino, na quadra de tênis"],
        ["gold-pattern", "p1ib9bp1ib9bp1ib", "Potes dourados enfileirados na diagonal, formando um padrão"],
      ].map(([id, file, label]) => ({ id, src: `${GRINGO}/Projeto case/Gemini_Generated_Image_${file}.jpg`, kind: "photo", group: "shoot", label })),
      // campanhas para a galeria da Amazon (1:1, 550px): op1 = Lions Mane da Welbuda, op2 = Mushroom Coffee da Dedicad
      ...range(1, 7).map((n) => ({ id: `lions-${n}`, src: `${GRINGO}/Projeto case/Images para campanha - op1/art-0${n}.png`, kind: "post", group: "lions" })),
      ...range(1, 7).map((n) => ({ id: `coffee-${n}`, src: `${GRINGO}/Projeto case/Images para campanha - op2/art-0${n}.png`, kind: "post", group: "coffee" })),
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
};
