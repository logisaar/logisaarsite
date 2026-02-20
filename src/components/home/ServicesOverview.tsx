import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { services } from "@/data/services";
import DecorativeShapes from "@/components/creative/DecorativeShapes";

const cardColors = [
  { bg: "hsl(170 80% 45% / 0.06)", border: "hsl(170 80% 45% / 0.2)", icon: "hsl(170 80% 45%)" },
  { bg: "hsl(220 80% 50% / 0.06)", border: "hsl(220 80% 50% / 0.2)", icon: "hsl(220 80% 50%)" },
  { bg: "hsl(260 70% 58% / 0.06)", border: "hsl(260 70% 58% / 0.2)", icon: "hsl(260 70% 58%)" },
  { bg: "hsl(30 90% 55% / 0.06)", border: "hsl(30 90% 55% / 0.2)", icon: "hsl(30 90% 55%)" },
  { bg: "hsl(340 80% 55% / 0.06)", border: "hsl(340 80% 55% / 0.2)", icon: "hsl(340 80% 55%)" },
  { bg: "hsl(200 80% 50% / 0.06)", border: "hsl(200 80% 50% / 0.2)", icon: "hsl(200 80% 50%)" },
];

const cardSvgs = [
  // Web - browser window
  <svg key="web" viewBox="0 0 120 100" className="w-full h-full" opacity="0.08"><rect x="10" y="10" width="100" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="10" y1="30" x2="110" y2="30" stroke="currentColor" strokeWidth="2"/><circle cx="25" cy="20" r="4" fill="currentColor"/><circle cx="40" cy="20" r="4" fill="currentColor"/><circle cx="55" cy="20" r="4" fill="currentColor"/><rect x="20" y="40" width="80" height="6" rx="3" fill="currentColor" opacity="0.5"/><rect x="20" y="55" width="50" height="6" rx="3" fill="currentColor" opacity="0.3"/><rect x="20" y="70" width="65" height="6" rx="3" fill="currentColor" opacity="0.2"/></svg>,
  // Mobile - phone
  <svg key="mobile" viewBox="0 0 80 120" className="w-full h-full" opacity="0.08"><rect x="10" y="5" width="60" height="110" rx="12" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="40" cy="105" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/><rect x="25" y="12" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.4"/><rect x="16" y="25" width="48" height="70" rx="2" fill="currentColor" opacity="0.05"/></svg>,
  // AI - brain/network
  <svg key="ai" viewBox="0 0 120 120" className="w-full h-full" opacity="0.08"><circle cx="60" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="30" cy="70" r="8" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="90" cy="70" r="8" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="60" cy="100" r="8" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="60" y1="38" x2="35" y2="64" stroke="currentColor" strokeWidth="1.5"/><line x1="60" y1="38" x2="85" y2="64" stroke="currentColor" strokeWidth="1.5"/><line x1="35" y1="76" x2="55" y2="95" stroke="currentColor" strokeWidth="1.5"/><line x1="85" y1="76" x2="65" y2="95" stroke="currentColor" strokeWidth="1.5"/></svg>,
  // Growth - chart
  <svg key="growth" viewBox="0 0 120 100" className="w-full h-full" opacity="0.08"><polyline points="10,80 40,50 65,65 110,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="110" cy="20" r="5" fill="currentColor" opacity="0.3"/><line x1="10" y1="90" x2="110" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.3"/></svg>,
  // Design - pen tool
  <svg key="design" viewBox="0 0 100 100" className="w-full h-full" opacity="0.08"><path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.3"/></svg>,
  // Motion - play
  <svg key="motion" viewBox="0 0 100 100" className="w-full h-full" opacity="0.08"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/><polygon points="40,30 40,70 75,50" fill="currentColor" opacity="0.3"/></svg>,
];

const getGridClass = (i: number, total: number) => {
  if (i === 0) return "md:col-span-2 md:row-span-1";
  if (i === total - 1) return "md:col-span-2";
  return "";
};

const ServicesOverview = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      <DecorativeShapes variant="section" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-[0.2em] mb-4">What We Do</p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] -ml-1">
            Our{" "}
            <span className="text-gradient">Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            const colors = cardColors[i] || cardColors[0];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={isInView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
                className={`group relative rounded-2xl p-8 md:p-10 border overflow-hidden cursor-default ${getGridClass(i, services.length)}`}
                style={{
                  backgroundColor: colors.bg,
                  borderColor: colors.border,
                }}
              >
                {/* Large background SVG */}
                <div className="absolute -right-4 -bottom-4 w-32 h-32 md:w-48 md:h-48" style={{ color: colors.icon }}>
                  {cardSvgs[i]}
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${colors.bg}, transparent 70%)` }}
                />

                {/* Gradient border on top */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                  style={{ background: `linear-gradient(90deg, ${colors.icon}, transparent)` }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: `linear-gradient(135deg, ${colors.icon}, ${colors.icon}dd)` }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="text-white" size={26} />
                  </motion.div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{service.description}</p>

                  {(i === 0 || i === services.length - 1) && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {service.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs px-3 py-1.5 rounded-full font-medium"
                          style={{
                            background: `${colors.icon}15`,
                            color: colors.icon,
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
