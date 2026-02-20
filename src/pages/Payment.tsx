import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowRight, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import MagneticButton from "@/components/creative/MagneticButton";

const Payment = () => {
    const [searchParams] = useSearchParams();

    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");
    const txnId = searchParams.get("txnId");
    const amount = searchParams.get("amount");
    const message = searchParams.get("message");
    const paymentMode = searchParams.get("paymentMode");
    const bankTxnId = searchParams.get("bankTxnId");
    const error = searchParams.get("error");

    const isSuccess = status === "success";

    return (
        <Layout>
            <section className="min-h-screen flex items-center relative overflow-hidden">
                <GradientMesh />
                <div className="container mx-auto px-4 relative z-10 py-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-lg mx-auto rounded-2xl border border-border bg-card p-8 md:p-10 text-center"
                    >
                        {/* Status Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="mb-6"
                        >
                            {isSuccess ? (
                                <CheckCircle2 size={72} className="mx-auto text-green-500" strokeWidth={1.5} />
                            ) : (
                                <XCircle size={72} className="mx-auto text-destructive" strokeWidth={1.5} />
                            )}
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="font-display text-3xl md:text-4xl font-bold mb-2"
                        >
                            {isSuccess ? "Payment Successful!" : "Payment Failed"}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-muted-foreground mb-8"
                        >
                            {isSuccess
                                ? "Thank you! Your payment has been processed."
                                : message || error || "Something went wrong. Please try again."}
                        </motion.p>

                        {/* Transaction Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-muted/50 rounded-xl p-5 mb-8 text-left space-y-3"
                        >
                            {orderId && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Order ID</span>
                                    <span className="font-mono font-medium">{orderId}</span>
                                </div>
                            )}
                            {txnId && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Transaction ID</span>
                                    <span className="font-mono font-medium">{txnId}</span>
                                </div>
                            )}
                            {amount && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span className="font-bold text-gradient">₹{parseFloat(amount).toLocaleString("en-IN")}</span>
                                </div>
                            )}
                            {paymentMode && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Payment Mode</span>
                                    <span className="font-medium">{paymentMode}</span>
                                </div>
                            )}
                            {bankTxnId && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Bank Txn ID</span>
                                    <span className="font-mono font-medium text-xs">{bankTxnId}</span>
                                </div>
                            )}
                            {message && isSuccess && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Status</span>
                                    <span className="font-medium text-green-500">{message}</span>
                                </div>
                            )}
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <MagneticButton strength={0.1} className="flex-1">
                                <Button asChild className="w-full rounded-xl bg-gradient-primary hover:opacity-90 border-0 text-white">
                                    <Link to="/">
                                        <Home size={16} className="mr-2" />
                                        Go Home
                                    </Link>
                                </Button>
                            </MagneticButton>

                            {!isSuccess && (
                                <MagneticButton strength={0.1} className="flex-1">
                                    <Button asChild variant="outline" className="w-full rounded-xl">
                                        <Link to="/pricing">
                                            <RotateCcw size={16} className="mr-2" />
                                            Try Again
                                        </Link>
                                    </Button>
                                </MagneticButton>
                            )}

                            {isSuccess && (
                                <MagneticButton strength={0.1} className="flex-1">
                                    <Button asChild variant="outline" className="w-full rounded-xl">
                                        <Link to="/contact">
                                            Contact Us
                                            <ArrowRight size={14} className="ml-1" />
                                        </Link>
                                    </Button>
                                </MagneticButton>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Payment;
