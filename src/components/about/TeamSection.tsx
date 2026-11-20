import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Award } from "lucide-react";
import chinmayPhoto from "@/assets/team/chinmay.webp";
import bpsPhoto from "@/assets/team/bps.webp";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  accentColor: string;
  photo?: string;
  bio: string;
  expertise: string[];
  linkedin: string;
  quote?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Chinmay Kumar Panda",
    role: "Managing Director & CEO",
    initials: "CKP",
    accentColor: "hsl(170, 80%, 45%)",
    photo: chinmayPhoto,
    bio: "Chinmay leads product strategy, AI engineering, and business growth at Logisaar. His work focuses on transforming complex business challenges into scalable software products and AI-powered automation systems.",
    expertise: ["AI Systems", "Product Strategy", "Full-Stack Development"],
    linkedin: "https://www.linkedin.com/in/chinmay-kumar-panda-80718525b/",
    quote: "We build native AI technology that transforms business operations from the ground up."
  },
  {
    name: "Biswanath Prasanna Satyabrata Kar",
    role: "CTO",
    initials: "BPS",
    accentColor: "hsl(210, 90%, 55%)",
    photo: bpsPhoto,
    bio: "Biswanath leads system architecture, cloud infrastructure, and engineering operations. He focuses on building reliable, scalable platforms and mentoring technical teams through IKURO.",
    expertise: ["System Architecture", "Cloud Engineering", "DevOps", "AI Operations"],
    linkedin: "https://www.linkedin.com/in/biswanath-prasanna-satyabrata-kar-79282330a/",
    quote: "Engineering systems to compile faster, deploy safer, and integrate AI seamlessly."
  }
];

const TeamMemberCard = ({
  member,
  index,
  isInView,
}: {
  member: TeamMember;
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative group rounded-3xl overflow-hidden flex flex-col md:flex-row gap-8 p-8 md:p-10"
      style={{
        background: `linear-gradient(145deg, hsl(220 25% 6%), hsl(220 25% 10%))`,
        border: "1px solid hsl(220 20% 15%)",
      }}
    >
      {/* Accent color top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[0.1875rem] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${member.accentColor}, transparent)` }}
      />

      {/* Avatar Container */}
      <div className="shrink-0 flex justify-center items-start">
        <motion.div
          className="rounded-2xl w-36 h-36 md:w-44 md:h-44 overflow-hidden border border-border/30 relative flex justify-center items-center bg-secondary"
          style={{
            boxShadow: `0 8px 30px ${member.accentColor}15`,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-display font-bold text-white">{member.initials}</span>
          )}
        </motion.div>
      </div>

      {/* Details Container */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-white group-hover:text-primary-ink transition-colors">
                {member.name}
              </h3>
              <p
                className="font-mono text-xs tracking-wider uppercase mt-1 font-semibold"
                style={{ color: member.accentColor }}
              >
                {member.role}
              </p>
            </div>
            
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/10 text-white/50 hover:text-primary-ink transition-all duration-300"
              aria-label={`${member.name} LinkedIn`}
            >
              <Linkedin size={18} />
            </a>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground mt-4">
            {member.bio}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {member.expertise.map((tag) => (
              <span
                key={tag}
                className="rounded-full border font-mono uppercase tracking-wider px-3 py-1 text-label"
                style={{
                  color: member.accentColor,
                  borderColor: `${member.accentColor}30`,
                  background: `${member.accentColor}08`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {member.quote && (
          <div
            className="pl-4 border-l-2 italic text-xs leading-relaxed text-muted-foreground/80 mt-4"
            style={{ borderColor: member.accentColor }}
          >
            "{member.quote}"
          </div>
        )}
      </div>
    </motion.div>
  );
};

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      className="py-24 relative overflow-hidden"
      ref={ref}
      style={{ background: "hsl(220 30% 4%)" }}
    >
      <div className="container mx-auto px-gutter relative z-10">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary-ink text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Award size={13} />
            <span>Foundership</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Meet the <span className="text-gradient">Founders</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-4">
            Logisaar is run by Computer Science engineers building custom enterprise AI systems and training the next generation of engineers in Odisha.
          </p>
        </motion.div>

        {/* Co-founders column/grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
