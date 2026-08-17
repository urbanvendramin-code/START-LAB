import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { submitForm } from '../utils/formSubmit';
import { 
  Gauge, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  AlertTriangle, 
  Loader2,
  Zap
} from 'lucide-react';

const SIMULATOR_VIDEO_URL = "https://res.cloudinary.com/dssxhjk8k/video/upload/v1786954084/simulator2_hcbetm.mp4";
const PHOTO_1 = "https://res.cloudinary.com/dssxhjk8k/image/upload/v1786954227/DSC_8096_snyavr.jpg";
const PHOTO_2 = "https://res.cloudinary.com/dssxhjk8k/image/upload/v1786954232/DSC_8119_t53gs4.jpg";

export default function DrivingSimulatorPage() {
  const { t, i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isDenisExpanded, setIsDenisExpanded] = useState(false);

  // Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    programType: 'Preizkus simulatorja & zabavna vožnja',
    message: '',
    subscribeToNewsletter: false
  });

  const isSlovenian = i18n.language === 'sl';
  const isIt = i18n.language === 'it';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    const result = await submitForm(
      '/api/contact/simulator',
      {
        ime: formData.name,
        email: formData.email,
        telefon: formData.phone,
        program: formData.programType,
        sporocilo: formData.message,
        newsletter: formData.subscribeToNewsletter ? 'DA' : 'NE'
      },
      `Start Lab Simulator Vožnje - ${formData.name} (${formData.programType})`,
      'simulator'
    );

    if (result.success) {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        programType: 'Preizkus simulatorja & zabavna vožnja',
        message: '',
        subscribeToNewsletter: false
      });
    } else {
      setFormStatus('error');
      setErrorMessage(result.error || 'Prišlo je do napake pri pošiljanju.');
    }
  };

  const denisDesc = t('mentors.denis.desc');
  const denisParagraphs = denisDesc.split('\n\n');
  const denisIntro = denisParagraphs.slice(0, 2).join('\n\n');
  const denisRest = denisParagraphs.slice(2);

  return (
    <div className="pt-8 sm:pt-12 md:pt-16 pb-20 px-4 md:px-6 relative selection:bg-brand-red/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title Section */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red font-display font-black text-xs uppercase tracking-widest mb-4"
          >
            <Sparkles size={14} className="stroke-[2.5]" />
            <span>{t('simulator_page.badge')}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-950 leading-[1.05]"
          >
            {t('simulator_page.title_start')} <br />
            <span className="text-brand-red">{t('simulator_page.title_brand')}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-600 font-semibold leading-relaxed max-w-2xl mx-auto"
          >
            {t('simulator_page.subtitle')}
          </motion.p>
        </div>

        {/* TOP VIDEO PRESENTATION - Clean looping video without text or black letterbox space */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xs sm:max-w-sm mx-auto mb-12 md:mb-16"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 bg-transparent">
            <video
              ref={videoRef}
              src={SIMULATOR_VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block rounded-2xl"
            />
          </div>
        </motion.div>

        {/* 3 Key Stats / Telemetry Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20 md:mb-28">
          {[
            {
              icon: Zap,
              title: t('simulator_page.stats.torque'),
              desc: t('simulator_page.stats.torque_desc'),
              color: 'text-amber-500',
              bg: 'bg-amber-500/10 border-amber-500/20'
            },
            {
              icon: Gauge,
              title: t('simulator_page.stats.physics'),
              desc: t('simulator_page.stats.physics_desc'),
              color: 'text-brand-red',
              bg: 'bg-brand-red/10 border-brand-red/20'
            },
            {
              icon: Activity,
              title: t('simulator_page.stats.telemetry'),
              desc: t('simulator_page.stats.telemetry_desc'),
              color: 'text-play-teal',
              bg: 'bg-play-teal/10 border-play-teal/20'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 md:p-8 rounded-3xl bg-white border-2 border-slate-100 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                  <Icon size={26} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-black uppercase text-slate-900 tracking-tight">{item.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FEATURES & HARDWARE BREAKDOWN */}
        <div className="mb-20 md:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-slate-950">
              {t('simulator_page.features_title')}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 font-semibold">
              {t('simulator_page.features_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Cpu,
                title: t('simulator_page.feature1_title'),
                desc: t('simulator_page.feature1_desc'),
                tag: 'Direct Drive 20Nm+'
              },
              {
                icon: Gauge,
                title: t('simulator_page.feature2_title'),
                desc: t('simulator_page.feature2_desc'),
                tag: 'Load Cell & Hydraulic'
              },
              {
                icon: Activity,
                title: t('simulator_page.feature3_title'),
                desc: t('simulator_page.feature3_desc'),
                tag: 'MoTeC & Telemetry'
              },
              {
                icon: ShieldCheck,
                title: t('simulator_page.feature4_title'),
                desc: t('simulator_page.feature4_desc'),
                tag: 'Varna vožnja za mlade'
              }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-6 md:p-8 rounded-[2rem] bg-white border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-red/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-md">
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-red bg-brand-red/10 px-2.5 py-1 rounded-full inline-block mb-3">
                      {f.tag}
                    </span>
                    <h3 className="text-lg font-display font-black uppercase text-slate-900 mb-3 leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed font-sans">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CREATIVE PHOTO SHOWCASE (DSC_8096 & DSC_8119) */}
        <div className="mb-20 md:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">
              FOTOGRAFIJE IZ LABORATORIJA
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-slate-950 mt-2">
              {t('simulator_page.gallery_title')}
            </h2>
            <p className="mt-3 text-base text-slate-500 font-semibold">
              {t('simulator_page.gallery_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Photo 1 Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="rounded-[2.5rem] overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-xl group cursor-pointer relative"
              onClick={() => setSelectedPhoto(PHOTO_1)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img 
                  src={PHOTO_1} 
                  alt="Start Lab Simulator Kokpit" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono font-bold text-brand-red bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full uppercase">
                    Kokpit & Oprema
                  </span>
                  <h3 className="text-lg font-display font-black uppercase mt-1">Direct Drive & Dirkaška Ergonomija</h3>
                  <p className="text-xs text-slate-300 font-medium">Natančno nastavljiv položaj za mlade in odrasle voznike.</p>
                </div>
              </div>
            </motion.div>

            {/* Photo 2 Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="rounded-[2.5rem] overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-xl group cursor-pointer relative"
              onClick={() => setSelectedPhoto(PHOTO_2)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img 
                  src={PHOTO_2} 
                  alt="Start Lab Simulator Volan in Trening" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono font-bold text-play-teal bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full uppercase">
                    Trening & Vodenje
                  </span>
                  <h3 className="text-lg font-display font-black uppercase mt-1">Trening reakcij & telemetrija v živo</h3>
                  <p className="text-xs text-slate-300 font-medium">Praktični prenos motošportnih izkušenj v simulacijo.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* MENTOR SPOTLIGHT - DENIS LUPO */}
        <div id="mentor-denis" className="mb-20 md:mb-32">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-800 text-white p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Mentor Photos Side */}
              <div className="lg:col-span-5 flex flex-col items-center gap-4">
                <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-[2.5rem] overflow-hidden border-4 border-slate-700 shadow-2xl bg-slate-800 relative group">
                  <img 
                    src="https://res.cloudinary.com/dssxhjk8k/image/upload/v1786434942/WhatsApp_Image_2026-08-11_at_09.45.07_xnf783.jpg" 
                    alt="Denis Lupo - Simulator Mentor" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md py-1 px-3 rounded-xl text-center">
                    <span className="text-[10px] font-mono font-bold text-brand-red uppercase">Porsche Inštruktor</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <img 
                    src="https://res.cloudinary.com/dssxhjk8k/image/upload/v1786434942/WhatsApp_Image_2026-08-11_at_09.44.55_bms5en.jpg" 
                    alt="Denis Lupo na dirkališču" 
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 opacity-90 hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 text-left flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Izkušnje</span>
                    <span className="text-xs font-display font-black text-white">20+ let v motošportu</span>
                  </div>
                </div>
              </div>

              {/* Mentor Bio Side */}
              <div className="lg:col-span-7 text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 text-brand-red border border-brand-red/30 text-[11px] font-display font-black uppercase tracking-wider mb-3">
                  <Trophy size={14} />
                  {t('simulator_page.mentor_badge')}
                </span>

                <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-white mb-2">
                  Denis Lupo
                </h2>
                
                <p className="text-sm font-display font-bold uppercase tracking-wide text-brand-red mb-6">
                  {t('mentors.denis.role')}
                </p>

                <div className="space-y-4 text-sm text-slate-300 font-medium leading-relaxed font-sans">
                  <p className="whitespace-pre-line">{denisIntro}</p>

                  {isDenisExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 pt-2 border-t border-slate-800"
                    >
                      {denisRest.map((paragraph, pIdx) => (
                        <p key={pIdx} className="whitespace-pre-line text-slate-300">{paragraph}</p>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsDenisExpanded(!isDenisExpanded)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-display font-black uppercase tracking-wider text-white transition-all cursor-pointer"
                  >
                    <span>{isDenisExpanded ? t('partner_page.read_less') : t('partner_page.read_more')}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isDenisExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <a 
                    href="#povprasevanje" 
                    className="px-5 py-2 rounded-xl bg-brand-red hover:bg-brand-red/90 text-white text-xs font-display font-black uppercase tracking-wider transition-all"
                  >
                    Dogovori se za coaching
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRAM PACKAGES / MODULES */}
        <div className="mb-20 md:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-slate-950">
              {t('simulator_page.programs_title')}
            </h2>
            <p className="mt-3 text-base text-slate-500 font-semibold">
              {t('simulator_page.programs_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Package 1 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="p-8 rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-play-blue/20 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-play-blue bg-play-blue/10 px-3 py-1 rounded-full inline-block mb-4">
                  {t('simulator_page.prog1_tag')}
                </span>
                <h3 className="text-xl font-display font-black uppercase text-slate-900 mb-3">
                  {t('simulator_page.prog1_title')}
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-6">
                  {t('simulator_page.prog1_desc')}
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-play-blue shrink-0" />
                    <span>Zaviranje v sili in reakcijski čas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-play-blue shrink-0" />
                    <span>Predvidevanje nevarnih situacij</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-play-blue shrink-0" />
                    <span>Spoznavanje obnašanja vozila</span>
                  </li>
                </ul>
              </div>
              <a 
                href="#povprasevanje" 
                onClick={() => setFormData(prev => ({ ...prev, programType: 'Osnove varne vožnje za mlade' }))}
                className="mt-8 w-full py-3 rounded-2xl bg-slate-100 hover:bg-play-blue hover:text-white text-slate-900 font-display font-black text-xs uppercase tracking-wider text-center transition-all"
              >
                Izberi program
              </a>
            </motion.div>

            {/* Package 2 - Featured */}
            <motion.div
              whileHover={{ y: -6 }}
              className="p-8 rounded-[2.5rem] bg-slate-950 text-white border-2 border-brand-red/40 shadow-2xl relative flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-red/20 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-red bg-brand-red/20 border border-brand-red/30 px-3 py-1 rounded-full inline-block mb-4">
                  {t('simulator_page.prog2_tag')}
                </span>
                <h3 className="text-xl font-display font-black uppercase text-white mb-3">
                  {t('simulator_page.prog2_title')}
                </h3>
                <p className="text-xs text-slate-300 font-semibold leading-relaxed mb-6">
                  {t('simulator_page.prog2_desc')}
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-red shrink-0" />
                    <span>Trening dirkaških linij in apexov</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-red shrink-0" />
                    <span>Trail-braking & nadzor prenosa teže</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-red shrink-0" />
                    <span>Time Attack & primerjava časov</span>
                  </li>
                </ul>
              </div>
              <a 
                href="#povprasevanje" 
                onClick={() => setFormData(prev => ({ ...prev, programType: 'Sim Racing & tekmovalni trening' }))}
                className="mt-8 w-full py-3 rounded-2xl bg-brand-red hover:bg-brand-red/90 text-white font-display font-black text-xs uppercase tracking-wider text-center transition-all shadow-lg shadow-brand-red/30"
              >
                Izberi program
              </a>
            </motion.div>

            {/* Package 3 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="p-8 rounded-[2.5rem] bg-white border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-play-teal/20 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-play-teal bg-play-teal/10 px-3 py-1 rounded-full inline-block mb-4">
                  {t('simulator_page.prog3_tag')}
                </span>
                <h3 className="text-xl font-display font-black uppercase text-slate-900 mb-3">
                  {t('simulator_page.prog3_title')}
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-6">
                  {t('simulator_page.prog3_desc')}
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-play-teal shrink-0" />
                    <span>1-na-1 analiza telemetričnih krivulj</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-play-teal shrink-0" />
                    <span>Optimizacija vozniškega sloga</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-play-teal shrink-0" />
                    <span>Priprava za realno stezo in dirkanje</span>
                  </li>
                </ul>
              </div>
              <a 
                href="#povprasevanje" 
                onClick={() => setFormData(prev => ({ ...prev, programType: 'Individualni coaching z inštruktorjem Denisom Lupom' }))}
                className="mt-8 w-full py-3 rounded-2xl bg-slate-100 hover:bg-play-teal hover:text-white text-slate-900 font-display font-black text-xs uppercase tracking-wider text-center transition-all"
              >
                Izberi program
              </a>
            </motion.div>
          </div>
        </div>

        {/* INQUIRY & BOOKING FORM SECTION */}
        <div id="povprasevanje" className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 md:p-16 rounded-[3rem] bg-white border-2 border-slate-900/10 shadow-2xl relative"
          >
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">
                PRIJAVA & REZERVACIJA
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-slate-950 mt-2">
                {t('simulator_page.form_title')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 font-semibold">
                {t('simulator_page.form_subtitle')}
              </p>
            </div>

            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 border-2 border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="stroke-[3]" />
                </div>
                <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">
                  {t('simulator_page.form_success_title')}
                </h3>
                <p className="text-slate-600 font-semibold max-w-md mx-auto">
                  {t('simulator_page.form_success_desc')}
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-display font-black uppercase text-xs tracking-wider hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Novo sporočilo
                </button>
              </div>
            ) : formStatus === 'error' ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-brand-red/15 text-brand-red border-2 border-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle size={40} className="stroke-[3]" />
                </div>
                <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">Napaka pri pošiljanju</h3>
                <p className="text-slate-600 font-semibold max-w-md mx-auto mb-4">{errorMessage}</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="btn-primary py-3 px-8 shadow-md bg-brand-red border-brand-red"
                >
                  Poskusi znova
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-700">
                      {t('simulator_page.form_name')} *
                    </label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={formStatus === 'loading'}
                      placeholder="npr. Luka Novak"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-700">
                      {t('simulator_page.form_email')} *
                    </label>
                    <input 
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={formStatus === 'loading'}
                      placeholder="luka@primer.si"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-700">
                      {t('simulator_page.form_phone')}
                    </label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={formStatus === 'loading'}
                      placeholder="041 123 456"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-700">
                      {t('simulator_page.form_type')}
                    </label>
                    <select
                      value={formData.programType}
                      onChange={(e) => setFormData(prev => ({ ...prev, programType: e.target.value }))}
                      disabled={formStatus === 'loading'}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-semibold cursor-pointer"
                    >
                      <option value="Preizkus simulatorja & zabavna vožnja">{t('simulator_page.form_type_opt1')}</option>
                      <option value="Osnove varne vožnje za mlade">{t('simulator_page.form_type_opt2')}</option>
                      <option value="Sim Racing & tekmovalni trening">{t('simulator_page.form_type_opt3')}</option>
                      <option value="Individualni coaching z inštruktorjem Denisom Lupom">{t('simulator_page.form_type_opt4')}</option>
                      <option value="Skupinski obisk / Team building / Rojstni dan">{t('simulator_page.form_type_opt5')}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-display font-black uppercase text-slate-700">
                    {t('simulator_page.form_msg')}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    disabled={formStatus === 'loading'}
                    placeholder="Zanima me termin za mojega 14-letnega sina..."
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-semibold resize-none"
                  />
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <input 
                    type="checkbox" 
                    id="sim-newsletter"
                    checked={formData.subscribeToNewsletter}
                    onChange={(e) => setFormData(prev => ({ ...prev, subscribeToNewsletter: e.target.checked }))}
                    disabled={formStatus === 'loading'}
                    className="mt-0.5 w-4 h-4 rounded text-brand-red focus:ring-brand-red border-slate-300 cursor-pointer accent-brand-red shrink-0"
                  />
                  <label htmlFor="sim-newsletter" className="text-xs font-semibold text-slate-700 cursor-pointer select-none leading-snug">
                    {isSlovenian 
                      ? 'Želim prejemati novice in obvestila o novih terminih in dogodkih v Start Labu' 
                      : isIt 
                        ? 'Desidero ricevere la newsletter con le ultime novità e date dello Start Lab' 
                        : 'I want to receive updates and news about Start Lab programs'}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-4 rounded-2xl bg-brand-red hover:bg-brand-red/90 text-white font-display font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-brand-red/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Pošiljanje...</span>
                    </>
                  ) : (
                    <>
                      <span>{t('simulator_page.form_submit')}</span>
                      <ArrowRight size={18} className="stroke-[3]" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 uppercase tracking-widest text-center font-bold">
                  {t('simulator_page.form_agreement')}
                </p>
              </form>
            )}
          </motion.div>
        </div>

      </div>

      {/* Lightbox / Modal for Photo Zoom */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden border-2 border-white/20">
              <img 
                src={selectedPhoto} 
                alt="Start Lab Simulator Fotografija" 
                className="w-full h-auto max-h-[85vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
