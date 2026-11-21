/**
 * HeyLane member pass card, after the handoff spec (docs/07-pass-card-and-points.md): 343 x 216, radius 24,
 * night-green radial gradient, Konark wheel with 24 spokes as a subtle pattern, lit spokes = round(points / needed * 24)
 * from 12 o'clock clockwise. Sample data only, labelled "Sample" inside the card.
 * No rupee-to-points rate is ever shown.
 */
interface Props {
  place: string;
  kind: string; // e.g. "CAFÉ PASS"
  icon: "cafe" | "stay" | "salon";
  /** active pass, or points still building up */
  state: "active" | "progress";
  member?: string;
  points?: number;
  needed?: number;
  benefit: string;
  validity?: string;
  className?: string;
}

const spokes = (lit: number) =>
  Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
    return { x1: 268 + Math.cos(a) * 24, y1: 118 + Math.sin(a) * 24, x2: 268 + Math.cos(a) * 58, y2: 118 + Math.sin(a) * 58, on: i < lit };
  });

const PassCard = ({ place, kind, icon, state, member = "Sample member", points = 0, needed = 1000, benefit, validity, className = "" }: Props) => {
  const active = state === "active";
  const lit = active ? 24 : Math.round((points / needed) * 24);
  const id = `${place.replace(/\W/g, "")}-${state}`;
  const label = active ? `${place}: member pass active (sample)` : `${place}: ${points} of ${needed} points (sample)`;
  return (
    <svg viewBox="0 0 343 216" role="img" aria-label={label} className={`block h-auto w-full rounded-3xl ${className}`} style={{ boxShadow: active ? "0 20px 40px rgba(11,51,40,.35)" : "0 12px 28px rgba(11,51,40,.22)" }} fontFamily="inherit">
      <defs>
        <radialGradient id={`bg-${id}`} cx="85%" cy="0%" r="110%">
          {active ? (<><stop offset="0" stopColor="#145A45" /><stop offset="0.55" stopColor="#0B3328" /><stop offset="1" stopColor="#082920" /></>) : (<><stop offset="0" stopColor="#12392F" /><stop offset="0.55" stopColor="#0D2A23" /><stop offset="1" stopColor="#0A231D" /></>)}
        </radialGradient>
        <clipPath id={`clip-${id}`}><rect width="343" height="216" rx="24" /></clipPath>
      </defs>
      <g clipPath={`url(#clip-${id})`}>
        <rect width="343" height="216" fill={`url(#bg-${id})`} />
        {/* Konark wheel, a quiet pattern behind the text */}
        <g opacity={active ? 0.95 : 0.85}>
          <circle cx="268" cy="118" r="70" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1.5" />
          <circle cx="268" cy="118" r="62" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1.5" />
          {spokes(lit).map((s, i) => (
            <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={s.on ? "#F5B321" : "#fff"} strokeOpacity={s.on ? 1 : 0.14} strokeWidth="3" strokeLinecap="round" />
          ))}
          <circle cx="268" cy="118" r="20" fill="#0B3328" stroke="#F5B321" strokeOpacity={active ? 1 : 0.6} strokeWidth="2" />
          <circle cx="268" cy="118" r="5" fill="#F5B321" />
        </g>
        {/* header */}
        <circle cx="34" cy="34" r="18" fill="#0B3328" stroke={active ? "#F5B321" : "#fff"} strokeOpacity={active ? 1 : 0.3} strokeWidth="1.5" />
        <image href={`/images/heylane/app/icons/duotone-on-dark/cat-${icon}.svg`} x="22" y="22" width="24" height="24" />
        <text x="62" y="31" fill="#fff" fontSize="15" fontWeight="600">{place}</text>
        <text x="62" y="47" fill="#fff" fillOpacity="0.7" fontSize="11.5" fontWeight="600" letterSpacing="0.9">{kind}</text>
        <image href="/brand/heylane/HeyLane-Symbol-Reverse.svg" x="300" y="18" width="26" height="26" />
        {/* main */}
        {active ? (
          <>
            <text x="22" y="108" fill="#F5B321" fontSize="11.5" fontWeight="700" letterSpacing="1.8">MEMBER</text>
            <text x="22" y="134" fill="#fff" fontSize="22" fontWeight="700">{member}</text>
            <text x="22" y="153" fill="#fff" fillOpacity="0.75" fontSize="12.5">Pass active</text>
          </>
        ) : (
          <>
            <text x="22" y="100" fill="#fff" fillOpacity="0.7" fontSize="11.5" fontWeight="700" letterSpacing="1.8">BUILDING UP</text>
            <text x="22" y="140" fill="#fff" fontSize="40" fontWeight="700">{points.toLocaleString("en-IN")}</text>
            <text x="22" y="158" fill="#fff" fillOpacity="0.75" fontSize="12.5">of {needed.toLocaleString("en-IN")} points</text>
          </>
        )}
        {/* footer */}
        <line x1="22" y1="172" x2="321" y2="172" stroke="#fff" strokeOpacity="0.12" />
        <text x="22" y="190" fill="#fff" fillOpacity="0.6" fontSize="10" fontWeight="700" letterSpacing="1.4">BENEFIT</text>
        <text x="22" y="205" fill="#fff" fontSize="13" fontWeight="500">{benefit}</text>
        <text x="321" y="205" fill="#fff" fillOpacity="0.8" fontSize="12" textAnchor="end">{active ? validity : `${(needed - points).toLocaleString("en-IN")} to go`}</text>
      </g>
      <rect x="0.75" y="0.75" width="341.5" height="214.5" rx="23.25" fill="none" stroke={active ? "#E8B547" : "#fff"} strokeOpacity={active ? 1 : 0.14} strokeWidth={active ? 1.5 : 1} />
    </svg>
  );
};

export default PassCard;
