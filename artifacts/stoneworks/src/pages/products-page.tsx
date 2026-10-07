import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowDown, ArrowUpRight, MoveRight, Search, X } from 'lucide-react';
import { Link } from 'wouter';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { MarbleButton } from '@/components/ui/MarbleButton';
import { AccessoryEdit } from '@/components/products/AccessoryEdit';
import { ProductCard } from '@/components/products/ProductCard';
import { CataloguePhoto } from '@/components/products/CataloguePhoto';
import { productChapters, productChapterFromHash, type ProductChapter } from '@/data/products';
import { productAccessories, productItemCount } from '@/data/product-accessories';
import { quoteHref } from '@/data/b2b';
import { localizedPiece, useI18n, type LocaleCode } from '@/i18n';
import '@/styles/products.css';
import '@/styles/product-cards.css';

const labels: Record<LocaleCode, readonly [string, string, string]> = {
  en: ['Kitchen', 'Washroom', 'Room & home decor'],
  es: ['Cocina', 'Baño', 'Decoración del hogar'],
  it: ['Cucina', 'Bagno', 'Decorazioni per la casa'],
  fr: ['Cuisine', 'Salle de bain', 'Décoration de la maison'],
  ar: ['المطبخ', 'الحمام', 'ديكور الغرف والمنزل'],
  ur: ['باورچی خانہ', 'غسل خانہ', 'کمرے اور گھر کی سجاوٹ'],
  ru: ['Кухня', 'Ванная', 'Декор для дома'],
};

const compactLabels: Record<LocaleCode, string> = {
  en: 'Home decor', es: 'Decoración', it: 'Decorazioni', fr: 'Décoration',
  ar: 'ديكور المنزل', ur: 'گھر کی سجاوٹ', ru: 'Декор',
};

const searchCopy = {
  en: { label: 'Find an object in this category', placeholder: 'Name, stone or product code', clear: 'Clear search', empty: 'No matching objects in this category.', reset: 'Show all objects', featured: 'In the featured object above' },
  es: { label: 'Busca un objeto en esta categoría', placeholder: 'Nombre, piedra o código', clear: 'Borrar búsqueda', empty: 'No hay objetos que coincidan en esta categoría.', reset: 'Ver todos los objetos', featured: 'El objeto destacado arriba' },
  it: { label: 'Cerca un oggetto in questa categoria', placeholder: 'Nome, pietra o codice', clear: 'Cancella ricerca', empty: 'Nessun oggetto corrispondente in questa categoria.', reset: 'Mostra tutti gli oggetti', featured: 'L’oggetto in primo piano sopra' },
  fr: { label: 'Cherchez un objet dans cette catégorie', placeholder: 'Nom, pierre ou référence', clear: 'Effacer la recherche', empty: 'Aucun objet correspondant dans cette catégorie.', reset: 'Voir tous les objets', featured: 'L’objet présenté ci-dessus' },
  ar: { label: 'ابحث عن قطعة في هذه الفئة', placeholder: 'الاسم أو الحجر أو رمز المنتج', clear: 'مسح البحث', empty: 'لا توجد قطع مطابقة في هذه الفئة.', reset: 'عرض جميع القطع', featured: 'القطعة المميزة أعلاه' },
  ur: { label: 'اس زمرے میں شے تلاش کریں', placeholder: 'نام، پتھر یا پروڈکٹ کوڈ', clear: 'تلاش صاف کریں', empty: 'اس زمرے میں کوئی شے نہیں ملی۔', reset: 'تمام اشیا دکھائیں', featured: 'اوپر دکھائی گئی خاص شے' },
  ru: { label: 'Найти предмет в этой категории', placeholder: 'Название, камень или код', clear: 'Очистить поиск', empty: 'В этой категории совпадений нет.', reset: 'Показать все предметы', featured: 'Избранный предмет выше' },
} as const;

const normalizeSearch = (value: string) => value.normalize('NFKD').replace(/\p{M}/gu, '').toLocaleLowerCase().trim();
const additionsLabel: Record<LocaleCode, string> = {
  en: 'Explore the new additions', es: 'Explora las novedades', it: 'Scopri le novità',
  fr: 'Découvrez les nouveautés', ar: 'استكشف الإضافات الجديدة', ur: 'نئی اشیا دیکھیں', ru: 'Посмотреть новые предметы',
};

const copy = {
  en: { eyebrow: 'ST WERKZ / THE OBJECT EDIT', title: 'Everyday objects.', emphasis: 'Extraordinary stone.', intro: 'Useful, sculptural pieces for the table, the vanity and the spaces you call home.', objects: 'objects', browse: 'Explore the objects', featured: 'The featured object', discover: 'View the piece', shelf: 'The rest of the edit', all: 'Explore all collections', close: 'Found something you love?', closeBody: 'Ask about a piece, a stone or a custom finish. Our Karachi studio will help you find the right fit.', enquiry: 'Talk to our stone experts', selected: 'Selected category' },
  es: { eyebrow: 'ST WERKZ / SELECCIÓN DE OBJETOS', title: 'Objetos cotidianos.', emphasis: 'Piedra extraordinaria.', intro: 'Piezas útiles y escultóricas para la mesa, el baño y tu hogar.', objects: 'objetos', browse: 'Explora los objetos', featured: 'El objeto destacado', discover: 'Ver la pieza', shelf: 'El resto de la selección', all: 'Explora todas las colecciones', close: '¿Encontraste algo que te encanta?', closeBody: 'Pregunta por una pieza, una piedra o un acabado a medida. Nuestro estudio de Karachi te ayudará a elegir.', enquiry: 'Habla con nuestros expertos', selected: 'Categoría seleccionada' },
  it: { eyebrow: 'ST WERKZ / SELEZIONE DI OGGETTI', title: 'Oggetti quotidiani.', emphasis: 'Pietra straordinaria.', intro: 'Pezzi utili e scultorei per la tavola, il bagno e gli spazi di casa.', objects: 'oggetti', browse: 'Esplora gli oggetti', featured: 'L’oggetto in primo piano', discover: 'Scopri il pezzo', shelf: 'Il resto della selezione', all: 'Esplora tutte le collezioni', close: 'Hai trovato qualcosa che ami?', closeBody: 'Chiedici di un pezzo, una pietra o una finitura su misura. Il nostro studio di Karachi ti aiuterà a scegliere.', enquiry: 'Parla con i nostri esperti', selected: 'Categoria selezionata' },
  fr: { eyebrow: 'ST WERKZ / SÉLECTION D’OBJETS', title: 'Objets du quotidien.', emphasis: 'Pierre extraordinaire.', intro: 'Des pièces utiles et sculpturales pour la table, la salle de bain et votre maison.', objects: 'objets', browse: 'Explorez les objets', featured: 'L’objet à découvrir', discover: 'Voir la pièce', shelf: 'Le reste de la sélection', all: 'Explorez toutes les collections', close: 'Un objet vous plaît ?', closeBody: 'Parlons d’une pièce, d’une pierre ou d’une finition sur mesure. Notre studio de Karachi vous aidera à choisir.', enquiry: 'Parlez à nos experts', selected: 'Catégorie sélectionnée' },
  ar: { eyebrow: 'ST WERKZ / مجموعة القطع', title: 'قطع للحياة اليومية.', emphasis: 'حجر استثنائي.', intro: 'قطع عملية ومنحوتة للمائدة والحمام والمساحات التي تسميها منزلك.', objects: 'قطع', browse: 'استكشف القطع', featured: 'القطعة المميزة', discover: 'عرض القطعة', shelf: 'بقية المجموعة', all: 'استكشف كل المجموعات', close: 'هل وجدت قطعة أعجبتك؟', closeBody: 'اسأل عن قطعة أو حجر أو تشطيب مخصص. سيساعدك فريق الاستوديو في كراتشي على الاختيار.', enquiry: 'تحدث مع خبراء الحجر', selected: 'الفئة المختارة' },
  ur: { eyebrow: 'ST WERKZ / منتخب اشیا', title: 'روزمرہ کی اشیا۔', emphasis: 'غیر معمولی پتھر۔', intro: 'میز، غسل خانے اور گھر کے لیے کارآمد اور نفیس تراشی ہوئی اشیا۔', objects: 'اشیا', browse: 'اشیا دیکھیں', featured: 'خاص منتخب شے', discover: 'شے دیکھیں', shelf: 'مجموعے کی مزید اشیا', all: 'تمام مجموعے دیکھیں', close: 'کیا کوئی شے پسند آئی؟', closeBody: 'کسی شے، پتھر یا خاص فنش کے بارے میں پوچھیں۔ ہمارا کراچی اسٹوڈیو آپ کو موزوں انتخاب میں مدد دے گا۔', enquiry: 'ہمارے ماہرین سے بات کریں', selected: 'منتخب زمرہ' },
  ru: { eyebrow: 'ST WERKZ / ПОДБОРКА ПРЕДМЕТОВ', title: 'Повседневные предметы.', emphasis: 'Необыкновенный камень.', intro: 'Полезные скульптурные изделия для стола, ванной и вашего дома.', objects: 'предметов', browse: 'Посмотреть предметы', featured: 'Избранный предмет', discover: 'Посмотреть изделие', shelf: 'Другие предметы подборки', all: 'Все коллекции', close: 'Нашли то, что вам нравится?', closeBody: 'Спросите об изделии, камне или индивидуальной отделке. Наша студия в Карачи поможет подобрать подходящий вариант.', enquiry: 'Поговорите с нашими экспертами', selected: 'Выбранная категория' },
} as const;

function initialCategory() {
  if (typeof window === 'undefined') return 0;
  const space = productChapterFromHash(window.location.hash);
  return Math.max(0, productChapters.findIndex(chapter => chapter.id === space));
}

function initialSearch() {
  if (typeof window === 'undefined') return '';
  const saved = window.history?.state?.stWerkzProductSearch;
  return saved?.category === productChapters[initialCategory()].id && typeof saved.query === 'string' ? saved.query : '';
}

function FeaturedObject({ chapter, index, onBrowse }: { chapter: ProductChapter; index: number; onBrowse: () => void }) {
  const { locale } = useI18n();
  const text = copy[locale];
  const featured = chapter.pieces.find(piece => piece.slug === chapter.featuredSlug)!;
  const product = localizedPiece(featured, locale);
  const path = '/collection/' + featured.room + '/' + featured.slug;
  return (
    <article className={'product-feature product-feature--' + chapter.mood} data-world={chapter.id}>
      <figure className="product-feature__photograph">
        <Link href={path} aria-label={text.discover + ': ' + product.title} data-testid={'link-world-' + chapter.id}>
          <CataloguePhoto source={chapter.heroImage} alt={chapter.heroAlt} priority />
          <span className="product-feature__photo-link"><ArrowUpRight size={23} strokeWidth={1.5} aria-hidden="true" /></span>
        </Link>
        <figcaption><span>{featured.code}</span><span>{text.featured}</span></figcaption>
      </figure>
      <div className="product-feature__copy">
        <p className="product-eyebrow"><span>{chapter.number}</span> / {labels[locale][index]}</p>
        <h2 id="product-feature-title" lang="en">{chapter.title}</h2>
        <p className="product-feature__description" lang="en">{chapter.description}</p>
        <div className="product-feature__object">
          <span className="product-eyebrow">{text.featured}</span>
          <h3><Link href={path}>{product.title}</Link></h3>
          <p>{product.material}</p><p>{product.form}</p>
          {product.dimensions && <p className="product-feature__dimensions">{product.dimensions}</p>}
          <Link href={path} className="product-text-link" data-testid={'link-featured-' + chapter.id}>{text.discover}<ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <button type="button" className="product-feature__browse" onClick={onBrowse} data-testid={'button-browse-' + chapter.id}>
          {text.browse}<span>{productItemCount(chapter) - 1} <ArrowDown size={16} aria-hidden="true" /></span>
        </button>
      </div>
    </article>
  );
}

export function ProductsPage() {
  const { locale, dir } = useI18n();
  const text = copy[locale];
  const [selected, setSelected] = useState(initialCategory);
  const [query, setQuery] = useState(initialSearch);
  const main = useRef<HTMLElement>(null);
  const categoryBar = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const shelf = useRef<HTMLElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const chapter = productChapters[selected];
  const objects = chapter.pieces.filter(piece => piece.slug !== chapter.featuredSlug);
  const total = productChapters.reduce((sum, item) => sum + productItemCount(item), 0);
  const searchText = searchCopy[locale];
  const normalizedQuery = normalizeSearch(query);
  const matches = chapter.pieces.filter(piece => {
    const product = localizedPiece(piece, locale);
    return normalizeSearch([product.title, product.material, product.form, piece.title, piece.material, piece.code].join(' ')).includes(normalizedQuery);
  });
  const visibleObjects = normalizedQuery ? matches.filter(piece => piece.slug !== chapter.featuredSlug) : objects;
  const featuredMatch = normalizedQuery ? matches.find(piece => piece.slug === chapter.featuredSlug) : undefined;
  const accessoryMatches = productAccessories[chapter.id].filter(accessory =>
    normalizeSearch([accessory.title, accessory.material, accessory.description].join(' ')).includes(normalizedQuery));
  const itemCount = productItemCount(chapter);
  const matchCount = matches.length + accessoryMatches.length;

  useEffect(() => {
    const header = document.querySelector('.site-header');
    const measure = () => {
      if (header) main.current?.style.setProperty('--product-header-height', header.getBoundingClientRect().height + 'px');
      if (categoryBar.current) main.current?.style.setProperty('--product-tabs-height', categoryBar.current.getBoundingClientRect().height + 'px');
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    if (categoryBar.current) observer.observe(categoryBar.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncCategory = (event?: Event) => {
      const space = productChapterFromHash(window.location.hash);
      setSelected(Math.max(0, productChapters.findIndex(item => item.id === space)));
      if (event) setQuery(initialSearch());
      if (space && window.location.hash !== '#' + space) {
        window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search + '#' + space);
      }
    };
    syncCategory();
    window.addEventListener('hashchange', syncCategory);
    window.addEventListener('popstate', syncCategory);
    return () => {
      window.removeEventListener('hashchange', syncCategory);
      window.removeEventListener('popstate', syncCategory);
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('product-object--revealed');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    shelf.current?.querySelectorAll('[data-product-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [selected, normalizedQuery]);

  const updateQuery = (value: string) => {
    setQuery(value);
    window.history.replaceState({ ...window.history.state, stWerkzProductSearch: { category: chapter.id, query: value } }, '', window.location.href);
  };

  const chooseCategory = (index: number) => {
    if (index === selected) return;
    const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
    const alreadyBrowsing = (categoryBar.current?.getBoundingClientRect().top ?? Infinity) <= headerHeight + 1;
    setSelected(index);
    setQuery('');
    const hash = '#' + productChapters[index].id;
    if (window.location.hash !== hash) window.history.pushState({ ...window.history.state, stWerkzProductSearch: { category: productChapters[index].id, query: '' } }, '', window.location.pathname + window.location.search + hash);
    if (alreadyBrowsing) requestAnimationFrame(() => panel.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start',
    }));
  };

  const keyboardCategory = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const backward = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const next = event.key === forward ? (index + 1) % productChapters.length
      : event.key === backward ? (index + productChapters.length - 1) % productChapters.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? productChapters.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    chooseCategory(next);
    tabRefs.current[next]?.focus();
  };

  const browseObjects = () => shelf.current?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  });

  return (
    <SiteChrome>
      <main ref={main} className="products-page" data-story-managed>
        <header className="product-opening">
          <div><p className="product-eyebrow">{text.eyebrow}</p><h1 id="products-title">{text.title}<br /><em>{text.emphasis}</em></h1></div>
          <div className="product-opening__aside"><p>{text.intro}</p><span>{String(total).padStart(2, '0')} {text.objects}</span><button type="button" className="product-opening__browse" onClick={browseObjects} data-testid="button-browse-all-products">{text.browse}<ArrowDown size={14} aria-hidden="true" /></button></div>
        </header>

        <div ref={categoryBar} className="product-category-bar">
          <div className="product-category-tabs" role="tablist" aria-label={text.selected}>
            {productChapters.map((item, index) => (
              <button key={item.id} ref={element => { tabRefs.current[index] = element; }} id={'tab-' + item.id} type="button" role="tab" aria-label={labels[locale][index] + ', ' + productItemCount(item) + ' ' + text.objects} aria-selected={selected === index} aria-controls="product-cabinet-panel" tabIndex={selected === index ? 0 : -1} onClick={() => chooseCategory(index)} onKeyDown={event => keyboardCategory(event, index)} data-testid={'tab-products-' + item.id}>
                <span className="product-category-tabs__number">{item.number}</span><strong><span className="product-category-tabs__full">{labels[locale][index]}</span><span className="product-category-tabs__compact" aria-hidden="true">{index === 2 ? compactLabels[locale] : labels[locale][index]}</span></strong>
                <span className="product-category-tabs__count">{String(productItemCount(item)).padStart(2, '0')} <span>{text.objects}</span></span>
              </button>
            ))}
          </div>
        </div>

        <div ref={panel} id="product-cabinet-panel" role="tabpanel" aria-labelledby={'tab-' + chapter.id} tabIndex={0} className="product-category-panel">
          <FeaturedObject key={chapter.id} chapter={chapter} index={selected} onBrowse={browseObjects} />
          <section id="product-edit" ref={shelf} className="product-shelf" aria-labelledby="product-edit-title">
            <div className="product-shelf__heading">
              <div><p className="product-eyebrow">{chapter.number} / {labels[locale][selected]}</p><h2 id="product-edit-title">{text.shelf}</h2></div>
              <p>{String(itemCount - 1).padStart(2, '0')} {text.objects}<span aria-hidden="true"> / </span><span>{chapter.material}</span></p>
            </div>
            <div className="product-finder">
              <label htmlFor="product-search">{searchText.label}</label>
              <div className="product-finder__row">
                <div className="product-finder__field"><Search size={18} aria-hidden="true" /><input ref={searchInput} id="product-search" type="search" value={query} onChange={event => updateQuery(event.target.value)} placeholder={searchText.placeholder} autoComplete="off" data-testid="input-product-search" />{query && <button type="button" aria-label={searchText.clear} onClick={() => { updateQuery(''); searchInput.current?.focus(); }} data-testid="button-clear-product-search"><X size={18} aria-hidden="true" /></button>}</div>
                <p role="status" aria-live="polite" aria-atomic="true" data-testid="product-search-count">{normalizedQuery ? matchCount + ' / ' + itemCount : itemCount} {text.objects}</p>
              </div>
              {!normalizedQuery && accessoryMatches.length > 0 && <button type="button" className="product-text-link product-finder__additions" onClick={() => main.current?.querySelector('.product-accessories')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })} data-testid="button-browse-product-additions">{additionsLabel[locale]}<span>{accessoryMatches.length}</span><ArrowDown size={16} aria-hidden="true" /></button>}
            </div>
            {featuredMatch && <Link className="product-finder__featured" href={'/collection/' + featuredMatch.room + '/' + featuredMatch.slug} data-testid="product-search-featured"><span>{searchText.featured}</span><strong>{localizedPiece(featuredMatch, locale).title}</strong><ArrowUpRight size={20} aria-hidden="true" /></Link>}
            {normalizedQuery && !matchCount && <div className="product-finder__empty"><p>{searchText.empty}</p><button type="button" className="product-text-link" onClick={() => { updateQuery(''); searchInput.current?.focus(); }} data-testid="button-reset-product-search">{searchText.reset}<MoveRight size={16} aria-hidden="true" /></button></div>}
            <div key={chapter.id} className="product-object-grid">
              {visibleObjects.map((piece, index) => <ProductCard key={piece.slug} piece={piece} index={index} discover={text.discover} />)}
            </div>
            <AccessoryEdit category={chapter.id} accessories={accessoryMatches} />
            <Link href="/collection" className="product-text-link product-shelf__all">{text.all}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </section>
        </div>

        <section className="product-enquiry" aria-labelledby="product-enquiry-title">
          <div><p className="product-eyebrow">ST WERKZ / KARACHI</p><h2 id="product-enquiry-title">{text.close}</h2><p>{text.closeBody}</p></div>
          <MarbleButton href={quoteHref()} variant="dark" data-testid="link-products-enquire">{text.enquiry}</MarbleButton>
        </section>
        <p className="sr-only" role="status" aria-live="polite">{text.selected}: {labels[locale][selected]}. {itemCount} {text.objects}.</p>
      </main>
    </SiteChrome>
  );
}
