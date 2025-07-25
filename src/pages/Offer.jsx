import React from 'react';

const Offer = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-white">
          Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Special Offers</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Offer 1: Help us find clients */}
          <div className="group bg-slate-800/70 rounded-2xl p-8 border border-slate-700 hover:border-cyan-400 hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-semibold mb-4 text-center">Help Us Find Clients</h3>
            <p className="mb-6 text-center">
              If you help us find clients, you will receive exclusive offers on our products as a token of our appreciation.
            </p>
            <ul className="list-disc list-inside text-sm text-slate-300 mb-6">
              <li>Earn discounts on our services and products</li>
              <li>Priority access to new features and updates</li>
              <li>Special recognition on our website and social media</li>
              <li>Flexible reward options tailored to your preferences</li>
            </ul>
            <div className="text-lg font-bold text-cyan-400 text-center">
              Contact us to learn more about this offer!
            </div>
          </div>

          {/* Offer 2: Internship Opportunity */}
          <div className="group bg-slate-800/70 rounded-2xl p-8 border border-slate-700 hover:border-cyan-400 hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-semibold mb-4 text-center">Internship Opportunity</h3>
            <p className="mb-6 text-center">
              Interested in gaining real-world experience? Join our team as an intern and work on exciting projects while learning from industry experts.
            </p>
            <ul className="list-disc list-inside text-sm text-slate-300 mb-6">
              <li>Hands-on experience with cutting-edge technologies</li>
              <li>Mentorship from experienced professionals</li>
              <li>Opportunity to contribute to live projects</li>
              <li>Potential for full-time employment after internship</li>
            </ul>
            <div className="text-lg font-bold text-cyan-400 text-center">
              Apply now to start your journey with us!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
