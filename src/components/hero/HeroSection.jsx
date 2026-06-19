import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

function DynamicGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const animRef = useRef(null);
  const [dims, setDims] = useState({ w: 600, h: 400 });

  const nodesRef = useRef([]);

  const buildNodes = useCallback((w, h) => {
    const nodes = [];
    const cx = w / 2;
    const cy = h / 2;
    const scaleX = 1.55;
    const R = Math.min(w * 0.30, h * 0.40);
    const bandWidth = 2;

    const totalSteps = 180;
    for (let i = 0; i <= totalSteps; i++) {
      let u = i / totalSteps;
      u = u - 0.06 * Math.sin(u * Math.PI * 2);
      u = Math.max(0, Math.min(1, u));
      const t = u * Math.PI * 2;

      const sinT = Math.sin(t);
      const cosT = Math.cos(t);
      const denom = 1 + sinT * sinT;

      const bx = cx + scaleX * R * cosT / denom;
      const by = cy + R * sinT * cosT / denom;

      const tx = -sinT;
      const ty = cosT * (1 - sinT * sinT) / denom;
      const nl = Math.sqrt(tx * tx + ty * ty) || 1;
      const nx = tx / nl;
      const ny = ty / nl;

      for (let b = -bandWidth; b <= bandWidth; b++) {
        const offset = b * (R * 0.05);
        nodes.push({
          x: bx + nx * offset,
          y: by + ny * offset,
          t: t,
          b: b + bandWidth,
        });
      }
    }
    return nodes;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const mx = mouseRef.current.x * w;
    const my = mouseRef.current.y * h;
    const time = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    const nodes = nodesRef.current;

    const travelSpeed = 0.55;
    const travelPos = (time * travelSpeed) % (Math.PI * 2);
    const segmentSigma = 0.28;

    const wrapDist = (a, b) => {
      const d = Math.abs(a - b);
      return Math.min(d, Math.PI * 2 - d);
    };

    const influences = nodes.map(node => {
      const diff = wrapDist(node.t, travelPos);
      const mainPulse = Math.exp(-diff * diff / (2 * segmentSigma * segmentSigma));
      const tail = 0.25 * Math.exp(-diff * diff / (2 * (segmentSigma * 2.5) * (segmentSigma * 2.5)));
      return mainPulse + tail;
    });

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const travelInfluence = influences[i];

      const dx = mx - node.x;
      const dy = my - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseInfluence = Math.max(0, 1 - dist / 200) * 0.3;

      const sinT = Math.sin(node.t);
      const depthFactor = 0.5 + 0.5 * sinT;

      const glow = travelInfluence + mouseInfluence * 0.4;
      const baseRadius = (0.8 + glow * 3.5) * depthFactor;
      const alpha = (0.03 + glow * 0.28 + mouseInfluence * 0.12) * depthFactor;
      const light = 30 + glow * 40;

      const hue = 73 + (node.t / (Math.PI * 2)) * 8;

      ctx.beginPath();
      ctx.arc(node.x, node.y, Math.max(baseRadius, 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 100%, ${light}%, ${alpha})`;
      ctx.fill();

      if (travelInfluence > 0.6) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, baseRadius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${travelInfluence * 0.15})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }

    const maxNd = w * 0.04;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (influences[i] < 0.08) continue;

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        if (influences[j] < 0.05 && influences[i] < 0.15) continue;

        const dx2 = a.x - b.x;
        const dy2 = a.y - b.y;
        const nd = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (nd > maxNd) continue;

        const loopDist = Math.abs(a.t - b.t);
        if (loopDist > 0.7 && loopDist < Math.PI * 2 - 0.7) continue;

        const sharedGlow = Math.min(influences[i], influences[j]);
        const lineAlpha = sharedGlow * 0.3;
        if (lineAlpha < 0.015) continue;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `hsla(73, 100%, 70%, ${lineAlpha})`;
        ctx.lineWidth = 0.35;
        ctx.stroke();
      }
    }

    timeRef.current += 0.016;
    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current) return;
      const p = canvasRef.current.parentElement;
      const w = Math.min(p.clientWidth, 720);
      const h = Math.min(w * 0.62, p.clientHeight, 468);
      setDims({ w, h });
      nodesRef.current = buildNodes(w, h);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [buildNodes]);

  useEffect(() => {
    nodesRef.current = buildNodes(dims.w, dims.h);
  }, [dims, buildNodes]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw, dims]);

  const move = (e) => {
    const r = canvasRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseRef.current = {
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    };
  };
  const leave = () => { mouseRef.current = { x: 0.5, y: 0.5 }; };

  return (
    <canvas
      ref={canvasRef}
      width={dims.w}
      height={dims.h}
      onMouseMove={move}
      onMouseLeave={leave}
      className="w-full h-auto max-w-[720px]"
    />
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden pt-16">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        <motion.div
          className="flex flex-col gap-8 md:gap-9"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-bold text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight text-white">
            TIM
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-gray-400 max-w-md">
            I am a computer science student who enjoys building things that <span className="text-[#CCFF00]">actually work</span>.
          </p>

          <div className="flex items-center gap-6 pt-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
              CS Student
            </span>
            <span className="w-px h-4 bg-gray-700" />
            <span className="text-xs uppercase tracking-widest text-gray-500">
              Yuan Ze University, TW
            </span>
          </div>
        </motion.div>

        <motion.div
          className="hidden md:flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <DynamicGrid />
        </motion.div>
      </div>

      <motion.div
        className="absolute right-6 md:right-12 bottom-8 md:bottom-12 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs uppercase tracking-widest text-gray-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#CCFF00]" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-0 bottom-0 h-[1px] bg-[#CCFF00]"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  );
}
