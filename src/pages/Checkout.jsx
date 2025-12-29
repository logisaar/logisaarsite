import React, { useState } from 'react';
import { CreditCard, ShoppingCart, Lock, ShieldCheck, Banknote, Smartphone, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Checkout() {
    const location = useLocation();
    const { service } = location.state || {};

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

    // Parse price from string (e.g., "₹999") or use default
    // Removing non-numeric characters except dot to get raw number
    const rawPrice = service?.startingPrice ? service.startingPrice.replace(/[^0-9.]/g, '') : "499.00";
    const serviceName = service?.title || "Professional Consultation";
    const displayPrice = service?.startingPrice || "₹499.00";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handlePayment = (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.firstName || !formData.email || !formData.phone) {
            alert("Please fill in all required fields (Name, Email, Phone).");
            return;
        }

        // In a real app, you would integrate Paytm JS Checkout here.
        // For this demo/verification, we redirect to the payment success/status page.
        navigate('/payment', {
            state: {
                orderDetails: {
                    amount: rawPrice,
                    id: "ORD-" + Date.now()
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <Lock className="w-8 h-8 mr-3 text-emerald-400" />
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Secure Checkout</span>
                </h1>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left Column: Billing Details & Payment */}
                    <div className="space-y-8">

                        {/* Billing Details */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg">
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                                <ShieldCheck className="w-5 h-5 mr-2 text-violet-400" />
                                Billing Information
                            </h2>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-slate-500"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-slate-500"
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2 text-white placeholder-slate-500"
                                    onChange={handleChange}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2 text-white placeholder-slate-500"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Street Address"
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2 text-white placeholder-slate-500"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-slate-500"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="ZIP / Postal Code"
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-slate-500"
                                    onChange={handleChange}
                                />
                            </form>
                        </div>

                        {/* Payment Methods */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg">
                            <h2 className="text-xl font-semibold text-white mb-6 text-center">Select Payment Method</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'card'
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                                        : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-300'
                                        }`}
                                >
                                    <CreditCard className="w-6 h-6 mb-2" />
                                    <span className="text-sm font-medium">Card</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'upi'
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                                        : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-300'
                                        }`}
                                >
                                    <Smartphone className="w-6 h-6 mb-2" />
                                    <span className="text-sm font-medium">UPI</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('netbanking')}
                                    className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'netbanking'
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                                        : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-300'
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
                                        <input type="text" placeholder="Card Number" className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg outline-none text-white" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="MM/YY" className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg outline-none text-white" />
                                            <input type="text" placeholder="CVC" className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg outline-none text-white" />
                                        </div>
                                    </div>
                                )}
                                {paymentMethod === 'upi' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <input type="text" placeholder="Enter UPI ID (e.g. user@oksbi)" className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg outline-none text-white" />
                                        <p className="text-xs text-slate-500">A payment request will be sent to your UPI app.</p>
                                    </div>
                                )}
                                {paymentMethod === 'netbanking' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <select className="w-full p-3 bg-slate-800/50 border border-slate-700 rounded-lg outline-none text-white">
                                            <option className="text-black">Select Bank</option>
                                            <option className="text-black">State Bank of India</option>
                                            <option className="text-black">HDFC Bank</option>
                                            <option className="text-black">ICICI Bank</option>
                                            <option className="text-black">Axis Bank</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/20"
                        >
                            Pay {displayPrice}
                        </button>

                        <p className="text-center text-xs text-slate-400 flex justify-center items-center">
                            <Lock className="w-3 h-3 mr-1" />
                            Your payment is processed securely.
                        </p>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg h-fit lg:sticky lg:top-24">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <ShoppingCart className="w-5 h-5 mr-2 text-emerald-400" />
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-start pb-4 border-b border-white/10">
                                <div>
                                    <h3 className="font-medium text-slate-200">{serviceName}</h3>
                                    <p className="text-sm text-slate-500">Service Request</p>
                                </div>
                                <span className="font-semibold text-emerald-400">{displayPrice}</span>
                            </div>
                            <div className="flex justify-between items-start pb-4 border-b border-white/10">
                                <div>
                                    <h3 className="font-medium text-slate-200">Service Fee</h3>
                                    <p className="text-sm text-slate-500">Processing & Taxes</p>
                                </div>
                                <span className="font-semibold text-emerald-400">₹0.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-8 pt-2">
                            <span className="text-lg font-bold text-slate-200">Total</span>
                            <span className="text-2xl font-bold text-emerald-400">{displayPrice}</span>
                        </div>

                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10">
                            <h4 className="font-semibold text-slate-300 text-sm mb-2">Our Guarantee</h4>
                            <p className="text-xs text-slate-500">
                                If you are not satisfied with our consultation, you can claim a full refund within 24 hours as per our <Link to="/refund-policy" className="text-emerald-400 hover:underline">Refund Policy</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
