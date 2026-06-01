import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-12 bg-white border-t border-slate-200 px-4 md:px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link to="/" className="flex items-center gap-2 h-[120px]">
          <img 
            src="https://res.cloudinary.com/dssxhjk8k/image/upload/v1780041788/start_mesmgf.png" 
            alt="Start Lab Logo" 
            className="h-full w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </Link>
        
        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest font-mono">
          © {new Date().getFullYear()} START LAB. {t('footer.rights')}
        </div>

        <div className="flex gap-8 text-[10px] font-black uppercase italic tracking-widest text-slate-500">
           <Link to="/zasebnost" className="hover:text-slate-800 transition-colors">{t('footer.privacy')}</Link>
           <Link to="/pogoji-uporabe" className="hover:text-slate-800 transition-colors">{t('footer.terms')}</Link>
        </div>
      </div>
    </footer>
  );
}
