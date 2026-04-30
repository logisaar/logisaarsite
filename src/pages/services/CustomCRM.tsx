import { DollarSign, Settings, UserX, Users, KanbanSquare, Bell, Mail, SlidersHorizontal, Shield, FileText, BarChart, Smartphone } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { CRMIllustration } from "@/components/illustrations";
import SEO from "@/components/SEO";

export default function CustomCRM() {
  return (
    <>
      <SEO
        title="Custom CRM Development in Odisha | LogiSaar"
        description="Own your CRM forever. We build fully custom CRM systems for businesses in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. Replace Zoho and Salesforce with a CRM built exactly for your workflow. LogiSaar: +91 78150 14638"
        keywords="custom CRM Odisha, CRM development Bhubaneswar, sales CRM Cuttack, business CRM software Odisha, custom CRM Bhadrak, CRM software Rourkela, replace Zoho CRM Odisha, LogiSaar"
        canonical="https://www.logisaar.in/services/custom-crm"
      />
      <ServicePageLayout
        hero={{
          badge: "Own It Forever — No Monthly Fees",
          h1: "Custom CRM Built for Your Business",
          h2: "Manage Leads, Sales Pipeline & Clients — All in One Place",
          body: "Stop paying monthly fees for Salesforce or Zoho. We build a fully custom CRM that fits your exact workflow, team size and industry — owned by you, forever.",
          waMessage: "Hi LogiSaar, I want a Custom CRM for my business.",
        }}
        illustration={<CRMIllustration />}
        painPoints={[
          { icon: DollarSign, title: "Generic CRMs charge monthly fees forever", description: "Salesforce, Zoho and HubSpot cost ₹3,000–₹30,000/month forever. A custom CRM pays for itself in under a year." },
          { icon: Settings, title: "Off-the-shelf CRMs don't fit your workflow", description: "You end up adapting your entire business process to the software instead of the other way around." },
          { icon: UserX, title: "Your sales team avoids using the CRM", description: "Complex tools with bad UX get abandoned. A purpose-built CRM that matches your team's workflow gets used daily." },
        ]}
        features={[
          { icon: Users, name: "Lead & Contact Management", desc: "Complete lead lifecycle from capture to close — with full contact history and communication log." },
          { icon: KanbanSquare, name: "Visual Sales Pipeline (Kanban Board)", desc: "Drag-and-drop deals across stages — see your entire pipeline at a glance." },
          { icon: Bell, name: "Task & Follow-Up Reminders", desc: "Never forget a follow-up — automated reminders for calls, meetings and tasks." },
          { icon: Mail, name: "Email & WhatsApp Integration", desc: "Send emails and WhatsApp messages directly from the CRM with full conversation history." },
          { icon: SlidersHorizontal, name: "Custom Fields for Your Industry", desc: "Add fields specific to your business — property size, medical records, case numbers, whatever you need." },
          { icon: BarChart, name: "Reports & Revenue Analytics", desc: "Real-time dashboards showing pipeline value, conversion rates, team performance and revenue trends." },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "₹45,000",
            features: ["Up to 5 users", "Lead & contact management", "Visual pipeline board", "Task reminders", "Basic reports", "Excel import/export", "Full source code"],
          },
          {
            name: "Professional",
            price: "₹75,000",
            features: ["Up to 20 users", "WhatsApp & email integration", "Custom fields", "Invoice generation", "Advanced analytics", "Role-based access", "Mobile responsive"],
          },
          {
            name: "Enterprise",
            price: "₹1,20,000",
            features: ["Unlimited users", "AI features", "Custom modules", "API integrations", "Mobile app (optional +₹30K)", "Priority support", "Full source code handover"],
          },
        ]}
        faqs={[
          { q: "Who owns the CRM after it is built?", a: "You own it 100%. Full source code handover is included — you are never dependent on us to run your business." },
          { q: "Can it replace Zoho or HubSpot?", a: "Yes, for most small to mid-size businesses, a custom CRM does everything Zoho does — without the monthly fees." },
          { q: "Can we add more features later?", a: "Yes, the system is built modularly so new features, modules and integrations can be added at any time." },
          { q: "Does it work on mobile?", a: "Fully responsive on all devices. A dedicated native mobile app can be added for ₹30,000 extra." },
          { q: "How long does implementation take?", a: "6-8 weeks for full build, testing, customization and team training — then you are fully live." },
        ]}
      />
    </>
  );
}
