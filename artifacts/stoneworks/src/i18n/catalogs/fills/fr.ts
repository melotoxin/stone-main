import type { PartialCatalog } from '../fallback';

const FR_NUMBER_WORDS: Record<number, string> = {
  0: 'zéro',
  1: 'une',
  2: 'deux',
  3: 'trois',
  4: 'quatre',
  5: 'cinq',
  6: 'six',
  7: 'sept',
  8: 'huit',
  9: 'neuf',
  10: 'dix',
};

/** Translations for catalogue fields the main fr catalogue did not cover. */
export const frFill: PartialCatalog = {
  seo: {
    pages: {
      about: {
        title: 'À propos — St Werkz, Karachi',
        description:
          'St Werkz est un atelier de matière à Karachi. Pierre sélectionnée en volume, sculptée pour chacun — artisanat pour la maison, architectes et décorateurs, export de gros. Atelier à Karachi ; bureaux à New York, Barcelone, Kuala Lumpur et Dubaï.',
      },
    },
  },
  home: {
    aboutKicker: 'À propos / l’atelier',
    aboutTitleBefore: 'Un atelier de Karachi pour la pierre à toutes les ',
    aboutTitleEm: 'échelles.',
    aboutBody:
      'St Werkz sélectionne la pierre en volume et la sculpte pour chacun — objets faits main pour la maison, surfaces pour architectes et décorateurs, et lots de gros pour l’export. L’atelier est à Karachi. Des bureaux à New York, Barcelone, Kuala Lumpur et Dubaï relaient l’atelier.',
  },
  about: {
    kicker: 'À propos / l’atelier',
    titleBefore: 'Pierre sélectionnée en volume. ',
    titleEm: 'Sculptée pour chacun.',
    lead:
      'St Werkz est un atelier de pierre à Karachi dirigé par Syed Rashid Ali. L’atelier réalise meubles, objets, intérieurs et dalles en travertin, onyx et marbre. La collection est accrochée en cinq salles et se visite sur rendez-vous ; elle ne se vend pas en ligne. Il n’y a pas de prix au mur.',
    studioKicker: 'L’atelier / Karachi',
    studioTitleBefore: 'Un atelier dirigé par ',
    studioBody:
      'St Werkz sélectionne la pierre en volume et la sculpte pour chacun — objets faits main pour la maison, surfaces pour architectes et décorateurs, et lots de gros pour l’export. L’atelier est à Karachi.',
    pathsKicker: 'Quatre façons de travailler avec nous',
    pathsTitleBefore: 'La pierre pour votre ',
    pathsTitleEm: 'point de vue.',
    retail: {
      name: 'Pour la maison',
      text: 'Tables, bols, vases et objets en pierre faits main, depuis la galerie de Karachi.',
      cta: 'Découvrir la boutique',
    },
    architects: {
      name: 'Pour les architectes',
      text: 'Sélection de pierre, spécifications et fabrication sur mesure pour les espaces architecturaux.',
      cta: 'Découvrir les ressources pour architectes',
    },
    interiors: {
      name: 'Pour les décorateurs',
      text: 'Objets et surfaces choisis pour la pièce, la lumière et votre façon de vivre.',
      cta: 'Découvrir le design d’intérieur',
    },
    wholesale: {
      name: 'Pour les partenaires de gros',
      text: 'Dalles, volume et logistique par le dépôt de Karachi et le bureau export.',
      cta: 'Ouvrir le bureau export',
    },
    officesKicker: 'Bureaux / à l’international',
    officesTitleBefore: 'Karachi, en conversation ',
    officesTitleEm: 'avec le monde.',
    officesBody:
      'L’atelier reste à Karachi. Des bureaux à New York, Barcelone, Kuala Lumpur et Dubaï relaient l’atelier.',
    visitKicker: 'Travailler avec l’atelier',
    visitTitleBefore: 'Commencez par ',
    visitTitleEm: 'une conversation.',
    visitBody:
      'Parlez-nous d’une table, d’une vasque, d’une dalle ou d’un espace. Une visite confirme la pierre avant qu’une pièce ne soit commandée.',
    atelierCta: 'Découvrir l’atelier',
    estimateCta: 'Commencer par une estimation d’atelier',
    enquireCta: 'Demander un devis',
    receptionAlt: 'Accueil monolithe en travertin adouci, St Werkz',
    objectsAlt: 'Objets ST WERKZ en onyx miel et marbre noir veiné d’or à l’atelier de Karachi',
  },
  architects: {
    objectsKicker: 'ŒUVRES FAITES MAIN / POUR LE PROJET',
    objectsTitleBefore: 'Des pièces qui peuvent prendre place ',
    objectsTitleEm: 'dans le dessin.',
    objectsBody:
      'Tables, comptoirs et objets de la collection — présentés comme références pour un projet, non comme des articles de catalogue.',
    slabsKicker: 'LA PIERRE EN VOLUME',
    slabsTitleBefore: 'Des dalles nommées, ',
    slabsTitleEm: 'au pied carré.',
    slabsBody:
      'Les tarifs des marbres et onyx pakistanais sont des bandes de matière indicatives. Une visite confirme la face. Utilisez le calculateur pour une première fourchette de projet.',
    calcKicker: 'FOURCHETTE DE PROJET / INDICATIVE',
    calcTitleBefore: 'Un premier chiffre ',
    calcTitleEm: 'pour la spécification.',
    calcBody:
      'Surface, épaisseur et chute, rapportées aux bandes publiées par nom en PKR par pied carré. Ce n’est pas un devis.',
    openCollection: 'Ouvrir la collection',
    openStones: 'Pierres nommées et tarifs',
  },
  interiors: {
    heroKicker: 'ST WERKZ / POUR LES DÉCORATEURS',
    heroTitleBefore: 'Objets et dalles',
    heroTitleEm: 'pour la pièce.',
    heroCta: 'Parler d’un intérieur',
    heroAlt: 'Table basse en onyx blanc rétroéclairé qui luit dans un salon, St Werkz Karachi',
    pointKicker: 'POUR CEUX QUI MEUBLENT LA PIÈCE',
    pointTitleBefore: 'Une pièce a besoin à la fois ',
    pointTitleEm: 'd’objet et de surface.',
    steps: [
      {
        number: '01',
        title: 'Des objets qui portent le schéma',
        body: 'Urnes, bols, tables et vasques — les pièces avec lesquelles le client vit, spécifiées avec le même soin que l’architecture.',
      },
      {
        number: '02',
        title: 'Des dalles à l’échelle de la pièce',
        body: 'Comptoirs, chants en cascade et parois depuis le dépôt de Karachi, accordés aux objets déjà prévus au cahier des charges.',
      },
      {
        number: '03',
        title: 'Une seule conversation d’atelier',
        body: 'Artisanat et surfaces en volume depuis le même bureau. Apportez une ambiance, un dessin ou une question de matière.',
      },
    ],
    editKicker: 'DIRECTIONS / OBJETS + SURFACES',
    editTitleBefore: 'Meubler ',
    editTitleEm: 'en pierre.',
    editBody:
      'Commencez par une pièce que la salle gardera, ou par une surface autour de laquelle elle se construit. Les deux appartiennent à la même conversation.',
    samples: 'Échantillons, objets et conversations de projet bienvenus',
    bringBrief: 'Apportez votre cahier des charges',
    contactKicker: 'UNE LIGNE DIRECTE / KARACHI',
    contactTitleBefore: 'Meublons',
    contactTitleEm: 'la pièce en pierre.',
    contactBody:
      'Parlez-nous de l’intérieur — les objets, les dalles, la lumière. Nous commencerons par la bonne conversation, pas par une avalanche de catalogues.',
    products: [
      { slug: 'onyx-urns', name: 'Paire d’urnes en onyx', note: 'Objet / décor' },
      { slug: 'luminous-onyx', name: 'Socle d’onyx lumineux', note: 'Salon / lumière' },
      { slug: 'onyx-waterfall', name: 'Cascade d’onyx rétroéclairé', note: 'Surface / pièce forte' },
      { slug: 'hotel-reception', name: 'Réception en travertin', note: 'Pierre à l’échelle de la pièce' },
    ],
    objectsKicker: 'DES OBJETS POUR LA PIÈCE',
    objectsTitleBefore: 'Mobilier et objets ',
    objectsTitleEm: 'avec lesquels vivre.',
    objectsBody:
      'Pièces de salle à manger, de salon et sculpturales, dans les mêmes pierres que les surfaces — accrochées pour une pièce meublée.',
    slabsKicker: 'DES SURFACES À L’ÉCHELLE DE LA PIÈCE',
    slabsTitleBefore: 'Murs, comptoirs ',
    slabsTitleEm: 'et le dépôt.',
    slabsBody:
      'Des intérieurs à l’échelle de la pièce, et des pierres pakistanaises nommées en volume. Le calculateur ne porte que sur la matière.',
    calcKicker: 'FOURCHETTE DE PIÈCE / INDICATIVE',
    calcTitleBefore: 'Objet et surface, ',
    calcTitleEm: 'puis un chiffre.',
    calcBody:
      'Estimez la pierre d’une pièce meublée — sols, comptoirs, murs — à partir des bandes publiées par nom.',
    openCollection: 'Parcourir les salles',
    openStones: 'Pierres nommées et tarifs',
    navArchitects: 'Architectes',
  },
  retailStore: {
    filterAria: 'Filtrer la boutique par salle',
    filterAll: 'Toutes les salles',
    filterDining: 'Salle à manger',
    filterLiving: 'Salon',
    storeKicker: 'La boutique',
    storeTitleBefore: 'Des œuvres faites main ',
    storeTitleEm: 'en salle.',
    storeBody:
      'Objets, tables et pièces décoratives de la collection. Filtrez une salle, ouvrez une pièce, puis demandez une visite. Rien ne se vend en ligne.',
    countLine: (count) => `${count} œuvres`,
    pieceEnquire: 'Demander une visite',
  },
  projectCalc: {
    stone: 'Pierre pakistanaise nommée',
    area: 'Surface du projet',
    areaUnits: 'Unités de surface',
    thickness: 'Épaisseur (mm)',
    wastage: 'Chute (%)',
    thicknessNote:
      'Les tarifs publiés sont en PKR par pied carré, du sol au plan de cuisine (~20 mm). Une face plus épaisse ajuste cette bande publiée en proportion. Cela reste de la matière seulement.',
    port: 'Port de destination',
    portPlaceholder: 'Jebel Ali, Shanghai, Gênes…',
    crates: 'Caisses évoquées',
    cratesHint:
      'Le nombre de caisses sert à décrire le lot dans votre demande — il n’ajoute aucun prix d’emballage ni de fret.',
    billedArea: 'Face facturée',
    materialRange: 'Matière indicative',
    publishedBand: 'Bande par nom',
    usdLine: (low, high, rate) => `≈ ${low} – ${high} à ${rate} PKR/USD`,
    disclaimer:
      'Ceci est une fourchette de matière indicative tirée des bandes publiées par nom pour la pierre pakistanaise. Ce n’est ni un devis St Werkz, ni le prix d’une pièce finie, ni une facture. Une visite confirme la pierre.',
    freightNote:
      'FOB Karachi. Fret, assurance et frais à destination sont nommés à part — ils ne figurent pas dans ce calculateur.',
    requestQuote: 'Demander cette fourchette',
    applyToForm: 'Reporter sur la demande de lot',
    waiting: 'Dernière taille valide conservée pendant que vous ajustez.',
    giveArea: 'Donnez au projet une surface plausible pour voir une fourchette.',
  },
  exportDesk: {
    separateTitleEm: 'marchandise.',
  },
  pieces: {
    'pill-travertine-dining': {
      title: 'Table à manger gélule en travertin',
      material: 'Travertin clair adouci',
      form: 'plateau rectangulaire arrondi sur un piédestal cylindrique en pierre',
      note: 'Une table de réunion photographiée dans une pièce pâle avec des chaises wishbone. Angles doux, une face adoucie, un seul tambour de pierre dessous — inventaire St Werkz pour une salle à manger, pas un croquis de catalogue.',
    },
    'nero-oval-wood-dining': {
      title: 'Table à manger ovale Nero',
      material: 'Marbre noir poli aux veines blanches, base en bois sombre',
      form: 'plateau de salle à manger ovale sur un cadre de bois fuselé',
      note: 'Une face Nero de haut poli sur un piètement de bois chaud, entourée de chaises enveloppantes crème. Du mobilier achevé de l’atelier de Karachi, prêt à être vu comme une pièce.',
    },
    'portoro-pedestal-dining': {
      title: 'Table à manger piédestal Portoro',
      material: 'Marbre noir poli aux veines d’or',
      form: 'plateau rectangulaire de salle à manger sur un piédestal sombre',
      note: 'Au plus près du mouvement d’or sur un fond noir. Une table à manger traitée comme une dalle autour de laquelle on s’assoit — le même langage Portoro que les lots du dépôt, fini en mobilier.',
    },
    'nero-chrome-dining': {
      title: 'Table à manger Nero chromée',
      material: 'Marbre noir poli aux veines blanches, cadre chromé',
      form: 'plateau rectangulaire de salle à manger sur une base géométrique en métal',
      note: 'Des veines d’éclair blanc sur un plateau noir, tenu par un cadre chromé tendu et des chaises de velours gris. Une pièce de salle à manger de la boutique, à la ligne de métal plus nette que l’ovale à base de bois.',
    },
    'nero-xframe-dining': {
      title: 'Table à manger Nero à piètement en X',
      material: 'Marbre noir poli aux veines blanches, tréteau en métal noir',
      form: 'plateau rectangulaire arrondi sur un piètement en X',
      note: 'Un long plateau Nero aux angles adoucis, photographié à l’atelier devant une dalle emballée. La pierre est le produit ; le cadre la garde dans la pièce.',
    },
    'travertine-square-pedestal': {
      title: 'Table en travertin à piédestal carré',
      material: 'Travertin crème adouci',
      form: 'plateau circulaire sur un socle carré en pierre',
      note: 'Le rond contre le carré. Une table compacte de salle à manger ou de café en travertin à pores ouverts — inventaire pour une pièce plus petite qui veut encore de la pierre sous le repas.',
    },
    'sage-onyx-disc-table': {
      title: 'Table disque en onyx sauge',
      material: 'Onyx sauge poli, cerclage en métal brossé',
      form: 'table basse ou guéridon circulaire',
      note: 'Un disque achevé d’onyx rouille et menthe, photographié d’en haut pour que la face soit tout l’argument. Du mobilier de salon dans la même pierre que le livre de dalles.',
    },
    'sage-onyx-brass-table': {
      title: 'Table en onyx sauge et laiton',
      material: 'Onyx vert poli, cage en laiton brossé',
      form: 'guéridon d’appoint rond sur un tambour de tiges verticales',
      note: 'Sauge, crème et rouille dans la pierre ; une légère cage de laiton dessous. Un guéridon de la boutique, fait pour tenir seul dans une pièce qui a déjà un point de vue.',
    },
    'cream-oval-plinth-table': {
      title: 'Table ovale sur socle en crème',
      material: 'Marbre ou onyx crème poli aux veines fauves',
      form: 'table basse ovale sur une base de dalles décalées',
      note: 'Un ovale pâle et figuré sur un pied architectural fendu. Un meuble bas de salon qui se lit encore comme une construction.',
    },
    'linear-travertine-coffee': {
      title: 'Table basse linéaire en travertin',
      material: 'Travertin adouci coupe veine',
      form: 'dalle rectangulaire sur deux pieds en bloc',
      note: 'Un litage horizontal qui court sur toute la longueur d’une table basse. Un petit sceau doré sur le pied. Du mobilier dans le même travertin que les objets.',
    },
    'travertine-cube-table': {
      title: 'Table cube en travertin',
      material: 'Travertin beige adouci',
      form: 'piédestal cubique sur un socle en retrait',
      note: 'Un cube de pierre, rubané comme des strates, soulevé d’un doigt au-dessus du sol. Guéridon ou socle : les deux lectures sont justes.',
    },
    'travertine-tripod-coffee': {
      title: 'Table basse tripode en travertin',
      material: 'Travertin crème adouci',
      form: 'plateau circulaire sur trois dalles qui se croisent',
      note: 'Une table basse ronde dont la base est la rencontre de trois plans. D’abord la forme, puis les pores de la pierre.',
    },
    'travertine-block-side': {
      title: 'Guéridon bloc en travertin',
      material: 'Travertin adouci non stucqué',
      form: 'plateau rectangulaire épais sur un montant plein',
      note: 'Un petit bloc architectural : un montant, un plan. Photographié de près pour que les vides de la pierre restent visibles.',
    },
    'travertine-walnut-coffee': {
      title: 'Table basse en travertin et noyer',
      material: 'Travertin adouci, cadre en noyer sombre',
      form: 'plateau circulaire en pierre dans une ceinture de bois à quatre pieds',
      note: 'La pierre sertie dans le bois, milieu de siècle par les pieds, géologique par la face. Une table de salon de la boutique.',
    },
    'travertine-drum-side': {
      title: 'Guéridon tambour en travertin',
      material: 'Travertin crème adouci',
      form: 'plateau circulaire sur un piédestal cylindrique',
      note: 'Un cercle sur un tambour, photographié sur un parquet à chevrons. Un guéridon d’appoint discret pour un coin qui demande de la pierre, pas de l’ornement.',
    },
    'travertine-cone-pedestal': {
      title: 'Guéridon piédestal conique en travertin',
      material: 'Travertin crème adouci',
      form: 'plateau circulaire sur une base conique fuselée',
      note: 'Le même langage que les piédestaux de salle à manger, réduit à un guéridon. Un tronc de cône, un disque.',
    },
    'travertine-c-table': {
      title: 'Table en C en travertin',
      material: 'Travertin rubané adouci',
      form: 'guéridon en porte-à-faux en forme de C',
      note: 'Un bloc entaillé qui se glisse près d’un canapé. Le litage horizontal fait le dessin ; le vide est la partie utile.',
    },
    'banded-onyx-vase': {
      title: 'Vase en onyx rubané',
      material: 'Onyx rubané poli en rouille, ambre et crème',
      form: 'vase à épaulement au bord évasé',
      note: 'Des strates horizontales bordeaux, miel et sauge. Un objet de cheminée de l’inventaire de la boutique, fini comme une pièce à part entière.',
    },
    'portoro-cylinder-cup': {
      title: 'Pot cylindrique Portoro',
      material: 'Marbre noir poli aux veines d’or et de blanc',
      form: 'cylindre ouvert à bord épais',
      note: 'Un tambour court en Portoro — pot à plumes, vase ou poids sur un bureau. La veine est le dessin.',
    },
    'tall-noir-vase': {
      title: 'Grand vase en marbre noir',
      material: 'Marbre sombre poli aux veines blanches',
      form: 'vase allongé de sol ou de piédestal',
      note: 'Un haut cylindre doucement fuselé en pierre noire à fort contraste. Photographié contre une cimaise — une pièce devant laquelle on ralentit.',
    },
    'copper-vein-basin': {
      title: 'Vasque en marbre à veine de cuivre',
      material: 'Marbre noir poli aux veines de cuivre et de blanc',
      form: 'coupe ou vasque circulaire peu profonde',
      note: 'Une vasque ronde, prête pour la bonde, l’intérieur aussi figuré que l’extérieur. Bain ou nature morte — la même pierre dans les deux cas.',
    },
    'travertine-compote': {
      title: 'Compotier en travertin',
      material: 'Travertin beige adouci',
      form: 'large coupe sur un pied hémisphérique',
      note: 'Un centre de table surélevé, les pores laissés ouverts. Fruits, coquillages, ou vide. Architecture de table à l’échelle d’un repas.',
    },
    'sage-onyx-pear-bowl': {
      title: 'Bol en onyx sauge sur sphères',
      material: 'Onyx sauge poli',
      form: 'bol bas sur trois sphères de pierre',
      note: 'Onyx vert au mouvement de rouille, sur trois orbes assortis, photographié avec des poires. L’équilibre comme méthode de construction.',
    },
    'travertine-vanity-gold': {
      title: 'Ensemble de toilette en travertin à pompe dorée',
      material: 'Travertin beige adouci, pompe en métal doré',
      form: 'plateau, distributeur, gobelet, boîte et porte-savon',
      note: 'Un ensemble de bain de cinq pièces sur un plateau de pierre. Des objets quotidiens avec la même finition que le mobilier.',
    },
    'travertine-bath-ensemble': {
      title: 'Parure de bain en travertin',
      material: 'Travertin adouci, métal brossé et verre',
      form: 'plateau, pompe, boîtes et gobelet à brosses à dents en verre',
      note: 'Un ensemble spa photographié comme une nature morte. Coton, brosses en bois, pores ouverts — le bain traité comme une petite collection.',
    },
    'portoro-bath-set': {
      title: 'Ensemble de bain Portoro',
      material: 'Marbre noir poli aux veines d’or',
      form: 'cache-mouchoirs, distributeur, coupelle, gobelet et pot à couvercle',
      note: 'Cinq volumes Portoro pour un comptoir sombre. Le même éclair d’or que les tables à manger, à l’échelle du savon et du coton.',
    },
    'travertine-bath-seven': {
      title: 'Ensemble de bain sept pièces en travertin',
      material: 'Travertin adouci, chrome et laiton corail',
      form: 'ensemble de bain de sept pièces avec plateau, pot à brosse et boîte au couvercle de corail',
      note: 'Le langage du bain au complet : brosse de toilette, fleuron de corail, distributeur, gobelet, coupelle. Une pierre, plusieurs gestes quotidiens.',
    },
    'scalloped-onyx-bowl': {
      title: 'Bol festonné en onyx',
      material: 'Onyx sauge rubané poli',
      form: 'bol circulaire cannelé',
      note: 'Un bord ondulé dans un onyx translucide vert et terracotta. Deux vues : l’une sur marbre noir, l’autre à la lumière du jour. Une coupe pour des fruits, ou pour rien.',
    },
    'sage-onyx-coasters': {
      title: 'Ensemble de sous-verres en onyx sauge',
      material: 'Onyx sauge rubané poli',
      form: 'disques circulaires dans un support cylindrique à découpe en U',
      note: 'Architecture de table à l’échelle d’un verre. Deux photographies du même ensemble emboîté — menthe, rouille et une encoche pour le pouce.',
    },
    'portoro-baluster-vase': {
      title: 'Vase balustre Portoro',
      material: 'Marbre noir poli aux veines blanches et ambre',
      form: 'urne classique à col annelé et pied de piédestal',
      note: 'Un vase Portoro tourné, de haut brillant, pour une étagère qui sait déjà se taire.',
    },
    'terracotta-marble-urn': {
      title: 'Urne en marbre terracotta',
      material: 'Marbre charbon poli à figure terracotta et crème',
      form: 'urne à pied sur un socle carré',
      note: 'Une jardinière ou un objet : orange brûlé contre la pierre sombre, un pied carré. Une sculpture qui peut aussi tenir une plante.',
    },
    'live-edge-onyx-vessel': {
      title: 'Coupe en onyx à bord brut',
      material: 'Onyx sauge rubané poli',
      form: 'coupe basse allongée à bord brut',
      note: 'Un plat ovale en onyx, la lèvre laissée irrégulière. Organique plutôt que tourné — un centre de table de l’inventaire d’objets.',
    },
    'pair-stone-pedestals': {
      title: 'Paire de piédestaux en pierre',
      material: 'Marbre sombre poli à figure fauve',
      form: 'colonnes d’exposition doriques assorties',
      note: 'Deux piédestaux élancés pour un buste, un vase ou une hauteur vide. Éléments architecturaux vendus par paire.',
    },
    'onyx-chess-casket': {
      title: 'Coffret d’échecs en onyx',
      material: 'Onyx blanc et onyx rubané polis, étui de velours',
      form: 'jeu d’échecs de voyage dans un coffret de présentation doublé',
      note: 'Onyx blanc contre onyx rubané rouille et sauge, logé dans un étui bordeaux. Un jeu traité comme un objet.',
    },
    'nero-chess-set': {
      title: 'Jeu d’échecs Nero',
      material: 'Pierre noire et pierre pâle figurée, polies',
      form: 'plateau complet aux pièces de pierre sculptées',
      note: 'Un plateau Nero carré à large bordure noire. Des pièces dans les deux mêmes pierres. Une sculpture de salon qui se joue aussi.',
    },
    'viola-marble-fireplace': {
      title: 'Cheminée en marbre Viola',
      material: 'Marbre crème poli à figure rouille et charbon',
      form: 'manteau sculpté, âtre et paroi assortis',
      note: 'Un encadrement à l’échelle de la pièce : manteau, âtre et la dalle au-dessus, veines appariées. La pierre comme architecture pour un salon ou un hall.',
    },
    'nero-marble-fireplace': {
      title: 'Cheminée en marbre Nero',
      material: 'Marbre noir poli aux veines blanches',
      form: 'manteau et âtre classiques à panneaux',
      note: 'Un encadrement Nero à panneaux en retrait, photographié avec un feu allumé. Pierre architecturale pour un intérieur spécifié.',
    },
    'portoro-workshop-mantel': {
      title: 'Manteau de cheminée Portoro à l’atelier',
      material: 'Marbre noir poli aux veines d’or',
      form: 'encadrement de cheminée sculpté sur le sol de l’atelier',
      note: 'Pris au dépôt avant la pose : rivières d’or sur un fond noir, moulures déjà taillées. Voilà comment un manteau quitte Karachi.',
    },
    'honey-quartzite-slab': {
      title: 'Dalle de quartzite miel',
      material: 'Pierre cristalline polie aux veines d’or et d’ambre',
      form: 'face de dalle grand format',
      note: 'Un fond crème lumineux aux rivières d’ambre. Photographiée comme une face de lot — la pierre avant qu’elle ne devienne comptoir ou mur.',
    },
    'celadon-onyx-slab': {
      title: 'Dalle d’onyx céladon',
      material: 'Onyx sauge translucide poli',
      form: 'face d’onyx verticale',
      note: 'Menthe et crème aux poches de rouille. Une photographie du dépôt d’un onyx qui supporte le rétroéclairage — discuté comme un lot, non comme une planche d’ambiance.',
    },
    'nero-calcite-lot': {
      title: 'Lot Nero à calcite',
      material: 'Marbre noir poli aux veines de calcite blanche',
      form: 'deux faces du même lot noir et blanc',
      note: 'Du blanc déchiqueté sur un fond noir, enregistré en deux faces rapprochées. Inventaire pour les architectes et le bureau export.',
    },
    'sage-rust-onyx-slab': {
      title: 'Dalle d’onyx sauge et rouille',
      material: 'Onyx vert poli à figure rouille et or',
      form: 'face d’onyx plein cadre',
      note: 'Un éclair d’ambre sur un fond céladon. La même famille que les tables disque, montrée ici comme pierre en volume.',
    },
    'portoro-gold-lot': {
      title: 'Lot Portoro or',
      material: 'Marbre noir poli aux veines or miel',
      form: 'face de dalle et panneau de marqueterie en livre ouvert',
      note: 'Deux relevés du Portoro : une face brute, puis un panneau aux bordures tournées. C’est la coupe dont se tirent les tables à manger.',
    },
  },
  collectionIndex: {
    eyebrow: 'ST WERKZ / LA MATÉRIAUTHÈQUE',
    explore: (count: number) =>
      count === 1 ? 'Découvrir la collection' : `Découvrir les ${FR_NUMBER_WORDS[count] ?? count} collections`,
    samplesAria: 'Échantillons de pierre naturelle',
    whiteAlt: 'Face originale de marbre Ziarat White aux fines veines grises en diagonale',
    whiteCaption: 'ZIARAT WHITE / MARBRE',
    amberAlt: 'Face originale d’onyx orange aux bandes orange chaud et aux pâles lignes minérales',
    amberCaption: 'ONYX ORANGE / MOUVEMENT NATUREL',
    notationBefore: 'Jamais deux veines',
    notationAfter: 'ne racontent la même histoire.',
    indexAria: 'Collections de matières',
    atlasEyebrow: (count: number) =>
      `${(FR_NUMBER_WORDS[count] ?? String(count)).toUpperCase()} ${count === 1 ? 'COLLECTION' : 'COLLECTIONS'} / DE PLUS PRÈS`,
    atlasTitleBefore: 'Le caractère',
    atlasTitleEm: 'est dans le détail.',
    atlasBodyFirst: 'Une matière autour de laquelle construire.',
    atlasBodySecond: 'Un objet avec lequel vivre.',
    roomPhotos: {
      marble: {
        alt: 'Échantillon de marbre Black and Gold, pierre sombre aux chaudes veines d’or',
        caption: 'Black & Gold / Face de marbre',
      },
      onyx: {
        alt: 'Échantillon d’onyx vert clair aux douces bandes de vert et de crème',
        caption: 'Onyx vert clair / Face de pierre',
      },
      limestone: {
        alt: 'Table basse en travertin adouci, dalle épaisse sur deux pieds-socles en pierre',
        caption: 'Travertin / Façonné dans la pierre',
      },
      slabs: {
        alt: 'Photographie originale de dalles de marbre noir aux veines blanches, debout au dépôt de pierre',
        caption: 'Dalles Nero / Au dépôt',
      },
      handicrafts: {
        alt: 'Vase balustre en marbre Portoro sculpté, au col annelé et au pied de piédestal',
        caption: 'Portoro / L’objet sculpté',
      },
    },
    spacesEyebrow: 'DE LA MATIÈRE À VOTRE MAISON',
    spacesTitle: 'Un espace en tête ?',
    spacesBody: 'Découvrez les accessoires selon votre façon de vivre.',
    spacesAria: 'Trouver des produits par espace',
    spaceKitchen: 'Cuisine',
    spaceWashroom: 'Salle de bain',
    spaceHomeDecor: 'Décoration de la maison',
  },
  gallery: {
    previousPhoto: 'Photographie précédente',
    nextPhoto: 'Photographie suivante',
    photosAria: 'Photographies du produit',
    viewPhoto: (index: number, total: number, title: string) =>
      `Voir la photographie ${index} sur ${total} : ${title}`,
  },
  dataText: {
    stones: {
      flower: {
        colour: 'Figure florale rouge / rose',
        origin: 'Gisements de Lasbela et de Swat',
        use: 'Sols économiques et bordures décoratives',
      },
      'sunny-grey': {
        colour: 'Gris froid, grain fin',
        use: 'Sols et pièces du quotidien',
      },
      'badal-grey': {
        colour: 'Gris nuagé',
        use: 'Sols modernes et escaliers',
      },
      'silky-black': {
        colour: 'Noir de jais au léger mouvement',
        use: 'Bordures, bandes de contraste, sols',
      },
      tavera: {
        colour: 'Beige chaud / crème, souvent fossilifère',
        origin: 'Lasbela, Baloutchistan, et Swat',
        use: 'Sols de maison familiale',
      },
      'ziarat-grey': {
        colour: 'Gris haut de gamme uniforme',
        origin: 'Mohmand / gisement blanc de Ziarat, KPK',
        use: 'Sols gris modernes',
      },
      'sunny-white': {
        colour: 'Blanc éclatant, veine gris clair',
        use: 'Maisons, escaliers, pièces',
      },
      'cheetah-white': {
        colour: 'Blanc à figure tachetée / léopard',
        origin: 'Dépôts de négoce de Khyber Pakhtunkhwa',
        use: 'Sols de caractère à motif',
      },
      'strawberry-red': {
        colour: 'Rouge chaud',
        origin: 'Carrières locales du Pakistan',
        use: 'Bordures et sols décoratifs',
      },
      'sun-tippi': {
        colour: 'Beige chaud au mouvement doux',
        use: 'Intérieurs chaleureux et escaliers',
      },
      'cherry-pink': {
        colour: 'Rose doux',
        origin: 'Carrières locales du Pakistan',
        use: 'Sols décoratifs et parements',
      },
      'botticino-fancy': {
        colour: 'Beige à figure nuageuse',
        use: 'Sols familiaux et plans de cuisine',
      },
      'sona-beige': {
        colour: 'Beige doré',
        origin: 'Gisements de pierre crème du Baloutchistan',
        use: 'Accueils chaleureux et parements',
      },
      verona: {
        colour: 'Beige crème, parfois tacheté',
        use: 'Intérieurs chaleureux classiques',
      },
      'shangla-white': {
        colour: 'Blanc fin',
        use: 'Sols et parements légers',
      },
      'elegant-grey': {
        colour: 'Gris argent',
        origin: 'Gisements de marbre gris du Pakistan',
        use: 'Villas modernes et salles de bain',
      },
      'mastung-cream': {
        colour: 'Crème foncé, grain compact',
        origin: 'Mastung et Loralai, Baloutchistan',
        use: 'Sols chaleureux et escaliers',
      },
      'jungle-green': {
        colour: 'Vert profond',
        origin: 'Gisements de marbre vert du Pakistan',
        use: 'Bordures, mosquées, panneaux de caractère',
      },
      'pak-black': {
        colour: 'Noir dense',
        origin: 'Buner et Baloutchistan',
        use: 'Bordures, escaliers, zones de caractère',
      },
      'mohmand-white': {
        colour: 'Blanc à calcite grise',
        use: 'Sols, murs, plateaux de meubles',
      },
      'antique-green': {
        colour: 'Vert ancien à figure',
        origin: 'Gisements de marbre vert du Pakistan',
        use: 'Panneaux de caractère et parements',
      },
      'golden-marble': {
        colour: 'Or sur crème ou beige',
        origin: 'Pakistan / gisements locaux de marbre doré, mêlés',
        use: 'Intérieurs de luxe classiques',
      },
      'pakistan-chocolate': {
        colour: 'Brun chaud',
        origin: 'Gisements de marbre brun du Baloutchistan',
        use: 'Accueil et parements',
      },
      teakwood: {
        colour: 'Brun au fil de bois',
        use: 'Pièces chaleureuses et faces de meubles',
      },
      'black-n-gold': {
        colour: 'Noir aux taches et veines dorées',
        use: 'Bordures, murs, comptoirs de luxe',
      },
      'himalayan-white': {
        colour: 'Blanc du Nord',
        origin: 'Chitral, Hunza et gisements du Nord',
        use: 'Intérieurs blancs haut de gamme',
      },
      'ziarat-white': {
        colour: 'Blanc net à la discrète veine grise',
        use: 'Sols, escaliers, murs de luxe',
      },
      'sahara-gold': {
        colour: 'Or sablé',
        origin: 'Gisements de pierre dorée du Pakistan',
        use: 'Sols de caractère et parements',
      },
      'indus-gold': {
        colour: 'Figure dorée marquée',
        origin: 'Gisements de pierre dorée du Pakistan',
        use: 'Murs et sols de caractère dorés',
      },
      'ziarat-supreme': {
        colour: 'Ziarat White du plus haut choix',
        use: 'Villas, escaliers, accueil',
      },
      'michael-angelo': {
        colour: 'Noir aux veines or / ambre',
        use: 'Murs de caractère, comptoirs, mobilier',
      },
      'light-green-onyx': {
        colour: 'Vert pâle, nuageux, translucide',
        origin: 'Gisements de Chagai–Bolan–Lasbela–Khuzdar',
        use: 'Murs rétroéclairés, meubles de toilette, plateaux de table',
      },
      'green-onyx': {
        colour: 'Vert aux bandes blanches, brunes et dorées',
        use: 'Comptoirs, tables, intérieurs d’hôtel',
      },
      'multi-green-onyx': {
        colour: 'Vert, blanc, miel et or mêlés',
        origin: 'Chagai et Khuzdar',
        use: 'Grands parements et accueil',
      },
      'dark-green-onyx': {
        colour: 'Vert profond, bandes marquées',
        use: 'Murs forts et tables de luxe',
      },
      'brown-onyx': {
        colour: 'Brun terre, crème et miel',
        origin: 'Gisements d’onyx du Baloutchistan',
        use: 'Tables, comptoirs, panneaux décoratifs',
      },
      'honey-onyx': {
        colour: 'Jaune doré / ambre, très translucide',
        origin: 'Chagai et Lasbela',
        use: 'Bars rétroéclairés, salles de bain, panneaux',
      },
      'orange-onyx': {
        colour: 'Orange chaud et or',
        origin: 'Gisements d’onyx du Baloutchistan',
        use: 'Panneaux rétroéclairés et mobilier',
      },
      'white-onyx': {
        colour: 'Blanc à crème, veine or ou grise',
        origin: 'Chagai ; approvisionnement limité',
        use: 'Bains de luxe, meubles de toilette, plateaux de table',
      },
      'red-onyx': {
        colour: 'Rouge mêlé de brun, de vert et de crème',
        origin: 'Gisements d’onyx du Baloutchistan',
        use: 'Murs de caractère et mobilier sur mesure',
      },
      'pink-onyx': {
        colour: 'Rose, souvent rare',
        origin: 'Négoce d’onyx Pakistan–Afghanistan',
        use: 'Intérieurs boutique et plateaux de table',
      },
      'black-onyx': {
        colour: 'Presque noir, translucidité limitée',
        origin: 'Baloutchistan ; selon la carrière',
        use: 'Comptoirs et mobilier modernes',
      },
      'blue-onyx': {
        colour: 'Bleu, la plus rare des couleurs courantes',
        origin: 'Baloutchistan ; pas toujours en stock',
        use: 'Travaux décoratifs de grand luxe',
      },
    },
    chapters: {
      kitchen: {
        title: 'Se réunir autour de la pierre.',
        subtitle: 'Petits rituels. Objets extraordinaires.',
        description:
          'Un bol sculptural au centre de la table. Un plateau qui rassemble les petites choses. Découvrez bols, plateaux, sous-verres et boîtes en travertin naturel, onyx et marbre poli.',
        material: 'Travertin, onyx et marbre',
        heroAlt:
          'Large coupe sur pied en travertin beige au pied hémisphérique, photographiée à côté de coquillages',
      },
      washroom: {
        title: 'Un luxe plus discret.',
        subtitle: 'Votre sanctuaire quotidien, sculpté dans la pierre.',
        description:
          'D’une vasque en marbre poli à un ensemble de toilette composé avec soin, la pierre naturelle fait d’une routine quotidienne un geste pensé. Découvrez distributeurs, gobelets de toilette, porte-savons et parures de bain complètes, ainsi que des contenants décoratifs pour une étagère ou un comptoir.',
        material: 'Marbre et travertin',
        heroAlt:
          'Ensemble de bain en marbre Portoro noir et or avec distributeur, cache-mouchoirs, gobelet, pot à couvercle et porte-savon',
      },
      'home-decor': {
        title: 'Faites comme chez vous.',
        subtitle: 'Un peu de caractère. Un lieu à vous.',
        description:
          'Un vase fort sur la console. Des bougeoirs près de votre fauteuil préféré. Un jeu d’échecs sculpté, prêt pour une soirée sans hâte. Découvrez vases, serre-livres, objets de bureau, socles d’exposition et guéridons compacts qui apportent chaleur et caractère à votre maison.',
        material: 'Onyx, marbre et travertin',
        heroAlt:
          'Vase en onyx rubané poli au bord évasé, aux couches naturelles d’ambre, de rouille, de crème et de sauge',
      },
    },
    accessories: {
      'onyx-mortar-pestle': {
        title: 'Mortier et pilon en onyx',
        material: 'Pierre rubanée crème et ambre',
        description: 'Un mortier à main et son pilon assorti, photographiés en cours d’utilisation.',
        alt: 'Photographie réelle d’une personne utilisant un mortier en pierre rubanée crème et ambre avec son pilon assorti',
      },
      'marble-serving-board': {
        title: 'Planche de service en marbre',
        material: 'Marbre blanc et gris',
        description: 'Une planche allongée aux extrémités arrondies, photographiée avec des viennoiseries.',
        alt: 'Photographie réelle en vue de dessus d’une planche de service complète en marbre blanc et gris portant trois viennoiseries',
      },
      'slate-cheese-platter': {
        title: 'Plateau de service en ardoise',
        material: 'Ardoise noire naturelle',
        description: 'Un large plateau de pierre texturé pour une composition de table.',
        alt: 'Photographie réelle en vue de dessus d’un plateau rectangulaire complet en ardoise noire portant un assortiment de fromages et de charcuterie',
      },
      'portoro-soap-dispenser': {
        title: 'Distributeur de savon Portoro',
        material: 'Marbre noir poli aux veines d’or',
        description: 'Un distributeur de pierre arrondi à pompe en métal.',
        alt: 'Détail retouché d’un distributeur de savon en marbre noir et or ; voir la photographie originale de l’Ensemble de bain Portoro',
      },
      'travertine-soap-dish': {
        title: 'Porte-savon en travertin',
        material: 'Travertin beige adouci',
        description: 'Une coupelle circulaire peu profonde au bord doucement arrondi.',
        alt: 'Détail retouché d’un porte-savon circulaire en travertin ; voir la photographie originale de l’Ensemble de toilette en travertin à pompe dorée',
      },
      'travertine-brush-holder': {
        title: 'Porte-brosse en travertin',
        material: 'Travertin adouci avec une brosse en métal',
        description: 'Une haute brosse et son support cylindrique en pierre, à placer près du meuble de toilette.',
        alt: 'Détail retouché d’une brosse en métal et d’un support cylindrique en travertin ; voir la photographie originale de l’Ensemble de bain sept pièces en travertin',
      },
      'travertine-cotton-jar': {
        title: 'Pot à coton en travertin',
        material: 'Travertin chaud adouci',
        description: 'Un contenant à coton sculpté au couvercle posé, doucement arrondi.',
        alt: 'Détail retouché d’un pot à coton en travertin à couvercle ; voir la photographie originale de la Parure de bain en travertin',
      },
    },
  },
};
