import React, { useState } from 'react';
import { CreditCard, ShoppingCart, Lock, ShieldCheck, Banknote, Smartphone } from 'lucide-react';

export default function Checkout() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('card');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        alert("This is a demo checkout. No actual payment will be processed.");
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                    <Lock className="w-8 h-8 mr-3 text-emerald-600" />
                    Secure Checkout
                </h1>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left Column: Billing Details & Payment */}
                    <div className="space-y-8">

                        {/* Billing Details */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                                <ShieldCheck className="w-5 h-5 mr-2 text-violet-600" />
                                Billing Information
                            </h2>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2"
                                    onChange={handleChange}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Street Address"
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="ZIP / Postal Code"
                                    className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    onChange={handleChange}
                                />
                            </form>
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">Select Payment Method</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 hover:border-emerald-200'
                                        }`}
                                >
                                    <CreditCard className="w-6 h-6 mb-2" />
                                    <span className="text-sm font-medium">Card</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'upi' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 hover:border-emerald-200'
                                        }`}
                                >
                                    <Smartphone className="w-6 h-6 mb-2" />
                                    <span className="text-sm font-medium">UPI</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('netbanking')}
                                    className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'netbanking' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 hover:border-emerald-200'
                                        }`}
                                >
                                    <Banknote className="w-6 h-6 mb-2" />
                                    <span className="text-sm font-medium">NetBanking</span>
                                </button>
                            </div>

                            {/* Payment Details Placeholders */}
                            <div className="mt-6">
                                {paymentMethod === 'card' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <input type="text" placeholder="Card Number" className="w-full p-3 border border-slate-300 rounded-lg outline-none" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="MM/YY" className="p-3 border border-slate-300 rounded-lg outline-none" />
                                            <input type="text" placeholder="CVC" className="p-3 border border-slate-300 rounded-lg outline-none" />
                                        </div>
                                    </div>
                                )}
                                {paymentMethod === 'upi' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <input type="text" placeholder="Enter UPI ID (e.g. user@oksbi)" className="w-full p-3 border border-slate-300 rounded-lg outline-none" />
                                        <p className="text-xs text-slate-500">A payment request will be sent to your UPI app.</p>
                                    </div>
                                )}
                                {paymentMethod === 'netbanking' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <select className="w-full p-3 border border-slate-300 rounded-lg outline-none bg-white">
                                            <option>Select Bank</option>
                                            <option>State Bank of India</option>
                                            <option>HDFC Bank</option>
                                            <option>ICICI Bank</option>
                                            <option>Axis Bank</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Pay ₹499.00
                        </button>

                        <p className="text-center text-xs text-slate-400 flex justify-center items-center">
                            <Lock className="w-3 h-3 mr-1" />
                            Your payment is processed securely.
                        </p>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 h-fit lg:sticky lg:top-24">
                        <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                            <ShoppingCart className="w-5 h-5 mr-2 text-emerald-600" />
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                                <div>
                                    <h3 className="font-medium text-slate-900">Professional Consultation</h3>
                                    <p className="text-sm text-slate-500">1 Hour Session (Online)</p>
                                </div>
                                <span className="font-semibold text-slate-900">₹499.00</span>
                            </div>
                            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                                <div>
                                    <h3 className="font-medium text-slate-900">Service Fee</h3>
                                    <p className="text-sm text-slate-500">Processing & Taxes</p>
                                </div>
                                <span className="font-semibold text-slate-900">₹0.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-8 pt-2">
                            <span className="text-lg font-bold text-slate-800">Total</span>
                            <span className="text-2xl font-bold text-emerald-600">₹499.00</span>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h4 className="font-semibold text-slate-700 text-sm mb-2">Our Guarantee</h4>
                            <p className="text-xs text-slate-500">
                                If you are not satisfied with our consultation, you can claim a full refund within 24 hours as per our Refund Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
