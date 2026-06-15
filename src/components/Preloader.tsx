import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePrefersReducedMotion } from '../lib/utils';

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Loading screen — name reveals line by line with a mono claim,
 * then the panel lifts away. Runs once per browser session.
 */
export const Preloader: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('intro-played') === '1' || reduced) {
      setSkip(true);
      return;
    }
    sessionStorage.setItem('intro-played', '1');
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = '';
    }, 2200);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, [reduced]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-between px-5 md:px-10 py-10 md:py-14 bg-base"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          <div className="flex justify-between o-mono">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              Portfolio — 2026
            </motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Bhubaneswar, IN
            </motion.span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="font-display text-giant text-cream">
              <span className="reveal-line">
                <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
                  Arin
                </motion.span>
              </span>
              <span className="reveal-line">
                <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}>
                  Pattnaik
                </motion.span>
              </span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 o-mono text-cream">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              I turn raw data<br />into decisions
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }} className="md:text-right">
              from the query<br />to the interface
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
