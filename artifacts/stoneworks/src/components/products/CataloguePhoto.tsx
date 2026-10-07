import type { CSSProperties } from 'react';
import { cataloguePhotos } from '@/data/catalogue-photos';

/** A complete object, with its actual aspect ratio, in a consistent photo stage. */
export function CataloguePhoto({ source, alt, priority = false }: { source: string; alt: string; priority?: boolean }) {
  const photo = cataloguePhotos[source];
  return <img
    className={'catalogue-photo' + (photo?.native ? ' catalogue-photo--native' : '')}
    src={photo?.src ?? source}
    alt={alt}
    draggable={false}
    width={photo?.width}
    height={photo?.height}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : undefined}
    decoding="async"
    style={photo?.native ? { '--photo-native-width': photo.width + 'px', '--photo-native-height': photo.height + 'px' } as CSSProperties : undefined}
  />;
}
