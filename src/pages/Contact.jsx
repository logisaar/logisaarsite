import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success toast
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
      variant: "default"
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      project: '',
      budget: '',
      timeline: '',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+91 781-5014-638",
      link: "tel:+91 781-5014-638",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "logisaar@gmail.com",
      link: "mailto:logisaar@gmail.com",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: (
        <>
          Odisha, Bhubaneswar, Chandaka
          <div className="mt-4 rounded overflow-hidden border border-slate-700">
            <iframe
              title="Nalanda Institute of Technology Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.410777583336!2d85.75806097528327!3d20.365946281122657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19060462635441%3A0x2697f0bcc78c2240!2sNalanda%20Institute%20of%20Technology%20%5BNIT%5D%2C%20Bhubaneswar!5e0!3m2!1sen!2sin!4v1752829732299!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </>
      ),
      link: "#",
      color: "from-purple-400 to-pink-500"
    }
  ];

  const projectTypes = [
    "Website Development",
    "Mobile App Development",
    "UI/UX Design",
    "E-Commerce Solutions",
    "SEO & Maintenance",
    "Custom Software",
    "Other"
  ];

  const budgetRanges = [
    "₹5,000 - ₹10,000",
    "₹10,000 - ₹25,000",
    "₹25,000 - ₹50,000",
    "₹50,000 - ₹100,000",
    "₹100,000+"
  ];

  const timelines = [
    "ASAP",
    "1-2 months",
    "3-6 months",
    "6+ months",
    "Not decided"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get In <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your digital presence? Let's discuss your project 
              and turn your vision into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Tell Us About Your Project
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="contact@gmail.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-slate-300 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-slate-300 mb-2">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-slate-900/50 hover:bg-slate-900/70 transition-all duration-200 group"
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${info.color} text-white group-hover:scale-110 transition-transform`}>
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">{info.title}</div>
                        <div className="text-white font-medium">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Quick Response */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white mb-4">
                    <Clock className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Quick Response</h3>
                  <p className="text-slate-300 mb-4">
                    We respond to all inquiries within 24 hours, usually much sooner.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Free consultation included</span>
                  </div>
                </div>
              </div>
              
              {/* Alternative Contact */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Prefer to Chat?</h3>
                <p className="text-slate-300 mb-6">
                  Start a conversation with our team for immediate assistance.
                </p>
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Start Live Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on complexity, but most websites take 4-8 weeks, while mobile apps typically require 8-12 weeks."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, we offer comprehensive support packages including maintenance, updates, and 24/7 technical support."
              },
              {
                question: "What is your development process?",
                answer: "We follow an agile methodology with regular check-ins, ensuring transparency and client involvement throughout the project."
              },
              {
                question: "Do you work with international clients?",
                answer: "Absolutely! We work with clients worldwide and have experience managing projects across different time zones."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
