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
#   faq        /faq accordion. Each item is `question` plus markdown `answer`
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
#   A new FAQ row: append to `faq.items` (`question`, markdown `answer`).
#   A new podcast episode: append to `podcast.episodes` (code, title, href).
#     Wrap the lead phrase in ** so only that part is bold.
#   A new listen platform: append to `podcast.listen` (label, href).
#   A new header icon: append to `social`. The label must be exactly
#     LinkedIn, Facebook, Instagram, X, or YouTube. Any other label needs
#     a matching icon in src/components/Header.tsx (SocialGlyph).
#   A page that needs its own layout (the podcast is the model): add a new
#     top-level region and a component. Do not also list it under `sections`.
#     `faq` is one of those. Do not also list it under `sections`.
#   A Season 1 guest: append under `podcast.seasonOne.guests` (name, image,
#     width, height from `npm run optimize:images`, optional role, bio).

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
# Bold only the lead phrase: wrap it in **. The rest of the title stays
# regular. Cut at the colon or " — ". If the title has neither, cut before
# " with " so the guest credit stays regular.
# `seasonOne.guests`: grid headshots; click opens the bio panel (desktop:
# slides in from the right). `image` is the public path (/images/….webp).
# `width` and `height` must match the optimizer output on the `<img>`.
# `gratitude`: italic thank-you band below Season 1 (`body`, `cta` label + href).
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
      title: "**Revitalizing Psychodynamic Thinking in Academia** — Insights from Nancy McWilliams and Leora Trub"
      href: "https://podcasts.apple.com/us/podcast/revitalizing-psychodynamic-thinking-in-academia-insights/id1896817346?i=1000769677811"
    - code: S1 E2
      title: "**Decolonizing Psychoanalysis**: Social Justice and Therapy with Dr. Daniel José Gaztambide"
      href: "https://podcasts.apple.com/us/podcast/decolonizing-psychoanalysis-social-justice-and/id1896817346?i=1000770978153"
    - code: S1 E3
      title: "**Bridging Traditions**: The Power of Pluralism in Psychotherapy with Dr. Chris Muran"
      href: "https://podcasts.apple.com/us/podcast/bridging-traditions-the-power-of-pluralism/id1896817346?i=1000772041363"
    - code: S1 E4
      title: "**From Psychoanalysis to Policy**: A Journey of Systemic Change with Dr. Kimberlyn Leary"
      href: "https://podcasts.apple.com/us/podcast/from-psychoanalysis-to-policy-a-journey-of/id1896817346?i=1000773127051"
    - code: S1 E5
      title: "**Integrating Psychoanalysis and Quantitative Research in Psychology** with Dr. Chris Hopwood"
      href: "https://podcasts.apple.com/us/podcast/integrating-psychoanalysis-and-quantitative-research/id1896817346?i=1000774043615"
    - code: S1 E6
      title: "**The Future of Psychoanalysis in Academia**: Insights from Dr. Paul Wachtel"
      href: "https://podcasts.apple.com/us/podcast/the-future-of-psychoanalysis-in-academia-insights/id1896817346?i=1000775017359"
    - code: S1 E7
      title: "**Bridging the Gap**: How Research and Practice Diverge in Psychology with Dr. Jonathan Shedler"
      href: "https://podcasts.apple.com/us/podcast/bridging-the-gap-how-research-and-practice-diverge/id1896817346?i=1000775967201"
  seasonOne:
    title: Season 1
    guests:
      - name: Bevin Campbell, Psy.D.
        role: Host
        image: /images/bevin-campbell.webp
        width: 344
        height: 344
        bio: |
          Bevin Campbell, Psy.D., is host and executive producer of In Depth: Psychoanalysis in the Academy.
      - name: J. Christopher Muran, Ph.D.
        image: /images/christopher-muran.webp
        width: 722
        height: 722
        bio: |
          J. Christopher Muran, Ph.D., is a professor and psychotherapy researcher whose work bridges psychoanalysis, process research, and pluralistic training.
      - name: Jonathan Shedler, Ph.D.
        image: /images/jonathan-shedler.webp
        width: 644
        height: 644
        bio: |
          Jonathan Shedler, Ph.D., is a clinical psychologist and researcher known for work on psychodynamic psychotherapy, personality, and the research–practice divide in psychology.
      - name: Daniel José Gaztambide, Psy.D.
        image: /images/daniel-gaztambide.webp
        width: 719
        height: 719
        bio: |
          Daniel José Gaztambide, Psy.D., is a psychoanalyst and scholar whose work connects psychoanalysis, social justice, and decolonial approaches to mental health.
      - name: Kimberlyn Leary, Ph.D.
        image: /images/kimberlyn-leary.webp
        width: 908
        height: 908
        bio: |
          Kimberlyn Leary, Ph.D., is a psychoanalyst and policy expert whose career spans clinical work, leadership, negotiation, and systemic change in health and equity.
      - name: Chris Hopwood, Ph.D.
        image: /images/chris-hopwood.webp
        width: 802
        height: 802
        bio: |
          Chris Hopwood, Ph.D., integrates psychodynamic and interpersonal theory with quantitative personality research and assessment.
      - name: Paul Wachtel, Ph.D.
        image: /images/paul-wachtel.webp
        width: 765
        height: 765
        bio: |
          Paul Wachtel, Ph.D., is a psychologist and author known for integrative and relational approaches that connect psychoanalysis with other therapeutic traditions.
      - name: Nancy McWilliams, Ph.D.
        image: /images/nancy-mcwilliams.webp
        width: 771
        height: 771
        bio: |
          Nancy McWilliams, Ph.D., ABPP, is Visiting Professor Emerita at Rutgers Graduate School of Applied and Professional Psychology and maintains a private practice in Lambertville, NJ. She has authored four textbooks on psychoanalytic diagnosis and psychodynamic treatment, co-edited the Psychodynamic Diagnostic Manual, and is a former president of the Society for Psychoanalysis and Psychoanalytic Psychology of the APA. Her books are in 20 languages and she has taught in 30 countries.
      - name: Leora Trub, Ph.D.
        image: /images/leora-trub.webp
        width: 903
        height: 903
        bio: |
          Leora Trub, Ph.D., is a psychologist, educator, and founding member of Academics for the Advancement of Psychodynamic Psychology (a²p²).
  gratitude:
    body: |
      We are deeply grateful to the members of the Div39 McCary Fund for supporting our work through a generous $10,000, which has contributed to much of our work thus far.
    cta:
      label: Donate
      href: "/get-involved"

# ---------------------------------------------------------------------------
# faq  (/faq)
# `hero` is the bold title centered on the office photo (one line per row).
# `items` is the accordion. `question` is the closed row. `answer` and
# `close` are markdown: paragraphs, lists, and links. An https link opens
# in a new tab.
# ---------------------------------------------------------------------------

faq:
  title: FAQ
  hero: |
    Psychodynamic Psychology:
    What it is, What it isn't
  heading: Frequently Asked Questions about Psychodynamic Theory & Practice
  items:
    - question: Is psychodynamic psychology still defined by Freudian theory — id, ego, superego, etc.?
      answer: |
        Freud laid the foundations for psychoanalytic thought, but the field has evolved enormously since his time. While concepts such as the id, ego, superego, and Oedipus complex remain part of its history — and, for some practitioners, its vocabulary — they represent one early theoretical framework rather than the defining features of contemporary psychodynamic thought.

        Over more than a century, psychoanalytic and psychodynamic thinking has developed in many directions through the work of figures such as Klein, Winnicott, Bowlby, and Kohut, as well as generations of attachment, relational, and intersubjective theorists who challenged, revised, and expanded earlier ideas. Contemporary psychodynamic approaches draw from this broad and continually evolving tradition, with particular attention to unconscious processes, emotional experience, relationships, development, and recurring patterns in how people experience themselves and others.

        The development of psychoanalytic thought did not end with Freud any more than the development of physics ended with Newton.
    - question: What does contemporary psychodynamic therapy actually address?
      answer: |
        Several core ideas animate most contemporary practice: that significant mental and emotional processes operate outside conscious awareness; that people frequently hold contradictory feelings and desires simultaneously; that early relational experience shapes the way we interpret present circumstances; and that the patterns most relevant to a person's suffering will eventually manifest within the therapeutic relationship itself.

        In practice, this means attention to affect and the expression of emotion, to recurring themes and patterns across a person's life, to the developmental roots of present difficulties, and to what unfolds between patient and therapist in the room. The goal, as the tradition has long held, is to loosen the bonds of past experience — and in doing so, to expand freedom and choice.
    - question: How well-supported is psychodynamic therapy by empirical research — and why is there a perception that it isn't?
      answer: |
        The gap between psychodynamic therapy's actual evidence base and its reputation within academic psychology is itself a subject of scholarly concern.

        The evidence base for psychodynamic therapy is substantial and spans decades of research across randomized controlled trials, meta-analyses, and long-term outcome studies. [Shedler's 2010 meta-analysis](https://doi.org/10.1037/a0018378) in American Psychologist and a [2023 umbrella review by Leichsenring et al.](https://doi.org/10.1002/wps.21104) in World Psychiatry represent two landmark contributions to a literature that continues to grow — both confirming psychodynamic therapy's standing as a fully empirically supported treatment across a wide range of clinical presentations.

        That this evidence remains poorly known in many training programs reflects patterns in how research is disseminated and funded — not the state of the research itself.

        *A dedicated a²p² research library is currently in development — we encourage readers to consult the literature directly.*
    - question: How does psychodynamic therapy differ from Cognitive Behavioral Therapy (CBT)?
      answer: |
        The distinction lies primarily in the theory of change. Cognitive-behavioral therapy focuses on modifying thoughts and behaviors. Psychodynamic therapy focuses on what those thoughts and behaviors express — the relational history and internal conflicts that give rise to them. Both approaches are evidence-based and serve important clinical functions.

        Research on therapy outcomes has also found that the most effective CBT practitioners tend to attend closely to patients' emotional responses within the session and draw connections to other significant relationships — which is, in effect, working with transference. Psychodynamic thinking has similarly found common ground with motivational interviewing, attachment-based approaches, and other relational traditions. In practice, skilled clinicians across traditions often arrive at the same place — attending to relationship, meaning, and emotional experience — regardless of their theoretical starting point.
    - question: Is psychodynamic therapy only for certain kinds of people?
      answer: |
        One of the most persistent misconceptions is that psychodynamic work is reserved for the wealthy, the highly verbal, or those seeking years of intensive treatment. The evidence does not support this. Psychodynamic approaches have been applied across a wide range of presentations, populations, and clinical contexts, including time-limited formats designed for accessibility. a²p² holds that one of the field's most important tasks is ensuring that psychodynamic thinking reaches the communities and populations it has historically failed to center — and that training reflects a genuine commitment to equity and accessibility.
    - question: Is a²p² focused exclusively on psychodynamic psychology?
      answer: |
        Despite our name, a²p² recognizes and engages with the broader tradition of depth-oriented psychology and related approaches that place meaning, subjectivity, and the complexity of inner life at the center of clinical work and human understanding.

        This broader conversation includes existential psychology — May, Frankl, Yalom — with its focus on meaning, mortality, freedom, and the fundamental questions of human existence; Adlerian psychology and its attention to social belonging, inferiority, purpose, and human striving; humanistic psychology — Rogers, Maslow — and its commitment to human potential, self-actualization, and the conditions that support genuine growth; and analytical psychology — Jung — with its particular attention to the unconscious, archetypes, individuation, and the symbolic dimensions of inner life.

        a²p² also recognizes the many other orientations not named here — among them Gestalt therapy, Internal Family Systems, somatic and body-oriented approaches, and emerging psychedelic-assisted therapies — that share a scholarly and clinical commitment to insight, subjectivity, and a holistic understanding of consciousness and psychological functioning.
    - question: Doesn't psychodynamic work have a troubling history — on gender, race, and sexuality?
      answer: |
        It does, and that history demands honest acknowledgment. Early psychoanalytic theories pathologized women and homosexuality; the field largely excluded, ignored, and failed the experiences of people of color. These are not peripheral failures — they shaped who the field was built for and who it was not. Contemporary psychodynamic practice takes these critiques seriously — and the tradition's own emphasis on unflinching self-examination provides the very tools needed to reckon with them. a²p² holds that a psychodynamic psychology worth preserving is one capable of sitting with its own blind spots and growing from them.
    - question: Why does it matter whether psychodynamic thinking survives in academic training?
      answer: |
        Because the frameworks clinicians are trained in determine what they are able to see. A practitioner who has never encountered psychodynamic thought is not simply missing a technique — they are missing a way of understanding people. The retreat of psychodynamic ideas from academic psychology has been shaped less by clinical evidence than by institutional forces: research funding structures, insurance incentives, and the institutional preference for approaches that are brief, manualized, and easily measured. Understanding this landscape — and its costs — matters for the future of the field.
  close: |
    a²p² is an active scholarly community. If you are a researcher, clinician, or trainee interested in contributing to the advancement of psychodynamic psychology, we welcome you to [get in touch](/get-involved).

# ---------------------------------------------------------------------------
# pages
# One item per route. `id` is the path (`our-story` → /our-story).
# `body` is markdown: paragraphs, lists, and links.
# Do not add `podcast`, `faq`, or `contact` here. Those routes have their own regions.
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
