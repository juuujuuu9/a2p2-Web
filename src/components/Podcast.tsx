import { useEffect, useId, useRef, useState } from 'react'
import { PODCAST_MARK } from '../lib/media'
import { newTabProps, type PodcastContent, type PodcastGuest } from '../lib/parseContent'
import { flowClass, useFlowReveal, useStaggerReveal } from '../lib/storyUnravel'

const linkClass = 'hover:opacity-80'
const listenLinkClass = 'underline underline-offset-2 hover:opacity-80'

const guestDotCount = 9

function GuestDots() {
  return (
    <span aria-hidden className="mx-auto mt-3 flex justify-center gap-[5px]">
      {Array.from({ length: guestDotCount }, (_, index) => (
        <span
          key={index}
          className="size-1 shrink-0 rounded-full bg-[#7199ab]"
        />
      ))}
    </span>
  )
}

function GuestPortrait({
  guest,
  className = 'aspect-square w-full rounded-full object-cover object-top',
}: {
  guest: PodcastGuest
  className?: string
}) {
  return (
    <img
      src={guest.image}
      width={guest.width}
      height={guest.height}
      alt=""
      className={className}
      loading="lazy"
      decoding="async"
    />
  )
}

function GuestBioPanel({
  guest,
  titleId,
  onClose,
  motion,
}: {
  guest: PodcastGuest
  titleId: string
  onClose: () => void
  motion: boolean
}) {
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-bg/85 md:bg-black/60"
        aria-label="Close bio"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[90dvh] flex-col rounded-t-2xl border-t border-fg/20 bg-bg px-6 text-fg shadow-xl sm:px-8 md:inset-x-auto md:inset-y-0 md:right-0 md:max-h-none md:w-full md:max-w-2xl md:rounded-none md:border-t-0 md:border-l md:px-12 ${
          motion
            ? 'animate-[guest-sheet-up_0.35s_ease-out] md:animate-[guest-panel-in_0.35s_ease-out]'
            : ''
        }`}
      >
        <div className="shrink-0 pt-3 md:pb-6 md:pt-6">
          <div
            aria-hidden
            className="mx-auto mb-3 h-1 w-10 rounded-full bg-fg/25 md:hidden"
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-fg/30 text-fg hover:bg-fg/10"
              aria-label="Close bio"
              onClick={onClose}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="guest-bio-scroll overflow-y-auto pb-10 pt-2 md:pb-12 md:pt-8">
          <div className="mx-auto w-52 sm:w-60 md:w-64">
            <GuestPortrait guest={guest} />
            <GuestDots />
          </div>
          <h2 id={titleId} className="mt-6 text-center text-fg">
            {guest.name}
          </h2>
          {guest.role ? (
            <p className="mt-1 text-center font-sauce-bold text-base text-fg">
              {guest.role}
            </p>
          ) : null}
          {guest.bio ? (
            <p className="font-dm-regular mt-8 text-[18pt] leading-[1.7] text-fg">
              {guest.bio}
            </p>
          ) : null}
        </div>
      </div>
    </>
  )
}

export function Podcast({
  title,
  welcome,
  description,
  listenLabel,
  listen,
  episodes,
  seasonOne,
  gratitude,
}: PodcastContent) {
  const [activeGuest, setActiveGuest] = useState<PodcastGuest | null>(null)
  const titleId = useId()
  const pageRef = useRef<HTMLDivElement>(null)
  const episodesListRef = useRef<HTMLUListElement>(null)
  const guestsListRef = useRef<HTMLUListElement>(null)
  const flowOn = useFlowReveal(pageRef)
  const episodesRevealed = useStaggerReveal(
    episodesListRef,
    episodes.length,
    'data-episode',
  )
  const guestsRevealed = useStaggerReveal(
    guestsListRef,
    seasonOne.guests.length,
    'data-guest',
  )
  const motion =
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!activeGuest) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveGuest(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [activeGuest])

  return (
    <>
      <div ref={pageRef}>
      <section className="bg-bg">
        <div
          data-flow="intro"
          className={`mx-auto max-w-7xl px-6 pt-14 sm:px-8 sm:pt-18 lg:px-12 lg:pt-20 ${flowClass(flowOn('intro'))}`}
        >
          <img
            src={PODCAST_MARK.src}
            width={PODCAST_MARK.width}
            height={PODCAST_MARK.height}
            alt="Academics for the Advancement of Psychodynamic Psychology"
            className="mx-auto h-auto w-full max-w-[350px]"
            fetchPriority="high"
            decoding="sync"
          />
          {welcome ? (
            <p className="mx-auto mt-8 max-w-md text-center font-sauce-regular text-[15px] leading-relaxed text-fg/85 italic sm:mt-10 sm:max-w-lg sm:text-[17px]">
              {welcome}
            </p>
          ) : null}
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-6 sm:mt-12 sm:px-8 lg:px-12">
          <h1
            data-flow="about"
            className={`font-sauce-bold pb-4 text-xl tracking-tight text-fg sm:text-2xl ${flowClass(flowOn('about'))}`}
          >
            {title}
          </h1>
        </div>
        <hr className="border-0 border-t border-fg/20" />
        <div
          data-flow="about-body"
          className={`mx-auto max-w-7xl px-6 pb-10 sm:px-8 lg:px-12 ${flowClass(flowOn('about-body'))}`}
        >
          {description ? (
            <p className="font-dm-regular pt-5 text-[18pt] leading-normal text-fg">
              {description}
            </p>
          ) : null}
          <div className="mt-12 space-y-1.5 text-[17px] text-fg">
            {listen.length ? (
              <p>
                <span aria-hidden="true">→ </span>
                {listenLabel}{' '}
                {listen.map((item, index) => (
                  <span key={item.href}>
                    {index > 0 ? <span aria-hidden="true"> | </span> : null}
                    <a
                      className={listenLinkClass}
                      href={item.href}
                      {...newTabProps(item.href)}
                    >
                      {item.label}
                    </a>
                  </span>
                ))}
              </p>
            ) : null}
            <p>
              <a className={linkClass} href="#episodes">
                <span aria-hidden="true">→ </span>
                Learn More
              </a>
            </p>
          </div>
        </div>
      </section>
      <section id="episodes" className="scroll-mt-8 bg-white text-bg">
        <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-8 lg:px-12">
          <h2
            data-flow="episodes-heading"
            className={`font-sauce-bold pb-4 text-xl tracking-tight sm:text-2xl ${flowClass(flowOn('episodes-heading'))}`}
          >
            Episodes
          </h2>
        </div>
        <hr className="border-0 border-t border-bg/20" />
        <ul
          ref={episodesListRef}
          className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
        >
          {episodes.map((episode, index) => (
            <li
              key={episode.code}
              data-episode={index}
              className={`relative flex flex-col items-start gap-1 py-4 sm:flex-row sm:items-center sm:gap-8 sm:py-5 ${flowClass(episodesRevealed[index])}`}
            >
              <span
                aria-hidden
                className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-bg/20"
              />
              <span className="font-sauce-bold shrink-0 whitespace-nowrap text-[18pt] leading-none tracking-tighter text-[#7199ab] sm:text-[24pt]">
                {episode.code}
              </span>
              {episode.href ? (
                <a
                  className="font-dm-bold text-[18pt] leading-snug hover:underline hover:opacity-80 underline-offset-2"
                  href={episode.href}
                  {...newTabProps(episode.href)}
                >
                  {episode.title}
                </a>
              ) : (
                <span className="font-dm-bold text-[18pt] leading-snug">
                  {episode.title}
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="h-16 sm:h-20" />
      </section>
      <section aria-labelledby="season-1" className="bg-bg text-fg">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
          <h2
            id="season-1"
            data-flow="season-heading"
            className={`font-sauce-bold text-center text-2xl tracking-tight sm:text-3xl ${flowClass(flowOn('season-heading'))}`}
          >
            {seasonOne.title}
          </h2>
          <ul
            ref={guestsListRef}
            className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-14 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14"
          >
            {seasonOne.guests.map((guest, index) => (
              <li
                key={guest.image}
                data-guest={index}
                className={flowClass(guestsRevealed[index])}
              >
                <button
                  type="button"
                  className="w-full cursor-pointer text-center hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg/50"
                  aria-haspopup="dialog"
                  onClick={() => setActiveGuest(guest)}
                >
                  <GuestPortrait guest={guest} />
                  <GuestDots />
                  <p className="mt-2.5 font-sauce-bold text-[13px] leading-snug sm:text-base">
                    {guest.name}
                  </p>
                  {guest.role ? (
                    <p className="font-sauce-bold text-[13px] leading-snug sm:text-base">
                      {guest.role}
                    </p>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {gratitude.body ? (
        <section className="border-t border-fg/20 bg-bg text-fg">
          <div
            data-flow="gratitude"
            className={`mx-auto max-w-[967px] px-6 pb-16 pt-24 text-center sm:px-8 sm:pb-20 sm:pt-28 lg:px-12 ${flowClass(flowOn('gratitude'))}`}
          >
            <p className="font-dm-regular text-[18pt] leading-[1.7] italic">
              {gratitude.body}
            </p>
            {gratitude.cta.label && gratitude.cta.href ? (
              <a
                href={gratitude.cta.href}
                className="mt-10 inline-block border border-fg px-3.5 py-1.5 font-sauce-regular text-[17px] text-fg hover:opacity-90"
                {...newTabProps(gratitude.cta.href)}
              >
                {gratitude.cta.label}
              </a>
            ) : null}
          </div>
        </section>
      ) : null}
      </div>
      {activeGuest ? (
        <GuestBioPanel
          guest={activeGuest}
          titleId={titleId}
          onClose={() => setActiveGuest(null)}
          motion={motion}
        />
      ) : null}
    </>
  )
}
