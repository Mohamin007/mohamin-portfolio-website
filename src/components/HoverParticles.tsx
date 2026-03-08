import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export const useHoverParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const activeRef = useRef(false);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const ctx = canvas.getContext('2d')!;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.02;
        p.life -= 1;
        const alpha = p.life / p.maxLife;
        if (alpha <= 0) return false;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`;
        ctx.fill();
        return true;
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      canvas.remove();
    };
  }, []);

  const spawnParticles = useCallback((rect: DOMRect) => {
    for (let i = 0; i < 3; i++) {
      const side = Math.random();
      let x: number, y: number;
      if (side < 0.25) { x = rect.left + Math.random() * rect.width; y = rect.top; }
      else if (side < 0.5) { x = rect.left + Math.random() * rect.width; y = rect.bottom; }
      else if (side < 0.75) { x = rect.left; y = rect.top + Math.random() * rect.height; }
      else { x = rect.right; y = rect.top + Math.random() * rect.height; }

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.5;
      const maxLife = Math.random() * 30 + 20;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: maxLife,
        maxLife,
        size: Math.random() * 2 + 1,
      });
    }
  }, []);

  const onMouseEnter = useCallback((e: React.MouseEvent) => {
    activeRef.current = true;
    rectRef.current = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const emit = () => {
      if (!activeRef.current || !rectRef.current) return;
      spawnParticles(rectRef.current);
      setTimeout(emit, 50);
    };
    emit();
  }, [spawnParticles]);

  const onMouseLeave = useCallback(() => {
    activeRef.current = false;
    rectRef.current = null;
  }, []);

  return { onMouseEnter, onMouseLeave };
};
