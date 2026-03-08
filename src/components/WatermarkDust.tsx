import { useEffect, useRef } from 'react';

interface DustParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
  brightness: number;
}

export const WatermarkDust = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<DustParticle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = (): DustParticle => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Spread particles across the wide watermark text area
      const textWidth = canvas.width * 0.7;
      const textHeight = canvas.height * 0.18;

      const x = centerX + (Math.random() - 0.5) * textWidth;
      const y = centerY + (Math.random() - 0.5) * textHeight;

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.2 + 0.05;
      const maxLife = 200 + Math.random() * 300;

      const sizeRoll = Math.random();
      const size = sizeRoll < 0.7 ? Math.random() * 0.8 + 0.2 : sizeRoll < 0.92 ? Math.random() * 1.2 + 0.6 : Math.random() * 1.8 + 1;

      return {
        x,
        y,
        size,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - Math.random() * 0.08,
        opacity: 0,
        life: 0,
        maxLife,
        brightness: 0.5 + Math.random() * 0.3,
      };
    };

    const PARTICLE_COUNT = 65;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawnParticle();
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.life++;
        p.x += p.speedX;
        p.y += p.speedY;

        const progress = p.life / p.maxLife;
        if (progress < 0.12) {
          p.opacity = progress / 0.12;
        } else if (progress > 0.7) {
          p.opacity = (1 - progress) / 0.3;
        } else {
          p.opacity = 1;
        }
        p.opacity *= p.brightness;

        if (p.life >= p.maxLife) {
          particlesRef.current[i] = spawnParticle();
          return;
        }

        if (p.size > 0.9) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.2})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
