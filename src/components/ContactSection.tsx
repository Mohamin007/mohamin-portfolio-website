import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Linkedin, Github, Mail, Instagram } from 'lucide-react';

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block">Contact</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold glow-text-subtle">
            Let's Connect
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <a
              href="https://linkedin.com/in/moham7n"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-glow p-6 flex items-center gap-4 group"
            >
              <Linkedin className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div>
                <p className="font-heading font-semibold group-hover:glow-text-subtle transition-all">LinkedIn</p>
                <p className="text-sm text-muted-foreground">linkedin.com/in/moham7n</p>
              </div>
            </a>

            <a
              href="https://github.com/Mohamin007"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-glow p-6 flex items-center gap-4 group"
            >
              <Github className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div>
                <p className="font-heading font-semibold group-hover:glow-text-subtle transition-all">GitHub</p>
                <p className="text-sm text-muted-foreground">github.com/Mohamin007</p>
              </div>
            </a>

            <a
              href="mailto:myselfmohamin@gmail.com"
              className="glass-card-glow p-6 flex items-center gap-4 group"
            >
              <Mail className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div>
                <p className="font-heading font-semibold group-hover:glow-text-subtle transition-all">Email</p>
                <p className="text-sm text-muted-foreground">myselfmohamin@gmail.com</p>
              </div>
            </a>

            <a
              href="https://instagram.com/mohamin.py"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-glow p-6 flex items-center gap-4 group"
            >
              <Instagram className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div>
                <p className="font-heading font-semibold group-hover:glow-text-subtle transition-all">Instagram</p>
                <p className="text-sm text-muted-foreground">mohamin.py</p>
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full glass-card px-4 py-3 bg-transparent border-foreground/20 focus:border-foreground/50 focus:outline-none transition-colors placeholder:text-muted-foreground"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full glass-card px-4 py-3 bg-transparent border-foreground/20 focus:border-foreground/50 focus:outline-none transition-colors placeholder:text-muted-foreground"
            />
            <textarea
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full glass-card px-4 py-3 bg-transparent border-foreground/20 focus:border-foreground/50 focus:outline-none transition-colors resize-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="btn-cosmic w-full flex items-center justify-center gap-2">
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-muted-foreground/70 text-sm mt-16"
        >
          Based in Kashmir. Building remotely. Available everywhere.
        </motion.p>
      </div>
    </section>
  );
};
