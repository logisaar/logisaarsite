import { MessageCircle, Navigation, Search } from "lucide-react";

export type HlScreen = "map" | "place" | "pass";

/**
 * Faux product UI: a phone with the three HeyLane screens used in the story.
 * Everything inside is sample data, labelled inside the frame (HeyLane rule: never a caption under the visual).
 * Purely decorative for assistive tech: the surrounding copy carries the meaning.
 */
const Tag = ({ children }: { children: string }) => (
  <span className="hl-tag hl-tag-muted absolute right-3 top-9 z-10">{children}</span>
);

const StatusBar = () => (
  <div className="flex items-center justify-between px-5 pb-1 pt-3 text-label font-semibold text-[var(--hl-ink)]">
    <span>9:41</span>
    <span className="h-1.5 w-12 rounded-full bg-[var(--hl-ink)]/80" />
    <span className="w-6" />
  </div>
);

const MapScreen = () => (
  <div className="relative flex h-full flex-col">
    <StatusBar />
    <Tag>Illustrative</Tag>
    <div className="mx-4 mt-6 flex items-center gap-2 rounded-xl border border-[var(--hl-line)] bg-white px-3 py-2 text-body-sm text-[var(--hl-ink-2)]">
      <Search size={16} aria-hidden="true" /> Near you
    </div>
    <div className="mx-4 mt-3 flex gap-2 overflow-hidden text-label">
      {["Cafés", "Salons", "Stays", "Grocery"].map((c, i) => (
        <span key={c} className={`rounded-full px-3 py-1 font-medium ${i === 0 ? "bg-[var(--hl-emerald)] text-white" : "bg-[var(--hl-mint)] text-[var(--hl-emerald-deep)]"}`}>{c}</span>
      ))}
    </div>
    <div className="relative mx-4 mt-3 flex-1 overflow-hidden rounded-2xl bg-[#e7efe8]">
      <svg viewBox="0 0 200 160" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none">
          <path d="M-10 110 C 50 90, 90 120, 210 70" />
          <path d="M40 -10 C 60 40, 50 90, 80 175" />
          <path d="M120 -10 C 130 50, 160 90, 150 175" />
        </g>
        <g stroke="#fff" strokeWidth="3" fill="none"><path d="M-10 40 L 210 30" /><path d="M-10 145 L 210 135" /></g>
      </svg>
      {[[30, 34], [62, 54], [74, 24]].map(([x, y], i) => (
        <span key={i} className="absolute grid h-6 w-6 -translate-x-1/2 -translate-y-full place-items-center rounded-full rounded-br-none bg-[var(--hl-gold)] text-[var(--hl-night)]" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-100%) rotate(45deg)" }}>
          <span className="block h-2 w-2 -rotate-45 rounded-full bg-[var(--hl-night)]" />
        </span>
      ))}
    </div>
    <div className="m-4 space-y-3 rounded-2xl border border-[var(--hl-line)] bg-white p-3">
      <p className="text-label font-medium text-[var(--hl-ink-3)]">Near you in Patia</p>
      <div className="flex items-center justify-between gap-2">
        <div><p className="font-display text-body-sm font-semibold">Example Café</p><p className="text-label text-[var(--hl-ink-2)]">Café · 650 m</p></div>
        <span className="text-label text-[var(--hl-emerald-deep)]">3 friends have been</span>
      </div>
      <div><p className="font-display text-body-sm font-semibold">Example Salon</p><p className="text-label text-[var(--hl-ink-2)]">Men’s salon · 1.2 km</p></div>
    </div>
  </div>
);

const PlaceScreen = () => (
  <div className="relative flex h-full flex-col">
    <StatusBar />
    <Tag>Sample</Tag>
    <div className="mx-4 mt-6 h-24 rounded-2xl bg-[var(--hl-mint)]" />
    <div className="mx-4 mt-3">
      <p className="font-display text-lead font-semibold">Example Café</p>
      <p className="text-label text-[var(--hl-ink-2)]">Café · Patia · Open till 11 pm</p>
    </div>
    <div className="mx-4 mt-3 rounded-2xl border border-[var(--hl-line)] bg-white p-3">
      <p className="text-label font-medium text-[var(--hl-emerald-deep)]">Lane Vibes · from your contacts</p>
      <p className="mt-1 text-body-sm">“Quiet before 10, and the filter coffee is the reason I go.”</p>
      <p className="mt-1 text-label text-[var(--hl-ink-2)]">Ananya · your contact</p>
    </div>
    <div className="mx-4 mt-3 grid grid-cols-2 gap-2 pb-4">
      <span className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--hl-emerald)] px-3 py-2.5 text-label font-semibold text-white"><MessageCircle size={14} aria-hidden="true" /> Message</span>
      <span className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[var(--hl-line)] bg-white px-3 py-2.5 text-label font-semibold"><Navigation size={14} aria-hidden="true" /> Directions</span>
    </div>
  </div>
);

const PassScreen = () => (
  <div className="relative flex h-full flex-col">
    <StatusBar />
    <Tag>Sample</Tag>
    <p className="mx-4 mt-6 font-display text-lead font-semibold">Your passes</p>
    <div className="mx-4 mt-3 overflow-hidden rounded-2xl bg-[var(--hl-night)] p-4 text-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-body-sm font-semibold">Example Café</p>
          <p className="text-label text-white/80">Member pass · 12 months</p>
        </div>
        <span className="rounded-full bg-[var(--hl-gold)] px-2.5 py-0.5 text-label font-semibold text-[var(--hl-night)]">Active</span>
      </div>
      <p className="mt-6 text-body-sm font-medium">10% off eligible bills</p>
      <p className="text-label text-white/80">Minimum bill ₹300</p>
    </div>
    <div className="mx-4 mt-3 flex items-center justify-between rounded-xl border border-[var(--hl-line)] bg-white px-3 py-2.5">
      <span className="text-label text-[var(--hl-ink-2)]">Points here</span>
      <span className="text-body-sm font-semibold tabular-nums">1,000 pts</span>
    </div>
    <p className="mx-4 mt-3 pb-4 text-label text-[var(--hl-ink-2)]">
      Sample programme. Each business sets its own points, validity, benefits and minimum bill. A pass starts only when you choose to use your points.
    </p>
  </div>
);

const SCREENS = { map: MapScreen, place: PlaceScreen, pass: PassScreen };

interface HlPhoneProps {
  screen: HlScreen;
  className?: string;
}

const HlPhone = ({ screen, className = "" }: HlPhoneProps) => {
  const Screen = SCREENS[screen];
  return (
    <div className={`mx-auto w-[min(17.5rem,78vw)] rounded-[2.75rem] bg-[var(--hl-ink)] p-2 shadow-[0_30px_60px_-30px_rgba(11,51,40,0.55)] ${className}`} aria-hidden="true">
      <div className="aspect-[9/18.5] overflow-hidden rounded-[2.25rem] bg-[var(--hl-paper)] text-[var(--hl-ink)]">
        <Screen />
      </div>
    </div>
  );
};

export default HlPhone;
