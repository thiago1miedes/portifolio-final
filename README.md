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
| **Fontes locais** (Anton, Bricolage Grotesque, Inter) | Servidas pelo próprio site (sem depender do Google Fonts), o que ajuda no Lighthouse. |

Alternativas consideradas: Next.js (ótimo, mas mais pesado do que um portfólio precisa), WordPress/Elementor (mais difícil de chegar nesse nível de animação e performance) e HTML puro (funciona, mas repetir 48 páginas à mão não escala).

## Identidade visual

- Fundo **escuro** (#0A0A0B) com superfícies de vidro e bordas finas translúcidas.
- **Um único laranja** de destaque (#FF5A1F). Em todo título, a palavra-chave (`<em>`) fica em laranja.
- Tipografia: **Anton** (hero, nomes gigantes), **Bricolage Grotesque** (títulos) e **Inter** (texto), todas servidas pelo próprio site.
- Foto recortada (`public/about/thiago-cutout.webp`) na frente do título do hero e no "Sobre", sobre fundo laranja. Para trocar pelo avatar 3D, substitua esse arquivo (PNG/WebP sem fundo).

## Animações

- Hero: as linhas do título sobem da máscara, o avatar entra e acompanha o mouse (`data-parallax`).
- Títulos revelados por palavra (SplitText); a palavra laranja entra por último.
- Faixa infinita de habilidades (pausa ao passar o mouse), parallax nas imagens dos projetos, cursor "Ver" nos cards.
- Acordeões de serviços e FAQ (um aberto por vez), "Ver tudo" da trajetória e menu mobile usam a classe `.is-hidden` (display:none).
- "THIAGO" gigante no rodapé com letras que sobem ao entrar na tela; cortina laranja na troca de página.
- Tudo respeita `prefers-reduced-motion` (quem pede menos movimento vê o site completo, sem animação).

## Onde editar

| O quê | Arquivo |
|---|---|
| Textos, categorias, ordem e destaques dos cases | `src/data/cases.ts` (campo `featured` = posição na vitrine da home) |
| Quais imagens cada case usa | `scripts/assets.config.mjs` → depois rode `npm run assets` |
| E-mail, WhatsApp, redes, fatos do hero, faixa de habilidades, projetos da home, ferramentas, serviços, sobre, trajetória e FAQ | `src/data/site.ts` |
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

## Contato

Não há formulário: o FAQ e o rodapé levam direto para o WhatsApp (mensagem já preenchida) e para o e-mail. Para mudar o texto inicial do WhatsApp, edite `whatsappText` em `src/data/site.ts`.

## Publicar

Qualquer hospedagem estática serve. Na Vercel/Netlify: conecte o repositório, comando `npm run build`, pasta `dist`. Atualize `site` em `astro.config.mjs` e `url` em `src/data/site.ts` com o domínio final.
