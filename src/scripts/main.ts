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

/* ------------------------------------------------------------------ scroll suave (Lenis + ScrollTrigger) */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollTo = (target: number | HTMLElement, immediate = false) => {
  if (lenis) lenis.scrollTo(target as any, { offset: typeof target === "number" ? 0 : -90, immediate, duration: 1.4 });
  else if (typeof target === "number") window.scrollTo({ top: target });
  else target.scrollIntoView();
};

// Recalcula as posições depois de abrir/fechar painéis (debounce simples).
let refreshTimer = 0;
const refreshSoon = () => { clearTimeout(refreshTimer); refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120); };

/* ------------------------------------------------------------------ painéis com display:none + altura animada */
// O estado oculto é sempre a classe .is-hidden (display:none). A altura só é animada na entrada/saída.
function showPanel(panel: HTMLElement) {
  panel.classList.remove("is-hidden");
  if (!reduce) gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.55, ease: "power3.out", clearProps: "height,opacity", onComplete: refreshSoon });
  else refreshSoon();
}
function hidePanel(panel: HTMLElement) {
  if (panel.classList.contains("is-hidden")) return;
  if (reduce) { panel.classList.add("is-hidden"); refreshSoon(); return; }
  gsap.to(panel, {
    height: 0, opacity: 0, duration: 0.4, ease: "power3.inOut",
    onComplete: () => { panel.classList.add("is-hidden"); gsap.set(panel, { clearProps: "height,opacity" }); refreshSoon(); },
  });
}

/* ------------------------------------------------------------------ transição entre páginas (cortina laranja) */
const wipe = $(".page-wipe");
if (wipe && root.classList.contains("is-arriving")) {
  gsap.fromTo(wipe, { scaleY: 1, transformOrigin: "50% 0%" }, {
    scaleY: 0, duration: 0.7, ease: "expo.inOut", delay: 0.05,
    onComplete: () => { root.classList.remove("is-arriving"); gsap.set(wipe, { clearProps: "all" }); },
  });
}
try { sessionStorage.removeItem("page-wipe"); } catch {}

function isInternal(a: HTMLAnchorElement) {
  if (a.target === "_blank" || a.hasAttribute("download")) return false;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return false;
  if (url.pathname === location.pathname) return false;
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
  if (reduce || !wipe || !isInternal(a)) return;
  e.preventDefault();
  closeMenu();
  try { sessionStorage.setItem("page-wipe", "1"); } catch {}
  gsap.fromTo(wipe, { scaleY: 0, transformOrigin: "50% 100%" }, {
    scaleY: 1, duration: 0.55, ease: "expo.inOut",
    onComplete: () => { location.href = a.href; },
  });
});
window.addEventListener("pageshow", (e) => {
  if ((e as PageTransitionEvent).persisted && wipe) { gsap.set(wipe, { clearProps: "all" }); root.classList.remove("is-arriving"); }
});

/* ------------------------------------------------------------------ navbar: encolhe ao rolar + link ativo */
const navEl = $("[data-nav]");
if (navEl) {
  const onScroll = (y: number) => navEl.classList.toggle("is-scrolled", y > 40);
  if (lenis) lenis.on("scroll", ({ scroll }: any) => onScroll(scroll));
  else addEventListener("scroll", () => onScroll(scrollY), { passive: true });
  onScroll(scrollY);

  $$<HTMLAnchorElement>("[data-nav-link]", navEl).forEach((link) => {
    const section = document.getElementById(link.dataset.navLink!);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section, start: "top 50%", end: "bottom 50%",
      onToggle: (self) => {
        link.classList.toggle("is-active", self.isActive);
        if (self.isActive) link.setAttribute("aria-current", "true"); else link.removeAttribute("aria-current");
      },
    });
  });
}

/* ------------------------------------------------------------------ menu mobile (data-menu-toggle) */
const menuToggle = $<HTMLButtonElement>("[data-menu-toggle]");
const menuPanel = $("[data-menu-panel]");
function openMenu() {
  if (!menuPanel || !menuToggle) return;
  menuPanel.classList.remove("is-hidden");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Fechar menu");
  lenis?.stop();
  if (!reduce) {
    gsap.fromTo(menuPanel, { opacity: 0, y: -12, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "expo.out" });
    gsap.fromTo($$(".panel-link", menuPanel), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.6, ease: "expo.out" });
  }
}
function closeMenu() {
  if (!menuPanel || !menuToggle || menuPanel.classList.contains("is-hidden")) return;
  menuPanel.classList.add("is-hidden");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  lenis?.start();
}
menuToggle?.addEventListener("click", () => (menuPanel?.classList.contains("is-hidden") ? openMenu() : closeMenu()));
$$("[data-menu-link]").forEach((l) => l.addEventListener("click", closeMenu));
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuPanel && !menuPanel.classList.contains("is-hidden")) { closeMenu(); menuToggle?.focus(); }
});
document.addEventListener("click", (e) => {
  if (navEl && menuPanel && !menuPanel.classList.contains("is-hidden") && !navEl.contains(e.target as Node)) closeMenu();
});
matchMedia("(min-width: 900px)").addEventListener("change", (e) => { if (e.matches) closeMenu(); });

/* ------------------------------------------------------------------ cursor "Ver" nos projetos */
if (finePointer && !reduce) {
  const cursor = $(".cursor")!;
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });
  addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
  document.addEventListener("pointerover", (e) => {
    cursor.classList.toggle("is-view", !!(e.target as Element).closest?.("[data-cursor='view']"));
  });
  document.addEventListener("pointerleave", () => cursor.classList.remove("is-view"));
}

/* ------------------------------------------------------------------ títulos: revelação por palavra, a palavra laranja por último */
function splitReveal(el: HTMLElement, opts: { scroll?: boolean; delay?: number } = {}) {
  el.style.opacity = "1";
  if (reduce) return;
  SplitText.create(el, {
    type: "lines,words",
    mask: "lines",
    linesClass: "split-line",
    autoSplit: true,
    onSplit(self) {
      const words = self.words as HTMLElement[];
      const accent = words.filter((w) => w.closest("em"));
      const rest = words.filter((w) => !accent.includes(w));
      const tl = gsap.timeline({
        delay: opts.delay ?? 0,
        scrollTrigger: opts.scroll === false ? undefined : { trigger: el, start: "top 88%", once: true },
      });
      tl.from(rest, { yPercent: 110, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.05 })
        .from(accent, { yPercent: 110, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.05 }, rest.length ? "-=0.6" : 0);
      return tl;
    },
  });
}
$$("[data-split]").forEach((el) => splitReveal(el));

/* ------------------------------------------------------------------ revelações ao rolar */
if (!reduce) {
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 90%", once: true,
    onEnter: (b) => gsap.fromTo(b, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
  });
}

/* ------------------------------------------------------------------ hero */
const hero = $("[data-hero]");
if (hero) {
  const lines = $$("[data-hero-line]", hero);
  const fades = $$("[data-hero-fade]", hero);
  const avatar = $("[data-hero-avatar]", hero);
  const delay = root.classList.contains("is-arriving") ? 0.5 : 0.1;

  if (reduce) fades.forEach((el) => (el.style.opacity = "1"));
  else {
    // espera a fonte condensada para não animar com a fonte reserva
    const fontReady = Promise.race([document.fonts?.load("1em Anton") ?? Promise.resolve(), new Promise((r) => setTimeout(r, 900))]);
    gsap.set(lines, { yPercent: 105 });
    if (avatar) gsap.set(avatar, { opacity: 0, y: 80 });
    fontReady.then(() => {
      const tl = gsap.timeline({ delay });
      tl.to(lines, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.12 })
        .to(avatar, { opacity: 1, y: 0, duration: 1.4, ease: "expo.out" }, 0.35)
        .fromTo(fades, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.1 }, 0.6);
    });

    // parallax sutil do avatar: mouse (força em data-parallax) + rolagem
    const img = $<HTMLElement>("[data-parallax]", hero);
    if (img) {
      const strength = Number(img.dataset.parallax) || 0.04;
      if (finePointer) {
        const xTo = gsap.quickTo(img, "x", { duration: 1.2, ease: "power3" });
        const yTo = gsap.quickTo(img, "y", { duration: 1.2, ease: "power3" });
        hero.addEventListener("pointermove", (e) => {
          xTo((e.clientX - innerWidth / 2) * strength);
          yTo((e.clientY - innerHeight / 2) * strength);
        });
        hero.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
      }
      gsap.to(avatar, { yPercent: 10, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
    }
    // o título se afasta um pouco mais devagar que a página
    gsap.to($(".hero-title", hero), { yPercent: 18, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
  }
}

/* ------------------------------------------------------------------ projetos: parallax leve na imagem */
if (!reduce) {
  $$("[data-project-img]").forEach((img) => {
    gsap.fromTo(img, { yPercent: -2.5 }, {
      yPercent: 2.5, ease: "none",
      scrollTrigger: { trigger: img.closest("[data-project]"), start: "top bottom", end: "bottom top", scrub: true },
    });
  });
}

/* ------------------------------------------------------------------ serviços: só um aberto por vez (data-service-index) */
$$("[data-services]").forEach((list) => {
  const triggers = $$<HTMLButtonElement>("[data-service-index]", list);
  const select = (index: number) => {
    triggers.forEach((t) => {
      const item = t.closest<HTMLElement>("[data-service]")!;
      const panel = document.getElementById(t.getAttribute("aria-controls")!)!;
      const open = Number(t.dataset.serviceIndex) === index;
      const wasOpen = t.getAttribute("aria-expanded") === "true";
      t.setAttribute("aria-expanded", String(open));
      item.classList.toggle("is-active", open);
      if (open && !wasOpen) showPanel(panel);
      if (!open && wasOpen) hidePanel(panel);
    });
  };
  triggers.forEach((t) => t.addEventListener("click", () => {
    const index = Number(t.dataset.serviceIndex);
    // clicar no aberto mantém ele aberto (sempre há um card laranja)
    if (t.getAttribute("aria-expanded") !== "true") select(index);
  }));
});

/* ------------------------------------------------------------------ FAQ: só um aberto por vez (data-faq-index) */
$$("[data-faq]").forEach((list) => {
  const triggers = $$<HTMLButtonElement>("[data-faq-index]", list);
  triggers.forEach((t) => t.addEventListener("click", () => {
    const index = Number(t.dataset.faqIndex);
    const willOpen = t.getAttribute("aria-expanded") !== "true";
    triggers.forEach((other) => {
      const open = willOpen && Number(other.dataset.faqIndex) === index;
      const wasOpen = other.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(other.getAttribute("aria-controls")!)!;
      other.setAttribute("aria-expanded", String(open));
      other.closest("[data-faq-item]")!.classList.toggle("is-open", open);
      if (open && !wasOpen) showPanel(panel);
      if (!open && wasOpen) hidePanel(panel);
    });
  }));
});

/* ------------------------------------------------------------------ "Ver tudo" da trajetória (data-open) */
$$<HTMLButtonElement>("[data-open]").forEach((btn) => {
  const list = document.getElementById(btn.getAttribute("aria-controls")!);
  const label = $("[data-open-label]", btn);
  if (!list) return;
  const extras = $$("[data-timeline-extra]", list);
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Ver menos" : "Ver tudo";
    extras.forEach((el) => el.classList.toggle("is-hidden", !open));
    if (open && !reduce) gsap.fromTo(extras, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.06 });
    refreshSoon();
  });
});

/* ------------------------------------------------------------------ retrato do "Sobre": sobe devagar */
const portrait = $("[data-portrait]");
if (portrait && !reduce) {
  gsap.fromTo(portrait, { yPercent: 8 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: portrait.parentElement, start: "top bottom", end: "center center", scrub: true } });
}

/* ------------------------------------------------------------------ rodapé: letras do nome sobem ao entrar na tela */
const footerName = $("[data-footer-name]");
if (footerName && !reduce) {
  gsap.from($$("[data-letter]", footerName), {
    yPercent: 60, duration: 1.3, ease: "expo.out", stagger: 0.07,
    scrollTrigger: { trigger: footerName, start: "top 98%", once: true },
  });
}

/* ------------------------------------------------------------------ página de todos os projetos (filtro + Flip) */
// Cada card é revelado uma única vez (data-revealed). Os gatilhos de rolagem não usam `once`:
// assim um card escondido pelo filtro continua com gatilho válido e nunca anima de novo depois de visto.
$$("[data-projects]").forEach((wrap) => {
  const items = $$<HTMLElement>(".case-card", wrap);
  const buttons = $$<HTMLButtonElement>("[data-filter]", wrap);
  const shown = () => items.filter((i) => !i.classList.contains("is-hidden"));

  const reveal = (els: HTMLElement[], delay = 0) => {
    const fresh = els.filter((e) => e.dataset.revealed !== "1" && !e.classList.contains("is-hidden"));
    if (!fresh.length) return;
    fresh.forEach((e) => (e.dataset.revealed = "1"));
    // os que já ficaram acima da tela (ex.: recarregar no meio da lista) aparecem sem animação
    const above = fresh.filter((e) => e.getBoundingClientRect().bottom < 0);
    gsap.set(reduce ? fresh : above, { opacity: 1, y: 0 });
    if (reduce || above.length === fresh.length) return;
    gsap.fromTo(fresh.filter((e) => !above.includes(e)),{ opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07, delay, overwrite: true });
  };

  const apply = (cat: string, animate = true) => {
    const before = new Set(shown());
    const state = animate && !reduce ? Flip.getState([...before]) : null;
    items.forEach((it) => it.classList.toggle("is-hidden", !(cat === "all" || it.dataset.cats!.split(" ").includes(cat))));
    buttons.forEach((b) => {
      const on = b.dataset.filter === cat;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    const now = shown();
    // quem volta a aparecer entra animado se estiver na tela; o resto espera a rolagem
    now.filter((i) => !before.has(i)).forEach((i) => {
      i.dataset.revealed = "0";
      gsap.set(i, { opacity: 0, y: 0 });
    });
    if (state) {
      const stay = now.filter((i) => before.has(i));
      const onScreen = now.filter((i) => i.getBoundingClientRect().top < innerHeight);
      // as posições dos gatilhos só valem depois que o Flip devolve os cards ao fluxo do grid
      if (stay.length) Flip.from(state, { targets: stay, duration: 0.7, ease: "power3.inOut", absolute: true, stagger: 0.02, onComplete: () => ScrollTrigger.refresh() });
      else ScrollTrigger.refresh();
      reveal(onScreen, 0.25);
      // se o filtro foi trocado com a lista já rolada, volta para o topo dela
      if (wrap.getBoundingClientRect().top < 0) scrollTo(wrap);
    }
    const url = new URL(location.href);
    if (cat === "all") url.searchParams.delete("cat"); else url.searchParams.set("cat", cat);
    if (animate) history.replaceState(null, "", url);
  };

  buttons.forEach((b) => b.addEventListener("click", () => { if (!b.classList.contains("is-active")) apply(b.dataset.filter!); }));
  const initial = new URLSearchParams(location.search).get("cat");
  apply(initial && buttons.some((b) => b.dataset.filter === initial) ? initial : "all", false);

  if (reduce) gsap.set(items, { opacity: 1 });
  else ScrollTrigger.batch(items, { start: "top 92%", onEnter: (b) => reveal(b as HTMLElement[]) });
  // revela juntos (com stagger) os que já estão na primeira dobra
  if (!reduce) reveal(shown().filter((i) => i.getBoundingClientRect().top < innerHeight * 0.92),root.classList.contains("is-arriving") ? 0.5 : 0.15);
});

/* ------------------------------------------------------------------ página de case */
// Títulos grandes das páginas internas (sem SplitText: as linhas sobem inteiras)
$$("[data-page-title]").forEach((el) => {
  el.style.opacity = "1";
  if (reduce) return;
  gsap.from(el, { yPercent: 30, opacity: 0, duration: 1.2, ease: "expo.out", delay: root.classList.contains("is-arriving") ? 0.45 : 0.1 });
});
$$("[data-hero-fade]").forEach((el) => {
  if (hero?.contains(el)) return;
  el.style.opacity = "1";
  if (!reduce) gsap.from(el, { opacity: 0, y: 24, duration: 1, ease: "expo.out", delay: root.classList.contains("is-arriving") ? 0.6 : 0.3 });
});

const cover = $("[data-cover-scrub]");
if (cover) {
  const img = $<HTMLImageElement>(".browser-shot", cover)!;
  const view = $(".browser-view", cover)!;
  // Sempre chega ao fim do layout. Páginas curtas rolam quase 1:1; as muito longas aceleram só o necessário (máx. 2,2×).
  const dist = () => Math.max(0, img.offsetHeight - view.offsetHeight);
  const speed = () => Math.min(2.2, Math.max(1.1, dist() / (innerHeight * 3)));
  const scrollLen = () => dist() / speed();
  const size = () => { cover.style.height = reduce || dist() < 40 ? "auto" : `${Math.round(scrollLen() + innerHeight)}px`; };
  size();
  ScrollTrigger.addEventListener("refreshInit", size);
  if (!img.complete) img.addEventListener("load", () => ScrollTrigger.refresh());
  if (!reduce) {
    gsap.to(img, { y: () => -dist(), ease: "none", scrollTrigger: { trigger: cover, start: "top 92px", end: () => `+=${scrollLen()}`, scrub: 1.2, invalidateOnRefresh: true } });
    gsap.from($(".browser", cover), { scale: 0.92, y: 60, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.5 });
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

$$("[data-parallax-img]").forEach((img) => {
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
    panels.forEach((p, i) => p.classList.toggle("is-hidden", i !== k));
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
