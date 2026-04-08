import { DollarSign, Search, MessageCircle, MapPin, CalendarCheck, CreditCard, Star, BookOpen, Smartphone, Map, Settings } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { TravelIllustration } from "@/components/illustrations";
import SEO from "@/components/SEO";

export default function TravelWebsite() {
  return (
    <>
      <SEO
        title="Tours & Travel Website Development in Odisha | LogiSaar"
        description="Custom travel websites for tour operators and travel agents in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. Online booking, Razorpay payment, SEO for Odisha tourism. Get direct bookings. LogiSaar: +91 78150 14638"
        keywords="travel website development Odisha, tour website Bhubaneswar, travel agency website Cuttack, Odisha tourism website, travel website Bhadrak, tour agency website Rourkela, travel booking website Odisha, LogiSaar"
        canonical="https://logisaar.in/services/travel-website"
      />
      <ServicePageLayout
        hero={{
          badge: "For Tour Operators & Travel Agents in Odisha",
          h1: "Custom Tours & Travel Websites for Odisha",
          h2: "Showcase Odisha's Beauty — Get Direct Bookings Online",
          body: "We build stunning travel websites for tour operators, travel agents and homestays in Odisha. Featuring package listings, online booking, payment integration and SEO to rank on Google.",
          waMessage: "Hi LogiSaar, I want a Travel Website for my tour business.",
        }}
        illustration={<TravelIllustration />}
        painPoints={[
          { icon: DollarSign, title: "Losing bookings to OTAs like MakeMyTrip", description: "Paying 15-20% commission on every booking when you could get direct bookings from your own site." },
          { icon: Search, title: "No online presence for Odisha tours", description: "Tourists searching for Puri, Konark, Chilika tours can't find you — you're invisible on Google." },
          { icon: MessageCircle, title: "WhatsApp-only booking is unprofessional", description: "Serious clients expect a proper booking system with confirmation and payment receipts." },
        ]}
        features={[
          { icon: MapPin, name: "Tour Package Listings with Photos & Itinerary", desc: "Beautiful package pages with day-by-day itinerary, inclusions, photos and pricing." },
          { icon: CalendarCheck, name: "Online Booking & Availability Calendar", desc: "Real-time availability calendar so customers can book your tours without calling you." },
          { icon: CreditCard, name: "Payment Integration (Razorpay/UPI)", desc: "Accept advance payments online with Razorpay, UPI and all major payment methods." },
          { icon: Search, name: "SEO for Odisha Tourism Keywords", desc: "Built-in SEO targeting 'Puri tour packages', 'Odisha travel agency' and 50+ local keywords." },
          { icon: Star, name: "Customer Review & Rating System", desc: "Verified reviews from past customers build trust and convert new visitors into bookings." },
          { icon: BookOpen, name: "Blog for Odisha Travel Content", desc: "Built-in travel blog to publish Odisha travel guides and rank for more Google keywords." },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "₹20,000",
            features: ["Up to 10 tour packages", "Beautiful package listings", "WhatsApp enquiry button", "Mobile-first design", "Google Maps integration", "Basic SEO setup"],
          },
          {
            name: "Professional",
            price: "₹40,000",
            features: ["Online booking system", "Razorpay payment", "Availability calendar", "Travel blog", "SEO for Odisha tourism", "Customer reviews", "Admin panel"],
          },
          {
            name: "Enterprise",
            price: "₹70,000",
            features: ["Custom booking engine", "Review & rating system", "Advanced analytics", "Affiliate system", "API integrations", "Priority SEO support", "Dedicated manager"],
          },
        ]}
        faqs={[
          { q: "Will the site rank on Google for Odisha tour searches?", a: "Yes, we build with Odisha tourism SEO targeting keywords like 'Puri tour packages', 'Odisha travel agency', 'Chilika lake tour' and more." },
          { q: "Can I add new tour packages myself?", a: "Yes, the admin panel lets you add, edit and remove packages anytime — no technical knowledge needed." },
          { q: "Does it integrate with payment gateways?", a: "Yes, Razorpay and UPI payment integration is included from the Professional plan onwards." },
          { q: "Can customers leave reviews?", a: "Yes, a verified review system is included to build trust with new visitors and improve Google rankings." },
          { q: "Do you offer ongoing SEO for travel sites?", a: "Yes, our SEO & Maintenance package (₹12,000/month) keeps you ranking on Google consistently." },
        ]}
      />
    </>
  );
}
