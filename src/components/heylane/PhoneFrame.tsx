import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { hlScreen, hlScreenAllowed, type HlAppScreen } from "@/data/heylane";

/**
 * A phone showing the REAL HeyLane customer-app screens (public/images/heylane/app/).
 * Never draw a fake HeyLane phone: use this. Screens are crops at the phone aspect ratio (390 x 845).
 * The screen carries a "Sample" chip inside the frame (sample data); the Rides screen also says "Coming soon".
 *
 * - `active` picks which of `screens` is on show (cross-fade, slight y-slide).
 * - `scrollFull` shows the full-scroll image and drifts it slowly while in view (Lane Vibes).
 * - The bezel, radius and shadow follow the handoff tokens (--hl-radius-card-lg etc.).
 */
interface Props {
  screens: HlAppScreen[];
  active?: number;
  alt: string;
  /** show the full-scroll image of the (single) screen and auto-scroll it while in view */
  scrollFull?: boolean;
  /** width, e.g. "w-[15rem]"; the height follows the screen aspect ratio */
  className?: string;
  priority?: boolean;
  chip?: string;
}

const PhoneFrame = ({ screens, active = 0, alt, scrollFull = false, className = "w-[min(15rem,60vw)]", priority = false, chip = "Sample" }: Props) => {
  const list = screens.filter(hlScreenAllowed);
  const idx = Math.min(active, list.length - 1);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const prev = useRef(idx);
  const reduce = useReducedMotion();
  const drift = useRef<HTMLImageElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const from = prev.current;
    prev.current = idx;
    if (from === idx) return;
    const a = refs.current[from], b = refs.current[idx];
    if (!a || !b) return;
    if (reduce) {
      gsap.set(a, { autoAlpha: 0 });
      gsap.set(b, { autoAlpha: 1, y: 0 });
      return;
    }
    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
    tl.to(a, { autoAlpha: 0, y: -10 }, 0).fromTo(b, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0 }, 0.05);
    return () => { tl.progress(1).kill(); };
  }, [idx, reduce]);

  // Lane Vibes: drift the full-scroll image while the phone is in view
  useEffect(() => {
    const img = drift.current, el = box.current;
    if (!scrollFull || !img || !el || reduce) return;
    let tween: gsap.core.Tween | null = null;
    const build = () => {
      tween?.kill();
      const over = img.offsetHeight - el.clientHeight;
      if (over <= 0) return;
      tween = gsap.fromTo(img, { y: 0 }, { y: -over, duration: Math.max(10, over / 40), ease: "none", repeat: -1, yoyo: true, repeatDelay: 1.5, paused: true });
      if (visible) tween.play();
    };
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting && !document.hidden; if (visible) tween?.play(); else tween?.pause(); }, { threshold: 0.3 });
    io.observe(el);
    img.addEventListener("load", build);
    build();
    return () => { io.disconnect(); img.removeEventListener("load", build); tween?.kill(); };
  }, [scrollFull, reduce]);

  if (!list.length) return null;
  const isRides = (s: HlAppScreen) => s === "11-rides-coming-soon";

  return (
    <figure role="img" aria-label={alt} className={`relative m-0 ${className}`}>
      {/* bezel */}
      <div className="rounded-[3rem] bg-[#0d1714] p-[0.5rem] shadow-[0_30px_60px_-24px_rgba(11,51,40,0.55),0_8px_20px_-8px_rgba(11,51,40,0.35),inset_0_0_0_1px_rgba(255,255,255,0.12)]">
        <div ref={box} className="relative overflow-hidden rounded-[2.5rem] bg-[#f4f3ee]" style={{ aspectRatio: "390 / 845" }}>
          {list.map((s, i) => {
            const img = hlScreen(s);
            return (
              <div
                key={s}
                ref={(el) => (refs.current[i] = el)}
                className="absolute inset-0"
                style={{ opacity: i === idx ? 1 : 0, visibility: i === idx ? "visible" : "hidden" }}
              >
                {scrollFull ? (
                  <img ref={drift} src={img.full} alt="" width={780} height={3440} loading="lazy" decoding="async" draggable={false} className="absolute left-0 top-0 block w-full max-w-none will-change-transform" />
                ) : (
                  <img
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes="(min-width: 64em) 15rem, 60vw"
                    alt=""
                    width={390}
                    height={845}
                    loading={priority && i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    className="block h-full w-full object-cover"
                  />
                )}
                {isRides(s) && <span className="absolute left-1/2 top-[14%] -translate-x-1/2 rounded-full bg-[#f5b321] px-3 py-1 text-[0.75rem] font-semibold text-[#0b3328]">Coming soon</span>}
              </div>
            );
          })}
          {/* dynamic-island pill, no brand notch */}
          <span aria-hidden="true" className="absolute left-1/2 top-[1.1%] z-10 h-[2.1%] w-[26%] -translate-x-1/2 rounded-full bg-[#0d1714]" />
          <span className="absolute right-[5%] top-[3.4%] z-10 rounded-full bg-white/90 px-2 py-0.5 text-[0.75rem] font-medium text-[#4a5651] shadow-[0_0_0_1px_rgba(13,23,20,0.12)] backdrop-blur-sm">{chip}</span>
          {/* subtle highlight edge */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" />
        </div>
      </div>
    </figure>
  );
};

export default PhoneFrame;
