// Gera as imagens dos cases em public/cases/<slug>/ e o índice src/data/assets.json.
// Uso:  npm run assets              (todos os cases)
//       npm run assets -- smartbox  (só os cases indicados)
import * as mupdf from "mupdf";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { SRC, cases } from "./assets.config.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "cases");
const INDEX = path.join(ROOT, "src", "data", "assets.json");
const only = process.argv.slice(2);

sharp.cache(false);
const BOX = { page: 1440, slide: 1600, image: 1600, photo: 2000, label: 2600, book: 1800, post: 1080, mobile: 780 };

// Resolve caminhos tolerando diferenças de acentuação (NFC/NFD) e maiúsculas.
function resolve(rel) {
  const base = rel.startsWith("shots/") ? path.join(ROOT, "sources") : SRC;
  let cur = base;
  for (const seg of rel.split("/")) {
    const direct = path.join(cur, seg);
    if (fs.existsSync(direct)) { cur = direct; continue; }
    const want = seg.normalize("NFC").toLowerCase();
    const hit = fs.readdirSync(cur).find((n) => n.normalize("NFC").toLowerCase() === want);
    if (!hit) throw new Error(`não encontrado: ${rel}`);
    cur = path.join(cur, hit);
  }
  return cur;
}

async function save(input, kind, file) {
  const img = sharp(input, { limitInputPixels: false }).rotate();
  const m = await img.metadata();
  const box = BOX[kind] ?? 1600;
  let w = m.width, h = m.height;
  if (kind === "story" || kind === "feed" || kind === "banner") {
    // artes de rede social e banners: tamanho original (nunca ampliam), para o zoom ficar nítido
    if (w > 2600) { h = Math.round((h * 2600) / w); w = 2600; }
  } else if (kind === "page" || kind === "mobile") {
    if (w > box) { h = Math.round((h * box) / w); w = box; }
  } else {
    const s = Math.min(1, box / Math.max(w, h));
    w = Math.round(w * s); h = Math.round(h * s);
  }
  // WebP aceita no máximo 16383px de altura
  let pipe = sharp(input, { limitInputPixels: false }).rotate().resize({ width: w });
  if (h > 16000) {
    const buf = await pipe.png().toBuffer();
    pipe = sharp(buf, { limitInputPixels: false }).extract({ left: 0, top: 0, width: w, height: 16000 });
    h = 16000;
  }
  await pipe.webp({ quality: kind === "page" ? 80 : 84, effort: 5 }).toFile(file);
  return { w, h };
}

function renderPdf(file, pageNo, kind) {
  const doc = mupdf.Document.openDocument(fs.readFileSync(file), "application/pdf");
  const page = doc.loadPage(pageNo - 1);
  const [x0, y0, x1, y1] = page.getBounds();
  const pw = x1 - x0, ph = y1 - y0;
  const box = BOX[kind] ?? 1600;
  const scale = kind === "page" ? box / pw : Math.min(box / pw, box / ph) * 1.0;
  const pix = page.toPixmap(mupdf.Matrix.scale(scale, scale), mupdf.ColorSpace.DeviceRGB, false, true);
  return Buffer.from(pix.asPNG());
}

// SVG vai como está; o tamanho sai do viewBox.
function copySvg(file, out) {
  fs.copyFileSync(file, out);
  const [, , w, h] = /viewBox="([^"]+)"/.exec(fs.readFileSync(file, "utf8"))[1].split(/[\s,]+/).map(Number);
  return { w: Math.round(w), h: Math.round(h) };
}

// Vídeo vai como está; o pôster (o quadro do segundo `at`, por padrão o primeiro) é capturado no Chrome, já que não há ffmpeg na máquina.
let browser = null;
async function videoPoster(file, out, at = 0.05) {
  if (!browser) {
    const { default: puppeteer } = await import("puppeteer-core");
    browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--allow-file-access-from-files"] });
  }
  const page = await browser.newPage();
  await page.goto(pathToFileURL(file).href);
  const png = await page.evaluate(async (at) => {
    const v = document.querySelector("video");
    v.muted = true; v.pause();
    if (v.readyState < 2) await new Promise((r) => (v.onloadeddata = r));
    v.currentTime = Math.min(at, v.duration - 0.05);
    await new Promise((r) => (v.onseeked = r));
    const c = document.createElement("canvas");
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    return c.toDataURL("image/png");
  }, at);
  await page.close();
  return save(Buffer.from(png.split(",")[1], "base64"), "feed", out);
}

// Capa da listagem com o logo do cliente sobre a repetição de um padrão (os dois em SVG).
async function logoThumb(logoFile, patternFile, file) {
  const W = 1200, H = 800, T = 800, L = 470;
  const pattern = await sharp(patternFile, { density: 120 }).resize(T, T).png().toBuffer();
  const wall = await sharp({ create: { width: W + 400, height: H, channels: 4, background: "#0a0a0b" } })
    .composite([{ input: pattern, tile: true, left: 0, top: 0 }])
    .png()
    .toBuffer();
  const shade = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><radialGradient id="g" r="55%"><stop offset="0.28" stop-color="#0a0a0b" stop-opacity="0.92"/><stop offset="0.62" stop-color="#0a0a0b" stop-opacity="0.35"/><stop offset="1" stop-color="#0a0a0b" stop-opacity="0.15"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`;
  const logo = await sharp(logoFile, { density: 72 * (L / 300) }).resize(L, L, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp(wall)
    .extract({ left: 200, top: 0, width: W, height: H })
    .composite([{ input: Buffer.from(shade) }, { input: logo, left: (W - L) / 2, top: (H - L) / 2 }])
    .webp({ quality: 82 })
    .toFile(file);
  return { w: W, h: H };
}

// Capa da listagem com o logotipo (já em branco) sobre uma cor da marca, com duas ondas claras no rodapé.
async function brandThumb(logoFile, bg, file) {
  const W = 1200, H = 800, L = 720;
  const logo = await sharp(logoFile, { density: 220 }).resize({ width: L }).png().toBuffer();
  const lh = (await sharp(logo).metadata()).height;
  const waves = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="${bg}"/><path d="M0 640C220 560 380 700 620 640S1000 560 1200 650V800H0Z" fill="#fff" fill-opacity="0.09"/><path d="M0 700C260 640 420 760 700 710S1040 650 1200 720V800H0Z" fill="#fff" fill-opacity="0.12"/></svg>`;
  await sharp(Buffer.from(waves))
    .composite([{ input: logo, left: (W - L) / 2, top: Math.round((H - lh) / 2) - 30 }])
    .webp({ quality: 84 })
    .toFile(file);
  return { w: W, h: H };
}

async function thumb(srcFile, crop, file) {
  const m = await sharp(srcFile, { limitInputPixels: false }).metadata();
  const ratio = 3 / 2;
  let left = 0, top = 0, width = m.width, height = Math.round(m.width / ratio);
  if (height > m.height) { height = m.height; width = Math.round(height * ratio); left = Math.round((m.width - width) / 2); }
  else if (crop === "center") top = Math.round((m.height - height) / 2);
  await sharp(srcFile, { limitInputPixels: false })
    .extract({ left, top, width, height })
    .resize({ width: 1200, height: 800 })
    .webp({ quality: 80 })
    .toFile(file);
  return { w: 1200, h: 800 };
}

const index = fs.existsSync(INDEX) ? JSON.parse(fs.readFileSync(INDEX, "utf8")) : {};
const slugs = only.length ? only : Object.keys(cases);

for (const slug of slugs) {
  const conf = cases[slug];
  if (!conf) { console.warn(`case desconhecido: ${slug}`); continue; }
  const dir = path.join(OUT, slug);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const items = [];
  for (const it of conf.items) {
    try {
      const file = resolve(it.src);
      if (it.kind === "svg") {
        const size = copySvg(file, path.join(dir, `${it.id}.svg`));
        items.push({ id: it.id, src: `/cases/${slug}/${it.id}.svg`, ...size, kind: it.kind, label: it.label, group: it.group });
        continue;
      }
      if (it.kind === "video") {
        fs.copyFileSync(file, path.join(dir, `${it.id}.mp4`));
        const size = await videoPoster(file, path.join(dir, `${it.id}.webp`), it.at);
        items.push({ id: it.id, src: `/cases/${slug}/${it.id}.webp`, video: `/cases/${slug}/${it.id}.mp4`, ...size, kind: it.kind, label: it.label, group: it.group });
        continue;
      }
      // .ai salvo com compatibilidade PDF abre do mesmo jeito
      const isPdf = /\.(pdf|ai)$/i.test(file);
      const pages = isPdf ? (it.pages ?? [1]) : [null];
      for (const p of pages) {
        // com uma página só, o id fica como está
        const id = p && it.pages?.length > 1 ? `${it.id}-${String(p).padStart(2, "0")}` : it.id;
        const input = isPdf ? renderPdf(file, p, it.kind) : file;
        const outFile = path.join(dir, `${id}.webp`);
        const { w, h } = await save(input, it.kind, outFile);
        items.push({ id, src: `/cases/${slug}/${id}.webp`, w, h, kind: it.kind, label: it.label, group: it.group });
      }
    } catch (e) {
      console.warn(`  ! ${slug}/${it.id}: ${e.message}`);
    }
  }
  let t = null;
  const from = items.find((i) => i.id === conf.thumb?.from) ?? items[0];
  if (conf.thumb?.logo && conf.thumb.bg) {
    t = { src: `/cases/${slug}/thumb.webp`, ...(await brandThumb(path.join(dir, `${conf.thumb.logo}.svg`), conf.thumb.bg, path.join(dir, "thumb.webp"))) };
  } else if (conf.thumb?.logo) {
    const svg = (id) => path.join(dir, `${id}.svg`);
    t ={ src: `/cases/${slug}/thumb.webp`, ...(await logoThumb(svg(conf.thumb.logo), svg(conf.thumb.pattern), path.join(dir, "thumb.webp"))) };
  } else if (from) {
    const size = await thumb(path.join(ROOT, "public", from.src), conf.thumb?.crop ?? "top", path.join(dir, "thumb.webp"));
    t = { src: `/cases/${slug}/thumb.webp`, ...size };
  }
  // a capa da página é a mesma imagem da listagem, a não ser que o config indique outra
  index[slug] = { thumb: t, cover: conf.cover ?? from?.id ?? null, items };
  console.log(`${slug}: ${items.length} imagens`);
}

await browser?.close();
fs.mkdirSync(path.dirname(INDEX), { recursive: true });
fs.writeFileSync(INDEX, JSON.stringify(index, null, 1));
console.log("ok →", path.relative(ROOT, INDEX));
