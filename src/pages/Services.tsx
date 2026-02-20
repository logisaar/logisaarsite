import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import TextReveal from "@/components/creative/TextReveal";
import MagneticButton from "@/components/creative/MagneticButton";

import serviceWeb from "@/assets/service-web.jpg";
import serviceMobile from "@/assets/service-mobile.jpg";
import serviceAi from "@/assets/service-ai.jpg";
import serviceGrowth from "@/assets/service-growth.jpg";
import serviceDesign from "@/assets/service-design.jpg";
import serviceMotion from "@/assets/service-motion.jpg";

const serviceImages = [serviceWeb, serviceMobile, serviceAi, serviceGrowth, serviceDesign, serviceMotion];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-end relative overflow-hidden pb-16">
        <GradientMesh />
        <div className="container mx-auto px-4 relative z-10 pt-32">
          <TextReveal text="Everything You Need" as="h1" className="font-display text-5xl md:text-7xl font-bold leading-[0.95]" delay={0.2} />
          <TextReveal text="to Go Digital" as="h2" className="font-display text-3xl md:text-5xl font-bold text-gradient leading-[0.95] mt-2" delay={0.5} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-muted-foreground text-lg mt-6 max-w-xl">
            From concept to launch and beyond — end-to-end digital solutions tailored to your business goals.
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, i) => (
        <ServiceBlock key={service.title} service={service} index={i} isEven={i % 2 === 0} image={serviceImages[i]} />
      ))}
    </Layout>
  );
};

const ServiceBlock = ({ service, index, isEven, image }: { service: typeof services[0]; index: number; isEven: boolean; image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = service.icon;

  return (
    <section className={`py-24 ${isEven ? "bg-secondary/20" : ""}`} ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={!isEven ? "md:order-2" : ""}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className="text-white" size={30} />
            </motion.div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
            <ul className="space-y-3 mb-8">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <MagneticButton strength={0.15}>
              <Button asChild className="group bg-gradient-primary hover:opacity-90 border-0 text-white rounded-xl px-8">
                <Link to="/contact">
                  Inquire
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Image instead of icon placeholder */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`aspect-[4/3] rounded-3xl relative overflow-hidden group border border-border/30 ${!isEven ? "md:order-1" : ""}`}
          >
            <img
              src={image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Icon className="text-white/80" size={28} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
