import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

const HorizontalScroll = ({ children, className = "" }: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.67%"]);

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-8 pl-[10vw]">
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
