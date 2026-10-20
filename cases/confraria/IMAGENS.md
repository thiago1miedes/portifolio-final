# Confraria dos Aromas — plano de imagens

Página: `/cases/confraria/` · conteúdo: `cases/confraria/case.json` · 7 essenciais + 5 opcionais geradas por IA, mais 1 peça real (o rótulo).

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/confraria/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- confraria images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/confraria/img/`. As fotos editoriais saem em P&B mesmo se a IA devolver um pouco de cor.
3. Recarregue a página. A imagem aparece no lugar do placeholder, sem mexer em código.
   Se preferir, salve direto um `.webp` em `public/brand/confraria/img/<id>.webp`.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **em branco** (rótulo liso, tampa lisa, etiqueta lisa). O SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/confraria/?pin`, arraste os 4 cantos sobre a superfície e cole o array que aparece no campo `pin` do mockup em `case.json`. As composições abaixo já batem com o `pin` padrão; o ajuste costuma ser fino.

**Feito em código, sem IA:** recortes gigantes do lettering (o f com a vinha e o "a" final com o arabesco), faixa "Confraria" em movimento, padrão com o monograma, loja no celular, sistema do logo e blocos de cor.

**Peça real, já no lugar:** `rotulo-aromatizador` é o painel frontal da proposta de rótulo (página 1 de `ConfrariaDosAromas/Embalagens_ConfrariaDosAromas_propostas.ai`). Não precisa gerar. Se não quiser mostrar a proposta, apague o item `rotulo-aromatizador` de `applications.items` no `case.json`.

## Coerência visual (vale para todas)

- **Luz:** quente e *low-key*, como fim de tarde entrando por uma janela à esquerda da câmera (ou luz de vela, quando houver vela acesa). Sombras profundas, mas abertas. Sem flash.
- **Lente:** 50 mm f/2.8 no geral, 35 mm nos planos abertos e 100 mm macro nos detalhes. Pouca profundidade de campo, grão de filme leve.
- **Cor (imagens coloridas):** sombras puxando para o verde-mata `#082A23`, médios em `#074D40` e sálvia `#A9BCA6`, altas no creme `#F8F5E2`. Terracota `#C1715B` e dourado `#D3A94F` só em detalhes (chama, madeira, argila, flores secas).
- **P&B:** preto e branco com tom levemente quente, boa gama tonal, pretos foscos (sem esmagar), grão leve.
- **Materiais da série:** vidro âmbar, linho cru, madeira clara, papel kraft, barbante de algodão, ramos secos (eucalipto, lavanda, alecrim). Nada de plástico brilhante ou cenário de estúdio branco.

**Gere primeiro `editorial-maos-cera`.** É a âncora de luz, lente e grão da série:
- no Midjourney, use a URL dela em `--sref` nas outras fotos P&B;
- no Nano Banana / GPT Image, anexe-a como referência de luz ("match the lighting direction, softness and grain of the reference, not its colors").

Gere `hero-fumaca` em seguida: é a âncora de **cor** para `textura-folhas` e para os mockups (anexe como referência de grading).

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `editorial-maos-cera.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial · **gerar primeiro** |
| 2 | `hero-fumaca.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial |
| 3 | `mockup-vela.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | essencial |
| 4 | `editorial-botanicos.webp` | Aplicações | 1:1 · 1500×1500 | Midjourney v7 | essencial |
| 5 | `editorial-conta-gotas.webp` | Aplicações | 3:2 · 2000×1333 | Midjourney v7 | essencial |
| 6 | `mockup-borrifador.webp` | Aplicações | 3:2 · 2400×1600 | GPT Image | essencial |
| 7 | `mockup-caixa.webp` | Aplicações | 1:1 · 1800×1800 | Nano Banana (Gemini) | essencial |
| 8 | `textura-folhas.webp` | Monograma (fundo) | 3:2 · 2400×1600 | Midjourney v7 / Flux 1.1 Pro | opcional |
| 9 | `editorial-confraria.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |
| 10 | `mockup-tag.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | opcional |
| 11 | `mockup-cartoes.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | opcional |
| 12 | `editorial-olfato.webp` | Aplicações (faixa larga final) | 2:1 · 2400×1200 | Midjourney v7 | opcional |
| — | `rotulo-aromatizador.webp` | Aplicações | 2:3 · 1200×1800 | arquivo original (.ai) | já gerada |

Opcionais que faltarem somem do site publicado; no `npm run dev` elas aparecem como placeholder para você ver o lugar.

---

## Essenciais

### 1. `editorial-maos-cera` — gerar primeiro
- **Seção:** Aplicações (foto grande à esquerda, primeira da colagem, ao lado do recorte do "f").
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7. É o que tem melhor estética editorial em P&B, e o `--sref` dela vai amarrar a série.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of two hands carefully pouring melted wax from a small metal pitcher into a clear glass candle jar on a wooden workbench, a cotton wick held upright in the center of the jar, a thin stream of wax catching the light, soft directional window light from camera left, low-key, deep open shadows, handmade artisanal mood, rich tonal range, matte blacks, subtle film grain, shot on 50mm lens at f/2.8, shallow depth of field, quiet documentary feel --ar 4:5 --style raw --v 7 --s 120
  ```
- **Evitar:** `--no text, logo, labels, letters, watermark, color, gloves, factory, harsh flash, clutter`

### 2. `hero-fumaca`
- **Seção:** Intro (fundo da abertura escura, atrás do logo que se desenha).
- **Proporção / tamanho:** 16:9 · 2400×1350. Se sair menor, amplie no **Magnific** (modo Precision, *creativity* baixo, para não inventar textura na fumaça).
- **Ferramenta:** Midjourney v7, que é ótimo em fumaça e atmosfera. Alternativa: Flux 1.1 Pro Ultra.
- **Logo para anexar (opcional):** `cases/confraria/ref/confraria-symbol-transparent.png` como *image prompt* com peso baixo (`--iw 0.25`), só se quiser que a espiral da fumaça lembre a vinha do C. O logo real entra por código por cima.
- **Composição:** a imagem fica atrás do logo, então o centro precisa ficar escuro e limpo. A vela fica minúscula no terço inferior direito e a fumaça sobe pela direita.
- **Prompt:**
  ```
  A thin ribbon of smoke rising from a just-extinguished candle wick and curling into slow elegant spirals like a climbing vine, against a deep forest green background #082A23 fading to #074D40, a faint warm ember glow #D3A94F on the wick, soft side light from the left revealing the smoke texture in pale sage #A9BCA6 and cream #F8F5E2, the candle tiny in the lower right third, large calm dark negative space in the center, low-key, cinematic, shot on 100mm at f/2.8, subtle film grain, minimal, premium --ar 16:9 --style raw --v 7 --s 150
  ```
- **Evitar:** `--no text, logo, letters, open flame, fire, multiple candles, neon, blue tones, purple, busy background, hands`

### 3. `mockup-vela`
- **Seção:** Aplicações (vela, ao lado da loja no celular).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Segue bem "rótulo liso" e dá para corrigir por edição ("remove any print from the label").
- **Logo para anexar:** **nenhum.** Anexe `hero-fumaca` só como referência de cor.
- **Composição (combina com o `pin` padrão):** pote centralizado, de frente. O rótulo creme ocupa cerca de 1/3 da largura do quadro e fica logo abaixo do centro (de 53% a 69% da altura).
- **Prompt:**
  ```
  Product photo of a lit scented candle in a round amber glass jar, the jar has a completely blank smooth cream paper label #F8F5E2 wrapped around the front, centered and facing the camera, the label spanning about one third of the frame width and sitting just below the vertical center, the matte black metal lid resting on the table to the right, a sprig of dried eucalyptus and a few dried petals in terracotta #C1715B beside it, standing on raw linen over a dark wooden table, background in deep forest green #082A23 with a soft gradient, small calm flame, warm low-key light from the left, realistic, high detail, shot on 50mm at f/4
  ```
- **Evitar:** text, logo, letters, print on the label, barcode, extra candles, smoke, hands, clutter.

### 4. `editorial-botanicos`
- **Seção:** Aplicações (quadrado à direita da loja no celular).
- **Proporção / tamanho:** 1:1 · 1500×1500.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-maos-cera`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Black and white still life photograph of small bundles of dried herbs and flowers, lavender, rosemary, eucalyptus and chamomile, tied with cotton twine and laid on a rough linen cloth, overhead three-quarter view, soft window light from camera left grazing the textures, deep shadows, rich tonal range, matte blacks, subtle film grain, shot on 50mm at f/2.8 --ar 1:1 --style raw --v 7 --sref <url-editorial-maos-cera> --sw 60
  ```
- **Evitar:** `--no text, logo, labels, color, plastic, glass jars, hands`

### 5. `editorial-conta-gotas`
- **Seção:** Aplicações (à direita do aromatizador).
- **Proporção / tamanho:** 3:2 · 2000×1333.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-maos-cera`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Macro black and white photograph of a glass dropper releasing a single drop of fragrance oil into a small amber glass bottle, the drop suspended in mid-air and catching a bright highlight, dark background, soft side light from camera left, crisp detail on the glass, shallow depth of field, rich tonal range, subtle film grain, shot on 100mm macro at f/4 --ar 3:2 --style raw --v 7 --sref <url-editorial-maos-cera> --sw 60
  ```
- **Evitar:** `--no text, labels, logo, color, nail polish, splash, multiple drops`

### 6. `mockup-borrifador`
- **Seção:** Aplicações (grande, linha do aromatizador).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** GPT Image (ChatGPT). Respeita bem "rótulo liso" em frascos e controla a posição do objeto no quadro.
- **Logo para anexar:** nenhum. Anexe `hero-fumaca` como referência de cor.
- **Composição (combina com o `pin` padrão):** frasco de 1 litro em pé, um pouco à esquerda do centro. O rótulo creme fica de frente, com cerca de 22% da largura do quadro, de 44% a 70% da altura.
- **Prompt:**
  ```
  Product photo of a 1-liter amber spray bottle with a black trigger sprayer, standing slightly left of center on a light oak wooden bench, a large completely blank smooth cream label #F8F5E2 facing the camera, the label about 22 percent of the frame width and covering the middle of the bottle from about 44 to 70 percent of the frame height, a small glass vase with eucalyptus branches to the right, background a soft deep green wall #074D40 out of focus, warm late afternoon window light from the left, realistic, high detail, shot on 50mm at f/4
  ```
- **Evitar:** text, logo, letters, print on the label, barcode, droplets, hands, extra bottles.

### 7. `mockup-caixa`
- **Seção:** Aplicações (caixa de presente, ao lado do padrão do monograma).
- **Proporção / tamanho:** 1:1 · 1800×1800.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image), que controla bem material e ângulo.
- **Logo para anexar:** nenhum.
- **Composição (combina com o `pin` padrão):** vista de cima. Tampa retangular centralizada, com cerca de metade da largura do quadro (de 24% a 76%) e de 30% a 70% da altura. O barbante fica só no lado direito, para a tampa ficar livre.
- **Prompt:**
  ```
  Top-down flat lay of a closed rectangular gift box with a lid in natural kraft paper, completely blank with no print, the lid centered and occupying about half of the frame width, tied loosely with cotton twine on the right side only, a few dried flowers, a sprig of rosemary and a small amber glass bottle around it on a cream linen surface #F8F5E2, soft window light from the left with gentle shadows, warm natural mood, realistic, high detail
  ```
- **Evitar:** text, logo, stamps, tape, bow over the lid, open lid, extra boxes.

---

## Opcionais

### 8. `textura-folhas`
- **Seção:** Monograma (fundo sutil, em baixa opacidade, atrás do C).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Midjourney v7 com `--sref <URL de hero-fumaca>`, ou Flux 1.1 Pro.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Macro abstract photograph of climbing vine leaves and curling tendrils in deep shadow, dark forest green #082A23 and #074D40 tones, soft rim light from the left catching the leaf edges in pale sage #A9BCA6, very dark overall with lots of negative space, shallow depth of field, shot on 100mm macro at f/4, subtle grain --ar 3:2 --style raw --v 7 --sref <url-hero-fumaca>
  ```
- **Evitar:** `--no text, logo, flowers, bright colors, insects, water drops, sky`

### 9. `editorial-confraria`
- **Seção:** Fechamento (fundo escuro, bem apagado).
- **Proporção / tamanho:** 16:9 · 2400×1350.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-maos-cera`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Black and white photograph of a long wooden table at dusk with several lit candles in glass jars, the hands of four friends resting around it, one passing a small bottle to another, faces out of frame, warm intimate gathering mood, candlelight and soft window light from the left, wide composition with calm darker negative space in the center, low-key, rich tonal range, subtle film grain, shot on 35mm at f/2.8 --ar 16:9 --style raw --v 7 --sref <url-editorial-maos-cera> --sw 60
  ```
- **Evitar:** `--no text, logo, labels, color, wine glasses, food, phones, faces`

### 10. `mockup-tag`
- **Seção:** Aplicações (etiquetas, ao lado do rótulo).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Alternativa: Flux 1.1 Pro, ótimo em papel e fibra.
- **Logo para anexar:** nenhum.
- **Composição (combina com o `pin` padrão):** uma etiqueta kraft em pé, centralizada, com cerca de 20% da largura do quadro e de 30% a 66% da altura.
- **Prompt:**
  ```
  Close-up product photo of a single blank kraft paper hang tag, portrait rectangle with a reinforced hole, hanging centered in the frame from cotton twine tied to the neck of an amber glass bottle, the tag about 20 percent of the frame width and filling the vertical middle third, completely blank with no print, cream linen and dried eucalyptus softly out of focus behind, warm window light from the left, shallow depth of field, shot on 85mm at f/2.8, realistic
  ```
- **Evitar:** text, logo, stamp, handwriting, barcode, extra tags.

### 11. `mockup-cartoes`
- **Seção:** Aplicações (penúltima linha, ao lado do recorte do "a").
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image).
- **Logo para anexar:** nenhum.
- **Composição (combina com o `pin` padrão):** vista de cima. Cartão **creme** à esquerda, girado cerca de −8°. Cartão **verde** à direita, girado cerca de +6°, com uma pequena folga. Cada cartão ocupa uns 36% da largura.
- **Prompt:**
  ```
  Top-down product photo of two completely blank business cards (85x55 mm proportion) lying on a light oak wooden surface: a matte cream card #F8F5E2 on the left rotated about -8 degrees and a matte deep green card #074D40 on the right rotated about +6 degrees, small gap between them, each card about one third of the frame width, centered composition, a dried eucalyptus sprig at the top edge, soft directional window light from the left with gentle long shadows, subtle paper texture, realistic, high detail, no printing on the cards
  ```
- **Evitar:** text, logo, letters, numbers, foil, embossing, extra cards, pens.

### 12. `editorial-olfato`
- **Seção:** Aplicações (faixa larga que fecha a colagem).
- **Proporção / tamanho:** 2:1 · 2400×1200.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-maos-cera`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a person with eyes closed smelling a thin white paper perfume blotter strip held close to the nose, profile view, soft window light from camera left, calm sensory moment, the face on the right third, large calm negative space on the left, low-key, rich tonal range, matte blacks, subtle film grain, shot on 85mm at f/2 --ar 2:1 --style raw --v 7 --sref <url-editorial-maos-cera> --sw 60
  ```
- **Evitar:** `--no text, logo, color, branded perfume bottles, jewelry, heavy makeup`

---

## Se der para gerar só 3

1. **`hero-fumaca`**: é a primeira coisa que se vê, e a fumaça em espiral traduz a ideia da vinha (o aroma que se espalha).
2. **`mockup-vela`**: mostra o logo real no produto principal da marca, com a luz quente que amarra a paleta.
3. **`editorial-maos-cera`**: traz o lado artesanal e humano, e serve de âncora da série P&B.

## Referências do logo (PNG 2000 px)

Geradas por `npm run brand -- confraria refs` em `cases/confraria/ref/`:
`confraria-lockup-transparent.png` · `confraria-lockup-dark.png` · `confraria-lockup-light.png` · `confraria-lockup-accent.png` · `confraria-symbol-transparent.png` · `confraria-symbol-dark.png` (o monograma C).

Use-as só como referência de forma ou cor. Nunca peça para a IA reproduzir o logo.
