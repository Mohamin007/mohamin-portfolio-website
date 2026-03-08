import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lock } from 'lucide-react';

const timeline = [
  {
    year: '2025',
    title: 'Enrolled in FYIMP Data Science & AI',
    description: 'Kashmir University. Ranked 6th out of 1500+ applicants.',
    completed: true,
  },
  {
    year: '2025',
    title: 'Built C programming foundation',
    description: '177 files, 12 topic folders, 20+ mini projects. Also explored IoT, Arduino and networks.',
    completed: true,
  },
  {
    year: '2026',
    title: 'Deepening skills & exploring new frontiers',
    description: 'Python mastery + R Programming + Data Science fundamentals + learning new programming languages.',
    completed: false,
    current: true,
  },
  {
    year: '2027+',
    title: 'LOCKED',
    description: 'The future awaits...',
    locked: true,
  },
];

export const JourneySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="journey" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block">Journey</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold glow-text-subtle">
            Level Progression
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-foreground/30 via-foreground/10 to-transparent" />

          {timeline.map((item, index) => (
            <motion.div
              key={`${item.year}-${item.title}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className={`relative pl-12 md:pl-0 pb-12 last:pb-0 ${
                index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:text-left'
              }`}
            >
              {/* Node */}
              <div
                className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 ${
                  item.locked
                    ? 'timeline-node-locked'
                    : item.completed
                    ? 'timeline-node'
                    : 'timeline-node animate-pulse'
                }`}
              >
                {item.locked && (
                  <Lock className="w-2.5 h-2.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/50" />
                )}
              </div>

              {/* Content */}
              <div
                className={`${
                  item.locked ? 'opacity-40' : ''
                } ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
              >
                <span className="text-sm text-muted-foreground font-mono">{item.year}</span>
                <h3 className={`font-heading font-semibold text-lg mt-1 ${
                  item.completed ? 'glow-text-subtle' : ''
                }`}>
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
