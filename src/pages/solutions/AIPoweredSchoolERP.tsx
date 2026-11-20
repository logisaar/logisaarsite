import { GraduationCap, Clock, Banknote, EyeOff, UserPlus, Bell, CreditCard, FileText, CalendarDays, Users, MessageSquare, Monitor } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { SchoolIllustration } from "@/components/illustrations";
import SEO from "@/components/SEO";
import { claim, solutionById } from "@/data/solutions";

export default function AIPoweredSchoolERP() {
  return (
    <>
      <SEO
        title="AI-Powered School ERP in Odisha | LogiSaar"
        description="Custom AI-powered School ERP software for schools, colleges, and coaching centers in Bhubaneswar, Cuttack, Bhadrak, Rourkela, and across Odisha. Manage attendance, fees, results, and parents from one dashboard. Contact"
        keywords="AI-powered school ERP Odisha, school ERP software Bhubaneswar, college ERP system Cuttack, student management software Bhadrak, school ERP Rourkela, school ERP Bhadrak, school software Rourkela, LogiSaar"
        canonical="https://www.logisaar.in/solutions/ai-powered-school-erp"
      />
      <ServicePageLayout
        hero={{
          badge: "For Schools, Colleges & Coaching Centers",
          h1: "AI-Powered School ERP",
          h2: "Built for Odisha Schools, Colleges & Coaching Centers",
          body: "Manage students, admissions, grading, smart fee collection, WhatsApp messaging, and AI attendance — all from one powerful ERP dashboard built custom for your institution.",
          waMessage: "Hi LogiSaar, I want an AI-Powered School ERP for my institution.",
        }}
        illustration={<SchoolIllustration />}
        painPoints={[
          { icon: Clock, title: "Manual attendance wastes 2+ hours daily", description: "Teachers spend valuable time marking registers instead of teaching. Our system automates this instantly." },
          { icon: Banknote, title: "Fee collection is chaotic", description: "No tracking of who paid, who didn't, leading to revenue leakage and endless follow-ups." },
          { icon: EyeOff, title: "Parents have zero visibility", description: "No way to share results, attendance or notices instantly — leaving parents in the dark." },
        ]}
        features={[
          { icon: UserPlus, name: "Student Admission & Profile Management", desc: "Complete student lifecycle management from admission to graduation with digital records." },
          { icon: Bell, name: "Automated Attendance + WhatsApp Alerts", desc: "Mark attendance digitally and instantly notify parents via WhatsApp and SMS." },
          { icon: CreditCard, name: "Fee Collection & Payment Tracking", desc: "Online and offline fee collection with automatic receipts and overdue reminders." },
          { icon: FileText, name: "Exam Results & Report Card Generation", desc: "Automated result processing and printable report cards in one click." },
          { icon: CalendarDays, name: "Timetable & Class Scheduling", desc: "Smart scheduling that avoids conflicts across classes, teachers and rooms." },
          { icon: Users, name: "Staff & Teacher Management", desc: "Complete HR module for teachers — attendance, payroll and performance tracking." },
          { icon: MessageSquare, name: "Parent Communication Portal", desc: "Dedicated parent portal to view attendance, results, fees and receive notices." },
          { icon: Monitor, name: "Mobile-Responsive Admin Dashboard", desc: "Manage your institution from any device, anywhere, anytime." },
          { icon: GraduationCap, name: "Notice Board & Announcements", desc: "Broadcast important notices to students, parents and staff in seconds." },
          { icon: Bell, name: "Multi-Branch Support", desc: "Manage multiple campuses or branches from a single unified dashboard." },
        ].slice(0, 6)}
        pricing={[
          {
            name: "Starter",
            price: solutionById("school-management").from,
            features: ["Up to 300 students", "1 branch", "Attendance + Fee module", "Results management", "Basic parent alerts", "Admin dashboard"],
          },
          {
            name: "Professional",
            price: "₹65,000",
            features: ["Up to 1000 students", "3 branches", "Parent mobile portal", "WhatsApp + SMS alerts", "Timetable scheduling", "Staff management", "Online fee payment"],
          },
          {
            name: "Enterprise",
            price: "₹1,20,000",
            features: ["Unlimited students", "Unlimited branches", "Custom features", "Full AI attendance", "Analytics dashboard", "Priority support", "API integrations"],
          },
        ]}
        faqs={[
          { q: "Can it handle multiple branches?", a: "Yes, our Enterprise plan supports unlimited branches with a unified dashboard giving you complete visibility across all campuses." },
          { q: "Will parents get automatic updates?", a: "Yes, automated WhatsApp and SMS alerts are sent to parents for attendance, fee reminders and exam results." },
          { q: "Is it mobile friendly?", a: "Fully responsive on all devices. A dedicated parent mobile app is available in the Professional plan." },
          { q: "How long does setup take?", a: "Typically 6-8 weeks for full setup including data migration, customization and staff training." },
          { q: "Do you provide training?", a: "Yes, we provide full onboarding and training for admin staff, teachers and any technical team members." },
        ]}
      />
    </>
  );
}
