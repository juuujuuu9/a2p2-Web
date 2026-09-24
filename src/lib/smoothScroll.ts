import { useEffect } from 'react'
import Lenis from 'lenis'

/** Trackpad and mouse. Phones and tablets keep native scroll. */
const DESKTOP_QUERY = '(hover: hover) and (pointer: fine)'

/** 1 is native. Lenis’s default 0.1 is a long glide. */
const LERP = 0.22

function bodyLocked() {
  return document.body.style.overflow === 'hidden'
}

export function useDesktopSmoothScroll() {
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lenis: Lenis | undefined

    const syncLock = () => {
      if (!lenis) return
      if (bodyLocked()) lenis.stop()
      else lenis.start()
    }

    const sync = () => {
      const enabled = desktop.matches && !reduce.matches
      if (enabled && !lenis) {
        lenis = new Lenis({
          autoRaf: true,
          lerp: LERP,
          anchors: true,
          stopInertiaOnNavigate: true,
        })
        syncLock()
      } else if (!enabled && lenis) {
        lenis.destroy()
        lenis = undefined
      }
    }

    const observer = new MutationObserver(syncLock)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    })

    sync()
    desktop.addEventListener('change', sync)
    reduce.addEventListener('change', sync)

    return () => {
      desktop.removeEventListener('change', sync)
      reduce.removeEventListener('change', sync)
      observer.disconnect()
      lenis?.destroy()
    }
  }, [])
}
