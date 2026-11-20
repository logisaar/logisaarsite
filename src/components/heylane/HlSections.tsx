import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Check, Pause, Play, X } from "lucide-react";
import HlPhone from "./HlPhone";
import {
  HL_BUSINESS_URL, HL_CATEGORIES, HL_COMING_SOON, HL_CUSTOMER_URL, HL_PLANS, HL_PRICE_NOTE, HL_PRICING_URL,
  HL_ROLLOUT, HL_SALON_MEN, HL_UPGRADE_NOTE,
} from "@/data/heylane";

/** External link: new tab, rel noopener, with a hidden note for screen readers. */
export const Ext = ({ href, className, children }: { href: string; className?: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

/** The official HeyLane SVG, unchanged. Its viewBox carries clear space, so the box is oversized and pulled in with negative margins. */
const HlLogo = ({ reverse, className = "" }: { reverse?: boolean; className?: string }) => (
  <img
    src={`/brand/heylane/HeyLane-Horizontal${reverse ? "-Reverse" : ""}.svg`}
    alt="HeyLane"
    width={1644}
    height={344}
    className={`block h-auto ${className}`}
  />
);

const SectionTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2 className={`text-h2 font-bold ${className}`}>{children}</h2>
);

/* 1. Hero (night band) */
export const HlHero = () => (
  <section data-logi-dock className="hl-night relative overflow-hidden pb-section-sm pt-32 md:pt-44">
    <div className="container mx-auto grid max-w-[75rem] items-center gap-12 px-gutter md:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <HlLogo reverse className="-mb-1 -mt-5 w-[min(15rem,60vw)]" />
        <span className="hl-tag">Launching in Bhubaneswar</span>
        <h1 className="text-h1 font-bold">Your city remembers you</h1>
        <p className="max-w-xl text-lead text-white/85" data-logi-avoid>
          The cafés, salons, stays and shops you keep going back to, finally treating you like a regular. Points that become member perks, opinions from people you actually know, and a direct line to every place.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Ext href={HL_CUSTOMER_URL} className="hl-btn hl-btn-gold">Get early access</Ext>
          <Ext href={HL_BUSINESS_URL} className="hl-btn hl-btn-outline-light">For businesses</Ext>
        </div>
        <p className="text-body-sm text-white/80">A Logisaar product</p>
      </div>
      <div className="hidden md:block"><HlPhone screen="place" /></div>
    </div>
  </section>
);

/* 2. Two sides, one app */
export const HlTwoSides = () => (
  <section data-logi="HeyLane is made by Logisaar too." className="bg-[var(--hl-paper)] py-section">
    <div className="container mx-auto max-w-[75rem] px-gutter">
      <SectionTitle className="mx-auto mb-12 max-w-3xl text-center">Two sides, one app</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { who: "For people", items: ["Discover places near you", "See what your contacts think first", "Chat with the place", "Collect points that turn into member passes"], href: HL_CUSTOMER_URL, cta: "Visit heylane.in", style: "hl-btn-emerald" },
          { who: "For businesses", items: ["Billing and stock in one place", "Get found locally", "Chat with your customers", "Keep your regulars coming back"], href: HL_BUSINESS_URL, cta: "Visit business.heylane.in", style: "hl-btn-outline" },
        ].map((c) => (
          <div key={c.who} className="hl-card hl-lift flex flex-col p-8">
            <h3 className="text-h2 font-bold">{c.who}</h3>
            <ul className="mt-5 flex-1 list-none space-y-3 p-0">
              {c.items.map((t) => (
                <li key={t} className="flex gap-3 text-body"><Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-[var(--hl-emerald)]" />{t}</li>
              ))}
            </ul>
            <Ext href={c.href} className={`hl-btn ${c.style} mt-8 self-start`}>{c.cta}</Ext>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* 4. Seven kinds of places */
const Photo = ({ stem, alt, className = "" }: { stem: string; alt: string; className?: string }) => (
  <picture style={{ display: "contents" }}>
    <source type="image/avif" srcSet={`/images/heylane/places/${stem}-640.avif 640w, /images/heylane/places/${stem}-1280.avif 1280w`} sizes="(min-width: 64em) 28vw, (min-width: 40em) 45vw, 92vw" />
    <source type="image/webp" srcSet={`/images/heylane/places/${stem}-640.webp 640w, /images/heylane/places/${stem}-1280.webp 1280w`} sizes="(min-width: 64em) 28vw, (min-width: 40em) 45vw, 92vw" />
    <img src={`/images/heylane/places/${stem}-640.webp`} width={640} height={427} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />
  </picture>
);

export const HlPlaces = () => (
  <section className="bg-[var(--hl-night)] py-section text-white hl-night">
    <div className="container mx-auto max-w-[75rem] px-gutter">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <SectionTitle>Seven kinds of places. One app</SectionTitle>
        <p className="mt-4 text-lead text-white/85">Your morning coffee, your barber, a weekend stay and the late-night pharmacy run.</p>
      </div>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-5 p-0">
        {HL_CATEGORIES.map((c) => (
          <li key={c.name} className="hl-zoom overflow-hidden rounded-[var(--hl-radius-card)] bg-[var(--hl-night-2)]">
            <div className="aspect-[3/2] overflow-hidden">
              {c.name === "Salons" ? (
                <div className="grid h-full grid-cols-2 grid-rows-1 gap-0.5">
                  <div className="h-full min-h-0 overflow-hidden"><Photo stem={c.photo} alt={c.alt} /></div>
                  <div className="h-full min-h-0 overflow-hidden"><Photo stem={HL_SALON_MEN.photo} alt={HL_SALON_MEN.alt} /></div>
                </div>
              ) : (
                <Photo stem={c.photo} alt={c.alt} />
              )}
            </div>
            <div className="p-5">
              <h3 className="text-h3 font-bold">{c.name}</h3>
              <p className="mt-1 text-body-sm text-white/85">{c.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* 5. Lane Vibes */
const VIBE_TABS = [
  { id: "circle", label: "Your circle", lead: "Ananya, Kunal and Priya have been here", rows: [["Ask for the window table. Quietest spot to work.", "Kunal · your contact"], ["The member pass paid for itself in a month.", "Priya · your contact"]] },
  { id: "community", label: "Community", lead: "Reviews from everyone on HeyLane", rows: [["Friendly staff and a quick order.", "Community review"], ["Good place to sit with a laptop.", "Community review"]] },
];

export const HlVibes = () => {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setTab((v) => (v + 1) % VIBE_TABS.length), 4500);
    return () => window.clearInterval(t);
  }, [reduce, paused]);

  const cur = VIBE_TABS[tab];
  return (
    <section className="bg-[var(--hl-paper)] py-section">
      <div className="container mx-auto grid max-w-[75rem] items-center gap-12 px-gutter lg:grid-cols-2">
        <div className="space-y-6">
          <SectionTitle>Strangers give stars. Friends give reasons</SectionTitle>
          <div className="hl-card p-6">
            <p className="text-label font-medium text-[var(--hl-ink-3)]">Everywhere else</p>
            <p className="mt-1 font-display text-h2 font-bold tabular-nums">4.3 ★</p>
            <p className="mt-2 text-body-sm text-[var(--hl-ink-2)]">An average from thousands of people you’ll never meet, who may not like what you like.</p>
          </div>
          <div className="hl-card border-[var(--hl-emerald)] p-6">
            <p className="text-label font-medium text-[var(--hl-emerald-deep)]">On Lane Vibes</p>
            <p className="mt-2 text-body">Ananya, Kunal and Priya have been here</p>
            <p className="mt-2 text-body-sm text-[var(--hl-ink-2)]">Nobody you know has been yet? Every community review is still there, and you can be the first in your circle.</p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="hl-card relative p-5 shadow-[0_30px_60px_-30px_rgba(11,51,40,0.35)]">
            <span className="hl-tag hl-tag-muted absolute right-4 top-4">Illustrative</span>
            <div role="tablist" aria-label="Lane Vibes preview" className="flex gap-2 pr-24">
              {VIBE_TABS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={`min-h-[2.75rem] rounded-full px-4 text-body-sm font-medium transition-colors ${tab === i ? "bg-[var(--hl-emerald)] text-white" : "bg-[var(--hl-mint)] text-[var(--hl-emerald-deep)]"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div role="tabpanel" className="mt-5 min-h-[13rem]" aria-live="polite">
              <p className="font-display text-h3 font-semibold">{cur.lead}</p>
              <ul className="m-0 mt-4 list-none space-y-3 p-0">
                {cur.rows.map(([q, who]) => (
                  <li key={q} className="rounded-xl bg-[var(--hl-paper)] p-3">
                    <p className="text-body-sm">{q}</p>
                    <p className="mt-1 text-label text-[var(--hl-ink-2)]">{who}</p>
                  </li>
                ))}
              </ul>
            </div>
            {!reduce && (
              <button type="button" onClick={() => setPaused((v) => !v)} className="mt-2 inline-flex min-h-[2.75rem] items-center gap-2 text-label font-medium text-[var(--hl-ink-2)]">
                {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
                {paused ? "Play preview" : "Pause preview"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 6. Points and member passes */
const PASSES = [
  { place: "Example Stay", kind: "Homestay · member pass", perk: "Late checkout for members", pts: "2,000 pts" },
  { place: "Example Salon", kind: "Unisex salon · member pass", perk: "Priority booking every visit", pts: "500 pts" },
  { place: "Example Café", kind: "Café · member pass", perk: "10% off eligible bills", pts: "1,000 pts" },
];

export const HlPasses = () => (
  <section data-logi="Points turn into member passes." className="bg-[var(--hl-paper)] py-section">
    <div className="container mx-auto max-w-[75rem] px-gutter">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <SectionTitle>Collect places, not just points</SectionTitle>
        <p className="mt-4 text-lead text-[var(--hl-ink-2)]">Every place runs its own programme. Your points stay there, and you decide when they become a pass.</p>
      </div>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-5 p-0">
        {PASSES.map((p) => (
          <li key={p.place} className="relative overflow-hidden rounded-[var(--hl-radius-card)] bg-[var(--hl-night)] p-6 text-white">
            <span className="hl-tag hl-tag-muted absolute right-4 top-4">Sample</span>
            <p className="font-display text-h3 font-semibold">{p.place}</p>
            <p className="text-label text-white/80">{p.kind}</p>
            <p className="mt-10 text-body font-medium">{p.perk}</p>
            <p className="mt-1 text-label tabular-nums text-white/80">{p.pts}</p>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-2xl text-center text-label text-[var(--hl-ink-2)]">
        Sample programme: 1,000 points · 12 months · 10% off eligible bills · minimum bill ₹300. Each business sets its own.
      </p>
      <ul className="m-0 mt-10 grid list-none gap-5 p-0 md:grid-cols-3">
        {[
          ["Set by the place you love", "Each business chooses the points, benefits, validity and minimum bill."],
          ["Your choice, always", "A pass starts only when you exchange your points. Nothing happens on its own."],
          ["Points are not money", "They belong to that business and are kept separate from any wallet balance."],
        ].map(([t, d]) => (
          <li key={t} className="hl-card p-6"><h3 className="text-h3 font-bold">{t}</h3><p className="mt-2 text-body-sm text-[var(--hl-ink-2)]">{d}</p></li>
        ))}
      </ul>
    </div>
  </section>
);

/* 7. HeyLane Chat for businesses */
const COMPARE: [string, boolean, boolean, string?][] = [
  ["Messages from customers", true, true],
  ["Their points and member pass", false, true],
  ["Billing and stock in the same app", false, true],
  ["How many times they’ve visited", false, true, "Lane Pro"],
  ["Member or not, right in the chat", false, true, "Lane Pro"],
];

export const HlChat = () => (
  <section data-logi="Lane Pro shows visit counts in every chat." className="bg-[var(--hl-night)] py-section text-white hl-night">
    <div className="container mx-auto grid max-w-[75rem] items-center gap-12 px-gutter lg:grid-cols-2">
      <div className="space-y-6">
        <span className="hl-tag">HeyLane Chat</span>
        <SectionTitle>Your WhatsApp Business alternative, built for regulars</SectionTitle>
        <p className="text-lead text-white/85">Customers message you from the HeyLane app. Answer questions about tables, slots and stock, and see who you’re talking to while you reply.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[24rem] border-collapse text-left text-body-sm">
            <caption className="sr-only">A regular chat app compared with HeyLane Chat</caption>
            <thead>
              <tr className="text-white/85"><th scope="col" className="py-2 pr-3 font-medium">Compare</th><th scope="col" className="py-2 pr-3 font-medium">A regular chat app</th><th scope="col" className="py-2 font-medium">HeyLane Chat</th></tr>
            </thead>
            <tbody>
              {COMPARE.map(([row, a, b, note]) => (
                <tr key={row} className="border-t border-white/15">
                  <th scope="row" className="py-3 pr-3 font-normal">{row}</th>
                  <td className="py-3 pr-3">{a ? <Check size={16} aria-label="Yes" /> : <X size={16} aria-label="No" className="text-white/60" />}</td>
                  <td className="py-3"><span className="inline-flex items-center gap-2"><Check size={16} aria-label="Yes" className="text-[var(--hl-gold)]" />{note && <span className="hl-tag">{note}</span>}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[var(--hl-radius-card)] bg-white text-[var(--hl-ink)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]" aria-hidden="true">
        <span className="hl-tag hl-tag-muted absolute right-4 top-4 z-10">Sample</span>
        <div className="grid sm:grid-cols-[0.8fr_1.2fr]">
          <ul className="m-0 hidden list-none space-y-1 border-r border-[var(--hl-line)] p-3 sm:block">
            {[["AR", "Ananya R.", "Window table for four?"], ["VK", "Vikram K.", "Do you take preorders?"], ["MS", "Meera S.", "Is parking available?"]].map(([i, n, m], k) => (
              <li key={n} className={`flex items-center gap-2 rounded-xl p-2 ${k === 0 ? "bg-[var(--hl-mint)]" : ""}`}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--hl-emerald)] text-label font-semibold text-white">{i}</span>
                <span className="min-w-0"><span className="block truncate text-body-sm font-semibold">{n}</span><span className="block truncate text-label text-[var(--hl-ink-2)]">{m}</span></span>
              </li>
            ))}
          </ul>
          <div className="p-4 pt-12">
            <div className="flex flex-wrap items-center gap-2"><span className="font-display text-h3 font-semibold">Ananya R.</span><span className="hl-tag">12 visits</span><span className="hl-tag">Member · Café pass</span></div>
            <div className="mt-4 space-y-2 text-body-sm">
              <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[var(--hl-paper)] px-3 py-2">Hi, any window table for four around 8 tonight?</p>
              <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--hl-emerald)] px-3 py-2 text-white">Yes, we’ll keep one for you till 8:15</p>
              <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[var(--hl-paper)] px-3 py-2">Perfect. Can I use my member pass?</p>
              <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--hl-emerald)] px-3 py-2 text-white">Of course, 10% off as always. See you, Ananya</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* 8. Plans */
export const HlPlans = () => (
  <section className="bg-[var(--hl-paper)] py-section">
    <div className="container mx-auto max-w-[75rem] px-gutter">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <SectionTitle>Lane Pro works out to about ₹33 a day</SectionTitle>
        <p className="mt-4 text-lead text-[var(--hl-ink-2)]">Every plan runs your counter and puts you on Lane Maps. Pick the one that matches how many regulars you want to keep.</p>
        <p className="mt-3 text-label text-[var(--hl-ink-2)]">Plans are per business, per year, plus applicable taxes.</p>
      </div>

      <ul className="m-0 grid list-none grid-cols-1 items-stretch gap-5 p-0 md:grid-cols-2 lg:grid-cols-4">
        {HL_PLANS.map((p) => (
          <li
            key={p.name}
            className={`flex flex-col rounded-[var(--hl-radius-card-lg)] p-7 ${p.pro ? "hl-night order-first lg:order-none lg:-my-4 lg:py-11 shadow-[0_30px_60px_-30px_rgba(11,51,40,0.6)]" : "hl-card"}`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-h3 font-bold">{p.name}</h3>
              {p.pro && <span className="rounded-full bg-[var(--hl-gold)] px-3 py-0.5 text-label font-semibold text-[var(--hl-night)]">Best value</span>}
            </div>
            <p className={`mt-1 text-body-sm ${p.pro ? "text-white/85" : "text-[var(--hl-ink-2)]"}`}>{p.headline}</p>
            <p className={`mt-5 font-display font-bold tabular-nums ${p.price.startsWith("₹") ? "text-h2" : "text-h3 leading-[2.6rem]"}`}>{p.price}</p>
            <p className={`text-label ${p.pro ? "text-white/85" : "text-[var(--hl-ink-2)]"}`}>{p.perDay}</p>
            {p.pro && <p className="mt-2 text-label font-medium text-[var(--hl-gold)]">Only ₹1,101 more than Growth</p>}
            {p.includes && <p className={`mt-5 text-label font-medium ${p.pro ? "text-white/85" : "text-[var(--hl-ink-2)]"}`}>{p.includes}</p>}
            <ul className={`m-0 list-none space-y-2.5 p-0 ${p.includes ? "mt-2" : "mt-5"} flex-1`}>
              {p.items.map((raw) => {
                const [t, tag] = raw.split("|");
                return (
                  <li key={raw} className="flex gap-2 text-body-sm">
                    <Check size={16} aria-hidden="true" className={`mt-0.5 shrink-0 ${p.pro ? "text-[var(--hl-gold)]" : "text-[var(--hl-emerald)]"}`} />
                    <span>{t}{tag && <em className={`ml-2 rounded-full px-2 py-0.5 text-label not-italic font-semibold ${p.pro ? "bg-[var(--hl-gold)] text-[var(--hl-night)]" : "bg-[var(--hl-mint)] text-[var(--hl-emerald-deep)]"}`}>{tag}</em>}</span>
                  </li>
                );
              })}
            </ul>
            <Ext href={HL_PRICING_URL} className={`hl-btn mt-7 ${p.pro ? "hl-btn-gold" : "hl-btn-outline"}`}>{p.cta}</Ext>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-10 max-w-3xl text-center text-body text-[var(--hl-ink-2)]">{HL_UPGRADE_NOTE}</p>
      <p className="mx-auto mt-3 max-w-3xl text-center text-label text-[var(--hl-ink-2)]">
        {HL_PRICE_NOTE}
        {/* TODO(owner): tax wording; bill limits are undecided, so nothing is said about bill counts */}
      </p>
    </div>
  </section>
);

/* 9. Coming soon (muted) */
export const HlComingSoon = () => (
  <section className="bg-[#ecece6] py-section">
    <div className="container mx-auto max-w-[75rem] px-gutter">
      <SectionTitle className="mx-auto mb-12 max-w-3xl text-center">Found your spot? Get there</SectionTitle>
      <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-3">
        {HL_COMING_SOON.map((c) => (
          <li key={c.title} className="rounded-[var(--hl-radius-card)] border border-dashed border-[var(--hl-ink-3)] bg-transparent p-6">
            <span className="hl-tag hl-tag-muted">Coming soon</span>
            <h3 className="mt-3 text-h3 font-bold">{c.title}</h3>
            <p className="mt-2 text-body-sm text-[var(--hl-ink-2)]">{c.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* 10. Made in Bhubaneswar */
export const HlRollout = () => (
  <section className="bg-[var(--hl-paper)] py-section">
    <div className="container mx-auto max-w-[56rem] px-gutter text-center">
      <SectionTitle>Made in Bhubaneswar. Starting here</SectionTitle>
      <p className="mt-4 text-lead text-[var(--hl-ink-2)]">We’re building HeyLane with the businesses of our own city first, then taking it across Odisha.</p>
      <ol className="m-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-3">
        {HL_ROLLOUT.map((r) => (
          <li key={r.when} className="hl-card p-6">
            <p className="text-label font-medium text-[var(--hl-emerald-deep)]">{r.when}</p>
            <p className="mt-1 font-display text-h3 font-bold">{r.where}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* 11. Closing band */
export const HlClosing = () => (
  <section className="hl-night py-section">
    <div className="container mx-auto max-w-[56rem] px-gutter text-center">
      <HlLogo reverse className="mx-auto -my-6 w-[min(18rem,70vw)]" />
      <h2 className="mt-6 text-h2 font-bold">Be one of the first regulars</h2>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Ext href={HL_CUSTOMER_URL} className="hl-btn hl-btn-gold">Get early access</Ext>
        <Ext href={HL_BUSINESS_URL} className="hl-btn hl-btn-outline-light">See plans for business</Ext>
      </div>
    </div>
  </section>
);
