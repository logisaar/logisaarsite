import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Eyebrow from "@/components/Eyebrow";
import PhoneFrame from "@/components/heylane/PhoneFrame";
import "@/components/heylane/heylane.css";

gsap.registerPlugin(ScrollTrigger);

const FRONT = ["07-home-with-booking", "08-lane-maps-explore", "14-passes"] as const;

/** Home block for HeyLane: paper panel inside the Logisaar page, two phones with the real app screens. */
const HeyLaneBlock = () => {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const inView = useRef(false);

  // front screen cross-fades Home -> Lane Maps -> Passes every 3.5s while in view; static Home under reduced motion
  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el);
    const t = window.setInterval(() => { if (inView.current && !document.hidden) setShown((s) => (s + 1) % FRONT.length); }, 3500);
    return () => { io.disconnect(); window.clearInterval(t); };
  }, [reduce]);

  // phones float in and drift a little on scroll (y +-20px)
  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;
    const ctx = gsap.context(() => {
      gsap.from([front.current, back.current], { opacity: 0, y: 40, duration: 0.9, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 80%", once: true } });
      gsap.fromTo(front.current, { yPercent: 0 }, { yPercent: -6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(back.current, { yPercent: 0 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section data-logi="We build our own products as well." className="bg-secondary/40 py-section">
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

          <div className="relative mx-auto flex h-[min(34rem,120vw)] w-full max-w-[28rem] items-center justify-center lg:col-span-6">
            <div ref={back} className="absolute left-[2%] top-[8%] w-[46%] -rotate-6 opacity-95 sm:left-[8%]">
              <PhoneFrame screens={["08c-lane-maps-place-selected"]} className="w-full" alt="HeyLane Lane Maps with a place selected (sample screen)" />
            </div>
            <div ref={front} className="absolute right-[2%] top-0 z-10 w-[52%] rotate-2 sm:right-[8%]">
              <PhoneFrame screens={[...FRONT]} active={reduce ? 0 : shown} className="w-full" priority alt="HeyLane customer app: Home with a booking, Lane Maps, and Passes (sample screens)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeyLaneBlock;
