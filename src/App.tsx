import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { ArrowUpRight, ArrowRight, Heart, X, Check, Code2, Terminal, Settings, Sparkles } from 'lucide-react';
import { cn, useIsDesktop, usePrefersReducedMotion } from './lib/utils';
import {
  ScrollProgress, BackToTop, Magnetic, Reveal, RevealLines, ScrollRevealText, Marquee, EASE,
} from './components/ui';
import ContactForm from './components/ContactForm';

/* ============================================================
   Content
   ============================================================ */
interface WorkItem {
  id: string;
  name: string;
  discipline: string;
  year: string;
  preview: string;
  detail: boolean;
}

const WORK_ITEMS: WorkItem[] = [
  { id: 'guard-hub', name: 'Guard Hub', discipline: 'Security & Roster Management', year: '2025', preview: '/projects/guard-hub/ai ingredeient analysis.png', detail: true },
  { id: 'ziege', name: 'Ziege', discipline: 'Generative AI E-Commerce', year: 'In Dev', preview: '/projects/ziege/storefront.png', detail: true },
  { id: 'aqua-feed-erp', name: 'Aqua Feed ERP', discipline: 'Custom ERP Solution', year: '2024', preview: '/projects/aqua-feed-erp/erp-dashboard.png', detail: true },
  { id: 'ausvms', name: 'AUSVMS', discipline: 'Multi-Role Visitor Portal', year: '2025', preview: '/projects/ausvms/visitor-dashboard.png', detail: true },
  { id: 'matrix-lms', name: 'MATRIX LMS', discipline: 'AI-Powered Library System', year: '2025', preview: '/projects/matrix-lms/lms-dashboard.png', detail: true },
];

const CAPABILITIES = [
  { no: '01', title: 'Full-Stack Engineering', body: 'End-to-end web applications and custom portals. Type-safe React frontends, scalable Node.js APIs, and MongoDB schemas engineered to feel considered and robust.', tools: ['React.js', 'Node.js', 'MongoDB', 'Express'] },
  { no: '02', title: 'AI Integration', body: 'Embedding intelligent features into production applications — NLP chatbots that autonomously resolve 70% of user queries and AI pipelines for generative content.', tools: ['NLP', 'Generative AI', 'REST APIs', 'Prompt Eng.'] },
  { no: '03', title: 'Real-Time Systems & Architecture', body: 'Building live, event-driven applications — from OTP-based check-in flows to live visitor tracking dashboards — using WebSockets and server-sent events.', tools: ['Socket.io', 'JWT', 'Nodemailer', 'Docker'] },
  { no: '04', title: 'Custom ERP & Business Tools', body: 'Custom enterprise resource planning tools tailored to your industry — inventory, production tracking, and analytics dashboards that replace fragmented spreadsheets.', tools: ['MERN Stack', 'Socket.io', 'Vercel', 'GitHub Actions'] },
];

const GALLERY = [
  '/projects/ausvms/shap explaination.png',
  '/projects/guard-hub/ai ingredeient analysis.png',
  '/projects/aqua-feed-erp/Greenwashing dection.png',
  '/projects/matrix-lms/salary intelligence.png',
  '/projects/ziege/coorelation.png',
  '/projects/ausvms/revenue impact.png',
  '/projects/guard-hub/Sugar alias detection.png',
  '/projects/aqua-feed-erp/Claim BreakDown.png',
  '/projects/matrix-lms/skills demand.png',
  '/projects/ziege/auto sceme detection.png',
];

const STACK = ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Socket.io', 'Nodemailer', 'Vercel', 'GitHub Actions', 'REST APIs', 'Git'];

const NAV = [
  { no: '00', label: 'Index', target: 'top', image: '/menu_index.png' },
  { no: '01', label: 'About', target: 'about', image: '/menu_about.png' },
  { no: '02', label: 'Work', target: 'work', image: '/menu_work.png' },
  { no: '03', label: 'Studio', target: 'capabilities', image: '/menu_studio.png' },
  { no: '04', label: 'Background', target: 'experience', image: '/menu_studio.png' },
  { no: '05', label: 'Guestbook', target: 'guestbook', image: '/menu_guestbook.png' },
  { no: '06', label: 'Contact', target: 'contact', image: '/menu_contact.png' },
];

/* ============================================================
   Error boundary
   ============================================================ */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  declare props: { children: React.ReactNode };
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) { console.error('Application error:', error); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-base min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="font-display text-giant text-cream mb-4">Broke.</h1>
            <p className="text-muted mb-8">Something went wrong. A refresh usually sorts it.</p>
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-cream text-ink font-medium rounded-full">Reload</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ============================================================
   Local time
   ============================================================ */
const LocalTime: React.FC<{ className?: string }> = ({ className }) => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const u = () => setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }));
    u();
    const i = setInterval(u, 30000);
    return () => clearInterval(i);
  }, []);
  return <span className={className}>{time} IST</span>;
};

/* ============================================================
   Stacked wordmark
   ============================================================ */
const Wordmark: React.FC<{ className?: string; onClick?: () => void }> = ({ className, onClick }) => (
  <button onClick={onClick} data-cursor="top" className={cn('text-left leading-[0.95]', className)} aria-label="Narayana Thota — top">
    <span className="block font-display text-cream" style={{ fontSize: '0.95rem', fontStretch: '110%', letterSpacing: '0.02em' }}>Narayana</span>
    <span className="block font-display text-cream" style={{ fontSize: '0.95rem', fontStretch: '110%', letterSpacing: '0.02em' }}>Thota</span>
  </button>
);

/* ============================================================
   Top bar
   ============================================================ */
const TopBar: React.FC<{ onMenu: () => void; menuOpen: boolean }> = ({ onMenu, menuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-5 md:px-8 transition-all duration-300 pointer-events-none",
      (scrolled && !menuOpen)
        ? "bg-[#100c07]/80 backdrop-blur-md border-b border-line py-3 md:py-4 pointer-events-auto"
        : "bg-transparent py-5 md:py-7"
    )}>
      <motion.div
        animate={{ opacity: menuOpen ? 0 : 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        className={cn(
          'pointer-events-auto flex items-center gap-6',
          (!scrolled || menuOpen) && 'mix-blend-difference',
          menuOpen && 'pointer-events-none'
        )}
      >
        <Wordmark onClick={toTop} />
      </motion.div>
      <div className="flex items-center gap-3 pointer-events-auto">
        <a 
          href="/Narayana Thota.pdf" 
          target="_blank" 
          rel="noreferrer" 
          data-cursor="hover" 
          className="hidden md:flex items-center justify-center h-9 md:h-10 px-5 rounded-full border border-line bg-base text-cream text-[11px] font-mono uppercase tracking-[0.12em] hover:bg-cream hover:text-ink transition-colors"
        >
          View Resume
        </a>
        <button
          onClick={onMenu}
          data-cursor="hover"
          className="relative h-9 md:h-10 px-5 rounded-full bg-cream text-ink overflow-hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="relative block h-full">
            <motion.span animate={{ y: menuOpen ? '-120%' : '0%' }} transition={{ duration: 0.35, ease: EASE }} className="flex items-center h-full font-mono text-[11px] uppercase tracking-[0.12em]">Menu</motion.span>
            <motion.span animate={{ y: menuOpen ? '0%' : '120%' }} transition={{ duration: 0.35, ease: EASE }} className="absolute inset-0 flex items-center h-full font-mono text-[11px] uppercase tracking-[0.12em]">Close</motion.span>
          </span>
        </button>
      </div>
    </header>
  );
};

/* ============================================================
   Fullscreen menu
   ============================================================ */
const Menu: React.FC<{ open: boolean; onNavigate: (target: string) => void; onClose: () => void }> = ({ open, onNavigate, onClose }) => {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const go = (target: string) => {
    onNavigate(target);
  };

  const onDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    if (e.pointerType !== 'mouse') return; // touch/pen use native momentum scroll
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const onUp = (e: React.PointerEvent) => {
    drag.current.down = false;
    try { scroller.current?.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  };

  // reset scroll position to the start whenever the menu opens
  useEffect(() => {
    if (open && scroller.current) scroller.current.scrollLeft = 0;
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed inset-0 z-[150] bg-base flex flex-col"
          data-lenis-prevent
        >
          {/* top label */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="px-5 md:px-10 pt-6 md:pt-7 o-mono text-cream"
          >
            Menu — 07 sections · drag to explore
          </motion.div>

          {/* rotated card row — drag/scroll on every device */}
          <div
            ref={scroller}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            data-cursor="drag"
            className="flex-1 flex items-center overflow-x-auto scrollbar-hide px-5 md:px-10 select-none"
            style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          >
            <div className="flex gap-4 md:gap-5 md:mx-auto items-center">
              {NAV.map((item, i) => {
                const sign = i % 2 === 0 ? -1 : 1;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ y: 70, opacity: 0, rotate: sign * 6 }}
                    animate={{ y: 0, opacity: 1, rotate: sign * 3 }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: EASE }}
                    whileHover={{ rotate: 0, scale: 1.05, transition: { duration: 0.4, ease: EASE } }}
                    onClick={() => go(item.target)}
                    data-cursor="open"
                    className="group relative shrink-0 w-[58vw] sm:w-[40vw] md:w-[15.5vw] min-w-[160px] aspect-[3/4] overflow-hidden"
                    draggable={false}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url("${item.image}")` }}
                    />
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/20 transition-colors duration-500" />
                    <span className="absolute top-3 left-1/2 -translate-x-1/2 o-mono text-cream/90">{item.no}</span>
                    <span
                      className="absolute inset-x-0 bottom-[40%] text-center font-display text-cream px-1"
                      style={{ fontSize: 'clamp(1.05rem, 2vw, 2.1rem)' }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* footer */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="px-5 md:px-10 py-5 grid grid-cols-1 md:grid-cols-3 gap-5 items-center"
          >
            <div className="o-mono">
              <p>Bhimavaram, India</p>
              <p className="text-cream break-all">narayananaiduthota@gmail.com</p>
            </div>
            <div className="flex md:justify-center">
              <Magnetic as="a" href="mailto:narayananaiduthota@gmail.com" cursor="email" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-line text-cream o-mono">
                Let's work together <ArrowRight className="w-4 h-4" />
              </Magnetic>
            </div>
            <div className="o-mono md:text-right">
              <a href="https://github.com/Narayaaana11" target="_blank" rel="noreferrer" data-cursor="open" className="block link-underline w-fit md:ml-auto">GitHub</a>
              <a href="https://www.linkedin.com/in/narayaaana/" target="_blank" rel="noreferrer" data-cursor="open" className="block link-underline w-fit md:ml-auto">LinkedIn</a>
            </div>
          </motion.div>

          {/* giant wordmark */}
          <div className="overflow-hidden px-5 md:px-10 pb-5">
            <motion.h2
              initial={{ y: 50 }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
              className="font-display text-cream whitespace-nowrap text-center leading-[0.8] select-none"
              style={{ fontSize: 'clamp(2.2rem, 12.5vw, 11rem)' }}
            >
              Narayana Thota
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ============================================================
   Hero
   ============================================================ */
const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => { });
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-base">
      {/* full-bleed video hero */}
      <motion.div style={{ scale: mediaScale }} className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(16,12,7,0.55) 0%, rgba(16,12,7,0.28) 36%, rgba(16,12,7,0.5) 70%, rgba(16,12,7,0.92) 100%)' }} />
      </motion.div>

      {/* availability */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
        className="absolute top-[15vh] md:top-[16vh] left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-soft-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="o-mono text-cream w-max">
          Available for full-time roles & select projects
        </span>
      </motion.div>

      {/* edge claims — left: build practice + motto */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}
        className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-10 max-w-[80vw] md:max-w-[52vw]"
      >
        <p className="o-mono text-cream/50 mb-3 md:mb-4">Specialties</p>
        <ul className="o-mono space-y-1 text-cream/70 mb-6 md:mb-9">
          <li>Full-Stack Development</li>
          <li>AI Integration</li>
          <li>Real-Time Systems</li>
        </ul>
        <h2
          className="font-display text-cream leading-[0.9]"
          style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.6rem)', letterSpacing: '-0.01em' }}
        >
          Code that Ships.<br />Products that Scale.
        </h2>
      </motion.div>

      {/* edge claims — right */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 1 }}
        className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 o-mono text-cream text-right z-10 max-w-[44vw] md:max-w-none"
      >
        <p className="text-cream/50 mb-3 md:mb-4">Also</p>
        <ul className="space-y-1 text-cream/70">
          <li>Content Creator</li>
          <li>Video Editor</li>
          <li>Open Source Contributor</li>
        </ul>
      </motion.div>

      {/* title */}
      <motion.h1
        style={{ y: titleY, opacity: fade }}
        className="absolute bottom-[5vh] left-0 right-0 px-4 text-center font-display text-mega text-cream z-10"
      >
        <RevealLines lines={['Narayana']} delay={0.15} />
        <RevealLines lines={['Thota']} delay={0.24} />
      </motion.h1>

      {/* scroll cue */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        data-cursor="hover"
        className="absolute bottom-5 right-5 md:right-10 z-10 flex-col items-center gap-2 hidden md:flex"
        aria-label="Scroll down"
      >
        <span className="w-5 h-8 rounded-full border border-line flex justify-center pt-1.5">
          <span className="animate-scroll-cue w-1 h-1.5 rounded-full bg-cream/60" />
        </span>
      </button>
    </section>
  );
};

/* ============================================================
   Marquee band (cream)
   ============================================================ */
const Band: React.FC = () => (
  <div className="section-cream py-5 md:py-6 overflow-hidden">
    <Marquee items={STACK} className="text-ink" />
  </div>
);

/* ============================================================
   Section label
   ============================================================ */
const Chapter: React.FC<{ no: string; label: string; className?: string }> = ({ no, label, className }) => (
  <div className={cn('flex items-center justify-between o-mono', className)}>
    <span>Chapter {no}</span>
    <span>{label}</span>
  </div>
);

/* ============================================================
   About — small image, huge statement, body prose
   ============================================================ */
const About: React.FC = () => (
  <section id="about" className="px-5 md:px-10 pt-24 md:pt-36 pb-16 md:pb-24">
    <Reveal>
      <Chapter no="01" label="about" className="text-cream border-b border-line pb-4 mb-14 md:mb-20" />
    </Reveal>

    {/* big statement */}
    <ScrollRevealText
      text="There is incredible potential at the intersection of AI and web development — I build the full-stack architectures and intelligent interfaces that bring it to life."
      className="font-display text-cream"
      style={{ fontSize: 'clamp(2.3rem, 6.6vw, 6.4rem)', lineHeight: 1.0, letterSpacing: '-0.01em' }}
    />

    {/* bio card */}
    <Reveal>
      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start border-t border-line pt-12">
        {/* avatar + status */}
        <div className="md:col-span-3 flex flex-col items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-cream/10 border border-line flex items-center justify-center">
            <span className="font-display text-cream text-3xl">N</span>
          </div>
          <div>
            <p className="text-cream font-medium">Narayana Thota</p>
            <p className="o-mono text-muted text-xs mt-0.5">Bhimavaram, India · IST</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 o-mono text-[10px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to opportunities
          </span>
        </div>

        {/* bio text */}
        <div className="md:col-span-5">
          <p className="text-body leading-relaxed mb-5">
            I'm a Full-Stack Developer and MCA student at Aditya University (graduating May 2026), based in Bhimavaram, India.
            I build production-grade web applications — from real-time visitor management systems serving a university campus to AI-powered library platforms handling 500+ daily users — with a focus on clean architecture and measurable impact.
          </p>
          <p className="text-body leading-relaxed">
            Currently open to full-time engineering roles and select freelance projects. I work best on problems where scale, real-time data, or AI capability is part of the answer.
          </p>
        </div>

        {/* quick facts */}
        <div className="md:col-span-4">
          <p className="o-mono text-muted text-xs mb-4 uppercase tracking-widest">Quick Facts</p>
          <ul className="space-y-3 o-mono text-sm">
            <li className="flex justify-between border-b border-line pb-2">
              <span className="text-muted">Education</span>
              <span className="text-cream text-right">MCA · Aditya University</span>
            </li>
            <li className="flex justify-between border-b border-line pb-2">
              <span className="text-muted">Graduating</span>
              <span className="text-cream">May 2026</span>
            </li>
            <li className="flex justify-between border-b border-line pb-2">
              <span className="text-muted">Experience</span>
              <span className="text-cream">1 Internship + 4 Projects</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted">Stack</span>
              <span className="text-cream">MERN · AI · DevOps</span>
            </li>
          </ul>
        </div>
      </div>
    </Reveal>
  </section>
);

/* ============================================================
   Work — alternating story rows
   ============================================================ */
const WorkRow: React.FC<{ item: WorkItem; index: number }> = ({ item, index }) => {
  const navigate = useNavigate();
  const cream = index % 2 === 1;
  const sign = index % 2 === 0 ? -1 : 1;

  const open = () => { if (item.detail) navigate(`/projects/${item.id}`); };

  return (
    <div
      onClick={open}
      data-cursor={item.detail ? 'view' : 'soon'}
      className={cn(
        'group relative overflow-hidden border-t border-line',
        cream ? 'section-cream' : 'bg-base',
        item.detail ? 'cursor-pointer' : 'cursor-default'
      )}
    >
      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 py-12 md:py-20">
        <div className="flex items-center">
          {/* number */}
          <span className="o-mono shrink-0 w-8 md:w-14 self-start pt-1">{String(index + 1).padStart(2, '0')}</span>

          {/* center group (image + title), nudged by sign */}
          <div
            className="flex-1 flex items-center gap-4 md:gap-10 min-w-0"
            style={{ justifyContent: 'center', transform: `translateX(${sign * 4}%)` }}
          >
            {item.detail ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: sign * 6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: sign * 4 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="shrink-0 w-24 h-16 md:w-52 md:h-32 bg-cover bg-center shadow-2xl transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105"
                style={{ backgroundImage: `url("${item.preview}")` }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: sign * 6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: sign * 4 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="shrink-0 w-24 h-16 md:w-52 md:h-32 flex flex-col items-center justify-center gap-1 border border-dashed shadow-2xl transition-transform duration-500 group-hover:rotate-0"
                style={{ backgroundColor: 'var(--bg-2)', borderColor: 'var(--line-strong)' }}
              >
                <span className="o-mono text-[8px] md:text-[10px]">In progress</span>
                <span className="o-mono text-[7px] md:text-[9px] opacity-60">Coming soon</span>
              </motion.div>
            )}
            <h3 className="font-display text-row text-balance min-w-0" style={{ color: 'var(--display-color)' }}>
              {item.name}
            </h3>
          </div>

          {/* meta / cta */}
          <div className="hidden md:flex flex-col items-end gap-2 shrink-0 w-44 self-end">
            <span className="o-mono">{item.discipline}</span>
            <span className="o-mono">{item.year}</span>
            <span className="o-mono flex items-center gap-1.5" style={{ color: cream ? 'var(--ink)' : 'var(--cream)' }}>
              {item.detail ? 'View case study' : 'Coming soon'}
              {item.detail && <ArrowUpRight className="w-3.5 h-3.5" />}
            </span>
          </div>
        </div>

        {/* mobile meta */}
        <div className="md:hidden mt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 o-mono text-center" style={{ color: cream ? 'var(--ink)' : 'var(--muted)' }}>
          <span>{item.discipline}</span>
          <span aria-hidden>·</span>
          <span>{item.year}</span>
          <span aria-hidden>·</span>
          <span style={{ color: cream ? 'var(--ink)' : 'var(--cream)' }}>{item.detail ? 'View case study' : 'Coming soon'}</span>
        </div>
      </div>
    </div>
  );
};

const Work: React.FC = () => {
  return (
    <section id="work" className="w-full">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-6">
        <Reveal>
          <Chapter no="02" label="selected work" className="text-cream border-b border-line pb-4" />
        </Reveal>
      </div>
      <div>
        {WORK_ITEMS.map((item, i) => (
          <WorkRow key={item.id} item={item} index={i} />
        ))}
        <div className="border-t border-line" />
      </div>
    </section>
  );
};

/* ============================================================
   Skills
   ============================================================ */
const SKILL_GROUPS = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React.js', level: 5 },
      { name: 'JavaScript (ES6+)', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'Tailwind CSS', level: 5 },
      { name: 'HTML / CSS', level: 5 },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 5 },
      { name: 'Express.js', level: 5 },
      { name: 'MongoDB', level: 4 },
      { name: 'REST APIs', level: 5 },
      { name: 'Socket.io', level: 4 },
    ],
  },
  {
    label: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub', level: 5 },
      { name: 'GitHub Actions', level: 4 },
      { name: 'Vercel / Render', level: 5 },
      { name: 'Nodemailer', level: 4 },
      { name: 'JWT / Auth', level: 4 },
    ],
  },
  {
    label: 'AI & Emerging',
    skills: [
      { name: 'NLP (Chatbots)', level: 3 },
      { name: 'Generative AI', level: 3 },
      { name: 'Prompt Engineering', level: 4 },
    ],
  },
];

const getGroupIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case 'frontend':
      return <Code2 className="w-5 h-5 text-cream" />;
    case 'backend':
      return <Terminal className="w-5 h-5 text-cream" />;
    case 'tools & devops':
      return <Settings className="w-5 h-5 text-cream" />;
    case 'ai & emerging':
      return <Sparkles className="w-5 h-5 text-cream" />;
    default:
      return null;
  }
};

const Skills: React.FC = () => (
  <section id="skills" className="px-5 md:px-10 py-20 md:py-28 border-t border-line">
    <div className="max-w-[1500px] mx-auto">
      <Reveal>
        <div className="flex items-center justify-between o-mono text-cream border-b border-line pb-4 mb-16">
          <span>Chapter 02</span>
          <span>skills & proficiency</span>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
        {SKILL_GROUPS.map((group, gi) => (
          <Reveal key={group.label} delay={gi * 0.07}>
            <div className="border border-line bg-cream/[0.01] hover:bg-cream/[0.03] backdrop-blur-sm p-6 md:p-8 flex flex-col hover:border-line-strong transition-all duration-500 group/card relative overflow-hidden h-full">
              {/* Premium Hover Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cream scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="flex items-center gap-3.5 mb-8">
                <div className="w-9 h-9 rounded-full bg-cream/5 border border-line flex items-center justify-center group-hover/card:bg-cream/15 group-hover/card:border-line-strong transition-all duration-300">
                  {getGroupIcon(group.label)}
                </div>
                <h3 className="font-display text-cream text-lg tracking-wider uppercase">{group.label}</h3>
              </div>

              <div className="space-y-6 flex-1">
                {group.skills.map((s) => (
                  <div key={s.name} className="flex flex-col gap-2 group/skill">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-body font-mono text-cream/90 group-hover/card:text-cream transition-colors">{s.name}</span>
                      <span className="o-mono text-[9px] text-muted">{s.level * 20}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-cream/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level * 20}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: EASE }}
                        className="h-full bg-cream"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   Capabilities
   ============================================================ */
const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="px-5 md:px-10 py-20 md:py-32">
      <div className="max-w-[1500px] mx-auto">
        <Reveal>
          <Chapter no="03" label="capabilities" className="text-cream border-b border-line pb-4" />
        </Reveal>
        <h2 className="font-display text-h2 text-cream mt-10 md:mt-16 max-w-[16ch]">
          <RevealLines lines={['Four disciplines,', 'one developer.']} />
        </h2>
        <div className="mt-12 md:mt-20 border-t border-line">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.no} delay={i * 0.05}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 md:py-9 border-b border-line">
                <span className="o-mono md:col-span-1">{cap.no}</span>
                <h3 className="md:col-span-4 font-display text-cream" style={{ fontSize: 'clamp(1.5rem,2.6vw,2.4rem)' }}>{cap.title}</h3>
                <p className="md:col-span-5 text-body text-sm md:text-base leading-relaxed">{cap.body}</p>
                <div className="md:col-span-2 flex flex-wrap gap-1.5 content-start">
                  {cap.tools.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full border border-line o-mono text-[9px]">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Freelance Process (only shown in freelance mode)
   ============================================================ */
const PROCESS_STEPS = [
  { no: '01', title: 'Discovery', body: 'We discuss your idea, goals, and constraints. I ask questions until I fully understand the problem — no boilerplate forms.' },
  { no: '02', title: 'Proposal', body: 'I send a detailed written proposal: scope, timeline, deliverables, and a fixed price. No surprise bills.' },
  { no: '03', title: 'Build', body: 'I design, develop, and test your product — sharing progress at every milestone. You give feedback; I iterate.' },
  { no: '04', title: 'Launch', body: 'I deploy your product and hand over the keys — full codebase, docs, and 2 weeks of post-launch support included.' },
];

const FreelanceProcess: React.FC = () => (
  <section className="px-5 md:px-10 py-20 md:py-28 border-t border-line">
    <div className="max-w-[1500px] mx-auto">
      <Reveal>
        <div className="flex items-center justify-between o-mono text-cream border-b border-line pb-4 mb-14">
          <span>How it works</span>
          <span>4-step process</span>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.no} delay={i * 0.08}>
            <div className="border border-line p-6 h-full flex flex-col">
              <span className="o-mono text-muted text-[10px] mb-4">{step.no}</span>
              <h3 className="font-display text-cream text-2xl mb-3">{step.title}</h3>
              <p className="text-body text-sm leading-relaxed flex-1">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Experience: React.FC = () => {
  return (
    <section id="experience" className="px-5 md:px-10 py-20 md:py-32 border-t border-line">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
        <div className="md:col-span-4">
          <Reveal>
            <Chapter no="04" label="background & work" className="text-cream border-b border-line pb-4 mb-10" />
          </Reveal>
        </div>
        <div className="md:col-span-8 flex flex-col gap-16">
          <Reveal>
            <h3 className="o-mono text-cream mb-6">Professional Experience</h3>
            <div className="flex flex-col gap-12">
              <div className="border-l border-line pl-6 relative">
                <div className="absolute w-2 h-2 rounded-full bg-cream -left-[4.5px] top-2" />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h4 className="font-display text-2xl text-cream">Freelance Developer</h4>
                  <span className="o-mono text-muted text-sm mt-1 md:mt-0">2024 – Present</span>
                </div>
                <p className="text-body o-mono text-sm mb-4">Self-Employed</p>
                <p className="text-body leading-relaxed max-w-2xl">
                  Building custom full-stack MERN applications for clients — specializing in ERP dashboards, multi-role portals, and e-commerce platforms. Delivered 3 production systems in 2024–2025.
                </p>
              </div>

              <div className="border-l border-line pl-6 relative">
                <div className="absolute w-2 h-2 rounded-full bg-line -left-[4.5px] top-2" />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h4 className="font-display text-2xl text-cream">Full Stack Developer Intern</h4>
                  <span className="o-mono text-muted text-sm mt-1 md:mt-0">Jun 2025 – Jul 2025</span>
                </div>
                <p className="text-body o-mono text-sm mb-4">Technical Hub Pvt. Ltd — Bhimavaram, India</p>
                <p className="text-body leading-relaxed max-w-2xl">
                  Contributed to Guards Hub — a security roster management system for Aditya University. Designed rule-based scheduling logic with constraint validation and real-time collision detection, eliminating 100% of shift conflicts for 100+ campus security guards and saving ~10 hours of admin work per week.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h3 className="o-mono text-cream mb-6">Education</h3>
            <div className="flex flex-col gap-8">
              <div className="border-l border-line pl-6 relative">
                <div className="absolute w-2 h-2 rounded-full bg-line -left-[4.5px] top-2" />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h4 className="font-display text-xl text-cream">Master of Computer Applications (MCA)
                    <span className="ml-2 inline-block o-mono text-[9px] text-emerald-400 border border-emerald-400/40 rounded px-2 py-0.5 align-middle">Currently Enrolled</span>
                  </h4>
                  <span className="o-mono text-muted text-sm mt-1 md:mt-0">Aug 2024 – May 2026 (Expected)</span>
                </div>
                <p className="text-body text-sm">Aditya University — CGPA: 7.70</p>
              </div>
              <div className="border-l border-line pl-6 relative">
                <div className="absolute w-2 h-2 rounded-full bg-line -left-[4.5px] top-2" />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h4 className="font-display text-xl text-cream">Bachelor of Computer Applications (BCA)</h4>
                  <span className="o-mono text-muted text-sm mt-1 md:mt-0">Aug 2021 – May 2024</span>
                </div>
                <p className="text-body text-sm">Aditya Degree College — CGPA: 7.24</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h3 className="o-mono text-cream mb-6">Certifications & Awards</h3>
            <ul className="space-y-4">
              <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-line pb-4">
                <span className="text-body">Full Stack Developer — Technical Hub Pvt. Ltd</span>
                <span className="o-mono text-muted text-sm mt-1 md:mt-0">Jun 2025</span>
              </li>
              <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-line pb-4">
                <span className="text-body">Project Space Hackathon — Technical Hub Pvt. Ltd</span>
                <span className="o-mono text-muted text-sm mt-1 md:mt-0">Jun 2025</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Gallery — draggable frames
   ============================================================ */
const Gallery: React.FC = () => {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const onDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    if (e.pointerType !== 'mouse') return; // touch/pen use native momentum scroll
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const onUp = (e: React.PointerEvent) => {
    drag.current.down = false;
    try { scroller.current?.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  };

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        data-cursor="drag"
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-5 md:px-10 select-none"
        style={{ touchAction: 'pan-x pan-y', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {GALLERY.map((src, i) => (
          <div
            key={i}
            className="shrink-0 w-[82vw] sm:w-[54vw] md:w-[34vw] aspect-[16/10] bg-cover bg-center border border-line"
            style={{ backgroundImage: `url("${src}")`, backgroundColor: 'var(--bg-2)' }}
            draggable={false}
          />
        ))}
      </div>
    </section>
  );
};

/* ============================================================
   Guestbook
   ============================================================ */
interface Note { id: string; name: string; role: string; message: string; timestamp: number; likes: number; }

const SEED_NOTES: Note[] = [
  { id: 's1', name: 'Riya', role: 'Frontend Engineer', message: 'The type system and motion here are genuinely tasteful. Bookmarking for inspiration.', timestamp: Date.now() - 86400000 * 9, likes: 7 },
  { id: 's2', name: 'Marcus', role: 'Full Stack Engineer', message: 'Loved the AUSVMS implementation — clean architecture and smooth OTP flow. Solid work.', timestamp: Date.now() - 86400000 * 4, likes: 11 },
  { id: 's3', name: 'Aanya', role: 'Designer', message: 'Rare to see a data portfolio with this much craft. The work index interaction is lovely.', timestamp: Date.now() - 86400000 * 1, likes: 5 },
];

const ADMIN_HASH = '9f895aa43bb435e31058fd8892b6bbb00899b0d73a2e35d7749c2d51c6e8fb6b';
async function hashCode(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
const timeAgo = (ts: number) => {
  const d = Math.floor((Date.now() - ts) / 86400000);
  if (d <= 0) return 'today';
  if (d === 1) return 'yesterday';
  if (d < 7) return `${d}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return `${Math.floor(d / 30)}mo ago`;
};

const NoteCard: React.FC<{ note: Note; index: number; liked: boolean; isAdmin: boolean; onLike: (id: string) => void; onDelete: (id: string) => void; }> = ({ note, index, liked, isAdmin, onLike, onDelete }) => {
  const initials = note.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index, 6) * 0.05, duration: 0.6, ease: EASE }}
      className="relative break-inside-avoid mb-4 md:mb-5 p-5 md:p-6 border border-line"
    >
      {isAdmin && (
        <button onClick={() => onDelete(note.id)} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500/15 flex items-center justify-center" aria-label="Delete">
          <X className="w-3.5 h-3.5 text-red-400" />
        </button>
      )}
      <p className="text-body leading-relaxed text-sm md:text-[15px] mb-5">{note.message}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full border border-line flex items-center justify-center o-mono text-[10px] text-cream">{initials}</span>
          <div className="leading-tight">
            <p className="text-body text-sm">{note.name}</p>
            <p className="o-mono text-[9px]">{note.role}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button onClick={() => onLike(note.id)} data-cursor="hover" className="flex items-center gap-1.5 group/like">
            <Heart className={cn('w-4 h-4 transition-all', liked ? 'fill-current text-cream scale-110' : 'text-muted group-hover/like:text-cream')} />
            <span className={cn('o-mono text-[10px]', liked ? 'text-cream' : 'text-muted')}>{note.likes}</span>
          </button>
          <span className="o-mono text-[9px]">{timeAgo(note.timestamp)}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Guestbook: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(SEED_NOTES);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');
  const lastSubmit = useRef(0);
  const MAX = 240;

  useEffect(() => {
    let likes = new Set<string>();
    try { const l = localStorage.getItem('gb-likes'); if (l) likes = new Set(JSON.parse(l)); } catch { /* ignore */ }
    setLiked(likes);
    const base = SEED_NOTES.map((n) => ({ ...n, likes: n.likes + (likes.has(n.id) ? 1 : 0) }));
    try {
      const stored = localStorage.getItem('gb-notes');
      if (stored) {
        const user = (JSON.parse(stored) as Note[]).map((n) => ({ ...n, likes: n.likes + (likes.has(n.id) ? 1 : 0) }));
        setNotes([...user, ...base]);
      } else setNotes(base);
    } catch { setNotes(base); }
    if (localStorage.getItem('gb-admin') === '1') setIsAdmin(true);
  }, []);

  useEffect(() => {
    const onKey = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdmin) { setIsAdmin(false); localStorage.removeItem('gb-admin'); return; }
        const code = prompt('Admin code:');
        if (!code) return;
        if ((await hashCode(code)) === ADMIN_HASH) { setIsAdmin(true); localStorage.setItem('gb-admin', '1'); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isAdmin]);

  const flash = (m: string, err = false) => {
    if (err) { setError(m); setTimeout(() => setError(''), 4000); }
    else { setToast(m); setTimeout(() => setToast(''), 3500); }
  };

  const onLike = useCallback((id: string) => {
    setLiked((prev) => {
      const was = prev.has(id);
      const next = new Set(prev);
      was ? next.delete(id) : next.add(id);
      localStorage.setItem('gb-likes', JSON.stringify([...next]));
      setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, likes: n.likes + (was ? -1 : 1) } : n)));
      return next;
    });
  }, []);

  const onDelete = useCallback((id: string) => {
    setNotes((ns) => ns.filter((n) => n.id !== id));
    try {
      const stored = JSON.parse(localStorage.getItem('gb-notes') || '[]') as Note[];
      localStorage.setItem('gb-notes', JSON.stringify(stored.filter((n) => n.id !== id)));
    } catch { /* ignore */ }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmit.current < 60000) return flash('Hold on a minute before signing again.', true);
    if (message.trim().split(/\s+/).length < 4) return flash('A few more words, please — at least 4.', true);
    if (/\b(buy now|click here|free money|casino|crypto pump|https?:\/\/)\b/i.test(message)) return flash('That looks like spam. Try rewording it.', true);
    const count = parseInt(localStorage.getItem('gb-count') || '0', 10);
    if (count >= 5) return flash("You've hit the signing limit for this session — thank you!", true);
    setSubmitting(true);
    lastSubmit.current = now;
    setTimeout(() => {
      const note: Note = { id: crypto.randomUUID(), name: name.trim(), role: role.trim() || 'Visitor', message: message.trim(), timestamp: Date.now(), likes: 0 };
      try {
        const stored = JSON.parse(localStorage.getItem('gb-notes') || '[]') as Note[];
        stored.unshift(note);
        localStorage.setItem('gb-notes', JSON.stringify(stored));
        localStorage.setItem('gb-count', String(count + 1));
      } catch { /* ignore */ }
      setNotes((ns) => [note, ...ns]);
      setName(''); setRole(''); setMessage('');
      setSubmitting(false);
      flash('Signed. Thanks for leaving a mark.');
    }, 900);
  };

  const valid = name.trim().length > 1 && message.trim().length > 8;

  return (
    <section id="guestbook" className="px-5 md:px-10 py-20 md:py-32 border-t border-line">
      <div className="max-w-[1500px] mx-auto">
        <Reveal>
          <Chapter no="05" label={`guestbook — ${notes.length} signatures`} className="text-cream border-b border-line pb-4" />
        </Reveal>
        <h2 className="font-display text-h2 text-cream mt-10 md:mt-16">
          <RevealLines lines={['Sign the wall.']} />
          {isAdmin && <span className="ml-3 align-middle o-mono text-[9px] text-red-400 border border-red-400/40 rounded px-2 py-0.5">ADMIN</span>}
        </h2>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <form onSubmit={submit} className="lg:sticky lg:top-24 p-6 border border-line flex flex-col gap-4">
              <h3 className="font-display text-cream text-xl">Leave a note</h3>
              <div className="grid grid-cols-2 gap-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name *" className="bg-transparent border border-line px-4 py-3 text-sm text-body placeholder:text-muted focus:outline-none focus:border-line-strong" />
                <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="bg-transparent border border-line px-4 py-3 text-sm text-body placeholder:text-muted focus:outline-none focus:border-line-strong" />
              </div>
              <div className="relative">
                <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, MAX))} placeholder="Say something nice (or honest)…" rows={4} className="w-full bg-transparent border border-line px-4 py-3 text-sm text-body placeholder:text-muted resize-none focus:outline-none focus:border-line-strong" />
                <span className="absolute bottom-2.5 right-3 o-mono text-[9px]">{message.length}/{MAX}</span>
              </div>
              <AnimatePresence>
                {error && <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs">{error}</motion.p>}
              </AnimatePresence>
              <button type="submit" disabled={!valid || submitting} data-cursor="hover" className={cn('inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium transition-all', valid && !submitting ? 'bg-cream text-ink' : 'border border-line text-muted cursor-not-allowed')}>
                {submitting ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> Signing…</> : <>Sign guestbook <ArrowUpRight className="w-4 h-4" /></>}
              </button>
            </form>
          </div>
          <div className="lg:col-span-8">
            <div className="columns-1 sm:columns-2 gap-4 md:gap-5">
              {notes.map((note, i) => (
                <NoteCard key={note.id} note={note} index={i} liked={liked.has(note.id)} isAdmin={isAdmin} onLike={onLike} onDelete={onDelete} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2.5 bg-cream text-ink shadow-2xl">
            <Check className="w-4 h-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ============================================================
   Footer
   ============================================================ */
const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="px-5 md:px-10 pt-20 md:pt-28 pb-6 border-t border-line">
      <div className="max-w-[1500px] mx-auto">
        <Reveal>
          <Chapter no="06" label="contact" className="text-cream border-b border-line pb-4" />
        </Reveal>

        <div className="mt-12 md:mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2 className="font-display text-h2 text-cream max-w-[14ch]">
            <RevealLines lines={["Let's build", 'something', 'that matters.']} />
          </h2>
          <Magnetic as="a" href="mailto:narayananaiduthota@gmail.com" cursor="email" className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-cream text-ink text-base font-medium w-fit">
            narayananaiduthota@gmail.com
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Magnetic>
        </div>

        {/* Contact form */}
        <Reveal>
          <div className="mt-16 md:mt-20 border-t border-line pt-12">
            <p className="o-mono text-muted mb-2 text-xs uppercase tracking-widest">Start a project</p>
            <ContactForm />
          </div>
        </Reveal>


        {/* columns */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 o-mono border-t border-line pt-8">
          <div>
            <p className="text-muted mb-3">Sitemap</p>
            {NAV.slice(1).map((n) => (
              <button key={n.label} onClick={() => (n.target === 'top' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : document.getElementById(n.target)?.scrollIntoView({ behavior: 'smooth' }))} data-cursor="hover" className="block text-cream link-underline w-fit mb-1">{n.label}</button>
            ))}
          </div>
          <div>
            <p className="text-muted mb-3">Connect</p>
            <a href="https://github.com/Narayaaana11" target="_blank" rel="noreferrer" data-cursor="open" className="block text-cream link-underline w-fit mb-1">GitHub</a>
            <a href="https://www.linkedin.com/in/narayaaana/" target="_blank" rel="noreferrer" data-cursor="open" className="block text-cream link-underline w-fit mb-1">LinkedIn</a>
          </div>
          <div>
            <p className="text-muted mb-3">Located</p>
            <p className="text-cream">Bhimavaram,<br />India</p>
          </div>
          <div>
            <p className="text-muted mb-3">Local time</p>
            <LocalTime className="text-cream" />
          </div>
        </div>

        {/* oversized wordmark */}
        <div className="mt-16 md:mt-24">
          <h2 className="font-display text-mega text-cream leading-[0.82]">Narayana<br />Thota</h2>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 o-mono">
          <span>© {year} Narayana Thota — Often imitated, never duplicated</span>
          <span>Designed &amp; built by Narayana Thota</span>
        </div>
      </div>
    </footer>
  );
};

/* ============================================================
   Page assembly
   ============================================================ */
function HomePage() {
  const location = useLocation();
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // boot
  useEffect(() => {
    const nav = navigator as any;
    const cores = nav.hardwareConcurrency || 8;
    const memory = nav.deviceMemory || 8;
    if (/android/i.test(navigator.userAgent) && (cores <= 4 || memory <= 4)) {
      document.documentElement.classList.add('low-end-device');
    }
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: 'smooth' }), 150);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // smooth scroll
  useEffect(() => {
    if (!isDesktop || reduced) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null; };
  }, [isDesktop, reduced]);

  // lock scroll while menu is open
  useEffect(() => {
    if (menuOpen) { lenisRef.current?.stop(); document.body.style.overflow = 'hidden'; }
    else { lenisRef.current?.start(); document.body.style.overflow = ''; }
  }, [menuOpen]);

  const handleNavigate = (target: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = target === 'top' ? document.body : document.getElementById(target);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: 0, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 600); // Wait for menu to mostly close before scrolling
  };

  return (
    <div className="bg-base min-h-screen overflow-x-clip">
      <ScrollProgress />
      <TopBar onMenu={() => setMenuOpen((o) => !o)} menuOpen={menuOpen} />
      <Menu open={menuOpen} onNavigate={handleNavigate} onClose={() => setMenuOpen(false)} />
      <BackToTop />
      <main id="top">
        <Hero />
        <Band />
        <About />
        <Skills />
        <Work />
        <Gallery />
        <Capabilities />
        <FreelanceProcess />
        <Experience />
        <Guestbook />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}

