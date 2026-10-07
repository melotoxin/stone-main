import { useI18n } from '@/i18n';

export function AeoHowTo() {
  const { t } = useI18n();

  return (
    <section id="how-to-view" className="scroll-mt-28 border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16" aria-labelledby="howto-title">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.enquire.howKicker}</p>
          <h2 id="howto-title" className="mt-7 max-w-sm font-display text-5xl leading-[.93] sm:text-7xl">
            {t.enquire.howTitleBefore}<em>{t.enquire.howTitleEm}</em>
          </h2>
        </div>
        <ol className="divide-y divide-white/12 border-y border-white/12">
          {t.enquire.steps.map((step) => (
            <li key={step.number} className="grid gap-4 py-7 sm:grid-cols-[70px_1fr] sm:items-start" data-testid={`howto-step-${step.number}`}>
              <span className="font-monoish text-[9px] text-[#f6f3ec]/40">{step.number}</span>
              <div>
                <h3 className="font-display text-3xl leading-[1.05]">{step.name}</h3>
                <p className="speakable mt-4 max-w-xl text-sm leading-7 text-[#f6f3ec]/62">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
