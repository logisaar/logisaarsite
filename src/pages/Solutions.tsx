import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BrainCircuit, Bot, Code2, Layers, MessageCircle, Workflow, Wrench, CalendarClock, type LucideIcon } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Eyebrow from "@/components/Eyebrow";
import ResponsiveImage from "@/components/ResponsiveImage";
import ServiceExplorer from "@/components/solutions/ServiceExplorer";
import SolutionCard from "@/components/solutions/SolutionCard";
import ProjectTimeline from "@/components/solutions/ProjectTimeline";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SERVICES, PROJECT_STEPS } from "@/data/company";
import { INDUSTRIES, SOLUTIONS, priceLine, type Solution } from "@/data/solutions";
import { siteUrl } from "@/lib/site";

const BTN = "h-auto min-h-[2.75rem] whitespace-normal rounded-full border-0 bg-primary px-6 font-semibold text-primary-on hover:bg-primary/90";
const BTN_OUTLINE = "h-auto min-h-[2.75rem] whitespace-normal rounded-full border-2 border-primary/40 px-6 font-semibold";
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--focus-ring))]";

const SERVICE_ICON: Record<(typeof SERVICES)[number]["id"], LucideIcon> = {
  "software-development": Code2,
  "ai-agents": Bot,
  "business-automation": Workflow,
  "ai-software": BrainCircuit,
};

// Short chip labels; the full name stays in aria-label and title.
const SHORT: Record<(typeof INDUSTRIES)[number], string> = {
  All: "All",
  Education: "Education",
  Hospitality: "Hospitality",
  Sales: "Sales",
  "Customer service": "Service",
  "Food & beverage": "Food",
  Travel: "Travel",
  "Agencies & freelancers": "Agencies",
  "Any business": "Any business",
};

// Keep in step with About "How we work" and the Contact page "What happens next".
// TODO(owner): confirm the wording of these three ways of working.
const WAYS = [
  {
    title: "Ready-made, then customised",
    text: "Start from one of the systems above and we adapt it to how your business runs. Fastest to go live.",
    icon: Layers,
    link: "ready-made" as const,
    cta: "See ready-made solutions",
  },
  {
    title: "Custom project",
    text: "Tell us what you need and we build it from scratch: software, an AI agent or an automation.",
    icon: Wrench,
    link: "contact" as const,
    cta: "Start a project",
  },
  {
    title: "Monthly support",
    text: `AI agent solutions have a monthly fee after setup: ${SOLUTIONS.filter((s) => s.monthly)
      .map((s) => `${s.monthly}/month for the ${s.name}`)
      .join(", ")}.`,
    icon: CalendarClock,
    link: "agents" as const,
    cta: "See AI agent solutions",
  },
];

// TODO(owner): confirm each FAQ answer before launch.
const FAQ = [
  { q: "Can you change a ready-made system to fit us?", a: "Yes. The ready-made systems are a starting point. We adapt screens, fields and reports to how your team works." },
  { q: "How do prices work?", a: "Each solution shows its starting price. After a free call you get a written scope and a fixed quote, so you see the full cost before work begins." },
  { q: "Do you work with clients outside India?", a: "Yes. We run calls and delivery online and work with clients in India and abroad." },
  { q: "What happens after launch?", a: "We stay available for fixes and improvements. AI agent solutions have a monthly fee, shown on their cards and detail pages." },
];

const Solutions = () => {
  const reduce = useReducedMotion();
  const [industry, setIndustry] = useState<(typeof INDUSTRIES)[number]>("All");
  const [agentsOnly, setAgentsOnly] = useState(false);
  const shown = agentsOnly ? SOLUTIONS.filter((s) => s.monthly) : industry === "All" ? SOLUTIONS : SOLUTIONS.filter((s) => s.industry === industry);

  const pick = (name: (typeof INDUSTRIES)[number]) => {
    setAgentsOnly(false);
    setIndustry(name);
  };

  return (
    <Layout>
      <SEO
        title="Solutions | Custom software, AI agents and business automation | Logisaar"
        description="Custom software, AI agents and business automation for growing businesses, plus ready-made systems for schools, hotels, sales teams and more. Fixed quote before we start."
        keywords="custom software development, AI agent development, business automation, AI software, school management software Odisha, hotel software, AI receptionist, custom CRM, Logisaar"
        canonical={siteUrl("/solutions")}
      />

      {/* 1. Hero (tint) */}
      <section data-logi-dock className="relative overflow-hidden bg-secondary/40 py-section-sm">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-cover bg-center opacity-30 md:block" style={{ backgroundImage: "url('/hero-bg.svg')" }} />
        <div aria-hidden="true" className="animated-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="container relative z-10 mx-auto max-w-[75rem] px-gutter text-center">
          <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Eyebrow>Solutions</Eyebrow>
          </motion.div>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-4 max-w-[40ch] text-balance font-display text-h1-page font-bold text-foreground"
          >
            <span className="hidden md:inline">Software, AI agents and automation</span>
            <span className="md:hidden">Software, AI agents &amp; automation</span>
            <span className="block text-primary-ink">built around your business</span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            data-logi-avoid
            className="mx-auto mt-5 max-w-[60ch] text-balance text-lead text-muted-foreground"
          >
            Start from one of our ready-made systems or have us build exactly what you need. Either way you get a clear plan and a fixed quote first.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild className={BTN}>
              <Link to="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="outline" className={BTN_OUTLINE}>
              <a href="#ready-made">See ready-made solutions</a>
            </Button>
          </motion.div>

          {/* Service jump bar: four equal cards, one scrollable row on phones */}
          <motion.nav
            aria-label="Our four services"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="-mx-gutter mt-10 overflow-x-auto px-gutter pb-2 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
          >
            <ul className="flex gap-3 md:grid md:grid-cols-4 md:gap-4">
              {SERVICES.map((s) => {
                const Ic = SERVICE_ICON[s.id];
                return (
                  <li key={s.id} className="w-[15rem] shrink-0 md:w-auto">
                    <a
                      href={`#${s.id}`}
                      className={`group flex h-full flex-col gap-1.5 rounded-2xl border border-border bg-card p-4 text-left transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS}`}
                    >
                      <Ic size={20} aria-hidden="true" className="text-primary-ink" />
                      <span className="font-display text-body font-bold text-foreground">{s.name}</span>
                      <span className="text-body-sm text-muted-foreground">{s.promise}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        </div>
      </section>

      {/* 2. Service explorer (white) */}
      <ServiceExplorer />

      {/* 3. Ready-made solutions (off-white) */}
      <section id="ready-made" aria-labelledby="ready-h" data-logi="Ready-made, then made yours." className="bg-secondary/40 py-section">
        <div className="container mx-auto max-w-[75rem] px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Ready-made solutions</Eyebrow>
            <h2 id="ready-h" className="mt-3 text-balance font-display text-h2-page font-bold text-foreground">Proven systems, customised to your business</h2>
            <p className="mt-3 text-body text-muted-foreground">Prices are starting prices. After a free call you get a fixed quote in writing.</p>
          </div>

          <div
            role="group"
            aria-label="Filter by industry"
            className="-mx-gutter mt-8 overflow-x-auto px-gutter [mask-image:linear-gradient(to_right,transparent,#000_1.25rem,#000_calc(100%-1.25rem),transparent)] lg:mx-0 lg:px-0 lg:[mask-image:none]"
          >
            <div className="mx-auto flex w-max gap-2 px-5 lg:px-0">
              {INDUSTRIES.map((name) => {
                const on = !agentsOnly && industry === name;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={on}
                    aria-label={name}
                    title={name}
                    onClick={() => pick(name)}
                    className={`inline-flex min-h-[2.75rem] shrink-0 items-center rounded-full border px-4 text-body-sm font-medium transition-colors ${FOCUS} ${
                      on ? "border-primary bg-primary text-primary-on" : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    {SHORT[name]}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="mt-4 text-center text-body-sm text-muted-foreground" role="status" aria-live="polite">
            Showing {shown.length} {shown.length === 1 ? "solution" : "solutions"}
            {agentsOnly ? " with a monthly fee" : industry !== "All" ? ` for ${industry.toLowerCase()}` : ""}
          </p>

          {/* Phones: one swipeable row (keeps the page short). From 40em: a grid of equal-height cards. */}
          <motion.ul
            layout={!reduce}
            className="-mx-gutter mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-3 sm:mx-0 sm:grid sm:auto-rows-fr sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((sol) => (
                <motion.li
                  key={sol.id}
                  layout={!reduce}
                  className="w-[84%] shrink-0 snap-center sm:w-auto"
                  initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                >
                  <SolutionCard sol={sol} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          {/* TODO(owner): third-party tools such as WhatsApp, Razorpay and Google Calendar are listed on detail pages as "works with" integrations only. */}
        </div>
      </section>

      {/* 4. How a project works (white) */}
      <section data-logi="Four steps, no surprises." aria-labelledby="steps-h" className="bg-background py-section">
        <div className="container mx-auto max-w-[75rem] px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How a project works</Eyebrow>
            <h2 id="steps-h" className="mt-3 font-display text-h2-page font-bold text-foreground">From first call to launch</h2>
          </div>
          <ProjectTimeline steps={PROJECT_STEPS} />
        </div>
      </section>

      {/* 5. Ways to work with us (off-white) */}
      <section data-logi="Pick the way that suits you." aria-labelledby="ways-h" className="bg-secondary/40 py-section">
        <div className="container mx-auto max-w-[75rem] px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Ways to work with us</Eyebrow>
            <h2 id="ways-h" className="mt-3 font-display text-h2-page font-bold text-foreground">Three ways to start</h2>
          </div>
          <ul className="mx-auto mt-10 grid auto-rows-fr gap-6 md:grid-cols-3">
            {WAYS.map((w) => {
              const Ic = w.icon;
              const cls = `mt-auto inline-flex min-h-[2.75rem] items-center gap-1.5 pt-4 text-body-sm font-semibold text-primary-ink hover:underline ${FOCUS}`;
              return (
                <li key={w.title} className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 sm:p-6">
                  <Ic size={20} aria-hidden="true" className="text-primary-ink" />
                  <h3 className="mt-3 font-display text-h3 font-bold text-foreground">{w.title}</h3>
                  <p className="mt-2 text-body-sm text-muted-foreground">{w.text}</p>
                  {w.link === "contact" ? (
                    <Link to="/contact" className={cls}>
                      {w.cta} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  ) : (
                    <a
                      href="#ready-made"
                      onClick={() => {
                        setAgentsOnly(w.link === "agents");
                        if (w.link !== "agents") setIndustry("All");
                      }}
                      className={cls}
                    >
                      {w.cta} <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 6. FAQ (white) */}
      <section aria-labelledby="faq-h" className="bg-background py-section">
        <div className="container mx-auto max-w-[75rem] px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-h" className="mt-3 font-display text-h2-page font-bold text-foreground">Common questions</h2>
          </div>
          <Accordion type="single" collapsible className="mx-auto mt-8 max-w-[48rem] rounded-2xl border border-border bg-card px-6">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`}>
                <AccordionTrigger className="min-h-[2.75rem] text-left text-body font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-body-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </Layout>
  );
};

export default Solutions;
