import { getImage } from "@/data/images";

/**
 * One source for every ready-made solution: used on home, /solutions and the nine detail pages.
 * Prices here are the detail-page starter-tier values. Do not change a price without the owner.
 */

/**
 * Claims the owner has not yet backed with proof (a client result he can cite, or a provider's documentation).
 * While false, the site shows the safe wording. Switch it on per claim below with `proven: true` once confirmed.
 * Full list with reasons: claude-code-tasks/round-6-about-solutions-portfolio/CLAIMS.md
 */
export const SHOW_PROVEN_CLAIMS = false;

interface Claim {
  /** the wording that used to be on the site */
  original: string;
  /** what the site says until the claim is proven */
  safe: string;
  /** set true once the owner confirms it with proof; then `original` shows */
  proven?: boolean;
}

// TODO(owner): for each claim below, confirm it with proof (or approve the safe wording) and set `proven: true` to restore the original.
export const CLAIMS = {
  "hotel-workload": { original: "Reduce staff workload by 60%.", safe: "Cuts manual booking and billing work." },
  "hotel-uptime": {
    original: "All data is encrypted and hosted on secure cloud servers with daily automated backups and 99.9% uptime.",
    safe: "Data is encrypted and hosted on secure cloud servers. Backup and uptime terms are written into your quote.",
  },
  "proposal-speed": { original: "Close clients 3x faster.", safe: "Send branded proposals and get them signed online." },
  "proposal-3x": {
    original: "Boring PDF proposals get ignored. Interactive proposals get 3x more responses and faster decisions.",
    safe: "Plain PDF proposals are easy to ignore. Interactive proposals are easier to read, compare and answer.",
  },
  "esign-feature": {
    original: "Legally valid e-signatures under India's IT Act 2000 — clients sign in seconds.",
    safe: "Digital e-signatures: clients sign from their phone or laptop.",
  },
  "esign-faq-q": { original: "Does it support digital signatures legally in India?", safe: "Does it support digital signatures?" },
  "esign-faq-a": {
    original: "Yes, e-signatures are legally valid under the IT Act 2000 in India for most business agreements.",
    safe: "Yes, clients can sign proposals digitally. If your agreement needs a specific kind of signature, tell us and we will check it with you.",
  },
  "esign-card": { original: "Digital e-signature (legally valid in India)", safe: "Digital e-signatures" },
  "receptionist-llm": { original: "GPT-4o custom fine-tuning", safe: "Works with leading AI models" },
  "odia-card": { original: "Bilingual capabilities: English + Odia", safe: "Languages confirmed per project" },
  "odia-feature": {
    original: "Handles English and basic Odia — full Odia language model available in Enterprise plan.",
    safe: "Handles English, and other languages as agreed for your project.",
  },
  "odia-tier": { original: "Full Odia language model", safe: "Extra language support" },
  "odia-faq": {
    original: "Basic Odia support is available. Full Odia language model training is available in the Enterprise plan.",
    safe: "Language support is agreed per project. Tell us which languages your customers use and we will confirm what is possible.",
  },
  "receptionist-cost-title": { original: "Hiring a receptionist costs ₹15,000+/month", safe: "A receptionist only works set hours" },
  "receptionist-cost-desc": {
    original: "AI does the same job — answering, booking, and following up — at a fraction of the cost.",
    safe: "An AI receptionist answers, books and follows up around the clock, and hands over to your team when a person is needed.",
  },
  "automation-h2": {
    original: "Automate Repetitive Tasks — Save 20+ Hours Every Week",
    safe: "Automate repetitive tasks and give your team their time back",
  },
  "automation-card": { original: "Save 20+ hours a week.", safe: "Takes repetitive office work off your team." },
  "automation-3x": {
    original: "Businesses using AI automation outperform manual-process competitors by 3x in productivity.",
    safe: "Teams that automate routine work spend more of their day on customers and growth.",
  },
  "lead-78": {
    original: "78% of customers buy from whoever responds first. Manual follow-up is always too slow to compete.",
    safe: "Customers often buy from whoever replies first. Manual follow-up can be too slow to compete.",
  },
  "lead-60": {
    original: "Every ignored lead is money left on the table. On average, businesses lose 60% of leads to no follow-up.",
    safe: "Every ignored lead is money left on the table. Many businesses lose leads simply because nobody followed up.",
  },
  "lead-card": { original: "Convert leads 24/7.", safe: "Follows up with every new lead, fast." },
  "crm-cost": {
    original: "Salesforce, Zoho and HubSpot cost ₹3,000–₹30,000/month forever. A custom CRM pays for itself in under a year.",
    safe: "Popular CRMs charge a monthly fee per user, every month. A custom CRM is a one-time build that you own.",
  },
  "qr-photos-feature": {
    original: "Visually rich menus with photos — menus with photos get 30% more orders on average.",
    safe: "Visually rich menus: photos make dishes easier to choose.",
  },
  "qr-photos-faq": {
    original: "Yes, and we strongly recommend it — menus with photos get 30% more orders than text-only menus.",
    safe: "Yes, and we recommend it: photos make a menu easier to browse.",
  },
  "travel-commission": {
    original: "Paying 15-20% commission on every booking when you could get direct bookings from your own site.",
    safe: "Booking platforms take a commission on every booking. Direct bookings from your own site keep that with you.",
  },
} satisfies Record<string, Claim>;

export type ClaimKey = keyof typeof CLAIMS;

/** Text to show for a claim: the original only when SHOW_PROVEN_CLAIMS is on or the claim itself is marked proven. */
export const claim = (key: ClaimKey): string => {
  const c: Claim = CLAIMS[key];
  return SHOW_PROVEN_CLAIMS || c.proven ? c.original : c.safe;
};

export const INDUSTRIES = [
  "All",
  "Education",
  "Hospitality",
  "Sales",
  "Customer service",
  "Food & beverage",
  "Travel",
  "Agencies & freelancers",
  "Any business",
] as const;
export type Industry = Exclude<(typeof INDUSTRIES)[number], "All">;

export interface Solution {
  id: string;
  name: string;
  industry: Industry;
  /** one line, no numbers we cannot prove */
  outcome: string;
  /** short description used on the home cards */
  summary: string;
  /** four short bullets, home cards only; the full list lives on the detail page */
  highlights: string[];
  /** starting price, exactly as on the detail page */
  from: string;
  /** monthly fee, only where one already exists */
  monthly?: string;
  path: string;
  img: ReturnType<typeof getImage>;
  /** Home cards use a browser-frame mockup instead of the service photo */
  mockup?: ReturnType<typeof getImage>;
  wa: string;
}

export const SOLUTIONS: Solution[] = [
  {
    id: "school-management",
    name: "AI-Powered School ERP",
    industry: "Education",
    outcome: "Admissions, fees, attendance and reports in one place.",
    summary: "Manage students, staff, fees, attendance and communication in one platform.",
    highlights: ["Admissions & student profiles", "Automated attendance alerts", "Fee collection & invoicing", "Exams, reports & analytics"],
    from: "₹35,000",
    path: "/solutions/ai-powered-school-erp",
    img: getImage("services", "school"),
    mockup: getImage("mockups", "school-erp"),
    wa: "Hi Logisaar, I'm interested in the AI-Powered School ERP solution.",
  },
  {
    id: "hotel-management",
    name: "Hotel Management System",
    industry: "Hospitality",
    outcome: claim("hotel-workload"),
    summary: "Bookings, front desk, housekeeping and billing for hotels, resorts and homestays.",
    highlights: ["Real-time room booking", "Housekeeping management", "Billing & invoicing", "Reports & analytics"],
    from: "₹40,000",
    path: "/solutions/hotel-management-system",
    img: getImage("services", "hotel"),
    mockup: getImage("mockups", "hotel-management"),
    wa: "Hi Logisaar, I'm interested in the Hotel Management System solution.",
  },
  {
    id: "ai-lead-followup",
    name: "AI Lead Follow-Up System",
    industry: "Sales",
    outcome: claim("lead-card"),
    summary: "An AI that follows up with every new lead by WhatsApp and email.",
    highlights: ["Instant WhatsApp follow-up", "Email sequences", "Lead scoring", "Works with your CRM"],
    from: "₹25,000",
    monthly: "₹5,000",
    path: "/solutions/ai-lead-followup",
    img: getImage("services", "ai-lead"),
    wa: "Hi Logisaar, I'm interested in the AI Lead Follow-Up System.",
  },
  {
    id: "ai-receptionist",
    name: "AI Receptionist",
    industry: "Customer service",
    outcome: "Answers calls and WhatsApp enquiries, and books appointments.",
    summary: "An AI receptionist that answers calls, qualifies leads and books appointments.",
    highlights: ["Call answering", "Lead qualification", "Smart scheduling", "WhatsApp integration"],
    from: "₹20,000",
    monthly: "₹4,000",
    path: "/solutions/ai-receptionist",
    img: getImage("services", "ai-receptionist"),
    mockup: getImage("mockups", "ai-receptionist"),
    wa: "Hi Logisaar, I'm interested in the AI Receptionist solution.",
  },
  {
    id: "proposal-software",
    name: "Proposal Software",
    industry: "Agencies & freelancers",
    outcome: claim("proposal-speed"),
    summary: "Branded interactive proposals with e-signatures and payment links.",
    highlights: ["Branded templates", "Pricing packages", "Read tracking", "Payment links"],
    from: "₹15,000",
    path: "/solutions/proposal-software",
    img: getImage("services", "proposal"),
    wa: "Hi Logisaar, I'm interested in the Proposal Software solution.",
  },
  {
    id: "qr-menu-system",
    name: "QR Code Menu System",
    industry: "Food & beverage",
    outcome: "Table QR menus with ordering and UPI payment.",
    summary: "Digital menus that customers open by scanning a table QR code.",
    highlights: ["Table-specific QR codes", "Live menu updates", "Table ordering", "UPI payment"],
    from: "₹12,000",
    path: "/solutions/qr-menu-system",
    img: getImage("services", "qr-menu"),
    wa: "Hi Logisaar, I'm interested in the QR Code Menu System.",
  },
  {
    id: "travel-website",
    name: "Tours & Travel Website",
    industry: "Travel",
    outcome: "A booking website for your tours, found on Google.",
    summary: "Direct-booking websites for tour operators, with itineraries and local SEO.",
    highlights: ["Tour listings", "Booking calendar", "Online payments", "Local SEO setup"],
    from: "₹20,000",
    path: "/solutions/travel-website",
    img: getImage("services", "travel"),
    wa: "Hi Logisaar, I'm interested in the Tours & Travel Website solution.",
  },
  {
    id: "ai-automation-suite",
    name: "AI Automation Suite",
    industry: "Any business",
    outcome: claim("automation-card"),
    summary: "Connect sheets, CRMs, WhatsApp and email so routine work runs by itself.",
    highlights: ["WhatsApp automation", "Invoice & report generation", "Sheets syncing", "Email auto-replies"],
    from: "₹20,000",
    path: "/solutions/ai-automation",
    img: getImage("services", "ai-automation"),
    wa: "Hi Logisaar, I'm interested in the AI Automation Suite solution.",
  },
  {
    id: "custom-crm",
    name: "Custom CRM System",
    industry: "Sales",
    outcome: "A sales pipeline built for how your team sells.",
    summary: "Manage leads, automate follow-ups and track deals in a CRM built for you.",
    highlights: ["Pipeline & lead management", "Workflow automation", "Email & WhatsApp", "Analytics & reporting"],
    from: "₹45,000",
    path: "/solutions/custom-crm",
    img: getImage("services", "crm"),
    mockup: getImage("mockups", "smart-crm"),
    wa: "Hi Logisaar, I'm interested in the Custom CRM System.",
  },
];

export const solutionById = (id: string): Solution => {
  const s = SOLUTIONS.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown solution: ${id}`);
  return s;
};

/** Price line used everywhere: "From ₹X" and, where one exists, "₹Y/month". */
export const priceLine = (s: Solution) => ({ from: `From ${s.from}`, monthly: s.monthly ? `${s.monthly}/month` : undefined });
