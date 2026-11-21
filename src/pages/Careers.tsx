import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  ArrowRight, Briefcase, CheckCircle2, MapPin, MessageCircle, PenTool,
  Users, Utensils, TrendingUp, Loader2, AlertCircle,
} from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/creative/MagneticButton";
import { CONTACT, whatsappLink } from "@/lib/contact";
import { submitForm } from "@/lib/submitForm";

const ROLES = [
  {
    id: "Business Development Associate",
    title: "Business Development Associate",
    openings: "3 openings",
    place: "Bhubaneswar",
    tag: "Freshers welcome",
    icon: Briefcase,
    blurb:
      "Talk to local businesses, understand what slows them down and show them how Logisaar can fix it. You learn the job on the job.",
    points: ["Meet and call business owners", "Run demos with our team", "Hit monthly targets and earn incentives"],
  },
  {
    id: "Content Creator & Graphic Designer",
    title: "Content Creator & Graphic Designer",
    openings: "1 opening",
    place: "",
    tag: "Reels, design, video",
    icon: PenTool,
    blurb:
      "Make the posts, reels and designs that show people what we build. You shoot, edit and design, start to finish.",
    points: ["Shoot and edit reels and videos", "Design posts and brand material", "Keep our social channels active"],
  },
] as const;

const PROCESS = [
  { icon: Utensils, title: "Month one: training", text: "One month of target-based training. Food and transport are provided." },
  { icon: TrendingUp, title: "Month two: full pay", text: "Hit your target and you move to full pay from month two." },
  { icon: Users, title: "Incentives on top", text: "Incentives are added on top of your pay as you grow." },
];

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition";

const Careers = () => {
  const reduce = useReducedMotion();
  const { hash } = useLocation();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", role: "", city: "", resume: "", note: "",
  });

  // Direct visits to /careers#apply (QR codes) land on the form.
  useEffect(() => {
    if (hash !== "#apply") return;
    const t = setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 600);
    return () => clearTimeout(t);
  }, [hash, reduce]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const pickRole = (role: string) => {
    setForm((f) => ({ ...f, role }));
    document.getElementById("apply")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    const message = [
      `Role: ${form.role}`,
      `City: ${form.city}`,
      form.resume ? `Resume: ${form.resume}` : "",
      form.note ? `Note: ${form.note}` : "",
    ].filter(Boolean).join("\n");
    const result = await submitForm(
      { name: form.name, email: form.email, phone: form.phone, message, extra: { role: form.role, city: form.city, resume: form.resume } },
      "careers"
    );
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Something went wrong.");
    }
  };

  const fade = (delay = 0) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6, delay } };

  return (
    <Layout>
      <SEO
        title="Careers at Logisaar | We're Hiring in Bhubaneswar"
        description="Join Logisaar in Bhubaneswar. Open roles: Business Development Associate (3 openings, freshers welcome) and Content Creator & Graphic Designer."
        keywords="Logisaar careers, jobs in Bhubaneswar, business development associate Bhubaneswar, content creator jobs Odisha, freshers jobs Bhubaneswar"
        canonical="https://www.logisaar.in/careers"
      />

      {/* Hero */}
      <section data-logi="We're hiring! Freshers are welcome." className="relative overflow-hidden pt-section-sm pb-20 md:pb-24 bg-background">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }}
        />
        <div className="container mx-auto px-gutter relative z-10 max-w-4xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-primary-ink text-xs font-bold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              We're hiring
            </div>
            <h1 className="font-display text-h1-page font-bold text-foreground">
              Build your career <span className="text-gradient">with us.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Logisaar builds software, AI agents and automation for real businesses. We are growing the team in Bhubaneswar and we have two roles open right now.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <MagneticButton strength={0.15}>
                <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 border-0 text-primary-on rounded-full px-8">
                  <a href="#apply">Apply now <ArrowRight size={16} className="ml-2" /></a>
                </Button>
              </MagneticButton>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <a href="#roles">See open roles</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open roles */}
      <section id="roles" data-logi="Two roles open. Pick the one that fits you." className="py-section bg-secondary/40 scroll-mt-28">
        <div className="container mx-auto px-gutter max-w-5xl">
          <motion.div {...fade()} className="mb-12">
            <p className="text-primary-ink font-mono text-xs uppercase tracking-widest font-bold mb-3">Open roles</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Two roles, <span className="text-gradient">start soon</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {ROLES.map((r, i) => (
              <motion.article
                key={r.id}
                {...fade(i * 0.1)}
                className="liquid-glass rounded-2xl border border-border bg-card p-7 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary-ink flex items-center justify-center">
                    <r.icon size={22} aria-hidden />
                  </span>
                  <span className="text-xs font-semibold rounded-full bg-primary/10 text-primary-ink px-3 py-1">{r.openings}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{r.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                  {r.place && (
                    <span className="inline-flex items-center gap-1"><MapPin size={14} aria-hidden /> {r.place}</span>
                  )}
                  <span>{r.tag}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{r.blurb}</p>
                <ul className="mt-4 space-y-2 text-sm text-foreground">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckCircle2 size={16} className="text-primary-ink mt-0.5 shrink-0" aria-hidden /> {p}
                    </li>
                  ))}
                </ul>
                <Button onClick={() => pickRole(r.id)} className="mt-6 self-start bg-gradient-primary hover:opacity-90 border-0 text-primary-on rounded-full px-6">
                  Apply for this role <ArrowRight size={15} className="ml-2" />
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section data-logi="Training first, full pay from month two." className="py-section bg-background">
        <div className="container mx-auto px-gutter max-w-5xl">
          <motion.div {...fade()} className="mb-12">
            <p className="text-primary-ink font-mono text-xs uppercase tracking-widest font-bold mb-3">How it works</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Learn first. <span className="text-gradient">Earn more.</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              For the Business Development role, you start with training. No experience needed, only the will to learn and hit targets.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROCESS.map((s, i) => (
              <motion.div key={s.title} {...fade(i * 0.1)} className="rounded-2xl border border-border bg-card p-6">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary-ink flex items-center justify-center mb-4">
                  <s.icon size={20} aria-hidden />
                </span>
                <h3 className="font-display font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" data-logi="Two minutes to apply. We call you back." className="py-section bg-secondary/40 scroll-mt-24">
        <div className="container mx-auto px-gutter max-w-3xl">
          <motion.div {...fade()} className="mb-10 text-center">
            <p className="text-primary-ink font-mono text-xs uppercase tracking-widest font-bold mb-3">Apply</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Tell us <span className="text-gradient">about you</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Takes two minutes. We reply on the phone number you share.</p>
          </motion.div>

          {status === "success" ? (
            <div role="status" className="rounded-2xl border border-primary/30 bg-card p-10 text-center space-y-4">
              <CheckCircle2 size={44} className="text-primary-ink mx-auto" aria-hidden />
              <h3 className="font-display text-2xl font-bold text-foreground">Application received</h3>
              <p className="text-muted-foreground">Thanks, {form.name.split(" ")[0] || "there"}. We will call you soon on {form.phone}.</p>
              <Button asChild variant="outline" className="rounded-full">
                <a href={whatsappLink(`Hi Logisaar, I just applied for ${form.role}.`)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} className="mr-2" /> Say hi on WhatsApp
                </a>
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-medium mb-1.5">Full name</label>
                  <input id="c-name" required autoComplete="name" value={form.name} onChange={set("name")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="c-phone" className="block text-sm font-medium mb-1.5">Phone</label>
                  <input id="c-phone" required type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+\-\s()]{7,15}" title="Enter a valid phone number" value={form.phone} onChange={set("phone")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-sm font-medium mb-1.5">Email</label>
                  <input id="c-email" required type="email" autoComplete="email" value={form.email} onChange={set("email")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="c-city" className="block text-sm font-medium mb-1.5">City</label>
                  <input id="c-city" required autoComplete="address-level2" value={form.city} onChange={set("city")} className={fieldClass} />
                </div>
              </div>
              <div>
                <label htmlFor="c-role" className="block text-sm font-medium mb-1.5">Role</label>
                <select id="c-role" required value={form.role} onChange={set("role")} className={fieldClass}>
                  <option value="" disabled>Choose a role</option>
                  {ROLES.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="c-resume" className="block text-sm font-medium mb-1.5">
                  Resume or portfolio link <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input id="c-resume" type="url" placeholder="https://" value={form.resume} onChange={set("resume")} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="c-note" className="block text-sm font-medium mb-1.5">
                  Anything we should know? <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <textarea id="c-note" rows={3} maxLength={600} value={form.note} onChange={set("note")} className={fieldClass} />
              </div>

              {status === "error" && (
                <p role="alert" className="flex items-start gap-2 text-sm text-destructive">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
                  <span>{errorMsg} You can also WhatsApp us on {CONTACT.phone}.</span>
                </p>
              )}

              <Button type="submit" disabled={status === "sending"} size="lg" className="w-full bg-gradient-primary hover:opacity-90 border-0 text-primary-on rounded-full">
                {status === "sending" ? (<><Loader2 size={16} className="mr-2 animate-spin" /> Sending</>) : "Send application"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Prefer email? Write to <a className="inline-flex min-h-[2.75rem] items-center text-primary-ink underline underline-offset-2" href={CONTACT.mailto}>{CONTACT.email}</a>.
              </p>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
