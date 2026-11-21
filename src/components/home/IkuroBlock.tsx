import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Eyebrow from "@/components/Eyebrow";
import DecisionPath from "@/components/home/DecisionPath";

/** Home block for IKURO: a cream, IKURO-tinted panel inside the Logisaar page, 6/6 split, text left and the decision path right. */
const IkuroBlock = () => (
  <section data-logi="IKURO is made by Logisaar too!" className="bg-background py-section">
    <div className="container mx-auto max-w-[75rem] px-gutter">
      <div data-theme="ikuro" className="grid grid-cols-1 items-center gap-10 rounded-[2rem] border border-[#FA482E]/25 bg-[#FCFAF8] p-6 text-foreground sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-14">
        <div className="space-y-6 lg:col-span-6">
          <Eyebrow>IKURO · A Logisaar product</Eyebrow>
          <h2 className="m-0">
            <span className="sr-only">IKURO: decisions today, growth tomorrow</span>
            <picture style={{ display: "contents" }}>
              <source type="image/webp" srcSet="/brand/ikuro/ikuro-lockup-tagline.webp" />
              <img src="/brand/ikuro/ikuro-lockup-tagline.png" width={1001} height={319} alt="" loading="lazy" decoding="async" className="h-auto w-[min(22rem,100%)]" />
            </picture>
          </h2>
          <p className="max-w-[34rem] text-body text-muted-foreground">
            Our AI-powered platform that helps students make better course, college, skill and career decisions. It includes Chalk to Choice, our career-clarity programme for Class 11 &amp; 12.
          </p>
          <ul className="space-y-2 text-body-sm text-foreground">
            {[
              "Personalised AI guidance that understands each student and recommends the right next step.",
              "Chalk to Choice: career clarity for Class 11 & 12 through guidance and real-world exposure.",
              "For colleges: dashboards and student insights. College pilots begin in 2026.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FA482E]" />
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
            <Button asChild size="lg" className="h-auto min-h-[2.75rem] rounded-full border-0 bg-[#D93A22] px-8 font-semibold text-white hover:bg-[#C2331D]">
              <Link to="/ikuro">
                Visit IKURO
                <ArrowRight size={16} className="ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          {/* TODO(owner): confirm 500+ students guided through TechXera and Chalk to Choice. The other stats were removed (unverifiable; IKURO is pre-pilot). */}
          <p className="text-body-sm text-muted-foreground">500+ students guided through TechXera and Chalk to Choice.</p>
        </div>
        <div className="lg:col-span-6">
          <div className="mx-auto w-full max-w-[32rem]">
            <DecisionPath />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default IkuroBlock;
