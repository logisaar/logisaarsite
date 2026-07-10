import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ExternalLink, QrCode, Award, Share2 } from "lucide-react";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import DecorativeShapes from "@/components/creative/DecorativeShapes";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const Products = () => {
  return (
    <Layout>
      <SEO
        title="Our Products | Customer Retention SaaS | Logisaar"
        description="Explore proprietary SaaS applications built and shipped by Logisaar, including ScanLoyal, our customer loyalty and Google Review growth suite."
        keywords="SaaS products, ScanLoyal, customer loyalty app Odisha, local retail software, Logisaar products"
        canonical="https://www.logisaar.in/products"
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
              <Sparkles size={13} />
              <span>Logisaar Labs</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-display text-5xl md:text-7xl font-bold leading-tight"
            >
              SaaS products, <br />
              <span className="text-gradient">shipped by us.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-muted-foreground text-base md:text-lg mt-6 max-w-xl leading-relaxed"
            >
              We don't just consult on software. We build, host, and maintain our own proprietary SaaS applications.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Flagship Product Showcase */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-6xl mx-auto">
            {/* Details Side — 6 cols */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold">
                <span>FLAGSHIP PRODUCT</span>
              </div>
              <h2 className="font-display text-4xl font-bold text-foreground">
                ScanLoyal
              </h2>
              <p className="text-primary text-base font-semibold leading-relaxed">
                Customer retention &amp; Google reviews growth for local businesses.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                ScanLoyal is a contactless loyalty SaaS application built to modernize physical merchant retail shops, cafes, hotels, restaurants, salons, and beauty parlours. Instead of physical cardboard loyalty stamp cards, customers scan a unique QR code at checkout to log visits, compile points, earn rewards, and leave positive Google reviews.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex gap-2 items-start text-xs text-muted-foreground">
                  <QrCode size={18} className="text-primary mt-0.5 shrink-0" />
                  <span>Unique Table &amp; Counter QRs</span>
                </div>
                <div className="flex gap-2 items-start text-xs text-muted-foreground">
                  <Award size={18} className="text-primary mt-0.5 shrink-0" />
                  <span>Digital Loyalty Stamps Card</span>
                </div>
                <div className="flex gap-2 items-start text-xs text-muted-foreground">
                  <Share2 size={18} className="text-primary mt-0.5 shrink-0" />
                  <span>Google Review Generation</span>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 border-0 text-white rounded-xl px-8 h-12 shadow-glow">
                  <a href="https://loyalty.logisaar.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Visit ScanLoyal Website
                    <ExternalLink size={16} />
                  </a>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="rounded-xl px-8 h-12 border-border/60 hover:bg-secondary">
                  <a href="https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'd%20like%20to%20learn%20more%20about%20deploying%20ScanLoyal%20for%20my%20business." target="_blank" rel="noopener noreferrer">
                    Request Merchant Demo
                  </a>
                </Button>
              </div>
            </div>

            {/* Visual/Mockup Side — 6 cols */}
            <div className="lg:col-span-6 overflow-visible">
              <div className="rounded-3xl border border-border bg-card p-4 shadow-2xl relative overflow-hidden aspect-[16/10] flex flex-col justify-between group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-accent/5 to-transparent pointer-events-none" />
                
                {/* Browser Header */}
                <div className="flex justify-between items-center border-b border-border/40 pb-3 mb-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <span className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="bg-secondary/40 border border-border px-4 py-0.5 rounded-md text-[10px] text-muted-foreground font-mono select-none">
                    loyalty.logisaar.in
                  </div>
                  <div className="w-6" />
                </div>
                
                {/* Visual Dashboard Preview */}
                <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden text-xs">
                  {/* Left Column: Loyalty Card Mockup */}
                  <div className="col-span-7 bg-secondary/20 rounded-xl border border-border/40 p-3.5 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-foreground text-sm font-display">Coffee Bean Café</h4>
                        <p className="text-[10px] text-muted-foreground font-mono">Loyalty Card</p>
                      </div>
                      <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] px-2 py-0.5 rounded-full font-semibold">Active</span>
                    </div>

                    {/* Coffee Cups Stamps Grid */}
                    <div className="grid grid-cols-5 gap-1.5 my-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-primary/20 border border-primary/45 rounded-lg flex items-center justify-center text-primary text-xs font-bold font-mono">
                          ✓
                        </div>
                      ))}
                      <div className="aspect-square bg-secondary border border-border/60 rounded-lg flex items-center justify-center text-muted-foreground/45 text-[10px]">
                        5
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] border-t border-border/20 pt-2 text-muted-foreground">
                      <span>4 of 5 visits complete</span>
                      <span className="text-primary font-bold">1 Free Coffee next!</span>
                    </div>
                  </div>

                  {/* Right Column: GBP Growth & QR Stats */}
                  <div className="col-span-5 flex flex-col gap-3">
                    {/* Google Business Profile Growth Box */}
                    <div className="bg-primary/5 rounded-xl border border-primary/20 p-3 flex flex-col justify-center flex-1">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">Google Growth</p>
                      <h5 className="font-bold text-foreground text-base mt-0.5 font-display">+184%</h5>
                      <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">More 5-star reviews at checkout.</p>
                    </div>

                    {/* QR Code trigger mockup */}
                    <div className="bg-secondary/20 rounded-xl border border-border/40 p-3 flex items-center gap-3 shrink-0">
                      <div className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-foreground font-mono font-bold text-xs shrink-0 select-none">
                        QR
                      </div>
                      <div className="leading-tight">
                        <p className="font-semibold text-foreground text-[10px]">Merchant QR</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">Scan to log visit</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer block */}
                <div className="border-t border-border/40 mt-3 pt-3 flex justify-between items-center text-[10px] text-muted-foreground">
                  <span className="uppercase tracking-widest font-mono text-[9px] text-muted-foreground/60">PROPRIETARY PLATFORM BY LOGISAAR</span>
                  <a href="https://loyalty.logisaar.in/" target="_blank" rel="noopener noreferrer" className="text-primary font-mono font-semibold hover:underline inline-flex items-center gap-1">
                    loyalty.logisaar.in <ArrowRight size={10} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Section about other products */}
      <section className="py-16 relative overflow-hidden bg-secondary/10 border-t border-border/30">
        <div className="container mx-auto px-4 text-center max-w-xl space-y-4">
          <h3 className="font-display font-bold text-lg text-foreground">What's in Development?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our labs are currently prototyping local automated forms and agentic database tools. Specific releases will be made public once stable.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
