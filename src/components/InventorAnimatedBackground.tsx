import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export default function InventorAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile
      ? 14
      : Math.min(Math.floor((width * height) / 45000), 30);
    const particles: Particle[] = [];
    const maxConnectionDistance = isMobile ? 110 : 135;
    const maxDistSq = maxConnectionDistance * maxConnectionDistance;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.45 + 0.2,
      });
    }

    let resizeTimer: number | undefined;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let lastFrameTime = 0;
    const targetFrameInterval = 1000 / 30; // Smooth 30fps ambient drift cuts CPU/GPU usage in half

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Batch all connection lines into fewer draw calls using squared distance (no Math.sqrt)
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = 'rgba(83, 184, 255, 0.11)';
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          if (dx * dx + dy * dy < maxDistSq) {
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
          }
        }
      }
      ctx.stroke();

      // Update and draw nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(83, 184, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      drawFrame();
      return () => {
        window.removeEventListener('resize', handleResize);
        window.clearTimeout(resizeTimer);
      };
    }

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (document.hidden) return;
      if (now - lastFrameTime < targetFrameInterval) return;
      lastFrameTime = now;
      drawFrame();
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Base Blueprint Grid with technical sub-grids */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(83, 184, 255, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(83, 184, 255, 0.25) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
        }}
      />

      {/* 2. Static GPU-Friendly Radial Glows (replaces heavy animated CSS blur-[160px] layers) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] sm:w-[1200px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(83, 184, 255, 0.14) 0%, rgba(28, 54, 82, 0.12) 40%, transparent 72%)',
        }}
      />

      <div
        className="absolute bottom-0 right-0 w-[700px] sm:w-[1000px] h-[550px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(83, 184, 255, 0.10) 0%, rgba(13, 34, 58, 0.12) 42%, transparent 72%)',
        }}
      />

      {/* 3. Lightweight Innovation Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />

      {/* 4. Large Rotating Blueprint Engineering Compass (Top-Right) */}
      <div className="absolute -top-32 -right-32 w-[650px] h-[650px] opacity-[0.14] pointer-events-none hidden sm:block">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full animate-[spin_60s_linear_infinite] will-change-transform"
        >
          <circle cx="250" cy="250" r="230" fill="none" stroke="#53B8FF" strokeWidth="1" strokeDasharray="3, 7" />
          <circle cx="250" cy="250" r="215" fill="none" stroke="#53B8FF" strokeWidth="0.75" />
          <line x1="250" y1="20" x2="250" y2="480" stroke="#53B8FF" strokeWidth="0.75" strokeDasharray="4, 4" />
          <line x1="20" y1="250" x2="480" y2="250" stroke="#53B8FF" strokeWidth="0.75" strokeDasharray="4, 4" />
          <line x1="87" y1="87" x2="413" y2="413" stroke="#53B8FF" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="87" y1="413" x2="413" y2="87" stroke="#53B8FF" strokeWidth="0.5" strokeOpacity="0.5" />
          <circle cx="250" cy="250" r="160" fill="none" stroke="#53B8FF" strokeWidth="1.2" strokeDasharray="8, 12" />
          <circle cx="250" cy="250" r="100" fill="none" stroke="#53B8FF" strokeWidth="0.8" />
          <circle cx="250" cy="250" r="40" fill="none" stroke="#53B8FF" strokeWidth="1.5" strokeDasharray="2, 4" />
          <text x="256" y="45" fill="#53B8FF" fontSize="8" fontFamily="monospace" letterSpacing="2">R:230.00mm</text>
          <text x="420" y="246" fill="#53B8FF" fontSize="8" fontFamily="monospace" letterSpacing="1">0°</text>
          <text x="246" y="475" fill="#53B8FF" fontSize="8" fontFamily="monospace" letterSpacing="1">180°</text>
          <text x="25" y="246" fill="#53B8FF" fontSize="8" fontFamily="monospace" letterSpacing="1">270°</text>
          <text x="254" y="30" fill="#53B8FF" fontSize="8" fontFamily="monospace" letterSpacing="1">90°</text>
        </svg>
      </div>

      {/* 5. Counter-Rotating Patent Gear Mechanism (Bottom-Left) */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] opacity-[0.12] pointer-events-none hidden md:block">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full animate-[spin_48s_linear_infinite_reverse] will-change-transform"
        >
          <circle cx="250" cy="250" r="220" fill="none" stroke="#53B8FF" strokeWidth="1" strokeDasharray="16, 8" />
          <circle cx="250" cy="250" r="190" fill="none" stroke="#53B8FF" strokeWidth="0.8" />
          <circle cx="250" cy="250" r="130" fill="none" stroke="#53B8FF" strokeWidth="1.5" strokeDasharray="6, 6" />
          <circle cx="250" cy="250" r="70" fill="none" stroke="#53B8FF" strokeWidth="0.8" />
          <circle cx="250" cy="250" r="16" fill="#53B8FF" fillOpacity="0.3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="250"
              y1="250"
              x2={250 + Math.cos((deg * Math.PI) / 180) * 220}
              y2={250 + Math.sin((deg * Math.PI) / 180) * 220}
              stroke="#53B8FF"
              strokeWidth="0.75"
              strokeOpacity="0.6"
            />
          ))}
          <text x="260" y="110" fill="#53B8FF" fontSize="7" fontFamily="monospace">PAT. REF: US5051109A</text>
          <text x="260" y="125" fill="#53B8FF" fontSize="6.5" fontFamily="monospace">TOL: ±0.015mm</text>
        </svg>
      </div>

      {/* 6. Precision Patent Drafting Crosshairs at key coordinates */}
      <div className="absolute top-1/3 left-10 text-[9px] font-mono text-[#53B8FF]/30 tracking-widest hidden lg:flex items-center gap-2">
        <span className="text-sm font-light text-[#53B8FF]/50">+</span>
        <span>COORD 45°57&apos;N · 13°38&apos;E</span>
      </div>

      <div className="absolute top-2/3 right-12 text-[9px] font-mono text-[#53B8FF]/30 tracking-widest hidden lg:flex items-center gap-2">
        <span className="text-sm font-light text-[#53B8FF]/50">+</span>
        <span>CAD SYS: START_LAB_TL_ARCHIVE</span>
      </div>

      {/* 7. Vignette Edge Depth Gradients */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#080B10]/85 pointer-events-none" />
    </div>
  );
}
