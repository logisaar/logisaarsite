import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon, ChevronDown, MessageCircle, Phone, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import MagneticButton from "@/components/creative/MagneticButton";

export interface PainPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Feature {
  icon: LucideIcon;
  name: string;
  desc: string;
}

export interface PricingTier {
  name: "Starter" | "Professional" | "Enterprise";
  price: string;
  period?: string;
  features: string[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ServicePageProps {
  hero: {
    badge?: string;
    h1: string;
    h2: string;
    body: string;
    waMessage: string;
  };
  illustration: React.ReactNode;
  painPoints: PainPoint[];
  features: Feature[];
  pricing: PricingTier[];
  faqs: FAQ[];
  cta?: { headline?: string };
}

const WHATSAPP_BASE = "https://wa.me/917815014638?text=";

const howItWorks = [
  { n: "01", title: "Discovery & Setup", desc: "We understand your workflow, goals and requirements. We scope the project and share a detailed proposal." },
  { n: "02", title: "Build & Configure", desc: "Our team builds, tests and configures the solution tailored to your business — with regular updates." },
  { n: "03", title: "Launch & Support", desc: "We launch the product, train your team and provide 30-day post-launch support included." },
];

const tierColors = {
  Starter: "border-border bg-card",
  Professional: "border-primary/50 bg-primary/5 shadow-lg",
  Enterprise: "border-amber-500/40 bg-amber-500/5",
};

const tierBadge = {
  Starter: null,
  Professional: "Most Popular",
  Enterprise: "Best Value",
};

export default function ServicePageLayout({
  hero,
  illustration,
  painPoints,
  features,
  pricing,
  faqs,
  cta,
}: ServicePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const featRef = useRef(null);
  const priceRef = useRef(null);
  const featInView = useInView(featRef, { once: true, amount: 0.1 });
  const priceInView = useInView(priceRef, { once: true, amount: 0.1 });

  const waUrl = WHATSAPP_BASE + encodeURIComponent(hero.waMessage);

  return (
    <Layout>
      {/* ── SECTION A — Hero ── */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <GradientMesh />
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              {hero.badge && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-4 py-1.5 rounded-full mb-6"
                >
                  <span>✦</span>
                  <span>{hero.badge}</span>
                </motion.div>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.1] tracking-tight mb-3"
              >
                {hero.h1}
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-xl md:text-2xl font-bold text-gradient mb-5"
              >
                {hero.h2}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg"
              >
                {hero.body}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <MagneticButton strength={0.15}>
                  <Button asChild size="lg" className="group bg-green-500 hover:bg-green-600 border-0 text-white px-8 rounded-full">
                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={17} className="mr-2" />
                      Get a Free Demo
                    </a>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.1}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-2 border-primary/20 hover:border-primary/50 px-8"
                    onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    View Pricing <ArrowRight size={15} className="ml-1.5" />
                  </Button>
                </MagneticButton>
              </motion.div>
              {/* Quick contact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 mt-6"
              >
                <Phone size={13} className="text-muted-foreground" />
                <a href="tel:+917815014638" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +91 78150 14638
                </a>
                <span className="text-muted-foreground/40 text-sm mx-1">•</span>
                <span className="text-sm text-muted-foreground">Free consultation</span>
              </motion.div>
            </div>
            {/* Right — Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-full max-w-md mx-auto lg:max-w-full"
            >
              {illustration}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION B — Pain Points ── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2">The Problem</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Sound <span className="text-gradient">Familiar?</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6 border-l-4 border-l-primary"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2">"{p.title}"</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION C — Features Grid ── */}
      <section className="py-24" ref={featRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2">What You Get</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Everything You <span className="text-gradient">Need</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={featInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.6 }}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
                  className="rounded-2xl border border-border bg-card p-6 group hover:border-primary/30 hover:shadow-md transition-all cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-[hsl(165,80%,45%)]/20 flex items-center justify-center mb-4 group-hover:bg-gradient-primary group-hover:shadow-glow-sm transition-all duration-300">
                    <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-display font-bold text-sm mb-1.5">{f.name}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION D — How It Works ── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2">Process</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              How It <span className="text-gradient">Works</span>
            </h2>
          </motion.div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-[2px] bg-gradient-to-r from-primary/30 via-[hsl(165,80%,45%)]/30 to-primary/30 z-0" />
            <div className="grid md:grid-cols-3 gap-10 relative z-10">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-5 shadow-glow-sm">
                    <span className="font-display text-xl font-bold text-white">{step.n}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION E — Pricing ── */}
      <section className="py-24" id="pricing" ref={priceRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={priceInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2">Investment</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Transparent <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">No hidden charges. GST applicable. EMI available above ₹50,000.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricing.map((tier, i) => {
              const badge = tierBadge[tier.name];
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={priceInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                  className={`relative rounded-2xl border p-7 flex flex-col group overflow-hidden ${tierColors[tier.name]}`}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  {badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-4 py-1 rounded-full bg-gradient-primary">
                      {badge}
                    </span>
                  )}
                  <h3 className="font-display text-lg font-bold mb-1">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="font-display text-3xl font-bold text-gradient">{tier.price}</span>
                    {tier.period && <span className="text-muted-foreground text-sm">{tier.period}</span>}
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check size={13} className="text-primary mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <MagneticButton strength={0.08} className="w-full">
                    <Button
                      asChild
                      variant={tier.name === "Professional" ? "default" : "outline"}
                      className={`w-full rounded-xl ${tier.name === "Professional" ? "bg-gradient-primary hover:opacity-90 border-0 text-white" : ""}`}
                    >
                      <a href={waUrl} target="_blank" rel="noopener noreferrer">
                        Get {tier.name}
                        <ArrowRight size={13} className="ml-1" />
                      </a>
                    </Button>
                  </MagneticButton>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION F — FAQ ── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2">FAQ</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Common <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-primary/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-muted-foreground transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION G — CTA Banner ── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-primary/10 via-background to-[hsl(165,80%,45%)]/10 border border-primary/20 p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              {cta?.headline || "Ready to Get Started?"}
            </h2>
            <p className="text-muted-foreground mb-8">
              Talk to us today — no pressure, just honest advice on the best solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton strength={0.15}>
                <Button asChild size="lg" className="group bg-green-500 hover:bg-green-600 border-0 text-white px-10 rounded-full">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={17} className="mr-2" />
                    WhatsApp Us Now
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.1}>
                <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-primary/20 hover:border-primary/50 px-10">
                  <a href="tel:+917815014638">
                    <Phone size={15} className="mr-2" />
                    +91 78150 14638
                  </a>
                </Button>
              </MagneticButton>
            </div>
            <p className="text-muted-foreground text-sm mt-5">
              Or{" "}
              <Link to="/contact" className="text-primary underline underline-offset-4">
                fill our contact form
              </Link>{" "}
              — we reply within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
