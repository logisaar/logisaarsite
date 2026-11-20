import { Fragment, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, Briefcase, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openLeadModal } from "@/components/LeadCaptureModal";
import BrandLogo from "@/components/BrandLogo";
import MagneticButton from "@/components/creative/MagneticButton";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/ikuro", label: "IKURO" },
  { to: "/heylane", label: "HeyLane" },
  { to: "/products", label: "Products" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

// Desktop: Products is a menu (HeyLane + the overview); the phone menu lists HeyLane as its own link
const productSubLinks = [
  { to: "/heylane", label: "HeyLane", icon: Sparkles, description: "Neighbourhood app for places" },
  { to: "/products", label: "All products", icon: Briefcase, description: "Everything we have built" },
];
const desktopLinks = navLinks.filter((l) => l.to !== "/heylane" && l.to !== "/products");

// Sub-links under "About"
const aboutSubLinks = [
  { to: "/about", label: "About Us", icon: User, description: "Our story, team & mission" },
  { to: "/portfolio", label: "Portfolio", icon: Briefcase, description: "Projects we've delivered" },
];

interface NavMenuProps {
  label: string;
  links: { to: string; label: string; icon: React.ElementType; description: string }[];
  active: boolean;
  linkClass: string;
  pathname: string;
}

const NavMenu = ({ label, links, active, linkClass, pathname }: NavMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outside = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", outside); document.removeEventListener("keydown", esc); };
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={`flex items-center gap-1 ${linkClass}`} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="true">
        {label}
        <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        {active && (
          <motion.div layoutId="nav-indicator" className="absolute inset-0 bg-primary/10 rounded-full -z-10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl liquid-glass bg-white/95 dark:bg-slate-900/95 border-white/30 dark:border-white/10 overflow-hidden z-50"
          >
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
            <div className="p-2 flex flex-col gap-0.5">
              {links.map((sub) => {
                const Icon = sub.icon;
                const isActive = pathname === sub.to;
                return (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    className={`group flex min-h-[2.75rem] items-center gap-3 px-3 py-2 rounded-xl transition-all duration-150 hover:bg-primary/15 hover:text-primary-ink ${
                      isActive ? "border-l-2 border-primary pl-2.5 text-primary-ink" : "text-slate-700 dark:text-slate-300 border-l-2 border-transparent pl-2.5"
                    }`}
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 transition-colors bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-primary/15 group-hover:text-primary-ink">
                      <Icon size={14} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col leading-none">
                      <span className="text-body-sm font-semibold">{sub.label}</span>
                      <span className="text-label text-muted-foreground mt-0.5">{sub.description}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isAboutActive =
    location.pathname === "/about" || location.pathname === "/portfolio";
  const isProductsActive = location.pathname === "/products" || location.pathname === "/heylane";
  // The HeyLane page opens on a dark green band: keep the header as a light capsule there so links and logo stay readable.
  const capsule = scrolled || location.pathname === "/heylane";

  const linkBaseClass = (active: boolean) =>
    `relative inline-flex min-h-[2.75rem] items-center text-body-sm font-medium px-3 rounded-full transition-colors ${
      active
        ? "text-primary-ink"
        : capsule
        ? "text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="fixed top-0 md:top-11 left-0 right-0 z-[9999] flex justify-center"
    >
      <motion.div
        className={`transition-all duration-500 ${
          capsule
            ? "mt-4 mx-4 px-6 py-2.5 rounded-full liquid-glass bg-white/90 dark:bg-slate-950/90 max-w-5xl shadow-lg border-white/20 dark:border-white/5"
            : "mt-0 px-8 py-5 w-full max-w-none bg-transparent"
        }`}
        layout
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="inline-flex min-h-[2.75rem] shrink-0 items-center" aria-label="Logisaar home">
            <BrandLogo
              priority
              className={`transition-all duration-500 ${capsule ? "h-[2.375rem]" : "h-9 md:h-11"}`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">

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

            <NavMenu label="About" links={aboutSubLinks} active={isAboutActive} linkClass={linkBaseClass(isAboutActive)} pathname={location.pathname} />

            {/* Remaining top-level links */}
            {desktopLinks.slice(1).map((link) => (
              <Fragment key={link.to}>
                <Link to={link.to} className={linkBaseClass(location.pathname === link.to)}>
                  {link.label}
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
                {link.to === "/ikuro" && (
                  <NavMenu label="Products" links={productSubLinks} active={isProductsActive} linkClass={linkBaseClass(isProductsActive)} pathname={location.pathname} />
                )}
              </Fragment>
            ))}
          </nav>

          <div className="hidden lg:block shrink-0">
            <MagneticButton strength={0.15}>
              <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90 border-0 text-primary-on rounded-full px-6">
                <button type="button" onClick={() => openLeadModal()}>Get a Quote</button>
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-background/75 backdrop-blur-2xl z-40 lg:hidden"
          >
            <nav className="flex flex-col items-center gap-6 pt-16">
              {/* Home */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                <Link
                  to="/"
                  className={`text-2xl font-display font-bold transition-colors ${
                    location.pathname === "/" ? "text-primary-ink" : "text-muted-foreground"
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
                    isAboutActive ? "text-primary-ink" : "text-muted-foreground"
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
                              ? "text-primary-ink bg-primary/10"
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
                      location.pathname === link.to ? "text-primary-ink" : "text-muted-foreground"
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
                <Button asChild className="mt-4 bg-gradient-primary hover:opacity-90 border-0 text-primary-on px-10">
                  <button type="button" onClick={() => openLeadModal()}>Get a Quote</button>
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
