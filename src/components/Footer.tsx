import { CONTACT } from "@/lib/contact";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import DecorativeShapes from "@/components/creative/DecorativeShapes";
import BrandLogo from "@/components/BrandLogo";

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

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative bg-foreground text-background/80 overflow-hidden" ref={ref}>
      <DecorativeShapes variant="footer" />

      {/* Breathing gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[0.125rem] bg-gradient-primary"
        animate={reduceMotion ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-gutter pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6">
          {/* Brand column */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Link to="/">
              <BrandLogo variant="white" className="h-14" />
            </Link>
            <p className="mt-4 text-body-sm leading-relaxed text-background/60">
              Software, AI agents and business automation from Bhubaneswar, Odisha. Makers of HeyLane and IKURO.
            </p>
            {/* Social icons */}
            <div className="flex gap-2 mt-6 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={(s as { href: string }).href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-background/15 flex items-center justify-center text-background/60 hover:text-primary-ink hover:border-primary/40 transition-colors"
                  aria-label={`${s.label} (opens in a new tab)`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], colIdx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + colIdx * 0.1, duration: 0.8 }}
            >
              <h2 className="font-display font-semibold text-background mb-2 text-body-sm uppercase tracking-wider">{title}</h2>
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center text-body-sm text-background/60 hover:text-primary-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h2 className="font-display font-semibold text-background mb-2 text-body-sm uppercase tracking-wider">Registered office</h2>
            <ul className="space-y-1 text-body-sm text-background/60">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-primary-ink shrink-0 mt-1" />
                <span>
                  Logisaar Technologies Private Limited<br />
                  Cuttack, Odisha, India
                </span>
              </li>
              <li className="text-label text-background/60 font-mono pb-2">
                CIN: U62012OD2026PTC053632
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary-ink shrink-0" />
                <a href={CONTACT.mailto} className="inline-flex min-h-[2.75rem] items-center hover:text-primary-ink transition-colors break-all">{CONTACT.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary-ink shrink-0" />
                <a href={CONTACT.tel} className="inline-flex min-h-[2.75rem] items-center hover:text-primary-ink transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={14} className="text-primary-ink shrink-0" />
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[2.75rem] items-center hover:text-primary-ink transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center text-label text-background/60">
          © 2025–{new Date().getFullYear()} Logisaar Technologies Pvt. Ltd. Registered in India. Built in Odisha, India
        </div>
      </div>
    </footer>
  );
};

export default Footer;
