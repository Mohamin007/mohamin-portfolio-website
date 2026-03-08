import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'ATM Simulator',
    tech: 'C',
    description: 'Console-based banking simulation',
    link: 'https://github.com/Mohamin007',
  },
  {
    title: 'Brownie Shop System',
    tech: 'C',
    description: 'Shop management with file handling',
    link: 'https://github.com/Mohamin007',
  },
  {
    title: 'Penalty Shootout Game',
    tech: 'C',
    description: 'Interactive CLI game',
    link: 'https://github.com/Mohamin007',
  },
  {
    title: 'Calorie Tracker',
    tech: 'C',
    description: 'Health tracking with data storage',
    link: 'https://github.com/Mohamin007',
  },
  {
    title: 'GK Quiz App',
    tech: 'C',
    description: 'Multi-topic quiz with scoring',
    link: 'https://github.com/Mohamin007',
  },
  {
    title: 'Artifact Grid Game',
    tech: 'C',
    description: 'Grid-based puzzle game',
    link: 'https://github.com/Mohamin007',
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block">Projects</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold glow-text-subtle">
            What I've Built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass-card-glow p-6 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-heading font-semibold group-hover:glow-text-subtle transition-all">
                  {project.title}
                </h3>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
              <span className="text-xs text-muted-foreground/70 font-mono">{project.tech}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Mohamin007"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cosmic inline-flex items-center gap-2"
          >
            <span>github.com/Mohamin007</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
