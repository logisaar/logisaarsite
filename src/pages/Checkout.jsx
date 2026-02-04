import React, { useState } from 'react';
import { CreditCard, ShoppingCart, Lock, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
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

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    // Dynamic Consultation Fee based on service
    // Site Upgrade Consultation uses ₹10, others use ₹499
    const isSiteUpgradeConsultation = service?.title === "Site Upgrade Consultation";
    const consultationFee = isSiteUpgradeConsultation ? "10.00" : "499.00";
    const displayConsultationFee = isSiteUpgradeConsultation ? "₹10.00" : "₹499.00";

    const serviceName = service?.title || "Service Request";
    const serviceEstimatedPrice = service?.startingPrice || "N/A";

    const rawPrice = consultationFee;
    const displayPrice = displayConsultationFee;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.firstName || !formData.email || !formData.phone) {
            setError("Please fill in all required fields (Name, Email, Phone).");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Phone validation (10 digits)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            setError("Please enter a valid 10-digit Indian mobile number.");
            return;
        }

        setIsProcessing(true);

        try {
            // Call our serverless API to initiate payment
            const response = await fetch('/api/paytm/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: rawPrice,
                    email: formData.email,
                    phone: formData.phone.replace(/\D/g, ''),
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    zip: formData.zip,
                    serviceName: serviceName
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to initiate payment');
            }

            // Initialize Paytm checkout
            if (window.Paytm && window.Paytm.CheckoutJS) {
                const config = {
                    root: "",
                    flow: "DEFAULT",
                    data: {
                        orderId: data.orderId,
                        token: data.txnToken,
                        tokenType: "TXN_TOKEN",
                        amount: data.amount
                    },
                    merchant: {
                        mid: data.mid,
                        redirect: true
                    },
                    handler: {
                        notifyMerchant: function (eventName, data) {
                            console.log("Paytm Event:", eventName, data);
                        },
                        transactionStatus: function (paymentStatus) {
                            console.log("Payment Status:", paymentStatus);
                        }
                    }
                };

                // Initialize and invoke Paytm checkout
                await window.Paytm.CheckoutJS.init(config);
                window.Paytm.CheckoutJS.invoke();
            } else {
                // Fallback: Redirect to Paytm payment page
                const paytmUrl = `https://secure.paytmpayments.com/theia/api/v1/showPaymentPage?mid=${data.mid}&orderId=${data.orderId}&txnToken=${data.txnToken}`;
                window.location.href = paytmUrl;
            }

        } catch (err) {
            console.error('Payment Error:', err);
            setError(err.message || 'Payment initiation failed. Please try again.');
            setIsProcessing(false);
        }
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

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start space-x-3 animate-in fade-in duration-300">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        )}

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
                                    placeholder="First Name *"
                                    value={formData.firstName}
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-slate-500"
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-slate-500"
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    value={formData.email}
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2 text-white placeholder-slate-500"
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number * (10 digits)"
                                    value={formData.phone}
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2 text-white placeholder-slate-500"
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Street Address"
                                    value={formData.address}
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2 text-white placeholder-slate-500"
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-slate-500"
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                />
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="ZIP / Postal Code"
                                    value={formData.zip}
                                    className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-slate-500"
                                    onChange={handleChange}
                                    disabled={isProcessing}
                                />
                            </form>
                        </div>

                        {/* Payment Info */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <CreditCard className="w-5 h-5 mr-2 text-emerald-400" />
                                Payment Method
                            </h2>
                            <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
                                    alt="Paytm"
                                    className="h-8 w-auto"
                                />
                                <div>
                                    <p className="text-white font-medium">Paytm Secure Payment</p>
                                    <p className="text-sm text-slate-400">Pay via UPI, Cards, Net Banking, Wallets</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all border border-emerald-400/20 flex items-center justify-center ${isProcessing
                                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]'
                                }`}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                `Pay ${displayPrice}`
                            )}
                        </button>

                        <p className="text-center text-xs text-slate-400 flex justify-center items-center">
                            <Lock className="w-3 h-3 mr-1" />
                            Your payment is processed securely via Paytm.
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
                                    <p className="text-sm text-slate-500">Selected Service</p>
                                </div>
                                <span className="font-semibold text-slate-400">{serviceEstimatedPrice}*</span>
                            </div>
                            <div className="flex justify-between items-start pb-4 border-b border-white/10">
                                <div>
                                    <h3 className="font-medium text-slate-200">Consultation Fee</h3>
                                    <p className="text-sm text-emerald-400">Due Now</p>
                                </div>
                                <span className="font-semibold text-emerald-400">{displayConsultationFee}</span>
                            </div>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-yellow-200/90 leading-relaxed">
                                <span className="font-semibold text-yellow-400">Note:</span> The service price shown is an estimate. <span className="text-white font-medium">You are paying the Consultation Fee first</span> to proceed.
                            </p>
                        </div>

                        <div className="flex justify-between items-center mb-8 pt-2">
                            <span className="text-lg font-bold text-slate-200">Total Due</span>
                            <span className="text-2xl font-bold text-emerald-400">{displayConsultationFee}</span>
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
