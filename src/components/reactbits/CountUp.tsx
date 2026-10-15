import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

export interface CountUpProps {
  to: number;
  from?: number;
  duration?: number; // duration in seconds
  delay?: number; // delay in seconds
  className?: string;
  separator?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  threshold?: number;
  onEnd?: () => void;
}

/**
 * CountUp component (React Bits)
 * Smoothly animates numbers counting up when scrolled into view
 */
export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  className = '',
  separator = '',
  decimals = 0,
  prefix = '',
  suffix = '',
  threshold = 0.2,
  onEnd,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

        // easeOutExpo function for modern snappy feel
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = from + (to - from) * ease;

        setValue(currentVal);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setValue(to);
          onEnd?.();
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, from, to, duration, delay, onEnd]);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    if (!separator) return fixed;
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatNumber(value)}
      {suffix}
    </span>
  );
};

export default CountUp;
