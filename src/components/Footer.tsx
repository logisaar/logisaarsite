import { CONTACT } from "@/lib/contact";
import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import MagneticButton from "@/components/creative/MagneticButton";
import BrandLogo from "@/components/BrandLogo";
import { prefersReducedMotion, reveal } from "@/lib/scroll";
import "@/components/footer/footer.css";

// the live layer (wordmark, clocks, traces, call-out) loads when the footer is within one viewport of the screen
const FooterLive = lazy(() => import("@/components/footer/FooterLive"));

const footerLinks = {
  Solutions: [
    { label: "Software development", to: "/solutions#software-development" },
    { label: "AI agent development", to: "/solutions#ai-agents" },
    { label: "Business automation", to: "/solutions#business-automation" },
    { label: "AI software", to: "/solutions#ai-software" },
    { label: "Ready-made solutions", to: "/solutions#ready-made" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "IKURO", to: "/ikuro" },
    { label: "HeyLane", to: "/heylane" },
    { label: "Products", to: "/products" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms of Service", to: "/terms-conditions" },
    { label: "Cookie Policy", to: "/cookie-policy" },
    { label: "Refund Policy", to: "/refund-policy" },
  ],
  Locations: [
    { label: "Web Development in Bhubaneswar", to: "/web-development-odisha" },
    { label: "Web Development in Cuttack", to: "/web-development-odisha" },
    { label: "Web Development in Odisha", to: "/web-development-odisha" },
  ],
};

// TODO(owner): add GitHub and X links when real profiles exist (entries without a URL were removed)
const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/logisaar/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/logisaar",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

const useWide = (query: string) => {
  const [on, setOn] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const fn = () => setOn(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, [query]);
  return on;
};

const HEADING = "font-display font-semibold text-background text-body-sm uppercase tracking-wider";

/** Under 40em the link columns are accordions; from 40em they are plain, always-open lists. */
const LinkColumn = ({ title, links, wide }: { title: string; links: { label: string; to: string }[]; wide: boolean }) => {
  const [open, setOpen] = useState(false);
  const id = `ft-${title.toLowerCase()}`;
  const list = (
    <ul id={id}>
      {links.map((link) => (
        <li key={link.label}>
          <Link to={link.to} className="ft-link text-body-sm text-background/70">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
  if (wide) {
    return (
      <div data-ft-col>
        <h2 className={`${HEADING} mb-2`}>{title}</h2>
        {list}
      </div>
    );
  }
  return (
    <div data-ft-col className="border-b border-background/10">
      <h2 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className={`${HEADING} flex min-h-[2.75rem] w-full items-center justify-between text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
        >
          {title}
          <ChevronDown size={16} aria-hidden="true" className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
        </button>
      </h2>
      <div className={open ? "block pb-2" : "hidden"}>{list}</div>
    </div>
  );
};

/** Back to top with a scroll-progress ring. Scrolls smoothly (instantly under reduced motion). */
const BackToTop = () => {
  const ring = useRef<SVGCircleElement>(null);
  useEffect(() => {
    let raf = 0;
    const C = 2 * Math.PI * 20;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
      aria-label="Back to top"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-background/80 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <svg viewBox="0 0 44 44" aria-hidden="true" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
        <circle ref={ring} cx="22" cy="22" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeDasharray={2 * Math.PI * 20} strokeDashoffset={2 * Math.PI * 20} />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="relative h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
};

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const wide = useWide("(min-width: 40em)");
  const [near, setNear] = useState(false);

  // load the live layer when the footer is within one viewport of the screen
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setNear(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "100% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // column headings and blocks rise in with a small stagger when the footer enters
  useLayoutEffect(() => {
    const cols = ref.current ? Array.from(ref.current.querySelectorAll("[data-ft-col]")) : [];
    return reveal(cols, { y: 16, stagger: 0.08, duration: 0.7, name: "footer-columns" }, ref.current);
  }, [wide]);

  return (
    <footer className="relative overflow-hidden bg-foreground text-background/80" ref={ref}>
      <div className="container relative z-10 mx-auto px-gutter pb-6">
        {/* live layer: same reserved height until it loads, so the page never jumps */}
        {near ? (
          <Suspense fallback={<div aria-hidden="true" className="h-[22rem] sm:h-[26rem]" />}>
            <FooterLive />
          </Suspense>
        ) : (
          <div aria-hidden="true" className="h-[22rem] sm:h-[26rem]" />
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand column */}
          <div data-ft-col className="lg:col-span-1">
            <Link to="/" className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <BrandLogo variant="white" className="h-14" />
            </Link>
            <p className="mt-4 text-body-sm leading-relaxed text-background/70">
              Software, AI agents and business automation from Bhubaneswar, Odisha. Makers of HeyLane and IKURO.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {socialLinks.map((s) => (
                <MagneticButton key={s.label} strength={0.25} className="-m-4 p-4">
                  <a
                    href={(s as { href: string }).href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-background/15 text-background/70 transition-[color,border-color,box-shadow] hover:border-primary hover:text-primary hover:shadow-[0_0_0_3px_hsl(var(--primary)/0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label={`${s.label} (opens in a new tab)`}
                  >
                    {s.icon}
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Link columns: accordions under 40em */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <LinkColumn key={title} title={title} links={links} wide={wide} />
          ))}

          {/* Contact column: always open */}
          <div data-ft-col>
            <h2 className={`${HEADING} mb-2`}>Registered office</h2>
            <ul className="space-y-1 text-body-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin size={14} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                <span>
                  Logisaar Technologies Private Limited<br />
                  Cuttack, Odisha, India
                </span>
              </li>
              <li className="pb-2 font-mono text-label text-background/70">CIN: U62012OD2026PTC053632</li>
              <li className="flex items-center gap-2">
                <Mail size={14} aria-hidden="true" className="shrink-0 text-primary" />
                <a href={CONTACT.mailto} className="ft-link break-all">{CONTACT.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} aria-hidden="true" className="shrink-0 text-primary" />
                <a href={CONTACT.tel} className="ft-link">{CONTACT.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={14} aria-hidden="true" className="shrink-0 text-primary" />
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="ft-link">
                  WhatsApp Us<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-background/10 pt-6 text-label text-background/70">
          <p className="m-0 sm:pl-16 2xl:pl-0">
            © 2025–{new Date().getFullYear()} Logisaar Technologies Pvt. Ltd. Registered in India.{" "}
            {/* TODO(owner): confirm "abroad" is accurate before launch. */}
            <span className="block sm:inline">Built in Odisha, India · Serving clients in India and abroad</span>
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
