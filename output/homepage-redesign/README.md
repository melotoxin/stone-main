# ST WERKZ homepage redesign

Local preview: http://localhost:4173/

The existing React/Vite frontend was inspected before the presentation was changed. The routing, collection data, enquiry form, quote path, seven language controls, SEO metadata, studio information and footer destinations remain in place. Original files are saved under `.local/homepage-redesign-backup`.

The homepage now follows the supplied picture closely: its marble vanity composition, dark left-hand copy, cream and black marble CTAs, four-link navigation, logo scale and four integrated benefits. The desktop hero uses the picture's 1954:805 proportions. The sections beneath it retain the site's actual ST WERKZ photography and content.

The hero background and button texture plates were prepared from the user's reference using the built-in image generation tool. They are reference-derived design imagery, not newly documented ST WERKZ installations. The interface text, navigation, icons and CTAs are live accessible components. Asset locations and the generation prompts are recorded in `reference-assets.md`.

## Marble buttons

`src/components/ui/MarbleButton.tsx` supports `variant="light"` and `variant="dark"`, links and native buttons, optional arrows and compact navigation sizing. The surfaces use photographs, champagne borders, inset polish, restrained hover movement and visible keyboard focus. Gradients supply lighting only.

- Light texture: `public/design/reference/marble-light.webp`.
- Dark texture: `public/design/reference/marble-dark.webp`.
- Hero: responsive `public/design/reference/vanity-{768,1440,1953}.webp`.

Responsive WebP derivatives are in `public/design`. Original imagery is preserved. `scripts/prepare-home-images.py` regenerates the original ST WERKZ derivatives; `scripts/prepare-reference-images.py` encodes the reference-derived assets. The Cormorant Garamond headline font is hosted locally with its OFL license.

## Validation

- Production build passes.
- Checked 1920×1080, 1440×900, 1280×800, tablet widths 1024 and 768, and mobile widths 430, 390 and 375. No horizontal overflow or clipped hero content was found.
- Checked all seven homepage languages at desktop and 375px, localized quote/sample destinations and right-to-left layout. Long translated words wrap without horizontal overflow.
- Checked the homepage's 26 English route destinations, collection search, project anchor, mobile menu and language dropdown keyboard dismissal.
- Quote and sample CTAs open the existing enquiry form; the sample request prefills its brief. No external enquiry was submitted. The existing form's submission behavior is unchanged.
- No browser console errors or broken loaded images were observed.
- Repaired the existing About page's missing English catalog and added English fallbacks for incomplete localized catalogs.

Mobile Lighthouse comparison of local production previews:

| Metric | Original | Redesign |
| --- | ---: | ---: |
| Performance | 63 | 65 |
| Accessibility | 96 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest contentful paint | 6.7s | 5.3s |
| Cumulative layout shift | 0 | 0 |
| Total page transfer | 950 KiB | 622 KiB |

These are local mobile audit results, not a guarantee of production measurements. The existing application still ships a large JavaScript bundle. Full TypeScript checking remains blocked by 19 pre-existing errors in `src/data/estimate.ts`, `src/i18n/catalogs/desks.ts` and `src/i18n/catalogs/shipping.ts`; the original baseline had 54 errors. No new redesign component appears in the remaining diagnostics.

The latest audit is `lighthouse-reference.json`; the latest screenshots are `reference-desktop.jpg` and `reference-mobile.jpg`. The earlier original and initial-redesign audits are also saved beside this file.
