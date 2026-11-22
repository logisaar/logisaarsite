import { CONTACT } from "@/lib/contact";
import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { reveal } from "@/lib/scroll";
import { IstLine, VisitorTime } from "@/components/footer/clocks";
import "@/components/footer/footer.css";

// the live layer (traces and the signature wordmark) loads when the footer is within one viewport of the screen
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
    { label: "About", to: "/about" },
    { label: "IKURO", to: "/ikuro" },
    { label: "HeyLane", to: "/heylane" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
  ],
  Legal: [
    { label: "Privacy policy", to: "/privacy-policy" },
    { label: "Terms of service", to: "/terms-conditions" },
    { label: "Cookie policy", to: "/cookie-policy" },
    { label: "Refund policy", to: "/refund-policy" },
  ],
  Locations: [
    { label: "Web development in Bhubaneswar", to: "/web-development-odisha" },
    { label: "Web development in Cuttack", to: "/web-development-odisha" },
    { label: "Web development in Odisha", to: "/web-development-odisha" },
  ],
};

// TODO(owner): add GitHub and X links when real profiles exist (entries without a URL were removed)
const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/logisaar/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/logisaar",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
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

/** From 30em the link columns are plain, always-open lists; under 30em they are accordions (Enter/Space, aria-expanded). */
const LinkColumn = ({ title, links, wide }: { title: string; links: { label: string; to: string }[]; wide: boolean }) => {
  const [open, setOpen] = useState(false);
  const id = `ft-${title.toLowerCase()}`;
  const list = (
    <ul id={id}>
      {links.map((link) => (
        <li key={link.label}>
          <Link to={link.to} className="ft-link">{link.label}</Link>
        </li>
      ))}
    </ul>
  );
  if (wide) {
    return (
      <nav data-ft-col className="ft-col" aria-label={title}>
        <h2 className="ft-h">{title}</h2>
        {list}
      </nav>
    );
  }
  return (
    <nav data-ft-col className="ft-col ft-acc" aria-label={title}>
      <h2 className="ft-h">
        <button type="button" className="ft-acc-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          {title}
          <ChevronDown size={16} aria-hidden="true" className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
        </button>
      </h2>
      <div className={open ? "block pb-2" : "hidden"}>{list}</div>
    </nav>
  );
};

export type FooterCtaVariant = "default";

const CTA_COPY: Record<FooterCtaVariant, { lead: string; accent: string; text: string }> = {
  default: {
    lead: "Tell us the one task you hate doing.",
    accent: "We’ll make it disappear.",
    text: "A free call. You leave with a clear plan and a fixed quote, whether or not you work with us.",
  },
};

interface FooterProps {
  /** `false` hides the CTA zone (used on /contact, where the page itself is the CTA). */
  cta?: boolean;
  /** Different CTA copy per page, if ever needed. */
  ctaVariant?: FooterCtaVariant;
}

const Footer = ({ cta = true, ctaVariant = "default" }: FooterProps) => {
  const ref = useRef<HTMLElement>(null);
  const wide = useWide("(min-width: 30em)");
  const [near, setNear] = useState(false);
  const copy = CTA_COPY[ctaVariant];

  // load the live layer when the footer is within one viewport of the screen
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setNear(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "100% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // data-visible pauses the trace loop off-screen; data-in starts the one-shot wordmark sweep at 35% of the footer
  // (or when the footer fills most of the viewport, as on a phone where 35% of it may never be on screen)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.dataset.visible = "true"; el.dataset.in = "true"; return; }
    const io = new IntersectionObserver(
      ([e]) => {
        el.dataset.visible = String(e.isIntersecting);
        if (e.intersectionRatio >= 0.35 || e.intersectionRect.height >= window.innerHeight * 0.6) el.dataset.in = "true";
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // column blocks rise in with a small stagger when the footer enters
  useLayoutEffect(() => {
    const cols = ref.current ? Array.from(ref.current.querySelectorAll("[data-ft-col]")) : [];
    return reveal(cols, { y: 16, stagger: 0.08, duration: 0.7, name: "footer-columns" }, ref.current);
  }, [wide]);

  return (
    <footer className="ft" ref={ref} data-header-tone="dark" data-visible="false" data-in="false">
      {near && (
        <Suspense fallback={null}>
          <FooterLive part="traces" />
        </Suspense>
      )}

      <div className="container mx-auto ft-wrap px-gutter">
        {/* 1. CTA zone: the page's one final call to action */}
        {cta && (
          <section className="ft-cta" aria-labelledby="ft-cta-h">
            <div>
              <h2 id="ft-cta-h">
                {copy.lead} <em>{copy.accent}</em>
              </h2>
              <p className="ft-cta-text">{copy.text}</p>
            </div>
            <div className="ft-acts">
              <Link to="/contact" className="ft-btn ft-btn--pri">
                Book a free call <span aria-hidden="true" className="ft-ar">→</span>
              </Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="ft-btn ft-btn--sec">
                WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <IstLine />
            </div>
          </section>
        )}

        {/* 2. Columns */}
        <div className="ft-cols">
          <div data-ft-col className="ft-brand">
            <Link to="/" aria-label="Logisaar home" className="inline-block">
              <BrandLogo variant="white" className="h-[2.75rem]" />
            </Link>
            <p>Software, AI agents and business automation from Bhubaneswar, Odisha. Makers of HeyLane and IKURO.</p>
            <div className="ft-soc">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <LinkColumn title="Solutions" links={footerLinks.Solutions} wide={wide} />
          <LinkColumn title="Company" links={footerLinks.Company} wide={wide} />
          <LinkColumn title="Legal" links={footerLinks.Legal} wide={wide} />

          <div className="ft-stack">
            {/* Office stays open at every width */}
            <div data-ft-col className="ft-col ft-office">
              <h2 className="ft-h">Office</h2>
              {/* TODO(owner): confirm which city the footer office line should name (registered office is Cuttack; the reference sample said Bhubaneswar). */}
              <address className="ft-addr">
                Logisaar Technologies Pvt Ltd<br />
                Cuttack, Odisha, India
              </address>
              <ul className="mt-3">
                <li><a href={CONTACT.mailto} className="ft-link break-all">{CONTACT.email}</a></li>
                <li><a href={CONTACT.tel} className="ft-link">{CONTACT.phone}</a></li>
              </ul>
            </div>
            <LinkColumn title="Locations" links={footerLinks.Locations} wide={wide} />
          </div>
        </div>

        {/* 3. Bottom bar */}
        <div className="ft-bar">
          <p>© 2025–{new Date().getFullYear()} Logisaar Technologies Pvt. Ltd. · CIN U62012OD2026PTC053632</p>
          {/* TODO(owner): add "Serving clients in India and abroad" only once the owner confirms it is accurate. */}
          <p>Built in Odisha, India · <VisitorTime /></p>
        </div>
      </div>

      {/* 4. Signature wordmark, cropped by the footer's bottom edge */}
      <div className="ft-sig" aria-hidden="true">
        {near && (
          <Suspense fallback={null}>
            <FooterLive part="wordmark" />
          </Suspense>
        )}
      </div>
    </footer>
  );
};

export default Footer;
