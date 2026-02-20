import { motion } from "framer-motion";

interface MarqueeTextProps {
  text: string;
  reverse?: boolean;
  className?: string;
}

const MarqueeText = ({ text, reverse = false, className = "" }: MarqueeTextProps) => {
  const items = Array(4).fill(text);

  return (
    <div className={`overflow-hidden py-8 select-none ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "-25%"] : ["-25%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {items.map((t, i) => (
          <span
            key={i}
            className="font-display text-[6vw] md:text-[4vw] font-bold uppercase tracking-wider mx-8"
            style={{
              WebkitTextStroke: "1.5px hsl(var(--primary))",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeText;
