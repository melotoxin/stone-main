# Extracted pictures integrated into the website

The four high-resolution extracted PNGs shown in the chat now appear in the washroom accessory cards: Portoro Soap Dispenser, Travertine Soap Dish, Travertine Brush Holder and Travertine Cotton Jar.

The source PNGs were copied unchanged into `artifacts/stoneworks/public/gallery/accessories/extracted/`. Their dimensions, transparency, checksums and byte-for-byte equality with the chosen tool outputs are recorded in `asset-manifest.json`.

Each card is marked “Retouched detail” and still links to the original complete-set photograph. The earlier native SVG photo details are retained in the project. Catalogue membership, product counts and language selection are unchanged.

Type checking and production build passed. Browser checks confirmed all four new PNG paths load, transparency displays over the card background, complete-set links work as before, and desktop/mobile layouts have no horizontal overflow. The preview was refreshed and left open at http://localhost:4174/products#washroom. Temporary viewport overrides were reset.

See `browser-checks.json`, `desktop.png`, `mobile.png` and `normal-preview.png` for the saved checks and screenshots. The original editing prompt set is retained in `../header-image-refinement/image-edit-notes.md`.
