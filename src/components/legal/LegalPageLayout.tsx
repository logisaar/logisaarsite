import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string;
  seoCanonical?: string;
  sections: Section[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const LegalPageLayout = ({
  title,
  lastUpdated,
  seoTitle,
  seoDescription,
  seoKeywords,
  seoCanonical,
  sections,
}: LegalPageLayoutProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -55% 0px", // Trigger active state when section is in the viewport center
        threshold: 0,
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [sections]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = window.innerWidth >= 768 ? 140 : 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={seoCanonical}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Legal
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Sidebar Table of Contents */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-36 overflow-y-auto max-h-[70vh] pr-4 space-y-1 py-1 border-l border-border/40 no-scrollbar">
                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-widest pl-4 mb-4">
                  Table of Contents
                </p>
                {sections.map((section) => {
                  const isActive = activeId === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleScroll(section.id)}
                      className={`w-full text-left text-sm py-2 pl-4 transition-all duration-300 relative block border-l-2 -ml-[2px] font-medium ${
                        isActive
                          ? "text-primary border-primary"
                          : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                      }`}
                    >
                      {section.title}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Articles Content Column */}
            <main className="col-span-1 lg:col-span-3">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12"
              >
                {sections.map((section) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    variants={itemVariants}
                    className="scroll-mt-36 border-b border-border/40 pb-12 last:border-0 last:pb-0"
                  >
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground tracking-tight">
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground leading-relaxed text-base space-y-4 prose prose-neutral dark:prose-invert max-w-none">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </main>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalPageLayout;
