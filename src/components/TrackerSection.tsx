import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lock, Code, Award, FileText, Swords } from 'lucide-react';

const stats = [
  { number: '20+', label: 'C Projects Built', icon: Code },
  { number: '3', label: 'Languages in Arsenal', sublabel: 'C (Mastered) · R (Mastered) · Python (In Progress)', icon: Swords },
  { number: '177', label: 'C Programming Files Written', icon: FileText },
  { number: '2', label: 'Certifications Earned', icon: Award },
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
          className="text-center mb-6"
        >
          <span className="section-label mb-4 block">Mission Log</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold glow-text-subtle">
            The Journey So Far
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-muted-foreground mb-16 text-sm md:text-base"
        >
          From June 2025 to now (March 2026) — built in just a few months.
        </motion.p>

        {/* Stats Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="glass-card p-6 text-center group hover:border-foreground/30 transition-all duration-500"
            >
              <stat.icon className="w-5 h-5 mx-auto mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div className="text-3xl md:text-4xl font-heading font-bold glow-text-subtle mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              {stat.sublabel && (
                <div className="text-xs text-muted-foreground/60 mt-1">{stat.sublabel}</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
          {/* GirlScript Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass-card-glow p-6"
          >
            <h3 className="font-heading font-bold text-lg glow-text-subtle mb-3">
              GirlScript Summer of Code 2025
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Selected as contributor, led a small team, chose and contributed to multiple open source projects remotely. Collaborated with developers across India to build and improve real-world applications.
            </p>
          </motion.div>

          {/* Python Journey Card - Locked */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            {/* Blurred content */}
            <div className="blur-sm select-none pointer-events-none">
              <h3 className="font-heading font-bold text-lg mb-3">Python Journey</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Python projects, builds and achievements loading...
              </p>
            </div>

            {/* Locked overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[2px]">
              <Lock className="w-6 h-6 text-muted-foreground/60 mb-3" />
              <span className="text-xs font-heading font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-foreground/20 bg-foreground/5 glow-text-subtle animate-pulse-glow">
                Coming Soon
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center text-muted-foreground/60 italic text-sm"
        >
          This is just the beginning. More coming soon.
        </motion.p>
      </div>
    </section>
  );
};
