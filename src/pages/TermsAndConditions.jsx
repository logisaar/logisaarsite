import React from 'react';
import { Scale, FileText, AlertCircle, HelpCircle, Mail, MapPin } from 'lucide-react';

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
                    <p className="text-slate-300 text-lg">Last Updated: December 26, 2024</p>
                    <p className="text-slate-400 mt-2">Please read these terms carefully before using our services.</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Intro */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Welcome to <strong>LTBCPS Solutions</strong> (LogiSaar). By accessing our website <strong>logisaar.com</strong> or using our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access the service.
                    </p>
                </div>

                {/* 1. Definitions */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <FileText className="w-6 h-6 mr-3 text-emerald-600" />
                        1. Definitions
                    </h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <ul className="space-y-3 text-slate-700">
                            <li><strong>"Company"</strong> refers to LTBCPS Solutions, located in Bhubaneswar, Odisha.</li>
                            <li><strong>"Service"</strong> refers to the website and services provided by LogiSaar.</li>
                            <li><strong>"User"</strong> refers to the individual accessing or using the Service.</li>
                        </ul>
                    </div>
                </section>

                {/* 2. Use of Services */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <Scale className="w-6 h-6 mr-3 text-violet-600" />
                        2. Use of Services
                    </h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <p className="text-slate-600 mb-4">
                            By using our services, you agree to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-2">
                            <li>Use the service for lawful purposes only.</li>
                            <li>Not engage in any activity that disrupts or interferes with our services.</li>
                            <li>Provide accurate and complete information when required.</li>
                            <li>Respect the intellectual property rights of the Company.</li>
                        </ul>
                    </div>
                </section>

                {/* 3. Intellectual Property */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <AlertCircle className="w-6 h-6 mr-3 text-amber-500" />
                        3. Intellectual Property
                    </h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <p className="text-slate-600">
                            The Service and its original content, features, and functionality are and will remain the exclusive property of LTBCPS Solutions and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of LTBCPS Solutions.
                        </p>
                    </div>
                </section>

                {/* 4. Limitation of Liability */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <HelpCircle className="w-6 h-6 mr-3 text-red-500" />
                        4. Limitation of Liability
                    </h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <p className="text-slate-600">
                            In no event shall LTBCPS Solutions, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </div>
                </section>

                {/* 5. Governing Law */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <Scale className="w-6 h-6 mr-3 text-blue-600" />
                        5. Governing Law
                    </h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <p className="text-slate-600">
                            These Terms shall be governed and construed in accordance with the laws of Odisha, India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                        </p>
                    </div>
                </section>

                {/* 6. Contact Us */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <Mail className="w-6 h-6 mr-3 text-emerald-600" />
                        6. Contact Us
                    </h2>
                    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg">
                        <p className="mb-6 text-slate-300">
                            If you have any questions about these Terms, please contact us:
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-3 text-emerald-400" />
                                <span>Logisaar St, Chandaka, Bhubaneswar, Odisha</span>
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
