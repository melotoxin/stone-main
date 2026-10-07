# Structural verification

This check used React server rendering through the project’s existing Vite dependencies. It did not use a browser.

- renderedPages: 210
- passedPages: 210
- failedPages: 0
- redirects: 7
- serviceHeaderCases: 56
- originalFrames: 6
- bathSilhouettes: 4
- errors: 0
- missingAssets: 0
- nonOriginalBodyImagePaths: 0
- unexpectedRepeatedPageVariants: 0

## Practical limits

Server rendering does not execute effects, scroll animations, pointer events, form submission or browser history interaction. Synthetic location hashes exercise only initial category selection.

## Findings

No structural failures found.
