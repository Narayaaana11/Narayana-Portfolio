import React from 'react';
import { OrbitingCircles } from './magicui/OrbitingCircles';
import {
  Code2,
  Cpu,
  Database,
  Layers,
  Server,
  Terminal,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const TechUniverse: React.FC = () => {
  return (
    <div className="relative flex h-[380px] w-full max-w-xl mx-auto flex-col items-center justify-center overflow-hidden rounded-3xl glass-panel border border-line">
      {/* Central Core Emblem */}
      <div className="z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-cream/10 border border-line-strong flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(231,220,168,0.2)]">
          <Sparkles className="w-8 h-8 text-cream animate-pulse" />
        </div>
        <span className="font-display text-cream text-xs tracking-wider mt-3 uppercase">Tech Stack</span>
        <span className="o-mono text-[9px] text-muted">Core Ecosystem</span>
      </div>

      {/* Inner Orbit (Radius 90px) */}
      <OrbitingCircles radius={90} duration={18} delay={0}>
        <div className="w-8 h-8 rounded-full glass-panel border border-line flex items-center justify-center shadow-lg text-cream hover:scale-125 transition-transform" title="TypeScript & React">
          <Code2 className="w-4 h-4 text-emerald-400" />
        </div>
      </OrbitingCircles>
      <OrbitingCircles radius={90} duration={18} delay={9}>
        <div className="w-8 h-8 rounded-full glass-panel border border-line flex items-center justify-center shadow-lg text-cream hover:scale-125 transition-transform" title="AI & Whisper LLM">
          <Cpu className="w-4 h-4 text-cream" />
        </div>
      </OrbitingCircles>

      {/* Middle Orbit (Radius 140px, Reverse) */}
      <OrbitingCircles radius={140} duration={25} delay={0} reverse>
        <div className="w-8 h-8 rounded-full glass-panel border border-line flex items-center justify-center shadow-lg text-cream hover:scale-125 transition-transform" title="Node.js & Express">
          <Server className="w-4 h-4 text-emerald-300" />
        </div>
      </OrbitingCircles>
      <OrbitingCircles radius={140} duration={25} delay={8} reverse>
        <div className="w-8 h-8 rounded-full glass-panel border border-line flex items-center justify-center shadow-lg text-cream hover:scale-125 transition-transform" title="MongoDB & SQLite">
          <Database className="w-4 h-4 text-cream" />
        </div>
      </OrbitingCircles>
      <OrbitingCircles radius={140} duration={25} delay={16} reverse>
        <div className="w-8 h-8 rounded-full glass-panel border border-line flex items-center justify-center shadow-lg text-cream hover:scale-125 transition-transform" title="Electron.js Desktop">
          <Layers className="w-4 h-4 text-amber-300" />
        </div>
      </OrbitingCircles>

      {/* Outer Orbit (Radius 180px) */}
      <OrbitingCircles radius={180} duration={32} delay={0}>
        <div className="w-8 h-8 rounded-full glass-panel border border-line flex items-center justify-center shadow-lg text-cream hover:scale-125 transition-transform" title="Redis & Bull Queues">
          <Zap className="w-4 h-4 text-amber-400" />
        </div>
      </OrbitingCircles>
      <OrbitingCircles radius={180} duration={32} delay={11}>
        <div className="w-8 h-8 rounded-full glass-panel border border-line flex items-center justify-center shadow-lg text-cream hover:scale-125 transition-transform" title="Terminal & Native Win32">
          <Terminal className="w-4 h-4 text-emerald-400" />
        </div>
      </OrbitingCircles>
      <OrbitingCircles radius={180} duration={32} delay={22}>
        <div className="w-8 h-8 rounded-full glass-panel border border-line flex items-center justify-center shadow-lg text-cream hover:scale-125 transition-transform" title="Vitest & Postman">
          <ShieldCheck className="w-4 h-4 text-cream" />
        </div>
      </OrbitingCircles>
    </div>
  );
};

export default TechUniverse;
