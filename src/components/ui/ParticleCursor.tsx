'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const COLORS = ['#FFD700', '#FFC107', '#FFB300', '#E8956A', '#C0C0C0'];

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsDesktop(mq.matches);
    if (!mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let lastX = 0, lastY = 0;
    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // More particles when moving faster
      const count = Math.min(Math.floor(speed / 8), 4);
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          size: 1.5 + Math.random() * 2.5,
          alpha: 0.6 + Math.random() * 0.4,
          vx: (Math.random() - 0.5) * 1.5 - dx * 0.02,
          vy: (Math.random() - 0.5) * 1.5 - dy * 0.02 - 0.3,
          life: 0,
          maxLife: 30 + Math.random() * 30,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener('mousemove', handleMove);

    // Continuously emit particles even when mouse is still
    const idleInterval = setInterval(() => {
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: mouse.current.x + (Math.random() - 0.5) * 12,
          y: mouse.current.y + (Math.random() - 0.5) * 12,
          size: 1 + Math.random() * 2,
          alpha: 0.3 + Math.random() * 0.3,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -0.3 - Math.random() * 0.5,
          life: 0,
          maxLife: 40 + Math.random() * 40,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }, 60);

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01; // slight upward drift
        p.vx *= 0.98;

        const progress = p.life / p.maxLife;
        const alpha = p.alpha * (1 - progress);
        const size = p.size * (1 - progress * 0.5);

        if (alpha <= 0.01) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.15;
        ctx.fill();

        ctx.globalAlpha = 1;
        return true;
      });

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
      clearInterval(idleInterval);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
