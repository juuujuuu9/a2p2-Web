import { useEffect, useState } from 'react'
import { decodeImages, INTRO_SEQUENCE } from '../lib/media'

export function IntroOverlay() {
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!visible) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  useEffect(() => {
    if (!visible) {
      return
    }

    let cancelled = false
    void decodeImages(INTRO_SEQUENCE.map((image) => image.src)).then(() => {
      if (!cancelled) {
        setReady(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [visible])

  if (!visible) {
    return null
  }

  const [first, second] = INTRO_SEQUENCE

  return (
    <div
      className={ready ? 'intro-overlay is-ready' : 'intro-overlay'}
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.animationName === 'intro-overlay-out') {
          setVisible(false)
        }
      }}
    >
      <div className="intro-stage mx-auto flex w-full max-w-5xl flex-col items-center px-4 sm:px-6">
        <div className="intro-logos">
          <img
            className="intro-seq intro-seq-2"
            src={second.src}
            width={second.width}
            height={second.height}
            alt=""
            decoding="async"
          />
          <img
            className="intro-seq intro-seq-1"
            src={first.src}
            width={first.width}
            height={first.height}
            alt=""
            fetchPriority="high"
            decoding="sync"
          />
        </div>
        <div className="intro-captions">
          <p className="intro-caption intro-caption-2">
            Academics for the Advancement
            <br />
            of Psychodynamic Psychology
          </p>
          <p className="intro-caption intro-caption-1 italic">Welcome</p>
        </div>
      </div>
    </div>
  )
}
