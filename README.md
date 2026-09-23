# A2P2 site

Static React site, styled with Tailwind, hosted on Netlify. Page copy lives in one markdown file. Layout and styling still require editing the code.

This is a scaffold. The Canva desktop/mobile design has not been rebuilt yet.

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build
npm run preview
```

`build` type-checks and writes static files to `dist/`. `preview` serves that production build locally.

## Edit content

All page copy is in [`content/site.md`](content/site.md).

1. Open `content/site.md`. The comment at the top is the map: identity, header, home, podcast, pages, contact, footer.
2. Change the field for that region. Header social icons are `social`. Podcast episode titles, Apple and Spotify links, and Season 1 guest bios (`podcast.seasonOne.guests`) are under `podcast`.
3. An `href` that starts with `http://` or `https://` opens in a new tab. A path (`/podcast`, `#mission`) stays on this site.
4. Section and contact bodies are markdown. They support paragraphs, lists, and links.
5. Save, then refresh locally. On Netlify, a git push rebuilds and publishes the change.

Layout, colors, fonts, and spacing are **not** in the markdown file. Those live in React components under `src/` and in `src/index.css`.

## Images

Do not commit PNG, JPEG, or Canva exports. Convert first:

```bash
npm run optimize:images -- /path/to/source.png --name hero --kind photo
```

That writes a resized WebP to [`public/images/`](public/images/) (`public/images/hero.webp` → `/images/hero.webp`). `--kind` is `logo` (lossless, small UI), `graphic` (lossless intro/type), or `photo` (lossy). Re-encode everything already in the folder with `npm run optimize:images -- --all`. `brew install webp imagemagick` if `cwebp` / `magick` are missing.

Above-the-fold / intro images must also be:

1. Preloaded in [`index.html`](index.html)
2. Given `width` and `height`
3. Decoded before any animation starts (`src/lib/media.ts`)

Below-the-fold images use `loading="lazy"`. Wiring a new image into the page still means editing the React components.

## Deploy on Netlify

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project** and select the repo.
3. Build settings are already in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. The free tier is enough for this static site.

SPA routes fall back to `index.html` via `public/_redirects` and `netlify.toml`.
