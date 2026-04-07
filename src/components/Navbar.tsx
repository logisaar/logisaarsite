import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/creative/MagneticButton";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/web-development-odisha", label: "Odisha" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="fixed top-0 md:top-9 left-0 right-0 z-50 flex justify-center"
    >
      <motion.div
        className={`transition-all duration-500 ${
          scrolled
            ? "mt-4 mx-4 px-6 py-3 rounded-full bg-background/70 backdrop-blur-xl shadow-lg border border-border/50 max-w-5xl overflow-hidden"
            : "mt-0 px-8 py-5 w-full max-w-none bg-transparent"
        }`}
        layout
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="shrink-0">
            <img src={logo} alt="LogiSaar" className={`w-auto transition-all duration-500 ${scrolled ? "h-16 md:h-20 -my-4" : "h-24 md:h-28 -my-6"}`} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium px-3 py-2 rounded-full transition-colors ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block shrink-0">
            <MagneticButton strength={0.15}>
              <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90 border-0 text-white rounded-full px-6">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-background/95 backdrop-blur-xl z-40 md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 pt-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`text-2xl font-display font-bold transition-colors ${
                      location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button asChild className="mt-4 bg-gradient-primary hover:opacity-90 border-0 text-white px-10">
                  <Link to="/contact">Get a Quote</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
