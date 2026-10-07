# ST WERKZ Products experience

Local page: http://localhost:4173/products

## What changed

- Projects navigation now opens a separate Products page. `/projects` redirects to `/products`, including existing language prefixes. The old homepage `#projects` anchor remains available and contains three product previews.
- Three distinct product chapters: kitchen accessories (7 objects), bathroom accessories (7 objects), and handicrafts (8 objects). All 22 are existing catalogue entries with real supplied enhanced photographs and working detail links.
- A full-screen photographic opening leads into a pinned stone journey. As the visitor scrolls, perspective layers, stone-textured plinths, material details and chapter transitions create depth. The page uses original photographs and CSS perspective.
- Chapter controls jump directly to each scene. Direct `#kitchen`, `#bathroom`, and `#handicrafts` URLs open the relevant scene. An ordinary visit starts at the opening scene even when arriving from a scrolled homepage.
- Each chapter also opens its relevant product browser. Keyboard-operated category tabs, full product images and restrained pointer tilt provide a direct way to explore the objects.
- The finale leads to the existing enquiry form. Existing product details, quote/sample paths, English default and exact reference homepage hero are preserved.
- A single shared progressive story-motion component adds heading and photo arrivals to existing pages, including the separate trade layouts. It excludes the reference homepage hero and this page's own managed scenes.
- Reduced-motion settings remove added animations and perspective motion. Natural wheel/touch scrolling remains available; scroll input is never intercepted. Short-screen layouts keep the pinned stage inside the viewport.

## Validation

- Final production build passes. Existing bundle-size and tooltip sourcemap warnings remain.
- TypeScript check returned the same 19 pre-existing diagnostics in estimate and translation files, with no new-page diagnostics.
- Safe React server rendering passes for 11 page/locale combinations. Checked product navigation, unique element IDs, internal detail links, locale-preserving redirects, metadata and sitemap. This does not execute scroll/pointer effects.
- All 22 selected catalogue entries and chapter images exist; 11 photographic/texture paths were checked over local HTTP and in the production output.
- Source comparison confirms the reference homepage hero is unchanged and the previous automatic language redirect is still absent.
- Visual browser verification remains pending: browser inspection was rejected because the active preview was a connection-error page using an unsupported data URL. A manual refresh was requested; no browser workaround was used.

Reports: `verification.json` and `server-render-smoke.json`.

Backups of modified original files are under `.local/products-backup` and `.local/products-backup-motion`.
