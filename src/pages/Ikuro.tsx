import { useLayoutEffect, useRef } from "react";
import { revealAll } from "@/lib/scroll";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import IkuroProblem from "@/components/ikuro/IkuroProblem";
import IkuroLoop from "@/components/ikuro/IkuroLoop";
import ChalkToChoice from "@/components/ikuro/ChalkToChoice";
import TechxeraPrograms from "@/components/ikuro/TechxeraPrograms";
import { IkuroHero, IkuroDecide, IkuroColleges, IkuroTrust, IkuroPricing, IkuroClosing } from "@/components/ikuro/IkuroSections";
import { siteUrl } from "@/lib/site";

const LEAD =
  "IKURO is an AI-powered student decision platform by Logisaar. It understands your goals, reasons through your options and helps you choose your next course, college, skill, internship or career step.";

/** /ikuro: the IKURO product page, in IKURO colours (orange and navy on cream). The header, footer and Logi stay Logisaar. */
const Ikuro = () => {
  const root = useRef<HTMLDivElement>(null);
  // nothing animates on load except the hero: headings, lead paragraphs, cards and list items reveal at 70% of the viewport
  useLayoutEffect(() => {
    const sections = Array.from(root.current?.children ?? []).slice(1);
    const stops = sections.map((sec) =>
      revealAll(sec, "h2, h2 + p, ol > li, ul > li, [data-reveal]", { filter: (el) => !(el.tagName === "LI" && el.closest("[data-seq]")) && !el.closest("[role='dialog']") }),
    );
    return () => stops.forEach((f) => f());
  }, []);
  return (
  <Layout>
    <SEO
      title="IKURO: AI student decision platform by Logisaar"
      description={LEAD}
      keywords="IKURO, student decision platform, AI career guidance, course and college choice, Chalk to Choice, TechXera, Logisaar"
      canonical={siteUrl("/ikuro")}
      image={siteUrl("/og-ikuro.png")}
    />
    <div ref={root} data-theme="ikuro">
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
};

export default Ikuro;
