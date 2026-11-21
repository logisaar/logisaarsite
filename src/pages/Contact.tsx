import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Eyebrow from "@/components/Eyebrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CONTACT, whatsappLink } from "@/lib/contact";
import { submitForm } from "@/lib/submitForm";

const NEEDS = [
  "Software development",
  "AI agent",
  "Business automation",
  "AI software",
  "Ready-made solution",
  "IKURO",
  "HeyLane",
  "Something else",
] as const;

const STEPS = [
  "We read your message",
  "We reply with questions or a call slot",
  "You get a clear plan and a fixed quote",
];

// TODO(owner): confirm each FAQ answer before launch.
const FAQ = [
  {
    q: "How do quotes work?",
    a: "After we understand the problem, we send a written scope with a fixed price. You see the full cost before any work starts.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We work with clients across India and abroad, and we run calls and delivery online.",
  },
  {
    q: "Can you work with our existing software?",
    a: "Usually, yes. Tell us what you use today and we will say how a new tool can connect to it, or whether it should replace it.",
  },
];

type FieldName = "name" | "email" | "message";
const WA_TEXT = "Hi Logisaar, I'd like to talk about a project.";

const validate = (field: FieldName, value: string): string => {
  const v = value.trim();
  if (field === "name") return v ? "" : "Add your name so we know who to reply to.";
  if (field === "email") {
    if (!v) return "Add an email we can reply to.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Check the email format, for example name@company.com.";
  }
  return v ? "" : "Add a few lines about what you need.";
};

const CARD = "flex h-full flex-col rounded-2xl border border-border bg-card p-6";
const BTN = "min-h-[2.75rem] rounded-full border-0 bg-primary px-6 font-semibold text-primary-on hover:bg-primary/90";

const Field = ({
  id,
  label,
  optional,
  helper,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  helper?: string;
  error: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-body-sm font-medium text-foreground">
      {label}
      {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
    </label>
    {children}
    {helper && (
      <p id={`${id}-help`} className="text-label text-muted-foreground">
        {helper}
      </p>
    )}
    <p id={`${id}-err`} aria-live="polite" className="min-h-[1.25rem] text-label text-destructive">
      {error}
    </p>
  </div>
);

const Contact = () => {
  const [values, setValues] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [needs, setNeeds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<FieldName, string>>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [sentTo, setSentTo] = useState({ name: "", email: "" });
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const set = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setValues((p) => ({ ...p, [field]: v }));
    if (field === "name" || field === "email" || field === "message") {
      setErrors((p) => (p[field] ? { ...p, [field]: "" } : p));
    }
  };
  const blur = (field: FieldName) => () => setErrors((p) => ({ ...p, [field]: validate(field, values[field]) }));
  const toggleNeed = (n: string) => setNeeds((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const aria = (field: FieldName, helper?: boolean) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": `${helper ? `${field}-help ` : ""}${field}-err`,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const next = {
      name: validate("name", values.name),
      email: validate("email", values.email),
      message: validate("message", values.message),
    };
    setErrors(next);
    const firstBad = (["name", "email", "message"] as FieldName[]).find((f) => next[f]);
    if (firstBad) {
      document.getElementById(firstBad)?.focus();
      return;
    }
    setStatus("sending");
    const result = await submitForm(
      {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
        extra: { company: values.company.trim(), needs: needs.join(", ") },
      },
      "contact_page",
    );
    if (result.success) {
      setSentTo({ name: values.name.trim(), email: values.email.trim() });
      setStatus("sent");
    } else {
      setStatus("failed");
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", phone: "", company: "", message: "" });
    setNeeds([]);
    setErrors({ name: "", email: "", message: "" });
    setStatus("idle");
  };

  // TODO(owner): confirm reply time ("within one working day") before launch.
  const description =
    "Tell Logisaar what slows your team down. We reply within one working day with a clear next step: a call, a quote or a straight answer.";

  return (
    <Layout>
      <SEO
        title="Contact Logisaar | Software, AI agents and automation"
        description={description}
        canonical="https://www.logisaar.in/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Logisaar",
          url: "https://www.logisaar.in/contact",
          mainEntity: {
            "@type": "Organization",
            name: "Logisaar Technologies Private Limited",
            url: "https://www.logisaar.in",
            email: CONTACT.email,
            telephone: CONTACT.phone,
            address: { "@type": "PostalAddress", streetAddress: "4th floor, Nalanda Institute of Technology, Khandagiri - Chandaka Rd, Similipatana", addressLocality: "Bhubaneswar", addressRegion: "Odisha", postalCode: "754012", addressCountry: "IN" },
            contactPoint: [
              { "@type": "ContactPoint", contactType: "customer support", email: CONTACT.email, telephone: CONTACT.phone },
            ],
          },
        }}
      />

      {/* Hero */}
      <section
        data-logi-dock
        data-logi="WhatsApp is the fastest way to reach us."
        className="bg-background pb-section-sm pt-section-sm"
      >
        <div className="container mx-auto max-w-3xl px-gutter text-center">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mx-auto mt-4 max-w-[22ch] font-display text-h1-page font-bold text-foreground">Let&rsquo;s talk about your project</h1>
          <p className="mx-auto mt-6 max-w-[60ch] text-lead text-muted-foreground">{description}</p>
        </div>
      </section>

      {/* Three ways to reach us */}
      <section aria-labelledby="ways-h" className="bg-background pb-section-sm">
        <div className="container mx-auto max-w-[68rem] px-gutter">
          <h2 id="ways-h" className="sr-only">
            Three ways to reach us
          </h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-5 p-0">
            <li className={CARD}>
              <div className="flex items-center justify-between gap-3">
                <MessageCircle className="text-primary-ink" size={24} aria-hidden="true" />
                <span className="rounded-full bg-primary/10 px-3 py-1 text-label font-semibold text-primary-ink">Fastest</span>
              </div>
              <h3 className="mt-4 font-display text-h3 font-bold text-foreground">WhatsApp</h3>
              <p className="mt-1 text-body text-muted-foreground">{CONTACT.phone}</p>
              <div className="mt-auto pt-6">
                <Button asChild className={BTN}>
                  <a href={whatsappLink(WA_TEXT)} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
              </div>
            </li>
            <li className={CARD}>
              <Mail className="text-primary-ink" size={24} aria-hidden="true" />
              <h3 className="mt-4 font-display text-h3 font-bold text-foreground">Email</h3>
              <p className="mt-1 break-all text-body text-muted-foreground">{CONTACT.email}</p>
              <div className="mt-auto pt-6">
                <Button asChild className={BTN}>
                  <a href={CONTACT.mailto}>Email us</a>
                </Button>
              </div>
            </li>
            <li className={CARD}>
              <Phone className="text-primary-ink" size={24} aria-hidden="true" />
              <h3 className="mt-4 font-display text-h3 font-bold text-foreground">Call</h3>
              <p className="mt-1 text-body text-muted-foreground">{CONTACT.phone}</p>
              <div className="mt-auto pt-6">
                <Button asChild className={BTN}>
                  <a href={CONTACT.tel}>Call us</a>
                </Button>
              </div>
            </li>
          </ul>
          {/* TODO(owner): working hours line, for example "Mon to Sat, 10:00 to 18:00 IST" */}
        </div>
      </section>

      {/* Form + what happens next */}
      <section aria-labelledby="form-h" className="bg-secondary/40 py-section-sm">
        <div className="container mx-auto grid max-w-[68rem] gap-10 px-gutter lg:grid-cols-[3fr_2fr]">
          <div>
            <h2 id="form-h" className="font-display text-h2-page font-bold text-foreground">
              Tell us about your project
            </h2>

            {status === "sent" ? (
              <div
                ref={doneRef}
                tabIndex={-1}
                role="status"
                className="mt-8 space-y-4 rounded-2xl border border-primary/30 bg-card p-8 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--focus-ring))]"
              >
                <h3 className="font-display text-h3 font-bold text-foreground">Message received</h3>
                <p className="text-body text-muted-foreground">
                  Thanks, {sentTo.name}. We&rsquo;ve got your message and will reply to {sentTo.email}.
                </p>
                <Button type="button" variant="outline" className="min-h-[2.75rem] rounded-full" onClick={reset}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="grid gap-x-5 sm:grid-cols-2">
                  <Field id="name" label="Name" error={errors.name}>
                    <Input id="name" name="name" autoComplete="name" className="h-11" value={values.name} onChange={set("name")} onBlur={blur("name")} {...aria("name")} />
                  </Field>
                  <Field id="email" label="Work email" error={errors.email}>
                    <Input id="email" name="email" type="email" autoComplete="email" className="h-11" value={values.email} onChange={set("email")} onBlur={blur("email")} {...aria("email")} />
                  </Field>
                  <Field id="phone" label="Phone or WhatsApp" optional error="">
                    <Input id="phone" name="phone" type="tel" autoComplete="tel" className="h-11" value={values.phone} onChange={set("phone")} />
                  </Field>
                  <Field id="company" label="Company" optional error="">
                    <Input id="company" name="company" autoComplete="organization" className="h-11" value={values.company} onChange={set("company")} />
                  </Field>
                </div>

                <fieldset className="mb-5">
                  <legend className="mb-2 text-body-sm font-medium text-foreground">What do you need?</legend>
                  <div className="flex flex-wrap gap-2">
                    {NEEDS.map((n) => (
                      <label key={n} className="relative cursor-pointer">
                        <input type="checkbox" className="peer sr-only" checked={needs.includes(n)} onChange={() => toggleNeed(n)} />
                        <span className="inline-flex min-h-[2.75rem] items-center rounded-full border border-border bg-background px-4 text-body-sm font-medium text-foreground transition-colors peer-checked:border-primary peer-checked:bg-primary/15 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[hsl(var(--focus-ring))]">
                          {n}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field id="message" label="Message" helper="A few lines on the problem is enough." error={errors.message}>
                  <Textarea id="message" name="message" rows={5} className="min-h-[7.5rem] text-body-sm" value={values.message} onChange={set("message")} onBlur={blur("message")} {...aria("message", true)} />
                </Field>

                {status === "failed" && (
                  <div role="alert" className="mb-5 space-y-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
                    <p className="text-body-sm text-foreground">
                      Your message wasn&rsquo;t sent. Please try again, or reach us on WhatsApp.
                    </p>
                    <Button asChild variant="outline" className="min-h-[2.75rem] rounded-full">
                      <a href={whatsappLink(WA_TEXT)} target="_blank" rel="noopener noreferrer">
                        Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </Button>
                  </div>
                )}

                <Button type="submit" aria-disabled={status === "sending"} className={`${BTN} w-full sm:w-auto sm:min-w-[11rem]`}>
                  {status === "sending" ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </div>

          <aside aria-labelledby="next-h" className="lg:pt-[4.5rem]">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 id="next-h" className="font-display text-h3 font-bold text-foreground">
                What happens next
              </h2>
              <ol className="m-0 mt-5 list-none space-y-4 p-0">
                {STEPS.map((s, i) => (
                  <li key={s} className="flex items-start gap-3">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-label font-bold text-primary-on"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-1 text-body text-foreground">{s}</span>
                  </li>
                ))}
              </ol>
              {/* TODO(owner): confirm the NDA offer */}
              <p className="mt-6 border-t border-border pt-4 text-body-sm text-muted-foreground">
                Need an NDA first? We&rsquo;re happy to sign one before you share details.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Office */}
      <section aria-labelledby="office-h" className="bg-background py-section-sm">
        <div className="container mx-auto max-w-3xl px-gutter text-center">
          <h2 id="office-h" className="font-display text-h2-page font-bold text-foreground">
            Our office
          </h2>
          <p className="mt-5 flex items-start justify-center gap-2 text-body text-foreground">
            <MapPin size={20} className="mt-1 shrink-0 text-primary-ink" aria-hidden="true" />
            <span>Logisaar Technologies Private Limited, {CONTACT.officeAddress}</span>
          </p>
          <p className="mt-1 text-body-sm text-muted-foreground">CIN: {CONTACT.cin}</p>
          {/* TODO(owner): confirm wording; don't mention USA/Canada offices until they exist */}
          <p className="mt-4 text-body text-muted-foreground">We work with clients across India and abroad.</p>
                    <Button asChild variant="outline" className="mt-6 min-h-[2.75rem] rounded-full">
            <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
              Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-h" className="bg-secondary/40 py-section-sm">
        <div className="container mx-auto max-w-3xl px-gutter">
          <h2 id="faq-h" className="text-center font-display text-h2-page font-bold text-foreground">
            Questions before you write
          </h2>
          <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-border bg-card px-6">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`}>
                <AccordionTrigger className="min-h-[2.75rem] text-left text-body font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-body text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="hiring" className="border-b-0">
              <AccordionTrigger className="min-h-[2.75rem] text-left text-body font-medium">Are you hiring?</AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground">
                Sometimes. See current roles on the{" "}
                <Link to="/careers" className="inline-flex min-h-[2.75rem] items-center gap-1 font-medium text-primary-ink underline underline-offset-4">
                  Careers page <ArrowRight size={14} aria-hidden="true" />
                </Link>
                .
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
