import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/Eyebrow";
import { LOOP_STEPS } from "@/data/ikuro";

gsap.registerPlugin(ScrollTrigger);

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
  const path = useRef<SVGPathElement>(null);
  const star = useRef<SVGGElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 across the section

  useEffect(() => {
    const p = path.current;
    if (!p || !section.current) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);
    if (reduce) { p.style.strokeDashoffset = "0"; setProgress(1); return; }
    p.style.strokeDashoffset = String(len);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: "top 65%",
        end: "bottom 70%",
        scrub: 0.5,
        onUpdate: (self) => {
          const v = self.progress;
          p.style.strokeDashoffset = String(len * (1 - v));
          if (star.current) star.current.style.opacity = v > 0.97 ? "1" : "0";
          setProgress((old) => (Math.abs(old - v) > 0.02 ? v : old));
        },
      });
    }, section);
    return () => ctx.revert();
  }, [reduce]);

  const lit = (i: number) => reduce || progress >= (NODES[i][0] - 60) / 940;

  return (
    <section ref={section} data-logi="This loop is how it thinks." className="py-section bg-secondary/60">
      <div className="container mx-auto px-gutter max-w-[75rem]">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
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
          <g ref={star} transform="translate(985 42)" fill="hsl(var(--ikuro-orange))" style={{ opacity: reduce ? 1 : 0, transition: "opacity 0.3s" }}>
            <path d={STAR} />
          </g>
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
