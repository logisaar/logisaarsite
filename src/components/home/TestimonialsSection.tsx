import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ShieldCheck, Rocket, Users, Headphones, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    quote: "LogiSaar transformed the way we handle consultations and client requests. The platform is fast, reliable and extremely easy to use.",
    accent: "border-primary/30 hover:border-primary/80 shadow-primary/5",
    quoteColor: "text-primary"
  },
  {
    logo: logoCmc,
    authorName: "CMC Infratech Pvt. Ltd.",
    authorTagline: "Construction & Infrastructure",
    quote: "The digital gatepass system built by LogiSaar has improved our campus security and visitor management significantly.",
    accent: "border-blue-500/30 hover:border-blue-500/80 shadow-blue-500/5",
    quoteColor: "text-blue-500"
  },
  {
    logo: logoEklabhya,
    authorName: "Eklabhya Classes",
    authorTagline: "Education & Academy",
    quote: "The custom learning management portal streamlined our online classes and exam schedules. Parents and students love it!",
    accent: "border-amber-500/30 hover:border-amber-500/80 shadow-amber-500/5",
    quoteColor: "text-amber-500"
  },
  {
    logo: logoLinchans,
    authorName: "Linchans",
    authorTagline: "Creative & Media Agency",
    quote: "The digital portfolio and branding solutions provided by LogiSaar have helped us stand out in a highly competitive market.",
    accent: "border-indigo-500/30 hover:border-indigo-500/80 shadow-indigo-500/5",
    quoteColor: "text-indigo-500"
  },
  {
    logo: logoJnsBio,
    authorName: "JNS Biology Classes",
    authorTagline: "Academics & Science",
    quote: "Managing online student resources and interactive science quizzes is now a breeze. Excellent technical support!",
    accent: "border-pink-500/30 hover:border-pink-500/80 shadow-pink-500/5",
    quoteColor: "text-pink-500"
  },
  {
    logo: logoRenuka,
    authorName: "The Renuka",
    authorTagline: "Hospitality & Stay",
    quote: "Our booking and reservation portal works flawlessly. Client feedback on the UI has been overwhelmingly positive.",
    accent: "border-cyan-500/30 hover:border-cyan-500/80 shadow-cyan-500/5",
    quoteColor: "text-cyan-500"
  }
];

const TESTIMONIALS_ROW2 = [
  {
    logo: logoBaba,
    authorName: "Baba Brand Fashion",
    authorTagline: "E-commerce & Apparel",
    quote: "From design to deployment, the team was very professional and delivered our e-commerce platform beyond expectations.",
    accent: "border-purple-500/30 hover:border-purple-500/80 shadow-purple-500/5",
    quoteColor: "text-purple-500"
  },
  {
    logo: logoAmruta,
    authorName: "Amruta Bhojan",
    authorTagline: "Hospitality & Restaurant",
    quote: "Our online food ordering and delivery system has doubled our daily sales with a seamless and extremely clean user interface.",
    accent: "border-rose-500/30 hover:border-rose-500/80 shadow-rose-500/5",
    quoteColor: "text-rose-500"
  },
  {
    logo: logoVastu,
    authorName: "Masoom Vastu Guru",
    authorTagline: "Consultancy Services",
    quote: "Our consultation booking portal is extremely fast and responsive. We highly recommend LogiSaar's development services.",
    accent: "border-teal-500/30 hover:border-teal-500/80 shadow-teal-500/5",
    quoteColor: "text-teal-500"
  },
  {
    logo: logoVinayak,
    authorName: "Vinayak Enterprises",
    authorTagline: "Retail & Trade",
    quote: "The stock inventory management app they built for us saved hundreds of hours of manual logging. Truly game-changing.",
    accent: "border-orange-500/30 hover:border-orange-500/80 shadow-orange-500/5",
    quoteColor: "text-orange-500"
  },
  {
    logo: logoJns,
    authorName: "JNS Academy",
    authorTagline: "Educational Center",
    quote: "LogiSaar delivered a highly robust administration portal that simplified student enrollment and inquiries.",
    accent: "border-violet-500/30 hover:border-violet-500/80 shadow-violet-500/5",
    quoteColor: "text-violet-500"
  },
  {
    logo: logoSako,
    authorName: "Sako Sales Corp.",
    authorTagline: "Distribution & Sales",
    quote: "Highly competent team that built our CRM system on time. The analytics dashboard provides fantastic business insights.",
    accent: "border-sky-500/30 hover:border-sky-500/80 shadow-sky-500/5",
    quoteColor: "text-sky-500"
  }
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section data-logi="Real words from real clients." className="py-32 bg-secondary/30 relative overflow-hidden" ref={ref}>
      
      {/* Background watercolor smears and dot matrices */}
      {/* Top-left dotted grid */}
      <div 
        className="absolute top-10 left-10 w-[200px] h-[150px] text-primary/15 pointer-events-none select-none z-0" 
        style={{ 
          backgroundImage: "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)", 
          backgroundSize: "8px 8px" 
        }} 
      />

      {/* Far-left green smear */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 filter blur-3xl rounded-full pointer-events-none z-0" />
      <div 
        className="absolute left-10 top-1/2 -translate-y-1/2 w-10 h-32 text-primary/15 pointer-events-none select-none z-0 hidden lg:block" 
        style={{ 
          backgroundImage: "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)", 
          backgroundSize: "8px 8px" 
        }} 
      />

      {/* Far-right purple smear */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/5 filter blur-3xl rounded-full pointer-events-none z-0" />
      <div 
        className="absolute right-10 top-1/2 -translate-y-1/2 w-10 h-32 text-purple-500/15 pointer-events-none select-none z-0 hidden lg:block" 
        style={{ 
          backgroundImage: "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)", 
          backgroundSize: "8px 8px" 
        }} 
      />

      {/* Decorative quotes glyph in top-right background */}
      <div className="absolute right-10 top-16 text-slate-200/40 dark:text-slate-800/20 pointer-events-none select-none z-0">
        <span className="font-serif text-[180px] md:text-[240px] leading-none">”</span>
      </div>

      {/* Decorative background curves at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none opacity-20 dark:opacity-10 z-0">
        <svg className="w-full h-full text-primary/10" viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
          <path d="M0,60 C360,90 720,50 1080,80 C1260,95 1380,60 1440,50" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0,80 C360,50 720,90 1080,70 C1260,60 1380,85 1440,75" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Centered Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-5"
        >
          {/* Eyebrow badge with flanking horizontal lines and circle beads */}
          <div className="flex items-center justify-center gap-3 text-primary font-mono text-xs uppercase tracking-widest font-bold mb-4">
            <div className="flex items-center gap-1">
              <span className="w-8 h-[1.5px] bg-primary/40 rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full border border-primary/40 bg-transparent" />
            </div>
            <span>TESTIMONIALS</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full border border-primary/40 bg-transparent" />
              <span className="w-8 h-[1.5px] bg-primary/40 rounded-full" />
            </div>
          </div>

          {/* Large display title with double underline squiggle */}
          <h2 
            className="font-display font-black tracking-tight text-slate-900 dark:text-white leading-tight"
            style={{ fontSize: "clamp(36px, 5vw, 68px)" }}
          >
            What Our{" "}
            <span className="relative inline-block text-primary">
              Clients Say
              <svg 
                className="absolute -bottom-3.5 left-0 w-full h-3 text-primary/80 pointer-events-none" 
                viewBox="0 0 200 10" 
                preserveAspectRatio="none" 
                fill="none"
              >
                <path d="M2,7 C60,2 140,8 198,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M10,9 C70,5 130,10 190,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              </svg>
            </span>
          </h2>

          {/* Subtitle wrap constraint */}
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-[540px] mx-auto text-center">
            Real stories from real people who trust LogiSaar to build, deliver and grow together.
          </p>
        </motion.div>

        {/* Double Row Marquee testimonials layout */}
        <div className="w-full space-y-6 overflow-visible max-w-7xl mx-auto py-4">
          
          {/* Row 1 (flows Left) */}
          <div className="w-full relative overflow-visible">
            <Marquee className="overflow-visible py-2">
              <MarqueeFade side="left" className="z-20" />
              <MarqueeFade side="right" className="z-20" />
              
              <MarqueeContent speed={35} direction="left">
                {TESTIMONIALS_ROW1.map((item, idx) => (
                  <MarqueeItem key={idx}>
                    <Testimonial 
                      className={`w-[360px] md:w-[380px] p-6 rounded-2xl border transition-all duration-300 liquid-glass bg-white/80 dark:bg-slate-950/80 hover:bg-white/95 dark:hover:bg-slate-900/95 shadow-sm hover:shadow-md ${item.accent}`}
                    >
                      <TestimonialQuote className="px-0 py-0 pb-5 text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed font-semibold">
                        <span className={`${item.quoteColor} font-serif text-2xl leading-none mr-1 inline-block -mt-1`}>“</span>
                        {item.quote}
                        <span className={`${item.quoteColor} font-serif text-2xl leading-none ml-1 inline-block -mt-1`}>”</span>
                      </TestimonialQuote>
                      
                      <TestimonialAuthor className="px-0 pt-4 pb-0 border-t border-border/40 flex items-center gap-4 mt-auto">
                        <TestimonialAvatar className="w-11 h-11 rounded-full border border-border/50 bg-white p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                          <TestimonialAvatarImg src={item.logo} alt={item.authorName} className="object-contain w-full h-full max-h-full" />
                          <TestimonialAvatarRing className="ring-1 ring-black/5 dark:ring-white/10" />
                        </TestimonialAvatar>
                        
                        <div className="text-left flex-1 min-w-0">
                          <TestimonialAuthorName className="text-sm font-extrabold text-foreground truncate">
                            {item.authorName}
                          </TestimonialAuthorName>
                          
                          <TestimonialAuthorTagline className="text-xs text-muted-foreground flex items-center justify-between gap-2 mt-1">
                            <span className="truncate">{item.authorTagline}</span>
                            <div className="flex gap-0.5 text-amber-500 shrink-0">
                              {[...Array(5)].map((_, si) => (
                                <Star key={si} size={10} fill="currentColor" stroke="currentColor" />
                              ))}
                            </div>
                          </TestimonialAuthorTagline>
                        </div>
                      </TestimonialAuthor>
                    </Testimonial>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>

          {/* Row 2 (flows Right) */}
          <div className="w-full relative overflow-visible">
            <Marquee className="overflow-visible py-2">
              <MarqueeFade side="left" className="z-20" />
              <MarqueeFade side="right" className="z-20" />
              
              <MarqueeContent speed={30} direction="right">
                {TESTIMONIALS_ROW2.map((item, idx) => (
                  <MarqueeItem key={idx}>
                    <Testimonial 
                      className={`w-[360px] md:w-[380px] p-6 rounded-2xl border transition-all duration-300 liquid-glass bg-white/80 dark:bg-slate-950/80 hover:bg-white/95 dark:hover:bg-slate-900/95 shadow-sm hover:shadow-md ${item.accent}`}
                    >
                      <TestimonialQuote className="px-0 py-0 pb-5 text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed font-semibold">
                        <span className={`${item.quoteColor} font-serif text-2xl leading-none mr-1 inline-block -mt-1`}>“</span>
                        {item.quote}
                        <span className={`${item.quoteColor} font-serif text-2xl leading-none ml-1 inline-block -mt-1`}>”</span>
                      </TestimonialQuote>
                      
                      <TestimonialAuthor className="px-0 pt-4 pb-0 border-t border-border/40 flex items-center gap-4 mt-auto">
                        <TestimonialAvatar className="w-11 h-11 rounded-full border border-border/50 bg-white p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                          <TestimonialAvatarImg src={item.logo} alt={item.authorName} className="object-contain w-full h-full max-h-full" />
                          <TestimonialAvatarRing className="ring-1 ring-black/5 dark:ring-white/10" />
                        </TestimonialAvatar>
                        
                        <div className="text-left flex-1 min-w-0">
                          <TestimonialAuthorName className="text-sm font-extrabold text-foreground truncate">
                            {item.authorName}
                          </TestimonialAuthorName>
                          
                          <TestimonialAuthorTagline className="text-xs text-muted-foreground flex items-center justify-between gap-2 mt-1">
                            <span className="truncate">{item.authorTagline}</span>
                            <div className="flex gap-0.5 text-amber-500 shrink-0">
                              {[...Array(5)].map((_, si) => (
                                <Star key={si} size={10} fill="currentColor" stroke="currentColor" />
                              ))}
                            </div>
                          </TestimonialAuthorTagline>
                        </div>
                      </TestimonialAuthor>
                    </Testimonial>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>

        </div>

        {/* Bottom Horizontal Highlights Bar (Revised 4-Column Layout) */}
        <div className="bg-white dark:bg-slate-900 border border-border/80 dark:border-slate-800/80 rounded-3xl p-6 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 max-w-5xl mx-auto mt-20 shadow-sm">
          {/* Highlight Item 1 */}
          <div className="flex items-center gap-4 w-full sm:w-[48%] lg:w-auto flex-1 justify-center lg:justify-start px-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck size={22} className="stroke-[1.8]" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground leading-tight">Trusted by Businesses</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Across industries and domains</div>
            </div>
          </div>

          <div className="hidden lg:block h-10 w-px bg-border/60 dark:bg-slate-800" />

          {/* Highlight Item 2 */}
          <div className="flex items-center gap-4 w-full sm:w-[48%] lg:w-auto flex-1 justify-center lg:justify-start px-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Rocket size={20} className="stroke-[1.8]" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground leading-tight">Results That Matter</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Solutions that drive growth and impact</div>
            </div>
          </div>

          <div className="hidden lg:block h-10 w-px bg-border/60 dark:bg-slate-800" />

          {/* Highlight Item 3 */}
          <div className="flex items-center gap-4 w-full sm:w-[48%] lg:w-auto flex-1 justify-center lg:justify-start px-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Users size={20} className="stroke-[1.8]" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground leading-tight">Partnership Approach</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">We grow when you grow</div>
            </div>
          </div>

          <div className="hidden lg:block h-10 w-px bg-border/60 dark:bg-slate-800" />

          {/* Highlight Item 4 */}
          <div className="flex items-center gap-4 w-full sm:w-[48%] lg:w-auto flex-1 justify-center lg:justify-start px-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Headphones size={20} className="stroke-[1.8]" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground leading-tight">Support That Stays</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">With you, before and after launch</div>
            </div>
          </div>
        </div>

        {/* Closing Accent Line with curved arrows */}
        <div className="relative max-w-2xl mx-auto mt-16 text-center z-10">
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-16 h-px border-t border-dashed border-primary/30 hidden md:block" />
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-16 h-px border-t border-dashed border-primary/30 hidden md:block" />
          
          <div className="flex items-center justify-center gap-3 text-sm md:text-base text-muted-foreground font-medium">
            <span className="text-primary font-serif text-3xl h-3 leading-none -mt-3">“</span>
            <span>
              We don't just deliver projects, we build <span className="text-primary font-semibold">partnerships that last</span>.
            </span>
            <span className="text-primary font-serif text-3xl h-3 leading-none -mt-3">”</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 gap-2 font-semibold shadow-md transition-all hover:scale-103 duration-300">
            <Link to="/portfolio">
              <span>View All Success Stories</span>
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
