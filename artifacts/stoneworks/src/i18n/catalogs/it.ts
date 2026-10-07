import type { Catalog } from '../types';
import { homeDesignCopy } from './home-design';
import { withCatalogFallback } from './fallback';
import { desks, stoneIndexes } from './desks';
import { shippingCopy } from './shipping';

export const it: Catalog = withCatalogFallback({
  luxuryHome: homeDesignCopy.it,
  seo: {
    keywords:
      'tavolo in marmo, tavolo da pranzo in travertino, tavolino in onice, onice retroilluminato, lastre di marmo, mobili in marmo su misura, St Werkz Karachi, studio di pietra Karachi, Syed Rashid Ali, travertino Pakistan, onice Karachi',
    tagline: 'Uno studio di pietra a Karachi',
    description:
      'St Werkz è uno studio di pietra a Karachi che realizza tavoli, oggetti e superfici architettoniche in travertino, onice e marmo. La collezione è allestita come una galleria; le visite si concordano su richiesta.',
    ogImageAlt:
      'Banco reception in travertino con bordo grezzo in una hall d’albergo silenziosa, St Werkz Karachi',
    pages: {
      home: {
        title: 'St Werkz, Karachi — Studio di pietra per tavoli, oggetti e superfici',
        description:
          'St Werkz è uno studio di pietra a Karachi: tavoli, oggetti e superfici in travertino, onice e marmo. Percorra la collezione o richieda una visita.',
      },
      collection: {
        title: 'La collezione — St Werkz, Karachi',
        description:
          'Cinque sale di pietra St Werkz — pranzo, soggiorno, accenti, interni e lastre — allestite come una galleria a Karachi. Nessun prezzo a parete; richieda una visita.',
      },
      atelier: {
        title: 'Atelier — St Werkz, Karachi',
        description:
          'St Werkz è uno studio di materia a Karachi diretto da Syed Rashid Ali. Mobili in travertino, onice e marmo, dalla prima conversazione a una superficie che resta.',
      },
      enquire: {
        title: 'Richiedere una visita — St Werkz, Karachi',
        description:
          'Richieda una visita St Werkz a Karachi. Scriva a stoneworks014@gmail.com o chiami il +92 304 7689678. Nomini un’opera o la sala: conversazione di studio, non un carrello.',
      },
      estimate: {
        title: 'Preventivo di studio — St Werkz, Karachi',
        description:
          'Una prima forchetta St Werkz in PKR prima della lastra: indicativa, non un prezzo. Descriva il pezzo, la pietra e la misura. Syed Rashid Ali conferma la pietra a Karachi.',
      },
      retailers: {
        title: 'Per i rivenditori — St Werkz, Karachi',
        description:
          'Una selezione St Werkz di oggetti in marmo, onice e travertino per i rivenditori. Conversazione commerciale con lo studio di Karachi: scaffali composti, non un magazzino.',
      },
      retail: {
        title: 'Negozio — St Werkz, Karachi',
        description:
          'Oggetti in onice e marmo fatti a mano per la casa da St Werkz, Karachi — ciotole, urne e tavoli, mostrati come galleria. Percorra le sale, poi richieda una visita.',
      },
      architects: {
        title: 'Architetto — St Werkz, Karachi',
        description:
          'Supporto di materia St Werkz per architetti a Karachi: campioni, mobili in pietra, lastre e superfici specificati con intenzione.',
      },
      interiors: {
        title: 'Interior design — St Werkz, Karachi',
        description:
          'Oggetti e lastre per interior designer da St Werkz, Karachi — pezzi fatti a mano e superfici architettoniche per stanze arredate.',
      },
      export: {
        title: 'Banco export — St Werkz, Karachi',
        description:
          'Lotti fotografati di marmo, onice e travertino dal cantiere St Werkz a Karachi. Una cassa di campioni prima di un container. FOB Karachi; nessun listino pubblicato.',
        keywords:
          'esportazione lastre di marmo Karachi, lotti di onice pakistano, lastre di travertino FOB Karachi, marmo figurato Pakistan, cantiere St Werkz Karachi, esportare marmo dal Pakistan, Syed Rashid Ali',
      },
      stones: {
        title: 'Marmo e onice del Pakistan — St Werkz, Karachi',
        description:
          'Marmi e onici pakistani con nome — Ziarat White, Sunny Grey, Tavera, Black and Gold, onice verde e miele — con fasce indicative in PKR al piede quadrato, settembre 2026.',
        keywords:
          'marmo del Pakistan, Ziarat White, Sunny Grey, Tavera, Black and Gold, onice pakistano, onice verde Pakistan, onice miele, tariffa marmo PKR piede quadrato, St Werkz Karachi',
      },
      notFound: {
        title: 'Pagina non trovata — St Werkz, Karachi',
        description:
          'Questa pagina St Werkz non è in sala. Torni alla collezione di Karachi di tavoli, oggetti e superfici in pietra, o richieda una visita.',
      },
    },
    pieceTitle: (title) => `${title} — St Werkz, Karachi`,
    roomTitle: (title) => `${title} — St Werkz, Karachi`,
    pieceAlt: (title, material, viewIndex) => {
      const lowered = material.charAt(0).toLowerCase() + material.slice(1);
      const base = `${title} in ${lowered}`;
      if (viewIndex != null && viewIndex > 0) return `${base}, vista ${viewIndex + 1}`;
      return base;
    },
    pieceCite: (title, form, material, evidence, dimensions) => {
      const dim = dimensions ? ` Dimensioni: ${dimensions}.` : '';
      return `${title} è ${form} in ${material}, realizzato da St Werkz sotto la guida di Syed Rashid Ali a Karachi.${dim} Evidenza: ${evidence.toLowerCase()}.`;
    },
  },
  chrome: {
    skip: 'Vai alla collezione',
    collection: 'Collezione',
    atelier: 'Atelier',
    estimate: 'Preventivo',
    enquire: 'Richiesta',
    requestViewing: 'Richiedere una visita',
    openMenu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
    forRetailers: 'Per i rivenditori',
    forArchitects: 'Per gli architetti',
    forExport: 'Banco export',
    retailStore: 'Negozio',
    architect: 'Architetto',
    interiorDesign: 'Interior design',
    wholesalers: 'Grossisti',
    footerBrand: 'St Werkz / Karachi',
    poweredBy: 'Realizzato da',
    questions: 'Domande',
    retailers: 'Rivenditori',
    architects: 'Architetti',
    export: 'Export',
    stones: 'Pietre',
    languages: 'Lingue',
    homeAria: 'Home St Werkz',
    primaryNav: 'Navigazione principale',
  },
  hint: {
    message: 'St Werkz è scritto anche nella tua lingua.',
    action: 'Continua in {language}',
    dismiss: 'Resta in inglese',
  },
  definitions: {
    studio:
      'St Werkz è uno studio di pietra a Karachi diretto da Syed Rashid Ali. Realizza mobili, oggetti, interni e lastre in travertino, onice e marmo. La collezione è allestita in cinque sale e si mostra con visita, non si vende da un carrello. Non ci sono prezzi a parete.',
    estimate:
      'Un preventivo di studio St Werkz è una forchetta indicativa in PKR basata su misura, pietra e forma. Non è un prezzo, un preventivo chiuso né un acquisto. Ogni lastra è unica. Una visita allo studio di Karachi conferma la pietra prima che l’incarico proceda.',
    collection:
      'La collezione St Werkz sono cinque sale di pietra — pranzo, soggiorno, accenti, interni e superfici — mostrate a Karachi come una galleria. Ogni sala ha un testo a parete e opere allestite con aria intorno. Richieda una visita per vedere un pezzo di persona.',
    retailer:
      'St Werkz fornisce i rivenditori con una selezione ponderata di oggetti in marmo, onice e travertino dal suo studio di Karachi. Le collezioni di apertura si costruiscono con il negozio, non si scaricano da un magazzino. Le conversazioni commerciali iniziano con Syed Rashid Ali.',
    retailStore:
      'Il negozio St Werkz è la galleria di Karachi di oggetti in onice e marmo fatti a mano per la casa — ciotole, urne, tavoli — mostrati su visita, non venduti da un carrello.',
    architect:
      'St Werkz aiuta gli architetti a specificare travertino, onice e marmo da Karachi. Il supporto va dal primo campione alla stanza finita. Porti un brief o una domanda di materia a Syed Rashid Ali.',
    interiorDesigner:
      'St Werkz lavora con gli interior designer su oggetti fatti a mano e lastre per stanze arredate. Specifichi un tavolo, un’urna, un banco o un muro dallo stesso studio di Karachi.',
    export:
      'St Werkz discute lotti di marmo, onice e travertino dal cantiere di Karachi con importatori e laboratori. Un lotto fotografato e una cassa di campioni arrivano prima di un container. Non c’è un listino pubblicato. Syed Rashid Ali prende la conversazione. I mobili restano in galleria.',
    origin:
      'St Werkz affonda in una famiglia di Bandha, ad Allahabad, Uttar Pradesh. Generazioni di migrazione hanno portato musica, pittura, colore e mestiere; quel rapporto ereditato con il fare prende ora forma in marmo, onice e travertino a Karachi.',
    piece: (title, material, form, roomTitle) =>
      `${title} è un’opera St Werkz in ${material}, della sala ${roomTitle} a Karachi. ${form}.`,
    room: (title, wallText) => `${title} è una sala della collezione St Werkz a Karachi. ${wallText}`,
  },
  home: {
    heroKicker: 'Karachi / uno studio di materia',
    heroTitle: 'Pietra a grande scala. Scolpita per uno.',
    heroBody:
      'Da oggetti singolari fatti a mano per la casa alla fornitura all’ingrosso di marmo e alle superfici architettoniche in volume.',
    enterCollection: 'Entra nella collezione',
    studioEstimate: 'Preventivo di studio',
    requestViewing: 'Richiedere una visita',
    walkIn: 'Entra',
    onView: (count) => `In sala / ${count} opere`,
    roomsHeadingBefore: 'Cinque sale di pietra, allestite come una ',
    roomsHeadingEm: 'galleria.',
    questionsLink: 'Domande, risposte chiare',
    featuredCaption: 'Plinto in onice luminoso / Soggiorno e luce',
    studioKicker: 'Lo studio',
    studioBody: (name) =>
      `St Werkz è diretto da ${name} dallo studio di Karachi. Per un primo incontro con un tavolo, un lavabo o una lastra, richieda una visita — non un pagamento in rete.`,
    diningAmong: (dining, total) => `${dining} opere da pranzo, tra ${total} della collezione`,
    beginEstimate: 'Iniziare da un preventivo di studio',
    requestViewingCta: 'Richiedere una visita',
    works: (count) => `${count} opere`,
    heroAlt: 'Artigianato in pietra pakistana in onice ambrato, marmo nero e marmo venato d’oro, St Werkz Karachi',
    secondStillAlt: 'Tavolino in onice bianco retroilluminato che brilla in un soggiorno, St Werkz Karachi',
    journeysKicker: 'Chi siete / dove andare',
    journeysTitleBefore: 'Tre percorsi nello ',
    journeysTitleEm: 'studio.',
    journeysBody:
      'Vedete come collezionisti, architetti e partner all’ingrosso entrano in St Werkz — poi scegliete la porta che vi riguarda.',
    journeysVideoLabel: 'Percorsi St Werkz: tre ingressi nello studio di Karachi',
    journeysCaptionsLabel: 'Sottotitoli in inglese',
    journeysCollectorName: 'Il collezionista',
    journeysCollectorBody: 'Un pezzo singolare per la casa. Oggetti fatti a mano, mostrati come galleria.',
    journeysCollectorCta: 'Entra nella collezione',
    journeysVisionaryName: 'Il visionario',
    journeysVisionaryBody: 'Oggetti e lastre per grandi spazi — architetti e interior designer.',
    journeysVisionaryCta: 'Per gli architetti',
    journeysStrategistName: 'Lo stratega',
    journeysStrategistBody: 'Fornitura all’ingrosso e logistica — lastre, volume e il desk export.',
    journeysStrategistCta: 'Desk export',
  },
  collection: {
    kicker: 'La collezione / cinque sale',
    titleBefore: 'Percorra le ',
    titleEm: 'sale.',
    roomLine: (roman, count) => `Sala ${roman} / ${count} opere`,
    enterRoom: 'Entra in questa sala',
    roomNotHung: 'Questa sala non è allestita.',
    returnCollection: 'Torna alla collezione',
    workNotOnView: 'Questa opera non è in sala.',
    stone: 'Pietra',
    form: 'Forma',
    dimensions: 'Dimensioni',
    sameRoom: 'Nella stessa sala',
    otherWorks: 'Altre opere',
    requestViewing: 'Richiedere una visita',
    estimateSimilar: 'Preventivare un pezzo simile',
    citeWork: 'Cita quest’opera',
    maker: 'Autore',
    studio: 'Studio',
    stoneFamily: 'Famiglia di pietra',
    finish: 'Finitura',
    evidence: 'Evidenza',
    reviewed: 'Revisionato',
    studioCity: 'St Werkz, Karachi',
  },
  atelier: {
    kicker: 'Un punto di vista materiale',
    titleBefore: 'La buona pietra ha una sua ',
    titleEm: 'gravità.',
    originKicker: 'Da dove viene il lavoro',
    originTitleBefore: 'Una famiglia che ha portato il ',
    originTitleEm: 'colore.',
    howKicker: 'Come lavoriamo',
    howTitleBefore: 'Da un’idea aperta a qualcosa che ',
    howTitleEm: 'resta.',
    materialsKicker: 'Le pietre che lavoriamo',
    materialsTitleBefore: 'Travertino, onice e ',
    materialsTitleEm: 'marmo.',
    namedStonesKicker: 'Pakistan / pietre nominate',
    namedStonesBody:
      'Nomi commerciali da Buner, Mohmand, Swat, Lasbela e dalla fascia di onice di Chagai, con tariffe indicative della materia del settembre 2026. Non è un preventivo per un pezzo finito.',
    namedStonesCta: 'Tutti i nomi e le tariffe',
    personKicker: 'La persona dietro lo studio',
    personTitleBefore: 'Una linea diretta con ',
    personTitleEm: 'la fonte.',
    personBody: (name) =>
      `St Werkz è diretto da ${name}. Per domande di materia, conversazioni di progetto o un primo incontro con un’opera della collezione, è lui la persona da chiamare.`,
    studioEstimate: 'Preventivo di studio',
    requestViewing: 'Richiedere una visita',
    process: [
      {
        name: 'Ascoltare prima',
        text: 'Ci parli della stanza, della luce e di come vuole che lo spazio si senta.',
      },
      {
        name: 'Trovare il taglio giusto',
        text: 'Guardiamo oltre l’ovvio: tono, grana, scala, bordo e come la pietra invecchierà.',
      },
      {
        name: 'Una prima forchetta',
        text: 'Se ha già una misura in mente, un preventivo di studio dà una banda indicativa — mai un prezzo finale.',
      },
      {
        name: 'Renderlo reale',
        text: 'Campioni, indicazioni oneste e un percorso chiaro dalla prima conversazione all’installazione.',
      },
    ],
    counterAlt: 'Banco espositivo in travertino con luce dal basso',
    assemblageAlt: 'Tavolo ovale in travertino crema in laboratorio',
    faqKicker: 'Domande / risposte chiare',
    faqTitleBefore: 'Quello che si chiede allo ',
    faqTitleEm: 'studio.',
    faqIntro:
      'Risposte brevi, scritte per essere lette ad alta voce. Se la domanda riguarda un’opera precisa, richieda una visita.',
  },
  enquire: {
    kicker: 'Richiedere una visita',
    kickerFromEstimate: 'Richiedere questo preventivo',
    titleBefore: 'Si comincia da ',
    titleEm: 'una domanda.',
    body: 'Ci dica quale opera vorrebbe vedere, o descriva la stanza. Syed Rashid Ali prenderà la nota. È una conversazione di studio — non un carrello.',
    bodyFromEstimate:
      'Il brief del suo preventivo di studio è sulla scrivania. Syed Rashid Ali prenderà la nota: resta una conversazione, non un carrello.',
    rangeNoted: (range) => `Forchetta indicativa annotata: ${range}. `,
    viewingConfirms: 'Una visita conferma ancora la pietra.',
    reviseEstimate: 'Rivedere il preventivo',
    currentlyAsking: (title) => `In questo momento si chiede di ${title}`,
    viewWork: 'Vedi l’opera',
    name: 'Il suo nome',
    namePlaceholder: 'Come dobbiamo rivolgerci a lei?',
    email: 'Indirizzo e-mail',
    emailPlaceholder: 'Dove possiamo rispondere?',
    whatToSee: 'Cosa vorrebbe vedere?',
    briefing: 'Il brief',
    messagePlaceholder: 'Un tavolo, una stanza, una lastra — o semplicemente un orario per visitare.',
    viewingOf: (title) => `Vorrei richiedere una visita di ${title}.`,
    send: 'Invia la richiesta',
    successTitle: 'La sua nota è sulla scrivania.',
    successBody: 'Grazie. Per una risposta più rapida, può anche scrivere direttamente allo studio.',
    emailStudio: 'Scrivi allo studio',
    howKicker: 'Come richiedere una visita',
    howTitleBefore: 'Quattro passi, poi la ',
    howTitleEm: 'pietra.',
    howToName: 'Come richiedere una visita da St Werkz',
    howToDescription:
      'Richieda una visita di mobili, oggetti o lastre in pietra allo studio St Werkz di Karachi. È una conversazione di studio, non un acquisto in rete.',
    steps: [
      {
        number: '01',
        name: 'Scelga un’opera, o descriva la stanza',
        text: 'Percorra la collezione e nomini il pezzo che vuole vedere, o racconti allo studio la stanza, la luce e la superficie di cui ha bisogno.',
      },
      {
        number: '02',
        name: 'Opzionale: un preventivo di studio',
        text: 'Se ha già una misura in mente, un preventivo di studio restituisce una forchetta indicativa in PKR. Non è un prezzo né un acquisto.',
      },
      {
        number: '03',
        name: 'Invii una nota allo studio',
        text: 'Usi il modulo di richiesta, scriva a stoneworks014@gmail.com o chiami il +92 304 7689678. Syed Rashid Ali riceve il messaggio.',
      },
      {
        number: '04',
        name: 'Veda la pietra a Karachi',
        text: 'Visiti Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad, Karachi. Una visita conferma la lastra prima di commissionare o riservare.',
      },
    ],
  },
  offices: {
    heading: 'Uffici',
    headingLong: 'Desk internazionali',
    intro:
      'Lo studio è a Karachi. Desk a New York, Barcellona, Kuala Lumpur e Dubai — scriva alla casa e la indirizzeremo alla conversazione più vicina.',
    studioLabel: 'Studio',
    places: {
      karachi: {
        city: 'Karachi',
        country: 'Pakistan',
        address: 'Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad',
      },
      'new-york': { city: 'New York', country: 'Stati Uniti', address: 'Long Island' },
      barcelona: { city: 'Barcellona', country: 'Spagna', address: 'Passeig de Gràcia' },
      'kuala-lumpur': { city: 'Kuala Lumpur', country: 'Malesia', address: '' },
      dubai: { city: 'Dubai', country: 'Emirati Arabi Uniti', address: '' },
    },
  },
  shipping: shippingCopy.it,
  estimate: {
    kicker: 'Preventivo di studio / solo indicativo',
    titleBefore: 'Una prima forchetta, prima della ',
    titleEm: 'lastra.',
    takingAsStart: (title) => `Prendendo ${title} come punto di partenza.`,
    viewWork: 'Vedi l’opera',
    whatCommissioning: '01 / Cosa sta commissionando?',
    stoneFamily: '02 / Famiglia di pietra',
    finish: '03 / Finitura',
    shape: '04 / Forma',
    dimensions: '05 / Dimensioni',
    dimensionUnits: 'Unità di misura',
    inches: 'pollici',
    diameter: (unit) => `Diametro (${unit})`,
    length: (unit) => `Lunghezza (${unit})`,
    width: (unit) => `Larghezza (${unit})`,
    depthHeight: (unit) => `Profondità / altezza (${unit})`,
    thickness: (unit) => `Spessore (${unit})`,
    planArea: (area, summary) => `Area in pianta ${area} · ${summary}`,
    notes: '06 / Note — opzionale',
    notesPlaceholder: 'La stanza, la luce, un bordo che già immagina…',
    needsOnyx: 'Richiede onice o pietra mista',
    indicativeRange: 'Forchetta indicativa di studio',
    waitingSize: 'In attesa di una misura plausibile.',
    giveSize: 'Dia al pezzo una misura plausibile per vedere una forchetta.',
    piece: 'Pezzo',
    stoneArea: 'Area di pietra',
    lead: 'Tempi',
    notFinal:
      'Questo non è un prezzo finale. Basi, illuminazione, consegna e la lastra particolare possono spostare la cifra — a volte di molto.',
    requestThis: 'Richiedere questo preventivo',
    howKicker: 'Come stimiamo',
    howTitle: 'Bande trasparenti, non un catalogo.',
    howP1:
      'Non c’è un elenco ufficiale di SKU su questo sito. La forchetta è una banda di studio dalla classe di pietra e dall’area (e, per lavabi e oggetti, da una quota del volume d’ingombro), poi allargata per scarto di taglio, finitura e quanto mestiere il pezzo di solito chiede.',
    howP2: (rate) =>
      `Il travertino sta sotto il marmo; l’onice, soprattutto retroilluminato, sopra. Piante rotonde e ovali assumono più scarto di un rettangolo. Uno spessore oltre un semplice piano aggiunge movimentazione. Il PKR è la cifra nativa. L’USD è mostrato a ${rate} PKR per dollaro — un tasso di conversazione, non una quotazione bancaria.`,
    howP3: 'Il numero è una prima conversazione. Syed Rashid Ali conferma la pietra di persona.',
    writeWithoutRange: 'O scrivere senza una forchetta',
    indicative: 'Indicativo',
    commissions: {
      'dining-table': { label: 'Tavolo da pranzo', note: 'Un piano per riunirsi' },
      'coffee-table': { label: 'Tavolino da salotto', note: 'Basso, per il soggiorno' },
      'side-table': { label: 'Tavolino d’appoggio', note: 'Accento o compagno' },
      counter: { label: 'Banco / plinto', note: 'Reception o bar' },
      slab: { label: 'Lastra / piano', note: 'Il taglio prima della stanza' },
      sink: { label: 'Lavabo da appoggio', note: 'Un vaso come scultura' },
      object: { label: 'Oggetto', note: 'Ciotola, vassoio, vaso' },
    },
    stones: {
      travertine: { label: 'Travertino', note: 'Poroso, calmo, architettonico' },
      marble: { label: 'Marmo', note: 'Figurato, spesso di alta lucidatura' },
      onyx: { label: 'Onice', note: 'Traslucido, guidato dalla vena' },
      mixed: { label: 'Misto', note: 'Pietra con metallo o un secondo taglio' },
    },
    finishes: {
      honed: { label: 'Levigato', note: 'Opaco, morbido al tatto' },
      polished: { label: 'Lucidato', note: 'Uno specchio quieto' },
      backlit: { label: 'Retroilluminato', note: 'Per onice traslucido' },
    },
    shapes: {
      round: 'Rotondo',
      oval: 'Ovale',
      rectangle: 'Rettangolo',
      custom: 'Su misura',
    },
    leads: {
      onyx:
        'Si realizza in base alla disponibilità della lastra — di solito da quattordici a venti settimane dopo aver riservato la pietra. L’abbinamento delle vene e l’illuminazione danno il ritmo.',
      slab: 'Le lastre di cantiere si possono riservare prima; taglio e finitura seguono la faccia scelta — spesso da quattro a otto settimane.',
      object: 'Le opere più piccole seguono il blocco in mano — di solito da quattro a dieci settimane dopo aver concordato la pietra.',
      counter:
        'I pezzi architettonici attendono la lastra e il cantiere — spesso da dieci a sedici settimane dopo la conferma di pietra e disegni.',
      table:
        'Si realizza in base alla disponibilità della lastra — di solito da otto a quattordici settimane dopo aver riservato la pietra. Una visita conferma la lastra.',
    },
    finishFallback: 'Lucidato (la retroilluminazione chiede onice)',
  },
  retailers: {
    heroKicker: 'ST WERKZ / PER I RIVENDITORI',
    heroTitleBefore: 'Pezzi a cui si ',
    heroTitleEm: 'ritorna.',
    heroCta: 'Aprire una conversazione commerciale',
    heroAlt: 'Accessori da bagno in travertino disposti come collezione',
    pointKicker: 'PER NEGOZI CON UN PUNTO DI VISTA',
    pointTitleBefore: 'Uno scaffale deve avere un ',
    pointTitleEm: 'punto di vista.',
    steps: [
      {
        number: '01',
        title: 'Una prima selezione ponderata',
        body: 'Si parta da un gruppo coerente di oggetti, non da un magazzino di forse.',
      },
      {
        number: '02',
        title: 'Forme con cui si vive',
        body: 'I pezzi utili portano più lontano il racconto: un set da bagno, una scatola, una ciotola, un posto dove posare le cose.',
      },
      {
        number: '03',
        title: 'Una relazione che si ripete',
        body: 'Resti vicino allo studio mentre i suoi clienti le dicono cosa vogliono dopo.',
      },
    ],
    editKicker: 'UNA SELEZIONE PRONTA PER IL NEGOZIO / 04 PUNTI DI PARTENZA',
    editTitleBefore: 'I pezzi che si ',
    editTitleEm: 'notano.',
    editBody:
      'Alcune direzioni dalla collezione più ampia di St Werkz. Possiamo costruire la prima selezione giusta per il suo pavimento.',
    contactKicker: 'UNA LINEA DIRETTA / KARACHI',
    contactTitleBefore: 'Costruiamo uno ',
    contactTitleEm: 'scaffale migliore.',
    contactBody: 'Ci parli del suo negozio, del cliente che serve e del tipo di collezione che vuole mettere davanti a loro.',
    contactCard: 'CONTATTA ST WERKZ',
    emailStudio: 'Scrivi allo studio',
    startConversation: 'Inizia una conversazione',
    enquire: 'Richiedi',
    productEnquire: 'Richiedi',
    footerTag: 'Superfici con un punto di vista.',
    backToTop: 'Torna in cima',
    products: [
      { slug: 'coral-canister', name: 'Barattolo in travertino con coperchio di corallo', note: 'Accenti scultorei' },
      { slug: 'travertine-bath', name: 'Set da bagno in travertino', note: 'Lusso quotidiano e quieto' },
      { slug: 'portoro-bookends', name: 'Fermalibri Portoro', note: 'Scrivania e soggiorno' },
      { slug: 'desk-suite', name: 'Set da scrivania in marmo di mezzanotte', note: 'Utile, elevato' },
    ],
    navArchitects: 'Architetti e designer',
  },
  architects: {
    heroKicker: 'ST WERKZ / PER ARCHITETTI',
    heroTitleBefore: 'Pietra con un ',
    heroTitleEm: 'punto di vista.',
    heroCta: 'Parlare di un progetto',
    heroAlt: 'Lavabo da appoggio in marmo scuro con venature oro e bianco',
    pointKicker: 'PER CHI DISEGNA LA STANZA',
    pointTitleBefore: 'La pietra giusta cambia la ',
    pointTitleEm: 'conversazione.',
    steps: [
      {
        number: '01',
        title: 'Fornitura con contesto',
        body: 'Guardiamo tono, grana, scala e come una superficie vivrà con il resto della stanza.',
      },
      {
        number: '02',
        title: 'Campioni che muovono il brief',
        body: 'Porti una domanda di materia. La aiutiamo a passare da una sensazione a qualcosa da mettere davanti a un cliente.',
      },
      {
        number: '03',
        title: 'Una linea diretta con lo studio',
        body: 'Nessuno strato tra la domanda e chi la aiuta a trovare il pezzo giusto.',
      },
    ],
    editKicker: 'DIREZIONI DI MATERIA / PER IL SUO PROSSIMO BRIEF',
    editTitleBefore: 'Si parte dalla ',
    editTitleEm: 'superficie.',
    editBody: 'Lavabo, oggetto o accento architettonico: ogni direzione inizia da ciò che il materiale sta cercando di dire.',
    samples: 'Campioni e conversazioni di progetto benvenuti',
    bringBrief: 'Porti un brief',
    contactKicker: 'UNA LINEA DIRETTA / KARACHI',
    contactTitleBefore: 'Specifichiamo qualcosa che ',
    contactTitleEm: 'resti.',
    contactBody:
      'Ci parli della stanza, del brief o della domanda di materia. Partiremo dalla conversazione giusta, non da un dump di catalogo.',
    products: [
      { slug: 'vessel-sink', name: 'Lavabo da appoggio noir e oro', note: 'Piano / bagno' },
      { slug: 'onyx-waterfall', name: 'Cascata in onice retroilluminato', note: 'Un primo dettaglio forte' },
      { slug: 'emerald-cage-table', name: 'Tavolino gabbia smeraldo', note: 'Mobilio / pezzo protagonista' },
      { slug: 'onyx-urns', name: 'Coppia di urne in onice', note: 'Oggetto / accento' },
    ],
    navRetailers: 'Rivenditori',
  },
  tiles: {
    heroKicker: 'ST WERKZ / PER INTERIOR DESIGNER',
    heroTitleBefore: 'Oggetti e lastre ',
    heroTitleEm: 'per la stanza.',
    heroCta: 'Parlare di un interno',
    heroAlt: 'Tavolino in onice bianco retroilluminato che brilla in un soggiorno, St Werkz Karachi',
    pointKicker: 'PER CHI ARREDA LA STANZA',
    pointTitleBefore: 'Una stanza ha bisogno di ',
    pointTitleEm: 'oggetto e superficie.',
    steps: [
      { number: '01', title: 'Oggetti che tengono lo schema', body: 'Urne, ciotole, tavoli e lavabi — i pezzi con cui il cliente vive, specificati con la stessa cura dell’architettura.' },
      { number: '02', title: 'Lastre alla scala della stanza', body: 'Banchi, bordi a cascata e pareti dal cantiere di Karachi, accordati con gli oggetti già nel brief.' },
      { number: '03', title: 'Una sola conversazione di studio', body: 'Artigianato e superfici in volume dallo stesso banco. Porti un’atmosfera, un disegno o una domanda di materia.' },
    ],
    editKicker: 'DIREZIONI / OGGETTI + SUPERFICI',
    editTitleBefore: 'Arredare la ',
    editTitleEm: 'pietra.',
    editBody: 'Si parta da un pezzo che la stanza terrà, o da una superficie intorno a cui si costruisce. Entrambi appartengono alla stessa conversazione.',
    samples: 'Campioni, oggetti e conversazioni di progetto benvenuti',
    bringBrief: 'Porti un brief d’interno',
    contactKicker: 'UNA LINEA DIRETTA / KARACHI',
    contactTitleBefore: 'Arrediamo la stanza ',
    contactTitleEm: 'in pietra.',
    contactBody: 'Ci parli dell’interno — gli oggetti, le lastre, la luce. Partiremo dalla conversazione giusta, non da un dump di catalogo.',
    products: [
      { slug: 'onyx-urns', name: 'Coppia di urne in onice', note: 'Oggetto / accento' },
      { slug: 'luminous-onyx', name: 'Plinto in onice luminoso', note: 'Soggiorno / luce' },
      { slug: 'onyx-waterfall', name: 'Cascata in onice retroilluminato', note: 'Superficie / pezzo' },
      { slug: 'hotel-reception', name: 'Reception in travertino', note: 'Pietra a scala di stanza' },
    ],
    navArchitects: 'Architetto',
  },
  retailStore: {
    kicker: 'Negozio / Karachi',
    titleBefore: 'Un pezzo singolare ',
    titleEm: 'per la casa.',
    body: 'Oggetti in onice e marmo fatti a mano — ciotole, urne, tavoli — allestiti come una galleria. Percorra le sale, poi richieda una visita. È una conversazione di studio, non un carrello.',
    enterCollection: 'Entra nella collezione',
    requestViewing: 'Richiedere una visita',
    pathKicker: 'Come un pezzo lascia lo studio',
    pathTitleBefore: 'Scoprire, percorrere, ',
    pathTitleEm: 'poi vederlo.',
    steps: [
      { number: '01', title: 'Scoprire', body: 'Percorra le cinque sale — pranzo, soggiorno, accenti, interni e lastre — come una galleria quieta.' },
      { number: '02', title: 'Percorrere le sale', body: 'Apri un’opera, leggi la pietra e resti con la forma prima di chiedere un orario.' },
      { number: '03', title: 'Richiedere una visita', body: 'Nomini il pezzo o la sala. Syed Rashid Ali prende la nota e conferma la pietra a Karachi.' },
    ],
    featuredKicker: 'In sala',
    featuredTitleBefore: 'Opere con cui si ',
    featuredTitleEm: 'vive.',
    featuredBody: 'Uno sguardo a oggetti e tavoli della collezione. Apra un pezzo, poi richieda una visita.',
    heroAlt: 'Oggetti pakistani in onice e marmo per la casa, St Werkz Karachi',
  },
  exportDesk: desks.it,
  stonesIndex: stoneIndexes.it,
  notFound: {
    title: 'Questa pagina non è in sala.',
    body: 'Torni alla collezione St Werkz di marmo, travertino e onice a Karachi, o richieda una visita.',
    cta: 'Percorra le sale',
  },
  faqs: [
    {
      id: 'what-stoneworks-makes',
      question: 'Cosa realizza St Werkz?',
      answer:
        'St Werkz realizza mobili, oggetti, interni e lastre in pietra a Karachi. La collezione comprende tavoli da pranzo, tavolini, accenti scultorei, banchi architettonici e lastre di cantiere, tagliati in travertino, onice e marmo. Le opere si mostrano come galleria. Richieda una visita per vedere un pezzo di persona.',
    },
    {
      id: 'where-located',
      question: 'Dove si trova St Werkz?',
      answer:
        'St Werkz si trova a Karachi, Pakistan, in Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad, Karachi. Syed Rashid Ali dirige lo studio. Scriva a stoneworks014@gmail.com o chiami il +92 304 7689678 per richiedere una visita o parlare di un progetto. Lo studio è il punto di partenza per famiglie, architetti e rivenditori.',
    },
    {
      id: 'who-leads',
      question: 'Chi dirige St Werkz?',
      answer:
        'Syed Rashid Ali dirige St Werkz, lo studio di pietra di Karachi. Accoglie domande di materia, conversazioni di progetto e richieste di visita. Chiami il +92 304 7689678 o scriva a stoneworks014@gmail.com. Lo studio è in Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad, Karachi.',
    },
    {
      id: 'custom-or-collection',
      question: 'St Werkz realizza pezzi su misura o solo la collezione?',
      answer:
        'St Werkz mostra una collezione di opere finite e accetta anche commissioni. Le cinque sale — pranzo, soggiorno, accenti, interni e superfici — sono pezzi che può chiedere di vedere. Se le serve un tavolo, un lavabo o una lastra simile, inizi da un preventivo di studio. Una visita conferma ancora la pietra.',
    },
    {
      id: 'how-to-view',
      question: 'Come si richiede una visita da St Werkz?',
      answer:
        'Per richiedere una visita da St Werkz, apra la pagina di richiesta, nomini un’opera o descriva la stanza, e invii una nota. Syed Rashid Ali riceve il messaggio. Può anche scrivere a stoneworks014@gmail.com o chiamare il +92 304 7689678. È una conversazione di studio, non un acquisto in rete.',
    },
    {
      id: 'materials',
      question: 'Quali materiali usa St Werkz?',
      answer:
        'St Werkz lavora travertino, onice e marmo. Il travertino è di solito levigato, con grana lineare per tavoli e bordi architettonici. L’onice è spesso lucidato e a volte retroilluminato perché la lastra brilli. Il marmo compare in crema, salvia, portoro e nero con venature oro o bianche. Ogni scheda nomina la pietra.',
    },
    {
      id: 'service-area',
      question: 'St Werkz lavora solo a Karachi?',
      answer:
        'St Werkz ha sede a Karachi, Pakistan, e lavora da quello studio con famiglie, architetti, interior designer e rivenditori. I progetti di solito iniziano con una visita o una conversazione di materia a Karachi. Le note a distanza sono benvenute per e-mail o telefono, poi si confermano di persona quando la pietra va vista.',
    },
    {
      id: 'lead-times',
      question: 'Quanto tempo richiede un pezzo su commissione?',
      answer:
        'I tempi seguono la pietra. Oggetti e lavabi richiedono di solito da quattro a dieci settimane dopo aver concordato il blocco. I tavoli, da otto a quattordici settimane dopo aver riservato la lastra. L’onice retroilluminato chiede spesso da quattordici a venti settimane. I banchi architettonici, da dieci a sedici. Una visita conferma la pietra.',
    },
    {
      id: 'origin',
      question: 'Da dove viene St Werkz?',
      answer:
        'St Werkz affonda in una famiglia di Bandha, ad Allahabad, Uttar Pradesh. La migrazione ha portato musica, pittura e colore nella generazione successiva. Quel rapporto ereditato con l’arte prende ora forma in marmo, onice e travertino nello studio di Karachi diretto da Syed Rashid Ali.',
    },
    {
      id: 'prices',
      question: 'St Werkz pubblica i prezzi in rete?',
      answer:
        'St Werkz non pubblica prezzi sulla parete della collezione né in rete. Un preventivo di studio dà una forchetta indicativa da misura, pietra e forma — mai un prezzo finale. Dopo il preventivo, richieda una visita perché la pietra sia confermata di persona. Contatti Syed Rashid Ali per continuare.',
    },
    {
      id: 'pakistan-stones',
      question: 'Quali marmi e onici sono disponibili in Pakistan?',
      answer:
        'In Pakistan si estraggono marmi come Ziarat White, Sunny Grey, Tavera, Badal e Black and Gold, oltre a onice verde, miele, bianca e, più rare, rosa o azzurra del Belucistan. La pagina delle pietre riporta tariffe indicative in PKR al piede quadrato di settembre 2026: fasce di materiale, non il prezzo di un pezzo finito. Una visita a Karachi conferma la lastra.',
    },
    {
      id: 'retailers',
      question: 'St Werkz lavora con i rivenditori?',
      answer:
        'Sì. St Werkz fornisce i rivenditori con una selezione ponderata di oggetti in marmo, onice e travertino dal suo studio di Karachi. Le collezioni di apertura si costruiscono con il negozio, non si scaricano da un magazzino. Le conversazioni commerciali iniziano con Syed Rashid Ali nello studio di North Nazimabad.',
    },
    {
      id: 'architects',
      question: 'St Werkz lavora con architetti e interior designer?',
      answer:
        'Sì. St Werkz aiuta architetti e interior designer a specificare travertino, onice e marmo da Karachi. Il supporto va dal primo campione alla stanza finita. Porti un brief o una domanda di materia a Syed Rashid Ali. Campioni e conversazioni di progetto sono benvenuti.',
    },
  ],
  rooms: {
    marble: {
      title: 'Tavola e convivio',
      kicker: 'Tavoli che tengono una conversazione',
      wallText:
        'Travertino ovale, pietra nera con movimento d’oro, onice salvia: superfici abbastanza grandi da riunirsi intorno. Questi pezzi si specificano come il centro quieto di una stanza, non come un set da catalogo.',
      description:
        'Tavoli da pranzo in travertino, onice e marmo di St Werkz, Karachi — pedane ovali, noir e oro, e pezzi di convivio in salvia, mostrati come una sala di galleria.',
    },
    onyx: {
      title: 'Soggiorno e luce',
      kicker: 'Tavolini bassi, d’appoggio, bagliore',
      wallText:
        'Tavolini da salotto e d’appoggio in onice, travertino e marmo. Alcuni sono retroilluminati. Altri poggiano su gabbie di ottone o steli a tulipano. Tutti sono fatti per stare nella luce e cambiare con essa.',
      description:
        'Tavolini da salotto, d’appoggio e onice retroilluminato di St Werkz, Karachi — Soggiorno e luce, una sala di tavoli bassi, gabbie di ottone e steli a tulipano.',
    },
    limestone: {
      title: 'Accenti scultorei',
      kicker: 'Oggetti per lo scaffale e il bagno',
      wallText:
        'Ciotole, vasi, vassoi, candelieri e un lavabo da appoggio: opere più piccole dalle stesse pietre. Ognuna è finita come pezzo a sé, non come un dopo-pensiero del mobile.',
      description:
        'Oggetti scultorei in pietra di St Werkz, Karachi — ciotole, vassoi, lavabi da appoggio, candelieri e pezzi da bagno in travertino, onice e marmo.',
    },
    interiors: {
      title: 'Interni e atmosfere',
      kicker: 'La pietra come architettura',
      wallText:
        'Banchi reception, plinti con luce dal basso e bordi a cascata. Queste fotografie registrano la pietra alla scala di una hall o di una stanza: ferma, essenziale, fatta per essere girata intorno.',
      description:
        'Pietra architettonica di St Werkz, Karachi — banchi reception, plinti con luce dal basso e bordi a cascata in onice retroilluminato alla scala di una hall o di una stanza.',
    },
    slabs: {
      title: 'Superfici e lastre',
      kicker: 'Il materiale prima della stanza',
      wallText:
        'Lastre e piani in cantiere: marmo nero con vene di fulmine bianco, un disco circolare a figura d’oro. Questa è la pietra prima di diventare tavolo — il taglio da cui si trae il resto della collezione.',
      description:
        'Lastre e piani dal cantiere St Werkz a Karachi — marmo nero con vene di fulmine e dischi circolari a figura d’oro prima che diventino tavoli.',
    },
      handicrafts: {
      title: 'Superfici e lastre',
      kicker: 'Il materiale prima della stanza',
      wallText:
        'Lastre e piani in cantiere: marmo nero con vene di fulmine bianco, un disco circolare a figura d’oro. Questa è la pietra prima di diventare tavolo — il taglio da cui si trae il resto della collezione.',
      description:
        'Lastre e piani dal cantiere St Werkz a Karachi — marmo nero con vene di fulmine e dischi circolari a figura d’oro prima che diventino tavoli.',
    },
    
  },
  pieces: {
    'oval-travertine-pedestal': {
      title: 'Tavolo a pedana ovale in travertino',
      material: 'Travertino beige levigato',
      form: 'piano da pranzo ellittico su un peduccio conico in pietra',
      note: 'Un ovale lungo di travertino a vena lineare, abbastanza spesso da leggersi come architettura, su un solo piede conico. Fotografato con sedie miste in un appartamento di città: la pietra tiene la stanza senza chiedere ornamento.',
    },
    'oval-travertine-assemblage': {
      title: 'Assemblaggio ovale in travertino',
      material: 'Travertino crema levigato',
      form: 'piano ovale su pedane in pietra a X che si intersecano',
      note: 'Visto in laboratorio, ancora su tavola di protezione. Due cavalletti pesanti in pietra — uno incrociato, uno planare — portano un ovale a bordo arrotondato. Uno studio di come le lastre diventano gambe.',
    },
    'noir-gold-dining': {
      title: 'Tavolo da pranzo noir e oro',
      material: 'Marmo nero lucidato con venature oro',
      form: 'piano da pranzo rettangolare con angoli arrotondati, sedie imbottite',
      note: 'Una superficie scura di alta lucidatura spezzata da fulmini minerali caldi. Allestito con un anello di sedie beige a schienale avvolgente: un tavolo di convivio che si comporta come un cielo notturno sotto vetro.',
    },
    'portoro-slat-dining': {
      title: 'Tavolo da pranzo Portoro a stecche',
      material: 'Marmo noir lucidato con venature ambra, base in oro spazzolato',
      form: 'piano rettangolare su un ventaglio di stecche verticali dorate',
      note: 'La pietra è quasi nera, poi d’improvviso oro. La base è una fila disciplinata di lame dorate che si raccolgono a terra. Fatto per stanze che sanno già stare in silenzio.',
    },
    'cream-gathering-table': {
      title: 'Tavolo di convivio in pietra crema',
      material: 'Marmo o onice crema lucidato con movimento sabbioso',
      form: 'rettangolo lungo arrotondato con sedie miste terracotta e crema',
      note: 'Un piano pallido e vorticoso che si legge caldo più che bianco. Le sedie si spezzano in terracotta e crema: una sala da pranzo composta come una natura morta, non come un servizio abbinato.',
    },
    'sage-round-table': {
      title: 'Tavolo tondo salvia',
      material: 'Onice o marmo salvia lucidato',
      form: 'piano circolare da pranzo o caffè, natura morta di lifestyle',
      note: 'Visto dall’alto, con una sedia terracotta tesa sotto il bordo. Vetro, una sola foglia, una ciotola crema. La pietra è un verde smorzato, finemente venato: un tavolo per due, o da guardare.',
    },
    'sage-onyx-organza': {
      title: 'Tavolo organza in onice salvia',
      material: 'Onice verde traslucido lucidato',
      form: 'ovale a rene su due pedane esagonali sfaccettate',
      note: 'Un pezzo monumentale di laboratorio: pietra verde morbida con venature ruggine e ocra, il piano organicamente strozzato, le gambe tagliate come colonne esagonali gemelle. Ancora su compensato, già un’opera finita.',
    },
    'travertine-round-dining': {
      title: 'Tavolo da pranzo tondo in travertino',
      material: 'Travertino crema levigato',
      form: 'piano circolare su un peduccio conico rastremato',
      note: 'Lo stesso linguaggio della pedana ovale, ridotto a un cerchio. Sedie imbottite, un muro terracotta, un piccolo vaso in pietra di fiori secchi. Il pranzo come interno fermo.',
    },
    'luminous-onyx-plinth': {
      title: 'Plinto in onice luminoso',
      material: 'Onice bianco retroilluminato con venature ambra, telaio in metallo nero',
      form: 'tavolino quadrato, illuminato dall’interno',
      note: 'Onice crema traslucido, venature d’oro, illuminato dall’interno finché la lastra diventa lampada. Una vista su un tappeto costolato con libri e una candela; un’altra in un interno notturno, la città dietro. Mobile che si comporta come luce.',
    },
    'emerald-cage-table': {
      title: 'Tavolino gabbia smeraldo',
      material: 'Onice verde salvia lucidato, base gabbia in ottone',
      form: 'tavolino tondo su un tamburo di aste verticali',
      note: 'Un piano circolare in onice con movimento ruggine e crema, tenuto da una gabbia leggera in ottone. Pietra pesante, metallo sottile: il contrasto abituale di St Werkz, alla scala di un bicchiere.',
    },
    'sage-tulip-table': {
      title: 'Tavolino tulipano salvia',
      material: 'Onice verde lucidato, pedana in metallo spazzolato',
      form: 'tavolino d’accento tondo su uno stelo a tulipano',
      note: 'La stessa famiglia di onice verde, questa volta su un piede metallico di metà secolo. Salvia, crema e terracotta nella pietra; un solo stelo sotto. Un accento che può stare da solo.',
    },
    'cream-companion-tables': {
      title: 'Tavolini compagni in crema',
      material: 'Pietra crema lucidata, ottone satinato',
      form: 'coppia: pedana monolitica e tavolino a stelo in ottone',
      note: 'Due piani circolari dalla stessa pietra pallida. Uno su un tamburo rastremato in pietra; l’altro su uno stelo sottile in ottone e un disco. Una coppia pensata per essere letta insieme, come due note.',
    },
    'travertine-cone-table': {
      title: 'Tavolino cono in travertino',
      material: 'Travertino chiaro levigato',
      form: 'piano circolare su una base conica rastremata',
      note: 'Un piccolo tavolo a pedana nello showroom, con fasce orizzontali che girano intorno al cono. Altri tavoli in pietra aspettano dietro. Forma ridotta a cerchio e tronco di cono.',
    },
    'notched-joinery-tables': {
      title: 'Tavolini in travertino a incastro',
      material: 'Travertino levigato, quercia chiara',
      form: 'piani tondi con giunzione a filo di gambe in legno',
      note: 'Quattro intagli semicircolari nella pietra accolgono gambe di quercia arrotondate, a filo della superficie. Un incontro preciso di due materiali. Fotografati come gruppo di laboratorio: fotografia di collezione dallo studio di Karachi.',
    },
    'travertine-cross-table': {
      title: 'Tavolino in travertino a base a croce',
      material: 'Travertino beige levigato',
      form: 'piano tondo su una pedana di lastre che si intersecano',
      note: 'Quattro lastre verticali in pietra si incontrano a croce e ricevono un piano circolare. Una candela sulla superficie, un divano crema accanto. Prima la geometria, poi i pori della pietra.',
    },
    'rust-cage-table': {
      title: 'Tavolino gabbia a vena ruggine',
      material: 'Marmo nero lucidato con venature ruggine, base geometrica dorata',
      form: 'tavolino tondo su una gabbia angolare in ottone',
      note: 'Pietra scura figurata di rame e bianco, su un telaio teso d’oro. Più piccolo di un tavolo da pranzo, più assertivo di un posabicchieri.',
    },
    'stepped-travertine-table': {
      title: 'Tavolino a gradini in travertino',
      material: 'Travertino crema levigato',
      form: 'tavolino a due livelli su una base di lastre incrociate',
      note: 'Due piani a altezze diverse, utili e scultorei insieme. Fiori, un libro, candele a stecco sul ripiano basso. Un tavolo da soggiorno che si legge ancora come una costruzione.',
    },
    'nested-nero-tables': {
      title: 'Tavolini Nero innestati',
      material: 'Marmo nero lucidato con venature bianche, metallo scuro',
      form: 'coppia di tavolini circolari innestabili',
      note: 'Due dischi neri, uno un poco più alto, bordi in metallo scuro. Stanno insieme su un tappeto come pietre in un fiume: vicini, non identici.',
    },
    'hex-pedestal-table': {
      title: 'Tavolino a pedana esagonale',
      material: 'Travertino crema levigato',
      form: 'piano circolare su un tamburo esagonale in pietra',
      note: 'Il tondo contro sei lati. Le fasce del travertino corrono come strati intorno al tamburo. Un tavolino con un vaso di rose: domestico, ma ancora un solido.',
    },
    'monolith-coffee-table': {
      title: 'Tavolino monolite in travertino',
      material: 'Travertino levigato',
      form: 'lastra rettangolare spessa su due gambe a plinto',
      note: 'Un blocco basso e architettonico: lastra, due gambe, nient’altro. Libri, una sfera di vetro, palma secca. La grana della pietra fa il disegno.',
    },
    'nero-gold-rim-table': {
      title: 'Tavolino Nero a bordo d’oro',
      material: 'Marmo nero lucidato, bordo e base in ottone lucidato',
      form: 'tavolino tondo con telaio aperto d’oro',
      note: 'Un disco nero densamente venato cinto di ottone brillante, fotografato sul pavimento del laboratorio. Il contrasto come idea intera.',
    },
    'amber-showroom-table': {
      title: 'Tavolo da showroom a vena ambra',
      material: 'Onice o marmo crema lucidato con venature ambra, pedana scura',
      form: 'piano rettangolare spesso su un plinto nero',
      note: 'Scattato in studio tra rastrelliere di campioni. Movimento arancio-oro su un fondo crema, una base scura a specchio, una piccola ciotola come segno di scala. Un tavolo che potrebbe anche essere un banco.',
    },
    'ochre-pedestal-table': {
      title: 'Pedana ocra e carbone',
      material: 'Marmo figurato lucidato con venature oro e bianco',
      form: 'piano circolare su una pedana curva e sottile',
      note: 'Un piccolo tavolo di dichiarazione: carbone, ocra, bianco spezzato. Un solo stelo, un’alta lucidatura. Pensato per un angolo, per essergli passato accanto piano.',
    },
    'vessel-sink': {
      title: 'Lavabo da appoggio noir e oro',
      material: 'Marmo scuro lucidato con venature oro e bianco',
      form: 'vaso circolare da piano',
      note: 'Un vaso circolare poco profondo, scarico al centro, l’interno figurato quanto l’esterno. Pietra nera con miele e brina. Un pezzo da bagno trattato come scultura.',
    },
    'coral-canister': {
      title: 'Barattolo in travertino con coperchio di corallo',
      material: 'Travertino levigato, finiale di corallo in ottone lucidato',
      form: 'barattolo cilindrico con coperchio scultoreo',
      note: 'Un tamburo di pietra piano, chiuso da un ramo di corallo in ottone. Pori crudi contro un piccolo gioiello. Per un banco, o per nient’altro che se stesso.',
    },
    'travertine-candlesticks': {
      title: 'Candelieri in travertino',
      material: 'Travertino naturale levigato',
      form: 'coppia graduata, base conica e coppa cilindrica',
      note: 'Due altezze, un solo linguaggio: un cono rastremato, una coppa spessa in pietra. Una candela a colonna nel più alto. Poroso, opaco e deliberatamente non lucidato.',
    },
    'pedestal-bowl': {
      title: 'Ciotola a pedana in travertino',
      material: 'Travertino naturale',
      form: 'ciotola bassa su piede',
      note: 'Dodici pollici di diametro, cinque di altezza. Una ciotola larga dal bordo spesso su un piede corto a gradini: frutta, oggetti, o vuota. I pori della pietra restano aperti.',
    },
    'portoro-bookends': {
      title: 'Fermalibri Portoro',
      material: 'Marmo nero lucidato con venature oro',
      form: 'coppia di cunei geometrici',
      note: 'Due pendii massicci, di alto lucido, ocra e bianco su un fondo scuro. Scultura funzionale per uno scaffale che ha già un punto di vista.',
    },
    'travertine-tray': {
      title: 'Vassoio rettangolare in travertino',
      material: 'Travertino beige levigato',
      form: 'piatto rettangolare basso con bordo rialzato',
      note: 'Un solo blocco, bordato, pieno di vuoti naturali. Per chiavi, un bicchiere, o per restare vuoto su un tavolo come un piccolo piano di pietra.',
    },
    'desk-suite': {
      title: 'Set da scrivania in marmo di mezzanotte',
      material: 'Marmo noir lucidato con venature rame, piastre in ottone',
      form: 'valet a quattro pezzi: vassoio, scatola per note, portapenne, classatore',
      note: 'Una scrivania ridotta a quattro volumi di pietra. Vene bianche e ruggine, piedi sottili in ottone. Il lavoro scritto con la stessa gravità materiale di un tavolo.',
    },
    'nero-candles': {
      title: 'Gruppo candele Nero',
      material: 'Marmo nero lucidato con venature bianche',
      form: 'portacandele a piattino basso e colonna a gradini, con stecco sullo sfondo',
      note: 'Luce di candela su un fondo scuro e lucido. Un piatto largo e un cilindro impilato, entrambi nella stessa pietra a vena di fulmine. Oggetti della sera.',
    },
    'scalloped-valet': {
      title: 'Valet in travertino festonato',
      material: 'Travertino levigato a pori aperti',
      form: 'piatto rettangolare con angoli intagliati',
      note: 'Una vasca bassa, grana lineare sul fondo del vassoio, piccoli festoni a ogni angolo. Geometria morbida su una pietra porosa.',
    },
    'curved-canisters': {
      title: 'Scatole curve in travertino',
      material: 'Travertino levigato, maniglie in marmo bianco lucidato',
      form: 'coppia di scatole con coperchio ed estremità concave',
      note: 'Due misure, strozzate ai lati, coperchi che seguono la curva. Maniglie in marmo bianco come piccole onde. Un contenitore che si legge ancora come intaglio.',
    },
    'travertine-bath': {
      title: 'Set da bagno in travertino',
      material: 'Travertino beige levigato non stuccato',
      form: 'coprifazzoletti, dispenser e vasi su pietra scura',
      note: 'Oggetti da bagno quadrati e rettangolari, pori aperti, su un banco nero. Pezzi quotidiani con la stessa finitura del mobile.',
    },
    'tapered-vessel': {
      title: 'Vaso rastremato in travertino',
      material: 'Travertino naturale rifinito a mano',
      form: 'cilindro a spalla con bordo arrotolato',
      note: 'Una forma alta, leggermente chiusa, fotografata all’aperto contro il fogliame. Striature orizzontali, un bordo spesso. Vaso o oggetto: entrambe le letture sono giuste.',
    },
    'round-tray': {
      title: 'Vassoio disco in travertino',
      material: 'Travertino poroso levigato',
      form: 'vassoio circolare basso con bordo dritto',
      note: 'Un piano tondo di pietra crema, pitting, con un muro basso. Centro tavola o svuotatasche. Il cerchio è l’intero argomento.',
    },
    'bulbous-vessel': {
      title: 'Vaso scultoreo in travertino',
      material: 'Travertino naturale rifinito a mano',
      form: 'corpo sferico con collo cilindrico largo',
      note: 'Un corpo pesante e poroso e un collo corto e aperto. Mostrato con un solo girasole: scala, texture e un poco di colore contro la pietra crema.',
    },
    'onyx-urns': {
      title: 'Coppia di urne in onice',
      material: 'Onice a bande lucidato in salvia, crema e ruggine',
      form: 'urne classiche con bordo svasato e piede a pedana',
      note: 'Due vasi gemelli, traslucidi e a strati, il verde che cede al terracotta nella pietra stessa. Oggetti da mensola con un disegno geologico più che decorativo.',
    },
    'onyx-sphere-bowl': {
      title: 'Ciotola in onice su sfere',
      material: 'Onice verde lucidato',
      form: 'vasca bassa alzata su tre sfere in pietra',
      note: 'Una ciotola salvia con movimento bianco e ruggine, su tre orbi gemelli. La frutta è facoltativa. L’equilibrio come metodo di costruzione.',
    },
    'oblong-tray': {
      title: 'Vassoio oblungo in travertino',
      material: 'Travertino crema intagliato a mano',
      form: 'piatto allungato con maniglie arrotondate integrate',
      note: 'Un valet allungato, linguette a ogni estremità, fotografato su marmo scuro. Servizio e display in un solo taglio.',
    },
    'nero-cylinder': {
      title: 'Vaso cilindrico Nero',
      material: 'Marmo nero tipo Nero lucidato',
      form: 'cilindro aperto con bordo spesso e arrotondato',
      note: 'Un tamburo corto ed esatto in nero e bianco ad alto contrasto. Portapenne, vaso o peso su una scrivania. La vena è il disegno.',
    },
    'coaster-suite': {
      title: 'Set sottobicchieri in travertino',
      material: 'Travertino beige levigato',
      form: 'quattro dischi in un supporto cilindrico con taglio a U',
      note: 'Un piccolo insieme innestato: quattro cerchi, un tamburo, un intaglio per il pollice. Architettura da tavolo alla scala di un bicchiere.',
    },
    'nero-disc-tray': {
      title: 'Vassoio disco Nero',
      material: 'Marmo nero lucidato con venature bianche',
      form: 'vassoio circolare basso con bordo rialzato',
      note: 'Un disco nero, una vena bianca marcata, un muro corto. Centro tavola o oggetto vuoto. Lucidato finché tiene la luce di una stanza.',
    },
    'hemisphere-candle': {
      title: 'Candela emisfero in travertino',
      material: 'Travertino crema poroso, ottone spazzolato',
      form: 'cupola in pietra, stelo e vassoio in ottone, candela a colonna',
      note: 'Un semispazio di pietra pitting, poi uno stelo corto dorato e un vassoio basso. Luce di candela su un piede geologico. Per un tavolo già in conversazione con libri e una ciotola.',
    },
    'hotel-reception': {
      title: 'Reception monolite in travertino',
      material: 'Travertino levigato con un bordo di cava grezzo',
      form: 'banco lungo di hospitality su un plinto scuro arretrato',
      note: 'Una hall d’albergo ridotta a un materiale: banco, muro, pavimento. Il bordo lontano è lasciato spezzato, come un fronte di cava, contro un blocco per il resto esatto. La pietra come finitura e come origine.',
    },
    'counter-glow': {
      title: 'Banco in travertino con luce dal basso',
      material: 'Travertino a vena lineare, plinto arretrato illuminato',
      form: 'banco monolitico espositivo o reception',
      note: 'Un lungo blocco crema, in galleggiamento su un lavaggio di luce calda. Una ciotola a conchiglia, una lampada, drappeggio dietro. La pietra è l’architettura; il bagliore, l’unico ornamento.',
    },
    'onyx-waterfall': {
      title: 'Banco a cascata in onice retroilluminato',
      material: 'Onice miele traslucido, LED interno',
      form: 'banco a L con bordo a cascata a vene abbinate',
      note: 'Pietra crema illuminata dall’interno finché le vene diventano paesaggio. Il piano gira l’angolo e arriva a terra in una sola caduta. Una cucina o un bar trattati come un solido luminoso.',
    },
    'noir-gold-disc': {
      title: 'Piano circolare noir e oro',
      material: 'Marmo nero lucidato con venature oro e bianco',
      form: 'piano circolare, fotografato in cantiere',
      note: 'Un disco finito prima di essere tavolo: fiumi d’ocra e fili bianchi su un fondo nero, disteso sul pavimento del laboratorio. Il taglio da cui si immaginano i pezzi da pranzo.',
    },
    'nero-marquina-slabs': {
      title: 'Lastre Nero a vena',
      material: 'Marmo nero lucidato con venature di calcite bianca',
      form: 'lastre verticali di grande formato in cantiere',
      note: 'Due viste di lastre nere alte, venate come brina sul vetro. Muro, isola o tavolo ancora da decidere. L’inventario come allestimento.',
    },
  },
  materials: {
    travertine: {
      label: 'Travertino',
      cite: 'Il travertino è un calcare sedimentario poroso. Da St Werkz si specifica di solito levigato, con i pori naturali lasciati aperti invece che stuccati fino a un vetro.',
    },
    marble: {
      label: 'Marmo',
      cite: 'Il marmo della collezione St Werkz si specifica come pietra figurata, spesso di alta lucidatura: noir e oro, venature ambra tipo Portoro e calcite bianca tipo Nero.',
    },
    onyx: {
      label: 'Onice',
      cite: 'L’onice in questo studio è una pietra traslucida e a bande. Dove la lastra lo consente, St Werkz la illumina dall’interno perché la vena sia la luce della stanza.',
    },
    mixed: {
      label: 'Materiali misti',
      cite: 'Alcuni pezzi St Werkz uniscono la pietra all’ottone, alla quercia o a un secondo taglio. La collezione registra quegli incontri come costruzione specificata, non come tecnica mista generica.',
    },
  },
  finishes: {
    honed: {
      label: 'Levigato',
      cite: 'Una finitura levigata è opaca e morbida al tatto. St Werkz la usa soprattutto sul travertino perché pori e stratificazione restino visibili.',
    },
    polished: {
      label: 'Lucidato',
      cite: 'Una finitura lucidata è uno specchio quieto. È la faccia abituale di tavoli e oggetti in marmo e onice di questa collezione.',
    },
    backlit: {
      label: 'Retroilluminato',
      cite: 'La retroilluminazione è riservata all’onice traslucido: LED o una lampada interna fanno della lastra una fonte di luce. Non è una finitura da applicare a marmo opaco o a travertino.',
    },
  },
  evidence: {
    workshop: 'Fotografia di laboratorio / showroom',
    interior: 'Interno installato',
    'still-life': 'Natura morta dell’oggetto',
    yard: 'Cantiere / lastra',
  },
});
