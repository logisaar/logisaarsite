import React from 'react';
import { Scale, FileText, AlertCircle, Shield, Mail, MapPin, Globe, User, CreditCard, Lock, Server, Gavel, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-slate-300">
            {/* Header */}
            <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Terms & Conditions</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Please read these terms carefully before using our services.
                    </p>
                    <div className="mt-8">
                        <div className="inline-block px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium">
                            Last Updated: December 26, 2024
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

                {/* 1. Company Information */}
                <section className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl mb-8">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-6">
                        <FileText className="w-6 h-6 mr-3 text-emerald-400" />
                        1. Company Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 text-slate-400">
                        <div>
                            <p className="mb-2"><strong className="text-slate-200">Company Name:</strong> LTBCPS Solutions</p>
                            <p className="mb-2"><strong className="text-slate-200">Registered Address:</strong></p>
                            <p className="text-sm pl-4">
                                Plot No-7491493, Bisudhananda Nagara, Sampur,<br />
                                Khandagiri, PO Ghatikia,<br />
                                PS Bharatpur, Bhubaneswar – 751003,<br />
                                Odisha, India
                            </p>
                        </div>
                        <div>
                            <p className="flex items-center mb-2">
                                <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                                <a href="mailto:ltbcpssolutions@gmail.com" className="text-emerald-400 hover:underline">ltbcpssolutions@gmail.com</a>
                            </p>
                            <p className="flex items-center">
                                <Globe className="w-4 h-4 mr-2 text-emerald-500" />
                                <a href="https://logisaar.in" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">https://logisaar.in</a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2. Eligibility */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <User className="w-6 h-6 mr-3 text-violet-400" />
                        2. Eligibility
                    </h2>
                    <p className="text-slate-400">
                        You must be at least <strong className="text-white">18 years of age</strong> or have legal parental/guardian consent to use our Services. By using our Services, you represent that you meet this eligibility requirement.
                    </p>
                </section>

                {/* 3. Account Registration */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <Lock className="w-6 h-6 mr-3 text-cyan-400" />
                        3. Account Registration
                    </h2>
                    <ul className="space-y-2 text-slate-400">
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 mr-3"></span>Certain features may require account registration.</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 mr-3"></span>You are responsible for maintaining the confidentiality of your account credentials.</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 mr-3"></span>You agree to provide accurate, current, and complete information.</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 mr-3"></span>Any activity performed through your account is your responsibility.</li>
                    </ul>
                </section>

                {/* 4. Acceptable Use */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <Scale className="w-6 h-6 mr-3 text-amber-500" />
                        4. Acceptable Use
                    </h2>
                    <p className="text-slate-400 mb-4">You agree to use our Services only for lawful purposes. <strong className="text-red-400">You must not:</strong></p>
                    <ul className="space-y-2 text-slate-400">
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3"></span>Use the Services for illegal or unauthorized activities</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3"></span>Attempt to breach security, hack, or reverse-engineer the software</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3"></span>Upload malicious code, viruses, or harmful content</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3"></span>Disrupt the performance or integrity of our systems</li>
                    </ul>
                </section>

                {/* 5. Software License */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <Server className="w-6 h-6 mr-3 text-blue-400" />
                        5. Software License
                    </h2>
                    <p className="text-slate-400 mb-4">LTBCPS Solutions grants you a limited, non-exclusive, non-transferable, and revocable license. <strong className="text-red-400">You may not:</strong></p>
                    <ul className="space-y-2 text-slate-400">
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3"></span>Copy, modify, distribute, or resell the software</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3"></span>Use the software to create competing products</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3"></span>Sub-license or lease the software without written permission</li>
                    </ul>
                </section>

                {/* 6. Services & Payments */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <CreditCard className="w-6 h-6 mr-3 text-green-400" />
                        6. Services & Payments
                    </h2>
                    <ul className="space-y-2 text-slate-400">
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-3"></span>Some services may require payment or subscription.</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-3"></span>All fees are non-refundable unless explicitly stated.</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-3"></span>Prices may be updated with prior notice.</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-3"></span>Failure to complete payment may result in service suspension or termination.</li>
                    </ul>
                </section>

                {/* 7. Intellectual Property */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <Shield className="w-6 h-6 mr-3 text-purple-400" />
                        7. Intellectual Property Rights
                    </h2>
                    <p className="text-slate-400">
                        All software, source code, designs, trademarks, logos, content, and materials are the <strong className="text-white">exclusive intellectual property of LTBCPS Solutions</strong>. Unauthorized reproduction, distribution, or misuse is strictly prohibited.
                    </p>
                </section>

                {/* 8. Data Privacy */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <Lock className="w-6 h-6 mr-3 text-emerald-400" />
                        8. Data Privacy & Security
                    </h2>
                    <ul className="space-y-2 text-slate-400">
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></span>Your use of our Services is subject to our <Link to="/privacy-policy" className="text-emerald-400 hover:underline">Privacy Policy</Link>.</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></span>We take reasonable technical and organizational measures to protect user data.</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3"></span>However, no digital platform can guarantee absolute security.</li>
                    </ul>
                </section>

                {/* 9. User Content */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <FileText className="w-6 h-6 mr-3 text-orange-400" />
                        9. User Content
                    </h2>
                    <ul className="space-y-2 text-slate-400">
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-3"></span>Users retain ownership of content they submit.</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-3"></span>You grant LTBCPS Solutions permission to store, process, and display content solely to provide the Services.</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-3"></span>You are responsible for ensuring your content does not violate any laws or third-party rights.</li>
                    </ul>
                </section>

                {/* 10. Termination */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <AlertCircle className="w-6 h-6 mr-3 text-red-500" />
                        10. Termination
                    </h2>
                    <p className="text-slate-400 mb-4">We reserve the right to:</p>
                    <ul className="space-y-2 text-slate-400">
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3"></span>Suspend or terminate accounts without notice if these Terms are violated</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3"></span>Remove any content that breaches policies</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3"></span>Restrict access to protect system integrity</li>
                    </ul>
                    <p className="text-slate-400 mt-4">You may stop using our Services at any time.</p>
                </section>

                {/* 11. Limitation of Liability */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <Scale className="w-6 h-6 mr-3 text-yellow-500" />
                        11. Limitation of Liability
                    </h2>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg text-yellow-200 text-sm">
                        <p className="mb-2">To the fullest extent permitted by law:</p>
                        <ul className="space-y-1">
                            <li>• LTBCPS Solutions shall not be liable for indirect, incidental, or consequential damages</li>
                            <li>• We do not guarantee uninterrupted, error-free service</li>
                            <li>• Use of the Services is at your own risk</li>
                        </ul>
                    </div>
                </section>

                {/* 12. Disclaimer */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <AlertCircle className="w-6 h-6 mr-3 text-amber-500" />
                        12. Disclaimer
                    </h2>
                    <p className="text-slate-400">
                        The Services are provided <strong className="text-white">"as is"</strong> and <strong className="text-white">"as available"</strong>, without warranties of any kind, express or implied, including merchantability or fitness for a particular purpose.
                    </p>
                </section>

                {/* 13. Third-Party */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <ExternalLink className="w-6 h-6 mr-3 text-teal-400" />
                        13. Third-Party Integrations
                    </h2>
                    <p className="text-slate-400">
                        Our Services may integrate with third-party platforms or tools. LTBCPS Solutions is not responsible for third-party content, services, or policies.
                    </p>
                </section>

                {/* 14. Modifications */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <FileText className="w-6 h-6 mr-3 text-indigo-400" />
                        14. Modifications to Terms
                    </h2>
                    <p className="text-slate-400">
                        We may update these Terms periodically. Continued use of the Services after changes indicates acceptance of the revised Terms.
                    </p>
                </section>

                {/* 15. Governing Law */}
                <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:bg-white/10 transition-colors">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-4">
                        <Gavel className="w-6 h-6 mr-3 text-blue-400" />
                        15. Governing Law & Jurisdiction
                    </h2>
                    <p className="text-slate-400">
                        These Terms shall be governed by and interpreted in accordance with the <strong className="text-white">laws of India</strong>, with exclusive jurisdiction of courts located in <strong className="text-white">Odisha</strong>.
                    </p>
                </section>

                {/* 16. Contact */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-violet-900/50 to-slate-900/50 border border-violet-500/20 p-8 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <h2 className="flex items-center text-2xl font-bold text-white mb-8 relative z-10">
                            <Mail className="w-6 h-6 mr-3 text-violet-400" />
                            16. Contact Information
                        </h2>
                        <p className="text-slate-400 mb-6 relative z-10">For any questions or concerns regarding these Terms, contact us at:</p>
                        <div className="grid md:grid-cols-3 gap-6 relative z-10">
                            <div className="flex items-center text-slate-300">
                                <Mail className="w-5 h-5 mr-2 text-violet-500" />
                                <a href="mailto:ltbcpssolutions@gmail.com" className="hover:text-violet-400 transition-colors">ltbcpssolutions@gmail.com</a>
                            </div>
                            <div className="flex items-center text-slate-300">
                                <Globe className="w-5 h-5 mr-2 text-violet-500" />
                                <a href="https://logisaar.in" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">https://logisaar.in</a>
                            </div>
                            <div className="flex items-center text-slate-300">
                                <MapPin className="w-5 h-5 mr-2 text-violet-500" />
                                <span>Bhubaneswar, Odisha, India</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center text-slate-600 text-sm mt-12 pb-8">
                    &copy; 2024 LTBCPS Solutions. All rights reserved. • <Link to="/privacy-policy" className="hover:text-violet-500">Privacy Policy</Link> • <Link to="/refund-policy" className="hover:text-violet-500">Refund Policy</Link>
                </div>
            </div>
        </div>
    );
}
