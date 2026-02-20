import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import NoiseTexture from "@/components/creative/NoiseTexture";
import { ExternalLink } from "lucide-react";

const projectColors = [
  "hsl(170 80% 45%)",
  "hsl(260 70% 58%)",
  "hsl(220 80% 50%)",
  "hsl(340 80% 55%)",
  "hsl(30 90% 55%)",
];

const FeaturedProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featured = projects.slice(0, 5);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(featured.length - 1) * 70}%`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Mobile: vertical stacked layout */}
      <section className="md:hidden py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-2">Our Work</p>
            <h2 className="font-display text-3xl font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {featured.map((project, i) => {
              const color = projectColors[i % projectColors.length];
              return (
                <motion.a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden block"
                >
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                  <NoiseTexture opacity={0.04} />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-1">{project.category}</p>
                    <h3 className="font-display text-2xl font-bold text-white leading-tight mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-white/10 backdrop-blur-sm text-white/80 px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="font-display text-4xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}44)` }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link to="/portfolio" className="text-primary font-medium text-sm hover:underline">View all projects →</Link>
          </div>
        </div>
      </section>

      {/* Desktop: horizontal scroll layout */}
      <div ref={containerRef} className="relative hidden md:block" style={{ height: `${featured.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute top-8 left-0 right-0 z-10 container mx-auto px-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-2">Our Work</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold">
                  Featured <span className="text-gradient">Projects</span>
                </h2>
              </div>
              <Link to="/portfolio" className="text-primary font-medium text-sm hover:underline">View all →</Link>
            </div>
            <div className="mt-4 h-[2px] bg-border rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-primary rounded-full" style={{ width: progressWidth }} />
            </div>
          </div>

          <motion.div style={{ x }} className="flex items-center h-full gap-8 pl-[5vw] pt-16">
            {featured.map((project, i) => {
              const color = projectColors[i % projectColors.length];
              return (
                <motion.a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex-shrink-0 w-[65vw] h-[70vh] rounded-2xl overflow-hidden group cursor-pointer block"
                  whileHover={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
                  <NoiseTexture opacity={0.04} />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                  <svg className="absolute top-4 left-4 opacity-30" width="40" height="40" viewBox="0 0 40 40">
                    <path d="M0 0 L40 0 L40 8 L8 8 L8 40 L0 40 Z" fill={color} />
                  </svg>
                  <svg className="absolute bottom-4 right-4 opacity-30 rotate-180" width="40" height="40" viewBox="0 0 40 40">
                    <path d="M0 0 L40 0 L40 8 L8 8 L8 40 L0 40 Z" fill={color} />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <motion.p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-2" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                      {project.category}
                    </motion.p>
                    <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.95] mb-4">{project.title}</h3>
                    <p className="text-white/70 text-sm max-w-md leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-white/10 backdrop-blur-sm text-white/80 px-3 py-1.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-4 h-4" />
                      Visit Site
                    </div>
                  </div>
                  <div className="absolute top-8 right-8">
                    <span className="font-display text-6xl md:text-8xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${color}, ${color}44)` }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProjects;
