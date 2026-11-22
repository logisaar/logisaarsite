import { useEffect, useLayoutEffect, useRef, useState, type MutableRefObject } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/company";
import { ServiceDemo } from "@/components/demos";
import { sequence, type SequenceHandle } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

type Service = (typeof SERVICES)[number];

/** Brand-only tints behind the demo frame: green-50, emerald-50, teal-50, slate-50. */
const TINTS = ["#f0fdf4", "#ecfdf5", "#f0fdfa", "#f8fafc"];
const EXPO = "expo.out";

const BTN = "h-auto min-h-[2.75rem] whitespace-normal rounded-full border-0 bg-primary px-6 font-semibold text-primary-on hover:bg-primary/90";
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--focus-ring))]";

/** matchMedia as state; the site is a client-rendered SPA, so reading it on first render is safe. */
const useMinWidth = (query: string) => {
  const [on, setOn] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const fn = () => setOn(m.matches);
    fn();
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, [query]);
  return on;
};

const Lists = ({ s, compact = false }: { s: Service; compact?: boolean }) => (
  <>
    <h4 className="font-display text-body font-bold text-foreground">Typical examples</h4>
    <ul className="mt-2 flex flex-wrap gap-2">
      {s.examples.map((e) => (
        <li key={e} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-body-sm text-foreground">
          {e}
        </li>
      ))}
    </ul>
    <h4 className={`${compact ? "mt-3" : "mt-5"} font-display text-body font-bold text-foreground`}>What you get</h4>
    <ul className={`mt-2 ${compact ? "space-y-1" : "space-y-2"}`}>
      {s.deliverables.map((e) => (
        <li key={e} className="flex items-start gap-2 text-body-sm text-muted-foreground">
          <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-primary-ink" />
          {e}
        </li>
      ))}
    </ul>
  </>
);

const Cta = ({ s, compact = false }: { s: Service; compact?: boolean }) => (
  <Button asChild className={`${BTN} ${compact ? "mt-4" : "mt-6"}`}>
    <Link to="/contact">
      Discuss your project<span className="sr-only"> ({s.name})</span>
    </Link>
  </Button>
);

const Details = ({ s, fold = false, compact = false }: { s: Service; fold?: boolean; compact?: boolean }) => (
  <>
    <p className="text-body text-muted-foreground">{s.desc}</p>
    {/* TODO(owner): confirm the examples and deliverables for each service. */}
    {fold ? (
      <details className="group mt-4 rounded-xl border border-border bg-card">
        <summary className="flex min-h-[2.75rem] cursor-pointer list-none items-center justify-between gap-3 px-4 text-body-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
          Typical examples and what you get
          <ChevronDown size={16} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
        </summary>
        <div className="px-4 pb-4 pt-1">
          <Lists s={s} />
        </div>
      </details>
    ) : (
      <div className={compact ? "mt-3" : "mt-5"}>
        <Lists s={s} compact={compact} />
      </div>
    )}
    <Cta s={s} compact={compact} />
  </>
);

type Els = MutableRefObject<(HTMLElement | null)[]>;

/**
 * Drives the service-to-service transitions. Every frame is mounted and stacked; the inactive ones are hidden.
 * Each transition is one GSAP timeline (transform, opacity and clip-path only). `k` shortens it for phones.
 * The same timeline plays in reverse direction when the index goes down.
 */
const useServiceTransitions = (active: number, frames: Els, panels: Els, tints: Els, k = 1) => {
  const prev = useRef(active);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // first paint: only the first service is shown
    frames.current.forEach((f, i) => f && gsap.set(f, { autoAlpha: i === active ? 1 : 0 }));
    panels.current.forEach((f, i) => f && gsap.set(f, { autoAlpha: i === active ? 1 : 0 }));
    tints.current.forEach((f, i) => f && gsap.set(f, { opacity: i === active ? 1 : 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hard-set the resting state for service `idx`: the active text, frame and tint fully opaque, the rest hidden.
  // Run when a transition ends and whenever one is interrupted, so a fast scroll or snap can never leave text mid-fade.
  const settle = (idx: number) => {
    frames.current.forEach((f, i) => {
      if (!f) return;
      gsap.set(f, { autoAlpha: i === idx ? 1 : 0, opacity: i === idx ? 1 : 0, clearProps: "clipPath,scale,zIndex" });
      gsap.set(Array.from(f.querySelectorAll("[data-n]")), { clearProps: "y,scale,opacity" });
    });
    panels.current.forEach((p, i) => {
      if (!p) return;
      gsap.set(p, { autoAlpha: i === idx ? 1 : 0, y: 0 });
      gsap.set(p.querySelectorAll("[data-name-in]"), { yPercent: 0 });
      gsap.set(p.querySelectorAll("[data-body-in], [data-num-in]"), { opacity: 1, y: 0, yPercent: 0 });
    });
    tints.current.forEach((t, i) => t && gsap.set(t, { opacity: i === idx ? 1 : 0 }));
  };

  useEffect(() => {
    const from = prev.current;
    if (from === active) return;
    prev.current = active;
    const fo = frames.current[from], fi = frames.current[active];
    const po = panels.current[from], pi = panels.current[active];
    if (!fo || !fi || !po || !pi) return;
    const fwd = active > from;
    // finish a running transition so the next one starts from a clean state
    if (tlRef.current) { tlRef.current.kill(); settle(from); }
    const d = 0.75 * k;
    const tl = gsap.timeline({ defaults: { ease: EXPO, duration: d }, onComplete: () => settle(active) });
    tlRef.current = tl;

    // backdrop tint
    tl.to(tints.current[from], { opacity: 0 }, 0).to(tints.current[active], { opacity: 1 }, 0);

    // text: number, name (line-masked), body
    const nm = pi.querySelectorAll("[data-name-in]"), body = pi.querySelectorAll("[data-body-in]"), num = pi.querySelectorAll("[data-num-in]");
    tl.to(po, { autoAlpha: 0, y: fwd ? -16 : 16, duration: d * 0.45 }, 0);
    tl.fromTo(pi, { autoAlpha: 0, y: fwd ? 16 : -16 }, { autoAlpha: 1, y: 0, duration: d * 0.6 }, d * 0.25);
    tl.fromTo(nm, { yPercent: 105 }, { yPercent: 0 }, d * 0.25);
    tl.fromTo(num, { yPercent: fwd ? 60 : -60, opacity: 0 }, { yPercent: 0, opacity: 1 }, d * 0.2);
    tl.fromTo(body, { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.06 }, d * 0.4);

    // frame: a different move for each pair of services
    gsap.set(fi, { zIndex: 2 });
    gsap.set(fo, { zIndex: 1 });
    const lo = Math.min(from, active), hi = Math.max(from, active);
    const pair = lo * 10 + hi;
    if (pair === 1) {
      // the browser frame wipes into the three-column inbox
      tl.fromTo(
        fi,
        { autoAlpha: 1, opacity: 1, clipPath: fwd ? "inset(0 0 0 100% round 1rem)" : "inset(0 100% 0 0 round 1rem)", scale: 0.96 },
        { clipPath: "inset(0 0 0 0 round 1rem)", scale: 1 },
        0,
      );
      tl.to(fo, { scale: 1.03, opacity: 0.6 }, 0);
    } else if (pair === 12) {
      // zoom out, the canvas grid fades in and nodes drop in on a stagger
      tl.to(fo, { scale: 0.93, opacity: 0, duration: d * 0.8 }, 0);
      tl.fromTo(fi, { autoAlpha: 1, scale: fwd ? 1.06 : 0.94, opacity: 0 }, { scale: 1, opacity: 1 }, d * 0.1);
      if (fwd) tl.fromTo(fi.querySelectorAll("[data-n]"), { y: -28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: d * 0.8, ease: "back.out(1.4)" }, d * 0.2);
    } else if (pair === 23) {
      // nodes collapse, the document layout expands from the centre
      if (fwd) tl.to(fo.querySelectorAll("[data-n]"), { scale: 0.2, opacity: 0, stagger: 0.04, duration: d * 0.6 }, 0);
      tl.to(fo, { opacity: 0, scale: fwd ? 0.9 : 1.06 }, d * (fwd ? 0.25 : 0));
      tl.fromTo(fi, { autoAlpha: 1, opacity: 1, scale: 1, clipPath: "inset(30% 30% 30% 30% round 1rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1rem)" }, d * 0.2);
    } else {
      tl.to(fo, { opacity: 0, scale: 0.96, duration: d * 0.6 }, 0);
      tl.fromTo(fi, { autoAlpha: 1, opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1 }, d * 0.15);
    }
    tl.add(() => {
      gsap.set(fo, { autoAlpha: 0, clearProps: "clipPath,scale,zIndex,opacity" });
      gsap.set(fo, { autoAlpha: 0 });
      gsap.set(fi, { clearProps: "clipPath,zIndex,scale" });
      gsap.set([fo, fi].flatMap((f) => Array.from(f.querySelectorAll("[data-n]"))), { clearProps: "y,scale,opacity" });
    }, d * 1.02);
  }, [active, k, frames, panels, tints]);

  useEffect(() => () => { tlRef.current?.kill(); }, []);
};

/**
 * One service's text block in the pinned stage. Everything must fit in the stage height (100svh - header) at 1280x720:
 * title, promise, then the CTA directly under it, then the description, example chips and a two-column deliverables list.
 */
const PanelText = ({ s }: { s: Service }) => (
  <>
    <h3 className="overflow-hidden font-display text-h2-page font-bold leading-tight text-foreground">
      <span data-name-in className="block">{s.name}</span>
    </h3>
    <p data-body-in className="mt-2 font-display text-lead font-semibold text-primary-ink">{s.promise}</p>
    <div data-body-in>
      <Cta s={s} compact />
    </div>
    {/* TODO(owner): confirm the examples and deliverables for each service. */}
    <p data-body-in className="mt-4 text-body-sm text-muted-foreground">{s.desc}</p>
    <ul data-body-in className="mt-3 flex max-h-[4.75rem] flex-wrap gap-1.5 overflow-hidden">
      {s.examples.map((e) => (
        <li key={e} className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-body-sm text-foreground">{e}</li>
      ))}
    </ul>
    <h4 data-body-in className="mt-3 font-display text-body-sm font-bold text-foreground">What you get</h4>
    <ul data-body-in className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
      {s.deliverables.map((e) => (
        <li key={e} className="flex items-start gap-1.5 text-body-sm text-muted-foreground">
          <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-primary-ink" />
          {e}
        </li>
      ))}
    </ul>
  </>
);

/** Desktop: the stage is pinned by `sequence()` (4 steps, snap to each) and swaps the service at every step. */
const Pinned = () => {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frames = useRef<(HTMLElement | null)[]>([]);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const tints = useRef<(HTMLElement | null)[]>([]);
  const fill = useRef<HTMLSpanElement>(null);
  const handle = useRef<SequenceHandle | null>(null);
  const n = SERVICES.length;

  useServiceTransitions(active, frames, panels, tints);

  useLayoutEffect(() => {
    const h = sequence(track.current, {
      name: "solutions-stage",
      steps: n,
      pinEl: stage.current,
      noPin: false,
      onStep: setActive,
      build: (tl) => { if (fill.current) tl.fromTo(fill.current, { scaleX: 1 / n }, { scaleX: 1, duration: n - 1, ease: "none" }, 0); },
    });
    handle.current = h;
    // a #service link (hero jump bar, footer, shared URL) scrolls to that step
    const idx = (href: string | null) => SERVICES.findIndex((s) => `#${s.id}` === href);
    const jump = (i: number, smooth = true) => {
      const y = h.yOf(i);
      if (y !== null) window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']");
      const i = a ? idx(a.getAttribute("href")) : -1;
      if (i >= 0 && h.yOf(i) !== null) { e.preventDefault(); history.replaceState(null, "", `#${SERVICES[i].id}`); jump(i); }
    };
    document.addEventListener("click", onClick);
    const first = idx(window.location.hash);
    const t = first > 0 ? window.setTimeout(() => { ScrollTrigger.refresh(); jump(first, false); }, 120) : 0;
    return () => { window.clearTimeout(t); document.removeEventListener("click", onClick); h.kill(); };
  }, [n]);

  const cur = SERVICES[active];
  return (
    <div ref={track} className="relative" style={{ ["--stage-h" as string]: "min(46rem, calc(100svh - var(--header-h) - 1rem))" }}>
      <div ref={stage} data-logi-dock data-cur={cur.id} className="grid grid-cols-12 items-center gap-x-12" style={{ height: "var(--stage-h)" }}>
        <div className="col-span-5 flex flex-col justify-center">
          {/* the one step indicator: 01 / 04 with a progress bar */}
          <div className="mb-3 flex items-center gap-3" aria-hidden="true">
            <p className="flex items-baseline gap-1.5 font-display text-body font-bold text-foreground">
              {String(active + 1).padStart(2, "0")}
              <span className="text-body-sm font-semibold text-muted-foreground">/ {String(n).padStart(2, "0")}</span>
            </p>
            <span className="relative h-0.5 w-24 overflow-hidden rounded-full bg-border">
              <span ref={fill} className="absolute inset-0 block origin-left bg-primary-ink will-change-transform" style={{ transform: `scaleX(${(active + 1) / n})` }} />
            </span>
          </div>
          {/* keyboard route to every step (visible on focus) */}
          <nav aria-label="Services" className="sr-only focus-within:not-sr-only focus-within:mb-2">
            <ul className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={`inline-flex min-h-[2.75rem] items-center rounded-full border border-border px-3 text-body-sm font-semibold text-foreground ${FOCUS}`}>{s.name}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid">
            {SERVICES.map((s, i) => (
              <div key={s.id} ref={(el) => (panels.current[i] = el)} className="col-start-1 row-start-1" {...(i !== active ? ({ inert: "" } as object) : {})}>
                <PanelText s={s} />
              </div>
            ))}
          </div>
        </div>
        <div className="relative col-span-7 self-center">
          {TINTS.map((c, i) => (
            <div key={c} ref={(el) => (tints.current[i] = el)} aria-hidden="true" className="absolute -inset-5 rounded-[2rem] border border-slate-200/70" style={{ background: c }} />
          ))}
          <div className="relative grid">
            {SERVICES.map((s, i) => (
              <div key={s.id} ref={(el) => (frames.current[i] = el)} className="col-start-1 row-start-1">
                <ServiceDemo id={s.id} active={i === active} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Tablet and phone: a swipeable tab switcher above one demo frame; same transitions, shorter. */
const Tabs = () => {
  const [active, setActive] = useState(0);
  const frames = useRef<(HTMLElement | null)[]>([]);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const tints = useRef<(HTMLElement | null)[]>([]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<number | null>(null);
  const n = SERVICES.length;
  useServiceTransitions(active, frames, panels, tints, 0.55);

  const go = (i: number, focus = false) => {
    const j = (i + n) % n;
    setActive(j);
    if (focus) tabs.current[j]?.focus();
  };

  // a #service link (hero jump bar, footer, shared URL) selects that tab
  useEffect(() => {
    const idx = (href: string | null) => SERVICES.findIndex((s) => `#${s.id}` === href);
    const read = () => {
      const i = idx(window.location.hash);
      if (i >= 0) setActive(i);
    };
    read();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']");
      const i = a ? idx(a.getAttribute("href")) : -1;
      if (i >= 0) setActive(i);
    };
    window.addEventListener("hashchange", read);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", read);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const b = tabs.current[active];
    const row = b?.parentElement;
    if (b && row) row.scrollTo({ left: b.offsetLeft - (row.clientWidth - b.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const cur = SERVICES[active];
  return (
    <div id={cur.id} data-logi={`${cur.name}: ${cur.promise}`} className="scroll-mt-[calc(var(--header-h)+1rem)]">
      <div
        role="tablist"
        aria-label="Our services"
        className="sol-tabs -mx-gutter flex gap-2 overflow-x-auto px-gutter pb-3 md:mx-0 md:grid md:grid-cols-4 md:px-0"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1, true); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1, true); }
        }}
      >
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => (tabs.current[i] = el)}
            role="tab"
            id={`tab-${s.id}`}
            type="button"
            aria-selected={i === active}
            aria-controls="service-stage"
            tabIndex={i === active ? 0 : -1}
            onClick={() => go(i)}
            className={`min-h-[2.75rem] shrink-0 whitespace-nowrap rounded-full border px-4 font-display text-body-sm font-bold transition-colors md:whitespace-normal ${FOCUS} ${
              i === active ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground hover:border-foreground/40"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div
        id="service-stage"
        role="tabpanel"
        aria-labelledby={`tab-${cur.id}`}
        className="touch-pan-y"
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        }}
      >
        <div className="relative rounded-3xl p-3 md:p-5">
          {TINTS.map((c, i) => (
            <div key={c} ref={(el) => (tints.current[i] = el)} aria-hidden="true" className="absolute inset-0 rounded-3xl border border-slate-200/70" style={{ background: c }} />
          ))}
          <div className="relative grid">
            {SERVICES.map((s, i) => (
              <div key={s.id} ref={(el) => (frames.current[i] = el)} className="col-start-1 row-start-1">
                <ServiceDemo id={s.id} active={i === active} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid max-w-[40rem]">
          {SERVICES.map((s, i) => (
            <div key={s.id} ref={(el) => (panels.current[i] = el)} className="col-start-1 row-start-1" {...(i !== active ? ({ inert: "" } as object) : {})}>
              <h3 className="overflow-hidden font-display text-h3 font-bold text-foreground">
                <span data-name-in className="block">{s.name}</span>
              </h3>
              <p data-body-in className="mt-1 font-display text-lead font-semibold text-primary-ink">{s.promise}</p>
              <div data-body-in className="mt-3">
                <Details s={s} fold />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** Reduced motion: stacked static blocks, each demo parked on its final state. */
const Stacked = () => {
  const wide = useMinWidth("(min-width: 40em)");
  return (
    <ul className="grid gap-12 md:gap-16">
      {SERVICES.map((s) => (
        <li key={s.id} id={s.id} data-logi={`${s.name}: ${s.promise}`} className="scroll-mt-4">
          <ServiceDemo id={s.id} />
          <h3 className="mt-6 font-display text-h3 font-bold text-foreground">{s.name}</h3>
          <p className="mt-1 font-display text-lead font-semibold text-primary-ink">{s.promise}</p>
          <div className="mt-3 max-w-[40rem]">
            <Details s={s} fold={!wide} />
          </div>
        </li>
      ))}
    </ul>
  );
};

const ServiceExplorer = () => {
  const reduce = useReducedMotion();
  const desktop = useMinWidth("(min-width: 64em) and (min-height: 40rem)");
  return (
    <section aria-labelledby="services-h" id="services" className="bg-background py-section">
      <div className="container mx-auto max-w-[75rem] px-gutter">
        <h2 id="services-h" className="sr-only">
          Our services
        </h2>
        {reduce ? <Stacked /> : desktop ? <Pinned /> : <Tabs />}
      </div>
    </section>
  );
};

export default ServiceExplorer;
