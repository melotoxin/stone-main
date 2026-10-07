import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearch } from 'wouter';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Mail, MapPin, Pencil, Phone } from 'lucide-react';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { AeoHowTo } from '@/components/seo/AeoHowTo';
import { readPersistedBrief } from '@/data/estimate';
import { pieces, studio } from '@/data/gallery';
import { localizedPiece, useI18n } from '@/i18n';
import { SHOW_PRICING } from '@/data/b2b';
import '@/styles/enquire-refinements.css';

const EMAIL_BRIEF_COPY = {
  en: { prepare: 'Prepare my brief', title: 'Your brief is ready.', body: 'Open your email app to send your brief to our studio. Nothing is sent until you confirm there.', open: 'Open email app', edit: 'Review and edit', hint: 'Prepare your message here, then send it from your email app.', subject: 'ST WERKZ studio enquiry', quote: (name: string, article: string) => `I would like to request a quote for ${name} (${article}).` },
  es: { prepare: 'Preparar mi consulta', title: 'Tu consulta está lista.', body: 'Abre tu aplicación de correo para enviar la consulta al estudio. No se envía nada hasta que confirmes allí.', open: 'Abrir el correo', edit: 'Revisar y editar', hint: 'Prepara tu mensaje aquí y envíalo desde tu aplicación de correo.', subject: 'Consulta al estudio ST WERKZ', quote: (name: string, article: string) => `Quisiera solicitar un presupuesto para ${name} (${article}).` },
  it: { prepare: 'Prepara la richiesta', title: 'La tua richiesta è pronta.', body: 'Apri la tua app di posta per inviare la richiesta allo studio. Nulla viene inviato finché non confermi lì.', open: 'Apri la posta', edit: 'Rivedi e modifica', hint: 'Prepara qui il messaggio e invialo dalla tua app di posta.', subject: 'Richiesta allo studio ST WERKZ', quote: (name: string, article: string) => `Vorrei richiedere un preventivo per ${name} (${article}).` },
  fr: { prepare: 'Préparer ma demande', title: 'Votre demande est prête.', body: 'Ouvrez votre messagerie pour envoyer la demande à notre atelier. Rien ne sera envoyé avant votre confirmation dans la messagerie.', open: 'Ouvrir la messagerie', edit: 'Relire et modifier', hint: 'Préparez votre message ici, puis envoyez-le depuis votre messagerie.', subject: 'Demande à l’atelier ST WERKZ', quote: (name: string, article: string) => `Je souhaite demander un devis pour ${name} (${article}).` },
  ar: { prepare: 'إعداد طلبي', title: 'طلبك جاهز.', body: 'افتح تطبيق البريد لإرسال طلبك إلى الاستوديو. لن يُرسل شيء حتى تؤكد الإرسال هناك.', open: 'فتح تطبيق البريد', edit: 'مراجعة وتعديل', hint: 'أعد رسالتك هنا، ثم أرسلها من تطبيق البريد.', subject: 'استفسار إلى استوديو ST WERKZ', quote: (name: string, article: string) => `أود طلب عرض سعر لـ ${name} (${article}).` },
  ur: { prepare: 'میری درخواست تیار کریں', title: 'آپ کی درخواست تیار ہے۔', body: 'اپنے ای میل ایپ میں درخواست کھول کر اسٹوڈیو کو بھیجیں۔ وہاں تصدیق کرنے تک کچھ بھی نہیں بھیجا جاتا۔', open: 'ای میل ایپ کھولیں', edit: 'دیکھیں اور ترمیم کریں', hint: 'یہاں پیغام تیار کریں، پھر اپنی ای میل ایپ سے بھیجیں۔', subject: 'ST WERKZ اسٹوڈیو کے لیے درخواست', quote: (name: string, article: string) => `میں ${name} (${article}) کے لیے قیمت کی درخواست کرنا چاہتا ہوں۔` },
  ru: { prepare: 'Подготовить запрос', title: 'Ваш запрос готов.', body: 'Откройте почтовое приложение, чтобы отправить запрос в студию. Ничего не отправляется, пока вы не подтвердите отправку там.', open: 'Открыть почту', edit: 'Проверить и изменить', hint: 'Подготовьте сообщение здесь, затем отправьте его из почтового приложения.', subject: 'Запрос в студию ST WERKZ', quote: (name: string, article: string) => `Я хотел бы запросить предложение для ${name} (${article}).` },
} as const;

export function EnquirePage() {
  const search = useSearch();
  const { locale, t } = useI18n();
  const emailCopy = EMAIL_BRIEF_COPY[locale];
  const { work, fromEstimate, message, range, quoteArticle, quoteName } = useMemo(() => {
    const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
    const workSlug = params.get('work') ?? '';
    const workMatch = pieces.find((piece) => piece.slug === workSlug);
    const fromEstimate = params.get('from') === 'estimate';
    const isQuote = params.get('intent') === 'quote';
    const quoteArticle = params.get('article');
    const quoteName = params.get('name');
    const stored = fromEstimate ? readPersistedBrief() : null;
    const brief = params.get('brief') || stored?.brief || '';
    const range = stored?.range ?? '';
    const localWork = workMatch ? localizedPiece(workMatch, locale) : undefined;
    
    let defaultMessage = '';
    if (isQuote && quoteArticle && quoteName) {
      defaultMessage = emailCopy.quote(quoteName, quoteArticle);
    } else if (localWork) {
      defaultMessage = t.enquire.viewingOf(localWork.title);
    }
    
    const message = brief || defaultMessage;
    return { work: localWork, fromEstimate, message, range, quoteArticle, quoteName };
  }, [search, locale, t, emailCopy]);

  const [draft, setDraft] = useState({ name: '', email: '', message });
  const [prepared, setPrepared] = useState<{ subject: string; body: string; href: string } | null>(null);
  const previousContext = useRef({ search, message });
  const preparedHeading = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const queryChanged = previousContext.current.search !== search;
    const previousMessage = previousContext.current.message;
    setPrepared(null);
    setDraft((current) => queryChanged
      ? { name: '', email: '', message }
      : { ...current, message: current.message === previousMessage ? message : current.message });
    previousContext.current = { search, message };
  }, [search, message]);
  useEffect(() => {
    if (prepared) preparedHeading.current?.focus();
  }, [prepared]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageInput = event.currentTarget.elements.namedItem('message') as HTMLTextAreaElement;
    if (!draft.message.trim()) {
      messageInput.setCustomValidity(t.enquire.messagePlaceholder);
      messageInput.reportValidity();
      return;
    }
    const subject = [emailCopy.subject, quoteName || work?.title].filter(Boolean).join(' / ');
    const body = `${t.enquire.name}: ${draft.name.trim()}\n${t.enquire.email}: ${draft.email.trim()}\n\n${t.enquire.briefing}:\n${draft.message.trim()}`;
    setPrepared({ subject, body, href: `${studio.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` });
  };

  return (
    <SiteChrome>
      <main id="contact" className="enquiry-page">
        <section className="enquiry-layout">
          <div className="enquiry-intro">
            <p className="font-monoish text-[10px] text-[#f6f3ec]/45">
              {fromEstimate ? t.enquire.kickerFromEstimate : t.enquire.kicker}
            </p>
            <h1 className="mt-6 max-w-lg font-display text-6xl leading-[.84] tracking-[-.04em] sm:text-8xl">
              {t.enquire.titleBefore}<br /><em>{t.enquire.titleEm}</em>
            </h1>
            <p className="mt-9 max-w-sm text-sm leading-7 text-[#f6f3ec]/62">
              {fromEstimate ? t.enquire.bodyFromEstimate : t.enquire.body}
            </p>
            {fromEstimate ? (
              <p className="mt-8 max-w-sm border-s border-white/20 ps-4 text-sm leading-6 text-[#f6f3ec]/70" data-testid="text-enquiry-estimate">
                {range ? <>{t.enquire.rangeNoted(range)}</> : null}
                {t.enquire.viewingConfirms}
                {SHOW_PRICING && (
                  <Link href="/estimate" className="mt-2 block text-[10px] uppercase tracking-[.16em]">
                    {t.enquire.reviseEstimate}
                  </Link>
                )}
              </p>
            ) : quoteArticle && quoteName ? (
              <p className="mt-8 max-w-sm border-s border-white/20 ps-4 text-sm leading-6 text-[#f6f3ec]/70">
                {t.enquire.currentlyAsking(quoteName)}<br />
                <strong className="text-white">{quoteName} ({quoteArticle})</strong>
              </p>
            ) : work ? (
              <p className="mt-8 max-w-sm border-s border-white/20 ps-4 text-sm leading-6 text-[#f6f3ec]/70">
                {t.enquire.currentlyAsking(work.title)}
                <Link href={`/collection/${work.room}/${work.slug}`} className="mt-2 block text-[10px] uppercase tracking-[.16em]">
                  {t.enquire.viewWork}
                </Link>
              </p>
            ) : null}
            <div className="mt-12 space-y-4 border-t border-white/12 pt-6 text-sm">
              <a href={studio.emailHref} className="flex items-center gap-3 transition-colors hover:text-[#f6f3ec]/60" data-testid="link-contact-email">
                <Mail size={15} strokeWidth={1.5} /> {studio.email}
              </a>
              <a href={studio.phoneHref} className="flex items-center gap-3 transition-colors hover:text-[#f6f3ec]/60" data-testid="link-contact-phone">
                <Phone size={15} strokeWidth={1.5} /> {studio.phoneDisplay}
              </a>
              <p className="flex max-w-xs items-start gap-3 text-[#f6f3ec]/60">
                <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" /> {studio.address}
              </p>
            </div>
          </div>
          <div className="enquiry-workspace">
            {prepared ? (
              <div className="enquiry-ready" data-testid="status-enquiry-success">
                <Check size={22} strokeWidth={1.5} />
                <h2 ref={preparedHeading} tabIndex={-1}>{emailCopy.title}</h2>
                <p className="enquiry-ready__explanation">{emailCopy.body}</p>
                <dl className="enquiry-ready__review">
                  <div><dt>{t.enquire.name}</dt><dd>{draft.name}</dd></div>
                  <div><dt>{t.enquire.email}</dt><dd>{draft.email}</dd></div>
                  <div><dt>{t.enquire.briefing}</dt><dd>{draft.message}</dd></div>
                </dl>
                <a
                  href={prepared.href}
                  className="stone-surface marble-surface spring-hover enquiry-ready__send"
                  data-testid="link-success-email"
                >
                  {emailCopy.open} <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
                <button type="button" className="enquiry-ready__edit" onClick={() => { setPrepared(null); window.requestAnimationFrame(() => nameInput.current?.focus()); }} data-testid="button-edit-enquiry"><Pencil size={16} aria-hidden="true" />{emailCopy.edit}</button>
              </div>
            ) : (
              <form key={search || 'enquire'} onSubmit={handleSubmit} className="space-y-7" data-testid="form-enquiry">
                <label className="block">
                  <span className="font-monoish text-[9px] text-[#f6f3ec]/45">{t.enquire.name}</span>
                  <input
                    ref={nameInput}
                    required
                    name="name"
                    type="text"
                    pattern={'.*\\S.*'}
                    title={t.enquire.namePlaceholder}
                    autoComplete="name"
                    value={draft.name}
                    onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                    placeholder={t.enquire.namePlaceholder}
                    className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#f6f3ec]/35 focus:border-[#f6f3ec]"
                    data-testid="input-enquiry-name"
                  />
                </label>
                <label className="block">
                  <span className="font-monoish text-[9px] text-[#f6f3ec]/45">{t.enquire.email}</span>
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={draft.email}
                    onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))}
                    placeholder={t.enquire.emailPlaceholder}
                    className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#f6f3ec]/35 focus:border-[#f6f3ec]"
                    data-testid="input-enquiry-email"
                  />
                </label>
                <label className="block">
                  <span className="font-monoish text-[9px] text-[#f6f3ec]/45">
                    {fromEstimate ? t.enquire.briefing : t.enquire.whatToSee}
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={fromEstimate ? 9 : 5}
                    value={draft.message}
                    onChange={(event) => { event.currentTarget.setCustomValidity(''); setDraft((current) => ({ ...current, message: event.target.value })); }}
                    placeholder={t.enquire.messagePlaceholder}
                    className="mt-3 w-full resize-none border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#f6f3ec]/35 focus:border-[#f6f3ec]"
                    data-testid="input-enquiry-message"
                  />
                </label>
                <button
                  type="submit"
                  className="stone-surface marble-surface spring-hover group mt-3 flex items-center gap-5 px-6 py-4 text-[10px] font-semibold uppercase tracking-[.2em]"
                  data-testid="button-submit-enquiry"
                >
                  {emailCopy.prepare} <ArrowRight size={17} strokeWidth={1.4} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
                <p className="enquiry-hint">{emailCopy.hint}</p>
              </form>
            )}
          </div>
        </section>
        <details className="enquiry-guide"><summary>{t.enquire.howKicker}<ChevronDown size={17} aria-hidden="true" /></summary><AeoHowTo /></details>
      </main>
    </SiteChrome>
  );
}
