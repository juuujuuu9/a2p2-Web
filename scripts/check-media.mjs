import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = fileURLToPath(new URL('..', import.meta.url))
const publicDir = join(repo, 'public')
const imagesDir = join(publicDir, 'images')
const media = readFileSync(join(repo, 'src/lib/media.ts'), 'utf8')
const html = readFileSync(join(repo, 'index.html'), 'utf8')

const BANNED = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.tif',
  '.tiff',
  '.bmp',
  '.heic',
  '.avif',
  '.jxl',
])
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git'])
const srcs = [...media.matchAll(/src: '(\/images\/[^']+)'/g)].map((match) => match[1])

if (srcs.length < 1) {
  throw new Error('src/lib/media.ts must list public image URLs')
}

for (const src of srcs) {
  if (!html.includes(`href="${src}"`)) {
    throw new Error(`index.html must preload ${src}`)
  }
  const bytes = statSync(join(publicDir, src)).size
  const max = /intro-sequence|header-logo/.test(src) ? 150_000 : 400_000
  if (bytes < 100 || bytes > max) {
    throw new Error(`${src} is ${bytes} bytes; run npm run optimize:images`)
  }
}

for (const file of walk(join(repo, 'public'))) {
  assertAllowed(file)
}
for (const file of walk(join(repo, 'src'))) {
  assertAllowed(file)
}
for (const file of walk(join(repo, 'content'))) {
  assertAllowed(file)
}

for (const name of readdirSync(imagesDir)) {
  if (name === '.gitkeep' || name.startsWith('.')) continue
  if (extname(name) !== '.webp') {
    throw new Error(`public/images/${name} must be .webp (run npm run optimize:images)`)
  }
  const bytes = statSync(join(imagesDir, name)).size
  if (bytes < 100 || bytes > 400_000) {
    throw new Error(`/images/${name} is ${bytes} bytes; re-run npm run optimize:images`)
  }
}

console.log('media.check ok')

function assertAllowed(file) {
  const ext = extname(file).toLowerCase()
  if (BANNED.has(ext)) {
    throw new Error(`${relative(repo, file)} is a raw raster; run npm run optimize:images`)
  }
  if (ext === '.webp' && !file.startsWith(`${imagesDir}/`) && !file.startsWith(`${imagesDir}\\`)) {
    throw new Error(`${relative(repo, file)}: WebP belongs in public/images/`)
  }
}

function* walk(dir) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch (error) {
    if (error && error.code === 'ENOENT') return
    throw error
  }
  for (const entry of entries) {
    if (entry.name === '.gitkeep') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(full)
    } else {
      yield full
    }
  }
}
