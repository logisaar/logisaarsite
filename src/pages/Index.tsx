import { CONTACT } from "@/lib/contact";
import { getImage } from "@/data/images";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useState } from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ChalkToChoiceAsset from "@/components/home/ChalkToChoiceAsset";
import MarqueeText from "@/components/creative/MarqueeText";
import SEO from "@/components/SEO";
import Eyebrow from "@/components/Eyebrow";
import HlPhone from "@/components/heylane/HlPhone";
import "@/components/heylane/heylane.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Check, MessageCircle, Bot, GraduationCap, Sparkles, FolderGit2,
  Globe, ShoppingCart, Cpu, Monitor, ShieldCheck, Smartphone, TrendingUp, Users, Zap, Layers, Smile 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/creative/MagneticButton";
import AnimatedButton from "@/components/creative/AnimatedButton";

// Import dashboard assets
const schoolErpImg = getImage("mockups", "school-erp");
const aiReceptionistImg = getImage("mockups", "ai-receptionist");
const smartCrmImg = getImage("mockups", "smart-crm");
const hotelMgmtImg = getImage("mockups", "hotel-management");

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

const GradientDivider = () => (
  <div className="relative h-px w-full overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer" />
  </div>
);

const solutionsData = [
  {
    id: "school-erp",
    title: "AI-Powered School ERP",
    icon: "🏫",
    iconBg: "bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:bg-amber-500/5",
    desc: "Complete solution to manage students, staff, fees, attendance and communication in one intelligent platform.",
    features: [
      "Admissions & student profiles",
      "Automated attendance alerts",
      "Fee collection & invoicing",
      "Exams, reports & analytics"
    ],
    price: "₹35,000",
    path: "/solutions/ai-powered-school-erp",
    img: schoolErpImg,
    aspect: "1639/960"
  },
  {
    id: "hotel-management",
    title: "Hotel Management System",
    icon: "🏨",
    iconBg: "bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:bg-blue-500/5",
    desc: "Streamline bookings, front desk, housekeeping, billing and guest experience across your hotel operations.",
    features: [
      "Real-time room booking",
      "Housekeeping management",
      "Billing & invoicing",
      "Reports & analytics"
    ],
    price: "₹40,000",
    path: "/solutions/hotel-management-system",
    img: hotelMgmtImg,
    aspect: "1693/929"
  },
  {
    id: "ai-receptionist",
    title: "24x7 AI Receptionist",
    icon: "🤖",
    iconBg: "bg-purple-500/10 border border-purple-500/20 text-purple-500 dark:bg-purple-500/5",
    desc: "AI receptionist that answers calls, qualifies leads, books appointments and never misses an opportunity.",
    features: [
      "24/7 call answering",
      "Lead qualification",
      "Smart scheduling",
      "WhatsApp integration"
    ],
    price: "₹20,000",
    path: "/solutions/ai-receptionist",
    img: aiReceptionistImg,
    aspect: "1563/1006"
  },
  {
    id: "custom-crm",
    title: "Custom CRM & Business Automation",
    icon: "💼",
    iconBg: "bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:bg-rose-500/5",
    desc: "Manage leads, automate follow-ups, close more deals and grow your business with powerful automation.",
    features: [
      "Pipeline & lead management",
      "Workflow automation",
      "Email & WhatsApp automation",
      "Analytics & reporting"
    ],
    price: "₹45,000",
    path: "/solutions/custom-crm",
    img: smartCrmImg,
    aspect: "1607/979"
  }
];

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
      
      <MarqueeText text="SOFTWARE DEVELOPMENT  ·  AI AGENTS  ·  BUSINESS AUTOMATION  ·  AI SOFTWARE  ·  " />

      {/* ── Section: What We Do ── */}
      <section data-logi="Four ways we take work off your plate." className="py-section relative overflow-hidden bg-background">
        <div className="w-full max-w-[87.5rem] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="font-display text-h2 font-bold text-center">
              Four ways we take work <span className="text-gradient">off your plate</span>
            </h2>
            <p className="text-muted-foreground text-body leading-relaxed max-w-2xl mx-auto text-center">
              Pick one, or let us combine them into one system that fits how your business actually runs.
            </p>
          </div>
          <div
            role="region"
            aria-label="Our four services"
            tabIndex={0}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible"
          >
            {[
              { icon: Monitor, tag: "Software Development", title: "Your business, as an app.", desc: "Custom web apps, mobile apps, ERP and CRM systems built around how your team already works.", items: ["Web & mobile apps", "ERP & CRM systems", "E-commerce & portals"], out: "One system instead of five spreadsheets." },
              { icon: Bot, tag: "AI Agent Development", title: "A teammate that never sleeps.", desc: "AI agents that answer calls and chats, qualify leads, book appointments and follow up.", items: ["AI receptionist", "WhatsApp & web chat agents", "Lead follow-up"], out: "Every enquiry answered, day and night." },
              { icon: Zap, tag: "Business Automation", title: "Repetitive work, gone.", desc: "We connect your tools so invoices, reminders, approvals and reports happen on their own.", items: ["Invoices & GST bills", "Reminders & approvals", "Daily reports"], out: "Hours back for your team, every week." },
              { icon: Sparkles, tag: "AI Software", title: "Your data, finally useful.", desc: "AI tools trained on your own documents and numbers: assistants, document reading and smart search.", items: ["Document AI", "Team assistants", "Insights & reports"], out: "Answers in seconds, not hours." },
            ].map(({ icon: Icon, tag, title, desc, items, out }, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="shrink-0 basis-[82%] snap-start sm:basis-auto bg-card border border-border/80 rounded-[2rem] p-7 flex flex-col hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon size={22} className="text-primary-ink" />
                </div>
                <div className="text-label font-semibold text-primary-ink uppercase tracking-wider mt-6">{tag}</div>
                <h3 className="font-display text-xl font-bold mt-1 text-foreground group-hover:text-primary-ink transition-colors">{title}</h3>
                <p className="text-muted-foreground text-body-sm leading-relaxed mt-2">{desc}</p>
                <ul className="space-y-1.5 mt-4">
                  {items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-label text-foreground/80 font-medium">
                      <Check size={13} className="text-primary-ink stroke-[3px] shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <div className="pt-4 border-t border-border/40 text-body-sm font-semibold text-primary-ink">{out}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ── Section: Solutions Snapshot ── */}
      <section data-logi="Ready-made, then made yours." className="py-section relative overflow-hidden bg-background">
        <div className="w-full max-w-[96.25rem] mx-auto px-6 relative z-10">
          {/* Centered Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
            <Eyebrow>Ready solutions</Eyebrow>
            <h2 className="font-display text-h2 font-bold text-center">
              Ready-made solutions, <span className="text-gradient">made yours</span>
            </h2>
            <p className="text-muted-foreground text-body leading-relaxed max-w-2xl mx-auto text-center">
              Proven systems for schools, hotels, clinics and sales teams, customised to your business so you go live faster and pay less.
            </p>
          </div>

          {/* Solutions 2x2 Grid */}
          <div
            role="region"
            aria-label="Ready-made solutions"
            tabIndex={0}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:pb-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:overflow-visible w-full"
          >
            {solutionsData.map((sol) => (
              <Link
                key={sol.id}
                to={sol.path}
                className="shrink-0 basis-[88%] snap-start lg:basis-auto bg-card border border-border/80 rounded-[2rem] overflow-hidden flex flex-col md:flex-row gap-4 hover:shadow-xl hover:border-primary/30 transition-all duration-500 group relative"
              >
                {/* Left side: one readable panel (stat row + chart) in a browser frame; the full dashboard lives on the detail page */}
                <div className="md:w-[65%] w-full bg-secondary/60 flex items-center justify-center border-b md:border-b-0 md:border-r border-border/40 shrink-0 self-stretch overflow-hidden p-4 md:p-5">
                  <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-3 py-2" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-border" />
                      <span className="h-2 w-2 rounded-full bg-border" />
                      <span className="h-2 w-2 rounded-full bg-border" />
                    </div>
                    <div className="aspect-[16/10] overflow-hidden">
                      <ResponsiveImage
                        image={sol.img}
                        alt={sol.title}
                        sizes="(min-width: 64em) 36vw, 90vw"
                        className="h-full w-full max-w-none object-cover object-[28%_20%] scale-[1.5] origin-[28%_20%] group-hover:scale-[1.55] transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Details block */}
                <div className="md:w-[35%] w-full flex flex-col justify-between p-3 md:py-3 md:pr-3 md:pl-0">
                  <div>
                    {/* Title */}
                    <h3 className="font-display text-body font-bold mt-0 mb-1 text-foreground group-hover:text-primary-ink transition-colors">
                      {sol.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-label leading-relaxed mb-2">
                      {sol.desc}
                    </p>

                    {/* Checklist Features */}
                    <ul className="space-y-1 mb-2.5">
                      {sol.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-1.5 text-label text-foreground/80 font-medium">
                          <Check size={11} className="text-primary-ink stroke-[3px] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-border/40">
                    <div className="text-label font-semibold px-2.5 py-1 rounded-md bg-primary/10 text-primary-ink dark:text-primary-ink border border-primary/20 font-mono">
                      From {sol.price}
                    </div>
                    <span className="text-label font-semibold text-muted-foreground group-hover:text-primary-ink transition-colors flex items-center gap-1">
                      Explore <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Centered CTA and Sub-footer */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <AnimatedButton
              as={Link}
              to="/solutions"
              className="bg-gradient-primary hover:opacity-90 text-primary-on shadow-glow"
            >
              View All Solutions
              <ArrowRight size={16} className="ml-2 relative z-20" />
            </AnimatedButton>

            <div className="flex items-center gap-2 text-body-sm text-muted-foreground mt-2">
              <MessageCircle size={16} className="text-primary-ink" />
              <span>
                Need a custom solution?{" "}
                <Link to="/contact" className="inline-flex min-h-[2.75rem] items-center px-1 text-primary-ink font-semibold hover:underline">
                  Let's talk
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ── Section: Chalk to Choice ── */}
      <section data-logi="IKURO is made by Logisaar too!" className="py-section md:py-28 relative overflow-hidden bg-white dark:bg-background">
        {/* Subtle background dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container mx-auto px-gutter relative z-10">
          {/* Main two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* ── LEFT: Text content ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-7"
            >
              <Eyebrow>IKURO · A Logisaar product</Eyebrow>

              {/* IKURO's own logo, with a thin accent in the product colour */}
              <div className="border-l-2 pl-6 space-y-3" style={{ borderColor: "#FA482E" }}>
                <h2 className="m-0">
                  <span className="sr-only">IKURO: decisions today, growth tomorrow</span>
                  <picture style={{ display: "contents" }}>
                    <source type="image/webp" srcSet="/brand/ikuro/ikuro-lockup-tagline.webp" />
                    <img
                      src="/brand/ikuro/ikuro-lockup-tagline.png"
                      width={1001}
                      height={319}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-[min(22rem,100%)]"
                    />
                  </picture>
                </h2>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-body md:text-lg leading-relaxed max-w-lg">
                Our AI-powered platform that helps students make better course, college, skill and career decisions. It includes Chalk to Choice, our career-clarity programme for Class 11 &amp; 12.
              </p>

              {/* Feature list */}
              <div className="space-y-0 divide-y divide-border/50">
                {[
                  {
                    icon: Users,
                    title: "Personalised AI Guidance",
                    desc: "Understands each student and recommends the right next step.",
                  },
                  {
                    icon: Globe,
                    title: "Chalk to Choice",
                    desc: "Career clarity for Class 11 & 12 through guidance and real-world exposure.",
                  },
                  {
                    icon: FolderGit2,
                    title: "For Colleges",
                    desc: "Dashboards and student insights. College pilots begin in 2026.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 py-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon size={17} className="text-primary-ink" />
                    </div>
                    <div>
                      <div className="text-body-sm font-bold text-foreground">{title}</div>
                      <div className="text-label text-muted-foreground mt-0.5 leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton strength={0.1}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 border-0 text-primary-on rounded-full px-8 gap-2 font-semibold shadow-md shadow-primary/20"
                  >
                    <Link to="/ikuro">
                      Visit IKURO
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </MagneticButton>

                <a
                  href="https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I%20want%20to%20know%20more%20about%20IKURO."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[2.75rem] items-center gap-2 text-body-sm font-semibold text-muted-foreground hover:text-primary-ink transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full border-2 border-border group-hover:border-primary/50 flex items-center justify-center transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Watch how it works
                </a>
              </div>
            </motion.div>

            {/* ── RIGHT: Interactive Asset ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center justify-center"
            >
              <ChalkToChoiceAsset />
            </motion.div>
          </div>

          {/* ── Bottom Stats Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 gap-6 border-t border-border/60 pt-10"
          >
            {[
              // TODO(owner): "10+ schools connected", "15+ expert mentors" and "100% career focused" were removed (unverifiable; IKURO is pre-pilot).
              // TODO(owner): confirm 500+ students guided through TechXera and Chalk to Choice.
              { icon: Users, stat: "500+", label: "Students guided", sub: "Through TechXera and Chalk to Choice." },
            ].map(({ icon: Icon, stat, label, sub }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary-ink" />
                </div>
                <div>
                  <div className="text-xl font-black text-primary-ink leading-none">{stat}</div>
                  <div className="text-body-sm font-bold text-foreground mt-0.5">{label}</div>
                  <div className="text-label text-muted-foreground mt-0.5 leading-snug">{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      <GradientDivider />

      {/* ── Section: Products Snapshot (HeyLane) ── */}
      <section data-logi="We build our own products as well." className="py-section relative overflow-hidden bg-background">
        <div className="container mx-auto px-gutter relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Eyebrow>HeyLane · A Logisaar product</Eyebrow>
              {/* HeyLane's own logo (official SVG, unchanged) and a thin accent in its colour */}
              <div className="border-l-2 pl-6 space-y-5" style={{ borderColor: "#007F5F" }}>
                <img src="/brand/heylane/HeyLane-Horizontal.svg" width={1644} height={344} alt="HeyLane" className="-my-3 h-auto w-[min(14rem,70%)]" />
                <h2 className="font-display text-h2 font-bold">
                  We don't just build for clients. <span className="text-gradient">We build our own.</span>
                </h2>
              </div>
              <p className="text-muted-foreground text-body leading-relaxed">
                HeyLane is our neighbourhood app for Bhubaneswar: people find local places and hear from their own contacts first; businesses get billing, chat and a loyalty programme in one product.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <MagneticButton strength={0.1}>
                  <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 border-0 text-primary-on rounded-full px-8">
                    <Link to="/heylane">
                      Explore HeyLane
                      <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                </MagneticButton>
                <a
                  href="https://heylane.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[2.75rem] items-center gap-1 font-semibold text-primary-ink hover:underline"
                >
                  heylane.in
                  <ArrowRight size={14} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>

            {/* A member pass, shown the way the app shows it. Sample data, labelled inside the frame. */}
            <div className="lg:col-span-6">
              <div data-theme="heylane" className="mx-auto max-w-md rounded-3xl p-8">
                <HlPhone screen="pass" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ── Section: Portfolio Snapshot ── */}
      <section data-logi="25+ businesses and counting." className="py-section relative overflow-hidden bg-background">
        <div className="w-full max-w-[87.5rem] mx-auto px-6 relative z-10">
          
          {/* Centered Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-5">
            <Eyebrow>Our work</Eyebrow>
            <h2 className="font-display text-h2 font-bold text-center">
              25+ businesses already <span className="text-gradient">run on Logisaar</span>
            </h2>
            <p className="text-muted-foreground text-body leading-relaxed max-w-2xl mx-auto text-center">
              Schools, hotels, retailers, consultants and builders trust us with the systems they use every day.
            </p>
          </div>

          {/* Trusted by Badge */}
          <div className="max-w-5xl mx-auto mb-6 flex justify-start">
            <Eyebrow>Trusted by</Eyebrow>
          </div>

          {/* Logos Border Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border/40 dark:bg-slate-800/40 border border-border/40 dark:border-slate-800/40 rounded-2xl overflow-hidden max-w-5xl mx-auto">
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

          {/* Stats Bar */}
          <div className="bg-[#FAFAFA] dark:bg-slate-900/30 border border-border/80 dark:border-slate-800/50 rounded-2xl p-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-6 max-w-5xl mx-auto mt-16 shadow-sm">
            {/* Stat 1 */}
            <div className="flex items-center gap-3 w-full sm:w-[48%] md:w-auto">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-ink shrink-0">
                <Users size={18} />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground leading-tight">30+</div>
                <div className="text-label text-muted-foreground font-medium">Projects Delivered</div>
              </div>
            </div>

            <div className="hidden md:block h-8 w-px bg-border/80 dark:bg-slate-800" />

            {/* Stat 2 */}
            <div className="flex items-center gap-3 w-full sm:w-[48%] md:w-auto">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-ink shrink-0">
                <Smile size={18} />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground leading-tight">25+</div>
                <div className="text-label text-muted-foreground font-medium">Happy Clients</div>
              </div>
            </div>

            {/* TODO(owner): "2x faster delivery" and "90% client satisfaction" were removed: no source. Add back only with evidence. */}
            {/* TODO(owner): confirm 30+ projects delivered and 25+ clients are true today. */}
          </div>

          {/* CTA Link */}
          <div className="text-center mt-12">
            <Link 
              to="/portfolio" 
              className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-primary-ink hover:opacity-90 font-semibold text-body-sm transition-all duration-300 group"
            >
              <span>See all work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      <GradientDivider />
      

      <TestimonialsSection />

      {/* ── Closing CTA Section (WhatsApp First) ── */}
      <section data-logi="Quotes are free. Tell us the one task you hate." className="py-section relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 animated-grid pointer-events-none opacity-[0.03]" />
        
        <div className="container mx-auto px-gutter relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            viewport={{ once: true }}
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
