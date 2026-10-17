# Portfólio — Thiago Miedes

Site de portfólio pessoal: web design, front-end, identidade visual, social media, papelaria, embalagens e apresentações.
48 cases montados a partir da pasta `F:\Freelancer` (sites em PDF, apresentações de marca, artes de redes sociais e prints dos sites no ar) + 9 projetos do Behance.

## Rodar

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera o site estático em dist/
npm run preview    # serve o dist/ para conferir o build
```

## Por que esta stack

| Escolha | Motivo |
|---|---|
| **Astro 5** (site estático) | Gera HTML puro, carrega rápido, ótimo para SEO e para hospedar em qualquer lugar (Vercel, Netlify, Hostinger, Cloudflare Pages). Cada case vira uma página a partir de um único arquivo de dados — sem copiar e colar layout. Não obriga React; JavaScript só onde há interação. |
| **GSAP 3** (ScrollTrigger, SplitText, Flip) | Padrão do mercado para animação na web: linhas de tempo, animação ligada à rolagem, títulos revelados palavra por palavra e filtros que reorganizam a grade com transição. Todos os plugins são gratuitos. |
| **Lenis** | Rolagem suave que conversa com o ScrollTrigger. |
| **CSS próprio** (sem framework) | Identidade única, sem visual "de template", e CSS pequeno. Tokens de cor e tipografia ficam em `src/styles/global.css`. |
| **Fontes locais** (Space Grotesk, Inter, Pixelify Sans) | Todas sem serifa, servidas pelo próprio site (sem depender do Google Fonts). |

Alternativas consideradas: Next.js (ótimo, mas mais pesado do que um portfólio precisa), WordPress/Elementor (mais difícil de chegar nesse nível de animação e performance) e HTML puro (funciona, mas repetir 48 páginas à mão não escala).

## Identidade visual

- Base **branca**, com detalhes em **verdes de floresta saturados** e **verde-marinho** (paleta inspirada em jogos 2D como Terraria).
- Elementos em **SVG pixel art** gerados no build: paisagem do banner (colinas, árvores, gemas, nuvens, blocos flutuantes), borda de grama no rodapé, ícones dos serviços, cena da mesa de trabalho no "Sobre".
- Tipografia sem serifa: Space Grotesk (títulos), Inter (texto), Pixelify Sans (etiquetas pequenas).

## Animações

- Banner: o mundo em pixel "se constrói" bloco a bloco, árvores crescem, nuvens se movem, gemas piscam, parallax com o mouse.
- Títulos revelados por palavra (SplitText) e marca-texto pixelado.
- Cases em destaque empilhados: o card anterior encolhe e o site rola dentro do navegador conforme a rolagem.
- Página de case: o layout do site rola dentro da janela do navegador enquanto você rola a página.
- Filtro de projetos com Flip, letreiro de clientes que acelera com a rolagem, contadores, botões magnéticos, cursor personalizado e transição entre páginas em grade de pixels.
- Tudo respeita `prefers-reduced-motion` (quem pede menos movimento vê o site completo, sem animação).

## Onde editar

| O quê | Arquivo |
|---|---|
| Textos, categorias, ordem e destaques dos cases | `src/data/cases.ts` (campo `featured` = posição na vitrine da home) |
| Quais imagens cada case usa | `scripts/assets.config.mjs` → depois rode `npm run assets` |
| E-mail, WhatsApp, redes, ferramentas, clientes do letreiro | `src/data/site.ts` |
| Projetos do Behance | `src/data/behance.ts` |
| Cores, fontes, botões | `src/styles/global.css` |
| Seções da home | `src/components/*.astro` e `src/pages/index.astro` |

### Adicionar um case

1. Em `scripts/assets.config.mjs`, adicione o slug com a lista de imagens (PDFs, PNG/JPG ou prints em `sources/shots/`).
2. Rode `npm run assets -- novo-slug` (gera as imagens otimizadas em `public/cases/novo-slug/`).
3. Em `src/data/cases.ts`, adicione o objeto com título, textos e categorias.

### Remover um case

Apague o objeto em `src/data/cases.ts` (e, se quiser, o bloco correspondente em `assets.config.mjs` e a pasta em `public/cases/`).

### Prints dos sites no ar

`npm run shots -- sources/shots nome=https://site.com.br` usa o Chrome instalado para capturar desktop e mobile.

## Formulário de contato

Sem configuração, o formulário valida os campos e abre o e-mail do visitante já preenchido (há também o botão "Enviar pelo WhatsApp").
Para receber mensagens direto na caixa de entrada, crie um formulário gratuito no [Formspree](https://formspree.io) ou [Web3Forms](https://web3forms.com) e cole o endpoint em `formEndpoint` (`src/data/site.ts`).

## Publicar

Qualquer hospedagem estática serve. Na Vercel/Netlify: conecte o repositório, comando `npm run build`, pasta `dist`. Atualize `site` em `astro.config.mjs` e `url` em `src/data/site.ts` com o domínio final.
