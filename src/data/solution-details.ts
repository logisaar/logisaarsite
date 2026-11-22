import {
  AlertTriangle, Award, Banknote, Bell, BarChart, Bot, CalendarCheck, CalendarDays, Clock, CreditCard, Database, DollarSign,
  EyeOff, FileText, Ghost, Globe, HelpCircle, Image, KanbanSquare, Languages, Layout, Mail, MessageCircle, MessageSquare,
  Moon, PenLine, Phone, PhoneMissed, QrCode, Receipt, RefreshCw, Search, Settings, Shirt, ShoppingCart, SlidersHorizontal,
  Star, Timer, TrendingDown, TrendingUp, UserCheck, UserCircle, UserPlus, UserX, Users, Workflow, XCircle, AlertOctagon, Building2, Eye, BookOpen,
  type LucideIcon,
} from "lucide-react";
import { claim } from "@/data/solutions";

/**
 * Content for the nine solution detail pages (template: src/components/solutions/SolutionDetail.tsx).
 * Keyed by the id in src/data/solutions.ts, which owns the name, outcome, starting price and WhatsApp text.
 *
 * Rules (round 11): no ratings, stars, guarantees, support periods, delivery times or percentages we cannot prove.
 * Anything that was on the old pages and is not confirmed is either removed or goes through `claim()` (CLAIMS.md).
 * "Works with" chips only name tools the old pages already listed publicly.
 */

export type DemoKind = "orders" | "receptionist" | "workflow" | "docs";

export interface SolutionDetailContent {
  /** SEO */
  seo: { title: string; description: string; keywords: string };
  /** eyebrow: who it is for */
  audience: string;
  /** hero title, sentence case */
  h1: string;
  /** a real product screenshot (the shared image group "mockups"), else the demo-kit demo */
  mockup?: "school-erp" | "hotel-management" | "ai-receptionist" | "smart-crm";
  demo: DemoKind;
  problems: { icon: LucideIcon; title: string; text: string }[];
  features: { icon: LucideIcon; title: string; text: string }[];
  worksWith: string[];
  faqs: { q: string; a: string }[];
}

const QUOTE = "Scope, price and timeline are written into your quote after a free call.";

export const SOLUTION_DETAILS: Record<string, SolutionDetailContent> = {
  "school-management": {
    seo: {
      title: "AI-Powered School ERP in Odisha | LogiSaar",
      description: "Custom AI-powered School ERP software for schools, colleges, and coaching centers in Bhubaneswar, Cuttack, Bhadrak, Rourkela, and across Odisha. Manage attendance, fees, results, and parents from one dashboard.",
      keywords: "AI-powered school ERP Odisha, school ERP software Bhubaneswar, college ERP system Cuttack, student management software Bhadrak, school ERP Rourkela, school ERP Bhadrak, school software Rourkela, LogiSaar",
    },
    audience: "Schools, colleges and coaching centres",
    h1: "AI-powered school ERP",
    mockup: "school-erp",
    demo: "docs",
    problems: [
      { icon: Clock, title: "Attendance takes teachers' time", text: "Marking registers by hand pulls teachers away from the class." },
      { icon: Banknote, title: "Fee collection is hard to track", text: "Nobody can see at a glance who has paid, so follow-ups and revenue slip." },
      { icon: EyeOff, title: "Parents are left guessing", text: "Results, attendance and notices reach them late, or not at all." },
    ],
    features: [
      { icon: UserPlus, title: "Admissions and student profiles", text: "Each student's records from admission onwards, kept in one digital file." },
      { icon: Bell, title: "Attendance with WhatsApp alerts", text: "Mark attendance on a phone and let parents know through WhatsApp or SMS." },
      { icon: CreditCard, title: "Fee collection and tracking", text: "Online and offline fees, receipts, and reminders for overdue payments." },
      { icon: FileText, title: "Exam results and report cards", text: "Process results and print report cards without re-typing marks." },
      { icon: CalendarDays, title: "Timetable and scheduling", text: "Classes, teachers and rooms planned without clashes." },
      { icon: MessageSquare, title: "Parent communication portal", text: "One place for parents to see attendance, results, fees and notices." },
    ],
    worksWith: ["WhatsApp", "SMS", "Online payments", "Your existing student sheets (data migration)"],
    faqs: [
      { q: "Can it handle more than one branch?", a: "Yes. Tell us how many campuses you run and we will scope a single dashboard across them." },
      { q: "Will parents get automatic updates?", a: "Yes. Attendance, fee reminders and results can go out to parents by WhatsApp or SMS." },
      { q: "Will you train our staff?", a: "Yes. Onboarding for admin staff and teachers is part of the project. " + QUOTE },
    ],
  },

  "hotel-management": {
    seo: {
      title: "Hotel Management System in Odisha | LogiSaar",
      description: "Custom hotel management software for hotels, resorts and homestays in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. Online booking, billing, housekeeping and guest management.",
      keywords: "hotel management system Odisha, resort software Bhubaneswar, hotel booking system Cuttack, property management software Odisha, hotel software Bhadrak, hotel management system Rourkela, hospitality software Odisha, LogiSaar",
    },
    audience: "Hotels, resorts and homestays",
    h1: "Hotel and resort management system",
    mockup: "hotel-management",
    demo: "orders",
    problems: [
      { icon: XCircle, title: "Double bookings cost you guests", text: "Without one live room calendar, two people can be promised the same room." },
      { icon: AlertTriangle, title: "Manual billing slows checkout", text: "Writing invoices by hand keeps guests waiting and invites mistakes." },
      { icon: Globe, title: "Guests who book online go elsewhere", text: "If you have no booking channel of your own, those guests book with someone who does." },
    ],
    features: [
      { icon: CalendarCheck, title: "Room booking calendar", text: "Live availability that stops one room being booked twice." },
      { icon: Globe, title: "Online booking", text: "Take direct bookings from your own website." },
      { icon: Building2, title: "Check-in and check-out", text: "Digital check-in and check-out, with room status updating on its own." },
      { icon: Receipt, title: "Invoices and billing", text: "Itemised invoices with tax and payment tracking." },
      { icon: Shirt, title: "Housekeeping tasks", text: "Assign room cleaning and see its status as it happens." },
      { icon: UserCircle, title: "Guest profiles and history", text: "Keep each guest's preferences and past stays in one record." },
    ],
    worksWith: ["Your website", "WhatsApp confirmations", "OTA channels (scoped per project)"],
    faqs: [
      { q: "Can guests book from my website?", a: "Yes. A booking engine can be added to your website so guests see live availability." },
      { q: "Is it too much for a small homestay?", a: "No. We build the right-sized version for the property you run. " + QUOTE },
      { q: "How is guest data kept safe?", a: claim("hotel-uptime") },
    ],
  },

  "ai-lead-followup": {
    seo: {
      title: "AI Lead Follow-Up System for Businesses in Odisha | LogiSaar",
      description: "Automate lead follow-up via WhatsApp, email and voice calls. AI-powered sales automation for businesses in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha.",
      keywords: "AI lead follow-up Odisha, sales automation Bhubaneswar, WhatsApp automation Odisha, CRM automation Cuttack, AI lead system Bhadrak, AI sales automation Rourkela, AI sales system Odisha, LogiSaar",
    },
    audience: "Sales teams and small businesses",
    h1: "AI lead follow-up system",
    demo: "receptionist",
    problems: [
      { icon: Timer, title: "Leads go cold", text: claim("lead-78") },
      { icon: UserX, title: "Follow-ups get forgotten", text: "Leads fall through the cracks when your team is busy." },
      { icon: TrendingDown, title: "No system means lost revenue", text: claim("lead-60") },
    ],
    features: [
      { icon: MessageSquare, title: "Instant WhatsApp follow-up", text: "A new lead gets a personal WhatsApp message within moments." },
      { icon: Mail, title: "Email sequences", text: "Multi-step emails that follow up over days and weeks." },
      { icon: Phone, title: "Optional AI voice call", text: "A call to leads who have not replied to messages." },
      { icon: Award, title: "Lead scoring", text: "Hot leads are flagged so your team calls them first." },
      { icon: Database, title: "Works with your CRM", text: "Connects to the sheet or CRM you already use." },
      { icon: UserCheck, title: "Hand-off to a person", text: "When a lead shows interest, your rep is alerted to take over." },
    ],
    worksWith: ["WhatsApp", "Email", "Google Sheets", "HubSpot", "Zoho", "Custom CRMs"],
    faqs: [
      { q: "How fast does it respond to a new lead?", a: "Within moments of a form submission or enquiry, because it is automatic." },
      { q: "Will it sound robotic?", a: "Messages carry the customer's name and context. We review the wording with you before launch." },
      { q: "Can it connect to our CRM?", a: "Usually, yes. Tell us which CRM or sheet you use and we will confirm how it connects." },
    ],
  },

  "ai-receptionist": {
    seo: {
      title: "AI Receptionist for Businesses in Odisha | LogiSaar",
      description: "AI receptionist for clinics, hotels, salons and businesses in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. Handle calls, bookings and WhatsApp enquiries automatically.",
      keywords: "AI receptionist Odisha, virtual receptionist Bhubaneswar, AI voice assistant Cuttack, automated call handling Odisha, AI receptionist Bhadrak, virtual receptionist Rourkela, AI chatbot receptionist Odisha, LogiSaar",
    },
    audience: "Clinics, hotels, salons and service businesses",
    h1: "AI receptionist for your business",
    mockup: "ai-receptionist",
    demo: "receptionist",
    problems: [
      { icon: PhoneMissed, title: "Missed calls are missed customers", text: "An unanswered call, especially after hours, often goes to a competitor." },
      { icon: DollarSign, title: claim("receptionist-cost-title"), text: claim("receptionist-cost-desc") },
      { icon: Moon, title: "Nobody answers at night", text: "Customers enquire in the evening and at weekends, when your desk is empty." },
    ],
    features: [
      { icon: Phone, title: "Voice call handling", text: "Answers calls, collects details and books the appointment." },
      { icon: MessageSquare, title: "WhatsApp replies and booking", text: "Replies to WhatsApp enquiries straight away with context-aware answers." },
      { icon: CalendarCheck, title: "Calendar booking", text: "Books into your Google Calendar without manual effort." },
      { icon: HelpCircle, title: "Answers from your business", text: "Trained on your own services, prices and policies." },
      { icon: FileText, title: "Call summaries", text: "Each call is written up so you do not lose the details." },
      { icon: Languages, title: "Languages", text: claim("odia-feature") },
    ],
    worksWith: ["WhatsApp", "Google Calendar", "Phone calls", "Your own FAQs and policies"],
    faqs: [
      { q: "Which languages does it support?", a: claim("odia-faq") },
      { q: "What happens with a question it cannot answer?", a: "It passes the conversation to your team. You decide what counts as a hand-off." },
      { q: "Will customers know it is an AI?", a: "That is your choice. We can set it up to say so openly." },
    ],
  },

  "proposal-software": {
    seo: {
      title: "Proposal Software for Freelancers in India | LogiSaar",
      description: "Send branded proposals with digital signatures and payment links. Built for Indian freelancers and agencies.",
      keywords: "proposal software India, freelancer proposal tool, digital proposal software Odisha, e-signature proposal India, client proposal software freelancer, LogiSaar",
    },
    audience: "Freelancers and agencies",
    h1: "Proposal software for freelancers and agencies",
    demo: "docs",
    problems: [
      { icon: Ghost, title: "Proposals get ignored", text: claim("proposal-3x") },
      { icon: Clock, title: "Writing each one takes hours", text: "Rebuilding the same proposal for every client eats billable time." },
      { icon: Eye, title: "You cannot tell if it was opened", text: "Without read tracking you do not know when to follow up." },
    ],
    features: [
      { icon: Layout, title: "Branded templates", text: "Your logo, colours and fonts on every proposal." },
      { icon: DollarSign, title: "Pricing packages", text: "Clients pick a package inside the proposal, with no email back-and-forth." },
      { icon: PenLine, title: "Digital signatures", text: claim("esign-feature") },
      { icon: Eye, title: "Read tracking", text: "See when a proposal is opened and which sections get read." },
      { icon: Bell, title: "Follow-up reminders", text: "A nudge when a proposal has had no reply for a day or two." },
      { icon: CreditCard, title: "Payment links", text: "Add a payment link so the client can pay right after approving." },
    ],
    worksWith: ["Razorpay", "PayTM", "Email", "Your own domain"],
    faqs: [
      { q: "Can I use my own branding?", a: "Yes. Your logo, colours and domain can be used so clients see your brand." },
      { q: claim("esign-faq-q"), a: claim("esign-faq-a") },
      { q: "Can clients pay from the proposal?", a: "Yes. A Razorpay or PayTM payment link can sit inside the proposal." },
    ],
  },

  "qr-menu-system": {
    seo: {
      title: "QR Code Digital Menu for Restaurants in Odisha | LogiSaar",
      description: "Replace paper menus with a QR code digital menu. Customers scan, order and pay from their phone. Built for restaurants, cafes and dhabas in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha.",
      keywords: "QR code menu Odisha, digital menu restaurant Bhubaneswar, QR menu system Cuttack, restaurant ordering system Odisha, QR menu Bhadrak, digital menu Rourkela, contactless menu Odisha, LogiSaar",
    },
    audience: "Restaurants, cafés and dhabas",
    h1: "QR code menu for restaurants and cafés",
    demo: "orders",
    problems: [
      { icon: RefreshCw, title: "Paper menus cost to reprint", text: "Every price change or new dish means another print run." },
      { icon: AlertOctagon, title: "Orders get missed at rush hour", text: "Busy hours bring wrong or forgotten orders." },
      { icon: BarChart, title: "You cannot see what sells", text: "Without data, menu decisions are guesswork." },
    ],
    features: [
      { icon: QrCode, title: "A QR code for each table", text: "Customers scan and the menu opens. No app to install." },
      { icon: Image, title: "Menu with photos", text: claim("qr-photos-feature") },
      { icon: RefreshCw, title: "Live menu updates", text: "Change items and prices from the admin panel, with no reprinting." },
      { icon: ShoppingCart, title: "Ordering from the table", text: "Customers order from their phone and the order reaches your kitchen." },
      { icon: CreditCard, title: "UPI payment", text: "Take UPI payments at the table for a faster checkout." },
      { icon: BarChart, title: "Sales and order reports", text: "See best sellers, busy hours and revenue in simple dashboards." },
    ],
    worksWith: ["UPI", "Any phone browser (no app)", "Print-ready QR files"],
    faqs: [
      { q: "Do customers need to install an app?", a: "No. The menu opens in the phone's browser after scanning the QR code." },
      { q: "Can I change prices myself?", a: "Yes. The admin panel lets you update items, prices and photos." },
      { q: "Can I add photos to every dish?", a: claim("qr-photos-faq") },
    ],
  },

  "travel-website": {
    seo: {
      title: "Tours & Travel Website Development in Odisha | LogiSaar",
      description: "Custom travel websites for tour operators and travel agents in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. Online booking, Razorpay payment, SEO for Odisha tourism.",
      keywords: "travel website development Odisha, tour website Bhubaneswar, travel agency website Cuttack, Odisha tourism website, travel website Bhadrak, tour agency website Rourkela, travel booking website Odisha, LogiSaar",
    },
    audience: "Tour operators and travel agents",
    h1: "Tours and travel websites for Odisha",
    demo: "orders",
    problems: [
      { icon: DollarSign, title: "Booking platforms take a cut", text: claim("travel-commission") },
      { icon: Search, title: "Travellers cannot find you", text: "People searching for tours in Puri, Konark or Chilika may never see your name." },
      { icon: MessageCircle, title: "WhatsApp-only booking feels thin", text: "Serious customers expect a booking page, a confirmation and a receipt." },
    ],
    features: [
      { icon: CalendarCheck, title: "Booking and availability calendar", text: "Customers see open dates and book without calling." },
      { icon: CreditCard, title: "Online payments", text: "Take an advance with Razorpay or UPI." },
      { icon: Search, title: "Local SEO setup", text: "Pages set up for the tour and place searches your customers use. Rankings cannot be promised." },
      { icon: Star, title: "Customer reviews", text: "A review section for feedback from past travellers." },
      { icon: BookOpen, title: "Travel blog", text: "A place to publish Odisha travel guides." },
      { icon: Globe, title: "Tour and package listings", text: "Itineraries, prices and photos for each package, editable by you." },
    ],
    worksWith: ["Razorpay", "UPI", "Google search", "WhatsApp"],
    faqs: [
      { q: "Will the site rank on Google?", a: "We set up the SEO foundations for Odisha tour searches. Nobody can promise a ranking, and we will not either." },
      { q: "Can I add tour packages myself?", a: "Yes. The admin panel lets you add, edit and remove packages." },
      { q: "Does it take payments?", a: "Yes. Razorpay and UPI payments can be added. " + QUOTE },
    ],
  },

  "ai-automation-suite": {
    seo: {
      title: "AI Automation Services for Businesses in Odisha | LogiSaar",
      description: "Custom AI automation for businesses in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. WhatsApp automation, invoice generation, lead nurturing, workflow automation. Takes repetitive work off your team.",
      keywords: "AI automation Odisha, business automation Bhubaneswar, WhatsApp automation Cuttack, workflow automation Odisha, AI automation Bhadrak, business automation Rourkela, n8n automation Odisha, LogiSaar",
    },
    audience: "Any business with repetitive work",
    h1: "AI automation for your business",
    demo: "workflow",
    problems: [
      { icon: Clock, title: "Your team repeats the same tasks", text: "Data entry, follow-up messages and reports can run on their own." },
      { icon: AlertTriangle, title: "Manual steps cause mistakes", text: "Automated steps run the same way every time." },
      { icon: TrendingUp, title: "Other teams are already automating", text: claim("automation-3x") },
    ],
    features: [
      { icon: MessageSquare, title: "WhatsApp Business automation", text: "Automate replies, follow-ups, order confirmations and broadcasts." },
      { icon: FileText, title: "Invoices and reports", text: "Invoices and business reports created by your workflows." },
      { icon: Database, title: "Sheets and CRM syncing", text: "Keep Google Sheets, CRMs and other tools in step." },
      { icon: Mail, title: "Email sequences", text: "Automated emails triggered by what a customer does." },
      { icon: Bot, title: "Chatbot for website and WhatsApp", text: "A chatbot trained on your business for enquiries and support." },
      { icon: Workflow, title: "Custom workflows", text: "Built to your own process, not a template." },
    ],
    worksWith: ["WhatsApp Business", "Google Sheets", "Email", "n8n", "Make", "Python", "OpenAI APIs"],
    faqs: [
      { q: "Which tools do you use?", a: "Usually n8n, Make, custom Python and OpenAI APIs, chosen to fit what you need." },
      { q: "Do I need technical knowledge?", a: "No. We build it, hand it over with simple controls and explain how it runs." },
      { q: "What if something breaks?", a: "Support terms, including any after-launch cover, are agreed in your quote before work starts." },
    ],
  },

  "custom-crm": {
    seo: {
      title: "Custom CRM Development in Odisha | LogiSaar",
      description: "Custom CRM systems for businesses in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. A CRM built for your workflow instead of a generic one.",
      keywords: "custom CRM Odisha, CRM development Bhubaneswar, sales CRM Cuttack, business CRM software Odisha, custom CRM Bhadrak, CRM software Rourkela, replace Zoho CRM Odisha, LogiSaar",
    },
    audience: "Sales teams and growing businesses",
    h1: "Custom CRM built for your business",
    mockup: "smart-crm",
    demo: "docs",
    problems: [
      { icon: DollarSign, title: "Generic CRMs charge every month", text: claim("crm-cost") },
      { icon: Settings, title: "Off-the-shelf tools do not fit", text: "You end up bending your process around the software." },
      { icon: UserX, title: "Your team avoids the CRM", text: "Complicated tools get dropped. One shaped to your team's habits gets used." },
    ],
    features: [
      { icon: Users, title: "Leads and contacts", text: "Each lead from capture to close, with its full history." },
      { icon: KanbanSquare, title: "Pipeline board", text: "Drag deals across stages and see the whole pipeline at a glance." },
      { icon: Bell, title: "Task and follow-up reminders", text: "Reminders for calls, meetings and tasks so nothing is forgotten." },
      { icon: Mail, title: "Email and WhatsApp", text: "Message from inside the CRM and keep the conversation on record." },
      { icon: SlidersHorizontal, title: "Fields for your industry", text: "Add the fields your business needs, such as property size or case number." },
      { icon: BarChart, title: "Reports", text: "Pipeline value, conversion and team activity on one screen." },
    ],
    worksWith: ["Email", "WhatsApp", "Google Sheets (data import)"],
    faqs: [
      { q: "Who owns the CRM after it is built?", a: "Ownership and source-code terms are written into your quote before work starts. The aim is a CRM you own." },
      { q: "Can it replace our current CRM?", a: "Often, yes. Tell us what you use today and we will say what to keep, move or replace." },
      { q: "Can we add features later?", a: "Yes. It is built in parts, so new modules can be added later." },
    ],
  },
};
