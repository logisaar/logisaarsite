import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import PhoneFrame from "./PhoneFrame";
import { HL_STEPS, hlScreenAllowed, type HlAppScreen } from "@/data/heylane";
import { sequence, whenVisible } from "@/lib/scroll";

// Real app screens per step. The second screen of steps 2 and 3 is a proposed V4 feature (behind SHOW_PROPOSED_SCREENS).
const STEP_SCREENS: HlAppScreen[][] = [
  ["08-lane-maps-explore"],
  ["10-lane-vibes", "13-chat-thread"],
  ["14-passes", "15-pass-at-counter"],
].map((l) => l.filter((s) => hlScreenAllowed(s as HlAppScreen)) as HlAppScreen[]);
const FLAT = STEP_SCREENS.flat();
/** flat screen index -> step index */
const STEP_OF = STEP_SCREENS.flatMap((l, i) => l.map(() => i));

/** Below 64em: the step's phone cycles its screens only while the step is 60% visible. */
const StepPhone = ({ i, title }: { i: number; title: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [sub, setSub] = useState(0);
  useEffect(() => {
    if (STEP_SCREENS[i].length < 2) return;
    let t = 0;
    const stop = whenVisible(ref.current, (v) => {
      window.clearInterval(t);
      setSub(0);
      if (v) t = window.setInterval(() => setSub((s) => (s + 1) % STEP_SCREENS[i].length), 3500);
    });
    return () => { window.clearInterval(t); stop(); };
  }, [i]);
  return (
    <div ref={ref} className="flex justify-center lg:hidden">
      <PhoneFrame screens={STEP_SCREENS[i]} active={sub} className="w-[min(14rem,62vw)]" alt={`HeyLane app, step ${i + 1}: ${title} (sample screens)`} />
    </div>
  );
};

/**
 * "One app for every place you love". From 64em the section is pinned and the scroll drives one `sequence`: the
 * phone's screen and the step text change together, and the last screen stays up before the pin releases. Below 64em
 * every step carries its own phone above its text. Reduced motion: every step visible with its first screen.
 */
const HlHow = () => {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [flat, setFlat] = useState(0);
  const active = STEP_OF[flat];

  useLayoutEffect(() => {
    if (reduce) return;
    const h = sequence(section.current, { name: "heylane-how", steps: FLAT.length, pinEl: stage.current, onStep: setFlat });
    return h.kill;
  }, [reduce]);

  const firstOf = (i: number) => STEP_SCREENS.slice(0, i).reduce((n, l) => n + l.length, 0);
  const pinned = !reduce;

  return (
    <section ref={section} className="bg-[var(--hl-paper)] py-section">
      <div ref={stage} className="container mx-auto max-w-[75rem] px-gutter">
        <h2 className="mx-auto mb-section-head max-w-3xl text-center text-h2 font-bold">One app for every place you love</h2>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ol className={`m-0 list-none space-y-14 p-0 ${pinned ? "lg:grid lg:space-y-0" : "lg:space-y-14"}`}>
            {HL_STEPS.map((s, i) => {
              const on = !pinned || active === i;
              return (
                <li
                  key={s.title}
                  data-hl-step
                  className={`flex flex-col gap-8 lg:justify-center ${pinned ? "lg:col-start-1 lg:row-start-1 lg:transition-[opacity,transform] lg:duration-500 motion-reduce:transition-none" : ""} ${on ? "" : "lg:pointer-events-none lg:translate-y-3 lg:opacity-0"}`}
                >
                  <StepPhone i={i} title={s.title} />
                  <div className={`lg:border-l-2 lg:pl-6 ${on && pinned ? "lg:border-[var(--hl-emerald)]" : "lg:border-transparent"}`}>
                    <span className="text-label font-medium text-[var(--hl-emerald-deep)]">{i + 1}</span>
                    <h3 className="mt-1 text-h2 font-bold">{s.title}</h3>
                    <p className="mt-3 max-w-md text-body text-[var(--hl-ink-2)]">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="hidden justify-center lg:flex">
            <PhoneFrame
              screens={FLAT}
              active={reduce ? firstOf(active) : flat}
              className="w-[min(17rem,40vw,calc((100svh-var(--header-h)-11rem)/2.3))]"
              alt="HeyLane customer app: Lane Maps, Lane Vibes and chat, then Passes (sample screens)"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HlHow;
