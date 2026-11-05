import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ArrowRight,
  Info,
  Mail,
  Zap,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
  Wrench,
  Monitor,
  Glasses,
  Award,
  Building,
  Atom,
  Presentation,
  Car,
  Printer,
  CircuitBoard,
  Coffee
} from 'lucide-react';
import { LAB_EQUIPMENT } from '../constants';
import fablabSpaceImage from '../assets/images/fablab_space_1781078255061.png';
import centerTlorisImg from '../assets/images/center_tloris_1793884126169.jpg';

interface RoomConfig {
  id: number;
  key: string;
  x: number;
  y: number;
  color: string;
  ringColor: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  link?: string;
  linkLabel?: { sl: string; en: string; it: string };
}

const ROOMS: RoomConfig[] = [
  { 
    id: 1, 
    key: 'r1', 
    x: 20.0, 
    y: 32.0, 
    color: 'bg-rose-500', 
    ringColor: 'ring-rose-400',
    icon: Wrench,
    link: '/urnik-delavnic',
    linkLabel: { sl: 'Delavnice', en: 'Workshops', it: 'Laboratori' }
  },
  { 
    id: 2, 
    key: 'r2', 
    x: 72.0, 
    y: 37.0, 
    color: 'bg-emerald-500', 
    ringColor: 'ring-emerald-400',
    icon: Monitor,
    link: '/urnik-delavnic',
    linkLabel: { sl: 'Tečaji robotike', en: 'Robotics courses', it: 'Corsi robotica' }
  },
  { 
    id: 3, 
    key: 'r3', 
    x: 17.5, 
    y: 56.5, 
    color: 'bg-blue-500', 
    ringColor: 'ring-blue-400',
    icon: Glasses,
    link: '/urnik-delavnic',
    linkLabel: { sl: 'VR doživetje', en: 'VR Experience', it: 'Esperienza VR' }
  },
  { 
    id: 4, 
    key: 'r4', 
    x: 83.0, 
    y: 51.0, 
    color: 'bg-purple-500', 
    ringColor: 'ring-purple-400',
    icon: Award,
    link: '/patenti',
    linkLabel: { sl: 'Ogled patentov', en: 'View Patents', it: 'Guarda i brevetti' }
  },
  { 
    id: 5, 
    key: 'r5', 
    x: 46.5, 
    y: 45.0, 
    color: 'bg-amber-500', 
    ringColor: 'ring-amber-400',
    icon: Building,
    link: '/razvijalci-talentov',
    linkLabel: { sl: 'Partnerji & podjetja', en: 'Partners & Companies', it: 'Partner & Aziende' }
  },
  { 
    id: 6, 
    key: 'r6', 
    x: 41.0, 
    y: 79.0, 
    color: 'bg-indigo-500', 
    ringColor: 'ring-indigo-400',
    icon: Atom,
    link: '/urnik-delavnic',
    linkLabel: { sl: 'Fizikalni poizkusi', en: 'Physics lab', it: 'Esperimenti fisica' }
  },
  { 
    id: 7, 
    key: 'r7', 
    x: 58.0, 
    y: 69.0, 
    color: 'bg-orange-500', 
    ringColor: 'ring-orange-400',
    icon: Presentation,
    link: '/urnik-delavnic',
    linkLabel: { sl: 'Predavanja & dogodki', en: 'Lectures & Events', it: 'Conferenze & Eventi' }
  },
  { 
    id: 8, 
    key: 'r8', 
    x: 32.5, 
    y: 67.5, 
    color: 'bg-teal-500', 
    ringColor: 'ring-teal-400',
    icon: Car,
    link: '/simulator-voznje',
    linkLabel: { sl: 'Ogled simulatorja', en: 'View Simulator', it: 'Vedi Simulatore' }
  },
  { 
    id: 9, 
    key: 'r9', 
    x: 41.0, 
    y: 18.0, 
    color: 'bg-cyan-500', 
    ringColor: 'ring-cyan-400',
    icon: Printer,
    link: '/urnik-delavnic',
    linkLabel: { sl: 'Delavnice 3D tiska', en: '3D Print Workshops', it: 'Laboratori stampa 3D' }
  },
  { 
    id: 10, 
    key: 'r10', 
    x: 62.0, 
    y: 26.0, 
    color: 'bg-violet-500', 
    ringColor: 'ring-violet-400',
    icon: CircuitBoard,
    link: '/urnik-delavnic',
    linkLabel: { sl: 'Elektro delavnice', en: 'Electronics workshops', it: 'Laboratori elettronica' }
  },
  { 
    id: 11, 
    key: 'r11', 
    x: 66.0, 
    y: 83.0, 
    color: 'bg-fuchsia-500', 
    ringColor: 'ring-fuchsia-400',
    icon: Coffee,
    link: undefined,
    linkLabel: undefined
  },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(1);
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const [isFloorplanModalOpen, setIsFloorplanModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const isSlovenian = i18n.language === 'sl' || !['en', 'it'].includes(i18n.language);
  const isItalian = i18n.language === 'it';


  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.defaultMuted = true;
      heroVideoRef.current.muted = true;
      heroVideoRef.current.play().catch(() => {
        // Autoplay may be restricted until interaction
      });
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-28 px-4 md:px-6 min-h-screen flex items-center overflow-hidden">
        {/* Modern Background with Photography */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover grayscale opacity-20"
          />
        </div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10 w-full">
          <motion.div 
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            {/* Top Announcement Pill for Smart Home Workshop */}
            <Link 
              to="/koledar?workshop=smarthome"
              className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 mb-5 sm:mb-6 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-slate-900 border-2 border-cyan-500/30 font-display font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-sm group"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
              </span>
              <span className="text-cyan-900 font-black">
                {isSlovenian ? "⚡ NOVO • Brezplačna delavnica za otroke (10–15 let): Postani izumitelj pametnega doma! 🤖" : isItalian ? "⚡ NUOVO • Workshop gratuito (10–15 anni): Diventa l'inventore della smart home! 🤖" : "⚡ NEW • Free workshop for kids (10–15 yrs): Become a smart home inventor! 🤖"}
              </span>
              <ArrowRight size={14} className="stroke-[3] text-cyan-700 group-hover:translate-x-1 transition-transform" />
            </Link>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-black mb-6 md:mb-8 leading-[1.05] tracking-tight text-slate-950">
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
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 md:mb-8 max-w-xl leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <Link to="/delavnice" className="btn-primary shadow-lg text-center flex items-center justify-center">
                {t('hero.cta')} <ChevronRight size={22} className="stroke-[3]" />
              </Link>
              <button 
                id="home-newsletter-cta-btn"
                onClick={() => window.dispatchEvent(new CustomEvent('open-newsletter'))}
                className="btn-secondary cursor-pointer flex items-center justify-center gap-2"
              >
                {t('nav.newsletter_btn')} <Mail size={20} className="stroke-[2.5]" />
              </button>
            </div>
 
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
              <div className="bg-play-pink/10 border-2 border-play-pink/20 rounded-[1.5rem] sm:rounded-[1.8rem] p-2.5 sm:p-4 text-center transform hover:scale-105 transition-all">
                <div className="text-2xl sm:text-3xl lg:text-3.5xl font-display font-black text-play-pink shrink-0">15+</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider text-slate-500 font-extrabold font-display leading-tight">{t('hero.stats.workshops')}</div>
              </div>
              <div className="bg-play-teal/10 border-2 border-play-teal/20 rounded-[1.5rem] sm:rounded-[1.8rem] p-2.5 sm:p-4 text-center transform hover:scale-105 transition-all">
                <div className="text-2xl sm:text-3xl lg:text-3.5xl font-display font-black text-play-teal shrink-0">100%</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider text-slate-500 font-extrabold font-display leading-tight">{t('hero.stats.practical')}</div>
              </div>
              <div className="bg-play-yellow/10 border-2 border-play-yellow/20 rounded-[1.5rem] sm:rounded-[1.8rem] p-2.5 sm:p-4 text-center transform hover:scale-105 transition-all">
                <div className="text-2xl sm:text-3xl lg:text-3.5xl font-display font-black text-play-yellow shrink-0">Top</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider text-slate-500 font-extrabold font-display leading-tight">{t('hero.stats.equipment')}</div>
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
                    ref={heroVideoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="auto"
                    src="https://res.cloudinary.com/pithqpe2/video/upload/v1788247068/hf_20260505_123915_c55001c1-8db6-4d29-8c8c-65e52a4e894e_m3cfnk.mp4"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="https://res.cloudinary.com/pithqpe2/video/upload/v1788247068/hf_20260505_123915_c55001c1-8db6-4d29-8c8c-65e52a4e894e_m3cfnk.mp4" type="video/mp4" />
                  </video>
               </div>
               
               {/* Cute sticker Badge */}
               <div className="absolute bottom-[-16px] right-[4px] sm:bottom-[-24px] sm:right-[-16px] bg-play-teal text-slate-950 font-display font-black text-xs sm:text-sm uppercase px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-[0_6px_0_0_#028a67] sm:shadow-[0_8px_0_0_#028a67] border-2 border-slate-900 -rotate-3 hover:rotate-3 transition-transform duration-300">
                  ⚡ {t('why.exploration.title')}
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Workshop Banner: Pametni dom */}
      <section className="px-4 md:px-6 -mt-6 sm:-mt-8 mb-12 sm:mb-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white p-6 sm:p-8 md:p-12 border-4 border-slate-950 shadow-[0_20px_50px_rgba(6,182,212,0.15)] relative overflow-hidden"
          >
            {/* Background glowing accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2.5 flex-wrap mb-4">
                  <span className="bg-emerald-500 text-slate-950 font-display font-black text-[11px] sm:text-xs uppercase px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm animate-pulse">
                    🟢 {isSlovenian ? "Prijave odprte" : isItalian ? "Iscrizioni aperte" : "Registrations open"}
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-display font-black text-[11px] sm:text-xs uppercase px-3.5 py-1.5 rounded-full">
                    🎉 {isSlovenian ? "Popolnoma brezplačna delavnica" : isItalian ? "Completamente gratuita" : "100% Free workshop"}
                  </span>
                  <span className="bg-white/10 text-slate-300 font-display font-bold text-[11px] sm:text-xs uppercase px-3 py-1.5 rounded-full">
                    Shelly IoT
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-4 leading-tight">
                  {isSlovenian 
                    ? "Postani izumitelj pametnega doma! 🤖" 
                    : isItalian 
                      ? "Diventa l'inventore della smart home! 🤖" 
                      : "Become a smart home inventor! 🤖"}
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium leading-relaxed mb-6">
                  {isSlovenian 
                    ? "Kaj če bi tvoje luči lahko spreminjale barvo s pritiskom na gumb, se samodejno vklopile, ko vstopiš v sobo, ali se odzvale ob odprtju vrat? Vabimo te na BREZPLAČNO delavnico PAMETNI DOM za otroke od 10 do 15 let s tehnologijo Shelly v Start Labu Solkan."
                    : isItalian
                      ? "E se le tue luci potessero cambiare colore premendo un tasto, accendersi quando entri o reagire all'apertura di una porta? Ti invitiamo al workshop GRATUITO per ragazzi 10–15 anni con tecnologia Shelly."
                      : "What if your lights changed color at a button press, turned on when you walked in, or reacted when a door opened? Join our FREE smart home workshop for kids 10–15 with Shelly IoT tech."}
                </p>

                {/* Key activities grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs font-semibold text-slate-200">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <span className="text-lg">💡</span>
                    <span>{isSlovenian ? "Raziskovanje pametnih naprav" : "Exploring smart devices"}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <span className="text-lg">🎮</span>
                    <span>{isSlovenian ? "Senzorji in interaktivni izzivi" : "Sensors & interactive challenges"}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <span className="text-lg">🌈</span>
                    <span>{isSlovenian ? "Upravljanje pametnih barvnih luči" : "Controlling smart RGB lights"}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <span className="text-lg">🤖</span>
                    <span>{isSlovenian ? "Izdelava lastnih rešitev za dom" : "Building custom home solutions"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link 
                    to="/koledar?workshop=smarthome" 
                    className="px-6 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-cyan-400/20 flex items-center gap-2"
                  >
                    <span>{isSlovenian ? "Prijavi se na delavnico" : isItalian ? "Iscriviti al workshop" : "Register for workshop"}</span>
                    <ArrowRight size={16} className="stroke-[3]" />
                  </Link>
                  <a 
                    href="mailto:info@startlab.si" 
                    className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all border border-white/15 flex items-center gap-2"
                  >
                    <Mail size={16} />
                    <span>info@startlab.si</span>
                  </a>
                </div>
              </div>

              {/* Right column: Image & Schedule Card */}
              <div className="lg:col-span-5 space-y-4">
                {/* Official Cover Image */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl group aspect-[16/10] bg-slate-950">
                  <img
                    src="https://ik.imagekit.io/utigodgni/Pametni%20dom.png"
                    alt="Postani izumitelj pametnega doma"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 px-3 py-1.5 rounded-xl font-display font-black text-[10px] uppercase shadow-md flex items-center gap-1.5">
                    <span>🤖</span>
                    <span>Shelly IoT</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-emerald-500 text-slate-950 px-3 py-1 rounded-xl font-display font-black text-[10px] uppercase shadow-lg">
                    {isSlovenian ? "Brezplačno • 10–15 let" : isItalian ? "Gratuito • 10–15 anni" : "Free • Ages 10–15"}
                  </div>
                </div>

                <div className="bg-slate-900/90 border-2 border-cyan-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-cyan-400" />
                      <span className="font-display font-black uppercase text-xs tracking-wider text-slate-200">
                        {isSlovenian ? "Datumi srečanj (4 x 2 uri)" : "Session Dates (4 x 2 hrs)"}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                      16:30 – 18:30
                    </span>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 font-display font-black text-xs flex items-center justify-center">1</span>
                        <span className="text-slate-100 font-bold">{isSlovenian ? "Torek, 10. 11. 2026" : "Tuesday, Nov 10, 2026"}</span>
                      </div>
                      <span className="text-cyan-300 font-semibold text-[11px]">16:30</span>
                    </div>

                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 font-display font-black text-xs flex items-center justify-center">2</span>
                        <span className="text-slate-100 font-bold">{isSlovenian ? "Sreda, 18. 11. 2026" : "Wednesday, Nov 18, 2026"}</span>
                      </div>
                      <span className="text-cyan-300 font-semibold text-[11px]">16:30</span>
                    </div>

                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 font-display font-black text-xs flex items-center justify-center">3</span>
                        <span className="text-slate-100 font-bold">{isSlovenian ? "Torek, 24. 11. 2026" : "Tuesday, Nov 24, 2026"}</span>
                      </div>
                      <span className="text-cyan-300 font-semibold text-[11px]">16:30</span>
                    </div>

                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 font-display font-black text-xs flex items-center justify-center">4</span>
                        <span className="text-slate-100 font-bold">{isSlovenian ? "Torek, 1. 12. 2026" : "Tuesday, Dec 1, 2026"}</span>
                      </div>
                      <span className="text-cyan-300 font-semibold text-[11px]">16:30</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin size={13} className="text-cyan-400" /> Start Lab Solkan
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {isSlovenian ? "Brez predznanja • 10–15 let" : "No prerequisites • 10–15 yrs"}
                    </span>
                  </div>
                </div>
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
            className="play-card p-6 sm:p-8 md:p-12 bg-white relative overflow-hidden group border-2 border-slate-100"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-play-blue/10 rounded-bl-[4rem] flex items-center justify-center text-play-blue group-hover:scale-110 transition-transform">
              <Boxes size={40} className="mr-[-10px] mt-[-10px]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black mb-4 sm:mb-6 text-play-blue uppercase tracking-tight">{t('mission.title')}</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              {t('mission.text')}
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="play-card p-6 sm:p-8 md:p-12 bg-white relative overflow-hidden group border-2 border-slate-100"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-play-pink/10 rounded-bl-[4rem] flex items-center justify-center text-play-pink group-hover:scale-110 transition-transform">
              <Rocket size={40} className="mr-[-10px] mt-[-10px]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black mb-4 sm:mb-6 text-play-pink uppercase tracking-tight">{t('vision.title')}</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-medium">
              {t('vision.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Start Lab? Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 md:gap-16 items-center mb-20">
            <div className="lg:col-span-7">
              <div className="inline-block bg-play-pink/15 text-play-pink font-display font-extrabold text-xs uppercase px-4 py-2 rounded-full mb-6">
                Problem & Rešitev
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black tracking-tight mb-6 md:mb-8 leading-[1.05] text-slate-950">
                {t('why.title_start')} <span className="text-brand-red inline-block">{t('why.title_brand')}</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-semibold mb-8 md:mb-10">
                {t('why.subtitle_rest').split(',').map((part, index) => (
                  index === 0 ? (
                    <span key={index}>{part} <span className="text-brand-red font-black underline decoration-play-yellow decoration-4 underline-offset-4">{t('why.subtitle_highlight')}</span> </span>
                  ) : <span key={index}>{part}</span>
                ))}
              </p>
              
              <div className="space-y-6 md:space-y-8">
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-play-teal/15 border-2 border-play-teal/30 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_0_0_#0d948830]">
                    <Boxes className="text-play-teal" size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold uppercase mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg text-slate-900">{t('why.exploration.title')}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{t('why.exploration.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-play-purple/15 border-2 border-play-purple/30 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_0_0_#7c3aed30]">
                    <Cpu className="text-play-purple" size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold uppercase mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg text-slate-900">{t('why.industry.title')}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{t('why.industry.desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-4 lg:mt-0 lg:col-span-5">
              <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-slate-100 p-2 sm:p-3 border-2 border-slate-900/10 shadow-[0_24px_50px_rgba(15,23,42,0.08)]">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80" 
                  alt="Students Working" 
                  className="w-full h-full object-cover rounded-[1.8rem] sm:rounded-[2rem] aspect-square"
                />
              </div>
              <div className="absolute top-4 right-2 sm:-top-4 sm:-right-2 md:-top-6 md:-right-6 bg-white border-2 border-slate-950 p-4 sm:p-5 rounded-2xl shadow-[0_6px_0_0_rgba(15,23,42,1)] sm:shadow-[0_8px_0_0_rgba(15,23,42,1)] animate-float font-display">
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-red mb-1">Hands-on</div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 font-extrabold">100% PRAKSA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-slate-950 mb-4">{t('goals.title')}</h2>
            <div className="w-24 h-2 bg-play-teal mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { goal: t('goals.goal1', { returnObjects: true }) as any, colorClass: "bg-play-pink/5 border-play-pink/25 text-play-pink shadow-[0_8px_0_0_#e11d4810] sm:shadow-[0_10px_0_0_#e11d4815] hover:bg-play-pink/10" },
              { goal: t('goals.goal2', { returnObjects: true }) as any, colorClass: "bg-play-yellow/5 border-play-yellow/25 text-play-yellow shadow-[0_8px_0_0_#f59e0b10] sm:shadow-[0_10px_0_0_#f59e0b15] hover:bg-play-yellow/10" },
              { goal: t('goals.goal3', { returnObjects: true }) as any, colorClass: "bg-play-teal/5 border-play-teal/25 text-play-teal shadow-[0_8px_0_0_#0d948810] sm:shadow-[0_10px_0_0_#0d948815] hover:bg-play-teal/10" },
              { goal: t('goals.goal4', { returnObjects: true }) as any, colorClass: "bg-play-blue/5 border-play-blue/25 text-play-blue shadow-[0_8px_0_0_#2563eb10] sm:shadow-[0_10px_0_0_#2563eb15] hover:bg-play-blue/10" },
              { goal: t('goals.goal5', { returnObjects: true }) as any, colorClass: "bg-play-purple/5 border-play-purple/25 text-play-purple shadow-[0_8px_0_0_#7c3aed10] sm:shadow-[0_10px_0_0_#7c3aed15] hover:bg-play-purple/10" }
            ].map((item, i) => (
              <motion.div 
                whileHover={{ y: -6 }}
                key={i} 
                className={`border-2 rounded-[1.8rem] sm:rounded-[2rem] p-5 sm:p-8 text-center bg-white transition-all ${item.colorClass}`}
              >
                <div className="font-display font-black text-3xl sm:text-4xl mb-3 sm:mb-4 text-slate-900 leading-none">0{i+1}</div>
                <h3 className="font-display font-black uppercase text-xs sm:text-sm tracking-wider mb-2.5 sm:mb-4 leading-snug">{item.goal.t}</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-semibold">{item.goal.d}</p>
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
            <div className="lg:col-span-6">
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase mb-4 text-slate-950 leading-tight">
                {t('equipment.title')}
              </h2>
              <p className="text-base text-slate-600 mb-8 font-semibold leading-relaxed">
                {t('equipment.intro')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ROOMS.map((room) => {
                  const isSelected = selectedRoom === room.id;
                  const IconComp = room.icon;
                  return (
                    <motion.button 
                      key={room.id}
                      type="button"
                      onClick={() => setSelectedRoom(room.id)}
                      onMouseEnter={() => setHoveredRoom(room.id)}
                      onMouseLeave={() => setHoveredRoom(null)}
                      whileHover={{ x: 4, scale: 1.01 }}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer w-full focus:outline-none ${
                        isSelected 
                          ? `bg-slate-900 border-slate-900 text-white shadow-lg ring-2 ring-slate-900/20` 
                          : `border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 text-slate-800 hover:shadow-sm`
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-display font-black text-xs transition-transform duration-300 ${
                        isSelected ? `${room.color} text-white scale-110 shadow-sm` : 'bg-slate-200 text-slate-700'
                      }`}>
                        {room.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                          <span className={`text-xs sm:text-sm font-bold truncate leading-tight transition-colors duration-200 ${
                            isSelected ? 'text-white' : 'text-slate-900'
                          }`}>
                            {t(`equipment.rooms.${room.key}`)}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              
              <div className="p-5 bg-brand-red/5 border-l-4 border-brand-red rounded-r-2xl text-sm text-slate-700 font-bold leading-relaxed shadow-sm">
                {t('equipment.outro')}
              </div>
            </div>
            
            <div className="lg:col-span-6 w-full flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-[2.5rem] overflow-hidden border-4 border-slate-950 shadow-[8px_8px_0_0_rgba(15,23,42,0.9)] bg-white flex flex-col"
              >
                {/* Interactive Map Header Badge & Controls */}
                <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden select-none group/plan">
                  {/* High-Resolution 3D Isometric Center Floor Plan */}
                  <img 
                    src={centerTlorisImg} 
                    alt="Interaktivni 3D tloris Centra znanosti in tehnologije" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/plan:scale-[1.02]"
                  />

                  {/* Blueprint Ambient Grid Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                      backgroundSize: '24px 24px'
                    }}
                  />

                  {/* Top Bar Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-wider shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold">350 m² START LAB</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFloorplanModalOpen(true)}
                      className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 hover:bg-slate-900 text-white text-[11px] font-bold border border-white/20 backdrop-blur-md shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      title={t('equipment.rooms.fullscreen')}
                    >
                      <Maximize2 size={13} className="text-[#53B8FF]" />
                      <span className="hidden sm:inline">{t('equipment.rooms.fullscreen')}</span>
                    </button>
                  </div>
                  
                  {/* Interactive Hotspots Overlay */}
                  <div className="absolute inset-0 z-10">
                    {ROOMS.map((room) => {
                      const isActive = selectedRoom === room.id;
                      const isHovered = hoveredRoom === room.id;
                      const roomName = t(`equipment.rooms.${room.key}`);

                      return (
                        <div
                          key={room.id}
                          style={{ left: `${room.x}%`, top: `${room.y}%` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedRoom(room.id)}
                            onMouseEnter={() => setHoveredRoom(room.id)}
                            onMouseLeave={() => setHoveredRoom(null)}
                            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 group focus:outline-none cursor-pointer"
                            title={roomName}
                          >
                            {/* Inner pulse effect when active or hovered */}
                            {(isActive || isHovered) && (
                              <span className={`absolute inset-0 rounded-full animate-ping opacity-80 ${room.color} duration-1000`} />
                            )}
                            
                            {/* Ring Border & Solid Dot */}
                            <span className={`absolute inset-0 rounded-full border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center justify-center ${
                              isActive 
                                ? `${room.color} scale-125 ring-4 ring-white/50 z-30` 
                                : isHovered
                                  ? `${room.color} scale-110 shadow-lg`
                                  : 'bg-slate-950/85 hover:scale-110'
                            }`}>
                              <span className="text-[11px] font-black font-mono text-white leading-none">
                                {room.id}
                              </span>
                            </span>
                          </button>

                          {/* Hover Tooltip */}
                          <AnimatePresence>
                            {(isHovered || isActive) && (
                              <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 4, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none whitespace-nowrap z-40 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-xl border ${
                                  isActive 
                                    ? 'bg-slate-950 text-white border-white/20' 
                                    : 'bg-slate-900/95 text-slate-100 border-white/10'
                                }`}
                              >
                                <span className={`w-2 h-2 rounded-full ${room.color}`} />
                                <span>{roomName}</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Hint overlay at bottom */}
                  <div className="absolute bottom-2 left-3 text-[10px] text-white/80 font-mono bg-slate-950/60 backdrop-blur-sm px-2.5 py-1 rounded-md pointer-events-none">
                    {t('equipment.rooms.interactive_hint')}
                  </div>
                </div>

                {/* Selected Room Metadata Panel */}
                {(() => {
                  const activeRoom = ROOMS.find(r => r.id === selectedRoom) || ROOMS[0];
                  const ActiveIcon = activeRoom.icon;
                  const currentLang = (i18n.language === 'en' ? 'en' : i18n.language === 'it' ? 'it' : 'sl') as 'sl' | 'en' | 'it';
                  const actionLabel = activeRoom.linkLabel ? activeRoom.linkLabel[currentLang] : null;

                  return (
                    <div className="p-6 bg-slate-950 text-white border-t-2 border-slate-900 flex flex-col gap-4 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-display font-black text-white shrink-0 shadow-lg transition-colors duration-300 ${activeRoom.color}`}>
                            <ActiveIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#53B8FF]">
                                {t('equipment.rooms.selected_room_title')} {activeRoom.id}
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                              <span className="text-[10px] font-mono text-slate-400">START LAB 350 m²</span>
                            </div>
                            <h4 className="text-base sm:text-lg font-display font-black uppercase text-white leading-tight mt-0.5">
                              {t(`equipment.rooms.${activeRoom.key}`)}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2 font-medium">
                              {t(`equipment.rooms.${activeRoom.key}_desc`)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                          {activeRoom.link && actionLabel && (
                            <Link
                              to={activeRoom.link}
                              className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red/90 text-white text-xs font-display font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-brand-red/20 active:scale-95"
                            >
                              <span>{actionLabel}</span>
                              <ArrowRight size={14} className="stroke-[3]" />
                            </Link>
                          )}
                          <button
                            type="button"
                            onClick={() => setIsFloorplanModalOpen(true)}
                            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                            title={t('equipment.rooms.fullscreen')}
                          >
                            <Maximize2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Fullscreen Interactive Floor Plan Modal */}
        <AnimatePresence>
          {isFloorplanModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-4 sm:p-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-black uppercase">
                      {t('equipment.title')} – 350 m² Tloris
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {t('equipment.rooms.explore_map')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center bg-white/10 rounded-xl p-1 gap-1">
                    <button
                      type="button"
                      onClick={() => setModalZoom(z => Math.max(1, z - 0.25))}
                      className="p-2 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title={t('equipment.rooms.zoom_out')}
                    >
                      <ZoomOut size={16} />
                    </button>
                    <span className="text-xs font-mono px-2 text-slate-300">
                      {Math.round(modalZoom * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setModalZoom(z => Math.min(2, z + 0.25))}
                      className="p-2 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title={t('equipment.rooms.zoom_in')}
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsFloorplanModalOpen(false);
                      setModalZoom(1);
                    }}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title={t('equipment.rooms.close')}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body / Pan & Zoom Viewport */}
              <div className="flex-1 relative overflow-auto my-4 flex items-center justify-center rounded-2xl bg-slate-900 border border-white/10">
                <div 
                  className="relative transition-transform duration-200 origin-center max-w-5xl w-full aspect-[4/3]"
                  style={{ transform: `scale(${modalZoom})` }}
                >
                  <img 
                    src={centerTlorisImg} 
                    alt="Center znanosti in tehnologije" 
                    className="w-full h-full object-cover rounded-xl"
                  />

                  {/* Hotspots in Modal */}
                  <div className="absolute inset-0">
                    {ROOMS.map((room) => {
                      const isActive = selectedRoom === room.id;
                      const roomName = t(`equipment.rooms.${room.key}`);

                      return (
                        <button
                          key={room.id}
                          type="button"
                          onClick={() => setSelectedRoom(room.id)}
                          style={{ left: `${room.x}%`, top: `${room.y}%` }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 z-30 group cursor-pointer ${
                            isActive ? `${room.color} scale-125 ring-4 ring-white` : 'bg-slate-950/85 hover:scale-110'
                          } border-2 border-white shadow-2xl`}
                          title={roomName}
                        >
                          <span className="text-xs sm:text-sm font-black font-mono text-white">
                            {room.id}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Modal Footer Room Selector Ribbon */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {ROOMS.map((room) => {
                  const isSelected = selectedRoom === room.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setSelectedRoom(room.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                        isSelected 
                          ? `${room.color} text-white shadow-md scale-105` 
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-md bg-black/20 flex items-center justify-center font-mono text-[10px]">
                        {room.id}
                      </span>
                      <span>{t(`equipment.rooms.${room.key}`)}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
