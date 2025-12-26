import React from 'react';
import { Shield, Lock, Eye, FileText, Server, Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-slate-300 text-lg">Effective Date: December 26, 2024</p>
          <p className="text-slate-400 mt-2">Transparency and trust are the core of our business.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Intro */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <p className="text-slate-700 leading-relaxed text-lg">
            At <strong>LTBCPS Solutions</strong> (operating as LogiSaar), we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website <strong>logisaar.com</strong> or use our services.
          </p>
          <div className="mt-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
            <p className="text-emerald-900 font-medium">
              By accessing or using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </div>

        {/* 1. Information We Collect */}
        <section className="mb-12">
          <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
            <Eye className="w-6 h-6 mr-3 text-emerald-600" />
            1. Information We Collect
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Personal Information</h3>
              <p className="text-slate-600 mb-4">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-2">
                <li>Register on the website</li>
                <li>Express interest in obtaining information about us or our products and services</li>
                <li>Participate in activities on the website (such as posting in our forums)</li>
                <li>Contact us for support</li>
              </ul>
              <p className="text-slate-600 mt-4">
                The personal information we collect may include: <strong>Name, Email Address, Phone Number, Mailing Address, and Billing Information.</strong>
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Automatically Collected Information</h3>
              <p className="text-slate-600">
                We automatically collect certain information when you visit, use, or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our Website.
              </p>
            </div>
          </div>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="mb-12">
          <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
            <FileText className="w-6 h-6 mr-3 text-violet-600" />
            2. How We Use Your Information
          </h2>
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-slate-600 mb-4">
              We use personal information collected via our Website for a variety of business purposes described below:
            </p>
            <ul className="grid md:grid-cols-2 gap-4">
              {[
                "To facilitate account creation and logon process.",
                "To send you marketing and promotional communications.",
                "To fulfill and manage your orders and payments.",
                "To post testimonials (with your consent).",
                "To request feedback.",
                "To protect our Services (fraud monitoring and prevention).",
                "To enforce our terms, conditions, and policies.",
                "To respond to legal requests and prevent harm."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2 text-emerald-500 font-bold">•</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Sharing Your Information */}
        <section className="mb-12">
          <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
            <Server className="w-6 h-6 mr-3 text-blue-600" />
            3. Sharing Your Information
          </h2>
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-slate-600 mb-4">
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:
            </p>
            <ul className="space-y-3 text-slate-700">
              <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
              <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
              <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
              <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            </ul>
          </div>
        </section>

        {/* 4. Security of Your Information */}
        <section className="mb-12">
          <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
            <Lock className="w-6 h-6 mr-3 text-amber-500" />
            4. Security of Your Information
          </h2>
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <p className="text-slate-600">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </div>
        </section>

        {/* 5. Contact Us */}
        <section className="mb-12">
          <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
            <Shield className="w-6 h-6 mr-3 text-red-500" />
            5. Contact Us
          </h2>
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg">
            <p className="mb-6 text-slate-300">
              If you have any questions or comments about this policy, you may contact us using the information below:
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-emerald-400" />
                <span>Logisaar St, Chandaka, Bhubaneswar, Odisha</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-emerald-400" />
                <a href="tel:+917815014638" className="hover:text-emerald-400 transition-colors">+91 781-5014-638</a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-emerald-400" />
                <a href="mailto:logisaar@gmail.com" className="hover:text-emerald-400 transition-colors">logisaar@gmail.com</a>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center text-slate-500 text-sm mt-12 pb-8">
          &copy; 2024 LTBCPS Solutions. All rights reserved.
        </div>
      </div>
    </div>
  );
}

