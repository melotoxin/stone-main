import { type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { accessoryParent, type ProductAccessory } from '@/data/product-accessories';
import type { SpaceId } from '@/data/room-scenes';
import { localizedPiece, useI18n } from '@/i18n';
import { useCardDepth } from './useCardDepth';

const accessoryCopy = {
  en: { kitchen: 'More for the kitchen.', washroom: 'The details that matter.', references: 'Design references', parts: 'Inside the bath sets', reference: 'Reference photograph', part: 'Part of', set: 'View the complete set', discuss: 'Discuss this design', photo: 'Photo', kitchenBody: 'Explore these photographed kitchen essentials as starting points for a conversation with our studio. Material, finish and feasibility are confirmed on enquiry.', washroomBody: 'Discover the individual accessories inside our existing bath sets. Each close-up leads to its complete set; ask the studio about individual pieces.' },
  es: { kitchen: 'Más para la cocina.', washroom: 'Los detalles importan.', references: 'Referencias de diseño', parts: 'Dentro de los juegos de baño', reference: 'Fotografía de referencia', part: 'Parte de', set: 'Ver el juego completo', discuss: 'Consultar este diseño', photo: 'Foto', kitchenBody: 'Explora estos utensilios como punto de partida para hablar con nuestro estudio. El material, el acabado y la viabilidad se confirman al consultar.', washroomBody: 'Descubre los accesorios de nuestros juegos de baño. Cada detalle enlaza al juego completo; consulta las piezas individuales con el estudio.' },
  it: { kitchen: 'Ancora per la cucina.', washroom: 'I dettagli che contano.', references: 'Riferimenti di design', parts: 'Dentro i set da bagno', reference: 'Fotografia di riferimento', part: 'Parte di', set: 'Vedi il set completo', discuss: 'Parliamo del progetto', photo: 'Foto', kitchenBody: 'Esplora questi accessori come spunti per una conversazione con lo studio. Materiale, finitura e fattibilità si confermano su richiesta.', washroomBody: 'Scopri gli accessori dei nostri set da bagno. Ogni dettaglio rimanda al set completo; chiedi allo studio informazioni sui singoli pezzi.' },
  fr: { kitchen: 'Encore pour la cuisine.', washroom: 'Les détails qui comptent.', references: 'Références de design', parts: 'Dans les ensembles de bain', reference: 'Photographie de référence', part: 'Dans', set: 'Voir l’ensemble complet', discuss: 'Parlons de ce projet', photo: 'Photo', kitchenBody: 'Explorez ces accessoires comme point de départ pour une conversation avec notre studio. Matériau, finition et faisabilité sont confirmés sur demande.', washroomBody: 'Découvrez les accessoires de nos ensembles de bain. Chaque détail mène à l’ensemble complet ; contactez le studio pour les pièces individuelles.' },
  ar: { kitchen: 'المزيد للمطبخ.', washroom: 'تفاصيل تصنع الفرق.', references: 'أفكار للتصميم', parts: 'داخل أطقم الحمام', reference: 'صورة مرجعية', part: 'جزء من', set: 'عرض الطقم الكامل', discuss: 'ناقش هذا التصميم', photo: 'صورة', kitchenBody: 'استكشف أدوات المطبخ هذه كنقطة بداية للحديث مع الاستوديو. يتم تأكيد المادة والتشطيب وإمكانية التنفيذ عند الاستفسار.', washroomBody: 'اكتشف القطع الموجودة في أطقم الحمام الحالية. يقود كل تفصيل إلى الطقم الكامل؛ اسأل الاستوديو عن القطع الفردية.' },
  ur: { kitchen: 'باورچی خانے کے لیے مزید۔', washroom: 'وہ تفصیلات جو اہم ہیں۔', references: 'ڈیزائن کے حوالے', parts: 'غسل خانے کے سیٹ کی اشیا', reference: 'حوالے کی تصویر', part: 'اس سیٹ کا حصہ', set: 'مکمل سیٹ دیکھیں', discuss: 'اس ڈیزائن پر بات کریں', photo: 'تصویر', kitchenBody: 'ان اشیا کو ہمارے اسٹوڈیو کے ساتھ گفتگو کے آغاز کے طور پر دیکھیں۔ مواد، فنش اور تیاری کے امکان کی تصدیق استفسار پر کی جاتی ہے۔', washroomBody: 'ہمارے موجودہ غسل خانے کے سیٹ کی الگ اشیا دیکھیں۔ ہر تفصیل مکمل سیٹ تک لے جاتی ہے؛ الگ اشیا کے لیے اسٹوڈیو سے پوچھیں۔' },
  ru: { kitchen: 'Ещё для кухни.', washroom: 'Детали, которые важны.', references: 'Идеи для дизайна', parts: 'Внутри наборов для ванной', reference: 'Референсная фотография', part: 'Часть набора', set: 'Посмотреть полный набор', discuss: 'Обсудить этот дизайн', photo: 'Фото', kitchenBody: 'Рассмотрите эти предметы как отправную точку для беседы со студией. Материал, отделку и возможность изготовления уточняют по запросу.', washroomBody: 'Откройте отдельные аксессуары наших наборов для ванной. Каждый фрагмент ведёт к полному набору; уточняйте отдельные изделия у студии.' },
} as const;

const retouchedCopy = {
  en: 'Retouched detail', es: 'Detalle retocado', it: 'Dettaglio ritoccato',
  fr: 'Détail retouché', ar: 'تفصيل مُحسَّن', ur: 'بہتر کی گئی تفصیل', ru: 'Ретушированная деталь',
} as const;

export function AccessoryEdit({ category, accessories }: { category: SpaceId; accessories: ProductAccessory[] }) {
  const { locale } = useI18n();
  if (!accessories.length || category === 'home-decor') return null;
  const text = accessoryCopy[locale];
  const references = category === 'kitchen';
  return (
    <section className={'product-accessories product-accessories--' + category} aria-labelledby="product-accessory-title" data-testid="product-accessories">
      <div className="product-accessories__heading">
        <div><p className="product-eyebrow">{references ? text.references : text.parts}</p><h2 id="product-accessory-title">{text[category]}</h2></div>
        <p>{references ? text.kitchenBody : text.washroomBody}</p>
      </div>
      <div className="product-accessories__grid">
        {accessories.map(accessory => <AccessoryCard key={accessory.id} accessory={accessory} />)}
      </div>
    </section>
  );
}

function AccessoryCard({ accessory }: { accessory: ProductAccessory }) {
  const { locale } = useI18n();
  const text = accessoryCopy[locale];
  const depth = useCardDepth<HTMLElement>();
  const parent = accessoryParent(accessory);
  const set = parent && localizedPiece(parent, locale);
  const dark = /black|dark|nero|noir|portoro/i.test(accessory.material + ' ' + accessory.id);
  const retouched = accessory.kind === 'set-component' && accessory.retouched;
  const href = parent ? '/collection/' + parent.room + '/' + parent.slug
    : '/enquire?' + new URLSearchParams({ intent: 'consultation', name: accessory.title, brief: text.discuss + ': ' + accessory.title + ' (' + text.reference + ').' }).toString();
  return (
    <article className={'product-accessory stone-cabinet stone-cabinet--' + (dark ? 'dark' : 'light')} {...depth} data-testid={'accessory-' + accessory.id}>
      <Link href={href} className="product-accessory__photo" aria-label={(parent ? text.set : text.discuss) + ': ' + accessory.title}>
        <div className="product-object__aperture">
          <img src={accessory.image} alt={accessory.alt} width={accessory.width} height={accessory.height} loading="lazy" decoding="async" draggable={false} style={parent ? { '--accessory-native-width': accessory.width + 'px', '--accessory-native-height': accessory.height + 'px' } as CSSProperties : undefined} />
        </div>
        <span className="stone-cabinet__plinth" aria-hidden="true" />
        <span className="product-accessory__arrow"><ArrowUpRight size={21} aria-hidden="true" /></span>
      </Link>
      <div className="product-accessory__body">
        <p className="product-accessory__kind" data-testid={retouched ? 'image-treatment-' + accessory.id : undefined}>{retouched ? retouchedCopy[locale] : parent ? text.part : text.reference}</p>
        <h3 lang="en"><Link href={href}>{accessory.title}</Link></h3>
        <p lang="en">{accessory.material}</p><p lang="en">{accessory.description}</p>
        {set && <p className="product-accessory__set-context">{text.part} <Link href={href} className="product-accessory__set">{set.title}</Link></p>}
        <Link href={href} className="product-text-link">{parent ? text.set : text.discuss}<ArrowUpRight size={17} aria-hidden="true" /></Link>
        {accessory.kind === 'reference' && <a className="product-accessory__credit" href={accessory.credit.source} target="_blank" rel="noopener noreferrer">{text.photo}: {accessory.credit.photographer} · {accessory.credit.license}<ArrowUpRight size={13} aria-hidden="true" /></a>}
      </div>
    </article>
  );
}
