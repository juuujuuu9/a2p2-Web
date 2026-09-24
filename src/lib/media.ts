export const INTRO_SEQUENCE = [
  { src: '/images/intro-sequence-1.webp', width: 1920, height: 1196 },
  { src: '/images/intro-sequence-2.webp', width: 1920, height: 1196 },
] as const

export const HEADER_LOGO = {
  src: '/images/header-logo.webp',
  width: 200,
  height: 132,
} as const

export const HOME_PANEL = {
  src: '/images/panel.webp',
  width: 1024,
  height: 375,
} as const

export const PODCAST_MARK = {
  src: '/images/podcast-mark.webp',
  width: 512,
  height: 512,
} as const

export const FAQ_HERO = {
  src: '/images/faq-hero.webp',
  width: 1024,
  height: 448,
} as const

/** Wait until each URL has decoded (or `timeoutMs` elapses). */
export function decodeImages(
  srcs: readonly string[],
  timeoutMs = 4000,
): Promise<void> {
  const decoded = Promise.all(
    srcs.map((src) => {
      const img = new Image()
      img.src = src
      return img.decode().catch(() => undefined)
    }),
  ).then(() => undefined)

  // ponytail: 4s ceiling so a hung decode cannot trap the intro; upgrade: skip intro on failure
  return Promise.race([
    decoded,
    new Promise<void>((resolve) => {
      setTimeout(resolve, timeoutMs)
    }),
  ])
}
