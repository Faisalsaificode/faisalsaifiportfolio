import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  GradientText, Aurora, SplashCursor,
  Magnet, TiltCard, CountUp, StaggerReveal, SpotlightCard,
  RotatingText,
} from './components/ReactBitsComponents';

const C = {
  accent: '#7c5cff', accentAlt: '#00e8ff', neon: '#00ffb0',
  pink: '#ff3d8b', orange: '#ff8844',
};

const skills = {
  'Frontend': [
    { name: 'React', pct: 93 }, { name: 'JavaScript', pct: 94 },
    { name: 'Redux', pct: 84 }, { name: 'HTML/CSS', pct: 90 },
  ],
  'Backend': [
    { name: 'Node.js', pct: 88 }, { name: 'Express', pct: 86 },
    { name: 'Python', pct: 87 }, { name: 'FastAPI', pct: 82 },
  ],
  'Database': [
    { name: 'MongoDB', pct: 83 }, { name: 'PostgreSQL', pct: 77 },
    { name: 'Neo4j', pct: 81 },
  ],
  'Cloud & DevOps': [
    { name: 'GCP', pct: 79 }, { name: 'Firebase', pct: 80 },
    { name: 'Docker', pct: 75 }, { name: 'Pub/Sub', pct: 78 },{name: 'AWS', pct: 80}
  ],
};

const projects = [
    {
    title: 'LifeFlow',
    sub: 'Blood Bank Management',
    desc: 'Full MERN stack blood bank system — donor registration, inventory tracking, and request workflow automation.',
    tech: ['React', 'Node.js', 'MongoDB'],
    color: C.pink,
  },
  {
    title: 'BuyBusy',
    sub: 'E-Commerce Platform',
    desc: 'React + Firebase + Redux Toolkit with createAsyncThunk, EntityAdapter, and optimized Selectors for state management.',
    tech: ['React', 'Firebase', 'Redux'],
    color: C.accentAlt,
  },
  {
    title: 'TaskFlow API',
    sub: 'RESTful Task Manager',
    desc: 'Node.js + Express + MongoDB with JWT authentication, role-based access control, and comprehensive CRUD operations.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    color: C.neon,
  },

  {
    title: 'Loan Manager',
    sub: 'Financial Microservice',
    desc: 'MERN + PostgreSQL with Prisma ORM — loan applications, approval workflows, and financial reporting dashboard.',
    tech: ['React', 'PostgreSQL', 'Prisma'],
    color: C.orange,
  },
  {
    title: 'Compliance Clerk',
    sub: 'Document Intelligence',
    desc: 'Python PDF extraction pipeline with LLM-powered field extraction and SQLite audit trail for compliance workflows.',
    tech: ['Python', 'LLM', 'SQLite'],
    color: '#c084fc',
  },
];

const experience = [
  {
    role: 'Software Developer',
    company: 'Super Kol Commerce Pvt Ltd',
    period: 'Mar 2026 – Present',
    current: true,
    points: [
      'Architecting sentinos-ai social media analytics platform end-to-end',
      'Designing Neo4j knowledge graph schema for influencer marketing data',
      'Building 15 Cypher ingestion tools deployed on Cloud Run microservices',
      'Implementing Pub/Sub-triggered data processing pipelines on GCP',
    ],
  },
];

// ─── SCROLL PROGRESS ─────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 200,
      background: `linear-gradient(90deg, ${C.accent}, ${C.accentAlt})`,
      transformOrigin: '0%', scaleX,
    }} />
  );
}

// ─── NAV ─────────────────────────────────────────────────────────
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 120, damping: 20 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 150,
        padding: '0 32px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,5,8,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
        transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
      }}
    >
      <motion.span
        whileHover={{ scale: 1.05 }}
        onClick={() => go('home')}
        style={{
          fontSize: 18, fontWeight: 800, cursor: 'pointer',
          background: `linear-gradient(135deg, ${C.accent}, ${C.accentAlt})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: -0.5,
        }}
      >
        F.
      </motion.span>

      <div className="nav-inner" style={{ display: 'flex', gap: 4 }}>
        {['about', 'skills', 'projects', 'experience', 'contact'].map(s => (
          <button
            key={s}
            onClick={() => go(s)}
            style={{
              background: 'none', border: 'none', color: '#6a6a82', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'capitalize',
              padding: '8px 16px', borderRadius: 8, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.color = '#f0f0f5'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.target.style.color = '#6a6a82'; e.target.style.background = 'none'; }}
          >{s}</button>
        ))}
      </div>

      <Magnet strength={0.15}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => go('contact')}
          style={{
            padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: C.accent, color: '#fff', fontWeight: 700, fontSize: 12,
            letterSpacing: 0.3,
          }}
        >Let's Talk</motion.button>
      </Magnet>
    </motion.nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', zIndex: 2,
    }}>
      <div className="container" style={{ width: '100%' }}>
        <div style={{ maxWidth: 720 }}>
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 18px', borderRadius: 8, marginBottom: 32,
              background: 'rgba(0,255,176,0.04)', border: '1px solid rgba(0,255,176,0.1)',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: C.neon,
              boxShadow: `0 0 10px ${C.neon}`,
              animation: '_pulse 2s infinite',
            }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.neon, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Available for work
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 800,
              lineHeight: 1.05, letterSpacing: -2, marginBottom: 8,
              color: '#f0f0f5',
            }}
          >
            Hi, This is{' '}
            <GradientText style={{ fontSize: 'inherit' }}>Faisal Saifi</GradientText>
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 600, color: '#6a6a82',
              marginBottom: 28, lineHeight: 1.3,
            }}
          >
            <RotatingText
              texts={['Full-Stack MERN Developer', 'Data Pipeline Architect', 'Software Developer', 'Cloud-Native Builder']}
              interval={2800}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{
              fontSize: 16, lineHeight: 1.8, color: '#8888a4',
              maxWidth: 540, marginBottom: 44,
            }}
          >
            I build scalable analytics platforms and knowledge graphs
            with MERN, Python, and Google Cloud — turning complex data
            into actionable intelligence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <Magnet strength={0.1}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 8px 40px rgba(124,92,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '14px 32px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: C.accent, color: '#fff', fontWeight: 700, fontSize: 14,
                  letterSpacing: 0.3, boxShadow: '0 4px 20px rgba(124,92,255,0.2)',
                }}
              >View Projects</motion.button>
            </Magnet>
            <Magnet strength={0.1}>
              <motion.button
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '14px 32px', borderRadius: 10, cursor: 'pointer',
                  background: 'transparent', border: '1.5px solid rgba(255,255,255,0.08)',
                  color: '#f0f0f5', fontWeight: 600, fontSize: 14, letterSpacing: 0.3,
                }}
              >Get In Touch</motion.button>
            </Magnet>
          </motion.div>

          {/* Tech stack row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            style={{
              marginTop: 64, display: 'flex', alignItems: 'center', gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: '#4a4a62', letterSpacing: 1, textTransform: 'uppercase' }}>
              Tech Stack
            </span>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.06)' }} />
            {['React', 'Node.js', 'Python', 'Neo4j', 'GCP', 'Docker'].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 + i * 0.1 }}
                style={{
                  fontSize: 12, fontWeight: 600, color: '#6a6a82',
                  padding: '6px 14px', borderRadius: 6,
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                }}
              >{t}</motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION LABEL ───────────────────────────────────────────────
function SectionLabel({ tag, title, subtitle }) {
  return (
    <StaggerReveal>
      <div style={{ marginBottom: 64 }}>
        <span style={{
          fontSize: 11, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase',
          color: C.accent, display: 'block', marginBottom: 14,
        }}>{tag}</span>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800,
          lineHeight: 1.1, letterSpacing: -1, marginBottom: subtitle ? 16 : 0,
          color: '#f0f0f5',
        }}>{title}</h2>
        {subtitle && (
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#6a6a82', maxWidth: 520 }}>{subtitle}</p>
        )}
      </div>
    </StaggerReveal>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionLabel tag="About" title="Who I Am" />
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'start' }}>
          <StaggerReveal delay={0.1}>
            <SpotlightCard style={{ padding: 40 }}>
              <p style={{ fontSize: 17, lineHeight: 2, color: '#9494b0', marginBottom: 24 }}>
                Software Developer at <strong style={{ color: '#f0f0f5' }}>sentinOS</strong>, building
                data-intensive analytics platforms. From FastAPI microservices and Neo4j knowledge graphs to
                React frontends with Redux — I architect end-to-end systems that turn complex data into
                actionable intelligence.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: '#6a6a82' }}>
                Passionate about clean architecture, scalable systems, and the intersection
                of data engineering and full-stack development.
              </p>
            </SpotlightCard>
          </StaggerReveal>

          <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { n: 6, s: '+', l: 'Projects', sub: 'Shipped' },
              { n: 15, s: '', l: 'Cypher', sub: 'Tools Built' },
              { n: 12, s: '+', l: 'Technologies', sub: 'In Stack' },
              { n: 3, s: '+', l: 'Cloud', sub: 'Platforms' },
            ].map((s, i) => (
              <StaggerReveal key={i} delay={0.15 + i * 0.08}>
                <SpotlightCard style={{ padding: 24, textAlign: 'center' }}>
                  <div style={{
                    fontSize: 36, fontWeight: 900, marginBottom: 4,
                    background: `linear-gradient(135deg, ${C.accent}, ${C.accentAlt})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>
                    <CountUp end={s.n} suffix={s.s} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#f0f0f5', marginBottom: 2 }}>{s.l}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#6a6a82', letterSpacing: 1, textTransform: 'uppercase' }}>{s.sub}</div>
                </SpotlightCard>
              </StaggerReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        <SectionLabel tag="Skills" title="Tech Stack" subtitle="Technologies I work with on a daily basis." />
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {Object.entries(skills).map(([cat, items], ci) => (
            <StaggerReveal key={cat} delay={ci * 0.1}>
              <SpotlightCard style={{ padding: 32 }}>
                <h3 style={{
                  fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
                  color: C.accent, marginBottom: 24,
                }}>{cat}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {items.map((skill, si) => (
                    <div key={skill.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#d0d0e0' }}>{skill.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, fontFamily: 'var(--font-mono)' }}>{skill.pct}%</span>
                      </div>
                      <div style={{
                        width: '100%', height: 6, borderRadius: 3,
                        background: 'rgba(255,255,255,0.04)',
                        overflow: 'hidden',
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.pct}%` }}
                          transition={{ duration: 1.2, delay: ci * 0.15 + si * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                          style={{
                            height: '100%', borderRadius: 3,
                            background: `linear-gradient(90deg, ${C.accent}, ${C.accentAlt})`,
                            boxShadow: `0 0 12px ${C.accent}40`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </StaggerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionLabel tag="Projects" title="Featured Work" subtitle="A selection of projects I've built recently." />

        {/* Featured project — full width */}
        <StaggerReveal>
          <TiltCard borderColor={projects[0].color} style={{ marginBottom: 24 }}>
            <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              <div style={{ padding: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase',
                    padding: '4px 12px', borderRadius: 6, background: `${C.accent}14`, color: C.accent,
                  }}>Featured</span>
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 800, color: '#f0f0f5', marginBottom: 6 }}>{projects[0].title}</h3>
                <p style={{ fontSize: 14, fontWeight: 600, color: projects[0].color, marginBottom: 16 }}>{projects[0].sub}</p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#8888a4', marginBottom: 24 }}>{projects[0].desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {projects[0].tech.map(t => (
                    <span key={t} style={{
                      fontSize: 11, fontWeight: 600, padding: '5px 14px', borderRadius: 6,
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                      color: '#9494b0', fontFamily: 'var(--font-mono)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `linear-gradient(135deg, ${projects[0].color}08, ${projects[0].color}03)`,
                borderLeft: '1px solid rgba(255,255,255,0.04)',
                padding: 40,
              }}>
                <div style={{
                  width: 120, height: 120, borderRadius: 24,
                  background: `linear-gradient(135deg, ${projects[0].color}20, ${projects[0].color}08)`,
                  border: `1px solid ${projects[0].color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: projects[0].color,
                  letterSpacing: -0.5,
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1 }}>LF</div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, marginTop: 4, textTransform: 'uppercase' }}>Api</div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </StaggerReveal>

        {/* Other projects — grid */}
        <div className="project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {projects.slice(1).map((p, i) => (
            <StaggerReveal key={p.title} delay={i * 0.08}>
              <TiltCard borderColor={p.color} style={{ height: '100%' }}>
                <div style={{ padding: 28 }}>
                  <div style={{
                    width: 3, height: 24, borderRadius: 2,
                    background: `linear-gradient(180deg, ${p.color}, transparent)`,
                    marginBottom: 18,
                  }} />
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f5', marginBottom: 4 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, fontWeight: 600, color: p.color, marginBottom: 14 }}>{p.sub}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: '#8888a4', marginBottom: 20 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.tech.map(t => (
                      <span key={t} style={{
                        fontSize: 10, fontWeight: 600, padding: '4px 12px', borderRadius: 6,
                        background: `${p.color}08`, border: `1px solid ${p.color}12`,
                        color: p.color, fontFamily: 'var(--font-mono)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </StaggerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        <SectionLabel tag="Experience" title="Career" />
        {experience.map((exp, idx) => (
          <StaggerReveal key={idx}>
            <SpotlightCard style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {/* Accent bar */}
                <div style={{
                  width: 4, background: `linear-gradient(180deg, ${C.accent}, ${C.accentAlt})`,
                  flexShrink: 0,
                }} />
                <div style={{ padding: '32px 36px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
                    <div>
                      <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f0f0f5', marginBottom: 4 }}>{exp.role}</h3>
                      <GradientText style={{ fontSize: 14, fontWeight: 700 }}>{exp.company}</GradientText>
                    </div>
                    <span style={{
                      fontSize: 12, fontFamily: 'var(--font-mono)', color: '#6a6a82',
                      padding: '6px 14px', borderRadius: 8,
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      {exp.current && (
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: C.neon, boxShadow: `0 0 8px ${C.neon}`,
                        }} />
                      )}
                      {exp.period}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px 36px 32px' }}>
                {exp.points.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    style={{
                      display: 'flex', alignItems: 'start', gap: 14,
                      fontSize: 14, lineHeight: 1.7, color: '#9494b0',
                      padding: '10px 0',
                      borderBottom: i < exp.points.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                    }}
                  >
                    <span style={{
                      width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${C.accent}0a`, fontSize: 10, color: C.accent,
                    }}>+</span>
                    {point}
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </StaggerReveal>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────
function Contact() {
  const links = [
    { label: 'Email', value: 'faisalsaifi1999@gmail.com', icon: 'M', color: C.accent },
    { label: 'LinkedIn', value: 'linkedin.com/in/faisal-saifi', icon: 'in', color: '#0077b5' },
    { label: 'GitHub', value: 'github.com/faisalsaificode', icon: 'GH', color: '#f0f0f5' },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionLabel tag="Contact" title="Let's Work Together" subtitle="Have a project in mind? Let's discuss how I can help." />
        <div className="three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {links.map((c, i) => (
            <StaggerReveal key={c.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, borderColor: `${c.color}30`, background: `${c.color}06` }}
                style={{
                  padding: 28, borderRadius: 16,
                  background: 'rgba(14,14,22,0.5)', border: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer', transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${c.color}0c`, border: `1px solid ${c.color}18`,
                  fontSize: 14, fontWeight: 800, color: c.color,
                }}>{c.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6a6a82', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
                  {c.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f5' }}>{c.value}</div>
              </motion.div>
            </StaggerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: '28px 32px', borderTop: '1px solid rgba(255,255,255,0.04)',
      position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexWrap: 'wrap', gap: 12,
    }}>
      <span style={{ fontSize: 12, color: '#4a4a62', fontFamily: 'var(--font-mono)' }}>
        © 2026 Faisal
      </span>
      <span style={{ fontSize: 12, color: '#4a4a62' }}>
        Built with React
      </span>
    </footer>
  );
}

// ═════════════════════════════════════════════════════════════════
// APP
// ═════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <>
      <style>{`@keyframes _pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      <Aurora />
      <SplashCursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
