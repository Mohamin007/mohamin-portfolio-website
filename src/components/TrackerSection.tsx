import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lock, Zap } from 'lucide-react';

const years = [
  {
    year: 'Year 1',
    title: 'Foundation',
    items: ['Python mastery', 'Git', 'CS50P'],
    progress: 40,
    active: true,
  },
  {
    year: 'Year 2',
    title: 'Data Fundamentals',
    items: ['SQL', 'NumPy', 'Pandas', 'Kaggle', 'First internship'],
    progress: 0,
    active: false,
  },
  {
    year: 'Year 3',
    title: 'Machine Learning',
    items: ['Andrew Ng ML Specialization', 'AWS'],
    progress: 0,
    active: false,
  },
  {
    year: 'Year 4',
    title: 'Advanced AI',
    items: ['LLM/GenAI', 'FastAPI', 'Docker', 'Streamlit'],
    progress: 0,
    active: false,
  },
  {
    year: 'Year 5',
    title: 'Launch',
    items: ['Thesis', 'Job applications'],
    progress: 0,
    active: false,
  },
];

export const TrackerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="tracker" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block">Mission Board</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold glow-text-subtle">
            ML Study Tracker
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {years.map((year, index) => (
            <motion.div
              key={year.year}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`glass-card p-6 ${
                year.active
                  ? 'border-foreground/30'
                  : 'opacity-50 border-muted-foreground/10'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {year.active ? (
                    <Zap className="w-5 h-5 text-foreground animate-pulse" />
                  ) : (
                    <Lock className="w-5 h-5 text-muted-foreground/50" />
                  )}
                  <span className="font-heading font-bold text-lg">{year.year}</span>
                  <span className="text-muted-foreground text-sm">— {year.title}</span>
                  {year.active && (
                    <span className="text-xs bg-foreground/10 px-2 py-1 rounded-full border border-foreground/20">
                      ACTIVE
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{year.progress}%</span>
              </div>

              <div className="progress-bar-cosmic mb-4">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${year.progress}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {year.items.map((item) => (
                  <span
                    key={item}
                    className={`text-xs px-3 py-1 rounded-full ${
                      year.active
                        ? 'bg-foreground/10 text-foreground/80'
                        : 'bg-muted text-muted-foreground/50'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
