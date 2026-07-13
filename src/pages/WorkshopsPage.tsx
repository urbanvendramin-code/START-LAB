import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Clock,
  MapPin
} from 'lucide-react';
import { WORKSHOPS } from '../constants';

export default function WorkshopsPage() {
  const { t } = useTranslation();
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);

  const getWData = (id: string) => {
    return {
      title: t(`workshops_data.items.${id}.title`),
      desc: t(`workshops_data.items.${id}.desc`)
    };
  };

  const getSectionTitle = (title: string) => {
    if (title.includes('Digitalna proizvodnja')) return t('workshops_data.sections.digital');
    if (title.includes('Elektronika')) return t('workshops_data.sections.electronics');
    if (title.includes('Digitalna doživetja')) return t('workshops_data.sections.science');
    if (title.includes('Od ideje')) return t('workshops_data.sections.solution');
    return title;
  };

  return (
    <div className="pt-[220px] md:pt-[275px] pb-20 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <h1 className="text-4xl md:text-7xl font-display font-black uppercase leading-[1.0] tracking-tight mb-6 text-slate-950">
            {t('workshops_page.title_start')} <span className="text-brand-red inline-block">{t('workshops_page.title_brand')}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-semibold leading-relaxed">
            {t('workshops_page.subtitle')}
          </p>
        </div>

        {/* List of workshops grouped by section */}
        <div className="space-y-16 md:space-y-20">
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
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                      onClick={() => setSelectedWorkshop(selectedWorkshop === workshop.id ? null : workshop.id)}
                    >
                      <div className="aspect-video w-full overflow-hidden relative p-3 pb-0">
                        <img 
                          src={(workshop as any).image} 
                          alt={translated.title}
                          className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
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
      </div>
    </div>
  );
}
