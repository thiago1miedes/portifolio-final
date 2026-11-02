# Urbes: imagens

Página: `/cases/urbes/` · conteúdo: `cases/urbes/case.json` · 9 mockups gerados pelo Thiago (Flow), com o logo já aplicado pela IA.

## O que está na página

| id / arquivo final | peça | proporção · tamanho | arquivo original em `F:\Freelancer\Urbes` |
|---|---|---|---|
| `mockup-recepcao` | Recepção | 16:9 · 2400×1340 | `Modern_data_company_reception_in…` |
| `mockup-sala-reuniao` | Sala de reunião | 16:9 · 2400×1340 | `Logo_displayed_in_modern_meeting…` |
| `mockup-painel` | Painel no monitor e no notebook | 16:9 · 2400×1340 | `Data_analyst_workspace_desk_setup…` |
| `mockup-perfil` | Perfil nas redes | 9:16 · 1200×2150 | `Smartphone_displaying_brand_soci…` |
| `mockup-uniforme` | Uniforme e crachá | 4:3 · 2400×1792 | `Corporate_team_kit_flat_lay…` |
| `mockup-papelaria` | Papelaria | 4:3 · 2400×1792 | `Stationery_set_flat_lay_design…` |
| `mockup-brindes` | Brindes | 1:1 · 2048×2048 | `Corporate_merchandise_set_on_lim…` |
| `mockup-relatorio` | Relatório e tablet | 4:3 · 2400×1792 | `URBES_brand_report_flat_lay…` |
| `mockup-estande` | Estande de evento | 16:9 · 2400×1340 | `Trade_show_booth_display…` |

Como o logo já vem nas imagens, elas entram inteiras (kind `piece`), sem overlay do SVG. Feito em código, sem IA: os cabos e os pontos de luz no símbolo, os recortes gigantes do R e das quadras, a faixa em movimento e o painel no celular.

## Como trocar uma imagem

1. Salve o arquivo em `cases/urbes/raw/<id>.jpg`, com o id exato da tabela. A pasta `raw` fica fora do git.
2. Rode `npm run brand -- urbes images`. O script recorta na proporção, converte para WebP + AVIF (com versão de 800 px para celular) e grava em `public/brand/urbes/img/`.

## Desvios da IA nos logos

O logotipo real tem o U cortado na diagonal e o R, o B e o E abertos na haste. Só `mockup-recepcao`, `mockup-sala-reuniao` e `mockup-brindes` chegam perto disso; nas outras a IA desenhou letras comuns.

Erros no descritor "Gestão de Dados", todos em tamanho pequeno:

- `mockup-painel`: "Gestão de Dedos" no monitor; texto ilegível no notebook, fora de foco.
- `mockup-relatorio`: "Gest5o de Dados" na folha interna.
- `mockup-estande`: "Gestão de Dades" na plaquinha do balcão.

## Fotos que ainda podem entrar

A página não tem foto urbana nem fundo atrás do logo. Se quiser gerar, estas reforçam o conceito de mapa e cabos. Depois de salvar em `raw/`, a imagem precisa ser cadastrada em `images[]` e ligada no `case.json` (`intro.image`, `symbol.image`, `closing.image` ou um item de `applications.items`).

**Coerência:** cidade à noite iluminada por postes de sódio; sombras no asfalto `#151414`, laranja `#C8650F` só como luz; ruas na diagonal do quadro, cerca de 22° da vertical; P&B com contraste alto e grão 400 ISO. Sem placas, logos nem monumentos reconhecíveis.

### `hero-cidade-noite` (fundo da abertura, 16:9 · 2400×1350, Midjourney v7)
> Top-down aerial drone photograph of a dense South American megacity at night, a grid of dark rectangular city blocks cut by streets running diagonally across the frame at about 22 degrees, the streets glowing with warm sodium streetlight orange #C8650F, rooftops and blocks almost black asphalt #151414 with cool neutral grey #706F6F highlights, very few lit windows, light haze, large calm darker area in the center of the frame. 24mm lens, straight down view, long exposure, subtle film grain, minimal, cinematic.
> `--ar 16:9 --style raw --v 7`

**Evitar:** texto, placas, monumentos, rio no centro, céu, neon azul ou roxo, HDR.

### `editorial-cabos` (colagem, P&B, 3:2 · 2400×1600, Midjourney v7)
> Black and white street photograph looking up at a concrete utility pole in São Paulo with dozens of tangled overhead cables, fiber optic coils and junction boxes, the cables crossing the frame diagonally and continuing between old apartment buildings, overcast sky as a bright flat background. 35mm lens, f/5.6, Tri-X 400 grain, high contrast, rich blacks, documentary editorial.
> `--ar 3:2 --style raw --v 7`

**Evitar:** cor, logos de operadora, etiquetas legíveis, céu azul dramático.

### `editorial-cruzamento` (colagem, P&B, 4:5 · 1600×2000, Midjourney v7)
> Black and white top-down aerial photograph of a busy urban intersection, two wide avenues crossing at an angle, zebra crosswalks forming strong white bars, a few cars and pedestrians as small shapes waiting at the light, long afternoon shadows of buildings falling across the asphalt. Drone, 24mm, straight down, Tri-X 400 film grain, deep blacks, high contrast, graphic, editorial magazine photography.
> `--ar 4:5 --style raw --v 7`

**Evitar:** cor, texto pintado no asfalto, placas, logos de carro, rostos.
