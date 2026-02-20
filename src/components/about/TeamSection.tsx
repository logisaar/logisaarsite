import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import chinmayPhoto from "@/assets/team/chinmay.jpg";
import bpsPhoto from "@/assets/team/bps.jpg";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  accentColor: string;
  photo?: string;
  bio: string;
  expertise: string[];
  quote?: string;
  achievement?: string;
}

const teamMembers: TeamMember[] = [
  { name: "Chinmay Kumar Panda", role: "Founder & CEO", initials: "CKP", accentColor: "hsl(170 80% 45%)", photo: chinmayPhoto, bio: "Building intelligent digital solutions that empower businesses to scale.", expertise: ["AI/ML", "Product Strategy", "Full-Stack"], quote: "Let's build the future — together.", achievement: "Turning Ideas into Impact Since Day One" },
  { name: "BPS Kar", role: "Co-Founder & MD", initials: "BK", accentColor: "hsl(260 70% 58%)", photo: bpsPhoto, bio: "Driving growth through strategic partnerships and operations.", expertise: ["Business Strategy", "Operations", "Growth"] },
  { name: "Dibyagyani Mohanta", role: "CTO", initials: "DM", accentColor: "hsl(210 90% 55%)", bio: "Architecting scalable systems with modern technologies.", expertise: ["System Architecture", "Cloud", "DevOps"] },
  { name: "Swayam Siddharth Sahoo", role: "CDO", initials: "SS", accentColor: "hsl(30 90% 55%)", bio: "Crafting intuitive experiences through design thinking.", expertise: ["UI/UX", "Design Systems", "Branding"] },
];

const SmokeParticle = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.span
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      background: "hsl(220 15% 60% / 0.5)",
      bottom: 0,
      left: "50%",
    }}
    initial={{ opacity: 0.8, scale: 0.5, x: 0, y: 0 }}
    animate={{ opacity: 0, scale: 2.5, x, y: 30 + Math.random() * 20 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  />
);

const RocketEmoji = () => {
  const [launched, setLaunched] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const handleLaunch = () => {
    if (launched) return;
    setLaunched(true);
    setShowSmoke(true);
    setTimeout(() => setShowSmoke(false), 1200);
  };

  return (
    <span className="relative inline-block" style={{ overflow: "visible", zIndex: 50 }}>
      {showSmoke && (
        <>
          <SmokeParticle delay={0} x={-8} size={6} />
          <SmokeParticle delay={0.05} x={5} size={8} />
          <SmokeParticle delay={0.1} x={-3} size={5} />
          <SmokeParticle delay={0.15} x={10} size={7} />
          <SmokeParticle delay={0.2} x={-6} size={4} />
          <SmokeParticle delay={0.3} x={2} size={6} />
        </>
      )}
      <motion.span
        className="cursor-pointer inline-block"
        onClick={handleLaunch}
        animate={
          launched
            ? {
                y: [0, -5, 8, -10, 5, -30, -1500],
                x: [0, 10, -8, 15, -5, 50, 300],
                rotate: [0, -15, 20, -25, 30, 360, 900],
                scale: [1, 1.1, 0.9, 1.2, 1, 1.5, 2],
                opacity: [1, 1, 1, 1, 1, 0.8, 0],
              }
            : { y: 0, x: 0, rotate: 0, scale: 1, opacity: 1 }
        }
        transition={
          launched
            ? { duration: 2, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], ease: "easeIn" }
            : { duration: 0.4 }
        }
        whileHover={!launched ? { rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } } : {}}
      >
        🚀
      </motion.span>
    </span>
  );
};

const TeamMemberCard = ({
  member,
  index,
  isInView,
}: {
  member: TeamMember;
  index: number;
  isInView: boolean;
}) => {
  // Staggered grid: first card is large, rest are smaller
  const isFeature = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group rounded-2xl ${
        isFeature ? "md:col-span-2 md:row-span-2 overflow-visible" : "overflow-hidden"
      }`}
      style={{
        background: `linear-gradient(145deg, hsl(220 25% 6%), hsl(220 25% 10%))`,
        border: "1px solid hsl(220 20% 15%)",
      }}
    >
      {/* Accent gradient top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${member.accentColor}, transparent)` }}
      />

      <div className={`relative z-10 flex flex-col h-full ${isFeature ? "p-12 md:p-16" : "p-8"}`}>
        {/* Large number watermark */}
        <span
          className={`absolute top-4 right-6 font-bold select-none pointer-events-none ${
            isFeature ? "text-[10rem]" : "text-[5rem]"
          }`}
          style={{ opacity: 0.03, color: "white", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Avatar circle with initials */}
        <motion.div
          className={`rounded-full flex items-center justify-center mb-6 font-bold tracking-wide overflow-hidden ${
            isFeature ? "w-48 h-48 text-4xl" : "w-28 h-28 text-xl"
          }`}
          style={{
            background: member.photo ? "none" : `linear-gradient(135deg, ${member.accentColor}, ${member.accentColor}88)`,
            boxShadow: `0 8px 30px ${member.accentColor}30`,
          }}
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <span style={{ color: "white" }}>{member.initials}</span>
          )}
        </motion.div>

        {/* Name - editorial oversized */}
        <h3
          className={`font-display font-bold leading-tight mb-1 ${
            isFeature ? "text-4xl md:text-5xl" : "text-xl md:text-2xl"
          }`}
          style={{ color: "white" }}
        >
          {member.name}
        </h3>

        {/* Role */}
        <p
          className={`font-mono tracking-[0.15em] uppercase ${isFeature ? "text-sm" : "text-xs"}`}
          style={{ color: member.accentColor }}
        >
          {member.role}
        </p>

        {/* Bio */}
        <p
          className={`leading-relaxed ${isFeature ? "mt-5 text-base" : "mt-3 text-xs"}`}
          style={{ color: "hsl(220 15% 55%)" }}
        >
          {member.bio}
        </p>

        {/* Expertise tags */}
        <div className={`flex flex-wrap gap-2 ${isFeature ? "mt-6" : "mt-4"}`}>
          {member.expertise.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border font-mono uppercase tracking-wider ${
                isFeature ? "px-4 py-1.5 text-[11px]" : "px-2.5 py-0.5 text-[9px]"
              }`}
              style={{
                color: member.accentColor,
                borderColor: `${member.accentColor}40`,
                background: `${member.accentColor}10`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Spacer to push bottom content down for featured card */}
        {isFeature && <div className="flex-1" />}

        {/* Quote - only for featured */}
        {isFeature && member.quote && (
          <div
            className="mt-6 pl-5 border-l-2 italic text-sm leading-relaxed"
            style={{ borderColor: member.accentColor, color: "hsl(220 15% 65%)" }}
          >
            "{member.quote}"
          </div>
        )}

        {/* Achievement badge - only for featured */}
        {isFeature && member.achievement && (
          <div
            className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider"
            style={{
              background: `${member.accentColor}15`,
              color: member.accentColor,
              border: `1px solid ${member.accentColor}30`,
            }}
          >
            <RocketEmoji /> {member.achievement}
          </div>
        )}

        {/* Decorative line */}
        <motion.div
          className="mt-6 h-px origin-left"
          style={{ background: `${member.accentColor}30` }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${member.accentColor}08, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      className="py-32 relative overflow-hidden"
      ref={ref}
      style={{ background: "hsl(220 30% 4%)" }}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p
            className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "hsl(170 80% 45% / 0.7)" }}
          >
            The People
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold" style={{ color: "white" }}>
            Meet Our{" "}
            <span style={{ color: "hsl(170 80% 45%)" }}>Team</span>
          </h2>
          <p className="text-base mt-4 max-w-lg" style={{ color: "hsl(220 15% 55%)" }}>
            A passionate crew of engineers, designers, and strategists building the future of digital.
          </p>
        </motion.div>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {teamMembers.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i} isInView={isInView} />
          ))}
        </div>
      </div>

      {/* Background subtle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + Math.random() * 4,
              height: 3 + Math.random() * 4,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: `hsl(170 80% 45% / ${0.1 + Math.random() * 0.15})`,
            }}
            animate={{
              y: [0, -20, 10, 0],
              opacity: [0.15, 0.3, 0.1, 0.15],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
