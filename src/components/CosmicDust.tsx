import { useEffect, useRef } from 'react';

interface DustParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const CosmicDust = () => {
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
      const centerY = canvas.height * 0.5;
      // Spawn around the figure's body area
      const spreadX = canvas.width * 0.25;
      const spreadY = canvas.height * 0.4;
      const maxLife = 200 + Math.random() * 300;
      return {
        x: centerX + (Math.random() - 0.5) * spreadX,
        y: centerY + (Math.random() - 0.5) * spreadY,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: 0,
        life: 0,
        maxLife,
      };
    };

    // Init
    for (let i = 0; i < 60; i++) {
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

        // Fade in then out
        const progress = p.life / p.maxLife;
        if (progress < 0.1) {
          p.opacity = progress / 0.1;
        } else if (progress > 0.7) {
          p.opacity = (1 - progress) / 0.3;
        } else {
          p.opacity = 1;
        }
        p.opacity *= 0.6;

        if (p.life >= p.maxLife) {
          particlesRef.current[i] = spawnParticle();
          return;
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
      className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
    />
  );
};
