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

      <div className="max-w-3xl mx-auto mt-10 pt-8 border-t border-slate-100 text-center text-[11px] text-slate-500 font-sans leading-relaxed">
        <div className="grid md:grid-cols-2 gap-6 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
          <div>
            <p className="text-slate-600 font-medium">
              Projekt financira Evropska unija iz Sklada za male projekte GO!2025 programa Interreg VI-A Italija-Slovenija 2021-2027, ki ga upravlja EZTS GO.
            </p>
          </div>
          <div>
            <p className="text-slate-600 font-medium">
              Il progetto è finanziato dall’Unione europea nell’ambito del Fondo per piccoli progetti (Small Project Fund) GO! 2025 del Programma Interreg VI-A Italia-Slovenia 2021-2027, gestito dal GECT GO.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-6 font-mono text-xs font-semibold">
          <a href="https://www.ita-slo.eu" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-slate-900 hover:underline transition-colors">
            www.ita-slo.eu
          </a>
          <a href="https://www.euro-go.eu/spf" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-slate-900 hover:underline transition-colors">
            www.euro-go.eu/spf
          </a>
        </div>
      </div>
    </footer>
  );
}
