import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";

const testimonialColors = [
  "hsl(170 80% 45%)",
  "hsl(260 70% 58%)",
  "hsl(220 80% 50%)",
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-secondary/30 relative overflow-hidden" ref={ref}>
      {/* Decorative quote marks */}
      <svg className="absolute top-20 left-10 opacity-[0.04]" width="200" height="200" viewBox="0 0 100 100">
        <text x="0" y="80" fontSize="120" fontFamily="Georgia, serif" fill="hsl(170 80% 45%)">
          "
        </text>
      </svg>
      <svg className="absolute bottom-20 right-10 opacity-[0.04] rotate-180" width="200" height="200" viewBox="0 0 100 100">
        <text x="0" y="80" fontSize="120" fontFamily="Georgia, serif" fill="hsl(260 70% 58%)">
          "
        </text>
      </svg>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-4">Testimonials</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            What Clients <span className="text-gradient">Say</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative h-[440px] md:h-[320px]">
          <AnimatePresence mode="popLayout">
            {testimonials.map((t, i) => {
              const offset = (i - active + testimonials.length) % testimonials.length;
              if (offset > 2) return null;
              const color = testimonialColors[i % testimonialColors.length];

              return (
                <motion.div
                  key={t.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{
                    opacity: offset === 0 ? 1 : 0.4 - offset * 0.15,
                    scale: 1 - offset * 0.05,
                    y: offset * 20,
                    zIndex: 10 - offset,
                  }}
                  exit={{ opacity: 0, scale: 0.85, y: -50 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute inset-0 bg-card border rounded-2xl p-6 md:p-12 cursor-pointer"
                  style={{ borderColor: `${color}25`, borderLeftWidth: 4, borderLeftColor: color }}
                  onClick={() => setActive((active + 1) % testimonials.length)}
                >
                  {/* Large colored quote */}
                  <svg className="mb-4" width="48" height="48" viewBox="0 0 48 48">
                    <text x="0" y="42" fontSize="56" fontFamily="Georgia, serif" fill={color} opacity="0.3">
                      "
                    </text>
                  </svg>

                  <p className="text-foreground text-base md:text-xl leading-relaxed mb-6 font-light">
                    "{t.content}"
                  </p>

                  {/* Star rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={16} fill={color} stroke={color} />
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-muted-foreground text-sm">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === active ? "bg-primary w-6" : "bg-primary/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
