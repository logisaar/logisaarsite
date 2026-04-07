import { Ghost, Clock, Eye, Layout, DollarSign, PenLine, Bell, FileText, CreditCard, MessageSquare, BarChart, Globe } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { ProposalIllustration } from "@/components/illustrations";
import SEO from "@/components/SEO";

export default function ProposalSoftware() {
  return (
    <>
      <SEO
        title="Proposal Software for Freelancers in India | LogiSaar"
        description="Send beautiful branded proposals with digital signatures and payment links. Built for Indian freelancers and agencies. Close more clients faster. LogiSaar: +91 78150 14638"
        keywords="proposal software India, freelancer proposal tool, digital proposal software Odisha, e-signature proposal India, client proposal software freelancer, LogiSaar"
        canonical="https://logisaar.in/services/proposal-software"
      />
      <ServicePageLayout
        hero={{
          badge: "For Indian Freelancers & Agencies",
          h1: "Proposal Software Built for Freelancers",
          h2: "Send Beautiful, Branded Proposals in Minutes — Close Clients Faster",
          body: "Stop sending boring PDF proposals. Create stunning, interactive proposals with digital signatures, pricing tables and instant client approval — built for Indian freelancers.",
          waMessage: "Hi LogiSaar, I want Proposal Software for my freelance business.",
        }}
        illustration={<ProposalIllustration />}
        painPoints={[
          { icon: Ghost, title: "Clients ghost your proposals", description: "Boring PDF proposals get ignored. Interactive proposals get 3x more responses and faster decisions." },
          { icon: Clock, title: "Manual proposal writing wastes hours", description: "Recreating the same proposal for every client eats into your billable time and energy." },
          { icon: Eye, title: "No way to track if client opened it", description: "You have no idea whether your proposal was even read — so you can't follow up at the right moment." },
        ]}
        features={[
          { icon: Layout, name: "Branded Proposal Templates", desc: "Your logo, colors and fonts — proposals that look as professional as your work." },
          { icon: DollarSign, name: "Interactive Pricing Tables", desc: "Clients can choose packages and options directly in the proposal — no back-and-forth emails." },
          { icon: PenLine, name: "Digital Signature & Approval", desc: "Legally valid e-signatures under India's IT Act 2000 — clients sign in seconds." },
          { icon: Eye, name: "Real-Time Open & Read Tracking", desc: "Know the moment your client opens the proposal and which sections they spent the most time on." },
          { icon: Bell, name: "Automatic Follow-Up Reminders", desc: "Automated follow-up emails when a proposal hasn't been responded to in 24-48 hours." },
          { icon: CreditCard, name: "Payment Link Integration", desc: "Embed Razorpay or PayTM payment links so clients can pay right from the approved proposal." },
        ]}
        pricing={[
          {
            name: "Starter",
            price: "₹15,000",
            features: ["Single user", "50 proposals/month", "Branded templates", "Pricing tables", "Read tracking", "Basic analytics"],
          },
          {
            name: "Professional",
            price: "₹30,000",
            features: ["3 users", "Unlimited proposals", "Digital e-signatures", "Payment integration", "Client portal", "Follow-up automation", "Custom domain"],
          },
          {
            name: "Enterprise",
            price: "₹55,000",
            features: ["Full team access", "White-label branding", "API access", "Advanced analytics", "Custom integrations", "Priority support", "Onboarding included"],
          },
        ]}
        faqs={[
          { q: "Can I use my own branding?", a: "Yes, full white-label with your logo, colors, and custom domain so clients see your brand." },
          { q: "Does it support digital signatures legally in India?", a: "Yes, e-signatures are legally valid under the IT Act 2000 in India for most business agreements." },
          { q: "Can clients pay directly from the proposal?", a: "Yes, Razorpay and PayTM payment links can be embedded so clients can pay right after approving." },
          { q: "Is there a monthly fee?", a: "The pricing shown is a one-time development cost. Hosting is just ₹2,000/year after that." },
          { q: "Can I send proposals from mobile?", a: "Yes, fully mobile-responsive for both you as the sender and your client on any device." },
        ]}
      />
    </>
  );
}
