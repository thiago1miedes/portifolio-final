# VOC&S — plano de imagens

Página: `/cases/vocs/` · conteúdo: `cases/vocs/case.json` · 7 essenciais + 5 opcionais geradas por IA. Nenhuma peça real do cliente entra no case: só o logo.

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/vocs/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- vocs images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/vocs/img/`. As fotos editoriais saem em P&B mesmo se a IA devolver um pouco de cor.
3. Recarregue a página. A imagem aparece no lugar do placeholder, sem mexer em código.
   Se preferir, salve direto um `.webp` em `public/brand/vocs/img/<id>.webp`.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **em branco** (cartão liso, crachá liso, parede lisa, caneca lisa, capa lisa). O SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`), com o gradiente do & intacto. Depois de gerar, abra `/cases/vocs/?pin`, arraste os 4 cantos sobre a superfície e cole o array que aparece no campo `pin` do mockup em `case.json`. As composições abaixo já batem com o `pin` padrão; o ajuste costuma ser fino.

**Feito em código, sem IA:** o & que se desenha na abertura, os recortes gigantes (o "o" e o "ɔ" frente a frente, o & em gradiente), a faixa "VOC&S" em movimento, o padrão de &, o app no celular, o sistema do logo e os blocos de cor.

**PNGs do logo para referência** (já gerados, 2000 px): `cases/vocs/ref/vocs-lockup-transparent.png`, `vocs-lockup-dark.png` (sobre azul-noite), `vocs-lockup-light.png` (sobre areia), `vocs-lockup-accent.png` (sobre laranja), `vocs-symbol-transparent.png` e `vocs-symbol-dark.png`. Use-os só para conferir cor e escala ao lado da imagem gerada — **não anexe o logo nas cenas de mockup**, senão a IA tenta desenhá-lo.

## Coerência visual (vale para todas)

- **Luz:** luz natural de janela, suave e lateral (da esquerda da câmera), fim de manhã. Quente nas altas (≈4500 K), sombras abertas e frias. Sem flash, sem luz de estúdio dura.
- **Lente:** 50 mm f/2 no geral, 35 mm nos planos abertos, 85 mm nos retratos e detalhes. Pouca profundidade de campo, grão de filme leve.
- **Cor (imagens coloridas):** sombras puxando para o azul-noite `#05213A`, médios em azul `#004E88` dessaturado, altas no areia `#F6F2EC`. Laranja `#FF6D00` e carmim `#BC1F36` só em pontos pequenos (um post-it, uma almofada, a luz da janela). Nada de verde ou roxo.
- **P&B:** preto e branco levemente quente, contraste médio, pretos foscos (sem esmagar), grão leve. Clima documental, gente real, sem pose de banco de imagens.
- **Gente:** adultos de 25 a 50 anos, diversidade natural, roupa de escritório casual em tons neutros. Rostos podem aparecer de perfil ou desfocados; nada de sorriso forçado para a câmera.
- **Materiais da série:** madeira clara, linho, papel, parede de reboco areia, tecido azul-marinho, vidro fosco. Nada de plástico brilhante, neon ou escritório corporativo frio.

**Gere primeiro `editorial-escuta`.** É a âncora de luz, lente e grão da série:
- no Midjourney, use a URL dela em `--sref` nas outras fotos P&B;
- no Nano Banana / GPT Image, anexe-a como referência de luz ("match the lighting direction, softness and grain of the reference, not its colors").

Gere `hero-frente-a-frente` em seguida: é a âncora de **cor** para `textura-luz` e para os mockups (anexe como referência de grading).

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `editorial-escuta.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial · **gerar primeiro** |
| 2 | `hero-frente-a-frente.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial |
| 3 | `mockup-cartoes.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 4 | `editorial-carreira.webp` | Aplicações | 4:5 · 1600×2000 | Midjourney v7 | essencial |
| 5 | `mockup-cracha.webp` | Aplicações | 4:5 · 1600×2000 | GPT Image | essencial |
| 6 | `mockup-recepcao.webp` | Aplicações (faixa larga) | 2:1 · 2400×1200 | GPT Image (+ Magnific) | essencial |
| 7 | `editorial-equipe.webp` | Aplicações | 3:2 · 2400×1600 | Midjourney v7 | essencial |
| 8 | `mockup-caneca.webp` | Aplicações | 1:1 · 1800×1800 | Nano Banana (Gemini) | opcional |
| 9 | `mockup-caderno.webp` | Aplicações | 3:2 · 2400×1600 | Nano Banana (Gemini) | opcional |
| 10 | `editorial-roda.webp` | Aplicações (faixa larga final) | 2:1 · 2400×1200 | Midjourney v7 | opcional |
| 11 | `textura-luz.webp` | Símbolo (fundo) | 3:2 · 2400×1600 | Flux 1.1 Pro Ultra | opcional |
| 12 | `editorial-janela.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |

Opcionais que faltarem somem do site publicado; no `npm run dev` elas aparecem como placeholder para você ver o lugar.

---

## Essenciais

### 1. `editorial-escuta` — gerar primeiro
- **Seção:** Aplicações (foto grande à esquerda, primeira da colagem, ao lado do recorte "oɔ").
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7. Tem a melhor estética editorial em P&B, e o `--sref` dela amarra a série.
- **Logo para anexar:** nenhum.
- **Ideia:** a escuta. Duas pessoas frente a frente, como o "o" e o "ɔ" do logotipo.
- **Prompt:**
  ```
  Editorial black and white photograph of a psychologist and a young adult client sitting face to face across a small round wooden table in a quiet room, seen from the side at table height, the psychologist leaning slightly forward and listening, an open notebook and a pen resting on the table, a glass of water, hands relaxed, soft directional window light from camera left, deep open shadows, calm and attentive mood, faces partly in profile and softly out of focus, rich tonal range, matte blacks, subtle film grain, shot on 50mm lens at f/2, shallow depth of field, documentary feel --ar 4:5 --style raw --v 7 --s 120
  ```
- **Evitar:** `--no text, logo, letters, watermark, color, couch therapy cliché, tissues box, crying, hands holding, posed smiles, stock photo look, harsh flash`

### 2. `hero-frente-a-frente`
- **Seção:** Intro (fundo da abertura escura, atrás do & que se desenha).
- **Proporção / tamanho:** 16:9 · 2400×1350. Se sair menor, amplie no **Magnific** (modo Precision, *creativity* baixo).
- **Ferramenta:** Midjourney v7, ótimo em atmosfera e luz baixa. Alternativa: Flux 1.1 Pro Ultra.
- **Logo para anexar:** nenhum.
- **Composição:** a imagem fica atrás do logo, então o centro precisa ficar escuro e limpo. As duas poltronas ficam pequenas, uma em cada terço inferior, viradas uma para a outra; a luz quente entra pela direita.
- **Prompt:**
  ```
  Two empty mid-century armchairs facing each other in a dim minimal room, placed small in the lower left and lower right thirds of the frame, deep navy blue walls #05213A and #004E88 in shadow, a soft warm beam of window light from the right painting a gradient from orange #FF6D00 to crimson #BC1F36 on the floor between the chairs, large calm dark negative space in the center and upper half, quiet, intimate, cinematic, low-key, shot on 35mm lens at f/2.8, subtle film grain, premium architectural photography --ar 16:9 --style raw --v 7 --s 150
  ```
- **Evitar:** `--no text, logo, letters, people, lamps, plants, clutter, neon, purple, green, bright daylight, busy background`

### 3. `mockup-cartoes`
- **Seção:** Aplicações (abaixo da foto da escuta, ao lado do app).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Mantém papel e sombras realistas e aceita a `editorial-escuta`/`hero-frente-a-frente` como referência de luz e cor.
- **Logo para anexar:** nenhum (o logo entra por código). Anexe `hero-frente-a-frente` como referência de grading.
- **Composição (bate com o `pin` padrão):** dois cartões de visita horizontais (85×55 mm) lado a lado, vistos de cima com leve perspectiva. O da esquerda é **branco**, girado uns 8° no sentido anti-horário, ocupando ~13–51% da largura e ~31–73% da altura. O da direita é **azul-noite `#05213A`**, girado uns 8° no sentido horário, ocupando ~52–90% da largura e ~27–68% da altura.
- **Prompt:**
  ```
  Top-down product photograph of two blank business cards lying side by side on a warm sand-colored linen surface #F6F2EC, the left card plain matte white rotated slightly counter-clockwise, the right card plain matte deep navy #05213A rotated slightly clockwise, both completely blank with no print, thick 600gsm cotton paper with visible edge, soft natural window light from the left casting gentle long shadows, a pencil and a small orange #FF6D00 sticky note at the edge of the frame, calm minimal composition, shot on 50mm lens at f/4, subtle film grain, editorial stationery photography
  ```
- **Evitar:** `text, logo, letters, print, embossing, foil, rounded corners, glossy plastic, busy props, coffee spills, dark background`

### 4. `editorial-carreira`
- **Seção:** Aplicações (foto vertical, ao lado do crachá).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7, com `--sref` da `editorial-escuta`.
- **Logo para anexar:** nenhum.
- **Ideia:** quem quer trabalhar numa empresa e se prepara para isso.
- **Prompt:**
  ```
  Editorial black and white portrait of a young professional in their late twenties adjusting the lapel of a simple blazer in front of a large window, a moment of quiet preparation before a job interview, seen from a slight three-quarter angle, face partly turned toward the window light, soft directional daylight from camera left, open shadows, rich tonal range, matte blacks, subtle film grain, shot on 85mm lens at f/2, shallow depth of field, honest documentary feel --ar 4:5 --style raw --v 7 --s 120 --sref <URL da editorial-escuta>
  ```
- **Evitar:** `--no text, logo, watermark, color, suit and tie cliché, mirror selfie, office cubicles, posed smile, harsh flash`

### 5. `mockup-cracha`
- **Seção:** Aplicações (entre a foto da carreira e o & gigante).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** GPT Image. Segura bem a composição frontal e deixa o cartão realmente liso.
- **Logo para anexar:** nenhum. Anexe `hero-frente-a-frente` como referência de cor.
- **Composição (bate com o `pin` padrão):** crachá vertical de PVC branco, pendurado de frente, centralizado, ocupando ~30–70% da largura e ~34–86% da altura. A área do logo é a metade de cima do cartão (~33–67% da largura, ~44–68% da altura). O cordão sobe do topo para fora do quadro.
- **Prompt:**
  ```
  Front view product photograph of a blank white vertical event badge card in a clear holder, hanging from a deep navy #05213A woven lanyard that runs up out of the frame, the badge centered and perfectly flat facing the camera, completely blank white with no text or print, against a soft warm sand background #F6F2EC, gentle natural window light from the left, soft shadow behind the badge, minimal, clean, shot on 85mm lens at f/4, subtle film grain, editorial product photography
  ```
- **Evitar:** `text, logo, letters, QR code, photo on the badge, barcode, name, hole punch clutter, lanyard print, glossy reflections, tilt`

### 6. `mockup-recepcao`
- **Seção:** Aplicações (faixa larga no meio da colagem).
- **Proporção / tamanho:** 2:1 · 2400×1200. Gere em 3:2 ou 16:9 se a ferramenta não fizer 2:1 e deixe o script cortar; amplie no **Magnific** se precisar.
- **Ferramenta:** GPT Image, pelo controle de composição e da parede lisa. Alternativa: Nano Banana.
- **Logo para anexar:** nenhum. Anexe `hero-frente-a-frente` como referência de cor.
- **Composição (bate com o `pin` padrão):** parede de reboco areia, de frente, com uma área lisa centralizada (~34–66% da largura, ~26–56% da altura) onde o logo entra. Embaixo, um balcão baixo de madeira clara; à esquerda, uma poltrona azul-marinho; à direita, um vaso de barro com capim-dos-pampas seco.
- **Prompt:**
  ```
  Wide frontal interior photograph of a small calm reception area of a psychology and human development practice, a perfectly blank warm off-white plaster wall #F6F2EC filling the upper center of the frame with a large empty area for signage, a low light oak reception counter below, a deep navy #05213A upholstered armchair on the left with a small orange #FF6D00 cushion, tall dried pampas grass in a clay vase on the right, soft natural daylight from a window at camera left, gentle shadows, warm and welcoming, straight-on architectural composition with vertical lines kept straight, shot on 35mm lens at f/5.6, subtle film grain
  ```
- **Evitar:** `text, logo, letters, signage, frames on the wall, clocks, screens, people, clutter, fluorescent light, cold corporate office`

### 7. `editorial-equipe`
- **Seção:** Aplicações (ao lado do padrão de &).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Midjourney v7, com `--sref` da `editorial-escuta`.
- **Logo para anexar:** nenhum.
- **Ideia:** o desenvolvimento organizacional — a equipe em roda, trabalhando junto.
- **Prompt:**
  ```
  Editorial black and white photograph of a small team of six colleagues sitting in a loose circle in a bright training room, one facilitator standing and gesturing toward a wall covered with paper sheets and sticky notes, people listening and taking notes, candid moment, soft directional daylight from large windows at camera left, open shadows, rich tonal range, matte blacks, subtle film grain, shot on 35mm lens at f/2.8, shallow depth of field, documentary feel --ar 3:2 --style raw --v 7 --s 120 --sref <URL da editorial-escuta>
  ```
- **Evitar:** `--no text, logo, readable writing, watermark, color, laptops everywhere, stock photo high-fives, posed smiles, harsh flash`

---

## Opcionais

### 8. `mockup-caneca`
- **Seção:** Aplicações (penúltima linha, à esquerda).
- **Proporção / tamanho:** 1:1 · 1800×1800.
- **Ferramenta:** Nano Banana (Gemini), com `mockup-cartoes` anexado como referência de luz e cor.
- **Logo para anexar:** nenhum.
- **Composição (bate com o `pin` padrão):** caneca branca de frente, centralizada, alça para a direita; a área lisa onde o & entra fica em ~38–60% da largura e ~38–62% da altura.
- **Prompt:**
  ```
  Front view photograph of a plain matte white ceramic mug centered on a light oak desk, handle pointing right, completely blank with no print, a closed notebook and a pencil beside it, warm sand wall #F6F2EC in the background softly out of focus, soft natural window light from the left, gentle shadow, calm morning mood, shot on 85mm lens at f/2.8, subtle film grain
  ```
- **Evitar:** `text, logo, letters, print, steam, latte art, glossy glaze, busy background`

### 9. `mockup-caderno`
- **Seção:** Aplicações (penúltima linha, à direita).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini).
- **Logo para anexar:** nenhum.
- **Composição (bate com o `pin` padrão):** caderno A5 fechado, capa branca lisa, visto de cima, ocupando ~30–66% da largura e ~18–82% da altura; a área do logo é o terço de cima da capa (~33–63% da largura, ~30–52% da altura). Caneta e post-its laranja ao lado.
- **Prompt:**
  ```
  Top-down photograph of a closed A5 notebook with a plain matte white soft-touch cover lying on a light oak table, completely blank cover with no print, a black pen and a small stack of orange #FF6D00 sticky notes beside it, a printed handout face down, warm sand tones #F6F2EC, soft natural window light from the left casting gentle shadows, minimal workshop kit, shot on 50mm lens at f/4, subtle film grain, editorial still life
  ```
- **Evitar:** `text, logo, letters, print, readable writing, spiral binding, laptop, coffee, clutter`

### 10. `editorial-roda`
- **Seção:** Aplicações (faixa larga que fecha a colagem).
- **Proporção / tamanho:** 2:1 · 2400×1200.
- **Ferramenta:** Midjourney v7, com `--sref` da `editorial-escuta`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of simple wooden chairs arranged in an empty circle in a bright minimal room, waiting for a group dynamics session, seen from a slightly elevated angle, long soft shadows of the chairs on a light wooden floor, daylight from tall windows at camera left, calm and hopeful, rich tonal range, matte blacks, subtle film grain, shot on 35mm lens at f/4 --ar 2:1 --style raw --v 7 --s 120 --sref <URL da editorial-escuta>
  ```
- **Evitar:** `--no text, logo, people, color, clutter, projector screen, harsh flash`

### 11. `textura-luz`
- **Seção:** Símbolo (fundo da seção do &, com 30% de opacidade).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Flux 1.1 Pro Ultra, bom em gradientes de luz limpos e sem artefato. Alternativa: Midjourney v7.
- **Logo para anexar:** nenhum.
- **Composição:** o & fica na metade esquerda; a luz deve ficar na direita e o resto quase escuro.
- **Prompt:**
  ```
  Abstract photograph of soft warm light passing through frosted glass, a smooth diagonal glow from orange #FF6D00 to crimson #BC1F36 on the right side of the frame, fading into deep navy #05213A darkness on the left, gentle bokeh, fine grain, no objects, calm and intimate, shot on 85mm lens at f/1.8
  ```
- **Evitar:** `text, logo, shapes, lines, lens flare, neon, purple, green, sharp objects`

### 12. `editorial-janela`
- **Seção:** Fechamento (fundo escuro atrás da frase final).
- **Proporção / tamanho:** 16:9 · 2400×1350.
- **Ferramenta:** Midjourney v7, com `--sref` da `editorial-escuta`.
- **Logo para anexar:** nenhum.
- **Composição:** silhuetas pequenas no terço direito; o resto escuro para a frase final ficar legível.
- **Prompt:**
  ```
  Editorial black and white photograph of two people in silhouette talking next to a large window in a quiet office, small in the right third of the frame, backlit by soft daylight, the rest of the room in deep shadow with large dark negative space on the left, calm conversation, rich tonal range, matte blacks, subtle film grain, shot on 50mm lens at f/2 --ar 16:9 --style raw --v 7 --s 120 --sref <URL da editorial-escuta>
  ```
- **Evitar:** `--no text, logo, color, city skyline, handshake, posed, harsh flash`

---

## Se só der para gerar 3

1. **`editorial-escuta`** — define o segmento (psicologia, escuta) e a linguagem P&B de toda a colagem; é a primeira foto que aparece.
2. **`hero-frente-a-frente`** — a abertura: as duas poltronas de frente traduzem o "o" e o "ɔ" do logotipo, e a luz laranja-carmim repete o gradiente do &.
3. **`mockup-recepcao`** — a marca em escala de ambiente, numa faixa larga no meio da página; é o mockup que mais "vende" a identidade.
