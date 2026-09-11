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

export type SiteContent = {
  siteTitle: string
  tagline: string
  nav: NavItem[]
  social: NavItem[]
  donate: NavItem
  hero: {
    title: string
    lede: string
    ctaLabel: string
    ctaHref: string
    image: string
  }
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

function markdownToHtml(value: unknown): string {
  const source = asString(value)
  if (!source) return ''
  return marked.parse(source, { async: false }) as string
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

  return {
    siteTitle: asString(frontmatter.siteTitle, 'Site'),
    tagline: asString(frontmatter.tagline),
    nav: parseNav(frontmatter.nav),
    social: parseNav(frontmatter.social),
    donate: parseLabeledLink(frontmatter.donate),
    hero: {
      title: asString(hero.title, 'Welcome'),
      lede: asString(hero.lede),
      ctaLabel: asString(hero.ctaLabel, 'Learn More'),
      ctaHref: asString(hero.ctaHref, '/about'),
      image: asString(hero.image),
    },
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
