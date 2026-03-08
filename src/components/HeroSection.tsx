import { motion } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import cosmicFigure from '@/assets/cosmic-entity.png';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Watermark Background Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="watermark-text whitespace-nowrap">MOHAMIN</span>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-center min-h-[80vh]">
          {/* Left - Name & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 glow-text leading-tight uppercase">
              Mohamin<br />Mir
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-8">
              <TypewriterText 
                text="Engineer in the Making. Watch This Space." 
                delay={60}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="btn-cosmic text-center">
                View My Work
              </a>
              <a href="#contact" className="btn-cosmic text-center">
                Let's Connect
              </a>
            </div>
          </motion.div>

          {/* Center - Cosmic Figure */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="relative flex justify-center items-center"
            style={{ height: '80vh' }}
          >
            {/* Radial glow behind figure */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="entity-glow-pulse rounded-full" style={{
                width: '70%',
                height: '70%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
                filter: 'blur(40px)',
              }} />
            </div>

            <img
              src={cosmicFigure}
              alt="Cosmic Entity"
              className="relative z-10 h-[85vh] w-auto max-w-none object-contain entity-glow-pulse-subtle"
              style={{
                mixBlendMode: 'screen',
                background: 'none',
                border: 'none',
                boxShadow: 'none',
                filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 0 40px rgba(255,255,255,0.8)) drop-shadow(0 0 80px rgba(255,255,255,0.4)) drop-shadow(0 0 120px rgba(255,255,255,0.2))',
              }}
            />
          </motion.div>

          {/* Right - About */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-left lg:text-right"
          >
            <span className="section-label mb-4 block">About</span>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Spent most of his time around machines — not because they're smarter, 
              but because they are better. Started learning their language. Their code. 
              Their data. The logic buried deep inside them that makes them quietly 
              unstoppable. The goal is simple: master the craft well enough to build 
              things that shouldn't exist yet.
            </p>
            <div className="text-sm text-muted-foreground/70">
              <span className="inline-block mr-3">Age: 19</span>
              <span className="inline-block mr-3">·</span>
              <span className="inline-block mr-3">Kashmir, India</span>
              <span className="inline-block mr-3">·</span>
              <span className="inline-block mr-3">FYIMP Data Science & AI</span>
              <span className="inline-block mr-3">·</span>
              <span className="inline-block">2025–2030</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-foreground/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};
