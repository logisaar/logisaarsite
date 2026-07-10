import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Code, Users, Target, Lightbulb, Compass, Award, Heart, 
  GraduationCap, Mountain, Gift, Monitor, ArrowRight, MessageCircle, PenTool, Brain, Sparkles, Check,
  Calendar, TrendingUp, Smile, Puzzle, BookOpen, FileText, ClipboardList, UserCheck, MailOpen,
  MapPin, Rocket, ChevronDown, PartyPopper
} from "lucide-react";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import DecorativeShapes from "@/components/creative/DecorativeShapes";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/creative/MagneticButton";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";

// Import the center logo asset
import lsLogo from "@/assets/chalk to choise center asset.png";

/* ─── Keyframe and styles inject ─── */
const stylesCSS = `
@keyframes career-revolve-0 {
  0% { transform: rotate(270deg); }
  100% { transform: rotate(630deg); }
}
@keyframes career-counter-0 {
  0% { transform: rotate(-270deg); }
  100% { transform: rotate(-630deg); }
}

@keyframes career-revolve-1 {
  0% { transform: rotate(342deg); }
  100% { transform: rotate(702deg); }
}
@keyframes career-counter-1 {
  0% { transform: rotate(-342deg); }
  100% { transform: rotate(-702deg); }
}

@keyframes career-revolve-2 {
  0% { transform: rotate(54deg); }
  100% { transform: rotate(414deg); }
}
@keyframes career-counter-2 {
  0% { transform: rotate(-54deg); }
  100% { transform: rotate(-414deg); }
}

@keyframes career-revolve-3 {
  0% { transform: rotate(126deg); }
  100% { transform: rotate(486deg); }
}
@keyframes career-counter-3 {
  0% { transform: rotate(-126deg); }
  100% { transform: rotate(-486deg); }
}

@keyframes career-revolve-4 {
  0% { transform: rotate(198deg); }
  100% { transform: rotate(558deg); }
}
@keyframes career-counter-4 {
  0% { transform: rotate(-198deg); }
  100% { transform: rotate(-558deg); }
}

.career-orbit:hover,
.career-orbit:hover * {
  animation-play-state: paused !important;
}

@keyframes ls-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.2)); }
  50% { transform: translate(-50%, -50%) scale(1.03); filter: drop-shadow(0 0 25px rgba(34, 197, 94, 0.45)); }
}

@keyframes float-icon-1 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-7px) scale(1.02); }
}
@keyframes float-icon-2 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-9px) scale(1.02); }
}
@keyframes float-icon-3 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-6px) scale(1.02); }
}
@keyframes float-icon-4 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-8px) scale(1.02); }
}

.float-1 { animation: float-icon-1 4.2s ease-in-out infinite; }
.float-2 { animation: float-icon-2 3.7s ease-in-out infinite; }
.float-3 { animation: float-icon-3 4.5s ease-in-out infinite; }
.float-4 { animation: float-icon-4 4.0s ease-in-out infinite; }

@keyframes node-glow-seq {
  0% {
    border-color: rgba(34, 197, 94, 0.25);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    transform: scale(1);
    background-color: var(--background);
  }
  5% {
    border-color: rgba(34, 197, 94, 0.8);
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
    transform: scale(1.08);
    background-color: rgba(34, 197, 94, 0.05);
  }
  10% {
    border-color: rgba(34, 197, 94, 1);
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.8);
    transform: scale(1.15);
    background-color: rgba(34, 197, 94, 0.1);
  }
  15% {
    border-color: rgba(34, 197, 94, 0.8);
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
    transform: scale(1.08);
    background-color: rgba(34, 197, 94, 0.05);
  }
  20% {
    border-color: rgba(34, 197, 94, 0.25);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    transform: scale(1);
    background-color: var(--background);
  }
  20.01%, 100% {
    border-color: rgba(34, 197, 94, 0.25);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    transform: scale(1);
    background-color: var(--background);
  }
}

@keyframes line-flow-seq {
  0% { transform: translateY(-100%); opacity: 0; }
  1% { transform: translateY(-100%); opacity: 1; }
  19% { transform: translateY(200%); opacity: 1; }
  20% { transform: translateY(200%); opacity: 0; }
  20.01%, 100% { transform: translateY(-100%); opacity: 0; }
}

.node-glow-step {
  animation: node-glow-seq 10s linear infinite;
}

.pulse-line-seq {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.95), rgba(34, 197, 94, 1), rgba(255, 255, 255, 0.95), transparent);
  animation: line-flow-seq 10s linear infinite;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 6px rgba(34, 197, 94, 0.6));
}

@keyframes line-draw-1 {
  0%, 10% { height: 0%; }
  20%, 90% { height: 100%; }
  95%, 100% { height: 0%; }
}
@keyframes line-draw-2 {
  0%, 30% { height: 0%; }
  40%, 90% { height: 100%; }
  95%, 100% { height: 0%; }
}
@keyframes line-draw-3 {
  0%, 50% { height: 0%; }
  60%, 90% { height: 100%; }
  95%, 100% { height: 0%; }
}
@keyframes line-draw-4 {
  0%, 70% { height: 0%; }
  80%, 90% { height: 100%; }
  95%, 100% { height: 0%; }
}

.line-draw-step-1 { animation: line-draw-1 10s linear infinite; }
.line-draw-step-2 { animation: line-draw-2 10s linear infinite; }
.line-draw-step-3 { animation: line-draw-3 10s linear infinite; }
.line-draw-step-4 { animation: line-draw-4 10s linear infinite; }
`;

const orbitCards = [
  { icon: Code, label: "Build", delay: 0.1 },
  { icon: TrendingUp, label: "Grow", delay: 0.2 },
  { icon: Users, label: "Lead", delay: 0.3 },
  { icon: Puzzle, label: "Solve", delay: 0.4 },
  { icon: BookOpen, label: "Learn", delay: 0.5 },
];

const openPositions = [
  {
    title: "Full Stack AI Engineer",
    icon: Code,
    dept: "Engineering",
    location: "Bhubaneswar / Cuttack, Odisha",
    experience: "1+ Years",
    type: "Full-time",
    desc: "Build AI-powered web applications, integrations and automation workflows. Work with React, Node.js, n8n and OpenAI APIs.",
    skills: ["React", "Node.js", "n8n", "OpenAI API", "PostgreSQL", "Docker"],
    waMsg: "Hi Logisaar, I'm interested in applying for the Full Stack AI Engineer position.",
  },
  {
    title: "UI/UX Designer & Frontend Developer",
    icon: PenTool,
    dept: "Design",
    location: "Bhubaneswar / Cuttack, Odisha",
    experience: "2+ Years",
    type: "Full-time",
    desc: "Design beautiful, accessible experiences and build fast, responsive interfaces using React and modern UI tools.",
    skills: ["Figma", "React", "Tailwind CSS", "Framer Motion", "UI/UX Design"],
    waMsg: "Hi Logisaar, I'm interested in applying for the UI/UX Designer & Frontend Developer position.",
  },
  {
    title: "Operations & Training Coordinator",
    icon: Users,
    dept: "Operations",
    location: "Bhubaneswar / Cuttack, Odisha",
    experience: "1+ Years",
    type: "Full-time",
    desc: "Manage TechXera programs, handle scheduling, communication, operations and ensure smooth execution.",
    skills: ["Communication", "Planning", "Operations", "Program Mgmt."],
    waMsg: "Hi Logisaar, I'm interested in applying for the Operations & Training Coordinator position.",
  },
];

const perks = [
  { icon: Calendar, title: "Flexible Work", desc: "Work the way you do your best." },
  { icon: Heart, title: "Health & Wellness", desc: "We care about your well-being." },
  { icon: GraduationCap, title: "Learning Budget", desc: "Invest in your growth and skills." },
  { icon: Monitor, title: "Modern Workspace", desc: "Tools and environment to do your best work." },
  { icon: Gift, title: "Performance Rewards", desc: "Your impact is recognized and rewarded." },
  { icon: Mountain, title: "Team Retreats", desc: "Make memories beyond the work." },
];

const hiringSteps = [
  { step: "1. Apply", desc: "Submit your application in just a few minutes.", icon: FileText },
  { step: "2. Assignment", desc: "Complete a short assignment related to the role.", icon: ClipboardList },
  { step: "3. Interview", desc: "Talk with our team and understand each other.", icon: UserCheck },
  { step: "4. Offer", desc: "We make an offer and finalize the details.", icon: MailOpen },
  { step: "5. Welcome", desc: "Onboard and start your journey with Logisaar!", icon: PartyPopper },
];

const ValueIllustrations = [
  // 1. Learn Faster (AI Chip)
  () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="50" height="50" rx="12" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="2" />
      <rect x="37" y="37" width="26" height="26" rx="6" className="fill-emerald-500/20 stroke-emerald-400" strokeWidth="1.5" />
      <text x="50" y="54" textAnchor="middle" className="fill-emerald-500 font-mono font-bold text-[11px] tracking-wide">AI</text>
      <path d="M50 15v10M50 75v10M15 50h10M75 50h10M38 18v7M62 18v7M38 75v7M62 75v7M18 38h7M18 62h7M75 38h7M75 62h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <circle cx="50" cy="15" r="2.5" className="fill-emerald-400" />
      <circle cx="50" cy="85" r="2.5" className="fill-emerald-400" />
      <circle cx="15" cy="50" r="2.5" className="fill-emerald-400" />
      <circle cx="85" cy="50" r="2.5" className="fill-emerald-400" />
    </svg>
  ),
  // 2. Own Your Work (Odisha Pagoda dome)
  () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15c-12 0-18 8-18 18h36c0-10-6-18-18-18z" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="2" />
      <path d="M22 42h56v6H22z" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="1.5" />
      <path d="M28 48v22M38 48v22M50 48v22M62 48v22M72 48v22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 70h64v8H18z" className="fill-emerald-500/30 stroke-emerald-500" strokeWidth="1.5" />
      <path d="M50 15V8m0 0l6 3.5-6 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // 3. Build Real Products (Rocket)
  () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M43 75c-3 8-1 15-1 15s8-2 11-10" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" className="fill-amber-500/20" />
      <path d="M50 78c0 6-2 10-2 10s5 0 6-8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 15c10 15 15 28 15 45H35c0-17 5-30 15-45z" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="2" strokeLinejoin="round" />
      <path d="M35 55c-10 2-12 15-12 15s10-2 12-7M65 55c10 2 12 15 12 15s-10-2-12-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="42" r="7" className="fill-emerald-500/30 stroke-emerald-400" strokeWidth="1.5" />
    </svg>
  ),
  // 4. Grow Together (Trophy Cup)
  () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 20h40v26c0 10-8 18-20 18S30 56 30 46V20z" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 25c-8 0-10 8-10 8s2 12 10 10M70 25c8 0 10 8 10 8s-2 12-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 64v12M35 76h30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="30" y="76" width="40" height="8" rx="2" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="1.5" />
      <circle cx="22" cy="18" r="1.5" className="fill-amber-400" />
      <circle cx="78" cy="18" r="1.5" className="fill-amber-400" />
      <circle cx="50" cy="35" r="2" className="fill-amber-400 animate-pulse" />
    </svg>
  ),
];

const TechLogos: Record<string, () => JSX.Element> = {
  React: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 text-[#61dafb] fill-none stroke-current" strokeWidth="1">
      <circle cx="0" cy="0" r="2.05"/>
      <g>
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  "Next.js": () => (
    <svg viewBox="0 0 180 180" className="w-8 h-8 fill-current text-slate-800 dark:text-slate-100">
      <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.05" />
      <path d="M149 149L80 60h-8v60h8V78l61 80c3-2 6-5 8-9zM104 60h8v60h-8z" fill="currentColor" />
    </svg>
  ),
  "Node.js": () => (
    <svg viewBox="0 0 256 292" className="w-8 h-8 text-[#339933] fill-current">
      <path d="M128 0L24.3 60v120L128 240l103.7-60V60L128 0zm79.8 166.2l-27.9 16.1V97.7l27.9-16.1v84.6zm-51.9 30l-27.9 16.1V67.7l27.9-16.1v144.6z"/>
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 256 256" className="w-8 h-8 text-[#3178c6] fill-current">
      <rect width="256" height="256" rx="12" />
      <path d="M140 185c0 14-8 23-23 23-14 0-22-8-22-21V100h15v84c0 6 3 9 8 9 4 0 7-3 7-9v-84h15v85zm58-54c-12 0-19 5-19 14 0 22 30 16 30 36 0 12-9 20-22 20-14 0-23-8-23-20h15c0 6 4 9 9 9 5 0 7-3 7-7 0-22-30-16-30-36 0-12 9-19 22-19 13 0 21 7 21 19h-15c0-4-3-6-7-6z" fill="white" />
    </svg>
  ),
  PostgreSQL: () => (
    <svg viewBox="0 0 256 248" className="w-8 h-8 text-[#336791] fill-current">
      <path d="M239.5 125.8c0 17.5-6.8 33.6-18 45.6-7.8 8.4-17.7 14.5-28.7 17.9 2.5-6.2 3.8-12.8 3.8-19.6v-2.3c0-31.5-25.5-57-57-57h-9v-9c0-31.5 25.5-57 57-57h9c23.6 0 42.9 19.3 42.9 42.9v38.5z" fill="#336791" />
      <path d="M130 92.8c18.2 0 33 14.8 33 33v2.3c0 18.2-14.8 33-33 33h-2.3c-18.2 0-33-14.8-33-33v-2.3c0-18.2 14.8-33 33-33h2.3z" fill="#7ba4c7" />
      <path d="M127.7 115.8c6.1 0 11 4.9 11 11v2.3c0 6.1-4.9 11-11 11h-2.3c-6.1 0-11-4.9-11-11v-2.3c0-6.1 4.9-11 11-11h2.3z" fill="#ffffff" />
      <circle cx="127.7" cy="126.8" r="4.5" fill="#336791" />
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#2496ed] fill-current">
      <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.902c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.99c0 .103.083.186.186.186zm-2.95.078h2.118c.102 0 .185-.083.185-.185V8.902c0-.102-.083-.186-.185-.186h-2.118c-.102 0-.185.084-.185.186v1.99c0 .103.083.186.185.186zm-2.937.078h2.118c.102 0 .185-.083.185-.185V8.902c0-.102-.083-.186-.185-.186H8.096c-.102 0-.185.084-.185.186v1.99c0 .103.083.186.185.186zm-2.964.078h2.119c.102 0 .185-.083.185-.185V8.902c0-.102-.083-.186-.185-.186H5.132c-.102 0-.185.084-.185.186v1.99c0 .103.083.186.185.186zm-2.95.078h2.118c.103 0 .186-.083.186-.185V8.902c0-.102-.083-.186-.186-.186H2.182c-.102 0-.186.084-.186.186v1.99c0 .103.084.186.186.186zm2.95-2.938h2.119c.102 0 .185-.083.185-.185V6.016c0-.102-.083-.186-.185-.186H5.132c-.102 0-.185.084-.185.186v1.99c0 .103.083.186.185.186zm2.964 0h2.118c.102 0 .185-.083.185-.185V6.016c0-.102-.083-.186-.185-.186H8.096c-.102 0-.185.084-.185.186v1.99c0 .103.083.186.185.186zm2.937 0h2.118c.102 0 .185-.083.185-.185V6.016c0-.102-.083-.186-.185-.186h-2.118c-.102 0-.185.084-.185.186v1.99c0 .103.083.186.185.186zm-2.937-2.949h2.118c.102 0 .185-.083.185-.185V3.067c0-.102-.083-.186-.185-.186H8.096c-.102 0-.185.084-.185.186v1.99c0 .102.083.185.185.185zM23.99 11.57c-.013-.082-.03-.16-.051-.237-.15-.55-.662-.977-1.229-.977h-3.327c-.102 0-.186.084-.186.186v2.118c0 .102.084.185.186.185h1.222c-.417.842-1.012 1.543-1.745 2.054-.37.258-.78.472-1.218.636V11.08c0-.102-.084-.186-.186-.186h-2.118c-.103 0-.186.084-.186.186v6.417c-.318.046-.642.073-.974.073-1.014 0-1.99-.188-2.893-.523l-.15-.058c-1.393-.514-2.883-.514-4.275 0l-.213.078c-.902.327-1.872.513-2.87.513-.396 0-.783-.027-1.168-.073V11.08c0-.102-.084-.186-.186-.186H2.182c-.102 0-.186.084-.186.186v6.417C.82 17.065 0 15.545 0 13.8v.117c0 4.195 3.513 7.6 7.828 7.6 1.397 0 2.716-.367 3.864-.997 1.096-.602 2.036-1.464 2.748-2.5 1.4 1.4 3.2 2.3 5.3 2.5 3.9.4 7.2-2.1 8-5.7.3-1.2.4-2.3.3-3.4v-.25z"/>
    </svg>
  ),
  AWS: () => (
    <svg viewBox="0 0 256 154" className="w-8 h-8 text-[#ff9900] fill-current">
      <path d="M125 15C102 15 80 22 61 36c-2.3 1.7-2 5.1.5 6.4l9.5 5.2c2.1 1.2 4.7.7 6.2-1.2C91 30 108 25 125 25c34 0 61 17 61 39 0 5-2 10-6 14-8-12-25-20-47-20-29 0-51 16-51 40 0 21 16 35 39 35 18 0 35-9 43-21 4 9 12 15 24 15 17 0 30-14 30-34 0-42-41-78-93-78zm13 90c-14 0-23-7-23-16s9-17 23-17 23 8 23 17-9 16-23 16z" />
      <path d="M22 108c35 25 80 39 126 39 40 0 81-11 115-30 2.8-1.5.8-5.6-2.4-4.5-31 10-65 16-99 16-41 0-82-12-114-34-2.5-1.7-5.1 1.4-2.8 3.5z" />
      <path d="M9 99c-3.1 3.5.3 8.7 4.6 7.4l19.5-6c3.2-1 3.2-5.5 0-6.5L14 88c-4.3-1.3-7.7 3.9-5 7l3.6 4z" fill="#ff9900" />
    </svg>
  ),
  OpenAI: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#10a37f] fill-current">
      <path d="M21.3 11.2c.4-.7.6-1.5.6-2.3 0-2.3-1.9-4.2-4.2-4.2-.4 0-.8.1-1.2.2C15.7 3.2 14.1 2 12.2 2 9.9 2 8 3.9 8 6.2c0 .2 0 .4.1.6C7.4 6.2 6.3 5.8 5.2 5.8 2.9 5.8 1 7.7 1 10c0 .9.3 1.7.8 2.4-.4.7-.6 1.5-.6 2.3 0 2.3 1.9 4.2 4.2 4.2.4 0 .8-.1 1.2-.2.8 1.7 2.4 2.9 4.3 2.9 2.3 0 4.2-1.9 4.2-4.2 0-.2 0-.4-.1-.6.7.7 1.8 1.1 2.9 1.1 2.3 0 4.2-1.9 4.2-4.2 0-.8-.2-1.6-.7-2.3zm-8.8 8.8c-1.3 0-2.3-1-2.3-2.3V14l2.5 1.5 2.7-1.5v3.4c0 1.2-1 2.3-2.9 2.6zm-5-3.3c-.6-1-1-2.1-1-3.3V11l2.5 1.5v3l3.5-2v3l-5 .8zM6.2 9.5c0-1.3 1-2.3 2.3-2.3H11l-2.5 4.3L5.8 10c.2-.2.4-.5.4-.5zm7.3-3.3c1.3 0 2.3 1 2.3 2.3v3.7l-2.5-1.5v-3l-3.5 2v-3l5-.8zm-5 7.1l-2.5-1.5 2.5-4.3 2.5 1.5-2.5 4.3zm6.3-1.5l2.5-1.5v3.3c0 1.3-1 2.3-2.3 2.3H15l-2.5-4.3 2.7 1.5z"/>
    </svg>
  ),
  n8n: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
      <circle cx="6" cy="12" r="3.5" fill="#ea4b7c" />
      <circle cx="18" cy="6" r="3.5" fill="#ff9900" />
      <circle cx="18" cy="18" r="3.5" fill="#3178c6" />
      <path d="M8.5 11.2l6-4.5M8.5 12.8l6 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Supabase: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#3ecf8e] fill-current">
      <path d="M21.37 8.94l-8.5 12c-.44.62-1.37.44-1.56-.3L10.02 15H4.25c-.7 0-1.13-.73-.85-1.36l8.5-12c.44-.62 1.37-.44 1.56.3L14.73 9h5.79c.7 0 1.13.73.85 1.36z" stroke="none" />
    </svg>
  ),
};

const faqs = [
  {
    q: "What is the work culture like at Logisaar?",
    a: "We foster an AI-first, flat-hierarchy culture built on high autonomy and fast execution. We encourage builders to take complete ownership of their projects and ship daily."
  },
  {
    q: "Do you offer remote work?",
    a: "Yes! While we are headquartered in Cuttack & Bhubaneswar, Odisha, we offer flexible hybrid and remote options depending on the role."
  },
  {
    q: "What technologies do you use?",
    a: "We work with modern, high-performance tech: React, Next.js, Node.js, TypeScript, PostgreSQL, Docker, AWS, OpenAI SDKs, n8n, and Supabase."
  },
  {
    q: "How is the interview process?",
    a: "Our process is simple and fast: 1) Initial application review, 2) A short, practical take-home assignment, 3) Technical interview conversation, 4) Final offer discussion."
  },
  {
    q: "What are the growth opportunities?",
    a: "As an early member of an AI-native product team, you will get exposure to shipping SaaS from scratch, training local developers (via TechXera), and using cutting-edge LLM toolchains."
  },
  {
    q: "How can I apply if I don't see a relevant role?",
    a: "We are always looking for great minds! You can submit an open application by clicking 'Apply Today' below or emailing us at logisaar@gmail.com."
  }
];

// Interactive canvas particles orbiting center logo with mouse hover influence
const CanvasParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      angle: number;
      orbitRadius: number;
      speed: number;
      size: number;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
      offsetX: number;
      offsetY: number;
    }> = [];

    // Initialize 45 particles in the orbit bands
    for (let i = 0; i < 45; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        orbitRadius: 120 + Math.random() * 80,
        speed: (0.04 + Math.random() * 0.12) * (Math.random() > 0.5 ? 1 : -1) * 0.02,
        size: 1 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.55,
        pulse: Math.random(),
        pulseSpeed: 0.01 + Math.random() * 0.02,
        offsetX: 0,
        offsetY: 0,
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, 500, 500);

      const centerX = 250;
      const centerY = 250;

      particles.forEach((p) => {
        // Base circular orbit coordinates
        p.angle += p.speed;
        const targetX = centerX + Math.cos(p.angle) * p.orbitRadius;
        const targetY = centerY + Math.sin(p.angle) * p.orbitRadius;

        // Calculate cursor push effect
        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const dist = Math.hypot(dx, dy);

        let pushX = 0;
        let pushY = 0;

        if (dist < 100) {
          const force = (100 - dist) / 100;
          const angle = Math.atan2(dy, dx);
          // Push particles slightly away from cursor
          pushX = Math.cos(angle) * force * 24;
          pushY = Math.sin(angle) * force * 24;
        }

        // Smoothly interpolate current offsets
        p.offsetX += (pushX - p.offsetX) * 0.08;
        p.offsetY += (pushY - p.offsetY) * 0.08;

        const x = targetX + p.offsetX;
        const y = targetY + p.offsetY;

        // Animate pulse alpha
        p.pulse += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${currentAlpha})`; // Primary green matching theme
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};

const Careers = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <Layout>
      <SEO
        title="Careers at Logisaar | Join the AI-Native Frontier"
        description="Build the future with purpose. Explore open positions for Full Stack Developers, UI/UX Designers, and AI/ML Engineers in Odisha at Logisaar."
        keywords="careers Logisaar, software jobs Odisha, AI developer jobs Bhubaneswar, IT recruitment Cuttack, TechXera jobs"
        canonical="https://www.logisaar.in/careers"
      />
      <style>{stylesCSS}</style>

      {/* ── SECTION: Hero & Culture Intro ── */}
      <section className="min-h-screen flex items-center relative overflow-hidden py-32 bg-white dark:bg-background">
        <DecorativeShapes variant="hero" />
        
        {/* Dot background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            
            {/* Left Info side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Careers at Logisaar</span>
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-black tracking-tight text-slate-900 dark:text-white leading-tight md:whitespace-nowrap">
                  Don't just get a job.
                </h1>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-black tracking-tight text-primary leading-none md:whitespace-nowrap">
                  Build what's{" "}
                  <span className="relative inline-block">
                    next
                    <svg 
                      className="absolute -bottom-2.5 left-0 w-full h-2.5 text-primary/80 pointer-events-none" 
                      viewBox="0 0 200 10" 
                      preserveAspectRatio="none" 
                      fill="none"
                    >
                      <path d="M2,7 C60,2 140,8 198,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M10,9 C70,5 130,10 190,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  </span>
                  .
                </h2>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight md:whitespace-nowrap pt-1 flex items-baseline gap-2">
                  <span>Never Stop</span>
                  <DiaTextReveal
                    repeat
                    fixedWidth
                    repeatDelay={1.4}
                    duration={1.2}
                    textColor="hsl(var(--primary))"
                    colors={["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"]}
                    text={["Creating.", "Innovating.", "Crafting.", "Building.", "Designing.", "Iterating.", "Exploring."]}
                  />
                </h3>
              </div>

              {/* Subheading */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
                We're a team of builders, thinkers and problem solvers working on meaningful products that create real impact.
              </p>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
                {[
                  { icon: Sparkles, title: "Meaningful Work", desc: "Work on products that solve real problems and create impact." },
                  { icon: TrendingUp, title: "Growth Mindset", desc: "Continuous learning, mentorship and opportunities to grow." },
                  { icon: Smile, title: "Great Culture", desc: "Collaborative, inclusive and supportive environment." },
                  { icon: Award, title: "Ownership", desc: "Take ownership, make decisions and see your ideas come to life." }
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-foreground">{title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton strength={0.1}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 border-0 text-white rounded-full px-8 gap-2 font-semibold shadow-md shadow-primary/20"
                  >
                    <a href="#positions">
                      Explore Open Roles
                      <ArrowRight size={16} />
                    </a>
                  </Button>
                </MagneticButton>

                <a
                  href="https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I%20want%20to%20learn%20more%20about%20your%20company%20work%20culture."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full border-2 border-border group-hover:border-primary/50 flex items-center justify-center transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Watch Our Culture
                </a>
              </div>
            </motion.div>

            {/* Right circular orbit side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative w-full max-w-[500px] aspect-square mx-auto"
            >
              {/* Centered glow gradient */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0"
                style={{
                  width: "360px",
                  height: "360px",
                  background: "radial-gradient(circle, rgba(34, 197, 94, 0.22) 0%, rgba(34, 197, 94, 0.08) 55%, transparent 70%)",
                  filter: "blur(28px)",
                }}
              />

              {/* Circular orbit lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500" fill="none">
                {/* Horizontal circle */}
                <circle cx="250" cy="250" r="180" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.3" />
                {/* Tilted ellipse 1 */}
                <ellipse cx="250" cy="250" rx="195" ry="140" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="6 8" opacity="0.2" style={{ transform: "rotate(-15deg)", transformOrigin: "250px 250px" }} />
                {/* Tilted ellipse 2 */}
                <ellipse cx="250" cy="250" rx="195" ry="140" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="6 8" opacity="0.2" style={{ transform: "rotate(20deg)", transformOrigin: "250px 250px" }} />
              </svg>

              {/* Interactive Canvas Particles */}
              <CanvasParticles />

              {/* Pulsing Center Logo */}
              <div 
                className="absolute left-1/2 top-1/2 rounded-full pointer-events-none z-20"
                style={{
                  width: "128px",
                  height: "128px",
                  animation: "ls-pulse 4s ease-in-out infinite",
                }}
              >
                <img 
                  src={lsLogo} 
                  alt="LogiSaar Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* 5 Orbit revolving cards */}
              {orbitCards.map(({ icon: Icon, label, delay }, idx) => (
                <div
                  key={label}
                  className="absolute left-1/2 top-1/2 w-0 h-0 career-orbit"
                  style={{
                    animation: `career-revolve-${idx} 45s linear infinite`,
                  }}
                >
                  {/* Orbit node dot */}
                  <div
                    className="absolute w-2 h-2 rounded-full bg-primary border border-white dark:border-slate-900 shadow-sm"
                    style={{
                      transform: "translate(180px, -50%)",
                    }}
                  />
                  
                  {/* Floating card */}
                  <div
                    className="absolute w-[80px] h-[80px]"
                    style={{
                      transform: "translate(180px, -50%)",
                      marginLeft: "8px",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay }}
                      style={{
                        animation: `career-counter-${idx} 45s linear infinite`,
                      }}
                    >
                      <div className="liquid-glass rounded-2xl w-[80px] h-[80px] flex flex-col items-center justify-center border border-primary/15 shadow-sm hover:shadow-md transition-shadow group cursor-default">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 grid place-items-center mb-1 group-hover:bg-primary/20 transition-colors">
                          <Icon size={15} className="text-primary block shrink-0" />
                        </div>
                        <span className="text-[11px] font-bold text-foreground mt-0.5">{label}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Bottom Stats Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border/60 pt-10"
          >
            {[
              { icon: Users, stat: "50+", label: "Team Members", sub: "Growing together" },
              { icon: Code, stat: "15+", label: "Products Built", sub: "Solving real problems" },
              { icon: Compass, stat: "5+", label: "Years of Impact", sub: "Building since 2020" },
              { icon: GraduationCap, stat: "100%", label: "Commitment", sub: "To quality & growth" },
            ].map(({ icon: Icon, stat, label, sub }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-xl font-black text-primary leading-none">{stat}</div>
                  <div className="text-sm font-bold text-foreground mt-0.5">{label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION: Our Values ── */}
      <section className="py-24 bg-secondary/15 border-t border-border/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-primary text-xs font-mono uppercase tracking-[0.2em] block">
              Our Culture
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Our Values, Our Way
            </h2>
          </div>

          {/* Grid of 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                title: "Learn Faster",
                desc: "We learn, unlearn and relearn. Growth is part of our culture.",
                icon: BookOpen,
              },
              {
                title: "Own Your Work",
                desc: "Take ownership, make decisions and see your ideas come to life.",
                icon: Target,
              },
              {
                title: "Build Real Products",
                desc: "Work on meaningful products used by thousands.",
                icon: Code,
              },
              {
                title: "Grow Together",
                desc: "We strive as a team and celebrate every milestone together.",
                icon: Heart,
              },
            ].map((value, idx) => {
              const Illustration = ValueIllustrations[idx];
              const floatClass = `float-${idx + 1}`;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="glass-card p-6 border border-border/50 bg-white/40 dark:bg-slate-900/40 flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className={`w-20 h-20 flex items-center justify-center ${floatClass}`}>
                    <Illustration />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-foreground text-base">
                      {value.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION: Open Positions (Find Your Next Opportunity) ── */}
      <section className="py-24 bg-white dark:bg-background border-t border-border/30 relative overflow-hidden" id="positions">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/60 pb-6 mb-10 gap-4">
            <div className="space-y-2">
              <span className="text-primary text-xs font-mono uppercase tracking-[0.2em] block">
                Open Positions
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                Find your next opportunity
              </h2>
            </div>
            <a
              href="mailto:logisaar@gmail.com?subject=Open%20Application%20-%20Careers"
              className="text-sm font-bold text-primary hover:opacity-80 transition-opacity flex items-center gap-1.5 self-start md:self-auto"
            >
              View All Openings <ArrowRight size={16} />
            </a>
          </div>

          {/* List of redesigned jobs */}
          <div className="space-y-6">
            {openPositions.map((pos) => {
              const JobIcon = pos.icon;
              return (
                <motion.div
                  key={pos.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group border border-border/60 hover:border-primary/30 rounded-3xl p-6 md:p-8 bg-card/25 hover:bg-card/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Left Column: Details */}
                  <div className="flex gap-5 items-start lg:max-w-[45%]">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <JobIcon size={24} className="text-primary" />
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                          {pos.title}
                        </h3>
                        <span className="bg-primary/10 text-primary text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold">
                          {pos.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <MapPin size={13} className="text-primary/70" />
                        <span>{pos.location}</span>
                        <span className="text-border">•</span>
                        <span>{pos.experience}</span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {pos.desc}
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: Key Skills */}
                  <div className="lg:max-w-[30%] space-y-2 lg:px-4">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Key Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {pos.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-slate-100 dark:bg-slate-800 text-[11px] font-medium px-3 py-1 rounded-lg text-slate-700 dark:text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Apply Button */}
                  <Button
                    asChild
                    className="bg-gradient-primary hover:opacity-90 text-white rounded-xl font-bold px-6 py-2.5 shadow-sm hover:shadow-md transition-all group/btn w-full lg:w-auto shrink-0"
                  >
                    <a
                      href={`https://wa.me/918596072510?text=${encodeURIComponent(pos.waMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5"
                    >
                      Apply Now
                      <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION: Tech Stack & Hiring Process (Combined) ── */}
      <section className="py-24 bg-secondary/15 border-t border-border/30 relative overflow-hidden" id="tech-and-hiring">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 xl:gap-20 items-start">
            
            {/* Left Column: Tech Stack (50% width) */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-primary text-xs font-mono uppercase tracking-[0.2em] block">
                  Our Tech Stack
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Technologies we love working with
                </h2>
              </div>

              {/* Compact Grid of 10 tech logos - 3 columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(TechLogos).map(([name, Logo], idx) => {
                  const floatClass = `float-${(idx % 4) + 1}`;
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="liquid-glass rounded-xl p-3 border border-border/40 hover:border-primary/20 flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow cursor-default text-center group bg-white/40 dark:bg-slate-900/10"
                    >
                      <div className={`w-9 h-9 flex items-center justify-center transition-transform duration-300 ${floatClass}`}>
                        <Logo />
                      </div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
                        {name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Caption */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                And many more tools that help us{" "}
                <span className="text-gradient font-semibold">build, ship and scale.</span>
              </p>
            </div>

            {/* Right Column: Hiring Process (50% width) */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-primary text-xs font-mono uppercase tracking-[0.2em] block">
                  Our Hiring Process
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Simple, transparent and respectful
                </h3>
              </div>

              {/* Vertical Timeline Layout */}
              <div className="relative pl-2 sm:pl-4">
                <div className="space-y-8">
                  {hiringSteps.map((step, idx) => {
                    const StepIcon = step.icon;
                    const isLast = idx === hiringSteps.length - 1;
                    return (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}
                        className="flex items-start gap-4 sm:gap-6 relative group"
                      >
                        {/* Circle Node wrapper and centered connecting line */}
                        <div className="relative shrink-0 flex flex-col items-center">
                          <div 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-900 border-2 border-primary/20 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 relative z-10 node-glow-step"
                            style={{ animationDelay: `${idx * 2}s` }}
                          >
                            <StepIcon className="text-primary w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          {!isLast && (
                            <div className="w-[2px] bg-border absolute top-10 sm:top-12 bottom-[-32px] -z-10 overflow-hidden">
                              <div className={`w-full bg-primary relative line-draw-step-${idx + 1}`}>
                                <div 
                                  className="pulse-line-seq" 
                                  style={{ animationDelay: `${idx * 2 + 1}s` }} 
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Text block */}
                        <div className="space-y-1 py-1">
                          <h4 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                            {step.step}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION: Perks & Benefits ── */}
      <section className="py-24 bg-white dark:bg-background border-t border-border/30 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-primary text-xs font-mono uppercase tracking-[0.2em] block">
              Perks & Benefits
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              We take care of our people
            </h2>
          </div>

          {/* Grid of Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((p, idx) => {
              const PerkIcon = p.icon;
              return (
                <motion.div 
                  key={p.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="p-6 rounded-2xl border border-border/60 bg-card/25 space-y-3 hover:border-primary/20 hover:bg-card/50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <PerkIcon size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground">{p.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION: FAQs ── */}
      <section className="py-24 bg-secondary/15 border-t border-border/30 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16 space-y-3">
            <span className="text-primary text-xs font-mono uppercase tracking-[0.2em] block">
              FAQs
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Frequently asked questions
            </h2>
          </div>

          {/* Grid of Accordion items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={faq.q}
                  className="border border-border/60 rounded-2xl bg-card/20 hover:bg-card/45 transition-colors overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left gap-4 font-bold text-sm md:text-base text-foreground"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="px-5 pb-5 text-xs md:text-sm text-muted-foreground leading-relaxed border-t border-border/10 pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>



      {/* ── SECTION: Final CTA ── */}
      <section className="py-24 bg-white dark:bg-background border-t border-border/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl bg-slate-50 dark:bg-slate-950 border border-border/60 p-8 md:p-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Ambient background glow inside the card */}
            <div 
              className="absolute right-0 top-0 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <div className="space-y-3 text-center md:text-left relative z-10">
              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Ready to build something meaningful?
              </h3>
              <p className="text-xl font-bold text-primary">
                Become part of Logisaar.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <MagneticButton strength={0.12}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 border-0 text-white rounded-full px-10 py-6 text-base font-bold shadow-md shadow-primary/20"
                >
                  <a href="mailto:logisaar@gmail.com?subject=Job%20Application%20-%20Logisaar">
                    Apply Today
                    <ArrowRight size={18} className="ml-1" />
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
