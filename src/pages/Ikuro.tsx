import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import IkuroProblem from "@/components/ikuro/IkuroProblem";
import IkuroLoop from "@/components/ikuro/IkuroLoop";
import ChalkToChoice from "@/components/ikuro/ChalkToChoice";
import TechxeraPrograms from "@/components/ikuro/TechxeraPrograms";
import { IkuroHero, IkuroDecide, IkuroColleges, IkuroTrust, IkuroPricing, IkuroClosing } from "@/components/ikuro/IkuroSections";

const LEAD =
  "IKURO is an AI-powered student decision platform by Logisaar. It understands your goals, reasons through your options and helps you choose your next course, college, skill, internship or career step.";

/** /ikuro: the IKURO product page, in IKURO colours (orange and navy on cream). The header, footer and Logi stay Logisaar. */
const Ikuro = () => (
  <Layout>
    <SEO
      title="IKURO: AI student decision platform by Logisaar"
      description={LEAD}
      keywords="IKURO, student decision platform, AI career guidance, course and college choice, Chalk to Choice, TechXera, Logisaar"
      canonical="https://www.logisaar.in/ikuro"
      image="https://www.logisaar.in/og-ikuro.png"
    />
    <div data-theme="ikuro">
      <IkuroHero />
      <IkuroProblem />
      <IkuroLoop />
      <IkuroDecide />
      <ChalkToChoice />
      <IkuroColleges />
      <IkuroTrust />
      <IkuroPricing />
      <TechxeraPrograms />
      <IkuroClosing />
    </div>
  </Layout>
);

export default Ikuro;
