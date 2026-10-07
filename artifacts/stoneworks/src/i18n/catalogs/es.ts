import type { Catalog } from '../types';
import { homeDesignCopy } from './home-design';
import { withCatalogFallback } from './fallback';
import { desks, stoneIndexes } from './desks';
import { shippingCopy } from './shipping';
import { projectCalcs } from './project-calc';

export const es: Catalog = withCatalogFallback({
  luxuryHome: homeDesignCopy.es,
  seo: {
    keywords:
      'mesa de mármol, mesa de comedor de travertino, mesa de centro de ónix, ónix retroiluminado, losas de mármol, muebles de mármol a medida, estudio de piedra Karachi, St Werkz Karachi, Syed Rashid Ali, travertino Pakistán, ónix Karachi',
    tagline: 'Un estudio de piedra en Karachi',
    description:
      'St Werkz es un estudio de piedra en Karachi que realiza mesas, objetos y superficies arquitectónicas en travertino, ónix y mármol. La colección se muestra como galería; las visitas se conciertan a petición.',
    ogImageAlt:
      'Mostrador de recepción de travertino con canto en bruto en un vestíbulo de hotel silencioso, St Werkz Karachi',
    pages: {
      home: {
        title: 'St Werkz, Karachi — Estudio de piedra para mesas, objetos y superficies',
        description:
          'St Werkz es un estudio de piedra en Karachi: mesas, objetos y superficies en travertino, ónix y mármol. Recorra la colección o pida una visita.',
      },
      collection: {
        title: 'La colección — St Werkz, Karachi',
        description:
          'Cinco salas de piedra St Werkz — comedor, estar, acentos, interiores y losas — colgadas como una galería en Karachi. Sin precios en la pared; pida una visita.',
      },
      atelier: {
        title: 'Taller — St Werkz, Karachi',
        description:
          'St Werkz es un estudio de material en Karachi dirigido por Syed Rashid Ali. Muebles de travertino, ónix y mármol, de la primera conversación a una superficie que permanece.',
      },
      enquire: {
        title: 'Pedir una visita — St Werkz, Karachi',
        description:
          'Pida una visita a St Werkz en Karachi. Escriba a stoneworks014@gmail.com o llame al +92 304 7689678. Nombre una obra o la sala: conversación de estudio, no un carrito.',
      },
      estimate: {
        title: 'Estimado de estudio — St Werkz, Karachi',
        description:
          'Un primer rango St Werkz en PKR antes de la losa: indicativo, no un precio. Describa la pieza, la piedra y el tamaño. Syed Rashid Ali confirma la piedra en Karachi.',
      },
      retailers: {
        title: 'Para comercios — St Werkz, Karachi',
        description:
          'Una selección St Werkz de objetos de mármol, ónix y travertino para comercios. Conversación comercial con el estudio de Karachi: estantes compuestos, no un almacén.',
      },
      retail: {
        title: 'Tienda — St Werkz, Karachi',
        description:
          'Objetos de ónix y mármol hechos a mano para el hogar en St Werkz, Karachi — cuencos, urnas y mesas, mostrados como galería. Recorra las salas y pida una visita.',
      },
      architects: {
        title: 'Arquitecto — St Werkz, Karachi',
        description:
          'Acompañamiento de material de St Werkz para arquitectos en Karachi: muestras, muebles de piedra, losas y superficies especificadas con intención.',
      },
      interiors: {
        title: 'Diseño de interiores — St Werkz, Karachi',
        description:
          'Objetos y losas para interioristas desde St Werkz, Karachi — piezas hechas a mano y superficies arquitectónicas para salas amuebladas.',
      },
      export: {
        title: 'Escritorio de exportación — St Werkz, Karachi',
        description:
          'Lotes fotografiados de mármol, ónix y travertino desde el patio de St Werkz en Karachi. Un cajón de muestras antes de un contenedor. FOB Karachi; sin lista de precios publicada.',
        keywords:
          'exportación de losas de mármol Karachi, lotes de ónix pakistaní, losas de travertino FOB Karachi, mármol figurado Pakistán, patio St Werkz Karachi, exportar mármol de Pakistán, Syed Rashid Ali',
      },
      stones: {
        title: 'Mármol y ónix de Pakistán — St Werkz, Karachi',
        description:
          'Mármoles y ónix pakistaníes con nombre — Ziarat White, Sunny Grey, Tavera, Black and Gold, ónix verde y miel — con rangos indicativos en PKR por pie cuadrado, septiembre 2026.',
        keywords:
          'mármol de Pakistán, Ziarat White, Sunny Grey, Tavera, Black and Gold, ónix pakistaní, ónix verde Pakistán, ónix miel, precio mármol PKR pie cuadrado, St Werkz Karachi',
      },
      notFound: {
        title: 'Página no encontrada — St Werkz, Karachi',
        description:
          'Esta página de St Werkz no está en sala. Vuelva a la colección de Karachi de mesas, objetos y superficies de piedra, o pida una visita.',
      },
    },
    pieceTitle: (title) => `${title} — St Werkz, Karachi`,
    roomTitle: (title) => `${title} — St Werkz, Karachi`,
    pieceAlt: (title, material, viewIndex) => {
      const lowered = material.charAt(0).toLowerCase() + material.slice(1);
      const base = `${title} en ${lowered}`;
      if (viewIndex != null && viewIndex > 0) return `${base}, vista ${viewIndex + 1}`;
      return base;
    },
    pieceCite: (title, form, material, evidence, dimensions) => {
      const dim = dimensions ? ` Dimensiones: ${dimensions}.` : '';
      return `${title} es ${form} en ${material}, realizado por St Werkz bajo la dirección de Syed Rashid Ali en Karachi.${dim} Evidencia: ${evidence.toLowerCase()}.`;
    },
  },
  chrome: {
    skip: 'Saltar a la colección',
    collection: 'Colección',
    atelier: 'Taller',
    estimate: 'Estimado',
    enquire: 'Consulta',
    requestViewing: 'Pedir una visita',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    forRetailers: 'Para comercios',
    forArchitects: 'Para arquitectos',
    forExport: 'Escritorio de exportación',
    retailStore: 'Tienda',
    architect: 'Arquitecto',
    interiorDesign: 'Diseño de interiores',
    wholesalers: 'Mayoristas',
    footerBrand: 'St Werkz / Karachi',
    poweredBy: 'Impulsado por',
    questions: 'Preguntas',
    retailers: 'Comercios',
    architects: 'Arquitectos',
    export: 'Exportación',
    stones: 'Piedras',
    languages: 'Idiomas',
    homeAria: 'Inicio de St Werkz',
    primaryNav: 'Navegación principal',
  },
  hint: {
    message: 'St Werkz también está escrito en tu idioma.',
    action: 'Continuar en {language}',
    dismiss: 'Seguir en inglés',
  },
  definitions: {
    studio:
      'St Werkz es un estudio de piedra en Karachi dirigido por Syed Rashid Ali. Realiza muebles, objetos, interiores y losas en travertino, ónix y mármol. La colección se cuelga en cinco salas y se muestra con visita, no se vende desde un carrito. No hay precios en la pared.',
    estimate:
      'Un estimado de estudio St Werkz es un rango indicativo en PKR según tamaño, piedra y forma. No es un precio, ni un presupuesto cerrado, ni una compra. Cada losa es única. Una visita en el estudio de Karachi confirma la piedra antes de seguir con el encargo.',
    collection:
      'La colección St Werkz son cinco salas de piedra — comedor, estar, acentos, interiores y superficies — mostradas en Karachi como una galería. Cada sala tiene texto de pared y obras colgadas con aire alrededor. Pida una visita para ver una pieza en persona.',
    retailer:
      'St Werkz abastece a comercios con una selección pensada de objetos de mármol, ónix y travertino desde su estudio de Karachi. Las colecciones de apertura se arman con la tienda, no se vuelcan desde un almacén. Las conversaciones comerciales empiezan con Syed Rashid Ali.',
    retailStore:
      'La tienda St Werkz es la galería de Karachi de objetos de ónix y mármol hechos a mano para el hogar — cuencos, urnas, mesas — mostrados con visita, no vendidos desde un carrito.',
    architect:
      'St Werkz ayuda a arquitectos a especificar travertino, ónix y mármol desde Karachi. El acompañamiento va de la primera muestra a la sala terminada. Lleve un briefing o una pregunta de material a Syed Rashid Ali.',
    interiorDesigner:
      'St Werkz trabaja con interioristas en objetos hechos a mano y en losas para salas amuebladas. Especifique una mesa, una urna, un mostrador o un muro desde el mismo estudio de Karachi.',
    export:
      'St Werkz conversa con importadores y talleres sobre lotes de mármol, ónix y travertino desde su patio en Karachi. Un lote fotografiado y un cajón de muestras van antes de un contenedor. No hay lista de precios publicada. Syed Rashid Ali toma la conversación. Los muebles permanecen en la galería.',
    origin:
      'St Werkz nace de una familia de Bandha, en Allahabad, Uttar Pradesh. Generaciones de migración llevaron música, pintura, color y oficio; esa relación heredada con el hacer toma ahora forma en mármol, ónix y travertino en Karachi.',
    piece: (title, material, form, roomTitle) =>
      `${title} es una obra de St Werkz en ${material}, de la sala ${roomTitle} en Karachi. ${form}.`,
    room: (title, wallText) => `${title} es una sala de la colección St Werkz en Karachi. ${wallText}`,
  },
  home: {
    heroKicker: 'Karachi / un estudio de material',
    heroTitle: 'Piedra a escala. Esculpida para uno.',
    heroBody:
      'De objetos singulares hechos a mano para el hogar al mármol al por mayor y a las superficies arquitectónicas a granel.',
    enterCollection: 'Entrar en la colección',
    studioEstimate: 'Estimado de estudio',
    requestViewing: 'Pedir una visita',
    walkIn: 'Entrar',
    onView: (count) => `En sala / ${count} obras`,
    roomsHeadingBefore: 'Cinco salas de piedra, colgadas como una ',
    roomsHeadingEm: 'galería.',
    questionsLink: 'Preguntas, respondidas con claridad',
    featuredCaption: 'Plinto de ónix luminoso / Estar y luz',
    studioKicker: 'El estudio',
    studioBody: (name) =>
      `St Werkz lo dirige ${name} desde el estudio de Karachi. Para un primer encuentro con una mesa, un lavabo o una losa, pida una visita — no un pago en línea.`,
    diningAmong: (dining, total) => `${dining} obras de comedor, entre ${total} de la colección`,
    beginEstimate: 'Empezar por un estimado de estudio',
    requestViewingCta: 'Pedir una visita',
    works: (count) => `${count} obras`,
    heroAlt: 'Artesanía en piedra pakistaní en ónice miel, mármol negro y mármol veteado en oro, St Werkz Karachi',
    secondStillAlt: 'Mesa de centro de ónix blanco retroiluminado que brilla en un salón, St Werkz Karachi',
    journeysKicker: 'Quién es usted / adónde ir',
    journeysTitleBefore: 'Tres caminos por el ',
    journeysTitleEm: 'estudio.',
    journeysBody:
      'Vea cómo coleccionistas, arquitectos y socios mayoristas entran en St Werkz — luego elija la puerta que le corresponde.',
    journeysVideoLabel: 'Recorridos St Werkz: tres entradas al estudio de Karachi',
    journeysCaptionsLabel: 'Subtítulos en inglés',
    journeysCollectorName: 'El coleccionista',
    journeysCollectorBody: 'Una pieza singular para el hogar. Objetos hechos a mano, mostrados como galería.',
    journeysCollectorCta: 'Entrar en la colección',
    journeysVisionaryName: 'El visionario',
    journeysVisionaryBody: 'Objetos y losas para grandes espacios — arquitectos e interioristas.',
    journeysVisionaryCta: 'Para arquitectos',
    journeysStrategistName: 'El estratega',
    journeysStrategistBody: 'Suministro mayorista y logística — losas, volumen y el escritorio de exportación.',
    journeysStrategistCta: 'Escritorio de exportación',
  },
  collection: {
    kicker: 'La colección / cinco salas',
    titleBefore: 'Recorra las ',
    titleEm: 'salas.',
    roomLine: (roman, count) => `Sala ${roman} / ${count} obras`,
    enterRoom: 'Entrar en esta sala',
    roomNotHung: 'Esta sala no está colgada.',
    returnCollection: 'Volver a la colección',
    workNotOnView: 'Esta obra no está en sala.',
    stone: 'Piedra',
    form: 'Forma',
    dimensions: 'Dimensiones',
    sameRoom: 'En la misma sala',
    otherWorks: 'Otras obras',
    requestViewing: 'Pedir una visita',
    estimateSimilar: 'Estimar una pieza similar',
    citeWork: 'Citar esta obra',
    maker: 'Autor',
    studio: 'Estudio',
    stoneFamily: 'Familia de piedra',
    finish: 'Acabado',
    evidence: 'Evidencia',
    reviewed: 'Revisado',
    studioCity: 'St Werkz, Karachi',
  },
  atelier: {
    kicker: 'Un punto de vista material',
    titleBefore: 'La buena piedra tiene una especie de ',
    titleEm: 'gravedad.',
    originKicker: 'De dónde viene el trabajo',
    originTitleBefore: 'Una familia que trajo consigo el ',
    originTitleEm: 'color.',
    howKicker: 'Cómo trabajamos',
    howTitleBefore: 'De una idea suelta a algo que ',
    howTitleEm: 'permanece.',
    materialsKicker: 'Las piedras que trabajamos',
    materialsTitleBefore: 'Travertino, ónix y ',
    materialsTitleEm: 'mármol.',
    namedStonesKicker: 'Pakistán / piedras con nombre',
    namedStonesBody:
      'Nombres comerciales de Buner, Mohmand, Swat, Lasbela y el cinturón de ónix de Chagai, con tarifas indicativas de material de septiembre de 2026. No es un presupuesto de una pieza terminada.',
    namedStonesCta: 'Todos los nombres y tarifas',
    personKicker: 'La persona detrás del estudio',
    personTitleBefore: 'Una línea directa con ',
    personTitleEm: 'el origen.',
    personBody: (name) =>
      `St Werkz lo dirige ${name}. Para preguntas de material, conversaciones de proyecto o un primer encuentro con una obra de la colección, es a quien hay que llamar.`,
    studioEstimate: 'Estimado de estudio',
    requestViewing: 'Pedir una visita',
    process: [
      {
        name: 'Escuchar primero',
        text: 'Cuéntenos la sala, la luz y cómo quiere que se sienta el espacio.',
      },
      {
        name: 'Encontrar el corte justo',
        text: 'Miramos más allá de lo obvio: tono, grano, escala, canto y cómo envejecerá la piedra.',
      },
      {
        name: 'Un primer rango',
        text: 'Si ya tiene un tamaño en mente, un estimado de estudio da una banda indicativa — nunca un precio final.',
      },
      {
        name: 'Hacerlo real',
        text: 'Muestras, orientación honesta y un camino claro de la primera conversación a la instalación.',
      },
    ],
    counterAlt: 'Mostrador de exhibición de travertino con luz inferior',
    assemblageAlt: 'Mesa oval de travertino crema en el taller',
    faqKicker: 'Preguntas / respuestas claras',
    faqTitleBefore: 'Lo que se pregunta al ',
    faqTitleEm: 'estudio.',
    faqIntro:
      'Respuestas cortas, escritas para leerse en voz alta. Si la pregunta es sobre una obra concreta, pida una visita.',
  },
  enquire: {
    kicker: 'Pedir una visita',
    kickerFromEstimate: 'Pedir este estimado',
    titleBefore: 'Empiece por ',
    titleEm: 'una pregunta.',
    body: 'Díganos qué obra quiere ver, o describa la sala. Syed Rashid Ali tomará la nota. Es una conversación de estudio — no un carrito.',
    bodyFromEstimate:
      'El briefing de su estimado de estudio está sobre la mesa. Syed Rashid Ali tomará la nota: sigue siendo una conversación, no un carrito.',
    rangeNoted: (range) => `Rango indicativo anotado: ${range}. `,
    viewingConfirms: 'Una visita sigue confirmando la piedra.',
    reviseEstimate: 'Revisar el estimado',
    currentlyAsking: (title) => `Consultando ahora sobre ${title}`,
    viewWork: 'Ver la obra',
    name: 'Su nombre',
    namePlaceholder: '¿Cómo debemos dirigirnos a usted?',
    email: 'Correo electrónico',
    emailPlaceholder: '¿Dónde podemos responder?',
    whatToSee: '¿Qué le gustaría ver?',
    briefing: 'El briefing',
    messagePlaceholder: 'Una mesa, una sala, una losa — o simplemente una hora para visitar.',
    viewingOf: (title) => `Quisiera pedir una visita de ${title}.`,
    send: 'Enviar la consulta',
    successTitle: 'Su nota está sobre la mesa.',
    successBody: 'Gracias. Para una respuesta más rápida, también puede escribir al estudio directamente.',
    emailStudio: 'Escribir al estudio',
    howKicker: 'Cómo pedir una visita',
    howTitleBefore: 'Cuatro pasos, y luego la ',
    howTitleEm: 'piedra.',
    howToName: 'Cómo pedir una visita en St Werkz',
    howToDescription:
      'Pida una visita de muebles, objetos o losas de piedra en el estudio St Werkz de Karachi. Es una conversación de estudio, no una compra en línea.',
    steps: [
      {
        number: '01',
        name: 'Elija una obra, o describa la sala',
        text: 'Recorra la colección y nombre la pieza que quiere ver, o cuente al estudio la sala, la luz y la superficie que necesita.',
      },
      {
        number: '02',
        name: 'Opcional: un estimado de estudio',
        text: 'Si ya tiene un tamaño en mente, un estimado de estudio devuelve un rango indicativo en PKR. No es un precio ni una compra.',
      },
      {
        number: '03',
        name: 'Envíe una nota al estudio',
        text: 'Use el formulario de consulta, escriba a stoneworks014@gmail.com o llame al +92 304 7689678. Syed Rashid Ali recibe el mensaje.',
      },
      {
        number: '04',
        name: 'Vea la piedra en Karachi',
        text: 'Visite Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad, Karachi. Una visita confirma la losa antes de encargar o reservar.',
      },
    ],
  },
  offices: {
    heading: 'Oficinas',
    headingLong: 'Escritorios internacionales',
    intro:
      'El estudio está en Karachi. Escritorios en Nueva York, Barcelona, Kuala Lumpur y Dubái: escriba a la casa y le indicaremos la conversación más cercana.',
    studioLabel: 'Estudio',
    places: {
      karachi: {
        city: 'Karachi',
        country: 'Pakistán',
        address: 'Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad',
      },
      'new-york': { city: 'Nueva York', country: 'Estados Unidos', address: 'Long Island' },
      barcelona: { city: 'Barcelona', country: 'España', address: 'Passeig de Gràcia' },
      'kuala-lumpur': { city: 'Kuala Lumpur', country: 'Malasia', address: '' },
      dubai: { city: 'Dubái', country: 'Emiratos Árabes Unidos', address: '' },
    },
  },
  shipping: shippingCopy.es,
  estimate: {
    kicker: 'Estimado de estudio / solo indicativo',
    titleBefore: 'Un primer rango, antes de la ',
    titleEm: 'losa.',
    takingAsStart: (title) => `Tomando ${title} como punto de partida.`,
    viewWork: 'Ver la obra',
    whatCommissioning: '01 / ¿Qué encarga?',
    stoneFamily: '02 / Familia de piedra',
    finish: '03 / Acabado',
    shape: '04 / Forma',
    dimensions: '05 / Dimensiones',
    dimensionUnits: 'Unidades de medida',
    inches: 'pulgadas',
    diameter: (unit) => `Diámetro (${unit})`,
    length: (unit) => `Largo (${unit})`,
    width: (unit) => `Ancho (${unit})`,
    depthHeight: (unit) => `Fondo / altura (${unit})`,
    thickness: (unit) => `Espesor (${unit})`,
    planArea: (area, summary) => `Área en planta ${area} · ${summary}`,
    notes: '06 / Notas — opcional',
    notesPlaceholder: 'La sala, la luz, un canto que ya imagina…',
    needsOnyx: 'Requiere ónix o piedra mixta',
    indicativeRange: 'Rango indicativo de estudio',
    waitingSize: 'A la espera de un tamaño plausible.',
    giveSize: 'Dé a la pieza un tamaño plausible para ver un rango.',
    piece: 'Pieza',
    stoneArea: 'Área de piedra',
    lead: 'Plazo',
    notFinal:
      'Esto no es un precio final. Bases, iluminación, entrega y la losa concreta pueden mover la cifra — a veces mucho.',
    requestThis: 'Pedir este estimado',
    howKicker: 'Cómo estimamos',
    howTitle: 'Bandas transparentes, no un catálogo.',
    howP1:
      'No hay una lista oficial de SKU en este sitio. El rango es una banda de estudio según la clase de piedra y el área (y, en lavabos y objetos, una parte del volumen de envolvente), luego se abre por merma de corte, acabado y cuánto pide de oficio la pieza.',
    howP2: (rate) =>
      `El travertino queda por debajo del mármol; el ónix, sobre todo retroiluminado, por encima. Las plantas redondas y ovaladas asumen más merma que un rectángulo. Un espesor por encima de un tablero simple añade manejo. El PKR es la cifra nativa. El USD se muestra a ${rate} PKR por dólar — un tipo de conversación, no una cotización bancaria.`,
    howP3: 'El número es una primera conversación. Syed Rashid Ali confirma la piedra en persona.',
    writeWithoutRange: 'O escribir sin un rango',
    indicative: 'Indicativo',
    commissions: {
      'dining-table': { label: 'Mesa de comedor', note: 'Un tablero para reunirse' },
      'coffee-table': { label: 'Mesa de centro', note: 'Baja, para el estar' },
      'side-table': { label: 'Mesa auxiliar', note: 'Acento o compañera' },
      counter: { label: 'Mostrador / plinto', note: 'Recepción o barra' },
      slab: { label: 'Losa / tablero', note: 'El corte antes de la sala' },
      sink: { label: 'Lavabo de sobreponer', note: 'Un vaso como escultura' },
      object: { label: 'Objeto', note: 'Cuenco, bandeja, recipiente' },
    },
    stones: {
      travertine: { label: 'Travertino', note: 'Poroso, sereno, arquitectónico' },
      marble: { label: 'Mármol', note: 'Figurativo, a menudo de alto pulido' },
      onyx: { label: 'Ónix', note: 'Translúcido, guiado por la veta' },
      mixed: { label: 'Mixto', note: 'Piedra con metal o un segundo corte' },
    },
    finishes: {
      honed: { label: 'Apomazado', note: 'Mate, suave al tacto' },
      polished: { label: 'Pulido', note: 'Un espejo quieto' },
      backlit: { label: 'Retroiluminado', note: 'Para ónix translúcido' },
    },
    shapes: {
      round: 'Redonda',
      oval: 'Ovalada',
      rectangle: 'Rectángulo',
      custom: 'A medida',
    },
    leads: {
      onyx:
        'Se hace según disponibilidad de losa — suele ser de catorce a veinte semanas después de reservar la piedra. El empalme de vetas y la iluminación marcan el ritmo.',
      slab: 'Las losas de patio se pueden reservar antes; el corte y el acabado siguen la cara elegida — a menudo de cuatro a ocho semanas.',
      object: 'Las obras menores siguen el bloque a mano — de cuatro a diez semanas después de acordar la piedra.',
      counter:
        'Las piezas arquitectónicas esperan la losa y la obra — a menudo de diez a dieciséis semanas después de confirmar piedra y dibujos.',
      table:
        'Se hace según disponibilidad de losa — suele ser de ocho a catorce semanas después de reservar la piedra. Una visita confirma la losa.',
    },
    finishFallback: 'Pulido (la retroiluminación pide ónix)',
  },
  retailers: {
    heroKicker: 'ST WERKZ / PARA COMERCIOS',
    heroTitleBefore: 'Piezas a las que se ',
    heroTitleEm: 'vuelve.',
    heroCta: 'Abrir una conversación comercial',
    heroAlt: 'Accesorios de baño de travertino dispuestos como colección',
    pointKicker: 'PARA TIENDAS CON PUNTO DE VISTA',
    pointTitleBefore: 'Un estante debe tener un ',
    pointTitleEm: 'punto de vista.',
    steps: [
      {
        number: '01',
        title: 'Una primera selección pensada',
        body: 'Empiece por un grupo coherente de objetos, no por un almacén de dudas.',
      },
      {
        number: '02',
        title: 'Formas con las que se vive',
        body: 'Las piezas útiles llevan más lejos el relato: un conjunto de baño, una caja, un cuenco, un lugar donde dejar las cosas.',
      },
      {
        number: '03',
        title: 'Una relación que se repite',
        body: 'Quédese cerca del estudio mientras sus clientes le dicen qué quieren después.',
      },
    ],
    editKicker: 'UNA SELECCIÓN LISTA PARA TIENDA / 04 PUNTOS DE PARTIDA',
    editTitleBefore: 'Las piezas que se ',
    editTitleEm: 'notan.',
    editBody:
      'Algunas direcciones de la colección más amplia de St Werkz. Podemos armar la primera selección justa para su suelo.',
    contactKicker: 'UNA LÍNEA DIRECTA / KARACHI',
    contactTitleBefore: 'Armemos un ',
    contactTitleEm: 'mejor estante.',
    contactBody: 'Cuéntenos de su tienda, del cliente al que sirve y del tipo de colección que quiere ponerle delante.',
    contactCard: 'CONTACTAR ST WERKZ',
    emailStudio: 'Escribir al estudio',
    startConversation: 'Empezar una conversación',
    enquire: 'Consultar',
    productEnquire: 'Consultar',
    footerTag: 'Superficies con punto de vista.',
    backToTop: 'Volver arriba',
    products: [
      { slug: 'coral-canister', name: 'Bote de travertino con tapa de coral', note: 'Acentos escultóricos' },
      { slug: 'travertine-bath', name: 'Conjunto de baño en travertino', note: 'Lujo cotidiano y quieto' },
      { slug: 'portoro-bookends', name: 'Sujetalibros Portoro', note: 'Escritorio y estar' },
      { slug: 'desk-suite', name: 'Conjunto de escritorio en mármol de medianoche', note: 'Útil, elevado' },
    ],
    navArchitects: 'Arquitectos e interioristas',
  },
  architects: {
    heroKicker: 'ST WERKZ / PARA ARQUITECTOS',
    heroTitleBefore: 'Piedra con ',
    heroTitleEm: 'punto de vista.',
    heroCta: 'Hablar de un proyecto',
    heroAlt: 'Lavabo de sobreponer en mármol oscuro con vetas de oro y blanco',
    pointKicker: 'PARA QUIEN DIBUJA LA SALA',
    pointTitleBefore: 'La piedra justa cambia la ',
    pointTitleEm: 'conversación.',
    steps: [
      {
        number: '01',
        title: 'Suministro con contexto',
        body: 'Miramos tono, grano, escala y cómo vivirá una superficie con el resto de la sala.',
      },
      {
        number: '02',
        title: 'Muestras que mueven el briefing',
        body: 'Traiga una pregunta de material. Le ayudamos a pasar de una sensación a algo que pueda poner delante de un cliente.',
      },
      {
        number: '03',
        title: 'Una línea directa con el estudio',
        body: 'Sin capas entre la pregunta y quien le ayuda a encontrar la pieza justa.',
      },
    ],
    editKicker: 'DIRECCIONES DE MATERIAL / PARA SU PRÓXIMO BRIEFING',
    editTitleBefore: 'Empiece por ',
    editTitleEm: 'la superficie.',
    editBody: 'Lavabo, objeto o acento arquitectónico: cada dirección empieza por lo que el material intenta decir.',
    samples: 'Muestras y conversaciones de proyecto bienvenidas',
    bringBrief: 'Traiga un briefing',
    contactKicker: 'UNA LÍNEA DIRECTA / KARACHI',
    contactTitleBefore: 'Especifiquemos algo que ',
    contactTitleEm: 'dure.',
    contactBody:
      'Cuéntenos de la sala, del briefing o de la pregunta de material. Empezaremos por la conversación justa, no por un volcado de catálogo.',
    products: [
      { slug: 'vessel-sink', name: 'Lavabo de sobreponer noir y oro', note: 'Encimera / baño' },
      { slug: 'onyx-waterfall', name: 'Cascada de ónix retroiluminado', note: 'Un primer detalle fuerte' },
      { slug: 'emerald-cage-table', name: 'Mesa jaula esmeralda', note: 'Mobiliario / pieza protagonista' },
      { slug: 'onyx-urns', name: 'Par de urnas de ónix', note: 'Objeto / acento' },
    ],
    objectsKicker: 'OBRAS ARTESANALES / PARA EL BRIEFING',
    objectsTitleBefore: 'Piezas que caben ',
    objectsTitleEm: 'en el plano.',
    objectsBody: 'Mesas, mostradores y objetos de la colección — como evidencia de proyecto, no como SKU de catálogo.',
    slabsKicker: 'PIEDRA EN CANTIDAD',
    slabsTitleBefore: 'Losas con nombre, ',
    slabsTitleEm: 'por pie cuadrado.',
    slabsBody: 'Las tarifas pakistaníes de mármol y ónix son bandas de material indicativas. Una visita confirma la cara. Use la calculadora para un primer rango de proyecto.',
    calcKicker: 'RANGO DE PROYECTO / INDICATIVO',
    calcTitleBefore: 'Una primera cifra ',
    calcTitleEm: 'para la especificación.',
    calcBody: 'Área, espesor y merma sobre las bandas publicadas en PKR por pie². No es un presupuesto.',
    openCollection: 'Abrir la colección',
    openStones: 'Piedras con nombre y tarifas',
    navRetailers: 'Comercios',
  },
  tiles: {
    heroKicker: 'ST WERKZ / PARA INTERIORISTAS',
    heroTitleBefore: 'Objetos y losas ',
    heroTitleEm: 'para la sala.',
    heroCta: 'Hablar de un interior',
    heroAlt: 'Mesa de centro de ónix blanco retroiluminado que brilla en un salón, St Werkz Karachi',
    pointKicker: 'PARA QUIEN AMUEBLA LA SALA',
    pointTitleBefore: 'Una sala necesita ',
    pointTitleEm: 'objeto y superficie.',
    steps: [
      { number: '01', title: 'Objetos que sostienen el esquema', body: 'Urnas, cuencos, mesas y lavabos — las piezas con las que vive el cliente, especificadas con el mismo cuidado que la arquitectura.' },
      { number: '02', title: 'Losas a escala de la sala', body: 'Mostradores, cantos en cascada y paramentos del patio de Karachi, acordados con los objetos ya en el briefing.' },
      { number: '03', title: 'Una sola conversación de estudio', body: 'Artesanía y superficies a granel desde el mismo escritorio. Traiga un ambiente, un dibujo o una pregunta de material.' },
    ],
    editKicker: 'DIRECCIONES / OBJETOS + SUPERFICIES',
    editTitleBefore: 'Amueble la ',
    editTitleEm: 'piedra.',
    editBody: 'Empiece por una pieza que la sala guardará, o por una superficie en torno a la cual se construye. Ambas caben en la misma conversación.',
    samples: 'Muestras, objetos y conversaciones de proyecto bienvenidas',
    bringBrief: 'Traiga un briefing de interior',
    contactKicker: 'UNA LÍNEA DIRECTA / KARACHI',
    contactTitleBefore: 'Amueblemos la sala ',
    contactTitleEm: 'en piedra.',
    contactBody: 'Cuéntenos del interior — los objetos, las losas, la luz. Empezaremos por la conversación justa, no por un volcado de catálogo.',
    products: [
      { slug: 'onyx-urns', name: 'Par de urnas de ónix', note: 'Objeto / acento' },
      { slug: 'luminous-onyx', name: 'Plinto de ónix luminoso', note: 'Estar / luz' },
      { slug: 'onyx-waterfall', name: 'Cascada de ónix retroiluminado', note: 'Superficie / pieza' },
      { slug: 'hotel-reception', name: 'Recepción de travertino', note: 'Piedra a escala de sala' },
    ],
    objectsKicker: 'OBJETOS PARA LA SALA',
    objectsTitleBefore: 'Muebles y acentos ',
    objectsTitleEm: 'con los que se vive.',
    objectsBody: 'Obras de comedor, estar y escultura, de las mismas piedras que las superficies — para una sala amueblada.',
    slabsKicker: 'SUPERFICIES A ESCALA DE SALA',
    slabsTitleBefore: 'Muros, mostradores ',
    slabsTitleEm: 'y el patio.',
    slabsBody: 'Interiores a escala de sala y piedras pakistaníes con nombre en cantidad. La calculadora es solo material.',
    calcKicker: 'RANGO DE SALA / INDICATIVO',
    calcTitleBefore: 'Objeto y superficie, ',
    calcTitleEm: 'luego una cifra.',
    calcBody: 'Estime piedra para una sala amueblada — suelos, encimeras, muros — según las bandas publicadas.',
    openCollection: 'Recorrer las salas',
    openStones: 'Piedras con nombre y tarifas',
    navArchitects: 'Arquitecto',
  },
  retailStore: {
    kicker: 'Tienda / Karachi',
    titleBefore: 'Una pieza singular ',
    titleEm: 'para casa.',
    body: 'Objetos de ónix y mármol hechos a mano — cuencos, urnas, mesas — colgados como una galería. Recorra las salas y pida una visita. Es una conversación de estudio, no un carrito.',
    enterCollection: 'Entrar en la colección',
    requestViewing: 'Pedir una visita',
    pathKicker: 'Cómo sale una pieza del estudio',
    pathTitleBefore: 'Descubrir, recorrer, ',
    pathTitleEm: 'luego verla.',
    steps: [
      { number: '01', title: 'Descubrir', body: 'Recorra las cinco salas — comedor, estar, acentos, interiores y losas — como una galería quieta.' },
      { number: '02', title: 'Recorrer las salas', body: 'Abra una obra, lea la piedra y quédese con la forma antes de pedir una hora.' },
      { number: '03', title: 'Pedir una visita', body: 'Nombre la pieza o la sala. Syed Rashid Ali toma la nota y confirma la piedra en Karachi.' },
    ],
    featuredKicker: 'En sala',
    featuredTitleBefore: 'Obras con las que se ',
    featuredTitleEm: 'vive.',
    featuredBody: 'Una primera mirada a objetos y mesas de la colección. Abra una pieza y pida una visita.',
    heroAlt: 'Objetos de ónix y mármol pakistaníes para el hogar, St Werkz Karachi',
    filterAria: 'Filtrar la tienda por sala',
    filterAll: 'Todas las salas',
    filterDining: 'Comedor',
    filterLiving: 'Estar',
    filterAccents: 'Acentos',
    storeKicker: 'La tienda',
    storeTitleBefore: 'Obras artesanales ',
    storeTitleEm: 'en sala.',
    storeBody: 'Objetos, mesas y acentos de la colección. Filtre una sala, abra una pieza y pida una visita. No hay carrito.',
    countLine: (count) => `${count} obras`,
    pieceEnquire: 'Pedir una visita',
  },
  projectCalc: projectCalcs.es,
  exportDesk: desks.es,
  stonesIndex: stoneIndexes.es,
  notFound: {
    title: 'Esta página no está en sala.',
    body: 'Vuelva a la colección St Werkz de mármol, travertino y ónix en Karachi, o pida una visita.',
    cta: 'Recorrer las salas',
  },
  faqs: [
    {
      id: 'what-stoneworks-makes',
      question: '¿Qué hace St Werkz?',
      answer:
        'St Werkz realiza muebles, objetos, interiores y losas de piedra en Karachi. La colección incluye mesas de comedor, mesas de centro, acentos escultóricos, mostradores arquitectónicos y losas de patio, cortados en travertino, ónix y mármol. Las obras se muestran como galería. Pida una visita para ver una pieza en persona.',
    },
    {
      id: 'where-located',
      question: '¿Dónde está St Werkz?',
      answer:
        'St Werkz está en Karachi, Pakistán, en Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad, Karachi. Syed Rashid Ali dirige el estudio. Escriba a stoneworks014@gmail.com o llame al +92 304 7689678 para pedir una visita o hablar de un proyecto. El estudio es el punto de partida para hogares, arquitectos y comercios.',
    },
    {
      id: 'who-leads',
      question: '¿Quién dirige St Werkz?',
      answer:
        'Syed Rashid Ali dirige St Werkz, el estudio de piedra de Karachi. Atiende preguntas de material, conversaciones de proyecto y solicitudes de visita. Llame al +92 304 7689678 o escriba a stoneworks014@gmail.com. El estudio está en Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad, Karachi.',
    },
    {
      id: 'custom-or-collection',
      question: '¿St Werkz hace piezas a medida o solo la colección?',
      answer:
        'St Werkz muestra una colección de obras terminadas y también acepta encargos. Las cinco salas — comedor, estar, acentos, interiores y superficies — son piezas que puede pedir ver. Si necesita una mesa, un lavabo o una losa similar, empiece por un estimado de estudio. Una visita sigue confirmando la piedra.',
    },
    {
      id: 'how-to-view',
      question: '¿Cómo pido una visita en St Werkz?',
      answer:
        'Para pedir una visita en St Werkz, abra la página de consulta, nombre una obra o describa la sala, y envíe una nota. Syed Rashid Ali recibe el mensaje. También puede escribir a stoneworks014@gmail.com o llamar al +92 304 7689678. Es una conversación de estudio, no una compra en línea.',
    },
    {
      id: 'materials',
      question: '¿Qué materiales usa St Werkz?',
      answer:
        'St Werkz trabaja el travertino, el ónix y el mármol. El travertino suele ir apomazado, con veta lineal para mesas y cantos arquitectónicos. El ónix suele ir pulido y a veces retroiluminado para que la losa brille. El mármol aparece en crema, salvia, portoro y negro con vetas de oro o blanco. Cada ficha nombra la piedra.',
    },
    {
      id: 'service-area',
      question: '¿St Werkz trabaja solo en Karachi?',
      answer:
        'St Werkz tiene su base en Karachi, Pakistán, y trabaja desde ese estudio con hogares, arquitectos, interioristas y comercios. Los proyectos suelen empezar con una visita o una conversación de material en Karachi. Las notas a distancia se reciben por correo o teléfono, y se confirman en persona cuando hay que ver la piedra.',
    },
    {
      id: 'lead-times',
      question: '¿Cuánto tarda una pieza de encargo?',
      answer:
        'Los plazos siguen a la piedra. Objetos y lavabos suelen llevar de cuatro a diez semanas después de acordar el bloque. Las mesas, de ocho a catorce semanas después de reservar la losa. El ónix retroiluminado suele pedir de catorce a veinte semanas. Los mostradores arquitectónicos, de diez a dieciséis. Una visita confirma la piedra.',
    },
    {
      id: 'origin',
      question: '¿De dónde viene St Werkz?',
      answer:
        'St Werkz nace de una familia de Bandha, en Allahabad, Uttar Pradesh. La migración llevó música, pintura y color a la generación siguiente. Esa relación heredada con el arte toma ahora forma en mármol, ónix y travertino en el estudio de Karachi que dirige Syed Rashid Ali.',
    },
    {
      id: 'prices',
      question: '¿St Werkz publica precios en línea?',
      answer:
        'St Werkz no publica precios en la pared de la colección ni en línea. Un estimado de estudio da un rango indicativo según tamaño, piedra y forma — nunca un precio final. Después del estimado, pida una visita para confirmar la piedra en persona. Contacte a Syed Rashid Ali para continuar.',
    },
    {
      id: 'pakistan-stones',
      question: '¿Qué nombres de mármol y ónix hay disponibles en Pakistán?',
      answer:
        'En Pakistán se extraen mármoles como Ziarat White, Sunny Grey, Tavera, Badal y Black and Gold, además de ónix verde, miel, blanco y, más raros, rosa o azul de Baluchistán. La página de piedras muestra tarifas indicativas en PKR por pie cuadrado de septiembre de 2026: rangos de material, no el precio de una pieza terminada. Una visita en Karachi confirma la losa.',
    },
    {
      id: 'retailers',
      question: '¿St Werkz trabaja con comercios?',
      answer:
        'Sí. St Werkz abastece a comercios con una selección pensada de objetos de mármol, ónix y travertino desde su estudio de Karachi. Las colecciones de apertura se arman con la tienda, no se vuelcan desde un almacén. Las conversaciones comerciales empiezan con Syed Rashid Ali en el estudio de North Nazimabad.',
    },
    {
      id: 'architects',
      question: '¿St Werkz trabaja con arquitectos e interioristas?',
      answer:
        'Sí. St Werkz ayuda a arquitectos e interioristas a especificar travertino, ónix y mármol desde Karachi. El acompañamiento va de la primera muestra a la sala terminada. Lleve un briefing o una pregunta de material a Syed Rashid Ali. Las muestras y las conversaciones de proyecto son bienvenidas.',
    },
  ],
  rooms: {
    marble: {
      title: 'Comedor y reunión',
      kicker: 'Mesas que sostienen una conversación',
      wallText:
        'Travertino ovalado, piedra negra con movimiento de oro, ónix salvia: superficies lo bastante grandes para reunirse. Estas piezas se especifican como el centro quieto de una sala, no como un juego de catálogo.',
      description:
        'Mesas de comedor en travertino, ónix y mármol de St Werkz, Karachi — pedestales ovalados, noir y oro, y piezas de reunión en salvia, mostradas como una sala de galería.',
    },
    onyx: {
      title: 'Estar y luz',
      kicker: 'Mesas bajas, auxiliares, resplandor',
      wallText:
        'Mesas de centro y auxiliares en ónix, travertino y mármol. Algunas van retroiluminadas. Otras descansan sobre jaulas de latón o tallos tulipán. Todas están hechas para sentarse a la luz y cambiar con ella.',
      description:
        'Mesas de centro, auxiliares y ónix retroiluminado de St Werkz, Karachi — Estar y luz, una sala de mesas bajas, jaulas de latón y tallos tulipán.',
    },
    limestone: {
      title: 'Acentos escultóricos',
      kicker: 'Objetos para el estante y el baño',
      wallText:
        'Cuencos, recipientes, bandejas, candeleros y un lavabo de sobreponer: obras menores de las mismas piedras. Cada una se acaba como pieza por derecho propio, no como un añadido al mobiliario.',
      description:
        'Objetos escultóricos de piedra de St Werkz, Karachi — cuencos, bandejas, lavabos de sobreponer, candeleros y piezas de baño en travertino, ónix y mármol.',
    },
    interiors: {
      title: 'Interiores y atmósferas',
      kicker: 'La piedra como arquitectura',
      wallText:
        'Mostradores de recepción, plintos con luz inferior y cantos en cascada. Estas fotografías registran la piedra a escala de vestíbulo o de sala: quieta, precisa, hecha para rodearla.',
      description:
        'Piedra arquitectónica de St Werkz, Karachi — mostradores de recepción, plintos con luz inferior y cantos en cascada de ónix retroiluminado a escala de vestíbulo o de sala.',
    },
    slabs: {
      title: 'Superficies y losas',
      kicker: 'El material antes de la sala',
      wallText:
        'Losas y tableros en el patio: mármol negro con vetas de relámpago blanco, un disco circular de figura dorada. Esta es la piedra antes de ser mesa — el corte del que se dibuja el resto de la colección.',
      description:
        'Losas y tableros del patio St Werkz en Karachi — mármol negro con vetas de relámpago y discos circulares de figura dorada antes de convertirse en mesas.',
    },
      handicrafts: {
      title: 'Superficies y losas',
      kicker: 'El material antes de la sala',
      wallText:
        'Losas y tableros en el patio: mármol negro con vetas de relámpago blanco, un disco circular de figura dorada. Esta es la piedra antes de ser mesa — el corte del que se dibuja el resto de la colección.',
      description:
        'Losas y tableros del patio St Werkz en Karachi — mármol negro con vetas de relámpago y discos circulares de figura dorada antes de convertirse en mesas.',
    },
    
  },
  pieces: {
    'oval-travertine-pedestal': {
      title: 'Mesa pedestal oval de travertino',
      material: 'Travertino beige apomazado',
      form: 'tablero elíptico de comedor sobre un pedestal cónico de piedra',
      note: 'Un ovalo largo de travertino de veta lineal, lo bastante grueso para leerse como arquitectura, sobre un solo pie cónico. Fotografiada con sillas mezcladas en un piso de ciudad: la piedra sostiene la sala sin pedir ornamento.',
    },
    'oval-travertine-assemblage': {
      title: 'Ensamblaje oval de travertino',
      material: 'Travertino crema apomazado',
      form: 'tablero oval sobre pedestales de piedra en X que se cruzan',
      note: 'Vista en el taller, aún sobre tablero de protección. Dos caballetes pesados de piedra — uno cruzado, otro planar — llevan un ovalo de canto redondeado. Un estudio de cómo las losas se vuelven patas.',
    },
    'noir-gold-dining': {
      title: 'Mesa de comedor noir y oro',
      material: 'Mármol negro pulido con vetas de oro',
      form: 'tablero rectangular de comedor con esquinas redondeadas, sillas tapizadas',
      note: 'Una superficie oscura de alto pulido atravesada por relámpagos minerales cálidos. Montada con un círculo de sillas beige de respaldo envolvente: una mesa de reunión que se comporta como un cielo nocturno bajo vidrio.',
    },
    'portoro-slat-dining': {
      title: 'Mesa de comedor Portoro de listones',
      material: 'Mármol noir pulido con vetas ámbar, base de oro cepillado',
      form: 'tablero rectangular sobre un abanico de listones verticales dorados',
      note: 'La piedra es casi negra, y de pronto oro. La base es una fila disciplinada de láminas doradas que se reúnen en el suelo. Hecha para salas que ya saben estar en silencio.',
    },
    'cream-gathering-table': {
      title: 'Mesa de reunión en piedra crema',
      material: 'Mármol o ónix crema pulido con movimiento arenoso',
      form: 'rectángulo largo redondeado con sillas mixtas de terracota y crema',
      note: 'Un tablero pálido y arremolinado que se lee cálido más que blanco. Las sillas se parten en terracota y crema: un comedor compuesto como naturaleza muerta, no como un juego a juego.',
    },
    'sage-round-table': {
      title: 'Mesa redonda salvia',
      material: 'Ónix o mármol salvia pulido',
      form: 'tablero circular de comedor o café, naturaleza muerta de estilo de vida',
      note: 'Vista desde arriba, con una silla de terracota metida bajo el canto. Vidrio, una sola hoja, un cuenco crema. La piedra es un verde apagado, finamente veteado: una mesa para dos, o para mirar.',
    },
    'sage-onyx-organza': {
      title: 'Mesa organza de ónix salvia',
      material: 'Ónix verde translúcido pulido',
      form: 'óvalo arriñonado sobre dos pedestales hexagonales facetados',
      note: 'Una pieza monumental de taller: piedra verde suave con vetas de óxido y ocre, el tablero estrechado de forma orgánica, las patas cortadas como columnas hexagonales gemelas. Aún sobre contraplacado, ya una obra terminada.',
    },
    'travertine-round-dining': {
      title: 'Mesa de comedor redonda de travertino',
      material: 'Travertino crema apomazado',
      form: 'tablero circular sobre un pedestal cónico ahusado',
      note: 'El mismo lenguaje que el pedestal oval, reducido a un círculo. Sillas tapizadas, un muro de terracota, un pequeño jarrón de piedra con flores secas. El comedor como interior quieto.',
    },
    'luminous-onyx-plinth': {
      title: 'Plinto de ónix luminoso',
      material: 'Ónix blanco retroiluminado con vetas ámbar, marco de metal negro',
      form: 'mesa de centro cuadrada, iluminada desde dentro',
      note: 'Ónix crema translúcido, vetas de oro, iluminado desde dentro hasta que la losa se vuelve lámpara. Una vista sobre una alfombra acanalada con libros y una vela; otra en un interior nocturno, la ciudad detrás. Mobiliario que se comporta como luz.',
    },
    'emerald-cage-table': {
      title: 'Mesa jaula esmeralda',
      material: 'Ónix verde salvia pulido, base jaula de latón',
      form: 'mesa auxiliar redonda sobre un tambor de varillas verticales',
      note: 'Un tablero circular de ónix con movimiento de óxido y crema, sostenido por una jaula ligera de latón. Piedra pesada, metal delgado: el contraste habitual de St Werkz, a escala de una copa.',
    },
    'sage-tulip-table': {
      title: 'Mesa tulipán salvia',
      material: 'Ónix verde pulido, pedestal de metal cepillado',
      form: 'mesa de acento redonda sobre un tallo tulipán',
      note: 'La misma familia de ónix verde, esta vez sobre un pie de metal de mitad de siglo. Salvia, crema y terracota en la piedra; un solo tallo debajo. Un acento que puede estar solo.',
    },
    'cream-companion-tables': {
      title: 'Mesas compañeras en crema',
      material: 'Piedra crema pulida, latón satinado',
      form: 'pareja: pedestal monolítico y mesa auxiliar de tallo de latón',
      note: 'Dos tableros circulares de la misma piedra pálida. Uno sobre un tambor de piedra ahusado; el otro sobre un tallo delgado de latón y un disco. Una pareja pensada para leerse juntas, como dos notas.',
    },
    'travertine-cone-table': {
      title: 'Mesa cono de travertino',
      material: 'Travertino claro apomazado',
      form: 'tablero circular sobre una base cónica ahusada',
      note: 'Una mesa pedestal pequeña en el showroom, con bandas horizontales recorriendo el cono. Otras mesas de piedra esperan detrás. Forma reducida a círculo y tronco de cono.',
    },
    'notched-joinery-tables': {
      title: 'Mesas de travertino con encastres',
      material: 'Travertino apomazado, roble claro',
      form: 'tableros redondos con ensamble rasante de patas de madera',
      note: 'Cuatro muescas semicirculares en la piedra reciben patas de roble redondeadas, a ras de la superficie. Un encuentro preciso de dos materiales. Fotografiadas como grupo de taller: fotografía de colección del estudio de Karachi.',
    },
    'travertine-cross-table': {
      title: 'Mesa de travertino de base en cruz',
      material: 'Travertino beige apomazado',
      form: 'tablero redondo sobre un pedestal de losas que se cruzan',
      note: 'Cuatro losas verticales de piedra se encuentran en cruz y reciben un tablero circular. Una vela en la superficie, un sofá crema al lado. Primero la geometría, luego los poros de la piedra.',
    },
    'rust-cage-table': {
      title: 'Mesa jaula de veta óxido',
      material: 'Mármol negro pulido con vetas de óxido, base geométrica dorada',
      form: 'mesa auxiliar redonda sobre una jaula angular de latón',
      note: 'Piedra oscura figurada con cobre y blanco, sobre un marco tenso de oro. Más pequeña que una mesa de comedor, más afirmativa que un apoyabrazos.',
    },
    'stepped-travertine-table': {
      title: 'Mesa escalonada de travertino',
      material: 'Travertino crema apomazado',
      form: 'mesa de centro de dos niveles sobre una base de losas cruzadas',
      note: 'Dos planos a distinta altura, útiles y escultóricos a la vez. Flores, un libro, velas de palillo en el estante bajo. Una mesa de estar que aún se lee como una construcción.',
    },
    'nested-nero-tables': {
      title: 'Mesas Nero encajadas',
      material: 'Mármol negro pulido con vetas blancas, metal oscuro',
      form: 'pareja de mesas de centro circulares encajables',
      note: 'Dos discos negros, uno un poco más alto, cantos de metal oscuro. Se sientan juntos en una alfombra como piedras en un río: cerca, no idénticas.',
    },
    'hex-pedestal-table': {
      title: 'Mesa pedestal hexagonal',
      material: 'Travertino crema apomazado',
      form: 'tablero circular sobre un tambor hexagonal de piedra',
      note: 'Lo redondo contra seis caras. Las bandas del travertino corren como estratos alrededor del tambor. Una mesa de centro con un jarrón de rosas: doméstica, pero aún un sólido.',
    },
    'monolith-coffee-table': {
      title: 'Mesa de centro monolítica de travertino',
      material: 'Travertino apomazado',
      form: 'losa rectangular gruesa sobre dos patas de plinto',
      note: 'Un bloque bajo y arquitectónico: losa, dos patas, nada más. Libros, una esfera de vidrio, palma seca. El grano de la piedra hace el dibujo.',
    },
    'nero-gold-rim-table': {
      title: 'Mesa Nero de borde dorado',
      material: 'Mármol negro pulido, canto y base de latón pulido',
      form: 'mesa de centro redonda con marco abierto de oro',
      note: 'Un disco negro densamente veteado ceñido en latón brillante, fotografiado en el suelo del taller. El contraste como idea entera.',
    },
    'amber-showroom-table': {
      title: 'Mesa de showroom de veta ámbar',
      material: 'Ónix o mármol crema pulido con vetas ámbar, pedestal oscuro',
      form: 'tablero rectangular grueso sobre un plinto negro',
      note: 'Tomada en el estudio, entre estantes de muestras. Movimiento naranja-oro sobre un fondo crema, una base oscura espejada, un cuenco pequeño como marca de escala. Una mesa que también podría ser un mostrador.',
    },
    'ochre-pedestal-table': {
      title: 'Pedestal ocre y carbón',
      material: 'Mármol figurado pulido con vetas de oro y blanco',
      form: 'tablero circular sobre un pedestal curvo y delgado',
      note: 'Una mesa pequeña de declaración: carbón, ocre, blanco quebrado. Un solo tallo, un pulido alto. Pensada para un rincón, para pasar despacio a su lado.',
    },
    'vessel-sink': {
      title: 'Lavabo de sobreponer noir y oro',
      material: 'Mármol oscuro pulido con vetas de oro y blanco',
      form: 'vaso circular de encimera',
      note: 'Un vaso circular poco profundo, desagüe al centro, el interior tan figurado como el exterior. Piedra negra con miel y escarcha. Una pieza de baño tratada como escultura.',
    },
    'coral-canister': {
      title: 'Bote de travertino con tapa de coral',
      material: 'Travertino apomazado, remate de coral de latón pulido',
      form: 'tarro cilíndrico con tapa escultórica',
      note: 'Un tambor de piedra llano, cerrado con una rama de coral de latón. Poros crudos contra una pequeña joya. Para un mostrador, o para nada más que sí mismo.',
    },
    'travertine-candlesticks': {
      title: 'Candeleros de travertino',
      material: 'Travertino natural apomazado',
      form: 'pareja graduada, base cónica y copa cilíndrica',
      note: 'Dos alturas, un solo lenguaje: un cono que se estrecha, una copa gruesa de piedra. Una vela de pilar en el más alto. Poroso, mate y deliberadamente sin pulir.',
    },
    'pedestal-bowl': {
      title: 'Cuenco pedestal de travertino',
      material: 'Travertino natural',
      form: 'cuenco bajo sobre pie',
      note: 'Doce pulgadas de diámetro, cinco de alto. Un cuenco ancho de canto grueso sobre un pie corto escalonado: fruta, objetos, o vacío. Los poros de la piedra se dejan abiertos.',
    },
    'portoro-bookends': {
      title: 'Sujetalibros Portoro',
      material: 'Mármol negro pulido con vetas de oro',
      form: 'pareja de cuñas geométricas',
      note: 'Dos pendientes macizos, de alto brillo, ocre y blanco sobre un fondo oscuro. Escultura funcional para un estante que ya tiene punto de vista.',
    },
    'travertine-tray': {
      title: 'Bandeja rectangular de travertino',
      material: 'Travertino beige apomazado',
      form: 'fuente rectangular baja con borde alzado',
      note: 'Un solo bloque, con borde, lleno de huecos naturales. Para llaves, un vaso, o para quedar vacía sobre una mesa como un pequeño plano de piedra.',
    },
    'desk-suite': {
      title: 'Conjunto de escritorio en mármol de medianoche',
      material: 'Mármol noir pulido con vetas de cobre, placas de latón',
      form: 'valet de cuatro piezas: bandeja, caja de notas, vaso para plumas, clasificador',
      note: 'Un escritorio reducido a cuatro volúmenes de piedra. Vetas blancas y de óxido, pies delgados de latón. El trabajo escrito con la misma gravedad material que una mesa.',
    },
    'nero-candles': {
      title: 'Grupo de velas Nero',
      material: 'Mármol negro pulido con vetas blancas',
      form: 'portavelas de plato bajo y pilar escalonado, con vela de palillo al fondo',
      note: 'Luz de vela sobre un fondo oscuro y brillante. Un plato ancho y un cilindro apilado, ambos en la misma piedra de veta relámpago. Objetos de atardecer.',
    },
    'scalloped-valet': {
      title: 'Valet de travertino festoneado',
      material: 'Travertino apomazado de poros abiertos',
      form: 'fuente rectangular con esquinas dentadas',
      note: 'Un cuenco bajo, grano lineal en el suelo de la bandeja, pequeños festones en cada esquina. Geometría blanda sobre una piedra porosa.',
    },
    'curved-canisters': {
      title: 'Cajas curvas de travertino',
      material: 'Travertino apomazado, tiradores de mármol blanco pulido',
      form: 'pareja de cajas con tapa y extremos cóncavos',
      note: 'Dos tamaños, estrechados a los lados, tapas que siguen la curva. Tiradores de mármol blanco como pequeñas olas. Almacenaje que aún se lee como talla.',
    },
    'travertine-bath': {
      title: 'Conjunto de baño en travertino',
      material: 'Travertino beige apomazado sin relleno',
      form: 'cubrepañuelos, dosificador y recipientes sobre piedra oscura',
      note: 'Objetos de baño cuadrados y rectangulares, poros abiertos, sobre un mostrador negro. Piezas cotidianas con el mismo acabado que el mobiliario.',
    },
    'tapered-vessel': {
      title: 'Recipiente ahusado de travertino',
      material: 'Travertino natural de acabado a mano',
      form: 'cilindro de hombro con borde enrollado',
      note: 'Una forma alta, ligeramente cerrada, fotografiada al aire libre contra el follaje. Estrías horizontales, un borde grueso. Jarrón u objeto: ambas lecturas son justas.',
    },
    'round-tray': {
      title: 'Bandeja disco de travertino',
      material: 'Travertino poroso apomazado',
      form: 'bandeja circular baja con borde recto',
      note: 'Un plano redondo de piedra crema, picado, con un muro bajo. Centro de mesa o vaciabolsillos. El círculo es todo el argumento.',
    },
    'bulbous-vessel': {
      title: 'Recipiente escultórico de travertino',
      material: 'Travertino natural de acabado a mano',
      form: 'cuerpo esférico con cuello cilíndrico ancho',
      note: 'Un cuerpo pesado y poroso y un cuello corto y abierto. Mostrado con un solo girasol: escala, textura y un poco de color contra la piedra crema.',
    },
    'onyx-urns': {
      title: 'Par de urnas de ónix',
      material: 'Ónix bandeado pulido en salvia, crema y óxido',
      form: 'urnas clásicas de borde acampanado y pie de pedestal',
      note: 'Dos recipientes gemelos, translúcidos y en capas, el verde cediendo al terracota en la piedra misma. Objetos de chimenea con un dibujo geológico más que decorativo.',
    },
    'onyx-sphere-bowl': {
      title: 'Cuenco de ónix sobre esferas',
      material: 'Ónix verde pulido',
      form: 'cuenco bajo alzado sobre tres esferas de piedra',
      note: 'Un cuenco salvia con movimiento blanco y de óxido, sobre tres orbes gemelos. La fruta es opcional. El equilibrio como método de construcción.',
    },
    'oblong-tray': {
      title: 'Bandeja oblonga de travertino',
      material: 'Travertino crema tallado a mano',
      form: 'fuente alargada con asas redondeadas integradas',
      note: 'Un valet alargado, pestañas en cada extremo, fotografiado sobre mármol oscuro. Servicio y exhibición en un solo corte.',
    },
    'nero-cylinder': {
      title: 'Recipiente cilíndrico Nero',
      material: 'Mármol negro tipo Nero pulido',
      form: 'cilindro abierto de borde grueso y redondeado',
      note: 'Un tambor corto y exacto en negro y blanco de alto contraste. Vaso para plumas, jarrón o peso sobre un escritorio. La veta es el dibujo.',
    },
    'coaster-suite': {
      title: 'Juego de posavasos de travertino',
      material: 'Travertino beige apomazado',
      form: 'cuatro discos en un soporte cilíndrico con corte en U',
      note: 'Un conjunto pequeño anidado: cuatro círculos, un tambor, un recorte para el pulgar. Arquitectura de mesa a escala de un vaso.',
    },
    'nero-disc-tray': {
      title: 'Bandeja disco Nero',
      material: 'Mármol negro pulido con vetas blancas',
      form: 'bandeja circular baja con borde alzado',
      note: 'Un disco negro, una veta blanca marcada, un muro corto. Centro de mesa u objeto vacío. Pulido hasta sostener la luz de una sala.',
    },
    'hemisphere-candle': {
      title: 'Vela hemisferio de travertino',
      material: 'Travertino crema poroso, latón cepillado',
      form: 'cúpula de piedra, tallo y bandeja de latón, vela de pilar',
      note: 'Un semiesfera de piedra picada, luego un tallo corto dorado y una bandeja baja. Luz de vela sobre un pie geológico. Para una mesa que ya conversa con libros y un cuenco.',
    },
    'hotel-reception': {
      title: 'Recepción monolito de travertino',
      material: 'Travertino apomazado con un canto de cantera en bruto',
      form: 'mostrador largo de hospitalidad sobre un plinto oscuro recesado',
      note: 'Un vestíbulo de hotel reducido a un material: mostrador, muro, suelo. El canto lejano se deja quebrado, como un frente de cantera, contra un bloque por lo demás exacto. La piedra como acabado y como origen.',
    },
    'counter-glow': {
      title: 'Mostrador de travertino con luz inferior',
      material: 'Travertino de veta lineal, plinto recesado iluminado',
      form: 'mostrador monolítico de exhibición o recepción',
      note: 'Un bloque largo de crema, flotando sobre un baño de luz cálida. Un cuenco de concha, una lámpara, drapería detrás. La piedra es la arquitectura; el resplandor, el único ornamento.',
    },
    'onyx-waterfall': {
      title: 'Encimera cascada de ónix retroiluminado',
      material: 'Ónix miel translúcido, LED interno',
      form: 'mostrador en L con canto en cascada de vetas empalmadas',
      note: 'Piedra crema iluminada desde dentro hasta que las vetas se vuelven paisaje. El tablero dobla la esquina y llega al suelo en una sola caída. Una cocina o barra tratada como un sólido luminoso.',
    },
    'noir-gold-disc': {
      title: 'Tablero circular noir y oro',
      material: 'Mármol negro pulido con vetas de oro y blanco',
      form: 'tablero circular, fotografiado en el patio',
      note: 'Un disco terminado antes de ser mesa: ríos de ocre e hilos blancos sobre un fondo negro, tendido en el suelo del taller. El corte del que se imaginan las piezas de comedor.',
    },
    'nero-marquina-slabs': {
      title: 'Losas Nero de veta',
      material: 'Mármol negro pulido con vetas de calcita blanca',
      form: 'losas verticales de gran formato en el patio',
      note: 'Dos vistas de losas negras altas, veteadas como escarcha sobre vidrio. Muro, isla o mesa aún por decidir. El inventario como exposición.',
    },
  },
  materials: {
    travertine: {
      label: 'Travertino',
      cite: 'El travertino es una caliza sedimentaria porosa. En St Werkz suele especificarse apomazado, con los poros naturales abiertos en lugar de rellenados hasta un vidrio.',
    },
    marble: {
      label: 'Mármol',
      cite: 'El mármol de la colección St Werkz se especifica como piedra figurada, a menudo de alto pulido: noir y oro, vetas ámbar tipo Portoro y calcita blanca tipo Nero.',
    },
    onyx: {
      label: 'Ónix',
      cite: 'El ónix en este estudio es una piedra translúcida y bandeada. Donde la losa lo permite, St Werkz la ilumina desde dentro para que la veta sea la luz de la sala.',
    },
    mixed: {
      label: 'Materiales mixtos',
      cite: 'Algunas piezas St Werkz unen la piedra al latón, al roble o a un segundo corte. La colección registra esos encuentros como construcción especificada, no como técnica mixta genérica.',
    },
  },
  finishes: {
    honed: {
      label: 'Apomazado',
      cite: 'Un acabado apomazado es mate y suave al tacto. St Werkz lo usa sobre todo en travertino para que poros y estratificación sigan visibles.',
    },
    polished: {
      label: 'Pulido',
      cite: 'Un acabado pulido es un espejo quieto. Es la cara habitual de las mesas y objetos de mármol y ónix de esta colección.',
    },
    backlit: {
      label: 'Retroiluminado',
      cite: 'La retroiluminación se reserva al ónix translúcido: LED o una lámpara interna convierten la losa en fuente de luz. No es un acabado que se aplique a mármol opaco ni a travertino.',
    },
  },
  evidence: {
    workshop: 'Fotografía de taller / showroom',
    interior: 'Interior instalado',
    'still-life': 'Naturaleza muerta del objeto',
    yard: 'Patio / losa',
  },
});
