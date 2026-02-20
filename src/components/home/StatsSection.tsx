import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 8, suffix: "+", label: "Enterprise Projects" },
  { value: 4, suffix: "+", label: "Global Partners" },
  { value: 2, suffix: "+", label: "Years Innovation" },
  { value: 99, suffix: "%", label: "Success Rate" },
];

const StatItem = ({ value, suffix, label, inView, delay }: { value: number; suffix: string; label: string; inView: boolean; delay: number }) => {
  const count = useCountUp(value, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay }}
      className="text-center"
    >
      <p className="font-display text-4xl md:text-5xl font-bold text-gradient">
        {count}{suffix}
      </p>
      <p className="text-muted-foreground text-sm mt-2">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} inView={isInView} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
