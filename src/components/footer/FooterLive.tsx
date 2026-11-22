import { useEffect, useRef } from "react";

/**
 * The footer's live layer, loaded lazily: the background traces and the signature wordmark.
 * Both are decoration (aria-hidden). The sweep and the trace loop are CSS, driven by `data-in` / `data-visible`
 * on the footer, so they pause off-screen and are static under reduced motion (see footer.css).
 */

const TRACES = [
  "M0 140 H260 L320 200 H620 L660 160 H980",
  "M1440 420 H1180 L1120 480 H860 L820 520 H560",
  "M80 760 H420 L470 710 H780 L830 760 H1300",
];

const Traces = () => (
  <svg className="ft-traces" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    {TRACES.map((d) => (
      <path key={d} d={d} pathLength={900} />
    ))}
  </svg>
);

const SWEEP_EVERY = 6000; // ms between auto sweeps
const SWEEP_TIME = 2200;  // ms for the band to cross the word
const BAND = 220;         // half width of the band, in SVG units

/**
 * "Logisaar" as SVG text: hairline outline, a 12% green fill that sweeps in once, then a soft green light band that
 * crosses the outline on its own every ~6s while the footer is on screen (paused off-screen and in hidden tabs, none
 * under reduced motion). A cursor highlight stays as an extra on pointer devices; nothing depends on it.
 */
const Wordmark = () => {
  const svg = useRef<SVGSVGElement>(null);
  const grad = useRef<SVGRadialGradientElement>(null);
  const hl = useRef<SVGTextElement>(null);
  const auto = useRef<SVGLinearGradientElement>(null);
  const autoText = useRef<SVGTextElement>(null);

  useEffect(() => {
    const el = svg.current, g = auto.current, t = autoText.current;
    if (!el || !g || !t || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inView = false, raf = 0, timer = 0, t0 = 0;
    const set = (c: number) => { g.setAttribute("x1", String(c - BAND)); g.setAttribute("x2", String(c + BAND)); };
    const frame = (now: number) => {
      const p = Math.min(1, (now - t0) / SWEEP_TIME);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; // ease in-out
      set(-BAND + e * (1200 + 2 * BAND));
      t.style.opacity = "1";
      if (p < 1) raf = requestAnimationFrame(frame);
      else { t.style.opacity = "0"; schedule(SWEEP_EVERY - SWEEP_TIME); }
    };
    const run = () => { if (!inView || document.hidden) return; t0 = performance.now(); raf = requestAnimationFrame(frame); };
    const schedule = (ms: number) => { window.clearTimeout(timer); timer = window.setTimeout(run, ms); };
    const stop = () => { cancelAnimationFrame(raf); window.clearTimeout(timer); t.style.opacity = "0"; };
    const io = new IntersectionObserver(([e]) => {
      const was = inView; inView = e.isIntersecting;
      if (inView && !was) schedule(1800); // let the one-shot fill sweep land first
      if (!inView) stop();
    }, { threshold: 0.15 });
    io.observe(el);
    const vis = () => { if (document.hidden) stop(); else if (inView) schedule(600); };
    document.addEventListener("visibilitychange", vis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", vis); stop(); };
  }, []);

  const move = (e: React.PointerEvent) => {
    const s = svg.current;
    if (!s || !grad.current || !hl.current) return;
    const r = s.getBoundingClientRect();
    grad.current.setAttribute("cx", String(((e.clientX - r.left) / r.width) * 1200));
    grad.current.setAttribute("cy", String(((e.clientY - r.top) / r.height) * 260));
    hl.current.style.opacity = "1";
  };
  const leave = () => { if (hl.current) hl.current.style.opacity = "0"; };

  return (
    <svg ref={svg} className="ft-sig-svg" viewBox="0 0 1200 260" aria-hidden="true" focusable="false" onPointerMove={move} onPointerLeave={leave}>
      <defs>
        <clipPath id="ft-sweep">
          <rect className="ft-sweep-rect" x="0" y="0" width="1200" height="320" />
        </clipPath>
        <linearGradient ref={auto} id="ft-auto" gradientUnits="userSpaceOnUse" x1="-220" y1="0" x2="220" y2="0">
          <stop offset="0" stopColor="#00D162" stopOpacity="0" />
          <stop offset="0.5" stopColor="#00D162" />
          <stop offset="1" stopColor="#00D162" stopOpacity="0" />
        </linearGradient>
        <radialGradient ref={grad} id="ft-hl" gradientUnits="userSpaceOnUse" cx="600" cy="130" r="160">
          <stop offset="0" stopColor="#00D162" />
          <stop offset="1" stopColor="#00D162" stopOpacity="0" />
        </radialGradient>
      </defs>
      <text className="ft-sig-fill" x="600" y="230" textAnchor="middle">Logisaar</text>
      <text className="ft-sig-line" x="600" y="230" textAnchor="middle">Logisaar</text>
      <text ref={autoText} className="ft-sig-auto" x="600" y="230" textAnchor="middle" stroke="url(#ft-auto)">Logisaar</text>
      <text ref={hl} className="ft-sig-hl" x="600" y="230" textAnchor="middle" stroke="url(#ft-hl)">Logisaar</text>
    </svg>
  );
};

const FooterLive = ({ part }: { part: "traces" | "wordmark" }) => (part === "traces" ? <Traces /> : <Wordmark />);

export default FooterLive;
