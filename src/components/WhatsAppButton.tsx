import { useEffect, useState } from "react";

const WA_LINK =
  "https://wa.me/918596072510?text=Hi%20LogiSaar%2C%20I%20want%20to%20discuss%20a%20project";

const WhatsAppButton = () => {
  // Hidden on phones (the footer and Logi's chat carry WhatsApp links) and whenever the footer is in view
  // (the footer has its own WhatsApp button).
  const [footerIn, setFooterIn] = useState(false);
  useEffect(() => {
    const f = document.querySelector("footer");
    const io = f ? new IntersectionObserver(([e]) => setFooterIn(e.isIntersecting), { threshold: 0 }) : null;
    if (f && io) io.observe(f);
    return () => io?.disconnect();
  }, []);

  if (footerIn) return null;
  return (
    <div
      className="fixed bottom-[4.5rem] z-logi group max-md:hidden"
      style={{ left: "max(0.75rem, calc((100vw - 75rem) / 2 - 3.5rem))" }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-green-500 animate-ripple-1 motion-reduce:hidden" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-green-500 animate-ripple-2 motion-reduce:hidden" />
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-green-500 shadow-lg transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M16 3C8.82 3 3 8.82 3 16c0 2.38.63 4.67 1.83 6.68L3 29l6.52-1.79A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.5a10.46 10.46 0 0 1-5.33-1.46l-.38-.23-3.87 1.06 1.03-3.78-.25-.4A10.46 10.46 0 0 1 5.5 16C5.5 10.2 10.2 5.5 16 5.5S26.5 10.2 26.5 16 21.8 26.5 16 26.5zm5.74-7.84c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.7.16-.21.31-.8 1.02-.98 1.23-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.54-.92-.82-1.55-1.84-1.73-2.15-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.7-.96-2.33-.25-.61-.51-.53-.7-.54h-.6c-.21 0-.54.08-.82.39-.29.31-1.09 1.06-1.09 2.59s1.12 3.01 1.27 3.21c.16.21 2.2 3.37 5.34 4.72.75.32 1.33.51 1.78.66.75.24 1.43.2 1.97.12.6-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
