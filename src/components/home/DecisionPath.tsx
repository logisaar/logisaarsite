import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * "The decision path": original IKURO-coloured artwork (does not trace or redraw the logo).
 * One winding path draws on scroll; five nodes light up in turn; choice chips fade as the path picks one;
 * a four-point star sparkles once at the end. Only transform, opacity and stroke-dashoffset animate.
 * Reduced motion: the finished state is shown, nothing loops.
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

const DecisionPath = ({ className = "" }: { className?: string }) => {
  const reduce = useReducedMotion();
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = root.current;
    if (!svg || reduce) return;
    const ctx = gsap.context(() => {
      const path = svg.querySelector<SVGPathElement>("[data-path]")!;
      const len = path.getTotalLength();
      const q = gsap.utils.selector(svg);
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(q("[data-node]"), { scale: 0.6, transformOrigin: "50% 50%", opacity: 0.35 });
      gsap.set(q("[data-ring]"), { opacity: 0 });
      gsap.set(q("[data-node-label]"), { opacity: 0.45 });
      gsap.set(q("[data-branch]"), { opacity: 0 });
      gsap.set(q("[data-chip]"), { opacity: 0, y: 6 });
      gsap.set(q("[data-star]"), { scale: 0, opacity: 0, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: svg, start: "top 80%", end: "bottom 45%", scrub: 0.6, invalidateOnRefresh: true } });
      tl.to(path, { strokeDashoffset: 0, duration: 1 }, 0);
      tl.to(q("[data-chip]"), { opacity: 0.7, y: 0, stagger: 0.04, duration: 0.15, ease: "power2.out" }, 0.05);
      tl.to(q("[data-branch]"), { opacity: 0.5, duration: 0.15 }, 0.05);
      NODES.forEach((n, i) => {
        tl.to(q(`[data-node="${i}"]`), { scale: 1, opacity: 1, duration: 0.06, ease: "back.out(2)" }, n.at);
        tl.to(q(`[data-node-label="${i}"]`), { opacity: 1, duration: 0.06 }, n.at);
        tl.to(q(`[data-ring="${i}"]`), { opacity: 1, duration: 0.06 }, n.at);
      });
      // the path picks: kept chips light up, the rest fade
      CHIPS.forEach((c, i) => {
        const at = NODES[c.from].at + 0.03;
        tl.to(q(`[data-chip="${i}"]`), c.pick ? { opacity: 1, duration: 0.08 } : { opacity: 0.12, duration: 0.1 }, at);
        tl.to(q(`[data-branch="${i}"]`), { opacity: c.pick ? 1 : 0.1, duration: 0.08 }, at);
      });
      tl.to(q("[data-star]"), { scale: 1, opacity: 1, duration: 0.06, ease: "back.out(3)" }, 0.97);
      tl.to(q("[data-star]"), { scale: 1.25, duration: 0.03 }, 0.99).to(q("[data-star]"), { scale: 1, duration: 0.03 }, 1.02);
    }, svg);
    return () => ctx.revert();
  }, [reduce]);

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
};

export default DecisionPath;
