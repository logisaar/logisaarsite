import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/creative/MagneticButton";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/techxera", label: "TechXera" },
  { to: "/products", label: "Products" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

// Sub-links under "About"
const aboutSubLinks = [
  { to: "/about", label: "About Us", icon: User, description: "Our story, team & mission" },
  { to: "/portfolio", label: "Portfolio", icon: Briefcase, description: "Projects we've delivered" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAboutActive =
    location.pathname === "/about" || location.pathname === "/portfolio";

  const linkBaseClass = (active: boolean) =>
    `relative text-sm font-medium px-3 py-2 rounded-full transition-colors ${
      active
        ? "text-primary"
        : scrolled
        ? "text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="fixed top-0 md:top-9 left-0 right-0 z-[9999] flex justify-center"
    >
      <motion.div
        className={`transition-all duration-500 ${
          scrolled
            ? "mt-4 mx-4 px-6 py-2.5 rounded-full liquid-glass bg-white/90 dark:bg-slate-950/90 max-w-5xl shadow-lg border-white/20 dark:border-white/5"
            : "mt-0 px-8 py-5 w-full max-w-none bg-transparent"
        }`}
        layout
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="shrink-0">
            <img
              src="/logo.png"
              alt="LogiSaar"
              className={`w-auto transition-all duration-500 ${scrolled ? "h-9 md:h-11" : "h-12 md:h-15"}`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Home */}
            <Link
              to="/"
              className={linkBaseClass(location.pathname === "/")}
            >
              Home
              {location.pathname === "/" && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>

            {/* About dropdown */}
            <div
              ref={aboutRef}
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                className={`flex items-center gap-1 ${linkBaseClass(isAboutActive)}`}
                onClick={() => setAboutOpen((v) => !v)}
                aria-expanded={aboutOpen}
                aria-haspopup="true"
              >
                About
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                />
                {isAboutActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-2xl liquid-glass bg-white/95 dark:bg-slate-900/95 border-white/30 dark:border-white/10 overflow-hidden z-50"
                  >
                    {/* Decorative top accent line */}
                    <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

                    <div className="p-2 flex flex-col gap-0.5">
                      {aboutSubLinks.map((sub) => {
                        const Icon = sub.icon;
                        const isActive = location.pathname === sub.to;
                        return (
                          <motion.div
                            key={sub.to}
                            whileHover={{ scale: 1.025, x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            <Link
                              to={sub.to}
                              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 hover:bg-primary/15 hover:text-primary ${
                                isActive
                                  ? "border-l-2 border-primary pl-2.5 text-primary"
                                  : "text-slate-700 dark:text-slate-300 border-l-2 border-transparent pl-2.5"
                              }`}
                            >
                              <span
                                className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 transition-colors bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-primary/15 group-hover:text-primary"
                              >
                                <Icon size={14} />
                              </span>
                              <div className="flex flex-col leading-none">
                                <span className="text-sm font-semibold">{sub.label}</span>
                                <span className="text-[10px] text-muted-foreground mt-0.5">{sub.description}</span>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Remaining top-level links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={linkBaseClass(location.pathname === link.to)}
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
            className="fixed inset-0 top-20 bg-background/75 backdrop-blur-2xl z-40 md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 pt-16">
              {/* Home */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                <Link
                  to="/"
                  className={`text-2xl font-display font-bold transition-colors ${
                    location.pathname === "/" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Home
                </Link>
              </motion.div>

              {/* About (collapsible in mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="flex flex-col items-center gap-3"
              >
                <button
                  onClick={() => setMobileAboutOpen((v) => !v)}
                  className={`flex items-center gap-2 text-2xl font-display font-bold transition-colors ${
                    isAboutActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  About
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col items-center gap-2 overflow-hidden"
                    >
                      {aboutSubLinks.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className={`text-lg font-semibold transition-colors px-6 py-1.5 rounded-full ${
                            location.pathname === sub.to
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Rest of the links */}
              {navLinks.slice(1).map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 2) * 0.05 }}
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
                transition={{ delay: 0.35 }}
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
