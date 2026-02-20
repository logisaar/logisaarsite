import { motion } from "framer-motion";

interface DecorativeShapesProps {
  variant?: "hero" | "section" | "footer";
}

const DecorativeShapes = ({ variant = "section" }: DecorativeShapesProps) => {
  const shapes = variant === "hero" ? heroShapes : variant === "footer" ? footerShapes : sectionShapes;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: shape.top, left: shape.left, right: shape.right, bottom: shape.bottom }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: shape.opacity, scale: 1 }}
          transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
        >
          <motion.div
            animate={shape.animate}
            transition={{ duration: shape.duration || 20, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          >
            {shape.type === "circle" && (
              <div
                className="rounded-full"
                style={{
                  width: shape.size,
                  height: shape.size,
                  background: shape.gradient,
                  filter: `blur(${shape.blur || 0}px)`,
                }}
              />
            )}
            {shape.type === "ring" && (
              <div
                className="rounded-full border-2"
                style={{
                  width: shape.size,
                  height: shape.size,
                  borderColor: shape.color,
                }}
              />
            )}
            {shape.type === "triangle" && (
              <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
                <polygon
                  points="50,10 90,90 10,90"
                  fill="none"
                  stroke={shape.color}
                  strokeWidth="2"
                  opacity="0.6"
                />
              </svg>
            )}
            {shape.type === "cross" && (
              <svg width={shape.size} height={shape.size} viewBox="0 0 40 40">
                <line x1="0" y1="20" x2="40" y2="20" stroke={shape.color} strokeWidth="2" />
                <line x1="20" y1="0" x2="20" y2="40" stroke={shape.color} strokeWidth="2" />
              </svg>
            )}
            {shape.type === "dots" && (
              <svg width={shape.size} height={shape.size} viewBox="0 0 60 60">
                {[0, 20, 40].map(x =>
                  [0, 20, 40].map(y => (
                    <circle key={`${x}-${y}`} cx={x + 10} cy={y + 10} r="3" fill={shape.color} />
                  ))
                )}
              </svg>
            )}
            {shape.type === "squiggle" && (
              <svg width={shape.size} height={Number(shape.size) / 3} viewBox="0 0 120 40" fill="none">
                <path
                  d="M0 20 Q15 0 30 20 Q45 40 60 20 Q75 0 90 20 Q105 40 120 20"
                  stroke={shape.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {shape.type === "hexagon" && (
              <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
                <polygon
                  points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                  fill="none"
                  stroke={shape.color}
                  strokeWidth="2"
                />
              </svg>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const heroShapes = [
  {
    type: "circle" as const, top: "10%", left: "-5%", size: 300, opacity: 0.15,
    gradient: "radial-gradient(circle, hsl(170 80% 45%), transparent 70%)",
    blur: 60, animate: { y: [0, -30, 0], x: [0, 20, 0] }, duration: 15,
  },
  {
    type: "circle" as const, top: "60%", right: "-8%", left: undefined, size: 250, opacity: 0.12,
    gradient: "radial-gradient(circle, hsl(260 70% 58%), transparent 70%)",
    blur: 50, animate: { y: [0, 40, 0], x: [0, -20, 0] }, duration: 18,
  },
  {
    type: "triangle" as const, top: "15%", right: "15%", left: undefined, size: 80, opacity: 0.2,
    color: "hsl(170 80% 45%)", animate: { rotate: [0, 360] }, duration: 30,
  },
  {
    type: "cross" as const, top: "70%", left: "10%", size: 40, opacity: 0.15,
    color: "hsl(260 70% 58%)", animate: { rotate: [0, 180, 0] }, duration: 12,
  },
  {
    type: "ring" as const, top: "30%", right: "5%", left: undefined, size: 120, opacity: 0.1,
    color: "hsl(220 80% 50% / 0.3)", animate: { scale: [1, 1.2, 1] }, duration: 10,
  },
  {
    type: "dots" as const, top: "80%", right: "25%", left: undefined, size: 60, opacity: 0.15,
    color: "hsl(170 80% 45% / 0.4)", animate: { y: [0, -10, 0] }, duration: 8,
  },
  {
    type: "squiggle" as const, top: "45%", left: "3%", size: 120, opacity: 0.12,
    color: "hsl(260 70% 58% / 0.5)", animate: { x: [0, 15, 0] }, duration: 14,
  },
];

const sectionShapes = [
  {
    type: "circle" as const, top: "5%", right: "-3%", left: undefined, size: 200, opacity: 0.08,
    gradient: "radial-gradient(circle, hsl(170 80% 45%), transparent 70%)",
    blur: 40, animate: { y: [0, -20, 0] }, duration: 20,
  },
  {
    type: "triangle" as const, bottom: "10%", left: "5%", top: undefined, size: 60, opacity: 0.1,
    color: "hsl(260 70% 58%)", animate: { rotate: [0, 360] }, duration: 25,
  },
  {
    type: "cross" as const, top: "20%", left: "8%", size: 30, opacity: 0.1,
    color: "hsl(170 80% 45%)", animate: { rotate: [0, 90, 0] }, duration: 15,
  },
  {
    type: "dots" as const, top: "60%", right: "8%", left: undefined, size: 50, opacity: 0.1,
    color: "hsl(220 80% 50% / 0.3)", animate: { y: [0, -8, 0] }, duration: 10,
  },
];

const footerShapes = [
  {
    type: "hexagon" as const, top: "10%", right: "5%", left: undefined, size: 100, opacity: 0.05,
    color: "hsl(170 80% 45% / 0.3)", animate: { rotate: [0, 60, 0] }, duration: 20,
  },
  {
    type: "circle" as const, bottom: "20%", left: "10%", top: undefined, size: 150, opacity: 0.04,
    gradient: "radial-gradient(circle, hsl(260 70% 58%), transparent 70%)",
    blur: 30, animate: { scale: [1, 1.1, 1] }, duration: 15,
  },
  {
    type: "ring" as const, top: "40%", right: "20%", left: undefined, size: 80, opacity: 0.05,
    color: "hsl(220 80% 50% / 0.2)", animate: { scale: [1, 1.3, 1] }, duration: 12,
  },
];

export default DecorativeShapes;
