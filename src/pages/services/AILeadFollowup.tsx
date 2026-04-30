import { Timer, UserX, TrendingDown, MessageSquare, Mail, Phone, Award, Database, Clock, Sparkles, BarChart, UserCheck } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AILeadIllustration } from "@/components/illustrations";
import SEO from "@/components/SEO";

export default function AILeadFollowup() {
  return (
    <>
      <SEO
        title="AI Lead Follow-Up System for Businesses in Odisha | LogiSaar"
        description="Automate lead follow-up via WhatsApp, email and voice calls. Never lose a lead again. AI-powered sales automation for businesses in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. LogiSaar: +91 78150 14638"
        keywords="AI lead follow-up Odisha, sales automation Bhubaneswar, WhatsApp automation Odisha, CRM automation Cuttack, AI lead system Bhadrak, AI sales automation Rourkela, AI sales system Odisha, LogiSaar"
        canonical="https://www.logisaar.in/services/ai-lead-followup"
      />
      <ServicePageLayout
        hero={{
          badge: "AI-Powered Sales Automation",
          h1: "AI-Powered Lead Follow-Up System",
          h2: "Never Lose a Lead Again — Automate Follow-Ups via WhatsApp, Email & Call",
          body: "Your AI system follows up with every new lead instantly — 24/7, without a salesperson. Convert more leads while you sleep.",
          waMessage: "Hi LogiSaar, I want an AI Lead Follow-Up System for my business.",
        }}
        illustration={<AILeadIllustration />}
        painPoints={[
          { icon: Timer, title: "Leads go cold within hours", description: "78% of customers buy from whoever responds first. Manual follow-up is always too slow to compete." },
          { icon: UserX, title: "Sales team forgets follow-ups", description: "Leads fall through the cracks when your team is busy or overwhelmed with other work." },
          { icon: TrendingDown, title: "No follow-up system = lost revenue", description: "Every ignored lead is money left on the table. On average, businesses lose 60% of leads to no follow-up." },
        ]}
        features={[
          { icon: MessageSquare, name: "Instant WhatsApp Follow-Up on New Lead", desc: "Within seconds of a lead submitting a form, they receive a personalized WhatsApp message." },
          { icon: Mail, name: "Automated Email Drip Sequences", desc: "Multi-step email sequences that nurture leads over days and weeks automatically." },
          { icon: Phone, name: "AI Voice Call Follow-Up", desc: "Optional AI voice calls that check in with leads who haven't responded to messages." },
          { icon: Award, name: "Lead Scoring & Priority Tagging", desc: "AI identifies hot leads based on behavior and flags them for your sales team." },
          { icon: Database, name: "CRM Integration", desc: "Integrates with Google Sheets, HubSpot, Zoho or any custom CRM you already use." },
          { icon: UserCheck, name: "Handoff to Human Sales Rep", desc: "The system detects buying intent and automatically alerts your rep to take over." },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "₹25,000",
            period: " setup + ₹5,000/mo",
            features: ["WhatsApp automation", "Email drip sequences", "Google Sheets CRM", "Lead capture forms", "Basic analytics", "30-day support"],
          },
          {
            name: "Professional",
            price: "₹45,000",
            period: " setup + ₹8,000/mo",
            features: ["Everything in Starter", "AI voice call follow-up", "CRM integration (Zoho/HubSpot)", "Lead scoring", "Multi-channel sequencing", "Conversion analytics"],
          },
          {
            name: "Enterprise",
            price: "₹80,000",
            period: " setup + ₹12,000/mo",
            features: ["Custom AI model", "Full analytics dashboard", "Unlimited leads/month", "Custom integrations", "A/B message testing", "Dedicated account manager"],
          },
        ]}
        faqs={[
          { q: "How fast does the AI respond to a new lead?", a: "Within seconds of a lead submitting a form or contacting you — faster than any human salesperson can respond." },
          { q: "Will it feel robotic to my customers?", a: "No. Messages are personalized with the customer's name and context, sounding natural and human." },
          { q: "Can it integrate with my existing CRM?", a: "Yes, we integrate with Google Sheets, HubSpot, Zoho, or any custom CRM you are using." },
          { q: "What if I want a human to take over?", a: "The system detects buying intent and automatically alerts your sales rep to take over the conversation." },
          { q: "Is there a free trial?", a: "We offer a 7-day demo setup so you can see it working with your real leads before committing." },
        ]}
      />
    </>
  );
}
