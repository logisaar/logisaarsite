import { motion } from "framer-motion";
import { Compass, LayoutGrid, Rocket } from "lucide-react";
import capAsset from "@/assets/chalk to choice asset cap.webp";

/* ─── Ripple keyframes injected once ─── */
const rippleCSS = `
@keyframes chalk-ripple {
  0% { transform: translate(-50%,-50%) scale(0.35); opacity: 0.55; }
  100% { transform: translate(-50%,-50%) scale(1); opacity: 0; }
}
@keyframes chalk-float {
  0%, 100% { transform: translateY(0px) rotate(-8deg); }
  50% { transform: translateY(-10px) rotate(-8deg); }
}
@keyframes chalk-orbit-pulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.45; }
}

@keyframes orbit-revolve-0 {
  0% { transform: rotate(240deg); }
  100% { transform: rotate(600deg); }
}
@keyframes card-counter-0 {
  0% { transform: rotate(-240deg); }
  100% { transform: rotate(-600deg); }
}

@keyframes orbit-revolve-1 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes card-counter-1 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@keyframes orbit-revolve-2 {
  0% { transform: rotate(120deg); }
  100% { transform: rotate(480deg); }
}
@keyframes card-counter-2 {
  0% { transform: rotate(-120deg); }
  100% { transform: rotate(-480deg); }
}

.group-orbit:hover,
.group-orbit:hover * {
  animation-play-state: paused !important;
}
`;

/* Info cards positioned around the orbit */
const ORBIT_CARDS = [
  {
    icon: Compass,
    title: "Guidance",
    desc: "Discover your strengths and career paths.",
    delay: 0.1,
  },
  {
    icon: LayoutGrid,
    title: "Exposure",
    desc: "Industry visits, expert sessions & real-world insights.",
    delay: 0.25,
  },
  {
    icon: Rocket,
    title: "Empowerment",
    desc: "Build skills, confidence and a future-ready mind.",
    delay: 0.4,
  },
];

const ChalkToChoiceAsset = () => {
  return (
    <>
      {/* Inject keyframes */}
      <style>{rippleCSS}</style>

      <div className="relative w-full max-w-[32.5rem] aspect-square mx-auto select-none">

        {/* ── Circular orbit line ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 520 520"
          fill="none"
          style={{ animation: "chalk-orbit-pulse 4s ease-in-out infinite" }}
        >
          <circle cx="260" cy="260" r="210" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.3" />
          <circle cx="260" cy="260" r="145" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 8" opacity="0.15" />
        </svg>

        {/* ── Water ripple rings ── */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/30 pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              width: "320px",
              height: "320px",
              animation: `chalk-ripple 3.2s ${i * 0.8}s cubic-bezier(0.22, 0.61, 0.36, 1) infinite`,
            }}
          />
        ))}

        {/* ── Ground reflection ellipse ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "50%",
            top: "52%",
            transform: "translateX(-50%)",
            width: "250px",
            height: "28px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />

        {/* ── Graduation Cap Image ── */}
        <div
          className="absolute pointer-events-none"
          style={{ left: "50%", top: "45%", transform: "translate(-50%, -50%)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.15 }}
            style={{ animation: "chalk-float 4s ease-in-out infinite" }}
          >
            <img
              src={capAsset}
              alt="Graduation cap"
              className="w-[15.3125rem] h-auto drop-shadow-2xl"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* ── 3 orbit info cards ── */}
        {ORBIT_CARDS.map(({ icon: Icon, title, desc, delay }, index) => (
          <div
            key={title}
            className="absolute left-1/2 top-1/2 w-0 h-0 group-orbit z-20"
            style={{
              animation: `orbit-revolve-${index} 55s linear infinite`,
            }}
          >
            {/* Connecting dot on the orbit line */}
            <div
              className="absolute w-2.5 h-2.5 rounded-full bg-primary border-2 border-white dark:border-slate-950 shadow-sm"
              style={{
                transform: "translate(210px, -50%)",
              }}
            />
            
            {/* Card wrapper (shifted by radius) */}
            <div
              className="absolute w-[10.625rem]"
              style={{
                transform: "translate(210px, -50%)",
                marginLeft: "8px",
              }}
            >
              {/* Inner card with counter-rotation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay }}
                style={{
                  animation: `card-counter-${index} 55s linear infinite`,
                }}
              >
                <div className="liquid-glass rounded-2xl p-3.5 border border-primary/15 shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer">
                  {/* Icon badge */}
                  <div className="w-9 h-9 rounded-xl bg-primary/12 border border-primary/20 grid place-items-center mb-2.5 group-hover:bg-primary/20 transition-colors shrink-0">
                    <Icon size={16} className="text-primary-ink block shrink-0" />
                  </div>
                  <div className="text-sm font-bold text-foreground leading-tight">{title}</div>
                  <div className="text-label text-muted-foreground mt-1 leading-snug">{desc}</div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChalkToChoiceAsset;
