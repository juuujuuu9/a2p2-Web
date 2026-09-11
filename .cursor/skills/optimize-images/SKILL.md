---
name: optimize-images
description: Optimizes raster images to the smallest high-quality WebP before they enter the A2P2 repo. Use when adding, replacing, generating, importing, or retrofitting images, Canva exports, PNGs, JPEGs, logos, photos, intro frames, or hero assets.
---

# Optimize images

Do not copy a source raster into `public/` or `src/`. Convert first.

## Add or replace

1. Pick `--kind`:
   - `logo` — header mark, icons, small UI. Lossless, default max edge 512.
   - `graphic` — intro frames, type/illustration with flat color or alpha. Lossless, default max edge 2560.
   - `photo` — photographs. Lossy, default max edge 2560.
2. Set `--max-width` to **2× the CSS display width** when you know it (header mark ~3× if displayed under 80px tall). Skip only when the default already matches.
3. Run from the repo root:

```bash
npm run optimize:images -- /absolute/path/to/source.png --name kebab-slug --kind photo
```

Writes `public/images/kebab-slug.webp` and prints `widthxheight` plus bytes.

4. If the image is intro, LCP, or above the fold: put `{ src, width, height }` in `src/lib/media.ts`, preload that exact URL in `index.html`, decode before animating.
5. Otherwise: `width`/`height` on the `<img>`, `loading="lazy"` `decoding="async"`.
6. Delete the source copy if it landed in the repo. `npm run check:media` must pass.

## Retrofit

```bash
npm run optimize:images -- --all
```

Re-encodes every `public/images/*.webp` in place when the new file is smaller. Does not resize unless `--max-width` is passed.

## Tools

Needs `cwebp` and `magick` (`brew install webp imagemagick`). `npm run optimize:images -- --self-check` verifies the encoder.
