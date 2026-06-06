import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

import Location from "./pages/Location";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
// Service pages
import SchoolManagement from "./pages/services/SchoolManagement";
import HotelManagement from "./pages/services/HotelManagement";
import AILeadFollowup from "./pages/services/AILeadFollowup";
import AIReceptionist from "./pages/services/AIReceptionist";
import ProposalSoftware from "./pages/services/ProposalSoftware";
import QRMenu from "./pages/services/QRMenu";
import TravelWebsite from "./pages/services/TravelWebsite";
import AIAutomation from "./pages/services/AIAutomation";
import CustomCRM from "./pages/services/CustomCRM";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/web-development-odisha" element={<Location />} />
          {/* Industry-specific service pages */}
          <Route path="/services/school-management-system" element={<SchoolManagement />} />
          <Route path="/services/hotel-management-system" element={<HotelManagement />} />
          <Route path="/services/ai-lead-followup" element={<AILeadFollowup />} />
          <Route path="/services/ai-receptionist" element={<AIReceptionist />} />
          <Route path="/services/proposal-software" element={<ProposalSoftware />} />
          <Route path="/services/qr-menu-system" element={<QRMenu />} />
          <Route path="/services/travel-website" element={<TravelWebsite />} />
          <Route path="/services/ai-automation" element={<AIAutomation />} />
          <Route path="/services/custom-crm" element={<CustomCRM />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
