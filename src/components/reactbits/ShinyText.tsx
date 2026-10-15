import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shimmerWidth?: number;
}

/**
 * ShinyText component (React Bits)
 * Renders text with a shimmering light reflection sweeping across it
 */
export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block relative overflow-hidden ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage: disabled
          ? 'none'
          : 'linear-gradient(120deg, rgba(245, 242, 235, 0.7) 0%, rgba(255, 255, 255, 1) 50%, rgba(245, 242, 235, 0.7) 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: disabled ? 'inherit' : 'transparent',
        animationDuration: animationDuration,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
