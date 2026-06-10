import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-[220px] md:pt-[275px] pb-12 md:pb-20 px-4 md:px-6 relative min-h-screen selections:bg-brand-red/20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12 text-black">{t('privacy.title')}</h1>
          
          <div className="space-y-8 text-gray-600 leading-relaxed font-medium">
            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('privacy.sections.gen')}</h2>
              <p>
                V Start Labu (v nadaljevanju "mi", "nas" ali "naš") spoštujemo vašo zasebnost in se zavezujemo k varovanju osebnih podatkov, ki nam jih posredujete preko naše spletne strani. Ta pravilnik o zasebnosti pojasnjuje, kako zbiramo, uporabljamo in varujemo vaše podatke.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('privacy.sections.data')}</h2>
              <p>
                Osebne podatke zbiramo le, ko nam jih prostovoljno posredujete (npr. preko prijavnega obrazca za delavnico ali kontaktnega obrazca). Ti podatki lahko vključujejo:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Ime in priimek (vaš in otrokov)</li>
                <li>Email naslov</li>
                <li>Telefonska številka</li>
                <li>Starost otroka</li>
                <li>Sporočilo ali vsebina povpraševanja</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('privacy.sections.usage')}</h2>
              <p>
                Vaše podatke uporabljamo izključno za:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Izvedbo prijave na delavnice</li>
                <li>Odgovarjanje na vaša vprašanja</li>
                <li>Obveščanje o pomembnih spremembah ali novostih, povezanih z našimi storitvami</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('privacy.sections.protect')}</h2>
              <p>
                Izvajamo ustrezne tehnične in organizacijske ukrepe za zaščito vaših osebnih podatkov pred nepooblaščenim dostopom, izgubo ali uničenjem. Vaših podatkov nikoli ne prodajamo ali posredujemo tretjim osebam brez vašega izrecnega dovoljenja, razen če tako zahteva zakon.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('privacy.sections.rights')}</h2>
              <p>
                Skladno z veljavno zakonodajo (GDPR) imate pravico do vpogleda, popravka, izbrisa ali omejitve obdelave vaših osebnih podatkov. Za uveljavljanje teh pravic nas kontaktirajte na info@startlab.si.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase italic text-black mb-4">{t('privacy.sections.cookies')}</h2>
              <p>
                Naša spletna stran lahko uporablja nujne piškotke za zagotavljanje pravilnega delovanja strani. Ti piškotki ne zbirajo osebnih podatkov in se ne uporabljajo za sledenje.
              </p>
            </section>

            <div className="pt-12 border-t border-black/5 text-sm italic text-gray-400">
              {t('privacy.last_update')}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
