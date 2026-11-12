// Complete translations for PatentsPage in Slovenian, Italian, and English
export type Lang = 'sl' | 'it' | 'en';

export interface Milestone {
  year: string;
  exactDate?: string;
  title: string;
  desc: string;
  tag: string;
  anchorId: string;
  highlight?: boolean;
}

export interface PatentRecord {
  id: string;
  number: string;
  title: string;
  category: string;
  jurisdiction: string;
  inventors: string[];
  manufacturer?: string;
  coordination?: string;
  filingDate: string;
  grantDate?: string;
  status: string;
  recognition?: string;
  abstract: string;
  abstractLabel?: string;
  keyFeatures: string[];
  pdfUrl?: string;
  videoId?: string;
}

export interface AdditionalInvention {
  title: string;
  desc: string;
  category: string;
  badge: string;
  videoId?: string;
  pdfUrl?: string;
  authors?: string;
}

export interface ExplainerStep {
  num: string;
  name: string;
  detail: string;
}

export interface ExplainerItem {
  title: string;
  patent: string;
  desc: string;
  steps: ExplainerStep[];
}

export interface VideoArchiveItem {
  id: string;
  title: string;
  duration: string;
  year: string;
  patent: string;
  desc: string;
}

export function getGalleryItems(lang: Lang) {
  return {
    chipCard: [
      {
        title: lang === 'sl' ? 'Telefonska kartica (1995)' : lang === 'it' ? 'Scheda telefonica (1995)' : 'Telephone Smart Card (1995)',
        subtitle: lang === 'sl' ? 'Originalna čip kartica Iskra Terminali & Impulz' : lang === 'it' ? 'Scheda a chip originale Iskra Terminali & Impulz' : 'Original smart card Iskra Terminali & Impulz'
      },
      {
        title: lang === 'sl' ? 'Telefonska čip kartica – tehnični prikaz' : lang === 'it' ? 'Scheda telefonica con chip – visione tecnica' : 'Telephone Chip Card – Technical Display',
        subtitle: lang === 'sl' ? 'Arhivska fotografija kontaktnih kartic z mikrokrmilnikom' : lang === 'it' ? 'Fotografia d\'archivio delle schede a contatto con microcontrollore' : 'Archival photo of contact microcontroller smart cards'
      }
    ],
    vita: [
      {
        title: lang === 'sl' ? 'Konstrukcijski načrt VITA 1' : lang === 'it' ? 'Progetto costruttivo VITA 1' : 'VITA Blueprint 1',
        subtitle: lang === 'sl' ? 'Izvirna shema cilindričnega tulca in zaklepa' : lang === 'it' ? 'Schema originale della guaina cilindrica e del blocco' : 'Original cylindrical sheath & locking detent schematic'
      },
      {
        title: lang === 'sl' ? 'Konstrukcijski načrt VITA 2' : lang === 'it' ? 'Progetto costruttivo VITA 2' : 'VITA Blueprint 2',
        subtitle: lang === 'sl' ? 'Vzmetni mehanizem in varnostni zatič' : lang === 'it' ? 'Meccanismo a molla e perno di sicurezza' : 'Spring mechanism & safety catch detail'
      }
    ],
    gas: [
      {
        title: lang === 'sl' ? 'Plinski štedilnik' : lang === 'it' ? 'Cucina a gas' : 'Gas Stove Range',
        subtitle: lang === 'sl' ? 'Plinski štedilnik z vgrajenim varnostnim časovnikom' : lang === 'it' ? 'Cucina a gas con timer di sicurezza integrato' : 'Gas stove with integrated safety timer dial'
      },
      {
        title: lang === 'sl' ? 'Tehnični načrt' : lang === 'it' ? 'Schema tecnico' : 'Technical Blueprint',
        subtitle: lang === 'sl' ? 'Razrez zapornega ventila in urnega mehanizma' : lang === 'it' ? 'Sezione della valvola di arresto e timer' : 'Shutoff valve and clockwork mechanism cutaway'
      },
      {
        title: lang === 'sl' ? 'Gorilnik in ventil' : lang === 'it' ? 'Bruciatore e valvola' : 'Burner & Valve',
        subtitle: lang === 'sl' ? 'Integracija termočlena in zapornega mehanizma' : lang === 'it' ? 'Integrazione termocoppia e valvola di sicurezza' : 'Thermocouple integration and shutoff assembly'
      }
    ]
  };
}

export function getTimelineEvents(lang: Lang): Milestone[] {
  return [
    {
      year: '1990',
      exactDate: lang === 'sl' ? '12. december 1990' : lang === 'it' ? '12 dicembre 1990' : 'December 12, 1990',
      title: lang === 'sl' ? 'Prijava patenta za iglo VITA' : lang === 'it' ? 'Deposito brevetto ago VITA' : 'VITA needle patent filed',
      desc: lang === 'sl'
        ? 'Prijava revolucionarnega patenta za zaščitni mehanizem podkožnih igel pri Uradu ZDA za patente in blagovne znamke (USPTO).'
        : lang === 'it'
          ? 'Deposito del brevetto rivoluzionario per il meccanismo di protezione degli aghi ipodermici presso l\'Ufficio Brevetti USA (USPTO).'
          : 'Filing of the groundbreaking patent application for a protective hypodermic needle assembly at the USPTO.',
      tag: lang === 'sl' ? 'Medicinski patent' : lang === 'it' ? 'Brevetto medico' : 'Medical patent',
      anchorId: 'izum-vita'
    },
    {
      year: '1991',
      exactDate: lang === 'sl' ? '24. september 1991' : lang === 'it' ? '24 settembre 1991' : 'September 24, 1991',
      title: lang === 'sl' ? 'Podeljen patent US5051109A' : lang === 'it' ? 'Brevetto concesso US5051109A' : 'Granted US Patent US5051109A',
      desc: lang === 'sl'
        ? 'Urad ZDA uradno podeli patent US 5,051,109 A za »Safety hypodermic needle assembly« izumitelju Tasu Lazovskemu.'
        : lang === 'it'
          ? 'L\'Ufficio Brevetti USA concede ufficialmente il brevetto US 5,051,109 A per »Safety hypodermic needle assembly« all\'inventore Tase Lazovski.'
          : 'The USPTO officially grants US Patent 5,051,109 A for "Safety hypodermic needle assembly" to inventor Tase Lazovski.',
      tag: 'USPTO ZDA',
      anchorId: 'izum-vita'
    },
    {
      year: '1993',
      exactDate: lang === 'sl' ? 'November 1993' : lang === 'it' ? 'Novembre 1993' : 'November 1993',
      title: lang === 'sl' ? 'EUREKA Bruselj – Zlata medalja (Médaille d’Or)' : lang === 'it' ? 'EUREKA Bruxelles – Medaglia d’oro (Médaille d’Or)' : 'EUREKA Brussels – Gold Medal (Médaille d’Or)',
      desc: lang === 'sl'
        ? 'Svetovna razstava inovacij in novih tehnologij v Bruslju podeli zlato medaljo (médaille d’or) za inovacijo VITA.'
        : lang === 'it'
          ? 'Il Salone Mondiale dell’Innovazione di Bruxelles conferisce la medaglia d’oro (médaille d’or) a VITA.'
          : 'World Exhibition of Innovation in Brussels awards the Gold Medal (Médaille d’Or) for the VITA invention.',
      tag: 'EUREKA 1993',
      anchorId: 'izum-vita'
    },
    {
      year: '1995',
      exactDate: lang === 'sl' ? '14. junij 1995' : lang === 'it' ? '14 giugno 1995' : '14 June 1995',
      title: lang === 'sl' ? 'Telefonske čip kartice v Sloveniji' : lang === 'it' ? 'Schede telefoniche con chip' : 'Telephone chip cards in Slovenia',
      desc: lang === 'sl'
        ? 'Uradni zagon sistema telefonskih kartic z vgrajenim čipom. Tehnološki preskok z žetonov na elektronske kartice z Iskra Terminali in Impulz.'
        : lang === 'it'
          ? 'Lancio ufficiale delle schede telefoniche con microchip, superando i gettoni metallici in collaborazione con Iskra Terminali e Impulz.'
          : 'Official rollout of smart telephone chip cards in Slovenia, replacing tokens with electronic microchips with Iskra Terminali and Impulz.',
      tag: lang === 'sl' ? 'Telekomunikacije' : lang === 'it' ? 'Telecomunicazioni' : 'Telecommunications',
      anchorId: 'izum-kartica',
      highlight: true
    },
    {
      year: '1999',
      exactDate: '1999',
      title: lang === 'sl' ? 'Prvi parkirni avtomati v Novi Gorici' : lang === 'it' ? 'Primi parcometri a Nova Gorica' : 'First parking meters in Nova Gorica',
      desc: lang === 'sl'
        ? 'Uvedba prvih univerzalnih elektronskih parkirnih avtomatov s solarnim napajanjem in sodobnim nadzorom plačil.'
        : lang === 'it'
          ? 'Introduzione dei primi parcometri universali elettronici con alimentazione solare a Nova Gorica.'
          : 'Deployment of the first universal electronic solar-powered parking terminals in Nova Gorica.',
      tag: lang === 'sl' ? 'Urbana tehnologija' : lang === 'it' ? 'Tecnologia urbana' : 'Urban technology',
      anchorId: 'izum-parkirni'
    },
    {
      year: '2004',
      exactDate: lang === 'sl' ? 'Patentna zaščita' : lang === 'it' ? 'Protezione brevettuale' : 'Patent Protection',
      title: lang === 'sl' ? 'Časovni varnostni ventil za plin' : lang === 'it' ? 'Valvola di sicurezza per gas' : 'Gas stove safety timer valve',
      desc: lang === 'sl'
        ? 'Razvoj in patentna zaščita elektromehanskega varnostnega časovnika za plinske kuhalnike v sodelovanju z Emilom Benkom.'
        : lang === 'it'
          ? 'Sviluppo e protezione brevettuale del temporizzatore di sicurezza per cucine a gas con Emil Benko.'
          : 'Development and patent protection of the electromechanical safety timer for gas stoves with Emil Benko.',
      tag: lang === 'sl' ? 'Varnost v domu' : lang === 'it' ? 'Sicurezza domestica' : 'Home Safety',
      anchorId: 'izum-plin'
    },
    {
      year: '2014',
      exactDate: lang === 'sl' ? 'Mednarodna zaščita' : lang === 'it' ? 'Protezione internazionale' : 'International Protection',
      title: lang === 'sl' ? 'Odvod statične elektrike od ljudi' : lang === 'it' ? 'Scarica elettrostatica controllata' : 'Controlled Static Electricity Discharge',
      desc: lang === 'sl'
        ? 'Patentirana tehnologija nebolečega odvoda statične elektrike od ljudi v 150–250 ms (Atemm H-ESD v avtomobilih in Atemm GREEN POINT v delovnih prostorih).'
        : lang === 'it'
          ? 'Tecnologia brevettata per la scarica indolore delle cariche elettrostatiche in 150-250 ms (Atemm H-ESD e GREEN POINT).'
          : 'Patented technology for painless controlled static discharge within 150–250 ms in vehicles (Atemm H-ESD) and workstations/keyboards (Atemm GREEN POINT).',
      tag: 'EP 2805592 · US 959672',
      anchorId: 'izum-static'
    }
  ];
}

export function getPatentRegistry(lang: Lang): PatentRecord[] {
  return [
    {
      id: 'us5051109a',
      number: 'US 5,051,109 A',
      title: lang === 'sl' ? 'Varnostni injekcijski sklop (Safety hypodermic needle assembly)' : lang === 'it' ? 'Gruppo ago ipodermico di sicurezza (Safety needle assembly)' : 'Safety hypodermic needle assembly',
      category: lang === 'sl' ? 'Medicinska tehnologija' : lang === 'it' ? 'Tecnologia medica' : 'Medical Technology',
      jurisdiction: lang === 'sl' ? 'ZDA (USPTO) / Mednarodno' : lang === 'it' ? 'USA (USPTO) / Internazionale' : 'USA (USPTO) / International',
      inventors: ['Tase Lazovski'],
      filingDate: lang === 'sl' ? '12. december 1990' : lang === 'it' ? '12 dicembre 1990' : 'December 12, 1990',
      grantDate: lang === 'sl' ? '24. september 1991' : lang === 'it' ? '24 settembre 1991' : 'September 24, 1991',
      status: lang === 'sl' ? 'Zgodovinski patent (podeljen)' : lang === 'it' ? 'Brevetto storico (concesso)' : 'Historical Patent (Granted)',
      recognition: 'EUREKA Bruselj 1993 – Médaille d’Or',
      abstract: lang === 'sl'
        ? 'Zaščitni tulec za injekcijske igle, ki po iniciranju prepreči nehote vbode medicinskega osebja.'
        : lang === 'it'
          ? 'Guaina protettiva per aghi da iniezione che dopo l\'iniezione impedisce punture accidentali del personale medico.'
          : 'Protective sleeve for injection needles that prevents accidental needle-sticks of medical personnel after injection.',
      keyFeatures: [
        lang === 'sl' ? 'Avtomatski nepovratni zaklep zaščitnega pokrovčka' : lang === 'it' ? 'Blocco irreversibile automatico della guaina protettiva' : 'Automatic irreversible sleeve locking',
        lang === 'sl' ? 'Zaščita zdravstvenih delavcev pred okužbami (HIV, hepatitis)' : lang === 'it' ? 'Protezione degli operatori sanitari da infezioni ematiche (HIV, epatite)' : 'Healthcare worker protection against bloodborne pathogens',
        lang === 'sl' ? 'Enoročno aktiviranje brez spreminjanja kliničnega postopka' : lang === 'it' ? 'Attivazione con una sola mano senza alterare la procedura clinica' : 'One-handed activation mechanism',
        lang === 'sl' ? 'Mednarodno priznanje EUREKA 1993 v Bruslju (Médaille d’Or)' : lang === 'it' ? 'Riconoscimento internazionale EUREKA 1993 a Bruxelles (Médaille d’Or)' : 'EUREKA 1993 Brussels Gold Medal distinction (Médaille d’Or)'
      ]
    },
    {
      id: 'chip-card',
      number: 'IS-TK-1995',
      title: lang === 'sl' ? 'Elektronska telefonska kartica s čipom in procesni sistem' : lang === 'it' ? 'Scheda telefonica con chip e sistema di processo' : 'Electronic Telephone Smart Chip Card System',
      category: lang === 'sl' ? 'Telekomunikacije & elektronika' : lang === 'it' ? 'Telecomunicazioni & elettronica' : 'Telecommunications & Electronics',
      jurisdiction: lang === 'sl' ? 'Slovenija / Iskra Terminali & Impulz' : lang === 'it' ? 'Slovenia / Iskra Terminali & Impulz' : 'Slovenia / Iskra Terminali & Impulz',
      inventors: [
        lang === 'sl' ? 'Tase Lazovski (z vidika marketinga)' : lang === 'it' ? 'Tase Lazovski (marketing)' : 'Tase Lazovski (marketing perspective)',
        'Iskra Terminali Kranj & Impulz d.o.o. Nova Gorica'
      ],
      filingDate: '1994',
      grantDate: lang === 'sl' ? '14. junij 1995 (uradna vpeljava)' : lang === 'it' ? '14 giugno 1995 (lancio ufficiale)' : '14 June 1995 (official rollout)',
      status: lang === 'sl' ? 'Arhivska implementacija' : lang === 'it' ? 'Implementazione d\'archivio' : 'Archival Implementation',
      recognition: lang === 'sl' ? 'Nacionalni prehod z žetonov na elektronske kartice' : lang === 'it' ? 'Transizione nazionale dai gettoni alle carte elettroniche' : 'National transition from tokens to smart cards',
      abstract: lang === 'sl'
        ? 'Realizacijo uvedbe čip kartic za potrebe javnih telefonskih govorilnic so omogočili Iskra Terminali Kranj in Impulz d.o.o. Nova Gorica. Tase Lazovski je izumitelj pri čip kartici z vidika marketinga.'
        : lang === 'it'
          ? 'La realizzazione dell\'introduzione delle schede a microchip per le cabine telefoniche pubbliche è stata resa possibile da Iskra Terminali Kranj e Impulz d.o.o. Nova Gorica. Tase Lazovski è l\'inventore della scheda a chip dal punto di vista del marketing.'
          : 'The rollout of smart chip cards for public telephone booths was made possible by Iskra Terminali Kranj and Impulz d.o.o. Nova Gorica. Tase Lazovski is the inventor of the chip card from a marketing perspective.',
      keyFeatures: [
        lang === 'sl' ? 'Vgrajen varnostni mikrokrmilnik z zanesljivim bralnim vmesnikom' : lang === 'it' ? 'Microcontrollore di sicurezza integrato con contatti affidabili' : 'Integrated microcontroller with secure contact pads',
        lang === 'sl' ? 'Prehod javne telefonije v digitalno dobo (14. junij 1995)' : lang === 'it' ? 'Transizione della telefonia pubblica all\'era digitale (14 giugno 1995)' : 'Modernization of public payphones across Slovenia',
        lang === 'sl' ? 'Partnerstvo z gigantom Iskra Terminali in podjetjem Impulz' : lang === 'it' ? 'Partnership con Iskra Terminali e Impulz' : 'Strategic production partnership with Iskra Terminali & Impulz',
        lang === 'sl' ? 'Preprečevanje zlorab in mehanskih okvar kovancev' : lang === 'it' ? 'Prevenzione delle frodi e dei guasti meccanici da gettoni' : 'Elimination of token theft and mechanical coin slot failures'
      ]
    },
    {
      id: 'parking-meter',
      number: 'NG-PK-1999',
      title: lang === 'sl' ? 'Univerzalni avtonomni elektronski parkirni terminal' : lang === 'it' ? 'Terminale di parcheggio universale autonomo elettronico' : 'Universal Autonomous Solar Parking Terminal',
      category: lang === 'sl' ? 'Urbana avtomatizacija' : lang === 'it' ? 'Automazione urbana' : 'Urban Automation',
      jurisdiction: lang === 'sl' ? 'Nova Gorica / Slovenija' : lang === 'it' ? 'Nova Gorica / Slovenia' : 'Nova Gorica / Slovenia',
      inventors: ['Tase Lazovski'],
      manufacturer: 'Eltrade / Komunala Nova Gorica',
      coordination: lang === 'sl' ? 'Mestna občina Nova Gorica' : lang === 'it' ? 'Comune di Nova Gorica' : 'Municipality of Nova Gorica',
      filingDate: '1998',
      grantDate: lang === 'sl' ? '1999 (namestitev v mestu)' : lang === 'it' ? '1999 (installazione urbana)' : '1999 (citywide deployment)',
      status: lang === 'sl' ? 'Operativna uvedba' : lang === 'it' ? 'Implementazione operativa' : 'Operational Deployment',
      recognition: lang === 'sl' ? 'Prvi avtonomni solarni parkomati v regiji' : lang === 'it' ? 'Primi parcometri solari autonomi nella regione' : 'First autonomous solar parking kiosks in the region',
      abstract: lang === 'sl'
        ? 'Elektronski parkirni terminal z avtonomnim napajanjem prek fotovoltaičnega panela in akumulatorja. Omogočal je kombinirano plačevanje s kovanci, telefonsko čip kartico, bančno kartico in gsm telefonom brez potrebe po dragem kopanju in polaganju električnega omrežja.'
        : lang === 'it'
          ? 'Terminale di parcheggio elettronico ad alimentazione autonoma tramite pannello fotovoltaico e accumulatore. Consentiva il pagamento combinato con monete, scheda a chip, carta bancaria e telefono gsm senza costosi scavi per la rete elettrica.'
          : 'Electronic parking terminal with off-grid power via photovoltaic solar panel and battery. Enabled multi-payment acceptance for coins, phone chip cards, bank cards, and GSM mobile payments without street trenching.',
      abstractLabel: lang === 'sl' ? 'Izvleček tehnične rešitve' : lang === 'it' ? 'Sintesi della soluzione tecnica' : 'Technical Solution Summary',
      keyFeatures: [
        lang === 'sl' ? '100 % energetska neodvisnost s strešnim fotovoltaičnim modulom' : lang === 'it' ? '100% indipendenza energetica con modulo fotovoltaico a tetto' : '100% energy independence with rooftop solar panel',
        lang === 'sl' ? 'Kombiniran sprejem kovancev, čip kartic, bančnih kartic in gsm plačil' : lang === 'it' ? 'Accettazione combinata di monete, schede chip, carte bancarie e gsm' : 'Universal acceptance of coins, chip cards, bank cards, and GSM',
        lang === 'sl' ? 'Leta 1999 prvi takšni avtomati vpeljani v Novi Gorici pred sosednjimi državami' : lang === 'it' ? 'Nel 1999 primi apparecchi di questo tipo introdotti a Nova Gorica prima dei paesi vicini' : 'Deployed in Nova Gorica in 1999 ahead of neighboring countries',
        lang === 'sl' ? 'Vgrajen nizkoenergijski termični tiskalnik parkirnih listkov' : lang === 'it' ? 'Stampante termica a basso consumo integrata per biglietti' : 'Built-in ultra-low-power thermal ticket printer'
      ]
    },
    {
      id: 'gas-valve',
      number: 'SI-GAS-2004',
      title: lang === 'sl' ? 'Časovno krmiljen varnostni ventil za plinske štedilnike' : lang === 'it' ? 'Valvola temporizzata di sicurezza per cucine a gas' : 'Timed Safety Shutoff Valve for Gas Stoves',
      category: lang === 'sl' ? 'Gospodinjska varnost' : lang === 'it' ? 'Sicurezza domestica' : 'Home Safety Engineering',
      jurisdiction: lang === 'sl' ? 'Slovenija / Mednarodno' : lang === 'it' ? 'Slovenia / Internazionale' : 'Slovenia / International',
      inventors: ['Tase Lazovski', 'Emil Benko'],
      filingDate: '2004',
      grantDate: lang === 'sl' ? 'Patentna zaščita' : lang === 'it' ? 'Protezione brevettuale' : 'Patent Protection',
      status: lang === 'sl' ? 'Patentirano & razvito' : lang === 'it' ? 'Brevettato & sviluppato' : 'Patented & Developed',
      recognition: lang === 'sl' ? 'Rešitev za preprečevanje požarov v gospodinjstvih' : lang === 'it' ? 'Soluzione di sicurezza antincendio per ambienti domestici' : 'Domestic fire & gas poisoning prevention breakthrough',
      abstract: lang === 'sl'
        ? 'Mehanski in elektromehanski varnostni ventil s časovnikom za plinske kuhalnike, ki po poteku nastavljenega časa avtomatsko in zanesljivo prekine dovod plina, če uporabnik pozabi ugasniti gorilnik.'
        : lang === 'it'
          ? 'Valvola di sicurezza meccanica ed elettromeccanica temporizzata per cucine a gas, che interrompe automaticamente l\'erogazione del gas allo scadere del tempo se il bruciatore è rimasto acceso.'
          : 'Mechanical and electromechanical timed safety valve for gas ranges that automatically and reliably cuts gas supply after a pre-set duration if a burner is left unattended.',
      keyFeatures: [
        lang === 'sl' ? 'Avtomatska prekinitev dovoda plina po preteku izbranega časa' : lang === 'it' ? 'Interruzione automatica del gas allo scadere del tempo selezionato' : 'Automatic gas shutoff upon preset timer expiration',
        lang === 'sl' ? 'Enostavna integracija med plinsko jeklenko/mrežo in gorilnik' : lang === 'it' ? 'Facile integrazione tra bombola/rete gas e bruciatori' : 'Universal retrofit between supply line and burners',
        lang === 'sl' ? 'Delovanje brez potrebe po zunanjem električnem omrežju (mehanski urni mehanizem)' : lang === 'it' ? 'Funzionamento autonomo senza rete elettrica esterna (meccanismo a orologeria)' : 'Failsafe operation without external mains electricity',
        lang === 'sl' ? 'Združljivo z vsemi standardnimi plinskimi štedilniki' : lang === 'it' ? 'Compatibile con tutte le cucine a gas standard' : 'Compatible with all conventional domestic LPG and gas cooktops'
      ]
    },
    {
      id: 'static-esd',
      number: 'EP 2805592 / US 959672',
      title: lang === 'sl' ? 'Naprava in postopek za kontroliran odvod elektrostatičnega naboja od ljudi' : lang === 'it' ? 'Dispositivo e metodo per la scarica elettrostatica controllata da persone' : 'Apparatus and Method for Controlled Electrostatic Discharge from Humans',
      category: lang === 'sl' ? 'Elektrostatika & industrijska varnost' : lang === 'it' ? 'Elettrostatica & sicurezza industriale' : 'Electrostatics & Industrial Safety',
      jurisdiction: lang === 'sl' ? 'Evropski patentni urad (EPO) / ZDA (USPTO)' : lang === 'it' ? 'Ufficio Brevetti Europeo (EPO) / USA (USPTO)' : 'European Patent Office (EPO) / USPTO (USA)',
      inventors: ['Tase Lazovski', 'Emil Benko', 'Angelo Porcaro'],
      filingDate: '2013 / 2014',
      grantDate: lang === 'sl' ? 'Podeljena patenta EP 2805592 in US 959672' : lang === 'it' ? 'Brevetti concessi EP 2805592 e US 959672' : 'Granted Patents EP 2805592 & US 959672',
      status: lang === 'sl' ? 'Podeljen mednarodni patent (EP / US)' : lang === 'it' ? 'Brevetto internazionale concesso (EP / US)' : 'Granted International Patent (EP / US)',
      recognition: lang === 'sl' ? 'Izdelki Atemm GREEN POINT in Atemm H-ESD' : lang === 'it' ? 'Prodotti Atemm GREEN POINT e Atemm H-ESD' : 'Products Atemm GREEN POINT & Atemm H-ESD',
      abstract: lang === 'sl'
        ? 'Patentirana rešitev nebolečega kontroliranega odvoda statičnega naboja od ljudi v času med 150 in 250 ms. Preprečuje instantne razelektritve (do 25 kV), bolečine, preskoke isker, nevarnost požara ali eksplozije ter negativne vplive na zdravje in psiho. Uporablja se na avtomobilih (varnostni pas Atemm H-ESD), stavbnem pohištvu, delovnih površinah ter računalniških perifernih napravah (tipkovnice in miške Atemm GREEN POINT) z možnostjo prilagoditve za X cone.'
        : lang === 'it'
          ? 'Soluzione brevettata per la scarica indolore e controllata della carica elettrostatica da persone entro 150-250 ms. Previene scariche istantanee (fino a 25 kV), scosse dolorose, scintillii e pericoli di incendio o esplosione. Applicata nelle cinture per auto (Atemm H-ESD), arredo, superfici da lavoro e periferiche PC (Atemm GREEN POINT) con adattabilità per zone X.'
          : 'Patented system for painless, controlled electrostatic discharge from humans within 150 to 250 ms. Prevents painful instant shocks (up to 25 kV), spark jumps, fire and explosion hazards, and adverse psycho-physical stress. Implemented in automobile seatbelts (Atemm H-ESD), machinery, architectural furniture, work surfaces, and computer peripherals (keyboards and mice Atemm GREEN POINT), with custom adaptability for hazardous X zones.',
      keyFeatures: [
        lang === 'sl' ? 'Kontroliran in neboleč odvod statičnega naboja v času 150–250 ms (brez bolečega šoka)' : lang === 'it' ? 'Scarica controllata e indolore della carica elettrostatica entro 150–250 ms' : 'Painless controlled electrostatic discharge within 150–250 ms',
        lang === 'sl' ? 'Preprečevanje preskoka iskre in nevarnosti požara ali eksplozije pri napetostih do 25 kV' : lang === 'it' ? 'Eliminazione di scintillio e rischi di incendio/esplosione fino a 25 kV' : 'Eliminates spark jumps and explosion risks from static charges up to 25 kV',
        lang === 'sl' ? 'Atemm H-ESD unikatna rešitev s prevodnim šivom na varnostnem pasu vozil (kontroliran odvod z dotikom do 7 cm²)' : lang === 'it' ? 'Atemm H-ESD soluzione unica con cucitura conduttiva su cinture di sicurezza per auto (scarica al tocco fino a 7 cm²)' : 'Atemm H-ESD unique solution with conductive thread on automotive seatbelts (discharge with touch up to 7 cm²)',
        lang === 'sl' ? 'Atemm GREEN POINT integracija za delovna mesta in stavbno pohištvo' : lang === 'it' ? 'Atemm GREEN POINT integrazione per postazioni di lavoro e arredo architettonico' : 'Atemm GREEN POINT integration for workstations and architectural furniture',
        lang === 'sl' ? 'Možnost prilagoditve časa odvoda posebnim industrijskim zahtevam (X cone)' : lang === 'it' ? 'Possibilità di adattare il tempo di scarica a requisiti industriali speciali (zone X)' : 'Adjustable discharge timing tailored for hazardous explosive X zones',
        lang === 'sl' ? 'Izumitelji: Tase Lazovski, Emil Benko, Angelo Porcaro' : lang === 'it' ? 'Inventori: Tase Lazovski, Emil Benko, Angelo Porcaro' : 'Inventors: Tase Lazovski, Emil Benko, Angelo Porcaro'
      ],
      pdfUrl: '/assets/aistudio/ODVOD_STATI_NE_ELEKTRIKE_OD_LJUDI_e6afeecb.pdf',
      videoId: 'video-static'
    }
  ];
}

export function getAdditionalInventions(lang: Lang): AdditionalInvention[] {
  return [
    {
      title: lang === 'sl' ? 'Univerzalni številčnik za obešalnike oblek' : lang === 'it' ? 'Numeratore universale per grucce' : 'Universal Coat Hanger Number Indicator',
      desc: lang === 'sl'
        ? 'Praktična mehanska rešitev za vse vrste obešalnikov, ki omogoča, da so številke artiklov vidne.'
        : lang === 'it'
          ? 'Soluzione meccanica pratica per tutti i tipi di grucce, che rende visibili i numeri degli articoli.'
          : 'Practical mechanical solution for all types of hangers that allows article numbers to be visible.',
      category: lang === 'sl' ? 'Uporabno oblikovanje' : lang === 'it' ? 'Design applicato' : 'Applied Utility',
      badge: lang === 'sl' ? 'Model / Patent' : lang === 'it' ? 'Modello / Brevetto' : 'Utility Model',
    },
    {
      title: lang === 'sl' ? 'Smučarska palica brez metlice' : lang === 'it' ? 'Bastoncino da sci senza rotella' : 'Aerodynamic Basketless Ski Pole',
      desc: lang === 'sl'
        ? 'Aerodinamična optimizirana konstrukcija smučarske palice, ki zmanjšuje upor zraka in nudi zdrs ob količkih, kar omogoča hitrejši čas smučarja.'
        : lang === 'it'
          ? 'Costruzione aerodinamica ottimizzata del bastoncino da sci, che riduce la resistenza dell\'aria e favorisce lo scivolamento sui pali, consentendo tempi migliori allo sciatore.'
          : 'Aerodynamically optimized ski pole design that reduces air drag and deflects off slalom gates, enabling faster skiing times.',
      category: lang === 'sl' ? 'Športni inženiring' : lang === 'it' ? 'Ingegneria sportiva' : 'Sports Engineering',
      badge: lang === 'sl' ? 'Športna inovacija' : lang === 'it' ? 'Innovazione sportiva' : 'Sports Innovation',
    },
    {
      title: lang === 'sl' ? 'Okvir spletnega nakupovanja in e-plačevanja' : lang === 'it' ? 'Quadro e-commerce e pagamenti' : 'Online Shopping & Electronic Payment Framework',
      desc: lang === 'sl'
        ? 'Zgodnji tehnološki in procesni koncept varne avtorizacije elektronskih plačil in identifikacije uporabnikov v spletnem okolju.'
        : lang === 'it'
          ? 'Primo quadro concettuale e tecnologico per l\'autorizzazione sicura di transazioni elettroniche e identificazione utenti sul web.'
          : 'Early technological and procedural architecture for authenticated web payments, transaction security, and digital checkout workflows.',
      category: lang === 'sl' ? 'Digitalne tehnologije' : lang === 'it' ? 'Tecnologia digitale' : 'Digital Commerce',
      badge: lang === 'sl' ? 'Konceptualni patent' : lang === 'it' ? 'Brevetto concettuale' : 'Process Architecture',
      authors: lang === 'sl'
        ? 'Avtor patenta: Jože Vilfan · Soavtor: Tase Lazovski'
        : lang === 'it'
          ? 'Autore del brevetto: Jože Vilfan · Coautore: Tase Lazovski'
          : 'Patent Author: Jože Vilfan · Co-author: Tase Lazovski'
    },
    {
      title: lang === 'sl' ? 'Ključ z označevanjem statusa zaklenjeno/odklenjeno' : lang === 'it' ? 'Chiave con indicatore di stato aperto/chiuso' : 'Key with Locked/Unlocked Status Indicator',
      desc: lang === 'sl'
        ? 'Inovativna mehanska rešitev v glavi ključa, ki ob zaprtju s premikom mehanizma v smeri ključavnice, nam pokaže odprto ali zaprto.'
        : lang === 'it'
          ? 'Soluzione meccanica innovativa nella testa della chiave che, al momento della chiusura spostando il meccanismo verso la serratura, indica aperto o chiuso.'
          : 'Innovative mechanical solution in the key head that, upon locking by moving the mechanism toward the lock, indicates open or locked.',
      category: lang === 'sl' ? 'Mehanika & varnost' : lang === 'it' ? 'Meccanica & sicurezza' : 'Mechanical Utility',
      badge: lang === 'sl' ? 'Mehanska inovacija' : lang === 'it' ? 'Innovazione meccanica' : 'Mechanical Patent',
    }
  ];
}

export function getExplainerData(lang: Lang): Record<string, ExplainerItem> {
  return {
    vita: {
      title: lang === 'sl' ? 'Mehanizem varnostne igle VITA' : lang === 'it' ? 'Meccanismo dell\'ago di sicurezza VITA' : 'VITA Safety Needle Mechanism',
      patent: 'US Patent 5,051,109 A',
      desc: lang === 'sl' 
        ? 'Prebojni patent Taseta Lazovskega temelji na preprostem, a zanesljivem mehanizmu, ki medicinskemu osebju omogoča običajno vbrizgavanje, takoj po njem pa z roko sproži zaščitni tulec, ki nepovratno blokira ostro konico igle.'
        : lang === 'it'
          ? 'Il brevetto pionieristico di Tase Lazovski si basa su un meccanismo semplice e affidabile che consente al personale medico la consueta iniezione, attivando poi con la mano la guaina protettiva che blocca irreversibilmente la punta affilata.'
          : 'Tase Lazovski’s breakthrough patent allows normal clinical operation while integrating an instant locking sheath that irreversibly shields the sharp needle tip.',
      steps: [
        {
          num: '01',
          name: lang === 'sl' ? 'Priprava & vbrizgavanje' : lang === 'it' ? 'Preparazione & iniezione' : 'Clinical Preparation & Injection',
          detail: lang === 'sl' 
            ? 'Igla deluje kot običajna medicinska; zaščitni tulec je v začetnem položaju pritrjen na telo brizge in ne ovira preglednosti vboda.' 
            : lang === 'it'
              ? 'L\'ago funziona come un normale ago medico; la guaina protettiva è inizialmente posizionata sul corpo della siringa e non ostruisce la visibilità.'
              : 'Needle operates normally; protective sheath rests retracted without obstructing needle visualization.'
        },
        {
          num: '02',
          name: lang === 'sl' ? 'Sprostitev zaklepa' : lang === 'it' ? 'Rilascio del blocco' : 'Lock Release Trigger',
          detail: lang === 'sl' 
            ? 'Zdravstveni delavec z roko premakne varnostni tulec iz začetnega položaja.' 
            : lang === 'it'
              ? 'L\'operatore sanitario sposta con la mano la guaina protettiva dalla posizione iniziale.'
              : 'Healthcare worker slides safety catch out of primary detent with single-hand motion.'
        },
        {
          num: '03',
          name: lang === 'sl' ? 'Aksialni premik tulca' : lang === 'it' ? 'Movimento assiale della guaina' : 'Axial Sheath Extension',
          detail: lang === 'sl' 
            ? 'Zaščitni tulec se po končanem vbrizganju s prstom zadrži, samo iglo pa vlečemo iz telesa, na kar se notranji del tulca zatakne na vrh konice igle.' 
            : lang === 'it'
              ? 'La guaina protettiva viene trattenuta con il dito dopo l\'iniezione mentre l\'ago viene estratto, agganciando la parte interna della guaina alla punta dell\'ago.'
              : 'Protective sheath is retained with finger as needle is withdrawn, locking internal sheath detent over cannula tip.'
        },
        {
          num: '04',
          name: lang === 'sl' ? 'Trajna blokada zaščitnega tulca' : lang === 'it' ? 'Blocco permanente della guaina' : 'Permanent Sheath Lockout',
          detail: lang === 'sl' 
            ? 'S tem dosežemo, da se injekcijska igla zapiči v telo tulca in prepreči kakeršenjkoli negativen poseg na medicinsko osebje.' 
            : lang === 'it'
              ? 'Si garantisce che l\'ago da iniezione resti intrappolato nel corpo della guaina, prevenendo qualsiasi impatto negativo sul personale medico.'
              : 'The needle embeds firmly within the protective housing, permanently eliminating any risk of needlestick injury to medical staff.'
        }
      ]
    },
    parking: {
      title: lang === 'sl' ? 'Univerzalni parkirni terminal Nova Gorica 1999' : lang === 'it' ? 'Terminale di parcheggio universale Nova Gorica 1999' : 'Nova Gorica 1999 Universal Parking Terminal',
      patent: lang === 'sl' ? 'Komunalna tehnologija 1999' : lang === 'it' ? 'Tecnologia municipale 1999' : 'Municipal Technology 1999',
      desc: lang === 'sl'
        ? 'Leta 1999 je Nova Gorica med prvimi uvedla samostojne, energetsko neodvisne parkomate. Inovacija je združila fotovoltaiko, prepoznavanje kovancev, čip kartic, bančnih kartic in GSM telefonov.'
        : lang === 'it'
          ? 'Nel 1999 Nova Gorica è stata tra le prime a introdurre parcometri autonomi ed energeticamente indipendenti, combinando fotovoltaico, riconoscimento di monete, schede a chip, carte bancarie e telefoni GSM.'
          : 'In 1999, Nova Gorica was among the pioneers implementing autonomous solar-powered parking kiosks supporting coin, chip card, bank card, and GSM operations.',
      steps: [
        {
          num: '01',
          name: lang === 'sl' ? 'Solarno napajanje' : lang === 'it' ? 'Alimentazione solare' : 'Solar Photovoltaic Power',
          detail: lang === 'sl' ? 'Zgornji fotovoltaični modul polni vgrajeni akumulator, kar omogoča delovanje brez dragega kopanja in vlečenja električnih kablov po mestu.' : lang === 'it' ? 'Il modulo fotovoltaico superiore ricarica l\'accumulatore, consentendo il funzionamento senza costosi scavi stradali.' : 'Roof-mounted solar PV panel charges deep-cycle battery, avoiding costly trenching and street cabling.'
        },
        {
          num: '02',
          name: lang === 'sl' ? 'Validacija plačila' : lang === 'it' ? 'Validazione del pagamento' : 'Dual Payment Validation',
          detail: lang === 'sl' ? 'Avtomat sprejme kovance z optičnim in induktivnim merjenjem premera/teže ali odšteje znesek z vstavljenih plačilnih kartic.' : lang === 'it' ? 'L\'apparecchio valida le monete tramite sensori ottici/induttivi o scala l\'importo dalle carte di pagamento inserite.' : 'Unit validates coins via optical/inductive sensors or reads stored-value electronic chip cards.'
        },
        {
          num: '03',
          name: lang === 'sl' ? 'Termični tisk listka' : lang === 'it' ? 'Stampa termica del tagliando' : 'Thermal Ticket Printing',
          detail: lang === 'sl' ? 'Nizkoenergijski termični tiskalnik natisne veljavnost parkiranja, cono in registrsko kodo z visoko kontrastnim tiskom.' : lang === 'it' ? 'La stampante termica a basso consumo stampa scadenza sosta, zona e codice con elevato contrasto.' : 'Low-power thermal mechanism prints parking expiration, zone, and timecode.'
        },
        {
          num: '04',
          name: lang === 'sl' ? 'Centralni nadzor' : lang === 'it' ? 'Controllo centralizzato' : 'Municipal Telemetry',
          detail: lang === 'sl' ? 'Avtomat preko integrirane telemetrije poroča komunalnemu centru o stanju blagajne, zalogi papirja ter napolnjenosti akumulatorja.' : lang === 'it' ? 'Tramite telemetria integrata il terminale invia lo stato di cassa, riserva carta e carica batteria al centro operativo.' : 'Embedded modem periodically transmits coin vault levels, paper roll status, and power telemetry.'
        }
      ]
    },
    card: {
      title: lang === 'sl' ? 'Telefonska čip kartica Iskra 1995' : lang === 'it' ? 'Scheda telefonica a chip Iskra 1995' : 'Iskra 1995 Contact Chip Card System',
      patent: lang === 'sl' ? 'Nacionalni telekomunikacijski sistem' : lang === 'it' ? 'Sistema nazionale di telecomunicazioni' : 'National Telecommunications Standard',
      desc: lang === 'sl'
        ? 'Projekt uvedbe kontaktnih čip kartic je nadomestil kovinske telefonske žetone. Uporabnikom je omogočil preprosto, zanesljivo telefoniranje iz javnih govorilnic brez gotovine.'
        : lang === 'it'
          ? 'Il progetto di introduzione delle schede a chip ha sostituito i gettoni metallici, consentendo agli utenti telefonate semplici e sicure dalle cabine pubbliche senza contanti.'
          : 'Transitioning from easily jammed brass tokens to secure integrated circuit smart cards, enabling nationwide cashless public payphone communications.',
      steps: [
        {
          num: '01',
          name: lang === 'sl' ? 'Sprejem mikrokartice' : lang === 'it' ? 'Inserimento scheda' : 'Contact Card Interface',
          detail: lang === 'sl' ? 'Pozlačeni kontakti v reži govorilnice vzpostavijo neposredno povezavo z mikrokrmilnikom kartice ob minimalni porabi toka.' : lang === 'it' ? 'I contatti dorati stabiliscono una connessione diretta con il microchip della scheda a consumo minimo.' : 'Gold-plated spring contacts engage ISO 7816 pads, reading stored pulses with zero standby draw.'
        },
        {
          num: '02',
          name: lang === 'sl' ? 'Preprečevanje zlorab' : lang === 'it' ? 'Prevenzione delle frodi' : 'Tamper-Proof Encryption',
          detail: lang === 'sl' ? 'Elektronski zapis impulzov preprečuje ponarejanje, mehanske prevare z žicami ali ponovno uporabo porabljenih kartic.' : lang === 'it' ? 'La crittografia elettronica degli scatti impedisce frodi meccaniche o il riutilizzo di schede esaurite.' : 'Hardware write-once fuses prevent card reuse, pulse simulation, or physical string pullbacks.'
        },
        {
          num: '03',
          name: lang === 'sl' ? 'Zanesljivost terminalov' : lang === 'it' ? 'Affidabilità dei terminali' : 'Terminal Reliability',
          detail: lang === 'sl' ? 'Iskra Terminali javne govorilnice so s čip karticami dosegle 99,8 % razpoložljivost brez zastojev.' : lang === 'it' ? 'Le cabine pubbliche Iskra Terminali hanno raggiunto il 99,8% di operatività continua con le schede a chip.' : 'Public payphones achieved 99.8% field uptime without coin slot clogs.'
        }
      ]
    },
    gas: {
      title: lang === 'sl' ? 'Varnostni časovnik za plin (T. Lazovski & E. Benko)' : lang === 'it' ? 'Timer di sicurezza per gas (T. Lazovski & E. Benko)' : 'Gas Stove Safety Timer (T. Lazovski & E. Benko)',
      patent: lang === 'sl' ? 'Patentna zaščita varnostnega ventila' : lang === 'it' ? 'Protezione brevettuale valvola' : 'Gas Safety Valve Patent',
      desc: lang === 'sl'
        ? 'V sodelovanju z Emilom Benkom razviti varnostni mehanizem naslavlja enega najpogostejših vzrokov gospodinjskih nesreč: pozabljen prižgan plinski gorilnik.'
        : lang === 'it'
          ? 'Sviluppato con Emil Benko, questo meccanismo affronta una delle cause più comuni di incidenti domestici: i fornelli a gas lasciati accesi.'
          : 'Developed with engineer Emil Benko, this safety mechanism addresses home hazards by automatically severing gas flow when burners are left unattended.',
      steps: []
    }
  };
}

export function getVideoArchives(lang: Lang): VideoArchiveItem[] {
  return [
    {
      id: 'video-vita',
      title: lang === 'sl' ? 'Injekcijska igla VITA – Predstavitev mehanizma' : lang === 'it' ? 'Ago per iniezione VITA – Dimostrazione del meccanismo' : 'VITA Safety Needle – Mechanism Demonstration',
      duration: '02:45',
      year: '1993',
      patent: 'US5051109A',
      desc: lang === 'sl'
        ? 'Arhivski posnetek in tehnični prikaz delovanja varnostnega mehanizma igle VITA, ki preprečuje nevarne vbode z avtomatskim zaklepom tulca.'
        : lang === 'it'
          ? 'Filmato d\'archivio e dimostrazione tecnica del funzionamento del meccanismo di sicurezza dell\'ago VITA che previene punture accidentali.'
          : 'Archival footage and mechanical demonstration of the VITA safety needle assembly preventing needlestick injuries.'
    },
    {
      id: 'video-parking',
      title: lang === 'sl' ? 'Univerzalni parkirni avtomat Nova Gorica 1999' : lang === 'it' ? 'Parcometro universale Nova Gorica 1999' : 'Nova Gorica 1999 Universal Parking Terminal',
      duration: '03:12',
      year: '1999',
      patent: 'NG-PK-1999',
      desc: lang === 'sl'
        ? 'Predstavitev delovanja prvih solarnih parkirnih terminalov v Novi Gorici z možnostjo plačila s kovanci, telefonsko kartico in gsm telefonom.'
        : lang === 'it'
          ? 'Presentazione del funzionamento dei primi parcometri solari a Nova Gorica con pagamento con monete, scheda e cellulare.'
          : 'Historical broadcast covering the deployment of autonomous solar-powered parking kiosks across Nova Gorica.'
    },
    {
      id: 'video-static',
      title: lang === 'sl' ? 'Odvod statične elektrike od ljudi – Testni laboratorij' : lang === 'it' ? 'Scarica elettrostatica da persone – Test di laboratorio' : 'Controlled Human Static Discharge – Test Lab Demo',
      duration: '04:05',
      year: '2014',
      patent: 'EP2805592',
      desc: lang === 'sl'
        ? 'Laboratorijska meritev in primerjava hipne boleče razelektritve (25 kV) ter kontroliranega nebolečega odvoda statičnega naboja v 150–250 ms.'
        : lang === 'it'
          ? 'Misurazioni di laboratorio che confrontano le dolorose scosse istantanee (25 kV) con la scarica controllata e indolore in 150-250 ms.'
          : 'Laboratory instrumentation demonstration contrasting painful 25 kV static shocks against patented 150–250 ms controlled discharge.'
    }
  ];
}

export function getPatentsUI(lang: Lang) {
  return {
    hero: {
      badge: lang === 'sl' ? 'VERIFICIRANI PATENTI & MODELI · 1990–2026' : lang === 'it' ? 'BREVETTI & MODELLI VERIFICATI · 1990–2026' : 'VERIFIED PATENTS & MODELS · 1990–2026',
      role: lang === 'sl' ? 'IZUMITELJ' : lang === 'it' ? 'INVENTORE' : 'INVENTOR',
      slogan: lang === 'sl' ? '“Ideje, ki postanejo del sveta.”' : lang === 'it' ? '“Idee che diventano parte del mondo.”' : '“Ideas that become part of the world.”',
      overview: lang === 'sl'
        ? 'Spoznajte izumiteljski opus Taseta Lazovskega – od mednarodno priznanega patenta za varnostno injekcijsko iglo VITA z nagrado EUREKA v Bruslju, do pionirske uvedbe telefonskih čip kartic v Sloveniji in prvih sodobnih parkirnih avtomatov v Novi Gorici.'
        : lang === 'it'
          ? 'Esplora l\'eredità dell\'inventore Tase Lazovski: dal brevetto internazionale per l\'ago di sicurezza VITA premiato all\'EUREKA di Bruxelles, alle prime schede telefoniche con chip e ai parcometri urbani a Nova Gorica.'
          : 'Discover the technological legacy of inventor Tase Lazovski: from the globally granted VITA safety needle patent awarded at EUREKA Brussels, to introducing smart chip phone cards in Slovenia and modern parking terminals in Nova Gorica.',
      metrics: {
        patentUs: lang === 'sl' ? 'Patent ZDA' : lang === 'it' ? 'Brevetto USA' : 'US Patent',
        brussels: lang === 'sl' ? 'Bruselj 1993' : lang === 'it' ? 'Bruxelles 1993' : 'Brussels 1993',
        cardsDate: lang === 'sl' ? '14. junij 1995' : lang === 'it' ? '14 giugno 1995' : '14 June 1995',
        cards: lang === 'sl' ? 'Čip kartice' : lang === 'it' ? 'Schede chip' : 'Chip cards',
        parkingDate: lang === 'sl' ? 'Nova Gorica 1999' : lang === 'it' ? 'Nova Gorica 1999' : 'Nova Gorica 1999',
        parking: lang === 'sl' ? 'Parkomati' : lang === 'it' ? 'Parcometri' : 'Parking meters',
      },
      ctaExplore: lang === 'sl' ? 'RAZIŠČI IZUME' : lang === 'it' ? 'ESPLORA LE INVENZIONI' : 'EXPLORE INVENTIONS',
      ctaTimeline: lang === 'sl' ? 'ČASOVNICA' : lang === 'it' ? 'CRONOLOGIA' : 'TIMELINE',
      ctaRegistry: lang === 'sl' ? 'REGISTER PATENTOV' : lang === 'it' ? 'REGISTRO DEI BREVETTI' : 'PATENT REGISTRY',
      placardRef: lang === 'sl' ? 'ARHIVSKI EKSPONAT · REF. TL-ARCH-01' : lang === 'it' ? 'REPERTO D\'ARCHIVIO · RIF. TL-ARCH-01' : 'ARCHIVAL EXHIBIT · REF. TL-ARCH-01',
      placardRegion: lang === 'sl' ? 'SLOVENIJA / MEDNARODNO' : lang === 'it' ? 'SLOVENIA / INTERNAZIONALE' : 'SLOVENIA / INTERNATIONAL',
      placardTitle: lang === 'sl' ? 'Tehnični načrti, patenti in prototipi' : lang === 'it' ? 'Progetti tecnici, brevetti e prototipi' : 'Technical blueprints, patents and prototypes',
      placardDesc: lang === 'sl' ? 'Zbirka originalne tehnične dokumentacije, prototipov varovalnih sistemov in industrijskih aplikacij izumitelja Taseta Lazovskega.' : lang === 'it' ? 'Collezione di documentazione tecnica originale, prototipi e applicazioni dell\'inventore Tase Lazovski.' : 'Collection of original technical documentation, safety prototypes, and industrial applications by inventor Tase Lazovski.',
      placardBadge: lang === 'sl' ? 'Pristni arhivski viri' : lang === 'it' ? 'Fonti d\'archivio autentiche' : 'Authentic archival sources'
    },
    story: {
      tag: lang === 'sl' ? '01 · DOKUMENTARNI PREGLED' : lang === 'it' ? '01 · PANORAMICA DOCUMENTARIA' : '01 · DOCUMENTARY OVERVIEW',
      titlePart1: lang === 'sl' ? 'ČLOVEK, KI JE REŠEVAL' : lang === 'it' ? 'L\'UOMO CHE HA RISOLTO' : 'THE MAN WHO SOLVED',
      titlePart2: lang === 'sl' ? 'RESNIČNE IZZIVE' : lang === 'it' ? 'SFIDE REALI' : 'REAL-WORLD CHALLENGES',
      quote: lang === 'sl'
        ? '“Vsak izum se rodi iz natančnega opazovanja: kje se ljudje soočajo z nevarnostjo, neučinkovitostjo ali zapleti, ki jih je mogoče rešiti z eleganco inženirskega mehanizma.”'
        : lang === 'it'
          ? '“Ogni invenzione nasce da un\'attenta osservazione: dove le persone affrontano pericoli, inefficienze o difficoltà che possono essere risolti con l\'eleganza di un meccanismo ingegneristico.”'
          : '“Every invention is born from close observation: wherever people face dangers, inefficiencies, or complications that can be solved through the elegance of an engineering mechanism.”',
      p1: lang === 'sl'
        ? 'Tase Lazovski sodi med slovenske izumitelje, katerih delo je neposredno zaznamovalo vsakdan tisočih ljudi. Njegov pristop ni bil teoretičen, temveč globoko praktičen: prepoznati pereč problem, zasnovati mehansko ali elektronsko rešitev, jo zaščititi s strogimi patentnimi postopki in jo pripeljati do industrijske proizvodnje.'
        : lang === 'it'
          ? 'Tase Lazovski appartiene alla schiera di inventori sloveni il cui lavoro ha segnato direttamente la vita quotidiana di migliaia di persone. Il suo approccio non era teorico, ma profondamente pratico: individuare un problema urgente, progettare una soluzione meccanica o elettronica, proteggerla con rigorose procedure brevettuali e portarla alla produzione industriale.'
          : 'Tase Lazovski belongs to the Slovenian inventors whose work has directly shaped the daily lives of thousands of people. His approach was never merely theoretical, but deeply practical: identify an urgent problem, design a mechanical or electronic solution, protect it through rigorous patent procedures, and bring it to industrial manufacturing.',
      p2: lang === 'sl'
        ? 'Ko je svet v zgodnjih devetdesetih letih pretresla epidemija nalezljivih bolezni, prenesenih s krvjo, je Lazovski zasnoval mehanizem inekcijske igle VITA. Patent je bil prepoznan na najvišji mednarodni ravni in potrjen z ameriškim patentom US5051109A ter z zlato medaljo (médaille d’or) na svetovni razstavi inovacij EUREKA 1993 v Bruslju.'
        : lang === 'it'
          ? 'Quando nei primi anni \'90 il mondo fu scosso dall\'epidemia di malattie infettive trasmesse per via ematica, Lazovski progettò il meccanismo dell\'ago per iniezioni VITA. Il brevetto ottenne il massimo riconoscimento internazionale, convalidato dal brevetto statunitense US5051109A e dalla medaglia d\'oro (médaille d\'or) al salone mondiale dell\'innovazione EUREKA 1993 a Bruxelles.'
          : 'When bloodborne infectious epidemics alarmed healthcare worldwide in the early 1990s, Lazovski designed the VITA injection needle mechanism. The patent achieved the highest international distinction, granted as US patent US5051109A and awarded the Gold Medal (Médaille d’Or) at the EUREKA 1993 World Exhibition of Innovation in Brussels.',
      p3: lang === 'sl'
        ? 'Ob prehodu v digitalno dobo je sodeloval pri projektu, ki je spremenil telekomunikacije v Sloveniji: 14. junija 1995 so bile uradno vpeljane prve telefonske kartice z mikročipom v sodelovanju z Iskra Terminali in podjetjem Impulz. Nekaj let kasneje, leta 1999, pa je v Novi Gorici postavil temelje prvega sodobnega univerzalnega parkirnega avtomata z možnostjo plačila s kovanci, telefonsko čip kartico, bančno kartico in gsm telefonom.'
        : lang === 'it'
          ? 'Durante la transizione all\'era digitale ha collaborato al progetto che ha trasformato le telecomunicazioni in Slovenia: il 14 giugno 1995 sono state introdotte ufficialmente le prime schede telefoniche con microchip in collaborazione con Iskra Terminali e l\'azienda Impulz. Qualche anno dopo, nel 1999, ha posto a Nova Gorica le basi del primo moderno parcometro universale con possibilità di pagamento con monete, scheda telefonica con chip, carta bancaria e telefono gsm.'
          : 'Transitioning into the digital era, he collaborated on a landmark project transforming telecommunications in Slovenia: on 14 June 1995, the nation\'s first smart microchip telephone cards were officially launched in cooperation with Iskra Terminali and Impulz. A few years later, in 1999, he laid the foundations in Nova Gorica for the first modern universal parking terminal accepting coins, telephone chip cards, bank cards, and GSM mobile payments.',
      p4: lang === 'sl'
        ? 'V tej predstavitvi je predstavljeno le del svetovnih patentov Taseta Lazovskega.'
        : lang === 'it'
          ? 'In questa presentazione viene illustrata solo una parte dei brevetti internazionali di Tase Lazovski.'
          : 'This exhibition presents only a selection of global patents by Tase Lazovski.',
      awardsBoxTitle: lang === 'sl' ? 'Ključna priznanja in institucije' : lang === 'it' ? 'Riconoscimenti chiave e istituzioni' : 'Key distinctions & institutions',
      awardsBoxSub: lang === 'sl' ? 'Verificirani arhivski viri' : lang === 'it' ? 'Fonti d\'archivio verificate' : 'Verified archival records',
      awardsUspto: lang === 'sl' ? 'Patent US 5,051,109 A podeljen 24. 9. 1991 za Safety hypodermic needle assembly.' : lang === 'it' ? 'Brevetto US 5,051,109 A concesso il 24/09/1991 per Safety hypodermic needle assembly.' : 'Patent US 5,051,109 A granted on Sept 24, 1991 for Safety hypodermic needle assembly.',
      awardsEureka: lang === 'sl' ? 'Zlata medalja (médaille d’or) na svetovni razstavi inovacij, raziskav in novih tehnologij.' : lang === 'it' ? 'Medaglia d\'oro (médaille d\'or) al salone mondiale dell\'innovazione, della ricerca e delle nuove tecnologie.' : 'Gold Medal (Médaille d’Or) at the World Exhibition of Innovation, Research and New Technologies.',
      awardsNg: lang === 'sl' ? 'Pilotna uvedba in prvi sodobni avtonomni parkirni avtomati v Sloveniji (1999).' : lang === 'it' ? 'Introduzione pilota e primi parcometri autonomi moderni in Slovenia (1999).' : 'Pilot deployment of Slovenia\'s first modern autonomous parking terminals (1999).',
      awardsIskra: lang === 'sl' ? 'Uradni partner pri nacionalnem prehodu s kovinskih žetonov na elektronske kartice (14. junij 1995).' : lang === 'it' ? 'Partner ufficiale per la transizione nazionale dai gettoni metallici alle carte elettroniche (14 giugno 1995).' : 'Official partner in the national transition from metal tokens to electronic smart cards (14 June 1995).',
      awardsAtemm: lang === 'sl' ? 'Inovacije v avtomobilski industriji (H-ESD varnostni pasovi) in delovnih okoljih (GREEN POINT).' : lang === 'it' ? 'Innovazioni nel settore automobilistico (cinture H-ESD) e negli ambienti di lavoro (GREEN POINT).' : 'Innovations in automotive engineering (H-ESD seatbelts) and workstation design (GREEN POINT).'
    },
    timeline: {
      tag: lang === 'sl' ? '02 · KRONOLOGIJA INOVACIJ' : lang === 'it' ? '02 · CRONOLOGIA DELLE INNOVAZIONI' : '02 · INNOVATION CHRONOLOGY',
      title: lang === 'sl' ? 'ZGODOVINSKE PRELOMNICE' : lang === 'it' ? 'TAPPE STORICHE' : 'HISTORICAL MILESTONES',
      desc: lang === 'sl' ? 'Kronološki pregled ključnih razvojnih etap, patentnih prijav in industrijskih uvedb.' : lang === 'it' ? 'Panoramica cronologica delle tappe di sviluppo, depositi brevettuali e introduzioni industriali.' : 'Chronological overview of key development phases, patent filings, and industrial deployments.',
      filters: {
        all: lang === 'sl' ? 'Vse prelomnice' : lang === 'it' ? 'Tutte le tappe' : 'All Milestones',
        med: lang === 'sl' ? 'Medicina (VITA)' : lang === 'it' ? 'Medicina (VITA)' : 'Medicine (VITA)',
        urban: lang === 'sl' ? 'Urbano & Telekom' : lang === 'it' ? 'Urbano & Telecom' : 'Urban & Telecom',
        recent: lang === 'sl' ? 'Novejši patenti' : lang === 'it' ? 'Brevetti recenti' : 'Recent Patents'
      },
      jumpBtn: lang === 'sl' ? 'Skoči na predstavitev izuma' : lang === 'it' ? 'Vai alla presentazione dell\'invenzione' : 'Jump to invention showcase'
    },
    featured: {
      tag: lang === 'sl' ? '03 · POGLOBLJENI PRIKAZ' : lang === 'it' ? '03 · ANALISI APPROFONDITA' : '03 · IN-DEPTH SHOWCASE',
      title: lang === 'sl' ? 'IZPOSTAVLJENI IZUMI & INOVACIJE' : lang === 'it' ? 'INVENZIONI & INNOVAZIONI IN EVIDENZA' : 'FEATURED INVENTIONS & INNOVATIONS',
      desc: lang === 'sl'
        ? 'Poglobljen pregled prebojnih patentiranih rešitev, ki so spremenile industrijske standarde, zaščitile zdravje ter modernizirale vsakdan.'
        : lang === 'it'
          ? 'Analisi approfondita di soluzioni brevettate pionieristiche che hanno cambiato gli standard industriali, protetto la salute e modernizzato la vita quotidiana.'
          : 'Comprehensive analysis of breakthrough patented solutions that transformed industrial standards, protected human health, and modernized daily life.',
      tabs: {
        vita: lang === 'sl' ? 'Igla VITA (1990/93)' : lang === 'it' ? 'Ago VITA (1990/93)' : 'VITA Needle (1990/93)',
        parking: lang === 'sl' ? 'Parkomati (1999)' : lang === 'it' ? 'Parcometri (1999)' : 'Parking Terminals (1999)',
        card: lang === 'sl' ? 'Telefonska kartica (1995)' : lang === 'it' ? 'Scheda telefonica (1995)' : 'Phone Card (1995)',
        gas: lang === 'sl' ? 'Plinski ventil (Benko)' : lang === 'it' ? 'Valvola gas (Benko)' : 'Gas Valve (Benko)',
        static: lang === 'sl' ? 'Odvod statične elektrike' : lang === 'it' ? 'Scarica elettrostatica' : 'Static Discharge'
      },
      vita: {
        tag: lang === 'sl' ? 'MEDICINSKA VARNOSTNA TEHNOLOGIJA' : lang === 'it' ? 'TECNOLOGIA DI SICUREZZA MEDICA' : 'MEDICAL SAFETY TECHNOLOGY',
        title: lang === 'sl' ? 'INJEKCIJSKA IGLA VITA' : lang === 'it' ? 'AGO PER INIEZIONE VITA' : 'VITA SAFETY NEEDLE',
        problemLabel: lang === 'sl' ? 'Problem:' : lang === 'it' ? 'Problema:' : 'Problem:',
        problemText: lang === 'sl'
          ? 'V zdravstvu so naključni vbodi z rabljenimi iglami predstavljali smrtonosno tveganje za prenos virusov HIV, hepatitisa B in C. Medicinske sestre in zdravniki so se pri ponovnem rokovanju z rabljeno iglo pogosto nevede zabodli.'
          : lang === 'it'
            ? 'In ambito sanitario le punture accidentali con aghi usati rappresentavano un rischio letale per la trasmissione di HIV, epatite B e C. Medici e infermieri si pungevano spesso inconsapevolmente nel maneggiare nuovamente l\'ago usato.'
            : 'In healthcare, accidental needlesticks with contaminated needles posed a lethal transmission risk for HIV, hepatitis B, and C. Nurses and physicians frequently suffered accidental punctures when handling used needles.',
        solutionLabel: lang === 'sl' ? 'Rešitev Taseta Lazovskega:' : lang === 'it' ? 'Soluzione di Tase Lazovski:' : 'Tase Lazovski\'s Solution:',
        solutionText: lang === 'sl'
          ? 'Vzmetni cilindrični zaščitni mehanizem, ki se po vbrizgavanju z enostavnim enoročnim potiskom premakne prek konice igle in nepovratno zaklene. Mehanizem popolnoma onemogoča ponovni stik z ostro konico.'
          : lang === 'it'
            ? 'Un meccanismo di protezione cilindrico a molla che, dopo l\'iniezione con una semplice spinta a una mano, scorre sopra la punta dell\'ago e si blocca irreversibilmente, impedendo ogni contatto con la punta tagliente.'
            : 'A spring-loaded cylindrical safety sheath that, following injection via a simple one-handed push, slides over the needle tip and irreversibly locks, completely preventing subsequent contact with the sharp cannula.',
        patentLabel: lang === 'sl' ? 'Patent & Priznanje:' : lang === 'it' ? 'Brevetto & Riconoscimento:' : 'Patent & Recognition:',
        patentText: lang === 'sl'
          ? 'Patent US 5,051,109 A (podeljen 24. 9. 1991) ter prestižna zlata medalja (médaille d’or) na svetovnem salonu inovacij EUREKA 1993 v Bruslju.'
          : lang === 'it'
            ? 'Brevetto US 5,051,109 A (concesso il 24/09/1991) e prestigiosa medaglia d\'oro (médaille d\'or) al salone mondiale dell\'innovazione EUREKA 1993 a Bruxelles.'
            : 'Patent US 5,051,109 A (granted Sept 24, 1991) and prestigious Gold Medal (Médaille d’Or) at the world innovation exhibition EUREKA 1993 in Brussels.',
        stats: {
          injuries: lang === 'sl' ? 'Vbodne poškodbe' : lang === 'it' ? 'Punture accidentali' : 'Needlestick injuries',
          injuriesVal: lang === 'sl' ? 'Odpravljene' : lang === 'it' ? 'Eliminate' : 'Eliminated',
          protection: lang === 'sl' ? 'Mednarodna zaščita' : lang === 'it' ? 'Protezione internazionale' : 'International Protection',
          protectionVal: lang === 'sl' ? 'Patent ZDA + EU' : lang === 'it' ? 'Brevetto USA + UE' : 'Patent US + EU',
          response: lang === 'sl' ? 'Odzivni čas' : lang === 'it' ? 'Tempo di risposta' : 'Response Time',
          standard: lang === 'sl' ? 'Klinični standard' : lang === 'it' ? 'Standard clinico' : 'Clinical Standard'
        },
        btnVideo: lang === 'sl' ? 'OGLED DOKUMENTARNEGA VIDEA' : lang === 'it' ? 'GUARDA IL VIDEO DOCUMENTARIO' : 'WATCH DOCUMENTARY VIDEO',
        btnRegistry: lang === 'sl' ? 'ODPRI PATENT V REGISTRU' : lang === 'it' ? 'APRI BREVETTO NEL REGISTRO' : 'OPEN PATENT IN REGISTRY',
        btnPdf: lang === 'sl' ? 'PRENESI TEHNIČNI PDF' : lang === 'it' ? 'SCARICA IL PDF TECNICO' : 'DOWNLOAD TECHNICAL PDF',
        viewVideo: lang === 'sl' ? 'Video posnetek delovanja' : lang === 'it' ? 'Video del funzionamento' : 'Operation video',
        viewDrawing: lang === 'sl' ? 'Tehnična skica mehanizma' : lang === 'it' ? 'Schema tecnico del meccanismo' : 'Mechanism schematic'
      },
      parking: {
        tag: lang === 'sl' ? 'URBANA ENERGETSKA AVTONOMNOST · 1999' : lang === 'it' ? 'AUTONOMIA ENERGETICA URBANA · 1999' : 'URBAN ENERGY AUTONOMY · 1999',
        title: lang === 'sl' ? 'UNIVERZALNI PARKIRNI AVTOMAT' : lang === 'it' ? 'PARCOMETRO UNIVERSALE' : 'UNIVERSAL PARKING TERMINAL',
        storyLabel: lang === 'sl' ? 'Zgodba:' : lang === 'it' ? 'Storia:' : 'Story:',
        storyText: lang === 'sl'
          ? 'Konec devetdesetih let so mesta iskala zanesljive, energetsko varčne načine urejanja mirujočega prometa. Tradicionalni parkomati so zahtevali drago polaganje električnega omrežja in so se pogosto kvarili ob vnosu različnih žetonov.'
          : lang === 'it'
            ? 'Alla fine degli anni \'90 le città cercavano modalità affidabili ed efficienti per la gestione della sosta. I parcometri tradizionali richiedevano costosi scavi per la rete elettrica e si guastavano spesso con l\'inserimento di gettoni eterogenei.'
            : 'In the late 1990s, municipalities sought dependable, energy-efficient solutions for parking management. Conventional parking meters required expensive grid trenching and frequently jammed with varied tokens.',
        invLabel: lang === 'sl' ? 'Izum Taseta Lazovskega:' : lang === 'it' ? 'Invenzione di Tase Lazovski:' : 'Tase Lazovski\'s Invention:',
        invText: lang === 'sl'
          ? 'Avtomatizirani parkirni terminal s strešnim fotovoltaičnim modulom, ki je omogočal popolno energetsko avtonomnost. Opremljen je bil z elektronskim prepoznavanjem kovancev ter čitalnikom naprednih pametnih kartic.'
          : lang === 'it'
            ? 'Terminale di parcheggio automatizzato con modulo fotovoltaico a tetto, che garantiva completa autonomia energetica. Era dotato di riconoscimento elettronico delle monete e lettore di carte a chip intelligenti avanzate.'
            : 'An automated parking terminal with a rooftop photovoltaic solar module delivering complete off-grid energy autonomy. It featured electronic coin validation alongside an advanced smart chip card reader.',
        deployText: lang === 'sl'
          ? 'Leta 1999 so bili prvi takšni avtomati vpeljani v Novi Gorici (ko sosednje države kot so; Italija, Avstrija, Madžarska, Nemčija, Hrvaška tega še niso imele), kar je pomenilo pionirski korak k digitaliziranemu upravljanju mestnih površin.'
          : lang === 'it'
            ? 'Nel 1999 i primi apparecchi di questo tipo sono stati introdotti a Nova Gorica (quando i paesi vicini come Italia, Austria, Ungheria, Germania, Croazia non li avevano ancora), segnando un passo pionieristico verso la gestione digitale delle superfici urbane.'
            : 'In 1999, the first such automated kiosks were deployed in Nova Gorica (when neighboring countries like Italy, Austria, Hungary, Germany, Croatia did not yet have them), marking a pioneering milestone toward digitized urban space management.',
        powerLabel: lang === 'sl' ? 'Napajanje' : lang === 'it' ? 'Alimentazione' : 'Power Supply',
        powerVal: lang === 'sl' ? 'Fotovoltaični solarni modul' : lang === 'it' ? 'Modulo solare fotovoltaico' : 'Solar Photovoltaic Module',
        payLabel: lang === 'sl' ? 'Plačila' : lang === 'it' ? 'Pagamenti' : 'Payments',
        payVal: lang === 'sl' ? 'Kovanci, čip kartice, bančne kartice, gsm' : lang === 'it' ? 'Monete, schede chip, carte bancarie, gsm' : 'Coins, chip cards, bank cards, GSM mobile',
        stats: {
          autonomy: lang === 'sl' ? 'Energetska avtonomnost' : lang === 'it' ? 'Autonomia energetica' : 'Energy Autonomy',
          location: lang === 'sl' ? 'Lokacija prve vpeljave' : lang === 'it' ? 'Luogo del debutto' : 'Initial Deployment',
          methods: lang === 'sl' ? 'Načini plačila' : lang === 'it' ? 'Metodi di pagamento' : 'Payment Methods',
          methodsVal: lang === 'sl' ? 'Kovanci, kartice, GSM' : lang === 'it' ? 'Monete, carte, GSM' : 'Coins, cards, GSM',
          status: lang === 'sl' ? 'Status' : lang === 'it' ? 'Stato' : 'Status',
          statusVal: lang === 'sl' ? 'Občinska uvedba' : lang === 'it' ? 'Implementazione urbana' : 'Municipal deployment'
        }
      },
      card: {
        tag: lang === 'sl' ? 'TELEKOMUNIKACIJE & ELEKTRONIKA · 1995' : lang === 'it' ? 'TELECOMUNICAZIONI & ELETTRONICA · 1995' : 'TELECOMMUNICATIONS & ELECTRONICS · 1995',
        title: lang === 'sl' ? 'TELEFONSKA ČIP KARTICA' : lang === 'it' ? 'SCHEDA TELEFONICA CON CHIP' : 'SMART TELEPHONE CHIP CARD',
        partnerBadge: 'ISKRA TERMINALI & IMPULZ',
        tokensLabel: lang === 'sl' ? 'Prehod z žetonov:' : lang === 'it' ? 'Transizione dai gettoni:' : 'Transition from Tokens:',
        tokensText: lang === 'sl'
          ? 'Do sredine devetdesetih let so javne govorilnice delovale na težke kovinske žetone, kar je privedlo do veliko škode ter in vzdrževanja telekomunikacijskega omrežja.'
          : lang === 'it'
            ? 'Fino a metà degli anni \'90 le cabine telefoniche pubbliche funzionavano con pesanti gettoni metallici, provocando molti danni e costi di manutenzione della rete.'
            : 'Until the mid-1990s, public telephone booths operated on heavy metal tokens, resulting in extensive damage and high maintenance for the telecommunications network.',
        launchLabel: lang === 'sl' ? 'Zgodovinski 14. junij 1995:' : lang === 'it' ? 'Lo storico 14 giugno 1995:' : 'Historic 14 June 1995:',
        launchText: lang === 'sl'
          ? 'V sodelovanju s podjetjem Iskra Terminali in podjetjem Impulz je bil zagnan nacionalni sistem elektronskih telefonskih kartic z vgrajenim kontaktnim čipom.'
          : lang === 'it'
            ? 'In collaborazione con l\'azienda Iskra Terminali e l\'azienda Impulz è stato avviato il sistema nazionale di schede telefoniche elettroniche con microchip a contatto integrato.'
            : 'In cooperation with Iskra Terminali and Impulz, the national electronic telephone smart chip card system was launched.',
        pText: lang === 'sl'
          ? 'Kartica je omogočala zanesljivo elektronsko odštevanje impulzov, preprečevala ponarejanje in postavila temelj za digitalno plačevanje v Sloveniji.'
          : lang === 'it'
            ? 'La scheda consentiva un conteggio elettronico affidabile degli scatti, preveniva le falsificazioni e ha posto le basi per i pagamenti digitali in Slovenia.'
            : 'The card allowed dependable electronic deduction of call units, prevented fraud, and laid the cornerstone for digital electronic payments in Slovenia.',
        attribution1: lang === 'sl'
          ? 'Realizacijo uvedbe čip kartic za potrebe javnih telefonskih govorilnic so omogočili Iskra Terminali Kranj in Impulz d.o.o. Nova Gorica.'
          : lang === 'it'
            ? 'La realizzazione dell\'introduzione delle schede a microchip per le cabine telefoniche pubbliche è stata resa possibile da Iskra Terminali Kranj e Impulz d.o.o. Nova Gorica.'
            : 'The nationwide rollout of smart chip cards for public payphones was made possible by Iskra Terminali Kranj and Impulz d.o.o. Nova Gorica.',
        attribution2: lang === 'sl'
          ? 'Tase Lazovski je izumitelj pri čip kartici z vidika marketinga.'
          : lang === 'it'
            ? 'Tase Lazovski è l\'inventore della scheda a chip dal punto di vista del marketing.'
            : 'Tase Lazovski is the inventor of the chip card from a marketing perspective.'
      },
      gas: {
        tag: lang === 'sl' ? 'GOSPODINJSKA VARNOST · BENKO & LAZOVSKI' : lang === 'it' ? 'SICUREZZA DOMESTICA · BENKO & LAZOVSKI' : 'HOME SAFETY ENGINEERING · BENKO & LAZOVSKI',
        title: lang === 'sl' ? 'ČASOVNIK ZA PLINSKE ŠTEDILNIKE' : lang === 'it' ? 'TIMER PER FORNELLI A GAS' : 'GAS RANGE SAFETY TIMER',
        hazardLabel: lang === 'sl' ? 'Gospodinjska nevarnost:' : lang === 'it' ? 'Pericolo domestico:' : 'Household Hazard:',
        hazardText: lang === 'sl'
          ? 'Pozabljen prižgan plinski gorilnik je med najpogostejšimi vzroki kuhinjskih požarov in eksplozij, zlasti pri starejših ali raztresenih uporabnikih.'
          : lang === 'it'
            ? 'I fornelli a gas lasciati inavvertitamente accesi sono tra le cause più comuni di incendi ed esplosioni domestiche, in particolare tra persone anziane o distratte.'
            : 'Unattended burning gas stoves represent one of the leading causes of domestic kitchen fires and explosions, particularly among the elderly or distracted users.',
        solutionLabel: lang === 'sl' ? 'Rešitev:' : lang === 'it' ? 'Soluzione:' : 'Solution:',
        solutionText: lang === 'sl'
          ? 'Patentirani plinski varnostni časovnik (razvit z inženirjem Emilom Benkom), ki s pomočjo mehanskega ali elektromehanskega sklopa po vnaprej določenem času zanesljivo prekine dovod plina, v kolikor plamen še vedno gori.'
          : lang === 'it'
            ? 'Timer brevettato di sicurezza per gas (sviluppato con l\'ingegnere Emil Benko) che, tramite un gruppo meccanico o elettromeccanico, interrompe con certezza l\'erogazione del gas dopo un intervallo prestabilito se la fiamma è ancora attiva.'
            : 'A patented gas safety timer shutoff valve (engineered in cooperation with Emil Benko) that uses a mechanical or electromechanical assembly to reliably cut gas supply after a preset duration if left burning.',
        stats: {
          mechanism: lang === 'sl' ? 'Mehanizem' : lang === 'it' ? 'Meccanismo' : 'Mechanism',
          mechanismVal: lang === 'sl' ? 'Vzmetni zaporni konus' : lang === 'it' ? 'Cono di chiusura a molla' : 'Spring-loaded shutoff cone',
          timing: lang === 'sl' ? 'Časovno območje' : lang === 'it' ? 'Intervallo di tempo' : 'Timing Range',
          timingVal: lang === 'sl' ? 'Nastavljivo (0–60 min)' : lang === 'it' ? 'Regolabile (0–60 min)' : 'Adjustable (0–60 min)',
          compat: lang === 'sl' ? 'Združljivost' : lang === 'it' ? 'Compatibilità' : 'Compatibility',
          compatVal: lang === 'sl' ? 'Vsi tipi kuhalnikov' : lang === 'it' ? 'Tutti i piani cottura' : 'All stove types',
          cert: lang === 'sl' ? 'Varnostni certifikat' : lang === 'it' ? 'Certificazione' : 'Certification',
          certVal: lang === 'sl' ? 'Patentna zaščita' : lang === 'it' ? 'Protezione brevettuale' : 'Patent Protection'
        },
        docTitle: lang === 'sl' ? 'Tehnična dokumentacija plinskega ventila' : lang === 'it' ? 'Documentazione tecnica valvola gas' : 'Gas valve technical documentation',
        diagrams: [
          lang === 'sl' ? 'Načrt 1' : lang === 'it' ? 'Schema 1' : 'Diagram 1',
          lang === 'sl' ? 'Načrt 2' : lang === 'it' ? 'Schema 2' : 'Diagram 2',
          lang === 'sl' ? 'Načrt 3' : lang === 'it' ? 'Schema 3' : 'Diagram 3'
        ],
        zoom: lang === 'sl' ? 'Povečaj' : lang === 'it' ? 'Ingrandisci' : 'Zoom'
      },
      staticEsd: {
        tag: 'EP 2805592 · US 959672 · ATEMM H-ESD & GREEN POINT',
        title: lang === 'sl' ? 'ODVOD STATIČNE ELEKTRIKE OD LJUDI' : lang === 'it' ? 'SCARICA DI ELETTRICITÀ STATICA DA PERSONE' : 'CONTROLLED STATIC ELECTRICITY DISCHARGE',
        problemLabel: lang === 'sl' ? 'Problem statične elektrike:' : lang === 'it' ? 'Problema dell\'elettricità statica:' : 'Electrostatic Discharge Hazard:',
        problemText: lang === 'sl'
          ? 'V določenih atmosferskih pogojih ter ob uporabi sodobnih materialov pri oblačilih, obutvi in opremi se na človeškem telesu lahko nakopiči elektrostatični naboj s potencialom tudi do 25.000 V (25 kV). Ob dotiku ozemljenega predmeta pride do hipne razelektritve, bolečega šoka, preskoka iskre in nevarnosti vžiga ali eksplozije, poleg tega pa ima tak naboj negativen vpliv na zdravje in počutje.'
          : lang === 'it'
            ? 'In particolari condizioni atmosferiche e con l\'uso di materiali sintetici nell\'abbigliamento, calzature e attrezzature, sul corpo umano si possono accumulare cariche elettrostatiche con potenziale fino a 25.000 V (25 kV). Al contatto con un oggetto a terra si verifica una scarica istantanea, uno shock doloroso, scintillio e rischio di incendio o esplosione, con ripercussioni negative su salute e benessere.'
            : 'Under specific atmospheric conditions and modern synthetic clothing/footwear materials, the human body can accumulate electrostatic charges reaching potentials up to 25,000 V (25 kV). Touching a grounded surface causes an instant discharge, painful electric shock, sparks, and fire or explosion risks, alongside negative effects on health and wellbeing.',
        solutionLabel: lang === 'sl' ? 'Patentirana rešitev (EP 2805592 / US 959672):' : lang === 'it' ? 'Soluzione brevettata (EP 2805592 / US 959672):' : 'Patented Solution (EP 2805592 / US 959672):',
        solutionText: lang === 'sl'
          ? 'Izumitelji Tase Lazovski, Emil Benko in Angelo Porcaro so razvili in patentirali mehanizem za neboleč, kontroliran odvod statičnega naboja v času med 150 in 250 ms (s prilagoditvijo tudi za X cone).'
          : lang === 'it'
            ? 'Gli inventori Tase Lazovski, Emil Benko e Angelo Porcaro hanno sviluppato e brevettato un meccanismo per la scarica indolore e controllata della carica elettrostatica in un tempo tra 150 e 250 ms (con adattamento anche per zone X).'
            : 'Inventors Tase Lazovski, Emil Benko, and Angelo Porcaro engineered and patented a mechanism for painless, controlled electrostatic discharge within 150 to 250 ms (with adaptability also for X zones).',
        commercialText: lang === 'sl'
          ? 'Inovativne rešitve so uveljavljene v komercialnih izdelkih Atemm H-ESD (integracija v varnostni pas vozil z prevodnim šivom) in je unikatna rešitev, saj omogoča kontroliran odvod statične elektrike z dotikom osebe na prevodni material do maksimalno 7 cm² površine, ter Atemm GREEN POINT (delovna mesta in stavbno pohištvo).'
          : lang === 'it'
            ? 'Le soluzioni innovative sono applicate nei prodotti commerciali Atemm H-ESD (integrazione nella cintura di sicurezza delle automobili con cucitura conduttiva), una soluzione unica che permette la scarica controllata toccando un\'area conduttiva fino a un massimo di 7 cm², e Atemm GREEN POINT (postazioni di lavoro e arredo architettonico).'
            : 'Innovative solutions are commercialized in Atemm H-ESD (integration into vehicle seatbelts via conductive thread), a unique system enabling controlled static discharge upon touching a conductive surface up to 7 cm², and Atemm GREEN POINT (workstations and architectural furniture).',
        stats: {
          time: lang === 'sl' ? 'Čas odvoda' : lang === 'it' ? 'Tempo di scarica' : 'Discharge Duration',
          voltage: lang === 'sl' ? 'Maksimalna napetost' : lang === 'it' ? 'Tensione massima' : 'Max Voltage',
          voltageVal: lang === 'sl' ? 'Do 25.000 V (25 kV)' : lang === 'it' ? 'Fino a 25.000 V (25 kV)' : 'Up to 25,000 V (25 kV)',
          area: lang === 'sl' ? 'Površina dotika' : lang === 'it' ? 'Area di contatto' : 'Touch Area',
          areaVal: lang === 'sl' ? 'Maks. 7 cm² prevodnega šiva' : lang === 'it' ? 'Max 7 cm² cucitura conduttiva' : 'Max 7 cm² conductive thread',
          standard: lang === 'sl' ? 'Zaščitni standard' : lang === 'it' ? 'Standard di protezione' : 'Safety Standard',
          standardVal: lang === 'sl' ? 'Brez bolečega šoka & iskre' : lang === 'it' ? 'Senza shock doloroso o scintille' : 'Zero painful shock & zero spark'
        }
      }
    },
    explainer: {
      tag: lang === 'sl' ? '04 · INTERAKTIVNA MEHANIKA' : lang === 'it' ? '04 · MECCANICA INTERATTIVA' : '04 · INTERACTIVE MECHANICS',
      title: lang === 'sl' ? 'KAKO DELUJEJO IZUMI' : lang === 'it' ? 'COME FUNZIONANO LE INVENZIONI' : 'HOW THE INVENTIONS WORK',
      desc: lang === 'sl' ? 'Izberite tehnologijo za razstavljen pogled na komponente, korake delovanja in mehaniko delovanja.' : lang === 'it' ? 'Seleziona una tecnologia per visualizzare componenti, fasi operative e meccanica interna.' : 'Select a technology for an exploded view of components, operational steps, and internal mechanics.',
      tabs: {
        vita: lang === 'sl' ? 'Igla VITA (US5051109A)' : lang === 'it' ? 'Ago VITA (US5051109A)' : 'VITA Needle (US5051109A)',
        parking: lang === 'sl' ? 'Parkomat Nova Gorica 1999' : lang === 'it' ? 'Parcometro Nova Gorica 1999' : 'Parking Meter Nova Gorica 1999',
        card: lang === 'sl' ? 'Čip kartica Iskra 1995' : lang === 'it' ? 'Scheda chip Iskra 1995' : 'Chip Card Iskra 1995',
        gas: lang === 'sl' ? 'Plinski ventil (Benko & Lazovski)' : lang === 'it' ? 'Valvola gas (Benko & Lazovski)' : 'Gas Valve (Benko & Lazovski)'
      }
    },
    additional: {
      tag: lang === 'sl' ? '05 · DODATNI RAZVOJNI PROJEKTI' : lang === 'it' ? '05 · PROGETTI DI SVILUPPO AGGIUNTIVI' : '05 · ADDITIONAL DEVELOPMENT PROJECTS',
      title: lang === 'sl' ? 'OSTALI PATENTI & MODELI' : lang === 'it' ? 'ALTRI BREVETTI & MODELLI' : 'ADDITIONAL PATENTS & MODELS',
      desc: lang === 'sl'
        ? 'Pregled ostalih patentov, modelov in razvojnih pobud Taseta Lazovskega s področij industrijske varnosti, športa in uporabnega oblikovanja.'
        : lang === 'it'
          ? 'Panoramica di ulteriori brevetti, modelli e progetti di sviluppo di Tase Lazovski nei settori della sicurezza industriale, dello sport e del design applicato.'
          : 'Overview of further patents, utility models, and engineering initiatives by Tase Lazovski in industrial safety, sports equipment, and applied design.'
    },
    registry: {
      tag: lang === 'sl' ? '06 · DOKUMENTIRANA ZBIRKA' : lang === 'it' ? '06 · COLLEZIONE DOCUMENTATA' : '06 · DOCUMENTED ARCHIVE',
      title: lang === 'sl' ? 'URADNI REGISTER PATENTOV' : lang === 'it' ? 'REGISTRO UFFICIALE DEI BREVETTI' : 'OFFICIAL PATENT REGISTRY',
      desc: lang === 'sl'
        ? 'Verificirana zbirka podeljenih patentov in industrijskih modelov z uradnimi patentnimi številkami in priznanji.'
        : lang === 'it'
          ? 'Raccolta verificata di brevetti concessi e modelli industriali con numeri di brevetto ufficiali e riconoscimenti.'
          : 'Verified archive of granted patents and industrial models with official registration numbers and distinctions.',
      filters: {
        all: lang === 'sl' ? 'Vsi patenti' : lang === 'it' ? 'Tutti i brevetti' : 'All Patents',
        med: lang === 'sl' ? 'Medicina' : lang === 'it' ? 'Medicina' : 'Medicine',
        telecom: lang === 'sl' ? 'Telekomunikacije' : lang === 'it' ? 'Telecomunicazioni' : 'Telecommunications',
        urban: lang === 'sl' ? 'Urbana tehnologija' : lang === 'it' ? 'Tecnologia urbana' : 'Urban Technology',
        home: lang === 'sl' ? 'Gospodinjstvo' : lang === 'it' ? 'Sicurezza domestica' : 'Home Safety',
        static: lang === 'sl' ? 'Elektrostatika' : lang === 'it' ? 'Elettrostatica' : 'Electrostatics'
      },
      btnDetails: lang === 'sl' ? 'PODROBNOSTI & DOKUMENTI' : lang === 'it' ? 'DETTAGLI & DOCUMENTI' : 'DETAILS & DOCUMENTS',
      inventorsLabel: lang === 'sl' ? 'Izumitelji:' : lang === 'it' ? 'Inventori:' : 'Inventors:',
      datesLabel: lang === 'sl' ? 'Vloga / Podelitev:' : lang === 'it' ? 'Deposito / Concessione:' : 'Filing / Grant:',
      territoryLabel: lang === 'sl' ? 'Območje:' : lang === 'it' ? 'Giurisdizione:' : 'Jurisdiction:',
      summaryLabel: lang === 'sl' ? 'Izvleček:' : lang === 'it' ? 'Sintesi:' : 'Summary:',
      featuresLabel: lang === 'sl' ? 'Ključne tehnične rešitve:' : lang === 'it' ? 'Soluzioni tecniche chiave:' : 'Key technical solutions:'
    },
    video: {
      tag: lang === 'sl' ? '07 · ARHIVSKI POSNETKI' : lang === 'it' ? '07 · FILMATI D\'ARCHIVIO' : '07 · ARCHIVAL FOOTAGE',
      title: lang === 'sl' ? 'VIDEO DOKUMENTARNI ARHIV' : lang === 'it' ? 'ARCHIVIO VIDEO DOCUMENTARIO' : 'DOCUMENTARY VIDEO ARCHIVE',
      desc: lang === 'sl'
        ? 'Avtentični video posnetki demonstracij delovanja patentiranih mehanizmov in arhivskih predstavitev.'
        : lang === 'it'
          ? 'Filmati autentici di dimostrazioni del funzionamento dei meccanismi brevettati e presentazioni d\'archivio.'
          : 'Authentic video recordings of mechanism demonstrations and archival presentations.',
      playBtn: lang === 'sl' ? 'PREDVAJAJ VIDEO' : lang === 'it' ? 'RIPRODUCI VIDEO' : 'PLAY VIDEO',
      durationLabel: lang === 'sl' ? 'Trajanje:' : lang === 'it' ? 'Durata:' : 'Duration:'
    },
    cta: {
      heading: lang === 'sl' ? '“VSAKA VELIKA SPREMEMBA SE ZAČNE Z IDEJO.”' : lang === 'it' ? '“OGNI GRANDE CAMBIAMENTO INIZIA DA UN\'IDEA.”' : '“EVERY GREAT CHANGE BEGINS WITH AN IDEA.”',
      text: lang === 'sl'
        ? 'Zapuščina inovacij Taseta Lazovskega dokazuje, da lahko iz radovednosti, vztrajnosti in tehničnega znanja zrastejo rešitve, ki spremenijo svet. Prav to poslanstvo uresničujemo v START LABU: mladim odpiramo vrata v svet tehnologije, elektronike in praktičnega ustvarjanja.'
        : lang === 'it'
          ? 'L\'eredità di innovazioni di Tase Lazovski dimostra che dalla curiosità, perseveranza e competenza tecnica possano nascere soluzioni capaci di cambiare il mondo. È proprio questa la missione che portiamo avanti in START LAB: aprire ai giovani le porte del mondo della tecnologia, dell\'elettronica e della creatività pratica.'
          : 'The legacy of innovations by Tase Lazovski demonstrates that curiosity, perseverance, and technical expertise can produce solutions that change the world. This is precisely the mission we fulfill at START LAB: opening doors for youth into the world of technology, electronics, and hands-on making.',
      btnWorkshops: lang === 'sl' ? 'PRIJAVI SE NA DELAVNICE' : lang === 'it' ? 'ISCRIVITI AI LABORATORI' : 'REGISTER FOR WORKSHOPS',
      btnHome: lang === 'sl' ? 'DOMAČA STRAN START LAB' : lang === 'it' ? 'PAGINA INIZIALE START LAB' : 'START LAB HOMEPAGE'
    },
    modal: {
      patentRegistryTag: lang === 'sl' ? 'URADNI PATENTNI DOKUMENT' : lang === 'it' ? 'DOCUMENTO BREVETTUALE UFFICIALE' : 'OFFICIAL PATENT DOCUMENT',
      tabSummary: lang === 'sl' ? 'Povzetek & opis' : lang === 'it' ? 'Sintesi & descrizione' : 'Summary & Description',
      tabFeatures: lang === 'sl' ? 'Ključne lastnosti' : lang === 'it' ? 'Caratteristiche chiave' : 'Key Features',
      tabTeam: lang === 'sl' ? 'Izumitelji & institucije' : lang === 'it' ? 'Inventori & istituzioni' : 'Inventors & Institutions',
      tabDocs: lang === 'sl' ? 'Dokumentacija' : lang === 'it' ? 'Documentazione' : 'Documentation',
      numberLabel: lang === 'sl' ? 'Številka patenta' : lang === 'it' ? 'Numero di brevetto' : 'Patent Number',
      filingLabel: lang === 'sl' ? 'Datum vloge' : lang === 'it' ? 'Data di deposito' : 'Filing Date',
      grantLabel: lang === 'sl' ? 'Datum podelitve' : lang === 'it' ? 'Data di concessione' : 'Grant Date',
      statusLabel: lang === 'sl' ? 'Status patenta' : lang === 'it' ? 'Stato del brevetto' : 'Patent Status',
      jurisdictionLabel: lang === 'sl' ? 'Pristojni urad' : lang === 'it' ? 'Ufficio competente' : 'Competent Authority',
      recognitionLabel: lang === 'sl' ? 'Priznanje' : lang === 'it' ? 'Riconoscimento' : 'Distinction',
      manufacturerLabel: lang === 'sl' ? 'Proizvajalec / Izvajalec' : lang === 'it' ? 'Produttore / Esecutore' : 'Manufacturer / Deployer',
      coordinationLabel: lang === 'sl' ? 'Koordinacija projekta' : lang === 'it' ? 'Coordinamento progetto' : 'Project Coordination',
      closeBtn: lang === 'sl' ? 'Zapri' : lang === 'it' ? 'Chiudi' : 'Close',
      downloadDoc: lang === 'sl' ? 'Prenesi dokument' : lang === 'it' ? 'Scarica documento' : 'Download document'
    }
  };
}
