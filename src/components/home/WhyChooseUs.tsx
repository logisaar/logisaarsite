import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Headphones, Clock, Award, Heart } from "lucide-react";
import DecorativeShapes from "@/components/creative/DecorativeShapes";

const featureColors = [
  "hsl(170 80% 45%)",
  "hsl(220 80% 50%)",
  "hsl(260 70% 58%)",
  "hsl(30 90% 55%)",
  "hsl(340 80% 55%)",
  "hsl(120 60% 45%)",
];

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Rapid development cycles with agile methodology and modern tooling." },
  { icon: Shield, title: "Security First", description: "Enterprise-grade security baked into every layer of your application." },
  { icon: Headphones, title: "Dedicated Support", description: "24/7 support with a dedicated account manager for your project." },
  { icon: Clock, title: "On-Time Delivery", description: "We respect deadlines and deliver projects on schedule, every time." },
  { icon: Award, title: "Award-Winning Quality", description: "Pixel-perfect designs and clean code that sets industry standards." },
  { icon: Heart, title: "100% Satisfaction", description: "We're not done until you're thrilled with the results." },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      <DecorativeShapes variant="section" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-4">Why Us</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
            Why Choose <span className="text-gradient">LogiSaar</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            const color = featureColors[i];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
                animate={isInView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="group relative rounded-2xl p-8 border overflow-hidden"
                style={{
                  backgroundColor: `${color}08`,
                  borderColor: `${color}20`,
                }}
              >
                {/* Watermark number */}
                <span
                  className="absolute -right-2 -top-4 font-display text-[100px] font-bold leading-none select-none pointer-events-none"
                  style={{ color: `${color}08` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: color }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${color}10, transparent 70%)` }}
                />

                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon className="text-white" size={24} />
                </motion.div>
                <h3 className="font-display text-lg font-bold mb-2 relative z-10">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
