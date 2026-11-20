import { CONTACT, whatsappLink } from "@/lib/contact";

export interface LogiReply {
  text: string;
  quick?: string[];
  /** a link chip shown under the reply: internal route or external url */
  link?: { label: string; to?: string; href?: string };
}

export const MAIN_OPTIONS = ["I need software", "I want an AI agent", "Automate my work", "Just looking around"];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Keyword match on word starts, so "hi" never matches "this" and "app" never matches "happy". */
const makeHas = (q: string) => {
  const s = q.toLowerCase();
  return (...words: string[]) => words.some((w) => new RegExp(`\\b${escapeRe(w)}`).test(s));
};

/**
 * Simple keyword answers. Swap this function for a real AI agent later:
 * keep the (question) => LogiReply contract and the rest of the widget stays the same.
 */
export function answer(question: string): LogiReply {
  const has = makeHas(question);
  const s = question.toLowerCase().trim();

  if (has("human", "talk to", "contact", "email", "phone", "whatsapp", "call you", "call us")) {
    return {
      text: `Happy to connect you with the team. Message us on WhatsApp or email ${CONTACT.email}.`,
      link: { label: "Chat on WhatsApp", href: whatsappLink("Hi Logisaar, I came from your website and want to discuss a project.") },
    };
  }
  if (/^(hi|hello|hey|namaste)\b/.test(s)) {
    return { text: "Hello! What brings you to Logisaar today?", quick: MAIN_OPTIONS };
  }
  if (has("school", "college", "institute", "coaching")) {
    return {
      text: "Our School ERP handles admissions, fees, attendance alerts and exams. It starts from ₹35,000 and we customise it for you.",
      quick: ["What does it cost?", "Talk to a human"],
      link: { label: "See the School ERP", to: "/solutions/ai-powered-school-erp" },
    };
  }
  if (has("hotel", "restaurant", "resort", "stay")) {
    return {
      text: "Our hotel system keeps bookings, housekeeping and billing in sync. Pair it with an AI receptionist so no booking call is missed.",
      quick: ["Tell me about AI agents", "Talk to a human"],
      link: { label: "See the hotel system", to: "/solutions/hotel-management-system" },
    };
  }
  if (has("clinic", "doctor", "hospital", "health")) {
    return {
      text: "Clinics love our AI receptionist. It answers calls, books appointments and sends reminders, even at night.",
      quick: ["What does it cost?", "Talk to a human"],
      link: { label: "See the AI receptionist", to: "/solutions/ai-receptionist" },
    };
  }
  if (has("agent", "receptionist", "chatbot", "voice", "tell me about ai", "ai agent")) {
    return {
      text: "AI agents are my cousins! They answer calls and chats, qualify leads, book slots and follow up. Ours start from ₹20,000.",
      quick: ["How long does it take?", "Talk to a human"],
      link: { label: "See AI agents", to: "/solutions/ai-receptionist" },
    };
  }
  if (has("automat", "workflow", "invoice", "repetitive", "excel", "manual")) {
    return {
      text: "Tell us the one task your team repeats every day. We connect your tools so invoices, reminders and reports happen on their own.",
      quick: ["What does it cost?", "Talk to a human"],
      link: { label: "See automation", to: "/solutions/ai-automation" },
    };
  }
  if (has("ai software", "document", "assistant", "data", "analytics", "report")) {
    return {
      text: "We build AI tools on your own data: reading documents, answering team questions and turning numbers into reports.",
      quick: ["Talk to a human"],
      link: { label: "See our solutions", to: "/solutions" },
    };
  }
  if (has("need software", "software", "app", "website", "erp", "crm", "portal", "mobile")) {
    return {
      text: "Nice. We build web apps, mobile apps, ERP and CRM systems around how your team already works. What kind of business is it for?",
      quick: ["School or college", "Hotel or restaurant", "Clinic", "Something else"],
      link: { label: "Browse solutions", to: "/solutions" },
    };
  }
  if (has("cost", "price", "pricing", "budget", "charge", "how much", "rate")) {
    return {
      text: "Ready-made systems start from ₹12,000 and AI agents from ₹20,000. After a free call you get a fixed quote in writing, so there are no surprises later.",
      quick: ["Talk to a human", "How long does it take?"],
    };
  }
  if (has("long", "time", "timeline", "when", "fast")) {
    return {
      text: "It depends on scope. You get a fixed timeline before we start.",
      quick: ["Talk to a human"],
    };
  }
  if (has("heylane", "local", "shop", "loyalty")) {
    return {
      text: "HeyLane is our own hyperlocal super app. Discover nearby places, chat with businesses and earn loyalty rewards.",
      quick: ["What is IKURO?", "Talk to a human"],
      link: { label: "Visit HeyLane", href: "https://heylane.in" },
    };
  }
  if (has("ikuro", "student", "career guidance", "chalk")) {
    return {
      text: "IKURO is our AI platform that helps students make better course, college and career decisions. Chalk to Choice is part of it.",
      quick: ["What is HeyLane?", "Talk to a human"],
      link: { label: "Visit IKURO", to: "/ikuro" },
    };
  }
  if (has("job", "hir", "career", "intern", "work with", "vacanc", "apply", "join")) {
    return {
      text: "We're hiring in Bhubaneswar! Business Development Associates and a Content Creator & Graphic Designer. Freshers are welcome.",
      quick: ["Talk to a human"],
      link: { label: "See open roles", to: "/careers#apply" },
    };
  }
  if (has("where", "location", "usa", "canada", "india", "bhubaneswar", "office")) {
    return { text: "We're based in Bhubaneswar, Odisha, and work with businesses in India and abroad.", quick: MAIN_OPTIONS };
  }
  if (has("just looking", "browse", "nothing")) {
    return { text: "Take your time! I'll follow you around. Drag me if I get in the way, or click me anytime." };
  }
  if (has("who are you", "what are you", "logi")) {
    return { text: "I'm Logi, made of dots and good intentions. Logisaar builds AI agents for real, I'm just the friendly one.", quick: MAIN_OPTIONS };
  }
  return {
    text: "I'm a simple helper, so I may have missed that. The team can answer anything.",
    quick: MAIN_OPTIONS,
    link: { label: "Ask on WhatsApp", href: whatsappLink(`Hi Logisaar, I have a question: ${question}`) },
  };
}
