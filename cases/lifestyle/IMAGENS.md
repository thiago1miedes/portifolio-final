# LifeStyle — plano de imagens

Página: `/cases/lifestyle/` · conteúdo: `cases/lifestyle/case.json` · 9 mockups reais já aplicados + 9 imagens para gerar por IA (4 essenciais e 5 opcionais).

## O que já está na página (sem IA)

Os 9 mockups da pasta `LifeStyle/Projeto Case` entraram como recortes (PNG sem fundo, `kind: "cutout"` e a faixa `kind: "track"`):

| id | arquivo de origem | onde entra |
|---|---|---|
| `mockup-papelaria` | Agrupar 3.png | Aplicações, ao lado da primeira foto |
| `mockup-cartoes` | Agrupar 2.png | Aplicações, entre o recorte "Li" e o mosaico |
| `mockup-bolsa` · `mockup-xicara` · `mockup-estojo` · `mockup-botton` · `mockup-almofada` | Agrupar 1, 5, 6, 7 e 8 | faixa "Objetos do dia a dia" |
| `mockup-kit` | Agrupar 4.png | Aplicações, largura quase total |
| `mockup-digital` | Agrupar 9.png | Aplicações, largura quase total |

Eles têm de 600 a 1.400 px de largura e ficam um pouco moles em tela retina. Se você tiver exportações maiores, salve por cima em `cases/lifestyle/raw/<id>.png` (mesmo id) e rode `npm run brand -- lifestyle images`.

**Feito em código, sem IA:** a abertura (contorno do símbolo, preenchimento e brilho), a grade 3 × 3 e a peça que sobe no símbolo, a letra gigante da Inter, os blocos de cor, o sistema do logo, os recortes gigantes do "Li" e do "St", a faixa "LifeStyle" em movimento, o padrão com o símbolo e o mosaico de formas no módulo do símbolo.

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/lifestyle/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- lifestyle images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/lifestyle/img/`. As fotos marcadas como P&B saem em preto e branco mesmo se a IA devolver um pouco de cor.
3. Recarregue a página. A imagem aparece no lugar do placeholder, sem mexer em código.

**Mockups (recepção e crachá):** o logo nunca vem da IA. Gere a parede e o crachá **lisos**. O SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/lifestyle/?pin`, arraste os 4 cantos sobre a superfície e cole o array que aparece no campo `pin` do mockup em `case.json`.

## Coerência visual (vale para todas)

- **Luz:** natural e lateral, de janela, quente no fim de tarde (cenas de cor) e suave de dia (P&B). Sombras profundas e abertas. Nada de flash, fundo infinito ou luz de banco de imagem.
- **Lente:** 50 mm f/2 nos retratos e cenas, 35 mm nos ambientes, 100 mm macro na textura. Pouca profundidade de campo, grão de filme leve.
- **Cor (imagens coloridas):** sombras puxando para o bordô noturno `#2B0A08`, médios no bordô `#5D140F`, altas no papel `#F4F0EC`; o laranja `#EC6C1D` só como luz ou detalhe. Nada de azul, verde-água ou roxo.
- **P&B:** preto e branco com tom levemente quente, boa gama tonal, pretos foscos, grão leve.
- **Gente:** profissionais reais de 25 a 50 anos, roupa de escritório casual (camisa, malha, blazer aberto), expressão de escuta e conversa. Nada de aperto de mão posado, terno escuro e gravata ou sorriso de banco de imagem.

**Gere primeiro `editorial-entrevista`.** É a âncora de luz, lente e grão da série P&B:
- no Midjourney, use a URL dela em `--sref` nas outras fotos P&B;
- no Nano Banana / GPT Image, anexe-a como referência ("match the lighting, softness and grain of the reference").

Gere `hero-atmosfera` em seguida: é a âncora de **cor** para `textura-feltro` e para os dois mockups (anexe como referência de grading).

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `editorial-entrevista.webp` | Aplicações (primeira foto) | 4:5 · 1600×2000 | Midjourney v7 | essencial · **gerar primeiro** |
| 2 | `hero-atmosfera.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial |
| 3 | `editorial-workshop.webp` | Aplicações (ao lado do padrão) | 3:2 · 2400×1600 | Midjourney v7 | essencial |
| 4 | `editorial-rotina.webp` | Aplicações (ao lado do "St") | 4:5 · 1600×2000 | Midjourney v7 | essencial |
| 5 | `mockup-recepcao.webp` | Aplicações (faixa larga) | 2:1 · 2400×1200 | Nano Banana (Gemini) | opcional |
| 6 | `editorial-cafe.webp` | Aplicações (penúltima) | 3:2 · 2400×1600 | Midjourney v7 | opcional · gere junto com a 7 |
| 7 | `mockup-cracha.webp` | Aplicações (última) | 4:5 · 1600×2000 | Nano Banana (Gemini) | opcional · gere junto com a 6 |
| 8 | `textura-feltro.webp` | Símbolo (fundo) | 3:2 · 2400×1600 | Flux 1.1 Pro / Midjourney v7 | opcional |
| 9 | `editorial-movimento.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |

Opcionais que faltarem somem do site publicado; no `npm run dev` elas aparecem como placeholder para você ver o lugar. As 6 e 7 dividem a mesma linha da colagem: gere as duas, ou nenhuma, para a linha não ficar pela metade.

---

## Essenciais

### 1. `editorial-entrevista` — gerar primeiro
- **Seção:** Aplicações (foto alta à esquerda, primeira da colagem, ao lado da papelaria).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7. Melhor estética editorial em P&B, e o `--sref` dela amarra a série.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a job interview in a bright modern office, shot over the shoulder of the candidate whose head and shoulder are softly out of focus in the left foreground, a female HR professional in her thirties sitting across a light wooden table, listening attentively with a slight warm smile, a printed resume and a pen on the table, a ceramic coffee cup, soft directional window light from camera right, calm and human atmosphere, rich tonal range, matte blacks, subtle film grain, shot on 50mm lens at f/2, shallow depth of field, documentary corporate portrait --ar 4:5 --style raw --v 7 --s 120
  ```
- **Evitar:** `--no text, readable words, logo, color, laptop logo, name badge, handshake, suit and tie, harsh flash, cluttered background`

### 2. `hero-atmosfera`
- **Seção:** Intro (fundo da abertura escura, atrás do símbolo que se desenha).
- **Proporção / tamanho:** 16:9 · 2400×1350. Se sair menor, amplie no **Magnific** (modo Precision, *creativity* baixo, para não inventar textura na parede).
- **Ferramenta:** Midjourney v7, ótimo em luz e atmosfera. Alternativa: Flux 1.1 Pro Ultra.
- **Logo para anexar:** nenhum. O logo real entra por código por cima.
- **Composição:** a imagem fica atrás do logo, então o centro precisa ficar escuro e limpo. As faixas de luz da persiana entram pela direita e descem em diagonal; a cadeira fica no canto de baixo. As faixas conversam com as linhas verticais do caderno e do envelope.
- **Prompt:**
  ```
  Late afternoon warm orange sunlight #EC6C1D streaming through venetian blinds and painting parallel diagonal stripes of light across a smooth deep burgundy wall #5D140F in an empty modern office, the stripes entering from the right edge, the silhouette of a minimalist office chair in the lower right corner, shadows falling into almost black maroon #2B0A08, large calm dark negative space in the center, faint dust in the light beams, cinematic, minimal architectural still life, shot on 35mm at f/4, fine film grain --ar 16:9 --style raw --v 7 --s 150
  ```
- **Evitar:** `--no text, logo, letters, people, visible window, plants, blue, teal, purple, neon, busy decor`

### 3. `editorial-workshop`
- **Seção:** Aplicações (foto larga à esquerda do padrão com o símbolo).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-entrevista`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white close-up of several hands placing blank sticky notes on a glass wall during a team workshop, the notes arranged in loose columns, one hand holding a marker, colleagues softly blurred in the background, soft daylight from the left, collaborative energy, rich tonal range, matte blacks, subtle film grain, shot on 35mm at f/2.8 --ar 3:2 --style raw --v 7 --sref <url-editorial-entrevista> --sw 60
  ```
- **Evitar:** `--no text, readable writing, logo, color, faces in focus, whiteboard clutter, laptops`

### 4. `editorial-rotina`
- **Seção:** Aplicações (foto alta à esquerda do recorte gigante "St"). É a imagem do "estilo de vida": o trabalho dentro do dia.
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-entrevista`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a young professional woman walking to work on a city sidewalk in the early morning, seen from the side in mid-stride, a structured leather bag on her shoulder and a takeaway coffee cup in hand, long diagonal shadows from the low sun, a modern building facade with strong vertical lines behind her, quiet and confident mood, rich tonal range, matte blacks, subtle film grain, shot on 50mm at f/2.8 --ar 4:5 --style raw --v 7 --sref <url-editorial-entrevista> --sw 60
  ```
- **Evitar:** `--no text, logo, brand names on cup or bag, color, cars in focus, crowd, headphones, phone in hand`

---

## Opcionais

### 5. `mockup-recepcao`
- **Seção:** Aplicações (faixa larga depois do "St").
- **Proporção / tamanho:** 2:1 · 2400×1200.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Mantém superfícies lisas e linhas retas em interiores; dá para pedir correções por texto ("make the wall emptier"). Alternativa: GPT Image.
- **Logo para anexar:** nenhum na geração. O logo positivo entra por código em `multiply`, na área vazia da parede (pin padrão: 34–66 % na horizontal, 26–52 % na vertical).
- **Anexar como referência de cor:** `hero-atmosfera`.
- **Prompt:**
  ```
  Photorealistic interior of a small modern office reception, a smooth blank warm off-white wall #F4F0EC filling the upper half of the frame with a large empty area in the center reserved for a sign, a low light-wood bench and a tall potted plant on the right, a burgundy #5D140F upholstered armchair on the left, a thin orange #EC6C1D stripe on the rug, soft daylight from the left, calm, corporate and welcoming, architectural interior photography, 24mm lens at f/8, perfectly straight vertical lines, aspect ratio 2:1
  ```
- **Evitar:** text, logo, signage, letters, numbers, pictures or frames on the wall, screens, people, reflections on the wall.

### 6. `editorial-cafe`
- **Seção:** Aplicações (penúltima linha, à esquerda do crachá).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-entrevista`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of two colleagues laughing during a coffee break in a bright office pantry, both holding ceramic cups, one leaning on the counter, candid and warm moment, natural window light from the left, rich tonal range, matte blacks, subtle film grain, shot on 35mm at f/2 --ar 3:2 --style raw --v 7 --sref <url-editorial-entrevista> --sw 60
  ```
- **Evitar:** `--no text, logo, color, brand names on cups, posed stock smile, clutter, coffee machine logo`

### 7. `mockup-cracha`
- **Seção:** Aplicações (última linha, à direita do café).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini). Bom em produto limpo e respeita "blank surface".
- **Logo para anexar:** nenhum na geração. O logo positivo entra por código em `multiply` sobre o cartão (pin padrão: 33–67 % na horizontal, 44–66 % na vertical).
- **Anexar como referência de cor:** `hero-atmosfera`.
- **Prompt:**
  ```
  Photorealistic product shot of a blank white event badge card in a clear plastic holder hanging from a plain orange #EC6C1D lanyard, centered and facing the camera, against a smooth deep burgundy #5D140F paper background, soft studio light from the upper left with a gentle shadow below, the card perfectly blank, premium and minimal, 85mm lens at f/5.6, aspect ratio 4:5
  ```
- **Evitar:** text, logo, letters, QR code, photo on the badge, extra badges, hands, clips with brand names.

### 8. `textura-feltro`
- **Seção:** Símbolo (fundo apagado, a 30 % de opacidade, atrás da grade 3 × 3).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Flux 1.1 Pro (texturas nítidas e sem artefato). Alternativa: Midjourney v7.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Macro photograph of deep burgundy wool felt #5D140F filling the whole frame, soft visible fibers, warm raking light from the left with faint orange glints #EC6C1D on the fiber tips, shadows falling into near-black maroon #2B0A08, abstract full-frame texture, no objects, shot on 100mm macro at f/4, fine grain
  ```
- **Evitar:** text, logo, objects, stitching, patterns, folds, blue or purple cast.

### 9. `editorial-movimento`
- **Seção:** Fechamento (fundo apagado atrás de "Espaço para cada um se mover").
- **Proporção / tamanho:** 16:9 · 2400×1350.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-entrevista`.
- **Logo para anexar:** nenhum.
- **Composição:** o texto fica por cima, à esquerda e no centro; as pessoas passam pelo terço direito.
- **Prompt:**
  ```
  Editorial black and white long exposure photograph of people walking across the lobby of a modern office building, the walkers rendered as soft motion-blur ghosts in the right third of the frame, the architecture sharp, a grid of tall windows and columns, light coming from the right, calm sense of movement, the left and center of the frame darker and quiet, rich tonal range, matte blacks, subtle film grain, shot on 24mm at f/8 --ar 16:9 --style raw --v 7 --sref <url-editorial-entrevista> --sw 60
  ```
- **Evitar:** `--no text, logo, signage, color, crowd in focus, faces, escalator ads`

---

## Se der para gerar só 3

1. **`hero-atmosfera`**: é a primeira coisa que se vê; a luz laranja sobre a parede bordô apresenta as duas cores da marca antes do símbolo terminar de se desenhar.
2. **`editorial-entrevista`**: põe o segmento na página (RH, escuta, conversa) e é a âncora da série P&B.
3. **`editorial-rotina`**: é a imagem do "estilo de vida" do nome, o trabalho dentro do dia de quem trabalha com gente.

## Referências do logo (PNG 2000 px)

Geradas por `npm run brand -- lifestyle refs` em `cases/lifestyle/ref/`:
`lifestyle-lockup-transparent.png` · `lifestyle-lockup-dark.png` · `lifestyle-lockup-light.png` · `lifestyle-lockup-accent.png` · `lifestyle-symbol-transparent.png` · `lifestyle-symbol-dark.png`.

Use-as só como referência de forma ou cor. Nunca peça para a IA reproduzir o logo.
