import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { projects, categories } from "@/data/projects";
import GradientMesh from "@/components/creative/GradientMesh";
import TextReveal from "@/components/creative/TextReveal";
import { ExternalLink } from "lucide-react";

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-end relative overflow-hidden pb-16">
        <GradientMesh />
        <div className="container mx-auto px-4 relative z-10 pt-32">
          <TextReveal text="Our Work" as="h1" className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]" delay={0.2} />
          <TextReveal text="Speaks for Itself" as="h2" className="font-display text-3xl md:text-5xl font-bold text-gradient leading-[0.95] mt-2" delay={0.5} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-muted-foreground text-lg mt-6 max-w-lg">
            Explore a selection of our recent projects across web, mobile, AI, and e-commerce.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-wrap gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative px-6 py-2.5 text-sm rounded-full transition-all duration-300 font-medium ${active === cat ? "text-white" : "text-muted-foreground hover:text-foreground bg-secondary/50"}`}
              >
                {active === cat && (
                  <motion.div layoutId="filter-bg" className="absolute inset-0 bg-gradient-primary rounded-full -z-10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.05 }}
                  className={`group rounded-2xl overflow-hidden bg-card border border-border cursor-pointer relative block ${i === 0 ? "md:col-span-2" : ""}`}
                >
                  <div className={`overflow-hidden relative ${i === 0 ? "aspect-[21/9]" : "aspect-video"}`}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-2">{project.category}</p>
                      <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-white/70 text-sm max-w-md leading-relaxed hidden md:block">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-white/10 backdrop-blur-sm text-white/80 px-3 py-1.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 mt-4 text-white/80 text-sm font-medium">
                        <ExternalLink className="w-4 h-4" />
                        Visit Site
                      </div>
                    </div>
                  </div>
                  <div className="p-6 group-hover:opacity-0 transition-opacity duration-300">
                    <p className="text-primary text-xs font-medium uppercase tracking-wider mb-1">{project.category}</p>
                    <h3 className="font-display text-lg font-bold">{project.title}</h3>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
