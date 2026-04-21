import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Briefcase, TrendingUp, Clock, Target, ChevronRight } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

const ExperienceSection = ({ data }: { data: any }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const experiences = data.experiences || [];

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Work" accent="Experience" subtitle="Architectural Journey" />

        <div className="relative mt-20">
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-teal to-electric opacity-20 transform lg:-translate-x-1/2" />

          <div className="space-y-24">
            {experiences.map((job: any, idx: number) => {
              const bullets = (job.bullets || "").split('\n').filter((b: string) => b.trim().length > 0);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + idx * 0.3, duration: 0.8, ease: "easeOut" }}
                  className="relative grid lg:grid-cols-2 gap-12"
                >
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 top-0 z-20">
                    <motion.div
                      className="w-16 h-16 rounded-2xl border-2 border-primary/20 bg-secondary backdrop-blur-xl flex items-center justify-center shadow-2xl"
                      initial={{ rotate: -45, scale: 0 }}
                      animate={inView ? { rotate: 0, scale: 1 } : {}}
                      transition={{ delay: 0.5 + idx * 0.3, type: "spring" }}
                    >
                      <ThreeDIcon icon={Briefcase} size={24} color="hsl(var(--primary))" />
                    </motion.div>
                  </div>

                  <div className={`ml-24 lg:ml-0 ${idx % 2 === 1 ? "lg:col-start-2" : "lg:text-right"}`}>
                    <ThreeDCard>
                      <div className="glass rounded-3xl p-8 border border-white/5 hover:border-primary/20 transition-all">
                        <div className={`flex items-center gap-3 mb-4 ${idx % 2 === 0 ? "lg:justify-end" : ""}`}>
                          <span className="text-[11px] font-heading font-black tracking-[0.2em] text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                            {job.period}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl font-heading font-black text-foreground mb-1">{job.title}</h3>
                        <p className="text-base text-muted-foreground font-heading font-bold mb-8 italic">
                          {job.company}
                        </p>

                        <ul className={`space-y-3 ${idx % 2 === 0 ? "lg:text-right" : ""}`}>
                          {bullets.map((h: string, i: number) => (
                            <li key={i} className={`flex gap-3 text-sm text-muted-foreground font-body leading-relaxed ${idx % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                              <ChevronRight size={16} className={`text-primary mt-1 flex-shrink-0 ${idx % 2 === 0 ? "rotate-180" : ""}`} />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ThreeDCard>
                  </div>

                  {idx % 2 === 0 && <div className="hidden lg:block" />}
                </motion.div>
              );
            })}
          </div>
        </div>
        {experiences.length === 0 && (
          <p className="text-center text-muted-foreground mt-8 font-body">No experience added yet.</p>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
