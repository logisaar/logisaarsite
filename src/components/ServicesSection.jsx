import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Smartphone, Palette, ShoppingCart, TrendingUp } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web Engineering",
      description: "Enterprise-grade web applications built with cutting-edge technologies and scalable architectures.",
      features: ["Microservices Architecture", "Advanced SEO", "Performance Optimization", "Cloud Integration"],
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Solutions",
      description: "Native and cross-platform mobile applications with sophisticated user experiences.",
      features: ["Cross-Platform Development", "Real-time Synchronization", "Advanced Analytics", "AI Integration"],
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Experience Design",
      description: "Human-centered design systems that create intuitive and engaging digital experiences.",
      features: ["Design Systems", "User Research", "Interaction Design", "Accessibility Standards"],
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Commerce Platforms",
      description: "Sophisticated e-commerce solutions with advanced features and seamless integrations.",
      features: ["Headless Architecture", "Payment Orchestration", "AI Recommendations", "Global Scalability"],
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth Engineering",
      description: "Data-driven optimization and maintenance services for sustained digital growth.",
      features: ["Performance Analytics", "Conversion Optimization", "A/B Testing", "Predictive Maintenance"],
      color: "from-rose-500 to-pink-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern-pro opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
            <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Our Expertise</span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Professional <span className="bg-gradient-to-r from-emerald-400 to-violet-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive digital solutions engineered for enterprise-grade performance and scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-500 hover:scale-105 border border-gray-700 hover:border-emerald-400/50 card-pro"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-slate-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 opacity-60"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-transparent to-violet-400/0 group-hover:from-emerald-400/5 group-hover:to-violet-400/5 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-violet-600 text-white px-10 py-5 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-violet-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-emerald-500/25 btn-professional"
          >
            <span>Explore All Services</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;