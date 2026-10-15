import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, Volume2 } from 'lucide-react';

interface VoiceVisualizerProps {
  className?: string;
  barCount?: number;
  interactive?: boolean;
}

/**
 * VoiceVisualizer component
 * Ambient animated waveform inspired by Vesper push-to-talk voice HUD
 */
export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  className = '',
  barCount = 24,
  interactive = true,
}) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [heights, setHeights] = useState<number[]>(() =>
    Array.from({ length: barCount }, () => Math.random() * 40 + 10)
  );

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: barCount }, (_, i) => {
          // Bell curve shaping towards the center
          const centerDist = Math.abs(i - barCount / 2) / (barCount / 2);
          const weight = Math.max(0.2, 1 - centerDist * 0.7);
          return (Math.random() * 60 + 10) * weight;
        })
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isActive, barCount]);

  return (
    <div
      onClick={interactive ? () => setIsActive(!isActive) : undefined}
      className={`relative inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-line bg-[#100c07]/80 backdrop-blur-md cursor-pointer select-none transition-all duration-300 hover:border-cream/40 ${className}`}
      title={interactive ? (isActive ? 'Click to pause waveform' : 'Click to animate waveform') : undefined}
    >
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cream/10 text-cream">
        {isActive ? <Mic className="w-3.5 h-3.5 text-cream animate-pulse" /> : <Volume2 className="w-3.5 h-3.5 text-muted" />}
      </div>

      <div className="flex items-center gap-[3px] h-8 px-1">
        {heights.map((h, i) => (
          <motion.span
            key={i}
            animate={{ height: isActive ? `${h}%` : '15%' }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className={`w-[2px] rounded-full transition-colors ${
              isActive
                ? i % 4 === 0
                  ? 'bg-cream'
                  : 'bg-cream/60'
                : 'bg-muted/40'
            }`}
            style={{ minHeight: '3px' }}
          />
        ))}
      </div>

      <span className="font-mono text-[10px] tracking-widest uppercase text-cream/70 hidden sm:inline">
        {isActive ? 'VESPER HUD ACTIVE' : 'STANDBY'}
      </span>
    </div>
  );
};

export default VoiceVisualizer;
