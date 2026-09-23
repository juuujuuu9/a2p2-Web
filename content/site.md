---
# content/site.md — every editable string on the site.
#
# Layout, color, and images are not here. Those stay in src/.
#
# Regions, in the order they appear on the site:
#   identity   browser title and the two-line header tagline
#   header     sticky nav, social icons, donate
#   home       Who We Are, Our Mission, Our Principles
#   podcast    /podcast show copy, Apple, Spotify, episode titles
#   pages      every other route, under `sections`
#   contact    /contact
#   footer     the footer line
#
# Links
#   An href that starts with http:// or https:// opens in a new tab.
#   An href that starts with / or # stays on this site.
#
# Adding something later
#   A new sentence on a page that already exists: edit that region.
#   A new simple page: add a `sections` item. The route is / plus `id`.
#   A new podcast episode: append to `podcast.episodes` (code, title, href).
#   A new listen platform: append to `podcast.listen` (label, href).
#   A new header icon: append to `social`. The label must be exactly
#     LinkedIn, Facebook, Instagram, X, or YouTube. Any other label needs
#     a matching icon in src/components/Header.tsx (SocialGlyph).
#   A page that needs its own layout (the podcast is the model): add a new
#     top-level region and a component. Do not also list it under `sections`.
#   Guest portraits for the podcast stay in src/components/Podcast.tsx.
#     Each photo has a fixed pixel size, so names and images are not fields here.

# ---------------------------------------------------------------------------
# identity
# ---------------------------------------------------------------------------

siteTitle: Academics for the Advancement of Psychodynamic Psychology
tagline: |
  Academics for the Advancement
  of Psychodynamic Psychology

# ---------------------------------------------------------------------------
# header
# Shown on every page. `nav` is the sticky text row. `social` is the icon row
# beside Donate. Paste a profile URL into href; `#` keeps the icon with no
# destination. Known handles: Instagram and X @asquaredpsquared, LinkedIn @a2p2.
# ---------------------------------------------------------------------------

nav:
  - label: Our Story
    href: "/our-story"
  - label: Podcast
    href: "/podcast"
  - label: Programs & Pathways
    href: "/programs-pathways"
  - label: Events
    href: "/events"
  - label: Get Involved
    href: "/get-involved"
  - label: FAQ
    href: "/faq"
  - label: Partnerships
    href: "/partnerships"
social:
  - label: LinkedIn
    href: "#"
  - label: Facebook
    href: "#"
  - label: Instagram
    href: "#"
  - label: X
    href: "#"
  - label: YouTube
    href: "#"
donate:
  label: Donate
  href: "/get-involved"

# ---------------------------------------------------------------------------
# home
# The photo is HOME_PANEL in src/lib/media.ts. Text below is the bands
# under that photo. `hero.ctaHref` scrolls to the mission band.
# ---------------------------------------------------------------------------

hero:
  title: Academics for the Advancement of Psychodynamic Psychology
  ledeTitle: Who We Are
  lede: We are a group dedicated to the promotion of psychodynamic training, research, and practice. Over the past two decades, as an entire generation of psychodynamically-oriented professors have retired from their academic positions, the scope of doctoral training in psychotherapy has narrowed, and has become increasingly dominated by cognitive-behavioral perspectives only. Meanwhile, the need has never been greater for skilled clinicians who approach clinical work from diverse perspectives and who are capable of addressing a range of issues and struggles. Our group aims to address this gap and to expand the breadth of clinical training by supporting the development of academics with a strong background in psychodynamic models of psychotherapy.
  ctaLabel: Learn More
  ctaHref: "#mission"
mission:
  title: Our Mission
  body: |
    a²p² works to ensure that psychodynamic thinking remains a living, taught, researched tradition inside academic psychology — and to do so in a way that is intellectually rigorous, inclusive, and responsive to the field as it is now.
principles:
  title: Our Principles
  items:
    - Diversify clinical training in doctoral programs to ensure that future clinicians, and the people they serve, have access to quality care spanning a wide range of treatment options.
    - Provide mentorship for graduate students and early-career folks, particularly those from underrepresented groups, who are interested in psychodynamic and depth-oriented therapies.
    - Support the advancement of psychodynamic research, particularly that which further establishes the empirical basis for psychodynamic concepts.
    - Help promote understanding of psychodynamic thinking to professionals in the broader academic community and the clinicians they train.
    - Partner with other academics to advance all therapies emphasizing insight, relationship, and meaning.
    - Recognize ways in which psychodynamic psychology needs to evolve in the areas of clinical practice, research, and social justice.

# ---------------------------------------------------------------------------
# podcast  (/podcast)
# `listen` is the "Listen Now" row (Apple, Spotify, and any later platform).
# `episodes` is the list under Episodes. `code` is the colored label
# (S1 E1). `title` is the link text. `href` is the episode page.
# Omit href to show the title as plain text.
# ---------------------------------------------------------------------------

podcast:
  title: In-Depth Podcast
  welcome: |
    If you’re drawn to depth-oriented thinking, critical scholarship, and the enduring relevance of the unconscious, welcome.
  description: |
    In Depth: Psychoanalysis in the Academy is a podcast of the Academics for the Advancement of Psychodynamic Psychology (a²p²). This podcast features interviews with psychoanalytic academics who are actively shaping the future of psychotherapy and psychology education.
  listenLabel: Listen Now
  listen:
    - label: Apple Podcasts
      href: "https://podcasts.apple.com/us/podcast/in-depth-psychoanalysis-in-the-academy/id1896817346"
    - label: Spotify
      href: "https://open.spotify.com/show/033n01DWo8bh8Ie2S8XuyW"
  episodes:
    - code: S1 E1
      title: Revitalizing Psychodynamic Thinking in Academia — Insights from Nancy McWilliams and Leora Trub
      href: "https://podcasts.apple.com/us/podcast/revitalizing-psychodynamic-thinking-in-academia-insights/id1896817346?i=1000769677811"
    - code: S1 E2
      title: "Decolonizing Psychoanalysis: Social Justice and Therapy with Dr. Daniel José Gaztambide"
      href: "https://podcasts.apple.com/us/podcast/decolonizing-psychoanalysis-social-justice-and/id1896817346?i=1000770978153"
    - code: S1 E3
      title: "Bridging Traditions: The Power of Pluralism in Psychotherapy with Dr. Chris Muran"
      href: "https://podcasts.apple.com/us/podcast/bridging-traditions-the-power-of-pluralism/id1896817346?i=1000772041363"
    - code: S1 E4
      title: "From Psychoanalysis to Policy: A Journey of Systemic Change with Dr. Kimberlyn Leary"
      href: "https://podcasts.apple.com/us/podcast/from-psychoanalysis-to-policy-a-journey-of/id1896817346?i=1000773127051"
    - code: S1 E5
      title: Integrating Psychoanalysis and Quantitative Research in Psychology with Dr. Chris Hopwood
      href: "https://podcasts.apple.com/us/podcast/integrating-psychoanalysis-and-quantitative-research/id1896817346?i=1000774043615"
    - code: S1 E6
      title: "The Future of Psychoanalysis in Academia: Insights from Dr. Paul Wachtel"
      href: "https://podcasts.apple.com/us/podcast/the-future-of-psychoanalysis-in-academia-insights/id1896817346?i=1000775017359"
    - code: S1 E7
      title: "Bridging the Gap: How Research and Practice Diverge in Psychology with Dr. Jonathan Shedler"
      href: "https://podcasts.apple.com/us/podcast/bridging-the-gap-how-research-and-practice-diverge/id1896817346?i=1000775967201"

# ---------------------------------------------------------------------------
# pages
# One item per route. `id` is the path (`our-story` → /our-story).
# `body` is markdown: paragraphs, lists, and links.
# Do not add `podcast` or `contact` here. Those routes have their own regions.
# ---------------------------------------------------------------------------

sections:
  - id: our-story
    title: Our Story
    body: |
      - Letter
      - Founding Committee
      - Board Members
  - id: programs-pathways
    title: Programs & Pathways
    body: |
      - Mentor of the Month
      - Board Certification
      - Doctoral Programs
      - Concentration
      - Faculty & Program Directors (Pursue APA Recognition)
      - Student resources
  - id: get-involved
    title: Get Involved
    body: |
      - Committees
        - Education
        - Mentorship and Progression
        - Infrastructure and Advocacy
        - Fundraising
      - Donate
  - id: events
    title: Events
    body: |
      - Past event highlights
      - Upcoming events
  - id: faq
    title: FAQ
    body: |
      Frequently Asked Questions about Psychodynamic psychology, training, & practice
  - id: partnerships
    title: Partnerships
    body: |
      - Highlighting Key Partnerships: PsiAN, Div 39, Corps of Depth
      - Healers & Resource Library

# ---------------------------------------------------------------------------
# contact  (/contact)
# `email` is rendered as a mailto link under `body`.
# ---------------------------------------------------------------------------

contact:
  title: Contact
  email: hello@example.com
  body: |
    Reach out at the email below. Replace this address when the public inbox is ready.

# ---------------------------------------------------------------------------
# footer
# ---------------------------------------------------------------------------

footer:
  note: Academics for the Advancement of Psychodynamic Psychology
---
