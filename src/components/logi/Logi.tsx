import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { answer, MAIN_OPTIONS, type LogiReply } from "./answers";
import "./logi.css";

/**
 * Logi, Logisaar's roaming site companion.
 * - follows the cursor lazily, perches on h2 headings, sleeps after 22 s idle
 * - drag and throw it; it bounces off the screen edges
 * - shows tips for elements with data-logi="text" (once each) and data-logi-hover="text"
 * - click to chat: quick replies, keyword answers, WhatsApp hand-off
 * - touch devices and prefers-reduced-motion: parked bottom-right, no roaming or animation loop
 */

const SIZE = 84;
const IDLE_SLEEP_MS = 22000;

interface ChatMsg {
  id: number;
  who: "bot" | "me";
  text: string;
  link?: LogiReply["link"];
}

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

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

  // mutable engine state shared with the animation loop
  const S = useRef({
    x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0,
    mode: "follow" as "follow" | "park" | "thrown",
    lastMove: 0, mx: 0, my: 0,
    drag: false, dragOff: [0, 0], dragHist: [] as number[][],
    sleeping: false, open: false, mood: 0, blink: 0, nextBlink: 2, hop: 0,
    said: {} as Record<string, number>,
    reduce: false, touch: false,
  });
  const sayRef = useRef<(text: string, ms?: number) => void>(() => {});

  // ── chat ────────────────────────────────────────────────────────────────
  const botSay = useCallback((reply: LogiReply) => {
    setTyping(true);
    const delay = S.current.reduce ? 0 : 650;
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: ++idRef.current, who: "bot", text: reply.text, link: reply.link }]);
      setQuick(reply.quick ?? []);
      S.current.hop = 0.6;
    }, delay);
  }, []);

  const userSay = useCallback((text: string) => {
    setMsgs((m) => [...m, { id: ++idRef.current, who: "me", text }]);
    setQuick([]);
    botSay(answer(text));
  }, [botSay]);

  const toggleChat = useCallback((force?: boolean) => {
    const next = force === undefined ? !S.current.open : force;
    S.current.open = next;
    setOpen(next);
    if (next) {
      rootRef.current?.classList.remove("talk");
      S.current.sleeping = false;
      rootRef.current?.classList.remove("sleep");
      S.current.hop = 1;
      if (S.current.mode === "thrown") S.current.mode = "follow"; // stop bouncing, dock beside the chat
      setMsgs((m) => {
        if (m.length) return m;
        return [{ id: ++idRef.current, who: "bot", text: "Hi! I'm Logi. I live on this website and help visitors find their way." }];
      });
    } else {
      bodyRef.current?.focus({ preventScroll: true });
    }
  }, []);

  // first open: ask the opening question
  const askedRef = useRef(false);
  useEffect(() => {
    if (open && !askedRef.current) {
      askedRef.current = true;
      botSay({ text: "What brings you here today?", quick: MAIN_OPTIONS });
    }
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
      return () => window.clearTimeout(t);
    }
  }, [open, botSay]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") toggleChat(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggleChat]);

  // ── engine: movement, drag, drawing ─────────────────────────────────────
  useEffect(() => {
    const root = rootRef.current!, body = bodyRef.current!, cv = canvasRef.current!, bubble = bubbleRef.current!;
    const ctx = cv.getContext("2d")!;
    ctx.scale(2, 2);
    const st = S.current;
    st.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    st.touch = matchMedia("(hover: none)").matches;
    const { reduce, touch } = st;
    const parked = reduce || touch;
    st.mode = parked ? "park" : "follow";
    const clampX = (x: number) => Math.max(16, Math.min(innerWidth - SIZE - 16, x));
    const clampY = (y: number) => Math.max(90, Math.min(innerHeight - SIZE - 16, y));
    const parkPos = () => ({ x: innerWidth - SIZE - 18, y: innerHeight - SIZE - 18 });
    const start = parkPos();
    st.x = st.tx = parked ? start.x : innerWidth - 130;
    st.y = st.ty = parked ? start.y : innerHeight - 140;
    st.mx = innerWidth / 2; st.my = innerHeight / 2; st.lastMove = performance.now();

    let bubbleT = 0;
    const say = (text: string, ms = 3200) => {
      if (st.open) return;
      bubble.textContent = text;
      root.classList.add("talk");
      st.mood = 1;
      window.clearTimeout(bubbleT);
      bubbleT = window.setTimeout(() => root.classList.remove("talk"), ms);
    };
    sayRef.current = say;
    const wake = () => { st.sleeping = false; root.classList.remove("sleep"); st.hop = 1; };

    const onMouseMove = (e: MouseEvent) => {
      st.mx = e.clientX; st.my = e.clientY; st.lastMove = performance.now();
      if (st.sleeping) wake();
    };
    const onScroll = () => { st.lastMove = performance.now(); if (st.sleeping) wake(); };
    if (!parked) {
      window.addEventListener("mousemove", onMouseMove);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // drag + throw (mouse/pen only)
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (touch || reduce) return;
      moved = false;
      st.drag = true; st.dragOff = [e.clientX - st.x, e.clientY - st.y]; st.dragHist = [];
      body.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!st.drag) return;
      if (Math.hypot(e.movementX, e.movementY) > 2) moved = true;
      st.x = e.clientX - st.dragOff[0]; st.y = e.clientY - st.dragOff[1];
      st.dragHist.push([e.clientX, e.clientY, performance.now()]);
      if (st.dragHist.length > 5) st.dragHist.shift();
    };
    const onUp = () => {
      if (!st.drag) return;
      st.drag = false;
      const h = st.dragHist;
      if (moved && h.length > 1) {
        const a = h[0], b = h[h.length - 1], dt = Math.max(16, b[2] - a[2]);
        st.vx = ((b[0] - a[0]) / dt) * 16; st.vy = ((b[1] - a[1]) / dt) * 16;
        st.mode = "thrown";
        say(pick(["Wheee!", "Careful, I bounce!", "Again! Again!"]));
      }
    };
    const onClick = () => { if (moved) { moved = false; return; } toggleChat(); };
    body.addEventListener("pointerdown", onDown);
    body.addEventListener("pointermove", onMove);
    body.addEventListener("pointerup", onUp);
    body.addEventListener("click", onClick);

    // dot body
    const dots: { x: number; y: number; d: number }[] = [];
    const R = 30, sp = 5.2;
    for (let y = -R; y <= R; y += sp) for (let x = -R; x <= R; x += sp) {
      const d = (x * x) / (R * R) + (y * y) / (R * R * 0.86);
      if (d <= 1) dots.push({ x, y, d });
    }
    const draw = (t: number) => {
      const c = SIZE / 2, cy = c + 4;
      ctx.clearRect(0, 0, SIZE, SIZE);
      st.mood *= 0.98; st.hop *= 0.9;
      if (!reduce && t > st.nextBlink) { st.blink = 1; st.nextBlink = t + 2.5 + Math.random() * 3; }
      st.blink *= 0.78;
      const rect = { x: st.x + c, y: st.y + cy };
      const lx = st.open || reduce ? -0.6 : Math.max(-1, Math.min(1, (st.mx - rect.x) / 300));
      const ly = st.open || reduce ? -0.3 : Math.max(-1, Math.min(1, (st.my - rect.y) / 300));
      const breathe = reduce ? 0 : Math.sin(t * 2.2) * 0.03;
      const bounce = reduce ? 0 : -Math.abs(Math.sin(st.hop * Math.PI)) * 6;
      const eyeH = st.sleeping ? 0.6 : 7 * (1 - Math.min(1, st.blink * 1.6));
      const ex = lx * 5, ey = ly * 4 - 4;
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

    // behaviour
    let wanderT = 0;
    let perchEl: Element | null = null;
    const choose = (now: number) => {
      if (st.open || st.drag || st.mode === "thrown") return;
      const idle = now - st.lastMove;
      if (parked) { const p = parkPos(); st.tx = p.x; st.ty = p.y; return; }
      if (idle > IDLE_SLEEP_MS && !st.sleeping) { st.sleeping = true; root.classList.add("sleep"); }
      if (idle < 3500) {
        const ox = st.mx > innerWidth - 220 ? -130 : 60, oy = st.my > innerHeight - 200 ? -120 : 40;
        st.tx = clampX(st.mx + ox); st.ty = clampY(st.my + oy); perchEl = null;
      } else if (!st.sleeping && now > wanderT) {
        wanderT = now + 6000 + Math.random() * 4000;
        const hs = [...document.querySelectorAll("h2, .perch")].filter((h) => { const r = h.getBoundingClientRect(); return r.top > 100 && r.bottom < innerHeight - 60; });
        if (hs.length && Math.random() < 0.65) { perchEl = pick(hs); }
        else {
          perchEl = null;
          st.tx = clampX(80 + Math.random() * (innerWidth - 260)); st.ty = clampY(140 + Math.random() * (innerHeight - 300));
          if (Math.random() < 0.4) say(pick(["Just stretching my dots.", "Click me if you have a question!", "Scroll on, it gets better.", "Psst. Try dragging me."]));
        }
      }
      if (perchEl) {
        const r = perchEl.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) perchEl = null;
        else { st.tx = clampX(Math.min(r.right + 10, r.left + r.width / 2 + 160)); st.ty = clampY(r.top - SIZE + 18); }
      }
    };

    const place = () => {
      root.style.transform = `translate3d(${Math.round(st.x)}px,${Math.round(st.y)}px,0)`;
      root.classList.toggle("left", st.x > innerWidth / 2);
      if (root.classList.contains("talk")) {
        const bw = bubble.offsetWidth, cxp = st.x + SIZE / 2;
        const lft = Math.max(8, Math.min(innerWidth - bw - 8, cxp - bw / 2));
        bubble.style.left = lft - st.x + "px";
        bubble.style.setProperty("--tail", cxp - lft + "px");
        root.classList.toggle("below", st.y < 150);
      }
    };

    let raf = 0;
    const t0 = performance.now();
    let last = t0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(48, now - last) / 16; last = now;
      choose(now);
      if (st.open) {
        // chat open: dock bottom-right, ignore follow/throw physics
        const gx = clampX(innerWidth - SIZE - 24), gy = clampY(innerHeight - SIZE - 24);
        st.x += (gx - st.x) * 0.15; st.y += (gy - st.y) * 0.15;
        st.vx = st.vy = 0;
        if (Math.abs(gx - st.x) < 0.5 && Math.abs(gy - st.y) < 0.5) { st.x = gx; st.y = gy; }
      } else if (st.mode === "thrown") {
        st.vy += 0.6 * dt; st.x += st.vx * dt; st.y += st.vy * dt; st.vx *= 0.99;
        if (st.x < 16 || st.x > innerWidth - SIZE - 16) { st.vx *= -0.7; st.x = clampX(st.x); }
        if (st.y > innerHeight - SIZE - 16) {
          st.vy *= -0.55; st.y = innerHeight - SIZE - 16;
          if (Math.abs(st.vy) < 2) { st.mode = "follow"; st.lastMove = 0; }
        }
        if (st.y < 90) { st.vy = Math.abs(st.vy) * 0.6; st.y = 90; }
      } else if (!st.drag) {
        const k = st.sleeping ? 0.01 : 0.045;
        st.vx = (st.vx + (st.tx - st.x) * k) * 0.82; st.vy = (st.vy + (st.ty - st.y) * k) * 0.82;
        st.x += st.vx * dt; st.y += st.vy * dt;
      }
      const speed = Math.hypot(st.vx, st.vy), stretch = Math.min(0.18, speed / 60), ang = Math.atan2(st.vy, st.vx);
      body.style.transform = `rotate(${ang}rad) scale(${1 + stretch},${1 - stretch}) rotate(${-ang}rad)`;
      place();
      draw((now - t0) / 1000);
    };

    const onResize = () => {
      if (parked) { const p = parkPos(); st.x = st.tx = p.x; st.y = st.ty = p.y; place(); if (reduce) draw(0); }
      else { st.x = clampX(st.x); st.y = clampY(st.y); }
    };
    window.addEventListener("resize", onResize);

    if (reduce) { place(); draw(0); }       // static: no animation loop at all
    else raf = requestAnimationFrame(frame);

    // greeting, once per session
    let greeted = false;
    try { greeted = !!sessionStorage.getItem("logi_greeted"); sessionStorage.setItem("logi_greeted", "1"); } catch { /* ignore */ }
    const greetT = window.setTimeout(() => {
      if (greeted) return;
      say(touch ? "Hi! I'm Logi. Tap me if you need help." : "Hi! I'm Logi. I'll tag along. Click me to chat, drag me to move me.");
    }, 1800);

    // hover tips for call-to-action elements
    let lastHover: Element | null = null;
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-logi-hover]") ?? null;
      if (el && el !== lastHover && !st.open && Math.random() < 0.6) say((el as HTMLElement).dataset.logiHover ?? "", 2200);
      lastHover = el;
    };
    if (!touch) document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(greetT); window.clearTimeout(bubbleT);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseover", onOver);
      body.removeEventListener("pointerdown", onDown);
      body.removeEventListener("pointermove", onMove);
      body.removeEventListener("pointerup", onUp);
      body.removeEventListener("click", onClick);
    };
  }, [toggleChat]);

  // contextual tips: re-scan for [data-logi] whenever the route changes
  useEffect(() => {
    const st = S.current;
    let io: IntersectionObserver | undefined;
    const t = window.setTimeout(() => {
      io = new IntersectionObserver((ents) => ents.forEach((en) => {
        const k = (en.target as HTMLElement).dataset.logi;
        if (k && en.isIntersecting && !st.said[k]) { st.said[k] = 1; window.setTimeout(() => sayRef.current(k), 600); }
      }), { threshold: 0.45 });
      document.querySelectorAll("[data-logi]").forEach((el) => io!.observe(el));
    }, 900); // after the page transition mounts the new page
    return () => { window.clearTimeout(t); io?.disconnect(); };
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
          <b>Logi</b>
          <span>Logisaar assistant</span>
          <button type="button" className="logi-x" aria-label="Close chat" onClick={() => toggleChat(false)} tabIndex={open ? 0 : -1}>×</button>
        </header>
        <div className="logi-log" ref={logRef} aria-live="polite">
          {msgs.map((m) => (
            <div key={m.id} className={`logi-m ${m.who}`}>
              {m.text}
              {m.link && (m.link.to ? (
                <><br /><Link to={m.link.to} onClick={() => { if (S.current.touch) toggleChat(false); }}>{m.link.label} →</Link></>
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
