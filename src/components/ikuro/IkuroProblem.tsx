import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import Eyebrow from "@/components/Eyebrow";
import { PROBLEM_TABS } from "@/data/ikuro";
import { sequence } from "@/lib/scroll";

/**
 * "The problem": eight scattered sources converge into one IKURO card as you scroll.
 * A faux product window (labelled Illustrative inside the frame). Reduced motion: the scattered state and the
 * IKURO card are both shown still.
 */
const IkuroProblem = () => {
  const section = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // two steps: the eight tabs converge, then the IKURO card lands
  useLayoutEffect(() => {
    if (reduce || !frame.current) return;
    const tabs = gsap.utils.toArray<HTMLElement>("[data-tab]", frame.current);
    const card = frame.current.querySelector("[data-card]");
    const h = sequence(section.current, {
      name: "ikuro-problem",
      steps: 2,
      pinEl: inner.current,
      build: (tl) => {
        gsap.set(card, { opacity: 0, scale: 0.85 });
        tl.to(tabs, { left: "50%", top: "50%", xPercent: -50, yPercent: -50, scale: 0.5, rotate: 0, opacity: 0, ease: "power2.inOut", stagger: 0.06, duration: 0.9 }, 0.1);
        tl.to(card, { opacity: 1, scale: 1, ease: "power2.out", duration: 0.7 }, 1.1);
      },
    });
    return h.kill;
  }, [reduce]);

  return (
    <section ref={section} data-seq data-logi="IKURO helps students decide." className="py-section bg-background">
      <div ref={inner} className="container mx-auto px-gutter max-w-[75rem]">
        <div className="text-center max-w-3xl mx-auto mb-section-head space-y-4">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="font-display text-h2 font-bold text-foreground">Students don't lack information. They lack clarity.</h2>
          <p className="text-lead text-muted-foreground">
            Videos, chatbots, job boards, seniors and coaching classes all say something different. Eight tabs open, and still no clear next step.
          </p>
        </div>

        <div ref={frame} className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
            <span className="ml-auto rounded-full bg-background px-2.5 py-0.5 text-label text-muted-foreground">Illustrative</span>
          </div>

          <div className="relative aspect-[4/3] sm:aspect-[16/9]" role="img" aria-label="Eight scattered sources of advice converging into one IKURO recommendation">
            {PROBLEM_TABS.map(({ id, label, icon: Icon, x, y, r }) => (
              <div
                key={id}
                data-tab
                className="absolute inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-label font-medium text-foreground"
                style={{ left: `${x}%`, top: `${y}%`, transform: `rotate(${r}deg)`, opacity: reduce ? 0.55 : 1 }}
              >
                <Icon size={16} aria-hidden="true" className="text-primary-ink" />
                {label}
              </div>
            ))}

            <div
              data-card
              className="absolute left-1/2 top-1/2 w-[min(18rem,80%)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-5 shadow-lg"
              style={{ opacity: 1 }}
            >
              <picture style={{ display: "contents" }}>
                <source type="image/webp" srcSet="/brand/ikuro/ikuro-mark.webp" />
                <img src="/brand/ikuro/ikuro-mark.png" width={518} height={519} alt="" loading="lazy" decoding="async" className="h-10 w-10" />
              </picture>
              <p className="mt-3 text-label font-medium text-primary-ink">Your next step</p>
              <p className="mt-1 font-display text-h3 font-bold text-foreground">Learn SQL basics, then apply to two analyst internships</p>
              <p className="mt-2 text-label text-muted-foreground">Sample recommendation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IkuroProblem;
