import { Fragment, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Briefcase, Sparkles } from "lucide-react";
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

interface NavMenuProps {
  label: string;
  links: { to: string; label: string; icon: React.ElementType; description: string }[];
  active: boolean;
  linkClass: string;
  pillClass: string;
  pathname: string;
}

const NavMenu = ({ label, links, active, linkClass, pillClass, pathname }: NavMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number>();

  const openNow = () => { window.clearTimeout(closeTimer.current); setOpen(true); };
  const closeSoon = () => { window.clearTimeout(closeTimer.current); closeTimer.current = window.setTimeout(() => setOpen(false), 150); };
  const items = () => Array.from(ref.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? []);

  useEffect(() => {
    const outside = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", outside);
    return () => { document.removeEventListener("mousedown", outside); window.clearTimeout(closeTimer.current); };
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  // Focus the first item after the panel mounts when opened from the keyboard
  const focusFirst = useRef(false);
  useEffect(() => { if (open && focusFirst.current) { focusFirst.current = false; requestAnimationFrame(() => items()[0]?.focus()); } }, [open]);

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      if (open) items()[0]?.focus(); else { focusFirst.current = true; openNow(); }
    }
  };
  const onMenuKey = (e: React.KeyboardEvent) => {
    const list = items();
    const i = list.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") { e.preventDefault(); list[(i + 1) % list.length]?.focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); list[(i - 1 + list.length) % list.length]?.focus(); }
    else if (e.key === "Home") { e.preventDefault(); list[0]?.focus(); }
    else if (e.key === "End") { e.preventDefault(); list[list.length - 1]?.focus(); }
    else if (e.key === "Escape") { e.preventDefault(); setOpen(false); triggerRef.current?.focus(); }
    else if (e.key === "Tab") setOpen(false);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        ref={triggerRef}
        type="button"
        className={`flex items-center gap-1 ${linkClass}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKey}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {label}
        <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        {active && (
          <motion.div layoutId="nav-indicator" className={`absolute inset-0 rounded-full -z-10 ${pillClass}`} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={label}
            onKeyDown={onMenuKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            // Solid surface (no glass): headlines behind must never show through. The ::before bridges the hover gap.
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 rounded-2xl border border-border bg-white shadow-xl overflow-visible z-overlay before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
          >
            <div className="p-2 flex flex-col gap-0.5">
              {links.map((sub) => {
                const Icon = sub.icon;
                const isActive = pathname === sub.to;
                return (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    role="menuitem"
                    className={`group flex min-h-[2.75rem] items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-150 hover:bg-primary/10 hover:text-primary-ink focus-visible:bg-primary/10 ${
                      isActive ? "border-l-2 border-primary pl-2.5 text-primary-ink" : "text-slate-700 border-l-2 border-transparent pl-2.5"
                    }`}
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 transition-colors bg-slate-100 text-slate-500 group-hover:bg-primary/15 group-hover:text-primary-ink">
                      <Icon size={14} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col leading-none">
                      <span className="text-body-sm font-semibold">{sub.label}</span>
                      <span className="text-label text-slate-500 mt-0.5">{sub.description}</span>
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
  const [onDark, setOnDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Over a dark band (the footer, HeyLane night, IKURO navy: data-header-tone="dark") the header becomes a solid dark capsule.
  // An IntersectionObserver watches a thin strip at the header's vertical centre; a band crossing it flips the tone.
  // Bands that mount later (lazy sections) are picked up by a MutationObserver.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    let io: IntersectionObserver | undefined;
    let mo: MutationObserver | undefined;
    let raf = 0;
    const hits = new Set<Element>();
    const seen = new Set<Element>();
    const sync = () => {
      raf = 0;
      document.querySelectorAll("[data-header-tone='dark']").forEach((el) => {
        if (!seen.has(el)) { seen.add(el); io?.observe(el); }
      });
      let changed = false;
      hits.forEach((el) => { if (!el.isConnected) { hits.delete(el); changed = true; } });
      if (changed) setOnDark(hits.size > 0);
    };
    const build = () => {
      io?.disconnect();
      hits.clear();
      seen.clear();
      // the header slides in on mount, so measure from its fixed offset (not its animated position): the capsule's centre sits about 3rem below it
      const mid = Math.round((headerRef.current?.offsetTop ?? 0) + 48);
      const bottom = Math.max(0, window.innerHeight - mid - 1);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) (e.isIntersecting ? hits.add(e.target) : hits.delete(e.target));
          setOnDark(hits.size > 0);
        },
        { rootMargin: `-${mid}px 0px -${bottom}px 0px` },
      );
      sync();
    };
    setOnDark(false);
    build();
    mo = new MutationObserver(() => { if (!raf) raf = requestAnimationFrame(sync); });
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", build);
    return () => { if (raf) cancelAnimationFrame(raf); window.removeEventListener("resize", build); io?.disconnect(); mo?.disconnect(); };
  }, [location.pathname]);

  // /portfolio is hidden (no links) but still highlights About if someone lands on it from search
  const isAboutActive =
    location.pathname === "/about" || location.pathname === "/portfolio";
  const isProductsActive = location.pathname === "/products" || location.pathname === "/heylane";
  // The HeyLane page opens on a dark green band: keep the header as a light capsule there so links and logo stay readable.
  const capsule = scrolled || location.pathname === "/heylane" || onDark;

  const pillClass = onDark ? "bg-white/10" : "bg-primary/10";

  const linkBaseClass = (active: boolean) =>
    `relative inline-flex min-h-[2.75rem] items-center text-body-sm font-medium px-3 rounded-full transition-colors ${
      onDark
        ? active
          ? "text-white"
          : "text-white/80 hover:text-white"
        : active
        ? "text-primary-ink"
        : capsule
        ? "text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className={`fixed left-0 right-0 flex justify-center z-overlay`}
      style={{ top: "var(--topbar-h)" }}
    >
      <motion.div
        className={`transition-all duration-500 ${
          capsule
            ? `mt-4 mx-4 px-6 py-2.5 rounded-full max-w-5xl shadow-lg ${
                onDark
                  ? "border border-white/10 bg-slate-950/95"
                  : "liquid-glass bg-white/90 dark:bg-slate-950/90 border-white/20 dark:border-white/5"
              }`
            : "mt-0 flex w-full max-w-none items-center border-b border-border bg-background/95 px-gutter"
        }`}
        style={capsule ? undefined : { minHeight: "var(--nav-h)" }}
        layout
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <div className="flex w-full items-center justify-between gap-8">
          <Link to="/" className="inline-flex min-h-[2.75rem] shrink-0 items-center" aria-label="Logisaar home">
            <BrandLogo
              priority
              variant={onDark ? "white" : "light"}
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
                  className={`absolute inset-0 rounded-full -z-10 ${pillClass}`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>

            <Link to="/about" className={linkBaseClass(isAboutActive)}>
              About
              {isAboutActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className={`absolute inset-0 rounded-full -z-10 ${pillClass}`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>

            {/* Remaining top-level links */}
            {desktopLinks.slice(1).map((link) => (
              <Fragment key={link.to}>
                <Link to={link.to} className={linkBaseClass(location.pathname === link.to)}>
                  {link.label}
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute inset-0 rounded-full -z-10 ${pillClass}`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
                {link.to === "/ikuro" && (
                  <NavMenu label="Products" links={productSubLinks} active={isProductsActive} linkClass={linkBaseClass(isProductsActive)} pillClass={pillClass} pathname={location.pathname} />
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
            className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full ${onDark ? "text-white" : "text-foreground"}`}
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
            className="fixed inset-0 bg-background/95 backdrop-blur-2xl lg:hidden"
            style={{ top: "var(--header-h)" }}
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

              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <Link
                  to="/about"
                  className={`text-2xl font-display font-bold transition-colors ${
                    isAboutActive ? "text-primary-ink" : "text-muted-foreground"
                  }`}
                >
                  About
                </Link>
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
