import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => Array.from(el.querySelectorAll<T>(s));


/* ------------------------------------------------------------------ scroll suave */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollTo = (target: string | number | HTMLElement, immediate = false) => {
  if (lenis) lenis.scrollTo(target as any, { offset: typeof target === "number" ? 0 : -84, immediate, duration: 1.4 });
  else if (typeof target === "number") window.scrollTo({ top: target });
  else (typeof target === "string" ? $(target) : target)?.scrollIntoView();
};

/* ------------------------------------------------------------------ transição em pixels */
const wipe = $(".px-wipe")!;
const tile = 90;
function buildWipe() {
  const cols = Math.ceil(innerWidth / tile), rows = Math.ceil(innerHeight / tile);
  wipe.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  wipe.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  wipe.innerHTML = "<i></i>".repeat(cols * rows);
  return { cols, rows };
}
let grid = buildWipe();
const tiles = () => $$("i", wipe);

if (root.classList.contains("is-arriving")) {
  gsap.set(tiles(), { scale: 1.02 });
  gsap.to(tiles(), {
    scale: 0, duration: 0.42, ease: "power2.in", delay: 0.05,
    stagger: { grid: [grid.rows, grid.cols], from: "random", amount: 0.45 },
    onComplete: () => root.classList.remove("is-arriving"),
  });
}
try { sessionStorage.removeItem("px-nav"); } catch {}

function isInternal(a: HTMLAnchorElement) {
  if (a.target === "_blank" || a.hasAttribute("download")) return false;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return false;
  if (url.pathname === location.pathname && url.hash) return false;
  if (url.pathname === location.pathname && url.search === location.search) return false;
  return true;
}
document.addEventListener("click", (e) => {
  const a = (e.target as Element).closest?.("a") as HTMLAnchorElement | null;
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const url = new URL(a.href, location.href);
  // âncoras na mesma página → rolagem suave
  if (url.origin === location.origin && url.pathname === location.pathname && url.hash) {
    const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (el) { e.preventDefault(); closeMenu(); scrollTo(el); history.replaceState(null, "", url.hash); }
    return;
  }
  if (reduce || !isInternal(a)) return;
  e.preventDefault();
  closeMenu();
  try { sessionStorage.setItem("px-nav", "1"); } catch {}
  grid = buildWipe();
  const col = Math.floor((e.clientX / innerWidth) * grid.cols), row = Math.floor((e.clientY / innerHeight) * grid.rows);
  gsap.to(tiles(), {
    scale: 1.02, duration: 0.32, ease: "power2.out",
    stagger: { grid: [grid.rows, grid.cols], from: [col, row] as any, amount: 0.38 },
    onComplete: () => { location.href = a.href; },
  });
});
window.addEventListener("pageshow", (e) => {
  if ((e as PageTransitionEvent).persisted) { gsap.set(tiles(), { scale: 0 }); root.classList.remove("is-arriving"); }
});

/* ------------------------------------------------------------------ header */
const header = $("[data-header]");
if (header) {
  let last = 0;
  const onScroll = (y: number) => {
    header.classList.toggle("is-scrolled", y > 20);
    const menuOpen = header.classList.contains("menu-open");
    if (Math.abs(y - last) < 6) return;
    if (!menuOpen) header.classList.toggle("is-hidden", y > last && y > 400);
    last = y;
  };
  if (lenis) lenis.on("scroll", ({ scroll }: any) => onScroll(scroll));
  else addEventListener("scroll", () => onScroll(scrollY), { passive: true });
  onScroll(scrollY);
}

/* ------------------------------------------------------------------ menu mobile */
const burger = $<HTMLButtonElement>("[data-burger]");
const menu = $("[data-menu]");
function openMenu() {
  if (!menu || !burger) return;
  menu.hidden = false;
  header?.classList.add("menu-open");
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", "Fechar menu");
  lenis?.stop();
  gsap.fromTo($$(".menu-link", menu), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "expo.out" });
}
function closeMenu() {
  if (!menu || menu.hidden || !burger) return;
  menu.hidden = true;
  header?.classList.remove("menu-open");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Abrir menu");
  lenis?.start();
}
burger?.addEventListener("click", () => (menu?.hidden ? openMenu() : closeMenu()));
addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

/* ------------------------------------------------------------------ cursor + magnetismo */
if (finePointer && !reduce) {
  const cursor = $(".cursor")!;
  const label = $(".cursor-label", cursor)!;
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
  addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
  document.addEventListener("pointerover", (e) => {
    const t = e.target as Element;
    const view = t.closest?.("[data-cursor='view']") as HTMLElement | null;
    cursor.classList.toggle("is-view", !!view);
    if (view) label.textContent = view.dataset.cursorLabel ?? "Ver case";
    cursor.classList.toggle("is-link", !view && !!t.closest?.("a, button, label, input, select, textarea"));
  });
  document.addEventListener("pointerleave", () => cursor.classList.remove("is-view", "is-link"));
}

/* ------------------------------------------------------------------ títulos divididos (SplitText) */
function splitReveal(el: HTMLElement, opts: { scroll?: boolean; delay?: number } = {}) {
  el.style.visibility = "visible";
  if (reduce) return;
  SplitText.create(el, {
    type: "lines,words",
    mask: "lines",
    linesClass: "split-line",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        yPercent: 115,
        rotate: 4,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.045,
        delay: opts.delay ?? 0,
        scrollTrigger: opts.scroll === false ? undefined : { trigger: el, start: "top 86%", once: true },
      });
    },
  });
}
$$("[data-split]").forEach((el) => splitReveal(el));

/* ------------------------------------------------------------------ revelações ao rolar */
if (!reduce) {
  ScrollTrigger.batch("[data-reveal]:not([data-reveal='clip']):not([data-reveal='up'])", {
    start: "top 90%", once: true,
    onEnter: (b) => gsap.fromTo(b, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
  });
  ScrollTrigger.batch("[data-reveal='up']", {
    start: "top 92%", once: true,
    onEnter: (b) => gsap.fromTo(b, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.1, overwrite: true }),
  });
  ScrollTrigger.batch("[data-reveal='clip']", {
    start: "top 92%", once: true,
    onEnter: (b) => gsap.fromTo(b, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut", stagger: 0.08, overwrite: true }),
  });
}

/* ------------------------------------------------------------------ contadores */
$$("[data-count]").forEach((el) => {
  const end = Number(el.dataset.count);
  if (reduce || !end) return;
  const o = { v: 0 };
  el.textContent = "0";
  gsap.to(o, {
    v: end, duration: 1.8, ease: "power3.out", delay: el.closest("[data-hero]") ? 1.2 : 0,
    onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("pt-BR"); },
    scrollTrigger: el.closest("[data-hero]") ? undefined : { trigger: el, start: "top 90%", once: true },
  });
});

/* ------------------------------------------------------------------ hero */
const hero = $("[data-hero]");
const heroTitle = $("[data-hero-title]");
const heroFades = $$("[data-hero-fade]");
if (heroTitle) {
  const delay = root.classList.contains("is-arriving") ? 0.55 : 0.15;
  splitReveal(heroTitle, { scroll: false, delay });
  if (!reduce) {
    gsap.fromTo(heroFades, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: delay + 0.35 });
    const mark = $(".mark", heroTitle);
    if (mark) gsap.fromTo(mark, { "--mark": 0 }, { "--mark": 1, duration: 0.8, ease: "steps(8)", delay: delay + 0.9 });
  } else heroFades.forEach((el) => (el.style.opacity = "1"));
}

function buildWorld(world: HTMLElement, delay = 0) {
  world.style.visibility = "visible";
  if (reduce) return;
  const tl = gsap.timeline({ delay });
  const snap = (v: string) => `${Math.round(parseFloat(v) / 6) * 6}px`;
  tl.from($$(".pw-back rect, .pw-mid rect", world), { y: 90, duration: 1.1, ease: "power3.out", stagger: { each: 0.004, from: "center" }, modifiers: { y: snap } }, 0)
    .from($$(".pw-col", world), { y: 220, duration: 0.9, ease: "back.out(1.4)", stagger: { each: 0.014, from: "center" }, modifiers: { y: snap } }, 0.15)
    .from($$(".pw-tree", world), { scale: 0, transformOrigin: "50% 100%", duration: 0.7, ease: "back.out(2.2)", stagger: 0.08 }, 0.7)
    .from($$(".pw-tuft", world), { scale: 0, transformOrigin: "50% 100%", duration: 0.4, stagger: { each: 0.01, from: "random" } }, 0.9)
    .from($$(".pw-cloud", world), { opacity: 0, duration: 1.2, stagger: 0.15 }, 0.5)
    .from($$(".pw-float", world), { opacity: 0, scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(3)", stagger: 0.12 }, 1.1);

  // vida no mundo
  $$(".pw-cloud", world).forEach((c, i) => gsap.to(c, { x: `+=${i % 2 ? -90 : 110}`, duration: 16 + i * 4, ease: "sine.inOut", yoyo: true, repeat: -1 }));
  $$(".pw-float", world).forEach((f, i) => gsap.to(f, { y: "-=14", duration: 1.3 + i * 0.2, ease: "steps(4)", yoyo: true, repeat: -1, delay: 1.6 + i * 0.3 }));
  $$(".pw-gem", world).forEach((g) => gsap.to(g, { opacity: 0.45, duration: 0.6, ease: "steps(2)", yoyo: true, repeat: -1, delay: gsap.utils.random(0, 3) }));

  // parallax com o mouse
  if (finePointer) {
    const layers = [
      { el: $(".pw-back", world), d: 6 }, { el: $(".pw-mid", world), d: 12 },
      { el: $(".pw-front", world), d: 20 }, { el: $(".pw-floats", world), d: 34 }, { el: $(".pw-clouds", world), d: 10 },
    ].filter((l) => l.el);
    const qs = layers.map((l) => ({ x: gsap.quickTo(l.el!, "x", { duration: 1.2, ease: "power3" }), d: l.d }));
    const host = world.parentElement!;
    host.addEventListener("pointermove", (e) => {
      const nx = e.clientX / innerWidth - 0.5;
      qs.forEach((q) => q.x(-nx * q.d * 2));
    });
  }
  // afunda levemente ao rolar
  gsap.to(world, { yPercent: 12, ease: "none", scrollTrigger: { trigger: world.parentElement!, start: "top top", end: "bottom top", scrub: true } });
}
$$(".pixel-world").forEach((w) => buildWorld(w, root.classList.contains("is-arriving") ? 0.5 : 0.1));

const heroVisual = $("[data-hero-visual]");
if (heroVisual) {
  heroVisual.style.opacity = "1";
  if (!reduce) {
    gsap.from($(".hv-browser, .hv-phone, .hv-tag", heroVisual), { y: 70, opacity: 0, duration: 2.2, ease: "power3.out", stagger: 0.25, delay: 0.8 });
    if (finePointer) {
      const items = $$("[data-depth]", heroVisual).map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 1, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1, ease: "power3" }),
        d: Number(el.dataset.depth),
      }));
      hero?.addEventListener("pointermove", (e) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        items.forEach((it) => { it.x(nx * it.d); it.y(ny * it.d); });
      });
    }
    gsap.to(heroVisual, { yPercent: -10, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
  }
}

/* ------------------------------------------------------------------ marquee */
$$("[data-marquee]").forEach((track) => {
  if (reduce) return;
  const tw = gsap.to(track, { xPercent: -50, ease: "none", duration: 42, repeat: -1 });
  let dir = 1;
  ScrollTrigger.create({
    onUpdate: (self) => {
      const v = self.getVelocity();
      if (self.direction !== dir) dir = self.direction;
      gsap.to(tw, { timeScale: gsap.utils.clamp(-5, 5, dir * (1 + Math.abs(v) / 400)), duration: 0.2, overwrite: true });
      gsap.to(tw, { timeScale: dir, duration: 1.2, delay: 0.25, overwrite: false });
    },
  });
});

/* ------------------------------------------------------------------ cases empilhados */
// O card anterior recua quando o próximo sobe. O site dentro do card fica parado (só o topo).
const mm = gsap.matchMedia();
const cards = $$("[data-stack-card]");
if (cards.length && !reduce) {
  mm.add("(min-width: 1000px)", () => {
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.94, y: -16, ease: "none",
        scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 96px", scrub: true },
      });
    });
  });
}

/* ------------------------------------------------------------------ grade de projetos (filtro + Flip) */
$$("[data-projects]").forEach((wrap) => {
  const base = Number(wrap.dataset.limit) || 0;
  const limit = base && innerWidth < 640 ? Math.min(base, 6) : base;
  const items = $$<HTMLElement>(".case-card", wrap);
  const buttons = $$<HTMLButtonElement>("[data-filter]", wrap);
  const more = $<HTMLAnchorElement>("[data-more]", wrap);
  const total = Number(wrap.dataset.total) || items.length;

  const apply = (cat: string, animate = true) => {
    const state = animate && !reduce ? Flip.getState(items) : null;
    const before = new Set(items.filter((i) => i.style.display !== "none"));
    let shown = 0, matches = 0;
    items.forEach((it) => {
      const ok = cat === "all" || it.dataset.cats!.split(" ").includes(cat);
      if (ok) matches++;
      const show = ok && (!limit || shown < limit);
      if (show) shown++;
      it.style.display = show ? "" : "none";
    });
    buttons.forEach((b) => {
      const on = b.dataset.filter === cat;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    if (more) {
      const btn = buttons.find((b) => b.dataset.filter === cat);
      const name = btn?.childNodes[0]?.textContent?.trim();
      const all = Number(btn?.dataset.all) || matches;
      more.href = cat === "all" ? "/cases/" : `/cases/?cat=${cat}`;
      more.textContent = cat === "all" ? `Ver todos os ${total} projetos` : `Ver todos de ${name} (${all})`;
    }
    if (state) {
      const now = items.filter((i) => i.style.display !== "none");
      const entering = now.filter((i) => !before.has(i) || i.dataset.revealed !== "1");
      Flip.from(state, {
        targets: now.filter((i) => before.has(i)),
        duration: 0.7, ease: "power3.inOut", absolute: true, stagger: 0.02,
        onComplete: () => ScrollTrigger.refresh(),
      });
      gsap.fromTo(entering, { opacity: 0, y: 40, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out", stagger: 0.05, delay: 0.2, overwrite: true,
        onComplete: () => entering.forEach((e) => (e.dataset.revealed = "1")),
      });
    }
  };

  buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.filter!)));
  const initial = new URLSearchParams(location.search).get("cat");
  apply(initial && buttons.some((b) => b.dataset.filter === initial) ? initial : "all", false);

  const visible = items.filter((i) => i.style.display !== "none");
  if (reduce) gsap.set(items, { opacity: 1 });
  else
    ScrollTrigger.batch(visible, {
      start: "top 94%", once: true,
      onEnter: (b) => { b.forEach((e) => ((e as HTMLElement).dataset.revealed = "1")); gsap.fromTo(b, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.09, overwrite: true }); },
    });
});

/* ------------------------------------------------------------------ processo */
const steps = $("[data-steps]");
if (steps && !reduce) {
  const path = $(".steps-path", steps);
  if (path) gsap.from(path, { scaleX: 0, transformOrigin: "0 50%", ease: "none", scrollTrigger: { trigger: steps, start: "top 80%", end: "top 30%", scrub: true } });
  gsap.from($$("[data-step]", steps), { opacity: 0, y: 50, duration: 1, ease: "expo.out", stagger: 0.15, scrollTrigger: { trigger: steps, start: "top 80%", once: true } });
  gsap.from($$(".step-node i", steps), { scale: 0, rotate: 90, duration: 0.6, ease: "back.out(3)", stagger: 0.2, scrollTrigger: { trigger: steps, start: "top 70%", once: true } });
}

/* ------------------------------------------------------------------ trilho arrastável (Behance) */
$$("[data-rail]").forEach((rail) => {
  let down = false, moved = false, sx = 0, sl = 0;
  rail.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft;
  });
  addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 5) { moved = true; rail.classList.add("is-dragging"); }
    rail.scrollLeft = sl - dx;
  });
  addEventListener("pointerup", () => { down = false; setTimeout(() => rail.classList.remove("is-dragging"), 0); });
  rail.addEventListener("click", (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
  if (!reduce) gsap.from($$("li", rail), { x: 120, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: rail, start: "top 85%", once: true } });
});

/* ------------------------------------------------------------------ formulário de contato */
const form = $<HTMLFormElement>("[data-contact]");
if (form) {
  const status = $("[data-status]", form)!;
  const label = $("[data-label]", form)!;
  const val = (n: string) => ((form.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "").trim();
  const tipo = () => (form.querySelector<HTMLInputElement>("input[name=tipo]:checked")?.value ?? "");
  const setErr = (n: string, bad: boolean) => (form.elements.namedItem(n) as HTMLElement).closest(".f-field")!.classList.toggle("is-invalid", bad);
  const validate = () => {
    const errs = {
      nome: val("nome").length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val("email")),
      mensagem: val("mensagem").length < 5,
    };
    Object.entries(errs).forEach(([k, v]) => setErr(k, v));
    const first = Object.entries(errs).find(([, v]) => v)?.[0];
    if (first) (form.elements.namedItem(first) as HTMLElement).focus();
    return !first;
  };
  form.addEventListener("input", (e) => (e.target as HTMLElement).closest(".f-field")?.classList.remove("is-invalid"));
  const body = () => [
    `Olá, Thiago! Meu nome é ${val("nome")}.`,
    `Tipo de projeto: ${tipo()}`,
    `Investimento previsto: ${val("orcamento")}`,
    val("telefone") && `WhatsApp: ${val("telefone")}`,
    `E-mail: ${val("email")}`,
    "",
    val("mensagem"),
  ].filter((l) => l !== false && l !== undefined).join("\n");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.classList.remove("is-error");
    if (val("_gotcha")) return;
    if (!validate()) { status.textContent = "Confira os campos destacados."; status.classList.add("is-error"); return; }
    const endpoint = form.dataset.endpoint;
    if (endpoint) {
      label.textContent = "Enviando…";
      try {
        const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        status.textContent = "Mensagem enviada! Logo eu respondo — obrigado pelo contato.";
      } catch {
        status.textContent = "Não consegui enviar agora. Tente pelo WhatsApp ou e-mail ao lado.";
        status.classList.add("is-error");
      } finally { label.textContent = "Enviar mensagem"; }
    } else {
      const subject = encodeURIComponent(`Novo projeto — ${tipo()}`);
      location.href = `mailto:${form.dataset.email}?subject=${subject}&body=${encodeURIComponent(body())}`;
      status.textContent = "Abri seu aplicativo de e-mail com a mensagem pronta. Se preferir, use o WhatsApp.";
    }
  });
  $("[data-wa]", form)?.addEventListener("click", () => {
    const text = val("mensagem") || val("nome") ? body() : "Olá, Thiago! Vim pelo seu portfólio e quero conversar sobre um projeto.";
    window.open(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
}

/* ------------------------------------------------------------------ página de case */
const cover = $("[data-cover-scrub]");
if (cover) {
  const img = $<HTMLImageElement>(".browser-shot", cover)!;
  const view = $(".browser-view", cover)!;
  // Sempre chega ao fim do layout. Páginas curtas rolam quase 1:1; as muito longas aceleram só o necessário (máx. 2,2×).
  const dist = () => Math.max(0, img.offsetHeight - view.offsetHeight);
  const speed = () => Math.min(2.2, Math.max(1.1, dist() / (innerHeight * 3)));
  const travel = () => dist();
  const scrollLen = () => travel() / speed();
  const size = () => { cover.style.height = reduce || travel() < 40 ? "auto" : `${Math.round(scrollLen() + innerHeight)}px`; };
  size();
  ScrollTrigger.addEventListener("refreshInit", size);
  if (!img.complete) img.addEventListener("load", () => ScrollTrigger.refresh());
  if (!reduce) {
    gsap.to(img, { y: () => -travel(), ease: "none", scrollTrigger: { trigger: cover, start: "top 92px", end: () => `+=${scrollLen()}`, scrub: 1.2, invalidateOnRefresh: true } });
    gsap.from($(".browser", cover), { scale: 0.9, y: 60, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.5 });
  }
}

// Dentro das janelas (abas de páginas e celulares) a roda do mouse anda menos e com suavidade.
if (!reduce) {
  $$<HTMLElement>(".browser--scroll .browser-view, .phone--scroll .phone-screen").forEach((wrapper) => {
    const content = wrapper.firstElementChild as HTMLElement | null;
    if (!content) return;
    const inner = new Lenis({ wrapper, content, wheelMultiplier: 0.35, lerp: 0.07, smoothWheel: true });
    (wrapper as any).__lenis = inner;
    gsap.ticker.add((t) => inner.raf(t * 1000));
  });
}

$$("[data-parallax]").forEach((img) => {
  if (reduce) return;
  gsap.fromTo(img, { yPercent: -8 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
});

$$("[data-float]").forEach((el) => {
  if (reduce) return;
  const k = Number(el.dataset.float);
  gsap.fromTo(el, { y: 60 + k * 50 }, { y: -40 - k * 40, ease: "none", scrollTrigger: { trigger: el.closest("section"), start: "top bottom", end: "bottom top", scrub: true } });
});

$$("[data-tabs]").forEach((wrap) => {
  const tabs = $$<HTMLButtonElement>("[data-tab]", wrap);
  const panels = $$("[data-panel]", wrap);
  const select = (k: number) => {
    tabs.forEach((t, i) => { t.classList.toggle("is-active", i === k); t.setAttribute("aria-selected", String(i === k)); t.tabIndex = i === k ? 0 : -1; });
    panels.forEach((p, i) => (p.hidden = i !== k));
    const view = $(".browser-view", panels[k]);
    const inner = view && (view as any).__lenis;
    if (inner) inner.scrollTo(0, { immediate: true }); else if (view) view.scrollTop = 0;
    if (!reduce) gsap.fromTo(panels[k], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" });
    tabs[k].scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" });
    ScrollTrigger.refresh();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const n = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      select(n); tabs[n].focus();
    });
  });
});

const dialog = $<HTMLDialogElement>("[data-lightbox-dialog]");
if (dialog) {
  const shots = $$<HTMLButtonElement>("[data-lightbox]");
  const img = $<HTMLImageElement>("[data-lb-img]", dialog)!;
  const count = $("[data-lb-count]", dialog)!;
  let cur = 0;
  const show = (k: number) => {
    cur = (k + shots.length) % shots.length;
    const b = shots[cur];
    img.src = b.dataset.lightbox!;
    img.width = Number(b.dataset.w); img.height = Number(b.dataset.h);
    img.alt = b.querySelector("img")?.alt ?? "";
    count.textContent = `${String(cur + 1).padStart(2, "0")} / ${String(shots.length).padStart(2, "0")}`;
    $(".lb-stage", dialog)!.scrollTop = 0;
    if (!reduce) gsap.fromTo(img, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" });
  };
  shots.forEach((b, k) => b.addEventListener("click", () => { show(k); dialog.showModal(); lenis?.stop(); }));
  $("[data-lb-close]", dialog)!.addEventListener("click", () => dialog.close());
  $("[data-lb-prev]", dialog)!.addEventListener("click", () => show(cur - 1));
  $("[data-lb-next]", dialog)!.addEventListener("click", () => show(cur + 1));
  dialog.addEventListener("close", () => lenis?.start());
  dialog.addEventListener("click", (e) => { if (e.target === dialog || (e.target as Element).classList.contains("lb-stage")) dialog.close(); });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(cur + 1);
    if (e.key === "ArrowLeft") show(cur - 1);
  });
}

/* ------------------------------------------------------------------ utilidades */
$$("[data-to-top]").forEach((b) => b.addEventListener("click", () => scrollTo(0)));

// chegou por link com âncora (ex.: /#contato vindo de outra página)
if (location.hash) {
  const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (el) setTimeout(() => { ScrollTrigger.refresh(); scrollTo(el, true); }, 80);
}

// recalcula posições quando imagens e fontes terminam de carregar
addEventListener("load", () => ScrollTrigger.refresh());
document.fonts?.ready.then(() => ScrollTrigger.refresh());

// tudo certo: desliga a rede de segurança que revelaria o conteúdo sem animação
clearTimeout((window as any).__failsafe);
