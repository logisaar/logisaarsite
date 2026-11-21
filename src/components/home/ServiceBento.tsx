import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/Eyebrow";
import { SERVICES } from "@/data/company";
import { ServiceDemo } from "@/components/demos";

gsap.registerPlugin(ScrollTrigger);

// 7/5 then 5/7 so the grid does not read as four equal boxes
const SPAN = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

const BentoCard = ({ s, i }: { s: (typeof SERVICES)[number]; i: number }) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={ref}
      data-bento-card
      onPointerMove={move}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={`spot-card group relative flex h-full shrink-0 basis-[86%] snap-start flex-col overflow-hidden rounded-3xl border border-border bg-card transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:basis-auto ${SPAN[i]}`}
    >
      <div data-bento-demo className="border-b border-border bg-secondary/50 p-4 sm:p-5">
        <ServiceDemo id={s.id} mini active={inView || hover} />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <Eyebrow>{s.name}</Eyebrow>
        <h3 className="mt-3 font-display text-h3 font-bold text-foreground">
          <Link
            to={`/solutions#${s.id}`}
            className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[hsl(var(--focus-ring))]"
          >
            {s.promise}
            <span className="sr-only"> ({s.name})</span>
          </Link>
        </h3>
        <p className="mt-2 text-body-sm text-muted-foreground">{s.desc}</p>
        <ul className="mt-4 space-y-1.5">
          {s.examples.slice(0, 3).map((e) => (
            <li key={e} className="flex items-center gap-2 text-body-sm font-medium text-foreground/85">
              <Check size={14} aria-hidden="true" className="shrink-0 text-primary-ink" />
              {e}
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="mt-auto flex items-center gap-1.5 pt-5 text-body-sm font-semibold text-primary-ink">
          See it in Solutions
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        </span>
      </div>
    </article>
  );
};

/** Home "What we do": a bento of four mini live demos. Mobile: a snap carousel with dots. */
const ServiceBento = () => {
  const reduce = useReducedMotion();
  const grid = useRef<HTMLDivElement>(null);
  const [dot, setDot] = useState(0);

  // entrance: each card reveals upward with a clip-path, then its demo fades in
  useEffect(() => {
    const el = grid.current;
    if (!el || reduce) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-bento-card]", el);
      const demos = gsap.utils.toArray<HTMLElement>("[data-bento-demo]", el);
      gsap.set(cards, { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" });
      gsap.set(demos, { opacity: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      tl.to(cards, { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", duration: 0.9, ease: "expo.out", stagger: 0.12 }, 0);
      tl.to(demos, { opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.12 }, 0.45);
      tl.set(cards, { clearProps: "clipPath" });
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    const card = t.querySelector<HTMLElement>("[data-bento-card]");
    if (!card) return;
    setDot(Math.min(SERVICES.length - 1, Math.round(t.scrollLeft / (card.offsetWidth + 16))));
  };
  const goTo = (i: number) => {
    const t = grid.current;
    const card = t?.querySelectorAll<HTMLElement>("[data-bento-card]")[i];
    if (t && card) t.scrollTo({ left: card.offsetLeft - t.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section data-logi="Four ways we take work off your plate." className="bg-background py-section">
      <div className="container mx-auto max-w-[75rem] px-gutter">
        <div className="mx-auto mb-section-head max-w-[48rem] space-y-5 text-center">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="font-display text-h2 font-bold">
            Four ways we take work <span className="text-gradient">off your plate</span>
          </h2>
          <p className="mx-auto max-w-2xl text-body text-muted-foreground">
            Pick one, or let us combine them into one system that fits how your business actually runs.
          </p>
        </div>
        <div
          ref={grid}
          role="region"
          aria-label="Our four services"
          onScroll={onScroll}
          className="-mx-gutter flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-2 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {SERVICES.map((s, i) => (
            <BentoCard key={s.id} s={s} i={i} />
          ))}
        </div>
        <div className="mt-4 flex justify-center lg:hidden" role="group" aria-label="Choose a service">
          {SERVICES.map((s, i) => (
            <button key={s.id} type="button" onClick={() => goTo(i)} aria-label={s.name} aria-current={i === dot ? "true" : undefined} className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--focus-ring))]">
              <span className={`block h-2.5 rounded-full transition-all ${i === dot ? "w-6 bg-primary-ink" : "w-2.5 bg-border"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBento;
