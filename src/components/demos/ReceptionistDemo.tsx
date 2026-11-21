import { Bot, CalendarDays, Globe, MessageCircle, Phone, Search, Bell, Check, Mic, Clock } from "lucide-react";
import type { RefObject } from "react";
import { Avatar, Cursor, DemoShell, Pill, relPos, streamInto, typeInto, useDemoLoop, type Crop } from "./DemoShell";

/** AI agent demo: an AI receptionist inbox. Business, names and slots are sample data. Not any messaging app's UI. */

const CONVOS = [
  { n: "Ananya Patra", m: "Can I book a check-up for Friday?", t: "now", ch: "wa", unread: true, on: true },
  { n: "Rahul Mohanty", m: "Voice call · 2 min", t: "4m", ch: "ph", unread: true },
  { n: "Sneha Behera", m: "What are your clinic timings?", t: "12m", ch: "web" },
  { n: "Biswajit Rout", m: "Thanks, see you then", t: "31m", ch: "wa" },
  { n: "Meera Das", m: "Booked · Thu 10:00 am", t: "1h", ch: "web" },
  { n: "Prasant Sahu", m: "Can I get the report by email?", t: "2h", ch: "wa" },
  { n: "Lopa Nayak", m: "Voice call · 1 min", t: "3h", ch: "ph" },
];
const CH = { wa: MessageCircle, ph: Phone, web: Globe } as const;

const Bubble = ({ me, children, ...p }: { me?: boolean; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
  <div {...p} className={`flex ${me ? "justify-end" : "justify-start"} ${p.className ?? ""}`}>
    <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 ${me ? "rounded-br-sm bg-emerald-600 text-white" : "rounded-bl-sm bg-white text-slate-800 shadow-[0_1px_0_rgba(15,23,42,0.08)] ring-1 ring-slate-200"}`}>{children}</div>
  </div>
);

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["10:00", "11:30", "2:00", "4:00"];
const TAKEN = new Set(["0-0", "1-2", "2-1", "3-0", "3-3", "4-0", "4-1"]);

const Inner = ({ root, active }: { root: RefObject<HTMLDivElement>; active: boolean }) => {
  useDemoLoop(root, {
    active,
    repeatDelay: 2.6,
    build: (tl, el, q) => {
      const cur = q("[data-cursor]");
      const m1 = q("[data-m1]"), m1t = q("[data-m1t]");
      const typing = q("[data-typing]");
      const m2 = q("[data-m2]"), m2t = q("[data-m2t]");
      const m3 = q("[data-m3]"), m3t = q("[data-m3t]");
      const m4 = q("[data-m4]"), m4t = q("[data-m4t]");
      const slotFill = q("[data-slot-fill]"), bookedCard = q("[data-booked]");
      const threadA = q("[data-thread-a]"), threadB = q("[data-thread-b]");
      const rowB = q("[data-row-b]"), rowA = q("[data-row-a]");
      const bars = Array.from(el.querySelectorAll<HTMLElement>("[data-bar]"));
      const lines = ["[data-t1]", "[data-t2]", "[data-t3]"].map((s) => q(s));
      const summary = q("[data-summary]");
      const sideA = q("[data-side-a]"), sideB = q("[data-side-b]");
      const park = { x: 760, y: 640 };

      const T1 = "Hi, can I book a check-up for Friday?";
      const T2 = "Of course. I have Fri 11:30 am or Fri 4:00 pm. Which suits you?";
      const T3 = "4:00 pm please";
      const T4 = "Done. You are booked for Fri 4:00 pm. I will send a reminder the day before.";
      const L = [
        "Caller: Hello, I need to move my appointment.",
        "AI: Sure, Rahul. You are on Friday at 4:00 pm. When works better?",
        "Caller: Monday morning, around ten thirty.",
      ];

      // keep the newest message pinned to the bottom: shift the thread up as each message arrives (transform only)
      const vh = () => threadA.parentElement!.clientHeight;
      const fy = (n: HTMLElement) => Math.min(0, vh() - (n.offsetTop + n.offsetHeight + 20));
      const hist = threadA.children[threadA.children.length - 6] as HTMLElement; // last history bubble (before m1)
      tl.set(threadA, { y: () => fy(hist) }, 0);
      tl.to(threadA, { y: () => fy(m1), duration: 0.4 }, 0.7).to(threadA, { y: () => fy(typing), duration: 0.3 }, 2.0)
        .to(threadA, { y: () => fy(m2), duration: 0.4 }, 3.2).to(threadA, { y: () => fy(m3), duration: 0.4 }, 5.7)
        .to(threadA, { y: () => fy(m4), duration: 0.4 }, 7.1);

      tl.set([m1, m2, m3, m4, typing, summary, bookedCard, slotFill, threadB, sideB], { opacity: 0 }, 0)
        .set([m1, m2, m3, m4], { y: 10 }, 0).set(bookedCard, { y: 14 }, 0).set(slotFill, { scale: 0.6 }, 0)
        .set(threadA, { opacity: 1 }, 0).set(sideA, { opacity: 1 }, 0).set(cur, park, 0)
        .set(rowA, { backgroundColor: "#ecfdf5" }, 0).set(rowB, { backgroundColor: "#ffffff" }, 0)
        .set(lines, { opacity: 0, y: 6 }, 0).set(bars, { scaleY: 0.2 }, 0);

      // A: booking chat
      tl.to(m1, { opacity: 1, y: 0, duration: 0.4 }, 0.7); typeInto(tl, m1t, T1, 0.7, 1.0);
      tl.to(typing, { opacity: 1, duration: 0.25 }, 2.0).to(typing.querySelectorAll("i"), { y: -3, duration: 0.3, repeat: 3, yoyo: true, stagger: 0.12, ease: "sine.inOut" }, 2.0)
        .to(typing, { opacity: 0, duration: 0.2 }, 3.2);
      tl.to(m2, { opacity: 1, y: 0, duration: 0.4 }, 3.2); streamInto(tl, m2t, T2, 3.2, 1.3);
      const slotBtn = () => relPos(el, q("[data-slot-pick]"), 0.5, 0.5);
      tl.to(cur, { x: () => slotBtn().x, y: () => slotBtn().y, duration: 0.8, ease: "power3.inOut" }, 4.7)
        .to(cur, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 }, 5.55)
        .to(m3, { opacity: 1, y: 0, duration: 0.4 }, 5.7); typeInto(tl, m3t, T3, 5.7, 0.5);
      tl.to(typing, { opacity: 1, duration: 0.2 }, 6.4).to(typing, { opacity: 0, duration: 0.2 }, 7.1)
        .to(m4, { opacity: 1, y: 0, duration: 0.4 }, 7.1); streamInto(tl, m4t, T4, 7.1, 1.2);
      tl.to(slotFill, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, 7.4)
        .to(bookedCard, { opacity: 1, y: 0, duration: 0.6 }, 7.6)
        .to(cur, { x: park.x, y: park.y, duration: 0.8, ease: "power3.inOut" }, 7.6);

      // B: a voice call
      const rowBPos = () => relPos(el, rowB, 0.5, 0.5);
      tl.to(cur, { x: () => rowBPos().x, y: () => rowBPos().y, duration: 0.8, ease: "power3.inOut" }, 9.3)
        .to(cur, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 }, 10.15)
        .to(threadA, { opacity: 0, duration: 0.3 }, 10.3).to(threadB, { opacity: 1, duration: 0.4 }, 10.3)
        .to(sideA, { opacity: 0, duration: 0.3 }, 10.3).to(sideB, { opacity: 1, duration: 0.4 }, 10.3)
        .to(rowA, { backgroundColor: "#ffffff", duration: 0.2 }, 10.3).to(rowB, { backgroundColor: "#ecfdf5", duration: 0.2 }, 10.3);
      bars.forEach((b, i) => tl.to(b, { scaleY: () => 0.25 + ((i * 37) % 10) / 12, duration: 0.28, repeat: 12, yoyo: true, ease: "sine.inOut" }, 10.4 + (i % 5) * 0.03));
      lines.forEach((ln, i) => tl.to(ln, { opacity: 1, y: 0, duration: 0.5 }, 10.9 + i * 1.3));
      tl.to(summary, { opacity: 1, duration: 0.5 }, 14.9)
        .to(cur, { x: park.x, y: park.y, duration: 0.8, ease: "power3.inOut" }, 10.6);
      void L;
    },
  });

  return (
    <div className="flex h-full bg-slate-50 text-[0.8125rem]">
      {/* conversations */}
      <aside className="flex w-[19rem] shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00D162] text-[#04130B]"><Bot size={17} /></span>
          <span className="text-[0.9375rem] font-bold text-slate-900">Front desk AI</span>
        </div>
        <div className="p-3"><span className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-400"><Search size={14} />Search conversations</span></div>
        <ul className="m-0 flex-1 list-none overflow-hidden p-0">
          {CONVOS.map((c, i) => {
            const I = CH[c.ch as keyof typeof CH];
            return (
              <li key={c.n} {...(i === 0 ? { "data-row-a": "" } : i === 1 ? { "data-row-b": "" } : {})} className="flex items-center gap-3 border-b border-slate-100 px-4 py-3" style={i === 0 ? { backgroundColor: "#ecfdf5" } : undefined}>
                <span className="relative"><Avatar name={c.n} tone="bg-slate-100 text-slate-600" size="h-9 w-9 text-xs" /><i className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200"><I size={9} /></i></span>
                <span className="min-w-0 flex-1"><span className="block truncate font-semibold text-slate-900">{c.n}</span><span className="block truncate text-slate-500">{c.m}</span></span>
                <span className="flex flex-col items-end gap-1 text-[0.6875rem] text-slate-400">{c.t}{c.unread && <i className="h-2 w-2 rounded-full bg-emerald-500" />}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* thread */}
      <section className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-5">
          <div><p className="font-semibold text-slate-900">Example Clinic · AI assistant</p><p className="text-[0.6875rem] text-emerald-700">Online · replies in seconds</p></div>
          <span className="ml-auto flex items-center gap-4 text-slate-500"><Bell size={17} /><Avatar name="Dr Mehta" /></span>
        </header>
        <div className="relative flex-1 overflow-hidden">
          <div data-thread-a className="absolute inset-0 flex flex-col gap-3 p-5">
            <p className="mx-auto rounded-full bg-slate-200/70 px-3 py-1 text-[0.6875rem] text-slate-600">Today · via WhatsApp</p>
            <Bubble><p>Hello! This is the assistant at Example Clinic. How can I help?</p></Bubble>
            <Bubble me><p>Hi, do you do blood tests too?</p></Bubble>
            <Bubble><p>Yes. Fasting tests are done between 8:00 and 10:00 am, no booking needed.</p></Bubble>
            <Bubble me><p>Great. Is Dr Mehta in on Friday?</p></Bubble>
            <Bubble><p>Dr Mehta sees patients on Friday from 10:00 am to 6:00 pm.</p></Bubble>
            <Bubble me><p>Okay, what are your timings on Friday?</p></Bubble>
            <Bubble><p>We are open Friday 10:00 am to 6:00 pm.</p></Bubble>
            <Bubble data-m1 me><p data-m1t>Hi, can I book a check-up for Friday?</p></Bubble>
            <div data-typing className="flex"><span className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3.5 ring-1 ring-slate-200"><i className="block h-2 w-2 rounded-full bg-slate-400" /><i className="block h-2 w-2 rounded-full bg-slate-400" /><i className="block h-2 w-2 rounded-full bg-slate-400" /></span></div>
            <Bubble data-m2>
              <p data-m2t>Of course. I have Fri 11:30 am or Fri 4:00 pm. Which suits you?</p>
              <span className="mt-2 flex gap-2"><span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">Fri 11:30 am</span><span data-slot-pick className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">Fri 4:00 pm</span></span>
            </Bubble>
            <Bubble data-m3 me><p data-m3t>4:00 pm please</p></Bubble>
            <Bubble data-m4><p data-m4t>Done. You are booked for Fri 4:00 pm. I will send a reminder the day before.</p></Bubble>
          </div>

          <div data-thread-b className="absolute inset-0 flex flex-col gap-4 p-5">
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white"><Mic size={19} /></span>
              <div><p className="font-semibold text-slate-900">Rahul Mohanty · Voice call</p><p className="text-slate-500">02:14 · AI handled</p></div>
              <span className="ml-auto flex h-10 items-center gap-[3px]">{Array.from({ length: 34 }, (_, i) => <i key={i} data-bar className="block w-[3px] origin-center rounded-full bg-emerald-500" style={{ height: "100%" }} />)}</span>
            </div>
            <div className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">Live transcript</p>
              <p data-t1 className="text-slate-700">Caller: Hello, I need to move my appointment.</p>
              <p data-t2 className="text-slate-700">AI: Sure, Rahul. You are on Friday at 4:00 pm. When works better?</p>
              <p data-t3 className="text-slate-700">Caller: Monday morning, around ten thirty.</p>
            </div>
            <div data-summary className="flex items-center gap-2 self-start rounded-full bg-emerald-50 px-4 py-2 font-semibold text-emerald-800 ring-1 ring-emerald-200"><Check size={14} />Summary: rescheduled to Mon 10:30 am</div>
          </div>
        </div>
      </section>

      {/* side panel */}
      <aside className="relative w-[19rem] shrink-0 border-l border-slate-200 bg-white">
        <div data-side-a className="absolute inset-0 space-y-4 p-4">
          <div className="flex items-center gap-3"><Avatar name="Ananya Patra" size="h-11 w-11 text-sm" /><div><p className="font-semibold text-slate-900">Ananya Patra</p><p className="text-slate-500">+91 98•••• 4821 · WhatsApp</p></div></div>
          <Pill tone="green"><Bot size={11} className="mr-1" />AI handled</Pill>
          <div className="rounded-xl border border-slate-200 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500"><CalendarDays size={12} />This week</p>
            <div className="grid grid-cols-[2.5rem_repeat(5,1fr)] gap-1 text-center text-[0.6875rem] text-slate-500">
              <span />{DAYS.map((d) => <span key={d} className="font-semibold">{d}</span>)}
              {SLOTS.map((s, r) => (
                <div key={s} className="contents">
                  <span className="text-right leading-6">{s}</span>
                  {DAYS.map((d, c) => (
                    <span key={d + s} className={`relative h-6 rounded ${TAKEN.has(`${c}-${r}`) ? "bg-slate-200" : "bg-emerald-50 ring-1 ring-inset ring-emerald-100"}`}>
                      {c === 4 && r === 3 && <i data-slot-fill className="absolute inset-0 flex items-center justify-center rounded bg-emerald-600 text-white"><Check size={11} /></i>}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[5.5rem]">
            <div className="absolute inset-0 rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-[0.6875rem] text-slate-500">Last booking</p><p className="font-semibold text-slate-900">Thu 10:00 am</p><p className="text-slate-500">Dental check-up · Meera Das</p></div>
            <div data-booked className="absolute inset-0 rounded-xl border border-emerald-300 bg-emerald-50 p-3"><p className="flex items-center gap-1 text-[0.6875rem] font-semibold text-emerald-800"><Clock size={11} />Booked</p><p className="font-bold text-slate-900">Booked · Fri 4:00 pm</p><p className="text-slate-600">Check-up · Ananya Patra</p></div>
          </div>
        </div>
        <div data-side-b className="absolute inset-0 space-y-4 p-4">
          <div className="flex items-center gap-3"><Avatar name="Rahul Mohanty" size="h-11 w-11 text-sm" /><div><p className="font-semibold text-slate-900">Rahul Mohanty</p><p className="text-slate-500">+91 94•••• 7710 · Phone</p></div></div>
          <Pill tone="green"><Bot size={11} className="mr-1" />AI handled</Pill>
          <div className="rounded-xl border border-slate-200 p-3 text-slate-700">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500">Call details</p>
            <dl className="mt-2 space-y-1.5"><div className="flex justify-between"><dt className="text-slate-500">Duration</dt><dd>2 min 14 s</dd></div><div className="flex justify-between"><dt className="text-slate-500">Intent</dt><dd>Reschedule</dd></div><div className="flex justify-between"><dt className="text-slate-500">Language</dt><dd>English</dd></div></dl>
          </div>
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3"><p className="text-[0.6875rem] font-semibold text-emerald-800">New time</p><p className="font-bold text-slate-900">Mon 10:30 am</p></div>
        </div>
      </aside>
      <Cursor x={760} y={640} />
    </div>
  );
};

export const ReceptionistDemo = ({ active = true, crop, className }: { active?: boolean; crop?: Crop; className?: string }) => (
  <DemoShell w={1200} h={720} url="inbox.frontdesk.example/conversations" label="Sample AI receptionist inbox: a customer asks to book, the AI offers two slots and books one, then a phone call is transcribed and summarised." crop={crop} bare={!!crop} className={className}>
    {({ root }) => <Inner root={root} active={active} />}
  </DemoShell>
);
