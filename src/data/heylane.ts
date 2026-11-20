// HeyLane facts, prices and copy come ONLY from the HeyLane project docs:
//   D:\logisaar Projects\Heylane - landing page\docs\01-PRODUCT.md (wins on facts and prices) and 02-COPY.md (approved copy).
// Rules: no ratings or user counts, no GST/hardware claims, rides/wallet/safety are "Coming soon", sample data is labelled.

export const HL_CUSTOMER_URL = "https://heylane.in";
export const HL_BUSINESS_URL = "https://business.heylane.in";
// TODO(owner): confirm the pricing anchor on business.heylane.in
export const HL_PRICING_URL = "https://business.heylane.in/#pricing";

export interface HlCategory {
  name: string;
  line: string;        // customer line
  photo: string;       // file stem in /images/heylane/places
  alt: string;
}

export const HL_CATEGORIES: HlCategory[] = [
  { name: "Cafés", line: "Your coffee spot. Your kind of people", photo: "cafes", alt: "People talking over coffee in a bright café" },
  { name: "Restaurants", line: "Good food, with people who get you", photo: "restaurants", alt: "A restaurant table set for dinner" },
  { name: "Stays", line: "Find a stay that feels right", photo: "stays-hotel", alt: "A hotel room with a made bed" },
  { name: "Grocery & Kirana", line: "Everyday essentials. Familiar faces", photo: "grocery-kirana", alt: "A neat grocery shop interior" },
  { name: "Pharmacies", line: "Know your local pharmacy before you go", photo: "pharmacies", alt: "A pharmacy counter with shelves behind" },
  { name: "Clinics", line: "Find a clinic. Start a conversation", photo: "clinics", alt: "A clinic reception desk" },
  // Salons must show men's and unisex photos (both exist); the line covers men's, women's and unisex
  { name: "Salons", line: "Find your look. Find your people", photo: "salons-unisex", alt: "A unisex salon with styling chairs" },
];
export const HL_SALON_MEN = { photo: "salons-men", alt: "A men's salon with barber chairs" };

export const HL_STEPS = [
  { title: "Drop a pin. Find your place", text: "Lane Maps shows every participating café, salon, stay, pharmacy and shop around you.", screen: "map" as const },
  { title: "Ask your people, then chat", text: "See what your own contacts thought, then chat with the place on HeyLane Chat. No switching apps.", screen: "place" as const },
  { title: "Come back. Get rewarded", text: "Points stay with each place. Swap them for a member pass when you choose.", screen: "pass" as const },
];

export interface HlPlan {
  name: string;
  headline: string;
  price: string;
  perDay: string;
  includes: string;
  items: string[];
  cta: string;
  pro?: boolean;
}

// Must match 01-PRODUCT.md. Per business, per year, plus applicable taxes (TODO(owner): tax wording).
export const HL_PLANS: HlPlan[] = [
  { name: "Lane Base", headline: "Run your counter", price: "₹8,500", perDay: "About ₹23 a day", includes: "", items: ["Billing and POS", "Inventory and sales reports", "Tools for your industry", "Listed on Lane Maps and Lane Vibes"], cta: "Start with Base" },
  { name: "Lane Growth", headline: "Start your loyalty programme", price: "₹10,899", perDay: "About ₹30 a day", includes: "Everything in Base, plus", items: ["HeyLane Chat", "Customer profiles and purchase history", "Points, rewards and member passes", "200 loyalty customers and 50 members", "Local offers up to 5 km"], cta: "Choose Growth" },
  { name: "Lane Pro", headline: "Turn customers into regulars", price: "₹12,000", perDay: "About ₹33 a day", includes: "Everything in Growth, plus", items: ["1,000 loyalty customers|5×", "200 members|4×", "Local offers up to 15 km|3×", "Visit count and member badge in every chat", "Full performance dashboard"], cta: "Choose Lane Pro", pro: true },
  { name: "Custom", headline: "Built around you", price: "Let’s talk", perDay: "Priced for your needs", includes: "", items: ["Pick only the tools you need", "Set your own capacity", "Plan it with the HeyLane team"], cta: "Talk to us" },
];
// Bill limits are not final (01-PRODUCT.md): say nothing about bill counts. Add-ons are planned: "Rates will be confirmed".
export const HL_UPGRADE_NOTE = "Growth to Pro is only ₹1,101 more a year. That’s 5× the loyalty customers, 4× the members, 3× the offer reach, every customer’s visits inside chat and the full dashboard.";
export const HL_PRICE_NOTE = "Prices are per business, per year, plus applicable taxes. Paid add-ons for more loyalty customers and members are planned. Rates will be confirmed.";

export const HL_COMING_SOON = [
  { title: "Rides", text: "Auto and bike rides around Bhubaneswar, with the fare shown before you confirm and no added booking fee. Drivers pay one fixed monthly platform fee and no commission on their trips." },
  { title: "Wallet", text: "A balance you fund yourself. Promotional credits and loyalty points stay separate from it." },
  { title: "Safety", text: "SOS, trip sharing and trusted contacts, reachable from the ride screen." },
];

export const HL_ROLLOUT = [
  { when: "Now", where: "Bhubaneswar" },
  { when: "Within one year", where: "Across Odisha" },
  { when: "Next", where: "Other Indian states" },
];
