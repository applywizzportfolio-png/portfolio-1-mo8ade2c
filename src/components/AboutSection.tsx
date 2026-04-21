import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cog, Zap, Building2, RefreshCw, ShieldCheck } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

interface AboutSectionProps {
  data: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const summary = data.summary || "No summary provided.";

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader title="About" accent="Me" subtitle="The Architect" />
          
          <ThreeDCard>
            <div className="glass rounded-3xl p-10 md:p-16 space-y-10 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -z-10" />
              
              <div className="text-xl md:text-2xl text-muted-foreground font-body leading-relaxed max-w-4xl mx-auto text-center md:text-left">
                {summary}
              </div>
            </div>
          </ThreeDCard>
        </motion.div>
      </div>
    </section>
  );
};

export const SectionHeader = ({ title, accent, subtitle }: { title: string; accent?: string; subtitle: string }) => (
  <div className="mb-16">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-transparent" />
      <span className="text-xs font-heading font-black tracking-[0.4em] text-primary uppercase">{subtitle}</span>
    </div>
    <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-none">
      <span className="text-foreground">{title}</span>
      {accent && <span className="gradient-text"> {accent}</span>}
    </h2>
  </div>
);

export default AboutSection;

