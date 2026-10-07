# ST WERKZ room categories — 5 October 2026

Products: http://localhost:4173/products
Collections: http://localhost:4173/collection

Products has three immersive chapters and matching product tabs:

- Kitchen accessories: 7 existing catalog products.
- Washroom accessories: 7 existing catalog products.
- Room & home decor accessories: 8 existing catalog products.

Collections now offers three photographic entrances to those chapters, followed by the complete six-room material library. Existing material/detail URLs and all 22 featured product records are preserved. The homepage teasers and product metadata use the new category names. The reference homepage vanity background and default English behavior remain unchanged.

Room photography is licensed under the Pexels License, which allows free use on commercial websites and modification. These photos are room inspiration, not ST WERKZ installations or product photographs. Visible credits link to each original photograph and the license. `image-sources.json` records source URLs, authors, original dimensions, nine locally optimized WebP variants and checksums. Actual product cards continue to use the user's existing enhanced ST WERKZ pictures.

The pinned product journey and perspective transitions are retained. Category entrances now select the corresponding product cabinet tab; old #bathroom and #handicrafts links resolve to #washroom and #home-decor. Three room buttons also appear in the Products introduction.

Validation completed:

- Production build passed after the final changes.
- React server render checks passed for 11 pages and 3 legacy project redirects, including links, IDs, localized canonicals, sitemap, category metadata, reference homepage image, all catalog photos, all nine new photo variants, and category aliases. See `server-render-smoke.json`.
- Live in-app browser checks covered 1440×900 desktop, 390×844 phone and the normal 463×884 panel. All room photos loaded. Category transitions, Collections → Products entrances, 7/7/8 product counts and keyboard tab navigation worked.
- A phone overflow caused by a gate's minimum height and aspect ratio was fixed by explicitly sizing it to its grid column. All three gates measured 327px at the 390px phone viewport; no horizontal overflow remained.
- Reloading a category URL selects its corresponding product tab. Final preview shows Home Decor with 8 real products and no horizontal overflow. Temporary viewport overrides were reset and the local server remains running.
- Full project typecheck still reports the same 19 pre-existing errors in `data/estimate.ts`, `i18n/catalogs/desks.ts` and `i18n/catalogs/shipping.ts`; no edited file produced a diagnostic. Those unrelated catalog/schema issues were left outside this change.

Preview screenshots: `collections-desktop.jpg` and `products-home-decor-phone.jpg`.

Source snapshots for Products, homepage teasers and metadata are in `.local/room-categories-backup` and `.local/products-categories-backup`.
