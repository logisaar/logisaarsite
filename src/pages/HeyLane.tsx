import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import HlHow from "@/components/heylane/HlHow";
import {
  HlHero, HlTwoSides, HlPlaces, HlVibes, HlPasses, HlChat, HlPlans, HlComingSoon, HlRollout, HlClosing,
} from "@/components/heylane/HlSections";
import "@/components/heylane/heylane.css";

const LEAD =
  "HeyLane is a neighbourhood app starting in Bhubaneswar. The cafés, salons, stays and shops you keep going back to, finally treating you like a regular: points that become member perks, opinions from people you actually know, and a direct line to every place.";

/** /heylane: Logisaar telling the HeyLane story, in HeyLane's own colours and fonts (night green, paper, gold). */
const HeyLane = () => (
  <Layout heroUnderHeader>
    <SEO
      title="HeyLane: neighbourhood app for local places and businesses | Logisaar"
      description={LEAD}
      keywords="HeyLane, neighbourhood app, local businesses Bhubaneswar, loyalty member pass, Lane Maps, Lane Vibes, HeyLane Chat, Logisaar"
      canonical="https://www.logisaar.in/heylane"
      image="https://www.logisaar.in/og-heylane.png"
    />
    {/* HeyLane fonts load on this route only */}
    <Helmet>
      <link rel="preload" href="/fonts/heylane/bricolage-grotesque-latin-standard-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Helmet>
    <div data-theme="heylane">
      <HlHero />
      <HlTwoSides />
      <HlHow />
      <HlPlaces />
      <HlVibes />
      <HlPasses />
      <HlChat />
      <HlPlans />
      <HlComingSoon />
      <HlRollout />
      <HlClosing />
    </div>
  </Layout>
);

export default HeyLane;
