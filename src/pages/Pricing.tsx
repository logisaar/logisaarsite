import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import TextReveal from "@/components/creative/TextReveal";
import MagneticButton from "@/components/creative/MagneticButton";

const plans = [
  {
    name: "Personal Portfolio",
    price: "₹2,999",
    period: "",
    description: "Showcase your work with a stunning personal website.",
    features: ["Single Page Design", "Mobile Responsive", "Contact Form", "Fast Delivery"],
    popular: false,
    delivery: "3-5 Days",
  },
  {
    name: "Website Development",
    price: "₹25,000",
    period: "",
    description: "Custom business website with modern design and SEO.",
    features: ["Multi-Page Website", "Custom UI/UX", "SEO Optimized", "CMS Integration", "Analytics Setup"],
    popular: false,
    delivery: "2-3 Weeks",
  },
  {
    name: "E-Commerce Solutions",
    price: "₹50,000",
    period: "",
    description: "Full-featured online store with payment integration.",
    features: ["Product Catalog", "Payment Gateway", "Inventory Management", "Order Tracking", "Admin Dashboard"],
    popular: true,
    delivery: "4-6 Weeks",
  },
  {
    name: "Mobile App Development",
    price: "₹75,000",
    period: "",
    description: "Cross-platform mobile app with native performance.",
    features: ["iOS & Android", "Push Notifications", "Offline Support", "API Integration", "App Store Submission"],
    popular: false,
    delivery: "6-8 Weeks",
  },
  {
    name: "UI/UX Design",
    price: "₹15,000",
    period: "",
    description: "Beautiful, user-centric interface and experience design.",
    features: ["User Research", "Wireframes", "Prototyping", "Design System", "Handoff-Ready"],
    popular: false,
    delivery: "1-2 Weeks",
  },
  {
    name: "SEO & Maintenance",
    price: "₹12,000",
    period: "/month",
    description: "Ongoing SEO optimization and website maintenance.",
    features: ["Monthly SEO Audit", "Content Updates", "Performance Monitoring", "Security Updates", "Priority Support"],
    popular: false,
    delivery: "Ongoing",
  },
  {
    name: "AI & Automation",
    price: "₹85,000",
    period: "",
    description: "AI chatbots, voice assistants, and workflow automation.",
    features: ["AI Chatbot", "Voice AI Integration", "Workflow Automation", "Custom Training", "Analytics Dashboard"],
    popular: false,
    delivery: "4-6 Weeks",
  },
  {
    name: "Agentic AI",
    price: "₹1,00,000",
    period: "",
    description: "Advanced autonomous AI agents for complex business processes.",
    features: ["Autonomous Agents", "Multi-Step Workflows", "LLM Integration", "Custom Pipelines", "Enterprise Support"],
    popular: false,
    delivery: "6-10 Weeks",
  },
  {
    name: "Custom CRM",
    price: "₹75,000",
    period: "",
    description: "Tailored CRM solution for your business operations.",
    features: ["Contact Management", "Sales Pipeline", "Custom Reports", "Email Integration", "Role-Based Access"],
    popular: false,
    delivery: "6-8 Weeks",
  },
  {
    name: "Site Upgrade",
    price: "₹10",
    period: "",
    description: "Expert consultation to upgrade your existing website.",
    features: ["Full Site Audit", "Performance Analysis", "Upgrade Roadmap", "Technology Recommendations"],
    popular: false,
    delivery: "1-2 Days",
  },
];

const Pricing = () => {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <Layout>
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
                className={`relative rounded-2xl border p-7 flex flex-col group overflow-hidden ${plan.popular
                    ? "border-primary/50 bg-primary/5 shadow-glow-sm"
                    : "border-border bg-card"
                  }`}
              >
                {/* Hover gradient top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
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
                    <Link to={`/checkout?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price.replace(/[^\d.]/g, ""))}`}>
                      Get Started
                      <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </MagneticButton>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center mt-16 text-muted-foreground text-sm"
          >
            We accept payments via <strong className="text-foreground">Paytm</strong> and bank transfer.
            International clients can pay via wire transfer or PayPal.
          </motion.p>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
