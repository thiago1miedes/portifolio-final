// Ferramentas dos cases de marca (conteúdo em cases/<slug>/case.json).
// Uso:  npm run brand -- efpi            (tudo: refs + og + images)
//       npm run brand -- efpi refs       PNGs do logo para anexar nas IAs  → cases/<slug>/ref/
//       npm run brand -- efpi og         imagem de compartilhamento        → public/<assets>/og.png
//       npm run brand -- efpi images     converte cases/<slug>/raw/*        → public/<assets>/img/*.webp|avif
//       npm run brand -- easywork site   prints do site (site.pages)        → public/<assets>/site/*.webp + manifest.json
//       npm run brand -- efpi thumb      capa da listagem (logo negativo)   → public/cases/<slug>/thumb.webp (fora do "tudo")
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [slug, task = "all"] = process.argv.slice(2);
if (!slug) {
  console.error("Informe o slug: npm run brand -- <slug> [refs|og|images]");
  process.exit(1);
}
const CASE_DIR = path.join(ROOT, "cases", slug);
const data = JSON.parse(fs.readFileSync(path.join(CASE_DIR, "case.json"), "utf8"));
const PUB = path.join(ROOT, "public", data.assets.replace(/^\//, ""));
sharp.cache(false);

/** Troca a cor de cada parte marcada com data-part="…" fill="…" pelas cores da variante. */
function recolor(svg, variant) {
  // wordmark-accent (ex.: "Easy" de outra cor) segue o wordmark quando a variante não a define
  const color = (part) => variant[part] ?? (part === "wordmark-accent" ? variant.wordmark : undefined);
  return svg.replace(/data-part="([\w-]+)"(\s+)fill="[^"]*"/g, (m, part, sp) =>
    color(part) ? `data-part="${part}"${sp}fill="${color(part)}"` : m,
  );
}
const logoSvg = (key) => fs.readFileSync(path.join(PUB, data.logo[key]), "utf8");
const variant = (name) => data.logo.variants[name];

/** Renderiza o SVG centrado numa tela de `width` px, ocupando `fill` da largura (ou da altura, se for mais alto). */
async function renderLogo(svg, { width, height, fill = 0.8, bg }) {
  const vb = /viewBox="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number);
  const ratio = vb[2] / vb[3];
  let w = Math.round(width * fill), h = Math.round(w / ratio);
  if (h > height * fill) { h = Math.round(height * fill); w = Math.round(h * ratio); }
  const art = await sharp(Buffer.from(svg), { density: Math.max(72, (w / vb[2]) * 72 * 1.2) })
    .resize({ width: w, height: h, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const background = bg ?? { r: 0, g: 0, b: 0, alpha: 0 };
  return sharp({ create: { width, height, channels: 4, background } })
    .composite([{ input: art, left: Math.round((width - w) / 2), top: Math.round((height - h) / 2) }])
    .png();
}

async function refs() {
  const out = path.join(CASE_DIR, "ref");
  fs.mkdirSync(out, { recursive: true });
  const t = data.theme;
  const jobs = [
    ["lockup", "transparent", "positive", null],
    ["lockup", "dark", "negative", t.dark],
    ["lockup", "light", "positive", t.light],
    ["lockup", "accent", "onAccent", t.accent],
    ["symbol", "transparent", "positive", null],
    ["symbol", "dark", "negative", t.dark],
  ];
  for (const [key, name, v, bg] of jobs) {
    const svg = recolor(logoSvg(key), variant(v));
    const size = key === "symbol" ? { width: 2000, height: 2000 } : { width: 2000, height: 1200 };
    const file = path.join(out, `${slug}-${key}-${name}.png`);
    await (await renderLogo(svg, { ...size, bg })).toFile(file);
    console.log("ref", path.relative(ROOT, file));
  }
}

async function og() {
  const svg = recolor(logoSvg("lockup"), variant("negative"));
  const file = path.join(PUB, data.seo.image ?? "og.png");
  await (await renderLogo(svg, { width: 1200, height: 630, fill: 0.56, bg: data.theme.dark })).toFile(file);
  console.log("og ", path.relative(ROOT, file));
}

async function images() {
  const rawDir = path.join(CASE_DIR, "raw");
  const out = path.join(PUB, "img");
  fs.mkdirSync(out, { recursive: true });
  if (!fs.existsSync(rawDir)) {
    fs.mkdirSync(rawDir, { recursive: true });
    console.log(`Pasta criada: ${path.relative(ROOT, rawDir)} — coloque ali as imagens com o nome do id (ex.: hero-prisma.png).`);
    return;
  }
  const byId = new Map(data.images.map((img) => [img.id.toLowerCase(), img]));
  const files = fs.readdirSync(rawDir).filter((f) => /\.(png|jpe?g|webp|avif|tiff?)$/i.test(f));
  if (!files.length) console.log(`Nenhuma imagem em ${path.relative(ROOT, rawDir)}.`);
  for (const f of files) {
    const id = path.parse(f).name.toLowerCase();
    const img = byId.get(id);
    if (!img) {
      console.warn(`ignorado: ${f} (nenhum id "${id}" em case.json)`);
      continue;
    }
    const src = path.join(rawDir, f);
    const sizes = [img.w, ...(img.w > 1000 ? [800] : [])];
    for (const w of sizes) {
      const h = Math.round((img.h * w) / img.w);
      let pipe = sharp(src, { limitInputPixels: false }).rotate().resize({ width: w, height: h, fit: "cover", position: "attention" });
      if (img.mono) pipe = pipe.grayscale();
      const base = path.join(out, w === img.w ? img.id : `${img.id}-w${w}`);
      await pipe.clone().webp({ quality: 82, effort: 5 }).toFile(`${base}.webp`);
      await pipe.clone().avif({ quality: 55, effort: 5 }).toFile(`${base}.avif`);
    }
    console.log("img", img.id, `${img.w}×${img.h}`, img.mono ? "(P&B)" : "");
  }
}

/** Prints de página inteira: recorta as margens laterais (site.crop), remove faixas vazias (page.cut)
 *  e grava a página (largura do recorte), a metade (celular) e uma miniatura para o mapa lateral. */
async function site() {
  const s = data.site;
  if (!s) {
    console.log(`case.json de ${slug} não tem "site".`);
    return;
  }
  const out = path.join(PUB, "site");
  fs.mkdirSync(out, { recursive: true });
  const [cx, cw] = s.crop;
  const manifest = {};
  for (const p of s.pages) {
    const src = path.join(CASE_DIR, p.source);
    if (!fs.existsSync(src)) {
      console.warn(`faltando: cases/${slug}/${p.source}`);
      continue;
    }
    const { height } = await sharp(src, { limitInputPixels: false }).metadata();
    const keep = [];
    let y = 0;
    for (const [y0, y1] of [...(p.cut ?? [])].sort((a, b) => a[0] - b[0])) {
      if (y0 > y) keep.push([y, y0]);
      y = Math.max(y, y1);
    }
    if (y < height) keep.push([y, height]);
    const parts = [];
    let top = 0;
    for (const [a, b] of keep) {
      const input = await sharp(src, { limitInputPixels: false }).extract({ left: cx, top: a, width: cw, height: b - a }).png().toBuffer();
      parts.push({ input, left: 0, top });
      top += b - a;
    }
    const page = await sharp({ create: { width: cw, height: top, channels: 3, background: "#ffffff" } }).composite(parts).png().toBuffer();
    const files = { full: `${p.id}.webp`, small: `${p.id}-w${Math.round(cw / 2)}.webp`, mini: `${p.id}-mini.webp` };
    await sharp(page, { limitInputPixels: false }).webp({ quality: 80, effort: 5 }).toFile(path.join(out, files.full));
    await sharp(page, { limitInputPixels: false }).resize({ width: Math.round(cw / 2) }).webp({ quality: 80, effort: 5 }).toFile(path.join(out, files.small));
    await sharp(page, { limitInputPixels: false }).resize({ width: 160 }).webp({ quality: 74 }).toFile(path.join(out, files.mini));
    manifest[p.id] = { w: cw, h: top, ...files };
    console.log("site", p.id, `${cw}×${top}`, p.cut?.length ? `(${p.cut.length} faixa removida)` : "");
  }
  fs.writeFileSync(path.join(out, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
}

/** Capa do card na listagem: substitui a que o `npm run assets` gera a partir da apresentação. */
async function thumb() {
  const svg = recolor(logoSvg("lockup"), variant("negative"));
  const file = path.join(ROOT, "public", "cases", slug, "thumb.webp");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const png = await (await renderLogo(svg, { width: 1200, height: 800, fill: 0.66, bg: data.theme.dark })).toBuffer();
  await sharp(png).webp({ quality: 88 }).toFile(file);
  console.log("thumb", path.relative(ROOT, file));
}

const tasks = { refs, og, images, site, thumb };
for (const name of task === "all" ? ["refs", "og", "images", ...(data.site ? ["site"] : [])] : [task]) {
  if (!tasks[name]) throw new Error(`tarefa desconhecida: ${name}`);
  await tasks[name]();
}
