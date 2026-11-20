import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Monitor, Sparkles, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Eyebrow from "@/components/Eyebrow";
import TeamSection from "@/components/about/TeamSection";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/contact";
import { FOUNDED, PROJECTS_DELIVERED, SERVICES } from "@/data/company";

const SERVICE_ICONS = {
  "software-development": Monitor,
  "ai-agents": Bot,
  "business-automation": Zap,
  "ai-software": Sparkles,
} as const;

const milestones = [
  { year: "Sep 2025", title: "Logisaar founded", description: "Two engineers from Odisha start Logisaar, building software for businesses close to home." },
  { year: "Late 2025", title: "First client projects delivered", description: "The first web, database and automation projects go live for local businesses." },
  { year: "2025", title: "TechXera launched", description: "TechXera starts as a programming club at Nalanda, bridging academics and industry." },
  { year: "Nov 2026", title: "TechXera becomes IKURO", description: "Renamed IKURO and rebuilt as an AI student decision platform, in development with pilots among first-year engineering students. Chalk to Choice is part of it." },
  { year: "2026", title: "HeyLane launching", description: "HeyLane, the neighbourhood app for places, is getting ready to launch in Bhubaneswar. We are hiring." },
];

// TODO(owner): confirm each of these four working promises before launch.
const HOW_WE_WORK = [
  { title: "Fixed quote before we start", desc: "You see the full cost in writing before any work begins." },
  { title: "Weekly demos while we build", desc: "You see working software every week, not a reveal at the end." },
  { title: "You own what we build for you", desc: "The code and data for your project belong to you." },
  { title: "Support after launch", desc: "We stay around once it is live, so small problems do not pile up." },
];

const CARD = "flex h-full flex-col rounded-2xl border border-border bg-card p-6";
const BTN = "min-h-[2.75rem] rounded-full border-0 bg-primary px-6 font-semibold text-primary-on hover:bg-primary/90";

const About = () => {
  return (
    <Layout>
      <SEO
        title="About Logisaar | Software, AI agents and automation from Odisha"
        description="Logisaar builds custom software, AI agents and business automation for growing businesses, and makes its own products, IKURO and HeyLane. Based in Bhubaneswar, Odisha."
        keywords="about Logisaar, software company Odisha, AI agents, business automation, Chinmay Kumar Panda, Biswanath Prasanna Satyabrata Kar, Bhubaneswar, Cuttack"
        canonical="https://www.logisaar.in/about"
      />

      {/* Hero */}
      <section data-logi-dock className="relative overflow-hidden bg-background pb-section-sm" style={{ paddingTop: "calc(var(--header-h) + clamp(1.5rem, 4vw, 3rem))" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-cover bg-center opacity-50 md:block"
          style={{ backgroundImage: "url('/hero-bg.svg')" }}
        />
        <div aria-hidden="true" className="animated-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="container relative z-10 mx-auto max-w-3xl px-gutter text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Eyebrow>About Logisaar</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 text-balance font-display text-h1 font-bold text-foreground"
          >
            Engineers from Odisha, building software that does real work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            data-logi-avoid
            className="mx-auto mt-6 max-w-2xl text-balance text-lead text-muted-foreground"
          >
            Logisaar Technologies builds custom software, AI agents and business automation for growing businesses, and makes its own products, IKURO and HeyLane. We started in September 2025 and work from Bhubaneswar.
          </motion.p>
        </div>
      </section>

      {/* At a glance */}
      <section data-logi="Small team, real systems." aria-label="Logisaar at a glance" className="border-y border-border bg-secondary/40 py-section-sm">
        <div className="container mx-auto px-gutter">
          <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 text-center lg:grid-cols-4">
            {[
              { k: "Founded", v: FOUNDED },
              { k: "Registered in", v: "Cuttack, Odisha" },
              { k: "Team based in", v: "Bhubaneswar" },
              { k: "Projects delivered", v: PROJECTS_DELIVERED },
            ].map((f) => (
              <div key={f.k}>
                <dt className="text-label font-medium text-muted-foreground">{f.k}</dt>
                <dd className="mt-1 font-display text-h3 font-bold text-foreground">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-label text-muted-foreground">
            Logisaar Technologies Pvt Ltd · CIN {CONTACT.cin}
          </p>
        </div>
      </section>

      {/* Why we exist */}
      <section data-logi="We build the right-sized version." aria-labelledby="why-h" className="bg-background py-section">
        <div className="container mx-auto max-w-3xl px-gutter text-center">
          <Eyebrow>Why we exist</Eyebrow>
          <h2 id="why-h" className="mt-3 font-display text-h2 font-bold text-foreground">
            Right-sized software for growing businesses
          </h2>
          <p className="mt-6 text-lead text-muted-foreground">
            Most small and growing businesses run on spreadsheets, WhatsApp and memory. Enterprise software is too big and too expensive for them, and off-the-shelf apps don&rsquo;t fit how they work. We build the right-sized version and stay around after launch.
          </p>
          <p className="mt-6 text-body text-muted-foreground">
            We also help students make better decisions through{" "}
            <Link to="/ikuro" className="font-medium text-primary-ink underline underline-offset-4">
              IKURO
            </Link>
            .
          </p>
        </div>
      </section>

      {/* What we do */}
      <section data-logi="Four services, two products." aria-labelledby="do-h" className="bg-secondary/40 py-section">
        <div className="container mx-auto px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What we do</Eyebrow>
            <h2 id="do-h" className="mt-3 font-display text-h2 font-bold text-foreground">
              Four services, and two products of our own
            </h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => {
              const Icon = SERVICE_ICONS[s.id];
              return (
                <li key={s.id}>
                  <Link to={`/solutions#${s.id}`} className={`${CARD} group transition-colors hover:border-primary/50`}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-ink">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-h3 font-bold text-foreground">{s.name}</h3>
                    <p className="mt-2 text-body-sm text-muted-foreground">{s.desc}</p>
                    <span className="mt-auto inline-flex min-h-[2.75rem] items-center gap-1.5 pt-4 text-body-sm font-semibold text-primary-ink">
                      See what it covers <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* TODO(owner): show the unnamed hyperlocal community app here or not. It is left out until it has a name. */}
          <h3 className="mt-14 text-center font-display text-h3 font-bold text-foreground">Our products</h3>
          <div className="mx-auto mt-6 grid max-w-4xl gap-6 md:grid-cols-2">
            <Link
              to="/ikuro"
              className={`${CARD} group border-t-4 border-t-[#FA482E] transition-colors hover:border-border`}
            >
              <img src="/brand/ikuro/ikuro-wordmark.webp" width={849} height={244} alt="IKURO" loading="lazy" decoding="async" className="h-10 w-auto self-start" />
              <p className="mt-4 text-body-sm text-muted-foreground">
                An AI student decision platform, in development. Started as TechXera, a programming club at Nalanda. Chalk to Choice is part of it.
              </p>
              <span className="mt-auto inline-flex min-h-[2.75rem] items-center gap-1.5 pt-4 text-body-sm font-semibold text-foreground">
                Visit IKURO <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              to="/heylane"
              className={`${CARD} group border-t-4 border-t-[#007f5f] transition-colors hover:border-border`}
            >
              <img src="/brand/heylane/HeyLane-Horizontal.svg" width={1644} height={344} alt="HeyLane" loading="lazy" decoding="async" className="h-10 w-auto self-start" />
              <p className="mt-4 text-body-sm text-muted-foreground">
                A neighbourhood app for local places and the businesses that run them, launching in Bhubaneswar.
              </p>
              <span className="mt-auto inline-flex min-h-[2.75rem] items-center gap-1.5 pt-4 text-body-sm font-semibold text-foreground">
                Visit HeyLane <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Founders */}
      <TeamSection />

      {/* Journey */}
      <JourneyTimeline milestones={milestones} />

      {/* How we work */}
      <section data-logi="Four promises we work by." aria-labelledby="work-h" className="bg-background py-section">
        <div className="container mx-auto px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How we work</Eyebrow>
            <h2 id="work-h" className="mt-3 font-display text-h2 font-bold text-foreground">
              Clear from the first call to long after launch
            </h2>
          </div>
          <ol className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_WE_WORK.map((h, i) => (
              <li key={h.title} className={CARD}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-label font-bold text-primary-on">{i + 1}</span>
                <h3 className="mt-4 font-display text-h3 font-bold text-foreground">{h.title}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{h.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Hiring + contact */}
      <section data-logi="We are hiring." aria-labelledby="hire-h" className="bg-secondary/40 py-section-sm">
        <div className="container mx-auto max-w-3xl px-gutter text-center">
          <h2 id="hire-h" className="font-display text-h2 font-bold text-foreground">We&rsquo;re hiring in Bhubaneswar</h2>
          <p className="mt-4 text-body text-muted-foreground">
            If you like building software that people use every day, see the open roles.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild className={BTN}>
              <Link to="/careers">See open roles</Link>
            </Button>
            <Button asChild variant="outline" className="min-h-[2.75rem] rounded-full border-2 border-primary/40 px-6 font-semibold">
              <Link to="/contact">Start a project</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
