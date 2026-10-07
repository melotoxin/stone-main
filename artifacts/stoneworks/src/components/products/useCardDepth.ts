import { useCallback, useEffect, useRef, type FocusEvent, type PointerEvent } from 'react';

/** Gentle gallery-card depth; touch and reduced-motion views remain still. */
export function useCardDepth<T extends HTMLElement = HTMLElement>() {
  const targetRef = useRef<T | null>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const enabledRef = useRef(false);

  const reset = useCallback((target = targetRef.current) => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    if (!target) return;
    target.style.setProperty('--card-rotate-x', '0deg');
    target.style.setProperty('--card-rotate-y', '0deg');
    target.style.setProperty('--card-pointer-x', '50%');
    target.style.setProperty('--card-pointer-y', '50%');
  }, []);

  useEffect(() => {
    const desktopPointer = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateEnabled = () => {
      enabledRef.current = desktopPointer.matches && !reducedMotion.matches;
      if (!enabledRef.current) reset();
    };
    updateEnabled();
    desktopPointer.addEventListener('change', updateEnabled);
    reducedMotion.addEventListener('change', updateEnabled);
    return () => {
      desktopPointer.removeEventListener('change', updateEnabled);
      reducedMotion.removeEventListener('change', updateEnabled);
      enabledRef.current = false;
      reset();
      targetRef.current = null;
    };
  }, [reset]);

  const onPointerMove = useCallback((event: PointerEvent<T>) => {
    const target = event.currentTarget;
    if (!enabledRef.current || event.pointerType !== 'mouse') {
      reset(target);
      return;
    }
    if (targetRef.current && targetRef.current !== target) reset();
    targetRef.current = target;
    positionRef.current = { x: event.clientX, y: event.clientY };
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const current = targetRef.current;
      if (!current || !enabledRef.current) return;
      const bounds = current.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = Math.max(0, Math.min(1, (positionRef.current.x - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (positionRef.current.y - bounds.top) / bounds.height));
      current.style.setProperty('--card-rotate-x', ((0.5 - y) * 4).toFixed(2) + 'deg');
      current.style.setProperty('--card-rotate-y', ((x - 0.5) * 4).toFixed(2) + 'deg');
      current.style.setProperty('--card-pointer-x', (x * 100).toFixed(1) + '%');
      current.style.setProperty('--card-pointer-y', (y * 100).toFixed(1) + '%');
    });
  }, [reset]);

  const onPointerLeave = useCallback((event: PointerEvent<T>) => reset(event.currentTarget), [reset]);
  const onBlur = useCallback((event: FocusEvent<T>) => reset(event.currentTarget), [reset]);

  return { onPointerMove, onPointerLeave, onBlur };
}
