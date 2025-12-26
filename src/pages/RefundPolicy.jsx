import React from 'react';
import { RefreshCw, Clock, AlertCircle, FileText, Mail, MapPin } from 'lucide-react';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund & Cancellation Policy</h1>
                    <p className="text-slate-300 text-lg">Last Updated: December 26, 2024</p>
                    <p className="text-slate-400 mt-2">Transparent and fair policies for our valued customers.</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Intro */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
                    <p className="text-slate-700 leading-relaxed text-lg">
                        At <strong>LTBCPS Solutions</strong> (LogiSaar), we strive to ensure our customers are satisfied with our services. However, we understand that there may be circumstances where you need to cancel an order or request a refund. This policy outlines the conditions under which cancellations and refunds are processed.
                    </p>
                </div>

                {/* 1. Cancellation Policy */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <Clock className="w-6 h-6 mr-3 text-emerald-600" />
                        1. Cancellation Policy
                    </h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <ul className="space-y-4 text-slate-700">
                            <li className="flex items-start">
                                <span className="text-emerald-500 font-bold mr-2">•</span>
                                <span><strong>Service Cancellation:</strong> You may cancel a service request within 24 hours of booking, provided that our team has not already started working on your project.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-emerald-500 font-bold mr-2">•</span>
                                <span><strong>Product Cancellation:</strong> For physical products (if any), orders can be cancelled before they are shipped. Once shipped, the return policy applies.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-emerald-500 font-bold mr-2">•</span>
                                <span><strong>How to Cancel:</strong> To cancel an order, please contact us immediately at <a href="mailto:logisaar@gmail.com" className="text-blue-600 hover:underline">logisaar@gmail.com</a> with your Order ID.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 2. Refund Policy */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <RefreshCw className="w-6 h-6 mr-3 text-violet-600" />
                        2. Refund Policy
                    </h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <p className="text-slate-600 mb-4">
                            Refunds will be processed under the following conditions:
                        </p>
                        <div className="space-y-4 text-slate-700">
                            <div className="bg-violet-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-violet-900 mb-2">Service Defects</h3>
                                <p>If the delivered service materially differs from the agreed-upon project scope or requirements, and we are unable to rectify the issue within a reasonable timeframe.</p>
                            </div>
                            <div className="bg-violet-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-violet-900 mb-2">Duplicate Payment</h3>
                                <p>If you have accidentally made a duplicate payment for the same invoice/order, the extra amount will be refunded in full.</p>
                            </div>
                            <div className="bg-violet-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-violet-900 mb-2">Non-Delivery</h3>
                                <p>If we fail to deliver the service or product within the agreed timeline (subject to force majeure), a full or partial refund may be issued.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Refund Timeline */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <FileText className="w-6 h-6 mr-3 text-amber-500" />
                        3. Refund Timeline
                    </h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <ul className="space-y-3 text-slate-700">
                            <li>Once a refund is approved, it will be processed within <strong>5-7 business days</strong>.</li>
                            <li>The amount will be credited back to the original method of payment (Credit Card, Debit Card, UPI, or Net Banking).</li>
                            <li>Depending on your bank, it may take additional days for the funds to reflect in your account.</li>
                        </ul>
                    </div>
                </section>

                {/* 4. Exceptions */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <AlertCircle className="w-6 h-6 mr-3 text-red-500" />
                        4. Exceptions
                    </h2>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <p className="text-slate-600 mb-2">No refunds will be issued for:</p>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-2">
                            <li>Services that have been completed and approved by the client.</li>
                            <li>Change of mind after the work has commenced.</li>
                            <li>Delays caused by lack of information or approval from the client side.</li>
                        </ul>
                    </div>
                </section>

                {/* 5. Contact Us */}
                <section className="mb-12">
                    <h2 className="flex items-center text-2xl font-bold text-slate-900 mb-6">
                        <Mail className="w-6 h-6 mr-3 text-emerald-600" />
                        5. Contact Us
                    </h2>
                    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg">
                        <p className="mb-6 text-slate-300">
                            For any refund or cancellation requests, please reach out to us:
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
