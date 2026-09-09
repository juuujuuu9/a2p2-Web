import { readFileSync, statSync } from 'node:fs'

const media = readFileSync(new URL('../src/lib/media.ts', import.meta.url), 'utf8')
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const srcs = [...media.matchAll(/src: '(\/images\/[^']+)'/g)].map((match) => match[1])

if (srcs.length < 1) {
  throw new Error('src/lib/media.ts must list public image URLs')
}

for (const src of srcs) {
  if (!html.includes(`href="${src}"`)) {
    throw new Error(`index.html must preload ${src}`)
  }

  const bytes = statSync(new URL(`../public${src}`, import.meta.url)).size
  if (bytes < 1_000 || bytes > 150_000) {
    throw new Error(`${src} is ${bytes} bytes; export WebP at ~2x display size`)
  }
}

console.log('media.check ok')
