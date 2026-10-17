// Gera as imagens dos cases em public/cases/<slug>/ e o índice src/data/assets.json.
// Uso:  npm run assets              (todos os cases)
//       npm run assets -- smartbox  (só os cases indicados)
import * as mupdf from "mupdf";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SRC, cases } from "./assets.config.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "cases");
const INDEX = path.join(ROOT, "src", "data", "assets.json");
const only = process.argv.slice(2);

sharp.cache(false);
const BOX = { page: 1440, slide: 1600, image: 1600, post: 1080, mobile: 780 };

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
  if (kind === "page" || kind === "mobile") {
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
      const isPdf = file.toLowerCase().endsWith(".pdf");
      const pages = isPdf ? (it.pages ?? [1]) : [null];
      for (const p of pages) {
        const id = p && it.pages ? `${it.id}-${String(p).padStart(2, "0")}` : it.id;
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
  if (from) {
    const size = await thumb(path.join(ROOT, "public", from.src), conf.thumb?.crop ?? "top", path.join(dir, "thumb.webp"));
    t = { src: `/cases/${slug}/thumb.webp`, ...size };
  }
  index[slug] = { thumb: t, cover: from?.id ?? null, items };
  console.log(`${slug}: ${items.length} imagens`);
}

fs.mkdirSync(path.dirname(INDEX), { recursive: true });
fs.writeFileSync(INDEX, JSON.stringify(index, null, 1));
console.log("ok →", path.relative(ROOT, INDEX));
