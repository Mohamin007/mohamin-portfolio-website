import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const AboutMeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about-me" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 block">About Me</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold glow-text-subtle">
            Who I Am
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Part 1 — The Journey */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card-glow p-8"
          >
            <span className="section-label mb-6 block">The Journey</span>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Hey, I'm Mohamin — a 19 year old from the mountains of Kashmir.
              </p>
              <p>
                I was a simple person with no clear direction, wasting time, looking for different streams. Then I discovered Programming — and for the first time, I found something that actually had my interest. Not forced. Not just for a degree. Genuine curiosity.
              </p>
              <p>
                So I went for it. I gave the entrance examination for the Data Science & AI program at Kashmir University — and out of 1,400+ applicants, I ranked 6th. That moment told me I was on the right path.
              </p>
              <p>
                The journey started slow. Distractions came, time was wasted, habits weren't built yet, and everything felt overwhelming. But then I started focussing — and everything changed. The logic, the structure, the way machines think — it pulled me in completely.
              </p>
              <p>
                From C to Python, from Python to R, from R to IoT, from IoT to Arduino, from networks to data — from one concept to the next.
              </p>
              <p>
                Currently in my 2nd semester of a 5-year integrated program at Kashmir University. One clear goal: become an AI/ML Engineer — and a better version of myself every single day.
              </p>
            </div>
          </motion.div>

          {/* Part 2 — The Person */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card-glow p-8"
          >
            <span className="section-label mb-6 block">The Person</span>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Outside the screen, I'm just a regular 19 year old from Kashmir.
              </p>
              <p>
                Football is my escape. Gaming is my reset. And on quiet nights, Arabic music is the only thing playing.
              </p>
              <p>
                I love travelling — the mountains, the open roads, the unknown places. Life doesn't always allow it right now, but the hunger for it is real.
              </p>
              <p>
                I work best in silence. Alone, fully focused, no distractions. Not because I don't value people — but because that's where my best thinking happens.
              </p>
              <p>
                I don't compare myself to anyone. But I like to compete. There's a difference. Seeing someone ahead of me doesn't create jealousy — it creates one question: if they can, why can't I?
              </p>
              <p>
                I make mistakes. I get distracted sometimes. I'm still building discipline. But the hunger to learn, to grow, to make my family proud — that never goes away.
              </p>
              <p>
                I want to fight against distractions. Things actually stopping me, making my study less efficient. I want to fight with my inner resistance that tries to keep me from becoming the person I know I can be.
              </p>
              <p>
                A person should know a little about everything. Not just their field. How banks work. How cars work. How the world runs. Knowledge has no borders — and neither do I.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
