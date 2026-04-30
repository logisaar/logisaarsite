import { RefreshCw, AlertOctagon, BarChart, QrCode, Image, ShoppingCart, Monitor, CreditCard, Filter, Settings, Languages } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { QRMenuIllustration } from "@/components/illustrations";
import SEO from "@/components/SEO";

export default function QRMenu() {
  return (
    <>
      <SEO
        title="QR Code Digital Menu for Restaurants in Odisha | LogiSaar"
        description="Replace paper menus with a beautiful QR code digital menu. Customers scan, order and pay from their phone. Built for restaurants, cafes and dhabas in Bhubaneswar, Cuttack, Bhadrak, Rourkela and across Odisha. LogiSaar: +91 78150 14638"
        keywords="QR code menu Odisha, digital menu restaurant Bhubaneswar, QR menu system Cuttack, restaurant ordering system Odisha, QR menu Bhadrak, digital menu Rourkela, contactless menu Odisha, LogiSaar"
        canonical="https://www.logisaar.in/services/qr-menu-system"
      />
      <ServicePageLayout
        hero={{
          badge: "For Restaurants, Cafés & Dhabas",
          h1: "QR Code Digital Menu for Restaurants & Cafés",
          h2: "Let Customers Scan, Order & Pay — Right from Their Phone",
          body: "Replace paper menus with a beautiful digital QR menu. Customers scan, browse, and order instantly. Perfect for restaurants, cafés, dhabas and food courts in Odisha.",
          waMessage: "Hi LogiSaar, I want a QR Code Menu System for my restaurant.",
        }}
        illustration={<QRMenuIllustration />}
        painPoints={[
          { icon: RefreshCw, title: "Paper menus are expensive to reprint", description: "Every price change or new item requires costly reprints — digital menus update instantly for free." },
          { icon: AlertOctagon, title: "Waiters miss orders during rush hours", description: "Peak time chaos leads to wrong orders and unhappy customers — a digital system eliminates this." },
          { icon: BarChart, title: "No data on what customers order most", description: "You have no analytics on your best-selling items or peak hours — making menu decisions guesswork." },
        ]}
        features={[
          { icon: QrCode, name: "QR Code Generation for Each Table", desc: "Unique QR codes for every table — customers scan and get the menu instantly, no app required." },
          { icon: Image, name: "Beautiful Digital Menu with Food Photos", desc: "Visually rich menus with photos — menus with photos get 30% more orders on average." },
          { icon: RefreshCw, name: "Real-Time Menu Updates", desc: "Add, remove or update items and prices instantly from the admin panel — no reprinting ever." },
          { icon: ShoppingCart, name: "Online Order Placement from Table", desc: "Customers place orders directly from their phone — orders go straight to your kitchen." },
          { icon: CreditCard, name: "Payment via UPI / QR at Table", desc: "Accept UPI payments directly at the table — faster checkout, fewer cash handling errors." },
          { icon: BarChart, name: "Daily Sales & Order Analytics", desc: "Track best-selling items, peak hours, revenue trends and table turnover with clear dashboards." },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "₹12,000",
            features: ["Digital QR menu only", "Up to 100 menu items", "Food photos support", "Real-time updates", "Basic admin panel", "Print-ready QR files"],
          },
          {
            name: "Professional",
            price: "₹25,000",
            features: ["Digital menu + ordering", "UPI / QR payment", "Order management", "Kitchen notifications", "Daily sales reports", "Multi-language menu"],
          },
          {
            name: "Enterprise",
            price: "₹45,000",
            features: ["Full system", "Kitchen display system", "Advanced analytics", "Multi-branch support", "Custom branding", "Staff management", "API integration"],
          },
        ]}
        faqs={[
          { q: "Do customers need to download an app?", a: "No. Everything works in the browser after scanning the QR code. No app download required." },
          { q: "Can I update the menu prices myself?", a: "Yes, the admin panel lets you update items, prices and photos instantly — no technical knowledge needed." },
          { q: "What if a customer has no internet?", a: "The menu loads fast and caches on the phone, so it works even on slow 2G connections common in Odisha." },
          { q: "Can I add food photos to every item?", a: "Yes, and we strongly recommend it — menus with photos get 30% more orders than text-only menus." },
          { q: "How are the QR codes printed?", a: "We generate print-ready high-resolution QR code files for each table that you can print at any local print shop." },
        ]}
      />
    </>
  );
}
