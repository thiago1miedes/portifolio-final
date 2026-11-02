# Urbes: imagens

Página: `/cases/urbes/` · conteúdo: `cases/urbes/case.json` · 12 imagens geradas pelo Thiago no Flow: 3 fotos sem logo e 9 mockups com o logo já aplicado pela IA.

## O que está na página

| id / arquivo final | peça | proporção · tamanho | arquivo original em `F:\Freelancer\Urbes` |
|---|---|---|---|
| `hero-cidade-noite` | Fundo da abertura | 16:9 · 2400×1340 | `Aerial_view_of_city_at…` |
| `editorial-cruzamento` | Foto P&B na colagem | 3:4 · 1600×2143 | `Aerial_view_of_urban_intersection…` |
| `editorial-cabos` | Foto P&B na colagem | 16:9 · 2400×1340 | `Cables_crossing_utility_pole…` |
| `mockup-recepcao` | Recepção | 16:9 · 2400×1340 | `Modern_data_company_reception_in…` |
| `mockup-sala-reuniao` | Sala de reunião | 16:9 · 2400×1340 | `Logo_displayed_in_modern_meeting…` |
| `mockup-painel` | Painel no monitor e no notebook | 16:9 · 2400×1340 | `Data_analyst_workspace_desk_setup…` |
| `mockup-perfil` | Perfil nas redes | 9:16 · 1200×2150 | `Smartphone_displaying_brand_soci…` |
| `mockup-uniforme` | Uniforme e crachá | 4:3 · 2400×1792 | `Corporate_team_kit_flat_lay…` |
| `mockup-papelaria` | Papelaria | 4:3 · 2400×1792 | `Stationery_set_flat_lay_design…` |
| `mockup-brindes` | Brindes | 1:1 · 2048×2048 | `Corporate_merchandise_set_on_lim…` |
| `mockup-relatorio` | Relatório e tablet | 4:3 · 2400×1792 | `URBES_brand_report_flat_lay…` |
| `mockup-estande` | Estande de evento | 16:9 · 2400×1340 | `Trade_show_booth_display…` |

Como o logo já vem nos mockups, eles entram inteiros (kind `piece`), sem overlay do SVG. As duas fotos P&B usam o kind `photo`, com parallax. Feito em código, sem IA: os cabos e os pontos de luz no símbolo, os recortes gigantes do R, do U e das quadras, a faixa em movimento e o painel no celular.

## Como trocar uma imagem

1. Salve o arquivo em `cases/urbes/raw/<id>.jpg`, com o id exato da tabela. A pasta `raw` fica fora do git.
2. Rode `npm run brand -- urbes images`. O script recorta na proporção, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/urbes/img/`.

## Desvios da IA nos logos

O logotipo real tem o U cortado na diagonal e o R, o B e o E abertos na haste. Só `mockup-recepcao`, `mockup-sala-reuniao` e `mockup-brindes` chegam perto disso; nas outras a IA desenhou letras comuns.

Erros no descritor "Gestão de Dados", todos em tamanho pequeno:

- `mockup-painel`: "Gestão de Dedos" no monitor; texto ilegível no notebook, fora de foco.
- `mockup-relatorio`: "Gest5o de Dados" na folha interna.
- `mockup-estande`: "Gestão de Dades" na plaquinha do balcão.

## Outros detalhes

- `hero-cidade-noite`: a área escura do centro saiu com contorno parecido com um coração. Atrás do logo quase não se nota no desktop; no celular o topo do contorno aparece mais.
- `editorial-cabos`: o cartaz colado no poste tem texto inventado pela IA, em tamanho pequeno.
