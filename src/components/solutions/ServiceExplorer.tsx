import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/company";
import ServiceVignette from "./ServiceVignette";

type Service = (typeof SERVICES)[number];

const BTN = "h-auto min-h-[2.75rem] whitespace-normal rounded-full border-0 bg-primary px-6 font-semibold text-primary-on hover:bg-primary/90";

/** matchMedia as state; the site is a client-rendered SPA, so reading it on first render is safe. */
const useMinWidth = (query: string) => {
  const [on, setOn] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const fn = () => setOn(m.matches);
    fn();
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, [query]);
  return on;
};

const Lists = ({ s }: { s: Service }) => (
  <>
    <h4 className="font-display text-body font-bold text-foreground">Typical examples</h4>
    <ul className="mt-2 flex flex-wrap gap-2">
      {s.examples.map((e) => (
        <li key={e} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-body-sm text-foreground">
          {e}
        </li>
      ))}
    </ul>
    <h4 className="mt-5 font-display text-body font-bold text-foreground">What you get</h4>
    <ul className="mt-2 space-y-2">
      {s.deliverables.map((e) => (
        <li key={e} className="flex items-start gap-2 text-body-sm text-muted-foreground">
          <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-primary-ink" />
          {e}
        </li>
      ))}
    </ul>
  </>
);

const Cta = ({ s }: { s: Service }) => (
  <Button asChild className={`${BTN} mt-6`}>
    <Link to="/contact">
      Discuss your project<span className="sr-only"> ({s.name})</span>
    </Link>
  </Button>
);

const Details = ({ s, fold = false }: { s: Service; fold?: boolean }) => (
  <>
    <p className="text-body text-muted-foreground">{s.desc}</p>
    {/* TODO(owner): confirm the examples and deliverables for each service. */}
    {fold ? (
      <details className="group mt-4 rounded-xl border border-border bg-card">
        <summary className="flex min-h-[2.75rem] cursor-pointer list-none items-center justify-between gap-3 px-4 text-body-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
          Typical examples and what you get
          <ChevronDown size={16} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
        </summary>
        <div className="px-4 pb-4 pt-1">
          <Lists s={s} />
        </div>
      </details>
    ) : (
      <div className="mt-5">
        <Lists s={s} />
      </div>
    )}
    <Cta s={s} />
  </>
);

/** Desktop: a sticky list on the left, one demo per service scrolling past on the right. */
const Pinned = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let cur = 0;
      items.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) cur = i;
      });
      const el = items.current[cur];
      const r = el ? el.getBoundingClientRect() : null;
      const p = r ? Math.min(1, Math.max(0, (line - r.top) / r.height)) : 0;
      setActive((a) => (a === cur ? a : cur));
      fills.current.forEach((f, i) => {
        if (f) f.style.transform = `scaleY(${i === cur ? (reduce ? 1 : p) : 0})`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div className="grid grid-cols-12 items-start gap-x-12">
      <div className="sticky top-[calc(var(--header-h)+2rem)] col-span-5 self-start">
        <ul className="space-y-3">
          {SERVICES.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.id} className="relative pl-6">
                <span aria-hidden="true" className={`absolute bottom-0 left-0 top-0 w-0.5 ${on ? "bg-primary/25" : "bg-border"}`} />
                <span
                  aria-hidden="true"
                  ref={(el) => (fills.current[i] = el)}
                  className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-primary-ink"
                  style={{ transform: "scaleY(0)" }}
                />
                <h3 className="font-display text-h3 font-bold">
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? "true" : undefined}
                    className={`block min-h-[2.75rem] py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--focus-ring))] ${
                      on ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.name}
                  </a>
                </h3>
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden" {...(on ? {} : ({ inert: "" } as object))}>
                    <p className="font-display text-lead font-semibold text-primary-ink">{s.promise}</p>
                    <div className="mt-2 pb-2">
                      <Details s={s} />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-span-7">
        {SERVICES.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={(el) => (items.current[i] = el)}
            data-logi={`${s.name}: ${s.promise}`}
            className={`scroll-mt-4 ${i < SERVICES.length - 1 ? "pb-[18svh] min-h-[70svh]" : ""}`}
          >
            <ServiceVignette id={s.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

/** Tablet and phone: one card per service, demo first, no pinning. */
const Stacked = () => {
  const wide = useMinWidth("(min-width: 40em)");
  return (
  <ul className="grid gap-12 md:gap-16">
    {SERVICES.map((s) => (
      <li key={s.id} id={s.id} data-logi={`${s.name}: ${s.promise}`} className="scroll-mt-4">
        <ServiceVignette id={s.id} />
        <h3 className="mt-6 font-display text-h3 font-bold text-foreground">{s.name}</h3>
        <p className="mt-1 font-display text-lead font-semibold text-primary-ink">{s.promise}</p>
        <div className="mt-3 max-w-[40rem]">
          <Details s={s} fold={!wide} />
        </div>
      </li>
    ))}
  </ul>
  );
};

const ServiceExplorer = () => {
  const desktop = useMinWidth("(min-width: 64em)");
  return (
    <section aria-labelledby="services-h" id="services" className="bg-background py-section">
      <div className="container mx-auto max-w-[75rem] px-gutter">
        <h2 id="services-h" className="sr-only">
          Our services
        </h2>
        {desktop ? <Pinned /> : <Stacked />}
      </div>
    </section>
  );
};

export default ServiceExplorer;
