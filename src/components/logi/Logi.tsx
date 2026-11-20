import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { answer, MAIN_OPTIONS, type LogiReply } from "./answers";
import "./logi.css";

/**
 * Logi, Logisaar's site companion. It does not follow the cursor.
 *
 * Tour: every element with data-logi="tip" is a stop. When scrolling settles, the stop that holds the
 * middle of the viewport becomes the active one; Logi walks (GSAP, hop arc, squash on landing) to a
 * perch beside that section's heading, then shows the tip. Scrolling back walks it back.
 * Idle: breathing, blinking, looking toward the section, an occasional hop; sleeps after 25 s without scroll.
 * Routes: Logi stays mounted, walks off the edge on navigation and walks back in with a page greeting.
 * Reduced motion: static, parked bottom-right, no tween, no tour; still clickable and chat works.
 */

const SIZE = 96;
const MARGIN = 16;
const TOP_SAFE = 124; // keep clear of the navbar capsule
const SLEEP_MS = 25000;

const PAGE_GREETING: Record<string, string> = {
  "/": "Hi! I'm Logi. I'll walk you through Logisaar.",
  "/careers": "We're hiring! Want help applying?",
  "/ikuro": "IKURO helps students decide better.",
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
const overlaps = (a: { x: number; y: number }, r: DOMRect, pad = 6) =>
  a.x < r.right + pad && a.x + SIZE > r.left - pad && a.y < r.bottom + pad && a.y + SIZE > r.top - pad;

const Logi = () => {
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [quick, setQuick] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");

  // engine state (not React state: updated every frame)
  const S = useRef({
    x: 0, y: 0,            // rendered position (viewport px, top-left of the 96px box)
    arc: 0,                // hop height while walking
    sx: 1, sy: 1,          // squash and stretch
    rot: 0,                // waddle
    hop: 0, mood: 0, blink: 0, nextBlink: 2,
    sleeping: false, open: false, drag: false, away: true, ready: false,
    reduce: false,
    dragOff: [0, 0] as number[],
    look: { x: innerWidth / 2, y: innerHeight / 2 } as Pt,
    stopEl: null as Element | null,
    userMoved: false,
    lastScroll: performance.now(),
    tipAt: {} as Record<string, number>,
    walk: null as gsap.core.Tween | null,
  });
  const api = useRef({
    say: (_t: string, _ms?: number) => {},
    evaluate: (_force?: boolean) => {},
    enterPage: (_first: boolean) => {},
    leavePage: () => {},
  });

  // ── chat ──────────────────────────────────────────────────────────────
  const botSay = useCallback((reply: LogiReply) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: ++idRef.current, who: "bot", text: reply.text, link: reply.link }]);
      setQuick(reply.quick ?? []);
      S.current.hop = 0.6;
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
      st.sleeping = false; rootRef.current?.classList.remove("sleep");
      st.hop = 1;
      setMsgs((m) => (m.length ? m : [{ id: ++idRef.current, who: "bot", text: "Hi! I'm Logi. I live on this website and help visitors find their way." }]));
    } else {
      bodyRef.current?.focus({ preventScroll: true });
      window.setTimeout(() => api.current.evaluate(true), 400); // resume the tour
    }
  }, []);

  const askedRef = useRef(false);
  useEffect(() => {
    if (!open) return;
    if (!askedRef.current) { askedRef.current = true; botSay({ text: "What brings you here today?", quick: MAIN_OPTIONS }); }
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
    return () => window.clearTimeout(t);
  }, [open, botSay]);
  useEffect(() => { const el = logRef.current; if (el) el.scrollTop = el.scrollHeight; }, [msgs, typing]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") toggleChat(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggleChat]);

  // ── engine ────────────────────────────────────────────────────────────
  useEffect(() => {
    const root = rootRef.current!, body = bodyRef.current!, cv = canvasRef.current!, bubble = bubbleRef.current!;
    const ctx = cv.getContext("2d")!;
    const st = S.current;
    st.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = (SIZE / 84) * 1.12;
    ctx.setTransform(2 * k, 0, 0, 2 * k, (SIZE * 2 - 84 * 2 * k) / 2, (SIZE * 2 - 84 * 2 * k) / 2);

    const corner = (): Pt => ({ x: innerWidth - SIZE - MARGIN, y: innerHeight - SIZE - MARGIN });
    const offRight = (y: number): Pt => ({ x: innerWidth + SIZE, y });
    const place = () => {
      const s = st;
      root.style.transform = `translate3d(${Math.round(s.x)}px,${Math.round(s.y - s.arc)}px,0)`;
      body.style.transform = `rotate(${s.rot}deg) scale(${s.sx},${s.sy})`;
    };

    // speech bubble
    let bubbleT = 0;
    const say = (text: string, ms = 4000) => {
      if (st.open || !text) return;
      bubble.textContent = text;
      root.classList.add("talk");
      st.mood = 1;
      window.clearTimeout(bubbleT);
      bubbleT = window.setTimeout(() => root.classList.remove("talk"), ms);
    };
    api.current.say = say;
    const placeBubble = () => {
      if (!root.classList.contains("talk")) return;
      const bw = bubble.offsetWidth, cx = st.x + SIZE / 2;
      const lft = clamp(cx - bw / 2, 8, innerWidth - bw - 8);
      bubble.style.left = lft - st.x + "px";
      bubble.style.setProperty("--tail", cx - lft + "px");
      root.classList.toggle("below", st.y < 170);
    };

    const wake = () => {
      st.lastScroll = performance.now();
      if (st.sleeping) { st.sleeping = false; root.classList.remove("sleep"); st.hop = 1; }
    };

    // ── perch spot beside a section's heading, kept clear of interactive elements ──
    const perchFor = (section: Element | null): Pt => {
      const c = corner();
      if (!section) return c;
      const head = section.querySelector("h1, h2, [data-logi-anchor]");
      const cands: Pt[] = [];
      if (head && innerWidth >= 768) {
        const t = textRect(head);
        if (t.bottom > TOP_SAFE - 20 && t.top < innerHeight - SIZE) {
          const y = clamp(t.top + t.height / 2 - SIZE / 2, TOP_SAFE, innerHeight - SIZE - MARGIN);
          cands.push({ x: clamp(t.right + 20, MARGIN, innerWidth - SIZE - MARGIN), y });
          cands.push({ x: clamp(t.right + 20, MARGIN, innerWidth - SIZE - MARGIN), y: clamp(y + SIZE + 8, TOP_SAFE, innerHeight - SIZE - MARGIN) });
          cands.push({ x: clamp(t.right + 20, MARGIN, innerWidth - SIZE - MARGIN), y: clamp(y - SIZE - 8, TOP_SAFE, innerHeight - SIZE - MARGIN) });
        }
      }
      cands.push(c);
      cands.push({ x: c.x, y: clamp(innerHeight * 0.55, TOP_SAFE, c.y) });
      cands.push({ x: c.x, y: clamp(innerHeight * 0.35, TOP_SAFE, c.y) });
      const rects = [...document.querySelectorAll(AVOID)]
        .filter((e) => !root.contains(e) && !e.closest(".logi-chat") && !e.closest("nav, header"))
        .map((e) => (/^H[1-3]$/.test(e.tagName) ? textRect(e) : e.getBoundingClientRect()))
        .filter((r) => r.width > 0 && r.bottom > 0 && r.top < innerHeight && r.width * r.height < 60000); // ignore whole-card links
      let best = cands[0], bestN = Infinity;
      for (const c0 of cands) {
        const n = rects.filter((r) => overlaps(c0, r)).length;
        if (n < bestN) { best = c0; bestN = n; if (n === 0) break; }
      }
      return best;
    };

    // ── walking ──
    const walkTo = (to: Pt, onDone?: () => void, from?: Pt) => {
      st.walk?.kill();
      if (from) { st.x = from.x; st.y = from.y; }
      if (st.reduce) { st.x = to.x; st.y = to.y; place(); onDone?.(); return; }
      const dist = Math.hypot(to.x - st.x, to.y - st.y);
      const dur = clamp(0.9 + dist / 1800, 0.9, 1.4);
      const hopH = clamp(dist / 8, 22, 60);
      const p = { t: 0 };
      const sx0 = st.x, sy0 = st.y;
      st.walk = gsap.to(p, {
        t: 1, duration: dur, ease: "power2.inOut",
        onUpdate: () => {
          st.x = sx0 + (to.x - sx0) * p.t;
          st.y = sy0 + (to.y - sy0) * p.t;
          st.arc = Math.sin(p.t * Math.PI) * hopH;
          st.rot = Math.sin(p.t * Math.PI * 7) * 7 * Math.sin(p.t * Math.PI);
          const stretch = Math.sin(p.t * Math.PI) * 0.08;
          st.sx = 1 - stretch * 0.5; st.sy = 1 + stretch;
        },
        onComplete: () => {
          st.arc = 0; st.rot = 0;
          gsap.timeline()
            .to(st, { sx: 1.16, sy: 0.82, duration: 0.1, ease: "power2.out" })
            .to(st, { sx: 1, sy: 1, duration: 0.45, ease: "elastic.out(1.1,0.4)" });
          onDone?.();
        },
      });
    };

    // ── tour ──
    const stops = (): Element[] => [...document.querySelectorAll("[data-logi]")];
    const activeStop = (): Element | null => {
      const mid = innerHeight * 0.5;
      let best: Element | null = null, bestScore = -1;
      for (const el of stops()) {
        const r = el.getBoundingClientRect();
        if (r.height < 60 || r.bottom < 0 || r.top > innerHeight) continue;
        const vis = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
        const holdsMid = r.top <= mid && r.bottom >= mid;
        const score = (holdsMid ? 1e6 : 0) + vis;
        if (score > bestScore) { bestScore = score; best = el; }
      }
      return best;
    };
    const tipFor = (el: Element) => (el as HTMLElement).dataset.logi || "";
    const evaluate = (force = false) => {
      if (st.reduce || st.open || st.drag || st.away || !st.ready) return;
      const el = activeStop();
      if (!el) return;
      const changed = el !== st.stopEl;
      if (!changed && !force) return;
      st.stopEl = el; st.userMoved = false;
      wake();
      const target = perchFor(el);
      walkTo(target, () => {
        const key = tipFor(el), now = performance.now();
        if (key && (!st.tipAt[key] || now - st.tipAt[key] > 15000)) { st.tipAt[key] = now; say(key, 4200); }
      });
      st.look = { x: innerWidth / 2, y: clamp(el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2, 0, innerHeight) };
    };
    api.current.evaluate = evaluate;

    let scrollT = 0;
    const onScroll = () => {
      wake();
      window.clearTimeout(scrollT);
      // tour decisions wait until scrolling settles
      scrollT = window.setTimeout(() => {
        // a user drag only pauses the tour until the next stop
        const el = activeStop();
        if (st.userMoved && el === st.stopEl) return;
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
      st.drag = true; st.walk?.kill(); st.arc = 0; st.rot = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!st.drag) return;
      if (!moved && Math.hypot(e.clientX - downPt.x, e.clientY - downPt.y) < 6) return;
      moved = true;
      st.x = clamp(e.clientX - st.dragOff[0], 0, innerWidth - SIZE);
      st.y = clamp(e.clientY - st.dragOff[1], 0, innerHeight - SIZE);
    };
    const onUp = () => {
      if (!st.drag) return;
      st.drag = false;
      if (moved) { st.userMoved = true; gsap.fromTo(st, { sy: 0.85, sx: 1.12 }, { sy: 1, sx: 1, duration: 0.5, ease: "elastic.out(1,0.4)" }); say(pick(["Wheee!", "Nice spot!", "I'll stay here for now."]), 2200); }
    };
    const onClick = () => { if (moved) { moved = false; return; } toggleChat(); };
    body.addEventListener("pointerdown", onDown);
    body.addEventListener("pointermove", onMove);
    body.addEventListener("pointerup", onUp);
    body.addEventListener("pointercancel", onUp);
    body.addEventListener("click", onClick);

    // ── drawing ──
    const dots: { x: number; y: number; d: number }[] = [];
    const R = 30, sp = 5.2;
    for (let y = -R; y <= R; y += sp) for (let x = -R; x <= R; x += sp) {
      const d = (x * x) / (R * R) + (y * y) / (R * R * 0.86);
      if (d <= 1) dots.push({ x, y, d });
    }
    const draw = (t: number) => {
      const W = 84, c = W / 2, cy = c + 4;
      ctx.clearRect(-20, -20, W + 40, W + 40);
      st.mood *= 0.985; st.hop *= 0.9;
      if (!st.reduce && t > st.nextBlink) { st.blink = 1; st.nextBlink = t + 2.5 + Math.random() * 3; }
      st.blink *= 0.78;
      const cxp = st.x + SIZE / 2, cyp = st.y + SIZE / 2;
      const dx = st.open ? -0.5 : clamp((st.look.x - cxp) / 400, -1, 1), dy = st.open ? -0.2 : clamp((st.look.y - cyp) / 400, -1, 1);
      const reduce = st.reduce;
      const breathe = reduce ? 0 : Math.sin(t * 2.2) * 0.03;
      const bounce = reduce ? 0 : -Math.abs(Math.sin(st.hop * Math.PI)) * 6;
      const eyeH = st.sleeping ? 0.6 : 7 * (1 - Math.min(1, st.blink * 1.6));
      const ex = dx * 5, ey = dy * 4 - 4;
      const wob = reduce ? 0 : 1;
      ctx.fillStyle = "#9BE7BF"; ctx.beginPath(); ctx.arc(c + Math.sin(t * 3) * 1.5 * wob, cy - R - 4 + bounce, 1.8, 0, 6.28); ctx.fill();
      ctx.fillStyle = st.mood > 0.3 ? "#00D162" : "#5FDC98"; ctx.beginPath(); ctx.arc(c + Math.sin(t * 3) * 3 * wob, cy - R - 10 + bounce, 3.2, 0, 6.28); ctx.fill();
      for (const p of dots) {
        const x = c + p.x * (1 + breathe), y = cy + p.y * (1 - breathe) + bounce;
        const e1 = ((p.x - (-11 + ex)) / 3.6) ** 2 + ((p.y - ey) / (eyeH / 2 + 0.01)) ** 2 < 1;
        const e2 = ((p.x - (11 + ex)) / 3.6) ** 2 + ((p.y - ey) / (eyeH / 2 + 0.01)) ** 2 < 1;
        const smile = Math.abs(Math.hypot(p.x - ex * 0.4, p.y + 2) - 14) < 2.4 && p.y > 6 && Math.abs(p.x - ex * 0.4) < (st.mood > 0.3 ? 11 : 7);
        let col: string, r = 1.85 - p.d * 0.5;
        if (e1 || e2) { col = "#0B0F10"; r = 2.2; }
        else if (smile && !st.sleeping) { col = "#0B0F10"; r = 1.9; }
        else { const g = Math.round(205 - p.d * 45 + (reduce ? 0 : Math.sin(t * 2 + p.x) * 6)); col = `rgb(${Math.round(p.d * 30)},${g},${Math.round(96 + p.d * 30)})`; }
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.28); ctx.fill();
      }
    };

    // ── per-frame: dock while chatting, occasional hop, sleep, apply transform ──
    const t0 = performance.now();
    let nextHop = performance.now() + 6000 + Math.random() * 4000;
    let dockedOpen = false;
    const tick = () => {
      const now = performance.now();
      if (st.open && !dockedOpen) {
        dockedOpen = true; st.walk?.kill();
        const c = corner(); walkTo({ x: c.x - 8, y: c.y - 8 });
      } else if (!st.open && dockedOpen) dockedOpen = false;
      if (!st.reduce && !st.open && !st.drag && !st.away && st.ready) {
        if (now > nextHop && !st.sleeping) { st.hop = 1; nextHop = now + 6000 + Math.random() * 5000; }
        if (!st.sleeping && now - st.lastScroll > SLEEP_MS) { st.sleeping = true; root.classList.add("sleep"); }
      }
      placeBubble();
      place();
      draw((now - t0) / 1000);
    };
    if (st.reduce) {
      // static render: parked bottom-right, no ticker animation
      const c = corner(); st.x = c.x; st.y = c.y; st.ready = true; st.away = false;
      place(); draw(0);
    } else gsap.ticker.add(tick);

    // ── entrance / page changes ──
    const enterPage = (first: boolean) => {
      const greet = PAGE_GREETING[location.pathname] ?? DEFAULT_GREETING;
      const c = corner();
      st.stopEl = null; st.userMoved = false;
      const done = () => {
        st.away = false; st.ready = true;
        say(greet, 4500);
        // after the greeting, start the tour from whatever section is in view
        window.setTimeout(() => evaluate(true), 4800);
      };
      if (st.reduce) { st.x = c.x; st.y = c.y; st.away = false; st.ready = true; place(); window.setTimeout(() => say(greet, 4500), 400); return; }
      if (first) {
        // pop up from the bottom-right with a bounce
        st.x = c.x; st.y = c.y + SIZE * 2; st.sx = 0.6; st.sy = 0.6;
        gsap.timeline({ onComplete: done })
          .to(st, { y: c.y, duration: 0.7, ease: "bounce.out" })
          .to(st, { sx: 1, sy: 1, duration: 0.5, ease: "elastic.out(1,0.5)" }, 0);
      } else {
        // walk in from the right edge
        walkTo(c, done, offRight(c.y));
      }
    };
    api.current.enterPage = enterPage;
    api.current.leavePage = () => {
      if (st.reduce || st.away) return;
      st.away = true; st.ready = false;
      root.classList.remove("talk");
      walkTo(offRight(clamp(st.y, TOP_SAFE, innerHeight - SIZE - MARGIN)));
    };

    const onResize = () => {
      if (st.reduce) { const c = corner(); st.x = c.x; st.y = c.y; place(); return; }
      st.x = clamp(st.x, 0, innerWidth - SIZE); st.y = clamp(st.y, 0, innerHeight - SIZE);
      if (!st.away) window.setTimeout(() => evaluate(true), 250);
    };
    window.addEventListener("resize", onResize);
    const onVisible = () => { st.lastScroll = performance.now(); };
    document.addEventListener("visibilitychange", onVisible);

    // first load: 1.5 s, then pop up
    const entranceT = window.setTimeout(() => enterPage(true), st.reduce ? 0 : 1500);
    if (!st.reduce) { st.x = corner().x; st.y = innerHeight + SIZE * 2; place(); }

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
    <>
      <div id="logi" ref={rootRef} className={open ? "open" : undefined}>
        <div className="logi-bubble" ref={bubbleRef} aria-live="polite" />
        <button
          ref={bodyRef}
          className="logi-body"
          type="button"
          aria-label="Chat with Logi, the Logisaar assistant"
          aria-expanded={open}
          aria-controls="logi-chat"
        >
          <canvas ref={canvasRef} width={SIZE * 2} height={SIZE * 2} />
        </button>
        <span className="logi-z" aria-hidden="true">z</span>
      </div>

      <section id="logi-chat" className={`logi-chat${open ? " on" : ""}`} role="dialog" aria-label="Chat with Logi" aria-hidden={!open}>
        <header>
          <picture>
            <source type="image/webp" srcSet="/brand/logisaar-mark-128.webp" />
            <img src="/brand/logisaar-mark-128.png" width={28} height={27} alt="" className="logi-mark" />
          </picture>
          <b>Logi</b>
          <span>Logisaar assistant</span>
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
            <button key={o} type="button" onClick={() => userSay(o)} tabIndex={open ? 0 : -1}>{o}</button>
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
    </>
  );
};

export default Logi;
