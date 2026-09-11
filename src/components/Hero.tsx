import { useEffect, useRef, useState } from 'react'
import { HOME_PANEL } from '../lib/media'

type HeroProps = {
  title: string
  lede: string
  ctaLabel: string
  ctaHref: string
  missionTitle: string
  missionBody: string
  principlesTitle: string
  principles: string[]
}

const copyClass =
  'font-dm-regular max-w-5xl text-[18.8px] leading-[1.7] text-fg'

export function Hero({
  title,
  lede,
  ctaLabel,
  ctaHref,
  missionTitle,
  missionBody,
  principlesTitle,
  principles,
}: HeroProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    principles.map(() => false),
  )

  useEffect(() => {
    const root = listRef.current
    if (!root) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(principles.map(() => true))
      return
    }

    const items = [...root.querySelectorAll<HTMLElement>('[data-principle]')]
    const inView = new Set<number>()
    let nextIndex = 0
    let timer = 0

    const revealNext = () => {
      timer = 0
      if (nextIndex >= principles.length || !inView.has(nextIndex)) return
      const index = nextIndex
      nextIndex += 1
      setRevealed((current) => {
        const next = current.slice()
        next[index] = true
        return next
      })
      if (inView.has(nextIndex)) {
        timer = window.setTimeout(revealNext, 450)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number(entry.target.getAttribute('data-principle'))
          if (entry.isIntersecting) inView.add(index)
          else inView.delete(index)
        }
        if (!timer) revealNext()
      },
      { threshold: 0.3, rootMargin: '0px 0px -12% 0px' },
    )

    for (const item of items) io.observe(item)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
    }
  }, [principles])

  return (
    <section>
      <h1 className="sr-only">{title}</h1>
      <img
        src={HOME_PANEL.src}
        alt="Members of a²p² gathered outdoors"
        width={HOME_PANEL.width}
        height={HOME_PANEL.height}
        className="h-auto w-full"
        decoding="async"
      />
      <div className="bg-bg">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          {lede ? <p className={copyClass}>{lede}</p> : null}
          {ctaLabel ? (
            <a
              href={ctaHref}
              className="mt-8 inline-flex items-center gap-3 text-[17px] text-fg/80 hover:text-fg"
            >
              <svg
                aria-hidden="true"
                className="h-3 w-16 shrink-0"
                viewBox="0 0 64 12"
                fill="none"
              >
                <path
                  d="M0 6h56l-4-4M56 6l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinejoin="miter"
                />
              </svg>
              {ctaLabel}
            </a>
          ) : null}
        </div>
        {missionBody || principles.length > 0 ? (
          <>
            <hr className="border-0 border-t border-fg/20" />
            <div
              id="mission"
              className="mx-auto max-w-7xl scroll-mt-8 px-6 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
            >
              {missionBody ? (
                <div>
                  <h2 className="font-sauce-regular mb-5 text-2xl tracking-tight text-fg sm:text-3xl">
                    {missionTitle}
                  </h2>
                  <p className={copyClass}>{missionBody}</p>
                </div>
              ) : null}
              {principles.length > 0 ? (
                <div className={missionBody ? 'mt-14 sm:mt-16' : undefined}>
                  <h2 className="font-sauce-regular mb-5 text-2xl tracking-tight text-fg sm:text-3xl">
                    {principlesTitle}
                  </h2>
                  <ol ref={listRef} className="max-w-5xl">
                    {principles.map((item, index) => (
                      <li
                        key={item}
                        data-principle={index}
                        className={`relative flex gap-5 py-6 sm:gap-8 ${
                          revealed[index] ? 'story-unravel' : 'story-pending'
                        }`}
                      >
                        <span
                          aria-hidden
                          className="absolute top-0 left-1/2 h-px w-screen -translate-x-1/2 bg-fg/20"
                        />
                        <span className="font-sauce-bold w-12 shrink-0 text-[33.2px] leading-none text-[#7199ab]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <p className={copyClass}>{item}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}