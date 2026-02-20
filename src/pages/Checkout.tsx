import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Shield, Lock } from "lucide-react";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import TextReveal from "@/components/creative/TextReveal";
import MagneticButton from "@/components/creative/MagneticButton";

declare global {
    interface Window {
        Paytm?: {
            CheckoutJS: {
                init: (config: any) => Promise<void>;
                invoke: () => void;
            };
        };
    }
}

const Checkout = () => {
    const [searchParams] = useSearchParams();
    const planName = searchParams.get("plan") || "Service";
    const planPrice = searchParams.get("price") || "0";

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    const amount = planPrice.replace(/[^\d.]/g, "") || "0";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!formData.firstName || !formData.email || !formData.phone) {
            setError("Please fill in all required fields.");
            return;
        }

        if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }

        setIsProcessing(true);

        try {
            const response = await fetch("/api/paytm/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: amount,
                    email: formData.email,
                    phone: formData.phone.replace(/\D/g, ""),
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    planName: planName,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || "Failed to initiate payment");
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
                        amount: data.amount,
                    },
                    merchant: {
                        mid: data.mid,
                        redirect: true,
                    },
                    handler: {
                        notifyMerchant: function (eventName: string, data: any) {
                            console.log("Paytm Event:", eventName, data);
                        },
                        transactionStatus: function (paymentStatus: any) {
                            console.log("Payment Status:", paymentStatus);
                        },
                    },
                };

                await window.Paytm.CheckoutJS.init(config);
                window.Paytm.CheckoutJS.invoke();
            } else {
                // Fallback: Redirect to Paytm payment page
                const paytmUrl = `https://secure.paytmpayments.com/theia/api/v1/showPaymentPage?mid=${data.mid}&orderId=${data.orderId}&txnToken=${data.txnToken}`;
                window.location.href = paytmUrl;
            }
        } catch (err: any) {
            console.error("Payment Error:", err);
            setError(err.message || "Payment initiation failed. Please try again.");
            setIsProcessing(false);
        }
    };

    return (
        <Layout>
            {/* Hero */}
            <section className="min-h-[40vh] flex items-end relative overflow-hidden pb-12">
                <GradientMesh />
                <div className="container mx-auto px-4 relative z-10 pt-32 text-center">
                    <TextReveal
                        text="Secure"
                        as="h1"
                        className="font-display text-5xl md:text-7xl font-bold leading-[0.95]"
                        delay={0.2}
                    />
                    <TextReveal
                        text="Checkout"
                        as="h2"
                        className="font-display text-5xl md:text-7xl font-bold text-gradient leading-[0.95] mt-2"
                        delay={0.4}
                    />
                </div>
            </section>

            {/* Checkout Form */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-2xl border border-border bg-card p-8 md:p-10"
                    >
                        {/* Order Summary */}
                        <div className="mb-8 pb-6 border-b border-border">
                            <h3 className="font-display text-xl font-bold mb-2">Order Summary</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">{planName}</span>
                                <span className="font-display text-2xl font-bold text-gradient">
                                    ₹{parseFloat(amount).toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handlePayment} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="9876543210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="rounded-xl"
                                />
                            </div>

                            <MagneticButton strength={0.1} className="w-full pt-2">
                                <Button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full bg-gradient-primary hover:opacity-90 border-0 text-white rounded-xl h-12 text-base font-semibold group"
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            Pay ₹{parseFloat(amount).toLocaleString("en-IN")}
                                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </MagneticButton>
                        </form>

                        {/* Trust Badges */}
                        <div className="mt-8 pt-6 border-t border-border flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Shield size={14} className="text-primary" />
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Lock size={14} className="text-primary" />
                                <span>256-bit Encryption</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CreditCard size={14} className="text-primary" />
                                <span>Powered by Paytm</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-6 text-muted-foreground text-sm"
                    >
                        <Link to="/pricing" className="hover:text-primary transition-colors underline underline-offset-2">
                            ← Back to Pricing
                        </Link>
                    </motion.p>
                </div>
            </section>
        </Layout>
    );
};

export default Checkout;
