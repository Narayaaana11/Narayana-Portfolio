import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowUpRight,
  Code2,
  FolderGit2,
  Mail,
  FileText,
  Github,
  Linkedin,
  X,
  Sparkles,
} from 'lucide-react';

interface CommandItem {
  id: string;
  category: 'Projects' | 'Navigation' | 'Actions';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export const CommandMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const items: CommandItem[] = [
    // Projects
    {
      id: 'proj-vesper',
      category: 'Projects',
      title: 'VESPER — Voice AI Desktop Platform',
      subtitle: 'Electron, Whisper STT, Groq/Gemini & Local LLMs',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      action: () => {
        navigate('/projects/vesper');
        onClose();
      },
      keywords: ['ai', 'voice', 'desktop', 'electron', 'whisper'],
    },
    {
      id: 'proj-ausvms',
      category: 'Projects',
      title: 'AUSVMS — Visitor Management Portal',
      subtitle: 'React, Node.js, Express, MongoDB, Socket.io, Redis',
      icon: <Code2 className="w-4 h-4 text-cream" />,
      action: () => {
        navigate('/projects/ausvms');
        onClose();
      },
      keywords: ['visitor', 'portal', 'socket', 'redis', 'auth'],
    },
    {
      id: 'proj-matrix',
      category: 'Projects',
      title: 'MATRIX LMS — AI-Powered Library System',
      subtitle: 'Automated Cataloging, RFID Simulation & Analytics',
      icon: <FolderGit2 className="w-4 h-4 text-cream" />,
      action: () => {
        navigate('/projects/matrix-lms');
        onClose();
      },
      keywords: ['library', 'lms', 'rfid', 'system'],
    },
    {
      id: 'proj-guard',
      category: 'Projects',
      title: 'Guard Hub — Security Roster Management',
      subtitle: 'React & Express REST APIs for Campus Security',
      icon: <Code2 className="w-4 h-4 text-cream" />,
      action: () => {
        navigate('/projects/guard-hub');
        onClose();
      },
      keywords: ['security', 'roster', 'attendance'],
    },
    {
      id: 'proj-ziege',
      category: 'Projects',
      title: 'Ziege — Generative AI E-Commerce',
      subtitle: 'Tailwind, React & Modern Storefront',
      icon: <Sparkles className="w-4 h-4 text-amber-300" />,
      action: () => {
        navigate('/projects/ziege');
        onClose();
      },
      keywords: ['ecommerce', 'shop', 'store'],
    },
    {
      id: 'proj-aqua',
      category: 'Projects',
      title: 'Aqua Feed ERP — Custom Enterprise ERP',
      subtitle: 'Supply Chain, Invoicing & Inventory Engine',
      icon: <FolderGit2 className="w-4 h-4 text-cream" />,
      action: () => {
        navigate('/projects/aqua-feed-erp');
        onClose();
      },
      keywords: ['erp', 'inventory', 'enterprise'],
    },

    // Navigation
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'Go to About & Biography',
      subtitle: 'Full Stack & AI Engineer Background',
      icon: <Search className="w-4 h-4 text-muted" />,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      keywords: ['about', 'bio', 'story', 'experience'],
    },
    {
      id: 'nav-work',
      category: 'Navigation',
      title: 'Go to Selected Work',
      subtitle: 'Production Applications & Systems',
      icon: <Search className="w-4 h-4 text-muted" />,
      action: () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      keywords: ['work', 'portfolio', 'projects'],
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Go to Skills & Architecture',
      subtitle: 'Languages, Frameworks, AI & DevOps',
      icon: <Search className="w-4 h-4 text-muted" />,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      keywords: ['skills', 'stack', 'technologies', 'tools'],
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Go to Experience & Education',
      subtitle: 'Technical Hub Internship, MCA Aditya University',
      icon: <Search className="w-4 h-4 text-muted" />,
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      keywords: ['education', 'degree', 'internship', 'background'],
    },
    {
      id: 'nav-guestbook',
      category: 'Navigation',
      title: 'Go to Guestbook',
      subtitle: 'Sign the wall or view visitor messages',
      icon: <Search className="w-4 h-4 text-muted" />,
      action: () => {
        document.getElementById('guestbook')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      keywords: ['guestbook', 'notes', 'sign'],
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Go to Contact & Enquiry',
      subtitle: 'Direct email or project inquiry form',
      icon: <Search className="w-4 h-4 text-muted" />,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      keywords: ['contact', 'email', 'hire', 'message'],
    },

    // Actions
    {
      id: 'act-resume',
      category: 'Actions',
      title: 'Download / View Resume',
      subtitle: 'Narayana Thota (PDF)',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => {
        window.open('/Narayana Thota.pdf', '_blank');
        onClose();
      },
      keywords: ['resume', 'cv', 'pdf', 'download'],
    },
    {
      id: 'act-copy-email',
      category: 'Actions',
      title: 'Copy Email Address',
      subtitle: 'narayananaiduthota@gmail.com',
      icon: <Mail className="w-4 h-4 text-cream" />,
      action: () => {
        navigator.clipboard.writeText('narayananaiduthota@gmail.com');
        alert('Email copied to clipboard!');
        onClose();
      },
      keywords: ['email', 'copy', 'mail'],
    },
    {
      id: 'act-github',
      category: 'Actions',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/Narayaaana11',
      icon: <Github className="w-4 h-4 text-cream" />,
      action: () => {
        window.open('https://github.com/Narayaaana11', '_blank');
        onClose();
      },
      keywords: ['github', 'code', 'git', 'open source'],
    },
    {
      id: 'act-linkedin',
      category: 'Actions',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/narayaaana',
      icon: <Linkedin className="w-4 h-4 text-cream" />,
      action: () => {
        window.open('https://www.linkedin.com/in/narayaaana/', '_blank');
        onClose();
      },
      keywords: ['linkedin', 'social', 'network'],
    },
  ];

  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(filteredItems.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(filteredItems.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center pt-20 md:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#090704]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl glass-panel rounded-2xl shadow-2xl border border-line-strong overflow-hidden flex flex-col z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-line">
              <Search className="w-5 h-5 text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search projects (e.g. vesper, resume, skills)..."
                className="w-full bg-transparent text-cream placeholder:text-muted text-sm outline-none font-mono"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-muted hover:text-cream hover:bg-cream/10 transition-colors"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-muted font-mono text-xs">
                  No matching results for "{query}"
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const active = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                          active
                            ? 'bg-cream text-ink font-medium shadow-md'
                            : 'text-cream hover:bg-cream/5'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={active ? 'text-ink' : 'text-cream'}>
                            {item.icon}
                          </span>
                          <div className="truncate">
                            <p className="text-xs md:text-sm font-medium truncate">{item.title}</p>
                            {item.subtitle && (
                              <p
                                className={`text-[10px] md:text-xs truncate ${
                                  active ? 'text-ink/75' : 'text-muted'
                                }`}
                              >
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="flex items-center gap-1.5 shrink-0 ml-3">
                          <span
                            className={`o-mono text-[9px] px-2 py-0.5 rounded border ${
                              active
                                ? 'border-ink/20 text-ink/70'
                                : 'border-line text-muted'
                            }`}
                          >
                            {item.category}
                          </span>
                          <ArrowUpRight
                            className={`w-3.5 h-3.5 ${
                              active ? 'text-ink' : 'text-muted'
                            }`}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-line text-[10px] font-mono text-muted bg-base/50">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-cream/50">⌘K / Ctrl+K</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;
