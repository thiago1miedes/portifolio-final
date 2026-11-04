// Brincadeiras da home: mesa de projetos, figurinhas, foto que gira, balão e curva de Bézier.
// Carregado só na home (import dinâmico em main.ts), para as páginas de case não baixarem o Draggable.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, DrawSVGPlugin);

const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => Array.from(el.querySelectorAll<T>(s));
const random = gsap.utils.random;
const clamp = gsap.utils.clamp;

/* ------------------------------------------------------------------ figurinhas */
function initStickers() {
  const hero = $("[data-hero]");
  const heroDelay = root.classList.contains("is-arriving") ? 1.5 : 1.1;

  $$("[data-sticker]").forEach((sticker, i) => {
    const inner = $("[data-sticker-in]", sticker)!;
    const inHero = !!hero?.contains(sticker);

    if (!reduce) {
      // saltam para dentro, como se alguém tivesse acabado de colar
      gsap.fromTo(inner, { opacity: 0, scale: 0.2, rotation: -40 }, {
        opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: "back.out(2.4)",
        delay: inHero ? heroDelay + i * 0.09 : random(0, 0.3),
        scrollTrigger: inHero ? undefined : { trigger: sticker, start: "top 92%", once: true },
      });
    }

    if (!finePointer) return;
    const section = sticker.closest("section") ?? undefined;
    Draggable.create(sticker, {
      type: "x,y",
      bounds: section,
      inertia: !reduce,
      edgeResistance: 0.75,
      minimumMovement: 3,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress() { gsap.killTweensOf(sticker); gsap.to(inner, { scale: 1.2, duration: 0.25, ease: "power3.out" }); },
      onRelease() { gsap.to(inner, { scale: 1, duration: 0.9, ease: "elastic.out(1, 0.4)" }); },
      onClick() {
        if (!reduce) gsap.fromTo(inner, { rotation: -22 }, { rotation: 0, duration: 1, ease: "elastic.out(1.2, 0.35)" });
      },
    });
  });

  // cada figurinha do hero responde ao mouse com a sua força (data-depth)
  if (hero && finePointer && !reduce) {
    const layers = $$("[data-sticker][data-depth]", hero).map((s) => {
      const inner = $("[data-sticker-in]", s)!;
      return {
        depth: Number(s.dataset.depth),
        x: gsap.quickTo(inner, "x", { duration: 1, ease: "power3" }),
        y: gsap.quickTo(inner, "y", { duration: 1, ease: "power3" }),
      };
    });
    hero.addEventListener("pointermove", (e) => {
      const dx = e.clientX - innerWidth / 2;
      const dy = e.clientY - innerHeight / 2;
      layers.forEach((l) => { l.x(dx * l.depth); l.y(dy * l.depth); });
    });
    hero.addEventListener("pointerleave", () => layers.forEach((l) => { l.x(0); l.y(0); }));
  }
}

/* ------------------------------------------------------------------ foto do hero: gira pela bolinha e volta ao soltar */
function initAvatar() {
  const tilt = $("[data-avatar-tilt]");
  const handle = $("[data-avatar-rotate]");
  const box = $("[data-selbox]");
  if (!tilt) return;

  if (box && !reduce) {
    gsap.fromTo(box, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out", delay: root.classList.contains("is-arriving") ? 1.5 : 1.1 });
  }
  if (handle && finePointer) {
    const rest = gsap.getProperty(tilt, "rotation") as number;
    Draggable.create(tilt, {
      type: "rotation",
      trigger: handle,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress() { gsap.killTweensOf(tilt); },
      onRelease() { gsap.to(tilt, { rotation: rest, duration: reduce ? 0 : 1.6, ease: "elastic.out(1, 0.4)" }); },
    });
  }
}

/* ------------------------------------------------------------------ balão de fala */
function initSay() {
  const say = $<HTMLButtonElement>("[data-say]");
  if (!say) return;
  const text = $("[data-say-text]", say)!;
  const phrases: string[] = JSON.parse((finePointer ? say.dataset.phrasesMouse : say.dataset.phrases) ?? "[]");
  let cur = 0;
  if (!reduce) {
    gsap.fromTo(say, { opacity: 0, scale: 0.4, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(2.6)", delay: root.classList.contains("is-arriving") ? 1.9 : 1.5 });
  }
  say.addEventListener("click", () => {
    cur = (cur + 1) % phrases.length;
    text.textContent = phrases[cur];
    if (!reduce) gsap.fromTo(say, { scale: 0.86 }, { scale: 1, duration: 0.6, ease: "elastic.out(1.1, 0.45)", clearProps: "scale" });
  });
}

/* ------------------------------------------------------------------ rabisco que se desenha ao entrar na tela */
function initScribbles() {
  if (reduce) return;
  $$("[data-draw]").forEach((svg) => {
    gsap.from($$("path", svg), {
      drawSVG: "0%", duration: 1.1, ease: "power2.inOut", delay: 0.5,
      scrollTrigger: { trigger: svg, start: "top 88%", once: true },
    });
  });
}

/* ------------------------------------------------------------------ curva de Bézier: as duas alças se puxam */
function initBezier() {
  const svg = $<SVGSVGElement>("[data-bezier]");
  if (!svg || !finePointer) return;
  const curve = $<SVGPathElement>("[data-curve]", svg)!;
  const point = (name: string) => $<SVGCircleElement>(`[data-handle="${name}"]`, svg)!;
  const arm = (name: string) => $<SVGLineElement>(`[data-arm="${name}"]`, svg)!;
  const a = point("a");
  const b = point("b");
  const redraw = () => {
    const [ax, ay, bx, by] = [a.cx.baseVal.value, a.cy.baseVal.value, b.cx.baseVal.value, b.cy.baseVal.value];
    curve.setAttribute("d", `M20 96C${ax} ${ay} ${bx} ${by} 400 24`);
    arm("a").setAttribute("x2", String(ax));
    arm("a").setAttribute("y2", String(ay));
    arm("b").setAttribute("x2", String(bx));
    arm("b").setAttribute("y2", String(by));
  };
  [a, b].forEach((h) => {
    h.addEventListener("pointerdown", (e) => {
      h.setPointerCapture(e.pointerId);
      const move = (ev: PointerEvent) => {
        const m = svg.getScreenCTM();
        if (!m) return;
        const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(m.inverse());
        h.setAttribute("cx", String(clamp(-40, 460, p.x)));
        h.setAttribute("cy", String(clamp(-60, 180, p.y)));
        redraw();
      };
      const up = () => { h.removeEventListener("pointermove", move); h.removeEventListener("pointerup", up); h.removeEventListener("pointercancel", up); };
      h.addEventListener("pointermove", move);
      h.addEventListener("pointerup", up);
      h.addEventListener("pointercancel", up);
    });
  });
}

/* ------------------------------------------------------------------ selo que gira */
function initBadge() {
  const badge = $("[data-badge]");
  if (!badge || reduce) return;
  const spin = gsap.to($("svg:not(.icon)", badge), { rotation: 360, duration: 16, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
  badge.addEventListener("pointerenter", () => gsap.to(spin, { timeScale: 4, duration: 0.5 }));
  badge.addEventListener("pointerleave", () => gsap.to(spin, { timeScale: 1, duration: 0.8 }));
}

/* ------------------------------------------------------------------ mesa de projetos */
function initBoard() {
  const board = $("[data-board]");
  if (!board) return;
  const section = board.closest<HTMLElement>("[data-board-section]")!;
  const prints = $$("[data-print]", board);
  const ghost = $("[data-ghost]", board);
  let top = 10;
  const front = (p: HTMLElement) => { p.style.zIndex = String(++top); };

  // a luz da malha segue o mouse
  const mat = $("[data-board-mat]", section);
  if (mat && finePointer && !reduce) {
    section.addEventListener("pointermove", (e) => {
      const r = mat.getBoundingClientRect();
      mat.style.setProperty("--mx", `${e.clientX - r.left}px`);
      mat.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  prints.forEach((p) => {
    p.addEventListener("pointerenter", () => front(p));
    p.addEventListener("focusin", () => front(p));
  });

  // inclinação em 3D seguindo o mouse (no corpo da foto: o quadro externo fica livre para ser arrastado)
  if (finePointer && !reduce) {
    prints.forEach((p) => {
      const body = $("[data-print-body]", p)!;
      gsap.set(body, { transformPerspective: 1000 });
      const rx = gsap.quickTo(body, "rotationX", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(body, "rotationY", { duration: 0.6, ease: "power3" });
      p.addEventListener("pointermove", (e) => {
        if (p.classList.contains("is-dragging")) return;
        const r = p.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 9);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 9);
      });
      p.addEventListener("pointerleave", () => { rx(0); ry(0); });
    });
  }

  let moved = false;
  // quem arrastou não abre o case ao soltar
  board.addEventListener("click", (e) => {
    if (!moved) return;
    e.preventDefault();
    e.stopPropagation();
    moved = false;
  }, true);

  /* cursor "Thiago": depois de distribuir as fotos, arrasta uma delas para mostrar que dá */
  let demo: gsap.core.Timeline | null = null;
  const stopDemo = () => {
    if (!demo || !ghost) return;
    demo.kill();
    demo = null;
    prints.forEach((p) => p.classList.remove("is-dragging"));
    gsap.to(ghost, { opacity: 0, duration: 0.25 });
  };
  const playDemo = () => {
    if (!ghost || !finePointer || reduce || !getComputedStyle(ghost).display || getComputedStyle(ghost).display === "none") return;
    const card = prints[2];
    const start = { x: board.offsetWidth * 0.98, y: card.offsetTop - 60 };
    const grab = { x: card.offsetLeft + card.offsetWidth * 0.55, y: card.offsetTop + card.offsetHeight * 0.55 };
    const by = { x: -board.offsetWidth * 0.015, y: board.offsetWidth * 0.035 };
    demo = gsap.timeline({ delay: 0.5, onComplete: () => { demo = null; } })
      .set(ghost, { x: start.x, y: start.y, opacity: 0 })
      .to(ghost, { opacity: 1, duration: 0.25 })
      .to(ghost, { x: grab.x, y: grab.y, duration: 1, ease: "power2.inOut" }, "<")
      .add(() => { front(card); card.classList.add("is-dragging"); })
      .to(ghost, { scale: 0.88, duration: 0.14 })
      .to(ghost, { x: grab.x + by.x, y: grab.y + by.y, duration: 0.8, ease: "power2.inOut" }, "drag")
      .to(card, { x: `+=${by.x}`, y: `+=${by.y}`, duration: 0.8, ease: "power2.inOut" }, "drag")
      .add(() => card.classList.remove("is-dragging"))
      .to(ghost, { scale: 1, duration: 0.14 })
      .to(ghost, { x: start.x, y: grab.y + by.y + 120, opacity: 0, duration: 0.9, ease: "power2.in" }, "+=0.25");
  };

  /* arrastar e jogar */
  let drags: Draggable[] = [];
  const enableDrag = () => {
    drags = prints.flatMap((p) => Draggable.create(p, {
      type: "x,y",
      bounds: board,
      dragClickables: true,
      inertia: !reduce,
      minimumMovement: 6,
      edgeResistance: 0.8,
      throwResistance: 2400,
      maxDuration: 1.1,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress() { stopDemo(); gsap.killTweensOf(p); front(p); moved = false; },
      onDragStart() { moved = true; p.classList.add("is-dragging"); root.classList.add("is-dragging-print"); },
      onDrag() { p.style.setProperty("--swing", `${clamp(-9, 9, this.deltaX * 0.7)}deg`); },
      onDragEnd() {
        p.classList.remove("is-dragging");
        root.classList.remove("is-dragging-print");
        p.style.setProperty("--swing", "0deg");
        // cai com um ângulo novo, como uma foto solta na mesa
        p.style.setProperty("--r", `${random(-6, 6, 0.1)}deg`);
      },
    }));
  };

  /* embaralhar: cada foto vai para o lugar de outra, com um desvio; o lugar ainda cabe na mesa */
  const shuffleWide = () => {
    const order = gsap.utils.shuffle([...prints]);
    prints.forEach((p, i) => {
      const slot = order[i];
      const left = clamp(0, board.offsetWidth - p.offsetWidth, slot.offsetLeft + (slot.offsetWidth - p.offsetWidth) / 2 + random(-30, 30));
      const up = clamp(0, board.offsetHeight - p.offsetHeight, slot.offsetTop + (slot.offsetHeight - p.offsetHeight) / 2 + random(-30, 30));
      p.style.setProperty("--r", `${random(-6, 6, 0.1)}deg`);
      gsap.killTweensOf(p);
      gsap.to(p, { x: left - p.offsetLeft, y: up - p.offsetTop, duration: reduce ? 0 : 1, ease: "expo.inOut", delay: reduce ? 0 : i * 0.035 });
    });
    gsap.utils.shuffle([...prints]).forEach(front);
  };
  // no celular a ordem da coluna fica: as fotos só trocam de ângulo e dão um pulinho
  const shuffleNarrow = () => {
    prints.forEach((p, i) => {
      p.style.setProperty("--r", `${random(-5, 5, 0.1)}deg`);
      if (!reduce) gsap.fromTo(p, { y: 0 }, { y: -18, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1, delay: i * 0.03 });
    });
  };
  let wide = false;
  $("[data-shuffle]", section)?.addEventListener("click", () => {
    stopDemo();
    if (wide) shuffleWide(); else shuffleNarrow();
  });

  const mm = gsap.matchMedia();
  mm.add({ wide: "(min-width: 900px)", narrow: "(max-width: 899px)" }, (ctx) => {
    wide = !!ctx.conditions?.wide;
    if (wide) {
      if (!reduce) {
        // as fotos saem de uma pilha no meio da mesa e são distribuídas, como cartas
        const cx = board.offsetWidth / 2;
        const cy = board.offsetHeight * 0.36;
        gsap.from(prints, {
          x: (_: number, el: HTMLElement) => cx - (el.offsetLeft + el.offsetWidth / 2),
          y: (_: number, el: HTMLElement) => cy - (el.offsetTop + el.offsetHeight / 2),
          rotation: () => random(-18, 18),
          duration: 1.25,
          ease: "expo.out",
          stagger: { each: 0.07, from: "random" },
          scrollTrigger: { trigger: board, start: "top 72%", once: true },
          onComplete: playDemo,
        });
        // cada foto anda um pouco diferente na rolagem
        prints.forEach((p) => {
          const d = random(16, 46);
          gsap.fromTo($("[data-print-body]", p), { y: d }, { y: -d, ease: "none", scrollTrigger: { trigger: board, start: "top bottom", end: "bottom top", scrub: true } });
        });
      }
      if (finePointer) enableDrag();
    } else if (!reduce) {
      prints.forEach((p, i) => {
        gsap.from(p, {
          x: i % 2 ? 60 : -60, rotation: i % 2 ? 10 : -10, opacity: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: p, start: "top 92%", once: true },
        });
      });
    }
    return () => {
      drags.forEach((d) => d.kill());
      drags = [];
      stopDemo();
      gsap.set(prints, { clearProps: "x,y,rotation,opacity,transform,zIndex" });
    };
  });

  // mudou a largura da janela: os deslocamentos em px perdem o sentido, as fotos voltam ao lugar
  let lastWidth = innerWidth;
  let timer = 0;
  addEventListener("resize", () => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (innerWidth === lastWidth) return;
      lastWidth = innerWidth;
      if (wide) gsap.to(prints, { x: 0, y: 0, duration: reduce ? 0 : 0.6, ease: "power3.inOut", overwrite: true });
    }, 180);
  });
}

initStickers();
initAvatar();
initSay();
initScribbles();
initBezier();
initBadge();
initBoard();
