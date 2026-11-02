# Equipamentaria: plano de imagens

Página: `/cases/equipamentaria/` · conteúdo: `cases/equipamentaria/case.json` · 8 essenciais + 5 opcionais, todas geradas por IA.

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/equipamentaria/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- equipamentaria images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/equipamentaria/img/`. As editoriais saem em P&B mesmo se a IA devolver um pouco de cor.
3. Recarregue a página: a imagem entra no lugar do placeholder, sem mexer em código.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **em branco** (baú liso, capacete liso, jaqueta lisa, placa lisa, cartões lisos, adesivo liso). O SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/equipamentaria/?pin`, arraste os 4 cantos sobre a superfície e cole o array no campo `pin` do mockup em `case.json`. As composições abaixo já batem com o `pin` padrão; o ajuste costuma ser fino.

**Feito em código, sem IA:** recortes gigantes do Q e da pá, faixa "Equipamentaria" em movimento, padrão com o símbolo, app de locação no celular, sistema do logo e blocos de cor.

**PNGs de referência do logo:** `cases/equipamentaria/ref/` (2000 px: transparente, sobre o escuro, sobre o claro e sobre o laranja, nas versões vertical, horizontal, sem descritor e só o símbolo).

## Coerência visual (vale para todas)

- **Luz:** fim de tarde ou hora azul num canteiro real. Luz natural fria e lateral, com pontos quentes de refletor de obra. Sem flash e sem fundo infinito de estúdio.
- **Lente:** 35 mm f/4 nas cenas de canteiro, 50 mm nos mockups, 85 mm nos objetos. Grão de filme leve.
- **Cor (coloridas):** sombras no azul quase preto `#0E1A2B`, médios no azul `#1D3557` e no concreto `#BDB8AE`, altas no cimento `#EEECE7`. O laranja `#F69D11` só em pontos: luz de refletor, cone, faixa de sinalização.
- **P&B:** contraste alto, pretos com textura, poeira e água visíveis, grão de filme 400 ISO.
- **Materiais:** concreto aparente, aço, madeira de fôrma, lona, tecido de brim. Nada de marca de fabricante visível (Bosch, Makita, CAT etc.).

**Gere primeiro `editorial-operario`.** É a âncora de luz, lente e grão: use a URL em `--sref` no Midjourney ou anexe como referência de luz no Nano Banana / GPT Image ("match lighting, lens and grain of the reference, not its colors"). Em seguida gere `hero-canteiro`, a âncora de **cor** para os mockups.

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `editorial-operario.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial · **gerar primeiro** |
| 2 | `hero-canteiro.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial |
| 3 | `mockup-caminhao.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 4 | `mockup-capacete.webp` | Aplicações | 4:5 · 1600×2000 | GPT Image | essencial |
| 5 | `editorial-perfuracao.webp` | Aplicações | 3:2 · 2400×1600 | Midjourney v7 | essencial |
| 6 | `mockup-uniforme.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | essencial |
| 7 | `editorial-hidrojateamento.webp` | Aplicações | 3:2 · 2400×1600 | Midjourney v7 | essencial |
| 8 | `mockup-placa-obra.webp` | Aplicações | 3:2 · 2400×1600 | GPT Image | essencial |
| 9 | `textura-concreto.webp` | Símbolo (fundo) | 3:2 · 2400×1600 | Flux 1.1 Pro | opcional |
| 10 | `mockup-cartoes.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | opcional |
| 11 | `mockup-adesivo.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | opcional |
| 12 | `editorial-ferramentas.webp` | Aplicações (faixa larga final) | 2:1 · 2400×1200 | Midjourney v7 | opcional |
| 13 | `editorial-deposito.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |

Opcionais que faltarem somem do site publicado; no `npm run dev` aparecem como placeholder.

---

## Essenciais

### 1. `editorial-operario` (gerar primeiro)
- **Seção:** Aplicações, primeira foto da colagem. Espelha o símbolo: alguém em passo largo com a ferramenta no ombro.
- **Proporção:** 4:5 · 1600×2000. **Ferramenta:** Midjourney v7 (melhor P&B editorial; o `--sref` dela amarra a série).
- **Logo para anexar:** nenhum. Opcional: `equipamentaria-symbol-transparent.png` só como referência de pose (não de estilo).
- **Prompt:**
  > Black and white documentary photograph of a construction worker in a hard hat and work boots striding across a concrete construction site, carrying a long-handled shovel over his right shoulder, mid-step with a wide lunge, seen in three-quarter profile from a low angle. Raw concrete columns and rebar in the soft background, late afternoon side light, dust in the air. 35mm lens, f/4, Tri-X 400 film grain, deep blacks with texture, high contrast, editorial magazine photography.
  > `--ar 4:5 --style raw --v 7`
- **Evitar:** logos ou texto na roupa, colete com marca, rosto em close, pose de estoque sorrindo, cor, HDR, ferramentas elétricas.

### 2. `hero-canteiro`
- **Seção:** Intro, fundo atrás do logo (fica escurecido; o centro precisa ser calmo).
- **Proporção:** 16:9 · 2400×1350. **Ferramenta:** Midjourney v7, depois Magnific para subir detalhe.
- **Logo para anexar:** nenhum.
- **Prompt:**
  > Wide cinematic photograph of a construction site at blue hour, unfinished concrete building structure with formwork and scaffolding, deep navy sky #0E1A2B, the concrete tinted in cold blue #1D3557, a few warm orange work floodlights #F69D11 glowing on the left edge, soft haze, large calm dark negative space in the center, no people. 35mm lens, f/4, subtle film grain, moody, minimal.
  > `--ar 16:9 --style raw --v 7`
- **Evitar:** guindaste no centro, céu laranja de pôr do sol, texto, placas, letreiros, pessoas, excesso de luzes.

### 3. `mockup-caminhao`
- **Seção:** Aplicações, foto larga logo depois dos recortes. **Overlay:** versão horizontal, positiva, `multiply`.
- **Proporção:** 3:2 · 2400×1600. **Ferramenta:** Nano Banana (Gemini): respeita superfície lisa e perspectiva frontal.
- **Logo para anexar:** nenhum na geração (o logo entra no código). Anexe `editorial-operario` e `hero-canteiro` como referência de luz e cor.
- **Prompt:**
  > Photorealistic side view of a medium delivery truck with a plain flat light grey box body #EEECE7, completely blank, no text, no logo, navy blue cab #1D3557, parked on a dirt road at a construction site in late afternoon light. The truck box faces the camera almost straight on, filling the middle third of the frame, horizontally centered. Concrete structure and orange safety cones #F69D11 in the soft background. 50mm lens, f/5.6, natural light, subtle film grain.
- **Composição para o pin:** o baú liso ocupa de 30% a 72% na horizontal e de 38% a 52% na vertical, de frente.
- **Evitar:** texto, logos, placas de carro legíveis, marca do caminhão, adesivos, sujeira cobrindo o baú, perspectiva forte.

### 4. `mockup-capacete`
- **Seção:** Aplicações, ao lado da foto de perfuração. **Overlay:** símbolo, positivo, `multiply`.
- **Proporção:** 4:5 · 1600×2000. **Ferramenta:** GPT Image (bom com objeto único e superfície limpa).
- **Prompt:**
  > Product photograph of a plain white construction hard hat, no logo, no stickers, resting on a raw concrete slab, front of the helmet facing the camera, centered. Behind it, out-of-focus rebar and a navy blue tarp #1D3557. Soft late afternoon side light from the left, gentle shadow. 85mm lens, f/4, realistic plastic texture, subtle dust.
- **Composição para o pin:** a área lisa da frente do capacete fica entre 40% e 58% na horizontal e 40% e 56% na vertical.
- **Evitar:** adesivos, texto, capacete amarelo, reflexos estourados, mãos, fundo branco de estúdio.

### 5. `editorial-perfuracao`
- **Seção:** Aplicações. Mostra o serviço de perfuração citado no site.
- **Proporção:** 3:2 · 2400×1600. **Ferramenta:** Midjourney v7, com `--sref` da imagem 1.
- **Prompt:**
  > Black and white documentary photograph of a worker core drilling through a concrete slab with a heavy drilling rig, wearing gloves, hard hat and ear protection, concrete dust and water slurry spraying, close and low angle, hands and machine in focus, background falling into shadow. 35mm lens, f/4, Tri-X 400 grain, high contrast, editorial.
  > `--ar 3:2 --style raw --v 7`
- **Evitar:** marcas na máquina, texto, rosto em close, cor, faíscas exageradas.

### 6. `mockup-uniforme`
- **Seção:** Aplicações. **Overlay:** versão sem descritor, negativa, `screen` (logo claro sobre o tecido escuro).
- **Proporção:** 4:5 · 1600×2000. **Ferramenta:** Nano Banana (Gemini).
- **Prompt:**
  > Photograph of the back of a worker wearing a plain navy blue work jacket #1D3557 with one horizontal reflective silver stripe across the lower back, completely blank upper back with no text and no logo, standing on a construction site, shot from behind at shoulder height, centered. Soft late afternoon side light, background blurred concrete and orange safety netting #F69D11. 50mm lens, f/2.8, realistic canvas texture.
- **Composição para o pin:** área lisa entre as omoplatas, de 34% a 66% na horizontal e de 30% a 48% na vertical.
- **Evitar:** texto, logos, estampas, colete laranja cobrindo as costas, rosto.

### 7. `editorial-hidrojateamento`
- **Seção:** Aplicações. Mostra o serviço de hidrojateamento citado no site.
- **Proporção:** 3:2 · 2400×1600. **Ferramenta:** Midjourney v7, com `--sref` da imagem 1.
- **Prompt:**
  > Black and white action photograph of a worker in waterproof gear using a high-pressure water jet lance to clean a stained concrete wall, the jet frozen mid-air with thousands of droplets, clean stripe revealed on the dark wall, strong backlight making the spray glow. 35mm lens, 1/2000s, Tri-X 400 grain, high contrast, editorial.
  > `--ar 3:2 --style raw --v 7`
- **Evitar:** cor, arco-íris, marcas no equipamento, texto, rosto em close.

### 8. `mockup-placa-obra`
- **Seção:** Aplicações. **Overlay:** versão horizontal, positiva, `multiply`.
- **Proporção:** 3:2 · 2400×1600. **Ferramenta:** GPT Image.
- **Prompt:**
  > Photograph of a large blank white rectangular construction site sign mounted on a corrugated metal hoarding fence painted navy blue #1D3557, the sign completely empty with no text, seen almost straight on and centered. Unfinished concrete building rising behind the fence, late afternoon light, an orange safety cone #F69D11 at the base. 35mm lens, f/5.6, natural light, subtle grain.
- **Composição para o pin:** a placa fica de 26% a 74% na horizontal e de 30% a 54% na vertical, de frente.
- **Evitar:** qualquer texto ou número na placa, grafite, cartazes, perspectiva forte.

---

## Opcionais

### 9. `textura-concreto`
- **Seção:** Símbolo, fundo atrás do símbolo (fica escurecido). **Ferramenta:** Flux 1.1 Pro (texturas realistas e uniformes). **Proporção:** 3:2 · 2400×1600.
- **Prompt:**
  > Close-up of raw architectural concrete wall with plywood formwork marks and small air holes, evenly lit by soft raking light, color graded deep navy #1D3557 to near black #0E1A2B, no objects, seamless texture, high detail, subtle grain.
- **Evitar:** rachaduras grandes, pichação, manchas de ferrugem, cor quente.

### 10. `mockup-cartoes`
- **Seção:** Aplicações. **Overlay:** sem descritor, positiva, `multiply`, no cartão claro da esquerda. **Ferramenta:** Nano Banana (Gemini). **Proporção:** 3:2 · 2400×1600.
- **Prompt:**
  > Top-down photograph of two blank business cards on a wooden construction clipboard, the left card plain off-white #EEECE7, the right card plain navy #1D3557, both completely empty, a pencil and a folded tape measure beside them, soft window light from the left. 50mm lens, f/5.6, realistic paper texture.
- **Composição para o pin:** o cartão claro fica de 22% a 46% na horizontal e de 36% a 62% na vertical, reto.
- **Evitar:** texto, números, logos, cartões tortos ou sobrepostos.

### 11. `mockup-adesivo`
- **Seção:** Aplicações. **Overlay:** horizontal, positiva, `multiply`. **Ferramenta:** Nano Banana (Gemini). **Proporção:** 3:2 · 2400×1600.
- **Prompt:**
  > Close photograph of a plate compactor machine on a construction site with a blank white rectangular vinyl sticker on its flat metal side panel, the sticker completely empty, panel painted navy blue #1D3557, light dust on the metal, late afternoon side light. 50mm lens, f/4, realistic.
- **Composição para o pin:** o adesivo fica de 32% a 68% na horizontal e de 40% a 56% na vertical, de frente.
- **Evitar:** marca do fabricante, texto, número de série, adesivos extras.

### 12. `editorial-ferramentas`
- **Seção:** Aplicações, faixa larga que fecha a colagem. **Ferramenta:** Midjourney v7, com `--sref` da imagem 1. **Proporção:** 2:1 · 2400×1200.
- **Prompt:**
  > Black and white photograph of a row of demolition hammers and core drills standing on a steel rack inside a rental warehouse, repeated shapes receding in perspective, light from high windows, dust in the air. 35mm lens, f/4, Tri-X 400 grain, high contrast, editorial.
  > `--ar 2:1 --style raw --v 7`
- **Evitar:** marcas, etiquetas legíveis, pessoas, cor.

### 13. `editorial-deposito`
- **Seção:** Fechamento, fundo atrás da frase final (fica escurecido). **Ferramenta:** Midjourney v7, com `--sref` da imagem 1. **Proporção:** 16:9 · 2400×1350.
- **Prompt:**
  > Black and white wide photograph of an equipment rental yard at dusk, stacked scaffolding frames and a line of concrete mixers, empty, calm, large dark sky taking the upper half. 35mm lens, f/5.6, Tri-X 400 grain, high contrast.
  > `--ar 16:9 --style raw --v 7`
- **Evitar:** pessoas, texto, placas, letreiros, cor.

---

## Se der para gerar só 3

1. `editorial-operario`: espelha o símbolo em foto e dá o tom de toda a série.
2. `mockup-caminhao`: a aplicação mais forte para uma locadora (é o que o cliente vê chegar na obra).
3. `hero-canteiro`: a primeira tela do case.
