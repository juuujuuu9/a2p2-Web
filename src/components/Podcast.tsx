import { PODCAST_MARK } from '../lib/media'
import { newTabProps, type PodcastContent } from '../lib/parseContent'

/** Guest portraits. Show copy, listen links, and episode links are in content/site.md. */
const seasonOne = [
  {
    src: '/images/bevin-campbell.webp',
    width: 682,
    height: 1024,
    name: 'Bevin Campbell, Psy.D.',
    role: 'Host',
  },
  {
    src: '/images/christopher-muran.webp',
    width: 744,
    height: 1024,
    name: 'J. Christopher Muran, Ph.D.',
  },
  {
    src: '/images/jonathan-shedler.webp',
    width: 702,
    height: 1024,
    name: 'Jonathan Shedler, Ph.D.',
  },
  {
    src: '/images/daniel-gaztambide.webp',
    width: 851,
    height: 1024,
    name: 'Daniel José Gaztambide, Psy.D.',
  },
  {
    src: '/images/kimberlyn-leary.webp',
    width: 1024,
    height: 1024,
    name: 'Kimberlyn Leary, Ph.D.',
  },
  {
    src: '/images/chris-hopwood.webp',
    width: 934,
    height: 1024,
    name: 'Chris Hopwood, Ph.D.',
  },
  {
    src: '/images/paul-wachtel.webp',
    width: 767,
    height: 1024,
    name: 'Paul Wachtel, Ph.D.',
  },
  {
    src: '/images/nancy-mcwilliams.webp',
    width: 1024,
    height: 1024,
    name: 'Nancy McWilliams, Ph.D.',
  },
  {
    src: '/images/leora-trub.webp',
    width: 1024,
    height: 1024,
    name: 'Leora Trub, Ph.D.',
  },
] as const

const linkClass = 'hover:opacity-80'

export function Podcast({
  title,
  welcome,
  description,
  listenLabel,
  listen,
  episodes,
}: PodcastContent) {
  return (
    <>
      <section className="bg-bg">
        <div className="mx-auto max-w-7xl px-6 pt-10 sm:px-8 sm:pt-14 lg:px-12">
          <img
            src={PODCAST_MARK.src}
            width={PODCAST_MARK.width}
            height={PODCAST_MARK.height}
            alt="Academics for the Advancement of Psychodynamic Psychology"
            className="mx-auto h-auto w-36 sm:w-52 md:w-64"
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
          <h1 className="font-sauce-bold pb-4 text-xl tracking-tight text-fg sm:text-2xl">
            {title}
          </h1>
        </div>
        <hr className="border-0 border-t border-fg/20" />
        <div className="mx-auto max-w-7xl px-6 pb-10 sm:px-8 lg:px-12">
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
                    <a className={linkClass} href={item.href} {...newTabProps(item.href)}>
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
          <h2 className="font-sauce-bold pb-4 text-xl tracking-tight sm:text-2xl">
            Episodes
          </h2>
        </div>
        <hr className="border-0 border-t border-bg/20" />
        <ul className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {episodes.map((episode) => (
            <li
              key={episode.code}
              className="relative flex items-center gap-4 py-4 sm:gap-8 sm:py-5"
            >
              <span
                aria-hidden
                className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-bg/20"
              />
              <span className="font-sauce-bold shrink-0 whitespace-nowrap text-[24pt] leading-none tracking-tighter text-[#7199ab]">
                {episode.code}
              </span>
              {episode.href ? (
                <a
                  className="font-dm-bold text-[18pt] leading-snug hover:opacity-80"
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
            className="font-sauce-bold text-center text-2xl tracking-tight sm:text-3xl"
          >
            Season 1
          </h2>
          <ul className="mt-12 grid grid-cols-3 gap-x-4 gap-y-10 sm:mt-14 sm:gap-x-8 sm:gap-y-14">
            {seasonOne.map((person) => (
              <li key={person.src} className="text-center">
                <img
                  src={person.src}
                  width={person.width}
                  height={person.height}
                  alt=""
                  className="aspect-square w-full rounded-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <span
                  aria-hidden
                  className="mx-auto mt-3 block h-2 w-1/2 bg-[radial-gradient(circle,#7199ab_2px,transparent_2.15px)] bg-size-[9px_8px] bg-center bg-repeat-x"
                />
                <p className="mt-2.5 font-sauce-bold text-[13px] leading-snug sm:text-base">
                  {person.name}
                </p>
                {'role' in person ? (
                  <p className="font-sauce-bold text-[13px] leading-snug sm:text-base">
                    {person.role}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
