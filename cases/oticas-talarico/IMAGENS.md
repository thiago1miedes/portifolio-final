# Óticas Talarico: plano de imagens

Página: `/cases/oticas-talarico/` · conteúdo: `cases/oticas-talarico/case.json`

A página já está publicada e completa sem nenhuma destas imagens. Elas estão marcadas como opcionais em `case.json`, então nada aparece como placeholder no site: cada linha da colagem surge quando o arquivo existe. No `npm run dev` os espaços aparecem com o id, para você ver onde cada uma entra.

## Como entregar

1. No Google Flow, use o Nano Banana Pro, anexe as referências indicadas e gere na proporção da tabela.
2. Salve em `cases/oticas-talarico/raw/<id>.png`, com o **id exato**.
3. Rode `npm run brand -- oticas-talarico images`. O script recorta, gera WebP + AVIF e põe as editoriais em P&B.

Se preferir, solte tudo em `F:\Freelancer\Oticas Talarico\Referencias_Flow`, com qualquer nome, e me avise: eu mapeio, confiro os logos e publico.

**Os prompts pedem o logo já aplicado na geração**, como nos últimos cases. Confira o logo em tamanho real em cada resultado: os pontos que a IA mais erra aqui são o acento do Ó (é um triângulo fino, solto do anel), o T sem serifa e a abertura do monóculo no alto do símbolo. Se um logo sair deformado, gere a mesma cena com a superfície lisa e eu aplico o SVG real por cima.

## Já vem do projeto, sem IA

| Na página | Origem |
|---|---|
| `hero-olhar` (abertura) | Foto e gradiente da página 2 do manual |
| `manual-embrulho` | Mockup da página 12 do manual |
| `manual-cartoes` | Mockup da página 13 do manual |
| Sacolas, cartão e padrão | PDFs de impressão, em vetor (`public/brand/oticas-talarico/graphics/`) |
| Letras gigantes e alfabeto da Adam | Curvas do logotipo e da página 8 do manual |
| Recortes do monóculo e do Ó, faixa em movimento, sistema do logo e blocos de cor | Código, a partir dos SVGs |

## Referências para anexar

Tudo em `cases/oticas-talarico/ref/`.

- **Logo:** `oticas-talarico-lockup-light.png` (para fundo claro), `-lockup-dark.png` (azul claro e branco sobre azul escuro), `-lockup-white.png` (todo branco), `-lockup-accent.png` (sobre azul claro), `-vertical-light.png`.
- **Símbolo:** `-symbol-light.png` (azul claro), `-symbol-dark.png` (sobre azul escuro), `-symbol-white.png` (branco sobre azul escuro).
- **Peças reais:** `real-sacola-azul-claro.png`, `real-sacola-azul-escuro.png`, `real-sacola-branco.png`, `real-sacola-marrom.png`, `real-cartao-frente.png`, `real-cartao-verso.png`.
- **Padrão:** `real-padrao-azul.png`, `real-padrao-marinho.png`, `real-padrao-branco-azul.png`, `real-padrao-branco-marrom.png`.

## Linguagem das imagens

Vale para todas e já está nos prompts.

- **Sensação:** ótica de família, leve e sofisticada. Fundos claros, muito respiro, nada de cena escura de luxo.
- **Materiais:** gesso branco quente, carvalho claro no piso e **nogueira** nas partes nobres, com veio reto e acabamento fosco.
- **Cor:** azul escuro `#03045E` e azul claro `#38B6FF` como únicos acentos. Areia `#D9D0C7` e marrom `#795F54` de apoio. Sem dourado.
- **Luz:** janela lateral, suave, fim de manhã. Sombras longas e macias.
- **Lente:** 50 mm f/4 no geral, 28 mm tilt-shift na arquitetura, 100 mm macro nos detalhes.
- **P&B:** high-key, grão fino de HP5, fundo claro.

**Gere primeiro `mockup-interior`.** Ela fixa luz e madeira: anexe o resultado nas outras coloridas com `Match the lighting, wood tone and color grading of the attached interior photo`. Nas P&B, gere `editorial-monoculo` primeiro e use como referência das outras duas.

## Resumo

| id | seção | proporção no Flow | tamanho final | prioridade |
|---|---|---|---|---|
| `mockup-interior` | Aplicações | 16:9 | 2400×1350 | essencial, gerar primeiro |
| `mockup-sacolas` | Aplicações | 4:3 (recorta para 3:2) | 2400×1600 | essencial |
| `mockup-estojo` | Aplicações | 4:3 (recorta para 3:2) | 2400×1600 | essencial |
| `mockup-caixa` | Aplicações | 3:4 | 1800×2400 | essencial |
| `mockup-brindes` | Aplicações | 4:3 (recorta para 3:2) | 2400×1600 | essencial |
| `mockup-flanela` | Aplicações | 3:4 | 1800×2400 | essencial |
| `mockup-embrulho` | Aplicações | 4:3 (recorta para 3:2) | 2400×1600 | essencial |
| `mockup-fachada` | Aplicações | 16:9 | 2400×1350 | essencial |
| `editorial-monoculo` | Aplicações | 3:4 | 1800×2400 | essencial |
| `mockup-papelaria` | Aplicações | 4:3 (recorta para 3:2) | 2400×1600 | opcional |
| `mockup-balcao` | Aplicações | 16:9 | 2400×1350 | opcional |
| `editorial-ajuste` | Aplicações | 3:4 | 1800×2400 | opcional |
| `editorial-prova` | Aplicações | 3:4 | 1800×2400 | opcional |
| `textura-lente` | Símbolo, fundo a 30% | 4:3 | 2400×1792 | opcional |
| `fechamento-madeira` | Fechamento, fundo a 22% | 16:9 | 2400×1350 | opcional |

**Se puder gerar só três:** `mockup-interior`, `mockup-caixa` e `mockup-sacolas`. São as que mostram a madeira, a sofisticação e a marca em uso.

As recortadas para 3:2 perdem cerca de 5% em cima e 5% embaixo: mantenha o assunto no centro.

**Frase final de todos os prompts com logo:**

```
Use the attached image as the exact logo: same shapes, letters, proportions and colors. Do not redraw it. No other text, logos, captions or watermarks anywhere. No brand names on the glasses.
```

## Essenciais

### `mockup-interior`

**Anexar:** `oticas-talarico-lockup-light.png`
**Evitar:** gente, letreiro inventado, dourado, ambiente escuro, parede de vidro, marcas em óculos.

```
Photorealistic interior photograph of a small family-owned optical boutique, bright and airy. Warm white plaster walls and a pale oak floor. Floor-to-ceiling shelving in walnut wood with straight grain and a matte oil finish, displaying eyeglasses with generous spacing on slim ledges, thin warm light lines hidden in the shelves. The rear wall between the shelves is calm white plaster and carries the attached logo as slim matte lettering in its original navy #03045E and sky blue #38B6FF. In the center, a low walnut fitting table with a round mirror and two stools upholstered in deep navy #03045E. Soft daylight from a large window on the left, long gentle shadows. 28mm tilt-shift lens, f/5.6, straight verticals, architectural magazine photography, quiet, sophisticated, welcoming. No people.
```

### `mockup-sacolas`

**Anexar:** `real-sacola-azul-claro.png`, `real-sacola-azul-escuro.png`, `real-sacola-branco.png`, `real-sacola-marrom.png`, `real-padrao-branco-azul.png`
**Evitar:** redesenhar a arte, sacola kraft, alça colorida demais, fundo escuro.

```
Photorealistic still life of four rigid premium paper shopping bags standing in a row, slightly overlapping, on a pale oak floor against a warm white plaster wall with a strip of vertical walnut slats on the right. Use each attached bag artwork exactly as the front face of one bag, in this order: sky blue #38B6FF, deep navy #03045E, white, warm brown #A4744F. The side gussets carry the attached thin-line geometric pattern. Thick matte paper, crisp folds, twisted cotton rope handles in navy. Soft window light from the left, gentle shadows on the floor. 50mm lens, f/4, clean and elegant retail photography. Keep the bags inside the central area.
```

### `mockup-estojo`

**Anexar:** `oticas-talarico-symbol-dark.png`, `real-padrao-azul.png`
**Evitar:** couro brilhante, costura grosseira, óculos com logo, fundo preto.

```
Photorealistic product photograph of a designed hard-shell eyeglass case, open, on a walnut tabletop with straight grain. The outside is soft-touch deep navy #03045E with the attached symbol debossed on the lid in sky blue #38B6FF. The inside is lined with sky blue #38B6FF microsuede carrying the attached thin-line geometric pattern tone on tone. Resting inside, a pair of elegant round glasses in clear and tortoise acetate. Beside it, a second identical case closed, showing the symbol. A warm white plaster wall behind, out of focus. Soft window light from the left, delicate reflections on the lenses. 85mm lens, f/4, premium eyewear advertising, calm and refined.
```

### `mockup-caixa`

**Anexar:** `oticas-talarico-lockup-light.png`
**Evitar:** dourado, madeira avermelhada, logo em relevo cheio, veludo preto.

```
Photorealistic product photograph of a premium eyewear gift box made of solid walnut wood with a sliding lid, straight grain and matte oil finish. The attached logo is laser engraved on the lid in one single darker wood tone, thin and precise, keeping the exact shapes. The box stands half open, showing a deep navy velvet interior #03045E holding a pair of thin round metal glasses in brushed silver. Next to it, a small blank card in warm sand paper #D9D0C7. Warm white plaster background and pale oak surface. Soft side window light, long gentle shadows. 85mm lens, f/4, vertical framing, quiet luxury, family workshop care.
```

### `mockup-brindes`

**Anexar:** `oticas-talarico-lockup-light.png`, `oticas-talarico-symbol-dark.png`
**Evitar:** tralha demais, cores fora da paleta, frascos de farmácia, texto em rótulo.

```
Photorealistic top-down flat lay of a designed set of optical store gifts on a pale oak board: a small frosted white lens cleaning spray bottle with a sky blue #38B6FF cap and the attached logo on the label; a woven eyeglass cord in deep navy #03045E with small walnut beads; a walnut keychain with the attached symbol engraved; a precision screwdriver with a navy handle; a round slim tin in sky blue with the symbol in white. Objects aligned on a calm grid with generous space between them. Soft window light from the top left, soft long shadows. 50mm lens, f/5.6, clean, elegant, editorial product photography.
```

### `mockup-flanela`

**Anexar:** `real-padrao-azul.png`, `oticas-talarico-symbol-white.png`
**Evitar:** tecido felpudo, estampa grande, logo centralizado enorme.

```
Photorealistic close-up of a folded premium microfiber lens cloth in sky blue #38B6FF, with the attached thin-line geometric pattern printed tone on tone and the attached symbol small in white at one corner. A pair of round glasses rests on top, one temple open, with clean reflections on the lenses. Walnut wood surface with straight grain, warm white background out of focus. Soft side window light, delicate fabric texture. 100mm macro lens, f/4, vertical framing, refined, tactile, calm.
```

### `mockup-embrulho`

**Anexar:** `real-padrao-marinho.png`, `real-padrao-branco-azul.png`, `oticas-talarico-symbol-dark.png`
**Evitar:** laço de presente grande, papel brilhante, Natal, dourado.

```
Photorealistic still life of a small box gift-wrapped in matte paper with the attached navy #03045E geometric line pattern, crisp hidden folds, closed with a thin natural cotton ribbon and a round navy sticker carrying the attached symbol. Beside it, a smaller package wrapped in white paper with the attached sky blue line pattern. On a walnut table with straight grain, warm white plaster wall behind. Soft window light from the left, gentle shadows. 50mm lens, f/4, careful and elegant, like a jewel being handed over.
```

### `mockup-fachada`

**Anexar:** `oticas-talarico-lockup-light.png`
**Evitar:** rua movimentada, carros, gente, placas vizinhas com nome, fios demais.

```
Photorealistic street photograph of a small optical store facade in a calm tree-lined Brazilian city, soft morning light. The shopfront combines vertical walnut slats and warm white plaster around a large clean glass window, with walnut shelves and glasses visible inside. Above the window, on the white plaster band, the attached logo as slim channel letters in its original navy #03045E and sky blue #38B6FF. A small bench in walnut and a planter on the sidewalk. Neighboring buildings neutral and out of focus. 28mm tilt-shift lens, f/8, straight verticals, architectural photography, welcoming and refined. No people, no cars.
```

### `editorial-monoculo`

**Anexar:** nada. Gere antes das outras P&B.
**Evitar:** fantasia de época exagerada, pose caricata, cartola, vapor, tom sépia.

```
Black and white portrait of an elegant elderly gentleman wearing a round monocle over his right eye, in a dark three-piece suit, looking slightly away with a calm hint of a smile. Plain light gray studio wall, high-key lighting, soft window light from the left. 85mm lens, f/2.8, fine HP5 film grain, dignified, warm and timeless, not a costume. No text.
```

## Opcionais

### `mockup-papelaria`

**Anexar:** `real-cartao-frente.png`, `real-cartao-verso.png`, `real-padrao-branco-azul.png`, `oticas-talarico-lockup-light.png`
**Evitar:** texto inventado nos papéis (linhas neutras no lugar).

```
Photorealistic top-down stationery set on pale oak: business cards with the attached front and back artwork used exactly, a letterhead with the attached logo at the top and blank neutral lines, an envelope with the attached line pattern on the inner flap, and a warranty certificate for eyeglasses in warm sand paper #D9D0C7 with the logo and blank lines. A small walnut block as a paperweight. Soft window light, gentle long shadows. 50mm lens, f/5.6, clean grid composition, elegant and calm.
```

### `mockup-balcao`

**Anexar:** `real-sacola-azul-escuro.png`, `oticas-talarico-symbol-dark.png`
**Evitar:** caixa registradora, computador, gente.

```
Photorealistic interior detail of a walnut service counter in a bright optical boutique. On the counter: a round mirror on a slim stand, a navy #03045E leather tray with three pairs of glasses, and a standing shopping bag using the attached artwork exactly on its front. Warm white plaster wall behind with soft vertical shadows from a window. 35mm lens, f/4, warm, sophisticated, unhurried. No people.
```

### `editorial-ajuste`

**Anexar:** `editorial-monoculo` como referência de tom.
**Evitar:** mãos deformadas, ferramenta grande, óculos com marca.

```
Black and white close-up of an optician's hands adjusting the hinge of a pair of glasses with a tiny precision screwdriver, on a wooden workbench with straight grain. Bright window light from the left, high-key, shallow depth of field. 100mm macro lens, f/2.8, fine HP5 film grain, careful and quiet craft. No text.
```

### `editorial-prova`

**Anexar:** `editorial-monoculo` como referência de tom.
**Evitar:** pose de propaganda, sorriso exagerado, reflexos impossíveis no espelho.

```
Black and white photograph of a woman in her forties trying on a pair of round glasses, looking at herself in a small round mirror with a soft smile, in a bright optical store with wooden shelves out of focus behind her. Window light from the left, high-key. 50mm lens, f/2, fine HP5 film grain, natural moment, warm, familiar. No text.
```

### `textura-lente`

**Anexar:** nada. Entra apagada atrás do símbolo.
**Evitar:** óculos inteiros, objetos, arco-íris.

```
Extreme macro of the anti-reflective coating on an eyeglass lens, soft curved reflections in sky blue #38B6FF fading into deep navy #03045E, almost abstract, large calm empty areas, very smooth gradients, no objects and no text. 100mm macro lens, f/2.8, clean and quiet.
```

### `fechamento-madeira`

**Anexar:** nada. Entra apagada atrás do fechamento.
**Evitar:** nós grandes na madeira, verniz brilhante, objetos.

```
Close-up of dark walnut wood with straight vertical grain and a matte oil finish, warm light raking from the left, calm and even, no knots, no objects, no text. 50mm lens, f/5.6, material study, sophisticated and warm.
```

## O que ficou de fora

As pastas `Fotos` e `Imagens` mostram as lentes, blocos e polidores da linha **Talarico Optical**, com outro logo (um olho num círculo). Estavam na página antiga, mas não entram neste case para não misturar duas marcas no manual da Óticas Talarico.
