import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePrefersReducedMotion } from '../lib/utils';

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Split loading screen — waits for a set time, then prompts user to scroll.
 * On scroll, splits the text precisely in half, top half sliding up, bottom half sliding down.
 */
export const Preloader: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<'loading' | 'ready' | 'split' | 'done'>('loading');
  const [skip, setSkip] = useState(false);

  // Boot sequence
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // If they prefer reduced motion, skip entirely
    if (reduced) {
      setSkip(true);
      return;
    }
    
    // Lock scrolling while the preloader is up
    document.body.style.overflow = 'hidden';
    
    // Wait for initial animation (loading period) before allowing scroll
    const t = setTimeout(() => {
      setPhase('ready');
    }, 2500);
    
    return () => clearTimeout(t);
  }, [reduced]);

  // Handle the scroll trigger to break the screen open
  const handleScroll = useCallback((e?: Event) => {
    // Only split if we are in the 'ready' phase
    if (phase === 'ready') {
      setPhase('split');
      sessionStorage.setItem('intro-played', '1');
      
      // Allow scrolling underneath immediately as it starts opening
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 400);
      
      // Unmount the preloader components completely after animation finishes
      setTimeout(() => {
        setPhase('done');
      }, 1500);
    }
  }, [phase]);

  // Attach event listeners when ready
  useEffect(() => {
    if (phase === 'ready') {
      window.addEventListener('wheel', handleScroll, { passive: true });
      window.addEventListener('touchmove', handleScroll, { passive: true });
      window.addEventListener('keydown', handleScroll, { passive: true }); // Catch arrow keys / spacebar
      
      return () => {
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchmove', handleScroll);
        window.removeEventListener('keydown', handleScroll);
      };
    }
  }, [phase, handleScroll]);

  // If already skipped or finished, render nothing
  if (skip || phase === 'done') return null;

  // The central content that gets physically duplicated into the top and bottom halves.
  // Using absolute positioning ensures both halves align perfectly over each other.
  const contentElement = (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-5 pointer-events-none">
      <h1 className="font-display text-mega text-cream text-center leading-[0.85] tracking-tight mt-10">
        <motion.span 
          className="block" 
          initial={{ opacity: 0, y: 80 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        >
          Narayana
        </motion.span>
        <motion.span 
          className="block" 
          initial={{ opacity: 0, y: 80 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
        >
          Thota
        </motion.span>
      </h1>
      
      <motion.p 
        className="o-mono text-cream/70 mt-10 text-center uppercase tracking-widest text-sm md:text-base max-w-lg"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1, delay: 1.2 }}
      >
        ( Full Stack Developer and AI Enthusiast )
      </motion.p>
      
      {/* Scroll indicator - fades in only when ready, fades out when split */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 o-mono text-cream/50 text-xs md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'ready' ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="animate-bounce text-base">↓</span>
        <span className="tracking-widest">SCROLL TO ENTER</span>
      </motion.div>
    </div>
  );

  return (
    <AnimatePresence>
      {/* TOP HALF */}
      <motion.div 
        key="top-half"
        className="fixed inset-0 z-[10000] bg-base origin-top"
        style={{ clipPath: 'inset(0 0 50% 0)' }}
        animate={{ y: phase === 'split' ? '-100vh' : '0vh' }}
        transition={{ duration: 1.5, ease: [0.83, 0, 0.17, 1] }}
      >
        {contentElement}
      </motion.div>
      
      {/* BOTTOM HALF */}
      <motion.div 
        key="bottom-half"
        className="fixed inset-0 z-[10000] bg-base origin-bottom"
        style={{ clipPath: 'inset(50% 0 0 0)' }}
        animate={{ y: phase === 'split' ? '100vh' : '0vh' }}
        transition={{ duration: 1.5, ease: [0.83, 0, 0.17, 1] }}
      >
        {contentElement}
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
