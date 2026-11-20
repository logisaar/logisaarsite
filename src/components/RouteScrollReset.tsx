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
    // Wait a beat so the page (and its transition) has rendered the target.
    const id = decodeURIComponent(hash.slice(1));
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default RouteScrollReset;
