import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, BookOpen, MessageCircle, HelpCircle } from "lucide-react";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import DecorativeShapes from "@/components/creative/DecorativeShapes";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const courses = [
  { title: "Full Stack Web Development Using AI", outcome: "Build production-ready web apps from design mockup to deployment in weeks using AI-augmented coding toolchains." },
  { title: "App Development Using AI", outcome: "Build and compile cross-platform mobile apps for iOS & Android utilizing AI prompting and generation workflows." },
  { title: "Cybersecurity Using AI", outcome: "Analyze code vulnerabilities and automate network threat detection using customized local AI security configurations." },
  { title: "Agent Engineering Using AI", outcome: "Design, program, and wire autonomous multi-agent systems and custom LLM functions to execute business pipelines." },
  { title: "Data Analytics & Business Intelligence Using AI", outcome: "Extract databases, automate predictive trends, and generate custom report graphics using AI analytics plugins." },
  { title: "Python Full Stack Development Using AI", outcome: "Develop secure backend scripts and APIs with python, supported by advanced automated code-completion modules." },
  { title: "Computer Vision Using AI", outcome: "Train and deploy deep-learning object recognition models for custom cameras, scanners, and automated sensors." },
  { title: "Data Science & Machine Learning Using AI", outcome: "Clean datasets, construct predictive ML neural pipelines, and extract insights using advanced ML frameworks." },
  { title: "Digital Marketing Using AI", outcome: "Write high-ranking SEO copywriting, automate graphic generations, and analyze target ads using smart marketing models." },
  { title: "Video Editing & Content Creation Using AI", outcome: "Edit video footage, create custom graphics, and generate professional subtitles using automated timelines." },
  { title: "Business & Entrepreneurship Using AI", outcome: "Scaffold legal structures, write financial projections, and automate customer pipelines with modern AI platforms." },
  { title: "Interview & Placement Program Using AI", outcome: "Optimize resumes, run mock video interview simulations, and solve technical assessment scripts with real-time feedback." }
];

const TechXera = () => {
  return (
    <Layout>
      <SEO
        title="TechXera by Logisaar | AI-Augmented Training & Skills in Odisha"
        description="Industry skill development courses in Web Dev, App Dev, ML, Cybersecurity and Agentic AI built around modern AI workflows. Home of Chalk to Choice."
        keywords="TechXera, programming course Bhubaneswar, AI classes Cuttack, Chalk to Choice Odisha, computer training, Logisaar"
        canonical="https://www.logisaar.in/techxera"
      />

      {/* Hero */}
      <section className="min-h-[50vh] flex items-center relative overflow-hidden">
        <GradientMesh />
        <DecorativeShapes variant="hero" />
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
            >
              <GraduationCap size={13} />
              <span>TechXera Division</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-display text-5xl md:text-7xl font-bold leading-tight"
            >
              The part of Logisaar <br />
              <span className="text-gradient">that teaches AI.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-muted-foreground text-base md:text-lg mt-6 max-w-xl leading-relaxed"
            >
              Industry training and skill development, built around AI-augmented workflows — not theory, not generic bootcamp material.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Feature block: Chalk to Choice ── */}
      <section className="py-20 relative overflow-hidden border-t border-border/30 bg-secondary/10">
        <div className="absolute inset-0 animated-grid pointer-events-none opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto rounded-3xl border border-border/80 bg-card p-8 md:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-primary/10 rounded-full blur-[80px] -z-10" />
            <div className="absolute -left-24 -top-24 w-80 h-80 bg-accent/10 rounded-full blur-[80px] -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full font-mono">
                  Featured Initiative
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Chalk to Choice
                </h2>
                <p className="text-primary text-sm font-semibold tracking-wide uppercase">
                  Career-Clarity Program for Class 11 &amp; 12 Students
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Moving students beyond traditional textbooks. We provide structured career guidance, introduce computer science fundamentals, and demonstrate how to build real-world software applications using modern AI technologies.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Interactive tech workshops
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    AI programming tools exposure
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    1-on-1 counselor reviews
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Details on request
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4 p-6 rounded-2xl bg-secondary/40 border border-border/50 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary mb-2">
                  <HelpCircle size={24} />
                </div>
                <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider">Tuition Fees</div>
                <div className="text-lg font-bold text-foreground">Details on Request</div>
                <Button asChild className="w-full bg-gradient-primary hover:opacity-90 text-white rounded-xl py-5 h-auto">
                  <a
                    href="https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20interested%20in%20information%20about%20the%20Chalk%20to%20Choice%20program."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} fill="currentColor" />
                    Inquire via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12 Courses Grid ── */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <BookOpen size={13} />
              <span>Syllabus Grid</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              12 Industry-Centric <span className="text-gradient">AI Programs</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Learn practical development workflows backed by AI integrations. No theoretical lectures, only project building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courses.map((course, idx) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: (idx % 3) * 0.08, duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-card border border-border/60 hover:border-primary/40 hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs text-muted-foreground font-mono">Module {String(idx + 1).padStart(2, "0")}</span>
                    <span className="text-[10px] bg-secondary text-primary border border-primary/20 font-bold px-2 py-0.5 rounded-full">
                      Pricing on request
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mt-4 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {course.outcome}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/20">
                  <Button asChild variant="ghost" className="w-full text-xs text-muted-foreground hover:text-primary hover:bg-secondary font-mono flex items-center justify-between group rounded-xl">
                    <a
                      href={`https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20interested%20in%20joining%20the%20${encodeURIComponent(course.title)}%20program.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>INQUIRE DETAILS</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TechXera;
