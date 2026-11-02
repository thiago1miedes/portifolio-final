# Visual Vidros: plano de imagens

> **Situação:** o case está publicado com 18 imagens do Thiago. Do plano abaixo entraram hero-vidro-luz, textura-vidro-colorido, fechamento-vitral, mockup-adesivo-vidro (logo real por overlay) e as editoriais fachada, oficina, instalação e reflexo. Os outros mockups vieram prontos, com o logo desenhado pela IA e ids próprios em `case.json`.

Página: `/cases/visual-vidros/` · conteúdo: `cases/visual-vidros/case.json` · 7 essenciais + 6 opcionais, todas por IA. Só o logo é do cliente.

## Como entregar cada imagem

1. Salve em `cases/visual-vidros/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- visual-vidros images`. O script recorta na proporção, gera WebP + AVIF (e 800 px para celular) em `public/brand/visual-vidros/img/`. As editoriais saem em P&B mesmo que a IA devolva cor.
3. Recarregue a página: a imagem entra no lugar do placeholder, sem mexer em código.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **lisas** (vidro sem adesivo, van branca sem nada, camiseta lisa, cartão liso, caneca lisa). O SVG real entra pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/visual-vidros/?pin`, arraste os 4 cantos sobre a superfície e cole o array no `pin` do mockup em `case.json`. As composições abaixo já batem com o `pin` inicial.

**Feito em código, sem IA:** o V que se desenha na abertura, as lâminas que se separam na seção do símbolo, os recortes gigantes (a ponta do prisma, o V de VISUAL), a faixa "VISUAL VIDROS", o padrão de símbolos, o app, o sistema do logo e os blocos de cor.

**PNGs de referência** (2000 px, em `cases/visual-vidros/ref/`): `visual-vidros-lockup-transparent.png`, `-lockup-dark.png` (sobre o noite), `-lockup-light.png` (sobre vidro claro), `-lockup-accent.png` (sobre o laranja), `-symbol-transparent.png`, `-symbol-dark.png`. Servem para conferir cor e escala. **Não anexe nas cenas de mockup**, senão a IA tenta desenhar o logo.

## Coerência visual (vale para todas)

- **Luz:** sol baixo de fim de tarde, lateral e duro, entrando por vidro: reflexos nítidos, cáusticas e sombras coloridas. Sem flash, sem luz de estúdio chapada.
- **Lente:** 35 mm f/4 nos planos de arquitetura, 50 mm f/2.8 no geral, 90 mm macro nos detalhes. Pouca distorção, linhas verticais retas (look de tilt-shift em fachadas).
- **Cor:** sombras no noite `#0C1A2C`, médios em marinho `#1C4374` dessaturado, altas frias em `#EEF2F4`. Azul vidro `#0080C3` e laranja `#ED8C00` só na luz atravessando vidro ou em pequenos pontos. Nada de verde de vidro comum em excesso, nada de roxo.
- **P&B:** preto e branco frio e limpo, contraste alto, pretos profundos, reflexos estourando no branco. Clima de fotografia de arquitetura, gente real trabalhando.
- **Materiais:** vidro temperado, alumínio escovado, concreto claro, ventosas, réguas. Nada de vidro de cristal decorativo, taças ou garrafas.

**Gere primeiro `hero-vidro-luz`:** é a âncora de luz e cor. No Midjourney use a URL dela em `--sref` nas coloridas; no Nano Banana / GPT Image anexe como referência ("match the lighting, color grading and lens of the reference").
**Para as P&B, gere `editorial-fachada` primeiro** e use como `--sref` das outras editoriais.

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `hero-vidro-luz.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 + Magnific | essencial · **gerar primeiro** |
| 2 | `editorial-fachada.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial · âncora P&B |
| 3 | `mockup-adesivo-vidro.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 4 | `editorial-instalacao.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial |
| 5 | `mockup-van.webp` | Aplicações | 2:1 · 2400×1200 | GPT Image | essencial |
| 6 | `mockup-cartoes.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 7 | `editorial-oficina.webp` | Aplicações | 3:2 · 2400×1600 | Midjourney v7 | essencial |
| 8 | `mockup-uniforme.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | opcional |
| 9 | `mockup-caneca.webp` | Aplicações | 1:1 · 1800×1800 | Nano Banana (Gemini) | opcional |
| 10 | `editorial-reflexo.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | opcional |
| 11 | `editorial-guarda-corpo.webp` | Aplicações | 2:1 · 2400×1200 | Midjourney v7 | opcional |
| 12 | `textura-vidro-colorido.webp` | Símbolo (fundo) | 3:2 · 2400×1600 | Flux 1.1 Pro / Midjourney | opcional |
| 13 | `fechamento-vitral.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |

---

## Essenciais

### 1. hero-vidro-luz
- **Seção:** Intro, atrás do logo que se desenha (fica escurecida). Deixe o centro calmo.
- **Ferramenta:** Midjourney v7 (melhor em luz atravessando material); upscale no Magnific (Creativity baixo) para 2400 px.
- **Referência do logo:** nenhuma.
- **Prompt:**
  `Dark moody still life of tall tempered glass sheets standing in a dim workshop, some tinted steel blue #0080C3 and some amber #ED8C00, a single hard beam of late afternoon sunlight cutting through them and casting overlapping colored light shapes on a deep navy wall #0C1A2C, crisp caustics, sharp reflections on the glass edges, lots of negative space in the center, cinematic, 35mm lens f/4, subtle film grain, photographic realism --ar 16:9 --style raw --v 7`
- **Evitar:** `text, logo, letters, people, bottles, wine glasses, crystal, neon, purple, green glass, bokeh balls, clutter, CGI look`

### 2. editorial-fachada
- **Seção:** Aplicações, primeira foto da colagem. **Âncora P&B.**
- **Ferramenta:** Midjourney v7 (fotografia de arquitetura com verticais retas).
- **Prompt:**
  `Black and white architectural photograph of a modern residential building facade made of large glass panels and thin aluminum frames, shot from below looking up, the glass reflecting clouds and sky, strong late afternoon sidelight, perfectly straight verticals like a tilt-shift lens, high contrast, deep blacks, clean cool monochrome, 35mm, fine grain --ar 4:5 --style raw --v 7`
- **Evitar:** `color, text, signage, logos, skyscraper cliché, fisheye distortion, HDR halos, people posing`

### 3. mockup-adesivo-vidro
- **Seção:** Aplicações, “Adesivo na lâmina”. O logo entra em código como adesivo jateado (branco em `screen`).
- **Ferramenta:** Nano Banana / Gemini 2.5 Flash Image (bom em superfície lisa e enquadramento controlado).
- **Composição para o `pin` inicial:** porta de vidro de frente, ocupando o quadro; área **vazia e plana no centro** (de 38% a 62% na horizontal, 34% a 66% na vertical).
- **Prompt:**
  `Straight-on photo of a frameless tempered glass door with brushed aluminum handle and hinges, in a bright modern interior with concrete floor and a white wall behind it, the center of the glass is completely clean and empty with no stickers, subtle reflections, soft late afternoon light from the left, color grading with navy shadows #0C1A2C and cool highlights #EEF2F4, 50mm lens, photorealistic, 3:2`
- **Evitar:** `sticker, logo, text, frosted pattern, handprints, people, cluttered background, warped glass`

### 4. editorial-instalacao
- **Seção:** Aplicações, coluna estreita.
- **Ferramenta:** Midjourney v7, com `--sref` da `editorial-fachada`.
- **Prompt:**
  `Black and white documentary photograph of two glaziers installing a large glass pane into a window opening of a house under construction, using suction cup lifters, gloved hands, concentration, raw concrete walls, strong sidelight, high contrast, cool monochrome, 50mm f/2.8, natural moment, not posed --ar 4:5 --style raw --v 7`
- **Evitar:** `color, smiling at camera, helmets with logos, text, stock photo look, broken glass, unsafe`

### 5. mockup-van
- **Seção:** Aplicações, faixa larga “Van de instalação”. O logo entra em código na lateral (`multiply`).
- **Ferramenta:** GPT Image (segura bem a lateral lisa e o enquadramento largo).
- **Composição para o `pin` inicial:** van branca de perfil, lateral do baú **lisa** entre 40% e 62% na horizontal, 34% a 64% na vertical.
- **Prompt:**
  `Side profile photo of a plain white cargo van with a glass rack on the side carrying a few clear glass sheets, parked in front of a modern house under construction with large glass windows, the side panel of the van is completely blank and white with no graphics, late afternoon sun, long shadows, navy-tinted shadows #0C1A2C, subtle orange #ED8C00 sunlight on the glass, 35mm lens, photorealistic, wide 2:1 composition`
- **Evitar:** `logos, lettering, decals, license plate text, people, brand emblems on the grille, dents, motion blur`

### 6. mockup-cartoes
- **Seção:** Aplicações, “Cartões de visita”. Dois overlays: logo completo no cartão branco (esquerda) e símbolo no cartão escuro (direita).
- **Ferramenta:** Nano Banana / Gemini.
- **Composição para o `pin` inicial:** dois cartões lisos sobre uma placa de vidro: um **branco** inclinado à esquerda (≈18–43% × 30–66%), um **noite #0C1A2C** à direita (≈64–79% × 37–61%).
- **Prompt:**
  `Top-down photo of two blank business cards resting on a thick clear glass plate over a light concrete surface, one card pure white on the left slightly rotated, one card deep navy #0C1A2C on the right, both completely blank, the glass edge glowing faintly blue-green, hard late afternoon light casting a colored amber #ED8C00 and blue #0080C3 refraction on the concrete, 90mm macro, photorealistic, 3:2`
- **Evitar:** `text, logo, embossing, QR code, pens, coffee, hands, extra cards`

### 7. editorial-oficina
- **Seção:** Aplicações, ao lado do padrão de símbolos.
- **Ferramenta:** Midjourney v7, `--sref` da `editorial-fachada`.
- **Prompt:**
  `Black and white close-up of a glass cutting table in a workshop, a glass cutter scoring a straight line along an aluminum ruler on a large clear glass sheet, a gloved hand, fine glass dust, strong raking light from a window, crisp reflections, high contrast cool monochrome, 50mm f/2.8 --ar 3:2 --style raw --v 7`
- **Evitar:** `color, text, logos, blood, broken glass shards, messy clutter, CGI`

## Opcionais

### 8. mockup-uniforme
- **Seção:** Aplicações, “Uniforme”. Logo negativo entra em código no peito.
- **Ferramenta:** Nano Banana / Gemini.
- **Composição:** torso do instalador de frente, peito esquerdo (lado direito da foto) **liso** entre 54–68% × 36–50%.
- **Prompt:** `Waist-up photo of a glazier wearing a plain navy #1C4374 crew-neck work t-shirt with no print, holding work gloves, standing in a bright workshop with glass sheets behind him slightly out of focus, face cropped above the mouth, late afternoon sidelight, 50mm f/2.8, photorealistic, 4:5`
- **Evitar:** `logo, text, print, badge, name tag, wrinkles over the chest, sunglasses`

### 9. mockup-caneca
- **Seção:** Aplicações, “Caneca”. Símbolo entra em código (`multiply`).
- **Ferramenta:** Nano Banana / Gemini.
- **Composição:** caneca branca de frente, centro da face **lisa** em 40–56% × 38–56%.
- **Prompt:** `Photo of a plain white ceramic mug facing the camera on a workshop bench, next to a measuring tape and three small glass color samples in blue #0080C3, amber #ED8C00 and clear, the samples casting colored light on the bench, late afternoon light from the left, 50mm, photorealistic, square`
- **Evitar:** `logo, text, steam, coffee art, handle facing camera, cluttered bench`

### 10. editorial-reflexo
- **Prompt (Midjourney v7, `--sref` da fachada):** `Black and white interior photograph of a large frameless wall mirror reflecting a staircase and a tall window, geometric composition, crisp edges, high contrast cool monochrome, 35mm, architectural photography --ar 4:5 --style raw --v 7`
- **Evitar:** `photographer reflected, people, color, ornate frame, text`

### 11. editorial-guarda-corpo
- **Prompt (Midjourney v7, `--sref` da fachada):** `Black and white photograph of a frameless glass balcony railing on a high-rise apartment, the city skyline beyond, strong low sun creating bright reflections on the glass edge, minimal composition, high contrast cool monochrome, 35mm, straight horizon --ar 2:1 --style raw --v 7`
- **Evitar:** `people, color, text, logos, dramatic sky HDR, fisheye`

### 12. textura-vidro-colorido
- **Seção:** fundo da seção do símbolo (bem escurecido).
- **Ferramenta:** Flux 1.1 Pro (luz e cáusticas limpas) ou Midjourney com `--sref` do hero.
- **Prompt:** `Abstract photo of colored light shapes cast by tinted glass panes onto a light concrete floor, overlapping triangles of steel blue #0080C3, amber #ED8C00 and deep navy shadow #1C4374, sharp edges, hard late afternoon sun, minimal, top-down, 50mm, photographic realism, 3:2`
- **Evitar:** `objects, people, text, rainbow prism spectrum, blur, purple`

### 13. fechamento-vitral
- **Seção:** fundo do fechamento (escurecido).
- **Prompt (Midjourney v7, `--sref` do hero):** `Interior view of a tall modern window made of geometric glass panes in clear, steel blue #0080C3 and amber #ED8C00, seen from inside a dim room with navy walls #0C1A2C, sunlight projecting the colored shapes onto the floor, calm, architectural, 35mm f/4, film grain --ar 16:9 --style raw --v 7`
- **Evitar:** `church, religious stained glass, figures, lead lines ornaments, text, people`

---

## Se só der para gerar 3

1. **`hero-vidro-luz`**: define a atmosfera do case logo na abertura e serve de referência para as outras.
2. **`mockup-van`**: a peça mais forte de uma vidraçaria na rua, com o logo real em tamanho grande.
3. **`editorial-instalacao`**: mostra o serviço de verdade e dá o tom documental da colagem.
