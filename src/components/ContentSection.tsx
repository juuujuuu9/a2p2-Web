import type { ReactNode } from 'react'

type ContentSectionProps = {
  id: string
  title: string
  html: string
  children?: ReactNode
}

export function ContentSection({
  id,
  title,
  html,
  children,
}: ContentSectionProps) {
  return (
    <section id={id} className="border-t border-fg/20">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
        <h1 className="font-sauce-regular mb-5 text-2xl tracking-tight text-fg sm:text-3xl">
          {title}
        </h1>
        {html ? (
          <div
            className="prose-site font-dm-regular text-[18pt] leading-relaxed text-muted"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : null}
        {children}
      </div>
    </section>
  )
}