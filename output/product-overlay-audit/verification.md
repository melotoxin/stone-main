# Product photo and expansion verification

- Production build: passed.
- Typecheck: passed with zero TypeScript errors.
- React/Vite server rendering: 210 of 210 page variants passed.
- Legacy Projects redirects: all 7 language routes preserve the explicit language and redirect to Products.
- Products: 41 unique catalogue records and 41 unique first photograph paths; all first assets exist.
- Category counts: Kitchen 11, Washroom 12, Room & Home Decor 18.
- Previous 34 products: all retained in their original category order; original featured photographs and objects preserved.
- Default English, explicit language routes, homepage reference photograph and marble-button assets: preserved.
- Metadata/canonical/sitemap checks: 777 passed.
- Missing assets, unexpected repeated page photographs and structural errors: zero.

## Photo framing

The bulbous vessel, travertine candlesticks and tapered vessel use native SVG viewports containing their exact original JPEG bytes. The embedded JPEG bytes match the original files, and each original SHA-256 matches its recorded pre-framing hash. The embedded JPEG retains its original dimensions; the displayed viewport excludes the screenshot interface. No raster retouching or regeneration was used.

The verified viewports remove the social controls and contact bands from the two vessels, and the mute icon from the candlesticks. Both complete candle holders and each complete vessel remain visible.

## Practical limits

Server rendering verifies initial route/category state, content, links, assets and metadata. It does not execute effects, scroll animation, pointer events, browser history interaction or form submission. Root-agent browser checks cover the live presentation.

The successful production build retains a non-fatal source-map diagnostic and bundle-size warning. Full logs are saved alongside this report.

## Live preview

Seven live checks passed across desktop, 390px and 320px phone layouts. Verified the cleaned vessel in Products, its detail page, global search and Retail; tested a newly added Home Decor side table and current category counts. No page overflow was found. Responsive checks used browser viewport simulation.

Evidence: browser-checks.json, fixed-vessel-desktop.png and added-vessel-mobile.png.
