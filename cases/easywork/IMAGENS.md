# EasyWork Outsourcing — plano de imagens

Página: `/cases/easywork/` · conteúdo: `cases/easywork/case.json` · 7 essenciais + 5 opcionais geradas por IA. Também usa 7 peças reais e 4 prints do site, que já estão no lugar.

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/easywork/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- easywork images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/easywork/img/`. As fotos editoriais saem em P&B mesmo que a IA devolva um pouco de cor.
3. Recarregue a página. A imagem entra no lugar do placeholder sem mexer em código.
   Se preferir, salve direto um `.webp` em `public/brand/easywork/img/<id>.webp`.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **em branco** (crachá liso, adesivo liso, caneca lisa, parede lisa). O SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/easywork/?pin`, arraste os 4 cantos sobre a superfície e cole o array que aparece no campo `pin` do mockup em `case.json`. As composições abaixo já batem com o `pin` padrão, então o ajuste costuma ser fino.

**Feito em código, sem IA:** o recorte gigante do "sy" (com a perna do y que vira base), o recorte do canto chanfrado do símbolo, a faixa "EasyWork" em movimento, o padrão de blocos, o painel do cliente no celular, o sistema do logo e os blocos de cor.

## Peças reais (já no lugar, não gerar)

Validei cada uma contra o logo final (`Easy/Logo case/logo_EasyWork.svg`, a versão "Alterado" de `apresentação-logo-Easy-v2(jun23).pdf`):

| id | arquivo original | onde entra |
|---|---|---|
| `mockup-notebook` | `Easy/img-final-01.jpg` | Aplicações |
| `mockup-papelaria` | `Easy/img-final-02.jpg` | Aplicações |
| `site-pessoa` | `Easy/WebSite-easywwork/Img-banner-home-v2.png` | Aplicações |
| `site-marketing` | `Easy/WebSite-easywwork/img-marketing.png` | Aplicações |
| `device-notebook` | `Easy/WebSite-easywwork/img-notebook-easy.png` | Site (aparelhos) |
| `device-celular` | `Easy/WebSite-easywwork/img-celular-easy-v4.png` | Site (aparelhos) |
| `device-celular-mini` | `Easy/WebSite-easywwork/img-celular-easy-v2.png` | Site (aparelhos) |

- **Atenção:** `mockup-notebook`, `mockup-papelaria` e `device-notebook` mostram a proposta 1 **antes do ajuste**, com o "outsourcing" menor, alinhado sob o "Work". É a mesma marca, mas não o desenho final. As legendas dizem "mockup da apresentação, 2023". Se quiser só o desenho final, apague esses itens de `case.json`.
- **Prints do site:** `cases/easywork/source/site-*.png` vêm de `Easy/Prints Site/` (02/08/2023). Para regenerar, rode `npm run brand -- easywork site`. O script corta as margens laterais (`site.crop`) e remove a faixa em branco do topo da home (`cut`), onde o banner não carregou na captura. Se você tiver um print da home com o banner, troque o arquivo e apague o `cut`.
- **Ficaram de fora, por serem outra marca ou outra proposta:** `img-final-03` a `img-final-12` (as propostas 2 e 3 e a Easy Directories), o print `screencapture-easydirectories…` e tudo de `WebSite-easydirectories/`.

## Coerência visual (vale para todas)

- **Luz:** fria e limpa, de escritório de tecnologia no fim da tarde. A luz principal é suave e vem de uma janela à esquerda da câmera, com a tela do monitor como luz de recorte. Sombras profundas, mas abertas. Sem flash.
- **Lente:** 50 mm f/2.8 no geral, 35 mm nos planos abertos e 100 mm macro nos detalhes. Pouca profundidade de campo e grão de filme leve.
- **Cor (imagens coloridas):** sombras puxando para o azul-noite `#01131F`, médios em azul-marinho `#022135`, altas no cinza-névoa `#F2F2F2`. O verde `#48C972` aparece só como luz: telas, LEDs, uma planta. Nada de roxo, rosa ou neon "cyberpunk".
- **P&B:** preto e branco neutro, levemente frio, contraste médio-alto, pretos foscos e grão leve.
- **Materiais da série:** alumínio escovado, vidro, madeira clara, tecido cinza, concreto liso. Nada de holograma, "chuva de código" ou cenário futurista.
- **Telas:** nenhuma tela legível. Código sempre desfocado ou fora do quadro (IA inventa texto torto).

**Gere primeiro `editorial-dev-teclado`.** Ela é a âncora de luz, lente e grão da série:
- no Midjourney, use a URL dela em `--sref` nas outras fotos P&B;
- no Nano Banana / GPT Image, anexe-a como referência de luz ("match the lighting direction, softness and grain of the reference, not its colors").

Gere `hero-codigo` em seguida. Ela é a âncora de **cor** para `textura-grid` e para os mockups (anexe como referência de grading).

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `editorial-dev-teclado.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial · **gerar primeiro** |
| 2 | `hero-codigo.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial |
| 3 | `editorial-squad.webp` | Aplicações | 3:2 · 2000×1333 | Midjourney v7 | essencial |
| 4 | `mockup-cracha.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | essencial |
| 5 | `mockup-notebook-tampa.webp` | Aplicações | 3:2 · 2400×1600 | GPT Image | essencial |
| 6 | `mockup-caneca.webp` | Aplicações | 4:5 · 1600×2000 | Nano Banana (Gemini) | essencial |
| 7 | `mockup-recepcao.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) / GPT Image | essencial |
| 8 | `textura-grid.webp` | Símbolo (fundo) | 3:2 · 2400×1600 | Flux 1.1 Pro / Midjourney v7 | opcional |
| 9 | `editorial-escritorio.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |
| 10 | `mockup-caixa.webp` | Aplicações | 1:1 · 1800×1800 | Nano Banana (Gemini) | opcional |
| 11 | `mockup-cartoes.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | opcional |
| 12 | `editorial-chamada.webp` | Aplicações (faixa larga final) | 2:1 · 2400×1200 | Midjourney v7 | opcional |

Opcionais que faltarem somem do site publicado. No `npm run dev`, elas aparecem como placeholder para você ver o lugar.

---

## Essenciais

### 1. `editorial-dev-teclado` — gerar primeiro
- **Seção:** Aplicações (foto grande à esquerda, primeira da colagem, ao lado do recorte do "sy").
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7. Tem a melhor estética editorial em P&B, e o `--sref` dela vai amarrar a série.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a software developer's hands typing on a low-profile mechanical keyboard in the evening, the soft glow of a monitor just out of frame falling on the keycaps and knuckles, the edge of a coffee mug blurred in the foreground, soft directional window light from camera left mixed with cool screen light, low-key, deep open shadows, rich tonal range, matte blacks, subtle film grain, shot on 50mm lens at f/2.8, shallow depth of field, quiet documentary mood --ar 4:5 --style raw --v 7 --s 120
  ```
- **Evitar:** `--no text, letters, readable code, logo, watermark, color, RGB lighting, gloves, clutter`

### 2. `hero-codigo`
- **Seção:** Intro (fundo da abertura escura, atrás do logo que se desenha).
- **Proporção / tamanho:** 16:9 · 2400×1350. Se sair menor, amplie no **Magnific** (modo Precision, *creativity* baixo, para não inventar textura).
- **Ferramenta:** Midjourney v7, ótimo em luz e bokeh. Alternativa: Flux 1.1 Pro Ultra.
- **Logo para anexar (opcional):** `cases/easywork/ref/easywork-symbol-dark.png` como *image prompt* com peso baixo (`--iw 0.25`), só para puxar a diagonal de 45° do canto chanfrado. O logo real entra por código por cima.
- **Composição:** a imagem fica atrás do logo, então o centro precisa ficar escuro e limpo. As linhas de luz ficam no terço de baixo e na borda direita.
- **Prompt:**
  ```
  Abstract dark background in deep navy #01131F fading to #022135, thin horizontal streaks of soft green light #48C972 like lines of code passing far out of focus, heavy creamy bokeh, the streaks concentrated along the lower third and the right edge, one faint diagonal light beam at 45 degrees from the top right corner, large calm dark negative space in the center, cinematic, minimal, low-key, shot on 85mm at f/1.8, subtle film grain, premium technology mood --ar 16:9 --style raw --v 7 --s 150
  ```
- **Evitar:** `--no text, letters, numbers, readable code, logo, people, purple, pink, neon, cyberpunk, matrix rain, hologram, busy background`

### 3. `editorial-squad`
- **Seção:** Aplicações (à direita do notebook da apresentação).
- **Proporção / tamanho:** 3:2 · 2000×1333.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-dev-teclado`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Black and white documentary photograph of three software developers reviewing code together at one desk, one pointing at a large monitor seen from behind and softly blurred, the other two leaning in, laptops and paper notes on a light wooden table, modern office with large window light from camera left, candid collaborative moment, faces partially turned away, rich tonal range, matte blacks, subtle film grain, shot on 35mm at f/2.8 --ar 3:2 --style raw --v 7 --sref <url-editorial-dev-teclado> --sw 60
  ```
- **Evitar:** `--no text, readable screens, logo, color, handshake, posed stock smiles, suits, ties`

### 4. `mockup-cracha`
- **Seção:** Aplicações (crachá, ao lado do painel do cliente no celular).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Segue bem "cartão liso" e dá para corrigir por edição ("remove any print from the card").
- **Logo para anexar:** **nenhum.** Anexe `hero-codigo` só como referência de cor.
- **Composição (combina com o `pin` padrão):** crachá em pé, centralizado e de frente. O cartão branco ocupa cerca de 1/4 da largura do quadro (de 37% a 63%), com a borda de cima a 40% da altura. O logo entra na parte de cima do cartão (de 45% a 52% da altura).
- **Prompt:**
  ```
  Product photo of a blank white vertical ID badge card in a clear plastic holder hanging from a plain navy blue lanyard #022135, the badge centered in the frame and facing the camera, the card about one quarter of the frame width with its top edge at about 40 percent of the frame height, completely blank white surface with no print, resting against a light gray desk #F2F2F2 next to the corner of a silver laptop and a small green plant, soft window light from the left, gentle shadows, realistic, high detail, shot on 50mm at f/4
  ```
- **Evitar:** text, logo, photo, barcode, QR code, print on the lanyard, extra badges, hands.

### 5. `mockup-notebook-tampa`
- **Seção:** Aplicações (adesivo, ao lado do padrão de blocos).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** GPT Image (ChatGPT). Controla bem a posição do adesivo e aceita "tampa sem logo".
- **Logo para anexar:** nenhum.
- **Composição (combina com o `pin` padrão):** vista de cima. Tampa centralizada, com cerca de metade da largura do quadro. Um adesivo branco quadrado bem no centro da tampa, com uns 10% da largura do quadro (de 45% a 55% na largura e de 40% a 55% na altura).
- **Prompt:**
  ```
  Top-down photo of a closed, unbranded silver aluminum laptop with a plain lid and no logo, lying on a light oak desk, the lid centered and occupying about half of the frame width, a single blank white square sticker with slightly rounded corners placed exactly in the center of the lid, the sticker about 10 percent of the frame width, a navy blue notebook #022135 and a pen at the left edge, a coffee cup at the top right corner, soft window light from the left, realistic, high detail, no text anywhere
  ```
- **Evitar:** text, logo, Apple logo, brand marks on the lid, extra stickers, open laptop, hands.

### 6. `mockup-caneca`
- **Seção:** Aplicações (caneca, ao lado do recorte do canto do símbolo).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image).
- **Logo para anexar:** nenhum. Anexe `hero-codigo` como referência de cor.
- **Composição (combina com o `pin` padrão):** caneca centralizada e de frente, com a alça para a direita e cerca de 40% da largura do quadro. A face lisa fica no centro (de 41% a 59% na largura e de 42% a 56% na altura).
- **Prompt:**
  ```
  Product photo of a plain white ceramic coffee mug on a developer's desk, the mug centered in the frame and facing the camera with the handle to the right, the mug about 40 percent of the frame width, its front face completely blank, faint steam rising, a blurred monitor with a deep navy #022135 glow and a mechanical keyboard in the background, soft window light from the left, cool clean tones with a subtle green accent light #48C972 coming from the monitor, realistic, high detail, shot on 50mm at f/2.8
  ```
- **Evitar:** text, logo, print on the mug, pattern, extra mugs, hands.

### 7. `mockup-recepcao`
- **Seção:** Aplicações (recepção, a marca em escala).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image) ou GPT Image. Os dois seguram bem "parede lisa".
- **Logo para anexar:** nenhum. O logo bicolor entra por código com `screen` (o branco e o verde acendem sobre o azul).
- **Composição (combina com o `pin` padrão):** painel azul-marinho liso na parte de cima do quadro. A área livre para o logo vai de 24% a 76% da largura e de 24% a 42% da altura. Balcão no terço de baixo.
- **Prompt:**
  ```
  Interior photo of a modern technology company reception, a large smooth matte navy blue wall panel #022135 filling the upper half of the frame, completely blank, a light oak reception desk in the lower third, a tall green plant at the right edge, polished concrete floor, soft neutral ceiling light washing the wall evenly from above, straight-on architectural view, shot on 24mm at f/5.6, clean minimal, realistic, no people
  ```
- **Evitar:** text, logo, signage, letters, screens, people, clutter.

---

## Opcionais

### 8. `textura-grid`
- **Seção:** Símbolo (fundo sutil, em baixa opacidade, atrás do bloco).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Flux 1.1 Pro, ou Midjourney v7 com `--sref <URL de hero-codigo>`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Macro photograph of a dark navy printed circuit board #01131F, thin copper traces glowing softly in green #48C972 along 45-degree diagonal paths, very shallow depth of field, mostly dark with lots of negative space, low-key light from the left, cinematic, shot on 100mm macro at f/4, subtle grain --ar 3:2 --style raw --v 7 --sref <url-hero-codigo>
  ```
- **Evitar:** `--no text, letters, numbers, chip logos, rainbow colors, purple, sparks`

### 9. `editorial-escritorio`
- **Seção:** Fechamento (fundo escuro, bem apagado, atrás de ".coding our future").
- **Proporção / tamanho:** 16:9 · 2400×1350.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-dev-teclado`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Black and white photograph of an empty modern software office at dusk, rows of desks with closed laptops and two monitors still glowing softly, large windows with distant city lights, chairs pushed in, calm end-of-day mood, wide composition with darker negative space in the center, soft window light from the left, rich tonal range, subtle film grain, shot on 24mm at f/4 --ar 16:9 --style raw --v 7 --sref <url-editorial-dev-teclado> --sw 60
  ```
- **Evitar:** `--no text, readable screens, logo, people, color`

### 10. `mockup-caixa`
- **Seção:** Aplicações (kit de boas-vindas, penúltima linha).
- **Proporção / tamanho:** 1:1 · 1800×1800.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image), que controla bem material e ângulo.
- **Logo para anexar:** nenhum.
- **Composição (combina com o `pin` padrão):** vista de três quartos, de cima. A face de cima da tampa fica no centro-alto do quadro, com os cantos perto de (24%, 30%), (70%, 24%), (82%, 42%) e (36%, 49%).
- **Prompt:**
  ```
  Product photo of a closed rectangular matte navy blue box #022135, a welcome kit for new team members, seen from a three-quarter angle above, the top face of the lid completely blank and occupying the upper center of the frame, a white notebook and a green pen #48C972 beside it, on a light gray surface #F2F2F2, soft window light from the left with gentle shadows, realistic, high detail, shot on 50mm at f/5.6
  ```
- **Evitar:** text, logo, print, ribbon over the lid, open lid, extra boxes.

### 11. `mockup-cartoes`
- **Seção:** Aplicações (penúltima linha, ao lado do kit).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image).
- **Logo para anexar:** nenhum.
- **Composição (combina com o `pin` padrão):** vista de cima. Cartão **branco** à esquerda, girado cerca de −8°. Cartão **azul-marinho** à direita, girado cerca de +6°, com uma pequena folga. Cada cartão ocupa uns 36% da largura.
- **Prompt:**
  ```
  Top-down product photo of two completely blank business cards (85x55 mm proportion) lying on a light gray concrete surface #F2F2F2: a matte white card on the left rotated about -8 degrees and a matte navy blue card #022135 on the right rotated about +6 degrees, small gap between them, each card about one third of the frame width, centered composition, a green pen #48C972 at the top edge, soft directional window light from the left with gentle long shadows, subtle paper texture, realistic, high detail, no printing on the cards
  ```
- **Evitar:** text, logo, letters, numbers, foil, embossing, extra cards.

### 12. `editorial-chamada`
- **Seção:** Aplicações (faixa larga que fecha a colagem).
- **Proporção / tamanho:** 2:1 · 2400×1200.
- **Ferramenta:** Midjourney v7 com `--sref` de `editorial-dev-teclado`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a person wearing over-ear headphones in a work video call at a desk, seen in profile, the laptop screen softly blurred, paper notes beside the keyboard, the person on the right third, large calm negative space on the left, soft window light from camera left, low-key, rich tonal range, matte blacks, subtle film grain, shot on 85mm at f/2 --ar 2:1 --style raw --v 7 --sref <url-editorial-dev-teclado> --sw 60
  ```
- **Evitar:** `--no text, readable screens, logo, color, gaming headset, RGB lights`

---

## Se der para gerar só 3

1. **`hero-codigo`**: é a primeira coisa que se vê. As linhas de luz verde sobre o azul-noite apresentam a paleta e o tema (código) antes de qualquer texto.
2. **`editorial-dev-teclado`**: abre a colagem, dá o lado humano do trabalho e é a âncora da série P&B.
3. **`mockup-recepcao`**: mostra o logo real em escala de parede, o tipo de imagem que faz o case parecer uma marca já no ar.

## Referências do logo (PNG 2000 px)

Geradas por `npm run brand -- easywork refs` em `cases/easywork/ref/`:
`easywork-lockup-transparent.png` · `easywork-lockup-dark.png` · `easywork-lockup-light.png` · `easywork-lockup-accent.png` · `easywork-symbol-transparent.png` · `easywork-symbol-dark.png`.

Use-as só como referência de forma ou cor. Nunca peça para a IA reproduzir o logo.
