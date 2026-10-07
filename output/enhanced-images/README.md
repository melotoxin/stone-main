# Enhanced website photographs

Updated on 4 October 2026 from `D:\STwekrs pics\STWERKS-images-enhanced`.

## Changes

- Matched and imported all 142 supplied enhanced photographs, including 43 stone faces.
- Updated the collection, product, interior, studio, trade, and search image data to use these photographs.
- Encoded the enhanced PNGs as quality-90 WebP images at their supplied dimensions. Combined size: 33,156,004 bytes, down from 290,733,384 bytes (88.6% smaller).
- The homepage hero uses the user's marble-vanity reference. Its original PNG has exactly the same RGB pixels as the background attachment supplied on 4 October. Enhanced product photographs remain in use throughout the site; the final contact section retains the enhanced stone still life.
- The reference hero uses responsive versions at 768, 1440, and 1953 pixels wide. The enhanced material, craft, and sample photographs remain in use. Still-life responsive versions are also available in the assets.
- Preserved the existing layout, navigation, quote/sample links, and reusable ivory and black marble buttons. The reference vanity assets are still available.
- Kept every original website photograph and left the external source folder unchanged. Source files edited for the import are backed up under `.local/enhanced-images-backup`.

## Verification

- Production build passed.
- All 142 imported WebPs decoded successfully and match the enhanced source dimensions.
- Source hashes confirm all 142 supplied PNGs remain unchanged; all 142 original website images remain present.
- All 43 dynamic stone-image paths resolve to imported files.
- All 149 distinct image paths found in the active source files returned valid images from `http://localhost:4173/`.
- All ten enhanced homepage derivative files, including every responsive hero version, decoded and returned valid WebP images from the server.
- No old matched photograph URLs remain in the active source files.
- The homepage returns HTTP 200. The user's active preview is restored to `/` in English. Reloading keeps it in English. The prior automatic redirect based on a saved language preference has been removed; explicit language routes and the selector remain available.
- Browser verification at 1440 x 900 and the default 463 x 884 preview confirms the reference hero loads, the English heading and quote/sample paths are correct, and there is no horizontal overflow or broken loaded image. The desktop screenshot is `reference-restored-desktop.jpg`.

`import-manifest.json` contains the complete source-to-website mapping. `verification.json` contains the validation results.

The reusable import command is:

```powershell
python scripts/import-enhanced-images.py --source "D:\STwekrs pics\STWERKS-images-enhanced" --apply
python scripts/prepare-home-images.py --enhanced-source "D:\STwekrs pics\STWERKS-images-enhanced"
```
