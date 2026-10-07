# ST WERKZ browsing refinement

The local website runs at http://localhost:4173/.

## Result

- Homepage: original reference vanity hero and photographed light/dark marble buttons retained. The rest of the page now has one changing object lookbook, an interactive stone sample desk, a craft introduction and a concise consultation section.
- Products: three category tabs for Kitchen, Washroom, and Room & home decor; one featured original catalogue photograph per category and an asymmetric shelf. All 22 curated products remain reachable. Forced pinned scrolling, repeated scene montages and decorative plinths were removed.
- Collections: a material atlas with original stone faces and distinct catalogue imagery; six collection routes retained. Products and materials have separate browsing purposes.
- Retail: one searchable catalogue of 87 pieces, localized material filters/counts, clear reset behavior and product-specific quote links. All 35 previously displayed pieces remain accessible.
- Product details: contained main photographs, thumbnails, previous/next controls, keyboard navigation and route-change reset.
- About/Atelier: distinct studio and workshop stories using original catalogue assets. Process steps expand on demand.
- Navigation/footer: clearer mobile routes and active states, accessible search, visible direct studio/USA contact information and an expandable international address directory.
- Trade/Export: smaller editorial introductions with distinct original imagery, direct product-detail links, readable contact cards and expandable export questions. Mobile headers fit without duplicate enquiry actions or covered hero text.
- Stones: original sample faces, search, category state, deep links and sample enquiries; details scroll on short screens.
- Enquiry: required inputs, preserved product/sample/estimate context, local email-draft preparation and review/edit. Nothing is sent by the website; the visitor confirms sending in their email application. Empty or whitespace-only briefs are rejected.

## Images and preservation

Original JPEGs already supplied with this project now drive catalogue and stone-face displays. Enhanced assets and all catalogue records remain available; no original assets were deleted. The reference homepage image is unchanged. Descriptive detail routes, contact information, SEO, canonical routes, seven locale routes and the default English homepage are preserved.

Catalogue photographs can legitimately recur when following a specific product into its detail page. Duplicate decorative imagery within pages was removed. Detail thumbnails intentionally show the same photograph as their main selection.

## Verification

- Production build passed.
- Structural verification: 210 page renders, all passed; seven locale variants, all 22 curated products, redirects, canonical metadata, sitemap, internal links and asset existence checked.
- No missing images, enhanced body-image paths or unintended repeated body-image sources were found in the checked page variants.
- Live browser checks at 390 × 844 and 1280 × 900 covered navigation, category tabs, original photographs, material deep links, sample prefills, enquiry validation/draft/edit, retail search/filter/reset, detail photo controls, expandable directories/FAQ, mobile header spacing and horizontal overflow. Temporary viewport overrides were reset.
- No external email was opened or sent during verification.
- Full TypeScript checking still reports the same 19 existing errors in estimate data and translation catalogues. No errors were reported in the changed pages, shared image helper or product data. These existing errors are recorded in `typecheck.log`.

Evidence: `server-render-smoke.json`, `server-render-smoke.md`, `browser-checks.json`, `products-desktop.jpg`, `products-mobile.jpg` and `collections-desktop.jpg`.

Source backups are under `.local/ux-refinement-backup`.
