# ST WERKZ photograph cleanup

**Later update:** The user subsequently requested using the high-resolution extracted images shown in the chat. Those four PNGs are now used in the washroom accessory cards with a visible “Retouched detail” label. The original complete-set photos remain linked. The extraction decisions below describe the preceding cleanup pass; current integration evidence is in `../extracted-pictures-integration/`.

The initial cleanup used the original catalogue pixels. The original JPEGs and those native SVG variants remain available in the project. The later integration described above uses the selected extracted PNGs for the four retouched accessory details.

## Original-pixel variants retained

Native SVG silhouette clipping extracts the visible bath accessories onto transparent backgrounds. The exact original JPEG bytes are embedded inside each SVG; clipping removes the surroundings without repainting stone patterns.

| Asset under `artifacts/stoneworks/public` | Original photograph | Native view |
| --- | --- | --- |
| `gallery/accessories/portoro-soap-dispenser.svg` | `gallery/st-werkz/portoro-bath-set.jpg` | 154 × 250 |
| `gallery/accessories/travertine-soap-dish.svg` | `gallery/st-werkz/travertine-vanity-gold.jpg` | 176 × 112 |
| `gallery/accessories/travertine-brush-holder.svg` | `gallery/st-werkz/travertine-bath-seven.jpg` | 152 × 516 |
| `gallery/accessories/travertine-cotton-jar.svg` | `gallery/st-werkz/travertine-bath-ensemble.jpg` | 355 × 303 |

Two components are partly occluded in the source set photographs. The dispenser's lower-left edge and holder's lower-right edge therefore follow their visible boundaries. Hidden corners were not reconstructed. Each detail links to the unchanged complete set photograph.

Three more native SVG viewports exclude printed labels, measurement arrows and empty framing while preserving complete visible products:

- `gallery/clean/accents-round-tray.svg`: viewport 72 225 584 244.
- `gallery/clean/accents-curved-canisters.svg`: viewport 130 290 470 390.
- `gallery/clean/accents-pedestal-bowl.svg`: viewport 78 136 570 283. Dimensions remain in the product description.

These join the previously cleaned vessel and candle-holder views. The source JPEG hashes and exact embedded-byte comparisons are recorded in `server-render-smoke.json`, `accessory-extraction.json` and `../product-overlay-audit/framing.json`.

The 314 × 239 bath-suite source, 460 × 500 Rust Cage Table and 500 × 500 Portoro cup now have display-size limits. Detail, retail and product views no longer enlarge them beyond their useful source size. Source detail lost through old compression cannot be recovered by increasing file dimensions.

## Initial image editing review

Mode: edit with a referenced original photograph and `transparent_background=true`.

Four automated extraction trials produced sharper images but altered some object geometry or stone patterns. They were initially left out after comparison with the original photos. Following the user's request to use the extracted pictures, they now appear as labelled retouched details with links to the original photographs. Their original tool outputs remain in `C:\Users\4star\.codex\generated_images\01a105a9-a5cc-7392-896c-82aece99ae35`:

- Dispenser: `exec-854fb522-f014-4972-856b-bb0dd30564c8.png`.
- Soap dish: `exec-e6242672-fb53-4dd2-afee-a1f1dc8f4ef8.png`.
- Brush: `exec-7ec7e8d7-b163-4b7b-8316-ea0b63f3c167.png`.
- Cotton jar: `exec-6444a6da-bf79-42cf-92f2-9fd1491a8f58.png`.

### Final trial prompt set

Dispenser prompt:

> Edit target: the supplied real ST WERKZ Portoro Bath Set catalogue photograph. Use case: background-extraction / precise-object-edit. Extract ONLY the actual rounded soap dispenser at the upper right, with its metal pump, as a clean transparent-background product cutout. Remove the tissue box, soap dish, jars, cup, countertop, wall and all other objects. Preserve this exact dispenser's silhouette, oval rounded body, silver pump shape and orientation, pump pointing left, original perspective and all distinctive black/charcoal marble with large amber/gold mineral veins exactly as photographed. Do not redesign the object, invent veins or add accessories. Apply restrained cleanup of JPEG noise and softness only; preserve genuine stone texture, pores and natural unevenness. High-quality crisp product edges, no oversharpening halos, no artificial plastic gloss, no logos/text/marks, no background or large shadow. Keep the entire pump and dispenser body inside the image with modest breathing room. Output a single isolated dispenser on true alpha transparency, suitable for a professional catalogue card.

Shared prompt for the remaining three trials, substituting each target below:

> Edit target: the supplied actual ST WERKZ catalogue photograph. Use case: background-extraction and precise-object-edit. Extract ONLY {target}. Remove every other object, countertop, wall and photograph background. Output one isolated authentic product cutout on TRUE alpha transparency with modest breathing room. Keep this exact photographed product's silhouette, perspective, material colour and identifiable stone patterns. No redesign, invented veins, extra accessories, brand marks, text or backdrop. Clean JPEG noise and modest softness conservatively for professional web presentation; do not replace real pores with fabricated texture, alter stone patterns, add plastic gloss, oversharpen or invent hidden surfaces. Product must remain recognizably the same item as the photograph.

Soap dish target:

> the SMALL SHALLOW ROUND SOAP DISH at the front centre of the bath set. It is the small round low dish below the tall dispenser, not the large tray, cup, dispenser or lidded canister. Preserve its exact small circular profile, raised softly rounded rim, basin depth, beige travertine pores and mottled texture; preserve the original slightly elevated front view

Brush target:

> the COMPLETE TALL TOILET BRUSH AND CYLINDRICAL TRAVERTINE HOLDER at the far left of the set. Preserve the whole silver metal handle with its elongated oval top, thin vertical stem, silver circular lid on the cylindrical tall beige stone holder, and the holder's exact proportions and pores. Retain the entire object from top of handle to bottom of stone base. Do not shorten or widen it

Cotton jar target:

> the SHORT WIDE COTTON JAR at the foreground right, with its matching round lid resting slightly open across the top and visible white cotton pads. Preserve the EXACT wide low cylinder, lid position/tilt, subtle horizontal natural stone bands, pores and grey-beige travertine colour. Preserve the cotton visible through the lid gap, the original front perspective and every distinctive shape
