import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { StoneworksMark } from "@/components/brand/StoneworksMark";
import { CollectionSearch } from "@/components/layout/CollectionSearch";
import { MarbleButton } from "@/components/ui/MarbleButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { audienceItems } from "@/components/layout/audience-links";
import { OfficesList } from "@/components/layout/OfficesList";
import { PoweredByCredit } from "@/components/layout/PoweredByCredit";
import { DocumentMeta } from "@/components/seo/DocumentMeta";
import { studio } from "@/data/gallery";
import { LanguageSwitcher, LocaleHint, useI18n } from "@/i18n";
import { documentMetaForPath } from "@/lib/page-meta";
import "@/styles/site-refinements.css";
import {
  getB2BCopy,
  usaOffice,
  usaOfficeAddress,
  usaOfficeEmail,
  SHOW_PRICING,
  quoteHref,
} from "@/data/b2b";

const productsNavLabel = {
  en: "Products",
  es: "Productos",
  it: "Prodotti",
  fr: "Produits",
  ar: "المنتجات",
  ur: "مصنوعات",
  ru: "Изделия",
} as const;

export function SiteChrome({
  children,
}: {
  children: ReactNode;
  variant?: "onLight" | "onDark";
}) {
  const { locale, barePath, t } = useI18n();
  const b2bCopy = getB2BCopy(locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 35);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => setMenuOpen(false), [barePath, locale]);
  const closeMenu = () => setMenuOpen(false);
  const audienceNav = audienceItems(t.chrome);
  const studioNav = [
    {
      href: "/collection",
      label: t.chrome.collection,
      testId: "link-collection",
    },
    { href: "/atelier", label: t.chrome.atelier, testId: "link-atelier" },
    ...(SHOW_PRICING
      ? [
          {
            href: "/estimate",
            label: t.chrome.estimate,
            testId: "link-estimate",
          },
        ]
      : []),
    { href: "/enquire", label: t.chrome.enquire, testId: "link-enquire-nav" },
  ];

  return (
    <div className="site-shell min-h-[var(--vvh,100dvh)] text-[#f3eee5]" data-page={barePath === "/" ? "home" : "interior"}>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-[#f6f3ec] focus:px-4 focus:py-2 focus:text-sm focus:text-[#0c0c0c]"
      >
        {t.chrome.skip}
      </a>
      <header
        className={`site-header luxury-header ${scrolled || barePath !== "/" ? "luxury-header--solid" : ""}`}
      >
        <nav className="luxury-nav" aria-label={t.chrome.primaryNav}>
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center"
            data-testid="link-brand"
            aria-label={t.chrome.homeAria}
          >
            <StoneworksMark variant="onDark" markSize={64} />
          </Link>
          <div className="luxury-nav__links">
            <Link
              href="/collection"
              className="line-link"
              data-testid="link-nav-collection"
              aria-current={
                barePath.startsWith("/collection") ? "page" : undefined
              }
            >
              {t.luxuryHome.collections}
            </Link>
            <Link
              href="/products"
              className="line-link"
              data-testid="link-nav-products"
              aria-current={barePath === "/products" ? "page" : undefined}
            >
              {productsNavLabel[locale]}
            </Link>
            <Link
              href="/architects"
              className="line-link"
              data-testid="link-nav-architects"
              aria-current={barePath === "/architects" ? "page" : undefined}
            >
              {t.chrome.architects}
            </Link>
            <Link
              href="/about"
              className="line-link"
              data-testid="link-nav-about"
              aria-current={barePath === "/about" ? "page" : undefined}
            >
              {t.chrome.about}
            </Link>
            {barePath !== "/" && <Link
              href="/export"
              className="line-link luxury-nav__wholesale"
              data-testid="link-nav-export"
              aria-current={barePath === "/export" ? "page" : undefined}
            >
              {t.chrome.wholesalers}
            </Link>}
          </div>
          <div className="luxury-nav__actions">
            <div className="site-search-affordance">
              <CollectionSearch />
              <span aria-hidden="true">{t.luxuryHome.search}</span>
            </div>
            <LanguageSwitcher variant="header" />
            <MarbleButton
              href={quoteHref()}
              variant="dark"
              compact
              arrow={false}
              className="luxury-nav__quote"
              data-testid="link-header-enquire"
            >
              {b2bCopy.inquireForQuote}
            </MarbleButton>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="luxury-nav__menu"
              aria-label={menuOpen ? t.chrome.closeMenu : t.chrome.openMenu}
              aria-expanded={menuOpen}
              aria-controls="studio-menu"
              data-testid="button-mobile-menu"
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>
        <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
          <DialogContent
            id="studio-menu"
            className="studio-menu"
            aria-describedby={undefined}
          >
            <DialogTitle className="font-display text-3xl">
              St Werkz
            </DialogTitle>
            <div className="studio-menu__primary">
              <Link href="/products" onClick={closeMenu} data-testid="link-mobile-products" aria-current={barePath === "/products" ? "page" : undefined}>
                {productsNavLabel[locale]} <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
              <Link href="/collection" onClick={closeMenu} data-testid="link-mobile-collection" aria-current={barePath.startsWith("/collection") ? "page" : undefined}>
                {t.chrome.collection} <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
              <Link href="/about" onClick={closeMenu} data-testid="link-mobile-about" aria-current={barePath === "/about" ? "page" : undefined}>
                {t.chrome.about} <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
              <Link href="/atelier" onClick={closeMenu} data-testid="link-mobile-atelier" aria-current={barePath === "/atelier" ? "page" : undefined}>
                {t.chrome.atelier} <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            </div>
            <div className="studio-menu__secondary">
              {audienceNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  data-testid={`link-mobile-${item.testId.replace("link-nav-", "")}`}
                  aria-current={barePath === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              {studioNav.filter((item) => item.href !== "/collection" && item.href !== "/atelier").map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  data-testid={`link-mobile-${item.testId.replace("link-", "")}`}
                  aria-current={barePath === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/retailers"
                onClick={closeMenu}
                data-testid="link-mobile-retailers"
                aria-current={barePath === "/retailers" ? "page" : undefined}
              >
                {t.chrome.forRetailers}
              </Link>
              <Link
                href="/stones"
                onClick={closeMenu}
                data-testid="link-mobile-stones"
                aria-current={barePath === "/stones" ? "page" : undefined}
              >
                {t.chrome.stones}
              </Link>
            </div>
            <div className="studio-menu__contact">
              <a href={studio.emailHref}>{studio.email}</a>
              <a href={studio.phoneHref}>{studio.phoneDisplay}</a>
            </div>
            <div className="studio-menu__languages"><LanguageSwitcher variant="menu" /></div>
          </DialogContent>
        </Dialog>
      </header>
      <DocumentMeta {...documentMetaForPath(barePath, locale)} />
      <div id="content" tabIndex={-1}>
        {children}
      </div>
      <LocaleHint />
      <footer
        className="site-footer"
        role="contentinfo"
      >
        <div className="site-footer__main">
          <Link href="/" className="self-start" data-testid="link-footer-brand">
            <StoneworksMark variant="onDark" markSize={40} />
          </Link>
          <div className="site-footer__contacts">
            <address>
              <p data-testid="text-footer-brand">{b2bCopy.headOffice}</p>
              <p>{studio.address}</p>
              <a
                href={studio.phoneHref}
                className="line-link self-start"
                data-testid="link-footer-phone"
              >
                {studio.phoneDisplay}
              </a>
              <a
                href={studio.emailHref}
                className="line-link self-start"
                data-testid="link-footer-email"
              >
                {studio.email}
              </a>
            </address>
            <address>
              <p className="text-[#f6f3ec]">{b2bCopy.usaOffice}</p>
              <p>{usaOfficeAddress()}</p>
              {usaOffice.phoneHref ? (
                <a href={usaOffice.phoneHref} className="line-link self-start">
                  {usaOffice.phoneDisplay}
                </a>
              ) : (
                <p>{b2bCopy.comingSoon}</p>
              )}
              <a href={usaOfficeEmail().href} className="line-link self-start">
                {usaOfficeEmail().display}
              </a>
            </address>
          </div>
          <nav className="site-footer__nav" aria-label={t.chrome.primaryNav}>
            <Link
              href="/about"
              className="line-link"
              data-testid="link-footer-about"
            >
              {t.chrome.about}
            </Link>
            <Link href="/collection" className="line-link">
              {t.chrome.collection}
            </Link>
            <Link href="/products" className="line-link" data-testid="link-footer-products">
              {productsNavLabel[locale]}
            </Link>
            <Link href="/atelier" className="line-link">
              {t.chrome.atelier}
            </Link>
            <Link
              href="/atelier#faq"
              className="line-link"
              data-testid="link-footer-faq"
            >
              {t.chrome.questions}
            </Link>
            {SHOW_PRICING && (
              <Link
                href="/estimate"
                className="line-link"
                data-testid="link-footer-estimate"
              >
                {t.chrome.estimate}
              </Link>
            )}
            <Link href="/enquire" className="line-link">
              {t.chrome.enquire}
            </Link>
            <Link
              href="/retail"
              className="line-link"
              data-testid="link-footer-retail"
            >
              {t.chrome.retailStore}
            </Link>
            <Link
              href="/architects"
              className="line-link"
              data-testid="link-architects"
            >
              {t.chrome.architect}
            </Link>
            <Link
              href="/interiors"
              className="line-link"
              data-testid="link-footer-interiors"
            >
              {t.chrome.interiorDesign}
            </Link>
            <Link
              href="/export"
              className="line-link"
              data-testid="link-export"
            >
              {t.chrome.wholesalers}
            </Link>
            <Link
              href="/retailers"
              className="line-link"
              data-testid="link-retailers"
            >
              {t.chrome.retailers}
            </Link>
            <Link
              href="/stones"
              className="line-link"
              data-testid="link-stones"
            >
              {t.chrome.stones}
            </Link>
          </nav>
        </div>
        <details className="site-footer__desks">
          <summary>{t.offices.headingLong}<ChevronDown size={16} aria-hidden="true" /></summary>
          <OfficesList variant="footer" />
        </details>
        <div className="site-footer__bottom">
          <LanguageSwitcher variant="footer" />
          <PoweredByCredit />
        </div>
      </footer>
    </div>
  );
}
