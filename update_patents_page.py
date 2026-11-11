import re

with open('src/pages/PatentsPage.tsx', 'r') as f:
    content = f.read()

# 1. Museum exhibit label in Hero
content = content.replace(
    'START LAB · ZAPUŠČINA INOVACIJ',
    "{isSlovenian ? 'START LAB · ZAPUŠČINA INOVACIJ' : isIt ? 'START LAB · EREDITÀ DI INNOVAZIONI' : 'START LAB · INNOVATION LEGACY'}"
)

# 2. Hero inventor badge
content = content.replace(
    '<span>IZUMITELJ</span>',
    '<span>{ui.hero.role}</span>'
)

# 3. Hero slogan
content = content.replace(
    '“Ideje, ki postanejo del sveta.”',
    '{ui.hero.slogan}'
)

# 4. Hero editorial overview
content = re.sub(
    r'\{isSlovenian\s*\?\s*"Spoznajte izumiteljski opus.*?: "Discover the technological legacy.*?\}',
    '{ui.hero.overview}',
    content,
    flags=re.DOTALL
)

# 5. Hero metrics
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">Patent ZDA</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">{ui.hero.metrics.patentUs}</div>'
)
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">Bruselj 1993</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">{ui.hero.metrics.brussels}</div>'
)
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">14. junij 1995</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">{ui.hero.metrics.cardsDate}</div>'
)
content = content.replace(
    '<div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">Čip kartice</div>',
    '<div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">{ui.hero.metrics.cards}</div>'
)
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">Nova Gorica 1999</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase tracking-wider">{ui.hero.metrics.parkingDate}</div>'
)
content = content.replace(
    '<div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">Parkomati</div>',
    '<div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">{ui.hero.metrics.parking}</div>'
)

# 6. Hero CTAs
content = content.replace(
    '<span>RAZIŠČI IZUME</span>',
    '<span>{ui.hero.ctaExplore}</span>'
)
content = content.replace(
    '<span>ČASOVNICA</span>',
    '<span>{ui.hero.ctaTimeline}</span>'
)
content = content.replace(
    '<span>REGISTER PATENTOV</span>',
    '<span>{ui.hero.ctaRegistry}</span>'
)

# 7. Hero Placard
content = content.replace(
    'ARHIVSKI EKSPONAT · REF. TL-ARCH-01',
    '{ui.hero.placardRef}'
)
content = content.replace(
    'SLOVENIJA / MEDNARODNO',
    '{ui.hero.placardRegion}'
)
content = content.replace(
    '<h3 className="font-display font-black text-sm sm:text-base uppercase text-white tracking-wide">
                  Tehnični načrti, patenti in prototipi
                </h3>',
    '<h3 className="font-display font-black text-sm sm:text-base uppercase text-white tracking-wide">
                  {ui.hero.placardTitle}
                </h3>'
)
content = content.replace(
    'Zbirka originalne tehnične dokumentacije, prototipov varovalnih sistemov in industrijskih aplikacij izumitelja Tasa Lazovskega.',
    '{ui.hero.placardDesc}'
)
content = content.replace(
    '<span>Pristni arhivski viri</span>',
    '<span>{ui.hero.placardBadge}</span>'
)

# 8. Story Section 01
content = content.replace(
    '01 · DOKUMENTARNI PREGLED',
    '{ui.story.tag}'
)
content = content.replace(
    'ČLOVEK, KI JE REŠEVAL <br />
              <span className="text-[#53B8FF]">RESNIČNE IZZIVE</span>',
    '{ui.story.titlePart1} <br />
              <span className="text-[#53B8FF]">{ui.story.titlePart2}</span>'
)
content = content.replace(
    '“Vsak izum se rodi iz natančnega opazovanja: kje se ljudje soočajo z nevarnostjo, neučinkovitostjo ali zapleti, ki jih je mogoče rešiti z eleganco inženirskega mehanizma.”',
    '{ui.story.quote}'
)
content = re.sub(
    r'<p>\s*Tase Lazovski sodi med slovenske izumitelje.*?industrijske proizvodnje\.\s*</p>',
    '<p>
                {ui.story.p1}
              </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*Ko je svet v zgodnjih devetdesetih letih.*?EUREKA 1993 v Bruslju\.\s*</p>',
    '<p>
                {ui.story.p2}
              </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*Ob prehodu v digitalno dobo je sodeloval.*?gsm telefonom\.\s*</p>',
    '<p>
                {ui.story.p3}
              </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p className="text-slate-400 italic text-sm">\s*V tej predstavitvi je predstavljeno le del svetovnih patentov Taseta Lazovskega\.\s*</p>',
    '<p className="text-slate-400 italic text-sm">
                {ui.story.p4}
              </p>',
    content,
    flags=re.DOTALL
)

# Story Awards Box
content = content.replace(
    '<h4 className="font-display font-black text-sm uppercase text-white">Ključna priznanja in institucije</h4>',
    '<h4 className="font-display font-black text-sm uppercase text-white">{ui.story.awardsBoxTitle}</h4>'
)
content = content.replace(
    '<p className="text-xs text-slate-400">Verificirani arhivski viri</p>',
    '<p className="text-xs text-slate-400">{ui.story.awardsBoxSub}</p>'
)
content = content.replace(
    'Patent US 5,051,109 A podeljen 24. 9. 1991 za Safety hypodermic needle assembly.',
    '{ui.story.awardsUspto}'
)
content = content.replace(
    'Médaille d’Or (Salon International des Inventions).',
    '{ui.story.awardsEureka}'
)
content = content.replace(
    '14. junij 1995 – uradni zagon telefonskih čip kartic v RS.',
    '{ui.story.awardsIskra}'
)
content = content.replace(
    '1999 – vpeljava prvih sodobnih univerzalnih parkomatov.',
    '{ui.story.awardsNg}'
)
content = content.replace(
    'Razvoj in patentna zaščita plinskih varnostnih časovnikov.',
    '{ui.story.awardsAtemm}'
)
content = content.replace(
    'Opomba arhiva: Prikazani so izključno preverjeni zgodovinski podatki iz izvirne patentne in tehnične dokumentacije.',
    "{isSlovenian ? 'Opomba arhiva: Prikazani so izključno preverjeni zgodovinski podatki iz izvirne patentne in tehnične dokumentacije.' : isIt ? 'Nota d\'archivio: Vengono mostrati esclusivamente dati storici verificati tratti dalla documentazione tecnica e brevettuale originale.' : 'Archival note: Displaying exclusively verified historical records from original patent and engineering filings.'}"
)

# 9. Timeline Section 02
content = content.replace(
    '02 · KRONOLOGIJA PREBOJEV',
    '{ui.timeline.tag}'
)
content = content.replace(
    'INTERAKTIVNA ČASOVNICA',
    '{ui.timeline.title}'
)
content = content.replace(
    'Izberite posamezni mejnik za hiter skok na podrobnosti o izumu in tehnični dokumentaciji.',
    '{ui.timeline.desc}'
)
content = content.replace(
    '<span>Skoči na predstavitev izuma</span>',
    '<span>{ui.timeline.jumpBtn}</span>'
)
content = content.replace(
    '<span className="text-xs font-mono text-[#53B8FF] uppercase">LETO</span>',
    '<span className="text-xs font-mono text-[#53B8FF] uppercase">{isSlovenian ? 'LETO' : isIt ? 'ANNO' : 'YEAR'}</span>'
)

# 10. Featured Inventions Section 03
content = content.replace(
    '03 · ŠTIRI GLAVNE INOVACIJE',
    '{ui.featured.tag}'
)
content = content.replace(
    'IZUMI, KI SO PUSTILI PEČAT',
    '{ui.featured.title}'
)
content = content.replace(
    'Vsak izum predstavlja samosvoj inženirski odgovor na ključne družbene, medicinske in urbane izzive svojega časa.',
    '{ui.featured.desc}'
)

# VITA Needle
content = content.replace(
    '<span>Video posnetek</span>',
    '<span>{isSlovenian ? 'Video posnetek' : isIt ? 'Filmato video' : 'Video Footage'}</span>'
)
content = content.replace(
    '<span>Patentne skice ({vitaImages.length})</span>',
    '<span>{isSlovenian ? 'Patentne skice' : isIt ? 'Bozzetti brevettuali' : 'Patent Drawings'} ({vitaImages.length})</span>'
)
content = content.replace(
    'title="Prejšnja skica"',
    'title={isSlovenian ? "Prejšnja skica" : isIt ? "Bozzetto precedente" : "Previous drawing"}'
)
content = content.replace(
    'title="Naslednja skica"',
    'title={isSlovenian ? "Naslednja skica" : isIt ? "Bozzetto successivo" : "Next drawing"}'
)
content = content.replace(
    'title="Povečaj sliko"',
    'title={isSlovenian ? "Povečaj sliko" : isIt ? "Ingrandisci immagine" : "Enlarge image"}'
)
content = content.replace(
    '<span>Povečaj</span>',
    '<span>{ui.featured.gas.zoom}</span>'
)
content = content.replace(
    '· Izvirni video arhiv',
    '· {isSlovenian ? 'Izvirni video arhiv' : isIt ? 'Archivio video originale' : 'Original video archive'}'
)
content = content.replace(
    'title="Odpri v velikem predvajalniku"',
    'title={isSlovenian ? "Odpri v velikem predvajalniku" : isIt ? "Apri nel player a schermo intero" : "Open in fullscreen player"}'
)
content = content.replace(
    '<span>Celozaslonski način</span>',
    '<span>{isSlovenian ? 'Celozaslonski način' : isIt ? 'Schermo intero' : 'Fullscreen mode'}</span>'
)
content = content.replace(
    'Skica 0{idx + 1}',
    "{isSlovenian ? 'Skica' : isIt ? 'Bozzetto' : 'Drawing'} 0{idx + 1}"
)
content = content.replace(
    '<span>MEDICINSKA INOVACIJA 01</span>',
    '<span>{ui.featured.vita.tag}</span>'
)
content = content.replace(
    'INJEKCIJSKA IGLA <span className="text-[#53B8FF]">VITA</span>',
    '{ui.featured.vita.title}'
)
content = re.sub(
    r'<p>\s*<strong>Problem:</strong>\s*V zdravstvu so naključni vbodi.*?</p>',
    '<p>
                  <strong>{ui.featured.vita.problemLabel}</strong> {ui.featured.vita.problemText}
                </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*<strong>Rešitev Tasa Lazovskega:</strong>\s*Vzmetni cilindrični zaščitni mehanizem.*?</p>',
    '<p>
                  <strong>{ui.featured.vita.solutionLabel}</strong> {ui.featured.vita.solutionText}
                </p>',
    content,
    flags=re.DOTALL
)
content = content.replace(
    '<div className="text-xs font-mono font-bold text-[#53B8FF] uppercase">Patent & Priznanje:</div>',
    '<div className="text-xs font-mono font-bold text-[#53B8FF] uppercase">{ui.featured.vita.patentLabel}</div>'
)
content = re.sub(
    r'<div className="text-xs sm:text-sm text-slate-300">\s*Patent <strong>US 5,051,109 A</strong>.*?</div',
    '<div className="text-xs sm:text-sm text-slate-300">
                  {ui.featured.vita.patentText}
                </div',
    content,
    flags=re.DOTALL
)
content = content.replace(
    '<span>Predvajaj video posnetek</span>',
    '<span>{isSlovenian ? 'Predvajaj video posnetek' : isIt ? 'Riproduci video' : 'Play video footage'}</span>'
)
content = content.replace(
    '<span>Ogled patenta US5051109A</span>',
    '<span>{ui.featured.vita.btnRegistry}</span>'
)
content = content.replace(
    '<span>Kako deluje mehanizem</span>',
    '<span>{isSlovenian ? 'Kako deluje mehanizem' : isIt ? 'Come funziona il meccanismo' : 'How the mechanism works'}</span>'
)

# Parking Meter
content = content.replace(
    '<span>URBANA AVTOMATIZACIJA 02</span>',
    '<span>{ui.featured.parking.tag}</span>'
)
content = content.replace(
    'UNIVERZALNI <span className="text-[#53B8FF]">PARKIRNI AVTOMAT</span>',
    '{ui.featured.parking.title}'
)
content = re.sub(
    r'<p>\s*<strong>Zgodba:</strong>\s*Konec devetdesetih let so mesta iskala.*?</p>',
    '<p>
                  <strong>{ui.featured.parking.storyLabel}</strong> {ui.featured.parking.storyText}
                </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*<strong>Izum Taseta Lazovskega:</strong>\s*Avtomatizirani parkirni terminal.*?</p>',
    '<p>
                  <strong>{ui.featured.parking.invLabel}</strong> {ui.featured.parking.invText}
                </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*Leta <strong>1999</strong> so bili prvi takšni avtomati vpeljani.*?</p>',
    '<p>
                  {ui.featured.parking.deployText}
                </p>',
    content,
    flags=re.DOTALL
)
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">Napajanje</div>
                  <div className="font-bold text-white text-xs mt-1">Fotovoltaični solarni modul</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">{ui.featured.parking.powerLabel}</div>
                  <div className="font-bold text-white text-xs mt-1">{ui.featured.parking.powerVal}</div>'
)
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">Plačilni vmesnik</div>
                  <div className="font-bold text-white text-xs mt-1">Kovanci + čip kartice</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">{ui.featured.parking.payLabel}</div>
                  <div className="font-bold text-white text-xs mt-1">{ui.featured.parking.payVal}</div>'
)
content = content.replace(
    '<span>Tehnične specifikacije</span>',
    '<span>{isSlovenian ? 'Tehnične specifikacije' : isIt ? 'Specifiche tecniche' : 'Technical specifications'}</span>'
)
content = content.replace(
    '<span>Fotografija</span>',
    '<span>{isSlovenian ? 'Fotografija' : isIt ? 'Fotografia' : 'Photograph'}</span>'
)
content = content.replace(
    'Prva uvedba parkirnega avtomata v Novi Gorici',
    '{isSlovenian ? 'Prva uvedba parkirnega avtomata v Novi Gorici' : isIt ? 'Prima installazione di parcometri a Nova Gorica' : 'First deployment of parking kiosks in Nova Gorica'}'
)
content = content.replace(
    '· Arhivski posnetek',
    '· {isSlovenian ? 'Arhivski posnetek' : isIt ? 'Filmato d\'archivio' : 'Archival footage'}'
)

# Chip Card
content = content.replace(
    '14. JUNIJ 1995 · SLOVENIJA',
    '{isSlovenian ? '14. JUNIJ 1995 · SLOVENIJA' : isIt ? '14 GIUGNO 1995 · SLOVENIA' : '14 JUNE 1995 · SLOVENIA'}'
)
content = content.replace(
    'Fotografiji ({cardImages.length})',
    '{isSlovenian ? 'Fotografiji' : isIt ? 'Fotografie' : 'Photographs'} ({cardImages.length})'
)
content = content.replace(
    'Fotografija 0{idx + 1}',
    "{isSlovenian ? 'Fotografija' : isIt ? 'Fotografia' : 'Photo'} 0{idx + 1}"
)
content = content.replace(
    '<span>TELEKOMUNIKACIJE 03</span>',
    '<span>{ui.featured.card.tag}</span>'
)
content = content.replace(
    'TELEFONSKA <span className="text-[#53B8FF]">ČIP KARTICA</span>',
    '{ui.featured.card.title}'
)
content = re.sub(
    r'<p>\s*<strong>Prehod z žetonov:</strong>\s*Do sredine devetdesetih let so javne govorilnice delovale.*?</p>',
    '<p>
                  <strong>{ui.featured.card.tokensLabel}</strong> {ui.featured.card.tokensText}
                </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*<strong>Zgodovinski 14\. junij 1995:</strong>\s*V sodelovanju s podjetjem.*?</p>',
    '<p>
                  <strong>{ui.featured.card.launchLabel}</strong> {ui.featured.card.launchText}
                </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*Kartica je omogočala zanesljivo elektronsko odštevanje impulzov.*?</p>',
    '<p>
                  {ui.featured.card.pText}
                </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<div className="text-slate-300 leading-relaxed">\s*Realizacijo uvedbe čip kartic.*?</div',
    '<div className="text-slate-300 leading-relaxed">
                  {ui.featured.card.attribution1}
                </div',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<div className="text-\[#53B8FF\] font-semibold">\s*Tase Lazovski je izumitelj pri čip kartici z vidika marketinga\.\s*</div',
    '<div className="text-[#53B8FF] font-semibold">
                  {ui.featured.card.attribution2}
                </div',
    content,
    flags=re.DOTALL
)
content = content.replace(
    '<span>Podrobnosti sistema čip kartice</span>',
    '<span>{isSlovenian ? 'Podrobnosti sistema čip kartice' : isIt ? 'Dettagli del sistema carta chip' : 'Chip card system details'}</span>'
)

# Gas Stove Timer
content = content.replace(
    '<span>VARNOSTNI INŽENIRING 04</span>',
    '<span>{ui.featured.gas.tag}</span>'
)
content = content.replace(
    'ČASOVNIK ZA <span className="text-[#53B8FF]">PLINSKE ŠTEDILNIKE</span>',
    '{ui.featured.gas.title}'
)
content = re.sub(
    r'<p>\s*<strong>Gospodinjska nevarnost:</strong>\s*Pozabljen prižgan plinski gorilnik.*?</p>',
    '<p>
                  <strong>{ui.featured.gas.hazardLabel}</strong> {ui.featured.gas.hazardText}
                </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*<strong>Sodelovanje Taseta Lazovskega:</strong>\s*Razvil je elektromehanski varnostni ventil.*?</p>',
    "<p>
                  <strong>{isSlovenian ? 'Sodelovanje Taseta Lazovskega:' : isIt ? 'Collaborazione di Tase Lazovski:' : 'Collaboration of Tase Lazovski:'}</strong> {isSlovenian ? 'Razvil je elektromehanski varnostni ventil s časovnikom. Pred prižigom uporabnik nastavi želeni čas delovanja. Ko čas poteče, ventil avtomatsko in hipoma nepredušno zapre dovod plina do gorilnika.' : isIt ? 'Ha sviluppato una valvola di sicurezza elettromeccanica con timer. Prima dell\'accensione l\'utente imposta il tempo di funzionamento desiderato. Allo scadere del tempo, la valvola interrompe automaticamente e istantaneamente l\'erogazione del gas al bruciatore in modo ermetico.' : 'He developed an electromechanical safety valve with timer. Prior to ignition, the user presets the desired operating duration. Once time elapses, the valve automatically and instantly seals off the gas supply to the burner.'}
                </p>",
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*Inovacija deluje samostojno, kar zagotavlja visoko varnostno zanesljivost\.\s*</p>',
    "<p>
                  {isSlovenian ? 'Inovacija deluje samostojno, kar zagotavlja visoko varnostno zanesljivost.' : isIt ? 'L\'innovazione funziona in modo autonomo, garantendo un\'elevata affidabilità di sicurezza.' : 'The innovation operates autonomously, ensuring supreme fail-safe reliability.'}
                </p>",
    content,
    flags=re.DOTALL
)
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">Avtorja izuma</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">{isSlovenian ? 'Avtorja izuma' : isIt ? 'Autori dell\'invenzione' : 'Invention Authors'}</div>'
)
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">Varnostni odziv</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">{isSlovenian ? 'Varnostni odziv' : isIt ? 'Risposta di sicurezza' : 'Safety response'}</div>'
)
content = content.replace(
    '<div className="font-bold text-white text-xs mt-1">&lt; 0.2 s zapora plina</div>',
    '<div className="font-bold text-white text-xs mt-1">{isSlovenian ? '< 0.2 s zapora plina' : isIt ? '< 0.2 s arresto gas' : '< 0.2 s gas shutoff'}</div>'
)
content = content.replace(
    '<span>Tehnična dokumentacija plinskega ventila</span>',
    '<span>{ui.featured.gas.docTitle}</span>'
)
content = content.replace(
    'Slika 0{idx + 1}',
    "{isSlovenian ? 'Slika' : isIt ? 'Immagine' : 'Image'} 0{idx + 1}"
)

# Static Electricity
content = content.replace(
    '<span>ELEKTROSTATIKA & VARNOST 05</span>',
    '<span>{isSlovenian ? 'ELEKTROSTATIKA & VARNOST 05' : isIt ? 'ELETTROSTATICA & SICUREZZA 05' : 'ELECTROSTATICS & SAFETY 05'}</span>'
)
content = content.replace(
    'ODVOD STATIČNE <span className="text-[#53B8FF]">ELEKTRIKE OD LJUDI</span>',
    '{ui.featured.staticEsd.title}'
)
content = re.sub(
    r'<p>\s*<strong>Problem statične elektrike:</strong>\s*V določenih atmosferskih pogojih.*?</p>',
    '<p>
                  <strong>{ui.featured.staticEsd.problemLabel}</strong> {ui.featured.staticEsd.problemText}
                </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*<strong>Patentirana rešitev \(EP 2805592 / US 959672\):</strong>\s*Izumitelji.*?</p>',
    '<p>
                  <strong>{ui.featured.staticEsd.solutionLabel}</strong> {ui.featured.staticEsd.solutionText}
                </p>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p>\s*Inovativne rešitve so uveljavljene v komercialnih izdelkih.*?</p>',
    '<p>
                  {ui.featured.staticEsd.commercialText}
                </p>',
    content,
    flags=re.DOTALL
)
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">Čas odvoda</div>
                  <div className="font-bold text-white text-xs mt-1">150 – 250 ms (neboleče)</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">{ui.featured.staticEsd.stats.time}</div>
                  <div className="font-bold text-white text-xs mt-1">{isSlovenian ? '150 – 250 ms (neboleče)' : isIt ? '150 – 250 ms (indolore)' : '150 – 250 ms (painless)'}</div>'
)
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">Napetostni razpon</div>
                  <div className="font-bold text-white text-xs mt-1">Do 25 kV zaščita</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">{ui.featured.staticEsd.stats.voltage}</div>
                  <div className="font-bold text-white text-xs mt-1">{ui.featured.staticEsd.stats.voltageVal}</div>'
)
content = content.replace(
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">Patenta</div>',
    '<div className="text-[10px] font-mono text-[#53B8FF] uppercase">{isSlovenian ? 'Patenta' : isIt ? 'Brevetti' : 'Patents'}</div>'
)
content = content.replace(
    '<span>Odpri patentni dokument (PDF)</span>',
    '<span>{isSlovenian ? 'Odpri patentni dokument (PDF)' : isIt ? 'Apri documento brevettuale (PDF)' : 'Open patent document (PDF)'}</span>'
)
content = content.replace(
    '<span>Specifikacije izuma</span>',
    '<span>{isSlovenian ? 'Specifikacije izuma' : isIt ? 'Specifiche dell\'invenzione' : 'Invention specifications'}</span>'
)
content = content.replace(
    'Uradna patentna dokumentacija',
    '{isSlovenian ? 'Uradna patentna dokumentacija' : isIt ? 'Documentazione brevettuale ufficiale' : 'Official patent documentation'}'
)
content = content.replace(
    '<span>Povečaj načrt</span>',
    '<span>{isSlovenian ? 'Povečaj načrt' : isIt ? 'Ingrandisci schema' : 'Zoom schematic'}</span>'
)
content = content.replace(
    'Vgradnja v varnostni pas vozil & računalniško opremo',
    '{isSlovenian ? 'Vgradnja v varnostni pas vozil & računalniško opremo' : isIt ? 'Integrazione nella cintura di sicurezza di veicoli & apparecchiature informatiche' : 'Integration into vehicle seatbelts & computer equipment'}'
)
content = content.replace(
    '<span>Celoten PDF</span>',
    '<span>{isSlovenian ? 'Celoten PDF' : isIt ? 'PDF completo' : 'Full PDF'}</span>'
)

# 11. Explainer Section 04
content = content.replace(
    '04 · INTERAKTIVNA MEHANIKA',
    '{ui.explainer.tag}'
)
content = content.replace(
    'KAKO DELUJEJO IZUMI',
    '{ui.explainer.title}'
)
content = content.replace(
    'Izberite tehnologijo za razstavljen pogled na komponente, korake delovanja in mehaniko delovanja.',
    '{ui.explainer.desc}'
)
content = re.sub(
    r'\{\s*id:\s*'vita' as const,\s*label:\s*isSlovenian \? 'Igla VITA \(US5051109A\)' : 'VITA Needle'\s*\},',
    "{ id: 'vita' as const, label: ui.explainer.tabs.vita },",
    content
)
content = re.sub(
    r'\{\s*id:\s*'parking' as const,\s*label:\s*isSlovenian \? 'Parkomat Nova Gorica 1999' : 'Parking Meter'\s*\},',
    "{ id: 'parking' as const, label: ui.explainer.tabs.parking },",
    content
)
content = re.sub(
    r'\{\s*id:\s*'card' as const,\s*label:\s*isSlovenian \? 'Čip kartica Iskra 1995' : 'Chip Card'\s*\},',
    "{ id: 'card' as const, label: ui.explainer.tabs.card },",
    content
)
content = re.sub(
    r'\{\s*id:\s*'gas' as const,\s*label:\s*isSlovenian \? 'Plinski ventil \(Benko & Lazovski\)' : 'Gas Valve'\s*\},',
    "{ id: 'gas' as const, label: ui.explainer.tabs.gas },",
    content
)

# 12. Additional Inventions Section 05
content = content.replace(
    '05 · OSTALI DOKUMENTIRANI IZUMI',
    '{ui.additional.tag}'
)
content = content.replace(
    'ŠIRŠI IZUMITELJSKI OPUS',
    '{ui.additional.title}'
)
content = content.replace(
    'Pregled ostalih patentov, modelov in razvojnih pobud Tasa Lazovskega s področij industrijske varnosti, športa in uporabnega oblikovanja.',
    '{ui.additional.desc}'
)
content = content.replace(
    '<span>Arhivski vir Start Lab</span>',
    '<span>{isSlovenian ? 'Arhivski vir Start Lab' : isIt ? 'Fonte d\'archivio Start Lab' : 'Start Lab archival source'}</span>'
)
content = content.replace(
    '<span className="text-[#53B8FF]">Dokumentirano</span>',
    '<span className="text-[#53B8FF]">{isSlovenian ? 'Dokumentirano' : isIt ? 'Documentato' : 'Documented'}</span>'
)

# 13. Registry Section 06
content = content.replace(
    '06 · DOKUMENTACIJA & REGISTER',
    '{ui.registry.tag}'
)
content = content.replace(
    'PATENTI IN MEDNARODNA PRIZNANJA',
    '{ui.registry.title}'
)
content = content.replace(
    'Strogo preverjeni podatki o patentnih številkah, uradih, datumih podelitve in doseženih priznanjih.',
    '{ui.registry.desc}'
)
content = content.replace(
    '<div>Proizvajalec: {patent.manufacturer}</div>',
    '<div>{isSlovenian ? 'Proizvajalec' : isIt ? 'Produttore' : 'Manufacturer'}: {patent.manufacturer}</div>'
)
content = content.replace(
    '<div className="text-slate-400">Koordinacija: {patent.coordination}</div>',
    '<div className="text-slate-400">{isSlovenian ? 'Koordinacija' : isIt ? 'Coordinamento' : 'Coordination'}: {patent.coordination}</div>'
)
content = content.replace(
    '<div>Izumitelj: {patent.inventors.join(", ")}</div>',
    '<div>{isSlovenian ? 'Izumitelj' : isIt ? 'Inventore' : 'Inventor'}: {patent.inventors.join(", ")}</div>'
)
content = content.replace(
    '<span>Odpri podrobnosti</span>',
    '<span>{ui.registry.btnDetails}</span>'
)

# 14. Video Archive Section 07
content = content.replace(
    '07 · ARHIVSKI POSNETKI',
    '{ui.video.tag}'
)
content = content.replace(
    'VIDEO DOKUMENTACIJA',
    '{ui.video.title}'
)
content = content.replace(
    'Arhivski posnetki prikazujejo delovanje prototipov, vpeljavo tehnologij in televizijske predstavitve inovacij.',
    '{ui.video.desc}'
)
content = content.replace(
    '<span>Predvajaj video arhiv</span>',
    '<span>{ui.video.playBtn}</span>'
)

# 15. Final CTA
content = content.replace(
    'POVEZAVA Z MISIJO START LABA',
    '{isSlovenian ? 'POVEZAVA Z MISIJO START LABA' : isIt ? 'COLLEGAMENTO CON LA MISSIONE DI START LAB' : 'CONNECTION TO THE START LAB MISSION'}'
)
content = content.replace(
    '“VSAKA VELIKA SPREMEMBA SE ZAČNE Z IDEJO.”',
    '{ui.cta.heading}'
)
content = re.sub(
    r'<p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">\s*Zapuščina inovacij Taseta Lazovskega dokazuje.*?</p>',
    '<p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            {ui.cta.text}
          </p>',
    content,
    flags=re.DOTALL
)
content = content.replace(
    '<span>PREGLEJ DELAVNICE START LAB</span>',
    '<span>{ui.cta.btnWorkshops}</span>'
)
content = content.replace(
    '<span>DOMAČA STRAN START LAB</span>',
    '<span>{ui.cta.btnHome}</span>'
)

# 16. Modals
content = content.replace(
    '<h4 className="text-xs font-mono uppercase tracking-wider text-[#53B8FF] font-bold">Ključne tehnične značilnosti</h4>',
    '<h4 className="text-xs font-mono uppercase tracking-wider text-[#53B8FF] font-bold">{ui.modal.tabFeatures}</h4>'
)
content = content.replace(
    'Uradni patentni načrt in shema (Atemm H-ESD / GREEN POINT)',
    '{isSlovenian ? 'Uradni patentni načrt in shema (Atemm H-ESD / GREEN POINT)' : isIt ? 'Schema e progetto brevettuale ufficiale (Atemm H-ESD / GREEN POINT)' : 'Official patent schematic (Atemm H-ESD / GREEN POINT)'}'
)
content = content.replace(
    '<span className="text-slate-500 block">Proizvajalec:</span>',
    '<span className="text-slate-500 block">{ui.modal.manufacturerLabel}:</span>'
)
content = content.replace(
    '<span className="text-slate-500 block">Koordinacija:</span>',
    '<span className="text-slate-500 block">{ui.modal.coordinationLabel}:</span>'
)
content = content.replace(
    '<span className="text-slate-500 block">Izumitelji:</span>',
    '<span className="text-slate-500 block">{isSlovenian ? 'Izumitelji:' : isIt ? 'Inventori:' : 'Inventors:'}</span>'
)
content = content.replace(
    '<span className="text-slate-500 block">Status:</span>',
    '<span className="text-slate-500 block">{ui.modal.statusLabel}:</span>'
)
content = content.replace(
    '<span>Odpri patentni PDF</span>',
    '<span>{isSlovenian ? 'Odpri patentni PDF' : isIt ? 'Apri PDF del brevetto' : 'Open patent PDF'}</span>'
)
content = content.replace(
    'Zapri pregled',
    '{ui.modal.closeBtn}'
)
content = content.replace(
    'ARHIVSKI POSNETEK · START LAB ZAPUŠČINA',
    '{isSlovenian ? 'ARHIVSKI POSNETEK · START LAB ZAPUŠČINA' : isIt ? 'FILMATO D\'ARCHIVIO · EREDITÀ START LAB' : 'ARCHIVAL RECORDING · START LAB LEGACY'}'
)
content = content.replace(
    'Arhivska demonstracija delovanja z izvirnimi komentarji in tehničnimi diagrami izumitelja Tasa Lazovskega.',
    '{isSlovenian ? 'Arhivska demonstracija delovanja z izvirnimi komentarji in tehničnimi diagrami izumitelja Tasa Lazovskega.' : isIt ? 'Dimostrazione d\'archivio del funzionamento con commenti originali e schemi tecnici dell\'inventore Tase Lazovski.' : 'Archival operation demonstration with original commentary and technical schematics by inventor Tase Lazovski.'}'
)
content = content.replace(
    'Zapri predvajalnik',
    '{ui.modal.closeBtn}'
)
content = content.replace(
    'TEHNIČNA DOKUMENTACIJA · ODVOD STATIČNE ELEKTRIKE OD LJUDI',
    '{isSlovenian ? 'TEHNIČNA DOKUMENTACIJA · ODVOD STATIČNE ELEKTRIKE OD LJUDI' : isIt ? 'DOCUMENTAZIONE TECNICA · SCARICA ELETTROSTATICA DA PERSONE' : 'TECHNICAL BLUEPRINT · CONTROLLED STATIC ELECTRICITY DISCHARGE'}'
)
content = content.replace(
    'ARHIVSKA FOTOGRAFIJA · TELEFONSKA ČIP KARTICA',
    '{isSlovenian ? 'ARHIVSKA FOTOGRAFIJA · TELEFONSKA ČIP KARTICA' : isIt ? 'FOTOGRAFIA D\'ARCHIVIO · SCHEDA TELEFONICA CON CHIP' : 'ARCHIVAL PHOTOGRAPH · SMART TELEPHONE CHIP CARD'}'
)
content = content.replace(
    'TEHNIČNA DOKUMENTACIJA · ČASOVNIK ZA PLIN',
    '{isSlovenian ? 'TEHNIČNA DOKUMENTACIJA · ČASOVNIK ZA PLIN' : isIt ? 'DOCUMENTAZIONE TECNICA · TIMER PER GAS' : 'TECHNICAL BLUEPRINT · GAS STOVE SAFETY TIMER'}'
)
content = content.replace(
    'PATENT US 5,051,109 A · INJEKCIJSKA IGLA VITA',
    '{isSlovenian ? 'PATENT US 5,051,109 A · INJEKCIJSKA IGLA VITA' : isIt ? 'BREVETTO US 5,051,109 A · AGO PER INIEZIONE VITA' : 'PATENT US 5,051,109 A · VITA SAFETY NEEDLE'}'
)

with open('src/pages/PatentsPage.tsx', 'w') as f:
    f.write(content)
print('Updated PatentsPage.tsx successfully!')
