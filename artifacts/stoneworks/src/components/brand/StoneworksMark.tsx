import { cn } from '@/lib/utils';

type StoneworksMarkProps = {
  variant?: 'onLight' | 'onDark';
  showWordmark?: boolean;
  layout?: 'horizontal' | 'stacked';
  markSize?: number;
  className?: string;
};

/**
 * Circular SW monogram from the studio mark: a slab-serif W
 * with a thin script S woven through the center.
 * Art: /brand/sw-mark.svg (also favicon and PWA icons).
 */
export function StoneworksMark({
  variant = 'onDark',
  showWordmark = true,
  layout = 'horizontal',
  markSize = 36,
  className,
}: StoneworksMarkProps) {
  const onDark = variant === 'onDark';
  const wordColor = onDark ? 'text-[#f6f3ec]' : 'text-[#0c0c0c]';

  return (
    <span
      className={cn(
        'inline-flex items-center',
        layout === 'stacked' ? 'flex-col gap-3' : 'gap-3',
        className,
      )}
    >
      <span className="shrink-0" style={{ width: markSize, height: markSize }}>
        <img
          src="/brand/sw-mark.svg"
          alt=""
          width={markSize}
          height={markSize}
          className="block h-full w-full"
          decoding="async"
        />
      </span>
      {showWordmark ? (
        <span
          className={cn(
            'font-mark text-[0.72rem] font-semibold leading-none tracking-[0.22em]',
            wordColor,
          )}
        >
          St Werkz
        </span>
      ) : null}
    </span>
  );
}
