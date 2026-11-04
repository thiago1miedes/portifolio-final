# Capas comerciais dos cases de marca

Uma imagem de campanha para cada marca, no lugar do logo sobre fundo liso. Os sites continuam com as capas atuais.

## Formatos do Google Flow

A ajuda do Google confirma que existe a opção "Image aspect ratio", mas não lista os valores. Medi as imagens que você já gerou nas pastas dos cases, e as proporções que mais aparecem são estas:

| Proporção | Tamanho dos seus arquivos | Arquivos encontrados | Uso aqui |
|---|---|---|---|
| 4:3 deitada | 2400×1792 | 56 | **capa principal** |
| 16:9 deitada | 2752×1536 | 49 | abertura de case |
| 3:4 em pé | 1792×2400 | 30 | **capa vertical da home** |
| 1:1 quadrada | 2048×2048 | 15 | post, avatar |
| 9:16 em pé | 1536×2752 | 7 | story, reels |

Também apareceram poucas imagens em 3:2 (2528×1696), 4:5 (1856×2304) e 21:9 (3168×1344). Não dá para garantir que vieram do Flow, então os prompts não dependem delas. O que vale é o menu do seu Flow.

**Por que 4:3:** a grade de `/cases/` mostra as capas em 3:2. A imagem 4:3 perde só 5,5% em cima e 5,5% embaixo nesse corte, então nada importante sai. Com 16:9 o corte seria nas laterais e bem maior.

**Modelo:** Nano Banana Pro, que o Google descreve como o mais preciso em detalhes. Confira o seletor antes de gerar: dependendo do plano, o Flow pode abrir em outro modelo.

**Limites por dia (ajuda do Google):** Nano Banana Pro 20 sem plano, 100 no AI Plus e Pro, 500 no Ultra. O upscale 2K vai até 200 por dia em todos os planos. O 4K é só no Ultra. Gerar imagem não gasta créditos do Flow.

## Como gerar cada capa

1. No Flow, troque para **Imagem**, escolha **Nano Banana Pro**, proporção **4:3** e mais de um resultado por prompt.
2. Arraste para a caixa do prompt o arquivo indicado em **Anexar**. O Google recomenda referência em fundo liso, por isso os PNGs abaixo têm fundo chapado.
3. Cole o prompt.
4. Confira o logo em tamanho real. Se só o logo saiu errado, arraste a imagem boa e o logo juntos para a caixa do prompt e peça:
   ```
   Replace the logo in the first image with the exact logo from the second image. Same position, size, perspective and lighting. Change nothing else.
   ```
5. Faça o upscale 2K e baixe.
6. Salve em `capas/<nome>.png`. A vertical, se fizer, em `capas/<nome>-v.png`.
7. Rode:
   ```bash
   npm run capas
   ```

O script recorta, converte para WebP e o site passa a usar a capa nova na home e em `/cases/`, sem mexer em código.

## O que amarra a série

- **Um objeto herói**, grande, com o logo grande. Logo pequeno é onde a IA mais erra.
- **Cenário tomado pela cor da marca**: parede e chão na mesma cor, que é o que faz as capas se reconhecerem como série lado a lado.
- **Luz dura de janela**, vinda da esquerda, com sombra desenhada. Cara de campanha, não de banco de imagem.
- **Sem texto inventado.** Nada de slogan, telefone ou segunda marca.
- **Respiro em cima e embaixo** para sobreviver ao corte 3:2.

---

## Faggian

**Anexar:** `cases/faggian/ref/faggian-lockup-light.png`
**Salvar como:** `capas/faggian.png`

```
Fashion campaign still life. A hand-sewn terracotta linen shirt on a natural wood hanger, hung against a terracotta plaster wall #B05136, the floor in the same color. A large cream cotton swing tag hangs from the hanger on a linen cord, facing the camera, big enough to take up a third of the frame height, with the attached logo printed on it. Hard late-afternoon window light from the left casting a soft window-shaped shadow on the wall. Natural linen texture, visible hand stitches, warm tones. Shot on 85mm, premium fashion advertising.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. Keep the tag and the shirt inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, closer to the tag.`

## Kom Saúde

**Anexar:** `cases/kom-saude/ref/kom-saude-lockup-light.png`
**Salvar como:** `capas/kom-saude.png`

```
Beverage advertising photograph. A tall amber glass swing-top bottle of artisanal kombucha, cold with fine condensation, standing on wet dark green stone, with the deep green set #133A2F filling the wall and floor. A large cream paper label on the bottle carries the attached logo, big and facing the camera. Backlight makes the amber liquid glow from inside. A few slices of fresh ginger and mint leaves on the stone. Hard window light from the left. Shot on 100mm, crisp, premium drink commercial.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. Keep the bottle inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the whole bottle in frame.`

## Confraria dos Aromas

**Anexar:** `cases/confraria/ref/confraria-lockup-light.png`
**Salvar como:** `capas/confraria.png`

```
Luxury home fragrance campaign. A heavy amber glass candle jar, lit, and a matching glass reed diffuser on a pale stone block, with a deep forest green set #074D40 filling the wall and floor. The candle's large cream paper label carries the attached logo, big and facing the camera. A thin ribbon of smoke rises from the wick. Dried lavender and a sprig of eucalyptus lie on the stone. Hard window light from the left with a long soft shadow. Shot on 85mm, elegant, quiet, premium.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. Keep the products inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the candle in front, the diffuser behind it.`

## Instituto Dor & Saúde

**Anexar:** `cases/dor-e-saude/ref/dor-e-saude-lockup-dark.png`
**Salvar como:** `capas/dor-e-saude.png`

```
Premium healthcare brand photograph. A navy blue hardcover presentation folder standing upright at a slight angle, with the attached logo large on its cover in warm white and brushed gold foil. Beside it, a realistic ivory anatomical spine model on a small stand. The navy set #172E4D fills the wall and floor. Hard window light from the left, soft window-shaped shadow on the wall, thin gold reflections on the foil. Clean, calm and trustworthy. Shot on 85mm, medical advertising.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people. Keep the folder inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the folder in front, the spine model behind it.`

## Débora Sandrin

**Anexar:** `cases/debora-sandrin/ref/debora-sandrin-lockup-dark.png`
**Salvar como:** `capas/debora-sandrin.png`

```
Architecture studio campaign photograph. A wine-red lime plaster wall #79193E with the attached logo mounted on it as raised cream dimensional letters, large and centered, casting small crisp shadows under raking sunlight. In the foreground, on a travertine block, a small white architectural scale model of a modern house, slightly out of focus. Hard sunlight from the left drawing a diagonal band of light across the wall. Shot on 50mm, refined, contemporary, editorial architecture.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people. Keep the logo inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the logo in the upper half, the scale model in the lower half.`

## EFPI

**Anexar:** `cases/efpi/ref/efpi-lockup-dark.png`
**Salvar como:** `capas/efpi.png`

```
Education brand campaign photograph. A stack of three navy blue hardcover books at a slight angle, the top one facing the camera with the attached logo large on its cover in white. An amber fabric ribbon marks a page and a sharpened amber pencil rests on the stack. The navy set #1D3557 fills the wall and floor. A warm beam of amber late-afternoon sunlight #EC9D20 crosses the set from the left, with a long shadow. Shot on 85mm, optimistic, solid, premium.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people. Keep the books inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, one book standing upright showing its cover, two more stacked at its base.`

## Equipamentaria

**Anexar:** `cases/equipamentaria/ref/equipamentaria-lockup-dark.png`
**Salvar como:** `capas/equipamentaria.png`

```
Industrial brand campaign photograph. A rugged navy blue steel rolling tool chest with worn edges, the attached logo large on its front panel. An orange hard hat sits on top of it and a shovel leans against its side. Raw concrete floor with construction dust in the air, and a wall painted in safety orange #F69D11 behind it. Hard midday sunlight from the left with a strong diagonal shadow. Shot on 50mm, tough, honest, high contrast, construction equipment advertising.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people. Keep the tool chest inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, a taller tool chest with the hard hat on top.`

## Visual Vidros

**Anexar:** `cases/visual-vidros/ref/visual-vidros-lockup-dark.png`
**Salvar como:** `capas/visual-vidros.png`

```
Architectural glass campaign photograph. A thick clear tempered glass panel with polished green-tinted edges standing upright on a dark navy floor, in a navy set #0C1A2C. The attached logo is printed large at the center of the glass. A hard beam of light from the left passes through the glass and throws sharp blue and orange refractions across the floor and wall. Clean reflections, perfect edges, no fingerprints. Shot on 85mm, precise and premium, high-end product advertising.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people. Keep the panel inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, a tall narrow glass panel.`

## Urbes

**Anexar:** `cases/urbes/ref/urbes-lockup-dark.png`
**Salvar como:** `capas/urbes.png`

```
Urban brand campaign photograph at dusk in São Paulo. A dark matte concrete wall on a city street with the attached logo mounted as a large backlit sign, its orange and white shapes glowing softly and spilling light onto the concrete. Long-exposure orange and white traffic light trails pass along the street in the foreground. Blurred tall buildings with lit windows in the deep blue dusk behind. Wet asphalt with reflections. Shot on 35mm, cinematic, technological, premium.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions, signs or watermarks anywhere. No people. Keep the sign inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the sign in the upper half, the light trails in the lower half.`

## EasyWork

**Anexar:** `cases/easywork/ref/easywork-lockup-dark.png`
**Salvar como:** `capas/easywork.png`

```
Technology company brand photograph. The attached logo as a large glowing green LED sign mounted on a dark navy acoustic wall #022135 in a modern developer office at night. Below it, out of focus, a clean desk with two monitors showing lines of code, their light in soft bokeh. The green glow #48C972 spills across the wall and the desk edge. Shot on 35mm, contemporary, focused, premium tech advertising.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people. The code on the monitors must be blurred and unreadable. Keep the sign inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the sign in the upper half, the desk in the lower half.`

## Grasiê Kids & Teen

**Anexar:** `cases/grasie/ref/grasie-lockup-light.png`
**Salvar como:** `capas/grasie.png`

```
Playful children's fashion store campaign photograph. A large off-white paper shopping bag with rope handles standing on a pastel lilac floor, in a pastel lilac set #E7E0EF. The attached logo is big on the front of the bag. A small sage green knit cardigan peeks out of the top of the bag. Two soft balloons, one butter yellow and one lilac #8971A0, float beside it. Soft window light from the left with a gentle shadow. Shot on 50mm, cheerful, tender, clean, premium kids retail.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No children or people. Keep the bag inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the balloons floating above the bag.`

## LifeStyle

**Anexar:** `cases/lifestyle/ref/lifestyle-lockup-dark.png`
**Salvar como:** `capas/lifestyle.png`

```
Corporate psychology consultancy campaign photograph. A deep wine red wall #5D140F with the attached logo painted large on it in white. In front of the wall, a single sculptural orange armchair #EC6C1D on a wine red floor, with a small round side table and a white cup. Warm hard window light from the left with a long soft shadow of the armchair. Shot on 50mm, welcoming, human, contemporary interior advertising.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people. Keep the logo and the armchair inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the logo in the upper half, the armchair in the lower half.`

## Rock Ensina

**Anexar:** `cases/rock-ensina/ref/rock-ensina-lockup-dark.png` e `capas/ref/rock-ensina-grafismo.png`
**Salvar como:** `capas/rock-ensina.png`

```
Bold business school campaign photograph. A set built from giant painted wooden geometric blocks in blue #3185FC, red #FF513D, yellow #FCBA04 and off-white, with shapes and pattern taken from the second attached image. At the center, a dark navy hardcover book #1E233C stands upright, facing the camera, with the logo from the first attached image large on its cover. Hard sunlight from the left with crisp shadows between the blocks. Shot on 50mm, energetic, graphic, premium.
Use the first attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people. Keep the book inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, blocks stacked above and below the book.`

## VOC&S

**Anexar:** `cases/vocs/ref/vocs-lockup-light.png`
**Salvar como:** `capas/vocs.png`

```
Brand campaign photograph for a psychology practice. A huge glossy three-dimensional ampersand sculpture with the exact shape of the "&" in the attached logo, in a warm gradient from red #BC1F36 to orange #FF6D00, standing on a warm off-white floor #F6F2EC. On the off-white wall behind it, the attached logo is painted large in its original colors. Hard window light from the left with a long soft shadow of the sculpture. Shot on 50mm, warm, human, memorable, contemporary advertising.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people. Keep the logo and the sculpture inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the logo in the upper part, the sculpture in the lower part.`

## Óticas Talarico

**Anexar:** `capas/ref/oticas-talarico-lockup-dark.png`
**Salvar como:** `capas/oticas-talarico.png`

```
Eyewear retail campaign photograph. An elegant pair of tortoiseshell glasses resting on top of a closed deep blue hard glasses case, with the attached logo large on the case in white. A folded soft blue lens cloth beside it. The saturated blue set #1565D8 fills the wall and floor. Hard window light from the left passes through the lenses and draws bright lens-shaped reflections on the surface. Clean reflections on the lenses. Shot on 100mm, sharp, premium, optical retail advertising.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people, no brand names on the glasses. Keep the products inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the case standing upright, the glasses resting at its base.`

## LF Serviços Elétricos

**Anexar:** `capas/ref/lf-servicos-eletricos-lockup-dark.png`
**Salvar como:** `capas/lf-servicos-eletricos.png`

```
Electrical services brand campaign photograph. A closed navy blue steel electrical distribution cabinet #103E5A with the attached logo large on its door, mounted on a wall painted in warm amber #FF9D01. A coil of orange electrical cable and a pair of insulated pliers on the raw concrete floor below it. Hard sunlight from the left with a strong diagonal shadow of a solar panel frame across the wall. Shot on 50mm, solid, safe, high contrast, premium trade advertising.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, warning signs, logos, captions or watermarks anywhere. No people. Keep the cabinet inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, a tall narrow cabinet.`

## Valor Med

Este case é principalmente a landing page. Faça só se quiser que ele apareça como marca.

**Anexar:** `capas/ref/valor-med-lockup-dark.png`
**Salvar como:** `capas/valor-med.png`

```
Premium medical education campaign photograph. A deep black-green leather diploma folder standing slightly open, with the attached logo large on its cover in gold foil. A stethoscope rests in a loose curve on the dark stone surface in front of it. The set is a very dark green #0E1512 filling the wall and floor. Hard window light from the left catches the gold foil and the metal of the stethoscope. Shot on 85mm, prestigious, sober, luxurious.
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No people. Keep the folder inside the central area, with clear space at the top and bottom.
```

**Vertical 3:4:** mesmo prompt, trocando o começo por `Vertical framing, the folder upright, the stethoscope at its base.`
