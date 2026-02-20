import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techs = [
  { name: "React", color: "hsl(195 100% 50%)", icon: "⚛" },
  { name: "Next.js", color: "hsl(0 0% 70%)", icon: "▲" },
  { name: "Vue.js", color: "hsl(153 47% 49%)", icon: "🟩" },
  { name: "Angular", color: "hsl(348 100% 50%)", icon: "🅰" },
  { name: "Node.js", color: "hsl(120 56% 46%)", icon: "⬢" },
  { name: "Python", color: "hsl(210 68% 46%)", icon: "🐍" },
  { name: "React Native", color: "hsl(195 100% 50%)", icon: "📱" },
  { name: "Flutter", color: "hsl(210 100% 56%)", icon: "🦋" },
  { name: "MongoDB", color: "hsl(120 61% 34%)", icon: "🍃" },
  { name: "PostgreSQL", color: "hsl(210 68% 46%)", icon: "🐘" },
  { name: "AWS", color: "hsl(30 100% 50%)", icon: "☁" },
  { name: "Firebase", color: "hsl(36 100% 50%)", icon: "🔥" },
  { name: "Docker", color: "hsl(210 100% 56%)", icon: "🐳" },
  { name: "TypeScript", color: "hsl(210 68% 46%)", icon: "TS" },
  { name: "Tailwind CSS", color: "hsl(195 85% 50%)", icon: "🌊" },
  { name: "GraphQL", color: "hsl(320 60% 50%)", icon: "◈" },
];

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 overflow-hidden relative" ref={ref}>
      {/* Diagonal stripe pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, hsl(var(--foreground)) 0, hsl(var(--foreground)) 1px, transparent 0, transparent 16px)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-4">Tech Stack</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Technologies We <span className="text-gradient">Master</span>
          </h2>
        </motion.div>
      </div>

      {/* Double row marquee with colored pills */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...techs, ...techs].map((tech, i) => (
              <span
                key={`a-${i}`}
                className="inline-flex items-center mx-2 px-6 py-3 rounded-full border bg-card text-sm font-medium cursor-default transition-all hover:scale-105"
                style={{ borderColor: `${tech.color}30`, borderLeftWidth: 3, borderLeftColor: tech.color }}
              >
                <span className="mr-2 text-base">{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </motion.div>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...techs.slice().reverse(), ...techs.slice().reverse()].map((tech, i) => (
              <span
                key={`b-${i}`}
                className="inline-flex items-center mx-2 px-6 py-3 rounded-full border bg-card text-sm font-medium cursor-default transition-all hover:scale-105"
                style={{ borderColor: `${tech.color}30`, borderLeftWidth: 3, borderLeftColor: tech.color }}
              >
                <span className="mr-2 text-base">{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
