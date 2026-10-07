import { useI18n } from '@/i18n';

const ADREVNVIEW_URL = 'https://adrevnview.com';

export function PoweredByCredit() {
  const { t } = useI18n();
  return (
    <p className="text-[10px] uppercase tracking-[.16em]" data-testid="text-footer-powered-by">
      {t.chrome.poweredBy}{' '}
      <a
        href={ADREVNVIEW_URL}
        className="line-link"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="link-footer-powered-by"
      >
        adrevnview.com
      </a>
    </p>
  );
}
