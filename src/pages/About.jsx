import React from 'react';
import { Code, Heart, Zap, Users, Award, Target } from 'lucide-react';
import { team } from '../data/mockData';

const About = () => {
  const values = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Innovation First",
      description: "We stay ahead of the curve, constantly exploring new technologies and methodologies to deliver cutting-edge solutions.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Client-Centric",
      description: "Your success is our success. We build lasting relationships by understanding your unique needs and delivering exceptional value.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Quality Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to user experience and customer service.",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaborative Spirit",
      description: "We work as an extension of your team, fostering open communication and transparency throughout the development process.",
      color: "from-orange-400 to-red-500"
    }
  ];

  const achievements = [
    { number: "50+", label: "Projects Completed", icon: <Target className="h-6 w-6" /> },
    { number: "30+", label: "Happy Clients", icon: <Users className="h-6 w-6" /> },
    { number: "5+", label: "Years Experience", icon: <Award className="h-6 w-6" /> },
    { number: "99%", label: "Client Satisfaction", icon: <Heart className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">LogiSaar</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              We are a passionate team of developers, designers, and digital strategists dedicated to 
              transforming ideas into exceptional digital experiences that drive business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Story</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                <p>
                  Founded in 2025, LogiSaar began as a small team of passionate developers who believed 
                  that great software could transform businesses. What started as a vision to bridge the 
                  gap between innovative technology and practical business solutions has grown into a 
                  trusted partner for companies worldwide.
                </p>
                <p>
                  Our journey has been marked by continuous learning, adaptation, and an unwavering 
                  commitment to excellence. We've had the privilege of working with startups, SMEs, 
                  and enterprise clients, helping them navigate the digital landscape and achieve 
                  their business objectives.
                </p>
                <p>
                  Today, we're proud to be recognized as a leading software development agency, 
                  but we remain true to our core values: innovation, quality, and client success. 
                  Every project we undertake is an opportunity to create something exceptional.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-slate-700">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white mb-3">
                        {achievement.icon}
                      </div>
                      <div className="text-2xl font-bold text-white">{achievement.number}</div>
                      <div className="text-slate-300 text-sm">{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we approach every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${value.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The talented individuals who bring your digital visions to life.
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

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
              To empower businesses with innovative digital solutions that drive growth, 
              enhance user experiences, and create lasting value in an ever-evolving digital landscape.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;