import { useState, useRef, useEffect } from "react";
// TODO(owner): confirm these programmes are still offered (the list is the old TechXera catalogue).
import { motion, AnimatePresence } from "framer-motion";
import { Award, BarChart3, Binary, BookOpen, Brain, Briefcase, Check, ChevronRight, Clock, Cpu, Eye, Laptop, Layers, Megaphone, MessageCircle, Shield, Smartphone, Sparkles, Target, Video, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { coursesData, filters, spotlightCourse, type Course } from "@/data/ikuro-programs";
import { REVEAL_VIEWPORT } from "@/lib/scroll";

const iconMap: Record<string, React.ElementType> = {
  Laptop, Smartphone, Shield, Cpu, BarChart3, Binary, Eye, Brain,
  Megaphone, Video, Briefcase, Award,
};

const TechxeraPrograms = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const coursesRef = useRef<HTMLDivElement>(null);

  const filteredCourses = coursesData.filter((course) => (activeFilter === "all" ? true : course.categories.includes(activeFilter)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedCourse(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = selectedCourse ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedCourse]);

  return (
    <>
      <section data-logi="Pick a program that fits you." ref={coursesRef} className="py-section relative overflow-hidden bg-background">
        <div className="container mx-auto px-gutter max-w-[81.25rem]">

          {/* Header block */}
          <div className="text-center mb-section-head max-w-3xl mx-auto space-y-4">
            <h2 className="font-display text-h2 font-bold">
              TechXera <span className="text-gradient">programmes</span>
            </h2>
            <p className="text-body-sm font-medium text-primary-ink">TechXera, our student community, is now part of IKURO.</p>
            <p className="text-muted-foreground text-body-sm md:text-body max-w-lg mx-auto">
              Learn practical development workflows backed by native AI integration. No heavy theory lectures, only live project building.
            </p>
          </div>

          {/* Course Filter Navigation */}
          <div className="mb-section-head flex justify-center w-full">
            <div className="overflow-x-auto no-scrollbar max-w-full px-4 py-1">
              <div className="inline-flex bg-secondary/50 backdrop-blur-md p-1 rounded-full border border-border/60 shadow-sm min-w-max">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`relative min-h-[2.75rem] px-4 sm:px-6 rounded-full text-label sm:text-body-sm font-semibold transition-all duration-300 ${activeFilter === filter.id
                      ? "text-white font-bold"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <span className="relative z-10">{filter.label}</span>
                    {activeFilter === filter.id && (
                      <motion.div
                        layoutId="activeFilterBg"
                        className="absolute inset-0 bg-primary rounded-full "
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Deliberate Grid including spotlight/featured card dynamically inside it */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {filteredCourses.map((course, idx) => {
              const isSpotlight = course.title === spotlightCourse.title;
              const IconComponent = iconMap[course.iconName] || BookOpen;

              if (isSpotlight) {
                return (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL_VIEWPORT}
                    whileHover={{ y: -4 }}
                    className="md:col-span-2 lg:col-span-3 bg-card border border-border/80 hover:border-primary/40 rounded-3xl p-6 md:p-8 grid gap-x-10 gap-y-6 lg:grid-cols-[1.15fr_1fr] shadow-lg transition-all duration-300 relative group overflow-hidden"
                  >
                    <div className="flex flex-col gap-6">
                      {/* Top Header */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-ink group-hover:scale-110 group-hover:rotate-6 transition-all">
                            <IconComponent size={24} />
                          </div>
                          <div>
                            <span className="bg-primary/10 text-primary-ink dark:text-primary-ink border border-primary/20 text-label font-semibold px-3 py-1 rounded-full">
                              Ecosystem Flagship
                            </span>
                          </div>
                        </div>
                        <span className="text-label uppercase font-mono font-bold tracking-wider text-muted-foreground">
                          {course.difficulty}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-2 text-left">
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground group-hover:text-primary-ink transition-colors duration-300 leading-tight">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground text-body-sm md:text-body leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      {/* Footer Row */}
                      <div className="mt-auto pt-4 border-t border-border/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="text-xl font-bold text-foreground font-mono">
                          {course.price}
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                          <Button asChild className="flex-1 sm:flex-initial bg-primary hover:opacity-90 border-0 text-primary-on rounded-full px-6 h-11 font-semibold">
                            <a
                              href={`https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20interested%20in%20joining%20the%20${encodeURIComponent(course.title)}%20program.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                            >
                              <MessageCircle size={16} fill="currentColor" />
                              Enroll
                            </a>
                          </Button>
                          <Button
                            onClick={() => setSelectedCourse(course)}
                            variant="outline"
                            className="flex-1 sm:flex-initial rounded-full px-6 h-11 font-semibold border-border bg-white dark:bg-card"
                          >
                            Syllabus
                          </Button>
                        </div>
                      </div>

                    </div>

                    <div className="flex flex-col justify-center gap-6 lg:border-l lg:border-border/40 lg:pl-10">
                      {/* Stats Row */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 border-y border-border/40 text-label font-mono text-muted-foreground/90">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-primary-ink/75" />
                          <span>{course.duration} ({course.hours})</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Layers size={14} className="text-primary-ink/75" />
                          <span>{course.sessions}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Target size={14} className="text-primary-ink/75" />
                          <span>{course.projectsCount}</span>
                        </div>
                      </div>

                      {/* Skills Stack */}
                      <div className="space-y-2 text-left">
                        <div className="text-label font-mono text-muted-foreground uppercase tracking-wider">Core Skill Stack</div>
                        <div className="flex flex-wrap gap-1.5">
                          {course.skills.map(skill => (
                            <span key={skill} className="bg-secondary text-foreground text-label px-2.5 py-1 rounded-md border border-border/80 font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Condensed Benefit Icons */}
                      <div className="flex gap-4 items-center text-muted-foreground text-label pt-2">
                        <span className="flex items-center gap-1.5"><Award size={14} className="text-primary-ink" /> Certification</span>
                        <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-primary-ink" /> Internship</span>
                        <span className="flex items-center gap-1.5"><Zap size={14} className="text-primary-ink" /> Job-Ready</span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={REVEAL_VIEWPORT}
                  transition={{ delay: (idx % 3) * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border/80 hover:border-primary/45 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="space-y-4 text-left">
                    {/* Top Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-ink group-hover:scale-110 group-hover:rotate-6 transition-all">
                        <IconComponent size={20} />
                      </div>
                      <span className="text-label uppercase font-mono font-bold tracking-wider text-muted-foreground">
                        {course.difficulty}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-foreground text-lg leading-snug group-hover:text-primary-ink transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-label md:text-body-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 py-2.5 border-y border-border/40 text-label sm:text-label font-mono text-muted-foreground/90">
                      <span className="flex items-center gap-1"><Clock size={12} className="text-primary-ink/75" /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Layers size={12} className="text-primary-ink/75" /> {course.sessions}</span>
                      <span className="flex items-center gap-1"><Target size={12} className="text-primary-ink/75" /> {course.projectsCount}</span>
                    </div>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="bg-secondary text-foreground text-label px-2 py-0.5 rounded border border-border/50">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Benefits condensed row */}
                    <div className="flex gap-3 text-muted-foreground text-label pt-1">
                      {course.benefits.includes("Certification") && <span className="flex items-center gap-1"><Award size={12} className="text-primary-ink" /> Cert</span>}
                      {course.benefits.includes("Internship Support") && <span className="flex items-center gap-1"><Briefcase size={12} className="text-primary-ink" /> Intern</span>}
                      {course.benefits.includes("Placement Ready") && <span className="flex items-center gap-1"><Zap size={12} className="text-primary-ink" /> Job-Ready</span>}
                    </div>
                  </div>

                  {/* Actions & Price Footer */}
                  <div className="mt-6 pt-4 border-t border-border/20 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-body-sm font-bold text-foreground font-mono">
                      {course.price}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild variant="default" size="sm" className="bg-primary hover:opacity-90 border-0 text-primary-on rounded-full text-label font-semibold h-11 px-3.5">
                        <a
                          href={`https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20interested%20in%20joining%20the%20${encodeURIComponent(course.title)}%20program.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          <MessageCircle size={13} fill="currentColor" />
                          Enroll
                        </a>
                      </Button>
                      <Button
                        onClick={() => setSelectedCourse(course)}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-label font-semibold h-11 px-3.5 border-border text-muted-foreground hover:text-foreground bg-white dark:bg-card"
                      >
                        Syllabus
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-modal flex justify-end">
            {/* Dark Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[4px]"
            />

            {/* Slide-over Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="relative w-full max-w-2xl h-full bg-white dark:bg-slate-900 shadow-2xl border-l border-border/80 flex flex-col z-20 overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-border/80 flex justify-between items-start shrink-0">
                <div className="space-y-1 max-w-[85%] text-left">
                  <span className="text-label uppercase font-mono font-bold tracking-widest text-primary-ink">
                    Course Syllabus Detail
                  </span>
                  <h3 className="font-display font-bold text-2xl text-foreground">
                    {selectedCourse.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1 text-label">
                    <span className="bg-secondary text-foreground border border-border px-2 py-0.5 rounded-full font-mono font-semibold">
                      {selectedCourse.duration}
                    </span>
                    <span className="bg-secondary text-foreground border border-border px-2 py-0.5 rounded-full font-mono font-semibold">
                      {selectedCourse.sessions}
                    </span>
                    <span className="bg-primary/10 text-primary-ink border border-primary/20 px-2 py-0.5 rounded-full font-mono font-bold">
                      Fees: {selectedCourse.price}
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 rounded-full hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar text-left">

                {/* Brief description */}
                <div className="space-y-2">
                  <h4 className="text-label font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Description
                  </h4>
                  <p className="text-body-sm text-foreground/90 leading-relaxed">
                    {selectedCourse.description}
                  </p>
                </div>

                {/* Tools Covered */}
                <div className="space-y-4 pt-6 border-t border-border/60">
                  <h4 className="text-label font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Industry Tools Covered
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Dev/Industry Tools */}
                    <div className="space-y-2">
                      <div className="text-label font-bold text-foreground font-mono flex items-center gap-1.5">
                        <Layers size={13} className="text-primary-ink" />
                        Development &amp; Standard Tools
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedCourse.toolsCovered.development.map(tool => (
                          <span key={tool} className="bg-secondary/60 text-foreground text-label px-2.5 py-1 rounded-md border border-border/40 font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* AI Tools */}
                    <div className="space-y-2">
                      <div className="text-label font-bold text-primary-ink font-mono flex items-center gap-1.5">
                        <Sparkles size={13} className="text-primary-ink" />
                        AI Innovation Tools
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedCourse.toolsCovered.ai.map(tool => (
                          <span key={tool} className="bg-primary/10 text-primary-ink text-label px-2.5 py-1 rounded-md border border-primary/20 font-semibold">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phases & Modules */}
                <div className="space-y-4 pt-6 border-t border-border/60">
                  <h4 className="text-label font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Course Curriculum Phases
                  </h4>

                  <div className="divide-y divide-border/60">
                    {selectedCourse.phases.map((phase, idx) => (
                      <div key={phase.title} className="py-3 first:pt-0">
                        <button
                          onClick={() => setExpandedPhase(expandedPhase === idx ? null : idx)}
                          className="w-full py-2.5 text-left flex justify-between items-center hover:text-primary-ink transition-colors"
                        >
                          <span className="font-display font-bold text-body-sm text-foreground tracking-tight">
                            {phase.title}
                          </span>
                          <ChevronRight
                            size={16}
                            className={`text-muted-foreground transition-transform duration-300 ${expandedPhase === idx ? "rotate-90 text-primary-ink" : ""}`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {expandedPhase === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="py-3 pl-2 space-y-4 divide-y divide-border/30">
                                {phase.modules.map(mod => (
                                  <div key={mod.title} className="pt-3 first:pt-0">
                                    <div className="text-label font-mono font-bold text-primary-ink">
                                      {mod.title}
                                    </div>
                                    <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {mod.items.map(item => (
                                        <li key={item} className="flex items-start gap-2 text-label text-muted-foreground">
                                          <Check size={11} className="text-primary-ink stroke-[3px] shrink-0 mt-0.5" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hands-on Projects */}
                <div className="space-y-3 pt-6 border-t border-border/60">
                  <h4 className="text-label font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Industry Portfolio Projects
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {selectedCourse.projectsList.map((project, idx) => (
                      <li key={project} className="py-2.5 border-b border-border/40 text-label font-medium text-foreground/80 flex items-center gap-2.5 text-left">
                        <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary-ink flex items-center justify-center font-mono font-bold shrink-0 text-label">
                          P{idx + 1}
                        </span>
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Portfolio & Career Preparation */}
                <div className="space-y-3 pt-6 border-t border-border/60">
                  <h4 className="text-label font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Portfolio &amp; Career Preparation
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {selectedCourse.portfolioPrep.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-label text-muted-foreground text-left">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Traditional vs AI comparison matrix */}
                <div className="space-y-3 pt-6 border-t border-border/60">
                  <h4 className="text-label font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    How AI Accelerates Learning
                  </h4>
                  <div className="border border-border/70 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse text-label">
                      <thead>
                        <tr className="bg-secondary/40 border-b border-border text-foreground font-mono">
                          <th className="p-3 font-bold border-r border-border w-1/2">Traditional Learning</th>
                          <th className="p-3 font-bold text-primary-ink w-1/2">AI-Augmented Learning</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60 text-muted-foreground">
                        {selectedCourse.aiComparison.map((row, idx) => (
                          <tr key={idx} className="hover:bg-secondary/10">
                            <td className="p-3 border-r border-border leading-relaxed">{row.traditional}</td>
                            <td className="p-3 text-foreground font-medium leading-relaxed">{row.aiAssisted}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-border/80 bg-secondary/10 flex gap-4 shrink-0">
                <Button asChild className="flex-1 bg-primary hover:opacity-90 border-0 text-primary-on rounded-full py-5 h-auto font-semibold">
                  <a
                    href={`https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20interested%20in%20joining%20the%20${encodeURIComponent(selectedCourse.title)}%20program%20for%20${encodeURIComponent(selectedCourse.price)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} fill="currentColor" />
                    Enroll Program: {selectedCourse.price}
                  </a>
                </Button>
                <Button
                  onClick={() => setSelectedCourse(null)}
                  variant="outline"
                  className="rounded-full px-6 py-5 h-auto font-semibold border-border bg-white dark:bg-card"
                >
                  Close Syllabus
                </Button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TechxeraPrograms;
