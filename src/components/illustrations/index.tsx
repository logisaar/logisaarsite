// src/components/illustrations/index.tsx
// 9 unique SVG illustration components for LogiSaar service pages

const PURPLE = "#6C63FF";
const TEAL = "#00D4AA";
const DARK = "#1A1A2E";
const WHITE = "#F8F9FF";

const animStyles = `
  @keyframes ls-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes ls-float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes ls-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes ls-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ls-dash { 0%{stroke-dashoffset:100} 100%{stroke-dashoffset:0} }
  @keyframes ls-rise { 0%{height:0} 100%{height:var(--h)} }
  .ls-f1{animation:ls-float 3s ease-in-out infinite}
  .ls-f2{animation:ls-float2 4s ease-in-out infinite 0.5s}
  .ls-f3{animation:ls-float 3.5s ease-in-out infinite 1s}
  .ls-pulse{animation:ls-pulse 2s ease-in-out infinite}
  .ls-spin{animation:ls-spin 8s linear infinite;transform-origin:center}
  .ls-spin2{animation:ls-spin 6s linear infinite reverse;transform-origin:center}
`;

// ─────────────────────────────────────────
// 1. SCHOOL ILLUSTRATION
// ─────────────────────────────────────────
export const SchoolIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs><style>{animStyles}</style>
      <linearGradient id="bg-sc" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor={PURPLE} stopOpacity="0.07"/><stop offset="1" stopColor={TEAL} stopOpacity="0.07"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg-sc)" rx="16"/>
    {/* Building body */}
    <rect x="130" y="115" width="140" height="140" fill={DARK} rx="4"/>
    {/* Roof */}
    <polygon points="120,115 200,65 280,115" fill={PURPLE}/>
    {/* Flag */}
    <line x1="200" y1="65" x2="200" y2="45" stroke={TEAL} strokeWidth="2"/>
    <rect x="200" y="45" width="18" height="12" fill={TEAL} rx="1"/>
    {/* Windows row 1 */}
    <rect x="148" y="132" width="24" height="18" fill={PURPLE} rx="2" opacity="0.8"/>
    <rect x="188" y="132" width="24" height="18" fill={PURPLE} rx="2" opacity="0.8"/>
    <rect x="228" y="132" width="24" height="18" fill={TEAL} rx="2" opacity="0.8"/>
    {/* Windows row 2 */}
    <rect x="148" y="165" width="24" height="18" fill={TEAL} rx="2" opacity="0.7"/>
    <rect x="188" y="165" width="24" height="18" fill={PURPLE} rx="2" opacity="0.7"/>
    <rect x="228" y="165" width="24" height="18" fill={PURPLE} rx="2" opacity="0.7"/>
    {/* Door */}
    <rect x="187" y="208" width="26" height="47" fill={PURPLE} rx="2" opacity="0.9"/>
    <circle cx="209" cy="234" r="2" fill={WHITE} opacity="0.7"/>
    {/* Steps */}
    <rect x="120" y="252" width="160" height="5" fill={PURPLE} rx="2" opacity="0.25"/>
    <rect x="128" y="247" width="144" height="5" fill={PURPLE} rx="2" opacity="0.15"/>
    {/* Graduation cap — floating */}
    <g className="ls-f1" style={{transformOrigin:"60px 75px"}}>
      <rect x="36" y="72" width="48" height="7" fill={PURPLE} rx="2"/>
      <polygon points="60,52 34,72 86,72" fill={PURPLE} opacity="0.9"/>
      <circle cx="87" cy="72" r="3" fill={TEAL}/>
      <line x1="87" y1="72" x2="90" y2="86" stroke={TEAL} strokeWidth="2"/>
    </g>
    {/* Report card — floating */}
    <g className="ls-f2" style={{transformOrigin:"332px 95px"}}>
      <rect x="308" y="65" width="48" height="60" fill={WHITE} rx="5" opacity="0.95"/>
      <rect x="315" y="76" width="30" height="4" fill={PURPLE} rx="1" opacity="0.7"/>
      <rect x="315" y="86" width="22" height="3" fill={TEAL} rx="1" opacity="0.6"/>
      <rect x="315" y="95" width="26" height="3" fill={PURPLE} rx="1" opacity="0.5"/>
      <rect x="315" y="104" width="20" height="3" fill={TEAL} rx="1" opacity="0.5"/>
      <text x="318" y="118" fontSize="9" fill={PURPLE} fontWeight="bold" fontFamily="sans-serif">A+</text>
    </g>
    {/* Bar chart — bottom left */}
    <g opacity="0.85">
      <rect x="28" y="218" width="13" height="37" fill={PURPLE} rx="2" opacity="0.7"/>
      <rect x="48" y="205" width="13" height="50" fill={TEAL} rx="2" opacity="0.8"/>
      <rect x="68" y="230" width="13" height="25" fill={PURPLE} rx="2" opacity="0.6"/>
      <rect x="88" y="218" width="13" height="37" fill={TEAL} rx="2" opacity="0.7"/>
      <line x1="22" y1="255" x2="108" y2="255" stroke={PURPLE} strokeWidth="1.5" opacity="0.35"/>
    </g>
    {/* Student silhouettes */}
    <g opacity="0.55">
      <circle cx="330" cy="218" r="9" fill={PURPLE}/>
      <rect x="323" y="227" width="14" height="22" fill={PURPLE} rx="3"/>
      <circle cx="355" cy="218" r="9" fill={TEAL}/>
      <rect x="348" y="227" width="14" height="22" fill={TEAL} rx="3"/>
    </g>
    {/* Laptop pulse */}
    <g className="ls-pulse" style={{transformOrigin:"345px 185px"}}>
      <rect x="320" y="175" width="50" height="30" fill={DARK} rx="3"/>
      <rect x="323" y="178" width="44" height="24" fill={PURPLE} rx="2" opacity="0.25"/>
      <rect x="315" y="205" width="60" height="4" fill={DARK} rx="2"/>
    </g>
  </svg>
);

// ─────────────────────────────────────────
// 2. HOTEL ILLUSTRATION
// ─────────────────────────────────────────
export const HotelIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs><style>{animStyles}</style>
      <linearGradient id="bg-ht" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor={PURPLE} stopOpacity="0.06"/><stop offset="1" stopColor={TEAL} stopOpacity="0.06"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg-ht)" rx="16"/>
    {/* Hotel building */}
    <rect x="150" y="60" width="100" height="200" fill={DARK} rx="4"/>
    {/* Floors — windows grid */}
    {[0,1,2,3,4].map(row => (
      [0,1,2].map(col => (
        <rect key={`${row}-${col}`} x={162 + col*28} y={72 + row*32} width="18" height="20"
          fill={row % 2 === col % 2 ? PURPLE : TEAL} rx="2" opacity="0.7"/>
      ))
    ))}
    {/* Ground floor entrance */}
    <rect x="175" y="228" width="50" height="32" fill={PURPLE} rx="2" opacity="0.15"/>
    <rect x="188" y="228" width="24" height="32" fill={PURPLE} rx="2" opacity="0.7"/>
    <circle cx="209" cy="244" r="2" fill={WHITE} opacity="0.8"/>
    {/* Hotel sign */}
    <rect x="162" y="62" width="76" height="8" fill={TEAL} rx="2" opacity="0.8"/>
    <text x="200" y="69" fontSize="6" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">HOTEL</text>
    {/* Road */}
    <rect x="0" y="260" width="400" height="40" fill={DARK} opacity="0.08" rx="0"/>
    {/* Stars — floating */}
    <g className="ls-f1" style={{transformOrigin:"55px 85px"}}>
      {[0,1,2,3,4].map(i => (
        <text key={i} x={28 + i*18} y="88" fontSize="14" fill="#FFD700" opacity={i < 4 ? 1 : 0.3} fontFamily="sans-serif">★</text>
      ))}
      <text x="35" y="104" fontSize="8" fill={PURPLE} fontFamily="sans-serif" fontWeight="bold">4-Star Rated</text>
    </g>
    {/* Calendar — floating right */}
    <g className="ls-f2" style={{transformOrigin:"330px 100px"}}>
      <rect x="305" y="65" width="60" height="60" fill={WHITE} rx="6" opacity="0.95"/>
      <rect x="305" y="65" width="60" height="16" fill={PURPLE} rx="6" opacity="0.9"/>
      <rect x="305" y="73" width="60" height="8" fill={PURPLE} opacity="0.9"/>
      <text x="335" y="76" fontSize="7" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">APRIL</text>
      {[0,1,2,3,4,5,6].map(d => (
        <text key={d} x={310 + (d%7)*8} y={84 + Math.floor(d)*8} fontSize="6" fill={DARK} fontFamily="sans-serif" opacity="0.6">{d+1}</text>
      ))}
      {[7,8,9,10,11,12,13].map(d => (
        <text key={d} x={310 + (d%7)*7} y={93} fontSize="6" fill={d===9?PURPLE:DARK} fontFamily="sans-serif" opacity="0.7" fontWeight={d===9?"bold":"normal"}>{d+1}</text>
      ))}
      <rect x="320" y="100" width="16" height="16" fill={PURPLE} rx="3" opacity="0.8"/>
      <text x="328" y="111" fontSize="8" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">10</text>
    </g>
    {/* Bed icon — bottom left */}
    <g className="ls-f3" style={{transformOrigin:"60px 200px"}}>
      <rect x="28" y="204" width="65" height="40" fill={WHITE} rx="4" opacity="0.9"/>
      <rect x="28" y="204" width="65" height="14" fill={PURPLE} rx="4" opacity="0.5"/>
      <rect x="33" y="207" width="15" height="10" fill={WHITE} rx="2" opacity="0.9"/>
      <rect x="52" y="207" width="15" height="10" fill={WHITE} rx="2" opacity="0.9"/>
      <rect x="28" y="240" width="8" height="10" fill={DARK} opacity="0.3" rx="1"/>
      <rect x="85" y="240" width="8" height="10" fill={DARK} opacity="0.3" rx="1"/>
    </g>
    {/* Key card — bottom right */}
    <g className="ls-f1" style={{transformOrigin:"345px 210px"}}>
      <rect x="315" y="195" width="60" height="38" fill={TEAL} rx="6" opacity="0.9"/>
      <rect x="323" y="203" width="40" height="20" fill={WHITE} rx="3" opacity="0.2"/>
      <circle cx="328" cy="213" r="5" fill={WHITE} opacity="0.7"/>
      <rect x="338" y="211" width="20" height="3" fill={WHITE} rx="1" opacity="0.6"/>
      <rect x="338" y="217" width="14" height="3" fill={WHITE} rx="1" opacity="0.4"/>
    </g>
  </svg>
);

// ─────────────────────────────────────────
// 3. AI LEAD ILLUSTRATION
// ─────────────────────────────────────────
export const AILeadIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs><style>{animStyles}</style>
      <linearGradient id="bg-al" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor={PURPLE} stopOpacity="0.07"/><stop offset="1" stopColor={TEAL} stopOpacity="0.07"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg-al)" rx="16"/>
    {/* Funnel */}
    <polygon points="150,50 250,50 224,130 176,130" fill={PURPLE} opacity="0.8"/>
    <polygon points="176,130 224,130 212,180 188,180" fill={PURPLE} opacity="0.6"/>
    <rect x="191" y="180" width="18" height="30" fill={TEAL} rx="2" opacity="0.8"/>
    {/* Leads going in (dots) */}
    <g className="ls-f1" style={{transformOrigin:"200px 50px"}}>
      <circle cx="180" cy="38" r="8" fill={TEAL} opacity="0.8"/>
      <circle cx="200" cy="32" r="8" fill={PURPLE} opacity="0.8"/>
      <circle cx="220" cy="38" r="8" fill={TEAL} opacity="0.8"/>
    </g>
    {/* Lead count labels */}
    <text x="175" y="43" fontSize="7" fill={WHITE} fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">L</text>
    <text x="200" y="37" fontSize="7" fill={WHITE} fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">L</text>
    <text x="225" y="43" fontSize="7" fill={WHITE} fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">L</text>
    {/* Robot head */}
    <g style={{transformOrigin:"70px 150px"}}>
      <rect x="44" y="120" width="52" height="48" fill={DARK} rx="8"/>
      <rect x="48" y="124" width="44" height="40" fill={PURPLE} rx="6" opacity="0.3"/>
      <circle cx="63" cy="140" r="7" fill={TEAL} opacity="0.9"/>
      <circle cx="77" cy="140" r="7" fill={TEAL} opacity="0.9"/>
      <circle cx="63" cy="140" r="3" fill={WHITE}/>
      <circle cx="77" cy="140" r="3" fill={WHITE}/>
      <rect x="57" y="153" width="26" height="5" fill={TEAL} rx="2" opacity="0.7"/>
      <rect x="44" y="134" width="6" height="12" fill={DARK} rx="2"/>
      <rect x="90" y="134" width="6" height="12" fill={DARK} rx="2"/>
      <rect x="60" y="168" width="20" height="8" fill={DARK} rx="2"/>
    </g>
    {/* Email envelopes flying out */}
    <g className="ls-f2" style={{transformOrigin:"290px 155px"}}>
      <rect x="270" y="130" width="40" height="28" fill={WHITE} rx="3" opacity="0.95"/>
      <polyline points="270,130 290,148 310,130" stroke={PURPLE} strokeWidth="1.5" fill="none"/>
    </g>
    <g className="ls-f3" style={{transformOrigin:"340px 190px"}}>
      <rect x="320" y="175" width="36" height="24" fill={WHITE} rx="3" opacity="0.9"/>
      <polyline points="320,175 338,191 356,175" stroke={TEAL} strokeWidth="1.5" fill="none"/>
    </g>
    {/* Arrows from robot to envelopes */}
    <path d="M 96 145 Q 180 145 268 145" stroke={TEAL} strokeWidth="1.5" strokeDasharray="5,4" opacity="0.5"/>
    {/* Conversion chart — bottom right */}
    <g style={{transformOrigin:"320px 240px"}}>
      <rect x="295" y="220" width="80" height="55" fill={WHITE} rx="6" opacity="0.9"/>
      <polyline points="305,260 320,250 335,242 350,235 365,225" stroke={TEAL} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="305" cy="260" r="3" fill={TEAL}/>
      <circle cx="320" cy="250" r="3" fill={TEAL}/>
      <circle cx="335" cy="242" r="3" fill={TEAL}/>
      <circle cx="350" cy="235" r="3" fill={TEAL}/>
      <circle cx="365" cy="225" r="3" fill={TEAL}/>
      <text x="340" y="268" fontSize="8" fill={PURPLE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">+38% ↑</text>
    </g>
    {/* Pipeline stages */}
    {["New","Hot","Won"].map((s, i) => (
      <g key={s}>
        <rect x={30 + i*90} y={240} width={70} height={30} fill={i===2?TEAL:PURPLE} rx="4" opacity={0.7 - i*0.1}/>
        <text x={65 + i*90} y={259} fontSize="8" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">{s}</text>
      </g>
    ))}
  </svg>
);

// ─────────────────────────────────────────
// 4. AI RECEPTIONIST ILLUSTRATION
// ─────────────────────────────────────────
export const AIReceptionistIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs><style>{animStyles}</style>
      <linearGradient id="bg-ar" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor={PURPLE} stopOpacity="0.07"/><stop offset="1" stopColor={TEAL} stopOpacity="0.07"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg-ar)" rx="16"/>
    {/* Reception desk */}
    <rect x="80" y="195" width="240" height="60" fill={DARK} rx="6" opacity="0.85"/>
    <rect x="90" y="190" width="220" height="10" fill={PURPLE} rx="3" opacity="0.7"/>
    {/* Monitor on desk */}
    <rect x="165" y="120" width="70" height="72" fill={DARK} rx="6"/>
    <rect x="169" y="124" width="62" height="62" fill={PURPLE} rx="4" opacity="0.2"/>
    {/* Robot face on monitor */}
    <rect x="172" y="128" width="56" height="54" fill="#111220" rx="4"/>
    <circle cx="186" cy="148" r="8" fill={TEAL} opacity="0.85"/>
    <circle cx="214" cy="148" r="8" fill={TEAL} opacity="0.85"/>
    <circle cx="186" cy="148" r="3.5" fill={WHITE}/>
    <circle cx="214" cy="148" r="3.5" fill={WHITE}/>
    <path d="M 181 162 Q 200 170 219 162" stroke={TEAL} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <rect x="194" y="125" width="12" height="4" fill={TEAL} rx="2" opacity="0.7"/>
    {/* Monitor stand */}
    <rect x="196" y="192" width="8" height="8" fill={DARK} rx="1"/>
    <rect x="186" y="198" width="28" height="5" fill={DARK} rx="2"/>
    {/* Speech bubbles — floating */}
    <g className="ls-f1" style={{transformOrigin:"60px 120px"}}>
      <rect x="30" y="100" width="80" height="36" fill={WHITE} rx="10" opacity="0.95"/>
      <polygon points="55,136 65,136 55,148" fill={WHITE} opacity="0.95"/>
      <text x="70" y="118" fontSize="9" fill={DARK} fontFamily="sans-serif" textAnchor="middle">Hello! How can</text>
      <text x="70" y="130" fontSize="9" fill={DARK} fontFamily="sans-serif" textAnchor="middle">I help you? 😊</text>
    </g>
    <g className="ls-f2" style={{transformOrigin:"330px 90px"}}>
      <rect x="295" y="72" width="75" height="28" fill={TEAL} rx="10" opacity="0.9"/>
      <polygon points="350,100 360,100 360,112" fill={TEAL} opacity="0.9"/>
      <text x="332" y="86" fontSize="9" fill={WHITE} fontFamily="sans-serif" textAnchor="middle">Book appt</text>
      <text x="332" y="96" fontSize="9" fill={WHITE} fontFamily="sans-serif" textAnchor="middle">for 3 PM?</text>
    </g>
    {/* 24/7 badge */}
    <g className="ls-pulse" style={{transformOrigin:"340px 185px"}}>
      <rect x="318" y="170" width="44" height="22" fill={PURPLE} rx="11"/>
      <text x="340" y="185" fontSize="10" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">24/7</text>
    </g>
    {/* Headset icon */}
    <g className="ls-f3" style={{transformOrigin:"55px 215px"}}>
      <path d="M 40 210 Q 40 193 58 193 Q 76 193 76 210" stroke={PURPLE} strokeWidth="3" fill="none"/>
      <rect x="36" y="208" width="8" height="14" fill={PURPLE} rx="3" opacity="0.8"/>
      <rect x="72" y="208" width="8" height="14" fill={PURPLE} rx="3" opacity="0.8"/>
      <path d="M 72 218 Q 78 218 78 225" stroke={PURPLE} strokeWidth="2" fill="none"/>
    </g>
    {/* Phone waves */}
    <g opacity="0.6" className="ls-pulse">
      <path d="M 332 130 Q 348 140 332 150" stroke={TEAL} strokeWidth="2" fill="none"/>
      <path d="M 325 125 Q 348 140 325 155" stroke={TEAL} strokeWidth="1.5" fill="none" opacity="0.6"/>
    </g>
    {/* Calendar icon */}
    <g style={{transformOrigin:"340px 230px"}}>
      <rect x="318" y="220" width="44" height="36" fill={WHITE} rx="5" opacity="0.9"/>
      <rect x="318" y="220" width="44" height="12" fill={PURPLE} rx="5" opacity="0.8"/>
      <rect x="318" y="228" width="44" height="4" fill={PURPLE} opacity="0.8"/>
      {[0,1,2,3,4,5].map(d => (
        <rect key={d} x={322 + (d%3)*13} y={238 + Math.floor(d/3)*10} width="8" height="6" rx="1" fill={d===2?TEAL:DARK} opacity="0.15"/>
      ))}
    </g>
  </svg>
);

// ─────────────────────────────────────────
// 5. PROPOSAL ILLUSTRATION
// ─────────────────────────────────────────
export const ProposalIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs><style>{animStyles}</style>
      <linearGradient id="bg-pr" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor={PURPLE} stopOpacity="0.07"/><stop offset="1" stopColor={TEAL} stopOpacity="0.07"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg-pr)" rx="16"/>
    {/* Main document */}
    <rect x="120" y="50" width="160" height="210" fill={WHITE} rx="8" opacity="0.97"/>
    {/* Document header */}
    <rect x="120" y="50" width="160" height="40" fill={PURPLE} rx="8"/>
    <rect x="120" y="78" width="160" height="12" fill={PURPLE}/>
    <text x="200" y="75" fontSize="10" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">PROPOSAL</text>
    {/* Logo placeholder */}
    <rect x="130" y="58" width="24" height="14" fill={WHITE} rx="3" opacity="0.9"/>
    {/* Lines of text */}
    <rect x="132" y="100" width="100" height="5" fill={DARK} rx="2" opacity="0.2"/>
    <rect x="132" y="112" width="120" height="5" fill={DARK} rx="2" opacity="0.15"/>
    <rect x="132" y="124" width="90" height="5" fill={DARK} rx="2" opacity="0.15"/>
    {/* Pricing table */}
    <rect x="132" y="140" width="136" height="60" fill={PURPLE} rx="4" opacity="0.06"/>
    <rect x="132" y="140" width="136" height="14" fill={PURPLE} rx="4" opacity="0.15"/>
    <text x="200" y="151" fontSize="8" fill={PURPLE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">PRICING</text>
    <line x1="132" y1="154" x2="268" y2="154" stroke={PURPLE} strokeWidth="0.5" opacity="0.3"/>
    {["Basic — ₹25,000", "Pro — ₹45,000", "Enterprise"].map((t, i) => (
      <g key={t}>
        <text x="146" y={165 + i*14} fontSize="7.5" fill={DARK} fontFamily="sans-serif" opacity="0.7">{t}</text>
        <text x="261" y={165 + i*14} fontSize="7.5" fill={PURPLE} fontFamily="sans-serif" textAnchor="end" opacity="0.8">✓</text>
      </g>
    ))}
    {/* Signature line */}
    <line x1="132" y1="220" x2="220" y2="220" stroke={DARK} strokeWidth="0.8" opacity="0.3"/>
    <text x="176" y="232" fontSize="7" fill={DARK} fontFamily="sans-serif" textAnchor="middle" opacity="0.5">Signature</text>
    {/* Checkmark seal — floating */}
    <g className="ls-f1" style={{transformOrigin:"310px 80px"}}>
      <circle cx="310" cy="80" r="24" fill={TEAL} opacity="0.9"/>
      <polyline points="298,80 307,90 324,70" stroke={WHITE} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    {/* Pen — floating */}
    <g className="ls-f2" style={{transformOrigin:"75px 160px"}}>
      <rect x="58" y="140" width="10" height="40" fill={PURPLE} rx="2" transform="rotate(-25,68,160)"/>
      <polygon points="58,178 68,178 63,192" fill={DARK} transform="rotate(-25,63,185)" opacity="0.8"/>
      <rect x="58" y="140" width="10" height="8" fill={TEAL} rx="2" transform="rotate(-25,68,144)"/>
    </g>
    {/* Currency symbol — floating */}
    <g className="ls-f3" style={{transformOrigin:"45px 90px"}}>
      <circle cx="45" cy="90" r="18" fill={PURPLE} opacity="0.15"/>
      <text x="45" y="96" fontSize="18" fill={PURPLE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">₹</text>
    </g>
    {/* Handshake — bottom */}
    <g opacity="0.6" style={{transformOrigin:"200px 265px"}}>
      <path d="M 155 265 Q 170 255 185 265 Q 200 255 215 265 Q 230 255 245 265" stroke={TEAL} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </g>
    {/* Email send — top right */}
    <g className="ls-pulse" style={{transformOrigin:"350px 55px"}}>
      <rect x="328" y="38" width="44" height="34" fill={WHITE} rx="5" opacity="0.95"/>
      <polyline points="328,38 350,58 372,38" stroke={PURPLE} strokeWidth="1.5" fill="none"/>
      <path d="M 372 55 L 382 47" stroke={TEAL} strokeWidth="2" strokeLinecap="round"/>
    </g>
  </svg>
);

// ─────────────────────────────────────────
// 6. QR MENU ILLUSTRATION
// ─────────────────────────────────────────
export const QRMenuIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs><style>{animStyles}</style>
      <linearGradient id="bg-qr" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor={PURPLE} stopOpacity="0.07"/><stop offset="1" stopColor={TEAL} stopOpacity="0.07"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg-qr)" rx="16"/>
    {/* Restaurant table (oval) */}
    <ellipse cx="200" cy="180" rx="130" ry="80" fill={DARK} opacity="0.08"/>
    <ellipse cx="200" cy="180" rx="120" ry="72" fill={WHITE} opacity="0.6"/>
    {/* QR Code in center */}
    <rect x="168" y="148" width="64" height="64" fill={WHITE} rx="4" opacity="0.98"/>
    <rect x="172" y="152" width="56" height="56" fill={DARK} rx="2" opacity="0.85"/>
    {/* QR code pattern */}
    {[0,1,2,3,4,5,6].map(r => (
      [0,1,2,3,4,5,6].map(c => {
        const pattern = [
          [1,1,1,0,1,1,1],[1,0,1,0,1,0,1],[1,1,1,0,1,1,1],
          [0,0,0,0,0,0,0],[1,1,1,0,1,0,0],[1,0,0,0,0,1,0],[1,1,0,0,0,1,1]
        ];
        return pattern[r][c] ? (
          <rect key={`${r}-${c}`} x={174 + c*7.5} y={154 + r*7.5} width="6" height="6" fill={WHITE} rx="0.5"/>
        ) : null;
      })
    ))}
    {/* Smartphone scanning */}
    <g className="ls-f1" style={{transformOrigin:"315px 170px"}}>
      <rect x="300" y="140" width="30" height="52" fill={DARK} rx="5"/>
      <rect x="303" y="145" width="24" height="40" fill={PURPLE} rx="3" opacity="0.25"/>
      <rect x="303" y="145" width="24" height="36" fill={TEAL} rx="2" opacity="0.1"/>
      <circle cx="315" cy="188" r="3" fill={TEAL} opacity="0.5"/>
      {/* Scan beam */}
      <line x1="234" y1="168" x2="300" y2="168" stroke={TEAL} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6"/>
    </g>
    {/* Food dish icons — floating around table */}
    <g className="ls-f2" style={{transformOrigin:"100px 165px"}}>
      <circle cx="100" cy="165" r="22" fill={WHITE} opacity="0.9"/>
      <circle cx="100" cy="165" r="16" fill={PURPLE} rx="16" opacity="0.15"/>
      <circle cx="100" cy="165" r="10" fill={PURPLE} opacity="0.2"/>
      <text x="100" y="170" fontSize="14" fontFamily="sans-serif" textAnchor="middle">🍛</text>
    </g>
    <g className="ls-f3" style={{transformOrigin:"97px 220px"}}>
      <circle cx="97" cy="220" r="19" fill={WHITE} opacity="0.85"/>
      <text x="97" y="226" fontSize="13" fontFamily="sans-serif" textAnchor="middle">🍕</text>
    </g>
    <g className="ls-f1" style={{transformOrigin:"305px 215px"}}>
      <circle cx="305" cy="215" r="19" fill={WHITE} opacity="0.85"/>
      <text x="305" y="221" fontSize="13" fontFamily="sans-serif" textAnchor="middle">🥘</text>
    </g>
    {/* Order confirmation */}
    <g className="ls-pulse" style={{transformOrigin:"200px 100px"}}>
      <rect x="162" y="82" width="76" height="36" fill={TEAL} rx="8" opacity="0.9"/>
      <text x="200" y="97" fontSize="8" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">✓ Order Placed!</text>
      <text x="200" y="110" fontSize="7" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" opacity="0.8">Table 4 — ₹320</text>
    </g>
    {/* Plate on table */}
    <circle cx="200" cy="200" r="14" fill={DARK} opacity="0.08"/>
    <circle cx="200" cy="200" r="10" fill={WHITE} opacity="0.5"/>
  </svg>
);

// ─────────────────────────────────────────
// 7. TRAVEL ILLUSTRATION
// ─────────────────────────────────────────
export const TravelIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs><style>{animStyles}</style>
      <linearGradient id="bg-tr" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor={PURPLE} stopOpacity="0.07"/><stop offset="1" stopColor={TEAL} stopOpacity="0.07"/>
      </linearGradient>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop stopColor={PURPLE} stopOpacity="0.12"/>
        <stop offset="1" stopColor={TEAL} stopOpacity="0.04"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg-tr)" rx="16"/>
    <rect x="0" y="210" width="400" height="90" fill={TEAL} rx="0" opacity="0.06"/>
    {/* Konark Sun Temple silhouette */}
    <g opacity="0.75">
      {/* Main tower */}
      <rect x="158" y="150" width="36" height="90" fill={PURPLE} rx="2"/>
      {/* Tower tiers */}
      <rect x="152" y="148" width="48" height="10" fill={PURPLE} rx="2" opacity="0.9"/>
      <rect x="156" y="138" width="40" height="10" fill={PURPLE} rx="2"/>
      <rect x="160" y="128" width="32" height="10" fill={PURPLE} rx="2"/>
      <rect x="164" y="118" width="24" height="10" fill={PURPLE} rx="2"/>
      <rect x="168" y="108" width="16" height="10" fill={PURPLE} rx="2"/>
      <polygon points="176,100 172,108 180,108" fill={PURPLE}/>
      {/* Side structure */}
      <rect x="126" y="185" width="28" height="55" fill={PURPLE} rx="2" opacity="0.8"/>
      <rect x="122" y="183" width="36" height="8" fill={PURPLE} rx="1"/>
      <rect x="202" y="185" width="28" height="55" fill={PURPLE} rx="2" opacity="0.8"/>
      <rect x="198" y="183" width="36" height="8" fill={PURPLE} rx="1"/>
      {/* Wheels */}
      <circle cx="148" cy="228" r="10" fill="none" stroke={TEAL} strokeWidth="2.5" opacity="0.8"/>
      <circle cx="148" cy="228" r="4" fill={TEAL} opacity="0.6"/>
      <circle cx="212" cy="228" r="10" fill="none" stroke={TEAL} strokeWidth="2.5" opacity="0.8"/>
      <circle cx="212" cy="228" r="4" fill={TEAL} opacity="0.6"/>
    </g>
    {/* Ground */}
    <line x1="60" y1="240" x2="340" y2="240" stroke={PURPLE} strokeWidth="1.5" opacity="0.2"/>
    {/* Airplane — animated */}
    <g className="ls-f2" style={{transformOrigin:"310px 85px"}}>
      <path d="M 290 90 L 330 80 L 290 70 Z" fill={TEAL} opacity="0.9"/>
      <path d="M 295 80 L 275 72 L 280 80 L 275 88 L 295 80 Z" fill={TEAL} opacity="0.7"/>
      <path d="M 315 82 L 308 76 L 310 80 L 308 84 Z" fill={TEAL} opacity="0.6"/>
      <path d="M 340 85 Q 380 60 370 50" stroke={TEAL} strokeWidth="1.5" strokeDasharray="4,3" fill="none" opacity="0.4"/>
    </g>
    {/* Map pins */}
    <g className="ls-f1" style={{transformOrigin:"60px 160px"}}>
      <circle cx="60" cy="152" r="12" fill={PURPLE}/>
      <circle cx="60" cy="152" r="5" fill={WHITE}/>
      <line x1="60" y1="164" x2="60" y2="174" stroke={PURPLE} strokeWidth="2.5"/>
      <circle cx="60" cy="175" r="2" fill={PURPLE} opacity="0.3"/>
    </g>
    <g className="ls-f3" style={{transformOrigin:"350px 120px"}}>
      <circle cx="350" cy="112" r="10" fill={TEAL}/>
      <circle cx="350" cy="112" r="4" fill={WHITE}/>
      <line x1="350" y1="122" x2="350" y2="130" stroke={TEAL} strokeWidth="2"/>
    </g>
    {/* Suitcase */}
    <g style={{transformOrigin:"55px 225px"}}>
      <rect x="30" y="215" width="50" height="36" fill={DARK} rx="5" opacity="0.8"/>
      <rect x="40" y="210" width="30" height="6" fill={DARK} rx="3" opacity="0.6"/>
      <rect x="30" y="230" width="50" height="4" fill={TEAL} opacity="0.7"/>
      <rect x="40" y="215" width="12" height="36" fill={WHITE} rx="1" opacity="0.04"/>
    </g>
    {/* Happy traveller */}
    <g opacity="0.65" style={{transformOrigin:"345px 220px"}}>
      <circle cx="345" cy="208" r="11" fill={TEAL}/>
      <rect x="337" y="219" width="16" height="22" fill={TEAL} rx="4"/>
      <text x="345" y="212" fontSize="10" fontFamily="sans-serif" textAnchor="middle">😊</text>
    </g>
    {/* Booking calendar tile */}
    <g className="ls-pulse" style={{transformOrigin:"340px 165px"}}>
      <rect x="318" y="148" width="44" height="40" fill={WHITE} rx="5" opacity="0.95"/>
      <rect x="318" y="148" width="44" height="12" fill={PURPLE} rx="5" opacity="0.8"/>
      <rect x="318" y="156" width="44" height="4" fill={PURPLE} opacity="0.8"/>
      <text x="340" y="158" fontSize="7" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">BOOK</text>
      <text x="340" y="175" fontSize="9" fill={TEAL} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">✓</text>
    </g>
  </svg>
);

// ─────────────────────────────────────────
// 8. AI AUTOMATION ILLUSTRATION
// ─────────────────────────────────────────
export const AIAutomationIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs><style>{animStyles}</style>
      <linearGradient id="bg-aa" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor={PURPLE} stopOpacity="0.07"/><stop offset="1" stopColor={TEAL} stopOpacity="0.07"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg-aa)" rx="16"/>
    {/* Central hub */}
    <circle cx="200" cy="150" r="30" fill={PURPLE} opacity="0.15"/>
    <circle cx="200" cy="150" r="22" fill={PURPLE} opacity="0.5"/>
    <circle cx="200" cy="150" r="14" fill={PURPLE}/>
    <text x="200" y="154" fontSize="11" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">AI</text>
    {/* Connecting lines */}
    {[
      {x:90, y:80}, {x:310, y:80}, {x:60, y:170}, {x:340, y:170},
      {x:100, y:245}, {x:300, y:245},
    ].map((pt, i) => (
      <line key={i} x1="200" y1="150" x2={pt.x} y2={pt.y}
        stroke={i%2===0?PURPLE:TEAL} strokeWidth="1.5" strokeDasharray="5,4" opacity="0.5"/>
    ))}
    {/* App nodes */}
    {/* WhatsApp-like */}
    <g className="ls-f1" style={{transformOrigin:"90px 80px"}}>
      <circle cx="90" cy="80" r="22" fill={WHITE} opacity="0.95"/>
      <circle cx="90" cy="80" r="16" fill="#25D366" opacity="0.9"/>
      <text x="90" y="85" fontSize="14" fill={WHITE} fontFamily="sans-serif" textAnchor="middle">💬</text>
    </g>
    {/* Gmail-like */}
    <g className="ls-f2" style={{transformOrigin:"310px 80px"}}>
      <circle cx="310" cy="80" r="22" fill={WHITE} opacity="0.95"/>
      <circle cx="310" cy="80" r="16" fill="#EA4335" opacity="0.9"/>
      <text x="310" y="85" fontSize="14" fill={WHITE} fontFamily="sans-serif" textAnchor="middle">✉️</text>
    </g>
    {/* CRM */}
    <g className="ls-f3" style={{transformOrigin:"60px 170px"}}>
      <circle cx="60" cy="170" r="22" fill={WHITE} opacity="0.95"/>
      <circle cx="60" cy="170" r="16" fill={PURPLE} opacity="0.85"/>
      <text x="60" y="175" fontSize="11" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">CRM</text>
    </g>
    {/* Sheets */}
    <g className="ls-f1" style={{transformOrigin:"340px 170px"}}>
      <circle cx="340" cy="170" r="22" fill={WHITE} opacity="0.95"/>
      <circle cx="340" cy="170" r="16" fill="#0F9D58" opacity="0.85"/>
      <text x="340" y="175" fontSize="14" fill={WHITE} fontFamily="sans-serif" textAnchor="middle">📊</text>
    </g>
    {/* Invoice */}
    <g className="ls-f2" style={{transformOrigin:"100px 245px"}}>
      <circle cx="100" cy="245" r="22" fill={WHITE} opacity="0.95"/>
      <circle cx="100" cy="245" r="16" fill={TEAL} opacity="0.85"/>
      <text x="100" y="250" fontSize="14" fill={WHITE} fontFamily="sans-serif" textAnchor="middle">📄</text>
    </g>
    {/* Social */}
    <g className="ls-f3" style={{transformOrigin:"300px 245px"}}>
      <circle cx="300" cy="245" r="22" fill={WHITE} opacity="0.95"/>
      <circle cx="300" cy="245" r="16" fill="#5865F2" opacity="0.85"/>
      <text x="300" y="250" fontSize="14" fill={WHITE} fontFamily="sans-serif" textAnchor="middle">📱</text>
    </g>
    {/* Gears */}
    <g className="ls-spin" style={{transformOrigin:"200px 150px"}}>
      <circle cx="200" cy="150" r="38" fill="none" stroke={TEAL} strokeWidth="1.5" strokeDasharray="6,6" opacity="0.35"/>
    </g>
    {/* Efficiency chart */}
    <g style={{transformOrigin:"200px 270px"}}>
      <rect x="168" y="270" width="12" height="18" fill={PURPLE} rx="2" opacity="0.7"/>
      <rect x="184" y="263" width="12" height="25" fill={TEAL} rx="2" opacity="0.8"/>
      <rect x="200" y="256" width="12" height="32" fill={PURPLE} rx="2" opacity="0.7"/>
      <rect x="216" y="260" width="12" height="28" fill={TEAL} rx="2" opacity="0.8"/>
    </g>
    {/* Pulsing data particles */}
    <g className="ls-pulse">
      {[[140,115],[165,130],[235,130],[260,115],[145,175],[255,175]].map(([x,y], i)=> (
        <circle key={i} cx={x} cy={y} r="3" fill={i%2===0?TEAL:PURPLE} opacity="0.7"/>
      ))}
    </g>
  </svg>
);

// ─────────────────────────────────────────
// 9. CRM ILLUSTRATION
// ─────────────────────────────────────────
export const CRMIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs><style>{animStyles}</style>
      <linearGradient id="bg-crm" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor={PURPLE} stopOpacity="0.07"/><stop offset="1" stopColor={TEAL} stopOpacity="0.07"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg-crm)" rx="16"/>
    {/* Kanban pipeline board */}
    {["New","Lead","Win"].map((stage, ci) => (
      <g key={stage}>
        <rect x={35 + ci*112} y={45} width={100} height={200} fill={ci===2?TEAL:PURPLE} rx="6" opacity={0.07 + ci*0.02}/>
        <rect x={35 + ci*112} y={45} width={100} height={20} fill={ci===2?TEAL:PURPLE} rx="6" opacity="0.25"/>
        <rect x={35 + ci*112} y={57} width={100} height={8} fill={ci===2?TEAL:PURPLE} opacity="0.25"/>
        <text x={85 + ci*112} y={58} fontSize="8" fill={ci===2?TEAL:PURPLE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">{stage}</text>
        {/* Cards in each stage */}
        {[0,1,2].map(card => (
          <g key={card}>
            <rect x={40 + ci*112} y={75 + card*55} width={90} height={46} fill={WHITE} rx="5" opacity="0.9"/>
            <rect x={40 + ci*112} y={75 + card*55} width={90} height={5} fill={ci===2?TEAL:PURPLE} rx="5" opacity="0.6"/>
            <circle cx={54 + ci*112} cy={95 + card*55} r="7" fill={ci===2?TEAL:PURPLE} opacity="0.3"/>
            <text x={54 + ci*112} y={97 + card*55} fontSize="7" fill={ci===2?TEAL:PURPLE} fontFamily="sans-serif" textAnchor="middle">A</text>
            <rect x={66 + ci*112} y={89 + card*55} width={55} height="4" fill={DARK} rx="1" opacity="0.15"/>
            <rect x={66 + ci*112} y={97 + card*55} width={40} height="4" fill={DARK} rx="1" opacity="0.1"/>
            <text x={108 + ci*112} y={115 + card*55} fontSize="8" fill={ci===2?TEAL:PURPLE} fontFamily="sans-serif" textAnchor="end">
              {ci===2 ? "₹" + (card+1)*20 + "K" : "→"}
            </text>
          </g>
        ))}
      </g>
    ))}
    {/* Revenue chart — top right */}
    <g className="ls-f1" style={{transformOrigin:"355px 110px"}}>
      <rect x="330" y="60" width="60" height="60" fill={WHITE} rx="6" opacity="0.95"/>
      <polyline points="338,105 348,95 358,88 368,80 378,72" stroke={TEAL} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="378" cy="72" r="4" fill={TEAL}/>
      <text x="360" y="114" fontSize="8" fill={TEAL} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">+42%</text>
    </g>
    {/* Team avatars */}
    <g className="ls-f2" style={{transformOrigin:"355px 195px"}}>
      {[PURPLE, TEAL, "#FF6B6B", PURPLE].map((c,i) => (
        <g key={i}>
          <circle cx={334 + i*14} cy="195" r="9" fill={c} opacity="0.8"/>
          <text x={334 + i*14} y="199" fontSize="7" fill={WHITE} fontFamily="sans-serif" textAnchor="middle">{["A","B","C","D"][i]}</text>
        </g>
      ))}
    </g>
    {/* Win rate badge */}
    <g className="ls-pulse" style={{transformOrigin:"360px 245px"}}>
      <rect x="330" y="228" width="60" height="30" fill={TEAL} rx="8" opacity="0.9"/>
      <text x="360" y="241" fontSize="9" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Win Rate</text>
      <text x="360" y="252" fontSize="10" fill={WHITE} fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">82% ↑</text>
    </g>
    {/* Email/Call icons */}
    <g opacity="0.55">
      <rect x="340" y="148" width="50" height="22" fill={WHITE} rx="4" opacity="0.95"/>
      <polyline points="340,148 365,163 390,148" stroke={PURPLE} strokeWidth="1.5" fill="none"/>
    </g>
  </svg>
);
