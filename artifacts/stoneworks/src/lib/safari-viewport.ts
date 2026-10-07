/**
 * iOS Safari zooms the visual viewport (input focus, double-tap, pinch)
 * and then leaves the layout shifted when scale returns to 1.
 */
export function installSafariViewportGuards() {
  const root = document.documentElement;
  const viewport = window.visualViewport;

  const setHeight = (height: number) => {
    root.style.setProperty('--vvh', `${Math.round(height)}px`);
  };

  setHeight(viewport?.height ?? window.innerHeight);

  if (!viewport) return;

  let lastScale = viewport.scale;

  const sync = () => {
    setHeight(viewport.height);
    const zoomed = viewport.scale > 1.01;
    root.classList.toggle('is-zoomed', zoomed);

    if (lastScale > 1.01 && viewport.scale <= 1.01) {
      window.scrollTo({ left: 0, top: window.scrollY });
    }
    lastScale = viewport.scale;
  };

  viewport.addEventListener('resize', sync);
  viewport.addEventListener('scroll', () => {
    if (viewport.scale <= 1.01 && viewport.offsetLeft !== 0) {
      window.scrollTo({ left: 0, top: window.scrollY });
    }
  });

  window.addEventListener('orientationchange', () => {
    window.setTimeout(() => {
      setHeight(viewport.height || window.innerHeight);
      window.scrollTo({ left: 0, top: window.scrollY });
    }, 300);
  });

  window.addEventListener('focusin', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
    window.setTimeout(() => {
      target.scrollIntoView({ block: 'center', inline: 'nearest' });
    }, 350);
  });
}
