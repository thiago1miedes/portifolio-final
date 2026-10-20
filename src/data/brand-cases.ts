// Cases de marca: cada pasta cases/<slug>/ com um case.json vira uma página narrativa em /cases/<slug>/.
// Os arquivos (logo, fontes, imagens) ficam em public/<assets>/ — veja cases/<slug>/IMAGENS.md.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type LogoPart = "symbol-main" | "symbol-accent" | "wordmark" | "tagline";
export type LogoArt = "lockup" | "symbol" | "outline" | "wordmark" | "tagline";
export type Variant = Record<LogoPart, string> & { label: string; bg: string };
type Pin = [number, number][];

export interface BrandImage { id: string; section: string; w: number; h: number; alt: string; essential?: boolean; mono?: boolean }
export interface Overlay { art: LogoArt; variant: string; blend?: string; inset?: number; pin: Pin }
export interface AppItem {
  kind: "photo" | "crop" | "mockup" | "app" | "marquee" | "pattern";
  image?: string; col: [number, number]; mobile: 1 | 2; offset?: number; speed?: number; caption?: string;
  art?: LogoArt; viewBox?: string; variant?: string; overlays?: Overlay[];
  screen?: { greeting: string; cards: { label: string; title: string; meta: string }[]; progress: { label: string; value: number } };
}
export interface SystemTile { kind: "lockup" | "symbol" | "sizes" | "clearspace" | "icon" | "minimum"; variant: string; size: "lg" | "tall" | "wide" | "sm"; label: string; note?: string; sizes?: number[] }

export interface BrandCaseData {
  slug: string; client: string; segment: string; year: string; assets: string;
  seo: { title: string; description: string; image: string };
  theme: { dark: string; light: string; primary: string; secondary: string; support: string; accent: string; inkOnLight: string; mutedOnLight: string; inkOnDark: string; mutedOnDark: string };
  font: { family: string; fallback: string; unicodeRange?: string; files: Record<string, string>; preload: number[] };
  logo: Record<LogoArt, string> & { variants: Record<string, Variant> };
  intro: { kicker: string; subtitle: string; scrollHint: string; image?: string };
  symbol: { nav: string; eyebrow: string; title: string; text: string[]; pieces: { piece: string; label: string; text: string; shift: number; y: number }[]; image?: string };
  typography: { nav: string; eyebrow: string; title: string; glyphs: string[]; weights: number[]; text: string; spec: { k: string; v: string }[]; sample: string };
  manifesto: { nav: string; eyebrow: string; headline: string; attributes: { word: string; text: string }[] };
  colors: { nav: string; eyebrow: string; title: string; text: string; note: string; swatches: { name: string; role: string; hex: string; weight: number }[] };
  system: { nav: string; eyebrow: string; title: string; tiles: SystemTile[] };
  applications: { nav: string; eyebrow: string; title: string; text: string; marquee: string; items: AppItem[] };
  closing: { phrase: string; credits: { k: string; v: string }[]; cta: { text: string; label: string; href: string }; image?: string };
  images: BrandImage[];
}

const modules = import.meta.glob<{ default: BrandCaseData }>("/cases/*/case.json", { eager: true });
export const brandCases: Record<string, BrandCaseData> = Object.fromEntries(
  Object.values(modules).map((m) => [m.default.slug, m.default]),
);

/* ------------------------------------------------------------------ arquivos */
// A raiz do projeto é achada subindo pastas: funciona no dev (src/) e no build (dist/.prerender/).
const ROOT = (() => {
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
interface SvgFile { viewBox: [number, number, number, number]; inner: string; label: string }
const svgCache = new Map<string, SvgFile>();
export function readSvg(c: BrandCaseData, art: LogoArt): SvgFile {
  const file = publicPath(c, c.logo[art]);
  const key = `${file}:${fs.statSync(file).mtimeMs}`;
  if (!svgCache.has(key)) {
    const raw = fs.readFileSync(file, "utf8");
    const viewBox = /viewBox="([^"]+)"/.exec(raw)![1].trim().split(/[\s,]+/).map(Number) as SvgFile["viewBox"];
    const inner = raw.slice(raw.indexOf(">", raw.indexOf("<svg")) + 1, raw.lastIndexOf("</svg>")).trim();
    const label = /aria-label="([^"]*)"/.exec(raw)?.[1] ?? c.client;
    svgCache.set(key, { viewBox, inner, label });
  }
  return svgCache.get(key)!;
}

/** Variáveis CSS que recolorem as partes do logo (ver [data-part] em brand.css). */
export function variantVars(c: BrandCaseData, name?: string) {
  const v = name ? c.logo.variants[name] : undefined;
  if (!v) return {};
  return {
    "--logo-bg": v.bg,
    "--logo-symbol-main": v["symbol-main"],
    "--logo-symbol-accent": v["symbol-accent"],
    "--logo-wordmark": v.wordmark,
    "--logo-tagline": v.tagline,
  };
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
export const wcag = (ratio: number) => (ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA grande" : "—");

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
export function fontFaceCss(c: BrandCaseData) {
  const f = c.font;
  return Object.entries(f.files)
    .map(([weight, file]) =>
      `@font-face{font-family:"${f.family}";font-style:normal;font-weight:${weight};font-display:swap;` +
      `src:url("${assetUrl(c, file)}") format("woff2");${f.unicodeRange ? `unicode-range:${f.unicodeRange};` : ""}}`,
    )
    .join("\n");
}

/* ------------------------------------------------------------------ mockups */
/** Caixa que envolve os 4 cantos — posição de reserva quando o JS (matrix3d) não roda. */
export function pinBox(pin: Pin) {
  const xs = pin.map((p) => p[0]), ys = pin.map((p) => p[1]);
  const [x0, y0] = [Math.min(...xs), Math.min(...ys)];
  return { left: `${x0}%`, top: `${y0}%`, width: `${Math.max(...xs) - x0}%`, height: `${Math.max(...ys) - y0}%` };
}
