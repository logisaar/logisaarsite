import { Check } from "lucide-react";

/**
 * Small faux product UIs for the four service blocks on /solutions.
 * Everything here is a labelled sample: no real client data and no numbers.
 */

const Frame = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <figure className="m-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
    <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2.5">
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
      </span>
      <span className="text-label font-medium text-muted-foreground">{title}</span>
      <span className="rounded-full border border-border bg-background px-2 py-0.5 text-label font-medium text-muted-foreground">Sample</span>
    </div>
    <div className="p-4 md:p-5">{children}</div>
  </figure>
);

const Chip = ({ children, tone = "ok" }: { children: React.ReactNode; tone?: "ok" | "wait" }) => (
  <span
    className={`rounded-full px-2.5 py-0.5 text-label font-semibold ${
      tone === "ok" ? "bg-primary/15 text-primary-ink" : "bg-secondary text-muted-foreground"
    }`}
  >
    {children}
  </span>
);

const SoftwareSample = () => (
  <Frame title="Orders">
    <ul className="divide-y divide-border" aria-label="Sample orders list">
      {[
        { n: "Order from Swosti Traders", s: "Packed", t: "ok" as const },
        { n: "Order from Anand Stores", s: "Waiting", t: "wait" as const },
        { n: "Order from Rao & Sons", s: "Packed", t: "ok" as const },
        { n: "Order from Mishra Hardware", s: "Waiting", t: "wait" as const },
      ].map((r) => (
        <li key={r.n} className="flex items-center justify-between gap-3 py-3">
          <span className="text-body-sm font-medium text-foreground">{r.n}</span>
          <Chip tone={r.t}>{r.s}</Chip>
        </li>
      ))}
    </ul>
  </Frame>
);

const AgentSample = () => (
  <Frame title="WhatsApp chat">
    <div className="space-y-3 text-body-sm">
      <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-foreground">Hi, can I book a check-up for Friday?</p>
      <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-on">
        Yes. I have 10:30 am or 4:00 pm on Friday. Which suits you?
      </p>
      <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-foreground">4:00 pm please.</p>
      <p className="ml-auto flex max-w-[85%] items-center gap-2 rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-on">
        <Check size={16} aria-hidden="true" /> Booked for Friday, 4:00 pm.
      </p>
    </div>
  </Frame>
);

const AutomationSample = () => (
  <Frame title="Automation">
    <ol className="space-y-3" aria-label="Sample automation steps">
      {["New order arrives", "Invoice is created", "Bill is sent on WhatsApp", "Entry is added to your sheet"].map((s, i) => (
        <li key={s} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-label font-bold text-primary-on">{i + 1}</span>
          <span className="text-body-sm font-medium text-foreground">{s}</span>
          <Check size={16} aria-hidden="true" className="ml-auto shrink-0 text-primary-ink" />
        </li>
      ))}
    </ol>
  </Frame>
);

const AiSoftwareSample = () => (
  <Frame title="Ask your documents">
    <div className="space-y-3 text-body-sm">
      <p className="rounded-xl border border-border bg-background px-4 py-3 text-foreground">What is our refund policy for annual plans?</p>
      <div className="rounded-xl bg-secondary px-4 py-3 text-foreground">
        <p>Annual plans can be refunded within the window written in the policy. The answer is read from your own document.</p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-label font-medium text-primary-ink">
          <Check size={14} aria-hidden="true" /> Source: Refund policy, page 2
        </p>
      </div>
    </div>
  </Frame>
);

const MAP = {
  "software-development": SoftwareSample,
  "ai-agents": AgentSample,
  "business-automation": AutomationSample,
  "ai-software": AiSoftwareSample,
} as const;

const ServiceVignette = ({ id }: { id: keyof typeof MAP }) => {
  const Sample = MAP[id];
  return <Sample />;
};

export default ServiceVignette;
