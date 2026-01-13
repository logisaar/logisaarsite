import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Clock, DollarSign } from 'lucide-react';
import { services } from '../data/mockData';

const Services = () => {
  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements, goals, and technical needs to create a comprehensive project roadmap.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      step: "02",
      title: "Design & Architecture",
      description: "Our team creates wireframes, mockups, and technical architecture that align with your vision.",
      color: "from-purple-400 to-pink-500"
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "We build your solution using best practices, with continuous testing and quality assurance.",
      color: "from-green-400 to-teal-500"
    },
    {
      step: "04",
      title: "Deployment & Support",
      description: "We launch your project and provide ongoing support to ensure optimal performance.",
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive digital solutions tailored to your business needs. From concept to deployment,
              we deliver excellence at every stage of your digital journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{service.icon}</div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <span className="text-slate-400">{service.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {service.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mb-6 pt-4 border-t border-slate-700/50">
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className="text-lg text-slate-500 font-medium">Est. Price:</span>
                    <span className="text-xl text-slate-400 font-semibold">{service.startingPrice}</span>
                  </div>
                  <div className="text-emerald-400 text-sm font-bold mb-3">Consultation Fee: ₹499</div>

                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-yellow-400 text-xs font-medium flex items-start">
                      <span className="mr-1 mt-0.5">*</span>
                      Final price of the project will be decided after consultation.
                    </p>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  state={{ service: service }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="group relative text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform`}>
                  {step.step}
                </div>

                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  {step.description}
                </p>

                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-cyan-400/50 to-purple-600/50 transform -translate-x-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Let's discuss your project and turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
              >
                Get Free Consultation
              </Link>
              <Link
                to="/projects"
                className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full text-lg font-medium hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:scale-105"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

