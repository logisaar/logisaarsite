import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { prefersReducedMotion } from "@/lib/scroll";

const R = 20;
const C = 2 * Math.PI * R;

/** The one back-to-top control: floating bottom-left, with a scroll-progress ring. Instant under reduced motion. */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setVisible(window.scrollY > window.innerHeight);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
          style={{ left: "max(0.75rem, calc((100vw - 75rem) / 2 - 3.5rem))" }}
          className="fixed bottom-4 z-logi flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg ring-1 ring-white/15 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Back to top"
        >
          <svg viewBox="0 0 44 44" aria-hidden="true" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="22" cy="22" r={R} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
            <circle ref={ring} cx="22" cy="22" r={R} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} />
          </svg>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="relative h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
