import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import TextReveal from "@/components/creative/TextReveal";
import MagneticButton from "@/components/creative/MagneticButton";
import SEO from "@/components/SEO";

const plans = [
  {
    name: "Personal Portfolio",
    price: "₹2,999",
    period: "",
    description: "Showcase your work with a stunning personal website.",
    features: ["Single Page Design", "Mobile Responsive", "Contact Form", "Fast Delivery"],
    popular: false,
    delivery: "3-5 Days",
    badge: null,
  },
  {
    name: "UI/UX Design",
    price: "₹15,000",
    period: "",
    description: "Beautiful, user-centric interface and experience design.",
    features: ["User Research", "Wireframes", "Prototyping", "Design System", "Handoff-Ready"],
    popular: false,
    delivery: "1-2 Weeks",
    badge: null,
  },
  {
    name: "Website Development",
    price: "₹25,000",
    period: "",
    description: "Custom business website with modern design and SEO.",
    features: ["Multi-Page Website", "Custom UI/UX", "SEO Optimized", "CMS Integration", "Analytics Setup"],
    popular: false,
    delivery: "2-3 Weeks",
    badge: null,
  },
  {
    name: "E-Commerce Solutions",
    price: "₹50,000",
    period: "",
    description: "Full-featured online store with payment integration.",
    features: ["Product Catalog", "Payment Gateway", "Inventory Management", "Order Tracking", "Admin Dashboard"],
    popular: true,
    delivery: "4-6 Weeks",
    badge: "Most Popular for Odisha Businesses",
  },
  {
    name: "Custom CRM",
    price: "₹75,000",
    period: "",
    description: "Tailored CRM solution for your business operations.",
    features: ["Contact Management", "Sales Pipeline", "Custom Reports", "Email Integration", "Role-Based Access"],
    popular: false,
    delivery: "6-8 Weeks",
    badge: null,
  },
  {
    name: "Mobile App Development",
    price: "₹75,000",
    period: "",
    description: "Cross-platform mobile app with native performance.",
    features: ["iOS & Android", "Push Notifications", "Offline Support", "API Integration", "App Store Submission"],
    popular: false,
    delivery: "6-8 Weeks",
    badge: null,
  },
  {
    name: "AI & Automation",
    price: "₹85,000",
    period: "",
    description: "AI chatbots, voice assistants, and workflow automation.",
    features: ["AI Chatbot", "Voice AI Integration", "Workflow Automation", "Custom Training", "Analytics Dashboard"],
    popular: false,
    delivery: "4-6 Weeks",
    badge: null,
  },
  {
    name: "Agentic AI",
    price: "₹1,00,000",
    period: "",
    description: "Advanced autonomous AI agents for complex business processes.",
    features: ["Autonomous Agents", "Multi-Step Workflows", "LLM Integration", "Custom Pipelines", "Enterprise Support"],
    popular: false,
    delivery: "6-10 Weeks",
    badge: null,
  },
  {
    name: "SEO & Maintenance",
    price: "₹12,000",
    period: "/month",
    description: "Ongoing SEO optimization and website maintenance.",
    features: ["Monthly SEO Audit", "Content Updates", "Performance Monitoring", "Security Updates", "Priority Support"],
    popular: false,
    delivery: "Ongoing",
    badge: null,
  },
  {
    name: "Enterprise Growth Suite",
    price: "₹1,50,000",
    period: "",
    description: "Complete digital ecosystem for scaling Odisha businesses — everything in one package.",
    features: [
      "Custom CRM + Website + Mobile App",
      "AI Chatbot Integration",
      "3 Months SEO & Maintenance",
      "Google Ads Setup",
      "Dedicated Project Manager",
      "Priority Support",
    ],
    popular: false,
    delivery: "8-12 Weeks",
    badge: "Best for Scaling Businesses",
  },
];

const Pricing = () => {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <Layout>
      <SEO
        title="Website Development Pricing in Odisha | LogiSaar"
        description="Transparent pricing for websites, CRM, mobile apps & AI tools in Odisha. Static website from ₹2,999. Custom CRM from ₹75,000. No hidden charges."
        keywords="website development cost Odisha, web design price Bhubaneswar, CRM development cost Odisha, LogiSaar pricing"
        canonical="https://www.logisaar.in/pricing"
      />
      {/* Hero */}
      <section className="min-h-[50vh] flex items-end relative overflow-hidden pb-16">
        <GradientMesh />
        <div className="container mx-auto px-4 relative z-10 pt-32 text-center">
          <TextReveal
            text="Transparent"
            as="h1"
            className="font-display text-5xl md:text-7xl font-bold leading-[0.95]"
            delay={0.2}
          />
          <TextReveal
            text="Pricing"
            as="h2"
            className="font-display text-5xl md:text-7xl font-bold text-gradient leading-[0.95] mt-2"
            delay={0.4}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-muted-foreground text-lg mt-6 max-w-lg mx-auto"
          >
            Choose a service that fits your needs, or request a custom quote.
          </motion.p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-16" ref={gridRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className={`relative rounded-2xl border p-7 flex flex-col group overflow-hidden ${
                  plan.popular
                    ? "border-primary/50 bg-primary/5 shadow-glow-sm"
                    : plan.name === "Enterprise Growth Suite"
                    ? "border-amber-500/50 bg-amber-500/5"
                    : "border-border bg-card"
                }`}
              >
                {/* Hover gradient top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                {plan.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-4 py-1 rounded-full truncate max-w-[90%] text-center ${
                    plan.name === "Enterprise Growth Suite" ? "bg-amber-500" : "bg-gradient-primary"
                  }`}>
                    {plan.badge}
                  </span>
                )}
                <h3 className="font-display text-lg font-bold">{plan.name}</h3>
                <p className="text-muted-foreground text-xs mt-1 mb-4">{plan.description}</p>
                <div className="mb-1">
                  <span className="font-display text-3xl font-bold text-gradient">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                </div>
                <p className="text-xs text-muted-foreground mb-5">Delivery: {plan.delivery}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <MagneticButton strength={0.1} className="w-full">
                  <Button
                    asChild
                    variant={plan.popular ? "default" : "outline"}
                    className={`w-full group/btn rounded-xl ${plan.popular ? "bg-gradient-primary hover:opacity-90 border-0 text-white" : ""}`}
                  >
                    <Link to={`/contact?service=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`}>
                      Get Started
                      <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </MagneticButton>
              </motion.div>
            ))}
          </div>

          {/* Pricing note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center space-y-3"
          >
            <p className="text-muted-foreground text-sm">
              ✅ <strong className="text-foreground">All prices are transparent. No hidden charges.</strong>{" "}
              GST applicable as per government norms. EMI available on orders above ₹50,000.
            </p>
            <p className="text-muted-foreground text-sm">
              We accept payments via bank transfer.
              International clients can pay via wire transfer or PayPal.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Need a custom quote?{" "}
              <a
                href="https://wa.me/917815014638?text=Hi%20LogiSaar%2C%20I%20want%20to%20get%20a%20custom%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                WhatsApp us
              </a>{" "}
              or{" "}
              <a href="tel:+917815014638" className="text-primary underline underline-offset-4 hover:opacity-80">
                call +91 78150 14638
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
