import type { Catalog } from '../types';
import { homeDesignCopy } from './home-design';
import { withCatalogFallback } from './fallback';
import { desks, stoneIndexes } from './desks';
import { shippingCopy } from './shipping';

export const fr: Catalog = withCatalogFallback({
  luxuryHome: homeDesignCopy.fr,
  seo: {
    keywords:
      'table en marbre, table à manger en travertin, table basse en onyx, onyx rétroéclairé, dalles de marbre, meubles en marbre sur mesure, St Werkz Karachi, atelier de pierre Karachi, Syed Rashid Ali, travertin Pakistan, onyx Karachi',
    tagline: 'Un atelier de pierre à Karachi',
    description:
      'St Werkz est un atelier de pierre à Karachi qui réalise tables, objets et surfaces architecturales en travertin, onyx et marbre. La collection se montre comme une galerie ; les visites se prennent sur demande.',
    ogImageAlt:
      'Comptoir d’accueil en travertin à chant brut dans un hall d’hôtel silencieux, St Werkz Karachi',
    pages: {
      home: {
        title: 'St Werkz, Karachi — Atelier de pierre pour tables, objets et surfaces',
        description:
          'St Werkz est un atelier de pierre à Karachi : tables, objets et surfaces en travertin, onyx et marbre. Parcourez la collection ou demandez une visite.',
      },
      collection: {
        title: 'La collection — St Werkz, Karachi',
        description:
          'Cinq salles de pierre St Werkz — salle à manger, salon, accents, intérieurs et dalles — accrochées comme une galerie à Karachi. Pas de prix au mur ; demandez une visite.',
      },
      atelier: {
        title: 'Atelier — St Werkz, Karachi',
        description:
          'St Werkz est un atelier de matière à Karachi dirigé par Syed Rashid Ali. Mobilier en travertin, onyx et marbre, de la première conversation à une surface qui demeure.',
      },
      enquire: {
        title: 'Demander une visite — St Werkz, Karachi',
        description:
          'Demandez une visite St Werkz à Karachi. Écrivez à stoneworks014@gmail.com ou appelez le +92 304 7689678. Nommez une œuvre ou la salle : conversation d’atelier, pas un panier.',
      },
      estimate: {
        title: 'Estimation d’atelier — St Werkz, Karachi',
        description:
          'Une première fourchette St Werkz en PKR avant la dalle : indicative, pas un prix. Décrivez la pièce, la pierre et la taille. Syed Rashid Ali confirme la pierre à Karachi.',
      },
      retailers: {
        title: 'Pour les revendeurs — St Werkz, Karachi',
        description:
          'Une sélection St Werkz d’objets en marbre, onyx et travertin pour les revendeurs. Conversation commerciale avec l’atelier de Karachi : étagères composées, pas un entrepôt.',
      },
      retail: {
        title: 'Boutique — St Werkz, Karachi',
        description:
          'Objets en onyx et marbre faits main pour la maison chez St Werkz, Karachi — bols, urnes et tables, montrés comme une galerie. Parcourez les salles, puis demandez une visite.',
      },
      architects: {
        title: 'Architecte — St Werkz, Karachi',
        description:
          'Accompagnement matière de St Werkz pour architectes à Karachi : échantillons, mobilier en pierre, dalles et surfaces spécifiés avec intention.',
      },
      interiors: {
        title: 'Design d’intérieur — St Werkz, Karachi',
        description:
          'Objets et dalles pour décorateurs chez St Werkz, Karachi — pièces faites main et surfaces architecturales pour des pièces habitées.',
      },
      export: {
        title: 'Bureau export — St Werkz, Karachi',
        description:
          'Lots photographiés de marbre, d’onyx et de travertin depuis la cour St Werkz à Karachi. Une caisse d’échantillons avant un conteneur. FOB Karachi ; pas de tarif affiché.',
        keywords:
          'export dalles de marbre Karachi, lots d’onyx pakistanais, dalles de travertin FOB Karachi, marbre figuré Pakistan, cour St Werkz Karachi, exporter du marbre du Pakistan, Syed Rashid Ali',
      },
      stones: {
        title: 'Marbre et onyx du Pakistan — St Werkz, Karachi',
        description:
          'Marbres et onyx pakistanis nommés — Ziarat White, Sunny Grey, Tavera, Black and Gold, onyx vert et miel — avec des fourchettes indicatives en PKR par pied carré, septembre 2026.',
        keywords:
          'marbre du Pakistan, Ziarat White, Sunny Grey, Tavera, Black and Gold, onyx pakistanais, onyx vert Pakistan, onyx miel, tarif marbre PKR pied carré, St Werkz Karachi',
      },
      notFound: {
        title: 'Page introuvable — St Werkz, Karachi',
        description:
          'Cette page St Werkz n’est pas en salle. Revenez à la collection de Karachi de tables, objets et surfaces en pierre, ou demandez une visite.',
      },
    },
    pieceTitle: (title) => `${title} — St Werkz, Karachi`,
    roomTitle: (title) => `${title} — St Werkz, Karachi`,
    pieceAlt: (title, material, viewIndex) => {
      const lowered = material.charAt(0).toLowerCase() + material.slice(1);
      const base = `${title} en ${lowered}`;
      if (viewIndex != null && viewIndex > 0) return `${base}, vue ${viewIndex + 1}`;
      return base;
    },
    pieceCite: (title, form, material, evidence, dimensions) => {
      const dim = dimensions ? ` Dimensions : ${dimensions}.` : '';
      return `${title} est ${form} en ${material}, réalisé par St Werkz sous la direction de Syed Rashid Ali à Karachi.${dim} Preuve : ${evidence.toLowerCase()}.`;
    },
  },
  chrome: {
    skip: 'Aller à la collection',
    collection: 'Collection',
    atelier: 'Atelier',
    estimate: 'Estimation',
    enquire: 'Demande',
    requestViewing: 'Demander une visite',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    forRetailers: 'Pour les revendeurs',
    forArchitects: 'Pour les architectes',
    forExport: 'Bureau export',
    retailStore: 'Boutique',
    architect: 'Architecte',
    interiorDesign: 'Design d’intérieur',
    wholesalers: 'Grossistes',
    footerBrand: 'St Werkz / Karachi',
    poweredBy: 'Propulsé par',
    questions: 'Questions',
    retailers: 'Revendeurs',
    architects: 'Architectes',
    export: 'Export',
    stones: 'Pierres',
    languages: 'Langues',
    homeAria: 'Accueil St Werkz',
    primaryNav: 'Navigation principale',
  },
  hint: {
    message: 'St Werkz est aussi rédigé dans votre langue.',
    action: 'Continuer en {language}',
    dismiss: 'Rester en anglais',
  },
  definitions: {
    studio:
      'St Werkz est un atelier de pierre à Karachi dirigé par Syed Rashid Ali. Il réalise meubles, objets, intérieurs et dalles en travertin, onyx et marbre. La collection est accrochée en cinq salles et se montre sur visite, elle ne se vend pas depuis un panier. Il n’y a pas de prix au mur.',
    estimate:
      'Une estimation d’atelier St Werkz est une fourchette indicative en PKR selon la taille, la pierre et la forme. Ce n’est ni un prix, ni un devis fermé, ni un achat. Chaque dalle est unique. Une visite à l’atelier de Karachi confirme la pierre avant que la commande n’aille plus loin.',
    collection:
      'La collection St Werkz, ce sont cinq salles de pierre — salle à manger, salon, accents, intérieurs et surfaces — montrées à Karachi comme une galerie. Chaque salle a un texte de mur et des œuvres accrochées avec de l’air autour. Demandez une visite pour voir une pièce en personne.',
    retailer:
      'St Werkz fournit les revendeurs d’une sélection pensée d’objets en marbre, onyx et travertin depuis son atelier de Karachi. Les collections d’ouverture se construisent avec le magasin, elles ne se déversent pas d’un entrepôt. Les conversations commerciales commencent avec Syed Rashid Ali.',
    retailStore:
      'La boutique St Werkz est la galerie de Karachi d’objets en onyx et marbre faits main pour la maison — bols, urnes, tables — montrés sur rendez-vous, non vendus depuis un panier.',
    architect:
      'St Werkz aide les architectes à spécifier travertin, onyx et marbre depuis Karachi. L’accompagnement va du premier échantillon à la pièce terminée. Apportez un brief ou une question de matière à Syed Rashid Ali.',
    interiorDesigner:
      'St Werkz travaille avec les décorateurs sur des objets faits main et des dalles pour des pièces habitées. Spécifiez une table, une urne, un comptoir ou un mur depuis le même atelier de Karachi.',
    export:
      'St Werkz discute lots de marbre, d’onyx et de travertin depuis sa cour à Karachi avec importateurs et ateliers. Un lot photographié et une caisse d’échantillons précèdent un conteneur. Il n’y a pas de tarif publié. Syed Rashid Ali prend la conversation. Le mobilier reste dans la galerie.',
    origin:
      'St Werkz s’enracine dans une famille de Bandha, à Allahabad, Uttar Pradesh. Des générations de migration ont porté musique, peinture, couleur et métier ; ce rapport hérité au faire prend aujourd’hui forme en marbre, onyx et travertin à Karachi.',
    piece: (title, material, form, roomTitle) =>
      `${title} est une œuvre St Werkz en ${material}, de la salle ${roomTitle} à Karachi. ${form}.`,
    room: (title, wallText) => `${title} est une salle de la collection St Werkz à Karachi. ${wallText}`,
  },
  home: {
    heroKicker: 'Karachi / un atelier de matière',
    heroTitle: 'Pierre à l’échelle. Sculptée pour un.',
    heroBody:
      'Des objets singuliers faits main pour la maison à l’approvisionnement en marbre de gros et aux surfaces architecturales en volume.',
    enterCollection: 'Entrer dans la collection',
    studioEstimate: 'Estimation d’atelier',
    requestViewing: 'Demander une visite',
    walkIn: 'Entrer',
    onView: (count) => `En salle / ${count} œuvres`,
    roomsHeadingBefore: 'Cinq salles de pierre, accrochées comme une ',
    roomsHeadingEm: 'galerie.',
    questionsLink: 'Questions, réponses claires',
    featuredCaption: 'Socle d’onyx lumineux / Salon et lumière',
    studioKicker: 'L’atelier',
    studioBody: (name) =>
      `St Werkz est dirigé par ${name} depuis l’atelier de Karachi. Pour un premier regard sur une table, un lavabo ou une dalle, demandez une visite — pas un paiement en ligne.`,
    diningAmong: (dining, total) => `${dining} œuvres de salle à manger, parmi ${total} de la collection`,
    beginEstimate: 'Commencer par une estimation d’atelier',
    requestViewingCta: 'Demander une visite',
    works: (count) => `${count} œuvres`,
    heroAlt: 'Artisanat de pierre pakistanais en onyx miel, marbre noir et marbre veiné d’or, St Werkz Karachi',
    secondStillAlt: 'Table basse en onyx blanc rétroéclairé qui luit dans un salon, St Werkz Karachi',
    journeysKicker: 'Qui vous êtes / où aller',
    journeysTitleBefore: 'Trois chemins dans l’',
    journeysTitleEm: 'atelier.',
    journeysBody:
      'Voyez comment collectionneurs, architectes et partenaires de gros entrent chez St Werkz — puis choisissez la porte qui vous convient.',
    journeysVideoLabel: 'Parcours St Werkz : trois entrées dans l’atelier de Karachi',
    journeysCaptionsLabel: 'Sous-titres anglais',
    journeysCollectorName: 'Le collectionneur',
    journeysCollectorBody: 'Une pièce singulière pour la maison. Objets faits main, présentés en galerie.',
    journeysCollectorCta: 'Entrer dans la collection',
    journeysVisionaryName: 'Le visionnaire',
    journeysVisionaryBody: 'Objets et dalles pour de grands espaces — architectes et décorateurs.',
    journeysVisionaryCta: 'Pour les architectes',
    journeysStrategistName: 'Le stratège',
    journeysStrategistBody: 'Approvisionnement de gros et logistique — dalles, volume et le bureau export.',
    journeysStrategistCta: 'Bureau export',
  },
  collection: {
    kicker: 'La collection / cinq salles',
    titleBefore: 'Parcourez les ',
    titleEm: 'salles.',
    roomLine: (roman, count) => `Salle ${roman} / ${count} œuvres`,
    enterRoom: 'Entrer dans cette salle',
    roomNotHung: 'Cette salle n’est pas accrochée.',
    returnCollection: 'Revenir à la collection',
    workNotOnView: 'Cette œuvre n’est pas en salle.',
    stone: 'Pierre',
    form: 'Forme',
    dimensions: 'Dimensions',
    sameRoom: 'Dans la même salle',
    otherWorks: 'Autres œuvres',
    requestViewing: 'Demander une visite',
    estimateSimilar: 'Estimer une pièce semblable',
    citeWork: 'Citer cette œuvre',
    maker: 'Auteur',
    studio: 'Atelier',
    stoneFamily: 'Famille de pierre',
    finish: 'Finition',
    evidence: 'Preuve',
    reviewed: 'Relu',
    studioCity: 'St Werkz, Karachi',
  },
  atelier: {
    kicker: 'Un point de vue matériel',
    titleBefore: 'La bonne pierre a une sorte de ',
    titleEm: 'gravité.',
    originKicker: 'D’où vient le travail',
    originTitleBefore: 'Une famille qui a porté la ',
    originTitleEm: 'couleur.',
    howKicker: 'Comment nous travaillons',
    howTitleBefore: 'D’une idée ouverte à quelque chose qui ',
    howTitleEm: 'demeure.',
    materialsKicker: 'Les pierres que nous travaillons',
    materialsTitleBefore: 'Travertin, onyx et ',
    materialsTitleEm: 'marbre.',
    namedStonesKicker: 'Pakistan / pierres nommées',
    namedStonesBody:
      'Noms commerciaux de Buner, Mohmand, Swat, Lasbela et de la ceinture d’onyx de Chagai, avec des tarifs matière indicatifs de septembre 2026. Ce n’est pas un devis pour une pièce finie.',
    namedStonesCta: 'Tous les noms et tarifs',
    personKicker: 'La personne derrière l’atelier',
    personTitleBefore: 'Une ligne directe vers ',
    personTitleEm: 'la source.',
    personBody: (name) =>
      `St Werkz est dirigé par ${name}. Pour les questions de matière, les conversations de projet ou un premier regard sur une œuvre de la collection, c’est lui qu’il faut appeler.`,
    studioEstimate: 'Estimation d’atelier',
    requestViewing: 'Demander une visite',
    process: [
      {
        name: 'Écouter d’abord',
        text: 'Parlez-nous de la pièce, de la lumière et de ce que vous voulez qu’elle sente.',
      },
      {
        name: 'Trouver la bonne coupe',
        text: 'Nous regardons au-delà de l’évidence : ton, grain, échelle, chant et la façon dont la pierre vieillira.',
      },
      {
        name: 'Une première fourchette',
        text: 'Si vous avez déjà une taille en tête, une estimation d’atelier donne une bande indicative — jamais un prix final.',
      },
      {
        name: 'Le rendre réel',
        text: 'Échantillons, conseils honnêtes et un chemin clair de la première conversation à l’installation.',
      },
    ],
    counterAlt: 'Comptoir d’exposition en travertin avec lumière en sous-face',
    assemblageAlt: 'Table ovale en travertin crème à l’atelier',
    faqKicker: 'Questions / réponses claires',
    faqTitleBefore: 'Ce que l’on demande à l’',
    faqTitleEm: 'atelier.',
    faqIntro:
      'Réponses courtes, écrites pour être lues à voix haute. Si la question porte sur une œuvre précise, demandez une visite.',
  },
  enquire: {
    kicker: 'Demander une visite',
    kickerFromEstimate: 'Demander cette estimation',
    titleBefore: 'Tout commence par ',
    titleEm: 'une question.',
    body: 'Dites-nous quelle œuvre vous aimeriez voir, ou décrivez la pièce. Syed Rashid Ali prendra la note. C’est une conversation d’atelier — pas un panier.',
    bodyFromEstimate:
      'Le brief de votre estimation d’atelier est sur le bureau. Syed Rashid Ali prendra la note : cela reste une conversation, pas un panier.',
    rangeNoted: (range) => `Fourchette indicative notée : ${range}. `,
    viewingConfirms: 'Une visite confirme encore la pierre.',
    reviseEstimate: 'Revoir l’estimation',
    currentlyAsking: (title) => `Demande en cours au sujet de ${title}`,
    viewWork: 'Voir l’œuvre',
    name: 'Votre nom',
    namePlaceholder: 'Comment devons-nous vous nommer ?',
    email: 'Adresse e-mail',
    emailPlaceholder: 'Où pouvons-nous répondre ?',
    whatToSee: 'Que souhaiteriez-vous voir ?',
    briefing: 'Le brief',
    messagePlaceholder: 'Une table, une pièce, une dalle — ou simplement une heure de visite.',
    viewingOf: (title) => `Je souhaiterais demander une visite de ${title}.`,
    send: 'Envoyer la demande',
    successTitle: 'Votre note est sur le bureau.',
    successBody: 'Merci. Pour une réponse plus rapide, vous pouvez aussi écrire directement à l’atelier.',
    emailStudio: 'Écrire à l’atelier',
    howKicker: 'Comment demander une visite',
    howTitleBefore: 'Quatre étapes, puis la ',
    howTitleEm: 'pierre.',
    howToName: 'Comment demander une visite chez St Werkz',
    howToDescription:
      'Demandez une visite de mobilier, d’objets ou de dalles en pierre à l’atelier St Werkz de Karachi. C’est une conversation d’atelier, pas un achat en ligne.',
    steps: [
      {
        number: '01',
        name: 'Choisissez une œuvre, ou décrivez la pièce',
        text: 'Parcourez la collection et nommez la pièce que vous voulez voir, ou parlez à l’atelier de la pièce, de la lumière et de la surface dont vous avez besoin.',
      },
      {
        number: '02',
        name: 'Facultatif : une estimation d’atelier',
        text: 'Si vous avez déjà une taille en tête, une estimation d’atelier renvoie une fourchette indicative en PKR. Ce n’est ni un prix ni un achat.',
      },
      {
        number: '03',
        name: 'Envoyez une note à l’atelier',
        text: 'Utilisez le formulaire de demande, écrivez à stoneworks014@gmail.com ou appelez le +92 304 7689678. Syed Rashid Ali reçoit le message.',
      },
      {
        number: '04',
        name: 'Voyez la pierre à Karachi',
        text: 'Visitez Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad, Karachi. Une visite confirme la dalle avant toute commande ou réservation.',
      },
    ],
  },
  offices: {
    heading: 'Bureaux',
    headingLong: 'Bureaux internationaux',
    intro:
      'L’atelier est à Karachi. Des bureaux à New York, Barcelone, Kuala Lumpur et Dubaï — écrivez à la maison, et nous vous orienterons vers la conversation la plus proche.',
    studioLabel: 'Atelier',
    places: {
      karachi: {
        city: 'Karachi',
        country: 'Pakistan',
        address: 'Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad',
      },
      'new-york': { city: 'New York', country: 'États-Unis', address: 'Long Island' },
      barcelona: { city: 'Barcelone', country: 'Espagne', address: 'Passeig de Gràcia' },
      'kuala-lumpur': { city: 'Kuala Lumpur', country: 'Malaisie', address: '' },
      dubai: { city: 'Dubaï', country: 'Émirats arabes unis', address: '' },
    },
  },
  shipping: shippingCopy.fr,
  estimate: {
    kicker: 'Estimation d’atelier / indicative seulement',
    titleBefore: 'Une première fourchette, avant la ',
    titleEm: 'dalle.',
    takingAsStart: (title) => `En prenant ${title} comme point de départ.`,
    viewWork: 'Voir l’œuvre',
    whatCommissioning: '01 / Que commandez-vous ?',
    stoneFamily: '02 / Famille de pierre',
    finish: '03 / Finition',
    shape: '04 / Forme',
    dimensions: '05 / Dimensions',
    dimensionUnits: 'Unités de mesure',
    inches: 'pouces',
    diameter: (unit) => `Diamètre (${unit})`,
    length: (unit) => `Longueur (${unit})`,
    width: (unit) => `Largeur (${unit})`,
    depthHeight: (unit) => `Profondeur / hauteur (${unit})`,
    thickness: (unit) => `Épaisseur (${unit})`,
    planArea: (area, summary) => `Surface en plan ${area} · ${summary}`,
    notes: '06 / Notes — facultatif',
    notesPlaceholder: 'La pièce, la lumière, un chant que vous imaginez déjà…',
    needsOnyx: 'Nécessite de l’onyx ou une pierre mixte',
    indicativeRange: 'Fourchette indicative d’atelier',
    waitingSize: 'En attente d’une taille plausible.',
    giveSize: 'Donnez à la pièce une taille plausible pour voir une fourchette.',
    piece: 'Pièce',
    stoneArea: 'Surface de pierre',
    lead: 'Délai',
    notFinal:
      'Ceci n’est pas un prix final. Socles, éclairage, livraison et la dalle particulière peuvent déplacer le chiffre — parfois beaucoup.',
    requestThis: 'Demander cette estimation',
    howKicker: 'Comment nous estimons',
    howTitle: 'Des bandes transparentes, pas un catalogue.',
    howP1:
      'Il n’y a pas de liste officielle de SKU sur ce site. La fourchette est une bande d’atelier selon la classe de pierre et la surface (et, pour lavabos et objets, une part du volume d’enveloppe), puis élargie pour la chute de coupe, la finition et le métier que la pièce demande d’ordinaire.',
    howP2: (rate) =>
      `Le travertin se situe sous le marbre ; l’onyx, surtout rétroéclairé, au-dessus. Les plans ronds et ovales supposent plus de chute qu’un rectangle. Une épaisseur au-delà d’un simple plateau ajoute de la manutention. Le PKR est le chiffre natif. L’USD est affiché à ${rate} PKR pour un dollar — un taux de conversation, pas un cours bancaire.`,
    howP3: 'Le chiffre est une première conversation. Syed Rashid Ali confirme la pierre en personne.',
    writeWithoutRange: 'Ou écrire sans fourchette',
    indicative: 'Indicatif',
    commissions: {
      'dining-table': { label: 'Table à manger', note: 'Un plateau pour se réunir' },
      'coffee-table': { label: 'Table basse', note: 'Basse, pour le salon' },
      'side-table': { label: 'Guéridon', note: 'Accent ou compagnon' },
      counter: { label: 'Comptoir / socle', note: 'Accueil ou bar' },
      slab: { label: 'Dalle / plateau', note: 'La coupe avant la pièce' },
      sink: { label: 'Vasque à poser', note: 'Un bassin comme sculpture' },
      object: { label: 'Objet', note: 'Bol, plateau, vase' },
    },
    stones: {
      travertine: { label: 'Travertin', note: 'Poreux, calme, architectural' },
      marble: { label: 'Marbre', note: 'Figuré, souvent de haut poli' },
      onyx: { label: 'Onyx', note: 'Translucide, mené par la veine' },
      mixed: { label: 'Mixte', note: 'Pierre avec métal ou une seconde coupe' },
    },
    finishes: {
      honed: { label: 'Adouci', note: 'Mat, doux à la main' },
      polished: { label: 'Poli', note: 'Un miroir calme' },
      backlit: { label: 'Rétroéclairé', note: 'Pour l’onyx translucide' },
    },
    shapes: {
      round: 'Rond',
      oval: 'Ovale',
      rectangle: 'Rectangle',
      custom: 'Sur mesure',
    },
    leads: {
      onyx:
        'Réalisé selon la disponibilité de la dalle — en général de quatorze à vingt semaines après réservation de la pierre. L’appariement des veines et l’éclairage donnent le rythme.',
      slab: 'Les dalles de cour se réservent plus tôt ; coupe et finition suivent la face choisie — souvent de quatre à huit semaines.',
      object: 'Les œuvres plus petites suivent le bloc en main — en général de quatre à dix semaines après accord sur la pierre.',
      counter:
        'Les pièces architecturales attendent la dalle et le chantier — souvent de dix à seize semaines après confirmation de la pierre et des dessins.',
      table:
        'Réalisé selon la disponibilité de la dalle — en général de huit à quatorze semaines après réservation de la pierre. Une visite confirme la dalle.',
    },
    finishFallback: 'Poli (le rétroéclairage demande de l’onyx)',
  },
  retailers: {
    heroKicker: 'ST WERKZ / POUR LES REVENDEURS',
    heroTitleBefore: 'Des pièces auxquelles on ',
    heroTitleEm: 'revient.',
    heroCta: 'Ouvrir une conversation commerciale',
    heroAlt: 'Accessoires de bain en travertin disposés comme une collection',
    pointKicker: 'POUR DES MAGASINS AVEC UN POINT DE VUE',
    pointTitleBefore: 'Une étagère doit avoir un ',
    pointTitleEm: 'point de vue.',
    steps: [
      {
        number: '01',
        title: 'Une première sélection pensée',
        body: 'Commencez par un groupe cohérent d’objets, pas par un entrepôt de peut-être.',
      },
      {
        number: '02',
        title: 'Des formes avec lesquelles on vit',
        body: 'Les pièces utiles portent plus loin le récit : un ensemble de bain, une boîte, un bol, un endroit où poser les choses.',
      },
      {
        number: '03',
        title: 'Une relation qui se répète',
        body: 'Restez proche de l’atelier pendant que vos clients vous disent ce qu’ils veulent ensuite.',
      },
    ],
    editKicker: 'UNE SÉLECTION PRÊTE POUR LE MAGASIN / 04 POINTS DE DÉPART',
    editTitleBefore: 'Les pièces que l’on ',
    editTitleEm: 'remarque.',
    editBody:
      'Quelques directions de la collection plus large de St Werkz. Nous pouvons composer la première sélection juste pour votre sol.',
    contactKicker: 'UNE LIGNE DIRECTE / KARACHI',
    contactTitleBefore: 'Construisons une ',
    contactTitleEm: 'meilleure étagère.',
    contactBody: 'Parlez-nous de votre magasin, du client que vous servez et du type de collection que vous voulez lui mettre devant.',
    contactCard: 'CONTACTER ST WERKZ',
    emailStudio: 'Écrire à l’atelier',
    startConversation: 'Commencer une conversation',
    enquire: 'Demander',
    productEnquire: 'Demander',
    footerTag: 'Des surfaces avec un point de vue.',
    backToTop: 'Retour en haut',
    products: [
      { slug: 'coral-canister', name: 'Boîte en travertin au couvercle de corail', note: 'Accents sculpturaux' },
      { slug: 'travertine-bath', name: 'Ensemble de bain en travertin', note: 'Luxe quotidien et calme' },
      { slug: 'portoro-bookends', name: 'Serre-livres Portoro', note: 'Bureau et salon' },
      { slug: 'desk-suite', name: 'Ensemble de bureau en marbre de minuit', note: 'Utile, élevé' },
    ],
    navArchitects: 'Architectes et décorateurs',
  },
  architects: {
    heroKicker: 'ST WERKZ / POUR ARCHITECTES',
    heroTitleBefore: 'La pierre avec un ',
    heroTitleEm: 'point de vue.',
    heroCta: 'Parler d’un projet',
    heroAlt: 'Vasque à poser en marbre sombre aux veines or et blanc',
    pointKicker: 'POUR CEUX QUI DESSINENT LA PIÈCE',
    pointTitleBefore: 'La bonne pierre change la ',
    pointTitleEm: 'conversation.',
    steps: [
      {
        number: '01',
        title: 'Un sourcing avec du contexte',
        body: 'Nous regardons le ton, le grain, l’échelle et la façon dont une surface vivra avec le reste de la pièce.',
      },
      {
        number: '02',
        title: 'Des échantillons qui font avancer le brief',
        body: 'Apportez une question de matière. Nous vous aidons à passer d’une sensation à quelque chose à mettre devant un client.',
      },
      {
        number: '03',
        title: 'Une ligne directe vers l’atelier',
        body: 'Pas de couches entre la question et la personne qui vous aide à trouver la bonne pièce.',
      },
    ],
    editKicker: 'DIRECTIONS DE MATIÈRE / POUR VOTRE PROCHAIN BRIEF',
    editTitleBefore: 'On commence par ',
    editTitleEm: 'la surface.',
    editBody: 'Vasque, objet ou accent architectural : chaque direction commence par ce que le matériau essaie de dire.',
    samples: 'Échantillons et conversations de projet bienvenus',
    bringBrief: 'Apportez un brief',
    contactKicker: 'UNE LIGNE DIRECTE / KARACHI',
    contactTitleBefore: 'Spécifions quelque chose qui ',
    contactTitleEm: 'dure.',
    contactBody:
      'Parlez-nous de la pièce, du brief ou de la question de matière. Nous commencerons par la conversation juste, pas par un déversement de catalogue.',
    products: [
      { slug: 'vessel-sink', name: 'Vasque à poser noir et or', note: 'Plan / bain' },
      { slug: 'onyx-waterfall', name: 'Cascade d’onyx rétroéclairé', note: 'Un premier détail fort' },
      { slug: 'emerald-cage-table', name: 'Guéridon cage émeraude', note: 'Mobilier / pièce forte' },
      { slug: 'onyx-urns', name: 'Paire d’urnes en onyx', note: 'Objet / accent' },
    ],
    navRetailers: 'Revendeurs',
  },
  tiles: {
    heroKicker: 'ST WERKZ / POUR LES DÉCORATEURS',
    heroTitleBefore: 'Objets et dalles ',
    heroTitleEm: 'pour la pièce.',
    heroCta: 'Parler d’un intérieur',
    heroAlt: 'Table basse en onyx blanc rétroéclairé qui luit dans un salon, St Werkz Karachi',
    pointKicker: 'POUR CEUX QUI MEUBLENT LA PIÈCE',
    pointTitleBefore: 'Une pièce a besoin ',
    pointTitleEm: 'd’objet et de surface.',
    steps: [
      { number: '01', title: 'Des objets qui portent le schéma', body: 'Urnes, bols, tables et vasques — les pièces avec lesquelles le client vit, spécifiées avec le même soin que l’architecture.' },
      { number: '02', title: 'Des dalles à l’échelle de la pièce', body: 'Comptoirs, chants en cascade et parois depuis la cour de Karachi, accordés aux objets déjà dans le brief.' },
      { number: '03', title: 'Une seule conversation d’atelier', body: 'Artisanat et surfaces en volume depuis le même bureau. Apportez une ambiance, un dessin ou une question de matière.' },
    ],
    editKicker: 'DIRECTIONS / OBJETS + SURFACES',
    editTitleBefore: 'Meubler la ',
    editTitleEm: 'pierre.',
    editBody: 'Commencez par une pièce que la salle gardera, ou par une surface autour de laquelle elle se construit. Les deux appartiennent à la même conversation.',
    samples: 'Échantillons, objets et conversations de projet bienvenus',
    bringBrief: 'Apportez un brief d’intérieur',
    contactKicker: 'UNE LIGNE DIRECTE / KARACHI',
    contactTitleBefore: 'Meublons la pièce ',
    contactTitleEm: 'en pierre.',
    contactBody: 'Parlez-nous de l’intérieur — les objets, les dalles, la lumière. Nous commencerons par la conversation juste, pas par un déversement de catalogue.',
    products: [
      { slug: 'onyx-urns', name: 'Paire d’urnes en onyx', note: 'Objet / accent' },
      { slug: 'luminous-onyx', name: 'Socle d’onyx lumineux', note: 'Salon / lumière' },
      { slug: 'onyx-waterfall', name: 'Cascade d’onyx rétroéclairé', note: 'Surface / pièce forte' },
      { slug: 'hotel-reception', name: 'Réception en travertin', note: 'Pierre à l’échelle de la pièce' },
    ],
    navArchitects: 'Architecte',
  },
  retailStore: {
    kicker: 'Boutique / Karachi',
    titleBefore: 'Une pièce singulière ',
    titleEm: 'pour la maison.',
    body: 'Objets en onyx et marbre faits main — bols, urnes, tables — accrochés comme une galerie. Parcourez les salles, puis demandez une visite. C’est une conversation d’atelier, pas un panier.',
    enterCollection: 'Entrer dans la collection',
    requestViewing: 'Demander une visite',
    pathKicker: 'Comment une pièce quitte l’atelier',
    pathTitleBefore: 'Découvrir, parcourir, ',
    pathTitleEm: 'puis la voir.',
    steps: [
      { number: '01', title: 'Découvrir', body: 'Parcourez les cinq salles — salle à manger, salon, accents, intérieurs et dalles — comme une galerie calme.' },
      { number: '02', title: 'Parcourir les salles', body: 'Ouvrez une œuvre, lisez la pierre, et restez avec la forme avant de demander une heure.' },
      { number: '03', title: 'Demander une visite', body: 'Nommez la pièce ou la salle. Syed Rashid Ali prend la note et confirme la pierre à Karachi.' },
    ],
    featuredKicker: 'En salle',
    featuredTitleBefore: 'Des œuvres avec lesquelles ',
    featuredTitleEm: 'on vit.',
    featuredBody: 'Un premier regard sur des objets et des tables de la collection. Ouvrez une pièce, puis demandez une visite.',
    heroAlt: 'Objets pakistanais en onyx et marbre pour la maison, St Werkz Karachi',
  },
  exportDesk: desks.fr,
  stonesIndex: stoneIndexes.fr,
  notFound: {
    title: 'Cette page n’est pas en salle.',
    body: 'Revenez à la collection St Werkz de marbre, travertin et onyx à Karachi, ou demandez une visite.',
    cta: 'Parcourir les salles',
  },
  faqs: [
    {
      id: 'what-stoneworks-makes',
      question: 'Que réalise St Werkz ?',
      answer:
        'St Werkz réalise meubles, objets, intérieurs et dalles en pierre à Karachi. La collection comprend tables à manger, tables basses, accents sculpturaux, comptoirs architecturaux et dalles de cour, taillés dans le travertin, l’onyx et le marbre. Les œuvres se montrent comme une galerie. Demandez une visite pour voir une pièce en personne.',
    },
    {
      id: 'where-located',
      question: 'Où se trouve St Werkz ?',
      answer:
        'St Werkz se trouve à Karachi, au Pakistan, à Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad, Karachi. Syed Rashid Ali dirige l’atelier. Écrivez à stoneworks014@gmail.com ou appelez le +92 304 7689678 pour demander une visite ou parler d’un projet. L’atelier est le point de départ pour foyers, architectes et revendeurs.',
    },
    {
      id: 'who-leads',
      question: 'Qui dirige St Werkz ?',
      answer:
        'Syed Rashid Ali dirige St Werkz, l’atelier de pierre de Karachi. Il reçoit les questions de matière, les conversations de projet et les demandes de visite. Appelez le +92 304 7689678 ou écrivez à stoneworks014@gmail.com. L’atelier est à Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad, Karachi.',
    },
    {
      id: 'custom-or-collection',
      question: 'St Werkz réalise-t-il des pièces sur mesure ou seulement la collection ?',
      answer:
        'St Werkz montre une collection d’œuvres achevées et accepte aussi des commandes. Les cinq salles — salle à manger, salon, accents, intérieurs et surfaces — sont des pièces que vous pouvez demander à voir. S’il vous faut une table, un lavabo ou une dalle semblable, commencez par une estimation d’atelier. Une visite confirme encore la pierre.',
    },
    {
      id: 'how-to-view',
      question: 'Comment demander une visite chez St Werkz ?',
      answer:
        'Pour demander une visite chez St Werkz, ouvrez la page de demande, nommez une œuvre ou décrivez la pièce, et envoyez une note. Syed Rashid Ali reçoit le message. Vous pouvez aussi écrire à stoneworks014@gmail.com ou appeler le +92 304 7689678. C’est une conversation d’atelier, pas un achat en ligne.',
    },
    {
      id: 'materials',
      question: 'Quels matériaux St Werkz utilise-t-il ?',
      answer:
        'St Werkz travaille le travertin, l’onyx et le marbre. Le travertin est d’ordinaire adouci, à grain linéaire pour tables et chants architecturaux. L’onyx est souvent poli et parfois rétroéclairé pour que la dalle luise. Le marbre apparaît en crème, sauge, portoro et noir aux veines d’or ou de blanc. Chaque fiche nomme la pierre.',
    },
    {
      id: 'service-area',
      question: 'St Werkz travaille-t-il seulement à Karachi ?',
      answer:
        'St Werkz est basé à Karachi, au Pakistan, et travaille depuis cet atelier avec foyers, architectes, décorateurs et revendeurs. Les projets commencent d’ordinaire par une visite ou une conversation de matière à Karachi. Les notes à distance sont bienvenues par e-mail ou téléphone, puis confirmées en personne lorsque la pierre doit être vue.',
    },
    {
      id: 'lead-times',
      question: 'Combien de temps prend une pièce sur commande ?',
      answer:
        'Les délais suivent la pierre. Objets et lavabos prennent d’ordinaire de quatre à dix semaines après accord sur le bloc. Les tables, de huit à quatorze semaines après réservation de la dalle. L’onyx rétroéclairé demande souvent de quatorze à vingt semaines. Les comptoirs architecturaux, de dix à seize. Une visite confirme la pierre.',
    },
    {
      id: 'origin',
      question: 'D’où vient St Werkz ?',
      answer:
        'St Werkz s’enracine dans une famille de Bandha, à Allahabad, Uttar Pradesh. La migration a porté musique, peinture et couleur à la génération suivante. Ce rapport hérité à l’art prend aujourd’hui forme en marbre, onyx et travertin à l’atelier de Karachi dirigé par Syed Rashid Ali.',
    },
    {
      id: 'prices',
      question: 'St Werkz publie-t-il des prix en ligne ?',
      answer:
        'St Werkz ne publie pas de prix sur le mur de la collection ni en ligne. Une estimation d’atelier donne une fourchette indicative selon taille, pierre et forme — jamais un prix final. Après l’estimation, demandez une visite pour confirmer la pierre en personne. Contactez Syed Rashid Ali pour continuer.',
    },
    {
      id: 'pakistan-stones',
      question: 'Quels marbres et onyx sont disponibles au Pakistan ?',
      answer:
        'Le Pakistan extrait des marbres comme Ziarat White, Sunny Grey, Tavera, Badal et Black and Gold, ainsi que des onyx verts, miel, blancs et, plus rares, roses ou bleus du Baloutchistan. La page des pierres indique des tarifs indicatifs en PKR par pied carré de septembre 2026 : des fourchettes de matière, pas le prix d’une pièce finie. Une visite à Karachi confirme la dalle.',
    },
    {
      id: 'retailers',
      question: 'St Werkz travaille-t-il avec des revendeurs ?',
      answer:
        'Oui. St Werkz fournit les revendeurs d’une sélection pensée d’objets en marbre, onyx et travertin depuis son atelier de Karachi. Les collections d’ouverture se construisent avec le magasin, elles ne se déversent pas d’un entrepôt. Les conversations commerciales commencent avec Syed Rashid Ali à l’atelier de North Nazimabad.',
    },
    {
      id: 'architects',
      question: 'St Werkz travaille-t-il avec architectes et décorateurs ?',
      answer:
        'Oui. St Werkz aide architectes et décorateurs à spécifier travertin, onyx et marbre depuis Karachi. L’accompagnement va du premier échantillon à la pièce terminée. Apportez un brief ou une question de matière à Syed Rashid Ali. Échantillons et conversations de projet sont bienvenus.',
    },
  ],
  rooms: {
    marble: {
      title: 'Table et convivialité',
      kicker: 'Des tables qui tiennent une conversation',
      wallText:
        'Travertin ovale, pierre noire au mouvement d’or, onyx sauge : des surfaces assez grandes pour s’y réunir. Ces pièces se spécifient comme le centre calme d’une pièce, non comme un ensemble de catalogue.',
      description:
        'Tables à manger en travertin, onyx et marbre de St Werkz, Karachi — piédestaux ovales, noir et or, et pièces de convivialité en sauge, montrées comme une salle de galerie.',
    },
    onyx: {
      title: 'Salon et lumière',
      kicker: 'Tables basses, guéridons, lueur',
      wallText:
        'Tables basses et guéridons en onyx, travertin et marbre. Certains sont rétroéclairés. D’autres reposent sur des cages de laiton ou des tiges tulipe. Tous sont faits pour s’asseoir dans la lumière et changer avec elle.',
      description:
        'Tables basses, guéridons et onyx rétroéclairé de St Werkz, Karachi — Salon et lumière, une salle de tables basses, cages de laiton et tiges tulipe.',
    },
    limestone: {
      title: 'Accents sculpturaux',
      kicker: 'Objets pour l’étagère et le bain',
      wallText:
        'Bols, vases, plateaux, bougeoirs et une vasque à poser : des œuvres plus petites dans les mêmes pierres. Chacune est finie comme une pièce à part entière, non comme un après-coup du mobilier.',
      description:
        'Objets sculpturaux en pierre de St Werkz, Karachi — bols, plateaux, vasques à poser, bougeoirs et pièces de bain en travertin, onyx et marbre.',
    },
    interiors: {
      title: 'Intérieurs et atmosphères',
      kicker: 'La pierre comme architecture',
      wallText:
        'Comptoirs d’accueil, socles à lumière en sous-face et chants en cascade. Ces photographies enregistrent la pierre à l’échelle d’un hall ou d’une pièce : calme, précise, faite pour être contournée.',
      description:
        'Pierre architecturale de St Werkz, Karachi — comptoirs d’accueil, socles à lumière en sous-face et chants en cascade d’onyx rétroéclairé à l’échelle d’un hall ou d’une pièce.',
    },
    slabs: {
      title: 'Surfaces et dalles',
      kicker: 'Le matériau avant la pièce',
      wallText:
        'Dalles et plateaux dans la cour : marbre noir aux veines d’éclair blanc, un disque circulaire à figure d’or. C’est la pierre avant qu’elle ne soit table — la coupe dont se tire le reste de la collection.',
      description:
        'Dalles et plateaux de la cour St Werkz à Karachi — marbre noir aux veines d’éclair et disques circulaires à figure d’or avant qu’ils ne deviennent tables.',
    },
      handicrafts: {
      title: 'Surfaces et dalles',
      kicker: 'Le matériau avant la pièce',
      wallText:
        'Dalles et plateaux dans la cour : marbre noir aux veines d’éclair blanc, un disque circulaire à figure d’or. C’est la pierre avant qu’elle ne soit table — la coupe dont se tire le reste de la collection.',
      description:
        'Dalles et plateaux de la cour St Werkz à Karachi — marbre noir aux veines d’éclair et disques circulaires à figure d’or avant qu’ils ne deviennent tables.',
    },
    
  },
  pieces: {
    'oval-travertine-pedestal': {
      title: 'Table piédestal ovale en travertin',
      material: 'Travertin beige adouci',
      form: 'plateau de salle à manger elliptique sur un piédestal conique en pierre',
      note: 'Un long ovale de travertin à veine linéaire, assez épais pour se lire comme architecture, sur un seul pied conique. Photographiée avec des chaises mêlées dans un appartement de ville : la pierre tient la pièce sans demander d’ornement.',
    },
    'oval-travertine-assemblage': {
      title: 'Assemblage ovale en travertin',
      material: 'Travertin crème adouci',
      form: 'plateau ovale sur des piédestaux en pierre en X qui se croisent',
      note: 'Vu à l’atelier, encore sur un panneau de protection. Deux lourds tréteaux de pierre — l’un croisé, l’autre plan — portent un ovale à chant arrondi. Une étude de la façon dont les dalles deviennent pieds.',
    },
    'noir-gold-dining': {
      title: 'Table à manger noir et or',
      material: 'Marbre noir poli aux veines d’or',
      form: 'plateau rectangulaire de salle à manger aux angles arrondis, chaises tapissées',
      note: 'Une surface sombre de haut poli traversée d’éclairs minéraux chauds. Mise en scène avec un cercle de chaises beige à dossier enveloppant : une table de réunion qui se comporte comme un ciel de nuit sous verre.',
    },
    'portoro-slat-dining': {
      title: 'Table à manger Portoro à lames',
      material: 'Marbre noir poli aux veines d’ambre, base en or brossé',
      form: 'plateau rectangulaire sur un éventail de lames verticales dorées',
      note: 'La pierre est presque noire, puis soudain or. La base est une rangée disciplinée de lames dorées qui se rassemblent au sol. Faite pour des pièces qui savent déjà se taire.',
    },
    'cream-gathering-table': {
      title: 'Table de réunion en pierre crème',
      material: 'Marbre ou onyx crème poli à mouvement sableux',
      form: 'long rectangle arrondi avec chaises mêlées terracotta et crème',
      note: 'Un plateau pâle et tourbillonnant qui se lit chaud plutôt que blanc. Les chaises se partagent en terracotta et crème : une salle à manger composée comme une nature morte, non comme un ensemble assorti.',
    },
    'sage-round-table': {
      title: 'Table ronde sauge',
      material: 'Onyx ou marbre sauge poli',
      form: 'plateau circulaire de salle à manger ou de café, nature morte de style de vie',
      note: 'Vue d’en haut, une chaise terracotta glissée sous le chant. Verre, une seule feuille, un bol crème. La pierre est un vert assourdi, finement veiné : une table pour deux, ou pour regarder.',
    },
    'sage-onyx-organza': {
      title: 'Table organza en onyx sauge',
      material: 'Onyx vert translucide poli',
      form: 'ovale en haricot sur deux piédestaux hexagonaux facettés',
      note: 'Une pièce monumentale d’atelier : pierre verte douce aux veines de rouille et d’ocre, le plateau organiquement étranglé, les pieds taillés en colonnes hexagonales jumelles. Encore sur contreplaqué, déjà une œuvre achevée.',
    },
    'travertine-round-dining': {
      title: 'Table à manger ronde en travertin',
      material: 'Travertin crème adouci',
      form: 'plateau circulaire sur un piédestal conique fuselé',
      note: 'Le même langage que le piédestal ovale, réduit à un cercle. Chaises tapissées, un mur terracotta, un petit vase de pierre aux fleurs séchées. La salle à manger comme intérieur calme.',
    },
    'luminous-onyx-plinth': {
      title: 'Socle d’onyx lumineux',
      material: 'Onyx blanc rétroéclairé aux veines d’ambre, cadre en métal noir',
      form: 'table basse carrée, éclairée de l’intérieur',
      note: 'Onyx crème translucide, veines d’or, éclairé de l’intérieur jusqu’à ce que la dalle devienne lampe. Une vue sur un tapis nervuré avec livres et bougie ; une autre dans un intérieur nocturne, la ville derrière. Un meuble qui se comporte comme de la lumière.',
    },
    'emerald-cage-table': {
      title: 'Guéridon cage émeraude',
      material: 'Onyx vert sauge poli, base cage en laiton',
      form: 'guéridon rond sur un tambour de tiges verticales',
      note: 'Un plateau circulaire d’onyx au mouvement de rouille et de crème, tenu par une cage légère de laiton. Pierre lourde, métal mince : le contraste habituel de St Werkz, à l’échelle d’un verre.',
    },
    'sage-tulip-table': {
      title: 'Guéridon tulipe sauge',
      material: 'Onyx vert poli, piédestal en métal brossé',
      form: 'guéridon d’accent rond sur une tige tulipe',
      note: 'La même famille d’onyx vert, cette fois sur un pied de métal de milieu de siècle. Sauge, crème et terracotta dans la pierre ; une seule tige dessous. Un accent qui peut tenir seul.',
    },
    'cream-companion-tables': {
      title: 'Tables compagnes en crème',
      material: 'Pierre crème polie, laiton satiné',
      form: 'paire : piédestal monolithique et guéridon à tige de laiton',
      note: 'Deux plateaux circulaires de la même pierre pâle. L’un sur un tambour de pierre fuselé ; l’autre sur une tige mince de laiton et un disque. Une paire faite pour se lire ensemble, comme deux notes.',
    },
    'travertine-cone-table': {
      title: 'Table cône en travertin',
      material: 'Travertin clair adouci',
      form: 'plateau circulaire sur une base conique fuselée',
      note: 'Une petite table piédestal au showroom, des bandes horizontales courant autour du cône. D’autres tables de pierre attendent derrière. Forme réduite à cercle et tronc de cône.',
    },
    'notched-joinery-tables': {
      title: 'Tables en travertin à encastrements',
      material: 'Travertin adouci, chêne clair',
      form: 'plateaux ronds à assemblage affleurant de pieds de bois',
      note: 'Quatre encoches semi-circulaires dans la pierre reçoivent des pieds de chêne arrondis, affleurant la surface. Une rencontre précise de deux matériaux. Photographiées comme un groupe d’atelier : photographie de collection de l’atelier de Karachi.',
    },
    'travertine-cross-table': {
      title: 'Table en travertin à base en croix',
      material: 'Travertin beige adouci',
      form: 'plateau rond sur un piédestal de dalles qui se croisent',
      note: 'Quatre dalles verticales de pierre se rencontrent en croix et reçoivent un plateau circulaire. Une bougie à la surface, un canapé crème à côté. D’abord la géométrie, puis les pores de la pierre.',
    },
    'rust-cage-table': {
      title: 'Guéridon cage à veine rouille',
      material: 'Marbre noir poli aux veines de rouille, base géométrique dorée',
      form: 'guéridon rond sur une cage angulaire de laiton',
      note: 'Pierre sombre figurée de cuivre et de blanc, sur un cadre tendu d’or. Plus petite qu’une table à manger, plus affirmative qu’un porte-verre.',
    },
    'stepped-travertine-table': {
      title: 'Table étagée en travertin',
      material: 'Travertin crème adouci',
      form: 'table basse à deux niveaux sur une base de dalles croisées',
      note: 'Deux plans à des hauteurs différentes, utiles et sculpturaux à la fois. Fleurs, un livre, des bougies à tige sur l’étagère basse. Une table de salon qui se lit encore comme une construction.',
    },
    'nested-nero-tables': {
      title: 'Tables Nero emboîtées',
      material: 'Marbre noir poli aux veines blanches, métal sombre',
      form: 'paire de tables basses circulaires emboîtables',
      note: 'Deux disques noirs, l’un un peu plus haut, chants en métal sombre. Ils se tiennent ensemble sur un tapis comme des pierres dans une rivière : proches, non identiques.',
    },
    'hex-pedestal-table': {
      title: 'Table piédestal hexagonale',
      material: 'Travertin crème adouci',
      form: 'plateau circulaire sur un tambour hexagonal en pierre',
      note: 'Le rond contre six faces. Les bandes du travertin courent comme des strates autour du tambour. Une table basse avec un vase de roses : domestique, mais encore un solide.',
    },
    'monolith-coffee-table': {
      title: 'Table basse monolithe en travertin',
      material: 'Travertin adouci',
      form: 'dalle rectangulaire épaisse sur deux pieds de socle',
      note: 'Un bloc bas et architectural : dalle, deux pieds, rien d’autre. Livres, une sphère de verre, palme sèche. Le grain de la pierre fait le dessin.',
    },
    'nero-gold-rim-table': {
      title: 'Table Nero à chant d’or',
      material: 'Marbre noir poli, chant et base en laiton poli',
      form: 'table basse ronde à cadre ouvert d’or',
      note: 'Un disque noir densément veiné ceint de laiton brillant, photographié sur le sol de l’atelier. Le contraste comme idée entière.',
    },
    'amber-showroom-table': {
      title: 'Table de showroom à veine d’ambre',
      material: 'Onyx ou marbre crème poli aux veines d’ambre, piédestal sombre',
      form: 'plateau rectangulaire épais sur un socle noir',
      note: 'Prise à l’atelier parmi des râteliers d’échantillons. Mouvement orangé-or sur un fond crème, une base sombre miroir, un petit bol comme marque d’échelle. Une table qui pourrait aussi être un comptoir.',
    },
    'ochre-pedestal-table': {
      title: 'Piédestal ocre et charbon',
      material: 'Marbre figuré poli aux veines d’or et de blanc',
      form: 'plateau circulaire sur un piédestal courbe et mince',
      note: 'Une petite table de déclaration : charbon, ocre, blanc brisé. Une seule tige, un haut poli. Faite pour un coin, pour qu’on passe lentement à côté.',
    },
    'vessel-sink': {
      title: 'Vasque à poser noir et or',
      material: 'Marbre sombre poli aux veines d’or et de blanc',
      form: 'vasque circulaire de plan',
      note: 'Une vasque circulaire peu profonde, bonde au centre, l’intérieur aussi figuré que l’extérieur. Pierre noire au miel et au givre. Une pièce de bain traitée comme sculpture.',
    },
    'coral-canister': {
      title: 'Boîte en travertin au couvercle de corail',
      material: 'Travertin adouci, pommeau de corail en laiton poli',
      form: 'pot cylindrique à couvercle sculptural',
      note: 'Un tambour de pierre simple, fermé d’une branche de corail en laiton. Pores crus contre un petit bijou. Pour un comptoir, ou pour rien d’autre qu’elle-même.',
    },
    'travertine-candlesticks': {
      title: 'Bougeoirs en travertin',
      material: 'Travertin naturel adouci',
      form: 'paire graduée, base conique et coupe cylindrique',
      note: 'Deux hauteurs, un seul langage : un cône fuselé, une coupe épaisse de pierre. Une bougie pilier dans le plus haut. Poreux, mat et délibérément non poli.',
    },
    'pedestal-bowl': {
      title: 'Bol piédestal en travertin',
      material: 'Travertin naturel',
      form: 'bol bas sur pied',
      note: 'Douze pouces de diamètre, cinq de haut. Un bol large à chant épais sur un pied court étagé : fruits, objets, ou vide. Les pores de la pierre restent ouverts.',
    },
    'portoro-bookends': {
      title: 'Serre-livres Portoro',
      material: 'Marbre noir poli aux veines d’or',
      form: 'paire de coins géométriques',
      note: 'Deux pentes massives, de haut poli, ocre et blanc sur un fond sombre. Sculpture fonctionnelle pour une étagère qui a déjà un point de vue.',
    },
    'travertine-tray': {
      title: 'Plateau rectangulaire en travertin',
      material: 'Travertin beige adouci',
      form: 'plat rectangulaire bas à bord relevé',
      note: 'Un seul bloc, bordé, plein de vides naturels. Pour des clés, un verre, ou pour rester vide sur une table comme un petit plan de pierre.',
    },
    'desk-suite': {
      title: 'Ensemble de bureau en marbre de minuit',
      material: 'Marbre noir poli aux veines de cuivre, plaques de laiton',
      form: 'valet de quatre pièces : plateau, boîte à notes, pot à plumes, classeur',
      note: 'Un bureau réduit à quatre volumes de pierre. Veines blanches et de rouille, pieds minces de laiton. Le travail écrit avec la même gravité matérielle qu’une table.',
    },
    'nero-candles': {
      title: 'Groupe de bougies Nero',
      material: 'Marbre noir poli aux veines blanches',
      form: 'porte-bougie à assiette basse et pilier étagé, avec une tige au fond',
      note: 'Lumière de bougie sur un fond sombre et brillant. Une assiette large et un cylindre empilé, tous deux dans la même pierre à veine d’éclair. Objets du soir.',
    },
    'scalloped-valet': {
      title: 'Valet en travertin festonné',
      material: 'Travertin adouci à pores ouverts',
      form: 'plat rectangulaire aux angles entaillés',
      note: 'Un bassin bas, grain linéaire au fond du plateau, petits festons à chaque angle. Géométrie douce sur une pierre poreuse.',
    },
    'curved-canisters': {
      title: 'Boîtes courbes en travertin',
      material: 'Travertin adouci, poignées en marbre blanc poli',
      form: 'paire de boîtes à couvercle et extrémités concaves',
      note: 'Deux tailles, étranglées sur les côtés, couvercles qui suivent la courbe. Poignées de marbre blanc comme de petites vagues. Un rangement qui se lit encore comme une taille.',
    },
    'travertine-bath': {
      title: 'Ensemble de bain en travertin',
      material: 'Travertin beige adouci non stucqué',
      form: 'cache-mouchoirs, distributeur et vases sur pierre sombre',
      note: 'Objets de bain carrés et rectangulaires, pores ouverts, sur un comptoir noir. Des pièces quotidiennes avec la même finition que le mobilier.',
    },
    'tapered-vessel': {
      title: 'Vase fuselé en travertin',
      material: 'Travertin naturel fini à la main',
      form: 'cylindre à épaulement au bord enroulé',
      note: 'Une forme haute, légèrement fermée, photographiée dehors contre le feuillage. Stries horizontales, un bord épais. Vase ou objet : les deux lectures sont justes.',
    },
    'round-tray': {
      title: 'Plateau disque en travertin',
      material: 'Travertin poreux adouci',
      form: 'plateau circulaire bas à bord droit',
      note: 'Un plan rond de pierre crème, piqué, avec un mur bas. Centre de table ou vide-poche. Le cercle est tout l’argument.',
    },
    'bulbous-vessel': {
      title: 'Vase sculptural en travertin',
      material: 'Travertin naturel fini à la main',
      form: 'corps sphérique à col cylindrique large',
      note: 'Un corps lourd et poreux et un col court et ouvert. Montré avec un seul tournesol : échelle, texture et un peu de couleur contre la pierre crème.',
    },
    'onyx-urns': {
      title: 'Paire d’urnes en onyx',
      material: 'Onyx bandé poli en sauge, crème et rouille',
      form: 'urnes classiques à bord évasé et pied de piédestal',
      note: 'Deux vases jumeaux, translucides et en couches, le vert cédant au terracotta dans la pierre elle-même. Objets de cheminée à dessin géologique plutôt que décoratif.',
    },
    'onyx-sphere-bowl': {
      title: 'Bol d’onyx sur sphères',
      material: 'Onyx vert poli',
      form: 'bassin bas élevé sur trois sphères de pierre',
      note: 'Un bol sauge au mouvement blanc et de rouille, sur trois orbes jumelles. Le fruit est facultatif. L’équilibre comme méthode de construction.',
    },
    'oblong-tray': {
      title: 'Plateau oblong en travertin',
      material: 'Travertin crème taillé à la main',
      form: 'plat allongé à poignées arrondies intégrées',
      note: 'Un valet allongé, languettes à chaque extrémité, photographié sur marbre sombre. Service et présentation en une seule coupe.',
    },
    'nero-cylinder': {
      title: 'Vase cylindrique Nero',
      material: 'Marbre noir type Nero poli',
      form: 'cylindre ouvert à bord épais et arrondi',
      note: 'Un tambour court et exact en noir et blanc à fort contraste. Pot à plumes, vase ou poids sur un bureau. La veine est le dessin.',
    },
    'coaster-suite': {
      title: 'Ensemble de sous-verres en travertin',
      material: 'Travertin beige adouci',
      form: 'quatre disques dans un support cylindrique à découpe en U',
      note: 'Un petit ensemble emboîté : quatre cercles, un tambour, une encoche pour le pouce. Architecture de table à l’échelle d’un verre.',
    },
    'nero-disc-tray': {
      title: 'Plateau disque Nero',
      material: 'Marbre noir poli aux veines blanches',
      form: 'plateau circulaire bas à bord relevé',
      note: 'Un disque noir, une veine blanche marquée, un mur court. Centre de table ou objet vide. Poli jusqu’à tenir la lumière d’une pièce.',
    },
    'hemisphere-candle': {
      title: 'Bougie hémisphère en travertin',
      material: 'Travertin crème poreux, laiton brossé',
      form: 'dôme de pierre, tige et plateau de laiton, bougie pilier',
      note: 'Une demi-sphère de pierre piquée, puis une courte tige dorée et un plateau bas. Lumière de bougie sur un pied géologique. Pour une table déjà en conversation avec des livres et un bol.',
    },
    'hotel-reception': {
      title: 'Accueil monolithe en travertin',
      material: 'Travertin adouci à chant de carrière brut',
      form: 'long comptoir d’hospitalité sur un socle sombre en retrait',
      note: 'Un hall d’hôtel réduit à un matériau : comptoir, mur, sol. Le chant lointain est laissé brisé, comme un front de carrière, contre un bloc par ailleurs exact. La pierre comme finition et comme origine.',
    },
    'counter-glow': {
      title: 'Comptoir en travertin à lumière en sous-face',
      material: 'Travertin à veine linéaire, socle en retrait éclairé',
      form: 'comptoir monolithique d’exposition ou d’accueil',
      note: 'Un long bloc crème, flottant sur un bain de lumière chaude. Un bol coquillage, une lampe, des drapés derrière. La pierre est l’architecture ; la lueur, le seul ornement.',
    },
    'onyx-waterfall': {
      title: 'Comptoir cascade d’onyx rétroéclairé',
      material: 'Onyx miel translucide, LED interne',
      form: 'comptoir en L à chant cascade à veines appariées',
      note: 'Pierre crème éclairée de l’intérieur jusqu’à ce que les veines deviennent paysage. Le plateau tourne le coin et rejoint le sol en une seule chute. Une cuisine ou un bar traités comme un solide lumineux.',
    },
    'noir-gold-disc': {
      title: 'Plateau circulaire noir et or',
      material: 'Marbre noir poli aux veines d’or et de blanc',
      form: 'plateau circulaire, photographié dans la cour',
      note: 'Un disque fini avant d’être table : rivières d’ocre et fils blancs sur un fond noir, couché sur le sol de l’atelier. La coupe dont s’imaginent les pièces de salle à manger.',
    },
    'nero-marquina-slabs': {
      title: 'Dalles Nero à veine',
      material: 'Marbre noir poli aux veines de calcite blanche',
      form: 'dalles verticales grand format dans la cour',
      note: 'Deux vues de hautes dalles noires, veinées comme du givre sur verre. Mur, îlot ou table encore à décider. L’inventaire comme exposition.',
    },
  },
  materials: {
    travertine: {
      label: 'Travertin',
      cite: 'Le travertin est un calcaire sédimentaire poreux. Chez St Werkz, il se spécifie d’ordinaire adouci, les pores naturels laissés ouverts plutôt que bouchés jusqu’à un verre.',
    },
    marble: {
      label: 'Marbre',
      cite: 'Le marbre de la collection St Werkz se spécifie comme pierre figurée, souvent de haut poli : noir et or, veines d’ambre type Portoro et calcite blanche type Nero.',
    },
    onyx: {
      label: 'Onyx',
      cite: 'L’onyx dans cet atelier est une pierre translucide et bandée. Là où la dalle le permet, St Werkz l’éclaire de l’intérieur pour que la veine soit la lumière de la pièce.',
    },
    mixed: {
      label: 'Matériaux mixtes',
      cite: 'Certaines pièces St Werkz joignent la pierre au laiton, au chêne ou à une seconde coupe. La collection enregistre ces rencontres comme construction spécifiée, non comme technique mixte générique.',
    },
  },
  finishes: {
    honed: {
      label: 'Adouci',
      cite: 'Une finition adoucie est mate et douce à la main. St Werkz l’emploie surtout sur le travertin pour que pores et litage restent visibles.',
    },
    polished: {
      label: 'Poli',
      cite: 'Une finition polie est un miroir calme. C’est la face habituelle des tables et objets en marbre et onyx de cette collection.',
    },
    backlit: {
      label: 'Rétroéclairé',
      cite: 'Le rétroéclairage est réservé à l’onyx translucide : LED ou une lampe interne font de la dalle une source de lumière. Ce n’est pas une finition à appliquer au marbre opaque ni au travertin.',
    },
  },
  evidence: {
    workshop: 'Photographie d’atelier / showroom',
    interior: 'Intérieur installé',
    'still-life': 'Nature morte de l’objet',
    yard: 'Cour / dalle',
  },
});
