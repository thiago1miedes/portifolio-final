// Capas comerciais geradas no Google Flow (ver imagens.md).
//   capas/<slug>.png    (4:3)  vira a capa da grade de /cases/ e da home, em 3:2
//   capas/<slug>-v.png  (3:4)  vira a capa vertical da home
// Grava em public/capas/ e registra em src/data/capas.json, que os cards leem.
// Fica separado de thumb.webp porque `npm run assets` e `npm run brand -- <slug> thumb` sobrescrevem aquele arquivo.
// capas/auto/ guarda as capas desenhadas em código por `npm run covers` (scripts/covers.mjs);
// uma imagem de mesmo nome em capas/ (a do Flow) tem prioridade sobre a desenhada.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IN = path.join(ROOT, "capas");
const OUT = path.join(ROOT, "public", "capas");
const MANIFEST = path.join(ROOT, "src", "data", "capas.json");
const SIZE = { h: { width: 1200, height: 800 }, v: { width: 900, height: 1200 } };

const known = new Set(Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT, "src", "data", "assets.json"), "utf8"))));
const manifest = {};
fs.mkdirSync(OUT, { recursive: true });

const isImg = (f) => /\.(png|jpe?g|webp)$/i.test(f);
const AUTO = path.join(IN, "auto");
// nome (sem extensão) → caminho; as do Flow, lidas por último, trocam as desenhadas
const byName = new Map();
for (const dir of [AUTO, IN]) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(isImg)) byName.set(path.parse(f).name.toLowerCase(), path.join(dir, f));
}
if (!byName.size) console.log("Nenhuma imagem em capas/.");

for (const [name, input] of byName) {
  const file = path.basename(input);
  const key = name.endsWith("-v") ? "v" : "h";
  const slug = key === "v" ? name.slice(0, -2) : name;
  if (!known.has(slug)) {
    console.warn(`ignorado: ${file} (não existe case "${slug}")`);
    continue;
  }
  const out = `${name}.webp`;
  await sharp(input, { limitInputPixels: false })
    .rotate()
    .resize({ ...SIZE[key], fit: "cover", position: "centre" })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(OUT, out));
  (manifest[slug] ??= {})[key] = { src: `/capas/${out}`, w: SIZE[key].width, h: SIZE[key].height };
  console.log("capa", out);
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`${Object.keys(manifest).length} case(s) com capa nova em src/data/capas.json`);
