import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll choreography contract (round 9).
 *
 *  - `reveal`   one-shot entrance, plays once when the element's top crosses 70% of the viewport.
 *  - `sequence` multi-step story. Desktop: the section is pinned and scrubbed, and reaches its final state before
 *               the pin releases. Below 64em (or when the section does not fit the viewport): no pin, a time-based
 *               timeline that starts when the section is at least 60% visible, pauses when it leaves and restarts
 *               from step 1 when it re-enters.
 *  - `loop`     ambient loop: starts at 60% visible, pauses off-screen or when the tab is hidden, restarts from the
 *               populated first frame.
 *  - A scrubbed animation never spans the element entering or leaving the viewport.
 *  - Reduced motion: nothing is hidden, nothing pins, nothing loops. The helpers do not run, so callers must leave
 *    the DOM in its final state and only apply start states inside `build`.
 */

export const DESKTOP_QUERY = "(min-width: 64em)";
/** Framer Motion equivalent of `start: "top 70%"`: use as `viewport={REVEAL_VIEWPORT}` or `useInView(ref, REVEAL_VIEWPORT)`. */
export const REVEAL_VIEWPORT = { once: true, margin: "0px 0px -30% 0px" } as const;
export const EXPO_OUT = "expo.out";
/** Scroll distance of one step while pinned, as a percentage of the viewport height. */
export const STEP_PERCENT = 45;
/** Extra pinned distance at the end, as a fraction of the sequence, so the final state stays on screen. */
export const HOLD = 0.22;
/** Seconds one step lasts in the unpinned, time-based mode. */
export const STEP_SECONDS = 1.6;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Minimum gap (px) between the header and a pinned block. */
const PIN_GAP = 16;
/** Header height in px, read from `--header-h` (stable: the header's own rect moves while the top bar scrolls away). */
const headerH = () => {
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;height:var(--header-h)";
  document.body.appendChild(probe);
  const h = probe.getBoundingClientRect().height;
  probe.remove();
  return h || (document.querySelector("header")?.getBoundingClientRect().bottom ?? 0);
};

/* ------------------------------------------------------------------ trace (QA) */

type TraceEntry = { name: string; kind: "sequence" | "reveal"; st: ScrollTrigger; tl?: gsap.core.Timeline; mode?: "pinned" | "timed" };
declare global {
  interface Window {
    __scrollTrace?: TraceEntry[];
  }
}
const trace = (e: TraceEntry) => {
  if (typeof window === "undefined") return;
  (window.__scrollTrace ||= []).push(e);
};
const untrace = (st: ScrollTrigger) => {
  if (window.__scrollTrace) window.__scrollTrace = window.__scrollTrace.filter((e) => e.st !== st);
};

/* ------------------------------------------------------------------ reveal */

export type RevealOpts = { y?: number; x?: number; scale?: number; delay?: number; stagger?: number; duration?: number; name?: string };

/**
 * One-shot entrance. Call inside `useLayoutEffect` / `useEffect` and return the cleanup.
 * Elements that start past the 70% line (deep links, reloads) play straight away.
 */
export const reveal = (targets: gsap.TweenTarget, opts: RevealOpts = {}, trigger?: Element | null) => {
  if (prefersReducedMotion()) return () => {};
  const { y = 24, x = 0, scale = 1, delay = 0, stagger = 0, duration = 0.7, name = "reveal" } = opts;
  const first = (Array.isArray(targets) ? targets[0] : targets) as Element | string;
  const trig = trigger ?? (typeof first === "string" ? document.querySelector(first) : (first as Element));
  if (!trig) return () => {};
  const tween = gsap.from(targets, {
    opacity: 0, y, x, scale, delay, stagger, duration, ease: EXPO_OUT, overwrite: "auto", clearProps: "transform,opacity",
    scrollTrigger: { trigger: trig, start: "top 70%", once: true },
  });
  const st = tween.scrollTrigger!;
  trace({ name, kind: "reveal", st });
  return () => { untrace(st); tween.scrollTrigger?.kill(); tween.kill(); };
};

/** One `reveal` per matching element inside `root` (each triggers on its own top), with a small stagger inside a row. */
export const revealAll = (root: ParentNode | null, selector: string, opts: RevealOpts & { filter?: (el: Element) => boolean } = {}) => {
  if (!root || prefersReducedMotion()) return () => {};
  const { filter, ...rest } = opts;
  const stops: (() => void)[] = [];
  const seen = new Map<number, number>();
  Array.from(root.querySelectorAll(selector)).filter((el) => !filter || filter(el)).forEach((el) => {
    const row = Math.round(el.getBoundingClientRect().top + window.scrollY);
    const n = seen.get(row) ?? 0;
    seen.set(row, n + 1);
    stops.push(reveal(el, { ...rest, delay: Math.min(n, 5) * 0.06 }));
  });
  return () => stops.forEach((f) => f());
};

/* ------------------------------------------------------------------ sequence */

export type SequenceOpts = {
  name: string;
  steps: number;
  /** Element that gets pinned (default: `section`). */
  pinEl?: HTMLElement | null;
  /** Add the step animations. One unit of timeline time is one step, so label step `i` at `i`. */
  build?: (tl: gsap.core.Timeline) => void;
  /** Called with the active step index (0..steps-1) whenever it changes. */
  onStep?: (i: number) => void;
  /** Never pin; always use the time-based mode. */
  noPin?: boolean;
};

export type SequenceHandle = {
  kill: () => void;
  /** Scroll (pinned) or seek (timed) to a step. Resolves to the page Y for the pinned mode. */
  goTo: (i: number) => void;
  /** Page Y of the start of step `i` while pinned, or null when not pinned. */
  yOf: (i: number) => number | null;
};

/** Pinned distance exactly: the timeline is `steps + HOLD*steps` long, so step i starts at i / (steps*(1+HOLD)). */
const boundaries = (steps: number) => {
  const total = steps * (1 + HOLD);
  return Array.from({ length: steps + 1 }, (_, i) => (i >= steps ? 1 : i / total));
};

export const sequence = (section: HTMLElement | null, opts: SequenceOpts): SequenceHandle => {
  const none: SequenceHandle = { kill: () => {}, goTo: () => {}, yOf: () => null };
  if (!section || prefersReducedMotion()) return none;
  const { name, steps, build, onStep, noPin } = opts;
  const pinEl = opts.pinEl ?? section;

  let ctx: gsap.Context | null = null;
  let io: IntersectionObserver | null = null;
  let st: ScrollTrigger | null = null;
  let tlRef: gsap.core.Timeline | null = null;
  let mode: "pinned" | "timed" = "timed";
  let lastStep = -1;
  let killed = false;
  let resizeT = 0;

  const emit = (i: number) => {
    const k = Math.max(0, Math.min(steps - 1, i));
    if (k !== lastStep) { lastStep = k; onStep?.(k); }
  };

  const desiredMode = (): "pinned" | "timed" => {
    if (noPin || !window.matchMedia(DESKTOP_QUERY).matches) return "timed";
    // a section taller than the space under the header cannot be pinned without clipping: play it timed instead
    return pinEl.offsetHeight <= window.innerHeight - headerH() - PIN_GAP ? "pinned" : "timed";
  };

  const setup = () => {
    mode = desiredMode();
    lastStep = -1;
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      tlRef = tl;
      tl.to({}, { duration: steps }, 0); // fixes the length even when `build` adds nothing
      build?.(tl);
      tl.to({}, { duration: steps * HOLD }, steps); // the final state stays for ~15% of the pinned distance

      if (mode === "pinned") {
        const h = pinEl.offsetHeight;
        const startFn = () => {
          const avail = window.innerHeight - headerH();
          const pad = Math.max(PIN_GAP, (avail - h) / 2);
          return `top top+=${headerH() + pad}`;
        };
        const b = boundaries(steps);
        st = ScrollTrigger.create({
          animation: tl,
          trigger: pinEl,
          pin: true,
          start: startFn,
          end: () => `+=${Math.round(steps * (1 + HOLD) * STEP_PERCENT * (window.innerHeight / 100))}`,
          scrub: 0.5,
          snap: { snapTo: b, duration: 0.3, ease: "power1.inOut" },
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => emit(Math.floor(Math.min(0.999999, self.progress * (1 + HOLD)) * steps)),
        });
      } else {
        tl.timeScale(1 / STEP_SECONDS);
        tl.eventCallback("onUpdate", () => emit(Math.floor(Math.min(steps - 1e-6, tl.time()))));
        let visible = false;
        io = new IntersectionObserver(
          ([e]) => {
            const vh = window.innerHeight;
            const on = e.intersectionRatio >= 0.6 || e.intersectionRect.height >= vh * 0.6;
            const gone = !e.isIntersecting;
            if (on && !visible) { visible = true; tl.restart(); }
            else if (gone && visible) { visible = false; tl.pause(0); emit(0); }
          },
          { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
        );
        io.observe(section);
        // a hidden tab pauses the clock; it resumes where it was
        document.addEventListener("visibilitychange", onVis);
        st = ScrollTrigger.create({ trigger: section, start: "top bottom", end: "bottom top" }); // for the QA trace only
      }
      if (st) trace({ name, kind: "sequence", st, tl, mode });
    }, section);
  };

  const onVis = () => { if (document.hidden) tlRef?.pause(); else if (mode === "timed" && tlRef && tlRef.time() > 0 && tlRef.time() < tlRef.duration()) tlRef.resume(); };

  const teardown = () => {
    if (st) untrace(st);
    io?.disconnect(); io = null;
    document.removeEventListener("visibilitychange", onVis);
    ctx?.revert(); ctx = null; st = null; tlRef = null;
  };

  setup();

  // a different viewport height can change whether the section fits: rebuild when the mode flips
  const onResize = () => {
    window.clearTimeout(resizeT);
    resizeT = window.setTimeout(() => {
      if (killed || desiredMode() === mode) return;
      teardown(); setup(); ScrollTrigger.refresh();
    }, 250);
  };
  window.addEventListener("resize", onResize);

  return {
    kill: () => { killed = true; window.clearTimeout(resizeT); window.removeEventListener("resize", onResize); teardown(); },
    yOf: (i) => {
      if (mode !== "pinned" || !st) return null;
      return st.start + (boundaries(steps)[Math.max(0, Math.min(steps - 1, i))]) * (st.end - st.start);
    },
    goTo: (i) => {
      if (mode === "pinned" && st) {
        const y = st.start + boundaries(steps)[Math.max(0, Math.min(steps - 1, i))] * (st.end - st.start);
        window.scrollTo({ top: y, behavior: "smooth" });
      } else if (tlRef) {
        tlRef.pause(Math.max(0, Math.min(steps - 1, i)));
      }
    },
  };
};

/* ------------------------------------------------------------------ loop */

/**
 * Ambient loop (demos, tickers). `timeline` must be built paused and populated by its first frame.
 * Starts at 60% visible, pauses when off-screen or when the tab is hidden, restarts from the first frame on re-entry.
 * Reduced motion: never plays (the caller shows the parked final state).
 */
export const loop = (el: Element | null, timeline: gsap.core.Timeline | { play: (from?: number) => unknown; pause: (t?: number) => unknown; resume?: () => unknown }) => {
  if (!el || prefersReducedMotion()) return () => {};
  let visible = false;
  const io = new IntersectionObserver(
    ([e]) => {
      const on = e.intersectionRatio >= 0.6 || e.intersectionRect.height >= window.innerHeight * 0.6;
      if (on && !visible) { visible = true; timeline.play(0); }
      else if (!e.isIntersecting && visible) { visible = false; timeline.pause(0); }
    },
    { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
  );
  io.observe(el);
  const onVis = () => {
    if (document.hidden) timeline.pause();
    else if (visible) (timeline.resume ?? (() => timeline.play()))();
  };
  document.addEventListener("visibilitychange", onVis);
  return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); timeline.pause(0); };
};

/** Same visibility rule for non-GSAP loops (React state, intervals): calls `on(true)` at 60% visible and `on(false)` when off-screen or hidden. */
export const whenVisible = (el: Element | null, on: (visible: boolean) => void) => {
  if (!el || prefersReducedMotion()) return () => {};
  let visible = false;
  const set = (v: boolean) => { if (v !== visible) { visible = v; on(v); } };
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.intersectionRatio >= 0.6 || e.intersectionRect.height >= window.innerHeight * 0.6) set(!document.hidden);
      else if (!e.isIntersecting) set(false);
    },
    { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
  );
  io.observe(el);
  const onVis = () => { if (document.hidden) set(false); };
  document.addEventListener("visibilitychange", onVis);
  return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); on(false); };
};
