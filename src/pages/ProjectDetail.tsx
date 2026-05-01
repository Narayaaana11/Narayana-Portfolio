import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'motion/react';
import { ArrowLeft, ArrowUpRight, ArrowUp, ExternalLink, X, Play, Pause } from 'lucide-react';
import { projectDetails } from '../data/projects';

const ease = [0.16, 1, 0.3, 1] as const;

// Lightbox modal
const Lightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out p-4 md:p-8"
      style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))', paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease }}
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
};

// Staggered children wrapper
const Stagger = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.12, delayChildren: delay } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const FadeUp = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scroll-triggered fade — slow and premium
const Reveal = ({ children, className, delay = 0, ...rest }: { children: React.ReactNode; className?: string; delay?: number; [key: string]: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ImageWithFallback = ({ src, alt, className, onClick }: { src: string; alt: string; className?: string; onClick?: () => void }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`w-full aspect-[16/10] flex items-center justify-center bg-gradient-to-br from-black/[0.02] to-black/[0.05] ${className || ''}`}>
        <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">Screenshot coming soon</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto ${onClick ? 'cursor-zoom-in' : ''} ${className || ''}`}
      loading="lazy"
      onClick={onClick}
      onError={() => setFailed(true)}
    />
  );
};

// Scroll progress bar
const ScrollProgress = ({ color }: { color: string }) => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{ scaleX: scrollYProgress, backgroundColor: color }}
    />
  );
};

// Back to top
const BackToTop = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setVisible(v > 0.15));
  const scrollUp = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollUp}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Video player with play/pause
const VideoPlayer = ({ src, color }: { src: string; color: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  if (hasError) return null;

  return (
    <div>
      <div className="relative rounded-2xl md:rounded-[28px] overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] transition-colors duration-500 group">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-auto"
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setHasError(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <button
          onClick={toggle}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          <div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
            style={{
              backgroundColor: `${color}dd`,
              boxShadow: `0 4px 20px ${color}40`,
            }}
          >
            {playing ? (
              <Pause className="w-5 h-5 md:w-6 md:h-6 text-white" fill="white" />
            ) : (
              <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" fill="white" />
            )}
          </div>
        </button>
      </div>
      <p className="text-[10px] md:text-xs font-mono text-gray-400 tracking-wide mt-3 text-center">
        Click to {playing ? 'pause' : 'play'} demo
      </p>
    </div>
  );
};

// Scroll-reveal description — word by word like the About section
const DescriptionReveal = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"]
  });
  const words = text.split(" ");

  return (
    <section className="px-6 md:px-24 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">
        <p ref={ref} className="text-2xl md:text-2xl lg:text-3xl font-medium leading-relaxed tracking-tight flex flex-wrap">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return <DescriptionWord key={i} word={word} start={start} end={end} scrollYProgress={scrollYProgress} />;
          })}
        </p>
      </div>
    </section>
  );
};

const DescriptionWord = ({ word, start, end, scrollYProgress, ...rest }: { word: string; start: number; end: number; scrollYProgress: any; [key: string]: any }) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] mb-[0.1em] text-black dark:text-white transition-colors duration-500">
      {word}
    </motion.span>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectDetails.find(p => p.id === id);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  // Scroll to top on mount — force it before and after render
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    // Also force after a tick in case layout shifts
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    });
  }, [id]);

  const goToProjects = () => {
    navigate('/', { state: { scrollTo: 'projects' } });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] flex items-center justify-center px-6 transition-colors duration-500">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tighter mb-4 text-black dark:text-white transition-colors duration-500">Project not found</h1>
          <button onClick={() => navigate('/')} className="text-sm font-mono text-gray-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
            ← Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  // Find next project for navigation
  const currentIndex = projectDetails.findIndex(p => p.id === id);
  const nextProject = projectDetails[(currentIndex + 1) % projectDetails.length];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black overflow-hidden transition-colors duration-500">
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
      <ScrollProgress color={project.color} />
      <BackToTop />

      {/* Fixed back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease }}
        className="fixed top-5 md:top-8 left-4 md:left-8 z-50"
      >
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
          className="flex items-center gap-2 px-3.5 md:px-4 py-2 md:py-2.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/10 text-[10px] md:text-xs font-mono tracking-widest uppercase text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/20 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-3 h-3 md:w-3.5 md:h-3.5" />
          Back
        </button>
      </motion.div>

      {/* ===== HERO ===== */}
      <section className="relative pt-24 md:pt-32 pb-8 md:pb-12 px-6 md:px-24 overflow-hidden">
        {/* Ambient color glow */}
        <div
          className="absolute top-0 right-0 w-[60%] h-[60%] rounded-full blur-[150px] opacity-[0.07] pointer-events-none"
          style={{ backgroundColor: project.color }}
        />

        <div className="max-w-5xl mx-auto relative">
          <Stagger delay={0.1}>
            <FadeUp>
              <span
                className="inline-block font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6 px-3 py-1 rounded-full border"
                style={{ color: project.color, borderColor: `${project.color}30` }}
              >
                {project.type}
              </span>
            </FadeUp>
            <FadeUp>
              <h1 className="text-[11vw] md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-4 md:mb-6">
                {project.name}
              </h1>
            </FadeUp>
            <FadeUp>
              <p className="text-lg md:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mb-6 md:mb-8 transition-colors duration-500">
                {project.tagline}
              </p>
            </FadeUp>
            <FadeUp>
              <div className="flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full text-white text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    style={{ backgroundColor: project.color }}
                  >
                    Visit Live
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </FadeUp>
          </Stagger>
        </div>
      </section>

      {/* ===== HERO VISUAL: Video first, then image fallback ===== */}
      {project.video ? (
        <section className="px-4 md:px-16 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease }}
            className="max-w-6xl mx-auto"
          >
            <VideoPlayer src={project.video} color={project.color} />
          </motion.div>
        </section>
      ) : project.images[0] ? (
        <section className="px-4 md:px-16 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease }}
            className="max-w-6xl mx-auto"
          >
            <div className="rounded-2xl md:rounded-[28px] overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] transition-colors duration-500">
              <ImageWithFallback
                src={project.images[0].src}
                alt={project.images[0].alt}
                onClick={() => setLightbox({ src: project.images[0].src, alt: project.images[0].alt })}
              />
            </div>
            <p className="text-[10px] md:text-xs font-mono text-gray-400 tracking-wide mt-3 text-center">
              {project.images[0].caption}
            </p>
          </motion.div>
        </section>
      ) : null}

      {/* ===== DESCRIPTION — scroll-reveal word by word ===== */}
      <DescriptionReveal text={project.description} />

      {/* ===== PROBLEM + APPROACH ===== */}
      <section className="px-6 md:px-24 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            <Reveal>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] rounded-full bg-black/20" />
                  <h2 className="text-[10px] md:text-xs font-mono text-gray-400 tracking-[0.2em] uppercase">The Problem</h2>
                </div>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-500">{project.problem}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] rounded-full" style={{ backgroundColor: project.color }} />
                  <h2 className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase" style={{ color: project.color }}>The Approach</h2>
                </div>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-500">{project.approach}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="px-6 md:px-24 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-10 md:mb-16">
              <div className="w-8 h-[2px] rounded-full" style={{ backgroundColor: project.color }} />
              <h2 className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase" style={{ color: project.color }}>Key Features</h2>
            </div>
          </Reveal>

          <div className="flex flex-col gap-14 md:gap-32">
            {project.features.map((feature, i) => (
              <div
                key={i}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
              >
                {/* Image */}
                <Reveal className="flex-1 w-full">
                  <div className="rounded-2xl md:rounded-[24px] overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] transition-shadow duration-500">
                    <ImageWithFallback
                      src={feature.image || ''}
                      alt={feature.title}
                      onClick={feature.image ? () => setLightbox({ src: feature.image!, alt: feature.title }) : undefined}
                    />
                  </div>
                </Reveal>
                {/* Text */}
                <Reveal delay={0.1} className="flex-1">
                  <div className="flex flex-col gap-3 md:gap-4">
                    <span className="text-5xl md:text-7xl font-black tracking-tighter opacity-[0.06] leading-none select-none">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter uppercase -mt-8 md:-mt-12">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed transition-colors duration-500">{feature.description}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH STACK ===== */}
      <section className="px-6 md:px-24 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-10 md:mb-12">
              <div className="w-8 h-[2px] rounded-full bg-black/20" />
              <h2 className="text-[10px] md:text-xs font-mono text-gray-400 tracking-[0.2em] uppercase">Built With</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {project.techStack.map((tech, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors group">
                  <h4 className="text-xs md:text-sm font-bold tracking-tight text-black dark:text-white mb-0.5 md:mb-1 transition-colors duration-500">{tech.name}</h4>
                  <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed">{tech.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ADDITIONAL IMAGES ===== */}
      {project.images.length > 1 && (
        <section className="px-4 md:px-16 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {project.images.slice(1).map((img, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="rounded-2xl md:rounded-[24px] overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] transition-colors duration-500">
                    <ImageWithFallback
                      src={img.src}
                      alt={img.alt}
                      onClick={() => setLightbox({ src: img.src, alt: img.alt })}
                    />
                  </div>
                  <p className="text-[10px] md:text-xs font-mono text-gray-400 tracking-wide mt-2 md:mt-3 text-center">{img.caption}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== NEXT PROJECT ===== */}
      {nextProject && nextProject.id !== project.id && (
        <section className="px-6 md:px-24 py-16 md:py-24 border-t border-black/10 dark:border-white/10 transition-colors duration-500">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-[10px] md:text-xs font-mono text-gray-400 tracking-[0.2em] uppercase mb-4">Next Project</p>
              <button
                onClick={() => navigate(`/projects/${nextProject.id}`)}
                className="group flex items-center gap-3 md:gap-4 cursor-pointer text-left"
              >
                <h2 className="text-2xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase group-hover:opacity-60 transition-opacity leading-none">
                  {nextProject.name}
                </h2>
                <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors flex-shrink-0" />
              </button>
              <p className="text-gray-400 text-sm mt-2">{nextProject.tagline}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== BOTTOM CTA ===== */}
      <section className="px-6 md:px-24 py-12 md:py-16 border-t border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] transition-colors duration-500">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">Explore more work</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all hover:opacity-80 active:scale-[0.98]"
                style={{ backgroundColor: project.color }}
              >
                Live Project <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href="https://github.com/ArinPattnaik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all hover:opacity-80 active:scale-[0.98]"
            >
              See More Work <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={goToProjects}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[10px] md:text-xs font-mono tracking-widest uppercase text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all cursor-pointer active:scale-[0.98]"
            >
              All Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
