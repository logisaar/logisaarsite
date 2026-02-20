import { motion } from "framer-motion";

const symbols = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", x: "5%", y: "12%", delay: 0, duration: 7, size: 48, opacity: [0.03, 0.08, 0.02, 0.07, 0.03] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", x: "82%", y: "8%", delay: 1.5, duration: 9, size: 40, opacity: [0.02, 0.07, 0.02, 0.06, 0.02] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", x: "60%", y: "75%", delay: 0.5, duration: 9, size: 36, opacity: [0.03, 0.08, 0.03, 0.07, 0.03] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", x: "10%", y: "45%", delay: 2.5, duration: 8.5, size: 40, opacity: [0.03, 0.08, 0.02, 0.07, 0.03] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", x: "38%", y: "5%", delay: 1.8, duration: 7, size: 36, opacity: [0.03, 0.07, 0.02, 0.06, 0.03] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", x: "70%", y: "50%", delay: 2.2, duration: 6, size: 40, opacity: [0.03, 0.09, 0.03, 0.08, 0.03] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", x: "50%", y: "38%", delay: 0.3, duration: 8, size: 48, opacity: [0.02, 0.06, 0.01, 0.05, 0.02] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", x: "90%", y: "65%", delay: 3.5, duration: 8, size: 36, opacity: [0.02, 0.07, 0.02, 0.06, 0.02] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", x: "25%", y: "78%", delay: 0.7, duration: 8, size: 40, opacity: [0.03, 0.08, 0.02, 0.07, 0.03] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", x: "48%", y: "88%", delay: 0.9, duration: 8.5, size: 44, opacity: [0.02, 0.07, 0.02, 0.06, 0.02] },
];

const FloatingCodeSymbols = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {symbols.map((s, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{ left: s.x, top: s.y, filter: "grayscale(1)" }}
          animate={{
            y: [0, -30, -15, -40, 0],
            rotate: [0, 5, -3, 3, 0],
            opacity: s.opacity,
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          <img src={s.icon} alt="" width={s.size} height={s.size} loading="lazy" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCodeSymbols;
