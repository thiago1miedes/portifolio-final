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

/* ------------------------------------------------------------------ carrosséis de Instagram (data-carousel) */
// Rolagem nativa com snap; setas, teclado e miniaturas (data-car-go) só levam o trilho até a tela.
// Vídeos tocam apenas na tela ativa e enquanto o post está visível.
$$("[data-carousel]").forEach((root) => {
  const track = $("[data-car-track]", root)!;
  const slides = Array.from(track.children) as HTMLElement[];
  const count = $("[data-car-count]", root)!;
  const prev = $("[data-car-prev]", root)!;
  const next = $("[data-car-next]", root)!;
  const dots = $$("[data-car-dot]", root);
  const thumbs = $$<HTMLButtonElement>("[data-car-go]", root);
  const videos = slides.map((s) => $<HTMLVideoElement>("[data-car-video]", s));
  let cur = 0;
  let visible = false;
  const syncVideos = () => videos.forEach((v, i) => {
    if (!v) return;
    if (i === cur && visible && !reduce) v.play().catch(() => {});
    else v.pause();
  });
  const update = (k: number) => {
    cur = k;
    count.textContent = `${k + 1}/${slides.length}`;
    prev.classList.toggle("is-hidden", k === 0);
    next.classList.toggle("is-hidden", k === slides.length - 1);
    // nos stories, as barras anteriores ficam cheias (is-done)
    dots.forEach((d, i) => { d.classList.toggle("is-active", i === k); d.classList.toggle("is-done", i < k); });
    thumbs.forEach((t, i) => t.classList.toggle("is-active", i === k));
    // no celular a sequência rola de lado: mantém a miniatura ativa à vista (sem mexer na rolagem da página)
    const strip = thumbs[k]?.closest("ol");
    if (strip && strip.scrollWidth > strip.clientWidth) {
      const li = thumbs[k].parentElement!;
      strip.scrollTo({ left: li.offsetLeft - (strip.clientWidth - li.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
    }
    syncVideos();
  };
  const go = (k: number) => {
    const n = Math.max(0, Math.min(slides.length - 1, k));
    track.scrollTo({ left: n * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };
  track.addEventListener("scroll", () => {
    const k = Math.round(track.scrollLeft / track.clientWidth);
    if (k !== cur) update(k);
  }, { passive: true });
  prev.addEventListener("click", () => go(cur - 1));
  next.addEventListener("click", () => go(cur + 1));
  thumbs.forEach((t, i) => t.addEventListener("click", () => go(i)));
  track.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    go(cur + (e.key === "ArrowRight" ? 1 : -1));
  });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; syncVideos(); }, { threshold: 0.4 }).observe(track);
});

/* ------------------------------------------------------------------ perfil de Instagram e faixa de stories (cases de social) */
// "Ver o feed inteiro" mostra os posts além dos primeiros da grade.
$$<HTMLButtonElement>("[data-feed-more]").forEach((btn) => btn.addEventListener("click", () => {
  $$("[data-feed-extra]", btn.parentElement!).forEach((li) => li.classList.remove("is-hidden"));
  btn.classList.add("is-hidden");
  ScrollTrigger.refresh();
}));
// Setas da faixa de stories: rolam quase uma tela de cada vez.
$$("[data-tray]").forEach((root) => {
  const track = $("[data-tray-track]", root)!;
  const by = (dir: number) => track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  $("[data-tray-prev]", root)?.addEventListener("click", () => by(-1));
  $("[data-tray-next]", root)?.addEventListener("click", () => by(1));
});
// Vídeos com data-autoplay tocam (mudos, em loop) só enquanto estão na tela.
$$<HTMLVideoElement>("video[data-autoplay]").forEach((v) => {
  if (reduce) return;
  new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.35 }).observe(v);
});

/* ------------------------------------------------------------------ galerias de marketplace (data-listing) */
// Uma imagem por vez, como na página do produto: miniaturas e legendas (data-listing-go) trocam a imagem do palco.
// Todas as imagens ficam no palco (só a ativa visível), então o lightbox percorre a galeria inteira.
$$("[data-listing]").forEach((root) => {
  const shots = $$("[data-listing-shot]", root);
  const gos = $$<HTMLButtonElement>("[data-listing-go]", root);
  let cur = 0;
  const select = (k: number) => {
    if (k === cur) return;
    cur = k;
    shots.forEach((s, i) => s.classList.toggle("is-hidden", i !== k));
    gos.forEach((g) => {
      const on = Number(g.dataset.listingGo) === k;
      g.classList.toggle("is-active", on);
      g.setAttribute("aria-pressed", String(on));
    });
    if (!reduce) gsap.fromTo(shots[k], { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
  };
  gos.forEach((g) => {
    g.addEventListener("click", () => select(Number(g.dataset.listingGo)));
    // na lateral de miniaturas, passar o mouse já troca a imagem (como nas lojas)
    if (finePointer && g.closest(".lv-rail")) g.addEventListener("pointerenter", () => select(Number(g.dataset.listingGo)));
  });
});

/* ------------------------------------------------------------------ e-book em formato de livro (data-book) */
// As páginas giram em torno da lombada. No modo duplo (computador), a folha j junta a página 2j (frente, à direita)
// e a 2j + 1 (verso, que aparece à esquerda depois de virada); no modo simples (celular), cada página é uma folha.
// O ângulo de cada folha (0 = deitada à direita, -180 = virada) é o único estado visual: transformação, luz,
// empilhamento e o deslocamento do livro fechado saem dele. `pos` é a posição lógica: folhas viradas no modo
// duplo, página aberta no simples. Arrastar, tocar, setas, controle deslizante e sumário só mudam `pos`.
$$("[data-book]").forEach((bk) => {
  const stage = $("[data-book-stage]", bk)!;
  const bookEl = $("[data-book-book]", bk)!;
  const pages = $$("[data-book-page]", bk);
  const imgs = pages.map((p) => $<HTMLImageElement>("img", p)!);
  const shades = pages.map((p) => $(".bk-shade", p)!);
  const baseL = $('[data-book-base="l"]', bk)!;
  const baseR = $('[data-book-base="r"]', bk)!;
  const count = $("[data-book-count]", bk)!;
  const chapter = $("[data-book-chapter]", bk)!;
  const range = $<HTMLInputElement>("[data-book-range]", bk)!;
  const prevs = $$<HTMLButtonElement>("[data-book-prev]", bk);
  const nexts = $$<HTMLButtonElement>("[data-book-next]", bk);
  const tocToggle = $<HTMLButtonElement>("[data-book-toc-toggle]", bk)!;
  const toc = $("[data-book-toc]", bk)!;
  const tocItems = $$<HTMLButtonElement>("[data-book-go]", toc);
  const full = $<HTMLButtonElement>("[data-book-full]", bk)!;
  const N = pages.length;
  const mq = window.matchMedia("(max-width: 759px)");

  type Leaf = { a: number; to: number; tween?: gsap.core.Tween };
  let single = mq.matches;
  let leaves: Leaf[] = [];
  let pos = 0;
  let persp = 2000;
  let spine = 0.25; // posição da lombada no palco (0 a 1); com o livro fechado na capa, fica a um quarto
  let peek = -1;

  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const maxPos = () => (single ? N - 1 : Math.floor(N / 2));
  const pagesOf = (j: number) => (single ? [j] : [2 * j, 2 * j + 1].filter((i) => i < N));
  // páginas à vista (no modo duplo: o verso da folha anterior e a frente da atual)
  const shown = () => (single ? [pos] : [2 * pos - 1, 2 * pos].filter((i) => i >= 0 && i < N));
  const rest = (j: number) => (j < pos ? -180 : 0);

  const paint = (j: number) => {
    const a = leaves[j].a;
    // à direita, as primeiras folhas ficam por cima; à esquerda, as últimas viradas
    const z = single ? N - j : a > -90 ? 2 * N - j : N + j;
    const light = (Math.abs(Math.sin((a * Math.PI) / 180)) * 0.55).toFixed(3);
    for (const i of pagesOf(j)) {
      const back = !single && i % 2 === 1;
      // no modo simples a perspectiva fica centrada na página; no duplo, na lombada (a origem da página)
      pages[i].style.transform = single
        ? `translateX(50%) perspective(${persp}px) translateX(-50%) rotateY(${a}deg)`
        : `perspective(${persp}px) rotateY(${a}deg)${back ? " translateX(100%) rotateY(180deg)" : ""}`;
      pages[i].style.zIndex = String(z);
      shades[i].style.opacity = light;
    }
  };

  // deslocamento do livro fechado (capa ou última página sozinha ficam no centro) e espessura do miolo
  const frame = () => {
    const turned = leaves.filter((l) => l.a <= -90).length;
    const open = leaves.length - turned;
    if (!single) {
      const first = -leaves[0].a / 180;
      const last = N % 2 === 0 ? -leaves[leaves.length - 1].a / 180 : 0;
      const shift = -25 * (1 - first) + 25 * last;
      spine = 0.5 + shift / 100;
      bookEl.style.transform = `translateX(${shift.toFixed(3)}%)`;
      baseL.style.opacity = turned ? "1" : "0";
      baseL.style.setProperty("--thick", `${((turned / leaves.length) * 6).toFixed(2)}px`);
    } else {
      bookEl.style.transform = "";
    }
    baseR.style.opacity = open ? "1" : "0";
    baseR.style.setProperty("--thick", `${((open / leaves.length) * 6).toFixed(2)}px`);
  };

  // só as folhas perto da página aberta (ou em movimento) ficam visíveis
  const setShown = (j: number, on: boolean) => pagesOf(j).forEach((i) => (pages[i].style.visibility = on ? "" : "hidden"));
  const cull = () => leaves.forEach((l, j) => setShown(j, !!l.tween || Math.abs(j - pos) <= 2));

  const load = (from: number, to: number) => {
    for (let i = Math.max(0, from); i <= Math.min(N - 1, to); i++) {
      const src = imgs[i].dataset.src;
      if (src && !imgs[i].getAttribute("src")) imgs[i].src = src;
    }
  };
  const preload = () => {
    const first = shown()[0];
    load(first - 3, first + 6);
  };

  const turn = (j: number, to: number, duration = 0.9, delay = 0, ease = "power2.inOut") => {
    const leaf = leaves[j];
    leaf.tween?.kill();
    leaf.tween = undefined;
    leaf.to = to;
    if (reduce || duration === 0) { leaf.a = to; paint(j); frame(); cull(); return; }
    setShown(j, true);
    leaf.tween = gsap.to(leaf, {
      a: to, duration, delay, ease,
      onUpdate: () => { paint(j); frame(); },
      onComplete: () => { leaf.tween = undefined; if (!leaves.some((l) => l.tween)) cull(); },
    });
  };

  const sync = () => {
    const v = shown();
    // o capítulo é o da página da direita (onde um capítulo novo costuma abrir)
    const ch = pages[v[v.length - 1]].dataset.chapter ?? "";
    count.textContent = `${v.map((i) => i + 1).join("–")} / ${N}`;
    chapter.textContent = ch;
    range.max = String(maxPos());
    range.value = String(pos);
    range.style.setProperty("--fill", `${(pos / maxPos()) * 100}%`);
    prevs.forEach((b) => (b.disabled = pos === 0));
    nexts.forEach((b) => (b.disabled = pos === maxPos()));
    tocItems.forEach((t) => t.classList.toggle("is-active", pages[Number(t.dataset.bookGo)].dataset.chapter === ch));
  };

  // leva as folhas até `target`: indo para frente, viram da primeira para a última; voltando, ao contrário
  // (saltos longos folheiam o livro com um pequeno intervalo entre as folhas)
  const goTo = (target: number) => {
    const from = pos;
    pos = clamp(Math.round(target), 0, maxPos());
    peek = -1;
    const list = leaves.map((_, j) => j).filter((j) => leaves[j].to !== rest(j));
    if (pos < from) list.reverse();
    const many = list.length > 1;
    if (list.length <= 6) list.forEach((j) => pagesOf(j).forEach((i) => load(i, i)));
    list.forEach((j, k) => turn(j, rest(j), many ? 0.75 : 0.9, k * (many ? Math.min(0.1, 0.9 / list.length) : 0)));
    preload();
    sync();
  };
  const goToPage = (i: number) => goTo(single ? i : Math.ceil(i / 2));

  const measure = () => {
    const w = stage.clientWidth;
    persp = Math.round((single ? w : w / 2) * 5);
  };
  const build = () => {
    leaves.forEach((l) => l.tween?.kill());
    leaves = Array.from({ length: single ? N : Math.ceil(N / 2) }, (_, j) => ({ a: rest(j), to: rest(j) }));
    bk.classList.toggle("is-single", single);
    measure();
    leaves.forEach((_, j) => paint(j));
    frame();
    cull();
    preload();
    sync();
  };

  // celular <-> computador: continua na mesma página
  mq.addEventListener("change", () => {
    const first = shown()[0];
    single = mq.matches;
    pos = single ? first : Math.ceil(first / 2);
    build();
  });
  new ResizeObserver(() => { measure(); leaves.forEach((_, j) => paint(j)); }).observe(stage);

  /* arrastar a página (mouse ou dedo); um toque sem arraste vira para o lado tocado */
  let drag: { id: number; x0: number; right: boolean; on: boolean; j: number; dir: 1 | -1; from: number; w: number; vx: number; lx: number; lt: number } | null = null;
  stage.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    // um arraste que perdeu o "soltar" (ex.: outro dedo) volta para o lugar antes de começar o novo
    if (drag) release(new PointerEvent("pointercancel", { pointerId: drag.id }), true);
    const r = stage.getBoundingClientRect();
    drag = {
      id: e.pointerId, x0: e.clientX, right: (e.clientX - r.left) / r.width > spine, on: false, j: -1, dir: 1, from: 0,
      w: single ? r.width : r.width / 2, vx: 0, lx: e.clientX, lt: e.timeStamp,
    };
  });
  stage.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return hover(e);
    const dx = e.clientX - drag.x0;
    if (!drag.on) {
      if (Math.abs(dx) < 8) return;
      const dir = dx < 0 ? 1 : -1; // para a esquerda, avança
      const j = dir === 1 ? pos : pos - 1;
      // no modo duplo, avança quem pega a página da direita e volta quem pega a da esquerda
      if ((!single && (dir === 1) !== drag.right) || (dir === 1 ? pos >= maxPos() : pos <= 0)) { drag = null; return; }
      drag.on = true; drag.dir = dir; drag.j = j;
      leaves[j].tween?.kill();
      leaves[j].tween = undefined;
      drag.from = leaves[j].a;
      peek = -1;
      setShown(j, true);
      pagesOf(j).forEach((i) => load(i - 1, i + 1));
      try { stage.setPointerCapture(e.pointerId); } catch {}
    }
    const p = clamp((drag.dir === 1 ? -dx : dx) / (drag.w * (single ? 1 : 1.3)), 0, 1);
    const leaf = leaves[drag.j];
    leaf.a = drag.from + ((drag.dir === 1 ? -180 : 0) - drag.from) * p;
    leaf.to = leaf.a;
    paint(drag.j);
    frame();
    const dt = e.timeStamp - drag.lt;
    if (dt > 0) drag.vx = (e.clientX - drag.lx) / dt;
    drag.lx = e.clientX; drag.lt = e.timeStamp;
  });
  const release = (e: PointerEvent, cancel: boolean) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    if (!d.on) {
      if (cancel) return;
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      goTo(pos + ((single ? x > 1 / 3 : x > spine) ? 1 : -1));
      return;
    }
    const leaf = leaves[d.j];
    const p = Math.abs(leaf.a - d.from) / Math.max(1, Math.abs((d.dir === 1 ? -180 : 0) - d.from));
    const flick = d.dir === 1 ? d.vx < -0.4 : d.vx > 0.4;
    if (!cancel && (p > 0.35 || flick)) pos += d.dir;
    const to = rest(d.j);
    turn(d.j, to, 0.2 + 0.6 * (Math.abs(to - leaf.a) / 180), 0, "power2.out");
    preload();
    sync();
  };
  stage.addEventListener("pointerup", (e) => release(e, false));
  stage.addEventListener("pointercancel", (e) => release(e, true));

  // com o mouse na borda de fora de uma página, ela levanta um pouco (convite para virar)
  const unpeek = () => {
    if (peek < 0) return;
    const j = peek;
    peek = -1;
    if (leaves[j]) turn(j, rest(j), 0.4, 0, "power2.out");
  };
  const hover = (e: PointerEvent) => {
    if (!finePointer || reduce || e.pointerType !== "mouse") return;
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    let j = -1, a = 0;
    if (single) { if (x > 0.86 && pos < maxPos()) { j = pos; a = -10; } }
    else if (x > spine + 0.43 && x < spine + 0.5 && pos < maxPos()) { j = pos; a = -12; }
    else if (x < spine - 0.43 && x > spine - 0.5 && pos > 0) { j = pos - 1; a = -168; }
    if (j === peek) return;
    unpeek();
    if (j >= 0 && !leaves[j].tween) { peek = j; turn(j, a, 0.45, 0, "power2.out"); }
  };
  stage.addEventListener("pointerleave", unpeek);

  prevs.forEach((b) => b.addEventListener("click", () => goTo(pos - 1)));
  nexts.forEach((b) => b.addEventListener("click", () => goTo(pos + 1)));
  range.addEventListener("input", () => goTo(Number(range.value)));

  // setas do teclado enquanto o livro está à vista (ou em tela cheia)
  let inView = false;
  new IntersectionObserver(([en]) => (inView = en.intersectionRatio > 0.45), { threshold: [0, 0.45, 1] }).observe(stage);
  const dialog = $<HTMLDialogElement>("[data-lightbox-dialog]");
  window.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    if (!(inView || document.fullscreenElement === bk) || dialog?.open) return;
    const t = e.target instanceof Element ? e.target : null;
    if (t?.closest("input, textarea, select, [contenteditable]")) return;
    e.preventDefault();
    goTo(pos + (e.key === "ArrowRight" ? 1 : -1));
  });

  // sumário (pop-up da barra)
  const closeToc = () => { tocToggle.setAttribute("aria-expanded", "false"); toc.classList.add("is-hidden"); };
  tocToggle.addEventListener("click", () => {
    const open = tocToggle.getAttribute("aria-expanded") !== "true";
    tocToggle.setAttribute("aria-expanded", String(open));
    toc.classList.toggle("is-hidden", !open);
    if (open && !reduce) gsap.fromTo(toc, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" });
  });
  document.addEventListener("click", (e) => {
    const t = e.target as Node;
    if (!toc.contains(t) && !tocToggle.contains(t)) closeToc();
  });
  toc.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeToc(); tocToggle.focus(); } });

  // capítulos e recortes (no sumário ou fora do leitor) abrem o livro na página; de fora, a página rola até ele
  $$<HTMLButtonElement>("[data-book-go]").forEach((b) => b.addEventListener("click", () => {
    const i = Number(b.dataset.bookGo);
    closeToc();
    if (bk.contains(b)) return goToPage(i);
    scrollTo(bk);
    setTimeout(() => goToPage(i), reduce ? 0 : 900);
  }));

  // Ampliar abre a página no lightbox; ao fechar, o livro vai para a última página vista lá
  let seen = -1;
  $("[data-book-zoom]", bk)!.addEventListener("click", () => $<HTMLButtonElement>(`[data-book-zoom-page="${shown()[0]}"]`, bk)?.click());
  bk.addEventListener("lightbox:show", (e) => { seen = Number((e.target as HTMLElement).dataset.bookZoomPage); });
  dialog?.addEventListener("close", () => { if (seen >= 0) { goToPage(seen); seen = -1; } });

  // tela cheia
  if (!document.fullscreenEnabled) full.classList.add("is-hidden");
  full.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else bk.requestFullscreen().catch(() => {});
  });
  document.addEventListener("fullscreenchange", () => {
    const on = document.fullscreenElement === bk;
    full.setAttribute("aria-pressed", String(on));
    full.setAttribute("aria-label", on ? "Sair da tela cheia" : "Tela cheia");
    if (on) lenis?.stop();
    else lenis?.start();
  });

  build();
});

// capa dos cases de social: o emblema entra girando e os ladrilhos descem devagar com a rolagem
const scWall = $("[data-sc-wall]");
if (scWall && !reduce) {
  gsap.from($("[data-sc-emblem]", scWall), { scale: 0.7, rotate: -25, opacity: 0, duration: 1.4, ease: "expo.out", delay: root.classList.contains("is-arriving") ? 0.6 : 0.35 });
  gsap.fromTo(scWall, { backgroundPosition: "50% 0px" }, { backgroundPosition: "50% -140px", ease: "none", scrollTrigger: { trigger: scWall, start: "top bottom", end: "bottom top", scrub: true } });
}

const dialog = $<HTMLDialogElement>("[data-lightbox-dialog]");
if (dialog) {
  // Com data-lb-group, as setas percorrem só as telas do mesmo grupo (ex.: um carrossel).
  const all = $$<HTMLButtonElement>("[data-lightbox]");
  const img = $<HTMLImageElement>("[data-lb-img]", dialog)!;
  const video = $<HTMLVideoElement>("[data-lb-video]", dialog)!;
  const count = $("[data-lb-count]", dialog)!;
  let shots = all;
  let cur = 0;
  const show = (k: number) => {
    cur = (k + shots.length) % shots.length;
    const b = shots[cur];
    // itens de vídeo trazem o pôster em data-poster e o mp4 em data-lightbox
    const isVideo = b.dataset.poster !== undefined;
    img.classList.toggle("is-hidden", isVideo);
    video.classList.toggle("is-hidden", !isVideo);
    if (isVideo) {
      video.poster = b.dataset.poster!;
      video.src = b.dataset.lightbox!;
      video.width = Number(b.dataset.w); video.height = Number(b.dataset.h);
      video.setAttribute("aria-label", b.getAttribute("aria-label") ?? "");
      video.play().catch(() => {});
    } else {
      video.pause();
      video.removeAttribute("src");
      img.src = b.dataset.lightbox!;
      img.width = Number(b.dataset.w); img.height = Number(b.dataset.h);
      img.alt = b.querySelector("img")?.alt ?? b.getAttribute("aria-label") ?? "";
    }
    count.textContent = `${String(cur + 1).padStart(2, "0")} / ${String(shots.length).padStart(2, "0")}`;
    const stage = $(".lb-stage", dialog)!;
    stage.scrollTop = 0;
    // telas de carrossel cabem inteiras na altura; páginas de site continuam rolando dentro do lightbox;
    // páginas de e-book (data-lb-read) ficam na largura de leitura e rolam
    const read = b.dataset.lbRead !== undefined;
    stage.classList.toggle("is-fit", b.dataset.lbGroup !== undefined && !read);
    stage.classList.toggle("is-read", read);
    // avisa quem abriu (o leitor do e-book volta para a última página vista)
    b.dispatchEvent(new CustomEvent("lightbox:show", { bubbles: true }));
    if (!reduce) gsap.fromTo(isVideo ? video : img, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" });
  };
  all.forEach((b) => b.addEventListener("click", () => {
    const group = b.dataset.lbGroup;
    shots = all.filter((x) => x.dataset.lbGroup === group);
    show(shots.indexOf(b));
    dialog.showModal();
    lenis?.stop();
  }));
  $("[data-lb-close]", dialog)!.addEventListener("click", () => dialog.close());
  $("[data-lb-prev]", dialog)!.addEventListener("click", () => show(cur - 1));
  $("[data-lb-next]", dialog)!.addEventListener("click", () => show(cur + 1));
  dialog.addEventListener("close", () => { video.pause(); lenis?.start(); });
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
