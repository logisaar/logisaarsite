import { Check } from "lucide-react";
import { seg, useStage } from "./useStage";

/**
 * Faux product UIs for the four services on /solutions. Each one is a short looped sequence
 * that plays only while it is on screen. Everything is a labelled sample: no real client data.
 * Motion is opacity and transform only (typed text reveals by changing opacity per character).
 * With reduced motion the clock is parked on the final state (see useStage).
 */

const ease = "transition-[opacity,transform] duration-300 ease-out";
const show = (on: boolean) => (on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0");

const Frame = ({ title, label, children }: { title: string; label: string; children: React.ReactNode }) => (
  <figure
    role="img"
    aria-label={label}
    className="m-0 flex aspect-[4/3] w-full flex-col overflow-clip rounded-2xl border border-border bg-card shadow-sm lg:aspect-[16/11]"
  >
    <div className="flex shrink-0 items-center justify-between border-b border-border bg-secondary px-4 py-2.5" aria-hidden="true">
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
      </span>
      <span className="text-label font-medium text-muted-foreground">{title}</span>
      <span className="rounded-full border border-border bg-background px-2 py-0.5 text-label font-medium text-muted-foreground">Sample</span>
    </div>
    <div className="flex-1 p-3 sm:p-5" aria-hidden="true">
      {children}
    </div>
  </figure>
);

/** Typed text: the full string always takes its space, so nothing shifts while it appears. */
const Typed = ({ text, p }: { text: string; p: number }) => {
  const n = Math.round(text.length * p);
  return (
    <>
      {text.slice(0, n)}
      <span className="opacity-0">{text.slice(n)}</span>
    </>
  );
};

const Chip = ({ ok, children }: { ok: boolean; children: React.ReactNode }) => (
  <span
    className={`relative inline-grid rounded-full px-2.5 py-0.5 text-label font-semibold ${ease} ${
      ok ? "bg-primary/15 text-primary-ink" : "bg-secondary text-muted-foreground"
    }`}
  >
    {children}
  </span>
);

/* 1. Software development: an orders dashboard */
const ORDERS = ["Swosti Traders", "Anand Stores", "Rao & Sons", "Mishra Hardware"];
const PACKED_AT = [2800, Infinity, 3700, Infinity];
const SW_TOTAL = 4800;

const SoftwareSample = () => {
  const { ref, t } = useStage<HTMLDivElement>(SW_TOTAL);
  const arrived = ORDERS.map((_, i) => t >= 300 + i * 600);
  const packed = PACKED_AT.map((at) => t >= at);
  const nArrived = arrived.filter(Boolean).length;
  const nPacked = packed.filter(Boolean).length;
  const kpi = [
    ["Orders today", nArrived],
    ["Packed", nPacked],
    ["Pending", nArrived - nPacked],
  ] as const;
  return (
    <div ref={ref}>
      <Frame title="Orders" label="Sample orders dashboard: new orders arrive and their status changes from Waiting to Packed">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {kpi.map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-background px-3 py-2">
              <p className="text-label text-muted-foreground">{k}</p>
              <p className="font-display text-h3 font-bold tabular-nums text-foreground">{v}</p>
            </div>
          ))}
        </div>
        <ul className="mt-3 divide-y divide-border">
          {ORDERS.map((n, i) => (
            <li key={n} className={`flex items-center justify-between gap-3 py-2.5 sm:py-3 ${ease} ${show(arrived[i])}`}>
              <span className="truncate text-body-sm font-medium text-foreground">Order from {n}</span>
              <Chip ok={packed[i]}>{packed[i] ? "Packed" : "Waiting"}</Chip>
            </li>
          ))}
        </ul>
      </Frame>
    </div>
  );
};

/* 2. AI agents: a WhatsApp chat beside a calendar */
const AG_TOTAL = 6800;
const Q1 = "Hi, can I book a check-up for Friday?";
const A1 = "Yes. I have 10:30 am or 4:00 pm on Friday. Which suits you?";
const Q2 = "4:00 pm please.";

const Bubble = ({ mine, on, children }: { mine?: boolean; on: boolean; children: React.ReactNode }) => (
  <p
    className={`max-w-[88%] rounded-2xl px-4 py-2 text-body-sm ${ease} ${show(on)} ${
      mine ? "ml-auto rounded-br-sm bg-primary text-primary-on" : "rounded-bl-sm bg-secondary text-foreground"
    }`}
  >
    {children}
  </p>
);

const Dots = ({ on, t }: { on: boolean; t: number }) => (
  <p
    className={`absolute right-0 top-0 flex w-14 items-center justify-center gap-1 rounded-2xl rounded-br-sm bg-primary/15 py-3 ${ease} ${on ? "opacity-100" : "opacity-0"}`}
  >
    {[0, 1, 2].map((i) => (
      <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary-ink" style={{ opacity: Math.floor(t / 250) % 3 === i ? 1 : 0.35 }} />
    ))}
  </p>
);

const AgentSample = () => {
  const { ref, t } = useStage<HTMLDivElement>(AG_TOTAL);
  const q1 = seg(t, 300, 1100);
  const typing1 = t >= 1500 && t < 2300;
  const a1 = t >= 2300;
  const q2 = seg(t, 3200, 600);
  const typing2 = t >= 3900 && t < 4600;
  const booked = t >= 4600;
  const slotFilled = t >= 5000;
  return (
    <div ref={ref}>
      <Frame title="WhatsApp chat" label="Sample WhatsApp chat: a customer asks for a Friday check-up, the AI agent replies and books 4:00 pm, and the calendar slot fills in">
        <div className="flex gap-4">
          <div className="flex min-w-0 flex-1 flex-col justify-end gap-2">
            <Bubble on={q1 > 0}>
              <Typed text={Q1} p={q1} />
            </Bubble>
            <div className="relative">
              <Dots on={typing1} t={t} />
              <Bubble mine on={a1}>
                {A1}
              </Bubble>
            </div>
            <Bubble on={q2 > 0}>
              <Typed text={Q2} p={q2} />
            </Bubble>
            <div className="relative">
              <Dots on={typing2} t={t} />
              <p className={`ml-auto flex max-w-[88%] items-center gap-2 rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-body-sm font-semibold text-primary-on ${ease} ${show(booked)}`}>
                <Check size={16} aria-hidden="true" /> Booked for Friday, 4:00 pm.
              </p>
            </div>
          </div>
          <div className="hidden w-40 shrink-0 flex-col gap-2 rounded-xl border border-border bg-background p-3 sm:flex">
            <p className="text-label font-medium text-muted-foreground">Friday</p>
            <div className="rounded-lg border border-border bg-card px-3 py-2 text-label font-medium text-foreground">10:30 am</div>
            <div
              className={`rounded-lg border px-3 py-2 text-label font-semibold ${ease} ${
                slotFilled ? "border-primary bg-primary/15 text-primary-ink" : "border-border bg-card text-foreground"
              }`}
            >
              4:00 pm
              <span className={`ml-2 inline-block ${ease} ${slotFilled ? "opacity-100" : "opacity-0"}`}>
                <Check size={14} aria-hidden="true" className="inline" />
              </span>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
};

/* 3. Business automation: four nodes on a line that draws */
const AU_TOTAL = 5200;
const STEPS = ["New order arrives", "Invoice is created", "Bill is sent on WhatsApp", "Entry is added to your sheet"];

const AutomationSample = () => {
  const { ref, t } = useStage<HTMLDivElement>(AU_TOTAL);
  const draw = seg(t, 200, 3900);
  const done = (i: number) => t >= 700 + i * 1200;
  return (
    <div ref={ref}>
      <Frame title="Automation" label="Sample automation: a new order creates an invoice, sends the bill on WhatsApp and adds an entry to your sheet">
        <ol className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:pt-6">
          {/* the line: vertical on small frames, horizontal from sm */}
          <span aria-hidden="true" className="absolute bottom-5 left-[1.125rem] top-5 w-0.5 bg-border sm:bottom-auto sm:left-[12.5%] sm:right-[12.5%] sm:top-[2.875rem] sm:h-0.5 sm:w-auto" />
          <span
            aria-hidden="true"
            className="absolute bottom-5 left-[1.125rem] top-5 w-0.5 origin-top bg-primary [transform:scaleY(var(--draw))] sm:bottom-auto sm:left-[12.5%] sm:right-[12.5%] sm:top-[2.875rem] sm:h-0.5 sm:w-auto sm:origin-left sm:[transform:scaleX(var(--draw))]"
            style={{ "--draw": draw } as React.CSSProperties}
          />
          {STEPS.map((s, i) => (
            <li key={s} className="relative z-10 flex items-center gap-3 sm:w-1/4 sm:flex-col sm:gap-3 sm:text-center">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-display text-label font-bold ${ease} ${
                  done(i) ? "scale-100 border-primary bg-primary text-primary-on" : "scale-95 border-border bg-card text-muted-foreground"
                }`}
              >
                {done(i) ? <Check size={16} aria-hidden="true" /> : i + 1}
              </span>
              <span className={`text-body-sm font-medium text-foreground ${ease} ${done(i) ? "opacity-100" : "opacity-60"}`}>{s}</span>
            </li>
          ))}
        </ol>
      </Frame>
    </div>
  );
};

/* 4. AI software: ask your documents */
const AI_TOTAL = 6400;
const QUESTION = "What is our refund policy for annual plans?";
const ANSWER = "Annual plans can be refunded within the window written in the policy. The answer is read from your own document.";

const AiSoftwareSample = () => {
  const { ref, t } = useStage<HTMLDivElement>(AI_TOTAL);
  const q = seg(t, 300, 1200);
  const a = seg(t, 1900, 2600);
  const cited = t >= 4800;
  return (
    <div ref={ref}>
      <Frame title="Ask your documents" label="Sample document assistant: a question is asked, the answer streams in and the source line is highlighted in the document">
        <div className="flex gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-3 text-body-sm">
            <p className="rounded-xl border border-border bg-background px-4 py-2.5 text-foreground">
              <Typed text={QUESTION} p={q} />
            </p>
            <div className="rounded-xl bg-secondary px-4 py-3 text-foreground">
              <p>
                <Typed text={ANSWER} p={a} />
              </p>
              <p className={`mt-2 inline-flex items-center gap-1.5 text-label font-medium text-primary-ink ${ease} ${cited ? "opacity-100" : "opacity-0"}`}>
                <Check size={14} aria-hidden="true" /> Source: Refund policy, page 2
              </p>
            </div>
          </div>
          <div className="hidden w-44 shrink-0 flex-col gap-2 rounded-xl border border-border bg-background p-3 sm:flex">
            <p className="text-label font-medium text-muted-foreground">Refund policy</p>
            {[88, 72, 80, -1, 76, 60, 84].map((w, i) =>
              w < 0 ? (
                <span key={i} className={`relative block h-3 rounded ${ease} ${cited ? "bg-primary/30" : "bg-border"}`} style={{ width: "92%" }}>
                  <span className={`absolute -left-1.5 top-0 h-3 w-0.5 rounded bg-primary ${ease} ${cited ? "opacity-100" : "opacity-0"}`} />
                </span>
              ) : (
                <span key={i} className="block h-2 rounded bg-border/70" style={{ width: `${w}%` }} />
              ),
            )}
            <p className="mt-auto text-label text-muted-foreground">Page 2</p>
          </div>
        </div>
      </Frame>
    </div>
  );
};

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
