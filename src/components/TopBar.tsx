import { Mail, Phone } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/logisaar?utm_source=qr&igsh=M2p1Y2xzenkyOWU4",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1CavFRY28Y/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/logisaar/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] hidden md:block bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-1.5 text-xs">
          <div className="flex items-center gap-5">
            <a href="mailto:logisaar@gmail.com" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Mail size={13} />
              <span>logisaar@gmail.com</span>
            </a>
            <a href="tel:+917815014638" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone size={13} />
              <span>+91 78150 14638</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="hover:opacity-80 transition-opacity"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
