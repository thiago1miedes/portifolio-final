// Cases de marca: cada pasta cases/<slug>/ com um case.json vira uma página narrativa em /cases/<slug>/.
// Os arquivos (logo, fontes, imagens) ficam em public/<assets>/ — veja cases/<slug>/IMAGENS.md.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** wordmark-accent: parte do logotipo em outra cor (ex.: "Easy" verde + "Work" azul); sem ela, segue o wordmark.
 *  symbol-3 / symbol-4: terceira e quarta cor de um símbolo multicolorido (ex.: as barras da Rock Ensina); sem elas, seguem o symbol-accent. */
export type LogoPart = "symbol-main" | "symbol-accent" | "symbol-3" | "symbol-4" | "wordmark" | "wordmark-accent" | "tagline";
/** horizontal: segunda composição do logo (ex.: símbolo ao lado do nome), opcional como o tagline
 *  untagged: o lockup sem descritor (símbolo + logotipo), quando a versão principal da marca não leva o descritor */
export type LogoArt = "lockup" | "symbol" | "outline" | "wordmark" | "tagline" | "horizontal" | "untagged";
type OptionalPart = "wordmark-accent" | "symbol-3" | "symbol-4";
export type Variant = Record<Exclude<LogoPart, OptionalPart>, string> & Partial<Record<OptionalPart, string>> & { label: string; bg: string };
type Pin = [number, number][];

export interface BrandImage { id: string; section: string; w: number; h: number; alt: string; essential?: boolean; mono?: boolean }
export interface Overlay { art: LogoArt; variant: string; blend?: string; inset?: number; pin: Pin }
export interface AppItem {
  /** cutout: PNG recortado (fundo transparente), mostrado inteiro e sem moldura
   *  piece: peça real (post, capa, key visual) inteira, sem corte; com frame "phone", dentro de um celular
   *  feed: celular com um perfil de rede social montado em código, com as imagens de `images` na grade
   *  graphic: arquivo vetorial do grafismo (src em public/<assets>/), sem passar pela IA
   *  track: faixa de recortes (slides) que corre de lado com a rolagem no desktop e desliza com o dedo no celular
   *  mosaic: grade de formas geométricas no módulo do símbolo, desenhada em código; as formas giram com a rolagem */
  kind: "photo" | "crop" | "mockup" | "app" | "marquee" | "pattern" | "cutout" | "piece" | "feed" | "graphic" | "heading" | "track" | "mosaic";
  /** heading: título (caption) e texto de um grupo de peças dentro da colagem */
  text?: string;
  image?: string; col: [number, number]; mobile: 1 | 2; offset?: number; speed?: number; caption?: string;
  art?: LogoArt; viewBox?: string; variant?: string; overlays?: Overlay[];
  /** app: partes do logo no topo da tela (padrão: símbolo + logotipo) */
  head?: LogoArt[];
  screen?: { alt?: string; greeting: string; cards: { label: string; title: string; meta: string }[]; progress: { label: string; value: number } };
  frame?: "phone";
  /** feed: ids de images[] na grade (3 por linha) e o cabeçalho do perfil; destaques usam arquivos do grafismo */
  images?: string[];
  profile?: { name: string; bio: string; alt: string; action: string; highlights?: { label: string; src: string }[] };
  /** graphic: caminho em public/<assets>/ e tamanho natural */
  src?: string; w?: number; h?: number; alt?: string;
  /** cutout: inclina de leve seguindo o mouse (só com mouse e com movimento permitido) */
  tilt?: boolean;
  /** track: recortes da faixa (ids de images[]) e a dica que aparece no celular */
  slides?: { image: string; caption?: string }[];
  hint?: string;
  /** mosaic: colunas × linhas da grade */
  grid?: [number, number];
}
/** Seção opcional de grafismo: pictogramas em grade e padrões numa faixa que corre com a rolagem. */
export interface GraphicsSection {
  nav: string; eyebrow: string; title: string; text: string;
  items: { src: string; label: string; alt: string }[];
  patterns?: { src: string; w: number; h: number; alt: string }[];
  patternsNote?: string;
}
export interface SystemTile {
  kind: "lockup" | "symbol" | "sizes" | "clearspace" | "icon" | "minimum"; variant: string; size: "lg" | "tall" | "wide" | "sm"; label: string; note?: string; sizes?: number[];
  /** lockup: outra parte do logo no lugar do logo completo (ex.: "wordmark" para a versão sem descritor) */
  art?: LogoArt;
  /** clearspace: medida "x" em unidades do logo (padrão: altura do logotipo) */
  unit?: number;
  /** minimum: largura do logo completo na redução mínima, em px (padrão: 160) */
  minWidth?: number;
}
interface FontFiles { family: string; fallback: string; unicodeRange?: string; files: Record<string, string>; preload?: number[] }

/** Seção opcional de processo, logo depois da abertura: os caminhos apresentados ao cliente (imagens reais
 *  da apresentação, em images[]) e a síntese que virou a marca. kept: o que aquele caminho deixou na versão final. */
export interface ProcessSection {
  nav: string; eyebrow: string; title: string; text: string;
  /** dica do deslize no celular, onde os caminhos ficam numa faixa lateral */
  hint: string;
  routes: { image: string; label: string; title: string; text: string; colors: string[]; kept?: string }[];
  result: { label: string; title: string; text: string; art?: LogoArt; variant?: string };
}

/** Prints de página inteira do site, navegáveis numa janela de navegador (gerados por `npm run brand -- <slug> site`). */
export interface SitePage {
  id: string; label: string; url: string; alt: string;
  /** print original, relativo a cases/<slug>/ */
  source: string;
  /** faixas verticais [y0, y1] (px do print) removidas — ex.: um bloco que saiu em branco na captura */
  cut?: [number, number][];
}
export interface SiteSection {
  nav: string; eyebrow: string; title: string; text: string; hint: string; hintMobile: string;
  /** recorte horizontal dos prints [x, largura] em px do original: tira as margens vazias das capturas largas */
  crop: [number, number];
  pages: SitePage[];
  /** áreas clicáveis no cabeçalho dos prints (px do original) que levam a outra página */
  links?: { to: string; box: [number, number, number, number] }[];
  /** imagens de images[] (recortes de aparelhos) mostradas abaixo da janela */
  devices?: { image: string; caption?: string; speed?: number }[];
}

export interface BrandCaseData {
  slug: string; client: string; segment: string; year: string; assets: string;
  seo: { title: string; description: string; image: string };
  theme: { dark: string; light: string; primary: string; secondary: string; support: string; accent: string; inkOnLight: string; mutedOnLight: string; inkOnDark: string; mutedOnDark: string };
  /** fonte da marca (títulos); `text` é a fonte opcional de textos e interface;
   *  display: peso e espaçamento dos títulos, quando a marca pede outro tom (padrão: 600 e o espaçamento de cada título) */
  font: FontFiles & { preload: number[]; text?: FontFiles; display?: { weight?: number; tracking?: string } };
  /** tagline, horizontal e untagged são opcionais: logos sem descritor ou sem segunda composição não precisam do arquivo */
  logo: Record<Exclude<LogoArt, "tagline" | "horizontal" | "untagged">, string> & { tagline?: string; horizontal?: string; untagged?: string } & {
    variants: Record<string, Variant>;
    /** partes do logo na navegação (padrão: desktop símbolo + logotipo, celular só o símbolo);
     *  dark/light: variante usada sobre seções escuras/claras (padrão: cores do tema) */
    nav?: { desktop?: LogoArt[]; mobile?: LogoArt[]; wordmarkHeight?: number; dark?: string; light?: string };
  };
  /** variant: versão do logo na abertura (padrão: negative) */
  intro: { kicker: string; subtitle: string; scrollHint: string; image?: string; variant?: string };
  /** crop: quadrado [x, y, lado, lado] em unidades do símbolo; ao rolar, ele recorta o símbolo e mostra o módulo do grafismo
   *  grid: linhas da grade de construção (posições x e y em unidades do símbolo), desenhadas ao rolar
   *  variant: versão do símbolo na seção (padrão: onPrimary)
   *  carve: símbolo feito de vazio (ex.: uma letra escavada noutra). solid é o volume ainda inteiro e void o traço do vazio,
   *  ambos SVG em public/<assets>/ no mesmo viewBox do símbolo; ao rolar, o vazio se desenha e o volume se abre */
  symbol: {
    nav: string; eyebrow: string; title: string; text: string[]; pieces: { piece: string; label: string; text: string; shift: number; y: number }[];
    image?: string; crop?: [number, number, number, number]; grid?: { x: number[]; y: number[] }; variant?: string;
    carve?: { solid: string; void: string };
  };
  /** font "text": a letra gigante e a amostra usam a fonte de textos (ex.: a fonte do logotipo não é a dos títulos) */
  typography: { nav: string; eyebrow: string; title: string; glyphs: string[]; weights: number[]; text: string; spec: { k: string; v: string }[]; sample: string; font?: "text" };
  manifesto: { nav: string; eyebrow: string; headline: string; attributes: { word: string; text: string }[] };
  /** swatches[].cmyk: valor oficial da marca, quando existe (senão é calculado e aproximado) */
  colors: { nav: string; eyebrow: string; title: string; text: string; note: string; swatches: { name: string; role: string; hex: string; weight: number; cmyk?: string }[] };
  system: { nav: string; eyebrow: string; title: string; tiles: SystemTile[] };
  /** marqueeArts: partes do logo na faixa em movimento (padrão: logotipo + símbolo) */
  applications: { nav: string; eyebrow: string; title: string; text: string; marquee: string; marqueeArts?: LogoArt[]; items: AppItem[] };
  /** opcional: o site do cliente, com as páginas navegáveis */
  site?: SiteSection;
  /** opcional: pictogramas e padrões, logo depois do símbolo */
  graphics?: GraphicsSection;
  /** opcional: os caminhos apresentados e a síntese, logo depois da abertura */
  process?: ProcessSection;
  closing: { phrase: string; credits: { k: string; v: string }[]; cta: { text: string; label: string; href: string }; image?: string };
  images: BrandImage[];
}

const modules = import.meta.glob<{ default: BrandCaseData }>("/cases/*/case.json", { eager: true });
export const brandCases: Record<string, BrandCaseData> = Object.fromEntries(
  Object.values(modules).map((m) => [m.default.slug, m.default]),
);

/* ------------------------------------------------------------------ arquivos */
// A raiz do projeto é achada subindo pastas: funciona no dev (src/) e no build (dist/.prerender/).
export const ROOT = (() => {
  let dir = path.dirname(fileURLToPath(import.meta.url));
  while (!fs.existsSync(path.join(dir, "astro.config.mjs"))) {
    const up = path.dirname(dir);
    if (up === dir) return process.cwd();
    dir = up;
  }
  return dir;
})();
const publicPath = (c: BrandCaseData, rel: string) => path.join(ROOT, "public", c.assets.replace(/^\//, ""), rel);
export const assetUrl = (c: BrandCaseData, rel: string) => `${c.assets}/${rel}`;

/* ------------------------------------------------------------------ rascunhos */
const DRAFT = /^\s*\[rascunho\]\s*/i;
export const parseDraft = (text = "") => ({ draft: DRAFT.test(text), value: text.replace(DRAFT, "") });
export const plain = (text = "") => parseDraft(text).value;

const warned = new Set<string>();
export function warnDrafts(c: BrandCaseData) {
  if (warned.has(c.slug)) return;
  warned.add(c.slug);
  const n = (JSON.stringify(c).match(/\[rascunho\]/gi) ?? []).length;
  if (n) console.warn(`[brand-case] ${c.slug}: ${n} textos marcados como [rascunho] em cases/${c.slug}/case.json`);
}

/* ------------------------------------------------------------------ imagens */
export interface ImageInfo extends BrandImage {
  exists: boolean;
  webp?: string; avif?: string;
  webpSet?: string; avifSet?: string;
}
export function imageInfo(c: BrandCaseData, id: string): ImageInfo {
  const meta = c.images.find((i) => i.id === id);
  if (!meta) throw new Error(`[brand-case] ${c.slug}: imagem "${id}" não está em images[] do case.json`);
  const has = (file: string) => fs.existsSync(publicPath(c, `img/${file}`));
  const url = (file: string) => assetUrl(c, `img/${file}`);
  const info: ImageInfo = { ...meta, exists: false };
  for (const ext of ["webp", "avif"] as const) {
    if (!has(`${id}.${ext}`)) continue;
    info.exists = true;
    info[ext] = url(`${id}.${ext}`);
    const small = `${id}-w800.${ext}`;
    info[`${ext}Set`] = has(small) ? `${url(small)} 800w, ${url(`${id}.${ext}`)} ${meta.w}w` : undefined;
  }
  return info;
}

/** Sem o arquivo, essenciais mostram placeholder; opcionais só aparecem no dev (somem do site publicado). */
export const imageVisible = (info: ImageInfo) => info.exists || !!info.essential || import.meta.env.DEV;

/* ------------------------------------------------------------------ logo (SVG inline) */
interface SvgFile { viewBox: [number, number, number, number]; inner: string; label: string; defs: string }
const svgCache = new Map<string, SvgFile>();
const DEFS = /<defs>([\s\S]*?)<\/defs>/g;
const decode = (s: string) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
export function readSvg(c: BrandCaseData, art: LogoArt): SvgFile {
  const rel = c.logo[art];
  if (!rel) throw new Error(`[brand-case] ${c.slug}: logo.${art} não está no case.json`);
  return readSvgFile(c, rel);
}
/** Qualquer SVG de public/<assets>/ (ex.: as camadas de symbol.carve), lido como os arquivos do logo. */
export function readSvgFile(c: BrandCaseData, rel: string): SvgFile {
  const file = publicPath(c, rel);
  const key = `${file}:${fs.statSync(file).mtimeMs}`;
  if (!svgCache.has(key)) {
    const raw = fs.readFileSync(file, "utf8");
    const viewBox = /viewBox="([^"]+)"/.exec(raw)![1].trim().split(/[\s,]+/).map(Number) as SvgFile["viewBox"];
    // <defs> (ex.: o gradiente de uma parte) saem de cada cópia e são desenhadas uma vez na página (logoDefs)
    const body = raw.slice(raw.indexOf(">", raw.indexOf("<svg")) + 1, raw.lastIndexOf("</svg>"));
    const defs = [...body.matchAll(DEFS)].map((m) => m[1].trim()).join("\n");
    const inner = body.replace(DEFS, "").trim();
    const label = decode(/aria-label="([^"]*)"/.exec(raw)?.[1] ?? c.client);
    svgCache.set(key, { viewBox, inner, label, defs });
  }
  return svgCache.get(key)!;
}

/** <defs> de todos os arquivos do logo, sem repetir id. Ficam num SVG de tamanho zero no topo da página:
 *  uma variante pode usar "url(#id)" como cor, e a referência não quebra quando a cópia do logo está com display:none. */
export function logoDefs(c: BrandCaseData) {
  const byId = new Map<string, string>();
  for (const art of ["lockup", "symbol", "outline", "wordmark", "tagline", "horizontal", "untagged"] as const) {
    if (!c.logo[art]) continue;
    for (const m of readSvg(c, art).defs.matchAll(/<(\w+)\b[^>]*\bid="([^"]+)"[\s\S]*?<\/\1>/g)) {
      if (!byId.has(m[2])) byId.set(m[2], m[0]);
    }
  }
  return [...byId.values()].join("\n");
}

/** Variáveis CSS que recolorem as partes do logo (ver [data-part] em brand.css). */
export function variantVars(c: BrandCaseData, name?: string) {
  const v = name ? c.logo.variants[name] : undefined;
  if (!v) return {};
  return {
    "--logo-bg": v.bg,
    "--logo-symbol-main": v["symbol-main"],
    "--logo-symbol-accent": v["symbol-accent"],
    "--logo-symbol-3": v["symbol-3"] ?? v["symbol-accent"],
    "--logo-symbol-4": v["symbol-4"] ?? v["symbol-accent"],
    "--logo-wordmark": v.wordmark,
    // sempre definida: senão herdaria a cor da variante de fora
    "--logo-wordmark-accent": v["wordmark-accent"] ?? v.wordmark,
    "--logo-tagline": v.tagline,
  };
}

/* ------------------------------------------------------------------ site (prints navegáveis) */
export interface SitePageInfo extends SitePage {
  exists: boolean; w: number; h: number;
  src?: string; srcset?: string; mini?: string;
  links: { to: number; label: string; left: string; top: string; width: string; height: string }[];
}
/** Lê public/<assets>/site/manifest.json (escrito pelo script); sem ele, as páginas viram placeholder. */
export function siteInfo(c: BrandCaseData): SitePageInfo[] {
  const s = c.site;
  if (!s) return [];
  const file = publicPath(c, "site/manifest.json");
  const manifest: Record<string, { w: number; h: number; full: string; small?: string; mini: string }> =
    fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
  const [cx, cw] = s.crop;
  return s.pages.map((p) => {
    const m = manifest[p.id];
    const w = m?.w ?? cw, h = m?.h ?? Math.round(cw * 1.6);
    const firstCut = Math.min(...(p.cut ?? []).map(([y0]) => y0), Infinity);
    const pct = (n: number, of: number) => `${+((n / of) * 100).toFixed(3)}%`;
    const links = (s.links ?? [])
      // só links acima do primeiro corte: abaixo dele as posições do print original mudam
      .filter((l) => l.box[1] + l.box[3] <= firstCut && s.pages.some((q) => q.id === l.to))
      .map((l) => {
        const to = s.pages.findIndex((q) => q.id === l.to);
        const [x, y, bw, bh] = l.box;
        const k = w / cw; // o arquivo pode ter sido reduzido em relação ao recorte
        return { to, label: s.pages[to].label, left: pct(x - cx, cw), top: pct(y * k, h), width: pct(bw, cw), height: pct(bh * k, h) };
      });
    return {
      ...p, exists: !!m, w, h, links,
      src: m && assetUrl(c, `site/${m.full}`),
      srcset: m?.small ? `${assetUrl(c, `site/${m.small}`)} ${Math.round(w / 2)}w, ${assetUrl(c, `site/${m.full}`)} ${w}w` : undefined,
      mini: m && assetUrl(c, `site/${m.mini}`),
    };
  });
}

/** Copia das formas do logo pintada com um gradiente — usada no brilho que atravessa a abertura. */
export function shineCopy(inner: string, gradientId: string) {
  return inner
    .replace(/data-part="/g, 'data-shine-part="')
    .replace(/data-piece="/g, 'data-shine-piece="')
    .replace(/data-layer="/g, 'data-shine-layer="')
    .replace(/fill="#[0-9a-f]{3,8}"/gi, `fill="url(#${gradientId})"`);
}

/* ------------------------------------------------------------------ cores */
const rgbOf = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
const lum = (hex: string) => {
  const [r, g, b] = rgbOf(hex).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const contrast = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
export const wcag = (ratio: number) => (ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA grande" : "Baixo");

/** CMYK aproximado com geração de preto parcial (60%) — só referência, conferir no perfil da gráfica. */
export function cmyk(hex: string) {
  const [c0, m0, y0] = rgbOf(hex).map((v) => 1 - v / 255);
  const k = Math.min(c0, m0, y0) * 0.6;
  const f = (v: number) => Math.round((k >= 1 ? 0 : (v - k) / (1 - k)) * 100);
  return [f(c0), f(m0), f(y0), Math.round(k * 100)];
}

export function swatchInfo(c: BrandCaseData, hex: string) {
  const t = c.theme;
  const inks = [t.inkOnDark, t.dark, t.inkOnLight];
  const ink = inks.reduce((best, cur) => (contrast(cur, hex) > contrast(best, hex) ? cur : best));
  const ratio = contrast(ink, hex);
  return {
    rgb: rgbOf(hex).join(" "),
    cmyk: cmyk(hex).join(" "),
    ink,
    ratio,
    grade: wcag(ratio),
    // abaixo de AA o texto miúdo vai num cartão claro sobre a cor
    card: ratio < 4.5,
  };
}

/* ------------------------------------------------------------------ fontes */
const families = (c: BrandCaseData) => [c.font, c.font.text].filter((f): f is FontFiles => !!f);

/** Uma regra por arquivo; a chave é o peso ("400") ou a faixa de uma fonte variável ("300 900"). */
export function fontFaceCss(c: BrandCaseData) {
  return families(c)
    .flatMap((f) => Object.entries(f.files).map(([weight, file]) =>
      `@font-face{font-family:"${f.family}";font-style:normal;font-weight:${weight};font-display:swap;` +
      `src:url("${assetUrl(c, file)}") format("woff2");${f.unicodeRange ? `unicode-range:${f.unicodeRange};` : ""}}`,
    ))
    .join("\n");
}

/** Arquivos a pré-carregar: os pesos de `preload` (numa fonte variável, o arquivo da faixa que os contém). */
export function fontPreloads(c: BrandCaseData) {
  const urls = families(c).flatMap((f) => (f.preload ?? []).map((w) => {
    const key = Object.keys(f.files).find((k) => {
      const [lo, hi = lo] = k.split(/\s+/).map(Number);
      return w >= lo && w <= hi;
    });
    return key ? assetUrl(c, f.files[key]) : undefined;
  }));
  return [...new Set(urls.filter((u): u is string => !!u))];
}

/* ------------------------------------------------------------------ mockups */
/** Caixa que envolve os 4 cantos — posição de reserva quando o JS (matrix3d) não roda. */
export function pinBox(pin: Pin) {
  const xs = pin.map((p) => p[0]), ys = pin.map((p) => p[1]);
  const [x0, y0] = [Math.min(...xs), Math.min(...ys)];
  return { left: `${x0}%`, top: `${y0}%`, width: `${Math.max(...xs) - x0}%`, height: `${Math.max(...ys) - y0}%` };
}
