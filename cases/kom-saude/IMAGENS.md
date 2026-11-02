# Kom Saúde: imagens

Página: `/cases/kom-saude/` · conteúdo: `cases/kom-saude/case.json` · 15 imagens publicadas, todas geradas por IA a partir dos PNGs de `ref/`.

## Publicadas

Os mockups já trazem o logo aplicado na geração, por isso não usam overlay do SVG. Os logos foram conferidos em tamanho real.

| id | arquivo de origem (`F:\Freelancer\Kom Saúde`) | seção | tamanho | recorte |
|---|---|---|---|---|
| `hero-infusao` | `Kombucha_jars_on_wooden_counter` | Abertura (fundo) | 2400×1340 | |
| `textura-scoby` | `Kombucha_scoby_surface_macro_pho…` | Símbolo (fundo) | 2400×1792 | |
| `editorial-fermentacao` | `Fermentation_jars_on_wooden_shelf` | Aplicações | 1792×2400 | |
| `mockup-garrafas` | `Referencias_Flow/Kombucha_bottles_on_kitchen_counter` | Aplicações | 2400×1792 | |
| `editorial-kefir` | `Hands_straining_kefir_grains` | Aplicações | 2400×1792 | |
| `mockup-kefir` | `Referencias_Flow/Kefir_jar_and_fruit_still` | Aplicações | 1936×2048 | 56 px de cada lado |
| `mockup-mesa` | `Referencias_Flow/Breakfast_table_with_kombucha_an…` | Aplicações | 2400×1340 | |
| `editorial-producao` | `Referencias_Flow/Kombucha_maker_pouring_liquid` | Aplicações | 1792×2400 | |
| `mockup-sacola` | `Referencias_Flow/Shopping_bag_with_brand_logo` | Aplicações | 1792×2400 | |
| `mockup-geladeira` | `Referencias_Flow/Beverage_fridge_in_cafe_interior` | Aplicações | 1792×2400 | |
| `mockup-caixa` | `Referencias_Flow/Kombucha_delivery_box_unboxing` | Aplicações | 2400×1792 | |
| `mockup-celular` | `Referencias_Flow/Phone_displaying_brand_logo_layout` | Aplicações | 1536×2345 | 407 px do topo |
| `mockup-papelaria` | `Referencias_Flow/Stationery_set_brand_identity_ph…` | Aplicações | 2400×1792 | |
| `mockup-barraca` | `Referencias_Flow/Market_stall_selling_beverages` | Aplicações | 2400×1340 | |
| `editorial-feira` | `People_walking_in_town_square` | Aplicações | 2400×1200 | faixa 2:1, a partir de 408 px do topo |

Os recortes alinham as linhas da colagem no desktop. As 3 editoriais em P&B saem sempre em tons de cinza.

**Para trocar uma imagem:** salve em `cases/kom-saude/raw/<id>.png` (ou .jpg/.webp), já na proporção da tabela, e rode `npm run brand -- kom-saude images`. A pasta `raw/` não vai para o repositório.

**Feito em código, sem IA:** recortes gigantes do K e da folha com a alça, faixa "Kom Saúde" em movimento, padrão com o símbolo, sistema do logo e blocos de cor.

## Pontos a refazer, se quiser

- `mockup-barraca`: a barraca vizinha, no canto superior direito, tem um letreiro com nome inventado ("Corinhos da Marken"). O quadro de preços tem só rabiscos e os potes de kefir, no fundo da mesa, têm o logo deformado.
- `editorial-producao`: o pote cobre parte de "saúde" e do descritor no avental.

## Ainda não geradas

Nenhuma é necessária: a página está completa sem elas. Para usar, gere com o prompt, inclua o id em `images[]` e em `applications.items` (ou em `closing.image`) no `case.json` e rode o comando acima.

- **`editorial-folhas`** (fechamento, fundo, 16:9 · 2400×1350)
  > Black and white photograph of a young tea plant branch with two leaves and a small new bud, backlit against a bright window, leaf veins visible, the rest of the frame falling into soft dark tones, large calm negative space on the right. 100mm macro lens, f/4, HP5 400 film grain, quiet and minimal.
- **`editorial-servindo`** (aplicações, 3:2 · 2400×1600)
  > Black and white photograph of kombucha being poured from a glass bottle into a short glass with ice, fine bubbles rising and catching the light, hand holding the bottle at the top of the frame, linen napkin and a few tea leaves on a wooden table, backlit by a window. 85mm lens, f/2.8, frozen motion, HP5 400 film grain, high contrast with soft highlights.
- **`mockup-carrinho`** (aplicações, 3:2 · 2400×1600). O carrinho era uma das peças previstas no briefing; a barraca de feira ocupa esse papel na página. Anexe `ref/kom-saude-lockup-light.png`.
  > Photorealistic photograph of a small wooden street vending cart for cold drinks, painted deep green #133A2F, with a large flat cream panel #F5EFE3 on the front carrying the attached logo, parked on a tree-lined sidewalk of a small Brazilian town in golden hour light, a few glass bottles of amber kombucha on top of the cart, soft shadows of leaves on the ground. 35mm lens, f/5.6, natural light, subtle film grain.
