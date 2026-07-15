import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { ArrowLeft, ArrowUpRight, ExternalLink, X, Play, Pause } from 'lucide-react';
import { projectDetails } from '../data/projects';
import { ScrollProgress, BackToTop, Magnetic, Reveal, ScrollRevealText, EASE } from '../components/ui';
import { cn, useIsDesktop, usePrefersReducedMotion } from '../lib/utils';

/* ---------- Lightbox ---------- */
const Lightbox: React.FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-10" onClick={onClose}>
      <button onClick={onClose} aria-label="Close" data-cursor="hover" className="absolute top-5 right-5 w-11 h-11 rounded-full border border-line flex items-center justify-center text-cream">
        <X className="w-5 h-5" />
      </button>
      <motion.img initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}
        src={src} alt={alt} onClick={(e) => e.stopPropagation()} className="max-w-full max-h-full object-contain shadow-2xl" />
    </motion.div>
  );
};

const SmartImage: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({ src, alt, className, onClick }) => {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return <div className={cn('w-full aspect-[16/10] flex items-center justify-center', className)} style={{ backgroundColor: 'var(--bg-2)' }}>
      <span className="o-mono">Screenshot coming soon</span>
    </div>;
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} onClick={onClick} data-cursor={onClick ? 'view' : undefined}
    className={cn('w-full h-auto', onClick && 'cursor-zoom-in', className)} />;
};

const VideoPlayer: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // force the property (attribute alone is unreliable in React)
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, [src]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  if (err) {
    return poster ? (
      <div>
        <div className="border border-line overflow-hidden"><img src={poster} alt="demo" className="w-full h-auto block" /></div>
        <p className="o-mono mt-3 text-center">Demo preview</p>
      </div>
    ) : null;
  }

  return (
    <div>
      <div className="relative overflow-hidden border border-line group" style={{ backgroundColor: 'var(--bg-2)' }}>
        <video
          ref={ref}
          src={src}
          poster={poster}
          className="w-full h-auto block"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => setErr(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <button onClick={toggle} data-cursor={playing ? 'pause' : 'play'} aria-label={playing ? 'Pause' : 'Play'} className="absolute inset-0 flex items-center justify-center">
          <div className={cn('w-16 h-16 rounded-full flex items-center justify-center bg-cream text-ink transition-opacity duration-300', playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100')}>
            {playing ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6 ml-0.5" fill="currentColor" />}
          </div>
        </button>
      </div>
      <p className="o-mono mt-3 text-center">Live demo</p>
    </div>
  );
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectDetails.find((p) => p.id === id);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  // Dynamic SEO: update page title and meta description per project
  useEffect(() => {
    if (!project) return;
    const prevTitle = document.title;
    document.title = `${project.name} — Narayana Thota | Full Stack Developer & AI Engineer`;
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      (metaDesc as HTMLMetaElement).name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', `${project.name} — ${project.tagline}. A case study by Narayana Thota, Full Stack Developer & AI Engineer from Bhimavaram, India.`);
    // Update og:title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const prevOgTitle = ogTitle?.getAttribute('content') || '';
    ogTitle?.setAttribute('content', `${project.name} — Narayana Thota Portfolio`);
    // Inject project JSON-LD
    const existingLd = document.getElementById('project-ld');
    existingLd?.remove();
    const ld = document.createElement('script');
    ld.id = 'project-ld';
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: project.name,
      description: project.tagline,
      applicationCategory: 'WebApplication',
      author: {
        '@type': 'Person',
        name: 'Narayana Thota',
        url: 'https://narayanathota.me/',
        sameAs: ['https://github.com/Narayaaana11', 'https://www.linkedin.com/in/narayaaana/'],
      },
      url: project.link || `https://narayanathota.me/projects/${project.id}`,
      isPartOf: { '@id': 'https://narayanathota.me/#website' },
    });
    document.head.appendChild(ld);
    return () => {
      document.title = prevTitle;
      metaDesc?.setAttribute('content', prevDesc);
      ogTitle?.setAttribute('content', prevOgTitle);
      document.getElementById('project-ld')?.remove();
    };
  }, [id, project]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0 }));
  }, [id]);

  useEffect(() => {
    if (!isDesktop || reduced) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [isDesktop, reduced, id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-giant text-cream mb-4">Not found</h1>
          <button onClick={() => navigate('/')} data-cursor="hover" className="o-mono link-underline text-cream">← Back to portfolio</button>
        </div>
      </div>
    );
  }

  const idx = projectDetails.findIndex((p) => p.id === id);
  const next = projectDetails[(idx + 1) % projectDetails.length];
  const heroBg = project.features?.[0]?.image || project.images?.[0]?.src || '/projects/pureplate/ai ingredeient analysis.png';

  return (
    <div className="min-h-screen bg-base overflow-x-clip">
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
      <ScrollProgress />
      <BackToTop />

      <div className="fixed top-5 md:top-7 left-5 md:left-8 z-[100]">
        <Magnetic onClick={() => navigate('/', { state: { scrollTo: 'work' } })} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-line backdrop-blur-md o-mono text-cream" style={{ backgroundColor: 'rgba(16,12,7,0.6)' }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Magnetic>
      </div>

      {/* HERO — full-screen, blurred placeholder image */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-110" style={{ backgroundImage: `url("${heroBg}")`, filter: 'blur(14px)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(16,12,7,0.5) 0%, rgba(16,12,7,0.4) 42%, rgba(16,12,7,0.82) 100%)' }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
            className="o-mono text-cream mb-5 px-3 py-1.5 border border-line rounded-full"
          >
            {project.type}
          </motion.span>
          <h1 className="font-display text-cream text-center px-4 max-w-full" style={{ fontSize: 'clamp(2.2rem, 11vw, 9rem)', lineHeight: 0.9, overflowWrap: 'anywhere' }}>
            <span className="reveal-line">
              <motion.span className="block" initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.15, ease: EASE }}>
                {project.name}
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
            className="text-body text-lg md:text-2xl leading-snug mt-5 max-w-2xl"
          >
            {project.tagline}
          </motion.p>
          {project.link && (
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }} className="mt-7 inline-flex">
              <Magnetic as="a" href={project.link} target="_blank" rel="noopener noreferrer" cursor="open" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cream text-ink text-sm font-medium">
                Visit Live <ExternalLink className="w-4 h-4" />
              </Magnetic>
            </motion.span>
          )}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="absolute bottom-7 left-5 md:left-10 o-mono text-cream z-10">A case study</motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="absolute bottom-7 right-5 md:right-10 o-mono text-cream z-10 text-right">({String(idx + 1).padStart(2, '0')})</motion.div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5">
          <span className="o-mono text-cream">Scroll for demo</span>
          <span className="w-5 h-8 rounded-full border border-line flex justify-center pt-1.5">
            <span className="animate-scroll-cue w-1 h-1.5 rounded-full bg-cream/60" />
          </span>
        </div>
      </section>

      {/* HERO VISUAL — the live demo (video autoplays) */}
      {project.video ? (
        <section className="px-5 md:px-10 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: EASE }} className="max-w-[1300px] mx-auto">
            <VideoPlayer src={project.video} poster={project.features?.[0]?.image} />
          </motion.div>
        </section>
      ) : project.images[0] ? (
        <section className="px-5 md:px-10 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: EASE }} className="max-w-[1300px] mx-auto border border-line overflow-hidden">
            <SmartImage src={project.images[0].src} alt={project.images[0].alt} onClick={() => setLightbox({ src: project.images[0].src, alt: project.images[0].alt })} />
          </motion.div>
        </section>
      ) : null}

      {/* DESCRIPTION */}
      <section className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <ScrollRevealText
            text={project.description}
            className="text-cream font-display"
            style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.9rem)', lineHeight: 1.2, fontStretch: '100%', textTransform: 'none', letterSpacing: '-0.005em' }}
          />
        </div>
      </section>

      {/* PROBLEM + APPROACH */}
      <section className="section-cream px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <Reveal>
            <h2 className="o-mono mb-4">The Problem</h2>
            <p className="text-body text-base md:text-lg leading-relaxed">{project.problem}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="o-mono mb-4">The Approach</h2>
            <p className="text-body text-base md:text-lg leading-relaxed">{project.approach}</p>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-5 md:px-10 py-16 md:py-28">
        <div className="max-w-[1300px] mx-auto">
          <Reveal><h2 className="o-mono text-cream border-b border-line pb-4 mb-12 md:mb-20">Key Features</h2></Reveal>
          <div className="flex flex-col gap-16 md:gap-32">
            {project.features.map((f, i) => (
              <div key={i} className={cn('flex flex-col gap-8 md:gap-16 items-center', i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')}>
                <Reveal className="flex-1 w-full">
                  <div className="border border-line overflow-hidden">
                    <SmartImage src={f.image || ''} alt={f.title} onClick={f.image ? () => setLightbox({ src: f.image!, alt: f.title }) : undefined} />
                  </div>
                </Reveal>
                <Reveal delay={0.1} className="flex-1">
                  <span className="o-mono">0{i + 1}</span>
                  <h3 className="font-display text-cream mt-3 mb-4" style={{ fontSize: 'clamp(1.6rem,3vw,2.8rem)' }}>{f.title}</h3>
                  <p className="text-body leading-relaxed">{f.description}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="px-5 md:px-10 py-16 md:py-24 border-t border-line">
        <div className="max-w-[1100px] mx-auto">
          <Reveal><h2 className="o-mono text-cream border-b border-line pb-4 mb-10">Built With</h2></Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {project.techStack.map((t, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="p-5 border border-line h-full">
                  <h4 className="text-body text-sm font-medium mb-1">{t.name}</h4>
                  <p className="o-mono text-[9px]">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADDITIONAL IMAGES */}
      {project.images.length > 1 && (
        <section className="px-5 md:px-10 py-12 md:py-20">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {project.images.slice(1).map((img, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="border border-line overflow-hidden"><SmartImage src={img.src} alt={img.alt} onClick={() => setLightbox({ src: img.src, alt: img.alt })} /></div>
                <p className="o-mono mt-2 text-center">{img.caption}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* NEXT */}
      {next && next.id !== project.id && (
        <section className="px-5 md:px-10 py-20 md:py-28 border-t border-line">
          <div className="max-w-[1500px] mx-auto">
            <p className="o-mono mb-5">Next Project</p>
            <button onClick={() => navigate(`/projects/${next.id}`)} data-cursor="view" className="group flex items-center gap-4 text-left">
              <h2 className="font-display text-giant text-cream">{next.name}</h2>
              <ArrowUpRight className="w-8 h-8 text-cream shrink-0" />
            </button>
            <p className="text-muted text-sm mt-3">{next.tagline}</p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-cream px-5 md:px-10 py-12 md:py-16">
        <div className="max-w-[1500px] mx-auto flex flex-col gap-6">
          <p className="o-mono">Explore more</p>
          <div className="flex flex-wrap gap-3">
            {project.link && (
              <Magnetic as="a" href={project.link} target="_blank" rel="noopener noreferrer" cursor="open" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream o-mono">
                Live Project <ArrowUpRight className="w-3.5 h-3.5" />
              </Magnetic>
            )}
            <Magnetic as="a" href="https://github.com/Narayaaana11" target="_blank" rel="noopener noreferrer" cursor="open" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line text-ink o-mono">
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </Magnetic>
            <Magnetic onClick={() => navigate('/', { state: { scrollTo: 'work' } })} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line text-ink o-mono">
              All Projects
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
