import React from 'react';
import { Shield, Lock, Eye, FileText, Server, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-slate-300">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Privacy Policy</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Transparency, trust, and your data security are the core pillars of our business operations at LTBCPS Solutions.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
              Effective Date: December 26, 2024
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* Intro Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl mb-12">
          <p className="text-slate-300 leading-relaxed text-lg">
            At <strong>LTBCPS Solutions</strong> (operating as LogiSaar), we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website <strong>logisaar.com</strong> or use our services.
          </p>
          <div className="mt-6 p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-lg">
            <p className="text-emerald-400 font-medium">
              By accessing or using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 1. Information We Collect */}
          <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
            <h2 className="flex items-center text-2xl font-bold text-white mb-6">
              <Eye className="w-6 h-6 mr-3 text-emerald-400" />
              1. Information Collected
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Personal Information</h3>
                <p className="text-slate-400 text-sm mb-3">Data you voluntarily provide:</p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 text-emerald-500 mt-0.5" /> Name, Email, Phone Number</li>
                  <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 text-emerald-500 mt-0.5" /> Billing & Mailing Address</li>
                  <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 text-emerald-500 mt-0.5" /> Project Requirements & Briefs</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Auto-Collected Data</h3>
                <p className="text-slate-400 text-sm">
                  Device info, IP address, browser type, and usage patterns to optimize user experience.
                </p>
              </div>
            </div>
          </section>

          {/* 2. How We Use Info */}
          <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
            <h2 className="flex items-center text-2xl font-bold text-white mb-6">
              <FileText className="w-6 h-6 mr-3 text-violet-400" />
              2. Usage of Information
            </h2>
            <ul className="space-y-3">
              {[
                "Account creation and management",
                "Order fulfillment and payment processing",
                "Sending administrative information",
                "protecting our services (fraud prevention)",
                "Enforcing terms and policies",
                "Responding to legal requests"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 mr-3 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 3. Sharing */}
        <section className="mb-12 backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
          <h2 className="flex items-center text-2xl font-bold text-white mb-6">
            <Server className="w-6 h-6 mr-3 text-cyan-400" />
            3. Information Sharing
          </h2>
          <p className="text-slate-400 mb-6">
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
              <strong className="text-cyan-400 block mb-1">Business Transfers</strong>
              <span className="text-slate-500 text-sm">In connection with any merger, sale of company assets, financing, or acquisition.</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
              <strong className="text-cyan-400 block mb-1">Legal Obligations</strong>
              <span className="text-slate-500 text-sm">If required by law, court order, or governmental regulations.</span>
            </div>
          </div>
        </section>

        {/* 4. Security */}
        <section className="mb-12 backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
          <div className="flex items-start">
            <div className="p-3 bg-amber-500/10 rounded-lg mr-4">
              <Lock className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">4. Data Security</h2>
              <p className="text-slate-400 leading-relaxed">
                We accept that no technology is impenetrable. However, we implement robust administrative, technical, and physical security measures to protect your personal information. Your data is stored on secure servers with restricted access.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Contact Us */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-emerald-900/50 to-slate-900/50 border border-emerald-500/20 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <h2 className="flex items-center text-2xl font-bold text-white mb-8 relative z-10">
              <Shield className="w-6 h-6 mr-3 text-emerald-400" />
              5. Contact Us
            </h2>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <div className="flex flex-col">
                <span className="text-slate-500 text-sm mb-1 uppercase tracking-wider">Address</span>
                <div className="flex items-center text-slate-300">
                  <MapPin className="w-5 h-5 mr-2 text-emerald-500" />
                  <span>Logisaar St, Chandaka, Bhubaneswar, Odisha</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-sm mb-1 uppercase tracking-wider">Phone</span>
                <div className="flex items-center text-slate-300">
                  <Phone className="w-5 h-5 mr-2 text-emerald-500" />
                  <a href="tel:+917815014638" className="hover:text-emerald-400 transition-colors">+91 781-5014-638</a>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-sm mb-1 uppercase tracking-wider">Email</span>
                <div className="flex items-center text-slate-300">
                  <Mail className="w-5 h-5 mr-2 text-emerald-500" />
                  <a href="mailto:logisaar@gmail.com" className="hover:text-emerald-400 transition-colors">logisaar@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center text-slate-600 text-sm mt-12 pb-8">
          &copy; 2024 LTBCPS Solutions. All rights reserved. • <Link to="/terms-and-conditions" className="hover:text-emerald-500">Terms</Link> • <Link to="/refund-policy" className="hover:text-emerald-500">Refunds</Link>
        </div>
      </div>
    </div>
  );
}
