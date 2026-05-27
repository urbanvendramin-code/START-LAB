import { LucideIcon, Rocket, Cpu, Gamepad2, Settings, Users, Lightbulb, Zap, Microscope, Boxes, Gauge, GraduationCap, Building2, Calendar, Mail } from 'lucide-react';

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  category: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'kids',
    title: 'Delavnice za otroke',
    description: 'Igrivo odkrivanje znanosti in tehnike skozi poskuse in ustvarjanje.',
    icon: Zap,
    color: 'bg-blue-500'
  },
  {
    id: 'teens',
    title: 'Delavnice za mlade',
    description: 'Poglobljeni programi za razvoj projektov in samozavesti za tehnične poklice.',
    icon: Cpu,
    color: 'bg-purple-500'
  },
  {
    id: 'exhibitions',
    title: 'Interaktivne razstave',
    description: 'Znanost postane vidna, otipljiva in privlačna za vso družino.',
    icon: Microscope,
    color: 'bg-red-600'
  }
];

export const WORKSHOPS = [
  {
    section: "Digitalna proizvodnja & oblikovanje",
    items: [
      { id: '3d-print', title: '3D tisk – od ideje do izdelka', description: 'Spoznajte postopek od 3D modeliranja do končnega izdelka s pomočjo 3D tiskalnikov.', icon: Boxes, image: 'https://res.cloudinary.com/dssxhjk8k/image/upload/v1779883771/hf_20260527_120549_96e1d060-bcc7-499f-ba63-bb4d713252b8_bvs5fx.png' },
      { id: 'laser', title: 'Laserski razrez – od risbe do izdelka', description: 'Naučite se pripraviti načrte za laserski razrez in izdelati unikatne izdelke.', icon: Settings, image: 'https://res.cloudinary.com/dssxhjk8k/image/upload/v1779883684/hf_20260527_120433_b4e537ce-c22d-4d09-80d8-c47d52e8deef_mulnqz.png' },
      { id: '3d-pro', title: 'Profesionalno 3D modeliranje', description: 'Spoznajte napredna orodja za 3D modeliranje in inženirsko načrtovanje.', icon: Microscope, image: 'https://res.cloudinary.com/dssxhjk8k/image/upload/v1779883934/hf_20260527_121036_6dea0fac-1576-4185-ba4a-9cff1cbdb935_zk7urr.png' },
    ]
  },
  {
    section: "Elektronika, programiranje & pametni sistemi",
    items: [
      { id: 'electronics-basic', title: 'Osnove elektronike – DC vezja', description: 'Udeleženci spoznajo osnovne komponente in zakonitosti elektrike ter sestavijo enostavna vezja. Razumejo povezavo med načrtom in delovanjem ter se učijo varnega in logičnega pristopa k elektroniki.', icon: Zap, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80' },
      { id: 'arduino-micro', title: 'Mikrokrmilniki in programiranje (Arduino) – senzorji in aktuatorji', description: 'Udeleženci ustvarijo interaktiven projekt, kjer mikrokrmilnik bere podatke iz senzorjev in upravlja aktuatorje (npr. svetloba, zvok, motorček). Skozi osnovno programiranje spoznajo, kako “pametne” naprave zaznavajo okolje in se nanj odzivajo.', icon: Cpu, image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80' },
      { id: 'smart-home', title: 'Pametne hiše – pametni sistemi v praksi', description: 'Delavnica pokaže, kako delujejo pametne naprave in avtomatizacije ter kako se iz preprostih pravil zgradi uporabna rešitev. Udeleženci razumejo osnovno logiko povezovanja, scenarijev in upravljanja.', icon: Lightbulb, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80' },
      { id: 'mobile-app', title: 'Ustvari svojo mobilno aplikacijo', description: 'Udeleženci iz ideje izdelajo preprosto mobilno aplikacijo in jo preizkusijo v praksi. Spoznajo logiko uporabniškega vmesnika, osnovne funkcije ter izboljševanje aplikacije na podlagi testiranja.', icon: Gamepad2, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80' },
    ]
  },
  {
    section: "Digitalna doživetja, znanost & inovacije",
    items: [
      { id: 'unreal-engine', title: 'Izdelava videoiger (Unreal Engine)', description: 'Udeleženci ustvarijo osnovno 3D okolje, dodajo interaktivnost in razumejo, kako nastajajo sodobne igre. Delavnica poveže ustvarjalnost, logiko in digitalno izdelavo vsebin.', icon: Gamepad2, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80' },
      { id: 'vr-worlds', title: 'VR – virtualna resničnost in interaktivni svetovi', description: 'Udeleženci doživijo virtualna okolja in razumejo, kako VR združuje 3D vsebine, interakcijo in občutek prisotnosti. Delavnica odpre pogled v uporabo VR pri učenju, raziskovanju in ustvarjanju.', icon: Rocket, image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80' },
      { id: 'physics-exp', title: 'Fizikalni poskusi – znanost v praksi', description: 'S kratkimi eksperimenti udeleženci opazujejo pojave, postavljajo razlage in preverjajo svoje domneve. Delavnica krepi znanstveni način razmišljanja in pokaže, da je fizika razumljiva skozi prakso.', icon: Microscope, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80' },
      { id: 'disassemble-create', title: 'Razstavi in ustvari – kreativna tehnika', description: 'Udeleženci razstavijo stare naprave, prepoznajo osnovne dele in razumejo njihovo vlogo. Nato iz elementov ustvarijo nove, domiselne “izume” ter povežejo tehniko z ustvarjalnostjo in pripovedjo.', icon: Settings, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80' },
    ]
  },
  {
    section: "Od ideje do rešitve",
    items: [
      { id: 'long-term-project', title: 'Dolgoročna projektna delavnica – od ideje do rešitve', description: 'Ekipe razvijajo projekt skozi več korakov: zasnova, prototip, testiranje in izboljšave. Program spodbuja vztrajnost, sodelovanje in ponos na rezultat, ki ga udeleženci tudi predstavijo.', icon: Rocket, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80' },
      { id: 'hackathon-eco', title: 'Čezmejni trajnostni hackathon', description: 'Intenziven ekipni dogodek, kjer mladi rešujejo realne izzive in predstavijo svoje ideje v kratki, prepričljivi obliki. Poudarek je na inovativnosti, sodelovanju in iskanju rešitev, ki imajo učinek v praksi.', icon: Users, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80' },
      { id: 'graphene-transistor', title: 'Izdelave grafenskega tranzistorja', description: 'Univerza v Novi Gorici – Laboratorij za fiziko organski snovi. Praktična delavnica, na kateri udeleženci izdelajo grafenski tranzistor ter skozi voden proces spoznajo osnove polprevodnikov, načrtovanja, izdelave in električnih meritev.', icon: Zap, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80' },
    ]
  }
];

export const LAB_EQUIPMENT = [
  "Laserski rezalnik",
  "3D tiskalniki",
  "Namizni in ročni vrtalni stroji",
  "Osciloskop",
  "Digitalni mikroskop",
  "Oprema za virtualno resničnost (VR)",
  "Naprave za fizikalne eksperimente",
  "10 delovnih postaj z merilno opremo"
];
