import { useRef } from "react";

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

/** "Logisaar" as SVG text: hairline outline, a 12% green fill that sweeps in once, and a soft green stroke that follows the cursor. */
const Wordmark = () => {
  const svg = useRef<SVGSVGElement>(null);
  const grad = useRef<SVGRadialGradientElement>(null);
  const hl = useRef<SVGTextElement>(null);

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
        <radialGradient ref={grad} id="ft-hl" gradientUnits="userSpaceOnUse" cx="600" cy="130" r="160">
          <stop offset="0" stopColor="#00D162" />
          <stop offset="1" stopColor="#00D162" stopOpacity="0" />
        </radialGradient>
      </defs>
      <text className="ft-sig-fill" x="600" y="230" textAnchor="middle">Logisaar</text>
      <text className="ft-sig-line" x="600" y="230" textAnchor="middle">Logisaar</text>
      <text ref={hl} className="ft-sig-hl" x="600" y="230" textAnchor="middle" stroke="url(#ft-hl)">Logisaar</text>
    </svg>
  );
};

const FooterLive = ({ part }: { part: "traces" | "wordmark" }) => (part === "traces" ? <Traces /> : <Wordmark />);

export default FooterLive;
