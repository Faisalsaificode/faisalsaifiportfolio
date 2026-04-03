import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════════════════════════
   Bold Immersive Components — Slosh-inspired
   ═══════════════════════════════════════════════════════════════════ */

function useOnScreen(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── GRADIENT TEXT ───────────────────────────────────────────────
export function GradientText({ children, style = {} }) {
  return (
    <span style={{
      background: 'linear-gradient(90deg, #ff4d00, #ff8a00, #ffcc00)',
      backgroundSize: '200% 100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: '_gradSlide 4s ease infinite',
      ...style,
    }}>
      {children}
      <style>{`@keyframes _gradSlide { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }`}</style>
    </span>
  );
}

// ─── ROTATING TEXT ───────────────────────────────────────────────
export function RotatingText({ texts = [], interval = 2500, style = {} }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % texts.length), interval);
    return () => clearInterval(t);
  }, [texts.length, interval]);

  return (
    <span style={{ display: 'inline-block', position: 'relative', ...style }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block' }}
        >
          {texts[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─── MAGNETIC ELEMENT ───────────────────────────────────────────
export function Magnet({ children, strength = 0.2, style = {} }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, display: 'inline-flex', ...style }}>
      {children}
    </motion.div>
  );
}

// ─── CURSOR ─────────────────────────────────────────────────────
export function SplashCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (dotRef.current) gsap.to(dotRef.current, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.1, ease: 'power2.out' });
      if (ringRef.current) gsap.to(ringRef.current, { x: e.clientX - 24, y: e.clientY - 24, duration: 0.3, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', width: 8, height: 8, borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
        background: '#ff4d00', top: 0, left: 0, mixBlendMode: 'difference',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', width: 48, height: 48, borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
        border: '1px solid rgba(255,77,0,0.4)', top: 0, left: 0, mixBlendMode: 'difference',
      }} />
    </>
  );
}

// ─── STAGGER REVEAL ─────────────────────────────────────────────
export function StaggerReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

// ─── COUNT UP ───────────────────────────────────────────────────
export function CountUp({ end, suffix = '', duration = 2, style = {} }) {
  const [ref, visible] = useOnScreen(0.5);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration, ease: 'power3.out',
      onUpdate: () => setVal(Math.round(obj.v)),
    });
  }, [visible, end, duration]);

  return <span ref={ref} style={style}>{val}{suffix}</span>;
}

// ─── MARQUEE ────────────────────────────────────────────────────
export function Marquee({ children, speed = 30, direction = 'left' }) {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative', zIndex: 2 }}>
      <motion.div
        animate={{ x: direction === 'left' ? [0, -1920] : [-1920, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'inline-flex', gap: 0 }}
      >
        {[0, 1, 2, 3].map(i => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>{children}</span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── HORIZONTAL RULE ────────────────────────────────────────────
export function Divider() {
  return (
    <div style={{
      width: '100%', height: 1,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
    }} />
  );
}
