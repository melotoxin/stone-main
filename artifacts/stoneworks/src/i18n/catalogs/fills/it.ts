import type { PartialCatalog } from '../fallback';

const IT_NUMBER_WORDS: Record<number, string> = {
  2: 'due',
  3: 'tre',
  4: 'quattro',
  5: 'cinque',
  6: 'sei',
  7: 'sette',
  8: 'otto',
  9: 'nove',
  10: 'dieci',
};

/** Translations for catalogue fields the main it catalogue did not cover. */
export const itFill: PartialCatalog = {
  seo: {
    pages: {
      about: {
        title: 'Chi siamo — St Werkz, Karachi',
        description:
          'St Werkz è uno studio di pietra a Karachi. Pietra scelta in quantità, lavorata pezzo per pezzo — artigianato per la casa, progetti per architetti e interior designer, esportazione all’ingrosso. Studio a Karachi; uffici a New York, Barcellona, Kuala Lumpur e Dubai.',
      },
    },
  },
  home: {
    aboutKicker: 'Chi siamo / lo studio',
    aboutTitleBefore: 'Uno studio di Karachi per la pietra a ogni ',
    aboutTitleEm: 'scala.',
    aboutBody:
      'St Werkz seleziona la pietra in quantità e la lavora pezzo per pezzo — oggetti fatti a mano per la casa, superfici per architetti e interior designer, e lotti all’ingrosso per l’esportazione. Lo studio è a Karachi; gli uffici di New York, Barcellona, Kuala Lumpur e Dubai raccolgono le richieste.',
  },
  about: {
    kicker: 'Chi siamo / lo studio',
    titleBefore: 'Pietra scelta in quantità. ',
    titleEm: 'Lavorata pezzo per pezzo.',
    lead: 'St Werkz è uno studio di pietra a Karachi diretto da Syed Rashid Ali. Lo studio realizza mobili, oggetti, interni e lastre in travertino, onice e marmo. La collezione è allestita in cinque sale e si visita su appuntamento; non si vende online. Non ci sono prezzi esposti.',
    studioKicker: 'Lo studio / Karachi',
    studioTitleBefore: 'Uno studio diretto da ',
    studioBody:
      'St Werkz seleziona la pietra in quantità e la lavora pezzo per pezzo — oggetti fatti a mano per la casa, superfici per architetti e interior designer, e lotti all’ingrosso per l’esportazione. Lo studio è a Karachi.',
    pathsKicker: 'Quattro modi di lavorare con noi',
    pathsTitleBefore: 'Pietra per il suo ',
    pathsTitleEm: 'punto di vista.',
    retail: {
      name: 'Per la casa',
      text: 'Tavoli, ciotole, vasi e oggetti in pietra fatti a mano dalla galleria di Karachi.',
      cta: 'Scopra il negozio',
    },
    architects: {
      name: 'Per gli architetti',
      text: 'Selezione della pietra, specifiche e lavorazione su misura per spazi architettonici.',
      cta: 'Scopra le risorse per architetti',
    },
    interiors: {
      name: 'Per gli interior designer',
      text: 'Oggetti e superfici scelti per la stanza, la luce e il modo in cui vive.',
      cta: 'Scopra l’interior design',
    },
    wholesale: {
      name: 'Per i partner all’ingrosso',
      text: 'Lastre, volumi e logistica attraverso il deposito di Karachi e l’ufficio export.',
      cta: 'Contatti l’ufficio export',
    },
    officesKicker: 'Uffici / sedi internazionali',
    officesTitleBefore: 'Karachi, in conversazione ',
    officesTitleEm: 'con il mondo.',
    officesBody:
      'Lo studio resta a Karachi; gli uffici di New York, Barcellona, Kuala Lumpur e Dubai raccolgono le richieste.',
    visitKicker: 'Lavorare con lo studio',
    visitTitleBefore: 'Si comincia da ',
    visitTitleEm: 'una conversazione.',
    visitBody:
      'Ci parli di un tavolo, un lavabo, una lastra o uno spazio. Una visita conferma la pietra prima di commissionare un pezzo.',
    atelierCta: 'Scopra l’atelier',
    estimateCta: 'Iniziare da un preventivo di studio',
    enquireCta: 'Richiesta preventivo',
    receptionAlt: 'Reception monolite in travertino levigato, St Werkz',
    objectsAlt: 'Oggetti ST WERKZ in onice miele e marmo nero venato d’oro nello studio di Karachi',
  },
  architects: {
    objectsKicker: 'OPERE FATTE A MANO / PER IL PROGETTO',
    objectsTitleBefore: 'Pezzi che possono stare ',
    objectsTitleEm: 'nel disegno.',
    objectsBody:
      'Tavoli, banchi e oggetti della collezione — proposti come riferimenti concreti per un progetto, non come codici di catalogo.',
    slabsKicker: 'PIETRA IN QUANTITÀ',
    slabsTitleBefore: 'Lastre con nome, ',
    slabsTitleEm: 'al piede quadrato.',
    slabsBody:
      'Le tariffe di marmo e onice pakistani sono fasce indicative di materiale. Una visita conferma la lastra. Usi il calcolatore per una prima forchetta di progetto.',
    calcKicker: 'FORCHETTA DI PROGETTO / INDICATIVA',
    calcTitleBefore: 'Una prima cifra ',
    calcTitleEm: 'per la specifica.',
    calcBody:
      'Area, spessore e scarto rispetto alle fasce pubblicate per ogni pietra, in PKR al piede quadrato. Non è un preventivo.',
    openCollection: 'Apra la collezione',
    openStones: 'Pietre con nome e tariffe',
  },
  interiors: {
    heroKicker: 'ST WERKZ / PER INTERIOR DESIGNER',
    heroTitleBefore: 'Oggetti e lastre',
    heroTitleEm: 'per la stanza.',
    heroCta: 'Parlare di un interno',
    heroAlt: 'Tavolino in onice bianco retroilluminato che brilla in un soggiorno, St Werkz Karachi',
    pointKicker: 'PER CHI ARREDA LA STANZA',
    pointTitleBefore: 'Una stanza ha bisogno di ',
    pointTitleEm: 'oggetto e superficie.',
    steps: [
      {
        number: '01',
        title: 'Oggetti che tengono lo schema',
        body: 'Urne, ciotole, tavoli e lavabi — i pezzi con cui il cliente vive, specificati con la stessa cura dell’architettura.',
      },
      {
        number: '02',
        title: 'Lastre alla scala della stanza',
        body: 'Banchi, bordi a cascata e pareti dal deposito di Karachi, abbinati agli oggetti già previsti nel progetto.',
      },
      {
        number: '03',
        title: 'Una sola conversazione di studio',
        body: 'Artigianato e superfici in volume dallo stesso ufficio. Ci porti un’atmosfera, un disegno o una domanda sui materiali.',
      },
    ],
    editKicker: 'DIREZIONI / OGGETTI + SUPERFICI',
    editTitleBefore: 'Arredare con la ',
    editTitleEm: 'pietra.',
    editBody:
      'Si parta da un pezzo che la stanza terrà, o da una superficie intorno a cui si costruisce. Entrambi appartengono alla stessa conversazione.',
    samples: 'Campioni, oggetti e conversazioni di progetto benvenuti',
    bringBrief: 'Ci presenti un progetto d’interni',
    contactKicker: 'UNA LINEA DIRETTA / KARACHI',
    contactTitleBefore: 'Arrediamo',
    contactTitleEm: 'la stanza in pietra.',
    contactBody:
      'Ci parli dell’interno — gli oggetti, le lastre, la luce. Partiremo dalla conversazione giusta, non da un catalogo generico.',
    products: [
      { slug: 'onyx-urns', name: 'Coppia di urne in onice', note: 'Oggetto / accento' },
      { slug: 'luminous-onyx', name: 'Plinto in onice luminoso', note: 'Soggiorno / luce' },
      { slug: 'onyx-waterfall', name: 'Cascata in onice retroilluminato', note: 'Superficie / pezzo' },
      { slug: 'hotel-reception', name: 'Reception in travertino', note: 'Pietra a scala di stanza' },
    ],
    objectsKicker: 'OGGETTI PER LA STANZA',
    objectsTitleBefore: 'Mobili e accenti ',
    objectsTitleEm: 'con cui vivere.',
    objectsBody:
      'Opere da pranzo, da soggiorno e scultoree dalle stesse pietre delle superfici — allestite per una stanza arredata.',
    slabsKicker: 'SUPERFICI A SCALA DI STANZA',
    slabsTitleBefore: 'Pareti, banchi ',
    slabsTitleEm: 'e il deposito.',
    slabsBody:
      'Interni a scala di stanza e pietre pakistane con nome, in quantità. Il calcolatore riguarda solo il materiale.',
    calcKicker: 'FORCHETTA DI STANZA / INDICATIVA',
    calcTitleBefore: 'Oggetto e superficie, ',
    calcTitleEm: 'poi una cifra.',
    calcBody:
      'Stimi la pietra per una stanza arredata — pavimenti, banchi, pareti — dalle fasce pubblicate per ogni pietra.',
    openCollection: 'Percorra le sale',
    openStones: 'Pietre con nome e tariffe',
    navArchitects: 'Architetti',
  },
  retailStore: {
    filterAria: 'Filtrare il negozio per sala',
    filterAll: 'Tutte le sale',
    filterDining: 'Pranzo',
    filterLiving: 'Soggiorno',
    filterAccents: 'Accenti',
    storeKicker: 'Il negozio',
    storeTitleBefore: 'Opere fatte a mano ',
    storeTitleEm: 'in sala.',
    storeBody:
      'Oggetti, tavoli e accenti della collezione. Filtri una sala, apra un pezzo, poi richieda una visita. Non c’è un carrello.',
    countLine: (count) => `${count} opere`,
    pieceEnquire: 'Richiedere una visita',
  },
  projectCalc: {
    stone: 'Pietra pakistana con nome',
    area: 'Area di progetto',
    areaUnits: 'Unità di area',
    thickness: 'Spessore (mm)',
    wastage: 'Scarto (%)',
    thicknessNote:
      'Le tariffe pubblicate sono in PKR al piede quadrato, dallo spessore da pavimento a quello da piano cucina (~20 mm). Una lastra più spessa aumenta in proporzione quella fascia. Si tratta solo del materiale.',
    port: 'Porto di destinazione',
    portPlaceholder: 'Jebel Ali, Shanghai, Genova…',
    crates: 'Casse discusse',
    cratesHint:
      'Il numero di casse serve a descrivere il lotto nella richiesta — non aggiunge un prezzo di imballo né di nolo.',
    billedArea: 'Superficie fatturata',
    materialRange: 'Materiale indicativo',
    publishedBand: 'Fascia pubblicata',
    usdLine: (low, high, rate) => `≈ ${low} – ${high} a ${rate} PKR/USD`,
    disclaimer:
      'Questa è una forchetta indicativa di materiale dalle fasce pakistane pubblicate per ogni pietra. Non è un preventivo St Werkz, né il prezzo di un pezzo finito, né una fattura. Una visita conferma la pietra.',
    freightNote:
      'FOB Karachi. Nolo, assicurazione e spese di destinazione si quotano a parte — non sono in questo calcolatore.',
    requestQuote: 'Richiedere questa forchetta',
    applyToForm: 'Riporti nella richiesta di lotto',
    waiting: 'Resta valida l’ultima misura mentre modifica i valori.',
    giveArea: 'Dia al progetto un’area plausibile per vedere una forchetta.',
  },
  exportDesk: {
    separateTitleEm: 'merce.',
  },
  pieces: {
    'pill-travertine-dining': {
      title: 'Tavolo da pranzo a pillola in travertino',
      material: 'Travertino chiaro levigato',
      form: 'piano rettangolare arrotondato su una base cilindrica in pietra',
      note: 'Un tavolo di convivio fotografato in una stanza pallida con sedie wishbone. Angoli morbidi, una faccia levigata, un solo tamburo di pietra sotto — inventario St Werkz per una sala da pranzo, non uno schizzo da catalogo.',
    },
    'nero-oval-wood-dining': {
      title: 'Tavolo da pranzo ovale Nero',
      material: 'Marmo nero lucidato con venature bianche, base in legno scuro',
      form: 'piano da pranzo ovale su un telaio rastremato in legno',
      note: 'Una faccia Nero di alta lucidatura su un sottotelaio caldo in legno, allestita con sedie avvolgenti crema. Mobile finito dallo studio di Karachi, pronto a essere visto come pezzo.',
    },
    'portoro-pedestal-dining': {
      title: 'Tavolo da pranzo Portoro con base a colonna',
      material: 'Marmo nero lucidato con venature oro',
      form: 'piano da pranzo rettangolare su una base scura a colonna',
      note: 'Da vicino sul movimento d’oro in un fondo nero. Un tavolo da pranzo trattato come una lastra intorno a cui sedersi — lo stesso linguaggio Portoro dei lotti in deposito, finito come mobile.',
    },
    'nero-chrome-dining': {
      title: 'Tavolo da pranzo Nero e cromo',
      material: 'Marmo nero lucidato con venature bianche, telaio cromato',
      form: 'piano da pranzo rettangolare su una base geometrica in metallo',
      note: 'Vene bianche di fulmine su un piano nero, tenuto da un telaio cromato teso e da sedie in velluto grigio. Un pezzo da pranzo del negozio con una linea metallica più netta dell’ovale su base in legno.',
    },
    'nero-xframe-dining': {
      title: 'Tavolo da pranzo Nero a X',
      material: 'Marmo nero lucidato con venature bianche, cavalletto in metallo nero',
      form: 'piano rettangolare arrotondato su un telaio a X',
      note: 'Un lungo piano Nero con angoli addolciti, fotografato in studio con una lastra imballata dietro. Il prodotto è la pietra; il telaio la tiene nella stanza.',
    },
    'travertine-square-pedestal': {
      title: 'Tavolo in travertino con base quadrata',
      material: 'Travertino crema levigato',
      form: 'piano circolare su un plinto quadrato in pietra',
      note: 'Il tondo contro il quadrato. Un tavolo compatto da pranzo o da caffè in travertino a pori aperti — inventario per una stanza più piccola che vuole comunque la pietra sotto il pasto.',
    },
    'sage-onyx-disc-table': {
      title: 'Tavolino disco in onice salvia',
      material: 'Onice salvia lucidato, bordo in metallo spazzolato',
      form: 'tavolino circolare da salotto o d’appoggio',
      note: 'Un disco finito di onice ruggine e menta, fotografato dall’alto perché la faccia sia l’intero argomento. Mobile da soggiorno dalla stessa pietra del libro delle lastre.',
    },
    'sage-onyx-brass-table': {
      title: 'Tavolino in onice salvia e ottone',
      material: 'Onice verde lucidato, gabbia in ottone spazzolato',
      form: 'tavolino d’accento tondo su un tamburo di aste verticali',
      note: 'Salvia, crema e ruggine nella pietra; una leggera gabbia d’ottone sotto. Un tavolino d’appoggio del negozio pensato per stare da solo in una stanza che ha già un punto di vista.',
    },
    'cream-oval-plinth-table': {
      title: 'Tavolino ovale a plinto in crema',
      material: 'Marmo o onice crema lucidato con venature nocciola',
      form: 'tavolino da salotto ovale su una base di lastre sfalsate',
      note: 'Un ovale pallido e figurato su un piede architettonico diviso. Mobile basso da soggiorno che si legge ancora come costruzione.',
    },
    'linear-travertine-coffee': {
      title: 'Tavolino lineare in travertino',
      material: 'Travertino levigato tagliato in vena',
      form: 'lastra rettangolare su due gambe a blocco',
      note: 'Stratificazione orizzontale lungo tutto un tavolo basso. Un piccolo sigillo dorato sulla gamba. Mobile dallo stesso travertino degli oggetti.',
    },
    'travertine-cube-table': {
      title: 'Tavolino cubo in travertino',
      material: 'Travertino beige levigato',
      form: 'base cubica su un plinto arretrato',
      note: 'Un cubo di pietra, a fasce come strati, sollevato di un dito dal pavimento. Tavolino d’appoggio o plinto: entrambe le letture sono giuste.',
    },
    'travertine-tripod-coffee': {
      title: 'Tavolino tripode in travertino',
      material: 'Travertino crema levigato',
      form: 'piano circolare su tre lastre che si intersecano',
      note: 'Un tavolo basso e tondo la cui base è l’incontro di tre piani. Prima la forma, poi i pori della pietra.',
    },
    'travertine-block-side': {
      title: 'Tavolino a blocco in travertino',
      material: 'Travertino levigato non stuccato',
      form: 'piano rettangolare spesso su un montante pieno',
      note: 'Un piccolo blocco architettonico: un montante, un piano. Fotografato da vicino perché i vuoti della pietra restino visibili.',
    },
    'travertine-walnut-coffee': {
      title: 'Tavolino in travertino e noce',
      material: 'Travertino levigato, telaio in noce scuro',
      form: 'piano circolare in pietra in una fascia di legno a quattro gambe',
      note: 'Pietra incassata nel legno, metà secolo nelle gambe, geologica nella faccia. Un tavolo da soggiorno dalla sala del negozio.',
    },
    'travertine-drum-side': {
      title: 'Tavolino tamburo in travertino',
      material: 'Travertino crema levigato',
      form: 'piano circolare su una base cilindrica',
      note: 'Cerchio su tamburo, fotografato su un parquet a spina di pesce. Un tavolino d’accento quieto per un angolo che chiede pietra, non ornamento.',
    },
    'travertine-cone-pedestal': {
      title: 'Tavolino in travertino con base conica',
      material: 'Travertino crema levigato',
      form: 'piano circolare su una base conica rastremata',
      note: 'Lo stesso linguaggio dei tavoli da pranzo su colonna, ridotto a un tavolino d’appoggio. Un tronco di cono, un disco.',
    },
    'travertine-c-table': {
      title: 'Tavolino a C in travertino',
      material: 'Travertino levigato a fasce',
      form: 'tavolino d’appoggio a C a sbalzo',
      note: 'Un blocco intagliato che scivola accanto a un divano. Le fasce orizzontali fanno il disegno; il vuoto è la parte utile.',
    },
    'banded-onyx-vase': {
      title: 'Vaso in onice a bande',
      material: 'Onice a bande lucidato in ruggine, ambra e crema',
      form: 'vaso a spalla con bordo svasato',
      note: 'Strati orizzontali in borgogna, miele e salvia. Un oggetto da mensola dall’inventario del negozio, finito come pezzo a sé.',
    },
    'portoro-cylinder-cup': {
      title: 'Coppa cilindrica Portoro',
      material: 'Marmo nero lucidato con venature oro e bianche',
      form: 'cilindro aperto con bordo spesso',
      note: 'Un tamburo corto in Portoro — portapenne, vaso o peso su una scrivania. La vena è il disegno.',
    },
    'tall-noir-vase': {
      title: 'Vaso alto in marmo noir',
      material: 'Marmo scuro lucidato con venature bianche',
      form: 'vaso allungato da terra o da piedistallo',
      note: 'Un cilindro alto, dolcemente rastremato, in pietra nera ad alto contrasto. Fotografato contro una zoccolatura — un accento davanti a cui passare lentamente.',
    },
    'copper-vein-basin': {
      title: 'Bacile in marmo a vena rame',
      material: 'Marmo nero lucidato con venature rame e bianche',
      form: 'vaso circolare basso o lavabo',
      note: 'Un bacile tondo, predisposto per lo scarico, l’interno figurato quanto l’esterno. Bagno o natura morta — la stessa pietra in entrambi i casi.',
    },
    'travertine-compote': {
      title: 'Alzata in travertino',
      material: 'Travertino beige levigato',
      form: 'ciotola larga su un piede emisferico',
      note: 'Un centro tavola rialzato con i pori lasciati aperti. Frutta, conchiglie o niente. Architettura da tavola alla scala di un pasto.',
    },
    'sage-onyx-pear-bowl': {
      title: 'Ciotola in onice salvia su sfere',
      material: 'Onice salvia lucidato',
      form: 'ciotola bassa su tre sfere in pietra',
      note: 'Onice verde con movimento ruggine, su tre orbi abbinati, fotografato con delle pere. L’equilibrio come metodo di costruzione.',
    },
    'travertine-vanity-gold': {
      title: 'Set da toeletta in travertino con dispenser dorato',
      material: 'Travertino beige levigato, dispenser in metallo dorato',
      form: 'vassoio, dispenser, bicchiere, barattolo e portasapone',
      note: 'Un set da bagno in cinque pezzi su un vassoio di pietra. Oggetti quotidiani con la stessa finitura del mobile.',
    },
    'travertine-bath-ensemble': {
      title: 'Set da bagno spa in travertino',
      material: 'Travertino levigato, metallo spazzolato e vetro',
      form: 'vassoio, dispenser, barattoli e bicchiere portaspazzolini in vetro',
      note: 'Un set spa fotografato come natura morta. Cotone, spazzolini di legno, pori aperti — il bagno trattato come una piccola collezione.',
    },
    'portoro-bath-set': {
      title: 'Set da bagno Portoro',
      material: 'Marmo nero lucidato con venature oro',
      form: 'coprifazzoletti, dispenser, piattino, bicchiere e barattolo con coperchio',
      note: 'Cinque volumi Portoro per un banco scuro. Lo stesso fulmine d’oro dei tavoli da pranzo, alla scala del sapone e del cotone.',
    },
    'travertine-bath-seven': {
      title: 'Set da bagno in travertino da sette pezzi',
      material: 'Travertino levigato, cromo e ottone corallo',
      form: 'set da bagno in sette pezzi con vassoio, portaspazzole e barattolo con coperchio di corallo',
      note: 'Il linguaggio del bagno al completo: scopino, finiale di corallo, dispenser, bicchiere, piattino. Una pietra, diversi gesti quotidiani.',
    },
    'scalloped-onyx-bowl': {
      title: 'Ciotola festonata in onice',
      material: 'Onice salvia a bande lucidato',
      form: 'ciotola circolare scanalata',
      note: 'Un bordo increspato in onice verde e terracotta traslucido. Due viste: una su marmo nero, una alla luce del giorno. Un accento che può tenere frutta o niente.',
    },
    'sage-onyx-coasters': {
      title: 'Set sottobicchieri in onice salvia',
      material: 'Onice salvia a bande lucidato',
      form: 'dischi circolari in un supporto cilindrico con taglio a U',
      note: 'Architettura da tavolo alla scala di un bicchiere. Due fotografie dello stesso set innestato — menta, ruggine e un intaglio per il pollice.',
    },
    'portoro-baluster-vase': {
      title: 'Vaso a balaustro Portoro',
      material: 'Marmo nero lucidato con venature bianche e ambra',
      form: 'urna classica con collo ad anelli, su piede',
      note: 'Un vaso Portoro tornito, ad alta lucidatura, per uno scaffale che sa già stare in silenzio.',
    },
    'terracotta-marble-urn': {
      title: 'Urna in marmo terracotta',
      material: 'Marmo carbone lucidato con figura terracotta e crema',
      form: 'urna con piede su un plinto quadrato',
      note: 'Una fioriera o un oggetto: arancio bruciato contro pietra scura, un piede quadrato. Scultura che può anche ospitare una pianta.',
    },
    'live-edge-onyx-vessel': {
      title: 'Vaso in onice a bordo naturale',
      material: 'Onice salvia a bande lucidato',
      form: 'ciotola bassa allungata con bordo grezzo',
      note: 'Un piatto ovale in onice, il labbro lasciato irregolare. Organico più che tornito — un centro tavola dall’inventario degli oggetti.',
    },
    'pair-stone-pedestals': {
      title: 'Coppia di piedistalli in pietra',
      material: 'Marmo scuro lucidato con figura nocciola',
      form: 'colonne espositive doriche abbinate',
      note: 'Due piedistalli slanciati per un busto, un vaso o un’altezza vuota. Accenti architettonici venduti in coppia.',
    },
    'onyx-chess-casket': {
      title: 'Scrigno degli scacchi in onice',
      material: 'Onice bianco e a bande lucidato, custodia in velluto',
      form: 'scacchi da viaggio in una scatola di presentazione foderata',
      note: 'Onice bianco contro onice a bande ruggine e salvia, custodito in un astuccio borgogna. Un gioco trattato come oggetto.',
    },
    'nero-chess-set': {
      title: 'Scacchiera Nero',
      material: 'Pietra nera e pietra chiara figurata, lucidate',
      form: 'scacchiera completa con pezzi intagliati in pietra',
      note: 'Una scacchiera Nero quadrata con un largo bordo nero. Pezzi nelle stesse due pietre. Scultura da soggiorno con cui si può anche giocare.',
    },
    'viola-marble-fireplace': {
      title: 'Camino in marmo Viola',
      material: 'Marmo crema lucidato con figura ruggine e carbone',
      form: 'mensola intagliata, focolare e parete abbinati',
      note: 'Una cornice a scala di stanza: mensola, focolare e la lastra sopra, a vene abbinate. La pietra come architettura per un soggiorno o una hall.',
    },
    'nero-marble-fireplace': {
      title: 'Camino in marmo Nero',
      material: 'Marmo nero lucidato con venature bianche',
      form: 'mensola classica a pannelli e focolare',
      note: 'Una cornice Nero a pannelli incassati, fotografata con il fuoco acceso. Pietra architettonica per un interno specificato.',
    },
    'portoro-workshop-mantel': {
      title: 'Mensola da camino Portoro in laboratorio',
      material: 'Marmo nero lucidato con venature oro',
      form: 'cornice da camino intagliata sul pavimento del laboratorio',
      note: 'Scattata al deposito prima della posa: fiumi d’oro su un fondo nero, modanature già tagliate. Documenta come una mensola lascia Karachi.',
    },
    'honey-quartzite-slab': {
      title: 'Lastra di quarzite miele',
      material: 'Pietra cristallina lucidata con venature oro e ambra',
      form: 'faccia di lastra di grande formato',
      note: 'Un fondo crema luminoso con fiumi d’ambra. Fotografata come faccia di lotto — la pietra prima di diventare un banco o una parete.',
    },
    'celadon-onyx-slab': {
      title: 'Lastra di onice celadon',
      material: 'Onice salvia traslucido lucidato',
      form: 'faccia verticale di onice',
      note: 'Menta e crema con sacche ruggine. Una fotografia dal deposito di un onice che può essere retroilluminato — discusso come lotto, non come moodboard.',
    },
    'nero-calcite-lot': {
      title: 'Lotto Nero a calcite',
      material: 'Marmo nero lucidato con venature di calcite bianca',
      form: 'due facce dallo stesso lotto bianco e nero',
      note: 'Bianco frastagliato su un fondo nero, registrato come due facce vicine. Inventario per architetti e per l’ufficio export.',
    },
    'sage-rust-onyx-slab': {
      title: 'Lastra di onice salvia e ruggine',
      material: 'Onice verde lucidato con figura ruggine e oro',
      form: 'faccia di onice a pieno formato',
      note: 'Fulmini d’ambra su un fondo celadon. La stessa famiglia dei tavolini a disco, mostrata qui come pietra in quantità.',
    },
    'portoro-gold-lot': {
      title: 'Lotto Portoro oro',
      material: 'Marmo nero lucidato con venature oro miele',
      form: 'faccia di lastra e un pannello intarsiato a macchia aperta',
      note: 'Due registrazioni di Portoro: una faccia grezza, poi un pannello con cornici tornite. È il taglio da cui si traggono i tavoli da pranzo.',
    },
  },
  collectionIndex: {
    eyebrow: 'ST WERKZ / LA BIBLIOTECA DEI MATERIALI',
    explore: (count: number) => `Scopra le ${IT_NUMBER_WORDS[count] ?? count} collezioni`,
    samplesAria: 'Campioni di pietra naturale',
    whiteAlt: 'Campione originale di marmo Ziarat White con sottili venature grigie diagonali',
    whiteCaption: 'ZIARAT WHITE / MARMO',
    amberAlt: 'Campione originale di onice arancio con calde bande arancioni e chiare linee minerali',
    amberCaption: 'ONICE ARANCIO / MOVIMENTO NATURALE',
    notationBefore: 'Mai due vene',
    notationAfter: 'raccontano la stessa storia.',
    indexAria: 'Collezioni di materiali',
    atlasEyebrow: (count: number) =>
      `${(IT_NUMBER_WORDS[count] ?? String(count)).toUpperCase()} COLLEZIONI / UNO SGUARDO DA VICINO`,
    atlasTitleBefore: 'Il carattere',
    atlasTitleEm: 'è nel dettaglio.',
    atlasBodyFirst: 'Una materia intorno a cui costruire.',
    atlasBodySecond: 'Un oggetto con cui vivere.',
    roomPhotos: {
      marble: {
        alt: 'Campione di marmo Black and Gold con pietra scura e calde venature oro',
        caption: 'Black & Gold / Campione di marmo',
      },
      onyx: {
        alt: 'Campione di onice verde chiaro con morbide bande verdi e crema',
        caption: 'Onice verde chiaro / Campione di onice',
      },
      limestone: {
        alt: 'Tavolino in travertino levigato con una lastra spessa e due gambe a plinto in pietra',
        caption: 'Travertino / Formato nella pietra',
      },
      slabs: {
        alt: 'Fotografia originale di lastre di marmo nero con venature bianche, in piedi nel deposito',
        caption: 'Lastre Nero / Al deposito',
      },
      handicrafts: {
        alt: 'Vaso a balaustro intagliato in marmo Portoro con collo ad anelli, su piede',
        caption: 'Portoro / L’oggetto intagliato',
      },
    },
    spacesEyebrow: 'DALLA MATERIA ALLA SUA CASA',
    spacesTitle: 'Ha in mente uno spazio?',
    spacesBody: 'Scopra gli accessori secondo il modo in cui vive.',
    spacesAria: 'Trovi i prodotti per spazio',
    spaceKitchen: 'Cucina',
    spaceWashroom: 'Bagno',
    spaceHomeDecor: 'Decorazioni per la casa',
  },
  gallery: {
    previousPhoto: 'Fotografia precedente',
    nextPhoto: 'Fotografia successiva',
    photosAria: 'Fotografie del prodotto',
    viewPhoto: (index: number, total: number, title: string) =>
      `Mostra la fotografia ${index} di ${total}: ${title}`,
  },
  dataText: {
    stones: {
      flower: {
        colour: 'Figura floreale rossa / rosa',
        origin: 'Fasce di Lasbela e Swat',
        use: 'Pavimenti economici e bordure decorative',
      },
      'sunny-grey': {
        colour: 'Grigio freddo, grana fine',
        use: 'Pavimenti e stanze di tutti i giorni',
      },
      'badal-grey': {
        colour: 'Grigio nuvolato',
        use: 'Pavimenti moderni e scale',
      },
      'silky-black': {
        colour: 'Nero corvino con movimento leggero',
        use: 'Bordure, fasce di contrasto, pavimenti',
      },
      tavera: {
        colour: 'Beige caldo / crema, spesso con fossili',
        origin: 'Lasbela, Balochistan, e Swat',
        use: 'Pavimenti per la casa di famiglia',
      },
      'ziarat-grey': {
        colour: 'Grigio uniforme di pregio',
        origin: 'Fascia bianca Mohmand / Ziarat, KPK',
        use: 'Pavimenti grigi moderni',
      },
      'sunny-white': {
        colour: 'Bianco brillante, vena grigio chiaro',
        use: 'Case, scale, stanze',
      },
      'cheetah-white': {
        colour: 'Bianco con figura maculata / leopardata',
        origin: 'Depositi commerciali del Khyber Pakhtunkhwa',
        use: 'Pavimenti di carattere a motivo',
      },
      'strawberry-red': {
        colour: 'Rosso caldo',
        origin: 'Cave locali del Pakistan',
        use: 'Bordure e pavimenti decorativi',
      },
      'sun-tippi': {
        colour: 'Beige caldo con movimento morbido',
        use: 'Interni caldi e scale',
      },
      'cherry-pink': {
        colour: 'Rosa tenue',
        origin: 'Cave locali del Pakistan',
        use: 'Pavimenti d’accento e rivestimenti',
      },
      'botticino-fancy': {
        colour: 'Beige con figura nuvolata',
        use: 'Pavimenti di famiglia e piani cucina',
      },
      'sona-beige': {
        colour: 'Beige dorato',
        origin: 'Fasce crema del Balochistan',
        use: 'Reception calde e rivestimenti',
      },
      verona: {
        colour: 'Beige crema, a volte maculato',
        use: 'Interni caldi classici',
      },
      'shangla-white': {
        colour: 'Bianco fine',
        use: 'Pavimenti e rivestimenti leggeri',
      },
      'elegant-grey': {
        colour: 'Grigio argento',
        origin: 'Fasce grigie del Pakistan',
        use: 'Ville moderne e bagni',
      },
      'mastung-cream': {
        colour: 'Crema scuro, grana compatta',
        origin: 'Mastung e Loralai, Balochistan',
        use: 'Pavimenti caldi e scale',
      },
      'jungle-green': {
        colour: 'Verde profondo',
        origin: 'Fasce di marmo verde del Pakistan',
        use: 'Bordure, moschee, pannelli di carattere',
      },
      'pak-black': {
        colour: 'Nero denso',
        origin: 'Buner e Balochistan',
        use: 'Bordure, scale, zone di carattere',
      },
      'mohmand-white': {
        colour: 'Bianco con calcite grigia',
        use: 'Pavimenti, pareti, piani di mobili',
      },
      'antique-green': {
        colour: 'Verde storico con figura',
        origin: 'Fasce di marmo verde del Pakistan',
        use: 'Pannelli di carattere e rivestimenti',
      },
      'golden-marble': {
        colour: 'Oro su crema o beige',
        origin: 'Pakistan / fasce d’oro locali miste',
        use: 'Interni classici di lusso',
      },
      'pakistan-chocolate': {
        colour: 'Marrone caldo',
        origin: 'Fasce marroni del Balochistan',
        use: 'Reception e rivestimenti',
      },
      teakwood: {
        colour: 'Marrone venato come il legno',
        use: 'Stanze calde e facce di mobili',
      },
      'black-n-gold': {
        colour: 'Nero con macchie e venature dorate',
        use: 'Bordure, pareti, banchi di lusso',
      },
      'himalayan-white': {
        colour: 'Bianco del nord',
        origin: 'Chitral, Hunza e fasce del nord',
        use: 'Interni bianchi di pregio',
      },
      'ziarat-white': {
        colour: 'Bianco pulito con sottile vena grigia',
        use: 'Pavimenti, scale, pareti di lusso',
      },
      'sahara-gold': {
        colour: 'Oro sabbia',
        origin: 'Fasce di pietra dorata del Pakistan',
        use: 'Pavimenti di carattere e rivestimenti',
      },
      'indus-gold': {
        colour: 'Figura dorata intensa',
        origin: 'Fasce di pietra dorata del Pakistan',
        use: 'Pareti e pavimenti dorati di carattere',
      },
      'ziarat-supreme': {
        colour: 'Ziarat bianco di prima scelta',
        use: 'Ville, scale, reception',
      },
      'michael-angelo': {
        colour: 'Nero con venature oro / ambra',
        use: 'Pareti di carattere, banchi, mobili',
      },
      'light-green-onyx': {
        colour: 'Verde pallido, nuvolato, traslucido',
        origin: 'Fascia Chagai–Bolan–Lasbela–Khuzdar',
        use: 'Pareti retroilluminate, mobili lavabo, piani di tavolo',
      },
      'green-onyx': {
        colour: 'Verde con bande bianche, marroni e oro',
        use: 'Banchi, tavoli, interni d’albergo',
      },
      'multi-green-onyx': {
        colour: 'Verde, bianco, miele e oro mescolati',
        origin: 'Chagai e Khuzdar',
        use: 'Grandi rivestimenti e reception',
      },
      'dark-green-onyx': {
        colour: 'Verde profondo, bande decise',
        use: 'Pareti d’impatto e tavoli di lusso',
      },
      'brown-onyx': {
        colour: 'Marrone terra, crema e miele',
        origin: 'Fascia di onice del Balochistan',
        use: 'Tavoli, banchi, pannelli decorativi',
      },
      'honey-onyx': {
        colour: 'Giallo dorato / ambra, molto traslucido',
        origin: 'Chagai e Lasbela',
        use: 'Bar, bagni e pannelli retroilluminati',
      },
      'orange-onyx': {
        colour: 'Arancio caldo e oro',
        origin: 'Fascia di onice del Balochistan',
        use: 'Pannelli retroilluminati e mobili',
      },
      'white-onyx': {
        colour: 'Da bianco a crema, vena oro o grigia',
        origin: 'Chagai; disponibilità limitata',
        use: 'Bagni di lusso, mobili lavabo, piani di tavolo',
      },
      'red-onyx': {
        colour: 'Rosso con marrone, verde e crema',
        origin: 'Fascia di onice del Balochistan',
        use: 'Pareti di carattere e mobili su misura',
      },
      'pink-onyx': {
        colour: 'Rosa / rosato, spesso raro',
        origin: 'Commercio di onice Pakistan–Afghanistan',
        use: 'Interni boutique e piani di tavolo',
      },
      'black-onyx': {
        colour: 'Quasi nero, traslucenza limitata',
        origin: 'Balochistan; secondo la cava',
        use: 'Banchi e mobili moderni',
      },
      'blue-onyx': {
        colour: 'Blu, il colore regolare più raro',
        origin: 'Balochistan; non sempre disponibile',
        use: 'Lavori decorativi speciali di lusso',
      },
    },
    chapters: {
      kitchen: {
        title: 'Riunirsi intorno alla pietra.',
        subtitle: 'Piccoli rituali. Oggetti straordinari.',
        description:
          'Una ciotola scultorea al centro della tavola. Un vassoio che raccoglie le piccole cose. Scopra ciotole, vassoi, sottobicchieri e barattoli in travertino naturale, onice e marmo lucidato.',
        material: 'Travertino, onice e marmo',
        heroAlt: 'Ampia ciotola su piede in travertino beige, con base emisferica, fotografata accanto a conchiglie',
      },
      washroom: {
        title: 'Un lusso più quieto.',
        subtitle: 'Il suo santuario quotidiano, scolpito nella pietra.',
        description:
          'Da un lavabo in marmo lucidato a un set da toeletta composto con cura, la pietra naturale rende ponderato un gesto quotidiano. Scopra dispenser, bicchieri da toeletta, portasapone e set da bagno completi, insieme a vasi decorativi per una mensola o un piano.',
        material: 'Marmo e travertino',
        heroAlt:
          'Set da bagno in marmo Portoro nero e oro con dispenser, coprifazzoletti, bicchiere, barattolo con coperchio e portasapone',
      },
      'home-decor': {
        title: 'Si senta a casa.',
        subtitle: 'Un po’ di carattere. Un luogo tutto suo.',
        description:
          'Un vaso d’impatto sulla consolle. Portacandele accanto alla sua poltrona preferita. Una scacchiera intagliata pronta per una sera lenta. Scopra vasi, fermalibri, oggetti da scrivania, piedistalli espositivi e tavolini compatti che portano calore e carattere nella sua casa.',
        material: 'Onice, marmo e travertino',
        heroAlt: 'Vaso in onice a bande lucidato con bordo svasato e strati naturali ambra, ruggine, crema e salvia',
      },
    },
    accessories: {
      'onyx-mortar-pestle': {
        title: 'Mortaio e pestello in onice',
        material: 'Pietra a bande crema e ambra',
        description: 'Un mortaio da tenere in mano con il pestello abbinato, fotografato in uso.',
        alt: 'Fotografia reale di una persona che usa un mortaio in pietra a bande crema e ambra con il pestello abbinato',
      },
      'marble-serving-board': {
        title: 'Tagliere da portata in marmo',
        material: 'Marmo bianco e grigio',
        description: 'Un tagliere allungato con estremità arrotondate, fotografato con dei pasticcini.',
        alt: 'Fotografia reale dall’alto di un tagliere da portata completo in marmo bianco e grigio con tre pasticcini',
      },
      'slate-cheese-platter': {
        title: 'Piatto da portata in ardesia',
        material: 'Ardesia nera naturale',
        description: 'Un ampio piatto in pietra testurizzata per una composizione da tavola.',
        alt: 'Fotografia reale dall’alto di un piatto rettangolare completo in ardesia nera con una composizione di formaggi e salumi',
      },
      'portoro-soap-dispenser': {
        title: 'Dispenser di sapone Portoro',
        material: 'Marmo nero lucidato con venature oro',
        description: 'Un dispenser tondeggiante in pietra con pompa in metallo.',
        alt: 'Dettaglio ritoccato di un dispenser di sapone in marmo nero e oro; veda la fotografia originale del Set da bagno Portoro',
      },
      'travertine-soap-dish': {
        title: 'Portasapone in travertino',
        material: 'Travertino beige levigato',
        description: 'Un piattino circolare basso con bordo dolcemente arrotondato.',
        alt: 'Dettaglio ritoccato di un portasapone circolare in travertino; veda la fotografia originale del Set da toeletta in travertino con dispenser dorato',
      },
      'travertine-brush-holder': {
        title: 'Portaspazzola in travertino',
        material: 'Travertino levigato con spazzola in metallo',
        description: 'Una spazzola alta e un portaspazzola cilindrico in pietra da tenere accanto alla toeletta.',
        alt: 'Dettaglio ritoccato di una spazzola in metallo e di un portaspazzola cilindrico in travertino; veda la fotografia originale del Set da bagno in travertino da sette pezzi',
      },
      'travertine-cotton-jar': {
        title: 'Barattolo per cotone in travertino',
        material: 'Travertino caldo levigato',
        description: 'Un contenitore per cotone intagliato con un coperchio appoggiato, dolcemente arrotondato.',
        alt: 'Dettaglio ritoccato di un barattolo per cotone in travertino con coperchio; veda la fotografia originale del Set da bagno spa in travertino',
      },
    },
  },
};
