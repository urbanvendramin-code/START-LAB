import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { submitForm } from '../utils/formSubmit';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    const result = await submitForm(
      '/api/newsletter/subscribe',
      { email },
      `Nova naročnina na novice - Start Lab`
    );

    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative bg-white border-4 border-slate-950 rounded-[2.5rem] p-6 sm:p-10 w-full max-w-lg shadow-[8px_8px_0_0_rgba(15,23,42,1)] overflow-hidden z-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-950 transition-colors p-2 hover:bg-slate-50 rounded-full cursor-pointer"
          aria-label="Zapri"
        >
          <X size={20} className="stroke-[2.5]" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-emerald-50/50 text-emerald-500 border-2 border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="stroke-[2]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black uppercase mb-3 text-slate-900">
              {t('newsletter.success_title')}
            </h3>
            <p className="text-slate-600 font-medium text-sm sm:text-base mb-8 max-w-sm mx-auto leading-relaxed">
              {t('newsletter.success_desc')}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white font-display font-bold uppercase rounded-xl transition-all tracking-wider text-xs cursor-pointer"
            >
              {t('newsletter.close_btn')}
            </button>
          </div>
        ) : (
          <div>
            <div className="w-14 h-14 bg-brand-red/10 border-2 border-brand-red/20 rounded-2xl flex items-center justify-center text-brand-red mb-6 shadow-[0_4px_0_0_rgba(222,59,59,0.1)]">
              <Mail size={28} className="stroke-[2]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-black uppercase mb-3 text-slate-950">
              {t('newsletter.title')}
            </h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
              {t('newsletter.subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <input
                  required
                  type="email"
                  value={email}
                  disabled={status === 'loading'}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-brand-red focus:bg-white text-sm text-slate-800 font-semibold transition-all disabled:opacity-50"
                  placeholder={t('newsletter.email_placeholder')}
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-wider">
                  <AlertCircle size={16} />
                  <span>{t('newsletter.error_desc')}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full justify-center group bg-brand-red border-2 border-brand-red hover:bg-brand-red/90 text-white font-display font-bold text-center uppercase tracking-wider py-4 mt-2 rounded-2xl transition-all shadow-[0_4px_0_0_rgba(222,59,59,0.25)] flex items-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>{t('newsletter.subscribing')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('newsletter.subscribe_btn')}</span>
                    <Send size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
