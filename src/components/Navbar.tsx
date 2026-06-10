import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t('nav.oprojektu'), path: '/o-projektu' },
    { name: t('nav.delavnice'), path: '/delavnice' },
    { name: t('nav.partner'), path: '/partner' },
    { name: t('nav.kontakt'), path: '/kontakt' },
  ];

  const languages = [
    { code: 'sl', name: 'SL', flagUrl: 'https://flagcdn.com/w40/si.png' },
    { code: 'it', name: 'IT', flagUrl: 'https://flagcdn.com/w40/it.png' },
    { code: 'en', name: 'EN', flagUrl: 'https://flagcdn.com/w40/gb.png' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 select-none shadow-md">
      {/* Top Banner (Interreg Logo) - White Background */}
      <div className="bg-white border-b border-slate-200/60 px-6 py-4 flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full flex justify-center">
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="https://res.cloudinary.com/dssxhjk8k/image/upload/v1780041788/start_mesmgf.png" 
              alt="Start Logo" 
              className="h-[85px] md:h-[107px] w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>
      </div>

      {/* Main Header (Start Lab Logo & Navigation) - Black Background */}
      <div className="bg-slate-950 border-b border-slate-900 px-6">
        <div className="max-w-7xl mx-auto min-h-20 lg:min-h-24 py-3 lg:py-2 flex items-center justify-between w-full">
          <Link 
            to="/" 
            className="flex items-center justify-center relative group py-1" 
            onClick={() => {
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="absolute inset-0 bg-brand-red/10 rounded-full blur-xl scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <img 
              src="https://res.cloudinary.com/dssxhjk8k/image/upload/v1779890069/LOGO3_eswysi.png" 
              alt="Start Lab Logo" 
              className="w-44 sm:w-48 md:w-52 lg:w-64 h-auto object-contain relative z-10"
              referrerPolicy="no-referrer"
            />
          </Link>
          
          {/* Desktop Links with rounded background hover states */}
          <div className="hidden lg:flex items-center gap-2 font-display font-medium text-sm tracking-wide text-slate-200">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-250 font-bold uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>
   
          {/* Desktop Language & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
               {languages.map((lang) => (
                 <button 
                   key={lang.code}
                   onClick={() => i18n.changeLanguage(lang.code)}
                   className={`text-xs font-bold transition-all px-3 py-1.5 rounded-xl flex items-center gap-2 ${i18n.language === lang.code ? 'bg-brand-red text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
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
          </div>
   
          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-4">
            <button 
              className="text-white p-2 hover:bg-slate-800 rounded-full transition-all border border-slate-800 bg-slate-900"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
            </button>
          </div>
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
            className="lg:hidden absolute top-full left-0 right-0 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-5 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-lg font-display font-black uppercase tracking-tight text-white hover:text-brand-red transition-colors py-1"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-2 justify-center border-t border-slate-900 pt-4">
              {languages.map((lang) => (
                <button 
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl ${i18n.language === lang.code ? 'bg-brand-red text-white font-extrabold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
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
              className="bg-brand-red hover:bg-brand-red/90 text-white font-display font-bold text-center uppercase tracking-wider py-4 rounded-2xl transition-all shadow-[0_4px_0_0_rgba(222,59,59,0.2)]"
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
