import './bufferPolyfill'
import matter from 'gray-matter'
import { marked } from 'marked'

export type NavItem = {
  label: string
  href: string
}

export type SiteSection = {
  id: string
  title: string
  html: string
}

export type PodcastEpisode = {
  code: string
  title: string
  href: string
}

export type PodcastGuest = {
  name: string
  role: string
  image: string
  width: number
  height: number
  bio: string
}

export type PodcastSeason = {
  title: string
  guests: PodcastGuest[]
}

export type PodcastContent = {
  title: string
  welcome: string
  description: string
  listenLabel: string
  listen: NavItem[]
  episodes: PodcastEpisode[]
  seasonOne: PodcastSeason
  gratitude: {
    body: string
    cta: NavItem
  }
}

export type FaqItem = {
  question: string
  html: string
}

export type FaqContent = {
  title: string
  hero: string
  heading: string
  items: FaqItem[]
  close: string
}

export type SiteContent = {
  siteTitle: string
  tagline: string
  nav: NavItem[]
  social: NavItem[]
  donate: NavItem
  hero: {
    title: string
    ledeTitle: string
    lede: string
    ctaLabel: string
    ctaHref: string
    image: string
  }
  mission: {
    title: string
    body: string
  }
  principles: {
    title: string
    items: string[]
  }
  podcast: PodcastContent
  faq: FaqContent
  sections: SiteSection[]
  contact: {
    title: string
    email: string
    html: string
  }
  footer: {
    note: string
  }
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return fallback
}

function markdownToHtml(value: unknown): string {
  const source = asString(value)
  if (!source) return ''
  const html = marked.parse(source, { async: false }) as string
  return html.replace(
    /<a href="(https?:\/\/[^"]*)"/gi,
    '<a href="$1" target="_blank" rel="noreferrer"',
  )
}

function parseFaqItems(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const record = item as Record<string, unknown>
    const question = asString(record.question)
    if (!question) return []
    return [{ question, html: markdownToHtml(record.answer) }]
  })
}

function parseFaq(value: unknown): FaqContent {
  const faq = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  return {
    title: asString(faq.title, 'FAQ'),
    hero: asString(faq.hero),
    heading: asString(faq.heading),
    items: parseFaqItems(faq.items),
    close: markdownToHtml(faq.close),
  }
}

function parseLabeledLink(value: unknown): NavItem {
  if (!value || typeof value !== 'object') return { label: '', href: '' }
  const record = value as Record<string, unknown>
  return { label: asString(record.label), href: asString(record.href) }
}

function parseNav(value: unknown): NavItem[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const record = item as Record<string, unknown>
    const label = asString(record.label)
    const href = asString(record.href)
    if (!label || !href) return []
    return [{ label, href }]
  })
}

/** http(s) links leave the site; everything else stays in this tab. */
export function newTabProps(href: string): { target?: '_blank'; rel?: 'noreferrer' } {
  return /^https?:\/\//i.test(href) ? { target: '_blank', rel: 'noreferrer' } : {}
}

function parseStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    const text = asString(item)
    return text ? [text] : []
  })
}

function parseEpisodes(value: unknown): PodcastEpisode[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const record = item as Record<string, unknown>
    const code = asString(record.code)
    const title = asString(record.title)
    if (!code || !title) return []
    return [{ code, title, href: asString(record.href) }]
  })
}

function parseGuests(value: unknown): PodcastGuest[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const record = item as Record<string, unknown>
    const name = asString(record.name)
    const image = asString(record.image)
    const width = asNumber(record.width)
    const height = asNumber(record.height)
    if (!name || !image || !width || !height) return []
    return [
      {
        name,
        role: asString(record.role),
        image,
        width,
        height,
        bio: asString(record.bio),
      },
    ]
  })
}

function parseSeason(value: unknown, fallbackTitle: string): PodcastSeason {
  const season =
    value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  return {
    title: asString(season.title, fallbackTitle),
    guests: parseGuests(season.guests),
  }
}

function parsePodcast(value: unknown): PodcastContent {
  const podcast =
    value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  const gratitude =
    podcast.gratitude && typeof podcast.gratitude === 'object'
      ? (podcast.gratitude as Record<string, unknown>)
      : {}
  return {
    title: asString(podcast.title, 'In-Depth Podcast'),
    welcome: asString(podcast.welcome),
    description: asString(podcast.description),
    listenLabel: asString(podcast.listenLabel, 'Listen Now'),
    listen: parseNav(podcast.listen),
    episodes: parseEpisodes(podcast.episodes),
    seasonOne: parseSeason(podcast.seasonOne, 'Season 1'),
    gratitude: {
      body: asString(gratitude.body),
      cta: parseLabeledLink(gratitude.cta),
    },
  }
}

function parseSections(value: unknown): SiteSection[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const record = item as Record<string, unknown>
    const id = asString(record.id)
    const title = asString(record.title)
    if (!id || !title) return []
    return [{ id, title, html: markdownToHtml(record.body) }]
  })
}

export function parseSiteContent(raw: string): SiteContent {
  const { data } = matter(raw)
  const frontmatter = data as Record<string, unknown>
  const hero =
    frontmatter.hero && typeof frontmatter.hero === 'object'
      ? (frontmatter.hero as Record<string, unknown>)
      : {}
  const contact =
    frontmatter.contact && typeof frontmatter.contact === 'object'
      ? (frontmatter.contact as Record<string, unknown>)
      : {}
  const footer =
    frontmatter.footer && typeof frontmatter.footer === 'object'
      ? (frontmatter.footer as Record<string, unknown>)
      : {}
  const mission =
    frontmatter.mission && typeof frontmatter.mission === 'object'
      ? (frontmatter.mission as Record<string, unknown>)
      : {}
  const principles =
    frontmatter.principles && typeof frontmatter.principles === 'object'
      ? (frontmatter.principles as Record<string, unknown>)
      : {}

  return {
    siteTitle: asString(frontmatter.siteTitle, 'Site'),
    tagline: asString(frontmatter.tagline),
    nav: parseNav(frontmatter.nav),
    social: parseNav(frontmatter.social),
    donate: parseLabeledLink(frontmatter.donate),
    hero: {
      title: asString(hero.title, 'Welcome'),
      ledeTitle: asString(hero.ledeTitle, 'Who We Are'),
      lede: asString(hero.lede),
      ctaLabel: asString(hero.ctaLabel, 'Learn More'),
      ctaHref: asString(hero.ctaHref, '#mission'),
      image: asString(hero.image),
    },
    mission: {
      title: asString(mission.title, 'Our Mission'),
      body: asString(mission.body),
    },
    principles: {
      title: asString(principles.title, 'Our Principles'),
      items: parseStringList(principles.items),
    },
    podcast: parsePodcast(frontmatter.podcast),
    faq: parseFaq(frontmatter.faq),
    sections: parseSections(frontmatter.sections),
    contact: {
      title: asString(contact.title, 'Contact'),
      email: asString(contact.email),
      html: markdownToHtml(contact.body),
    },
    footer: {
      note: asString(footer.note),
    },
  }
}
