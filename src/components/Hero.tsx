type HeroProps = {
  title: string
  lede: string
  ctaLabel: string
  ctaHref: string
}

export function Hero({ title, lede, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {title}
        </h1>
        {lede ? (
          <p className="max-w-2xl text-lg text-muted sm:text-xl">{lede}</p>
        ) : null}
        {ctaLabel ? (
          <a
            href={ctaHref}
            className="inline-flex w-fit rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg"
          >
            {ctaLabel}
          </a>
        ) : null}
      </div>
    </section>
  )
}
