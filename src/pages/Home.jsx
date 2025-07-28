import React from 'react';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TechStack from '../components/TechStack';
import ClientImpact from '../components/ClientImpact';
import ContactCTA from '../components/ContactCTA';
import ProjectCarousel3D from '../components/ProjectCarousel3D';
import OfferSection from '../components/OfferSection';
import GoogleReviews from '../components/GoogleReviews';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative">

      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <TechStack />
      <ProjectCarousel3D />
      <OfferSection />
      <ClientImpact />
      <GoogleReviews />
      <ContactCTA />
    </div>
  );
};

export default Home;
