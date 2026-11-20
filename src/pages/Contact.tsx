import { CONTACT } from "@/lib/contact";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import TextReveal from "@/components/creative/TextReveal";
import MagneticButton from "@/components/creative/MagneticButton";
import { useToast } from "@/hooks/use-toast";
import { submitForm } from "@/lib/submitForm";
import contactBg from "@/assets/contact-bg.jpg";
import SEO from "@/components/SEO";

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitForm(formData, "contact_page");
    setSubmitting(false);
    if (result.success) {
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", message: "" });
    } else {
      toast({ title: "Failed to send", description: result.error, variant: "destructive" });
    }
  };

  return (
    <Layout>
      <SEO
        title="Contact Logisaar | AI-Native Software Scoping in Odisha"
        description="Connect with Logisaar via WhatsApp for direct system scoping and project budgets. Active in Cuttack, Bhubaneswar, and all of Odisha."
        keywords="contact Logisaar, WhatsApp developer Odisha, software agency Cuttack, AI systems Bhubaneswar"
        canonical="https://www.logisaar.in/contact"
      />
      
      <section className="min-h-screen grid md:grid-cols-2">
        {/* Left Side — Brand Contacts */}
        <div className="relative flex items-center justify-center py-32 md:py-0 overflow-hidden">
          <img src={contactBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-primary/20" />
          
          <div className="relative z-10 px-8 md:px-16 text-center md:text-left text-white space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-mono text-xs uppercase tracking-[0.2em]"
            >
              Get in Touch
            </motion.p>
            
            <div className="space-y-1">
              <TextReveal
                text="Let's build"
                as="h1"
                className="font-display text-5xl md:text-7xl font-bold leading-[0.95] text-white"
                delay={0.2}
              />
              <TextReveal
                text="the future."
                as="h1"
                className="font-display text-5xl md:text-7xl font-bold text-gradient leading-[0.95]"
                delay={0.4}
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/70 text-sm md:text-base max-w-sm leading-relaxed"
            >
              Connect with our founders directly. We answer setup and integrations questions within hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-4 pt-4"
            >
              {/* WhatsApp direct */}
              <a
                href="https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20scoping%20a%20new%20software%20project%20and%20want%20to%20get%20in%20touch."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 justify-center md:justify-start hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform">
                  <MessageCircle className="text-white" size={18} fill="currentColor" />
                </div>
                <div>
                  <div className="text-xs text-white/40 font-mono uppercase">WhatsApp (Fastest)</div>
                  <div className="text-sm font-semibold text-green-400 font-mono">+91 85960 72510</div>
                </div>
              </a>

              {/* Email */}
              <a
                href={CONTACT.mailto}
                className="flex items-center gap-3 text-white/80 justify-center md:justify-start hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="text-white" size={18} />
                </div>
                <div>
                  <div className="text-xs text-white/40 font-mono uppercase">Email</div>
                  <div className="text-sm font-mono">{CONTACT.email}</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+918596072510"
                className="flex items-center gap-3 text-white/80 justify-center md:justify-start hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="text-white" size={18} />
                </div>
                <div>
                  <div className="text-xs text-white/40 font-mono uppercase">Phone Call</div>
                  <div className="text-sm font-mono">+91 85960 72510</div>
                </div>
              </a>

              {/* Office Address */}
              <div className="flex items-start gap-3 text-white/80 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="text-white" size={18} />
                </div>
                <div>
                  <div className="text-xs text-white/40 font-mono uppercase">Registered Office</div>
                  <div className="text-xs leading-relaxed text-white/70">
                    Logisaar Technologies Private Limited<br />
                    Cuttack, Odisha, India
                  </div>
                  <div className="text-[10px] text-white/40 font-mono mt-1">CIN: U62012OD2026PTC053632</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side — Fallback Scoping Form */}
        <div className="flex items-center justify-center py-20 md:py-0 px-8 md:px-16 bg-secondary/10" ref={formRef}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md space-y-8"
          >
            {/* Primary Action Call */}
            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center space-y-4">
              <MessageCircle size={32} className="text-green-500 mx-auto" fill="currentColor" />
              <h3 className="font-display font-bold text-lg text-foreground">Scoping via WhatsApp</h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                Skip the lines. Send details of your requirements, timelines, or designs directly to our WhatsApp numbers.
              </p>
              <Button asChild size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-5 h-auto text-sm font-semibold">
                <a
                  href="https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20interested%20in%20a%20systems%2Fsoftware%20project%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} fill="currentColor" />
                  Chat Now
                </a>
              </Button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/60"></span></div>
              <span className="relative bg-background px-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">OR USE FORM</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-2 block">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl transition-all text-sm"
                />
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-2 block">Email</label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  type="email"
                  required
                  className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl transition-all text-sm"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-2 block">Message Details</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type outline requirements or scoping requests..."
                  rows={4}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary rounded-xl transition-all resize-none text-sm"
                />
              </div>

              <MagneticButton strength={0.1} className="w-full">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full group bg-gradient-primary hover:opacity-90 border-0 text-white h-14 rounded-xl text-sm"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Submit Form"}
                  <Send size={15} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
