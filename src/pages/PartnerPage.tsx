import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Handshake, 
  Target, 
  Users, 
  ShieldCheck, 
  Send,
  CheckCircle2,
  ArrowRight,
  Cpu,
  BookOpen,
  ChevronDown,
  AlertTriangle,
  Loader2,
  ExternalLink
} from 'lucide-react';
 
interface Mentor {
  name: string;
  role: string;
  image: string;
  bg: string;
  badgeColor: string;
  desc: string;
}

interface DeveloperCompany {
  name: string;
  role: string;
  image: string;
  bg: string;
  badgeColor: string;
  desc: string;
  href?: string;
}

function MentorCard({ mentor }: { mentor: Mentor; key?: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  // Split description by double newlines
  const paragraphs = mentor.desc.split('\n\n');
  const firstParagraph = paragraphs[0] || '';
  const remainingParagraphs = paragraphs.slice(1);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`rounded-[2.5rem] border-2 bg-white p-6 md:p-10 transition-all flex flex-col md:flex-row gap-8 items-center md:items-start shadow-[0_12px_24px_rgba(15,23,42,0.02)] hover:shadow-xl hover:border-[#00a896]/20 ${mentor.bg}`}
    >
      <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-[2rem] overflow-hidden border-4 border-white shadow-md bg-slate-50 flex items-center justify-center p-4">
        <img 
          src={mentor.image} 
          alt={mentor.name} 
          className="w-full h-full object-cover rounded-[2rem]"
          referrerPolicy="no-referrer"
        />
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

function DeveloperCompanyCard({ company }: { company: DeveloperCompany; key?: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const paragraphs = company.desc.split('\n\n');
  const firstParagraph = paragraphs[0] || '';
  const remainingParagraphs = paragraphs.slice(1);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`rounded-[2.5rem] border-2 bg-white p-6 md:p-10 transition-all flex flex-col md:flex-row gap-8 items-center md:items-start shadow-[0_12px_24px_rgba(15,23,42,0.02)] hover:shadow-xl hover:border-[#a855f7]/20 ${company.bg}`}
    >
      <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-[2rem] overflow-hidden border-4 border-white shadow-md bg-white flex items-center justify-center p-4">
        {company.href ? (
          <a href={company.href} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
            <img 
              src={company.image} 
              alt={company.name} 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        ) : (
          <img 
            src={company.image} 
            alt={company.name} 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      <div className="flex-1 w-full text-left">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-4 py-1.5 rounded-full font-display font-black text-xs tracking-wider ${company.badgeColor}`}>
            {company.name}
          </span>
          <span className="text-[10px] font-display font-black text-slate-400 uppercase tracking-widest block sm:inline">
            {company.role}
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

        <div className="flex flex-wrap gap-4 mt-6">
          {paragraphs.length > 1 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-100 text-xs font-display font-black uppercase tracking-widest text-[#a855f7] hover:bg-[#a855f7]/5 hover:border-[#a855f7]/30 transition-all cursor-pointer shadow-sm focus:outline-none"
            >
              <span>{isExpanded ? t('partner_page.read_less') : t('partner_page.read_more')}</span>
              <ChevronDown size={14} className={`stroke-[3.5] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          )}

          {company.href && (
            <a
              href={company.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-100 text-xs font-display font-black uppercase tracking-widest text-[#a855f7] hover:bg-[#a855f7]/5 hover:border-[#a855f7]/30 transition-all cursor-pointer shadow-sm focus:outline-none"
            >
              <span>Spletna stran</span>
              <ExternalLink size={14} className="stroke-[3.5]" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function PartnerPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'partners' | 'developers' | 'mentors'>('partners');
  
  // Partner Form State
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [coopType, setCoopType] = useState('');
  const [message, setMessage] = useState('');

  // Developer Form State
  const [devStatus, setDevStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [devErrorMessage, setDevErrorMessage] = useState('');
  const [devName, setDevName] = useState('');
  const [devEmail, setDevEmail] = useState('');
  const [devExpertise, setDevExpertise] = useState('');
  const [devMessage, setDevMessage] = useState('');

  // Mentor Form State
  const [mentorStatus, setMentorStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mentorErrorMessage, setMentorErrorMessage] = useState('');
  const [mentorName, setMentorName] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorArea, setMentorArea] = useState('');
  const [mentorMessage, setMentorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, email, coopType, message })
      });

      if (!res.ok) {
        throw new Error(`Strežnik je vrnil napako s statusom: ${res.status} (${res.statusText || 'Status Text Missing'})`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Strežnik ni vrnil pričakovanega JSON formata (prejeli smo "${contentType || 'unknown'}"). Odgovor strežnika: "${text.slice(0, 160)}..."`);
      }

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setCompany('');
        setEmail('');
        setCoopType('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Neznana napaka pri pošiljanju.');
      }
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err?.message || 'Napaka pri povezavi s strežnikom.');
    }
  };

  const handleDevSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDevStatus('loading');
    setDevErrorMessage('');
    try {
      const res = await fetch('/api/contact/developer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ devName, devEmail, devExpertise, devMessage })
      });

      if (!res.ok) {
        throw new Error(`Strežnik je vrnil napako s statusom: ${res.status} (${res.statusText || 'Status Text Missing'})`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Strežnik ni vrnil pričakovanega JSON formata (prejeli smo "${contentType || 'unknown'}"). Odgovor strežnika: "${text.slice(0, 160)}..."`);
      }

      const data = await res.json();
      if (data.success) {
        setDevStatus('success');
        setDevName('');
        setDevEmail('');
        setDevExpertise('');
        setDevMessage('');
      } else {
        setDevStatus('error');
        setDevErrorMessage(data.error || 'Neznana napaka pri pošiljanju.');
      }
    } catch (err: any) {
      console.error(err);
      setDevStatus('error');
      setDevErrorMessage(err?.message || 'Napaka pri povezavi s strežnikom.');
    }
  };

  const handleMentorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMentorStatus('loading');
    setMentorErrorMessage('');
    try {
      const res = await fetch('/api/contact/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mentorName, mentorEmail, mentorArea, mentorMessage })
      });

      if (!res.ok) {
        throw new Error(`Strežnik je vrnil napako s statusom: ${res.status} (${res.statusText || 'Status Text Missing'})`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Strežnik ni vrnil pričakovanega JSON formata (prejeli smo "${contentType || 'unknown'}"). Odgovor strežnika: "${text.slice(0, 160)}..."`);
      }

      const data = await res.json();
      if (data.success) {
        setMentorStatus('success');
        setMentorName('');
        setMentorEmail('');
        setMentorArea('');
        setMentorMessage('');
      } else {
        setMentorStatus('error');
        setMentorErrorMessage(data.error || 'Neznana napaka pri pošiljanju.');
      }
    } catch (err: any) {
      console.error(err);
      setMentorStatus('error');
      setMentorErrorMessage(err?.message || 'Napaka pri povezavi s strežnikom.');
    }
  };

  return (
    <div className="pt-60 md:pt-52 pb-20 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Tab switcher */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-col md:flex-row bg-slate-100 p-2 rounded-[2rem] border-2 border-slate-950/10 gap-2 shadow-xs w-full max-w-sm md:max-w-none md:w-auto md:rounded-3xl justify-center">
            <button
              onClick={() => setActiveTab('partners')}
              className={`w-full md:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'partners'
                  ? 'bg-brand-red text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-200/50'
              }`}
            >
              {t('partner_page.tab_partners')}
            </button>
            <button
              onClick={() => setActiveTab('developers')}
              className={`w-full md:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'developers'
                  ? 'bg-brand-red text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-200/50'
              }`}
            >
              {t('partner_page.tab_developers')}
            </button>
            <button
              onClick={() => setActiveTab('mentors')}
              className={`w-full md:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'mentors'
                  ? 'bg-brand-red text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-200/50'
              }`}
            >
              {t('partner_page.tab_mentors')}
            </button>
          </div>
        </div>

        {/* Tab Contents: Partners */}
        {activeTab === 'partners' && (
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
            
            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h1 className="text-4xl md:text-7xl font-display font-black uppercase leading-[1.0] tracking-tight mb-8 text-slate-950">
                {t('partner_page.title_start')} <br />
                <span className="text-brand-red inline-block mt-2">{t('partner_page.title_brand')}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 font-semibold mb-10 leading-relaxed">
                {t('partner_page.subtitle')}
              </p>

              <div className="rounded-[2.5rem] overflow-hidden bg-slate-100 p-2.5 border-2 border-slate-900/10 mb-12 shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
                 <img 
                   src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                   alt="Collaboration" 
                   className="w-full h-80 object-cover rounded-[2rem]"
                   referrerPolicy="no-referrer"
                 />
              </div>

              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="flex gap-4">
                  <div className="w-14 h-14 shrink-0 bg-play-pink/12 border-2 border-play-pink/20 rounded-2xl flex items-center justify-center text-play-pink shadow-[0_4px_0_0_#e11d481a]">
                    <Target size={26} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-display font-black uppercase mb-2 text-slate-900 text-base md:text-lg">{t('partner_page.colab_title')}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{t('partner_page.colab_subtitle')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 shrink-0 bg-play-teal/12 border-2 border-play-teal/20 rounded-2xl flex items-center justify-center text-play-teal shadow-[0_4px_0_0_#0d94881a]">
                    <ShieldCheck size={26} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-display font-black uppercase mb-2 text-slate-900 text-base md:text-lg">{t('partner_page.benefit_title')}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{t('partner_page.benefit_subtitle')}</p>
                  </div>
                </div>

                <div className="flex gap-4 sm:col-span-2">
                  <div className="w-14 h-14 shrink-0 bg-play-blue/12 border-2 border-play-blue/20 rounded-2xl flex items-center justify-center text-play-blue shadow-[0_4px_0_0_#2563eb1a]">
                    <Handshake size={26} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-display font-black uppercase mb-2 text-slate-900 text-base md:text-lg">{t('partner_page.goal_title')}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t('partner_page.goal_subtitle')}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 play-card border-none bg-play-purple/8 rounded-[2rem]">
                  <blockquote className="text-base md:text-lg italic font-semibold text-slate-700 leading-relaxed">
                    "{t('partner_page.quote')}"
                  </blockquote>
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
                <Users className="text-play-pink stroke-[2.5]" size={28} />
                {t('partner_page.form_title')}
              </h2>

              {status === 'success' ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-play-teal/15 text-play-teal border-2 border-play-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">{t('partner_page.thanks')}</h3>
                  <p className="text-slate-600 font-semibold">{t('partner_page.callback')}</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-play-pink font-display font-black uppercase text-xs tracking-wider hover:underline"
                  >
                    {t('partner_page.new_request')}
                  </button>
                </div>
              ) : status === 'error' ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-brand-red/15 text-brand-red border-2 border-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} className="stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">Napaka pri pošiljanju</h3>
                  <p className="text-slate-600 font-semibold max-w-md mx-auto mb-4">Sporočila ni bilo mogoče poslati neposredno preko SMTP strežnika.</p>
                  <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-xs font-mono break-all max-w-md mx-auto text-left mb-8 border border-red-100">
                    <strong>Diagnostic SMTP Error:</strong> {errorMessage}
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="btn-primary py-3 px-8 shadow-md"
                  >
                    Poskusi ponovno
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.company_label')}</label>
                      <input 
                        required 
                        type="text" 
                        value={company}
                        disabled={status === 'loading'}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium disabled:opacity-50" 
                        placeholder="..." 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.email')}</label>
                      <input 
                        required 
                        type="email" 
                        value={email}
                        disabled={status === 'loading'}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium disabled:opacity-50" 
                        placeholder="..." 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.coop_type.label')}</label>
                    <input 
                      required 
                      type="text"
                      value={coopType}
                      disabled={status === 'loading'}
                      onChange={(e) => setCoopType(e.target.value)}
                      placeholder={t('partner_page.coop_type.placeholder')}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium disabled:opacity-50" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.message')}</label>
                    <textarea 
                      rows={5} 
                      value={message}
                      disabled={status === 'loading'}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium resize-none disabled:opacity-50" 
                      placeholder={t('partner_page.message_placeholder')}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center group py-4 mt-2 shadow-lg flex items-center gap-2 justify-center disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
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
                    {t('partner_page.agreement')}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}

        {/* Tab Contents: Developers */}
        {activeTab === 'developers' && (
          <>
            <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
            
            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h1 className="text-4xl md:text-7xl font-display font-black uppercase leading-[1.0] tracking-tight mb-8 text-slate-950">
                {t('partner_page.devs_title_start')} <br />
                <span className="text-brand-red inline-block mt-2">{t('partner_page.devs_title_brand')}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 font-semibold mb-10 leading-relaxed">
                {t('partner_page.devs_subtitle')}
              </p>

              <div className="rounded-[2.5rem] overflow-hidden bg-slate-100 p-2.5 border-2 border-slate-900/10 mb-12 shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
                 <img 
                   src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80" 
                   alt="Teenager programming and testing a robot" 
                   className="w-full h-80 object-cover rounded-[2rem]"
                   referrerPolicy="no-referrer"
                 />
              </div>

              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="flex gap-4">
                  <div className="w-14 h-14 shrink-0 bg-play-purple/12 border-2 border-play-purple/20 rounded-2xl flex items-center justify-center text-play-purple shadow-[0_4px_0_0_#a855f71a]">
                    <Cpu size={26} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-display font-black uppercase mb-2 text-slate-900 text-base md:text-lg">{t('partner_page.devs_colab_title')}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{t('partner_page.devs_colab_desc')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 shrink-0 bg-play-teal/12 border-2 border-play-teal/20 rounded-2xl flex items-center justify-center text-play-teal shadow-[0_4px_0_0_#0d94881a]">
                    <BookOpen size={26} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-display font-black uppercase mb-2 text-slate-900 text-base md:text-lg">{t('partner_page.devs_offer_title')}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed font-sans">{t('partner_page.devs_offer_desc')}</p>
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
                <Users className="text-play-purple stroke-[2.5]" size={28} />
                {t('partner_page.devs_form_title')}
              </h2>

              {devStatus === 'success' ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-play-teal/15 text-play-teal border-2 border-play-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">{t('partner_page.thanks')}</h3>
                  <p className="text-slate-600 font-semibold">{t('partner_page.callback')}</p>
                  <button 
                    onClick={() => setDevStatus('idle')}
                    className="mt-8 text-play-purple font-display font-black uppercase text-xs tracking-wider hover:underline"
                  >
                    {t('partner_page.new_request')}
                  </button>
                </div>
              ) : devStatus === 'error' ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-brand-red/15 text-brand-red border-2 border-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} className="stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">Napaka pri pošiljanju</h3>
                  <p className="text-slate-600 font-semibold max-w-md mx-auto mb-4">Sporočila ni bilo mogoče poslati neposredno preko SMTP strežnika.</p>
                  <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-xs font-mono break-all max-w-md mx-auto text-left mb-8 border border-red-100">
                    <strong>Diagnostic SMTP Error:</strong> {devErrorMessage}
                  </div>
                  <button 
                    onClick={() => setDevStatus('idle')}
                    className="btn-primary py-3 px-8 shadow-md bg-play-purple border-play-purple hover:bg-play-purple/90"
                  >
                    Poskusi ponovno
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleDevSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.devs_name_label')}</label>
                      <input 
                        required 
                        type="text" 
                        value={devName}
                        disabled={devStatus === 'loading'}
                        onChange={(e) => setDevName(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium disabled:opacity-50" 
                        placeholder="..." 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.email')}</label>
                      <input 
                        required 
                        type="email" 
                        value={devEmail}
                        disabled={devStatus === 'loading'}
                        onChange={(e) => setDevEmail(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium disabled:opacity-50" 
                        placeholder="..." 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.devs_expertise_label')}</label>
                    <div className="relative">
                      <select 
                        required 
                        value={devExpertise}
                        disabled={devStatus === 'loading'}
                        onChange={(e) => setDevExpertise(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 pr-10 outline-none focus:border-brand-red text-sm text-slate-800 font-medium appearance-none cursor-pointer disabled:opacity-50"
                      >
                        <option value="" disabled>{t('partner_page.devs_tiers.level_placeholder')}</option>
                        <option value="Bronze">{t('partner_page.devs_tiers.level_bronze')}</option>
                        <option value="Silver">{t('partner_page.devs_tiers.level_silver')}</option>
                        <option value="Gold">{t('partner_page.devs_tiers.level_gold')}</option>
                        <option value="Platinum">{t('partner_page.devs_tiers.level_platinum')}</option>
                        <option value="Diamond">{t('partner_page.devs_tiers.level_diamond')}</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.message')}</label>
                    <textarea 
                      rows={5} 
                      value={devMessage}
                      disabled={devStatus === 'loading'}
                      onChange={(e) => setDevMessage(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium resize-none disabled:opacity-50" 
                      placeholder={t('partner_page.devs_message_placeholder')}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={devStatus === 'loading'}
                    className="btn-primary w-full justify-center group py-4 mt-2 shadow-lg bg-play-purple border-play-purple hover:bg-play-purple/90 flex items-center gap-2 justify-center disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    {devStatus === 'loading' ? (
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
                    {t('partner_page.devs_agreement')}
                  </p>
                </form>
              )}
            </motion.div>
          </div>

          {/* Companies listing for Talent Developers */}
          <div id="razvijalci-podjetja" className="mt-24 md:mt-32 pt-20 border-t border-slate-900/10">
            <div className="text-center">
              <h2 className="text-3.5xl md:text-5xl font-display font-black uppercase tracking-tight mb-4 text-slate-950">
                {t('talent_developers.title')}
              </h2>
              <p className="text-slate-500 font-semibold mb-12 max-w-xl mx-auto italic">
                {t('talent_developers.subtitle')}
              </p>
              
              <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto text-left">
                  {[
                    { 
                      name: "SIQ Ljubljana",
                      role: t('talent_developers.siq.role'),
                      image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1780579720/SIQ_logo_RGB_brez_www_ue0l5s.png",
                      bg: "bg-play-purple/5 border-play-purple/15 hover:border-play-purple/35 text-play-purple hover:scale-[1.01]", 
                      badgeColor: "bg-play-purple/12 text-play-purple",
                      desc: t('talent_developers.siq.desc'),
                      href: "https://www.siq.si/"
                    }
                  ].map((company, idx) => (
                    <DeveloperCompanyCard company={company} key={idx} />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}

        {/* Tab Contents: Mentors */}
        {activeTab === 'mentors' && (
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
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-brand-red/15 text-brand-red border-2 border-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} className="stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase mb-2 text-slate-900">Napaka pri pošiljanju</h3>
                  <p className="text-slate-600 font-semibold max-w-md mx-auto mb-4">Sporočila ni bilo mogoče poslati neposredno preko SMTP strežnika.</p>
                  <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-xs font-mono break-all max-w-md mx-auto text-left mb-8 border border-red-100">
                    <strong>Diagnostic SMTP Error:</strong> {mentorErrorMessage}
                  </div>
                  <button 
                    onClick={() => setMentorStatus('idle')}
                    className="btn-primary py-3 px-8 shadow-md bg-play-teal border-play-teal hover:bg-play-teal/90"
                  >
                    Poskusi ponovno
                  </button>
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
        )}

        {/* Partners / Companies Section */}
        {activeTab === 'partners' && (
          <div id="podjetja" className="mt-24 md:mt-32 pt-20 border-t border-slate-900/10">
            <div className="text-center">
              <h2 className="text-3.5xl md:text-5xl font-display font-black uppercase tracking-tight mb-4 text-slate-950">
                {t('partners.title')}
              </h2>
              <p className="text-slate-500 font-semibold mb-12 max-w-xl mx-auto italic">
                {t('partners.subtitle')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
                 {[
                   { key: 'item_ung', bg: "bg-play-pink/5 border-play-pink/15 hover:border-play-pink/35 text-play-pink hover:scale-[1.01]", badgeColor: "bg-play-pink/12 text-play-pink", href: "https://ung.si/sl/raziskave/laboratorij-za-fiziko-organskih-snovi/" },
                   { key: 'item_ptp', bg: "bg-play-yellow/5 border-play-yellow/15 hover:border-play-yellow/35 text-play-yellow hover:scale-[1.01]", badgeColor: "bg-play-yellow/12 text-play-yellow", href: "https://popri.si/" },
                   { key: 'item_ehisa', bg: "bg-play-teal/5 border-play-teal/15 hover:border-play-teal/35 text-play-teal hover:scale-[1.01]", badgeColor: "bg-play-teal/12 text-play-teal", href: "https://www.e-hisa.si/" },
                   { key: 'item_mic', bg: "bg-play-blue/5 border-play-blue/15 hover:border-play-blue/35 text-play-blue hover:scale-[1.01]", badgeColor: "bg-play-blue/12 text-play-blue", href: "https://mic.scng.si/domov/kontakti-mic/" }
                 ].map((item, idx) => {
                   const name = t(`partners.${item.key}.name`);
                   const fullName = t(`partners.${item.key}.fullName`);
                   const label = t(`partners.${item.key}.label`);
                   const desc = t(`partners.${item.key}.desc`);

                   const CardComponent = item.href ? motion.a : motion.div;
                   const customProps = item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {};

                   return (
                     <CardComponent 
                       whileHover={{ y: -6 }}
                       key={idx} 
                       className={`rounded-[2.5rem] border-2 bg-white p-8 transition-all flex flex-col justify-between shadow-[0_12px_24px_rgba(15,23,42,0.02)] hover:shadow-xl hover:border-slate-950/20 ${item.bg}`}
                       {...customProps}
                     >
                       <div>
                         <div className="flex items-center gap-3 mb-4">
                           <span className={`px-4 py-1.5 rounded-full font-display font-black text-xs tracking-wider ${item.badgeColor}`}>
                             {name}
                           </span>
                           <span className="text-[10px] font-display font-black text-slate-400 uppercase tracking-widest">
                             {label}
                           </span>
                         </div>
                         <h3 className="text-lg md:text-xl font-display font-black text-slate-950 mb-3 leading-snug">
                           {fullName}
                         </h3>
                         <p className="text-sm text-slate-600 font-semibold leading-relaxed font-sans">
                           {desc}
                         </p>
                       </div>
                     </CardComponent>
                   );
                 })}
              </div>
            </div>
          </div>
        )}

        {/* Mentors Section */}
        {activeTab === 'mentors' && (
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
                    }
                  ].map((mentor, idx) => (
                    <MentorCard mentor={mentor} key={idx} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
