import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';

type SkillLevel = 'Strong Foundation' | 'In Progress' | 'Exploring';

interface Skill {
  name: string;
  level: SkillLevel;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'C', level: 'Strong Foundation' },
      { name: 'Python', level: 'In Progress' },
      { name: 'R', level: 'Strong Foundation' },
      { name: 'LaTeX', level: 'Strong Foundation' },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 'Exploring' },
      { name: 'GitHub', level: 'Exploring' },
      { name: 'Arduino', level: 'Exploring' },
      { name: 'VS Code', level: 'Exploring' },
      { name: 'PyCharm', level: 'Exploring' },
      { name: 'Jupyter', level: 'Exploring' },
    ],
  },
  {
    title: 'Domains',
    skills: [
      { name: 'Data Science', level: 'Exploring' },
      { name: 'Machine Learning', level: 'Exploring' },
      { name: 'Generative AI', level: 'Exploring' },
      { name: 'IoT', level: 'Exploring' },
      { name: 'Networks', level: 'Exploring' },
    ],
  },
  {
    title: 'Currently Deepening',
    skills: [
      { name: 'Advanced Python', level: 'In Progress' },
      { name: 'Data Science Fundamentals', level: 'Exploring' },
      { name: 'Computer Networks', level: 'Exploring' },
    ],
  },
];

const levelColor: Record<SkillLevel, string> = {
  'Strong Foundation': 'border-foreground/40 text-foreground/90 bg-foreground/10',
  'In Progress': 'border-foreground/25 text-foreground/70 bg-foreground/5',
  'Exploring': 'border-foreground/15 text-muted-foreground bg-foreground/[0.03]',
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block">Skills</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold glow-text-subtle">
            Technologies & Tools
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + catIndex * 0.15 }}
              className="glass-card-glow p-6"
            >
              <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-5 glow-text-subtle">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + catIndex * 0.15 + skillIndex * 0.08 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span className="skill-chip">{skill.name}</span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0 rounded-full ${levelColor[skill.level]}`}
                    >
                      {skill.level}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center text-muted-foreground/70 italic mt-12"
        >
          Expanding every semester. This list is just getting started.
        </motion.p>
      </div>
    </section>
  );
};
