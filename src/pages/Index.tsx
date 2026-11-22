import { CONTACT } from "@/lib/contact";
import { getImage } from "@/data/images";
import { PROJECTS_DELIVERED } from "@/data/company";
import { solutionById } from "@/data/solutions";
import Layout from "@/components/Layout";
import ServiceBento from "@/components/home/ServiceBento";
import IkuroBlock from "@/components/home/IkuroBlock";
import HeyLaneBlock from "@/components/home/HeyLaneBlock";
import SolutionCard from "@/components/solutions/SolutionCard";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SEO from "@/components/SEO";
import Eyebrow from "@/components/Eyebrow";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, MessageCircle, Bot, GraduationCap, Sparkles, FolderGit2,
  Globe, ShoppingCart, Cpu, Monitor, ShieldCheck, Smartphone, TrendingUp, Users, Zap, Layers, Smile 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/creative/MagneticButton";
import AnimatedButton from "@/components/creative/AnimatedButton";

// Import dashboard assets

// Import project assets
const swostiImg = getImage("projects", "swosti");
const bababrandImg = getImage("projects", "bababrand");
const nalandaImg = getImage("projects", "nalanda");
const gatepassImg = getImage("projects", "gatepass");

// Import brand logos
import brandBabaLogo from "@/assets/brand-logos/baba-brand-fashion.webp";
import brandEklabhyaLogo from "@/assets/brand-logos/eklabhya-classes.webp";
import brandJnsLogo from "@/assets/brand-logos/jns.webp";
import brandLinchansLogo from "@/assets/brand-logos/linchans.webp";
import brandSakoLogo from "@/assets/brand-logos/sako-sales.webp";
import brandRenukaLogo from "@/assets/brand-logos/the-renuka.webp";
import brandVinayakLogo from "@/assets/brand-logos/vinayak.webp";
import brandCmcLogo from "@/assets/brand-logos/cmc.webp";
import brandNitLogo from "@/assets/brand-logos/nit.webp";
import brandSwostiLogo from "@/assets/brand-logos/swosti.webp";
import brandAmrutaLogo from "@/assets/brand-logos/amruta-bhojan.webp";
import brandMassomLogo from "@/assets/brand-logos/massom-vastu-guru.webp";
import { REVEAL_VIEWPORT } from "@/lib/scroll";

// ─── Local Business Schema ──────────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Logisaar",
  description:
    "Custom software, AI agents and business automation for growing businesses in India and abroad. Makers of HeyLane and IKURO.",
  url: "https://www.logisaar.in",
  telephone: CONTACT.phone.replace(/\s/g, ""),
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    addressCountry: "IN",
  },
  areaServed: ["Bhubaneswar", "Cuttack", "Odisha", "India"],
  founder: { "@type": "Person", name: "Chinmay Kumar Panda" },
  foundingDate: "2025-09",
  sameAs: [
    "https://instagram.com/logisaar",
    "https://linkedin.com/company/logisaar/",
    "https://facebook.com/share/1CavFRY28Y/",
  ],
  serviceType: [
    "Custom Software Development", "AI Agent Development",
    "Business Automation", "AI Software", "Custom CRM Solutions",
  ],
  priceRange: "₹₹",
};

// Home shows four of the ready-made solutions, all values from src/data/solutions.ts
const HOME_SOLUTION_IDS = ["school-management", "hotel-management", "ai-receptionist", "custom-crm"];
const portfolioData = [
  {
    id: "swosti",
    name: "Swosti Consultancy",
    badge: "WEB APP",
    badgeClass: "bg-blue-500/10 border border-blue-500/20 text-blue-400 dark:bg-blue-500/5",
    desc: "Corporate consultation platform streamlining service requests, client management and reporting.",
    img: swostiImg,
    categories: ["Web Applications", "Systems"],
    colSpan: "lg:col-span-7",
    cardBg: "bg-slate-900 border-slate-800/80 text-white dark:bg-slate-950/80",
    imageBg: "bg-slate-950/40 dark:bg-slate-950/60 border-slate-800/80",
    textClass: "text-slate-300",
    linkClass: "text-white border-white/20 hover:border-white",
    stats: [
      { label: "Active Users", value: "200+", icon: Users },
      { label: "Faster Reporting", value: "40%", icon: Zap },
      { label: "Process Automation", value: "60%", icon: Cpu }
    ]
  },
  {
    id: "bababrand",
    name: "Baba Brand Fashion",
    badge: "E-COMMERCE",
    badgeClass: "bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 dark:bg-orange-500/5",
    desc: "High-performance custom retail platform with digital catalog, cart and secure checkout.",
    img: bababrandImg,
    categories: ["E-commerce", "Web Applications"],
    colSpan: "lg:col-span-5",
    cardBg: "bg-[#FFF9F6] border-orange-100/80 text-slate-900 dark:bg-orange-950/10 dark:border-orange-950/20 dark:text-white",
    imageBg: "bg-orange-500/5 dark:bg-orange-950/20 border-orange-100/50",
    textClass: "text-slate-600 dark:text-slate-300",
    linkClass: "text-orange-600 dark:text-orange-400 border-orange-500/20 hover:border-orange-500",
    stats: [
      { label: "Sales Growth", value: "3X", icon: TrendingUp },
      { label: "Secure Payments", value: "100%", icon: ShieldCheck },
      { label: "Mobile Responsive", value: "Yes", icon: Smartphone }
    ]
  },
  {
    id: "nalanda",
    name: "Faculty Feedback System",
    badge: "AI INTEGRATION",
    badgeClass: "bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 dark:bg-indigo-500/5",
    desc: "AI analytics platform built for Nalanda Institute to collect feedback, analyze sentiment and generate actionable insights.",
    img: nalandaImg,
    categories: ["AI & Analytics", "Web Applications"],
    colSpan: "lg:col-span-5",
    cardBg: "bg-[#F8F9FE] border-indigo-100/80 text-slate-900 dark:bg-indigo-950/10 dark:border-indigo-950/20 dark:text-white",
    imageBg: "bg-indigo-500/5 dark:bg-indigo-950/20 border-indigo-100/50",
    textClass: "text-slate-600 dark:text-slate-300",
    linkClass: "text-indigo-600 dark:text-indigo-400 border-indigo-500/20 hover:border-indigo-500",
    stats: [
      { label: "Students", value: "1K+", icon: Users },
      { label: "Response Rate", value: "92%", icon: Check },
      { label: "Real-time AI Insights", value: "Yes", icon: Sparkles }
    ]
  },
  {
    id: "gatepass",
    name: "Digital Gatepass System",
    badge: "AUTOMATION",
    badgeClass: "bg-primary/10 border border-primary/20 text-primary-ink dark:text-primary-ink dark:bg-emerald-500/5",
    desc: "Smart check-in system using instant QR generation and real-time security tracking.",
    img: gatepassImg,
    categories: ["Automation", "Systems"],
    colSpan: "lg:col-span-7",
    cardBg: "bg-[#F4FAF7] border-emerald-100/80 text-slate-900 dark:bg-emerald-950/10 dark:border-emerald-950/20 dark:text-white",
    imageBg: "bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-100/50",
    textClass: "text-slate-600 dark:text-slate-300",
    linkClass: "text-primary-ink dark:text-primary-ink border-primary/20 hover:border-emerald-500",
    stats: [
      { label: "Secure", value: "100%", icon: ShieldCheck },
      { label: "Faster Check-In", value: "2X", icon: Zap },
      { label: "Daily Visitors", value: "500+", icon: Users }
    ]
  }
];

const brandLogos = [
  {
    name: "Swosti Consultancy",
    type: "custom",
    render: () => (
      <div className="flex flex-col items-center justify-center text-center gap-1.5 w-full">
        <img
          src={brandSwostiLogo}
          alt="Swosti Consultancy"
          className="max-h-[3.25rem] md:max-h-[4rem] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="text-label md:text-label font-bold text-slate-700 dark:text-slate-300 tracking-wide mt-1">
          Swosti Consultancy
        </span>
      </div>
    ),
    categories: ["Web Applications", "Systems"]
  },
  {
    name: "Linchans",
    type: "image",
    img: brandLinchansLogo,
    categories: ["E-commerce", "Web Applications"]
  },
  {
    name: "CMC Infratech",
    type: "image",
    img: brandCmcLogo,
    categories: ["Systems", "Web Applications"]
  },
  {
    name: "Nalanda Institute",
    type: "image",
    img: brandNitLogo,
    categories: ["AI & Analytics", "Web Applications"]
  },
  {
    name: "Baba Brand Fashion",
    type: "image",
    img: brandBabaLogo,
    categories: ["E-commerce", "Web Applications"]
  },
  {
    name: "Sako Sales",
    type: "image",
    img: brandSakoLogo,
    categories: ["E-commerce", "Web Applications"]
  },
  {
    name: "Vinayak",
    type: "image",
    img: brandVinayakLogo,
    categories: ["Web Applications", "E-commerce"]
  },
  {
    name: "Eklabhya Classes",
    type: "image",
    img: brandEklabhyaLogo,
    categories: ["AI & Analytics", "Web Applications"]
  },
  {
    name: "The Renuka",
    type: "image",
    img: brandRenukaLogo,
    categories: ["Web Applications", "E-commerce"]
  },
  {
    name: "JNS Biology",
    type: "image",
    img: brandJnsLogo,
    categories: ["Web Applications", "E-commerce"]
  },
  {
    name: "Amruta Bhojan",
    type: "image",
    img: brandAmrutaLogo,
    categories: ["Web Applications", "E-commerce"]
  },
  {
    name: "Massom Vastu Guru",
    type: "image",
    img: brandMassomLogo,
    categories: ["Web Applications", "AI & Analytics"]
  }
];

const Index = () => {
  return (
    <Layout heroUnderHeader>
      <SEO
        title="Logisaar | Software, AI Agents & Business Automation"
        description="Logisaar builds custom software, AI agents and business automation for growing businesses in India and abroad. Makers of HeyLane and IKURO."
        keywords="custom software development, AI agents, business automation, AI software, HeyLane, IKURO, Logisaar, software company Bhubaneswar"
        canonical="https://www.logisaar.in/"
        jsonLd={localBusinessSchema}
      />

      {/* Hero Section */}
      <HeroSection />
      
      {/* Slim ticker: the four services, solid text, decorative */}
      <div aria-hidden="true" className="select-none bg-white py-section-sm">
        <p className="mx-auto flex max-w-[75rem] flex-wrap items-center justify-center gap-x-5 gap-y-1 px-gutter text-center font-display text-h3 font-bold text-slate-400">
          {["Software development", "AI agents", "Business automation", "AI software"].map((t, i) => (
            <span key={t} className="flex items-center gap-5">
              {i > 0 && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
              {t}
            </span>
          ))}
        </p>
      </div>

      {/* ── Section: What We Do (bento with mini live demos) ── */}
      <ServiceBento />

      {/* ── Section: Ready-made solutions (the one Solutions card) ── */}
      <section data-logi="Ready-made, then made yours." className="bg-secondary/40 py-section">
        <div className="container mx-auto max-w-[75rem] px-gutter">
          <div className="mx-auto mb-section-head max-w-[48rem] space-y-5 text-center">
            <Eyebrow>Ready solutions</Eyebrow>
            <h2 className="font-display text-h2 font-bold">
              Ready-made solutions, <span className="text-gradient">made yours</span>
            </h2>
            <p className="mx-auto max-w-2xl text-body text-muted-foreground">
              Proven systems for schools, hotels, clinics and sales teams, customised to your business so you go live faster and pay less.
            </p>
          </div>
          <ul className="m-0 grid list-none auto-rows-fr grid-cols-1 gap-6 p-0 md:grid-cols-2 xl:grid-cols-4">
            {HOME_SOLUTION_IDS.map((id) => (
              <li key={id} className="flex">
                <div className="w-full"><SolutionCard sol={solutionById(id)} /></div>
              </li>
            ))}
          </ul>
          <div className="mt-section-head flex flex-col items-center gap-3">
            <AnimatedButton as={Link} to="/solutions" className="bg-gradient-primary text-primary-on hover:opacity-90">
              View All Solutions
              <ArrowRight size={16} className="relative z-20 ml-2" />
            </AnimatedButton>
            <p className="flex items-center gap-2 text-body-sm text-muted-foreground">
              <MessageCircle size={16} className="text-primary-ink" aria-hidden="true" />
              <span>
                Need a custom solution?{" "}
                <Link to="/contact" className="inline-flex min-h-[2.75rem] items-center px-1 font-semibold text-primary-ink hover:underline">
                  Let's talk
                </Link>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Section: IKURO ── */}
      <IkuroBlock />

      {/* ── Section: HeyLane ── */}
      <HeyLaneBlock />

      {/* ── Section: Portfolio Snapshot ── */}
      <section data-logi="25+ businesses and counting." className="pt-section pb-section-sm relative overflow-hidden bg-background">
        <div className="container mx-auto max-w-[75rem] px-gutter relative z-10">
          
          {/* Centered Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-section-head space-y-5">
            <Eyebrow>Our work</Eyebrow>
            <h2 className="font-display text-h2 font-bold text-center">
              25+ businesses already <span className="text-gradient">run on Logisaar</span>
            </h2>
            <p className="text-muted-foreground text-body leading-relaxed max-w-2xl mx-auto text-center">
              Schools, hotels, retailers, consultants and builders trust us with the systems they use every day.
            </p>
            {/* TODO(owner): confirm 30+ projects delivered and 25+ clients are true today. "2x faster delivery" and "90% client satisfaction" were removed: no source. */}
            <p className="font-display text-body font-semibold text-foreground">{PROJECTS_DELIVERED} projects · 25+ clients</p>
          </div>

          {/* Trusted by Badge */}
          <div className="mx-auto mb-6 flex justify-start">
            <Eyebrow>Trusted by</Eyebrow>
          </div>

          {/* Logos Border Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border/40 dark:bg-slate-800/40 border border-border/40 dark:border-slate-800/40 rounded-2xl overflow-hidden mx-auto">
            {brandLogos.map((logo) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={logo.name}
                className="bg-white dark:bg-slate-900/50 flex items-center justify-center p-3 sm:p-6 min-h-[5.5rem] sm:min-h-[7.5rem] transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 group"
              >
                {logo.type === "image" ? (
                  <img
                    src={logo.img}
                    alt={logo.name}
                    className={`${
                      logo.name === "Sako Sales"
                        ? "h-[3.5rem] sm:h-[5.125rem] md:h-[6rem] max-w-[95%]"
                        : "h-[2.75rem] sm:h-[4rem] md:h-[4.75rem] max-w-[85%]"
                    } w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                  />
                ) : (
                  logo.render()
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Link */}
          <div className="text-center mt-section-head">
            <Link 
              to="/contact" 
              className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-primary-ink hover:opacity-90 font-semibold text-body-sm transition-all duration-300 group"
            >
              <span>Start a project</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      <TestimonialsSection />

      {/* ── Closing CTA Section (WhatsApp First) ── */}
      <section data-logi="Quotes are free. Tell us the one task you hate." className="py-section relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 animated-grid pointer-events-none opacity-[0.03]" />
        
        <div className="container mx-auto px-gutter relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.8 }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
              Tell us the one task you hate doing. <br />
              <span className="italic font-light text-gradient">We'll make it disappear.</span>
            </h2>
            <p className="text-white/60 text-body md:text-lg max-w-lg mx-auto">
              A free call. You leave with a clear plan and a fixed quote, whether or not you work with us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <MagneticButton strength={0.15}>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 border-0 text-primary-on font-semibold rounded-full px-10 py-6 text-body"
              >
                <a
                  href="https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20planning%20a%20new%20AI%20systems%20%2F%20software%20project%20and%20want%20to%20get%20a%20scoping%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle size={20} fill="currentColor" />
                  WhatsApp Us
                </a>
              </Button>
            </MagneticButton>
            <Button
              asChild
              size="lg"
              className="border border-white/20 bg-transparent hover:bg-white/10 text-white hover:text-white rounded-full px-10 py-6 text-body transition-all duration-300"
            >
              <Link to="/contact">Book a Free Call</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
