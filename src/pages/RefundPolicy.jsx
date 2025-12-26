import React from 'react';
import { RefreshCw, Clock, AlertCircle, FileText, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-slate-300">
            {/* Header */}
            <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">Refund & Cancellation</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Transparent, fair, and customer-centric policies for your peace of mind.
                    </p>
                    <div className="mt-8">
                        <div className="inline-block px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                            Policy Active since 2024
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

                {/* Intro */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl mb-12">
                    <p className="text-slate-300 leading-relaxed text-lg">
                        At <strong>LTBCPS Solutions</strong> (LogiSaar), we strive to ensure our customers are satisfied with our services. However, we understand that circumstances change. This policy outlines clear conditions under which cancellations and refunds are processed.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">

                    {/* 1. Cancellation Policy */}
                    <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                        <h2 className="flex items-center text-2xl font-bold text-white mb-6">
                            <Clock className="w-6 h-6 mr-3 text-emerald-400" />
                            1. Cancellation Policy
                        </h2>
                        <ul className="space-y-4 text-slate-400">
                            <li className="bg-white/5 p-4 rounded-lg border border-white/5">
                                <strong className="text-emerald-400 block mb-2">Service Cancellation</strong>
                                You may cancel a service request within <span className="text-white font-semibold">24 hours</span> of booking, provided that our team has not initiated the work.
                            </li>
                            <li className="bg-white/5 p-4 rounded-lg border border-white/5">
                                <strong className="text-emerald-400 block mb-2">Product Cancellation</strong>
                                For physical products, orders can be cancelled before shipment. Once shipped, standard return policies apply.
                            </li>
                        </ul>
                    </section>

                    {/* 2. Refund Policy */}
                    <section className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                        <h2 className="flex items-center text-2xl font-bold text-white mb-6">
                            <RefreshCw className="w-6 h-6 mr-3 text-violet-400" />
                            2. Refund Conditions
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <div className="p-2 bg-violet-500/20 rounded mr-3 mt-1">
                                    <AlertCircle className="w-4 h-4 text-violet-400" />
                                </div>
                                <div>
                                    <strong className="text-slate-200 block">Service Defects</strong>
                                    <span className="text-slate-500 text-sm">Material difference from project scope without rectification.</span>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="p-2 bg-violet-500/20 rounded mr-3 mt-1">
                                    <ArrowRight className="w-4 h-4 text-violet-400" />
                                </div>
                                <div>
                                    <strong className="text-slate-200 block">Duplicate Payment</strong>
                                    <span className="text-slate-500 text-sm">Accidental double payments are refunded 100%.</span>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="p-2 bg-violet-500/20 rounded mr-3 mt-1">
                                    <AlertCircle className="w-4 h-4 text-violet-400" />
                                </div>
                                <div>
                                    <strong className="text-slate-200 block">Non-Delivery</strong>
                                    <span className="text-slate-500 text-sm">Failure to deliver within agreed timeline (subject to force majeure).</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 3. Refund Timeline */}
                <section className="mb-12 backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-6">
                        <FileText className="w-6 h-6 mr-3 text-amber-500" />
                        3. Processing Timeline
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-4 text-slate-400">
                            <p>Once approved, refunds are processed within <strong>5-7 business days</strong>.</p>
                            <p>Credits will be issued to the original payment method (Credit Card, UPI, NetBanking).</p>
                        </div>
                        <div className="flex-1 w-full bg-amber-500/10 rounded-xl p-6 border border-amber-500/20">
                            <div className="flex justify-between text-sm text-slate-400 mb-2">
                                <span>Request Approved</span>
                                <span>Funds Credited</span>
                            </div>
                            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                            </div>
                            <div className="mt-2 text-center text-amber-400 text-xs font-mono">Estimated: 5-7 Days</div>
                        </div>
                    </div>
                </section>

                {/* 4. Exceptions */}
                <section className="mb-12 backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                    <h2 className="flex items-center text-2xl font-bold text-white mb-6">
                        <AlertCircle className="w-6 h-6 mr-3 text-red-500" />
                        4. Non-Refundable Items
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {["Completed & Approved Services", "Change of Mind (Post-Work)", "Client-Side Delays"].map((item, i) => (
                            <div key={i} className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg text-red-200 text-center text-sm font-medium">
                                {item}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Contact Us */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-emerald-900/50 to-slate-900/50 border border-emerald-500/20 p-8 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

                        <h2 className="flex items-center text-2xl font-bold text-white mb-8 relative z-10">
                            <Mail className="w-6 h-6 mr-3 text-emerald-400" />
                            5. Contact Us
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            <div className="flex flex-col">
                                <span className="text-slate-500 text-sm mb-1 uppercase tracking-wider">Address</span>
                                <div className="flex items-center text-slate-300">
                                    <MapPin className="w-5 h-5 mr-2 text-emerald-500" />
                                    <span>Logisaar St, Chandaka, Bhubaneswar, Odisha</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-slate-500 text-sm mb-1 uppercase tracking-wider">Support</span>
                                <div className="flex items-center text-slate-300">
                                    <Mail className="w-5 h-5 mr-2 text-emerald-500" />
                                    <a href="mailto:logisaar@gmail.com" className="hover:text-emerald-400 transition-colors">logisaar@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center text-slate-600 text-sm mt-12 pb-8">
                    &copy; 2024 LTBCPS Solutions. All rights reserved. • <Link to="/privacy-policy" className="hover:text-emerald-500">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
}
