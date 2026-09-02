import { useEffect } from 'react'
import siteMarkdown from '../content/site.md?raw'
import { ContentSection } from './components/ContentSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { IntroOverlay } from './components/IntroOverlay'
import { parseSiteContent } from './lib/parseContent'

const site = parseSiteContent(siteMarkdown)

function App() {
  useEffect(() => {
    document.title = site.siteTitle
  }, [])

  return (
    <div id="top" className="font-sauce-regular min-h-svh bg-bg text-fg">
      <IntroOverlay />
      <Header siteTitle={site.siteTitle} nav={site.nav} />
      <main>
        <Hero
          title={site.hero.title}
          lede={site.hero.lede}
          ctaLabel={site.hero.ctaLabel}
          ctaHref={site.hero.ctaHref}
        />
        {site.sections.map((section) => (
          <ContentSection
            key={section.id}
            id={section.id}
            title={section.title}
            html={section.html}
          />
        ))}
        <ContentSection
          id="contact"
          title={site.contact.title}
          html={site.contact.html}
        >
          {site.contact.email ? (
            <p className="mt-4 text-base">
              <a
                className="font-medium text-accent underline underline-offset-2"
                href={`mailto:${site.contact.email}`}
              >
                {site.contact.email}
              </a>
            </p>
          ) : null}
        </ContentSection>
      </main>
      <Footer note={site.footer.note} />
    </div>
  )
}

export default App
