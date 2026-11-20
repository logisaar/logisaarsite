import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Eyebrow from "@/components/Eyebrow";
import { Button } from "@/components/ui/button";

// HeyLane facts: HeyLane docs/01-PRODUCT.md. IKURO facts: the IKURO founder deck v1.0 (in development).
const Products = () => (
  <Layout>
    <SEO
      title="Our products: HeyLane and IKURO | Logisaar"
      description="Products built by Logisaar: HeyLane, a neighbourhood app for local places and businesses starting in Bhubaneswar, and IKURO, an AI student decision platform in development."
      keywords="Logisaar products, HeyLane, IKURO, neighbourhood app, student decision platform"
      canonical="https://www.logisaar.in/products"
    />

    <section data-logi-dock className="bg-background pb-section-sm pt-32 md:pt-44">
      <div className="container mx-auto max-w-[56rem] px-gutter text-center">
        <Eyebrow>Our products</Eyebrow>
        <h1 className="mt-3 font-display text-h1 font-bold text-foreground">We build our own, too</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-foreground">
          Alongside client work, Logisaar builds and runs two products of its own.
        </p>
      </div>
    </section>

    <section className="bg-background pb-section">
      <div className="container mx-auto grid max-w-[75rem] gap-6 px-gutter md:grid-cols-2">
        <article data-logi="HeyLane is our neighbourhood app." className="flex flex-col rounded-3xl border border-border bg-card p-8">
          <div className="border-l-2 pl-5" style={{ borderColor: "#007F5F" }}>
            <img src="/brand/heylane/HeyLane-Horizontal.svg" width={1644} height={344} alt="HeyLane" className="-my-3 h-auto w-[min(13rem,70%)]" />
          </div>
          <p className="mt-6 text-label font-medium text-primary-ink">Starting in Bhubaneswar</p>
          <h2 className="mt-1 font-display text-h2 font-bold text-foreground">HeyLane</h2>
          <p className="mt-3 flex-1 text-body text-muted-foreground">
            A neighbourhood app. People discover local places, see what their own contacts think first, chat with the place and collect points that each business turns into member passes. Businesses get billing, stock, local discovery, chat and a loyalty programme in one product.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/heylane">Explore HeyLane <ArrowRight size={16} className="ml-2" aria-hidden="true" /></Link>
            </Button>
            <a href="https://heylane.in" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[2.75rem] items-center gap-1 font-semibold text-primary-ink hover:underline">
              heylane.in <ArrowRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </article>

        <article data-logi="IKURO helps students decide." className="flex flex-col rounded-3xl border border-border bg-card p-8">
          <div className="border-l-2 pl-5" style={{ borderColor: "#FA482E" }}>
            <picture style={{ display: "contents" }}>
              <source type="image/webp" srcSet="/brand/ikuro/ikuro-lockup-tagline.webp" />
              <img src="/brand/ikuro/ikuro-lockup-tagline.png" width={1001} height={319} alt="IKURO" loading="lazy" decoding="async" className="h-auto w-[min(15rem,80%)]" />
            </picture>
          </div>
          <p className="mt-6 text-label font-medium text-primary-ink">In development</p>
          <h2 className="mt-1 font-display text-h2 font-bold text-foreground">IKURO</h2>
          <p className="mt-3 flex-1 text-body text-muted-foreground">
            An AI-powered student decision platform. It understands your goals, reasons through your options and helps you choose your next course, college, skill, internship or career step. Pilots start with first-year engineering students.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/ikuro">Explore IKURO <ArrowRight size={16} className="ml-2" aria-hidden="true" /></Link>
            </Button>
          </div>
        </article>
      </div>
    </section>

    <section className="border-t border-border/40 bg-secondary/40 py-section-sm">
      <div className="container mx-auto max-w-[44rem] px-gutter text-center">
        <h2 className="font-display text-h2 font-bold text-foreground">Need software built around your business?</h2>
        <Button asChild size="lg" className="mt-6 rounded-full px-8">
          <Link to="/contact">Talk to us</Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Products;
