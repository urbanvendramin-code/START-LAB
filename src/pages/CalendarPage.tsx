import React, { useState, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval 
} from 'date-fns';
import { sl, enGB as en, it } from 'date-fns/locale';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Rocket, 
  X, 
  CheckCircle2, 
  Users, 
  Microscope, 
  Zap, 
  Cpu, 
  Brain, 
  Sparkles, 
  GraduationCap, 
  Briefcase,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { submitForm } from '../utils/formSubmit';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  category: 'workshop' | 'event' | 'open-lab';
  description: string;
  longDescription?: string;
  ageGroup?: string;
  mentors?: string;
  image?: string;
}

const getLocalizedEvents = (lang: string): Event[] => {
  const isSl = lang !== 'en' && lang !== 'it';
  const isEn = lang === 'en';

  const titleText = isSl 
    ? "Delavnica izdelave grafenskega čipa" 
    : isEn 
      ? "Graphene Chip Fabrication Workshop" 
      : "Workshop sulla fabbricazione di chip di grafene";

  const ageText = isSl 
    ? "10 - 15 let" 
    : "10 - 15 years";

  const mentorsText = isSl 
    ? "LFOS, Univerza v Novi Gorici" 
    : "LFOS, University of Nova Gorica";

  const rawGrapheneEvents = [
    {
      date: new Date(2026, 8, 7), // Sept 7
      time: '17:00 - 19:00',
      location: isSl ? 'Startlab Solkan' : 'Startlab Solkan',
      title: isSl ? 'Grafenski čip – Sklop 1' : 'Graphene Chip – Part 1',
      description: isSl 
        ? "Sklop 1: Izdelava grafena iz grafita in opazovanje pod optičnim mikroskopom. Spoznavanje materiala prihodnosti skozi prve fizikalne poskuse."
        : "Part 1: Fabricating graphene from graphite and observing it with optical microscope. Getting to know the material of the future through the first physics experiments."
    },
    {
      date: new Date(2026, 8, 14), // Sept 14
      time: '17:00 - 19:00',
      location: isSl ? 'Startlab Solkan' : 'Startlab Solkan',
      title: isSl ? 'Grafenski čip – Sklop 2' : 'Graphene Chip – Part 2',
      description: isSl 
        ? "Sklop 2: Načrtovanje elektrod grafenskega tranzistorja. Spoznaj, kako nastajajo elektronske komponente prihodnosti."
        : "Part 2: Designing electrodes of a graphene transistor. Learn how electronic components of the future are made."
    },
    {
      date: new Date(2026, 8, 18), // Sept 18
      time: '16h - 18h',
      location: isSl ? 'LFOS Ajdovščina (opcija)' : 'LFOS Ajdovščina (optional)',
      title: isSl ? 'Predstavitev LFOS Ajdovščina (opcija)' : 'LFOS Presentation Ajdovščina (optional)',
      description: isSl 
        ? "Predstavitev Laboratorija za fiziko organskih snovi (LFOS) v Ajdovščini. Spoznavanje raziskovalnega dela, vrhunske znanstvene opreme in možnosti mentorstva na področju naprednih polprevodnikov."
        : "Presentation of the Laboratory for Organic Matter Physics (LFOS) in Ajdovščina. Learn about research work, high-end scientific equipment and mentoring possibilities in the field of advanced semiconductors."
    },
    {
      date: new Date(2026, 8, 21), // Sept 21
      time: '17:00 - 19:00',
      location: isSl ? 'Startlab Solkan' : 'Startlab Solkan',
      title: isSl ? 'Grafenski čip – Sklop 3' : 'Graphene Chip – Part 3',
      description: isSl 
        ? "Sklop 3: Računalniška simulacija delovanja tranzistorja. Preveri delovanje in se poglobi v delovanje vgrajenih struktur."
        : "Part 3: Computer simulation of transistor operation. Verify functionality and dive deep into built-in structures."
    },
    {
      date: new Date(2026, 8, 25), // Sept 25
      time: '17h - 19h',
      location: isSl ? 'LFOS Ajdovščina' : 'LFOS Ajdovščina',
      title: isSl ? 'Ogled čiste sobe in litografije v LFOS Ajdovščina (Sklop 4)' : 'Cleanroom Tour and Lithography at LFOS (Part 4)',
      description: isSl 
        ? "Sklop 4: Ogled čiste sobe (cleanroom) in spoznavanje optične litografije v Laboratoriju za fiziko organskih snovi (LFOS) Ajdovščina. Edinstven neposreden vpogled v vrhunski znanstveni laboratorij."
        : "Part 4: Guided cleanroom tour and introduction to optical lithography at the Laboratory for Organic Matter Physics (LFOS) Ajdovščina. An exclusive direct look into a top scientific research laboratory."
    },
    {
      date: new Date(2026, 8, 28), // Sept 28
      time: '17:00 - 19:00',
      location: isSl ? 'Startlab Solkan' : 'Startlab Solkan',
      title: isSl ? 'Grafenski čip – Sklop 5' : 'Graphene Chip – Part 5',
      description: isSl 
        ? "Sklop 5: Električne meritve izdelanega grafenskega tranzistorja. Preizkusi svoje vezje in izmeri njegove električne lastnosti."
        : "Part 5: Electrical measurements of the fabricated graphene transistor. Test your circuit and measure its electrical characteristics."
    },
    {
      date: new Date(2026, 9, 5), // Oct 5
      time: '17:00 - 19:00',
      location: isSl ? 'Startlab Solkan' : 'Startlab Solkan',
      title: isSl ? 'Grafenski čip – Sklop 6' : 'Graphene Chip – Part 6',
      description: isSl 
        ? "Sklop 6: Priprava raziskovalnega poročila in predstavitev rezultatov. Zaključi svojo pot mladega raziskovalca in pridobi izkušnje za prihodnost."
        : "Part 6: Research report preparation and presentation of results. Conclude your journey as a young researcher and gain valuable experience for the future."
    }
  ];

  const grapheneEvents = rawGrapheneEvents.map((item, idx) => ({
    id: `graphene-session-${idx + 1}`,
    title: item.title,
    date: item.date,
    time: item.time,
    location: item.location,
    category: 'workshop' as const,
    description: item.description,
    ageGroup: ageText,
    mentors: mentorsText,
    image: 'https://res.cloudinary.com/dssxhjk8k/image/upload/v1784192548/grafenski_cip3_tucwpa.jpg'
  }));

  const rawPrintCutEvents = [
    {
      date: new Date(2026, 8, 8), // Sept 8
      time: '17:00 - 19:00',
      location: 'Startlab Solkan',
      title: isSl ? 'Natisni in izreži – Sklop 1' : 'Print & Cut – Part 1',
      description: isSl 
        ? "Sklop 1: Uvod v 3D modeliranje z Onshape. Spoznaj osnove risanja v 3D in začni načrtovati svoj unikatni izdelek."
        : "Part 1: Intro to 3D modeling with Onshape. Learn 3D drafting basics and start designing your unique product."
    },
    {
      date: new Date(2026, 8, 15), // Sept 15
      time: '17:00 - 19:00',
      location: 'Startlab Solkan',
      title: isSl ? 'Natisni in izreži – Sklop 2' : 'Print & Cut – Part 2',
      description: isSl 
        ? "Sklop 2: Naprednejše 3D modeliranje z Onshape. Prilagodi dimenzije in pripravi model za uvoz v program za rezanje."
        : "Part 2: Advanced 3D modeling with Onshape. Adjust dimensions and prepare your model for importing into slicers."
    },
    {
      date: new Date(2026, 8, 22), // Sept 22
      time: '17:00 - 19:00',
      location: 'Startlab Solkan',
      title: isSl ? 'Natisni in izreži – Sklop 3' : 'Print & Cut – Part 3',
      description: isSl 
        ? "Sklop 3: Priprava v programu Bambu Studio. Nauči se nastaviti parametre tiska (polnilo, sloji, podpora) in spoznaj profesionalne tiskalnike."
        : "Part 3: Preparation in Bambu Studio. Learn to set up printing parameters (infill, layers, supports) and configure professional 3D printers."
    },
    {
      date: new Date(2026, 8, 29), // Sept 29
      time: '17:00 - 19:00',
      location: 'Startlab Solkan',
      title: isSl ? 'Natisni in izreži – Sklop 4' : 'Print & Cut – Part 4',
      description: isSl 
        ? "Sklop 4: Tiskanje in preizkus prvega 3D izdelka. Spremljanje procesa tiska in analiza rezultatov."
        : "Part 4: Printing and testing the first 3D product. Live monitoring of the print process and result analysis."
    },
    {
      date: new Date(2026, 9, 6), // Oct 6
      time: '17:00 - 19:00',
      location: 'Startlab Solkan',
      title: isSl ? 'Natisni in izreži – Sklop 5' : 'Print & Cut – Part 5',
      description: isSl 
        ? "Sklop 5: Oblikovanje v RDWorks za laserski razrez. Spoznaj vektorsko risanje in pripravi načrt za laserski razrez ter graviranje."
        : "Part 5: Designing in RDWorks for laser cutting. Master vector drawing and compile blueprints for laser cutting and engraving."
    },
    {
      date: new Date(2026, 9, 13), // Oct 13
      time: '17:00 - 19:00',
      location: 'Startlab Solkan',
      title: isSl ? 'Natisni in izreži – Sklop 6' : 'Print & Cut – Part 6',
      description: isSl 
        ? "Sklop 6: Laserski razrez in graviranje v praksi. Samostojno upravljanje laserskega stroja in razrez delov."
        : "Part 6: Practical laser cutting and engraving. Operate the laser cutter independently and safely slice parts."
    },
    {
      date: new Date(2026, 9, 20), // Oct 20
      time: '17:00 - 19:00',
      location: 'Startlab Solkan',
      title: isSl ? 'Natisni in izreži – Sklop 7' : 'Print & Cut – Part 7',
      description: isSl 
        ? "Sklop 7: Sestavljanje in dodelava končnega izdelka. Združevanje 3D tiskanih in lasersko izrezanih delov v delujočo celoto."
        : "Part 7: Assembly and post-processing of the final product. Join 3D-printed and laser-cut parts into a functional design."
    },
    {
      date: new Date(2026, 9, 27), // Oct 27
      time: '17:00 - 19:00',
      location: 'Startlab Solkan',
      title: isSl ? 'Natisni in izreži – Sklop 8' : 'Print & Cut – Part 8',
      description: isSl 
        ? "Sklop 8: Predstavitev, testiranje in prevzem izdelkov. Pokaži svoj končni izdelek in ga odnesi domov."
        : "Part 8: Presentation, testing, and collection of products. Showcase your final designed product and take it home."
    }
  ];

  const printCutEvents = rawPrintCutEvents.map((item, idx) => ({
    id: `printcut-session-${idx + 1}`,
    title: item.title,
    date: item.date,
    time: item.time,
    location: item.location,
    category: 'workshop' as const,
    description: item.description,
    ageGroup: ageText,
    mentors: 'Uroš Polanc',
    image: 'https://res.cloudinary.com/dssxhjk8k/image/upload/v1784205182/Natisni_in_izrezi_el6yqu.jpg'
  }));

  return [...grapheneEvents, ...printCutEvents];
};

export default function CalendarPage() {
  const { t, i18n } = useTranslation();
  
  // Set default month to September 2026 (the start of the workshop)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 8, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Null by default to show both workshops at once
  
  // Registration Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState<Event | null>(null);
  
  // Form values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    note: '',
    sessionSelection: 'all' // 'all' or 'single'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const submitStatusParam = params.get('submit_status');
    if (submitStatusParam === 'success' || submitStatusParam === 'success_workshop' || submitStatusParam === 'success_calendar') {
      setSubmitStatus('success');
      setIsModalOpen(true);
      // Clean up search params
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const currentLocale = i18n.language === 'en' ? en : i18n.language === 'it' ? it : sl;

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "MMMM yyyy";

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const events = getLocalizedEvents(i18n.language);
  const selectedDayEvents = selectedDate 
    ? events.filter(event => isSameDay(event.date, selectedDate))
    : events.filter(event => event.id === 'graphene-session-1' || event.id === 'printcut-session-1');

  const isSlovenian = i18n.language !== 'en' && i18n.language !== 'it';

  const openRegisterModal = (event: Event) => {
    setModalEvent(event);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      note: '',
      sessionSelection: (event.id.startsWith('graphene') || event.id.startsWith('printcut')) ? 'all' : 'single'
    });
    setSubmitStatus('idle');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    let selectedTerm = '';
    if (formData.sessionSelection === 'all') {
      if (modalEvent?.id.startsWith('printcut')) {
        selectedTerm = isSlovenian 
          ? 'Celotna 8-tedenska delavnica (pričetek 8.9.2026)' 
          : 'Full 8-week workshop (starts Sept 8, 2026)';
      } else {
        selectedTerm = isSlovenian 
          ? 'Celotna 6-tedenska delavnica (pričetek 7.9.2026)' 
          : 'Full 6-week workshop (starts Sept 7, 2026)';
      }
    } else {
      const activeDate = selectedDate || modalEvent?.date || new Date();
      selectedTerm = format(activeDate, 'd. MMMM yyyy', { locale: currentLocale }) + ` (${modalEvent?.time})`;
    }

    const workshopTitle = modalEvent?.title || 'Delavnica';

    const result = await submitForm(
      '/api/workshop/register',
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        workshopTitle,
        dateSelected: selectedTerm,
        note: formData.note
      },
      `Prijava na delavnico: ${workshopTitle} - ${formData.name}`,
      'workshop'
    );

    if (result.success) {
      setSubmitStatus('success');
      setSubmitErrorMessage('');
    } else {
      setSubmitStatus('error');
      setSubmitErrorMessage(result.error || '');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="pt-[220px] md:pt-[275px] pb-24 px-4 md:px-6 relative min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="mb-14">
          <span className="text-xs font-display font-black text-brand-red uppercase tracking-widest bg-brand-red/10 px-4 py-2 rounded-full mb-4 inline-block">
            {isSlovenian ? "RAZPISANI TERMINI IN REZERVACIJE" : "SCHEDULED SESSIONS & RESERVATIONS"}
          </span>
          <h1 className="text-4xl md:text-7xl font-display font-black uppercase leading-[1.0] tracking-tight mb-4 text-slate-950">
            {t('calendar_page.title_start')} <span className="text-brand-red inline-block">{t('calendar_page.title_brand')}</span>
          </h1>
          <p className="text-lg text-slate-600 font-semibold max-w-2xl leading-relaxed">
            {isSlovenian 
              ? "Preglejte koledar naših tehnoloških delavnic in si zagotovite svoje mesto. Kliknite na označen datum za ogled podrobnosti in enostavno spletno prijavo."
              : "Browse our calendar of high-tech workshops and reserve your spot. Click on highlighted dates to view descriptions and submit your registration."}
          </p>
        </div>

        {/* Dynamic Interactive Panel */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mb-16">
          
          {/* Calendar View Container */}
          <div className="play-card p-6 md:p-8 border-2 border-slate-950/10 bg-white shadow-xl relative flex flex-col justify-between">
            <div>
              {/* Calendar Header Navigation */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3.5xl font-display font-black uppercase text-slate-950 select-none">
                  {format(currentMonth, dateFormat, { locale: currentLocale })}
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={prevMonth}
                    className="w-11 h-11 border-2 border-slate-200 hover:border-slate-900 rounded-full flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all text-slate-800"
                    title={isSlovenian ? "Prejšnji mesec" : "Previous month"}
                  >
                    <ChevronLeft size={20} className="stroke-[2.5]" />
                  </button>
                  <button 
                    onClick={nextMonth}
                    className="w-11 h-11 border-2 border-slate-200 hover:border-slate-900 rounded-full flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all text-slate-800"
                    title={isSlovenian ? "Naslednji mesec" : "Next month"}
                  >
                    <ChevronRight size={20} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Weekdays Row */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {[
                  t('calendar_page.mon'), 
                  t('calendar_page.tue'), 
                  t('calendar_page.wed'), 
                  t('calendar_page.thu'), 
                  t('calendar_page.fri'), 
                  t('calendar_page.sat'), 
                  t('calendar_page.sun')
                ].map(day => (
                  <div key={day} className="text-center text-xs font-display font-black uppercase tracking-wider text-play-pink py-2 bg-play-pink/8 rounded-2xl select-none">
                    {day}
                  </div>
                ))}
              </div>

               {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2 md:gap-3">
                {calendarDays.map((date, idx) => {
                  const dayEvents = events.filter(event => isSameDay(event.date, date));
                  const hasEvents = dayEvents.length > 0;
                  const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                  const isCurrentMonth = isSameMonth(date, monthStart);
                  
                  // Check if this belongs to the graphene or printcut workshop series
                  const isGrapheneEvent = dayEvents.some(e => e.id.startsWith('graphene'));
                  const isPrintCutEvent = dayEvents.some(e => e.id.startsWith('printcut'));

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (selectedDate && isSameDay(date, selectedDate)) {
                          setSelectedDate(null);
                        } else {
                          setSelectedDate(date);
                        }
                        setShowMoreDetails(false);
                      }}
                      className={`
                        relative aspect-square p-2 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center select-none cursor-pointer
                        ${isCurrentMonth ? 'text-slate-900 font-bold' : 'text-slate-500 font-semibold'}
                        ${isSelected 
                          ? 'bg-slate-950 border-slate-950 text-white shadow-[0_6px_0_0_rgba(222,59,59,0.3)] -translate-y-1' 
                          : 'bg-slate-50 border-slate-100 hover:border-brand-red/40 hover:bg-white'}
                      `}
                    >
                      <span className="text-base md:text-lg font-display font-black">{format(date, 'd')}</span>
                      
                      {hasEvents && (
                        <div className="flex gap-1 justify-center mt-auto w-full">
                          {isGrapheneEvent ? (
                            <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-brand-red border border-white' : 'bg-brand-red animate-pulse'}`} title={isSlovenian ? "Grafenski čip" : "Graphene Chip"} />
                          ) : isPrintCutEvent ? (
                            <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-play-teal border border-white' : 'bg-play-teal animate-pulse'}`} title={isSlovenian ? "Natisni in izreži" : "Print & Cut"} />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-400" />
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Map & Directions Tip */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-700 font-bold select-none">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red inline-block" />
                {isSlovenian ? "Grafenski čip" : "Graphene chip series"}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-play-teal inline-block" />
                {isSlovenian ? "Natisni in izreži" : "Print & Cut series"}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                {isSlovenian ? "Spremljevalne delavnice" : "Other workshops"}
              </span>
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="flex flex-col justify-between">
            <div className="play-card p-6 md:p-8 border-2 border-slate-950/10 bg-white shadow-xl relative min-h-[420px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-xl md:text-2xl font-display font-black uppercase flex items-center gap-2.5 text-slate-950">
                    <CalendarIcon className="text-brand-red stroke-[2.5]" size={22} />
                    {selectedDate 
                      ? format(selectedDate, 'd. MMMM yyyy', { locale: currentLocale }) 
                      : (isSlovenian ? "Aktualni delavnici" : "Featured Workshops")}
                  </h3>
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="px-3 py-1.5 rounded-xl border border-slate-250 hover:border-slate-950 text-xs font-bold transition-all text-slate-600 hover:text-slate-950 bg-slate-50 hover:bg-slate-100"
                    >
                      {isSlovenian ? "Prikaži obe" : "Show both"}
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    {selectedDayEvents.length > 0 ? (
                      selectedDayEvents.map((event) => {
                        const isGraphene = event.id.startsWith('graphene');
                        const isPrintCut = event.id.startsWith('printcut');
                        return (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-left"
                          >
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className={`
                                px-2.5 py-1 rounded-xl text-[10px] font-display font-black uppercase tracking-wider
                                ${isGraphene ? 'bg-brand-red/15 text-brand-red' : isPrintCut ? 'bg-play-teal/15 text-play-teal' : 'bg-slate-100 text-slate-600'}
                              `}>
                                {t('calendar_page.workshop')}
                              </span>
                              {event.ageGroup && (
                                <span className="px-2.5 py-1 rounded-xl text-[10px] font-display font-semibold bg-slate-100 text-slate-600 uppercase tracking-wider">
                                  {isSlovenian ? `Starost: ${event.ageGroup}` : `Age: ${event.ageGroup}`}
                                </span>
                              )}
                            </div>
                            
                            {event.image && (
                              <div className="mb-5 overflow-hidden rounded-2xl border-2 border-slate-950/10 shadow-sm">
                                <img
                                  src={event.image}
                                  alt={event.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-auto block hover:scale-[1.03] transition-transform duration-300"
                                />
                              </div>
                            )}

                            <h4 className="font-display font-black text-xl md:text-2xl mb-4 text-slate-950 leading-tight">
                              {event.title}
                            </h4>
                            
                            <div className="space-y-2 mb-5">
                              <div className="flex items-start gap-2.5 text-xs text-slate-600 font-semibold bg-slate-50 px-3 py-2 border border-slate-100 rounded-xl leading-relaxed">
                                <Clock size={15} className="text-brand-red stroke-[2.5] shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-bold text-slate-800">{event.time}</p>
                                  <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">
                                    {isGraphene 
                                      ? (isSlovenian ? "Enkrat tedensko, 6 tednov" : "Once a week, 6 weeks") 
                                      : isPrintCut
                                        ? (isSlovenian ? "Enkrat tedensko, 8 tednov" : "Once a week, 8 weeks")
                                        : (isSlovenian ? "Enkratni termin" : "Single session")}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-2.5 text-xs text-slate-600 font-semibold bg-slate-50 px-3 py-2 border border-slate-100 rounded-xl leading-relaxed">
                                <MapPin size={15} className="text-brand-red stroke-[2.5] shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-bold text-slate-800">{event.location}</p>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-slate-600 text-sm font-semibold leading-relaxed mb-6 bg-brand-red/[0.02] border-l-2 border-brand-red/40 pl-3 py-1">
                              {event.description}
                            </p>

                            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 mb-6 space-y-3 text-xs font-semibold text-slate-700">
                              <div className="flex items-center gap-2 text-brand-red font-bold">
                                <Sparkles size={14} className="stroke-[2.5]" />
                                <span>
                                  {isSlovenian 
                                    ? "Brezplačna udeležba • Število mest je omejeno!" 
                                    : "Free of charge • Limited slots available!"}
                                </span>
                              </div>
                              <div className="border-t border-slate-200/60 pt-2.5 space-y-1">
                                {isGraphene ? (
                                  <>
                                    <p><span className="text-slate-900 font-extrabold">{isSlovenian ? "Mentor:" : "Mentor:"}</span> Prof. dr. Egon Pavlica (<a href="mailto:egon.pavlica@ung.si" className="text-brand-red hover:underline font-bold">egon.pavlica@ung.si</a>)</p>
                                    <p><span className="text-slate-900 font-extrabold">{isSlovenian ? "Somentor:" : "Co-mentor:"}</span> Dr. Vadym Tkachuk (<a href="mailto:vadym.tkachuk@ung.si" className="text-brand-red hover:underline font-bold">vadym.tkachuk@ung.si</a>)</p>
                                  </>
                                ) : isPrintCut ? (
                                  <>
                                    <p><span className="text-slate-900 font-extrabold">{isSlovenian ? "Mentor:" : "Mentor:"}</span> Uroš Polanc (<a href="mailto:info@startlab.si" className="text-brand-red hover:underline font-bold">info@startlab.si</a>)</p>
                                    <p><span className="text-slate-900 font-extrabold">{isSlovenian ? "Lokacija:" : "Location:"}</span> Start Lab, Solkan</p>
                                  </>
                                ) : (
                                  <p><span className="text-slate-900 font-extrabold">{isSlovenian ? "Mentor:" : "Mentor:"}</span> Start Lab ekipa (<a href="mailto:info@startlab.si" className="text-brand-red hover:underline font-bold">info@startlab.si</a>)</p>
                                )}
                              </div>
                            </div>

                            {/* Toggle More Details Button */}
                            {(isGraphene || isPrintCut) && (
                              <div className="mb-6 border-t border-b border-slate-200/60 py-3">
                                <button
                                  type="button"
                                  onClick={() => setShowMoreDetails(!showMoreDetails)}
                                  className={`w-full flex items-center justify-between text-xs font-display font-black uppercase hover:opacity-80 transition-colors py-1 cursor-pointer select-none ${isGraphene ? 'text-brand-red' : 'text-play-teal'}`}
                                >
                                  <span>{isSlovenian ? "Več o delavnici" : "More about the workshop"}</span>
                                  <span className="text-xs">{showMoreDetails ? "▲" : "▼"}</span>
                                </button>
                                
                                <AnimatePresence>
                                  {showMoreDetails && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="pt-4 pb-2 space-y-4 text-left border-t border-slate-100 mt-3 text-slate-800 text-xs leading-relaxed font-semibold">
                                        {isGraphene ? (
                                          <>
                                            <p className="font-extrabold text-sm text-slate-950">
                                              {isSlovenian 
                                                ? "Delavnica izdelave grafenskega čipa" 
                                                : "Graphene Chip Fabrication Workshop"}
                                            </p>
                                            
                                            <p className="text-brand-red font-bold">
                                              {isSlovenian 
                                                ? "Odkrij material prihodnosti in izdelaj svoj prvi grafenski tranzistor!"
                                                : "Discover the material of the future and fabricate your first graphene transistor!"}
                                            </p>

                                            <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 space-y-2">
                                              <p className="font-extrabold text-slate-900">
                                                {isSlovenian 
                                                  ? "Kako nastane čip? Kaj je grafen?" 
                                                  : "How is a chip born? What is graphene?"}
                                              </p>
                                              <p className="text-[11px] text-slate-700 leading-normal">
                                                {isSlovenian 
                                                  ? "Udeleženci bodo stopili v vlogo raziskovalcev in izdelali grafenski tranzistor – elektronsko stikalo, ki predstavlja osnovni gradnik vseh sodobnih naprav."
                                                  : "Participants step into the shoes of research scientists to fabricate a graphene transistor – the fundamental electronic switch."}
                                              </p>
                                            </div>

                                            <div className="space-y-3">
                                              <div className="border-l-2 border-brand-red pl-2.5">
                                                <p className="font-bold text-slate-950">{isSlovenian ? "🔬 Vrhunsko mentorstvo" : "🔬 Academic Mentors"}</p>
                                                <div className="mt-1.5 text-[10px] text-slate-600 bg-slate-50 border border-slate-100 rounded-lg p-2 space-y-0.5">
                                                  <p><strong>{isSlovenian ? "Mentor:" : "Mentor:"}</strong> Prof. dr. Egon Pavlica (<a href="mailto:egon.pavlica@ung.si" className="text-brand-red hover:underline">egon.pavlica@ung.si</a>)</p>
                                                  <p><strong>{isSlovenian ? "Somentor:" : "Co-mentor:"}</strong> Dr. Vadym Tkachuk (<a href="mailto:vadym.tkachuk@ung.si" className="text-brand-red hover:underline">vadym.tkachuk@ung.si</a>)</p>
                                                </div>
                                                <p className="text-[11px] text-slate-700 leading-normal">
                                                  {isSlovenian 
                                                    ? "Pod vodstvom raziskovalcev Laboratorija za fiziko organskih snovi (LFOS) Univerze v Novi Gorici neposredno v prostorih Start Laba v Solkanu."
                                                    : "Under the guidance of researchers from the Laboratory for Organic Matter Physics (LFOS) of the University of Nova Gorica at the Start Lab premises in Solkan."}
                                                </p>
                                              </div>

                                              <div className="border-l-2 border-brand-red pl-2.5">
                                                <p className="font-bold text-slate-950">{isSlovenian ? "⚡ Material prihodnosti" : "⚡ Silicon Successor"}</p>
                                                <p className="text-[11px] text-slate-700 leading-normal">
                                                  {isSlovenian 
                                                    ? "Grafen je najbolj obetaven naslednik silicija, saj omogoča hitrejšo, učinkovitejšo in neprimerljivo varčnejšo elektroniko."
                                                    : "Graphene is the most promising successor to silicon, enabling faster and more efficient electronics."}
                                                </p>
                                              </div>

                                              <div className="border-l-2 border-brand-red pl-2.5">
                                                <p className="font-bold text-slate-950">{isSlovenian ? "📅 Urnik in lokacije delavnic" : "📅 Workshop Schedule & Locations"}</p>
                                                <div className="mt-2 space-y-1 bg-slate-50 border border-slate-100 rounded-lg p-2.5 font-mono text-[10px] text-slate-800">
                                                  <p className="flex justify-between border-b border-slate-100 pb-1">
                                                    <span><strong>7. 9.</strong> 17:00 - 19:00</span>
                                                    <span className="text-brand-red">Solkan (Sklop 1)</span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1">
                                                    <span><strong>14. 9.</strong> 17:00 - 19:00</span>
                                                    <span className="text-brand-red">Solkan (Sklop 2)</span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1 bg-brand-red/5 px-1 rounded">
                                                    <span><strong>18. 9.</strong> 16h - 18h</span>
                                                    <span className="text-brand-red font-semibold text-right">
                                                      {isSlovenian ? "predstavitev LFOS Ajdovščina (opcija)" : "presentation of LFOS Ajdovščina (optional)"}
                                                    </span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1">
                                                    <span><strong>21. 9.</strong> 17:00 - 19:00</span>
                                                    <span className="text-brand-red">Solkan (Sklop 3)</span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1 bg-brand-red/5 px-1 rounded">
                                                    <span><strong>25. 9.</strong> 17h - 19h</span>
                                                    <span className="text-brand-red font-semibold text-right">
                                                      {isSlovenian ? "ogled čiste sobe in litografije v LFOS Ajdovščina (Sklop 4)" : "cleanroom tour and lithography at LFOS Ajdovščina (Part 4)"}
                                                    </span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1">
                                                    <span><strong>28. 9.</strong> 17:00 - 19:00</span>
                                                    <span className="text-brand-red">Solkan (Sklop 5)</span>
                                                  </p>
                                                  <p className="flex justify-between pt-1">
                                                    <span><strong>5. 10.</strong> 17:00 - 19:00</span>
                                                    <span className="text-brand-red">Solkan (Sklop 6)</span>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="border-t border-slate-200 pt-3">
                                              <p className="font-extrabold text-slate-950 mb-2">{isSlovenian ? "Kaj boste počeli?" : "What you will experience:"}</p>
                                              <ul className="space-y-1.5 list-decimal list-inside text-[11px] text-slate-700">
                                                {(isSlovenian 
                                                  ? [
                                                      "Izdelali grafen iz grafita in ga opazovali z mikroskopom",
                                                      "Načrtovali elektrode grafenskega tranzistorja na vezju",
                                                      "S pomočjo računalniške simulacije preverili delovanje",
                                                      "Spoznali postopek optične litografije v laboratoriju",
                                                      "Ogledali si delo v čisti sobi (cleanroom) raziskovalnega centra",
                                                      "Izvedli električne meritve svojega grafenskega tranzistorja"
                                                    ] 
                                                  : [
                                                      "Synthesize graphene from graphite and characterize it with high-power microscopes",
                                                      "Design micro-electrodes for the customized graphene transistor layout",
                                                      "Perform software-driven microarchitectural computer simulations",
                                                      "Master the physical fundamentals of optical photolithography steps",
                                                      "Tour and observe cleanrooms within professional physics facilities",
                                                      "Run real electrical sweep and measurement operations on your fabricated chip"
                                                    ]
                                                ).map((item, i) => (
                                                  <li key={i} className="pl-1 leading-normal">{item}</li>
                                                ))}
                                              </ul>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <p className="font-extrabold text-sm text-slate-950">
                                              {isSlovenian 
                                                ? "Natisni in izreži: 3D modeliranje, tisk in laserski razrez" 
                                                : "Print & Cut: 3D Modeling, Printing & Laser Cutting"}
                                            </p>
                                            
                                            <p className="text-play-teal font-bold">
                                              {isSlovenian 
                                                ? "Od ideje do pravega izdelka pod vodstvom izkušenega mentorja Uroša Polanca!"
                                                : "From idea to physical product guided by our experienced mentor Uroš Polanc!"}
                                            </p>

                                            <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 space-y-2">
                                              <p className="font-extrabold text-slate-900">
                                                {isSlovenian 
                                                  ? "Spoznaj orodja inženirjev in oblikovalcev" 
                                                  : "Learn the tools of professional engineers"}
                                              </p>
                                              <p className="text-[11px] text-slate-700 leading-normal">
                                                {isSlovenian 
                                                  ? "Imaš idejo za predmet? Obesek, model avtomobila, stojalo za telefon, robot, karkoli — na tej delavnici ga bomo skupaj ustvarili od začetka do konca. Ne potrebuješ predhodnih izkušenj!"
                                                  : "Have an idea? A keychain, car model, phone stand, robot — we will build it together from scratch. No prior experience is required!"}
                                              </p>
                                            </div>

                                            <div className="space-y-3">
                                              <div className="border-l-2 border-play-teal pl-2.5">
                                                <p className="font-bold text-slate-950">{isSlovenian ? "🧑‍🏫 Mentor delavnice" : "🧑‍🏫 Instructor"}</p>
                                                <p className="text-[11px] text-slate-700 leading-normal">
                                                  {isSlovenian 
                                                    ? "Delavnico vodi Uroš Polanc, izkušen mentor in strokovnjak za digitalno fabrikacijo. Pomagal ti bo prehoditi pot od računalniškega 3D modela do delujočega izdelka."
                                                    : "The workshop is led by Uroš Polanc, an experienced digital fabrication expert. He will guide you through drafting in 3D to holding the final product in your hands."}
                                                </p>
                                              </div>

                                              <div className="border-l-2 border-play-teal pl-2.5">
                                                <p className="font-bold text-slate-950">{isSlovenian ? "👥 Velikost skupine" : "👥 Group Size"}</p>
                                                <p className="text-[11px] text-slate-700 leading-normal">
                                                  {isSlovenian 
                                                    ? "Skupina je omejena na največ 20 udeležencev (starost med 10 in 15 let), kar omogoča individualno podporo in varno delo z opremo."
                                                    : "The group is limited to max 20 participants (ages 10 to 15), allowing for direct 1-on-1 support and safe machine operation."}
                                                </p>
                                              </div>

                                              <div className="border-l-2 border-play-teal pl-2.5">
                                                <p className="font-bold text-slate-950">{isSlovenian ? "📅 Urnik delavnic (8 srečanj)" : "📅 Workshop Schedule (8 Sessions)"}</p>
                                                <div className="mt-2 space-y-1 bg-slate-50 border border-slate-100 rounded-lg p-2.5 font-mono text-[10px] text-slate-800">
                                                  <p className="flex justify-between border-b border-slate-100 pb-1">
                                                    <span><strong>8. 9.</strong> 17:00 - 19:00</span>
                                                    <span className="text-play-teal">Solkan (Sklop 1)</span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1">
                                                    <span><strong>15. 9.</strong> 17:00 - 19:00</span>
                                                    <span className="text-play-teal">Solkan (Sklop 2)</span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1">
                                                    <span><strong>22. 9.</strong> 17:00 - 19:00</span>
                                                    <span className="text-play-teal">Solkan (Sklop 3)</span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1">
                                                    <span><strong>29. 9.</strong> 17:00 - 19:00</span>
                                                    <span className="text-play-teal">Solkan (Sklop 4)</span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1">
                                                    <span><strong>6. 10.</strong> 17:00 - 19:00</span>
                                                    <span className="text-play-teal">Solkan (Sklop 5)</span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1">
                                                    <span><strong>13. 10.</strong> 17:00 - 19:00</span>
                                                    <span className="text-play-teal">Solkan (Sklop 6)</span>
                                                  </p>
                                                  <p className="flex justify-between border-b border-slate-100 py-1">
                                                    <span><strong>20. 10.</strong> 17:00 - 19:00</span>
                                                    <span className="text-play-teal">Solkan (Sklop 7)</span>
                                                  </p>
                                                  <p className="flex justify-between pt-1">
                                                    <span><strong>27. 10.</strong> 17:00 - 19:00</span>
                                                    <span className="text-play-teal">Solkan (Sklop 8)</span>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="border-t border-slate-200 pt-3">
                                              <p className="font-extrabold text-slate-950 mb-2">{isSlovenian ? "Kaj vse boš delal in odnesel domov?" : "What you will experience & build:"}</p>
                                              <ul className="space-y-1.5 list-decimal list-inside text-[11px] text-slate-700">
                                                {(isSlovenian 
                                                  ? [
                                                      "Z Onshape boš na računalniku narisal svoj 3D model po lastni zamisli",
                                                      "Z Bambu Studio boš model pripravil in ga natisnil na profesionalnem tiskalniku",
                                                      "Z RDWorks boš oblikoval vektorske izdelke za laserski razrez in graviranje",
                                                      "Samostojno boš upravljal laserski rezalnik in izrezal dele iz lesa ali pleksi stekla",
                                                      "Sestavil in dokončal boš svoj končni, popolnoma funkcionalen izdelek",
                                                      "Svoj unikatni izdelek (ne le maketo!) odneseš ponosno domov"
                                                    ] 
                                                  : [
                                                      "Draft your custom 3D model on a computer using Onshape CAD",
                                                      "Prepare and print your object on a professional Bambu Lab 3D printer",
                                                      "Layout high-precision vector designs for laser routing in RDWorks",
                                                      "Operate a high-power laser cutter to slice components and engrave custom graphics",
                                                      "Assemble and post-process your finished, fully functional design",
                                                      "Take your unique, custom-made product (no mockups!) home with you"
                                                    ]
                                                ).map((item, i) => (
                                                  <li key={i} className="pl-1 leading-normal">{item}</li>
                                                ))}
                                              </ul>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}

                            <button 
                              onClick={() => openRegisterModal(event)}
                              className="w-full py-4 btn-primary justify-center shadow-lg uppercase text-sm tracking-wider font-black select-none"
                            >
                              {isSlovenian ? "Prijavi se na delavnico" : "Register for workshop"} <Rocket size={18} className="stroke-[3]" />
                            </button>
                          </motion.div>
                        );
                      })
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 px-4"
                      >
                        <div className="w-16 h-16 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center mx-auto mb-4">
                          <CalendarIcon className="text-slate-300" size={24} />
                        </div>
                        <p className="text-slate-500 font-semibold text-sm">
                          {isSlovenian 
                            ? "Na ta dan ni javno načrtovanih dogodkov. Izberite označen datum na koledarju." 
                            : "No public events scheduled for this day. Please select a highlighted date on the calendar."}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Call-to-action tip at the bottom */}
              <div className="mt-8 bg-slate-100 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 leading-normal font-bold text-left">
                {isSlovenian 
                  ? "Za vsa vprašanja glede urnikov ali organizacije nas lahko kontaktirate na info@startlab.si ali preko spletnega obrazca na strani Kontakt."
                  : "For scheduling inquiries, feel free to write to us at info@startlab.si or reach out via our Contact page."}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modern Slide-over / Modal for Registration with backdrop blur and kinetic animation */}
      <AnimatePresence>
        {isModalOpen && modalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] border-2 border-slate-950/10 shadow-2xl overflow-hidden z-10 text-left"
            >
              
              {/* Header block with red accent line */}
              <div className="bg-slate-950 text-white px-6 py-6 relative">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors bg-white/5 border border-white/10 w-9 h-9 rounded-full flex items-center justify-center hover:scale-105"
                  title={isSlovenian ? "Zapri" : "Close"}
                >
                  <X size={18} />
                </button>
                <span className="text-[10px] font-display font-black text-brand-red uppercase tracking-widest bg-brand-red/15 border border-brand-red/25 px-2.5 py-1 rounded-full mb-2 inline-block">
                  {isSlovenian ? "RESERVACIJA TERMINA" : "TERM BOOKING"}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-tight leading-tight mr-8 text-white">
                  {modalEvent.title}
                </h3>
              </div>

              {/* Form and Status Screens container */}
              <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  
                  {/* Status: SUCCESS */}
                  {submitStatus === 'success' ? (
                    <motion.div
                      key="success-screen"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 bg-play-teal/10 border-2 border-play-teal/30 rounded-3xl flex items-center justify-center mx-auto mb-6 text-play-teal">
                        <CheckCircle2 size={38} className="stroke-[2.5] animate-bounce" />
                      </div>
                      <h4 className="text-2xl font-display font-black uppercase mb-3 text-slate-950">
                        {isSlovenian ? "Uspešna prijava!" : "Registration Successful!"}
                      </h4>
                      <p className="text-slate-600 font-semibold text-sm leading-relaxed mb-6">
                        {isSlovenian 
                          ? `Hvala za prijavo, ${formData.name}! Podrobnosti in navodila bomo poslali v kratkem na vaš e-poštni naslov: ${formData.email}.`
                          : `Thank you, ${formData.name}! Registration details and workshop instructions will be sent shortly to your e-mail address: ${formData.email}.`}
                      </p>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full py-4 btn-secondary select-none"
                      >
                        {isSlovenian ? "Zapri okno" : "Close window"}
                      </button>
                    </motion.div>
                  ) : submitStatus === "error" ? (
                    
                    /* Status: ERROR */
                    <motion.div
                      key="error-screen"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-6"
                    >
                      {submitErrorMessage.toLowerCase().includes("aktivacij") || submitErrorMessage.toLowerCase().includes("activate") ? (
                        <div className="text-left bg-amber-50 border-2 border-amber-500/25 rounded-3xl p-6 shadow-md font-sans">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-2xl flex items-center justify-center shrink-0">
                              <AlertTriangle size={28} className="stroke-[2.5]" />
                            </div>
                            <div>
                              <h4 className="text-lg font-display font-black uppercase text-slate-900 tracking-tight leading-none">
                                {isSlovenian ? "Aktivacija obrazca" : "Form Activation"}
                              </h4>
                              <p className="text-xs text-slate-500 font-semibold mt-1">
                                {isSlovenian ? "Enkratni korak za GitHub Pages" : "One-time setup for GitHub Pages"}
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 font-semibold leading-relaxed mb-6">
                            {isSlovenian 
                              ? "Ker spletna stran deluje na GitHub Pages (brez lastnega strežnika), se sporočila pošiljajo preko storitve FormSubmit.co. Za začetek prejemanja morate potrditi vaš e-poštni naslov."
                              : "Since the site runs on GitHub Pages (without a backend server), form submissions use FormSubmit.co. You must activate your email to start receiving messages."}
                          </p>

                          <div className="space-y-4 mb-6">
                            <div className="flex gap-3">
                              <span className="w-5 h-5 shrink-0 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold font-display">1</span>
                              <p className="text-[11px] text-slate-600 font-bold leading-normal">
                                {isSlovenian ? "Odprite poštni predal info@startlab.si." : "Open your inbox at info@startlab.si."}
                              </p>
                            </div>
                            <div className="flex gap-3">
                              <span className="w-5 h-5 shrink-0 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold font-display">2</span>
                              <p className="text-[11px] text-slate-600 font-bold leading-normal">
                                {isSlovenian 
                                  ? "Poiščite potrditveni mail od FormSubmit.co z zadevo \"Action Required: Activate ...\"."
                                  : "Find the confirmation mail from FormSubmit.co with subject \"Action Required: Activate ...\""}
                              </p>
                            </div>
                            <div className="flex gap-3">
                              <span className="w-5 h-5 shrink-0 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold font-display">3</span>
                              <p className="text-[11px] text-slate-600 font-bold leading-normal">
                                {isSlovenian ? "Kliknite na gumb \"Activate Form\" v mailu." : "Click on the \"Activate Form\" button in the email."}
                              </p>
                            </div>
                          </div>

                          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-6 text-[11px] font-semibold text-amber-800 leading-normal">
                            {isSlovenian 
                              ? "Po potrditvi bo obrazec takoj aktiviran in vsa naslednja sporočila boste prejeli neposredno v vaš predal!"
                              : "Once clicked, the form will start delivering submissions directly to your inbox immediately!"}
                          </div>

                          <button 
                            type="button"
                            onClick={() => setSubmitStatus('idle')}
                            className="w-full btn-primary py-3.5 shadow-md bg-amber-500 border-amber-500 hover:bg-amber-600 justify-center text-xs tracking-wider cursor-pointer font-bold"
                          >
                            {isSlovenian ? "Nazaj na obrazec" : "Back to form"}
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-brand-red/10 border-2 border-brand-red/30 rounded-3xl flex items-center justify-center mx-auto mb-6 text-brand-red">
                            <X size={38} className="stroke-[2.5]" />
                          </div>
                          <h4 className="text-xl font-display font-black uppercase mb-3 text-slate-950">
                            {isSlovenian ? "Ups, nekaj je šlo narobe." : "Something went wrong."}
                          </h4>
                          <p className="text-slate-600 font-semibold text-sm leading-relaxed mb-4">
                            {isSlovenian 
                              ? "Prišlo je do nepričakovane napake pri oddaji obrazca. Prosimo preverite internetno povezavo in poskusite ponovno ali nam pišite na info@startlab.si."
                              : "We experienced a temporary connectivity issue. Please retry shortly or contact us directly at info@startlab.si."}
                          </p>
                          {submitErrorMessage && (
                            <div className="bg-red-50 text-red-700 p-3 rounded-2xl text-[11px] font-mono break-all max-w-md mx-auto text-left mb-6 border border-red-100">
                              <strong>Diagnostic Error:</strong> {submitErrorMessage}
                            </div>
                          )}
                          <button
                            onClick={() => setSubmitStatus('idle')}
                            className="w-full py-4 btn-primary select-none bg-brand-red text-white justify-center"
                          >
                            {isSlovenian ? "Poskusi znova" : "Retry submission"}
                          </button>
                        </>
                      )}
                    </motion.div>
                  ) : (
                    
                    /* Status: IDLE / FORM FILLING */
                    <motion.form
                      key="form-fields"
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                    >
                      {/* Date & Time Recap */}
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-semibold text-slate-600 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon size={14} className="text-brand-red shrink-0" />
                          <span>
                            {isSlovenian ? "Izbrani termin:" : "Selected Date:"}{' '}
                            <strong className="text-slate-800">
                              {format(selectedDate || modalEvent?.date || new Date(), 'd. MMMM yyyy', { locale: currentLocale })}
                            </strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-brand-red shrink-0" />
                          <span>
                            {isSlovenian ? "Čas srečanja:" : "Meeting hour:"}{' '}
                            <strong className="text-slate-800">{modalEvent.time}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Free & Limited slots alert + Mentors info */}
                      <div className="bg-brand-red/[0.03] border border-brand-red/10 rounded-2xl p-4 text-xs font-semibold text-slate-700 space-y-2">
                        <div className="flex items-center gap-2 text-brand-red font-black uppercase tracking-wider text-[10px]">
                          <Sparkles size={13} className="stroke-[3]" />
                          <span>{isSlovenian ? "POMEMBNE INFORMACIJE" : "IMPORTANT INFORMATION"}</span>
                        </div>
                        <p className="text-slate-900 font-extrabold text-xs">
                          {isSlovenian 
                            ? "✓ Delavnice so brezplačne. Število mest je strogo omejeno!" 
                            : "✓ Workshops are free of charge. Slots are strictly limited!"}
                        </p>
                        <div className="border-t border-slate-200/50 pt-2 text-[11px] space-y-0.5 text-slate-600">
                          {modalEvent?.id.startsWith('graphene') ? (
                            <>
                              <p><strong>{isSlovenian ? "Mentor:" : "Mentor:"}</strong> Prof. dr. Egon Pavlica (<a href="mailto:egon.pavlica@ung.si" className="text-brand-red hover:underline font-bold">egon.pavlica@ung.si</a>)</p>
                              <p><strong>{isSlovenian ? "Somentor:" : "Co-mentor:"}</strong> Dr. Vadym Tkachuk (<a href="mailto:vadym.tkachuk@ung.si" className="text-brand-red hover:underline font-bold">vadym.tkachuk@ung.si</a>)</p>
                            </>
                          ) : modalEvent?.id.startsWith('printcut') ? (
                            <>
                              <p><strong>{isSlovenian ? "Mentor:" : "Mentor:"}</strong> Uroš Polanc (<a href="mailto:info@startlab.si" className="text-brand-red hover:underline font-bold">info@startlab.si</a>)</p>
                              <p><strong>{isSlovenian ? "Lokacija:" : "Location:"}</strong> Start Lab, Solkan</p>
                            </>
                          ) : (
                            <p><strong>{isSlovenian ? "Mentor:" : "Mentor:"}</strong> Start Lab ekipa (<a href="mailto:info@startlab.si" className="text-brand-red hover:underline font-bold">info@startlab.si</a>)</p>
                          )}
                        </div>
                      </div>

                      {/* Registration Scope Selector */}
                      {(modalEvent?.id.startsWith('graphene') || modalEvent?.id.startsWith('printcut')) && (
                        <div className="space-y-2 bg-slate-50 border border-slate-100 rounded-2xl p-4">
                          <label className="text-xs font-display font-black uppercase tracking-wider text-slate-800 block">
                            {isSlovenian ? "Obseg prijave:" : "Registration Scope:"}
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, sessionSelection: 'all' })}
                              className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col justify-center items-center ${formData.sessionSelection === 'all' ? 'border-brand-red bg-brand-red/5 text-slate-900 ring-2 ring-brand-red/10' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                            >
                              <span>{isSlovenian ? "Celotna delavnica" : "Full Workshop Series"}</span>
                              <span className="text-[9px] text-slate-500 font-normal mt-0.5">
                                {modalEvent?.id.startsWith('printcut') 
                                  ? (isSlovenian ? "Vseh 8 sklopov" : "All 8 parts") 
                                  : (isSlovenian ? "Vseh 6 sklopov" : "All 6 parts")}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, sessionSelection: 'single' })}
                              className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col justify-center items-center ${formData.sessionSelection === 'single' ? 'border-brand-red bg-brand-red/5 text-slate-900 ring-2 ring-brand-red/10' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                            >
                              <span>{isSlovenian ? "Samo ta sklop" : "This Session Only"}</span>
                              <span className="text-[9px] text-slate-500 font-normal mt-0.5">
                                {format(selectedDate || modalEvent?.date || new Date(), 'd. MMMM', { locale: currentLocale })}
                              </span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Inputs */}
                      <div className="space-y-1">
                        <label className="text-xs font-display font-black uppercase tracking-wider text-slate-800">
                          {isSlovenian ? "Ime in priimek udeleženca:" : "Participant's Full Name:"} <span className="text-brand-red">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={isSlovenian ? "Napiši svoje ime..." : "e.g. Liam Novak..."}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-display font-black uppercase tracking-wider text-slate-800">
                          {isSlovenian ? "E-poštni naslov:" : "E-mail Address:"} <span className="text-brand-red">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={isSlovenian ? "Napiši svoj e-poštni naslov..." : "example@domain.com"}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-display font-black uppercase tracking-wider text-slate-800">
                            {isSlovenian ? "Telefon:" : "Phone:"}
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder={isSlovenian ? "040 123 456..." : "+386..."}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-display font-black uppercase tracking-wider text-slate-800">
                            {isSlovenian ? "Starost (leta):" : "Age (years):"}
                          </label>
                          <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            placeholder={isSlovenian ? "npr. 15" : "e.g. 15"}
                            min="1"
                            max="99"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-display font-black uppercase tracking-wider text-slate-800">
                          {isSlovenian ? "Dodatne opombe / sporočilo:" : "Special notes / message:"}
                        </label>
                        <textarea
                          rows={3}
                          value={formData.note}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                          placeholder={isSlovenian ? "Če imaš kakšno vprašanje ali posebne zahteve..." : "Any questions or notes..."}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all focus:outline-none resize-none"
                        />
                      </div>

                      {/* Agreement Check text */}
                      <p className="text-[10px] text-slate-600 font-bold leading-relaxed">
                        {isSlovenian 
                          ? "Z oddajo obrazca se strinjate, da Start Lab uporabi vaše podatke za namen koordinacije in izvedbe izbrane delavnice skladno s Pogoji uporabe."
                          : "By submitting this form, you authorize Start Lab to hold and process your personal data for coordination and safe physical execution of this workshop series."}
                      </p>

                      <div className="pt-2 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="flex-1 py-3.5 btn-secondary justify-center text-sm font-bold uppercase select-none"
                          disabled={isSubmitting}
                        >
                          {isSlovenian ? "Prekliči" : "Cancel"}
                        </button>
                        <button
                          type="submit"
                          className="flex-2 py-3.5 btn-primary justify-center text-sm font-black uppercase select-none bg-brand-red"
                          disabled={isSubmitting}
                        >
                          {isSubmitting 
                            ? (isSlovenian ? "Prijava v teku..." : "Sending...") 
                            : (isSlovenian ? "Oddaj prijavo" : "Submit reservation")}
                        </button>
                      </div>

                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
