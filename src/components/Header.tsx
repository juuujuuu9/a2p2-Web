import { useState } from 'react'
import type { NavItem } from '../lib/parseContent'

type HeaderProps = {
  siteTitle: string
  nav: NavItem[]
}

export function Header({ siteTitle, nav }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur relative">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="text-sm font-semibold tracking-wide text-fg">
          {siteTitle}
        </a>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm text-fg md:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav
          id="site-nav"
          className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col border-b border-border bg-surface px-4 py-3 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:px-0 md:py-0`}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted hover:text-fg md:py-1"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
