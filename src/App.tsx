import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'motion/react';
import Lenis from 'lenis';
import { ArrowUpRight, ArrowUp, Apple, Carrot, Leaf, Coffee, Cherry, Pizza, Croissant, Milk, Soup, Shirt, Recycle, Globe, Tag, Briefcase, LineChart, Users, BarChart, TrendingUp, ShoppingCart, CreditCard, Package, Wallet, Shield, UserX, Brain, Target, Code, Database, PieChart, Sparkles, Moon, Sun } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Error Boundary ---
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare state: ErrorBoundaryState;
  declare props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Application error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-[#f8f9fa] dark:bg-[#050505] min-h-screen text-black dark:text-white flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-gray-600 mb-8">Something went wrong. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- Staggered Text Entry ---
const StaggeredText = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {}
      }}
      className={cn("flex flex-wrap", className)}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em] mb-[0.1em]">
          <motion.span
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

// --- Scroll-Linked Opacity Wrapper ---
const FocusSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.3, 1, 1, 1, 0.3]
  );

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// --- Spotlight Card ---
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => { setOpacity(1); };
  const handleMouseLeave = () => { setOpacity(0); };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden rounded-[24px] bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 md:backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.02)] transition-colors duration-500", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-50 pointer-events-none transition-colors duration-500" />
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,.04), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

// --- Scroll Progress Bar ---
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-black dark:bg-white origin-left z-[100] transition-colors duration-500"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// --- Back to Top Button ---
const BackToTop = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setVisible(latest > 0.15);
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Dark Mode Toggle ---
const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage, default to light if not found
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-6 md:top-8 left-6 md:left-8 z-50 w-14 h-8 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/10 flex items-center p-1 cursor-pointer transition-colors duration-500"
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-white dark:bg-black border border-black/5 dark:border-white/10 flex items-center justify-center text-black dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-3.5 h-3.5" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

// --- Sections ---

const Background = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.div
      style={{ scale: isMobile ? 1 : scale }}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none origin-center bg-[#fdfdfd] dark:bg-[#050505] transition-colors duration-500"
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-black/5 md:blur-[120px] max-md:hidden" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-black/5 md:blur-[120px] max-md:hidden" />
      </div>
      <div className="absolute inset-0 md:backdrop-blur-[50px] bg-white/60 dark:bg-black/60 border border-black/5 dark:border-white/5 transition-colors duration-500" />
    </motion.div>
  );
};

const TopLinks = () => (
  <div className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 md:gap-8 px-5 md:px-8 py-3 md:py-4 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 text-[10px] md:text-xs font-mono tracking-widest uppercase text-gray-700 dark:text-gray-300 transition-colors duration-500">
    <a href="https://github.com/ArinPattnaik" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors duration-500">GitHub</a>
    <a href="https://www.linkedin.com/in/arinpattnaik" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors duration-500">LinkedIn</a>
    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors duration-500">Resume</a>
  </div>
);

const RightNav = () => (
  <nav className="hidden md:flex fixed right-0 top-0 h-full w-24 z-50 flex-col justify-center items-center group">
    <div className="absolute inset-0 bg-black/0 dark:bg-white/0 group-hover:bg-black/[0.02] dark:group-hover:bg-white/[0.02] backdrop-blur-none group-hover:backdrop-blur-xl transition-all duration-500 border-l border-transparent group-hover:border-black/10 dark:group-hover:border-white/10" />
    <div className="relative flex flex-col gap-12 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
      {['About', 'Expertise', 'Projects', 'Insights'].map((item) => (
        <a 
          key={item} 
          href={`#${item.toLowerCase()}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xs font-mono tracking-widest uppercase hover:text-black dark:hover:text-white text-gray-500 dark:text-gray-400 transition-colors duration-500"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {item}
        </a>
      ))}
    </div>
  </nav>
);

const Hero = () => {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const subtitles = ["DATA ANALYST", "INSIGHT ARCHITECT", "DESIGNER"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center px-4 relative z-10">
      <div className="w-full flex flex-col items-center">
        <StaggeredText 
          text="ARIN PATTNAIK" 
          className="text-[12vw] font-black uppercase tracking-tighter leading-none text-center w-full justify-center"
        />
        <div className="h-8 mt-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={subtitleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-500 dark:text-gray-400 font-mono text-sm md:text-base tracking-widest uppercase transition-colors duration-500"
            >
              {subtitles[subtitleIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const text = "I don't just analyze data — I build products around it. From AI-powered platforms that expose hidden truths in food labels to ML systems that predict customer behavior before it happens.";
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"]
  });

  const words = text.split(" ");

  const highlights = [
    { label: "What I Do", text: "Full-stack data products — from the SQL query to the React frontend. I own the entire pipeline." },
    { label: "How I Think", text: "Every dataset tells a story. I find the narrative, then build the tool that makes it impossible to ignore." },
    { label: "What Drives Me", text: "Making the invisible visible. Whether it's greenwashing in fashion or churn risk in SaaS — I build systems that surface what others miss." }
  ];

  return (
    <section id="about" className="w-full flex items-center justify-center px-6 md:px-24 py-16 md:py-24 relative z-10">
      <FocusSection className="w-full max-w-7xl">
        <div className="flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="flex-1 lg:flex-[3]">
              <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-6 md:mb-10">About</h2>
              <p ref={ref} className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight flex flex-wrap text-black dark:text-white transition-colors duration-500">
                {words.map((word, i) => {
                  const start = i / words.length;
                  const end = start + (1 / words.length);
                  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
                  return (
                    <motion.span key={i} style={{ opacity }} className="mr-[0.25em] mb-[0.1em]">
                      {word}
                    </motion.span>
                  );
                })}
              </p>
            </div>
            <div className="flex-1 lg:flex-[2] flex flex-col gap-6 pt-2 lg:pt-16">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2"
                >
                  <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">{item.label}</span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-500">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tool belt marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="overflow-hidden py-5 border-t border-b border-black/10 dark:border-white/10 transition-colors duration-500"
          >
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {["Python", "React", "TypeScript", "SQL", "Streamlit", "PowerBI", "Tailwind CSS", "Next.js", "scikit-learn", "XGBoost", "SHAP", "Framer Motion", "NLP", "Pandas", "NumPy", "Git", "Python", "React", "TypeScript", "SQL", "Streamlit", "PowerBI", "Tailwind CSS", "Next.js", "scikit-learn", "XGBoost", "SHAP", "Framer Motion", "NLP", "Pandas", "NumPy", "Git"].map((tool, i) => (
                <span key={i} className="text-sm font-mono text-gray-400 dark:text-gray-500 tracking-widest uppercase flex-shrink-0 transition-colors duration-500">{tool}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </FocusSection>
    </section>
  );
};

const Expertise = () => {
  const [activeTab, setActiveTab] = useState(0);

  const domains = [
    {
      title: "DATA SCIENCE & ML",
      shortTitle: "ML",
      icon: Brain,
      color: "#e11d48",
      description: "Building predictive systems that explain themselves. From churn prediction with SHAP explainability to classification pipelines that quantify revenue impact.",
      skills: [
        { name: "Predictive Modeling", level: 92 },
        { name: "scikit-learn / XGBoost", level: 88 },
        { name: "SHAP & Explainable AI", level: 85 },
        { name: "Feature Engineering", level: 90 },
      ],
      tools: ["Python", "scikit-learn", "XGBoost", "SHAP", "Pandas", "NumPy"]
    },
    {
      title: "DATA VISUALIZATION",
      shortTitle: "VISUAL",
      icon: PieChart,
      color: "#0ea5e9",
      description: "Turning complex datasets into stories anyone can understand. Interactive dashboards, statistical plots, and executive-ready reports that drive decisions.",
      skills: [
        { name: "Streamlit Dashboards", level: 95 },
        { name: "PowerBI", level: 82 },
        { name: "Statistical Plotting", level: 88 },
        { name: "Real-time Analytics", level: 85 },
      ],
      tools: ["Streamlit", "PowerBI", "Matplotlib", "Plotly", "Seaborn"]
    },
    {
      title: "FULL-STACK DEV",
      shortTitle: "DEV",
      icon: Code,
      color: "#f97316",
      description: "End-to-end product development from concept to deployment. React frontends, AI-powered features, and responsive interfaces that feel premium.",
      skills: [
        { name: "React / Next.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Framer Motion", level: 85 },
      ],
      tools: ["React", "Next.js", "TypeScript", "Tailwind", "Vite", "Vercel"]
    },
    {
      title: "DATA ENGINEERING",
      shortTitle: "ETL",
      icon: Database,
      color: "#10b981",
      description: "Designing the plumbing that makes everything else possible. ETL pipelines processing 50GB+ daily, SQL architecture, and automation that saves hours every week.",
      skills: [
        { name: "SQL & Query Optimization", level: 90 },
        { name: "ETL Pipeline Design", level: 88 },
        { name: "Python Automation", level: 92 },
        { name: "Database Architecture", level: 85 },
      ],
      tools: ["PostgreSQL", "Python", "SQL Server", "Pandas", "Airflow"]
    },
    {
      title: "NLP & AI",
      shortTitle: "NLP",
      icon: Sparkles,
      color: "#a78bfa",
      description: "Harnessing language models to extract meaning at scale. From greenwashing detection to food label analysis — AI that makes the invisible visible.",
      skills: [
        { name: "Text Classification", level: 86 },
        { name: "Sentiment Analysis", level: 84 },
        { name: "LLM Integration", level: 82 },
        { name: "NLP Pipelines", level: 85 },
      ],
      tools: ["spaCy", "Hugging Face", "OpenAI API", "NLTK", "Gemini"]
    }
  ];

  const active = domains[activeTab];
  const ActiveIcon = active.icon;

  return (
    <section id="expertise" className="w-full flex flex-col justify-center px-6 md:px-24 py-16 md:py-24 relative z-10">
      <FocusSection>
        <h2 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-10 md:mb-16">Expertise</h2>
        
        {/* Tab navigation */}
        <div className="flex gap-2 md:gap-3 mb-8 md:mb-12 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap scrollbar-hide">
          {domains.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-500 cursor-pointer border whitespace-nowrap flex-shrink-0",
                  activeTab === i
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "bg-transparent text-gray-500 dark:text-gray-400 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{domain.title}</span>
                <span className="sm:hidden">{domain.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left: Description */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${active.color}15`, border: `1px solid ${active.color}30` }}
                  >
                    <ActiveIcon className="w-6 h-6" style={{ color: active.color }} />
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">{active.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed transition-colors duration-500">{active.description}</p>
                
                {/* Tools */}
                <div>
                  <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-3">Tools & Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {active.tools.map((tool, i) => (
                      <motion.span
                        key={tool}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="px-3 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-xs font-mono text-gray-600 dark:text-gray-300 tracking-wide transition-colors duration-500"
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Skill bars */}
              <div className="flex flex-col gap-5">
                {active.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-black dark:text-white transition-colors duration-500">{skill.name}</span>
                      <span className="text-xs font-mono text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden transition-colors duration-500">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: active.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </FocusSection>
    </section>
  );
};

const projectConfig: Record<string, any> = {
  pureplate: {
    rawColor: "#f97316",
    rawColorClass: "text-[#f97316]",
    color: "text-[#f97316]",
    hoverText: "md:hover:text-[#f97316] max-md:text-[#ea580c]",
    bgIdle: "bg-[#f97316]/20",
    bgActive: "bg-[#f97316]/40",
    borderColor: "border-[#f97316]/50",
    typeColor: "text-[#ea580c]/80",
    arrowMobile: "max-md:text-[#ea580c]",
    icons: [Apple, Carrot, Leaf, Cherry, Pizza, Croissant, Coffee, Milk, Soup]
  },
  vera: {
    rawColor: "#10b981",
    rawColorClass: "text-[#10b981]",
    color: "text-[#10b981]",
    hoverText: "md:hover:text-[#10b981] max-md:text-[#059669]",
    bgIdle: "bg-[#10b981]/20",
    bgActive: "bg-[#10b981]/40",
    borderColor: "border-[#10b981]/50",
    typeColor: "text-[#059669]/80",
    arrowMobile: "max-md:text-[#059669]",
    icons: [Leaf, Shirt, Recycle, Globe, Tag]
  },
  globaljob: {
    rawColor: "#0ea5e9",
    rawColorClass: "text-[#0ea5e9]",
    color: "text-[#0ea5e9]",
    hoverText: "md:hover:text-[#0ea5e9] max-md:text-[#0284c7]",
    bgIdle: "bg-[#0ea5e9]/20",
    bgActive: "bg-[#0ea5e9]/40",
    borderColor: "border-[#0ea5e9]/50",
    typeColor: "text-[#0284c7]/80",
    arrowMobile: "max-md:text-[#0284c7]",
    icons: [Briefcase, Globe, LineChart, Users, BarChart, TrendingUp]
  },
  ecom: {
    rawColor: "#a78bfa",
    rawColorClass: "text-[#a78bfa]",
    color: "text-[#a78bfa]",
    hoverText: "md:hover:text-[#a78bfa] max-md:text-[#8b5cf6]",
    bgIdle: "bg-[#a78bfa]/20",
    bgActive: "bg-[#a78bfa]/40",
    borderColor: "border-[#a78bfa]/50",
    typeColor: "text-[#8b5cf6]/80",
    arrowMobile: "max-md:text-[#8b5cf6]",
    icons: [ShoppingCart, CreditCard, Package, BarChart, TrendingUp, Wallet]
  },
  churnguard: {
    rawColor: "#e11d48",
    rawColorClass: "text-[#e11d48]",
    color: "text-[#e11d48]",
    hoverText: "md:hover:text-[#e11d48] max-md:text-[#be123c]",
    bgIdle: "bg-[#e11d48]/20",
    bgActive: "bg-[#e11d48]/40",
    borderColor: "border-[#e11d48]/50",
    typeColor: "text-[#be123c]/80",
    arrowMobile: "max-md:text-[#be123c]",
    icons: [Shield, UserX, Brain, Target, LineChart, BarChart]
  }
};

const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const config = projectConfig[project.id];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 30 : 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: isMobile ? 0 : index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative rounded-[20px] md:rounded-[28px] overflow-hidden border transition-all duration-700",
        config ? "border-black/10 dark:border-white/10 hover:border-transparent dark:hover:border-transparent" : "border-black/10 dark:border-white/10"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Color glow background — desktop only */}
      {config && !isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${config.rawColor}20 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0
          }}
        />
      )}

      {/* Subtle color accent on mobile */}
      {config && isMobile && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
          style={{ backgroundColor: config.rawColor, opacity: 0.4 }}
        />
      )}

      {/* Floating icons — desktop only */}
      {config && !isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatePresence>
            {hovered && config.icons.slice(0, 5).map((Icon: any, i: number) => {
              const left = 10 + (i * 18) % 80;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.5 }}
                  animate={{ opacity: [0, 0.2, 0], y: -120, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
                  className="absolute"
                  style={{ left: `${left}%`, bottom: '0px', color: config.rawColor }}
                >
                  <Icon size={20 + (i % 3) * 8} strokeWidth={1} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <div className="relative z-10 p-6 md:p-10 flex flex-col justify-between min-h-[260px] md:min-h-[380px]">
        {/* Top: type tag */}
        <div className="flex items-center justify-between">
          <span className={cn(
            "font-mono text-[10px] md:text-xs uppercase tracking-widest transition-colors duration-500",
            config ? config.typeColor : "text-gray-400 dark:text-gray-500"
          )}>
            {project.type}
          </span>
          {project.link && (
            <motion.div
              animate={{ rotate: hovered ? 0 : -45, scale: hovered ? 1 : 0.8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ArrowUpRight className={cn(
                "w-5 h-5 transition-colors duration-500",
                config ? (hovered ? config.rawColorClass : "text-gray-300 dark:text-gray-600") : "text-gray-300 dark:text-gray-600"
              )} />
            </motion.div>
          )}
        </div>

        {/* Bottom: name + description */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "transition-colors duration-500",
                  config
                    ? `text-black dark:text-white ${config.hoverText}`
                    : "text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
                )}
              >
                {project.name}
              </a>
            ) : (
              <span className="text-black dark:text-white transition-colors duration-500">{project.name}</span>
            )}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 transition-colors duration-500">{project.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  const projects = [
    { id: "pureplate", name: "PUREPLATE", type: "REACT / NEXT.JS / AI", link: "https://pureplate.arinpattnaik.me/", desc: "AI-powered food transparency platform that exposes hidden sugars and complex additives, turning deceptive labels into undeniable truth." },
    { id: "vera", name: "VÉRA", type: "REACT / NLP", link: "https://vera.arinpattnaik.me/", desc: "NLP-powered greenwashing scanner for fashion — paste a product link, get the True Eco-Score." },
    { id: "churnguard", name: "CHURNGUARD", type: "REACT / ML / SHAP", link: "https://churnguard.arinpattnaik.me/", desc: "ML-powered churn prediction that scores risk, explains predictions with SHAP, and generates targeted retention strategies." },
    { id: "globaljob", name: "GLOBAL JOB MARKET", type: "PYTHON / STREAMLIT", link: "https://global-job-market-intelligence-platform-arin.streamlit.app/", desc: "Data-driven analytics platform uncovering global employment trends, high-demand skills, and salary distributions." },
    { id: "ecom", name: "E-COMMERCE ANALYTICS", type: "PYTHON / STREAMLIT", link: "https://ecommerce-sales-analysis-arin.streamlit.app/", desc: "Universal analytics platform with auto-detecting schemas, interactive dashboards, and AI-powered insights." },
    { id: "etl", name: "ETL PIPELINE", type: "SQL / PYTHON", desc: "Automated data extraction and transformation pipeline handling 50GB+ daily, reducing manual reporting by 15 hours/week." }
  ];

  return (
    <section id="projects" className="w-full flex flex-col justify-center px-6 md:px-24 py-16 md:py-24 relative z-10">
      <FocusSection>
        <h2 className="text-sm font-mono text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-8 md:mb-12 transition-colors duration-500">Selected Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </FocusSection>
    </section>
  );
};

const Insights = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopX = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const x = isMobile ? "0%" : desktopX;

  const insights = [
    { text: "Arin transformed our data pipeline, reducing processing time by 40%.", author: "Tech Lead, DataCorp" },
    { text: "The visualizations provided deep insights that shifted our entire Q3 strategy.", author: "Product Manager, Insightful" },
    { text: "Exceptional predictive models. Highly recommend his analytical skills.", author: "CEO, StartupX" },
    { text: "A rare combination of design sensibility and hardcore data engineering.", author: "Director of Analytics" }
  ];

  return (
    <section id="insights" ref={targetRef} className="relative md:h-[250vh] z-10">
      <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center overflow-hidden py-16 md:py-0">
        <h2 className="text-sm font-mono text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-8 md:mb-16 px-6 md:px-24 transition-colors duration-500">Selected Insights</h2>
        <motion.div style={{ x }} className="flex flex-col md:flex-row gap-4 md:gap-8 px-6 md:px-24">
          {insights.map((t, i) => (
            <SpotlightCard key={i} className="w-full md:w-[40vw] flex-shrink-0 p-6 md:p-12 flex flex-col justify-between min-h-[180px] md:min-h-[300px]">
              <p className="text-lg md:text-3xl font-medium leading-tight text-black dark:text-white mb-8 md:mb-12 transition-colors duration-500">"{t.text}"</p>
              <p className="text-xs md:text-sm font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors duration-500">{t.author}</p>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full px-6 md:px-24 py-12 md:py-16 flex flex-col gap-12 md:gap-16 border-t border-black/10 dark:border-white/10 relative z-10 bg-[#f8f9fa] dark:bg-[#050505] md:bg-[#f8f9fa]/80 md:dark:bg-[#050505]/80 md:backdrop-blur-md transition-colors duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-mono text-gray-400 dark:text-gray-500 tracking-widest uppercase">Get in Touch</h3>
          <a href="mailto:arinpattnaikofficial@gmail.com" className="text-xl md:text-2xl font-bold tracking-tighter uppercase text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-500">
            LET'S TALK <ArrowUpRight className="inline-block w-5 h-5" />
          </a>
          <p className="font-mono text-xs text-gray-500 dark:text-gray-400 tracking-widest uppercase transition-colors duration-500">
            BHUBANESWAR, INDIA
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-mono text-gray-400 dark:text-gray-500 tracking-widest uppercase">Navigate</h3>
          <div className="flex flex-col gap-2">
            {['About', 'Expertise', 'Projects', 'Insights'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-500 font-mono tracking-wide uppercase"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-mono text-gray-400 dark:text-gray-500 tracking-widest uppercase">Connect</h3>
          <div className="flex flex-col gap-2">
            <a href="https://github.com/ArinPattnaik" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-500 font-mono tracking-wide uppercase">GitHub</a>
            <a href="https://www.linkedin.com/in/arinpattnaik" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-500 font-mono tracking-wide uppercase">LinkedIn</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-500 font-mono tracking-wide uppercase">Resume</a>
          </div>
        </div>
      </div>
      
      <div className="w-full text-center pt-8 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
        <p className="font-mono text-[10px] md:text-xs text-black dark:text-white tracking-[0.2em] uppercase transition-colors duration-500">
          "Often Imitated but never duplicated"
        </p>
      </div>
    </footer>
  );
};

function AppContent() {
  useEffect(() => {
    // Scroll to top on load and prevent browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const isMobile = window.innerWidth < 768;
    
    // Completely disable Lenis on mobile to allow native 60fps/120fps hardware-accelerated scrolling
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#050505] min-h-screen text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black overflow-hidden transition-colors duration-500">
      <ScrollProgress />
      <Background />
      <TopLinks />
      <DarkModeToggle />
      <RightNav />
      <BackToTop />
      
      <main className="w-full flex flex-col items-center">
        <Hero />
        <About />
        <Expertise />
        <Works />
        <Insights />
      </main>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
