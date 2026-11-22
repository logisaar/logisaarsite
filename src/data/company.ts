/** Company facts shared by home, About and Solutions so numbers never drift apart. */

// TODO(owner): confirm the one true number of projects delivered. 30+ is what the home page already shows; Portfolio, Location and the old About/Solutions said 15+.
export const PROJECTS_DELIVERED = "30+";

export const FOUNDED = "September 2025";

// TODO(owner): confirm Chinmay's title ("Founder & CEO", "Founder & Director" or "Managing Director & CEO"). Use this one constant everywhere.
export const FOUNDER_TITLE = "Founder & Director";
// TODO(owner): confirm Biswanath's title.
export const COFOUNDER_TITLE = "Co-founder & CTO";

/** The four services, in the order used on home, About and /solutions. Anchors live on /solutions. */
export const SERVICES = [
  {
    id: "software-development",
    name: "Software development",
    promise: "Your business, as an app.",
    desc: "Custom web apps, mobile apps, ERP and CRM systems built around how your team already works.",
    examples: ["Web and mobile apps", "ERP and CRM systems", "E-commerce and portals", "Internal tools and dashboards"],
    deliverables: ["Written scope and fixed quote", "Working software you can use from week one", "Source code and handover", "Support after launch"],
  },
  {
    id: "ai-agents",
    name: "AI agent development",
    promise: "A teammate that never sleeps.",
    desc: "AI agents that answer calls and chats, qualify leads, book appointments and follow up.",
    examples: ["AI receptionist", "WhatsApp and web chat agents", "Lead follow-up", "Appointment booking"],
    deliverables: ["An agent trained on your own questions and services", "Hand-off to your team when a person is needed", "Conversation log you can review", "Tuning after launch"],
  },
  {
    id: "business-automation",
    name: "Business automation",
    promise: "Repetitive work, gone.",
    desc: "We connect your tools so invoices, reminders, approvals and reports happen on their own.",
    examples: ["Invoices and GST bills", "Reminders and approvals", "Daily reports", "Data moving between your tools"],
    deliverables: ["A map of the work being automated", "Automations running on your accounts", "Alerts when something fails", "A short guide for your team"],
  },
  {
    id: "ai-software",
    name: "AI software",
    promise: "Your data, finally useful.",
    desc: "AI tools built on your own documents and numbers: assistants, document reading and smart search.",
    examples: ["Document AI", "Team assistants", "Smart search", "Insights and reports"],
    deliverables: ["A working tool on your own data", "Clear notes on what it can and cannot answer", "Access controls for your team", "Improvements as you use it"],
  },
] as const;

/**
 * Office hours in IST, used by the footer's "We're working now" status.
 * TODO(owner): office hours and working days in IST. While this is null the footer shows only the two clocks, no status.
 * Shape: { days: [1, 2, 3, 4, 5, 6] (0 = Sunday), open: "10:00", close: "19:00" }
 */
export const OFFICE_HOURS: { days: number[]; open: string; close: string } | null = null;

/** The four project steps, shared by /solutions and every solution detail page. */
export const PROJECT_STEPS = [
  { title: "Free call", text: "Tell us what is slowing your business down. We listen first." },
  { title: "Clear plan and fixed quote", text: "You get the scope and the full price in writing before any work starts." },
  { title: "Build with regular demos", text: "You see working software as it grows, and tell us what to change." },
  { title: "Launch and support", text: "We go live together and stay around afterwards." },
];
