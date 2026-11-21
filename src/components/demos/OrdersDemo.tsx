import { Bell, Boxes, FileText, LayoutDashboard, Package, Search, ShoppingCart, Users, BarChart3, CheckCircle2, ChevronRight } from "lucide-react";
import { Avatar, Cursor, DemoShell, Pill, Spark, relPos, useDemoLoop, type Crop } from "./DemoShell";
import type { RefObject } from "react";

/** Software development demo: an orders and billing web app. All names, amounts and numbers are sample data. */

const NAV = [
  { i: LayoutDashboard, l: "Dashboard" },
  { i: ShoppingCart, l: "Orders", on: true },
  { i: Users, l: "Customers" },
  { i: Boxes, l: "Inventory" },
  { i: FileText, l: "Invoices" },
  { i: BarChart3, l: "Reports" },
];

type Row = { id: string; c: string; items: number; amt: string; st: "Packed" | "Pending" | "Shipped" | "New"; at: string };
const ROWS: Row[] = [
  { id: "ORD-1042", c: "Kiran Textiles", items: 6, amt: "₹18,450", st: "New", at: "Just now" },
  { id: "ORD-1041", c: "Swosti Traders", items: 12, amt: "₹42,300", st: "Packed", at: "6 min ago" },
  { id: "ORD-1040", c: "Anand Stores", items: 4, amt: "₹9,780", st: "Shipped", at: "21 min ago" },
  { id: "ORD-1039", c: "Rao & Sons", items: 9, amt: "₹27,150", st: "Pending", at: "38 min ago" },
  { id: "ORD-1038", c: "Mishra Hardware", items: 3, amt: "₹6,240", st: "Packed", at: "1 hr ago" },
  { id: "ORD-1037", c: "Das Pharmacy", items: 15, amt: "₹51,900", st: "Shipped", at: "1 hr ago" },
  { id: "ORD-1036", c: "Lotus Boutique", items: 5, amt: "₹14,620", st: "Pending", at: "2 hr ago" },
  { id: "ORD-1035", c: "Sahoo Electricals", items: 8, amt: "₹33,880", st: "Packed", at: "2 hr ago" },
  { id: "ORD-1034", c: "Nayak Provisions", items: 21, amt: "₹58,410", st: "Shipped", at: "3 hr ago" },
  { id: "ORD-1033", c: "Utkal Books", items: 7, amt: "₹11,260", st: "Packed", at: "3 hr ago" },
];
const TONE = { Packed: "green", Pending: "amber", Shipped: "blue", New: "slate" } as const;
const ROW_H = 52;

const KPI = [
  { k: "ord", l: "Orders today", v: "42", pts: [3, 5, 4, 7, 6, 9, 8, 11], d: "+12%" },
  { k: "rev", l: "Revenue", v: "₹3.84L", pts: [4, 3, 6, 5, 8, 7, 10, 12], d: "+8%" },
  { k: "pen", l: "Pending", v: "9", pts: [9, 8, 9, 7, 8, 6, 7, 9], d: "" },
  { k: "pck", l: "Packed", v: "18", pts: [2, 4, 3, 6, 7, 8, 9, 11], d: "+5" },
] as const;

const Inner = ({ root, active }: { root: RefObject<HTMLDivElement>; active: boolean }) => {
  useDemoLoop(root, {
    active,
    build: (tl, el, q) => {
      const list = q("[data-list]");
      const newRow = q("[data-newrow]");
      const panel = q("[data-panel]");
      const cur = q("[data-cursor]");
      const toast = q("[data-toast]");
      const pillNew = q("[data-pill-new]");
      const pillPacked = q("[data-pill-packed]");
      const pck = q("[data-k=pck]"), pen = q("[data-k=pen]"), ord = q("[data-k=ord]");
      const btn = q("[data-btn-pack]");
      const hi = q("[data-hi]");
      const park = { x: 900, y: 560 };

      tl.set(list, { y: -ROW_H }, 0).set(panel, { xPercent: 105 }, 0).set(toast, { y: 24, opacity: 0 }, 0).set(cur, park, 0)
        .set(pillPacked, { opacity: 0 }, 0).set(pillNew, { opacity: 1 }, 0).set(hi, { opacity: 0 }, 0)
        .set(ord, { textContent: "42" }, 0).set(pck, { textContent: "18" }, 0).set(pen, { textContent: "9" }, 0);

      tl.to(list, { y: 0, duration: 0.8 }, 0.6).to(hi, { opacity: 1, duration: 0.4 }, 0.9);
      const rowPos = () => relPos(el, newRow, 0.35, 0.5);
      tl.to(cur, { x: () => rowPos().x, y: () => rowPos().y, duration: 0.9, ease: "power3.inOut" }, 1.5)
        .to(cur, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 }, 2.5)
        .to(panel, { xPercent: 0, duration: 0.7 }, 2.65);
      const btnPos = () => relPos(el, btn, 0.5, 0.5);
      tl.to(cur, { x: () => btnPos().x, y: () => btnPos().y, duration: 0.8, ease: "power3.inOut" }, 3.5)
        .to(cur, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 }, 4.4)
        .to(pillNew, { opacity: 0, duration: 0.25 }, 4.55).to(pillPacked, { opacity: 1, duration: 0.25 }, 4.55)
        .to(btn, { backgroundColor: "#e2e8f0", color: "#475569", duration: 0.2 }, 4.55)
        .to(panel, { xPercent: 105, duration: 0.6 }, 5.1)
        .to(toast, { y: 0, opacity: 1, duration: 0.6 }, 5.3)
        .to(cur, { x: park.x, y: park.y, duration: 0.9, ease: "power3.inOut" }, 5.2);
      const tick = (node: HTMLElement, from: number, to: number, at: number) => {
        const o = { v: from };
        tl.to(o, { v: to, duration: 0.5, ease: "none", onUpdate: () => { node.textContent = String(Math.round(o.v)); } }, at);
        tl.set(node, { textContent: String(to) }, at + 0.5);
      };
      tick(ord, 42, 43, 4.6); tick(pck, 18, 19, 4.6); tick(pen, 9, 8, 4.6);
    },
  });

  return (
    <div className="flex h-full bg-slate-50 text-[0.8125rem]">
      {/* sidebar */}
      <aside className="flex w-[13.75rem] shrink-0 flex-col border-r border-slate-200 bg-white p-4">
        <div className="mb-6 flex items-center gap-2 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00D162] text-[#04130B]"><Package size={17} /></span>
          <span className="text-[0.9375rem] font-bold text-slate-900">Bazaar OS</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((n) => (
            <span key={n.l} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium ${n.on ? "bg-emerald-50 text-emerald-800" : "text-slate-600"}`}>
              <n.i size={17} />{n.l}
            </span>
          ))}
        </nav>
        <div className="mt-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">Stock alert</p>
          <p className="mt-1 text-slate-700">3 items below reorder level</p>
        </div>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* top bar */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-6">
          <span className="flex h-9 w-[22rem] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-400"><Search size={15} />Search orders, customers, invoices</span>
          <span className="ml-auto flex items-center gap-4 text-slate-500">
            <span className="relative"><Bell size={18} /><i className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" /></span>
            <Avatar name="Priya Sethi" />
          </span>
        </header>

        <div className="flex-1 overflow-hidden px-6 py-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="flex items-center gap-1 text-[0.6875rem] text-slate-500">Dashboard <ChevronRight size={11} /> Orders</p>
              <h3 className="mt-1 text-[1.375rem] font-bold text-slate-900">Orders</h3>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white p-1 text-[0.75rem] font-medium text-slate-600">
              {["All", "Pending", "Packed", "Shipped"].map((t, i) => <span key={t} className={`rounded-md px-3 py-1.5 ${i === 0 ? "bg-slate-900 text-white" : ""}`}>{t}</span>)}
            </div>
          </div>

          {/* KPI strip */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            {KPI.map((k) => (
              <div key={k.k} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-[0.75rem] font-medium text-slate-500">{k.l}</p>
                <div className="mt-1 flex items-end justify-between">
                  <p data-k={k.k} className="text-[1.5rem] font-bold leading-none text-slate-900">{k.v}</p>
                  <Spark pts={[...k.pts]} />
                </div>
              </div>
            ))}
          </div>

          {/* table */}
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="grid grid-cols-[7rem_1.6fr_5rem_7rem_8rem_1fr] border-b border-slate-200 bg-slate-50 px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">
              <span>Order #</span><span>Customer</span><span>Items</span><span>Amount</span><span>Status</span><span className="text-right">Updated</span>
            </div>
            <div className="overflow-hidden" style={{ height: `${ROW_H * 9}px` }}>
              <div data-list>
                {ROWS.map((r, i) => (
                  <div key={r.id} {...(i === 0 ? { "data-newrow": "" } : {})} className="relative grid grid-cols-[7rem_1.6fr_5rem_7rem_8rem_1fr] items-center border-b border-slate-100 px-5" style={{ height: `${ROW_H}px` }}>
                    {i === 0 && <i data-hi className="absolute inset-0 bg-emerald-50/70" />}
                    <span className="relative font-medium text-slate-900">{r.id}</span>
                    <span className="relative flex items-center gap-2"><Avatar name={r.c} tone="bg-slate-100 text-slate-600" size="h-6 w-6 text-[0.625rem]" />{r.c}</span>
                    <span className="relative text-slate-600">{r.items}</span>
                    <span className="relative font-medium text-slate-900">{r.amt}</span>
                    <span className="relative">
                      {i === 0 ? (
                        <span className="relative inline-block">
                          <span data-pill-new><Pill tone="slate">New</Pill></span>
                          <span data-pill-packed className="absolute left-0 top-0"><Pill tone="green">Packed</Pill></span>
                        </span>
                      ) : <Pill tone={TONE[r.st]}>{r.st}</Pill>}
                    </span>
                    <span className="relative text-right text-slate-500">{r.at}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* slide-over */}
        <aside data-panel className="absolute inset-y-0 right-0 z-30 flex w-[24rem] flex-col border-l border-slate-200 bg-white shadow-[-12px_0_32px_-16px_rgba(15,23,42,0.25)]">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div><p className="text-[0.6875rem] text-slate-500">Order</p><p className="text-[1.0625rem] font-bold text-slate-900">ORD-1042</p></div>
            <Pill tone="slate">New</Pill>
          </div>
          <div className="space-y-4 p-5">
            <div className="flex items-center gap-3"><Avatar name="Kiran Textiles" size="h-9 w-9 text-xs" /><div><p className="font-semibold text-slate-900">Kiran Textiles</p><p className="text-slate-500">Cuttack · 3rd order this month</p></div></div>
            <div className="rounded-lg border border-slate-200">
              {[["Cotton saree set", "2", "₹7,200"], ["Dupatta, plain", "3", "₹4,050"], ["Fabric roll, 20 m", "1", "₹7,200"]].map((l) => (
                <div key={l[0]} className="flex justify-between border-b border-slate-100 px-3 py-2.5 last:border-0"><span>{l[0]} <span className="text-slate-400">× {l[1]}</span></span><span className="font-medium">{l[2]}</span></div>
              ))}
              <div className="flex justify-between bg-slate-50 px-3 py-2.5 font-bold text-slate-900"><span>Total</span><span>₹18,450</span></div>
            </div>
            <div className="flex gap-2">
              <span className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2.5 font-semibold text-slate-700"><FileText size={15} />Invoice</span>
              <span data-btn-pack className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#00D162] py-2.5 font-semibold text-[#04130B]"><Package size={15} />Mark packed</span>
            </div>
          </div>
        </aside>

        {/* toast */}
        <div data-toast className="absolute bottom-6 left-6 z-40 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-white shadow-lg">
          <CheckCircle2 size={18} className="text-[#00D162]" /><span className="font-medium">Invoice INV-1042 sent</span>
        </div>
        <Cursor />
      </div>
    </div>
  );
};

export const OrdersDemo = ({ active = true, crop, className }: { active?: boolean; crop?: Crop; className?: string }) => (
  <DemoShell w={1200} h={720} url="app.bazaaros.example/orders" label="Sample orders and billing web app: a new order arrives, is opened, marked packed, and an invoice is sent." crop={crop} bare={!!crop} className={className}>
    {({ root }) => <Inner root={root} active={active} />}
  </DemoShell>
);
