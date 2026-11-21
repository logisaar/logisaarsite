import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

/**
 * Shared kit for the product demos (Solutions explorer, home bento, detail pages).
 *
 * - The demo is laid out at its native desktop size (W x H, in rem so a 200% root font still fits) and the whole
 *   frame is scaled with transform to fit its column. That is how launch pages show product UI.
 * - It is aria-hidden; the figure carries a visually hidden description.
 * - The first painted frame is always a complete, populated screen. The GSAP timeline then changes it.
 * - One timeline per demo. It plays only while the demo is on screen, the tab is visible and `active` is true.
 * - Reduced motion: no timeline runs; the timeline is built and parked on its final (populated) state.
 * - Only transform and opacity animate.
 */

export interface Crop { x: number; y: number; w: number; h: number }

interface Ctx { scale: number; rem: number }
const ScaleCtx = createContext<Ctx>({ scale: 1, rem: 1 });
export const useDemoScale = () => useContext(ScaleCtx);

interface ShellProps {
  /** native size in px at a 16px root */
  w: number;
  h: number;
  /** URL shown in the browser pill, e.g. "app.example.com/orders" */
  url: string;
  /** text for assistive tech */
  label: string;
  /** show only this native-size rectangle (used by the small home cards) */
  crop?: Crop;
  /** hide the browser chrome (title bar) */
  bare?: boolean;
  className?: string;
  children: (api: { root: RefObject<HTMLDivElement> }) => ReactNode;
}

export const DemoShell = ({ w, h, url, label, crop, bare, className = "", children }: ShellProps) => {
  const box = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [ctx, setCtx] = useState<Ctx>({ scale: 0.5, rem: 1 });

  const chrome = bare ? 0 : 40; // title bar height in native px
  const view = crop ?? { x: 0, y: 0, w, h: h + chrome };

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const rem = (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16) / 16;
      const cw = el.clientWidth;
      if (cw > 0) setCtx({ scale: cw / (view.w * rem), rem });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [view.w]);

  return (
    <figure role="img" aria-label={label} className={`m-0 w-full ${className}`}>
      <div
        ref={box}
        className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(15,23,42,0.18)]"
        style={{ aspectRatio: `${view.w} / ${view.h}` }}
      >
        <div
          ref={root}
          aria-hidden="true"
          className="demo-root absolute left-0 top-0 origin-top-left select-none text-slate-800"
          style={{
            width: `${w * ctx.rem}px`,
            height: `${(h + chrome) * ctx.rem}px`,
            transform: `translate(${-view.x * ctx.scale * ctx.rem}px, ${-view.y * ctx.scale * ctx.rem}px) scale(${ctx.scale})`,
            fontSize: "1rem",
            lineHeight: 1.4,
          }}
        >
          <ScaleCtx.Provider value={ctx}>
            {!bare && (
              <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-4" style={{ height: `${chrome * ctx.rem}px` }}>
                <span className="flex gap-1.5">
                  <i className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <i className="block h-3 w-3 rounded-full bg-[#febc2e]" />
                  <i className="block h-3 w-3 rounded-full bg-[#28c840]" />
                </span>
                <span className="mx-auto flex h-6 w-[22rem] items-center justify-center rounded-md bg-white text-[0.6875rem] text-slate-500 shadow-[inset_0_0_0_1px_rgb(226,232,240)]">{url}</span>
                <span className="rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[0.6875rem] font-medium text-slate-500">Sample</span>
              </div>
            )}
            <div className="relative" style={{ height: `${h * ctx.rem}px` }}>
              {children({ root })}
            </div>
          </ScaleCtx.Provider>
        </div>
      </div>
    </figure>
  );
};

/** position of el inside the demo root, in the demo's native (unscaled) rem-based pixels */
export const relPos = (root: HTMLElement, el: Element, ax = 0.5, ay = 0.5) => {
  const r = root.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  const s = r.width / root.offsetWidth || 1;
  return { x: (b.left - r.left + b.width * ax) / s, y: (b.top - r.top + b.height * ay) / s };
};

/** Types `text` into el over `dur` seconds starting at `at`. */
export const typeInto = (tl: gsap.core.Timeline, el: Element | null, text: string, at: number, dur: number) => {
  if (!el) return;
  const o = { n: 0 };
  tl.set(el, { textContent: "" }, at > 0 ? 0 : at);
  tl.to(o, { n: text.length, duration: dur, ease: "none", onUpdate: () => { el.textContent = text.slice(0, Math.round(o.n)); } }, at);
  // keep the final text if the timeline is parked at the end
  tl.set(el, { textContent: text }, at + dur);
};

/** Streams text word by word. */
export const streamInto = (tl: gsap.core.Timeline, el: Element | null, text: string, at: number, dur: number) => {
  if (!el) return;
  const words = text.split(" ");
  const o = { n: 0 };
  tl.set(el, { textContent: "" }, 0);
  tl.to(o, { n: words.length, duration: dur, ease: "none", onUpdate: () => { el.textContent = words.slice(0, Math.round(o.n)).join(" "); } }, at);
  tl.set(el, { textContent: text }, at + dur);
};

interface LoopOpts {
  /** build the timeline; the DOM as rendered is the populated first frame */
  build: (tl: gsap.core.Timeline, root: HTMLElement, q: (sel: string) => HTMLElement, utils: { scale: () => number }) => void;
  /** pause when false (e.g. the Solutions explorer shows another service) */
  active?: boolean;
  repeatDelay?: number;
}

/** One GSAP timeline per demo: plays while visible + tab visible + active; parked on the final state under reduced motion. */
export const useDemoLoop = (root: RefObject<HTMLDivElement>, { build, active = true, repeatDelay = 2.2 }: LoopOpts) => {
  const reduce = useReducedMotion();
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const visible = useRef(false);
  const buildRef = useRef(build);
  buildRef.current = build;
  const { scale } = useDemoScale();
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const sync = useCallback(() => {
    const tl = tlRef.current;
    if (!tl || reduce) return;
    if (visible.current && !document.hidden && active) tl.play(); else tl.pause();
  }, [active, reduce]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, repeat: reduce ? 0 : -1, repeatDelay, defaults: { ease: "expo.out" } });
      const q = (sel: string) => el.querySelector(sel) as HTMLElement;
      buildRef.current(tl, el, q, { scale: () => scaleRef.current });
      if (reduce) tl.progress(1).pause();
      tlRef.current = tl;
    }, el);
    return () => { ctx.revert(); tlRef.current = null; };
  }, [root, reduce, repeatDelay]);

  // restart from the populated first frame whenever the demo becomes active
  const wasActive = useRef(active);
  useEffect(() => {
    if (active && !wasActive.current && tlRef.current && !reduce) tlRef.current.restart();
    wasActive.current = active;
    sync();
  }, [active, reduce, sync]);

  useEffect(() => {
    const el = root.current;
    if (!el || reduce || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; sync(); }, { threshold: 0.2 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, [root, reduce, sync]);
};

/** The pointer used by every demo. Starts parked at the lower right of the frame. */
export const Cursor = ({ x = 900, y = 600 }: { x?: number; y?: number }) => (
  <svg data-cursor width="22" height="22" viewBox="0 0 24 24" className="pointer-events-none absolute left-0 top-0 z-50 drop-shadow-[0_2px_3px_rgba(15,23,42,0.35)]" style={{ transform: `translate(${x}px, ${y}px)` }}>
    <path d="M5 3l14 8-6.2 1.6L9.6 19 5 3z" fill="#0f172a" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const Avatar = ({ name, tone = "bg-emerald-100 text-emerald-800", size = "h-7 w-7 text-[0.6875rem]" }: { name: string; tone?: string; size?: string }) => (
  <span className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${tone} ${size}`}>{name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</span>
);

/** tiny inline sparkline */
export const Spark = ({ pts, tone = "#00A152" }: { pts: number[]; tone?: string }) => {
  const max = Math.max(...pts), min = Math.min(...pts);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 100} ${28 - ((p - min) / (max - min || 1)) * 24}`).join(" ");
  return (
    <svg viewBox="0 0 100 32" className="h-8 w-24" preserveAspectRatio="none">
      <path d={d} fill="none" stroke={tone} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

export const Pill = ({ tone, children, ...rest }: { tone: "green" | "amber" | "slate" | "blue" | "red"; children: ReactNode } & React.HTMLAttributes<HTMLSpanElement>) => {
  const t = { green: "bg-emerald-50 text-emerald-700 ring-emerald-200", amber: "bg-amber-50 text-amber-700 ring-amber-200", slate: "bg-slate-100 text-slate-600 ring-slate-200", blue: "bg-sky-50 text-sky-700 ring-sky-200", red: "bg-rose-50 text-rose-700 ring-rose-200" }[tone];
  return <span {...rest} className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold ring-1 ring-inset ${t} ${rest.className ?? ""}`}>{children}</span>;
};
