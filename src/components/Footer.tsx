import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Music } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61590652341384',
      icon: Facebook,
      label: 'Start Lab Facebook',
      hoverStyle: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/start_lab_goriska/',
      icon: Instagram,
      label: 'Start Lab Instagram',
      hoverStyle: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-[#dc2743]',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@startlab56',
      icon: Music,
      label: 'Start Lab TikTok',
      hoverStyle: 'hover:bg-slate-950 hover:text-white hover:border-slate-950',
    },
  ];

  return (
    <footer className="py-12 bg-white border-t border-slate-200 px-4 md:px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link to="/" className="flex items-center gap-2 h-[156px]">
          <img 
            src="https://res.cloudinary.com/pithqpe2/image/upload/v1788421079/Adesivo_SPF_progetti_finanziati_START_bw.png" 
            alt="Start Lab Logo" 
            className="h-full w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </Link>
        
        {/* Social media icons */}
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">
            {t('contact.social_title', 'Družbena omrežja')}
          </span>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.name}
                  className={`w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 ${social.hoverStyle}`}
                >
                  <Icon size={18} className="stroke-[2.2]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest font-mono text-center md:text-left">
          © {new Date().getFullYear()} START LAB. {t('footer.rights')}
        </div>

        <div className="flex gap-8 text-[10px] font-black uppercase italic tracking-widest text-slate-400">
           <Link to="/zasebnost" className="hover:text-brand-red transition-colors">{t('footer.privacy')}</Link>
           <Link to="/pogoji-uporabe" className="hover:text-brand-red transition-colors">{t('footer.terms')}</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-10 pt-8 border-t border-slate-200 text-center text-[11px] text-slate-500 font-sans leading-relaxed">
        <div className="grid md:grid-cols-2 gap-6 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
          <div>
            <p className="text-slate-600 font-medium">
              Projekt START sofinancira Evropska unija iz Sklada za male projekte GO!2025 programa Interreg VI-A Italija-Slovenija 2021-2027, ki ga upravlja EZTS GO.
            </p>
          </div>
          <div>
            <p className="text-slate-600 font-medium">
              Il progetto START è co-finanziato dall’Unione europea nell’ambito del Fondo per piccoli progetti (Small Project Fund) GO! 2025 del Programma Interreg VI-A Italia-Slovenia 2021-2027, gestito dal GECT GO.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-6 font-mono text-xs font-semibold">
          <a href="https://www.ita-slo.eu" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-red hover:underline transition-colors">
            www.ita-slo.eu
          </a>
          <a href="https://www.euro-go.eu/spf" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-red hover:underline transition-colors">
            www.euro-go.eu/spf
          </a>
        </div>
      </div>
    </footer>
  );
}
