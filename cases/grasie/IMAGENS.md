# Grasiê Kids & Teen — plano de imagens

Página: `/cases/grasie/` · conteúdo: `cases/grasie/case.json` · 8 essenciais + 5 opcionais, todas geradas por IA.

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/grasie/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- grasie images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/grasie/img/`. As fotos editoriais saem em P&B mesmo se a IA devolver um pouco de cor.
3. Recarregue a página. A imagem aparece no lugar do placeholder, sem mexer em código.
   Se preferir, salve direto um `.webp` em `public/brand/grasie/img/<id>.webp`.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **em branco** (placa lisa, sacola lisa, tag lisa, tampa lisa, cartões lisos). O SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/grasie/?pin`, arraste os 4 cantos sobre a superfície e cole o array que aparece no campo `pin` do mockup em `case.json`. As composições abaixo já batem com o `pin` padrão; o ajuste costuma ser fino.

**A Grasiê é a loja, não a marca das roupas.** O logo aparece na fachada, na embalagem, na tag de preço e nos cartões. Nenhuma imagem deve mostrar roupa estampada com logo, nem com logo de outra marca.

**Crianças:** nada de rosto. Use mãos, pés, costas e roupas no cabide. Fica mais elegante, evita o "vale da estranheza" das IAs e não expõe criança nenhuma.

**Feito em código, sem IA:** recortes gigantes do logotipo (o ê com o circunflexo e o "Gr"), faixa "Grasiê" em movimento, padrão com o símbolo, loja no celular, sistema do logo e blocos de cor.

## Coerência visual (vale para todas)

- **Luz:** luz do dia difusa, de uma janela grande à esquerda da câmera. *High-key*, clara e arejada, sombras suaves e abertas. Sem flash duro, sem contraste alto. Só o `hero-baloes` e a `textura-algodao` são escuras, porque ficam atrás de texto claro.
- **Lente:** 50 mm f/2.8 nas fotos de ambiente, 85 mm f/4 nos objetos e mockups, 100 mm macro na textura. Pouca profundidade de campo, grão de filme bem leve.
- **Cor (imagens coloridas):** altas no algodão `#FBF8F3`, superfícies em lilás bruma `#E7E0EF`, lavanda `#8971A0` e sálvia `#82A192` como cores dos objetos, manteiga `#F4D98E` só num detalhe pequeno. Tudo pastel e pouco saturado, como pede a marca. Ameixa `#2A2230` só nas duas imagens escuras.
- **P&B:** preto e branco *high-key*, muito branco, cinzas médios suaves, nada de preto esmagado, grão leve. O oposto do P&B dramático.
- **Materiais da série:** algodão, tricô, linho, madeira clara, papel fosco, cordão de algodão. Nada de plástico brilhante, neon, brinquedo de personagem ou estampa chamativa.

**Gere primeiro `editorial-cabides`.** É a âncora de luz, lente e grão das fotos P&B:
- no Midjourney, use a URL dela em `--sref` nas outras editoriais;
- no Nano Banana / GPT Image, anexe-a como referência de luz ("match the lighting direction, softness and grain of the reference, not its colors").

Gere `mockup-sacola` em seguida: é a âncora de **cor** pastel dos outros mockups (anexe como referência de grading na fachada, na tag, na caixa e nos cartões).

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `editorial-cabides.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial · **gerar primeiro** |
| 2 | `mockup-sacola.webp` | Aplicações | 4:5 · 1600×2000 | GPT Image | essencial · âncora de cor |
| 3 | `hero-baloes.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial |
| 4 | `mockup-fachada.webp` | Aplicações | 3:2 · 2400×1600 | GPT Image | essencial |
| 5 | `mockup-tag.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | essencial |
| 6 | `mockup-caixa.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 7 | `editorial-pezinhos.webp` | Aplicações | 1:1 · 1500×1500 | Midjourney v7 | essencial |
| 8 | `editorial-maos.webp` | Aplicações | 3:2 · 2000×1333 | Midjourney v7 | essencial |
| 9 | `textura-algodao.webp` | Símbolo (fundo) | 3:2 · 2400×1600 | Flux 1.1 Pro | opcional |
| 10 | `editorial-dobradas.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | opcional |
| 11 | `mockup-cartoes.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | opcional |
| 12 | `editorial-brincar.webp` | Aplicações (faixa larga final) | 2:1 · 2400×1200 | Midjourney v7 | opcional |
| 13 | `editorial-loja.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |

Opcionais que faltarem somem do site publicado; no `npm run dev` elas aparecem como placeholder para você ver o lugar.

---

## Essenciais

### 1. `editorial-cabides` — gerar primeiro
- **Seção:** Aplicações (foto grande à esquerda, primeira da colagem, ao lado do recorte do ê).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7. É o que tem melhor estética editorial em P&B, e o `--sref` dela vai amarrar a série.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of tiny children's clothes hanging on small natural wooden hangers along a simple thin metal rail: a little knitted cardigan, a cotton pinafore dress, small corduroy overalls and a striped t-shirt, plain fabrics without prints, spaced generously, a bright white wall behind, soft diffused daylight from a large window at camera left, high-key, airy, gentle soft grey shadows, low contrast, calm and tender mood, fine film grain, shot on 50mm lens at f/2.8, shallow depth of field --ar 4:5 --style raw --v 7 --s 120
  ```
- **Evitar:** `--no text, logo, labels, price tags, printed graphics, cartoon characters, people, color, harsh shadows, clutter, plastic hangers`

### 2. `mockup-sacola` — âncora de cor
- **Seção:** Aplicações (à esquerda do padrão com o símbolo).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** GPT Image. Respeita bem "sacola lisa" e a posição pedida para o painel da frente.
- **Logo para anexar:** nenhum. O logo inteiro entra por código, nas cores oficiais, com `multiply`.
- **Composição (combina com o `pin` padrão):** sacola de frente, levemente abaixo do centro. A área lisa do painel vai de 30% a 70% da largura e de 42% a 74% da altura; as alças ficam acima de 42%.
- **Prompt:**
  ```
  Product photo of a completely blank matte cream paper shopping bag #FBF8F3 with soft lavender #8971A0 cotton rope handles, standing upright and facing the camera straight on, centered slightly below the middle of the frame, the flat front panel spanning from about 30% to 70% of the frame width and from about 42% to 74% of the frame height, handles rising above it, on a pale lilac mist #E7E0EF seamless paper set with a soft sage #82A192 paper curve on one side, a small folded butter yellow #F4D98E tissue paper peeking from the top of the bag, soft diffused daylight from a large window at camera left, gentle soft shadow, airy pastel high-key look, realistic, high detail, shot on 85mm at f/4
  ```
- **Evitar:** text, logo, letters, print, stickers, glossy plastic, kraft brown paper, saturated colors, harsh shadows.

### 3. `hero-baloes`
- **Seção:** Intro (fundo da abertura escura, atrás do símbolo que se desenha).
- **Proporção / tamanho:** 16:9 · 2400×1350. Se sair menor, amplie no **Magnific** (modo Precision, *creativity* baixo, para não inventar formas novas).
- **Ferramenta:** Midjourney v7, ótimo em atmosfera e materiais foscos. Alternativa: Flux 1.1 Pro Ultra.
- **Logo para anexar:** nenhum. As formas infladas dos balões já conversam com as letras; o logo real entra por código por cima.
- **Composição:** a imagem fica atrás do logo, então o centro precisa ficar escuro e limpo. Os balões entram pelas bordas (canto inferior esquerdo e canto superior direito), cortados pelo quadro.
- **Prompt:**
  ```
  A few soft matte balloons in pastel lavender #8971A0 and soft sage green #82A192, one small butter yellow #F4D98E, drifting in from the lower left corner and the upper right corner of the frame and partly cropped by the edges, against a deep plum background #2A2230, large calm dark negative space in the center, gentle soft light from the left giving the balloons a velvety matte sheen, thin cotton strings trailing out of frame, dreamy and quiet, minimal, cinematic, slight atmospheric haze, shot on 85mm at f/2.8, subtle film grain --ar 16:9 --style raw --v 7 --s 150
  ```
- **Evitar:** `--no text, logo, letters, numbers, glossy foil balloons, confetti, party decorations, people, children, saturated colors, neon, busy background`

### 4. `mockup-fachada`
- **Seção:** Aplicações (foto larga logo depois da faixa "Grasiê").
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** GPT Image. É o mais obediente para arquitetura com placa lisa num lugar exato. Alternativa: Nano Banana, pedindo para apagar qualquer letra que aparecer.
- **Logo para anexar:** **nenhum.** Anexe `mockup-sacola` só como referência de cor.
- **Composição (combina com o `pin` padrão):** fachada de frente, câmera na altura dos olhos.
  - Placa principal **creme**, horizontal, sobre a vitrine: de 22% a 70% da largura e de 18% a 34% da altura. O logotipo "Grasiê" entra nela com `multiply`.
  - Placa **redonda** creme, de bandeira, presa na parede à direita: de 78% a 90% da largura e de 30% a 48% da altura. O símbolo entra nela.
- **Prompt:**
  ```
  Straight-on eye-level photo of a small charming children's clothing boutique storefront, the facade painted in soft sage green #82A192 with a pale lilac mist #E7E0EF door frame, a completely blank flat cream #FBF8F3 rectangular fascia sign board above a large shop window, the sign spanning from about 22% to 70% of the frame width and from about 18% to 34% of the frame height, and a small completely blank round cream projecting blade sign on a thin metal bracket on the right wall, from about 78% to 90% of the frame width and 30% to 48% of the frame height, the window showing a few small children's clothes on wooden hangers and a little wooden stool, a potted olive tree by the door, clean sidewalk, soft overcast daylight, airy pastel high-key look, realistic architectural photo, shot on 35mm at f/8
  ```
- **Evitar:** text, logo, letters, numbers, neon, posters, sale signs, people, cars, graffiti, saturated colors, any print on the signs.

### 5. `mockup-tag`
- **Seção:** Aplicações (primeira da segunda linha, ao lado da loja no celular).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Segue bem "tag lisa" e dá para corrigir por edição ("remove any print from the tag").
- **Logo para anexar:** nenhum. O símbolo entra por código, nas cores oficiais, com `multiply`.
- **Composição (combina com o `pin` padrão):** tag vertical, de frente, centrada. Vai de 36% a 64% da largura e de 40% a 68% da altura. O furo do cordão fica no topo, dentro da tag.
- **Prompt:**
  ```
  Product photo of a completely blank vertical rectangular hang tag made of thick matte cream cotton paper #FBF8F3 with rounded corners, a small round hole at the top tied with a thin lavender #8971A0 cotton string to the sleeve of a tiny soft sage green #82A192 knitted baby cardigan hanging on a small natural wooden hanger, the tag hanging straight and facing the camera, centered, spanning from about 36% to 64% of the frame width and from about 40% to 68% of the frame height, the cardigan softly out of focus behind it, pale lilac mist #E7E0EF background, soft diffused daylight from the left, airy pastel high-key look, realistic, high detail, shot on 85mm at f/2.8
  ```
- **Evitar:** text, logo, letters, numbers, barcode, price, print on the tag, plastic tag fastener, saturated colors.

### 6. `mockup-caixa`
- **Seção:** Aplicações (ao lado do recorte gigante do "Gr").
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image).
- **Logo para anexar:** nenhum. O logo entra por código, em algodão, com `screen`.
- **Composição (combina com o `pin` padrão):** vista de cima (*flat lay*). A tampa lavanda fica no centro: de 30% a 70% da largura e de 26% a 70% da altura. Papel de seda e uma roupinha dobrada aparecem nas bordas.
- **Prompt:**
  ```
  Top-down flat lay photo of a closed rectangular gift box with a completely blank matte lavender #8971A0 lid centered in the frame, the lid spanning from about 30% to 70% of the frame width and from about 26% to 70% of the frame height, on a cream #FBF8F3 linen surface, butter yellow #F4D98E tissue paper and a neatly folded tiny sage green #82A192 knitted baby sweater peeking in from the lower left edge, a thin lilac mist #E7E0EF satin ribbon loosely curled at the right edge, soft diffused daylight from the left with gentle soft shadows, airy pastel high-key look, realistic, high detail, shot on 85mm at f/5.6
  ```
- **Evitar:** text, logo, letters, ribbon across the lid, bow on top of the lid, stickers, glitter, saturated colors.

### 7. `editorial-pezinhos`
- **Seção:** Aplicações (quadrado à direita, ao lado da loja no celular).
- **Proporção / tamanho:** 1:1 · 1500×1500.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-cabides`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a small child's feet in soft cotton socks standing on tiptoes on a light wooden floor next to a pair of tiny canvas sneakers, only the feet and ankles visible, playful and tender moment, soft diffused daylight from a window at camera left, high-key, airy, lots of white, gentle soft grey shadows, low contrast, fine film grain, shot on 50mm at f/2.8 --ar 1:1 --style raw --v 7 --sref <url-editorial-cabides> --sw 60
  ```
- **Evitar:** `--no text, logo, brand marks on the shoes, face, color, harsh shadows, clutter`

### 8. `editorial-maos`
- **Seção:** Aplicações (à direita da fachada).
- **Proporção / tamanho:** 3:2 · 2000×1333.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-cabides`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a small child's hand holding an adult's hand while walking on a sunny sidewalk, only the hands, wrists and soft knitted sleeves visible, the hands in the center right of the frame, large calm bright negative space on the left, soft diffused daylight, high-key, airy, gentle soft grey shadows, low contrast, tender everyday moment, fine film grain, shot on 50mm at f/2.8, shallow depth of field --ar 3:2 --style raw --v 7 --sref <url-editorial-cabides> --sw 60
  ```
- **Evitar:** `--no text, logo, faces, rings, watches, tattoos, color, harsh shadows`

---

## Opcionais

### 9. `textura-algodao`
- **Seção:** Símbolo (fundo apagado da seção escura, atrás do G e do texto).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Flux 1.1 Pro (bom em macro de tecido). Amplie no Magnific se precisar.
- **Logo para anexar:** nenhum.
- **Composição:** escura e uniforme, sem ponto de atenção; o texto claro fica por cima.
- **Prompt:**
  ```
  Extreme macro photograph of a soft cotton knit fabric in muted lavender #8971A0 fading into deep plum shadows #2A2230, plush loops and gentle fibers visible, very soft low-key side light from the left grazing the texture, no single focal point, even calm composition, velvety and cozy, shot on 100mm macro at f/4, subtle film grain
  ```
- **Evitar:** text, logo, pattern prints, buttons, seams, bright highlights, saturated purple.

### 10. `editorial-dobradas`
- **Seção:** Aplicações (à esquerda dos cartões).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-cabides`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a neat stack of small folded children's clothes on a white wooden shelf: tiny cotton t-shirts, a knitted sweater and soft bodysuits, plain fabrics, a small folded blanket beside it, soft diffused daylight from the left, high-key, airy, gentle soft grey shadows, low contrast, calm and orderly, fine film grain, shot on 50mm at f/2.8 --ar 4:5 --style raw --v 7 --sref <url-editorial-cabides> --sw 60
  ```
- **Evitar:** `--no text, logo, labels, printed graphics, people, color, clutter`

### 11. `mockup-cartoes`
- **Seção:** Aplicações (ao lado das roupinhas dobradas).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image).
- **Logo para anexar:** nenhum. O logo (nas cores oficiais) e o símbolo (em algodão) entram por código.
- **Composição (combina com o `pin` padrão):** vista de cima. Cartão **creme** à esquerda, girado cerca de −8°. Cartão **lavanda** à direita, girado cerca de +6°, com uma pequena folga. Cada cartão ocupa uns 36% da largura.
- **Prompt:**
  ```
  Top-down product photo of two completely blank business cards (85x55 mm proportion) lying on a pale lilac mist #E7E0EF paper surface: a matte cream card #FBF8F3 on the left rotated about -8 degrees and a matte lavender card #8971A0 on the right rotated about +6 degrees, small gap between them, each card about one third of the frame width, centered composition, a small sage green #82A192 cotton string bow and a butter yellow #F4D98E paper star at the top edge, soft diffused daylight from the left with gentle soft shadows, subtle paper texture, airy pastel high-key look, realistic, high detail, no printing on the cards
  ```
- **Evitar:** text, logo, letters, numbers, foil, embossing, extra cards, pens.

### 12. `editorial-brincar`
- **Seção:** Aplicações (faixa larga que fecha a colagem).
- **Proporção / tamanho:** 2:1 · 2400×1200.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-cabides`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a small child seen from behind jumping joyfully in a bright empty room with large windows, arms up, slight motion blur on the arms and hair, face not visible, the child on the right third of the frame, large calm bright negative space on the left, soft diffused daylight, high-key, airy, low contrast, fine film grain, shot on 35mm at f/2.8 --ar 2:1 --style raw --v 7 --sref <url-editorial-cabides> --sw 60
  ```
- **Evitar:** `--no text, logo, face, toys with characters, color, clutter, harsh shadows`

### 13. `editorial-loja`
- **Seção:** Fechamento (fundo apagado atrás da frase final e da ficha técnica).
- **Proporção / tamanho:** 16:9 · 2400×1350.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-cabides`.
- **Logo para anexar:** nenhum.
- **Composição:** o texto fica por cima, à esquerda e no centro; os objetos ficam na borda direita e no terço de baixo.
- **Prompt:**
  ```
  Editorial black and white photograph of the interior of a small calm children's clothing boutique, a low wooden clothing rail with tiny garments, a little wooden stool and light shelves with folded clothes gathered along the right edge and the bottom third, the rest of the frame a soft bright empty wall, soft diffused daylight from a large window, high-key, airy, low contrast, fine film grain, shot on 35mm at f/4 --ar 16:9 --style raw --v 7 --sref <url-editorial-cabides> --sw 60
  ```
- **Evitar:** `--no text, logo, signage, price tags, people, color, clutter in the center`

---

## Se der para gerar só 3

1. **`mockup-fachada`**: a Grasiê é uma loja, e a fachada mostra o logo exatamente onde ele vive, com o símbolo na placa de bandeira.
2. **`mockup-sacola`**: a peça que sai da loja na mão do cliente, com o logo inteiro nas cores oficiais, e a âncora do clima pastel.
3. **`hero-baloes`**: é a primeira coisa que se vê; os balões foscos repetem as formas infladas das letras antes mesmo de o logo terminar de se desenhar.

## Referências do logo (PNG 2000 px)

Geradas por `npm run brand -- grasie refs` em `cases/grasie/ref/`:
`grasie-lockup-transparent.png` · `grasie-lockup-dark.png` (negativo sobre ameixa) · `grasie-lockup-light.png` (cores oficiais sobre algodão) · `grasie-lockup-accent.png` (ameixa sobre manteiga) · `grasie-symbol-transparent.png` · `grasie-symbol-dark.png`.

Use-as só como referência de forma ou cor. Nunca peça para a IA reproduzir o logo.
