import { Bell, Check, FileText, MessageCircle, Package, Play, Sheet, ShoppingBag, Zap } from "lucide-react";
import type { RefObject } from "react";
import { Cursor, DemoShell, Pill, relPos, useDemoLoop, type Crop } from "./DemoShell";

/** Business automation demo: a workflow canvas (own design, not any automation tool's UI). Sample data. */

const NW = 220, NH = 92;
const NODES = [
  { id: "n1", x: 40, y: 150, I: ShoppingBag, t: "New order (form)", c: "When a customer submits the order form", tag: "Trigger" },
  { id: "n2", x: 340, y: 150, I: FileText, t: "Create invoice", c: "Template: GST invoice · PDF", tag: "Action" },
  { id: "n3", x: 640, y: 150, I: MessageCircle, t: "Send on WhatsApp", c: "To: customer · invoice attached", tag: "Action" },
  { id: "n4", x: 640, y: 430, I: Sheet, t: "Add row to sheet", c: "Sheet: Orders 2026 · append", tag: "Action" },
  { id: "n5", x: 340, y: 430, I: Package, t: "Update stock", c: "Reduce count for each item", tag: "Action" },
  { id: "n6", x: 40, y: 430, I: Bell, t: "Notify owner", c: "Message: new order and total", tag: "Action" },
];
// edge i goes from NODES[i] to NODES[i+1]
const EDGES = [
  `M${40 + NW} ${150 + NH / 2} C${40 + NW + 60} ${150 + NH / 2} ${340 - 60} ${150 + NH / 2} 340 ${150 + NH / 2}`,
  `M${340 + NW} ${150 + NH / 2} C${340 + NW + 60} ${150 + NH / 2} ${640 - 60} ${150 + NH / 2} 640 ${150 + NH / 2}`,
  `M${640 + NW / 2} ${150 + NH} C${640 + NW / 2} ${150 + NH + 90} ${640 + NW / 2} ${430 - 90} ${640 + NW / 2} 430`,
  `M640 ${430 + NH / 2} C${640 - 60} ${430 + NH / 2} ${340 + NW + 60} ${430 + NH / 2} ${340 + NW} ${430 + NH / 2}`,
  `M340 ${430 + NH / 2} C${340 - 60} ${430 + NH / 2} ${40 + NW + 60} ${430 + NH / 2} ${40 + NW} ${430 + NH / 2}`,
];

const LOG_OLD = [
  ["10:41:07", "Run #127 · Success", "1.9s"], ["10:41:07", "Notify owner", "0.2s"], ["10:41:06", "Update stock", "0.3s"], ["10:41:06", "Add row to sheet", "0.5s"],
  ["10:41:05", "Send on WhatsApp", "0.6s"], ["10:41:05", "Create invoice", "0.4s"], ["10:41:05", "New order (form)", "0.1s"], ["09:58:22", "Run #126 · Success", "2.2s"], ["09:58:21", "Notify owner", "0.2s"],
];
const LOG_NEW = [
  ["10:52:13", "New order (form)", "0.1s"], ["10:52:13", "Create invoice", "0.4s"], ["10:52:14", "Send on WhatsApp", "0.6s"],
  ["10:52:14", "Add row to sheet", "0.5s"], ["10:52:15", "Update stock", "0.3s"], ["10:52:15", "Notify owner", "0.2s"],
];
const LOG_H = 38;

const Inner = ({ root, active }: { root: RefObject<HTMLDivElement>; active: boolean }) => {
  useDemoLoop(root, {
    active,
    repeatDelay: 2.4,
    build: (tl, el, q) => {
      const nodes = NODES.map((n) => q(`[data-n=${n.id}]`));
      const checks = NODES.map((n) => q(`[data-ck=${n.id}]`));
      const edges = EDGES.map((_, i) => el.querySelector<SVGPathElement>(`[data-e="${i}"]`)!);
      const packet = el.querySelector<SVGCircleElement>("[data-packet]")!;
      const list = q("[data-log]");
      const bannerOld = q("[data-banner-old]"), bannerNew = q("[data-banner-new]");
      const cur = q("[data-cursor]");
      const runBtn = q("[data-run]");
      const park = { x: 560, y: 640 };

      tl.set(nodes, { boxShadow: "0 0 0 0 rgba(0,209,98,0)", borderColor: "#e2e8f0" }, 0).set(checks, { scale: 0, opacity: 0 }, 0)
        .set(packet, { opacity: 0 }, 0).set(list, { y: -LOG_H * LOG_NEW.length }, 0).set(bannerNew, { opacity: 0, y: 8 }, 0).set(bannerOld, { opacity: 1 }, 0)
        .set(edges, { stroke: "#cbd5e1" }, 0).set(cur, park, 0);

      const rp = () => relPos(el, runBtn, 0.5, 0.5);
      tl.to(cur, { x: () => rp().x, y: () => rp().y, duration: 0.9, ease: "power3.inOut" }, 0.5)
        .to(cur, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 }, 1.45)
        .to(bannerOld, { opacity: 0, duration: 0.2 }, 1.55);

      const STEP = 1.1;
      const t = 1.7;
      nodes.forEach((n, i) => {
        const at = t + i * STEP;
        tl.to(n, { borderColor: "#00A152", boxShadow: "0 0 0 4px rgba(0,209,98,0.18)", duration: 0.3 }, at)
          .to(checks[i], { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.4)" }, at + 0.25)
          .to(list, { y: -LOG_H * (LOG_NEW.length - 1 - i), duration: 0.45 }, at + 0.25);
        if (i < edges.length) {
          tl.set(packet, { opacity: 1 }, at + 0.35)
            .to(packet, { motionPath: { path: edges[i], align: edges[i], alignOrigin: [0.5, 0.5], autoRotate: false }, duration: STEP - 0.35, ease: "power1.inOut" }, at + 0.35)
            .to(edges[i], { stroke: "#00A152", duration: 0.3 }, at + 0.35)
            .set(packet, { opacity: 0 }, at + STEP);
        }
      });
      const end = t + NODES.length * STEP + 0.2;
      tl.to(bannerNew, { opacity: 1, y: 0, duration: 0.6 }, end)
        .to(cur, { x: park.x, y: park.y, duration: 0.9, ease: "power3.inOut" }, end);
    },
  });

  return (
    <div className="flex h-full bg-slate-50 text-[0.8125rem]">
      <div className="relative min-w-0 flex-1 overflow-hidden" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)", backgroundSize: "22px 22px" }}>
        <header className="absolute inset-x-0 top-0 z-10 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/95 px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00D162] text-[#04130B]"><Zap size={16} /></span>
          <div><p className="font-semibold text-slate-900">Order to invoice</p><p className="text-[0.6875rem] text-slate-500">Workflow · 6 steps · Active</p></div>
          <Pill tone="green" className="ml-2">Active</Pill>
          <span data-run className="ml-auto flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 font-semibold text-white"><Play size={13} />Run now</span>
        </header>

        <svg className="absolute inset-0" width="900" height="720" viewBox="0 0 900 720" aria-hidden="true">
          {EDGES.map((d, i) => <path key={i} data-e={i} d={d} fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />)}
          <circle data-packet r="7" fill="#00D162" stroke="#fff" strokeWidth="2.5" />
        </svg>

        {NODES.map((n) => (
          <div key={n.id} data-n={n.id} className="absolute rounded-xl border-2 bg-white p-3.5 shadow-sm" style={{ left: n.x, top: n.y, width: NW, height: NH, borderColor: "#e2e8f0" }}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><n.I size={16} /></span>
              <div className="min-w-0"><p className="truncate font-semibold text-slate-900">{n.t}</p><p className="text-[0.625rem] font-semibold uppercase tracking-wide text-slate-400">{n.tag}</p></div>
            </div>
            <p className="mt-2 truncate text-[0.6875rem] text-slate-500">{n.c}</p>
            <i data-ck={n.id} className="absolute -right-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#00A152] text-white ring-2 ring-white"><Check size={13} strokeWidth={3} /></i>
          </div>
        ))}

        <div className="absolute bottom-6 left-6 right-6 h-12">
          <div data-banner-old className="absolute inset-0 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-slate-600"><Check size={15} className="text-emerald-600" />Last run #127 · 1.9s · Success</div>
          <div data-banner-new className="absolute inset-0 flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 font-semibold text-emerald-900"><Check size={15} className="text-emerald-700" />Run #128 · 2.1s · Success</div>
        </div>
      </div>

      <aside className="flex w-[18.75rem] shrink-0 flex-col border-l border-slate-200 bg-white">
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4"><span className="font-semibold text-slate-900">Run log</span><span className="text-[0.6875rem] text-slate-500">Today</span></div>
        <div className="flex-1 overflow-hidden" style={{ maxHeight: `${LOG_H * 12}px` }}>
          <div data-log>
            {[...LOG_NEW, ...LOG_OLD].map((r, i) => (
              <div key={i} className="flex items-center gap-2.5 border-b border-slate-100 px-4" style={{ height: LOG_H }}>
                <Check size={13} className="shrink-0 text-emerald-600" />
                <span className="min-w-0 flex-1 truncate text-slate-800">{r[1]}</span>
                <span className="text-[0.6875rem] tabular-nums text-slate-400">{r[0]}</span>
                <span className="w-9 text-right text-[0.6875rem] tabular-nums text-slate-500">{r[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
      <Cursor x={560} y={640} />
    </div>
  );
};

export const WorkflowDemo = ({ active = true, crop, className }: { active?: boolean; crop?: Crop; className?: string }) => (
  <DemoShell w={1200} h={720} url="flows.example.com/order-to-invoice" label="Sample workflow canvas: a new order triggers an invoice, a WhatsApp message, a sheet row, a stock update and an owner alert, and the run log shows each step succeed." crop={crop} bare={!!crop} className={className}>
    {({ root }) => <Inner root={root} active={active} />}
  </DemoShell>
);
