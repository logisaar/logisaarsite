import React from 'react';
import { CheckCircle, Zap, Shield, Users, Clock, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast Development",
      description: "We use cutting-edge technologies and agile methodologies to deliver projects quickly without compromising quality.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security First Approach",
      description: "Your data and applications are protected with industry-leading security practices and encryption protocols.",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Dedicated Support Team",
      description: "Our expert team provides 24/7 support and maintenance to ensure your digital solutions run smoothly.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "On-Time Delivery",
      description: "We pride ourselves on meeting deadlines and delivering projects on schedule, every time.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Award-Winning Quality",
      description: "Our work has been recognized by industry leaders and has won multiple awards for excellence.",
      color: "from-red-400 to-orange-500"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "100% Client Satisfaction",
      description: "We go above and beyond to ensure every client is completely satisfied with our work and service.",
      color: "from-cyan-400 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">LogiSaar</span>?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We're not just another development agency. We're your strategic partner in digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-900/70 transition-all duration-500 hover:scale-105 border border-slate-700 hover:border-cyan-400/50 overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${reason.color} transition-opacity duration-500`}></div>
              
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${reason.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {reason.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {reason.title}
              </h3>
              
              <p className="text-slate-300 leading-relaxed">
                {reason.description}
              </p>
              
              {/* Subtle glow effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-cyan-400 font-medium">
            <CheckCircle className="h-5 w-5" />
            <span>Ready to experience the LogiSaar difference?</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;