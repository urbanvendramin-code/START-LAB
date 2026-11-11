import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Award, 
  Calendar, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  ExternalLink, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Clock, 
  MapPin, 
  Layers, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  X, 
  Info,
  Sliders,
  Activity,
  CreditCard,
  Flame,
  Radio,
  BookOpen,
  Eye
} from 'lucide-react';

import heroImg from '../assets/images/tase_lazovski_hero_1791534632699.jpg';
const vitaImg = 'https://ik.imagekit.io/utigodgni/INJEKCIJSKA%20IGLA%20VITA.1png.png?updatedAt=1793864287793';
const parkingImg = 'https://ik.imagekit.io/utigodgni/PARKIRNI%20AVTOMAT.png?updatedAt=1793864318348';
const cardImg = 'https://ik.imagekit.io/utigodgni/Untitled-1.png';
const cardImg2 = 'https://ik.imagekit.io/utigodgni/TELEFONSKA%20%C4%8CIP%20KARTICA.png';
import gasTimerImg from '../assets/images/gas_stove_timer_1791534741337.jpg';
import InventorAnimatedBackground from '../components/InventorAnimatedBackground';

import {
  type Lang,
  type Milestone,
  type PatentRecord,
  getGalleryItems,
  getTimelineEvents,
  getPatentRegistry,
  getAdditionalInventions,
  getExplainerData,
  getVideoArchives,
  getPatentsUI
} from '../data/patentsTranslations';



export default function PatentsPage() {
    const { t, i18n } = useTranslation();
  const currentLang: Lang = i18n.language === 'it' ? 'it' : i18n.language === 'en' ? 'en' : 'sl';
  const isSlovenian = currentLang === 'sl';
  const isIt = currentLang === 'it';
  const ui = getPatentsUI(currentLang);
  const galleryItems = getGalleryItems(currentLang);
  const timelineEvents = getTimelineEvents(currentLang);
  const patentRegistry = getPatentRegistry(currentLang);
  const additionalInventionsData = getAdditionalInventions(currentLang);
  const explainerData = getExplainerData(currentLang);
  const videoArchivesData = getVideoArchives(currentLang);

  const additionalInventions = [
    { ...additionalInventionsData[0], icon: Layers },
    { ...additionalInventionsData[1], icon: Activity },
    { ...additionalInventionsData[2], icon: Radio },
    { ...additionalInventionsData[3], icon: Compass },
  ];

  const videoArchives = [
    { ...videoArchivesData[0], image: vitaImg, videoUrl: 'https://ik.imagekit.io/utigodgni/Igla%20VITA1.mp4' },
    { ...videoArchivesData[1], image: parkingImg, videoUrl: 'https://ik.imagekit.io/utigodgni/PARKIRNI%20AVTOMAT.png' },
    { ...videoArchivesData[2], image: heroImg, videoUrl: 'https://ik.imagekit.io/utigodgni/IMG_3769.png' },
  ];

  // State for interactive features
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(0);
  const [selectedPatent, setSelectedPatent] = useState<PatentRecord | null>(null);
  const [activeExplainerTab, setActiveExplainerTab] = useState<'vita' | 'parking' | 'card' | 'gas'>('vita');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<Record<string, boolean>>({});
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [vitaViewMode, setVitaViewMode] = useState<'video' | 'drawing'>('video');
  const [parkingViewMode, setParkingViewMode] = useState<'video' | 'photo'>('video');
  const [activeGasImgIdx, setActiveGasImgIdx] = useState<number>(0);

  // Image gallery states
  const [activeVitaImgIdx, setActiveVitaImgIdx] = useState<number>(0);
  const [enlargedVitaImg, setEnlargedVitaImg] = useState<string | null>(null);
  const [activeCardImgIdx, setActiveCardImgIdx] = useState<number>(0);

  const timelineMilestones = timelineEvents;

  const cardImages = [
    {
      url: cardImg,
      title: galleryItems.chipCard[0].title,
      subtitle: galleryItems.chipCard[0].subtitle,
    },
    {
      url: cardImg2,
      title: galleryItems.chipCard[1].title,
      subtitle: galleryItems.chipCard[1].subtitle,
    }
  ];

  const vitaImages = [
    {
      url: vitaImg,
      title: galleryItems.vita[0].title,
      subtitle: galleryItems.vita[0].subtitle,
    },
    {
      url: heroImg,
      title: galleryItems.vita[1].title,
      subtitle: galleryItems.vita[1].subtitle,
    }
  ];

  const gasTimerImages = [
    {
      url: gasTimerImg,
      title: galleryItems.gas[0].title,
      subtitle: galleryItems.gas[0].subtitle,
    },
    {
      url: heroImg,
      title: galleryItems.gas[1].title,
      subtitle: galleryItems.gas[1].subtitle,
    },
    {
      url: parkingImg,
      title: galleryItems.gas[2].title,
      subtitle: galleryItems.gas[2].subtitle,
    }
  ];

  const [enlargedGasImg, setEnlargedGasImg] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'med' | 'urban' | 'recent'>('all');
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'features' | 'team' | 'docs'>('overview');
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  return (
    <div className="bg-[#080B10] text-[#F0EDE5] min-h-screen selection:bg-[#53B8FF]/30 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* Technical Animated Inventor Background */}
      <InventorAnimatedBackground />


      {/* ========================================================================= */}
      {/* SECTION A: CINEMATIC HERO */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden z-10">
        {/* Ambient atmospheric light sweep */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[450px] bg-[#53B8FF]/10 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* Museum Exhibit Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#53B8FF]/30 bg-[#151B24]/80 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase">
                {isSlovenian ? 'START LAB · ZAPUŠČINA INOVACIJ' : isIt ? 'START LAB · EREDITÀ DI INNOVAZIONI' : 'START LAB · INNOVATION LEGACY'}
              </span>
            </div>

            {/* Main Headline & Inventor Profile Portal */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pt-2">
              
              {/* Creative Animated Profile Portal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative shrink-0 group"
              >
                {/* Floating physics wrapper */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById('zgodba');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  title={isSlovenian ? "Tase Lazovski – Klikni za ogled zgodbe" : isIt ? "Tase Lazovski – Clicca per vedere la storia" : "Tase Lazovski – Click to view story"}
                >
                  {/* Ambient Electric-Blue Aura */}
                  <div className="absolute -inset-3 bg-[#53B8FF]/25 rounded-3xl blur-2xl group-hover:bg-[#53B8FF]/45 transition-all duration-700 pointer-events-none" />

                  {/* Outer Technical Frame Ticks */}
                  <div className="absolute -inset-2 rounded-3xl border border-dashed border-[#53B8FF]/30 pointer-events-none" />

                  {/* High-tech Corner Coordinate Accents */}
                  <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#53B8FF] z-20 pointer-events-none" />
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#53B8FF] z-20 pointer-events-none" />
                  <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#53B8FF] z-20 pointer-events-none" />
                  <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#53B8FF] z-20 pointer-events-none" />

                  {/* Square Portrait Frame (Uncropped) */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 xl:w-48 xl:h-48 aspect-square rounded-2xl overflow-hidden border-2 border-[#53B8FF]/80 bg-[#0E131C] relative shadow-[0_0_35px_rgba(83,184,255,0.35)] group-hover:shadow-[0_0_55px_rgba(83,184,255,0.6)] group-hover:border-[#53B8FF] transition-all duration-500 flex items-center justify-center p-1.5">
                    <img 
                      src="https://ik.imagekit.io/utigodgni/IMG_3769.png" 
                      alt={isSlovenian ? "Tase Lazovski - Inovator in izumitelj" : isIt ? "Tase Lazovski - Innovatore e inventore" : "Tase Lazovski - Innovator and inventor"} 
                      className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                    />

                    {/* Animated Holographic Scanline Overlay */}
                    <motion.div 
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#53B8FF]/20 to-transparent pointer-events-none"
                    />

                    {/* Subtle Glass Vignette */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                  </div>

                  {/* Micro Inventor Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <div className="px-3 py-1 rounded-full bg-[#080B10]/95 border border-[#53B8FF]/70 text-[#53B8FF] text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest shadow-xl flex items-center gap-1.5 backdrop-blur-md group-hover:bg-[#53B8FF] group-hover:text-[#080B10] transition-colors duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#53B8FF] group-hover:bg-[#080B10] animate-ping" />
                      <span>{ui.hero.role}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Title & Subtitle */}
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.2rem] font-display font-black tracking-tight uppercase leading-[0.96] text-[#F0EDE5]"
                >
                  <span className="inline-flex items-center gap-3 sm:gap-4 flex-wrap">
                    <span>TASE</span>
                    <span 
                      className="text-xs sm:text-base md:text-lg lg:text-xl font-mono font-bold text-[#53B8FF] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-xl bg-[#151B24]/90 border border-[#53B8FF]/40 shadow-sm align-middle normal-case"
                      title={isSlovenian ? "Letnica rojstva: 1949" : isIt ? "Anno di nascita: 1949" : "Year of birth: 1949"}
                    >
                      * 1949
                    </span>
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#53B8FF] via-[#A8DCFF] to-white">
                    LAZOVSKI
                  </span>
                </motion.h1>

                {/* Theme Subtitle */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-[#53B8FF] tracking-wide mt-3 sm:mt-4 italic"
                >
                  {ui.hero.slogan}
                </motion.p>
              </div>
            </div>

            {/* Editorial Overview */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl border-l-2 border-[#53B8FF]/40 pl-5"
            >
              {ui.hero.overview}
            </motion.p>

            {/* Hero Quick Metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              <div className="p-3 rounded-2xl bg-[#151B24]/90 border border-slate-800">
                <div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">{ui.hero.metrics.patentUs}</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">US5051109A</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#151B24]/90 border border-slate-800">
                <div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">{ui.hero.metrics.brussels}</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">EUREKA Medaille</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#151B24]/90 border border-slate-800">
                <div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">{ui.hero.metrics.cardsDate}</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">{ui.hero.metrics.cards}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#151B24]/90 border border-slate-800">
                <div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">{ui.hero.metrics.parkingDate}</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">{ui.hero.metrics.parking}</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a 
                href="#izumi"
                className="px-8 py-4 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(83,184,255,0.4)] flex items-center gap-3 cursor-pointer group"
              >
                <span>{ui.hero.ctaExplore}</span>
                <ChevronRight size={18} className="stroke-[3] group-hover:translate-x-1 transition-transform" />
              </a>

              <a 
                href="#casovnica"
                className="px-6 py-4 rounded-xl bg-[#151B24] hover:bg-slate-800 text-[#F0EDE5] border border-slate-700/80 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Clock size={16} className="text-[#53B8FF]" />
                <span>{ui.hero.ctaTimeline}</span>
              </a>

              <a 
                href="#patenti"
                className="px-6 py-4 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-slate-800 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FileText size={16} className="text-[#53B8FF]" />
                <span>{ui.hero.ctaRegistry}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual: Cinematic Archive Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[2.2rem] overflow-hidden border-2 border-slate-800/80 bg-[#151B24] shadow-[0_25px_60px_rgba(0,0,0,0.8)] group">
              
              {/* Image Frame */}
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden">
                <img 
                  src={heroImg} 
                  alt={isSlovenian ? "Arhiv izumov Taseta Lazovskega" : isIt ? "Archivio delle invenzioni di Tase Lazovski" : "Invention archive of Tase Lazovski"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Soft gradient mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080B10]/40 via-transparent to-transparent" />
              </div>

              {/* Museum placard overlay */}
              <div className="p-5 sm:p-6 bg-[#0E131C]/95 border-t border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#53B8FF] uppercase">
                    {ui.hero.placardRef}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {ui.hero.placardRegion}
                  </span>
                </div>
                <h3 className="font-display font-black text-sm sm:text-base uppercase text-white tracking-wide">
                  {ui.hero.placardTitle}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {ui.hero.placardDesc}
                </p>
              </div>

              {/* Corner badge */}
              <div className="absolute top-4 right-4 bg-[#080B10]/80 backdrop-blur-md border border-[#53B8FF]/40 text-[#53B8FF] px-3 py-1.5 rounded-xl font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 shadow-lg">
                <Sparkles size={12} />
                <span>{ui.hero.placardBadge}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: THE STORY / BIOGRAPHICAL DOCUMENTARY */}
      {/* ========================================================================= */}
      <section id="zgodba" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#0A0E15] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
              {ui.story.tag}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-tight leading-[1.05]">
              {ui.story.titlePart1} <br />
              <span className="text-[#53B8FF]">{ui.story.titlePart2}</span>
            </h2>
            <div className="w-20 h-1 bg-[#53B8FF] mt-6 rounded-full" />
          </div>

          {/* Editorial 2-column layout */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              <p className="text-xl sm:text-2xl font-serif italic text-white/95 leading-snug border-l-4 border-[#53B8FF] pl-6 py-1">
                {ui.story.quote}
              </p>

              <p>
                {ui.story.p1}
              </p>

              <p>
                {ui.story.p2}
              </p>

              <p>
                {ui.story.p3}
              </p>

              <p className="text-slate-400 italic text-sm">
                {ui.story.p4}
              </p>
            </div>

            {/* Archival exhibit box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#151B24] border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#53B8FF]/10 text-[#53B8FF] flex items-center justify-center">
                    <Award size={22} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm uppercase text-white">{ui.story.awardsBoxTitle}</h4>
                    <p className="text-xs text-slate-400">{ui.story.awardsBoxSub}</p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#53B8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{isSlovenian ? "USPTO (ZDA):" : isIt ? "USPTO (USA):" : "USPTO (USA):"}</strong> {ui.story.awardsUspto}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#53B8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{isSlovenian ? "EUREKA Bruselj 1993:" : isIt ? "EUREKA Bruxelles 1993:" : "EUREKA Brussels 1993:"}</strong> {ui.story.awardsEureka}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#53B8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{isSlovenian ? "Iskra Terminali & Impulz:" : isIt ? "Iskra Terminali & Impulz:" : "Iskra Terminali & Impulz:"}</strong> {ui.story.awardsIskra}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#53B8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{isSlovenian ? "Mestna občina Nova Gorica:" : isIt ? "Comune di Nova Gorica:" : "Municipality of Nova Gorica:"}</strong> {ui.story.awardsNg}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#53B8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{isSlovenian ? "Sodelovanje z Emilom Benkom:" : isIt ? "Collaborazione con Emil Benko:" : "Collaboration with Emil Benko:"}</strong> {ui.story.awardsAtemm}
                    </div>
                  </li>
                </ul>

                <div className="p-4 rounded-2xl bg-[#080B10] border border-slate-800 text-xs text-slate-400 font-mono">
                  {isSlovenian ? 'Opomba arhiva: Prikazani so izključno preverjeni zgodovinski podatki iz izvirne patentne in tehnične dokumentacije.' : isIt ? 'Nota d\'archivio: Vengono mostrati esclusivamente dati storici verificati tratti dalla documentazione tecnica e brevettuale originale.' : 'Archival note: Displaying exclusively verified historical records from original patent and engineering filings.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: INTERACTIVE TIMELINE */}
      {/* ========================================================================= */}
      <section id="casovnica" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#080B10] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
                {ui.timeline.tag}
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                {ui.timeline.title}
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md font-normal">
              {ui.timeline.desc}
            </p>
          </div>

          {/* Interactive Horizontal / Responsive Timeline */}
          <div className="space-y-6">
            
            {/* Timeline Progress Track for Desktop */}
            <div className="hidden md:block relative px-4">
              <div className="h-1 bg-slate-800 rounded-full w-full relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#53B8FF] to-[#A8DCFF] rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(83,184,255,0.6)]"
                  style={{ width: `${((activeTimelineIdx + 1) / timelineMilestones.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Timeline Milestones Grid: Fully visible on all screen sizes, no horizontal scroll or cutoffs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3 w-full">
              {timelineMilestones.map((m, idx) => {
                const isActive = activeTimelineIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTimelineIdx(idx)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between gap-2.5 relative group ${
                      isActive
                        ? 'bg-[#151B24] border-[#53B8FF] shadow-[0_0_25px_rgba(83,184,255,0.25)] text-white scale-[1.02] z-10'
                        : 'bg-[#0E131C] border-slate-800 hover:border-slate-700 hover:bg-[#121822] text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono font-bold text-sm sm:text-base text-[#53B8FF] tracking-tight">{m.year}</span>
                      <span className={`w-2.5 h-2.5 rounded-full transition-all ${isActive ? 'bg-[#53B8FF] ring-4 ring-[#53B8FF]/20' : 'bg-slate-700 group-hover:bg-slate-500'}`} />
                    </div>
                    <span className="font-display font-bold text-xs uppercase leading-snug text-white line-clamp-2">
                      {m.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Spotlight Card */}
            {(() => {
              const current = timelineMilestones[activeTimelineIdx];
              return (
                <motion.div 
                  key={activeTimelineIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 sm:p-10 rounded-3xl bg-[#151B24] border-2 border-[#53B8FF]/40 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#53B8FF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                  
                  <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                    <div className="md:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3.5 py-1 rounded-full bg-[#53B8FF]/20 text-[#53B8FF] border border-[#53B8FF]/40 font-mono text-xs font-bold">
                          {current.exactDate}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 font-mono text-xs">
                          {current.tag}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-display font-black uppercase text-white leading-tight">
                        {current.title}
                      </h3>

                      <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                        {current.desc}
                      </p>

                      <div className="pt-2">
                        <a
                          href={`#${current.anchorId}`}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-[#53B8FF] hover:text-white uppercase tracking-wider group"
                        >
                          <span>{ui.timeline.jumpBtn}</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                        </a>
                      </div>
                    </div>

                    <div className="md:col-span-4 flex justify-center md:justify-end">
                      <div className="w-36 h-36 rounded-full border-4 border-[#53B8FF]/30 flex flex-col items-center justify-center bg-[#080B10] shadow-[0_0_40px_rgba(83,184,255,0.2)]">
                        <span className="text-xs font-mono text-[#53B8FF] uppercase">{isSlovenian ? 'LETO' : isIt ? 'ANNO' : 'YEAR'}</span>
                        <span className="text-3xl font-display font-black text-white">{current.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: FEATURED INVENTIONS (4 DISTINCT FEATURES) */}
      {/* ========================================================================= */}
      <section id="izumi" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#0A0E15] relative z-10 space-y-32">
        <div className="max-w-7xl mx-auto">

          {/* Section Introduction */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
              {ui.featured.tag}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-tight">
              {ui.featured.title}
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed font-normal">
              {ui.featured.desc}
            </p>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 1. INJEKCIJSKA IGLA VITA */}
          {/* --------------------------------------------------------------------- */}
          <div id="izum-vita" className="scroll-mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Visual & Video Column */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-[#53B8FF]/40 bg-[#151B24] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                
                {/* Header Switcher: Video / Drawing */}
                <div className="p-3 bg-[#0E131C] border-b border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-[#151B24] p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setVitaViewMode('video')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                        vitaViewMode === 'video'
                          ? 'bg-[#53B8FF] text-[#080B10] shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Play size={13} className={vitaViewMode === 'video' ? 'fill-[#080B10]' : ''} />
                      <span>{isSlovenian ? 'Video posnetek' : isIt ? 'Filmato video' : 'Video Footage'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVitaViewMode('drawing')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                        vitaViewMode === 'drawing'
                          ? 'bg-[#53B8FF] text-[#080B10] shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <FileText size={13} />
                      <span>{isSlovenian ? 'Patentne skice' : isIt ? 'Bozzetti brevettuali' : 'Patent Drawings'} ({vitaImages.length})</span>
                    </button>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold">
                    <Award size={13} />
                    <span>EUREKA 1993</span>
                  </span>
                </div>

                {/* Media Container */}
                <div className="relative aspect-video sm:aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
                  {vitaViewMode === 'video' ? (
                    <video 
                      src="https://ik.imagekit.io/utigodgni/Igla%20VITA1.mp4"
                      poster={vitaImg}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain bg-black"
                    >
                      {isSlovenian ? "Vaš brskalnik ne podpira predvajanja videa." : isIt ? "Il tuo browser non supporta la riproduzione video." : "Your browser does not support the video tag."}
                    </video>
                  ) : (
                    <div className="relative w-full h-full bg-[#0A0E15] flex items-center justify-center p-3 sm:p-5 group/draw">
                      <img 
                        src={vitaImages[activeVitaImgIdx].url} 
                        alt={vitaImages[activeVitaImgIdx].title} 
                        className="w-full h-full object-contain group-hover/draw:scale-105 transition-transform duration-500 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                      />

                      {/* Navigation arrows */}
                      <button
                        type="button"
                        onClick={() => setActiveVitaImgIdx((prev) => (prev === 0 ? vitaImages.length - 1 : prev - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                        title={isSlovenian ? "Prejšnja skica" : isIt ? "Bozzetto precedente" : "Previous drawing"}
                      >
                        <ChevronRight size={18} className="rotate-180 stroke-[2.5]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveVitaImgIdx((prev) => (prev === vitaImages.length - 1 ? 0 : prev + 1))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                        title={isSlovenian ? "Naslednja skica" : isIt ? "Bozzetto successivo" : "Next drawing"}
                      >
                        <ChevronRight size={18} className="stroke-[2.5]" />
                      </button>

                      <div className="absolute top-4 left-4 pointer-events-none bg-[#080B10]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#53B8FF]/40 text-[#53B8FF] font-mono text-xs font-bold z-10">
                        US PATENT US5051109A
                      </div>

                      <button
                        type="button"
                        onClick={() => setEnlargedVitaImg(vitaImages[activeVitaImgIdx].url)}
                        className="absolute bottom-4 right-4 bg-[#080B10]/90 hover:bg-[#53B8FF] text-slate-300 hover:text-[#080B10] backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 hover:border-[#53B8FF] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md z-10"
                        title={isSlovenian ? "Povečaj sliko" : isIt ? "Ingrandisci immagine" : "Enlarge image"}
                      >
                        <Maximize2 size={13} />
                        <span className="hidden sm:inline">{ui.featured.gas.zoom}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Bar: When Video vs When Drawing */}
                {vitaViewMode === 'video' ? (
                  <div className="p-3.5 bg-[#0E131C] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                      <span className="text-white font-bold">Igla VITA1.mp4</span>
                      <span className="text-slate-500 hidden sm:inline">· {isSlovenian ? 'Izvirni video arhiv' : isIt ? 'Archivio video originale' : 'Original video archive'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveVideoModal('video-vita')}
                      className="hover:text-[#53B8FF] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300 hover:underline"
                      title={isSlovenian ? "Odpri v velikem predvajalniku" : isIt ? "Apri nel player a schermo intero" : "Open in fullscreen player"}
                    >
                      <Maximize2 size={13} />
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider">{isSlovenian ? "Celozaslonski način" : isIt ? "Schermo intero" : "Fullscreen mode"}</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-[#0E131C] border-t border-slate-800 grid grid-cols-3 gap-2.5">
                    {vitaImages.map((img, idx) => {
                      const isSelected = activeVitaImgIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveVitaImgIdx(idx)}
                          className={`rounded-xl overflow-hidden border-2 transition-all p-1.5 bg-[#080B10] flex items-center gap-2 cursor-pointer text-left ${
                            isSelected
                              ? 'border-[#53B8FF] shadow-[0_0_15px_rgba(83,184,255,0.3)] bg-[#151B24]'
                              : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-black shrink-0 flex items-center justify-center">
                            <img 
                              src={img.url} 
                              alt={isSlovenian ? `Predogled ${idx + 1}` : isIt ? `Anteprima ${idx + 1}` : `Preview ${idx + 1}`} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="overflow-hidden hidden sm:block">
                            <div className={`text-[10px] font-mono font-bold truncate ${isSelected ? 'text-[#53B8FF]' : 'text-slate-300'}`}>
                              {isSlovenian ? 'Skica' : isIt ? 'Bozzetto' : 'Drawing'} 0{idx + 1}
                            </div>
                            <div className="text-[9px] text-slate-500 font-sans truncate">
                              {img.title}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#53B8FF] tracking-widest uppercase">
                <span>{ui.featured.vita.tag}</span>
                <span>·</span>
                <span>{isSlovenian ? "ZDA & EUREKA" : isIt ? "USA & EUREKA" : "USA & EUREKA"}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white leading-[1.05]">
                {ui.featured.vita.title}
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>{ui.featured.vita.problemLabel}</strong> {ui.featured.vita.problemText}
                </p>
                <p>
                  <strong>{ui.featured.vita.solutionLabel}</strong> {ui.featured.vita.solutionText}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#151B24] border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-[#53B8FF] uppercase">{ui.featured.vita.patentLabel}</div>
                <div className="text-xs sm:text-sm text-slate-300">
                  {ui.featured.vita.patentText}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setVitaViewMode('video');
                    setActiveVideoModal('video-vita');
                  }}
                  className="px-6 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(83,184,255,0.3)]"
                >
                  <Play size={16} className="fill-[#080B10]" />
                  <span>{isSlovenian ? 'Predvajaj video posnetek' : isIt ? 'Riproduci video' : 'Play video footage'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const rec = patentRegistry.find(p => p.id === 'us5051109a');
                    if (rec) setSelectedPatent(rec);
                  }}
                  className="px-5 py-3 rounded-xl bg-[#151B24] hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={16} className="text-[#53B8FF]" />
                  <span>{ui.featured.vita.btnRegistry}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveExplainerTab('vita');
                    const el = document.getElementById('tehnicna-razlaga');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-[#151B24] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Eye size={16} className="text-[#53B8FF]" />
                  <span>{isSlovenian ? 'Kako deluje mehanizem' : isIt ? 'Come funziona il meccanismo' : 'How the mechanism works'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 2. PARKIRNI AVTOMAT NOVA GORICA */}
          {/* --------------------------------------------------------------------- */}
          <div id="izum-parkirni" className="scroll-mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[#53B8FF] tracking-widest uppercase">
                <span>{ui.featured.parking.tag}</span>
                <span>·</span>
                <span>NOVA GORICA 1999</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white leading-[1.05]">
                {ui.featured.parking.title}
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>{ui.featured.parking.storyLabel}</strong> {ui.featured.parking.storyText}
                </p>
                <p>
                  <strong>{ui.featured.parking.invLabel}</strong> {ui.featured.parking.invText}
                </p>
                <p>
                  {ui.featured.parking.deployText}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">{ui.featured.parking.powerLabel}</div>
                  <div className="font-bold text-white text-xs mt-1">{ui.featured.parking.powerVal}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">{ui.featured.parking.payLabel}</div>
                  <div className="font-bold text-white text-xs mt-1">{ui.featured.parking.payVal}</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setParkingViewMode('video');
                    setActiveVideoModal('video-parking');
                  }}
                  className="px-6 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(83,184,255,0.3)]"
                >
                  <Play size={16} className="fill-[#080B10]" />
                  <span>{isSlovenian ? 'Predvajaj video posnetek' : isIt ? 'Riproduci video' : 'Play video footage'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const rec = patentRegistry.find(p => p.id === 'parking-meter');
                    if (rec) setSelectedPatent(rec);
                  }}
                  className="px-5 py-3 rounded-xl bg-[#151B24] hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={16} className="text-[#53B8FF]" />
                  <span>{isSlovenian ? 'Tehnične specifikacije' : isIt ? 'Specifiche tecniche' : 'Technical specifications'}</span>
                </button>
              </div>
            </div>

            {/* Visual & Video Column */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-[#53B8FF]/40 bg-[#151B24] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                
                {/* Header Switcher: Video / Photo */}
                <div className="p-3 bg-[#0E131C] border-b border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-[#151B24] p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setParkingViewMode('video')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                        parkingViewMode === 'video'
                          ? 'bg-[#53B8FF] text-[#080B10] shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Play size={13} className={parkingViewMode === 'video' ? 'fill-[#080B10]' : ''} />
                      <span>{isSlovenian ? 'Video posnetek' : isIt ? 'Filmato video' : 'Video Footage'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setParkingViewMode('photo')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                        parkingViewMode === 'photo'
                          ? 'bg-[#53B8FF] text-[#080B10] shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <FileText size={13} />
                      <span>{isSlovenian ? 'Fotografija' : isIt ? 'Fotografia' : 'Photograph'}</span>
                    </button>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#53B8FF]/10 border border-[#53B8FF]/30 text-[#53B8FF] font-mono text-[11px] font-bold">
                    <MapPin size={13} />
                    <span>Nova Gorica 1999</span>
                  </span>
                </div>

                {/* Media Container */}
                <div className="relative aspect-video sm:aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
                  {parkingViewMode === 'video' ? (
                    <video 
                      src="https://ik.imagekit.io/utigodgni/Parkirni%20avtomat1.mp4"
                      poster={parkingImg}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain bg-black"
                    >
                      {isSlovenian ? "Vaš brskalnik ne podpira predvajanja videa." : isIt ? "Il tuo browser non supporta la riproduzione video." : "Your browser does not support the video tag."}
                    </video>
                  ) : (
                    <div className="relative w-full h-full group/draw">
                      <img 
                        src={parkingImg} 
                        alt={isSlovenian ? "Parkirni avtomat Nova Gorica 1999" : isIt ? "Parcometro Nova Gorica 1999" : "Parking terminal Nova Gorica 1999"} 
                        className="w-full h-full object-cover group-hover/draw:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 bg-[#080B10]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono text-slate-300">
                        {isSlovenian ? 'Prva uvedba parkirnega avtomata v Novi Gorici' : isIt ? 'Prima installazione di parcometri a Nova Gorica' : 'First deployment of parking kiosks in Nova Gorica'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Bar Info */}
                <div className="p-3.5 bg-[#0E131C] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                    <span className="text-white font-bold">Parkirni avtomat1.mp4</span>
                    <span className="text-slate-500 hidden sm:inline">· {isSlovenian ? 'Arhivski posnetek' : isIt ? 'Filmato d\'archivio' : 'Archival footage'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal('video-parking')}
                    className="hover:text-[#53B8FF] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300 hover:underline"
                    title={isSlovenian ? "Odpri v velikem predvajalniku" : isIt ? "Apri nel player a schermo intero" : "Open in fullscreen player"}
                  >
                    <Maximize2 size={13} />
                    <span className="text-[11px] font-sans font-bold uppercase tracking-wider">{isSlovenian ? "Celozaslonski način" : isIt ? "Schermo intero" : "Fullscreen mode"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 3. TELEFONSKA ČIP KARTICA */}
          {/* --------------------------------------------------------------------- */}
          <div id="izum-kartica" className="scroll-mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-[#53B8FF]/40 bg-[#151B24] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                
                {/* Header Info Bar */}
                <div className="p-3 bg-[#0E131C] border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                    <span className="text-white font-bold">{isSlovenian ? '14. JUNIJ 1995 · SLOVENIJA' : isIt ? '14 GIUGNO 1995 · SLOVENIA' : '14 JUNE 1995 · SLOVENIA'}</span>
                    <span className="text-slate-500 hidden sm:inline">· Iskra Terminali & Impulz</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#53B8FF]/10 border border-[#53B8FF]/30 text-[#53B8FF]">
                    {isSlovenian ? 'Fotografiji' : isIt ? 'Fotografie' : 'Photographs'} ({cardImages.length})
                  </span>
                </div>

                <div className="relative aspect-video sm:aspect-[16/10] bg-[#0A0E15] overflow-hidden flex items-center justify-center p-3 sm:p-5 group/draw">
                  <img 
                    src={cardImages[activeCardImgIdx].url} 
                    alt={cardImages[activeCardImgIdx].title} 
                    className="w-full h-full object-contain group-hover/draw:scale-105 transition-transform duration-700 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Navigation arrows */}
                  <button
                    type="button"
                    onClick={() => setActiveCardImgIdx((prev) => (prev === 0 ? cardImages.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                    title={isSlovenian ? "Prejšnja fotografija" : isIt ? "Fotografia precedente" : "Previous photo"}
                  >
                    <ChevronRight size={18} className="rotate-180 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCardImgIdx((prev) => (prev === cardImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                    title={isSlovenian ? "Naslednja fotografija" : isIt ? "Fotografia successiva" : "Next photo"}
                  >
                    <ChevronRight size={18} className="stroke-[2.5]" />
                  </button>

                  <div className="absolute top-4 left-4 pointer-events-none bg-[#080B10]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#53B8FF]/40 text-[#53B8FF] font-mono text-xs font-bold z-10">
                    {cardImages[activeCardImgIdx].title}
                  </div>

                  <button
                    type="button"
                    onClick={() => setEnlargedGasImg(cardImages[activeCardImgIdx].url)}
                    className="absolute bottom-4 right-4 bg-[#080B10]/90 hover:bg-[#53B8FF] text-slate-300 hover:text-[#080B10] backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 hover:border-[#53B8FF] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md z-10"
                    title={isSlovenian ? "Povečaj" : isIt ? "Ingrandisci" : "Enlarge"}
                  >
                    <Maximize2 size={13} />
                    <span className="hidden sm:inline">{ui.featured.gas.zoom}</span>
                  </button>
                </div>

                {/* Thumbnail Strip with 2 Images */}
                <div className="p-3 bg-[#0E131C] border-t border-slate-800 grid grid-cols-2 gap-2.5">
                  {cardImages.map((img, idx) => {
                    const isSelected = activeCardImgIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveCardImgIdx(idx)}
                        className={`rounded-xl overflow-hidden border-2 transition-all p-1.5 bg-[#080B10] flex items-center gap-2 cursor-pointer text-left ${
                          isSelected
                            ? 'border-[#53B8FF] shadow-[0_0_15px_rgba(83,184,255,0.3)] bg-[#151B24]'
                            : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-black shrink-0 flex items-center justify-center p-0.5">
                          <img 
                            src={img.url} 
                            alt={isSlovenian ? `Predogled ${idx + 1}` : isIt ? `Anteprima ${idx + 1}` : `Preview ${idx + 1}`} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <div className={`text-[10px] font-mono font-bold truncate ${isSelected ? 'text-[#53B8FF]' : 'text-slate-300'}`}>
                            {isSlovenian ? 'Fotografija' : isIt ? 'Fotografia' : 'Photo'} 0{idx + 1}
                          </div>
                          <div className="text-[9px] text-slate-500 font-sans truncate">
                            {img.title}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#53B8FF] tracking-widest uppercase">
                <span>{ui.featured.card.tag}</span>
                <span>·</span>
                <span>ISKRA TERMINALI & IMPULZ</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white leading-[1.05]">
                {ui.featured.card.title}
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>{ui.featured.card.tokensLabel}</strong> {ui.featured.card.tokensText}
                </p>
                <p>
                  <strong>{ui.featured.card.launchLabel}</strong> {ui.featured.card.launchText}
                </p>
                <p>
                  {ui.featured.card.pText}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#151B24] border border-slate-800 space-y-2 text-xs">
                <div className="text-slate-300 leading-relaxed">
                  {ui.featured.card.attribution1}
                </div>
                <div className="text-[#53B8FF] font-semibold">
                  {ui.featured.card.attribution2}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const rec = patentRegistry.find(p => p.id === 'chip-card');
                    if (rec) setSelectedPatent(rec);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText size={16} />
                  <span>{isSlovenian ? 'Podrobnosti sistema čip kartice' : isIt ? 'Dettagli del sistema carta chip' : 'Chip card system details'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 4. ČASOVNIK ZA PLINSKE ŠTEDILNIKE */}
          {/* --------------------------------------------------------------------- */}
          <div id="izum-plin" className="scroll-mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[#53B8FF] tracking-widest uppercase">
                <span>{ui.featured.gas.tag}</span>
                <span>·</span>
                <span>T. LAZOVSKI & E. BENKO</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white leading-[1.05]">
                {ui.featured.gas.title}
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>{ui.featured.gas.hazardLabel}</strong> {ui.featured.gas.hazardText}
                </p>
                <p>
                  <strong>{isSlovenian ? 'Sodelovanje Taseta Lazovskega:' : isIt ? 'Collaborazione di Tase Lazovski:' : 'Collaboration of Tase Lazovski:'}</strong> {isSlovenian ? 'Razvil je elektromehanski varnostni ventil s časovnikom. Pred prižigom uporabnik nastavi želeni čas delovanja. Ko čas poteče, ventil avtomatsko in hipoma nepredušno zapre dovod plina do gorilnika.' : isIt ? 'Ha sviluppato una valvola di sicurezza elettromeccanica con timer. Prima dell\'accensione l\'utente imposta il tempo di funzionamento desiderato. Allo scadere del tempo, la valvola interrompe automaticamente e istantaneamente l\'erogazione del gas al bruciatore in modo ermetico.' : 'He developed an electromechanical safety valve with timer. Prior to ignition, the user presets the desired operating duration. Once time elapses, the valve automatically and instantly seals off the gas supply to the burner.'}
                </p>
                <p>
                  {isSlovenian ? 'Inovacija deluje samostojno, kar zagotavlja visoko varnostno zanesljivost.' : isIt ? 'L\'innovazione funziona in modo autonomo, garantendo un\'elevata affidabilità di sicurezza.' : 'The innovation operates autonomously, ensuring supreme fail-safe reliability.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">{isSlovenian ? 'Avtorja izuma' : isIt ? 'Autori dell\'invenzione' : 'Invention Authors'}</div>
                  <div className="font-bold text-white text-xs mt-1">Tase Lazovski & Emil Benko</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">{isSlovenian ? 'Varnostni odziv' : isIt ? 'Risposta di sicurezza' : 'Safety response'}</div>
                  <div className="font-bold text-white text-xs mt-1">{isSlovenian ? '< 0.2 s zapora plina' : isIt ? '< 0.2 s arresto gas' : '< 0.2 s gas shutoff'}</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const rec = patentRegistry.find(p => p.id === 'gas-timer');
                    if (rec) setSelectedPatent(rec);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText size={16} />
                  <span>{ui.featured.gas.docTitle}</span>
                </button>
              </div>
            </div>

            {/* Visual Column: Interactive 3-Image Showcase */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-[#53B8FF]/40 bg-[#151B24] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                
                {/* Header Info Bar */}
                <div className="p-3 bg-[#0E131C] border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                    <span className="text-white font-bold">{gasTimerImages[activeGasImgIdx].title}</span>
                    <span className="text-slate-500 hidden sm:inline">· {gasTimerImages[activeGasImgIdx].subtitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#53B8FF]">
                    <span className="px-2 py-0.5 rounded-md bg-[#53B8FF]/10 border border-[#53B8FF]/30">
                      0{activeGasImgIdx + 1} / 03
                    </span>
                  </div>
                </div>

                {/* Main Image Frame with Previous/Next Arrows */}
                <div className="relative aspect-video sm:aspect-[16/10] bg-[#0A0E15] overflow-hidden flex items-center justify-center p-3 sm:p-5 group/img">
                  <img 
                    src={gasTimerImages[activeGasImgIdx].url} 
                    alt={isSlovenian ? `Časovnik za plinske štedilnike - Slika ${activeGasImgIdx + 1}` : isIt ? `Timer fornelli a gas - Immagine ${activeGasImgIdx + 1}` : `Gas stove timer - Image ${activeGasImgIdx + 1}`} 
                    className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                  />

                  {/* Left / Right Nav Arrows */}
                  <button
                    type="button"
                    onClick={() => setActiveGasImgIdx((prev) => (prev === 0 ? gasTimerImages.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                    title={isSlovenian ? "Prejšnja slika" : isIt ? "Immagine precedente" : "Previous image"}
                  >
                    <ChevronRight size={18} className="rotate-180 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveGasImgIdx((prev) => (prev === gasTimerImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                    title={isSlovenian ? "Naslednja slika" : isIt ? "Immagine successiva" : "Next image"}
                  >
                    <ChevronRight size={18} className="stroke-[2.5]" />
                  </button>

                  <div className="absolute top-4 left-4 pointer-events-none bg-[#080B10]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#53B8FF]/40 text-[#53B8FF] font-mono text-xs font-bold">
                    T. LAZOVSKI & E. BENKO
                  </div>

                  <button
                    type="button"
                    onClick={() => setEnlargedGasImg(gasTimerImages[activeGasImgIdx].url)}
                    className="absolute bottom-4 right-4 bg-[#080B10]/90 hover:bg-[#53B8FF] text-slate-300 hover:text-[#080B10] backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 hover:border-[#53B8FF] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md z-10"
                    title={isSlovenian ? "Povečaj sliko" : isIt ? "Ingrandisci immagine" : "Enlarge image"}
                  >
                    <Maximize2 size={13} />
                    <span className="hidden sm:inline">{ui.featured.gas.zoom}</span>
                  </button>
                </div>

                {/* Thumbnail Strip with 3 Images */}
                <div className="p-3 bg-[#0E131C] border-t border-slate-800 grid grid-cols-3 gap-2.5">
                  {gasTimerImages.map((img, idx) => {
                    const isSelected = activeGasImgIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveGasImgIdx(idx)}
                        className={`rounded-xl overflow-hidden border-2 transition-all p-1.5 bg-[#080B10] flex items-center gap-2 cursor-pointer text-left ${
                          isSelected
                            ? 'border-[#53B8FF] shadow-[0_0_15px_rgba(83,184,255,0.3)] bg-[#151B24]'
                            : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-black shrink-0 flex items-center justify-center">
                          <img 
                            src={img.url} 
                            alt={isSlovenian ? `Predogled ${idx + 1}` : isIt ? `Anteprima ${idx + 1}` : `Preview ${idx + 1}`} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="overflow-hidden hidden sm:block">
                          <div className={`text-[10px] font-mono font-bold truncate ${isSelected ? 'text-[#53B8FF]' : 'text-slate-300'}`}>
                            {isSlovenian ? 'Slika' : isIt ? 'Immagine' : 'Image'} 0{idx + 1}
                          </div>
                          <div className="text-[9px] text-slate-500 font-sans truncate">
                            {img.title}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 5. ODVOD STATIČNE ELEKTRIKE OD LJUDI */}
          {/* --------------------------------------------------------------------- */}
          <div id="izum-static" className="scroll-mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[#53B8FF] tracking-widest uppercase">
                <span>{isSlovenian ? 'ELEKTROSTATIKA & VARNOST 05' : isIt ? 'ELETTROSTATICA & SICUREZZA 05' : 'ELECTROSTATICS & SAFETY 05'}</span>
                <span>·</span>
                <span>T. LAZOVSKI, E. BENKO, A. PORCARO</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white leading-[1.05]">
                {ui.featured.staticEsd.title}
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>{ui.featured.staticEsd.problemLabel}</strong> {ui.featured.staticEsd.problemText}
                </p>
                <p>
                  <strong>{ui.featured.staticEsd.solutionLabel}</strong> {ui.featured.staticEsd.solutionText}
                </p>
                <p>
                  {ui.featured.staticEsd.commercialText}
                </p>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">{ui.featured.staticEsd.stats.time}</div>
                  <div className="font-bold text-white text-xs mt-1">{isSlovenian ? '150 – 250 ms (neboleče)' : isIt ? '150 – 250 ms (indolore)' : '150 – 250 ms (painless)'}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">{ui.featured.staticEsd.stats.voltage}</div>
                  <div className="font-bold text-white text-xs mt-1">{ui.featured.staticEsd.stats.voltageVal}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">{isSlovenian ? 'Patenta' : isIt ? 'Brevetti' : 'Patents'}</div>
                  <div className="font-bold text-white text-xs mt-1 truncate">EP 2805592 · US 959672</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="/assets/aistudio/ODVOD_STATI_NE_ELEKTRIKE_OD_LJUDI_e6afeecb.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText size={16} />
                  <span>{isSlovenian ? 'Odpri patentni dokument (PDF)' : isIt ? 'Apri documento brevettuale (PDF)' : 'Open patent document (PDF)'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal('video-static')}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Play size={16} className="text-[#53B8FF]" />
                  <span>{isSlovenian ? 'Predvajaj video posnetek' : isIt ? 'Riproduci video' : 'Play video footage'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const rec = patentRegistry.find(p => p.id === 'esd-static');
                    if (rec) setSelectedPatent(rec);
                  }}
                  className="px-5 py-3 rounded-xl bg-[#151B24] hover:bg-slate-800 text-slate-300 border border-slate-800 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Info size={16} className="text-[#53B8FF]" />
                  <span>{isSlovenian ? 'Specifikacije izuma' : isIt ? 'Specifiche dell\'invenzione' : 'Invention specifications'}</span>
                </button>
              </div>
            </div>

            {/* Visual Column: Technical Schematic Blueprint */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-[#53B8FF]/40 bg-[#151B24] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                <div className="p-3 bg-[#0E131C] border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                    <span className="text-white font-bold">{isSlovenian ? 'Uradna patentna dokumentacija' : isIt ? 'Documentazione brevettuale ufficiale' : 'Official patent documentation'}</span>
                    <span className="text-slate-500 hidden sm:inline">· Atemm H-ESD & GREEN POINT</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#53B8FF]/10 border border-[#53B8FF]/30 text-[#53B8FF]">
                    EP 2805592 · US 959672
                  </span>
                </div>

                <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-white overflow-hidden flex items-center justify-center p-3 group/img">
                  <img 
                    src="/assets/odvod_staticne_elektrike_shema.png" 
                    alt={isSlovenian ? "Odvod statične elektrike od ljudi patentna shema Atemm" : isIt ? "Schema di scarica elettrostatica Atemm" : "Atemm electrostatic discharge patent schematic"} 
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover/img:scale-[1.02]"
                  />

                  <div className="absolute top-4 left-4 pointer-events-none bg-[#080B10]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#53B8FF]/40 text-[#53B8FF] font-mono text-xs font-bold">
                    T. LAZOVSKI, E. BENKO, A. PORCARO
                  </div>

                  <button
                    type="button"
                    onClick={() => setEnlargedGasImg('/assets/odvod_staticne_elektrike_shema.png')}
                    className="absolute bottom-4 right-4 bg-[#080B10]/90 hover:bg-[#53B8FF] text-slate-300 hover:text-[#080B10] backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 hover:border-[#53B8FF] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md z-10"
                    title={isSlovenian ? "Povečaj načrt" : isIt ? "Ingrandisci schema" : "Enlarge blueprint"}
                  >
                    <Maximize2 size={13} />
                    <span className="hidden sm:inline">{isSlovenian ? "Povečaj načrt" : isIt ? "Ingrandisci schema" : "Zoom blueprint"}</span>
                  </button>
                </div>

                <div className="p-3.5 bg-[#0E131C] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="truncate">{isSlovenian ? 'Vgradnja v varnostni pas vozil & računalniško opremo' : isIt ? 'Integrazione nella cintura di sicurezza di veicoli & apparecchiature informatiche' : 'Integration into vehicle seatbelts & computer equipment'}</span>
                  <a
                    href="/assets/aistudio/ODVOD_STATI_NE_ELEKTRIKE_OD_LJUDI_e6afeecb.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#53B8FF] hover:underline flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>{isSlovenian ? 'Celoten PDF' : isIt ? 'PDF completo' : 'Full PDF'}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: HOW IT WORKS (INTERACTIVE TECHNICAL EXPLAINER) */}
      {/* ========================================================================= */}
      <section id="tehnicna-razlaga" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#080B10] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
              {ui.explainer.tag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              {ui.explainer.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              {ui.explainer.desc}
            </p>
          </div>

          {/* Technology Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: 'vita' as const, label: ui.explainer.tabs.vita },
              { id: 'parking' as const, label: ui.explainer.tabs.parking },
              { id: 'card' as const, label: ui.explainer.tabs.card },
              { id: 'gas' as const, label: ui.explainer.tabs.gas },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveExplainerTab(tab.id);
                  setActiveStep(0);
                }}
                className={`px-5 py-3 rounded-2xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                  activeExplainerTab === tab.id
                    ? 'bg-[#53B8FF] text-[#080B10] shadow-[0_0_20px_rgba(83,184,255,0.3)]'
                    : 'bg-[#151B24] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Explainer Interactive Container */}
          {(() => {
            const data = explainerData[activeExplainerTab];
            return (
              <div className="p-6 sm:p-10 rounded-3xl bg-[#151B24] border border-slate-800 shadow-2xl">
                <div className={`max-w-3xl ${data.steps.length > 0 ? 'mb-8' : ''}`}>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#53B8FF]/15 text-[#53B8FF] font-mono text-xs mb-2">
                    {data.patent}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                    {data.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                    {data.desc}
                  </p>
                </div>

                {/* Steps Grid */}
                {data.steps.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.steps.map((st, i) => {
                      const isSelected = activeStep === i;
                      return (
                        <div
                          key={i}
                          onClick={() => setActiveStep(i)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0E131C] border-[#53B8FF] shadow-[0_0_15px_rgba(83,184,255,0.2)]'
                              : 'bg-[#0E131C]/60 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className={`font-mono text-xl font-bold ${isSelected ? 'text-[#53B8FF]' : 'text-slate-500'}`}>
                              {st.num}
                            </span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-ping" />}
                          </div>
                          <h4 className="font-display font-black text-sm uppercase text-white mb-2 leading-snug">
                            {st.name}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {st.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION F: ADDITIONAL INVENTIONS (ARCHIVE SECTION) */}
      {/* ========================================================================= */}
      <section id="ostali-izumi" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#0A0E15] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
              {ui.additional.tag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              {ui.additional.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              {ui.additional.desc}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalInventions.map((inv, idx) => {
              const Icon = inv.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-[#151B24] border border-slate-800 hover:border-[#53B8FF]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#53B8FF]/10 text-[#53B8FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={24} className="stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-[#080B10] border border-slate-800 text-slate-400">
                        {inv.badge}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-[#53B8FF] uppercase tracking-wider">
                      {inv.category}
                    </div>

                    <h3 className="font-display font-black text-lg uppercase text-white leading-snug">
                      {inv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                      {inv.desc}
                    </p>

                    {inv.authors && (
                      <div className="pt-1">
                        <div className="px-3 py-2 rounded-xl bg-[#080B10] border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#53B8FF] shrink-0" />
                          <span className="font-semibold text-slate-200">{inv.authors}</span>
                        </div>
                      </div>
                    )}

                    {inv.videoId && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setActiveVideoModal(inv.videoId!)}
                          className="w-full py-2.5 rounded-xl bg-[#53B8FF]/15 hover:bg-[#53B8FF] text-[#53B8FF] hover:text-[#080B10] border border-[#53B8FF]/30 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group/btn"
                        >
                          <Play size={14} className="fill-current" />
                          <span>{isSlovenian ? 'Predvajaj video posnetek' : isIt ? 'Riproduci video' : 'Play video footage'}</span>
                        </button>
                      </div>
                    )}
                    {inv.pdfUrl && (
                      <div className="pt-2">
                        <a
                          href={inv.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          <FileText size={14} className="text-[#53B8FF]" />
                          <span>{isSlovenian ? 'Odpri patentni dokument (PDF)' : isIt ? 'Apri documento brevettuale (PDF)' : 'Open patent document (PDF)'}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{isSlovenian ? 'Arhivski vir Start Lab' : isIt ? 'Fonte d\'archivio Start Lab' : 'Start Lab archival source'}</span>
                    <span className="text-[#53B8FF]">{isSlovenian ? 'Dokumentirano' : isIt ? 'Documentato' : 'Documented'}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION G: PATENTS AND RECOGNITION (REGISTRY MODAL TRIGGER) */}
      {/* ========================================================================= */}
      <section id="patenti" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#080B10] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
                {ui.registry.tag}
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                {ui.registry.title}
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md font-normal">
              {ui.registry.desc}
            </p>
          </div>

          {/* Registry Table / Cards */}
          <div className="space-y-4">
            {patentRegistry.map((patent) => (
              <div 
                key={patent.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#151B24] border border-slate-800 hover:border-slate-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2 lg:max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="px-3 py-1 rounded-lg bg-[#53B8FF]/15 text-[#53B8FF] font-mono text-xs font-bold">
                      {patent.number}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {patent.jurisdiction}
                    </span>
                    {patent.recognition && (
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold">
                        ★ {patent.recognition}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-black text-lg sm:text-xl uppercase text-white leading-tight">
                    {patent.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {patent.abstract}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:block text-right text-xs font-mono text-slate-400">
                    {patent.manufacturer ? (
                      <>
                        <div>{isSlovenian ? 'Proizvajalec' : isIt ? 'Produttore' : 'Manufacturer'}: {patent.manufacturer}</div>
                        {patent.coordination && <div className="text-slate-400">{isSlovenian ? 'Koordinacija' : isIt ? 'Coordinamento' : 'Coordination'}: {patent.coordination}</div>}
                      </>
                    ) : (
                      <div>{isSlovenian ? "Izumitelj" : isIt ? "Inventore" : "Inventor"}: {patent.inventors.join(', ')}</div>
                    )}
                    <div className="text-slate-500">{patent.grantDate}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPatent(patent)}
                    className="px-5 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <BookOpen size={15} />
                    <span>{ui.registry.btnDetails}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION H: VIDEO ARCHIVE */}
      {/* ========================================================================= */}
      <section id="video-arhiv" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#0A0E15] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
              {ui.video.tag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              {ui.video.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              {ui.video.desc}
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {videoArchives.map((vid) => (
              <div 
                key={vid.id}
                className="rounded-3xl overflow-hidden bg-[#151B24] border border-slate-800 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail frame with play trigger */}
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img 
                      src={vid.image} 
                      alt={vid.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveVideoModal(vid.id)}
                        className="w-14 h-14 rounded-full bg-[#53B8FF] hover:bg-white text-[#080B10] flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer group-hover:scale-110"
                        title={isSlovenian ? "Predvajaj posnetek" : isIt ? "Riproduci video" : "Play video"}
                      >
                        <Play size={22} className="ml-1 fill-[#080B10]" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-[#080B10]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-[#53B8FF]">
                      {vid.year} · {vid.patent}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-[#080B10]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-300">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h4 className="font-display font-black text-base uppercase text-white leading-snug">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {vid.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(vid.id)}
                    className="w-full py-2.5 rounded-xl border border-slate-700 hover:border-[#53B8FF] text-xs font-display font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play size={14} />
                    <span>{ui.video.playBtn}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION I: FINAL CTA & LEGACY CONNECTION */}
      {/* ========================================================================= */}
      <section className="py-28 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-gradient-to-b from-[#080B10] via-[#0D121B] to-[#080B10] relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#53B8FF] uppercase">
            {isSlovenian ? 'POVEZAVA Z MISIJO START LABA' : isIt ? 'COLLEGAMENTO CON LA MISSIONE DI START LAB' : 'CONNECTION TO THE START LAB MISSION'}
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-tight leading-[1.05]">
            {ui.cta.heading}
          </h2>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            {ui.cta.text}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/delavnice"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(83,184,255,0.4)] flex items-center justify-center gap-3"
            >
              <span>{ui.cta.btnWorkshops}</span>
              <ChevronRight size={18} className="stroke-[3]" />
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#151B24] hover:bg-slate-800 text-white border border-slate-700 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>{ui.cta.btnHome}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PATENT DETAIL MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedPatent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#151B24] border-2 border-[#53B8FF]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6 text-slate-200"
            >
              <button
                type="button"
                onClick={() => setSelectedPatent(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#53B8FF]/20 text-[#53B8FF] font-mono text-xs font-bold inline-block">
                  {selectedPatent.number}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white leading-tight">
                  {selectedPatent.title}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  {selectedPatent.category} · {selectedPatent.jurisdiction}
                </p>
              </div>

              {selectedPatent.recognition && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
                  <Award size={18} />
                  <span>{selectedPatent.recognition}</span>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#53B8FF] font-bold">
                  {selectedPatent.abstractLabel || (isSlovenian ? 'Izvleček izuma (Abstract)' : isIt ? 'Sintesi del brevetto (Abstract)' : 'Patent Abstract')}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {selectedPatent.abstract}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#53B8FF] font-bold">{ui.modal.tabFeatures}</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {selectedPatent.keyFeatures.map((kf, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[#53B8FF] shrink-0 mt-0.5" />
                      <span>{kf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedPatent.id === 'esd-static' && (
                <div className="rounded-2xl border border-slate-800 bg-[#0a0f16] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#53B8FF] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={14} />
                      {isSlovenian ? 'Uradni patentni načrt in shema (Atemm H-ESD / GREEN POINT)' : isIt ? 'Schema e progetto brevettuale ufficiale (Atemm H-ESD / GREEN POINT)' : 'Official patent schematic (Atemm H-ESD / GREEN POINT)'}
                    </span>
                    <a
                      href={selectedPatent.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-[#53B8FF] flex items-center gap-1 transition-colors"
                    >
                      <span>{isSlovenian ? "Odpri PDF" : isIt ? "Apri PDF" : "Open PDF"}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-800 bg-white/5 p-1">
                    <img 
                      src="/assets/odvod_staticne_elektrike_shema.png" 
                      alt={isSlovenian ? "Odvod statične elektrike od ljudi patentna shema Atemm" : isIt ? "Schema di scarica elettrostatica Atemm" : "Atemm electrostatic discharge patent schematic"} 
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800">
                <div className={selectedPatent.id === 'chip-card' ? 'sm:col-span-2' : ''}>
                  {selectedPatent.manufacturer ? (
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-slate-500 block">{ui.modal.manufacturerLabel}:</span>
                        <span className="text-white font-bold">{selectedPatent.manufacturer}</span>
                      </div>
                      {selectedPatent.coordination && (
                        <div>
                          <span className="text-slate-500 block">{ui.modal.coordinationLabel}:</span>
                          <span className="text-white font-bold">{selectedPatent.coordination}</span>
                        </div>
                      )}
                    </div>
                  ) : selectedPatent.id === 'chip-card' ? (
                    <div className="space-y-1.5">
                      <div className="text-slate-300 leading-relaxed font-sans text-xs">
                        {ui.featured.card.attribution1}
                      </div>
                      <div className="text-[#53B8FF] font-semibold font-sans text-xs">
                        {ui.featured.card.attribution2}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-slate-500 block">{isSlovenian ? 'Izumitelji:' : isIt ? 'Inventori:' : 'Inventors:'}</span>
                      <span className="text-white font-bold">{selectedPatent.inventors.join(', ')}</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-slate-500 block">{ui.modal.statusLabel}:</span>
                  <span className="text-white font-bold">{selectedPatent.status}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {selectedPatent.id === 'us5051109a' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPatent(null);
                      setVitaViewMode('video');
                      setActiveVideoModal('video-vita');
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Play size={15} className="fill-[#080B10]" />
                    <span>{isSlovenian ? 'Predvajaj video posnetek' : isIt ? 'Riproduci video' : 'Play video footage'}</span>
                  </button>
                )}
                {selectedPatent.id === 'parking-meter' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPatent(null);
                      setParkingViewMode('video');
                      setActiveVideoModal('video-parking');
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Play size={15} className="fill-[#080B10]" />
                    <span>{isSlovenian ? 'Predvajaj video posnetek' : isIt ? 'Riproduci video' : 'Play video footage'}</span>
                  </button>
                )}
                {selectedPatent.id === 'esd-static' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPatent(null);
                      setActiveVideoModal('video-static');
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Play size={15} className="fill-[#080B10]" />
                    <span>{isSlovenian ? 'Predvajaj video posnetek' : isIt ? 'Riproduci video' : 'Play video footage'}</span>
                  </button>
                )}
                {selectedPatent.pdfUrl && (
                  <a
                    href={selectedPatent.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-[#53B8FF]/15 border border-[#53B8FF]/40 hover:bg-[#53B8FF]/25 text-[#53B8FF] font-display font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText size={15} />
                    <span>{isSlovenian ? 'Odpri patentni PDF' : isIt ? 'Apri PDF del brevetto' : 'Open patent PDF'}</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPatent(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {ui.modal.closeBtn}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* VIDEO PLAYER MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#151B24] border-2 border-[#53B8FF]/40 rounded-3xl max-w-4xl w-full p-6 relative shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-[#53B8FF] uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                  <span>{isSlovenian ? 'ARHIVSKI POSNETEK · START LAB ZAPUŠČINA' : isIt ? 'FILMATO D\'ARCHIVIO · EREDITÀ START LAB' : 'ARCHIVAL RECORDING · START LAB LEGACY'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player */}
              {(() => {
                const vid = videoArchives.find(v => v.id === activeVideoModal);
                return (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-slate-800 shadow-inner">
                      {vid?.videoUrl ? (
                        <video
                          src={vid.videoUrl}
                          poster={vid.image}
                          controls
                          autoPlay
                          playsInline
                          preload="auto"
                          className="w-full h-full object-contain bg-black"
                        >
                          {isSlovenian ? "Vaš brskalnik ne podpira predvajanja videa." : isIt ? "Il tuo browser non supporta la riproduzione video." : "Your browser does not support the video tag."}
                        </video>
                      ) : (
                        <div className="text-center space-y-2 py-8 px-4">
                          <div className="w-16 h-16 rounded-full bg-[#53B8FF]/20 text-[#53B8FF] mx-auto flex items-center justify-center animate-pulse">
                            <Activity size={32} />
                          </div>
                          <h4 className="font-display font-black text-lg text-white uppercase">
                            {vid?.title}
                          </h4>
                          <p className="text-xs text-slate-400 max-w-md mx-auto">
                            {isSlovenian ? 'Arhivska demonstracija delovanja z izvirnimi komentarji in tehničnimi diagrami izumitelja Taseta Lazovskega.' : isIt ? 'Dimostrazione d\'archivio del funzionamento con commenti originali e schemi tecnici dell\'inventore Tase Lazovski.' : 'Archival operation demonstration with original commentary and technical schematics by inventor Tase Lazovski.'}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div>
                        <h4 className="font-display font-black text-base uppercase text-white">
                          {vid?.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
                          {vid?.desc}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-[#53B8FF]">
                        <span className="px-3 py-1 rounded-lg bg-[#53B8FF]/10 border border-[#53B8FF]/30">
                          {vid?.patent}
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300">
                          {vid?.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-display font-bold uppercase cursor-pointer"
                >
                  {ui.modal.closeBtn}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GAS TIMER LIGHTBOX MODAL */}
      <AnimatePresence>
        {enlargedGasImg && (
          <div 
            onClick={() => setEnlargedGasImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#151B24] border border-[#53B8FF]/40 rounded-3xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between shadow-2xl cursor-default"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="text-[#53B8FF] font-bold">
                  {enlargedGasImg?.includes('staticne')
                    ? (isSlovenian ? 'TEHNIČNA DOKUMENTACIJA · ODVOD STATIČNE ELEKTRIKE OD LJUDI' : isIt ? 'DOCUMENTAZIONE TECNICA · SCARICA ELETTROSTATICA DA PERSONE' : 'TECHNICAL BLUEPRINT · CONTROLLED STATIC ELECTRICITY DISCHARGE')
                    : enlargedGasImg?.includes('KARTICA') || enlargedGasImg?.includes('Untitled-1')
                    ? (isSlovenian ? 'ARHIVSKA FOTOGRAFIJA · TELEFONSKA ČIP KARTICA' : isIt ? 'FOTOGRAFIA D\'ARCHIVIO · SCHEDA TELEFONICA CON CHIP' : 'ARCHIVAL PHOTOGRAPH · SMART TELEPHONE CHIP CARD')
                    : (isSlovenian ? 'TEHNIČNA DOKUMENTACIJA · ČASOVNIK ZA PLIN' : isIt ? 'DOCUMENTAZIONE TECNICA · TIMER PER GAS' : 'TECHNICAL BLUEPRINT · GAS STOVE SAFETY TIMER')}
                </span>
                <button
                  type="button"
                  onClick={() => setEnlargedGasImg(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative flex-1 flex items-center justify-center overflow-hidden py-4">
                <img 
                  src={enlargedGasImg} 
                  alt={isSlovenian ? "Tehnični načrt povečano" : isIt ? "Schema tecnico ingrandito" : "Technical blueprint enlarged"} 
                  className="max-h-[70vh] w-auto max-w-full object-contain filter drop-shadow-2xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>
                  {enlargedGasImg?.includes('staticne')
                    ? 'Tase Lazovski, Emil Benko, Angelo Porcaro'
                    : enlargedGasImg?.includes('KARTICA') || enlargedGasImg?.includes('Untitled-1')
                    ? 'Iskra Terminali · Impulz · Tase Lazovski'
                    : 'Tase Lazovski & Emil Benko'}
                </span>
                <button
                  type="button"
                  onClick={() => setEnlargedGasImg(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-display font-bold uppercase cursor-pointer"
                >
                  Zapri
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VITA NEEDLE LIGHTBOX MODAL */}
      <AnimatePresence>
        {enlargedVitaImg && (
          <div 
            onClick={() => setEnlargedVitaImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#151B24] border border-[#53B8FF]/40 rounded-3xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between shadow-2xl cursor-default"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="text-[#53B8FF] font-bold">{isSlovenian ? 'PATENT US 5,051,109 A · INJEKCIJSKA IGLA VITA' : isIt ? 'BREVETTO US 5,051,109 A · AGO PER INIEZIONE VITA' : 'PATENT US 5,051,109 A · VITA SAFETY NEEDLE'}</span>
                <button
                  type="button"
                  onClick={() => setEnlargedVitaImg(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative flex-1 flex items-center justify-center overflow-hidden py-4">
                <img 
                  src={enlargedVitaImg} 
                  alt={isSlovenian ? "Injekcijska igla VITA načrt povečano" : isIt ? "Disegno dell'ago VITA ingrandito" : "VITA safety needle blueprint enlarged"} 
                  className="max-h-[70vh] w-auto max-w-full object-contain filter drop-shadow-2xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{isSlovenian ? "Tase Lazovski · EUREKA Bruselj 1993" : isIt ? "Tase Lazovski · EUREKA Bruxelles 1993" : "Tase Lazovski · EUREKA Brussels 1993"}</span>
                <button
                  type="button"
                  onClick={() => setEnlargedVitaImg(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-display font-bold uppercase cursor-pointer"
                >
                  Zapri
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
