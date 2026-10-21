// Comportamento do case de marca (components/brand/BrandCase.astro).
// Parâmetros chegam por atributos data-*; a rolagem suave e a troca de página vêm do main.ts.
// Nada aqui usa `once: true`: se a página abre já rolada, um gatilho que se destrói durante a criação
// dos seguintes quebra o ScrollTrigger.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const DESKTOP = "(min-width: 900px)";
const MOBILE = "(max-width: 899px)";
const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => Array.from(el.querySelectorAll<T>(s));

const root = $("[data-brand-case]");
if (root) {
  try {
    setupNav(root);
    setupMockups(root);
    setupSite(root);
    typeGuides(root);
    if (!reduce) {
      reveals(root);
      intro(root);
      symbolPieces(root);
      typeMorph(root);
      manifestoTurn(root);
      colorBlocks(root);
      collage(root);
    }
  } catch (err) {
    // algo falhou: mostra a página inteira, sem animação
    document.documentElement.classList.remove("js");
    console.error(err);
  }
}

/* ------------------------------------------------------------------ navegação: seção ativa, tema e progresso */
function setupNav(root: HTMLElement) {
  const nav = $("[data-bc-nav]", root);
  if (!nav) return;
  const strip = $("[data-bc-nav-links]", nav)!;
  const links = $$<HTMLAnchorElement>("[data-section-link]", nav);
  const mid = () => `${nav.offsetHeight / 2}px`;

  const setActive = (id: string | null) => {
    links.forEach((link) => {
      const on = link.dataset.sectionLink === id;
      if (!on) { link.removeAttribute("aria-current"); return; }
      link.setAttribute("aria-current", "true");
      const left = link.offsetLeft - (strip.clientWidth - link.offsetWidth) / 2;
      strip.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
    });
  };

  $$("[data-bc-section]", root).forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: () => `top ${mid()}`,
      end: () => `bottom ${mid()}`,
      onToggle: (self) => {
        if (!self.isActive) return;
        nav.dataset.theme = section.dataset.theme ?? "dark";
        setActive(links.some((l) => l.dataset.sectionLink === section.id) ? section.id : null);
      },
    });
  });
  // fim numérico além da página: com "max" o fundo sumiria exatamente no fim da rolagem
  ScrollTrigger.create({ start: 40, end: 1e7, onToggle: (self) => nav.classList.toggle("is-solid", self.isActive) });

  const bar = $("[data-bc-progress]", nav);
  if (bar) gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: reduce ? true : 0.3 } });
}

/* ------------------------------------------------------------------ revelações: títulos por palavra e blocos subindo */
function reveals(root: HTMLElement) {
  $$("[data-bc-split]", root).forEach((el) => {
    el.style.opacity = "1";
    SplitText.create(el, {
      type: "lines,words",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit: (self) => gsap.from(self.words, {
        yPercent: 110, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.05,
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
      }),
    });
  });
  const blocks = $$("[data-bc-reveal]", root);
  gsap.set(blocks, { y: 32 });
  ScrollTrigger.batch(blocks, {
    start: "top 92%",
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
  });
}

/* ------------------------------------------------------------------ 1. abertura */
function intro(root: HTMLElement) {
  const section = $("[data-bc-intro]", root);
  const svg = $<SVGSVGElement>("[data-bc-intro-logo]", root);
  const nav = $("[data-bc-nav]", root);
  if (!section || !svg) return;

  const symbol = $<SVGGElement>('[data-layer="symbol"]', svg)!;
  const outline = $<SVGGElement>("[data-intro-outline]", svg)!;
  const fills = $$('[data-layer="symbol"] [data-part]', svg);
  const lines = $$("[data-intro-outline] > *", svg);
  const letters = $$('[data-layer="wordmark"] path', svg);
  const tagline = $$('[data-layer="tagline"] [data-part] > *', svg);
  const shine = $("[data-intro-shine]", svg)!;
  const gradient = $("linearGradient", svg)!;
  const fades = $$("[data-intro-fade]", section);
  const vb = svg.viewBox.baseVal;
  const band = Number(svg.dataset.band) || vb.width * 0.3;

  const showAll = () => {
    gsap.set([...fills, ...letters, ...tagline], { opacity: 1 });
    gsap.set(lines, { opacity: 0 });
    gsap.set(fades, { opacity: 1, y: 0 });
    if (nav) gsap.set(nav, { opacity: 1 });
  };

  // recarregou no meio da página: nada de abertura
  if (window.scrollY > window.innerHeight * 0.4) showAll();
  else {
    // FLIP: o símbolo começa grande no centro da tela e depois encaixa no logo
    const box = symbol.getBoundingClientRect();
    const k = svg.getBoundingClientRect().width / vb.width; // px por unidade do SVG
    const ratio = box.width / box.height;
    const vw = document.documentElement.clientWidth; // innerWidth cresce no celular se algo vazar para o lado
    const target = Math.min(window.innerHeight * 0.54, (vw * 0.8) / ratio);
    const mark = [symbol, outline];
    gsap.set(mark, {
      x: (vw / 2 - (box.left + box.width / 2)) / k,
      y: (window.innerHeight / 2 - (box.top + box.height / 2)) / k,
      scale: Math.max(1, target / box.height),
      transformOrigin: "50% 50%",
    });

    const arriving = document.documentElement.classList.contains("is-arriving");
    const tl = gsap.timeline({ delay: arriving ? 0.6 : 0.25, defaults: { ease: "power3.out" } });
    tl.to(lines, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", stagger: 0.2 })
      .to(fills, { opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.35")
      .to(lines, { opacity: 0, duration: 0.6 }, "<0.3")
      .to(mark, { x: 0, y: 0, scale: 1, duration: 1.25, ease: "expo.inOut" }, "+=0.1")
      .fromTo(letters, { opacity: 0, y: 14 }, { opacity: 0.5, y: 0, duration: 0.8, stagger: 0.07 }, "-=0.55")
      .fromTo(tagline, { opacity: 0 }, { opacity: 0.5, duration: 0.4, stagger: 0.012 }, "-=0.45")
      .set(shine, { opacity: 1 })
      .fromTo(gradient, { attr: { gradientTransform: "translate(0 0)" } }, { attr: { gradientTransform: `translate(${vb.width + band * 1.3} 0)` }, duration: 1.4, ease: "power2.inOut" })
      .to([...letters, ...tagline], { opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.008 }, "<0.3")
      .set(shine, { opacity: 0 })
      .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, "-=0.9");
    if (nav) tl.to(nav, { opacity: 1, duration: 0.6 }, "<");
  }

  // ao rolar, o logo recua e a foto do fundo desce mais devagar
  const inner = $("[data-bc-intro-inner]", section);
  if (inner) gsap.to(inner, { yPercent: -10, scale: 0.94, opacity: 0.2, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } });
  const bg = $("[data-bc-intro-bg]", section);
  if (bg) gsap.to(bg, { yPercent: 14, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } });
}

/* ------------------------------------------------------------------ 2. símbolo: as peças se separam */
function symbolPieces(root: HTMLElement) {
  const section = $("[data-bc-symbol]", root);
  if (!section) return;
  const labels = $$("[data-piece-label]", section);
  gsap.matchMedia().add({ desktop: DESKTOP, mobile: MOBILE }, (ctx) => {
    const desktop = ctx.conditions?.desktop;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: desktop ? "top top" : "top 70%", end: desktop ? "bottom bottom" : "bottom 70%", scrub: 0.6 },
    });
    labels.forEach((label, i) => {
      const piece = $(`[data-piece="${label.dataset.pieceLabel}"]`, section);
      if (piece) tl.fromTo(piece, { y: 0 }, { y: Number(label.dataset.shift) || 0, duration: 1, ease: "power2.inOut" }, 0);
      tl.fromTo(label, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 0.45 + i * 0.15);
    });
    tl.to({}, { duration: 0.6 });
  });
}

/* ------------------------------------------------------------------ 3. tipografia: letra e peso mudam com a rolagem */
function typeMorph(root: HTMLElement) {
  const section = $("[data-bc-type]", root);
  const glyph = section && $("[data-bc-glyph]", section);
  if (!section || !glyph) return;
  const glyphs = (section.dataset.glyphs ?? "").split(",");
  const weights = (section.dataset.weights ?? "").split(",").map(Number);
  const names = (section.dataset.weightNames ?? "").split(",");
  const glyphName = $("[data-bc-glyph-name]", section);
  const weightName = $("[data-bc-weight-name]", section);
  const ticks = $$("[data-weight]", section);
  const steps = glyphs.length * weights.length;
  let current = -1;

  const render = (progress: number) => {
    const i = Math.min(steps - 1, Math.floor(progress * steps));
    if (i === current) return;
    current = i;
    const g = Math.floor(i / weights.length);
    const k = i % weights.length;
    const w = g % 2 === 0 ? k : weights.length - 1 - k; // vai e volta: o peso nunca salta
    glyph.textContent = glyphs[g];
    glyph.style.fontWeight = String(weights[w]);
    if (glyphName) glyphName.textContent = glyphs[g];
    if (weightName) weightName.textContent = names[w] ?? String(weights[w]);
    ticks.forEach((t) => t.classList.toggle("is-active", Number(t.dataset.weight) === weights[w]));
  };

  // carrega todos os pesos antes de precisar deles
  const family = getComputedStyle(glyph).fontFamily;
  weights.forEach((w) => document.fonts?.load(`${w} 100px ${family}`).catch(() => {}));

  gsap.matchMedia().add({ desktop: DESKTOP, mobile: MOBILE }, (ctx) => {
    const desktop = ctx.conditions?.desktop;
    // celular: a letra gruda abaixo da navegação durante o trilho (ver .bc-type-track)
    const stage = $("[data-bc-type-stage]", section)!;
    const top = () => (parseFloat(getComputedStyle(stage).top) || 0);
    ScrollTrigger.create({
      trigger: desktop ? section : $("[data-bc-type-track]", section),
      start: desktop ? "top top" : () => `top ${top()}px`,
      end: desktop ? "bottom bottom" : () => `bottom ${top() + stage.offsetHeight}px`,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });
  });
}

/** Linhas de altura das maiúsculas e de base, medidas na própria fonte. */
function typeGuides(root: HTMLElement) {
  const section = $("[data-bc-type]", root);
  const glyph = section && $("[data-bc-glyph]", section);
  const cap = section && $('[data-bc-guide="cap"]', section);
  const base = section && $('[data-bc-guide="base"]', section);
  if (!glyph || !cap || !base) return;
  const place = () => {
    const style = getComputedStyle(glyph);
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return;
    ctx.font = `700 ${style.fontSize} ${style.fontFamily}`;
    const m = ctx.measureText("H");
    const box = glyph.offsetHeight;
    const baseline = glyph.offsetTop + (box - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent;
    base.style.setProperty("--pos", `${baseline}px`);
    cap.style.setProperty("--pos", `${baseline - m.actualBoundingBoxAscent}px`);
    cap.classList.remove("is-hidden");
    base.classList.remove("is-hidden");
  };
  document.fonts.ready.then(place);
  new ResizeObserver(place).observe(glyph.parentElement!);
}

/* ------------------------------------------------------------------ 4. manifesto: o fundo vira do escuro para o claro */
function manifestoTurn(root: HTMLElement) {
  const section = $("[data-bc-turn]", root);
  if (!section) return;
  const token = (name: string) => getComputedStyle(root).getPropertyValue(name).trim();
  gsap.fromTo(section,
    { backgroundColor: token("--bc-dark"), color: token("--bc-ink-on-dark") },
    { backgroundColor: token("--bc-light"), color: token("--bc-ink-on-light"), ease: "none", scrollTrigger: { trigger: section, start: "top 85%", end: "top 25%", scrub: true } },
  );

  const headline = $("[data-bc-scrub-words]", section);
  if (headline) {
    SplitText.create(headline, {
      type: "words",
      wordsClass: "bc-word",
      onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.16 }, {
        opacity: 1, ease: "none", stagger: 0.12,
        scrollTrigger: { trigger: headline, start: "top 82%", end: "bottom 50%", scrub: true },
      }),
    });
  }

  $$("[data-bc-attr]", section).forEach((attr) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: attr, start: "top 88%", toggleActions: "play none none none" } });
    const line = $(".bc-attr-line", attr);
    if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out" });
    tl.fromTo($$(".bc-attr-num, .bc-attr-word, .bc-attr-text", attr), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.1);
  });
}

/* ------------------------------------------------------------------ 5. cores: os blocos crescem */
function colorBlocks(root: HTMLElement) {
  const section = $("[data-bc-colors]", root);
  if (!section) return;
  const swatches = $$(".bc-swatch", section);
  gsap.matchMedia().add({ desktop: DESKTOP, mobile: MOBILE }, (ctx) => {
    if (ctx.conditions?.desktop) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.5 } });
      swatches.forEach((s, i) => {
        tl.fromTo($(".bc-swatch-fill", s), { scaleY: 0.06 }, { scaleY: 1, duration: 1, ease: "power2.out" }, i * 0.4)
          .fromTo($(".bc-swatch-info", s), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, i * 0.4 + 0.55);
      });
      tl.to({}, { duration: 0.5 });
    } else {
      swatches.forEach((s) => {
        gsap.timeline({ scrollTrigger: { trigger: s, start: "top 92%", end: "top 55%", scrub: 0.5 } })
          .fromTo($(".bc-swatch-fill", s), { scaleX: 0.04 }, { scaleX: 1, ease: "power2.out" })
          .fromTo($(".bc-swatch-info", s), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.5);
      });
    }
  });
}

/* ------------------------------------------------------------------ 7. aplicações: parallax, recortes, faixa e grafismo */
function collage(root: HTMLElement) {
  $$("[data-speed]", root).forEach((el) => {
    const speed = Number(el.dataset.speed) || 0;
    const holder = el.closest(".bc-cell") ?? el.parentElement;
    gsap.fromTo(el, { yPercent: -speed }, { yPercent: speed, ease: "none", scrollTrigger: { trigger: holder, start: "top bottom", end: "bottom top", scrub: true } });
  });
  $$("[data-bc-crop]", root).forEach((svg) => {
    gsap.fromTo(svg, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: svg.parentElement, start: "top bottom", end: "bottom 30%", scrub: true } });
  });
  $$("[data-bc-marquee]", root).forEach((band) => {
    $$("[data-marquee-dir]", band).forEach((row) => {
      const dir = Number(row.dataset.marqueeDir) || 1;
      gsap.fromTo(row, { xPercent: dir > 0 ? -30 : 0 }, { xPercent: dir > 0 ? 0 : -30, ease: "none", scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 0.4 } });
    });
  });
  $$("[data-bc-pattern]", root).forEach((rect) => {
    const shift = Number(rect.dataset.shift) || 0;
    gsap.fromTo(rect, { attr: { y: -shift } }, { attr: { y: 0 }, ease: "none", scrollTrigger: { trigger: rect.closest(".bc-cell"), start: "top bottom", end: "bottom top", scrub: true } });
  });
}

/* ------------------------------------------------------------------ 7b. site: abas, links do print, progresso, mapa e zoom */
function setupSite(root: HTMLElement) {
  const viewer = $("[data-bc-site-viewer]", root);
  if (!viewer) return;
  const tabs = $$<HTMLButtonElement>("[data-bc-site-tab]", viewer);
  const strip = tabs[0]?.parentElement;
  const pages = $$("[data-bc-site-page]", viewer);
  const view = $("[data-bc-site-view]", viewer)!;
  const url = $("[data-bc-site-url]", viewer);
  const bar = $("[data-bc-site-progress]", viewer);
  const zoom = $<HTMLButtonElement>("[data-bc-site-zoom]", viewer);
  const zoomLabel = $("[data-bc-zoom-label]", viewer);
  const map = $("[data-bc-site-map]", viewer);
  const mapPages = $$("[data-bc-site-map-page]", viewer);
  let current = 0;

  const centerX = () => { view.scrollLeft = (view.scrollWidth - view.clientWidth) / 2; };

  /** retângulo da janela sobre a miniatura da página */
  const updateMap = () => {
    const page = mapPages[current];
    const img = page && $("img", page);
    const box = page && $("[data-bc-site-map-view]", page);
    if (!img || !box || !img.offsetHeight || !view.scrollHeight) return;
    const k = img.offsetHeight / view.scrollHeight;
    Object.assign(box.style, {
      left: `${img.offsetLeft}px`,
      width: `${img.offsetWidth}px`,
      top: `${img.offsetTop + view.scrollTop * k}px`,
      height: `${Math.min(img.offsetHeight, view.clientHeight * k)}px`,
    });
  };
  const progress = () => {
    const max = view.scrollHeight - view.clientHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? view.scrollTop / max : 0})`;
    updateMap();
  };

  const select = (k: number) => {
    if (k === current || !pages[k]) return;
    current = k;
    tabs.forEach((t, i) => {
      t.setAttribute("aria-selected", String(i === k));
      t.tabIndex = i === k ? 0 : -1;
    });
    pages.forEach((p, i) => p.classList.toggle("is-hidden", i !== k));
    mapPages.forEach((p, i) => p.classList.toggle("is-hidden", i !== k));
    if (url) url.textContent = pages[k].dataset.url ?? "";
    view.scrollTop = 0;
    centerX();
    progress();
    // só a faixa de abas rola para mostrar a aba ativa (scrollIntoView mexeria na página inteira)
    const tab = tabs[k];
    if (strip && tab) strip.scrollTo({ left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
    if (!reduce) gsap.fromTo(pages[k], { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: "expo.out", clearProps: "opacity,transform" });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const n = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      select(n);
      tabs[n].focus();
    });
  });
  // o menu desenhado no próprio print também troca de página
  $$("[data-bc-site-go]", viewer).forEach((link) => {
    link.addEventListener("click", () => select(Number(link.dataset.bcSiteGo)));
  });

  zoom?.addEventListener("click", () => {
    const max = view.scrollHeight - view.clientHeight;
    const ratio = max > 0 ? view.scrollTop / max : 0;
    const on = !view.classList.contains("is-zoomed");
    view.classList.toggle("is-zoomed", on);
    zoom.setAttribute("aria-pressed", String(on));
    if (zoomLabel) zoomLabel.textContent = (on ? zoomLabel.dataset.on : zoomLabel.dataset.off) ?? "";
    view.scrollTop = ratio * (view.scrollHeight - view.clientHeight);
    centerX();
    progress();
  });

  // arrastar (ou clicar) no mapa leva a janela até aquele ponto da página
  if (map) {
    let dragging = false;
    const jump = (e: PointerEvent, smooth: boolean) => {
      const img = $("img", mapPages[current]);
      if (!img) return;
      const r = img.getBoundingClientRect();
      const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      view.scrollTo({ top: y * view.scrollHeight - view.clientHeight / 2, behavior: smooth && !reduce ? "smooth" : "auto" });
    };
    map.addEventListener("pointerdown", (e) => {
      dragging = true;
      map.setPointerCapture(e.pointerId);
      jump(e, true);
    });
    map.addEventListener("pointermove", (e) => { if (dragging) jump(e, false); });
    map.addEventListener("pointerup", () => { dragging = false; });
    map.addEventListener("pointercancel", () => { dragging = false; });
  }

  view.addEventListener("scroll", progress, { passive: true });
  $$<HTMLImageElement>("img", viewer).forEach((img) => img.addEventListener("load", progress));
  new ResizeObserver(() => { centerX(); progress(); }).observe(view);
  centerX();
  progress();
}

/* ------------------------------------------------------------------ mockups: o SVG real deformado sobre a superfície */
type Point = [number, number];

/** matrix3d que leva uma caixa w×h aos 4 cantos (sup. esq., sup. dir., inf. dir., inf. esq.). */
function quadTransform(w: number, h: number, [[x0, y0], [x1, y1], [x2, y2], [x3, y3]]: Point[]) {
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = den ? (dx3 * dy2 - dx2 * dy3) / den : 0;
  const k = den ? (dx1 * dy3 - dx3 * dy1) / den : 0;
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3;
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3;
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, x0, y0, 0, 1];
  return `matrix3d(${m.map((v) => +v.toFixed(8)).join(",")})`;
}
function dist(p: Point, q: Point) {
  return Math.hypot(q[0] - p[0], q[1] - p[1]);
}

function setupMockups(root: HTMLElement) {
  const editing = new URLSearchParams(location.search).has("pin");
  $$("[data-bc-mockup-frame]", root).forEach((frame) => {
    const overlays = $$(".bc-overlay", frame);
    if (!overlays.length) return;
    const read = (o: HTMLElement): Point[] => {
      const n = (o.dataset.pin ?? "").split(",").map(Number);
      return [0, 1, 2, 3].map((i) => [n[i * 2], n[i * 2 + 1]]);
    };
    const place = () => {
      const W = frame.clientWidth, H = frame.clientHeight;
      overlays.forEach((o) => {
        const quad = read(o).map(([x, y]) => [(x * W) / 100, (y * H) / 100] as Point);
        const w = (dist(quad[0], quad[1]) + dist(quad[3], quad[2])) / 2;
        const h = (dist(quad[0], quad[3]) + dist(quad[1], quad[2])) / 2;
        Object.assign(o.style, { left: "0px", top: "0px", width: `${w}px`, height: `${h}px`, transform: quadTransform(w, h, quad) });
      });
    };
    new ResizeObserver(place).observe(frame);
    place();
    if (editing) pinEditor(frame, overlays, read, place);
  });
}

/** ?pin na URL: arraste os cantos e copie o array para o campo "pin" do mockup no case.json. */
function pinEditor(frame: HTMLElement, overlays: HTMLElement[], read: (o: HTMLElement) => Point[], place: () => void) {
  const out = $("[data-pin-out]", frame);
  const id = frame.closest("[data-bc-mockup]")?.getAttribute("data-image-id") ?? "";
  const print = () => {
    if (out) out.textContent = [id, ...overlays.map((o, k) => `overlay ${k + 1} → "pin": ${JSON.stringify(read(o))}`)].join("\n");
  };
  $$("[data-pin-handle]", frame).forEach((handle) => {
    handle.classList.remove("is-hidden");
    handle.addEventListener("pointerdown", (e) => {
      handle.setPointerCapture(e.pointerId);
      const move = (ev: PointerEvent) => {
        const r = frame.getBoundingClientRect();
        const x = +Math.min(100, Math.max(0, ((ev.clientX - r.left) / r.width) * 100)).toFixed(1);
        const y = +Math.min(100, Math.max(0, ((ev.clientY - r.top) / r.height) * 100)).toFixed(1);
        handle.style.setProperty("--x", String(x));
        handle.style.setProperty("--y", String(y));
        const overlay = overlays[Number(handle.dataset.overlay)];
        const points = read(overlay);
        points[Number(handle.dataset.index)] = [x, y];
        overlay.dataset.pin = points.flat().join(",");
        place();
        print();
      };
      const up = () => {
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", up);
      };
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", up);
    });
  });
  out?.classList.remove("is-hidden");
  print();
}
