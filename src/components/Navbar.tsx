import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Palette } from 'lucide-react';

type Theme = 'dark' | 'light' | 'custom';

export const Navbar = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'custom');
    if (theme !== 'dark') {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const cycleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'custom'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const navLinks = ['About', 'Skills', 'Projects', 'Tracker', 'Journey', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-card py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-heading font-bold glow-text-subtle">
          MOHAM7N
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 hover:glow-text-subtle"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Theme Switcher */}
        <button
          onClick={cycleTheme}
          className="p-2 rounded-lg border border-foreground/20 hover:border-foreground/50 transition-all duration-300 hover:glow-border"
          aria-label="Switch theme"
        >
          {theme === 'dark' && <Moon className="w-5 h-5" />}
          {theme === 'light' && <Sun className="w-5 h-5" />}
          {theme === 'custom' && <Palette className="w-5 h-5" />}
        </button>
      </div>
    </motion.nav>
  );
};
