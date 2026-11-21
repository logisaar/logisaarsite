import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Clock for the faux product demos on /solutions.
 * Returns elapsed milliseconds (0..total) of one short sequence. The clock runs only while the
 * element is on screen and the tab is visible, holds the final state for `hold` ms, then loops.
 * With reduced motion it never starts: the final state is returned straight away.
 */
export function useStage<T extends HTMLElement>(total: number, hold = 2600) {
  const reduce = useReducedMotion();
  const ref = useRef<T>(null);
  const [t, setT] = useState(0);
  const elapsed = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || typeof IntersectionObserver === "undefined") return;
    let timer: number | undefined;
    let last = 0;
    const stop = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      if (timer !== undefined) return;
      last = performance.now();
      timer = window.setInterval(() => {
        const now = performance.now();
        elapsed.current = (elapsed.current + (now - last)) % (total + hold);
        last = now;
        setT(Math.min(elapsed.current, total));
      }, 50);
    };
    let visible = false;
    const sync = () => (visible && !document.hidden ? start() : stop());
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    }, { threshold: 0.25 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      stop();
    };
  }, [reduce, total, hold]);

  return { ref, t: reduce ? total : t };
}

/** 0..1 progress of a window [from, from + dur] inside the sequence clock. */
export const seg = (t: number, from: number, dur: number) => Math.min(1, Math.max(0, (t - from) / dur));
