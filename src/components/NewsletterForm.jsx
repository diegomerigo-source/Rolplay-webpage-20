'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function NewsletterForm({ source = 'footer', className = '' }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | success | duplicate | error

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || state === 'loading' || state === 'success') return;

    setState('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          locale: i18n.language || 'en',
          source,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setState('success');
        setEmail('');
      } else if (res.status === 409 || data.error === 'already_subscribed') {
        setState('duplicate');
        // Reset after 3 s so they can try a different email
        setTimeout(() => setState('idle'), 3000);
      } else {
        setState('error');
        setTimeout(() => setState('idle'), 3000);
      }
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 3000);
    }
  };

  // Resolved feedback messages
  const feedbackMsg =
    state === 'success'
      ? t('newsletter.success')
      : state === 'duplicate'
      ? t('newsletter.duplicate')
      : t('newsletter.error');

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 glass rounded-full px-6 py-3.5 text-sm text-white max-w-xl"
          >
            <span className="w-6 h-6 rounded-full bg-[#C0392B] grid place-items-center shrink-0">
              <Check size={12} />
            </span>
            <span>{t('newsletter.success')}</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            className="glass rounded-full p-1.5 flex items-center gap-2 max-w-xl w-full"
            data-testid="newsletter-form"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0 px-4">
              <Mail size={14} className="text-zinc-500 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                aria-label={t('newsletter.placeholder')}
                required
                className="flex-1 bg-transparent py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none min-w-0"
                data-testid="newsletter-email-input"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={state === 'loading'}
              className="rounded-full bg-[#C0392B] hover:bg-[#A93226] text-white text-sm font-medium px-5 py-3 flex items-center gap-2 shadow-[0_0_20px_rgba(192,57,43,0.4)] transition-all shrink-0 disabled:opacity-60"
              data-testid="newsletter-submit-btn"
            >
              {state === 'loading' ? (
                <>
                  <motion.span
                    className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="sr-only">{t('newsletter.subscribing')}</span>
                </>
              ) : (
                <>
                  {t('newsletter.subscribe')}
                  <ArrowRight size={14} />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Transient feedback for duplicate / error */}
      <AnimatePresence>
        {(state === 'duplicate' || state === 'error') && (
          <motion.p
            key={state}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-2 text-xs font-mono pl-5 ${
              state === 'duplicate' ? 'text-zinc-400' : 'text-red-400'
            }`}
          >
            {feedbackMsg}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
