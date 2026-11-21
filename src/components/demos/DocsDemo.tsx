import { FileSpreadsheet, FileText, Search, Sparkles, Upload, BookOpen } from "lucide-react";
import type { RefObject } from "react";
import { Avatar, Cursor, DemoShell, relPos, streamInto, typeInto, useDemoLoop, type Crop } from "./DemoShell";

/** AI software demo: "ask your documents". File names, policy text and numbers are sample data. */

const FILES = [
  { n: "Refund policy.pdf", s: "212 KB", pdf: true, on: true },
  { n: "Pricing 2026.pdf", s: "340 KB", pdf: true },
  { n: "Vendor contract.pdf", s: "1.2 MB", pdf: true },
  { n: "Refunds Q3.xlsx", s: "88 KB" },
  { n: "Onboarding guide.pdf", s: "612 KB", pdf: true },
  { n: "Support playbook.pdf", s: "480 KB", pdf: true },
  { n: "Stock count.xlsx", s: "154 KB" },
];

const Inner = ({ root, active }: { root: RefObject<HTMLDivElement>; active: boolean }) => {
  useDemoLoop(root, {
    active,
    repeatDelay: 2.6,
    build: (tl, el, q) => {
      const flow = q("[data-flow]");
      const q1 = q("[data-q1]"), q1t = q("[data-q1t]");
      const think = q("[data-think]");
      const a1 = q("[data-a1]"), a1t = q("[data-a1t]");
      const chip = q("[data-chip]");
      const q2 = q("[data-q2]"), q2t = q("[data-q2t]");
      const a2 = q("[data-a2]"), table = q("[data-table]");
      const bars = Array.from(el.querySelectorAll<HTMLElement>("[data-bar]"));
      const page = q("[data-page]"), mark = q("[data-mark]");
      const cur = q("[data-cursor]");
      const park = { x: 840, y: 650 };

      const vh = () => flow.parentElement!.clientHeight;
      const fy = (n: HTMLElement) => Math.min(0, vh() - (n.offsetTop + n.offsetHeight + 20));
      const hist = q("[data-hist-last]");
      const QA1 = "What is the refund window for annual plans?";
      const AA1 = "Annual plans can be refunded within 30 days of purchase. After that, unused full months are credited to your account instead.";
      const QA2 = "How many refunds did we issue last quarter?";

      tl.set([q1, think, a1, chip, q2, a2, table], { opacity: 0 }, 0).set([q1, a1, q2, a2], { y: 10 }, 0)
        .set(bars, { scaleY: 0 }, 0).set(mark, { scaleX: 0 }, 0).set(page, { y: 0 }, 0).set(cur, park, 0)
        .set(flow, { y: () => fy(hist) }, 0);

      tl.to(q1, { opacity: 1, y: 0, duration: 0.4 }, 0.7).to(flow, { y: () => fy(q1), duration: 0.4 }, 0.7); typeInto(tl, q1t, QA1, 0.7, 1.2);
      tl.to(think, { opacity: 1, duration: 0.2 }, 2.1).to(flow, { y: () => fy(think), duration: 0.3 }, 2.1).to(think, { opacity: 0, duration: 0.2 }, 3.0);
      tl.to(a1, { opacity: 1, y: 0, duration: 0.4 }, 3.0).to(flow, { y: () => fy(a1), duration: 0.5 }, 3.0); streamInto(tl, a1t, AA1, 3.0, 2.0);
      tl.to(chip, { opacity: 1, duration: 0.4 }, 5.0);
      const cp = () => relPos(el, chip, 0.5, 0.5);
      tl.to(cur, { x: () => cp().x, y: () => cp().y, duration: 0.9, ease: "power3.inOut" }, 5.2)
        .to(page, { y: () => -(q("[data-target]").offsetTop - 70), duration: 0.9, ease: "power3.inOut" }, 6.2)
        .to(mark, { scaleX: 1, duration: 0.7, ease: "power2.out" }, 6.9);

      tl.to(cur, { x: park.x, y: park.y, duration: 0.8, ease: "power3.inOut" }, 8.0)
        .to(q2, { opacity: 1, y: 0, duration: 0.4 }, 8.6).to(flow, { y: () => fy(q2), duration: 0.4 }, 8.6); typeInto(tl, q2t, QA2, 8.6, 1.0);
      tl.to(think, { opacity: 1, duration: 0.2 }, 9.8).to(think, { opacity: 0, duration: 0.2 }, 10.5)
        .to(a2, { opacity: 1, y: 0, duration: 0.4 }, 10.5).to(table, { opacity: 1, duration: 0.5 }, 10.7)
        .to(flow, { y: () => fy(a2), duration: 0.5 }, 10.5)
        .to(bars, { scaleY: 1, duration: 0.7, stagger: 0.12 }, 11.0);
    },
  });

  const P = "text-[0.6875rem] leading-[1.7] text-slate-600";
  return (
    <div className="flex h-full bg-slate-50 text-[0.8125rem]">
      {/* library */}
      <aside className="flex w-[15.5rem] shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00D162] text-[#04130B]"><BookOpen size={17} /></span>
          <span className="text-[0.9375rem] font-bold text-slate-900">Knowledge base</span>
        </div>
        <div className="p-3"><span className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-400"><Search size={14} />Search files</span></div>
        <ul className="m-0 flex-1 list-none p-0">
          {FILES.map((f) => (
            <li key={f.n} className={`flex items-center gap-3 border-b border-slate-100 px-4 py-3 ${f.on ? "bg-emerald-50" : ""}`}>
              {f.pdf ? <FileText size={18} className="shrink-0 text-rose-500" /> : <FileSpreadsheet size={18} className="shrink-0 text-emerald-600" />}
              <span className="min-w-0 flex-1"><span className="block truncate font-medium text-slate-900">{f.n}</span><span className="text-[0.6875rem] text-slate-400">{f.s}</span></span>
            </li>
          ))}
        </ul>
        <div className="m-3 flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-slate-500"><Upload size={14} />Add files</div>
      </aside>

      {/* PDF preview */}
      <section className="relative flex min-w-0 flex-1 flex-col bg-slate-100">
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5"><span className="font-semibold text-slate-900">Refund policy.pdf</span><span className="text-[0.6875rem] text-slate-500">Page 2 of 4</span></header>
        <div className="relative flex-1 overflow-hidden">
          <div data-page className="mx-auto mt-5 w-[30rem] rounded-sm bg-white px-9 py-8 shadow-[0_2px_10px_rgba(15,23,42,0.12)]">
            <p className="text-[0.9375rem] font-bold text-slate-900">Refund and cancellation policy</p>
            <p className="mb-3 text-[0.625rem] text-slate-400">Version 3.2 · Effective 1 April 2026</p>
            <p className="text-[0.75rem] font-bold text-slate-800">1. Scope</p>
            <p className={P}>This policy covers every plan sold directly by the company, including monthly, annual and add-on purchases. Partner resellers apply their own terms.</p>
            <p className="mt-3 text-[0.75rem] font-bold text-slate-800">2. Monthly plans</p>
            <p className={P}>Monthly plans renew automatically. A cancellation takes effect at the end of the current billing month, and no partial refund is issued for days not used.</p>
            <p className="mt-3 text-[0.75rem] font-bold text-slate-800">3. Annual plans</p>
            <div data-target className="relative -mx-2 px-2 py-1">
              <i data-mark className="absolute inset-0 origin-left rounded bg-amber-200/60" />
              <p className={`relative ${P} text-slate-800`}>Annual plans can be refunded in full within 30 days of purchase. After 30 days, unused full months are credited to the customer account and cannot be paid out.</p>
            </div>
            <p className="mt-3 text-[0.75rem] font-bold text-slate-800">4. How to request a refund</p>
            <p className={P}>Write to the billing desk with the invoice number. Approved refunds go back to the original payment method within 7 to 10 working days.</p>
            <p className="mt-3 text-[0.75rem] font-bold text-slate-800">5. Exceptions</p>
            <p className={P}>Add-on services that have already been delivered, such as set-up or training sessions, are not refundable.</p>
            <p className={`mt-3 ${P}`}>Questions about this policy can be sent to the billing desk. We reply within two working days and keep a record of every request.</p>
          </div>
        </div>
      </section>

      {/* chat */}
      <aside className="flex w-[22rem] shrink-0 flex-col border-l border-slate-200 bg-white">
        <header className="flex h-12 items-center gap-2 border-b border-slate-200 px-4"><Sparkles size={15} className="text-emerald-600" /><span className="font-semibold text-slate-900">Ask your documents</span><Avatar name="Asha Rout" size="ml-auto h-7 w-7 text-[0.6875rem]" /></header>
        <div className="relative flex-1 overflow-hidden">
          <div data-flow className="absolute inset-x-0 top-0 flex flex-col gap-3 p-4">
            <div className="self-end rounded-2xl rounded-br-sm bg-slate-900 px-3.5 py-2.5 text-white">What does the vendor contract say about notice periods?</div>
            <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2.5 text-slate-800">Either side can end the contract with 60 days written notice.
              <span className="mt-2 flex"><span className="rounded-full bg-white px-2.5 py-1 text-[0.6875rem] font-semibold text-emerald-800 ring-1 ring-emerald-200">Vendor contract · p.6</span></span></div>
            <div className="self-end rounded-2xl rounded-br-sm bg-slate-900 px-3.5 py-2.5 text-white">And the price for the Growth plan?</div>
            <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2.5 text-slate-800">The Growth plan is listed at ₹4,999 a month, billed yearly.
              <span className="mt-2 flex"><span className="rounded-full bg-white px-2.5 py-1 text-[0.6875rem] font-semibold text-emerald-800 ring-1 ring-emerald-200">Pricing 2026 · p.1</span></span></div>
            <div data-hist-last className="self-end rounded-2xl rounded-br-sm bg-slate-900 px-3.5 py-2.5 text-white">Which plans include onboarding?</div>
            <div data-q1 className="self-end rounded-2xl rounded-br-sm bg-slate-900 px-3.5 py-2.5 text-white"><span data-q1t>What is the refund window for annual plans?</span></div>
            <div data-think className="flex"><span className="flex items-center gap-1.5 rounded-2xl bg-slate-100 px-3.5 py-2.5 text-slate-500"><Sparkles size={13} className="text-emerald-600" />Reading 4 documents…</span></div>
            <div data-a1 className="rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2.5 text-slate-800">
              <span data-a1t>Annual plans can be refunded within 30 days of purchase. After that, unused full months are credited to your account instead.</span>
              <span className="mt-2 flex"><span data-chip className="rounded-full bg-white px-2.5 py-1 text-[0.6875rem] font-semibold text-emerald-800 ring-1 ring-emerald-300">Refund policy · p.2</span></span>
            </div>
            <div data-q2 className="self-end rounded-2xl rounded-br-sm bg-slate-900 px-3.5 py-2.5 text-white"><span data-q2t>How many refunds did we issue last quarter?</span></div>
            <div data-a2 className="rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2.5 text-slate-800">
              <p>41 refunds, worth ₹1.12 lakh in total.</p>
              <div data-table className="mt-2 rounded-lg bg-white p-2.5 ring-1 ring-slate-200">
                <div className="flex h-14 items-end gap-3 px-1">{[["Jul", 14, "35%"], ["Aug", 12, "30%"], ["Sep", 15, "37%"]].map((b) => <span key={b[0] as string} className="flex flex-1 flex-col items-center gap-1"><i data-bar className="block w-full origin-bottom rounded-sm bg-emerald-500" style={{ height: b[2] as string, minHeight: 10 }} /><span className="text-[0.625rem] text-slate-500">{b[0]}</span></span>)}</div>
                <table className="mt-1 w-full text-[0.6875rem]"><tbody>
                  {[["Jul", "14", "₹38,200"], ["Aug", "12", "₹33,450"], ["Sep", "15", "₹40,350"]].map((r) => <tr key={r[0]} className="border-t border-slate-100"><td className="py-1 text-slate-500">{r[0]}</td><td className="py-1 text-right">{r[1]}</td><td className="py-1 text-right font-medium">{r[2]}</td></tr>)}
                </tbody></table>
              </div>
              <span className="mt-2 flex"><span className="rounded-full bg-white px-2.5 py-1 text-[0.6875rem] font-semibold text-emerald-800 ring-1 ring-emerald-200">Refunds Q3.xlsx · Sheet 1</span></span>
            </div>
          </div>
        </div>
        <div className="m-3 flex h-10 items-center rounded-xl border border-slate-200 px-3 text-slate-400">Ask a question about your files</div>
      </aside>
      <Cursor x={840} y={650} />
    </div>
  );
};

export const DocsDemo = ({ active = true, crop, className }: { active?: boolean; crop?: Crop; className?: string }) => (
  <DemoShell w={1200} h={720} url="docs.askly.example/knowledge-base" label="Sample document assistant: a question is answered from a policy PDF with a page citation, the PDF scrolls to the cited paragraph, and a second answer shows a small table and chart." crop={crop} bare={!!crop} className={className}>
    {({ root }) => <Inner root={root} active={active} />}
  </DemoShell>
);
