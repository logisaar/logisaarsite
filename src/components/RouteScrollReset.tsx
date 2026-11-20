import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the browser scroll position to the very top on every route
 * change, unless the URL has a #hash that matches an element on the page
 * (for example /solutions#ai-agents), in which case it scrolls to that
 * element. Must be rendered inside <BrowserRouter>. Returns null.
 */
const RouteScrollReset = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Use "instant" so the page always starts at top BEFORE
    // the PageTransition fade-in begins, preventing the
    // "page loads from bottom" bug.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    // The target can appear late (page transition) and the layout can shift while the old page leaves,
    // so keep it aligned for a short while, and stop as soon as the visitor scrolls themselves.
    let elapsed = 0;
    const stop = () => window.clearInterval(timer);
    const timer = window.setInterval(() => {
      elapsed += 100;
      const el = document.getElementById(id);
      if (el) {
        const margin = (parseFloat(getComputedStyle(el).scrollMarginTop) || 0) + (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
        if (Math.abs(el.getBoundingClientRect().top - margin) > 2) el.scrollIntoView({ behavior: "instant", block: "start" });
      }
      if (elapsed >= 2000) stop();
    }, 100);
    const events = ["wheel", "touchmove", "keydown", "pointerdown"] as const;
    events.forEach((e) => window.addEventListener(e, stop, { passive: true, once: true }));
    return () => {
      stop();
      events.forEach((e) => window.removeEventListener(e, stop));
    };
  }, [pathname, hash]);

  return null;
};

export default RouteScrollReset;
