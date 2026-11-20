import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { answer, MAIN_OPTIONS, type LogiReply } from "./answers";
import "./logi.css";

/**
 * Logi, Logisaar's plush site companion (art in /public/logi; licence and attribution: THIRD_PARTY_NOTICES.md).
 *
 * Tour: every element with data-logi="tip" is a stop. When scrolling settles, the stop that holds the middle of the
 * viewport becomes active; Logi walks (GSAP arc, body tilt, squash on landing) to a perch beside that section's
 * heading, then shows the tip. Scrolling back walks it back. It never follows the cursor.
 *
 * States (data-state on #logi, animated in logi.css): idle, walking, talking, thinking, happy, sleeping, dragging.
 * Routes: stays mounted, walks off the edge on navigation and walks back in with a page greeting.
 * Reduced motion: parked bottom-right, no tour, no loops; still visible, clickable and chat works.
 */

const MARGIN = 16;
const TOP_SAFE = 124; // keep clear of the navbar capsule
const SLEEP_MS = 25000;
// Logi's size is CSS (clamp, rem based); read the rendered width so all pixel maths follow it
const sizeNow = () => document.getElementById("logi")?.offsetWidth || 96;

const PAGE_GREETING: Record<string, string> = {
  "/": "Hi! I'm Logi. I'll walk you through Logisaar.",
  "/careers": "We're hiring! Want help applying?",
  "/ikuro": "IKURO helps students decide better.",
  "/heylane": "HeyLane is made by Logisaar too.",
  "/solutions": "Pick a solution and I'll explain it.",
  "/contact": "WhatsApp is the fastest way to reach the team.",
};
const DEFAULT_GREETING = "Hi! I'm Logi. Click me if you need help.";

interface ChatMsg { id: number; who: "bot" | "me"; text: string; link?: LogiReply["link"] }

type Pt = { x: number; y: number };
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

/** Visible rect of an element's text (headings are block-wide, so measure the text itself). */
const textRect = (el: Element): DOMRect => {
  const r = document.createRange();
  r.selectNodeContents(el);
  const rects = [...r.getClientRects()];
  if (!rects.length) return el.getBoundingClientRect();
  const left = Math.min(...rects.map((q) => q.left)), right = Math.max(...rects.map((q) => q.right));
  const top = Math.min(...rects.map((q) => q.top)), bottom = Math.max(...rects.map((q) => q.bottom));
  return new DOMRect(left, top, right - left, bottom - top);
};

const AVOID = "button, a[href], input, textarea, select, h1, h2, h3, label, [data-logi-avoid]";
const overlaps = (a: Pt, size: number, r: DOMRect, pad = 6) =>
  a.x < r.right + pad && a.x + size > r.left - pad && a.y < r.bottom + pad && a.y + size > r.top - pad;

const Logi = () => {
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLButtonElement>(null);
  const flipRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLElement>(null);
  const idRef = useRef(0);

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [quick, setQuick] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");

  // engine state (not React state: read every frame)
  const S = useRef({
    x: 0, y: 0,            // rendered position (viewport px, top-left of the box)
    arc: 0,                // hop height while walking
    sx: 1, sy: 1,          // squash and stretch
    rot: 0, rotT: 0,       // body tilt (current, target)
    face: 1,               // 1 or -1 (horizontal flip)
    dragVx: 0,
    walking: false, drag: false, sleeping: false, talk: false, thinking: false, happyUntil: 0,
    open: false, away: true, ready: false, reduce: false,
    dragOff: [0, 0] as number[],
    stopEl: null as Element | null,
    userMoved: false,
    lastScroll: performance.now(),
    tipAt: {} as Record<string, number>,
    tipCleared: false,
    walk: null as gsap.core.Tween | null,
  });
  const api = useRef({
    say: (_t: string, _ms?: number) => {},
    evaluate: (_force?: boolean) => {},
    enterPage: (_first: boolean) => {},
    leavePage: () => {},
    happy: () => {},
    sync: () => {},
  });

  // ── chat ──────────────────────────────────────────────────────────────
  const botSay = useCallback((reply: LogiReply) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: ++idRef.current, who: "bot", text: reply.text, link: reply.link }]);
      setQuick(reply.quick ?? []);
    }, S.current.reduce ? 0 : 650);
  }, []);
  const userSay = useCallback((text: string) => {
    setMsgs((m) => [...m, { id: ++idRef.current, who: "me", text }]);
    setQuick([]);
    botSay(answer(text));
  }, [botSay]);

  const toggleChat = useCallback((force?: boolean) => {
    const st = S.current;
    const next = force === undefined ? !st.open : force;
    st.open = next;
    setOpen(next);
    if (next) {
      rootRef.current?.classList.remove("talk");
      st.talk = false; st.sleeping = false; st.lastScroll = performance.now();
      api.current.happy();
      setMsgs((m) => (m.length ? m : [{ id: ++idRef.current, who: "bot", text: "Hi! I'm Logi. I live on this website and help visitors find their way." }]));
    } else {
      bodyRef.current?.focus({ preventScroll: true });
      window.setTimeout(() => api.current.evaluate(true), 400); // resume the tour
    }
    api.current.sync();
  }, []);

  const askedRef = useRef(false);
  useEffect(() => {
    if (!open) return;
    if (!askedRef.current) { askedRef.current = true; botSay({ text: "What brings you here today?", quick: MAIN_OPTIONS }); }
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
    return () => window.clearTimeout(t);
  }, [open, botSay]);
  useEffect(() => { const el = logRef.current; if (el) el.scrollTop = el.scrollHeight; }, [msgs, typing]);
  useEffect(() => { S.current.thinking = typing; api.current.sync(); }, [typing]);
  // a closed chat must not be reachable by keyboard or screen reader
  useEffect(() => { if (chatRef.current) (chatRef.current as HTMLElement & { inert: boolean }).inert = !open; }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") toggleChat(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggleChat]);

  // ── engine ────────────────────────────────────────────────────────────
  useEffect(() => {
    const root = rootRef.current!, body = bodyRef.current!, flip = flipRef.current!, bubble = bubbleRef.current!;
    const st = S.current;
    st.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const corner = (): Pt => { const s = sizeNow(); return { x: innerWidth - s - MARGIN, y: innerHeight - s - MARGIN }; };
    const offRight = (y: number): Pt => ({ x: innerWidth + sizeNow(), y });

    const place = () => {
      root.style.transform = `translate3d(${Math.round(st.x)}px,${Math.round(st.y - st.arc)}px,0)`;
      root.style.setProperty("--lift", String(Math.round(st.arc)));
      body.style.transform = `rotate(${st.rot.toFixed(2)}deg) scale(${st.sx.toFixed(3)},${st.sy.toFixed(3)})`;
      flip.style.transform = `scaleX(${st.face})`;
    };

    // one data-state at a time, in priority order
    const sync = () => {
      const now = performance.now();
      const state = st.drag ? "dragging"
        : st.sleeping ? "sleeping"
        : st.walking ? "walking"
        : st.thinking ? "thinking"
        : now < st.happyUntil ? "happy"
        : st.talk ? "talking"
        : "idle";
      if (root.dataset.state !== state) root.dataset.state = state;
    };
    api.current.sync = sync;
    api.current.happy = () => {
      if (st.reduce) return;
      st.happyUntil = performance.now() + 750;
      sync();
      window.setTimeout(sync, 780);
    };

    // speech bubble
    let bubbleT = 0;
    const say = (text: string, ms = 4000) => {
      if (st.open || !text) return;
      st.tipCleared = false;
      bubble.textContent = text;
      root.classList.add("talk");
      st.talk = true; sync();
      window.clearTimeout(bubbleT);
      bubbleT = window.setTimeout(() => { root.classList.remove("talk"); st.talk = false; sync(); }, ms);
    };
    api.current.say = say;
    const placeBubble = () => {
      if (!root.classList.contains("talk")) return;
      const s = sizeNow(), bw = bubble.offsetWidth, cx = st.x + s / 2;
      const lft = clamp(cx - bw / 2, 8, innerWidth - bw - 8);
      bubble.style.left = lft - st.x + "px";
      bubble.style.setProperty("--tail", cx - lft + "px");
      root.classList.toggle("below", st.y < 170);
    };

    const wake = () => {
      st.lastScroll = performance.now();
      if (st.sleeping) { st.sleeping = false; sync(); api.current.happy(); }
    };

    // ── perch spot beside a section's heading, kept clear of interactive elements ──
    const perchFor = (section: Element | null): Pt => {
      const s = sizeNow(), c = corner();
      const head = section ? section.querySelector("h1, h2, [data-logi-anchor]") : null;
      const cands: Pt[] = [];
      if (head && innerWidth >= 768) {
        const t = textRect(head);
        if (t.bottom > TOP_SAFE - 20 && t.top < innerHeight - s) {
          const y = clamp(t.top + t.height / 2 - s / 2, TOP_SAFE, innerHeight - s - MARGIN);
          const x = clamp(t.right + 20, MARGIN, innerWidth - s - MARGIN);
          cands.push({ x, y }, { x, y: clamp(y + s + 8, TOP_SAFE, innerHeight - s - MARGIN) }, { x, y: clamp(y - s - 8, TOP_SAFE, innerHeight - s - MARGIN) });
        }
      }
      cands.push(c, { x: c.x, y: clamp(innerHeight * 0.55, TOP_SAFE, c.y) }, { x: c.x, y: clamp(innerHeight * 0.35, TOP_SAFE, c.y) });
      // crowded layouts (narrow phones, full-width headings): peek in from the right edge, about 40% tucked off screen
      const peekX = innerWidth - s * 0.62; // at least 44px stays on screen to tap
      for (const f of [1, 0.75, 0.55, 0.35]) cands.push({ x: peekX, y: clamp(innerHeight * f - s, TOP_SAFE, c.y) });
      // last resort on a very small screen: tuck into the bottom-right corner, mostly off screen
      cands.push({ x: peekX, y: innerHeight - s * 0.35 });
      const rects = [...document.querySelectorAll(AVOID)]
        .filter((e) => !root.contains(e) && !e.closest(".logi-chat") && !e.closest("nav, header, [data-agentation-root], [data-feedback-toolbar]"))
        .map((e) => ({ r: /^(H[1-3]|P)$/.test(e.tagName) ? textRect(e) : e.getBoundingClientRect(), text: /^(H[1-3]|P)$/.test(e.tagName) }))
        .filter(({ r, text }) => r.width > 0 && r.bottom > 0 && r.top < innerHeight && (text || r.width * r.height < 60000)) // ignore whole-card links
        .map(({ r }) => r);
      let best = cands[0], bestN = Infinity;
      for (const c0 of cands) {
        const n = rects.filter((r) => overlaps(c0, s, r)).length;
        if (n < bestN) { best = c0; bestN = n; if (n === 0) break; }
      }
      return best;
    };

    // face the page content when perched: content is toward the middle of the screen
    const faceContent = () => { st.face = st.x + sizeNow() / 2 > innerWidth / 2 ? -1 : 1; };

    // ── walking ──
    const walkTo = (to: Pt, onDone?: () => void, from?: Pt) => {
      st.walk?.kill();
      if (from) { st.x = from.x; st.y = from.y; }
      if (st.reduce) { st.x = to.x; st.y = to.y; faceContent(); place(); onDone?.(); return; }
      const dist = Math.hypot(to.x - st.x, to.y - st.y);
      const dur = clamp(0.9 + dist / 1800, 0.9, 1.4);
      const hopH = clamp(dist / 8, 22, 60);
      const dir = to.x >= st.x ? 1 : -1;
      const p = { t: 0 };
      const sx0 = st.x, sy0 = st.y;
      st.walking = true; st.face = dir; st.rotT = dir * 6; sync();
      st.walk = gsap.to(p, {
        t: 1, duration: dur, ease: "power2.inOut",
        onUpdate: () => {
          st.x = sx0 + (to.x - sx0) * p.t;
          st.y = sy0 + (to.y - sy0) * p.t;
          st.arc = Math.sin(p.t * Math.PI) * hopH;
        },
        onComplete: () => {
          st.arc = 0; st.walking = false; st.rotT = 0; faceContent(); sync();
          gsap.timeline()
            .to(st, { sx: 1.06, sy: 0.94, duration: 0.12, ease: "power2.out" })
            .to(st, { sx: 1, sy: 1, duration: 0.5, ease: "elastic.out(1.1,0.4)" });
          onDone?.();
        },
      });
    };

    // ── tour ──
    // tour stops carry data-logi="tip"; the hero carries data-logi-dock (no tip): Logi waits in the corner there
    const stops = (): Element[] => [...document.querySelectorAll("[data-logi], [data-logi-dock]")];
    const isMobile = () => !matchMedia("(min-width: 48em)").matches;
    const activeStop = (): Element | null => {
      const mid = innerHeight * 0.5;
      let best: Element | null = null, bestScore = -1;
      for (const el of stops()) {
        const r = el.getBoundingClientRect();
        if (r.height < 60 || r.bottom < 0 || r.top > innerHeight) continue;
        const vis = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
        const score = (r.top <= mid && r.bottom >= mid ? 1e6 : 0) + vis;
        if (score > bestScore) { bestScore = score; best = el; }
      }
      return best;
    };
    const evaluate = (force = false) => {
      if (st.reduce || st.open || st.drag || st.away || !st.ready) return;
      const el = activeStop();
      if (!el) return;
      const changed = el !== st.stopEl;
      if (!changed && !force) return;
      st.stopEl = el; st.userMoved = false;
      wake();
      const tip = (el as HTMLElement).dataset.logi || "";
      const isDock = el.hasAttribute("data-logi-dock");
      // the tip always comes from the CURRENT stop, and only if the user has not scrolled on since
      const announce = () => {
        if (st.stopEl !== el || performance.now() - st.lastScroll < 200 || !tip) return;
        const now = performance.now();
        if (!st.tipAt[tip] || now - st.tipAt[tip] > 15000) { st.tipAt[tip] = now; say(tip, 4200); }
      };
      if (isDock || isMobile()) {
        // hero, and every stop on a phone: stay docked bottom-right and just announce the section
        const c = perchFor(null);
        if (Math.hypot(st.x - c.x, st.y - c.y) > 4) walkTo(c, announce); else announce();
        return;
      }
      walkTo(perchFor(el), announce);
    };
    api.current.evaluate = evaluate;

    let scrollT = 0;
    const onScroll = () => {
      wake();
      if (st.talk) { root.classList.remove("talk"); st.talk = false; st.tipCleared = true; sync(); } // never leave an old line on screen
      window.clearTimeout(scrollT);
      scrollT = window.setTimeout(() => { // tour decisions wait until scrolling settles
        const cur = activeStop();
        if (st.userMoved && cur === st.stopEl) return; // a drag pauses the tour until the next stop
        if (cur && cur === st.stopEl && st.tipCleared && !st.open) { // same section: bring its line back
          st.tipCleared = false;
          const tip = (cur as HTMLElement).dataset.logi;
          if (tip) say(tip, 4200);
          return;
        }
        evaluate();
      }, 260);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── drag (mouse, pen, touch) ──
    let moved = false, downPt: Pt = { x: 0, y: 0 };
    const onDown = (e: PointerEvent) => {
      moved = false; downPt = { x: e.clientX, y: e.clientY };
      st.dragOff = [e.clientX - st.x, e.clientY - st.y];
      body.setPointerCapture(e.pointerId);
      st.drag = true; st.walk?.kill(); st.walking = false; st.arc = 0; st.rotT = 0; st.dragVx = 0; sync();
    };
    const onMove = (e: PointerEvent) => {
      if (!st.drag) return;
      if (!moved && Math.hypot(e.clientX - downPt.x, e.clientY - downPt.y) < 6) return;
      moved = true;
      const s = sizeNow();
      const nx = clamp(e.clientX - st.dragOff[0], 0, innerWidth - s);
      st.dragVx = st.dragVx * 0.7 + (nx - st.x) * 0.3;
      st.x = nx;
      st.y = clamp(e.clientY - st.dragOff[1], 0, innerHeight - s);
      st.rotT = clamp(st.dragVx * 1.4, -16, 16); // tilt with drag velocity
    };
    const onUp = () => {
      if (!st.drag) return;
      st.drag = false; st.rotT = 0; sync();
      if (moved) {
        st.userMoved = true; faceContent();
        gsap.fromTo(st, { sy: 0.92, sx: 1.06 }, { sy: 1, sx: 1, duration: 0.5, ease: "elastic.out(1,0.4)" });
        say(pick(["Wheee!", "Nice spot!", "I'll stay here for now."]), 2200);
      }
    };
    const onClick = () => { if (moved) { moved = false; return; } toggleChat(); };
    body.addEventListener("pointerdown", onDown);
    body.addEventListener("pointermove", onMove);
    body.addEventListener("pointerup", onUp);
    body.addEventListener("pointercancel", onUp);
    body.addEventListener("click", onClick);

    // ── per-frame: dock while chatting, blink, occasional hop, sleep, apply transforms ──
    let nextHop = performance.now() + 6000 + Math.random() * 4000;
    let nextBlink = performance.now() + 3000 + Math.random() * 3000;
    let blinkOff = 0;
    let dockedOpen = false;
    const tick = () => {
      const now = performance.now();
      if (st.open && !dockedOpen) {
        dockedOpen = true; st.walk?.kill(); st.walking = false;
        const s = sizeNow(); walkTo({ x: innerWidth - s - 24, y: innerHeight - s - 24 });
      } else if (!st.open && dockedOpen) dockedOpen = false;
      if (!st.open && !st.drag && !st.away && st.ready) {
        if (!st.sleeping && now - st.lastScroll > SLEEP_MS) { st.sleeping = true; sync(); }
        if (!st.sleeping && !st.walking && now > nextHop) {
          nextHop = now + 7000 + Math.random() * 5000;
          root.classList.add("hop"); window.setTimeout(() => root.classList.remove("hop"), 650);
        }
      }
      if (now > nextBlink && !st.sleeping) { // eyelids over the eyes for 120 ms
        nextBlink = now + 3000 + Math.random() * 3000;
        root.classList.add("blink"); blinkOff = now + 120;
      }
      if (blinkOff && now > blinkOff) { root.classList.remove("blink"); blinkOff = 0; }
      st.rot += (st.rotT - st.rot) * 0.2;
      sync();
      placeBubble();
      place();
    };

    if (st.reduce) {
      // static: parked bottom-right, no ticker, no loops
      const c = perchFor(null); st.x = c.x; st.y = c.y; st.ready = true; st.away = false; st.face = -1;
      place(); sync();
    } else gsap.ticker.add(tick);

    // ── entrance / page changes ──
    const enterPage = (first: boolean) => {
      const greet = PAGE_GREETING[location.pathname] ?? DEFAULT_GREETING;
      const c = perchFor(null); // clear of hero text and CTAs at every width
      st.stopEl = null; st.userMoved = false;
      const done = () => {
        st.away = false; st.ready = true; faceContent(); sync();
        say(greet, 4500);
        window.setTimeout(() => evaluate(true), 4800); // then start the tour from the section in view
      };
      if (st.reduce) { st.x = c.x; st.y = c.y; st.away = false; st.ready = true; place(); window.setTimeout(() => say(greet, 4500), 400); return; }
      if (first) {
        // pop up from the bottom-right with a bounce
        st.x = c.x; st.y = c.y + sizeNow() * 2; st.sx = 0.7; st.sy = 0.7;
        gsap.timeline({ onComplete: done })
          .to(st, { y: c.y, duration: 0.7, ease: "bounce.out" })
          .to(st, { sx: 1, sy: 1, duration: 0.5, ease: "elastic.out(1,0.5)" }, 0);
        api.current.happy();
      } else {
        walkTo(c, done, offRight(c.y)); // walk in from the right edge
      }
    };
    api.current.enterPage = enterPage;
    api.current.leavePage = () => {
      if (st.reduce || st.away) return;
      st.away = true; st.ready = false;
      root.classList.remove("talk"); st.talk = false;
      walkTo(offRight(clamp(st.y, TOP_SAFE, innerHeight - sizeNow() - MARGIN)));
    };

    const onResize = () => {
      const s = sizeNow();
      if (st.reduce) { const c = corner(); st.x = c.x; st.y = c.y; place(); return; }
      st.x = clamp(st.x, 0, innerWidth - s); st.y = clamp(st.y, 0, innerHeight - s);
      if (!st.away) window.setTimeout(() => evaluate(true), 250);
    };
    window.addEventListener("resize", onResize);
    const onVisible = () => { st.lastScroll = performance.now(); };
    document.addEventListener("visibilitychange", onVisible);

    // first load: 1.5 s, then pop up
    const entranceT = window.setTimeout(() => enterPage(true), st.reduce ? 0 : 1500);
    if (!st.reduce) { st.x = corner().x; st.y = innerHeight + sizeNow() * 2; place(); }
    sync();

    return () => {
      window.clearTimeout(entranceT); window.clearTimeout(scrollT); window.clearTimeout(bubbleT);
      st.walk?.kill();
      gsap.ticker.remove(tick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisible);
      body.removeEventListener("pointerdown", onDown);
      body.removeEventListener("pointermove", onMove);
      body.removeEventListener("pointerup", onUp);
      body.removeEventListener("pointercancel", onUp);
      body.removeEventListener("click", onClick);
    };
  }, [toggleChat]);

  // route changes: walk off, then walk back in with a page-specific greeting
  const firstRoute = useRef(true);
  useEffect(() => {
    if (firstRoute.current) { firstRoute.current = false; return; }
    api.current.leavePage();
    const t = window.setTimeout(() => api.current.enterPage(false), 1000);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = draft.trim();
    if (!v) return;
    setDraft("");
    userSay(v);
  };

  return (
    <aside aria-label="Site assistant">
      <div id="logi" ref={rootRef} data-state="idle" className={open ? "open" : undefined}>
        <div className="logi-bubble" ref={bubbleRef} aria-live="polite" />
        <button
          ref={bodyRef}
          className="logi-body"
          type="button"
          aria-label="Chat with Logi, the Logisaar assistant"
          aria-expanded={open}
          aria-controls="logi-chat"
        >
          <span className="logi-shadow" aria-hidden="true" />
          <span className="logi-fig">
            <span className="logi-flip" ref={flipRef}>
              <picture style={{ display: "contents" }}>
                <source type="image/webp" srcSet="/logi/logi.webp" />
                <img src="/logi/logi.png" width={512} height={512} alt="Logi, the Logisaar assistant" draggable={false} decoding="async" />
              </picture>
              <i className="logi-lid l" aria-hidden="true" />
              <i className="logi-lid r" aria-hidden="true" />
            </span>
          </span>
        </button>
        <span className="logi-z" aria-hidden="true">z z</span>
      </div>

      <section id="logi-chat" ref={chatRef} className={`logi-chat${open ? " on" : ""}`} role="dialog" aria-label="Chat with Logi" aria-modal="false">
        <header>
          <picture>
            <source type="image/webp" srcSet="/logi/logi-256.webp" />
            <img src="/logi/logi-256.png" width={36} height={36} alt="" className="logi-avatar" draggable={false} />
          </picture>
          <div className="logi-title"><b>Logi</b><span>· Logisaar assistant</span></div>
          <i className="logi-online" role="img" aria-label="Online" />
          <button type="button" className="logi-x" aria-label="Close chat" onClick={() => toggleChat(false)} tabIndex={open ? 0 : -1}>×</button>
        </header>
        <div className="logi-log" ref={logRef} aria-live="polite">
          {msgs.map((m) => (
            <div key={m.id} className={`logi-m ${m.who}`}>
              {m.text}
              {m.link && (m.link.to ? (
                <><br /><Link to={m.link.to} onClick={() => { if (innerWidth < 768) toggleChat(false); }}>{m.link.label} →</Link></>
              ) : (
                <><br /><a href={m.link.href} target="_blank" rel="noopener noreferrer">{m.link.label} ↗</a></>
              ))}
            </div>
          ))}
          {typing && <div className="logi-m bot typing" aria-label="Logi is typing"><i /><i /><i /></div>}
        </div>
        <div className="logi-quick">
          {quick.map((o) => (
            <button key={o} type="button" onClick={() => { api.current.happy(); userSay(o); }} tabIndex={open ? 0 : -1}>{o}</button>
          ))}
        </div>
        <form className="logi-form" onSubmit={onSubmit}>
          <label className="logi-sr" htmlFor="logi-in">Message Logi</label>
          <input
            id="logi-in" ref={inputRef} type="text" value={draft} onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about price, AI agents, jobs…" autoComplete="off" tabIndex={open ? 0 : -1}
          />
          <button type="submit" aria-label="Send" tabIndex={open ? 0 : -1}>→</button>
        </form>
      </section>
    </aside>
  );
};

export default Logi;
