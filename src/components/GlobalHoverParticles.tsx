import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const SELECTORS = 'a, button, .glass-card-glow, .btn-cosmic, .hero-btn, .skill-chip, [role="button"]';

export const GlobalHoverParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const activeElRef = useRef<HTMLElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d')!;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const spawnFromRect = (rect: DOMRect) => {
      for (let i = 0; i < 2; i++) {
        const side = Math.random();
        let x: number, y: number;
        if (side < 0.25) { x = rect.left + Math.random() * rect.width; y = rect.top; }
        else if (side < 0.5) { x = rect.left + Math.random() * rect.width; y = rect.bottom; }
        else if (side < 0.75) { x = rect.left; y = rect.top + Math.random() * rect.height; }
        else { x = rect.right; y = rect.top + Math.random() * rect.height; }

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2 + 0.4;
        const maxLife = Math.random() * 25 + 15;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
          size: Math.random() * 1.8 + 0.8,
        });
      }
    };

    const onEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.(SELECTORS) as HTMLElement | null;
      if (!target || activeElRef.current === target) return;
      activeElRef.current = target;
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (!activeElRef.current) return;
        spawnFromRect(activeElRef.current.getBoundingClientRect());
      }, 60);
    };

    const onLeave = (e: MouseEvent) => {
      const related = (e.relatedTarget as HTMLElement)?.closest?.(SELECTORS);
      if (related === activeElRef.current) return;
      activeElRef.current = null;
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    };

    document.addEventListener('mouseover', onEnter, true);
    document.addEventListener('mouseout', onLeave, true);

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.015;
        p.vx *= 0.99;
        p.life -= 1;
        const alpha = p.life / p.maxLife;
        if (alpha <= 0) return false;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
        ctx.fill();
        return true;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mouseover', onEnter, true);
      document.removeEventListener('mouseout', onLeave, true);
      canvas.remove();
    };
  }, []);

  return null;
};
