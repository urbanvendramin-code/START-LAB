import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Award, 
  Calendar, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  ExternalLink, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Clock, 
  MapPin, 
  Layers, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  X, 
  Info,
  Sliders,
  Activity,
  CreditCard,
  Flame,
  Radio,
  BookOpen,
  Eye
} from 'lucide-react';

import heroImg from '../assets/images/tase_lazovski_hero_1791534632699.jpg';
const vitaImg = 'https://ik.imagekit.io/utigodgni/INJEKCIJSKA%20IGLA%20VITA.1png.png?updatedAt=1793864287793';
const parkingImg = 'https://ik.imagekit.io/utigodgni/PARKIRNI%20AVTOMAT.png?updatedAt=1793864318348';
const cardImg = 'https://ik.imagekit.io/utigodgni/Untitled-1.png';
const cardImg2 = 'https://ik.imagekit.io/utigodgni/TELEFONSKA%20%C4%8CIP%20KARTICA.png';
import gasTimerImg from '../assets/images/gas_stove_timer_1791534741337.jpg';
import InventorAnimatedBackground from '../components/InventorAnimatedBackground';

interface Milestone {
  year: string;
  exactDate?: string;
  title: string;
  desc: string;
  tag: string;
  anchorId: string;
  highlight?: boolean;
}

interface PatentRecord {
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

export default function PatentsPage() {
  const { t, i18n } = useTranslation();
  const isSlovenian = i18n.language !== 'en' && i18n.language !== 'it';
  const isIt = i18n.language === 'it';

  // State for interactive features
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(0);
  const [selectedPatent, setSelectedPatent] = useState<PatentRecord | null>(null);
  const [activeExplainerTab, setActiveExplainerTab] = useState<'vita' | 'parking' | 'card' | 'gas'>('vita');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<Record<string, boolean>>({});
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [vitaViewMode, setVitaViewMode] = useState<'video' | 'drawing'>('video');
  const [parkingViewMode, setParkingViewMode] = useState<'video' | 'photo'>('video');
  const [activeGasImgIdx, setActiveGasImgIdx] = useState<number>(0);
  const [enlargedGasImg, setEnlargedGasImg] = useState<string | null>(null);
  const [activeVitaImgIdx, setActiveVitaImgIdx] = useState<number>(0);
  const [enlargedVitaImg, setEnlargedVitaImg] = useState<string | null>(null);
  const [activeCardImgIdx, setActiveCardImgIdx] = useState<number>(0);

  const cardImages = [
    {
      url: cardImg,
      title: isSlovenian ? 'Telefonska kartica (1995)' : 'Telephone Smart Card (1995)',
      subtitle: isSlovenian ? 'Originalna čip kartica Iskra Terminali & Impulz' : 'Original smart card Iskra Terminali & Impulz',
    },
    {
      url: cardImg2,
      title: isSlovenian ? 'Telefonska čip kartica – tehnični prikaz' : 'Telephone Chip Card – Technical Display',
      subtitle: isSlovenian ? 'Arhivska fotografija kontaktnih kartic z mikrokrmilnikom' : 'Archival photo of contact microcontroller smart cards',
    },
  ];

  const vitaImages = [
    {
      url: vitaImg,
      title: isSlovenian ? 'Konstrukcijski načrt VITA 1' : 'VITA Blueprint 1',
      subtitle: isSlovenian ? 'Izvirna shema cilindričnega tulca in zaklepa' : 'Original cylindrical sheath & locking detent schematic',
    },
    {
      url: 'https://ik.imagekit.io/utigodgni/INJEKCIJSKA%20IGLA%20VITA2.png',
      title: isSlovenian ? 'Konstrukcijski načrt VITA 2' : 'VITA Blueprint 2',
      subtitle: isSlovenian ? 'Vzmetni mehanizem in varnostni zatič' : 'Spring mechanism & safety catch detail',
    },
  ];

  const gasTimerImages = [
    {
      url: 'https://ik.imagekit.io/utigodgni/1.png',
      title: isSlovenian ? 'Tehnični načrt 1' : 'Technical Diagram 1',
      subtitle: isSlovenian ? 'Elektromehanski časovni mehanizem' : 'Electromechanical timer mechanism',
    },
    {
      url: 'https://ik.imagekit.io/utigodgni/2.png',
      title: isSlovenian ? 'Tehnični načrt 2' : 'Technical Diagram 2',
      subtitle: isSlovenian ? 'Detajl zapornega ventila in vzmetnega sklopa' : 'Cutoff valve and spring assembly detail',
    },
    {
      url: 'https://ik.imagekit.io/utigodgni/3.png',
      title: isSlovenian ? 'Tehnični načrt 3' : 'Technical Diagram 3',
      subtitle: isSlovenian ? 'Prikaz namestitve in povezave na gorilnik' : 'Installation layout and burner connection',
    },
  ];

  const timelineMilestones: Milestone[] = [
    {
      year: '1990',
      exactDate: isSlovenian ? '12. december 1990' : isIt ? '12 dicembre 1990' : 'December 12, 1990',
      title: isSlovenian ? 'Prijava patenta za iglo VITA' : isIt ? 'Deposito brevetto ago VITA' : 'VITA needle patent filed',
      desc: isSlovenian 
        ? 'Prijava varnostnega injekcijskega sklopa za preprečevanje naključnih vbodov in prenosa okužb.'
        : isIt
          ? 'Deposito del gruppo siringa di sicurezza per prevenire punture accidentali.'
          : 'Filing of the safety hypodermic needle assembly to prevent accidental needlestick injuries.',
      tag: isSlovenian ? 'Medicinski patent' : isIt ? 'Brevetto medico' : 'Medical patent',
      anchorId: 'izum-vita'
    },
    {
      year: '1991',
      exactDate: isSlovenian ? '24. september 1991' : isIt ? '24 settembre 1991' : 'September 24, 1991',
      title: isSlovenian ? 'Podeljen patent US5051109A' : isIt ? 'Brevetto concesso US5051109A' : 'Granted US Patent US5051109A',
      desc: isSlovenian
        ? 'Ameriški patentni urad (USPTO) uradno podeli patent za varnostno injekcijsko iglo VITA (Safety hypodermic needle assembly).'
        : isIt
          ? 'L’Ufficio Brevetti USA (USPTO) concede ufficialmente il brevetto per l’ago di sicurezza VITA.'
          : 'United States Patent Office (USPTO) grants patent US5051109A for the VITA safety hypodermic needle assembly.',
      tag: 'USPTO · US5051109A',
      anchorId: 'izum-vita',
      highlight: true
    },
    {
      year: '1993',
      exactDate: isSlovenian ? 'November 1993' : isIt ? 'Novembre 1993' : 'November 1993',
      title: isSlovenian ? 'EUREKA Bruselj – Zlata medalja (Médaille d’Or)' : isIt ? 'EUREKA Bruxelles – Medaglia d’oro (Médaille d’Or)' : 'EUREKA Brussels – Gold Medal (Médaille d’Or)',
      desc: isSlovenian
        ? 'Svetovna razstava inovacij in novih tehnologij v Bruslju podeli zlato medaljo (médaille d’or) za inovacijo VITA.'
        : isIt
          ? 'Il Salone Mondiale dell’Innovazione di Bruxelles conferisce la medaglia d’oro (médaille d’or) a VITA.'
          : 'World Exhibition of Innovation in Brussels awards the Gold Medal (Médaille d’Or) for the VITA invention.',
      tag: 'EUREKA 1993',
      anchorId: 'izum-vita'
    },
    {
      year: '1995',
      exactDate: isSlovenian ? '14. junij 1995' : isIt ? '14 giugno 1995' : '14 June 1995',
      title: isSlovenian ? 'Telefonske čip kartice v Sloveniji' : isIt ? 'Schede telefoniche con chip' : 'Telephone chip cards in Slovenia',
      desc: isSlovenian
        ? 'Uradni zagon sistema telefonskih kartic z vgrajenim čipom. Tehnološki preskok z žetonov na elektronske kartice z Iskra Terminali in Impulz.'
        : isIt
          ? 'Lancio ufficiale delle schede telefoniche con microchip, superando i gettoni metallici in partnership con Iskra Terminali e Impulz.'
          : 'Official rollout of smart telephone chip cards in Slovenia, replacing tokens with electronic microchips with Iskra Terminali and Impulz.',
      tag: 'Telekomunikacije',
      anchorId: 'izum-kartica',
      highlight: true
    },
    {
      year: '1999',
      exactDate: isSlovenian ? '1999' : isIt ? '1999' : '1999',
      title: isSlovenian ? 'Prvi parkirni avtomati v Novi Gorici' : isIt ? 'Primi parcometri a Nova Gorica' : 'First parking meters in Nova Gorica',
      desc: isSlovenian
        ? 'Uvedba prvih univerzalnih elektronskih parkirnih avtomatov s solarnim napajanjem in sodobnim nadzorom plačil.'
        : isIt
          ? 'Introduzione dei primi parcometri universali elettronici con alimentazione solare a Nova Gorica.'
          : 'Deployment of the first universal electronic solar-powered parking terminals in Nova Gorica.',
      tag: 'Urbana tehnologija',
      anchorId: 'izum-parkirni'
    },
    {
      year: '2000+',
      exactDate: isSlovenian ? 'Patentna zaščita' : isIt ? 'Protezione brevettuale' : 'Patent Protection',
      title: isSlovenian ? 'Časovni varnostni ventil za plin' : isIt ? 'Valvola di sicurezza per gas' : 'Gas stove safety timer valve',
      desc: isSlovenian
        ? 'Razvoj in patentna zaščita elektromehanskega varnostnega časovnika za plinske kuhalnike v sodelovanju z Emilom Benkom.'
        : isIt
          ? 'Sviluppo del timer di sicurezza per fornelli a gas in collaborazione con Emil Benko.'
          : 'Development and patent protection of electromechanical safety timer for gas stoves with Emil Benko.',
      tag: 'Varnostni inženiring',
      anchorId: 'izum-plin'
    },
    {
      year: '2005+',
      exactDate: 'EP 2805592 · US 959672',
      title: isSlovenian ? 'Odvod statične elektrike od ljudi' : isIt ? 'Scarica elettrostatica controllata' : 'Controlled Static Electricity Discharge',
      desc: isSlovenian
        ? 'Patentirana tehnologija nebolečega kontroliranega odvoda statičnega naboja (150–250 ms) za avtomobile (Atemm H-ESD) ter delovne prostore in periferne naprave (Atemm GREEN POINT).'
        : isIt
          ? 'Tecnologia brevettata per la scarica indolore delle cariche elettrostatiche in 150-250 ms (Atemm H-ESD e GREEN POINT).'
          : 'Patented technology for painless controlled static discharge within 150–250 ms in vehicles (Atemm H-ESD) and workstations/keyboards (Atemm GREEN POINT).',
      tag: 'EP 2805592 · US 959672',
      anchorId: 'izum-static'
    }
  ];

  const patentRegistry: PatentRecord[] = [
    {
      id: 'us5051109a',
      number: 'US 5,051,109 A',
      title: isSlovenian ? 'Varnostni injekcijski sklop (Safety hypodermic needle assembly)' : 'Safety hypodermic needle assembly',
      category: isSlovenian ? 'Medicinska tehnologija' : isIt ? 'Tecnologia medica' : 'Medical Technology',
      jurisdiction: 'ZDA (USPTO) / Mednarodno',
      inventors: ['Tase Lazovski'],
      filingDate: '12. december 1990',
      grantDate: '24. september 1991',
      status: isSlovenian ? 'Zgodovinski patent (podeljen)' : 'Historical Patent (Granted)',
      recognition: 'EUREKA Bruselj 1993 – Médaille d’Or',
      abstract: isSlovenian
        ? 'Zaščitni tulec za injekcijske igle, ki po iniciranju prepreči nehote vbode medicinskega osebja.'
        : 'A protective safety assembly for hypodermic needles that permanently locks a shielding sheath over the needle tip following injection to prevent accidental needle-stick contamination.',
      keyFeatures: [
        isSlovenian ? 'Avtomatski nepovratni zaklep zaščitnega pokrovčka' : 'Automatic irreversible sleeve locking',
        isSlovenian ? 'Zaščita zdravstvenih delavcev pred okužbami (HIV, hepatitis)' : 'Healthcare worker protection against bloodborne pathogens',
        isSlovenian ? 'Enoročno aktiviranje brez spreminjanja kliničnega postopka' : 'One-handed activation mechanism',
        isSlovenian ? 'Mednarodno priznanje EUREKA 1993 v Bruslju (Médaille d’Or)' : 'EUREKA 1993 Brussels Gold Medal distinction (Médaille d’Or)'
      ]
    },
    {
      id: 'chip-card',
      number: 'IS-TK-1995',
      title: isSlovenian ? 'Elektronska telefonska kartica s čipom in procesni sistem' : 'Electronic Telephone Smart Chip Card System',
      category: isSlovenian ? 'Telekomunikacije & elektronika' : isIt ? 'Telecomunicazioni' : 'Telecommunications & Electronics',
      jurisdiction: 'Slovenija / Iskra Terminali & Impulz',
      inventors: ['Tase Lazovski (z vidika marketinga)', 'Iskra Terminali Kranj & Impulz d.o.o. Nova Gorica'],
      filingDate: '1994',
      grantDate: '14. junij 1995 (uradna vpeljava)',
      status: isSlovenian ? 'Arhivska implementacija' : 'Archival Implementation',
      recognition: isSlovenian ? 'Nacionalni prehod z žetonov na elektronske kartice' : 'National transition from tokens to smart cards',
      abstract: isSlovenian
        ? 'Sistem elektronskih kontaktnih kartic z mikrokrmilnikom za javno telefonijo, ki je nadomestil mehanske žetone in magnetne kartice ter omogočil zanesljivo beleženje impulzov in preprečevanje zlorab.'
        : 'Smart chip phone card system replacing mechanical tokens and magnetic cards across Slovenia, enabling secure transaction accounting and tamper-proof telecommunication access.',
      keyFeatures: [
        isSlovenian ? 'Vgrajen varnostni mikrokrmilnik z zanesljivim bralnim vmesnikom' : 'Integrated microcontroller with secure contact pads',
        isSlovenian ? 'Prehod javne telefonije v digitalno dobo (14. junij 1995)' : 'Modernization of public payphones across Slovenia',
        isSlovenian ? 'Optimizacija transakcij in odprava mehanskih okvar žetonov' : 'Elimination of mechanical coin jam failures',
        isSlovenian ? 'Realizacijo uvedbe čip kartic za potrebe javnih telefonskih govorilnic so omogočili Iskra Terminali Kranj in Impulz d.o.o. Nova Gorica.' : 'Implementation enabled by Iskra Terminali Kranj and Impulz d.o.o. Nova Gorica.',
        isSlovenian ? 'Tase Lazovski je izumitelj pri čip kartici z vidika marketinga.' : 'Tase Lazovski is the inventor of the chip card from a marketing perspective.'
      ]
    },
    {
      id: 'parking-meter',
      number: 'NG-PK-1999',
      title: isSlovenian ? 'Univerzalni avtomatizirani parkirni terminal' : 'Universal Automated Parking Meter Terminal',
      category: isSlovenian ? 'Urbana avtomatizacija' : isIt ? 'Automazione urbana' : 'Urban Automation',
      jurisdiction: 'Slovenija (Nova Gorica 1999)',
      inventors: ['Impulz Nova Gorica', 'LF3M Kranj'],
      manufacturer: 'Impulz Nova Gorica in LF3M Kranj',
      coordination: 'Tase Lazovski',
      filingDate: '1998',
      grantDate: '1999',
      status: isSlovenian ? 'Arhivski model' : 'Archival Production',
      recognition: isSlovenian ? 'Prvi sodobni parkomati v Novi Gorici' : 'First modern pay-and-display meters in Nova Gorica',
      abstractLabel: isSlovenian ? 'Izvleček tehnične rešitve' : isIt ? 'Sintesi della soluzione tecnica' : 'Technical Solution Summary',
      abstract: isSlovenian
        ? 'Robustni zunanji avtomat za plačevanje parkirnine z možnostjo sprejemanja kovancev in pametnih kartic, fotovoltaičnim solarnim modulom ter protivandalskim jeklenim ohišjem.'
        : 'Solar-powered, vandalism-resistant urban parking terminal supporting both coin validation and electronic chip cards for municipal smart city parking.',
      keyFeatures: [
        isSlovenian ? 'Avtonomno napajanje z integriranim solarnim modulom' : 'Autonomous solar panel power generation',
        isSlovenian ? 'Elektronski optični in magnetni validirnik plačil' : 'Electronic payment validation architecture',
        isSlovenian ? 'Nerjaveče protivandalsko industrijsko ohišje' : 'Weatherproof heavy-duty stainless steel enclosure',
        isSlovenian ? 'Uvedba v Novi Gorici leta 1999' : 'First commissioned in Nova Gorica in 1999'
      ]
    },
    {
      id: 'gas-timer',
      number: 'SI-EB-TL-2002',
      title: isSlovenian ? 'Časovno krmiljen varnostni ventil za plinske štedilnike' : 'Timed Safety Shutoff Valve for Gas Stoves',
      category: isSlovenian ? 'Gospodinjska varnost' : isIt ? 'Sicurezza domestica' : 'Home Safety Engineering',
      jurisdiction: 'Slovenija / Mednarodne prijave',
      inventors: ['Tase Lazovski', 'Emil Benko'],
      filingDate: '2001',
      grantDate: 'Patentna zaščita',
      status: isSlovenian ? 'Patentna zaščita & prototip' : 'Patent Protection & Prototype',
      recognition: isSlovenian ? 'Varnostni projekt preprečevanja eksplozij in požarov' : 'Gas explosion prevention engineering initiative',
      abstract: isSlovenian
        ? 'Mehanski in elektromehanski varnostni ventil s časovnikom za plinske kuhalnike, ki po poteku nastavljenega časa avtomatsko in zanesljivo prekine dovod plina, če uporabnik pozabi ugasniti gorilnik.'
        : 'A mechanical and electromechanical timer-controlled shutoff valve for gas ranges that automatically cuts off gas flow upon time expiration, preventing uncontrolled gas buildup.',
      keyFeatures: [
        isSlovenian ? 'Nastavljiv časovnik z zanesljivo elektronsko in mehansko prekinitvijo plina' : 'Adjustable timer dial with positive electronic and mechanical shutoff',
        isSlovenian ? 'Preprečevanje vžigov in posredno eksplozij' : 'Prevention of ignition hazards and secondary explosions',
        isSlovenian ? 'Enostavna integracija med plinsko jeklenko/mrežo in gorilnik' : 'Universal retrofit between supply line and burners',
        isSlovenian ? 'So-avtorstvo z Emilom Benkom' : 'Co-invented with engineer Emil Benko'
      ]
    },
    {
      id: 'esd-static',
      number: 'EP 2805592 · US 959672',
      title: isSlovenian ? 'Odvod statične elektrike od ljudi (Atemm H-ESD & GREEN POINT)' : 'Controlled Electrostatic Discharge from Humans (Atemm H-ESD & GREEN POINT)',
      category: isSlovenian ? 'Elektrostatika & industrijska varnost' : isIt ? 'Elettrostatica & sicurezza industriale' : 'Electrostatics & Industrial Safety',
      jurisdiction: 'Evropa (EPO) & ZDA (USPTO) / Mednarodno',
      inventors: ['Tase Lazovski', 'Emil Benko', 'Angelo Porcaro'],
      filingDate: 'Patentna prijava EP & US',
      grantDate: 'Podeljena patenta EP 2805592 in US 959672',
      status: isSlovenian ? 'Podeljen mednarodni patent (EP / US)' : 'Granted International Patent (EP / US)',
      recognition: 'Izdelki Atemm GREEN POINT in Atemm H-ESD',
      abstract: isSlovenian
        ? 'Patentirana rešitev nebolečega kontroliranega odvoda statičnega naboja od ljudi v času med 150 in 250 ms. Preprečuje instantne razelektritve (do 25 kV), bolečine, preskoke isker, nevarnost požara ali eksplozije ter negativne vplive na zdravje in psiho. Uporablja se na avtomobilih (varnostni pas Atemm H-ESD), stavbnem pohištvu, delovnih površinah ter računalniških perifernih napravah (tipkovnice in miške Atemm GREEN POINT) z možnostjo prilagoditve za X cone.'
        : 'Patented system for painless, controlled electrostatic discharge from humans within 150 to 250 ms. Prevents painful instant shocks (up to 25 kV), spark jumps, fire and explosion hazards, and adverse psycho-physical stress. Implemented in automobile seatbelts (Atemm H-ESD), machinery, architectural furniture, work surfaces, and computer peripherals (keyboards and mice Atemm GREEN POINT), with custom adaptability for hazardous EX zones.',
      keyFeatures: [
        isSlovenian ? 'Kontroliran in neboleč odvod statičnega naboja v času 150–250 ms (brez bolečega šoka)' : 'Painless controlled electrostatic discharge within 150–250 ms',
        isSlovenian ? 'Preprečevanje preskoka iskre in nevarnosti požara ali eksplozije pri napetostih do 25 kV' : 'Eliminates spark jumps and explosion risks from static charges up to 25 kV',
        isSlovenian ? 'Atemm H-ESD unikatna rešitev s prevodnim šivom na varnostnem pasu vozil (kontroliran odvod z dotikom do 7 cm²)' : 'Atemm H-ESD unique solution with conductive thread on automotive seatbelts (discharge with touch up to 7 cm²)',
        isSlovenian ? 'Atemm GREEN POINT integracija za delovna mesta in stavbno pohištvo' : 'Atemm GREEN POINT integration for workstations and architectural furniture',
        isSlovenian ? 'Možnost prilagoditve časa odvoda posebnim industrijskim zahtevam (X cone)' : 'Adjustable discharge timing tailored for hazardous explosive EX zones',
        isSlovenian ? 'Izumitelji: Tase Lazovski, Emil Benko, Angelo Porcaro' : 'Inventors: Tase Lazovski, Emil Benko, Angelo Porcaro'
      ],
      pdfUrl: '/assets/aistudio/ODVOD_STATI_NE_ELEKTRIKE_OD_LJUDI_e6afeecb.pdf',
      videoId: 'video-static'
    }
  ];

  const additionalInventions: {
    title: string;
    desc: string;
    category: string;
    badge: string;
    icon: any;
    videoId?: string;
    pdfUrl?: string;
    authors?: string;
  }[] = [
    {
      title: isSlovenian ? 'Univerzalni številčnik za obešalnike oblek' : isIt ? 'Numeratore universale per grucce' : 'Universal Coat Hanger Number Indicator',
      desc: isSlovenian
        ? 'Praktična mehanska rešitev za vse vrste obešalnikov, ki omogoča, da so številke artiklov vidne.'
        : 'Smart mechanical numbering and tracking indexer for garment hangers in institutional wardrobes and textile processing facilities.',
      category: isSlovenian ? 'Uporabno oblikovanje' : isIt ? 'Design applicato' : 'Applied Utility',
      badge: isSlovenian ? 'Model / Patent' : 'Utility Model',
      icon: Layers
    },
    {
      title: isSlovenian ? 'Smučarska palica brez metlice' : isIt ? 'Bastoncino da sci senza rotella' : 'Aerodynamic Basketless Ski Pole',
      desc: isSlovenian
        ? 'Aerodinamična optimizirana konstrukcija smučarske palice, ki zmanjšuje upor zraka in nudi zdrs ob količkih, kar omogoča hitrejši čas smučarja.'
        : 'Aerodynamically profiled ski pole innovation eliminating bulky snow baskets for reduced drag in alpine speed disciplines.',
      category: isSlovenian ? 'Športni inženiring' : isIt ? 'Ingegneria sportiva' : 'Sports Engineering',
      badge: isSlovenian ? 'Športna inovacija' : 'Sports Innovation',
      icon: Activity
    },
    {
      title: isSlovenian ? 'Okvir spletnega nakupovanja in e-plačevanja' : isIt ? 'Quadro e-commerce e pagamenti' : 'Online Shopping & Electronic Payment Framework',
      desc: isSlovenian
        ? 'Zgodnji tehnološki in procesni koncept varne avtorizacije elektronskih plačil in identifikacije uporabnikov v spletnem okolju.'
        : 'Early architectural and process framework for secure online digital payments, chip card authorization, and verified transaction settlement.',
      category: isSlovenian ? 'Digitalne tehnologije' : isIt ? 'Tecnologia digitale' : 'Digital Technologies',
      badge: isSlovenian ? 'Procesni model' : 'Process Framework',
      icon: CreditCard,
      authors: isSlovenian
        ? 'Avtor patenta: Jože Vilfan · Soavtor: Tase Lazovski'
        : isIt
        ? 'Autore del brevetto: Jože Vilfan · Coautore: Tase Lazovski'
        : 'Patent Author: Jože Vilfan · Co-author: Tase Lazovski'
    },
    {
      title: isSlovenian ? 'Ključ z označevanjem statusa zaklenjeno/odklenjeno' : isIt ? 'Chiave con indicatore di stato' : 'Key with Locked/Unlocked Status Indicator',
      desc: isSlovenian
        ? 'Inovativna mehanska rešitev v glavi ključa, ki ob zaprtju s premikom mehanizma v smeri ključavnice, nam pokaže odprto ali zaprto.'
        : 'Mechanical memory indicator embedded in the key head that changes color upon lock rotation, ending uncertainty about door status.',
      category: isSlovenian ? 'Mehanika & varnost' : isIt ? 'Meccanica' : 'Mechanical Utility',
      badge: isSlovenian ? 'Mehanska inovacija' : 'Mechanical Patent',
      icon: Compass
    }
  ];

  const explainerData = {
    vita: {
      title: isSlovenian ? 'Mehanizem varnostne igle VITA' : 'VITA Safety Needle Mechanism',
      patent: 'US Patent 5,051,109 A',
      desc: isSlovenian 
        ? 'Prebojni patent Taseta Lazovskega temelji na preprostem, a zanesljivem mehanizmu, ki medicinskemu osebju omogoča običajno vbrizgavanje, takoj po njem pa z roko sproži zaščitni tulec, ki nepovratno blokira ostro konico igle.'
        : 'Tase Lazovski’s breakthrough patent allows normal clinical operation while integrating an instant locking sheath that irreversibly shields the sharp needle tip.',
      steps: [
        {
          num: '01',
          name: isSlovenian ? 'Priprava & vbrizgavanje' : 'Clinical Preparation & Injection',
          detail: isSlovenian ? 'Igla deluje kot običajna medicinska; zaščitni tulec je v začetnem položaju pritrjen na telo brizge in ne ovira preglednosti vboda.' : 'Needle operates normally; protective sheath rests retracted without obstructing needle visualization.'
        },
        {
          num: '02',
          name: isSlovenian ? 'Sprostitev zaklepa' : 'Lock Release Trigger',
          detail: isSlovenian ? 'Zdravstveni delavec z roko premakne varnostni tulec iz začetnega položaja.' : 'Healthcare worker slides safety catch out of primary detent with single-hand motion.'
        },
        {
          num: '03',
          name: isSlovenian ? 'Aksialni premik tulca' : 'Axial Sheath Extension',
          detail: isSlovenian ? 'Zaščitni tulec se po končanem vbrizganju s prstom zadrži, samo iglo pa vlečemo iz telesa, na kar se notranji del tulca zatakne na vrh konice igle.' : 'Internal spring or positive slide drives protective sleeve forward over the full metal cannula.'
        },
        {
          num: '04',
          name: isSlovenian ? 'Trajna blokada zaščitnega tulca' : 'Irreversible Safety Locking',
          detail: isSlovenian ? 'S tem dosežemo, da se injekcijska igla zapiči v telo tulca in prepreči kakeršenjkoli negativen poseg na medicinsko osebje.' : 'Terminal locking tabs snap into locking groove. Needle is physically sealed, eliminating needle-stick risk.'
        }
      ]
    },
    parking: {
      title: isSlovenian ? 'Univerzalni parkirni terminal Nova Gorica 1999' : 'Nova Gorica 1999 Universal Parking Terminal',
      patent: isSlovenian ? 'Komunalna tehnologija 1999' : 'Municipal Technology 1999',
      desc: isSlovenian
        ? 'Leta 1999 je Nova Gorica med prvimi uvedla samostojne, energetsko neodvisne parkomate. Inovacija je združila fotovoltaiko, prepoznavanje kovancev, čip kartic, bančnih kartic in GSM telefonov.'
        : 'In 1999, Nova Gorica was among the pioneers implementing autonomous solar-powered parking kiosks supporting coin and smart chip card operations.',
      steps: [
        {
          num: '01',
          name: isSlovenian ? 'Solarno napajanje' : 'Solar Photovoltaic Power',
          detail: isSlovenian ? 'Zgornji fotovoltaični modul polni vgrajeni akumulator, kar omogoča delovanje brez dragega kopanja in vlečenja električnih kablov po mestu.' : 'Roof-mounted solar PV panel charges deep-cycle battery, avoiding costly trenching and street cabling.'
        },
        {
          num: '02',
          name: isSlovenian ? 'Validacija plačila' : 'Dual Payment Validation',
          detail: isSlovenian ? 'Avtomat sprejme kovance z optičnim in induktivnim merjenjem premera/teže ali odšteje znesek z vstavljenih plačilnih kartic.' : 'Unit validates coins via optical/inductive sensors or reads stored-value electronic chip cards.'
        },
        {
          num: '03',
          name: isSlovenian ? 'Termični tisk listka' : 'Thermal Ticket Printing',
          detail: isSlovenian ? 'Nizkoenergijski termični tiskalnik natisne veljavnost parkiranja, cono in registrsko kodo z visoko kontrastnim tiskom.' : 'Low-power thermal mechanism prints parking expiration, zone, and timecode.'
        },
        {
          num: '04',
          name: isSlovenian ? 'Protivandalska zaščita' : 'Vandal-Resistant Enclosure',
          detail: isSlovenian ? 'Ojačano nerjaveče jeklo in protivandalski sef varujeta zbrane kovance in elektroniko pred vremenskimi vplivi in vdori.' : 'Reinforced stainless steel and secure cash vault safeguard electronics and funds.'
        }
      ]
    },
    card: {
      title: isSlovenian ? 'Sistem telefonskih čip kartic (14. junij 1995)' : 'Telephone Smart Card System (14 June 1995)',
      patent: isSlovenian ? 'Tehnološki preboj Iskra Terminali' : 'Iskra Terminali System',
      desc: isSlovenian
        ? 'Sodelovanje z Iskra Terminali in podjetjem Impulz je Slovenijo 14. junija 1995 popeljalo iz dobe mehanskih žetonov v sodobno elektronsko dobo pametnih kontaktnih kartic.'
        : 'The collaboration with Iskra Terminali and Impulz propelled Slovenia on 14 June 1995 from heavy mechanical tokens into modern smart microchip telecommunications.',
      steps: [
        {
          num: '01',
          name: isSlovenian ? 'Konec dobe žetonov' : 'Phase-out of Mechanical Tokens',
          detail: isSlovenian ? 'Odprava težkih medeninastih žetonov z zarezami, ki so se pogosto zatikali v avtomatih in zahtevali stalno ročno praznjenje.' : 'Elimination of heavy grooved brass tokens prone to mechanical jamming and theft.'
        },
        {
          num: '02',
          name: isSlovenian ? 'Pozlačeni kontakti' : 'Gold-Plated Contact Interface',
          detail: isSlovenian ? 'Mikročip je zaščiten v tankem polimernem ohišju z 8 pozlačenimi kontaktnimi polji po mednarodnem standardu ISO 7816.' : 'Microchip secured inside slim polymer card with standard 8 gold-plated contact pads (ISO 7816).'
        },
        {
          num: '03',
          name: isSlovenian ? 'Enkriptirano štetje impulzov' : 'Encrypted Impulse Decrementing',
          detail: isSlovenian ? 'Vsak telefonski impulz neposredno in nepovratno prepiše interni register na kartici; preprečeno je ponarejanje ali polnjenje.' : 'Each phone impulse irreversibly burns security fuses in internal memory, preventing tampering.'
        },
        {
          num: '04',
          name: isSlovenian ? 'Zanesljivost terminalov' : 'Terminal Reliability',
          detail: isSlovenian ? 'Iskra Terminali javne govorilnice so s čip karticami dosegle 99,8 % razpoložljivost brez zastojev.' : 'Public payphones achieved 99.8% field uptime without coin slot clogs.'
        }
      ]
    },
    gas: {
      title: isSlovenian ? 'Varnostni časovnik za plin (T. Lazovski & E. Benko)' : 'Gas Stove Safety Timer (T. Lazovski & E. Benko)',
      patent: isSlovenian ? 'Patentna zaščita varnostnega ventila' : 'Gas Safety Valve Patent',
      desc: isSlovenian
        ? 'V sodelovanju z Emilom Benkom razviti varnostni mehanizem naslavlja enega najpogostejših vzrokov gospodinjskih nesreč: pozabljen prižgan plinski gorilnik.'
        : 'Developed with engineer Emil Benko, this safety mechanism addresses home hazards by automatically severing gas flow when burners are left unattended.',
      steps: []
    }
  };

  const videoArchives = [
    {
      id: 'video-vita',
      title: isSlovenian ? 'Injekcijska igla VITA – Predstavitev mehanizma' : 'VITA Safety Needle – Mechanism Demonstration',
      duration: '02:45',
      year: '1993',
      patent: 'US5051109A',
      image: vitaImg,
      videoUrl: 'https://ik.imagekit.io/utigodgni/Igla%20VITA1.mp4',
      desc: isSlovenian
        ? 'Arhivski posnetek in tehnični prikaz delovanja varnostnega mehanizma igle VITA, ki preprečuje nevarne vbode z avtomatskim zaklepom tulca.'
        : 'Archival footage and mechanical demonstration of the VITA safety needle assembly preventing needlestick injuries.'
    },
    {
      id: 'video-parking',
      title: isSlovenian ? 'Parkirni avtomat Nova Gorica' : 'Nova Gorica Parking Terminal',
      duration: '03:10',
      year: '1999',
      patent: 'Nova Gorica 1999',
      image: parkingImg,
      videoUrl: 'https://ik.imagekit.io/utigodgni/Parkirni%20avtomat1.mp4',
      desc: isSlovenian
        ? 'Prikaz prvega solarno napajanega univerzalnega parkomata v Novi Gorici leta 1999 ter plačevanja s kovanci in čip karticami.'
        : 'Historical broadcast showing the first solar-powered universal parking kiosk commissioned in Nova Gorica in 1999.'
    },
    {
      id: 'video-static',
      title: isSlovenian ? 'Odvod statične elektrike od ljudi (Atemm H-ESD)' : 'Static Electricity Discharge – Safety Belt (Atemm)',
      duration: '01:55',
      year: 'EP / US',
      patent: 'EP 2805592 · US 959672',
      image: heroImg,
      videoUrl: 'https://ik.imagekit.io/utigodgni/Odvod%20stati%C4%8Dne%20elektrike%20od%20ljudi%20-%20varnostni%20pas.mp4',
      desc: isSlovenian
        ? 'Arhivski videoposnetek in laboratorijski prikaz patentirane rešitve Atemm H-ESD za kontroliran, neboleč odvod statičnega naboja od ljudi v 150–250 ms.'
        : 'Archival video demonstration of patented Atemm H-ESD system for controlled painless human electrostatic discharge within 150–250 ms.'
    }
  ];

  return (
    <div className="bg-[#080B10] text-[#F0EDE5] min-h-screen selection:bg-[#53B8FF]/30 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* Technical Animated Inventor Background */}
      <InventorAnimatedBackground />


      {/* ========================================================================= */}
      {/* SECTION A: CINEMATIC HERO */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden z-10">
        {/* Ambient atmospheric light sweep */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[450px] bg-[#53B8FF]/10 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* Museum Exhibit Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#53B8FF]/30 bg-[#151B24]/80 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase">
                START LAB · ZAPUŠČINA INOVACIJ
              </span>
            </div>

            {/* Main Headline & Inventor Profile Portal */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pt-2">
              
              {/* Creative Animated Profile Portal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative shrink-0 group"
              >
                {/* Floating physics wrapper */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById('zgodba');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  title="Tase Lazovski – Klikni za ogled zgodbe"
                >
                  {/* Ambient Electric-Blue Aura */}
                  <div className="absolute -inset-3 bg-[#53B8FF]/25 rounded-3xl blur-2xl group-hover:bg-[#53B8FF]/45 transition-all duration-700 pointer-events-none" />

                  {/* Outer Technical Frame Ticks */}
                  <div className="absolute -inset-2 rounded-3xl border border-dashed border-[#53B8FF]/30 pointer-events-none" />

                  {/* High-tech Corner Coordinate Accents */}
                  <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#53B8FF] z-20 pointer-events-none" />
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#53B8FF] z-20 pointer-events-none" />
                  <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#53B8FF] z-20 pointer-events-none" />
                  <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#53B8FF] z-20 pointer-events-none" />

                  {/* Square Portrait Frame (Uncropped) */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 xl:w-48 xl:h-48 aspect-square rounded-2xl overflow-hidden border-2 border-[#53B8FF]/80 bg-[#0E131C] relative shadow-[0_0_35px_rgba(83,184,255,0.35)] group-hover:shadow-[0_0_55px_rgba(83,184,255,0.6)] group-hover:border-[#53B8FF] transition-all duration-500 flex items-center justify-center p-1.5">
                    <img 
                      src="https://ik.imagekit.io/utigodgni/IMG_3769.png" 
                      alt="Tase Lazovski - Inovator in izumitelj" 
                      className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                    />

                    {/* Animated Holographic Scanline Overlay */}
                    <motion.div 
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#53B8FF]/20 to-transparent pointer-events-none"
                    />

                    {/* Subtle Glass Vignette */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                  </div>

                  {/* Micro Inventor Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <div className="px-3 py-1 rounded-full bg-[#080B10]/95 border border-[#53B8FF]/70 text-[#53B8FF] text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest shadow-xl flex items-center gap-1.5 backdrop-blur-md group-hover:bg-[#53B8FF] group-hover:text-[#080B10] transition-colors duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#53B8FF] group-hover:bg-[#080B10] animate-ping" />
                      <span>IZUMITELJ</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Title & Subtitle */}
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.2rem] font-display font-black tracking-tight uppercase leading-[0.96] text-[#F0EDE5]"
                >
                  <span className="inline-flex items-center gap-3 sm:gap-4 flex-wrap">
                    <span>TASE</span>
                    <span 
                      className="text-xs sm:text-base md:text-lg lg:text-xl font-mono font-bold text-[#53B8FF] tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-xl bg-[#151B24]/90 border border-[#53B8FF]/40 shadow-sm align-middle normal-case"
                      title="Letnica rojstva: 1949"
                    >
                      * 1949
                    </span>
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#53B8FF] via-[#A8DCFF] to-white">
                    LAZOVSKI
                  </span>
                </motion.h1>

                {/* Theme Subtitle */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-[#53B8FF] tracking-wide mt-3 sm:mt-4 italic"
                >
                  “Ideje, ki postanejo del sveta.”
                </motion.p>
              </div>
            </div>

            {/* Editorial Overview */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl border-l-2 border-[#53B8FF]/40 pl-5"
            >
              {isSlovenian 
                ? "Spoznajte izumiteljski opus Tasa Lazovskega – od mednarodno priznanega patenta za varnostno injekcijsko iglo VITA z nagrado EUREKA v Bruslju, do pionirske uvedbe telefonskih čip kartic v Sloveniji in prvih sodobnih parkirnih avtomatov v Novi Gorici."
                : isIt
                  ? "Esplora l'eredità dell'inventore Tase Lazovski: dal brevetto internazionale per l'ago di sicurezza VITA premiato all'EUREKA di Bruxelles, alle prime schede telefoniche con chip e ai parcometri urbani a Nova Gorica."
                  : "Discover the technological legacy of inventor Tase Lazovski: from the globally granted VITA safety needle patent awarded at EUREKA Brussels, to introducing smart chip phone cards in Slovenia and modern parking terminals in Nova Gorica."}
            </motion.p>

            {/* Hero Quick Metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              <div className="p-3 rounded-2xl bg-[#151B24]/90 border border-slate-800">
                <div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">Patent ZDA</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">US5051109A</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#151B24]/90 border border-slate-800">
                <div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">Bruselj 1993</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">EUREKA Medaille</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#151B24]/90 border border-slate-800">
                <div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">14. junij 1995</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">Čip kartice</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#151B24]/90 border border-slate-800">
                <div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">Nova Gorica 1999</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">Parkomati</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a 
                href="#izumi"
                className="px-8 py-4 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(83,184,255,0.4)] flex items-center gap-3 cursor-pointer group"
              >
                <span>RAZIŠČI IZUME</span>
                <ChevronRight size={18} className="stroke-[3] group-hover:translate-x-1 transition-transform" />
              </a>

              <a 
                href="#casovnica"
                className="px-6 py-4 rounded-xl bg-[#151B24] hover:bg-slate-800 text-[#F0EDE5] border border-slate-700/80 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Clock size={16} className="text-[#53B8FF]" />
                <span>ČASOVNICA</span>
              </a>

              <a 
                href="#patenti"
                className="px-6 py-4 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-slate-800 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FileText size={16} className="text-[#53B8FF]" />
                <span>REGISTER PATENTOV</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual: Cinematic Archive Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[2.2rem] overflow-hidden border-2 border-slate-800/80 bg-[#151B24] shadow-[0_25px_60px_rgba(0,0,0,0.8)] group">
              
              {/* Image Frame */}
              <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden">
                <img 
                  src={heroImg} 
                  alt="Arhiv izumov Tasa Lazovskega"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Soft gradient mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080B10]/40 via-transparent to-transparent" />
              </div>

              {/* Museum placard overlay */}
              <div className="p-5 sm:p-6 bg-[#0E131C]/95 border-t border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#53B8FF] uppercase">
                    ARHIVSKI EKSPONAT · REF. TL-ARCH-01
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    SLOVENIJA / MEDNARODNO
                  </span>
                </div>
                <h3 className="font-display font-black text-sm sm:text-base uppercase text-white tracking-wide">
                  Tehnični načrti, patenti in prototipi
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zbirka originalne tehnične dokumentacije, prototipov varovalnih sistemov in industrijskih aplikacij izumitelja Tasa Lazovskega.
                </p>
              </div>

              {/* Corner badge */}
              <div className="absolute top-4 right-4 bg-[#080B10]/80 backdrop-blur-md border border-[#53B8FF]/40 text-[#53B8FF] px-3 py-1.5 rounded-xl font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 shadow-lg">
                <Sparkles size={12} />
                <span>Pristni arhivski viri</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: THE STORY / BIOGRAPHICAL DOCUMENTARY */}
      {/* ========================================================================= */}
      <section id="zgodba" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#0A0E15] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
              01 · DOKUMENTARNI PREGLED
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-tight leading-[1.05]">
              ČLOVEK, KI JE REŠEVAL <br />
              <span className="text-[#53B8FF]">RESNIČNE IZZIVE</span>
            </h2>
            <div className="w-20 h-1 bg-[#53B8FF] mt-6 rounded-full" />
          </div>

          {/* Editorial 2-column layout */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              <p className="text-xl sm:text-2xl font-serif italic text-white/95 leading-snug border-l-4 border-[#53B8FF] pl-6 py-1">
                “Vsak izum se rodi iz natančnega opazovanja: kje se ljudje soočajo z nevarnostjo, neučinkovitostjo ali zapleti, ki jih je mogoče rešiti z eleganco inženirskega mehanizma.”
              </p>

              <p>
                Tase Lazovski sodi med slovenske izumitelje, katerih delo je neposredno zaznamovalo vsakdan tisočih ljudi. Njegov pristop ni bil teoretičen, temveč globoko praktičen: prepoznati pereč problem, zasnovati mehansko ali elektronsko rešitev, jo zaščititi s strogimi patentnimi postopki in jo pripeljati do industrijske proizvodnje.
              </p>

              <p>
                Ko je svet v zgodnjih devetdesetih letih pretresla epidemija nalezljivih bolezni, prenesenih s krvjo, je Lazovski zasnoval mehanizem inekcijske igle <strong>VITA</strong>. Patent je bil prepoznan na najvišji mednarodni ravni in potrjen z ameriškim patentom <strong>US5051109A</strong> ter z zlato medaljo (médaille d’or) na svetovni razstavi inovacij <strong>EUREKA 1993 v Bruslju</strong>.
              </p>

              <p>
                Ob prehodu v digitalno dobo je sodeloval pri projektu, ki je spremenil telekomunikacije v Sloveniji: <strong>14. junija 1995</strong> so bile uradno vpeljane prve telefonske kartice z mikročipom v sodelovanju z <strong>Iskra Terminali</strong> in podjetjem <strong>Impulz</strong>. Nekaj let kasneje, leta 1999, pa je v Novi Gorici postavil temelje prvega sodobnega univerzalnega parkirnega avtomata z možnostjo plačila s kovanci, telefonsko čip kartico, bančno kartico in gsm telefonom.
              </p>

              <p className="text-slate-400 italic text-sm">
                V tej predstavitvi je predstavljeno le del svetovnih patentov Taseta Lazovskega.
              </p>
            </div>

            {/* Archival exhibit box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#151B24] border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#53B8FF]/10 text-[#53B8FF] flex items-center justify-center">
                    <Award size={22} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm uppercase text-white">Ključna priznanja in institucije</h4>
                    <p className="text-xs text-slate-400">Verificirani arhivski viri</p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#53B8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">USPTO (ZDA):</strong> Patent US 5,051,109 A podeljen 24. 9. 1991 za Safety hypodermic needle assembly.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#53B8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">EUREKA Bruselj 1993:</strong> Médaille d’Or (Salon International des Inventions).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#53B8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Iskra Terminali & Impulz:</strong> 14. junij 1995 – uradni zagon telefonskih čip kartic v RS.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#53B8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Mestna občina Nova Gorica:</strong> 1999 – vpeljava prvih sodobnih univerzalnih parkomatov.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#53B8FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Sodelovanje z Emilom Benkom:</strong> Razvoj in patentna zaščita plinskih varnostnih časovnikov.
                    </div>
                  </li>
                </ul>

                <div className="p-4 rounded-2xl bg-[#080B10] border border-slate-800 text-xs text-slate-400 font-mono">
                  Opomba arhiva: Prikazani so izključno preverjeni zgodovinski podatki iz izvirne patentne in tehnične dokumentacije.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: INTERACTIVE TIMELINE */}
      {/* ========================================================================= */}
      <section id="casovnica" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#080B10] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
                02 · KRONOLOGIJA PREBOJEV
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                INTERAKTIVNA ČASOVNICA
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md font-normal">
              Izberite posamezni mejnik za hiter skok na podrobnosti o izumu in tehnični dokumentaciji.
            </p>
          </div>

          {/* Interactive Horizontal / Responsive Timeline */}
          <div className="space-y-6">
            
            {/* Timeline Progress Track for Desktop */}
            <div className="hidden md:block relative px-4">
              <div className="h-1 bg-slate-800 rounded-full w-full relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#53B8FF] to-[#A8DCFF] rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(83,184,255,0.6)]"
                  style={{ width: `${((activeTimelineIdx + 1) / timelineMilestones.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Timeline Milestones Grid: Fully visible on all screen sizes, no horizontal scroll or cutoffs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3 w-full">
              {timelineMilestones.map((m, idx) => {
                const isActive = activeTimelineIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTimelineIdx(idx)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between gap-2.5 relative group ${
                      isActive
                        ? 'bg-[#151B24] border-[#53B8FF] shadow-[0_0_25px_rgba(83,184,255,0.25)] text-white scale-[1.02] z-10'
                        : 'bg-[#0E131C] border-slate-800 hover:border-slate-700 hover:bg-[#121822] text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono font-bold text-sm sm:text-base text-[#53B8FF] tracking-tight">{m.year}</span>
                      <span className={`w-2.5 h-2.5 rounded-full transition-all ${isActive ? 'bg-[#53B8FF] ring-4 ring-[#53B8FF]/20' : 'bg-slate-700 group-hover:bg-slate-500'}`} />
                    </div>
                    <span className="font-display font-bold text-xs uppercase leading-snug text-white line-clamp-2">
                      {m.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Spotlight Card */}
            {(() => {
              const current = timelineMilestones[activeTimelineIdx];
              return (
                <motion.div 
                  key={activeTimelineIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 sm:p-10 rounded-3xl bg-[#151B24] border-2 border-[#53B8FF]/40 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#53B8FF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                  
                  <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                    <div className="md:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3.5 py-1 rounded-full bg-[#53B8FF]/20 text-[#53B8FF] border border-[#53B8FF]/40 font-mono text-xs font-bold">
                          {current.exactDate}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 font-mono text-xs">
                          {current.tag}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-display font-black uppercase text-white leading-tight">
                        {current.title}
                      </h3>

                      <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                        {current.desc}
                      </p>

                      <div className="pt-2">
                        <a
                          href={`#${current.anchorId}`}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-[#53B8FF] hover:text-white uppercase tracking-wider group"
                        >
                          <span>Skoči na predstavitev izuma</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                        </a>
                      </div>
                    </div>

                    <div className="md:col-span-4 flex justify-center md:justify-end">
                      <div className="w-36 h-36 rounded-full border-4 border-[#53B8FF]/30 flex flex-col items-center justify-center bg-[#080B10] shadow-[0_0_40px_rgba(83,184,255,0.2)]">
                        <span className="text-xs font-mono text-[#53B8FF] uppercase">LETO</span>
                        <span className="text-3xl font-display font-black text-white">{current.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: FEATURED INVENTIONS (4 DISTINCT FEATURES) */}
      {/* ========================================================================= */}
      <section id="izumi" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#0A0E15] relative z-10 space-y-32">
        <div className="max-w-7xl mx-auto">

          {/* Section Introduction */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
              03 · ŠTIRI GLAVNE INOVACIJE
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-tight">
              IZUMI, KI SO PUSTILI PEČAT
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed font-normal">
              Vsak izum predstavlja samosvoj inženirski odgovor na ključne družbene, medicinske in urbane izzive svojega časa.
            </p>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 1. INJEKCIJSKA IGLA VITA */}
          {/* --------------------------------------------------------------------- */}
          <div id="izum-vita" className="scroll-mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Visual & Video Column */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-[#53B8FF]/40 bg-[#151B24] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                
                {/* Header Switcher: Video / Drawing */}
                <div className="p-3 bg-[#0E131C] border-b border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-[#151B24] p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setVitaViewMode('video')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                        vitaViewMode === 'video'
                          ? 'bg-[#53B8FF] text-[#080B10] shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Play size={13} className={vitaViewMode === 'video' ? 'fill-[#080B10]' : ''} />
                      <span>Video posnetek</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVitaViewMode('drawing')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                        vitaViewMode === 'drawing'
                          ? 'bg-[#53B8FF] text-[#080B10] shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <FileText size={13} />
                      <span>Patentne skice ({vitaImages.length})</span>
                    </button>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold">
                    <Award size={13} />
                    <span>EUREKA 1993</span>
                  </span>
                </div>

                {/* Media Container */}
                <div className="relative aspect-video sm:aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
                  {vitaViewMode === 'video' ? (
                    <video 
                      src="https://ik.imagekit.io/utigodgni/Igla%20VITA1.mp4"
                      poster={vitaImg}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain bg-black"
                    >
                      Vaš brskalnik ne podpira predvajanja videa.
                    </video>
                  ) : (
                    <div className="relative w-full h-full bg-[#0A0E15] flex items-center justify-center p-3 sm:p-5 group/draw">
                      <img 
                        src={vitaImages[activeVitaImgIdx].url} 
                        alt={vitaImages[activeVitaImgIdx].title} 
                        className="w-full h-full object-contain group-hover/draw:scale-105 transition-transform duration-500 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                      />

                      {/* Navigation arrows */}
                      <button
                        type="button"
                        onClick={() => setActiveVitaImgIdx((prev) => (prev === 0 ? vitaImages.length - 1 : prev - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                        title="Prejšnja skica"
                      >
                        <ChevronRight size={18} className="rotate-180 stroke-[2.5]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveVitaImgIdx((prev) => (prev === vitaImages.length - 1 ? 0 : prev + 1))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                        title="Naslednja skica"
                      >
                        <ChevronRight size={18} className="stroke-[2.5]" />
                      </button>

                      <div className="absolute top-4 left-4 pointer-events-none bg-[#080B10]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#53B8FF]/40 text-[#53B8FF] font-mono text-xs font-bold z-10">
                        US PATENT US5051109A
                      </div>

                      <button
                        type="button"
                        onClick={() => setEnlargedVitaImg(vitaImages[activeVitaImgIdx].url)}
                        className="absolute bottom-4 right-4 bg-[#080B10]/90 hover:bg-[#53B8FF] text-slate-300 hover:text-[#080B10] backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 hover:border-[#53B8FF] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md z-10"
                        title="Povečaj sliko"
                      >
                        <Maximize2 size={13} />
                        <span className="hidden sm:inline">Povečaj</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Bar: When Video vs When Drawing */}
                {vitaViewMode === 'video' ? (
                  <div className="p-3.5 bg-[#0E131C] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                      <span className="text-white font-bold">Igla VITA1.mp4</span>
                      <span className="text-slate-500 hidden sm:inline">· Izvirni video arhiv</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveVideoModal('video-vita')}
                      className="hover:text-[#53B8FF] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300 hover:underline"
                      title="Odpri v velikem predvajalniku"
                    >
                      <Maximize2 size={13} />
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider">Celozaslonski način</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-[#0E131C] border-t border-slate-800 grid grid-cols-3 gap-2.5">
                    {vitaImages.map((img, idx) => {
                      const isSelected = activeVitaImgIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveVitaImgIdx(idx)}
                          className={`rounded-xl overflow-hidden border-2 transition-all p-1.5 bg-[#080B10] flex items-center gap-2 cursor-pointer text-left ${
                            isSelected
                              ? 'border-[#53B8FF] shadow-[0_0_15px_rgba(83,184,255,0.3)] bg-[#151B24]'
                              : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-black shrink-0 flex items-center justify-center">
                            <img 
                              src={img.url} 
                              alt={`Predogled ${idx + 1}`} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="overflow-hidden hidden sm:block">
                            <div className={`text-[10px] font-mono font-bold truncate ${isSelected ? 'text-[#53B8FF]' : 'text-slate-300'}`}>
                              Skica 0{idx + 1}
                            </div>
                            <div className="text-[9px] text-slate-500 font-sans truncate">
                              {img.title}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#53B8FF] tracking-widest uppercase">
                <span>MEDICINSKA INOVACIJA 01</span>
                <span>·</span>
                <span>ZDA & EUREKA</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white leading-[1.05]">
                INJEKCIJSKA IGLA <span className="text-[#53B8FF]">VITA</span>
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Problem:</strong> V zdravstvu so naključni vbodi z rabljenimi iglami predstavljali smrtonosno tveganje za prenos virusov HIV, hepatitisa B in C. Medicinske sestre in zdravniki so se pri ponovnem rokovanju z rabljeno iglo pogosto nevede zabodli.
                </p>
                <p>
                  <strong>Rešitev Tasa Lazovskega:</strong> Vzmetni cilindrični zaščitni mehanizem, ki se po vbrizgavanju z enostavnim enoročnim potiskom premakne prek konice igle in nepovratno zaklene. Mehanizem popolnoma onemogoča ponovni stik z ostro konico.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#151B24] border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-[#53B8FF] uppercase">Patent & Priznanje:</div>
                <div className="text-xs sm:text-sm text-slate-300">
                  Patent <strong>US 5,051,109 A</strong> (podeljen 24. 9. 1991) ter prestižna <strong>zlata medalja (médaille d’or)</strong> na svetovnem salonu inovacij <strong>EUREKA 1993 v Bruslju</strong>.
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setVitaViewMode('video');
                    setActiveVideoModal('video-vita');
                  }}
                  className="px-6 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(83,184,255,0.3)]"
                >
                  <Play size={16} className="fill-[#080B10]" />
                  <span>Predvajaj video posnetek</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const rec = patentRegistry.find(p => p.id === 'us5051109a');
                    if (rec) setSelectedPatent(rec);
                  }}
                  className="px-5 py-3 rounded-xl bg-[#151B24] hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={16} className="text-[#53B8FF]" />
                  <span>Ogled patenta US5051109A</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveExplainerTab('vita');
                    const el = document.getElementById('tehnicna-razlaga');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-[#151B24] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Eye size={16} className="text-[#53B8FF]" />
                  <span>Kako deluje mehanizem</span>
                </button>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 2. PARKIRNI AVTOMAT NOVA GORICA */}
          {/* --------------------------------------------------------------------- */}
          <div id="izum-parkirni" className="scroll-mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[#53B8FF] tracking-widest uppercase">
                <span>URBANA AVTOMATIZACIJA 02</span>
                <span>·</span>
                <span>NOVA GORICA 1999</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white leading-[1.05]">
                UNIVERZALNI <span className="text-[#53B8FF]">PARKIRNI AVTOMAT</span>
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Zgodba:</strong> Konec devetdesetih let so mesta iskala zanesljive, energetsko varčne načine urejanja mirujočega prometa. Tradicionalni parkomati so zahtevali drago polaganje električnega omrežja in so se pogosto kvarili ob vnosu različnih žetonov.
                </p>
                <p>
                  <strong>Izum Taseta Lazovskega:</strong> Avtomatizirani parkirni terminal s strešnim fotovoltaičnim modulom, ki je omogočal popolno energetsko avtonomnost. Opremljen je bil z elektronskim prepoznavanjem kovancev ter čitalnikom naprednih pametnih kartic.
                </p>
                <p>
                  Leta <strong>1999</strong> so bili prvi takšni avtomati vpeljani v <strong>Novi Gorici</strong> (ko sosednje države kot so; Italija, Avstrija, Madžarska, Nemčija, Hrvaška tega še niso imele), kar je pomenilo pionirski korak k digitaliziranemu upravljanju mestnih površin.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">Napajanje</div>
                  <div className="font-bold text-white text-xs mt-1">Fotovoltaični solarni modul</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">Plačilni vmesnik</div>
                  <div className="font-bold text-white text-xs mt-1">Kovanci + čip kartice</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setParkingViewMode('video');
                    setActiveVideoModal('video-parking');
                  }}
                  className="px-6 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(83,184,255,0.3)]"
                >
                  <Play size={16} className="fill-[#080B10]" />
                  <span>Predvajaj video posnetek</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const rec = patentRegistry.find(p => p.id === 'parking-meter');
                    if (rec) setSelectedPatent(rec);
                  }}
                  className="px-5 py-3 rounded-xl bg-[#151B24] hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={16} className="text-[#53B8FF]" />
                  <span>Tehnične specifikacije</span>
                </button>
              </div>
            </div>

            {/* Visual & Video Column */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-[#53B8FF]/40 bg-[#151B24] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                
                {/* Header Switcher: Video / Photo */}
                <div className="p-3 bg-[#0E131C] border-b border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-[#151B24] p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setParkingViewMode('video')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                        parkingViewMode === 'video'
                          ? 'bg-[#53B8FF] text-[#080B10] shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Play size={13} className={parkingViewMode === 'video' ? 'fill-[#080B10]' : ''} />
                      <span>Video posnetek</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setParkingViewMode('photo')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                        parkingViewMode === 'photo'
                          ? 'bg-[#53B8FF] text-[#080B10] shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <FileText size={13} />
                      <span>Fotografija</span>
                    </button>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#53B8FF]/10 border border-[#53B8FF]/30 text-[#53B8FF] font-mono text-[11px] font-bold">
                    <MapPin size={13} />
                    <span>Nova Gorica 1999</span>
                  </span>
                </div>

                {/* Media Container */}
                <div className="relative aspect-video sm:aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
                  {parkingViewMode === 'video' ? (
                    <video 
                      src="https://ik.imagekit.io/utigodgni/Parkirni%20avtomat1.mp4"
                      poster={parkingImg}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain bg-black"
                    >
                      Vaš brskalnik ne podpira predvajanja videa.
                    </video>
                  ) : (
                    <div className="relative w-full h-full group/draw">
                      <img 
                        src={parkingImg} 
                        alt="Parkirni avtomat Nova Gorica 1999" 
                        className="w-full h-full object-cover group-hover/draw:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 bg-[#080B10]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono text-slate-300">
                        Prva uvedba parkirnega avtomata v Novi Gorici
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Bar Info */}
                <div className="p-3.5 bg-[#0E131C] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                    <span className="text-white font-bold">Parkirni avtomat1.mp4</span>
                    <span className="text-slate-500 hidden sm:inline">· Arhivski posnetek</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal('video-parking')}
                    className="hover:text-[#53B8FF] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300 hover:underline"
                    title="Odpri v velikem predvajalniku"
                  >
                    <Maximize2 size={13} />
                    <span className="text-[11px] font-sans font-bold uppercase tracking-wider">Celozaslonski način</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 3. TELEFONSKA ČIP KARTICA */}
          {/* --------------------------------------------------------------------- */}
          <div id="izum-kartica" className="scroll-mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-[#53B8FF]/40 bg-[#151B24] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                
                {/* Header Info Bar */}
                <div className="p-3 bg-[#0E131C] border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                    <span className="text-white font-bold">14. JUNIJ 1995 · SLOVENIJA</span>
                    <span className="text-slate-500 hidden sm:inline">· Iskra Terminali & Impulz</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#53B8FF]/10 border border-[#53B8FF]/30 text-[#53B8FF]">
                    Fotografiji ({cardImages.length})
                  </span>
                </div>

                <div className="relative aspect-video sm:aspect-[16/10] bg-[#0A0E15] overflow-hidden flex items-center justify-center p-3 sm:p-5 group/draw">
                  <img 
                    src={cardImages[activeCardImgIdx].url} 
                    alt={cardImages[activeCardImgIdx].title} 
                    className="w-full h-full object-contain group-hover/draw:scale-105 transition-transform duration-700 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Navigation arrows */}
                  <button
                    type="button"
                    onClick={() => setActiveCardImgIdx((prev) => (prev === 0 ? cardImages.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                    title="Prejšnja fotografija"
                  >
                    <ChevronRight size={18} className="rotate-180 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveCardImgIdx((prev) => (prev === cardImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                    title="Naslednja fotografija"
                  >
                    <ChevronRight size={18} className="stroke-[2.5]" />
                  </button>

                  <div className="absolute top-4 left-4 pointer-events-none bg-[#080B10]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#53B8FF]/40 text-[#53B8FF] font-mono text-xs font-bold z-10">
                    {cardImages[activeCardImgIdx].title}
                  </div>

                  <button
                    type="button"
                    onClick={() => setEnlargedGasImg(cardImages[activeCardImgIdx].url)}
                    className="absolute bottom-4 right-4 bg-[#080B10]/90 hover:bg-[#53B8FF] text-slate-300 hover:text-[#080B10] backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 hover:border-[#53B8FF] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md z-10"
                    title="Povečaj"
                  >
                    <Maximize2 size={13} />
                    <span className="hidden sm:inline">Povečaj</span>
                  </button>
                </div>

                {/* Thumbnail Strip with 2 Images */}
                <div className="p-3 bg-[#0E131C] border-t border-slate-800 grid grid-cols-2 gap-2.5">
                  {cardImages.map((img, idx) => {
                    const isSelected = activeCardImgIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveCardImgIdx(idx)}
                        className={`rounded-xl overflow-hidden border-2 transition-all p-1.5 bg-[#080B10] flex items-center gap-2 cursor-pointer text-left ${
                          isSelected
                            ? 'border-[#53B8FF] shadow-[0_0_15px_rgba(83,184,255,0.3)] bg-[#151B24]'
                            : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-black shrink-0 flex items-center justify-center p-0.5">
                          <img 
                            src={img.url} 
                            alt={`Predogled ${idx + 1}`} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <div className={`text-[10px] font-mono font-bold truncate ${isSelected ? 'text-[#53B8FF]' : 'text-slate-300'}`}>
                            Fotografija 0{idx + 1}
                          </div>
                          <div className="text-[9px] text-slate-500 font-sans truncate">
                            {img.title}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#53B8FF] tracking-widest uppercase">
                <span>TELEKOMUNIKACIJE 03</span>
                <span>·</span>
                <span>ISKRA TERMINALI & IMPULZ</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white leading-[1.05]">
                TELEFONSKA <span className="text-[#53B8FF]">ČIP KARTICA</span>
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Prehod z žetonov:</strong> Do sredine devetdesetih let so javne govorilnice delovale na težke kovinske žetone, kar je privedlo do veliko škode ter in vzdrževanja telekomunikacijskega omrežja.
                </p>
                <p>
                  <strong>Zgodovinski 14. junij 1995:</strong> V sodelovanju s podjetjem <strong>Iskra Terminali</strong> in podjetjem <strong>Impulz</strong> je bil zagnan nacionalni sistem elektronskih telefonskih kartic z vgrajenim kontaktnim čipom.
                </p>
                <p>
                  Kartica je omogočala zanesljivo elektronsko odštevanje impulzov, preprečevala ponarejanje in postavila temelj za digitalno plačevanje v Sloveniji.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#151B24] border border-slate-800 space-y-2 text-xs">
                <div className="text-slate-300 leading-relaxed">
                  Realizacijo uvedbe čip kartic za potrebe javnih telefonskih govorilnic so omogočili <strong>Iskra Terminali Kranj</strong> in <strong>Impulz d.o.o. Nova Gorica</strong>.
                </div>
                <div className="text-[#53B8FF] font-semibold">
                  Tase Lazovski je izumitelj pri čip kartici z vidika marketinga.
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const rec = patentRegistry.find(p => p.id === 'chip-card');
                    if (rec) setSelectedPatent(rec);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText size={16} />
                  <span>Podrobnosti sistema čip kartice</span>
                </button>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 4. ČASOVNIK ZA PLINSKE ŠTEDILNIKE */}
          {/* --------------------------------------------------------------------- */}
          <div id="izum-plin" className="scroll-mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[#53B8FF] tracking-widest uppercase">
                <span>VARNOSTNI INŽENIRING 04</span>
                <span>·</span>
                <span>T. LAZOVSKI & E. BENKO</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white leading-[1.05]">
                ČASOVNIK ZA <span className="text-[#53B8FF]">PLINSKE ŠTEDILNIKE</span>
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Gospodinjska nevarnost:</strong> Pozabljen prižgan plinski gorilnik je med najpogostejšimi vzroki kuhinjskih požarov in eksplozij, zlasti pri starejših ali raztresenih uporabnikih.
                </p>
                <p>
                  <strong>Sodelovanje Taseta Lazovskega:</strong> Razvil je elektromehanski varnostni ventil s časovnikom. Pred prižigom uporabnik nastavi želeni čas delovanja. Ko čas poteče, ventil avtomatsko in hipoma nepredušno zapre dovod plina do gorilnika.
                </p>
                <p>
                  Inovacija deluje samostojno, kar zagotavlja visoko varnostno zanesljivost.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">Avtorja izuma</div>
                  <div className="font-bold text-white text-xs mt-1">Tase Lazovski & Emil Benko</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">Varnostni odziv</div>
                  <div className="font-bold text-white text-xs mt-1">&lt; 0.2 s zapora plina</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const rec = patentRegistry.find(p => p.id === 'gas-timer');
                    if (rec) setSelectedPatent(rec);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText size={16} />
                  <span>Tehnična dokumentacija plinskega ventila</span>
                </button>
              </div>
            </div>

            {/* Visual Column: Interactive 3-Image Showcase */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-[#53B8FF]/40 bg-[#151B24] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                
                {/* Header Info Bar */}
                <div className="p-3 bg-[#0E131C] border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                    <span className="text-white font-bold">{gasTimerImages[activeGasImgIdx].title}</span>
                    <span className="text-slate-500 hidden sm:inline">· {gasTimerImages[activeGasImgIdx].subtitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#53B8FF]">
                    <span className="px-2 py-0.5 rounded-md bg-[#53B8FF]/10 border border-[#53B8FF]/30">
                      0{activeGasImgIdx + 1} / 03
                    </span>
                  </div>
                </div>

                {/* Main Image Frame with Previous/Next Arrows */}
                <div className="relative aspect-video sm:aspect-[16/10] bg-[#0A0E15] overflow-hidden flex items-center justify-center p-3 sm:p-5 group/img">
                  <img 
                    src={gasTimerImages[activeGasImgIdx].url} 
                    alt={`Časovnik za plinske štedilnike - Slika ${activeGasImgIdx + 1}`} 
                    className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                  />

                  {/* Left / Right Nav Arrows */}
                  <button
                    type="button"
                    onClick={() => setActiveGasImgIdx((prev) => (prev === 0 ? gasTimerImages.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                    title="Prejšnja slika"
                  >
                    <ChevronRight size={18} className="rotate-180 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveGasImgIdx((prev) => (prev === gasTimerImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/85 hover:bg-[#53B8FF] text-white hover:text-[#080B10] border border-slate-700 hover:border-[#53B8FF] flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-lg z-10"
                    title="Naslednja slika"
                  >
                    <ChevronRight size={18} className="stroke-[2.5]" />
                  </button>

                  <div className="absolute top-4 left-4 pointer-events-none bg-[#080B10]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#53B8FF]/40 text-[#53B8FF] font-mono text-xs font-bold">
                    T. LAZOVSKI & E. BENKO
                  </div>

                  <button
                    type="button"
                    onClick={() => setEnlargedGasImg(gasTimerImages[activeGasImgIdx].url)}
                    className="absolute bottom-4 right-4 bg-[#080B10]/90 hover:bg-[#53B8FF] text-slate-300 hover:text-[#080B10] backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 hover:border-[#53B8FF] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md z-10"
                    title="Povečaj sliko"
                  >
                    <Maximize2 size={13} />
                    <span className="hidden sm:inline">Povečaj</span>
                  </button>
                </div>

                {/* Thumbnail Strip with 3 Images */}
                <div className="p-3 bg-[#0E131C] border-t border-slate-800 grid grid-cols-3 gap-2.5">
                  {gasTimerImages.map((img, idx) => {
                    const isSelected = activeGasImgIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveGasImgIdx(idx)}
                        className={`rounded-xl overflow-hidden border-2 transition-all p-1.5 bg-[#080B10] flex items-center gap-2 cursor-pointer text-left ${
                          isSelected
                            ? 'border-[#53B8FF] shadow-[0_0_15px_rgba(83,184,255,0.3)] bg-[#151B24]'
                            : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-black shrink-0 flex items-center justify-center">
                          <img 
                            src={img.url} 
                            alt={`Predogled ${idx + 1}`} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="overflow-hidden hidden sm:block">
                          <div className={`text-[10px] font-mono font-bold truncate ${isSelected ? 'text-[#53B8FF]' : 'text-slate-300'}`}>
                            Slika 0{idx + 1}
                          </div>
                          <div className="text-[9px] text-slate-500 font-sans truncate">
                            {img.title}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* 5. ODVOD STATIČNE ELEKTRIKE OD LJUDI */}
          {/* --------------------------------------------------------------------- */}
          <div id="izum-static" className="scroll-mt-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[#53B8FF] tracking-widest uppercase">
                <span>ELEKTROSTATIKA & VARNOST 05</span>
                <span>·</span>
                <span>T. LAZOVSKI, E. BENKO, A. PORCARO</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white leading-[1.05]">
                ODVOD STATIČNE <span className="text-[#53B8FF]">ELEKTRIKE OD LJUDI</span>
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Problem statične elektrike:</strong> V določenih atmosferskih pogojih ter ob uporabi sodobnih materialov pri oblačilih, obutvi in opremi se na človeškem telesu lahko nakopiči elektrostatični naboj s potencialom tudi do <strong>25.000 V (25 kV)</strong>. Ob dotiku ozemljenega predmeta pride do hipne razelektritve, bolečega šoka, preskoka iskre in nevarnosti vžiga ali eksplozije, poleg tega pa ima tak naboj negativen vpliv na zdravje in počutje.
                </p>
                <p>
                  <strong>Patentirana rešitev (EP 2805592 / US 959672):</strong> Izumitelji <strong>Tase Lazovski</strong>, <strong>Emil Benko</strong> in <strong>Angelo Porcaro</strong> so razvili in patentirali mehanizem za neboleč, kontroliran odvod statičnega naboja v času med <strong>150 in 250 ms</strong> (s prilagoditvijo tudi za X cone).
                </p>
                <p>
                  Inovativne rešitve so uveljavljene v komercialnih izdelkih <strong>Atemm H-ESD</strong> (integracija v varnostni pas vozil z prevodnim šivom) in je unikatna rešitev, saj omogoča kontroliran odvod statične elektrike z dotikom osebe na prevodni material do maksimalno 7 cm² površine, ter <strong>Atemm GREEN POINT</strong> (delovna mesta in stavbno pohištvo).
                </p>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">Čas odvoda</div>
                  <div className="font-bold text-white text-xs mt-1">150 – 250 ms (neboleče)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">Napetostni razpon</div>
                  <div className="font-bold text-white text-xs mt-1">Do 25 kV zaščita</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151B24] border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono text-[#53B8FF] uppercase">Patenta</div>
                  <div className="font-bold text-white text-xs mt-1 truncate">EP 2805592 · US 959672</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="/assets/aistudio/ODVOD_STATI_NE_ELEKTRIKE_OD_LJUDI_e6afeecb.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText size={16} />
                  <span>Odpri patentni dokument (PDF)</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal('video-static')}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Play size={16} className="text-[#53B8FF]" />
                  <span>Predvajaj video posnetek</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const rec = patentRegistry.find(p => p.id === 'esd-static');
                    if (rec) setSelectedPatent(rec);
                  }}
                  className="px-5 py-3 rounded-xl bg-[#151B24] hover:bg-slate-800 text-slate-300 border border-slate-800 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Info size={16} className="text-[#53B8FF]" />
                  <span>Specifikacije izuma</span>
                </button>
              </div>
            </div>

            {/* Visual Column: Technical Schematic Blueprint */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden border-2 border-[#53B8FF]/40 bg-[#151B24] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                <div className="p-3 bg-[#0E131C] border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                    <span className="text-white font-bold">Uradna patentna dokumentacija</span>
                    <span className="text-slate-500 hidden sm:inline">· Atemm H-ESD & GREEN POINT</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#53B8FF]/10 border border-[#53B8FF]/30 text-[#53B8FF]">
                    EP 2805592 · US 959672
                  </span>
                </div>

                <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-white overflow-hidden flex items-center justify-center p-3 group/img">
                  <img 
                    src="/assets/odvod_staticne_elektrike_shema.png" 
                    alt="Odvod statične elektrike od ljudi patentna shema Atemm" 
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover/img:scale-[1.02]"
                  />

                  <div className="absolute top-4 left-4 pointer-events-none bg-[#080B10]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#53B8FF]/40 text-[#53B8FF] font-mono text-xs font-bold">
                    T. LAZOVSKI, E. BENKO, A. PORCARO
                  </div>

                  <button
                    type="button"
                    onClick={() => setEnlargedGasImg('/assets/odvod_staticne_elektrike_shema.png')}
                    className="absolute bottom-4 right-4 bg-[#080B10]/90 hover:bg-[#53B8FF] text-slate-300 hover:text-[#080B10] backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 hover:border-[#53B8FF] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md z-10"
                    title="Povečaj načrt"
                  >
                    <Maximize2 size={13} />
                    <span className="hidden sm:inline">Povečaj načrt</span>
                  </button>
                </div>

                <div className="p-3.5 bg-[#0E131C] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="truncate">Vgradnja v varnostni pas vozil & računalniško opremo</span>
                  <a
                    href="/assets/aistudio/ODVOD_STATI_NE_ELEKTRIKE_OD_LJUDI_e6afeecb.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#53B8FF] hover:underline flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>Celoten PDF</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: HOW IT WORKS (INTERACTIVE TECHNICAL EXPLAINER) */}
      {/* ========================================================================= */}
      <section id="tehnicna-razlaga" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#080B10] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
              04 · INTERAKTIVNA MEHANIKA
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              KAKO DELUJEJO IZUMI
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              Izberite tehnologijo za razstavljen pogled na komponente, korake delovanja in mehaniko delovanja.
            </p>
          </div>

          {/* Technology Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: 'vita' as const, label: isSlovenian ? 'Igla VITA (US5051109A)' : 'VITA Needle' },
              { id: 'parking' as const, label: isSlovenian ? 'Parkomat Nova Gorica 1999' : 'Parking Meter' },
              { id: 'card' as const, label: isSlovenian ? 'Čip kartica Iskra 1995' : 'Chip Card' },
              { id: 'gas' as const, label: isSlovenian ? 'Plinski ventil (Benko & Lazovski)' : 'Gas Valve' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveExplainerTab(tab.id);
                  setActiveStep(0);
                }}
                className={`px-5 py-3 rounded-2xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                  activeExplainerTab === tab.id
                    ? 'bg-[#53B8FF] text-[#080B10] shadow-[0_0_20px_rgba(83,184,255,0.3)]'
                    : 'bg-[#151B24] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Explainer Interactive Container */}
          {(() => {
            const data = explainerData[activeExplainerTab];
            return (
              <div className="p-6 sm:p-10 rounded-3xl bg-[#151B24] border border-slate-800 shadow-2xl">
                <div className={`max-w-3xl ${data.steps.length > 0 ? 'mb-8' : ''}`}>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#53B8FF]/15 text-[#53B8FF] font-mono text-xs mb-2">
                    {data.patent}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                    {data.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                    {data.desc}
                  </p>
                </div>

                {/* Steps Grid */}
                {data.steps.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.steps.map((st, i) => {
                      const isSelected = activeStep === i;
                      return (
                        <div
                          key={i}
                          onClick={() => setActiveStep(i)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0E131C] border-[#53B8FF] shadow-[0_0_15px_rgba(83,184,255,0.2)]'
                              : 'bg-[#0E131C]/60 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className={`font-mono text-xl font-bold ${isSelected ? 'text-[#53B8FF]' : 'text-slate-500'}`}>
                              {st.num}
                            </span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-ping" />}
                          </div>
                          <h4 className="font-display font-black text-sm uppercase text-white mb-2 leading-snug">
                            {st.name}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {st.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION F: ADDITIONAL INVENTIONS (ARCHIVE SECTION) */}
      {/* ========================================================================= */}
      <section id="ostali-izumi" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#0A0E15] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
              05 · OSTALI DOKUMENTIRANI IZUMI
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              ŠIRŠI IZUMITELJSKI OPUS
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              Pregled ostalih patentov, modelov in razvojnih pobud Tasa Lazovskega s področij industrijske varnosti, športa in uporabnega oblikovanja.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalInventions.map((inv, idx) => {
              const Icon = inv.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-[#151B24] border border-slate-800 hover:border-[#53B8FF]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#53B8FF]/10 text-[#53B8FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={24} className="stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-[#080B10] border border-slate-800 text-slate-400">
                        {inv.badge}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-[#53B8FF] uppercase tracking-wider">
                      {inv.category}
                    </div>

                    <h3 className="font-display font-black text-lg uppercase text-white leading-snug">
                      {inv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                      {inv.desc}
                    </p>

                    {inv.authors && (
                      <div className="pt-1">
                        <div className="px-3 py-2 rounded-xl bg-[#080B10] border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#53B8FF] shrink-0" />
                          <span className="font-semibold text-slate-200">{inv.authors}</span>
                        </div>
                      </div>
                    )}

                    {inv.videoId && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setActiveVideoModal(inv.videoId!)}
                          className="w-full py-2.5 rounded-xl bg-[#53B8FF]/15 hover:bg-[#53B8FF] text-[#53B8FF] hover:text-[#080B10] border border-[#53B8FF]/30 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group/btn"
                        >
                          <Play size={14} className="fill-current" />
                          <span>Predvajaj video posnetek</span>
                        </button>
                      </div>
                    )}
                    {inv.pdfUrl && (
                      <div className="pt-2">
                        <a
                          href={inv.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          <FileText size={14} className="text-[#53B8FF]" />
                          <span>Odpri patentni dokument (PDF)</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>Arhivski vir Start Lab</span>
                    <span className="text-[#53B8FF]">Dokumentirano</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION G: PATENTS AND RECOGNITION (REGISTRY MODAL TRIGGER) */}
      {/* ========================================================================= */}
      <section id="patenti" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#080B10] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
                06 · DOKUMENTACIJA & REGISTER
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                PATENTI IN MEDNARODNA PRIZNANJA
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md font-normal">
              Strogo preverjeni podatki o patentnih številkah, uradih, datumih podelitve in doseženih priznanjih.
            </p>
          </div>

          {/* Registry Table / Cards */}
          <div className="space-y-4">
            {patentRegistry.map((patent) => (
              <div 
                key={patent.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#151B24] border border-slate-800 hover:border-slate-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2 lg:max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="px-3 py-1 rounded-lg bg-[#53B8FF]/15 text-[#53B8FF] font-mono text-xs font-bold">
                      {patent.number}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {patent.jurisdiction}
                    </span>
                    {patent.recognition && (
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold">
                        ★ {patent.recognition}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-black text-lg sm:text-xl uppercase text-white leading-tight">
                    {patent.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {patent.abstract}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:block text-right text-xs font-mono text-slate-400">
                    {patent.manufacturer ? (
                      <>
                        <div>Proizvajalec: {patent.manufacturer}</div>
                        {patent.coordination && <div className="text-slate-400">Koordinacija: {patent.coordination}</div>}
                      </>
                    ) : (
                      <div>Izumitelj: {patent.inventors.join(', ')}</div>
                    )}
                    <div className="text-slate-500">{patent.grantDate}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPatent(patent)}
                    className="px-5 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <BookOpen size={15} />
                    <span>Odpri podrobnosti</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION H: VIDEO ARCHIVE */}
      {/* ========================================================================= */}
      <section id="video-arhiv" className="py-24 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-[#0A0E15] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#53B8FF] uppercase block mb-3">
              07 · ARHIVSKI POSNETKI
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              VIDEO DOKUMENTACIJA
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              Arhivski posnetki prikazujejo delovanje prototipov, vpeljavo tehnologij in televizijske predstavitve inovacij.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {videoArchives.map((vid) => (
              <div 
                key={vid.id}
                className="rounded-3xl overflow-hidden bg-[#151B24] border border-slate-800 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail frame with play trigger */}
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img 
                      src={vid.image} 
                      alt={vid.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveVideoModal(vid.id)}
                        className="w-14 h-14 rounded-full bg-[#53B8FF] hover:bg-white text-[#080B10] flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer group-hover:scale-110"
                        title="Predvajaj posnetek"
                      >
                        <Play size={22} className="ml-1 fill-[#080B10]" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-[#080B10]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-[#53B8FF]">
                      {vid.year} · {vid.patent}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-[#080B10]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-300">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h4 className="font-display font-black text-base uppercase text-white leading-snug">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {vid.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(vid.id)}
                    className="w-full py-2.5 rounded-xl border border-slate-700 hover:border-[#53B8FF] text-xs font-display font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play size={14} />
                    <span>Predvajaj video arhiv</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION I: FINAL CTA & LEGACY CONNECTION */}
      {/* ========================================================================= */}
      <section className="py-28 px-4 sm:px-6 lg:px-12 border-t border-slate-900 bg-gradient-to-b from-[#080B10] via-[#0D121B] to-[#080B10] relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#53B8FF] uppercase">
            POVEZAVA Z MISIJO START LABA
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-tight leading-[1.05]">
            “VSAKA VELIKA SPREMEMBA SE ZAČNE Z IDEJO.”
          </h2>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Zapuščina inovacij Taseta Lazovskega dokazuje, da lahko iz radovednosti, vztrajnosti in tehničnega znanja zrastejo rešitve, ki spremenijo svet. Prav to poslanstvo uresničujemo v <strong>START LABU</strong>: mladim odpiramo vrata v svet tehnologije, elektronike in praktičnega ustvarjanja.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/delavnice"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(83,184,255,0.4)] flex items-center justify-center gap-3"
            >
              <span>PREGLEJ DELAVNICE START LAB</span>
              <ChevronRight size={18} className="stroke-[3]" />
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#151B24] hover:bg-slate-800 text-white border border-slate-700 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>DOMAČA STRAN START LAB</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PATENT DETAIL MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedPatent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#151B24] border-2 border-[#53B8FF]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6 text-slate-200"
            >
              <button
                type="button"
                onClick={() => setSelectedPatent(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#53B8FF]/20 text-[#53B8FF] font-mono text-xs font-bold inline-block">
                  {selectedPatent.number}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white leading-tight">
                  {selectedPatent.title}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  {selectedPatent.category} · {selectedPatent.jurisdiction}
                </p>
              </div>

              {selectedPatent.recognition && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
                  <Award size={18} />
                  <span>{selectedPatent.recognition}</span>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#53B8FF] font-bold">
                  {selectedPatent.abstractLabel || (isSlovenian ? 'Izvleček izuma (Abstract)' : isIt ? 'Sintesi del brevetto (Abstract)' : 'Patent Abstract')}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {selectedPatent.abstract}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#53B8FF] font-bold">Ključne tehnične značilnosti</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {selectedPatent.keyFeatures.map((kf, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[#53B8FF] shrink-0 mt-0.5" />
                      <span>{kf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedPatent.id === 'esd-static' && (
                <div className="rounded-2xl border border-slate-800 bg-[#0a0f16] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#53B8FF] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={14} />
                      Uradni patentni načrt in shema (Atemm H-ESD / GREEN POINT)
                    </span>
                    <a
                      href={selectedPatent.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-[#53B8FF] flex items-center gap-1 transition-colors"
                    >
                      <span>Odpri PDF</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-800 bg-white/5 p-1">
                    <img 
                      src="/assets/odvod_staticne_elektrike_shema.png" 
                      alt="Odvod statične elektrike od ljudi patentna shema Atemm" 
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800">
                <div className={selectedPatent.id === 'chip-card' ? 'sm:col-span-2' : ''}>
                  {selectedPatent.manufacturer ? (
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-slate-500 block">Proizvajalec:</span>
                        <span className="text-white font-bold">{selectedPatent.manufacturer}</span>
                      </div>
                      {selectedPatent.coordination && (
                        <div>
                          <span className="text-slate-500 block">Koordinacija:</span>
                          <span className="text-white font-bold">{selectedPatent.coordination}</span>
                        </div>
                      )}
                    </div>
                  ) : selectedPatent.id === 'chip-card' ? (
                    <div className="space-y-1.5">
                      <div className="text-slate-300 leading-relaxed font-sans text-xs">
                        Realizacijo uvedbe čip kartic za potrebe javnih telefonskih govorilnic so omogočili <strong className="text-white">Iskra Terminali Kranj</strong> in <strong className="text-white">Impulz d.o.o. Nova Gorica</strong>.
                      </div>
                      <div className="text-[#53B8FF] font-semibold font-sans text-xs">
                        Tase Lazovski je izumitelj pri čip kartici z vidika marketinga.
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-slate-500 block">Izumitelji:</span>
                      <span className="text-white font-bold">{selectedPatent.inventors.join(', ')}</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-slate-500 block">Status:</span>
                  <span className="text-white font-bold">{selectedPatent.status}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {selectedPatent.id === 'us5051109a' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPatent(null);
                      setVitaViewMode('video');
                      setActiveVideoModal('video-vita');
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Play size={15} className="fill-[#080B10]" />
                    <span>Predvajaj video posnetek</span>
                  </button>
                )}
                {selectedPatent.id === 'parking-meter' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPatent(null);
                      setParkingViewMode('video');
                      setActiveVideoModal('video-parking');
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Play size={15} className="fill-[#080B10]" />
                    <span>Predvajaj video posnetek</span>
                  </button>
                )}
                {selectedPatent.id === 'esd-static' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPatent(null);
                      setActiveVideoModal('video-static');
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#53B8FF] hover:bg-[#3ca8f5] text-[#080B10] font-display font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Play size={15} className="fill-[#080B10]" />
                    <span>Predvajaj video posnetek</span>
                  </button>
                )}
                {selectedPatent.pdfUrl && (
                  <a
                    href={selectedPatent.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-[#53B8FF]/15 border border-[#53B8FF]/40 hover:bg-[#53B8FF]/25 text-[#53B8FF] font-display font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText size={15} />
                    <span>Odpri patentni PDF</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPatent(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Zapri pregled
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* VIDEO PLAYER MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#151B24] border-2 border-[#53B8FF]/40 rounded-3xl max-w-4xl w-full p-6 relative shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-[#53B8FF] uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#53B8FF] animate-pulse" />
                  <span>ARHIVSKI POSNETEK · START LAB ZAPUŠČINA</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player */}
              {(() => {
                const vid = videoArchives.find(v => v.id === activeVideoModal);
                return (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-slate-800 shadow-inner">
                      {vid?.videoUrl ? (
                        <video
                          src={vid.videoUrl}
                          poster={vid.image}
                          controls
                          autoPlay
                          playsInline
                          preload="auto"
                          className="w-full h-full object-contain bg-black"
                        >
                          Vaš brskalnik ne podpira predvajanja videa.
                        </video>
                      ) : (
                        <div className="text-center space-y-2 py-8 px-4">
                          <div className="w-16 h-16 rounded-full bg-[#53B8FF]/20 text-[#53B8FF] mx-auto flex items-center justify-center animate-pulse">
                            <Activity size={32} />
                          </div>
                          <h4 className="font-display font-black text-lg text-white uppercase">
                            {vid?.title}
                          </h4>
                          <p className="text-xs text-slate-400 max-w-md mx-auto">
                            Arhivska demonstracija delovanja z izvirnimi komentarji in tehničnimi diagrami izumitelja Tasa Lazovskega.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div>
                        <h4 className="font-display font-black text-base uppercase text-white">
                          {vid?.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
                          {vid?.desc}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-[#53B8FF]">
                        <span className="px-3 py-1 rounded-lg bg-[#53B8FF]/10 border border-[#53B8FF]/30">
                          {vid?.patent}
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300">
                          {vid?.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-display font-bold uppercase cursor-pointer"
                >
                  Zapri predvajalnik
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GAS TIMER LIGHTBOX MODAL */}
      <AnimatePresence>
        {enlargedGasImg && (
          <div 
            onClick={() => setEnlargedGasImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#151B24] border border-[#53B8FF]/40 rounded-3xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between shadow-2xl cursor-default"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="text-[#53B8FF] font-bold">
                  {enlargedGasImg?.includes('staticne')
                    ? 'TEHNIČNA DOKUMENTACIJA · ODVOD STATIČNE ELEKTRIKE OD LJUDI'
                    : enlargedGasImg?.includes('KARTICA') || enlargedGasImg?.includes('Untitled-1')
                    ? 'ARHIVSKA FOTOGRAFIJA · TELEFONSKA ČIP KARTICA'
                    : 'TEHNIČNA DOKUMENTACIJA · ČASOVNIK ZA PLIN'}
                </span>
                <button
                  type="button"
                  onClick={() => setEnlargedGasImg(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative flex-1 flex items-center justify-center overflow-hidden py-4">
                <img 
                  src={enlargedGasImg} 
                  alt="Tehnični načrt povečano" 
                  className="max-h-[70vh] w-auto max-w-full object-contain filter drop-shadow-2xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>
                  {enlargedGasImg?.includes('staticne')
                    ? 'Tase Lazovski, Emil Benko, Angelo Porcaro'
                    : enlargedGasImg?.includes('KARTICA') || enlargedGasImg?.includes('Untitled-1')
                    ? 'Iskra Terminali · Impulz · Tase Lazovski'
                    : 'Tase Lazovski & Emil Benko'}
                </span>
                <button
                  type="button"
                  onClick={() => setEnlargedGasImg(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-display font-bold uppercase cursor-pointer"
                >
                  Zapri
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VITA NEEDLE LIGHTBOX MODAL */}
      <AnimatePresence>
        {enlargedVitaImg && (
          <div 
            onClick={() => setEnlargedVitaImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#151B24] border border-[#53B8FF]/40 rounded-3xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between shadow-2xl cursor-default"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="text-[#53B8FF] font-bold">PATENT US 5,051,109 A · INJEKCIJSKA IGLA VITA</span>
                <button
                  type="button"
                  onClick={() => setEnlargedVitaImg(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative flex-1 flex items-center justify-center overflow-hidden py-4">
                <img 
                  src={enlargedVitaImg} 
                  alt="Injekcijska igla VITA načrt povečano" 
                  className="max-h-[70vh] w-auto max-w-full object-contain filter drop-shadow-2xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Tase Lazovski · EUREKA Bruselj 1993</span>
                <button
                  type="button"
                  onClick={() => setEnlargedVitaImg(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-display font-bold uppercase cursor-pointer"
                >
                  Zapri
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
