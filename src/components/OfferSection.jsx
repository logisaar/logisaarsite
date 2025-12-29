import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/mockData';

const OfferSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Exciting Offers on Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-slate-800/70 rounded-2xl p-6 border border-slate-700 hover:border-cyan-400 hover:scale-105 transition-all duration-300"
            >
              <div className="text-5xl mb-4 text-center">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="mb-4">{service.description}</p>
              <ul className="mb-4 list-disc list-inside text-sm text-slate-300">
                {service.features.slice(0, 4).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="text-lg font-bold text-cyan-400">
                Starting at: {service.startingPrice}
              </div>
              <div className="text-sm text-slate-400">
                Delivery Time: {service.deliveryTime}
              </div>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  state={{ service: service }}
                  className="inline-block w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg text-center hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-emerald-500/25"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
};

export default OfferSection;
