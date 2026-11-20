import { BookOpen, Briefcase, Building2, Compass, Sparkles, Wrench } from "lucide-react";
import { Bot, GraduationCap, School, Search, Share2, Users, Video } from "lucide-react";

// IKURO is in development (pre-pilot). Source: the IKURO founder deck v1.0 (project brief).
// TODO(owner): confirm every statement on the IKURO page against the founder deck before launch.

/** Set to true only after the owner confirms the plans. */
export const SHOW_IKURO_PRICING = false; // TODO(owner): confirm pricing before showing

export const IKURO_PLANS = [
  { name: "Free", price: "₹0", note: "Start with the basics", items: ["Goal and interest profile", "Starter recommendations"] },
  { name: "Pro", price: "₹149 a month", alt: "or ₹999 a year", note: "Planned", items: ["Deeper reasoning on your options", "Progress reflection and follow-ups"] },
];

export const IKURO_PILOT_STATUS = "In development · pilot with first-year engineering students";

export const PROBLEM_TABS = [
  { id: "video", label: "Videos", icon: Video, x: 4, y: 12, r: -4 },
  { id: "chatbot", label: "Chatbots", icon: Bot, x: 60, y: 6, r: 3 },
  { id: "jobs", label: "Job boards", icon: Briefcase, x: 30, y: 28, r: -2 },
  { id: "intern", label: "Internship portals", icon: GraduationCap, x: 62, y: 38, r: 4 },
  { id: "seniors", label: "Seniors", icon: Users, x: 3, y: 52, r: 3 },
  { id: "search", label: "Search", icon: Search, x: 38, y: 60, r: -3 },
  { id: "social", label: "Social media", icon: Share2, x: 66, y: 70, r: 2 },
  { id: "coaching", label: "Coaching classes", icon: School, x: 12, y: 78, r: -2 },
];

export const LOOP_STEPS = [
  { title: "Understand", text: "Learns your goals, interests and limits." },
  { title: "Reason", text: "Weighs your options against that context." },
  { title: "Recommend", text: "Suggests a next step you can act on." },
  { title: "Reflect", text: "Looks at what worked and what did not." },
  { title: "Grow", text: "Builds on it as you learn." },
];

export const DECISIONS = [
  { title: "Course", text: "Which course fits your goals and strengths.", icon: BookOpen },
  { title: "College", text: "Which college is worth your time and money.", icon: Building2 },
  { title: "Skills", text: "Which skills to learn first, and in what order.", icon: Wrench },
  { title: "AI tools", text: "Which AI tools actually help your work.", icon: Sparkles },
  { title: "Internships", text: "Where to apply, and how to get ready.", icon: Briefcase },
  { title: "Career", text: "Which path to take, with the trade-offs laid out.", icon: Compass },
];
