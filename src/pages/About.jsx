import React from 'react';
import { Code, Heart, Zap, Users, Award, Target, BookOpen, ShieldCheck, MapPin, Phone, CheckCircle } from 'lucide-react';
import { team } from '../data/mockData';

const About = () => {
  const divisions = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "LogiSaar Technologies",
      subtitle: "IT & Digital Solutions",
      description: "Delivering professional technology services including website/web app development, software automation, and digital transformation.",
      features: ["Web & App Development", "Software Solutions", "Cloud Systems", "Business Analytics"],
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "TECHXERA",
      subtitle: "Education & Skill Development",
      description: "Focusing on affordable, practical, and industry-aligned education to empower individuals with career-oriented skills.",
      features: ["Technical Training", "Skill Development", "Workshops & Mentorship", "Digital Learning"],
      color: "from-purple-400 to-pink-500",
      link: "https://techxera.in"
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
              About <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">LTBCPS Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              A division of <span className="text-cyan-400 font-semibold">LTBCPS Solutions</span> — committed to delivering high-quality digital, educational, and lifestyle solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-12 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Who We <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Are</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                <p>
                  LTBCPS Solutions is a legally registered partnership firm operating under the Indian Partnership Act, 1932, established on 30th October 2025.
                  Headquartered in Bhubaneswar, Odisha, we are dedicated to empowering individuals, startups, and enterprises through reliable and scalable services.
                </p>
                <p>
                  We operate with a strong focus on technology innovation, skill development, and sustainable business practices.
                  Our goal is to become a trusted multi-domain organization that drives growth and positive change across India.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-2xl p-8 backdrop-blur-sm border border-slate-700">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                      <Target className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Our Mission</h3>
                      <p className="text-slate-400">To deliver reliable digital services, accessible education, and quality wellness products while contributing to employment generation and technological growth.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                      <Zap className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Our Vision</h3>
                      <p className="text-slate-400">To become a trusted multi-domain organization empowering individuals and businesses through innovation, knowledge, and sustainable development.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Divisions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Divisions</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Specialized sectors driving innovation and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {divisions.map((division, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 h-full"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${division.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {division.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {division.link ? (
                    <a href={division.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {division.title}
                    </a>
                  ) : (
                    division.title
                  )}
                </h3>
                <p className="text-cyan-400 text-sm font-medium mb-4">{division.subtitle}</p>
                <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                  {division.description}
                </p>
                <ul className="space-y-2">
                  {division.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics & Commitment */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <ShieldCheck className="mr-3 text-cyan-400" /> Business Ethics & Compliance
              </h3>
              <ul className="space-y-4">
                {[
                  "We follow transparent and ethical business practices",
                  "All transactions are conducted securely and responsibly",
                  "Customer data privacy and payment security are strictly maintained",
                  "Services are delivered as described on our official platforms"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-slate-300">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Heart className="mr-3 text-purple-400" /> Commitment to Customers
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                We aim to deliver high-quality services with transparency, timely support, and long-term value. Customer satisfaction and trust remain our highest priorities.
              </p>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                <h4 className="text-white font-semibold mb-2">Business Type</h4>
                <p className="text-slate-400 text-sm">Partnership Firm (Registered under the Indian Partnership Act, 1932)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The talented individuals who bring our vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.id}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-slate-700 group-hover:border-cyan-400/50 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h3>

                <p className="text-cyan-400 font-medium mb-4">
                  {member.position}
                </p>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="text-slate-400 hover:text-cyan-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      className="text-slate-400 hover:text-purple-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                  {member.dribbble && (
                    <a
                      href={member.dribbble}
                      className="text-slate-400 hover:text-pink-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dribbble
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Info Footer Section */}
      <section className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center justify-center md:justify-start">
                <MapPin className="mr-2 text-cyan-400" /> Registered Office
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Plot No-7491493, Bisudhananda Nagara, Sampur,<br />
                Khandagiri, PO Ghatikia,<br />
                PS Bharatpur, Bhubaneswar – 751003, Odisha, India
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center justify-center md:justify-start">
                <Phone className="mr-2 text-purple-400" /> Customer Support
              </h4>
              <p className="text-slate-400 leading-relaxed">
                For any service-related queries, support, or concerns, please reach us through our official communication channels provided on our website.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">About LTBCPS Solutions</h4>
              <p className="text-slate-500 text-sm">
                LTBCPS Solutions is a committed partnership firm delivering high-quality digital, educational, and lifestyle solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;