import { motion } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import { CosmicDust } from './CosmicDust';
import { WatermarkDust } from './WatermarkDust';
import cosmicFigure from '@/assets/cosmic-entity.png';

export const HeroSection = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-force-dark" style={{ backgroundColor: '#000000' }}>
      {/* Watermark Background Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <WatermarkDust />
        <span className="watermark-text whitespace-nowrap">MOHAMIN</span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20 relative z-10">
        {/* Mobile Layout */}
        <div className="flex flex-col lg:hidden items-center text-center min-h-[90vh] justify-center gap-6">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4 glow-text leading-tight uppercase">
              Mohamin<br />Mir
            </h1>
            <div className="text-lg sm:text-xl text-muted-foreground mb-6 h-6">
              <TypewriterText 
                text="Engineer in the Making. Watch This Space." 
                delay={60}
              />
            </div>
          </motion.div>

          {/* Cosmic Figure - Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="relative flex justify-center items-center w-full"
            style={{ height: '40vh' }}
          >
            <CosmicDust />
            <img
              src={cosmicFigure}
              alt="Cosmic Entity"
              className="relative z-10 object-contain max-h-full"
              style={{
                height: '50vh',
                width: 'auto',
                maxWidth: '100%',
                mixBlendMode: 'screen',
                filter: 'brightness(1.4) contrast(1.5) saturate(1.1) drop-shadow(0 0 15px rgba(255,255,255,0.9)) drop-shadow(0 0 30px rgba(255,255,255,0.6))',
              }}
            />
          </motion.div>

          {/* Buttons - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-xs"
          >
            <a href="#projects" className="hero-btn text-center flex-1">
              View My Work
            </a>
            <a href="#contact" className="hero-btn text-center flex-1">
              Let's Connect
            </a>
          </motion.div>

          {/* About - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-4 px-2"
          >
            <span className="section-label mb-3 block">About</span>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Spent most of his time around machines — not because they're smarter, 
              but because they are better. Master the craft well enough to build 
              things that shouldn't exist yet.
            </p>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-center min-h-[80vh]">
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
              <a href="#projects" className="hero-btn text-center">
                View My Work
              </a>
              <a href="#contact" className="hero-btn text-center">
                Let's Connect
              </a>
            </div>
          </motion.div>

          {/* Center - Cosmic Figure */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="relative flex justify-center items-center overflow-visible"
            style={{ height: '100vh' }}
          >
            <CosmicDust />
            <img
              src={cosmicFigure}
              alt="Cosmic Entity"
              className="relative z-10 object-contain"
              style={{
                height: '140vh',
                width: 'auto',
                maxWidth: 'none',
                mixBlendMode: 'screen',
                filter: 'brightness(1.4) contrast(1.5) saturate(1.1) drop-shadow(0 0 15px rgba(255,255,255,0.9)) drop-shadow(0 0 30px rgba(255,255,255,0.6))',
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
            <p className="mt-6 text-sm italic text-muted-foreground/60 text-right glow-text-subtle">
              — Mohamin
            </p>
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
