import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t('nav.vizija'), path: '/#vizija' },
    { name: t('nav.delavnice'), path: '/delavnice' },
    { name: t('nav.partner'), path: '/partner' },
    { name: t('nav.kontakt'), path: '/#kontakt' },
  ];

  const languages = [
    { code: 'sl', name: 'SL', flagUrl: 'https://flagcdn.com/w40/si.png' },
    { code: 'en', name: 'EN', flagUrl: 'https://flagcdn.com/w40/gb.png' },
    { code: 'it', name: 'IT', flagUrl: 'https://flagcdn.com/w40/it.png' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 select-none">
      <div className="max-w-7xl mx-auto h-24 flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-2 h-[42px]" onClick={() => setIsOpen(false)}>
          <img 
            src="https://res.cloudinary.com/dssxhjk8k/image/upload/v1779890069/LOGO3_eswysi.png" 
            alt="Start Lab Logo" 
            className="h-full w-auto object-contain mix-blend-screen"
          />
        </Link>
        
        {/* Desktop Links with rounded background hover states */}
        <div className="hidden lg:flex items-center gap-2 font-display font-medium text-sm tracking-wide text-white">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="px-4 py-2 rounded-xl hover:bg-white/10 text-slate-100 hover:text-play-yellow transition-all duration-250 font-bold uppercase"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Language & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-white/5">
             {languages.map((lang) => (
               <button 
                 key={lang.code}
                 onClick={() => i18n.changeLanguage(lang.code)}
                 className={`text-xs font-bold transition-all px-3 py-1.5 rounded-xl flex items-center gap-2 ${i18n.language === lang.code ? 'bg-brand-red text-white shadow-md' : 'text-slate-400 hover:bg-white/5'}`}
                 title={lang.name}
               >
                 <img 
                   src={lang.flagUrl} 
                   alt={`${lang.name} flag`} 
                   className="w-4 h-3 object-cover rounded-sm border border-white/20" 
                   referrerPolicy="no-referrer"
                 />
                 {lang.name}
               </button>
             ))}
          </div>
          <Link to="/delavnice" className="bg-play-yellow hover:bg-play-yellow/90 text-slate-950 font-display font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-2xl transform hover:scale-105 active:scale-95 transition-all shadow-[0_4px_0_0_#d1a115]">
            {t('nav.delavnice')}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button 
            className="text-white p-2 hover:bg-white/10 rounded-full transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-24 left-0 right-0 w-full border-b border-white/10 bg-black/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-5 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-lg font-display font-black uppercase tracking-tight text-white hover:text-play-yellow transition-colors py-1"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-2 justify-center border-t border-white/5 pt-4">
              {languages.map((lang) => (
                <button 
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl ${i18n.language === lang.code ? 'bg-brand-red text-white font-extrabold' : 'bg-slate-900 text-slate-300'}`}
                >
                  <img 
                    src={lang.flagUrl} 
                    alt={`${lang.name} flag`} 
                    className="w-4 h-3 object-cover rounded-sm border border-white/20" 
                    referrerPolicy="no-referrer"
                  />
                  {lang.name}
                </button>
              ))}
            </div>
            <Link 
              to="/delavnice" 
              className="bg-play-yellow hover:bg-play-yellow/90 text-slate-950 font-display font-bold text-center uppercase tracking-wider py-4 rounded-2xl transition-all shadow-[0_4px_0_0_#d1a115]"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.delavnice')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
