import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { answer, MAIN_OPTIONS, type LogiReply } from "./answers";
import "./logi.css";

/**
 * Logi, Logisaar's plush site companion (art in /public/logi; licence and attribution: THIRD_PARTY_NOTICES.md).
 *
 * Dock: Logi lives in one fixed spot, bottom-right, on every page and width. It never walks and never follows the
 * cursor. Clicking it opens the chat (this is the only chat toggle).
 * Tour: every element with data-logi="line" is a stop. When scrolling settles, the stop holding the middle of the
 * viewport shows its line in a bubble above the dock for about 4s, unless the bubble would touch a demo, phone, form
 * or pinned stage (data-logi-avoid, data-demo, data-pinned, form), in which case it stays quiet.
 * States (data-state on #logi, animated in logi.css): idle, talking, thinking, happy, sleeping. Plus blink and hop.
 * Reduced motion: no tour, no loops; visible, clickable, chat works.
 */

const SLEEP_MS = 25000;

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

  // ── engine: fixed dock, idle life, bubble-only tour ─────────────────────
  useEffect(() => {
    const root = rootRef.current!, bubble = bubbleRef.current!;
    const st = S.current;
    st.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sync = () => {
      const now = performance.now();
      const state = st.sleeping ? "sleeping"
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
      bubble.textContent = text;
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
        <div className="logi-bubble" ref={bubbleRef} aria-live="polite" />
        <button
          ref={bodyRef}
          className="logi-body"
          type="button"
          aria-label="Chat with Logi, the Logisaar assistant"
          aria-expanded={open}
          aria-controls="logi-chat"
          onClick={() => toggleChat()}
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
