import { useState, useRef, useEffect } from "react";
import Eyebrow from "@/components/Eyebrow";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, MessageCircle, Check, Target, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChalkToChoice = () => {
  const [isChalkToChoiceOpen, setIsChalkToChoiceOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsChalkToChoiceOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isChalkToChoiceOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isChalkToChoiceOpen]);

  return (
    <>
      <section data-logi="Chalk to Choice is for Class 11 and 12." className="py-section relative overflow-hidden border-t border-border/30 bg-secondary/15">
        <div className="container mx-auto px-gutter relative z-10 max-w-[81.25rem]">

          <div className="max-w-5xl mx-auto rounded-3xl border border-border/80 bg-card p-8 md:p-12 relative overflow-hidden shadow-xl">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Side: Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <Eyebrow>Part of IKURO · Class 11 &amp; 12</Eyebrow>
                <h2 className="font-display text-h2 font-bold text-foreground">
                  Chalk to Choice: from classroom to career
                </h2>
                <p className="text-primary-ink text-body-sm font-semibold tracking-wide uppercase font-mono leading-relaxed">
                  Career-Clarity Program for Class 11 & 12 Students
                </p>
                <blockquote className="border-l-2 border-primary/50 pl-4 italic text-muted-foreground text-body-sm">
                  "The last bell has rung. Now it's your turn to choose."
                </blockquote>
                <p className="text-muted-foreground text-body-sm md:text-body leading-relaxed">
                  You've just finished your 12th exams. The school bell has rung for the last time. Now comes the most important question of your life — What Next? <strong>Chalk to Choice</strong> is a 15-day online career counselling + awareness course designed for PCM and PCB students from all boards to get a clear, honest, and complete picture of every career path available after 12th.
                </p>

                <div className="text-body-sm font-mono text-muted-foreground flex flex-wrap gap-x-6 gap-y-2">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> PCM & PCB Streams</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> All School Boards</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Bhubaneswar, India</span>
                </div>
              </div>

              {/* Right Side: Editorial Split */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8 p-6 md:p-8 rounded-3xl bg-secondary/30 border border-border/50 text-left">

                {/* 3-stat row in font-mono */}
                <div className="grid grid-cols-3 gap-4 pb-6 border-b border-border/60">
                  <div className="text-left space-y-1">
                    <div className="text-3xl font-extrabold text-foreground font-mono tracking-tight">15</div>
                    <div className="text-label font-mono uppercase text-muted-foreground tracking-wider leading-tight">Days Program</div>
                  </div>
                  <div className="text-left space-y-1">
                    <div className="text-3xl font-extrabold text-foreground font-mono tracking-tight">7+</div>
                    <div className="text-label font-mono uppercase text-muted-foreground tracking-wider leading-tight">Streams</div>
                  </div>
                  <div className="text-left space-y-1">
                    <div className="text-3xl font-extrabold text-foreground font-mono tracking-tight">50+</div>
                    <div className="text-label font-mono uppercase text-muted-foreground tracking-wider leading-tight">Exams</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-label font-mono uppercase text-muted-foreground tracking-wider font-semibold">Registration Fee</div>
                    <div className="text-3xl font-bold text-foreground font-mono mt-1">₹2,500 <span className="text-label font-normal text-muted-foreground font-sans">Only</span></div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                    <Button onClick={() => setIsChalkToChoiceOpen(true)} className="flex-1 bg-white dark:bg-card hover:bg-secondary/40 border border-border text-foreground rounded-full py-4 h-auto font-semibold">
                      View Details
                    </Button>
                    <Button asChild className="flex-1 bg-primary hover:opacity-90 text-primary-on rounded-full py-4 h-auto font-semibold border-0">
                      <a
                        href="https://wa.me/918596072510?text=Hi%20Logisaar%20IKURO%2C%20I%27m%20interested%20in%20registering%20for%20the%20Chalk%20to%20Choice%20program."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={16} fill="currentColor" />
                        Register Now
                      </a>
                    </Button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      <AnimatePresence>
        {isChalkToChoiceOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChalkToChoiceOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[85svh] md:max-h-[90svh] bg-white dark:bg-slate-900 border border-border/80 rounded-3xl shadow-2xl overflow-y-auto flex flex-col z-10"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-20 border-b border-border/60 p-6 flex justify-between items-start">
                <div className="space-y-1.5 text-left">
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary-ink text-label font-semibold px-3 py-1 rounded-full uppercase tracking-wide font-mono">
                    Featured Initiative
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                    Chalk to Choice — From Classroom to Career
                  </h3>
                  <p className="text-primary-ink text-body-sm font-semibold tracking-wide uppercase font-mono leading-relaxed">
                    Career-Clarity Program for Class 11 & 12 Students
                  </p>
                </div>
                <button
                  onClick={() => setIsChalkToChoiceOpen(false)}
                  className="w-10 h-10 rounded-full border border-border/60 hover:bg-secondary/40 flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8 flex-1 overflow-y-auto text-left leading-relaxed">

                {/* Intro Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-8 space-y-4">
                    <h4 className="text-lg font-bold text-foreground font-display">What Is Chalk to Choice?</h4>
                    <p className="text-muted-foreground text-body-sm">
                      You've just finished your 12th exams. The school bell has rung for the last time. Now comes the most important question of your life — <strong>What Next?</strong>
                    </p>
                    <p className="text-muted-foreground text-body-sm">
                      <strong>Chalk to Choice</strong> is a 15-day online career counselling + awareness course designed for PCM and PCB students from all school boards who want a clear, honest, and complete picture of every career path available after 12th. No vague theories, only real fact-based roadmaps.
                    </p>
                  </div>
                  <div className="md:col-span-4 space-y-3 pt-6 border-t md:border-t-0 md:border-l border-border/60 md:pl-6">
                    <div className="text-label font-mono uppercase text-muted-foreground tracking-wider font-semibold font-bold">Course Details</div>
                    <ul className="text-label text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">✓ <strong className="font-mono">15 Days</strong> structured learning</li>
                      <li className="flex items-center gap-2">✓ <strong>Online + Recorded</strong> watch anytime</li>
                      <li className="flex items-center gap-2">✓ <strong>All Boards</strong> welcome (CBSE, CHSE, ICSE)</li>
                      <li className="flex items-center gap-2">✓ <strong>Location:</strong> Bhubaneswar, India</li>
                    </ul>
                  </div>
                </div>

                {/* Core Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border/60">
                  {[
                    { title: "No More Confusion", desc: "One course. Every path. From Engineering to IAS, Medical to Design." },
                    { title: "Real, Not Reel", desc: "No YouTube surface info. Deep, honest guidance backed by real exam facts & data." },
                    { title: "Affordable", desc: "Just Rs.2,500. Comprehensive PDF notes and Certificate included." },
                    { title: "Online + Recorded", desc: "Watch live or on-demand anytime. Revisit any session as needed." }
                  ].map((benefit, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="text-body-sm font-bold text-foreground font-display">{benefit.title}</div>
                      <div className="text-label text-muted-foreground leading-relaxed">{benefit.desc}</div>
                    </div>
                  ))}
                </div>

                {/* What You Discover */}
                <div className="space-y-4 pt-6 border-t border-border/60">
                  <h4 className="text-lg font-bold text-foreground font-display">What You Will Discover in 15 Days</h4>
                  <p className="text-body-sm text-muted-foreground">
                    We cover every major career path after 12th — and show you where each one leads, step by step. No vague advice. Real roadmaps.
                  </p>
                  <div className="border border-border/70 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse text-label">
                      <thead>
                        <tr className="bg-secondary/40 border-b border-border text-foreground font-mono">
                          <th className="p-3 font-bold border-r border-border w-1/3">Career Stream</th>
                          <th className="p-3 font-bold w-2/3">What We Cover</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60 text-muted-foreground">
                        {[
                          { path: "Engineering", cover: "JEE Main & Advanced, 8+ branches explained, career options, GATE, MS abroad options" },
                          { path: "Medical & Allied Health", cover: "NEET-UG, MBBS, BDS, Nursing, Pharmacy, Physiotherapy & allied medical fields" },
                          { path: "Government & Defence", cover: "UPSC, SSC, Railway, Banking, NDA — who can apply, when to apply, and eligibility" },
                          { path: "Pure Sciences", cover: "BSc Honours, IISER research portals, MSc, PhD — scientific research & academia paths" },
                          { path: "Business & Management", cover: "BBA, CA, CS, CMA, MBA — the corporate, finance, commerce & startup world" },
                          { path: "Law, Design & Architecture", cover: "CLAT, NID, NIFT, NATA — for creative, analytical, and artistic minds" },
                          { path: "Post-Graduation Exams", cover: "GATE, CAT, GRE, GMAT, UGC NET — what options open up after graduation" }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-secondary/10">
                            <td className="p-3 border-r border-border font-bold text-foreground">{row.path}</td>
                            <td className="p-3 leading-relaxed">{row.cover}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Special Workshops */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border/60">
                  <div className="space-y-2">
                    <div className="text-body-sm font-bold text-primary-ink flex items-center gap-1.5 font-display">
                      <Target size={15} />
                      <span>★ IAS / IPS Dream Workshop</span>
                    </div>
                    <p className="text-label text-muted-foreground leading-relaxed">
                      Want to become an IAS or IPS officer? We map the full UPSC journey — from which graduation degree to choose, to Prelims, Mains, Interview, and final selection, including optional subject selection for PCM/PCB students.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-body-sm font-bold text-primary-ink flex items-center gap-1.5 font-display">
                      <Laptop size={15} />
                      <span>★ Engineering Dream Path Workshop</span>
                    </div>
                    <p className="text-label text-muted-foreground leading-relaxed">
                      Already targeting JEE? We decode JEE rank vs college vs branch — and show you exactly what life looks like after BTech: placements, GATE, MS abroad, or tech startups.
                    </p>
                  </div>
                </div>

                {/* Future Tech */}
                <div className="pt-6 border-t border-border/60 space-y-3">
                  <h5 className="text-body-sm font-bold text-foreground font-display">Future Tech — For Every Student, Every Stream</h5>
                  <p className="text-label text-muted-foreground leading-relaxed">
                    No matter which path you choose — engineering, medical, law, or science — technology is changing every field. We give you a critical awareness of the trends that will shape your career decade:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Artificial Intelligence & ML",
                      "Drones & Robotics",
                      "IoT & Automation",
                      "Startups & Entrepreneurship",
                      "Digital Skills & Freelancing",
                      "Blockchain & Web3"
                    ].map((tech) => (
                      <span key={tech} className="bg-secondary/60 border border-border/40 text-label font-mono px-2.5 py-1 rounded-full text-muted-foreground">
                        ✦ {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-border/60">
                  <div className="space-y-3">
                    <h5 className="text-body-sm font-bold text-foreground font-display">Course Highlights</h5>
                    <ul className="text-label text-muted-foreground space-y-2">
                      {[
                        "15 Days structured learning, one topic per day, no rush",
                        "Online + Recorded: Attend live or watch anytime on demand",
                        "All Boards Welcome: CBSE, State Board (CHSE), ICSE/ISC",
                        "Digital PDF Notes: Complete study material sent after course",
                        "Official Completion Certificate from IKURO",
                        "Live Q&A: Ask your doubts directly to the instructor every day",
                        "Exam Registration Help: Walkthrough of JEE/NEET forms live on screen",
                        "Personal Roadmap: Signed, personalized career action sheet"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={14} className="text-primary-ink mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-secondary/20 border border-border/80 p-6 rounded-3xl flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-label font-mono uppercase text-muted-foreground tracking-wider font-semibold">Program Cost</div>
                      <div className="text-3xl font-extrabold text-foreground font-mono">₹2,500 <span className="text-label font-normal text-muted-foreground font-sans">Only</span></div>
                      <p className="text-label text-muted-foreground">PDF notes, completion certificate, and live Q&A session access included. Printed booklet available as an optional add-on.</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-border/60">
                      <div className="text-label font-mono text-muted-foreground">Inquiries &amp; Registration:</div>
                      <div className="text-label text-foreground font-medium">
                        📧 techxeraclub@thenalanda.com <br />
                        📞 +91 85960 72510
                      </div>
                    </div>

                    <Button asChild className="w-full bg-primary hover:opacity-95 text-primary-on rounded-full py-4 h-auto font-semibold">
                      <a
                        href="https://wa.me/918596072510?text=Hi%20Logisaar%20IKURO%2C%20I%27m%20interested%20in%20registering%20for%20the%20Chalk%20to%20Choice%20program."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={16} fill="currentColor" />
                        Register on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChalkToChoice;
