import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'motion/react';

export interface SplitTextAnimationProps {
  opacity?: number;
  y?: number | string;
  x?: number | string;
  scale?: number;
  rotate?: number;
}

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // base delay in seconds
  stagger?: number; // delay between each letter in seconds
  duration?: number;
  animationFrom?: SplitTextAnimationProps;
  animationTo?: SplitTextAnimationProps;
  ease?: any;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
}

/**
 * SplitText component (React Bits)
 * Splits text into animated characters with smooth stagger and spring physics
 */
export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  duration = 0.6,
  animationFrom = { opacity: 0, y: 40, x: 0, scale: 1, rotate: 0 },
  animationTo = { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 },
  ease = [0.22, 1, 0.36, 1], // easeOutQuint
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'left',
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin as any });

  const words = text.split(' ');
  let letterCount = 0;

  const letterVariants: Variants = {
    hidden: {
      opacity: animationFrom.opacity ?? 0,
      y: animationFrom.y ?? 40,
      x: animationFrom.x ?? 0,
      scale: animationFrom.scale ?? 1,
      rotate: animationFrom.rotate ?? 0,
    },
    visible: (customIndex: number) => ({
      opacity: animationTo.opacity ?? 1,
      y: animationTo.y ?? 0,
      x: animationTo.x ?? 0,
      scale: animationTo.scale ?? 1,
      rotate: animationTo.rotate ?? 0,
      transition: {
        duration,
        ease: ease as any,
        delay: delay + customIndex * stagger,
      },
    }),
  };

  return (
    <p
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      style={{ textAlign, wordWrap: 'break-word' }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, wordIndex) => {
          const letters = Array.from(word);
          return (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {letters.map((char, charIndex) => {
                const currentIndex = letterCount++;
                return (
                  <motion.span
                    key={charIndex}
                    custom={currentIndex}
                    variants={letterVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    onAnimationComplete={
                      currentIndex === text.replace(/\s+/g, '').length - 1
                        ? onLetterAnimationComplete
                        : undefined
                    }
                    className="inline-block will-change-transform"
                  >
                    {char}
                  </motion.span>
                );
              })}
              {wordIndex < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          );
        })}
      </span>
    </p>
  );
};

export default SplitText;
