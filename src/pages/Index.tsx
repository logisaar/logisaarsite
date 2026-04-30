import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TechStack from "@/components/home/TechStack";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ClientImpact from "@/components/home/ClientImpact";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import MarqueeText from "@/components/creative/MarqueeText";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/creative/MagneticButton";

// ─── Local Business Schema ──────────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "LogiSaar",
  description:
    "Custom web development, CRM, AI automation and SEO services for businesses in Odisha",
  url: "https://www.logisaar.in",
  telephone: "+917815014638",
  email: "logisaar@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cuttack",
    addressRegion: "Odisha",
    addressCountry: "IN",
  },
  areaServed: ["Bhubaneswar", "Cuttack", "Bhadrak", "Rourkela", "Odisha"],
  founder: { "@type": "Person", name: "Chinmay Kumar Panda" },
  foundingDate: "2025-09",
  sameAs: [
    "https://instagram.com/logisaar",
    "https://linkedin.com/company/logisaar/",
    "https://facebook.com/share/1CavFRY28Y/",
  ],
  serviceType: [
    "Web Development", "Custom CRM Development", "E-Commerce Development",
    "AI Automation", "SEO Services", "Google Review Marketing", "Mobile App Development",
  ],
  priceRange: "₹₹",
};

const GradientDivider = () => (
  <div className="relative h-px w-full overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer" />
  </div>
);

// ─── Featured Solutions Data (3 best picks for homepage) ───────────────────
const featuredSolutions = [
  {
    name: "School Management System",
    badge: "Education",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    tagline: "Run your entire institution from one dashboard",
    desc: "Built for schools, colleges and coaching centers in Odisha. Manage every aspect of your institution digitally — attendance, fees, results and parents in one place.",
    img: "/images/services/school.png",
    from: "₹35,000",
    to: "/services/school-management-system",
    wa: "Hi LogiSaar, I want a School Management System for my institution.",
    features: [
      "Student admission & profile management",
      "Automated attendance + WhatsApp alerts",
      "Online fee collection & payment tracking",
      "Exam results & report card generation",
    ],
  },
  {
    name: "Hotel Management System",
    badge: "Hospitality",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    tagline: "Reduce staff workload by 60% — run on autopilot",
    desc: "Manage bookings, check-ins, billing and guest experience for hotels, resorts and homestays across Odisha. Prevent double bookings and missed revenue.",
    img: "/images/services/hotel.png",
    from: "₹40,000",
    to: "/services/hotel-management-system",
    wa: "Hi LogiSaar, I want a Hotel Management System for my property.",
    features: [
      "Real-time room booking & availability",
      "Online booking from your website",
      "Automated invoice & billing",
      "Revenue analytics & reports",
    ],
  },
  {
    name: "QR Code Menu System",
    badge: "Food & Beverage",
    badgeColor: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    tagline: "Scan, order & pay — no waiter, no paper menu",
    desc: "Replace paper menus for good. Beautiful digital QR menus for restaurants, cafes and dhabas across Odisha. Customers scan, browse photos and order from their phone.",
    img: "/images/services/qr-menu.png",
    from: "₹12,000",
    to: "/services/qr-menu-system",
    wa: "Hi LogiSaar, I want a QR Code Menu System for my restaurant.",
    features: [
      "QR code per table — no app required",
      "Beautiful menu with food photos",
      "UPI / QR payment at table",
      "Real-time updates, no reprinting",
    ],
  },
];

// ─── Featured Solution Card ─────────────────────────────────────────────────
const FeaturedCard = ({ sol, i }: { sol: typeof featuredSolutions[0]; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 20 } }}
    className="group rounded-3xl border border-border bg-card overflow-hidden flex flex-col hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
  >
    {/* AI Image */}
    <div className="relative overflow-hidden" style={{ height: 220 }}>
      <img
        src={sol.img}
        alt={sol.name + " by LogiSaar Odisha"}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      {/* Bottom gradient so content blends */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
      {/* Industry badge */}
      <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm ${sol.badgeColor}`}>
        {sol.badge}
      </span>
      {/* Price */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
        From {sol.from}
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <h3 className="font-display text-xl font-bold mb-1 group-hover:text-primary transition-colors">
        {sol.name}
      </h3>
      <p className="text-primary text-xs font-semibold mb-2">{sol.tagline}</p>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{sol.desc}</p>

      {/* Feature list */}
      <ul className="space-y-2 mb-6 flex-1">
        {sol.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check size={13} className="text-primary mt-0.5 shrink-0" />
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="flex gap-2 mt-auto">
        <MagneticButton strength={0.08} className="flex-1">
          <Button
            asChild
            className="w-full bg-gradient-primary hover:opacity-90 border-0 text-white rounded-xl text-sm"
          >
            <Link to={sol.to}>
              Explore Details <ArrowRight size={13} className="ml-1" />
            </Link>
          </Button>
        </MagneticButton>
        <MagneticButton strength={0.08}>
          <Button
            asChild
            variant="outline"
            size="icon"
            className="rounded-xl border-2 border-green-500/30 hover:border-green-500/60 hover:bg-green-500/10"
          >
            <a
              href={`https://wa.me/917815014638?text=${encodeURIComponent(sol.wa)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp enquiry"
            >
              <MessageCircle size={16} className="text-green-500" />
            </a>
          </Button>
        </MagneticButton>
      </div>
    </div>
  </motion.div>
);

// ─── Page ───────────────────────────────────────────────────────────────────
const Index = () => {
  return (
    <Layout>
      <SEO
        title="Website Development Company in Odisha | LogiSaar"
        description="LogiSaar is Odisha's leading web development company. We build custom websites, CRM systems, e-commerce platforms & AI tools for businesses in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. Starting ₹2,999."
        keywords="web development company Odisha, website design Bhubaneswar, website design Cuttack, website design Bhadrak, website design Rourkela, custom CRM Odisha, e-commerce development Odisha, SEO services Odisha, AI development Odisha, LogiSaar"
        canonical="https://www.logisaar.in/"
        jsonLd={localBusinessSchema}
      />

      <HeroSection />
      <MarqueeText text="WEB  ·  APP  ·  AI  ·  DESIGN  ·  GROWTH  ·  INNOVATION  ·  " />
      <ServicesOverview />
      <GradientDivider />
      <WhyChooseUs />
      <TechStack />
      <MarqueeText text="REACT  ·  FLUTTER  ·  NODE  ·  PYTHON  ·  AWS  ·  DOCKER  ·  " reverse />

      {/* ── Ready-to-Deploy Business Solutions ── */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="text-center mb-14"
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-3">Ready-to-Deploy</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Ready-to-Deploy{" "}
              <span className="text-gradient">Business Solutions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Purpose-built software for specific industries — faster, cheaper and smarter than
              generic tools. See key features before you even click.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {featuredSolutions.map((sol, i) => (
              <FeaturedCard key={sol.name} sol={sol} i={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground text-sm mb-4">
              Also available: AI Lead Follow-Up, AI Receptionist, Custom CRM, Travel Website,
              AI Automation & Proposal Software
            </p>
            <MagneticButton strength={0.1}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-primary/20 hover:border-primary/50 px-10"
              >
                <Link to="/services">
                  View All 9 Solutions <ArrowRight size={15} className="ml-1.5" />
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <FeaturedProjects />
      <GradientDivider />
      <ClientImpact />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
