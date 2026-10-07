import { Link, useLocation } from 'wouter';
import { audienceItems } from '@/components/layout/audience-links';
import { useI18n } from '@/i18n';

function isActive(location: string, href: string) {
  if (href === '/') return location === '/';
  return location === href || location.startsWith(`${href}/`);
}

export function AudienceNav({
  tone = 'ink',
  onNavigate,
}: {
  tone?: 'ink' | 'light';
  onNavigate?: () => void;
}) {
  const [location] = useLocation();
  const { t } = useI18n();
  const muted = tone === 'light' ? 'text-white/70 hover:text-white' : 'opacity-70 hover:opacity-100';
  const current = tone === 'light' ? 'text-white' : 'opacity-100';

  return (
    <>
      {audienceItems(t.chrome).map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={`line-link ${isActive(location, item.href) ? current : muted}`}
          data-testid={item.testId}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
