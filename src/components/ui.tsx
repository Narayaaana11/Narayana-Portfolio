import React, { useState, useEffect, useCallback } from 'react';
import {
  motion, useScroll, useSpring, useMotionValue, useTransform,
  useMotionValueEvent, AnimatePresence,
} from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { cn, useIsDesktop, useMagnetic } from '../lib/utils';

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   Custom cursor — a cream disc that follows the pointer and
   morphs into a labelled pill over [data-cursor] targets.
   ============================================================ */
export const Cursor: React.FC = () => {
  const isDesktop = useIsDesktop();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const cy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!isDesktop) return;
    document.body.classList.add('cursor-none-fine');
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (el) {
        setActive(true);
        setLabel(el.dataset.cursor === 'hover' ? '' : el.dataset.cursor || '');
      } else {
        setActive(false);
        setLabel('');
      }
    };
    const leave = () => setHidden(true);
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      document.body.classList.remove('cursor-none-fine');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [isDesktop, x, y]);

  if (!isDesktop) return null;
  const hasLabel = active && label.length > 0;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full"
      style={{ x: cx, y: cy, translateX: '-50%', translateY: '-50%', backgroundColor: 'var(--cream)', color: 'var(--ink)' }}
      animate={{
        width: hasLabel ? 78 : active ? 46 : 12,
        height: hasLabel ? 78 : active ? 46 : 12,
        opacity: hidden ? 0 : active ? 1 : 0.9,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
    >
      <AnimatePresence>
        {hasLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="font-mono text-[9px] uppercase tracking-[0.14em] text-center leading-tight"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ============================================================ */
export const Grain: React.FC = () => <div className="grain" aria-hidden />;

/* ============================================================ */
export const ScrollProgress: React.FC<{ color?: string }> = ({ color }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[120]"
      style={{ scaleX, backgroundColor: color || 'var(--cream)' }}
    />
  );
};

/* ============================================================ */
export const BackToTop: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setVisible(v > 0.25));
  const up = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={up}
          data-cursor="top"
          className="fixed bottom-6 right-6 z-[90] w-12 h-12 rounded-full flex items-center justify-center bg-cream text-ink"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ============================================================
   Magnetic button / link
   ============================================================ */
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  cursor?: string;
  ariaLabel?: string;
}
export const Magnetic: React.FC<MagneticProps> = ({
  children, className, strength = 0.4, as = 'button', href, target, rel, onClick, style, cursor = 'hover', ariaLabel,
}) => {
  const { ref, x, y } = useMagnetic<HTMLAnchorElement & HTMLButtonElement>(strength);
  const common = { ref: ref as never, className, onClick, style, 'data-cursor': cursor, 'aria-label': ariaLabel };
  return (
    <motion.span style={{ x, y, display: 'inline-flex' }}>
      {as === 'a'
        ? <a {...common} href={href} target={target} rel={rel}>{children}</a>
        : <button {...common} type="button">{children}</button>}
    </motion.span>
  );
};

/* ============================================================
   Reveal — scroll-triggered fade/rise
   ============================================================ */
export const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number; y?: number }> = ({
  children, className, delay = 0, y = 30,
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-12% 0px' }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

/* Line-by-line masked reveal (the signature headline animation) */
export const RevealLines: React.FC<{ lines: string[]; className?: string; delay?: number; stagger?: number }> = ({
  lines, className, delay = 0, stagger = 0.09,
}) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="reveal-line">
        <motion.span
          className="block"
          initial={{ y: '108%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.05, delay: delay + i * stagger, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);

/* Word-by-word scroll-linked opacity for editorial paragraphs */
const ScrollWord: React.FC<{ word: string; progress: any; range: [number, number] }> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.32, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.26em] break-words">{word}</motion.span>;
};

export const ScrollRevealText: React.FC<{ text: string; className?: string; style?: React.CSSProperties }> = ({ text, className, style }) => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 60%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={cn('flex flex-wrap max-w-full', className)} style={{ overflowWrap: 'anywhere', ...style }}>
      {words.map((w, i) => (
        <ScrollWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
};

/* ============================================================
   Marquee
   ============================================================ */
export const Marquee: React.FC<{ items: string[]; className?: string }> = ({ items, className }) => {
  const doubled = [...items, ...items];
  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <div className="inline-flex gap-10 animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="o-mono flex items-center gap-10 flex-shrink-0" style={{ color: 'inherit' }}>
            {item}
            <span aria-hidden>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
