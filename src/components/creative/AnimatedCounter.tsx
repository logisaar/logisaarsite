import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({ value, suffix = "", className = "" }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const spring = useSpring(0, { stiffness: 40, damping: 30 });
  const display = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
