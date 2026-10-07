import type { LocaleCode } from '../locales';
import type { Catalog } from '../types';

type ProjectCalc = Catalog['projectCalc'];

const en: ProjectCalc = {
  stone: 'Named Pakistani stone',
  area: 'Project area',
  areaUnits: 'Area units',
  unitSqFt: 'sq ft',
  unitM2: 'm²',
  thickness: 'Thickness (mm)',
  wastage: 'Wastage (%)',
  thicknessNote:
    'Published rates are PKR per sq ft for flooring through kitchen-top (~20 mm). A thicker face scales that published band. It is still material only.',
  port: 'Destination port',
  portPlaceholder: 'Jebel Ali, Shanghai, Genoa…',
  crates: 'Crates discussed',
  cratesHint: 'Crate count is lot language for the briefing — it does not add a packing or freight price.',
  billedArea: 'Billed face',
  materialRange: 'Indicative material',
  publishedBand: 'Name band',
  usdLine: (low, high, rate) => `≈ ${low} – ${high} at ${rate} PKR/USD`,
  disclaimer:
    'This is an indicative material range from the published Pakistani name bands. It is not a St Werkz quotation, not a finished-piece price, and not an invoice. A viewing confirms the stone.',
  freightNote: 'FOB Karachi. Freight, insurance and destination charges are named separately — they are not on this calculator.',
  requestQuote: 'Request this range',
  applyToForm: 'Apply to lot request',
  waiting: 'Last valid size held while you adjust.',
  giveArea: 'Give the project a plausible area to see a range.',
};

const es: ProjectCalc = {
  stone: 'Piedra pakistaní con nombre',
  area: 'Área del proyecto',
  areaUnits: 'Unidades de área',
  unitSqFt: 'pie²',
  unitM2: 'm²',
  thickness: 'Espesor (mm)',
  wastage: 'Merma (%)',
  thicknessNote:
    'Las tarifas publicadas son PKR por pie² de suelo a encimera (~20 mm). Un canto más grueso escala esa banda. Sigue siendo solo material.',
  port: 'Puerto de destino',
  portPlaceholder: 'Jebel Ali, Shanghái, Génova…',
  crates: 'Cajones tratados',
  cratesHint: 'El número de cajones es lenguaje de lote para el briefing — no añade precio de embalaje ni flete.',
  billedArea: 'Cara facturada',
  materialRange: 'Material indicativo',
  publishedBand: 'Banda del nombre',
  usdLine: (low, high, rate) => `≈ ${low} – ${high} a ${rate} PKR/USD`,
  disclaimer:
    'Es un rango de material indicativo según las bandas pakistaníes publicadas. No es un presupuesto de St Werkz, ni el precio de una pieza terminada, ni una factura. Una visita confirma la piedra.',
  freightNote: 'FOB Karachi. Flete, seguro y gastos de destino se nombran aparte — no están en esta calculadora.',
  requestQuote: 'Pedir este rango',
  applyToForm: 'Aplicar a la solicitud de lote',
  waiting: 'Se mantiene el último tamaño válido mientras ajusta.',
  giveArea: 'Dé al proyecto un área plausible para ver un rango.',
};

const fr: ProjectCalc = {
  stone: 'Pierre pakistanaise nommée',
  area: 'Surface du projet',
  areaUnits: 'Unités de surface',
  unitSqFt: 'pi²',
  unitM2: 'm²',
  thickness: 'Épaisseur (mm)',
  wastage: 'Perte (%)',
  thicknessNote:
    'Les tarifs publiés sont en PKR par pi², du sol au plan de travail (~20 mm). Une face plus épaisse met cette bande à l’échelle. Ce n’est toujours que la matière.',
  port: 'Port de destination',
  portPlaceholder: 'Jebel Ali, Shanghai, Gênes…',
  crates: 'Caisses évoquées',
  cratesHint: 'Le nombre de caisses est un langage de lot pour le briefing — il n’ajoute ni emballage ni fret.',
  billedArea: 'Face facturée',
  materialRange: 'Matière indicative',
  publishedBand: 'Bande du nom',
  usdLine: (low, high, rate) => `≈ ${low} – ${high} à ${rate} PKR/USD`,
  disclaimer:
    'Fourchette de matière indicative d’après les bandes pakistanaises publiées. Ce n’est pas un devis St Werkz, ni le prix d’une pièce finie, ni une facture. Une visite confirme la pierre.',
  freightNote: 'FOB Karachi. Fret, assurance et frais de destination sont nommés à part — absents de ce calculateur.',
  requestQuote: 'Demander cette fourchette',
  applyToForm: 'Appliquer à la demande de lot',
  waiting: 'Dernière taille valable conservée pendant l’ajustement.',
  giveArea: 'Donnez au projet une surface plausible pour voir une fourchette.',
};

const it: ProjectCalc = {
  stone: 'Pietra pakistana nominata',
  area: 'Area di progetto',
  areaUnits: 'Unità di area',
  unitSqFt: 'ft²',
  unitM2: 'm²',
  thickness: 'Spessore (mm)',
  wastage: 'Scarto (%)',
  thicknessNote:
    'Le tariffe pubblicate sono PKR per ft² da pavimento a piano cucina (~20 mm). Uno spessore maggiore scala quella banda. Resta solo materiale.',
  port: 'Porto di destinazione',
  portPlaceholder: 'Jebel Ali, Shanghai, Genova…',
  crates: 'Casse discusse',
  cratesHint: 'Il numero di casse è linguaggio di lotto per il briefing — non aggiunge imballo né nolo.',
  billedArea: 'Faccia fatturata',
  materialRange: 'Materiale indicativo',
  publishedBand: 'Banda del nome',
  usdLine: (low, high, rate) => `≈ ${low} – ${high} a ${rate} PKR/USD`,
  disclaimer:
    'Intervallo di materiale indicativo dalle bande pakistane pubblicate. Non è un preventivo St Werkz, né il prezzo di un pezzo finito, né una fattura. Una visita conferma la pietra.',
  freightNote: 'FOB Karachi. Nolo, assicurazione e spese di destinazione si nominano a parte — non sono in questo calcolatore.',
  requestQuote: 'Chiedere questo intervallo',
  applyToForm: 'Applica alla richiesta di lotto',
  waiting: 'Ultima misura valida tenuta mentre regola.',
  giveArea: 'Dia al progetto un’area plausibile per vedere un intervallo.',
};

const ar: ProjectCalc = {
  stone: 'حجر باكستاني مسمّى',
  area: 'مساحة المشروع',
  areaUnits: 'وحدات المساحة',
  unitSqFt: 'قدم²',
  unitM2: 'م²',
  thickness: 'السماكة (مم)',
  wastage: 'الهدر (%)',
  thicknessNote:
    'الأسعار المنشورة بالروبية لكل قدم² من الأرضيات حتى سطح المطبخ (~20 مم). الوجه الأسمك يوسّع تلك الشريحة. ما زال مادة فقط.',
  port: 'ميناء الوجهة',
  portPlaceholder: 'جبل علي، شنغهاي، جنوة…',
  crates: 'صناديق مناقَشة',
  cratesHint: 'عدد الصناديق لغة دفعة للموجز — لا يضيف سعر تغليف أو شحن.',
  billedArea: 'الوجه المحسوب',
  materialRange: 'مادة إرشادية',
  publishedBand: 'شريحة الاسم',
  usdLine: (low, high, rate) => `≈ ${low} – ${high} عند ${rate} روبية/دولار`,
  disclaimer:
    'هذا نطاق مادة إرشادي من الشرائح الباكستانية المنشورة. ليس عرض سعر من St Werkz ولا سعر قطعة منتهية ولا فاتورة. المعاينة تؤكد الحجر.',
  freightNote: 'FOB كراتشي. الشحن والتأمين ورسوم الوجهة تُذكر منفصلة — ليست في هذه الحاسبة.',
  requestQuote: 'اطلب هذا النطاق',
  applyToForm: 'طبّق على طلب الدفعة',
  waiting: 'آخر قياس صالح محفوظ أثناء التعديل.',
  giveArea: 'أعطِ المشروع مساحة معقولة لترى نطاقاً.',
};

const ur: ProjectCalc = {
  stone: 'نام زدہ پاکستانی پتھر',
  area: 'پروجیکٹ رقبہ',
  areaUnits: 'رقبے کی اکائیاں',
  unitSqFt: 'فٹ²',
  unitM2: 'میٹر²',
  thickness: 'موٹائی (ملی میٹر)',
  wastage: 'ضیاع (%)',
  thicknessNote:
    'شائع شدہ نرخ فی مربع فٹ ہیں، فرش سے کچن ٹاپ (~20 ملی میٹر) تک۔ موٹی سطح اسی بینڈ کو بڑھاتی ہے۔ یہ اب بھی صرف مواد ہے۔',
  port: 'منزل کی بندرگاہ',
  portPlaceholder: 'جبل علی، شنگھائی، جینوا…',
  crates: 'زیرِ بحث کریٹ',
  cratesHint: 'کریٹ کی تعداد بریفنگ کی زبان ہے — پیکنگ یا فریٹ کی قیمت نہیں جوڑتی۔',
  billedArea: 'حساب شدہ رخ',
  materialRange: 'اشاریہ مواد',
  publishedBand: 'نام کا بینڈ',
  usdLine: (low, high, rate) => `≈ ${low} – ${high} بمطابق ${rate} روپے/ڈالر`,
  disclaimer:
    'یہ شائع شدہ پاکستانی ناموں کے بینڈ سے اشاریہ مواد ہے۔ St Werkz کا کوٹیشن نہیں، تیار ٹکڑے کی قیمت نہیں، انوائس نہیں۔ دیکھنے سے پتھر کی تصدیق ہوتی ہے۔',
  freightNote: 'FOB کراچی۔ فریٹ، انشورنس اور منزل کے اخراجات الگ بتائے جاتے ہیں — اس حساب میں نہیں۔',
  requestQuote: 'یہ حد مانگیں',
  applyToForm: 'لاٹ کی درخواست میں لگائیں',
  waiting: 'ایڈجسٹ کرتے ہوئے آخری درست سائز رکھا گیا ہے۔',
  giveArea: 'رینج دیکھنے کے لیے پروجیکٹ کو معقول رقبہ دیں۔',
};

const ru: ProjectCalc = {
  stone: 'Именованный пакистанский камень',
  area: 'Площадь проекта',
  areaUnits: 'Единицы площади',
  unitSqFt: 'фут²',
  unitM2: 'м²',
  thickness: 'Толщина (мм)',
  wastage: 'Отход (%)',
  thicknessNote:
    'Опубликованные ставки — PKR за фут² от пола до кухонной столешницы (~20 мм). Более толстая пласть масштабирует эту полосу. Это по-прежнему только материал.',
  port: 'Порт назначения',
  portPlaceholder: 'Джебель-Али, Шанхай, Генуя…',
  crates: 'Обсуждаемые ящики',
  cratesHint: 'Число ящиков — язык лота для брифа, без цены упаковки или фрахта.',
  billedArea: 'Учитываемая пласть',
  materialRange: 'Ориентировочный материал',
  publishedBand: 'Полоса имени',
  usdLine: (low, high, rate) => `≈ ${low} – ${high} по ${rate} PKR/USD`,
  disclaimer:
    'Ориентировочный диапазон материала по опубликованным пакистанским полосам. Это не коммерческое предложение St Werkz, не цена готового изделия и не счёт. Просмотр подтверждает камень.',
  freightNote: 'FOB Карачи. Фрахт, страховка и сборы в порту назначения называются отдельно — их нет в этом калькуляторе.',
  requestQuote: 'Запросить этот диапазон',
  applyToForm: 'Перенести в заявку на лот',
  waiting: 'Последний верный размер сохранён, пока вы правите.',
  giveArea: 'Задайте проекту правдоподобную площадь, чтобы увидеть диапазон.',
};

export const projectCalcs: Record<LocaleCode, ProjectCalc> = {
  en,
  es,
  fr,
  it,
  ar,
  ur,
  ru,
};
