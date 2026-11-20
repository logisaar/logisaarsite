import { ReactNode } from "react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import ScrollToTop from "./ScrollToTop";
import LeadCaptureModal from "./LeadCaptureModal";

const Layout = ({ children, heroUnderHeader = false }: { children: ReactNode; heroUnderHeader?: boolean }) => {
  return (
    <div className="min-h-[100svh] flex flex-col overflow-x-clip">
      <TopBar />
      <Navbar />
      <main className="flex-1" style={heroUnderHeader ? undefined : { paddingTop: "var(--header-h)" }}>{children}</main>
      <Footer />
      <aside aria-label="Quick actions">
        <WhatsAppButton />
        <ScrollToTop />
      </aside>
      <LeadCaptureModal />
    </div>
  );
};

export default Layout;
