import { HOME_PANEL } from '../lib/media'

type HeroProps = {
  title: string
  lede: string
  ctaLabel: string
  ctaHref: string
}

export function Hero({ title, lede, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section>
      <h1 className="sr-only">{title}</h1>
      <img
        src={HOME_PANEL.src}
        alt=""
        width={HOME_PANEL.width}
        height={HOME_PANEL.height}
        className="h-auto w-full"
        decoding="async"
      />
      <div className="bg-bg">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          {lede ? (
            <p className="font-dm-regular max-w-5xl text-[1.05rem] leading-[1.7] text-fg sm:text-lg sm:leading-[1.75]">
              {lede}
            </p>
          ) : null}
          {ctaLabel ? (
            <a
              href={ctaHref}
              className="mt-8 inline-flex items-center gap-3 text-sm text-fg/80 hover:text-fg"
            >
              <span className="inline-flex items-center" aria-hidden="true">
                <span className="h-px w-12 bg-current" />
                <span className="ml-0.5">→</span>
              </span>
              {ctaLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
