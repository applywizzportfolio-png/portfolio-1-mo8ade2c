import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Cpu } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

interface SkillsSectionProps {
  data: any;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ data }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const skills = data.skills || [];

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Tech" accent="Stack" subtitle="Precision Engineering" />
        
        <div className="mt-12">
            <ThreeDCard>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                className="glass border border-white/5 rounded-3xl p-10 md:p-16 hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-secondary/50 border border-white/5 shadow-inner">
                    <ThreeDIcon icon={Cpu} size={28} color="hsl(var(--primary))" />
                  </div>
                  <h3 className="text-2xl font-heading font-black tracking-tight text-foreground">Core Competencies</h3>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {skills.map((skill: string, si: number) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 + si * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: "hsl(var(--primary))",
                        color: "white"
                      }}
                      className="text-xs md:text-sm font-heading font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl bg-muted/40 text-muted-foreground border border-white/5 transition-all cursor-pointer select-none"
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {skills.length === 0 && (
                    <p className="text-muted-foreground font-body">No skills added yet.</p>
                  )}
                </div>
              </motion.div>
            </ThreeDCard>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

