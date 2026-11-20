import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HlPhone from "./HlPhone";
import { HL_STEPS } from "@/data/heylane";

gsap.registerPlugin(ScrollTrigger);

/**
 * "One app for every place you love": on desktop a sticky phone changes screen as each step scrolls past
 * (the one orchestrated ScrollTrigger moment). Below md every step carries its own phone. Reduced motion:
 * the screens swap without a fade and every step stays visible.
 */
const HlHow = () => {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!wrap.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-hl-step]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => { if (self.isActive) setActive(i); },
        });
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[var(--hl-paper)] py-section">
      <div ref={wrap} className="container mx-auto max-w-[75rem] px-gutter">
        <h2 className="mx-auto mb-14 max-w-3xl text-center text-h2 font-bold">One app for every place you love</h2>

        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <ol className="m-0 list-none space-y-10 p-0 md:space-y-0">
            {HL_STEPS.map((s, i) => (
              <li key={s.title} data-hl-step className="md:flex md:min-h-[60svh] md:flex-col md:justify-center">
                <div className={`md:border-l-2 md:pl-6 transition-colors duration-500 ${active === i ? "md:border-[var(--hl-emerald)]" : "md:border-transparent"}`}>
                  <span className="text-label font-medium text-[var(--hl-emerald-deep)]">{i + 1}</span>
                  <h3 className="mt-1 text-h2 font-bold">{s.title}</h3>
                  <p className="mt-3 max-w-md text-body text-[var(--hl-ink-2)]">{s.text}</p>
                </div>
                <div className="mt-8 md:hidden"><HlPhone screen={s.screen} /></div>
              </li>
            ))}
          </ol>

          <div className="sticky top-28 hidden md:block">
            <div className="relative mx-auto w-[min(17.5rem,78vw)]">
              <HlPhone screen="map" className="invisible" />
              {HL_STEPS.map((s, i) => (
                <div
                  key={s.screen}
                  className={`absolute inset-0 ${reduce ? "" : "transition-opacity duration-500"} ${active === i ? "opacity-100" : "opacity-0"}`}
                >
                  <HlPhone screen={s.screen} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HlHow;
