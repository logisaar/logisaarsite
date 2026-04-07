import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import TextReveal from "@/components/creative/TextReveal";
import MagneticButton from "@/components/creative/MagneticButton";
import SEO from "@/components/SEO";

import serviceWeb from "@/assets/service-web.jpg";
import serviceMobile from "@/assets/service-mobile.jpg";
import serviceAi from "@/assets/service-ai.jpg";
import serviceGrowth from "@/assets/service-growth.jpg";
import serviceDesign from "@/assets/service-design.jpg";
import serviceMotion from "@/assets/service-motion.jpg";

const serviceImages = [serviceWeb, serviceMobile, serviceAi, serviceGrowth, serviceDesign, serviceMotion];

// ─── Industry Solutions Data ───────────────────────────────────────────────
const industrySolutions = [
  {
    name: "School Management System",
    badge: "Education",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    tagline: "Run your entire institution from one dashboard",
    desc: "Built for schools, colleges and coaching centers in Odisha. Manage every aspect of your institution digitally.",
    img: "/images/services/school.png",
    to: "/services/school-management-system",
    from: "₹35,000",
    features: [
      "Student admission & profile management",
      "Automated attendance + WhatsApp alerts to parents",
      "Online fee collection & payment tracking",
      "Exam results & report card generation",
      "Timetable, staff & multi-branch support",
      "Parent communication portal",
    ],
    wa: "Hi LogiSaar, I want a School Management System for my institution.",
  },
  {
    name: "Hotel Management System",
    badge: "Hospitality",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    tagline: "Reduce staff workload by 60% — run on autopilot",
    desc: "Manage bookings, check-ins, billing and guest experience for hotels, resorts and homestays across Odisha.",
    img: "/images/services/hotel.png",
    to: "/services/hotel-management-system",
    from: "₹40,000",
    features: [
      "Real-time room booking & availability calendar",
      "Online booking from your website",
      "Automated invoice & billing generation",
      "Housekeeping task management",
      "Guest profile & history",
      "Revenue analytics & reports",
    ],
    wa: "Hi LogiSaar, I want a Hotel Management System for my property.",
  },
  {
    name: "AI Lead Follow-Up System",
    badge: "AI + Sales",
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    tagline: "Convert leads 24/7 — even while you sleep",
    desc: "Your AI follows up with every new lead instantly via WhatsApp, email and voice calls — never lose a lead again.",
    img: "/images/services/ai-lead.png",
    to: "/services/ai-lead-followup",
    from: "₹25,000 + ₹5K/mo",
    features: [
      "Instant WhatsApp follow-up on new lead",
      "Automated email drip sequences",
      "AI voice call follow-up (optional)",
      "Lead scoring & priority tagging",
      "CRM integration (Zoho, HubSpot, Sheets)",
      "Conversion analytics dashboard",
    ],
    wa: "Hi LogiSaar, I want an AI Lead Follow-Up System.",
  },
  {
    name: "AI Receptionist",
    badge: "AI + Service",
    badgeColor: "bg-teal-500/15 text-teal-400 border-teal-500/20",
    tagline: "Never miss a call or booking — ever again",
    desc: "Your AI answers calls, books appointments and handles WhatsApp enquiries 24/7, without hiring staff.",
    img: "/images/services/ai-receptionist.png",
    to: "/services/ai-receptionist",
    from: "₹20,000 + ₹4K/mo",
    features: [
      "24/7 AI voice call handling",
      "WhatsApp auto-reply & booking",
      "Appointment scheduling & calendar sync",
      "FAQ answering trained on your business",
      "Call transcription & summary",
      "Multi-language: English + Odia",
    ],
    wa: "Hi LogiSaar, I want an AI Receptionist for my business.",
  },
  {
    name: "Proposal Software",
    badge: "Freelancers",
    badgeColor: "bg-pink-500/15 text-pink-400 border-pink-500/20",
    tagline: "Close clients 3x faster with interactive proposals",
    desc: "Send stunning branded proposals with digital signatures, pricing tables and payment links — built for Indian freelancers.",
    img: "/images/services/proposal.png",
    to: "/services/proposal-software",
    from: "₹15,000",
    features: [
      "Branded proposal templates (your logo & colors)",
      "Interactive pricing tables clients can select",
      "Digital e-signature (legally valid in India)",
      "Real-time open & read tracking",
      "Automatic follow-up reminders",
      "Razorpay / PayTM payment links",
    ],
    wa: "Hi LogiSaar, I want Proposal Software for my freelance business.",
  },
  {
    name: "QR Code Menu System",
    badge: "Food & Beverage",
    badgeColor: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    tagline: "Scan, order & pay — no waiter, no paper menu",
    desc: "Replace paper menus for good. Beautiful digital QR menus for restaurants, cafes and dhabas across Odisha.",
    img: "/images/services/qr-menu.png",
    to: "/services/qr-menu-system",
    from: "₹12,000",
    features: [
      "QR code for every table — no app required",
      "Beautiful menu with food photos",
      "Real-time updates — no reprinting ever",
      "Online ordering from the table",
      "UPI / QR payment at table",
      "Daily sales & order analytics",
    ],
    wa: "Hi LogiSaar, I want a QR Code Menu System for my restaurant.",
  },
  {
    name: "Tours & Travel Website",
    badge: "Tourism",
    badgeColor: "bg-green-500/15 text-green-400 border-green-500/20",
    tagline: "Get direct bookings from Odisha tourists online",
    desc: "Custom travel booking websites for tour operators in Odisha — ranked on Google, with Razorpay payment built in.",
    img: "/images/services/travel.png",
    to: "/services/travel-website",
    from: "₹20,000",
    features: [
      "Tour package listings with photos & itinerary",
      "Online booking & availability calendar",
      "Razorpay / UPI payment integration",
      "SEO for Odisha tourism keywords",
      "Customer reviews & rating system",
      "Travel blog for Google rankings",
    ],
    wa: "Hi LogiSaar, I want a Tours & Travel Website.",
  },
  {
    name: "AI Automation Suite",
    badge: "Automation",
    badgeColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
    tagline: "Save 20+ hours every week — run on autopilot",
    desc: "From WhatsApp automation to invoice generation, we build custom AI workflows that run your business hands-free.",
    img: "/images/services/ai-automation.png",
    to: "/services/ai-automation",
    from: "₹20,000",
    features: [
      "WhatsApp Business API automation",
      "Automated invoice & report generation",
      "Google Sheets / CRM data sync",
      "Email drip campaign automation",
      "AI chatbot for website & WhatsApp",
      "n8n / Make / custom workflow builder",
    ],
    wa: "Hi LogiSaar, I want AI Automation for my business.",
  },
  {
    name: "Custom CRM System",
    badge: "Sales",
    badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    tagline: "Own your CRM forever — no monthly fees ever",
    desc: "A fully custom CRM built for your exact workflow — better than Zoho, owned by you, one-time cost only.",
    img: "/images/services/crm.png",
    to: "/services/custom-crm",
    from: "₹45,000",
    features: [
      "Visual sales pipeline (Kanban board)",
      "Lead & contact management",
      "WhatsApp & email integration",
      "Revenue analytics dashboard",
      "Role-based access for your team",
      "Full source code — you own it 100%",
    ],
    wa: "Hi LogiSaar, I want a Custom CRM for my business.",
  },
];

// ─── Big Solution Card ──────────────────────────────────────────────────────
const SolutionCard = ({ sol, i }: { sol: typeof industrySolutions[0]; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 20 } }}
    className="group rounded-3xl border border-border bg-card overflow-hidden flex flex-col hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
  >
    {/* Image */}
    <div className="relative overflow-hidden" style={{ height: 220 }}>
      <img
        src={sol.img}
        alt={sol.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
      {/* Badge */}
      <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm ${sol.badgeColor}`}>
        {sol.badge}
      </span>
      {/* Price tag */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
        From {sol.from}
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <h3 className="font-display text-xl font-bold mb-1 group-hover:text-primary transition-colors">{sol.name}</h3>
      <p className="text-primary text-xs font-semibold mb-2">{sol.tagline}</p>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{sol.desc}</p>

      {/* Feature list */}
      <ul className="space-y-2 mb-6 flex-1">
        {sol.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check size={13} className="text-primary mt-0.5 shrink-0" />
            <span className="text-muted-foreground leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="flex gap-2 mt-auto">
        <MagneticButton strength={0.08} className="flex-1">
          <Button asChild className="w-full bg-gradient-primary hover:opacity-90 border-0 text-white rounded-xl text-sm">
            <Link to={sol.to}>
              Explore <ArrowRight size={13} className="ml-1" />
            </Link>
          </Button>
        </MagneticButton>
        <MagneticButton strength={0.08}>
          <Button asChild variant="outline" size="icon" className="rounded-xl border-2 border-green-500/30 hover:border-green-500/60 hover:bg-green-500/10">
            <a href={`https://wa.me/917815014638?text=${encodeURIComponent(sol.wa)}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle size={16} className="text-green-500" />
            </a>
          </Button>
        </MagneticButton>
      </div>
    </div>
  </motion.div>
);

// ─── Existing service block ─────────────────────────────────────────────────
const ServiceBlock = ({ service, index, isEven, image }: { service: typeof services[0]; index: number; isEven: boolean; image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = service.icon;

  return (
    <section ref={ref} className={`py-24 ${index % 2 === 1 ? "bg-secondary/30" : ""}`}>
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-16 items-center ${!isEven ? "md:flex-row-reverse" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] mb-6">
              <Icon size={14} />
              <span>Service {String(index + 1).padStart(2, "0")}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.1] mb-6">{service.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{service.description}</p>
            <ul className="space-y-3 mb-10">
              {service.features?.map((f: string) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <MagneticButton strength={0.12}>
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 border-0 text-white rounded-full px-8" asChild>
                <Link to="/contact">Start This Project <ArrowRight size={15} className="ml-1.5" /></Link>
              </Button>
            </MagneticButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`aspect-[4/3] rounded-3xl relative overflow-hidden group border border-border/30 ${!isEven ? "md:order-1" : ""}`}
          >
            <img
              src={image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Icon className="text-white/80" size={28} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Page ───────────────────────────────────────────────────────────────────
const Services = () => {
  return (
    <Layout>
      <SEO
        title="Web Development & Software Solutions in Odisha | LogiSaar"
        description="School management system, hotel software, AI lead follow-up, QR menu, CRM, AI automation and more — built for businesses in Bhubaneswar, Cuttack and Odisha. LogiSaar: +91 78150 14638"
        keywords="web development services Odisha, school management system Odisha, hotel software Bhubaneswar, AI automation Odisha, custom CRM Cuttack, QR menu restaurant Odisha, LogiSaar"
        canonical="https://logisaar.in/services"
      />

      {/* Hero */}
      <section className="min-h-[55vh] flex items-end relative overflow-hidden pb-16">
        <GradientMesh />
        <div className="container mx-auto px-4 relative z-10 pt-32">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-4 py-1.5 rounded-full mb-6"
          >
            <Sparkles size={12} /> 15+ Projects Delivered Across Odisha
          </motion.div>
          <TextReveal text="Everything You Need" as="h1" className="font-display text-5xl md:text-7xl font-bold leading-[0.95]" delay={0.2} />
          <TextReveal text="to Go Digital" as="h2" className="font-display text-3xl md:text-5xl font-bold text-gradient leading-[0.95] mt-2" delay={0.5} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-muted-foreground text-lg mt-6 max-w-xl">
            From ready-made industry systems to fully custom digital solutions — we build it all, right here in Odisha.
          </motion.p>
        </div>
      </section>

      {/* ── INDUSTRY SOLUTIONS — Big Cards Grid (TOP) ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="text-center mb-14"
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-3">Ready-to-Deploy</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Industry-Specific <span className="text-gradient">Solutions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Purpose-built software for specific industries — deployed faster, priced better, and tailored to exactly how your business works.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
            {industrySolutions.map((sol, i) => (
              <SolutionCard key={sol.name} sol={sol} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES ── */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-10" />
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-2">Custom Services</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Core <span className="text-gradient">Development</span> Services
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Fully bespoke digital services built around your exact requirements.</p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail Blocks */}
      {services.map((service, i) => (
        <ServiceBlock key={service.title} service={service} index={i} isEven={i % 2 === 0} image={serviceImages[i]} />
      ))}
    </Layout>
  );
};

export default Services;
