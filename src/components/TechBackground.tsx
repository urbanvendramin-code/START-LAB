import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'node' | 'cross' | 'hexagon';
  angle: number;
  rotationSpeed: number;
}

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 20 : 55;

    const colors = [
      'rgba(6, 182, 212, 0.45)', // Cyan
      'rgba(20, 184, 166, 0.4)',  // Teal
      'rgba(168, 85, 247, 0.35)', // Purple
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const types: Array<'node' | 'cross' | 'hexagon'> = ['node', 'cross', 'hexagon'];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: types[Math.floor(Math.random() * types.length)],
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.015,
        });
      }
    };

    const drawHexagon = (context: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      context.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hX = x + size * Math.cos(angle);
        const hY = y + size * Math.sin(angle);
        if (i === 0) context.moveTo(hX, hY);
        else context.lineTo(hX, hY);
      }
      context.closePath();
      context.stroke();
    };

    const drawCross = (context: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      context.beginPath();
      context.moveTo(x - size, y);
      context.lineTo(x + size, y);
      context.moveTo(x, y - size);
      context.lineTo(x, y + size);
      context.stroke();
    };

    const animate = () => {
      // Clear with slight alpha to create a very subtle organic motion blur path
      ctx.fillStyle = 'rgba(248, 250, 252, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse movement interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      // Render neon network lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw and update particle
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.angle += p1.rotationSpeed;

        // Boundary reflection
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        // Adjust coordinates slightly inside bounds
        p1.x = Math.max(0, Math.min(canvas.width, p1.x));
        p1.y = Math.max(0, Math.min(canvas.height, p1.y));

        ctx.save();
        ctx.translate(p1.x, p1.y);
        ctx.rotate(p1.angle);
        ctx.strokeStyle = p1.color;
        ctx.fillStyle = p1.color;
        ctx.lineWidth = 1;

        // Distinct futuristic scientific shapes
        if (p1.type === 'hexagon') {
          drawHexagon(ctx, 0, 0, p1.size * 2);
        } else if (p1.type === 'cross') {
          drawCross(ctx, 0, 0, p1.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p1.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Check distance to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connection range
          const maxDist = 130;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Create gradient for multi-colored connections
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse interaction focal point
        const mdx = p1.x - mouseRef.current.x;
        const mdy = p1.y - mouseRef.current.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mouseRange = 220;

        if (mDist < mouseRange) {
          const alpha = (1 - mDist / mouseRange) * 0.4;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = p1.color.replace('0.5', `${alpha}`).replace('0.4', `${alpha}`);
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Pull slightly toward mouse for gravity feel
          const force = (mouseRange - mDist) / mouseRange;
          p1.x -= (mdx / mDist) * force * 0.45;
          p1.y -= (mdy / mDist) * force * 0.45;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none select-none bg-[#f8fafc]">
      {/* Absolute light screen shield */}
      <div className="absolute inset-0 bg-[#f8fafc]/90" />

      {/* Pulsing Space Nebula Core Blending */}
      <motion.div 
        animate={{
          x: [0, 50, -30, 0],
          y: [0, 40, 70, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-linear-to-tr from-cyan-500/5 to-teal-500/5 blur-[140px]"
      />
      
      <motion.div 
        animate={{
          x: [0, -40, 50, 0],
          y: [0, 70, -30, 0],
          scale: [1, 1.1, 1.05, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-10%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-linear-to-bl from-purple-500/4 to-pink-500/3 blur-[140px]"
      />

      {/* Dynamic Laboratory Constellation & Grid Interactive Overlay */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 block h-full w-full opacity-65"
      />

      {/* Tech Grid Matrix */}
      <div 
        className="absolute inset-0 bg-transparent opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `, 
          backgroundSize: '45px 45px' 
        }} 
      />

      {/* Cyber Reticles and Scientific Coordinate Accents */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[15%] left-[8%] w-12 h-12 border-l border-t border-slate-300" />
        <div className="absolute top-[15%] right-[8%] w-12 h-12 border-r border-t border-slate-300" />
        <div className="absolute bottom-[15%] left-[8%] w-12 h-12 border-l border-b border-slate-300" />
        <div className="absolute bottom-[15%] right-[8%] w-12 h-12 border-r border-b border-slate-300" />
        
        {/* Fine circular micro radar indicators */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-slate-300/30 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-slate-300/30 stroke-dasharray-4 rounded-full pointer-events-none" style={{ borderStyle: 'dashed' }} />
      </div>

      {/* Radial fade out shield */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#f8fafc]/40 to-[#f8fafc]/95" />
    </div>
  );
}
