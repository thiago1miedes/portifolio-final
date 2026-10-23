# Instituto Dor & Saúde — plano de imagens

Página: `/cases/dor-e-saude/` · conteúdo: `cases/dor-e-saude/case.json` · 7 essenciais + 5 opcionais geradas por IA, mais 8 imagens reais que já estão prontas (3 caminhos da apresentação e 5 mockups da papelaria entregue).

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/dor-e-saude/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- dor-e-saude images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/dor-e-saude/img/`. As fotos editoriais saem em P&B mesmo se a IA devolver um pouco de cor.
3. Recarregue a página. A imagem aparece no lugar do placeholder, sem mexer em código.
   Se preferir, salve direto um `.webp` em `public/brand/dor-e-saude/img/<id>.webp`.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **em branco** (parede lisa, jaleco liso, garrafa lisa, placa lisa, sacola lisa). O SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/dor-e-saude/?pin`, arraste os 4 cantos sobre a superfície e cole o array que aparece no campo `pin` do mockup em `case.json`. As composições abaixo já batem com o `pin` padrão; o ajuste costuma ser fino.

**Feito em código, sem IA:** a abertura (o círculo, a figura e os quinze pontos se desenhando), a separação das peças do símbolo sobre a grade, os recortes gigantes do & e do Ú, a faixa "Instituto Dor & Saúde" em movimento, o padrão com o símbolo, a tela de agendamento no celular, o sistema do logo e os blocos de cor.

**Imagens reais, já prontas:**
- `caminho-1`, `caminho-2` e `caminho-3` (seção Processo): páginas 2, 8 e 14 da apresentação original (`Dor&Saúde/Apresentação_dor_e_saude.pdf`).
- `papelaria-cartao`, `papelaria-pasta`, `papelaria-bloco`, `papelaria-receituario` e `papelaria-controle` (Aplicações): os mockups da papelaria entregue (`Dor&Saúde/Papelaria/Mockup/`).

Os originais em alta estão em `cases/dor-e-saude/raw/`.

## Coerência visual (vale para todas)

- **Luz:** suave e lateral, de uma janela grande à esquerda da câmera, como manhã clara num consultório. Um toque de luz quente (dourada) só nas bordas, contra sombras frias e azuladas. Nada de flash, luz dura de estúdio ou HDR.
- **Lente:** 85 mm nas fotos de corpo e de mãos (fundo bem desfocado), 50 mm nos objetos e mockups, 35 mm nos ambientes (verticais corrigidas).
- **Cor (imagens coloridas):** sombras puxando para o azul noturno `#0D1828` e o azul oceano `#172E4D`, altas no off-white `#FCFCFC`, superfícies em bege areia `#E3D8C8`, o dourado ocre `#B79359` só na luz quente e em metais. Saturação baixa, aparência limpa de clínica de alto padrão.
- **P&B:** preto e branco editorial de saúde, contraste médio (sem drama), pretos foscos, peles com textura natural, grão fino.
- **Pessoas:** sem rosto identificável. Costas, ombros, mãos, silhuetas. Ninguém fazendo careta de dor.
- **Evite os clichês** de banco de imagem de clínica: o ponto vermelho brilhando nas costas, a mão apertando a lombar, raio-x no negatoscópio, esqueleto de plástico inteiro, comprimidos, seringas, estetoscópio em primeiro plano, aperto de mão, sorriso forçado.

**Gere primeiro `hero-atmosfera`.** É a âncora de luz, cor, lente e grão:
- no Midjourney, use a URL dela em `--sref` nas outras fotos (as P&B também: o script tira a cor depois);
- no Nano Banana / GPT Image, anexe-a como referência de luz e grading ("match the lighting direction, color grading and grain of the reference, not its subject").

Gere `editorial-coluna` em seguida: ela vira a âncora da série **P&B** (`editorial-movimento`, `editorial-modelo`, `editorial-maos`, `editorial-caminhada`).

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `hero-atmosfera.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial · **gerar primeiro** |
| 2 | `editorial-coluna.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial · âncora P&B |
| 3 | `mockup-recepcao.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 4 | `editorial-movimento.webp` | Aplicações | 3:2 · 2000×1333 | Higgsfield (Soul) | essencial |
| 5 | `mockup-jaleco.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | essencial |
| 6 | `mockup-garrafa.webp` | Aplicações | 4:5 · 1600×2000 | GPT Image | essencial |
| 7 | `editorial-modelo.webp` | Aplicações | 4:5 · 1600×2000 | GPT Image | essencial |
| 8 | `textura-linho.webp` | Símbolo (fundo) | 3:2 · 2400×1600 | Flux 1.1 Pro | opcional |
| 9 | `mockup-placa-porta.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | opcional |
| 10 | `mockup-sacola.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | opcional |
| 11 | `editorial-maos.webp` | Aplicações (faixa larga final) | 2:1 · 2400×1200 | Midjourney v7 | opcional |
| 12 | `editorial-caminhada.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |
| — | `caminho-1/2/3.webp` | Processo | 16:9 · 1600×900 | recorte do PDF da apresentação | **pronto** |
| — | `papelaria-*.webp` (5) | Aplicações | 3:2, 5:4 e 4:3 | mockups reais da papelaria | **pronto** |

Opcionais que faltarem somem do site publicado; no `npm run dev` elas aparecem como placeholder para você ver o lugar.

---

## Essenciais

### 1. `hero-atmosfera` — gerar primeiro
- **Seção:** Intro (fundo da abertura escura, atrás do símbolo que se desenha).
- **Proporção / tamanho:** 16:9 · 2400×1350. Se sair menor, amplie no **Magnific** (modo Precision, *creativity* baixo, para não inventar textura na pele).
- **Ferramenta:** Midjourney v7, o melhor em atmosfera e luz. Alternativa: Flux 1.1 Pro Ultra.
- **Logo para anexar:** nenhum. O logo entra por código por cima.
- **Por que essa foto:** a linha da coluna marcada pela luz dourada é o símbolo em forma de corpo: a figura azul na sombra, a coluna em dourado.
- **Composição:** a imagem fica atrás do logo, então o centro precisa ficar escuro e limpo. As costas ficam no terço direito, de perfil três-quartos; o resto é penumbra.
- **Prompt:**
  ```
  Dark cinematic fine-art photograph of the bare upper back and shoulders of a person seen from behind, positioned on the right third of the frame, a soft warm golden rim light #B79359 grazing along the spine from the right and drawing the line of the vertebrae, the rest of the body melting into deep navy shadow #0D1828 with an ocean blue #172E4D undertone, large calm dark negative space in the center and left of the frame, serene, healing, no face visible, shot on 85mm at f/2, shallow depth of field, subtle film grain, low saturation --ar 16:9 --style raw --v 7 --s 150
  ```
- **Evitar:** `--no face, text, logo, tattoo, red glow, pain highlight, skeleton overlay, x-ray, hands, jewelry, harsh studio light, lens flare, HDR`

### 2. `editorial-coluna` — âncora P&B
- **Seção:** Aplicações (foto grande à esquerda, a primeira da colagem, ao lado do recorte gigante do &).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7 com `--sref` de `hero-atmosfera`. Se as mãos saírem estranhas, refaça no **Higgsfield (Soul)**, que é mais confiável em mãos e pele.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a clinician's hands gently palpating along the spine of a patient lying face down on a treatment table, fingertips resting between two vertebrae of the lower back, the patient's face out of frame, a folded white towel at the edge, soft large window light from camera left revealing natural skin texture, calm and precise, medium contrast, matte blacks, fine film grain, shot on 85mm at f/2.8, shallow depth of field --ar 4:5 --style raw --v 7 --sref <url-hero-atmosfera> --sw 50
  ```
- **Evitar:** `--no face, text, logo, color, red pain highlight, gloves, rings, watch, massage oil shine, candles, spa stones, stethoscope`

### 3. `mockup-recepcao`
- **Seção:** Aplicações (foto larga depois do app).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Segue bem instrução de posição e mantém a parede lisa. Anexe `hero-atmosfera` como referência de grading. Alternativa: GPT Image.
- **Logo para anexar:** `cases/dor-e-saude/ref/dor-e-saude-horizontal-light.png` **só como referência de proporção** ("the blank wall area must have the proportions of this layout, but leave it empty"). A versão horizontal real entra por código, em off-white e dourado.
- **Composição:** a parede atrás do balcão, vista de frente; a área vazia do logo fica entre 30% e 70% da largura e entre 26% e 46% da altura (o `pin` padrão).
- **Prompt:**
  ```
  Interior photograph of the reception of a premium orthopedic and pain clinic. A long low reception counter in pale honed stone #E3D8C8 with a thin brushed brass edge, and behind it a smooth matte wall painted deep ocean blue #172E4D that is completely blank: no text, no logo, no frames, no screens. The empty area of the wall between 30% and 70% of the image width and between 26% and 46% of the image height is perfectly clear and evenly lit by a soft warm wall-washer light from above. Seen straight on at eye level, symmetric, corrected verticals. A small ceramic vase with a single dry branch at the far end of the counter, warm off-white floor. Soft daylight from the left, low saturation, calm and elegant, shot on 35mm, high detail.
  ```
- **Evitar:** text, letters, logos, TV screens, signage, people, computer monitors on the counter, plants in front of the wall, ring lights, tilted perspective.

### 4. `editorial-movimento`
- **Seção:** Aplicações (à direita da recepção).
- **Proporção / tamanho:** 3:2 · 2000×1333.
- **Ferramenta:** Higgsfield (Soul), o mais natural em corpo e movimento. Anexe `editorial-coluna` como referência de luz. Alternativa: Midjourney v7 com `--sref`.
- **Logo para anexar:** nenhum.
- **Por que essa foto:** "sair da dor para o movimento, da limitação para a liberdade", a frase do conceito.
- **Prompt:**
  ```
  Editorial black and white photograph of a woman seen from behind stretching both arms up over her head with ease, standing in a bright minimal room in front of a large window with sheer curtains, light linen clothing, her spine and shoulders long and relaxed, a feeling of relief and freedom, soft diffused daylight, medium contrast, matte blacks, fine film grain, shot on 50mm at f/2.8, plenty of negative space on the left
  ```
- **Evitar:** face, text, logo, color, gym, yoga mat, sportswear, fitness pose, sweat, phone, fisheye.

### 5. `mockup-jaleco`
- **Seção:** Aplicações (vertical à esquerda, depois da papelaria).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini). Anexe `hero-atmosfera` como referência de grading.
- **Logo para anexar:** `cases/dor-e-saude/ref/dor-e-saude-untagged-light.png` só como referência de tamanho. O logo entra por código com `multiply`, como um bordado sobre o tecido.
- **Composição:** recorte do peito, sem rosto. A área lisa do bordado fica no peito esquerdo de quem veste (à direita na foto), entre 56% e 74% da largura e entre 32% e 47% da altura.
- **Prompt:**
  ```
  Close-up editorial photograph of the chest of a doctor wearing a crisp white cotton lab coat over a navy blue #172E4D scrub top, cropped from the collar to the waist, no face visible. On the wearer's left chest (right side of the image), above the breast pocket, there is a clean flat smooth area of fabric between 56% and 74% of the image width and between 32% and 47% of the image height, completely blank: no embroidery, no text, no logo, no badge. Hands relaxed out of frame. Soft window light from the left, gentle fabric folds, warm off-white background softly out of focus, low saturation, shot on 85mm at f/2.8.
  ```
- **Evitar:** face, stethoscope, name tag, pens in the pocket, embroidery, text, logos, blood, gloves, wrinkled fabric over the blank area.

### 6. `mockup-garrafa`
- **Seção:** Aplicações (vertical à direita do recorte do Ú).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** GPT Image. É o mais limpo em produto com superfície lisa e reflexo controlado. Anexe `hero-atmosfera` como referência de cor.
- **Logo para anexar:** `cases/dor-e-saude/ref/dor-e-saude-symbol-transparent.png` só como referência de tamanho. O símbolo entra por código em off-white e dourado (`screen`).
- **Composição:** garrafa reta, de frente, no centro; a área lisa do símbolo fica entre 38% e 62% da largura e entre 40% e 58% da altura.
- **Prompt:**
  ```
  Studio product photograph of a single stainless steel thermal water bottle with a matte powder-coated finish in deep ocean blue #172E4D and a brushed brass cap, standing upright and perfectly straight in the center of the frame on a pale honed stone surface #E3D8C8. The front of the bottle is completely blank, with an empty smooth area between 38% and 62% of the image width and between 40% and 58% of the image height. Warm off-white background #FCFCFC, soft large window light from the left, a gentle soft shadow to the right, subtle reflections, low saturation, clean premium wellness aesthetic, shot on 50mm, high detail.
  ```
- **Evitar:** text, logos, labels, stickers, water drops, ice, plants, gym equipment, multiple bottles, glossy plastic look.

### 7. `editorial-modelo`
- **Seção:** Aplicações (vertical à esquerda do padrão com o símbolo).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** GPT Image, o mais fiel em objeto anatômico (as IAs costumam errar a forma das vértebras). Confira a anatomia antes de usar. Anexe `editorial-coluna` como referência de luz.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white still life photograph of an anatomical model of the human spine in natural bone color standing upright on a pale stone desk in a calm doctor's office, the natural S-curve of the vertebral column clearly visible from the side, anatomically accurate vertebrae and discs, a closed notebook and a fountain pen softly out of focus in the foreground, large window light from camera left, medium contrast, matte blacks, fine film grain, shot on 85mm at f/2.8, shallow depth of field, vertical composition
  ```
- **Evitar:** full skeleton, skull, ribs, red or blue painted nerves, text, labels, logo, x-ray, cluttered desk, color.

---

## Opcionais

### 8. `textura-linho`
- **Seção:** Símbolo (fundo bem apagado atrás do símbolo que se separa).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Flux 1.1 Pro, ótimo em textura de material. Anexe `hero-atmosfera` como referência de cor.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Close-up of a deep navy blue #0D1828 linen fabric gently draped in soft folds, a single thin band of warm golden light #B79359 crossing the folds diagonally from the upper right, large dark calm areas, fine visible weave, minimal and abstract, shot on 85mm, low-key, subtle grain.
  ```
- **Evitar:** text, patterns, prints, wrinkles in a mess, bright light, purple tones, shiny satin.

### 9. `mockup-placa-porta`
- **Seção:** Aplicações (vertical à esquerda, perto do fim da colagem).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini). Anexe `hero-atmosfera` como referência de grading.
- **Logo para anexar:** nenhum. O logo vertical entra por código em off-white e dourado (`screen`).
- **Composição:** placa vista de frente, mais larga que alta, entre 33% e 67% da largura e entre 34% e 56% da altura.
- **Prompt:**
  ```
  Architectural detail photograph of a blank rectangular door sign, slightly wider than tall, in matte deep ocean blue #172E4D with a thin brushed brass frame, mounted on a warm off-white plaster wall #FCFCFC next to the edge of a pale oak consultation room door in a calm clinic corridor. The sign is seen straight on, occupies the area from 33% to 67% of the image width and from 34% to 56% of the image height, and is completely blank. Soft daylight from the left, a gentle shadow under the sign, low saturation, shot on 50mm, corrected verticals.
  ```
- **Evitar:** text, letters, numbers, logo, room number, door handle in front of the sign, hand sanitizer, fire extinguisher, posters.

### 10. `mockup-sacola`
- **Seção:** Aplicações (vertical à direita da placa da porta).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini). Alternativa: GPT Image.
- **Logo para anexar:** nenhum. O logo vertical entra por código em off-white e dourado (`screen`).
- **Composição:** sacola de frente, a face lisa ocupando o meio; a área do logo fica entre 32% e 68% da largura e entre 40% e 64% da altura.
- **Prompt:**
  ```
  Product photograph of a single premium paper gift bag in matte deep ocean blue #172E4D with natural cotton rope handles, standing upright and facing the camera on a pale honed stone counter #E3D8C8, tissue paper in warm off-white peeking from the top. The front face of the bag is completely blank: no text, no logo, no print, with an empty area between 32% and 68% of the image width and between 40% and 64% of the image height. Warm off-white background, soft window light from the left, gentle shadow, low saturation, calm premium aesthetic, shot on 50mm, high detail.
  ```
- **Evitar:** text, logos, ribbons, bows, stickers, multiple bags, glossy plastic, Christmas decorations.

### 11. `editorial-maos`
- **Seção:** Aplicações (faixa larga que fecha a colagem).
- **Proporção / tamanho:** 2:1 · 2400×1200.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-coluna`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of an older woman's hand resting gently in the open hands of a clinician across a pale table, close-up of the hands only, a quiet gesture of trust and care, soft window light from camera left, the hands on the left third and calm negative space on the right, medium contrast, matte blacks, fine film grain, shot on 85mm at f/2.8 --ar 2:1 --style raw --v 7 --sref <url-editorial-coluna> --sw 60
  ```
- **Evitar:** `--no face, text, logo, color, gloves, rings, watch, handshake, pills, medical instruments`

### 12. `editorial-caminhada`
- **Seção:** Fechamento (fundo apagado atrás de "Sua vida sem dor começa aqui." e da ficha técnica).
- **Proporção / tamanho:** 16:9 · 2400×1350.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-coluna`.
- **Logo para anexar:** nenhum.
- **Composição:** o texto fica por cima, à esquerda e no centro; a pessoa é pequena, no terço direito, e o mar ocupa a parte de baixo. É uma praia do litoral cearense, sem ponto turístico reconhecível.
- **Prompt:**
  ```
  Editorial black and white photograph of a lone person walking barefoot and at ease along the edge of the sea at sunrise on a wide tropical northeastern Brazilian beach, seen from far away and small on the right third of the frame, gentle waves and wet sand reflecting the sky, a few distant coconut palms on the horizon, vast calm negative space, serene and free, medium contrast, matte blacks, fine film grain, shot on 35mm --ar 16:9 --style raw --v 7 --sref <url-editorial-coluna> --sw 60
  ```
- **Evitar:** `--no text, signage, buildings, boats, crowds, dogs, color, dramatic sunset, drone fisheye`

---

## Se der para gerar só 3

1. **`hero-atmosfera`**: é a primeira coisa que se vê. A luz dourada desenhando a coluna nas costas traduz o símbolo em corpo antes mesmo de ele terminar de se desenhar.
2. **`mockup-recepcao`**: a única aplicação de espaço físico, onde o paciente encontra a marca pela primeira vez; mostra o logo grande, em off-white e dourado sobre o azul oceano.
3. **`editorial-coluna`**: abre a colagem com o gesto do cuidado (mãos percorrendo a coluna) e amarra a fotografia P&B ao conceito dos pontos.

## Referências do logo (PNG 2000 px)

Geradas por `npm run brand -- dor-e-saude refs` em `cases/dor-e-saude/ref/`:
`dor-e-saude-lockup-transparent.png` · `dor-e-saude-lockup-dark.png` · `dor-e-saude-lockup-light.png` · `dor-e-saude-lockup-accent.png` (sobre o dourado) · `dor-e-saude-untagged-transparent.png` · `dor-e-saude-untagged-dark.png` · `dor-e-saude-untagged-light.png` (versão principal, sem descritor) · `dor-e-saude-symbol-transparent.png` · `dor-e-saude-symbol-dark.png` · `dor-e-saude-horizontal-transparent.png` · `dor-e-saude-horizontal-light.png`.

Use-as só como referência de forma ou proporção. Nunca peça para a IA reproduzir o logo.
