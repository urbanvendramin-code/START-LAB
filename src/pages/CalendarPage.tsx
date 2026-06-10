import { useState } from 'react';
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
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Rocket } from 'lucide-react';
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
}

const MOCK_EVENTS = (t: any): Event[] => [
  {
    id: '1',
    title: t('calendar_page.items.1.title', { defaultValue: '3D Modeliranje za začetnike' }),
    date: new Date(2026, 4, 15), // May 15, 2026
    time: '17:00 - 19:00',
    location: 'Start Lab Main Room',
    category: 'workshop',
    description: t('calendar_page.items.1.desc', { defaultValue: 'Spoznajte osnove 3D modeliranja v programu Fusion 360.' })
  },
  {
    id: '2',
    title: t('calendar_page.items.2.title', { defaultValue: 'Arduino Masterclass' }),
    date: new Date(2026, 4, 18),
    time: '16:30 - 18:30',
    location: 'Electronics Area',
    category: 'workshop',
    description: t('calendar_page.items.2.desc', { defaultValue: 'Programiranje Arduina za napredne projekte.' })
  },
  {
    id: '3',
    title: t('calendar_page.items.3.title', { defaultValue: 'Open Lab Day' }),
    date: new Date(2026, 4, 20),
    time: '12:00 - 20:00',
    location: 'Celotni Lab',
    category: 'open-lab',
    description: t('calendar_page.items.3.desc', { defaultValue: 'Pridite in preizkusite našo opremo brezplačno.' })
  }
];

export default function CalendarPage() {
  const { t, i18n } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 15));

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

  const events = MOCK_EVENTS(t);
  const selectedDayEvents = events.filter(event => 
    isSameDay(event.date, selectedDate)
  );

  return (
    <div className="pt-[220px] md:pt-[275px] pb-20 px-4 md:px-6 relative min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-7xl font-display font-black uppercase leading-[1.0] tracking-tight mb-4 text-slate-950">
            {t('calendar_page.title_start')} <span className="text-brand-red inline-block">{t('calendar_page.title_brand')}</span>
          </h1>
          <p className="text-lg text-slate-600 font-semibold max-w-2xl leading-relaxed">
            {t('calendar_page.subtitle')}
          </p>
        </div>

        {/* Important Notice Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mb-12 bg-play-yellow/5 border-2 border-play-yellow/30 rounded-[2rem] p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-[0_10px_0_0_#f59e0b12] relative overflow-hidden text-left"
        >
          {/* Decorative background blur element */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-play-yellow/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-14 h-14 bg-play-yellow text-slate-950 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_0_0_#f59e0b25] border border-slate-950/5">
            <CalendarIcon className="stroke-[2.5]" size={26} />
          </div>
          <div className="text-center sm:text-left flex-1">
            <span className="text-[10px] font-display font-black text-play-yellow uppercase tracking-widest bg-play-yellow/12 px-3 py-1.5 rounded-full mb-2.5 inline-block">
              {t('workshops_page.important_notice')}
            </span>
            <p className="text-lg md:text-xl font-display font-black text-slate-950 leading-tight">
              {t('calendar_page.events_soon')}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Calendar View */}
          <div className="play-card p-6 md:p-8 border-2 border-slate-950/10 bg-white shadow-xl relative">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3.5xl font-display font-black uppercase text-slate-950">
                {format(currentMonth, dateFormat, { locale: currentLocale })}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={prevMonth}
                  className="w-11 h-11 border-2 border-slate-100 rounded-full flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all text-slate-800"
                >
                  <ChevronLeft size={20} className="stroke-[2.5]" />
                </button>
                <button 
                  onClick={nextMonth}
                  className="w-11 h-11 border-2 border-slate-100 rounded-full flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all text-slate-800"
                >
                  <ChevronRight size={20} className="stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {[t('calendar_page.mon'), t('calendar_page.tue'), t('calendar_page.wed'), t('calendar_page.thu'), t('calendar_page.fri'), t('calendar_page.sat'), t('calendar_page.sun')].map(day => (
                <div key={day} className="text-center text-xs font-display font-black uppercase tracking-wider text-play-pink py-2.5 bg-play-pink/8 rounded-2xl">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 md:gap-3">
              {calendarDays.map((date, idx) => {
                const hasEvents = events.some(event => isSameDay(event.date, date));
                const isSelected = isSameDay(date, selectedDate);
                const isCurrentMonth = isSameMonth(date, monthStart);

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      relative aspect-square md:h-24 p-3 rounded-2xl border-2 transition-all flex flex-col items-start justify-start text-left
                      ${isCurrentMonth ? 'text-slate-900 font-bold' : 'text-slate-300 font-medium'}
                      ${isSelected ? 'bg-play-pink border-slate-950 text-white shadow-[0_6px_0_0_rgba(15,23,42,1)] -translate-y-0.5' : 'bg-slate-50 border-slate-100 hover:border-play-pink hover:bg-white'}
                    `}
                  >
                    <span className="text-sm font-display font-black">{format(date, 'd')}</span>
                    {hasEvents && !isSelected && (
                      <div className="mt-auto flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-play-teal shadow-md border-2 border-white animate-pulse" />
                      </div>
                    )}
                    {hasEvents && isSelected && (
                      <div className="mt-auto flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-md border-2 border-slate-900" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="play-card p-6 md:p-8 border-2 border-slate-950/10 bg-white shadow-xl relative">
              <h3 className="text-xl font-display font-black uppercase mb-6 flex items-center gap-3 text-slate-950">
                <CalendarIcon className="text-play-pink stroke-[2.5]" size={22} />
                {format(selectedDate, 'd. MMMM yyyy', { locale: currentLocale })}
              </h3>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {selectedDayEvents.length > 0 ? (
                    selectedDayEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:border-slate-950/20 transition-all group text-left"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`
                            px-2.5 py-1 rounded-xl text-[10px] font-display font-black uppercase tracking-wider
                            ${event.category === 'workshop' ? 'bg-play-blue/15 text-play-blue' : 
                              event.category === 'event' ? 'bg-play-pink/15 text-play-pink' : 
                              'bg-play-teal/15 text-play-teal'}
                          `}>
                            {event.category === 'workshop' ? t('calendar_page.workshop') : 
                             event.category === 'event' ? t('calendar_page.event') : t('calendar_page.open_lab', { defaultValue: 'Odprti laboratorij' })}
                          </span>
                        </div>
                        <h4 className="font-display font-black text-lg mb-4 text-slate-950 leading-snug group-hover:text-play-pink transition-colors">{event.title}</h4>
                        <div className="space-y-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                          <div className="flex items-center gap-2 font-display bg-white px-3 py-1.5 border border-slate-100 rounded-xl leading-none w-max">
                            <Clock size={13} className="text-brand-red stroke-[2.5]" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2 font-display bg-white px-3 py-1.5 border border-slate-100 rounded-xl leading-none w-max">
                            <MapPin size={13} className="text-brand-red stroke-[2.5]" />
                            {event.location}
                          </div>
                        </div>
                        <p className="mt-4 text-xs text-slate-600 font-semibold leading-relaxed">
                          {event.description}
                        </p>
                        <button className="mt-6 w-full py-3.5 btn-primary justify-center shadow-md">
                          {t('calendar_page.register')} <ChevronRight size={16} className="stroke-[3]" />
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 px-4"
                    >
                      <div className="w-16 h-16 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center mx-auto mb-4">
                        <CalendarIcon className="text-slate-300" size={24} />
                      </div>
                      <p className="text-slate-500 font-semibold text-sm">{t('calendar_page.no_events', { defaultValue: 'Na ta dan ni načrtovanih dogodkov.' })}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="play-card p-6 border-2 border-slate-950/10 bg-play-yellow/8 overflow-hidden relative group text-left">
              <div className="relative z-10">
                <Rocket className="text-play-pink mb-4 stroke-[2.5]" size={34} />
                <h3 className="text-xl font-display font-black uppercase mb-2 text-slate-900">{t('calendar_page.idea_title', { defaultValue: 'Imaš idejo?' })}</h3>
                <p className="text-xs text-slate-600 font-bold leading-relaxed mb-6 uppercase tracking-wide">
                  {t('calendar_page.idea_desc', { defaultValue: 'Želiš organizirati svojo delavnico ali dogodek v našem prostoru? Piši nam!' })}
                </p>
                <a href="#kontakt" className="inline-flex items-center gap-2 text-xs font-display font-black uppercase tracking-widest text-play-pink hover:underline">
                  {t('contact.title')} <ChevronRight size={16} className="stroke-[3]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
