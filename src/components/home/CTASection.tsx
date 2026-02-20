import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/creative/MagneticButton";
import NoiseTexture from "@/components/creative/NoiseTexture";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-primary"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent_60%)]" />
      
      {/* Noise texture */}
      <NoiseTexture opacity={0.05} />

      {/* Floating shapes */}
      <motion.div
        className="absolute w-32 h-32 rounded-full border-2 border-white/10"
        style={{ top: "15%", left: "8%" }}
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-20 h-20 rounded-lg border-2 border-white/10"
        style={{ bottom: "20%", right: "12%" }}
        animate={{ y: [0, 15, 0], rotate: [0, -90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-16 h-16"
        style={{ top: "60%", left: "15%" }}
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 60 60" fill="none">
          <polygon points="30,5 55,50 5,50" stroke="white" strokeWidth="1.5" opacity="0.1" />
        </svg>
      </motion.div>

      {/* Glowing orbs */}
      <div className="absolute w-40 h-40 rounded-full bg-white/5 blur-3xl" style={{ top: "10%", right: "20%" }} />
      <div className="absolute w-32 h-32 rounded-full bg-white/5 blur-3xl" style={{ bottom: "15%", left: "25%" }} />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-[0.95]"
        >
          Ready to Build
          <br />
          Something{" "}
          <span className="italic font-light">Extraordinary</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white/70 max-w-lg mx-auto mb-12 text-lg"
        >
          Let's discuss how we can help you build something amazing.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        >
          <MagneticButton strength={0.15}>
            <Button asChild size="lg" className="group bg-white text-foreground hover:bg-white/90 border-0 px-10 py-6 text-base shadow-2xl">
              <Link to="/contact">
                Start a Project
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
