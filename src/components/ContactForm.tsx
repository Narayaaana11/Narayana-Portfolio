import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, AlertCircle, Loader } from 'lucide-react';
import { EASE } from './ui';
import { cn } from '../lib/utils';

/* ── types ─────────────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

/* ── Formspree endpoint ─────────────────────────────────────── */
// 1. Go to https://formspree.io and create a free form.
// 2. Replace YOUR_FORM_ID below with your actual form ID (e.g. "xpwzgrjk").
const FORMSPREE_ID = 'YOUR_FORM_ID';

const PROJECT_TYPES = [
  'Web Application',
  'E-Commerce Store',
  'ERP / Business Tool',
  'Landing Page',
  'API / Backend',
  'Other',
];

const BUDGET_RANGES = [
  'Under ₹15,000',
  '₹15,000 – ₹30,000',
  '₹30,000 – ₹75,000',
  '₹75,000+',
  'Let\'s discuss',
];

/* ── Component ──────────────────────────────────────────────── */
export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', projectType: '', budget: '', message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const valid = form.name.trim().length > 1
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    && form.message.trim().split(/\s+/).length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: `[Portfolio] ${form.projectType || 'Inquiry'} from ${form.name}`,
          projectType: form.projectType,
          budget: form.budget,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', projectType: '', budget: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputCls = 'w-full bg-transparent border border-line px-4 py-3 text-sm text-body placeholder:text-muted focus:outline-none focus:border-line-strong transition-colors';
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  return (
    <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* left — pitch */}
      <div className="lg:col-span-5">
        <p className="o-mono text-muted mb-4">How it works</p>
        <ol className="space-y-6">
          {[
            { n: '01', title: 'Fill the form', body: 'Tell me about your project — what you need, your timeline, and rough budget.' },
            { n: '02', title: 'I reply in 24h', body: "I'll review your brief and reply with initial thoughts and next steps." },
            { n: '03', title: 'Discovery call', body: "We meet (Google Meet / phone) to align on scope, deliverables, and timeline." },
            { n: '04', title: 'Build & deliver', body: "I design, build, and deploy your product — with regular updates throughout." },
          ].map((step) => (
            <li key={step.n} className="flex gap-5">
              <span className="o-mono text-muted text-[10px] pt-1 shrink-0 w-6">{step.n}</span>
              <div>
                <p className="text-cream text-sm font-medium mb-1">{step.title}</p>
                <p className="text-body text-sm leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* right — form */}
      <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.name}
            onChange={set('name')}
            placeholder="Your name *"
            required
            className={inputCls}
          />
          <input
            value={form.email}
            onChange={set('email')}
            placeholder="Email address *"
            type="email"
            required
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <select value={form.projectType} onChange={set('projectType')} className={selectCls}>
              <option value="">Project type</option>
              {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted text-xs">▾</span>
          </div>
          <div className="relative">
            <select value={form.budget} onChange={set('budget')} className={selectCls}>
              <option value="">Budget range</option>
              {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted text-xs">▾</span>
          </div>
        </div>
        <textarea
          value={form.message}
          onChange={set('message')}
          placeholder="Tell me about your project — what problem are you solving? *"
          rows={5}
          required
          className={`${inputCls} resize-none`}
        />

        <AnimatePresence>
          {status === 'error' && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              Something went wrong. Please email me directly at narayananaiduthota@gmail.com
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={!valid || status === 'sending' || status === 'success'}
          data-cursor="hover"
          className={cn(
            'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all self-start',
            valid && status === 'idle' ? 'bg-cream text-ink hover:opacity-90' :
              status === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                'border border-line text-muted cursor-not-allowed'
          )}
        >
          {status === 'sending' && <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block" />}
          {status === 'success' && <Check className="w-4 h-4" />}
          {status === 'idle' && <ArrowUpRight className="w-4 h-4" />}
          {status === 'idle' ? 'Send enquiry' : status === 'sending' ? 'Sending…' : 'Message sent!'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
