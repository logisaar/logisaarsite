import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Eyebrow from "@/components/Eyebrow";
import ResponsiveImage from "@/components/ResponsiveImage";
import ProjectTimeline from "@/components/solutions/ProjectTimeline";
import { OrdersDemo, ReceptionistDemo, WorkflowDemo, DocsDemo } from "@/components/demos";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PROJECT_STEPS } from "@/data/company";
import { getImage } from "@/data/images";
import { SOLUTION_DETAILS } from "@/data/solution-details";
import { priceLine, solutionById } from "@/data/solutions";
import { whatsappLink } from "@/lib/contact";
import { siteUrl } from "@/lib/site";

const BTN = "h-auto min-h-[2.75rem] whitespace-normal rounded-full border-0 bg-primary px-6 font-semibold text-primary-on hover:bg-primary/90";
const BTN_OUTLINE = "h-auto min-h-[2.75rem] whitespace-normal rounded-full border-2 border-primary/40 px-6 font-semibold";
const CARD = "rounded-2xl border border-border bg-card p-6";

const DEMOS = { orders: OrdersDemo, receptionist: ReceptionistDemo, workflow: WorkflowDemo, docs: DocsDemo } as const;

/**
 * One template for all nine solution detail pages (round 11).
 * Sections: hero (copy + product visual), the problem, what you get, how it works, works with, pricing note, FAQ.
 * No page-level CTA band: the footer's CTA zone is the page's final CTA.
 * Text content: src/data/solution-details.ts. Name, outcome, price and WhatsApp text: src/data/solutions.ts.
 */
const SolutionDetail = ({ id }: { id: string }) => {
  const sol = solutionById(id);
  const d = SOLUTION_DETAILS[id];
  const price = priceLine(sol);
  const Demo = DEMOS[d.demo];
  const contactTo = `/contact?need=${encodeURIComponent("Ready-made solution")}&solution=${encodeURIComponent(sol.name)}`;

  return (
    <Layout>
      <SEO
        title={d.seo.title}
        description={d.seo.description}
        keywords={d.seo.keywords}
        canonical={siteUrl(sol.path)}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: sol.name,
          description: d.seo.description,
          url: siteUrl(sol.path),
          provider: { "@type": "Organization", name: "Logisaar Technologies Pvt Ltd", url: siteUrl("/") },
        }}
      />

      {/* 1. Hero: copy left, product visual right */}
      <section data-logi={`${sol.name}: ${sol.outcome}`} className="bg-background pb-section-sm pt-section-sm">
        <div className="container mx-auto grid max-w-[75rem] items-center gap-x-12 gap-y-10 px-gutter lg:grid-cols-2">
          <div>
            <Eyebrow>{d.audience}</Eyebrow>
            <h1 className="mt-3 font-display text-h1-page font-bold leading-tight text-foreground">{d.h1}</h1>
            <p className="mt-4 text-lead text-muted-foreground">{sol.outcome}</p>
            <p className="mt-5 font-display text-h3 font-bold text-foreground">
              {price.from}
              {price.monthly && <span className="text-body font-semibold text-muted-foreground"> + {price.monthly}</span>}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className={BTN}>
                <Link to={contactTo}>
                  Discuss this solution <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" className={BTN_OUTLINE}>
                <a href={whatsappLink(sol.wa)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} className="mr-2" aria-hidden="true" />
                  Ask on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>
          </div>

          <div>
            {d.mockup ? (
              <figure data-logi-avoid className="m-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" aria-hidden="true" />
                  <span className="ml-auto rounded-full bg-background px-2.5 py-0.5 text-label text-muted-foreground">Sample</span>
                </div>
                <ResponsiveImage
                  image={getImage("mockups", d.mockup)}
                  alt={`Sample screens of the ${sol.name}`}
                  priority
                  sizes="(min-width: 64em) 45vw, 92vw"
                  className="block h-auto w-full"
                />
              </figure>
            ) : (
              <Demo />
            )}
          </div>
        </div>
      </section>

      {/* 2. The problem */}
      <section aria-labelledby="problem-h" className="bg-secondary/40 py-section">
        <div className="container mx-auto max-w-[75rem] px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>The problem</Eyebrow>
            <h2 id="problem-h" className="mt-3 font-display text-h2-page font-bold text-foreground">Does this sound familiar?</h2>
          </div>
          <ul className="mt-10 grid list-none gap-6 p-0 md:grid-cols-3">
            {d.problems.map(({ icon: Icon, title, text }) => (
              <li key={title} className={CARD}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary-ink">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-h3 font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. What you get */}
      <section aria-labelledby="get-h" className="bg-background py-section">
        <div className="container mx-auto max-w-[75rem] px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What you get</Eyebrow>
            <h2 id="get-h" className="mt-3 font-display text-h2-page font-bold text-foreground">Built around the work you do every day</h2>
          </div>
          <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {d.features.map(({ icon: Icon, title, text }) => (
              <li key={title} className={CARD}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary-ink">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-h3 font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-body-sm text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. How it works */}
      <section aria-labelledby="how-h" className="bg-secondary/40 py-section">
        <div className="container mx-auto max-w-[75rem] px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 id="how-h" className="mt-3 font-display text-h2-page font-bold text-foreground">From first call to launch</h2>
          </div>
          <ProjectTimeline steps={PROJECT_STEPS} />
        </div>
      </section>

      {/* 5. Works with + 6. Pricing note */}
      <section aria-labelledby="with-h" className="bg-background py-section">
        <div className="container mx-auto grid max-w-[75rem] gap-6 px-gutter lg:grid-cols-2">
          <div className={CARD}>
            <Eyebrow>Works with</Eyebrow>
            <h2 id="with-h" className="mt-3 font-display text-h3 font-bold text-foreground">Fits the tools you already use</h2>
            <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
              {d.worksWith.map((w) => (
                <li key={w} className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-body-sm text-foreground">{w}</li>
              ))}
            </ul>
          </div>
          <div className={CARD}>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 font-display text-h3 font-bold text-foreground">
              {price.from}
              {price.monthly && <span className="text-body font-semibold text-muted-foreground"> + {price.monthly}</span>}
            </h2>
            <p className="mt-3 text-body-sm text-muted-foreground">
              That is where the price starts. After a free call you get a fixed quote in writing, with the scope and the full price, before any work begins.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ. The footer's CTA zone follows; there is no page-level CTA band. */}
      <section aria-labelledby="faq-h" className="bg-secondary/40 py-section">
        <div className="container mx-auto max-w-[75rem] px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-h" className="mt-3 font-display text-h2-page font-bold text-foreground">Common questions</h2>
          </div>
          <Accordion type="single" collapsible className="mx-auto mt-8 max-w-[48rem] rounded-2xl border border-border bg-card px-6">
            {d.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`}>
                <AccordionTrigger className="min-h-[2.75rem] text-left text-body font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-body-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionDetail;
