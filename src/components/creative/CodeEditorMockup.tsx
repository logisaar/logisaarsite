import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const codeLines = [
  { indent: 0, text: "const app = createApp({", color: "hsl(170 80% 55%)" },
  { indent: 1, text: "name: 'LogiSaar',", color: "hsl(40 90% 65%)" },
  { indent: 1, text: "stack: ['React', 'Node', 'AI'],", color: "hsl(260 70% 70%)" },
  { indent: 1, text: "mission: 'Engineering Excellence',", color: "hsl(340 80% 65%)" },
  { indent: 1, text: "clients: 'worldwide',", color: "hsl(200 80% 65%)" },
  { indent: 0, text: "});", color: "hsl(170 80% 55%)" },
  { indent: 0, text: "", color: "transparent" },
  { indent: 0, text: "app.deploy({ scale: 'infinite' });", color: "hsl(120 60% 55%)" },
];

const CodeEditorMockup = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= codeLines.length) return prev;
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-lg mx-auto mt-8"
      style={{ perspective: 1000 }}
    >
      {/* Glow behind */}
      <div className="absolute -inset-4 bg-gradient-primary opacity-10 rounded-3xl blur-2xl" />

      <div className="relative rounded-xl overflow-hidden border border-border/50 bg-[hsl(220,20%,8%)] shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(220,20%,10%)] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[11px] text-white/30 ml-2 font-mono">logisaar.config.ts</span>
        </div>

        {/* Code */}
        <div className="p-5 font-mono text-sm leading-7 min-h-[240px]">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="flex"
            >
              <span className="text-white/15 w-6 text-right mr-4 select-none text-xs">{i + 1}</span>
              <span style={{ paddingLeft: `${line.indent * 20}px`, color: line.color }}>
                {line.text}
              </span>
            </motion.div>
          ))}
          {/* Blinking cursor */}
          <motion.span
            className="inline-block w-2 h-4 bg-primary/80 ml-10"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CodeEditorMockup;
