# Kitchen and Washroom expansion

The Products page preserves the existing 41 catalogue selections and adds 3 Kitchen design references and 4 individual Washroom component views. Displayed counts are 14 Kitchen, 16 Washroom and 18 Home Decor (48 entries). Reference photographs have visible source credits and open an enquiry with a specific design brief. Bath close-ups explicitly identify and link their complete catalogue sets.

Original bath photos remain unchanged; four native SVG viewports display their actual components. The Kitchen images are optimized 1200px versions served by Pexels, with source and license metadata beside the public assets. No new stock codes or independent component availability were invented.

Validation passed:

- Full workspace type checking.
- Production build. Existing nonfatal tooltip source-map and bundle-size warnings remain.
- 210 rendered page variants, 7 localized redirects and 777 metadata/sitemap checks.
- 10 browser assertions, including 320px, 390px, 768px and 1280px layouts, explicit RTL at 320px, accessory search, empty/reset behavior, shortcut positioning, reference enquiry prefill and no errors from the new preview.
- Complete-set navigation and Back restoring the reference search were also observed successfully.

The old listener on 4173 belongs to a different project's Python preview. ST WERKZ runs on http://localhost:4174/ using Vite's production preview with direct-route fallback. The browser was restored to English and its normal viewport, and left open on Products.

Evidence: server-render-smoke.json, source-audit.md, browser-checks.json, build.log, bath-photo-views.json and the desktop/mobile screenshots in this directory. Intermediate browser observations and offscreen lazy-loading states are retained in the browser report; settled shortcut and image views passed.
