import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { GraduationCap } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

interface EducationSectionProps {
  data: any;
}

const EducationSection: React.FC<EducationSectionProps> = ({ data }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const educations = data.educations || [];

  return (
    <section id="education" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Academic" accent="Foundation" subtitle="Education" />

        <div className="space-y-8 mt-16">
          {educations.map((edu: any, i: number) => (
            <ThreeDCard key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="glass rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-white/5 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
                
                <div className="w-20 h-20 rounded-3xl bg-secondary border border-white/10 flex items-center justify-center flex-shrink-0 shadow-2xl">
                  <ThreeDIcon icon={GraduationCap} size={36} color="hsl(var(--primary))" />
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <h3 className="font-heading font-black text-3xl text-foreground tracking-tighter mb-2">{edu.degree}</h3>
                  <p className="text-xl text-muted-foreground font-heading font-bold mb-4">{edu.institution}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-white/5 justify-center md:justify-start">
                    <div>
                      <p className="text-[10px] font-heading font-black tracking-widest text-muted-foreground uppercase mb-1">Year</p>
                      <p className="text-sm font-heading font-bold text-foreground">{edu.year}</p>
                    </div>
                    {edu.grade && (
                       <>
                        <div className="w-px h-8 bg-white/5 hidden sm:block" />
                        <div>
                        <p className="text-[10px] font-heading font-black tracking-widest text-muted-foreground uppercase mb-1">Grade</p>
                        <p className="text-sm font-heading font-bold text-primary">{edu.grade}</p>
                        </div>
                       </>
                    )}
                  </div>
                </div>
              </motion.div>
            </ThreeDCard>
          ))}
          {educations.length === 0 && (
            <p className="text-center text-muted-foreground font-body">No education details added yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;


