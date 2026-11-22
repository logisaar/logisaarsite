import { forwardRef } from "react";
import gsap from "gsap";

/**
 * "The decision path": original IKURO-coloured artwork (does not trace or redraw the logo).
 * One winding path draws; five nodes light up in turn; choice chips fade as the path picks one; a four-point star
 * sparkles at the end. The timeline is driven by `sequence()` from the block that owns it (IkuroBlock). Only transform,
 * opacity and stroke-dashoffset animate. Reduced motion: the finished state is shown.
 */
const ORANGE = "#FA482E";
const NAVY = "#1E1E2A";
const PATH = "M40 390 C150 390 110 300 210 290 C310 280 360 330 350 240 C340 160 230 170 250 100 C270 40 410 60 470 40";

// positions on PATH at these fractions of its length (computed once, see round-8 notes)
const NODES = [
  { label: "Understand", x: 57, y: 389, at: 0.02, lx: 40, ly: 418, anchor: "start" as const },
  { label: "Reason", x: 199, y: 292, at: 0.24, lx: 199, ly: 322, anchor: "middle" as const },
  { label: "Recommend", x: 347, y: 225, at: 0.5, lx: 364, ly: 222, anchor: "start" as const },
  { label: "Reflect", x: 265, y: 79, at: 0.74, lx: 282, ly: 112, anchor: "start" as const },
  { label: "Grow", x: 458, y: 43, at: 0.985, lx: 462, ly: 78, anchor: "end" as const },
];

// branch from a node to a chip; `pick` chips stay, the others fade as the path chooses
const CHIPS = [
  { label: "B.Tech CSE", from: 1, x: 18, y: 214, w: 104, pick: true },
  { label: "Internship", from: 2, x: 384, y: 296, w: 96, pick: false },
  { label: "Python", from: 2, x: 392, y: 160, w: 80, pick: true },
  { label: "Higher studies", from: 3, x: 40, y: 58, w: 128, pick: false },
];

/**
 * Adds the decision path to a `sequence` timeline (one unit of time per step, five steps: Understand, Reason,
 * Recommend, Reflect, Grow; the star lands in the last one). Start states are set here, so when the helper does not
 * run (reduced motion) the markup is already the finished state.
 */
export const buildDecisionPath = (svg: SVGSVGElement, tl: gsap.core.Timeline) => {
  const path = svg.querySelector<SVGPathElement>("[data-path]")!;
  const len = path.getTotalLength();
  const q = gsap.utils.selector(svg);
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len * (1 - NODES[0].at) });
  gsap.set(q("[data-node]"), { scale: 0.6, transformOrigin: "50% 50%", opacity: 0.35 });
  gsap.set(q("[data-ring]"), { opacity: 0 });
  gsap.set(q("[data-node-label]"), { opacity: 0.45 });
  gsap.set(q("[data-branch]"), { opacity: 0 });
  gsap.set(q("[data-chip]"), { opacity: 0, y: 6 });
  gsap.set(q("[data-star]"), { scale: 0, opacity: 0, transformOrigin: "50% 50%" });

  const light = (i: number, t: number) => {
    tl.to(q(`[data-node="${i}"]`), { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" }, t);
    tl.to(q(`[data-node-label="${i}"]`), { opacity: 1, duration: 0.25 }, t);
    tl.to(q(`[data-ring="${i}"]`), { opacity: 1, duration: 0.25 }, t);
  };
  light(0, 0);
  tl.to(q("[data-chip]"), { opacity: 0.7, y: 0, stagger: 0.08, duration: 0.3, ease: "power2.out" }, 0.1);
  tl.to(q("[data-branch]"), { opacity: 0.5, duration: 0.3 }, 0.1);
  for (let i = 1; i < NODES.length; i++) {
    // the line travels to node i during step i, and the node lights as it arrives
    tl.to(path, { strokeDashoffset: len * (1 - NODES[i].at), duration: 0.7, ease: "power1.inOut" }, i - 1 + 0.2);
    light(i, i - 1 + 0.75);
  }
  // the path picks: kept chips light up, the rest fade
  CHIPS.forEach((c, i) => {
    const at = c.from - 1 + 0.9;
    tl.to(q(`[data-chip="${i}"]`), c.pick ? { opacity: 1, duration: 0.3 } : { opacity: 0.12, duration: 0.3 }, at);
    tl.to(q(`[data-branch="${i}"]`), { opacity: c.pick ? 1 : 0.1, duration: 0.3 }, at);
  });
  // the star lands in the last step, after Grow
  tl.to(q("[data-star]"), { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(3)" }, NODES.length - 1 + 0.3);
  tl.to(q("[data-star]"), { scale: 1.25, duration: 0.12 }, NODES.length - 1 + 0.65).to(q("[data-star]"), { scale: 1, duration: 0.12 }, ">");
};

export const DECISION_STEPS = NODES.length;

const DecisionPath = forwardRef<SVGSVGElement, { className?: string }>(({ className = "" }, root) => {
  return (
    <svg ref={root} viewBox="0 0 520 440" role="img" aria-label="A winding path from Understand through Reason, Recommend and Reflect to Grow, choosing among options such as B.Tech CSE, internship, Python and higher studies." className={`h-auto w-full ${className}`}>
      {/* faint track */}
      <path d={PATH} fill="none" stroke={NAVY} strokeOpacity="0.1" strokeWidth="10" strokeLinecap="round" />
      {CHIPS.map((c, i) => {
        const n = NODES[c.from];
        const cx = c.x + c.w / 2, cy = c.y + 15;
        return <path key={c.label} data-branch={i} opacity={c.pick ? 1 : 0.12} d={`M${n.x} ${n.y} Q ${(n.x + cx) / 2} ${n.y} ${cx} ${cy}`} fill="none" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="4 5" strokeLinecap="round" />;
      })}
      <path data-path d={PATH} fill="none" stroke={ORANGE} strokeWidth="5" strokeLinecap="round" />
      {CHIPS.map((c, i) => (
        <g key={c.label} data-chip={i} opacity={c.pick ? 1 : 0.15}>
          <rect x={c.x} y={c.y} width={c.w} height="30" rx="15" fill="#FCFAF8" stroke={c.pick ? ORANGE : NAVY} strokeOpacity={c.pick ? 1 : 0.4} strokeWidth="1.5" />
          <text x={c.x + c.w / 2} y={c.y + 20} textAnchor="middle" fontSize="14" fontWeight="600" fill={NAVY} fontFamily="inherit">{c.label}</text>
        </g>
      ))}
      {NODES.map((n, i) => (
        <g key={n.label}>
          <circle data-ring={i} cx={n.x} cy={n.y} r="15" fill="none" stroke={ORANGE} strokeOpacity="0.35" strokeWidth="2" />
          <circle data-node={i} cx={n.x} cy={n.y} r="9" fill={i === NODES.length - 1 ? NAVY : ORANGE} stroke="#FCFAF8" strokeWidth="3" />
          <text data-node-label={i} x={n.lx} y={n.ly} textAnchor={n.anchor} fontSize="16" fontWeight="700" fill={NAVY} fontFamily="inherit">{n.label}</text>
        </g>
      ))}
      {/* four-point star */}
      <g transform="translate(486 30)">
        <path data-star d="M0 -16 C2 -5 5 -2 16 0 C5 2 2 5 0 16 C-2 5 -5 2 -16 0 C-5 -2 -2 -5 0 -16Z" fill={ORANGE} />
      </g>
    </svg>
  );
});
DecisionPath.displayName = "DecisionPath";

export default DecisionPath;
