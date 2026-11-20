import { getImage } from "@/data/images";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, MessageCircle, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import TextReveal from "@/components/creative/TextReveal";
import SEO from "@/components/SEO";

// ─── 9 Industry Solutions Data ───────────────────────────────────────────────
const industrySolutions = [
  {
    id: "school-management",
    name: "AI-Powered School ERP",
    badge: "Education",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    tagline: "Run your entire institution from one dashboard.",
    desc: "Built for schools, colleges and coaching centers in Odisha. Manage students, admissions, fee structures and academic reporting in one place.",
    from: "₹35,000",
    img: getImage("services", "school"),
    features: [
      "Student admission & digital profiles",
      "Automated attendance + WhatsApp alerts to parents",
      "Online fee collection & payment tracking",
      "Exam results & report card generation",
      "Timetable, staff & multi-branch support",
      "Parent communication portal"
    ],
    techStack: ["React / Next.js", "Node.js API", "PostgreSQL database", "WhatsApp Cloud API"],
    wa: "Hi Logisaar, I'm interested in the AI-Powered School ERP solution.",
    path: "/solutions/ai-powered-school-erp"
  },
  {
    id: "hotel-management",
    name: "Hotel Management System",
    badge: "Hospitality",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    tagline: "Reduce staff workload by 60%.",
    desc: "Manage bookings, check-ins, billing and housekeeping for hotels, resorts and homestays across Odisha. Prevent double bookings and maximize occupancy.",
    from: "₹40,000",
    img: getImage("services", "hotel"),
    features: [
      "Real-time room booking & availability calendar",
      "Online booking engine for your website",
      "Automated invoicing & billing generation",
      "Housekeeping & staff task management",
      "Guest history & preferences profile",
      "Revenue analytics & occupancy reports"
    ],
    techStack: ["React SPA", "Tailwind CSS", "Node.js backend", "MongoDB / Firebase"],
    wa: "Hi Logisaar, I'm interested in the Hotel Management System solution.",
    path: "/solutions/hotel-management-system"
  },
  {
    id: "ai-lead-followup",
    name: "AI Lead Follow-Up System",
    badge: "AI + Sales",
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    tagline: "Convert leads 24/7.",
    desc: "Your AI follows up with every incoming lead instantly via WhatsApp, email and smart voice calls. Never miss a response time window.",
    from: "₹25,000 + ₹5K/mo",
    img: getImage("services", "ai-lead"),
    features: [
      "Instant WhatsApp follow-up upon submission",
      "Automated email drip sequences",
      "AI voice call follow-up (optional integration)",
      "Lead scoring & priority tagging",
      "CRM integration (Zoho, HubSpot, Google Sheets)",
      "Conversion analytics dashboard"
    ],
    techStack: ["OpenAI API / Llama-3", "Vapi / Twilio voice pipelines", "n8n / Make integration", "Node.js"],
    wa: "Hi Logisaar, I'm interested in the AI Lead Follow-Up System.",
    path: "/solutions/ai-lead-followup"
  },
  {
    id: "ai-receptionist",
    name: "AI Receptionist",
    badge: "AI + Service",
    badgeColor: "bg-teal-500/15 text-teal-400 border-teal-500/20",
    tagline: "Never miss a call or booking.",
    desc: "An AI agent that answers calls, logs bookings, and handles WhatsApp enquiries 24/7. Trained on your custom business FAQs.",
    from: "₹20,000 + ₹4K/mo",
    img: getImage("services", "ai-receptionist"),
    features: [
      "24/7 AI voice call answering",
      "WhatsApp auto-reply & booking",
      "Appointment scheduling & calendar sync",
      "FAQ training based on your custom files",
      "Call transcriptions & sentiment summary",
      "Bilingual capabilities: English + Odia"
    ],
    techStack: ["Retell AI / Exotel voice gateway", "GPT-4o custom fine-tuning", "Google Calendar API", "FastAPI"],
    wa: "Hi Logisaar, I'm interested in the AI Receptionist solution.",
    path: "/solutions/ai-receptionist"
  },
  {
    id: "proposal-software",
    name: "Proposal Software",
    badge: "Freelancers",
    badgeColor: "bg-pink-500/15 text-pink-400 border-pink-500/20",
    tagline: "Close clients 3x faster.",
    desc: "Send beautiful branded interactive proposals with legally valid e-signatures and instant payment links. Built for modern freelancers and agencies.",
    from: "₹15,000",
    img: getImage("services", "proposal"),
    features: [
      "Branded proposal templates (logo & colors)",
      "Interactive pricing packages clients can select",
      "Digital e-signature (legally valid in India)",
      "Real-time open & read tracking notifications",
      "Automatic follow-up reminders",
      "Razorpay / PayTM payment link triggers"
    ],
    techStack: ["React SPA", "PDF rendering server", "Webhook tracking", "Razorpay APIs"],
    wa: "Hi Logisaar, I'm interested in the Proposal Software solution.",
    path: "/solutions/proposal-software"
  },
  {
    id: "qr-menu-system",
    name: "QR Code Menu System",
    badge: "Food & Beverage",
    badgeColor: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    tagline: "Scan, order, pay — no waiter, no paper.",
    desc: "Digital menu cards for restaurants, cafes, and dhabas across Odisha. Customers scan a table-specific QR code, browse items, and pay from their phone.",
    from: "₹12,000",
    img: getImage("services", "qr-menu"),
    features: [
      "Table-specific QR code generation — no app download",
      "Digital catalog with high-quality photos",
      "Real-time menu updates — no printing costs",
      "Direct table ordering system",
      "UPI / QR code payment at table",
      "Daily sales & order metrics dashboard"
    ],
    techStack: ["Vite + React webapp", "Firebase Realtime DB", "UPI Deep links", "Node.js QR generator"],
    wa: "Hi Logisaar, I'm interested in the QR Code Menu System.",
    path: "/solutions/qr-menu-system"
  },
  {
    id: "travel-website",
    name: "Tours & Travel Website",
    badge: "Tourism",
    badgeColor: "bg-green-500/15 text-green-400 border-green-500/20",
    tagline: "Get direct bookings from Odisha tourists.",
    desc: "Direct booking travel systems for operators in Odisha. Built with tour listing tools, automated itineraries, and localized SEO.",
    from: "₹20,000",
    img: getImage("services", "travel"),
    features: [
      "Tour package listings with photo galleries",
      "Online booking calendar & slots availability",
      "Razorpay / UPI payment integrations",
      "Odisha-tourism target keyword SEO setup",
      "Customer reviews & blog engine",
      "Mobile-responsive administration portal"
    ],
    techStack: ["Next.js/React templates", "Tailwind CSS", "Razorpay Node SDK", "SEO Schema templates"],
    wa: "Hi Logisaar, I'm interested in the Tours & Travel Website solution.",
    path: "/solutions/travel-website"
  },
  {
    id: "ai-automation-suite",
    name: "AI Automation Suite",
    badge: "Automation",
    badgeColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
    tagline: "Save 20+ hours a week.",
    desc: "Replace manual business workflows with automated AI routines. Connect sheets, CRMs, WhatsApp, and email alerts into a unified sync.",
    from: "₹20,000",
    img: getImage("services", "ai-automation"),
    features: [
      "WhatsApp Business API event automation",
      "Automated PDF invoice & reports generation",
      "Google Sheets & local database syncing",
      "Email drip and auto-reply setups",
      "Website and social chatbot integrations",
      "n8n / Make workflow administration triggers"
    ],
    techStack: ["Python scripts", "Make.com / n8n pipelines", "Anthropic / OpenAI API", "WhatsApp Cloud API"],
    wa: "Hi Logisaar, I'm interested in the AI Automation Suite solution.",
    path: "/solutions/ai-automation"
  },
  {
    id: "custom-crm",
    name: "Custom CRM System",
    badge: "Sales",
    badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    tagline: "Own your CRM forever.",
    desc: "A sales pipeline custom built for your exact operational workflow. One-time fee, full source code ownership, zero monthly licenses.",
    from: "₹45,000",
    img: getImage("services", "crm"),
    features: [
      "Visual sales pipeline (Kanban board stages)",
      "Lead scoring & detailed contact timelines",
      "WhatsApp Business & Gmail API integrations",
      "Revenue tracking & staff performance charts",
      "Custom role-based permissions access",
      "Full source code repository handoff"
    ],
    techStack: ["React / TypeScript", "Node.js Express API", "PostgreSQL database", "Vercel / VPS hosting"],
    wa: "Hi Logisaar, I'm interested in the Custom CRM System.",
    path: "/solutions/custom-crm"
  }
];

// ─── Solution Card Component ───────────────────────────────────────────────
const SolutionCard = ({ sol }: { sol: typeof industrySolutions[0] }) => {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 20 } }}
      className="group rounded-3xl border border-border bg-card overflow-hidden flex flex-col hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
    >
      {/* Product Image Header */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <ResponsiveImage
          image={sol.img}
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

      <div className="p-6 flex flex-col flex-1">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">
            {sol.name}
          </h3>
          <p className="text-primary text-xs font-semibold mt-1">{sol.tagline}</p>
          <p className="text-muted-foreground text-sm leading-relaxed mt-3">{sol.desc}</p>
        </div>

        {/* Feature list - Fully Visible */}
        <ul className="space-y-2 mt-5 flex-1">
          {sol.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <Check size={13} className="text-primary mt-1 shrink-0" />
              <span className="text-muted-foreground leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Details */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <h4 className="text-xs uppercase font-mono tracking-wider text-muted-foreground mb-2">Technology Stack</h4>
          <div className="flex flex-wrap gap-2">
            {sol.techStack.map((tech) => (
              <span key={tech} className="text-[10px] font-mono bg-secondary text-foreground/80 border border-border px-2.5 py-0.5 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* WhatsApp & Direct Link Actions */}
        <div className="mt-6 pt-4 border-t border-border/50 flex flex-col gap-3">
          <Button asChild className="w-full bg-green-500 hover:bg-green-600 border-0 text-white rounded-xl text-xs gap-2 py-4 h-auto">
            <a href={`https://wa.me/918596072510?text=${encodeURIComponent(sol.wa)}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={15} fill="currentColor" />
              Request Details / Order via WhatsApp
            </a>
          </Button>
          <Link to={sol.path} className="text-xs text-muted-foreground hover:text-primary transition-colors text-center font-mono uppercase tracking-wider mt-1">
            Explore Direct Link
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Page Component ──────────────────────────────────────────────────────────
const Solutions = () => {
  return (
    <Layout>
      <SEO
        title="Web Systems & custom AI Solutions in Odisha | Logisaar"
        description="Custom AI workflows, school and hotel management dashboards, WhatsApp integrations, AI receptionists, and proposal tools. Built with AI in Odisha."
        keywords="school management software Odisha, hotel software Bhubaneswar, AI receptionists Cuttack, AI automation Odisha, custom CRM Odisha, Logisaar"
        canonical="https://www.logisaar.in/solutions"
      />

      {/* Hero */}
      <section data-logi="Pick a solution and I'll explain it." className="min-h-[50vh] flex items-end relative overflow-hidden pb-16">
        <GradientMesh />
        <div className="container mx-auto px-4 relative z-10 pt-32">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            <Sparkles size={12} /> 15+ Projects Deployed Globally
          </motion.div>
          <TextReveal text="Productized software" as="h1" className="font-display text-5xl md:text-7xl font-bold leading-[0.95]" delay={0.2} />
          <TextReveal text="& custom AI models." as="h2" className="font-display text-3xl md:text-5xl font-bold text-gradient leading-[0.95] mt-2" delay={0.5} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-muted-foreground text-base md:text-lg mt-6 max-w-xl">
            We deliver tailor-made systems faster and at lower costs because we build with AI, not just for it.
          </motion.p>
        </div>
      </section>

      {/* Expandable Solutions Grid */}
      <section data-logi="Ready-made, then made yours." className="py-20 bg-background">
        <div className="container mx-auto px-4 animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="text-center mb-14"
          >
            <p className="text-primary text-xs font-mono uppercase tracking-[0.2em] mb-3">Product Menu</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Industry-Specific <span className="text-gradient">Solutions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Purpose-built software for specific industries — deployed faster, priced better, and tailored to exactly how your business works.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industrySolutions.map((sol) => (
              <SolutionCard key={sol.id} sol={sol} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
