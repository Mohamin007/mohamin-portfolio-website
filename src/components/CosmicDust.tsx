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
  brightness: number;
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

    // Silhouette edge points (normalized 0-1 coords relative to figure center)
    // Approximating a human figure outline
    const silhouettePoints = [
      // Head
      { x: 0, y: -0.42 }, { x: -0.04, y: -0.45 }, { x: 0.04, y: -0.45 },
      { x: -0.05, y: -0.43 }, { x: 0.05, y: -0.43 },
      // Neck/shoulders
      { x: -0.03, y: -0.38 }, { x: 0.03, y: -0.38 },
      { x: -0.15, y: -0.32 }, { x: 0.15, y: -0.32 },
      { x: -0.18, y: -0.30 }, { x: 0.18, y: -0.30 },
      // Arms left
      { x: -0.20, y: -0.28 }, { x: -0.22, y: -0.22 }, { x: -0.23, y: -0.15 },
      { x: -0.22, y: -0.08 }, { x: -0.20, y: 0.0 }, { x: -0.18, y: 0.05 },
      // Arms right
      { x: 0.20, y: -0.28 }, { x: 0.22, y: -0.22 }, { x: 0.23, y: -0.15 },
      { x: 0.22, y: -0.08 }, { x: 0.20, y: 0.0 }, { x: 0.18, y: 0.05 },
      // Torso sides
      { x: -0.12, y: -0.20 }, { x: 0.12, y: -0.20 },
      { x: -0.10, y: -0.05 }, { x: 0.10, y: -0.05 },
      { x: -0.11, y: 0.05 }, { x: 0.11, y: 0.05 },
      // Hips
      { x: -0.12, y: 0.10 }, { x: 0.12, y: 0.10 },
      // Legs left
      { x: -0.10, y: 0.15 }, { x: -0.09, y: 0.25 }, { x: -0.08, y: 0.35 },
      { x: -0.07, y: 0.42 },
      // Legs right
      { x: 0.10, y: 0.15 }, { x: 0.09, y: 0.25 }, { x: 0.08, y: 0.35 },
      { x: 0.07, y: 0.42 },
    ];

    const spawnParticle = (): DustParticle => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.48;
      const figureScale = canvas.height * 0.9;

      // Pick a random silhouette point and add slight randomness
      const point = silhouettePoints[Math.floor(Math.random() * silhouettePoints.length)];
      const jitter = 0.03;

      const x = centerX + (point.x + (Math.random() - 0.5) * jitter) * figureScale;
      const y = centerY + (point.y + (Math.random() - 0.5) * jitter) * figureScale;

      // Direction: radiate outward from center
      const angle = Math.atan2(y - centerY, x - centerX) + (Math.random() - 0.5) * 1.2;
      const speed = Math.random() * 0.5 + 0.15;

      const maxLife = 180 + Math.random() * 280;
      // Vary sizes: mostly tiny, some bigger sparks
      const sizeRoll = Math.random();
      const size = sizeRoll < 0.6 ? Math.random() * 1 + 0.3 : sizeRoll < 0.9 ? Math.random() * 1.5 + 1 : Math.random() * 2.5 + 1.5;

      return {
        x,
        y,
        size,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - (Math.random() * 0.3 + 0.1), // bias upward
        opacity: 0,
        life: 0,
        maxLife,
        brightness: 0.7 + Math.random() * 0.3,
      };
    };

    const PARTICLE_COUNT = 180;
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
        if (progress < 0.1) {
          p.opacity = progress / 0.1;
        } else if (progress > 0.65) {
          p.opacity = (1 - progress) / 0.35;
        } else {
          p.opacity = 1;
        }
        p.opacity *= p.brightness;

        if (p.life >= p.maxLife) {
          particlesRef.current[i] = spawnParticle();
          return;
        }

        // Draw glow for bigger particles
        if (p.size > 1.2) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.25})`);
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
      className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
    />
  );
};
