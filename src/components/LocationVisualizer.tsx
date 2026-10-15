import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Radio, Compass } from 'lucide-react';

export const LocationVisualizer: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`glass-panel rounded-2xl p-5 border border-line flex flex-col justify-between relative overflow-hidden ${className}`}
    >
      {/* Background Radar Grid */}
      <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full border border-cream/10 pointer-events-none flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border border-cream/10 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-emerald-500/20" />
        </div>
        {/* Sweeping Radar Scanner Line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_310deg,rgba(52,211,153,0.18)_360deg)]"
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 o-mono text-[9px] text-emerald-400 border border-emerald-400/30 rounded px-2 py-0.5 bg-emerald-500/5">
            <Radio className="w-3 h-3 animate-pulse" /> Active Base
          </span>
          <span className="o-mono text-muted text-[9px]">Asia/Kolkata</span>
        </div>

        <div className="space-y-2 mt-2">
          <div className="flex items-center justify-between border-b border-line/60 pb-1.5">
            <span className="text-xs text-cream font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Hyderabad
            </span>
            <span className="o-mono text-[9px] text-muted">17.3850° N, 78.4867° E</span>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="text-xs text-cream font-medium flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cream/70 shrink-0" /> Bhimavaram
            </span>
            <span className="o-mono text-[9px] text-muted">16.5449° N, 81.5212° E</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[9px] o-mono text-muted relative z-10">
        <span>Timezone: UTC+05:30</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" /> Remote Ready
        </span>
      </div>
    </div>
  );
};

export default LocationVisualizer;
