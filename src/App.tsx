import { useEffect } from 'react'
import siteMarkdown from '../content/site.md?raw'
import { ContentSection } from './components/ContentSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { IntroOverlay } from './components/IntroOverlay'
import { Faq } from './components/Faq'
import { Podcast } from './components/Podcast'
import { parseSiteContent } from './lib/parseContent'

const site = parseSiteContent(siteMarkdown)

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

function App() {
  const path = currentPath()
  const isHome = path === '/'
  const isPodcast = path === '/podcast'
  const isFaq = path === '/faq'
  const section = site.sections.find((item) => `/${item.id}` === path)
  const isContact = path === '/contact'

  useEffect(() => {
    const pageTitle = isPodcast
      ? site.podcast.title
      : isFaq
        ? site.faq.title
        : (section?.title ?? (isContact ? site.contact.title : ''))
    document.title = pageTitle
      ? `${pageTitle} — ${site.siteTitle}`
      : site.siteTitle
  }, [isContact, isFaq, isPodcast, section])

  return (
    <div className="font-sauce-regular min-h-svh bg-bg text-fg">
      {isHome ? <IntroOverlay /> : null}
      <Header
        siteTitle={site.siteTitle}
        tagline={site.tagline}
        nav={site.nav}
        social={site.social}
        donate={site.donate}
      />
      <main>
        {isHome ? (
          <Hero
            title={site.hero.title}
            ledeTitle={site.hero.ledeTitle}
            lede={site.hero.lede}
            ctaLabel={site.hero.ctaLabel}
            ctaHref={site.hero.ctaHref}
            missionTitle={site.mission.title}
            missionBody={site.mission.body}
            principlesTitle={site.principles.title}
            principles={site.principles.items}
          />
        ) : null}
        {isPodcast ? <Podcast {...site.podcast} /> : null}
        {isFaq ? <Faq {...site.faq} /> : null}
        {section && !isPodcast && !isFaq ? (
          <ContentSection
            id={section.id}
            title={section.title}
            html={section.html}
          />
        ) : null}
        {isContact ? (
          <ContentSection
            id="contact"
            title={site.contact.title}
            html={site.contact.html}
          >
            {site.contact.email ? (
              <p className="mt-4 text-[18pt]">
                <a
                  className="font-medium text-fg underline underline-offset-2"
                  href={`mailto:${site.contact.email}`}
                >
                  {site.contact.email}
                </a>
              </p>
            ) : null}
          </ContentSection>
        ) : null}
        {!isHome && !isPodcast && !isFaq && !section && !isContact ? (
          <p className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
            Page not found.{' '}
            <a className="underline underline-offset-2" href="/">
              Home
            </a>
          </p>
        ) : null}
      </main>
      <Footer note={site.footer.note} />
    </div>
  )
}

export default App
