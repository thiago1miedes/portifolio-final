# Rock Ensina — plano de imagens

Página: `/cases/rock-ensina/` · conteúdo: `cases/rock-ensina/case.json` · 5 essenciais + 5 opcionais geradas por IA. As 22 peças reais (posts, stories, reels, capas e key visual) já estão no lugar.

## Como entregar cada imagem

1. Gere a imagem e salve em `cases/rock-ensina/raw/<id>.png` (ou .jpg/.webp), com o **id exato** da tabela.
2. Rode `npm run brand -- rock-ensina images`. O script recorta na proporção certa, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/rock-ensina/img/`. As fotos editoriais saem em P&B mesmo se a IA devolver um pouco de cor.
3. Recarregue a página. A imagem aparece no lugar do placeholder, sem mexer em código.
   Se preferir, salve direto um `.webp` em `public/brand/rock-ensina/img/<id>.webp`.

**Mockups:** o logo nunca vem da IA. Gere as superfícies **em branco** (capa lisa, caneca lisa, crachá liso, ecobag lisa). O SVG real é aplicado pela página (`mix-blend-mode` + `matrix3d`). Depois de gerar, abra `/cases/rock-ensina/?pin`, arraste os 4 cantos sobre a superfície e cole o array que aparece no campo `pin` do mockup em `case.json`. As composições abaixo já batem com o `pin` padrão; o ajuste costuma ser fino.

**Feito em código, sem IA:** o recorte do símbolo que vira módulo, os 8 pictogramas e os 5 padrões (vetores originais da proposta, em `public/brand/rock-ensina/graphics/`), o perfil no Instagram, as molduras de celular dos stories e reels, o recorte gigante das barras, o sistema do logo e os blocos de cor. Nada disso deve ir para a IA: ela deformaria as formas.

**Peças reais, já no lugar:** vieram de `F:\Freelancer\Rockensina\Projeto case` e estão em `cases/rock-ensina/raw/` com os ids de `images[]` (`kv-carreira`, `post-*`, `reels-*`, `story-negocios`, `youtube-*`). Para trocar uma, substitua o arquivo com o mesmo nome e rode o comando do passo 2.

## Coerência visual (vale para todas)

- **Luz:** natural e clara, de janela grande ou palco, vinda da esquerda da câmera. Sombras abertas, contraste médio-alto. Sem flash estourado.
- **Lente:** 35 mm nos planos abertos (sala, palco), 50 mm nas pessoas, 85 mm nos detalhes. Profundidade de campo curta, grão de filme leve.
- **Cor (imagens coloridas):** sombras puxando para o azul-noite `#1E233C`, neutros frios no gelo `#E8ECF2`. As cores da marca — azul `#3185FC`, vermelho `#FF513D`, verde `#29BF12`, amarelo `#FCBA04` — só em pontos de luz ou detalhes pequenos, nunca no objeto inteiro.
- **P&B:** preto e branco neutro (nem quente nem frio), pretos firmes, boa gama tonal, grão leve. Clima de fotojornalismo de evento e sala de aula: gente real, de 20 a 60 anos, juntos (é o princípio "encontro de gerações").
- **Cenário da série:** escola de negócios contemporânea em São Paulo — salas com vidro, concreto aparente, madeira clara, cadeiras de design, notebooks, cadernos, post-its. Nada de lousa verde, capelo, beca ou banco de imagem sorridente demais.

**Gere primeiro `editorial-aula`.** É a âncora de luz, lente e grão das fotos P&B:
- no Midjourney, use a URL dela em `--sref` nas outras fotos P&B;
- no Nano Banana / GPT Image, anexe-a como referência de luz ("match the lighting direction, contrast and grain of the reference").

Gere `hero-palco` em seguida: é a âncora de **cor** para os mockups (anexe como referência de grading).

## Resumo

| # | id / arquivo final | seção | proporção · tamanho | ferramenta | prioridade |
|---|---|---|---|---|---|
| 1 | `editorial-aula.webp` | Redes sociais (colagem) | 4:5 · 1600×2000 | Midjourney v7 | essencial · **gerar primeiro** |
| 2 | `hero-palco.webp` | Intro (fundo) | 16:9 · 2400×1350 | Midjourney v7 (+ Magnific) | essencial |
| 3 | `editorial-mentoria.webp` | Redes sociais (colagem) | 3:2 · 2000×1333 | Midjourney v7 | essencial |
| 4 | `mockup-caderno.webp` | Redes sociais (colagem) | 3:2 · 2400×1600 | Nano Banana (Gemini) | essencial |
| 5 | `mockup-caneca.webp` | Redes sociais (colagem) | 4:5 · 1600×2000 | Nano Banana (Gemini) | essencial |
| 6 | `editorial-palestra.webp` | Redes sociais (faixa larga final) | 2:1 · 2400×1200 | Midjourney v7 | opcional |
| 7 | `editorial-plateia.webp` | Fechamento (fundo) | 16:9 · 2400×1350 | Midjourney v7 | opcional |
| 8 | `editorial-notebook.webp` | Redes sociais (colagem) | 4:5 · 1600×2000 | Midjourney v7 | opcional |
| 9 | `mockup-cracha.webp` | Redes sociais (colagem) | 4:5 · 1600×2000 | GPT Image | opcional |
| 10 | `mockup-ecobag.webp` | Redes sociais (colagem) | 4:5 · 1600×2000 | Nano Banana (Gemini) | opcional |
| — | `kv-carreira`, `post-*`, `reels-*`, `story-negocios`, `youtube-*` | Redes sociais | originais | peças da proposta | já no lugar |

Opcionais que faltarem somem do site publicado; no `npm run dev` elas aparecem como placeholder para você ver o lugar.

---

## Essenciais

### 1. `editorial-aula` — gerar primeiro
- **Seção:** Redes sociais (foto vertical logo abaixo do key visual, ao lado do story).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7. Melhor estética editorial em P&B, e o `--sref` dela amarra a série.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph inside a contemporary business school classroom in São Paulo, a facilitator in her forties standing next to a glass wall covered in sticky notes and hand-drawn diagrams, talking with a mixed-age group of adult students around a light wood table with laptops and notebooks, one young student laughing, one older student taking notes, natural window light from camera left, medium-high contrast, open shadows, neutral black and white tones, firm blacks, subtle film grain, shot on 35mm at f/2.8, candid documentary moment, authentic, not posed --ar 4:5 --style raw --v 7 --s 120
  ```
- **Evitar:** `--no text, logo, letters on the wall, watermark, color, chalkboard, graduation cap, stock photo smiles, everyone looking at camera, harsh flash`

### 2. `hero-palco`
- **Seção:** Intro (fundo da abertura escura, atrás do logo que se desenha).
- **Proporção / tamanho:** 16:9 · 2400×1350. Se sair menor, amplie no **Magnific** (modo Precision, *creativity* baixo, para não inventar gente na plateia).
- **Ferramenta:** Midjourney v7, bom em atmosfera e bokeh. Alternativa: Flux 1.1 Pro Ultra.
- **Logo para anexar:** nenhum. O logo real entra por código por cima; anexar o símbolo faz a IA desenhar barras coloridas falsas no palco.
- **Composição:** a imagem fica atrás do logo, então o centro precisa ficar escuro e limpo. Vista do fundo do palco para a plateia, com as luzes coloridas desfocadas nas bordas.
- **Prompt:**
  ```
  View from the back of a dark stage looking out over a modern auditorium audience in São Paulo, the audience softly out of focus as silhouettes, out-of-focus stage lights glowing at the edges of the frame in blue #3185FC, red #FF513D, green #29BF12 and warm yellow #FCBA04, the whole scene graded deep midnight navy #1E233C, light haze in the air catching the beams, large calm dark negative space in the center of the frame, cinematic, low-key, shot on 35mm at f/1.8, heavy bokeh, subtle film grain, premium event atmosphere --ar 16:9 --style raw --v 7 --s 150
  ```
- **Evitar:** `--no text, logo, letters, screen with words, concert crowd with raised hands, guitar, drum kit, microphone stand in focus, lasers, neon signs, purple, magenta`
  (O rock é "referência discreta": nada de show, guitarra ou bateria.)

### 3. `editorial-mentoria`
- **Seção:** Redes sociais (foto horizontal no meio da colagem, ao lado dos posts 4:5).
- **Proporção / tamanho:** 3:2 · 2000×1333.
- **Ferramenta:** Midjourney v7, com `--sref` da `editorial-aula`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white photograph of a mentoring session, a man in his late fifties and a woman in her twenties sitting side by side at a light wood table in a glass-walled meeting room, both looking at a laptop screen, she points at something, he smiles, an open notebook and a coffee cup on the table, natural window light from camera left, medium-high contrast, neutral tones, firm blacks, subtle film grain, shot on 50mm at f/2.8, shallow depth of field, candid documentary feel --ar 3:2 --style raw --v 7 --s 120 --sref <URL da editorial-aula>
  ```
- **Evitar:** `--no text, logo, readable screen, watermark, color, handshake cliché, suits and ties, stock photo pose`

### 4. `mockup-caderno`
- **Seção:** Redes sociais (estudo de aplicação, primeiro dos mockups).
- **Proporção / tamanho:** 3:2 · 2400×1600.
- **Ferramenta:** Nano Banana (Gemini 2.5 Flash Image). Segue bem a composição e entrega superfícies lisas sem inventar texto.
- **Logo para anexar:** nenhum. Anexe a `hero-palco` só como referência de cor.
- **Composição (bate com o `pin` padrão):** vista de cima, caderno fechado no centro, capa branca lisa ocupando mais ou menos de 30% a 70% da largura e de 25% a 75% da altura. O logo entra no centro da capa (faixa entre 44% e 52% da altura).
- **Prompt:**
  ```
  Top-down flat lay product photo of a closed A5 notebook with a completely blank matte white cover, centered in the frame, on a deep midnight navy desk surface #1E233C, a pen in brand blue #3185FC and a few small square sticky notes in yellow #FCBA04 and red #FF513D placed near the edges, a laptop corner entering from the top right, soft natural daylight from the left, gentle shadow under the notebook, shot on 50mm, realistic paper texture, clean editorial composition, no text anywhere
  ```
- **Evitar:** text, logo, letters, printed pattern on the cover, spiral binding covering the center, glossy plastic, clutter, fingers

### 5. `mockup-caneca`
- **Seção:** Redes sociais (estudo de aplicação, ao lado do caderno).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini).
- **Logo para anexar:** nenhum.
- **Composição (bate com o `pin` padrão):** caneca branca de frente, um pouco à esquerda do centro, corpo ocupando de ~25% a ~67% da largura e de ~38% a ~75% da altura, alça para a direita. O logo entra deitado na altura de 50%–57%.
- **Prompt:**
  ```
  Product photo of a plain matte white ceramic mug seen straight from the front at eye level, slightly left of center, handle on the right, completely blank surface, on a light wood desk next to an open laptop and a notebook, background a softly blurred modern office with a glass wall, cool natural daylight from the left, subtle navy #1E233C tones in the shadows, a tiny blue #3185FC accent from a pen on the desk, shot on 85mm at f/2.8, shallow depth of field, realistic, no text anywhere
  ```
- **Evitar:** text, logo, printed decoration on the mug, steam, coffee splash, mug tilted or seen from above, warm orange cast

---

## Opcionais

### 6. `editorial-palestra`
- **Seção:** Redes sociais (faixa larga que fecha a colagem).
- **Proporção / tamanho:** 2:1 · 2400×1200.
- **Ferramenta:** Midjourney v7, com `--sref` da `editorial-aula`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Wide editorial black and white photograph of a speaker on a small stage seen from behind and slightly to the side, holding a microphone, gesturing to an attentive audience of all ages in a modern auditorium, stage light from above left, haze, medium-high contrast, neutral tones, firm blacks, subtle film grain, shot on 35mm at f/2.8, documentary event coverage --ar 2:1 --style raw --v 7 --s 120 --sref <URL da editorial-aula>
  ```
- **Evitar:** `--no text, logo, projected slides with words, color, concert, guitar, crowd with phones up`

### 7. `editorial-plateia`
- **Seção:** Fechamento (fundo apagado atrás da frase final).
- **Proporção / tamanho:** 16:9 · 2400×1350.
- **Ferramenta:** Midjourney v7, com `--sref` da `editorial-aula`.
- **Logo para anexar:** nenhum.
- **Composição:** a foto aparece a ~22% de opacidade, com o texto por cima à esquerda; deixe o lado esquerdo mais escuro e calmo.
- **Prompt:**
  ```
  Editorial black and white photograph of an event audience applauding, people of different generations in the seats, hands in motion slightly blurred, shot from the side aisle, the left side of the frame falling into darkness, stage light from the right, medium-high contrast, neutral tones, subtle film grain, shot on 50mm at f/2 --ar 16:9 --style raw --v 7 --s 120 --sref <URL da editorial-aula>
  ```
- **Evitar:** `--no text, logo, color, confetti, stadium, phones raised, faces in sharp close-up`

### 8. `editorial-notebook`
- **Seção:** Redes sociais (foto vertical no fim da colagem, antes dos mockups).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Midjourney v7, com `--sref` da `editorial-aula`.
- **Logo para anexar:** nenhum.
- **Prompt:**
  ```
  Editorial black and white close-up of hands writing a plan in a paper notebook next to an open laptop on a light wood table, a few sticky notes, a coffee cup at the edge, natural window light from camera left, medium-high contrast, neutral tones, subtle film grain, shot on 85mm at f/2.8, shallow depth of field, quiet focused mood --ar 4:5 --style raw --v 7 --s 120 --sref <URL da editorial-aula>
  ```
- **Evitar:** `--no text, readable handwriting, logo, color, watermark, smartwatch close-up`

### 9. `mockup-cracha`
- **Seção:** Redes sociais (estudo de aplicação, ao lado da caneca).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** GPT Image. Lida bem com objetos pendurados e cordão sem deformar o cartão.
- **Logo para anexar:** nenhum.
- **Composição (bate com o `pin` padrão):** crachá vertical pendurado no centro, cartão branco liso ocupando de ~33% a ~67% da largura e de ~40% a ~80% da altura. O logo entra deitado no terço de cima do cartão (50%–56% da altura).
- **Prompt:**
  ```
  Close product photo of a vertical event badge hanging from a midnight navy lanyard #1E233C, the badge a completely blank matte white card centered in the frame, worn on a person's chest wearing a light grey knit sweater, the person's face out of frame, soft natural daylight from the left, background a softly blurred modern venue, shot on 85mm at f/2.8, realistic, no text anywhere
  ```
- **Evitar:** text, logo, name, photo on the badge, barcode, QR code, colorful lanyard, plastic glare covering the center

### 10. `mockup-ecobag`
- **Seção:** Redes sociais (estudo de aplicação, junto com a foto `editorial-notebook`).
- **Proporção / tamanho:** 4:5 · 1600×2000.
- **Ferramenta:** Nano Banana (Gemini).
- **Logo para anexar:** nenhum. O logo entra em versão monocromática (grafite) com `multiply`, como estampa de uma cor.
- **Composição (bate com o `pin` padrão):** ecobag de frente, no ombro de uma pessoa cortada no peito, bolsa ocupando de ~22% a ~78% da largura e de ~35% a ~90% da altura. O logo entra no meio da bolsa (50%–58% da altura).
- **Prompt:**
  ```
  Lifestyle product photo of a plain natural cotton canvas tote bag with a completely blank front, hanging from the shoulder of a person standing on a São Paulo sidewalk, the person cropped at the chest, wearing a navy jacket #1E233C, the bag facing the camera flat and centered, soft overcast daylight, background softly blurred city street with a hint of yellow #FCBA04 from a passing taxi, shot on 50mm at f/2.8, realistic fabric texture, no text anywhere
  ```
- **Evitar:** text, logo, print, folds crossing the center of the bag, bag seen from the side, bright saturated colors

---

## Se só der para gerar três

1. **`hero-palco`** — é a primeira coisa que aparece. Com ela, a abertura deixa de ser um fundo liso e ganha o clima de palco e plateia que as capas de YouTube já sugerem.
2. **`editorial-aula`** — fica colada no key visual e no story. É o contraponto em P&B que faz as peças coloridas parecerem parte de uma escola de verdade, e é a âncora de luz das outras fotos.
3. **`mockup-caderno`** — é o único estudo de aplicação fora da tela; mostra a marca em papel sem depender de nenhum outro mockup.
