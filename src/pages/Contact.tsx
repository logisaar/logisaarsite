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
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
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
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      toast({ title: "Failed to send", description: result.error, variant: "destructive" });
    }
  };

  return (
    <Layout>
      <SEO
        title="Contact LogiSaar | Web Developer in Bhubaneswar & Cuttack, Odisha"
        description="Contact Chinmay Kumar Panda at LogiSaar for website development, SEO or AI solutions in Odisha. Call +91 78150 14638 or WhatsApp us now."
        keywords="contact LogiSaar, web developer Bhubaneswar, web developer Cuttack, hire web developer Odisha"
        canonical="https://logisaar.in/contact"
      />
      {/* Split screen layout */}
      <section className="min-h-screen grid md:grid-cols-2">
        {/* Left - Gradient mesh with big text */}
        <div className="relative flex items-center justify-center py-32 md:py-0 overflow-hidden">
          <img src={contactBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-primary/20" />
          <div className="relative z-10 px-8 md:px-16 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-400 font-medium text-xs uppercase tracking-[0.2em] mb-6"
            >
              Contact Us
            </motion.p>
            <TextReveal
              text="Let's"
              as="h1"
              className="font-display text-6xl md:text-8xl font-bold leading-[0.95] text-white"
              delay={0.2}
            />
            <TextReveal
              text="Talk"
              as="h1"
              className="font-display text-6xl md:text-8xl font-bold text-gradient leading-[0.95] mb-8"
              delay={0.4}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/70 text-lg max-w-sm"
            >
              Have a project in mind? Let's build something extraordinary together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12 space-y-4"
            >
              {/* Email */}
              <a
                href="mailto:logisaar@gmail.com"
                className="flex items-center gap-3 text-white/80 justify-center md:justify-start hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <Mail className="text-white" size={18} />
                </div>
                <span className="text-sm">logisaar@gmail.com</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+917815014638"
                className="flex items-center gap-3 text-white/80 justify-center md:justify-start hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <Phone className="text-white" size={18} />
                </div>
                <span className="text-sm">+91 78150 14638</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917815014638"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 justify-center md:justify-start hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                  <MessageCircle className="text-white" size={18} />
                </div>
                <span className="text-sm">WhatsApp Us — Quick Response Guaranteed</span>
              </a>

              {/* Address */}
              <div className="flex items-center gap-3 text-white/80 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <MapPin className="text-white" size={18} />
                </div>
                <span className="text-sm">Cuttack, Odisha, India</span>
              </div>

              {/* Geo coverage note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-white/50 text-xs mt-6 max-w-xs mx-auto md:mx-0"
              >
                Based in Odisha, we work with businesses across Bhubaneswar, Cuttack, Puri, Sambalpur,
                Rourkela and all of Odisha.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex items-center justify-center py-20 md:py-0 px-8 md:px-16 bg-secondary/20" ref={formRef}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md space-y-6"
          >
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl transition-all"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Email</label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                type="email"
                required
                className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl transition-all"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Phone</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 000-0000-000"
                type="tel"
                className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl transition-all"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Message</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={5}
                required
                className="bg-background/50 border-border/50 focus:border-primary rounded-xl transition-all resize-none"
              />
            </div>
            <MagneticButton strength={0.1} className="w-full">
              <Button
                type="submit"
                size="lg"
                className="w-full group bg-gradient-primary hover:opacity-90 border-0 text-white h-14 rounded-xl text-base"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
                <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticButton>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
