import { ReactNode } from "react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import ScrollToTop from "./ScrollToTop";
import LeadCaptureModal from "./LeadCaptureModal";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1 pt-20 md:pt-[116px]">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <LeadCaptureModal />
    </div>
  );
};

export default Layout;
