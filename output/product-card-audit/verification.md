# Product card audit

Updated the existing Products page incrementally. All 41 catalogue records and 7 supplemental items remain, with their existing detail/set/enquiry routes.

## Fixes

- Reusable ProductCard and CataloguePhoto components use consistent frames and actual photo dimensions. Search no longer changes a product's layout according to its result position.
- Square gallery stages replace oversized portrait/wide/closing frames. White studio backgrounds blend with the original product photographs; all complete objects use contain rather than destructive cover crops.
- Six native SVG viewports trim empty wall/white space around the original photographs. Embedded JPEG bytes match the originals exactly; the Noir Gold sink's baked top border is outside the viewport.
- Explicit image positioning prevents tall photos from exceeding the stage. Hover feedback uses borders, shadows and arrows while keeping rims and bases intact.
- Accessory cards share the same frame ratio, clearer information order and aligned actions. Requested extracted PNGs and their retouched-detail disclosure remain.
- Responsive grids use one column on narrow phones, two on tablets, three on desktop and four on wide screens. Card controls are at least 44px.
- Explicit language changes retain the current Products category hash and query string. The delivered preview is in English.

## Verification

- TypeScript check and production Vite build passed.
- 125 server-rendered page variants passed, including all three Products categories in seven locales, nine main pages in seven locales, and all 41 product detail pages.
- 266 rendered image-dimension checks and 127 local asset checks passed; no duplicate IDs, invalid internal routes or duplicate catalogue photos within a category.
- Browser checks passed for all three categories at 320, 390, 768, 1280 and 1800px: equal card stages, no clipped image elements, no horizontal overflow, uniform accessory stages and 44px controls.
- Browser search checks passed for product names, featured SKU, clearing, empty results and reset focus. Category history restores search and selection; product detail/back navigation works.
- Keyboard arrow/Home/End navigation passed. Urdu RTL at 320px passed without overflow, with correct arrow direction. Locale links retain #washroom.
- No browser warnings or errors were captured during the final checks.

## Source quality limits

The Bath Suite's only genuine capture is 314×239. It is capped at its native size; the enlarged supplied copy contains no additional captured detail. Existing source compression and watermarks are preserved. These changes improve presentation without inventing product texture or replacing a product with a different object.

The build reports the existing tooltip sourcemap diagnostic and large-bundle warning; the production build completes successfully.

## Evidence

- browser-checks.json: final responsive and interaction snapshots
- server-render-smoke.json: structural rendering assertions
- source-evidence.json: 41 metadata records and 12 original-byte SVG frames
- washroom-desktop.png: corrected Bath Suite, Noir Gold sink and Copper-Vein basin row
- normal-preview.png: normal-size crisp local preview

Preview: http://localhost:4174/products#washroom
