import React, { useEffect, useRef } from 'react';

interface ChemistryCanvasBgProps {
  theme: 'dark' | 'light';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  symbol?: string;
  type: 'atom' | 'formula' | 'node';
  alpha: number;
}

export const ChemistryCanvasBg: React.FC<ChemistryCanvasBgProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isDark = theme === 'dark';
    const formulaSymbols = ['H₂O', 'CO₂', 'CH₄', 'NaCl', 'H₂SO₄', 'O₂', 'CaCO₃', 'Fe³⁺', 'e⁻'];
    
    // Low particle count for high performance on mobile devices
    const particleCount = Math.min(Math.floor((width * height) / 25000), 32);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isFormula = Math.random() > 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isFormula ? 12 : Math.random() * 2.5 + 1.5,
        color: isDark ? 'rgba(56, 189, 248, ' : 'rgba(14, 165, 233, ',
        symbol: isFormula ? formulaSymbols[Math.floor(Math.random() * formulaSymbols.length)] : undefined,
        type: isFormula ? 'formula' : Math.random() > 0.5 ? 'atom' : 'node',
        alpha: Math.random() * 0.25 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle scientific grid dots
      const gridSpacing = 64;
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.025)';
      for (let x = 0; x < width; x += gridSpacing) {
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw molecular connecting bonds
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * (isDark ? 0.08 : 0.05);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(6, 182, 212, ${lineAlpha})`
              : `rgba(13, 148, 136, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw particles, atoms, and formulas
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen edges smoothly
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        if (p.type === 'formula' && p.symbol) {
          ctx.font = '500 12px "JetBrains Mono", monospace';
          ctx.fillStyle = isDark
            ? `rgba(148, 163, 184, ${p.alpha * 0.5})`
            : `rgba(100, 116, 139, ${p.alpha * 0.45})`;
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          // Atom nucleus
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(34, 211, 238, ${p.alpha * 0.4})`
            : `rgba(14, 165, 233, ${p.alpha * 0.35})`;
          ctx.fill();

          // Subtle electron orbit around larger nodes
          if (p.radius > 2.5) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
            ctx.strokeStyle = isDark
              ? `rgba(34, 211, 238, ${p.alpha * 0.1})`
              : `rgba(14, 165, 233, ${p.alpha * 0.08})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: theme === 'dark' ? 0.8 : 0.6 }}
      aria-hidden="true"
    />
  );
};
