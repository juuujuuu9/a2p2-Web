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
    <section id={id} className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="mb-5 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {title}
        </h2>
        {html ? (
          <div
            className="prose-site text-base leading-relaxed text-muted"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : null}
        {children}
      </div>
    </section>
  )
}
