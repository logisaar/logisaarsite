import React, { useState } from 'react';

const Offer = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

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
            <div className="text-center mb-4">
              <button
                onClick={toggleForm}
                className="inline-flex justify-center rounded-md border border-transparent bg-cyan-400 py-2 px-6 text-sm font-medium text-black shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
              >
                {showForm ? 'Hide Application Form' : 'Apply'}
              </button>
            </div>
            {showForm && (
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-700 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400 sm:text-sm p-2"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-700 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400 sm:text-sm p-2"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-700 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400 sm:text-sm p-2"
                    placeholder="+1234567890"
                  />
                </div>
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-white">
                    University / College Name
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-700 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400 sm:text-sm p-2"
                    placeholder="Your university or college"
                  />
                </div>
                <div>
                  <label htmlFor="degree" className="block text-sm font-medium text-white">
                    Degree / Program
                  </label>
                  <input
                    type="text"
                    id="degree"
                    name="degree"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-700 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400 sm:text-sm p-2"
                    placeholder="Your degree or program"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-white">
                    Year of Study
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    min="1"
                    max="10"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-700 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400 sm:text-sm p-2"
                    placeholder="Your current year of study"
                  />
                </div>
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-white">
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    className="mt-1 block w-full text-white"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-white">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-700 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400 sm:text-sm p-2"
                    placeholder="Any additional information"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-cyan-400 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
