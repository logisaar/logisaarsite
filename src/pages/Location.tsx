import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/creative/MagneticButton";
import GradientMesh from "@/components/creative/GradientMesh";
import TextReveal from "@/components/creative/TextReveal";
import { MessageCircle, Phone, ArrowRight, Globe, Smartphone, Bot, Megaphone, Palette, Play } from "lucide-react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a website cost in Odisha?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At LogiSaar, websites start from ₹2,999 for a personal portfolio and go up to ₹1,00,000+ for enterprise solutions with AI and CRM.",
      },
    },
    {
      "@type": "Question",
      name: "Which is the best web development company in Bhubaneswar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LogiSaar is a premium web development studio based in Odisha, delivering custom websites, CRM systems, and AI solutions for businesses in Bhubaneswar, Cuttack, and across Odisha.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide SEO services in Odisha?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. LogiSaar offers SEO and Google review marketing services for businesses across Odisha including Bhubaneswar and Cuttack.",
      },
    },
    {
      "@type": "Question",
      name: "Can you build a custom CRM for my Odisha business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build fully custom CRM systems starting at ₹75,000 tailored to your business workflow, team size, and industry.",
      },
    },
  ],
};

const cities = [
  "Bhubaneswar",
  "Cuttack",
  "Puri",
  "Sambalpur",
  "Rourkela",
  "Berhampur",
  "Balasore",
  "Bhadrak",
  "Nalanda",
  "Kendrapara",
];

const odishaServices = [
  {
    icon: Globe,
    title: "Web Development in Odisha",
    desc: "Custom, fast, and SEO-ready business websites for Odisha companies — from consultancies in Bhubaneswar to manufacturers in Sambalpur.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps for Odisha Businesses",
    desc: "Cross-platform iOS & Android apps with native performance — helping Odisha businesses expand their reach and serve customers digitally.",
  },
  {
    icon: Bot,
    title: "AI & Automation Solutions",
    desc: "AI chatbots, voice callers, and intelligent workflow automation for hospitals, colleges, and enterprises across Odisha.",
  },
  {
    icon: Megaphone,
    title: "SEO Services in Bhubaneswar & Cuttack",
    desc: "Rank on Google and get local customers in Bhubaneswar, Cuttack, and all of Odisha with our proven SEO and Google review strategies.",
  },
  {
    icon: Palette,
    title: "Custom CRM for Odisha Enterprises",
    desc: "Tailored CRM systems for real estate firms, hospitals, CA offices, law firms, and NGOs in Odisha — built around your exact workflow.",
  },
  {
    icon: Play,
    title: "Experience Design & Branding",
    desc: "Premium UI/UX, brand identity, and motion graphics for Odisha businesses that want to stand out in their market.",
  },
];

const Location = () => {
  return (
    <Layout>
      <SEO
        title="Web Development Company in Odisha | Bhubaneswar & Cuttack | LogiSaar"
        description="LogiSaar is Odisha's trusted web development company. We build custom websites, CRM, e-commerce & AI tools for businesses in Bhubaneswar, Cuttack, Puri, Rourkela, Sambalpur and all of Odisha. Call +91 78150 14638."
        keywords="web development company Odisha, web design Bhubaneswar, web design Cuttack, website developer Puri, SEO Odisha, CRM development Odisha, mobile app development Odisha"
        canonical="https://logisaar.in/web-development-odisha"
        jsonLd={faqSchema}
      />

      {/* Hero */}
      <section className="min-h-[55vh] flex items-end relative overflow-hidden pb-16">
        <GradientMesh />
        <div className="container mx-auto px-4 relative z-10 pt-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-4"
          >
            📍 Proudly Odisha-Based
          </motion.p>
          <TextReveal
            text="Web Development Company"
            as="h1"
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95]"
            delay={0.2}
          />
          <TextReveal
            text="in Odisha"
            as="h1"
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gradient leading-[0.95] mt-2"
            delay={0.4}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-muted-foreground text-lg mt-6 max-w-2xl"
          >
            Premium websites, CRM systems, AI tools and SEO services for businesses in Bhubaneswar,
            Cuttack and all of Odisha.
          </motion.p>
        </div>
      </section>

      {/* Section 1 — Why Odisha Businesses Choose LogiSaar */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-8">
              Why Odisha Businesses{" "}
              <span className="text-gradient">Choose LogiSaar</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Businesses in Bhubaneswar, Cuttack, and across Odisha are rapidly moving online — and
                they need a reliable, professional, and affordable web development partner who understands
                the local market. LogiSaar is that partner.
              </p>
              <p>
                Founded in Odisha in September 2025, LogiSaar has already delivered 15+ projects for
                companies across industries including education, construction, fashion, F&amp;B, and B2B
                supply. Our clients range from growing startups in Cuttack to established businesses in
                Bhubaneswar seeking custom CRM systems and AI-driven automation.
              </p>
              <p>
                What sets us apart is our focus on real results — we don't just build beautiful websites,
                we build websites that rank on Google, convert visitors into customers, and help Odisha
                businesses compete at a national level. With transparent pricing starting from ₹2,999,
                no hidden charges, and delivery timelines that we actually honour, LogiSaar is the most
                trusted web development company in Odisha for serious businesses.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — Cities We Serve */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-3">Service Area</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Cities We Serve <span className="text-gradient">in Odisha</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cities.map((city, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="group rounded-2xl border border-border bg-card p-5 text-center hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <span className="text-2xl mb-2 block">📍</span>
                <h3 className="font-display font-bold text-sm">{city}</h3>
                <p className="text-muted-foreground text-xs mt-1">Web Development in {city}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Services for Odisha */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-3">What We Do</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Services for <span className="text-gradient">Odisha Businesses</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {odishaServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                  className="rounded-2xl border border-border bg-card p-7 group hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                    <Icon className="text-white" size={22} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4 — FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-display font-bold text-lg mb-2">{faq.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{faq.acceptedAnswer.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Get a <span className="text-gradient">Free Website Quote</span>
              <br />for Your Odisha Business
            </h2>
            <p className="text-muted-foreground">
              Talk to us today — no commitment, no pressure. Just honest advice on how to grow online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <MagneticButton strength={0.15}>
                <Button
                  asChild
                  size="lg"
                  className="group bg-green-500 hover:bg-green-600 border-0 text-white px-10 py-6 text-base rounded-full"
                >
                  <a
                    href="https://wa.me/917815014638?text=Hi%20LogiSaar%2C%20I%20want%20a%20free%20website%20quote%20for%20my%20Odisha%20business"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    WhatsApp Us Now
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.15}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="px-10 py-6 text-base rounded-full border-2 border-primary/20 hover:border-primary/50"
                >
                  <a href="tel:+917815014638">
                    <Phone size={18} className="mr-2" />
                    +91 78150 14638
                  </a>
                </Button>
              </MagneticButton>
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              Or{" "}
              <Link to="/contact" className="text-primary underline underline-offset-4">
                fill out our contact form
              </Link>{" "}
              and we'll reply within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Location;
