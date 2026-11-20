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
