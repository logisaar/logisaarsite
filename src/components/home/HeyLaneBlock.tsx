import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Eyebrow from "@/components/Eyebrow";
import PhoneFrame from "@/components/heylane/PhoneFrame";
import { reveal, sequence, type SequenceHandle } from "@/lib/scroll";
import "@/components/heylane/heylane.css";

const FRONT = ["07-home-with-booking", "08-lane-maps-explore", "14-passes"] as const;
const FRONT_LABELS = ["Home", "Lane Maps", "Passes"] as const;

/**
 * Home block for HeyLane: paper panel inside the Logisaar page, two phones with the real app screens.
 * The front phone is a three-step `sequence` (Home, Lane Maps, Passes): driven by scroll while pinned on desktop;
 * below 64em it advances on a timer only while 60% visible, with dots and swipe. Reduced motion: static Home.
 */
const HeyLaneBlock = () => {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const handle = useRef<SequenceHandle | null>(null);
  const touchX = useRef<number | null>(null);
  const [shown, setShown] = useState(0);

  useLayoutEffect(() => {
    const stop = reveal([back.current, front.current], { y: 40, stagger: 0.12, duration: 0.9, name: "home-heylane-phones" }, root.current);
    const h = sequence(section.current, { name: "home-heylane", steps: FRONT.length, pinEl: root.current, onStep: setShown });
    handle.current = h;
    return () => { stop(); h.kill(); };
  }, []);

  const go = (i: number) => { const k = (i + FRONT.length) % FRONT.length; setShown(k); handle.current?.goTo(k); };

  return (
    <section ref={section} data-logi="We build our own products as well." className="bg-secondary/40 py-section">
      <div className="container mx-auto max-w-[75rem] px-gutter">
        <div data-theme="heylane" ref={root} className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] border border-[var(--hl-line)] bg-[#f4f3ee] p-6 sm:p-10 lg:grid-cols-12 lg:gap-8 lg:p-14">
          <div className="space-y-6 lg:col-span-6">
            <Eyebrow className="text-[var(--hl-emerald-deep)]">HeyLane · A Logisaar product</Eyebrow>
            <img src="/brand/heylane/HeyLane-Horizontal.svg" width={1644} height={344} alt="HeyLane" className="-my-3 h-auto w-[min(14rem,70%)]" />
            <h2 className="font-display text-h2 font-bold text-[var(--hl-night)]">We don't just build for clients. We build our own.</h2>
            <p className="max-w-[34rem] text-body text-[var(--hl-ink-2)]">
              HeyLane is our neighbourhood app for Bhubaneswar: people find local places and hear from their own contacts first; businesses get billing, chat and a loyalty programme in one product.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Button asChild size="lg" className="h-auto min-h-[2.75rem] rounded-full border-0 bg-[var(--hl-emerald)] px-8 font-semibold text-white hover:bg-[var(--hl-emerald-deep)]">
                <Link to="/heylane">
                  Explore HeyLane
                  <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <a href="https://heylane.in" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[2.75rem] items-center gap-1 font-semibold text-[var(--hl-emerald-deep)] hover:underline">
                heylane.in
                <ArrowRight size={14} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              className="relative mx-auto flex h-[min(34rem,120vw)] w-full max-w-[28rem] touch-pan-y items-center justify-center"
              onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 50) go(shown + (dx < 0 ? 1 : -1));
              }}
            >
              <div ref={back} className="absolute left-[2%] top-[8%] w-[46%] -rotate-6 opacity-95 sm:left-[8%]">
                <PhoneFrame screens={["08c-lane-maps-place-selected"]} className="w-full" alt="HeyLane Lane Maps with a place selected (sample screen)" />
              </div>
              <div ref={front} className="absolute right-[2%] top-0 z-10 w-[52%] rotate-2 sm:right-[8%]">
                <PhoneFrame screens={[...FRONT]} active={reduce ? 0 : shown} className="w-full" priority alt="HeyLane customer app: Home with a booking, Lane Maps, and Passes (sample screens)" />
              </div>
            </div>
            {!reduce && (
              <ol aria-label="Screens" className="m-0 mx-auto mt-4 flex max-w-[28rem] list-none flex-wrap justify-center gap-x-1 p-0">
                {FRONT_LABELS.map((l, i) => (
                  <li key={l}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-current={i === shown ? "step" : undefined}
                      className={`inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-3 text-body-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--focus-ring))] ${i === shown ? "text-[var(--hl-night)]" : "text-[var(--hl-ink-2)] hover:text-[var(--hl-night)]"}`}
                    >
                      <span aria-hidden="true" className={`inline-block h-2 w-2 rounded-full transition-colors ${i === shown ? "bg-[var(--hl-emerald)]" : "bg-[var(--hl-line)]"}`} />
                      <span className="tabular-nums">{i + 1}</span> {l}
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeyLaneBlock;
