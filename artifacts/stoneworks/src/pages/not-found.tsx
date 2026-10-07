import { Link } from 'wouter';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { useI18n } from '@/i18n';

export default function NotFound() {
  const { t } = useI18n();

  return (
    <SiteChrome>
      <main className="mx-auto max-w-xl px-6 py-40 text-center">
        <p className="font-monoish text-[10px] text-[#f6f3ec]/45">404</p>
        <h1 className="mt-6 font-display text-5xl leading-[.9] tracking-[-.03em] sm:text-6xl">
          {t.notFound.title}
        </h1>
        <p className="mt-6 text-sm leading-7 text-[#f6f3ec]/60">
          {t.notFound.body}
        </p>
        <Link href="/collection" className="mt-10 inline-block text-[10px] uppercase tracking-[.2em]">
          {t.notFound.cta}
        </Link>
      </main>
    </SiteChrome>
  );
}
