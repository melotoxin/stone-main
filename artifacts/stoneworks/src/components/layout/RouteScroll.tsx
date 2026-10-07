import { useEffect } from 'react';

type ScrollPoint = { left: number; top: number };
const ENTRY_KEY = '__stWerkzScroll';

/** Keep SPA navigation at the start of a story and Back at the place it left. */
export function RouteScroll() {
  useEffect(() => {
    const positions = new Map<string, ScrollPoint>();
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    let serial = 0;
    let writingKey = false;
    let frame = 0;
    const newKey = () => `st-${Date.now().toString(36)}-${++serial}`;
    const stateKey = () => {
      const key: unknown = window.history.state?.[ENTRY_KEY];
      return typeof key === 'string' ? key : undefined;
    };
    const writeKey = (key: string) => {
      if (stateKey() === key) return;
      const state: unknown = window.history.state;
      writingKey = true;
      try {
        window.history.replaceState({
          ...(state && typeof state === 'object' ? state : {}),
          [ENTRY_KEY]: key,
        }, '', window.location.href);
      } finally {
        writingKey = false;
      }
    };
    const point = (): ScrollPoint => ({ left: window.scrollX, top: window.scrollY });
    let entryKey = stateKey() || newKey();
    writeKey(entryKey);
    let current = new URL(window.location.href);
    positions.set(entryKey, point());

    const afterRender = (action: () => void) => {
      window.cancelAnimationFrame(frame);
      // Wouter's event first updates React. The second frame sees the new page.
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          action();
        });
      });
    };
    const scrollTo = (destination: ScrollPoint) => {
      window.scrollTo({ ...destination, behavior: 'instant' });
      positions.set(entryKey, point());
    };
    const scrollToAnchor = (hash: string) => {
      if (!hash) return false;
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return false; }
      const target = document.getElementById(id);
      if (!target) return false;
      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
      const margin = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
      scrollTo({ left: 0, top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - Math.max(headerHeight + 16, margin)) });
      return true;
    };
    const rememberPosition = () => positions.set(entryKey, point());

    const onNavigation = (event: Event) => {
      if (writingKey) return;
      const next = new URL(window.location.href);
      // Native hash navigation can emit popstate followed by hashchange.
      if (event.type === 'hashchange' && next.href === current.href) return;
      positions.set(entryKey, point());
      const pathnameChanged = next.pathname !== current.pathname;
      const hashChanged = next.hash !== current.hash;
      const nextKey = event.type === 'pushState' ? newKey()
        : stateKey() || (event.type === 'replaceState' ? entryKey : newKey());
      const saved = event.type === 'popstate' ? positions.get(nextKey) : undefined;
      entryKey = nextKey;
      current = next;
      writeKey(entryKey);

      if (saved) {
        afterRender(() => scrollTo(saved));
      } else if (pathnameChanged) {
        // Remove the outgoing page's scroll before its much shorter replacement.
        scrollTo({ left: 0, top: 0 });
        afterRender(() => {
          if (!scrollToAnchor(next.hash)) scrollTo({ left: 0, top: 0 });
        });
      } else if (hashChanged && event.type !== 'replaceState') {
        // Category hashes without an element are intentionally left in place.
        afterRender(() => { scrollToAnchor(next.hash); });
      }
    };

    const events = ['pushState', 'replaceState', 'popstate', 'hashchange'];
    // Capture runs before Wouter's subscribers replace the outgoing DOM.
    events.forEach(event => window.addEventListener(event, onNavigation, true));
    window.addEventListener('scroll', rememberPosition, { passive: true });
    if (current.hash) afterRender(() => { scrollToAnchor(current.hash); });

    return () => {
      events.forEach(event => window.removeEventListener(event, onNavigation, true));
      window.removeEventListener('scroll', rememberPosition);
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}
