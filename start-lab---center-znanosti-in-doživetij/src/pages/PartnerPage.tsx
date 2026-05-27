import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Handshake, 
  Target, 
  Users, 
  ShieldCheck, 
  Send,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function PartnerPage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [coopType, setCoopType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Start Lab Partnerstvo - ${company}`);
    const body = encodeURIComponent(`Podjetje/Organizacija: ${company}\nE-pošta: ${email}\nTip sodelovanja: ${coopType}\n\nSporočilo:\n${message}`);
    
    window.location.href = `mailto:info@startlab.si?subject=${subject}&body=${body}`;
    
    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase leading-[1.0] tracking-tight mb-8 text-slate-950">
              {t('partner_page.title_start')} <br />
              <span className="text-brand-red inline-block mt-2">{t('partner_page.title_brand')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 font-semibold mb-10 leading-relaxed">
              {t('partner_page.subtitle')}
            </p>

            <div className="rounded-[2.5rem] overflow-hidden bg-slate-100 p-2.5 border-2 border-slate-900/10 mb-12 shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
               <img 
                 src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                 alt="Collaboration" 
                 className="w-full h-80 object-cover rounded-[2rem]"
               />
            </div>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 bg-play-pink/12 border-2 border-play-pink/20 rounded-2xl flex items-center justify-center text-play-pink shadow-[0_4px_0_0_#e11d481a]">
                  <Target size={26} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display font-black uppercase mb-2 text-slate-900 text-base md:text-lg">{t('partner_page.colab_title')}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{t('partner_page.colab_subtitle')}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 bg-play-teal/12 border-2 border-play-teal/20 rounded-2xl flex items-center justify-center text-play-teal shadow-[0_4px_0_0_#0d94881a]">
                  <ShieldCheck size={26} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display font-black uppercase mb-2 text-slate-900 text-base md:text-lg">{t('partner_page.benefit_title')}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{t('partner_page.benefit_subtitle')}</p>
                </div>
              </div>

              <div className="flex gap-4 sm:col-span-2">
                <div className="w-14 h-14 shrink-0 bg-play-blue/12 border-2 border-play-blue/20 rounded-2xl flex items-center justify-center text-play-blue shadow-[0_4px_0_0_#2563eb1a]">
                  <Handshake size={26} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display font-black uppercase mb-2 text-slate-900 text-base md:text-lg">{t('partner_page.goal_title')}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t('partner_page.goal_subtitle')}</p>
                </div>
              </div>
            </div>

            <div className="p-8 play-card border-none bg-play-purple/8 rounded-[2rem]">
                <blockquote className="text-base md:text-lg italic font-semibold text-slate-700 leading-relaxed">
                  "{t('partner_page.quote')}"
                </blockquote>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 play-card p-8 md:p-12 border-2 border-slate-950/10 bg-white shadow-xl relative"
          >
            <h2 className="text-2xl font-display font-black uppercase mb-8 flex items-center gap-3 text-slate-950">
              <Users className="text-play-pink stroke-[2.5]" size={28} />
              {t('partner_page.form_title')}
            </h2>

            {status === 'success' ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-play-teal/15 text-play-teal border-2 border-play-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="stroke-[3]" />
                </div>
                <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">{t('partner_page.thanks')}</h3>
                <p className="text-slate-600 font-semibold">{t('partner_page.callback')}</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-play-pink font-display font-black uppercase text-xs tracking-wider hover:underline"
                >
                  {t('partner_page.new_request')}
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.company_label')}</label>
                    <input 
                      required 
                      type="text" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" 
                      placeholder="..." 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.email')}</label>
                    <input 
                      required 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" 
                      placeholder="..." 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.coop_type.label')}</label>
                  <select 
                    required 
                    value={coopType}
                    onChange={(e) => setCoopType(e.target.value)}
                    className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium appearance-none"
                  >
                    <option value="" disabled>{t('partner_page.coop_type.placeholder')}</option>
                    <option>{t('partner_page.coop_type.sponsorship')}</option>
                    <option>{t('partner_page.coop_type.mentoring')}</option>
                    <option>{t('partner_page.coop_type.equipment')}</option>
                    <option>{t('partner_page.coop_type.other')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.message')}</label>
                  <textarea 
                    rows={5} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium resize-none" 
                    placeholder={t('partner_page.message_placeholder')}
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center group py-4 mt-2 shadow-lg">
                  {t('partner_page.submit')} 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform stroke-[3]" />
                </button>

                <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center mt-6 font-bold leading-relaxed">
                  {t('partner_page.agreement')}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
