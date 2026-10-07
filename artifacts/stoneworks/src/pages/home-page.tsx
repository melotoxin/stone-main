import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { MarbleButton } from "@/components/ui/MarbleButton";
import { StoneBenefitIcon } from "@/components/ui/StoneBenefitIcon";
import { pieces, studio } from "@/data/gallery";
import { editorialMedia } from "@/data/editorial-media";
import { pakistanStones, stonePatternSrc } from "@/data/pakistan-stones";
import { localizedPiece, useI18n } from "@/i18n";
import "@/styles/home-refinements.css";
import { getB2BCopy, SHOW_PRICING, quoteHref } from "@/data/b2b";

const heroImage = "/design/reference/vanity-1953.webp";
const productTeasers = [
  { id: "kitchen", slug: "scalloped-onyx-bowl", image: editorialMedia.home.kitchen, width: 735, height: 919 },
  { id: "washroom", slug: "portoro-cylinder-cup", image: editorialMedia.home.washroom, width: 500, height: 500 },
  { id: "home-decor", slug: "onyx-chess-casket", image: editorialMedia.home.decor, width: 736, height: 981 },
] as const;
const homeStoneIds = ["mastung-cream", "honey-onyx", "pak-black"];
const homeStones = homeStoneIds.map(id => pakistanStones.find(stone => stone.id === id)!);
const productsCopy = {
  en: {
    label: "Products", title: "A world of stone. Made for living.", cta: "Enter the world of stone",
    categories: ["Kitchen accessories", "Washroom accessories", "Room & home decor accessories"],
    descriptions: ["Bowls and trays for the rituals of the table.", "Stone objects for a quieter daily ritual.", "Sculptural vessels and accents for rooms that feel like home."],
  },
  es: {
    label: "Productos", title: "Un mundo de piedra. Hecho para vivir.", cta: "Entra al mundo de la piedra",
    categories: ["Accesorios de cocina", "Accesorios de baño", "Accesorios y decoración para el hogar"],
    descriptions: ["Cuencos y bandejas para los rituales de la mesa.", "Objetos de piedra para un ritual cotidiano sereno.", "Recipientes escultóricos y detalles para espacios que se sienten como hogar."],
  },
  it: {
    label: "Prodotti", title: "Un mondo di pietra. Da vivere.", cta: "Entra nel mondo della pietra",
    categories: ["Accessori per la cucina", "Accessori per il bagno", "Accessori e decorazioni per la casa"],
    descriptions: ["Ciotole e vassoi per i rituali della tavola.", "Oggetti in pietra per un rituale quotidiano più sereno.", "Vasi scultorei e dettagli per ambienti che sanno di casa."],
  },
  fr: {
    label: "Produits", title: "Un monde de pierre. Pour la vie.", cta: "Entrez dans le monde de la pierre",
    categories: ["Accessoires de cuisine", "Accessoires de salle de bain", "Accessoires et décoration pour la maison"],
    descriptions: ["Bols et plateaux pour les rituels de la table.", "Des objets en pierre pour un quotidien plus serein.", "Des vases sculpturaux et des accents pour des pièces où l’on se sent chez soi."],
  },
  ar: {
    label: "المنتجات", title: "عالم من الحجر. صُنع للحياة.", cta: "ادخل عالم الحجر",
    categories: ["إكسسوارات المطبخ", "إكسسوارات الحمام", "إكسسوارات الغرف والديكور المنزلي"],
    descriptions: ["أوعية وصوانٍ لطقوس المائدة.", "قطع حجرية لطقوس يومية أكثر هدوءاً.", "أوعية منحوتة ولمسات تضفي على الغرف دفء المنزل."],
  },
  ur: {
    label: "مصنوعات", title: "پتھر کی ایک دنیا۔ زندگی کے لیے۔", cta: "پتھر کی دنیا میں داخل ہوں",
    categories: ["باورچی خانے کے لوازمات", "غسل خانے کے لوازمات", "کمرے اور گھر کی سجاوٹ کے لوازمات"],
    descriptions: ["میز کی روزمرہ رسومات کے لیے پیالے اور ٹرے۔", "پرسکون روزمرہ کے لیے پتھر کی اشیا۔", "نفیس گلدان اور آرائشی اشیا جو کمروں کو گھر جیسا سکون دیں۔"],
  },
  ru: {
    label: "Изделия", title: "Мир камня. Создан для жизни.", cta: "Войдите в мир камня",
    categories: ["Аксессуары для кухни", "Аксессуары для ванной", "Аксессуары и декор для дома"],
    descriptions: ["Чаши и подносы для ритуалов за столом.", "Каменные предметы для спокойных повседневных ритуалов.", "Скульптурные вазы и акценты, наполняющие комнаты домашним уютом."],
  },
} as const;
const featureLinks = ["/architects", "/atelier", "/export", "/enquire"];
export function HomePage() {
  const { locale, dir, t } = useI18n();
  const copy = t.luxuryHome;
  const productCopy = productsCopy[locale];
  const b2bCopy = getB2BCopy(locale);
  const [selectedSpace, setSelectedSpace] = useState(0);
  const [selectedStone, setSelectedStone] = useState(0);
  const teaser = productTeasers[selectedSpace];
  const featured = localizedPiece(pieces.find(piece => piece.slug === teaser.slug)!, locale);
  const living = localizedPiece(pieces.find(piece => piece.slug === "travertine-walnut-coffee")!, locale);
  const stone = homeStones[selectedStone];
  const sampleHref = `/enquire?${new URLSearchParams({ intent: "sample", brief: copy.sampleBrief })}`;

  return (
    <SiteChrome>
      <main id="top" className="luxury-home">
        <section className="luxury-hero" aria-labelledby="hero-title">
          <div className="luxury-hero__photograph">
            <img
              src={heroImage}
              srcSet="/design/reference/vanity-768.webp 768w, /design/reference/vanity-1440.webp 1440w, /design/reference/vanity-1953.webp 1953w"
              sizes="100vw"
              width={1953}
              height={805}
              alt={copy.heroAlt}
              fetchPriority="high"
              decoding="async"
              data-testid="img-hero-stone"
            />
          </div>
          <div className="luxury-hero__blend" aria-hidden="true" />
          <div className="luxury-hero__content">
            <p className="luxury-eyebrow reveal">
              {copy.workWithUs}
              <span aria-hidden="true" />
            </p>
            <h1 id="hero-title" className="reveal reveal-delay-1">
              <span>{copy.heroLines[0]}</span> <span>{copy.heroLines[1]}</span>
            </h1>
            <p className="luxury-hero__body reveal reveal-delay-2">
              {copy.heroBody}
            </p>
            <div className="luxury-actions reveal reveal-delay-3">
              <MarbleButton
                href={quoteHref()}
                variant="light"
                data-testid="link-hero-contact"
              >
                {b2bCopy.inquireForQuote}
              </MarbleButton>
              <MarbleButton
                href={sampleHref}
                variant="dark"
                arrow={false}
                data-testid="link-hero-sample"
              >
                {copy.sample}
              </MarbleButton>
            </div>
            {SHOW_PRICING && (
              <Link
                href="/estimate"
                className="editorial-link mt-6"
                data-testid="link-hero-estimate"
              >
                {t.home.studioEstimate}
                <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
          <div className="luxury-benefits">
            {copy.benefits.map(([title, subtitle], index) => {
              return (
                <Link
                  href={featureLinks[index]}
                  key={title}
                  className="luxury-benefit"
                  data-testid={`link-benefit-${index}`}
                >
                  <StoneBenefitIcon index={index} width={64} height={64} />
                  <span>
                    <span className="luxury-benefit__title">{title}</span>
                    <span className="luxury-benefit__subtitle">{subtitle}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="projects" className="home-lookbook" aria-labelledby="products-teaser-title">
          <div className="home-lookbook__heading">
            <p className="luxury-eyebrow">01 / {productCopy.label}</p>
            <h2 id="products-teaser-title">{productCopy.title}</h2>
            <Link href="/products" className="editorial-link" data-testid="link-home-products">{productCopy.cta}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className="home-lookbook__body">
            <div className="home-lookbook__tabs" role="tablist" aria-label={productCopy.label}>
              {productTeasers.map((item, index) => <button key={item.id} type="button" role="tab" id={`home-space-${item.id}`} aria-selected={selectedSpace === index} aria-controls="home-space-panel" tabIndex={selectedSpace === index ? 0 : -1} onClick={() => setSelectedSpace(index)} onKeyDown={event => {
                const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
                const backward = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
                const next = event.key === forward || event.key === 'ArrowDown' ? (index + 1) % 3 : event.key === backward || event.key === 'ArrowUp' ? (index + 2) % 3 : event.key === 'Home' ? 0 : event.key === 'End' ? 2 : -1;
                if (next < 0) return;
                event.preventDefault(); setSelectedSpace(next); document.getElementById(`home-space-${productTeasers[next].id}`)?.focus();
              }} data-testid={`tab-home-${item.id}`}><span className="home-lookbook__number">0{index + 1}</span><span><strong>{productCopy.categories[index]}</strong><span>{productCopy.descriptions[index]}</span></span><ArrowUpRight size={23} aria-hidden="true" /></button>)}
            </div>
            <article key={teaser.id} id="home-space-panel" role="tabpanel" aria-labelledby={`home-space-${teaser.id}`} className={`home-lookbook__object home-lookbook__object--${teaser.id}`}>
              <Link href={`/collection/${featured.room}/${featured.slug}`} className="home-lookbook__photo" data-testid="link-home-featured-object"><img src={teaser.image} width={teaser.width} height={teaser.height} alt={t.seo.pieceAlt(featured.title, featured.material)} loading="lazy" decoding="async" /><span className="home-lookbook__photo-label">{featured.code}<ArrowUpRight size={20} aria-hidden="true" /></span></Link>
              <div className="home-lookbook__caption"><div><h3>{featured.title}</h3><p>{featured.material}</p></div><Link href={`/products#${teaser.id}`} className="editorial-link" data-testid={`link-home-products-${teaser.id}`}>{locale === 'en' ? 'Explore this space' : productCopy.cta}<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
            </article>
          </div>
          <div className="home-lookbook__all-spaces">{productTeasers.map((item,index) => <Link key={item.id} href={`/products#${item.id}`} data-testid={`link-home-category-${item.id}`}>{productCopy.categories[index]}<ArrowUpRight size={13} aria-hidden="true" /></Link>)}</div>
        </section>

        <section className="home-material-desk" aria-labelledby="home-material-title">
          <div className="home-material-desk__copy"><p className="luxury-eyebrow">02 / {copy.collections}</p><h2 id="home-material-title">{copy.sampleTitle}</h2><p>{copy.sampleBody}</p><div className="home-material-desk__actions"><MarbleButton href={sampleHref} variant="dark" data-testid="link-home-sample">{copy.sample}</MarbleButton><Link href="/collection" className="editorial-link" data-testid="link-hero-collection">{t.home.enterCollection}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
          <div className="home-material-desk__palette"><div className="home-material-desk__swatches" role="group" aria-label={copy.selectedMaterial}>{homeStones.map((item,index) => <button key={item.id} type="button" onClick={() => setSelectedStone(index)} aria-pressed={index === selectedStone} aria-label={item.name} style={{ '--swatch-index': index } as import('react').CSSProperties} data-testid={`button-home-stone-${item.id}`}><img src={stonePatternSrc(item)} alt={item.name} width={500} height={600} loading="lazy" decoding="async" /><span>{item.name}</span></button>)}</div><div className="home-material-desk__selection" aria-live="polite"><span>{copy.selectedMaterial}</span><h3>{stone.name}</h3><p>{t.stonesIndex.families[stone.family]} · {stone.colour}</p><Link href={`/stones#${stone.id}`} className="editorial-link">{copy.viewMaterial}<ArrowUpRight size={16} aria-hidden="true" /></Link></div></div>
        </section>

        <section id="about" className="home-studio-note" aria-labelledby="home-about-title">
          <figure className="home-studio-note__photo"><img src={editorialMedia.home.living} alt={t.seo.pieceAlt(living.title,living.material)} width={736} height={736} loading="lazy" decoding="async" /><figcaption><span>{living.code}</span>{living.title}</figcaption></figure>
          <div className="home-studio-note__copy"><p className="luxury-eyebrow">03 / {copy.craftKicker}</p><h2 id="home-about-title">{copy.craftLines[0]}<br /><em>{copy.craftLines[1]}</em></h2><p>{copy.craftBody}</p><div className="home-studio-note__links"><Link href="/atelier" className="editorial-link">{t.chrome.atelier}<ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/about" className="editorial-link" data-testid="link-home-about">{t.home.aboutCta}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
        </section>

        <section id="contact" className="home-concierge" aria-labelledby="contact-title">
          <div className="home-concierge__invitation"><p className="luxury-eyebrow">04 / {copy.workWithUs}</p><h2 id="contact-title">{copy.resourcesTitle}</h2><p>{copy.heroBody}</p><MarbleButton href={quoteHref()} variant="light" data-testid="link-home-enquire">{b2bCopy.inquireForQuote}</MarbleButton><a href={studio.phoneHref} className="home-concierge__phone">{studio.phoneDisplay}<ArrowUpRight size={15} aria-hidden="true" /></a></div>
          <div className="home-concierge__paths"><p className="luxury-eyebrow">{copy.resources}</p><Link href="/architects"><span><strong>{t.chrome.architects}</strong><span>{copy.resourceItems[0]} · {copy.resourceItems[1]}</span></span><ArrowUpRight size={24} aria-hidden="true" /></Link><Link href="/interiors"><span><strong>{t.chrome.interiorDesign}</strong><span>{copy.resourceItems[2]} · {copy.resourceItems[3]}</span></span><ArrowUpRight size={24} aria-hidden="true" /></Link><Link href="/export"><span><strong>{t.chrome.wholesalers}</strong><span>{t.chrome.stones}</span></span><ArrowUpRight size={24} aria-hidden="true" /></Link><Link href="/atelier#faq" className="home-concierge__faq" data-testid="link-home-faq">{t.home.questionsLink}<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        </section>
      </main>
    </SiteChrome>
  );
}
