import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import { Button } from "@/components/ui/button";
import { openLeadModal } from "@/components/LeadCaptureModal";
import { DECISIONS, IKURO_PILOT_STATUS, IKURO_PLANS, SHOW_IKURO_PRICING } from "@/data/ikuro";

const scrollToId = (id: string) => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
};

/* 1. Hero */
export const IkuroHero = () => (
  <section data-logi-dock className="relative flex min-h-[85svh] items-center bg-background pb-section-sm pt-32 md:pt-44">
    <div className="container mx-auto px-gutter max-w-[56rem] text-center">
      <picture style={{ display: "contents" }}>
        <source type="image/webp" srcSet="/brand/ikuro/ikuro-logo.webp" />
        <img
          src="/brand/ikuro/ikuro-logo.png"
          width={1001}
          height={848}
          alt="IKURO"
          decoding="async"
          fetchPriority="high"
          className="mx-auto h-auto w-[min(16rem,60vw)]"
        />
      </picture>
      <h1 className="mt-8 font-display text-h1 font-bold text-foreground">Better decisions for every student</h1>
      <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-foreground">
        IKURO is an AI-powered student decision platform by Logisaar. It understands your goals, reasons through your options and helps you choose your next course, college, skill, internship or career step.
      </p>
      <p className="mx-auto mt-6 inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-label font-medium text-foreground" data-logi-avoid>
        {IKURO_PILOT_STATUS}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button size="lg" className="rounded-full px-8" onClick={() => openLeadModal("ikuro-pilot")}>
          Join the pilot <ArrowRight size={16} className="ml-2" aria-hidden="true" />
        </Button>
        <Button size="lg" variant="outline" className="rounded-full border-foreground/20 bg-transparent px-8" onClick={() => scrollToId("colleges")}>
          For colleges
        </Button>
      </div>
    </div>
  </section>
);

/* 4. What it helps you decide */
export const IkuroDecide = () => (
  <section className="bg-background py-section">
    <div className="container mx-auto px-gutter max-w-[75rem]">
      <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
        <Eyebrow>What it helps you decide</Eyebrow>
        <h2 className="font-display text-h2 font-bold text-foreground">Six choices, one place</h2>
      </div>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-5 p-0">
        {DECISIONS.map(({ title, text, icon: Icon }) => (
          <li key={title} className="rounded-2xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-0.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary-ink">
              <Icon size={20} aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-h3 font-bold text-foreground">{title}</h3>
            <p className="mt-1 text-body-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* 6. For colleges */
const BARS = [72, 54, 86, 41, 63];
export const IkuroColleges = () => {
  const reduce = useReducedMotion();
  return (
    <section id="colleges" data-logi="Colleges can pilot it too." className="scroll-mt-28 bg-secondary/60 py-section">
      <div className="container mx-auto grid max-w-[75rem] items-center gap-12 px-gutter lg:grid-cols-2">
        <div className="space-y-5">
          <Eyebrow>For colleges</Eyebrow>
          <h2 className="font-display text-h2 font-bold text-foreground">See where students stand, and where they need help</h2>
          <p className="text-body text-muted-foreground">
            Dashboards for student insight and placement readiness. College pilots begin in 2026.
          </p>
          <Button size="lg" className="rounded-full px-8" onClick={() => openLeadModal("ikuro-college")}>
            Talk to us about a pilot <ArrowRight size={16} className="ml-2" aria-hidden="true" />
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
            <span className="ml-auto rounded-full bg-background px-2.5 py-0.5 text-label text-muted-foreground">Illustrative</span>
          </div>
          <div className="space-y-4 p-6">
            <p className="font-display text-h3 font-bold text-foreground">Placement readiness by branch</p>
            {BARS.map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-label text-muted-foreground">Branch {String.fromCharCode(65 + i)}</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "hsl(var(--ikuro-orange))" }}
                    initial={reduce ? { width: `${w}%` } : { width: 0 }}
                    whileInView={{ width: `${w}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 7. Trust */
export const IkuroTrust = () => (
  <section className="bg-background py-section-sm">
    <div className="container mx-auto max-w-[44rem] px-gutter text-center">
      <h2 className="font-display text-h2 font-bold text-foreground">We don't sell student data</h2>
      <p className="mt-4 text-body text-muted-foreground">
        Students share goals, interests and context so IKURO can guide them. We do not sell that data.
        {/* TODO(owner): link to the IKURO privacy page when it exists */}
      </p>
    </div>
  </section>
);

/* 8. Pricing (planned): hidden until the owner confirms */
export const IkuroPricing = () => {
  if (!SHOW_IKURO_PRICING) return null;
  return (
    <section className="bg-secondary/60 py-section">
      <div className="container mx-auto max-w-[56rem] px-gutter">
        <div className="mb-10 text-center">
          <Eyebrow>Planned pricing</Eyebrow>
          <h2 className="mt-3 font-display text-h2 font-bold text-foreground">Start free</h2>
        </div>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-6 p-0">
          {IKURO_PLANS.map((p) => (
            <li key={p.name} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-h3 font-bold text-foreground">{p.name}</h3>
              <p className="mt-2 font-display text-h2 font-bold text-foreground">{p.price}</p>
              {"alt" in p && <p className="text-label text-muted-foreground">{p.alt}</p>}
              <ul className="mt-4 list-disc space-y-1 pl-5 text-body-sm text-muted-foreground">{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* 10. Closing band (navy) */
export const IkuroClosing = () => (
  <section className="on-dark bg-[hsl(var(--ikuro-navy))] py-section text-white">
    <div className="container mx-auto max-w-[56rem] px-gutter text-center">
      <picture style={{ display: "contents" }}>
        <source type="image/webp" srcSet="/brand/ikuro/ikuro-wordmark-white.webp" />
        <img src="/brand/ikuro/ikuro-wordmark-white.png" width={849} height={244} alt="IKURO" loading="lazy" decoding="async" className="mx-auto h-auto w-[min(10rem,45vw)]" />
      </picture>
      <h2 className="mt-8 font-display text-h2 font-bold">Every great future begins with one better decision</h2>
      <Button size="lg" className="mt-8 rounded-full bg-[hsl(var(--ikuro-orange))] px-8 text-[hsl(var(--ikuro-navy))] hover:bg-[hsl(var(--ikuro-orange))]/90" onClick={() => openLeadModal("ikuro-pilot")}>
        Join the pilot <ArrowRight size={16} className="ml-2" aria-hidden="true" />
      </Button>
    </div>
  </section>
);
