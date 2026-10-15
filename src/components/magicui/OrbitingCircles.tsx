import React from 'react';
import { cn } from '../../lib/utils';

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

export const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}) => {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-line stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      <div
        style={
          {
            '--duration': `${duration}s`,
            '--radius': `${radius}px`,
            '--delay': `-${delay}s`,
          } as React.CSSProperties
        }
        className={cn(
          'absolute flex size-full transform-gpu items-center justify-center rounded-full',
          reverse ? 'animate-orbit-reverse' : 'animate-orbit',
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default OrbitingCircles;
