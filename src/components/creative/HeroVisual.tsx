import { motion } from "framer-motion";
import swosti from "@/assets/projects/swosti.png";
import nalanda from "@/assets/projects/nalanda.png";
import sakosales from "@/assets/projects/sakosales.png";

const floatingCards = [
  { img: swosti, label: "Swosti Premium", delay: 0, x: 0, y: 0, rotate: -3, scale: 1 },
  { img: nalanda, label: "Nalanda ERP", delay: 0.2, x: 40, y: -30, rotate: 4, scale: 0.9 },
  { img: sakosales, label: "SakoSales CRM", delay: 0.4, x: -20, y: 50, rotate: -2, scale: 0.85 },
];

const HeroVisual = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-primary opacity-[0.08] rounded-full blur-3xl scale-110" />

      {/* Floating project cards */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 + card.delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute"
          style={{
            transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rotate}deg) scale(${card.scale})`,
            zIndex: 3 - i,
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            className="rounded-xl overflow-hidden border border-border/30 bg-card shadow-2xl shadow-primary/5"
          >
            <div className="w-64 md:w-72">
              <img
                src={card.img}
                alt={card.label}
                className="w-full h-40 md:h-44 object-cover object-top"
              />
              <div className="px-4 py-3 bg-card">
                <p className="text-xs font-semibold text-foreground">{card.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Live Project</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Decorative floating badges */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 right-0 z-10 px-4 py-2 rounded-full bg-card border border-border/40 shadow-lg"
      >
        <span className="text-xs font-semibold text-primary">99% Success Rate</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-2 left-4 z-10 px-4 py-2 rounded-full bg-card border border-border/40 shadow-lg"
      >
        <span className="text-xs font-semibold text-accent">8+ Projects Delivered</span>
      </motion.div>
    </motion.div>
  );
};

export default HeroVisual;
