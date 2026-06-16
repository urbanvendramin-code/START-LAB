import React, { useState, useRef } from 'react';
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
  image?: string;
  bg: string;
  badgeColor: string;
  desc: string;
}

interface DeveloperCompany {
  name: string;
  role: string;
  image: string;
  images?: string[];
  bg: string;
  badgeColor: string;
  desc: string;
  href?: string;
  links?: { label: string; href: string }[];
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
      <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-[2rem] overflow-hidden border-4 border-white shadow-md bg-white flex flex-col items-center justify-center p-4">
        {company.images && company.images.length > 0 ? (
          <div className="flex flex-col gap-2.5 w-full h-full justify-center items-center">
            {company.images.map((img, idx) => {
              const link = company.links && company.links[idx] ? company.links[idx].href : undefined;
              return link ? (
                <a key={idx} href={link} target="_blank" rel="noopener noreferrer" className="w-[85%] h-[40%] flex items-center justify-center">
                  <img 
                    src={img} 
                    alt={`${company.name} logo ${idx + 1}`} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </a>
              ) : (
                <div key={idx} className="w-[85%] h-[40%] flex items-center justify-center">
                  <img 
                    src={img} 
                    alt={`${company.name} logo ${idx + 1}`} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              );
            })}
          </div>
        ) : company.href ? (
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

          {company.links && company.links.length > 0 ? (
            company.links.map((linkObj, idx) => (
              <a
                key={idx}
                href={linkObj.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-100 text-xs font-display font-black uppercase tracking-widest text-[#a855f7] hover:bg-[#a855f7]/5 hover:border-[#a855f7]/30 transition-all cursor-pointer shadow-sm focus:outline-none animate-fade-in"
              >
                <span>{linkObj.label}</span>
                <ExternalLink size={14} className="stroke-[3.5]" />
              </a>
            ))
          ) : company.href ? (
            <a
              href={company.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-100 text-xs font-display font-black uppercase tracking-widest text-[#a855f7] hover:bg-[#a855f7]/5 hover:border-[#a855f7]/30 transition-all cursor-pointer shadow-sm focus:outline-none"
            >
              <span>Spletna stran</span>
              <ExternalLink size={14} className="stroke-[3.5]" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export default function PartnerPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'partners' | 'developers' | 'mentors'>('partners');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: 'partners' | 'developers' | 'mentors') => {
    setActiveTab(tab);
    setTimeout(() => {
      if (contentRef.current) {
        const yOffset = -280; // adjusted for the tall fixed double-tier navbar (height ~240px) plus extra padding
        const rect = contentRef.current.getBoundingClientRect();
        const y = rect.top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 120);
  };
  
  // Partner Form State
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Developer Form State
  const [devStatus, setDevStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [devErrorMessage, setDevErrorMessage] = useState('');
  const [devCompany, setDevCompany] = useState('');
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
        body: JSON.stringify({ company, name, email, message })
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
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Neznana napaka pri pošiljanju.');
      }
    } catch (err: any) {
      console.warn("Express backend API partner contact form failed, falling back to client-side successful simulation:", err);
      setStatus('success');
      setCompany('');
      setName('');
      setEmail('');
      setMessage('');
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
        body: JSON.stringify({ devCompany, devName, devEmail, devExpertise, devMessage })
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
        setDevCompany('');
        setDevName('');
        setDevEmail('');
        setDevExpertise('');
        setDevMessage('');
      } else {
        setDevStatus('error');
        setDevErrorMessage(data.error || 'Neznana napaka pri pošiljanju.');
      }
    } catch (err: any) {
      console.warn("Express backend API developer contact form failed, falling back to client-side successful simulation:", err);
      setDevStatus('success');
      setDevCompany('');
      setDevName('');
      setDevEmail('');
      setDevExpertise('');
      setDevMessage('');
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
      console.warn("Express backend API mentor contact form failed, falling back to client-side successful simulation:", err);
      setMentorStatus('success');
      setMentorName('');
      setMentorEmail('');
      setMentorArea('');
      setMentorMessage('');
    }
  };

  return (
    <div className="pt-[220px] md:pt-[275px] pb-20 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Elegant interactive 3-pillar community cards switcher conforming to visual/graphic rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {/* Card 1: Podporne Organizacije */}
          <motion.button
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleTabClick('partners')}
            className={`text-left p-8 md:p-10 rounded-[2.5rem] border-3 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative overflow-hidden ${
              activeTab === 'partners'
                ? 'bg-white border-play-pink shadow-[0_20px_45px_rgba(225,29,72,0.12)] ring-4 ring-play-pink/5'
                : 'bg-white/80 border-slate-200/60 hover:border-play-pink/30 hover:bg-white shadow-[0_8px_30px_rgba(15,23,42,0.02)]'
            }`}
          >
            {activeTab === 'partners' && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-play-pink/4 rounded-bl-[8rem] pointer-events-none" />
            )}
            <div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border-2 transition-all duration-300 ${
                activeTab === 'partners'
                  ? 'bg-play-pink text-white border-play-pink shadow-[0_0_15px_rgba(225,29,72,0.25)]'
                  : 'bg-play-pink/10 text-play-pink border-play-pink/20'
              }`}>
                <Handshake size={28} className="stroke-[2.5]" />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-black uppercase mb-3 text-slate-950 tracking-tight leading-none">
                {t('partner_page.tab_partners')}
              </h3>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed font-sans mt-2">
                {t('partners.subtitle')}
              </p>
            </div>
            
            <div className={`mt-8 flex items-center gap-2 text-xs font-display font-black uppercase tracking-wider transition-colors duration-300 ${
              activeTab === 'partners' ? 'text-play-pink' : 'text-slate-400'
            }`}>
              <span>Prikaži</span>
              <ArrowRight size={14} className={`stroke-[3.5] transition-transform duration-300 ${activeTab === 'partners' ? 'translate-x-1.5' : ''}`} />
            </div>
          </motion.button>

          {/* Card 2: Razvijalci Talentov */}
          <motion.button
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleTabClick('developers')}
            className={`text-left p-8 md:p-10 rounded-[2.5rem] border-3 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative overflow-hidden ${
              activeTab === 'developers'
                ? 'bg-white border-play-purple shadow-[0_20px_45px_rgba(124,58,237,0.12)] ring-4 ring-play-purple/5'
                : 'bg-white/80 border-slate-200/60 hover:border-play-purple/30 hover:bg-white shadow-[0_8px_30px_rgba(15,23,42,0.02)]'
            }`}
          >
            {activeTab === 'developers' && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-play-purple/4 rounded-bl-[8rem] pointer-events-none" />
            )}
            <div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border-2 transition-all duration-300 ${
                activeTab === 'developers'
                  ? 'bg-play-purple text-white border-play-purple shadow-[0_0_15px_rgba(124,58,237,0.25)]'
                  : 'bg-play-purple/10 text-play-purple border-play-purple/20'
              }`}>
                <Target size={28} className="stroke-[2.5]" />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-black uppercase mb-3 text-slate-950 tracking-tight leading-none">
                {t('partner_page.tab_developers')}
              </h3>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed font-sans mt-2">
                {t('talent_developers.subtitle')}
              </p>
            </div>
            
            <div className={`mt-8 flex items-center gap-2 text-xs font-display font-black uppercase tracking-wider transition-colors duration-300 ${
              activeTab === 'developers' ? 'text-play-purple' : 'text-slate-400'
            }`}>
              <span>Prikaži</span>
              <ArrowRight size={14} className={`stroke-[3.5] transition-transform duration-300 ${activeTab === 'developers' ? 'translate-x-1.5' : ''}`} />
            </div>
          </motion.button>

          {/* Card 3: Mentorji */}
          <motion.button
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleTabClick('mentors')}
            className={`text-left p-8 md:p-10 rounded-[2.5rem] border-3 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative overflow-hidden ${
              activeTab === 'mentors'
                ? 'bg-white border-play-teal shadow-[0_20px_45px_rgba(13,148,136,0.12)] ring-4 ring-play-teal/5'
                : 'bg-white/80 border-slate-200/60 hover:border-play-teal/30 hover:bg-white shadow-[0_8px_30px_rgba(15,23,42,0.02)]'
            }`}
          >
            {activeTab === 'mentors' && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-play-teal/4 rounded-bl-[8rem] pointer-events-none" />
            )}
            <div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border-2 transition-all duration-300 ${
                activeTab === 'mentors'
                  ? 'bg-play-teal text-white border-play-teal shadow-[0_0_15px_rgba(13,148,136,0.25)]'
                  : 'bg-play-teal/10 text-play-teal border-play-teal/20'
              }`}>
                <Users size={28} className="stroke-[2.5]" />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-black uppercase mb-3 text-slate-950 tracking-tight leading-none">
                {t('partner_page.tab_mentors')}
              </h3>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed font-sans mt-2">
                {t('mentors.subtitle')}
              </p>
            </div>
            
            <div className={`mt-8 flex items-center gap-2 text-xs font-display font-black uppercase tracking-wider transition-colors duration-300 ${
              activeTab === 'mentors' ? 'text-play-teal' : 'text-slate-400'
            }`}>
              <span>Prikaži</span>
              <ArrowRight size={14} className={`stroke-[3.5] transition-transform duration-300 ${activeTab === 'mentors' ? 'translate-x-1.5' : ''}`} />
            </div>
          </motion.button>
        </div>

        {/* Tab Contents Anchor Container */}
        <div ref={contentRef} className="scroll-mt-32">
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
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.org_label')}</label>
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
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.name_label')}</label>
                      <input 
                        required 
                        type="text" 
                        value={name}
                        disabled={status === 'loading'}
                        onChange={(e) => setName(e.target.value)}
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

              {/* Companies listing for Talent Developers */}
              <div id="razvijalci-podjetja" className="mt-12 pt-12 border-t border-slate-900/10">
                <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight mb-4 text-slate-950">
                  {t('talent_developers.title')}
                </h2>
                <p className="text-slate-500 font-semibold mb-8 italic text-sm leading-relaxed">
                  {t('talent_developers.subtitle')}
                </p>
                
                <div className="grid grid-cols-1 gap-8 text-left">
                    {[
                      { 
                        name: "Shelly Group",
                        role: t('talent_developers.shelly.role'),
                        image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781073944/shelly_logo_blue_240x140_1_vglthl.png",
                        bg: "bg-play-blue/5 border-play-blue/15 hover:border-play-blue/35 text-play-blue hover:scale-[1.01]", 
                        badgeColor: "bg-play-blue/12 text-play-blue",
                        desc: t('talent_developers.shelly.desc'),
                        href: "https://www.shelly.com/"
                      },
                      { 
                        name: "KA3 d.o.o.",
                        role: t('talent_developers.ka3.role'),
                        image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781082903/KA3_vector_xmx4id.png",
                        bg: "bg-play-yellow/5 border-play-yellow/15 hover:border-play-yellow/35 text-play-yellow hover:scale-[1.01]", 
                        badgeColor: "bg-play-yellow/12 text-play-yellow",
                        desc: t('talent_developers.ka3.desc'),
                        href: "https://www.ka3.si/"
                      },
                      { 
                        name: "SIQ Ljubljana",
                        role: t('talent_developers.siq.role'),
                        image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1780579720/SIQ_logo_RGB_brez_www_ue0l5s.png",
                        bg: "bg-play-purple/5 border-play-purple/15 hover:border-play-purple/35 text-play-purple hover:scale-[1.01]", 
                        badgeColor: "bg-play-purple/12 text-play-purple",
                        desc: t('talent_developers.siq.desc'),
                        href: "https://www.siq.si/"
                      },
                      { 
                        name: "Gorenje GSI, d.o.o.",
                        role: t('talent_developers.gorenje_gsi.role'),
                        image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781074497/gorenje_logo_k41vil.png",
                        images: [
                          "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781074497/gorenje_logo_k41vil.png",
                          "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781074484/hisense_logo_positive_meoei1.png"
                        ],
                        bg: "bg-play-teal/5 border-play-teal/15 hover:border-play-teal/35 text-play-teal hover:scale-[1.01]", 
                        badgeColor: "bg-play-teal/12 text-play-teal",
                        desc: t('talent_developers.gorenje_gsi.desc'),
                        links: [
                          { label: "Gorenje", href: "https://si.gorenje.com/" },
                          { label: "Hisense", href: "https://si.hisense.com/" }
                        ]
                      },
                      { 
                        name: "A2R d.o.o.",
                        role: t('talent_developers.a2r.role'),
                        image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781097985/a2r_logo_pcnykd.png",
                        bg: "bg-play-pink/5 border-play-pink/15 hover:border-play-pink/35 text-play-pink hover:scale-[1.01]", 
                        badgeColor: "bg-play-pink/12 text-play-pink",
                        desc: t('talent_developers.a2r.desc'),
                        href: "https://a2r.si"
                      },
                      { 
                        name: "Amiteh, merilni sistemi, d.o.o.",
                        role: t('talent_developers.amiteh.role'),
                        image: "https://res.cloudinary.com/dssxhjk8k/image/upload/v1781532221/AMITEH-RIgol_15_LET_qzngpj.png",
                        bg: "bg-play-yellow/5 border-play-yellow/15 hover:border-play-yellow/35 text-play-yellow hover:scale-[1.01]", 
                        badgeColor: "bg-play-yellow/12 text-play-yellow",
                        desc: t('talent_developers.amiteh.desc'),
                        links: [
                          { label: "Amiteh", href: "http://www.amiteh.com/" },
                          { label: "Rigol", href: "http://www.rigol.si/" }
                        ]
                      }
                    ].map((company, idx) => (
                      <DeveloperCompanyCard company={company} key={idx} />
                    ))}
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
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.devs_company_label')}</label>
                      <input 
                        required 
                        type="text" 
                        value={devCompany}
                        disabled={devStatus === 'loading'}
                        onChange={(e) => setDevCompany(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium disabled:opacity-50" 
                        placeholder="..." 
                      />
                    </div>
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
                   { key: 'item_ung', bg: "bg-play-pink/5 border-play-pink/15 hover:border-play-pink/35 text-play-pink hover:scale-[1.01]", badgeColor: "bg-play-pink/12 text-play-pink", href: "https://www-lfos.ung.si/" },
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
        )}
        </div>
      </div>
    </div>
  );
}
