import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, AlertCircle, Copy, Mail, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';
import { SpotlightCard } from './reactbits/SpotlightCard';

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
const FORMSPREE_ID = 'YOUR_FORM_ID';
const CONTACT_EMAIL = 'narayananaiduthota@gmail.com';

const PROJECT_TYPES = [
  'Web Application (Full Stack)',
  'AI / LLM Desktop Assistant',
  'ERP / Enterprise Workflow Tool',
  'Computer Vision / OCR System',
  'API & Backend Architecture',
  'Consulting & Code Review',
  'Other',
];

const BUDGET_RANGES = [
  'Under ₹25,000 / $300',
  '₹25,000 – ₹60,000 / $300 – $750',
  '₹60,000 – ₹1,50,000 / $750 – $2,000',
  '₹1,50,000+ / $2,000+',
  'Full-time / Contract Role',
  'Let\'s discuss',
];

/* ── Component ──────────────────────────────────────────────── */
export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', projectType: '', budget: '', message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const valid = form.name.trim().length > 1
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    && form.message.trim().split(/\s+/).length >= 3;

  const getMailtoUrl = () => {
    const subject = `[Project Inquiry] ${form.projectType || 'New Project'} from ${form.name}`;
    const body = `Hi Narayana,\n\nName: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.projectType || 'Not specified'}\nBudget: ${form.budget || 'Open for discussion'}\n\nProject Brief:\n${form.message}\n\n---\nSent from narayanathota.me`;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyBrief = async () => {
    try {
      const summary = `From: ${form.name} (${form.email})\nType: ${form.projectType}\nBudget: ${form.budget}\nBrief: ${form.message}`;
      await navigator.clipboard.writeText(summary);
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || status === 'sending') return;
    setStatus('sending');

    // If Formspree ID is not customized yet, trigger direct mailto dispatch seamlessly
    if (FORMSPREE_ID === 'YOUR_FORM_ID') {
      setTimeout(() => {
        window.location.href = getMailtoUrl();
        setStatus('success');
        setStatusMsg('Opening your email client with your message pre-filled. You can also copy your brief below!');
      }, 500);
      return;
    }

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
        setStatusMsg('Thank you! Your inquiry was sent successfully. Narayana will get back to you within 24 hours.');
        setForm({ name: '', email: '', projectType: '', budget: '', message: '' });
      } else {
        // Graceful fallback to email client
        window.location.href = getMailtoUrl();
        setStatus('success');
        setStatusMsg('Opening your email client to complete dispatch directly.');
      }
    } catch {
      window.location.href = getMailtoUrl();
      setStatus('success');
      setStatusMsg('Opening your email client to send directly.');
    }
  };

  const inputCls = 'w-full bg-transparent border border-line px-4 py-3 text-sm text-body placeholder:text-muted focus:outline-none focus:border-line-strong transition-colors rounded-none';
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  return (
    <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* left — pitch & quick contact */}
      <div className="lg:col-span-5">
        <p className="o-mono text-muted mb-4">How it works</p>
        <ol className="space-y-6">
          {[
            { n: '01', title: 'Submit a brief', body: 'Share what you need built, your desired timeline, and rough budget.' },
            { n: '02', title: '24-hour response', body: "I'll review your requirements and reply with architectural notes and availability." },
            { n: '03', title: 'Discovery & alignment', body: "We connect via Google Meet or phone to finalize scope, tech stack, and milestones." },
            { n: '04', title: 'Iterative build & ship', body: "I build with modern clean architecture, providing active staging demos throughout." },
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

        {/* 1-click email copy card */}
        <div className="mt-10 p-5 rounded-xl border border-line bg-[#16110a]/50">
          <p className="text-xs o-mono text-muted uppercase tracking-wider mb-2">Direct Contact</p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-cream font-mono truncate">{CONTACT_EMAIL}</span>
            <button
              onClick={handleCopyEmail}
              data-cursor="hover"
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line text-xs font-mono text-cream hover:bg-cream hover:text-ink transition-colors shrink-0"
              aria-label="Copy email address"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* right — form wrapped in spotlight card */}
      <SpotlightCard className="lg:col-span-7 p-6 md:p-8 glass-panel glass-panel-hover rounded-2xl shadow-2xl" spotlightColor="rgba(231, 220, 168, 0.16)">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{statusMsg || 'Inquiry prepared!'}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  <a
                    href={getMailtoUrl()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cream text-ink text-xs font-mono font-medium"
                  >
                    <Mail className="w-3.5 h-3.5" /> Re-open Email Client <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-emerald-400/40 text-emerald-300 text-xs font-mono hover:bg-emerald-400/20"
                  >
                    <Copy className="w-3.5 h-3.5" /> {copiedBrief ? 'Copied Brief!' : 'Copy Brief'}
                  </button>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-amber-300 text-sm p-3 rounded border border-amber-400/30 bg-amber-400/10"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Could not reach form server. Click below to open in your email app.</span>
                <a href={getMailtoUrl()} className="underline ml-auto font-mono text-xs">Open Mail</a>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between gap-4 mt-2">
            <button
              type="submit"
              disabled={!valid || status === 'sending'}
              data-cursor="hover"
              className={cn(
                'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all self-start shadow-lg',
                valid && status !== 'sending'
                  ? 'bg-cream text-ink hover:opacity-90 hover:shadow-[0_0_25px_rgba(231,220,168,0.4)]'
                  : 'border border-line text-muted cursor-not-allowed'
              )}
            >
              {status === 'sending' && (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block"
                />
              )}
              {status !== 'sending' && <ArrowUpRight className="w-4 h-4" />}
              {status === 'sending' ? 'Preparing…' : status === 'success' ? 'Send Another' : 'Send Enquiry'}
            </button>

            <span className="o-mono text-muted text-xs hidden sm:inline">
              Or email directly: <a href={`mailto:${CONTACT_EMAIL}`} className="text-cream underline">{CONTACT_EMAIL}</a>
            </span>
          </div>
        </form>
      </SpotlightCard>
    </div>
  );
};

export default ContactForm;
