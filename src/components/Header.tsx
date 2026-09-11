import { useState } from 'react'
import { HEADER_LOGO } from '../lib/media'
import type { NavItem } from '../lib/parseContent'

export type HeaderProps = {
  siteTitle: string
  tagline?: string
  nav: NavItem[]
  social: NavItem[]
  donate: NavItem
}

const iconClass = 'h-5 w-5 fill-current'

function SocialGlyph({ label }: { label: string }) {
  switch (label.toLowerCase()) {
    case 'linkedin':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.98 3.5A2.48 2.48 0 1 1 2.5 6a2.48 2.48 0 0 1 2.48-2.5ZM3 8.75h3.96V21H3V8.75ZM9.2 8.75H13v1.67h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21H17.6v-5.5c0-1.31-.02-3-1.83-3s-2.11 1.43-2.11 2.9V21H9.2V8.75Z" />
        </svg>
      )
    case 'facebook':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.5 8.5V6.75c0-.74.15-1.03 1.2-1.03H17V3h-2.4C11.9 3 11 4.7 11 6.6V8.5H9v2.7h2V21h3.5v-9.8h2.35l.35-2.7H14.5Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10a2.2 2.2 0 0 0 2.2-2.2V7A2.2 2.2 0 0 0 17 4.8ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.7A2.1 2.1 0 1 0 14.1 12 2.1 2.1 0 0 0 12 9.9Zm4.55-3.35a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95Z" />
        </svg>
      )
    case 'x':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.6 3h2.9l-6.35 7.26L22 21h-6.2l-4.86-6.35L5.4 21H2.5l6.8-7.77L2 3h6.35l4.4 5.82L17.6 3Zm-1.08 16.2h1.6L7.56 4.7H5.84l10.68 14.5Z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23 12.2s0-3.2-.4-4.6c-.22-.86-.9-1.54-1.76-1.76C19.5 5.4 12 5.4 12 5.4s-7.5 0-8.84.44c-.86.22-1.54.9-1.76 1.76C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.22.86.9 1.54 1.76 1.76C4.5 18.99 12 19 12 19s7.5 0 8.84-.44c.86-.22 1.54-.9 1.76-1.76.4-1.4.4-4.6.4-4.6ZM9.75 15.5v-6.6L16 12.2l-6.25 3.3Z" />
        </svg>
      )
    default:
      return null
  }
}

export function Header({ siteTitle, tagline, nav, social, donate }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-10 bg-bg text-[17px] text-fg">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-4 py-5 md:py-7">
          <a href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <img
              src={HEADER_LOGO.src}
              width={HEADER_LOGO.width}
              height={HEADER_LOGO.height}
              alt={siteTitle}
              className="h-16 w-auto shrink-0 sm:h-20"
              decoding="async"
            />
            {tagline ? (
              <span className="font-sauce-regular hidden max-w-[18rem] leading-snug whitespace-pre-line text-fg sm:block">
                {tagline}
              </span>
            ) : null}
          </a>
          <div className="hidden items-center gap-4 md:flex">
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-fg hover:opacity-80"
                aria-label={item.label}
              >
                <SocialGlyph label={item.label} />
              </a>
            ))}
            {donate.label && donate.href ? (
              <a
                href={donate.href}
                className="ml-1 border border-fg px-3.5 py-1.5 text-fg"
              >
                {donate.label}
              </a>
            ) : null}
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-sm border border-fg px-3.5 py-1.5 text-fg md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <nav
          id="site-nav"
          className={`${open ? 'flex' : 'hidden'} flex-col gap-1 border-t border-fg/20 py-3 md:flex md:flex-row md:flex-wrap md:items-center md:gap-6 md:py-3.5`}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-2 text-fg md:py-0"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-4 py-2 md:hidden">
            {social.map((item) => (
              <a
                key={`mobile-${item.label}`}
                href={item.href}
                className="text-fg"
                aria-label={item.label}
              >
                <SocialGlyph label={item.label} />
              </a>
            ))}
            {donate.label && donate.href ? (
              <a
                href={donate.href}
                className="border border-fg px-3.5 py-1.5 text-fg"
                onClick={() => setOpen(false)}
              >
                {donate.label}
              </a>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  )
}
