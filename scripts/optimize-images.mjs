import { mkdtempSync, readdirSync, rmSync, statSync, copyFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, extname, join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const repo = fileURLToPath(new URL('..', import.meta.url))
const imagesDir = join(repo, 'public', 'images')
const MAX = { logo: 512, graphic: 2560, photo: 2560 }

const args = process.argv.slice(2)
const flags = parseArgs(args)

const magickBin = findBin('magick')
const cwebpBin = findBin('cwebp')

if (flags.selfCheck) {
  selfCheck()
  process.exit(0)
}

if (!magickBin || !cwebpBin) {
  missingTools()
}

const inputs = flags.all ? publicWebps() : flags.files
if (inputs.length < 1) {
  throw new Error('usage: npm run optimize:images -- <file> [--kind logo|graphic|photo] [--max-width N] [--name slug]\n       npm run optimize:images -- --all')
}

const tmp = mkdtempSync(join(tmpdir(), 'a2p2-img-'))
try {
  for (const file of inputs) {
    optimizeOne(file, tmp)
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

function parseArgs(argv) {
  const out = { files: [], kind: '', maxWidth: 0, name: '', all: false, selfCheck: false }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--all') out.all = true
    else if (arg === '--self-check') out.selfCheck = true
    else if (arg === '--kind') out.kind = requireValue(argv, ++i, '--kind')
    else if (arg === '--max-width') out.maxWidth = Number(requireValue(argv, ++i, '--max-width'))
    else if (arg === '--name') out.name = requireValue(argv, ++i, '--name')
    else if (arg.startsWith('-')) throw new Error(`unknown flag ${arg}`)
    else out.files.push(arg)
  }
  if (out.kind && !MAX[out.kind]) {
    throw new Error('--kind must be logo, graphic, or photo')
  }
  if (out.name && out.files.length + (out.all ? 1 : 0) !== 1) {
    throw new Error('--name requires exactly one input')
  }
  return out
}

function requireValue(argv, i, flag) {
  if (!argv[i]) throw new Error(`${flag} needs a value`)
  return argv[i]
}

function publicWebps() {
  return readdirSync(imagesDir)
    .filter((name) => name.endsWith('.webp'))
    .map((name) => join(imagesDir, name))
}

function optimizeOne(input, tmp) {
  if (!existsSync(input)) throw new Error(`missing file: ${input}`)
  const png = join(tmp, `${basename(input)}.png`)
  run(magickBin, [input, '-auto-orient', '-strip', `PNG32:${png}`])
  const info = identify(png)
  const kind = flags.kind || detectKind(input, info)
  const maxWidth = flags.maxWidth || (flags.all ? 0 : MAX[kind])
  if (maxWidth) {
    run(magickBin, [png, '-resize', `${maxWidth}x${maxWidth}>`, `PNG32:${png}`])
  }
  const sized = identify(png)
  const encoded = join(tmp, `${basename(input)}.out.webp`)
  encode(png, encoded, kind)
  const dest = flags.name
    ? join(imagesDir, `${flags.name}.webp`)
    : join(imagesDir, `${parse(input).name}.webp`)
  const before = existsSync(dest) ? statSync(dest).size : statSync(input).size
  const after = statSync(encoded).size
  if (existsSync(dest) && after > before) {
    console.log(
      `${kind.padEnd(8)} ${basename(dest)}  ${sized.width}x${sized.height}  keep ${before}B (re-encode was ${after}B)`,
    )
    return
  }
  copyFileSync(encoded, dest)
  const delta = before === 0 ? 0 : ((after - before) / before) * 100
  console.log(
    `${kind.padEnd(8)} ${basename(dest)}  ${sized.width}x${sized.height}  ${before} → ${after}B  (${delta.toFixed(1)}%)`,
  )
}

function detectKind(input, info) {
  const name = basename(input)
  if (/logo|icon|mark|wordmark|favicon/i.test(name)) return 'logo'
  if (Math.max(info.width, info.height) <= 512) return 'logo'
  if (!info.opaque) return 'graphic'
  return 'photo'
}

function encode(png, dest, kind) {
  if (kind === 'photo') {
    encodePhoto(png, dest)
    return
  }
  run(cwebpBin, ['-lossless', '-z', '9', '-metadata', 'none', png, '-o', dest])
}

function encodePhoto(png, dest) {
  const q90 = `${dest}.q90.webp`
  const q80 = `${dest}.q80.webp`
  const lossy = ['-m', '6', '-pass', '10', '-mt', '-af', '-metadata', 'none']
  run(cwebpBin, ['-q', '90', ...lossy, png, '-o', q90])
  run(cwebpBin, ['-q', '80', ...lossy, png, '-o', q80])
  const high = statSync(q90).size
  const low = statSync(q80).size
  copyFileSync((high - low) / high > 0.15 ? q80 : q90, dest)
}

function identify(file) {
  const raw = run(magickBin, ['identify', '-format', '%[opaque] %w %h', file]).trim()
  const [opaque, width, height] = raw.split(/\s+/)
  return { opaque: opaque === 'True', width: Number(width), height: Number(height) }
}

function run(bin, argv) {
  const result = spawnSync(bin, argv, { encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(`${basename(bin)} ${argv.join(' ')}\n${result.stderr || result.stdout}`)
  }
  return result.stdout
}

function findBin(name) {
  for (const dir of ['/opt/homebrew/bin', '/usr/local/bin', '/usr/bin']) {
    const candidate = join(dir, name)
    if (existsSync(candidate)) return candidate
  }
  const result = spawnSync('which', [name], { encoding: 'utf8' })
  return result.status === 0 ? result.stdout.trim() : ''
}

function missingTools() {
  throw new Error('Need cwebp and magick on PATH. brew install webp imagemagick')
}

function selfCheck() {
  if (!magickBin || !cwebpBin) missingTools()
  const tmp = mkdtempSync(join(tmpdir(), 'a2p2-img-check-'))
  const prev = { ...flags }
  try {
    const logoPng = join(tmp, 'check-logo.png')
    run(magickBin, [
      '-size',
      '64x32',
      'xc:none',
      '-fill',
      'white',
      '-draw',
      'rectangle 8,8 56,24',
      `PNG32:${logoPng}`,
    ])
    flags.kind = 'logo'
    flags.maxWidth = 512
    flags.name = 'self-check-logo'
    flags.all = false
    optimizeOne(logoPng, tmp)
    const logoOut = join(imagesDir, 'self-check-logo.webp')
    const logoBytes = statSync(logoOut).size
    if (extname(logoOut) !== '.webp' || logoBytes < 20) {
      throw new Error('self-check: logo webp missing or empty')
    }
    if (logoBytes >= statSync(logoPng).size) {
      throw new Error('self-check: logo webp was not smaller than source PNG')
    }
    rmSync(logoOut)

    const photoPng = join(tmp, 'check-photo.png')
    run(magickBin, ['-size', '120x80', 'plasma:fractal', `PNG32:${photoPng}`])
    flags.kind = 'photo'
    flags.maxWidth = 2560
    flags.name = 'self-check-photo'
    optimizeOne(photoPng, tmp)
    const photoOut = join(imagesDir, 'self-check-photo.webp')
    const photoBytes = statSync(photoOut).size
    if (photoBytes < 20) throw new Error('self-check: photo webp empty')
    const photoInfo = identify(photoOut)
    if (photoInfo.width > 2560 || photoInfo.height > 2560) {
      throw new Error('self-check: photo exceeded max edge')
    }
    rmSync(photoOut)
    console.log('images.self-check ok')
  } finally {
    Object.assign(flags, prev)
    rmSync(tmp, { recursive: true, force: true })
    for (const leftover of ['self-check-logo.webp', 'self-check-photo.webp']) {
      const path = join(imagesDir, leftover)
      if (existsSync(path)) rmSync(path)
    }
  }
}
