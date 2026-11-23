import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  ArrowRight, Briefcase, CheckCircle2, MapPin, PenTool,
  Users, Utensils, TrendingUp, ExternalLink, FileText,
} from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/creative/MagneticButton";
import { CONTACT } from "@/lib/contact";
import { CAREER_ROLES, careerRole } from "@/data/careers";
import { siteUrl } from "@/lib/site";
// submitForm's "careers" lead source stays in code but is no longer used here: applications go to Google Forms.

const ROLES = [
  {
    id: "Business Development Associate",
    title: "Business Development Associate",
    openings: "3 openings",
    place: "Bhubaneswar",
    tag: "Freshers welcome",
    icon: Briefcase,
    blurb:
      "Talk to local businesses, understand what slows them down and show them how Logisaar can fix it. You learn the job on the job.",
    points: ["Meet and call business owners", "Run demos with our team", "Hit monthly targets and earn incentives"],
  },
  {
    id: "Content Creator & Graphic Designer",
    title: "Content Creator & Graphic Designer",
    openings: "1 opening",
    place: "",
    tag: "Reels, design, video",
    icon: PenTool,
    blurb:
      "Make the posts, reels and designs that show people what we build. You shoot, edit and design, start to finish.",
    points: ["Shoot and edit reels and videos", "Design posts and brand material", "Keep our social channels active"],
  },
] as const;

const PROCESS = [
  { icon: Utensils, title: "Month one: training", text: "One month of target-based training. Food and transport are provided." },
  { icon: TrendingUp, title: "Month two: full pay", text: "Hit your target and you move to full pay from month two." },
  { icon: Users, title: "Incentives on top", text: "Incentives are added on top of your pay as you grow." },
];

const Careers = () => {
  const reduce = useReducedMotion();
  const { hash } = useLocation();
  // Direct visits to /careers#apply (QR codes) land on the form.
  useEffect(() => {
    if (hash !== "#apply") return;
    const t = setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 600);
    return () => clearTimeout(t);
  }, [hash, reduce]);

  const fade = (delay = 0) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6, delay } };

  return (
    <Layout>
      <SEO
        title="Careers at Logisaar | We're Hiring in Bhubaneswar"
        description="Join Logisaar in Bhubaneswar. Open roles: Business Development Associate (3 openings, freshers welcome) and Content Creator & Graphic Designer."
        keywords="Logisaar careers, jobs in Bhubaneswar, business development associate Bhubaneswar, content creator jobs Odisha, freshers jobs Bhubaneswar"
        canonical={siteUrl("/careers")}
      />

      {/* Hero */}
      <section data-logi="We're hiring! Freshers are welcome." className="relative overflow-hidden pt-section-sm pb-section-sm bg-background">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }}
        />
        <div className="container mx-auto px-gutter relative z-10 max-w-4xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-primary-ink text-xs font-bold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              We're hiring
            </div>
            <h1 className="font-display text-h1-page font-bold text-foreground">
              Build your career <span className="text-gradient">with us.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Logisaar builds software, AI agents and automation for real businesses. We are growing the team in Bhubaneswar and we have two roles open right now.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <MagneticButton strength={0.15}>
                <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 border-0 text-primary-on rounded-full px-8">
                  <a href="#roles">Apply now <ArrowRight size={16} className="ml-2" aria-hidden="true" /></a>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open roles */}
      <section id="roles" data-logi="Pick a role and apply in two minutes." className="py-section bg-secondary/40 scroll-mt-28">
        <div className="container mx-auto px-gutter max-w-5xl">
          <motion.div {...fade()} className="mb-section-head">
            <p className="text-primary-ink font-mono text-xs uppercase tracking-widest font-bold mb-3">Open roles</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Two roles, <span className="text-gradient">start soon</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {ROLES.map((r, i) => (
              <motion.article
                key={r.id}
                {...fade(i * 0.1)}
                className="liquid-glass rounded-2xl border border-border bg-card p-7 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary-ink flex items-center justify-center">
                    <r.icon size={22} aria-hidden />
                  </span>
                  <span className="text-xs font-semibold rounded-full bg-primary/10 text-primary-ink px-3 py-1">{r.openings}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{r.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                  {r.place && (
                    <span className="inline-flex items-center gap-1"><MapPin size={14} aria-hidden /> {r.place}</span>
                  )}
                  <span>{r.tag}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{r.blurb}</p>
                <ul className="mt-4 space-y-2 text-sm text-foreground">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckCircle2 size={16} className="text-primary-ink mt-0.5 shrink-0" aria-hidden /> {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap pt-6 items-center gap-3">
                <Button asChild className="self-start bg-gradient-primary hover:opacity-90 border-0 text-primary-on rounded-full px-6">
                  <a href={careerRole(r.id).formUrl} target="_blank" rel="noopener noreferrer">
                    Apply for this role <ArrowRight size={15} className="ml-2" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
                <a href={careerRole(r.id).jdUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-full border border-border px-5 text-body-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary-ink">
                  <FileText size={15} aria-hidden="true" /> Job description
                  <span className="sr-only"> for {careerRole(r.id).title} (opens in a new tab)</span>
                </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section data-logi="Training first, full pay from month two." className="py-section bg-background">
        <div className="container mx-auto px-gutter max-w-5xl">
          <motion.div {...fade()} className="mb-section-head">
            <p className="text-primary-ink font-mono text-xs uppercase tracking-widest font-bold mb-3">How it works</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Learn first. <span className="text-gradient">Earn more.</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              For the Business Development role, you start with training. No experience needed, only the will to learn and hit targets.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROCESS.map((s, i) => (
              <motion.div key={s.title} {...fade(i * 0.1)} className="rounded-2xl border border-border bg-card p-6">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary-ink flex items-center justify-center mb-4">
                  <s.icon size={20} aria-hidden />
                </span>
                <h3 className="font-display font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply: one Google Form per role */}
      <section id="apply" data-logi="Two roles, two short forms." aria-labelledby="apply-h" className="py-section bg-secondary/40 scroll-mt-24">
        <div className="container mx-auto px-gutter max-w-5xl">
          <motion.div {...fade()} className="mb-10 text-center">
            <p className="text-primary-ink font-mono text-xs uppercase tracking-widest font-bold mb-3">Apply</p>
            <h2 id="apply-h" className="font-display text-h2-page font-bold text-foreground">Apply in two minutes</h2>
            <p className="mt-3 text-muted-foreground">Pick the role, fill in the short form, and we will get back to you.</p>
          </motion.div>
          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2">
            {CAREER_ROLES.map((r) => (
              <li key={r.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-h3 font-bold text-foreground">{r.title}</h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin size={14} aria-hidden="true" /> {r.place}</span>
                  <span>{r.type}</span>
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild className="self-start bg-gradient-primary hover:opacity-90 border-0 text-primary-on rounded-full px-6 min-h-[2.75rem]">
                  <a href={r.formUrl} target="_blank" rel="noopener noreferrer">
                    Apply on Google Forms <ExternalLink size={15} className="ml-2" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
                <a href={r.jdUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-full border border-border px-5 text-body-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary-ink">
                  <FileText size={15} aria-hidden="true" /> Job description
                  <span className="sr-only"> for {r.title} (opens in a new tab)</span>
                </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-body-sm text-muted-foreground">
            Questions? Write to{" "}
            <a className="inline-flex min-h-[2.75rem] items-center text-primary-ink underline underline-offset-2" href={CONTACT.mailto}>{CONTACT.email}</a>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
