import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface JourneyTimelineProps {
  milestones: Milestone[];
}

const MilestonePanel = ({
  milestone,
  index,
  total,
  scrollYProgress,
}: {
  milestone: Milestone;
  index: number;
  total: number;
  scrollYProgress: any;
}) => {
  const segmentStart = index / total;
  const segmentEnd = (index + 1) / total;
  const mid = (segmentStart + segmentEnd) / 2;

  // Wider opacity windows so first/last panels are fully visible longer
  const fadeIn = Math.max(0, segmentStart - 0.02);
  const fadeOut = Math.min(1, segmentEnd + 0.02);

  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, segmentStart + 0.04, mid, segmentEnd - 0.04, fadeOut],
    [index === 0 ? 1 : 0.15, 1, 1, 1, index === total - 1 ? 1 : 0.15]
  );
  const y = useTransform(
    scrollYProgress,
    [fadeIn, segmentStart + 0.04, mid, fadeOut],
    [index === 0 ? 0 : 60, 0, 0, index === total - 1 ? 0 : -20]
  );

  const chapterNum = String(index + 1).padStart(2, "0");

  return (
    <div className="w-screen shrink-0 h-full relative flex items-center justify-center overflow-hidden px-16 md:px-24">
      {/* Colossal year watermark */}
      <span
        className="absolute top-1/2 right-4 md:right-16 -translate-y-1/2 font-bold text-[10rem] md:text-[18rem] leading-none select-none pointer-events-none"
        style={{
          opacity: 0.04,
          color: "white",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {milestone.year}
      </span>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-lg"
      >
        {/* Chapter indicator */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="font-mono text-sm tracking-widest"
            style={{ color: "hsl(170 80% 45% / 0.7)" }}
          >
            {chapterNum}
          </span>
          <div
            className="h-px w-12"
            style={{ background: "hsl(170 80% 45% / 0.3)" }}
          />
        </div>

        {/* Title */}
        <h3
          className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight"
          style={{ color: "white" }}
        >
          {milestone.title}
        </h3>

        {/* Year badge */}
        <span
          className="inline-block font-mono text-xs tracking-[0.2em] uppercase mb-6 px-3 py-1 rounded-full border"
          style={{
            color: "hsl(170 80% 45%)",
            borderColor: "hsl(170 80% 45% / 0.3)",
            background: "hsl(170 80% 45% / 0.08)",
          }}
        >
          {milestone.year}
        </span>

        {/* Description */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-md"
          style={{ color: "hsl(220 15% 65%)" }}
        >
          {milestone.description}
        </p>
      </motion.div>
    </div>
  );
};

// Floating particles that drift across the timeline
const FloatingParticles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 3,
    x: 10 + Math.random() * 80,
    y: 15 + Math.random() * 70,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 5,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `hsl(170 80% 45% / ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px hsl(170 80% 45% / ${p.opacity * 0.6})`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity * 1.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle horizontal connecting line */}
      <div
        className="absolute top-1/2 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(170 80% 45% / 0.08) 20%, hsl(210 90% 55% / 0.06) 50%, hsl(170 80% 45% / 0.08) 80%, transparent 100%)",
        }}
      />
      {/* Second connecting line slightly offset */}
      <div
        className="absolute top-[55%] left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 5%, hsl(260 70% 58% / 0.05) 30%, hsl(170 80% 45% / 0.04) 70%, transparent 95%)",
        }}
      />
    </div>
  );
};

const ProgressRail = ({
  scrollYProgress,
  total,
}: {
  scrollYProgress: any;
  total: number;
}) => {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[60%] max-w-2xl z-20">
      {/* Rail background */}
      <div className="relative h-[2px] w-full" style={{ background: "hsl(220 20% 20%)" }}>
        {/* Animated fill */}
        <motion.div
          className="absolute inset-y-0 left-0 origin-left"
          style={{
            scaleX: scrollYProgress,
            background: "linear-gradient(90deg, hsl(170 80% 45%), hsl(210 90% 55%))",
          }}
        />
      </div>

      {/* Dots */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between">
        {Array.from({ length: total }).map((_, i) => {
          const dotProgress = i / (total - 1);
          return <RailDot key={i} scrollYProgress={scrollYProgress} threshold={dotProgress} />;
        })}
      </div>
    </div>
  );
};

const RailDot = ({
  scrollYProgress,
  threshold,
}: {
  scrollYProgress: any;
  threshold: number;
}) => {
  const scale = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold, threshold + 0.05],
    [1, 1.8, 1]
  );
  const bg = useTransform(scrollYProgress, (v: number) =>
    v >= threshold - 0.02 ? "hsl(170 80% 45%)" : "hsl(220 20% 30%)"
  );
  const shadow = useTransform(scrollYProgress, (v: number) =>
    v >= threshold - 0.02
      ? "0 0 12px 2px hsl(170 80% 45% / 0.5)"
      : "none"
  );

  return (
    <motion.div
      className="w-2.5 h-2.5 rounded-full"
      style={{ scale, backgroundColor: bg, boxShadow: shadow }}
    />
  );
};

// Mobile card layout
const MobileTimeline = ({ milestones }: { milestones: Milestone[] }) => (
  <section className="py-20 relative" style={{ background: "hsl(220 30% 4%)" }}>
    <div className="px-6 mb-10">
      <p
        className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
        style={{ color: "hsl(170 80% 45% / 0.7)" }}
      >
        Timeline
      </p>
      <h2 className="font-display text-4xl font-bold" style={{ color: "white" }}>
        Our <span style={{ color: "hsl(170 80% 45%)" }}>Journey</span>
      </h2>
    </div>

    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 scrollbar-hide">
      {milestones.map((m, i) => (
        <div
          key={m.year}
          className="min-w-[85vw] snap-center rounded-2xl p-8 relative overflow-hidden shrink-0"
          style={{
            background: "hsl(220 25% 8%)",
            border: "1px solid hsl(220 20% 15%)",
          }}
        >
          {/* Year watermark */}
          <span
            className="absolute -top-4 -right-2 font-bold text-[8rem] leading-none select-none pointer-events-none"
            style={{ opacity: 0.05, color: "white" }}
          >
            {m.year}
          </span>

          <div className="relative z-10">
            <span
              className="font-mono text-xs tracking-widest block mb-4"
              style={{ color: "hsl(170 80% 45% / 0.6)" }}
            >
              {String(i + 1).padStart(2, "0")} /
            </span>
            <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "white" }}>
              {m.title}
            </h3>
            <span
              className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase mb-4 px-2 py-0.5 rounded-full border"
              style={{
                color: "hsl(170 80% 45%)",
                borderColor: "hsl(170 80% 45% / 0.25)",
                background: "hsl(170 80% 45% / 0.06)",
              }}
            >
              {m.year}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(220 15% 60%)" }}>
              {m.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const JourneyTimeline = ({ milestones }: JourneyTimelineProps) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(milestones.length - 1) * 25}%`]);

  if (isMobile) {
    return <MobileTimeline milestones={milestones} />;
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center"
        style={{ background: "hsl(220 30% 4%)" }}
      >
        <FloatingParticles />

        {/* Section heading - fixed left */}
        <div className="absolute top-12 left-12 md:left-20 z-20">
          <p
            className="font-mono text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: "hsl(170 80% 45% / 0.7)" }}
          >
            Timeline
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold" style={{ color: "white" }}>
            Our <span style={{ color: "hsl(170 80% 45%)" }}>Journey</span>
          </h2>
        </div>

        {/* Horizontal track */}
        <motion.div style={{ x }} className="flex h-full">
          {milestones.map((m, i) => (
            <MilestonePanel
              key={m.year}
              milestone={m}
              index={i}
              total={milestones.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Progress rail */}
        <ProgressRail scrollYProgress={scrollYProgress} total={milestones.length} />
      </div>
    </div>
  );
};

export default JourneyTimeline;
