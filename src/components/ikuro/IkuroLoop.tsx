import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import Eyebrow from "@/components/Eyebrow";
import { LOOP_STEPS } from "@/data/ikuro";
import { sequence } from "@/lib/scroll";

// One winding path through the five steps, ending at a four-point star. Drawn for this page (not traced from the logo).
// The five nodes sit at 10, 30, 50, 70 and 90% of the width: the centres of five equal grid columns.
const NODES: [number, number][] = [[100, 78], [300, 34], [500, 78], [700, 34], [900, 78]];
const POINTS: [number, number][] = [[0, 56], ...NODES, [985, 42]];
const PATH = POINTS.map(([x, y], i) => {
  if (i === 0) return `M ${x},${y}`;
  const [px, py] = POINTS[i - 1];
  const dx = (x - px) / 2;
  return `C ${px + dx},${py} ${x - dx},${y} ${x},${y}`;
}).join(" ");
const STAR = "M0,-13 L3.2,-3.2 L13,0 L3.2,3.2 L0,13 L-3.2,3.2 L-13,0 L-3.2,-3.2 Z";

/**
 * "How IKURO thinks": the page's one orchestrated scroll moment.
 * Reduced motion: the full path and all five steps are shown at once.
 */
const IkuroLoop = () => {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const star = useRef<SVGGElement>(null);
  const [step, setStep] = useState(reduce ? NODES.length - 1 : 0); // active step 0..4

  // five steps; the line reaches node i during step i and the star lands in the last one
  useLayoutEffect(() => {
    const p = path.current;
    if (!p || reduce) return;
    const len = p.getTotalLength();
    const frac = (i: number) => NODES[i][0] / 985;
    const h = sequence(section.current, {
      name: "ikuro-loop",
      steps: NODES.length,
      pinEl: inner.current,
      onStep: setStep,
      build: (tl) => {
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len * (1 - frac(0)) });
        gsap.set(star.current, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" });
        for (let i = 1; i < NODES.length; i++) tl.to(p, { strokeDashoffset: len * (1 - frac(i)), duration: 0.75, ease: "power1.inOut" }, i - 1 + 0.15);
        tl.to(p, { strokeDashoffset: 0, duration: 0.2, ease: "power1.out" }, NODES.length - 1 + 0.5);
        tl.to(star.current, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, NODES.length - 1 + 0.65);
      },
    });
    return h.kill;
  }, [reduce]);

  const lit = (i: number) => reduce || i <= step;

  return (
    <section ref={section} data-seq data-logi="This loop is how it thinks." className="py-section bg-secondary/60">
      <div ref={inner} className="container mx-auto px-gutter max-w-[75rem]">
        <div className="text-center max-w-3xl mx-auto mb-section-head space-y-4">
          <Eyebrow>How IKURO thinks</Eyebrow>
          <h2 className="font-display text-h2 font-bold text-foreground">IKURO’s five-step loop</h2>
          <p className="text-lead text-muted-foreground">Most AI answers a question. IKURO starts from your context.</p>
        </div>

        {/* desktop: the path runs across the five columns */}
        <svg className="hidden md:block w-full h-auto" viewBox="0 0 1000 110" fill="none" aria-hidden="true">
          <path d={PATH} stroke="hsl(var(--border))" strokeWidth="3" strokeLinecap="round" />
          <path ref={path} d={PATH} stroke="hsl(var(--ikuro-orange-ink))" strokeWidth="3" strokeLinecap="round" />
          {NODES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="9" fill={lit(i) ? "hsl(var(--ikuro-orange-ink))" : "hsl(var(--card))"} stroke="hsl(var(--ikuro-orange-ink))" strokeWidth="3" />
          ))}
          <g transform="translate(985 42)"><g ref={star} fill="hsl(var(--ikuro-orange))">
            <path d={STAR} />
          </g></g>
        </svg>

        <ol className="mt-2 md:mt-6 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-5">
          {LOOP_STEPS.map((s, i) => (
            <li
              key={s.title}
              className={`relative rounded-2xl border bg-card p-5 transition-[border-color,box-shadow] duration-500 ${lit(i) ? "border-primary/50 shadow-md" : "border-border"}`}
            >
              <span className="text-label font-medium text-primary-ink">Step {i + 1}</span>
              <h3 className="mt-1 font-display text-h3 font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-body-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default IkuroLoop;
