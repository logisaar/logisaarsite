import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import AnimatedButton from "@/components/creative/AnimatedButton";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const productsCardRef = useRef<HTMLDivElement>(null);
  const buildersCardRef = useRef<HTMLDivElement>(null);
  const productsValRef = useRef<HTMLDivElement>(null);
  const buildersValRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set([taglineRef.current, headlineRef.current, subheadRef.current, ctaRef.current, productsCardRef.current, buildersCardRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "cubic-bezier(0.4, 0, 0.2, 1)" } });

      // 1. Tagline fade-up
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      }

      // 2. Headline fade-up
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
      }

      // 2. Subhead staggered
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.5"
      );

      // 3. CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.5"
      );


      // 5. Products card fade-up
      if (productsCardRef.current) {
        tl.fromTo(
          productsCardRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
      }

      // 6. Builders card fade-up
      if (buildersCardRef.current) {
        tl.fromTo(
          buildersCardRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        );
      }

      // Ken Burns looping effect on background images
      gsap.to(".hero-bg-image", {
        scale: 1.06,
        xPercent: 1.5,
        yPercent: 0.8,
        duration: 25,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Staggered Number Count-Up Animation
      const counters = { products: 0, builders: 0 };
      tl.to(counters, {
        products: 30,
        builders: 25,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          if (productsValRef.current) {
            productsValRef.current.innerText = Math.floor(counters.products) + "+";
          }
          if (buildersValRef.current) {
            buildersValRef.current.innerText = Math.floor(counters.builders) + "+";
          }
        }
      }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-logi-dock
      className="relative min-h-[85svh] flex flex-col justify-start md:justify-center overflow-hidden bg-white text-foreground"
    >
      {/* Responsive hero background images */}
      <div
        className="hero-bg-image absolute inset-0 bg-cover bg-center pointer-events-none z-0 md:hidden"
        style={{
          backgroundImage: "url('/hero-bg-mobile.svg')",
          // soft clear zone behind the text column so the art sits in the corners
          WebkitMaskImage: "radial-gradient(ellipse 85% 48% at 50% 40%, transparent 0 45%, #000 100%)",
          maskImage: "radial-gradient(ellipse 85% 48% at 50% 40%, transparent 0 45%, #000 100%)",
        }}
      />
      <div
        className="hero-bg-image absolute inset-0 bg-cover bg-center pointer-events-none z-0 hidden md:block"
        style={{ backgroundImage: "url('/hero-bg.svg')" }}
      />

      {/* Subtle grid — very faint */}
      <div className="absolute inset-0 animated-grid pointer-events-none z-[1] opacity-40" />

      <div className="container mx-auto px-gutter relative z-10 pb-12" style={{ paddingTop: "calc(var(--header-h) + clamp(1.5rem, 4vw, 3rem))" }}>
        <div className="flex flex-col items-center text-center">
          {/* Tagline / Subpoint */}
          <div
            ref={taglineRef}
            className="text-label font-medium text-primary-ink uppercase tracking-[0.06em] mb-4 opacity-0"
          >
            Software · AI Agents · Automation
          </div>

          {/* Headline — Space Grotesk 700, centered, max-width ~780px */}
          <h1
            ref={headlineRef}
            className="font-display text-h1 font-bold mb-6 opacity-0 mx-auto max-w-[48.75rem]"
          >
            Less <span className="line-through decoration-[4px] decoration-foreground/70 text-muted-foreground">busywork.</span><br />More <span className="text-gradient">business.</span>
          </h1>

          {/* Subhead — Inter 400/500 */}
          <p
            ref={subheadRef}
            data-logi-avoid
            className="text-lead text-muted-foreground font-normal max-w-2xl mb-8 opacity-0 mx-auto text-balance"
          >
            Logisaar builds custom software, AI agents and business automation that take repetitive work off your team, so your people can spend their day on customers and growth.
          </p>

          {/* CTA: 2 primary buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-4 opacity-0"
          >
            <AnimatedButton
              as={Link}
              to="/contact"
              data-logi-hover="Let's build something!"
              className="shadow-glow"
            >
              Start a Project
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform relative z-20" />
            </AnimatedButton>
            <Button
              asChild
              variant="outline"
              className="h-12 px-8 text-base border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary-ink text-foreground rounded-full transition-all duration-200 hover:-translate-y-[0.125rem]"
            >
              <Link to="/solutions">
                Explore Services
                <ArrowRight size={18} className="ml-2 opacity-60" />
              </Link>
            </Button>
          </div>

          {/* Secondary text links */}
          <div className="flex flex-wrap items-center justify-center gap-x-1 text-sm text-muted-foreground mb-6">
            <span>Looking for</span>
            <Link
              to="/products"
              className="inline-flex min-h-[2.75rem] items-center px-1 text-primary-ink hover:underline font-medium"
            >
              HeyLane or IKURO
            </Link>
            <span className="-ml-1">?</span>
            <span className="mx-1">·</span>
            <span>Just want to talk?</span>
            <Link
              to="/contact"
              className="inline-flex min-h-[2.75rem] items-center px-1 text-primary-ink hover:underline font-medium ml-1"
            >
              Contact us
            </Link>
          </div>


        </div>
      </div>

      {/* Floating 500+ Builders Card at bottom-right */}
      <div
        ref={buildersCardRef}
        className="absolute bottom-12 right-8 z-20 max-w-[17.5rem] hidden lg:block opacity-0"
      >
        <div className="liquid-glass p-4 flex items-center gap-3.5 rounded-2xl">
          <div
            ref={buildersValRef}
            className="h-12 min-w-[3rem] px-2.5 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-on font-bold text-lg font-display shrink-0 select-none shadow-sm"
            style={{ filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))" }}
          >
            25+
          </div>
          <div className="text-left space-y-0.5">
            <p className="font-bold text-foreground text-label font-display">Happy Clients</p>
            <p className="text-label text-muted-foreground leading-relaxed">
              Schools, hotels, clinics and growing businesses.
            </p>
          </div>
        </div>
      </div>

      {/* Floating 25+ Products Card at bottom-left */}
      <div
        ref={productsCardRef}
        className="absolute bottom-12 left-8 z-20 max-w-[17.5rem] hidden lg:block opacity-0"
      >
        <div className="liquid-glass p-4 flex items-center gap-3.5 rounded-2xl">
          <div
            ref={productsValRef}
            className="h-12 min-w-[3rem] px-2.5 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-on font-bold text-lg font-display shrink-0 select-none shadow-sm"
            style={{ filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))" }}
          >
            30+
          </div>
          <div className="text-left space-y-0.5">
            <p className="font-bold text-foreground text-label font-display">Projects Delivered</p>
            <p className="text-label text-muted-foreground leading-relaxed">
              Software, AI agents and automations live in production.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
