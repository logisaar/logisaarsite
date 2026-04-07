import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import FloatingCodeSymbols from "@/components/FloatingCodeSymbols";
import TextReveal from "@/components/creative/TextReveal";
import MagneticButton from "@/components/creative/MagneticButton";
import AnimatedCounter from "@/components/creative/AnimatedCounter";
import HeroProjectCards from "@/components/home/HeroProjectCards";

const subtitles = [
  "Custom CRM & Business Software",
  "AI-Powered Web Solutions",
  "E-Commerce & Mobile Apps",
  "SEO & Google Growth",
];

const stats = [
  { value: 15, suffix: "+", label: "Projects Delivered" },
  { value: 8, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Industries Served" },
  { value: 99, suffix: "%", label: "Success Rate" },
];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = subtitles[subtitleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 60);
    } else if (!deleting && typed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 30);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setSubtitleIdx((prev) => (prev + 1) % subtitles.length);
    }

    return () => clearTimeout(timeout);
  }, [typed, deleting, subtitleIdx]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      
      <FloatingCodeSymbols />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 animated-grid pointer-events-none z-[1]" />

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          {/* Left side — 3 cols */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Main headline */}
            {/* Geo trust badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-4 py-1.5 rounded-full mb-6"
            >
              <span>📍</span>
              <span>Odisha-Based Studio | Serving All of India</span>
            </motion.div>

            <TextReveal
              text="Odisha's Premium"
              as="h1"
              className="font-display text-[10vw] md:text-[6vw] lg:text-[4.5vw] font-bold leading-[1.1] tracking-tight"
              delay={0.3}
            />
            <TextReveal
              text="Web Development Studio"
              as="h1"
              className="font-display text-[10vw] md:text-[6vw] lg:text-[4.5vw] font-bold leading-[1.1] tracking-tight text-gradient mb-6"
              delay={0.5}
            />

            {/* Typewriter subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="h-10 flex items-center justify-center lg:justify-start"
            >
              <span className="text-lg md:text-xl text-muted-foreground font-light">
                {typed}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="text-primary ml-0.5"
                >
                  |
                </motion.span>
              </span>
            </motion.div>

            {/* Geo subtext */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-sm text-muted-foreground/80 mt-3 mb-10"
            >
              Serving businesses in Bhubaneswar, Cuttack &amp; across Odisha — 15+ projects delivered
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-5 justify-center lg:justify-start"
            >
              <MagneticButton strength={0.2}>
                <Button asChild size="lg" className="group bg-gradient-primary hover:opacity-90 border-0 text-primary-foreground shadow-glow px-10 py-6 text-base">
                  <Link to="/portfolio">
                    View Our Work
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Button asChild variant="outline" size="lg" className="px-10 py-6 text-base border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5">
                  <Link to="/contact">Get a Quote</Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right side — 2 cols */}
          <div className="lg:col-span-2 overflow-visible">
            <HeroProjectCards dragConstraintsRef={heroRef} />
          </div>
        </div>

        {/* Stats bar — glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-24"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card text-center py-6 px-4">
              <p className="font-display text-4xl md:text-5xl font-bold text-gradient leading-none">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-muted-foreground text-xs mt-2 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 rounded-full bg-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
