import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import Eyebrow from "@/components/Eyebrow";
import { PROBLEM_TABS } from "@/data/ikuro";
import { sequence } from "@/lib/scroll";

/**
 * "The problem": eight sources of advice scatter across the frame, then settle into a tidy stack that feeds one IKURO card.
 * The DOM is the FINAL state (stack on the left, IKURO card on the right), so the frame is complete at rest and under
 * reduced motion; `build` only applies the scattered start. A faux product window (labelled Illustrative).
 */
const FINAL_LEFT = [3, 51];
const FINAL_TOP = [4, 28, 52, 76];
const IkuroProblem = () => {
  const section = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // two steps: the eight sources settle into the stack, then the IKURO card lights up
  useLayoutEffect(() => {
    if (reduce || !frame.current) return;
    const card = frame.current.querySelector("[data-card]");
    const h = sequence(section.current, {
      name: "ikuro-problem",
      steps: 2,
      stepSeconds: 0.9,
      pinEl: inner.current,
      build: (tl) => {
        PROBLEM_TABS.forEach(({ id, x, y, r }) => {
          const el = frame.current!.querySelector(`[data-tab="${id}"]`);
          if (el) tl.from(el, { left: `${Math.min(x, 52)}%`, top: `${y}%`, rotate: r * 2, ease: "power2.inOut", duration: 0.9 }, 0.1 + PROBLEM_TABS.findIndex((t) => t.id === id) * 0.05);
        });
        gsap.set(card, { opacity: 0.4, scale: 0.94 });
        tl.to(card, { opacity: 1, scale: 1, ease: "power2.out", duration: 0.7 }, 1.1);
      },
    });
    return h.kill;
  }, [reduce]);

  return (
    <section ref={section} data-seq data-logi="IKURO helps students decide." className="py-section bg-background">
      <div ref={inner} className="container mx-auto px-gutter max-w-[75rem]">
        <div className="text-center max-w-3xl mx-auto mb-section-head space-y-4 [@media(max-height:50em)]:mb-6 [@media(max-height:50em)]:space-y-2">
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

          <div className="grid items-stretch md:grid-cols-[1.2fr_1fr]" role="img" aria-label="Eight scattered sources of advice settling into one IKURO recommendation">
            <div className="relative min-h-[18rem] [@media(max-height:50em)]:min-h-[15rem]" aria-hidden="true">
              {PROBLEM_TABS.map(({ id, label, icon: Icon }, i) => (
                <div
                  key={id}
                  data-tab={id}
                  className="absolute inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-label font-medium text-foreground"
                  style={{ left: `${FINAL_LEFT[i % 2]}%`, top: `${FINAL_TOP[Math.floor(i / 2)]}%` }}
                >
                  <Icon size={16} aria-hidden="true" className="text-primary-ink" />
                  {label}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center border-t border-border bg-secondary/50 p-6 md:border-l md:border-t-0">
              <div data-card className="w-full max-w-[18rem] rounded-2xl border border-border bg-card p-5 shadow-lg">
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
      </div>
    </section>
  );
};

export default IkuroProblem;
