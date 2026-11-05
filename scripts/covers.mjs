// Capas dos cases de marca, desenhadas em código a partir do logo e das cores de cada marca (cases/<slug>/case.json).
// Cada marca tem a sua entrada: o símbolo grande sangrando na borda, uma textura ou um traço que vem da identidade
// e o logo por cima, no mesmo espírito das capas dos cases de social.
//   npm run covers                  todas as marcas
//   npm run covers -- urbes efpi    só estas
// Grava capas/auto/<slug>.png (3:2, 2400×1600) e capas/auto/<slug>-v.png (3:4, 1800×2400).
// Depois `npm run capas` leva para public/capas e registra em src/data/capas.json. Uma imagem do Flow salva em
// capas/<slug>.png tem prioridade sobre a desenhada aqui.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "capas", "auto");
const args = process.argv.slice(2);
const sheetIdx = args.indexOf("--sheet");
const sheet = sheetIdx >= 0 ? args.splice(sheetIdx, 2)[1] : null;
sharp.cache(false);

/* ------------------------------------------------------------------ utilidades */
const brand = (slug) => {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, "cases", slug, "case.json"), "utf8"));
  return { data, pub: path.join(ROOT, "public", data.assets.replace(/^\//, "")), t: data.theme };
};

/** Troca a cor de cada parte data-part="…" fill="…" pelas cores da variante (mesma regra de brand-case.mjs). */
function recolor(svg, variant) {
  const fallback = { "wordmark-accent": "wordmark", "symbol-3": "symbol-accent", "symbol-4": "symbol-accent", "symbol-5": "symbol-main" };
  const color = (part) => variant[part] ?? variant[fallback[part]];
  return svg.replace(/data-part="([\w-]+)"(\s+)fill="[^"]*"/g, (m, part, sp) => (color(part) ? `data-part="${part}"${sp}fill="${color(part)}"` : m));
}

let uid = 0;
/** Lê um arquivo do logo já recolorido: devolve o viewBox e o miolo do SVG, pronto para ir dentro de outro SVG. */
function art(slug, key, variantName, override = {}) {
  const { data, pub } = brand(slug);
  const raw = fs.readFileSync(path.join(pub, data.logo[key]), "utf8");
  const svg = recolor(raw, { ...(data.logo.variants[variantName] ?? {}), ...override });
  const vb = /viewBox="([^"]+)"/.exec(svg)[1].trim().split(/[\s,]+/).map(Number);
  const body = svg.slice(svg.indexOf(">", svg.indexOf("<svg")) + 1, svg.lastIndexOf("</svg>"));
  return { vb, body };
}

/** Coloca uma peça de `art` no desenho: por largura (w) ou altura (h), ancorada em (x, y) por (ax, ay) de 0 a 1. */
function put(a, { x, y, w, h, ax = 0.5, ay = 0.5, rot = 0, op = 1, flip = false }) {
  const [, , vw, vh] = a.vb;
  if (w == null) w = (h * vw) / vh;
  if (h == null) h = (w * vh) / vw;
  const n = ++uid;
  const body = a.body
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${id}-${n}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${id}-${n})`)
    .replace(/(xlink:)?href="#([^"]+)"/g, (_, p, id) => `${p ?? ""}href="#${id}-${n}"`);
  const left = x - w * ax, top = y - h * ay;
  const tf = [rot ? `rotate(${rot} ${x} ${y})` : "", flip ? `translate(${left * 2 + w} 0) scale(-1 1)` : ""].filter(Boolean).join(" ");
  return `<g${op < 1 ? ` opacity="${op}"` : ""}${tf ? ` transform="${tf}"` : ""}><svg x="${left}" y="${top}" width="${w}" height="${h}" viewBox="${a.vb.join(" ")}" overflow="visible">${body}</svg></g>`;
}

/** Gerador pseudoaleatório fixo: as capas saem iguais a cada rodada. */
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const f = (n) => +n.toFixed(1);
const grad = (id, a, b, [x1, y1, x2, y2] = [0, 0, 1, 1]) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const radial = (id, c, o, [cx, cy, r] = [0.5, 0.5, 0.6]) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
/** Contorno suave e fechado em volta de um centro (bolhas, manchas, pedras). */
function blob(cx, cy, r, seed, wobble = 0.18, n = 8) {
  const R = rng(seed);
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2, rr = r * (1 - wobble + R() * wobble * 2);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M${f(mid(pts[n - 1], pts[0])[0])} ${f(mid(pts[n - 1], pts[0])[1])}`;
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n]);
    d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`;
  }
  return d + "Z";
}
const star4 = (cx, cy, r) => `M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`;

/* ------------------------------------------------------------------ as capas */
// Cada função recebe a largura, a altura e P (true na vertical) e devolve { defs, body }.
const designs = {
  /* Dor & Saúde: a coluna em pontos dourados e o anel do símbolo, em azul noturno */
  "dor-e-saude"(W, H, P) {
    const { t } = brand("dor-e-saude");
    const sym = art("dor-e-saude", "symbol", "negative");
    const word = art("dor-e-saude", "wordmark", "negative");
    const tag = art("dor-e-saude", "tagline", "negative");
    const cx = P ? W * 0.5 : W * 0.74, cy = P ? H * 0.3 : H * 0.5, sh = P ? H * 0.5 : H * 1.12;
    const rings = [1.08, 1.3, 1.56].map((k, i) => `<circle cx="${cx}" cy="${cy}" r="${f((sh / 2) * k)}" fill="none" stroke="${t.accent}" stroke-opacity="${[0.28, 0.16, 0.08][i]}" stroke-width="${i ? 1.5 : 2}"/>`).join("");
    const dots = Array.from({ length: 16 }, (_, i) => {
      const a = -1.15 + i * 0.075, r = (sh / 2) * 1.3;
      return `<circle cx="${f(cx + Math.cos(a + 2.2) * r)}" cy="${f(cy + Math.sin(a + 2.2) * r)}" r="${f(2 + (i % 4) * 0.9)}" fill="${t.accent}" fill-opacity="0.5"/>`;
    }).join("");
    const lw = P ? W * 0.74 : W * 0.4, lx = P ? W / 2 : W * 0.08, ly = P ? H * 0.74 : H * 0.47;
    return {
      defs: grad("g1", "#172E4D", "#0D1828", [0, 0, 1, 1]) + radial("g2", t.accent, 0.16, [0.74, 0.5, 0.55]),
      body: `<rect width="${W}" height="${H}" fill="url(#g1)"/><rect width="${W}" height="${H}" fill="url(#g2)"/>${rings}${dots}${put(sym, { x: cx, y: cy, h: sh })}` +
        put(word, { x: lx, y: ly, w: lw, ax: P ? 0.5 : 0, ay: 0.5 }) + put(tag, { x: lx, y: ly + (P ? lw * 0.19 : lw * 0.17), w: lw * 0.78, ax: P ? 0.5 : 0, ay: 0.5, op: 0.9 }),
    };
  },

  /* Kom Saúde: bolhas subindo da fermentação, com a folha em tom sobre tom */
  "kom-saude"(W, H, P) {
    const { t } = brand("kom-saude");
    const leaf = art("kom-saude", "symbol", "negative", { "symbol-main": "#133A2F", "symbol-accent": "#0E241D" });
    const logo = art("kom-saude", "lockup", "negative");
    const R = rng(11);
    const bubbles = Array.from({ length: P ? 30 : 38 }, (_, i) => {
      const y = H * (1.05 - Math.pow(R(), 1.6) * 1.1), r = 8 + R() * R() * (P ? 70 : 90) + (1 - y / H) * 6;
      const x = R() * W, tone = R() < 0.18;
      return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${tone ? t.accent : "#F5EFE3"}" fill-opacity="${tone ? 0.1 : 0.03}" stroke="${tone ? t.accent : "#F5EFE3"}" stroke-opacity="${f(0.1 + R() * 0.18)}" stroke-width="2"/>` +
        `<circle cx="${f(x - r * 0.32)}" cy="${f(y - r * 0.34)}" r="${f(Math.max(1.5, r * 0.12))}" fill="#F5EFE3" fill-opacity="0.35"/>`;
    }).join("");
    return {
      defs: radial("g1", "#1B4A3B", 0.9, [0.5, 0.52, 0.7]),
      body: `<rect width="${W}" height="${H}" fill="${t.dark}"/><rect width="${W}" height="${H}" fill="url(#g1)"/>` +
        put(leaf, { x: P ? W * 0.1 : W * 0.06, y: P ? H * 0.9 : H * 0.92, h: P ? H * 0.62 : H * 1.0, rot: -14 }) + bubbles +
        put(logo, P ? { x: W / 2, y: H * 0.47, w: W * 0.66 } : { x: W / 2, y: H * 0.47, h: H * 0.62 }),
    };
  },

  /* Urbes: as quadras do símbolo viram a base de um mapa, e os cabos atravessam entre elas */
  urbes(W, H, P) {
    const { t } = brand("urbes");
    const sym = art("urbes", "symbol", "positive");
    const logo = art("urbes", "untagged", "negative");
    const ang = -24, R = rng(7);
    const lines = Array.from({ length: 9 }, (_, i) => {
      const y = (i - 1) * (P ? H / 8 : H / 7) + 40;
      return `<line x1="-200" y1="${y}" x2="${W + 200}" y2="${y}" stroke="#F2F0EC" stroke-opacity="${i % 3 === 0 ? 0.2 : 0.08}" stroke-width="${i % 3 === 0 ? 2 : 1.2}"/>`;
    }).join("");
    const nodes = Array.from({ length: 11 }, () => `<circle cx="${f(R() * W)}" cy="${f(R() * H)}" r="${f(4 + R() * 4)}" fill="${t.accent}"/>`).join("");
    return {
      defs: "",
      body: `<rect width="${W}" height="${H}" fill="${t.dark}"/><g transform="rotate(${ang} ${W / 2} ${H / 2})">${lines}</g>` +
        put(sym, P ? { x: W * 0.74, y: H * 0.18, h: H * 0.72, rot: 0 } : { x: W * 0.9, y: H * 0.46, h: H * 1.2, rot: 0 }) + nodes +
        put(logo, P ? { x: W / 2, y: H * 0.7, w: W * 0.74 } : { x: W * 0.07, y: H * 0.5, w: W * 0.37, ax: 0 }),
    };
  },

  /* Visual Vidros: facetas de vidro sobrepostas, com um feixe de luz cruzando */
  "visual-vidros"(W, H, P) {
    const { t } = brand("visual-vidros");
    const sym = art("visual-vidros", "symbol", "negative");
    const logo = art("visual-vidros", "lockup", "negative");
    return {
      defs: grad("g1", "#0C1A2C", "#1C4374", [0, 0, 1, 1]) +
        `<linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.13"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`,
      body: `<rect width="${W}" height="${H}" fill="url(#g1)"/>` +
        put(sym, P ? { x: W * 0.82, y: H * 0.2, h: H * 0.46, rot: -14, op: 0.9 } : { x: W * 0.84, y: H * 0.44, h: H * 0.98, rot: -14, op: 0.92 }) +
        put(sym, P ? { x: W * 0.1, y: H * 0.9, h: H * 0.26, rot: 22, op: 0.5 } : { x: W * 0.62, y: H * 1.0, h: H * 0.4, rot: 22, op: 0.45 }) +
        put(sym, P ? { x: W * 0.42, y: H * 0.98, h: H * 0.12, rot: 8, op: 0.3 } : { x: W * 0.6, y: H * 0.02, h: H * 0.2, rot: -30, op: 0.3 }) +
        `<g transform="rotate(-28 ${W / 2} ${H / 2})"><rect x="${W * 0.36}" y="${-H * 0.4}" width="${W * 0.16}" height="${H * 2}" fill="url(#beam)"/></g>` +
        put(logo, P ? { x: W / 2, y: H * 0.62, w: W * 0.7 } : { x: W * 0.07, y: H * 0.5, w: W * 0.4, ax: 0 }),
    };
  },

  /* Equipamentaria: faixa de obra, malha de projeto e o trabalhador ao lado da marca */
  equipamentaria(W, H, P) {
    const { t } = brand("equipamentaria");
    const sym = art("equipamentaria", "symbol", "negative");
    const word = art("equipamentaria", "wordmark", "negative");
    const tag = art("equipamentaria", "tagline", "negative");
    const band = P ? H * 0.075 : H * 0.15, step = band * 1.1;
    const stripes = Array.from({ length: Math.ceil((W + band) / step) + 2 }, (_, i) => {
      const x = i * step * 2 - band;
      return `<polygon points="${f(x)},${H} ${f(x + step)},${H} ${f(x + step + band)},${f(H - band)} ${f(x + band)},${f(H - band)}" fill="${t.accent}"/>`;
    }).join("");
    const grid = Array.from({ length: 16 }, (_, i) => `<line x1="${f(i * (W / 15))}" y1="0" x2="${f(i * (W / 15))}" y2="${H}" stroke="#fff" stroke-opacity="0.05"/>`).join("") +
      Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${f(i * (H / 10))}" x2="${W}" y2="${f(i * (H / 10))}" stroke="#fff" stroke-opacity="0.05"/>`).join("");
    return {
      defs: grad("g1", "#0E1A2B", "#1D3557", [0, 1, 1, 0]),
      body: `<rect width="${W}" height="${H}" fill="url(#g1)"/>${grid}<rect y="${H - band}" width="${W}" height="${band}" fill="#0E1A2B"/>${stripes}` +
        put(sym, P ? { x: W / 2, y: H * 0.3, w: W * 0.8 } : { x: W * 0.77, y: H * 0.45, h: H * 0.82 }) +
        put(word, P ? { x: W / 2, y: H * 0.62, w: W * 0.82 } : { x: W * 0.07, y: H * 0.46, w: W * 0.46, ax: 0 }) +
        put(tag, P ? { x: W / 2, y: H * 0.68, w: W * 0.66 } : { x: W * 0.07, y: H * 0.55, w: W * 0.43, ax: 0, op: 0.85 }),
    };
  },

  /* VOC&S: o & enorme, em degradê, atrás da marca */
  vocs(W, H, P) {
    const { t } = brand("vocs");
    const amp = art("vocs", "symbol", "positive");
    const logo = art("vocs", "lockup", "negative");
    return {
      defs: grad("g1", "#004E88", "#05213A", [0, 0, 1, 1]) + radial("g2", "#FF6D00", 0.22, [0.78, 0.5, 0.5]),
      body: `<rect width="${W}" height="${H}" fill="url(#g1)"/><rect width="${W}" height="${H}" fill="url(#g2)"/>` +
        put(amp, P ? { x: W * 0.62, y: H * 0.27, h: H * 0.62, rot: 0, op: 0.95 } : { x: W * 0.84, y: H * 0.52, h: H * 1.3, op: 0.95 }) +
        put(logo, P ? { x: W / 2, y: H * 0.72, w: W * 0.78 } : { x: W * 0.06, y: H * 0.5, w: W * 0.43, ax: 0 }),
    };
  },

  /* EFPI: o símbolo sobe em degraus, o conhecimento como movimento */
  efpi(W, H, P) {
    const { t } = brand("efpi");
    const sym = art("efpi", "symbol", "negative");
    const logo = art("efpi", "lockup", "negative");
    const n = 6;
    const steps = Array.from({ length: n }, (_, i) => {
      const k = i / (n - 1);
      const size = (P ? H * 0.2 : H * 0.34) * (1 - k * 0.3);
      const x = P ? W * (0.18 + k * 0.7) : W * (0.62 + k * 0.32), y = P ? H * (0.34 - k * 0.2) : H * (0.86 - k * 0.7);
      return put(sym, { x, y, h: size, op: f(0.18 + k * 0.82) });
    }).join("");
    return {
      defs: grad("g1", "#0F1C2E", "#1D3557", [0, 1, 1, 0]) + radial("g2", t.accent, 0.12, [0.9, 0.1, 0.5]),
      body: `<rect width="${W}" height="${H}" fill="url(#g1)"/><rect width="${W}" height="${H}" fill="url(#g2)"/>${steps}` +
        put(logo, P ? { x: W / 2, y: H * 0.72, w: W * 0.74 } : { x: W * 0.07, y: H * 0.5, w: W * 0.46, ax: 0 }),
    };
  },

  /* Débora Sandrin: o D escavado em bordô tom sobre tom e as linhas de uma prancha de arquitetura */
  "debora-sandrin"(W, H, P) {
    const { t } = brand("debora-sandrin");
    const mono = art("debora-sandrin", "symbol", "onPrimary", { "symbol-main": "#4A0F26", "symbol-accent": "#79193E" });
    const logo = art("debora-sandrin", "lockup", "negative");
    const ink = "#F5F0E8";
    const gy = H * 0.8;
    const door = (x, y, r, flip) => `<path d="M${x} ${y}h${flip ? -r : r}M${x} ${y}A${r} ${r} 0 0 ${flip ? 1 : 0} ${x + (flip ? -r : r)} ${y - r}" fill="none" stroke="${ink}" stroke-opacity="0.32" stroke-width="2"/><line x1="${x}" y1="${y}" x2="${x}" y2="${y - r}" stroke="${ink}" stroke-opacity="0.32" stroke-width="2"/>`;
    const lines = `<line x1="0" y1="${gy}" x2="${W}" y2="${gy}" stroke="${ink}" stroke-opacity="0.45" stroke-width="2"/>` +
      Array.from({ length: 5 }, (_, i) => `<line x1="${f(W * (0.1 + i * 0.07))}" y1="${gy}" x2="${f(W * (0.1 + i * 0.07))}" y2="${f(gy + H * 0.04)}" stroke="${ink}" stroke-opacity="0.45" stroke-width="2"/>`).join("") +
      `<line x1="${W * 0.1}" y1="${H * 0.1}" x2="${W * 0.1}" y2="${gy}" stroke="${ink}" stroke-opacity="0.2" stroke-width="1.5"/><line x1="${W * 0.9}" y1="${H * 0.1}" x2="${W * 0.9}" y2="${gy}" stroke="${ink}" stroke-opacity="0.2" stroke-width="1.5"/>` +
      door(W * (P ? 0.1 : 0.12), gy, P ? W * 0.16 : H * 0.16, false);
    return {
      defs: grad("g1", "#79193E", "#5E1230", [0, 0, 1, 1]),
      body: `<rect width="${W}" height="${H}" fill="url(#g1)"/>${lines}` +
        put(mono, P ? { x: W * 0.8, y: H * 0.22, h: H * 0.62 } : { x: W * 0.84, y: H * 0.44, h: H * 1.45 }) +
        put(logo, P ? { x: W / 2, y: H * 0.56, w: W * 0.78 } : { x: W * 0.07, y: H * 0.46, w: W * 0.5, ax: 0 }),
    };
  },

  /* Faggian: linho terracota, o monograma Gi em tom sobre tom e a linha de pesponto que sai do laço */
  faggian(W, H, P) {
    const { t } = brand("faggian");
    const mono = art("faggian", "symbol", "onPrimary", { "symbol-main": "#9A4530", "symbol-accent": "#9A4530" });
    const logo = art("faggian", "lockup", "onPrimary");
    const stitch = (d, o, wdt = 3.2) => `<path d="${d}" fill="none" stroke="#F7F3EC" stroke-opacity="${o}" stroke-width="${wdt}" stroke-linecap="round" stroke-dasharray="${wdt * 5} ${wdt * 4}"/>`;
    const s1 = P ? `M-20 ${H * 0.82}C${W * 0.3} ${H * 0.66} ${W * 0.55} ${H * 0.95} ${W + 20} ${H * 0.72}` : `M-20 ${H * 0.78}C${W * 0.25} ${H * 0.6} ${W * 0.45} ${H * 0.98} ${W * 0.7} ${H * 0.8}S${W * 0.95} ${H * 0.58} ${W + 20} ${H * 0.66}`;
    const s2 = P ? `M-20 ${H * 0.1}C${W * 0.3} ${H * 0.16} ${W * 0.6} ${H * 0.02} ${W + 20} ${H * 0.12}` : `M${W * 0.2} -20C${W * 0.28} ${H * 0.1} ${W * 0.5} ${H * 0.12} ${W * 0.62} -20`;
    return {
      defs: `<pattern id="linen" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0H8M0 4H8" stroke="#fff" stroke-opacity="0.055" stroke-width="1"/><path d="M0 0V8M4 0V8" stroke="#000" stroke-opacity="0.05" stroke-width="1"/></pattern>`,
      body: `<rect width="${W}" height="${H}" fill="${t.primary}"/><rect width="${W}" height="${H}" fill="url(#linen)"/>` +
        put(mono, P ? { x: W * 0.7, y: H * 0.3, h: H * 0.5 } : { x: W * 0.82, y: H * 0.5, h: H * 1.25 }) + stitch(s1, 0.75) + stitch(s2, 0.5, 2.6) +
        put(logo, P ? { x: W / 2, y: H * 0.56, w: W * 0.8 } : { x: W * 0.07, y: H * 0.46, w: W * 0.5, ax: 0 }),
    };
  },

  /* Confraria dos Aromas: ramos que brotam em volta do lettering */
  confraria(W, H, P) {
    const { t } = brand("confraria");
    const logo = art("confraria", "lockup", "negative");
    const R = rng(23);
    // ramo: caule em curva e folhas alternadas, com botões em terracota e ouro nas pontas
    const sprig = (x, y, angle, len, seed, scale = 1) => {
      const r = rng(seed), rad = (angle * Math.PI) / 180, bend = (r() - 0.5) * len * 0.5;
      const ex = x + Math.cos(rad) * len, ey = y + Math.sin(rad) * len;
      const cx = x + Math.cos(rad) * len * 0.5 - Math.sin(rad) * bend, cy = y + Math.sin(rad) * len * 0.5 + Math.cos(rad) * bend;
      const at = (k) => {
        const a = (1 - k) * (1 - k), b = 2 * (1 - k) * k, c = k * k;
        const px = a * x + b * cx + c * ex, py = a * y + b * cy + c * ey;
        const tx = 2 * (1 - k) * (cx - x) + 2 * k * (ex - cx), ty = 2 * (1 - k) * (cy - y) + 2 * k * (ey - cy);
        return { px, py, ang: Math.atan2(ty, tx) };
      };
      const leaves = [];
      const n = Math.round(len / (26 * scale));
      for (let i = 1; i <= n; i++) {
        const k = i / (n + 1), p = at(k), side = i % 2 ? 1 : -1, ll = (24 + r() * 14) * scale * (1.15 - k * 0.5), lw = ll * 0.38;
        const a = p.ang + side * (0.9 + r() * 0.25), lx = p.px + Math.cos(a) * ll, ly = p.py + Math.sin(a) * ll;
        const nx = -Math.sin(a) * lw, ny = Math.cos(a) * lw, mx = (p.px + lx) / 2, my = (p.py + ly) / 2;
        const col = i % 5 === 0 ? t.accent : i % 3 === 0 ? "#A9BCA6" : "#6F9C86";
        leaves.push(`<path d="M${f(p.px)} ${f(p.py)}Q${f(mx + nx)} ${f(my + ny)} ${f(lx)} ${f(ly)}Q${f(mx - nx)} ${f(my - ny)} ${f(p.px)} ${f(p.py)}Z" fill="${col}" fill-opacity="${f(0.55 + r() * 0.35)}"/>`);
      }
      const tip = at(1);
      return `<path d="M${f(x)} ${f(y)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}" fill="none" stroke="#A9BCA6" stroke-opacity="0.7" stroke-width="${f(3 * scale)}" stroke-linecap="round"/>${leaves.join("")}` +
        `<circle cx="${f(tip.px)}" cy="${f(tip.py)}" r="${f(6 * scale)}" fill="${R() > 0.5 ? t.secondary : t.accent}"/>`;
    };
    const sprigs = P
      ? sprig(-20, H * 0.98, -62, H * 0.5, 3, 1.6) + sprig(W * 0.3, H + 20, -80, H * 0.34, 5, 1.3) + sprig(W + 20, H * 0.04, 118, H * 0.42, 8, 1.5) + sprig(W * 0.72, -20, 100, H * 0.28, 12, 1.2)
      : sprig(-20, H * 1.0, -48, H * 0.82, 3, 1.7) + sprig(W * 0.14, H + 20, -70, H * 0.5, 5, 1.4) + sprig(W + 20, H * 0.02, 138, H * 0.78, 8, 1.6) + sprig(W * 0.86, -20, 112, H * 0.46, 12, 1.3);
    return {
      defs: radial("g1", "#0B5A4A", 1, [0.5, 0.5, 0.75]) + radial("g2", t.accent, 0.16, [0.5, 0.5, 0.4]),
      body: `<rect width="${W}" height="${H}" fill="${t.dark}"/><rect width="${W}" height="${H}" fill="url(#g1)"/><rect width="${W}" height="${H}" fill="url(#g2)"/>${sprigs}` +
        put(logo, P ? { x: W / 2, y: H * 0.5, w: W * 0.76 } : { x: W / 2, y: H * 0.5, w: W * 0.5 }),
    };
  },

  /* LifeStyle: o módulo do símbolo vira um mosaico de quadrados, com um canto arredondado aqui e ali */
  lifestyle(W, H, P) {
    const { t } = brand("lifestyle");
    const logo = art("lifestyle", "lockup", "negative");
    const cols = P ? 8 : 12, rows = P ? 12 : 8, cw = W / cols, ch = H / rows;
    const R = rng(5);
    const hole = (c, r) => (P ? c >= 1 && c <= 6 && r >= 4 && r <= 7 : c >= 3 && c <= 8 && r >= 2 && r <= 5);
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const v = R();
      if (hole(c, r) || v < 0.4) continue;
      const fill = v > 0.93 ? t.secondary : v > 0.7 ? "#5D140F" : "#3E0E0A";
      // quadrado com folga entre os vizinhos; alguns ganham um canto arredondado, como no módulo do símbolo
      const x = c * cw + 4, y = r * ch + 4, w = cw - 8, h = ch - 8, rad = R() > 0.7 ? Math.min(w, h) * 0.5 : 0, k = Math.floor(R() * 4);
      const rr = [0, 0, 0, 0];
      rr[k] = rad;
      cells.push(`<path d="M${f(x + rr[0])} ${f(y)}H${f(x + w - rr[1])}${rr[1] ? `A${f(rr[1])} ${f(rr[1])} 0 0 1 ${f(x + w)} ${f(y + rr[1])}` : ""}V${f(y + h - rr[2])}${rr[2] ? `A${f(rr[2])} ${f(rr[2])} 0 0 1 ${f(x + w - rr[2])} ${f(y + h)}` : ""}H${f(x + rr[3])}${rr[3] ? `A${f(rr[3])} ${f(rr[3])} 0 0 1 ${f(x)} ${f(y + h - rr[3])}` : ""}V${f(y + rr[0])}${rr[0] ? `A${f(rr[0])} ${f(rr[0])} 0 0 1 ${f(x + rr[0])} ${f(y)}` : ""}Z" fill="${fill}"/>`);
    }
    return {
      defs: radial("g1", t.secondary, 0.22, [0.5, 0.5, 0.55]),
      body: `<rect width="${W}" height="${H}" fill="${t.dark}"/>${cells.join("")}<rect width="${W}" height="${H}" fill="url(#g1)"/>` +
        put(logo, P ? { x: W / 2, y: H * 0.5, w: W * 0.7 } : { x: W / 2, y: H * 0.5, w: W * 0.46 }),
    };
  },

  /* Grasiê: manchas, confete e estrelinhas em pastel, o G grande e a marca por cima */
  grasie(W, H, P) {
    const { t } = brand("grasie");
    const g = art("grasie", "symbol", "onPrimary", { "symbol-main": "#9C85B2", "symbol-accent": "#93B2A3" });
    const logo = art("grasie", "lockup", "onPrimary");
    const R = rng(31);
    const palette = [t.accent, t.secondary, t.support, "#FBF8F3"];
    const blobs = [
      [W * 0.1, H * 0.92, P ? W * 0.5 : W * 0.26, t.secondary, 4], [W * 0.92, H * 0.1, P ? W * 0.4 : W * 0.2, t.accent, 6],
      [W * 0.94, H * 0.9, P ? W * 0.34 : W * 0.15, t.support, 9], [W * 0.06, H * 0.1, P ? W * 0.26 : W * 0.12, "#B7A5CB", 2],
    ].map(([cx, cy, r, c, s]) => `<path d="${blob(cx, cy, r, s, 0.14, 9)}" fill="${c}"/>`).join("");
    const confetti = Array.from({ length: P ? 26 : 34 }, (_, i) => {
      const x = R() * W, y = R() * H, c = palette[Math.floor(R() * palette.length)], s = 8 + R() * 14, k = Math.floor(R() * 3);
      if (k === 0) return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(s * 0.45)}" fill="${c}" fill-opacity="0.9"/>`;
      if (k === 1) return `<path d="${star4(f(x), f(y), f(s))}" fill="${c}" fill-opacity="0.95"/>`;
      return `<path d="M${f(x - s)} ${f(y)}q${f(s / 2)} ${f(-s / 1.3)} ${f(s)} 0t${f(s)} 0" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`;
    }).join("");
    return {
      defs: "",
      body: `<rect width="${W}" height="${H}" fill="${t.primary}"/>${blobs}${put(g, P ? { x: W * 0.8, y: H * 0.82, h: H * 0.34, rot: 10, op: 0.55 } : { x: W * 0.84, y: H * 0.74, h: H * 0.62, rot: 10, op: 0.55 })}${confetti}` +
        put(logo, P ? { x: W / 2, y: H * 0.46, w: W * 0.74 } : { x: W / 2, y: H * 0.46, w: W * 0.4 }),
    };
  },

  /* EasyWork: painéis de cantos cortados como telas empilhadas e trilhas de circuito */
  easywork(W, H, P) {
    const { t } = brand("easywork");
    const sym = art("easywork", "symbol", "positive");
    const logo = art("easywork", "lockup", "negative");
    const oct = (x, y, w, h, c) => `${f(x + c)},${f(y)} ${f(x + w)},${f(y)} ${f(x + w)},${f(y + h - c)} ${f(x + w - c)},${f(y + h)} ${f(x)},${f(y + h)} ${f(x)},${f(y + c)}`;
    const trace = (pts, o) => `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${t.accent}" stroke-opacity="${o}" stroke-width="2.4" stroke-linejoin="round"/>` +
      `<circle cx="${pts[0][0]}" cy="${pts[0][1]}" r="6" fill="none" stroke="${t.accent}" stroke-opacity="${o}" stroke-width="2.4"/><circle cx="${pts.at(-1)[0]}" cy="${pts.at(-1)[1]}" r="6" fill="${t.accent}" fill-opacity="${o}"/>`;
    const u = Math.min(W, H) / 800;
    return {
      defs: grad("g1", "#01131F", "#022135", [0, 0, 1, 1]),
      body: `<rect width="${W}" height="${H}" fill="url(#g1)"/>` +
        `<polygon points="${oct(P ? W * 0.4 : W * 0.5, P ? H * 0.04 : H * 0.08, P ? W * 0.8 : W * 0.6, P ? H * 0.34 : H * 0.84, 90 * u)}" fill="none" stroke="${t.accent}" stroke-opacity="0.22" stroke-width="2"/>` +
        `<polygon points="${oct(P ? W * 0.3 : W * 0.56, P ? H * 0.1 : H * 0.18, P ? W * 0.8 : W * 0.6, P ? H * 0.34 : H * 0.84, 90 * u)}" fill="#022135" stroke="${t.accent}" stroke-opacity="0.4" stroke-width="2"/>` +
        put(sym, P ? { x: W * 0.74, y: H * 0.28, h: H * 0.34 } : { x: W * 0.8, y: H * 0.54, h: H * 0.8 }) +
        trace(P ? [[40, H * 0.9], [40, H * 0.83], [130, H * 0.74], [130, H * 0.68]] : [[40, H * 0.88], [160, H * 0.88], [220, H * 0.8], [330, H * 0.8]], 0.55) +
        trace(P ? [[W - 60, H * 0.95], [W - 60, H * 0.86], [W - 150, H * 0.78]] : [[W * 0.5, H * 0.96], [W * 0.5, H * 0.9], [W * 0.56, H * 0.84], [W * 0.7, H * 0.84]], 0.35) +
        put(logo, P ? { x: W / 2, y: H * 0.62, w: W * 0.8 } : { x: W * 0.07, y: H * 0.46, w: W * 0.46, ax: 0 }),
    };
  },

  /* Óticas Talarico: o traçado do padrão da marca sobre o azul-marinho, o olho grande e o anel */
  "oticas-talarico"(W, H, P) {
    const { t } = brand("oticas-talarico");
    const eye = art("oticas-talarico", "symbol", "negative");
    const logo = art("oticas-talarico", "lockup", "negative");
    const pubG = path.join(ROOT, "public", "brand", "oticas-talarico", "graphics");
    const pat = fs.readFileSync(path.join(pubG, "padrao-completo.svg"), "utf8");
    const patBody = pat.slice(pat.indexOf(">") + 1, pat.lastIndexOf("</svg>"));
    const size = P ? W * 0.5 : W * 0.34;
    return {
      defs: grad("g1", "#03045E", "#02033F", [0, 0, 1, 1]) +
        `<pattern id="pat" width="${size}" height="${size}" patternUnits="userSpaceOnUse"><svg width="${size}" height="${size}" viewBox="100 240 396 396">${patBody}</svg></pattern>` +
        radial("g2", "#38B6FF", 0.3, [0.8, 0.5, 0.5]),
      body: `<rect width="${W}" height="${H}" fill="url(#g1)"/><rect width="${W}" height="${H}" fill="url(#pat)" opacity="0.4"/><rect width="${W}" height="${H}" fill="url(#g2)"/>` +
        put(eye, P ? { x: W * 0.78, y: H * 0.2, w: W * 1.05, op: 0.95 } : { x: W * 0.9, y: H * 0.52, w: W * 0.6, op: 0.95 }) +
        put(logo, P ? { x: W / 2, y: H * 0.7, w: W * 0.74 } : { x: W * 0.07, y: H * 0.5, w: W * 0.44, ax: 0 }),
    };
  },
};

/* ------------------------------------------------------------------ rodada */
const SIZES = { h: [1200, 800], v: [900, 1200] };
const slugs = args.length ? args : Object.keys(designs);
fs.mkdirSync(OUT, { recursive: true });
const made = [];
for (const slug of slugs) {
  if (!designs[slug]) { console.warn(`sem desenho para "${slug}"`); continue; }
  for (const [key, [W, H]] of Object.entries(SIZES)) {
    const { defs, body } = designs[slug](W, H, H > W);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W * 2}" height="${H * 2}" viewBox="0 0 ${W} ${H}"><defs>${defs}</defs>${body}</svg>`;
    const file = path.join(OUT, key === "v" ? `${slug}-v.png` : `${slug}.png`);
    await sharp(Buffer.from(svg), { density: 72 }).png({ compressionLevel: 9 }).toFile(file);
    made.push(file);
  }
  console.log("capa", slug);
}

// prancha de conferência: horizontais lado a lado e as verticais embaixo
if (sheet) {
  const cols = 4, w = 450, h = 300, vw = 225, vh = 300;
  const comps = [];
  for (let i = 0; i < slugs.length; i++) {
    const hh = path.join(OUT, `${slugs[i]}.png`), vv = path.join(OUT, `${slugs[i]}-v.png`);
    if (!fs.existsSync(hh)) continue;
    const x = (i % cols) * (w + vw + 24), y = Math.floor(i / cols) * (h + 28) + 20;
    comps.push({ input: await sharp(hh).resize(w, h).png().toBuffer(), left: x, top: y });
    comps.push({ input: await sharp(vv).resize(vw, vh).png().toBuffer(), left: x + w + 6, top: y });
    comps.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="18"><text x="0" y="14" font-size="14" fill="#ff5a1f" font-family="Arial">${slugs[i]}</text></svg>`), left: x, top: y - 18 });
  }
  const rows = Math.ceil(slugs.length / cols);
  await sharp({ create: { width: cols * (w + vw + 24), height: rows * (h + 28) + 20, channels: 3, background: "#111" } }).composite(comps).png().toFile(sheet);
}
