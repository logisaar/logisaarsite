import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Phone, Mail } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden mb-0">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your 
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"> Digital Presence</span>?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Let's discuss your project and turn your vision into reality. 
            Get in touch today for a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Quick Contact Options */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 text-center group">
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Live Chat</h3>
            <p className="text-slate-300 mb-4">Get instant answers to your questions</p>
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              Start Chat →
            </button>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 text-center group">
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white mb-4 group-hover:scale-110 transition-transform">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
            <p className="text-slate-300 mb-4">Speak directly with our experts</p>
            <a href="tel:+1234567890" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              +1 (234) 567-890
            </a>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 text-center group">
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white mb-4 group-hover:scale-110 transition-transform">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
            <p className="text-slate-300 mb-4">Send us your project details</p>
            <a href="mailto:hello@logisaar.com" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              hello@logisaar.com
            </a>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/contact"
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-2"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/projects"
              className="group border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full text-lg font-medium hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-400/25"
            >
              View Our Portfolio
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Free project consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>No obligation quote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;

