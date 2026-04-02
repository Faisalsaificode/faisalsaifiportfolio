import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════════════════════════
   ReactBits-Inspired Components
   Reimplemented with Framer Motion + GSAP — all self-contained
   ═══════════════════════════════════════════════════════════════════ */

// ─── Custom hook (no naming conflicts) ───────────────────────────
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

// ─── SPLIT TEXT ──────────────────────────────────────────────────
export function SplitText({ text = '', delay = 0, className = '', style = {} }) {
  const words = String(text).split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 20, stiffness: 120 },
    },
  };

  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ─── BLUR TEXT ───────────────────────────────────────────────────
export function BlurText({ text = '', delay = 0, className = '', style = {} }) {
  const words = String(text).split(' ');
  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', ...style }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          variants={{
            hidden: { opacity: 0, filter: 'blur(12px)', y: 8 },
            visible: {
              opacity: 1, filter: 'blur(0px)', y: 0,
              transition: { duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ─── GRADIENT TEXT ───────────────────────────────────────────────
export function GradientText({ children, colors = ['#7c5cff', '#00e8ff', '#00ffb0'], speed = 5, style = {} }) {
  return (
    <>
      <span style={{
        background: `linear-gradient(135deg, ${colors.join(', ')}, ${colors[0]})`,
        backgroundSize: '300% 300%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: `_gradShift ${speed}s ease infinite`,
        ...style,
      }}>
        {children}
      </span>
      <style>{`@keyframes _gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }`}</style>
    </>
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
          initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block' }}
        >
          {texts[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─── AURORA BACKGROUND ──────────────────────────────────────────
export function Aurora() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {[
        { color: 'rgba(124,92,255,0.15)', size: '50vw', top: '-20%', right: '-10%', dur: '18s', idx: 0 },
        { color: 'rgba(0,232,255,0.1)', size: '45vw', bottom: '-15%', left: '-10%', dur: '22s', idx: 1 },
        { color: 'rgba(0,255,176,0.07)', size: '40vw', top: '30%', left: '20%', dur: '25s', idx: 2 },
        { color: 'rgba(255,61,139,0.05)', size: '35vw', bottom: '10%', right: '15%', dur: '20s', idx: 3 },
      ].map((b) => (
        <div key={b.idx} style={{
          position: 'absolute', top: b.top, right: b.right, bottom: b.bottom, left: b.left,
          width: b.size, height: b.size, borderRadius: '50%',
          background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
          filter: 'blur(60px)',
          animation: `_aurora${b.idx} ${b.dur} ease-in-out infinite`,
        }} />
      ))}
      <style>{`
        @keyframes _aurora0 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-60px) scale(1.1)} 66%{transform:translate(-30px,40px) scale(0.95)} }
        @keyframes _aurora1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,30px) scale(1.05)} 66%{transform:translate(40px,-50px) scale(1.1)} }
        @keyframes _aurora2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(60px,40px) scale(1.15)} }
        @keyframes _aurora3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-40px,-30px) scale(1.1)} }
      `}</style>
    </div>
  );
}

// ─── BEAMS GRID ─────────────────────────────────────────────────
export function BeamsGrid() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', opacity: 0.4 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(124,92,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,255,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', top: 0, width: 1, height: '100%',
          left: `${25 + i * 25}%`,
          background: 'linear-gradient(180deg, transparent, rgba(124,92,255,0.15) 50%, transparent)',
          animation: `_beam ${3 + i}s ease-in-out infinite ${i * 0.7}s`,
        }} />
      ))}
      <style>{`@keyframes _beam { 0%,100%{opacity:0.2;transform:scaleY(1)} 50%{opacity:0.6;transform:scaleY(1.02)} }`}</style>
    </div>
  );
}

// ─── SPLASH CURSOR ──────────────────────────────────────────────
export function SplashCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.15, ease: 'power2.out' });
      }
      if (trailRef.current) {
        gsap.to(trailRef.current, { x: e.clientX - 200, y: e.clientY - 200, duration: 0.4, ease: 'power2.out' });
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={trailRef} style={{
        position: 'fixed', width: 400, height: 400, borderRadius: '50%', pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(circle, rgba(124,92,255,0.06) 0%, transparent 70%)',
        top: 0, left: 0,
      }} />
      <div ref={cursorRef} style={{
        position: 'fixed', width: 32, height: 32, borderRadius: '50%', pointerEvents: 'none', zIndex: 100,
        border: '1.5px solid rgba(124,92,255,0.4)', mixBlendMode: 'difference',
        top: 0, left: 0,
      }} />
    </>
  );
}

// ─── MAGNET ─────────────────────────────────────────────────────
export function Magnet({ children, strength = 0.3, style = {} }) {
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

// ─── TILT CARD ──────────────────────────────────────────────────
export function TiltCard({ children, style = {}, borderColor = '#7c5cff' }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((py - 0.5) * -14);
    rotateY.set((px - 0.5) * 14);
    setGlowPos({ x: px * 100, y: py * 100 });
  };
  const handleLeave = () => {
    rotateX.set(0); rotateY.set(0);
    setGlowPos({ x: 50, y: 50 });
    setHovering(false);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseEnter={() => setHovering(true)} onMouseLeave={handleLeave}
      style={{
        rotateX: springRX, rotateY: springRY, transformPerspective: 800,
        borderRadius: 20, overflow: 'hidden', position: 'relative',
        background: 'rgba(14,14,22,0.6)', backdropFilter: 'blur(20px) saturate(180%)',
        border: `1px solid ${hovering ? borderColor + '33' : 'rgba(255,255,255,0.04)'}`,
        transition: 'border-color 0.3s',
        ...style,
      }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: hovering ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${borderColor}12, transparent 60%)` : 'none',
        transition: 'background 0.2s',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

// ─── SPOTLIGHT CARD ─────────────────────────────────────────────
export function SpotlightCard({ children, style = {} }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  return (
    <div ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 20,
        background: 'rgba(14,14,22,0.6)', border: '1px solid rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        ...style,
      }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: hover ? `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(124,92,255,0.07), transparent 60%)` : 'none',
        transition: 'background 0.2s',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
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

// ─── STAGGER REVEAL ─────────────────────────────────────────────
export function StaggerReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

// ─── ANIMATED LIST ──────────────────────────────────────────────
export function AnimatedList({ items = [], renderItem, stagger = 0.08 }) {
  const [ref, visible] = useOnScreen(0.15);
  return (
    <div ref={ref}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
          animate={visible ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -30, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderItem(item, i)}
        </motion.div>
      ))}
    </div>
  );
}

// ─── SCROLL VELOCITY TEXT ───────────────────────────────────────
export function ScrollVelocityText({ children, baseVelocity = 2 }) {
  const [offset, setOffset] = useState(0);
  const dir = useRef(1);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let raf;
    const update = () => {
      const diff = window.scrollY - lastScroll;
      if (diff > 0) dir.current = 1;
      else if (diff < 0) dir.current = -1;
      lastScroll = window.scrollY;
      setOffset(prev => {
        const next = prev + baseVelocity * dir.current * 0.015 + Math.abs(diff) * 0.008 * dir.current;
        return next % 100;
      });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [baseVelocity]);

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '24px 0', position: 'relative', zIndex: 2 }}>
      <div style={{
        display: 'inline-flex', gap: '4rem',
        transform: `translateX(${-Math.abs(offset)}%)`,
      }}>
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} style={{
            fontSize: 'clamp(48px,8vw,96px)', fontFamily: "'Outfit', sans-serif",
            fontWeight: 800, opacity: 0.05,
            whiteSpace: 'nowrap', userSelect: 'none', color: '#fff',
          }}>{children}</span>
        ))}
      </div>
    </div>
  );
}

// ─── DOCK ───────────────────────────────────────────────────────
export function Dock({ items = [] }) {
  const [hovered, setHovered] = useState(-1);

  return (
    <div style={{
      display: 'flex', gap: 8, alignItems: 'flex-end', justifyContent: 'center',
      padding: '12px 20px', borderRadius: 22,
      background: 'rgba(14,14,22,0.8)', backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.04)',
    }}>
      {items.map((item, i) => {
        const dist = hovered === -1 ? 0 : Math.abs(hovered - i);
        const scale = hovered === -1 ? 1 : dist === 0 ? 1.5 : dist === 1 ? 1.2 : 1;
        return (
          <motion.div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(-1)}
            animate={{ scale, y: hovered === i ? -8 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              width: 44, height: 44, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, cursor: 'pointer',
              background: item.bg || 'rgba(255,255,255,0.03)',
            }}
            title={item.label}
          >
            {item.icon}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── SKILL PILL (with ring) ─────────────────────────────────────
export function SkillPill({ skill }) {
  const [ref, visible] = useOnScreen(0.2);
  const r = 26, circ = 2 * Math.PI * r;

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.04, y: -4 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
        borderRadius: 16, background: 'rgba(14,14,22,0.6)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.04)', cursor: 'default',
      }}
    >
      <svg width="58" height="58" style={{ flexShrink: 0 }}>
        <circle cx="29" cy="29" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3.5" />
        <circle
          cx="29" cy="29" r={r} fill="none" stroke={skill.color} strokeWidth="3.5"
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={visible ? circ * (1 - skill.pct / 100) : circ}
          style={{
            transition: `stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s`,
            transform: 'rotate(-90deg)', transformOrigin: 'center',
            filter: `drop-shadow(0 0 4px ${skill.color}44)`,
          }}
        />
        <text x="29" y="29" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 16 }}>{skill.icon}</text>
      </svg>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#eee', marginBottom: 2 }}>{skill.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 10, background: `${skill.color}14`, color: skill.color, fontWeight: 700 }}>{skill.cat}</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: skill.color, fontVariantNumeric: 'tabular-nums' }}>{skill.pct}%</span>
        </div>
      </div>
    </motion.div>
  );
}
