import { useEffect, useState } from "react";
import { OFFICE_HOURS } from "@/data/company";

const IST = "Asia/Kolkata";

/** "9:42 pm" in the given zone (the visitor's own zone when omitted). Computed on the device; nothing is sent anywhere. */
const fmt = (tz?: string) =>
  new Date()
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz })
    .replace(/\s?(AM|PM)$/i, (m) => ` ${m.trim().toLowerCase()}`);

const isOpenNow = () => {
  if (!OFFICE_HOURS) return null;
  const ist = new Date(new Date().toLocaleString("en-US", { timeZone: IST }));
  const mins = ist.getHours() * 60 + ist.getMinutes();
  const [oh, om] = OFFICE_HOURS.open.split(":").map(Number);
  const [ch, cm] = OFFICE_HOURS.close.split(":").map(Number);
  return OFFICE_HOURS.days.includes(ist.getDay()) && mins >= oh * 60 + om && mins < ch * 60 + cm;
};

/** Re-renders on each minute boundary and when the tab becomes visible again. */
const useMinuteTick = () => {
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
};

/** "● It's 12:52 pm in Bhubaneswar". While OFFICE_HOURS is null the dot only means "online clock", with no status wording. */
export const IstLine = () => {
  useMinuteTick();
  const open = isOpenNow();
  return (
    <p className="ft-now">
      <span aria-hidden="true" className="ft-dot" />
      <span>
        It&rsquo;s <strong>{fmt(IST)}</strong> in Bhubaneswar
        {open !== null && <> · {open ? "We’re working now" : "We’ll reply next working day"}</>}
      </span>
    </p>
  );
};

/** "<b>9:03 am</b> where you are" in the visitor's own zone. */
export const VisitorTime = () => {
  useMinuteTick();
  return (
    <>
      <strong>{fmt()}</strong> where you are
    </>
  );
};
