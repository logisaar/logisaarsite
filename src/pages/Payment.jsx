import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Home, RefreshCw, FileText } from 'lucide-react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Payment = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation();

    // Get payment status from URL params (set by callback)
    const status = searchParams.get('status') || 'unknown';
    const orderId = searchParams.get('orderId') || '';
    const txnId = searchParams.get('txnId') || '';
    const amount = searchParams.get('amount') || '';
    const message = searchParams.get('message') || '';
    const paymentMode = searchParams.get('paymentMode') || '';
    const bankTxnId = searchParams.get('bankTxnId') || '';
    const error = searchParams.get('error') || '';

    // Fallback for old navigation style (from location.state)
    const orderFromState = location.state?.orderDetails;

    const isSuccess = status === 'success';
    const isFailed = status === 'failed';
    const isPending = status === 'pending' || status === 'unknown';

    const getStatusIcon = () => {
        if (isSuccess) {
            return (
                <div className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/50 animate-in zoom-in duration-500">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
            );
        }
        if (isFailed) {
            return (
                <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/50 animate-in zoom-in duration-500">
                    <XCircle className="w-10 h-10 text-red-400" />
                </div>
            );
        }
        return (
            <div className="w-20 h-20 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/50 animate-in zoom-in duration-500">
                <AlertCircle className="w-10 h-10 text-yellow-400" />
            </div>
        );
    };

    const getStatusTitle = () => {
        if (isSuccess) return 'Payment Successful!';
        if (isFailed) return 'Payment Failed';
        return 'Payment Status Unknown';
    };

    const getStatusMessage = () => {
        if (isSuccess) return 'Thank you for your purchase. Your payment has been processed successfully.';
        if (isFailed) return message || error || 'Your payment could not be processed. Please try again.';
        return 'We could not determine the status of your payment. Please contact support if you were charged.';
    };

    const getPaymentModeName = (mode) => {
        const modes = {
            'UPI': 'UPI',
            'CREDIT_CARD': 'Credit Card',
            'DEBIT_CARD': 'Debit Card',
            'NET_BANKING': 'Net Banking',
            'PAYTM_DIGITAL_CREDIT': 'Paytm Postpaid',
            'WALLET': 'Paytm Wallet',
            'EMI': 'EMI'
        };
        return modes[mode] || mode || 'Paytm';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">

                {/* Background decorative elements */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isSuccess ? 'from-emerald-500 to-cyan-500' :
                        isFailed ? 'from-red-500 to-orange-500' :
                            'from-yellow-500 to-amber-500'
                    }`}></div>
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl ${isSuccess ? 'bg-emerald-500/20' :
                        isFailed ? 'bg-red-500/20' :
                            'bg-yellow-500/20'
                    }`}></div>
                <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl ${isSuccess ? 'bg-cyan-500/20' :
                        isFailed ? 'bg-orange-500/20' :
                            'bg-amber-500/20'
                    }`}></div>

                <div className="relative z-10 text-center space-y-6">

                    {/* Status Icon */}
                    {getStatusIcon()}

                    {/* Status Title & Message */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{getStatusTitle()}</h2>
                        <p className="text-slate-400">{getStatusMessage()}</p>
                    </div>

                    {/* Transaction Details */}
                    {(orderId || txnId || amount) && (
                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-left space-y-3">
                            {txnId && (
                                <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Transaction ID</span>
                                    <span className={`font-mono ${isSuccess ? 'text-emerald-400' : 'text-slate-300'}`}>
                                        {txnId}
                                    </span>
                                </div>
                            )}
                            {orderId && (
                                <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Order ID</span>
                                    <span className="text-white font-mono text-xs">{orderId}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Date</span>
                                <span className="text-white">{new Date().toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</span>
                            </div>
                            {paymentMode && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Payment Method</span>
                                    <span className="text-white">{getPaymentModeName(paymentMode)}</span>
                                </div>
                            )}
                            {bankTxnId && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Bank Reference</span>
                                    <span className="text-slate-300 font-mono text-xs">{bankTxnId}</span>
                                </div>
                            )}
                            {amount && (
                                <div className="flex justify-between text-lg font-bold border-t border-white/5 pt-2">
                                    <span className="text-slate-200">{isSuccess ? 'Amount Paid' : 'Amount'}</span>
                                    <span className={isSuccess ? 'text-emerald-400' : 'text-slate-300'}>
                                        ₹{amount}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Success Message */}
                    {isSuccess && (
                        <p className="text-xs text-slate-500">
                            A confirmation email has been sent to your registered email address.
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {isSuccess ? (
                            <Link
                                to="/"
                                className="block w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                            >
                                <span className="flex items-center justify-center">
                                    <Home className="w-4 h-4 mr-2" />
                                    Return to Home
                                </span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/checkout"
                                    className="block w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                                >
                                    <span className="flex items-center justify-center">
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Try Again
                                    </span>
                                </Link>
                                <Link
                                    to="/"
                                    className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl transition-all"
                                >
                                    <span className="flex items-center justify-center">
                                        <Home className="w-4 h-4 mr-2" />
                                        Return to Home
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Support Link */}
                    <p className="text-xs text-slate-500">
                        Having issues? <Link to="/contact" className="text-emerald-400 hover:underline">Contact Support</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Payment;
