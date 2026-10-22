# Débora Sandrin — plano de imagens

Página: `/cases/debora-sandrin/` · conteúdo: `cases/debora-sandrin/case.json` · 8 essenciais + 5 opcionais geradas por IA, mais 3 imagens reais que já estão prontas.

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/debora-sandrin/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- debora-sandrin images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/debora-sandrin/img/`. As fotos editoriais saem em P&B mesmo se a IA devolver um pouco de cor.
3. Recarregue a página. A imagem aparece no lugar do placeholder, sem mexer em código.
   Se preferir, salve direto um `.webp` em `public/brand/debora-sandrin/img/<id>.webp`.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **em branco** (capa lisa, placa lisa, carimbo vazio, cartões lisos). O SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/debora-sandrin/?pin`, arraste os 4 cantos sobre a superfície e cole o array que aparece no campo `pin` do mockup em `case.json`. As composições abaixo já batem com o `pin` padrão; o ajuste costuma ser fino.

**Feito em código, sem IA:** o símbolo que começa maciço e se abre até o S escavado, os recortes gigantes do logotipo (o A sem travessão e o N de haste aberta), a faixa "Débora Sandrin" em movimento, o padrão com o monograma, o app de acompanhamento do projeto, o sistema do logo e os blocos de cor.

**Imagens reais, já prontas:** `caminho-1`, `caminho-2` e `caminho-3` (seção Processo) foram recortadas da apresentação original (`DeboraSandrin/Logo_DeboraSandrin.pdf`, páginas 2, 5 e 8). Os originais em alta estão em `cases/debora-sandrin/raw/`.

## Coerência visual (vale para todas)

- **Luz:** natural e rasante, de janela ou de sol baixo vindo da esquerda da câmera, como fim de tarde. Arquitetura se mostra pela sombra: sombras longas e nítidas, pretos profundos, sem flash e sem HDR.
- **Lente:** 35 mm nos espaços e fachadas (verticais corrigidas, sem distorção de grande-angular), 50 mm na mesa e nos objetos, 85 mm nos detalhes de textura.
- **Cor (imagens coloridas):** sombras puxando para o nanquim `#1E1115`, um fundo de vinho `#79193E` nas sombras mais quentes, altas no papel manteiga `#F5F0E8`. Pedra e superfícies em travertino `#D8CBBD`; argila `#D9A49A` só em tijolo ou terracota. O vinho forte aparece só nos objetos da marca (capa do caderno, cartão, placa).
- **P&B:** preto e branco de fotografia de arquitetura, contraste médio-alto, pretos foscos (sem esmagar), grão fino.
- **Materiais da série:** concreto aparente, reboco liso, travertino, papel manteiga, papel de prancha, grafite, régua escala de metal, madeira clara, linho. **Evite os clichês** da foto de banco da apresentação de 2022: capacete de obra, casinha de madeira, notebook, compasso cromado em primeiro plano.

**Gere primeiro `editorial-escada`.** É a âncora de luz, lente e grão da série P&B:
- no Midjourney, use a URL dela em `--sref` nas outras fotos P&B;
- no Nano Banana / GPT Image, anexe-a como referência de luz ("match the lighting direction, contrast and grain of the reference, not its subject").

Gere `hero-vazio` em seguida: é a âncora de **cor** para `textura-concreto` e para os mockups (anexe como referência de grading).

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `editorial-escada.webp` | Aplicações | 1:1 · 1500×1500 | Midjourney v7 | essencial · **gerar primeiro** |
| 2 | `hero-vazio.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial |
| 3 | `editorial-croqui.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial |
| 4 | `mockup-placa-obra.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 5 | `mockup-prancha.webp` | Aplicações | 3:2 · 2400×1600 | GPT Image | essencial |
| 6 | `mockup-caderno.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | essencial |
| 7 | `mockup-cartoes.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 8 | `editorial-fachada.webp` | Aplicações | 3:2 · 2000×1333 | Midjourney v7 | essencial |
| 9 | `textura-concreto.webp` | Monograma (fundo) | 3:2 · 2400×1600 | Flux 1.1 Pro | opcional |
| 10 | `editorial-maquete.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | opcional |
| 11 | `mockup-placa-porta.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | opcional |
| 12 | `editorial-luz.webp` | Aplicações (faixa larga final) | 2:1 · 2400×1200 | Midjourney v7 | opcional |
| 13 | `editorial-cidade.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |
| — | `caminho-1/2/3.webp` | Processo | 16:9 · 1600×900 | recorte do PDF de 2022 | **pronto** |

Opcionais que faltarem somem do site publicado; no `npm run dev` elas aparecem como placeholder para você ver o lugar.

---

## Essenciais

### 1. `editorial-escada` — gerar primeiro
- **Seção:** Aplicações (quadrado à direita, ao lado do app, logo antes da faixa em movimento).
- **Proporção / tamanho:** 1:1 · 1500×1500.
- **Ferramenta:** Midjourney v7. Melhor estética editorial em P&B, e o `--sref` dela amarra a série.
- **Logo para anexar:** nenhum.
- **Por que essa foto:** a escada helicoidal vista de baixo desenha uma curva em S dentro de um volume, o mesmo gesto do monograma.
- **Prompt:**
  ```
  Editorial black and white architectural photograph looking straight up into a white board-formed concrete spiral staircase, the helical stair and handrail forming one continuous S-shaped curve that sweeps through the frame, soft daylight falling from a skylight above, deep shadows under each tread, graphic and monumental composition, rich tonal range, matte blacks, fine film grain, shot on 24mm at f/8, perfectly centered, corrected lines --ar 1:1 --style raw --v 7 --s 120
  ```
- **Evitar:** `--no text, signage, people, color, glass railing, lens flare, fisheye distortion, HDR`

### 2. `hero-vazio`
- **Seção:** Intro (fundo da abertura escura, atrás do monograma que se desenha).
- **Proporção / tamanho:** 16:9 · 2400×1350. Se sair menor, amplie no **Magnific** (modo Precision, *creativity* baixo, para não inventar textura no concreto).
- **Ferramenta:** Midjourney v7, ótimo em atmosfera e luz. Alternativa: Flux 1.1 Pro Ultra.
- **Logo para anexar:** nenhum. O logo entra por código por cima.
- **Composição:** a imagem fica atrás do logo, então o centro precisa ficar escuro e limpo. A lâmina de luz entra no terço direito; a parede curva atravessa a parte de baixo.
- **Prompt:**
  ```
  Dark minimalist architectural interior at dusk, a smooth curved board-formed concrete wall sweeping across the lower part of the frame, a single tall narrow vertical slit window on the right third cutting a thin blade of warm light that grazes along the curve, the rest of the space in deep wine-black shadow #1E1115 with a subtle wine red #79193E undertone, warm highlights in pale plaster white #F5F0E8, large calm dark negative space in the center of the frame, quiet, monumental, contemplative, shot on 35mm at f/4, corrected verticals, subtle film grain --ar 16:9 --style raw --v 7 --s 150
  ```
- **Evitar:** `--no text, logo, letters, people, furniture, plants, window grid, blue, green, lens flare, HDR, bright daylight`

### 3. `editorial-croqui`
- **Seção:** Aplicações (foto grande à esquerda, primeira da colagem, ao lado do recorte gigante do A).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-escada`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a woman's hand sketching an architectural floor plan in soft graphite pencil on a sheet of translucent tracing paper laid over a printed technical drawing, the lines of the plan below showing faintly through the paper, a brushed metal scale ruler and a mechanical pencil on a pale stone desk, low raking window light from camera left revealing the paper texture, quiet focused moment, rich tonal range, matte blacks, fine film grain, shot on 50mm at f/2.8, shallow depth of field --ar 4:5 --style raw --v 7 --sref <url-editorial-escada> --sw 60
  ```
- **Evitar:** `--no text, legible words, numbers, logo, color, laptop, hard hat, wooden house model, rings, nail polish, cluttered desk`

### 4. `mockup-placa-obra`
- **Seção:** Aplicações (foto larga logo depois da faixa "Débora Sandrin").
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Segue bem instrução de posição e mantém a placa lisa. Alternativa: GPT Image.
- **Logo para anexar:** `cases/debora-sandrin/ref/debora-sandrin-horizontal-light.png` **só como referência de proporção** ("the blank sign must have the proportions of this layout, but leave it empty"). A versão horizontal real entra por código.
- **Composição:** placa vista de frente, entre 30% e 70% da largura e entre 24% e 58% da altura (o `pin` padrão).
- **Prompt:**
  ```
  Architectural photograph of a blank rectangular construction site sign mounted on a light pine wooden hoarding fence, in front of a contemporary house under construction with exposed concrete structure and scaffolding softly out of focus behind it. The sign is seen straight on at eye level, plain warm off-white #F5F0E8 with a thin wine red #79193E band along its bottom edge, and is completely blank: no text, no logo, no numbers. The sign occupies the area from 30% to 70% of the image width and from 24% to 58% of the image height. Clear late afternoon sun from the left, long soft shadows of the fence boards, warm neutral color grading with deep shadows, shot on 35mm, corrected verticals, high detail.
  ```
- **Evitar:** text, letters, numbers, logos, safety signs, hard hats, people, cranes in front of the sign, graffiti, tilted sign.
- **Observação:** placa de obra de verdade traz responsável técnico e registro no CAU. No case ela é estudo de marca; se quiser esses dados, eles entram no SVG por código, nunca pela IA.

### 5. `mockup-prancha`
- **Seção:** Aplicações (à esquerda, ao lado do padrão com o monograma).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** GPT Image. É o mais confiável em desenho técnico limpo e em deixar uma área vazia onde foi pedido.
- **Logo para anexar:** nenhum.
- **Composição:** vista de cima; o carimbo (vazio) fica no canto inferior direito da prancha, entre 64% e 90% da largura e 64% e 82% da altura.
- **Prompt:**
  ```
  Top-down photograph of a large A1 architectural drawing sheet spread flat on a pale travertine desk #D8CBBD. The sheet shows a clean floor plan and a building section of a contemporary house in fine black ink lines, with hatching on the cut walls, and absolutely no text, no numbers and no dimension labels. In the lower right corner of the sheet there is an empty rectangular title block framed by a thin black line, completely blank inside, located between 64% and 90% of the image width and between 64% and 82% of the image height. A graphite pencil, a brushed metal scale ruler and a roll of tracing paper rest along the left edge. Soft daylight from the upper left, gentle paper shadows, warm neutral grading, editorial still life, shot on 50mm, high detail.
  ```
- **Evitar:** text, letters, numbers, stamps, signatures, logos, coffee cup, laptop, hard hat, house model.

### 6. `mockup-caderno`
- **Seção:** Aplicações (vertical à esquerda, ao lado do app).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini). Anexe `hero-vazio` como referência de grading.
- **Logo para anexar:** nenhum. O monograma entra por código em tom claro, como um *hot stamping* na capa.
- **Composição:** caderno reto, de cima, com a capa ocupando o meio da imagem (o monograma vai entre 38% e 62% da largura e 34% e 58% da altura).
- **Prompt:**
  ```
  Top-down flat lay photograph of a closed A5 hardcover sketchbook lying perfectly straight in the center of the frame, its cover bound in deep wine red linen #79193E and completely blank, no text or marks. It rests on a pale travertine stone desk #D8CBBD; a rolled sheet of tracing paper, a graphite mechanical pencil and a brushed steel scale ruler sit at the edges of the frame. Soft natural window light from the upper left casting gentle shadows, warm neutral color grading, editorial product photography, shot on 50mm, high detail on the linen weave.
  ```
- **Evitar:** text, logo, letters, embossing, stickers, elastic band, bookmark ribbon, extra notebooks, plastic.

### 7. `mockup-cartoes`
- **Seção:** Aplicações (foto larga depois do padrão).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini).
- **Logo para anexar:** nenhum.
- **Composição:** dois cartões na horizontal, lado a lado: à esquerda um papel claro girado um pouco no sentido anti-horário (aprox. 12–51% da largura, 31–73% da altura); à direita um vinho girado no sentido horário (aprox. 52–90% da largura, 27–68% da altura). É o `pin` padrão.
- **Prompt:**
  ```
  Top-down photograph of two blank business cards on a honed travertine stone surface #D8CBBD. Left card: warm off-white cotton paper #F5F0E8, slightly rotated counter-clockwise, occupying roughly 12% to 51% of the width and 31% to 73% of the height. Right card: deep wine red #79193E uncoated paper, slightly rotated clockwise, occupying roughly 52% to 90% of the width and 27% to 68% of the height. Both cards completely blank, sharp edges, visible paper thickness. Soft daylight from the upper left, crisp short shadows, warm neutral grading, minimal editorial stationery photography, shot on 50mm.
  ```
- **Evitar:** text, logo, letters, numbers, foil, embossing, extra cards, pens, plants.

### 8. `editorial-fachada`
- **Seção:** Aplicações (à direita da placa de obra).
- **Proporção / tamanho:** 3:2 · 2000×1333.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-escada`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white architectural photograph of a Brazilian modernist building facade with deep vertical concrete brise-soleil fins casting long rhythmic diagonal shadows across a white wall, strong raking afternoon sun, graphic abstraction of solid and void, rich tonal range, deep matte blacks, fine film grain, shot on 50mm at f/8, corrected verticals --ar 3:2 --style raw --v 7 --sref <url-editorial-escada> --sw 60
  ```
- **Evitar:** `--no text, signage, people, cars, color, air conditioners, dramatic clouds`

---

## Opcionais

### 9. `textura-concreto`
- **Seção:** Monograma (fundo bem apagado atrás do D que se abre).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Flux 1.1 Pro, ótimo em textura de material. Anexe `hero-vazio` como referência de cor.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Close-up of a board-formed exposed concrete wall with horizontal wooden formwork marks and small air pockets, very dark low-key light grazing from the left, deep wine-black shadows #1E1115 with a faint wine red #79193E tint, large dark calm areas, minimal abstract architectural texture, shot on 85mm, subtle grain.
  ```
- **Evitar:** text, graffiti, cracks, stains, bright light, blue or grey cold tones.

### 10. `editorial-maquete`
- **Seção:** Aplicações (vertical à esquerda, perto do fim da colagem).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-escada`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of two hands placing a small curved wall piece into a white architectural massing model made of foam board and paper, the model's volumes casting crisp shadows, a cutting mat and a scalpel softly blurred in the foreground, low raking window light from camera left, quiet focused craft, rich tonal range, matte blacks, fine film grain, shot on 85mm at f/2.8 --ar 4:5 --style raw --v 7 --sref <url-editorial-escada> --sw 60
  ```
- **Evitar:** `--no text, color, wooden house model, toy trees, cars, people's faces, rings`

### 11. `mockup-placa-porta`
- **Seção:** Aplicações (vertical à direita, ao lado da maquete).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini). Anexe `hero-vazio` como referência de grading.
- **Logo para anexar:** nenhum. O logo vertical entra por código em tom claro.
- **Composição:** placa vista de frente, mais larga que alta, entre 31% e 69% da largura e 33% e 57% da altura.
- **Prompt:**
  ```
  Architectural detail photograph of a blank rectangular metal plaque, wider than tall, painted matte deep wine red #79193E, mounted with four discreet brushed steel standoff screws on a light travertine-clad wall #D8CBBD, next to the edge of a pale oak door. The plaque is seen straight on, occupies the area from 31% to 69% of the image width and from 33% to 57% of the image height, and is completely blank. Soft late afternoon side light from the left, a gentle shadow under the plaque, warm neutral grading, shot on 50mm, corrected verticals.
  ```
- **Evitar:** text, letters, numbers, logo, doorbell, intercom, house number, plants.

### 12. `editorial-luz`
- **Seção:** Aplicações (faixa larga que fecha a colagem).
- **Proporção / tamanho:** 2:1 · 2400×1200.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-escada`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a tall narrow vertical slit of daylight cutting through a curved white plaster wall in an empty minimalist interior, the blade of light falling across a polished concrete floor, the slit on the left third, large calm negative space on the right, deep matte blacks, rich tonal range, fine film grain, shot on 35mm at f/5.6, corrected verticals --ar 2:1 --style raw --v 7 --sref <url-editorial-escada> --sw 60
  ```
- **Evitar:** `--no text, people, furniture, color, windows grid, lens flare`

### 13. `editorial-cidade`
- **Seção:** Fechamento (fundo apagado atrás da frase final e da ficha técnica).
- **Proporção / tamanho:** 16:9 · 2400×1350.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-escada`.
- **Logo para anexar:** nenhum.
- **Composição:** o texto fica por cima, à esquerda e no centro; a cidade fica no terço de baixo e na borda direita.
- **Prompt:**
  ```
  Editorial black and white photograph of a southern Brazilian city at dusk seen from a high vantage point, low and mid-rise modernist buildings and tree canopies gathered along the bottom third and the right edge of the frame, a wide calm river in the distance, the rest of the frame a soft fading sky, quiet and atmospheric, rich tonal range, matte blacks, fine film grain, shot on 35mm --ar 16:9 --style raw --v 7 --sref <url-editorial-escada> --sw 60
  ```
- **Evitar:** `--no text, signage, color, skyscrapers dominating, dramatic sunset, people, drone fisheye`

---

## Se der para gerar só 3

1. **`hero-vazio`**: é a primeira coisa que se vê. A lâmina de luz na parede curva traduz "desenhar o vazio" antes mesmo de o monograma terminar de se desenhar.
2. **`mockup-placa-obra`**: mostra o logo onde uma arquiteta assina de verdade, no canteiro, e é a única aplicação que ninguém confunde com outro segmento.
3. **`editorial-croqui`**: abre a colagem com o gesto do projeto (lápis sobre papel manteiga) e serve de ponte entre a fotografia P&B e a paleta "papel manteiga".

## Referências do logo (PNG 2000 px)

Geradas por `npm run brand -- debora-sandrin refs` em `cases/debora-sandrin/ref/`:
`debora-sandrin-lockup-transparent.png` · `debora-sandrin-lockup-dark.png` · `debora-sandrin-lockup-light.png` · `debora-sandrin-lockup-accent.png` (sobre a argila) · `debora-sandrin-symbol-transparent.png` · `debora-sandrin-symbol-dark.png` · `debora-sandrin-horizontal-transparent.png` · `debora-sandrin-horizontal-light.png`.

Use-as só como referência de forma ou proporção. Nunca peça para a IA reproduzir o logo.
