import { PhoneMissed, DollarSign, Moon, Phone, MessageSquare, CalendarCheck, HelpCircle, FileText, Zap, Users, Languages, BarChart } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AIReceptionistIllustration } from "@/components/illustrations";
import SEO from "@/components/SEO";

export default function AIReceptionist() {
  return (
    <>
      <SEO
        title="AI Receptionist for Businesses in Odisha | LogiSaar"
        description="24/7 AI receptionist for clinics, hotels, salons and businesses in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. Handle calls, bookings and WhatsApp enquiries automatically. LogiSaar: +91 78150 14638"
        keywords="AI receptionist Odisha, virtual receptionist Bhubaneswar, AI voice assistant Cuttack, automated call handling Odisha, AI receptionist Bhadrak, virtual receptionist Rourkela, AI chatbot receptionist Odisha, LogiSaar"
        canonical="https://www.logisaar.in/services/ai-receptionist"
      />
      <ServicePageLayout
        hero={{
          badge: "24/7 AI-Powered Customer Handling",
          h1: "AI Receptionist for Your Business",
          h2: "Handle Calls, Bookings & FAQs — 24/7, Without Hiring Staff",
          body: "Your AI Receptionist answers calls, books appointments, handles WhatsApp enquiries and never takes a day off. Perfect for clinics, hotels, salons and businesses in Odisha.",
          waMessage: "Hi LogiSaar, I want an AI Receptionist for my business.",
        }}
        illustration={<AIReceptionistIllustration />}
        painPoints={[
          { icon: PhoneMissed, title: "Missed calls = missed revenue", description: "Every unanswered call is a potential customer going to your competitor — especially after hours." },
          { icon: DollarSign, title: "Hiring a receptionist costs ₹15,000+/month", description: "AI does the same job — answering, booking, and following up — at a fraction of the cost." },
          { icon: Moon, title: "No one to handle after-hours enquiries", description: "Customers enquire at night and weekends — you miss them all without 24/7 coverage." },
        ]}
        features={[
          { icon: Phone, name: "24/7 AI Voice Call Handling", desc: "Answers every call professionally, collects information and books appointments automatically." },
          { icon: MessageSquare, name: "WhatsApp Auto-Reply & Booking", desc: "Responds to WhatsApp enquiries instantly with smart, context-aware replies." },
          { icon: CalendarCheck, name: "Appointment Scheduling & Calendar Sync", desc: "Books appointments directly into your Google Calendar without any manual effort." },
          { icon: HelpCircle, name: "FAQ Answering (trained on your business)", desc: "Answers your most common questions trained on your specific services, pricing and policies." },
          { icon: FileText, name: "Call Transcription & Summary", desc: "Every call is transcribed and summarized so you never miss important details." },
          { icon: Languages, name: "Multi-Language Support", desc: "Handles English and basic Odia — full Odia language model available in Enterprise plan." },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "₹20,000",
            period: " setup + ₹4,000/mo",
            features: ["WhatsApp auto-reply", "Appointment booking", "FAQ answering", "Lead capture", "Daily activity reports", "30-day support"],
          },
          {
            name: "Professional",
            price: "₹40,000",
            period: " setup + ₹7,000/mo",
            features: ["Everything in Starter", "24/7 AI voice calls", "Call transcription", "Google Calendar sync", "Escalation to human staff", "Multi-language support"],
          },
          {
            name: "Enterprise",
            price: "₹70,000",
            period: " setup + ₹10,000/mo",
            features: ["Custom AI persona", "Full Odia language model", "CRM integration", "Analytics dashboard", "API access", "Dedicated account manager"],
          },
        ]}
        faqs={[
          { q: "Can it understand Odia language?", a: "Basic Odia support is available. Full Odia language model training is available in the Enterprise plan." },
          { q: "How does it handle complex questions?", a: "It answers from a knowledge base trained on your business. Complex queries are escalated to your human staff immediately." },
          { q: "Will customers know it is AI?", a: "That is your choice. We can configure it to be transparent about being AI or to blend naturally as a branded assistant." },
          { q: "What businesses is this best for?", a: "Clinics, hospitals, salons, hotels, real estate agencies, coaching centers — any business that receives regular enquiry calls." },
          { q: "How long does setup take?", a: "Typically 2-3 weeks including knowledge base training, testing and go-live." },
        ]}
      />
    </>
  );
}
