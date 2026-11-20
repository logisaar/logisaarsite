import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import DecorativeShapes from "@/components/creative/DecorativeShapes";
import TeamSection from "@/components/about/TeamSection";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import SEO from "@/components/SEO";
import { BookOpen, Fingerprint, Milestone, Cpu, Sparkles, GraduationCap, Beaker, HelpCircle } from "lucide-react";

const milestones = [
  { year: "Sep 2025", title: "Founded", description: "Logisaar was born with a vision to build intelligent, future-ready digital solutions." },
  { year: "Nov 2025", title: "10+ Projects Delivered", description: "Delivered 10+ projects in just two months across web, software, and automation." },
  { year: "2025", title: "IKURO Launched", description: "Launched IKURO in Nalanda as a programming club bridging academics and industry." },
  { year: "2026", title: "Growing Impact", description: "Expanding globally while nurturing the next generation of technology leaders." },
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="About Logisaar | AI-Native Technology Company in Odisha"
        description="Logisaar is an AI-native technology company based in Odisha. We build custom AI systems, ship AI-native products, and train engineers via IKURO."
        keywords="about Logisaar, AI company Odisha, Chinmay Kumar Panda, Biswanath Prasanna Satyabrata Kar, software engineering Bhubaneswar, IT company Cuttack"
        canonical="https://www.logisaar.in/about"
      />

      {/* Hero Header */}
      <section className="min-h-[50vh] flex items-center relative overflow-hidden">
        <GradientMesh />
        <DecorativeShapes variant="hero" />
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary font-mono text-xs uppercase tracking-[0.2em] mb-4"
            >
              WHO WE ARE
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-display text-5xl md:text-7xl font-bold leading-tight"
            >
              An AI-native <br />
              <span className="text-gradient">technology company.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-muted-foreground text-base md:text-lg mt-6 max-w-xl leading-relaxed"
            >
              Logisaar is an engineering company building AI software, intelligent automation systems, and practical AI education. We help businesses modernize with AI while empowering students and professionals to build the technology of tomorrow.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Section 1: Why Logisaar Exists ── */}
      <section className="py-24 relative overflow-hidden border-t border-border/30 bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <HelpCircle size={13} />
                <span>Purpose</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Why Logisaar Exists
              </h2>
              <p className="text-xl font-bold text-gradient pt-2">
                We created Logisaar to solve all three.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-4">
              {[
                { label: "01", text: "Businesses struggle to adopt AI." },
                { label: "02", text: "Students struggle to gain industry skills." },
                { label: "03", text: "Developers struggle to build production-ready software." },
              ].map((item) => (
                <div key={item.label} className="glass-card p-6 border border-border/50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-mono font-bold text-sm shrink-0">
                    {item.label}
                  </div>
                  <p className="text-base font-semibold text-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: What We Build ── */}
      <section className="py-24 relative overflow-hidden bg-secondary/15 border-t border-border/30">
        <div className="absolute inset-0 animated-grid pointer-events-none opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <Fingerprint size={13} />
                <span>Portfolio</span>
              </div>
              <h2 className="font-display text-3xl font-bold">What We Build</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We focus on shifting technology from theory to concrete, deployed systems across software development, educational frameworks, and advanced agentic research.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* AI Software */}
                <div className="glass-card p-6 border border-border/50 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                      <Cpu size={18} className="text-primary" />
                      AI Software
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        Enterprise applications
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        Automation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        AI systems
                      </li>
                    </ul>
                  </div>
                </div>

                {/* AI Products */}
                <div className="glass-card p-6 border border-border/50 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                      <Sparkles size={18} className="text-primary" />
                      AI Products
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="font-bold text-sm text-foreground flex items-center gap-2">
                          HeyLane
                          <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">
                            Main Product
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium mt-1">
                          Customer loyalty & Google Review growth suite.
                        </p>
                      </div>
                      <div className="border-t border-border/40 pt-3">
                        <div className="font-semibold text-sm text-foreground">
                          Hyperlocal Community App <span className="text-muted-foreground font-normal text-xs">(Name TBA)</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium mt-1">
                          Hyperlocal community application.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Education */}
                <div className="glass-card p-6 border border-border/50 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                      <GraduationCap size={18} className="text-primary" />
                      AI Education
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="font-semibold text-sm text-foreground">IKURO</div>
                        <ul className="mt-1 space-y-1.5 text-xs text-muted-foreground pl-3 list-disc font-medium">
                          <li>Chalk to Choice</li>
                          <li>Workshops</li>
                          <li>Training</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Research */}
                <div className="glass-card p-6 border border-border/50 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                      <Beaker size={18} className="text-primary" />
                      AI Research
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        Agentic AI
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        LLMs
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        Automation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        Future products
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Origins & Foundation ── */}
      <section className="py-24 relative overflow-hidden border-t border-border/30 bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <Milestone size={13} />
                <span>Our Story</span>
              </div>
              <h2 className="font-display text-3xl font-bold">Origins & Foundation</h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
              <p>
                Logisaar was founded in September 2025 by Chinmay Kumar Panda and Biswanath Prasanna Satyabrata Kar — two Computer Science engineers and full-stack developers based in Odisha. Driven by a desire to build high-performance software systems locally, they established the company's registered base in Cuttack, Odisha.
              </p>
              <p>
                In a brief timeline, we successfully built and shipped 15+ custom web, database, and automation projects. This rapid progression proved our execution capabilities and confirmed the local demand for specialized engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Where We're Going ── */}
      <section className="py-24 relative overflow-hidden bg-secondary/15 border-t border-border/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <BookOpen size={13} />
                <span>Our Vision</span>
              </div>
              <h2 className="font-display text-3xl font-bold">Where We're Going</h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
                <p>
                  We believe AI should become practical, accessible, and useful for every business—not just large enterprises.
                </p>
                <p>
                  Over the coming years, Logisaar is focused on building AI products, AI-first enterprise software, and educational platforms that prepare the next generation of engineers for an AI-driven world.
                </p>
              </div>
              
              <div className="border-t border-border/60 pt-6">
                <h4 className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-4">
                  Our ambition is simple:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Build globally.", desc: "Creating world-class technology solutions." },
                    { title: "Start from Odisha.", desc: "Nurturing local talent and tech footprint." },
                    { title: "Create lasting impact.", desc: "Delivering sustainable engineering value." },
                  ].map((amb) => (
                    <div key={amb.title} className="p-4 rounded-xl border border-primary/10 bg-primary/5">
                      <div className="font-bold text-foreground text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {amb.title}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-normal font-medium">
                        {amb.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Journey Timeline ── */}
      <JourneyTimeline milestones={milestones} />

      {/* ── Section 6: Founders ── */}
      <TeamSection />

      {/* ── Section 7: Our Values ── */}
      <section className="py-24 relative overflow-hidden bg-secondary/15 border-t border-border/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-primary text-xs font-mono uppercase tracking-[0.2em] block">
              Principles
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Our Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Build First", desc: "We prioritize writing code and deploying real software over writing slides or conceptual designs." },
              { title: "Think Long Term", desc: "We engineer systems and build relationships that stand the test of time, choosing sustainability over shortcuts." },
              { title: "Ship Fast", desc: "We value speed, momentum, and continuous iteration to get feedback and deliver value rapidly." },
              { title: "Learn Continuously", desc: "We stay curious, embrace new paradigms, and share knowledge to keep pushing technical boundaries." },
              { title: "Own Outcomes", desc: "We take absolute responsibility for what we build and its ultimate impact on the client and user." },
              { title: "Help Others Grow", desc: "We support our team, our clients, and our students through education and mentorship via IKURO." },
            ].map((v, i) => (
              <div 
                key={v.title}
                className="glass-card p-6 border border-border/50 bg-white/40 dark:bg-slate-900/40 flex flex-col justify-between hover:border-primary/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-mono font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-foreground text-lg">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
