import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color: string;
}

const ProgressRing = ({ value, max = 100, size = 120, strokeWidth = 4, color }: ProgressRingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);

  return (
    <svg ref={ref} width={size} height={size} className="absolute inset-0 m-auto -rotate-90">
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth={strokeWidth}
        opacity={0.3}
      />
      {/* Progress */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={isInView ? { strokeDashoffset: circumference * (1 - progress) } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </svg>
  );
};

export default ProgressRing;
