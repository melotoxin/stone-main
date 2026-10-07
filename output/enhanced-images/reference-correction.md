# Reference background and language correction

The enhanced-image import did not edit language catalogs or locale routing. The preview was on `/ru`, and the pre-existing provider could automatically redirect English pages using a remembered Russian preference.

The active preview is now on `/` in English. The provider no longer redirects the default English route based on stored preferences. Explicit language selection and translated routes are preserved. The prior provider is backed up in `.local/reference-correction-backup`.

The homepage hero now points to `/design/reference/vanity-1953.webp`, with 768- and 1440-pixel alternatives, and its original full-width reference composition has been restored. The reference PNG and the newly attached background have identical RGB pixels (SHA-256: `69d6e571851a45b4847a040f497cf04e0584bf1eb4a5d7439b1d735a2692a99c`).

All enhanced product photographs, existing text, navigation, and marble button textures remain in place.

Validation: production build passed; English survived a reload; reference image loaded at desktop and mobile sizes; quote and sample links remained valid; no broken loaded image or horizontal overflow was observed. Proof: `reference-restored-desktop.jpg`.
