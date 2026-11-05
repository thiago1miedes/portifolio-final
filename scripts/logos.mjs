// Logos da faixa da home. Cada SVG original vira dois arquivos em public/logos/:
//   <slug>.svg    cores originais, com a área em volta do desenho cortada
//   <slug>-w.svg  branco para fundo escuro, em tons para não perder o contraste interno
// Mesma lógica do negativo de um logo: a cor mais escura vira branco puro, as mais claras viram cinzas,
// e o branco do desenho vira a cor do fundo (é o vazio do logo). Lista e proporções ficam em src/data/logos.json.
// Só entram clientes com case publicado. Para rodar de novo: npm run logos
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "logos");
const BG = "#0a0a0b";

// noTagline: sai o descritor (a camada data-layer="tagline" do lockup), que nesse tamanho não dá para ler.
const brandLockup = (slug) => `public/brand/${slug}/logo/lockup.svg`;
const LOGOS = [
  { slug: "faggian", name: "Faggian Brand", src: brandLockup("faggian"), noTagline: true },
  { slug: "kom-saude", name: "Kom Saúde", src: brandLockup("kom-saude"), noTagline: true },
  { slug: "visual-vidros", name: "Visual Vidros", src: brandLockup("visual-vidros"), noTagline: true },
  { slug: "dor-e-saude", name: "Instituto Dor & Saúde", src: "cases/dor-e-saude/source/logo-sem-descritor.svg" },
  { slug: "easywork", name: "EasyWork", src: "cases/easywork/source/logo_EasyWork.svg" },
  { slug: "equipamentaria", name: "Equipamentaria", src: brandLockup("equipamentaria"), noTagline: true },
  { slug: "confraria", name: "Confraria dos Aromas", src: "cases/confraria/source/ConfrariaDosAromas.svg" },
  { slug: "vocs", name: "VOC&S", src: "cases/vocs/source/Logo_voc&s.svg" },
  { slug: "procare", name: "Procare", raster: "../Procare/logo-pro-nutricare.webp" },
  { slug: "urbes", name: "Urbes", src: brandLockup("urbes"), noTagline: true },
  { slug: "oticas-talarico", name: "Óticas Talarico", src: "../Oticas Talarico/Projeto case/Group 2023.svg" },
  { slug: "grasie", name: "Grasiê Kids & Teen", src: brandLockup("grasie"), noTagline: true },
  { slug: "rock-ensina", name: "Rock Ensina", src: "cases/rock-ensina/source/logo_rockensina.svg" },
  { slug: "debora-sandrin", name: "Débora Sandrin", src: brandLockup("debora-sandrin"), noTagline: true },
  { slug: "lf-servicos-eletricos", name: "LF Serviços Elétricos", src: "../LF Serviços elétricos/Logo_Lf_2.svg" },
  { slug: "lifestyle", name: "LifeStyle", src: brandLockup("lifestyle"), noTagline: true },
  { slug: "efpi", name: "EFPI", src: brandLockup("efpi"), noTagline: true },
  { slug: "mentevitale", name: "MenteVitale", src: "../Mentivitalle/Logo_mentevitale.svg" },
  { slug: "cau-pe", name: "CAU/PE", src: "public/cases/cau-pe/logo.svg" },
];

/** Remove o grupo do descritor, contando os <g> abertos para achar onde ele termina. */
function withoutTagline(svg, slug) {
  const start = svg.search(/<g\b[^>]*data-layer="tagline"/);
  if (start < 0) throw new Error(`${slug}: lockup sem camada de descritor`);
  const tag = /<g\b[^>]*>|<\/g>/g;
  tag.lastIndex = start;
  let depth = 0;
  for (let m; (m = tag.exec(svg)); ) {
    depth += m[0] === "</g>" ? -1 : m[0].endsWith("/>") ? 0 : 1;
    if (depth === 0) return svg.slice(0, start) + svg.slice(m.index + m[0].length);
  }
  throw new Error(`${slug}: grupo do descritor sem fechamento`);
}

const NAMED = { white: "#ffffff", black: "#000000" };
const COLOR = /#[0-9a-f]{6}\b|#[0-9a-f]{3}\b|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|(?<=(?:fill|stroke|stop-color)\s*[:=]\s*"?)(?:white|black)\b/gi;

const toRgb = (c) => {
  const s = c.toLowerCase();
  if (NAMED[s]) return toRgb(NAMED[s]);
  if (s.startsWith("rgb")) return s.match(/\d+/g).slice(0, 3).map(Number);
  const h = s.length === 4 ? [...s.slice(1)].map((x) => x + x).join("") : s.slice(1);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const luminance = ([r, g, b]) => {
  const f = (v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const isWhite = ([r, g, b]) => Math.min(r, g, b) > 232;
const hexOf = (v) => `#${[v, v, v].map((n) => Math.round(n).toString(16).padStart(2, "0")).join("")}`;

/** Tira o que não desenha; devolve o SVG limpo e o viewBox original. */
function clean(svg) {
  const body = svg
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/<metadata>[\s\S]*?<\/metadata>/gi, "")
    .trim();
  const open = body.match(/<svg\b[^>]*>/i)[0];
  let vb = open.match(/viewBox="([^"]+)"/i)?.[1]?.trim().split(/[\s,]+/).map(Number);
  if (!vb) {
    const num = (k) => parseFloat(open.match(new RegExp(`\\b${k}="([\\d.]+)`, "i"))?.[1] ?? "0");
    vb = [0, 0, num("width"), num("height")];
  }
  return { body, vb };
}

const withViewBox = (t, vb, rootFill) => t.replace(/<svg\b[^>]*>/i, (open) => {
  const rest = open
    .replace(/\s(?:width|height|viewBox|x|y|style|enable-background|xml:space|fill)="[^"]*"/gi, "")
    .replace(/>$/, "");
  return `${rest} viewBox="${vb.map((n) => +n.toFixed(2)).join(" ")}"${rootFill ? ` fill="${rootFill}"` : ""}>`;
});

/** Área real do desenho: rasteriza, corta o transparente e converte de volta para as unidades do SVG. */
async function tightBox(t, vb) {
  const W = 2400;
  const scale = vb[2] / W;
  const H = Math.round(vb[3] / scale);
  const svg = withViewBox(t, vb).replace(/<svg\b/i, `<svg width="${W}" height="${H}"`);
  const { info } = await sharp(Buffer.from(svg)).png().trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const left = -(info.trimOffsetLeft ?? 0);
  const top = -(info.trimOffsetTop ?? 0);
  const pad = 0.004 * vb[2];
  return [vb[0] + left * scale - pad, vb[1] + top * scale - pad, info.width * scale + 2 * pad, info.height * scale + 2 * pad];
}

/** Versão para fundo escuro. */
function whiteVersion(t) {
  const found = new Map();
  for (const m of t.matchAll(COLOR)) found.set(m[0].toLowerCase(), toRgb(m[0]));
  const inks = [...found.entries()].filter(([, rgb]) => !isWhite(rgb));
  const lums = inks.map(([, rgb]) => luminance(rgb));
  const min = lums.length ? Math.min(...lums) : 0;
  const map = new Map();
  for (const [c, rgb] of found) {
    if (isWhite(rgb)) { map.set(c, inks.length ? BG : "#ffffff"); continue; }
    // quanto mais clara em relação à cor principal, mais apagada; nunca abaixo de 58% para continuar legível
    const k = Math.min(1, (luminance(rgb) - min) / 0.55);
    map.set(c, hexOf(255 - k * 0.42 * 245));
  }
  return { svg: t.replace(COLOR, (c) => map.get(c.toLowerCase()) ?? c), tones: [...new Set(map.values())] };
}

/**
 * Logo que só existe em bitmap: corta a área vazia e grava as duas versões em webp.
 * Mesma lógica do negativo: a cor mais escura vira branco e a mais clara, cinza; o alfa original cuida do serrilhado.
 */
async function rasterLogo(file, slug) {
  const { data, info } = await sharp(file).ensureAlpha().trim({ threshold: 1 }).resize({ width: 900 }).raw().toBuffer({ resolveWithObject: true });
  const counts = new Map();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 250) continue;
    const k = (data[i] >> 4 << 8) | (data[i + 1] >> 4 << 4) | (data[i + 2] >> 4);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  // as duas cores que mais aparecem são as do logo
  const [a, b] = [...counts.entries()].sort((x, y) => y[1] - x[1]).slice(0, 2).map(([k]) => [(k >> 8) * 17, ((k >> 4) & 15) * 17, (k & 15) * 17]);
  const [dark, light] = luminance(a) < luminance(b) ? [a, b] : [b, a];
  const tone = 255 - Math.min(1, (luminance(light) - luminance(dark)) / 0.55) * 0.42 * 245;
  const d = dark.map((v, c) => light[c] - v);
  const len = d[0] ** 2 + d[1] ** 2 + d[2] ** 2;
  const white = Buffer.from(data);
  for (let i = 0; i < white.length; i += 4) {
    const t = Math.max(0, Math.min(1, ((white[i] - dark[0]) * d[0] + (white[i + 1] - dark[1]) * d[1] + (white[i + 2] - dark[2]) * d[2]) / len));
    white.fill(Math.round(255 + (tone - 255) * t), i, i + 3);
  }
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
  await sharp(data, raw).webp({ quality: 90 }).toFile(path.join(OUT, `${slug}.webp`));
  await sharp(white, raw).webp({ quality: 90 }).toFile(path.join(OUT, `${slug}-w.webp`));
  return info.width / info.height;
}

fs.mkdirSync(OUT, { recursive: true });
const manifest = [];
for (const logo of LOGOS) {
  if (logo.raster) {
    const ratio = await rasterLogo(path.resolve(ROOT, logo.raster), logo.slug);
    manifest.push({ slug: logo.slug, name: logo.name, ratio: +ratio.toFixed(3), ext: "webp" });
    console.log(logo.slug.padEnd(24), `proporção ${ratio.toFixed(2)}`.padEnd(18), "bitmap");
    continue;
  }
  const original = fs.readFileSync(path.resolve(ROOT, logo.src), "utf8");
  const raw = logo.noTagline ? withoutTagline(original, logo.slug) : original;
  if (/<image\b/i.test(raw)) throw new Error(`${logo.slug}: o SVG traz imagem embutida`);
  const { body, vb } = clean(raw);
  const box = await tightBox(body, vb);
  fs.writeFileSync(path.join(OUT, `${logo.slug}.svg`), withViewBox(body, box));
  const white = whiteVersion(body);
  fs.writeFileSync(path.join(OUT, `${logo.slug}-w.svg`), withViewBox(white.svg, box, "#ffffff"));
  manifest.push({ slug: logo.slug, name: logo.name, ratio: +(box[2] / box[3]).toFixed(3) });
  console.log(logo.slug.padEnd(24), `proporção ${(box[2] / box[3]).toFixed(2)}`.padEnd(18), white.tones.join(" "));
}
fs.writeFileSync(path.join(ROOT, "src", "data", "logos.json"), JSON.stringify(manifest, null, 2) + "\n");
