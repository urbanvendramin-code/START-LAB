import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Rocket, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Filter
} from 'lucide-react';
import { WORKSHOPS } from '../constants';

export default function WorkshopsPage() {
  const { t } = useTranslation();
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const allWorkshops = WORKSHOPS.flatMap(section => section.items.map(item => ({...item, section: section.section})));

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => {
        setStatus('idle');
        setSelectedWorkshop(null);
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to get translated workshop data
  const getWData = (id: string) => {
    return {
      title: t(`workshops_data.items.${id}.title`),
      desc: t(`workshops_data.items.${id}.desc`)
    };
  };

  // Helper to get translated section title
  const getSectionTitle = (title: string) => {
    if (title.includes('Digitalna proizvodnja')) return t('workshops_data.sections.digital');
    if (title.includes('Elektronika')) return t('workshops_data.sections.electronics');
    if (title.includes('Digitalna doživetja')) return t('workshops_data.sections.science');
    if (title.includes('Od ideje')) return t('workshops_data.sections.solution');
    return title;
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase leading-[1.0] tracking-tight mb-6 text-slate-950">
              {t('workshops_page.title_start')} <span className="text-brand-red inline-block">{t('workshops_page.title_brand')}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-semibold leading-relaxed">
              {t('workshops_page.subtitle')}
            </p>
          </div>
          <div className="mt-8 md:block flex shrink-0">
             <button 
               onClick={() => scrollToSection('prijava-form')}
               className="btn-primary shadow-lg"
             >
                {t('workshops_page.register')} <Rocket size={20} className="stroke-[3]" />
             </button>
          </div>
        </div>

        {/* Important Notice Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mb-16 bg-play-yellow/5 border-2 border-play-yellow/30 rounded-[2rem] p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-[0_10px_0_0_#f59e0b12] relative overflow-hidden"
        >
          {/* Decorative background blur element */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-play-yellow/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-14 h-14 bg-play-yellow text-slate-950 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_0_0_#f59e0b25] border border-slate-950/5">
            <Calendar className="stroke-[2.5]" size={26} />
          </div>
          <div className="text-center sm:text-left flex-1">
            <span className="text-[10px] font-display font-black text-play-yellow uppercase tracking-widest bg-play-yellow/12 px-3 py-1.5 rounded-full mb-2.5 inline-block">
              {t('workshops_page.important_notice')}
            </span>
            <p className="text-lg md:text-xl font-display font-black text-slate-950 leading-tight">
              {t('workshops_page.schedules_soon')}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* List of workshops grouped by section */}
          <div className="lg:col-span-8 space-y-16 md:space-y-20">
            {WORKSHOPS.map((section, sIdx) => (
              <motion.div 
                key={section.section}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: sIdx * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="bg-play-blue/10 text-play-blue border-2 border-play-blue/25 rounded-full px-5 py-2 font-display font-black uppercase text-xs md:text-sm tracking-widest inline-block shrink-0">
                    {getSectionTitle(section.section)}
                  </span>
                  <div className="h-0.5 flex-grow bg-slate-900/10 rounded-full" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  {section.items.map((workshop, idx) => {
                    const translated = getWData(workshop.id);
                    const colorThemes = [
                      { text: "text-play-pink", bg: "bg-play-pink/10", border: "hover:border-play-pink", ring: "ring-play-pink" },
                      { text: "text-play-teal", bg: "bg-play-teal/10", border: "hover:border-play-teal", ring: "ring-play-teal" },
                      { text: "text-play-yellow", bg: "bg-play-yellow/15", border: "hover:border-play-yellow", ring: "ring-play-yellow" },
                      { text: "text-play-blue", bg: "bg-play-blue/10", border: "hover:border-play-blue", ring: "ring-play-blue" }
                    ];
                    const theme = colorThemes[idx % 4];
                    const isSelected = selectedWorkshop === workshop.id;

                    return (
                      <motion.div 
                        key={workshop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (sIdx * 0.1) + (idx * 0.05) }}
                        className={`play-card overflow-hidden group cursor-pointer transition-all border-2 bg-white ${isSelected ? `ring-4 ring-offset-2 ${theme.ring} border-slate-900` : `border-slate-900/10 ${theme.border}`}`}
                        onClick={() => setSelectedWorkshop(workshop.id)}
                      >
                        <div className="aspect-video w-full overflow-hidden relative p-3 pb-0">
                          <img 
                            src={(workshop as any).image} 
                            alt={translated.title}
                            className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute bottom-3 right-5 flex items-end">
                             <div className={`w-11 h-11 rounded-2xl border-2 border-white shadow-md flex items-center justify-center transition-all ${isSelected ? 'bg-slate-950 text-white hover:scale-110' : `${theme.bg} ${theme.text} backdrop-blur-md group-hover:bg-slate-950 group-hover:text-white`}`}>
                              <workshop.icon size={20} className="stroke-[2.5]" />
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-base md:text-lg font-display font-black uppercase mb-3 text-slate-950 leading-snug group-hover:text-brand-red transition-colors">{translated.title}</h3>
                          <p className={`text-xs text-slate-600 font-semibold leading-relaxed mb-6 ${isSelected ? '' : 'line-clamp-2'}`}>
                            {translated.desc}
                          </p>
                          <div className="flex items-center gap-5 text-[11px] font-display font-black uppercase tracking-wider text-slate-500">
                            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                              <Clock size={14} className="text-brand-red stroke-[2.5]" /> {t('workshops_page.duration')}
                            </div>
                            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                              <MapPin size={14} className="text-brand-red stroke-[2.5]" /> Solkan
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Registration Form */}
          <div id="prijava-form" className="lg:col-span-4 lg:sticky lg:top-36 mt-8 lg:mt-0 scroll-mt-36">
            <div className="play-card p-6 md:p-10 border-2 border-slate-950/10 bg-white shadow-xl relative">
              <h2 className="text-2xl font-display font-black uppercase mb-6 flex items-center gap-3 text-slate-950">
                <Rocket className="text-play-pink stroke-[2.5]" size={28} /> 
                {t('workshops_page.register')}
              </h2>

              {status === 'success' ? (
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                >
                    <div className="w-16 h-16 bg-play-teal/15 text-play-teal rounded-full border-2 border-play-teal/30 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={36} className="stroke-[3]" />
                    </div>
                    <h3 className="text-xl font-display font-black uppercase mb-2 text-slate-900">Uspešno prijavljeni!</h3>
                    <p className="text-sm text-slate-600 font-semibold leading-relaxed">Kmalu vas bomo kontaktirali s podrobnostmi.</p>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleRegister}>
                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('workshops_page.workshop_label')}</label>
                    <select 
                        required
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium"
                        value={selectedWorkshop || ''}
                        onChange={(e) => setSelectedWorkshop(e.target.value)}
                    >
                      <option value="" disabled>{t('workshops_page.workshop_label')}...</option>
                      {allWorkshops.map(w => (
                        <option key={w.id} value={w.id}>{getWData(w.id).title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('workshops_page.child_name')}</label>
                    <input required type="text" className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" placeholder="Janez Novak" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('workshops_page.child_age')}</label>
                    <input required type="number" min="5" max="18" className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" placeholder="8" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('workshops_page.parent_email')}</label>
                    <input required type="email" className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" placeholder="janez@email.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('workshops_page.parent_phone')}</label>
                    <input required type="tel" className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" placeholder="040 123 456" />
                  </div>

                  <div className="pt-4 text-center">
                    <button disabled type="submit" className="btn-primary w-full justify-center shadow-lg opacity-60 cursor-not-allowed pointer-events-none select-none">
                      {t('workshops_page.submit')} <ArrowRight size={20} className="stroke-[3]" />
                    </button>
                    <p className="text-xs font-display font-black text-play-pink mt-3 uppercase tracking-wider animate-pulse">
                      {t('workshops_page.dates_soon')}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-4 uppercase leading-relaxed text-center font-bold">
                        {t('footer.terms_agreement', { defaultValue: 'S prijavo se strinjate s pogoji uporabe in obdelavo osebnih podatkov.' })}
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Support Info */}
            <div className="mt-8 p-6 play-card border-none bg-play-pink/8">
                <h4 className="text-xs font-display font-black uppercase mb-2 text-play-pink tracking-wider text-center">{t('workshops_page.help_title')}</h4>
                <p className="text-[10px] text-slate-600 font-bold uppercase leading-relaxed text-center">
                    {t('workshops_page.help_text')}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
