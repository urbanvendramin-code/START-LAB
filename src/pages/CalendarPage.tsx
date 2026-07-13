import React, { useState } from 'react';
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
  Briefcase 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

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
}

const getLocalizedEvents = (lang: string): Event[] => {
  // September Mondays in 2026: 7, 14, 21, 28
  // October Mondays in 2026: 5, 12
  const grapheneDates = [
    new Date(2026, 8, 7),
    new Date(2026, 8, 14),
    new Date(2026, 8, 21),
    new Date(2026, 8, 28),
    new Date(2026, 9, 5),
    new Date(2026, 9, 12)
  ];

  const slGrapheneDesc = [
    "Izdelava grafena iz grafita in opazovanje pod optičnim mikroskopom. Spoznavanje materiala prihodnosti skozi prve fizikalne poskuse.",
    "Načrtovanje elektrod grafenskega tranzistorja. Spoznaj, kako nastajajo elektronske komponente prihodnosti.",
    "Računalniška simulacija delovanja tranzistorja. Preveri delovanje in se poglobi v delovanje vgrajenih struktur.",
    "Spoznavanje postopka optične litografije in ogled čiste sobe v laboratoriju (po dogovoru). Edinstven vpogled v vrhunski znanstveni laboratorij.",
    "Električne meritve izdelanega grafenskega tranzistorja. Preizkusi svoje vezje in izmeri njegove električne lastnosti.",
    "Priprava raziskovalnega poročila in predstavitev rezultatov. Zaključi svojo pot mladega raziskovalca in pridobi izkušnje za prihodnost."
  ];

  const enGrapheneDesc = [
    "Fabricating graphene from graphite and observing it with an optical microscope. Discovering the material of the future.",
    "Designing electrodes of a graphene transistor. Learn how future electronic components are designed.",
    "Computer simulation of transistor behavior. Verify operations and dive deep into microarchitectures.",
    "Understanding optical lithography and touring the cleanroom laboratory. A rare opportunity inside a high-tech facility.",
    "Electrical measurements of the fabricated graphene transistor. Test your device and measure electrical characteristics.",
    "Preparing a research report and presenting results. Wrap up your scientific journey and gain invaluable skills."
  ];

  const itGrapheneDesc = [
    "Fabbricazione del grafene dalla grafite e osservazione con microscopio ottico. Scopri il materiale del futuro.",
    "Progettazione degli elettrodi di un transistor al grafene. Scopri come nascono i componenti elettronici.",
    "Simulazione al computer del funzionamento del transistor. Verifica le operazioni e comprendi le microstrutture.",
    "Comprendere il processo di litografia ottica e visitare la camera bianca. Un'opportunità unica in un vero laboratorio.",
    "Misurazioni elettriche del transistor al grafene fabbricato. Metti alla prova il tuo circuito e misura le proprietà.",
    "Preparazione di una relazione di ricerca e presentazione dei risultati. Concludi il tuo viaggio scientifico."
  ];

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

  const grapheneEvents = grapheneDates.map((date, idx) => ({
    id: `graphene-session-${idx + 1}`,
    title: titleText,
    date: date,
    time: '17:00 - 19:00',
    location: isSl 
      ? 'Prostori Start Laba, Solkan' 
      : 'Start Lab Premises, Solkan',
    category: 'workshop' as const,
    description: isSl 
      ? slGrapheneDesc[idx] 
      : isEn 
        ? enGrapheneDesc[idx] 
        : itGrapheneDesc[idx],
    ageGroup: ageText,
    mentors: mentorsText
  }));

  // Add some secondary mock events to make the calendar rich and active
  const otherEvents: Event[] = [
    {
      id: 'other-1',
      title: isSl ? '3D tisk – od ideje do izdelka' : '3D Printing – From Idea to Product',
      date: new Date(2026, 8, 10), // September 10, 2026
      time: '16:00 - 18:00',
      location: 'Start Lab Main Room',
      category: 'workshop',
      description: isSl 
        ? 'Spoznajte postopek od 3D modeliranja do končnega izdelka s pomočjo 3D tiskalnikov.'
        : 'Learn the complete workflow from 3D modeling to physical objects on 3D printers.',
      ageGroup: isSl ? '10 - 18 let' : '10 - 18 years'
    },
    {
      id: 'other-2',
      title: isSl ? 'Arduino senzorji in aktuatorji' : 'Arduino Sensors and Actuators',
      date: new Date(2026, 8, 17), // September 17, 2026
      time: '16:30 - 18:30',
      location: 'Electronics Area',
      category: 'workshop',
      description: isSl 
        ? 'Spoznajte kako pametne naprave berejo podatke iz senzorjev in upravljajo zunanje naprave.'
        : 'Explore how microcontrollers read environment variables and trigger mechanical elements.',
      ageGroup: isSl ? '12 - 15 let' : '12 - 15 years'
    },
    {
      id: 'other-3',
      title: isSl ? 'Laserski razrez in graviranje' : 'Laser Cutting and Engraving',
      date: new Date(2026, 8, 24), // September 24, 2026
      time: '17:00 - 19:00',
      location: 'Start Lab Main Room',
      category: 'workshop',
      description: isSl 
        ? 'Naučite se pripraviti načrte za laserski razrez in izdelati unikatne izdelke.'
        : 'Discover how to format vector layouts for high-precision laser routing.',
      ageGroup: isSl ? '10 - 15 let' : '10 - 15 years'
    },
    {
      id: 'other-4',
      title: isSl ? 'Open Lab Day' : 'Open Lab Day',
      date: new Date(2026, 9, 3), // October 3, 2026
      time: '10:00 - 18:00',
      location: 'Celotni Lab',
      category: 'open-lab',
      description: isSl 
        ? 'Pridite, preizkusite našo opremo in se posvetujte z našimi mentorji.'
        : 'Drop by, test our high-tech instrumentation, and brainstorm your hardware ideas.',
      ageGroup: isSl ? 'Vse starosti' : 'All ages'
    }
  ];

  return [...grapheneEvents, ...otherEvents];
};

export default function CalendarPage() {
  const { t, i18n } = useTranslation();
  
  // Set default month to September 2026 (the start of the workshop)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 8, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 8, 7)); // Defaults to September 7, 2026
  
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
  const [showMoreDetails, setShowMoreDetails] = useState(false);

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
  const selectedDayEvents = events.filter(event => 
    isSameDay(event.date, selectedDate)
  );

  const isSlovenian = i18n.language !== 'en' && i18n.language !== 'it';

  const openRegisterModal = (event: Event) => {
    setModalEvent(event);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      note: '',
      sessionSelection: event.id.startsWith('graphene') ? 'all' : 'single'
    });
    setSubmitStatus('idle');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const selectedTerm = formData.sessionSelection === 'all' 
        ? (isSlovenian ? 'Celotna 6-tedenska delavnica (pričetek 7.9.2026)' : 'Full 6-week workshop (starts Sept 7, 2026)')
        : format(selectedDate, 'd. MMMM yyyy', { locale: currentLocale }) + ` (${modalEvent?.time})`;

      const response = await fetch('/api/workshop/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          workshopTitle: modalEvent?.title || 'Delavnica',
          dateSelected: selectedTerm,
          note: formData.note
        })
      });

      const resData = await response.json();
      if (resData.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
                  const isSelected = isSameDay(date, selectedDate);
                  const isCurrentMonth = isSameMonth(date, monthStart);
                  
                  // Check if this belongs to the graphene workshop series
                  const isGrapheneEvent = dayEvents.some(e => e.id.startsWith('graphene'));

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedDate(date);
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
                      
                      {hasEvents && isSameDay(date, new Date(2026, 8, 7)) && (
                        <div className="flex gap-1 justify-center mt-auto w-full">
                          {isGrapheneEvent ? (
                            <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-brand-red border border-white' : 'bg-brand-red animate-pulse'}`} title={isSlovenian ? "Grafenski čip" : "Graphene Chip"} />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-play-teal" />
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Map & Directions Tip */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700 font-bold select-none">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red inline-block" />
                {isSlovenian ? "Grafenski čip" : "Graphene chip series"}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-play-teal inline-block" />
                {isSlovenian ? "Spremljevalne delavnice" : "Other workshops"}
              </span>
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="flex flex-col justify-between">
            <div className="play-card p-6 md:p-8 border-2 border-slate-950/10 bg-white shadow-xl relative min-h-[420px] flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-display font-black uppercase mb-6 flex items-center gap-3 text-slate-950 border-b border-slate-100 pb-4">
                  <CalendarIcon className="text-brand-red stroke-[2.5]" size={22} />
                  {format(selectedDate, 'd. MMMM yyyy', { locale: currentLocale })}
                </h3>

                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    {selectedDayEvents.length > 0 ? (
                      selectedDayEvents.map((event) => {
                        const isGraphene = event.id.startsWith('graphene');
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
                                ${isGraphene ? 'bg-brand-red/15 text-brand-red' : 'bg-play-teal/15 text-play-teal'}
                              `}>
                                {t('calendar_page.workshop')}
                              </span>
                              {event.ageGroup && (
                                <span className="px-2.5 py-1 rounded-xl text-[10px] font-display font-semibold bg-slate-100 text-slate-600 uppercase tracking-wider">
                                  {isSlovenian ? `Starost: ${event.ageGroup}` : `Age: ${event.ageGroup}`}
                                </span>
                              )}
                            </div>
                            
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
                                <p><span className="text-slate-900 font-extrabold">{isSlovenian ? "Mentor:" : "Mentor:"}</span> Prof. dr. Egon Pavlica (<a href="mailto:egon.pavlica@ung.si" className="text-brand-red hover:underline font-bold">egon.pavlica@ung.si</a>)</p>
                                <p><span className="text-slate-900 font-extrabold">{isSlovenian ? "Somentor:" : "Co-mentor:"}</span> Dr. Vadym Tkachuk (<a href="mailto:vadym.tkachuk@ung.si" className="text-brand-red hover:underline font-bold">vadym.tkachuk@ung.si</a>)</p>
                              </div>
                            </div>

                            {/* Toggle More Details Button */}
                            {isGraphene && (
                              <div className="mb-6 border-t border-b border-slate-200/60 py-3">
                                <button
                                  type="button"
                                  onClick={() => setShowMoreDetails(!showMoreDetails)}
                                  className="w-full flex items-center justify-between text-xs font-display font-black uppercase text-brand-red hover:text-brand-red/80 transition-colors py-1 cursor-pointer select-none"
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
                                            <p className="font-bold text-slate-950">{isSlovenian ? "📅 Trajanje in skupine" : "📅 Format & Cohorts"}</p>
                                            <p className="text-[11px] text-slate-700 leading-normal">
                                              {isSlovenian 
                                                ? "Poteka 6 zaporednih tednov, enkrat tedensko, v prostorih Start Laba v Solkanu."
                                                : "Spans 6 consecutive weeks, once per week, hosted at the Start Lab premises in Solkan."}
                                            </p>
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
                          ? `Hvala za prijavo, ${formData.name}! Podrobnosti o delavnici in navodila smo poslali na tvoj e-poštni naslov: ${formData.email}. Kmalu se slišimo!`
                          : `Thank you, ${formData.name}! Registration details and lab location directives have been dispatched to ${formData.email}. See you soon!`}
                      </p>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full py-4 btn-secondary select-none"
                      >
                        {isSlovenian ? "Zapri okno" : "Close window"}
                      </button>
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    
                    /* Status: ERROR */
                    <motion.div
                      key="error-screen"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 bg-brand-red/10 border-2 border-brand-red/30 rounded-3xl flex items-center justify-center mx-auto mb-6 text-brand-red">
                        <X size={38} className="stroke-[2.5]" />
                      </div>
                      <h4 className="text-xl font-display font-black uppercase mb-3 text-slate-950">
                        {isSlovenian ? "Ups, nekaj je šlo narobe." : "Something went wrong."}
                      </h4>
                      <p className="text-slate-600 font-semibold text-sm leading-relaxed mb-6">
                        {isSlovenian 
                          ? "Prišlo je do nepričakovane napake pri oddaji obrazca. Prosimo preverite internetno povezavo in poskusite ponovno ali nam pišite na info@startlab.si."
                          : "We experienced a temporary connectivity issue. Please retry shortly or contact us directly at info@startlab.si."}
                      </p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        className="w-full py-4 btn-primary select-none bg-brand-red text-white justify-center"
                      >
                        {isSlovenian ? "Poskusi znova" : "Retry submission"}
                      </button>
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
                              {format(selectedDate, 'd. MMMM yyyy', { locale: currentLocale })}
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
                          <p><strong>{isSlovenian ? "Mentor:" : "Mentor:"}</strong> Prof. dr. Egon Pavlica (<a href="mailto:egon.pavlica@ung.si" className="text-brand-red hover:underline font-bold">egon.pavlica@ung.si</a>)</p>
                          <p><strong>{isSlovenian ? "Somentor:" : "Co-mentor:"}</strong> Dr. Vadym Tkachuk (<a href="mailto:vadym.tkachuk@ung.si" className="text-brand-red hover:underline font-bold">vadym.tkachuk@ung.si</a>)</p>
                        </div>
                      </div>

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
