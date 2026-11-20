import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Index from "./pages/Index";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Portfolio from "./pages/Portfolio";
import TechXera from "./pages/TechXera";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";

import Location from "./pages/Location";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiePolicy from "./pages/CookiePolicy";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import RouteScrollReset from "./components/RouteScrollReset";
import Logi from "./components/logi/Logi";
// Solution pages
import AIPoweredSchoolERP from "./pages/solutions/AIPoweredSchoolERP";
import HotelManagement from "./pages/solutions/HotelManagement";
import AILeadFollowup from "./pages/solutions/AILeadFollowup";
import AIReceptionist from "./pages/solutions/AIReceptionist";
import ProposalSoftware from "./pages/solutions/ProposalSoftware";
import QRMenu from "./pages/solutions/QRMenu";
import TravelWebsite from "./pages/solutions/TravelWebsite";
import AIAutomation from "./pages/solutions/AIAutomation";
import CustomCRM from "./pages/solutions/CustomCRM";

// Dev-only feedback toolbar: a dynamic import behind import.meta.env.DEV, so the production build drops it entirely.
const Agentation = import.meta.env.DEV
  ? lazy(() => import("agentation").then((m) => ({ default: m.Agentation })))
  : null;

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/ikuro" element={<TechXera />} />
          <Route path="/techxera" element={<Navigate to="/ikuro" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />

          <Route path="/web-development-odisha" element={<Location />} />
          {/* Industry-specific solutions pages */}
          <Route path="/solutions/ai-powered-school-erp" element={<AIPoweredSchoolERP />} />
          <Route path="/solutions/hotel-management-system" element={<HotelManagement />} />
          <Route path="/solutions/ai-lead-followup" element={<AILeadFollowup />} />
          <Route path="/solutions/ai-receptionist" element={<AIReceptionist />} />
          <Route path="/solutions/proposal-software" element={<ProposalSoftware />} />
          <Route path="/solutions/qr-menu-system" element={<QRMenu />} />
          <Route path="/solutions/travel-website" element={<TravelWebsite />} />
          <Route path="/solutions/ai-automation" element={<AIAutomation />} />
          <Route path="/solutions/custom-crm" element={<CustomCRM />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/terms-of-service" element={<TermsConditions />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RouteScrollReset />
        <AnimatedRoutes />
        {/* Mounted once here (not in Layout, which remounts on every route change) so Logi keeps its position and chat. */}
        <Logi />
      </BrowserRouter>
      {Agentation && (
        <Suspense fallback={null}>
          <Agentation
            endpoint="http://localhost:4747"
            onSessionCreated={(sessionId) => {
              console.log("Agentation Session started:", sessionId);
            }}
          />
        </Suspense>
      )}
    </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
