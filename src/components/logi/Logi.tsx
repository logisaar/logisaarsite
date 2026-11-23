import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { answer, MAIN_OPTIONS, type LogiReply } from "./answers";
import "./logi.css";

/**
 * Logi, Logisaar's plush site companion (art in /public/logi; licence and attribution: THIRD_PARTY_NOTICES.md).
 *
 * Dock: Logi starts in one fixed spot, bottom-right, on every page and width. It never walks by itself and never
 * follows the cursor. Clicking it opens the chat (this is the only chat toggle).
 * Drag (round 12): the user can pick Logi up (mouse/pen at once, touch after a 250ms long-press so scrolling still
 * works) and drop it anywhere below the header. The spot is kept in sessionStorage as fractions of the viewport and
 * re-clamped on resize. Double-click, Home, or "Send Logi home" in the chat flies it back to the dock. With focus on
 * Logi the arrow keys move it (Shift for bigger steps). Bubbles and the chat panel open next to wherever Logi is.
 * Tour: every element with data-logi="line" is a stop. When scrolling settles, the stop holding the middle of the
 * viewport shows its line in a bubble above the dock for about 4s, unless the bubble would touch a demo, phone, form
 * or pinned stage (data-logi-avoid, data-demo, data-pinned, form), in which case it stays quiet.
 * States (data-state on #logi, animated in logi.css): idle, talking, thinking, happy, sleeping. Plus blink and hop.
 * Reduced motion: no tour, no loops; visible, clickable, chat works.
 */

const SLEEP_MS = 25000;
const POS_KEY = "logi-pos";
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), Math.max(lo, hi));
type Frac = { fx: number; fy: number };

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

const Logi = () => {
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLButtonElement>(null);
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
    sleeping: false, talk: false, thinking: false, happyUntil: 0,
    open: false, away: true, ready: false, reduce: false,
    pos: null as { x: number; y: number } | null, frac: null as Frac | null, dragging: false, suppressClick: false,
    stopEl: null as Element | null,
    lastScroll: performance.now(),
    tipAt: {} as Record<string, number>,
  });
  const api = useRef({
    say: (_t: string, _ms?: number) => {},
    evaluate: (_force?: boolean) => {},
    enterPage: (_first: boolean) => {},
    leavePage: () => {},
    happy: () => {},
    sync: () => {},
    home: () => {},
    nudge: (_dx: number, _dy: number) => {},
    placeChat: () => {},
  });
  const [displaced, setDisplaced] = useState(false);
  const [moveNote, setMoveNote] = useState("");

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
      window.requestAnimationFrame(() => api.current.placeChat());
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

  // ── engine: fixed dock, idle life, bubble-only tour ─────────────────────
  useEffect(() => {
    const root = rootRef.current!, bubble = bubbleRef.current!;
    const st = S.current;
    st.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sync = () => {
      const now = performance.now();
      const state = st.dragging ? "dragging"
        : st.sleeping ? "sleeping"
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

    // ── geometry: position (null = the dock), clamping, bubble and chat placement ──
    const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const headerBottom = () => {
      const probe = document.createElement("div");
      probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;height:var(--header-h)";
      document.body.appendChild(probe);
      const h = probe.getBoundingClientRect().height;
      probe.remove();
      return h;
    };
    const sizePx = () => root.offsetWidth || 80;
    const bounds = () => {
      const s = sizePx(), m = 0.5 * rem();
      return { minX: m, maxX: innerWidth - s - m, minY: headerBottom() + 0.25 * rem(), maxY: innerHeight - s - m };
    };
    const apply = () => {
      const p = st.pos;
      if (!p) { root.style.left = ""; root.style.top = ""; root.style.right = ""; root.style.bottom = ""; return; }
      root.style.left = `${p.x}px`; root.style.top = `${p.y}px`; root.style.right = "auto"; root.style.bottom = "auto";
    };
    const persist = () => {
      try { if (st.frac) sessionStorage.setItem(POS_KEY, JSON.stringify(st.frac)); else sessionStorage.removeItem(POS_KEY); } catch { /* storage may be blocked */ }
    };
    const placeChat = () => {
      const panel = chatRef.current;
      if (!panel) return;
      const r = root.getBoundingClientRect(), pw = panel.offsetWidth, ph = panel.offsetHeight, m = 0.5 * rem(), gap = 0.5 * rem(), top = headerBottom() + 0.25 * rem();
      const above = r.top - gap - ph;
      const below = r.bottom + gap;
      let x = clamp(r.right - pw, m, innerWidth - pw - m);
      let y: number;
      if (above >= top) y = above;
      else if (below + ph <= innerHeight - m) y = below;
      else {
        // no room above or below (Logi near the middle of a short window): sit beside Logi instead
        y = clamp(r.bottom - ph, top, innerHeight - ph - m);
        if (r.left - gap - pw >= m) x = r.left - gap - pw;
        else if (r.right + gap + pw <= innerWidth - m) x = r.right + gap;
      }
      y = clamp(y, top, innerHeight - ph - m);
      panel.style.left = `${x}px`; panel.style.top = `${y}px`;
    };
    api.current.placeChat = placeChat;
    // bubble: above the head by default; flips below, then left or right, so it stays on screen
    const placeBubble = () => {
      const r = root.getBoundingClientRect(), s = r.width, bw = bubble.offsetWidth, bh = bubble.offsetHeight, m = 0.5 * rem(), gap = 0.375 * rem(), top = headerBottom() + 0.25 * rem();
      const fitsX = (x: number) => r.left + x >= m && r.left + x + bw <= innerWidth - m;
      const fitsY = (y: number) => r.top + y >= top && r.top + y + bh <= innerHeight - m;
      let side: "top" | "bottom" | "left" | "right" = "top";
      if (fitsY(-bh - gap)) side = "top";
      else if (fitsY(s + gap)) side = "bottom";
      else if (fitsX(-bw - gap)) side = "left";
      else if (fitsX(s + gap)) side = "right";
      let x: number, y: number;
      if (side === "top" || side === "bottom") {
        x = clamp(r.left + s / 2 - bw / 2, m, innerWidth - bw - m) - r.left;
        y = side === "top" ? -bh - gap : s + gap;
      } else {
        y = clamp(r.top + s / 2 - bh / 2, top, innerHeight - bh - m) - r.top;
        x = side === "left" ? -bw - gap : s + gap;
      }
      bubble.style.left = `${x}px`; bubble.style.top = `${y}px`;
      bubble.style.setProperty("--tail", `${clamp(s / 2 - x, 0.9 * rem(), bw - 0.9 * rem())}px`);
      bubble.dataset.side = side;
    };
    const setPos = (p: { x: number; y: number } | null, store = true) => {
      if (p) {
        const b = bounds();
        st.pos = { x: clamp(p.x, b.minX, b.maxX), y: clamp(p.y, b.minY, b.maxY) };
        if (store) st.frac = { fx: st.pos.x / innerWidth, fy: st.pos.y / innerHeight };
      } else { st.pos = null; if (store) st.frac = null; }
      apply();
      if (store) { persist(); setDisplaced(!!st.pos); }
      if (st.open) placeChat();
    };
    const fromFrac = (f: Frac) => setPos({ x: f.fx * innerWidth, y: f.fy * innerHeight }, false);
    try {
      const saved = sessionStorage.getItem(POS_KEY);
      if (saved) { const f = JSON.parse(saved) as Frac; if (Number.isFinite(f.fx) && Number.isFinite(f.fy)) { st.frac = f; fromFrac(f); setDisplaced(true); } }
    } catch { /* ignore */ }
    const onResize = () => { if (st.frac) fromFrac(st.frac); if (st.open) placeChat(); };
    window.addEventListener("resize", onResize);

    let moveNoteT = 0;
    const announce = () => { setMoveNote("Logi moved"); window.clearTimeout(moveNoteT); moveNoteT = window.setTimeout(() => setMoveNote(""), 900); };
    api.current.nudge = (dx, dy) => {
      const r = root.getBoundingClientRect();
      setPos({ x: (st.pos?.x ?? r.left) + dx, y: (st.pos?.y ?? r.top) + dy });
      announce();
    };
    let flyTween: gsap.core.Tween | null = null;
    api.current.home = () => {
      if (!st.pos) return;
      flyTween?.kill();
      if (st.reduce) { setPos(null); announce(); return; }
      const s = sizePx(), m = 0.5 * rem();
      const o = { x: st.pos.x, y: st.pos.y };
      flyTween = gsap.to(o, {
        x: innerWidth - s - m, y: innerHeight - s - m, duration: 0.6, ease: "power2.inOut",
        onUpdate: () => { st.pos = { x: o.x, y: o.y }; apply(); if (st.open) placeChat(); },
        onComplete: () => { setPos(null); announce(); },
      });
    };

    // is the bubble (or Logi) about to sit on a demo, phone, form or pinned stage? then stay quiet
    const BLOCKERS = "[data-demo], [data-logi-avoid], form, [data-pinned], figure[role='img']";
    const hitsBlocker = () => {
      const b = bubble.getBoundingClientRect(), l = root.getBoundingClientRect();
      const box = new DOMRect(Math.min(b.left, l.left), Math.min(b.top, l.top), Math.max(b.right, l.right) - Math.min(b.left, l.left), Math.max(b.bottom, l.bottom) - Math.min(b.top, l.top));
      return [...document.querySelectorAll(BLOCKERS)].some((e) => {
        if (root.contains(e) || e.closest(".logi-chat")) return false;
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && box.left < r.right && box.right > r.left && box.top < r.bottom && box.bottom > r.top;
      });
    };

    let bubbleT = 0;
    const hide = () => { window.clearTimeout(bubbleT); root.classList.remove("talk"); st.talk = false; sync(); };
    const say = (text: string, ms = 4000) => {
      if (st.open || !text) return;
      if (st.dragging) return;
      bubble.textContent = text;
      placeBubble();
      if (hitsBlocker()) { hide(); return; }
      root.classList.add("talk");
      st.talk = true; sync();
      window.clearTimeout(bubbleT);
      bubbleT = window.setTimeout(hide, ms);
    };
    api.current.say = say;

    const wake = () => {
      st.lastScroll = performance.now();
      if (st.sleeping) { st.sleeping = false; sync(); api.current.happy(); }
    };

    // ── drag: mouse/pen at once after 6px; touch after a 250ms long-press so the page still scrolls ──
    const body = bodyRef.current!;
    let pressed = false, holdT = 0, startPt = { x: 0, y: 0 }, grab = [0, 0], lastX = 0, vx = 0;
    const beginDrag = () => {
      st.dragging = true; root.classList.remove("hop"); hide();
      lastX = root.getBoundingClientRect().left; vx = 0;
      sync();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      flyTween?.kill();
      pressed = true; startPt = { x: e.clientX, y: e.clientY };
      const r = root.getBoundingClientRect();
      grab = [e.clientX - r.left, e.clientY - r.top];
      try { body.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      if (e.pointerType === "touch") holdT = window.setTimeout(() => { if (pressed) { beginDrag(); navigator.vibrate?.(8); } }, 250);
    };
    const onMove = (e: PointerEvent) => {
      if (!pressed) return;
      const dist = Math.hypot(e.clientX - startPt.x, e.clientY - startPt.y);
      if (!st.dragging) {
        if (e.pointerType === "touch") { if (dist > 10) { window.clearTimeout(holdT); pressed = false; } return; }
        if (dist < 6) return;
        beginDrag();
      }
      e.preventDefault();
      const nx = e.clientX - grab[0], ny = e.clientY - grab[1];
      vx = vx * 0.7 + (nx - lastX) * 0.3; lastX = nx;
      setPos({ x: nx, y: ny }, false);
      if (!st.reduce) root.style.setProperty("--tilt", `${clamp(vx * 1.2, -14, 14)}deg`);
    };
    const onUp = () => {
      window.clearTimeout(holdT);
      if (!pressed) return;
      pressed = false;
      if (st.dragging) {
        st.dragging = false; st.suppressClick = true; window.setTimeout(() => { st.suppressClick = false; }, 60);
        root.style.removeProperty("--tilt");
        if (st.pos) setPos(st.pos); // store as fractions of the viewport
        sync();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Home") { e.preventDefault(); api.current.home(); return; }
      const step = (e.shiftKey ? 4 : 1.5) * rem();
      const d: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      if (d[e.key]) { e.preventDefault(); api.current.nudge(...d[e.key]); }
    };
    const onDbl = () => api.current.home();
    body.addEventListener("pointerdown", onDown);
    body.addEventListener("pointermove", onMove);
    body.addEventListener("pointerup", onUp);
    body.addEventListener("pointercancel", onUp);
    body.addEventListener("keydown", onKey);
    body.addEventListener("dblclick", onDbl);

    // ── tour: bubble only; the section that holds the middle of the viewport, once scrolling settles ──
    const stops = (): Element[] => [...document.querySelectorAll("[data-logi]")];
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
      if (st.reduce || st.open || st.away || !st.ready) return;
      const el = activeStop();
      if (!el) { st.stopEl = null; return; }
      if (el === st.stopEl && !force) return;
      st.stopEl = el;
      const tip = (el as HTMLElement).dataset.logi || "";
      if (!tip) return;
      const now = performance.now();
      if (!st.tipAt[tip] || now - st.tipAt[tip] > 15000) { st.tipAt[tip] = now; say(tip, 4000); }
    };
    api.current.evaluate = evaluate;

    let scrollT = 0;
    const onScroll = () => {
      wake();
      if (st.talk) hide(); // never leave an old line on screen
      window.clearTimeout(scrollT);
      scrollT = window.setTimeout(() => evaluate(), 350);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // one-time wave when the footer first comes into view
    let waved = false;
    const footer = document.querySelector("footer");
    const io = footer && !st.reduce ? new IntersectionObserver((es) => {
      if (!waved && es.some((e) => e.isIntersecting)) { waved = true; api.current.happy(); }
    }, { threshold: 0.3 }) : null;
    if (footer && io) io.observe(footer);

    // ── per frame: blink, occasional hop, sleep ──
    let nextHop = performance.now() + 6000 + Math.random() * 4000;
    let nextBlink = performance.now() + 3000 + Math.random() * 3000;
    let blinkOff = 0;
    const tick = () => {
      const now = performance.now();
      if (!st.open && !st.away && st.ready) {
        if (!st.sleeping && now - st.lastScroll > SLEEP_MS) { st.sleeping = true; sync(); }
        if (!st.sleeping && now > nextHop) {
          nextHop = now + 7000 + Math.random() * 5000;
          root.classList.add("hop"); window.setTimeout(() => root.classList.remove("hop"), 650);
        }
      }
      if (now > nextBlink && !st.sleeping) {
        nextBlink = now + 3000 + Math.random() * 3000;
        root.classList.add("blink"); blinkOff = now + 120;
      }
      if (blinkOff && now > blinkOff) { root.classList.remove("blink"); blinkOff = 0; }
      sync();
    };
    if (!st.reduce) gsap.ticker.add(tick);

    // ── entrance and page greeting ──
    const greetT: number[] = [];
    const enterPage = (first: boolean) => {
      const greet = PAGE_GREETING[location.pathname] ?? DEFAULT_GREETING;
      st.stopEl = null; st.away = false; st.ready = true;
      if (first && !st.reduce) {
        root.classList.add("pop");
        window.setTimeout(() => root.classList.remove("pop"), 900);
        api.current.happy();
      }
      greetT.push(window.setTimeout(() => say(greet, 4000), st.reduce ? 400 : 600));
      greetT.push(window.setTimeout(() => evaluate(true), 4900));
    };
    api.current.enterPage = enterPage;
    api.current.leavePage = () => { st.ready = false; st.stopEl = null; greetT.forEach(clearTimeout); greetT.length = 0; hide(); };

    const entranceT = window.setTimeout(() => enterPage(true), st.reduce ? 0 : 1200);
    sync();

    return () => {
      window.clearTimeout(entranceT); window.clearTimeout(scrollT); window.clearTimeout(bubbleT);
      greetT.forEach(clearTimeout);
      io?.disconnect();
      gsap.ticker.remove(tick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(moveNoteT); window.clearTimeout(holdT);
      body.removeEventListener("pointerdown", onDown);
      body.removeEventListener("pointermove", onMove);
      body.removeEventListener("pointerup", onUp);
      body.removeEventListener("pointercancel", onUp);
      body.removeEventListener("keydown", onKey);
      body.removeEventListener("dblclick", onDbl);
    };
  }, []);

  // route changes: quiet out, then greet again
  const firstRoute = useRef(true);
  useEffect(() => {
    if (firstRoute.current) { firstRoute.current = false; return; }
    api.current.leavePage();
    const t = window.setTimeout(() => api.current.enterPage(false), 700);
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
        <div className="logi-bubble" ref={bubbleRef} aria-live="polite" data-side="top" />
        <button
          ref={bodyRef}
          className="logi-body"
          type="button"
          aria-label="Chat with Logi, the Logisaar assistant"
          aria-expanded={open}
          aria-controls="logi-chat"
          aria-describedby="logi-hint"
          onClick={() => { if (S.current.suppressClick) return; toggleChat(); }}
        >
          <span className="logi-shadow" aria-hidden="true" />
          <span className="logi-fig">
            <span className="logi-flip">
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
        <span id="logi-hint" className="logi-sr">Drag to move Logi, or use the arrow keys. Double-click or press Home to send it back to the corner.</span>
        <span className="logi-sr" role="status" aria-live="polite">{moveNote}</span>
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
        {displaced && (
          <button type="button" className="logi-home" tabIndex={open ? 0 : -1} onClick={() => api.current.home()}>Send Logi home</button>
        )}
      </section>
    </aside>
  );
};

export default Logi;
