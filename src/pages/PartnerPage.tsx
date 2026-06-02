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
  ChevronDown
} from 'lucide-react';

export default function PartnerPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'partners' | 'developers' | 'mentors'>('partners');
  
  // Partner Form State
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [coopType, setCoopType] = useState('');
  const [message, setMessage] = useState('');

  // Developer Form State
  const [devStatus, setDevStatus] = useState<'idle' | 'success'>('idle');
  const [devName, setDevName] = useState('');
  const [devEmail, setDevEmail] = useState('');
  const [devExpertise, setDevExpertise] = useState('');
  const [devMessage, setDevMessage] = useState('');

  // Mentor Form State
  const [mentorStatus, setMentorStatus] = useState<'idle' | 'success'>('idle');
  const [mentorName, setMentorName] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorArea, setMentorArea] = useState('');
  const [mentorMessage, setMentorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Start Lab Partnerstvo - ${company}`);
    const body = encodeURIComponent(`Podjetje/Organizacija: ${company}\nE-pošta: ${email}\nTip sodelovanja: ${coopType}\n\nSporočilo:\n${message}`);
    window.location.href = `mailto:info@startlab.si?subject=${subject}&body=${body}`;
    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleDevSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Start Lab Razvijalec Talentov - ${devName}`);
    const body = encodeURIComponent(`Ime in priimek: ${devName}\nE-pošta: ${devEmail}\nPodročje: ${devExpertise}\n\nSporočilo:\n${devMessage}`);
    window.location.href = `mailto:info@startlab.si?subject=${subject}&body=${body}`;
    setDevStatus('success');
    setTimeout(() => setDevStatus('idle'), 5000);
  };

  const handleMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Start Lab Mentorstvo - ${mentorName}`);
    const body = encodeURIComponent(`Ime in priimek: ${mentorName}\nE-pošta: ${mentorEmail}\nPodročje: ${mentorArea}\n\nSporočilo:\n${mentorMessage}`);
    window.location.href = `mailto:info@startlab.si?subject=${subject}&body=${body}`;
    setMentorStatus('success');
    setTimeout(() => setMentorStatus('idle'), 5000);
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
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.company_label')}</label>
                      <input 
                        required 
                        type="text" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" 
                        placeholder="..." 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.email')}</label>
                      <input 
                        required 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" 
                        placeholder="..." 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.coop_type.label')}</label>
                    <select 
                      required 
                      value={coopType}
                      onChange={(e) => setCoopType(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium appearance-none"
                    >
                      <option value="" disabled>{t('partner_page.coop_type.placeholder')}</option>
                      <option>{t('partner_page.coop_type.sponsorship')}</option>
                      <option>{t('partner_page.coop_type.mentoring')}</option>
                      <option>{t('partner_page.coop_type.equipment')}</option>
                      <option>{t('partner_page.coop_type.other')}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.message')}</label>
                    <textarea 
                      rows={5} 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium resize-none" 
                      placeholder={t('partner_page.message_placeholder')}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center group py-4 mt-2 shadow-lg">
                    {t('partner_page.submit')} 
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform stroke-[3]" />
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
              ) : (
                <form className="space-y-4" onSubmit={handleDevSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.devs_name_label')}</label>
                      <input 
                        required 
                        type="text" 
                        value={devName}
                        onChange={(e) => setDevName(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" 
                        placeholder="..." 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.email')}</label>
                      <input 
                        required 
                        type="email" 
                        value={devEmail}
                        onChange={(e) => setDevEmail(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" 
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
                        onChange={(e) => setDevExpertise(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 pr-10 outline-none focus:border-brand-red text-sm text-slate-800 font-medium appearance-none cursor-pointer"
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
                      onChange={(e) => setDevMessage(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium resize-none" 
                      placeholder={t('partner_page.devs_message_placeholder')}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center group py-4 mt-2 shadow-lg bg-play-purple border-play-purple hover:bg-play-purple/90">
                    {t('partner_page.submit')} 
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform stroke-[3]" />
                  </button>

                  <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center mt-6 font-bold leading-relaxed">
                    {t('partner_page.devs_agreement')}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
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
              ) : (
                <form className="space-y-4" onSubmit={handleMentorSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('partner_page.mentors_name_label')}</label>
                      <input 
                        required 
                        type="text" 
                        value={mentorName}
                        onChange={(e) => setMentorName(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" 
                        placeholder="..." 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.email')}</label>
                      <input 
                        required 
                        type="email" 
                        value={mentorEmail}
                        onChange={(e) => setMentorEmail(e.target.value)}
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" 
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
                      onChange={(e) => setMentorArea(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium" 
                      placeholder={t('partner_page.mentors_expertise_placeholder')}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display font-black uppercase text-slate-500">{t('contact.form.message')}</label>
                    <textarea 
                      rows={5} 
                      value={mentorMessage}
                      onChange={(e) => setMentorMessage(e.target.value)}
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl p-3.5 outline-none focus:border-brand-red text-sm text-slate-800 font-medium resize-none" 
                      placeholder={t('partner_page.mentors_message_placeholder')}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center group py-4 mt-2 shadow-lg bg-play-teal border-play-teal hover:bg-play-teal/90">
                    {t('partner_page.submit')} 
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform stroke-[3]" />
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
      </div>
    </div>
  );
}
