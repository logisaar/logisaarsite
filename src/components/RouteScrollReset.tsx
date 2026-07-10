import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the browser scroll position to the very top on every route
 * change. Must be rendered inside <BrowserRouter>. Returns null.
 */
const RouteScrollReset = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use "instant" so the page always starts at top BEFORE
    // the PageTransition fade-in begins, preventing the
    // "page loads from bottom" bug.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default RouteScrollReset;
