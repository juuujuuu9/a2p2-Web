import { useEffect, useState } from 'react'

const STORAGE_KEY = 'a2p2-intro-seen'

let playDecision: boolean | null = null

function shouldPlayIntro(): boolean {
  if (playDecision !== null) {
    return playDecision
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    playDecision = false
    return false
  }

  if (import.meta.env.DEV) {
    playDecision = true
    return true
  }

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      playDecision = false
      return false
    }
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Ignore storage failures (private mode, blocked storage).
  }

  playDecision = true
  return true
}

export function IntroOverlay() {
  const [visible, setVisible] = useState(() => shouldPlayIntro())

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

  if (!visible) {
    return null
  }

  return (
    <div
      className="intro-overlay"
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
            src="/images/intro-sequence-2.png"
            alt=""
          />
          <img
            className="intro-seq intro-seq-1"
            src="/images/intro-sequence-1.png"
            alt=""
          />
        </div>
        <div className="intro-captions">
          <p className="intro-caption intro-caption-2">
            Academics for the Advancement
            <br />
            of Psychodynamic Psychology
          </p>
          <p className="intro-caption intro-caption-1">Welcome</p>
        </div>
      </div>
    </div>
  )
}
