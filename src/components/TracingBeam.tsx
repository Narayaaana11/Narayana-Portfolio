import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from 'motion/react';
import { cn } from '../lib/utils';

export interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TracingBeam component (Aceternity UI)
 * Dynamic glowing beam that traces down the timeline or content stream as you scroll
 */
export const TracingBeam: React.FC<TracingBeamProps> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.95], [50, Math.max(svgHeight, 50)]),
    {
      stiffness: 500,
      damping: 90,
    }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, Math.max(svgHeight - 80, 50)]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <motion.div
      ref={ref}
      className={cn('relative w-full max-w-7xl mx-auto h-full', className)}
    >
      <div className="absolute -left-4 md:-left-8 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? 'none'
                : 'rgba(245, 242, 235, 0.3) 0px 3px 12px',
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-line flex items-center justify-center bg-base"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? 'var(--cream)' : 'var(--emerald-500, #34d399)',
              borderColor: 'var(--cream)',
            }}
            className="h-2 w-2 rounded-full border border-cream/50 bg-cream"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.9} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="var(--line)"
            strokeOpacity="0.4"
            transition={{
              duration: 10,
            }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.9} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2.5"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="var(--cream)" stopOpacity="0" />
              <stop stopColor="var(--cream)" />
              <stop offset="0.325" stopColor="#34d399" />
              <stop offset="1" stopColor="#10b981" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default TracingBeam;
