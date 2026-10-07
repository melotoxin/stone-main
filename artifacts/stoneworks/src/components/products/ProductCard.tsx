import type { CSSProperties } from 'react';
import { ArrowUpRight, Ruler } from 'lucide-react';
import { Link } from 'wouter';
import type { Piece } from '@/data/gallery';
import { localizedPiece, useI18n } from '@/i18n';
import { CataloguePhoto } from './CataloguePhoto';
import { useCardDepth } from './useCardDepth';

export function ProductCard({ piece, index, discover }: { piece: Piece; index: number; discover: string }) {
  const { locale } = useI18n();
  const product = localizedPiece(piece, locale);
  const depth = useCardDepth<HTMLAnchorElement>();
  const dark = /black|dark|nero|noir|portoro|copper/i.test(piece.material + ' ' + piece.slug);
  return (
    <Link href={'/collection/' + piece.room + '/' + piece.slug} className={'product-object stone-cabinet stone-cabinet--' + (dark ? 'dark' : 'light')} style={{ '--object-index': index % 3 } as CSSProperties} {...depth} data-product-reveal data-testid={'product-' + piece.slug} aria-label={product.title + ' · ' + piece.code}>
      <div className="product-object__image">
        <span className="product-object__plaque">{piece.code}</span>
        <div className="product-object__aperture"><CataloguePhoto source={piece.images[0]} alt={product.title} /></div>
        <span className="stone-cabinet__plinth" aria-hidden="true" />
      </div>
      <div className="product-object__text">
        <h3>{product.title}</h3>
        <p className="product-object__material">{product.material}</p>
        <p className="product-object__form">{product.form}</p>
        {product.dimensions && <p className="product-object__dimensions"><Ruler size={15} aria-hidden="true" /><span>{product.dimensions}</span></p>}
        <span className="product-object__action"><span>{discover}</span><span className="product-object__discover"><ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" /></span></span>
      </div>
    </Link>
  );
}
