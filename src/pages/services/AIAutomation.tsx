import { Clock, AlertTriangle, TrendingUp, MessageSquare, FileText, Database, Mail, Share2, FileSearch, Bot, Workflow, Brain } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AIAutomationIllustration } from "@/components/illustrations";
import SEO from "@/components/SEO";

export default function AIAutomation() {
  return (
    <>
      <SEO
        title="AI Automation Services for Businesses in Odisha | LogiSaar"
        description="Custom AI automation for businesses in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. WhatsApp automation, invoice generation, lead nurturing, workflow automation. Save 20+ hours/week. LogiSaar: +91 78150 14638"
        keywords="AI automation Odisha, business automation Bhubaneswar, WhatsApp automation Cuttack, workflow automation Odisha, AI automation Bhadrak, business automation Rourkela, n8n automation Odisha, LogiSaar"
        canonical="https://www.logisaar.in/services/ai-automation"
      />
      <ServicePageLayout
        hero={{
          badge: "AI & Workflow Automation",
          h1: "AI Automation for Odisha Businesses",
          h2: "Automate Repetitive Tasks — Save 20+ Hours Every Week",
          body: "From WhatsApp automation to invoice generation, lead nurturing to report creation — we build custom AI workflows that run your business on autopilot.",
          waMessage: "Hi LogiSaar, I want AI Automation for my business.",
        }}
        illustration={<AIAutomationIllustration />}
        painPoints={[
          { icon: Clock, title: "Your team wastes hours on repetitive tasks", description: "Data entry, follow-up messages, report generation — all can be automated to free your team for real work." },
          { icon: AlertTriangle, title: "Human errors cost you clients and money", description: "Manual processes cause mistakes. AI automation is consistent, error-free and available 24/7." },
          { icon: TrendingUp, title: "Your competitors are already automating", description: "Businesses using AI automation outperform manual-process competitors by 3x in productivity." },
        ]}
        features={[
          { icon: MessageSquare, name: "WhatsApp Business Automation", desc: "Automate replies, follow-ups, order confirmations and broadcasts on WhatsApp Business API." },
          { icon: FileText, name: "Automated Invoice & Report Generation", desc: "Generate professional invoices and business reports automatically triggered by your workflows." },
          { icon: Database, name: "Google Sheets / CRM Data Sync", desc: "Keep all your data synchronized across Google Sheets, CRMs and other business tools automatically." },
          { icon: Mail, name: "Email Drip Campaign Automation", desc: "Nurture leads and customers with automated email sequences triggered by their behavior." },
          { icon: Bot, name: "Chatbot for Website & WhatsApp", desc: "AI chatbot trained on your business that handles enquiries, bookings and support 24/7." },
          { icon: Workflow, name: "Custom Workflow Builder", desc: "Using n8n, Make or custom Python — we build workflows tailored to your exact business process." },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "₹20,000",
            features: ["2-3 workflow automations", "WhatsApp or email automation", "Google Sheets integration", "Basic chatbot", "30-day support", "Documentation provided"],
          },
          {
            name: "Professional",
            price: "₹50,000",
            features: ["Full business automation suite", "WhatsApp + Email + CRM", "Invoice automation", "Lead nurturing", "Social media auto-posting", "Analytics dashboard"],
          },
          {
            name: "Enterprise",
            price: "₹90,000",
            features: ["Custom AI model training", "Dedicated automation engineer", "Unlimited workflows", "API integrations", "Document processing", "Monthly maintenance", "Priority support"],
          },
        ]}
        faqs={[
          { q: "What tools do you use for automation?", a: "We use n8n, Make (Integromat), custom Python scripts, and OpenAI APIs depending on your specific requirements." },
          { q: "Do I need technical knowledge to use it?", a: "No. We build everything and hand it over ready to use with simple controls — no technical knowledge needed." },
          { q: "Can you automate my WhatsApp Business?", a: "Yes, WhatsApp Business API automation is one of our most popular services for Odisha businesses." },
          { q: "How long does it take to build?", a: "Simple automations take 1-2 weeks. Complex multi-step workflows with custom AI take 4-6 weeks." },
          { q: "What if something breaks?", a: "All automation packages include 30-day post-launch support and optional monthly maintenance to ensure everything runs smoothly." },
        ]}
      />
    </>
  );
}
