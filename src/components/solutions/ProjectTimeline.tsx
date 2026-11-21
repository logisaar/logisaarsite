import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Four-step timeline. Horizontal from 48em, vertical (line on the left) below.
 * The line draws with scroll; with reduced motion it is already drawn.
 */
const ProjectTimeline = ({ steps }: { steps: readonly { title: string; text: string }[] }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative mx-auto mt-section-head grid max-w-[75rem] gap-10 md:grid-cols-4 md:gap-6">
      <span aria-hidden="true" className="absolute bottom-2 left-[1.1875rem] top-2 w-0.5 bg-border md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:top-[1.1875rem] md:h-0.5 md:w-auto" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-2 left-[1.1875rem] top-2 w-0.5 origin-top bg-primary [transform:scaleY(var(--draw))] md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:top-[1.1875rem] md:h-0.5 md:w-auto md:origin-left md:[transform:scaleX(var(--draw))]"
        style={{ "--draw": reduce ? 1 : spring } as never}
      />
      {steps.map((st, i) => (
        <li key={st.title} className="relative pl-14 md:pl-0 md:pt-14 md:text-center">
          <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-body font-bold text-primary-on md:left-1/2 md:-translate-x-1/2">
            {i + 1}
          </span>
          <h3 className="font-display text-h3 font-bold text-foreground">{st.title}</h3>
          <p className="mt-1 text-body-sm text-muted-foreground md:text-body">{st.text}</p>
        </li>
      ))}
    </ol>
  );
};

export default ProjectTimeline;
