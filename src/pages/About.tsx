import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Users, Target, Lightbulb, Shield } from "lucide-react";
import GradientMesh from "@/components/creative/GradientMesh";
import MarqueeText from "@/components/creative/MarqueeText";
import DecorativeShapes from "@/components/creative/DecorativeShapes";
import aboutTeam from "@/assets/about-team.jpg";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import TeamSection from "@/components/about/TeamSection";
import ValueCard from "@/components/about/ValueCard";
import SEO from "@/components/SEO";

const values = [
  { icon: Lightbulb, title: "Innovation First", description: "We stay ahead of tech trends to deliver cutting-edge solutions that push boundaries and redefine what's possible.", color: "hsl(170 80% 45%)", tagline: "ALWAYS AHEAD →", size: "large" as const },
  { icon: Target, title: "Result-Driven", description: "Every project is built around measurable business outcomes.", color: "hsl(260 70% 58%)", tagline: "100% ROI FOCUS", size: "normal" as const },
  { icon: Users, title: "Client-Centric", description: "Your vision drives everything we build. Full transparency, always.", color: "hsl(220 80% 50%)", tagline: "YOUR VISION FIRST", size: "normal" as const },
  { icon: Shield, title: "Quality Assured", description: "Rigorous testing and best practices ensure reliable, scalable products that stand the test of time.", color: "hsl(30 90% 55%)", tagline: "ZERO COMPROMISES", size: "wide" as const },
];

const milestones = [
  { year: "Sep 2025", title: "Founded", description: "Logisaar was born with a vision to build intelligent, future-ready digital solutions." },
  { year: "Nov 2025", title: "10+ Projects Delivered", description: "Delivered 10+ projects in just two months across web, software, and automation." },
  { year: "2025", title: "TECHXERA Launched", description: "Launched TECHXERA in Nalanda as a programming club bridging academics and industry." },
  { year: "2026", title: "Growing Impact", description: "Expanding globally while nurturing the next generation of technology leaders." },
];

const letterColors = [
  "hsl(170, 80%, 45%)", // L
  "hsl(210, 90%, 55%)", // o
  "hsl(260, 70%, 58%)", // g
  "hsl(30, 90%, 55%)",  // i
  "hsl(330, 80%, 55%)", // S
  "hsl(140, 70%, 45%)", // a
  "hsl(190, 85%, 50%)", // a
  "hsl(0, 80%, 55%)",   // r
];

const InteractiveTitle = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const letters = "LogiSaar".split("");

  return (
    <div className="mb-4 cursor-default">
      <motion.p
        className="font-display text-xl md:text-3xl font-bold text-muted-foreground mb-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        We are
      </motion.p>
      <h1 className="font-display text-6xl md:text-[10rem] font-bold leading-[0.9]">
        {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          onPointerEnter={() => setHoveredIndex(i)}
          onPointerLeave={() => setHoveredIndex(null)}
          style={{
            color: hoveredIndex === i ? letterColors[i] : undefined,
            transition: "color 0.15s ease-out",
          }}
          whileHover={{ scale: 1.1, y: -8, transition: { type: "spring", stiffness: 400, damping: 15 } }}
        >
          {letter}
        </motion.span>
      ))}
      </h1>
    </div>
  );
};

const About = () => {
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  return (
    <Layout>
      <SEO
        title="About LogiSaar | Web Development Agency in Odisha"
        description="LogiSaar was founded in 2025 by Chinmay Kumar Panda in Odisha. 15+ projects delivered. Building custom software for businesses across Bhubaneswar, Cuttack, and all of Odisha."
        keywords="about LogiSaar, web development agency Odisha, Chinmay Kumar Panda, software company Bhubaneswar, IT company Cuttack, LogiSaar team"
        canonical="https://www.logisaar.in/about"
      />
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center relative overflow-hidden">
        <GradientMesh />
        <DecorativeShapes variant="hero" />
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-6"
            >
              About Us
            </motion.p>
            <InteractiveTitle />
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-xl"
            >
              Logisaar was founded in September 2025 with a clear vision — to build intelligent, reliable, and future-ready digital solutions that empower businesses and individuals to grow in a technology-driven world.
            </motion.p>
          </div>
        </div>
      </section>

      <MarqueeText text="INNOVATION  ·  QUALITY  ·  EXCELLENCE  ·  PARTNERSHIP  ·  " />

      {/* Story - with isometric illustration */}
      <section className="py-32 relative overflow-hidden" ref={storyRef}>
        <DecorativeShapes variant="section" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              {["LogiSaar is co-founded by Chinmay Kumar Panda and Biswanatha — two Computer Science engineers and full-stack developers based in Odisha. Together, they started LogiSaar in September 2025 with a mission to bring enterprise-quality software to businesses across Odisha. Their combined expertise spans React, Next.js, AI systems, mobile development, and digital growth strategy.",
                "We are proudly Odisha-based and have served clients in Bhubaneswar, Cuttack, Nalanda, and beyond. Our mission is to make premium digital products accessible to every serious business in Odisha.",
                "In a remarkably short span of time, Logisaar successfully delivered 15+ projects within the first few months, demonstrating our strong execution capability, client-first approach, and commitment to quality. Our projects span across web development, software solutions, automation, and digital platforms, helping organizations streamline operations and enhance their online presence.",
                "Beyond commercial software development, Logisaar has also expanded into the education and skill-development sector through its dedicated sub-brand TECHXERA. TECHXERA was first launched in Nalanda as a programming club with the mission to bridge the gap between academic learning and real-world industry requirements.",
                "At Logisaar, we believe in continuous innovation, ethical practices, and long-term partnerships. Our goal is not just to deliver software, but to create impact-driven digital experiences and nurture the next generation of technology leaders.",
                "Let's build the future — together."
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {text}
                </motion.p>
              ))}
            </div>
            {/* Isometric illustration of devices */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={storyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-square rounded-3xl relative overflow-hidden group border border-border/30 shadow-2xl"
            >
              <img
                src={aboutTeam}
                alt="Our team collaborating"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-primary/10" />
              {/* Decorative accent shapes */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-primary/20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-16 h-16 rounded-xl border-2 border-primary/15 rotate-45"
                animate={{ rotate: [45, 405] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <JourneyTimeline milestones={milestones} />

      {/* Team */}
      <TeamSection />

      {/* Values - with unique colors */}
      <section className="py-32 relative overflow-hidden" ref={valuesRef}>
        {/* Animated dot grid background */}
        <div className="absolute inset-0 animated-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-20"
          >
            <p className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-4">Our Values</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              What <span className="text-gradient">Drives</span> Us
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <ValueCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                description={v.description}
                tagline={v.tagline}
                color={v.color}
                size={v.size}
                index={i}
                isInView={valuesInView}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
