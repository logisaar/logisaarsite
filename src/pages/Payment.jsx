import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2, Home, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const [status, setStatus] = useState('processing'); // processing, success, failed
    const location = useLocation();
    const navigate = useNavigate();
    const { orderDetails } = location.state || {
        orderDetails: {
            amount: "499.00",
            id: "ORD-" + Math.floor(Math.random() * 100000)
        }
    };

    useEffect(() => {
        // Simulate payment processing time
        const timer = setTimeout(() => {
            setStatus('success');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">

                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center">

                    {status === 'processing' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                                <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Processing Payment</h2>
                                <p className="text-slate-400">Please wait while we securely process your transaction...</p>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Merchant</span>
                                    <span className="text-white font-medium">LogiSaar Solutions</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Amount</span>
                                    <span className="text-white font-medium">₹{orderDetails.amount}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="space-y-6 animate-in zoom-in duration-500">
                            <div className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/50">
                                <CheckCircle className="w-10 h-10 text-emerald-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                                <p className="text-slate-400">Thank you for your purchase.</p>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-left space-y-3">
                                <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Transaction ID</span>
                                    <span className="text-emerald-400 font-mono">TXN-{Math.floor(Math.random() * 10000000)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Date</span>
                                    <span className="text-white">{new Date().toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Payment Method</span>
                                    <span className="text-white">Paytm / UPI</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t border-white/5 pt-2">
                                    <span className="text-slate-200">Total Paid</span>
                                    <span className="text-emerald-400">₹{orderDetails.amount}</span>
                                </div>
                            </div>

                            <p className="text-xs text-slate-500">
                                A confirmation email has been sent to your registered email address.
                            </p>

                            <Link
                                to="/"
                                className="block w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Return to Home
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Payment;
