# Faggian — plano de imagens

Página: `/cases/faggian/` · conteúdo: `cases/faggian/case.json` · 8 essenciais + 5 opcionais, todas geradas por IA.

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/faggian/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- faggian images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/faggian/img/`. As fotos editoriais saem em P&B mesmo se a IA devolver um pouco de cor.
3. Recarregue a página. A imagem aparece no lugar do placeholder, sem mexer em código.
   Se preferir, salve direto um `.webp` em `public/brand/faggian/img/<id>.webp`.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **em branco** (etiqueta lisa, tag lisa, sacola lisa, tampa lisa, cartões lisos). O SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/faggian/?pin`, arraste os 4 cantos sobre a superfície e cole o array que aparece no campo `pin` do mockup em `case.json`. As composições abaixo já batem com o `pin` padrão; o ajuste costuma ser fino.

**Feito em código, sem IA:** recortes gigantes do lettering (o laço do i e o encontro do F com o A), faixa "Faggian" em movimento, padrão com o monograma Gi (como um forro estampado), loja no celular, sistema do logo e blocos de cor.

**Peças reais:** a pasta `Faggian/ArquivosTecnicos_faggian` tem sacola, cartão, etiqueta, adesivos e destaques de verdade. Este case usa só o logo, como pedido. Quando quiser, dá para trocar mockups por essas peças (kind `piece`, como no case da Rock Ensina).

## Coerência visual (vale para todas)

- **Luz:** natural, de janela à esquerda da câmera, quente e *low-key*, como um ateliê no fim da tarde. Sombras profundas, mas abertas. Sem flash, sem fundo infinito de estúdio.
- **Lente:** 50 mm f/2.8 no geral, 85 mm nos objetos e 100 mm macro nos detalhes de tecido. Pouca profundidade de campo, grão de filme leve.
- **Cor (imagens coloridas):** sombras puxando para o café `#261A15`, médios em terracota `#B05136` e grafite `#706F6E`, altas no linho `#F7F3EC`. Algodão cru `#D9CBB8` nas superfícies de papel e tecido; latão `#C9A46E` só em detalhes de metal (agulha, dedal, fecho, botão).
- **P&B:** preto e branco com tom levemente quente, boa gama tonal, pretos foscos (sem esmagar), grão leve.
- **Materiais da série:** linho, algodão cru, papel algodão, cordão de algodão, madeira clara, metal latão, linha de costura. Nada de plástico brilhante, máquina de costura industrial ou etiqueta de outra marca.

**Gere primeiro `editorial-maos-costura`.** É a âncora de luz, lente e grão da série:
- no Midjourney, use a URL dela em `--sref` nas outras fotos P&B;
- no Nano Banana / GPT Image, anexe-a como referência de luz ("match the lighting direction, softness and grain of the reference, not its colors").

Gere `hero-tecido` em seguida: é a âncora de **cor** para `textura-linho` e para os mockups (anexe como referência de grading).

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `editorial-maos-costura.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial · **gerar primeiro** |
| 2 | `hero-tecido.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial |
| 3 | `mockup-etiqueta.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 4 | `mockup-tag.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | essencial |
| 5 | `editorial-camisa.webp` | Aplicações | 1:1 · 1500×1500 | Midjourney v7 | essencial |
| 6 | `editorial-bolsa.webp` | Aplicações | 3:2 · 2000×1333 | Midjourney v7 | essencial |
| 7 | `mockup-sacola.webp` | Aplicações | 4:5 · 1600×2000 | GPT Image | essencial |
| 8 | `mockup-caixa.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 9 | `textura-linho.webp` | Monograma (fundo) | 3:2 · 2400×1600 | Flux 1.1 Pro / Midjourney v7 | opcional |
| 10 | `editorial-tesoura.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | opcional |
| 11 | `mockup-cartoes.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | opcional |
| 12 | `editorial-punho.webp` | Aplicações (faixa larga final) | 2:1 · 2400×1200 | Midjourney v7 | opcional |
| 13 | `editorial-atelie.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |

Opcionais que faltarem somem do site publicado; no `npm run dev` elas aparecem como placeholder para você ver o lugar.

---

## Essenciais

### 1. `editorial-maos-costura` — gerar primeiro
- **Seção:** Aplicações (foto grande à esquerda, primeira da colagem, ao lado do recorte do laço).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7. É o que tem melhor estética editorial em P&B, e o `--sref` dela vai amarrar a série.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of two hands hand-stitching the cuff of a linen shirt with a fine steel needle and a long thread, a brass thimble on the middle finger, the shirt fabric draped over a wooden worktable, the thread catching the light as it is pulled, soft directional window light from camera left, low-key, deep open shadows, quiet artisanal mood, rich tonal range, matte blacks, subtle film grain, shot on 50mm lens at f/2.8, shallow depth of field, intimate documentary feel --ar 4:5 --style raw --v 7 --s 120
  ```
- **Evitar:** `--no text, logo, labels, letters, watermark, color, sewing machine, factory, gloves, harsh flash, nail polish, clutter`

### 2. `hero-tecido`
- **Seção:** Intro (fundo da abertura escura, atrás do monograma que se desenha).
- **Proporção / tamanho:** 16:9 · 2400×1350. Se sair menor, amplie no **Magnific** (modo Precision, *creativity* baixo, para não inventar trama no tecido).
- **Ferramenta:** Midjourney v7, ótimo em tecido e atmosfera. Alternativa: Flux 1.1 Pro Ultra.
- **Logo para anexar (opcional):** `cases/faggian/ref/faggian-symbol-transparent.png` como *image prompt* com peso baixo (`--iw 0.25`), só se quiser que o fio solto lembre o laço do i. O logo real entra por código por cima.
- **Composição:** a imagem fica atrás do logo, então o centro precisa ficar escuro e limpo. O tecido entra pelas bordas de baixo; o fio faz o laço no terço superior direito.
- **Prompt:**
  ```
  Soft heavy folds of terracotta linen fabric #B05136 draping in from the lower left and lower right edges of the frame against a deep espresso brown background #261A15, a single loose strand of terracotta sewing thread curling into an elegant open loop floating in the upper right third, a tiny brass needle #C9A46E at the end of the thread catching a glint of light, large calm dark negative space in the center, warm low-key side light from the left grazing the linen texture with highlights in warm linen white #F7F3EC, premium fashion still life, cinematic, minimal, shot on 100mm at f/2.8, subtle film grain --ar 16:9 --style raw --v 7 --s 150
  ```
- **Evitar:** `--no text, logo, letters, people, hands, mannequin, sewing machine, bright saturated colors, blue, purple, busy background`

### 3. `mockup-etiqueta`
- **Seção:** Aplicações (foto larga logo depois da faixa "Faggian").
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Segue bem "etiqueta lisa" e dá para corrigir por edição ("remove any print from the label").
- **Logo para anexar:** **nenhum.** Anexe `hero-tecido` só como referência de cor.
- **Composição (combina com o `pin` padrão):** gola vista de frente e de perto. A etiqueta é horizontal, cor de café, centrada no quadro: vai de 32% a 68% da largura e de 42% a 58% da altura. O logo entra em linho, com `screen`.
- **Prompt:**
  ```
  Close-up product photo of the inside back neck of a natural off-white linen shirt laid flat, a completely blank woven fabric label in deep espresso brown #261A15 sewn horizontally at the center of the collar with tiny visible stitches at both short ends, the label perfectly centered in the frame, spanning from about one third to two thirds of the frame width, flat and facing the camera, fine woven texture visible on the label, soft window light from the left, gentle fabric folds around the collar, warm neutral tones with linen white #F7F3EC and raw cotton #D9CBB8, realistic, high detail, shot on 100mm macro at f/5.6
  ```
- **Evitar:** text, logo, letters, size tag, care label, print or embroidery on the label, buttons over the label, wrinkles across the label.

### 4. `mockup-tag`
- **Seção:** Aplicações (primeira da segunda linha, ao lado da loja no celular).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image).
- **Logo para anexar:** nenhum. O monograma Gi entra por código, em terracota com `multiply`.
- **Composição (combina com o `pin` padrão):** tag vertical, de frente, centrada. Vai de 33% a 67% da largura e de 32% a 72% da altura. O furo do cordão fica no topo, dentro da tag.
- **Prompt:**
  ```
  Product photo of a completely blank vertical rectangular hang tag made of thick textured warm off-white cotton paper #F2ECE2, with a small round hole at the top tied with a thin natural cotton string to the handle of a terracotta #B05136 handmade fabric handbag, the tag hanging straight and facing the camera, centered, about one third of the frame width and spanning from roughly one third to three quarters of the frame height, the bag softly out of focus behind it in terracotta and espresso brown #261A15 shadows, soft window light from the left, warm low-key mood, realistic, high detail, shot on 85mm at f/2.8
  ```
- **Evitar:** text, logo, letters, price, barcode, stamp, print on the tag, extra tags, hands.

### 5. `editorial-camisa`
- **Seção:** Aplicações (foto quadrada à direita da loja no celular, um pouco mais baixa).
- **Proporção / tamanho:** 1:1 · 1500×1500.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-maos-costura`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a single linen shirt hanging on a simple wooden hanger against a plain plaster wall next to a tall window, gentle natural wrinkles, the shirt slightly off center, soft daylight from the left casting a long soft shadow on the wall, calm minimal composition, rich tonal range, matte blacks, subtle film grain, shot on 50mm at f/2.8 --ar 1:1 --style raw --v 7 --sref <url-editorial-maos-costura> --sw 60
  ```
- **Evitar:** `--no text, logo, labels, color, mannequin, person, clutter, other clothes`

### 6. `editorial-bolsa`
- **Seção:** Aplicações (à direita da etiqueta, mais baixa).
- **Proporção / tamanho:** 3:2 · 2000×1333.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-maos-costura`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white close-up of a handmade structured fabric handbag resting on a wooden bench, visible hand stitching along the edge and the strap, a small brass clasp catching the light, a needle with a coiled thread lying beside it, soft window light from camera left, low-key, deep open shadows, rich tonal range, matte blacks, subtle film grain, shot on 85mm at f/2.8, shallow depth of field --ar 3:2 --style raw --v 7 --sref <url-editorial-maos-costura> --sw 60
  ```
- **Evitar:** `--no text, logo, brand marks, monogram print, color, person, hands, chain strap`

### 7. `mockup-sacola`
- **Seção:** Aplicações (à esquerda do padrão com o monograma).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** GPT Image. Acerta bem a sacola de papel lisa e reta, de frente.
- **Logo para anexar:** nenhum. O logo entra por código em linho, com `screen`.
- **Composição (combina com o `pin` padrão):** sacola de frente, reta, centrada. A face da frente ocupa mais ou menos de 26% a 74% da largura e de 28% a 88% da altura. O logo fica entre 30–70% da largura e 40–66% da altura.
- **Prompt:**
  ```
  Product photo of a matte terracotta #B05136 paper shopping bag with natural cotton rope handles, standing upright on a pale stone plinth, the front panel facing the camera straight on and completely blank with no print, the bag centered and filling about half of the frame width, a folded raw cotton #D9CBB8 linen shirt peeking out of the top, warm linen white #F7F3EC plaster wall behind with a soft shadow, soft window light from the left, warm low-key mood, realistic, high detail, shot on 50mm at f/4
  ```
- **Evitar:** text, logo, letters, print, sticker, label, extra bags, hands, glossy paper.

### 8. `mockup-caixa`
- **Seção:** Aplicações (penúltima linha, ao lado do recorte "FA").
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image).
- **Logo para anexar:** nenhum. O logo entra por código em linho, com `screen`.
- **Composição (combina com o `pin` padrão):** vista de cima. A tampa café ocupa de 20% a 80% da largura e de 25% a 75% da altura; o logo fica no miolo (24–76% × 30–70%). A camisa dobrada fica na borda, sem cobrir a tampa.
- **Prompt:**
  ```
  Top-down product photo of a rectangular gift box with a completely blank matte espresso brown #261A15 lid, centered, the lid filling the middle of the frame, beside it at the right edge a folded raw cotton #D9CBB8 linen shirt wrapped in thin warm white tissue paper #F7F3EC, a spool of terracotta #B05136 thread and a brass needle #C9A46E at the lower edge, on a light linen tablecloth, soft window light from the left with gentle long shadows, realistic, high detail, shot on 50mm at f/5.6
  ```
- **Evitar:** text, logo, letters, ribbon over the lid, stickers, foil, embossing, extra boxes.

---

## Opcionais

### 9. `textura-linho`
- **Seção:** Monograma (fundo bem apagado, a 30%, atrás do Gi).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Flux 1.1 Pro (texturas limpas e nítidas) ou Midjourney v7 com `hero-tecido` em `--sref`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Extreme macro photograph of an irregular slubby linen weave, individual threads visible, deep espresso brown #261A15 shadows with terracotta #B05136 threads and soft highlights in raw cotton #D9CBB8, low-key raking light from the left, the left half darker and calmer, shallow depth of field, abstract, minimal, premium
  ```
- **Evitar:** text, logo, pattern prints, stains, bright colors, blue.

### 10. `editorial-tesoura`
- **Seção:** Aplicações (à esquerda dos cartões).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-maos-costura`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white still life of heavy tailor's shears, a flat piece of tailor's chalk and a cloth tape measure resting on a cut piece of fabric with a faint chalk outline of a shirt collar pattern, seen from a high angle, soft window light from camera left, low-key, rich tonal range, matte blacks, subtle film grain, shot on 50mm at f/2.8 --ar 4:5 --style raw --v 7 --sref <url-editorial-maos-costura> --sw 60
  ```
- **Evitar:** `--no text, logo, numbers in focus, color, hands, plastic scissors, clutter`

### 11. `mockup-cartoes`
- **Seção:** Aplicações (ao lado da tesoura).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image).
- **Logo para anexar:** nenhum. O logo (linho) e o monograma (terracota) entram por código.
- **Composição (combina com o `pin` padrão):** vista de cima. Cartão **linho** à esquerda, girado cerca de −8°. Cartão **terracota** à direita, girado cerca de +6°, com uma pequena folga. Cada cartão ocupa uns 36% da largura.
- **Prompt:**
  ```
  Top-down product photo of two completely blank business cards (85x55 mm proportion) lying on a raw linen fabric surface #D9CBB8: a matte warm white card #F7F3EC on the left rotated about -8 degrees and a matte terracotta card #B05136 on the right rotated about +6 degrees, small gap between them, each card about one third of the frame width, centered composition, a brass needle with a short terracotta thread at the top edge, soft directional window light from the left with gentle long shadows, subtle paper texture, realistic, high detail, no printing on the cards
  ```
- **Evitar:** text, logo, letters, numbers, foil, embossing, extra cards, pens.

### 12. `editorial-punho`
- **Seção:** Aplicações (faixa larga que fecha a colagem).
- **Proporção / tamanho:** 2:1 · 2400×1200.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-maos-costura`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white close-up of a person buttoning the cuff of a crisp linen shirt, only hands and forearm visible, the hands on the right third of the frame, large calm negative space on the left, soft window light from camera left, quiet elegant moment, low-key, rich tonal range, matte blacks, subtle film grain, shot on 85mm at f/2 --ar 2:1 --style raw --v 7 --sref <url-editorial-maos-costura> --sw 60
  ```
- **Evitar:** `--no text, logo, color, watch, jewelry, tattoos, face`

### 13. `editorial-atelie`
- **Seção:** Fechamento (fundo apagado atrás da frase final e da ficha técnica).
- **Proporção / tamanho:** 16:9 · 2400×1350.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-maos-costura`.
- **Logo para anexar:** nenhum.
- **Composição:** o texto fica por cima, à esquerda e no centro; os objetos ficam na borda direita e no terço de baixo.
- **Prompt:**
  ```
  Editorial black and white photograph of a small sewing atelier worktable at dusk, spools of thread, pins in a fabric pincushion, folded fabric swatches, tailor's shears and a paper sewing pattern gathered along the right edge and the bottom third, the rest of the frame dark and calm, soft fading window light from the left, low-key, rich tonal range, matte blacks, subtle film grain, shot on 35mm at f/2.8 --ar 16:9 --style raw --v 7 --sref <url-editorial-maos-costura> --sw 60
  ```
- **Evitar:** `--no text, logo, color, sewing machine, people, clutter in the center`

---

## Se der para gerar só 3

1. **`hero-tecido`**: é a primeira coisa que se vê, e o fio em laço sobre o linho terracota traduz o conceito da marca antes mesmo do logo terminar de se desenhar.
2. **`mockup-etiqueta`**: mostra o logo real onde ele mais importa numa marca de roupa, costurado na gola.
3. **`editorial-maos-costura`**: traz o "feito à mão" que sustenta a marca e serve de âncora da série P&B.

## Referências do logo (PNG 2000 px)

Geradas por `npm run brand -- faggian refs` em `cases/faggian/ref/`:
`faggian-lockup-transparent.png` · `faggian-lockup-dark.png` · `faggian-lockup-light.png` · `faggian-lockup-accent.png` · `faggian-symbol-transparent.png` · `faggian-symbol-dark.png` (o monograma Gi).

Use-as só como referência de forma ou cor. Nunca peça para a IA reproduzir o logo.
