import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import { FOUNDER_TITLE, COFOUNDER_TITLE } from "@/data/company";
import chinmayPhoto from "@/assets/team/chinmay.webp";
import bpsPhoto from "@/assets/team/bps.webp";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  photo?: string;
  focus: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Chinmay Kumar Panda",
    role: FOUNDER_TITLE,
    initials: "CKP",
    photo: chinmayPhoto,
    focus: "Leads product strategy, AI engineering and business growth.",
    linkedin: "https://www.linkedin.com/in/chinmay-kumar-panda-80718525b/",
  },
  {
    name: "Biswanath Prasanna Satyabrata Kar",
    role: COFOUNDER_TITLE,
    initials: "BPS",
    photo: bpsPhoto,
    focus: "Leads system architecture, cloud infrastructure and engineering operations.",
    linkedin: "https://www.linkedin.com/in/biswanath-prasanna-satyabrata-kar-79282330a/",
  },
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section data-logi="Meet the two founders." aria-labelledby="founders-h" ref={ref} className="bg-background py-section">
      <div className="container mx-auto px-gutter">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Founders</Eyebrow>
          <h2 id="founders-h" className="mt-3 font-display text-h2-page font-bold text-foreground">
            Two Computer Science engineers from Odisha
          </h2>
          <p className="mt-4 text-body text-muted-foreground">
            Chinmay and Biswanath founded Logisaar in September 2025 to build software for businesses close to home, and to do it properly. The registered base is in Cuttack; the team works from Bhubaneswar.
          </p>
          {/* TODO(owner): add the founders' own reason for starting Logisaar, in their voice. */}
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {teamMembers.map((m, i) => (
            <motion.li
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-5 rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} width={96} height={96} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-h3 font-bold text-foreground">{m.initials}</span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-h3 font-bold text-foreground">{m.name}</h3>
                <p className="mt-1 text-body-sm font-medium text-primary-ink">{m.role}</p>
                <p className="mt-3 text-body-sm text-muted-foreground">{m.focus}</p>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-[2.75rem] items-center gap-2 text-body-sm font-medium text-foreground underline underline-offset-4 hover:text-primary-ink"
                >
                  <Linkedin size={16} aria-hidden="true" />
                  LinkedIn<span className="sr-only"> profile of {m.name}</span>
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TeamSection;
