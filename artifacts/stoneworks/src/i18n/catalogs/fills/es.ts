import type { PartialCatalog } from '../fallback';

/** Feminine number words, to agree with "colecciones". */
const ES_NUMBER_WORDS: Record<number, string> = {
  1: 'una',
  2: 'dos',
  3: 'tres',
  4: 'cuatro',
  5: 'cinco',
  6: 'seis',
  7: 'siete',
  8: 'ocho',
  9: 'nueve',
  10: 'diez',
};

/** Translations for catalogue fields the main es catalogue did not cover. */
export const esFill: PartialCatalog = {
  seo: {
    pages: {
      about: {
        title: 'Nosotros — St Werkz, Karachi',
        description:
          'St Werkz es un estudio de material en Karachi. Piedra a gran escala, cada pieza esculpida a medida: artesanía para el hogar, proyectos para arquitectos e interioristas y exportación al por mayor. Estudio en Karachi; oficinas en Nueva York, Barcelona, Kuala Lumpur y Dubái.',
      },
    },
  },
  home: {
    aboutKicker: 'Nosotros / el estudio',
    aboutTitleBefore: 'Un estudio de Karachi para la piedra a toda ',
    aboutTitleEm: 'escala.',
    aboutBody:
      'St Werkz selecciona la piedra en grandes cantidades y esculpe cada pieza a medida: objetos hechos a mano para el hogar, superficies para arquitectos e interioristas y lotes al por mayor para exportación. El estudio está en Karachi, con oficinas en Nueva York, Barcelona, Kuala Lumpur y Dubái.',
  },
  about: {
    kicker: 'Nosotros / el estudio',
    titleBefore: 'Piedra a gran escala. ',
    titleEm: 'Esculpida a medida.',
    lead: 'St Werkz es un estudio de piedra en Karachi dirigido por Syed Rashid Ali. Realiza muebles, objetos, interiores y losas en travertino, ónix y mármol. La colección se expone en cinco salas y se visita con cita previa; no se vende en línea. No hay precios a la vista.',
    studioKicker: 'El estudio / Karachi',
    studioTitleBefore: 'Un estudio dirigido por ',
    studioTitleEm: 'Syed Rashid Ali.',
    studioBody:
      'St Werkz selecciona la piedra en grandes cantidades y esculpe cada pieza a medida: objetos hechos a mano para el hogar, superficies para arquitectos e interioristas y lotes al por mayor para exportación. El estudio está en Karachi.',
    pathsKicker: 'Cuatro maneras de trabajar con nosotros',
    pathsTitleBefore: 'Piedra para su ',
    pathsTitleEm: 'punto de vista.',
    retail: {
      name: 'Para el hogar',
      text: 'Mesas, cuencos, jarrones y objetos de piedra hechos a mano, desde la galería de Karachi.',
      cta: 'Explorar la tienda',
    },
    architects: {
      name: 'Para arquitectos',
      text: 'Selección de piedra, especificaciones y fabricación a medida para espacios arquitectónicos.',
      cta: 'Explorar recursos para arquitectos',
    },
    interiors: {
      name: 'Para interioristas',
      text: 'Objetos y superficies elegidos para la sala, la luz y su manera de vivir.',
      cta: 'Explorar diseño de interiores',
    },
    wholesale: {
      name: 'Para socios mayoristas',
      text: 'Losas, volumen y logística a través del almacén de Karachi y el departamento de exportación.',
      cta: 'Contactar con el departamento de exportación',
    },
    officesKicker: 'Oficinas / presencia internacional',
    officesTitleBefore: 'Karachi, en conversación ',
    officesTitleEm: 'con el mundo.',
    officesBody:
      'El estudio sigue en Karachi, y nuestras oficinas en Nueva York, Barcelona, Kuala Lumpur y Dubái atienden su consulta.',
    visitKicker: 'Trabajar con el estudio',
    visitTitleBefore: 'Empiece por ',
    visitTitleEm: 'una conversación.',
    visitBody:
      'Cuéntenos de una mesa, un lavabo, una losa o un espacio. Una visita confirma la piedra antes de encargar una pieza.',
    atelierCta: 'Explorar el taller',
    estimateCta: 'Empezar por un estimado de estudio',
    enquireCta: 'Pedir un presupuesto',
    receptionAlt: 'Recepción monolito en travertino apomazado, St Werkz',
    objectsAlt: 'Objetos ST WERKZ de ónix miel y mármol negro veteado en oro en el estudio de Karachi',
  },
  interiors: {
    heroKicker: 'ST WERKZ / PARA INTERIORISTAS',
    heroTitleBefore: 'Objetos y losas',
    heroTitleEm: 'para la sala.',
    heroCta: 'Hablar de un interior',
    heroAlt: 'Mesa de centro de ónix blanco retroiluminado que brilla en un salón, St Werkz Karachi',
    pointKicker: 'PARA QUIEN AMUEBLA LA SALA',
    pointTitleBefore: 'Una sala necesita ',
    pointTitleEm: 'objeto y superficie.',
    steps: [
      {
        number: '01',
        title: 'Objetos que sostienen el esquema',
        body: 'Urnas, cuencos, mesas y lavabos — las piezas con las que vive el cliente, especificadas con el mismo cuidado que la arquitectura.',
      },
      {
        number: '02',
        title: 'Losas a escala de la sala',
        body: 'Mostradores, cantos en cascada y revestimientos del almacén de Karachi, coordinados con los objetos ya previstos en el proyecto.',
      },
      {
        number: '03',
        title: 'Una sola conversación de estudio',
        body: 'Artesanía y superficies a granel desde el mismo estudio. Traiga un ambiente, un dibujo o una pregunta de material.',
      },
    ],
    editKicker: 'DIRECCIONES / OBJETOS + SUPERFICIES',
    editTitleBefore: 'Amueble con ',
    editTitleEm: 'piedra.',
    editBody:
      'Empiece por una pieza que la sala guardará, o por una superficie en torno a la cual se construye. Ambas caben en la misma conversación.',
    samples: 'Aceptamos muestras, objetos y consultas de proyecto',
    bringBrief: 'Traiga su proyecto',
    contactKicker: 'UNA LÍNEA DIRECTA / KARACHI',
    contactTitleBefore: 'Amueblemos',
    contactTitleEm: 'la sala en piedra.',
    contactBody:
      'Cuéntenos sobre el interior: los objetos, las losas, la luz. Empezaremos por la conversación adecuada, no por un catálogo.',
    products: [
      { slug: 'onyx-urns', name: 'Par de urnas de ónix', note: 'Objeto / acento' },
      { slug: 'luminous-onyx', name: 'Plinto de ónix luminoso', note: 'Estar / luz' },
      { slug: 'onyx-waterfall', name: 'Cascada de ónix retroiluminado', note: 'Superficie / pieza' },
      { slug: 'hotel-reception', name: 'Recepción de travertino', note: 'Piedra a escala de sala' },
    ],
    objectsKicker: 'OBJETOS PARA LA SALA',
    objectsTitleBefore: 'Muebles y acentos ',
    objectsTitleEm: 'con los que se vive.',
    objectsBody:
      'Obras de comedor, estar y escultura, de las mismas piedras que las superficies — para una sala amueblada.',
    slabsKicker: 'SUPERFICIES A ESCALA DE SALA',
    slabsTitleBefore: 'Muros, mostradores ',
    slabsTitleEm: 'y losas en almacén.',
    slabsBody:
      'Interiores a escala de sala y piedras pakistaníes con nombre en cantidad. La calculadora es solo material.',
    calcKicker: 'RANGO DE SALA / INDICATIVO',
    calcTitleBefore: 'Objeto y superficie, ',
    calcTitleEm: 'luego una cifra.',
    calcBody:
      'Estime piedra para una sala amueblada — suelos, mostradores, muros — según las bandas publicadas de cada nombre.',
    openCollection: 'Recorrer las salas',
    openStones: 'Piedras con nombre y tarifas',
    navArchitects: 'Arquitectos',
  },
  exportDesk: {
    separateTitleEm: 'mercancía.',
  },
  pieces: {
    'pill-travertine-dining': {
      title: 'Mesa de comedor píldora de travertino',
      material: 'Travertino claro apomazado',
      form: 'tablero rectangular redondeado sobre un pedestal cilíndrico de piedra',
      note: 'Una mesa de reunión fotografiada en una sala pálida con sillas wishbone. Esquinas suaves, una cara apomazada, un solo tambor de piedra debajo — inventario St Werkz para un comedor, no un boceto de catálogo.',
    },
    'nero-oval-wood-dining': {
      title: 'Mesa de comedor oval Nero',
      material: 'Mármol negro pulido con vetas blancas, base de madera oscura',
      form: 'tablero oval de comedor sobre un bastidor de madera ahusado',
      note: 'Una cara Nero de alto pulido sobre un soporte cálido de madera, con sillas envolventes crema. Mobiliario terminado del estudio de Karachi, listo para verse como pieza.',
    },
    'portoro-pedestal-dining': {
      title: 'Mesa de comedor pedestal Portoro',
      material: 'Mármol negro pulido con vetas de oro',
      form: 'tablero rectangular de comedor sobre un pedestal oscuro',
      note: 'De cerca, el movimiento de oro sobre un fondo negro. Una mesa de comedor tratada como una losa a cuyo alrededor uno se sienta — el mismo lenguaje Portoro que los lotes del almacén, acabado como mueble.',
    },
    'nero-chrome-dining': {
      title: 'Mesa de comedor Nero y cromo',
      material: 'Mármol negro pulido con vetas blancas, bastidor cromado',
      form: 'tablero rectangular de comedor sobre una base geométrica de metal',
      note: 'Vetas de relámpago blanco sobre un tablero negro, sostenido por un marco tenso de cromo y sillas de terciopelo gris. Una pieza de comedor de la tienda con una línea de metal más nítida que el óvalo de base de madera.',
    },
    'nero-xframe-dining': {
      title: 'Mesa de comedor Nero de base en X',
      material: 'Mármol negro pulido con vetas blancas, caballete de metal negro',
      form: 'tablero rectangular redondeado sobre una base en X',
      note: 'Un tablero Nero largo de esquinas suavizadas, fotografiado en el estudio con una losa envuelta detrás. La piedra es el producto; el marco la mantiene en la sala.',
    },
    'travertine-square-pedestal': {
      title: 'Mesa de travertino de pedestal cuadrado',
      material: 'Travertino crema apomazado',
      form: 'tablero circular sobre un plinto cuadrado de piedra',
      note: 'Lo redondo contra lo cuadrado. Una mesa compacta de comedor o de café en travertino de poros abiertos — inventario para una sala menor que aún quiere piedra bajo la comida.',
    },
    'sage-onyx-disc-table': {
      title: 'Mesa disco de ónix salvia',
      material: 'Ónix salvia pulido, borde de metal cepillado',
      form: 'mesa de centro o auxiliar circular',
      note: 'Un disco terminado de ónix óxido y menta, fotografiado desde arriba para que la cara sea todo el argumento. Mobiliario de estar de la misma piedra que el libro de losas.',
    },
    'sage-onyx-brass-table': {
      title: 'Mesa de ónix salvia y latón',
      material: 'Ónix verde pulido, jaula de latón cepillado',
      form: 'mesa de acento redonda sobre un tambor de varillas verticales',
      note: 'Salvia, crema y óxido en la piedra; una ligera jaula de latón debajo. Una mesa auxiliar de la tienda pensada para estar sola en una sala que ya tiene punto de vista.',
    },
    'cream-oval-plinth-table': {
      title: 'Mesa plinto oval en crema',
      material: 'Mármol u ónix crema pulido con vetas canela',
      form: 'mesa de centro oval sobre una base de losas desplazadas',
      note: 'Un óvalo pálido y figurado sobre un pie arquitectónico partido. Mobiliario bajo de estar que aún se lee como construcción.',
    },
    'linear-travertine-coffee': {
      title: 'Mesa de centro de travertino de veta lineal',
      material: 'Travertino apomazado de corte a veta',
      form: 'losa rectangular sobre dos patas de bloque',
      note: 'Estratos horizontales a lo largo de una mesa baja. Un pequeño sello dorado en la pata. Mobiliario del mismo travertino que los objetos.',
    },
    'travertine-cube-table': {
      title: 'Mesa cubo de travertino',
      material: 'Travertino beige apomazado',
      form: 'pedestal cúbico sobre un plinto recesado',
      note: 'Un cubo de piedra, bandeado como estratos, alzado un dedo del suelo. Mesa auxiliar o plinto: ambas lecturas son justas.',
    },
    'travertine-tripod-coffee': {
      title: 'Mesa de centro trípode de travertino',
      material: 'Travertino crema apomazado',
      form: 'tablero circular sobre tres losas que se cruzan',
      note: 'Una mesa baja y redonda cuya base es el encuentro de tres planos. Primero la forma, luego los poros de la piedra.',
    },
    'travertine-block-side': {
      title: 'Mesa auxiliar bloque de travertino',
      material: 'Travertino apomazado sin relleno',
      form: 'tablero rectangular grueso sobre un montante macizo',
      note: 'Un pequeño bloque arquitectónico: un montante, un plano. Fotografiado de cerca para que los huecos de la piedra sigan visibles.',
    },
    'travertine-walnut-coffee': {
      title: 'Mesa de centro de travertino y nogal',
      material: 'Travertino apomazado, bastidor de nogal oscuro',
      form: 'tablero circular de piedra en un faldón de madera de cuatro patas',
      note: 'Piedra encajada en madera: de mitad de siglo en las patas, geológica en la cara. Una mesa de estar de la tienda.',
    },
    'travertine-drum-side': {
      title: 'Mesa auxiliar tambor de travertino',
      material: 'Travertino crema apomazado',
      form: 'tablero circular sobre un pedestal cilíndrico',
      note: 'Círculo sobre tambor, fotografiado sobre un suelo de espiga. Una mesa de acento quieta para un rincón que necesita piedra, no ornamento.',
    },
    'travertine-cone-pedestal': {
      title: 'Mesa de travertino de pedestal cónico',
      material: 'Travertino crema apomazado',
      form: 'tablero circular sobre una base cónica ahusada',
      note: 'El mismo lenguaje que los pedestales de comedor, reducido a mesa auxiliar. Un tronco de cono, un disco.',
    },
    'travertine-c-table': {
      title: 'Mesa en C de travertino',
      material: 'Travertino bandeado apomazado',
      form: 'mesa auxiliar en voladizo en forma de C',
      note: 'Un bloque con muesca que se desliza junto a un sofá. Las bandas horizontales hacen el dibujo; el vacío es la parte útil.',
    },
    'banded-onyx-vase': {
      title: 'Jarrón de ónix bandeado',
      material: 'Ónix bandeado pulido en óxido, ámbar y crema',
      form: 'recipiente de hombros con borde abocinado',
      note: 'Estratos horizontales en burdeos, miel y salvia. Un objeto de chimenea del inventario de la tienda, acabado como pieza por derecho propio.',
    },
    'portoro-cylinder-cup': {
      title: 'Vaso cilíndrico Portoro',
      material: 'Mármol negro pulido con vetas de oro y blanco',
      form: 'cilindro abierto de borde grueso',
      note: 'Un tambor corto en Portoro — vaso para plumas, jarrón o peso sobre un escritorio. La veta es el dibujo.',
    },
    'tall-noir-vase': {
      title: 'Jarrón alto de mármol noir',
      material: 'Mármol oscuro pulido con vetas blancas',
      form: 'jarrón alargado de suelo o de pedestal',
      note: 'Un cilindro alto, suavemente ahusado, en piedra negra de alto contraste. Fotografiado contra una moldura de pared — un acento pensado para pasar despacio a su lado.',
    },
    'copper-vein-basin': {
      title: 'Lavabo de mármol de veta cobre',
      material: 'Mármol negro pulido con vetas de cobre y blanco',
      form: 'vaso circular poco profundo o lavabo',
      note: 'Un lavabo redondo, listo para el desagüe, el interior tan figurado como el exterior. Baño o bodegón: la misma piedra en ambos casos.',
    },
    'travertine-compote': {
      title: 'Compotera de travertino',
      material: 'Travertino beige apomazado',
      form: 'cuenco ancho de pedestal sobre un pie hemisférico',
      note: 'Un centro de mesa elevado con los poros abiertos. Fruta, conchas o vacío. Arquitectura de mesa a escala de una comida.',
    },
    'sage-onyx-pear-bowl': {
      title: 'Cuenco de ónix salvia con pie de esferas',
      material: 'Ónix salvia pulido',
      form: 'cuenco bajo sobre tres esferas de piedra',
      note: 'Ónix verde con movimiento de óxido, sobre tres orbes a juego, fotografiado con peras. El equilibrio como método de construcción.',
    },
    'travertine-vanity-gold': {
      title: 'Juego de tocador de travertino con dosificador dorado',
      material: 'Travertino beige apomazado, dosificador de metal dorado',
      form: 'bandeja, dosificador, vaso, bote y jabonera',
      note: 'Un conjunto de baño de cinco piezas sobre una bandeja de piedra. Objetos cotidianos con el mismo acabado que el mobiliario.',
    },
    'travertine-bath-ensemble': {
      title: 'Juego de baño de travertino',
      material: 'Travertino apomazado, metal cepillado y vidrio',
      form: 'bandeja, dosificador, botes y vaso de vidrio para cepillos de dientes',
      note: 'Un conjunto de spa fotografiado como un bodegón. Algodón, cepillos de madera, poros abiertos — el baño tratado como una pequeña colección.',
    },
    'portoro-bath-set': {
      title: 'Conjunto de baño Portoro',
      material: 'Mármol negro pulido con vetas de oro',
      form: 'cubrepañuelos, dosificador, jabonera, vaso y tarro con tapa',
      note: 'Cinco volúmenes Portoro para un mostrador oscuro. El mismo relámpago de oro que las mesas de comedor, a escala del jabón y el algodón.',
    },
    'travertine-bath-seven': {
      title: 'Baño de travertino en siete piezas',
      material: 'Travertino apomazado, cromo y coral de latón',
      form: 'conjunto de baño de siete piezas con bandeja, portaescobilla y bote con tapa de coral',
      note: 'El lenguaje de baño más completo: escobilla, remate de coral, dosificador, vaso, jabonera. Una sola piedra, varios gestos cotidianos.',
    },
    'scalloped-onyx-bowl': {
      title: 'Cuenco festoneado de ónix',
      material: 'Ónix salvia bandeado pulido',
      form: 'cuenco circular acanalado',
      note: 'Un borde ondulado en ónix translúcido verde y terracota. Dos vistas: una sobre mármol negro, otra a la luz del día. Un acento que puede contener fruta o nada.',
    },
    'sage-onyx-coasters': {
      title: 'Juego de posavasos de ónix salvia',
      material: 'Ónix salvia bandeado pulido',
      form: 'discos circulares en un soporte cilíndrico con corte en U',
      note: 'Arquitectura de mesa a escala de un vaso. Dos fotografías del mismo conjunto anidado — menta, óxido y un recorte para el pulgar.',
    },
    'portoro-baluster-vase': {
      title: 'Jarrón balaústre Portoro',
      material: 'Mármol negro pulido con vetas blancas y ámbar',
      form: 'urna clásica con cuello anillado y pie de pedestal',
      note: 'Un recipiente Portoro torneado, de alto brillo, para un estante que ya sabe estar en silencio.',
    },
    'terracotta-marble-urn': {
      title: 'Urna de mármol terracota',
      material: 'Mármol carbón pulido con figura terracota y crema',
      form: 'urna con pie sobre un plinto cuadrado',
      note: 'Macetero u objeto: naranja quemado contra piedra oscura, un pie cuadrado. Escultura que también puede sostener una planta.',
    },
    'live-edge-onyx-vessel': {
      title: 'Recipiente de ónix de canto vivo',
      material: 'Ónix salvia bandeado pulido',
      form: 'cuenco bajo alargado con borde en bruto',
      note: 'Una fuente oval de ónix, el labio dejado irregular. Orgánica más que torneada — un centro de mesa del inventario de objetos.',
    },
    'pair-stone-pedestals': {
      title: 'Par de pedestales de piedra',
      material: 'Mármol oscuro pulido con figura canela',
      form: 'columnas dóricas de exhibición a juego',
      note: 'Dos pedestales esbeltos para un busto, un jarrón o altura vacía. Acentos arquitectónicos que se venden en pareja.',
    },
    'onyx-chess-casket': {
      title: 'Estuche de ajedrez de ónix',
      material: 'Ónix blanco y bandeado pulido, estuche de terciopelo',
      form: 'ajedrez de viaje en una caja de presentación forrada',
      note: 'Ónix blanco contra ónix bandeado en óxido y salvia, guardado en un estuche burdeos. Un juego tratado como objeto.',
    },
    'nero-chess-set': {
      title: 'Ajedrez Nero',
      material: 'Piedra negra y piedra pálida figurada, pulidas',
      form: 'tablero completo con piezas talladas en piedra',
      note: 'Un tablero Nero cuadrado con un ancho borde negro. Piezas en las mismas dos piedras. Escultura de estar que también se juega.',
    },
    'viola-marble-fireplace': {
      title: 'Chimenea de mármol Viola',
      material: 'Mármol crema pulido con figura óxido y carbón',
      form: 'repisa tallada, hogar a juego y paramento',
      note: 'Un marco a escala de sala: repisa, hogar y la losa de encima, con vetas empalmadas. La piedra como arquitectura para un salón o un vestíbulo.',
    },
    'nero-marble-fireplace': {
      title: 'Chimenea de mármol Nero',
      material: 'Mármol negro pulido con vetas blancas',
      form: 'repisa clásica de paneles y hogar',
      note: 'Un marco Nero con paneles rehundidos, fotografiado con el fuego encendido. Piedra arquitectónica para un interior especificado.',
    },
    'portoro-workshop-mantel': {
      title: 'Repisa Portoro en el taller',
      material: 'Mármol negro pulido con vetas de oro',
      form: 'marco de chimenea tallado sobre el suelo del taller',
      note: 'Tomada en el almacén antes de su instalación: ríos de oro sobre un fondo negro, molduras ya cortadas. Así sale una repisa de Karachi.',
    },
    'honey-quartzite-slab': {
      title: 'Losa de cuarcita miel',
      material: 'Piedra cristalina pulida con vetas de oro y ámbar',
      form: 'cara de losa de gran formato',
      note: 'Un fondo crema luminoso con ríos ámbar. Fotografiada como cara de lote — la piedra antes de ser mostrador o muro.',
    },
    'celadon-onyx-slab': {
      title: 'Losa de ónix celadón',
      material: 'Ónix salvia translúcido pulido',
      form: 'cara vertical de ónix',
      note: 'Menta y crema con bolsas de óxido. Una fotografía en el almacén de un ónix que admite retroiluminación — tratado como lote, no como moodboard.',
    },
    'nero-calcite-lot': {
      title: 'Lote Nero de calcita',
      material: 'Mármol negro pulido con vetas de calcita blanca',
      form: 'dos caras del mismo lote en blanco y negro',
      note: 'Blanco quebrado sobre un fondo negro, registrado en dos caras cercanas. Inventario para arquitectos y el departamento de exportación.',
    },
    'sage-rust-onyx-slab': {
      title: 'Losa de ónix salvia y óxido',
      material: 'Ónix verde pulido con figura óxido y oro',
      form: 'cara de ónix a pleno encuadre',
      note: 'Relámpagos ámbar sobre un fondo celadón. La misma familia que las mesas disco, mostrada aquí como piedra en cantidad.',
    },
    'portoro-gold-lot': {
      title: 'Lote Portoro oro',
      material: 'Mármol negro pulido con vetas de oro miel',
      form: 'cara de losa y un panel de taracea en libro abierto',
      note: 'Dos registros de Portoro: una cara en bruto, luego un panel con bordes torneados. Este es el corte del que se dibujan las mesas de comedor.',
    },
  },
  collectionIndex: {
    eyebrow: 'ST WERKZ / LA BIBLIOTECA DE MATERIALES',
    explore: (count: number) => `Explorar las ${ES_NUMBER_WORDS[count] ?? count} colecciones`,
    samplesAria: 'Muestras de piedra natural',
    whiteAlt: 'Cara original de mármol Ziarat White con finas vetas grises en diagonal',
    whiteCaption: 'ZIARAT WHITE / MÁRMOL',
    amberAlt: 'Cara original de ónix naranja con cálidas bandas anaranjadas y pálidas líneas minerales',
    amberCaption: 'ÓNIX NARANJA / MOVIMIENTO NATURAL',
    notationBefore: 'No hay dos vetas',
    notationAfter: 'que cuenten la misma historia.',
    indexAria: 'Colecciones de material',
    atlasEyebrow: (count: number) =>
      `${(ES_NUMBER_WORDS[count] ?? String(count)).toUpperCase()} COLECCIONES / UNA MIRADA DE CERCA`,
    atlasTitleBefore: 'El carácter',
    atlasTitleEm: 'está en el detalle.',
    atlasBodyFirst: 'Un material en torno al cual construir.',
    atlasBodySecond: 'Un objeto con el que vivir.',
    roomPhotos: {
      marble: {
        alt: 'Muestra de mármol Black and Gold con piedra oscura y cálidas vetas doradas',
        caption: 'Black & Gold / Cara de mármol',
      },
      onyx: {
        alt: 'Muestra de ónix verde claro con suaves bandas verdes y crema',
        caption: 'Ónix verde claro / Cara de piedra',
      },
      limestone: {
        alt: 'Mesa de centro de travertino apomazado con una losa gruesa y dos patas de plinto de piedra',
        caption: 'Travertino / Formado en piedra',
      },
      slabs: {
        alt: 'Fotografía original de losas de mármol negro con vetas blancas, en posición vertical en el almacén de piedra',
        caption: 'Losas Nero / En el almacén',
      },
      handicrafts: {
        alt: 'Jarrón balaústre tallado en mármol Portoro con cuello anillado y pie de pedestal',
        caption: 'Portoro / El objeto tallado',
      },
    },
    spacesEyebrow: 'DEL MATERIAL A SU HOGAR',
    spacesTitle: '¿Tiene un espacio en mente?',
    spacesBody: 'Explore accesorios según su manera de vivir.',
    spacesAria: 'Buscar productos por espacio',
    spaceKitchen: 'Cocina',
    spaceWashroom: 'Baño',
    spaceHomeDecor: 'Decoración del hogar',
  },
  gallery: {
    previousPhoto: 'Fotografía anterior',
    nextPhoto: 'Fotografía siguiente',
    photosAria: 'Fotografías del producto',
    viewPhoto: (index: number, total: number, title: string) =>
      `Ver fotografía ${index} de ${total}: ${title}`,
  },
  dataText: {
    stones: {
      flower: {
        colour: 'Figura floral roja / rosa',
        origin: 'Yacimientos de Lasbela y Swat',
        use: 'Suelos económicos y cenefas decorativas',
      },
      'sunny-grey': {
        colour: 'Gris frío, grano fino',
        use: 'Suelos y salas de uso diario',
      },
      'badal-grey': {
        colour: 'Gris nublado',
        use: 'Suelos y escaleras modernos',
      },
      'silky-black': {
        colour: 'Negro azabache con leve movimiento',
        use: 'Cenefas, franjas de contraste, suelos',
      },
      tavera: {
        colour: 'Beige cálido / crema, a menudo con fósiles',
        origin: 'Lasbela, Baluchistán y Swat',
        use: 'Suelos para la casa familiar',
      },
      'ziarat-grey': {
        colour: 'Gris prémium uniforme',
        origin: 'Yacimientos de mármol blanco de Mohmand / Ziarat, KPK',
        use: 'Suelos grises modernos',
      },
      'sunny-white': {
        colour: 'Blanco brillante, veta gris clara',
        use: 'Viviendas, escaleras, salas',
      },
      'cheetah-white': {
        colour: 'Blanco con figura moteada / de leopardo',
        origin: 'Almacenes comerciales de Khyber Pakhtunkhwa',
        use: 'Suelos protagonistas con dibujo',
      },
      'strawberry-red': {
        colour: 'Rojo cálido',
        origin: 'Canteras locales de Pakistán',
        use: 'Cenefas y suelos decorativos',
      },
      'sun-tippi': {
        colour: 'Beige cálido con movimiento suave',
        use: 'Interiores cálidos y escaleras',
      },
      'cherry-pink': {
        colour: 'Rosa suave',
        origin: 'Canteras locales de Pakistán',
        use: 'Suelos de acento y revestimientos',
      },
      'botticino-fancy': {
        colour: 'Beige con figura nubosa',
        use: 'Suelos familiares y encimeras de cocina',
      },
      'sona-beige': {
        colour: 'Beige dorado',
        origin: 'Yacimientos de mármol crema de Baluchistán',
        use: 'Recepciones cálidas y revestimientos',
      },
      verona: {
        colour: 'Beige crema, a veces moteado',
        use: 'Interiores cálidos clásicos',
      },
      'shangla-white': {
        colour: 'Blanco fino',
        use: 'Suelos y revestimientos ligeros',
      },
      'elegant-grey': {
        colour: 'Gris plata',
        origin: 'Yacimientos de mármol gris de Pakistán',
        use: 'Villas modernas y baños',
      },
      'mastung-cream': {
        colour: 'Crema oscuro, grano compacto',
        origin: 'Mastung y Loralai, Baluchistán',
        use: 'Suelos cálidos y escaleras',
      },
      'jungle-green': {
        colour: 'Verde profundo',
        origin: 'Yacimientos de mármol verde de Pakistán',
        use: 'Cenefas, mezquitas, paneles protagonistas',
      },
      'pak-black': {
        colour: 'Negro denso',
        origin: 'Buner y Baluchistán',
        use: 'Cenefas, escaleras, zonas protagonistas',
      },
      'mohmand-white': {
        colour: 'Blanco con calcita gris',
        use: 'Suelos, muros, tableros de mueble',
      },
      'antique-green': {
        colour: 'Verde histórico con figura',
        origin: 'Yacimientos de mármol verde de Pakistán',
        use: 'Paneles protagonistas y revestimientos',
      },
      'golden-marble': {
        colour: 'Oro sobre crema o beige',
        origin: 'Pakistán / yacimientos locales de mármol dorado',
        use: 'Interiores clásicos de lujo',
      },
      'pakistan-chocolate': {
        colour: 'Marrón cálido',
        origin: 'Yacimientos de mármol marrón de Baluchistán',
        use: 'Recepciones y revestimientos',
      },
      teakwood: {
        colour: 'Marrón con veta de madera',
        use: 'Salas cálidas y frentes de mueble',
      },
      'black-n-gold': {
        colour: 'Negro con motas y vetas doradas',
        use: 'Cenefas, muros y mostradores de lujo',
      },
      'himalayan-white': {
        colour: 'Blanco del norte',
        origin: 'Chitral, Hunza y yacimientos del norte',
        use: 'Interiores blancos prémium',
      },
      'ziarat-white': {
        colour: 'Blanco limpio con sutil veta gris',
        use: 'Suelos, escaleras y muros de lujo',
      },
      'sahara-gold': {
        colour: 'Oro arena',
        origin: 'Yacimientos de piedra dorada de Pakistán',
        use: 'Suelos protagonistas y revestimientos',
      },
      'indus-gold': {
        colour: 'Figura dorada intensa',
        origin: 'Yacimientos de piedra dorada de Pakistán',
        use: 'Muros y suelos dorados protagonistas',
      },
      'ziarat-supreme': {
        colour: 'Ziarat White de la máxima calidad',
        use: 'Villas, escaleras, recepciones',
      },
      'michael-angelo': {
        colour: 'Negro con vetas de oro / ámbar',
        use: 'Muros protagonistas, mostradores, mobiliario',
      },
      'light-green-onyx': {
        colour: 'Verde pálido, nuboso, translúcido',
        origin: 'Zona de Chagai–Bolan–Lasbela–Khuzdar',
        use: 'Muros retroiluminados, tocadores, tableros de mesa',
      },
      'green-onyx': {
        colour: 'Verde con bandas blancas, marrones y doradas',
        use: 'Mostradores, mesas, interiores de hotel',
      },
      'multi-green-onyx': {
        colour: 'Mezcla de verde, blanco, miel y oro',
        origin: 'Chagai y Khuzdar',
        use: 'Grandes revestimientos y recepciones',
      },
      'dark-green-onyx': {
        colour: 'Verde profundo, bandeado intenso',
        use: 'Muros protagonistas y mesas de lujo',
      },
      'brown-onyx': {
        colour: 'Marrón tierra, crema y miel',
        origin: 'Yacimientos de ónix de Baluchistán',
        use: 'Mesas, mostradores, paneles decorativos',
      },
      'honey-onyx': {
        colour: 'Amarillo dorado / ámbar, muy translúcido',
        origin: 'Chagai y Lasbela',
        use: 'Barras, baños y paneles retroiluminados',
      },
      'orange-onyx': {
        colour: 'Naranja cálido y oro',
        origin: 'Yacimientos de ónix de Baluchistán',
        use: 'Paneles retroiluminados y mobiliario',
      },
      'white-onyx': {
        colour: 'Blanco a crema, veta dorada o gris',
        origin: 'Chagai; suministro limitado',
        use: 'Baños de lujo, tocadores, tableros de mesa',
      },
      'red-onyx': {
        colour: 'Rojo con marrón, verde y crema',
        origin: 'Yacimientos de ónix de Baluchistán',
        use: 'Muros protagonistas y mobiliario a medida',
      },
      'pink-onyx': {
        colour: 'Rosa / rosado, a menudo escaso',
        origin: 'Comercio de ónix Pakistán–Afganistán',
        use: 'Interiores boutique y tableros de mesa',
      },
      'black-onyx': {
        colour: 'Casi negro, translucidez limitada',
        origin: 'Baluchistán; según la cantera',
        use: 'Mostradores y mobiliario modernos',
      },
      'blue-onyx': {
        colour: 'Azul, el color habitual más raro',
        origin: 'Baluchistán; no siempre disponible',
        use: 'Obra decorativa especial de lujo',
      },
    },
    chapters: {
      kitchen: {
        title: 'Reunirse en torno a la piedra.',
        subtitle: 'Pequeños rituales. Objetos extraordinarios.',
        description:
          'Un cuenco escultórico en el centro de la mesa. Una bandeja que reúne las cosas pequeñas. Explore cuencos, bandejas, posavasos y botes en travertino natural, ónix y mármol pulido.',
        material: 'Travertino, ónix y mármol',
        heroAlt: 'Ancho cuenco de pedestal de travertino beige con pie hemisférico, fotografiado junto a conchas',
      },
      washroom: {
        title: 'Un lujo más silencioso.',
        subtitle: 'Su santuario cotidiano, tallado en piedra.',
        description:
          'De un lavabo de mármol pulido a un juego de tocador cuidadosamente compuesto, la piedra natural hace que la rutina diaria se sienta pensada. Descubra dosificadores, vasos de tocador, jaboneras y conjuntos de baño completos, junto a recipientes decorativos para un estante o una encimera.',
        material: 'Mármol y travertino',
        heroAlt:
          'Conjunto de baño de mármol Portoro negro y oro con dosificador, cubrepañuelos, vaso, tarro con tapa y jabonera',
      },
      'home-decor': {
        title: 'Está en su casa.',
        subtitle: 'Un poco de carácter. Un lugar propio.',
        description:
          'Un jarrón protagonista sobre la consola. Candeleros junto a su sillón favorito. Un ajedrez tallado, listo para una tarde sin prisa. Explore jarrones, sujetalibros, objetos de escritorio, pedestales de exhibición y mesas auxiliares compactas que aportan calidez y carácter a su hogar.',
        material: 'Ónix, mármol y travertino',
        heroAlt:
          'Jarrón de ónix bandeado pulido con borde abocinado y capas naturales de ámbar, óxido, crema y salvia',
      },
    },
    accessories: {
      'onyx-mortar-pestle': {
        title: 'Mortero y maja de ónix',
        material: 'Piedra bandeada crema y ámbar',
        description: 'Un mortero de mano y su maja a juego, fotografiados en uso.',
        alt: 'Fotografía real de una persona usando un mortero de piedra bandeada crema y ámbar con su maja a juego',
      },
      'marble-serving-board': {
        title: 'Tabla de servir de mármol',
        material: 'Mármol blanco y gris',
        description: 'Una tabla alargada de extremos redondeados, fotografiada con bollería.',
        alt: 'Fotografía cenital real de una tabla de servir completa de mármol blanco y gris con tres piezas de bollería',
      },
      'slate-cheese-platter': {
        title: 'Fuente de servir de pizarra',
        material: 'Pizarra negra natural',
        description: 'Una fuente de piedra amplia y texturada para una composición de mesa.',
        alt: 'Fotografía cenital real de una fuente rectangular completa de pizarra negra con una composición de quesos y embutidos',
      },
      'portoro-soap-dispenser': {
        title: 'Dosificador de jabón Portoro',
        material: 'Mármol negro pulido con vetas de oro',
        description: 'Un dosificador redondeado de piedra con bomba de metal.',
        alt: 'Detalle retocado de un dosificador de jabón de mármol negro y oro; vea la fotografía original del Conjunto de baño Portoro',
      },
      'travertine-soap-dish': {
        title: 'Jabonera de travertino',
        material: 'Travertino beige apomazado',
        description: 'Una jabonera circular poco profunda de borde suavemente redondeado.',
        alt: 'Detalle retocado de una jabonera circular de travertino; vea la fotografía original del Juego de tocador de travertino con dosificador dorado',
      },
      'travertine-brush-holder': {
        title: 'Portaescobilla de travertino',
        material: 'Travertino apomazado con escobilla de metal',
        description: 'Una escobilla alta y un soporte cilíndrico de piedra para junto al tocador.',
        alt: 'Detalle retocado de una escobilla de metal y un soporte cilíndrico de travertino; vea la fotografía original del Baño de travertino en siete piezas',
      },
      'travertine-cotton-jar': {
        title: 'Bote para algodón de travertino',
        material: 'Travertino cálido apomazado',
        description: 'Un recipiente tallado para algodón con una tapa suavemente redondeada que descansa encima.',
        alt: 'Detalle retocado de un bote de travertino con tapa para algodón; vea la fotografía original del Juego de baño de travertino',
      },
    },
  },
};
