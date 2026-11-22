import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { CONTACT } from "@/lib/contact";
import { OFFICE_HOURS } from "@/data/company";
import { loop, prefersReducedMotion } from "@/lib/scroll";
import "./footer.css";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ clocks */

const IST = "Asia/Kolkata";

/** "9:42 pm" in the given zone (visitor's own zone when omitted). */
const fmt = (tz?: string) =>
  new Date()
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz })
    .replace(/\s?(AM|PM)$/i, (m) => ` ${m.trim().toLowerCase()}`);

/** Offset of a zone in minutes right now, to tell whether the visitor is already on IST. */
const offset = (tz: string) => {
  const d = new Date();
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" }).formatToParts(d);
  const g = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return (Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute")) - Math.floor(d.getTime() / 60000) * 60000) / 60000;
};

const isOpenNow = () => {
  if (!OFFICE_HOURS) return null;
  const ist = new Date(new Date().toLocaleString("en-US", { timeZone: IST }));
  const mins = ist.getHours() * 60 + ist.getMinutes();
  const [oh, om] = OFFICE_HOURS.open.split(":").map(Number);
  const [ch, cm] = OFFICE_HOURS.close.split(":").map(Number);
  return OFFICE_HOURS.days.includes(ist.getDay()) && mins >= oh * 60 + om && mins < ch * 60 + cm;
};

/** "It's 9:42 pm in Bhubaneswar · 9:12 am where you are", updated each minute. Nothing is sent anywhere. */
const NowStrip = () => {
  const [, tick] = useState(0);
  useEffect(() => {
    let t = 0;
    const next = () => {
      t = window.setTimeout(() => { tick((n) => n + 1); next(); }, 60000 - (Date.now() % 60000) + 50);
    };
    next();
    const onVis = () => { if (!document.hidden) tick((n) => n + 1); };
    document.addEventListener("visibilitychange", onVis);
    return () => { window.clearTimeout(t); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  let local: string | null = null;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && offset(tz) !== offset(IST)) local = fmt(tz);
  } catch {
    /* no time zone support: the IST clock alone */
  }
  const open = isOpenNow();

  return (
    <p data-ft-now className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-body-sm text-background/70">
      <span>
        It&rsquo;s <strong data-ft-ist className="font-semibold text-background">{fmt(IST)}</strong> in Bhubaneswar
      </span>
      {local && (
        <span>
          <span aria-hidden="true">· </span>
          <strong className="font-semibold text-background">{local}</strong> where you are
        </span>
      )}
      {open !== null && (
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true">·</span>
          <span aria-hidden="true" className={`h-2 w-2 rounded-full ${open ? "bg-primary" : "bg-background/40"}`} />
          {open ? "We’re working now" : "We’ll reply next working day"}
        </span>
      )}
    </p>
  );
};

/* ------------------------------------------------------------------ wordmark */

const WORD = "Logisaar";

/** Display-font wordmark as a hairline outline. Each letter fills with green, left to right, once, as the footer arrives. */
const Wordmark = () => {
  const el = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!el.current || prefersReducedMotion()) return;
    const fills = el.current.querySelectorAll(".ft-letter__fill");
    const tween = gsap.to(fills, {
      clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power2.out", stagger: 0.11,
      scrollTrigger: { trigger: el.current, start: "top 80%", once: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <div
      ref={el}
      aria-hidden="true"
      data-ft-wordmark
      className="flex select-none justify-center overflow-hidden font-display font-extrabold leading-[0.95]"
      style={{ fontSize: "clamp(4rem, 14vw, 13rem)", letterSpacing: "-0.02em" }}
    >
      {WORD.split("").map((c, i) => (
        <span key={i} className="ft-letter">
          <span className="ft-letter__line">{c}</span>
          <span className="ft-letter__fill">{c}</span>
        </span>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ living background */

const TRACES = [
  "M0 120 H180 L240 180 H520 L580 120 H900 L960 60 H1200",
  "M0 300 H140 L200 360 H420 V460 H760 L820 400 H1200",
  "M1200 220 H1000 L940 280 H700 V200 H460 L400 140 H260 V40 H0",
];

/** Three traces slowly draw and fade (a 12s loop) at 5% opacity. Static and fully drawn under reduced motion. */
const Traces = () => {
  const svg = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const s = svg.current;
    if (!s || prefersReducedMotion()) return;
    const paths = Array.from(s.querySelectorAll<SVGPathElement>("path"));
    const tl = gsap.timeline({ paused: true, repeat: -1 });
    tl.to({}, { duration: 12 }, 0);
    paths.forEach((p, i) => {
      const len = p.getTotalLength();
      tl.fromTo(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 }, { strokeDashoffset: 0, duration: 4.5, ease: "power1.inOut" }, i * 3);
      tl.to(p, { opacity: 0, duration: 3, ease: "power1.in" }, i * 3 + 5.5);
    });
    const stop = loop(s, tl);
    return () => { stop(); tl.kill(); };
  }, []);
  return (
    <svg ref={svg} aria-hidden="true" data-ft-traces viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] w-full" fill="none">
      {TRACES.map((d, i) => (
        <g key={i} stroke="hsl(var(--primary))" strokeOpacity="0.05" strokeWidth="2" strokeLinejoin="round">
          <path d={d} />
        </g>
      ))}
    </svg>
  );
};

/* ------------------------------------------------------------------ top block */

const FooterLive = () => (
  <>
    <Traces />
    <div className="relative z-10 border-b border-background/10 pb-8 pt-12 sm:pt-16">
      <Wordmark />
      <div className="mt-4">
        <NowStrip />
      </div>
      {/* one line, not the big "Ready to start?" banner */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center">
        <p className="text-body text-background/85">Have a task you&rsquo;d rather not do every day?</p>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="ft-cta inline-flex min-h-[2.75rem] items-center font-semibold text-primary hover:underline focus-visible:underline">
            Start a project <span aria-hidden="true" className="ft-arrow ml-1">→</span>
          </Link>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message us on WhatsApp (opens in a new tab)"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-primary hover:text-primary"
          >
            <MessageCircle size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </>
);

export default FooterLive;
