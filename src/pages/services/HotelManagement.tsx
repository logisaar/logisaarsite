import { Building2, XCircle, AlertTriangle, Globe, CalendarCheck, Receipt, Shirt, UserCircle, UtensilsCrossed, BarChart, Shield, MessageCircle } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { HotelIllustration } from "@/components/illustrations";
import SEO from "@/components/SEO";

export default function HotelManagement() {
  return (
    <>
      <SEO
        title="Hotel Management System in Odisha | LogiSaar"
        description="Custom hotel management software for hotels, resorts and homestays in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. Online booking, billing, housekeeping and guest management. LogiSaar: +91 78150 14638"
        keywords="hotel management system Odisha, resort software Bhubaneswar, hotel booking system Cuttack, property management software Odisha, hotel software Bhadrak, hotel management system Rourkela, hospitality software Odisha, LogiSaar"
        canonical="https://logisaar.in/services/hotel-management-system"
      />
      <ServicePageLayout
        hero={{
          badge: "For Hotels, Resorts & Homestays",
          h1: "Hotel & Resort Management System",
          h2: "For Hotels, Resorts, Homestays & Lodges Across Odisha",
          body: "Manage bookings, check-ins, housekeeping, billing and guest experience from one powerful platform. Reduce staff workload by 60%.",
          waMessage: "Hi LogiSaar, I want a Hotel Management System for my property.",
        }}
        illustration={<HotelIllustration />}
        painPoints={[
          { icon: XCircle, title: "Double bookings lose revenue", description: "No centralized room availability tracking causes booking conflicts that damage your reputation." },
          { icon: AlertTriangle, title: "Manual billing slows checkout", description: "Generating invoices manually delays guests and creates costly errors at checkout." },
          { icon: Globe, title: "No online booking channel", description: "Missing out on guests who search and book online via Google, OTAs and your own website." },
        ]}
        features={[
          { icon: CalendarCheck, name: "Room Booking & Availability Calendar", desc: "Real-time room availability with automated conflict prevention across all booking channels." },
          { icon: Globe, name: "Online Booking Integration", desc: "Accept direct bookings from your website and sync with OTA channels like MakeMyTrip." },
          { icon: Building2, name: "Check-In / Check-Out Management", desc: "Streamlined digital check-in and checkout with automatic room status updates." },
          { icon: Receipt, name: "Automated Invoice & Billing", desc: "One-click billing with itemized invoices, tax calculation and payment tracking." },
          { icon: Shirt, name: "Housekeeping Task Management", desc: "Assign and track room cleaning tasks with real-time status updates for staff." },
          { icon: UserCircle, name: "Guest Profile & History", desc: "Maintain complete guest records, preferences and visit history for personalized service." },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "₹40,000",
            features: ["Up to 20 rooms", "Booking calendar", "Check-in/checkout", "Billing & invoicing", "Staff management", "Basic reports"],
          },
          {
            name: "Professional",
            price: "₹75,000",
            features: ["Up to 60 rooms", "Online booking engine", "Restaurant module", "WhatsApp confirmations", "Housekeeping module", "Guest history", "Revenue analytics"],
          },
          {
            name: "Enterprise",
            price: "₹1,30,000",
            features: ["Unlimited rooms", "Multi-property support", "OTA channel manager", "Custom booking engine", "Advanced analytics", "API integrations", "Priority support"],
          },
        ]}
        faqs={[
          { q: "Can guests book directly from my website?", a: "Yes, we integrate a real-time booking engine directly into your website so guests can check availability and book instantly." },
          { q: "Does it work for small homestays too?", a: "Absolutely. Our Starter plan is designed for small properties with up to 20 rooms and is very easy to use." },
          { q: "Can I manage multiple hotel properties?", a: "Yes, the Enterprise plan supports multi-property management from one unified dashboard." },
          { q: "Will it integrate with OTAs like MakeMyTrip or Booking.com?", a: "Yes, OTA channel manager integration is included in the Enterprise plan to prevent double bookings." },
          { q: "How is guest data kept secure?", a: "All data is encrypted and hosted on secure cloud servers with daily automated backups and 99.9% uptime." },
        ]}
      />
    </>
  );
}
