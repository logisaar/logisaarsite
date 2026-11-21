import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhoneFrame from "./PhoneFrame";
import { HL_STEPS, hlScreenAllowed, type HlAppScreen } from "@/data/heylane";

gsap.registerPlugin(ScrollTrigger);

// Real app screens per step. The second screen of steps 2 and 3 is a proposed V4 feature (behind SHOW_PROPOSED_SCREENS).
const STEP_SCREENS: HlAppScreen[][] = [
  ["08-lane-maps-explore"],
  ["10-lane-vibes", "13-chat-thread"],
  ["14-passes", "15-pass-at-counter"],
].map((l) => l.filter((s) => hlScreenAllowed(s as HlAppScreen)) as HlAppScreen[]);

/**
 * "One app for every place you love": on desktop the phone stays in view while the three steps scroll past on the left,
 * and the screen inside it changes with the step (cross-fade and a small y-slide, about 0.5s). The three steps have equal
 * heights, so there is no empty band. Below md every step carries its own phone above its text. Reduced motion: the
 * first screen of each step, no cross-fade, every step visible.
 */
const HlHow = () => {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [sub, setSub] = useState(0);

  useEffect(() => {
    if (!wrap.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-hl-step]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          invalidateOnRefresh: true,
          onToggle: (self) => { if (self.isActive) { setActive(i); setSub(0); } },
        });
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  // the second screen of a step follows the first after a few seconds
  useEffect(() => {
    if (reduce || STEP_SCREENS[active].length < 2) return;
    const t = window.setTimeout(() => setSub(1), 3500);
    return () => window.clearTimeout(t);
  }, [active, reduce]);

  const flat = STEP_SCREENS.flat();
  const flatIndex = STEP_SCREENS.slice(0, active).reduce((n, l) => n + l.length, 0) + Math.min(sub, STEP_SCREENS[active].length - 1);

  return (
    <section className="bg-[var(--hl-paper)] py-section">
      <div ref={wrap} className="container mx-auto max-w-[75rem] px-gutter">
        <h2 className="mx-auto mb-section-head max-w-3xl text-center text-h2 font-bold">One app for every place you love</h2>

        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <ol className="m-0 list-none space-y-14 p-0 md:space-y-0">
            {HL_STEPS.map((s, i) => (
              <li key={s.title} data-hl-step className="flex flex-col gap-8 md:h-[36rem] md:justify-center">
                <div className="flex justify-center md:hidden">
                  <PhoneFrame screens={STEP_SCREENS[i]} active={reduce ? 0 : i === active ? sub : 0} className="w-[min(14rem,62vw)]" alt={`HeyLane app, step ${i + 1}: ${s.title} (sample screens)`} />
                </div>
                <div className={`transition-colors duration-500 md:border-l-2 md:pl-6 ${active === i ? "md:border-[var(--hl-emerald)]" : "md:border-transparent"}`}>
                  <span className="text-label font-medium text-[var(--hl-emerald-deep)]">{i + 1}</span>
                  <h3 className="mt-1 text-h2 font-bold">{s.title}</h3>
                  <p className="mt-3 max-w-md text-body text-[var(--hl-ink-2)]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="sticky top-[calc(var(--header-h)+2rem)] hidden justify-center md:flex">
            <PhoneFrame screens={flat} active={reduce ? STEP_SCREENS.slice(0, active).reduce((n, l) => n + l.length, 0) : flatIndex} className="w-[min(17rem,40vw)]" alt="HeyLane customer app: Lane Maps, Lane Vibes and chat, then Passes (sample screens)" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HlHow;
