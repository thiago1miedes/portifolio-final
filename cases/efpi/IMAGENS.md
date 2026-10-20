# EFPI — plano de imagens

Página: `/cases/efpi/` · conteúdo: `cases/efpi/case.json` · 7 essenciais + 4 opcionais.

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/efpi/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- efpi images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/efpi/img/`. As fotos editoriais saem em P&B mesmo se a IA devolver um pouco de cor.
3. Recarregue a página. A imagem aparece no lugar do placeholder, sem mexer em código.
   Se preferir, salve direto um `.webp` em `public/brand/efpi/img/<id>.webp`.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **em branco**: o SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/efpi/?pin`, arraste os 4 cantos sobre a superfície e cole o array que aparece no campo `pin` do mockup em `case.json`.

**Feito em código, sem IA:** recortes gigantes do logotipo, faixa "EFPI" em movimento, padrão geométrico do símbolo, app do aluno, sistema do logo e blocos de cor.

## Coerência visual (vale para todas)

- **Luz:** janela suave vindo da esquerda da câmera, clima *low-key*, sombras profundas mas abertas, sem flash.
- **Lente:** 50 mm (35 mm nos planos abertos), f/2.8, pouca profundidade de campo, grão de filme leve.
- **Cor (imagens coloridas):** grading frio e dessaturado. Sombras puxando para `#0F1C2E`, médios em `#1D3557` / `#457B9D`, altas em `#F2F5F8`. O âmbar `#EC9D20` só onde estiver indicado.
- **P&B:** preto e branco com boa gama tonal, pretos foscos (sem esmagar), tonalização neutra a fria, grão leve.

**Gere primeiro `editorial-estudante`.** É a âncora de luz, lente e grão da série:
- no Midjourney, use a URL dela em `--sref` nas outras fotos P&B;
- no Nano Banana / GPT Image, anexe-a como referência de luz ("match the lighting direction, softness and grain of the reference, not its colors").

Gere `hero-prisma` em seguida: é a âncora de cor para `textura-vidro`.

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `editorial-estudante.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial · **gerar primeiro** |
| 2 | `hero-prisma.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial |
| 3 | `editorial-dialogo.webp` | Aplicações | 3:2 · 2000×1333 | Midjourney v7 | essencial |
| 4 | `editorial-maos-livro.webp` | Aplicações | 1:1 · 1500×1500 | Midjourney v7 | essencial |
| 5 | `mockup-cartoes.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 6 | `mockup-caneca.webp` | Aplicações | 4:5 · 1600×2000 | GPT Image | essencial |
| 7 | `mockup-caixa.webp` | Aplicações | 1:1 · 1800×1800 | Nano Banana (Gemini) | essencial |
| 8 | `textura-vidro.webp` | Símbolo (fundo) | 3:2 · 2400×1600 | Midjourney v7 / Flux 1.1 Pro | opcional |
| 9 | `editorial-sala.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |
| 10 | `mockup-placa.webp` | Aplicações | 3:2 · 2400×1600 | Flux 1.1 Pro | opcional |
| 11 | `mockup-caderno.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | opcional |

Opcionais que faltarem somem do site publicado; no `npm run dev` elas aparecem como placeholder para você ver o lugar.

---

## Essenciais

### 1. `editorial-estudante` — gerar primeiro
- **Seção:** Aplicações (foto grande à esquerda, primeira da colagem).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7. É o que tem melhor estética editorial em P&B, e o `--sref` dela vai amarrar a série.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white portrait of a young adult student reading a book at a wooden table beside a tall window, soft directional window light from camera left, low-key, deep open shadows, calm concentrated expression, three-quarter view, simple dark interior, rich tonal range, matte blacks, subtle film grain, shot on 50mm lens at f/2.8, shallow depth of field, documentary feel, quiet and intelligent mood --ar 4:5 --style raw --v 7 --s 120
  ```
- **Evitar:** `--no text, logo, letters, watermark, color, harsh flash, studio backdrop, smiling at camera, glasses glare`

### 2. `hero-prisma`
- **Seção:** Intro (fundo da abertura escura, atrás do logo).
- **Proporção / tamanho:** 16:9 · 2400×1350. Se sair menor, amplie no **Magnific** (modo Precision, *creativity* baixo).
- **Ferramenta:** Midjourney v7, que é ótimo em refração e atmosfera. Alternativa: Flux 1.1 Pro Ultra.
- **Logo para anexar (opcional):** `cases/efpi/ref/efpi-symbol-transparent.png` como referência de **forma** com peso baixo (`--iw 0.4`), só para o prisma lembrar a silhueta do símbolo. O logo real entra por código por cima.
- **Composição:** a imagem fica atrás do logo, então o centro precisa ficar escuro e limpo. O prisma vai para o terço direito ou para baixo.
- **Prompt:**
  ```
  A single faceted glass prism resting on a dark surface in near darkness, one thin beam of soft light enters from the left and refracts into a faint cool spectrum of steel blue #457B9D and pale blue #B3CBDA with one tiny warm amber #EC9D20 glint, deep navy atmosphere #0F1C2E with subtle haze, background fading to #1D3557, large calm negative space in the center and left, prism placed in the lower right third, low-key cinematic lighting, shot on 50mm at f/2.8, shallow depth of field, subtle film grain, minimal, premium --ar 16:9 --style raw --v 7 --s 150
  ```
- **Evitar:** `--no text, logo, letters, rainbow colors, saturated spectrum, neon, lens flare stars, busy background, multiple prisms, hands`

### 3. `editorial-dialogo`
- **Seção:** Aplicações (ao lado dos cartões).
- **Proporção / tamanho:** 3:2 · 2000×1333.
- **Ferramenta:** Midjourney v7 com `--sref <URL de editorial-estudante>`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of three adults in an open conversation around a table with notebooks and coffee cups, one person gesturing while explaining an idea, others listening attentively, natural window light from camera left, low-key, candid documentary moment, hands and faces partly in shadow, rich tonal range, matte blacks, subtle film grain, shot on 35mm lens at f/2.8 --ar 3:2 --style raw --v 7 --sref <url-editorial-estudante> --sw 60
  ```
- **Evitar:** `--no text, logo, letters, color, laptop screens with UI, posed group smile, corporate stock look, flash`

### 4. `editorial-maos-livro`
- **Seção:** Aplicações (quadrado à direita, ao lado do app).
- **Proporção / tamanho:** 1:1 · 1500×1500.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-estudante`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Close-up black and white photograph of two hands holding an open book, one finger marking a line, pages slightly curved, soft window light from camera left grazing the paper texture, deep shadows around, shallow depth of field, subtle film grain, shot on 50mm macro at f/2.8, quiet focused mood --ar 1:1 --style raw --v 7 --sref <url-editorial-estudante> --sw 60
  ```
- **Evitar:** `--no text, readable words, logo, color, rings, nail polish, phone`

### 5. `mockup-cartoes`
- **Seção:** Aplicações (grande, linha dos cartões).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Segue bem "cartões lisos, sem texto" e dá para corrigir por edição ("remove any print from the cards").
- **Logo para anexar:** **nenhum.** Se quiser, anexe `editorial-estudante` só como referência de luz.
- **Composição (combina com o `pin` padrão):** vista de cima. Cartão **branco** à esquerda, girado cerca de −8°. Cartão **azul-marinho** à direita, girado cerca de +6°, com uma pequena folga entre os dois. Cada cartão ocupa uns 36% da largura.
- **Prompt:**
  ```
  Top-down product photo of two completely blank business cards (85×55 mm proportion) lying on a light grey stone surface #F2F5F8: a matte white card on the left rotated about -8 degrees and a matte deep navy card #1D3557 on the right rotated about +6 degrees, small gap between them, each card about one third of the frame width, centered composition, soft directional window light from the left with gentle long shadows, subtle paper texture, realistic, high detail, no printing on the cards
  ```
- **Evitar:** text, logo, letters, numbers, QR code, embossing, foil, extra cards, pens, plants, dramatic shadows.

### 6. `mockup-caneca`
- **Seção:** Aplicações (linha da caneca e do app).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** GPT Image (ChatGPT). Bom com objetos limpos em estúdio e respeita "sem estampa".
- **Logo para anexar:** nenhum.
- **Composição (combina com o `pin` padrão):** caneca centralizada, de frente, alça à direita. O corpo ocupa uns 45% da largura, com a área de impressão bem no meio do quadro.
- **Prompt:**
  ```
  Studio product photo of a plain matte white ceramic mug, completely blank with no print, centered and facing the camera with the handle on the right, standing on a pale grey table #F2F5F8 against a deep navy wall #1D3557 with soft gradient, soft window light from the left, gentle reflection on the glaze, subtle shadow, shot on 50mm at f/4, calm minimal composition, realistic
  ```
- **Evitar:** text, logo, pattern, steam, coffee splash, spoons, saucer, hands, extra objects.

### 7. `mockup-caixa`
- **Seção:** Aplicações (kit de boas-vindas).
- **Proporção / tamanho:** 1:1 · 1800×1800.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image), que controla bem material e ângulo.
- **Logo para anexar:** nenhum.
- **Composição (combina com o `pin` padrão):** caixa rígida azul-marinho fechada, vista de 3/4 de cima. A tampa aparece como uma face grande na parte superior central do quadro.
- **Prompt:**
  ```
  Product photo of a closed rigid gift box with a lid, matte deep navy #1D3557 paper finish, completely blank with no print, seen from a high three-quarter angle so the lid top is the largest visible face in the upper middle of the frame, placed on a light grey surface #F2F5F8, soft window light from the left, subtle edge highlights, soft contact shadow, minimal premium welcome-kit feel, realistic, high detail
  ```
- **Evitar:** text, logo, ribbon, tissue paper, foil stamping, open lid, extra boxes, plants.

---

## Opcionais

### 8. `textura-vidro`
- **Seção:** Símbolo (fundo sutil, em baixa opacidade).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Midjourney v7 com `--sref <URL de hero-prisma>`, ou Flux 1.1 Pro.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Macro abstract photograph of faceted glass edges and planes in darkness, light refracting along the facets in steel blue #457B9D and pale blue #B3CBDA, deep navy shadows #0F1C2E, crisp geometric highlights, very dark overall, lots of negative space, shot on 100mm macro at f/4, subtle grain --ar 3:2 --style raw --v 7 --sref <url-hero-prisma>
  ```
- **Evitar:** `--no text, logo, rainbow, warm colors, bokeh circles, objects, hands`

### 9. `editorial-sala`
- **Seção:** Fechamento (fundo escuro, bem apagado).
- **Proporção / tamanho:** 16:9 · 2400×1350.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-estudante`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Black and white photograph of an empty classroom at dusk, rows of simple chairs and desks, tall windows on the left casting long soft light across the floor, quiet and hopeful mood, wide composition with calm negative space in the center, low-key, rich tonal range, subtle film grain, shot on 35mm at f/4 --ar 16:9 --style raw --v 7 --sref <url-editorial-estudante> --sw 60
  ```
- **Evitar:** `--no text, writing on board, logo, people, color, clutter, fluorescent lights`

### 10. `mockup-placa`
- **Seção:** Aplicações (placa de fachada).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Flux 1.1 Pro, ótimo em materiais arquitetônicos fotorrealistas.
- **Logo para anexar:** nenhum.
- **Composição (combina com o `pin` padrão):** placa vista quase de frente, ocupando o centro (cerca de 40% × 36% do quadro).
- **Prompt:**
  ```
  Architectural photo of a blank matte white acrylic sign plate mounted with four small steel standoffs on a light concrete wall, seen almost straight on, plate centered and occupying about 40 percent of the frame width, soft daylight from the left creating a subtle shadow behind the plate, minimal, realistic, shot on 50mm at f/5.6
  ```
- **Evitar:** text, logo, letters, house numbers, plants, people, graffiti.

### 11. `mockup-caderno`
- **Seção:** Aplicações (caderno).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image).
- **Logo para anexar:** nenhum.
- **Composição (combina com o `pin` padrão):** caderno fechado visto de cima, levemente girado, ocupando quase todo o quadro.
- **Prompt:**
  ```
  Top-down photo of a closed hardcover notebook with a matte deep navy cover #1D3557, completely blank, slightly rotated, filling most of the frame, on a pale grey linen surface #F2F5F8, soft window light from the left, subtle cover texture, realistic, minimal
  ```
- **Evitar:** text, logo, elastic band, pen, stickers, embossing, extra objects.

---

## Se der para gerar só 3

1. **`hero-prisma`**: é a primeira coisa que se vê e traduz o conceito do prisma.
2. **`editorial-estudante`**: traz o segmento e o lado humano, e serve de âncora da série.
3. **`mockup-cartoes`**: mostra o logo em positivo e negativo num objeto real.

## Referências do logo (PNG 2000 px)

Geradas por `npm run brand -- efpi refs` em `cases/efpi/ref/`:
`efpi-lockup-transparent.png` · `efpi-lockup-dark.png` · `efpi-lockup-light.png` · `efpi-lockup-accent.png` · `efpi-symbol-transparent.png` · `efpi-symbol-dark.png`.
