import React from 'react';
import { technologies } from '../data/mockData';

const TechStack = () => {
  const categories = {
    Frontend: technologies.filter(tech => tech.category === 'Frontend'),
    Backend: technologies.filter(tech => tech.category === 'Backend'),
    Mobile: technologies.filter(tech => tech.category === 'Mobile'),
    Database: technologies.filter(tech => tech.category === 'Database'),
    Cloud: technologies.filter(tech => tech.category === 'Cloud'),
    DevOps: technologies.filter(tech => tech.category === 'DevOps')
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We leverage the latest technologies to build robust, scalable, and future-proof solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([categoryName, techs]) => (
            <div key={categoryName} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 group">
              <h3 className="text-xl font-semibold text-white mb-6 group-hover:text-cyan-400 transition-colors">
                {categoryName}
              </h3>
              <div className="space-y-4">
                {techs.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900/70 transition-colors group/tech cursor-pointer"
                  >
                    <span className="text-2xl group-hover/tech:scale-110 transition-transform">
                      {tech.icon}
                    </span>
                    <span className="text-slate-300 group-hover/tech:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating tech icons animation */}
        <div className="relative mt-16 h-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="flex space-x-12 animate-marquee">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="text-4xl opacity-60 hover:opacity-100 transition-opacity animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {tech.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;