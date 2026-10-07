import { studioFaqs } from '@/data/faq';
import { useI18n } from '@/i18n';

export function FaqSection() {
  const { t } = useI18n();
  const faqs = t.faqs.length ? t.faqs : studioFaqs;

  return (
    <section
      id="faq"
      className="scroll-mt-28 border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.atelier.faqKicker}</p>
        <h2 id="faq-title" className="mt-7 max-w-xl font-display text-5xl leading-[.93] sm:text-7xl">
          {t.atelier.faqTitleBefore}<em>{t.atelier.faqTitleEm}</em>
        </h2>
        <p className="mt-8 max-w-lg text-sm leading-7 text-[#f6f3ec]/60">
          {t.atelier.faqIntro}
        </p>
        <dl className="mt-14 divide-y divide-white/12 border-y border-white/12">
          {faqs.map((item, index) => (
            <div key={item.id} className="grid gap-4 py-8 lg:grid-cols-[70px_.9fr_1.1fr] lg:gap-10" data-testid={`faq-${item.id}`}>
              <span className="font-monoish text-[9px] text-[#f6f3ec]/40">{String(index + 1).padStart(2, '0')}</span>
              <dt className="font-display text-2xl leading-tight sm:text-3xl">{item.question}</dt>
              <dd className="speakable max-w-xl text-sm leading-7 text-[#f6f3ec]/62">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
