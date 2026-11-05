import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

export default function InventorAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle network configuration
    const particleCount = Math.min(Math.floor((width * height) / 28000), 55);
    const particles: Particle[] = [];
    const maxConnectionDistance = 140;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
        baseAlpha: Math.random() * 0.5 + 0.2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections (circuit/idea network)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const lineAlpha = (1 - dist / maxConnectionDistance) * 0.18;
            ctx.strokeStyle = `rgba(83, 184, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw individual technical nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle glow pulse
        ctx.fillStyle = `rgba(83, 184, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair ticks on selected larger particles
        if (p.radius > 1.8) {
          ctx.strokeStyle = `rgba(83, 184, 255, ${p.alpha * 0.4})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x - 4, p.y);
          ctx.lineTo(p.x + 4, p.y);
          ctx.moveTo(p.x, p.y - 4);
          ctx.lineTo(p.x, p.y + 4);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
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
          backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px'
        }}
      />

      {/* 2. Radial Atmospheric Glow Pulses */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[550px] bg-gradient-to-tr from-[#53B8FF]/20 via-[#1C3652]/30 to-transparent blur-[160px] rounded-full pointer-events-none"
      />

      <motion.div 
        animate={{ 
          scale: [1.1, 0.95, 1.1],
          opacity: [0.08, 0.18, 0.08]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 right-1/4 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-br from-[#53B8FF]/15 via-[#0D223A]/30 to-transparent blur-[150px] rounded-full pointer-events-none"
      />

      {/* 3. Interactive Innovation Particles Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-80"
      />

      {/* 4. Large Rotating Blueprint Engineering Compass (Top-Right) */}
      <div className="absolute -top-32 -right-32 w-[650px] h-[650px] opacity-[0.16] pointer-events-none hidden sm:block">
        <svg 
          viewBox="0 0 500 500" 
          className="w-full h-full animate-[spin_60s_linear_infinite]"
        >
          {/* Outer Degree Wheel */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="#53B8FF" strokeWidth="1" strokeDasharray="3, 7" />
          <circle cx="250" cy="250" r="215" fill="none" stroke="#53B8FF" strokeWidth="0.75" />
          
          {/* Caliper Cardinal Radians */}
          <line x1="250" y1="20" x2="250" y2="480" stroke="#53B8FF" strokeWidth="0.75" strokeDasharray="4, 4" />
          <line x1="20" y1="250" x2="480" y2="250" stroke="#53B8FF" strokeWidth="0.75" strokeDasharray="4, 4" />
          
          {/* Diagonal Engineering Crosshairs */}
          <line x1="87" y1="87" x2="413" y2="413" stroke="#53B8FF" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="87" y1="413" x2="413" y2="87" stroke="#53B8FF" strokeWidth="0.5" strokeOpacity="0.5" />

          {/* Inner Precision Ticks */}
          <circle cx="250" cy="250" r="160" fill="none" stroke="#53B8FF" strokeWidth="1.2" strokeDasharray="8, 12" />
          <circle cx="250" cy="250" r="100" fill="none" stroke="#53B8FF" strokeWidth="0.8" />
          <circle cx="250" cy="250" r="40" fill="none" stroke="#53B8FF" strokeWidth="1.5" strokeDasharray="2, 4" />
          
          {/* Technical Blueprint Labels */}
          <text x="256" y="45" fill="#53B8FF" fontSize="8" fontFamily="monospace" letterSpacing="2">R:230.00mm</text>
          <text x="420" y="246" fill="#53B8FF" fontSize="8" fontFamily="monospace" letterSpacing="1">0°</text>
          <text x="246" y="475" fill="#53B8FF" fontSize="8" fontFamily="monospace" letterSpacing="1">180°</text>
          <text x="25" y="246" fill="#53B8FF" fontSize="8" fontFamily="monospace" letterSpacing="1">270°</text>
          <text x="254" y="30" fill="#53B8FF" fontSize="8" fontFamily="monospace" letterSpacing="1">90°</text>
        </svg>
      </div>

      {/* 5. Counter-Rotating Patent Gear Mechanism (Bottom-Left) */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] opacity-[0.14] pointer-events-none hidden md:block">
        <svg 
          viewBox="0 0 500 500" 
          className="w-full h-full animate-[spin_48s_linear_infinite_reverse]"
        >
          {/* Gear Teeth Outer Ring */}
          <circle cx="250" cy="250" r="220" fill="none" stroke="#53B8FF" strokeWidth="1" strokeDasharray="16, 8" />
          <circle cx="250" cy="250" r="190" fill="none" stroke="#53B8FF" strokeWidth="0.8" />
          
          {/* Internal Radians & Star Hub */}
          <circle cx="250" cy="250" r="130" fill="none" stroke="#53B8FF" strokeWidth="1.5" strokeDasharray="6, 6" />
          <circle cx="250" cy="250" r="70" fill="none" stroke="#53B8FF" strokeWidth="0.8" />
          <circle cx="250" cy="250" r="16" fill="#53B8FF" fillOpacity="0.3" />

          {/* 8-Spoke Mechanical Ribs */}
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

          {/* Technical Patent Annotations */}
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

      {/* 7. Subtle Laser Scanner Beam Sweep across the screen */}
      <motion.div 
        animate={{ y: ['-10%', '110%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#53B8FF]/[0.035] to-transparent pointer-events-none"
      />

      {/* 8. Vignette Edge Depth Gradients */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#080B10]/85 pointer-events-none" />
    </div>
  );
}
