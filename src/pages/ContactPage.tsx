import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { submitForm, triggerDirectActivation } from '../utils/formSubmit';
import { 
  Mail, 
  MapPin, 
  CheckCircle2,
  AlertTriangle,
  Loader2
} from 'lucide-react';

export default function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const result = await submitForm(
      '/api/contact/general',
      { name, email, message },
      `Start Lab - Sporočilo od ${name}`
    );

    if (result.success) {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Neznana napaka pri pošiljanju.');
    }
  };

  return (
    <div className="pt-[220px] md:pt-[275px] pb-20 px-4 md:px-6 relative min-h-screen">
      <div className="max-w-7xl mx-auto font-sans">
        <div className="mb-12">
          <h1 className="text-4xl md:text-7xl font-display font-black uppercase leading-[1.0] tracking-tight mb-4 text-slate-950">
            {t('contact.title_start_page', { defaultValue: 'Stopite v' })} <span className="text-brand-red inline-block">{t('contact.title_brand_page', { defaultValue: 'Stik' })}</span>
          </h1>
          <p className="text-lg text-slate-600 font-semibold max-w-2xl leading-relaxed">
            {t('contact.subtitle_page', { defaultValue: 'Stopite v stik z nami za vsa vprašanja, informacije o vpisu ali morebitnih sodelovanjih.' })}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
          <div className="lg:col-span-5 text-left space-y-6">
            <h3 className="text-xl font-display font-black uppercase text-slate-900 tracking-tight">
              {t('contact.info_title', { defaultValue: 'Kontaktni podatki' })}
            </h3>

            <div className="space-y-4">
               <div className="flex items-center gap-4 bg-play-pink/10 border border-play-pink/25 rounded-2xl p-4 max-w-sm">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-play-pink shadow-md">
                     <Mail size={24} className="stroke-[2.5]" />
                  </div>
                  <div>
                     <div className="text-[10px] uppercase font-bold font-display text-slate-500">{t('contact.form.email')}</div>
                     <div className="font-display font-extrabold text-slate-800">info@startlab.si</div>
                  </div>
               </div>
               <div className="flex items-center gap-4 bg-play-blue/10 border border-play-blue/25 rounded-2xl p-4 max-w-sm">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-play-blue shadow-md">
                     <MapPin size={24} className="stroke-[2.5]" />
                  </div>
                  <div>
                     <div className="text-[10px] uppercase font-bold font-display text-slate-500">{t('contact.location')}</div>
                     <div className="font-display font-extrabold text-slate-800">{t('contact.city')}</div>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 play-card p-8 md:p-12 bg-white border-2 border-slate-950/10 shadow-[0_24px_50px_rgba(15,23,42,0.06)]">
             {status === 'success' ? (
               <div className="text-center py-16">
                 <div className="w-20 h-20 bg-play-teal/15 text-play-teal border-2 border-play-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle2 size={40} className="stroke-[3]" />
                 </div>
                 <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">{t('partner_page.thanks')}</h3>
                 <p className="text-slate-600 font-semibold">{t('partner_page.callback')}</p>
                 <button 
                   onClick={() => setStatus('idle')}
                   className="mt-8 text-play-teal font-display font-black uppercase text-xs tracking-wider hover:underline cursor-pointer"
                 >
                   {t('partner_page.new_request')}
                 </button>
               </div>
             ) : status === 'error' ? (
               <div className="text-center py-16">
                 <div className="w-20 h-20 bg-brand-red/15 text-brand-red border-2 border-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <AlertTriangle size={40} className="stroke-[3]" />
                 </div>
                 <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">Napaka pri pošiljanju</h3>
                 <p className="text-slate-600 font-semibold max-w-md mx-auto mb-4">Sporočila ni bilo mogoče poslati neposredno preko SMTP strežnika.</p>
                 <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-xs font-mono break-all max-w-md mx-auto text-left mb-8 border border-red-100">
                   <strong>Diagnostic SMTP Error:</strong> {errorMessage}
                 </div>
                 <button 
                   onClick={() => setStatus('idle')}
                   className="btn-primary py-3 px-8 shadow-md"
                 >
                   Poskusi ponovno
                 </button>
               </div>
             ) : (
               <>
                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                       <div className="space-y-2">
                          <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.name')}</label>
                          <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={status === 'loading'}
                            className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 outline-none focus:border-brand-red text-slate-800 font-medium font-sans text-sm focus:bg-white transition-all disabled:opacity-50" 
                            placeholder={t('contact.form.placeholder')} 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.email')}</label>
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={status === 'loading'}
                            className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 outline-none focus:border-brand-red text-slate-800 font-medium font-sans text-sm focus:bg-white transition-all disabled:opacity-50" 
                            placeholder={t('contact.form.placeholder')} 
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.message')}</label>
                       <textarea 
                         rows={5} 
                         value={message}
                         onChange={(e) => setMessage(e.target.value)}
                         required
                         disabled={status === 'loading'}
                         className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 outline-none focus:border-brand-red text-slate-800 font-medium font-sans text-sm focus:bg-white transition-all resize-none disabled:opacity-50" 
                         placeholder={t('contact.form.placeholder_msg')} 
                       />
                    </div>
                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center py-4 mt-2 shadow-lg cursor-pointer flex items-center gap-2 disabled:opacity-80"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Pošiljanje...
                        </>
                      ) : (
                        t('contact.form.submit')
                      )}
                    </button>
                 </form>

                 {/* FormSubmit Activation Helper Section */}
                 <div className="mt-8 pt-6 border-t border-slate-100">
                   <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 md:p-5 text-left">
                     <h4 className="text-xs font-display font-black uppercase text-slate-700 tracking-wider flex items-center gap-2 mb-1.5">
                       <AlertTriangle className="text-brand-red stroke-[2.5]" size={16} />
                       Težave s prejemanjem e-pošte na GitHubu?
                     </h4>
                     <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-4">
                       Ker je vaša spletna stran statična (objavljena na GitHub Pages), za varno in brezplačno pošiljanje obrazcev uporabljamo platformo FormSubmit. Ob prvem pošiljanju je potrebno vaš e-poštni naslov <strong>info@startlab.si</strong> aktivirati. Kliknite spodnji gumb, ki bo sprožil aktivacijski e-mail. Preverite vaš nabiralnik (tudi Spam/Vsiljeno pošto) in kliknite "Activate Form".
                     </p>
                     <button
                       type="button"
                       onClick={triggerDirectActivation}
                       className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-display font-black uppercase text-[10px] tracking-wider py-2.5 px-4 rounded-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                     >
                       Sproži aktivacijski mail za info@startlab.si
                     </button>
                   </div>
                 </div>
               </>
             )}
          </div>
        </div>

        {/* Google Maps Location Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="mb-6">
            <h3 className="text-xl font-display font-black uppercase text-slate-900 tracking-tight">
              {t('contact.map_title', { defaultValue: 'Kje nas najdete' })}
            </h3>
            <p className="text-sm text-slate-500 font-semibold mt-1">
              {t('contact.city', { defaultValue: 'Velika pot 33, 5250 Solkan' })}
            </p>
          </div>
          
          <div className="play-card p-3 bg-white border-2 border-slate-950/10 shadow-[0_24px_50px_rgba(15,23,42,0.06)] overflow-hidden">
            <iframe 
              title="Start Lab Google Maps Location"
              src="https://maps.google.com/maps?q=Velika%20pot%2033,%205250%20Solkan&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[350px] md:h-[450px] rounded-[1.8rem] border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
