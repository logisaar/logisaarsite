
import techflowhImg from "../image/techflow.png";
import React from 'react';
import { TrendingUp, Users, Clock, Award, BarChart3, Target } from 'lucide-react';

const ClientImpact = () => {
  const impacts = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      metric: "300%",
      label: "Average ROI Increase",
      description: "Our clients see an average 300% return on investment within 6 months",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      metric: "200+",
      label: "Users Reached",
      description: "Our applications have reached over 2 hundred active users globally",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      metric: "50%",
      label: "Faster Time to Market",
      description: "We help businesses launch 50% faster than industry average",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Award className="h-8 w-8" />,
      metric: "99%",
      label: "Client Satisfaction",
      description: "Near-perfect client satisfaction rate with long-term partnerships",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      metric: "85%",
      label: "Performance Improvement",
      description: "Average performance improvement across all optimized applications",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      metric: "95%",
      label: "Goal Achievement Rate",
      description: "Success rate in achieving client's business objectives",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Client <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Numbers that speak for themselves. See the real impact we've made on businesses worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-500 hover:scale-105 border border-slate-700 hover:border-cyan-400/50 text-center"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${impact.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {impact.icon}
              </div>

              {/* Metric */}
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${impact.color} bg-clip-text text-transparent`}>
                {impact.metric}
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {impact.label}
              </h3>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed">
                {impact.description}
              </p>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-cyan-400/50 group-hover:to-purple-400/50 transition-all duration-300"></div>

              {/* Glow effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r ${impact.color} rounded-2xl blur-xl transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Bottom testimonial */}
        {/* <div className="mt-16 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 max-w-4xl mx-auto">
            <blockquote className="text-xl md:text-2xl text-slate-300 italic mb-6">
              "LogiSaar didn't just build our platform; they transformed our entire business model. 
              The results speak for themselves – we're now the market leader in our space."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img
        src={techflowhImg}
        alt="Robert Baum - TechFlow"
        className="w-12 h-12 rounded-full object-cover"
      />
              <div className="text-left">
                <div className="font-semibold text-white">Robert Baum</div>
                <div className="text-slate-400">CEO, TechFlow </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ClientImpact;

