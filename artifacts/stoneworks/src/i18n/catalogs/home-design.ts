import type { LocaleCode } from "../locales";

export type HomeDesignCopy = {
  workWithUs: string;
  heroLines: [string, string];
  heroBody: string;
  heroAlt: string;
  sample: string;
  sampleBrief: string;
  collections: string;
  projects: string;
  search: string;
  searchHint: string;
  noResults: string;
  benefits: [string, string][];
  materialsTitle: string;
  selectedMaterial: string;
  viewMaterial: string;
  projectsTitle: string;
  craftKicker: string;
  craftLines: [string, string];
  craftBody: string;
  resources: string;
  resourcesTitle: string;
  resourceItems: string[];
  exploreResources: string;
  sampleTitle: string;
  sampleBody: string;
};

export const homeDesignCopy: Record<LocaleCode, HomeDesignCopy> = {
  en: {
    heroAlt: "Warm marble vanity with a sculpted stone basin, brass faucet and olive branches — reference-inspired interior",
    workWithUs: "Work with us",
    heroLines: ["Bring your", "vision to life."],
    heroBody:
      "Request a quote, sample, or consultation with our team of stone experts.",
    sample: "Request a sample",
    sampleBrief:
      "I would like to request a stone sample. Please advise on materials, finishes, and sample delivery for my project.",
    collections: "Collections",
    projects: "Projects",
    search: "Search the collection",
    searchHint: "Find a material, object, or collection.",
    noResults: "No works found. Try marble, onyx, or travertine.",
    benefits: [
      ["For Architects", "Specifications & Resources"],
      ["Custom Fabrication", "Bespoke Solutions"],
      ["Global Supply", "Worldwide Delivery"],
      ["Expert Support", "Dedicated Team"],
    ],
    materialsTitle:
      "Exceptional natural stone, selected for remarkable spaces.",
    selectedMaterial: "A closer look / selected material",
    viewMaterial: "View material",
    projectsTitle: "Transforming spaces worldwide.",
    craftKicker: "The art of making",
    craftLines: ["Crafted by nature.", "Refined by hand."],
    craftBody:
      "From the first slab to the final edge, our Karachi studio brings care to every cut. Natural variation, considered proportions, and the quiet skill of the maker.",
    resources: "Architects & designers",
    resourcesTitle: "Your vision. Our material expertise.",
    resourceItems: [
      "Specifications & resources",
      "Stone selection",
      "Custom fabrication",
      "Project consultation",
    ],
    exploreResources: "Explore architect resources",
    sampleTitle: "Experience the material before specifying it.",
    sampleBody:
      "See the veining. Feel the finish. Talk to our studio about a sample selected for your space.",
  },
  es: {
    heroAlt: "Tocador de mármol con lavabo de piedra, grifo de latón y ramas de olivo — interior inspirado en la referencia",
    workWithUs: "Trabaja con nosotros",
    heroLines: ["Dale vida", "a tu visión."],
    heroBody:
      "Solicita un presupuesto, una muestra o una consulta con nuestros expertos en piedra.",
    sample: "Solicitar una muestra",
    sampleBrief:
      "Me gustaría solicitar una muestra de piedra. Necesito información sobre materiales, acabados y envío para mi proyecto.",
    collections: "Colecciones",
    projects: "Proyectos",
    search: "Buscar en la colección",
    searchHint: "Encuentra un material, objeto o colección.",
    noResults: "Sin resultados. Prueba mármol, ónix o travertino.",
    benefits: [
      ["Para arquitectos", "Especificaciones y recursos"],
      ["Fabricación a medida", "Soluciones personalizadas"],
      ["Suministro global", "Entrega internacional"],
      ["Asesoría experta", "Equipo dedicado"],
    ],
    materialsTitle:
      "Piedra natural excepcional, para espacios extraordinarios.",
    selectedMaterial: "Una mirada de cerca / material seleccionado",
    viewMaterial: "Ver material",
    projectsTitle: "Transformando espacios en todo el mundo.",
    craftKicker: "El arte de crear",
    craftLines: ["Creado por la naturaleza.", "Refinado a mano."],
    craftBody:
      "Desde la primera losa hasta el último borde, nuestro taller de Karachi cuida cada corte. Variación natural, proporciones cuidadas y la destreza del artesano.",
    resources: "Arquitectos y diseñadores",
    resourcesTitle: "Tu visión. Nuestra experiencia en piedra.",
    resourceItems: [
      "Especificaciones y recursos",
      "Selección de piedra",
      "Fabricación a medida",
      "Consulta de proyectos",
    ],
    exploreResources: "Recursos para arquitectos",
    sampleTitle: "Experimenta el material antes de elegirlo.",
    sampleBody:
      "Observa las vetas. Siente el acabado. Consulta con nuestro taller sobre una muestra para tu espacio.",
  },
  fr: {
    heroAlt: "Vasque en pierre sur un meuble en marbre, robinet en laiton et branches d’olivier — intérieur inspiré de la référence",
    workWithUs: "Travaillons ensemble",
    heroLines: ["Donnez vie", "à votre vision."],
    heroBody:
      "Demandez un devis, un échantillon ou une consultation auprès de nos experts de la pierre.",
    sample: "Demander un échantillon",
    sampleBrief:
      "Je souhaite demander un échantillon de pierre. Merci de me conseiller sur les matériaux, les finitions et la livraison pour mon projet.",
    collections: "Collections",
    projects: "Projets",
    search: "Rechercher dans la collection",
    searchHint: "Trouvez un matériau, un objet ou une collection.",
    noResults: "Aucun résultat. Essayez marbre, onyx ou travertin.",
    benefits: [
      ["Pour les architectes", "Fiches techniques et ressources"],
      ["Fabrication sur mesure", "Solutions personnalisées"],
      ["Approvisionnement mondial", "Livraison internationale"],
      ["Conseil expert", "Équipe dédiée"],
    ],
    materialsTitle:
      "Des pierres naturelles exceptionnelles, pour des espaces remarquables.",
    selectedMaterial: "De plus près / matériau sélectionné",
    viewMaterial: "Voir le matériau",
    projectsTitle: "Transformer les espaces à travers le monde.",
    craftKicker: "L’art de façonner",
    craftLines: ["Créé par la nature.", "Affiné à la main."],
    craftBody:
      "De la première dalle à la dernière arête, notre atelier de Karachi soigne chaque coupe. Variations naturelles, proportions réfléchies et savoir-faire artisanal.",
    resources: "Architectes et designers",
    resourcesTitle: "Votre vision. Notre expertise de la matière.",
    resourceItems: [
      "Fiches techniques et ressources",
      "Sélection de pierre",
      "Fabrication sur mesure",
      "Conseil pour votre projet",
    ],
    exploreResources: "Ressources pour architectes",
    sampleTitle: "Découvrez la matière avant de la prescrire.",
    sampleBody:
      "Observez les veines. Ressentez la finition. Demandez à notre atelier un échantillon pour votre espace.",
  },
  it: {
    heroAlt: "Mobile in marmo con lavabo in pietra, rubinetto in ottone e rami d’ulivo — interno ispirato al riferimento",
    workWithUs: "Lavora con noi",
    heroLines: ["Dai vita", "alla tua visione."],
    heroBody:
      "Richiedi un preventivo, un campione o una consulenza con i nostri esperti della pietra.",
    sample: "Richiedi un campione",
    sampleBrief:
      "Vorrei richiedere un campione di pietra. Desidero informazioni su materiali, finiture e consegna per il mio progetto.",
    collections: "Collezioni",
    projects: "Progetti",
    search: "Cerca nella collezione",
    searchHint: "Trova un materiale, un oggetto o una collezione.",
    noResults: "Nessun risultato. Prova marmo, onice o travertino.",
    benefits: [
      ["Per gli architetti", "Specifiche e risorse"],
      ["Lavorazione su misura", "Soluzioni personalizzate"],
      ["Fornitura globale", "Consegna internazionale"],
      ["Supporto esperto", "Team dedicato"],
    ],
    materialsTitle: "Pietra naturale eccezionale, per spazi straordinari.",
    selectedMaterial: "Da vicino / materiale selezionato",
    viewMaterial: "Scopri il materiale",
    projectsTitle: "Trasformiamo spazi in tutto il mondo.",
    craftKicker: "L’arte del fare",
    craftLines: ["Creata dalla natura.", "Rifinita a mano."],
    craftBody:
      "Dalla prima lastra all’ultimo bordo, il nostro studio di Karachi cura ogni taglio. Variazioni naturali, proporzioni studiate e la sapienza dell’artigiano.",
    resources: "Architetti e designer",
    resourcesTitle: "La tua visione. La nostra esperienza.",
    resourceItems: [
      "Specifiche e risorse",
      "Selezione della pietra",
      "Lavorazione su misura",
      "Consulenza di progetto",
    ],
    exploreResources: "Risorse per architetti",
    sampleTitle: "Scopri il materiale prima di sceglierlo.",
    sampleBody:
      "Osserva le venature. Senti la finitura. Parla con il nostro studio di un campione per il tuo spazio.",
  },
  ru: {
    heroAlt: "Мраморная тумба с каменной раковиной, латунным смесителем и ветвями оливы — интерьер по образцу",
    workWithUs: "Работайте с нами",
    heroLines: ["Воплотите", "вашу идею."],
    heroBody:
      "Запросите расчёт, образец или консультацию наших специалистов по камню.",
    sample: "Запросить образец",
    sampleBrief:
      "Я хочу запросить образец камня. Подскажите материалы, варианты обработки и условия доставки для моего проекта.",
    collections: "Коллекции",
    projects: "Проекты",
    search: "Поиск по коллекции",
    searchHint: "Найдите материал, предмет или коллекцию.",
    noResults: "Ничего не найдено. Попробуйте мрамор, оникс или травертин.",
    benefits: [
      ["Для архитекторов", "Спецификации и ресурсы"],
      ["Индивидуальное изготовление", "Решения на заказ"],
      ["Глобальные поставки", "Доставка по всему миру"],
      ["Поддержка экспертов", "Внимательная команда"],
    ],
    materialsTitle:
      "Исключительный природный камень для выдающихся пространств.",
    selectedMaterial: "Крупным планом / выбранный материал",
    viewMaterial: "Смотреть материал",
    projectsTitle: "Преображаем пространства по всему миру.",
    craftKicker: "Искусство создания",
    craftLines: ["Создано природой.", "Доведено вручную."],
    craftBody:
      "От первой плиты до последней кромки наша мастерская в Карачи заботится о каждом срезе. Природные вариации, выверенные пропорции и мастерство рук.",
    resources: "Архитекторы и дизайнеры",
    resourcesTitle: "Ваша идея. Наше знание камня.",
    resourceItems: [
      "Спецификации и ресурсы",
      "Подбор камня",
      "Изготовление на заказ",
      "Консультация по проекту",
    ],
    exploreResources: "Ресурсы для архитекторов",
    sampleTitle: "Познакомьтесь с материалом до его выбора.",
    sampleBody:
      "Рассмотрите прожилки. Почувствуйте поверхность. Обсудите образец для вашего пространства с нашей мастерской.",
  },
  ar: {
    heroAlt: "حوض حجري فوق سطح رخامي مع صنبور نحاسي وأغصان زيتون — تصميم مستوحى من الصورة المرجعية",
    workWithUs: "اعملوا معنا",
    heroLines: ["امنحوا رؤيتكم", "حياةً جديدة."],
    heroBody: "اطلبوا عرض سعر أو عينة أو استشارة من فريق خبراء الحجر لدينا.",
    sample: "طلب عينة",
    sampleBrief:
      "أود طلب عينة حجر. يرجى تقديم المشورة بشأن المواد والتشطيبات وتوصيل العينة لمشروعي.",
    collections: "المجموعات",
    projects: "المشاريع",
    search: "البحث في المجموعة",
    searchHint: "ابحثوا عن مادة أو قطعة أو مجموعة.",
    noResults: "لا توجد نتائج. جرّبوا الرخام أو الأونيكس أو الترافرتين.",
    benefits: [
      ["للمهندسين المعماريين", "المواصفات والموارد"],
      ["تصنيع حسب الطلب", "حلول مخصصة"],
      ["توريد عالمي", "توصيل حول العالم"],
      ["دعم الخبراء", "فريق متخصص"],
    ],
    materialsTitle: "حجر طبيعي استثنائي، لمساحات متميزة.",
    selectedMaterial: "نظرة أقرب / مادة مختارة",
    viewMaterial: "استكشاف المادة",
    projectsTitle: "نحوّل المساحات حول العالم.",
    craftKicker: "فن الصناعة",
    craftLines: ["صنعته الطبيعة.", "صقلته الأيدي."],
    craftBody:
      "من أول لوح إلى آخر حافة، يعتني استوديو كراتشي بكل قطع. تنوع طبيعي ونسب مدروسة ومهارة حرفية هادئة.",
    resources: "المعماريون والمصممون",
    resourcesTitle: "رؤيتكم. خبرتنا في المواد.",
    resourceItems: [
      "المواصفات والموارد",
      "اختيار الحجر",
      "تصنيع حسب الطلب",
      "استشارة المشروع",
    ],
    exploreResources: "موارد المهندسين المعماريين",
    sampleTitle: "اكتشفوا المادة قبل اعتمادها.",
    sampleBody:
      "تأملوا العروق. المسوا التشطيب. تحدثوا مع استوديونا عن عينة مختارة لمساحتكم.",
  },
  ur: {
    heroAlt: "سنگ مرمر کا کاؤنٹر، پتھر کا پیالہ نما بیسن، پیتل کا نل اور زیتون کی شاخیں — حوالہ تصویر سے متاثر منظر",
    workWithUs: "ہمارے ساتھ کام کریں",
    heroLines: ["اپنے تصور کو", "حقیقت بنائیں۔"],
    heroBody: "ہمارے پتھر کے ماہرین سے قیمت، نمونہ یا مشاورت کی درخواست کریں۔",
    sample: "نمونہ طلب کریں",
    sampleBrief:
      "میں پتھر کا نمونہ طلب کرنا چاہتا ہوں۔ براہ کرم میرے منصوبے کے لیے مواد، فنش اور نمونے کی ترسیل کے بارے میں رہنمائی کریں۔",
    collections: "مجموعے",
    projects: "منصوبے",
    search: "مجموعے میں تلاش کریں",
    searchHint: "مواد، اشیا یا مجموعہ تلاش کریں۔",
    noResults: "کوئی نتیجہ نہیں ملا۔ ماربل، اونکس یا ٹراورٹین آزمائیں۔",
    benefits: [
      ["آرکیٹیکٹس کے لیے", "تفصیلات اور وسائل"],
      ["حسبِ ضرورت تیاری", "خصوصی حل"],
      ["عالمی سپلائی", "دنیا بھر میں ترسیل"],
      ["ماہرین کی مدد", "مختص ٹیم"],
    ],
    materialsTitle: "شاندار جگہوں کے لیے غیر معمولی قدرتی پتھر۔",
    selectedMaterial: "قریب سے دیکھیں / منتخب مواد",
    viewMaterial: "مواد دیکھیں",
    projectsTitle: "دنیا بھر میں جگہوں کو بدلتے ہیں۔",
    craftKicker: "تخلیق کا فن",
    craftLines: ["قدرت کا بنایا ہوا۔", "ہاتھ سے نکھارا ہوا۔"],
    craftBody:
      "پہلی سلیب سے آخری کنارے تک، ہمارا کراچی اسٹوڈیو ہر کٹ کا خیال رکھتا ہے۔ قدرتی تنوع، سوچے سمجھے تناسب اور کاریگر کی مہارت۔",
    resources: "آرکیٹیکٹس اور ڈیزائنرز",
    resourcesTitle: "آپ کا تصور۔ مواد میں ہماری مہارت۔",
    resourceItems: [
      "تفصیلات اور وسائل",
      "پتھر کا انتخاب",
      "حسبِ ضرورت تیاری",
      "منصوبے کی مشاورت",
    ],
    exploreResources: "آرکیٹیکٹ وسائل دیکھیں",
    sampleTitle: "منتخب کرنے سے پہلے مواد کا تجربہ کریں۔",
    sampleBody:
      "رگوں کو دیکھیں۔ فنش کو محسوس کریں۔ اپنی جگہ کے لیے منتخب نمونے کے بارے میں ہمارے اسٹوڈیو سے بات کریں۔",
  },
};
