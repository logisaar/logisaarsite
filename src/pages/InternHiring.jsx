import React, { useState } from 'react';
import { Mail, Phone, Send, User, GraduationCap, Code, Video, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const InternHiring = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    skills: '',
    internType: '',
    whyInterested: '',
    resume: null
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

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = "https://script.google.com/macros/s/AKfycby3ujCTfq3rPzs0H8eVqhhzrUXDuNB4_NyG8YxLFZQvLPodndPy_qwW72X6jv5eSWOabw/exec";

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Name', formData.name);
      formDataToSend.append('Email', formData.email);
      formDataToSend.append('Phone', formData.phone);
      formDataToSend.append('College', formData.college);
      formDataToSend.append('Year', formData.year);
      formDataToSend.append('Skills', formData.skills);
      formDataToSend.append('InternType', formData.internType);
      formDataToSend.append('WhyInterested', formData.whyInterested);
      if (formData.resume) {
        formDataToSend.append('Resume', formData.resume);
      }

      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend
      });
      const data = await response.text();
      console.log("Success:", data);
      toast({
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you soon.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({ title: "Error", description: "Failed to submit application.", variant: "destructive" });
    }

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      college: '',
      year: '',
      skills: '',
      internType: '',
      whyInterested: '',
      resume: null
    });
    setIsSubmitting(false);
  };

  const internTypes = [
    {
      type: 'Video Editor',
      icon: <Video className="h-8 w-8" />,
      description: 'Work on creating engaging video content for our clients. Learn professional editing techniques, motion graphics, and storytelling.',
      skills: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Creativity', 'Attention to Detail'],
      color: 'from-purple-400 to-pink-500'
    },
    {
      type: 'Backend Developer',
      icon: <Code className="h-8 w-8" />,
      description: 'Build robust server-side applications and APIs. Gain experience with modern frameworks and database management.',
      skills: ['JavaScript/Node.js', 'Python/Django', 'Databases', 'API Development', 'Problem Solving'],
      color: 'from-cyan-400 to-blue-500'
    }
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Internship Program</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Kickstart your career with hands-on experience in Video Editing or Backend Development.
              Learn from industry professionals and work on real projects.
            </p>
          </div>
        </div>
      </section>

      {/* Internship Types */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Path</span>
            </h2>
            <p className="text-lg text-slate-300">Select the internship that aligns with your interests and skills</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {internTypes.map((intern, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 group">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${intern.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {intern.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{intern.type}</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">{intern.description}</p>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {intern.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-700/50 text-cyan-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Apply for Internship
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
                    placeholder="your.email@example.com"
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
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="college" className="block text-sm font-medium text-slate-300 mb-2">
                    College/University *
                  </label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="Your College Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-slate-300 mb-2">
                    Year of Study *
                  </label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="">Select year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="internType" className="block text-sm font-medium text-slate-300 mb-2">
                    Internship Type *
                  </label>
                  <select
                    id="internType"
                    name="internType"
                    value={formData.internType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="">Select internship type</option>
                    <option value="Video Editor">Video Editor</option>
                    <option value="Backend Developer">Backend Developer</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-slate-300 mb-2">
                  Relevant Skills *
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  placeholder="List your relevant skills (e.g., programming languages, software tools, etc.)"
                />
              </div>

              <div>
                <label htmlFor="whyInterested" className="block text-sm font-medium text-slate-300 mb-2">
                  Why are you interested in this internship? *
                </label>
                <textarea
                  id="whyInterested"
                  name="whyInterested"
                  value={formData.whyInterested}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  placeholder="Tell us about your motivation and what you hope to learn..."
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-slate-300 mb-2">
                  Resume (PDF/DOC) *
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 transition-all"
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
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Success Message */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white mb-6">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">What Happens Next?</h2>
          <p className="text-slate-300 leading-relaxed">
            After submitting your application, our team will review it within 3-5 business days.
            If selected, we'll contact you for an interview. Best of luck!
          </p>
        </div>
      </section>
    </div>
  );
};

export default InternHiring;
