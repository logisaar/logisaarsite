import React from 'react';
import { Star, Quote, Users, TrendingUp } from 'lucide-react';
import { testimonials } from '../data/mockData';

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Client <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Testimonials</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Hear what our clients say about their experience working with LogiSaar. 
              Their success stories are our greatest achievement.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="text-3xl font-bold text-cyan-400 mb-2">4.9/5</div>
              <div className="text-slate-300">Average Rating</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">30+</div>
              <div className="text-slate-300">Happy Clients</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-slate-300">Projects Completed</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">99%</div>
              <div className="text-slate-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Quote className="h-12 w-12 text-cyan-400" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-lg text-slate-300 leading-relaxed mb-6 relative z-10">
                  "{testimonial.text}"
                </blockquote>
                
                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-cyan-400 text-sm">{testimonial.position}</div>
                    <div className="text-slate-400 text-sm">{testimonial.company}</div>
                  </div>
                </div>

                {/* Google Map Embed */}
                <div className="mt-6 rounded overflow-hidden border border-slate-700">
                  <iframe
                    title={`Location of ${testimonial.name}`}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.53788635868!2d85.73805150943434!3d20.30086486875611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1752832133773!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-transparent to-purple-400/0 group-hover:from-cyan-400/5 group-hover:to-purple-400/5 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700 text-center">
            <Quote className="h-16 w-16 text-cyan-400 mx-auto mb-8 opacity-60" />
            <blockquote className="text-2xl md:text-3xl text-white font-light italic mb-8 leading-relaxed">
              "Working with LogiSaar was transformative for our business. They didn't just deliver 
              a product; they delivered a solution that revolutionized how we operate."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img
                src="/api/placeholder/80/80"
                alt="Sarah Johnson"
                className="w-16 h-16 rounded-full object-cover border-4 border-cyan-400/20"
              />
              <div className="text-left">
                <div className="font-semibold text-white text-lg">Sarah Johnson</div>
                <div className="text-cyan-400">CEO, TechFlow Inc</div>
                <div className="flex items-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Success <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Metrics</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real results from real clients who trusted us with their digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 text-center group hover:border-cyan-400/50 transition-all duration-300">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">300%</div>
              <div className="text-white font-semibold mb-2">Average ROI Increase</div>
              <div className="text-slate-300 text-sm">Across all client projects</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 text-center group hover:border-purple-400/50 transition-all duration-300">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-2">2M+</div>
              <div className="text-white font-semibold mb-2">Users Reached</div>
              <div className="text-slate-300 text-sm">Through our applications</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 text-center group hover:border-blue-400/50 transition-all duration-300">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">4.9/5</div>
              <div className="text-white font-semibold mb-2">Client Satisfaction</div>
              <div className="text-slate-300 text-sm">Average rating across all projects</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;