import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Brain, ExternalLink } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

interface ProjectsSectionProps {
  data: any;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const projects = data.projects || [];

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Featured" accent="Projects" subtitle="Data Engineering Excellence" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {projects.map((project: any, i: number) => (
            <ProjectCard key={i} project={project} index={i} inView={inView} />
          ))}
        </div>
        {projects.length === 0 && (
          <p className="text-center text-muted-foreground mt-8 font-body">No projects added yet.</p>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, inView }: { project: any; index: number; inView: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const color = "var(--primary)";

  return (
    <ThreeDCard>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 + index * 0.15, duration: 0.8, ease: "easeOut" }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="glass rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/20 transition-colors h-full flex flex-col"
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-secondary/30 flex items-center justify-center">
          {project.thumbnail ? (
            <img 
              src={project.thumbnail} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          ) : (
            <Brain size={48} className="text-primary/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-4 right-4">
            <div className="p-2 rounded-xl glass border border-white/10 shadow-2xl">
              <ThreeDIcon icon={Brain} size={20} color={color} />
            </div>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1">
          <h3 className="font-heading font-black text-xl text-foreground mb-3 group-hover:text-primary transition-colors flex items-center justify-between">
            {project.title}
            {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} className="translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                </a>
            )}
          </h3>

          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mt-auto space-y-6">
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {(project.techStack || []).map((t: string) => (
                <span key={t} className="text-[10px] font-heading font-black uppercase tracking-tighter px-2.5 py-1 rounded-md bg-secondary/50 text-muted-foreground border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </ThreeDCard>
  );
};

export default ProjectsSection;

