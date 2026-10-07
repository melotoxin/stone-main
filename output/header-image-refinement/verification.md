# ST WERKZ navigation and photograph verification

Completed the requested bar and image cleanup incrementally. The existing frontend, homepage reference, actual marble button textures, product descriptions and complete original photographs remain in place.

- Shared compact service header on Architects, Interior Design, Retailers and Wholesalers. The former floating bordered bar no longer covers the photo caption. Current routes are highlighted, and the mobile menu offers all destinations and enquiry links.
- Four bath components extracted with native SVG silhouettes using unchanged original JPEG bytes. Three additional catalogue frames exclude printed headings and measurement arrows. Together with the previous cleanup, six framed catalogue photographs are verified.
- Small source photographs have native-size limits across product, retail and collection views. Actual native-size rendering was confirmed for the 314 × 239 bath suite and the 584 × 244 tray detail.
- Original image identity is preserved. Automated editing trials that changed product shapes or stone patterns were rejected and are not used by the website. Extraction limits, source hashes and trial prompts are recorded in `image-edit-notes.md` and the manifests.

Validation passed:

- TypeScript type check and production build.
- 210 rendered page variants and seven redirects, with no missing assets or unexpected repeated body photos.
- 56 service-header route/query/locale cases; English remains the default.
- Six exact-original catalogue frames and four exact-original bath silhouettes, including source dimensions and embedded JPEG hash checks.
- Ten browser assertions covering 320px phones, 390px phones, tablets, desktop layouts and the normal preview size. Checked menu touch targets, Escape/focus restoration, contact anchor clearance, right-to-left layout, image loading, intrinsic image sizing and horizontal overflow.
- Desktop header fit checked in English, French and Russian. Urdu mobile navigation checked explicitly; the preview was restored to English.
- No browser runtime errors. The production build retains its pre-existing nonfatal tooltip sourcemap diagnostic and bundle-size warning.

The ST WERKZ preview runs at **http://localhost:4174/**. Its server was refreshed so the new image files are actually displayed rather than older cached crops. Port 4173 belongs to another local service and was left running.

The final product preview is open at `/products#washroom`. Temporary viewport overrides have been reset. Screenshots and machine-readable reports are saved in this folder.
