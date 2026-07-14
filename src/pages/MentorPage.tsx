import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { submitForm } from '../utils/formSubmit';
import { 
  Target, 
  Users, 
  CheckCircle2,
  ArrowRight,
  BookOpen,
  ChevronDown,
  AlertTriangle,
  Loader2
} from 'lucide-react';

interface Mentor {
  name: string;
  role: string;
  image?: string;
  bg: string;
  badgeColor: string;
  desc: string;
}

function MentorCard({ mentor }: { mentor: Mentor; key?: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const paragraphs = mentor.desc.split('\n\n');
  const firstParagraph = paragraphs[0] || '';
  const remainingParagraphs = paragraphs.slice(1);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`rounded-[2.5rem] border-2 bg-white p-6 md:p-10 transition-all flex flex-col md:flex-row gap-8 items-center md:items-start shadow-[0_12px_24px_rgba(15,23,42,0.02)] hover:shadow-xl hover:border-[#00a896]/20 ${mentor.bg}`}
    >
      <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-[2rem] overflow-hidden border-4 border-white shadow-md bg-slate-50 flex items-center justify-center">
        {mentor.image ? (
          <img 
            src={mentor.image} 
            alt={mentor.name} 
            className="w-full h-full object-cover rounded-[2rem]"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-play-pink/20 to-play-purple/20 flex items-center justify-center text-play-pink font-display font-black text-3xl md:text-5xl select-none">
            {mentor.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <div className="flex-1 w-full text-left">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-4 py-1.5 rounded-full font-display font-black text-xs tracking-wider ${mentor.badgeColor}`}>
            {mentor.name}
          </span>
          <span className="text-[10px] font-display font-black text-slate-400 uppercase tracking-widest block sm:inline">
            {mentor.role}
          </span>
        </div>
        
        <div className="space-y-4 text-sm text-slate-600 font-semibold leading-relaxed font-sans whitespace-pre-line text-left">
          <p>{firstParagraph}</p>
          
          {isExpanded && remainingParagraphs.map((para, i) => (
            <motion.p 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="mt-4"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {paragraphs.length > 1 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-100 text-xs font-display font-black uppercase tracking-widest text-[#00a896] hover:bg-[#00a896]/5 hover:border-[#00a896]/30 transition-all cursor-pointer shadow-sm focus:outline-none"
          >
            <span>{isExpanded ? t('partner_page.read_less') : t('partner_page.read_more')}</span>
            <ChevronDown size={14} className={`stroke-[3.5] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function MentorPage() {
  const { t } = useTranslation();

  const [mentorStatus, setMentorStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mentorErrorMessage, setMentorErrorMessage] = useState('');
  const [mentorName, setMentorName] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorArea, setMentorArea] = useState('');
  const [mentorMessage, setMentorMessage] = useState('');

  const handleMentorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMentorStatus('loading');
    setMentorErrorMessage('');

    const result = await submitForm(
      '/api/contact/mentor',
      { mentorName, mentorEmail, mentorArea, mentorMessage },
      `Start Lab Mentorstvo - ${mentorName}`
    );

    if (result.success) {
      setMentorStatus('success');
      setMentorName('');
      setMentorEmail('');
      setMentorArea('');
      setMentorMessage('');
    } else {
      setMentorStatus('error');
      setMentorErrorMessage(result.error || 'Neznana napaka pri pošiljanju.');
    }
  };

  return (
    <div className="pt-[220px] md:pt-[275px] pb-20 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Mentor Content and Form Row */}
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase leading-[1.0] tracking-tight mb-8 text-slate-950">
              {t('partner_page.mentors_title_start')} <br />
              <span className="text-brand-red inline-block mt-2">{t('partner_page.mentors_title_brand')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 font-semibold mb-10 leading-relaxed">
              {t('partner_page.mentors_subtitle')}
            </p>

            <div className="rounded-[2.5rem] overflow-hidden bg-slate-100 p-2.5 border-2 border-slate-900/10 mb-12 shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
               <img 
                 src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80" 
                 alt="Mentors guiding youth with technology" 
                 className="w-full h-80 object-cover rounded-[2rem]"
                 referrerPolicy="no-referrer"
               />
            </div>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 bg-play-teal/12 border-2 border-play-teal/20 rounded-2xl flex items-center justify-center text-play-teal shadow-[0_4px_0_0_#0d94881a]">
                  <Target size={26} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display font-black uppercase mb-2 text-slate-900 text-base md:text-lg">{t('partner_page.mentors_colab_title')}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{t('partner_page.mentors_colab_desc')}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 bg-play-blue/12 border-2 border-play-blue/20 rounded-2xl flex items-center justify-center text-play-blue shadow-[0_4px_0_0_#2563eb1a]">
                  <BookOpen size={26} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display font-black uppercase mb-2 text-slate-900 text-base md:text-lg">{t('partner_page.mentors_offer_title')}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed font-sans">{t('partner_page.mentors_offer_desc')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 play-card p-8 md:p-12 border-2 border-slate-950/10 bg-white shadow-xl relative"
          >
            <h2 className="text-2xl font-display font-black uppercase mb-8 flex items-center gap-3 text-slate-950">
              <Users className="text-play-teal stroke-[2.5]" size={28} />
              {t('partner_page.mentors_form_title')}
            </h2>

            {mentorStatus === 'success' ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-play-teal/15 text-play-teal border-2 border-play-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="stroke-[3]" />
                </div>
                <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">{t('partner_page.thanks')}</h3>
                <p className="text-slate-600 font-semibold">{t('partner_page.callback')}</p>
                <button 
                  onClick={() => setMentorStatus('idle')}
                  className="mt-8 text-play-teal font-display font-black uppercase text-xs tracking-wider hover:underline cursor-pointer"
                >
                  {t('partner_page.new_request')}
                </button>
              </div>
            ) : mentorStatus === 'error' ? (
              <div className="text-center py-12 px-4 md:px-8">
                {mentorErrorMessage.toLowerCase().includes('aktivacij') || mentorErrorMessage.toLowerCase().includes('activate') ? (
                  <div className="text-left max-w-lg mx-auto bg-amber-50 border-2 border-amber-500/25 rounded-3xl p-6 md:p-8 shadow-md font-sans">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-2xl flex items-center justify-center shrink-0">
                        <AlertTriangle size={28} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-display font-black uppercase text-slate-900 tracking-tight leading-none">
                          Potrebna je aktivacija obrazca
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold mt-1">
                          Enkratni korak za delovanje na GitHub Pages
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 font-semibold leading-relaxed mb-6">
                      Ker je spletna stran naložena na GitHub Pages (brez lastnega strežnika), se sporočila pošiljajo preko varne storitve <strong>FormSubmit.co</strong> direktno iz brskalnika. Za začetek prejemanja morate potrditi vaš e-poštni naslov.
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex gap-3">
                        <span className="w-6 h-6 shrink-0 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold font-display">1</span>
                        <p className="text-xs text-slate-600 font-bold leading-normal">
                          Odprite poštni predal <strong>info@startlab.si</strong>.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-6 h-6 shrink-0 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold font-display">2</span>
                        <p className="text-xs text-slate-600 font-bold leading-normal">
                          Poiščite sporočilo od pošiljatelja <strong>FormSubmit.co</strong> z zadevo <em>"Action Required: Activate ..."</em>.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <span className="w-6 h-6 shrink-0 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold font-display">3</span>
                        <p className="text-xs text-slate-600 font-bold leading-normal">
                          Kliknite na gumb <strong>"Activate Form"</strong> v prejetem mailu.
                        </p>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-8 text-xs font-semibold text-amber-800 leading-normal">
                      Ko enkrat kliknete to povezavo, bo obrazec takoj začel delovati in vsa bodoča sporočila boste prejeli na <strong>info@startlab.si</strong>!
                    </div>

                    <button 
                      type="button"
                      onClick={() => setMentorStatus('idle')}
                      className="w-full btn-primary py-3.5 shadow-md bg-play-teal border-play-teal hover:bg-play-teal/90 justify-center text-xs tracking-wider cursor-pointer font-bold animate-pulse"
                    >
                      Nazaj na obrazec
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-brand-red/15 text-brand-red border-2 border-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertTriangle size={40} className="stroke-[3]" />
                    </div>
                    <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">Napaka pri pošiljanju</h3>
                    <p className="text-slate-600 font-semibold max-w-md mx-auto mb-4">Sporočila ni bilo mogoče poslati. Preverite nastavitve ali poskusite ponovno.</p>
                    <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-xs font-mono break-all max-w-md mx-auto text-left mb-8 border border-red-100">
                      <strong>Diagnostic Error:</strong> {mentorErrorMessage}
                    </div>
                    <button 
                      onClick={() => setMentorStatus('idle')}
                      className="btn-primary py-3 px-8 shadow-md bg-play-teal border-play-teal hover:bg-play-teal/90"
                    >
                      Poskusi ponovno
                    </button>
                  </>
                )}
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleMentorSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.mentors_name_label')}</label>
                    <input 
                      required 
                      type="text" 
                      value={mentorName}
                      disabled={mentorStatus === 'loading'}
                      onChange={(e) => setMentorName(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium disabled:opacity-50" 
                      placeholder="..." 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.email')}</label>
                    <input 
                      required 
                      type="email" 
                      value={mentorEmail}
                      disabled={mentorStatus === 'loading'}
                      onChange={(e) => setMentorEmail(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium disabled:opacity-50" 
                      placeholder="..." 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.mentors_expertise_label')}</label>
                  <input 
                    required 
                    type="text" 
                    value={mentorArea}
                    disabled={mentorStatus === 'loading'}
                    onChange={(e) => setMentorArea(e.target.value)}
                    className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium disabled:opacity-50" 
                    placeholder={t('partner_page.mentors_expertise_placeholder')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.message')}</label>
                  <textarea 
                    rows={5} 
                    value={mentorMessage}
                    disabled={mentorStatus === 'loading'}
                    onChange={(e) => setMentorMessage(e.target.value)}
                    className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium resize-none disabled:opacity-50" 
                    placeholder={t('partner_page.mentors_message_placeholder')}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={mentorStatus === 'loading'}
                  className="btn-primary w-full justify-center group py-4 mt-2 shadow-lg bg-play-teal border-play-teal hover:bg-play-teal/90 flex items-center gap-2 justify-center disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {mentorStatus === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Pošiljanje...
                    </>
                  ) : (
                    <>
                      {t('partner_page.submit')} 
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform stroke-[3]" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center mt-6 font-bold leading-relaxed">
                  {t('partner_page.mentors_agreement')}
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* Mentors Cards Grid Section */}
        <div id="mentorji" className="mt-24 md:mt-32 pt-20 border-t border-slate-900/10">
          <div className="text-center">
            <h2 className="text-3.5xl md:text-5xl font-display font-black uppercase tracking-tight mb-4 text-slate-950">
              {t('mentors.title')}
            </h2>
            <p className="text-slate-500 font-semibold mb-12 max-w-xl mx-auto italic">
              {t('mentors.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto text-left">
                {[
                  { 
                    name: "Uroš Polanc",
                    role: t('mentors.uros.role'),
                    image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1780571436/1563522851336_jmb4il.jpg",
                    bg: "bg-play-teal/5 border-play-teal/15 hover:border-play-teal/35 text-play-teal hover:scale-[1.01]", 
                    badgeColor: "bg-play-teal/12 text-play-teal",
                    desc: t('mentors.uros.desc') 
                  },
                  { 
                    name: "dr. Egon Pavlica",
                    role: t('mentors.egon.role'),
                    image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781090371/image_1_gdzusa.png",
                    bg: "bg-play-pink/5 border-play-pink/15 hover:border-play-pink/35 text-play-pink hover:scale-[1.01]", 
                    badgeColor: "bg-play-pink/12 text-play-pink",
                    desc: t('mentors.egon.desc') 
                  },
                  { 
                    name: "Borut Fiorelli",
                    role: t('mentors.borut.role'),
                    image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781090371/image_2_jtawyc.png",
                    bg: "bg-play-blue/5 border-play-blue/15 hover:border-play-blue/35 text-play-blue hover:scale-[1.01]", 
                    badgeColor: "bg-play-blue/12 text-play-blue",
                    desc: t('mentors.borut.desc') 
                  },
                  { 
                    name: "Kevin Peršolja",
                    role: t('mentors.kevin.role'),
                    image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781244441/13356_ijcjad.jpg",
                    bg: "bg-play-purple/5 border-play-purple/15 hover:border-play-purple/35 text-play-purple hover:scale-[1.01]", 
                    badgeColor: "bg-play-purple/12 text-play-purple",
                    desc: t('mentors.kevin.desc') 
                  },
                  { 
                    name: "Nik Tominec",
                    role: t('mentors.nik.role'),
                    image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781182489/unnamed_fh0rtt.jpg",
                    bg: "bg-play-yellow/5 border-play-yellow/15 hover:border-play-yellow/35 text-play-yellow hover:scale-[1.01]", 
                    badgeColor: "bg-play-yellow/12 text-play-yellow",
                    desc: t('mentors.nik.desc') 
                  }
                ].map((mentor, idx) => (
                  <MentorCard mentor={mentor} key={idx} />
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
