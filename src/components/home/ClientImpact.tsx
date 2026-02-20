import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/creative/AnimatedCounter";
import { TrendingUp, Users, Zap, Clock } from "lucide-react";

const impacts = [
  {
    value: 300, suffix: "%", label: "Average ROI",
    gradient: "from-emerald-500 to-teal-400",
    border: "border-t-emerald-500",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    icon: TrendingUp,
  },
  {
    value: 50, suffix: "+", label: "Projects Delivered",
    gradient: "from-cyan-500 to-blue-400",
    border: "border-t-cyan-500",
    bg: "bg-cyan-50",
    iconBg: "bg-cyan-100",
    icon: Users,
  },
  {
    value: 99, suffix: "%", label: "Client Satisfaction",
    gradient: "from-violet-500 to-purple-400",
    border: "border-t-violet-500",
    bg: "bg-violet-50",
    iconBg: "bg-violet-100",
    icon: Zap,
  },
  {
    value: 50, suffix: "%", label: "Faster Delivery",
    gradient: "from-amber-500 to-orange-400",
    border: "border-t-amber-500",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    icon: Clock,
  },
];

const ClientImpact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-32 relative overflow-hidden bg-background" ref={ref}>
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-10 right-[10%] w-32 h-32 rounded-full border-2 border-emerald-200/30"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 left-[5%] w-20 h-20 rounded-full bg-violet-200/20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-[15%] w-10 h-10 rotate-45 border-2 border-amber-200/25"
        animate={{ rotate: [45, 225, 45] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 left-[40%] w-6 h-6 rounded-full bg-cyan-300/20"
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-emerald-600 font-medium text-xs uppercase tracking-[0.2em] mb-4">
            Impact
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">
            Client <span className="text-gradient">Impact</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {impacts.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative rounded-2xl border-t-4 ${item.border} bg-card shadow-lg border border-border/50 p-8 text-center group hover:shadow-xl transition-shadow duration-300`}
              >
                {/* Corner icon */}
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity`}>
                  <Icon size={14} className="text-foreground/60" />
                </div>

                {/* Large gradient number */}
                <p className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-none bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent`}>
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </p>

                {/* Accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                  className={`w-10 h-[2px] bg-gradient-to-r ${item.gradient} mx-auto mt-4 mb-3 origin-left`}
                />

                <p className="text-muted-foreground text-xs uppercase tracking-[0.15em]">
                  {item.label}
                </p>

                {/* Subtle background tint on hover */}
                <div className={`absolute inset-0 rounded-2xl ${item.bg} opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClientImpact;
