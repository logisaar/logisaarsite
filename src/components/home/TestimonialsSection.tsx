import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ShieldCheck, Rocket, Users, Headphones, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Eyebrow from "@/components/Eyebrow";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";

import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/components/testimonial";

// Import all client brand logos
import logoSwosti from "@/assets/brand-logos/swosti.webp";
import logoCmc from "@/assets/brand-logos/cmc.webp";
import logoBaba from "@/assets/brand-logos/baba-brand-fashion.webp";
import logoEklabhya from "@/assets/brand-logos/eklabhya-classes.webp";
import logoAmruta from "@/assets/brand-logos/amruta-bhojan.webp";
import logoLinchans from "@/assets/brand-logos/linchans.webp";
import logoJnsBio from "@/assets/brand-logos/jns-biology.webp";
import logoJns from "@/assets/brand-logos/jns.webp";
import logoVastu from "@/assets/brand-logos/massom-vastu-guru.webp";
import logoNit from "@/assets/brand-logos/nit.webp";
import logoSako from "@/assets/brand-logos/sako-sales.webp";
import logoRenuka from "@/assets/brand-logos/the-renuka.webp";
import logoVinayak from "@/assets/brand-logos/vinayak.webp";

const TESTIMONIALS_ROW1 = [
  {
    logo: logoSwosti,
    authorName: "Swosti Consultancy",
    authorTagline: "Business Consulting",
    quote: "Logisaar transformed the way we handle consultations and client requests. The platform is fast, reliable and extremely easy to use.",
  },
  {
    logo: logoCmc,
    authorName: "CMC Infratech Pvt. Ltd.",
    authorTagline: "Construction & Infrastructure",
    quote: "The digital gatepass system built by Logisaar has improved our campus security and visitor management significantly.",
  },
  {
    logo: logoEklabhya,
    authorName: "Eklabhya Classes",
    authorTagline: "Education & Academy",
    quote: "The custom learning management portal streamlined our online classes and exam schedules. Parents and students love it!",
  },
  {
    logo: logoLinchans,
    authorName: "Linchans",
    authorTagline: "Creative & Media Agency",
    quote: "The digital portfolio and branding solutions provided by Logisaar have helped us stand out in a highly competitive market.",
  },
  {
    logo: logoJnsBio,
    authorName: "JNS Biology Classes",
    authorTagline: "Academics & Science",
    quote: "Managing online student resources and interactive science quizzes is now a breeze. Excellent technical support!",
  },
  {
    logo: logoRenuka,
    authorName: "The Renuka",
    authorTagline: "Hospitality & Stay",
    quote: "Our booking and reservation portal works flawlessly. Client feedback on the UI has been overwhelmingly positive.",
  }
];

const TESTIMONIALS_ROW2 = [
  {
    logo: logoBaba,
    authorName: "Baba Brand Fashion",
    authorTagline: "E-commerce & Apparel",
    quote: "From design to deployment, the team was very professional and delivered our e-commerce platform beyond expectations.",
  },
  {
    logo: logoAmruta,
    authorName: "Amruta Bhojan",
    authorTagline: "Hospitality & Restaurant",
    quote: "Our online food ordering and delivery system has doubled our daily sales with a seamless and extremely clean user interface.",
  },
  {
    logo: logoVastu,
    authorName: "Masoom Vastu Guru",
    authorTagline: "Consultancy Services",
    quote: "Our consultation booking portal is extremely fast and responsive. We highly recommend Logisaar's development services.",
  },
  {
    logo: logoVinayak,
    authorName: "Vinayak Enterprises",
    authorTagline: "Retail & Trade",
    quote: "The stock inventory management app they built for us saved hundreds of hours of manual logging. Truly game-changing.",
  },
  {
    logo: logoJns,
    authorName: "JNS Academy",
    authorTagline: "Educational Center",
    quote: "Logisaar delivered a highly robust administration portal that simplified student enrollment and inquiries.",
  },
  {
    logo: logoSako,
    authorName: "Sako Sales Corp.",
    authorTagline: "Distribution & Sales",
    quote: "Highly competent team that built our CRM system on time. The analytics dashboard provides fantastic business insights.",
  }
];

type TestimonialItem = (typeof TESTIMONIALS_ROW1)[number];

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
  <Testimonial className="w-[min(22.5rem,85vw)] h-full p-6 rounded-2xl border border-border bg-card flex flex-col">
    <TestimonialQuote className="px-0 py-0 pb-5 text-foreground text-body-sm leading-relaxed">
      <span aria-hidden="true" className="block mb-2 font-serif text-h2 leading-none text-primary-ink">“</span>
      {item.quote}
    </TestimonialQuote>

    <TestimonialAuthor className="px-0 pt-4 pb-0 border-t border-border/60 flex items-center gap-4 mt-auto">
      <TestimonialAvatar className="w-11 h-11 rounded-full border border-border/60 bg-white p-1.5 flex items-center justify-center overflow-hidden shrink-0">
        <TestimonialAvatarImg src={item.logo} alt="" className="object-contain w-full h-full max-h-full" />
        <TestimonialAvatarRing className="ring-1 ring-black/5" />
      </TestimonialAvatar>
      <div className="text-left flex-1 min-w-0">
        <TestimonialAuthorName className="text-body-sm font-semibold text-foreground">{item.authorName}</TestimonialAuthorName>
        <TestimonialAuthorTagline className="text-label text-muted-foreground mt-0.5">{item.authorTagline}</TestimonialAuthorTagline>
      </div>
    </TestimonialAuthor>
  </Testimonial>
);

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: "Trusted by businesses", text: "Across industries and domains" },
  { icon: Rocket, title: "Results that matter", text: "Solutions that drive growth and impact" },
  { icon: Users, title: "A partnership approach", text: "We grow when you grow" },
  { icon: Headphones, title: "Support that stays", text: "With you, before and after launch" },
];

// TODO(owner): confirm every quote above is real and approved for public use (no ratings are shown: we have no rating source).
const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const reduceMotion = useReducedMotion();
  const all = [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW2];

  return (
    <section data-logi="Real words from real clients." className="py-section bg-secondary/30 relative overflow-hidden" ref={ref}>
      <div className="w-full max-w-[87.5rem] mx-auto px-gutter relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-section-head space-y-4"
        >
          <Eyebrow>Testimonials</Eyebrow>
          <h2 className="font-display text-h2 font-bold text-foreground">What our clients say</h2>
          <p className="text-body text-muted-foreground max-w-xl mx-auto">
            Real stories from people who trust Logisaar to build, deliver and grow together.
          </p>
        </motion.div>

        {reduceMotion ? (
          // reduced motion: a static, wrapping grid instead of the moving rows
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-6 list-none p-0 m-0">
            {all.map((item) => (
              <li key={item.authorName} className="flex"><TestimonialCard item={item} /></li>
            ))}
          </ul>
        ) : (
          <div className="w-full space-y-6 max-w-7xl mx-auto py-4">
            {[
              { rows: TESTIMONIALS_ROW1, speed: 35, direction: "left" as const },
              { rows: TESTIMONIALS_ROW2, speed: 30, direction: "right" as const },
            ].map(({ rows, speed, direction }) => (
              <Marquee key={direction} className="py-2">
                <MarqueeFade side="left" className="z-20" />
                <MarqueeFade side="right" className="z-20" />
                <MarqueeContent speed={speed} direction={direction}>
                  {rows.map((item) => (
                    <MarqueeItem key={item.authorName}><TestimonialCard item={item} /></MarqueeItem>
                  ))}
                </MarqueeContent>
              </Marquee>
            ))}
          </div>
        )}

        <ul className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-6 rounded-3xl border border-border bg-card p-6 list-none m-0">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-primary/10 text-primary-ink flex items-center justify-center shrink-0">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-body-sm font-semibold text-foreground leading-tight">{title}</span>
                <span className="block text-label text-muted-foreground mt-0.5">{text}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="text-center mt-10">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-on rounded-full px-8 gap-2 font-semibold min-h-[2.75rem]">
            <Link to="/contact">
              <span>Talk to us</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
