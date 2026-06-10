import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ChevronRight, 
  Rocket, 
  Users, 
  CheckCircle2, 
  Settings,
  Cpu,
  Boxes,
  ArrowRight
} from 'lucide-react';
import { LAB_EQUIPMENT } from '../constants';
import fablabSpaceImage from '../assets/images/fablab_space_1781078255061.png';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-[220px] md:pt-[275px] lg:pt-[300px] pb-16 md:pb-28 px-4 md:px-6 min-h-screen flex items-center overflow-hidden">
        {/* Modern Background with Photography */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover grayscale opacity-20"
          />
        </div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          <motion.div 
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-black mb-8 leading-[1.05] tracking-tight text-slate-950">
              {t('hero.title_start')} <br />
              <span className="text-brand-red">
                {t('hero.title_end_before_highlight')}
                <span className="relative inline-block whitespace-nowrap">
                  {t('hero.title_end_highlight')}
                  <svg className="absolute left-0 -bottom-2 w-full h-3 text-play-yellow opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
                {t('hero.title_end_after_highlight')}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/delavnice" className="btn-primary shadow-lg">
                {t('hero.cta')} <ChevronRight size={22} className="stroke-[3]" />
              </Link>
              <Link to="/partner" className="btn-secondary">
                {t('nav.partner')} <Users size={20} className="stroke-[2.5]" />
              </Link>
            </div>
 
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="bg-play-pink/10 border-2 border-play-pink/20 rounded-[1.8rem] p-4 text-center transform hover:scale-105 transition-all">
                <div className="text-3.5xl font-display font-black text-play-pink shrink-0">15+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-slate-500 font-extrabold font-display leading-tight">{t('hero.stats.workshops')}</div>
              </div>
              <div className="bg-play-teal/10 border-2 border-play-teal/20 rounded-[1.8rem] p-4 text-center transform hover:scale-105 transition-all">
                <div className="text-3.5xl font-display font-black text-play-teal shrink-0">100%</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-slate-500 font-extrabold font-display leading-tight">{t('hero.stats.practical')}</div>
              </div>
              <div className="bg-play-yellow/10 border-2 border-play-yellow/20 rounded-[1.8rem] p-4 text-center transform hover:scale-105 transition-all">
                <div className="text-3.5xl font-display font-black text-play-yellow shrink-0">Top</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-slate-500 font-extrabold font-display leading-tight">{t('hero.stats.equipment')}</div>
              </div>
            </div>
          </motion.div>
 
          <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative lg:col-span-5"
          >
            {/* Playful card with colorful border offset shadow */}
            <div className="relative rounded-[2.5rem] bg-slate-900 p-3 shadow-[0_24px_60px_rgba(255,51,68,0.15)] border-4 border-slate-950">
               <div className="relative aspect-video lg:aspect-square w-full rounded-[2rem] overflow-hidden bg-slate-950 flex items-center justify-center">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    key="hero-video"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="https://res.cloudinary.com/dssxhjk8k/video/upload/v1778066331/hf_20260505_123915_c55001c1-8db6-4d29-8c8c-65e52a4e894e_m3cfnk.mp4" type="video/mp4" />
                  </video>
               </div>
               
               {/* Cute sticker Badge */}
               <div className="absolute -bottom-6 -right-4 bg-play-teal text-slate-950 font-display font-black text-sm uppercase px-5 py-3 rounded-2xl shadow-[0_8px_0_0_#028a67] border-2 border-slate-900 -rotate-3 hover:rotate-3 transition-transform duration-300">
                  ⚡ {t('why.exploration.title')}
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vizija" className="py-20 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div 
            whileHover={{ y: -5 }}
            className="play-card p-8 md:p-12 bg-white relative overflow-hidden group border-2 border-slate-100"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-play-blue/10 rounded-bl-[4rem] flex items-center justify-center text-play-blue group-hover:scale-110 transition-transform">
              <Boxes size={40} className="mr-[-10px] mt-[-10px]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-play-blue uppercase tracking-tight">{t('mission.title')}</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              {t('mission.text')}
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="play-card p-8 md:p-12 bg-white relative overflow-hidden group border-2 border-slate-100"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-play-pink/10 rounded-bl-[4rem] flex items-center justify-center text-play-pink group-hover:scale-110 transition-transform">
              <Rocket size={40} className="mr-[-10px] mt-[-10px]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-play-pink uppercase tracking-tight">{t('vision.title')}</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              {t('vision.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Start Lab? Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-center mb-20">
            <div className="lg:col-span-7">
              <div className="inline-block bg-play-pink/15 text-play-pink font-display font-extrabold text-xs uppercase px-4 py-2 rounded-full mb-6">
                Problem & Rešitev
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-8 leading-[1.05] text-slate-950">
                {t('why.title_start')} <span className="text-brand-red inline-block">{t('why.title_brand')}</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-semibold mb-10">
                {t('why.subtitle_rest').split(',').map((part, index) => (
                  index === 0 ? (
                    <span key={index}>{part} <span className="text-brand-red font-black underline decoration-play-yellow decoration-4 underline-offset-4">{t('why.subtitle_highlight')}</span> </span>
                  ) : <span key={index}>{part}</span>
                ))}
              </p>
              
              <div className="space-y-6 md:space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-play-teal/15 border-2 border-play-teal/30 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_0_0_#0d948830]">
                    <Boxes className="text-play-teal" size={26} />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold uppercase mb-2 text-base md:text-lg text-slate-900">{t('why.exploration.title')}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('why.exploration.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-play-purple/15 border-2 border-play-purple/30 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_0_0_#7c3aed30]">
                    <Cpu className="text-play-purple" size={26} />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold uppercase mb-2 text-base md:text-lg text-slate-900">{t('why.industry.title')}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{t('why.industry.desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0 lg:col-span-5">
              <div className="rounded-[2.5rem] overflow-hidden bg-slate-100 p-3 border-2 border-slate-900/10 shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80" 
                  alt="Students Working" 
                  className="w-full h-full object-cover rounded-[2rem] aspect-square"
                />
              </div>
              <div className="absolute top-4 -right-2 md:-top-6 md:-right-6 bg-white border-2 border-slate-950 p-5 rounded-2xl shadow-[0_8px_0_0_rgba(15,23,42,1)] animate-float font-display">
                <div className="text-xs font-black uppercase tracking-wider text-brand-red mb-1">Hands-on</div>
                <div className="text-[10px] text-slate-500 font-extrabold">100% PRAKSA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-slate-950 mb-4">{t('goals.title')}</h2>
            <div className="w-24 h-2 bg-play-teal mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { goal: t('goals.goal1', { returnObjects: true }) as any, colorClass: "bg-play-pink/5 border-play-pink/25 text-play-pink shadow-[0_10px_0_0_#e11d4815] hover:bg-play-pink/10" },
              { goal: t('goals.goal2', { returnObjects: true }) as any, colorClass: "bg-play-yellow/5 border-play-yellow/25 text-play-yellow shadow-[0_10px_0_0_#f59e0b15] hover:bg-play-yellow/10" },
              { goal: t('goals.goal3', { returnObjects: true }) as any, colorClass: "bg-play-teal/5 border-play-teal/25 text-play-teal shadow-[0_10px_0_0_#0d948815] hover:bg-play-teal/10" },
              { goal: t('goals.goal4', { returnObjects: true }) as any, colorClass: "bg-play-blue/5 border-play-blue/25 text-play-blue shadow-[0_10px_0_0_#2563eb15] hover:bg-play-blue/10" },
              { goal: t('goals.goal5', { returnObjects: true }) as any, colorClass: "bg-play-purple/5 border-play-purple/25 text-play-purple shadow-[0_10px_0_0_#7c3aed15] hover:bg-play-purple/10" }
            ].map((item, i) => (
              <motion.div 
                whileHover={{ y: -6 }}
                key={i} 
                className={`border-2 rounded-[2rem] p-8 text-center bg-white transition-all ${item.colorClass}`}
              >
                <div className="font-display font-black text-4xl mb-4 text-slate-900 leading-none">0{i+1}</div>
                <h3 className="font-display font-black uppercase text-sm tracking-wider mb-4 leading-snug">{item.goal.t}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">{item.goal.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's happening section */}
      <section id="dogajanje" className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <span className="bg-play-pink/15 text-play-pink font-display font-black uppercase tracking-wider text-xs px-5 py-2.5 rounded-full mb-4 inline-block">{t('happening.badge')}</span>
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-950 mt-4 leading-tight">{t('happening.title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(t('happening.items', { returnObjects: true }) as any[]).map((item, idx) => {
              const borderColors = ["border-play-pink/30 hover:border-play-pink", "border-play-teal/30 hover:border-play-teal", "border-play-yellow/35 hover:border-play-yellow"];
              const numberColors = ["text-play-pink/15 group-hover:text-play-pink", "text-play-teal/15 group-hover:text-play-teal", "text-play-yellow/20 group-hover:text-play-yellow"];
              const selectedColorIdx = idx % 3;
              
              return (
                <motion.div 
                  whileHover={{ y: -8 }}
                  key={idx} 
                  className={`play-card p-8 bg-white group transition-all duration-300 border-2 ${borderColors[selectedColorIdx]}`}
                >
                  <div className={`text-5xl font-display font-black ${numberColors[selectedColorIdx]} transition-colors mb-4`}>{item.id}</div>
                  <h3 className="text-xl font-display font-black uppercase mb-4 text-slate-950 leading-snug">{item.t}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-semibold">{item.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab Equipment - FabLab Section */}
      <section id="fablab" className="py-20 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto play-card p-8 md:p-16 relative overflow-hidden bg-white border-2 border-slate-950/10">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none hidden md:block text-slate-950">
             <Settings className="w-96 h-96 -mr-32 -mt-32 animate-[spin_30s_linear_infinite]" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-12 md:gap-16 items-center text-base">
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase mb-4 text-slate-950 leading-tight">
                {t('equipment.title')}
              </h2>
              <p className="text-base text-slate-600 mb-8 font-semibold leading-relaxed">
                {t('equipment.intro')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {(t('equipment.list', { returnObjects: true }) as string[]).map((tool, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 4, scale: 1.01 }}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-play-teal/20 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-xl bg-play-teal/10 flex items-center justify-center shrink-0 text-play-teal">
                      <CheckCircle2 className="stroke-[3]" size={16} />
                    </div>
                    <span className="text-sm text-slate-800 font-bold leading-snug pt-1.5">{tool}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-5 bg-brand-red/5 border-l-4 border-brand-red rounded-r-2xl text-sm text-slate-700 font-bold leading-relaxed shadow-sm">
                {t('equipment.outro')}
              </div>
            </div>
            <div className="lg:col-span-5 w-full flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-[2.5rem] overflow-hidden border-4 border-slate-950 shadow-[8px_8px_0_0_rgba(15,23,42,0.9)] bg-white group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent z-10 pointer-events-none" />
                <img 
                  src={fablabSpaceImage} 
                  alt="Center znanosti in tehnologije" 
                  className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
