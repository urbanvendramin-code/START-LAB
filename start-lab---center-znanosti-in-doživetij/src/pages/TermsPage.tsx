import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function TermsPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 relative min-h-screen selections:bg-brand-red/20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12 text-black">{t('terms.title')}</h1>
          
          <div className="space-y-8 text-gray-600 leading-relaxed font-medium">
            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('terms.sections.gen')}</h2>
              <p>
                Z dostopom do spletne strani startlab.si potrjujete, da ste seznanjeni s temi pogoji uporabe in jih v celoti sprejemate. Če se s pogoji ne strinjate, vas prosimo, da strani ne uporabljate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('terms.sections.reg')}</h2>
              <p>
                Dejanska vključitev v delavnico je potrjena šele po prejemu našega potrditvenega sporočila in izpolnitvi morebitnih dodatnih pogojev (npr. plačilo kotizacije, če je predvidena).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('terms.sections.content')}</h2>
              <p>
                Vse vsebine na tej spletni strani (besedila, slike, logotipi, grafike) so last Start Laba ali njegovih partnerjev in so zaščitene z avtorskimi pravicami.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('terms.sections.limit')}</h2>
              <p>
                Trudimo se, da so informacije na spletni strani točne in posodobljene, vendar ne prevzemamo odgovornosti za morebitne napake v vsebini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('terms.sections.change')}</h2>
              <p>
                Start Lab si pridržuje pravico do spremembe vsebin ali pogojev brez predhodnega obvestila.
              </p>
            </section>

            <div className="pt-12 border-t border-black/5 text-sm italic text-gray-400">
              {t('terms.last_update')}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
