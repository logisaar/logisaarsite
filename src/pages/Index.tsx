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
    badgeClass: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/5",
    desc: "Smart check-in system using instant QR generation and real-time security tracking.",
    img: gatepassImg,
    categories: ["Automation", "Systems"],
    colSpan: "lg:col-span-7",
    cardBg: "bg-[#F4FAF7] border-emerald-100/80 text-slate-900 dark:bg-emerald-950/10 dark:border-emerald-950/20 dark:text-white",
    imageBg: "bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-100/50",
    textClass: "text-slate-600 dark:text-slate-300",
    linkClass: "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:border-emerald-500",
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
          className="max-h-[52px] md:max-h-[64px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="text-[10px] md:text-[11px] font-bold text-slate-700 dark:text-slate-300 tracking-wide mt-1">
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
    <Layout>
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
      <section data-logi="Four ways we take work off your plate." className="py-24 relative overflow-hidden bg-background">
        <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <Layers size={13} />
              <span>WHAT WE DO</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-center">
              Four ways we take work <span className="text-gradient">off your plate</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto text-center">
              Pick one, or let us combine them into one system that fits how your business actually runs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="bg-card border border-border/80 rounded-[2rem] p-7 flex flex-col hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon size={22} className="text-primary" />
                </div>
                <div className="text-[11px] font-semibold text-primary uppercase tracking-wider mt-6">{tag}</div>
                <h3 className="font-display text-xl font-bold mt-1 text-foreground group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">{desc}</p>
                <ul className="space-y-1.5 mt-4">
                  {items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-[13px] text-foreground/80 font-medium">
                      <Check size={13} className="text-emerald-500 stroke-[3px] shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <div className="pt-4 border-t border-border/40 text-sm font-semibold text-primary">{out}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ── Section: Solutions Snapshot ── */}
      <section data-logi="Ready-made, then made yours." className="py-24 relative overflow-hidden bg-background">
        <div className="w-full max-w-[1540px] mx-auto px-6 relative z-10">
          {/* Centered Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <Bot size={13} />
              <span>READY SOLUTIONS</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-center">
              Ready-made solutions, <span className="text-gradient">made yours</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto text-center">
              Proven systems for schools, hotels, clinics and sales teams, customised to your business so you go live faster and pay less.
            </p>
          </div>

          {/* Solutions 2x2 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {solutionsData.map((sol) => (
              <Link
                key={sol.id}
                to={sol.path}
                className="bg-card border border-border/80 rounded-[2rem] overflow-hidden flex flex-col md:flex-row gap-4 hover:shadow-xl hover:border-primary/30 transition-all duration-500 group relative"
              >
                {/* Left Side: Mockup Image Container */}
                <div 
                  className="md:w-[65%] w-full bg-[#F3F4F6] dark:bg-slate-800/40 flex items-center justify-center border-b md:border-b-0 md:border-r border-border/40 shrink-0 self-stretch overflow-hidden md:aspect-auto aspect-[1.65/1]"
                  style={{ aspectRatio: undefined }}
                >
                  <ResponsiveImage
                    image={sol.img}
                    alt={sol.title}
                    className="w-full h-full object-contain group-hover:scale-[1.05] transition-transform duration-500 origin-center"
                  />
                </div>

                {/* Right Side: Details block */}
                <div className="md:w-[35%] w-full flex flex-col justify-between p-3 md:py-3 md:pr-3 md:pl-0">
                  <div>
                    {/* Title */}
                    <h3 className="font-display text-[17px] font-bold mt-0 mb-1 text-foreground group-hover:text-primary transition-colors">
                      {sol.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-[11px] leading-relaxed mb-2">
                      {sol.desc}
                    </p>

                    {/* Checklist Features */}
                    <ul className="space-y-1 mb-2.5">
                      {sol.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-1.5 text-[11px] text-foreground/80 font-medium">
                          <Check size={11} className="text-emerald-500 stroke-[3px] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-border/40">
                    <div className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
                      From {sol.price}
                    </div>
                    <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
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
              className="bg-gradient-primary hover:opacity-90 text-white shadow-glow"
            >
              View All Solutions
              <ArrowRight size={16} className="ml-2 relative z-20" />
            </AnimatedButton>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <MessageCircle size={16} className="text-primary" />
              <span>
                Need a custom solution?{" "}
                <Link to="/contact" className="text-primary font-semibold hover:underline">
                  Let's talk
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ── Section: Chalk to Choice ── */}
      <section data-logi="IKURO is made by Logisaar too!" className="py-20 md:py-28 relative overflow-hidden bg-white dark:bg-background">
        {/* Subtle background dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
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
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full">
                <GraduationCap size={13} />
                <span>IKURO · A Logisaar product</span>
              </div>

              {/* Heading */}
              <div className="space-y-1">
                <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                  IKURO
                </h2>
                <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-primary leading-tight">
                  Decisions{" "}
                  <span className="relative inline-block">
                    today
                    <svg 
                      className="absolute -bottom-2.5 left-0 w-full h-2.5 text-primary/80 pointer-events-none" 
                      viewBox="0 0 200 10" 
                      preserveAspectRatio="none" 
                      fill="none"
                    >
                      <path d="M2,7 C60,2 140,8 198,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M10,9 C70,5 130,10 190,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  </span>
                  . Growth{" "}
                  <span className="relative inline-block">
                    tomorrow
                    <svg 
                      className="absolute -bottom-2.5 left-0 w-full h-2.5 text-primary/80 pointer-events-none" 
                      viewBox="0 0 200 10" 
                      preserveAspectRatio="none" 
                      fill="none"
                    >
                      <path d="M2,7 C60,2 140,8 198,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M10,9 C70,5 130,10 190,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  </span>
                  .
                </h2>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
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
                      <Icon size={17} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</div>
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
                    className="bg-gradient-primary hover:opacity-90 border-0 text-white rounded-full px-8 gap-2 font-semibold shadow-md shadow-primary/20"
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
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group"
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
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border/60 pt-10"
          >
            {[
              { icon: Users,       stat: "500+",   label: "Students Guided",    sub: "Trusted by students across schools." },
              { icon: GraduationCap, stat: "10+",   label: "Schools Connected",  sub: "Partnered with schools and institutions." },
              { icon: Smile,       stat: "15+",    label: "Expert Mentors",     sub: "Industry professionals & career coaches." },
              { icon: TrendingUp,  stat: "100%",   label: "Career Focused",     sub: "Helping students make confident career choices." },
            ].map(({ icon: Icon, stat, label, sub }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-xl font-black text-primary leading-none">{stat}</div>
                  <div className="text-sm font-bold text-foreground mt-0.5">{label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      <GradientDivider />

      {/* ── Section: Products Snapshot ── */}
      <section data-logi="We build our own products as well." className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <Sparkles size={13} />
                <span>HeyLane · A Logisaar product</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                We don't just build for clients. <span className="text-gradient">We build our own.</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                HeyLane is our hyperlocal super app connecting local businesses with customers nearby: discovery, direct chat, loyalty rewards and automatic GST invoices, all in one place.
              </p>
              <div>
                <MagneticButton strength={0.1}>
                  <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 border-0 text-white rounded-full px-8">
                    <a href="https://heylane.in/" target="_blank" rel="noopener noreferrer">
                      Visit HeyLane
                      <ArrowRight size={16} className="ml-2" />
                    </a>
                  </Button>
                </MagneticButton>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-2xl relative overflow-hidden aspect-[16/10] flex flex-col justify-between group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-accent/5 to-transparent pointer-events-none" />
                
                {/* Browser Header */}
                <div className="flex justify-between items-center border-b border-border/40 pb-3 mb-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <span className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="bg-secondary/40 border border-border px-4 py-0.5 rounded-md text-[10px] text-muted-foreground font-mono select-none">
                    heylane.in
                  </div>
                  <div className="w-6" /> {/* Spacer to center URL */}
                </div>
                
                {/* Visual Dashboard Preview */}
                <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden text-xs">
                  {/* Left Column: Loyalty Card Mockup */}
                  <div className="col-span-7 bg-secondary/20 rounded-xl border border-border/40 p-3.5 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-foreground text-sm font-display">Kalinga Café</h4>
                        <p className="text-[10px] text-muted-foreground font-mono">Loyalty Card</p>
                      </div>
                      <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] px-2 py-0.5 rounded-full font-semibold">Active</span>
                    </div>

                    {/* Coffee Cups Stamps Grid */}
                    <div className="grid grid-cols-5 gap-1.5 my-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-primary/20 border border-primary/45 rounded-lg flex items-center justify-center text-primary text-xs font-bold font-mono">
                          ✓
                        </div>
                      ))}
                      <div className="aspect-square bg-secondary border border-border/60 rounded-lg flex items-center justify-center text-muted-foreground/45 text-[10px]">
                        5
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] border-t border-border/20 pt-2 text-muted-foreground">
                      <span>4 of 5 visits complete</span>
                      <span className="text-primary font-bold">1 Free Coffee next!</span>
                    </div>
                  </div>

                  {/* Right Column: GBP Growth & QR Stats */}
                  <div className="col-span-5 flex flex-col gap-3">
                    {/* Google Business Profile Growth Box */}
                    <div className="bg-primary/5 rounded-xl border border-primary/20 p-3 flex flex-col justify-center flex-1">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">GST Invoice</p>
                      <h5 className="font-bold text-foreground text-base mt-0.5 font-display">Auto</h5>
                      <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">Generated for every order for businesses with GSTIN.</p>
                    </div>

                    {/* QR Code trigger mockup */}
                    <div className="bg-secondary/20 rounded-xl border border-border/40 p-3 flex items-center gap-3 shrink-0">
                      <div className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-foreground font-mono font-bold text-xs shrink-0 select-none">
                        QR
                      </div>
                      <div className="leading-tight">
                        <p className="font-semibold text-foreground text-[10px]">Shop Chat</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">Customers message the shop directly</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer block */}
                <div className="border-t border-border/40 mt-3 pt-3 flex justify-between items-center text-[10px] text-muted-foreground">
                  <span>Hyperlocal super app</span>
                  <a href="https://heylane.in/" target="_blank" rel="noopener noreferrer" className="text-primary font-mono font-semibold hover:underline inline-flex items-center gap-1">
                    heylane.in <ArrowRight size={10} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ── Section: Portfolio Snapshot ── */}
      <section data-logi="25+ businesses and counting." className="py-24 relative overflow-hidden bg-background">
        <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
          
          {/* Centered Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-5">
            <div className="flex items-center justify-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold">
              <span className="w-8 h-px bg-primary/30" />
              <span style={{ textShadow: "0 0 8px hsl(var(--primary) / 0.4)" }}>OUR WORK</span>
              <span className="w-8 h-px bg-primary/30" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-center">
              25+ businesses already <span className="text-gradient">run on Logisaar</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto text-center">
              Schools, hotels, retailers, consultants and builders trust us with the systems they use every day.
            </p>
          </div>

          {/* Trusted by Badge */}
          <div className="max-w-5xl mx-auto mb-6 flex justify-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Trusted by
            </div>
          </div>

          {/* Logos Border Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border/40 dark:bg-slate-800/40 border border-border/40 dark:border-slate-800/40 rounded-2xl overflow-hidden max-w-5xl mx-auto">
            {brandLogos.map((logo) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={logo.name}
                className="bg-white dark:bg-slate-900/50 flex items-center justify-center p-6 min-h-[120px] transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 group"
              >
                {logo.type === "image" ? (
                  <img
                    src={logo.img}
                    alt={logo.name}
                    className={`${
                      logo.name === "Sako Sales"
                        ? "max-h-[82px] md:max-h-[96px] w-[95%]"
                        : "max-h-[64px] md:max-h-[76px] w-[85%]"
                    } h-auto object-contain transition-transform duration-300 group-hover:scale-105`}
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
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Users size={18} />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground leading-tight">30+</div>
                <div className="text-[11px] text-muted-foreground font-medium">Projects Delivered</div>
              </div>
            </div>

            <div className="hidden md:block h-8 w-px bg-border/80 dark:bg-slate-800" />

            {/* Stat 2 */}
            <div className="flex items-center gap-3 w-full sm:w-[48%] md:w-auto">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Smile size={18} />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground leading-tight">25+</div>
                <div className="text-[11px] text-muted-foreground font-medium">Happy Clients</div>
              </div>
            </div>

            <div className="hidden md:block h-8 w-px bg-border/80 dark:bg-slate-800" />

            {/* Stat 3 */}
            <div className="flex items-center gap-3 w-full sm:w-[48%] md:w-auto">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Zap size={18} />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground leading-tight">2x</div>
                <div className="text-[11px] text-muted-foreground font-medium">Faster Delivery</div>
              </div>
            </div>

            <div className="hidden md:block h-8 w-px bg-border/80 dark:bg-slate-800" />

            {/* Stat 4 */}
            <div className="flex items-center gap-3 w-full sm:w-[48%] md:w-auto">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground leading-tight">90%</div>
                <div className="text-[11px] text-muted-foreground font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="text-center mt-12">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-1.5 text-primary hover:opacity-90 font-semibold text-sm transition-all duration-300 group"
            >
              <span>See All Work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      <GradientDivider />
      

      <TestimonialsSection />

      {/* ── Closing CTA Section (WhatsApp First) ── */}
      <section data-logi="Quotes are free. Tell us the one task you hate." className="py-28 relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 animated-grid pointer-events-none opacity-[0.03]" />
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
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
            <p className="text-white/60 text-base md:text-lg max-w-lg mx-auto">
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
                className="bg-green-500 hover:bg-green-600 border-0 text-white font-medium rounded-full px-10 py-6 text-base shadow-lg shadow-green-500/20"
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
              className="border border-white/20 bg-transparent hover:bg-white/10 text-white hover:text-white rounded-full px-10 py-6 text-base transition-all duration-300"
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
