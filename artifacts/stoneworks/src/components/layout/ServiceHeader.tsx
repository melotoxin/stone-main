import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Link, useSearch } from 'wouter';
import { StoneworksMark } from '@/components/brand/StoneworksMark';
import { MarbleButton } from '@/components/ui/MarbleButton';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { audienceItems } from '@/components/layout/audience-links';
import { LanguageSwitcher, useI18n } from '@/i18n';
import '@/styles/service-header.css';

const productsLabel = {
  en: 'Products', es: 'Productos', it: 'Prodotti', fr: 'Produits',
  ar: 'المنتجات', ur: 'مصنوعات', ru: 'Изделия',
} as const;

const skipLabel = {
  en: 'Skip to content', es: 'Saltar al contenido', it: 'Vai al contenuto',
  fr: 'Aller au contenu', ar: 'التخطي إلى المحتوى', ur: 'مواد پر جائیں',
  ru: 'Перейти к содержимому',
} as const;

type ServiceHeaderProps = {
  kind: 'trade' | 'export';
  contactHref: string;
  contactLabel: string;
  mobileContactLabel: string;
  navLabel?: string;
};

/** A shared service navigation with room for the photographs and every route. */
export function ServiceHeader({ kind, contactHref, contactLabel, mobileContactLabel, navLabel }: ServiceHeaderProps) {
  const { locale, barePath, t } = useI18n();
  const search = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeMenu = () => setMenuOpen(false);
  // MarbleButton uses the locale-aware router; include this page for hash links.
  const enquiryHref = contactHref.startsWith('#') ? `${barePath}${search ? `?${search}` : ''}${contactHref}` : contactHref;
  const items = [
    { href: '/products', label: productsLabel[locale], testId: `link-${kind}-products` },
    ...audienceItems(t.chrome),
  ];

  useEffect(() => setMenuOpen(false), [barePath, locale]);
  useEffect(() => {
    const header = headerRef.current;
    const page = header?.closest<HTMLElement>('.trade-page, .export-page');
    if (!header || !page) return;
    const measure = () => page.style.setProperty('--service-header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return <>
    <a href="#service-content" className="service-skip">{skipLabel[locale]}</a>
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
      <header ref={headerRef} className="site-header service-header" data-testid="service-header">
        <nav className="service-header__nav" aria-label={navLabel ?? t.chrome.primaryNav}>
          <Link href="/" className="service-header__brand" aria-label={t.chrome.homeAria} data-testid={`link-${kind}-brand`}>
            <StoneworksMark variant="onDark" markSize={40} />
          </Link>
          <div className="service-header__links">
            {items.map(item => <Link key={item.href} href={item.href} className="service-header__link" data-testid={item.testId} aria-current={barePath === item.href ? 'page' : undefined}>{item.label}</Link>)}
          </div>
          <div className="service-header__actions">
            <LanguageSwitcher variant="header" />
            <MarbleButton variant="light" compact arrow={false} href={enquiryHref} className="service-header__contact service-header__contact--desktop" data-testid={`link-${kind}-contact-nav`}>{contactLabel}</MarbleButton>
            <MarbleButton variant="light" compact arrow={false} href={enquiryHref} className="service-header__contact service-header__contact--mobile" data-testid={`link-${kind}-contact-mobile`}>{mobileContactLabel}</MarbleButton>
            <DialogTrigger asChild>
              <button type="button" className="service-header__menu" aria-label={t.chrome.openMenu} aria-expanded={menuOpen} aria-controls="service-menu" data-testid="button-service-menu"><Menu size={23} strokeWidth={1.5} aria-hidden="true" /></button>
            </DialogTrigger>
          </div>
        </nav>
      </header>
      <DialogContent id="service-menu" className="service-menu" aria-describedby={undefined}>
        <DialogTitle className="service-menu__title">St Werkz</DialogTitle>
        <nav className="service-menu__links" aria-label={navLabel ?? t.chrome.primaryNav}>
          {items.map(item => <Link key={item.href} href={item.href} onClick={closeMenu} data-testid={item.href === '/products' ? `link-${kind}-products-mobile` : `link-service-mobile-${item.testId.replace('link-nav-', '')}`} aria-current={barePath === item.href ? 'page' : undefined}><span>{item.label}</span><ArrowUpRight size={19} aria-hidden="true" /></Link>)}
        </nav>
        <MarbleButton variant="light" compact href={enquiryHref} onClick={closeMenu} className="service-menu__contact" data-testid={`link-${kind}-contact-menu`}>{contactLabel}</MarbleButton>
        <div className="service-menu__languages"><LanguageSwitcher variant="menu" /></div>
      </DialogContent>
    </Dialog>
  </>;
}
