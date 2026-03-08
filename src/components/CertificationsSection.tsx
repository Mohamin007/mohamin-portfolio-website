import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Loader } from 'lucide-react';

const certifications = [
  {
    title: 'GSSoC 2025',
    subtitle: 'Tech Contributor',
    active: true,
  },
  {
    title: 'Google Gen AI Exchange',
    subtitle: 'Participant',
    active: true,
  },
  {
    title: 'Next certification loading...',
    subtitle: '',
    loading: true,
  },
];

export const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block">Certifications</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold glow-text-subtle">
            Achievements Unlocked
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className={`glass-card-glow p-6 min-w-[250px] text-center ${
                cert.loading ? 'animate-pulse-glow' : ''
              }`}
            >
              <div className="flex justify-center mb-4">
                {cert.loading ? (
                  <Loader className="w-10 h-10 text-muted-foreground animate-spin" />
                ) : (
                  <Award className="w-10 h-10 text-foreground" />
                )}
              </div>
              <h3 className={`font-heading font-semibold text-lg mb-1 ${
                cert.loading ? 'text-muted-foreground' : ''
              }`}>
                {cert.title}
              </h3>
              {cert.subtitle && (
                <p className="text-sm text-muted-foreground">{cert.subtitle}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
