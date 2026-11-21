import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Eyebrow from "@/components/Eyebrow";
import ResponsiveImage from "@/components/ResponsiveImage";
import ServiceVignette from "@/components/solutions/ServiceVignette";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { whatsappLink } from "@/lib/contact";
import { SERVICES } from "@/data/company";
import { INDUSTRIES, SOLUTIONS, priceLine, type Solution } from "@/data/solutions";

const CARD = "flex h-full flex-col rounded-2xl border border-border bg-card p-6";
const BTN = "h-auto min-h-[2.75rem] whitespace-normal rounded-full border-0 bg-primary px-6 font-semibold text-primary-on hover:bg-primary/90";
const BTN_OUTLINE = "h-auto min-h-[2.75rem] whitespace-normal rounded-full border-2 border-primary/40 px-6 font-semibold";
// The global scroll-padding-top already keeps anchors clear of the fixed header
const ANCHOR = "";

// Keep in step with About "How we work" and the Contact page "What happens next".
const PROJECT_STEPS = [
  { title: "Free call", text: "Tell us what is slowing your business down. We listen first." },
  { title: "Clear plan and fixed quote", text: "You get the scope and the full price in writing before any work starts." },
  { title: "Build with regular demos", text: "You see working software as it grows, and tell us what to change." },
  { title: "Launch and support", text: "We go live together and stay around afterwards." },
];

// TODO(owner): confirm the wording of these three ways of working.
const WAYS = [
  { title: "Ready-made, then customised", text: "Start from one of the systems above and we adapt it to how your business runs. Fastest to go live." },
  { title: "Custom project", text: "Tell us what you need and we build it from scratch: software, an AI agent or an automation." },
  {
    title: "Monthly support",
    text: `AI agent solutions have a monthly fee after setup: ${SOLUTIONS.filter((s) => s.monthly)
      .map((s) => `${s.monthly}/month for the ${s.name}`)
      .join(", ")}.`,
  },
];

// TODO(owner): confirm each FAQ answer before launch.
const FAQ = [
  { q: "Can you change a ready-made system to fit us?", a: "Yes. The ready-made systems are a starting point. We adapt screens, fields and reports to how your team works." },
  { q: "How do prices work?", a: "Each solution shows its starting price. After a free call you get a written scope and a fixed quote, so you see the full cost before work begins." },
  { q: "Do you work with clients outside India?", a: "Yes. We run calls and delivery online and work with clients in India and abroad." },
  { q: "What happens after launch?", a: "We stay available for fixes and improvements. AI agent solutions have a monthly fee, shown on their cards and detail pages." },
];

const SolutionCard = ({ sol }: { sol: Solution }) => {
  const price = priceLine(sol);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="bg-secondary/60 p-4">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-3 py-2" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <ResponsiveImage
              image={sol.img}
              alt={`${sol.name} screen`}
              sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 90vw"
              className="h-full w-full object-cover object-top"
            />
            <span className="absolute left-3 top-3 rounded-full bg-foreground px-3 py-1 text-label font-semibold text-background">{sol.industry}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-h3 font-bold text-foreground">{sol.name}</h3>
        <p className="mt-2 text-body-sm text-muted-foreground">{sol.outcome}</p>
        <p className="mt-4 font-semibold text-foreground">
          {price.from}
          {price.monthly && <span className="font-normal text-muted-foreground"> + {price.monthly}</span>}
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-5">
          <Button asChild className={`${BTN} flex-1`}>
            <Link to={sol.path}>
              View details<span className="sr-only"> for {sol.name}</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className={`${BTN_OUTLINE} flex-1 gap-2`}>
            <a href={whatsappLink(sol.wa)} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} aria-hidden="true" />
              Ask on WhatsApp<span className="sr-only"> about {sol.name} (opens in a new tab)</span>
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
};

const Solutions = () => {
  const reduce = useReducedMotion();
  const [industry, setIndustry] = useState<(typeof INDUSTRIES)[number]>("All");
  const shown = industry === "All" ? SOLUTIONS : SOLUTIONS.filter((s) => s.industry === industry);

  // The page's one scroll-drawn line (How a project works)
  const stepsRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 75%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <Layout>
      <SEO
        title="Solutions | Custom software, AI agents and business automation | Logisaar"
        description="Custom software, AI agents and business automation for growing businesses, plus ready-made systems for schools, hotels, sales teams and more. Fixed quote before we start."
        keywords="custom software development, AI agent development, business automation, AI software, school management software Odisha, hotel software, AI receptionist, custom CRM, Logisaar"
        canonical="https://www.logisaar.in/solutions"
      />

      {/* 1. Hero */}
      <section
        data-logi-dock
        className="relative overflow-hidden bg-background pb-section-sm"
        style={{ paddingTop: "calc(var(--header-h) + clamp(1.5rem, 4vw, 3rem))" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-cover bg-center opacity-50 md:block" style={{ backgroundImage: "url('/hero-bg.svg')" }} />
        <div aria-hidden="true" className="animated-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="container relative z-10 mx-auto max-w-3xl px-gutter text-center">
          <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Eyebrow>Solutions</Eyebrow>
          </motion.div>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-4 max-w-[22ch] text-balance font-display text-h1-page font-bold text-foreground"
          >
            Software, AI agents and automation, built around your business
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            data-logi-avoid
            className="mx-auto mt-6 max-w-[60ch] text-balance text-lead text-muted-foreground"
          >
            Start from one of our ready-made systems or have us build exactly what you need. Either way you get a clear plan and a fixed quote first.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild className={BTN}>
              <Link to="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="outline" className={BTN_OUTLINE}>
              <a href="#ready-made">See ready-made solutions</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Four services */}
      {SERVICES.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-h`}
          data-logi={`${s.name}: ${s.promise}`}
          className={`${ANCHOR} py-section ${i % 2 === 0 ? "bg-secondary/40" : "bg-background"}`}
        >
          <div className="container mx-auto grid max-w-6xl items-center gap-10 px-gutter lg:grid-cols-2 lg:gap-14">
            <motion.div
              className={i % 2 === 1 ? "lg:order-2" : ""}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Eyebrow>{s.name}</Eyebrow>
              <h2 id={`${s.id}-h`} className="mt-3 text-balance font-display text-h2 font-bold text-foreground">{s.promise}</h2>
              <p className="mt-4 text-body text-muted-foreground">{s.desc}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-body font-bold text-foreground">Typical examples</h3>
                  <ul className="mt-3 space-y-2">
                    {s.examples.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-body-sm text-muted-foreground">
                        <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-primary-ink" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-body font-bold text-foreground">What you get</h3>
                  <ul className="mt-3 space-y-2">
                    {s.deliverables.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-body-sm text-muted-foreground">
                        <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-primary-ink" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* TODO(owner): confirm the examples and deliverables for each service. */}
              <Button asChild className={`${BTN} mt-8`}>
                <Link to="/contact">
                  Discuss your project<span className="sr-only"> ({s.name})</span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ServiceVignette id={s.id} />
            </motion.div>
          </div>
        </section>
      ))}

      {/* 3. Ready-made solutions */}
      <section id="ready-made" aria-labelledby="ready-h" data-logi="Ready-made, then made yours." className={`${ANCHOR} bg-background py-section`}>
        <div className="container mx-auto px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Ready-made solutions</Eyebrow>
            <h2 id="ready-h" className="mt-3 text-balance font-display text-h2 font-bold text-foreground">Proven systems, customised to your business</h2>
            <p className="mt-4 text-body text-muted-foreground">Prices are starting prices. After a free call you get a fixed quote in writing.</p>
          </div>

          <div role="group" aria-label="Filter by industry" className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
            {INDUSTRIES.map((name) => {
              const on = industry === name;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setIndustry(name)}
                  className={`inline-flex min-h-[2.75rem] items-center rounded-full border px-4 text-body-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--focus-ring))] ${
                    on ? "border-primary bg-primary text-primary-on" : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-center text-label text-muted-foreground" role="status" aria-live="polite">
            Showing {shown.length} {shown.length === 1 ? "solution" : "solutions"}
            {industry !== "All" ? ` for ${industry.toLowerCase()}` : ""}
          </p>

          <motion.ul layout={!reduce} className="mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((sol) => (
                <motion.li
                  key={sol.id}
                  layout={!reduce}
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

      {/* 4. How a project works */}
      <section data-logi="Four steps, no surprises." aria-labelledby="steps-h" className="bg-secondary/40 py-section">
        <div className="container mx-auto max-w-3xl px-gutter">
          <div className="text-center">
            <Eyebrow>How a project works</Eyebrow>
            <h2 id="steps-h" className="mt-3 font-display text-h2 font-bold text-foreground">From first call to launch</h2>
          </div>
          <ol ref={stepsRef} className="relative mt-12 space-y-10 pl-14">
            <span aria-hidden="true" className="absolute bottom-2 left-[1.1875rem] top-2 w-0.5 bg-border" />
            <motion.span
              aria-hidden="true"
              className="absolute bottom-2 left-[1.1875rem] top-2 w-0.5 origin-top bg-primary"
              style={{ scaleY: reduce ? 1 : line }}
            />
            {PROJECT_STEPS.map((st, i) => (
              <li key={st.title} className="relative">
                <span className="absolute -left-14 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-body font-bold text-primary-on">{i + 1}</span>
                <h3 className="font-display text-h3 font-bold text-foreground">{st.title}</h3>
                <p className="mt-1 text-body text-muted-foreground">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Ways to work with us */}
      <section data-logi="Pick the way that suits you." aria-labelledby="ways-h" className="bg-background py-section">
        <div className="container mx-auto px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Ways to work with us</Eyebrow>
            <h2 id="ways-h" className="mt-3 font-display text-h2 font-bold text-foreground">Three ways to start</h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            {WAYS.map((w) => (
              <li key={w.title} className={CARD}>
                <h3 className="font-display text-h3 font-bold text-foreground">{w.title}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. FAQ + contact CTA */}
      <section aria-labelledby="faq-h" className="bg-secondary/40 py-section-sm">
        <div className="container mx-auto max-w-3xl px-gutter">
          <h2 id="faq-h" className="text-center font-display text-h2 font-bold text-foreground">Common questions</h2>
          <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-border bg-card px-6">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`}>
                <AccordionTrigger className="min-h-[2.75rem] text-left text-body font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-body-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-14 text-center">
            <h2 className="font-display text-h2 font-bold text-foreground">Tell us what slows your business down</h2>
            <p className="mt-3 text-body text-muted-foreground">We reply with questions or a call slot, then send a clear plan and a fixed quote.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild className={BTN}>
                <Link to="/contact">
                  Start a project <ArrowRight size={16} aria-hidden="true" className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className={BTN_OUTLINE}>
                <a href={whatsappLink("Hi Logisaar, I'd like to talk about a project.")} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
