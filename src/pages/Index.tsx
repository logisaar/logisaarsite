import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TechStack from "@/components/home/TechStack";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ClientImpact from "@/components/home/ClientImpact";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import MarqueeText from "@/components/creative/MarqueeText";

const GradientDivider = () => (
  <div className="relative h-px w-full overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer" />
  </div>
);

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <MarqueeText text="WEB  ·  APP  ·  AI  ·  DESIGN  ·  GROWTH  ·  INNOVATION  ·  " />
      <ServicesOverview />
      <GradientDivider />
      <WhyChooseUs />
      <TechStack />
      <MarqueeText text="REACT  ·  FLUTTER  ·  NODE  ·  PYTHON  ·  AWS  ·  DOCKER  ·  " reverse />
      <FeaturedProjects />
      <GradientDivider />
      <ClientImpact />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
