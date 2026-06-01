import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Rocket, Boxes } from 'lucide-react';

export default function ProjectPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 relative min-h-[80vh] flex flex-col items-center justify-center selections:bg-brand-red/20">
      <div className="max-w-4xl mx-auto w-full text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-12 bg-slate-50/50 rounded-3xl p-8 md:p-16 border border-slate-100 shadow-sm"
          id="project-about-card"
        >
          {/* Logo at the top center */}
          <div className="relative flex justify-center w-full max-w-[320px] md:max-w-[400px]">
            <img 
              src="https://res.cloudinary.com/dssxhjk8k/image/upload/v1780041788/start_mesmgf.png" 
              alt="Start Lab Logo" 
              className="w-full h-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Text and Links under the logo */}
          <div className="space-y-8">
            <p className="text-lg md:text-xl font-medium text-slate-700 leading-relaxed max-w-2xl mx-auto">
              {t('project.funding_text')}
            </p>

            {/* Links section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-mono text-sm pt-4 border-t border-slate-200/60 max-w-md mx-auto">
              <a 
                href="https://www.ita-slo.eu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-red hover:text-brand-red/80 font-bold underline underline-offset-4 transition-colors"
                id="link-ita-slo"
              >
                www.ita-slo.eu
              </a>
              <span className="hidden sm:inline text-slate-300">•</span>
              <a 
                href="https://www.euro-go.eu/spf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-red hover:text-brand-red/80 font-bold underline underline-offset-4 transition-colors"
                id="link-euro-go"
              >
                www.euro-go.eu/spf
              </a>
            </div>
          </div>
        </motion.div>

        {/* Vision & Mission sections below */}
        <div className="grid md:grid-cols-2 gap-8 w-full text-left pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
            id="project-vision-card"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-play-pink/10 rounded-bl-[4.5rem] flex items-center justify-center text-play-pink group-hover:scale-110 transition-transform duration-300">
              <Rocket size={36} className="mr-[-10px] mt-[-10px]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-black mb-6 text-play-pink uppercase tracking-tight">
              {t('vision.title')}
            </h3>
            <p className="text-base text-slate-600 leading-relaxed font-semibold">
              {t('vision.text')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
            id="project-mission-card"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-play-blue/10 rounded-bl-[4.5rem] flex items-center justify-center text-play-blue group-hover:scale-110 transition-transform duration-300">
              <Boxes size={36} className="mr-[-10px] mt-[-10px]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-black mb-6 text-play-blue uppercase tracking-tight">
              {t('mission.title')}
            </h3>
            <p className="text-base text-slate-600 leading-relaxed font-semibold">
              {t('mission.text')}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
