import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  GradientText, SplashCursor, Magnet, StaggerReveal,
  CountUp, RotatingText, Marquee, Divider,
} from './components/ReactBitsComponents';

/* ── Palette ─────────────────────────────────────────────────────── */
const C = {
  accent: '#ff4d00',
  accent2: '#ff8a00',
  white: '#ffffff',
  dim: '#999',
  muted: '#555',
  dark: '#0a0a0a',
  card: '#111',
  border: 'rgba(255,255,255,0.08)',
};

/* ── Data ────────────────────────────────────────────────────────── */
const skills = {
  Frontend: [
    { name: 'React', pct: 93 }, { name: 'JavaScript', pct: 94 },
    { name: 'Redux', pct: 84 }, { name: 'HTML/CSS', pct: 90 },
  ],
  Backend: [
    { name: 'Node.js', pct: 88 }, { name: 'Express', pct: 86 },
    { name: 'Python', pct: 87 }, { name: 'FastAPI', pct: 82 },
  ],
  Database: [
    { name: 'MongoDB', pct: 83 }, { name: 'PostgreSQL', pct: 77 },
    { name: 'Neo4j', pct: 81 },
  ],
  'Cloud & DevOps': [
    { name: 'GCP', pct: 79 }, { name: 'Firebase', pct: 80 },
    { name: 'Docker', pct: 75 }, { name: 'Pub/Sub', pct: 78 },
    { name: 'AWS', pct: 80 },
  ],
};

const projects = [
  {
    title: 'LifeFlow', sub: 'Blood Bank Management',
    desc: 'Full MERN stack blood bank system — donor registration, inventory tracking, and request workflow automation.',
    tech: ['React', 'Node.js', 'MongoDB'], color: '#ff4d00', num: '01',
  },
  {
    title: 'BuyBusy', sub: 'E-Commerce Platform',
    desc: 'React + Firebase + Redux Toolkit with createAsyncThunk, EntityAdapter, and optimized Selectors.',
    tech: ['React', 'Firebase', 'Redux'], color: '#ff8a00', num: '02',
  },
  {
    title: 'TaskFlow API', sub: 'RESTful Task Manager',
    desc: 'Node.js + Express + MongoDB with JWT authentication, role-based access control, and CRUD operations.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'], color: '#ffcc00', num: '03',
  },
  {
    title: 'Loan Manager', sub: 'Financial Microservice',
    desc: 'MERN + PostgreSQL with Prisma ORM — loan applications, approval workflows, and reporting dashboard.',
    tech: ['React', 'PostgreSQL', 'Prisma'], color: '#ff4d00', num: '04',
  },
  {
    title: 'Compliance Clerk', sub: 'Document Intelligence',
    desc: 'Python PDF extraction pipeline with LLM-powered field extraction and SQLite audit trail.',
    tech: ['Python', 'LLM', 'SQLite'], color: '#ff8a00', num: '05',
  },
];

const experience = {
  role: 'Software Developer', company: 'SentinOS',
  period: 'Mar 2026 – Present',
  points: [
    'Architecting sentinos-ai social media analytics platform end-to-end',
    'Designing Neo4j knowledge graph schema for influencer marketing data',
    'Building 15 Cypher ingestion tools deployed on Cloud Run microservices',
    'Implementing Pub/Sub-triggered data processing pipelines on GCP',
  ],
};

/* ═══════════════════════════════════════════════════════════════════
   SCROLL PROGRESS
   ═══════════════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 200,
      background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`,
      transformOrigin: '0%', scaleX,
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 150,
        padding: '0 40px', height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        transition: 'all 0.4s',
      }}
    >
      <Magnet strength={0.15}>
        <motion.span
          whileHover={{ scale: 1.1 }}
          onClick={() => go('home')}
          style={{
            fontSize: 28, fontWeight: 900, cursor: 'pointer',
            fontFamily: 'var(--font-display)', letterSpacing: 2,
            color: C.accent,
          }}
        >FAISAL</motion.span>
      </Magnet>

      <div className="nav-links" style={{ display: 'flex', gap: 8 }}>
        {['about', 'skills', 'projects', 'experience', 'contact'].map(s => (
          <Magnet key={s} strength={0.1}>
            <button onClick={() => go(s)}
              style={{
                background: 'none', border: 'none', color: C.dim,
                fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: 2, padding: '8px 14px', transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.target.style.color = C.white}
              onMouseLeave={e => e.target.style.color = C.dim}
            >{s}</button>
          </Magnet>
        ))}
      </div>

      <Magnet strength={0.15}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => go('contact')}
          style={{
            padding: '10px 28px', borderRadius: 0,
            background: C.accent, border: 'none',
            color: '#fff', fontSize: 12, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase',
          }}
        >HIRE ME</motion.button>
      </Magnet>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO — Full viewport, oversized bold type
   ═══════════════════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="home" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', position: 'relative', zIndex: 2, overflow: 'hidden',
    }}>
      <motion.div style={{ y, opacity }}>
        {/* Small intro line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="container"
          style={{ marginBottom: 20 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#0f0',
              boxShadow: '0 0 12px rgba(0,255,0,0.6)',
              animation: '_pulse 2s infinite',
            }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.dim, letterSpacing: 3, textTransform: 'uppercase' }}>
              Available for work
            </span>
          </div>
        </motion.div>

        {/* Giant title */}
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="hero-title" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(80px, 16vw, 220px)',
              fontWeight: 400, lineHeight: 0.9, letterSpacing: -2,
              color: C.white, padding: '0 40px',
              textTransform: 'uppercase',
            }}>
              FAISAL
            </h1>
          </motion.div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.85, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="hero-sub" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(60px, 12vw, 160px)',
              fontWeight: 400, lineHeight: 0.9, letterSpacing: -1,
              color: 'transparent', padding: '0 40px',
              WebkitTextStroke: `2px ${C.accent}`,
              textTransform: 'uppercase',
            }}>
              SAIFI
            </h1>
          </motion.div>
        </div>

        {/* Role + description row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="container"
          style={{
            marginTop: 48, display: 'flex', justifyContent: 'space-between',
            alignItems: 'end', flexWrap: 'wrap', gap: 24,
          }}
        >
          <div>
            <div style={{
              fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 600,
              color: C.accent, marginBottom: 8,
              fontFamily: 'var(--font-display)', letterSpacing: 3,
              textTransform: 'uppercase',
            }}>
              <RotatingText
                texts={['Full-Stack MERN Developer', 'Data Pipeline Architect', 'Software Developer', 'Cloud-Native Builder']}
                interval={2800}
              />
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: C.dim, maxWidth: 480 }}>
              Building scalable analytics platforms and knowledge graphs
              with MERN, Python, and Google Cloud.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Magnet strength={0.1}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '16px 40px', border: 'none',
                  background: C.accent, color: '#fff',
                  fontSize: 13, fontWeight: 700, letterSpacing: 2,
                  textTransform: 'uppercase', cursor: 'pointer',
                }}
              >PROJECTS</motion.button>
            </Magnet>
            <Magnet strength={0.1}>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: C.accent }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '16px 40px',
                  border: `2px solid ${C.border}`, background: 'transparent',
                  color: C.white, fontSize: 13, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'border-color 0.3s',
                }}
              >CONTACT</motion.button>
            </Magnet>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MARQUEE STRIP
   ═══════════════════════════════════════════════════════════════════ */
function MarqueeStrip() {
  const items = ['REACT', 'NODE.JS', 'PYTHON', 'NEO4J', 'GCP', 'MONGODB', 'DOCKER', 'FASTAPI'];
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '20px 0', position: 'relative', zIndex: 2 }}>
      <Marquee speed={25}>
        {items.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 40, marginRight: 40 }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 48px)',
              letterSpacing: 4, color: C.dim, textTransform: 'uppercase',
              fontWeight: 400,
            }}>{t}</span>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: C.accent, flexShrink: 0,
            }} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="about" style={{ padding: '140px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <StaggerReveal>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            {/* Left — big title */}
            <div>
              <span style={{
                fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 4,
                textTransform: 'uppercase', display: 'block', marginBottom: 20,
              }}>ABOUT</span>
              <h2 className="section-title" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 8vw, 100px)',
                lineHeight: 0.95, letterSpacing: -1,
                textTransform: 'uppercase', marginBottom: 32,
              }}>
                WHO<br />I AM
              </h2>
              {/* Stats */}
              <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: C.border }}>
                {[
                  { n: 6, s: '+', l: 'Projects Shipped' },
                  { n: 15, s: '', l: 'Cypher Tools' },
                  { n: 12, s: '+', l: 'Technologies' },
                  { n: 3, s: '+', l: 'Cloud Platforms' },
                ].map((s, i) => (
                  <div key={i} style={{ background: C.dark, padding: 28, textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: 48,
                      color: C.accent, letterSpacing: 2, lineHeight: 1,
                    }}>
                      <CountUp end={s.n} suffix={s.s} />
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 3, textTransform: 'uppercase', marginTop: 8 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — text */}
            <div style={{ paddingTop: 80 }}>
              <p style={{ fontSize: 18, lineHeight: 2, color: C.dim, marginBottom: 28 }}>
                Software Developer at <strong style={{ color: C.white }}>SentinOS</strong>, building
                data-intensive analytics platforms. From FastAPI microservices and Neo4j knowledge graphs to
                React frontends with Redux — I architect end-to-end systems that turn complex data into
                actionable intelligence.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: C.muted }}>
                Passionate about clean architecture, scalable systems, and the intersection
                of data engineering and full-stack development.
              </p>
            </div>
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SKILLS — Progress bars with bold labels
   ═══════════════════════════════════════════════════════════════════ */
function Skills() {
  return (
    <section id="skills" style={{ padding: '140px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <StaggerReveal>
          <span style={{
            fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 4,
            textTransform: 'uppercase', display: 'block', marginBottom: 20,
          }}>SKILLS</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 100px)',
            lineHeight: 0.95, letterSpacing: -1,
            textTransform: 'uppercase', marginBottom: 64,
          }}>
            TECH<br />ARSENAL
          </h2>
        </StaggerReveal>

        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          {Object.entries(skills).map(([cat, items], ci) => (
            <StaggerReveal key={cat} delay={ci * 0.1}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 24,
                  letterSpacing: 4, textTransform: 'uppercase',
                  color: C.accent, marginBottom: 28,
                }}>{cat}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {items.map((skill, si) => (
                    <div key={skill.name}>
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        marginBottom: 10, alignItems: 'baseline',
                      }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: C.white }}>{skill.name}</span>
                        <span style={{
                          fontSize: 24, fontWeight: 400, color: C.accent,
                          fontFamily: 'var(--font-display)', letterSpacing: 1,
                        }}>{skill.pct}%</span>
                      </div>
                      <div style={{
                        width: '100%', height: 4, background: 'rgba(255,255,255,0.06)',
                        overflow: 'hidden',
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.pct}%` }}
                          transition={{ duration: 1.2, delay: ci * 0.1 + si * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                          style={{
                            height: '100%',
                            background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROJECTS — Numbered list, big type
   ═══════════════════════════════════════════════════════════════════ */
function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" style={{ padding: '140px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <StaggerReveal>
          <span style={{
            fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 4,
            textTransform: 'uppercase', display: 'block', marginBottom: 20,
          }}>WORK</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 100px)',
            lineHeight: 0.95, letterSpacing: -1,
            textTransform: 'uppercase', marginBottom: 64,
          }}>
            FEATURED<br />PROJECTS
          </h2>
        </StaggerReveal>

        {/* Project list */}
        <div>
          {projects.map((p, i) => (
            <StaggerReveal key={p.title} delay={i * 0.06}>
              <motion.div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto',
                  gap: 32, alignItems: 'center',
                  padding: '36px 0',
                  borderTop: `1px solid ${C.border}`,
                  cursor: 'pointer', transition: 'all 0.4s',
                }}
              >
                {/* Number */}
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 20,
                  color: hovered === i ? C.accent : C.muted,
                  letterSpacing: 2, transition: 'color 0.3s',
                  minWidth: 40,
                }}>{p.num}</span>

                {/* Title + sub */}
                <div>
                  <motion.h3
                    animate={{ x: hovered === i ? 16 : 0, color: hovered === i ? C.accent : C.white }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 5vw, 56px)',
                      letterSpacing: 2, textTransform: 'uppercase',
                      lineHeight: 1, marginBottom: 6,
                    }}
                  >{p.title}</motion.h3>
                  <motion.p
                    animate={{ x: hovered === i ? 16 : 0, opacity: hovered === i ? 1 : 0.5 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    style={{ fontSize: 13, color: C.dim, fontWeight: 500 }}
                  >{p.sub}</motion.p>
                </div>

                {/* Arrow */}
                <motion.span
                  animate={{
                    x: hovered === i ? 8 : 0,
                    opacity: hovered === i ? 1 : 0.3,
                    color: hovered === i ? C.accent : C.dim,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: 24, fontWeight: 300 }}
                >→</motion.span>
              </motion.div>

              {/* Expanded detail on hover */}
              <motion.div
                initial={false}
                animate={{
                  height: hovered === i ? 'auto' : 0,
                  opacity: hovered === i ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden', paddingLeft: 72 }}
              >
                <div style={{ paddingBottom: 24 }}>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: C.dim, maxWidth: 500, marginBottom: 16 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {p.tech.map(t => (
                      <span key={t} style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: 2,
                        padding: '6px 16px', textTransform: 'uppercase',
                        border: `1px solid ${C.border}`, color: C.dim,
                        fontFamily: 'var(--font-mono)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerReveal>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: `1px solid ${C.border}` }} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EXPERIENCE
   ═══════════════════════════════════════════════════════════════════ */
function Experience() {
  return (
    <section id="experience" style={{ padding: '140px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <StaggerReveal>
          <span style={{
            fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 4,
            textTransform: 'uppercase', display: 'block', marginBottom: 20,
          }}>EXPERIENCE</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 100px)',
            lineHeight: 0.95, letterSpacing: -1,
            textTransform: 'uppercase', marginBottom: 64,
          }}>
            CAREER
          </h2>
        </StaggerReveal>

        <StaggerReveal delay={0.1}>
          <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            {/* Header row */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              gap: 24, padding: '40px 0', borderBottom: `1px solid ${C.border}`,
              alignItems: 'start',
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 5vw, 64px)',
                  letterSpacing: 2, textTransform: 'uppercase',
                  lineHeight: 1, marginBottom: 8,
                }}>{experience.role}</h3>
                <GradientText style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 3vw, 32px)',
                  letterSpacing: 3,
                }}>{experience.company}</GradientText>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 20px', border: `1px solid ${C.border}`,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#0f0', boxShadow: '0 0 10px rgba(0,255,0,0.5)',
                }} />
                <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: C.dim }}>
                  {experience.period}
                </span>
              </div>
            </div>

            {/* Points */}
            {experience.points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  padding: '24px 0', fontSize: 15, lineHeight: 1.7, color: C.dim,
                  borderBottom: i < experience.points.length - 1 ? `1px solid ${C.border}` : 'none',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 20,
                  color: C.accent, letterSpacing: 2, minWidth: 40,
                }}>0{i + 1}</span>
                {point}
              </motion.div>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════════ */
function Contact() {
  const links = [
    { label: 'Email', value: 'faisalsaifi1999@gmail.com', href: 'mailto:faisalsaifi1999@gmail.com' },
    { label: 'LinkedIn', value: 'linkedin.com/in/faisal-saifi', href: 'https://linkedin.com/in/faisal-saifi' },
    { label: 'GitHub', value: 'github.com/faisalsaificode', href: 'https://github.com/faisalsaificode' },
  ];

  return (
    <section id="contact" style={{ padding: '140px 0 80px', position: 'relative', zIndex: 2 }}>
      <div className="container">
        <StaggerReveal>
          <span style={{
            fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 4,
            textTransform: 'uppercase', display: 'block', marginBottom: 20,
          }}>CONTACT</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 10vw, 140px)',
            lineHeight: 0.95, letterSpacing: -1,
            textTransform: 'uppercase', marginBottom: 64,
          }}>
            LET'S<br />
            <GradientText style={{ fontSize: 'inherit', fontFamily: 'inherit' }}>BUILD</GradientText>
            {' '}TOGETHER
          </h2>
        </StaggerReveal>

        <div style={{ borderTop: `1px solid ${C.border}` }}>
          {links.map((c, i) => (
            <StaggerReveal key={c.label} delay={i * 0.1}>
              <a href={c.href} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ x: 16, color: C.accent }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '28px 0',
                    borderBottom: `1px solid ${C.border}`,
                    cursor: 'pointer', transition: 'all 0.3s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: C.muted,
                      letterSpacing: 3, textTransform: 'uppercase', minWidth: 80,
                    }}>{c.label}</span>
                    <span style={{
                      fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 600, color: C.white,
                    }}>{c.value}</span>
                  </div>
                  <span style={{ fontSize: 20, color: C.muted }}>→</span>
                </motion.div>
              </a>
            </StaggerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      padding: '32px 40px', position: 'relative', zIndex: 2,
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexWrap: 'wrap', gap: 12,
      borderTop: `1px solid ${C.border}`,
    }}>
      <span style={{ fontSize: 12, color: C.muted, fontFamily: 'var(--font-mono)' }}>
        &copy; 2026 FAISAL SAIFI
      </span>
      <span style={{ fontSize: 12, color: C.muted, letterSpacing: 2, textTransform: 'uppercase' }}>
        Built with React
      </span>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{`@keyframes _pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
      <SplashCursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <MarqueeStrip />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <MarqueeStrip />
      <Projects />
      <Divider />
      <Experience />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}
