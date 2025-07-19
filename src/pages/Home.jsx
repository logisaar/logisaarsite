import React from 'react';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TechStack from '../components/TechStack';
import ClientImpact from '../components/ClientImpact';
import ContactCTA from '../components/ContactCTA';
import ProjectCarousel3D from '../components/ProjectCarousel3D';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative">

      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <TechStack />
      <ProjectCarousel3D />
      <ClientImpact />
      <ContactCTA />
    </div>
  );
};

export default Home;
